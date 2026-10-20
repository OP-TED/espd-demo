// Utility: read code values from an ESPD-EDM Genericode (.gc) file, and resolve
// the shipped codelist directory. Shared by the compiler (enum derivation in the
// instance-schema generator) and the hand-authored part models (model/parts).
//
// Usage:
//   import { readCodelistCodes, codelistPath } from '../codelists/read-codelist.mjs';
//   const codes = readCodelistCodes(codelistPath('DocrefcontentType.gc'));

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// model/codelists/ -> app repo root -> workspace root (espd) -> ESPD-EDM/codelists
// Path is resolved RELATIVE to this module (import.meta.url), so it is unaffected
// by the app-repo folder name; it assumes ESPD-EDM/ is a sibling of the app repo.
const CODELISTS_DIR = path.resolve(here, '..', '..', '..', 'ESPD-EDM', 'codelists');

/** Absolute path to a shipped .gc codelist by file name (e.g. 'EOIDType.gc'). */
export function codelistPath(gcFileName) {
  return path.join(CODELISTS_DIR, gcFileName);
}

/**
 * Decode the XML character entities a .gc text value may carry. Genericode is
 * XML, so a literal ampersand in a label (e.g. "Duns & Bradstreet number") is
 * stored escaped as "&amp;". Extracting the raw text keeps that escape, which
 * then shows through in the UI as "&amp;". Decode the five predefined XML
 * entities (plus numeric refs) so the stored label is the real text; the UI
 * renders it with textContent, which re-escapes safely for display.
 */
export function decodeXmlEntities(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&'); // last: so "&amp;lt;" decodes to "&lt;", not "<"
}

// Lazily-built index: codelist NAME (as used in our profiles / sidecar `codelist`
// values, e.g. 'financial-ratio-type') -> .gc file name. A .gc declares both a
// ShortName ('FinancialRatioType') and a LongName ('financial-ratio-type' or
// sometimes the same as ShortName), so we index by both, case-insensitively.
let _nameIndex = null;
function nameIndex() {
  if (_nameIndex) return _nameIndex;
  _nameIndex = new Map();
  for (const file of fs.readdirSync(CODELISTS_DIR)) {
    if (!file.endsWith('.gc')) continue;
    const xml = fs.readFileSync(path.join(CODELISTS_DIR, file), 'utf8');
    // Index by: the file stem, the ShortName, and EVERY <LongName> — the
    // kebab-case list id lives in <LongName Identifier="listId">...</LongName>,
    // which the ShortName/first-LongName alone would miss. Only index the Identification
    // block's names (agency LongName would wrongly map 'Publications Office...').
    const keys = new Set([file.replace(/\.gc$/, '')]);
    const idBlock = xml.match(/<Identification>([\s\S]*?)<\/Identification>/)?.[1] ?? xml;
    const short = idBlock.match(/<ShortName>([^<]+)<\/ShortName>/)?.[1];
    if (short) keys.add(short);
    for (const m of idBlock.matchAll(/<LongName(?:\s+Identifier="[^"]*")?>([^<]+)<\/LongName>/g)) {
      // The agency ShortName/LongName sits in a nested <Agency> block; skip the
      // human agency name by only taking LongNames that look like identifiers
      // (no spaces).
      if (!/\s/.test(m[1])) keys.add(m[1]);
    }
    for (const key of keys) _nameIndex.set(key.toLowerCase(), file);
  }
  return _nameIndex;
}

/**
 * Resolve a codelist NAME (as used in the codelist-attribute profile or a
 * sidecar leaf `codelist`) to its shipped .gc file name, or undefined if the
 * list is not shipped in ESPD-EDM/codelists.
 */
export function gcFileForCodelist(name) {
  if (!name) return undefined;
  return nameIndex().get(name.toLowerCase());
}

/** Codes for a codelist by NAME, or undefined if the list is not shipped. */
export function codesForCodelist(name) {
  const file = gcFileForCodelist(name);
  return file ? readCodelistCodes(path.join(CODELISTS_DIR, file)) : undefined;
}

/**
 * Extract code + ENGLISH label from a Genericode .gc file, for building the UI
 * codelist service data (UX1). This project is English-only (one `en` i18n
 * locale), so we take only the English label and ignore the other languages the
 * EU authority lists carry. Handles the two shapes shipped in
 * ESPD-EDM/codelists:
 *   - EU authority lists (Country, Currency, EoRoleType, …): take `eng_label`.
 *   - ESPD-internal lists (FinancialRatioType, EOIDType, DocrefcontentType, …):
 *     take `name-eng`, else `Name`.
 *
 * Returns, per row: { code, label } where `label` is the English text (undefined
 * when the source carries none — some OP authority rows are unlabelled).
 * @param {string} gcPath absolute or relative path to the .gc file
 * @returns {{code:string, label:(string|undefined)}[]} in document order
 */
export function readCodelistEntries(gcPath) {
  const xml = fs.readFileSync(gcPath, 'utf8');
  const entries = [];
  const rows = xml.split(/<Row>/);
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split('</Row>')[0];
    const cells = new Map();
    for (const m of row.matchAll(
      /<Value\s+ColumnRef\s*=\s*"([^"]+)"[^>]*>\s*<SimpleValue>([\s\S]*?)<\/SimpleValue>/g
    )) {
      cells.set(m[1], decodeXmlEntities(m[2].trim()));
    }
    const code = cells.get('code');
    if (code === undefined) continue;
    // English label: eng_label (EU authority lists) -> name-eng / Name (internal).
    const label = cells.get('eng_label') || cells.get('name-eng') || cells.get('Name') || undefined;
    entries.push({ code, label });
  }
  return entries;
}

/**
 * Extract all code values from a Genericode .gc file.
 * Parses the XML just enough to pull <SimpleValue> from the `code` ColumnRef
 * in each Row — no XML library dependency.
 * @param {string} gcPath absolute or relative path to the .gc file
 * @returns {string[]} the code values, in document order
 */
export function readCodelistCodes(gcPath) {
  const xml = fs.readFileSync(gcPath, 'utf8');
  const codes = [];

  // Split on <Row> and extract the code column's SimpleValue from each.
  // The code column is identified by ColumnRef="code".
  const rows = xml.split(/<Row>/);
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split('</Row>')[0];
    const match = row.match(
      /<Value\s+ColumnRef\s*=\s*"code"[^>]*>\s*<SimpleValue>([\s\S]*?)<\/SimpleValue>/
    );
    if (match) codes.push(decodeXmlEntities(match[1].trim()));
  }
  return codes;
}
