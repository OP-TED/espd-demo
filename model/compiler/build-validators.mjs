// Phase 6A — precompile the composed instance-data schemas into STANDALONE Ajv
// validators (plain JS functions, no Ajv compiler/eval shipped to the browser,
// no CSP issue). Emitted to model/generated/ui/validators/.
//
// What gets a validator (one exported function each):
//   - the four criterion-bearing part roots (ui/schema/part-{II,III,IV,V}.schema.json),
//     each validating that part's slice of the instance document, e.g. { partIII: … };
//   - the six hand-authored administrative section schemas
//     (model/parts/{partI,partII,partVI}/section*.schema.json), each validating its
//     own slice ({ partI: … } / { partII: … } / { partVI: … }).
//
// The per-criterion schemas (instance-data/<id>.schema.json) are registered (the
// part roots $ref them by $id) but are not themselves exported — they are
// validated through their part root.
//
// Note on the document root (ui/schema/espd.schema.json): it currently composes
// the part roots under `part-II`/`part-III`/… PROPERTIES, which double-wraps and
// does not match the flat instance document. The UI validates per-part (each
// visible part's slice against its part root), which is correct and sufficient;
// composing a single flat document validator is deferred to 6B (full-document
// assembly), where the envelope/composition is addressed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Ajv from '../../node_modules/ajv/dist/2020.js';
import standaloneCode from '../../node_modules/ajv/dist/standalone/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const instanceDataDir = path.join(here, '..', 'generated', 'instance-data');
const uiSchemaDir = path.join(here, '..', 'generated', 'ui', 'schema');
const partsRoot = path.join(here, '..', 'parts');
const outDir = path.join(here, '..', 'generated', 'ui', 'validators');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

// The part roots validate a part slice; the admin section schemas validate their
// own slice. Each entry: { name (exported fn), schemaPath }.
const PART_ROOTS = ['II', 'III', 'IV', 'V'].map((roman) => ({
  name: `part${roman}`,
  schemaPath: path.join(uiSchemaDir, `part-${roman}.schema.json`),
}));

const ADMIN_SECTIONS = [
  ['partI', 'sectionA'], ['partI', 'sectionB'], ['partI', 'sectionC'],
  ['partII', 'sectionA'], ['partII', 'sectionB'],
  ['partVI', 'sectionA'],
].map(([dir, section]) => ({
  name: `${dir}_${section}`,
  schemaPath: path.join(partsRoot, dir, `${section}.schema.json`),
}));

/**
 * Build a single Ajv instance with every schema registered (by $id), ready for
 * standalone code generation. Returns { ajv, exports } where exports maps the
 * exported function name -> the schema $id to compile.
 */
export function buildAjv() {
  // No ajv-formats: the only format used is `date`, which the UI already enforces
  // via <input type="date">. Registering ajv-formats would make the standalone
  // code emit a runtime require() for the format implementations, which breaks in
  // an ESM module; omitting it leaves `format: "date"` as an inert annotation
  // (strict:false) while all structural/required/type/enum/if-then rules — the
  // ones that matter for client-side UX validation — are fully compiled.
  // `formats: { date: true }` registers `date` as an always-valid (no-op) format
  // so Ajv does not log "unknown format" for every date field at build time. It
  // emits NO runtime require (unlike ajv-formats, whose real validators do) — a
  // `true` format compiles to a constant pass — keeping the standalone module
  // self-contained. Date values are still enforced by <input type="date"> in the UI.
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    formats: { date: true },
    code: { source: true, esm: true },
  });

  // Register every per-criterion schema (the part roots $ref these by $id).
  for (const f of fs.readdirSync(instanceDataDir).filter((x) => x.endsWith('.schema.json'))) {
    ajv.addSchema(readJson(path.join(instanceDataDir, f)));
  }

  const exports = {};
  for (const { name, schemaPath } of [...PART_ROOTS, ...ADMIN_SECTIONS]) {
    const schema = readJson(schemaPath);
    ajv.addSchema(schema);
    exports[name] = schema['$id'];
  }
  return { ajv, exports };
}

