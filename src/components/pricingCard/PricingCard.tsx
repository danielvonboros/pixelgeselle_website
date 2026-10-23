import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import { colors, fonts } from "../../theme/tokens";

export interface PricingCardProps {
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
  highlighted?: boolean;
}

const PricingCard = ({
  name,
  price,
  priceSuffix,
  description,
  features,
  ctaLabel,
  ctaHref,
  badge,
  highlighted = false,
}: PricingCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        height: "100%",
        p: { xs: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        border: highlighted ? `2px solid ${colors.ink}` : `1px solid ${colors.line}`,
      }}
    >
      {badge && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            top: -14,
            left: 24,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: "brand.main",
            color: "brand.contrastText",
            fontSize: "0.8125rem",
            fontWeight: 500,
          }}
        >
          {badge}
        </Box>
      )}
      <Stack spacing={1}>
        <Typography variant="h3" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
        <Typography
          component="span"
          sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "2.5rem", lineHeight: 1 }}
        >
          {price}
        </Typography>
        <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
          {priceSuffix}
        </Typography>
      </Stack>
      <Stack component="ul" spacing={1.25} sx={{ m: 0, p: 0, listStyle: "none", flex: 1 }}>
        {features.map((feature) => (
          <Stack component="li" key={feature} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
            <Box sx={{ mt: "2px", color: "text.primary" }}>
              <Icon name="check" size={18} />
            </Box>
            <Typography variant="body2">{feature}</Typography>
          </Stack>
        ))}
      </Stack>
      <Button variant={highlighted ? "contained" : "outlined"} color={highlighted ? "primary" : "inherit"} href={ctaHref} fullWidth>
        {ctaLabel}
      </Button>
    </Paper>
  );
};

export default PricingCard;
