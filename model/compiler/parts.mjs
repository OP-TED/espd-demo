// Phase 2 — administrative parts (I & VI): assemble the hand-authored section
// lenses into a generated, UI-facing part lens, and validate them.
//
// Parts I and VI are administrative INFORMATION blocks, not criteria, so they
// are hand-authored under model/parts/<part>/ as per-section 5-file bundles
// (schema/example/mapping/form/test) rather than compiled from the EA export.
// This module takes the authored *.form.json section lenses + the per-part
// index.json manifest and emits one assembled lens per part:
//
//   model/generated/ui/part-I.json, part-VI.json
//     { part, titleKey, descriptionKey, shortKey, filledBy,
//       sections: [ { id, titleKey, descriptionKey, filledBy, fields:[…] } ] }
//
// following the structure/text split the roles + codelist lenses use: the lens
// carries i18n KEYS; the English TEXT (section titles/descriptions + field
// labels) goes to the i18n catalogue i18n/i18n/en/espd.parts.json.
//
// Validation (throws on first problem):
//   - manifest shape; every listed section file exists and self-identifies;
//   - each field has dataPath + uiType + labelKey + inline label;
//   - codelist refs resolve against the codelist governance registry (incl. aliases);
//   - visibleWhen is { path, isPresent:boolean };
//   - uiHints validate against the ui-hints registry (allowed vocabulary).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

const partsRoot = path.join(here, '..', 'parts');
const governancePath = path.join(here, '..', 'codelists', 'governance.json');
const uiHintsPath = path.join(here, '..', 'model-sources', 'registries', 'ui-hints.json');
const i18nPath = path.resolve(here, '..', '..', 'i18n', 'i18n', 'en', 'espd.parts.json');

// Parts with hand-authored administrative (INFORMATION) blocks. Part II is mixed
// (these admin sections interleave with EA-compiled OT criteria — build-ui-bundle
// places them); I and VI are admin-only.
const ADMIN_PARTS = [
  { part: 'I', dir: 'partI' },
  { part: 'II', dir: 'partII' },
  { part: 'VI', dir: 'partVI' },
];

const ALLOWED_UI_TYPES = new Set(['text', 'textarea', 'url', 'code']);

/** Load a JSON file. */
function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/** The set of codelist names the governance registry knows (canonical + aliases). */
function knownCodelists(governance) {
  const names = new Set();
  for (const [name, def] of Object.entries(governance.codelists)) {
    names.add(name);
    for (const alias of def.aliases ?? []) names.add(alias);
  }
  return names;
}

/** Load the authored sources + the two registries this build depends on. */
export function loadPartsSources() {
  const governance = readJson(governancePath);
  const uiHints = readJson(uiHintsPath);
  const parts = ADMIN_PARTS.map(({ part, dir }) => {
    const partDir = path.join(partsRoot, dir);
    const manifest = readJson(path.join(partDir, 'index.json'));
    const sections = manifest.sections.map((id) =>
      readJson(path.join(partDir, `section${id}.form.json`))
    );
    return { part, dir, manifest, sections };
  });
  return { governance, uiHints, parts };
}

/**
 * Validate one field against the registries. Throws on the first problem.
 */
function validateField(field, where, { codelistNames, lookupNames }) {
  if (!field.dataPath) throw new Error(`${where}: field missing dataPath`);
  const at = `${where} field "${field.dataPath}"`;
  if (field.kind === 'caption') return; // notes carry no data binding
  if (!field.uiType) throw new Error(`${at}: missing uiType`);
  if (!ALLOWED_UI_TYPES.has(field.uiType)) {
    throw new Error(`${at}: unknown uiType "${field.uiType}"`);
  }
  if (!field.labelKey) throw new Error(`${at}: missing labelKey`);
  if (!field.label) throw new Error(`${at}: missing inline label (English text for the catalogue)`);

  if (field.uiType === 'code' && !field.codelist) {
    throw new Error(`${at}: uiType "code" requires a codelist`);
  }
  if (field.codelist && !codelistNames.has(field.codelist)) {
    throw new Error(`${at}: unknown codelist "${field.codelist}"`);
  }

  if (field.visibleWhen !== undefined) {
    const vw = field.visibleWhen;
    if (!vw || typeof vw.path !== 'string' || typeof vw.isPresent !== 'boolean') {
      throw new Error(`${at}: visibleWhen must be { path:string, isPresent:boolean }`);
    }
  }

  if (field.uiHints !== undefined) {
    const hints = field.uiHints;
    if (typeof hints !== 'object' || hints === null) {
      throw new Error(`${at}: uiHints must be an object`);
    }
    if (hints.lookup !== undefined) {
      const lk = hints.lookup;
      if (!lk || typeof lk.name !== 'string') {
        throw new Error(`${at}: uiHints.lookup must carry a string "name"`);
      }
      if (!lookupNames.has(lk.name)) {
        throw new Error(`${at}: unknown uiHints.lookup "${lk.name}" (not in ui-hints registry)`);
      }
      const kinds = lookupNames.get(lk.name);
      if (lk.inputKind !== undefined && !kinds.includes(lk.inputKind)) {
        throw new Error(`${at}: uiHints.lookup.inputKind "${lk.inputKind}" not allowed for "${lk.name}" (allowed: ${kinds.join(', ')})`);
      }
    }
    const allowedHintKeys = new Set(['lookup']);
    for (const key of Object.keys(hints)) {
      if (!allowedHintKeys.has(key)) throw new Error(`${at}: unknown uiHint "${key}"`);
    }
  }
}

