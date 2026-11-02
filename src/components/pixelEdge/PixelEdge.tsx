import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { motion } from "../../theme/tokens";

interface PixelEdgeProps {
  from: string;
  to: string;
  size?: number;
  steps?: number;
  descending?: boolean;
}

const PixelEdge = ({ from, to, size = 16, steps = 4, descending = false }: PixelEdgeProps) => {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -4% 0px" });
  const [columns, setColumns] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setColumns(Math.ceil(entry.contentRect.width / size)));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, size]);

  return (
    <Box
      ref={ref}
      aria-hidden
      sx={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "flex-end",
        height: steps * size + 2,
        my: "-1px",
        overflow: "hidden",
        bgcolor: from,
      }}
    >
      {Array.from({ length: columns }, (_, index) => {
        const position = descending ? columns - index : index + 1;
        const level = Math.max(1, Math.ceil((position / columns) * steps));
        const order = descending ? columns - index : index;
        return (
          <Box
            key={index}
            sx={{
              width: size + 1,
              mr: "-1px",
              height: level * size,
              flexShrink: 0,
              bgcolor: to,
              transformOrigin: "bottom",
              transform: inView ? "none" : "scaleY(0)",
              transition: `transform 600ms ${motion.ease.out} ${order * 9}ms`,
            }}
          />
        );
      })}
    </Box>
  );
};

export default PixelEdge;
