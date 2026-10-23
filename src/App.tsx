import Header from "./components/header/Header";
import About from "./sections/about/About";
import Examples from "./sections/examples/Examples";
import Facts from "./sections/facts/Facts";
import Hero from "./sections/hero/Hero";
import Packages from "./sections/packages/Packages";
import Problems from "./sections/problems/Problems";
import Process from "./sections/process/Process";

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Facts />
        <Problems />
        <Process />
        <Packages />
        <Examples />
        <About />
      </main>
    </>
  );
}

export default App;
