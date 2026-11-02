import { colors } from "../../theme/tokens";

export type PixelSiteId = "raumton" | "phase" | "firstlinie";
export type PixelRole = keyof typeof colors;
export type PixelRect = [role: PixelRole, x: number, y: number, width: number, height: number];

export interface PixelCell {
  x: number;
  y: number;
  role: PixelRole;
}

export const GRID = { columns: 24, rows: 16 };

const navigation = (accent: PixelRole, logo: PixelRole = "ink"): PixelRect[] => [
  [logo, 1, 1, 3, 1],
  ["border", 15, 1, 2, 1],
  ["border", 18, 1, 2, 1],
  [accent, 21, 1, 2, 1],
];

export const pixelLayouts: Record<PixelSiteId, PixelRect[]> = {
  raumton: [
    ...navigation("petrol"),
    ["petrol", 1, 3, 1, 1],
    ["line", 3, 3, 5, 1],
    ["ink", 1, 5, 10, 2],
    ["ink", 1, 8, 7, 2],
    ["line", 1, 11, 9, 1],
    ["petrol", 1, 13, 4, 1],
    ["border", 6, 13, 3, 1],
    ["petrol", 13, 3, 10, 7],
    ["paper", 17, 5, 3, 2],
    ["border", 13, 10, 10, 1],
    ["petrol", 13, 12, 2, 2],
    ["yellow", 16, 12, 2, 2],
    ["brick", 19, 12, 2, 2],
    ["petrol", 1, 15, 1, 1],
    ["line", 3, 15, 6, 1],
    ["petrol", 13, 15, 1, 1],
    ["line", 15, 15, 6, 1],
  ],
  phase: [
    ["ink", 0, 0, 24, 11],
    ...navigation("yellow", "yellow"),
    ["paper", 1, 3, 9, 2],
    ["paper", 1, 6, 6, 2],
    ["yellow", 1, 9, 4, 1],
    ["border", 6, 9, 3, 1],
    ["border", 18, 2, 1, 2],
    ["paper", 17, 4, 3, 1],
    ["paper", 16, 5, 5, 1],
    ["yellow", 17, 6, 3, 1],
    ["border", 14, 9, 9, 1],
    ["yellow", 19, 8, 1, 3],
    ["ink", 1, 12, 6, 2],
    ["ink", 8, 12, 6, 2],
    ["ink", 15, 12, 6, 2],
    ["yellow", 21, 12, 2, 2],
    ["line", 1, 15, 6, 1],
    ["line", 8, 15, 6, 1],
    ["line", 15, 15, 6, 1],
  ],
  firstlinie: [
    ...navigation("brick"),
    ["brick", 1, 3, 1, 1],
    ["line", 3, 3, 5, 1],
    ["ink", 1, 5, 9, 2],
    ["ink", 1, 8, 7, 2],
    ["line", 1, 11, 8, 1],
    ["brick", 1, 13, 4, 1],
    ["border", 6, 13, 3, 1],
    ["brick", 17, 3, 1, 1],
    ["brick", 16, 4, 3, 1],
    ["brick", 15, 5, 5, 1],
    ["brick", 14, 6, 7, 1],
    ["border", 13, 7, 9, 1],
    ["ink", 12, 8, 11, 1],
    ["ink", 13, 9, 1, 5],
    ["ink", 21, 9, 1, 5],
    ["ink", 13, 13, 9, 1],
    ["line", 16, 10, 3, 2],
    ["border", 12, 15, 11, 1],
    ["ink", 12, 14, 1, 2],
    ["ink", 22, 14, 1, 2],
  ],
};

export const toCells = (rects: PixelRect[]): PixelCell[] => {
  const cells = new Map<string, PixelCell>();
  rects.forEach(([role, left, top, width, height]) => {
    for (let y = top; y < top + height; y += 1) {
      for (let x = left; x < left + width; x += 1) {
        if (x >= 0 && x < GRID.columns && y >= 0 && y < GRID.rows) cells.set(`${x},${y}`, { x, y, role });
      }
    }
  });
  return [...cells.values()].sort((a, b) => a.y - b.y || a.x - b.x);
};
