# ESPD Service

A European Single Procurement Document (ESPD) service implementation using plain HTML, CSS, and JavaScript.

## Features

- **Two roles**: Contracting Authority (ESPD Request) and Economic Operator (ESPD Response)
- **Six-part wizard**: Step-by-step form covering all ESPD parts (I–VI)
- **Dynamic rendering**: Form generated from `espd-edm-enhanced.json` data model
- **Conditional logic**: ONTRUE/ONFALSE visibility based on indicator answers
- **Persistent state**: Answers saved to localStorage, restored on reload
- **XML export**: Generate UBL-compliant ESPD Request/Response XML
- **XML import**: Load existing ESPD documents to continue editing
- **i18n ready**: Translation keys resolved from `i18n/` folder (English included)
- **Accessible**: Built on Pico CSS (WCAG AA), semantic HTML, ARIA attributes, keyboard navigation, skip links

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project Structure

```
├── index.html                  # Single page entry point
├── css/
│   └── espd.css                # Custom styles on top of Pico CSS
├── js/
│   ├── app.js                  # Main application, wizard orchestration
│   ├── renderer.js             # Renders JSON model → HTML form elements
│   ├── model.js                # Loads the ESPD-EDM data model
│   ├── state.js                # Form state management + localStorage
│   ├── conditional.js          # ONTRUE/ONFALSE visibility logic
│   ├── validation.js           # Cardinality & datatype validation
│   ├── codelists.js            # Country codes, procedure types, currencies
│   ├── i18n.js                 # Internationalization support
│   ├── xml-export.js           # UBL XML generation
│   ├── xml-import.js           # ESPD XML parsing
│   └── ecertis.js              # eCertis API placeholder
├── i18n/
│   └── i18n/
│       ├── translations.json   # i18n manifest and key conventions
│       └── en/                 # English translations (per-part)
├── espd-edm-enhanced.json      # ESPD-EDM data model (all 6 parts)
└── package.json                # Dev server only (serve)
```

## CSS Framework

Uses [Pico CSS](https://picocss.com/) (CDN) — a minimal, semantic CSS framework with built-in accessibility (WCAG AA compliant), responsive design, and good form styling. No JavaScript dependency, no build step.

## Data Model

The `espd-edm-enhanced.json` file defines:
- **6 parts** with sections, criteria, and question hierarchies
- **Component types**: CRITERION, QUESTION_GROUP, QUESTION_SUBGROUP, QUESTION, REQUIREMENT, LEGISLATION, CAPTION, etc.
- **Property data types**: INDICATOR, DESCRIPTION, DATE, URL, AMOUNT, CODE_COUNTRY, PERCENTAGE, etc.
- **Conditional codes**: ON* (always visible), ONTRUE (show when parent = yes), ONFALSE (show when parent = no)

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
