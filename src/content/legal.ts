import { site } from "./site";

export interface LegalPage {
  path: string;
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const imprint: LegalPage = {
  path: "/impressum",
  title: "Impressum",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: [site.name, site.legalName, "[Straße und Hausnummer]", "[PLZ] Berlin"],
    },
    {
      heading: "Vertreten durch die Gesellschafter",
      paragraphs: ["Daniel von Boros", "Alexander Sanwald"],
    },
    {
      heading: "Kontakt",
      paragraphs: [`E-Mail: ${site.email}`, "Telefon: [Telefonnummer]"],
    },
    {
      heading: "Umsatzsteuer",
      paragraphs: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]"],
    },
    {
      heading: "Verantwortlich für den Inhalt",
      paragraphs: ["Daniel von Boros und Alexander Sanwald, Anschrift wie oben"],
    },
  ],
};

export const privacy: LegalPage = {
  path: "/datenschutz",
  title: "Datenschutzerklärung",
  sections: [
    {
      heading: "Hinweis",
      paragraphs: [
        "[Hier den vollständigen Text der Datenschutzerklärung einfügen, zum Beispiel aus einem Datenschutz-Generator. Er muss Hosting, Server-Logfiles, Kontakt per E-Mail, das Kontaktformular, die Terminbuchung und das Laden der Schriften abdecken.]",
      ],
    },
  ],
};

export const legalPages = [imprint, privacy];
