// Browser environment wiring for the UBL document composer.
//
// compose-document.mjs is environment-neutral: it takes a `deps` object that
// supplies spec/envelope loading and codelist-attribute expansion. This module
// provides the BROWSER implementation (fetch + a fetched codelist profile),
// mirroring compose-document-node.mjs (fs + the compiler loaders). Everything it
// touches is browser-safe: fetch, globalThis.crypto.randomUUID (via the composer),
// and the pure expand-codelist-attributes string pass.
//
// Model assets are fetched RELATIVE to the page (no leading slash) so the app
// works both at the domain root and under a subpath deployment — the same
// convention js/model.js and js/i18n.js use.

import { composeDocument } from './compose-document.mjs';
import { expandCodelistAttributes } from './expand-codelist-attributes.mjs';
import { resolveSchemeAgency } from './resolve-scheme-agency.mjs';

const MODEL_BASE = 'model';
const PROFILE_PATH = `${MODEL_BASE}/model-sources/registries/codelist-attributes.json`;
const SCHEME_AGENCY_PROFILE_PATH = `${MODEL_BASE}/model-sources/registries/scheme-agency-profile.json`;
const ENVELOPE_PATH = `${MODEL_BASE}/mapping-engine/envelope.json`;

/** Fetch JSON, failing loudly on a non-OK response (the dev server's SPA
 *  fallback returns index.html for a missing path, so we must not accept that). */
async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`fetch ${url} → HTTP ${resp.status}`);
  const type = resp.headers.get('content-type') || '';
  if (!type.includes('json')) {
    throw new Error(`fetch ${url} → unexpected content-type "${type}" (asset missing?)`);
  }
  return resp.json();
}

/**
 * Build the browser deps object. Pre-fetches the envelope + codelist profile +
 * all mapping specs the composer may need (so composeDocument stays synchronous),
 * returning a deps object with synchronous loadSpec/loadEnvelope.
 *
 * @param {string[]} criterionIds the criterion ids whose request/response
 *   fragments to preload (the composer needs the request fragment for every
 *   included criterion, and the response fragment too for a response document).
 * @returns {Promise<object>} deps for composeDocument
 */
export async function browserDeps(criterionIds = []) {
  // The admin sidecars the composer references, by relative path.
  const sidecarRels = [
    'parts/partI/sectionA.mapping.json',
    'parts/partI/sectionB.mapping.json',
    'parts/partI/sectionC.mapping.json',
    'parts/partII/sectionA.mapping.json',
    'parts/partII/sectionB.mapping.json',
    'parts/partVI/sectionA.mapping.json',
  ];
  const criterionRels = [];
  for (const id of criterionIds) {
    criterionRels.push(`generated/xml-mapping/${id}.request.mapping.json`);
    criterionRels.push(`generated/xml-mapping/${id}.response.mapping.json`);
  }

  const [envelope, profile, schemeAgencyProfile, ...specDocs] = await Promise.all([
    fetchJson(ENVELOPE_PATH),
    fetchJson(PROFILE_PATH),
    fetchJson(SCHEME_AGENCY_PROFILE_PATH),
    ...[...sidecarRels, ...criterionRels].map((rel) => fetchJson(`${MODEL_BASE}/${rel}`)),
  ]);

  // Index the fetched specs by their relative path for synchronous loadSpec.
  // Resolve each spec's { fromMap: { profile } } references against the
  // scheme-agency registry once, up front (so loadSpec stays synchronous and the
  // mapping engine only sees inlined { path?, map, default }).
  const specByRel = new Map();
  [...sidecarRels, ...criterionRels].forEach((rel, i) =>
    specByRel.set(rel, resolveSchemeAgency(specDocs[i], schemeAgencyProfile)));

  return {
    loadEnvelope: () => envelope,
    loadSpec: (rel) => {
      const spec = specByRel.get(rel);
      if (!spec) throw new Error(`compose-document-browser: spec not preloaded: ${rel} (add its criterion id to browserDeps)`);
      return spec;
    },
    expandCodelistAttributes: (xml) => expandCodelistAttributes(xml, profile),
  };
}

/**
 * Compose a UBL document in the browser.
 * @param {object} opts composeDocument opts WITHOUT deps:
 *   { instance, documentType, includedIds?, ids?, now? }
 *   `includedIds` doubles as the set of criterion fragments to preload; when
 *   omitted, the criteria present in the instance are used.
 * @returns {Promise<string>} the composed UBL XML
 */
export async function composeInBrowser(opts) {
  // Resolve the criterion set to FRAGMENT FILE ids. An explicit includedIds is
  // already fragment ids (the UI passes member.id). The default — the criteria
  // present in the instance — yields the instance CONTAINER KEYS, which differ
  // from the fragment id for the "OT" family (key "eo-size" → id "ot-eo-size"),
  // so map them through the model index. Passing fragment ids to composeDocument
  // makes it load the right spec; each fragment's own `from` paths then resolve
  // the data from the instance (by the instance key), so answers still flow.
  let includedIds = opts.includedIds;
  if (!includedIds) {
    const index = await fragmentIndex();
    includedIds = criteriaIdsInInstance(opts.instance)
      .map((key) => index.byInstanceKey.get(key) ?? key);
  }
  const deps = await browserDeps(includedIds);
  return composeDocument({ ...opts, includedIds, deps });
}

// ─── UBL import (reverse of the composer) ─────────────────────────────────────

import { unmap } from './mapper.mjs';

/** Deep-merge b into a (arrays/scalars replace); used to assemble the instance. */
function deepMerge(a, b) {
  if (b === undefined) return a;
  if (Array.isArray(b) || typeof b !== 'object' || b === null) return b;
  const out = a && typeof a === 'object' && !Array.isArray(a) ? { ...a } : {};
  for (const [k, v] of Object.entries(b)) out[k] = deepMerge(out[k], v);
  return out;
}

