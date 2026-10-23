import { Link, Stack, Typography } from "@mui/material";
import Section from "../components/section/Section";
import Seo from "../components/seo/Seo";
import type { LegalPage } from "../content/legal";

interface LegalProps {
  page: LegalPage;
}

const Legal = ({ page }: LegalProps) => {
  return (
    <Section title={page.title}>
      <Seo title={page.title} noIndex />
      <Stack spacing={4} sx={{ maxWidth: "44rem" }}>
        {page.sections.map((section) => (
          <Stack key={section.heading} spacing={1}>
            <Typography variant="h3" component="h2" sx={{ fontSize: "1.25rem" }}>
              {section.heading}
            </Typography>
            {section.paragraphs.map((paragraph) => (
              <Typography key={paragraph}>{paragraph}</Typography>
            ))}
          </Stack>
        ))}
        <Link href="/" color="inherit" sx={{ fontWeight: 500 }}>
          Zurück zur Startseite
        </Link>
      </Stack>
    </Section>
  );
};

export default Legal;
