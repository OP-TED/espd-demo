/**
 * Automated tests for mandatoryInRequest property on CRITERION objects.
 *
 * Verifies:
 *  1. Every CRITERION has mandatoryInRequest
 *  2. The value is always Boolean
 *  3. Exactly 8 criteria have the value true
 *  4. The expected 8 criterion codes are marked true
 *  5. No other criteria are marked true
 *  6. The updated model validates against the updated JSON Schema
 *  7. Validation fails when mandatoryInRequest is missing from a criterion
 *  8. Validation fails when mandatoryInRequest has a non-Boolean value
 *
 * Usage:
 *   node test-mandatory.cjs
 *
 * Exit codes:
 *   0 = all tests pass
 *   1 = one or more tests fail
 */

const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const schemasDir = path.join(baseDir, 'schemas');
const partsDir = path.join(baseDir, 'parts');

// The 8 mandatory criteria identified by code
const MANDATORY_CODES = [
  'exg-crim-part',
  'exg-crim-corrpt',
  'exg-crim-fraud',
  'exg-crim-terror',
  'exg-crim-laund',
  'exg-crim-traffick',
  'exg-pmt-bre-tax',
  'exg-pmt-bre-ssc'
];

const MANDATORY_UUIDS = [
  '005eb9ed-1347-4ca3-bb29-9bc0db64e1ab',
  'c27b7c4e-c837-4529-b867-ed55ce639db5',
  '297d2323-3ede-424e-94bc-a91561e6f320',
  'd486fb70-86b3-4e75-97f2-0d71b5697c7d',
  '47112079-6fec-47a3-988f-e561668c3aef',
  'd789d01a-fe03-4ccd-9898-73f9cfa080d1',
  'b61bbeb7-690e-4a40-bc68-d6d4ecfaa3d4',
  '7d85e333-bbab-49c0-be8d-c36d71a72f5e'
];

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.log(`  ✗ ${message}`);
    failed++;
  }
}

// --- Load all criteria from model ---

function collectCriteria(obj, results = []) {
  if (obj && typeof obj === 'object') {
    if (obj.type === 'CRITERION') {
      results.push(obj);
    }
    if (Array.isArray(obj.sections)) {
      for (const s of obj.sections) collectCriteria(s, results);
    }
    if (Array.isArray(obj.components)) {
      for (const c of obj.components) collectCriteria(c, results);
    }
  }
  return results;
}

const partFiles = fs.readdirSync(partsDir).filter(f => f.endsWith('.json'));
const allCriteria = [];

for (const file of partFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(partsDir, file), 'utf8'));
  collectCriteria(data, allCriteria);
}

console.log('Test: mandatoryInRequest property on CRITERION objects\n');
console.log(`Found ${allCriteria.length} CRITERION objects across all parts.\n`);

// Test 1: Every CRITERION has mandatoryInRequest
const allHaveProperty = allCriteria.every(c => 'mandatoryInRequest' in c);
assert(allHaveProperty, 'Every CRITERION has mandatoryInRequest property');

// Test 2: The value is always Boolean
const allBoolean = allCriteria.every(c => typeof c.mandatoryInRequest === 'boolean');
assert(allBoolean, 'mandatoryInRequest is always a boolean value');

// Test 3: Exactly 8 criteria have mandatoryInRequest: true
const trueCount = allCriteria.filter(c => c.mandatoryInRequest === true).length;
assert(trueCount === 8, `Exactly 8 criteria have mandatoryInRequest: true (found ${trueCount})`);

// Test 4: The expected 8 criterion codes are marked true
const trueCodes = allCriteria
  .filter(c => c.mandatoryInRequest === true)
  .map(c => c.code)
  .sort();
const expectedCodes = [...MANDATORY_CODES].sort();
const codesMatch = JSON.stringify(trueCodes) === JSON.stringify(expectedCodes);
assert(codesMatch, `The expected 8 criterion codes are marked true`);
if (!codesMatch) {
  console.log(`    Expected: ${JSON.stringify(expectedCodes)}`);
  console.log(`    Got:      ${JSON.stringify(trueCodes)}`);
}

