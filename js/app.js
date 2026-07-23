/**
 * ESPD Service — Main application module.
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
import { downloadXml, generateXml } from './xml-export.js';
import { importXmlFile } from './xml-import.js';
import { renderHomePage } from './home.js';
import { renderPathSelector } from './path-selector.js';
import { renderWizardHeader, updateWizardHeader } from './wizard-header.js';

let wizardParts = []; // Parts available for current role

/**
 * Application bootstrap.
 */
async function init() {
  // Load i18n and model in parallel
  await Promise.all([
    loadLanguage('en'),
    loadModel()
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
  const roleLabel = role?.label || 'Unknown Role';

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

  const result = await importXmlFile(file);

  if (result.success) {
    // On successful import, update wizard header and show wizard (Requirement 4.3)
    const importedRole = getRoleById(result.role);
    const docType = importedRole?.documentType || 'request';
    const label = importedRole?.label || 'Unknown Role';

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
  document.getElementById('btn-overview').addEventListener('click', showOverview);
  document.getElementById('btn-download').addEventListener('click', () => downloadXml());

  // Overview dialog
  document.getElementById('btn-close-overview').addEventListener('click', closeOverview);
  document.getElementById('btn-close-overview-footer').addEventListener('click', closeOverview);
  document.getElementById('btn-download-overview').addEventListener('click', () => {
    downloadXml();
    closeOverview();
  });

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
    link.textContent = shortTitle;
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
    if (index === currentStep) {
      item.classList.add('active');
    } else if (index < currentStep) {
      item.classList.add('completed');
    }
  });

  // Update button states
  document.getElementById('btn-prev').disabled = currentStep === 0;

  const isLastStep = currentStep === wizardParts.length - 1;
  const btnNext = document.getElementById('btn-next');
  const btnDownload = document.getElementById('btn-download');

  if (isLastStep) {
    btnNext.hidden = true;
    btnDownload.hidden = false;
  } else {
    btnNext.hidden = false;
    btnDownload.hidden = true;
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

// ─── Overview Dialog ──────────────────────────────────────────────────────────

/**
 * Show the overview dialog with a summary of all parts.
 */
function showOverview() {
  const dialog = document.getElementById('overview-dialog');
  const content = document.getElementById('overview-content');
  const answers = getAnswers();

  let html = '';

  for (const part of wizardParts) {
    const partData = getPart(part.key);
    html += `<h4>Part ${part.key}: ${t('part.title.' + part.key, partData.title)}</h4>`;

    const questionCounts = countQuestionsSimple(partData.sections, answers);
    html += `<p><small>${questionCounts.answered} of ${questionCounts.total} questions answered</small></p>`;
  }

  // Show XML preview size
  try {
    const xml = generateXml();
    html += `<hr><p><small>Generated XML size: ${(xml.length / 1024).toFixed(1)} KB</small></p>`;
  } catch (e) {
    html += `<hr><p><small>XML generation preview not available</small></p>`;
  }

  content.innerHTML = html;
  dialog.showModal();
}

/**
 * Close the overview dialog.
 */
function closeOverview() {
  const dialog = document.getElementById('overview-dialog');
  dialog.close();
}

/**
 * Simple count of questions and answered questions in sections.
 */
function countQuestionsSimple(sections, answers) {
  let answered = 0;
  let total = 0;

  function walk(components) {
    if (!components) return;
    for (const comp of components) {
      if (comp.type === 'QUESTION' && comp.contentpath) {
        total++;
        const val = answers[comp.contentpath];
        if (val !== undefined && val !== null && val !== '') {
          answered++;
        }
      }
      if (comp.components) walk(comp.components);
    }
  }

  for (const section of sections) {
    walk(section.components);
  }

  return { answered, total };
}

// ─── Application Init ─────────────────────────────────────────────────────────

init().catch(err => {
  console.error('Failed to initialize ESPD Service:', err);
  document.getElementById('main-content').innerHTML = `
    <article>
      <header>Initialization Error</header>
      <p>Failed to load the ESPD Service. Please refresh the page and try again.</p>
      <p><small>${err.message}</small></p>
    </article>
  `;
});
