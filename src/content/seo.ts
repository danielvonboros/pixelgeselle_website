import { team } from "./about";
import { provider } from "./legal";
import { formatEuro, packageOffers, pricing, startingPrice } from "./packages";
import { SECTION_IDS, site } from "./site";

const prices = packageOffers.map((offer) => offer.price);
const startingFrom = formatEuro(startingPrice);

export const seo = {
  title: `Website für Handwerker erstellen lassen | ${site.name}`,
  // Google cuts descriptions at about 155 characters.
  description: `Wir erstellen deine Handwerker-Website zum Festpreis ab ${startingFrom} netto: Texte, Webdesign und Technik aus einer Hand, in ${pricing.deliveryDays} Tagen online.`,
  shareDescription: `Ein Interview von 30 Minuten, den Rest übernehmen wir: Texte, Gestaltung und Umsetzung. Festpreis ab ${startingFrom} netto.`,
  image: { url: `${site.url}/og.png`, width: 1200, height: 630 },
};

export const pageTitle = (title?: string) => (title ? `${title} | ${site.name}` : seo.title);

export const robots = (noIndex: boolean) => (noIndex ? "noindex, follow" : "index, follow");

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.owner,
  description: "Webdesign und Website-Erstellung zum Festpreis für Handwerks- und Dienstleistungsbetriebe.",
  url: `${site.url}/`,
  email: site.email,
  image: seo.image.url,
  logo: `${site.url}/favicon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: provider.street,
    postalCode: provider.postalCode,
    addressLocality: provider.city,
    addressCountry: "DE",
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  knowsAbout: [
    "Webdesign",
    "Website-Erstellung",
    "Websites für Handwerksbetriebe",
    "Frontend-Entwicklung",
    "Full-Stack-Entwicklung",
    "Suchmaschinenoptimierung",
  ],
  founder: team.map((member) => ({ "@type": "Person", name: member.name, jobTitle: member.role })),
  priceRange: `${startingFrom} – ${formatEuro(Math.max(...prices))}`,
  makesOffer: packageOffers.map((offer) => ({
    "@type": "Offer",
    name: `Website Größe ${offer.name}`,
    description: offer.description,
    url: `${site.url}/#${SECTION_IDS.packages}`,
    price: String(offer.price),
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: offer.price,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    },
  })),
};
