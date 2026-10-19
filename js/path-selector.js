/**
 * Path Selector module — role selection flow.
 * Step 1: Choose a path (Buyer or Economic Operator).
 *   - Buyer: no sub-type is shown (the UI treats all buyers as one "Buyer"), so
 *     selecting it enters the wizard directly with the default buyer role.
 *   - Economic Operator: proceeds to Step 2 to pick a specific EO role.
 * Step 2 (EO only): choose a specific Economic Operator role.
 */

import { t } from './i18n.js';

/**
 * Renders the two-step role selector.
 * Step 1: Choose path (Buyer / Economic Operator)
 * Step 2: Choose specific role within path
 * @param {object} options
 * @param {HTMLElement} options.container - Target container
 * @param {object} options.roles - The roles registry from getRoles()
 * @param {function} options.onRoleSelected - Callback with selected role id
 * @param {function} options.onCancel - Callback to go back to home page
 */
export function renderPathSelector({ container, roles, onRoleSelected, onCancel }) {
  renderStep1({ container, roles, onRoleSelected, onCancel });
}

/**
 * Render Step 1: path selection (Buyer vs Economic Operator).
 */
function renderStep1({ container, roles, onRoleSelected, onCancel }) {
  container.innerHTML = '';

  const heading = document.createElement('hgroup');
  heading.innerHTML = `
    <h2>Create a New ESPD</h2>
    <p>Choose your path to get started.</p>
  `;
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'grid';

  // Buyer card. The UI no longer differentiates buyer sub-types (Contracting
  // Authority vs Contracting Entity) — it presents a single "Buyer" — so picking
  // Buyer goes STRAIGHT into the wizard, skipping the per-role step. The model
  // still keeps both buyer types (see model-sources/registries/roles.json); the
  // UI defaults to the first one so the CA/CE distinction survives underneath for
  // when further buyer roles are introduced.
  const defaultBuyerRoleId = roles.buyerTypes[0]?.id;
  const buyerCard = createPathCard({
    title: 'Buyer',
    description: 'Create an ESPD Request defining the criteria and exclusion grounds for a procurement procedure.',
    buttonLabel: 'Create ESPD Request',
    onClick: () => onRoleSelected(defaultBuyerRoleId)
  });
  grid.appendChild(buyerCard);

  // Economic Operator card. EO sub-roles (sole tenderer, group leader/member,
  // other-entity-relied-on, subcontractor) are a real distinction that maps to
  // cac:EconomicOperatorRole/cbc:RoleCode, so the EO path keeps its role step.
  const eoCard = createPathCard({
    title: 'Economic Operator',
    description: 'Create an ESPD Response to declare your suitability for a procurement procedure.',
    buttonLabel: 'Select Economic Operator Path',
    onClick: () => renderStep2({
      container,
      roleEntries: roles.eoRoles,
      roles,
      onRoleSelected,
      onCancel
    })
  });
  grid.appendChild(eoCard);

  container.appendChild(grid);

  // Cancel link
  if (onCancel) {
    const cancelNav = document.createElement('nav');
    cancelNav.className = 'espd-path-selector__cancel';
    const cancelLink = document.createElement('a');
    cancelLink.href = '#';
    cancelLink.textContent = '← Back to Home';
    cancelLink.addEventListener('click', (e) => {
      e.preventDefault();
      onCancel();
    });
    cancelNav.appendChild(cancelLink);
    container.appendChild(cancelNav);
  }

  // Set focus to first interactive element (Requirement 7.3)
  requestAnimationFrame(() => {
    const firstButton = container.querySelector('button');
    if (firstButton) firstButton.focus();
  });
}

/**
 * Render Step 2: specific Economic Operator role selection.
 * Uses radio buttons for role selection with a single Continue button. Only the
 * EO path reaches this step — the buyer path goes straight into the wizard.
 */
