// Task 1.2 test — enrichment overlay happy path + fail-fast checks.
//
// Usage: node overlay-enrichment.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore, leavesOf } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(
  here, '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);

const CODE = 'slc-stand-to-spec-avg';
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const core = readStructuralCore(edm, CODE);
const baseSidecar = JSON.parse(
  fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.sidecar.json`), 'utf8')
);

const clone = v => structuredClone(v);

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message}`); }
}
function expectThrow(name, fn, snippet) {
  try {
    fn();
    failures++;
    console.error(`\u2717 ${name}: expected an error but none was thrown`);
  } catch (err) {
    if (snippet && !err.message.includes(snippet)) {
      failures++;
      console.error(`\u2717 ${name}: error missing '${snippet}' (got: ${err.message.split('\n')[0]})`);
    } else {
      console.log(`\u2713 ${name}`);
    }
  }
}

// Happy path: full overlay succeeds and every leaf is enriched.
check('happy path: all 17 leaves enriched with id + instanceBinding', () => {
  const compiled = overlayEnrichment(core, baseSidecar);
  assert.equal(compiled.id, CODE);
  assert.deepEqual(compiled.instanceModel.containerPath, ['partIV', 'selectionCriteria']);
  const leaves = leavesOf(compiled);
  assert.equal(leaves.length, 17);
  for (const l of leaves) {
    assert.ok(l.id, `leaf ${l.requestpath} must have id`);
    assert.ok(l.instanceBinding, `leaf ${l.requestpath} must have instanceBinding`);
  }
  // Core must not be mutated.
  assert.ok(!('id' in core), 'overlay must not mutate the input core');
});

// Fail: stale correlation path.
expectThrow('fail-fast: stale correlation path', () => {
  const s = clone(baseSidecar);
  s.components['C31_slc-stand-to-spec-avg/RG1/RSG1/NOPE'] = {
    id: 'x.nope', instanceBinding: { side: 'response', path: ['nope'] }
  };
  overlayEnrichment(core, s);
}, 'correlation path not found');

// Fail: un-enriched value leaf (remove one entry).
expectThrow('fail-fast: un-enriched value leaf', () => {
  const s = clone(baseSidecar);
  delete s.components['C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3'];
  overlayEnrichment(core, s);
}, 'Un-enriched value leaves');

// Fail: duplicate semantic id.
expectThrow('fail-fast: duplicate semantic id', () => {
  const s = clone(baseSidecar);
  s.components['C31_slc-stand-to-spec-avg/RG1/RSG1/RQ2'].id =
    s.components['C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3'].id;
  overlayEnrichment(core, s);
}, 'Duplicate semantic IDs');

// Fail: a path that matches neither a leaf nor a group is a stale correlation
// path. (A path that matches a GROUP is now valid for repeatable groups — see
// the group-binding tests below — so use a truly absent path here.)
expectThrow('fail-fast: stale correlation path (matches no leaf or group)', () => {
  const s = clone(baseSidecar);
  s.components['C31_slc-stand-to-spec-avg/RG1/NOPE/Q9'] = {
    id: 'x.nope2', instanceBinding: { side: 'response', path: ['nope2'] }
  };
  overlayEnrichment(core, s);
}, 'correlation path not found');

// Task 7.0 — binding a GROUP is only allowed for repeatable groups, and the
// binding must declare it. RG1 is 1..n (repeatable) but a binding without
// repeatable:true is rejected.
expectThrow('fail-fast: group binding without repeatable:true', () => {
  const s = clone(baseSidecar);
  s.components['C31_slc-stand-to-spec-avg/RG1'] = {
    id: 'x.group', instanceBinding: { side: 'requirement', path: ['group'] }
  };
  overlayEnrichment(core, s);
}, 'only REPEATABLE groups');

// A repeatable:true binding on a NON-repeatable group (cardinality 1) is rejected.
expectThrow('fail-fast: repeatable binding on a non-repeatable group', () => {
  const s = clone(baseSidecar);
  // RSG1 is cardinality 1 (not repeatable).
  s.components['C31_slc-stand-to-spec-avg/RG1/RSG1'] = {
    id: 'x.rsg1', instanceBinding: { side: 'requirement', path: ['rsg1'], repeatable: true }
  };
  overlayEnrichment(core, s);
}, 'not 0..n/1..n');

// Fail: mismatched criterion code.
expectThrow('fail-fast: sidecar/core code mismatch', () => {
  const s = clone(baseSidecar);
  s.criterion.code = 'wrong-code';
  overlayEnrichment(core, s);
}, 'does not match core code');

if (failures) {
  console.error(`\n${failures} test(s) failed.`);
  process.exit(1);
}
console.log('\nAll overlay-enrichment tests passed.');
