/**
 * Renderer — the generic, model-driven form renderer.
 *
 * Walks a part lens from the generated UI bundle (part.sections[].members[]) and
 * binds every field to the JSON instance document at field.dataPath. Fields are
 * rendered by field.uiType (code/text/url/textarea/boolean/date/number, plus
 * caption notes); labels resolve through i18n (field.labelKey); code options come
 * from the generated codelists (field.codelist); conditional visibility is driven
 * declaratively by field.visibleWhen. No legacy component-type / contentpath /
 * ONTRUE-ONFALSE machinery.
 */

import { t } from './i18n.js';
import { getAnswer, setAnswer, getInclusionState, setInclusionState, initInclusionStates, hasInclusions } from './state.js';
import { getCodelist } from './codelists.js';
import { applyConditionalLogic } from './conditional.js';
import { lookupNotice, extractNoticeNumberFromUrl } from './ted-lookup.js';
import { getRoleById, isCriterionMandatory, isPartEditable } from './model.js';
import { features } from './features.js';

const EO_ROLES = new Set(['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont']);

/**
 * Render a full part into the form content area.
 * @param {object} part - the part lens { part, titleKey, descriptionKey, sections[] }
 * @param {string} partKey - Roman numeral
 * @param {string} role - active role id
 * @param {HTMLElement} container
 */
export function renderPart(part, partKey, role, container) {
  container.innerHTML = '';

  const roleConfig = role ? getRoleById(role) : null;
  const isBuyer = roleConfig?.documentType === 'request';

  container.appendChild(partHeader(part, partKey));

  // The buyer sees the criterion-bearing parts (III exclusion grounds, IV
  // selection criteria, V reduction-of-candidates) as a criteria-SELECTION
  // checklist — they choose which criteria apply (and set any requirement),
  // they do not answer them. The EO answers later. Without this, Part V's
  // EO-only answer fields would wrongly render as editable in the buyer path.
  if (isBuyer && (partKey === 'III' || partKey === 'IV' || partKey === 'V')) {
    renderCriteriaSelectionView(part, partKey, role, container);
    applyConditionalLogic(container);
    return;
  }

  // EO answering view. For the criterion-bearing parts (III/IV/V), the EO
  // answers either the buyer's DECLARED set (when built on an imported Request —
  // inclusions carry that set, and the EO cannot add/remove) or, on a blank
  // response (no inclusions), the FULL catalogue.
  const isEo = EO_ROLES.has(role);
  const restrictToDeclared = isEo && hasInclusions();

  for (const section of part.sections) {
    const hasCriteria = section.members.some((m) => m.kind === 'criterion');
    const members = restrictToDeclared
      ? section.members.filter((m) => m.kind !== 'criterion' || isDeclared(m))
      : section.members;

    // A criterion section with nothing left after filtering: the buyer declared
    // none of its criteria. Still show the section (heading + a "No criteria
    // selected" note) so the EO sees the full structure — mirroring peer ESPD
    // services. A non-criterion section that filtered empty is simply skipped.
    const emptyCriterionSection = restrictToDeclared && hasCriteria && members.length === 0;
    if (members.length === 0 && !emptyCriterionSection) continue;

    if (section.titleKey) {
      const h = document.createElement('h3');
      h.className = 'espd-section-title';
      h.textContent = t(section.titleKey, section.id);
      container.appendChild(h);
    }
    if (emptyCriterionSection) {
      const note = document.createElement('p');
      note.className = 'espd-section-empty';
      note.textContent = t('ui.noCriteriaSelected', 'No criteria selected.');
      container.appendChild(note);
      continue;
    }
    for (const member of members) {
      container.appendChild(renderMember(member, role));
    }
  }

  // Part I buyer affordance: the TED "Look up" button on the publication
  // reference fields (buyers author Part I; feature-gated).
  if (partKey === 'I' && !EO_ROLES.has(role) && features.tedLookup) {
    enhanceTedLookup(container);
  }

  // Read-only enforcement, driven by the role's editableParts (the model's
  // authorship boundary): a part a role may SEE but not AUTHOR is dimmed and
  // disabled. This covers the EO viewing the buyer-authored Part I, and the
  // buyer viewing the EO-authored Part VI (signature) — and any future
  // visible-but-not-editable combination — from one rule instead of per-part
  // special cases.
  if (!isPartEditable(partKey, role)) {
    markReadOnly(container);
  }

  applyConditionalLogic(container);
}

