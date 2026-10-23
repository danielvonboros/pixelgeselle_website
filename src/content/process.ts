import type { IconName } from "../assets/icons";
import { SECTION_IDS } from "./site";

export const processIntro = {
  id: SECTION_IDS.process,
  eyebrow: "So läuft dein Projekt",
  title: "Vier Schritte, und deine Seite ist online.",
  lead: "Du investierst rund eine Stunde deiner Zeit. Alles andere übernehme ich und halte dich dabei auf dem Laufenden.",
};

export const steps: { icon: IconName; title: string; text: string; duration: string }[] = [
  {
    icon: "message",
    title: "Erstgespräch",
    text: "Wir klären, was dein Betrieb braucht und welches Paket passt. Danach bekommst du ein verbindliches Angebot zum Festpreis.",
    duration: "15 Minuten, kostenlos",
  },
  {
    icon: "edit",
    title: "Interview",
    text: "Du erzählst, ich frage nach. Aus dem Gespräch schreibe ich alle Texte, suchmaschinenfreundlich und in deiner Sprache.",
    duration: "30 Minuten",
  },
  {
    icon: "layout",
    title: "Entwurf und Feedback",
    text: "Du siehst deine Website, bevor sie online geht, und gibst dein Feedback. Änderungswünsche setze ich in einer Korrekturrunde um.",
    duration: "ca. 2 Wochen",
  },
  {
    icon: "launch",
    title: "Online gehen",
    text: "Ich kümmere mich um Domain, Hosting, Impressum-Struktur und dein Google-Unternehmensprofil. Dann ist deine Seite live.",
    duration: "ca. 1 Woche",
  },
];
