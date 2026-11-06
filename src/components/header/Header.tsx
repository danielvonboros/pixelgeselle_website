import { AppBar, Box, Button, Container, Link, Stack, Toolbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Logo from "../logo/Logo";
import { useActiveSection } from "../../hooks/useActiveSection";
import { ctaLabel, navItems, SECTION_IDS, site } from "../../content/site";
import { colors, effects, layout, motion } from "../../theme/tokens";

const sectionIds = navItems.filter((item) => item.href.includes("#")).map((item) => item.href.split("#")[1]);

interface NavLinksProps {
  active: string | null;
  path: string;
  row?: boolean;
}

// row: the second header line on phones, with full-height touch targets
const NavLinks = ({ active, path, row = false }: NavLinksProps) =>
  navItems.map((item) => {
    const isPage = !item.href.includes("#");
    const current = isPage ? path.replace(/\/$/, "") === item.href : active !== null && item.href.endsWith(`#${active}`);
    return (
      <Link
        key={item.href}
        href={item.href}
        underline="none"
        color="inherit"
        aria-current={current ? (isPage ? "page" : "location") : undefined}
        sx={{
          position: "relative",
          fontSize: "0.9375rem",
          fontWeight: 500,
          py: 0.5,
          whiteSpace: "nowrap",
          ...(row && { display: "inline-flex", alignItems: "center", flexShrink: 0, minHeight: layout.mobileNavHeight, py: 0 }),
          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            bottom: row ? 4 : -6,
            width: 6,
            height: 6,
            bgcolor: colors.yellow,
            transform: `translateX(-50%) scale(${current ? 1 : 0})`,
            transition: `transform ${motion.duration.fast * 2}ms ${motion.ease.spring}`,
          },
          "@media (hover: hover)": { "&:hover::after": { transform: "translateX(-50%) scale(1)" } },
        }}
      >
        {row && item.shortLabel ? item.shortLabel : item.label}
      </Link>
    );
  });

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
      setScrolled(window.scrollY > 8);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled ? effects.headerTint : colors.paper,
        backdropFilter: scrolled ? "saturate(1.4) blur(14px)" : "none",
        color: colors.ink,
        borderBottom: `1px solid ${colors.line}`,
        transition: `background-color ${motion.duration.fast}ms`,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: layout.maxWidth }}>
        <Toolbar disableGutters sx={{ minHeight: layout.headerHeight, gap: { xs: 2, md: 4 } }}>
          <Link href="/" underline="none" aria-label={`${site.name}, zur Startseite`}>
            <Logo size={26} animated />
          </Link>
          <Box sx={{ flex: 1 }} />
          <Stack
            component="nav"
            aria-label="Hauptnavigation"
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <NavLinks active={active} path={path} />
          </Stack>
          <Button variant="contained" href={`/#${SECTION_IDS.booking}`} sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
            {ctaLabel}
          </Button>
        </Toolbar>
      </Container>
      <Box sx={{ display: { xs: "block", md: "none" }, borderTop: `1px solid ${colors.line}` }}>
        <Container maxWidth={false} sx={{ maxWidth: layout.maxWidth }}>
          <Stack
            component="nav"
            aria-label="Hauptnavigation"
            direction="row"
            sx={{
              justifyContent: "space-between",
              gap: 1,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <NavLinks active={active} path={path} row />
          </Stack>
        </Container>
      </Box>
      <Box
        ref={progressRef}
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: 3,
          transform: "scaleX(0)",
          transformOrigin: "left center",
          backgroundImage: `repeating-linear-gradient(90deg, ${colors.yellow} 0 6px, transparent 6px 8px)`,
        }}
      />
    </AppBar>
  );
};

export default Header;
