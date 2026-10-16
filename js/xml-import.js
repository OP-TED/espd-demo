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
 * @param {File} file
 * @returns {Promise<{role: string|null, success: boolean, message: string}>}
 */
export async function importDocumentFile(file) {
  let text;
  try {
    text = await file.text();
  } catch (e) {
    return { role: null, success: false, message: `Failed to read file: ${e.message}` };
  }
  const looksXml = /^\uFEFF?\s*<\?xml|^\uFEFF?\s*<QualificationApplication/.test(text);
  return looksXml ? importUblString(text) : importDraftString(text);
}

// ─── UBL import ───────────────────────────────────────────────────────────────

/** Import an official UBL ESPD document (async: fetches the mapping specs). */
export async function importUblString(xml) {
  if (!/<QualificationApplication(Request|Response)\b/.test(xml)) {
    return { role: null, success: false, message: 'Unrecognized XML. Expected an ESPD QualificationApplicationRequest or …Response.' };
  }
  let result;
  try {
    result = await reconstructFromUbl(xml);
  } catch (e) {
    return { role: null, success: false, message: `Could not read the ESPD document: ${e.message}` };
  }
  const { instance, documentType, criterionIds } = result;
  const role = inferRole(instance, documentType);

  setRole(role);
  setInstance(instance || {});
  setInclusions({}); // UBL does not carry the buyer's selection state; start clean
  setCurrentStep(0);

  return {
    role,
    success: true,
    message: `Imported ESPD ${documentType === 'response' ? 'Response' : 'Request'} with ${criterionIds.length} criteri${criterionIds.length === 1 ? 'on' : 'a'}.`,
  };
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

/** Import from a JSON draft string (format "espd-instance"). */
export function importDraftString(text) {
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
  if (!doc.role) {
    return { role: null, success: false, message: 'The imported draft has no role.' };
  }

  setRole(doc.role);
  setInstance(doc.instance || {});
  setInclusions(doc.inclusions || {});
  setCurrentStep(0);

  const leafCount = countLeaves(doc.instance || {});
  return {
    role: doc.role,
    success: true,
    message: `Imported ESPD ${doc.documentType === 'response' ? 'Response' : 'Request'} draft with ${leafCount} data field${leafCount === 1 ? '' : 's'}.`,
  };
}

function countLeaves(obj) {
  if (obj == null) return 0;
  if (typeof obj !== 'object') return 1;
  return Object.values(obj).reduce((n, v) => n + countLeaves(v), 0);
}
