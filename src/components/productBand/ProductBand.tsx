import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { ProductBandContent, ProductLink } from "../../content/productDetail";
import Eyebrow from "../eyebrow/Eyebrow";
import Icon from "../icon/Icon";
import Reveal from "../reveal/Reveal";
import ProductPreview from "./ProductPreview";
import { colors, layout, motion } from "../../theme/tokens";

interface ProductBandProps extends ProductBandContent {
  titleAs?: "h1" | "h2";
}

const linkTarget = (link: ProductLink) => (link.external ? { target: "_blank", rel: "noopener" } : {});

const ProductBand = ({
  headingId,
  eyebrow,
  title,
  titleAs = "h2",
  text,
  features,
  image,
  imageLink,
  actions,
  note,
}: ProductBandProps) => {
  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{ bgcolor: colors.ink, color: colors.paper, "--focus-ring": colors.paper }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: layout.maxWidth,
          py: { xs: `${layout.sectionY.xs}px`, md: `${layout.sectionY.md}px` },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 7fr) minmax(0, 5fr)" },
          gap: { xs: 5, md: 8 },
          alignItems: "center",
        }}
      >
        <Reveal>
          <ProductPreview image={image} link={imageLink} />
        </Reveal>
        <Reveal delay={motion.stagger}>
          <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
            <Eyebrow color={colors.line} pixel={colors.yellow}>
              {eyebrow}
            </Eyebrow>
            <Typography variant="h2" component={titleAs} id={headingId}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.line }}>
              {text}
            </Typography>
            <Stack component="ul" spacing={1.25} sx={{ listStyle: "none", m: 0, p: 0 }}>
              {features.map((feature) => (
                <Box component="li" key={feature} sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                  <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: colors.yellow, flexShrink: 0 }} />
                  {feature}
                </Box>
              ))}
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}>
              {actions.map((action) => (
                <Button
                  key={action.href}
                  variant="contained"
                  size="large"
                  href={action.href}
                  {...linkTarget(action)}
                  endIcon={<Icon name="arrowRight" size={18} />}
                  sx={action.tone === "light" ? { bgcolor: colors.paper, color: colors.ink, "&:hover": { bgcolor: colors.card } } : undefined}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
            {note && (
              <Typography variant="caption" sx={{ color: colors.line }}>
                {note}
              </Typography>
            )}
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
};

export default ProductBand;
