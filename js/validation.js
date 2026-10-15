/**
 * Validation module — validates the instance document against the generated
 * JSON Schemas, using the PRECOMPILED standalone Ajv validators emitted by
 * `node model/compiler/build-validators.mjs`.
 *
 * No Ajv compiler/eval runs in the browser: the validators are plain functions
 * (model/generated/ui/validators/index.mjs). Each one validates an ISOLATED
 * slice of a part and declares `additionalProperties:false` + the slice as
 * required at the part level, so a validator must only ever see the sub-tree it
 * owns. The OWNERSHIP map below records, per validator, the part key and the set
 * of sub-keys it governs; validateInstance() slices the instance accordingly and
 * only runs a validator when at least one of its owned sub-keys is present (so an
 * absent OPTIONAL administrative block — e.g. a power of attorney — is never
 * flagged as "missing").
 *
 * Ajv error objects (error.instancePath, keyword, params, message) are mapped
 * back to the renderer's dotted `data-field` dataPath so the offending field can
 * be highlighted in place.
 */

import { t } from './i18n.js';
import * as validators from '../model/generated/ui/validators/index.mjs';

/**
 * Validator ownership. Each entry: a precompiled validate() fn, the instance
 * part key it validates under, and the sub-keys of that part it governs. The
 * `part*` sub-keys partition each part's sub-tree across its validators so no
 * two validators see the same key (which would otherwise collide with
 * additionalProperties:false).
 */
const VALIDATORS = [
  { fn: validators.partI_sectionA, part: 'partI', owns: ['publication'] },
  { fn: validators.partI_sectionB, part: 'partI', owns: ['contractingAuthority'] },
  { fn: validators.partI_sectionC, part: 'partI', owns: ['procedure', 'project', 'lots'] },
  { fn: validators.partII_sectionA, part: 'partII', owns: ['economicOperator'] },
  { fn: validators.partII_sectionB, part: 'partII', owns: ['powersOfAttorney'] },
  { fn: validators.partII, part: 'partII', owns: ['economicOperatorCriteria'] },
  { fn: validators.partIII, part: 'partIII', owns: ['exclusionGrounds'] },
  { fn: validators.partIV, part: 'partIV', owns: ['selectionCriteria'] },
  { fn: validators.partV, part: 'partV', owns: ['otherCriteria'] },
  { fn: validators.partVI_sectionA, part: 'partVI', owns: ['signatory'] },
];

/**
 * Validate the whole instance document.
 *
 * @param {Object} instance - the nested instance document (state.getAnswers()).
 * @param {Object} [opts]
 * @param {string[]} [opts.parts] - restrict validation to these part keys
 *   (lowercase, e.g. ['partI','partIII']). Omit to validate every part present.
 * @returns {{ valid: boolean, errors: Array<{dataPath, message, keyword, instancePath}> }}
 */
