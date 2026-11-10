import { Box, type SxProps, type Theme } from "@mui/material";
import type { ElementType, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { motion } from "../../theme/tokens";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  // Rises out of an invisible line instead of fading, like the hero headline
  mask?: boolean;
  component?: ElementType;
  sx?: SxProps<Theme>;
}

const Reveal = ({
  children,
  delay = 0,
  distance = 20,
  mask = false,
  component = "div",
  sx,
}: RevealProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const timing = `${motion.duration.base}ms ${motion.ease.out} ${delay}ms`;

  if (mask) {
    return (
      <Box
        ref={ref}
        component={component}
        sx={[
          { overflow: "hidden", pb: "0.12em", mb: "-0.12em" },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          sx={{
            transform: inView ? "none" : "translate3d(0, 105%, 0)",
            transition: `transform ${motion.duration.slow}ms ${motion.ease.out} ${delay}ms`,
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      component={component}
      sx={[
        {
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : `translate3d(0, ${distance}px, 0)`,
          transition: `opacity ${timing}, transform ${timing}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

export default Reveal;