/**
 * Validate the whole set. Throws on first problem.
 */
export function validatePartsSources({ governance, uiHints, parts }) {
  const codelistNames = knownCodelists(governance);
  const lookupNames = new Map(
    Object.entries(uiHints.lookups).map(([name, def]) => [name, def.reads.inputKinds])
  );

  for (const { part, manifest, sections } of parts) {
    if (manifest.part !== part) {
      throw new Error(`part ${part}: manifest.part is "${manifest.part}"`);
    }
    for (const key of ['titleKey', 'descriptionKey', 'filledBy']) {
      if (!manifest[key]) throw new Error(`part ${part}: manifest missing ${key}`);
    }
    if (!Array.isArray(manifest.sections) || manifest.sections.length === 0) {
      throw new Error(`part ${part}: manifest.sections must be a non-empty array`);
    }
    sections.forEach((section, i) => {
      const id = manifest.sections[i];
      const where = `part ${part} section ${id}`;
      if (section.part !== part) throw new Error(`${where}: section.part is "${section.part}"`);
      if (section.section !== id) throw new Error(`${where}: section.section is "${section.section}"`);
      for (const key of ['titleKey', 'title', 'filledBy']) {
        if (!section[key]) throw new Error(`${where}: missing ${key}`);
      }
      if (!Array.isArray(section.fields) || section.fields.length === 0) {
        throw new Error(`${where}: fields must be a non-empty array`);
      }
      for (const field of section.fields) {
        validateField(field, where, { codelistNames, lookupNames });
      }
    });
  }
}

/** Project an authored field to its generated (keys-only) UI shape. */
function toUiField(field) {
  const out = { dataPath: field.dataPath };
  if (field.kind) out.kind = field.kind;
  if (field.uiType) out.uiType = field.uiType;
  out.labelKey = field.labelKey;
  if (field.codelist) out.codelist = field.codelist;
  if (field.required !== undefined) out.required = field.required;
  if (field.repeatable !== undefined) out.repeatable = field.repeatable;
  if (field.visibleWhen) out.visibleWhen = field.visibleWhen;
  if (field.uiHints) out.uiHints = field.uiHints;
  return out;
}

/**
 * Build the assembled UI part lenses + the English i18n catalogue.
 * Pure w.r.t. inputs; writes only when { write: true }. Returns { lenses, catalogue }.
 */
export function buildPartsLens({ sources = loadPartsSources(), write = true } = {}) {
  validatePartsSources(sources);

  const catalogue = {
    _comment: 'GENERATED by model/compiler/parts.mjs. English text for the administrative Part I/VI form lenses: section titles/descriptions and field labels, keyed by the labelKey/titleKey/descriptionKey the generated part-*.json carry. Source: model/parts/<part>/section*.form.json. Do not hand-edit; regenerate.',
  };

  const lenses = sources.parts.map(({ part, manifest, sections }) => {
    const uiSections = sections.map((section, i) => {
      const id = manifest.sections[i];
      // Harmonised section-title key: a single convention shared with the
      // criterion-bearing sections that build-ui-bundle.mjs synthesises
      // (section.title.<roman>.<letter>). The authored section.titleKey is
      // ignored on purpose so the key convention lives in exactly one place; the
      // authored prose title is what gets written under that key, overriding any
      // terser positional entry in espd.common.json.
      const titleKey = `section.title.${part}.${id}`;
      // Section text -> catalogue.
      catalogue[titleKey] = section.title;
      if (section.descriptionKey && section.description) {
        catalogue[section.descriptionKey] = section.description;
      }
      // Field label text -> catalogue.
      for (const field of section.fields) {
        if (field.label) catalogue[field.labelKey] = field.label;
      }
      return {
        id,
        titleKey,
        ...(section.descriptionKey ? { descriptionKey: section.descriptionKey } : {}),
        filledBy: section.filledBy,
        fields: section.fields.map(toUiField),
      };
    });

    return {
      part,
      titleKey: manifest.titleKey,
      descriptionKey: manifest.descriptionKey,
      ...(manifest.shortKey ? { shortKey: manifest.shortKey } : {}),
      filledBy: manifest.filledBy,
      sections: uiSections,
    };
  });

  // parts.mjs owns the English catalogue; build-ui-bundle.mjs owns the assembled
  // part-*.json (the admin lenses here are an in-memory input to that assembly).
  if (write) {
    fs.mkdirSync(path.dirname(i18nPath), { recursive: true });
    fs.writeFileSync(i18nPath, JSON.stringify(catalogue, null, 2) + '\n');
  }

  return { lenses, catalogue };
}

/** Admin lenses keyed by part roman numeral, for build-ui-bundle to consume. */
export function adminLensesByPart(opts = {}) {
  const { lenses } = buildPartsLens({ ...opts, write: false });
  return new Map(lenses.map((l) => [l.part, l]));
}

export const partsI18nPath = i18nPath;

// Run directly: node model/compiler/parts.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { lenses, catalogue } = buildPartsLens({ write: true });
  const keys = Object.keys(catalogue).filter((k) => k !== '_comment').length;
  const sectionCount = lenses.reduce((n, l) => n + l.sections.length, 0);
  console.log(`Validated ${lenses.length} admin part lenses (${sectionCount} sections); wrote ${keys} English catalogue entries to i18n/en/espd.parts.json. (part-*.json emitted by build-ui-bundle.)`);
}
