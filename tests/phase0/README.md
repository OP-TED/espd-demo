# Phase 0 — UI rebuild regression harness

These tests are the **parity oracle** for the model-driven UI rebuild
(see `ui-rebuild-plan.md` in the `espd-notes` repo). They characterize the CURRENT UI's behaviour so
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

### Capturing / updating the golden baseline

The render-golden baseline (`e2e/render-goldens.spec.js-snapshots/`) is captured
and committed. It was taken against the CURRENT UI, **before** the rebuild
changes the DOM, so it is the "before" parity reference. To (re)capture on a
machine where a browser can launch:

```
npm run test:e2e -- --update-snapshots   # regenerate snapshots, then commit them
npm run test:e2e                          # diff against the committed baseline
```

These snapshots are the DOM/visual parity reference the rebuild is diffed against
in Phase 7.

> TODO (tracked): add a CI job that runs `npm run test:e2e` (and manages the
> golden baseline) so capture/verification is automatic rather than manual.

### Characterized current-UI quirks (not bugs to fix in Phase 0)

The round-trip specs assert **what today's hand-rolled path actually does**, not
the ideal. Three behaviours worth calling out, all resolved by the Phase 6
mapping engine (lossless `mapper.mjs`), not here:

- **Import warns over an existing session.** `handleImportFile()` shows a
  `confirm('Importing will replace your current session…')` whenever a session
  with answers exists (and `initState()` restores one from `localStorage` on
  every load). The specs register `page.on('dialog', d => d.accept())` so import
  proceeds — the warning itself is intended behaviour.
- **Part I publication is a mutually-exclusive radio-input-group.** PI01 renders
  three `pub-ref-type` branches (TED number / TED URL / national); only the
  active branch's input is enabled, the rest are `disabled .espd-input-dimmed`.
  Branch 0 (TED number) is active by default. A field in an inactive branch
  cannot be filled until its radio is selected (`selectPubRefBranch`).
- **Import is lossy and partial.** `js/xml-import.js` restores only ~8 Part I/II
  fields by regex/local-name lookup, and some paths do not match the exporter:
  e.g. export writes the buyer country as
  `PostalAddress/Country/IdentificationCode` but import reads
  `CountrySubentityCode`, so country does **not** round-trip; a Response is
  detected as the legacy role id `eo` (then migrated to `sole-tenderer`). The
  round-trip specs therefore assert only fields that genuinely survive today
  (party name, procurement name) and the correct request/response detection.
