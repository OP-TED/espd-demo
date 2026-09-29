// EXPERIMENTAL — structural test for the C31 request-declaration scaffold.
//
// The generator (scaffold.mjs) projects the criterion definition from the lean
// criteria-scaffold.json into a cac:TenderingCriterion request declaration. This
// test checks that projection STRUCTURALLY against the authoritative reference
// document the ESPD validator itself uses as the canonical criterion tree:
//   espd-validation-schematron/ESPDRequest/xsl/ESPD-criterion.xml
//
// We compare the ORDERED tree of (element localName + cbc:ID + governing code)
// for C31's RG1 property-group subtree — the part the scaffold authoritatively
// owns. We deliberately do NOT compare:
//   - namespaces / scheme attributes (differ by nothing meaningful here) or the
//     descriptions/placeholder values,
//   - the national SubTenderingCriterion INNER content (deferred TODO: the
//     scaffold's SBC1 is an empty shell; the reference materialises a sample),
//   - the exact criterion-head Name/Description text (informational).
// The criterion head (UUID, type code) and the property-group tree (ids, group
// type codes, property type + value-data-type codes) ARE asserted.
//
// Usage: node scaffold-part-IV.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { parseXml } from './mapper.mjs';
import { generateRequestScaffold } from './scaffold.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REFERENCE = path.resolve(
  __dirname, '..', '..', '..', 'espd-validation-schematron', 'ESPDRequest', 'xsl', 'ESPD-criterion.xml'
);
const CODE = 'slc-stand-to-spec-avg';
const CRITERION_UUID = 'd3dfb714-f558-4512-bbc5-e456fa2339de';

/** localName without namespace prefix. */
function local (name) {
  return name.includes(':') ? name.split(':')[1] : name;
}

/** Find the first descendant node matching a localName + optional id text. */
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

/**
 * Extract an ordered "structural signature" of a property-group subtree:
 * for each group / subgroup / property, a tuple of
 *   <element> | <cbc:ID> | <governing code>
 * in document order. The governing code is PropertyGroupTypeCode for groups and
 * "TypeCode/ValueDataTypeCode" for properties. Descriptions and Expected*
 * values are ignored (structure, not content).
 */
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

// --- generate + parse both sides ---------------------------------------------

const generatedXml = generateRequestScaffold(CODE, {
  lotIdentifiers: ['LOT-0000'],
  numberOfYears: 3,
  businessDomain: 'IT consulting.',
  minimumAmount: { value: 1000000, currency: 'EUR' }
});
const genRoot = parseXml(generatedXml);
const refRoot = parseXml(fs.readFileSync(REFERENCE, 'utf8'));

const genCrit = findNode(genRoot, 'TenderingCriterion', CRITERION_UUID);
const refCrit = findNode(refRoot, 'TenderingCriterion', CRITERION_UUID);

// --- assertions ---------------------------------------------------------------

check('criterion head: UUID + type code present in both', () => {
  assert.ok(genCrit, 'generated criterion not found');
  assert.ok(refCrit, 'reference criterion not found');
  const genType = genCrit.children.find(c => local(c.name) === 'CriterionTypeCode')?.text;
  const refType = refCrit.children.find(c => local(c.name) === 'CriterionTypeCode')?.text;
  assert.equal(genType, CODE);
  assert.equal(refType, CODE);
});

check('lot reference emitted from buyer lotIdentifiers', () => {
  const lot = findNode(genCrit, 'ProcurementProjectLotReference');
  assert.ok(lot, 'no ProcurementProjectLotReference emitted');
  const id = lot.children.find(c => local(c.name) === 'ID')?.text;
  assert.equal(id, 'LOT-0000');
});

check('RG1 property-group tree reproduces the reference structure', () => {
  const genRG1 = findNode(genCrit, 'TenderingCriterionPropertyGroup', `C31_${CODE}/RG1`);
  const refRG1 = findNode(refCrit, 'TenderingCriterionPropertyGroup', `C31_${CODE}/RG1`);
  assert.ok(genRG1, 'generated RG1 not found');
  assert.ok(refRG1, 'reference RG1 not found');

  const gen = signature(genRG1);
  const ref = signature(refRG1);

  // The bundled ESPD-criterion.xml is an OLDER ESPD-EDM snapshot than the
  // freshly-exported espd-edm.json the scaffold is built from (e.g. C31 gained a
  // QSG4 evidence block in the newer version). So we assert the reference tree
  // is reproduced as an exact PREFIX of the generated tree: every node the
  // authoritative reference declares must appear, in order, with the same id and
  // governing code; the generator may then carry ADDITIONAL trailing nodes from
  // the newer model. This proves faithful reproduction without pinning us to the
  // stale snapshot.
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
  // REQUIREMENT property ids carry the /R1/R1 request suffix (see propertyId()).
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
