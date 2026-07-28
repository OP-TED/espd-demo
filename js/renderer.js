/**
 * Renderer module — converts the ESPD-EDM JSON model into HTML form elements.
 * Handles all component types and property data types.
 */

import { t, deriveQuestionKey, deriveCriterionNameKey, deriveCriterionDescKey, deriveLegislationKey, deriveCaptionKey, deriveRequirementKey } from './i18n.js';
import { getAnswer, setAnswer } from './state.js';
import { getCodelist, CURRENCY_CODES } from './codelists.js';
import { applyConditionalLogic } from './conditional.js';
import { lookupNotice, deriveTedUrl, extractNoticeNumberFromUrl } from './ted-lookup.js';

/**
 * Render a full part into the form content area.
 */
export function renderPart(part, partKey, role, container) {
  container.innerHTML = '';

  // Part header
  const header = document.createElement('div');
  header.className = 'espd-part-header';
  header.innerHTML = `
    <h2>Part ${partKey}: ${t('part.title.' + partKey, part.title)}</h2>
    <p>${t('part.description.' + partKey, part.description || '')}</p>
  `;
  container.appendChild(header);

  // Group sections by sectionTitle for sub-headings
  let currentSectionTitle = null;

  for (const section of part.sections) {
    // Section sub-heading (e.g. "A: Information about the economic operator")
    if (section.sectionTitle && section.sectionTitle !== currentSectionTitle) {
      currentSectionTitle = section.sectionTitle;
      const sectionHeading = document.createElement('h3');
      sectionHeading.className = 'espd-section-title';
      // Try to find i18n key for this section title
      const sectionKey = deriveSectionTitleKey(partKey, section.sectionTitle);
      sectionHeading.textContent = t(sectionKey, section.sectionTitle);
      container.appendChild(sectionHeading);
    }

    // Render the section (criterion/procedure info/etc.)
    const sectionEl = renderSection(section, role);
    container.appendChild(sectionEl);
  }

  // Apply conditional logic after rendering
  applyConditionalLogic(container);

  // Part I–specific enhancements
  if (partKey === 'I') {
    renderRadioInputGroups(container);
    enhancePartIWithLookup(container, role);
  }
}

/**
 * Render sections with uiType "radio-input-group" as radio buttons with inline inputs.
 * Selecting a radio enables its input and disables the others.
 * @param {HTMLElement} container - The rendered Part container
 */
function renderRadioInputGroups(container) {
  // Find sections marked as radio-input-group by looking for the rendered section
  // that corresponds to the PI01 publication reference section.
  // We identify it by the contentpaths of its child fields.
  const pubRefFields = [
    'PI01_proc-pub-ref/QG1/Q1/R1/RV',
    'PI01_proc-pub-ref/QG1/Q2/R1/RV',
    'PI01_proc-pub-ref/QG1/Q3/R1/RV'
  ];

  const fieldEls = pubRefFields.map(path => container.querySelector(`[data-contentpath="${path}"]`)).filter(Boolean);
  if (fieldEls.length === 0) return;

  // Find the parent question group that contains these fields
  const groupEl = fieldEls[0]?.closest('.espd-question-group');
  if (!groupEl) return;

  // Add radio-input-group class for styling
  groupEl.classList.add('espd-radio-input-group');

  const radioName = 'pub-ref-type';
  let activeIndex = 0; // Default: first option (TED notice number)

  // Wrap each field in a radio-row
  fieldEls.forEach((fieldEl, index) => {
    const row = document.createElement('div');
    row.className = 'espd-radio-input-row';
    if (index === activeIndex) row.classList.add('espd-radio-input-row--active');

    // Create radio button
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = radioName;
    radio.value = String(index);
    radio.id = `${radioName}-${index}`;
    radio.checked = index === activeIndex;
    radio.setAttribute('aria-label', `Select: ${fieldEl.querySelector('label')?.textContent || ''}`);

    // Insert radio before the field content
    fieldEl.parentNode.insertBefore(row, fieldEl);
    row.appendChild(radio);
    row.appendChild(fieldEl);

    // Disable inputs in non-active rows
    const input = fieldEl.querySelector('input, select, textarea');
    if (input && index !== activeIndex) {
      input.disabled = true;
      input.classList.add('espd-input-dimmed');
    }

    // Radio change handler
    radio.addEventListener('change', () => {
      // Update all rows
      const allRows = groupEl.querySelectorAll('.espd-radio-input-row');
      allRows.forEach((r, i) => {
        const inp = r.querySelector('.espd-field input, .espd-field select, .espd-field textarea');
        if (i === index) {
          r.classList.add('espd-radio-input-row--active');
          if (inp) {
            inp.disabled = false;
            inp.classList.remove('espd-input-dimmed');
            inp.focus();
          }
        } else {
          r.classList.remove('espd-radio-input-row--active');
          if (inp) {
            inp.disabled = true;
            inp.classList.add('espd-input-dimmed');
          }
        }
      });
    });
  });
}

