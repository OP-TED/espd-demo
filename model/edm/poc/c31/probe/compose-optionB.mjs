import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Option B demo: compose encoding-profile (kind->element) + value-type registry
// (leaf value) + codelist-attributes (fixed attrs) into an explicit request spec
// for ONE representative branch of C31, so we can see how it reads.

const here = path.dirname(fileURLToPath(import.meta.url));
const profile = JSON.parse(fs.readFileSync(path.join(here, 'encoding-profile.json'), 'utf8')).kinds;
const clAttrs = JSON.parse(fs.readFileSync(path.join(here, 'codelist-attributes.json'), 'utf8')).codelists;
const vt = JSON.parse(fs.readFileSync(path.resolve(here, '..', 'value-types.json'), 'utf8')).valueTypes;

const kindOf = { criterion: 'criterion', group: 'group', subgroup: 'subgroup', leaf: 'leaf' };

function attrs(codelist) {
  return codelist && clAttrs[codelist] ? { attributes: clAttrs[codelist] } : {};
}

// encode one structural element given its kind + facts
function encode(kind, facts) {
  let spec = profile[kind];
  if (spec.sameAs) spec = profile[spec.sameAs];
  const children = [];
  for (const c of spec.children) {
    if (c.valueBinding === 'value-type-registry') {
      const b = vt[facts.valueType]?.requestXml;
      if (b) children.push({ element: b.element, from: facts.instancePath, ...(b.attributes ? { attributes: Object.keys(b.attributes) } : {}) });
      continue;
    }
    let text = c.fromCore ? facts[c.fromCore] : undefined;
    if (text !== undefined && c.map) text = c.map[text] ?? text;
    children.push({ element: c.element, ...(c.fromCore ? { fromCore: c.fromCore, text } : {}), ...attrs(c.codelist) });
  }
  return { element: spec.element, children };
}

// one representative slice of C31: criterion -> group -> leaf(minimumAmount)
const demo = {
  criterion: encode('criterion', { uuid: 'd3dfb714-f558-4512-bbc5-e456fa2339de', code: 'slc-stand-to-spec-avg', name: 'Specific average yearly turnover', description: 'A specific average yearly turnover...' }),
  group: encode('group', { requestpath: 'C31_slc-stand-to-spec-avg/RG1', condition: 'always' }),
  minimumAmountLeaf: encode('leaf', { requestpath: 'C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3', kind: 'REQUIREMENT', valueType: 'MINIMUM_AMOUNT', name: null, description: 'Minimum amount requirement', instancePath: 'partIV...requirement.minimumAmount' })
};

fs.writeFileSync(path.join(here, 'out', 'optionB-demo.json'), JSON.stringify(demo, null, 2) + '\n');
process.stderr.write('wrote out/optionB-demo.json\n');
