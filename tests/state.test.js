import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';

// Mock localStorage for testing
const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear()
};

// Import after mocking localStorage
const { setRole, getRole, initState, resetState, VALID_ROLE_IDS, LEGACY_MIGRATION } = await import('../js/state.js');

describe('Feature: espd-role-selection, Property 3: Role selection persists the full role id', () => {
  beforeEach(() => {
    storage.clear();
    resetState();
  });

  it('setRole then getRole returns the same id for all valid roles', () => {
    fc.assert(
      fc.property(fc.constantFrom(...VALID_ROLE_IDS), (roleId) => {
        setRole(roleId);
        const result = getRole();
        assert.strictEqual(result, roleId,
          `getRole() should return "${roleId}" after setRole("${roleId}")`);
      }),
      { numRuns: 100 }
    );
  });

  it('role persists across initState (simulating page reload)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...VALID_ROLE_IDS), (roleId) => {
        setRole(roleId);
        // Simulate page reload by re-initializing
        initState();
        const result = getRole();
        assert.strictEqual(result, roleId,
          `Role "${roleId}" should survive initState()`);
      }),
      { numRuns: 50 }
    );
  });
});

describe('Feature: espd-role-selection, Property 5: Invalid role id triggers state reset', () => {
  beforeEach(() => {
    storage.clear();
    resetState();
  });

  it('unrecognized role ids cause state reset', () => {
    const invalidIdArb = fc.string({ minLength: 1, maxLength: 30 })
      .filter(s => !VALID_ROLE_IDS.includes(s) && !Object.keys(LEGACY_MIGRATION).includes(s));

    fc.assert(
      fc.property(invalidIdArb, (badId) => {
        // Manually inject an invalid role into localStorage
        storage.set('espd-service-state', JSON.stringify({
          role: badId,
          currentStep: 0,
          answers: {},
          metadata: { createdAt: null, lastModified: null }
        }));

        initState();
        const result = getRole();
        assert.strictEqual(result, null,
          `Role should be null after loading invalid id "${badId}"`);
      }),
      { numRuns: 100 }
    );
  });

  it('legacy "ca" migrates to "contracting-authority"', () => {
    storage.set('espd-service-state', JSON.stringify({
      role: 'ca',
      currentStep: 2,
      answers: { 'some/path': 'value' },
      metadata: { createdAt: '2025-01-01', lastModified: '2025-01-01' }
    }));

    initState();
    assert.strictEqual(getRole(), 'contracting-authority');
  });

  it('legacy "eo" migrates to "sole-tenderer"', () => {
    storage.set('espd-service-state', JSON.stringify({
      role: 'eo',
      currentStep: 1,
      answers: {},
      metadata: { createdAt: '2025-01-01', lastModified: '2025-01-01' }
    }));

    initState();
    assert.strictEqual(getRole(), 'sole-tenderer');
  });
});
