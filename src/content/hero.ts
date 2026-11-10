import type { PixelSiteEntry } from "../components/pixelSite/PixelSite";
import { demoAddress, demoImage } from "./demos";
import { pricing } from "./packages";

export const hero = {
  eyebrow: "Websites für Handwerker und Betriebe, deutschlandweit",
  headline: ["Deine Website.", "Fester Preis.", "Klarer Ablauf."],
  lead: "Ein Gespräch von 30 Minuten, den Rest übernehmen wir: Texte, Webdesign und Umsetzung. Du kümmerst dich um deinen Betrieb und bekommst eine Website, die bei Google gefunden wird und auf dem Handy gut aussieht.",
  primaryCta: "Kostenloses Erstgespräch buchen",
  secondaryCta: "Preise ansehen",
};

const sites: PixelSiteEntry[] = [
  { id: "raumton", name: "Raumton", trade: "Maler aus Berlin", address: demoAddress("raumton"), image: demoImage("raumton") },
  { id: "phase", name: "Phase", trade: "Elektriker aus Köln", address: demoAddress("phase"), image: demoImage("phase") },
  { id: "firstlinie", name: "Firstlinie", trade: "Dachdecker aus Hamburg", address: demoAddress("firstlinie"), image: demoImage("firstlinie") },
];

export const heroVisual = {
  sites,
  days: pricing.deliveryDays,
  dayLabel: "Tag",
  onlineLabel: "Online",
  dimensionLabel: `${pricing.deliveryDays} Tage vom Interview bis online`,
};