/** Was this criterion declared by the buyer (present in the inclusions map)? */
function isDeclared(member) {
  const tag = member.tag || member.id;
  return getInclusionState(tag, member.code) === true;
}

function partHeader(part, partKey) {
  const header = document.createElement('div');
  header.className = 'espd-part-header';
  const h2 = document.createElement('h2');
  h2.tabIndex = -1;
  h2.textContent = `Part ${partKey}: ${t(part.titleKey, '')}`;
  const p = document.createElement('p');
  p.textContent = t(part.descriptionKey, '');
  header.append(h2, p);
  return header;
}

// ─── Members ──────────────────────────────────────────────────────────────────

function renderMember(member, role) {
  if (member.kind === 'administrative') return renderAdministrative(member, role);
  if (member.kind === 'criterion') return renderCriterion(member, role);
  return document.createComment(`unknown member kind ${member.kind}`);
}

/** An administrative block: a flat list of fields in one question group. */
function renderAdministrative(member, role) {
  const wrap = document.createElement('div');
  wrap.className = 'espd-criterion';
  if (member.tag) wrap.dataset.sectionTag = member.tag;

  const group = document.createElement('div');
  group.className = 'espd-question-group';
  appendFields(group, member.fields);
  wrap.appendChild(group);
  return wrap;
}

/** A criterion: name + description + its groups of fields (EO answering view). */
function renderCriterion(member, role) {
  const wrap = document.createElement('div');
  wrap.className = 'espd-criterion';
  wrap.dataset.sectionTag = member.tag || member.id;
  wrap.dataset.sectionCode = member.code || '';

  const head = document.createElement('div');
  head.className = 'espd-criterion-header';
  const h3 = document.createElement('h3');
  h3.textContent = t(member.nameKey, member.code || member.id);
  head.appendChild(h3);
  const desc = t(member.descriptionKey, '');
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc;
    head.appendChild(p);
  }
  wrap.appendChild(head);

  for (const group of member.groups || []) {
    // The buyer's `requirement` group (filledBy: contractingAuthority) is NOT the
    // EO's to edit. When the EO is building on an imported Request, the buyer set
    // these values — show them READ-ONLY as context. On a blank response no buyer
    // defined them, so OMIT the group entirely.
    if (group.filledBy === 'contractingAuthority') {
      const panel = renderBuyerRequirementContext(group);
      if (panel) wrap.appendChild(panel);
      continue;
    }
    const groupEl = document.createElement('div');
    groupEl.className = 'espd-question-group';
    appendFields(groupEl, group.fields);
    wrap.appendChild(groupEl);
  }
  return wrap;
}

/**
 * Render the buyer's requirement group as READ-ONLY context in the EO view.
 * Returns null when the buyer set no values (blank response) — then nothing is
 * shown, per the model's buyer/EO authorship boundary.
 */
function renderBuyerRequirementContext(group) {
  const fields = (group.fields || []).filter((f) => f.kind !== 'caption');
  const hasValue = fields.some((f) => {
    const v = getAnswer(f.dataPath);
    return v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
  });
  if (!hasValue) return null;

  const panel = document.createElement('div');
  panel.className = 'criterion-requirements criterion-requirements--readonly';
  const heading = document.createElement('p');
  heading.className = 'criterion-requirements__heading';
  heading.textContent = t('ui.requirementHeading', 'Requirement set by the buyer');
  panel.appendChild(heading);

  const groupEl = document.createElement('div');
  groupEl.className = 'espd-question-group';
  appendFields(groupEl, group.fields);
  panel.appendChild(groupEl);

  // The EO cannot edit the buyer's requirement: disable every control.
  groupEl.querySelectorAll('input, select, textarea').forEach((el) => {
    el.disabled = true;
    el.setAttribute('aria-readonly', 'true');
    el.classList.add('espd-input-dimmed');
  });
  return panel;
}

