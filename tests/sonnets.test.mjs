import test from 'node:test';
import assert from 'node:assert/strict';
import { TOTAL, indicesFor, indexOf, linesFor, cycleLine } from '../reader/sonnets.mjs';

test('the original numbering starts with the first pair in the units position', () => {
  assert.deepEqual(indicesFor(1), [0, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(indicesFor(2), [1, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(indicesFor(TOTAL), [9, 9, 9, 9, 9, 9, 9]);
  for (const n of [1, 2, 11, 1234567, 9010000, TOTAL]) assert.equal(indexOf(indicesFor(n)), n);
});

test('changing a line changes only that line and its complement, in either language', () => {
  for (const language of ['es', 'en']) for (let line = 0; line < 14; line++) {
    const initial = linesFor(language, 1);
    const next = cycleLine(1, line);
    const changed = linesFor(language, next);
    for (let i = 0; i < 14; i++) {
      if (i !== line && i !== 13 - line) assert.equal(changed[i], initial[i]);
    }
    assert.equal(cycleLine(next, line, -1), 1);
  }
});

test('representative combinations retain their palindrome in both languages', () => {
  for (const language of ['es', 'en']) for (const n of [1, 2, 1234567, 9010000, TOTAL]) {
    const lines = linesFor(language, n);
    assert.equal(lines.length, 14);
    const letters = lines.join('').normalize('NFD').replace(/[^a-z]/gi, '').toLowerCase();
    assert.equal(letters, [...letters].reverse().join(''));
  }
});

test('indices outside the edition are rejected', () => {
  for (const n of [0, TOTAL + 1, 1.5, NaN]) assert.throws(() => indicesFor(n), RangeError);
});