/**
 * Part I–specific: render the publication reference section as a radio-input-group
 * and add "Look up" buttons for TED fields.
 * For EO roles, marks all Part I fields as read-only.
 * @param {HTMLElement} container - The rendered Part I container
 * @param {string} role - The current role id
 */
function enhancePartIWithLookup(container, role) {
  // Determine if this is an EO role (read-only mode)
  const isEoRole = role && ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont'].includes(role);

  if (isEoRole) {
    // Make all fields read-only for EO roles
    container.querySelectorAll('input, select, textarea').forEach(el => {
      el.disabled = true;
      el.setAttribute('aria-readonly', 'true');
    });
    return;
  }

  // Add "Look up" buttons to the TED notice number and TED URL fields
  const lookupFields = [
    { contentpath: 'PI01_proc-pub-ref/QG1/Q1/R1/RV', type: 'number' },
    { contentpath: 'PI01_proc-pub-ref/QG1/Q2/R1/RV', type: 'url' }
  ];

  for (const { contentpath, type } of lookupFields) {
    const field = container.querySelector(`[data-contentpath="${contentpath}"]`);
    if (!field) continue;

    const input = field.querySelector('input');
    if (!input) continue;

    // Create "Look up" button
    const lookupBtn = document.createElement('button');
    lookupBtn.type = 'button';
    lookupBtn.className = 'secondary outline espd-lookup-btn';
    lookupBtn.textContent = 'Look up';
    lookupBtn.setAttribute('aria-label', `Look up procurement details from TED using ${type}`);

    // Create message area
    const msgEl = document.createElement('small');
    msgEl.className = 'espd-lookup-msg';
    msgEl.setAttribute('role', 'status');
    msgEl.setAttribute('aria-live', 'polite');

    // Insert button inline with input
    const inputWrapper = input.parentElement;
    inputWrapper.style.display = 'flex';
    inputWrapper.style.gap = '0.5rem';
    inputWrapper.style.alignItems = 'flex-start';
    inputWrapper.appendChild(lookupBtn);
    field.appendChild(msgEl);

    // Wire up click handler
    lookupBtn.addEventListener('click', async () => {
      const rawValue = input.value.trim();
      msgEl.textContent = '';
      msgEl.className = 'espd-lookup-msg';

      if (!rawValue) {
        msgEl.textContent = `Please enter a ${type === 'number' ? 'notice number' : 'TED URL'}.`;
        msgEl.classList.add('espd-lookup-msg--error');
        return;
      }

      // Extract notice number from URL if needed
      let noticeNumber = rawValue;
      if (type === 'url') {
        const extracted = extractNoticeNumberFromUrl(rawValue);
        if (extracted) {
          noticeNumber = extracted;
        } else {
          msgEl.textContent = 'Could not extract notice number from URL. Expected format: https://ted.europa.eu/en/notice/{number}/...';
          msgEl.classList.add('espd-lookup-msg--error');
          return;
        }
      }

      lookupBtn.disabled = true;
      lookupBtn.textContent = 'Looking up…';

      const result = await lookupNotice(noticeNumber);

      lookupBtn.disabled = false;
      lookupBtn.textContent = 'Look up';

      if (result.success && result.data) {
        // Auto-populate fields
        const fieldMap = {
          'PI02_proc-procurer-id/QG1/Q1/R1/RV': result.data.officialName,
          'PI02_proc-procurer-id/QG1/Q2/R1/RV': result.data.country,
          'PI03_proc-procedure-info/QG1/Q1/R1/RV': result.data.title,
          'PI03_proc-procedure-info/QG1/Q3/R1/RV': result.data.procedureType
        };

        for (const [path, value] of Object.entries(fieldMap)) {
          if (value) {
            setAnswer(path, value);
            const el = container.querySelector(
              `[data-contentpath="${path}"] input, [data-contentpath="${path}"] select, [data-contentpath="${path}"] textarea, ` +
              `input[data-contentpath="${path}"], select[data-contentpath="${path}"], textarea[data-contentpath="${path}"]`
            );
            if (el) {
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
            } else {
              console.warn('[TED Lookup] Could not find DOM element for path:', path);
            }
          }
        }

        // Cross-populate: if user entered number, fill URL; if URL, fill number
        if (type === 'number') {
          const url = deriveTedUrl(noticeNumber);
          setAnswer('PI01_proc-pub-ref/QG1/Q2/R1/RV', url);
          const urlInput = container.querySelector('[data-contentpath="PI01_proc-pub-ref/QG1/Q2/R1/RV"] input');
          if (urlInput) urlInput.value = url;
        } else {
          setAnswer('PI01_proc-pub-ref/QG1/Q1/R1/RV', noticeNumber);
          const numInput = container.querySelector('[data-contentpath="PI01_proc-pub-ref/QG1/Q1/R1/RV"] input');
          if (numInput) numInput.value = noticeNumber;
        }

        msgEl.textContent = 'Notice found. Fields auto-populated.';
        msgEl.classList.add('espd-lookup-msg--success');
      } else {
        // Graceful degradation
        msgEl.textContent = result.error || 'Lookup failed. Please enter details manually.';
        msgEl.classList.add('espd-lookup-msg--info');

        // Still cross-populate the number/URL pair
        if (type === 'number') {
          const url = deriveTedUrl(noticeNumber);
          setAnswer('PI01_proc-pub-ref/QG1/Q2/R1/RV', url);
          const urlInput = container.querySelector('[data-contentpath="PI01_proc-pub-ref/QG1/Q2/R1/RV"] input');
          if (urlInput) urlInput.value = url;
        }
      }
    });
  }
}

