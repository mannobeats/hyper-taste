---
name: review
description: Review code before it merges, or audit a whole codebase - correctness, security, data safety, performance, tests, duplication and architecture - and report findings with a concrete failing case and the smallest fix. Use when asked to review a diff, PR, branch or file, audit a repo, check code an agent wrote, or at the end of a milestone.
---

# Review

The outcome: the code that merges is correct, safe and part of one coherent system, and every
finding comes with proof. A review that lists taste and vague worries teaches nothing.

## 1. Map first

- What is it supposed to do? Read the story, the brief or the PR description, then the diff.
- For an audit: the README, entry points, config, tests, and the expected load (one person or
  many users and processes at once). Go deep where a mistake costs the most (input, money, auth,
  data writes, background jobs), and say which parts you did not read.
- Trace the main flows end to end: where data comes in, what is stored, what goes out.

## 2. Look for, in this order

1. **Correctness:** wrong results, crashes, missed edge cases (empty, zero, last item, rounding,
   time zones, concurrent edits), callers that disagree with what a function returns, the same
   rule applied differently in two places, acceptance criteria not met.
2. **Security:** unvalidated input at trust boundaries, injection, broken auth or access checks,
   secrets in code or logs, unsafe defaults, data exposed to the wrong user, risky dependencies.
3. **Data safety:** swallowed errors, writes in the wrong order, missing transactions, migrations
   that lose data, no way to undo a destructive action.
4. **Scale:** check-then-write races, a query per item, lists or memory that only grow, work
   repeated by every process, O(n²) on real input. Judge against the expected load.
5. **Tests:** risky logic with no test that fails when it breaks; tests that pass without
   testing anything; skipped or loosened tests.
6. **One system:** a second version of a helper or component that already exists, near-copies
   that must change together, a rule that lives in two places, an abstraction with one user,
   code that ignores the project's conventions, tokens or design system.
7. **Architecture:** a module doing several unrelated jobs, logic in the wrong layer, a change
   that has to touch many files for one feature. Propose a deeper module only with a clear win.
8. **Performance:** measured problems first. Guesses are suggestions, not findings.
9. **Readability:** names that mislead, comments that lie. No style taste.

## 3. Prove each finding

- Every finding has a concrete case: "this input or situation leads to this wrong result". No
  case, no finding.
- Before calling code unused or duplicated, grep the whole tree, including tests, config and
  dynamic references.
- A shortcut with a comment naming its limit is a decision, not a finding, unless the load
  already crosses it.
- Propose the smallest fix that solves it, preferring fixes that remove code.

## 4. Report

Plain words, worst first, in three groups (skip empty ones):

- **Must fix:** bugs, security, data loss, breaks at the expected load.
- **Should fix:** risky code without a test, duplication, real slowness, wrong layer.
- **Could fix:** small, clear improvements.

Each line: `file:line`, what is wrong, the case that shows it, the fix. End with what you did
not check. If the code is good, say so and say what you checked.
Fixing a large set of findings (dead code, duplicates, structure) is `refactor`.

## Done when

Every changed line was read, every finding has a case and a fix, and the report says what was
not checked. When fixing your own findings, each fix gets a test or a look at the running result.

Adapted from Agent Skills by Addy Osmani (MIT), Ponytail's audit by Dietrich Gebert (MIT), and
BAMA's architecture check-in by Dave Ebbelaar (MIT).
