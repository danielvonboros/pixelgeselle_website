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
      paragraphs: ["Daniel von Boros", "Pixelgeselle", "[Straße und Hausnummer]", "[PLZ] Berlin"],
    },
    {
      heading: "Kontakt",
      paragraphs: ["E-Mail: kontakt@pixelgeselle.de", "Telefon: [Telefonnummer]"],
    },
    {
      heading: "Umsatzsteuer",
      paragraphs: ["Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]"],
    },
    {
      heading: "Verantwortlich für den Inhalt",
      paragraphs: ["Daniel von Boros, Anschrift wie oben"],
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
        "[Hier den vollständigen Text der Datenschutzerklärung einfügen, zum Beispiel aus einem Datenschutz-Generator. Er muss Hosting, Server-Logfiles, Kontakt per E-Mail, die Terminbuchung und das Laden der Schriften abdecken.]",
      ],
    },
  ],
};

export const legalPages = [imprint, privacy];
