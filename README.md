# Pixelgeselle

Landing page for Pixelgeselle, fixed-price websites for trades and small service businesses.

<p>Client side single page application, no backend</p>

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
  pages/          Home and Legal, composed from sections
  sections/       page sections, one folder each, composed from components
  theme/          design tokens and the MUI theme
```

Sections in page order: Hero, Facts, Problems, Process, Packages, Examples, About, Faq, Booking. Header and Footer wrap every page.

Reusable components:

| Component     | Purpose                                                            |
| ------------- | ------------------------------------------------------------------ |
| `Logo`        | Wordmark with the yellow pixel as the dot on the i                 |
| `Section`     | Section frame with optional eyebrow, title and lead; backgrounds `paper`, `card`, `ink`, `brand` |
| `Icon`        | Renders an icon from `assets/icons` by name                        |
| `PixelStairs` | Decorative pixel staircase, the brand motif                        |
| `FactList`    | Row of short facts with icons                                      |
| `CardGrid`    | Responsive grid for cards, 2 to 4 columns                          |
| `InfoCard`    | Icon, title and text                                               |
| `StepCard`    | Numbered process step with duration                                |
| `PricingCard` | Package with price, features and call to action                    |
| `ProjectCard` | Example or reference project with image or placeholder             |
| `FaqList`     | Accordion of questions and answers                                 |
| `Seo`         | Sets document title and robots meta per page                       |
| `SkipLink`    | Keyboard link that jumps past the navigation                       |

There is no router. `App.tsx` matches `window.location.pathname` against the legal pages in `src/content/legal.ts` and renders `Home` otherwise.

### Before launch

The first version contains placeholders that must be replaced before the site goes live:

- Imprint: address, phone number and VAT ID in `src/content/legal.ts`.
- Privacy policy: the full text in `src/content/legal.ts`, covering hosting, server logs, email contact and the booking tool.
- Domain and email: `pixelgeselle.de` and `kontakt@pixelgeselle.de` are assumed in `src/content/site.ts`, `index.html`, `public/robots.txt` and `public/sitemap.xml`.
- Booking: the cal.com link in `src/content/site.ts`. To embed the calendar instead of linking to it, uncomment the iframe in `src/sections/booking/Booking.tsx` and import `Box`.
- Prices: the package prices in `src/content/packages.ts` and `index.html` are starting values to calibrate after the first project. The VAT note assumes regular VAT; change it if the small business rule applies.
- Hosting in the care plan: reselling webspace requires an all-inkl reseller contract.
- Photo: the about section shows a placeholder until a portrait is added.
- Examples: the three demo sites are announced as "Demo folgt". A real reference is prepared as a commented entry in `src/content/examples.ts`; activate it once the client has agreed.

### Theme

`src/theme/tokens.ts` holds the raw values of the design system: colours, fonts, radii and layout sizes. `src/theme/theme.ts` turns them into an MUI theme via `createAppTheme(accent)`.

The palette separates two accents:

- `palette.brand` is always Zollstock yellow. It marks the brand itself: the pixel in the logo, the favicon, small highlights.
- `palette.primary` is the industry accent used by buttons and emphasis. It defaults to yellow. An industry page passes another accent from `accents` (`petrol`, `brick`) to `createAppTheme`, and nothing else changes.

Yellow is a surface colour only. Text on yellow is always `ink`; yellow text on `paper` is not readable and is never used.

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
<li>@emotion/react</li>
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
yarn build     typecheck and build to dist/
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
| `SSH_TARGET`      | Target folder on the server, e.g. `/www/htdocs/<user>/pixelgeselle.de/` |

`public/.htaccess` forces HTTPS and serves `index.html` for every path that is not a file, so `/impressum` and `/datenschutz` work on Apache.

### User Stories

<ul>
<li>As a tradesperson, I want to see the price before I talk to anyone, so that I know whether it fits my budget.</li>
<li>As a business owner on my phone, I want to book a call in two taps, so that I do not have to write an email.</li>
<li>As a visitor, I want to see examples of finished websites, so that I can judge the quality before I commit.</li>
</ul>
