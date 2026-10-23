import { Box, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import type { IconName } from "../../assets/icons";

interface FactListProps {
  items: { icon: IconName; label: string }[];
}

const FactList = ({ items }: FactListProps) => {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        p: 0,
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: `repeat(${items.length}, auto)` },
        justifyContent: { md: "space-between" },
        gap: { xs: 2, md: 4 },
      }}
    >
      {items.map((item) => (
        <Box component="li" key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
            }}
          >
            <Icon name={item.icon} size={20} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FactList;
