// The compiled-model envelope must stay in sync with the model: regenerate it in
// memory and compare against the committed model/generated/compiled-model.json.
// Also check invariants so a mis-render is caught, not just drift.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEnvelope, buildCompiledModel, envelopePath } from './build-compiled-model.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.resolve(here, '..', '..', 'package.json'), 'utf8'));

test('model/generated/compiled-model.json is up to date (regenerate with `npm run model:compile`)', () => {
  const fresh = JSON.stringify(buildCompiledModel({ write: false }), null, 2) + '\n';
  const onDisk = fs.readFileSync(envelopePath, 'utf8');
  assert.equal(onDisk, fresh,
    'compiled-model.json is stale — run `npm run model:compile` and commit the result.');
});

test('the envelope is deterministic (two builds are identical)', () => {
  assert.equal(JSON.stringify(buildEnvelope()), JSON.stringify(buildEnvelope()));
});

test('version + provenance are present and sourced correctly', () => {
  const e = buildEnvelope();
  assert.equal(e.modelVersion, pkg.version, 'modelVersion = package.json version');
  assert.equal(e.edm.shortName, 'ResponseDataType');
  assert.equal(e.edm.version, '5.0.0');
});

test('counts are internally consistent', () => {
  const e = buildEnvelope();
  assert.equal(e.counts.modeledCriteria, e.criteria.length);
  assert.equal(e.counts.valueTypes, e.valueTypes.length);
  assert.equal(e.counts.codelists, e.codelists.length);
  // partsCovered criterion counts sum to the modeled total.
  assert.equal(e.partsCovered.reduce((n, p) => n + p.criteria, 0), e.counts.modeledCriteria);
  // The distinct-code gap is the known OT sharing (62 entries, fewer codes).
  assert.ok(e.counts.distinctCriterionCodes <= e.counts.eaCriteria);
});

test('every modeled criterion appears once in the inventory with a part', () => {
  const e = buildEnvelope();
  const ids = e.criteria.map(c => c.id);
  assert.equal(new Set(ids).size, ids.length, 'criterion ids are unique');
  for (const c of e.criteria) {
    assert.ok(c.id && c.eaCode && c.part, `${c.id} has id/eaCode/part`);
    assert.ok(Array.isArray(c.valueTypes), `${c.id} lists value types`);
  }
});

test('every value type a criterion uses is declared in the envelope value-type list', () => {
  const e = buildEnvelope();
  const declared = new Set(e.valueTypes.map(v => v.name));
  for (const c of e.criteria) {
    for (const vt of c.valueTypes) {
      assert.ok(declared.has(vt), `${c.id} uses ${vt}, which must be in valueTypes[]`);
    }
  }
  // Usage counts are non-negative and the heavily-used ones look right.
  const byName = new Map(e.valueTypes.map(v => [v.name, v]));
  assert.ok(byName.get('INDICATOR').usedBy >= byName.get('AMOUNT').usedBy);
});

test('PERIOD shows both request and response bindings (regression on the earlier fix)', () => {
  const e = buildEnvelope();
  const period = e.valueTypes.find(v => v.name === 'PERIOD');
  assert.ok(period, 'PERIOD is declared');
  assert.equal(period.request, true);
  assert.equal(period.response, true);
});
