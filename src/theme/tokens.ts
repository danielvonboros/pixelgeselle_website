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
};
