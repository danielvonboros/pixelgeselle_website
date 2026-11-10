import type { IconName } from "../assets/icons";
import type { PricingCardProps } from "../components/pricingCard/PricingCard";

export interface ProductLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface ProductAction extends ProductLink {
  tone?: "brand" | "light";
}

export interface ProductImageLink {
  href: string;
  label?: string;
  external?: boolean;
}

export interface ProductBandContent {
  headingId: string;
  eyebrow: string;
  title: string;
  text: string;
  features: string[];
  image: string;
  imageLink?: ProductImageLink;
  actions: ProductAction[];
  note?: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  lead: string;
}

export interface ProductDownload {
  title: string;
  text: string;
  href: string;
  details: string;
}

export interface ProductDetail {
  path: string;
  documentTitle: string;
  description: string;
  backLink: ProductLink;
  hero: ProductBandContent;
  parts: SectionIntro & { items: { icon: IconName; title: string; text: string }[] };
  video: SectionIntro & { src: string; poster: string; label: string };
  pricing: SectionIntro & { packages: PricingCardProps[]; notIncluded: string };
  services: { title: string; lead: string; items: { name: string; text: string; price: string }[] };
  downloads: SectionIntro & { items: ProductDownload[] };
  contact: { title: string; lead: string; action: ProductLink };
}
