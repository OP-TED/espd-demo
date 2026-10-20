// Phase 6B-2 — UBL document composer.
//
// Assembles ONE valid UBL ESPD Request/Response XML string from the flat
// instance document ({ partI … partVI }). The per-criterion mapping fragments
// (model/generated/xml-mapping/<id>.{request,response}.mapping.json) and the
// hand-authored administrative sidecars (model/parts/<part>/section*.mapping.json)
// each map only their own slice; this module:
//   1. synthesizes the mandatory envelope header (envelope.json) — the fixed /
//      generated scalars (UBLVersionID … VersionID) that NO sidecar emits;
//   2. runs every relevant fragment/sidecar through the mapping engine's
//      buildTree() and LIFTS the produced top-level elements;
//   3. emits them under ONE document root in the fixed UBL element order;
//   4. expands the shorthand codelist attributes to the full Schematron sets.
//
// Dependency-free and browser-safe except for the codelist-attribute expansion
// (a pure string pass) and buildTree (plain objects). The only environment call
// is crypto.randomUUID() for per-document ids, available in Node 18+ and modern
// browsers; callers may inject uuid/documentId/now for determinism.
//
// Fragment specs are LOADED from the committed JSON (not regenerated) so this
// module needs no compiler at runtime — it is ready to run in the browser (6B-3).

import { buildTree, serialize } from './mapper.mjs';

// ---- Canonical UBL top-level element order (from the BASE samples) ----------
// Everything the composer emits as a direct child of the document root, in the
// order UBL requires. Elements absent for a given document simply don't appear.
// Order is the UBL XSD element sequence for QualificationApplication{Request,
// Response}Type (common/xsdrt/maindoc/UBL-QualificationApplication*-2.4.xsd).
// NB: cac:AdditionalDocumentReference comes AFTER the criteria (not in the
// header), cac:Evidence + cac:Signature are last, and cac:EconomicOperatorParty
// appears only in the Response (mandatory there, absent from the Request).
const TOP_LEVEL_ORDER = [
  'cbc:UBLVersionID',
  'cbc:ProfileExecutionID',
  'cbc:ID',
  'cbc:CopyIndicator',
  'cbc:UUID',
  'cbc:ContractFolderID',
  'cbc:ContractName',
  'cbc:IssueDate',
  'cbc:IssueTime',
  'cbc:VersionID',
  'cbc:ProcedureCode',
  'cac:ContractingParty',            // Part I §B
  'cac:EconomicOperatorParty',       // Part II §A/§B (response only)
  'cac:ProcurementProject',          // Part I §C
  'cac:ProcurementProjectLot',       // Part I §C (repeated)
  'cac:TenderingCriterion',          // criterion declarations (repeated)
  'cac:TenderingCriterionResponse',  // criterion answers (response, repeated)
  'cac:AdditionalDocumentReference', // Part I §A publication (after criteria per XSD)
  'cac:Evidence',                    // shared evidence record set (response)
  'cac:Signature',                   // Part VI §A (response)
];

// Admin sidecars that contribute to each document kind, in no particular order
// (the composer reorders by TOP_LEVEL_ORDER). Paths relative to the model root.
const REQUEST_SIDECARS = [
  'parts/partI/sectionA.mapping.json',
  'parts/partI/sectionB.mapping.json',
  'parts/partI/sectionC.mapping.json',
];
const RESPONSE_SIDECARS = [
  'parts/partI/sectionA.mapping.json',
  'parts/partI/sectionB.mapping.json',
  'parts/partI/sectionC.mapping.json',
  'parts/partII/sectionA.mapping.json',
  'parts/partII/sectionB.mapping.json',
  'parts/partVI/sectionA.mapping.json',
];

// Instance container key per criterion-bearing part.
const CRITERION_CONTAINERS = [
  ['partII', 'economicOperatorCriteria'],
  ['partIII', 'exclusionGrounds'],
  ['partIV', 'selectionCriteria'],
  ['partV', 'otherCriteria'],
];

// ---- Pluggable spec/loader + id/clock providers -----------------------------
// The composer is pure given its deps; Node and the browser inject different
// loaders (fs read vs. fetch) and may inject fixed ids/clock for determinism.

