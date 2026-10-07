// Task 5.1 tests — form-structure generator.
//
// Asserts the lens is DERIVED correctly from the compiled model: filledBy from
// leaf kind (R6.2), visibleWhen from condition markers (R6.3), codelist from the
// value-type registry (R6.4), required/repeatable from EA cardinality. The
// hand-authored part-IV.form.json is the reference for what the derivation must
// reproduce (uiType/labelKey are excluded — they are task 5.2).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, loadHints, compile } from './compile.mjs';
import { generateFormStructure, generateCriterionForm, loadFormProfile } from './generate-form-structure.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const CODE = 'slc-stand-to-spec-avg';
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');

function compileC31() {
  const edm = loadEdm(edmPath);
  const { compiled, registry } = compile(edm, CODE, loadSidecar(CODE));
  return { compiled, registry, hints: loadHints(CODE) };
}

/** Flatten all generated fields, keyed by dataPath. */
function fieldsByPath(form) {
  const out = new Map();
  for (const c of form.criteria) {
    for (const g of c.groups) {
      for (const f of g.fields) out.set(f.dataPath, { ...f, groupId: g.id });
    }
  }
  return out;
}

const P = `partIV.selectionCriteria.${CODE}`;

test('R6.2 — filledBy derives from leaf kind', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  assert.equal(fields.get(`${P}.requirement.numberOfYears`).filledBy, 'contractingAuthority');
  assert.equal(fields.get(`${P}.requirement.businessDomain`).filledBy, 'contractingAuthority');
  assert.equal(fields.get(`${P}.response.fulfilledByItself`).filledBy, 'economicOperator');
  assert.equal(fields.get(`${P}.response.turnover.amount.value`).filledBy, 'economicOperator');

  // Every requirement-side field is CA, every response-side field is EO.
  for (const [dataPath, f] of fields) {
    const expected = dataPath.includes('.requirement.') ? 'contractingAuthority' : 'economicOperator';
    assert.equal(f.filledBy, expected, `${dataPath} filledBy`);
  }
});

test('R6.2 — a criterion with both sides is filledBy "both"', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });
  assert.equal(form.criteria[0].filledBy, 'both');
});

test('R6.3 — visibleWhen derives from condition markers, gated by the nearest preceding sibling leaf', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // ONFALSE: reliedUpon shown only when NOT fulfilled by itself.
  assert.deepEqual(fields.get(`${P}.response.reliedUpon`).visibleWhen, {
    path: `${P}.response.fulfilledByItself`,
    equals: false,
  });

  // ONTRUE nested one level deeper: gated by its OWN nearest gate (reliedUpon),
  // not by the outer fulfilledByItself gate.
  for (const leaf of ['name', 'id']) {
    assert.deepEqual(fields.get(`${P}.response.reliedUponEntity.${leaf}`).visibleWhen, {
      path: `${P}.response.reliedUpon`,
      equals: true,
    }, `reliedUponEntity.${leaf}`);
  }

  // ONTRUE evidence blocks: gated by their sibling availableElectronically.
  for (const branch of ['turnover.electronicEvidence', 'startTrading.electronicEvidence', 'electronicEvidence']) {
    assert.deepEqual(fields.get(`${P}.response.${branch}.evidence[].url`).visibleWhen, {
      path: `${P}.response.${branch}.availableElectronically`,
      equals: true,
    }, branch);
  }
});

test('R6.3 — unconditional (ON*) fields carry no visibleWhen', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  for (const p of [
    `${P}.requirement.lotIdentifiers[]`,
    `${P}.requirement.numberOfYears`,
    `${P}.response.fulfilledByItself`,
    `${P}.response.turnover.amount.value`,
    `${P}.response.startTrading.date`,
    `${P}.response.electronicEvidence.availableElectronically`,
  ]) {
    assert.equal(fields.get(p).visibleWhen, undefined, `${p} must be unconditional`);
  }
});

