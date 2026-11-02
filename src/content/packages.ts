import type { IconName } from "../assets/icons";
import { SECTION_IDS, site } from "./site";

export type PackageId = "s" | "m" | "l";
export type FeatureId = "booking" | "calculator" | "careers";

export interface ExampleLink {
  label: string;
  href: string;
}

export interface PackageOffer {
  id: PackageId;
  name: string;
  price: number;
  carePerMonth: number;
  pages: number;
  scope: string;
  description: string;
  basis?: string;
  features: string[];
  examples: ExampleLink[];
  includedFeatures: number;
  googleProfileIncluded: boolean;
  highlighted?: boolean;
}

export interface FeatureOffer {
  id: FeatureId;
  name: string;
  text: string;
  price: number;
}

export const pricing = {
  vatNote: "Alle Preise netto, zzgl. gesetzlicher MwSt.",
  photoNote: "Fotos sind nicht enthalten, wir empfehlen dir aber gern jemanden aus deiner Region.",
  extraPagePrice: 120,
  googleProfilePrice: 190,
  correctionRounds: 2,
  deliveryDays: 14,
  referenceDiscount: 0.3,
  referenceSlots: 5,
  referenceSlotsLeft: 5,
};

const demo = (slug: string) => `${site.demosUrl}/${slug}/`;

export const packageOffers: PackageOffer[] = [
  {
    id: "s",
    name: "S",
    price: 1090,
    carePerMonth: 29,
    pages: 3,
    scope: "Bis 3 Seiten",
    description: "Für Betriebe, die schnell und sauber online sein wollen.",
    features: ["Startseite, Leistungen und Kontakt", "Google-Unternehmensprofil geprüft"],
    examples: [{ label: "Raumton, Maler aus Berlin", href: demo("raumton") }],
    includedFeatures: 0,
    googleProfileIncluded: false,
  },
  {
    id: "m",
    name: "M",
    price: 1790,
    carePerMonth: 39,
    pages: 6,
    scope: "Bis 6 Seiten",
    description: "Für Betriebe mit mehreren Leistungen, die auch Leute suchen.",
    basis: "Alles aus S, dazu",
    features: [
      "Eigene Seite pro Leistung, damit dich Google besser findet",
      "Referenzen und Bildergalerie",
      "Anfrageformular mit Foto-Upload",
      "Karriereseite mit Schnellbewerbung per Handy",
      "Google-Unternehmensprofil eingerichtet",
    ],
    examples: [
      { label: "Phase, Elektriker aus Köln", href: demo("phase") },
      { label: "Firstlinie, Dachdecker aus Hamburg", href: demo("firstlinie") },
    ],
    includedFeatures: 0,
    googleProfileIncluded: true,
    highlighted: true,
  },
  {
    id: "l",
    name: "L",
    price: 2990,
    carePerMonth: 59,
    pages: 12,
    scope: "Bis 12 Seiten",
    description: "Für Betriebe, deren Website ihnen Arbeit abnehmen soll.",
    basis: "Alles aus M, dazu",
    features: [
      "Eine Funktion nach Wahl inklusive",
      "Projekte mit Vorher-Nachher-Bildern",
      "Mehrere Standorte oder Gewerke",
      "Eigene Seiten für die Orte in deinem Einzugsgebiet",
    ],
    examples: [{ label: "Werkstatt Ahrens, Schreiner aus München", href: demo("ahrens") }],
    includedFeatures: 1,
    googleProfileIncluded: true,
  },
];

export const featureOffers: FeatureOffer[] = [
  {
    id: "booking",
    name: "Online-Terminbuchung",
    text: "Kundinnen buchen Besichtigungen selbst, du bestätigst per Klick.",
    price: 390,
  },
  {
    id: "calculator",
    name: "Preisrechner für deine Kunden",
    text: "Zum Beispiel: Was kostet mein neues Bad? Die Anfrage kommt vorsortiert bei dir an.",
    price: 590,
  },
  {
    id: "careers",
    name: "Bewerbungsportal",
    text: "Mehrere Stellen, Ausbildung und eine Bewerbung in einer Minute, ohne Anschreiben.",
    price: 390,
  },
];

export const formatEuro = (amount: number) =>
  `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(amount)} €`;

const [smallest] = packageOffers;
const recommended = packageOffers.find((offer) => offer.highlighted) ?? smallest;

export const packagesIntro = {
  id: SECTION_IDS.packages,
  eyebrow: "Preise",
  title: "Eine Website in deiner Größe.",
  lead: "Jede Größe bekommt dieselbe Sorgfalt. Der Unterschied ist, wie viel dein Betrieb zeigen will. Du zahlst einmal, und die Website gehört dir.",
};

export const includedEverywhere: { title: string; items: { icon: IconName; label: string }[] } = {
  title: "In jeder Größe drin",
  items: [
    { icon: "edit", label: "Texte aus dem Interview" },
    { icon: "layout", label: "Eigene Gestaltung" },
    { icon: "phone", label: "Für Handy und Rechner" },
    { icon: "message", label: "Kontaktformular und Anfahrt" },
    { icon: "check", label: `${pricing.correctionRounds} Korrekturrunden` },
    { icon: "clock", label: `Online in ${pricing.deliveryDays} Tagen` },
  ],
};

export const sizeTable = {
  columns: { size: "Größe", content: "Was reinpasst", price: "Preis" },
  sizeLabel: (name: string) => `Größe ${name}`,
  badge: "Empfehlung",
  examplesLabel: "So sieht das aus:",
  price: (offer: PackageOffer) => ({
    amount: formatEuro(offer.price),
    suffix: "einmalig",
    detail: `Betreuung optional: ${formatEuro(offer.carePerMonth)} im Monat, monatlich kündbar`,
  }),
};

const discounted = (price: number) => Math.round(price * (1 - pricing.referenceDiscount));

export const launchOffer = {
  title: "Startangebot",
  text: `Die ersten ${pricing.referenceSlots} Betriebe bekommen ${pricing.referenceDiscount * 100} % auf den Festpreis. Dafür bekommen wir eine ehrliche Bewertung und dürfen deine Seite als Referenz zeigen.`,
  example: `Größe ${recommended.name} kostet dann ${formatEuro(discounted(recommended.price))} statt ${formatEuro(recommended.price)}.`,
  slots: `Noch ${pricing.referenceSlotsLeft} von ${pricing.referenceSlots} Plätzen frei`,
};

export const addOns = {
  title: "Zum Anbauen",
  lead: "Funktionen, die dir Arbeit abnehmen. In Größe L ist eine davon schon drin.",
  items: [
    ...featureOffers.map((feature) => ({ name: feature.name, text: feature.text, price: formatEuro(feature.price) })),
    {
      name: "Zusätzliche Seite",
      text: "Wenn dein Betrieb mehr zu zeigen hat, als in deine Größe passt.",
      price: formatEuro(pricing.extraPagePrice),
    },
    {
      name: "Google-Unternehmensprofil einrichten",
      text: "Für Größe S. In M und L ist das Einrichten schon drin.",
      price: formatEuro(pricing.googleProfilePrice),
    },
  ],
};

export const packagesNote = `${pricing.vatNote} ${pricing.photoNote}`;
