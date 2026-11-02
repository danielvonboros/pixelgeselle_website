import { Box, Paper, Typography } from "@mui/material";
import type { PointerEvent } from "react";
import Icon from "../icon/Icon";
import type { IconName } from "../../assets/icons";
import { colors, effects, motion } from "../../theme/tokens";

interface InfoCardProps {
  icon: IconName;
  title: string;
  text: string;
}

const track = (event: PointerEvent<HTMLDivElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
};

const InfoCard = ({ icon, title, text }: InfoCardProps) => {
  return (
    <Paper
      elevation={0}
      onPointerMove={track}
      sx={{
        position: "relative",
        p: 3,
        height: "100%",
        overflow: "hidden",
        border: `1px solid ${colors.line}`,
        transition: `border-color ${motion.duration.fast}ms`,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `radial-gradient(280px circle at var(--x, 50%) var(--y, 0%), ${effects.glow}, transparent 70%)`,
          opacity: 0,
          transition: `opacity ${motion.duration.base}ms ${motion.ease.out}`,
          pointerEvents: "none",
        },
        "&:hover": { borderColor: colors.border },
        "&:hover::before": { opacity: 1 },
        "&:hover .info-icon": { transform: "translate3d(0, -3px, 0) rotate(-8deg)" },
      }}
    >
      <Box
        className="info-icon"
        sx={{
          position: "relative",
          display: "inline-flex",
          color: "text.primary",
          mb: 2,
          transition: `transform ${motion.duration.base}ms ${motion.ease.spring}`,
        }}
      >
        <Icon name={icon} size={28} />
      </Box>
      <Typography variant="h3" component="h3" sx={{ position: "relative", fontSize: "1.25rem", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ position: "relative", color: "text.secondary" }}>
        {text}
      </Typography>
    </Paper>
  );
};

export default InfoCard;
