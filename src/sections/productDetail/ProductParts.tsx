import CardGrid from "../../components/cardGrid/CardGrid";
import InfoCard from "../../components/infoCard/InfoCard";
import Section from "../../components/section/Section";
import type { ProductDetail } from "../../content/productDetail";

interface ProductPartsProps {
  parts: ProductDetail["parts"];
}

const ProductParts = ({ parts }: ProductPartsProps) => {
  const { items, ...intro } = parts;
  return (
    <Section {...intro}>
      <CardGrid columns={3}>
        {items.map((item) => (
          <InfoCard key={item.title} {...item} />
        ))}
      </CardGrid>
    </Section>
  );
};

export default ProductParts;
