// Renders every route of the built site to static HTML so content and
// styles arrive with the first response instead of after the JavaScript,
// and writes the sitemap from the same route list.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr).
import { execSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const server = new URL("../dist-ssr/", import.meta.url);

const { render, routes, siteUrl } = await import(new URL("entry-server.js", server).href);
const template = await readFile(new URL("index.html", dist), "utf8");

if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is missing the <!--app-head--> or root placeholder");
}

for (const { path } of routes) {
  const { head, html } = render(path);
  const page = template
    .replace("<!--app-head-->", () => head)
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
  const file = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  await mkdir(new URL(".", new URL(file, dist)), { recursive: true });
  await writeFile(new URL(file, dist), page);
  console.log(`prerendered ${path} -> dist/${file}`);
}

// lastmod is the date of the deployed commit, so it only moves when the site changes.
const lastModified = (() => {
  try {
    return execSync("git log -1 --format=%cs", { encoding: "utf8" }).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
})();
const urls = routes
  .filter((route) => route.indexable)
  .map((route) => `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${lastModified}</lastmod>\n  </url>`);
await writeFile(
  new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
console.log(`wrote dist/sitemap.xml with ${urls.length} URL(s)`);

await rm(server, { recursive: true, force: true });
