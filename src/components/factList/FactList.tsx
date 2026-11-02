import { Box, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import RollingNumber from "../rollingNumber/RollingNumber";
import type { IconName } from "../../assets/icons";
import { useInView } from "../../hooks/useInView";
import { fonts, motion } from "../../theme/tokens";

interface FactListProps {
  items: { icon: IconName; label: string }[];
}

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
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: `repeat(${items.length}, auto)` },
        justifyContent: { md: "space-between" },
        gap: { xs: 2, md: 3 },
      }}
    >
      {items.map((item, index) => {
        const delay = index * motion.stagger;
        return (
          <Box
            component="li"
            key={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translate3d(0, 12px, 0)",
              transition: `opacity ${motion.duration.base}ms ${motion.ease.out} ${delay}ms, transform ${motion.duration.base}ms ${motion.ease.out} ${delay}ms`,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                display: "grid",
                placeItems: "center",
                bgcolor: "brand.main",
                color: "brand.contrastText",
                borderRadius: 1,
                flexShrink: 0,
                transform: inView ? "none" : "scale(0.4) rotate(-12deg)",
                transition: `transform ${motion.duration.base}ms ${motion.ease.spring} ${delay + 120}ms`,
              }}
            >
              <Icon name={item.icon} size={20} />
            </Box>
            <Typography variant="body2" sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "0.9375rem" }}>
              {item.label.split(/(\d+)/).map((part, partIndex) =>
                /^\d+$/.test(part) ? (
                  <RollingNumber key={partIndex} value={part} active={inView} delay={delay + 200} />
                ) : (
                  part
                ),
              )}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default FactList;
