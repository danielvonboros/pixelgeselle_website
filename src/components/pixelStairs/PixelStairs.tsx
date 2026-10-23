import { Box } from "@mui/material";

interface PixelStairsProps {
  steps?: number;
  pixelsPerStep?: number;
  size?: number;
  gap?: number;
  color?: string;
  accentColor?: string;
}

const PixelStairs = ({
  steps = 4,
  pixelsPerStep = 3,
  size = 16,
  gap = 8,
  color = "text.primary",
  accentColor = "brand.main",
}: PixelStairsProps) => {
  const pitch = size + gap;
  const columns = steps * pixelsPerStep + 1;
  const width = columns * pitch - gap;
  const height = (steps + 1) * pitch - gap;

  return (
    <Box aria-hidden sx={{ position: "relative", width, height, flexShrink: 0 }}>
      {Array.from({ length: columns - 1 }, (_, index) => {
        const step = Math.floor(index / pixelsPerStep);
        return (
          <Box
            key={index}
            sx={{
              position: "absolute",
              left: index * pitch,
              top: (steps - step) * pitch,
              width: size,
              height: size,
              bgcolor: color,
            }}
          />
        );
      })}
      <Box
        sx={{
          position: "absolute",
          left: (columns - 1) * pitch,
          top: 0,
          width: size,
          height: size,
          bgcolor: accentColor,
        }}
      />
    </Box>
  );
};

export default PixelStairs;
