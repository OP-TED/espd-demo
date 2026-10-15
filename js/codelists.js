/**
 * Codelists module — loads the generated UI codelist service data
 * (model/generated/codelists/<name>.json) and resolves option labels through
 * i18n. Replaces the former hard-coded propertydatatype→array tables: codelists
 * are now referenced BY NAME from the model (field.codelist), and their codes +
 * label keys come from the shipped ESPD-EDM .gc files via the compiler.
 */

import { t } from './i18n.js';

// Relative so it resolves at the domain root and under a subpath deployment,
// matching how the model bundle itself is fetched.
const CODELISTS_BASE = 'model/generated/codelists';

// Model fields reference codelists by name; a few names in the model use an
// alias of the generated file's canonical name (mirrors the governance aliases).
const ALIASES = {
  EOIDType: 'eoid-type',
  DocRefContentType: 'docrefcontent-type',
  PropertyGroupType: 'property-group-type',
  ResponseDataType: 'response-data-type',
  ProfileExecutionID: 'profile-execution-id',
};

// `procurement-procedure-type` is NOT shipped as a .gc (ESPD-EDM issue #308), so
// the compiler emits no generated list for it. It is still needed by Part I
// Section C's procedureType picker, so we carry the OP authority set inline here
// as a suggested list, with its own i18n keys. The moment a .gc ships, this entry
// goes away and the list is served from model/generated/codelists like the rest.
const UNSHIPPED = {
  'procurement-procedure-type': [
    { code: 'open', labelKey: 'codelist.label.procurement-procedure-type.open' },
    { code: 'restricted', labelKey: 'codelist.label.procurement-procedure-type.restricted' },
    { code: 'neg-w-call', labelKey: 'codelist.label.procurement-procedure-type.neg-w-call' },
    { code: 'comp-dial', labelKey: 'codelist.label.procurement-procedure-type.comp-dial' },
    { code: 'innovation', labelKey: 'codelist.label.procurement-procedure-type.innovation' },
    { code: 'neg-wo-call', labelKey: 'codelist.label.procurement-procedure-type.neg-wo-call' },
    { code: 'comp-tend', labelKey: 'codelist.label.procurement-procedure-type.comp-tend' },
  ],
};

// code -> [{ code, labelKey }], populated lazily by loadCodelists().
const lists = new Map();
let loaded = false;

/** Resolve a model codelist name to its generated file's canonical name. */
function canonical(name) {
  return ALIASES[name] ?? name;
}

/**
 * Load the generated codelist service data (idempotent). Call once at startup
 * before rendering. Fetches each list in the generated index; the unshipped
 * fallbacks are registered too.
 */
export async function loadCodelists() {
  if (loaded) return;
  const indexResp = await fetch(`${CODELISTS_BASE}/index.json`);
  const index = await indexResp.json();

  await Promise.all(
    index.codelists.map(async (entry) => {
      try {
        const resp = await fetch(`${CODELISTS_BASE}/${entry.codelist}.json`);
        const doc = await resp.json();
        lists.set(entry.codelist, doc.codes ?? []);
      } catch (e) {
        console.warn(`Failed to load codelist "${entry.codelist}"`, e);
        lists.set(entry.codelist, []);
      }
    })
  );

  for (const [name, codes] of Object.entries(UNSHIPPED)) {
    if (!lists.has(name)) lists.set(name, codes);
  }
  loaded = true;
}

/**
 * Get a codelist by its model NAME (e.g. 'country', 'docrefcontent-type',
 * 'EOIDType', 'procurement-procedure-type'). Returns an array of
 * `{ code, name }` where `name` is the i18n-resolved English label.
 * Returns [] (with a warning) for an unknown list, so a renderer degrades to an
 * empty picker rather than throwing.
 * @param {string} name
 * @returns {Array<{code: string, name: string}>}
 */
export function getCodelist(name) {
  if (!name) return [];
  const key = canonical(name);
  const codes = lists.get(key);
  if (!codes) {
    console.warn(`Unknown codelist "${name}" (resolved "${key}") — not loaded`);
    return [];
  }
  return codes.map(({ code, labelKey }) => ({ code, name: t(labelKey, code) }));
}

/** Whether a codelist name resolves to a known (loaded) list. */
export function hasCodelist(name) {
  return lists.has(canonical(name));
}
