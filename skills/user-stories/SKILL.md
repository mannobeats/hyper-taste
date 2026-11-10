---
name: user-stories
description: A prioritized backlog of small user stories with checkable acceptance criteria (docs/STORIES.md), grouped into milestones that each end in something usable. Use after product-brief or clone, or when the user asks for user stories, a plan, a backlog, a task breakdown, or "what do we build first".
---
<!-- From BAMA by Dave Ebbelaar (MIT), adapted for Hyper Taste. -->
# User stories

Screens show what an app looks like. Stories say what a person does with
it. You build and test stories, not screens. Each story is a thin slice
through every layer (data, logic, UI) that works on its own.

Read `docs/BRIEF.md`, `docs/research/*.md`, and `docs/screens/INDEX.md`
where they exist. Write `docs/STORIES.md`.

## Story format

```markdown
### S-012 Complete a task with the keyboard
As the user, I select a task and press Command-Return to complete it.
Screens: 01-inbox.png, 02-today.png
Depends: S-004
Acceptance:
- [look]  The circle fills and the row fades out within half a second.
- [e2e]  An "Undo" banner shows for five seconds; Command-Z also undoes it.
- [unit] A recurring task moves to its next date.
Status: todo
```

- One action per story. "Rename a project from its context menu", not
  "Manage projects".
- Every acceptance line starts with how it is checked: `[look]` a screenshot of the running app, `[unit]` unit test, `[e2e]` an
  end-to-end or self-test step, `[manual]` a person must try it.
  "Works well" is not checkable.
- `Screens:` links reference screenshots, so `improve-loop` knows what to
  compare. Without a reference app, name the screens that will show the story. A panel, sheet, or menu counts as its own screen.
- `Depends:` (optional) lists stories that must be done first.
- Keep a control and the only surface that shows it in one story: a
  highlighting field that lives only in the quick-add panel ships with the
  panel.
- Status: `todo`, `doing`, `done`, or `dropped`.

## Milestones

Each milestone ends with an app the user can use for a day.

1. **M1 Core loop**: the one thing the app is for, end to end. Data
   survives a restart.
2. **M2 Organize**: the main structure, sidebar pages, moving items.
3. **M3 Time**: dates, Today and Upcoming, recurrence, reminders.
4. **M4 Speed**: quick-add panel, global shortcut, natural language input,
   keyboard navigation, search, menu commands.
5. **M5 System**: the platform's hooks (menu bar, Share, Shortcuts, notifications, widgets, a CLI).
6. **M6 Polish**: drag and drop, context menus, empty states, icon, settings.

Rename milestones to fit the app. Inside a milestone, stories that others
depend on come first.

## Seed data

Every attribute the seed data sets (symbols, colors, notes) is something a
story lets the user create in the app. Otherwise screenshots show features
no one can use.

## Leave things out

Drop what exists only for other people or for the vendor: accounts,
sharing, teams, integrations, upgrade prompts, gamification. List them
under `## Dropped`, one line each, so the decision is visible.

## UX notes

For each M1 story that adds a screen, an action, or words, call the Skill
tool with `ux-design`. It adds a `UX:` block under the acceptance lines and
starts `docs/GLOSSARY.md`, so every story uses the same names. Later
milestones get their UX notes in `improve-loop`, just before they are built.

## Size check

M1 has 5 to 10 stories. Over 60 stories in total means version one is too
big: move stories to `## Later`.

Done when every main job in the brief, every "Version one: yes" row in the
research matrix, and every screen in the index maps to a story or a
`Dropped` line, and every M1 story with UI has a `UX:` block.
