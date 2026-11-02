import { Box } from "@mui/material";
import VisuallyHidden from "../visuallyHidden/VisuallyHidden";
import { motion } from "../../theme/tokens";

interface RollingNumberProps {
  value: string;
  active?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
}

const DIGITS = Array.from({ length: 10 }, (_, digit) => String(digit));
const LINE = "1.15em";

const RollingNumber = ({
  value,
  active = true,
  delay = 0,
  duration = motion.duration.slow,
  stagger = 70,
}: RollingNumberProps) => {
  const chars = Array.from(value);

  return (
    <Box component="span" sx={{ position: "relative", display: "inline-flex", whiteSpace: "nowrap" }}>
      <VisuallyHidden>{value}</VisuallyHidden>
      <Box component="span" aria-hidden sx={{ display: "inline-flex", alignItems: "flex-start", lineHeight: LINE }}>
        {chars.map((char, index) => {
          const fromEnd = chars.length - index;
          if (!/\d/.test(char)) {
            return (
              <Box key={`c${fromEnd}`} component="span" sx={{ whiteSpace: "pre" }}>
                {char}
              </Box>
            );
          }
          const digit = active ? Number(char) : 0;
          return (
            <Box
              key={`d${fromEnd}`}
              component="span"
              sx={{ display: "inline-block", height: LINE, overflow: "hidden", fontVariantNumeric: "tabular-nums" }}
            >
              <Box
                component="span"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  transform: `translate3d(0, ${-digit * 10}%, 0)`,
                  transition: `transform ${duration}ms ${motion.ease.out} ${delay + fromEnd * stagger}ms`,
                }}
              >
                {DIGITS.map((item) => (
                  <Box key={item} component="span" sx={{ height: LINE, textAlign: "center" }}>
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RollingNumber;
