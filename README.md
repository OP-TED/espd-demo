# ESPD-EDM Reference Implementation

A European Single Procurement Document (ESPD) service implementation using plain HTML, CSS, and JavaScript.

## Features

- **Two roles**: Contracting Authority (ESPD Request) and Economic Operator (ESPD Response)
- **Six-part wizard**: Step-by-step form covering all ESPD parts (I–VI)
- **Dynamic rendering**: Form generated from the compiled UI model bundle under `model/generated/ui/` (loaded via `index.json`)
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

1. Copies the browser-served assets (`index.html`, `css/`, `js/`, `i18n/`,
   `images/`, `fonts/`) and the runtime model data the browser actually loads
   (`model/generated/ui/`, `model/generated/codelists/`,
   `model/generated/xml-mapping/`, `model/mapping-engine/`, `model/parts/`, plus
   the two registry files the composer fetches) into a `public/` directory.
   Dev-only model artifacts (the Node compiler, `*.test.mjs`, source registries,
   EA inputs) are **not** shipped.
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
│   ├── home.js                 # Landing / role-selection screen
│   ├── features.js             # Feature-flag resolution (serverless mode)
│   ├── runtime-config.js       # Sets window.__ESPD_SERVERLESS__ (build-time flag)
│   ├── renderer.js             # Renders the model lens → HTML form elements
│   ├── model.js                # Loads the compiled UI model bundle (model/generated/ui/)
│   ├── state.js                # Form state management + localStorage
│   ├── conditional.js          # ONTRUE/ONFALSE visibility logic
│   ├── validation.js           # Cardinality & datatype validation
│   ├── codelists.js            # Country codes, procedure types, currencies
│   ├── path-selector.js        # Request/response document path selection
│   ├── site-header.js          # Shared site header
│   ├── wizard-header.js        # Wizard step header / navigation
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
│       └── en/                 # English translations (per-part + roles/codelists)
├── model/                       # ESPD-EDM model subsystem (see model/README.md)
│   ├── compiler/               # Compiles the EA export + enrichment → generated/
│   ├── model-sources/          # Hand-authored compiler inputs (registries + sidecars)
│   ├── generated/              # Committed compiler output
│   │   └── ui/                 #   The UI bundle the app loads: index.json,
│   │                           #   part-I…VI.json, roles.json, schema/, validators/
│   ├── mapping-engine/         # Bidirectional UBL map/unmap engine (runtime)
│   ├── parts/                  # Hand-authored admin parts (I, II, VI) mapping sidecars
│   └── legacy/                 # Pre-compiler parity references (see model/legacy/README.md)
├── .gitlab-ci.yml              # GitLab Pages deployment pipeline
└── package.json                # Scripts: dev, build:pages, model:compile, model:test, test, test:e2e
```

## CSS Framework

Uses [Pico CSS](https://picocss.com/) (CDN) — a minimal, semantic CSS framework with built-in accessibility (WCAG AA compliant), responsive design, and good form styling. No JavaScript dependency, no build step.

## Data Model

The data model lives under [`model/`](./model/). The compiler turns the EA
export (`espd-edm.json`) plus hand-authored enrichment into a committed UI
bundle under [`model/generated/ui/`](./model/generated/ui/), which the app loads
at runtime (`js/model.js`):

- `index.json` — manifest linking the per-part lenses and the role lens
- `part-I.json` … `part-VI.json` — one lens per ESPD part (I–VI)
- `roles.json` — buyer/EO role behaviour (which criteria apply, mandatoriness)
- `schema/`, `validators/` — JSON Schemas and a standalone Ajv validator

The model describes:
- **6 parts** with sections, criteria, and question hierarchies
- **Component types**: CRITERION, QUESTION_GROUP, QUESTION_SUBGROUP, QUESTION, REQUIREMENT, LEGISLATION, CAPTION, etc.
- **Property data types**: INDICATOR, DESCRIPTION, DATE, URL, AMOUNT, CODE_COUNTRY, PERCENTAGE, etc.
- **Conditional codes**: ON* (always visible), ONTRUE (show when parent = yes), ONFALSE (show when parent = no)

See the [model README](./model/README.md) for the full compiler pipeline and the
ownership rules for where each piece of the model is authored.

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

### TODO: move exclusion-ground mandatoriness into ESPD-EDM

`model/generated/ui/roles.json` currently encodes, per buyer role, which Part III
exclusion-ground categories are mandatory vs. optional
(`formBehavior.exclusionGroundRules`). This reflects real legal distinctions —
e.g. under Article 57(1)/(2) of Directive 2014/24/EU, criminal-conviction and
tax/social-security-payment exclusion grounds are mandatory for a Contracting
Authority, while Article 80(1) of Directive 2014/25/EU makes this conditional
for a Contracting Entity.

This is currently reference-implementation-only logic, disconnected from the
authoritative ESPD-EDM data model (`espd-tools/EAtoJSON/outputs/espd-edm.json`
and its downstream consumers), which has no concept of roles or
mandatory/optional criteria at all — it's a flat, role-agnostic list of
criteria. As a result this rule lives only in this app and had already
silently regressed once (CA's `criminal`/`payment` were accidentally flattened
to `optional` in a prior commit unrelated to this logic).

The encoding of role-based mandatoriness should be moved upstream into
ESPD-EDM itself, so it's defined once, authoritatively, and shared by all
implementations rather than reinvented (and potentially drifting) in each.