test('R6.4 — codelist derives from the value-type registry', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  assert.equal(fields.get(`${P}.requirement.minimumAmount.currency`).codelist, 'currency');
  assert.equal(fields.get(`${P}.response.turnover.amount.currency`).codelist, 'currency');
  // Non-code fields carry no codelist.
  assert.equal(fields.get(`${P}.requirement.minimumAmount.value`).codelist, undefined);
  assert.equal(fields.get(`${P}.response.fulfilledByItself`).codelist, undefined);
});

test('required and repeatable derive from EA cardinality', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // 1..n -> required + repeatable
  const lots = fields.get(`${P}.requirement.lotIdentifiers[]`);
  assert.equal(lots.required, true);
  assert.equal(lots.repeatable, true);

  // 1 -> required, not repeatable
  const years = fields.get(`${P}.requirement.numberOfYears`);
  assert.equal(years.required, true);
  assert.equal(years.repeatable, undefined);

  // PERIOD has no required properties -> both dates optional
  assert.equal(fields.get(`${P}.response.turnover.period.startDate`).required, false);
  assert.equal(fields.get(`${P}.response.turnover.period.endDate`).required, false);

  // EVIDENCE_IDENTIFIER is 1..n of objects requiring url -> url required+repeatable,
  // the other properties optional but still repeatable.
  const url = fields.get(`${P}.response.electronicEvidence.evidence[].url`);
  assert.equal(url.required, true);
  assert.equal(url.repeatable, true);
  assert.equal(fields.get(`${P}.response.electronicEvidence.evidence[].description`).required, false);
});

test('the optionalLeaves hint relaxes the form too, so form and schema agree', () => {
  const { compiled, registry, hints } = compileC31();

  // With hints: businessDomain is relaxed to optional (same hint the schema honours).
  const withHints = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));
  assert.equal(withHints.get(`${P}.requirement.businessDomain`).required, false);

  // Without hints: the raw EA cardinality (1) makes it required.
  const noHints = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV' }));
  assert.equal(noHints.get(`${P}.requirement.businessDomain`).required, true);
});

test('object-valued leaves expand to one field per scalar property', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // AMOUNT -> value + currency; PERIOD -> startDate + endDate.
  for (const p of [
    `${P}.response.turnover.amount.value`,
    `${P}.response.turnover.amount.currency`,
    `${P}.response.turnover.period.startDate`,
    `${P}.response.turnover.period.endDate`,
  ]) {
    assert.ok(fields.has(p), `expected field ${p}`);
  }
  // The object itself is not emitted as a field.
  assert.equal(fields.has(`${P}.response.turnover.amount`), false);
});

test('the evidence reference key is plumbing, not a form field', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  for (const branch of ['turnover.electronicEvidence', 'startTrading.electronicEvidence', 'electronicEvidence']) {
    assert.equal(fields.has(`${P}.response.${branch}.evidence[].id`), false, `${branch}.evidence[].id`);
    // ...while the user-facing properties ARE present.
    for (const prop of ['url', 'identifier', 'description']) {
      assert.ok(fields.has(`${P}.response.${branch}.evidence[].${prop}`), `${branch}.evidence[].${prop}`);
    }
  }
});

test('group ids come from instance paths, never from EA tags', () => {
  const { compiled, registry, hints } = compileC31();
  // presentation: null => derivation only, no sidecar renames.
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints, presentation: null });
  const ids = form.criteria[0].groups.map(g => g.id);

  assert.deepEqual(ids, ['requirement', 'fulfilledByItself', 'turnover', 'startTrading', 'electronicEvidence']);
  for (const id of ids) {
    assert.ok(!/^(q|r)sg\d+$/i.test(id), `group id '${id}' leaks an EA tag into the presentation lens`);
  }
});

test('R10.3 — the presentation sidecar can rename a derived group id', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });
  const group = form.criteria[0].groups.find(g => g.$derivedId === 'fulfilledByItself');

  // The sidecar renames the prefix-less group to the human-chosen 'fulfilment',
  // matching the hand-authored lens, while recording what was derived.
  assert.ok(group, 'expected a renamed group');
  assert.equal(group.id, 'fulfilment');

  // Renaming is display-only: it must not disturb the fields' dataPaths.
  for (const f of group.fields) {
    assert.ok(f.dataPath.startsWith(`${P}.response.`), f.dataPath);
  }
});

