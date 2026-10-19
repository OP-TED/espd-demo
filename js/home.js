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
  if (documentType === 'response') return 'ESPD Response';
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
  const roleLabel = roleData ? t(roleData.labelKey, roleData.id) : 'Unknown Role';
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

/**
 * Renders the import area (file input + import button, prominently displayed).
 * @returns {string} HTML string
 */
function renderImportArea() {
  return `
    <div class="espd-import-area" role="region" aria-label="Import existing ESPD">
      <h2>Import an ESPD document</h2>
      <p>Load an ESPD Request you received, or an ESPD you saved earlier, as an XML file.</p>
      <div class="espd-import-controls">
        <input type="file" id="import-file-home" accept=".xml,.json" aria-label="Select ESPD file to import">
        <button type="button" id="btn-import-home" class="secondary">Import</button>
      </div>
    </div>
  `;
}

/**
 * Renders the home page content into the specified container.
 *
 * When a session with a role exists, displays a Continue Card with session
 * details plus the New ESPD and Import options.
 *
 * When no session exists, displays only the New ESPD button and Import area.
 *
 * @param {object} options
 * @param {HTMLElement} options.container - The #landing-page element
 * @param {object|null} options.session - Current state from getState()
 * @param {object|null} options.roleData - Role metadata from getRoleById()
 * @param {function} options.onContinue - Callback when Continue card is clicked
 * @param {function} options.onNewEspd - Callback to open path selector
 * @param {function(File):void} options.onImport - Callback when import file is selected
 */
export function renderHomePage({ container, session, roleData, onContinue, onNewEspd, onImport }) {
  if (!container) return;

  const hasSession = session && session.role;

  let html = `
    <hgroup>
      <h1 id="landing-heading">European Single Procurement Document</h1>
      <p>Create an ESPD Request or Response for EU public procurement procedures.</p>
    </hgroup>
  `;

  // Section order (left to right): 1. Create new  2. Import  3. Continue.

  // 1. Create new ESPD document
  html += `
    <div class="espd-home-actions" role="region" aria-labelledby="new-espd-heading">
      <h2 id="new-espd-heading">Create new ESPD document</h2>
      <p>Buyers create an ESPD Request setting out the exclusion grounds and selection criteria. Economic operators answer it with an ESPD or create an ESPD from scratch.</p>
      <div>
        <button type="button" id="btn-new-espd" class="contrast">New ESPD document</button>
      </div>
    </div>
  `;

  // 2. Import area — prominently displayed, not inside <details> (Requirement 4.1)
  html += renderImportArea();

  // 3. Continue Card (only when a session exists)
  if (hasSession && roleData) {
    html += renderContinueCard(session, roleData, onContinue);
  }

  container.innerHTML = html;

  // Wire event listeners
  const continueBtn = container.querySelector('#btn-continue-session');
  if (continueBtn && onContinue) {
    continueBtn.addEventListener('click', onContinue);
  }

  const newBtn = container.querySelector('#btn-new-espd');
  if (newBtn && onNewEspd) {
    newBtn.addEventListener('click', onNewEspd);
  }

  // Import: read the selected file and pass to callback
  const importFileInput = container.querySelector('#import-file-home');
  const importBtn = container.querySelector('#btn-import-home');

  if (importBtn && importFileInput && onImport) {
    importBtn.addEventListener('click', () => {
      const file = importFileInput.files[0];
      if (file) {
        onImport(file);
      }
    });
  }
}
