export const SECTION_IDS = {
  process: "ablauf",
  packages: "preise",
  examples: "beispiele",
  about: "team",
  faq: "fragen",
  booking: "termin",
};

export const site = {
  name: "Pixelgesellen",
  legalName: "Boros & Sanwald GbR",
  url: "https://pixelgesellen.de",
  email: "kontakt@pixelgesellen.de",
  bookingUrl: "https://cal.com/pixelgesellen/erstgespraech",
  demosUrl: "https://demos.pixelgesellen.de",
  region: "ganz Deutschland",
};

export const navItems = [
  { href: `/#${SECTION_IDS.process}`, label: "Ablauf" },
  { href: `/#${SECTION_IDS.packages}`, label: "Preise" },
  { href: `/#${SECTION_IDS.examples}`, label: "Beispiele" },
  { href: `/#${SECTION_IDS.about}`, label: "Team" },
  { href: `/#${SECTION_IDS.faq}`, label: "Fragen" },
];

export const ctaLabel = "Gespräch buchen";
