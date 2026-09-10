/**
 * Runtime configuration injected before the application boots.
 *
 * This is the DEVELOPMENT default: server-dependent features stay ON so the
 * proxying dev-server (`npm run dev`) works normally.
 *
 * For static deployments (e.g. GitLab Pages), the `build:pages` script
 * overwrites this file to set `window.__ESPD_SERVERLESS__ = true`, which
 * disables the TED lookup and ITB validation features (see js/features.js).
 *
 * A per-request override is always available via the ?serverless / ?serverless=false
 * URL query parameter.
 */
window.__ESPD_SERVERLESS__ = false;
