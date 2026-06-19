/**
 * State module — manages form state (answers) with localStorage persistence.
 */

const STORAGE_KEY = 'espd-service-state';

let state = {
  role: null,        // 'ca' or 'eo'
  currentStep: 0,    // index into parts array
  answers: {},       // keyed by contentpath
  metadata: {
    createdAt: null,
    lastModified: null
  }
};

/**
 * Initialize state, restoring from localStorage if available.
 */
export function initState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to restore state from localStorage', e);
      resetState();
    }
  }
  return state;
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
 */
export function setRole(role) {
  state.role = role;
  state.metadata.createdAt = new Date().toISOString();
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/**
 * Get the current role.
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
 * @param {string} path - The contentpath from the model (e.g. "PI01_proc-publication-info/QG1/Q1/R1/RV")
 * @param {*} value - The value to store
 */
export function setAnswer(path, value) {
  state.answers[path] = value;
  state.metadata.lastModified = new Date().toISOString();
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
