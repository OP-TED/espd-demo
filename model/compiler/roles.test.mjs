// Phase 1 — role registry compiler tests.
//
// Three concerns:
//   1. Validation: the authored registry passes validateRoleRegistry, and a set
//      of representative malformations are each rejected.
//   2. Behaviour parity: form behaviour re-derived from the GENERATED lens
//      reproduces the Phase 0 role-behaviour goldens exactly (the port must not
//      change what the UI does).
//   3. Staleness guard: the committed model/generated/ui/roles.json + i18n
//      catalogue match a fresh in-memory build (so a source edit without a
//      recompile is caught, as the rest of the generated model is guarded).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadRoleRegistry,
  validateRoleRegistry,
  buildRolesLens,
  allRoles,
  roleLabelKey,
  roleDescriptionKey,
  rolesOutPath,
  rolesI18nPath,
} from './roles.mjs';

const here = dirname(fileURLToPath(import.meta.url));

const registry = loadRoleRegistry();
const { lens, catalogue } = buildRolesLens({ registry, write: false });

// --- behaviour re-derived from the GENERATED lens ------------------------
// This mirrors js/model.js but reads the lens shape (keys, exclusionCategoryMap
// embedded in the lens rather than hard-coded), proving the lens carries
// everything the UI needs.
const PART_KEYS = lens.parts;
function lensRoleById(id) {
  return lens.buyerTypes.find(r => r.id === id) || lens.eoRoles.find(r => r.id === id) || null;
}
function visiblePartsOf(id) {
  const r = lensRoleById(id);
  return r ? r.formBehavior.visibleParts : PART_KEYS;
}
function isEditable(partKey, id) {
  const r = lensRoleById(id);
  return r ? r.formBehavior.editableParts.includes(partKey) : true;
}
function categoryOf(code) {
  if (!code) return null;
  for (const [prefix, cat] of Object.entries(lens.exclusionCategoryMap)) {
    if (code.startsWith(prefix)) return cat;
  }
  return null;
}
function isMandatory(code, id) {
  const cat = categoryOf(code);
  if (!cat) return false;
  const r = lensRoleById(id);
  return r?.formBehavior?.exclusionGroundRules?.[cat] === 'mandatory';
}

describe('roles: registry validation', () => {
  it('the authored registry is valid', () => {
    assert.doesNotThrow(() => validateRoleRegistry(registry));
  });

  it('rejects a duplicate role id', () => {
    const bad = structuredClone(registry);
    bad.eoRoles.push(structuredClone(bad.eoRoles[0]));
    assert.throws(() => validateRoleRegistry(bad), /duplicate role id/);
  });

  it('rejects editableParts not contained in visibleParts', () => {
    const bad = structuredClone(registry);
    bad.buyerTypes[0].formBehavior.editableParts = [...bad.buyerTypes[0].formBehavior.editableParts, 'II'];
    assert.throws(() => validateRoleRegistry(bad), /not in visibleParts/);
  });

  it('rejects an unknown part in visibleParts', () => {
    const bad = structuredClone(registry);
    bad.eoRoles[0].formBehavior.visibleParts = [...bad.eoRoles[0].formBehavior.visibleParts, 'VII'];
    assert.throws(() => validateRoleRegistry(bad), /unknown part "VII"/);
  });

  it('rejects a missing exclusion category in a role rule set', () => {
    const bad = structuredClone(registry);
    delete bad.buyerTypes[0].formBehavior.exclusionGroundRules.national;
    assert.throws(() => validateRoleRegistry(bad), /missing category "national"/);
  });

  it('rejects an invalid exclusion disposition', () => {
    const bad = structuredClone(registry);
    bad.buyerTypes[0].formBehavior.exclusionGroundRules.criminal = 'sometimes';
    assert.throws(() => validateRoleRegistry(bad), /not a declared disposition/);
  });

  it('rejects an invalid documentType', () => {
    const bad = structuredClone(registry);
    bad.buyerTypes[0].documentType = 'notice';
    assert.throws(() => validateRoleRegistry(bad), /invalid documentType/);
  });

  it('rejects an EO role missing xmlMapping', () => {
    const bad = structuredClone(registry);
    delete bad.eoRoles[0].xmlMapping;
    assert.throws(() => validateRoleRegistry(bad), /missing xmlMapping/);
  });

  it('accepts a buyer role without xmlMapping (buyer type is structural, not serialized)', () => {
    const ok = structuredClone(registry);
    delete ok.buyerTypes[0].xmlMapping; // may already be absent; ensure it is
    assert.doesNotThrow(() => validateRoleRegistry(ok));
  });

  it('rejects a malformed xmlMapping when one is present', () => {
    const bad = structuredClone(registry);
    bad.eoRoles[0].xmlMapping = { element: 'x' }; // missing .code
    assert.throws(() => validateRoleRegistry(bad), /missing \.element or \.code/);
  });

  it('rejects an exclusionCategoryMap value that is not a declared category', () => {
    const bad = structuredClone(registry);
    bad.exclusionCategoryMap['exg-xyz'] = 'nonsense';
    assert.throws(() => validateRoleRegistry(bad), /unknown category "nonsense"/);
  });
});

