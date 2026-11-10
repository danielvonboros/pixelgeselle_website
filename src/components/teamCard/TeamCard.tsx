import { Box, Link, Stack, Typography } from "@mui/material";
import Icon from "../icon/Icon";
import type { TeamMember } from "../../content/about";
import { colors, motion, radius } from "../../theme/tokens";

const TeamCard = ({
  name,
  role,
  email,
  photo,
  paragraphs,
  highlights,
}: TeamMember) => {
  return (
    <Stack
      sx={{
        height: "100%",
        overflow: "hidden",
        bgcolor: colors.inkRaised,
        borderRadius: `${radius.lg}px`,
        color: colors.paper,
        "&:hover .team-photo": { transform: "scale(1.03)" },
      }}
    >
      <Box
        sx={{
          aspectRatio: "4 / 3",
          overflow: "hidden",
          bgcolor: colors.ink,
          color: colors.inkMuted,
          display: "grid",
          placeItems: "center",
        }}
      >
        {photo ? (
          <Box
            className="team-photo"
            component="img"
            src={photo}
            alt={name}
            loading="lazy"
            decoding="async"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              transition: `transform ${motion.duration.slow}ms ${motion.ease.out}`,
            }}
          />
        ) : (
          <Icon name="user" size={56} />
        )}
      </Box>
      <Stack spacing={3} sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
        <Box>
          <Typography variant="h3" component="h3" sx={{ fontSize: "1.5rem" }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.line }}>
            {role}
          </Typography>
        </Box>
        {paragraphs.map((paragraph) => (
          <Typography key={paragraph} variant="body1">
            {paragraph}
          </Typography>
        ))}
        <Stack
          component="ul"
          spacing={1.25}
          sx={{ m: 0, p: 0, listStyle: "none" }}
        >
          {highlights.map((highlight) => (
            <Stack
              component="li"
              key={highlight}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <Box
                component="span"
                aria-hidden
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: colors.yellow,
                  flexShrink: 0,
                }}
              />
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
            "& .team-mail": {
              transition: `transform ${motion.duration.fast}ms ${motion.ease.out}`,
            },
            "&:hover .team-mail": { transform: "translateX(4px)" },
            "&:hover .team-address": {
              textDecoration: "underline",
              textDecorationColor: colors.yellow,
              textUnderlineOffset: "4px",
            },
          }}
        >
          <Icon name="message" size={18} />
          <Box component="span" className="team-address">
            {email}
          </Box>
          <Box
            component="span"
            className="team-mail"
            sx={{ display: "inline-flex", ml: "auto" }}
          >
            <Icon name="arrowRight" size={18} />
          </Box>
        </Link>
      </Stack>
    </Stack>
  );
};

export default TeamCard;
