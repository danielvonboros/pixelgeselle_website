import weingutPreview from "../assets/images/products/weingut.jpg";
import type { ProjectCardProps } from "../components/projectCard/ProjectCard";
import type { ProductBandContent } from "./productDetail";
import { weingutPath } from "./weingut";
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

export const featuredProduct: ProductBandContent = {
  headingId: "weingut-titel",
  eyebrow: "Wein&Gut · Für Weingüter",
  title: "Website, Online-Shop und Verwaltung für dein Weingut.",
  text: "Ein Auftritt, in dem alles zusammenhängt: Die Kundschaft findet den passenden Wein und bestellt direkt beim Winzer, das Weingut verwaltet Bestellungen, Rechnungen und Kunden an einem Ort.",
  features: [
    "Weinfinder nach Anlass, vom Grillen bis zum Anstoßen",
    "Online-Shop mit Weinkiste, Kistenrabatt und Online-Zahlung",
    "Kundenkonto und Merkzettel",
    "Termine, Feiern und Zimmerbuchung",
    "Verwaltung „Keller“ für Bestellungen, Rechnungen und Kunden",
  ],
  image: weingutPreview,
  imageLink: { href: weingutPath, label: "Video, Preise und Unterlagen ansehen" },
  action: { href: weingutPath, label: "Zum Projekt" },
  note: "Entwickelt von Alexander Sanwald.",
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
