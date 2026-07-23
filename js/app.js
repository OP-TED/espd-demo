/**
 * ESPD Service — Main application module.
 * Initializes the app, manages wizard navigation, and wires up events.
 */

import { loadLanguage, t } from './i18n.js';
import { loadModel, getParts, getPart, getPartsForRole, getRoles, getRoleById } from './model.js';
import { initState, getState, setRole, setCurrentStep, getCurrentStep, getRole, resetState, getAnswers } from './state.js';
import { renderPart } from './renderer.js';
import { validatePart, showValidationErrors, clearValidationErrors } from './validation.js';
import { downloadXml, generateXml } from './xml-export.js';
import { importXmlFile } from './xml-import.js';

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

  // Render role cards from roles.json
  renderRoleCards();

  // If we have a saved role, restore the wizard
  const state = getState();
  if (state.role) {
    showWizard(state.role);
  }
}

/**
 * Render role selection cards dynamically from roles.json.
 */
function renderRoleCards() {
  const roles = getRoles();
  if (!roles) return;

  const buyerContainer = document.getElementById('buyer-roles');
  const eoContainer = document.getElementById('eo-roles');

  // Render buyer-type cards
  for (const role of roles.buyerTypes) {
    buyerContainer.appendChild(createRoleCard(role, 'contrast'));
  }

  // Render EO role cards
  for (const role of roles.eoRoles) {
    eoContainer.appendChild(createRoleCard(role, ''));
  }
}

/**
 * Create a role selection card element.
 * @param {object} role - The role entry from roles.json
 * @param {string} buttonClass - CSS class for the button (e.g., 'contrast')
 * @returns {HTMLElement}
 */
function createRoleCard(role, buttonClass) {
  const article = document.createElement('article');

  const header = document.createElement('header');
  header.textContent = role.label;
  article.appendChild(header);

  const desc = document.createElement('p');
  desc.textContent = role.description;
  article.appendChild(desc);

  const footer = document.createElement('footer');
  const btn = document.createElement('button');
  btn.textContent = role.documentType === 'request' ? 'Create ESPD Request' : 'Create ESPD Response';
  btn.setAttribute('aria-label', `Select role: ${role.label}`);
  if (buttonClass) btn.className = buttonClass;
  btn.addEventListener('click', () => {
    resetState();
    setRole(role.id);
    showWizard(role.id);
  });
  footer.appendChild(btn);
  article.appendChild(footer);

  return article;
}

/**
 * Set up all DOM event listeners.
 */
function setupEventListeners() {
  // Import
  document.getElementById('btn-import').addEventListener('click', handleImport);

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
}

/**
 * Show the wizard interface for the selected role.
 * @param {string} roleId - The full role id (e.g., 'sole-tenderer')
 */
function showWizard(roleId) {
  // Hide landing, show wizard
  document.getElementById('landing-page').hidden = true;
  document.getElementById('wizard-container').hidden = false;

  // Get parts for this role (filtered by formBehavior.visibleParts)
  wizardParts = getPartsForRole(roleId);

  // Build step navigation
  buildStepNav();

  // Render the current step
  const step = getCurrentStep();
  renderStep(step);
}

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

  // Scroll to top of form
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });

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

/**
 * Handle file import.
 */
async function handleImport() {
  const fileInput = document.getElementById('import-file');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file to import.');
    return;
  }

  const result = await importXmlFile(file);

  if (result.success) {
    alert(result.message);
    showWizard(result.role);
  } else {
    alert(`Import failed: ${result.message}`);
  }
}

/**
 * Show the overview dialog with a summary of all parts.
 */
function showOverview() {
  const dialog = document.getElementById('overview-dialog');
  const content = document.getElementById('overview-content');
  const answers = getAnswers();
  const role = getRole();

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

// Initialize the application
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
