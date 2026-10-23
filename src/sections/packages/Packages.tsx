import { Typography } from "@mui/material";
import CardGrid from "../../components/cardGrid/CardGrid";
import PricingCard from "../../components/pricingCard/PricingCard";
import Section from "../../components/section/Section";
import { packages, packagesIntro, packagesNote } from "../../content/packages";

const Packages = () => {
  return (
    <Section {...packagesIntro}>
      <CardGrid columns={3}>
        {packages.map((item) => (
          <PricingCard key={item.name} {...item} />
        ))}
      </CardGrid>
      <Typography variant="caption" component="p" sx={{ mt: 3, color: "text.secondary" }}>
        {packagesNote}
      </Typography>
    </Section>
  );
};

export default Packages;
