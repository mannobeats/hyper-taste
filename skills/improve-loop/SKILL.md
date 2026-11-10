---
name: improve-loop
description: Work through docs/STORIES.md one story at a time - plan, build, test, run and look, compare, fix, commit - until a milestone is done, unattended if needed. Use when the user says "keep going", "work through the backlog", "build M1", "make it match the reference", or wants an autonomous build loop.
argument-hint: "[milestone, e.g. M1]"
---
<!-- From BAMA by Dave Ebbelaar (MIT), adapted for Hyper Taste. -->
# Improve loop

One pass through the loop takes one story from `todo` to `done`:

```text
pick story -> plan -> code -> test -> run and look -> compare -> fix -> commit -> update STORIES.md
```

Stop after the milestone the user named, or after the current milestone if
they named none. Then report.

## 1. Pick

Open `docs/STORIES.md`. Take the first `todo` story in the current
milestone whose dependencies are `done`. Set it to `doing`.

## 2. Plan

If the story adds a screen, an action, or words and has no `UX:` block
yet, call the Skill tool with `ux-design` first.

Write two to five lines: which files change, what already exists that you will reuse,
which data fields are new, which command and shortcut it adds, which screen shows it. A new
stored field gets a default value, so existing data keeps loading.

## 3. Code

Follow the `build` skill, the story's `UX:` block, `CONSTRAINTS.md` and `DESIGN-SYSTEM.md` if the
project has them, and the platform's skill (`mac-app` and `mac-design`, or `ui-director`). Keep
each file small enough to read in one go.

## 4. Test, run and look

Run the tests and the checks in `CONSTRAINTS.md`. If the story has logic, add a test. Run the
app with sample data in a test store, and capture the screens the story touches, light and dark.

## 5. Compare

Look at your screenshots and the story's reference screenshots side by side. Write down the differences that matter, in this order:

1. Missing or wrong behavior from the acceptance criteria.
2. Words and flow: names, surface, and states that differ from the `UX:`
   block or `docs/GLOSSARY.md`.
3. Layout: wrong column, wrong order, missing element, off-grid spacing.
4. Hierarchy: what is biggest, boldest, first.
5. Spacing and alignment.
6. Color and details.

The goal is the same structure and behavior, built from the platform's own controls. It is
not a pixel copy. When the reference uses a custom control and the platform has a native one,
use the native one.

No reference screenshot (no app was cloned)? Compare against the story's
acceptance lines and the design skill's rules (`mac-design` or `ui-director`) instead.

Capture only the screens a story touches, and every screen at the end of each milestone.

Fix, rebuild, and compare again. Three rounds per story at most. If it still
does not match, set the story to `todo` again with a note that says what is
blocking, and move on.

## 6. Commit and record

```bash
git add -A
git commit -m "Complete tasks with Command-Return"
```

Set the story to `done` in `docs/STORIES.md` and commit that with the code.
One story per commit, so any story can be reverted on its own. M1 may
land as one commit when its stories share one skeleton (model, pages,
list, persistence); from M2 on, one story per commit.

## 7. Report

At the end of the loop, report to the user:

- Stories done, with one line each and the evidence: the passing test output and the
  screenshots that show them.
- Stories blocked, and why.
- Anything the user should try by hand (shortcuts, drag and drop).
- The next story in line.

Then open the new build so the user can try it.

## Milestone check-in

When the last story of a milestone is `done`, call the Skill tool with `review` on the milestone's code before you start the next one. Unattended, fix its Must fix findings, and leave the rest in `docs/REVIEW.md` for the user.

When a story fixes a bug, add an entry to `docs/FIXLOG.md`: symptom,
cause, fix, and a last line `Rule: <what to always or never do>`. The fix
log outlives squashed history, and the check-in reads it.

## Running it unattended

The loop works with no one watching, because every step checks itself:
the build, the tests, the screenshots, the acceptance criteria. To let it run longer,
start it with a clear limit ("finish M2, then stop"), make sure the tree is
committed before you start, and never let it touch the user's real database.
Each story is a separate commit, so the user can review the history in the
morning and revert anything they do not like.

Done when every story in the milestone is `done` or named in the report as
blocked with a reason, each done story has its own commit, and the user
has the report.