/** Default UUID provider: crypto.randomUUID (Node 18+ / modern browsers). */
function defaultUuid() {
  return globalThis.crypto.randomUUID();
}

/** A UBL IssueTime like "16:42:45+02:00" from a Date, in the local offset. */
function toIssueTime(date) {
  const p = (n) => String(n).padStart(2, '0');
  const off = -date.getTimezoneOffset(); // minutes east of UTC
  const sign = off >= 0 ? '+' : '-';
  const abs = Math.abs(off);
  return `${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}` +
    `${sign}${p(Math.floor(abs / 60))}:${p(abs % 60)}`;
}

/** A UBL IssueDate "YYYY-MM-DD" from a Date (local). */
function toIssueDate(date) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

// ---- Tree helpers (operate on mapper.mjs's intermediate node shape) ----------

function makeNode(name) {
  return { name, attributes: {}, children: [], text: undefined };
}

/** Resolve a dotted path against the instance (undefined if any step missing). */
function resolvePath(data, dottedPath) {
  return dottedPath.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), data);
}

/**
 * Resolve a value|{from,const} descriptor (envelope attribute values): a plain
 * string is a constant; { from, const } reads the instance, falling back to the
 * constant. Returns undefined when neither yields a non-empty value.
 */
function resolveValue(desc, instance) {
  if (desc == null) return undefined;
  if (typeof desc === 'string') return desc;
  if (typeof desc === 'object') {
    if (desc.from !== undefined) {
      const v = resolvePath(instance, desc.from);
      if (v !== undefined && v !== null && v !== '') return String(v);
    }
    if (desc.const !== undefined) return String(desc.const);
  }
  return undefined;
}

/** Build one envelope header node from its descriptor + the resolved generated values. */
function buildHeaderNode(entry, instance, generated) {
  const node = makeNode(entry.element);
  // Element text: generated | from(instance)->const fallback | const.
  let text;
  if (entry.generated) {
    text = generated[entry.generated];
  } else {
    text = resolveValue({ from: entry.from, const: entry.const }, instance);
  }
  if (text !== undefined && text !== null && text !== '') node.text = String(text);
  for (const [name, valueDesc] of Object.entries(entry.attributes || {})) {
    const v = resolveValue(valueDesc, instance);
    if (v !== undefined && v !== null && v !== '') node.attributes[name] = v;
  }
  return node;
}

/**
 * Which criterion ids are present in the instance (answered or carried). Returns
 * [{ id, part, container }] in the instance's own key order per part.
 */
export function criteriaInInstance(instance) {
  const out = [];
  for (const [part, container] of CRITERION_CONTAINERS) {
    const bag = instance?.[part]?.[container];
    if (bag && typeof bag === 'object') {
      for (const id of Object.keys(bag)) out.push({ id, part, container });
    }
  }
  return out;
}

/**
 * The ordered list of criterion ids to EMIT.
 *   - request: the buyer's selection (inclusions true) ∪ anything in the
 *     instance; when no inclusions are given, falls back to the instance.
 *   - response: the answered criteria (present in the instance).
 * `includedIds` (optional) overrides selection explicitly (e.g. mandatory ∪
 * checked, computed by the caller from the role rules + inclusion map).
 */
function selectCriteria({ instance, includedIds }) {
  const present = criteriaInInstance(instance);
  if (!includedIds) return present;
  const wanted = new Set(includedIds);
  // Preserve instance order, keep only wanted, and append wanted-but-absent so a
  // selected-yet-unanswered criterion (request) still emits its declaration.
  const byId = new Map(present.map((c) => [c.id, c]));
  const ordered = present.filter((c) => wanted.has(c.id));
  for (const id of includedIds) {
    if (!byId.has(id)) ordered.push({ id, part: null, container: null });
  }
  return ordered;
}

// ---- Lot synthesis (BR-LOT-40/41 request, BR-LOT-10 response) ----------------

const DEFAULT_LOT_ID = 'LOT-0000';

/** A cac:ProcurementProjectLot node wrapping one cbc:ID with the criterion scheme. */
function lotNode(lotId) {
  const lot = makeNode('cac:ProcurementProjectLot');
  const id = makeNode('cbc:ID');
  id.attributes = { schemeID: 'criterion' };
  id.text = lotId;
  lot.children.push(id);
  return lot;
}

