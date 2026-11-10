// Takes full-page screenshots of the demo sites for the example cards on the home page.
// Run on macOS with Google Chrome installed:  node scripts/capturePages.js raumton phase firstlinie ahrens
// Writes src/assets/images/examples/<slug>-page.jpg, 800 pixels wide.
import { execFileSync, spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const demosUrl = "https://demos.pixelgesellen.de";
const outputFolder = "src/assets/images/examples";
const port = 9333;
const slugs = process.argv.slice(2);

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const profile = await mkdtemp(join(tmpdir(), "capture-"));
const chrome = spawn(chromePath, ["--headless=new", `--remote-debugging-port=${port}`, "--hide-scrollbars", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
await sleep(2500);

const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const socket = new WebSocket(targets.find((target) => target.type === "page").webSocketDebuggerUrl);
await new Promise((resolve) => (socket.onopen = resolve));

let nextId = 0;
const waiting = new Map();
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (waiting.has(message.id)) {
    waiting.get(message.id)(message.result);
    waiting.delete(message.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    nextId += 1;
    waiting.set(nextId, resolve);
    socket.send(JSON.stringify({ id: nextId, method, params }));
  });
const run = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

// Scrolls once through the page so every reveal animation has played, then pins fixed bars to the top.
const prepare = `(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
    scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 180));
  }
  scrollTo(0, 0);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  document.querySelectorAll("*").forEach((element) => {
    const position = getComputedStyle(element).position;
    if (position !== "fixed" && position !== "sticky") return;
    if (element.getBoundingClientRect().top > 5) element.style.display = "none";
    else element.style.position = "absolute";
  });
})()`;

await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
for (const slug of slugs) {
  await send("Page.navigate", { url: `${demosUrl}/${slug}/` });
  await sleep(4000);
  await run(prepare);
  const height = await run("document.documentElement.scrollHeight");
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width: 1200, height, scale: 1 } });
  const file = join(outputFolder, `${slug}-page.jpg`);
  await writeFile(file, Buffer.from(shot.data, "base64"));
  execFileSync("sips", ["--resampleWidth", "800", "-s", "formatOptions", "70", file]);
  console.log(`${slug}: ${file}`);
}

socket.close();
const closed = new Promise((resolve) => chrome.once("exit", resolve));
chrome.kill();
await closed;
await rm(profile, { recursive: true, force: true });
