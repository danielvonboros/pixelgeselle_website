import { SECTION_IDS, site } from "./site";

export interface LegalPage {
  path: string;
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
}

const provider = {
  owner: "Daniel von Boros",
  street: "Kolonnenstraße 8",
  city: "10827 Berlin",
  vatId: "DE456695805",
};

export const imprint: LegalPage = {
  path: "/impressum",
  title: "Impressum",
  sections: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: [site.name, `Inhaber: ${provider.owner}`, provider.street, provider.city],
    },
    {
      heading: "Kontakt",
      paragraphs: [`E-Mail: ${site.email}`, `Kontaktformular: ${site.url}/#${SECTION_IDS.booking}`],
    },
    {
      heading: "Umsatzsteuer",
      paragraphs: [`Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: ${provider.vatId}`],
    },
    {
      heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      paragraphs: [`${provider.owner}, Anschrift wie oben`],
    },
    {
      heading: "Verbraucherstreitbeilegung",
      paragraphs: [
        "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
  ],
};

export const privacy: LegalPage = {
  path: "/datenschutz",
  title: "Datenschutzerklärung",
  sections: [
    {
      heading: "Verantwortlicher",
      paragraphs: [
        "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:",
        `${site.name}, Inhaber: ${provider.owner}`,
        `${provider.street}, ${provider.city}`,
        `E-Mail: ${site.email}`,
      ],
    },
    {
      heading: "Das Wichtigste in Kürze",
      paragraphs: [
        "Diese Website setzt keine Cookies, nutzt kein Tracking und keine Analysewerkzeuge und bindet keine Inhalte von anderen Anbietern ein. Schriften, Bilder und Skripte liegen auf unserem eigenen Webspace.",
        "Personenbezogene Daten verarbeiten wir nur, soweit das für den Abruf der Seiten technisch nötig ist, und wenn du uns schreibst, das Kontaktformular nutzt oder einen Termin buchst.",
      ],
    },
    {
      heading: "Hosting und E-Mail",
      paragraphs: [
        "Diese Website, die Beispielseiten unter demos.pixelgesellen.de und unsere E-Mail-Postfächer liegen bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742 Friedersdorf. ALL-INKL verarbeitet die Daten in Rechenzentren in Deutschland und nur in unserem Auftrag. Mit ALL-INKL besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO.",
        "Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb der Website und unserer E-Mail-Kommunikation (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      heading: "Server-Logfiles",
      paragraphs: [
        "Bei jedem Aufruf einer Seite speichert der Server automatisch Zugriffsdaten: deine IP-Adresse, Datum und Uhrzeit, die aufgerufene Adresse, die zuvor besuchte Seite, Browser und Betriebssystem, die übertragene Datenmenge und den Statuscode.",
        "Diese Daten brauchen wir, um die Website auszuliefern, Fehler zu finden und Angriffe abzuwehren. Wir führen sie nicht mit anderen Daten zusammen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Logfiles werden nur so lange aufbewahrt, wie es für diese Zwecke nötig ist, und danach automatisch gelöscht.",
      ],
    },
    {
      heading: "Verschlüsselung",
      paragraphs: [
        "Die Website wird ausschließlich über eine verschlüsselte Verbindung ausgeliefert. Du erkennst sie an „https://“ in der Adresszeile deines Browsers.",
      ],
    },
    {
      heading: "Kontakt per E-Mail",
      paragraphs: [
        "Wenn du uns eine E-Mail schreibst, verarbeiten wir deine E-Mail-Adresse, deinen Namen und den Inhalt deiner Nachricht, um dir zu antworten. Geht es um ein Angebot oder einen Auftrag, ist die Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO, sonst unser berechtigtes Interesse, deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. f DSGVO).",
        "Wir löschen deine Nachricht, sobald deine Anfrage erledigt ist. Wird daraus ein Auftrag, bewahren wir die Korrespondenz so lange auf, wie es Handels- und Steuerrecht vorschreiben, in der Regel sechs bis zehn Jahre.",
      ],
    },
    {
      heading: "Kontaktformular",
      paragraphs: [
        `Im Kontaktformular fragen wir deinen Namen, deine E-Mail-Adresse und deine Nachricht ab, freiwillig auch deinen Betrieb und deine Telefonnummer. Nach dem Absenden schickt unser Server die Angaben als E-Mail an ${site.email}. Eine Datenbank nutzen wir dafür nicht. Rechtsgrundlage und Speicherdauer sind dieselben wie bei einer E-Mail.`,
        "Zum Schutz vor Spam nutzen wir keine Dienste anderer Anbieter, sondern eine kleine Rechenaufgabe, ein für Menschen unsichtbares Feld und eine Mindestzeit zum Ausfüllen. Damit niemand das Formular massenhaft nutzt, speichert der Server einen Hashwert deiner IP-Adresse zusammen mit den Zeitpunkten deiner Anfragen. Aus dem Hashwert lässt sich die IP-Adresse nicht ablesen. Nach einer Stunde werden diese Einträge nicht mehr verwendet und beim nächsten Absenden des Formulars gelöscht. Rechtsgrundlage ist unser berechtigtes Interesse am Schutz vor Missbrauch (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      heading: "Terminbuchung",
      paragraphs: [
        "Für Erstgespräche verlinken wir auf den Buchungsdienst Cal.com (Cal.com, Inc., USA). Der Kalender ist nicht in unsere Seite eingebunden. Erst wenn du auf den Buchungslink klickst, rufst du die Seite von Cal.com auf, und Cal.com verarbeitet Daten wie deine IP-Adresse.",
        "Buchst du einen Termin, gibst du dort deinen Namen, deine E-Mail-Adresse, den gewünschten Termin und auf Wunsch eine Nachricht an. Cal.com übermittelt uns diese Angaben, damit wir das Gespräch vorbereiten und führen können. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.",
        "Cal.com kann Daten auch in den USA verarbeiten. Für die Verarbeitung auf den Seiten von Cal.com gilt deren Datenschutzerklärung unter https://cal.com/privacy.",
      ],
    },
    {
      heading: "Schriftarten",
      paragraphs: [
        "Die Schriften Bricolage Grotesque und Figtree stammen von Google Fonts, liegen aber auf unserem eigenen Server. Beim Aufruf der Seite wird keine Verbindung zu Google oder einem anderen Anbieter aufgebaut.",
      ],
    },
    {
      heading: "Deine Rechte",
      paragraphs: [
        "Du hast das Recht auf Auskunft über deine bei uns gespeicherten Daten (Art. 15 DSGVO) sowie auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO).",
        "Verarbeiten wir Daten auf Grundlage unseres berechtigten Interesses, kannst du dieser Verarbeitung aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen (Art. 21 DSGVO).",
        `Für alle diese Anliegen genügt eine formlose E-Mail an ${site.email}.`,
        "Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit.",
      ],
    },
    {
      heading: "Stand",
      paragraphs: ["November 2026"],
    },
  ],
};

export const legalPages = [imprint, privacy];
