import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Eyebrow from "../../components/eyebrow/Eyebrow";
import Icon from "../../components/icon/Icon";
import Reveal from "../../components/reveal/Reveal";
import { featuredProduct } from "../../content/products";
import { colors, effects, layout, motion, radius } from "../../theme/tokens";

const FeaturedProduct = () => {
  return (
    <Box
      component="section"
      aria-labelledby="weingut-titel"
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
          <Link
            href={featuredProduct.href}
            target="_blank"
            rel="noopener"
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
              src={featuredProduct.image}
              alt=""
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
              sx={{ display: "block", width: "100%", height: "auto" }}
            />
          </Link>
        </Reveal>
        <Reveal delay={motion.stagger}>
          <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
            <Eyebrow color={colors.line} pixel={colors.yellow}>
              {featuredProduct.eyebrow}
            </Eyebrow>
            <Typography variant="h2" id="weingut-titel">
              {featuredProduct.title}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.line }}>
              {featuredProduct.text}
            </Typography>
            <Stack component="ul" spacing={1.25} sx={{ listStyle: "none", m: 0, p: 0 }}>
              {featuredProduct.features.map((feature) => (
                <Box component="li" key={feature} sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
                  <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: colors.yellow, flexShrink: 0 }} />
                  {feature}
                </Box>
              ))}
            </Stack>
            <Button
              variant="contained"
              size="large"
              href={featuredProduct.href}
              target="_blank"
              rel="noopener"
              endIcon={<Icon name="arrowRight" size={18} />}
            >
              {featuredProduct.linkLabel}
            </Button>
            <Typography variant="caption" sx={{ color: colors.line }}>
              {featuredProduct.credit}
            </Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
};

export default FeaturedProduct;
