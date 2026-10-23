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
- SVG icons live in `src/assets/icons` and are imported as React components via `vite-plugin-svgr` (`icon.svg?react`).

### Theme

`src/theme/tokens.ts` holds the raw values of the design system: colours, fonts, radii and layout sizes. `src/theme/theme.ts` turns them into an MUI theme via `createAppTheme(accent)`.

The palette separates two accents:

- `palette.brand` is always Zollstock yellow. It marks the brand itself: the pixel in the logo, the favicon, small highlights.
- `palette.primary` is the industry accent used by buttons and emphasis. It defaults to yellow. An industry page passes another accent from `accents` (`petrol`, `brick`) to `createAppTheme`, and nothing else changes.

Yellow is a surface colour only. Text on yellow is always `ink`; yellow text on `paper` is not readable and is never used.

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
| Typefaces         | Bricolage Grotesque, Figtree   |
| Package manager   | yarn                           |
| Hosting           | all-inkl, static               |

### Dependencies

<ul>
<li>@emotion/react</li>
<li>@emotion/styled</li>
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

### User Stories

<ul>
<li>As a tradesperson, I want to see the price before I talk to anyone, so that I know whether it fits my budget.</li>
<li>As a business owner on my phone, I want to book a call in two taps, so that I do not have to write an email.</li>
<li>As a visitor, I want to see examples of finished websites, so that I can judge the quality before I commit.</li>
</ul>
