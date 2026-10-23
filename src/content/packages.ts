import type { PricingCardProps } from "../components/pricingCard/PricingCard";
import { ctaLabel, SECTION_IDS } from "./site";

const bookingHref = `#${SECTION_IDS.booking}`;

export const packagesIntro = {
  id: SECTION_IDS.packages,
  eyebrow: "Pakete und Preise",
  title: "Feste Preise. Keine Überraschungen.",
  lead: "Du weißt vorher, was deine Website kostet und was drin ist. Wenn du mehr brauchst, sprechen wir vorher darüber.",
};

export const packages: PricingCardProps[] = [
  {
    name: "Start",
    price: "1.200 €",
    priceSuffix: "netto, einmalig",
    description: "Für Betriebe, die schnell und solide online sein wollen.",
    features: [
      "Onepager mit bis zu 5 Abschnitten",
      "Texte aus dem Interview, suchmaschinenfreundlich",
      "Gestaltung passend zu deinem Betrieb",
      "Optimiert für Handy und Rechner",
      "Kontaktformular und Anfahrt",
      "1 Korrekturrunde",
    ],
    ctaLabel,
    ctaHref: bookingHref,
  },
  {
    name: "Standard",
    price: "2.200 €",
    priceSuffix: "netto, einmalig",
    description: "Für Betriebe mit mehreren Leistungen und Referenzen.",
    features: [
      "Bis zu 6 Unterseiten",
      "Alles aus dem Paket Start",
      "Eigene Seite pro Leistung für bessere Google-Treffer",
      "Referenzen und Bildergalerie",
      "Google-Unternehmensprofil eingerichtet",
      "2 Korrekturrunden",
    ],
    ctaLabel,
    ctaHref: bookingHref,
    badge: "Empfehlung",
    highlighted: true,
  },
  {
    name: "Betreuung",
    price: "39 €",
    priceSuffix: "netto pro Monat",
    description: "Damit du dich nach dem Start um nichts kümmern musst.",
    features: [
      "Hosting und SSL-Zertifikat",
      "Domain inklusive",
      "Technische Updates und Backups",
      "Kleine Änderungen bis 30 Minuten im Monat",
      "Monatlich kündbar",
    ],
    ctaLabel: "Mit anfragen",
    ctaHref: bookingHref,
  },
];

export const packagesNote = "Alle Preise zzgl. gesetzlicher MwSt. Fotos sind nicht enthalten, ich empfehle dir aber gern jemanden aus der Region.";