function renderStep2({ container, roleEntries, roles, onRoleSelected, onCancel }) {
  container.innerHTML = '';

  const heading = document.createElement('hgroup');
  heading.innerHTML = `
    <h2>Select Your Role</h2>
    <p>Choose a specific Economic Operator role.</p>
  `;
  container.appendChild(heading);

  // Back link to return to step 1
  const backNav = document.createElement('nav');
  backNav.className = 'espd-path-selector__back';
  const backLink = document.createElement('a');
  backLink.href = '#';
  backLink.textContent = '← Back';
  backLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderStep1({ container, roles, onRoleSelected, onCancel });
  });
  backNav.appendChild(backLink);
  container.appendChild(backNav);

  // Radio group for role selection
  const fieldset = document.createElement('fieldset');
  fieldset.setAttribute('role', 'radiogroup');
  fieldset.setAttribute('aria-label', 'Economic Operator role selection');

  let selectedRoleId = roleEntries[0]?.id || null;

  for (const role of roleEntries) {
    const label = document.createElement('label');
    label.className = 'espd-role-radio';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'espd-role';
    radio.value = role.id;
    if (role.id === selectedRoleId) radio.checked = true;
    radio.addEventListener('change', () => {
      selectedRoleId = role.id;
    });

    const textWrapper = document.createElement('span');
    textWrapper.className = 'espd-role-radio__text';

    const labelText = document.createElement('strong');
    labelText.textContent = t(role.labelKey, role.id);

    const descText = document.createElement('small');
    descText.textContent = t(role.descriptionKey, '');

    textWrapper.appendChild(labelText);
    textWrapper.appendChild(document.createElement('br'));
    textWrapper.appendChild(descText);

    label.appendChild(radio);
    label.appendChild(textWrapper);
    fieldset.appendChild(label);
  }

  container.appendChild(fieldset);

  // Continue button
  const actions = document.createElement('div');
  actions.className = 'espd-path-selector__actions';
  const continueBtn = document.createElement('button');
  continueBtn.textContent = 'Create ESPD Response';
  continueBtn.className = 'contrast';
  continueBtn.addEventListener('click', () => {
    if (selectedRoleId) {
      onRoleSelected(selectedRoleId);
    }
  });
  actions.appendChild(continueBtn);
  container.appendChild(actions);

  // Set focus to first radio (Requirement 7.3)
  requestAnimationFrame(() => {
    const firstRadio = container.querySelector('input[type="radio"]');
    if (firstRadio) firstRadio.focus();
  });
}

/**
 * Create a path selection card (Step 1).
 * @param {object} options
 * @param {string} options.title - Card title
 * @param {string} options.description - Card description
 * @param {string} options.buttonLabel - Button text
 * @param {function} options.onClick - Click handler
 * @returns {HTMLElement}
 */
function createPathCard({ title, description, buttonLabel, onClick }) {
  const article = document.createElement('article');

  const header = document.createElement('header');
  header.textContent = title;
  article.appendChild(header);

  const desc = document.createElement('p');
  desc.textContent = description;
  article.appendChild(desc);

  const footer = document.createElement('footer');
  const btn = document.createElement('button');
  btn.textContent = buttonLabel;
  btn.setAttribute('aria-label', buttonLabel);
  btn.addEventListener('click', onClick);
  footer.appendChild(btn);
  article.appendChild(footer);

  return article;
}

/**
 * Create a role selection card (Step 2).
 * @param {object} options
 * @param {object} options.role - Role entry from roles.json
 * @param {function} options.onClick - Click handler
 * @returns {HTMLElement}
 */
function createRoleCard({ role, onClick }) {
  const article = document.createElement('article');

  const header = document.createElement('header');
  header.textContent = t(role.labelKey, role.id);
  article.appendChild(header);

  const desc = document.createElement('p');
  desc.textContent = t(role.descriptionKey, '');
  article.appendChild(desc);

  const footer = document.createElement('footer');
  const btn = document.createElement('button');
  btn.textContent = role.documentType === 'request' ? 'Create ESPD Request' : 'Create ESPD Response';
  btn.setAttribute('aria-label', `Select role: ${t(role.labelKey, role.id)}`);
  btn.addEventListener('click', onClick);
  footer.appendChild(btn);
  article.appendChild(footer);

  return article;
}
