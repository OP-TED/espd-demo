/**
 * Home Page Controller module — renders the home/landing page content.
 * Displays either a Continue Card (when a session exists) or just the
 * New ESPD / Import options (when no session exists).
 */

import { t } from './i18n.js';

/**
 * Computes a human-readable relative time string from an ISO timestamp.
 * @param {string} isoTimestamp - ISO 8601 timestamp
 * @returns {string} Relative time (e.g., "2 hours ago", "just now")
 */
function formatRelativeTime(isoTimestamp) {
  if (!isoTimestamp) return 'Unknown';

  const now = Date.now();
  const then = new Date(isoTimestamp).getTime();

  if (isNaN(then)) return 'Unknown';

  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
}

/**
 * Formats the document type for display.
 * @param {string} documentType - "request" or "response"
 * @returns {string}
 */
function formatDocumentType(documentType) {
  if (documentType === 'request') return 'ESPD Request';
  if (documentType === 'response') return 'ESPD';
  return 'ESPD';
}

/**
 * Computes the answered question count from a session's answers object.
 * @param {object} answers - The answers map
 * @returns {number}
 */
function getAnsweredCount(instance) {
  // Count leaf values in the nested instance document.
  if (instance === null || instance === undefined) return 0;
  if (typeof instance !== 'object') return 1;
  return Object.values(instance).reduce((n, v) => n + getAnsweredCount(v), 0);
}

/**
 * Renders the Continue Card for an existing session.
 * @param {object} session - The session state
 * @param {object} roleData - Role metadata from getRoleById()
 * @param {function} onContinue - Callback when Continue is clicked
 * @returns {string} HTML string
 */
function renderContinueCard(session, roleData, onContinue) {
  const documentType = roleData?.documentType || 'request';
  // The UI no longer differentiates buyer sub-types (Contracting Authority vs
  // Contracting Entity) — all buyers are shown as "Buyer". Economic-operator
  // sub-roles stay distinct (sole tenderer, group member, …), so show their
  // specific label.
  const roleLabel = documentType === 'request'
    ? 'Buyer'
    : (roleData ? t(roleData.labelKey, roleData.id) : 'Unknown Role');
  const lastModified = session.metadata?.lastModified || null;
  const answeredCount = getAnsweredCount(session.instance);
  const badgeModifier = documentType === 'response' ? 'espd-doc-badge--response' : 'espd-doc-badge--request';
  const badgeText = formatDocumentType(documentType);
  const relativeTime = formatRelativeTime(lastModified);
  const isoTitle = lastModified || '';

  return `
    <article class="espd-continue-card" role="region" aria-label="Continue existing ESPD session">
      <header>
        <span class="espd-doc-badge ${badgeModifier}" aria-label="Document type: ${badgeText}">
          ${badgeText}
        </span>
        <span class="espd-continue-card__role">${roleLabel}</span>
      </header>
      <div class="espd-continue-card__details">
        <p>
          <time datetime="${isoTitle}" title="${isoTitle}">Last modified: ${relativeTime}</time>
        </p>
        <p>${answeredCount} question${answeredCount !== 1 ? 's' : ''} answered</p>
      </div>
      <footer>
        <button type="button" id="btn-continue-session" aria-label="Continue editing ${badgeText} as ${roleLabel}">Continue</button>
      </footer>
    </article>
  `;
}

/** The Buyer role section: create a new Request, or reuse an existing one. */
function renderBuyerSection() {
  return `
    <section class="espd-role-panel" role="region" aria-labelledby="buyer-heading">
      <h2 id="buyer-heading">Buyer</h2>
      <p>Create an ESPD Request setting out the exclusion grounds and selection criteria for a procurement procedure.</p>
      <div class="espd-role-panel__actions">
        <button type="button" id="btn-buyer-create" class="contrast">Create a new ESPD</button>
        <div class="espd-reuse-control">
          <button type="button" id="btn-buyer-reuse" class="secondary">Reuse an existing ESPD</button>
          <input type="file" id="buyer-reuse-file" accept=".xml,.json" hidden aria-label="Select an ESPD Request to reuse">
        </div>
      </div>
      <p class="espd-role-panel__hint">Reuse loads an ESPD Request you prepared earlier so you can keep editing it.</p>
    </section>
  `;
}

