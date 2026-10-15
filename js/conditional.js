/**
 * Conditional logic — declarative visibleWhen evaluation.
 *
 * Each field whose model carries a `visibleWhen` is rendered inside a wrapper
 * marked with data-visible-when="<json>", where the JSON is either
 *   { "path": "<dataPath>", "equals": <value> }     // show when answer === value
 *   { "path": "<dataPath>", "isPresent": true }      // show when answer is non-empty
 * applyConditionalLogic reads those wrappers and toggles `hidden` by evaluating
 * the condition against the instance document (the dataPath answer store). This
 * replaces the former DOM-code (ONTRUE/ONFALSE) + sibling-INDICATOR mechanism.
 */

import { getAnswer } from './state.js';

/** Is a stored answer "present" (non-empty)? */
function isPresent(value) {
  if (value === null || value === undefined || value === '') return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.values(value).some((v) => isPresent(v));
  return true;
}

/** Evaluate one visibleWhen condition against the instance document. */
export function evaluateVisibleWhen(cond) {
  if (!cond || !cond.path) return true;
  const value = getAnswer(cond.path);
  if (Object.hasOwn(cond, 'equals')) return value === cond.equals;
  if (Object.hasOwn(cond, 'isPresent')) return isPresent(value) === cond.isPresent;
  return true;
}

/**
 * Toggle every conditional wrapper in a container based on the current answers.
 * Call after rendering and after any answer changes.
 */
export function applyConditionalLogic(container) {
  if (!container) return;
  for (const el of container.querySelectorAll('[data-visible-when]')) {
    let cond;
    try {
      cond = JSON.parse(el.dataset.visibleWhen);
    } catch {
      continue;
    }
    const visible = evaluateVisibleWhen(cond);
    el.hidden = !visible;
    if (visible) el.removeAttribute('aria-hidden');
    else el.setAttribute('aria-hidden', 'true');
  }
}
