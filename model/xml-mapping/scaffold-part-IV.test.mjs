// EXPERIMENTAL — structural test for the C31 request DECLARATION.
//
// The request mapping (part-IV.request.mapping.json) now embeds the criterion's
// XML structure as a `structure` rule (generated from espd-edm.json by
// build-request-mapping.mjs). Running that spec through the mapper's map()
// produces the full cac:TenderingCriterion request declaration. This test
// checks that declaration STRUCTURALLY against the authoritative reference the
// ESPD validator uses as its canonical criterion tree:
//   espd-validation-schematron/ESPDRequest/xsl/ESPD-criterion.xml
//
// We compare the ORDERED tree of (element localName + cbc:ID + governing code)
// for C31's RG1 property-group subtree. The bundled reference is an OLDER
// ESPD-EDM snapshot than the freshly-exported espd-edm.json (e.g. C31 gained a
// QSG4 block in the newer model), so we require the reference to be reproduced
// as an exact PREFIX — the generated tree may carry additional trailing nodes.
// Descriptions, scheme attributes and the national-sub-criterion inner content
// (deferred TODO) are not compared.
//
// Usage: node scaffold-part-IV.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { parseXml, map } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REFERENCE = path.resolve(
  __dirname, '..', '..', '..', 'espd-validation-schematron', 'ESPDRequest', 'xsl', 'ESPD-criterion.xml'
);
const CODE = 'slc-stand-to-spec-avg';
const CRITERION_UUID = 'd3dfb714-f558-4512-bbc5-e456fa2339de';

function local (name) {
  return name.includes(':') ? name.split(':')[1] : name;
}

function findNode (root, localName, idText) {
  let found;
  ;(function walk (n) {
    if (found) return;
    if (local(n.name) === localName) {
      if (idText === undefined) { found = n; return; }
      const id = n.children.find(c => local(c.name) === 'ID');
      if (id && id.text === idText) { found = n; return; }
    }
    for (const c of n.children) walk(c);
  })(root);
  return found;
}

function signature (node) {
  const rows = [];
  const STRUCT = new Set([
    'TenderingCriterionPropertyGroup',
    'SubsidiaryTenderingCriterionPropertyGroup',
    'TenderingCriterionProperty'
  ]);
  ;(function walk (n) {
    const ln = local(n.name);
    if (STRUCT.has(ln)) {
      const id = n.children.find(c => local(c.name) === 'ID')?.text ?? '';
      let code = '';
      if (ln === 'TenderingCriterionProperty') {
        const type = n.children.find(c => local(c.name) === 'TypeCode')?.text ?? '';
        const vdt = n.children.find(c => local(c.name) === 'ValueDataTypeCode')?.text ?? '';
        code = `${type}/${vdt}`;
      } else {
        code = n.children.find(c => local(c.name) === 'PropertyGroupTypeCode')?.text ?? '';
      }
      rows.push(`${ln} | ${id} | ${code}`);
    }
    for (const c of n.children) walk(c);
  })(node);
  return rows;
}

let failures = 0;
function check (name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}`); console.error('  ' + err.message); }
}

// --- generate the request declaration via the mapper + the embedded structure -

const spec = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'legacy', 'xml-mapping', 'part-IV.request.mapping.json'), 'utf8'));
const instance = {
  partIV: { selectionCriteria: { [CODE]: { requirement: {
    lotIdentifiers: ['LOT-0000'],
    numberOfYears: 3,
    businessDomain: 'IT consulting.',
    minimumAmount: { value: 1000000, currency: 'EUR' }
  } } } }
};
const genRoot = parseXml(map(spec, instance));
const refRoot = parseXml(fs.readFileSync(REFERENCE, 'utf8'));

const genCrit = findNode(genRoot, 'TenderingCriterion', CRITERION_UUID);
const refCrit = findNode(refRoot, 'TenderingCriterion', CRITERION_UUID);

// --- assertions ---------------------------------------------------------------

check('criterion head: UUID + type code present in both', () => {
  assert.ok(genCrit, 'generated criterion not found');
  assert.ok(refCrit, 'reference criterion not found');
  assert.equal(genCrit.children.find(c => local(c.name) === 'CriterionTypeCode')?.text, CODE);
  assert.equal(refCrit.children.find(c => local(c.name) === 'CriterionTypeCode')?.text, CODE);
});

check('lot reference emitted from buyer lotIdentifiers', () => {
  const lot = findNode(genCrit, 'ProcurementProjectLotReference');
  assert.ok(lot, 'no ProcurementProjectLotReference emitted');
  assert.equal(lot.children.find(c => local(c.name) === 'ID')?.text, 'LOT-0000');
});

check('RG1 property-group tree reproduces the reference structure', () => {
  const genRG1 = findNode(genCrit, 'TenderingCriterionPropertyGroup', `C31_${CODE}/RG1`);
  const refRG1 = findNode(refCrit, 'TenderingCriterionPropertyGroup', `C31_${CODE}/RG1`);
  assert.ok(genRG1, 'generated RG1 not found');
  assert.ok(refRG1, 'reference RG1 not found');

  const gen = signature(genRG1);
  const ref = signature(refRG1);

  for (let i = 0; i < ref.length; i++) {
    if (gen[i] !== ref[i]) {
      throw new Error(
        `RG1 subtree diverges at row ${i}:\n    generated: ${gen[i] ?? '<none>'}\n    reference: ${ref[i] ?? '<none>'}`
      );
    }
  }
  assert.ok(gen.length >= ref.length, 'generated tree is smaller than the reference');
  if (gen.length > ref.length) {
    console.log(`    (note: generated tree has ${gen.length - ref.length} additional node(s) from the newer model, e.g. ${gen[ref.length]})`);
  }
});

check('buyer Expected values injected into REQUIREMENT leaves', () => {
  const numYears = findNode(genCrit, 'TenderingCriterionProperty', `C31_${CODE}/RG1/RSG1/RQ1/R1/R1`);
  const minAmt = findNode(genCrit, 'TenderingCriterionProperty', `C31_${CODE}/RG1/RSG1/RQ3/R1/R1`);
  assert.equal(numYears.children.find(c => local(c.name) === 'ExpectedValueNumeric')?.text, '3');
  const amt = minAmt.children.find(c => local(c.name) === 'MinimumAmount');
  assert.equal(amt?.text, '1000000');
  assert.equal(amt?.attributes.currencyID, 'EUR');
});

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll scaffold checks passed.');
