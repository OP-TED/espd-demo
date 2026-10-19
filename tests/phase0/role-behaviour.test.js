// Role-driven form behaviour — golden per-role outcomes.
// js/model.js derives visibleParts / editableParts / mandatory-criterion rules
// from the GENERATED role lens (model/generated/ui/roles.json) via
// getPartsForRole / isPartEditable / isCriterionMandatory. Originally a Phase 0
// characterization snapshot read from the legacy espd-edm/roles.json; repointed
// at the generated lens after the Phase 4/5 cutover (the legacy dir is gone).
// model/compiler/roles.test.mjs guards that the generated lens is in sync with
// its authored source; this file pins the per-role OUTCOMES the UI shows.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const roles = JSON.parse(readFileSync(resolve(here, '../../model/generated/ui/roles.json'), 'utf8'));

// --- logic mirrored from js/model.js -------------------------------------
// The exclusion-category map is carried in the generated lens; fall back to the
// known map if an older lens is read.
const EXCLUSION_CATEGORY_MAP = roles.exclusionCategoryMap ?? {
  'exg-crim': 'criminal',
  'exg-pmt': 'payment',
  'exg-mis': 'misconduct',
  'exg-sitn': 'misconduct',
  'exg-natl': 'national',
};
const PART_KEYS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

function getRoleById(id) {
  return roles.buyerTypes.find(r => r.id === id) || roles.eoRoles.find(r => r.id === id) || null;
}
function getPartsForRole(id) {
  const r = getRoleById(id);
  return r ? r.formBehavior.visibleParts : PART_KEYS;
}
function isPartEditable(partKey, id) {
  const r = getRoleById(id);
  return r ? r.formBehavior.editableParts.includes(partKey) : true;
}
function getExclusionCategory(code) {
  if (!code) return null;
  for (const [prefix, cat] of Object.entries(EXCLUSION_CATEGORY_MAP)) {
    if (code.startsWith(prefix)) return cat;
  }
  return null;
}
function isCriterionMandatory(code, id) {
  const cat = getExclusionCategory(code);
  if (!cat) return false;
  const r = getRoleById(id);
  return r?.formBehavior?.exclusionGroundRules?.[cat] === 'mandatory';
}

// --- golden per-role outcomes (CURRENT behaviour) ------------------------

describe('phase0: role registry — structure', () => {
  it('has the expected buyer + EO role ids', () => {
    assert.deepEqual(roles.buyerTypes.map(r => r.id), ['contracting-authority', 'contracting-entity']);
    assert.deepEqual(roles.eoRoles.map(r => r.id),
      ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont']);
  });

  it('every role has documentType, visibleParts, editableParts, exclusionGroundRules; EO roles carry xmlMapping', () => {
    for (const r of [...roles.buyerTypes, ...roles.eoRoles]) {
      assert.ok(['request', 'response'].includes(r.documentType), `${r.id} documentType`);
      assert.ok(Array.isArray(r.formBehavior.visibleParts), `${r.id} visibleParts`);
      assert.ok(Array.isArray(r.formBehavior.editableParts), `${r.id} editableParts`);
      assert.ok(r.formBehavior.exclusionGroundRules, `${r.id} exclusionGroundRules`);
      // EO roles serialise via xmlMapping; buyer types are structural and carry none.
      if (r.documentType === 'response') {
        assert.ok(r.xmlMapping?.element && r.xmlMapping?.code, `${r.id} xmlMapping`);
      } else {
        assert.equal(r.xmlMapping, undefined, `${r.id} (buyer) must not carry xmlMapping`);
      }
      // editableParts must be a subset of visibleParts
      for (const p of r.formBehavior.editableParts) {
        assert.ok(r.formBehavior.visibleParts.includes(p), `${r.id} editable ${p} is visible`);
      }
    }
  });
});

describe('phase0: role behaviour — visibleParts per role (golden)', () => {
  const expected = {
    'contracting-authority': ['I', 'III', 'IV', 'V', 'VI'],
    'contracting-entity': ['I', 'III', 'IV', 'V', 'VI'],
    'sole-tenderer': ['I', 'II', 'III', 'IV', 'V', 'VI'],
    'group-lead': ['I', 'II', 'III', 'IV', 'V', 'VI'],
    'group-mem': ['I', 'II', 'III', 'IV', 'VI'],
    'oeron': ['I', 'II', 'III', 'VI'],
    'subcont': ['I', 'II', 'III', 'VI'],
  };
  for (const [id, parts] of Object.entries(expected)) {
    it(`${id} sees parts ${parts.join(',')}`, () => {
      assert.deepEqual(getPartsForRole(id), parts);
    });
  }

  it('an unknown role falls back to all six parts', () => {
    assert.deepEqual(getPartsForRole('nobody'), PART_KEYS);
  });
});

describe('phase0: role behaviour — mandatory exclusion grounds (golden)', () => {
  // Section-code category mapping is prefix-based.
  it('maps exclusion-ground codes to categories', () => {
    assert.equal(getExclusionCategory('exg-crim-part'), 'criminal');
    assert.equal(getExclusionCategory('exg-pmt-bre-tax'), 'payment');
    assert.equal(getExclusionCategory('exg-mis-distortion'), 'misconduct');
    assert.equal(getExclusionCategory('exg-sitn-bankr'), 'misconduct');
    assert.equal(getExclusionCategory('exg-natl-bre-nat-law'), 'national');
    assert.equal(getExclusionCategory('slc-suit-reg-prof'), null); // not an exclusion ground
  });

  // Policy: all exclusion grounds are mandatory for every role, buyers included
  // (the economic operator must answer every ground, so the buyer always
  // includes them and cannot uncheck).
  it('contracting-authority: all four exclusion categories mandatory', () => {
    for (const code of ['exg-crim-part', 'exg-pmt-bre-tax', 'exg-mis-distortion', 'exg-natl-bre-nat-law']) {
      assert.equal(isCriterionMandatory(code, 'contracting-authority'), true, code);
    }
  });

  it('contracting-entity: all four exclusion categories mandatory', () => {
    for (const code of ['exg-crim-part', 'exg-pmt-bre-tax', 'exg-mis-distortion', 'exg-natl-bre-nat-law']) {
      assert.equal(isCriterionMandatory(code, 'contracting-entity'), true, code);
    }
  });

  it('every EO role: all four exclusion categories mandatory', () => {
    for (const id of ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont']) {
      for (const code of ['exg-crim-part', 'exg-pmt-bre-tax', 'exg-mis-distortion', 'exg-natl-bre-nat-law']) {
        assert.equal(isCriterionMandatory(code, id), true, `${id} / ${code}`);
      }
    }
  });

  it('a selection criterion is never "mandatory" via exclusion rules', () => {
    assert.equal(isCriterionMandatory('slc-suit-reg-prof', 'sole-tenderer'), false);
  });
});

describe('phase0: role behaviour — editability (golden)', () => {
  it('buyers cannot edit Part VI; EOs can edit Parts II and VI', () => {
    assert.equal(isPartEditable('VI', 'contracting-authority'), false);
    assert.equal(isPartEditable('I', 'contracting-authority'), true);
    assert.equal(isPartEditable('II', 'sole-tenderer'), true);
    assert.equal(isPartEditable('VI', 'sole-tenderer'), true);
    // EOs do NOT edit Part I (buyer-authored procedure info)
    assert.equal(isPartEditable('I', 'sole-tenderer'), false);
  });
});
