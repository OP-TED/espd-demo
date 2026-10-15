/**
 * State module — the ESPD JSON instance document (the hub the whole UI binds to).
 *
 * Answers live in a nested `instance` object keyed by the model's `dataPath`
 * (e.g. partIII.exclusionGrounds.exg-crim-part.response.answer, with array
 * segments like convictions[0].reason). The renderer reads/writes it at
 * field.dataPath; it validates against the composed JSON Schemas; and the XML
 * mapper (Phase 6) maps it to/from UBL. This replaces the former flat map keyed
 * by legacy `contentpath` strings.
 *
 * Buyer criteria-selection "inclusion" state is kept in a SEPARATE map (not in
 * the instance), so the exported instance document stays clean data.
 */

const STORAGE_KEY = 'espd-service-state';
const STATE_VERSION = 2; // v2 = dataPath instance document (v1 = flat contentpath map)

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

function emptyState() {
  return {
    version: STATE_VERSION,
    role: null,          // Full role id (e.g., 'sole-tenderer', 'contracting-authority')
    currentStep: 0,      // index into parts array
    instance: {},        // nested JSON instance document, keyed by dataPath
    inclusions: {},      // buyer criteria selection, keyed `${tag}_${code}` -> boolean
    metadata: {
      createdAt: null,
      lastModified: null
    }
  };
}

let state = emptyState();

// ─── dataPath navigation ──────────────────────────────────────────────────────

/**
 * Parse a dataPath into a list of steps. Each step is either a string (object
 * key) or a number (array index). A trailing/!indexed `[]` appends (resolved to
 * the next index) and is represented as the sentinel { append: true }.
 *   "a.b"            -> ['a','b']
 *   "a.b[0].c"       -> ['a','b',0,'c']
 *   "a.b[]"          -> ['a','b',{append:true}]
 */
