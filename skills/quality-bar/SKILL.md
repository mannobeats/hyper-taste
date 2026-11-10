---
name: quality-bar
description: Write a project's quality bar down once (CONSTRAINTS.md) - the checks that must pass, with real commands and numbers - so agents can't quietly lower it. Use when starting a project or big feature, before letting agents run unattended, when CI checks are unclear, or when the user wants agents to stop shipping junk.
---

# Quality bar

The outcome: one short file that says what "good enough to ship" means for this project, with a
command for every rule. An agent writes more in an afternoon than anyone reads in a week, so the
bar has to live in the repo, not in someone's head.

## 1. Read before you ask

Find the stack, the test runner, linters, type checker, current coverage, CI, and existing
agent instructions. Report what you found in two lines, then ask only what is left.

## 2. Ask four questions, each with a default

1. Beyond the floor, what should be enforced: test coverage on new code, security scanning,
   performance budgets, accessibility, architecture boundaries? Default: coverage and security.
2. When a check fails mid-task, block or warn? Default: block on the floor, warn on the rest
   for the first two weeks.
3. Target numbers, or measure today and hold the line? Default: measure and hold.
4. The slowest check you'll wait for at the end of a task? Default: about 90 seconds; slower
   checks run in CI.

In an unattended run, don't ask: apply the floor and the defaults and say so in the report.

## 3. Write CONSTRAINTS.md

```markdown
# Constraints

## Floor (always)
- No new suppression comments (ts-ignore, eslint-disable, noqa, swiftlint:disable) without a reason.
- No unimplemented stubs, empty catch blocks, or skipped tests without a reason in the commit.
- No secrets in source. No duplicate of an existing helper, component or token.
- This file is never weakened to make a change pass.

## Enforced
| Dimension | Rule | Checked by | Runs at |
|---|---|---|---|
| Types | zero errors | `<command>` | every change |
| Lint | zero errors | `<command>` | every change |
| Tests | all pass; changed logic is covered | `<command>` | task end, CI |
| Security | nothing high or above | `<command>` | CI |
| Accessibility | zero serious issues | `<command or manual check>` | before release |
| Performance | <budget, e.g. first frame under 100 ms> | `<command>` | before release |

## Measured, must not get worse
| Metric | Today | Direction |
|---|---|---|

## Exceptions
| Rule | Path | Reason | Expires |
|---|---|---|---|
```

Every enforced row names the command that gives the verdict. A number with no command is a wish.
Raise a measured number only in its good direction (a ratchet).

## 4. Point every agent at it

One line in `AGENTS.md`: "Read CONSTRAINTS.md before writing code. Run its checks before calling
a task done. Never weaken it to make a change pass."

## Done when

`CONSTRAINTS.md` exists, every enforced row's command runs and passes today (or its current
number is recorded), and `AGENTS.md` points to it.

Adapted from Agent Skills' constraint-driven development by Addy Osmani (MIT).
