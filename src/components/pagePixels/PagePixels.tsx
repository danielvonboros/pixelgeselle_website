import { Box } from "@mui/material";
import { colors, motion } from "../../theme/tokens";

interface PagePixelsProps {
  count: number;
  max?: number;
  columns?: number;
  active?: boolean;
}

const PagePixels = ({ count, max = 12, columns = 6, active = true }: PagePixelsProps) => {
  return (
    <Box aria-hidden sx={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 10px)`, gap: "4px" }}>
      {Array.from({ length: max }, (_, index) => {
        const filled = index < count;
        const last = index === count - 1;
        return (
          <Box key={index} sx={{ position: "relative", width: 10, height: 10, outline: `1px solid ${colors.line}`, outlineOffset: "-1px" }}>
            {filled && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: last ? colors.yellow : colors.ink,
                  transform: active ? "none" : "translate3d(0, -14px, 0) scale(0.2)",
                  opacity: active ? 1 : 0,
                  transition: `transform 500ms ${motion.ease.spring} ${index * 60}ms, opacity 200ms ${index * 60}ms`,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default PagePixels;
