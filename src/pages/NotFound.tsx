import { Link } from "@mui/material";
import Section from "../components/section/Section";
import Seo from "../components/seo/Seo";
import { notFound } from "../content/notFound";

const NotFound = () => {
  return (
    <Section title={notFound.title} titleAs="h1" lead={notFound.lead}>
      <Seo title={notFound.documentTitle} noIndex />
      <Link href="/" color="inherit" sx={{ fontWeight: 500 }}>
        {notFound.homeLabel}
      </Link>
    </Section>
  );
};

export default NotFound;
