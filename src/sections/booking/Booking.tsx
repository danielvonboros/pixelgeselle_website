import { Button, Link, Stack, Typography } from "@mui/material";
import Icon from "../../components/icon/Icon";
import Section from "../../components/section/Section";
import { booking, bookingIntro } from "../../content/booking";
import { colors } from "../../theme/tokens";

const Booking = () => {
  return (
    <Section {...bookingIntro} background="brand">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
      >
        <Button
          variant="contained"
          size="large"
          href={booking.url}
          target="_blank"
          rel="noopener"
          endIcon={<Icon name="arrowRight" size={18} />}
          sx={{ bgcolor: colors.ink, color: colors.paper, "&:hover": { bgcolor: colors.inkRaised } }}
        >
          {booking.ctaLabel}
        </Button>
        <Typography variant="body2">
          {booking.emailLabel}{" "}
          <Link href={`mailto:${booking.email}`} color="inherit" sx={{ fontWeight: 500 }}>
            {booking.email}
          </Link>
        </Typography>
      </Stack>
      {/* <Box
        component="iframe"
        title="Terminbuchung"
        src={`${booking.url}?embed=true`}
        sx={{ mt: 6, width: "100%", height: 640, border: 0, borderRadius: 1.5, bgcolor: colors.card }}
      /> */}
    </Section>
  );
};

export default Booking;