export function validateInstance(instance, opts = {}) {
  const doc = instance && typeof instance === 'object' ? instance : {};
  const restrict = opts.parts ? new Set(opts.parts) : null;
  const errors = [];

  for (const { fn, part, owns } of VALIDATORS) {
    if (typeof fn !== 'function') continue;
    if (restrict && !restrict.has(part)) continue;

    const partData = doc[part];
    if (partData == null || typeof partData !== 'object') continue;

    // Slice to only the keys this validator owns and that are actually present.
    const slice = {};
    let present = false;
    for (const key of owns) {
      if (partData[key] !== undefined) {
        slice[key] = partData[key];
        present = true;
      }
    }
    if (!present) continue; // absent optional block — nothing to validate

    const ok = fn({ [part]: slice });
    if (!ok && Array.isArray(fn.errors)) {
      for (const err of fn.errors) {
        errors.push(toFieldError(err));
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Convert a single Ajv error into a UI error: resolve the offending field's
 * dataPath and a human-readable message.
 */
function toFieldError(err) {
  return {
    dataPath: ajvErrorDataPath(err),
    message: messageFor(err),
    keyword: err.keyword,
    instancePath: err.instancePath,
  };
}

/**
 * Map an Ajv error to the renderer's dotted `data-field` dataPath.
 *
 * Ajv `instancePath` is a JSON Pointer (leading '/', '/'-separated, array
 * indices as bare integers), e.g.
 *   /partII/economicOperatorCriteria/eo-size/response/electronicEvidence/evidence/0/url
 * The renderer keys fields with a DOTTED path and BRACKETED array indices:
 *   partII.economicOperatorCriteria.eo-size.response.electronicEvidence.evidence[0].url
 *
 * For `required` errors Ajv points `instancePath` at the PARENT object and names
 * the missing child in `params.missingProperty`; we append it so the error lands
 * on the actual missing field. For `additionalProperties` the stray key is in
 * `params.additionalProperty`; we append it to point at the offending key.
 */
export function ajvErrorDataPath(err) {
  const segments = jsonPointerSegments(err.instancePath);
  if (err.keyword === 'required' && err.params && err.params.missingProperty != null) {
    segments.push(String(err.params.missingProperty));
  } else if (err.keyword === 'additionalProperties' && err.params && err.params.additionalProperty != null) {
    segments.push(String(err.params.additionalProperty));
  }
  return segmentsToDataPath(segments);
}

/** Split a JSON Pointer ('/a/b/0/c') into decoded segments (['a','b','0','c']). */
function jsonPointerSegments(pointer) {
  if (!pointer) return [];
  return pointer
    .split('/')
    .slice(1) // drop the leading empty segment before the first '/'
    .map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~')); // JSON Pointer unescaping
}

/** Join segments into a dotted dataPath, rendering integer segments as [n]. */
function segmentsToDataPath(segments) {
  let out = '';
  for (const seg of segments) {
    if (/^\d+$/.test(seg)) {
      out += `[${seg}]`;
    } else {
      out += out === '' ? seg : `.${seg}`;
    }
  }
  return out;
}

/**
 * A human-readable message for an Ajv error. Prefers an i18n key per keyword
 * (with an English fallback), and falls back to Ajv's own `.message` for
 * keywords we do not specialise.
 */
function messageFor(err) {
  switch (err.keyword) {
    case 'required':
      return t('ui.requiredField', 'This field is required');
    case 'type':
      return t('ui.invalidType', 'This value is the wrong type');
    case 'enum':
      return t('ui.invalidValue', 'Select a valid value');
    case 'minItems':
      return t('ui.atLeastOne', 'Provide at least one entry');
    case 'maxItems':
      return t('ui.tooMany', 'Too many entries');
    case 'additionalProperties':
      return t('ui.unexpectedField', 'Unexpected value');
    case 'if':
      // if/then/else failures are conditional-requirement failures; the nested
      // required/type errors Ajv also emits carry the actionable detail.
      return t('ui.conditionalRequirement', 'Complete the required related fields');
    default:
      return err.message || t('ui.invalidValue', 'Invalid value');
  }
}

/**
 * Show validation errors in the DOM, highlighting each offending field by its
 * dataPath. Visible fields only — a conditionally hidden wrapper (`[hidden]`) is
 * skipped (its error is not actionable until revealed). Returns the number of
 * errors that were actually surfaced on a field.
 *
 * @param {Array<{dataPath, message}>} errors
 * @param {HTMLElement} container
 * @returns {number} count of errors shown on a field
 */
export function showValidationErrors(errors, container) {
  clearValidationErrors(container);
  if (!container) return 0;

  let shown = 0;
  const seen = new Set();
  for (const error of errors) {
    const dataPath = error.dataPath;
    if (!dataPath) continue;
    // De-duplicate: allErrors can report the same field twice (e.g. required +
    // if/then). One marker per field is enough.
    const dedupeKey = `${dataPath}\u0000${error.message}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const wrapper = findFieldWrapper(container, dataPath);
    if (!wrapper || isHidden(wrapper)) continue;

    wrapper.setAttribute('aria-invalid', 'true');
    const errorEl = document.createElement('small');
    errorEl.className = 'error-message';
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = error.message;
    wrapper.appendChild(errorEl);
    shown++;
  }
  return shown;
}

/**
 * Find the `.espd-field` wrapper for a dataPath. Falls back to the nearest
 * ancestor wrapper when the exact field is not rendered (e.g. an error on an
 * array container whose items are the rendered fields).
 */
function findFieldWrapper(container, dataPath) {
  let path = dataPath;
  // Try the exact path, then progressively trim the trailing segment/index so an
  // error on a nested leaf still lands on the closest rendered wrapper.
  while (path) {
    const el = container.querySelector(`.espd-field[data-field="${CSS.escape(path)}"]`);
    if (el) return el;
    const trimmed = path.replace(/(\.[^.[\]]+|\[\d+\])$/, '');
    if (trimmed === path) break;
    path = trimmed;
  }
  return null;
}

/** Whether an element (or an ancestor up to the container) is hidden. */
function isHidden(el) {
  for (let node = el; node; node = node.parentElement) {
    if (node.hidden) return true;
  }
  return false;
}

/**
 * Clear all validation error indicators within a container.
 */
export function clearValidationErrors(container) {
  if (!container) return;
  container.querySelectorAll('[aria-invalid]').forEach((el) => {
    el.removeAttribute('aria-invalid');
  });
  container.querySelectorAll('.error-message').forEach((el) => {
    el.remove();
  });
}
