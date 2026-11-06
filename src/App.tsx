import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SkipLink from "./components/skipLink/SkipLink";
import { resolvePage, type ResolvedPage } from "./content/routes";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

interface AppProps {
  path: string;
}

const renderPage = (page: ResolvedPage) => {
  if (page.kind === "home") return <Home />;
  if (page.kind === "legal") return <Legal page={page.page} />;
  return <NotFound />;
};

function App({ path }: AppProps) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>{renderPage(resolvePage(path))}</main>
      <Footer />
    </>
  );
}

export default App;
