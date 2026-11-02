import PixelEdge from "../components/pixelEdge/PixelEdge";
import Seo from "../components/seo/Seo";
import About from "../sections/about/About";
import Booking from "../sections/booking/Booking";
import Examples from "../sections/examples/Examples";
import Facts from "../sections/facts/Facts";
import Faq from "../sections/faq/Faq";
import Hero from "../sections/hero/Hero";
import Packages from "../sections/packages/Packages";
import Problems from "../sections/problems/Problems";
import Process from "../sections/process/Process";
import { colors } from "../theme/tokens";

const Home = () => {
  return (
    <>
      <Seo />
      <Hero />
      <Facts />
      <Problems />
      <Process />
      <Packages />
      <Examples />
      <PixelEdge from={colors.card} to={colors.ink} />
      <About />
      <Faq />
      <PixelEdge from={colors.paper} to={colors.yellow} />
      <Booking />
      <PixelEdge from={colors.yellow} to={colors.ink} descending />
    </>
  );
};

export default Home;
