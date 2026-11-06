import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import PagePixels from "../pagePixels/PagePixels";
import RollingNumber from "../rollingNumber/RollingNumber";
import VisuallyHidden from "../visuallyHidden/VisuallyHidden";
import { useInView } from "../../hooks/useInView";
import { sizeColumns } from "./sizeColumns";
import { sizeTable, type PackageOffer } from "../../content/packages";
import { ctaLabel, SECTION_IDS } from "../../content/site";
import { colors, effects, fonts, motion } from "../../theme/tokens";

interface SizeRowProps {
  offer: PackageOffer;
}

const SizeRow = ({ offer }: SizeRowProps) => {
  const price = sizeTable.price(offer);
  const titleId = `groesse-${offer.id}`;
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <Paper
      ref={ref}
      component="article"
      aria-labelledby={titleId}
      elevation={0}
      sx={{
        position: "relative",
        p: { xs: 3, md: 4 },
        border: offer.highlighted ? `2px solid ${colors.ink}` : `1px solid ${colors.line}`,
        display: "grid",
        gridTemplateColumns: sizeColumns,
        gap: { xs: 3, md: 5 },
        alignItems: "start",
        transition: `transform ${motion.duration.base}ms ${motion.ease.out}, box-shadow ${motion.duration.base}ms ${motion.ease.out}`,
        "&:hover": { transform: "translate3d(0, -3px, 0)", boxShadow: effects.shadowRaised },
      }}
    >
      {offer.highlighted && (
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
          {sizeTable.badge}
        </Box>
      )}
      <Stack direction={{ xs: "row", md: "column" }} spacing={{ xs: 3, md: 2 }} sx={{ alignItems: { xs: "center", md: "flex-start" } }}>
        <Typography
          id={titleId}
          component="h3"
          sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "4rem", lineHeight: 0.85 }}
        >
          <VisuallyHidden>{sizeTable.sizeHeading} </VisuallyHidden>
          {offer.name}
        </Typography>
        <Stack spacing={1}>
          <PagePixels count={offer.pages} active={inView} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {offer.scope}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
          {offer.description}
        </Typography>
        {offer.basis && (
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
            {offer.basis}:
          </Typography>
        )}
        <Box
          component="ul"
          sx={{ m: 0, p: 0, listStyle: "none", display: "grid", gap: "10px 24px", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" } }}
        >
          {offer.features.map((feature) => (
            <Stack component="li" key={feature} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
              <Box sx={{ mt: "2px", flexShrink: 0 }}>
                <Icon name="check" size={18} />
              </Box>
              <Typography variant="body2">{feature}</Typography>
            </Stack>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 16px", pt: 0.5 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {sizeTable.examplesLabel}
          </Typography>
          {offer.examples.map((example) => (
            <Link
              key={example.href}
              href={example.href}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="inherit"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, fontSize: "0.875rem", fontWeight: 500 }}
            >
              {example.label}
              <Icon name="arrowRight" size={16} />
            </Link>
          ))}
        </Box>
      </Stack>
      <Stack
        spacing={2.5}
        sx={{
          pt: { xs: 3, md: 0 },
          pl: { md: 4 },
          borderTop: { xs: `1px solid ${colors.line}`, md: "none" },
          borderLeft: { md: `1px solid ${colors.line}` },
          alignSelf: "stretch",
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "baseline", flexWrap: "wrap" }}>
            <Typography component="span" sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: "2.25rem", lineHeight: 1.1 }}>
              <RollingNumber value={price.amount} active={inView} />
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
              {price.suffix}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {price.detail}
          </Typography>
        </Box>
        <Button
          variant={offer.highlighted ? "contained" : "outlined"}
          color={offer.highlighted ? "primary" : "inherit"}
          href={`#${SECTION_IDS.booking}`}
          fullWidth
        >
          {ctaLabel}
        </Button>
      </Stack>
    </Paper>
  );
};

export default SizeRow;
