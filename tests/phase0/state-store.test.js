// Phase 0 characterization — js/state.js (answer store + session/resume).
// The store is the behaviour the rebuild re-keys (contentpath -> dataPath). This
// pins the CURRENT contract: answers keyed by contentpath, inclusion state keyed
// 'inclusion:<tag>_<code>', session detection, resume across initState, legacy
// role migration. The rebuilt store must preserve the session/resume semantics
// (the key SPACE changes; the lifecycle must not).

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage before importing state.js (same approach as tests/state.test.js).
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

describe('phase0: state — answer store (contentpath-keyed)', () => {
  it('set/get an answer by contentpath', () => {
    const path = 'C01_exg-crim-part/QG1/Q1/R1/RV';
    state.setAnswer(path, 'true');
    assert.equal(state.getAnswer(path), 'true');
    assert.equal(state.getAnswers()[path], 'true');
  });

  it('setAnswers merges (bulk import) rather than replacing', () => {
    state.setAnswer('a/1', 'x');
    state.setAnswers({ 'b/2': 'y', 'c/3': 'z' });
    assert.deepEqual(state.getAnswers(), { 'a/1': 'x', 'b/2': 'y', 'c/3': 'z' });
  });

  it('hasAnswers reflects whether any answer exists', () => {
    assert.equal(state.hasAnswers(), false);
    state.setAnswer('a/1', 'x');
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
    state.setAnswer('x/1', 'kept');
    state.setCurrentStep(2);
    // Simulate reload: re-init from the same localStorage.
    state.initState();
    assert.equal(state.getRole(), 'group-lead');
    assert.equal(state.getAnswer('x/1'), 'kept');
    assert.equal(state.getCurrentStep(), 2);
  });

  it('resetState clears role + answers (New ESPD)', () => {
    state.setRole('subcont');
    state.setAnswer('x/1', 'v');
    state.resetState();
    assert.equal(state.getRole(), null);
    assert.equal(state.hasAnswers(), false);
    assert.equal(state.getCurrentStep(), 0);
  });
});

describe('phase0: state — legacy role migration', () => {
  const seed = (role) => storage.set('espd-service-state', JSON.stringify({
    role, currentStep: 0, answers: {}, metadata: { createdAt: null, lastModified: null },
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
});

describe('phase0: state — inclusion state (buyer criteria selection)', () => {
  it("inclusion state is keyed 'inclusion:<tag>_<code>' and reads back as a boolean", () => {
    assert.equal(state.getInclusionState('C09', 'exg-mis-distortion'), undefined);
    state.setInclusionState('C09', 'exg-mis-distortion', true);
    assert.equal(state.getInclusionState('C09', 'exg-mis-distortion'), true);
    assert.equal(state.getAnswers()['inclusion:C09_exg-mis-distortion'], true);
  });

  it('initInclusionStates forces mandatory criteria to included', () => {
    const sections = [
      { type: 'CRITERION', tag: 'C01', code: 'exg-crim-part' },
      { type: 'CRITERION', tag: 'C09', code: 'exg-mis-distortion' },
      { type: 'LEGISLATION', tag: 'L1' },
    ];
    const isMandatory = (code) => code === 'exg-crim-part';
    state.initInclusionStates(sections, 'contracting-authority', isMandatory);
    assert.equal(state.getInclusionState('C01', 'exg-crim-part'), true);
    assert.equal(state.getInclusionState('C09', 'exg-mis-distortion'), undefined);
  });

  it('clearInclusionStates removes only inclusion keys, keeping answers', () => {
    state.setAnswer('real/answer', 'v');
    state.setInclusionState('C01', 'exg-crim-part', true);
    state.clearInclusionStates();
    assert.equal(state.getInclusionState('C01', 'exg-crim-part'), undefined);
    assert.equal(state.getAnswer('real/answer'), 'v');
  });
});
