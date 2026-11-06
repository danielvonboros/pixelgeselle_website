import { Box, Container, Link } from "@mui/material";
import Icon from "../icon/Icon";
import { colors, layout, motion } from "../../theme/tokens";

interface BackLinkBarProps {
  href: string;
  label: string;
}

const BackLinkBar = ({ href, label }: BackLinkBarProps) => {
  return (
    <Box sx={{ bgcolor: colors.yellow, color: colors.ink, "--focus-ring": colors.ink }}>
      <Container maxWidth={false} sx={{ maxWidth: layout.maxWidth }}>
        <Link
          href={href}
          underline="hover"
          color="inherit"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            minHeight: 64,
            fontWeight: 500,
            fontSize: { xs: "1.0625rem", md: "1.25rem" },
            textUnderlineOffset: "5px",
            "& svg": { transform: "scaleX(-1)", transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` },
            "&:hover svg": { transform: "scaleX(-1) translateX(4px)" },
          }}
        >
          <Icon name="arrowRight" size={22} />
          {label}
        </Link>
      </Container>
    </Box>
  );
};

export default BackLinkBar;
