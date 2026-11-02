import {
  featureOffers,
  packageOffers,
  pricing,
  type FeatureId,
  type FeatureOffer,
  type PackageId,
  type PackageOffer,
} from "../../content/packages";

export interface QuoteInput {
  packageId: PackageId;
  care: boolean;
  features: FeatureId[];
  extraPages: number;
  googleProfile: boolean;
}

export interface QuoteLine {
  label: string;
  amount: number;
  interval: "once" | "monthly";
  included?: boolean;
}

export interface Quote {
  offer: PackageOffer;
  oneOff: number;
  monthly: number;
  lines: QuoteLine[];
}

export const defaultQuoteInput: QuoteInput = {
  packageId: "m",
  care: true,
  features: [],
  extraPages: 0,
  googleProfile: false,
};

export const findOffer = (id: PackageId) => packageOffers.find((offer) => offer.id === id) ?? packageOffers[0];

export const calculateQuote = (input: QuoteInput): Quote => {
  const offer = findOffer(input.packageId);
  const chosen: FeatureOffer[] = featureOffers
    .filter((feature) => input.features.includes(feature.id))
    .sort((a, b) => b.price - a.price);
  const free = chosen.slice(0, offer.includedFeatures);
  const lines: QuoteLine[] = [];

  lines.push({ label: `Größe ${offer.name}`, amount: offer.price, interval: "once" });

  chosen.forEach((feature) => {
    const included = free.includes(feature);
    lines.push({ label: feature.name, amount: included ? 0 : feature.price, interval: "once", included });
  });

  if (input.extraPages > 0) {
    lines.push({
      label: input.extraPages === 1 ? "1 zusätzliche Seite" : `${input.extraPages} zusätzliche Seiten`,
      amount: input.extraPages * pricing.extraPagePrice,
      interval: "once",
    });
  }

  if (input.googleProfile && !offer.googleProfileIncluded) {
    lines.push({ label: "Google-Unternehmensprofil einrichten", amount: pricing.googleProfilePrice, interval: "once" });
  }

  if (input.care) {
    lines.push({ label: "Betreuung, monatlich kündbar", amount: offer.carePerMonth, interval: "monthly" });
  }

  const oneOff = lines.filter((line) => line.interval === "once").reduce((sum, line) => sum + line.amount, 0);
  const monthly = lines.filter((line) => line.interval === "monthly").reduce((sum, line) => sum + line.amount, 0);

  return { offer, oneOff, monthly, lines };
};
