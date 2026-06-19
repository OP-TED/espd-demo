/**
 * Conditional logic module — handles ONTRUE/ONFALSE visibility of question subgroups.
 *
 * Rules:
 * - code "ON*": always visible (default)
 * - code "ONTRUE": visible only when the parent group's INDICATOR question is answered "true"
 * - code "ONFALSE": visible only when the parent group's INDICATOR question is answered "false"
 */

import { getAnswer } from './state.js';

/**
 * Apply conditional visibility logic to all subgroups within a container.
 * Should be called after rendering and after any indicator value changes.
 */
export function applyConditionalLogic(container) {
  if (!container) return;

  // Find all question groups and requirement groups (parents of conditional subgroups)
  const groups = container.querySelectorAll('.espd-question-group, .espd-question-subgroup');

  groups.forEach(group => {
    // Find the indicator (radio) within this direct group (not nested)
    const indicator = findDirectIndicator(group);
    if (!indicator) return;

    const indicatorValue = getIndicatorValue(indicator);

    // Find direct child subgroups with ONTRUE/ONFALSE codes
    const subgroups = group.querySelectorAll(':scope > .espd-question-subgroup');
    subgroups.forEach(subgroup => {
      const code = subgroup.dataset.code;
      if (code === 'ONTRUE') {
        toggleVisibility(subgroup, indicatorValue === 'true');
      } else if (code === 'ONFALSE') {
        toggleVisibility(subgroup, indicatorValue === 'false');
      }
      // ON* groups are always visible (default behavior)
    });
  });
}

/**
 * Find the first INDICATOR radio group directly within a group (not in nested subgroups).
 */
function findDirectIndicator(group) {
  // Look for fieldsets with radio inputs in immediate children
  const fields = group.querySelectorAll(':scope > .espd-field, :scope > .espd-indicator-wrapper, :scope > div > .espd-indicator-wrapper');

  for (const field of fields) {
    const radios = field.querySelectorAll('input[type="radio"]');
    if (radios.length > 0) return field;
  }

  // Also check for indicator wrappers directly
  const directWrappers = group.querySelectorAll(':scope > fieldset.espd-indicator-wrapper');
  for (const wrapper of directWrappers) {
    return wrapper;
  }

  return null;
}

/**
 * Get the current value of an indicator field.
 */
function getIndicatorValue(indicatorField) {
  // Check from DOM (checked radio)
  const checkedRadio = indicatorField.querySelector('input[type="radio"]:checked');
  if (checkedRadio) return checkedRadio.value;

  // Check from state
  const radio = indicatorField.querySelector('input[type="radio"]');
  if (radio) {
    const contentpath = radio.dataset.contentpath;
    if (contentpath) {
      const stateValue = getAnswer(contentpath);
      if (stateValue !== undefined && stateValue !== null) return String(stateValue);
    }
  }

  return null;
}

/**
 * Toggle visibility of a subgroup element.
 */
function toggleVisibility(element, visible) {
  if (visible) {
    element.hidden = false;
    element.removeAttribute('aria-hidden');
  } else {
    element.hidden = true;
    element.setAttribute('aria-hidden', 'true');
  }
}
