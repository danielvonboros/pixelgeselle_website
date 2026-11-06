import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import AnimatedHeadline from "../../components/animatedHeadline/AnimatedHeadline";
import Eyebrow from "../../components/eyebrow/Eyebrow";
import Icon from "../../components/icon/Icon";
import Magnetic from "../../components/magnetic/Magnetic";
import PixelSite from "../../components/pixelSite/PixelSite";
import { hero, heroVisual } from "../../content/hero";
import { SECTION_IDS } from "../../content/site";
import { fadeUp } from "../../theme/keyframes";
import { colors, layout, motion } from "../../theme/tokens";

const enter = (delay: number) => ({
  animation: `${fadeUp} ${motion.duration.base}ms ${motion.ease.out} ${delay}ms both`,
});

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: colors.paper,
        color: colors.ink,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${colors.border} 1px, transparent 1.4px)`,
          backgroundSize: "24px 24px",
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse 70% 80% at 75% 45%, #000 10%, transparent 75%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          maxWidth: layout.maxWidth,
          pt: { xs: 7, md: 11 },
          pb: { xs: 8, md: 11 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 11fr) minmax(0, 10fr)" },
          alignItems: "center",
          gap: { xs: 7, md: 8 },
        }}
      >
        <Stack spacing={3}>
          {/* One h1 for eyebrow and slogan, so the search term in the eyebrow is part of the main heading */}
          <Box component="h1" sx={{ m: 0, font: "inherit", display: "flex", flexDirection: "column", gap: 3 }}>
            <Eyebrow sx={enter(0)}>{hero.eyebrow}</Eyebrow>{" "}
            <AnimatedHeadline lines={hero.headline} component="span" />
          </Box>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", maxWidth: "36rem", ...enter(520) }}>
            {hero.lead}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ alignItems: { xs: "flex-start", sm: "center" }, pt: 1, ...enter(640) }}
          >
            <Magnetic>
              <Button variant="contained" size="large" href={`#${SECTION_IDS.booking}`}>
                {hero.primaryCta}
              </Button>
            </Magnetic>
            <Link
              href={`#${SECTION_IDS.packages}`}
              underline="hover"
              color="inherit"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 500,
                "& svg": { transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` },
                "&:hover svg": { transform: "translateX(4px)" },
              }}
            >
              {hero.secondaryCta}
              <Icon name="arrowRight" size={18} />
            </Link>
          </Stack>
        </Stack>
        <Box sx={{ ...enter(300) }}>
          <PixelSite {...heroVisual} />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
