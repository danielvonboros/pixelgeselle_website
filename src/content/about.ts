import alexanderPhoto from "../assets/images/team/alexander-sanwald.webp";
import danielPhoto from "../assets/images/team/daniel-von-boros.webp";
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
    role: "Architekt M.Sc. und Full-Stack-Entwickler",
    email: "daniel@pixelgesellen.de",
    photo: danielPhoto,
    paragraphs: [
      "Daniel hat jahrelang Gebäude geplant und Baustellen in Berlin und Brandenburg betreut. Er kennt deinen Arbeitsalltag: früh raus, viel unterwegs, Angebote am Abend. In seiner Zeit auf der Baustelle hat er gelernt, worauf es auf dem Bau ankommt: Struktur und effiziente Umsetzung.",
      "Seit 2021 entwickelt er Websites und Weboberflächen, zuletzt mehrere Jahre in einem Softwareunternehmen. Bei den Pixelgesellen gestaltet und baut er deine Seite nach deinen Wünschen.",
    ],
    highlights: ["Architekt M.Sc. mit Erfahrung in Planung und Bauleitung", "Full-Stack-Entwickler seit 2021"],
  },
  {
    name: "Alexander Sanwald",
    role: "Produktmanager und Berater",
    email: "alex@pixelgesellen.de",
    photo: alexanderPhoto,
    paragraphs: [
      "Alexander arbeitet seit 14 Jahren im Produkt- und Projektmanagement. Als Berater begleitet er Startups, wachsende Firmen und KMUs, vom Plan bis zum fertigen Produkt, von Umstrukturierung zu Wachstum und Branchenwechsel. Er hat zahlreiche Produkte in KMUs und Startups auf den Markt gebracht und weiß, wie man aus vielen Wünschen einen klaren Plan macht. Dies Branchenübergreifende Erfahrung in Markt- und Markenwirksamkeit bringt er in den Ablauf deines Projekts ein.",
      "14 Jahre in Industrie und Konsumgüterindustrie, sowie technischen Dienstleistungsbranchen. Er hat mehrere Produkte in kleinen Firmen und Startups auf den Markt gebracht und weiß, wie man aus vielen Wünschen einen klaren Plan macht. Diese Erfahrung bringt er in den Ablauf deines Projekts ein.",
    ],
    highlights: ["14 Jahre in Industrie und Konsumgüterindustrie, sowie technischen Dienstleistungsbranchen",
"Dipl.-Wirt.-Ing.-Maschinenbau"],
  },
];

export const company = {
  name: site.name,
  legalName: site.legalName,
  contactLabel: "Gemeinsamer Kontakt",
  email: site.email,
};
