import Header from "./components/header/Header";
import Facts from "./sections/facts/Facts";
import Hero from "./sections/hero/Hero";
import Problems from "./sections/problems/Problems";

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Facts />
        <Problems />
      </main>
    </>
  );
}

export default App;
