import { formatEuro, packageOffers } from "./packages";
import { SECTION_IDS } from "./site";

const sizePrices = packageOffers.map((offer) => `${offer.name} ${formatEuro(offer.price)}`);
const careFrom = formatEuro(Math.min(...packageOffers.map((offer) => offer.carePerMonth)));

export const faqIntro = {
  id: SECTION_IDS.faq,
  eyebrow: "Häufige Fragen",
  title: "Was du vorher wissen willst.",
};

export const faqs = [
  {
    question: "Was kostet eine Homepage für Handwerker bei euch?",
    answer: `Einen Festpreis, den du vorher kennst: Größe ${sizePrices.slice(0, -1).join(", ")} und ${sizePrices[sizePrices.length - 1]}, jeweils netto und einmalig. Die Betreuung mit Hosting und Domain ist optional und kostet ab ${careFrom} im Monat.`,
  },
  {
    question: "Was braucht ihr von mir?",
    answer: "Rund eine Stunde deiner Zeit für Erstgespräch und Interview, dein Logo, falls vorhanden, und ein paar Fotos von deinen Arbeiten. Fehlen Fotos, finden wir gemeinsam eine Lösung.",
  },
  {
    question: "Wie lange dauert es, bis meine Website online ist?",
    answer: "14 Tage ab dem Interview. Wie schnell es geht, hängt auch davon ab, wie zügig du Feedback zum Entwurf gibst.",
  },
  {
    question: "Was ist der Unterschied zu einem Homepage-Baukasten?",
    answer: "Ein Baukasten gibt dir ein Werkzeug, Texte, Fotos und Aufbau bleiben aber bei dir. Bei uns bekommst du einen fertigen Internetauftritt: Wir schreiben die Texte aus dem Interview, kümmern uns um Webdesign und Technik und stellen die Seite online. Danach gehört sie dir.",
  },
  {
    question: "Wird meine Website bei Google gefunden?",
    answer: "Wir legen dafür die Grundlage: Texte mit den Begriffen, nach denen deine Kunden suchen, eine schnelle Seite, die auf dem Handy funktioniert, und ab Größe M eine eigene Seite pro Leistung und ein eingerichtetes Google-Unternehmensprofil. Einen bestimmten Platz bei Google kann seriös niemand versprechen.",
  },
  {
    question: "Gehört mir die Website danach?",
    answer: "Ja. Die Domain läuft auf deinen Namen, Texte und Bilder gehören dir. Wenn du später wechseln willst, bekommst du alles, was du dafür brauchst.",
  },
  {
    question: "Muss ich die Betreuung buchen?",
    answer: "Nein. Du kannst Hosting und Domain auch selbst verwalten. Die Betreuung ist für alle, die sich nach dem Start um nichts mehr kümmern wollen, und ist monatlich kündbar.",
  },
  {
    question: "Kann ich später selbst etwas ändern?",
    answer: "Kleine Änderungen übernehmen wir im Rahmen der Betreuung. Wenn du Inhalte wie Referenzen regelmäßig selbst pflegen willst, sag es im Erstgespräch, dann planen wir das von Anfang an ein.",
  },
  {
    question: "Kümmert ihr euch um Impressum und Datenschutz?",
    answer: "Wir legen die Seiten technisch an und bauen die Website datensparsam. Die Rechtstexte selbst kommen von einem Generator oder deiner Anwältin, denn Rechtsberatung dürfen wir nicht leisten.",
  },
  {
    question: "Baut ihr auch Websites für Kfz-Werkstätten?",
    answer: "Ja. Ob Kfz-Werkstatt, Tischlerei oder Malerbetrieb: Wir bauen Websites für Handwerks- und Dienstleistungsbetriebe, ganz gleich welches Gewerk. Bei Werkstätten gehören meist Leistungen, Öffnungszeiten, Anfahrt und eine schnelle Anfrage nach vorn.",
  },
  {
    question: "Arbeitet ihr nur in Berlin?",
    answer: "Nein. Interview und Abstimmung laufen per Video, egal wo dein Betrieb sitzt. In Berlin und Umgebung kommen wir auch gern persönlich vorbei.",
  },
];