/** A cac:ProcurementProjectLotReference node (criterion-scoped lot reference). */
function lotReferenceNode(lotId) {
  const ref = makeNode('cac:ProcurementProjectLotReference');
  const id = makeNode('cbc:ID');
  id.attributes = { schemeID: 'criterion' };
  id.text = lotId;
  ref.children.push(id);
  return ref;
}

/**
 * Insert a lot reference into a criterion node after cbc:Description (before the
 * SubTenderingCriterion / property groups), matching the generated fragment
 * order and the BASE sample. Only when the criterion has no reference yet.
 */
function ensureLotReference(criterionNode, lotId) {
  if (criterionNode.children.some((c) => c.name === 'cac:ProcurementProjectLotReference')) return;
  const descIdx = criterionNode.children.findIndex((c) => c.name === 'cbc:Description');
  const at = descIdx >= 0 ? descIdx + 1 : criterionNode.children.length;
  criterionNode.children.splice(at, 0, lotReferenceNode(lotId));
}

/**
 * REQUEST lots (BR-LOT-41 / BR-LOT-40). When the procedure is not divided into
 * lots (the buyer declared none, so sectionC emitted no cac:ProcurementProjectLot)
 * BUT selection criteria are present, a single implicit lot LOT-0000 is
 * synthesized: one document-level cac:ProcurementProjectLot plus a reference on
 * every selection criterion that lacks one (BR-LOT-41 requires >=1 on each). An
 * exclusion-only Request (no selection criteria) gets no lot and no reference, so
 * BR-LOT-40 (exclusion grounds carry none) still holds.
 */
function synthesizeRequestLots(buckets, selectionCriterionNodes, push) {
  if (selectionCriterionNodes.length === 0) return;        // exclusion-only: no lots
  if ((buckets.get('cac:ProcurementProjectLot') || []).length > 0) return; // lots declared
  push(lotNode(DEFAULT_LOT_ID));
  for (const node of selectionCriterionNodes) ensureLotReference(node, DEFAULT_LOT_ID);
}

/**
 * RESPONSE lot (BR-LOT-10). The EO must specify EXACTLY ONE lot it tenders for.
 * sectionC's mapping lifts every declared lot (partI.lots) as a
 * cac:ProcurementProjectLot, which would emit N lots on a response built from a
 * multi-lot Request; replace that bucket with the single lot the EO chose
 * (partII.economicOperator.lot), falling back to the first declared lot, then
 * LOT-0000, so the document always carries exactly one.
 */
function applyResponseSingleLot(buckets, instance) {
  const chosen = instance?.partII?.economicOperator?.lot;
  const declared = Array.isArray(instance?.partI?.lots) ? instance.partI.lots : [];
  const lotId = (chosen && String(chosen)) || declared[0] || DEFAULT_LOT_ID;
  buckets.set('cac:ProcurementProjectLot', [lotNode(lotId)]);
}

// ---- Composition ------------------------------------------------------------

/**
 * Compose a complete UBL document.
 *
 * @param {object}   opts
 * @param {object}   opts.instance        the flat instance document
 * @param {'request'|'response'} opts.documentType
 * @param {object}   opts.deps            injected environment:
 *   - loadSpec(relPath) -> spec object (fragment/sidecar JSON)
 *   - loadEnvelope() -> envelope.json object
 *   - expandCodelistAttributes(xml) -> xml   (bound to a loaded profile)
 * @param {string[]} [opts.includedIds]   explicit criterion selection (optional)
 * @param {object}   [opts.ids]           { uuid, documentId } overrides (determinism)
 * @param {Date}     [opts.now]           clock override (determinism)
 * @returns {string} the composed, attribute-expanded UBL XML string
 */
