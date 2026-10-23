import { Box } from "@mui/material";
import type { ReactNode } from "react";

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
      {children}
    </Box>
  );
};

export default CardGrid;
