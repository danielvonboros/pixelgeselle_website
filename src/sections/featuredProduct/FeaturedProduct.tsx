import ProductBand from "../../components/productBand/ProductBand";
import { featuredProduct } from "../../content/products";

const FeaturedProduct = () => {
  return <ProductBand {...featuredProduct} />;
};

export default FeaturedProduct;
