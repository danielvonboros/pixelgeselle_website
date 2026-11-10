import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import type { ProductBandContent, ProductLink } from "../../content/productDetail";
import Eyebrow from "../eyebrow/Eyebrow";
import Icon from "../icon/Icon";
import Reveal from "../reveal/Reveal";
import { colors, effects, layout, motion, radius } from "../../theme/tokens";

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
  action,
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
          <Stack spacing={2}>
            <Link
              href={imageLink.href}
              {...linkTarget(imageLink)}
              tabIndex={-1}
              aria-hidden
              sx={{
                display: "block",
                overflow: "hidden",
                borderRadius: `${radius.md}px`,
                border: `1px solid ${colors.inkRaised}`,
                boxShadow: effects.shadow,
                "& img": { transition: `transform ${motion.duration.slow}ms ${motion.ease.out}` },
                "&:hover img": { transform: "scale(1.02)" },
              }}
            >
              <Box
                component="img"
                src={image}
                alt=""
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                sx={{ display: "block", width: "100%", height: "auto" }}
              />
            </Link>
            <Link
              href={imageLink.href}
              {...linkTarget(imageLink)}
              underline="hover"
              color="inherit"
              sx={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 500,
                "& svg": { transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` },
                "&:hover svg": { transform: "translateX(4px)" },
              }}
            >
              {imageLink.label}
              <Icon name="arrowRight" size={18} />
            </Link>
          </Stack>
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
            <Button
              variant="contained"
              size="large"
              href={action.href}
              {...linkTarget(action)}
              endIcon={<Icon name="arrowRight" size={18} />}
            >
              {action.label}
            </Button>
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
