import weingutPreview from "../assets/images/products/weingut.jpg";
import type { ProductDetail } from "./productDetail";
import { SECTION_IDS } from "./site";
import { weingutPricing, weingutServices } from "./weingutPricing";

export const weingutPath = "/produkte/weingut";
export const weingutDemoUrl = "https://weingut-template-production.up.railway.app";

export const weingut: ProductDetail = {
  path: weingutPath,
  documentTitle: "Wein&Gut: Shop und Verwaltung für Weingüter",
  description:
    "Wein&Gut von den Pixelgesellen: neue Website, Online-Shop und Verwaltung für Weingüter. Aus der Preisliste wird ein Shop, Einrichtung inklusive, online in weniger als vier Wochen.",
  backLink: { href: "/produkte", label: "Zurück zu allen Produkten" },
  hero: {
    headingId: "wein-und-gut-titel",
    eyebrow: "Wein&Gut · Für Weingüter",
    title: "Dein Weingut-Shop statt PDF-Preisliste.",
    text: "Eine neue Website und ein komplettes Verkaufs- und Verwaltungssystem in einem. Aus deiner Preisliste wird ein Shop, Bestellungen, Rechnungen und Kunden laufen im Keller zusammen. Einrichtung inklusive, online in weniger als vier Wochen.",
    features: [
      "Website mit Weingut, Shop, Events, Feiern und Zimmern",
      "Shop mit Weinkiste, Kistenrabatt, Online-Zahlung und Kundenkonto",
      "Verwaltung „Keller“ für Bestellungen, Rechnungen und Kunden",
      "Export für den Steuerberater mit einem Klick",
      "Am Rechner, Tablet und Handy",
    ],
    image: weingutPreview,
    actions: [{ href: weingutDemoUrl, label: "Live-Demo ansehen", external: true }],
    note: "Entwickelt von Alexander Sanwald. Die Demo nimmt keine echten Bestellungen an.",
  },
  parts: {
    eyebrow: "Was du bekommst",
    title: "Website, Shop und Verwaltung aus einer Hand.",
    lead: "Drei Teile, die zusammenarbeiten. Die Einrichtung übernehmen wir auf Basis deiner Preisliste.",
    items: [
      {
        icon: "layout",
        title: "Die Website",
        text: "Startseite, Weingut, Weine und Shop, Termine und Events, Feiern und Tagen, Übernachten und Kontakt. Bereiche schaltest du selbst ein und aus.",
      },
      {
        icon: "euro",
        title: "Der Shop",
        text: "Preisliste als Liste oder Kacheln, Weinfinder nach Anlass, eine Kiste mit automatischem Kistenrabatt, Online-Zahlung und Kundenkonto.",
      },
      {
        icon: "check",
        title: "Der Keller",
        text: "Bestellungen von der Zahlung bis zur Abrechnung, Rechnungen auf Knopfdruck, Kunden, Events, Anfragen und Zimmer an einem Ort. Jede Rolle sieht nur ihren Teil.",
      },
    ],
  },
  video: {
    eyebrow: "Video",
    title: "Der Keller in zwei Minuten.",
    lead: "Ein Rundgang durch die Verwaltung: von der Bestellung über Rechnung und Packauftrag bis zum Export für den Steuerberater.",
    src: "/videos/wein-und-gut-keller.mp4",
    poster: "/videos/wein-und-gut-keller.jpg",
    label: "Erklärvideo zur Verwaltung Keller von Wein&Gut",
  },
  pricing: weingutPricing,
  services: weingutServices,
  downloads: {
    eyebrow: "Unterlagen",
    title: "Alle Details zum Nachlesen.",
    lead: "Funktionen und Preise als PDF zum Herunterladen. Die Unterlagen aktualisieren wir laufend.",
    items: [
      {
        title: "Shop und Website",
        text: "Was deine Kundschaft sieht: Startseite, Shop, Weinfinder, Kiste, Events und Zimmer.",
        href: "/downloads/wein-und-gut-shop-und-website.pdf",
        details: "PDF · 17 Seiten · 1,4 MB",
      },
      {
        title: "Verwaltung „Keller“",
        text: "Bestellungen, Rechnungen, Export, Anfragen, Zimmer, Rollen und Geräte.",
        href: "/downloads/wein-und-gut-verwaltung-keller.pdf",
        details: "PDF · 28 Seiten · 3,4 MB",
      },
      {
        title: "Leistungen und Kosten",
        text: "Pakete, laufender Betrieb und optionale Servicepakete im Überblick.",
        href: "/downloads/wein-und-gut-leistungen-und-kosten.pdf",
        details: "PDF · 5 Seiten · 130 KB",
      },
    ],
  },
  contact: {
    title: "Passt Wein&Gut zu deinem Weingut?",
    lead: "Schick uns deine Preisliste, wir zeigen dir im Gespräch, wie dein Shop aussehen kann.",
    action: { href: `/#${SECTION_IDS.booking}`, label: "Gespräch vereinbaren" },
  },
};
