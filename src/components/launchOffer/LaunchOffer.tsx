import { Box, Stack, Typography } from "@mui/material";
import { pulse } from "../../theme/keyframes";
import { colors, motion, radius } from "../../theme/tokens";

interface LaunchOfferProps {
  title: string;
  text: string;
  example: string;
  slots: string;
}

const LaunchOffer = ({ title, text, example, slots }: LaunchOfferProps) => {
  return (
    <Box
      sx={{
        bgcolor: colors.yellow,
        color: colors.ink,
        borderRadius: `${radius.lg}px`,
        p: { xs: 3, md: 4 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        alignItems: { md: "center" },
        justifyContent: "space-between",
        "--focus-ring": colors.ink,
      }}
    >
      <Stack spacing={1} sx={{ maxWidth: "44rem" }}>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {example}
        </Typography>
      </Stack>
      <Box
        component="p"
        sx={{
          m: 0,
          alignSelf: { xs: "flex-start", md: "center" },
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          bgcolor: colors.ink,
          color: colors.paper,
          borderRadius: `${radius.md}px`,
          fontSize: "0.875rem",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        <Box
          component="span"
          aria-hidden
          sx={{ width: 8, height: 8, bgcolor: colors.yellow, animation: `${pulse} 1.8s ${motion.ease.out} infinite` }}
        />
        {slots}
      </Box>
    </Box>
  );
};

export default LaunchOffer;