// ─── Fields ─────────────────────────────────────────────────────────────────

/**
 * Append a list of fields to a container, pairing each monetary amount with its
 * currency. An AMOUNT/MINIMUM_AMOUNT/MAXIMUM_AMOUNT leaf is emitted by the
 * compiler as two consecutive fields that share a semanticId: the numeric value
 * and a `currency`-codelist select, both carrying the same labelKey. Rendered
 * separately they read as a duplicated label and an unlabelled dropdown; here we
 * detect the pair and render them as one amount field (shared label once, value
 * + a clearly-labelled "Currency" select side by side).
 */
function appendFields(parent, fields) {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const next = fields[i + 1];
    if (isAmountPair(field, next)) {
      parent.appendChild(renderAmountField(field, next));
      i++; // consume the currency field too
      continue;
    }
    parent.appendChild(renderField(field));
  }
}

/** Is `value` the amount of a monetary pair whose currency is the next field? */
function isAmountPair(value, currency) {
  return (
    value && currency &&
    value.kind !== 'caption' && currency.kind !== 'caption' &&
    value.semanticId && value.semanticId === currency.semanticId &&
    value.uiType === 'number' && currency.uiType === 'code' &&
    currency.codelist === 'currency'
  );
}

/**
 * Render a monetary amount (value + currency) as one grouped field: the shared
 * label once, the amount input and the currency select side by side. The
 * currency select gets its own accessible label ("Currency") rather than
 * repeating the amount label. Both controls keep their own data-field / dataset
 * so state binding, conditional visibility and validation are unchanged.
 */
function renderAmountField(valueField, currencyField) {
  const wrap = document.createElement('div');
  wrap.className = 'espd-field espd-amount';
  wrap.dataset.field = valueField.dataPath;
  if (valueField.visibleWhen) {
    wrap.dataset.visibleWhen = JSON.stringify(valueField.visibleWhen);
    wrap.hidden = true; // conditional.js reveals it when the condition holds
  }

  const label = t(valueField.labelKey, valueField.dataPath);
  const required = valueField.required === true;

  // Shared heading for the pair (the amount's label), with the required marker.
  const groupLabel = document.createElement('span');
  groupLabel.className = 'espd-amount__label';
  groupLabel.innerHTML = `${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}`;
  wrap.appendChild(groupLabel);

  const row = document.createElement('div');
  row.className = 'espd-amount__row';

  // Amount value (number). Reuse inputControl but strip its own label, since the
  // shared label above covers the pair.
  const valueCtl = inputControl(valueField, label, required, 'number');
  const valueLabelEl = valueCtl.querySelector('label');
  if (valueLabelEl) valueLabelEl.remove();
  valueCtl.classList.add('espd-amount__value');
  row.appendChild(valueCtl);

  // Currency (code select) with its own label. Prefer a model-supplied
  // propertyLabelKey (some criteria set "ui.currency" via their presentation
  // sidecar); otherwise default to the "Currency" catalogue entry.
  const currencyLabel = t(currencyField.propertyLabelKey || 'ui.currency', 'Currency');
  const currencyCtl = codeControl(currencyField, currencyLabel, currencyField.required === true);
  currencyCtl.classList.add('espd-amount__currency');
  row.appendChild(currencyCtl);

  wrap.appendChild(row);
  return wrap;
}

/**
 * Render one field, bound to the instance document at field.dataPath.
 * Wraps the control in `.espd-field` carrying data-field="<dataPath>" (and
 * data-visible-when when conditional, for conditional.js).
 */
