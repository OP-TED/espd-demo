/**
 * ESPD-EDM Reference Implementation — Main application module.
 * Initializes the app, manages wizard navigation, and wires up events.
 *
 * Navigation flow:
 *   App Load → Home Page (always)
 *   Home Page → Continue (restore wizard) | New ESPD (path selector) | Import
 *   Wizard Header → Home | New (with confirmation if answers exist) | Import
 */

import { loadLanguage, t } from './i18n.js';
import { loadModel, getPart, getPartsForRole, getRoles, getRoleById } from './model.js';
import { initState, getState, setRole, setCurrentStep, getCurrentStep, getRole, resetState, getAnswers, hasAnswers, hasSession } from './state.js';
import { renderPart } from './renderer.js';
import { loadCodelists } from './codelists.js';
import { downloadDocument, downloadDraft } from './xml-export.js';
import { importDocumentFile } from './xml-import.js';
import { renderHomePage } from './home.js';
import { renderPathSelector } from './path-selector.js';
import { renderWizardHeader, updateWizardHeader } from './wizard-header.js';
import { validateInstance, showValidationErrors } from './validation.js';

let wizardParts = []; // Parts available for current role

/**
 * Application bootstrap.
 */
async function init() {
  // Load i18n, the model bundle, and the codelist service data in parallel.
  await Promise.all([
    loadLanguage('en'),
    loadModel(),
    loadCodelists()
  ]);

  // Initialize state (restore from localStorage)
  initState();

  // Wire up event listeners
  setupEventListeners();

  // Always show Home Page on load (Requirement 1.1)
  showHomePage();
}

// ─── Navigation Functions ─────────────────────────────────────────────────────

/**
 * Show the Home Page.
 * Displays the landing page with Continue Card (if session exists), New ESPD, and Import.
 * Does NOT clear localStorage (Requirement 3.5).
 */
function showHomePage() {
  const landingPage = document.getElementById('landing-page');
  const wizardContainer = document.getElementById('wizard-container');

  // Toggle visibility
  landingPage.hidden = false;
  wizardContainer.hidden = true;

  // Get current session state and role data
  const state = getState();
  const roleData = state.role ? getRoleById(state.role) : null;

  // Render home page into landing container
  renderHomePage({
    container: landingPage,
    session: state,
    roleData,
    onContinue: () => {
      // Restore wizard with existing role (Requirement 1.3)
      showWizard(state.role);
    },
    onNewEspd: () => {
      // Show path selector for new ESPD creation
      showPathSelector();
    },
    onImport: (file) => {
      // Trigger import from home page
      handleImportFile(file);
    }
  });
}

/**
 * Show the Path Selector (two-step role selection).
 * Renders into the landing page container.
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
function showPathSelector() {
  const landingPage = document.getElementById('landing-page');
  const wizardContainer = document.getElementById('wizard-container');

  // Toggle visibility: show landing, hide wizard
  landingPage.hidden = false;
  wizardContainer.hidden = true;

  const roles = getRoles();

  renderPathSelector({
    container: landingPage,
    roles,
    onRoleSelected: (roleId) => {
      // Reset state for clean session, set new role (Requirement 2.4)
      resetState();
      setRole(roleId);
      showWizard(roleId);
    },
    onCancel: () => {
      // Return to home page
      showHomePage();
    }
  });
}

/**
 * Show the wizard interface for the selected role.
 * @param {string} roleId - The full role id (e.g., 'sole-tenderer')
 */
