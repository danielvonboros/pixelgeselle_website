# Pixelgesellen

Landing page for Pixelgesellen (owner Daniel von Boros until Boros & Sanwald GbR is founded), fixed-price websites for trades and small service businesses.

<p>Client side single page application, no backend except the PHP contact form</p>

### Description

Sales page for website packages at a fixed price. The first version targets trades and construction in Berlin and Brandenburg. The structure is prepared for a multisite setup later: one page per industry, sharing every component and token, differing only in content and the accent colour.

All visible copy is German. Code, file names and identifiers are English.

### Conventions

- No comments in code files. Explanations live in this README. The only exception is code that is commented out on purpose and must be activated later.
- Reusable components first. A section composes components; it does not style raw elements itself.
- Content is never hardcoded in components. Strings live in `src/content`.
- Every visual value has exactly one source in the theme, mirroring the Pixelgeselle design system.
- One folder per component under `src/components`, e.g. `components/card/Card.tsx`, with its data next to it.
- SVG icons live in `src/assets/icons` and are imported as React components via `vite-plugin-svgr` (`icon.svg?react`). Use them through `components/icon/Icon.tsx`.

### Structure

```
src/
  assets/icons/   stroke icons as SVG, registered in index.ts
  components/     reusable building blocks, one folder each
  content/        all German copy, one file per section
  hooks/          shared React hooks for motion: in view, active section, reduced motion
  pages/          Home and Legal, composed from sections
  sections/       page sections, one folder each, composed from components
  theme/          design tokens and the MUI theme
```

Sections in page order: Hero, Facts, Problems, Process, Packages, Examples, About (the team), Faq, Booking. Header and Footer wrap every page.

Reusable components:

| Component     | Purpose                                                            |
| ------------- | ------------------------------------------------------------------ |
| `Logo`        | Wordmark with the yellow pixel as the dot on the i                 |
| `Section`     | Section frame with optional eyebrow, title and lead; backgrounds `paper`, `card`, `ink`, `brand` |
| `Icon`        | Renders an icon from `assets/icons` by name                        |
| `PixelStairs` | Decorative pixel staircase, the brand motif                        |
| `AnimatedHeadline` | Hero headline: lines rise in, each full stop lands as a pixel, the last one yellow |
| `PixelSite`   | Hero visual: a browser frame in which pixels build the demo sites, see Motion |
| `Schedule`    | Construction schedule of the process, pinned and driven by scrolling on desktop |
| `RollingNumber` | Digits roll like a mechanical counter; used for prices, facts and days |
| `Reveal`      | Fades and lifts its children in once they scroll into view          |
| `Magnetic`    | Pulls a call to action slightly towards the mouse                   |
| `PixelEdge`   | Pixel staircase between two sections of different colour            |
| `VisuallyHidden` | Text for screen readers only                                     |
| `FactList`    | Row of short facts with icons                                      |
| `CardGrid`    | Responsive grid for cards, 2 to 4 columns                          |
| `InfoCard`    | Icon, title and text                                               |
| `StepCard`    | Numbered process step with duration                                |
| `ModeSwitch`  | Two or more options as a sliding toggle; unused since the rental option was removed, kept for its return |
| `SizeRow`     | One size of the price table: pages, contents, examples, price      |
| `PagePixels`  | Number of pages as pixels, the size motif of the price table       |
| `IncludedStrip` | Row of icons with what every size includes                       |
| `LaunchOffer` | Yellow strip with the launch discount and the free places          |
| `AddOnList`   | Add-ons with text and price                                        |
| `ProjectCard` | Example or reference project with image or placeholder, tilts towards the mouse |
| `TeamCard`    | Team member with portrait, role, background and personal email       |
| `FaqList`     | Accordion of questions and answers                                 |
| `ContactForm` | Form with math captcha and honeypot, posts to `/api/contact.php`   |
| `FormField`   | Label, input and error message in the style of the site           |
| `PixelCheck`  | Pixel check mark that pops in after a message was sent             |
| `Seo`         | Sets document title and robots meta per page                       |
| `SkipLink`    | Keyboard link that jumps past the navigation                       |

There is no router. `App.tsx` receives the path as a prop, matches it against the legal pages in `src/content/legal.ts` and renders `Home` otherwise.

### Prerendering

`yarn build` renders every route to static HTML, so the content, the styles and the meta tags arrive with the first response instead of after the JavaScript:

1. `vite build` builds the client to `dist/`.
2. `vite build --ssr src/entry-server.tsx` builds a Node version of the app to `dist-ssr/`.
3. `scripts/prerender.js` renders `/`, `/impressum` and `/datenschutz` with `renderToString`, extracts the Emotion styles with `@emotion/server` and writes `dist/index.html`, `dist/impressum.html` and `dist/datenschutz.html`. Then it deletes `dist-ssr/`.

