import { repertoires } from './versos.mjs';

export const TOTAL = 10_000_000;
export function indicesFor(index) {
  if (!Number.isInteger(index) || index < 1 || index > TOTAL) throw new RangeError('Invalid sonnet index');
  // Preserve the original edition: the first line changes the units digit.
  return String(index - 1).padStart(7, '0').split('').reverse().map(Number);
}
export function indexOf(indices) {
  return 1 + indices.reduce((sum, digit, group) => sum + digit * 10 ** group, 0);
}
export function linesFor(language, index) {
  const digits = indicesFor(index);
  return repertoires[language].map((variants, line) => variants[digits[Math.min(line, 13 - line)]]);
}
export function cycleLine(index, line, step = 1) {
  if (!Number.isInteger(line) || line < 0 || line > 13) throw new RangeError('Invalid line');
  const digits = indicesFor(index);
  const group = Math.min(line, 13 - line);
  digits[group] = (digits[group] + step + 10) % 10;
  return indexOf(digits);
}
