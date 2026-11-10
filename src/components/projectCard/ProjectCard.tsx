import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { useState, type PointerEvent } from "react";
import Icon from "../icon/Icon";
import PixelStairs from "../pixelStairs/PixelStairs";
import PagePreview from "./PagePreview";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { hop } from "../../theme/keyframes";
import { colors, effects, motion } from "../../theme/tokens";

export interface ProjectCardProps {
  title: string;
  category: string;
  text: string;
  tone: string;
  image?: string;
  // Screenshot of the whole page, scrolled through on hover
  pageImage?: string;
  href?: string;
  linkLabel?: string;
  status?: string;
}

const ProjectCard = ({ title, category, text, tone, image, pageImage, href, linkLabel, status }: ProjectCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const reduced = useReducedMotion();
  const showImage = Boolean(image) && !imageFailed;

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const node = event.currentTarget;
    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    node.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
    node.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    node.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };

  const settle = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <Box onPointerMove={tilt} onPointerLeave={settle} sx={{ height: "100%", perspective: "1100px" }}>
      <Paper
        className="project-card"
        elevation={0}
        sx={{
          position: "relative",
          height: "100%",
          overflow: "hidden",
          border: `1px solid ${colors.line}`,
          display: "flex",
          flexDirection: "column",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: `transform 450ms ${motion.ease.out}, box-shadow 450ms ${motion.ease.out}, border-color ${motion.duration.fast}ms`,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: `radial-gradient(420px circle at var(--gx, 50%) var(--gy, 0%), ${effects.glare}, transparent 65%)`,
            opacity: 0,
            transition: `opacity ${motion.duration.base}ms ${motion.ease.out}`,
            pointerEvents: "none",
          },
          "&:hover": { boxShadow: effects.shadowRaised, borderColor: colors.border },
          "&:hover::before": { opacity: 1 },
          "&:hover .project-media": { transform: "scale(1.04)" },
          "&:hover [data-pixel]": { animation: `${hop} 650ms ${motion.ease.out} var(--i) both` },
          "&:hover .project-arrow": { transform: "translateX(4px)" },
        }}
      >
        <Box sx={{ position: "relative", aspectRatio: "4 / 3", bgcolor: tone, overflow: "hidden" }}>
          <Box
            className="project-media"
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              transition: `transform ${motion.duration.slow}ms ${motion.ease.out}`,
            }}
          >
            <PixelStairs
              steps={3}
              pixelsPerStep={2}
              size={14}
              gap={6}
              color={colors.paper}
              accentColor={tone === colors.yellow ? colors.ink : "brand.main"}
            />
            {showImage && (
              <Box
                component="img"
                src={image}
                alt={`Screenshot: Startseite von ${title}`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
                sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
          {pageImage && !reduced && <PagePreview image={pageImage} alt={`Screenshot: ganze Startseite von ${title}`} />}
        </Box>
        <Stack spacing={1.5} sx={{ p: 3, flex: 1 }}>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {category}
          </Typography>
          <Typography variant="h3" component="h3" sx={{ fontSize: "1.25rem" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", flex: 1 }}>
            {text}
          </Typography>
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="inherit"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 500,
                fontSize: "0.9375rem",
                "&::after": { content: '""', position: "absolute", inset: 0, zIndex: 3 },
              }}
            >
              {linkLabel ?? "Ansehen"}
              <Box
                component="span"
                className="project-arrow"
                sx={{ display: "inline-flex", transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` }}
              >
                <Icon name="arrowRight" size={18} />
              </Box>
            </Link>
          ) : (
            status && (
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {status}
              </Typography>
            )
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProjectCard;
