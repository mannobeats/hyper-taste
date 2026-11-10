---
name: refactor
description: Restructure, simplify and de-bloat an existing codebase without changing what it does - pin today's behavior, then delete, merge, simplify and reshape one proven step per commit. Use when asked to refactor, clean up, simplify, de-bloat or restructure code, remove dead code or duplication, split a file or module that grew too big, replace an old system, or fix what a review or audit found.
---

# Refactor

The outcome: the same product, with less code, fewer concepts and one clear place for each
thing, and proof at every step that nothing a user or caller relies on changed. Agents fail this
two ways: they rewrite large parts at once and quietly change behavior, or they move code around
and call it cleaner. Smaller and clearer, with the same results, is the only win.

## 1. Know what you are changing

- Start from findings, not taste. Use a `review` audit, or run one: hot spots (files changed
  most often, the largest files), duplicates, dead code, pass-through layers, rules that live
  in two places, modules that do several jobs.
- Before removing or reshaping anything, learn why it exists: its callers, what it calls, its
  edge cases, its tests, and its history (`git log -p`, blame). Code that looks odd is often a
  fix for a bug you haven't met. If you can't say why it is there, read more.
- **The deletion test** for each module: if it disappeared, would its complexity spread to
  every caller (it earns its place) or barely move (it is a pass-through, merge it away)?
- Write a short plan: each change, why it helps, how you will prove it, in the order below.
  For anything beyond a small cleanup, show the plan and let the user pick before you start.
  "This code is fine" is a valid result.

## 2. Pin today's behavior first

Before the first edit, make sure a change in behavior would show up:

- Run the existing tests and record the result. Fix nothing yet.
- Where risky code has no test, add tests that pin what it does now, at the interface callers
  use: outputs, errors, side effects, ordering. Golden files or snapshots work for output,
  screenshots for UI, a timing baseline where speed matters.
- These tests describe the current behavior, odd parts included. A suspected bug is written
  down and fixed separately with `debug`, never inside a refactor.
- Break one pinned line for a moment and see a test fail, so you know the net works.

## 3. Work in this order

Each one makes the next easier and safer:

1. **Delete what is dead.** Unused files, exports, functions, flags, dependencies, config,
   commented-out code. Confirm first: search the whole tree, including tests, config, scripts,
   string and dynamic references, public APIs, and anything other repos or users may call.
   Then delete it, and let the build and tests confirm.
2. **Merge duplicates.** Pick the best version, cover it with the cases of both, move every
   caller to it, then delete the others.
3. **Simplify in place.** Flatten nesting, name what a reader has to decode, remove wrappers
   that only forward, abstractions with one user, options nobody sets, and comments that repeat
   the code. Keep the helpers that give a concept a name.
4. **Reshape modules last.** Split a module that does unrelated jobs, merge shallow layers into
   one deeper module with a small interface, move logic to the layer that owns it. Propose a new
   shape only with a clear win: fewer places to touch for a feature, simpler tests.

## 4. One proven step at a time

- One change per commit, behavior unchanged, the build and every test green after each. No
  features or fixes mixed in.
- Big moves go new-beside-old: build the new piece, move callers over a few at a time, then
  delete the old one. Never leave two systems running longer than the change needs.
- Mechanical changes across many files (renames, moved imports) use the language's tools or a
  codemod, not hand edits, and are their own commit.
- Replace tests rather than stacking them: once tests at the new interface cover the old shallow
  ones, delete the old ones.
- A step that grows past what you can verify at once gets split. A step whose tests fail is
  reverted, not patched until green.

## 5. Keep the balance

- Fewer lines is not the goal; faster understanding is. Revert a "simplification" that is harder
  to read than what it replaced.
- Don't merge two simple functions into one complicated one, or inline a name that explained
  something.
- Follow the codebase's conventions, and the rules in `build`. A refactor that imposes a new
  style is churn.
- Validation, error handling, security, accessibility and edge cases survive every move.

## 6. Prove the result

Report before and after, with the commands that measured them: lines, files, modules and
dependencies removed; the same test results (and outputs, screenshots or timings where you
pinned them); the duplicates and dead code gone, cited by `file:line`. Update `ARCHITECTURE.md`
or `AGENTS.md` where the structure they describe changed. Then run `review` on the whole change.

## Done when

- Behavior was pinned before the first edit, and the same checks pass after the last one.
- Every step is its own green commit, with nothing removed that something still used.
- The code is measurably smaller or simpler, and the report shows the numbers and names what was
  not checked.

Adapted from BAMA's architecture check-in by Dave Ebbelaar (MIT), Agent Skills' code
simplification and migration by Addy Osmani (MIT), and Ponytail by Dietrich Gebert (MIT).