/**
 * Derive section title i18n key from the section title text.
 */
function deriveSectionTitleKey(partKey, sectionTitle) {
  // Extract the letter prefix (e.g. "A" from "A: Information about...")
  const match = sectionTitle.match(/^([A-Z]):/);
  if (match) {
    return `section.title.${partKey}.${match[1]}`;
  }
  return '';
}

/**
 * Render a single section (criterion, procedure info, etc.)
 */
function renderSection(section, role) {
  const el = document.createElement('div');
  el.className = 'espd-criterion';
  el.dataset.sectionTag = section.tag;
  el.dataset.sectionCode = section.code || '';

  // Header with name and description
  const header = document.createElement('div');
  header.className = 'espd-criterion-header';

  const nameKey = deriveCriterionNameKey(section);
  const descKey = deriveCriterionDescKey(section);
  const name = t(nameKey, section.name || section.description || '');
  const desc = t(descKey, section.description || '');

  header.innerHTML = `<h3>${escapeHtml(name)}</h3>`;
  if (desc && desc !== name) {
    header.innerHTML += `<p>${escapeHtml(desc)}</p>`;
  }
  el.appendChild(header);

  // Render components
  if (section.components) {
    for (const component of section.components) {
      const compEl = renderComponent(component, section, role);
      if (compEl) el.appendChild(compEl);
    }
  }

  return el;
}

/**
 * Render a component based on its type.
 */
function renderComponent(component, section, role, depth = 0) {
  switch (component.type) {
    case 'QUESTION_GROUP':
      return renderQuestionGroup(component, section, role, depth);
    case 'QUESTION_SUBGROUP':
      return renderQuestionSubgroup(component, section, role, depth);
    case 'QUESTION':
      return renderQuestion(component, section, role);
    case 'LEGISLATION':
      return renderLegislation(component, section);
    case 'CAPTION':
      return renderCaption(component, section);
    case 'SUBCRITERION':
      return renderSubcriterion(component, section, role, depth);
    case 'REQUIREMENT_GROUP':
      return renderRequirementGroup(component, section, role, depth);
    case 'REQUIREMENT_SUBGROUP':
      return renderRequirementSubgroup(component, section, role, depth);
    case 'REQUIREMENT':
      return renderRequirement(component, section, role);
    default:
      return null;
  }
}