test('every generated field matches a leaf of the compiled model', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });

  const semanticIds = new Set();
  (function walk(n) {
    for (const c of n.children ?? []) {
      if (c.nodeKind === 'requirement' || c.nodeKind === 'question') semanticIds.add(c.id);
      walk(c);
    }
  })(compiled);

  for (const c of form.criteria) {
    for (const g of c.groups) {
      for (const f of g.fields) {
        assert.ok(semanticIds.has(f.semanticId), `field ${f.dataPath} has unknown semanticId ${f.semanticId}`);
        assert.ok(f.dataPath.startsWith(`${P}.`), `field ${f.dataPath} is outside the criterion container`);
      }
    }
  }
});

test('every value leaf of the model reaches the form', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });

  const present = new Set();
  for (const c of form.criteria) for (const g of c.groups) for (const f of g.fields) present.add(f.semanticId);

  (function walk(n) {
    for (const c of n.children ?? []) {
      if (c.nodeKind === 'requirement' || c.nodeKind === 'question') {
        assert.ok(present.has(c.id), `leaf ${c.id} (${c.requestpath}) is missing from the form lens`);
      }
      walk(c);
    }
  })(compiled);
});

test('the derivation reproduces the hand-authored lens structure', () => {
  const { compiled, registry, hints } = compileC31();
  const generated = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  const handAuthored = JSON.parse(
    fs.readFileSync(path.join(here, '..', 'form-structure', 'part-IV.form.json'), 'utf8'));

  const reference = handAuthored.criteria[0].groups.flatMap(g => g.fields);
  for (const ref of reference) {
    const gen = generated.get(ref.dataPath);
    assert.ok(gen, `hand-authored field ${ref.dataPath} was not generated`);
    if (ref.codelist) assert.equal(gen.codelist, ref.codelist, `${ref.dataPath} codelist`);
    if (ref.repeatable) assert.equal(gen.repeatable, true, `${ref.dataPath} repeatable`);
    if (ref.visibleWhen) assert.deepEqual(gen.visibleWhen, ref.visibleWhen, `${ref.dataPath} visibleWhen`);
    else assert.equal(gen.visibleWhen, undefined, `${ref.dataPath} must be unconditional`);

    // `required` is compared only where the hand-authored lens is a trustworthy
    // reference. Two documented divergences, both cases where the hand-authored
    // FORM contradicts the hand-authored SCHEMA and the generator follows the
    // schema (see KNOWN_FORM_DIVERGENCES below).
    if (!ref.visibleWhen && !KNOWN_FORM_DIVERGENCES.has(ref.dataPath)) {
      assert.equal(gen.required, ref.required, `${ref.dataPath} required`);
    }
  }
});

/**
 * dataPaths where the hand-authored part-IV.form.json disagrees with the
 * hand-authored part-IV.schema.json. The generator sides with the schema.
 *
 * 1. `*.electronicEvidence.availableElectronically` — the form says
 *    `required: false`, but part-IV.schema.json's `$defs.electronicEvidence`
 *    carries `required: ["availableElectronically"]`, and EA cardinality is `1`.
 *    The form is the odd one out.
 * 2. gated fields (handled separately above) — the form marks `evidence[].url`
 *    required but `reliedUpon` optional, though both are gated; the schema's
 *    derived if/then requires both inside their branch.
 */
const KNOWN_FORM_DIVERGENCES = new Set([
  `${P}.response.turnover.electronicEvidence.availableElectronically`,
  `${P}.response.startTrading.electronicEvidence.availableElectronically`,
  `${P}.response.electronicEvidence.availableElectronically`,
]);

test('availableElectronically follows the schema (required), not the hand-authored form', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // EA cardinality is 1 and part-IV.schema.json $defs.electronicEvidence has
  // required:["availableElectronically"], so the indicator is required.
  for (const p of KNOWN_FORM_DIVERGENCES) {
    assert.equal(fields.get(p).required, true, p);
    assert.equal(fields.get(p).visibleWhen, undefined, `${p} is itself ungated`);
  }
});

