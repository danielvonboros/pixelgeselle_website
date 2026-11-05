import type { IconName } from "../assets/icons";
import { formatEuro, startingPrice } from "./packages";

export const facts: { icon: IconName; label: string }[] = [
  { icon: "euro", label: `Festpreis ab ${formatEuro(startingPrice)} netto` },
  { icon: "clock", label: "Online in 14 Tagen" },
  { icon: "edit", label: "Texte und SEO inklusive" },
  { icon: "phone", label: "Für Handy und Rechner" },
  { icon: "mapPin", label: "Persönlich aus Berlin" },
];