/**
 * Render a QUESTION_GROUP.
 */
function renderQuestionGroup(group, section, role, depth) {
  const el = document.createElement('div');
  el.className = 'espd-question-group';
  el.dataset.code = group.code || '';
  el.dataset.groupPath = group.responsepath || '';

  if (group.components) {
    for (const child of group.components) {
      const childEl = renderComponent(child, section, role, depth + 1);
      if (childEl) el.appendChild(childEl);
    }
  }

  return el;
}

/**
 * Render a QUESTION_SUBGROUP (conditionally visible).
 */
function renderQuestionSubgroup(subgroup, section, role, depth) {
  const el = document.createElement('div');
  el.className = 'espd-question-subgroup';
  el.dataset.code = subgroup.code || '';
  el.dataset.groupPath = subgroup.responsepath || '';

  // Hide by default if it's conditional (ONTRUE/ONFALSE)
  if (subgroup.code === 'ONTRUE' || subgroup.code === 'ONFALSE') {
    el.hidden = true;
    el.setAttribute('aria-hidden', 'true');
  }

  if (subgroup.components) {
    for (const child of subgroup.components) {
      const childEl = renderComponent(child, section, role, depth + 1);
      if (childEl) el.appendChild(childEl);
    }
  }

  return el;
}

/**
 * Render a QUESTION based on its propertydatatype.
 */
