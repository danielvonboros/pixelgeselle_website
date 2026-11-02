import { site } from "./site";

export const contactForm = {
  endpoint: "/api/contact.php",
  title: "Oder schreib uns",
  text: "Erzähl uns kurz, worum es geht. Wir melden uns persönlich bei dir.",
  label: "Kontaktformular",
  optional: "optional",
  fields: {
    name: { label: "Name", autoComplete: "name" },
    company: { label: "Betrieb", autoComplete: "organization" },
    email: { label: "E-Mail", autoComplete: "email" },
    phone: { label: "Telefon", autoComplete: "tel" },
    message: {
      label: "Worum geht es?",
      placeholder: "Zum Beispiel: Wir sind ein Dachdeckerbetrieb mit acht Leuten und brauchen eine neue Website mit Karriereseite.",
    },
  },
  captcha: {
    label: "Kurze Rechenaufgabe gegen Spam",
    loading: "Aufgabe wird geladen …",
    unavailable: "Die Aufgabe konnte nicht geladen werden.",
    renew: "Neue Aufgabe",
  },
  privacy: {
    before: "Wir nutzen deine Angaben nur, um dir zu antworten. Mehr dazu in der ",
    link: "Datenschutzerklärung",
    href: "/datenschutz",
    after: ".",
  },
  submit: "Nachricht senden",
  sending: "Wird gesendet",
  success: {
    title: "Danke, deine Nachricht ist angekommen.",
    text: "Wir lesen sie persönlich und melden uns bei dir.",
    again: "Weitere Nachricht schreiben",
  },
  errors: {
    required: "Bitte ausfüllen.",
    email: "Bitte gib eine gültige E-Mail-Adresse ein.",
    phone: "Bitte nur Ziffern, Leerzeichen und + / - ( ) verwenden.",
    captcha: "Das Ergebnis stimmt nicht. Bitte rechne die neue Aufgabe.",
    expired: "Die Aufgabe ist abgelaufen. Bitte rechne die neue Aufgabe.",
    tooFast: "Das ging sehr schnell. Bitte warte einen Moment und sende noch einmal.",
    rateLimited: `Du hast gerade mehrere Nachrichten geschickt. Bitte versuch es später noch einmal oder schreib an ${site.email}.`,
    general: `Das hat leider nicht geklappt. Bitte versuch es noch einmal oder schreib direkt an ${site.email}.`,
  },
};

export type ContactFormContent = typeof contactForm;
