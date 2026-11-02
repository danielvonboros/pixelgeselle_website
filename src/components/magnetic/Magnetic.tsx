import { Box } from "@mui/material";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { motion } from "../../theme/tokens";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  reach?: number;
}

const Magnetic = ({ children, strength = 0.28, reach = 48 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const reset = () => {
      node.style.transform = "";
    };
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = node.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const inside =
          Math.abs(dx) < bounds.width / 2 + reach && Math.abs(dy) < bounds.height / 2 + reach;
        node.style.transform = inside ? `translate3d(${dx * strength}px, ${dy * strength}px, 0)` : "";
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [reduced, strength, reach]);

  return (
    <Box
      ref={ref}
      sx={{
        display: "inline-flex",
        transition: `transform 500ms ${motion.ease.out}`,
        willChange: "transform",
      }}
    >
      {children}
    </Box>
  );
};

export default Magnetic;
