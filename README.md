# Rotative Levitator / Soneto: rótenos

The bilingual reading edition of Pedro Poitevin’s combinatorial palindromic
sonnets. The author composed the lines and found every palindromic variation
by hand. The application combines that written repertoire in the manner of
Raymond Queneau’s *Cent mille milliards de poèmes*.

The reader uses a quiet, single-page layout with four stanzas. Selecting a line
changes its complement as well. Sequential reading, random selection, numbered
lookup and an optional letter-by-letter palindrome trace are available. The
original ten-million-sonnet numbering is preserved in each language.

## Published edition

- [English presentation](https://pedropoitevin.com/en/palindromes/rotative-levitator.html)
- [Spanish presentation](https://pedropoitevin.com/es/palindromos/diez-millones-de-sonetos-palindromicos.html)
- [Reader](https://pedropoitevin.com/rotative-levitator/)

Use `?lang=es&n=1` or `?lang=en&n=1` to select a language and sonnet.

## Development

The current application lives in `reader/`. It uses browser-native JavaScript
modules and has no runtime dependencies. Node.js 18 or newer runs these commands
without installing packages:

```sh
npm start       # http://localhost:8767 (override with PORT)
npm test        # numbering, complementary changes and palindrome checks
npm run build  # five static files in build/
```

The homepage deployment copies these same five files into its
`rotative-levitator/` directory. Keep that copy and `reader/` synchronized.
The existing `npm run deploy` command publishes `build/` to GitHub Pages and
requires the repository's `gh-pages` development dependency.

The former React interface remains in `src/` and `public/` for reference.
Its development commands are available as `legacy:start`, `legacy:build`
and `legacy:test`; they require the original dependencies. The default build
and development commands use the new reading edition.
