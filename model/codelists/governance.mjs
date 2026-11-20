// Loader for the codelist governance, merged from its two sources:
//
//   model/generated/registries/codelist-governance.json   the implementer-neutral facts, PUBLISHED
//       by ESPD-EDM and vendored by `npm run model:sync`: gc, aliases, schematronValidated,
//       inlineEnum, excludedCodes, externalSource.
//   model/codelists/ui-codelists.json                      this app's own decision: useForUI.
//
// The merged entry keeps the shape the rest of the app has always used, with `shipped`
// derived (a list is shipped when the registry names its .gc file):
//   { shipped, schematronValidated, useForUI, inlineEnum, gc?, aliases?, excludedCodes?, externalSource? }
// The merge is strict: every published list needs an explicit UI decision and vice versa, so a list
// added upstream cannot silently get a default.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from '../compiler/published-model.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const UI_PATH = path.join(here, 'ui-codelists.json');

let _registry = null;

/**
 * Merge the published neutral registry with the app's UI decisions (pure; no I/O).
 * Throws if the two do not list exactly the same codelists.
 */
export function mergeGovernance(neutral, ui) {
  const missing = Object.keys(neutral.codelists).filter((n) => !(n in ui.codelists));
  const unknown = Object.keys(ui.codelists).filter((n) => !(n in neutral.codelists));
  if (missing.length || unknown.length) {
    throw new Error(
      'model/codelists/ui-codelists.json is out of step with the published codelist-governance registry' +
      (missing.length ? `\n  no UI decision for: ${missing.join(', ')}` : '') +
      (unknown.length ? `\n  not in the published registry: ${unknown.join(', ')}` : ''));
  }
  const codelists = {};
  for (const [name, entry] of Object.entries(neutral.codelists)) {
    codelists[name] = { ...entry, shipped: Boolean(entry.gc), useForUI: ui.codelists[name].useForUI };
  }
  return { ...neutral, codelists };
}

/** The merged registry ({ codelists: { <name>: {axes...} }, ... }). */
export function loadGovernance() {
  if (!_registry) {
    _registry = mergeGovernance(loadRegistry('codelist-governance'), JSON.parse(fs.readFileSync(UI_PATH, 'utf8')));
  }
  return _registry;
}

/** Build a name->entry index, including declared aliases, case-insensitive. */
function index() {
  const { codelists } = loadGovernance();
  const idx = new Map();
  for (const [name, entry] of Object.entries(codelists)) {
    const withName = { name, ...entry };
    idx.set(name.toLowerCase(), withName);
    for (const alias of entry.aliases ?? []) idx.set(alias.toLowerCase(), withName);
  }
  return idx;
}

/** Governance entry for a codelist NAME (or alias), or undefined if unknown. */
export function governanceFor(name) {
  if (!name) return undefined;
  return index().get(String(name).toLowerCase());
}

/** True when the published instance-data schemas inline this codelist as an enum. */
export function shouldInlineEnum(name) {
  return governanceFor(name)?.inlineEnum === true;
}

/**
 * True when an inlined enum for this list is a SUGGESTION rather than an
 * enforced set — i.e. shipped-but-not-Schematron-validated.
 */
export function isImplementerChoice(name) {
  const g = governanceFor(name);
  return !!g && g.inlineEnum === true && g.schematronValidated === false;
}
