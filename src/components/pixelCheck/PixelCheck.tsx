import { Box } from "@mui/material";
import { pop } from "../../theme/keyframes";
import { colors, motion } from "../../theme/tokens";

interface PixelCheckProps {
  size?: number;
  gap?: number;
}

const POINTS: [number, number][] = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 3],
  [4, 2],
  [5, 1],
  [6, 0],
];

const PixelCheck = ({ size = 12, gap = 3 }: PixelCheckProps) => {
  const pitch = size + gap;

  return (
    <Box aria-hidden sx={{ position: "relative", width: 7 * pitch - gap, height: 5 * pitch - gap, flexShrink: 0 }}>
      {POINTS.map(([x, y], index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            left: x * pitch,
            top: y * pitch,
            width: size,
            height: size,
            bgcolor: index === POINTS.length - 1 ? colors.yellow : colors.ink,
            animation: `${pop} 420ms ${motion.ease.out} ${120 + index * 70}ms both`,
          }}
        />
      ))}
    </Box>
  );
};

export default PixelCheck;
