import { pricing, startingPrice } from "./packages";

export interface Fact {
  // Shown large. Digits roll in like a counter.
  value: string;
  unit?: string;
  label: string;
}

export const factsLabel = "Auf einen Blick";

export const facts: Fact[] = [
  { value: String(startingPrice), unit: "€", label: "Festpreis ab, netto" },
  { value: String(pricing.deliveryDays), unit: "Tage", label: "vom Interview bis online" },
  { value: "0", unit: "Texte", label: "schreibst du selbst, SEO inklusive" },
  { value: "2", unit: "Gesellen", label: "als feste Ansprechpartner aus Berlin" },
];
