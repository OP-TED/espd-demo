/**
 * Validation module — validates form answers against model cardinality and data types.
 */

import { getAnswer } from './state.js';
import { t } from './i18n.js';

/**
 * Validate a single part and return validation errors.
 * @param {Object} part - The part definition from the model
 * @returns {Array} Array of { path, message } error objects
 */
export function validatePart(part) {
  const errors = [];

  if (!part || !part.sections) return errors;

  for (const section of part.sections) {
    validateComponents(section.components || [], errors);
  }

  return errors;
}

/**
 * Recursively validate components.
 */
function validateComponents(components, errors) {
  for (const component of components) {
    if (component.type === 'QUESTION' && component.cardinality === '1') {
      const contentpath = component.contentpath;
      if (contentpath) {
        const value = getAnswer(contentpath);
        if (isEmpty(value)) {
          errors.push({
            path: contentpath,
            message: t('ui.requiredField', 'This field is required'),
            description: component.description
          });
        }
      }
    }

    // Recurse into child components
    if (component.components) {
      // Skip validation for hidden conditional groups
      if ((component.code === 'ONTRUE' || component.code === 'ONFALSE') &&
          isGroupHidden(component)) {
        continue;
      }
      validateComponents(component.components, errors);
    }
  }
}

/**
 * Check if a conditional group should be hidden (parent indicator doesn't match).
 */
function isGroupHidden(component) {
  // This is a simplified check — in production you'd trace the parent indicator
  // For now, we skip validation of conditional groups that haven't been revealed
  const code = component.code;
  if (code === 'ONTRUE' || code === 'ONFALSE') {
    // Check if the group is currently visible in the DOM
    const groupEl = document.querySelector(`[data-group-path="${component.responsepath}"]`);
    if (groupEl && groupEl.hidden) return true;
  }
  return false;
}

/**
 * Check if a value is empty.
 */
function isEmpty(value) {
  if (value === null || value === undefined || value === '') return true;
  if (typeof value === 'object') {
    // For complex values (amount, period, evidence), check primary field
    if (value.amount !== undefined) return !value.amount;
    if (value.start !== undefined) return !value.start;
    if (value.url !== undefined) return !value.url;
    return Object.values(value).every(v => !v);
  }
  return false;
}

/**
 * Show validation errors in the DOM.
 */
export function showValidationErrors(errors, container) {
  // Clear previous errors
  clearValidationErrors(container);

  for (const error of errors) {
    const path = error.path;
    const field = container.querySelector(`[data-contentpath="${CSS.escape(path)}"]`);
    if (field) {
      const fieldWrapper = field.closest('.espd-field') || field.parentElement;
      if (fieldWrapper) {
        fieldWrapper.setAttribute('aria-invalid', 'true');
        const errorEl = document.createElement('small');
        errorEl.className = 'error-message';
        errorEl.setAttribute('role', 'alert');
        errorEl.textContent = error.message;
        fieldWrapper.appendChild(errorEl);
      }
    }
  }
}

/**
 * Clear all validation error indicators.
 */
export function clearValidationErrors(container) {
  if (!container) return;
  container.querySelectorAll('[aria-invalid]').forEach(el => {
    el.removeAttribute('aria-invalid');
  });
  container.querySelectorAll('.error-message').forEach(el => {
    el.remove();
  });
}
