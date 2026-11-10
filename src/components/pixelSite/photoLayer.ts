import { GRID } from "./layouts";

// Draws a real screenshot on top of the pixel canvas, one grid cell at a time.
// show() lets the tiles grow in along a diagonal, hide() lets them shrink away again.

interface Tile {
  x: number;
  y: number;
  delay: number;
}

interface PhotoLayerOptions {
  reduced: boolean;
}

const SHOW_SECONDS = 0.55;
const HIDE_SECONDS = 0.35;
const DIAGONAL_STEP = 0.028;
const JITTER = 0.12;

const easeOut = (value: number) => 1 - (1 - value) ** 3;

export const createPhotoLayer = (canvas: HTMLCanvasElement, options: PhotoLayerOptions) => {
  const context = canvas.getContext("2d");
  const tiles: Tile[] = [];
  for (let y = 0; y < GRID.rows; y += 1) {
    for (let x = 0; x < GRID.columns; x += 1) {
      tiles.push({ x, y, delay: (x + y) * DIAGONAL_STEP + Math.random() * JITTER });
    }
  }
  const longestDelay = Math.max(...tiles.map((tile) => tile.delay));

  let image: HTMLImageElement | null = null;
  let visible = false;
  let startedAt = 0;
  let cell = 0;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;

  // Crops the screenshot to the 3:2 stage, keeping the top of the page (navigation and hero).
  const source = (picture: HTMLImageElement) => {
    const scale = Math.max(width / picture.naturalWidth, height / picture.naturalHeight);
    const sourceWidth = width / scale;
    return { left: (picture.naturalWidth - sourceWidth) / 2, top: 0, scale };
  };

  const progressOf = (tile: Tile, elapsed: number) => {
    const duration = visible ? SHOW_SECONDS : HIDE_SECONDS;
    const raw = (elapsed - tile.delay * (visible ? 1 : 0.5)) / duration;
    const clamped = Math.min(1, Math.max(0, raw));
    return visible ? easeOut(clamped) : 1 - easeOut(clamped);
  };

  const draw = (now: number) => {
    if (!context) return true;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    if (!image || cell === 0) return true;
    const crop = source(image);
    const elapsed = options.reduced ? Infinity : (now - startedAt) / 1000;
    let settled = true;
    tiles.forEach((tile) => {
      const progress = options.reduced ? Number(visible) : progressOf(tile, elapsed);
      if (progress > 0 && progress < 1) settled = false;
      if (progress <= 0.01) return;
      const size = cell * progress;
      const inset = (cell - size) / 2;
      context.globalAlpha = Math.min(1, progress * 1.4);
      context.drawImage(
        image as HTMLImageElement,
        crop.left + (tile.x * cell) / crop.scale,
        crop.top + (tile.y * cell) / crop.scale,
        cell / crop.scale,
        cell / crop.scale,
        tile.x * cell + inset,
        tile.y * cell + inset,
        size,
        size,
      );
    });
    context.globalAlpha = 1;
    return settled && elapsed > longestDelay;
  };

  const tick = (now: number) => {
    const done = draw(now);
    frame = done ? 0 : requestAnimationFrame(tick);
  };

  const play = () => {
    cancelAnimationFrame(frame);
    startedAt = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const show = (picture: HTMLImageElement) => {
    if (!picture.complete || picture.naturalWidth === 0) {
      picture.addEventListener("load", () => show(picture), { once: true });
      return;
    }
    image = picture;
    visible = true;
    play();
  };

  const hide = () => {
    if (!visible) return;
    visible = false;
    play();
  };

  const resize = (nextWidth: number) => {
    width = nextWidth;
    cell = width / GRID.columns;
    height = cell * GRID.rows;
    ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    draw(Infinity);
  };

  const stop = () => cancelAnimationFrame(frame);

  return { show, hide, resize, stop };
};
