import { Box } from "@mui/material";
import { Children, isValidElement, type ReactNode } from "react";
import Reveal from "../reveal/Reveal";
import { motion } from "../../theme/tokens";

interface CardGridProps {
  columns?: 2 | 3 | 4;
  children: ReactNode;
}

const CardGrid = ({ columns = 3, children }: CardGridProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: `repeat(${columns}, minmax(0, 1fr))`,
        },
        gap: 3,
      }}
    >
      {Children.toArray(children).map((child, index) => (
        <Reveal key={isValidElement(child) ? child.key : index} delay={index * motion.stagger} sx={{ height: "100%" }}>
          {child}
        </Reveal>
      ))}
    </Box>
  );
};

export default CardGrid;
