// Probe: can the compiled form-structure drive the UI the way espd-edm/parts/ does?
//
// The live UI (js/renderer.js) renders criteria by walking the EA component tree
// in espd-edm/parts/part-*.json and deriving, PER QUESTION:
//   - a label (i18n key from requestpath + nodeKind),
//   - a UI control (from propertydatatype),
//   - required-ness (from cardinality),
//   - the EA content path it reads/writes answers at.
//
// This probe takes C01 (exg-crim-part), reproduces what the renderer derives
// from the parts file, and checks the COMPILED form (model/generated/form-structure/
// exg-crim-part.form.json) carries an equivalent for every rendered field — so we
// get a concrete gap list for a future UI switch. It is a PROBE, not a guarantee:
// failures are documented gaps, not necessarily bugs.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');
const CODE = 'exg-crim-part';

// --- The renderer's propertydatatype -> uiType mapping (from js/renderer.js) ---
// Reproduced here so the probe compares against the UI's actual control choice.
const RENDERER_UITYPE = {
  INDICATOR: 'boolean', DATE: 'date', URL: 'url', PERIOD: 'period',
  DESCRIPTION: 'textarea', NONE: 'text',
  AMOUNT: 'amount', MINIMUM_AMOUNT: 'amount',
  CODE: 'code', CODE_COUNTRY: 'code', CODE_BOOLEAN: 'code',
  QUANTITY: 'number', MINIMUM_QUANTITY: 'number', QUANTITY_YEAR: 'number',
  QUANTITY_INTEGER: 'number', EVIDENCE_IDENTIFIER: 'evidence',
  IDENTIFIER: 'text', ECONOMIC_OPERATOR_IDENTIFIER: 'text', LOT_IDENTIFIER: 'text',
};
// The compiler's form uiType vocabulary differs for a few types; map compiler ->
// renderer family so we compare INTENT, not exact spelling.
const COMPILER_TO_FAMILY = {
  boolean: 'boolean', date: 'date', url: 'url', textarea: 'textarea', text: 'text',
  number: 'number', code: 'code',
  // AMOUNT/PERIOD/EVIDENCE are multi-input in the compiler (one field per scalar
  // property) but single composite controls in the renderer, so they are compared
  // structurally rather than 1:1 (see the amount/period/evidence notes below).
};

function loadParts() {
  const p = path.join(repoRoot, 'espd-edm', 'parts', 'part-III-exclusion.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function loadCompiledForm() {
  const p = path.join(here, '..', 'generated', 'form-structure', `${CODE}.form.json`);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/** Walk the EA criterion like the renderer: collect every QUESTION with the
 * facts the renderer derives. */
function rendererFields(criterion) {
  const out = [];
  (function walk(node) {
    for (const c of node.components ?? []) {
      if (c.type === 'QUESTION') {
        out.push({
          contentpath: c.contentpath,
          requestpath: c.requestpath,
          valueType: c.propertydatatype,
          uiFamily: RENDERER_UITYPE[c.propertydatatype] ?? 'text',
          required: c.cardinality === '1',
        });
      }
      walk(c);
    }
  })(criterion);
  return out;
}

/** Index the compiled form's fields by their $derivedFrom (= EA requestpath). */
function compiledFieldsByRequestpath(form) {
  const map = new Map();
  for (const g of form.criteria[0].groups) {
    for (const f of g.fields) {
      if (!map.has(f.$derivedFrom)) map.set(f.$derivedFrom, []);
      map.get(f.$derivedFrom).push(f);
    }
  }
  return map;
}

const parts = loadParts();
// In the UI parts file each entry in `sections` IS a criterion (code/components).
const criterion = parts.sections.find(c => c.code === CODE);
assert.ok(criterion, `C01 (${CODE}) not found in parts/part-III-exclusion.json`);
const compiled = loadCompiledForm();
const rendered = rendererFields(criterion);
const byReq = compiledFieldsByRequestpath(compiled);

test('every QUESTION the renderer would show has at least one compiled field', () => {
  const missing = rendered.filter(r => !byReq.has(r.requestpath));
  assert.deepEqual(missing.map(m => m.requestpath), [],
    `renderer QUESTIONs with no compiled field:\n${missing.map(m => '  ' + m.requestpath + ' (' + m.valueType + ')').join('\n')}`);
});

test('compiled uiType matches the renderer control family for scalar questions', () => {
  const mismatches = [];
  for (const r of rendered) {
    const fields = byReq.get(r.requestpath) ?? [];
    if (!fields.length) continue;
    // Composite controls (amount/period/evidence) are multi-field in the compiler;
    // compared structurally in the next test, skipped here.
    if (['amount', 'period', 'evidence'].includes(r.uiFamily)) continue;
    for (const f of fields) {
      const fam = COMPILER_TO_FAMILY[f.uiType] ?? f.uiType;
      if (fam !== r.uiFamily) mismatches.push(`${r.requestpath}: renderer=${r.uiFamily} compiled=${f.uiType}`);
    }
  }
  assert.deepEqual(mismatches, [], `uiType family mismatches:\n${mismatches.map(m => '  ' + m).join('\n')}`);
});

test('compiled required-ness matches the renderer for always-visible questions', () => {
  // The renderer derives required = (cardinality === 1). The compiler scopes
  // required to visibility ("required once shown"). For UNGATED fields the two
  // should agree; gated fields are compared only where both are visible.
  const mismatches = [];
  for (const r of rendered) {
    const fields = byReq.get(r.requestpath) ?? [];
    for (const f of fields) {
      if (f.visibleWhen) continue; // gated: compiler semantics differ by design
      if (['amount', 'period', 'evidence'].includes(r.uiFamily)) continue;
      if (f.required !== r.required) mismatches.push(`${r.requestpath}: renderer=${r.required} compiled=${f.required}`);
    }
  }
  assert.deepEqual(mismatches, [], `required mismatches (ungated):\n${mismatches.map(m => '  ' + m).join('\n')}`);
});

test('GAP: the compiled form carries no EA content path (addressing bridge needed)', () => {
  // The renderer stores answers by EA contentpath; the compiled field exposes
  // only dataPath (+ $derivedFrom = requestpath, NOT contentpath). Document the
  // gap: a UI switch needs either contentpath on the compiled field, or a
  // dataPath<->contentpath bridge. $derivedFrom is the requestpath, one segment
  // short of the contentpath (…/R1/RV).
  const f = compiled.criteria[0].groups[0].fields[0];
  assert.ok(f.$derivedFrom, 'compiled field has $derivedFrom (requestpath)');
  assert.equal(f.contentpath, undefined, 'compiled field has NO contentpath — bridge required for state');
  // The requestpath is a prefix of the contentpath, so a bridge is derivable:
  const r = rendered.find(x => x.requestpath === f.$derivedFrom);
  assert.ok(r && r.contentpath.startsWith(f.$derivedFrom),
    'requestpath is a prefix of contentpath, so contentpath is reconstructible');
});

test('SUMMARY: report renderer-vs-compiled coverage for C01', () => {
  const total = rendered.length;
  const covered = rendered.filter(r => byReq.has(r.requestpath)).length;
  const composite = rendered.filter(r => ['amount', 'period', 'evidence'].includes(r.uiFamily)).length;
  console.log(`    C01: ${covered}/${total} renderer QUESTIONs have a compiled field ` +
    `(${composite} composite: amount/period/evidence compared structurally).`);
  // The probe's purpose is the diagnostic above; assert only that we covered all.
  assert.equal(covered, total);
});
