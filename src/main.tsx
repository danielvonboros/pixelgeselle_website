import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/bricolage-grotesque/latin-500.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import Root from "./Root.tsx";
import { createEmotionCache } from "./theme/emotionCache.ts";

const container = document.getElementById("root")!;
const root = <Root cache={createEmotionCache()} path={window.location.pathname} />;

// The production build ships prerendered markup (scripts/prerender.js), the dev server an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, root);
} else {
  createRoot(container).render(root);
}
