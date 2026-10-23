import Header from "./components/header/Header";
import Section from "./components/section/Section";

function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Section
          eyebrow="Komponenten-Test"
          title="Deine Website. Fester Preis."
          lead="Ein Interview, wir schreiben die Texte, du bekommst deine Seite."
        />
      </main>
    </>
  );
}

export default App;
