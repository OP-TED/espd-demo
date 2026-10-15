// Phase 0 characterization — js/state.js (the JSON instance document + session).
//
// UPDATED at the Phase 4/5 cutover. The store is now a nested instance document
// keyed by the model's dataPath (was a flat map keyed by legacy contentpath), and
// buyer "inclusion" state lives in a separate map (was inside answers under an
// `inclusion:` prefix). The session/resume/migration LIFECYCLE is preserved —
// that is the contract the harness guards; only the key SPACE changed. A v1
// (flat-contentpath) persisted document is intentionally reset on load.

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage before importing state.js.
const storage = new Map();
globalThis.localStorage = {
  getItem: (k) => storage.get(k) ?? null,
  setItem: (k, v) => storage.set(k, v),
  removeItem: (k) => storage.delete(k),
  clear: () => storage.clear(),
};

const state = await import('../../js/state.js');

beforeEach(() => {
  storage.clear();
  state.resetState();
});

describe('phase0: state — instance document (dataPath-keyed)', () => {
  it('set/get an answer by dataPath (nested)', () => {
    const path = 'partIII.exclusionGrounds.exg-crim-part.response.answer';
    state.setAnswer(path, true);
    assert.equal(state.getAnswer(path), true);
    // The value lands in the nested instance document, not a flat map.
    assert.equal(state.getAnswers().partIII.exclusionGrounds['exg-crim-part'].response.answer, true);
  });

  it('supports array segments: indexed and append', () => {
    state.setAnswer('partIII.exclusionGrounds.exg-crim-part.response.convictions[0].reason', 'r1');
    state.setAnswer('partIII.exclusionGrounds.exg-crim-part.response.convictions[1].reason', 'r2');
    assert.equal(state.getAnswer('partIII.exclusionGrounds.exg-crim-part.response.convictions[0].reason'), 'r1');
    assert.equal(state.getAnswer('partIII.exclusionGrounds.exg-crim-part.response.convictions[1].reason'), 'r2');
    // Append writes to the next index.
    state.setAnswer('partI.lots[]', 'LOT-0000');
    state.setAnswer('partI.lots[]', 'LOT-0001');
    assert.deepEqual(state.getAnswers().partI.lots, ['LOT-0000', 'LOT-0001']);
  });

  it('setAnswers accepts a flat {dataPath: value} map', () => {
    state.setAnswers({
      'partI.contractingAuthority.officialName': 'ACME',
      'partI.contractingAuthority.country': 'BEL',
    });
    assert.equal(state.getAnswer('partI.contractingAuthority.officialName'), 'ACME');
    assert.equal(state.getAnswer('partI.contractingAuthority.country'), 'BEL');
  });

  it('setAnswers deep-merges a nested instance', () => {
    state.setAnswer('partI.project.name', 'keep');
    state.setAnswers({ partI: { project: { description: 'added' } } });
    assert.equal(state.getAnswer('partI.project.name'), 'keep');
    assert.equal(state.getAnswer('partI.project.description'), 'added');
  });

  it('hasAnswers reflects whether any leaf exists', () => {
    assert.equal(state.hasAnswers(), false);
    state.setAnswer('partI.project.name', 'x');
    assert.equal(state.hasAnswers(), true);
  });
});

describe('phase0: state — session + resume', () => {
  it('hasSession is false until a role is set', () => {
    assert.equal(state.hasSession(), false);
    state.setRole('sole-tenderer');
    assert.equal(state.hasSession(), true);
  });

  it('role + answers survive initState (page reload / resume)', () => {
    state.setRole('group-lead');
    state.setAnswer('partI.project.name', 'kept');
    state.setCurrentStep(2);
    state.initState(); // simulate reload from the same localStorage
    assert.equal(state.getRole(), 'group-lead');
    assert.equal(state.getAnswer('partI.project.name'), 'kept');
    assert.equal(state.getCurrentStep(), 2);
  });

  it('resetState clears role + answers (New ESPD)', () => {
    state.setRole('subcont');
    state.setAnswer('partI.project.name', 'v');
    state.resetState();
    assert.equal(state.getRole(), null);
    assert.equal(state.hasAnswers(), false);
    assert.equal(state.getCurrentStep(), 0);
  });
});

describe('phase0: state — legacy role migration', () => {
  const seed = (role) => storage.set('espd-service-state', JSON.stringify({
    version: 2, role, currentStep: 0, instance: {}, inclusions: {},
    metadata: { createdAt: null, lastModified: null },
  }));

  it("legacy 'ca' migrates to contracting-authority", () => {
    seed('ca'); state.initState();
    assert.equal(state.getRole(), 'contracting-authority');
  });
  it("legacy 'eo' migrates to sole-tenderer", () => {
    seed('eo'); state.initState();
    assert.equal(state.getRole(), 'sole-tenderer');
  });
  it('an unknown role id resets the session', () => {
    seed('bogus-role'); state.initState();
    assert.equal(state.getRole(), null);
  });
  it('a v1 (flat-contentpath) document keeps the role but drops untranslatable answers', () => {
    storage.set('espd-service-state', JSON.stringify({
      role: 'sole-tenderer', currentStep: 1, answers: { 'C01_x/QG1/Q1': 'true' },
      metadata: { createdAt: null, lastModified: null },
    }));
    state.initState();
    // The session (role/step) survives; the incompatible flat answers are cleared.
    assert.equal(state.getRole(), 'sole-tenderer');
    assert.equal(state.getCurrentStep(), 1);
    assert.equal(state.hasAnswers(), false);
  });
});

describe('phase0: state — inclusion state (buyer criteria selection)', () => {
  it('inclusion state reads back as a boolean and is NOT in the instance document', () => {
    assert.equal(state.getInclusionState('C09', 'exg-mis-distortion'), undefined);
    state.setInclusionState('C09', 'exg-mis-distortion', true);
    assert.equal(state.getInclusionState('C09', 'exg-mis-distortion'), true);
    // Inclusions are a separate map, keeping the exported instance clean.
    assert.equal(state.hasAnswers(), false);
  });

  it('initInclusionStates forces mandatory criteria to included (by code)', () => {
    const members = [
      { code: 'exg-crim-part', id: 'exg-crim-part' },
      { code: 'exg-mis-distortion', id: 'exg-mis-distortion' },
    ];
    const isMandatory = (code) => code === 'exg-crim-part';
    state.initInclusionStates(members, 'contracting-authority', isMandatory);
    assert.equal(state.getInclusionState('exg-crim-part', 'exg-crim-part'), true);
    assert.equal(state.getInclusionState('exg-mis-distortion', 'exg-mis-distortion'), undefined);
  });

  it('clearInclusionStates removes inclusions, keeping instance answers', () => {
    state.setAnswer('partI.project.name', 'v');
    state.setInclusionState('C01', 'exg-crim-part', true);
    state.clearInclusionStates();
    assert.equal(state.getInclusionState('C01', 'exg-crim-part'), undefined);
    assert.equal(state.getAnswer('partI.project.name'), 'v');
  });
});
