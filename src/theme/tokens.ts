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
};

export const radius = {
  pixel: 0,
  md: 8,
  lg: 12,
};

export const layout = {
  maxWidth: 1200,
  sectionY: { xs: 64, md: 96 },
  headerHeight: { xs: 64, md: 72 },
};

export const motion = {
  ease: {
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  duration: {
    fast: 200,
    base: 700,
    slow: 1100,
  },
  stagger: 90,
};