describe('roles: generated lens shape', () => {
  it('has the expected buyer + EO role ids', () => {
    assert.deepEqual(lens.buyerTypes.map(r => r.id), ['contracting-authority', 'contracting-entity']);
    assert.deepEqual(lens.eoRoles.map(r => r.id),
      ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont']);
  });

  it('carries i18n keys (not inline text) and the English text is in the catalogue', () => {
    for (const r of [...lens.buyerTypes, ...lens.eoRoles]) {
      assert.equal(r.labelKey, roleLabelKey(r.id));
      assert.equal(r.descriptionKey, roleDescriptionKey(r.id));
      assert.ok(!('label' in r), `${r.id} must not carry inline label`);
      assert.ok(!('description' in r), `${r.id} must not carry inline description`);
      assert.ok(catalogue[r.labelKey], `${r.id} label text present`);
      assert.ok(catalogue[r.descriptionKey], `${r.id} description text present`);
    }
  });

  it('catalogue text matches the authored source', () => {
    for (const role of allRoles(registry)) {
      assert.equal(catalogue[roleLabelKey(role.id)], role.label);
      assert.equal(catalogue[roleDescriptionKey(role.id)], role.description);
    }
  });

  it('embeds the exclusionCategoryMap stripped of annotation keys', () => {
    assert.deepEqual(lens.exclusionCategoryMap, {
      'exg-crim': 'criminal',
      'exg-pmt': 'payment',
      'exg-mis': 'misconduct',
      'exg-sitn': 'misconduct',
      'exg-natl': 'national',
    });
  });
});

// The Phase 0 goldens, reproduced from the generated lens.
describe('roles: behaviour parity with Phase 0 goldens (visibleParts)', () => {
  const expected = {
    'contracting-authority': ['I', 'III', 'IV', 'VI'],
    'contracting-entity': ['I', 'III', 'IV', 'VI'],
    'sole-tenderer': ['I', 'II', 'III', 'IV', 'V', 'VI'],
    'group-lead': ['I', 'II', 'III', 'IV', 'V', 'VI'],
    'group-mem': ['I', 'II', 'III', 'IV', 'VI'],
    'oeron': ['I', 'II', 'III', 'VI'],
    'subcont': ['I', 'II', 'III', 'VI'],
  };
  for (const [id, parts] of Object.entries(expected)) {
    it(`${id} sees parts ${parts.join(',')}`, () => {
      assert.deepEqual(visiblePartsOf(id), parts);
    });
  }
  it('an unknown role falls back to all six parts', () => {
    assert.deepEqual(visiblePartsOf('nobody'), PART_KEYS);
  });
});

describe('roles: behaviour parity with Phase 0 goldens (mandatory exclusion grounds)', () => {
  it('maps exclusion-ground codes to categories', () => {
    assert.equal(categoryOf('exg-crim-part'), 'criminal');
    assert.equal(categoryOf('exg-pmt-bre-tax'), 'payment');
    assert.equal(categoryOf('exg-mis-distortion'), 'misconduct');
    assert.equal(categoryOf('exg-sitn-bankr'), 'misconduct');
    assert.equal(categoryOf('exg-natl-bre-nat-law'), 'national');
    assert.equal(categoryOf('slc-suit-reg-prof'), null);
  });

  // Policy: ALL exclusion grounds are mandatory — the economic operator must
  // answer every one, so the buyer always includes them (and cannot uncheck).
  // This holds for every role, buyers included.
  it('contracting-authority: all four exclusion categories mandatory', () => {
    for (const code of ['exg-crim-part', 'exg-pmt-bre-tax', 'exg-mis-distortion', 'exg-natl-bre-nat-law']) {
      assert.equal(isMandatory(code, 'contracting-authority'), true, code);
    }
  });

  it('contracting-entity: all four exclusion categories mandatory', () => {
    for (const code of ['exg-crim-part', 'exg-pmt-bre-tax', 'exg-mis-distortion', 'exg-natl-bre-nat-law']) {
      assert.equal(isMandatory(code, 'contracting-entity'), true, code);
    }
  });

  it('every EO role: all four exclusion categories mandatory', () => {
    for (const id of ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont']) {
      for (const code of ['exg-crim-part', 'exg-pmt-bre-tax', 'exg-mis-distortion', 'exg-natl-bre-nat-law']) {
        assert.equal(isMandatory(code, id), true, `${id} / ${code}`);
      }
    }
  });

  it('a selection criterion is never "mandatory" via exclusion rules', () => {
    assert.equal(isMandatory('slc-suit-reg-prof', 'sole-tenderer'), false);
  });
});

describe('roles: behaviour parity with Phase 0 goldens (editability)', () => {
  it('buyers cannot edit Part VI; EOs can edit Parts II and VI; EOs cannot edit Part I', () => {
    assert.equal(isEditable('VI', 'contracting-authority'), false);
    assert.equal(isEditable('I', 'contracting-authority'), true);
    assert.equal(isEditable('II', 'sole-tenderer'), true);
    assert.equal(isEditable('VI', 'sole-tenderer'), true);
    assert.equal(isEditable('I', 'sole-tenderer'), false);
  });
});

describe('roles: generated artifacts are up to date (staleness guard)', () => {
  it('committed model/generated/ui/roles.json matches a fresh build', () => {
    const onDisk = readFileSync(rolesOutPath, 'utf8');
    const fresh = JSON.stringify(lens, null, 2) + '\n';
    assert.equal(onDisk, fresh, 'roles.json is stale — run `node model/compiler/roles.mjs`');
  });

  it('committed i18n/en/espd.roles.json matches a fresh build', () => {
    const onDisk = readFileSync(rolesI18nPath, 'utf8');
    const fresh = JSON.stringify(catalogue, null, 2) + '\n';
    assert.equal(onDisk, fresh, 'espd.roles.json is stale — run `node model/compiler/roles.mjs`');
  });
});
