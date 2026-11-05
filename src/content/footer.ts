import { site } from "./site";

export const footer = {
  claim: "Websites mit Handwerk. Fester Preis, klarer Ablauf.",
  region: `Aus Berlin für Betriebe in ${site.region}.`,
  owner: `Inhaber: ${site.owner}`,
  legalLinks: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ],
};