export function renderField(field) {
  if (field.kind === 'caption') return renderCaption(field);

  const wrap = document.createElement('div');
  wrap.className = 'espd-field';
  wrap.dataset.field = field.dataPath;
  if (field.repeatable) wrap.dataset.repeatable = 'true';
  if (field.visibleWhen) {
    wrap.dataset.visibleWhen = JSON.stringify(field.visibleWhen);
    wrap.hidden = true; // conditional.js reveals it when the condition holds
  }

  const label = t(field.labelKey, field.dataPath);
  const required = field.required === true;

  let control;
  switch (field.uiType) {
    case 'boolean': control = booleanControl(field, label, required); break;
    case 'code': control = codeControl(field, label, required); break;
    case 'date': control = inputControl(field, label, required, 'date'); break;
    case 'number': control = inputControl(field, label, required, 'number'); break;
    case 'url': control = inputControl(field, label, required, 'url'); break;
    case 'textarea': control = textareaControl(field, label, required); break;
    case 'text':
    default: control = inputControl(field, label, required, 'text'); break;
  }
  wrap.appendChild(control);
  return wrap;
}

function renderCaption(field) {
  const note = document.createElement('p');
  note.className = 'espd-caption';
  if (field.visibleWhen) {
    note.dataset.visibleWhen = JSON.stringify(field.visibleWhen);
    note.hidden = true;
  }
  note.textContent = t(field.labelKey, '');
  return note;
}

function fieldId(dataPath) {
  return `field-${dataPath.replace(/[^a-zA-Z0-9]+/g, '-')}`;
}

function labelEl(id, text, required) {
  const l = document.createElement('label');
  l.setAttribute('for', id);
  l.innerHTML = `${escapeHtml(text)}${required ? ' <abbr title="Required">*</abbr>' : ''}`;
  return l;
}

/** text / url / number / date input. */
function inputControl(field, label, required, type) {
  const frag = document.createElement('div');
  const id = fieldId(field.dataPath);
  const value = getAnswer(field.dataPath);
  frag.appendChild(labelEl(id, label, required));
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.dataset.field = field.dataPath;
  input.setAttribute('aria-label', label);
  if (required) input.required = true;
  if (value !== undefined && value !== null) input.value = String(value);
  input.addEventListener('input', () => {
    setAnswer(field.dataPath, input.value);
    reapplyConditionals(input);
  });
  frag.appendChild(input);
  return frag;
}

function textareaControl(field, label, required) {
  const frag = document.createElement('div');
  const id = fieldId(field.dataPath);
  const value = getAnswer(field.dataPath);
  frag.appendChild(labelEl(id, label, required));
  const ta = document.createElement('textarea');
  ta.id = id;
  ta.dataset.field = field.dataPath;
  ta.setAttribute('aria-label', label);
  if (required) ta.required = true;
  if (value !== undefined && value !== null) ta.value = String(value);
  ta.addEventListener('input', () => {
    setAnswer(field.dataPath, ta.value);
    reapplyConditionals(ta);
  });
  frag.appendChild(ta);
  return frag;
}

/** boolean -> Yes/No radio group. */
function booleanControl(field, label, required) {
  const fs = document.createElement('fieldset');
  fs.className = 'espd-indicator-wrapper';
  fs.setAttribute('role', 'radiogroup');
  fs.setAttribute('aria-required', String(required));

  const legend = document.createElement('legend');
  legend.innerHTML = `${escapeHtml(label)}${required ? ' <abbr title="Required">*</abbr>' : ''}`;
  fs.appendChild(legend);

  const group = document.createElement('div');
  group.className = 'espd-indicator-group';
  const id = fieldId(field.dataPath);
  const current = getAnswer(field.dataPath);
  const name = id;

  for (const [val, labelKey, fallback] of [[true, 'ui.yes', 'Yes'], [false, 'ui.no', 'No']]) {
    const optId = `${id}-${val ? 'yes' : 'no'}`;
    const l = document.createElement('label');
    l.setAttribute('for', optId);
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = optId;
    radio.name = name;
    radio.value = String(val);
    radio.dataset.field = field.dataPath;
    if (current === val) radio.checked = true;
    if (required && val === true) radio.required = true;
    radio.addEventListener('change', () => {
      setAnswer(field.dataPath, val);
      reapplyConditionals(radio);
    });
    l.append(radio, document.createTextNode(' ' + t(labelKey, fallback)));
    group.appendChild(l);
  }
  fs.appendChild(group);
  return fs;
}

