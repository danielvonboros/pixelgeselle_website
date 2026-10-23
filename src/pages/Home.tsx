import About from "../sections/about/About";
import Booking from "../sections/booking/Booking";
import Examples from "../sections/examples/Examples";
import Facts from "../sections/facts/Facts";
import Faq from "../sections/faq/Faq";
import Hero from "../sections/hero/Hero";
import Packages from "../sections/packages/Packages";
import Problems from "../sections/problems/Problems";
import Process from "../sections/process/Process";

const Home = () => {
  return (
    <>
      <Hero />
      <Facts />
      <Problems />
      <Process />
      <Packages />
      <Examples />
      <About />
      <Faq />
      <Booking />
    </>
  );
};

export default Home;
