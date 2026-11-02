import { Box, type SxProps, type Theme } from "@mui/material";
import type { ElementType, ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { motion } from "../../theme/tokens";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  component?: ElementType;
  sx?: SxProps<Theme>;
}

const Reveal = ({ children, delay = 0, distance = 28, component = "div", sx }: RevealProps) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const timing = `${motion.duration.base}ms ${motion.ease.out} ${delay}ms`;

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
