import { Box, Stack, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import type { IconName } from "../../assets/icons";
import { colors, fonts } from "../../theme/tokens";

interface StepCardProps {
  number: number;
  icon: IconName;
  title: string;
  text: string;
  duration: string;
}

const StepCard = ({ number, icon, title, text, duration }: StepCardProps) => {
  return (
    <Stack spacing={2} sx={{ borderTop: `2px solid ${colors.ink}`, pt: 2.5, height: "100%" }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          component="span"
          sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "2.5rem", lineHeight: 1 }}
        >
          {String(number).padStart(2, "0")}
        </Typography>
        <Icon name={icon} size={28} />
      </Stack>
      <Typography variant="h3" component="h3" sx={{ fontSize: "1.25rem" }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", flex: 1 }}>
        {text}
      </Typography>
      <Box
        component="span"
        sx={{
          alignSelf: "flex-start",
          px: 1.25,
          py: 0.5,
          borderRadius: 1,
          bgcolor: colors.paper,
          border: `1px solid ${colors.line}`,
          fontSize: "0.8125rem",
          fontWeight: 500,
        }}
      >
        {duration}
      </Box>
    </Stack>
  );
};

export default StepCard;
