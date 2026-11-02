import { Box, Button, ButtonBase, Link, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import FormField from "../formField/FormField";
import Icon from "../icon/Icon";
import PixelCheck from "../pixelCheck/PixelCheck";
import type { ContactFormContent } from "../../content/contact";
import { hop } from "../../theme/keyframes";
import { colors, fonts, motion, radius } from "../../theme/tokens";

type FieldName = "name" | "company" | "email" | "phone" | "message" | "captcha";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Challenge = { state: "loading" } | { state: "failed" } | { state: "ready"; question: string; token: string };

interface ContactFormProps {
  content: ContactFormContent;
}

const emptyValues: Values = { name: "", company: "", email: "", phone: "", message: "", captcha: "" };
const fieldOrder: FieldName[] = ["name", "company", "email", "phone", "message", "captcha"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()/\-. ]{4,40}$/;

const fetchChallenge = async (endpoint: string): Promise<Challenge> => {
  try {
    const response = await fetch(`${endpoint}?captcha=1`, { cache: "no-store" });
    const data = await response.json();
    return data.success ? { state: "ready", question: data.question, token: data.token } : { state: "failed" };
  } catch {
    return { state: "failed" };
  }
};

const ContactForm = ({ content }: ContactFormProps) => {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [challenge, setChallenge] = useState<Challenge>({ state: "loading" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const fields = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const successRef = useRef<HTMLHeadingElement>(null);

  const loadChallenge = useCallback(() => {
    setChallenge({ state: "loading" });
    void fetchChallenge(content.endpoint).then(setChallenge);
  }, [content.endpoint]);

  useEffect(() => {
    let active = true;
    void fetchChallenge(content.endpoint).then((next) => {
      if (active) setChallenge(next);
    });
    return () => {
      active = false;
    };
  }, [content.endpoint]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const change = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setNotice(null);
  };

  const validate = (input: Values): Errors => {
    const next: Errors = {};
    if (!input.name.trim()) next.name = content.errors.required;
    if (!input.email.trim()) next.email = content.errors.required;
    else if (!EMAIL_PATTERN.test(input.email.trim())) next.email = content.errors.email;
    if (input.phone.trim() && !PHONE_PATTERN.test(input.phone.trim())) next.phone = content.errors.phone;
    if (!input.message.trim()) next.message = content.errors.required;
    if (!input.captcha.trim()) next.captcha = content.errors.required;
    return next;
  };

  const focusFirst = (found: Errors) => {
    const first = fieldOrder.find((name) => found[name]);
    if (first) fields.current[first]?.focus();
  };

  const retryCaptcha = (message: string) => {
    setValues((current) => ({ ...current, captcha: "" }));
    setErrors({ captcha: message });
    loadChallenge();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (challenge.state !== "ready" || sending) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirst(found);
      return;
    }

    setSending(true);
    setNotice(null);
    try {
      const body = new FormData();
      (Object.keys(emptyValues) as FieldName[]).forEach((name) => body.append(name, values[name].trim()));
      body.append("token", challenge.token);
      body.append("website", honeypot);
      const response = await fetch(content.endpoint, { method: "POST", body });
      const data = await response.json().catch(() => ({ success: false }));

      if (data.success) {
        setValues(emptyValues);
        setErrors({});
        setSent(true);
        loadChallenge();
        return;
      }

      switch (data.error) {
        case "bad_captcha":
          retryCaptcha(content.errors.captcha);
          break;
        case "token_expired":
        case "bad_token":
          retryCaptcha(content.errors.expired);
          break;
        case "too_fast":
          setNotice(content.errors.tooFast);
          break;
        case "bad_email":
          setErrors({ email: content.errors.email });
          fields.current.email?.focus();
          break;
        case "bad_phone":
          setErrors({ phone: content.errors.phone });
          fields.current.phone?.focus();
          break;
        case "rate_limited":
          setNotice(content.errors.rateLimited);
          break;
        default:
          setNotice(content.errors.general);
      }
    } catch {
      setNotice(content.errors.general);
    } finally {
      setSending(false);
    }
  };

  const register = (name: FieldName) => (node: HTMLInputElement | HTMLTextAreaElement | null) => {
    fields.current[name] = node;
  };

  if (sent) {
    return (
      <Stack spacing={3} sx={{ alignItems: "flex-start", py: { xs: 2, md: 4 } }}>
        <PixelCheck />
        <Stack spacing={1}>
          <Typography ref={successRef} tabIndex={-1} variant="h3" component="h3" sx={{ outline: "none" }}>
            {content.success.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {content.success.text}
          </Typography>
        </Stack>
        <Button variant="outlined" color="inherit" onClick={() => setSent(false)}>
          {content.success.again}
        </Button>
      </Stack>
    );
  }

  const captchaLabel =
    challenge.state === "ready"
      ? `${content.captcha.label}: ${challenge.question} =`
      : `${content.captcha.label}: ${challenge.state === "loading" ? content.captcha.loading : content.captcha.unavailable}`;

  return (
    <Box
      component="form"
      noValidate
      aria-label={content.label}
      onSubmit={submit}
      sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" } }}
    >
      <FormField
        label={content.fields.name.label}
        name="name"
        value={values.name}
        onChange={change}
        error={errors.name}
        autoComplete={content.fields.name.autoComplete}
        required
        inputRef={register("name")}
      />
      <FormField
        label={content.fields.company.label}
        optionalLabel={content.optional}
        name="company"
        value={values.company}
        onChange={change}
        autoComplete={content.fields.company.autoComplete}
        inputRef={register("company")}
      />
      <FormField
        label={content.fields.email.label}
        name="email"
        type="email"
        value={values.email}
        onChange={change}
        error={errors.email}
        autoComplete={content.fields.email.autoComplete}
        required
        inputRef={register("email")}
      />
      <FormField
        label={content.fields.phone.label}
        optionalLabel={content.optional}
        name="phone"
        type="tel"
        value={values.phone}
        onChange={change}
        error={errors.phone}
        autoComplete={content.fields.phone.autoComplete}
        inputRef={register("phone")}
      />
      <Box sx={{ gridColumn: "1 / -1" }}>
        <FormField
          label={content.fields.message.label}
          name="message"
          value={values.message}
          onChange={change}
          error={errors.message}
          placeholder={content.fields.message.placeholder}
          multiline
          rows={5}
          required
          inputRef={register("message")}
        />
      </Box>
      <Box sx={{ gridColumn: "1 / -1" }}>
        <FormField
          label={captchaLabel}
          name="captcha"
          value={values.captcha}
          onChange={change}
          error={errors.captcha}
          inputMode="numeric"
          autoComplete="off"
          inputWidth={120}
          required
          disabled={challenge.state !== "ready"}
          inputRef={register("captcha")}
          after={
            <ButtonBase
              type="button"
              onClick={() => {
                setValues((current) => ({ ...current, captcha: "" }));
                loadChallenge();
              }}
              sx={{
                minHeight: 44,
                px: 0.5,
                fontFamily: fonts.display,
                fontWeight: 500,
                fontSize: "0.875rem",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                borderRadius: `${radius.md}px`,
              }}
            >
              {content.captcha.renew}
            </ButtonBase>
          }
        />
      </Box>
      <Box
        aria-hidden
        sx={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </Box>
      <Typography variant="caption" component="p" sx={{ gridColumn: "1 / -1", color: "text.secondary", m: 0 }}>
        {content.privacy.before}
        <Link href={content.privacy.href} color="inherit" sx={{ fontWeight: 500 }}>
          {content.privacy.link}
        </Link>
        {content.privacy.after}
      </Typography>
      <Box aria-live="polite" sx={{ gridColumn: "1 / -1", "&:empty": { display: "none" } }}>
        {notice && (
          <Typography
            variant="body2"
            sx={{ p: 2, borderRadius: `${radius.md}px`, bgcolor: colors.ink, color: colors.paper }}
          >
            {notice}
          </Typography>
        )}
      </Box>
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={sending || challenge.state !== "ready"}
          endIcon={sending ? undefined : <Icon name="arrowRight" size={18} />}
          sx={{
            minWidth: 220,
            bgcolor: colors.ink,
            color: colors.paper,
            "&:hover": { bgcolor: colors.inkRaised },
            "&.Mui-disabled": { bgcolor: colors.inkRaised, color: colors.line },
          }}
        >
          {sending ? (
            <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1.25 }}>
              {content.sending}
              <Box component="span" aria-hidden sx={{ display: "inline-flex", gap: "4px" }}>
                {[0, 1, 2].map((index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      bgcolor: colors.yellow,
                      animation: `${hop} 900ms ${motion.ease.inOut} ${index * 150}ms infinite`,
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            content.submit
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
