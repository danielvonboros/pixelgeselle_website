import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Icon from "../../components/icon/Icon";
import PixelStairs from "../../components/pixelStairs/PixelStairs";
import { hero } from "../../content/hero";
import { SECTION_IDS } from "../../content/site";
import { colors, layout } from "../../theme/tokens";

const Hero = () => {
  return (
    <Box component="section" sx={{ bgcolor: colors.paper, color: colors.ink }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: layout.maxWidth,
          pt: { xs: 7, md: 12 },
          pb: { xs: 8, md: 12 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 7fr) minmax(0, 5fr)" },
          alignItems: "end",
          gap: 6,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 500, color: "text.secondary" }}
          >
            <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: "brand.main", flexShrink: 0 }} />
            {hero.eyebrow}
          </Typography>
          <Typography variant="h1">
            {hero.headline.map((line) => (
              <Box key={line} component="span" sx={{ display: "block" }}>
                {line}
              </Box>
            ))}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary", maxWidth: "36rem" }}>
            {hero.lead}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ alignItems: { xs: "flex-start", sm: "center" }, pt: 1 }}
          >
            <Button variant="contained" size="large" href={`#${SECTION_IDS.booking}`}>
              {hero.primaryCta}
            </Button>
            <Link
              href={`#${SECTION_IDS.packages}`}
              underline="hover"
              color="inherit"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontWeight: 500 }}
            >
              {hero.secondaryCta}
              <Icon name="arrowRight" size={18} />
            </Link>
          </Stack>
        </Stack>
        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end", pb: 1 }}>
          <PixelStairs />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