function renderQuestion(question, section, role) {
  const el = document.createElement('div');
  el.className = 'espd-field';
  el.dataset.contentpath = question.contentpath || '';
  el.dataset.cardinality = question.cardinality || '1';

  const labelKey = deriveQuestionKey(section, question);
  const labelText = t(labelKey, question.description || '');
  const contentpath = question.contentpath || '';
  const inputId = `field-${contentpath.replace(/[/\s]/g, '-')}`;
  const isRequired = question.cardinality === '1';
  const currentValue = getAnswer(contentpath) || '';

  switch (question.propertydatatype) {
    case 'INDICATOR':
      el.appendChild(renderIndicator(inputId, labelText, contentpath, isRequired, currentValue, question.labels));
      break;
    case 'CODE_COUNTRY':
      el.appendChild(renderSelect(inputId, labelText, contentpath, isRequired, currentValue, 'CODE_COUNTRY'));
      break;
    case 'CODE':
      el.appendChild(renderSelect(inputId, labelText, contentpath, isRequired, currentValue, 'CODE'));
      break;
    case 'CODE_BOOLEAN':
      el.appendChild(renderSelect(inputId, labelText, contentpath, isRequired, currentValue, 'CODE_BOOLEAN'));
      break;
    case 'CODE_EOID_TYPE':
      el.appendChild(renderSelect(inputId, labelText, contentpath, isRequired, currentValue, 'CODE_EOID_TYPE'));
      break;
    case 'DATE':
      el.appendChild(renderDateField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'AMOUNT':
    case 'MINIMUM_AMOUNT':
      el.appendChild(renderAmountField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'QUANTITY_INTEGER':
    case 'MINIMUM_QUANTITY_INTEGER':
      el.appendChild(renderNumberField(inputId, labelText, contentpath, isRequired, currentValue, true));
      break;
    case 'QUANTITY':
    case 'MINIMUM_QUANTITY':
    case 'QUANTITY_YEAR':
    case 'MINIMUM_QUANTITY_YEAR':
      el.appendChild(renderNumberField(inputId, labelText, contentpath, isRequired, currentValue, false));
      break;
    case 'PERCENTAGE':
      el.appendChild(renderPercentageField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'URL':
      el.appendChild(renderUrlField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'PERIOD':
      el.appendChild(renderPeriodField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'EVIDENCE_IDENTIFIER':
      el.appendChild(renderEvidenceField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'IDENTIFIER':
    case 'ECONOMIC_OPERATOR_IDENTIFIER':
    case 'LOT_IDENTIFIER':
    case 'QUAL_IDENTIFIER':
      el.appendChild(renderTextField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
    case 'DESCRIPTION':
    case 'NONE':
    default:
      el.appendChild(renderTextField(inputId, labelText, contentpath, isRequired, currentValue));
      break;
  }

  return el;
}

/**
 * Render an INDICATOR (Yes/No radio buttons).
 * @param {string} id - Input element id prefix
 * @param {string} label - Legend label text
 * @param {string} contentpath - State path for the answer
 * @param {boolean} required - Whether the field is required
 * @param {string} value - Current value ('true' or 'false')
 * @param {object} [customLabels] - Optional custom labels: { true: "...", false: "..." }
 */
function renderIndicator(id, label, contentpath, required, value, customLabels) {
  const yesLabel = customLabels?.true || t('ui.yes', 'Yes');
  const noLabel = customLabels?.false || t('ui.no', 'No');

  const wrapper = document.createElement('fieldset');
  wrapper.className = 'espd-indicator-wrapper';
  wrapper.setAttribute('role', 'radiogroup');
  wrapper.setAttribute('aria-required', required.toString());

  const legend = document.createElement('legend');
  legend.textContent = label;
  if (required) legend.innerHTML += ' <abbr title="Required">*</abbr>';
  wrapper.appendChild(legend);

  const group = document.createElement('div');
  group.className = 'espd-indicator-group';

  const yesId = `${id}-yes`;
  const noId = `${id}-no`;

  group.innerHTML = `
    <label for="${yesId}">
      <input type="radio" id="${yesId}" name="${id}" value="true"
        ${value === 'true' || value === true ? 'checked' : ''}
        data-contentpath="${contentpath}"
        ${required ? 'required' : ''}>
      ${yesLabel}
    </label>
    <label for="${noId}">
      <input type="radio" id="${noId}" name="${id}" value="false"
        ${value === 'false' || value === false ? 'checked' : ''}
        data-contentpath="${contentpath}">
      ${noLabel}
    </label>
  `;

  wrapper.appendChild(group);

  // Event listeners for state management and conditional logic
  group.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      setAnswer(contentpath, e.target.value);
      applyConditionalLogic(wrapper.closest('#form-content') || wrapper.closest('form'));
    });
  });

  return wrapper;
}

/**
 * Render a select dropdown.
 */
function renderSelect(id, label, contentpath, required, value, codelistType) {
  const wrapper = document.createElement('div');
  const codelist = getCodelist(codelistType) || [];

  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <select id="${id}" data-contentpath="${contentpath}" ${required ? 'required' : ''} aria-label="${escapeHtml(label)}">
      <option value="">— Select —</option>
      ${codelist.map(item => `<option value="${item.code}" ${value === item.code ? 'selected' : ''}>${escapeHtml(item.name)}</option>`).join('')}
    </select>
  `;

  const select = wrapper.querySelector('select');
  select.addEventListener('change', () => {
    setAnswer(contentpath, select.value);
  });

  return wrapper;
}

/**
 * Render a text input field.
 */
function renderTextField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <input type="text" id="${id}" data-contentpath="${contentpath}" value="${escapeHtml(value)}" ${required ? 'required' : ''} aria-label="${escapeHtml(label)}">
  `;
  const input = wrapper.querySelector('input');
  input.addEventListener('input', () => setAnswer(contentpath, input.value));

  return wrapper;
}

/**
 * Render a date input field.
 */
function renderDateField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <input type="date" id="${id}" data-contentpath="${contentpath}" value="${escapeHtml(value)}" ${required ? 'required' : ''} aria-label="${escapeHtml(label)}">
  `;
  const input = wrapper.querySelector('input');
  input.addEventListener('change', () => setAnswer(contentpath, input.value));
  return wrapper;
}

/**
 * Render an amount field with currency select.
 */
function renderAmountField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');
  const parsedValue = typeof value === 'object' ? value : { amount: value || '', currency: 'EUR' };

  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <div class="grid">
      <input type="number" id="${id}" data-contentpath="${contentpath}" value="${escapeHtml(String(parsedValue.amount || ''))}" ${required ? 'required' : ''} step="0.01" placeholder="0.00" aria-label="${escapeHtml(label)} amount">
      <select data-contentpath="${contentpath}-currency" aria-label="Currency">
        ${CURRENCY_CODES.map(c => `<option value="${c.code}" ${parsedValue.currency === c.code ? 'selected' : ''}>${c.code}</option>`).join('')}
      </select>
    </div>
  `;

  const input = wrapper.querySelector('input');
  const currencySelect = wrapper.querySelector('select');

  function updateAmount() {
    setAnswer(contentpath, { amount: input.value, currency: currencySelect.value });
  }

  input.addEventListener('input', updateAmount);
  currencySelect.addEventListener('change', updateAmount);

  return wrapper;
}

/**
 * Render a number field (integer or decimal).
 */
function renderNumberField(id, label, contentpath, required, value, isInteger) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <input type="number" id="${id}" data-contentpath="${contentpath}" value="${escapeHtml(String(value || ''))}" ${required ? 'required' : ''} ${isInteger ? 'step="1"' : 'step="any"'} aria-label="${escapeHtml(label)}">
  `;
  const input = wrapper.querySelector('input');
  input.addEventListener('input', () => setAnswer(contentpath, input.value));
  return wrapper;
}

/**
 * Render a percentage field.
 */
function renderPercentageField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <input type="number" id="${id}" data-contentpath="${contentpath}" value="${escapeHtml(String(value || ''))}" ${required ? 'required' : ''} min="0" max="100" step="0.01" placeholder="%" aria-label="${escapeHtml(label)}">
  `;
  const input = wrapper.querySelector('input');
  input.addEventListener('input', () => setAnswer(contentpath, input.value));
  return wrapper;
}

/**
 * Render a URL field.
 */
function renderUrlField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <label for="${id}">
      ${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}
    </label>
    <input type="url" id="${id}" data-contentpath="${contentpath}" value="${escapeHtml(value)}" ${required ? 'required' : ''} placeholder="https://" aria-label="${escapeHtml(label)}">
  `;
  const input = wrapper.querySelector('input');
  input.addEventListener('input', () => setAnswer(contentpath, input.value));
  return wrapper;
}

/**
 * Render a period field (start date + end date).
 */
function renderPeriodField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');
  const parsedValue = typeof value === 'object' ? value : { start: '', end: '' };

  wrapper.innerHTML = `
    <label>${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}</label>
    <div class="grid">
      <input type="date" id="${id}-start" data-contentpath="${contentpath}" value="${parsedValue.start || ''}" aria-label="Start date" ${required ? 'required' : ''}>
      <input type="date" id="${id}-end" data-contentpath="${contentpath}" value="${parsedValue.end || ''}" aria-label="End date">
    </div>
  `;

  const startInput = wrapper.querySelector(`#${CSS.escape(id + '-start')}`);
  const endInput = wrapper.querySelector(`#${CSS.escape(id + '-end')}`);

  function updatePeriod() {
    setAnswer(contentpath, { start: startInput.value, end: endInput.value });
  }

  startInput.addEventListener('change', updatePeriod);
  endInput.addEventListener('change', updatePeriod);

  return wrapper;
}

