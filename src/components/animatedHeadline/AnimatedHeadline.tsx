import { Box, Typography } from "@mui/material";
import VisuallyHidden from "../visuallyHidden/VisuallyHidden";
import { drop, rise } from "../../theme/keyframes";
import { colors, motion } from "../../theme/tokens";

interface AnimatedHeadlineProps {
  lines: string[];
  delay?: number;
}

const AnimatedHeadline = ({ lines, delay = 120 }: AnimatedHeadlineProps) => {
  const lastLine = lines.length - 1;

  return (
    <Typography variant="h1">
      {lines.map((line, index) => {
        const lineDelay = delay + index * motion.stagger * 1.4;
        const hasDot = line.endsWith(".");
        return (
          <Box key={line} component="span" sx={{ display: "block", overflow: "hidden", pb: "0.1em", mb: "-0.1em" }}>
            <Box
              component="span"
              sx={{ display: "inline-block", animation: `${rise} ${motion.duration.slow}ms ${motion.ease.out} ${lineDelay}ms both` }}
            >
              {hasDot ? line.slice(0, -1) : line}
              {hasDot && (
                <>
                  <Box
                    component="span"
                    aria-hidden
                    sx={{
                      display: "inline-block",
                      width: "0.17em",
                      height: "0.17em",
                      ml: "0.05em",
                      bgcolor: index === lastLine ? colors.yellow : colors.ink,
                      animation: `${drop} ${motion.duration.base}ms ${motion.ease.out} ${lineDelay + motion.duration.base}ms both`,
                    }}
                  />
                  <VisuallyHidden>.</VisuallyHidden>
                </>
              )}
            </Box>
          </Box>
        );
      })}
    </Typography>
  );
};

export default AnimatedHeadline;
