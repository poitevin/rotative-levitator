import Sonetos.Verses

set_option autoImplicit false

namespace Sonetos

private def normalizeLetter (c : Char) : Char :=
  match c with
  | 'á' | 'Á' => 'a'
  | 'é' | 'É' => 'e'
  | 'í' | 'Í' => 'i'
  | 'ó' | 'Ó' => 'o'
  | 'ú' | 'Ú' | 'ü' | 'Ü' => 'u'
  | 'Ñ' => 'ñ'
  | letter =>
    if letter.isUpper then Char.ofNat (letter.toNat + ('a'.toNat - 'A'.toNat)) else letter

/-- Letters for palindrome comparison, ignoring case, vowel diacritics, spaces and punctuation. -/
def normalize (verse : List Char) : List Char :=
  (verse.map normalizeLetter).filter fun c => c.isLower || c == 'ñ'

private def vectorAt {α : Type} {n : Nat} (data : Vector α n) (i : Fin n) : α :=
  data.toArray[i.val]'(data.size_toArray.symm ▸ i.isLt)

private def firstIndex (n : Nat) : Fin (n + 1) := ⟨0, Nat.zero_lt_succ n⟩

private def allFin {n : Nat} (p : Fin n → Bool) : Bool :=
  match n with
  | 0 => true
  | n + 1 => p (firstIndex n) && allFin (fun i : Fin n => p i.succ)

private theorem allFin_sound {n : Nat} {p : Fin n → Bool}
    (h : allFin p = true) (i : Fin n) : p i = true := by
  induction n with
  | zero => exact Fin.elim0 i
  | succ n ih =>
    have both := Bool.and_eq_true_iff.mp h
    exact Fin.cases both.1 (fun j => ih both.2 j) i

-- These pointwise list proofs avoid functional extensionality.
private theorem ofFn_cons {n : Nat} {α : Type} (f : Fin (n + 1) → α) :
    List.ofFn f = f 0 :: List.ofFn (fun i => f i.succ) := by
  rw [List.ofFn, Fin.foldr_succ]
  rfl

private theorem map_ofFn {n : Nat} {α β : Type} (f : Fin n → α) (g : α → β) :
    (List.ofFn f).map g = List.ofFn (fun i => g (f i)) := by
  induction n with
  | zero => simp only [List.ofFn_zero, List.map_nil]
  | succ n ih => rw [ofFn_cons f, List.map_cons, ofFn_cons (fun i => g (f i)), ih]

private theorem ofFn_injective {n : Nat} {α : Type} {f g : Fin n → α}
    (h : List.ofFn f = List.ofFn g) (i : Fin n) : f i = g i := by
  have h' := congrArg (fun (xs : List α) => xs[i.val]?) h
  simpa [List.getElem?_eq_getElem, i.isLt] using h'

private def decimalDigits (places number : Nat) : Fin places → Fin 10 :=
  match places with
  | 0 => Fin.elim0
  | n + 1 => Fin.cases ⟨number % 10, Nat.mod_lt _ (by decide)⟩ (decimalDigits n (number / 10))

private theorem decimalDigits_injective {n a b : Nat} (ha : a < 10 ^ n) (hb : b < 10 ^ n)
    (h : ∀ i, decimalDigits n a i = decimalDigits n b i) : a = b := by
  induction n generalizing a b with
  | zero => exact (Nat.lt_one_iff.mp ha).trans (Nat.lt_one_iff.mp hb).symm
  | succ n ih =>
    rw [Nat.pow_succ] at ha hb
    have ha' := (Nat.div_lt_iff_lt_mul (by decide : 0 < 10)).2 ha
    have hb' := (Nat.div_lt_iff_lt_mul (by decide : 0 < 10)).2 hb
    have h₀ := congrArg Fin.val (h 0)
    change a % 10 = b % 10 at h₀
    have h₁ := ih ha' hb' (fun i => h i.succ)
    calc
      a = a % 10 + 10 * (a / 10) := (Nat.mod_add_div a 10).symm
      _ = b % 10 + 10 * (b / 10) := by rw [h₀, h₁]
      _ = b := Nat.mod_add_div b 10

