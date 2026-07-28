/**
 * State module — manages form state (answers) with localStorage persistence.
 */

const STORAGE_KEY = 'espd-service-state';

/** All valid role ids from the roles registry */
const VALID_ROLE_IDS = [
  'contracting-authority',
  'contracting-entity',
  'sole-tenderer',
  'group-lead',
  'group-mem',
  'oeron',
  'subcont'
];

/** Legacy role id migration map */
const LEGACY_MIGRATION = {
  'ca': 'contracting-authority',
  'eo': 'sole-tenderer'
};

let state = {
  role: null,        // Full role id (e.g., 'sole-tenderer', 'contracting-authority')
  currentStep: 0,    // index into parts array
  answers: {},       // keyed by contentpath
  metadata: {
    createdAt: null,
    lastModified: null
  }
};

/**
 * Initialize state, restoring from localStorage if available.
 * Performs legacy migration and validation.
 */
export function initState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
      migrateState();
    } catch (e) {
      console.warn('Failed to restore state from localStorage', e);
      resetState();
    }
  }
  return state;
}

/**
 * Migrate legacy role values and validate the current role id.
 * - Converts 'ca' → 'contracting-authority', 'eo' → 'sole-tenderer'
 * - Resets state if role id is unrecognized
 */
function migrateState() {
  if (!state.role) return;

  // Migrate legacy values
  if (Object.hasOwn(LEGACY_MIGRATION, state.role)) {
    state.role = LEGACY_MIGRATION[state.role];
    persist();
    return;
  }

  // Validate current role id
  if (!VALID_ROLE_IDS.includes(state.role)) {
    console.warn(`Unknown role id "${state.role}", resetting state`);
    resetState();
  }
}

/**
 * Reset all state to defaults.
 */
export function resetState() {
  state = {
    role: null,
    currentStep: 0,
    answers: {},
    metadata: {
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
  };
  persist();
  return state;
}

/**
 * Get the current state.
 */
export function getState() {
  return state;
}

/**
 * Set the user role and persist.
 * @param {string} role - Full role id (e.g., 'sole-tenderer', 'contracting-authority')
 */
export function setRole(role) {
  state.role = role;
  state.metadata.createdAt = new Date().toISOString();
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/**
 * Get the current role id.
 * @returns {string|null} The role id or null if not set
 */
export function getRole() {
  return state.role;
}

/**
 * Set the current wizard step.
 */
export function setCurrentStep(step) {
  state.currentStep = step;
  persist();
}

/**
 * Get the current wizard step.
 */
export function getCurrentStep() {
  return state.currentStep;
}

/**
 * Set an answer value by its content path.
 * @param {string} path - The contentpath from the model
 * @param {*} value - The value to store
 */
export function setAnswer(path, value) {
  const oldValue = state.answers[path];
  state.answers[path] = value;
  state.metadata.lastModified = new Date().toISOString();
  console.debug('[ESPD state]', path, ':', oldValue, '→', value);
  persist();
}

/**
 * Get an answer by its content path.
 */
export function getAnswer(path) {
  return state.answers[path];
}

/**
 * Get all answers.
 */
export function getAnswers() {
  return state.answers;
}

/**
 * Bulk set answers (e.g., when importing).
 */
export function setAnswers(answers) {
  state.answers = { ...state.answers, ...answers };
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/**
 * Check whether the current session has any user-entered answers.
 * Used to decide whether to show the "New" confirmation dialog.
 * @returns {boolean}
 */
export function hasAnswers() {
  if (!state.answers || typeof state.answers !== 'object') return false;
  return Object.keys(state.answers).length > 0;
}

/**
 * Check whether a saved session exists (role is set).
 * @returns {boolean}
 */
export function hasSession() {
  return state.role !== null;
}

/**
 * Persist state to localStorage.
 */
function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist state to localStorage', e);
  }
}

/**
 * Export the complete state as a JSON object (for serialization).
 */
export function exportState() {
  return { ...state };
}

/**
 * Import state from an object (e.g., loaded from file).
 */
export function importState(imported) {
  state = { ...state, ...imported };
  persist();
}

// ─── Inclusion State (Buyer Criteria Selection) ───────────────────────────────

const INCLUSION_PREFIX = 'inclusion:';

/**
 * Get the inclusion state for a criterion.
 * @param {string} tag - Section tag (e.g., "C01")
 * @param {string} code - Section code (e.g., "exg-crim-part")
 * @returns {boolean|undefined} true/false if explicitly set, undefined if not set
 */
export function getInclusionState(tag, code) {
  const key = `${INCLUSION_PREFIX}${tag}_${code}`;
  const val = state.answers[key];
  if (val === true || val === false) return val;
  return undefined;
}

/**
 * Set the inclusion state for a criterion.
 * @param {string} tag - Section tag
 * @param {string} code - Section code
 * @param {boolean} included - Whether the criterion is included
 */
export function setInclusionState(tag, code, included) {
  const key = `${INCLUSION_PREFIX}${tag}_${code}`;
  state.answers[key] = included;
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/**
 * Clear all inclusion state entries from answers.
 * Called during form reset.
 */
export function clearInclusionStates() {
  for (const key of Object.keys(state.answers)) {
    if (key.startsWith(INCLUSION_PREFIX)) {
      delete state.answers[key];
    }
  }
  persist();
}

/**
 * Initialise inclusion states: force mandatory criteria to true.
 * Should be called when rendering the criteria selection view.
 * @param {Array} sections - Array of criterion section objects from the part model
 * @param {string} roleId - The active role id
 * @param {function} isMandatoryFn - Function(sectionCode, roleId) => boolean
 */
export function initInclusionStates(sections, roleId, isMandatoryFn) {
  for (const section of sections) {
    if (section.type !== 'CRITERION') continue;
    if (isMandatoryFn(section.code, roleId)) {
      const key = `${INCLUSION_PREFIX}${section.tag}_${section.code}`;
      state.answers[key] = true;
    }
  }
  persist();
}

// Export constants for testing
export { VALID_ROLE_IDS, LEGACY_MIGRATION };
