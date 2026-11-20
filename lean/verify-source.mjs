import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const sourceHashes = {
  'versos.mjs': '814bd0017a81d8ea307512e2185fb104ea1e3d8a24414a9fae37a725425c5bd5',
  'sonnets.mjs': '3e4fe815b39698c85af12fad909a6fb2f1f50d011fc06b017654efafc36ff29f',
};
const write = process.argv[2] === '--write';
const inputs = process.argv.slice(2);
assert.ok(inputs.length === 0 || (write && inputs.length === 1) || (!write && inputs.length === 2),
  'Usage: node verify-source.mjs [--write | path-to-versos.mjs path-to-sonnets.mjs]');

async function certifiedFile(file, candidate) {
  const local = await readFile(new URL('../reader/' + file, import.meta.url));
  assert.equal(createHash('sha256').update(local).digest('hex'), sourceHashes[file],
    file + ' differs from the certified edition');
  if (candidate) {
    assert.ok(local.equals(await readFile(candidate)), file + ' differs from the supplied file');
  }
  return local;
}
const [liveVerses, liveNumbering] = write ? [] : inputs;
const [verses] = await Promise.all([
  certifiedFile('versos.mjs', liveVerses),
  certifiedFile('sonnets.mjs', liveNumbering),
]);

const exported = verses.toString('utf8').match(/^export const repertoires = (\{[\s\S]*\});\s*$/m);
assert.ok(exported, 'Expected a JSON object exported as repertoires');
const repertoires = JSON.parse(exported[1]);
assert.deepEqual(Object.keys(repertoires).sort(), ['en', 'es']);
for (const rows of Object.values(repertoires)) {
  assert.ok(Array.isArray(rows) && rows.length === 14);
  for (const row of rows) {
    assert.ok(Array.isArray(row) && row.length === 10);
    for (const verse of row) {
      assert.equal(typeof verse, 'string');
      assert.equal(verse, verse.normalize('NFC'));
      assert.match(verse, /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ,.;:!?¡¿"'–—-]+$/u);
    }
  }
}

const leanChars = verse => '[' + Array.from(verse, char =>
  char === "'" ? "'\\''" : "'" + char + "'").join(', ') + ']';
function table(name, rows) {
  const groups = rows.slice(0, 7).map((row, group) => {
    const variants = row.map((verse, digit) =>
      '    (' + leanChars(verse) + ', ' + leanChars(rows[13 - group][digit]) + ')');
    return '  #v[\n' + variants.join(',\n') + '\n  ]';
  });
  return 'def ' + name + ' : VerseTable := #v[\n' + groups.join(',\n') + '\n]';
}
const generated = [
  '-- Generated from reader/versos.mjs by lean/verify-source.mjs.',
  'import Std',
  '',
  'namespace Sonetos',
  '',
  '/-- The seven groups of ten pairs, from the outer lines to the center. -/',
  'abbrev VerseTable := Vector (Vector (List Char × List Char) 10) 7',
  '',
  table('englishVerses', repertoires.en),
  '',
  table('spanishVerses', repertoires.es),
  '',
  'end Sonetos',
  '',
].join('\n');
const leanData = new URL('./Sonetos/Verses.lean', import.meta.url);
if (write) {
  await writeFile(leanData, generated);
} else {
  assert.equal(await readFile(leanData, 'utf8'), generated,
    'Lean verse data differs from the reader source');
  console.log('Verse data and numbering source verified for both languages.');
}
