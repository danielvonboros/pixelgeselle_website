import { Box, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import RollingNumber from "../rollingNumber/RollingNumber";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { fadeIn, pulse } from "../../theme/keyframes";
import { colors, effects, fonts, motion, radius } from "../../theme/tokens";
import { pixelLayouts, type PixelSiteId } from "./layouts";
import { createPhotoLayer } from "./photoLayer";
import { createPixelEngine, type PixelEngineStatus } from "./pixelEngine";

export interface PixelSiteEntry {
  id: PixelSiteId;
  name: string;
  trade: string;
  address: string;
  // Screenshot of the finished demo. The pixels turn into it once the site is "online".
  image: string;
}

interface PixelSiteProps {
  sites: PixelSiteEntry[];
  days: number;
  dayLabel: string;
  onlineLabel: string;
  dimensionLabel: string;
}

const HOLD_SECONDS = 6;

const PixelSite = ({ sites, days, dayLabel, onlineLabel, dimensionLabel }: PixelSiteProps) => {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const photoLayerRef = useRef<ReturnType<typeof createPhotoLayer> | null>(null);
  const [status, setStatus] = useState<PixelEngineStatus>({ site: 0, day: 0 });
  const siteKey = sites.map((site) => site.id).join("|");

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const photoCanvas = photoCanvasRef.current;
    if (!frame || !stage || !canvas || !photoCanvas) return;

    const engine = createPixelEngine(canvas, {
      layouts: siteKey.split("|").map((id) => pixelLayouts[id as PixelSiteId]),
      days,
      hold: HOLD_SECONDS,
      reduced,
      onStatus: setStatus,
    });
    const photoLayer = createPhotoLayer(photoCanvas, { reduced });
    photoLayerRef.current = photoLayer;

    let visible = false;
    const sync = () => (visible && !document.hidden ? engine.start() : engine.stop());
    const resizeObserver = new ResizeObserver(([entry]) => {
      engine.resize(entry.contentRect.width);
      photoLayer.resize(entry.contentRect.width);
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      engine.setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
    };
    const leave = () => engine.setPointer(null);

    resizeObserver.observe(stage);
    viewObserver.observe(stage);
    document.addEventListener("visibilitychange", sync);
    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerleave", leave);

    return () => {
      engine.stop();
      photoLayer.stop();
      photoLayerRef.current = null;
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      frame.removeEventListener("pointermove", move);
      frame.removeEventListener("pointerleave", leave);
    };
  }, [siteKey, days, reduced]);

  // Load the screenshots once, so they are ready when the first site goes online.
  const imageKey = sites.map((site) => site.image).join("|");
  const images = useMemo(
    () =>
      typeof window === "undefined"
        ? []
        : imageKey.split("|").map((source) => {
            const image = new Image();
            image.decoding = "async";
            image.src = source;
            return image;
          }),
    [imageKey],
  );

  useEffect(() => {
    const photoLayer = photoLayerRef.current;
    const image = images[status.site];
    if (!photoLayer || !image) return;
    if (status.day === null) photoLayer.show(image);
    else photoLayer.hide();
  }, [images, status]);

  const current = sites[status.site] ?? sites[0];
  const online = status.day === null;
  const progress = online ? 1 : (status.day ?? 0) / days;

  return (
    <Stack aria-hidden spacing={2.5} sx={{ width: "100%", userSelect: "none" }}>
      <Box
        ref={frameRef}
        sx={{
          bgcolor: colors.card,
          border: `1px solid ${colors.line}`,
          borderRadius: `${radius.lg}px`,
          overflow: "hidden",
          boxShadow: `0 1px 0 ${colors.line}, ${effects.shadow}`,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", px: 2, height: 40, borderBottom: `1px solid ${colors.line}` }}
        >
          <Stack direction="row" spacing={0.75}>
            {[colors.ink, colors.line, colors.line].map((tone, index) => (
              <Box key={index} sx={{ width: 8, height: 8, bgcolor: tone }} />
            ))}
          </Stack>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              px: 1.5,
              py: 0.5,
              borderRadius: `${radius.md}px`,
              bgcolor: colors.paper,
              color: colors.inkMuted,
              fontSize: "0.75rem",
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Box key={current.id} component="span" sx={{ display: "inline-block", animation: `${fadeIn} 400ms ${motion.ease.out}` }}>
              {current.address}
            </Box>
          </Box>
        </Stack>
        <Box ref={stageRef} sx={{ position: "relative", aspectRatio: "3 / 2", m: { xs: 1.5, sm: 2 } }}>
          <Box component="canvas" ref={canvasRef} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
          <Box
            component="canvas"
            ref={photoCanvasRef}
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
          />
        </Box>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            height: 44,
            borderTop: `1px solid ${colors.line}`,
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: "0.8125rem",
          }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
            {online ? (
              <>
                <Box
                  component="span"
                  sx={{ width: 8, height: 8, bgcolor: colors.yellow, animation: `${pulse} 1.8s ${motion.ease.out} infinite` }}
                />
                {onlineLabel}
              </>
            ) : (
              <>
                {dayLabel}
                <RollingNumber value={String(status.day ?? 0).padStart(2, "0")} />
                <Box component="span" sx={{ color: colors.inkMuted }}>
                  / {days}
                </Box>
              </>
            )}
          </Box>
          <Box
            key={current.id}
            sx={{
              color: colors.inkMuted,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              animation: `${fadeIn} 500ms ${motion.ease.out}`,
            }}
          >
            {current.name} · {current.trade}
          </Box>
        </Stack>
      </Box>
      <Box sx={{ position: "relative", height: 16, color: colors.inkMuted }}>
        <Box sx={{ position: "absolute", left: 0, right: 0, top: 7, height: "1px", bgcolor: colors.line }} />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 6,
            height: 3,
            bgcolor: colors.ink,
            transformOrigin: "left center",
            transform: `scaleX(${progress})`,
            transition: `transform 400ms ${motion.ease.out}`,
          }}
        />
        {[0, 1].map((side) => (
          <Box
            key={side}
            sx={{ position: "absolute", top: 0, [side ? "right" : "left"]: 0, width: "1px", height: 16, bgcolor: colors.ink }}
          />
        ))}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            px: 1.5,
            lineHeight: "16px",
            bgcolor: colors.paper,
            fontSize: "0.75rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {dimensionLabel}
        </Box>
      </Box>
    </Stack>
  );
};

export default PixelSite;
