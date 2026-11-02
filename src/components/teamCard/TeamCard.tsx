import { Box, Link, Stack, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import type { TeamMember } from "../../content/about";
import { colors, motion, radius } from "../../theme/tokens";

const TeamCard = ({ name, role, email, photo, paragraphs, highlights }: TeamMember) => {
  return (
    <Stack
      spacing={3}
      sx={{
        height: "100%",
        p: { xs: 3, md: 4 },
        bgcolor: colors.inkRaised,
        borderRadius: `${radius.lg}px`,
        color: colors.paper,
      }}
    >
      <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: `${radius.md}px`,
            bgcolor: colors.ink,
            color: colors.inkMuted,
            display: "grid",
            placeItems: "center",
          }}
        >
          {photo ? (
            <Box component="img" src={photo} alt={name} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Icon name="user" size={40} />
          )}
        </Box>
        <Box>
          <Typography variant="h3" component="h3" sx={{ fontSize: "1.375rem" }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.line }}>
            {role}
          </Typography>
        </Box>
      </Stack>
      {paragraphs.map((paragraph) => (
        <Typography key={paragraph} variant="body1">
          {paragraph}
        </Typography>
      ))}
      <Stack component="ul" spacing={1.25} sx={{ m: 0, p: 0, listStyle: "none" }}>
        {highlights.map((highlight) => (
          <Stack component="li" key={highlight} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: colors.yellow, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: colors.line }}>
              {highlight}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Box sx={{ flex: 1 }} />
      <Link
        href={`mailto:${email}`}
        underline="none"
        color="inherit"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          pt: 2,
          fontWeight: 500,
          borderTop: `1px solid ${colors.inkMuted}`,
          width: "100%",
          "& .team-mail": { transition: `transform ${motion.duration.fast}ms ${motion.ease.out}` },
          "&:hover .team-mail": { transform: "translateX(4px)" },
          "&:hover .team-address": { textDecoration: "underline", textDecorationColor: colors.yellow, textUnderlineOffset: "4px" },
        }}
      >
        <Icon name="message" size={18} />
        <Box component="span" className="team-address">
          {email}
        </Box>
        <Box component="span" className="team-mail" sx={{ display: "inline-flex", ml: "auto" }}>
          <Icon name="arrowRight" size={18} />
        </Box>
      </Link>
    </Stack>
  );
};

export default TeamCard;