/** code -> select, options from the generated codelist. */
function codeControl(field, label, required) {
  const frag = document.createElement('div');
  const id = fieldId(field.dataPath);
  const value = getAnswer(field.dataPath);
  frag.appendChild(labelEl(id, label, required));

  const select = document.createElement('select');
  select.id = id;
  select.dataset.field = field.dataPath;
  select.setAttribute('aria-label', label);
  if (required) select.required = true;

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = t('ui.select', '— Select —');
  select.appendChild(placeholder);

  for (const opt of getCodelist(field.codelist)) {
    const o = document.createElement('option');
    o.value = opt.code;
    o.textContent = opt.name;
    if (value === opt.code) o.selected = true;
    select.appendChild(o);
  }
  select.addEventListener('change', () => {
    setAnswer(field.dataPath, select.value);
    reapplyConditionals(select);
  });
  frag.appendChild(select);
  return frag;
}

/** Re-run conditional visibility for the whole form after an answer change. */
function reapplyConditionals(fromEl) {
  const root = fromEl.closest('#form-content') || fromEl.closest('form') || document.getElementById('form-content');
  applyConditionalLogic(root);
}

// ─── Buyer criteria-selection view (Parts III/IV/V) ───────────────────────────

function renderCriteriaSelectionView(part, partKey, role, container) {
  const criterionMembers = part.sections.flatMap((s) => s.members.filter((m) => m.kind === 'criterion'));
  initInclusionStates(criterionMembers, role, isCriterionMandatory);

  for (const section of part.sections) {
    if (section.titleKey) {
      const h = document.createElement('h3');
      h.className = 'espd-section-title';
      h.textContent = t(section.titleKey, section.id);
      container.appendChild(h);
    }
    for (const member of section.members) {
      if (member.kind !== 'criterion') continue;
      container.appendChild(renderCriterionChecklistItem(member, role));
    }
  }
}

function renderCriterionChecklistItem(member, role) {
  const tag = member.tag || member.id;
  const code = member.code;
  const mandatory = isCriterionMandatory(code, role);
  const included = mandatory || getInclusionState(tag, code) === true;

  const card = document.createElement('div');
  card.className = `criterion-card${mandatory ? ' criterion-card--mandatory' : ''}`;
  card.dataset.sectionTag = tag;
  card.dataset.sectionCode = code || '';

  const headerRow = document.createElement('div');
  headerRow.className = 'criterion-card__header';

  const checkboxId = `criterion-${tag}`;
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = checkboxId;
  checkbox.checked = included;
  // A mandatory criterion is always included and cannot be unchecked. (All Part
  // III exclusion grounds are mandatory: the economic operator must answer every
  // one, so the buyer always includes them.) The checkbox is kept (disabled)
  // rather than removed, so the selection affordance can be re-enabled later.
  if (mandatory) {
    checkbox.disabled = true;
  }

  const label = document.createElement('label');
  label.setAttribute('for', checkboxId);
  label.className = 'criterion-card__label';
  label.textContent = t(member.nameKey, code || tag);

  headerRow.append(checkbox, label);
  card.appendChild(headerRow);

  const desc = t(member.descriptionKey, '');
  if (desc) {
    const p = document.createElement('p');
    p.className = 'criterion-card__description';
    p.textContent = desc;
    card.appendChild(p);
  }

  // Buyer requirement panel: the fields the contracting authority fills to set
  // this criterion's requirement (e.g. a selection criterion's minimum amount /
  // number of years). Only shown when the criterion is included, since an
  // unselected criterion has no requirement to express. Exclusion grounds carry
  // no such fields, so the panel is empty and nothing extra is shown there.
  const reqFields = requirementFields(member);
  let requirementPanel = null;
  if (reqFields.length > 0) {
    requirementPanel = document.createElement('div');
    requirementPanel.className = 'criterion-requirements';
    requirementPanel.hidden = !included;
    const heading = document.createElement('p');
    heading.className = 'criterion-requirements__heading';
    heading.textContent = t('ui.requirementHeading', 'Requirement set by the buyer');
    requirementPanel.appendChild(heading);
    const group = document.createElement('div');
    group.className = 'espd-question-group';
    appendFields(group, reqFields);
    requirementPanel.appendChild(group);
    card.appendChild(requirementPanel);
  }

  if (!mandatory) {
    checkbox.addEventListener('change', () => {
      setInclusionState(tag, code, checkbox.checked);
      if (requirementPanel) {
        requirementPanel.hidden = !checkbox.checked;
        // Reveal/settle any conditional fields inside the panel now it is shown.
        if (checkbox.checked) applyConditionalLogic(requirementPanel);
      }
    });
  }
  return card;
}

