/**
 * Feature flags for the ESPD Service application.
 *
 * Controls which server-dependent features are enabled.
 * When running as a pure static site (no backend proxy), disable
 * tedLookup and itbValidation to hide UI that would fail without a server.
 *
 * Detection logic (in priority order):
 *   1. URL search parameter ?serverless (or ?serverless=true) — per-request override
 *   2. Build-time global window.__ESPD_SERVERLESS__ — set by the deployment
 *      (see js/runtime-config.js, overwritten by the `build:pages` script)
 *   3. Falls back to a hardcoded default (all features ON)
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

/** Server-dependent features all OFF (pure static / serverless deployment). */
const serverlessFlags = {
  tedLookup: false,
  itbValidation: false,
};

/**
 * Resolve effective feature flags.
 *
 * Priority:
 *   1. ?serverless / ?serverless=true|1 in the URL forces serverless mode.
 *   2. A build-time global window.__ESPD_SERVERLESS__ === true forces
 *      serverless mode (used by the GitLab Pages build).
 *   3. Otherwise the defaults apply (all features ON, for local dev with
 *      the proxying dev-server).
 */
function resolveFeatures() {
  const params = new URLSearchParams(window.location.search);

  if (params.has('serverless')) {
    const val = params.get('serverless');
    // ?serverless (no value) or ?serverless=true → disable server features
    const isServerless = val === null || val === '' || val === 'true' || val === '1';
    if (isServerless) {
      return { ...serverlessFlags };
    }
    // ?serverless=false → force full mode even if the build defaulted to serverless
    return { ...defaults };
  }

  // Build-time default injected by the deployment (js/runtime-config.js).
  if (typeof window !== 'undefined' && window.__ESPD_SERVERLESS__ === true) {
    return { ...serverlessFlags };
  }

  return { ...defaults };
}

/** Resolved feature flags for this page load (immutable). */
export const features = Object.freeze(resolveFeatures());