test('`required` on a gated field means "required once shown", consistent with the schema', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // The generated instance-data schema requires `reliedUpon` inside the
  // ONFALSE branch (its derived if/then). The form must agree: the field is
  // required once its gate reveals it, NOT globally optional.
  const reliedUpon = fields.get(`${P}.response.reliedUpon`);
  assert.equal(reliedUpon.required, true);
  assert.ok(reliedUpon.visibleWhen, 'reliedUpon must still be gated');

  // Same rule for the deeper ONTRUE branch and for evidence URLs — one
  // consistent semantic across every gated field.
  assert.equal(fields.get(`${P}.response.reliedUponEntity.name`).required, true);
  assert.equal(fields.get(`${P}.response.electronicEvidence.evidence[].url`).required, true);

  // Cardinality still decides: an optional leaf stays optional when shown.
  assert.equal(fields.get(`${P}.response.electronicEvidence.evidence[].description`).required, false);
});

test('the form profile declares the kinds the generator relies on', () => {
  const profile = loadFormProfile();
  assert.equal(profile.filledBy.byNodeKind.requirement, 'contractingAuthority');
  assert.equal(profile.filledBy.byNodeKind.question, 'economicOperator');
  assert.equal(profile.visibleWhen.equalsByCondition.true, true);
  assert.equal(profile.visibleWhen.equalsByCondition.false, false);
});

test('generation is criterion-independent — no hard-coded C31 in the generator', () => {
  const src = fs.readFileSync(path.join(here, 'generate-form-structure.mjs'), 'utf8');
  assert.ok(!src.includes('slc-stand-to-spec-avg'), 'generator must not name a criterion');
  assert.ok(!src.includes('partIV'), 'generator must not hard-code a part container');
});

test('generateCriterionForm is stable across repeated runs', () => {
  const { compiled, registry } = compileC31();
  const a = generateCriterionForm(compiled, registry);
  const b = generateCriterionForm(compiled, registry);
  assert.deepEqual(a, b);
});

// ---------------------------------------------------------------------------
// Task 5.2 — uiType defaults, presentation sidecar, i18n keys (R6.5–R6.7, R10)
// ---------------------------------------------------------------------------

test('R10.2 — uiType defaults derive from the value type', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  assert.equal(fields.get(`${P}.requirement.lotIdentifiers[]`).uiType, 'text');       // LOT_IDENTIFIER
  assert.equal(fields.get(`${P}.requirement.numberOfYears`).uiType, 'number');        // QUANTITY_YEAR
  assert.equal(fields.get(`${P}.requirement.businessDomain`).uiType, 'textarea');     // DESCRIPTION
  assert.equal(fields.get(`${P}.response.fulfilledByItself`).uiType, 'boolean');      // INDICATOR
  assert.equal(fields.get(`${P}.response.startTrading.date`).uiType, 'date');         // DATE
  assert.equal(fields.get(`${P}.response.reliedUponEntity.id`).uiType, 'text');       // EO_IDENTIFIER
});

test('R10.2 — object-shaped value types map uiType per property', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // MINIMUM_AMOUNT / AMOUNT -> number + code picker
  assert.equal(fields.get(`${P}.requirement.minimumAmount.value`).uiType, 'number');
  assert.equal(fields.get(`${P}.requirement.minimumAmount.currency`).uiType, 'code');
  assert.equal(fields.get(`${P}.response.turnover.amount.value`).uiType, 'number');
  assert.equal(fields.get(`${P}.response.turnover.amount.currency`).uiType, 'code');

  // PERIOD -> two date inputs
  assert.equal(fields.get(`${P}.response.turnover.period.startDate`).uiType, 'date');
  assert.equal(fields.get(`${P}.response.turnover.period.endDate`).uiType, 'date');

  // EVIDENCE_IDENTIFIER -> url + text + text
  assert.equal(fields.get(`${P}.response.electronicEvidence.evidence[].url`).uiType, 'url');
  assert.equal(fields.get(`${P}.response.electronicEvidence.evidence[].identifier`).uiType, 'text');
  assert.equal(fields.get(`${P}.response.electronicEvidence.evidence[].description`).uiType, 'text');
});

