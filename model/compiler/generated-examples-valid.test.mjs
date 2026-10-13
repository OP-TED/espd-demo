// Safety net: EVERY generated example must validate against its generated
// schema. This is the whole-suite guard that was missing — it would have caught
// both the OT58 vacuous-ONFALSE-gate bug and the C25 both-directions-gated bug,
// neither of which any criterion-specific test exercised.
//
// It validates the COMMITTED artifacts under model/generated/, so a stale commit
// (schema regenerated without its example, or vice versa) also fails here.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const GEN = path.join(here, '..', 'generated', 'instance-data');

const schemaFiles = fs.readdirSync(GEN).filter(f => f.endsWith('.schema.json'));

test('there is at least one generated schema (guards the guard)', () => {
  assert.ok(schemaFiles.length > 0, 'no generated schemas found — did the build run?');
});

for (const file of schemaFiles) {
  const code = file.replace('.schema.json', '');
  test(`generated example for '${code}' validates against its generated schema`, async () => {
    const { default: Ajv } = await import('ajv/dist/2020.js');
    const schema = JSON.parse(fs.readFileSync(path.join(GEN, file), 'utf8'));
    const examplePath = path.join(GEN, `${code}.example.json`);
    assert.ok(fs.existsSync(examplePath), `missing generated example for ${code}`);
    const example = JSON.parse(fs.readFileSync(examplePath, 'utf8'));

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const ok = validate(example);
    assert.ok(ok, `example invalid:\n${JSON.stringify(validate.errors, null, 2)}`);
  });
}
