import { Box, Paper, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import type { IconName } from "../../assets/icons";
import { colors } from "../../theme/tokens";

interface InfoCardProps {
  icon: IconName;
  title: string;
  text: string;
}

const InfoCard = ({ icon, title, text }: InfoCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 3, height: "100%", border: `1px solid ${colors.line}` }}
    >
      <Box sx={{ color: "text.primary", mb: 2 }}>
        <Icon name={icon} size={28} />
      </Box>
      <Typography variant="h3" component="h3" sx={{ fontSize: "1.25rem", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {text}
      </Typography>
    </Paper>
  );
};

export default InfoCard;