test('R6.5 — the presentation sidecar overrides a wrong value-type default', () => {
  const { compiled, registry, hints } = compileC31();

  // DESCRIPTION defaults to textarea, but an entity NAME is a single-line value.
  const withSidecar = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));
  assert.equal(withSidecar.get(`${P}.response.reliedUponEntity.name`).uiType, 'text');

  // Without the sidecar the default applies, proving the override is what changed it.
  const noSidecar = fieldsByPath(
    generateFormStructure(compiled, registry, { partId: 'IV', hints, presentation: null }));
  assert.equal(noSidecar.get(`${P}.response.reliedUponEntity.name`).uiType, 'textarea');

  // The override is scoped to that one field: businessDomain stays a textarea.
  assert.equal(withSidecar.get(`${P}.requirement.businessDomain`).uiType, 'textarea');
});

test('R6.7 — an un-inferable uiType fails the build and names the semantic ID', () => {
  const { compiled, registry, hints } = compileC31();
  const profile = loadFormProfile();

  // Simulate a newly encountered value type with no default and no override.
  delete profile.uiType.byValueType.QUANTITY_YEAR;

  assert.throws(
    () => generateFormStructure(compiled, registry, { partId: 'IV', hints, profile, presentation: null }),
    err => {
      assert.match(err.message, /QUANTITY_YEAR/);
      assert.match(err.message, /slc-stand-to-spec-avg\.number-of-years/);
      return true;
    });
});

test('R6.7 — a sidecar override satisfies a missing uiType default', () => {
  const { compiled, registry, hints } = compileC31();
  const profile = loadFormProfile();
  delete profile.uiType.byValueType.QUANTITY_YEAR;

  const presentation = { uiTypeOverrides: { 'slc-stand-to-spec-avg.number-of-years': 'number' } };
  const fields = fieldsByPath(
    generateFormStructure(compiled, registry, { partId: 'IV', hints, profile, presentation }));

  assert.equal(fields.get(`${P}.requirement.numberOfYears`).uiType, 'number');
});

test('R6.6 — label keys derive from requestpath and resolve in the shipped i18n catalogue', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });
  const catalogue = JSON.parse(
    fs.readFileSync(path.join(here, '..', '..', 'i18n', 'i18n', 'en', 'espd.part4.json'), 'utf8'));

  // Criterion-level keys.
  const c = form.criteria[0];
  assert.equal(c.nameKey, 'criterion.name.slc-stand-to-spec-avg');
  assert.equal(c.descriptionKey, 'criterion.description.slc-stand-to-spec-avg');
  assert.ok(c.nameKey in catalogue, `${c.nameKey} missing from the catalogue`);
  assert.ok(c.descriptionKey in catalogue, `${c.descriptionKey} missing from the catalogue`);

  // Every derived field labelKey must exist in the real catalogue — this is the
  // guarantee the hand-authored lens does NOT provide (none of its 21 invented
  // keys resolve).
  for (const g of c.groups) {
    for (const f of g.fields) {
      assert.ok(f.labelKey, `${f.dataPath} has no labelKey`);
      assert.ok(f.labelKey in catalogue, `labelKey ${f.labelKey} (${f.dataPath}) missing from the catalogue`);
    }
  }
});

test('R6.6 — label keys use the kind-specific prefix', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  assert.equal(
    fields.get(`${P}.requirement.numberOfYears`).labelKey,
    'requirement.label.slc-stand-to-spec-avg.RG1.RSG1.RQ1');
  assert.equal(
    fields.get(`${P}.response.fulfilledByItself`).labelKey,
    'question.label.slc-stand-to-spec-avg.RG1.RSG1.QSG1.Q1');

  // Requirement leaves get the requirement prefix, questions the question prefix.
  for (const [dataPath, f] of fields) {
    const expected = dataPath.includes('.requirement.') ? 'requirement.label.' : 'question.label.';
    assert.ok(f.labelKey.startsWith(expected), `${dataPath} -> ${f.labelKey}`);
  }
});

