import type { ProjectCardProps } from "../components/projectCard/ProjectCard";
import { colors } from "../theme/tokens";
import { SECTION_IDS, site } from "./site";

export const examplesIntro = {
  id: SECTION_IDS.examples,
  eyebrow: "Beispiele",
  title: "So könnte deine Website aussehen.",
  lead: "Vier Beispielseiten für erfundene Betriebe, gebaut wie echte Kundenprojekte. Jede hat eine eigene Gestaltung, abgestimmt auf Gewerk und Kundschaft.",
};

const demo = (slug: string) => ({
  href: `${site.demosUrl}/${slug}/`,
  image: `${site.demosUrl}/catalog/${slug}.jpg`,
  linkLabel: "Beispiel ansehen",
});

export const examples: ProjectCardProps[] = [
  {
    title: "Raumton Malerwerkstatt",
    category: "Maler aus Berlin · Größe S",
    text: "Ein ruhiger Onepager: Farbtöne zum Durchklicken, Leistungen, Festpreise pro Raum und ein kurzes Kontaktformular.",
    tone: colors.petrol,
    ...demo("raumton"),
  },
  {
    title: "Phase Elektrotechnik",
    category: "Elektriker aus Köln · Größe M",
    text: "Ein Lichtregler zum Ausprobieren, Leistungen, Projekte und eine Anfrage mit Foto-Upload. Der Notdienst ist immer zu sehen.",
    tone: colors.yellow,
    ...demo("phase"),
  },
  {
    title: "Firstlinie Dach und Fassade",
    category: "Dachdecker aus Hamburg · Größe M",
    text: "Technische Zeichnungen statt Stockfotos, ein klickbarer Dachaufbau und Referenzen mit Ort und Jahr.",
    tone: colors.brick,
    ...demo("firstlinie"),
  },
  {
    title: "Werkstatt Ahrens",
    category: "Schreiner aus München · Größe L",
    text: "Ein Monogramm in der gewählten Holzart, Projekte zum Filtern, der Ablauf vom Aufmaß bis zur Montage und eine Karriereseite.",
    tone: colors.ink,
    ...demo("ahrens"),
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
