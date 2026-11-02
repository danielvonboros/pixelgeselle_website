import { Box, Stack, Typography } from "@mui/material";
import type { IconName } from "../../assets/icons";
import Icon from "../icon/Icon";
import { colors } from "../../theme/tokens";

interface IncludedStripProps {
  title: string;
  items: { icon: IconName; label: string }[];
}

const IncludedStrip = ({ title, items }: IncludedStripProps) => {
  return (
    <Box sx={{ borderTop: `1px solid ${colors.ink}`, borderBottom: `1px solid ${colors.line}`, py: 2.5 }}>
      <Typography variant="caption" component="h3" sx={{ fontWeight: 500, color: "text.secondary", mb: 2 }}>
        {title}
      </Typography>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          listStyle: "none",
          display: "grid",
          gap: "12px 24px",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", lg: "repeat(6, auto)" },
          justifyContent: { lg: "space-between" },
        }}
      >
        {items.map((item) => (
          <Stack component="li" key={item.label} direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
            <Icon name={item.icon} size={20} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default IncludedStrip;
