import BackLinkBar from "../components/backLinkBar/BackLinkBar";
import ProductBand from "../components/productBand/ProductBand";
import Seo from "../components/seo/Seo";
import type { ProductDetail } from "../content/productDetail";
import ProductContact from "../sections/productDetail/ProductContact";
import ProductDownloads from "../sections/productDetail/ProductDownloads";
import ProductParts from "../sections/productDetail/ProductParts";
import ProductPricing from "../sections/productDetail/ProductPricing";
import ProductVideo from "../sections/productDetail/ProductVideo";

interface ProductDetailPageProps {
  product: ProductDetail;
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  return (
    <>
      <Seo title={product.documentTitle} />
      <BackLinkBar {...product.backLink} />
      <ProductBand {...product.hero} titleAs="h1" />
      <ProductParts parts={product.parts} />
      <ProductVideo video={product.video} />
      <ProductPricing pricing={product.pricing} services={product.services} />
      <ProductDownloads downloads={product.downloads} />
      <ProductContact contact={product.contact} />
    </>
  );
};

export default ProductDetailPage;