export function composeDocument({ instance = {}, documentType, deps, includedIds, ids = {}, now } = {}) {
  if (documentType !== 'request' && documentType !== 'response') {
    throw new Error(`composeDocument: documentType must be 'request' or 'response', got ${documentType}`);
  }
  if (!deps || typeof deps.loadSpec !== 'function' || typeof deps.loadEnvelope !== 'function' ||
      typeof deps.expandCodelistAttributes !== 'function') {
    throw new Error('composeDocument: deps.{loadSpec, loadEnvelope, expandCodelistAttributes} are required');
  }

  const envelope = deps.loadEnvelope();
  const envRoot = envelope[documentType];
  const clock = now instanceof Date ? now : new Date();
  const generated = {
    documentId: ids.documentId ?? `ESPDREQ-DGPE-${ids.uuid ?? defaultUuid()}`,
    uuid: ids.uuid ?? defaultUuid(),
    issueDate: toIssueDate(clock),
    issueTime: toIssueTime(clock),
  };

  // Collect every top-level element the document will carry, bucketed by name.
  const buckets = new Map(); // elementName -> node[]
  const push = (node) => {
    if (!buckets.has(node.name)) buckets.set(node.name, []);
    buckets.get(node.name).push(node);
  };

  // 1. Envelope header scalars. These are SINGLETONS and authoritative: the
  //    envelope owns the fixed/generated header elements (incl. ContractFolderID,
  //    which it synthesizes from the instance with the mandatory @schemeAgencyID
  //    and a fallback). An admin sidecar that also maps the same element (Part I
  //    §C maps fileReference -> cbc:ContractFolderID) must NOT emit a second copy;
  //    `envelopeOwned` records these names so the sidecar lift below skips them.
  const envelopeOwned = new Set();
  for (const entry of envelope.header) {
    envelopeOwned.add(entry.element);
    push(buildHeaderNode(entry, instance, generated));
  }

  // 2. Administrative sidecars → lift their produced top-level elements.
  const sidecars = documentType === 'request' ? REQUEST_SIDECARS : RESPONSE_SIDECARS;
  for (const rel of sidecars) {
    const spec = deps.loadSpec(rel);
    const tree = buildTree(spec, instance);
    for (const child of tree.children) {
      if (envelopeOwned.has(child.name)) continue; // envelope already synthesized it
      push(child);
    }
  }

  // 3. Criteria → one TenderingCriterion per selected criterion (always from the
  //    REQUEST fragment, which carries the full declaration). For a response,
  //    additionally lift the answers (TenderingCriterionResponse) and the shared
  //    Evidence set from the response fragment.
  const criteria = selectCriteria({ instance, includedIds });
  const selectionCriterionNodes = []; // Part IV declaration nodes, for lot-synthesis
  for (const { id, part } of criteria) {
    const requestSpec = deps.loadSpec(`generated/xml-mapping/${id}.request.mapping.json`);
    const reqTree = buildTree(requestSpec, instance);
    for (const child of reqTree.children) {
      if (child.name === 'cac:TenderingCriterion') {
        push(child);
        if (part === 'partIV') selectionCriterionNodes.push(child);
      }
    }
    if (documentType === 'response') {
      const responseSpec = deps.loadSpec(`generated/xml-mapping/${id}.response.mapping.json`);
      const resTree = buildTree(responseSpec, instance);
      for (const child of resTree.children) {
        // Drop the response fragment's 3-element TenderingCriterion STUB — the
        // full declaration already came from the request fragment above.
        if (child.name === 'cac:TenderingCriterion') continue;
        push(child);
      }
    }
  }

  // 3b. Lot handling (BR-LOT-40/41, BR-LOT-10).
  if (documentType === 'request') {
    synthesizeRequestLots(buckets, selectionCriterionNodes, push);
  } else {
    applyResponseSingleLot(buckets, instance);
  }

  // 4. Assemble the root in canonical UBL order.
  const root = makeNode(envRoot.root);
  root.attributes = { ...envRoot.rootAttributes };
  for (const name of TOP_LEVEL_ORDER) {
    for (const node of buckets.get(name) || []) root.children.push(node);
    buckets.delete(name);
  }
  // Any element not in the canonical order (should be none) is appended last, so
  // nothing is silently dropped.
  for (const [, nodes] of buckets) for (const node of nodes) root.children.push(node);

  // 5. Serialize + expand shorthand codelist attributes to the full sets.
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + serialize(root);
  return deps.expandCodelistAttributes(xml);
}