/** The Economic Operator role section: import a Request/response, or start fresh. */
function renderEoSection() {
  return `
    <section class="espd-role-panel" role="region" aria-labelledby="eo-heading">
      <h2 id="eo-heading">Economic Operator</h2>
      <p>Respond to a buyer's ESPD Request, or create your ESPD from scratch to declare your suitability.</p>
      <div class="espd-role-panel__actions">
        <button type="button" id="btn-eo-import" class="contrast">Import ESPD</button>
        <button type="button" id="btn-eo-create" class="secondary">Create response</button>
      </div>
      <p class="espd-role-panel__hint">Import loads the buyer's ESPD Request (or your own saved ESPD) so you can complete your answers.</p>
    </section>
  `;
}

/**
 * Renders the home page content into the specified container.
 *
 * Two role-scoped sections — Buyer (create / reuse a Request) and Economic
 * Operator (import / create a response) — plus a Continue card when a session
 * exists. Mirrors the flow of other ESPD services so users feel familiar.
 *
 * @param {object} options
 * @param {HTMLElement} options.container - The #landing-page element
 * @param {object|null} options.session - Current state from getState()
 * @param {object|null} options.roleData - Role metadata from getRoleById()
 * @param {function} options.onContinue   - resume the saved session
 * @param {function} options.onBuyerCreate - buyer: new blank Request
 * @param {function(File):void} options.onBuyerReuse - buyer: import a Request to keep editing
 * @param {function} options.onEoImport   - EO: pick sub-role, then import a Request/response
 * @param {function} options.onEoCreate   - EO: pick sub-role, then a blank Response
 */
export function renderHomePage({ container, session, roleData, onContinue, onBuyerCreate, onBuyerReuse, onEoImport, onEoCreate }) {
  if (!container) return;

  const hasSession = session && session.role;

  let html = `
    <hgroup>
      <h1 id="landing-heading">European Single Procurement Document</h1>
      <p>Create an ESPD Request as a buyer, or complete your ESPD as an economic operator.</p>
    </hgroup>
  `;

  // Continue card first when a session exists, so resuming is one click away.
  if (hasSession && roleData) {
    html += renderContinueCard(session, roleData, onContinue);
  }

  html += renderBuyerSection();
  html += renderEoSection();

  container.innerHTML = html;

  // ─ Continue ─
  const continueBtn = container.querySelector('#btn-continue-session');
  if (continueBtn && onContinue) continueBtn.addEventListener('click', onContinue);

  // ─ Buyer ─
  const buyerCreate = container.querySelector('#btn-buyer-create');
  if (buyerCreate && onBuyerCreate) buyerCreate.addEventListener('click', onBuyerCreate);

  const reuseBtn = container.querySelector('#btn-buyer-reuse');
  const reuseFile = container.querySelector('#buyer-reuse-file');
  if (reuseBtn && reuseFile && onBuyerReuse) {
    reuseBtn.addEventListener('click', () => reuseFile.click());
    reuseFile.addEventListener('change', () => {
      const file = reuseFile.files[0];
      if (file) onBuyerReuse(file);
    });
  }

  // ─ Economic Operator ─ (the file step happens AFTER the sub-role picker, in app.js)
  const eoImport = container.querySelector('#btn-eo-import');
  if (eoImport && onEoImport) eoImport.addEventListener('click', onEoImport);

  const eoCreate = container.querySelector('#btn-eo-create');
  if (eoCreate && onEoCreate) eoCreate.addEventListener('click', onEoCreate);
}