function showWizard(roleId) {
  const landingPage = document.getElementById('landing-page');
  const wizardContainer = document.getElementById('wizard-container');

  // Hide landing, show wizard
  landingPage.hidden = true;
  wizardContainer.hidden = false;

  // Get parts for this role (filtered by formBehavior.visibleParts)
  wizardParts = getPartsForRole(roleId);

  // Render the persistent wizard header (Requirements 3.1, 3.2, 3.3, 3.4, 5.1, 5.2)
  const headerContainer = wizardContainer.querySelector('.espd-wizard-header');
  const role = getRoleById(roleId);
  const documentType = role?.documentType || 'request';
  const roleLabel = role ? t(role.labelKey, roleId) : 'Unknown Role';

  renderWizardHeader({
    container: headerContainer,
    documentType,
    roleLabel,
    onHome: () => {
      // Navigate home without clearing localStorage (Requirement 3.5)
      showHomePage();
    },
    onNew: () => {
      // Check if confirmation is needed (Requirement 6.1, 6.4)
      if (hasAnswers()) {
        // Show confirmation dialog
        const dialog = document.getElementById('confirm-new-dialog');
        dialog.showModal();
      } else {
        // No answers — go directly to path selector (Requirement 6.4)
        showPathSelector();
      }
    },
    onImport: () => {
      // Trigger file import from within the wizard
      triggerImportFromWizard();
    }
  });

  // Build step navigation
  buildStepNav();

  // Render the current step
  const step = getCurrentStep();
  renderStep(step);
}

// ─── Import Logic ─────────────────────────────────────────────────────────────

/**
 * Trigger file import from the wizard header.
 * Creates a temporary file input, or reuses one, to select a file.
 */
function triggerImportFromWizard() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml,.json';
  input.style.display = 'none';
  document.body.appendChild(input);

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      handleImportFile(file);
    }
    document.body.removeChild(input);
  });

  input.click();
}

/**
 * Handle importing a file with session overwrite warning.
 * Requirements: 4.3, 4.4, 4.5
 * @param {File} file - The file to import
 */
async function handleImportFile(file) {
  // If a session with answers exists, warn before overwriting (Requirement 4.5)
  if (hasSession() && hasAnswers()) {
    const proceed = confirm('Importing will replace your current session. Do you want to continue?');
    if (!proceed) return;
  }

  const result = await importDocumentFile(file);

  if (result.success) {
    // On successful import, update wizard header and show wizard (Requirement 4.3)
    const importedRole = getRoleById(result.role);
    const docType = importedRole?.documentType || 'request';
    const label = importedRole ? t(importedRole.labelKey, result.role) : 'Unknown Role';

    updateWizardHeader({ documentType: docType, roleLabel: label });
    showWizard(result.role);
  } else {
    // On failure, display an error message (Requirement 4.4)
    alert(`Import failed: ${result.message}`);
  }
}

// ─── Confirmation Dialog Logic ────────────────────────────────────────────────

/**
 * Wire up the confirmation dialog for "New ESPD" action.
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
function setupConfirmDialog() {
  const dialog = document.getElementById('confirm-new-dialog');
  const btnOk = document.getElementById('btn-confirm-new-ok');
  const btnCancel = document.getElementById('btn-confirm-new-cancel');

  // Confirm: reset state and show path selector (Requirement 6.2)
  btnOk.addEventListener('click', () => {
    dialog.close();
    resetState();
    showPathSelector();
  });

  // Cancel: close dialog, return to wizard unchanged (Requirement 6.3)
  btnCancel.addEventListener('click', () => {
    dialog.close();
  });

  // Escape key dismissal is handled natively by <dialog> — fires 'cancel' event
  // which closes the dialog, leaving wizard unchanged (Requirement 6.3)
}

// ─── Event Listeners ──────────────────────────────────────────────────────────

/**
 * Set up all DOM event listeners.
 */
function setupEventListeners() {
  // Wizard navigation
  document.getElementById('btn-prev').addEventListener('click', goToPrevStep);
  document.getElementById('btn-next').addEventListener('click', goToNextStep);
  document.getElementById('btn-download').addEventListener('click', handleDownloadClick);
  document.getElementById('btn-draft').addEventListener('click', () => downloadDraft());
  document.getElementById('btn-validate').addEventListener('click', handleValidateClick);

  // Validation dialog
  document.getElementById('btn-close-validation').addEventListener('click', closeValidationDialog);
  document.getElementById('btn-close-validation-footer').addEventListener('click', closeValidationDialog);

  // Language switcher
  document.getElementById('language-select').addEventListener('change', async (e) => {
    await loadLanguage(e.target.value);
    renderCurrentStep();
  });

  // Keyboard navigation for wizard
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'ArrowRight') {
      e.preventDefault();
      goToNextStep();
    } else if (e.altKey && e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevStep();
    }
  });

  // Wire up confirmation dialog buttons (Requirements 6.1–6.4)
  setupConfirmDialog();
}

