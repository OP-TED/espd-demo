# Phase 0 — UI rebuild regression harness

These tests are the **parity oracle** for the model-driven UI rebuild
(see `docs/ui-rebuild-plan.md`). They characterize the CURRENT UI's behaviour so
the rebuild can be proven to preserve it. They assert *what the code does today*
(including quirks), not what it ideally should do — a characterization harness.

Two layers:

## A. Node-level behaviour harness (runs here)

`tests/phase0/*.test.js` — plain `node --test`, no browser. Covers the parts of
the current UI that are testable without a DOM:

- **codelists** — `getCodelist(propertydatatype)` resolution + the shape/content
  of each hard-coded table (`js/codelists.js`).
- **role behaviour** — `visibleParts` / `editableParts` / `exclusionGroundRules`
  per role, and mandatory-criterion logic, from `espd-edm/roles.json`.
- **state / answer store** — set/get answers (keyed by contentpath), inclusion
  state, session/resume, legacy role migration (`js/state.js`).
Run: `npm run test` (the repo's `node --test tests/` script picks these up).

**Scope boundary — export/import are NOT in the Node layer.** `js/xml-export.js`
needs a `fetch`-loaded model (`getModel()` has no injection point) and
`js/xml-import.js` uses `DOMParser`, which is undefined in Node 18 and would need
a DOM library the repo does not depend on. Forcing them into Node would require a
brittle shim. Their behaviour — especially the **export → import round-trip** and
import's known lossiness — is characterized in the E2E layer (B), which has a real
browser DOM. This is deliberate: it keeps the Node layer to code that genuinely
runs in Node, and tests DOM-dependent code where a DOM exists.

## B. End-to-end suite (authored here, run in CI / locally)

`e2e/*.spec.js` — Playwright, drives the real app through a browser:
home → path-selector → wizard, per-role part rendering, conditional show/hide,
codelist options, Part I TED lookup, import→resume, export round-trip, plus
DOM/visual golden snapshots per (role × part).

**These cannot be executed in the current sandbox** (Chromium fails to launch:
`browserType.launch: spawn UNKNOWN`). Run them where a browser can start:

```
npm run test:e2e
```

The golden snapshots are the DOM/visual parity reference the rebuild is diffed
against in Phase 7.