`src/main.tsx` hydrates the prerendered markup and falls back to a normal render in `yarn dev`, where the root is empty. Code that reads `window` or `document` must therefore run in an effect, not during render, and the first render must not depend on the time or on random values.

The head (`<!--app-head-->` in `index.html`) is generated from content: title, description, canonical, robots, Open Graph and the JSON-LD in `src/content/seo.ts` read the prices from `src/content/packages.ts`, so the meta tags cannot drift from the price table.

### Before launch

The first version contains placeholders that must be replaced before the site goes live:

- Imprint and privacy policy in `src/content/legal.ts`: written for Daniel von Boros as sole owner until the GbR is founded, then switch the provider to the GbR. The privacy policy covers all-inkl hosting and mail, server logs, email, the contact form, the cal.com link and the self-hosted fonts. Extend it before adding any other service. There is no phone number, the contact form is the second quick contact route next to email.
- Domain and email: `pixelgesellen.de` and `kontakt@pixelgesellen.de` are assumed in `src/content/site.ts`, `public/robots.txt` and `public/sitemap.xml`. The personal addresses `daniel@` and `alex@pixelgesellen.de` are in `src/content/about.ts`.
- Booking: the cal.com link in `src/content/site.ts`. To embed the calendar instead of linking to it, uncomment the iframe in `src/sections/booking/Booking.tsx`.
- Contact form: create the mailbox `noreply@pixelgesellen.de` in KAS and put `contact-config.php` on the server, see Contact form below. Then send one test message from the live site.
- Prices: the sizes S, M and L in `src/content/packages.ts` are starting values to calibrate after the first project. The VAT note assumes regular VAT; change it if the small business rule applies.
- Launch offer: `referenceSlotsLeft` in `src/content/packages.ts` counts the free places of the launch discount. Lower it with every new client and remove the strip when it reaches zero.
- Hosting in the care plan: reselling webspace requires an all-inkl reseller contract.
- Photos: the team cards show a placeholder until `photo` is set for each member in `src/content/about.ts`.
- Examples: the four demo sites live in the `pixelgeselle-demos` repository and are linked at `https://demos.pixelgesellen.de/<site>/`. Deploy them before this site, otherwise the example links lead nowhere. The card images are screenshots of the demo home pages and load from `/catalog/<site>.jpg` on the demo subdomain; until they exist, the cards show their colour and the pixel staircase. A real reference is prepared as a commented entry in `src/content/examples.ts`; activate it once the client has agreed.

### Contact form

The form sits in the booking section next to the calendar link. `ContactForm` loads a small math task from `public/api/contact.php`, which Vite copies to `dist/api/contact.php`, and posts the message there. The script runs on all-inkl with PHP 8.1 or newer and sends the message with `mail()`:

- From `Pixelgesellen <noreply@pixelgesellen.de>`, to `kontakt@pixelgesellen.de`. Reply-To is the visitor, so answering the mail answers them.
- Subject `Kontaktformular: <Betrieb or Name>`, plain text with name, business, email, phone and message.
- Spam protection without third parties: a math task signed with a secret, a minimum of 3 seconds between loading the task and sending, a hidden honeypot field, a check of the Origin header and at most 5 messages per hour and connection. Nothing is stored except the hashed connection for the rate limit, and entries older than an hour are deleted on the next submission, as the privacy policy states.

The script is the same as on raumideenwerk. It reads recipient, sender and secret from `contact-config.php` one level above the web root, so the secret is never part of the repository and several domains of the account can share the file. `server/contact-config.example.php` shows the entry for this site:

1. In KAS create the mailbox `noreply@pixelgesellen.de`, so the sender exists and bounces have a place to go. `kontakt@pixelgesellen.de` must exist as well.
2. Generate a secret with `openssl rand -hex 32`.
3. Add the entry to `contact-config.php` next to the domain folders on the server, or upload the example as that file, and replace the secret.

In `yarn dev` a small mock in `vite.config.ts` answers instead of PHP: the task is always `3 + 4`, and nothing is sent. The deployment fails if `dist/api/contact.php` is missing.

### Theme

`src/theme/tokens.ts` holds the raw values of the design system: colours, fonts, radii and layout sizes. `src/theme/theme.ts` turns them into an MUI theme via `createAppTheme(accent)`.

The palette separates two accents:

- `palette.brand` is always Zollstock yellow. It marks the brand itself: the pixel in the logo, the favicon, small highlights.
- `palette.primary` is the industry accent used by buttons and emphasis. It defaults to yellow. An industry page passes another accent from `accents` (`petrol`, `brick`) to `createAppTheme`, and nothing else changes.

Yellow is a surface colour only. Text on yellow is always `ink`; yellow text on `paper` is not readable and is never used.

### Motion