// ─── Wizard Navigation ────────────────────────────────────────────────────────

/**
 * Build the step navigation bar.
 */
function buildStepNav() {
  const nav = document.querySelector('.espd-steps');
  nav.innerHTML = '';

  wizardParts.forEach((part, index) => {
    const li = document.createElement('li');
    li.dataset.step = index;

    const shortTitle = `Part ${part.key}`;
    const link = document.createElement('a');
    link.href = '#';
    const num = document.createElement('span');
    num.className = 'espd-step__num';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = part.key;
    const label = document.createElement('span');
    label.className = 'espd-step__label';
    label.textContent = t(`part.short.${part.key}`, shortTitle);
    link.append(num, label);
    link.title = t(`part.title.${part.key}`, part.title);
    link.setAttribute('aria-label', `Step ${index + 1}: ${t(`part.title.${part.key}`, part.title)}`);

    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToStep(index);
    });

    li.appendChild(link);
    nav.appendChild(li);
  });

  updateStepNav();
}

/**
 * Update step navigation to reflect the current active step.
 */
function updateStepNav() {
  const currentStep = getCurrentStep();
  const items = document.querySelectorAll('.espd-steps li');

  items.forEach((item, index) => {
    item.classList.remove('active', 'completed');
    const link = item.querySelector('a');
    if (link) link.removeAttribute('aria-current');
    if (index === currentStep) {
      item.classList.add('active');
      if (link) link.setAttribute('aria-current', 'step');
    } else if (index < currentStep) {
      item.classList.add('completed');
    }
  });

  // Update button states
  document.getElementById('btn-prev').disabled = currentStep === 0;

  const isLastStep = currentStep === wizardParts.length - 1;
  const btnNext = document.getElementById('btn-next');
  const btnDownload = document.getElementById('btn-download');
  const btnDraft = document.getElementById('btn-draft');
  const btnValidate = document.getElementById('btn-validate');

  if (isLastStep) {
    btnNext.hidden = true;
    btnDownload.hidden = false;
    btnDraft.hidden = false;
    // Phase 6A: the Validate button now runs CLIENT-SIDE JSON-Schema validation
    // (precompiled standalone validators, no server), so it is shown on the last
    // step regardless of serverless mode. (The old server-dependent ITB UBL-XML
    // validation was gated on features.itbValidation; that returns with the
    // mapping engine in 6B.)
    btnValidate.hidden = false;
  } else {
    btnNext.hidden = false;
    btnDownload.hidden = true;
    btnDraft.hidden = true;
    btnValidate.hidden = true;
  }
}

/**
 * Navigate to a specific step.
 */
function navigateToStep(index) {
  if (index < 0 || index >= wizardParts.length) return;
  setCurrentStep(index);
  renderStep(index);
}

/**
 * Go to the next step.
 */
function goToNextStep() {
  const current = getCurrentStep();
  if (current < wizardParts.length - 1) {
    navigateToStep(current + 1);
  }
}

/**
 * Go to the previous step.
 */
function goToPrevStep() {
  const current = getCurrentStep();
  if (current > 0) {
    navigateToStep(current - 1);
  }
}

/**
 * Render the step at the given index.
 */
function renderStep(index) {
  const part = wizardParts[index];
  if (!part) return;

  const container = document.getElementById('form-content');
  const partData = getPart(part.key);
  const role = getRole();

  renderPart(partData, part.key, role, container);
  updateStepNav();

  // Scroll to top of wizard (including header)
  document.getElementById('wizard-container').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Announce to screen readers
  const heading = container.querySelector('h2');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
}

/**
 * Render the current step (used after language change).
 */
function renderCurrentStep() {
  renderStep(getCurrentStep());
}

// ─── Export ───────────────────────────────────────────────────────────────────