// Inlined, ESM-safe replacements for the Ajv runtime helpers whose `.code`
// metadata hardcodes a CommonJS `require(...)` (which the standalone ESM emitter
// does not rewrite). Keyed by the exact require-expression Ajv emits. Each value
// is a self-contained function expression that is a faithful mirror of the
// corresponding node_modules/ajv/dist/runtime/*.js default export.
const AJV_RUNTIME_INLINES = {
  'require("ajv/dist/runtime/ucs2length").default':
    '(function ucs2length(str){const len=str.length;let length=0;let pos=0;let value;' +
    'while(pos<len){length++;value=str.charCodeAt(pos++);' +
    'if(value>=0xd800&&value<=0xdbff&&pos<len){value=str.charCodeAt(pos);' +
    'if((value&0xfc00)===0xdc00)pos++;}}return length;})',
};

/**
 * Rewrite any bare `require("ajv/dist/runtime/...")` the standalone ESM emitter
 * left behind into inlined function expressions, so the emitted module contains
 * no CommonJS `require`. Throws if an unknown runtime require is encountered, so
 * a future schema feature that pulls in a new helper fails the build loudly
 * instead of shipping a broken module.
 */
export function inlineAjvRuntimeRequires(src) {
  for (const [requireExpr, inline] of Object.entries(AJV_RUNTIME_INLINES)) {
    src = src.split(requireExpr).join(inline);
  }
  const leftover = src.match(/require\((["'])[^"')]+\1\)/);
  if (leftover) {
    throw new Error(
      `build-validators: emitted standalone module still contains an un-inlined ` +
        `runtime require: ${leftover[0]}. Add a faithful inline for it to ` +
        `AJV_RUNTIME_INLINES (mirror node_modules/ajv/dist/runtime/).`,
    );
  }
  return src;
}

/**
 * Generate the standalone ESM validator module. Returns the source string.
 * Deterministic: schemas registered in a fixed order.
 */
export function buildValidatorsSource() {
  const { ajv, exports } = buildAjv();
  // standaloneCode wants { exportedName: $id }.
  let src = standaloneCode(ajv, exports);

  // Ajv's standalone ESM emitter has one gap: a handful of its runtime helpers
  // hardcode a CommonJS `require(...)` string in their `.code` metadata, and the
  // ESM code path does not rewrite those into imports. In our schemas the only
  // one reached is the string-length helper `ucs2length` (pulled in by
  // `minLength`/`maxLength`). That leaves a bare `require("ajv/dist/runtime/
  // ucs2length").default` in otherwise-ESM output, which throws
  // `require is not defined in ES module scope` the moment the module loads —
  // in Node and in the browser alike. We inline the helper (it is tiny, pure,
  // and stable: counts UTF-16 code points, surrogate-pair aware) so the emitted
  // module has zero runtime `require`s and is self-contained. See
  // node_modules/ajv/dist/runtime/ucs2length.js for the source we mirror.
  src = inlineAjvRuntimeRequires(src);

  // standaloneCode emits CommonJS or ESM depending on `code.esm`; with esm:true
  // it emits `export const <name> = ...`. Prepend a provenance banner.
  const banner =
    '// GENERATED by model/compiler/build-validators.mjs — standalone Ajv validators\n' +
    '// for the composed instance-data schemas. Do not hand-edit; regenerate with\n' +
    '// `npm run model:compile`. Each export is a validate(data) function with a\n' +
    '// `.errors` array (Ajv error objects) populated on failure.\n';
  return banner + src;
}

/** Build + write the standalone validators module. */
export function buildValidators({ write = true } = {}) {
  const source = buildValidatorsSource();
  if (write) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.mjs'), source);
  }
  return { source, names: [...PART_ROOTS, ...ADMIN_SECTIONS].map((e) => e.name) };
}

export const validatorsOutPath = path.join(outDir, 'index.mjs');

// Run directly: node model/compiler/build-validators.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { names } = buildValidators({ write: true });
  console.log(`Generated ${names.length} standalone validators (${names.join(', ')}) under model/generated/ui/validators/index.mjs.`);
}