Every animation has a job: it shows how a website is built from pixels in 14 days, or it confirms an action. Durations, easings and the stagger live in `motion` in `src/theme/tokens.ts`, the keyframes in `src/theme/keyframes.ts`.

- **Hero:** `PixelSite` draws a 24 × 16 grid on a canvas. The layouts of three demo sites are rectangles in `components/pixelSite/layouts.ts`. `pixelEngine.ts` moves one pixel per cell with spring physics: the first site drops in row by row, the next ones rearrange from the current pixels. A day counter runs to 14, then the frame shows "Online". The mouse pushes pixels aside. The loop pauses when the canvas is out of view or the tab is hidden, and only redraws while something moves.
- **Process:** on desktop `Schedule` pins itself while the visitor scrolls through 260 % of the viewport height. Scrolling sets one CSS variable `--t` from 0 to 15; every cell of the schedule computes its fill from it in CSS, so a scroll frame costs no React render. On phones the schedule plays once when it comes into view, and all four steps are shown as cards.
- **Numbers:** prices, facts and the day counter use `RollingNumber`. Screen readers get the plain value.
- **Details:** section headers and card grids reveal with a stagger, the header shows the scroll progress as a pixel bar and marks the current section, cards follow the mouse, and `PixelEdge` builds a staircase into the dark and yellow sections.

`prefers-reduced-motion` is respected everywhere: the canvas shows the first site still, the schedule is shown complete, and the theme turns off all transitions, delays and loops.

### Fonts

Both typefaces are self-hosted through Fontsource and bundled by Vite. Nothing is loaded from Google Fonts: embedding Google Fonts sends the visitor's IP address to Google, which German courts have ruled a GDPR violation (LG München I, 3 O 17493/20). Only the Latin subset and the weights in use are imported in `src/main.tsx`.

### Tools used

| Property          | Tool                           |
| ----------------- | ------------------------------ |
| Language          | TypeScript                     |
| Library           | React 19                       |
| Build tool        | Vite 6                         |
| Component library | MUI v6                         |
| Styling           | Emotion, via the MUI `sx` prop |
| Linting           | ESLint 9, typescript-eslint    |
| Icons             | vite-plugin-svgr               |
| Typefaces         | Bricolage Grotesque, Figtree, self-hosted via Fontsource |
| Package manager   | yarn                           |
| Hosting           | all-inkl, static               |

### Dependencies

<ul>
<li>@emotion/cache</li>
<li>@emotion/react</li>
<li>@emotion/server</li>
<li>@emotion/styled</li>
<li>@fontsource/bricolage-grotesque</li>
<li>@fontsource/figtree</li>
<li>@mui/material</li>
<li>react</li>
<li>react-dom</li>
</ul>

Dev dependencies

<ul>
<li>@eslint/js</li>
<li>@types/react</li>
<li>@types/react-dom</li>
<li>@vitejs/plugin-react</li>
<li>eslint</li>
<li>eslint-plugin-react-hooks</li>
<li>eslint-plugin-react-refresh</li>
<li>globals</li>
<li>typescript</li>
<li>typescript-eslint</li>
<li>vite</li>
<li>vite-plugin-svgr</li>
</ul>

### Scripts

```
yarn dev       start the dev server
yarn build     typecheck, build and prerender to dist/
yarn lint      run ESLint
yarn preview   serve the production build locally
```

### Deployment

Every push to `main` builds the site and uploads `dist/` to all-inkl via rsync over SSH (`.github/workflows/deploy.yml`). Lint and build must pass, otherwise nothing is uploaded. A second push cancels a deployment that is still running, so two uploads never overlap on the same target. The workflow can also be started by hand with a dry run that only lists the changes.

Required repository secrets:

| Secret            | Content                                              |
| ----------------- | ---------------------------------------------------- |
| `SSH_PRIVATE_KEY` | Private key of a deploy key added to the all-inkl account |
| `SSH_KNOWN_HOSTS` | Output of `ssh-keyscan <host>`, so the host key is pinned instead of trusted blindly |
| `SSH_USER`        | SSH user of the all-inkl account                     |
| `SSH_HOST`        | SSH host of the all-inkl account                     |
| `SSH_TARGET`      | Target folder on the server, e.g. `/www/htdocs/<user>/pixelgesellen.de/` |

`public/.htaccess` forces HTTPS, serves `/impressum` and `/datenschutz` from their prerendered `.html` files and `index.html` for every other path that is not a file. `/api/contact.php` is a file and is executed by PHP. `contact-config.php` lies above the target folder and is not touched by rsync.

### User Stories

<ul>
<li>As a tradesperson, I want to see the price before I talk to anyone, so that I know whether it fits my budget.</li>
<li>As a business owner on my phone, I want to book a call in two taps, so that I do not have to write an email.</li>
<li>As a visitor, I want to see examples of finished websites, so that I can judge the quality before I commit.</li>
</ul>
