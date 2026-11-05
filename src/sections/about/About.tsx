import { Box, Link, Stack, Typography } from "@mui/material";
import CardGrid from "../../components/cardGrid/CardGrid";
import Logo from "../../components/logo/Logo";
import Reveal from "../../components/reveal/Reveal";
import Section from "../../components/section/Section";
import TeamCard from "../../components/teamCard/TeamCard";
import { aboutIntro, company, team } from "../../content/about";
import { colors, fonts } from "../../theme/tokens";

const About = () => {
  return (
    <Section {...aboutIntro} background="ink">
      <CardGrid columns={2}>
        {team.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </CardGrid>
      <Reveal>
        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 4,
            borderTop: `1px solid ${colors.inkMuted}`,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: 3,
          }}
        >
          <Stack spacing={1.25}>
            <Logo size={32} color={colors.paper} />
            <Typography variant="body2" sx={{ color: colors.line }}>
              {company.owner}
            </Typography>
          </Stack>
          <Stack spacing={0.5} sx={{ alignItems: { md: "flex-end" } }}>
            <Typography variant="caption" sx={{ color: colors.line, fontWeight: 500 }}>
              {company.contactLabel}
            </Typography>
            <Link
              href={`mailto:${company.email}`}
              underline="hover"
              color="inherit"
              sx={{
                fontFamily: fonts.display,
                fontWeight: 500,
                fontSize: { xs: "1.375rem", md: "1.75rem" },
                lineHeight: 1.2,
                textDecorationColor: colors.yellow,
                textUnderlineOffset: "6px",
                overflowWrap: "anywhere",
              }}
            >
              {company.email}
            </Link>
          </Stack>
        </Box>
      </Reveal>
    </Section>
  );
};

export default About;
