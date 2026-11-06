import { Box } from "@mui/material";
import { site } from "../../content/site";
import { drop } from "../../theme/keyframes";
import { fonts, motion } from "../../theme/tokens";

interface LogoProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

const wordmark = site.name.toLowerCase();

// The letters come from CSS, not DOM text: with a dotless "ı" in the text, checks for
// label-in-name (WCAG 2.5.3) would not find "pıxelgesellen" in the link's name "Pixelgesellen".
const glyphs = (text: string) => ({ "&::before": { content: `"${text}"` } });

const Logo = ({ size = 24, color = "text.primary", animated = false }: LogoProps) => {
  return (
    <Box
      component="span"
      role="img"
      aria-label={site.name}
      sx={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: fonts.display,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.02em",
        color,
        userSelect: "none",
      }}
    >
      <Box component="span" aria-hidden sx={glyphs(wordmark.slice(0, 1))} />
      <Box component="span" aria-hidden sx={{ position: "relative", ...glyphs("ı") }}>
        <Box
          component="span"
          sx={{
            position: "absolute",
            left: "50%",
            top: "-0.02em",
            width: "0.22em",
            height: "0.22em",
            ml: "-0.11em",
            bgcolor: "brand.main",
            animation: animated ? `${drop} ${motion.duration.slow}ms ${motion.ease.out} 250ms both` : "none",
          }}
        />
      </Box>
      <Box component="span" aria-hidden sx={glyphs(wordmark.slice(2))} />
    </Box>
  );
};

export default Logo;
