import { Box, Typography } from "@mui/material";
import RollingNumber from "../rollingNumber/RollingNumber";
import type { Fact } from "../../content/facts";
import { useInView } from "../../hooks/useInView";
import { colors, fonts, motion } from "../../theme/tokens";

interface FactListProps {
  items: Fact[];
}

// Row of large numbers with a short label each. The digits roll in once the row is visible.
const FactList = ({ items }: FactListProps) => {
  const [ref, inView] = useInView<HTMLUListElement>();

  return (
    <Box
      ref={ref}
      component="ul"
      sx={{
        m: 0,
        p: 0,
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: `repeat(${items.length}, minmax(0, 1fr))` },
        rowGap: 4,
      }}
    >
      {items.map((item, index) => {
        const delay = index * motion.stagger;
        return (
          <Box
            component="li"
            key={item.label}
            sx={{
              px: { xs: 2, md: 3 },
              borderLeft: `1px solid ${colors.line}`,
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translate3d(0, 12px, 0)",
              transition: `opacity ${motion.duration.base}ms ${motion.ease.out} ${delay}ms, transform ${motion.duration.base}ms ${motion.ease.out} ${delay}ms`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 1,
                fontFamily: fonts.display,
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              <Box component="span" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                <RollingNumber value={item.value} active={inView} delay={delay + 150} />
              </Box>
              {item.unit && (
                <Box component="span" sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, letterSpacing: 0 }}>
                  {item.unit}
                </Box>
              )}
            </Box>
            <Typography variant="body2" sx={{ mt: 1, color: colors.inkMuted, maxWidth: "14rem" }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default FactList;
