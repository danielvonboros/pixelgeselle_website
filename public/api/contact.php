<?php

declare(strict_types=1);

date_default_timezone_set('Europe/Berlin');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

const SENDER_NAME = 'Pixelgesellen';
const MAX_LENGTHS = ['name' => 100, 'company' => 120, 'email' => 254, 'phone' => 40, 'message' => 5000];
const TOKEN_TTL = 1800;
const MIN_FILL_SECONDS = 3;
const RATE_LIMIT = 5;
const RATE_WINDOW = 3600;

function fail(int $status, string $code): never
{
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $code], JSON_UNESCAPED_UNICODE);
    exit;
}

function loadConfig(): array
{
    $path = dirname($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) . '/contact-config.php';
    if (!is_readable($path)) {
        error_log('contact.php: Konfiguration nicht gefunden unter ' . $path);
        fail(500, 'config_missing');
    }
    $all = require $path;

    $host = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
    $domain = preg_replace('/^www\./', '', $host);

    if (!isset($all[$domain])) {
        foreach (array_keys($all) as $key) {
            if (str_starts_with($domain, $key . '.')) {
                $domain = $key;
                break;
            }
        }
    }
    if (!isset($all[$domain]) || !is_array($all[$domain])) {
        error_log('contact.php: keine Konfiguration für Host: ' . $host);
        fail(500, 'config_missing');
    }

    $config = $all[$domain];
    foreach (['to', 'from', 'secret'] as $key) {
        if (empty($config[$key])) {
            error_log('contact.php: Konfigurationswert fehlt: ' . $key);
            fail(500, 'config_incomplete');
        }
    }

    $origins = ['https://' . $domain, 'https://www.' . $domain];
    if ($host !== $domain && $host !== 'www.' . $domain) {
        $origins[] = 'https://' . $host;
        $origins[] = 'http://' . $host;
    }
    $config['allowed_origins'] = $origins;
    $config['rate_dir'] = dirname($path) . '/contact-rate/' . $domain;

    return $config;
}

function base64UrlEncode(string $raw): string
{
    return rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
}

function base64UrlDecode(string $encoded): string|false
{
    return base64_decode(strtr($encoded, '-_', '+/'), true);
}

function makeToken(int $a, int $b, string $secret): string
{
    $payload = base64UrlEncode(json_encode(['a' => $a, 'b' => $b, 'iat' => time()]));
    $signature = base64UrlEncode(hash_hmac('sha256', $payload, $secret, true));
    return $payload . '.' . $signature;
}

function readToken(string $token, string $secret): ?array
{
    $parts = explode('.', $token, 2);
    if (count($parts) !== 2) {
        return null;
    }
    [$payload, $signature] = $parts;

    $expected = base64UrlEncode(hash_hmac('sha256', $payload, $secret, true));
    if (!hash_equals($expected, $signature)) {
        return null;
    }

    $decoded = base64UrlDecode($payload);
    if ($decoded === false) {
        return null;
    }
    $data = json_decode($decoded, true);
    if (!is_array($data) || !isset($data['a'], $data['b'], $data['iat'])) {
        return null;
    }
    return ['a' => (int) $data['a'], 'b' => (int) $data['b'], 'iat' => (int) $data['iat']];
}

function clientIp(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function checkOrigin(array $allowed): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '' && isset($_SERVER['HTTP_REFERER'])) {
        $parts = parse_url($_SERVER['HTTP_REFERER']);
        if (isset($parts['scheme'], $parts['host'])) {
            $origin = $parts['scheme'] . '://' . $parts['host'];
        }
    }
    if (!in_array($origin, $allowed, true)) {
        fail(403, 'bad_origin');
    }
}

function checkRateLimit(array $config): void
{
    $dir = $config['rate_dir'];
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        error_log('contact.php: Rate-Limit-Verzeichnis nicht nutzbar: ' . $dir);
        return;
    }

    $file = $dir . '/' . hash('sha256', clientIp() . $config['secret']);
    $now = time();

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return;
    }
    flock($handle, LOCK_EX);

    $contents = stream_get_contents($handle);
    $stamps = $contents !== '' ? (json_decode($contents, true) ?: []) : [];
    $stamps = array_values(array_filter(
        $stamps,
        static fn($stamp) => is_int($stamp) && $stamp > $now - RATE_WINDOW,
    ));

    if (count($stamps) >= RATE_LIMIT) {
        flock($handle, LOCK_UN);
        fclose($handle);
        fail(429, 'rate_limited');
    }

    $stamps[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($stamps));
    flock($handle, LOCK_UN);
    fclose($handle);
}

function singleLine(string $value): string
{
    return trim(preg_replace('/[\r\n\t\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
}

function field(string $name): string
{
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        fail(400, 'bad_input');
    }
    $value = trim($value);
    if (mb_strlen($value) > (MAX_LENGTHS[$name] ?? 1000)) {
        fail(400, 'too_long');
    }
    return $value;
}

function encodeHeader(string $value): string
{
    return preg_match('/[^\x20-\x7E]/', $value) === 1
        ? '=?UTF-8?B?' . base64_encode($value) . '?='
        : $value;
}

$config = loadConfig();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    if (!isset($_GET['captcha'])) {
        fail(400, 'bad_request');
    }
    $a = random_int(1, 9);
    $b = random_int(1, 9);
    echo json_encode([
        'success' => true,
        'question' => sprintf('%d + %d', $a, $b),
        'token' => makeToken($a, $b, $config['secret']),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    fail(405, 'method_not_allowed');
}

checkOrigin($config['allowed_origins']);

if (($_POST['website'] ?? '') !== '') {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$token = readToken((string) ($_POST['token'] ?? ''), $config['secret']);
if ($token === null) {
    fail(400, 'bad_token');
}
if (time() - $token['iat'] > TOKEN_TTL) {
    fail(400, 'token_expired');
}
if (time() - $token['iat'] < MIN_FILL_SECONDS) {
    fail(400, 'too_fast');
}
if ((int) ($_POST['captcha'] ?? -1) !== $token['a'] + $token['b']) {
    fail(400, 'bad_captcha');
}

checkRateLimit($config);

$name = singleLine(field('name'));
$company = singleLine(field('company'));
$email = singleLine(field('email'));
$phone = singleLine(field('phone'));
$message = field('message');

if ($name === '' || $email === '' || $message === '') {
    fail(400, 'missing_fields');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'bad_email');
}
if ($phone !== '' && preg_match('/^[0-9+()\/\-. ]{4,40}$/', $phone) !== 1) {
    fail(400, 'bad_phone');
}

$body = implode("\n", [
    'Neue Nachricht über das Kontaktformular auf pixelgesellen.de',
    '',
    'Name:     ' . $name,
    'Betrieb:  ' . ($company !== '' ? $company : '–'),
    'E-Mail:   ' . $email,
    'Telefon:  ' . ($phone !== '' ? $phone : '–'),
    '',
    '--',
    $message,
    '',
    '--',
    'Gesendet am ' . date('d.m.Y') . ' um ' . date('H:i') . ' Uhr',
    'Wenn du auf diese E-Mail antwortest, geht die Antwort direkt an ' . $email . '.',
]);

$headers = implode("\r\n", [
    'From: ' . encodeHeader(SENDER_NAME) . ' <' . $config['from'] . '>',
    'Reply-To: ' . encodeHeader($name) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(
    $config['to'],
    encodeHeader('Kontaktformular: ' . ($company !== '' ? $company : $name)),
    $body,
    $headers,
    '-f' . $config['from'],
);

if (!$sent) {
    error_log('contact.php: mail() hat false geliefert');
    fail(500, 'send_failed');
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
