/**
 * Wizard Header module — renders and manages the persistent header
 * displayed above the wizard form showing document context and actions.
 */

/** @type {HTMLElement|null} */
let headerContainer = null;

/**
 * Formats the document type string for display.
 * @param {string} documentType - "request" or "response"
 * @returns {string} Display text like "ESPD Request" or "ESPD Response"
 */
function formatBadgeText(documentType) {
  if (documentType === 'request') return 'ESPD Request';
  if (documentType === 'response') return 'ESPD Response';
  return 'ESPD';
}

/**
 * Builds the aria-label for the document type badge.
 * @param {string} documentType - "request" or "response"
 * @param {string} roleLabel - Human-readable role label
 * @returns {string}
 */
function buildBadgeAriaLabel(documentType, roleLabel) {
  const typeText = formatBadgeText(documentType);
  return `Document type: ${typeText}, Role: ${roleLabel}`;
}

/**
 * Renders the persistent wizard header into the given container.
 *
 * @param {object} options
 * @param {HTMLElement} options.container - A header element to render into
 * @param {string} options.documentType - "request" or "response"
 * @param {string} options.roleLabel - Display label for current role
 * @param {function} options.onHome - Callback for Home action
 * @param {function} options.onNew - Callback for New action
 * @param {function} options.onImport - Callback for Import action
 */
export function renderWizardHeader({ container, documentType, roleLabel, onHome, onNew, onImport }) {
  headerContainer = container;

  const badgeModifier = documentType === 'response' ? 'espd-doc-badge--response' : 'espd-doc-badge--request';
  const badgeText = formatBadgeText(documentType);
  const ariaLabel = buildBadgeAriaLabel(documentType, roleLabel);

  container.setAttribute('role', 'banner');
  container.innerHTML = `
    <div class="espd-wizard-header__context">
      <span class="espd-doc-badge ${badgeModifier}" aria-label="${ariaLabel}">
        ${badgeText}
      </span>
      <span class="espd-wizard-header__role">${roleLabel}</span>
    </div>
    <nav class="espd-wizard-header__actions" aria-label="Wizard actions">
      <button type="button" class="outline secondary" data-action="home">Home</button>
      <button type="button" class="outline secondary" data-action="new">New</button>
      <button type="button" class="outline secondary" data-action="import">Import</button>
    </nav>
  `;

  // Wire up action buttons
  const homeBtn = container.querySelector('[data-action="home"]');
  const newBtn = container.querySelector('[data-action="new"]');
  const importBtn = container.querySelector('[data-action="import"]');

  if (onHome) homeBtn.addEventListener('click', onHome);
  if (onNew) newBtn.addEventListener('click', onNew);
  if (onImport) importBtn.addEventListener('click', onImport);
}

/**
 * Updates the badge and role label without a full re-render.
 * Useful after import changes the document type.
 *
 * @param {object} options
 * @param {string} options.documentType - "request" or "response"
 * @param {string} options.roleLabel - Display label for current role
 */
export function updateWizardHeader({ documentType, roleLabel }) {
  if (!headerContainer) return;

  const badge = headerContainer.querySelector('.espd-doc-badge');
  const roleEl = headerContainer.querySelector('.espd-wizard-header__role');

  if (badge) {
    const badgeModifier = documentType === 'response' ? 'espd-doc-badge--response' : 'espd-doc-badge--request';
    badge.className = `espd-doc-badge ${badgeModifier}`;
    badge.textContent = formatBadgeText(documentType);
    badge.setAttribute('aria-label', buildBadgeAriaLabel(documentType, roleLabel));
  }

  if (roleEl) {
    roleEl.textContent = roleLabel;
  }
}
