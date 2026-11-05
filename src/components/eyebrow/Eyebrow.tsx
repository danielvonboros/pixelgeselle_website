import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  color?: string;
  pixel?: string;
  sx?: SxProps<Theme>;
}

const Eyebrow = ({ children, color = "text.secondary", pixel = "brand.main", sx }: EyebrowProps) => {
  return (
    <Typography
      variant="caption"
      sx={[
        { display: "flex", alignItems: "center", gap: 1, fontWeight: 500, color },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: pixel, flexShrink: 0 }} />
      {children}
    </Typography>
  );
};

export default Eyebrow;
