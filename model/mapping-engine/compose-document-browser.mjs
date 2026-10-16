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

const MODEL_BASE = 'model';
const PROFILE_PATH = `${MODEL_BASE}/model-sources/registries/codelist-attributes.json`;
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

  const [envelope, profile, ...specDocs] = await Promise.all([
    fetchJson(ENVELOPE_PATH),
    fetchJson(PROFILE_PATH),
    ...[...sidecarRels, ...criterionRels].map((rel) => fetchJson(`${MODEL_BASE}/${rel}`)),
  ]);

  // Index the fetched specs by their relative path for synchronous loadSpec.
  const specByRel = new Map();
  [...sidecarRels, ...criterionRels].forEach((rel, i) => specByRel.set(rel, specDocs[i]));

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
  const ids = opts.includedIds ?? criteriaIdsInInstance(opts.instance);
  const deps = await browserDeps(ids);
  return composeDocument({ ...opts, includedIds: opts.includedIds, deps });
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

  // Which criteria are present: read every cac:TenderingCriterion's
  // cbc:CriterionTypeCode (the criterion CODE). Map code → fragment id. For most
  // criteria id === code; the Part II/V "OT" criteria use code "OT" with distinct
  // ids, so fall back to scanning the first property-group id (CNN_<id>/…).
  const codes = [...xml.matchAll(/<cbc:CriterionTypeCode\b[^>]*>([^<]+)<\/cbc:CriterionTypeCode>/g)]
    .map((m) => m[1].trim());
  // Map each code to a fragment id. We only have the committed fragments; try the
  // code as the id, and for OT criteria resolve via the property-group id prefix.
  const idByCode = await resolveFragmentIds(codes, xml);
  const criterionIds = [...new Set(Object.values(idByCode).filter(Boolean))];

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

  return { instance, documentType, criterionIds };
}

/**
 * Resolve criterion CODES (from cbc:CriterionTypeCode) to fragment IDS. For the
 * normal case code === id. For the "OT" criteria (code "OT", shared), the
 * fragment id is encoded in the property-group ids (CNN_<id>/…) carried in the
 * same TenderingCriterion block, so read it from there.
 */
async function resolveFragmentIds(codes, xml) {
  const map = {};
  for (const code of codes) {
    if (code && code !== 'OT') { map[code] = code; continue; }
  }
  // OT criteria: scan each TenderingCriterion block whose CriterionTypeCode is OT
  // and pull the id from the first group id (…>CNN_<id>/QG… or /RG…).
  if (codes.includes('OT')) {
    for (const block of xml.matchAll(/<cac:TenderingCriterion>[\s\S]*?<\/cac:TenderingCriterion>/g)) {
      const b = block[0];
      if (!/<cbc:CriterionTypeCode\b[^>]*>OT<\/cbc:CriterionTypeCode>/.test(b)) continue;
      const g = b.match(/>C\d+_([a-z0-9-]+)\/[QR]G/);
      if (g) map[`OT:${g[1]}`] = g[1];
    }
  }
  return map;
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
