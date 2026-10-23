import Logo from "./components/logo/Logo";
import Section from "./components/section/Section";

function App() {
  return (
    <>
      <Section>
        <Logo size={40} />
      </Section>
      <Section
        background="ink"
        eyebrow="Komponenten-Test"
        title="Deine Website. Fester Preis."
        lead="Ein Interview, wir schreiben die Texte, du bekommst deine Seite."
      />
    </>
  );
}

export default App;
