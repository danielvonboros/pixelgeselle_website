import createEmotionServer from "@emotion/server/create-instance";
import { renderToString } from "react-dom/server";
import Root from "./Root";
import { notFound } from "./content/notFound";
import { resolvePage, type ResolvedPage } from "./content/routes";
import { pageTitle, robots, seo, structuredData } from "./content/seo";
import { site } from "./content/site";
import { createEmotionCache } from "./theme/emotionCache";

// Build-time entry for scripts/prerender.js; never shipped to the browser.

export { routes } from "./content/routes";

export const siteUrl = site.url;

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const documentTitle = (page: ResolvedPage) => {
  if (page.kind === "legal") return pageTitle(page.page.title);
  if (page.kind === "notFound") return pageTitle(notFound.documentTitle);
  return pageTitle();
};

const headTags = (path: string) => {
  const page = resolvePage(path);
  const url = `${site.url}${page.kind === "legal" ? page.page.path : "/"}`;
  const title = escape(documentTitle(page));

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    // The 404 page answers for every unknown address, so it names no canonical URL of its own.
    ...(page.kind === "notFound" ? [] : [`<link rel="canonical" href="${url}" />`]),
    `<meta name="robots" content="${robots(page.kind !== "home")}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="de_DE" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${escape(seo.shareDescription)}" />`,
    `<meta property="og:image" content="${seo.image.url}" />`,
    `<meta property="og:image:width" content="${seo.image.width}" />`,
    `<meta property="og:image:height" content="${seo.image.height}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (page.kind === "home") {
    tags.push(`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`);
  }
  return tags.join("\n    ");
};

export const render = (path: string) => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(<Root cache={cache} path={path} />);
  const styles = constructStyleTagsFromChunks(extractCriticalToChunks(html));

  return { html, head: `${headTags(path)}\n    ${styles}` };
};
