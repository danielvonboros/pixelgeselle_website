import Section from "../../components/section/Section";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import type { ProductDetail } from "../../content/productDetail";

interface ProductVideoProps {
  video: ProductDetail["video"];
}

const ProductVideo = ({ video }: ProductVideoProps) => {
  const { src, poster, label, ...intro } = video;
  return (
    <Section {...intro} background="card">
      <VideoPlayer src={src} poster={poster} label={label} />
    </Section>
  );
};

export default ProductVideo;
