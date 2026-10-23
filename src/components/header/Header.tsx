import { AppBar, Box, Button, Container, Link, Stack, Toolbar } from "@mui/material";
import Logo from "../logo/Logo";
import { ctaLabel, navItems, SECTION_IDS } from "../../content/site";
import { colors, layout } from "../../theme/tokens";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: colors.paper,
        color: colors.ink,
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: layout.maxWidth }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 4 }}>
          <Link href="#top" underline="none" aria-label="Pixelgeselle, zum Seitenanfang">
            <Logo size={26} />
          </Link>
          <Box sx={{ flex: 1 }} />
          <Stack
            component="nav"
            aria-label="Hauptnavigation"
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                underline="hover"
                color="inherit"
                sx={{ fontSize: "0.9375rem", fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
          <Button variant="contained" href={`#${SECTION_IDS.booking}`}>
            {ctaLabel}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
