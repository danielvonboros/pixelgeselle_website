import { Box } from "@mui/material";
import { fonts } from "../../theme/tokens";

interface LogoProps {
  size?: number;
  color?: string;
}

const Logo = ({ size = 24, color = "text.primary" }: LogoProps) => {
  return (
    <Box
      component="span"
      role="img"
      aria-label="Pixelgeselle"
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
      <Box component="span" aria-hidden>
        p
      </Box>
      <Box component="span" aria-hidden sx={{ position: "relative" }}>
        ı
        <Box
          component="span"
          sx={{
            position: "absolute",
            left: "50%",
            top: "-0.02em",
            width: "0.22em",
            height: "0.22em",
            transform: "translateX(-50%)",
            bgcolor: "brand.main",
          }}
        />
      </Box>
      <Box component="span" aria-hidden>
        xelgeselle
      </Box>
    </Box>
  );
};

export default Logo;