/**
 * Render evidence fields (URL + issuer + reference).
 */
function renderEvidenceField(id, label, contentpath, required, value) {
  const wrapper = document.createElement('div');
  const parsedValue = typeof value === 'object' ? value : { url: value || '', issuer: '', reference: '' };

  wrapper.innerHTML = `
    <label>${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}</label>
    <input type="url" id="${id}-url" value="${escapeHtml(parsedValue.url || '')}" placeholder="${t('ui.evidenceUrl', 'URL')}" aria-label="${t('ui.evidenceUrl', 'Evidence URL')}" ${required ? 'required' : ''}>
    <input type="text" id="${id}-issuer" value="${escapeHtml(parsedValue.issuer || '')}" placeholder="${t('ui.evidenceIssuer', 'Issuing body')}" aria-label="${t('ui.evidenceIssuer', 'Evidence issuer')}">
    <input type="text" id="${id}-ref" value="${escapeHtml(parsedValue.reference || '')}" placeholder="${t('ui.evidenceReference', 'Reference')}" aria-label="${t('ui.evidenceReference', 'Evidence reference')}">
  `;

  function updateEvidence() {
    const urlInput = wrapper.querySelector(`#${CSS.escape(id + '-url')}`);
    const issuerInput = wrapper.querySelector(`#${CSS.escape(id + '-issuer')}`);
    const refInput = wrapper.querySelector(`#${CSS.escape(id + '-ref')}`);
    setAnswer(contentpath, {
      url: urlInput.value,
      issuer: issuerInput.value,
      reference: refInput.value
    });
  }

  wrapper.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateEvidence);
  });

  return wrapper;
}

