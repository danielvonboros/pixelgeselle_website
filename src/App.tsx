import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SkipLink from "./components/skipLink/SkipLink";
import { legalPages } from "./content/legal";
import Home from "./pages/Home";
import Legal from "./pages/Legal";

function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const legalPage = legalPages.find((page) => page.path === path);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>{legalPage ? <Legal page={legalPage} /> : <Home />}</main>
      <Footer />
    </>
  );
}

export default App;
