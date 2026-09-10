# ESPD-EDM Reference Implementation

A European Single Procurement Document (ESPD) service implementation using plain HTML, CSS, and JavaScript.

## Features

- **Two roles**: Contracting Authority (ESPD Request) and Economic Operator (ESPD Response)
- **Six-part wizard**: Step-by-step form covering all ESPD parts (I–VI)
- **Dynamic rendering**: Form generated from decomposed `espd-edm/` data model (loaded via `index.json`)
- **Conditional logic**: ONTRUE/ONFALSE visibility based on indicator answers
- **Persistent state**: Answers saved to localStorage, restored on reload
- **XML export**: Generate UBL-compliant ESPD Request/Response XML
- **XML import**: Load existing ESPD documents to continue editing
- **i18n ready**: Translation keys resolved from `i18n/` folder (English included)
- **Accessible**: Built on Pico CSS (WCAG AA), semantic HTML, ARIA attributes, keyboard navigation, skip links

## Running Locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

`npm run dev` starts `dev-server.js`, a small Node server that serves the static
files **and** proxies the two server-dependent APIs to avoid browser CORS
restrictions:

- `/api/ted/*`  → `https://api.ted.europa.eu` (TED notice lookup)
- `/api/itb/*`  → `https://www.itb.ec.europa.eu` (ITB XML validation)

If you are behind a corporate proxy, set `HTTPS_PROXY` before starting the
server so the proxied API calls can reach the internet:

```bash
HTTPS_PROXY=http://your-proxy:port npm run dev
```

## Building for GitLab Pages

GitLab Pages serves static files only — there is no Node.js runtime in
production. The build produces a fully static site with the server-dependent
features disabled (see [Feature Flags](#feature-flags)).

```bash
npm run build:pages
```

This runs `scripts/build-pages.js`, which:

1. Copies the browser-served assets (`index.html`, `css/`, `js/`, `i18n/`, and
   the runtime model data from `espd-edm/`) into a `public/` directory.
   Dev-only artifacts under `espd-edm/` (`node_modules/`, `*.cjs` scripts,
   `_diff/`, package files) are **not** shipped.
2. Overwrites `public/js/runtime-config.js` to set
   `window.__ESPD_SERVERLESS__ = true`, disabling the server-dependent features.

The source tree is left untouched, so local development is unaffected.

Deployment is handled by [`.gitlab-ci.yml`](./.gitlab-ci.yml): the `pages` job
runs `npm run build:pages`, publishes `public/` as the Pages artifact, and runs
only on the default branch. The site is served from the Pages **root**.

## Feature Flags

Two features require the dev-server proxy and therefore cannot run on a pure
static host:

- **TED lookup** (`js/ted-lookup.js`) — looks up procurement metadata from the
  TED API.
- **ITB validation** (`js/itb-validation.js`) — validates generated XML against
  the ITB ESPD Validator.

These are gated behind feature flags defined in `js/features.js`. When a flag is
off, the corresponding UI is hidden (the TED "Look up" buttons and the
"Validate XML" button) so nothing fails without a backend.

Flags are resolved in this priority order:

1. **URL parameter** — `?serverless` (or `?serverless=true` / `?serverless=1`)
   forces serverless mode (both features off). `?serverless=false` forces full
   mode. This always wins.
2. **Build-time global** — `window.__ESPD_SERVERLESS__`, set in
   `js/runtime-config.js`. The committed default is `false` (full mode, for
   local dev); the Pages build overwrites it to `true`.
3. **Default** — all features on.

| Environment            | `__ESPD_SERVERLESS__` | TED lookup | ITB validation |
| ---------------------- | --------------------- | ---------- | -------------- |
| Local dev (`npm run dev`) | `false`            | on         | on             |
| GitLab Pages           | `true`                | off        | off            |

To preview serverless mode locally, append `?serverless` to the URL, e.g.
http://localhost:3000/?serverless.

## Project Structure

```
├── index.html                  # Single page entry point
├── dev-server.js               # Local dev server + TED/ITB API proxy
├── css/
│   └── espd.css                # Custom styles on top of Pico CSS
├── js/
│   ├── app.js                  # Main application, wizard orchestration
│   ├── features.js             # Feature-flag resolution (serverless mode)
│   ├── runtime-config.js       # Sets window.__ESPD_SERVERLESS__ (build-time flag)
│   ├── renderer.js             # Renders JSON model → HTML form elements
│   ├── model.js                # Loads the ESPD-EDM data model
│   ├── state.js                # Form state management + localStorage
│   ├── conditional.js          # ONTRUE/ONFALSE visibility logic
│   ├── validation.js           # Cardinality & datatype validation
│   ├── codelists.js            # Country codes, procedure types, currencies
│   ├── i18n.js                 # Internationalization support
│   ├── xml-export.js           # UBL XML generation
│   ├── xml-import.js           # ESPD XML parsing
│   ├── ted-lookup.js           # TED notice lookup (server-dependent feature)
│   ├── itb-validation.js       # ITB XML validation (server-dependent feature)
│   └── ecertis.js              # eCertis API placeholder
├── scripts/
│   └── build-pages.js          # Builds the static site into public/ for Pages
├── i18n/
│   └── i18n/
│       ├── translations.json   # i18n manifest and key conventions
│       └── en/                 # English translations (per-part)
├── espd-edm/                    # ESPD-EDM data model (decomposed parts + schemas)
│   ├── index.json              # Manifest linking all parts
│   ├── metadata.json           # Version, title, legal basis
│   ├── parts/                  # One file per ESPD part (I–VI)
│   └── schemas/                # JSON Schemas for validation
├── .gitlab-ci.yml              # GitLab Pages deployment pipeline
└── package.json                # Scripts: dev, build:pages, test
```

## CSS Framework

Uses [Pico CSS](https://picocss.com/) (CDN) — a minimal, semantic CSS framework with built-in accessibility (WCAG AA compliant), responsive design, and good form styling. No JavaScript dependency, no build step.

## Data Model

The `espd-edm/` directory defines the data model in decomposed form:
- **6 parts** with sections, criteria, and question hierarchies
- **Component types**: CRITERION, QUESTION_GROUP, QUESTION_SUBGROUP, QUESTION, REQUIREMENT, LEGISLATION, CAPTION, etc.
- **Property data types**: INDICATOR, DESCRIPTION, DATE, URL, AMOUNT, CODE_COUNTRY, PERCENTAGE, etc.
- **Conditional codes**: ON* (always visible), ONTRUE (show when parent = yes), ONFALSE (show when parent = no)

A decomposed version of this model is available in [`espd-edm/`](./espd-edm/) — split by Part (I–VI) into separate files for easier navigation, maintenance, and tooling. See the [ESPD-EDM README](./espd-edm/README.md) for details.

## Accessibility

- Skip link to main content
- Semantic HTML5 elements
- ARIA labels and live regions
- Keyboard navigation (Alt+Arrow keys for wizard steps)
- High contrast via Pico CSS design tokens
- Focus management on step navigation

## Future Work

- repeating group instances (cardinality 1..n)
- data binding
- validation 
- eCertis API integration (placeholder in `js/ecertis.js`)
- additional languages? (add folders under `i18n/i18n/{lang}/`)

### TODO: CI test gate

Add the unit tests (`npm test`) and e2e tests (`npm run test:e2e`) as a gating
stage in `.gitlab-ci.yml` that must pass before the `pages` deploy job runs.
