import { Box, Stack, Typography } from "@mui/material";
import Icon from "../../components/icon/Icon";
import Section from "../../components/section/Section";
import { about, aboutIntro } from "../../content/about";
import { colors } from "../../theme/tokens";

const About = () => {
  return (
    <Section {...aboutIntro} background="ink">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 4fr) minmax(0, 7fr)" },
          gap: { xs: 4, md: 8 },
          alignItems: "start",
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              aspectRatio: "4 / 5",
              maxWidth: 360,
              borderRadius: 1.5,
              bgcolor: colors.inkRaised,
              display: "grid",
              placeItems: "center",
              color: colors.inkMuted,
            }}
          >
            <Icon name="user" size={72} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500 }}>{about.name}</Typography>
            <Typography variant="body2" sx={{ color: colors.line }}>
              {about.role}
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={3}>
          {about.paragraphs.map((paragraph) => (
            <Typography key={paragraph} variant="subtitle1">
              {paragraph}
            </Typography>
          ))}
          <Stack component="ul" spacing={1.5} sx={{ m: 0, p: 0, pt: 1, listStyle: "none" }}>
            {about.highlights.map((highlight) => (
              <Stack component="li" key={highlight} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Box component="span" aria-hidden sx={{ width: 8, height: 8, bgcolor: "brand.main", flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: colors.line }}>
                  {highlight}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Section>
  );
};

export default About;
