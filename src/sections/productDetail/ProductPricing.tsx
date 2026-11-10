import { Stack, Typography } from "@mui/material";
import AddOnList from "../../components/addOnList/AddOnList";
import CardGrid from "../../components/cardGrid/CardGrid";
import PricingCard from "../../components/pricingCard/PricingCard";
import Section from "../../components/section/Section";
import type { ProductDetail } from "../../content/productDetail";

interface ProductPricingProps {
  pricing: ProductDetail["pricing"];
  services: ProductDetail["services"];
}

const ProductPricing = ({ pricing, services }: ProductPricingProps) => {
  const { packages, notIncluded, ...intro } = pricing;
  return (
    <Section {...intro}>
      <Stack spacing={{ xs: 6, md: 8 }}>
        <Stack spacing={3}>
          <CardGrid columns={3}>
            {packages.map((offer) => (
              <PricingCard key={offer.name} {...offer} />
            ))}
          </CardGrid>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {notIncluded}
          </Typography>
        </Stack>
        <AddOnList {...services} />
      </Stack>
    </Section>
  );
};

export default ProductPricing;