private theorem stitch {n : Nat} {α : Type} (left right : Fin n → List α)
    (boundary : Fin (n + 1) → List α)
    (step : ∀ i, left i ++ boundary i.succ = boundary i.castSucc ++ right i) :
    (List.ofFn left).flatten ++ boundary (Fin.last n) =
      boundary 0 ++ (List.ofFn right).flatten := by
  induction n with
  | zero => simp [Fin.last]
  | succ n ih =>
    simp only [ofFn_cons, List.flatten_cons]
    rw [show Fin.last (n + 1) = (Fin.last n).succ from rfl]
    rw [List.append_assoc, ih (fun i => left i.succ) (fun i => right i.succ)
      (fun i => boundary i.succ) (fun i => step i.succ)]
    rw [← List.append_assoc, step 0, List.append_assoc]
    simp

inductive Language where
  | english
  | spanish

private def versePair (language : Language) (group : Fin 7) (digit : Fin 10) :
    List Char × List Char :=
  let table := match language with
    | .english => englishVerses
    | .spanish => spanishVerses
  vectorAt (vectorAt table group) digit

def sonnetCount : Nat := 10 ^ 7

/-- An index starts at zero. The reader displays one plus its value. -/
abbrev SonnetIndex := Fin sonnetCount

private def pairAt (language : Language) (index : SonnetIndex) (group : Fin 7) :
    List Char × List Char :=
  versePair language group (decimalDigits 7 index.val group)

/-- The fourteen lines exactly as written and in reading order. -/
def sonnetAt (language : Language) (index : SonnetIndex) : List (List Char) :=
  (List.ofFn fun group => (pairAt language index group).1) ++
    (List.ofFn fun group => (pairAt language index group).2).reverse

/-- The concatenated letters used to check whether the sonnet is a palindrome. -/
def sonnetLetters (language : Language) (index : SonnetIndex) : List Char :=
  ((sonnetAt language index).map normalize).flatten

-- Characters that remain on the reversed right side after each group is matched.
private def carry (language : Language) (boundary : Fin 8) : List Char :=
  match language with
  | .english =>
    match boundary.val with
    | 1 => ['a', 'f', 'a']
    | 2 => ['a', 's', 's', 'a']
    | 3 => ['r', 'i', 's']
    | 4 => ['b', 'e', 'r', 'y', 'l', 'o', 'n']
    | 5 => ['l', 'a']
    | 6 => ['a', 'g', 'i', 'f']
    | 7 => ['n', 'o', 'o', 'n']
    | _ => []
  | .spanish =>
    match boundary.val with
    | 1 | 5 => ['y']
    | 2 => ['f']
    | 3 => ['r', 'e', 'v']
    | 4 => ['l', 'a', 'y']
    | 6 => ['a']
    | _ => []

private theorem checkedMirrors (language : Language) :
    allFin (fun g => allFin (fun d =>
      normalize (versePair language g d).1 ++ carry language g.succ ==
        carry language g.castSucc ++ (normalize (versePair language g d).2).reverse)) = true := by
  cases language <;> decide +kernel

private theorem checkedCenters (language : Language) :
    (carry language (Fin.last 7)).reverse = carry language (Fin.last 7) := by
  cases language <;> decide +kernel

private theorem mirror (language : Language) (group : Fin 7) (digit : Fin 10) :
    normalize (versePair language group digit).1 ++ carry language group.succ =
      carry language group.castSucc ++ (normalize (versePair language group digit).2).reverse :=
  eq_of_beq (allFin_sound (allFin_sound (checkedMirrors language) group) digit)

private theorem palindrome_of_mirror (left right center : List Char)
    (h : left ++ center = right.reverse) (hc : center.reverse = center) :
    (left ++ right).reverse = left ++ right := by
  have right_eq : right = (left ++ center).reverse :=
    (List.reverse_reverse right).symm.trans (congrArg List.reverse h.symm)
  rw [right_eq]
  simp only [List.reverse_append, List.reverse_reverse, hc, List.append_assoc]

