# Mathematical Proof

[ref](https://en.wikipedia.org/wiki/Mathematical_proof#Nature_and_purpose)

- inferential argument showing that stated assumptions logically guarantee conclusion
- can only use theorems, axioms, and accepted rules of inference
- exhaustive deductive reasoning as opposed to:
  - empirical arguments
  - non-exhaustive inductive reasoning
- methods
  - direct proof
    - ex: sum of two even integers is always even 
  - proof by mathematical induction
    - a method of deduction, not a form of inductive reasoning
    - base case is proved + induction rule that implies the next case
    - generally start with N as all natural numbers and extend beyond
  - proof by contraposition
    - if p then q by establishing logically equivalent contrapositive statement: if not q then not p
      - ex: Suppose x is not even. Then x is odd. The product of two odd numbers is odd, hence x^2 = x * x is odd. Thus x^2 is not even. Thus, if x^2 is even, the supposition must be false, so x has to be even.
  - proof by contradiction
    - reductio ad absurdum
    - some statement is assumed to be true, but a logical contradiction occurs, hence statement is false
  - proof by construction
    - proof by example, explicit example
  - proof by exhaustion
    - dividing conclusion into a finite number of cases and proving each one separately
  - probabilistic proof
    - proving that there is a non-zero probability that a chosen candidate will have the desired property
    - does not mean that proof is probably true but that there is a non-zero probability of something to be true
  - combinatorial proof
    - equivalence of different expressions by showing that they count the same object in different ways
  - nonconstructive proof
    - proving that a mathematical object exists without explaining how such an object are to be found
  - statistical proofs in pure maths
    - more for cryptography
  - computer-assisted proofs
- conclusion is often Q.E.D.
  - quod erat demonstrandum