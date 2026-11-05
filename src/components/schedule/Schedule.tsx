import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CardGrid from "../cardGrid/CardGrid";
import RollingNumber from "../rollingNumber/RollingNumber";
import StepCard from "../stepCard/StepCard";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { ProcessStep } from "../../content/process";
import { colors, fonts, layout, motion } from "../../theme/tokens";

interface ScheduleProps {
  steps: ProcessStep[];
  title: string;
  dayLabel: string;
  totalDays: number;
  doneLabel: string;
}

const LABEL_WIDTH = 176;
const PIN_TOP = layout.headerHeight.md + 40;

const Schedule = ({ steps, title, dayLabel, totalDays, doneLabel }: ScheduleProps) => {
  const theme = useTheme();
  // No noSsr: the first render has to match the prerendered HTML, the real value follows after hydration.
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const reduced = useReducedMotion();
  const pinned = desktop && !reduced;
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const columns = totalDays + 1;

  useEffect(() => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track) return;
    const apply = (value: number) => {
      const clamped = Math.min(columns, Math.max(0, value));
      track.style.setProperty("--t", clamped.toFixed(3));
      setTime(Math.floor(clamped));
    };

    if (reduced) {
      apply(columns);
      return;
    }

    let frame = 0;

    if (pinned && panel) {
      const update = () => {
        frame = 0;
        const bounds = track.getBoundingClientRect();
        const distance = Math.max(1, bounds.height - panel.offsetHeight);
        const progress = (PIN_TOP - bounds.top) / distance;
        apply(progress * columns * 1.1);
      };
      const request = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", request);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
      };
    }

    apply(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const begin = performance.now();
        const run = (now: number) => {
          const progress = Math.min(1, (now - begin) / 2800);
          apply((1 - (1 - progress) ** 3) * columns);
          if (progress < 1) frame = requestAnimationFrame(run);
        };
        frame = requestAnimationFrame(run);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(track);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pinned, reduced, columns]);

  const day = Math.min(totalDays, time);
  const done = time >= columns;
  const activeIndex = done
    ? steps.length - 1
    : Math.max(0, steps.findIndex((step) => day >= step.days[0] && day <= step.days[1]));

  const counter = (
    <Box sx={{ fontFamily: fonts.display, fontWeight: 500, lineHeight: 1 }}>
      <Typography variant="caption" component="p" sx={{ fontWeight: 500, color: "text.secondary", mb: 1.5 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, fontSize: { xs: "3.5rem", md: "clamp(4.5rem, 7vw, 6.5rem)" }, letterSpacing: "-0.03em" }}>
        {done ? (
          <Box component="span" sx={{ display: "inline-flex", alignItems: "baseline", gap: "0.08em" }}>
            {doneLabel}
            <Box component="span" sx={{ width: "0.16em", height: "0.16em", bgcolor: colors.yellow }} />
          </Box>
        ) : (
          <>
            <Box component="span" sx={{ fontSize: "0.3em", letterSpacing: 0, color: "text.secondary" }}>
              {dayLabel}
            </Box>
            <RollingNumber value={String(day).padStart(2, "0")} duration={450} stagger={0} />
            <Box component="span" sx={{ fontSize: "0.3em", letterSpacing: 0, color: "text.secondary" }}>
              / {totalDays}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );

  const chart = (
    <Box
      aria-hidden
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: `${LABEL_WIDTH}px minmax(0, 1fr)` },
        columnGap: 3,
        rowGap: { xs: 1, sm: 2 },
        alignItems: "center",
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "block" } }} />
      <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: "4px" }}>
        {Array.from({ length: columns }, (_, index) => (
          <Typography
            key={index}
            variant="caption"
            sx={{
              textAlign: "center",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: index <= day && !done ? colors.ink : colors.border,
              transition: `color ${motion.duration.fast}ms`,
            }}
          >
            {index === 0 ? "" : index}
          </Typography>
        ))}
      </Box>
      {steps.map((step, stepIndex) => {
        const active = stepIndex === activeIndex;
        return (
          <Box key={step.title} sx={{ display: "contents" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "baseline",
                justifyContent: "space-between",
                opacity: !pinned || active || done ? 1 : 0.4,
                transition: `opacity ${motion.duration.fast}ms`,
                mt: { xs: stepIndex === 0 ? 0 : 1, sm: 0 },
              }}
            >
              <Typography variant="body2" sx={{ fontFamily: fonts.display, fontWeight: 500 }}>
                {step.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", whiteSpace: "nowrap", display: { sm: "none" } }}>
                {step.duration}
              </Typography>
            </Stack>
            <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: "4px" }}>
              {Array.from({ length: columns }, (_, index) => {
                const inSpan = index >= step.days[0] && index <= step.days[1];
                const final = index === totalDays && inSpan;
                return (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      aspectRatio: "1",
                      bgcolor: inSpan ? colors.paper : "transparent",
                      outline: inSpan ? `1px solid ${colors.line}` : "none",
                      outlineOffset: "-1px",
                      backgroundImage: inSpan ? "none" : `radial-gradient(${colors.line} 1.5px, transparent 2px)`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    {inSpan && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          bgcolor: final ? colors.yellow : colors.ink,
                          opacity: `clamp(0, calc(var(--t, 0) - ${index}), 1)`,
                          transform: `scale(clamp(0.35, calc(0.35 + (var(--t, 0) - ${index}) * 0.65), 1))`,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );

  if (!pinned) {
    return (
      <Stack ref={trackRef} spacing={6}>
        <Stack spacing={4}>
          {counter}
          {chart}
        </Stack>
        <CardGrid columns={4}>
          {steps.map((step, index) => (
            <StepCard key={step.title} number={index + 1} {...step} />
          ))}
        </CardGrid>
      </Stack>
    );
  }

  return (
    <Box ref={trackRef} sx={{ position: "relative", height: "260vh" }}>
      <Box
        ref={panelRef}
        sx={{
          position: "sticky",
          top: PIN_TOP,
          height: `calc(100vh - ${PIN_TOP + 48}px)`,
          minHeight: 520,
          display: "grid",
          gridTemplateColumns: "minmax(0, 4fr) minmax(0, 8fr)",
          gap: 8,
          alignItems: "center",
        }}
      >
        <Stack spacing={5}>
          {counter}
          <Box component="ol" sx={{ m: 0, p: 0, listStyle: "none", display: "grid" }}>
            {steps.map((step, index) => {
              const active = index === activeIndex;
              return (
                <Box
                  component="li"
                  key={step.title}
                  sx={{
                    gridArea: "1 / 1",
                    opacity: active ? 1 : 0,
                    transform: active ? "none" : "translate3d(0, 12px, 0)",
                    transition: `opacity 400ms ${motion.ease.out}, transform 400ms ${motion.ease.out}`,
                    pointerEvents: active ? "auto" : "none",
                  }}
                >
                  <StepCard number={index + 1} {...step} />
                </Box>
              );
            })}
          </Box>
        </Stack>
        <Box>{chart}</Box>
      </Box>
    </Box>
  );
};

export default Schedule;