private theorem every_sonnet_is_palindromic (language : Language) (index : SonnetIndex) :
    (sonnetLetters language index).reverse = sonnetLetters language index := by
  let left := fun g => normalize (pairAt language index g).1
  let right := fun g => normalize (pairAt language index g).2
  unfold sonnetLetters sonnetAt
  simp only [List.map_append, List.map_reverse, List.flatten_append, map_ofFn]
  change ((List.ofFn left).flatten ++ (List.ofFn right).reverse.flatten).reverse =
    (List.ofFn left).flatten ++ (List.ofFn right).reverse.flatten
  apply palindrome_of_mirror _ _ _ ?_ (checkedCenters language)
  rw [List.reverse_flatten, List.map_reverse, List.reverse_reverse, map_ofFn]
  have h := stitch left (fun g => (right g).reverse) (carry language)
    (fun g => mirror language g (decimalDigits 7 index.val g))
  have start : carry language 0 = [] := by cases language <;> rfl
  rw [start, List.nil_append] at h
  exact h

private theorem checkedWrittenPairs (language : Language) :
    allFin (fun g => allFin (fun a => allFin (fun b =>
      a == b || versePair language g a != versePair language g b))) = true := by
  cases language <;> decide +kernel

private theorem writtenPair_injective (language : Language) (group : Fin 7) (a b : Fin 10)
    (h : versePair language group a = versePair language group b) : a = b := by
  have checked := allFin_sound (allFin_sound (allFin_sound (checkedWrittenPairs language) group) a) b
  simpa [h] using checked

private theorem sonnets_are_distinct (language : Language) (i j : SonnetIndex)
    (h : sonnetAt language i = sonnetAt language j) : i = j := by
  unfold sonnetAt at h
  obtain ⟨first, second⟩ := List.append_inj h (by simp only [List.length_ofFn])
  have second := List.reverse_inj.mp second
  apply Fin.ext
  apply decimalDigits_injective i.isLt j.isLt
  intro group
  apply writtenPair_injective language group
  exact Prod.ext (ofFn_injective first group) (ofFn_injective second group)

theorem number_of_sonnets : sonnetCount = 10_000_000 := rfl

theorem fourteen_lines (language : Language) (index : SonnetIndex) :
    (sonnetAt language index).length = 14 := by
  simp only [sonnetAt, List.length_append, List.length_reverse, List.length_ofFn]

namespace RotativeLevitator

/-- Every numbered English sonnet is a palindrome under letter normalization. -/
theorem palindromic (index : SonnetIndex) :
    (sonnetLetters .english index).reverse = sonnetLetters .english index :=
  every_sonnet_is_palindromic .english index

/-- Equality of all fourteen written English lines implies equality of sonnet indices. -/
theorem distinct_as_written (i j : SonnetIndex)
    (h : sonnetAt .english i = sonnetAt .english j) : i = j :=
  sonnets_are_distinct .english i j h

end RotativeLevitator

namespace SonetoRotenos

/-- Every numbered Spanish sonnet is a palindrome under letter normalization. -/
theorem palindromic (index : SonnetIndex) :
    (sonnetLetters .spanish index).reverse = sonnetLetters .spanish index :=
  every_sonnet_is_palindromic .spanish index

/-- Equality of all fourteen written Spanish lines implies equality of sonnet indices. -/
theorem distinct_as_written (i j : SonnetIndex)
    (h : sonnetAt .spanish i = sonnetAt .spanish j) : i = j :=
  sonnets_are_distinct .spanish i j h

end SonetoRotenos

/-- info: '_private.Sonetos.0.Sonetos.checkedMirrors' does not depend on any axioms -/
#guard_msgs in #print axioms checkedMirrors

/-- info: '_private.Sonetos.0.Sonetos.checkedCenters' does not depend on any axioms -/
#guard_msgs in #print axioms checkedCenters

/-- info: '_private.Sonetos.0.Sonetos.checkedWrittenPairs' does not depend on any axioms -/
#guard_msgs in #print axioms checkedWrittenPairs

/-- info: 'Sonetos.RotativeLevitator.palindromic' depends on axioms: [propext] -/
#guard_msgs in #print axioms RotativeLevitator.palindromic

/-- info: 'Sonetos.RotativeLevitator.distinct_as_written' depends on axioms: [propext] -/
#guard_msgs in #print axioms RotativeLevitator.distinct_as_written

/-- info: 'Sonetos.SonetoRotenos.palindromic' depends on axioms: [propext] -/
#guard_msgs in #print axioms SonetoRotenos.palindromic

/-- info: 'Sonetos.SonetoRotenos.distinct_as_written' depends on axioms: [propext] -/
#guard_msgs in #print axioms SonetoRotenos.distinct_as_written

end Sonetos
