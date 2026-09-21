import { cp, mkdir, rm } from 'node:fs/promises';
const output = new URL('../build/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'lectura.css', 'lectura.js', 'sonnets.mjs', 'versos.mjs']) {
  await cp(new URL(`../reader/${name}`, import.meta.url), new URL(name, output));
}
console.log('Built the bilingual reading edition into build/.');
