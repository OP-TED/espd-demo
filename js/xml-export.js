/**
 * Document export.
 *
 * Two outputs:
 *   1. OFFICIAL — a UBL ESPD Request/Response XML, assembled by the model's
 *      document composer (model/mapping-engine/compose-document*) from the flat
 *      instance document. This is the real, interoperable ESPD document.
 *   2. DRAFT — the JSON instance document (envelope { format:"espd-instance", … }).
 *      A lossless "save my progress" file that round-trips through import,
 *      including the buyer's criteria-selection (inclusions) state, which UBL
 *      does not carry.
 *
 * UBL export is async (it fetches the mapping specs + codelist profile). The
 * draft export is synchronous.
 */

import { getState, exportState, getAnswers, getInclusionState } from './state.js';
import { getRoleById, allCriterionMembers, isCriterionMandatory } from './model.js';
import { composeInBrowser } from '../model/mapping-engine/compose-document-browser.mjs';

const DRAFT_FORMAT = 'espd-instance';
const DRAFT_VERSION = '1.0';

// ─── Official UBL export ──────────────────────────────────────────────────────

/** The document type ('request' | 'response') for the current role. */
function currentDocumentType() {
  const role = getRoleById(getState().role);
  return role?.documentType === 'response' ? 'response' : 'request';
}

/**
 * Which criterion ids this document should declare.
 *   - request (buyer): the criteria the buyer selected — mandatory ∪ explicitly
 *     included — regardless of whether any answer has been entered.
 *   - response (EO): the criteria actually present (answered) in the instance;
 *     the composer derives these from the instance when includedIds is omitted.
 */
export function includedCriterionIds(documentType = currentDocumentType(), role = getState().role) {
  if (documentType === 'response') return undefined; // composer uses instance-present criteria
  return allCriterionMembers()
    .filter((m) => isCriterionMandatory(m.code, role) || getInclusionState(m.tag, m.code) === true)
    .map((m) => m.id);
}

/** Build the official UBL document as a string (async: fetches specs + profile). */
export async function buildUblDocument() {
  const documentType = currentDocumentType();
  return composeInBrowser({
    instance: getAnswers(),
    documentType,
    includedIds: includedCriterionIds(documentType),
  });
}

/** The official download filename for the current document type. */
export function ublFilename() {
  return currentDocumentType() === 'response' ? 'espd-response.xml' : 'espd-request.xml';
}

/** Trigger a browser download of the official UBL document. */
export async function downloadDocument() {
  const xml = await buildUblDocument();
  triggerDownload(xml, ublFilename(), 'application/xml');
}

// ─── Draft (JSON instance-document) export ────────────────────────────────────

/** Build the draft envelope object from the current state. */
export function exportDraft() {
  const state = exportState();
  const role = getRoleById(state.role);
  return {
    format: DRAFT_FORMAT,
    version: DRAFT_VERSION,
    documentType: role?.documentType || 'request',
    role: state.role,
    instance: state.instance || {},
    inclusions: state.inclusions || {},
    metadata: state.metadata || {},
  };
}

/** Serialize the draft envelope to a JSON string. */
export function serializeDraft() {
  return JSON.stringify(exportDraft(), null, 2);
}

/** The draft download filename for the current document type. */
export function draftFilename() {
  const role = getRoleById(getState().role);
  return role?.documentType === 'response' ? 'espd-response-draft.json' : 'espd-request-draft.json';
}

/** Trigger a browser download of the JSON draft. */
export function downloadDraft() {
  triggerDownload(serializeDraft(), draftFilename(), 'application/json');
}

// ─── Shared download helper ───────────────────────────────────────────────────

function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
