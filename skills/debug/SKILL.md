---
name: debug
description: Find and fix the root cause of a bug, a failing test, a broken build or unexpected behavior, with a test that proves it stays fixed. Use when something errors, crashes, hangs, regresses, behaves differently than expected, or "worked yesterday".
---

# Debug

The outcome: the real cause is found and fixed once, where every caller benefits, with a test
that failed before the fix and passes after. Not a symptom patched in the one place the report
named.

## 1. Stop and reproduce

Stop changing code. Write the exact steps, input and environment that show the bug, and make it
happen on demand: a failing test, a script, or a command. A bug you can't reproduce, you can't
prove fixed. If it only happens sometimes, find what makes it happen more (load, timing, data).

## 2. Read the evidence

- Read the whole error and the first one first; later errors often come from it.
- Read the stack trace to the line in your code, then read that code and its callers.
- Check what changed: `git log`, `git diff`, dependency updates, config, data. When it worked
  yesterday, `git bisect` finds the commit.
- Logs, network requests, the database state. Add logging where you lack evidence, and remove it
  after.

## 3. Find the cause

- Form one hypothesis at a time and test it with the smallest experiment that can prove it
  wrong. Write down what you ruled out.
- Narrow the space: halve the input, the code path or the history until the cause is isolated.
- Ask "why" until you reach a cause that, fixed, makes the symptom impossible, not just unlikely.
- Grep every caller of the function you suspect. The same bug often lives in sibling paths.

## 4. Fix it once

- Write the test that reproduces the bug. It fails.
- Fix the cause in the shared code, so every caller benefits. Keep the fix as small as it can be
  while being complete.
- The test passes, and so does the whole relevant suite.
- Remove debug logging and experiments.

## 5. Guard it

- If the bug came from a pattern, check the codebase for other instances of it.
- When the project keeps a fix log (`docs/FIXLOG.md`), add: symptom, cause, fix, and a last line
  `Rule: <what to always or never do>`. A rule that applies to every agent goes in `AGENTS.md`.

## Never

- Change code at random until the symptom goes away.
- Silence the error: an empty catch, a suppression comment, a skipped test, a retry around a bug.
- Loosen a test or a constraint to make it pass.
- Declare it fixed without running the reproduction again.

## Done when

The cause is named in one sentence, the fix is in the shared code, a test that failed before
now passes, the full suite passes, and the original steps no longer show the bug.
