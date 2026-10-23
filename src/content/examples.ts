import type { ProjectCardProps } from "../components/projectCard/ProjectCard";
import { colors } from "../theme/tokens";
import { SECTION_IDS } from "./site";

export const examplesIntro = {
  id: SECTION_IDS.examples,
  eyebrow: "Beispiele",
  title: "So könnte deine Website aussehen.",
  lead: "Drei Beispielseiten für erfundene Betriebe zeigen, was in den Paketen steckt. Jede Seite bekommt eine eigene Gestaltung, abgestimmt auf Gewerk und Kundschaft.",
};

export const examples: ProjectCardProps[] = [
  {
    title: "Elektrotechnik",
    category: "Beispielseite, Paket Standard",
    text: "Leistungsseiten für Installation, E-Mobilität und Smart Home, dazu ein Notdienst-Hinweis gut sichtbar auf jeder Seite.",
    tone: colors.yellow,
    status: "Demo folgt",
  },
  {
    title: "Tischlerei",
    category: "Beispielseite, Paket Standard",
    text: "Große Bilder, eine Galerie mit Referenzen und eine Anfrage, bei der Kundinnen gleich Maße und Fotos mitschicken.",
    tone: colors.brick,
    status: "Demo folgt",
  },
  {
    title: "Malerbetrieb",
    category: "Beispielseite, Paket Start",
    text: "Ein klarer Onepager: Leistungen, Einsatzgebiet, Ablauf und ein Kontaktformular, das auf dem Handy in einer Minute ausgefüllt ist.",
    tone: colors.petrol,
    status: "Demo folgt",
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
