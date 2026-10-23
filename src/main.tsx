import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/bricolage-grotesque/latin-500.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-500.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createAppTheme } from "./theme/theme.ts";
import App from "./App.tsx";

const theme = createAppTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