/**
 * The buyer-filled requirement fields of a criterion: the fields of every group
 * whose `filledBy` is the contracting authority. These are what a buyer sets to
 * express the criterion's requirement (e.g. the minimum turnover + number of
 * years for "Average yearly turnover"). Selection criteria (Part IV) carry a
 * `requirement` group; exclusion grounds (Part III) carry none, so this is empty.
 */
function requirementFields(member) {
  const fields = [];
  for (const group of member.groups || []) {
    if (group.filledBy !== 'contractingAuthority') continue;
    for (const field of group.fields || []) fields.push(field);
  }
  return fields;
}

// ─── Part I affordances ───────────────────────────────────────────────────────

/** Disable + dim every control in a part the active role may see but not edit. */
function markReadOnly(container) {
  container.querySelectorAll('input, select, textarea').forEach((el) => {
    el.disabled = true;
    el.setAttribute('aria-readonly', 'true');
    el.classList.add('espd-input-dimmed');
  });
}

/**
 * Attach a TED "Look up" button to each publication field carrying a
 * uiHints.lookup = ted-notice, and prefill Part I on success.
 */
function enhanceTedLookup(container) {
  const lookupFields = [...container.querySelectorAll('.espd-field[data-field^="partI.publication."]')];
  for (const fieldEl of lookupFields) {
    const input = fieldEl.querySelector('input');
    if (!input) continue;
    const wrapper = input.parentElement;
    wrapper.classList.add('espd-lookup');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'secondary outline espd-lookup-btn';
    btn.textContent = t('ui.lookUp', 'Look up');

    const msg = document.createElement('small');
    msg.className = 'espd-lookup-msg';
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');

    btn.addEventListener('click', async () => {
      const raw = (input.value || '').trim();
      const isUrl = fieldEl.dataset.field.endsWith('.url');
      const noticeNumber = isUrl ? extractNoticeNumberFromUrl(raw) : raw;
      if (!noticeNumber) {
        setLookupMsg(msg, 'info', t('ui.lookUpEnter', 'Enter a TED notice number or URL first.'));
        return;
      }
      setLookupMsg(msg, 'info', t('ui.lookUpLoading', 'Looking up…'));
      try {
        const result = await lookupNotice(noticeNumber);
        if (result.success) {
          prefillFromTed(result.data, container);
          setLookupMsg(msg, 'success', t('ui.lookUpOk', 'Procurement details retrieved.'));
        } else {
          setLookupMsg(msg, 'error', result.error || t('ui.lookUpFail', 'Lookup failed.'));
        }
      } catch (e) {
        setLookupMsg(msg, 'error', e.message || t('ui.lookUpFail', 'Lookup failed.'));
      }
    });

    wrapper.appendChild(btn);
    fieldEl.appendChild(msg);
  }
}

function setLookupMsg(msg, kind, text) {
  msg.className = `espd-lookup-msg espd-lookup-msg--${kind}`;
  msg.textContent = text;
}

/**
 * Prefill Part I fields from a TED lookup result into the instance document,
 * then update the matching inputs in place (leaving them editable).
 */
function prefillFromTed(data, container) {
  const map = {
    'partI.contractingAuthority.officialName': data.officialName,
    'partI.contractingAuthority.country': data.country,
    'partI.project.name': data.title,
    'partI.procedure.procedureType': data.procedureType,
  };
  for (const [dataPath, value] of Object.entries(map)) {
    if (value === undefined || value === null || value === '') continue;
    setAnswer(dataPath, value);
    const el = container.querySelector(`[data-field="${CSS.escape(dataPath)}"] input, [data-field="${CSS.escape(dataPath)}"] select`);
    if (el) el.value = value;
  }
  applyConditionalLogic(container);
}

// ─── utils ────────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
