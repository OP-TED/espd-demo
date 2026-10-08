// Task 1.3 test — structural-equivalence gate.
//
//   - C31 compiled criterion passes the gate.
//   - A deliberately mutated compiled criterion fails with a readable diff.
//   - A missing criterion fails.
//
// Usage: node structural-equivalence.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { assertStructuralEquivalence, projectCompiled } from './structural-equivalence.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(
  here, '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);

const CODE = 'slc-stand-to-spec-avg';
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(
  fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.sidecar.json`), 'utf8')
);
const compiled = overlayEnrichment(core, sidecar);

const clone = v => structuredClone(v);
let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}
function expectThrow(name, fn, snippet) {
  try { fn(); failures++; console.error(`\u2717 ${name}: expected error, none thrown`); }
  catch (err) {
    if (snippet && !err.message.includes(snippet)) {
      failures++;
      console.error(`\u2717 ${name}: error missing '${snippet}' (got: ${err.message.split('\n')[0]})`);
    } else console.log(`\u2713 ${name}`);
  }
}

// Pass: the enriched C31 criterion is structurally equivalent to the EA source.
check('C31 passes the structural-equivalence gate', () => {
  assertStructuralEquivalence(edm, CODE, compiled);
});

// Pass: projection strips all semantic-only fields.
check('projection removes id / instanceModel / instanceBinding', () => {
  const projected = projectCompiled(compiled);
  const s = JSON.stringify(projected);
  assert.ok(!('id' in projected), 'projected must not have criterion id');
  assert.ok(!('instanceModel' in projected), 'projected must not have instanceModel');
  assert.ok(!s.includes('instanceBinding'), 'projected must not have instanceBinding');
  assert.ok(!s.includes('"id"'), 'projected must not have any leaf id');
});

// Fail: mutated cardinality on a leaf -> readable diff.
expectThrow('mutated leaf cardinality is rejected by the gate', () => {
  const bad = clone(compiled);
  let corrupted = false;
  (function corrupt(n) {
    for (const c of n.children ?? []) {
      if (!corrupted && (c.nodeKind === 'requirement' || c.nodeKind === 'question')) { c.cardinality = 'BOGUS'; corrupted = true; return; }
      corrupt(c);
    }
  })(bad);
  assertStructuralEquivalence(edm, CODE, bad);
}, 'FAILED');

// Fail: an added phantom child -> diff.
expectThrow('added phantom child is rejected', () => {
  const bad = clone(compiled);
  bad.children.push({ nodeKind: 'group', eaType: 'REQUIREMENT_GROUP', cardinality: '1', condition: 'always', requestpath: 'X/PHANTOM', children: [] });
  assertStructuralEquivalence(edm, CODE, bad);
}, 'FAILED');

// Fail: missing criterion.
expectThrow('missing criterion fails', () => {
  assertStructuralEquivalence(edm, 'no-such-criterion', compiled);
}, 'absent from espd-edm.json');

if (failures) {
  console.error(`\n${failures} test(s) failed.`);
  process.exit(1);
}
console.log('\nAll structural-equivalence tests passed.');