/**
 * Reconstruct the flat instance document from a composed UBL XML string by
 * running the per-criterion fragment specs + admin sidecars in REVERSE
 * (mapper.unmap) against the whole document and deep-merging the slices.
 *
 * @param {string} xml the UBL document
 * @returns {Promise<{ instance: object, documentType: 'request'|'response', criterionIds: string[] }>}
 */
export async function reconstructFromUbl(xml) {
  const documentType = /<QualificationApplicationResponse\b/.test(xml) ? 'response' : 'request';

  // Which criteria are present. Each cac:TenderingCriterion carries its property
  // ids as <tag>_<code>/… (e.g. C01_exg-crim-part/QG1, OT65_OT/QG1), so the prefix
  // IS the inclusion key (`${tag}_${code}`). The fragment FILE id differs from the
  // code for the "OT" criteria (code "OT", id e.g. "ot-eo-size"), so resolve the
  // id via the model index (tag → id).
  const criteria = presentCriteria(xml); // [{ tag, code }]
  const index = await fragmentIndex();   // { byTag, byInstanceKey }
  for (const c of criteria) c.id = index.byTag.get(c.tag) ?? c.code; // code===id for C-criteria
  const criterionIds = [...new Set(criteria.map((c) => c.id))];

  const deps = await browserDeps(criterionIds);
  const fragmentDir = documentType === 'response' ? 'response' : 'request';

  let instance = {};
  // Admin sidecars (reverse): request → Part I; response → Part I + II + VI.
  const sidecarRels = documentType === 'response'
    ? ['parts/partI/sectionA.mapping.json', 'parts/partI/sectionB.mapping.json', 'parts/partI/sectionC.mapping.json',
       'parts/partII/sectionA.mapping.json', 'parts/partII/sectionB.mapping.json', 'parts/partVI/sectionA.mapping.json']
    : ['parts/partI/sectionA.mapping.json', 'parts/partI/sectionB.mapping.json', 'parts/partI/sectionC.mapping.json'];
  for (const rel of sidecarRels) {
    instance = deepMerge(instance, unmap(deps.loadSpec(rel), xml));
  }
  // Per-criterion fragments (reverse).
  for (const id of criterionIds) {
    const spec = deps.loadSpec(`generated/xml-mapping/${id}.${fragmentDir}.mapping.json`);
    instance = deepMerge(instance, unmap(spec, xml));
  }

  return { instance, documentType, criterionIds, criteria };
}

/**
 * The criteria DECLARED in a UBL document, as { tag, id } pairs. Inclusion in an
 * ESPD is encoded by the PRESENCE of a cac:TenderingCriterion, so this is the set
 * the importer restores into the buyer's selection (inclusions) map. tag + id are
 * both read from the criterion's property-group ids (CNN_<id>/…): CNN is the EA
 * tag used in the inclusion key, <id> is the fragment id.
 */
export function presentCriteria(xml) {
  const out = [];
  const seen = new Set();
  for (const block of xml.matchAll(/<cac:TenderingCriterion>[\s\S]*?<\/cac:TenderingCriterion>/g)) {
    // The first property-group id: <tag>_<code>/… — tag is CNN or OTNN, code is
    // the criterion code (lowercase for C-criteria, "OT" for the OT family).
    const m = block[0].match(/>([A-Z]+\d+)_([A-Za-z0-9-]+)\//);
    if (!m) continue;
    const tag = m[1];
    const code = m[2];
    const key = `${tag}_${code}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ tag, code });
  }
  return out;
}

// Cache the model index, fetched once per session.
let _fragmentIndex = null;
/**
 * Resolve a criterion to its FRAGMENT FILE id from the generated part lenses
 * (each criterion member carries { id, tag, code, dataPath }). Two lookups:
 *   - byTag:         EA tag (C01, OT65) → fragment id — used on IMPORT.
 *   - byInstanceKey: the instance container key (the last dataPath segment, e.g.
 *                    "eo-size") → fragment id ("ot-eo-size") — used on EXPORT to
 *                    turn the instance's own keys into the right fragment file.
 * The two differ only for the "OT" family (code "OT", key "eo-size", id
 * "ot-eo-size"); for exclusion/selection criteria all three coincide.
 */
export async function fragmentIndex() {
  if (_fragmentIndex) return _fragmentIndex;
  const index = await fetchJson(`${MODEL_BASE}/generated/ui/index.json`);
  const byTag = new Map();
  const byInstanceKey = new Map();
  await Promise.all((index.parts || []).map(async (entry) => {
    const ref = String(entry.$ref).replace(/^\.\//, '');
    const lens = await fetchJson(`${MODEL_BASE}/generated/ui/${ref}`);
    for (const section of lens.sections || []) {
      for (const member of section.members || []) {
        if (member.kind !== 'criterion') continue;
        if (member.tag) byTag.set(member.tag, member.id);
        const key = (member.dataPath || '').split('.').pop();
        if (key) byInstanceKey.set(key, member.id);
      }
    }
  }));
  _fragmentIndex = { byTag, byInstanceKey };
  return _fragmentIndex;
}

/** The criterion ids present in a flat instance document (any part container). */
export function criteriaIdsInInstance(instance = {}) {
  const containers = [
    ['partII', 'economicOperatorCriteria'],
    ['partIII', 'exclusionGrounds'],
    ['partIV', 'selectionCriteria'],
    ['partV', 'otherCriteria'],
  ];
  const ids = [];
  for (const [part, container] of containers) {
    const bag = instance?.[part]?.[container];
    if (bag && typeof bag === 'object') ids.push(...Object.keys(bag));
  }
  return ids;
}