/**
 * Handle the "Download XML" button: build + download the official UBL document.
 * Async (it fetches the mapping specs + codelist profile); surfaces a readable
 * error if composition fails rather than letting the promise reject silently.
 */
async function handleDownloadClick() {
  const btn = document.getElementById('btn-download');
  const prevLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = t('ui.lookUpLoading', 'Working…');
  try {
    await downloadDocument();
  } catch (err) {
    console.error('UBL export failed', err);
    alert(`Could not generate the ESPD XML: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.textContent = prevLabel;
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Handle the "Validate" button click.
 *
 * Phase 6A: validate the instance document against the precompiled standalone
 * JSON-Schema validators (client-side, no server). Errors are highlighted inline
 * on the fields of the current step (those that are visible) and summarised — for
 * every part — in the validation dialog. Full UBL-XML (Schematron) validation via
 * the mapping engine returns in Phase 6B.
 */
async function handleValidateClick() {
  const container = document.getElementById('form-content');
  const { valid, errors } = validateInstance(getAnswers());

  // Inline markers on the current step's visible fields.
  showValidationErrors(errors, container);

  if (valid) {
    showValidationResults({
      success: true,
      errors: [],
      warnings: [],
      message: t('ui.validationPassed', 'All answers are valid.'),
    });
    return;
  }

  showValidationResults({
    success: false,
    errors: errors.map((e) => ({
      description: e.message,
      location: errorLocation(e.dataPath),
    })),
    warnings: [],
    message: t('ui.validationFailed', 'Please correct the highlighted fields.'),
  });
}

/** Human-readable location for an error, from its dotted dataPath. */
function errorLocation(dataPath) {
  if (!dataPath) return '';
  const partKey = dataPath.split('.')[0]; // partI | partII | …
  const roman = { partI: 'I', partII: 'II', partIII: 'III', partIV: 'IV', partV: 'V', partVI: 'VI' }[partKey];
  const partLabel = roman ? t(`part.short.${roman}`, `Part ${roman}`) : '';
  return partLabel ? `${partLabel} — ${dataPath}` : dataPath;
}

/**
 * Display validation results in the dialog.
 */
function showValidationResults(result) {
  const dialog = document.getElementById('validation-dialog');
  const content = document.getElementById('validation-content');

  let html = '';

  if (result.success) {
    html += `<p class="validation-success">✓ ${escHtml(result.message)}</p>`;
  } else {
    html += `<p class="validation-summary">${escHtml(result.message)}</p>`;

    if (result.errors.length > 0) {
      html += '<h4>Errors</h4><ul class="validation-errors">';
      for (const err of result.errors) {
        html += `<li class="validation-item validation-item--error">
          <p>${escHtml(err.description)}</p>
          ${err.location ? `<code class="validation-location">${escHtml(err.location)}</code>` : ''}
        </li>`;
      }
      html += '</ul>';
    }

    if (result.warnings.length > 0) {
      html += '<h4>Warnings</h4><ul class="validation-warnings">';
      for (const warn of result.warnings) {
        html += `<li class="validation-item validation-item--warning">
          <p>${escHtml(warn.description)}</p>
          ${warn.location ? `<code class="validation-location">${escHtml(warn.location)}</code>` : ''}
        </li>`;
      }
      html += '</ul>';
    }
  }

  content.innerHTML = html;
  dialog.showModal();
}

/**
 * Close the validation dialog and return focus to the validate button.
 */
function closeValidationDialog() {
  const dialog = document.getElementById('validation-dialog');
  dialog.close();
  document.getElementById('btn-validate').focus();
}

/**
 * Escape HTML for safe insertion.
 */
function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Application Init ─────────────────────────────────────────────────────────

init().catch(err => {
  console.error('Failed to initialize ESPD-EDM Reference Implementation:', err);
  document.getElementById('main-content').innerHTML = `
    <article>
      <header>Initialization Error</header>
      <p>Failed to load the ESPD-EDM Reference Implementation. Please refresh the page and try again.</p>
      <p><small>${err.message}</small></p>
    </article>
  `;
});
