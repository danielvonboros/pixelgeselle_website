import { Box, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { colors, layout } from "../../theme/tokens";

type SectionBackground = "paper" | "card" | "ink";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  background?: SectionBackground;
  children?: ReactNode;
}

const backgrounds: Record<SectionBackground, { bg: string; ink: string; muted: string }> = {
  paper: { bg: colors.paper, ink: colors.ink, muted: colors.inkMuted },
  card: { bg: colors.card, ink: colors.ink, muted: colors.inkMuted },
  ink: { bg: colors.ink, ink: colors.paper, muted: colors.line },
};

const Section = ({
  id,
  eyebrow,
  title,
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
      sx={{ bgcolor: surface.bg, color: surface.ink }}
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
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 500,
                  color: surface.muted,
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{ width: 8, height: 8, bgcolor: "brand.main" }}
                />
                {eyebrow}
              </Typography>
            )}
            {title && <Typography variant="h2">{title}</Typography>}
            {lead && (
              <Typography variant="subtitle1" sx={{ color: surface.muted }}>
                {lead}
              </Typography>
            )}
          </Stack>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;
