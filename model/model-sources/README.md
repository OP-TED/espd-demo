# `model-sources/` — this app's own (presentation) inputs

Hand-authored, nothing here is generated. These are the choices **this reference implementation**
makes about how to present the ESPD model. The implementer-neutral model itself (semantic ids, instance
bindings, value types, UBL bindings, roles, hints) is **not** here: it is built upstream and consumed
from `../generated/` (vendored by `npm run model:sync`); see `../README.md`.

## Layout

- `registries/`
  - `form-profile.json` — presentation conventions: `filledBy`, `uiType` defaults per value type, i18n key derivation, group derivation
  - `ui-hints.json` — the closed vocabulary of declarative UI affordances a part form field may carry (e.g. the TED notice lookup)
  - `role-ui.json` — per-role English label/description and which Parts the UI shows (`visibleParts`) and lets the user edit (`editableParts`), keyed by role id from the published `roles.json`
- `criteria/`
  - `<code>.presentation.json` — optional form presentation overrides for one criterion, keyed by the criterion's output key (e.g. `uiType` overrides, option labels, property sub-labels, group names)

The form generator (`../compiler/generate-form-structure.mjs`) combines these with the published compiled
criteria; `../compiler/roles.mjs` joins `role-ui.json` with the published roles registry.

See `../../docs/reference/espd-edm-primary-input-enrichment.md` for the rationale.
