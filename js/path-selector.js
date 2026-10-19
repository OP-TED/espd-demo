/**
 * Economic Operator sub-role picker.
 *
 * The home page handles the Buyer vs Economic Operator split (two role panels).
 * The Buyer side needs no sub-role (the UI presents a single "Buyer"). The
 * Economic Operator side has real sub-roles — sole tenderer, group leader/member,
 * other-entity-relied-on, subcontractor — which map to
 * cac:EconomicOperatorRole/cbc:RoleCode, so both EO entry points (Create
 * response, Import ESPD) first pick a sub-role here. The chosen role also
 * preselects Part II's "Role in this bid" (app.js seedEconomicOperatorRole).
 */

import { t } from './i18n.js';

/**
 * Render the EO sub-role picker.
 * @param {object} options
 * @param {HTMLElement} options.container - Target container (the landing page)
 * @param {object} options.roles - The roles registry from getRoles()
 * @param {string} [options.title] - Heading (defaults to "Select your role")
 * @param {string} [options.subtitle] - Sub-heading guidance
 * @param {string} [options.continueLabel] - Primary button label (defaults to "Continue")
 * @param {function(string):void} options.onRoleSelected - Called with the chosen EO role id
 * @param {function} options.onCancel - Return to the home page
 */
export function renderEoRolePicker({ container, roles, title, subtitle, continueLabel, onRoleSelected, onCancel }) {
  container.innerHTML = '';

  const heading = document.createElement('hgroup');
  const h2 = document.createElement('h2');
  h2.textContent = title || 'Select your role';
  const p = document.createElement('p');
  p.textContent = subtitle || 'Choose how you are taking part in this procurement procedure.';
  heading.append(h2, p);
  container.appendChild(heading);

  // Back link to the home page.
  if (onCancel) {
    const backNav = document.createElement('nav');
    backNav.className = 'espd-path-selector__back';
    const backLink = document.createElement('a');
    backLink.href = '#';
    backLink.textContent = '← Back to Home';
    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      onCancel();
    });
    backNav.appendChild(backLink);
    container.appendChild(backNav);
  }

  const roleEntries = roles?.eoRoles ?? [];

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

  const actions = document.createElement('div');
  actions.className = 'espd-path-selector__actions';
  const continueBtn = document.createElement('button');
  continueBtn.textContent = continueLabel || 'Continue';
  continueBtn.className = 'contrast';
  continueBtn.addEventListener('click', () => {
    if (selectedRoleId) onRoleSelected(selectedRoleId);
  });
  actions.appendChild(continueBtn);
  container.appendChild(actions);

  // Focus the first radio for keyboard users.
  requestAnimationFrame(() => {
    const firstRadio = container.querySelector('input[type="radio"]');
    if (firstRadio) firstRadio.focus();
  });
}
