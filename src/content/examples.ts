import ahrensPage from "../assets/images/examples/ahrens-page.jpg";
import firstliniePage from "../assets/images/examples/firstlinie-page.jpg";
import phasePage from "../assets/images/examples/phase-page.jpg";
import raumtonPage from "../assets/images/examples/raumton-page.jpg";
import type { ProjectCardProps } from "../components/projectCard/ProjectCard";
import { colors } from "../theme/tokens";
import { demoImage, demoUrl } from "./demos";
import { SECTION_IDS } from "./site";

export const examplesIntro = {
  id: SECTION_IDS.examples,
  // Section number in the eyebrow, counted in page order on the home page.
  index: "04",
  eyebrow: "Beispiele",
  title: "Website-Beispiele für Maler, Elektriker, Dachdecker und Schreiner.",
  lead: "Vier Beispielseiten für erfundene Betriebe, gebaut wie echte Kundenprojekte. Jede hat eine eigene Gestaltung, abgestimmt auf Gewerk und Kundschaft.",
};

const demo = (slug: string) => ({
  href: demoUrl(slug),
  image: demoImage(slug),
  linkLabel: "Beispiel ansehen",
});

export const examples: ProjectCardProps[] = [
  {
    title: "Raumton Malerwerkstatt",
    category: "Maler aus Berlin · Größe S · 1 Seite",
    text: "Ein ruhiger Onepager: Farbtöne zum Durchklicken, Leistungen, Festpreise pro Raum und ein kurzes Kontaktformular.",
    tone: colors.petrol,
    ...demo("raumton"),
    pageImage: raumtonPage,
  },
  {
    title: "Phase Elektrotechnik",
    category: "Elektriker aus Köln · Größe M · 6 Seiten",
    text: "Eine eigene Seite pro Leistung, ein Lichtregler zum Ausprobieren und eine Anfrage mit Foto-Upload. Der Notdienst ist immer zu sehen.",
    tone: colors.yellow,
    ...demo("phase"),
    pageImage: phasePage,
  },
  {
    title: "Firstlinie Dach und Fassade",
    category: "Dachdecker aus Hamburg · Größe M · 6 Seiten",
    text: "Eine Seite pro Leistung mit technischer Zeichnung, ein klickbarer Dachaufbau und eine Karriereseite mit Schnellbewerbung.",
    tone: colors.brick,
    ...demo("firstlinie"),
    pageImage: firstliniePage,
  },
  {
    title: "Werkstatt Ahrens",
    category: "Schreiner aus München · Größe L · 9 Seiten",
    text: "Ein Monogramm in der gewählten Holzart, Seiten für Leistungen und Orte im Umland, Projekte zum Filtern und eine Karriereseite.",
    tone: colors.ink,
    ...demo("ahrens"),
    pageImage: ahrensPage,
  },
  // {
  //   title: "CaNa Hallenbau",
  //   category: "Kundenprojekt, Hallenbau",
  //   text: "Relaunch der Website mit eigenen Seiten pro Hallentyp und lokaler Suchmaschinenoptimierung.",
  //   tone: colors.ink,
  //   href: "https://cana-hallenbau.de",
  //   linkLabel: "Website ansehen",
  // },
];