test('multi-input leaves get a property sub-label from the sidecar', () => {
  const { compiled, registry, hints } = compileC31();
  const fields = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));

  // The catalogue is leaf-level: PERIOD has ONE key ("Start date; End date"), so
  // the two date inputs need per-property sub-labels from the sidecar.
  const start = fields.get(`${P}.response.turnover.period.startDate`);
  const end = fields.get(`${P}.response.turnover.period.endDate`);
  assert.equal(start.labelKey, end.labelKey, 'both dates share the leaf key');
  assert.equal(start.propertyLabelKey, 'ui.startDate');
  assert.equal(end.propertyLabelKey, 'ui.endDate');

  // Single-input leaves carry no sub-label.
  assert.equal(fields.get(`${P}.response.fulfilledByItself`).propertyLabelKey, undefined);
});

test('every i18n key the lens emits resolves in the catalogue — no invented keys', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });

  const catalogue = {
    ...JSON.parse(fs.readFileSync(path.join(here, '..', '..', 'i18n', 'i18n', 'en', 'espd.common.json'), 'utf8')),
    ...JSON.parse(fs.readFileSync(path.join(here, '..', '..', 'i18n', 'i18n', 'en', 'espd.part4.json'), 'utf8')),
  };

  const emitted = new Set();
  for (const c of form.criteria) {
    emitted.add(c.nameKey);
    emitted.add(c.descriptionKey);
    for (const g of c.groups) {
      for (const f of g.fields) {
        emitted.add(f.labelKey);
        if (f.propertyLabelKey) emitted.add(f.propertyLabelKey);
      }
    }
  }

  const dangling = [...emitted].filter(k => !(k in catalogue));
  assert.deepEqual(dangling, [], `dangling i18n keys: ${dangling.join(', ')}`);
  assert.ok(emitted.size >= 20, `expected a meaningful number of keys, got ${emitted.size}`);
});

test('the presentation sidecar does not restate derivable facts', () => {
  const sidecar = JSON.parse(fs.readFileSync(
    path.join(here, 'sources', 'slc-stand-to-spec-avg.presentation.json'), 'utf8'));

  // Guard against the sidecar drifting back into duplicating the model: anything
  // the compiler derives must not appear as a key in it.
  const derived = ['filledBy', 'visibleWhen', 'codelist', 'required', 'repeatable', 'dataPath'];
  const serialized = JSON.stringify(Object.fromEntries(
    Object.entries(sidecar).filter(([k]) => !k.startsWith('$'))));
  for (const key of derived) {
    assert.ok(!serialized.includes(`"${key}"`), `presentation sidecar restates derivable '${key}'`);
  }
});

test('every field carries a complete presentation contract', () => {
  const { compiled, registry, hints } = compileC31();
  const form = generateFormStructure(compiled, registry, { partId: 'IV', hints });

  for (const c of form.criteria) {
    for (const g of c.groups) {
      for (const f of g.fields) {
        assert.ok(f.uiType, `${f.dataPath} has no uiType`);
        assert.ok(f.labelKey, `${f.dataPath} has no labelKey`);
        assert.ok(f.filledBy, `${f.dataPath} has no filledBy`);
        assert.equal(typeof f.required, 'boolean', `${f.dataPath} required must be boolean`);
        // A code-valued control must know which codelist to populate from.
        if (f.uiType === 'code') assert.ok(f.codelist, `${f.dataPath} is a code control without a codelist`);
      }
    }
  }
});

test('the hand-authored lens uiTypes are reproduced', () => {
  const { compiled, registry, hints } = compileC31();
  const generated = fieldsByPath(generateFormStructure(compiled, registry, { partId: 'IV', hints }));
  const handAuthored = JSON.parse(
    fs.readFileSync(path.join(here, '..', 'form-structure', 'part-IV.form.json'), 'utf8'));

  for (const ref of handAuthored.criteria[0].groups.flatMap(g => g.fields)) {
    const gen = generated.get(ref.dataPath);
    assert.ok(gen, `${ref.dataPath} not generated`);
    assert.equal(gen.uiType, ref.uiType, `${ref.dataPath} uiType`);
  }
});
