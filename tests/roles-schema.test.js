import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import fc from 'fast-check';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = resolve(__dirname, '../espd-edm/schemas/roles.schema.json');
const ROLES_PATH = resolve(__dirname, '../espd-edm/roles.json');

const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
const rolesData = JSON.parse(readFileSync(ROLES_PATH, 'utf8'));

function createAjv() {
  return new Ajv({ allErrors: true });
}

// Valid values for generating conforming entries
const VALID_PART_KEYS = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const VALID_EXCLUSION_RULES = ['mandatory', 'optional'];
const VALID_DOC_TYPES = ['request', 'response'];
const VALID_BUYER_IDS = ['contracting-authority', 'contracting-entity'];
const VALID_EO_IDS = ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont'];
const ALL_VALID_IDS = [...VALID_BUYER_IDS, ...VALID_EO_IDS];

// Arbitrary generators for valid role entries
const validFormBehaviorArb = fc.record({
  visibleParts: fc.uniqueArray(fc.constantFrom(...VALID_PART_KEYS), { minLength: 1, maxLength: 6 }),
  editableParts: fc.uniqueArray(fc.constantFrom(...VALID_PART_KEYS), { minLength: 0, maxLength: 6 }),
  exclusionGroundRules: fc.record({
    criminal: fc.constantFrom(...VALID_EXCLUSION_RULES),
    payment: fc.constantFrom(...VALID_EXCLUSION_RULES),
    misconduct: fc.constantFrom(...VALID_EXCLUSION_RULES),
    national: fc.constantFrom(...VALID_EXCLUSION_RULES)
  })
});

const validXmlMappingArb = fc.record({
  element: fc.string({ minLength: 1, maxLength: 100 }),
  code: fc.string({ minLength: 1, maxLength: 50 })
});

const validBuyerRoleArb = fc.record({
  id: fc.constantFrom(...VALID_BUYER_IDS),
  label: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ maxLength: 200 }),
  documentType: fc.constant('request'),
  formBehavior: validFormBehaviorArb,
  xmlMapping: validXmlMappingArb
});

const validEoRoleArb = fc.record({
  id: fc.constantFrom(...VALID_EO_IDS),
  label: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ maxLength: 200 }),
  documentType: fc.constant('response'),
  formBehavior: validFormBehaviorArb,
  xmlMapping: validXmlMappingArb
});

