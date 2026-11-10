export const colors = {
  paper: "#f1f0ec",
  card: "#ffffff",
  ink: "#282828",
  inkRaised: "#3a3a3a",
  inkMuted: "#5c5b57",
  line: "#d9d7cf",
  border: "#8a8880",
  yellow: "#f2b705",
  petrol: "#2f6b5a",
  brick: "#b04522",
};

export const effects = {
  glow: "rgba(242, 183, 5, 0.18)",
  pulse: "rgba(242, 183, 5, 0.55)",
  pulseFade: "rgba(242, 183, 5, 0)",
  glare: "rgba(255, 255, 255, 0.22)",
  shadow: "0 32px 64px -32px rgba(40, 40, 40, 0.28)",
  shadowRaised: "0 24px 48px -28px rgba(40, 40, 40, 0.35)",
  headerTint: "rgba(241, 240, 236, 0.82)",
};

export interface Accent {
  main: string;
  contrastText: string;
}

export const accents: Record<"yellow" | "petrol" | "brick", Accent> = {
  yellow: { main: colors.yellow, contrastText: colors.ink },
  petrol: { main: colors.petrol, contrastText: colors.paper },
  brick: { main: colors.brick, contrastText: colors.paper },
};

export const fonts = {
  display: '"Bricolage Grotesque", system-ui, sans-serif',
  sans: "Figtree, system-ui, sans-serif",
  mono: '"IBM Plex Mono", ui-monospace, monospace',
};

export const radius = {
  pixel: 0,
  md: 8,
  lg: 12,
};

// Size of the hero headline, larger than the h1 of the other pages.
export const heroHeadline = {
  fontSize: "clamp(2.75rem, 5.6vw, 4.75rem)",
  letterSpacing: "-0.03em",
  lineHeight: 1.02,
};

export const layout = {
  maxWidth: 1200,
  sectionY: { xs: 64, md: 96 },
  headerHeight: { xs: 64, md: 72 },
  mobileNavHeight: 44,
};

export const motion = {
  ease: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    // Settles with a barely visible overshoot. Calm and precise, never bouncy.
    spring: "cubic-bezier(0.25, 1.15, 0.5, 1)",
  },
  duration: {
    fast: 200,
    base: 700,
    slow: 1100,
  },
  stagger: 90,
};

// Look of the outdated example website in "Kennst du das?". Deliberately old-fashioned.
export const oldSiteStyle = {
  font: '"Times New Roman", Times, Georgia, serif',
  link: "#1a0dab",
  bannerFrom: "#1d4f91",
  bannerTo: "#6f9bd6",
  bannerText: "#ffffff",
  black: "#000000",
  rule: "#999999",
  placeholder: "#c8c8c8",
  counterText: "#39ff14",
  page: "#fdfdf7",
  text: "#333333",
  construction: "#ffd400",
  phone: "#1f1f1f",
  // The old page is laid out for a desktop of this width and shrunk into the phone.
  pageWidth: 640,
  screenWidth: 260,
};
