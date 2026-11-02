import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";
import ContactForm from "../../components/contactForm/ContactForm";
import Icon from "../../components/icon/Icon";
import Magnetic from "../../components/magnetic/Magnetic";
import Reveal from "../../components/reveal/Reveal";
import Section from "../../components/section/Section";
import { booking, bookingIntro } from "../../content/booking";
import { contactForm } from "../../content/contact";
import { colors, effects, motion } from "../../theme/tokens";

const Booking = () => {
  return (
    <Section {...bookingIntro} background="brand">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" },
          gap: { xs: 5, md: 8 },
          alignItems: "start",
        }}
      >
        <Reveal>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h3" component="h3">
                {booking.title}
              </Typography>
              <Typography variant="body1">{booking.text}</Typography>
            </Stack>
            <Box>
              <Magnetic>
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
              </Magnetic>
            </Box>
            <Box sx={{ pt: 3, borderTop: `1px solid ${colors.ink}` }}>
              <Typography variant="body2">{booking.emailLabel}</Typography>
              <Link
                href={`mailto:${booking.email}`}
                color="inherit"
                sx={{ fontWeight: 500, fontSize: "1.125rem", textUnderlineOffset: "4px" }}
              >
                {booking.email}
              </Link>
            </Box>
          </Stack>
        </Reveal>
        <Reveal delay={motion.stagger}>
          <Paper
            elevation={0}
            sx={{ p: { xs: 3, md: 5 }, bgcolor: colors.card, color: colors.ink, boxShadow: effects.shadowRaised }}
          >
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Typography variant="h3" component="h3">
                {contactForm.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {contactForm.text}
              </Typography>
            </Stack>
            <ContactForm content={contactForm} />
          </Paper>
        </Reveal>
      </Box>
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
