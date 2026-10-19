/**
 * Document import — accepts either an official UBL ESPD XML or a JSON draft.
 *
 *   - UBL XML (QualificationApplicationRequest / …Response): reconstructed into
 *     the flat instance document by running the per-criterion mapping fragments
 *     + admin sidecars in reverse (mapper.unmap) via the document composer's
 *     browser deps. The role/documentType is inferred from the root element and
 *     the economic-operator role when present.
 *   - JSON draft (format "espd-instance"): the lossless save-progress file the
 *     exporter writes; restored directly (includes inclusions state).
 */

import { setRole, setInstance, setCurrentStep, setInclusions } from './state.js';
import { getRoles } from './model.js';
import { reconstructFromUbl } from '../model/mapping-engine/compose-document-browser.mjs';

/**
 * Import an ESPD document file (UBL XML or JSON draft) and populate the store.
 *
 * @param {File} file
 * @param {{role?: string, documentType?: 'request'|'response'}} [intent]
 *   The caller's intended session role/documentType. When given, it OVERRIDES
 *   the role/documentType the file itself implies — this is how an economic
 *   operator imports a buyer's Request and continues as a Response: intent
 *   { role: <eo sub-role>, documentType: 'response' }. When omitted, the role is
 *   inferred from the document (a Request → buyer, a Response → EO) as before.
 * @returns {Promise<{role: string|null, documentType?: string, success: boolean,
 *   message: string, transitioned?: boolean}>}
 */
export async function importDocumentFile(file, intent) {
  let text;
  try {
    text = await file.text();
  } catch (e) {
    return { role: null, success: false, message: `Failed to read file: ${e.message}` };
  }
  const looksXml = /^\uFEFF?\s*<\?xml|^\uFEFF?\s*<QualificationApplication/.test(text);
  return looksXml ? importUblString(text, intent) : importDraftString(text, intent);
}

// ─── UBL import ───────────────────────────────────────────────────────────────

/**
 * Import an official UBL ESPD document (async: fetches the mapping specs).
 * @param {string} xml
 * @param {{role?: string, documentType?: 'request'|'response'}} [intent]
 */
export async function importUblString(xml, intent) {
  if (!/<QualificationApplication(Request|Response)\b/.test(xml)) {
    return { role: null, success: false, message: 'Unrecognized XML. Expected an ESPD QualificationApplicationRequest or …Response.' };
  }
  let result;
  try {
    result = await reconstructFromUbl(xml);
  } catch (e) {
    return { role: null, success: false, message: `Could not read the ESPD document: ${e.message}` };
  }
  const { instance, documentType: fileType, criterionIds, criteria } = result;

  // The SESSION role/documentType: the caller's intent wins; otherwise infer
  // from the file. The key transition is an EO importing a buyer's Request —
  // intent says { response, <eo-role> }, so the buyer's Part I + declared
  // criteria + requirement data (all recovered above) become the read-only
  // context the EO answers, even though the file is a Request.
  const sessionType = intent?.documentType ?? fileType;
  const role = intent?.role ?? inferRole(instance, fileType);
  const transitioned = fileType === 'request' && sessionType === 'response';

  setRole(role);
  setInstance(instance || {});
  // Reconstruct the declared criteria set: a criterion is "included" by the
  // PRESENCE of its cac:TenderingCriterion. The inclusion key is `${tag}_${code}`
  // (js/state.js inclusionKey) — exactly the criterion's property-id prefix. For
  // an EO building on a buyer's Request this is the FIXED set the EO must answer.
  const inclusions = {};
  for (const c of criteria || []) inclusions[`${c.tag}_${c.code}`] = true;
  setInclusions(inclusions);
  setCurrentStep(0);

  const n = criterionIds.length;
  const criteriaText = `${n} criteri${n === 1 ? 'on' : 'a'}`;
  const message = transitioned
    ? `Imported the buyer's ESPD Request (${criteriaText}). You can now complete your ESPD.`
    : `Imported ESPD ${sessionType === 'response' ? 'Response' : 'Request'} with ${criteriaText}.`;

  return { role, documentType: sessionType, success: true, message, transitioned };
}

/**
 * Infer the session role from the reconstructed instance. A Response carries the
 * economic-operator role (partII.economicOperator.role, an eo-role-type code); a
 * Request is a buyer. Falls back to a sensible default per document type.
 */
function inferRole(instance, documentType) {
  const roles = getRoles();
  if (documentType === 'response') {
    const eoRole = instance?.partII?.economicOperator?.role;
    // The eo-role-type code matches the role lens id (sole-tenderer, group-lead…).
    if (eoRole && roles?.eoRoles?.some((r) => r.id === eoRole)) return eoRole;
    return roles?.eoRoles?.[0]?.id || 'sole-tenderer';
  }
  // Request → a buyer type (contracting-authority by default).
  return roles?.buyerTypes?.[0]?.id || 'contracting-authority';
}

// ─── Draft (JSON) import ──────────────────────────────────────────────────────

/**
 * Import from a JSON draft string (format "espd-instance"). A draft is the
 * lossless save of a specific session, so its OWN role/documentType win; the
 * `intent` is accepted for call-site symmetry but only fills in a missing role.
 * @param {string} text
 * @param {{role?: string, documentType?: 'request'|'response'}} [intent]
 */
export function importDraftString(text, intent) {
  let doc;
  try {
    doc = JSON.parse(text);
  } catch {
    return { role: null, success: false, message: 'Invalid file: not valid XML or JSON.' };
  }

  if (!doc || doc.format !== 'espd-instance') {
    return {
      role: null,
      success: false,
      message: 'Unrecognized file. Expected an ESPD UBL document (.xml) or an ESPD draft (.json).',
    };
  }
  const role = doc.role || intent?.role;
  if (!role) {
    return { role: null, success: false, message: 'The imported draft has no role.' };
  }
  const documentType = doc.documentType || intent?.documentType || 'request';

  setRole(role);
  setInstance(doc.instance || {});
  setInclusions(doc.inclusions || {});
  setCurrentStep(0);

  const leafCount = countLeaves(doc.instance || {});
  return {
    role,
    documentType,
    success: true,
    message: `Imported ESPD ${documentType === 'response' ? 'Response' : 'Request'} draft with ${leafCount} data field${leafCount === 1 ? '' : 's'}.`,
  };
}

function countLeaves(obj) {
  if (obj == null) return 0;
  if (typeof obj !== 'object') return 1;
  return Object.values(obj).reduce((n, v) => n + countLeaves(v), 0);
}