describe('Feature: espd-role-selection, Property 1: Role validation rejects incomplete entries', () => {
  const REQUIRED_FIELDS = ['id', 'label', 'description', 'documentType', 'formBehavior', 'xmlMapping'];

  it('removing any required field from a buyer role produces validation errors', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);

    fc.assert(
      fc.property(
        validBuyerRoleArb,
        fc.constantFrom(...REQUIRED_FIELDS),
        (role, fieldToRemove) => {
          const incomplete = { ...role };
          delete incomplete[fieldToRemove];

          const rolesFile = { buyerTypes: [incomplete], eoRoles: [] };
          const valid = validate(rolesFile);
          assert.strictEqual(valid, false, `Should reject when "${fieldToRemove}" is missing`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('removing any required field from an EO role produces validation errors', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);

    fc.assert(
      fc.property(
        validEoRoleArb,
        fc.constantFrom(...REQUIRED_FIELDS),
        (role, fieldToRemove) => {
          const incomplete = { ...role };
          delete incomplete[fieldToRemove];

          const rolesFile = { buyerTypes: [], eoRoles: [incomplete] };
          const valid = validate(rolesFile);
          assert.strictEqual(valid, false, `Should reject when "${fieldToRemove}" is missing`);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: espd-role-selection, Property 2: Schema rejects invalid enum values', () => {
  // Generate strings that are NOT in the valid enum sets
  const invalidPartKeyArb = fc.string({ minLength: 1, maxLength: 10 })
    .filter(s => !VALID_PART_KEYS.includes(s));

  const invalidDocTypeArb = fc.string({ minLength: 1, maxLength: 20 })
    .filter(s => !VALID_DOC_TYPES.includes(s));

  const invalidExclusionRuleArb = fc.string({ minLength: 1, maxLength: 20 })
    .filter(s => !VALID_EXCLUSION_RULES.includes(s));

  it('rejects roles with invalid documentType values', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);

    fc.assert(
      fc.property(invalidDocTypeArb, (badDocType) => {
        const rolesFile = {
          buyerTypes: [{
            id: 'contracting-authority',
            label: 'Test',
            description: 'Test',
            documentType: badDocType,
            formBehavior: {
              visibleParts: ['I'],
              editableParts: ['I'],
              exclusionGroundRules: { criminal: 'mandatory', payment: 'mandatory', misconduct: 'optional', national: 'optional' }
            },
            xmlMapping: { element: 'test', code: 'test' }
          }],
          eoRoles: []
        };
        const valid = validate(rolesFile);
        assert.strictEqual(valid, false, `Should reject documentType "${badDocType}"`);
      }),
      { numRuns: 50 }
    );
  });

  it('rejects roles with invalid visibleParts values', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);

    fc.assert(
      fc.property(invalidPartKeyArb, (badPart) => {
        const rolesFile = {
          buyerTypes: [{
            id: 'contracting-authority',
            label: 'Test',
            description: 'Test',
            documentType: 'request',
            formBehavior: {
              visibleParts: [badPart],
              editableParts: [],
              exclusionGroundRules: { criminal: 'mandatory', payment: 'mandatory', misconduct: 'optional', national: 'optional' }
            },
            xmlMapping: { element: 'test', code: 'test' }
          }],
          eoRoles: []
        };
        const valid = validate(rolesFile);
        assert.strictEqual(valid, false, `Should reject visibleParts value "${badPart}"`);
      }),
      { numRuns: 50 }
    );
  });

  it('rejects roles with invalid exclusionGroundRules values', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);

    fc.assert(
      fc.property(invalidExclusionRuleArb, (badRule) => {
        const rolesFile = {
          buyerTypes: [{
            id: 'contracting-authority',
            label: 'Test',
            description: 'Test',
            documentType: 'request',
            formBehavior: {
              visibleParts: ['I'],
              editableParts: [],
              exclusionGroundRules: { criminal: badRule, payment: 'mandatory', misconduct: 'optional', national: 'optional' }
            },
            xmlMapping: { element: 'test', code: 'test' }
          }],
          eoRoles: []
        };
        const valid = validate(rolesFile);
        assert.strictEqual(valid, false, `Should reject exclusionGroundRules value "${badRule}"`);
      }),
      { numRuns: 50 }
    );
  });
});

describe('Feature: espd-role-selection, Property 11: Valid entries pass schema', () => {
  it('the actual roles.json file passes schema validation', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);
    const valid = validate(rolesData);
    assert.strictEqual(valid, true, `roles.json should be valid: ${JSON.stringify(validate.errors)}`);
  });

  it('any conforming roles file passes schema validation', () => {
    const ajv = createAjv();
    const validate = ajv.compile(schema);

    fc.assert(
      fc.property(
        fc.record({
          buyerTypes: fc.array(validBuyerRoleArb, { minLength: 1, maxLength: 3 }),
          eoRoles: fc.array(validEoRoleArb, { minLength: 1, maxLength: 5 })
        }),
        (rolesFile) => {
          const valid = validate(rolesFile);
          assert.strictEqual(valid, true, `Should validate: ${JSON.stringify(validate.errors)}`);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Feature: espd-role-selection, Property 4: Roles JSON round-trip integrity', () => {
  it('parse/stringify/parse produces equivalent object for actual roles.json', () => {
    const roundTripped = JSON.parse(JSON.stringify(rolesData));
    assert.deepStrictEqual(roundTripped, rolesData);
  });

  it('any valid roles file survives JSON round-trip', () => {
    fc.assert(
      fc.property(
        fc.record({
          buyerTypes: fc.array(validBuyerRoleArb, { minLength: 1, maxLength: 3 }),
          eoRoles: fc.array(validEoRoleArb, { minLength: 1, maxLength: 5 })
        }, { withDeletedKeys: false, noNullPrototype: true }),
        (rolesFile) => {
          // Normalize to plain objects (fast-check generates null-prototype records)
          const normalized = JSON.parse(JSON.stringify(rolesFile));
          const roundTripped = JSON.parse(JSON.stringify(normalized));
          assert.deepStrictEqual(roundTripped, normalized);
        }
      ),
      { numRuns: 100 }
    );
  });
});
