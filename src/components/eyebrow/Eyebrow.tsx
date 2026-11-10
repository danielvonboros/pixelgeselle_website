import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import { fonts } from "../../theme/tokens";

interface EyebrowProps {
  children: ReactNode;
  // Section number like "02". Without it a small pixel stands in front of the label.
  index?: string;
  indexColor?: string;
  color?: string;
  pixel?: string;
  sx?: SxProps<Theme>;
}

// Small label above a heading, set in the monospace font like a label on a technical drawing.
const Eyebrow = ({ children, index, indexColor = "text.primary", color = "text.secondary", pixel = "brand.main", sx }: EyebrowProps) => {
  return (
    <Typography
      variant="caption"
      sx={[
        {
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          fontFamily: fonts.mono,
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
          color,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {index ? (
        <>
          <Box component="span" sx={{ color: indexColor, fontWeight: 500 }}>
            {index}
          </Box>
          <Box component="span" aria-hidden sx={{ width: 24, height: "1px", bgcolor: pixel, flexShrink: 0 }} />
        </>
      ) : (
        <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: pixel, flexShrink: 0 }} />
      )}
      {children}
    </Typography>
  );
};

export default Eyebrow;
