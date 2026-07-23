/**
 * Path Selector module — two-step role selection flow.
 * Step 1: Choose a path (Buyer or Economic Operator).
 * Step 2: Choose a specific role within the selected path.
 */

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

  // Buyer card
  const buyerCard = createPathCard({
    title: 'Buyer',
    description: 'Create an ESPD Request defining the criteria and exclusion grounds for a procurement procedure.',
    buttonLabel: 'Select Buyer Path',
    onClick: () => renderStep2({
      container,
      path: 'buyer',
      roleEntries: roles.buyerTypes,
      roles,
      onRoleSelected,
      onCancel
    })
  });
  grid.appendChild(buyerCard);

  // Economic Operator card
  const eoCard = createPathCard({
    title: 'Economic Operator',
    description: 'Create an ESPD Response to declare your suitability for a procurement procedure.',
    buttonLabel: 'Select Economic Operator Path',
    onClick: () => renderStep2({
      container,
      path: 'eo',
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
 * Render Step 2: specific role selection for the chosen path.
 */
function renderStep2({ container, path, roleEntries, roles, onRoleSelected, onCancel }) {
  container.innerHTML = '';

  const pathLabel = path === 'buyer' ? 'Buyer' : 'Economic Operator';

  const heading = document.createElement('hgroup');
  heading.innerHTML = `
    <h2>Select Your Role</h2>
    <p>Choose a specific ${pathLabel} role.</p>
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

  // Role cards
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (const role of roleEntries) {
    const card = createRoleCard({
      role,
      onClick: () => onRoleSelected(role.id)
    });
    grid.appendChild(card);
  }

  container.appendChild(grid);

  // Set focus to first interactive element (Requirement 7.3)
  requestAnimationFrame(() => {
    const firstInteractive = container.querySelector('a, button');
    if (firstInteractive) firstInteractive.focus();
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
  header.textContent = role.label;
  article.appendChild(header);

  const desc = document.createElement('p');
  desc.textContent = role.description;
  article.appendChild(desc);

  const footer = document.createElement('footer');
  const btn = document.createElement('button');
  btn.textContent = role.documentType === 'request' ? 'Create ESPD Request' : 'Create ESPD Response';
  btn.setAttribute('aria-label', `Select role: ${role.label}`);
  btn.addEventListener('click', onClick);
  footer.appendChild(btn);
  article.appendChild(footer);

  return article;
}
