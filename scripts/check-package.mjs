/** Checks packed React 18/19 ESM, CommonJS, SSR, documentation, and NodeNext declarations. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const npm = process.env.npm_execpath;
assert(npm?.endsWith('npm-cli.js'), 'Run through npm run check:package');
const directory = mkdtempSync(join(tmpdir(), 'react-veil-'));
const run = (args, cwd) => execFileSync(process.execPath, [npm, ...args], { cwd, encoding: 'utf8', timeout: 120_000 });
try {
  const [packed] = Object.values(JSON.parse(run(['pack', '--workspace=react-veil', '--ignore-scripts', '--json', '--pack-destination', directory], root)));
  for (const file of ['CHANGELOG.md', 'CODE_OF_CONDUCT.md', 'CONTRIBUTING.md', 'LICENSE', 'README.md', 'SECURITY.md']) assert(packed.files.some(entry => entry.path === file));
  for (const major of [18, 19]) {
    const cwd = join(directory, `react-${major}`);
    mkdirSync(cwd);
    writeFileSync(join(cwd, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
    run(['install', '--no-fund', '--no-audit', join(directory, packed.filename), `react@${major}`, `react-dom@${major}`, 'typescript@7.0.2', `@types/react@${major}`, `@types/react-dom@${major}`], cwd);
    const declaration = "import { createElement } from 'react'; import { ArchClip } from 'react-veil'; createElement(ArchClip, { children: 'Example' });";
    for (const extension of ['mts', 'cts']) writeFileSync(join(cwd, `consumer.${extension}`), declaration);
    writeFileSync(join(cwd, 'tsconfig.json'), JSON.stringify({ compilerOptions: { module: 'NodeNext', moduleResolution: 'NodeNext', target: 'ES2022', strict: true, noEmit: true, types: [] }, include: ['consumer.*ts'] }));
    execFileSync(process.execPath, [join(cwd, 'node_modules/typescript/bin/tsc'), '-p', cwd], { cwd, stdio: 'inherit' });
    writeFileSync(join(cwd, 'probe.mjs'), `import assert from 'node:assert/strict'; import {createRequire} from 'node:module'; import * as esm from 'react-veil'; const require = createRequire(import.meta.url); const React = require('react'); const {renderToStaticMarkup} = require('react-dom/server'); for (const api of [esm, require('react-veil')]) { const html = renderToStaticMarkup(React.createElement(React.Fragment, null, React.createElement(api.ArchClip, null, 'First'), React.createElement(api.ArchClip, null, 'Second'))); const ids = [...html.matchAll(/<clipPath[^>]+id="([^"]+)"/g)].map(match => match[1]); assert.equal(ids.length, 2); assert.equal(new Set(ids).size, 2); assert(html.includes('First')); }`);
    execFileSync(process.execPath, ['probe.mjs'], { cwd, stdio: 'inherit' });
    console.log(`React ${major}: packed ESM/CJS, SSR identifiers, and NodeNext declarations passed`);
  }
} finally {
  assert.equal(dirname(directory), resolve(tmpdir()));
  assert(directory.startsWith(join(resolve(tmpdir()), 'react-veil-')));
  rmSync(directory, { recursive: true, force: true });
}
