import Header from "./components/header/Header";
import Facts from "./sections/facts/Facts";
import Hero from "./sections/hero/Hero";
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
      </main>
    </>
  );
}

export default App;
