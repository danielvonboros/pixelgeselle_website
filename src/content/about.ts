import { SECTION_IDS, site } from "./site";

export const aboutIntro = {
  id: SECTION_IDS.about,
  eyebrow: "Wer dahintersteckt",
  title: "Zwei Gesellen, kein Callcenter.",
  lead: `Hinter den ${site.name} stehen Daniel von Boros und Alexander Sanwald. Einer kennt die Baustelle und baut deine Website, der andere bringt Struktur in jedes Projekt. Vom Erstgespräch bis zum Start hast du zwei feste Ansprechpartner.`,
};

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  photo?: string;
  paragraphs: string[];
  highlights: string[];
}

export const team: TeamMember[] = [
  {
    name: "Daniel von Boros",
    role: "Architekt M.Sc. und Frontend-Entwickler",
    email: "daniel@pixelgesellen.de",
    paragraphs: [
      "Daniel hat jahrelang Gebäude geplant und Baustellen in Berlin und Brandenburg betreut. Er weiß, wie dein Alltag aussieht: früh raus, viel unterwegs, Angebote am Abend.",
      "Seit 2021 entwickelt er Websites und Weboberflächen, zuletzt mehrere Jahre in einem Softwareunternehmen. Bei den Pixelgesellen gestaltet und baut er deine Seite.",
    ],
    highlights: ["Architekt M.Sc. mit Erfahrung in Planung und Bauleitung", "Frontend-Entwickler seit 2021"],
  },
  {
    name: "Alexander Sanwald",
    role: "Produktmanager und Berater",
    email: "alex@pixelgesellen.de",
    paragraphs: [
      "Alexander arbeitet seit 14 Jahren im Produktmanagement. Als Berater begleitet er Startups und wachsende Firmen, unter anderem aus der Autobranche, vom Plan bis zum fertigen Produkt.",
      "Er hat mehrere Produkte in kleinen Firmen und Startups auf den Markt gebracht und weiß, wie man aus vielen Wünschen einen klaren Plan macht. Diese Erfahrung bringt er in den Ablauf deines Projekts ein.",
    ],
    highlights: ["14 Jahre Produktmanagement", "Mehrere Produktstarts in kleinen Firmen und Startups"],
  },
];

export const company = {
  name: site.name,
  legalName: site.legalName,
  contactLabel: "Gemeinsamer Kontakt",
  email: site.email,
};
