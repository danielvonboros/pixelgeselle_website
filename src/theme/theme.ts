import { createTheme } from "@mui/material";
import { accents, colors, fonts, radius, type Accent } from "./tokens";

declare module "@mui/material/styles" {
  interface Palette {
    brand: Palette["primary"];
    line: string;
    border: string;
  }
  interface PaletteOptions {
    brand?: PaletteOptions["primary"];
    line?: string;
    border?: string;
  }
}

export const createAppTheme = (accent: Accent = accents.yellow) =>
  createTheme({
    palette: {
      mode: "light",
      primary: accent,
      brand: { main: colors.yellow, contrastText: colors.ink },
      background: { default: colors.paper, paper: colors.card },
      text: { primary: colors.ink, secondary: colors.inkMuted },
      divider: colors.line,
      line: colors.line,
      border: colors.border,
    },
    shape: { borderRadius: radius.md },
    spacing: 8,
    typography: {
      fontFamily: fonts.sans,
      h1: {
        fontFamily: fonts.display,
        fontWeight: 500,
        fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
        lineHeight: 1.07,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: fonts.display,
        fontWeight: 500,
        fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
        lineHeight: 1.17,
        letterSpacing: "-0.015em",
      },
      h3: {
        fontFamily: fonts.display,
        fontWeight: 500,
        fontSize: "1.5rem",
        lineHeight: 1.25,
      },
      subtitle1: { fontSize: "1.125rem", lineHeight: 1.6 },
      body1: { fontSize: "1rem", lineHeight: 1.625 },
      body2: { fontSize: "0.875rem", lineHeight: 1.5 },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.43,
        textTransform: "none",
      },
      caption: { fontSize: "0.8125rem", lineHeight: 1.38 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            scrollBehavior: "smooth",
          },
          "::selection": { backgroundColor: colors.yellow, color: colors.ink },
          "section[id]": { scrollMarginTop: 72 },
          "main:focus": { outline: "none" },
          "a:focus-visible, button:focus-visible, [role='button']:focus-visible": {
            outline: `2px solid ${colors.ink}`,
            outlineOffset: 3,
          },
          "@media (prefers-reduced-motion: reduce)": {
            html: { scrollBehavior: "auto" },
            "*, *::before, *::after": {
              animationDuration: "0.01ms !important",
              transitionDuration: "0.01ms !important",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: radius.md, paddingInline: 20, paddingBlock: 10 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: radius.lg },
        },
      },
    },
  });
