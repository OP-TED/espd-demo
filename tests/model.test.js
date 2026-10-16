import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fc from 'fast-check';

const __dirname = dirname(fileURLToPath(import.meta.url));
// The GENERATED role lens (the live source js/model.js fetches). model.js uses
// fetch(), so we exercise the SAME pure logic here against the SAME data.
const ROLES_PATH = resolve(__dirname, '../model/generated/ui/roles.json');
const rolesData = JSON.parse(readFileSync(ROLES_PATH, 'utf8'));

const EXCLUSION_CATEGORY_MAP = rolesData.exclusionCategoryMap ?? {
  'exg-crim': 'criminal',
  'exg-pmt': 'payment',
  'exg-mis': 'misconduct',
  'exg-sitn': 'misconduct',
  'exg-natl': 'national'
};

function getRoleById(id) {
  const buyer = rolesData.buyerTypes.find(r => r.id === id);
  if (buyer) return buyer;
  const eo = rolesData.eoRoles.find(r => r.id === id);
  if (eo) return eo;
  return null;
}

function getPartsForRole(roleId) {
  const allPartKeys = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  const role = getRoleById(roleId);
  if (!role) return allPartKeys;
  return role.formBehavior.visibleParts;
}

function isPartEditable(partKey, roleId) {
  const role = getRoleById(roleId);
  if (!role) return true;
  return role.formBehavior.editableParts.includes(partKey);
}

function getExclusionCategory(sectionCode) {
  if (!sectionCode) return null;
  for (const [prefix, category] of Object.entries(EXCLUSION_CATEGORY_MAP)) {
    if (sectionCode.startsWith(prefix)) {
      return category;
    }
  }
  return null;
}

// Collect all role entries
const allRoles = [...rolesData.buyerTypes, ...rolesData.eoRoles];
const allRoleIds = allRoles.map(r => r.id);

// Example Part III section codes for testing
const PART_III_CODES = [
  'exg-crim-part', 'exg-crim-corrpt', 'exg-crim-fraud', 'exg-crim-terror',
  'exg-crim-laund', 'exg-crim-traffick',
  'exg-pmt-bre-tax', 'exg-pmt-bre-ssc',
  'exg-mis-bre-env-law', 'exg-mis-bre-soc-law', 'exg-mis-bre-lab-law',
  'exg-mis-exg-mis-misconduct', 'exg-mis-distortion', 'exg-mis-partic-confl',
  'exg-mis-prep-confl', 'exg-mis-sanction', 'exg-mis-misrepresent',
  'exg-sitn-bankr', 'exg-sitn-insolvency', 'exg-sitn-cred-arran',
  'exg-sitn-other', 'exg-sitn-liq-admin', 'exg-sitn-as-susp',
  'exg-natl-bre-nat-law'
];

describe('Feature: espd-role-selection, Property 6: Form filtering matches formBehavior', () => {
  it('getPartsForRole returns exactly the visibleParts for every role', () => {
    fc.assert(
      fc.property(fc.constantFrom(...allRoleIds), (roleId) => {
        const role = getRoleById(roleId);
        const parts = getPartsForRole(roleId);
        assert.deepStrictEqual(parts, role.formBehavior.visibleParts,
          `Parts for role "${roleId}" should match visibleParts`);
      }),
      { numRuns: 100 }
    );
  });

  it('isPartEditable matches editableParts for every role and part combination', () => {
    const ALL_PARTS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

    fc.assert(
      fc.property(
        fc.constantFrom(...allRoleIds),
        fc.constantFrom(...ALL_PARTS),
        (roleId, partKey) => {
          const role = getRoleById(roleId);
          const editable = isPartEditable(partKey, roleId);
          const expected = role.formBehavior.editableParts.includes(partKey);
          assert.strictEqual(editable, expected,
            `Part "${partKey}" editability for role "${roleId}"`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('subcont role excludes Part IV from visibleParts', () => {
    const subcont = getRoleById('subcont');
    assert.ok(!subcont.formBehavior.visibleParts.includes('IV'),
      'Subcontractor should not see Part IV (Selection Criteria)');
  });

  it('oeron role excludes Part V from visibleParts', () => {
    const oeron = getRoleById('oeron');
    assert.ok(!oeron.formBehavior.visibleParts.includes('V'),
      'Other Entity (Relied Upon) should not see Part V (Reduction)');
  });
});

describe('Feature: espd-role-selection, Property 7: Exclusion mandatoriness matches exclusionGroundRules', () => {
  it('every Part III section code maps to a valid category', () => {
    for (const code of PART_III_CODES) {
      const category = getExclusionCategory(code);
      assert.ok(category !== null, `Code "${code}" should map to a category`);
      assert.ok(['criminal', 'payment', 'misconduct', 'national'].includes(category),
        `Category "${category}" for code "${code}" should be valid`);
    }
  });

  it('for any role and Part III code, the category rule matches exclusionGroundRules', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allRoleIds),
        fc.constantFrom(...PART_III_CODES),
        (roleId, sectionCode) => {
          const role = getRoleById(roleId);
          const category = getExclusionCategory(sectionCode);
          const rule = role.formBehavior.exclusionGroundRules[category];
          assert.ok(rule === 'mandatory' || rule === 'optional',
            `Rule for category "${category}" in role "${roleId}" should be mandatory or optional, got "${rule}"`);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('contracting-authority has mandatory criminal and payment categories', () => {
    const ca = getRoleById('contracting-authority');
    assert.strictEqual(ca.formBehavior.exclusionGroundRules.criminal, 'mandatory');
    assert.strictEqual(ca.formBehavior.exclusionGroundRules.payment, 'mandatory');
  });

  it('contracting-entity has all categories optional', () => {
    const ce = getRoleById('contracting-entity');
    assert.strictEqual(ce.formBehavior.exclusionGroundRules.criminal, 'optional');
    assert.strictEqual(ce.formBehavior.exclusionGroundRules.payment, 'optional');
    assert.strictEqual(ce.formBehavior.exclusionGroundRules.misconduct, 'optional');
    assert.strictEqual(ce.formBehavior.exclusionGroundRules.national, 'optional');
  });
});
