import { TOTAL, linesFor, cycleLine } from './sonnets.mjs';

const params = new URLSearchParams(location.search);
const language = params.get('lang') === 'es' || params.has('es') ? 'es' : 'en';
const copy = {
  en: {
    title: 'Rotative Levitator', collection: 'Ten million palindromic sonnets',
    previous: 'Previous sonnet', next: 'Next sonnet', number: 'Sonnet', random: 'At random',
    go: 'Find a sonnet', play: 'Trace the palindrome', pause: 'Stop tracing', about: 'About this poem',
    open: 'Open', hint: 'From 1 to 10,000,000', error: 'Enter a number from 1 to 10,000,000.',
    invitation: 'Touch a line; its complement changes with it.',
    instructions: 'Each line is a button. Activate it to change that line and its complement.',
    construction: 'Pedro Poitevin composed the lines and found all their palindromic variations by hand. Seven pairs of lines, ten possibilities for each pair: ten million sonnets. The application combines this written repertoire, in the manner of Raymond Queneau’s Cent mille milliards de poèmes.',
    reading: 'Each sonnet reads the same forwards and backwards, letter by letter, ignoring spaces and punctuation. Change a line and its complement changes with it; the poem keeps its symmetry.',
    controls: 'The number beneath the poem identifies this combination. Use the arrows to read in sequence, or open a sonnet at random. After selecting a line, use the up and down keys to explore its variations.',
    first: 'The first sonnet', last: 'The last sonnet', other: 'Leer en español', otherLang: 'es',
    folio: 'Read another sonnet', tools: 'Reading options', line: 'Line', change: 'Change this line and its complement',
  },
  es: {
    title: 'Soneto: rótenos', collection: 'Diez millones de sonetos palindrómicos',
    previous: 'Soneto anterior', next: 'Soneto siguiente', number: 'Soneto', random: 'Al azar',
    go: 'Buscar un soneto', play: 'Recorrer el palíndromo', pause: 'Detener el recorrido', about: 'Sobre este poema',
    open: 'Abrir', hint: 'De 1 a 10,000,000', error: 'Escribe un número entre 1 y 10,000,000.',
    invitation: 'Toca un verso; su complemento cambia con él.',
    instructions: 'Cada verso es un botón. Al activarlo cambian ese verso y su complemento.',
    construction: 'Pedro Poitevin compuso los versos y encontró todas sus variantes palindrómicas a mano. Siete pares de versos, diez posibilidades para cada par: diez millones de sonetos. La aplicación combina ese repertorio escrito, a la manera de los Cent mille milliards de poèmes de Raymond Queneau.',
    reading: 'Cada soneto se lee igual de principio a fin que de fin a principio, letra a letra, prescindiendo de espacios, signos y tildes. Al cambiar un verso, cambia también su complemento; el poema conserva su simetría.',
    controls: 'El número al pie identifica esta combinación. Las flechas permiten leer en secuencia; también puedes abrir un soneto al azar. Tras seleccionar un verso, las flechas arriba y abajo recorren sus variantes.',
    first: 'El primer soneto', last: 'El último soneto', other: 'Read in English', otherLang: 'en',
    folio: 'Leer otro soneto', tools: 'Opciones de lectura', line: 'Verso', change: 'Cambiar este verso y su complemento',
  },
}[language];
const $ = id => document.getElementById(id);
const format = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
let index = 1;
let tracing = false;
let timer;
let lit = [];
let letters = [];
let motions = [];
let currentLines = [];
let hoveredPair = null;
let focusedPair = null;
const lineButtons = [];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.documentElement.lang = language;
document.title = `${copy.title} — Pedro Poitevin`;
for (const [id, value] of Object.entries({
  title: copy.title, collection: copy.collection, random: copy.random,
  'goto-toggle': copy.go, animation: copy.play, 'about-toggle': copy.about,
  'input-label': copy.number, open: copy.open, 'number-hint': copy.hint,
  invitation: copy.invitation, 'line-instructions': copy.instructions,
  'about-construction': copy.construction, 'about-reading': copy.reading,
  'about-controls': copy.controls, first: copy.first, last: copy.last,
})) $(id).textContent = value;
$('previous').setAttribute('aria-label', copy.previous);
$('next').setAttribute('aria-label', copy.next);
$('folio').setAttribute('aria-label', copy.folio);
$('tools').setAttribute('aria-label', copy.tools);
$('other-language').textContent = copy.other;
$('other-language').lang = copy.otherLang;

