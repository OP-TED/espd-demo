/**
 * Document import — load a JSON instance document and resume the session.
 *
 * CUTOVER NOTE (Phase 4/5): import now reads the JSON INSTANCE DOCUMENT written
 * by the exporter (format "espd-instance"), not UBL XML. Lossy regex XML parsing
 * is gone; UBL import via the mapping engine (mapper.unmap) returns in Phase 6.
 */

import { setRole, setInstance, setCurrentStep, setInclusions } from './state.js';

/**
 * Import an ESPD instance document file and populate the store.
 * @param {File} file
 * @returns {Promise<{role: string|null, success: boolean, message: string}>}
 */
export async function importDocumentFile(file) {
  try {
    const text = await file.text();
    return importDocumentString(text);
  } catch (e) {
    return { role: null, success: false, message: `Failed to read file: ${e.message}` };
  }
}

/** Import from a JSON string. */
export function importDocumentString(text) {
  let doc;
  try {
    doc = JSON.parse(text);
  } catch {
    return { role: null, success: false, message: 'Invalid file: not valid JSON.' };
  }

  if (!doc || doc.format !== 'espd-instance') {
    return {
      role: null,
      success: false,
      message: 'Unrecognized file. Expected an ESPD instance document (format "espd-instance").',
    };
  }
  if (!doc.role) {
    return { role: null, success: false, message: 'The imported document has no role.' };
  }

  setRole(doc.role);
  setInstance(doc.instance || {});
  setInclusions(doc.inclusions || {});
  setCurrentStep(0);

  const leafCount = countLeaves(doc.instance || {});
  return {
    role: doc.role,
    success: true,
    message: `Imported ESPD ${doc.documentType === 'response' ? 'Response' : 'Request'} with ${leafCount} data field${leafCount === 1 ? '' : 's'}.`,
  };
}

function countLeaves(obj) {
  if (obj == null) return 0;
  if (typeof obj !== 'object') return 1;
  return Object.values(obj).reduce((n, v) => n + countLeaves(v), 0);
}
