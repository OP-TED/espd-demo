// Task 1.1 test — lean-consumption / forward-compatibility guarantee.
//
// Asserts the structural-core reader depends ONLY on minimal-core fields: it
// must produce the SAME core from the full espd-edm.json and from a condensed
// copy with the encoding/derivable fields removed (xmlElementName, xmlChildren,
// responsepath, contentpath, and the restated TypeCode/ValueDataTypeCode child
// values). This proves a future condensed espd-edm.json keeps working.
//
// Usage: node read-structural-core.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore, leavesOf } from './read-structural-core.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(
  here, '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);

const CODES = ['slc-stand-to-spec-avg', 'exg-pmt-bre-tax'];

/** Deep-clone and strip every encoding/derivable field the reader must NOT need. */
function condense(node) {
  if (Array.isArray(node)) return node.map(condense);
  if (node && typeof node === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      if (k === 'xmlElementName' || k === 'xmlChildren') continue; // encoding
      if (k === 'responsepath' || k === 'contentpath') continue;    // derivable
      out[k] = condense(v);
    }
    return out;
  }
  return node;
}

let failures = 0;
const full = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const condensed = condense(full);

for (const code of CODES) {
  try {
    const fromFull = readStructuralCore(full, code);
    const fromCondensed = readStructuralCore(condensed, code);

    assert.deepEqual(fromCondensed, fromFull,
      'core from condensed input must equal core from full input');
    assert.ok(leavesOf(fromFull).length > 0, 'expected at least one value leaf');

    // Spot-check: no encoding/derivable field leaked into the core.
    const serialized = JSON.stringify(fromFull);
    for (const banned of ['xmlElementName', 'xmlChildren', 'responsepath', 'contentpath']) {
      assert.ok(!serialized.includes(banned), `core must not contain ${banned}`);
    }

    console.log(`\u2713 lean-consumption guarantee holds: ${code} (${leavesOf(fromFull).length} leaves)`);
  } catch (err) {
    failures++;
    console.error(`\u2717 ${code}: ${err.message}`);
  }
}

if (failures) {
  console.error(`\n${failures} test(s) failed.`);
  process.exit(1);
}
console.log('\nAll structural-core reader tests passed.');
