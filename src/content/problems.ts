import { site } from "./site";

export const problemsIntro = {
  // Section number in the eyebrow, counted in page order on the home page.
  index: "01",
  eyebrow: "Kennst du das?",
  title: "Die Website ist das Letzte, wofür du Zeit hast.",
  lead: `Du bist gut in deinem Handwerk. Eine Website zu planen, zu texten und zu bauen gehört nicht dazu. Genau dafür gibt es die ${site.name}.`,
};

// Where on the old example website a problem is marked.
export type ProblemSpot = "layout" | "title" | "placeholder" | "credit";

export interface Problem {
  spot: ProblemSpot;
  title: string;
  text: string;
}

// Ordered from top to bottom of the old website, so the numbers read downwards.
export const problems: Problem[] = [
  {
    spot: "title",
    title: "Bei Google findet dich keiner",
    text: "Wer in deiner Gegend nach deinem Gewerk sucht, landet bei der Konkurrenz oder auf einem Vermittlungsportal.",
  },
  {
    spot: "layout",
    title: "Die alte Seite passt nicht mehr",
    text: "Auf dem Handy ist alles winzig, die Leistungen sind veraltet, und eigentlich schämst du dich ein bisschen dafür.",
  },
  {
    spot: "placeholder",
    title: "Keine Zeit für Texte",
    text: "Baukästen versprechen viel, aber Texte, Fotos und Aufbau bleiben trotzdem an dir hängen.",
  },
  {
    spot: "credit",
    title: "Agenturen sind zu teuer",
    text: "Angebote ab 5.000 € und Stundensätze ohne Obergrenze passen nicht zu einem kleinen Betrieb.",
  },
];

export const defectList = {
  title: "Mängelliste",
  subject: "Website, Stand 2014",
};

// Texts of the made-up outdated website. The company is invented.
export const oldSite = {
  address: "www.mueller-haustechnik.de",
  banner: "Willkommen auf unserer Homepage!",
  navigation: ["Home", "Über uns", "Leistungen", "Galerie", "Gästebuch", "Kontakt"],
  intro:
    "Herzlich willkommen bei der Firma Müller Haustechnik. Seit über 30 Jahren sind wir Ihr kompetenter Partner rund um Heizung, Sanitär und Klima. Auf diesen Seiten finden Sie Informationen über unser Unternehmen, unsere Leistungen und unsere Referenzen. Wir freuen uns auf Ihren Besuch!",
  services: ["Heizungsbau", "Sanitärinstallation", "Solaranlagen", "Wartung und Kundendienst"],
  galleryTitle: "Unsere Referenzen",
  galleryPlaceholder: "Bild folgt",
  galleryCount: 3,
  construction: "Diese Seite befindet sich noch im Aufbau. Hier entstehen in Kürze weitere Texte.",
  updated: "Letzte Aktualisierung: 14.03.2014",
  counter: "Sie sind Besucher Nr. 004211",
  credit: "Webdesign und Pflege: Agentur Meier, 95 € pro Stunde",
};
