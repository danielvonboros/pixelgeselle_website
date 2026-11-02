import { colors } from "../../theme/tokens";
import { GRID, toCells, type PixelRect } from "./layouts";

type Rgb = [number, number, number];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  scale: number;
  targetScale: number;
  delay: number;
  color: Rgb;
  targetColor: Rgb;
  active: boolean;
}

export interface PixelEngineStatus {
  site: number;
  day: number | null;
}

interface PixelEngineOptions {
  layouts: PixelRect[][];
  days: number;
  hold: number;
  reduced: boolean;
  onStatus: (status: PixelEngineStatus) => void;
}

type AssignMode = "drop" | "morph" | "instant";

const STIFFNESS = 170;
const DAMPING = 19;
const REPEL_RADIUS = 2.8;
const REPEL_FORCE = STIFFNESS * 1.7;
const START_DELAY = 0.45;

const toRgb = (hex: string): Rgb => {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

export const createPixelEngine = (canvas: HTMLCanvasElement, options: PixelEngineOptions) => {
  const context = canvas.getContext("2d");
  const targets = options.layouts.map(toCells);
  const count = Math.max(...targets.map((cells) => cells.length));
  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: Math.random() * GRID.columns,
    y: -2,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    scale: 0,
    targetScale: 0,
    delay: 0,
    color: toRgb(colors.line),
    targetColor: toRgb(colors.line),
    active: false,
  }));

  let clock = 0;
  let site = 0;
  let buildStart = 0;
  let buildDuration = 1;
  let holdUntil = Infinity;
  let cell = 0;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let pointer: { x: number; y: number } | null = null;
  let frame = 0;
  let last = 0;
  let running = false;
  let dirty = true;
  let reported = "";

  const report = (day: number | null) => {
    const key = `${site}:${day}`;
    if (key === reported) return;
    reported = key;
    options.onStatus({ site, day });
  };

  const assign = (index: number, mode: AssignMode, offset = 0) => {
    const cells = targets[index];
    const order = [...particles].sort(
      (a, b) => Number(b.active) - Number(a.active) || Math.round(a.y) - Math.round(b.y) || a.x - b.x,
    );
    let latest = 0;
    order.forEach((particle, position) => {
      const target = cells[position];
      if (!target) {
        particle.active = false;
        particle.targetScale = 0;
        particle.delay = clock + offset + Math.random() * 0.3;
        return;
      }
      const stagger =
        mode === "drop"
          ? (GRID.rows - target.y) * 0.075 + Math.random() * 0.18
          : mode === "morph"
            ? target.y * 0.035 + Math.random() * 0.22
            : 0;
      particle.tx = target.x;
      particle.ty = target.y;
      particle.targetScale = 1;
      particle.targetColor = toRgb(colors[target.role]);
      particle.delay = clock + offset + stagger;
      particle.active = true;
      if (mode === "drop") {
        particle.x = target.x + (Math.random() - 0.5) * 2;
        particle.y = -1.5 - Math.random() * 3;
        particle.vx = 0;
        particle.vy = 0;
        particle.scale = 1;
        particle.color = [...particle.targetColor];
      }
      if (mode === "instant") {
        particle.x = target.x;
        particle.y = target.y;
        particle.vx = 0;
        particle.vy = 0;
        particle.scale = 1;
        particle.color = [...particle.targetColor];
      }
      latest = Math.max(latest, stagger);
    });
    site = index;
    buildStart = clock + offset;
    buildDuration = latest + (mode === "drop" ? 0.9 : 0.7);
    holdUntil = Infinity;
    dirty = true;
  };

  const step = (dt: number) => {
    clock += dt;
    let moving = pointer !== null;
    const blend = Math.min(1, dt * 9);
    const tint = Math.min(1, dt * 5);
    particles.forEach((particle) => {
      if (clock < particle.delay) return;
      let ax = STIFFNESS * (particle.tx - particle.x) - DAMPING * particle.vx;
      let ay = STIFFNESS * (particle.ty - particle.y) - DAMPING * particle.vy;
      if (pointer && particle.active) {
        const dx = particle.x + 0.5 - pointer.x;
        const dy = particle.y + 0.5 - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < REPEL_RADIUS && distance > 0.001) {
          const force = (1 - distance / REPEL_RADIUS) ** 2 * REPEL_FORCE;
          ax += (dx / distance) * force;
          ay += (dy / distance) * force;
        }
      }
      particle.vx += ax * dt;
      particle.vy += ay * dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.scale += (particle.targetScale - particle.scale) * blend;
      for (let channel = 0; channel < 3; channel += 1) {
        particle.color[channel] += (particle.targetColor[channel] - particle.color[channel]) * tint;
      }
      if (
        Math.abs(particle.vx) + Math.abs(particle.vy) > 0.002 ||
        Math.abs(particle.targetScale - particle.scale) > 0.002 ||
        Math.abs(particle.targetColor[0] - particle.color[0]) > 0.5
      ) {
        moving = true;
      }
    });
    if (moving) dirty = true;

    if (holdUntil === Infinity) {
      const progress = Math.min(1, Math.max(0, (clock - buildStart) / buildDuration));
      if (progress >= 1) {
        holdUntil = clock + options.hold;
        report(null);
      } else {
        report(Math.max(1, Math.ceil(progress * options.days)));
      }
    } else if (clock >= holdUntil && targets.length > 1) {
      assign((site + 1) % targets.length, "morph");
    }
  };

  const snap = (value: number) => Math.round(value * ratio) / ratio;

  const draw = () => {
    if (!context || cell === 0) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const dot = Math.max(1, cell * 0.08);
    context.fillStyle = colors.line;
    for (let y = 0; y < GRID.rows; y += 1) {
      for (let x = 0; x < GRID.columns; x += 1) {
        context.fillRect(snap((x + 0.5) * cell - dot / 2), snap((y + 0.5) * cell - dot / 2), dot, dot);
      }
    }
    const gap = Math.max(1, cell * 0.12);
    particles.forEach((particle) => {
      if (particle.scale < 0.02) return;
      const size = (cell - gap) * particle.scale;
      const offset = (cell - size) / 2;
      const [r, g, b] = particle.color;
      context.fillStyle = `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
      context.fillRect(snap(particle.x * cell + offset), snap(particle.y * cell + offset), snap(size), snap(size));
    });
    dirty = false;
  };

  const tick = (now: number) => {
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    step(dt);
    if (dirty) draw();
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || options.reduced) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const resize = (nextWidth: number) => {
    width = nextWidth;
    cell = width / GRID.columns;
    height = cell * GRID.rows;
    ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    draw();
  };

  const setPointer = (point: { x: number; y: number } | null) => {
    pointer = point && cell > 0 ? { x: point.x / cell, y: point.y / cell } : null;
  };

  if (options.reduced) {
    assign(0, "instant");
    report(null);
  } else {
    assign(0, "drop", START_DELAY);
    report(0);
  }

  return { start, stop, resize, setPointer };
};