// Test 4b: The expected 8 criterion UUIDs are marked true
const trueUUIDs = allCriteria
  .filter(c => c.mandatoryInRequest === true)
  .map(c => c.uuid)
  .sort();
const expectedUUIDs = [...MANDATORY_UUIDS].sort();
const uuidsMatch = JSON.stringify(trueUUIDs) === JSON.stringify(expectedUUIDs);
assert(uuidsMatch, 'The expected 8 criterion UUIDs are marked true');

// Test 5: No other criteria are marked true
const unexpectedTrue = allCriteria.filter(c => c.mandatoryInRequest === true && !MANDATORY_CODES.includes(c.code));
assert(unexpectedTrue.length === 0, `No unexpected criteria are marked true (found ${unexpectedTrue.length})`);

// Test 6: Model validates against updated JSON Schema
const componentSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'component.schema.json'), 'utf8'));
const sectionSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'section.schema.json'), 'utf8'));
const partSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'part.schema.json'), 'utf8'));
const metadataSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'metadata.schema.json'), 'utf8'));
const indexSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'index.schema.json'), 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(componentSchema, 'component.schema.json');
ajv.addSchema(sectionSchema, 'section.schema.json');
ajv.addSchema(partSchema, 'part.schema.json');
ajv.addSchema(metadataSchema, 'metadata.schema.json');
ajv.addSchema(indexSchema, 'index.schema.json');

let allValid = true;
for (const file of partFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(partsDir, file), 'utf8'));
  const validate = ajv.getSchema('part.schema.json');
  if (!validate(data)) {
    allValid = false;
    console.log(`    Validation failed for ${file}:`);
    validate.errors.forEach(err => console.log(`      ${err.instancePath} ${err.message}`));
  }
}
assert(allValid, 'All part files validate against updated JSON Schema');

// Test 7: Validation fails when mandatoryInRequest is missing from a criterion
const testPartMissing = JSON.parse(fs.readFileSync(path.join(partsDir, 'part-III-exclusion.json'), 'utf8'));
// Remove mandatoryInRequest from first criterion
delete testPartMissing.sections[0].mandatoryInRequest;
const validateMissing = ajv.getSchema('part.schema.json');
const missingResult = validateMissing(testPartMissing);
assert(!missingResult, 'Validation fails when mandatoryInRequest is missing from a CRITERION');

// Test 8: Validation fails when mandatoryInRequest has a non-Boolean value
const testPartWrongType = JSON.parse(fs.readFileSync(path.join(partsDir, 'part-III-exclusion.json'), 'utf8'));
testPartWrongType.sections[0].mandatoryInRequest = 'yes';
const validateWrongType = ajv.getSchema('part.schema.json');
const wrongTypeResult = validateWrongType(testPartWrongType);
assert(!wrongTypeResult, 'Validation fails when mandatoryInRequest has a non-Boolean value (string)');

// Test 8b: Also test numeric
const testPartNumeric = JSON.parse(fs.readFileSync(path.join(partsDir, 'part-III-exclusion.json'), 'utf8'));
testPartNumeric.sections[0].mandatoryInRequest = 1;
const numericResult = ajv.getSchema('part.schema.json')(testPartNumeric);
assert(!numericResult, 'Validation fails when mandatoryInRequest has a non-Boolean value (number)');

// Test 8c: Also test null
const testPartNull = JSON.parse(fs.readFileSync(path.join(partsDir, 'part-III-exclusion.json'), 'utf8'));
testPartNull.sections[0].mandatoryInRequest = null;
const nullResult = ajv.getSchema('part.schema.json')(testPartNull);
assert(!nullResult, 'Validation fails when mandatoryInRequest has a non-Boolean value (null)');

// --- Summary ---
console.log(`\n${passed + failed} tests, ${passed} passed, ${failed} failed.`);
process.exit(failed === 0 ? 0 : 1);