function showPair() {
  const pair = hoveredPair ?? focusedPair;
  lineButtons.forEach((button, line) => button.classList.toggle('is-paired', !tracing && pair !== null && Math.min(line, 13 - line) === pair));
}
function stopTrace() {
  clearTimeout(timer);
  lit.forEach(el => el.classList.remove('is-lit'));
  lit = [];
}
function startTrace() {
  stopTrace();
  if (!tracing) return;
  let pair = 0;
  const pairs = Math.ceil(letters.length / 2);
  function tick() {
    lit.forEach(el => el.classList.remove('is-lit'));
    lit = [];
    if (pair >= pairs) {
      tracing = false;
      $('animation').textContent = copy.play;
      $('animation').setAttribute('aria-pressed', 'false');
      showPair();
      return;
    }
    lit = [...new Set([letters[pair], letters[letters.length - 1 - pair]])];
    lit.forEach(el => el.classList.add('is-lit'));
    pair++;
    timer = setTimeout(tick, 140 + 130 * pair / pairs);
  }
  timer = setTimeout(tick, 220);
}
function renderLine(button, text, line) {
  button.replaceChildren();
  button.setAttribute('aria-label', `${copy.line} ${line + 1}: ${text} ${copy.change}.`);
  for (const char of text) {
    const span = document.createElement('span');
    span.textContent = char;
    span.setAttribute('aria-hidden', 'true');
    if (/\p{L}/u.test(char)) span.className = 'letter';
    button.append(span);
  }
}
for (const [start, end] of [[0, 4], [4, 8], [8, 11], [11, 14]]) {
  const stanza = document.createElement('div');
  stanza.className = 'stanza';
  for (let line = start; line < end; line++) {
    const p = document.createElement('p');
    p.className = 'verse';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'verse-button';
    const group = Math.min(line, 13 - line);
    button.addEventListener('click', () => openSonnet(cycleLine(index, line)));
    button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hoveredPair = group; showPair(); } });
    button.addEventListener('pointerleave', () => { hoveredPair = null; showPair(); });
    button.addEventListener('focus', () => { focusedPair = group; showPair(); });
    button.addEventListener('blur', () => { focusedPair = null; showPair(); });
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        openSonnet(cycleLine(index, line, event.key === 'ArrowUp' ? -1 : 1));
      }
    });
    lineButtons.push(button);
    p.append(button);
    stanza.append(p);
  }
  $('poem').append(stanza);
}

function openSonnet(target, animate = true) {
  if (!Number.isInteger(target) || target < 1 || target > TOTAL) return;
  motions.forEach(motion => motion.cancel());
  motions = [];
  stopTrace();
  index = target;
  const next = linesFor(language, index);
  next.forEach((text, line) => {
    if (text === currentLines[line]) return;
    renderLine(lineButtons[line], text, line);
    if (animate && !reducedMotion.matches) {
      motions.push(lineButtons[line].animate([{ opacity: .35 }, { opacity: 1 }], { duration: 380, easing: 'ease-out' }));
    }
  });
  currentLines = next;
  letters = [...$('poem').querySelectorAll('.letter')];
  $('number').textContent = format(index);
  $('number').setAttribute('aria-label', `${copy.number} ${format(index)}`);
  $('previous').disabled = index === 1;
  $('next').disabled = index === TOTAL;
  const url = new URL(location.href);
  url.searchParams.delete('es');
  url.searchParams.set('lang', language);
  url.searchParams.set('n', String(index));
  history.replaceState(null, '', url);
  const other = new URL(url);
  other.searchParams.set('lang', copy.otherLang);
  $('other-language').href = other.href;
  if (animate) $('announcement').textContent = `${copy.number} ${format(index)}.`;
  showPair();
  startTrace();
}
$('previous').addEventListener('click', () => openSonnet(index - 1));
$('next').addEventListener('click', () => openSonnet(index + 1));
$('random').addEventListener('click', () => openSonnet(1 + Math.floor(Math.random() * TOTAL)));
$('first').addEventListener('click', () => openSonnet(1));
$('last').addEventListener('click', () => openSonnet(TOTAL));
$('animation').addEventListener('click', () => {
  tracing = !tracing;
  $('animation').textContent = tracing ? copy.pause : copy.play;
  $('animation').setAttribute('aria-pressed', String(tracing));
  showPair();
  startTrace();
});
function togglePanel(name) {
  const opening = $(name + '-panel').hidden;
  for (const other of ['goto', 'about']) {
    $(other + '-panel').hidden = true;
    $(other + '-toggle').setAttribute('aria-expanded', 'false');
  }
  $(name + '-panel').hidden = !opening;
  $(name + '-toggle').setAttribute('aria-expanded', String(opening));
  if (opening && name === 'goto') $('sonnet-number').focus();
}
$('goto-toggle').addEventListener('click', () => togglePanel('goto'));
$('about-toggle').addEventListener('click', () => togglePanel('about'));
$('goto-panel').addEventListener('submit', event => {
  event.preventDefault();
  const raw = $('sonnet-number').value.trim();
  const target = Number(raw.replace(/[.,\s]/g, ''));
  if (!/^[\d.,\s]+$/.test(raw) || !Number.isInteger(target) || target < 1 || target > TOTAL) {
    $('number-error').textContent = copy.error;
    $('sonnet-number').setAttribute('aria-invalid', 'true');
    return;
  }
  $('number-error').textContent = '';
  $('sonnet-number').removeAttribute('aria-invalid');
  openSonnet(target);
  togglePanel('goto');
  $('goto-toggle').focus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    for (const name of ['goto', 'about']) if (!$(name + '-panel').hidden) { togglePanel(name); $(name + '-toggle').focus(); }
  }
  if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); openSonnet(index - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); openSonnet(index + 1); }
});
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) motions.forEach(motion => motion.cancel()); });
const initial = Number(params.get('n') || 1);
openSonnet(Number.isInteger(initial) && initial >= 1 && initial <= TOTAL ? initial : 1, false);
