import { findLegalPage, legalPages, type LegalPage } from "./legal";

export const NOT_FOUND_PATH = "/404";

export type ResolvedPage = { kind: "home" } | { kind: "legal"; page: LegalPage } | { kind: "notFound" };

const homePaths = ["", "/index.html"];

export const resolvePage = (path: string): ResolvedPage => {
  const normalized = path.replace(/\/$/, "");
  if (homePaths.includes(normalized)) return { kind: "home" };
  const legalPage = findLegalPage(normalized);
  return legalPage ? { kind: "legal", page: legalPage } : { kind: "notFound" };
};

// Every page the build writes to dist/. Only indexable pages go into the sitemap.
export const routes = [
  { path: "/", indexable: true },
  ...legalPages.map((page) => ({ path: page.path, indexable: false })),
  { path: NOT_FOUND_PATH, indexable: false },
];