function parsePath(dataPath) {
  const steps = [];
  for (const seg of dataPath.split('.')) {
    const m = seg.match(/^([^[]+)((?:\[\d*\])*)$/);
    if (!m) { steps.push(seg); continue; }
    steps.push(m[1]);
    const brackets = m[2].match(/\[\d*\]/g) || [];
    for (const b of brackets) {
      const n = b.slice(1, -1);
      steps.push(n === '' ? { append: true } : Number(n));
    }
  }
  return steps;
}

/** Read the value at a dataPath, or undefined if any step is missing. */
function readPath(root, dataPath) {
  let node = root;
  for (const step of parsePath(dataPath)) {
    if (node == null) return undefined;
    const key = typeof step === 'object' ? node.length : step; // append reads the (nonexistent) tail
    node = node[key];
  }
  return node;
}

/** Write a value at a dataPath, creating intermediate objects/arrays as needed. */
function writePath(root, dataPath, value) {
  const steps = parsePath(dataPath);
  let node = root;
  for (let i = 0; i < steps.length - 1; i++) {
    let key = steps[i];
    const next = steps[i + 1];
    if (typeof key === 'object' && key.append) key = node.length; // [] -> next index
    if (node[key] == null) {
      // The child's container type is decided by the NEXT step: a number/append
      // means an array, otherwise an object.
      node[key] = (typeof next === 'number' || (typeof next === 'object' && next.append)) ? [] : {};
    }
    node = node[key];
  }
  let last = steps[steps.length - 1];
  if (typeof last === 'object' && last.append) last = node.length;
  node[last] = value;
}

/** Count leaf (non-null) values anywhere in the instance document. */
function hasAnyLeaf(obj) {
  if (obj == null) return false;
  if (typeof obj !== 'object') return true;
  if (Array.isArray(obj)) return obj.some(hasAnyLeaf);
  return Object.values(obj).some(hasAnyLeaf);
}

// ─── Lifecycle ──────────────────────────────────────────────────────────────

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
 * Migrate persisted state:
 * - a v1 flat-contentpath document cannot be re-keyed to dataPath, so it is
 *   reset (the key SPACE changed at the Phase 4/5 cutover);
 * - legacy role ids ('ca'/'eo') map to their full ids;
 * - an unrecognized role id resets the session.
 */
function migrateState() {
  // v1 (no version, or a flat `answers` map) is an incompatible store: the
  // contentpath keys cannot be re-keyed to dataPath. Keep the (migrated,
  // validated) ROLE and step so the user's session survives, but drop the
  // untranslatable answers by starting from a fresh v2 instance document.
  if (state.version !== STATE_VERSION || state.answers !== undefined || !state.instance) {
    const legacyRole = state.role ?? null;
    const legacyStep = typeof state.currentStep === 'number' ? state.currentStep : 0;
    state = emptyState();
    state.role = legacyRole;
    state.currentStep = legacyStep;
  }
  if (!state.inclusions) state.inclusions = {};

  if (!state.role) { persist(); return; }
  if (Object.hasOwn(LEGACY_MIGRATION, state.role)) {
    state.role = LEGACY_MIGRATION[state.role];
    persist();
    return;
  }
  if (!VALID_ROLE_IDS.includes(state.role)) {
    console.warn(`Unknown role id "${state.role}", resetting state`);
    resetState();
    return;
  }
  persist();
}

/** Reset all state to defaults. */
export function resetState() {
  state = emptyState();
  state.metadata.createdAt = new Date().toISOString();
  state.metadata.lastModified = new Date().toISOString();
  persist();
  return state;
}

export function getState() {
  return state;
}

/** Set the user role and persist. */
export function setRole(role) {
  state.role = role;
  state.metadata.createdAt = new Date().toISOString();
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

export function getRole() {
  return state.role;
}

export function setCurrentStep(step) {
  state.currentStep = step;
  persist();
}

export function getCurrentStep() {
  return state.currentStep;
}

// ─── Answers (the instance document) ──────────────────────────────────────────

/**
 * Set an answer value at its model dataPath.
 * @param {string} dataPath - e.g. 'partI.publication.type' or 'partIII...convictions[0].reason'
 * @param {*} value
 */
export function setAnswer(dataPath, value) {
  writePath(state.instance, dataPath, value);
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/** Get an answer value at its model dataPath (undefined if unset). */
export function getAnswer(dataPath) {
  return readPath(state.instance, dataPath);
}

/** Get the whole instance document. */
export function getAnswers() {
  return state.instance;
}

/**
 * Bulk-merge values into the instance document. Accepts either a nested instance
 * (deep-merged) or a flat `{ dataPath: value }` map (each written by path).
 */
export function setAnswers(values) {
  if (values && typeof values === 'object') {
    const looksFlat = Object.keys(values).some((k) => k.includes('.') || k.includes('['));
    if (looksFlat && !Object.values(values).some((v) => v && typeof v === 'object' && !Array.isArray(v))) {
      for (const [path, value] of Object.entries(values)) writePath(state.instance, path, value);
    } else {
      state.instance = deepMerge(state.instance, values);
    }
  }
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/** Replace the whole instance document (e.g. on import). */
export function setInstance(instance) {
  state.instance = instance && typeof instance === 'object' ? instance : {};
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

function deepMerge(target, source) {
  if (Array.isArray(source)) return source.slice();
  if (source && typeof source === 'object') {
    const out = target && typeof target === 'object' && !Array.isArray(target) ? { ...target } : {};
    for (const [k, v] of Object.entries(source)) out[k] = deepMerge(out[k], v);
    return out;
  }
  return source;
}

/** Whether the instance document holds any answer. */
export function hasAnswers() {
  return hasAnyLeaf(state.instance);
}

/** Whether a saved session exists (role is set). */
export function hasSession() {
  return state.role !== null;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist state to localStorage', e);
  }
}

/** Export the complete state (for serialization / download). */
export function exportState() {
  return structuredClone(state);
}

/** Import state from an object (e.g. loaded from file). */
export function importState(imported) {
  state = { ...emptyState(), ...imported };
  if (!state.instance) state.instance = {};
  if (!state.inclusions) state.inclusions = {};
  state.version = STATE_VERSION;
  persist();
}

// ─── Inclusion State (Buyer Criteria Selection) ───────────────────────────────

function inclusionKey(tag, code) {
  return `${tag}_${code}`;
}

/**
 * Get the inclusion state for a criterion.
 * @returns {boolean|undefined} true/false if explicitly set, undefined if not set
 */
export function getInclusionState(tag, code) {
  const val = state.inclusions[inclusionKey(tag, code)];
  if (val === true || val === false) return val;
  return undefined;
}

export function setInclusionState(tag, code, included) {
  state.inclusions[inclusionKey(tag, code)] = included;
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/** Clear all inclusion entries. */
export function clearInclusionStates() {
  state.inclusions = {};
  persist();
}

/** Replace all inclusion entries (e.g. on import). */
export function setInclusions(inclusions) {
  state.inclusions = inclusions && typeof inclusions === 'object' ? inclusions : {};
  state.metadata.lastModified = new Date().toISOString();
  persist();
}

/**
 * Initialise inclusion states: force mandatory criteria to true.
 * @param {Array} sections - criterion member objects ({ id/code/tag }) or legacy sections
 * @param {string} roleId
 * @param {function} isMandatoryFn - (code, roleId) => boolean
 */
export function initInclusionStates(sections, roleId, isMandatoryFn) {
  for (const section of sections) {
    const code = section.code;
    const tag = section.tag ?? section.id ?? code;
    if (!code) continue;
    if (isMandatoryFn(code, roleId)) {
      state.inclusions[inclusionKey(tag, code)] = true;
    }
  }
  persist();
}

// Export constants for testing
export { VALID_ROLE_IDS, LEGACY_MIGRATION };
