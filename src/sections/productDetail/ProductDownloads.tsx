import DownloadList from "../../components/downloadList/DownloadList";
import Section from "../../components/section/Section";
import type { ProductDetail } from "../../content/productDetail";

interface ProductDownloadsProps {
  downloads: ProductDetail["downloads"];
}

const ProductDownloads = ({ downloads }: ProductDownloadsProps) => {
  const { items, ...intro } = downloads;
  return (
    <Section {...intro} background="card">
      <DownloadList items={items} />
    </Section>
  );
};

export default ProductDownloads;
