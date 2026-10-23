import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { legalPages } from "./content/legal";
import Home from "./pages/Home";
import Legal from "./pages/Legal";

function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const legalPage = legalPages.find((page) => page.path === path);

  return (
    <>
      <Header />
      <main id="top">{legalPage ? <Legal page={legalPage} /> : <Home />}</main>
      <Footer />
    </>
  );
}

export default App;
