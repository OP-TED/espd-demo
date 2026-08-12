/**
 * Feature flags for the ESPD Service application.
 *
 * Controls which server-dependent features are enabled.
 * When running as a pure static site (no backend proxy), disable
 * tedLookup and itbValidation to hide UI that would fail without a server.
 *
 * Detection logic:
 *   - Checks the URL search parameter ?serverless (or ?serverless=true)
 *   - Falls back to a hardcoded default (all features ON)
 *
 * Usage:
 *   import { features } from './features.js';
 *   if (features.tedLookup) { … }
 */

/**
 * @typedef {object} FeatureFlags
 * @property {boolean} tedLookup  - TED notice lookup (requires /api/ted proxy)
 * @property {boolean} itbValidation - ITB XML validation (requires /api/itb proxy)
 */

/** @type {FeatureFlags} */
const defaults = {
  tedLookup: true,
  itbValidation: true,
};

/**
 * Resolve effective feature flags.
 * If the page is loaded with ?serverless or ?serverless=true, both
 * server-dependent features are disabled automatically.
 */
function resolveFeatures() {
  const params = new URLSearchParams(window.location.search);

  if (params.has('serverless')) {
    const val = params.get('serverless');
    // ?serverless (no value) or ?serverless=true → disable server features
    const isServerless = val === null || val === '' || val === 'true' || val === '1';
    if (isServerless) {
      return {
        tedLookup: false,
        itbValidation: false,
      };
    }
  }

  return { ...defaults };
}

/** Resolved feature flags for this page load (immutable). */
export const features = Object.freeze(resolveFeatures());
