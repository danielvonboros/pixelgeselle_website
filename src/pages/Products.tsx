import BackLinkBar from "../components/backLinkBar/BackLinkBar";
import CardGrid from "../components/cardGrid/CardGrid";
import ProjectCard from "../components/projectCard/ProjectCard";
import Section from "../components/section/Section";
import Seo from "../components/seo/Seo";
import { productsPage, upcomingIntro, upcomingProducts } from "../content/products";
import FeaturedProduct from "../sections/featuredProduct/FeaturedProduct";

const Products = () => {
  return (
    <>
      <Seo title={productsPage.documentTitle} />
      <BackLinkBar {...productsPage.backLink} />
      <Section eyebrow={productsPage.eyebrow} title={productsPage.title} titleAs="h1" lead={productsPage.lead} />
      <FeaturedProduct />
      <Section {...upcomingIntro} background="card">
        <CardGrid columns={2}>
          {upcomingProducts.map((product) => (
            <ProjectCard key={product.title} {...product} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default Products;
