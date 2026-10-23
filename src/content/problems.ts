import type { IconName } from "../assets/icons";

export const problemsIntro = {
  eyebrow: "Kennst du das?",
  title: "Die Website ist das Letzte, wofür du Zeit hast.",
  lead: "Du bist gut in deinem Handwerk. Eine Website zu planen, zu texten und zu bauen gehört nicht dazu. Genau dafür gibt es Pixelgeselle.",
};

export const problems: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "phone",
    title: "Die alte Seite passt nicht mehr",
    text: "Auf dem Handy ist alles winzig, die Leistungen sind veraltet, und eigentlich schämst du dich ein bisschen dafür.",
  },
  {
    icon: "search",
    title: "Bei Google findet dich keiner",
    text: "Wer in deiner Gegend nach deinem Gewerk sucht, landet bei der Konkurrenz oder auf einem Vermittlungsportal.",
  },
  {
    icon: "euro",
    title: "Agenturen sind zu teuer",
    text: "Angebote ab 5.000 € und Stundensätze ohne Obergrenze passen nicht zu einem kleinen Betrieb.",
  },
  {
    icon: "clock",
    title: "Keine Zeit für Texte",
    text: "Baukästen versprechen viel, aber Texte, Fotos und Aufbau bleiben trotzdem an dir hängen.",
  },
];
