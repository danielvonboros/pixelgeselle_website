import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SkipLink from "./components/skipLink/SkipLink";
import { findLegalPage } from "./content/legal";
import Home from "./pages/Home";
import Legal from "./pages/Legal";

interface AppProps {
  path: string;
}

function App({ path }: AppProps) {
  const legalPage = findLegalPage(path);

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
