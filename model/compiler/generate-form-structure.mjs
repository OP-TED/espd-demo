// Tasks 5.1 + 5.2 — form-structure (presentation lens) generator.
//
// Walks the compiled criterion and emits the per-part form lens:
//   - `filledBy` derived from leaf kind             (R6.2, via the form profile)
//   - `visibleWhen` derived from condition markers  (R6.3)
//   - `codelist` derived from the value-type registry shape (R6.4)
//   - `required` / `repeatable` derived from EA cardinality
//   - `uiType` from the profile's default table keyed by value type, overridable
//     per Semantic_ID in the presentation sidecar (R6.5, R10.1–R10.3)
//   - `labelKey` / criterion `nameKey`+`descriptionKey` derived from the
//     requestpath, matching the shipped i18n catalogue (R6.6)
//
// The lens references the instance-data model by dotted `dataPath` and carries
// NO XML/serialization concerns and no re-declaration of the data shape.
//
// R6.7: a value type with no default uiType and no sidecar override fails the
// build, naming the component's Semantic_ID.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leafInstancePath, arrayContainerDepths } from './encoding-profile.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

export function loadFormProfile(profilePath = path.join(here, '..', 'model-sources', 'registries', 'form-profile.json')) {
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

/** Load a criterion's presentation sidecar (optional — absent means no overrides). */
export function loadPresentation(code, dir = path.join(here, '..', 'model-sources', 'criteria')) {
  const p = path.join(dir, `${code}.presentation.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/**
 * The i18n STABLE ID for a criterion. The shipped catalogue (and js/i18n.js
 * getStableId) key criterion names/descriptions/labels by the criterion CODE,
 * except for the "OT" family: those several criteria all share code "OT", so
 * they are disambiguated by their EA TAG (OT65, OT63, …). Keying by the bare
 * "OT" would collapse them onto one non-existent key and the UI would fall back
 * to the raw code / dataPath (the untranslated-label bug). Mirror the runtime
 * convention here so the generated keys match the catalogue.
 */
function stableIdOf(criterion) {
  return criterion.code === 'OT' ? criterion.tag : criterion.code;
}

/**
 * i18n label key for a leaf (R6.6). The shipped catalogue is keyed by
 * '<kind>.label.<stableId>.<EA tag path>' — the requestpath with its leading
 * 'C31_<code>' segment replaced by the criterion stable id (code, or the tag
 * for the shared-code "OT" family).
 */
function labelKeyOf(criterion, leaf, profile) {
  const prefix = profile.i18n.labelKeyPrefixByNodeKind[leaf.nodeKind];
  if (!prefix) return undefined;
  const segs = leaf.requestpath.split('/');
  segs[0] = stableIdOf(criterion);
  return `${prefix}.${segs.join('.')}`;
}

/**
 * Resolve a field's uiType (R6.5, R10.2). Order: sidecar override by Semantic_ID
 * (optionally per property), then the profile default for the value type (per
 * property for object shapes). Throws per R6.7 when neither supplies one.
 */
function uiTypeOf({ leaf, suffix, profile, presentation }) {
  const prop = suffix[0];
  const override = presentation?.uiTypeOverrides?.[leaf.id];
  if (override !== undefined) {
    const resolved = typeof override === 'object' ? override[prop] : override;
    if (resolved) return resolved;
  }

  const def = profile.uiType.byValueType[leaf.valueType];
  if (def === undefined) {
    throw new Error(
      `No uiType for value type ${leaf.valueType} (component ${leaf.id}). ` +
      `Add a default to form-profile.json uiType.byValueType, or an override to ` +
      `the presentation sidecar keyed by '${leaf.id}'.`);
  }
  if (typeof def === 'string') return def;

  const resolved = def[prop];
  if (!resolved) {
    throw new Error(
      `No uiType for property '${prop}' of value type ${leaf.valueType} ` +
      `(component ${leaf.id}). Add it to form-profile.json uiType.byValueType.${leaf.valueType}, ` +
      `or override it in the presentation sidecar keyed by '${leaf.id}'.`);
  }
  return resolved;
}

/** Cardinality -> required at parent (1 or 1..n => required). */
function isRequiredCardinality(card) {
  return typeof card === 'string' && /^1(\.\.|$)/.test(card);
}

/** Cardinality -> repeatable (upper bound > 1). */
function isRepeatableCardinality(card) {
  if (typeof card !== 'string') return false;
  const m = /^\d+\.\.(\d+|n)$/.exec(card);
  return !!m && (m[1] === 'n' || Number(m[1]) > 1);
}

/**
 * The codelist a value type's shape declares (R6.4). The registry marks code
 * values with `codeList` either on the shape itself or on a scalar property of
 * an object shape (e.g. MINIMUM_AMOUNT.currency).
 */
function codelistsOfShape(shape, prefix = []) {
  const found = [];
  if (!shape || typeof shape !== 'object') return found;
  if (shape.codeList) found.push({ path: prefix, codelist: shape.codeList });
  for (const [name, sub] of Object.entries(shape.properties ?? {})) {
    found.push(...codelistsOfShape(sub, [...prefix, name]));
  }
  if (shape.items) found.push(...codelistsOfShape(shape.items, prefix));
  return found;
}

/**
 * Walk the criterion collecting value leaves with the presentation context the
 * lens needs: the nearest conditional gate (for visibleWhen) and the chain of
 * group nodes (for grouping).
 *
 * The gate of a conditional group is its nearest PRECEDING SIBLING value leaf —
 * the same rule generate-instance-schema.mjs uses to derive if/then/else, so the
 * form visibility and the schema conditionals cannot drift apart.
 */
function leavesWithContext(criterion) {
  const out = [];

  function walk(node, groupChain, gate) {
    const kids = node.children ?? [];
    let lastLeaf = null;

    for (const child of kids) {
      if (child.nodeKind === 'requirement' || child.nodeKind === 'question') {
        out.push({ leaf: child, groupChain, gate });
        lastLeaf = child;
        continue;
      }
      // A caption (structural, no value) is surfaced as a non-input note (F1),
      // in document order within its group and gated by the same branch its
      // sibling leaves are. It does not act as a conditional gate itself.
      if (child.nodeKind === 'structural' && child.caption) {
        out.push({ caption: child, groupChain, gate });
        continue;
      }
      if (child.nodeKind === 'group') {
        const conditional = child.condition === 'true' || child.condition === 'false';
        // A conditional group is gated by the nearest preceding sibling leaf;
        // an unconditional group inherits whatever gate its parent carried.
        const childGate = conditional && lastLeaf
          ? { leaf: lastLeaf, condition: child.condition }
          : gate;
        walk(child, [...groupChain, child], childGate);
        continue;
      }
      // structural containers (LOT_REFERENCE, SUBCRITERION, LEGISLATION, ...)
      walk(child, groupChain, gate);
    }
  }

  walk(criterion, [], null);
  return out;
}

/** Dotted instance path of a leaf, with `[]` on array-shaped leaves. */
function dataPathOf(criterion, leaf, registry, suffix = []) {
  const baseLen = criterion.instanceModel.containerPath.length + 2; // container + key + side
  // 7.0: 1-based binding-path depths that open an array; shifted by baseLen to
  // index into the full instance path. Several for nested repeatable groups.
  const arrayAt = new Set(arrayContainerDepths(criterion, leaf).map(d => baseLen + d - 1));
  const segs = leafInstancePath(criterion, leaf).map((s, i) => (arrayAt.has(i) ? `${s}[]` : s));
  const shape = registry.valueTypes[leaf.valueType]?.instanceShape;
  const base = segs.join('.');
  const arrayMarker = shape?.type === 'array' ? '[]' : ''; // leaf-level array (e.g. evidence)
  return suffix.length ? `${base}${arrayMarker}.${suffix.join('.')}` : `${base}${arrayMarker}`;
}

/** Build the visibleWhen rule for a gated leaf (R6.3). */
function visibleWhenOf(criterion, gate, registry, profile) {
  if (!gate) return undefined;
  return {
    path: dataPathOf(criterion, gate.leaf, registry),
    equals: profile.visibleWhen.equalsByCondition[gate.condition],
  };
}

/** Find a value leaf by semantic ID. */
function leafBySemanticId(criterion, id) {
  let found;
  (function walk(n) { for (const c of n.children ?? []) { if (c.id === id) found = c; walk(c); } })(criterion);
  return found;
}

/**
 * Enum-selector branch visibility (e.g. C36). If the leaf's binding sits under a
 * branch declared in `criterion.branchSelectors`, return a value-equality
 * visibleWhen against the selector leaf — "show this branch when the type
 * selector equals <branch value>". This gating is the OUTERMOST for the branch
 * and takes precedence over any inner boolean gate (an inner gate lives inside
 * an already-hidden branch). Returns undefined when the leaf is not in a branch.
 */
function branchVisibleWhenOf(criterion, leaf, registry) {
  const sel = criterion.branchSelectors;
  if (!sel) return undefined;
  const head = leaf.instanceBinding?.path?.[0];
  if (head === undefined || !(head in (sel.branches ?? {}))) return undefined;
  if (leaf.id === sel.selector) return undefined; // the selector itself is not gated
  const selectorLeaf = leafBySemanticId(criterion, sel.selector);
  if (!selectorLeaf) throw new Error(`branchSelectors.selector '${sel.selector}' not found in '${criterion.code}'`);
  return { path: dataPathOf(criterion, selectorLeaf, registry), equals: sel.branches[head] };
}

/**
 * Emit the form field(s) for one leaf. A leaf whose value type is an object or
 * an array of objects becomes one field PER scalar property, matching the
 * hand-authored lens (a PERIOD renders as two date inputs, an AMOUNT as a value
 * plus a currency code).
 */
function fieldsForLeaf({ criterion, leaf, gate, registry, profile, optionalIds, presentation }) {
  const shape = registry.valueTypes[leaf.valueType]?.instanceShape;
  if (!shape) throw new Error(`No instanceShape for value type ${leaf.valueType} (${leaf.id})`);

  // `required` is cardinality-derived and scoped to VISIBILITY: a gated field is
  // "required once shown". The same `optionalLeaves` relaxation the instance-data
  // schema honours is applied here, so the form cannot demand a field the schema
  // calls optional.
  const required = isRequiredCardinality(leaf.cardinality) && !optionalIds.has(leaf.id);
  const repeatable = isRepeatableCardinality(leaf.cardinality);
  // An enum-selector branch gate (C36) is the outermost gate for its branch and
  // wins over an inner boolean condition gate.
  const visibleWhen = branchVisibleWhenOf(criterion, leaf, registry)
    ?? visibleWhenOf(criterion, gate, registry, profile);
  const filledBy = profile.filledBy.byNodeKind[leaf.nodeKind];
  const codelists = new Map(codelistsOfShape(shape).map(c => [c.path.join('.'), c.codelist]));
  // A per-leaf codelist (CODE, whose list varies by use) is declared on the leaf,
  // not the shape; it applies to the scalar leaf itself (empty suffix).
  if (leaf.codelist && !codelists.has('')) codelists.set('', leaf.codelist);

  // The scalar properties this leaf presents as individual inputs.
  const itemShape = shape.type === 'array' ? shape.items : shape;
  const leafProps = itemShape?.type === 'object'
    ? Object.entries(itemShape.properties ?? {}).map(([name, sub]) => ({
        suffix: [name],
        sub,
        requiredHere: required && (itemShape.required ?? []).includes(name),
      }))
    : [{ suffix: [], sub: itemShape, requiredHere: required }];

  return leafProps
    // An object property that is itself a reference key (e.g. evidence `id`) is
    // plumbing, not a form input: the form collects url/identifier/description.
    .filter(p => !(leaf.valueType === 'EVIDENCE_IDENTIFIER' && p.suffix[0] === 'id'))
    .map(({ suffix, requiredHere }) => {
      const field = {
        semanticId: leaf.id,
        dataPath: dataPathOf(criterion, leaf, registry, suffix),
        filledBy,
        uiType: uiTypeOf({ leaf, suffix, profile, presentation }),
        required: requiredHere,
      };

      // R6.6 — the leaf-level catalogue key. Where a leaf renders as several
      // inputs, the catalogue has no per-input key, so the sidecar supplies a
      // property-level sub-label and the leaf key is kept for context.
      const labelKey = labelKeyOf(criterion, leaf, profile);
      if (labelKey) field.labelKey = labelKey;
      if (suffix.length) {
        const sub = presentation?.propertyLabelKeys?.byValueType?.[leaf.valueType]?.[suffix[0]];
        if (sub) field.propertyLabelKey = sub;
      }

      if (repeatable) field.repeatable = true;
      const codelist = codelists.get(suffix.join('.'));
      if (codelist) field.codelist = codelist;
      if (visibleWhen) field.visibleWhen = visibleWhen;
      field.$derivedFrom = leaf.requestpath;
      return field;
    });
}

/**
 * Build a caption "note" field (F1): a non-input display element carrying the
 * caption's i18n label key and `$derivedFrom`, with no `dataPath`, `filledBy`,
 * or `uiType`. A caption inside a conditional branch inherits that branch's
 * `visibleWhen`, so its guidance shows only when the branch does.
 */
function captionField(criterion, caption, gate, registry, profile) {
  const segs = caption.requestpath.split('/');
  segs[0] = stableIdOf(criterion);
  const field = {
    kind: 'caption',
    labelKey: `${profile.i18n.labelKeyPrefixByNodeKind.caption}.${segs.join('.')}`,
    $derivedFrom: caption.requestpath,
  };
  const visibleWhen = visibleWhenOf(criterion, gate, registry, profile);
  if (visibleWhen) field.visibleWhen = visibleWhen;
  return field;
}

/**
 * Group id for a set of fields: the instance-path segment their leaves share
 * below the side root (yielding `turnover`, `startTrading`, `electronicEvidence`
 * for C31). When the leaves share no prefix, fall back to the FIRST leaf's
 * leading path segment rather than the EA tag — an EA tag like `QSG1` is an
 * encoding artefact and has no place in a presentation lens.
 *
 * A meaningful name for a prefix-less group (the hand-authored lens calls C31's
 * QSG1 'fulfilment') is a presentation decision, so it is an override in the
 * task 5.2 presentation sidecar, not something derivable here.
 */
function groupIdFor(leaves) {
  const paths = leaves.map(l => l.instanceBinding.path);
  if (!paths.length) return 'answer';
  const head = paths[0][0];
  if (paths.length > 1 && paths.every(p => p.length > 1 && p[0] === head)) return head;
  return head;
}

/**
 * Generate the form-structure lens for one compiled criterion.
 * Requirement leaves collapse into a single buyer group; each top-level QUESTION
 * group under the criterion becomes one response group.
 */
export function generateCriterionForm(
  criterion, registry, profile = loadFormProfile(), hints = null, presentation = undefined,
) {
  const contexts = leavesWithContext(criterion);
  const optionalIds = new Set(hints?.optionalLeaves?.ids ?? []);
  // `undefined` means "look for the criterion's sidecar"; `null` means "none".
  const pres = presentation === undefined ? loadPresentation(criterion.code) : presentation;

  // A context is a question-area one if its group chain enters a QUESTION group
  // (a caption has no nodeKind to test, so route by chain, which works for both).
  const isQuestionGroup = g => g.eaType === 'QUESTION_GROUP' || g.eaType === 'QUESTION_SUBGROUP';
  const inQuestionArea = ctx => ctx.groupChain.some(isQuestionGroup);
  // A requirement-side caption sits in the requirement area (no QUESTION group in
  // its chain); otherwise it belongs with the response question groups.
  const requirementContexts = contexts.filter(c => (c.leaf ? c.leaf.nodeKind === 'requirement' : !inQuestionArea(c)));
  const questionContexts = contexts.filter(c => (c.leaf ? c.leaf.nodeKind === 'question' : inQuestionArea(c)));

  // Emit the fields for one context in document order: a value leaf expands to
  // one-or-more input fields; a caption expands to a single note field.
  const emitContext = ({ leaf, caption, gate }) =>
    caption
      ? [captionField(criterion, caption, gate, registry, profile)]
      : fieldsForLeaf({ criterion, leaf, gate, registry, profile, optionalIds, presentation: pres });

  const groups = [];

  if (requirementContexts.length) {
    groups.push({
      id: profile.grouping.requirementGroupId,
      filledBy: profile.filledBy.byNodeKind.requirement,
      fields: requirementContexts.flatMap(emitContext),
    });
  }

  // Response groups are keyed by the OUTERMOST QUESTION group in each context's
  // chain — the first group whose EA type is QUESTION_GROUP/QUESTION_SUBGROUP.
  // This is the form-section boundary: it keeps a top-level QUESTION_GROUP
  // together with all its nested subgroups as ONE group (C07's QG1 indicator +
  // its QG1/QSG1 evidence), while still separating sibling question groups that
  // live under a shared requirement subgroup (C31's QSG1..QSG4 under RSG1).
  const buckets = new Map();
  for (const ctx of questionContexts) {
    const owner = ctx.groupChain.find(isQuestionGroup) ?? ctx.groupChain[0] ?? null;
    const key = owner?.requestpath ?? '';
    if (!buckets.has(key)) buckets.set(key, { owner, items: [] });
    buckets.get(key).items.push(ctx);
  }

  for (const { owner, items } of buckets.values()) {
    // Group id is derived from the VALUE leaves only (captions carry no path).
    const derivedId = groupIdFor(items.filter(i => i.leaf).map(i => i.leaf));
    // A derived group id is serviceable but not always a name a human would
    // choose; the sidecar may rename it for display (R10.3).
    const renamed = pres?.groupLabels?.[derivedId]?.id;
    groups.push({
      id: renamed ?? derivedId,
      ...(renamed ? { $derivedId: derivedId } : {}),
      filledBy: profile.filledBy.byNodeKind.question,
      fields: items.flatMap(emitContext),
      $derivedFrom: owner?.requestpath,
    });
  }

  const roles = new Set(groups.map(g => g.filledBy));
  const m = criterion.instanceModel;

  return {
    code: criterion.code,
    uuid: criterion.uuid,
    nameKey: `${profile.i18n.criterionNameKey}.${stableIdOf(criterion)}`,
    descriptionKey: `${profile.i18n.criterionDescriptionKey}.${stableIdOf(criterion)}`,
    filledBy: roles.size > 1 ? profile.filledBy.mixed : [...roles][0],
    dataPath: [...m.containerPath, criterion[m.key.source]].join('.'),
    groups,
  };
}

/** Generate the per-part form lens containing one or more compiled criteria. */
export function generateFormStructure(criteria, registry, { partId, profile, hints, presentation } = {}) {
  const list = Array.isArray(criteria) ? criteria : [criteria];
  const p = profile ?? loadFormProfile();
  const perCriterion = (v, c) => (Array.isArray(v) ? v[list.indexOf(c)] : v);
  const compiledCriteria = list.map(c => generateCriterionForm(
    c, registry, p, perCriterion(hints, c) ?? null, perCriterion(presentation, c)));

  return {
    $comment: `GENERATED by model/compiler/generate-form-structure.mjs. Presentation lens: filledBy from leaf kind, visibleWhen from condition markers, codelist from the value-type registry, required/repeatable from EA cardinality, uiType from the form profile's default table (overridable per semantic ID in the presentation sidecar), label keys derived from requestpath to match the shipped i18n catalogue. References instance-data by dotted dataPath; carries no XML concerns. Do not hand-edit; regenerate from the compiler.`,
    ...(partId ? { part: partId } : {}),
    criteriaOrder: compiledCriteria.map(c => c.code),
    criteria: compiledCriteria,
  };
}
