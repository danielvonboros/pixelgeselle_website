import type { IconName } from "../assets/icons";
import { pricing } from "./packages";
import { SECTION_IDS } from "./site";

export const processIntro = {
  id: SECTION_IDS.process,
  // Section number in the eyebrow, counted in page order on the home page.
  index: "02",
  eyebrow: "So läuft dein Projekt",
  title: "Vier Schritte, und deine neue Website ist online.",
  lead: "Du investierst rund eine Stunde deiner Zeit. Alles andere übernehmen wir und halten dich dabei auf dem Laufenden.",
};

export interface ProcessStep {
  icon: IconName;
  title: string;
  text: string;
  duration: string;
  days: [start: number, end: number];
}

export const steps: ProcessStep[] = [
  {
    icon: "message",
    title: "Erstgespräch",
    text: "Wir klären, was dein Betrieb braucht und welche Größe passt. Danach bekommst du ein verbindliches Angebot zum Festpreis.",
    duration: "15 Minuten, kostenlos",
    days: [0, 0],
  },
  {
    icon: "edit",
    title: "Interview",
    text: "Du erzählst, wir fragen nach. Aus dem Gespräch schreiben wir alle Texte, suchmaschinenfreundlich und in deiner Sprache.",
    duration: "30 Minuten",
    days: [1, 1],
  },
  {
    icon: "layout",
    title: "Entwurf und Feedback",
    text: "Du siehst deine Website, bevor sie online geht, und gibst dein Feedback. Änderungswünsche setzen wir in zwei Korrekturrunden um.",
    duration: "ca. 1 Woche",
    days: [2, 8],
  },
  {
    icon: "launch",
    title: "Online gehen",
    text: "Wir kümmern uns um Domain, Hosting, Impressum-Struktur und ab Größe M um dein Google-Unternehmensprofil. Dann ist deine Seite live.",
    duration: "ca. 1 Woche",
    days: [9, 14],
  },
];

export const schedule = {
  title: "Bauzeitenplan",
  dayLabel: "Tag",
  totalDays: pricing.deliveryDays,
  doneLabel: "Online",
};
