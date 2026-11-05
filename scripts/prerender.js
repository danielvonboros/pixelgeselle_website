// Renders every route of the built site to static HTML so content and
// styles arrive with the first response instead of after the JavaScript.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr).
import { readFile, rm, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const server = new URL("../dist-ssr/", import.meta.url);

const { render, routes } = await import(new URL("entry-server.js", server).href);
const template = await readFile(new URL("index.html", dist), "utf8");

if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is missing the <!--app-head--> or root placeholder");
}

for (const route of routes) {
  const { head, html } = render(route);
  const page = template
    .replace("<!--app-head-->", () => head)
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  await writeFile(new URL(file, dist), page);
  console.log(`prerendered ${route} -> dist/${file}`);
}

await rm(server, { recursive: true, force: true });
