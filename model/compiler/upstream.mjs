// Where the PUBLISHED ESPD-EDM inputs are.
//
// This app no longer compiles the ESPD model itself. It consumes what ESPD-EDM
// publishes:
//   <root>/criterion/espd-edm.json   the EA structure (parts, sections, criteria)
//   <root>/model/                    the compiled, implementer-neutral model
//   <root>/codelists/*.gc            the shipped code lists
//
// <root> is the ESPD_EDM_ROOT environment variable, else the sibling checkout
// ../ESPD-EDM (resolved relative to this repository). Resolving this without a
// sibling-layout assumption is the cross-repo coupling still to be solved.

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
// model/compiler -> model -> app repo root -> workspace root
const workspaceRoot = path.resolve(here, '..', '..', '..');

/** The ESPD-EDM root (ESPD_EDM_ROOT, else the sibling ESPD-EDM checkout). */
export const edmRoot = () =>
  process.env.ESPD_EDM_ROOT ? path.resolve(process.env.ESPD_EDM_ROOT) : path.join(workspaceRoot, 'ESPD-EDM');

/** The published EA structure export. */
export const structurePath = () => path.join(edmRoot(), 'criterion', 'espd-edm.json');

/** The published model folder (compiled-model.json, instance-data/, ...). */
export const publishedDir = () => path.join(edmRoot(), 'model');

/** The shipped Genericode code lists. */
export const codelistsDir = () => path.join(edmRoot(), 'codelists');
