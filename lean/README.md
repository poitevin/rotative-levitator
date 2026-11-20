# Lean certificates for Rotative Levitator and Soneto: Rótenos

[Sonetos.lean](Sonetos.lean) proves two claims for each of Pedro Poitevin’s
collections. Every numbered sonnet is a palindrome, and equality of its fourteen
written lines determines its number. Each collection has ten million numbers,
so it has ten million distinct sonnets as written.

| Collection | Palindrome theorem | Distinctness theorem |
| --- | --- | --- |
| Rotative Levitator | `RotativeLevitator.palindromic` | `RotativeLevitator.distinct_as_written` |
| Soneto: Rótenos | `SonetoRotenos.palindromic` | `SonetoRotenos.distinct_as_written` |

Palindrome comparison concatenates the letters and ignores case, vowel accents,
diaereses, spaces and punctuation. The letter ñ remains distinct from n.
Written equality compares the ordered list of fourteen lines character by
character, including spaces, punctuation, case and accents.

The reader displays numbers starting at 1. Lean starts at 0, so each digit
of the Lean index selects a pair of lines, starting with the units digit for
the outermost pair. Lean checks the overlaps between neighboring pairs and
the center in both languages. It also checks that each position has ten
distinct pairs as written, so the written sonnet recovers all seven digits.

## Reproduce the checks

Run these commands from the repository root with Node.js and Elan installed. [Elan](https://github.com/leanprover/elan)

```sh
cd lean
node verify-source.mjs
lake build --wfail
lake env leanchecker --fresh Sonetos
```

The pinned toolchain uses Lean 4.29.1. The finite data checks use
`decide +kernel` and have empty axiom lists. The four theorems depend only
on `propext` (propositional extensionality). The build checks those axiom lists,
and the last command replays the proofs in a fresh kernel environment.

The source verifier pins the hashes of the verse and numbering files and
checks that the generated Lean data preserves the exact verses and variant
order. To compare with the files served by the live reader, pass their
downloaded paths in that order. [Verse source](../reader/versos.mjs)
[Numbering source](../reader/sonnets.mjs)

```sh
curl -fLsS https://pedropoitevin.com/rotative-levitator/versos.mjs -o /tmp/sonetos-versos.mjs
curl -fLsS https://pedropoitevin.com/rotative-levitator/sonnets.mjs -o /tmp/sonetos-numbering.mjs
node verify-source.mjs /tmp/sonetos-versos.mjs /tmp/sonetos-numbering.mjs
```
