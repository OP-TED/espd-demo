/**
 * Document export — serialize the JSON instance document for download.
 *
 * CUTOVER NOTE (Phase 4/5): export/import now round-trip the JSON INSTANCE
 * DOCUMENT directly, not UBL XML. The hand-rolled XML string-building this module
 * used to do is gone; UBL export via the mapping engine (mapper.mjs) returns in
 * Phase 6. The instance document is the hub the whole UI binds to, so a JSON
 * round-trip is lossless and keeps "download → import → resume" working.
 *
 * Exported envelope shape:
 *   { $schema?, format: "espd-instance", version, documentType, role, instance,
 *     inclusions, metadata }
 */

import { getState, exportState } from './state.js';
import { getRoleById } from './model.js';

const FORMAT = 'espd-instance';
const FORMAT_VERSION = '1.0';

/** Build the export envelope object from the current state. */
export function exportDocument() {
  const state = exportState();
  const role = getRoleById(state.role);
  return {
    format: FORMAT,
    version: FORMAT_VERSION,
    documentType: role?.documentType || 'request',
    role: state.role,
    instance: state.instance || {},
    inclusions: state.inclusions || {},
    metadata: state.metadata || {},
  };
}

/** Serialize the export envelope to a JSON string. */
export function serializeDocument() {
  return JSON.stringify(exportDocument(), null, 2);
}

/** The download filename for the current document type. */
export function documentFilename() {
  const role = getRoleById(getState().role);
  return role?.documentType === 'response' ? 'espd-response.json' : 'espd-request.json';
}

/** Trigger a browser download of the serialized instance document. */
export function downloadDocument() {
  const json = serializeDocument();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = documentFilename();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
