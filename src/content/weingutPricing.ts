import type { ProductDetail } from "./productDetail";
import { SECTION_IDS } from "./site";

const contactHref = `/#${SECTION_IDS.booking}`;
const contactLabel = "Gespräch vereinbaren";

export const weingutPricing: ProductDetail["pricing"] = {
  eyebrow: "Preise",
  title: "Drei Pakete, Einrichtung inklusive.",
  lead: "Einmalig zahlst du Website, Einrichtung mit Stripe und Schulungsmaterial. Monatlich kommen Hosting, Datenbank, Updates, Backups und Support dazu. Alle Preise netto.",
  packages: [
    {
      name: "Traube",
      description: "Online-Shop",
      price: "2.990 €",
      priceSuffix: "einmalig",
      priceNote: "+ 49 € pro Monat Betrieb",
      features: ["Preisliste online bestellbar", "Online-Zahlung", "Bestellmail und PDF"],
      ctaLabel: contactLabel,
      ctaHref: contactHref,
    },
    {
      name: "Rebe",
      description: "Komfort",
      price: "3.990 €",
      priceSuffix: "einmalig",
      priceNote: "+ 79 € pro Monat Betrieb",
      features: ["Alles aus Traube", "Kacheln, Kiste und Weinfinder", "Kistenrabatt und Rechnung als PDF", "Events mit Tickets"],
      ctaLabel: contactLabel,
      ctaHref: contactHref,
    },
    {
      name: "Weinberg",
      description: "All-in-One",
      price: "4.990 €",
      priceSuffix: "einmalig",
      priceNote: "+ 119 € pro Monat Betrieb",
      features: ["Alles aus Rebe", "Kundenkonto und Vorkasse", "Lager-Weiterleitung und Export", "Zimmerbuchung"],
      ctaLabel: contactLabel,
      ctaHref: contactHref,
    },
  ],
  notIncluded: "Nicht enthalten: die Gebühren je Zahlung, die direkt an Stripe gehen, und die Domain.",
};

export const weingutServices: ProductDetail["services"] = {
  title: "Optionale Servicepakete",
  lead: "Zusatzleistungen wie Fotos, Texte oder Sonderwünsche rechnen wir nach Aufwand ab.",
  items: [
    { name: "Pflege-Paket", text: "Texte, Bilder und Preislisten-Updates erledigen wir für dich.", price: "39 € / Monat" },
    { name: "Jahrgangs-Update", text: "Neue Preisliste und Jahrgänge einpflegen.", price: "149 €" },
    { name: "Live-Schulung", text: "Zwei Stunden per Video für dich und dein Team.", price: "190 €" },
    { name: "Priority-Support", text: "Antwort am selben Tag.", price: "29 € / Monat" },
  ],
};
