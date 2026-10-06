// Task 3.4 test — generated C31 XML validates against the ESPD Schematron.
//
// Skips gracefully (exit 0) if Java/Saxon are unavailable.
//
// Usage: node schematron-validate.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { loadValidatedRegistry } from './value-type-registry.mjs';
import { generateRequestMapping } from './generate-request-mapping.mjs';
import { generateResponseMapping } from './generate-response-mapping.mjs';
import { map } from '../xml-mapping/mapper.mjs';
import { loadValidatedCodelistProfile } from './codelist-attributes.mjs';
import { checkSaxonAvailable, validateXml, parseSvrl, expandCodelistAttributes, wrapRequestDocument } from './schematron-validate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const CODE = 'slc-stand-to-spec-avg';

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n').slice(0, 6).join('\n')}`); }
}

// SVRL parser works without Saxon.
check('parseSvrl extracts flag/location/text from a failed-assert', () => {
  const svrl = `<svrl:schematron-output xmlns:svrl="http://purl.oclc.org/dsdl/svrl">` +
    `<svrl:failed-assert test="x" location="/a/b" flag="fatal"><svrl:text>Boom</svrl:text></svrl:failed-assert>` +
    `</svrl:schematron-output>`;
  const f = parseSvrl(svrl, 'test.xsl');
  assert.equal(f.length, 1);
  assert.equal(f[0].flag, 'fatal');
  assert.equal(f[0].location, '/a/b');
  assert.equal(f[0].text, 'Boom');
});

if (!checkSaxonAvailable()) {
  console.log('\u26a0 Java/Saxon unavailable — skipping Schematron validation (parser test still ran).');
  if (failures) process.exit(1);
  console.log('\nSchematron parser test passed (validation skipped).');
  process.exit(0);
}

const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(fs.readFileSync(path.join(here, 'sources', `${CODE}.sidecar.json`), 'utf8'));
const criterion = overlayEnrichment(core, sidecar);
const { registry } = loadValidatedRegistry();
const requestSpec = generateRequestMapping(criterion, registry);
const responseSpec = generateResponseMapping(criterion, registry);

const requirement = {
  lotIdentifiers: ['LOT-0000'],
  numberOfYears: 3,
  businessDomain: 'Construction works.',
  minimumAmount: { value: 5000000, currency: 'EUR' },
};
const response = {
  fulfilledByItself: true,
  turnover: { period: { startDate: '2021-01-01', endDate: '2023-12-31' }, amount: { value: 2500000, currency: 'EUR' } },
};

const { profile: codelistProfile } = loadValidatedCodelistProfile();
const requestXml = map(requestSpec, { partIV: { selectionCriteria: { [CODE]: { requirement } } } });

// Attribute expansion turns shorthand into the full Schematron attribute set.
check('expandCodelistAttributes turns shorthand listID into the full set', () => {
  const expanded = expandCodelistAttributes(requestXml, codelistProfile);
  assert.ok(expanded.includes('listVersionID="5.0.0"'), 'expected expanded listVersionID');
  assert.ok(expanded.includes('schemeAgencyID="OP"'), 'expected expanded schemeAgencyID on cbc:ID');
  // No bare shorthand listID left on CriterionTypeCode.
  assert.ok(!/<cbc:CriterionTypeCode[^>]*listID="criterion"[^>]*>/.test(expanded), 'shorthand listID must be expanded');
});

// Full-document validation: wrap the generated criterion into the BASE request
// envelope, expand attributes, and validate. The codelist-attribute rules on
// our generated criterion must pass.
check('wrapped+expanded request document passes ALL attribute rules on the generated criterion', () => {
  const doc = wrapRequestDocument(requestXml, codelistProfile);
  const { errors, warnings, findings } = validateXml(doc, 'request');
  // Every attribute-mandating rule (codelist-attribute + common-other attribute
  // asserts) must pass on our generated criterion.
  const attrErrors = errors.filter(e =>
    e.validator.includes('cl-attributes') || /attribute .* is mandatory/.test(e.text));
  console.log(`    wrapped request: ${findings.length} findings (${errors.length} fatal, ${warnings.length} warn); attribute fatal: ${attrErrors.length}`);
  if (attrErrors.length) for (const e of attrErrors.slice(0, 5)) console.log('      !', e.location, '|', e.text.slice(0, 80));
  assert.equal(attrErrors.length, 0, 'all attribute rules must pass on the generated criterion');

  // The only residual fatal findings are documented non-generator issues:
  //   - "UUIDs supplied by e-Certis" on groups (C31 uses path-like IDs, as does
  //     the hand-authored baseline and the EA export for selection criteria);
  //   - a cross-criterion document composition rule (artifact of splicing only
  //     C31 into the multi-criterion BASE document).
  const residual = errors.filter(e => !attrErrors.includes(e));
  const unexpected = residual.filter(e =>
    !/e-Certis/i.test(e.text) && !/Part III/.test(e.text));
  assert.equal(unexpected.length, 0,
    `unexpected non-attribute fatal findings:\n${unexpected.map(e => '  ' + e.validator + ': ' + e.text.slice(0, 100)).join('\n')}`);
});

// Response: diagnostic only (full response-document wrapping — responses +
// evidence span multiple document sections — is out of scope for 3.4's splice).
check('response XML runs through the ESPD Schematron (diagnostic)', () => {
  const responseXml = map(responseSpec, { partIV: { selectionCriteria: { [CODE]: { response } } } });
  const expanded = expandCodelistAttributes(responseXml, codelistProfile);
  const { errors, warnings, findings } = validateXml(expanded, 'response');
  console.log(`    response (fragment): ${findings.length} findings (${errors.length} fatal, ${warnings.length} warn)`);
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll Schematron-validate tests passed.');
