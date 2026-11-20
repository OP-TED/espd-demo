// Vendor the PUBLISHED ESPD model (ESPD-EDM/model) into model/generated/.
//
//   npm run model:sync
//   node model/compiler/sync-published.mjs [--source <ESPD-EDM/model>] [--structure <espd-edm.json>]
//
// The app ships from committed files (GitHub Pages builds no model), so the published
// model is copied in verbatim and committed. The copy is refused unless the published
// model verifies:
//   - compiled-model.json conforms to the schema that ships WITH the model,
//   - every file the envelope lists exists, and nothing unlisted lingers,
//   - the model was built from the structure export we also read (SHA-256 match), so the
//     structure used for the UI sections and the model used for the data cannot be skew.
//
// Copied: instance-data/, xml-mapping/, compiled/, registries/, compiled-model.json.
// The vendored directories are replaced as a whole, so a criterion removed upstream does
// not linger. Never hand-edit the vendored files; change the source and re-sync.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import Ajv from 'ajv';
import { publishedDir, structurePath } from './upstream.mjs';
import { generatedRoot } from './published-model.mjs';

export const VENDORED_DIRS = ['instance-data', 'xml-mapping', 'compiled', 'registries'];

const sha256File = (file) =>
  crypto.createHash('sha256').update(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), 'utf8').digest('hex');

/** Verify a published model folder. Returns { envelope, problems } (empty problems = ok). */
export function verifyPublished({ source = publishedDir(), structure = structurePath() } = {}) {
  const problems = [];
  const envelopeFile = path.join(source, 'compiled-model.json');
  if (!fs.existsSync(envelopeFile)) return { envelope: null, problems: [`no compiled-model.json in ${source}`] };
  const envelope = JSON.parse(fs.readFileSync(envelopeFile, 'utf8'));

  const schemaFile = path.join(source, 'schema', 'compiled-model.schema.json');
  if (!fs.existsSync(schemaFile)) return { envelope, problems: [`the published model has no schema/compiled-model.schema.json`] };
  const validate = new Ajv({ allErrors: true, strict: true }).compile(JSON.parse(fs.readFileSync(schemaFile, 'utf8')));
  if (!validate(envelope)) {
    for (const e of validate.errors) problems.push(`compiled-model.json: ${e.instancePath || '/'} ${e.message}`);
    return { envelope, problems };
  }

  const listed = new Set();
  for (const c of envelope.criteria) for (const rel of Object.values(c.files)) if (rel) listed.add(rel);
  for (const rel of envelope.registries) listed.add(rel);
  for (const rel of listed) if (!fs.existsSync(path.join(source, rel))) problems.push(`listed file is missing: ${rel}`);
  for (const dir of VENDORED_DIRS) {
    const abs = path.join(source, dir);
    if (!fs.existsSync(abs)) { problems.push(`missing folder: ${dir}`); continue; }
    for (const f of fs.readdirSync(abs)) if (!listed.has(`${dir}/${f}`)) problems.push(`file not in the envelope: ${dir}/${f}`);
  }

  if (!fs.existsSync(structure)) {
    problems.push(`structure export not found: ${structure}`);
  } else if (sha256File(structure) !== envelope.provenance.structure.sha256) {
    problems.push(`the model was not built from this structure export (${structure}); sync the structure and the model from the same ESPD-EDM state`);
  }
  return { envelope, problems };
}

/**
 * The part of the EA structure this app needs: parts, their sections, and each section's
 * ordered members (type, tag, code, name). It drives the UI's section layout and the
 * coverage report. A small, deterministic projection, so the committed copy stays reviewable
 * and builds and tests need no access to the full export (the full file is hash-checked
 * against the model when it is synced).
 */
export function projectStructure(edm) {
  return edm.map((p) => ({
    part: p.part,
    sections: (p.sections ?? []).map((s) => ({
      section: s.section,
      criteria: (s.criteria ?? []).map((c) => ({
        type: c.type,
        tag: c.tag,
        code: c.code,
        ...(c.name !== undefined ? { name: c.name } : {}),
      })),
    })),
  }));
}

/** Verify, then copy the published model into `target`. Returns the envelope. */
export function syncPublished({ source = publishedDir(), structure = structurePath(), target = generatedRoot } = {}) {
  const { envelope, problems } = verifyPublished({ source, structure });
  if (problems.length) {
    throw new Error(`The published model at ${source} does not verify:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  }
  for (const dir of VENDORED_DIRS) {
    fs.rmSync(path.join(target, dir), { recursive: true, force: true });
    fs.cpSync(path.join(source, dir), path.join(target, dir), { recursive: true });
  }
  fs.copyFileSync(path.join(source, 'compiled-model.json'), path.join(target, 'compiled-model.json'));
  fs.writeFileSync(path.join(target, 'structure.json'), JSON.stringify(projectStructure(JSON.parse(fs.readFileSync(structure, 'utf8'))), null, 2) + '\n');
  return envelope;
}

// Run directly: node model/compiler/sync-published.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { values } = parseArgs({ options: { source: { type: 'string' }, structure: { type: 'string' } } });
  try {
    const env = syncPublished({
      ...(values.source ? { source: path.resolve(values.source) } : {}),
      ...(values.structure ? { structure: path.resolve(values.structure) } : {}),
    });
    process.stderr.write(`Synced the published model: ${env.counts.criteria} criteria, ESPD ${env.espdVersion}, UBL ${env.ublVersion}.\n`);
  } catch (err) {
    process.stderr.write(`${err.message}\n`);
    process.exit(1);
  }
}
