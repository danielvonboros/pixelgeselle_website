import { team } from "./about";
import { formatEuro, packageOffers, pricing } from "./packages";
import { site } from "./site";

const prices = packageOffers.map((offer) => offer.price);
const startingPrice = formatEuro(Math.min(...prices));

export const seo = {
  title: `Website für Handwerker zum Festpreis | ${site.name}`,
  description: `Deine neue Website zum Festpreis ab ${startingPrice} netto, in ${pricing.deliveryDays} Tagen online: Interview, Texte, Gestaltung und Umsetzung aus einer Hand. Für Handwerks- und Dienstleistungsbetriebe in ${site.region}.`,
  shareDescription: `Ein Interview von 30 Minuten, den Rest übernehmen wir: Texte, Gestaltung und Umsetzung. Festpreis ab ${startingPrice} netto.`,
  image: { url: `${site.url}/og.png`, width: 1200, height: 630 },
};

export const pageTitle = (title?: string) => (title ? `${title} | ${site.name}` : seo.title);

export const robots = (noIndex: boolean) => (noIndex ? "noindex, follow" : "index, follow");

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.owner,
  description: "Websites zum Festpreis für Handwerks- und Dienstleistungsbetriebe.",
  url: `${site.url}/`,
  email: site.email,
  image: seo.image.url,
  founder: team.map((member) => ({ "@type": "Person", name: member.name })),
  areaServed: { "@type": "Country", name: "Deutschland" },
  priceRange: `${startingPrice} – ${formatEuro(Math.max(...prices))}`,
  makesOffer: packageOffers.map((offer) => ({
    "@type": "Offer",
    name: `Website Größe ${offer.name}`,
    price: String(offer.price),
    priceCurrency: "EUR",
  })),
};
