import weingutPreview from "../assets/images/products/weingut.jpg";
import type { ProjectCardProps } from "../components/projectCard/ProjectCard";
import { colors } from "../theme/tokens";

export const productsPage = {
  path: "/produkte",
  documentTitle: "Weitere Produkte",
  description:
    "Digitale Werkzeuge der Pixelgesellen für kleine Betriebe: Website, Online-Shop und Verwaltung für Weingüter, dazu CRM, Projektmanagement und Werkzeuge für die Kundengewinnung, die gerade entstehen.",
  backLink: { href: "/", label: "Hier geht es zu den Handwerker-Websites" },
  eyebrow: "Weitere Produkte",
  title: "Mehr als Websites für Handwerker.",
  lead: "Neben Websites für Handwerk und Betriebe bauen wir digitale Werkzeuge für kleine Unternehmen. Eins ist fertig, die anderen entstehen gerade.",
};

export const featuredProduct = {
  eyebrow: "Für Weingüter",
  title: "Website, Online-Shop und Verwaltung für dein Weingut.",
  text: "Ein Auftritt, in dem alles zusammenhängt: Die Kundschaft findet den passenden Wein und bestellt direkt beim Winzer, das Weingut pflegt Weine, Bestellungen und Termine selbst.",
  features: [
    "Weinfinder nach Anlass, vom Grillen bis zum Anstoßen",
    "Online-Shop mit Weinkiste, Kennenlernpaketen und Kartenzahlung",
    "Kundenkonto und Merkzettel",
    "Termine für Weinproben, Feste und Feiern",
    "Eigener Login für das Weingut",
  ],
  credit: "Entwickelt von Alexander Sanwald. Die Demo nimmt keine echten Bestellungen an.",
  href: "https://weingut-template-production.up.railway.app",
  linkLabel: "Demo ansehen",
  image: weingutPreview,
  imageAlt: "Startseite der Weingut-Demo mit drei Weinflaschen und der Überschrift Wein voller Sonne und Lebensfreude",
};

export const upcomingIntro = {
  eyebrow: "In Arbeit",
  title: "Werkzeuge, an denen wir gerade bauen.",
  lead: "Einige davon nutzen wir schon selbst. Wenn du eins früher ausprobieren möchtest, sprich uns an.",
};

const inProgress = "In Arbeit";

export const upcomingProducts: ProjectCardProps[] = [
  {
    title: "CRM",
    category: "Kunden und Anfragen",
    text: "Kundschaft, Anfragen und Angebote an einem Ort, statt verteilt auf Mailpostfach, Zettel und Tabellen.",
    tone: colors.petrol,
    status: inProgress,
  },
  {
    title: "Projektmanagement",
    category: "Aufträge und Termine",
    text: "Aufträge, Termine und Aufgaben im Blick, vom ersten Gespräch bis zur Übergabe.",
    tone: colors.yellow,
    status: inProgress,
  },
  {
    title: "Lead-Generator",
    category: "Neue Kundschaft finden",
    text: "Findet Betriebe in einer Region, deren Website in die Jahre gekommen ist, und bewertet sie nach klaren Kriterien.",
    tone: colors.brick,
    status: inProgress,
  },
  {
    title: "Briefgeselle",
    category: "Briefe in Minuten",
    text: "Macht aus einem Lead einen persönlichen Brief auf eigenem Briefpapier, fertig zum Drucken.",
    tone: colors.ink,
    status: inProgress,
  },
];
