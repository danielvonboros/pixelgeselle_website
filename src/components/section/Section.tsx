import { Box, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import Eyebrow from "../eyebrow/Eyebrow";
import Reveal from "../reveal/Reveal";
import { colors, layout, motion } from "../../theme/tokens";

type SectionBackground = "paper" | "card" | "ink" | "brand";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  // h1 when the section is the whole page, as on the legal pages
  titleAs?: "h1" | "h2";
  lead?: string;
  background?: SectionBackground;
  children?: ReactNode;
}

const backgrounds: Record<SectionBackground, { bg: string; ink: string; muted: string; pixel: string }> = {
  paper: { bg: colors.paper, ink: colors.ink, muted: colors.inkMuted, pixel: colors.yellow },
  card: { bg: colors.card, ink: colors.ink, muted: colors.inkMuted, pixel: colors.yellow },
  ink: { bg: colors.ink, ink: colors.paper, muted: colors.line, pixel: colors.yellow },
  brand: { bg: colors.yellow, ink: colors.ink, muted: colors.ink, pixel: colors.ink },
};

const Section = ({
  id,
  eyebrow,
  title,
  titleAs = "h2",
  lead,
  background = "paper",
  children,
}: SectionProps) => {
  const surface = backgrounds[background];
  const hasHeader = Boolean(eyebrow || title || lead);

  return (
    <Box
      component="section"
      id={id}
      sx={{ bgcolor: surface.bg, color: surface.ink, "--focus-ring": surface.ink }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: layout.maxWidth,
          py: {
            xs: `${layout.sectionY.xs}px`,
            md: `${layout.sectionY.md}px`,
          },
        }}
      >
        {hasHeader && (
          <Stack spacing={2} sx={{ maxWidth: "48rem", mb: children ? 6 : 0 }}>
            {eyebrow && (
              <Reveal distance={12}>
                <Eyebrow color={surface.muted} pixel={surface.pixel}>
                  {eyebrow}
                </Eyebrow>
              </Reveal>
            )}
            {title && (
              <Reveal delay={motion.stagger}>
                <Typography variant="h2" component={titleAs}>
                  {title}
                </Typography>
              </Reveal>
            )}
            {lead && (
              <Reveal delay={motion.stagger * 2}>
                <Typography variant="subtitle1" sx={{ color: surface.muted }}>
                  {lead}
                </Typography>
              </Reveal>
            )}
          </Stack>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;
