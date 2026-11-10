import { site } from "./site";

// Addresses of the demo sites on demos.pixelgesellen.de, shared by hero, packages and examples.
export const demoUrl = (slug: string) => `${site.demosUrl}/${slug}/`;
export const demoImage = (slug: string) => `${site.demosUrl}/catalog/${slug}.jpg`;
export const demoAddress = (slug: string) => `${site.demosUrl.replace(/^https?:\/\//, "")}/${slug}`;