/**
 * Render a LEGISLATION reference.
 */
function renderLegislation(legislation, section) {
  const el = document.createElement('details');
  el.className = 'espd-legislation';

  const key = deriveLegislationKey(section, legislation);
  const title = t(key, legislation.description || 'Applicable legislation');

  el.innerHTML = `
    <summary>📜 Applicable legislation</summary>
    <p>${escapeHtml(title)}</p>
  `;

  return el;
}

/**
 * Render a CAPTION (informational text, no input).
 */
function renderCaption(caption, section) {
  const el = document.createElement('div');
  el.className = 'espd-caption';

  const key = deriveCaptionKey(section, caption);
  const text = t(key, caption.description || '');

  el.textContent = text;
  return el;
}

/**
 * Render a SUBCRITERION.
 */
function renderSubcriterion(subcriterion, section, role, depth) {
  const el = document.createElement('div');
  el.className = 'espd-question-subgroup';
  el.style.marginTop = '1rem';

  if (subcriterion.name || subcriterion.description) {
    const heading = document.createElement('h4');
    heading.textContent = subcriterion.name || subcriterion.description || '';
    heading.style.fontSize = '0.95rem';
    el.appendChild(heading);
  }

  if (subcriterion.components) {
    for (const child of subcriterion.components) {
      const childEl = renderComponent(child, section, role, depth + 1);
      if (childEl) el.appendChild(childEl);
    }
  }

  return el;
}

/**
 * Render a REQUIREMENT_GROUP.
 */
function renderRequirementGroup(group, section, role, depth) {
  const el = document.createElement('div');
  el.className = 'espd-question-group';
  el.dataset.code = group.code || '';

  if (group.components) {
    for (const child of group.components) {
      const childEl = renderComponent(child, section, role, depth + 1);
      if (childEl) el.appendChild(childEl);
    }
  }

  return el;
}

/**
 * Render a REQUIREMENT_SUBGROUP.
 */
function renderRequirementSubgroup(subgroup, section, role, depth) {
  const el = document.createElement('div');
  el.className = 'espd-question-subgroup';
  el.dataset.code = subgroup.code || '';
  el.dataset.groupPath = subgroup.responsepath || '';

  if (subgroup.code === 'ONTRUE' || subgroup.code === 'ONFALSE') {
    el.hidden = true;
    el.setAttribute('aria-hidden', 'true');
  }

  if (subgroup.components) {
    for (const child of subgroup.components) {
      const childEl = renderComponent(child, section, role, depth + 1);
      if (childEl) el.appendChild(childEl);
    }
  }

  return el;
}

/**
 * Render a REQUIREMENT (buyer-set requirement, displayed as read-only info for EO).
 */
function renderRequirement(requirement, section, role) {
  const el = document.createElement('div');
  el.className = 'espd-requirement';

  const key = deriveRequirementKey(section, requirement);
  const label = t(key, requirement.description || '');

  if (role === 'ca') {
    // CA can edit requirements
    const contentpath = requirement.contentpath || '';
    const currentValue = getAnswer(contentpath) || '';
    const inputId = `req-${(contentpath || Math.random().toString(36)).replace(/[/\s]/g, '-')}`;

    el.innerHTML = `
      <label for="${inputId}" class="req-label">${escapeHtml(label)}</label>
      <input type="text" id="${inputId}" data-contentpath="${contentpath}" value="${escapeHtml(currentValue)}" aria-label="${escapeHtml(label)}">
    `;

    const input = el.querySelector('input');
    if (input && contentpath) {
      input.addEventListener('input', () => setAnswer(contentpath, input.value));
    }
  } else {
    // EO sees requirements as read-only
    const contentpath = requirement.contentpath || '';
    const value = getAnswer(contentpath) || '';
    el.innerHTML = `<span class="req-label">${escapeHtml(label)}</span>`;
    if (value) {
      el.innerHTML += `<span class="req-value">${escapeHtml(String(value))}</span>`;
    }
  }

  return el;
}

/**
 * HTML escape utility.
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
