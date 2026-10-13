// Loader for the codelist governance registry (governance.json).
// The registry is the machine-readable form of docs/codelist-governance.md: the
// four governance axes per codelist. Hand-authored; this module just loads it
// and offers lookups by codelist name (honouring `aliases`).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = path.join(here, 'governance.json');

let _registry = null;

/** The raw parsed registry ({ codelists: { <name>: {axes...} }, ... }). */
export function loadGovernance() {
  if (!_registry) _registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
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

/** True when our JSON Schema should inline this codelist as an enum. */
export function shouldInlineEnum(name) {
  return governanceFor(name)?.inlineEnum === true;
}

/**
 * True when an inlined enum for this list is a SUGGESTION rather than an
 * enforced set — i.e. shipped-but-not-Schematron-validated. Drives the
 * $codelistEnumIsImplementerChoice marker.
 */
export function isImplementerChoice(name) {
  const g = governanceFor(name);
  return !!g && g.inlineEnum === true && g.schematronValidated === false;
}
