import { Box } from "@mui/material";
import { colors } from "../../theme/tokens";

const SkipLink = () => {
  return (
    <Box
      component="a"
      href="#main"
      sx={{
        position: "absolute",
        left: 16,
        top: -80,
        zIndex: 2000,
        px: 2,
        py: 1.25,
        borderRadius: 1,
        bgcolor: colors.ink,
        color: colors.paper,
        fontWeight: 500,
        textDecoration: "none",
        "&:focus": { top: 16 },
      }}
    >
      Zum Inhalt springen
    </Box>
  );
};

export default SkipLink;
