import Header from "./components/header/Header";
import Facts from "./sections/facts/Facts";
import Hero from "./sections/hero/Hero";

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Facts />
      </main>
    </>
  );
}

export default App;
