import { Box, Container, Link, Stack, Typography } from "@mui/material";
import Logo from "../logo/Logo";
import { footer } from "../../content/footer";
import { navItems, site } from "../../content/site";
import { colors, layout } from "../../theme/tokens";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ bgcolor: colors.ink, color: colors.paper }}>
      <Container maxWidth={false} sx={{ maxWidth: layout.maxWidth, py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Stack spacing={2}>
            <Link href="/" underline="none" aria-label="Pixelgeselle, zur Startseite">
              <Logo size={28} color={colors.paper} />
            </Link>
            <Typography variant="body2" sx={{ color: colors.line, maxWidth: "24rem" }}>
              {footer.claim} {footer.region}
            </Typography>
          </Stack>
          <Stack component="nav" aria-label="Footer-Navigation" spacing={1}>
            {navItems.map((item) => (
              <Link key={item.id} href={`/#${item.id}`} underline="hover" color="inherit" variant="body2">
                {item.label}
              </Link>
            ))}
          </Stack>
          <Stack spacing={1}>
            <Link href={`mailto:${site.email}`} underline="hover" color="inherit" variant="body2">
              {site.email}
            </Link>
            {footer.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} underline="hover" color="inherit" variant="body2">
                {link.label}
              </Link>
            ))}
          </Stack>
        </Box>
        <Typography variant="caption" component="p" sx={{ mt: 6, color: colors.line }}>
          © {year} {site.name}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
