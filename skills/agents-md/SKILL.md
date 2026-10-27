---
name: agents-md
description: Keep agent instruction files (AGENTS.md, CLAUDE.md, GEMINI.md) small and in sync. Use when creating, auditing, slimming or splitting one, before adding a rule or memory to one, when an agent keeps repeating a mistake, or when deciding whether guidance belongs in AGENTS.md, docs/ or a skill.
---

# AGENTS.md / CLAUDE.md

AGENTS.md loads in full into every request, so every line costs tokens and attention on tasks it
has nothing to do with. Keep it tiny, and let it point to detail that loads only when needed.

The scripts are in `scripts/` next to this file. Run them from the repo root with `bash`.

## 1. One file, no drift

AGENTS.md is the source of truth. CLAUDE.md and GEMINI.md are symlinks to it, so an agent writing
to either edits the same content.

```bash
bash <this skill>/scripts/sync.sh .            # every AGENTS.md in the tree gets a CLAUDE.md link
bash <this skill>/scripts/sync.sh . --gemini   # also GEMINI.md
```

In each directory (skipping node_modules, .git, dist, build, .venv): a CLAUDE.md with no
AGENTS.md is renamed to AGENTS.md, then linked; one identical to AGENTS.md becomes the link; one
that differs prints the diff and exits 1, so merge its unique lines into AGENTS.md and rerun
(`--force` moves it to `CLAUDE.md.bak` instead). Safe to rerun after adding a nested AGENTS.md.

Where links can't work (Windows without Developer Mode, or a CLAUDE.md that needs Claude-only
lines), CLAUDE.md holds `@AGENTS.md` on its first line and those lines below it. A CLAUDE.md that
only *says* "see AGENTS.md" drifts: agents append rules to it instead. Recent Claude Code reads a
lone AGENTS.md directly, unless a CLAUDE.md or CLAUDE.local.md sits in the same tree; the link
covers older versions and other tools.

## 2. Audit

```bash
bash <this skill>/scripts/audit.sh .
```

Flags files over 50 lines or ~1,500 tokens, onboarding sections, task-specific headings, sections
over 15 lines, paths that no longer exist, and CLAUDE.md or GEMINI.md that aren't links. A
CLAUDE.md with no AGENTS.md is audited too. Treat the output as a to-do list, not a verdict.

## 3. What goes where

Ask of each line: does it apply to nearly every task in this directory?

| Content | Home |
|---|---|
| What the project is in 1–2 sentences, non-standard tooling (`pnpm`, an unusual script), top-level layout | AGENTS.md |
| Conventions for one area: CSS, testing, API, database | `docs/<area>.md`, linked with its trigger. Claude Code only: `.claude/rules/<area>.md` with `paths:` loads on its own |
| A workflow that happens sometimes: a PR, a release, a delivery checklist | `docs/<workflow>.md`, linked with its trigger |
| Rules for one package in a monorepo | That package's own AGENTS.md (plus its link) |
| A procedure reused across repos, or one that ships scripts | A skill: only its name and description cost context until used |
| Install steps and onboarding for humans | README. The agent works in a repo that's already set up |
| File paths, folder trees, what `package.json` or a config already says | Nowhere: the agent can look, and copies go stale |

An `@path` import loads the whole file every session, so it saves no context; use a plain link
with a trigger for anything on demand.

## 4. Write a line

- **Trigger first:** "Before writing CSS, read docs/css.md." The trigger tells the agent when to
  load it.
- **Say the target, not the ban:** "Use pnpm" beats "Don't use npm". Keep a prohibition only for
  a real guardrail, paired with what to do instead.
- **One meaning, one place.** A rule written twice drifts.
- **Delete what the agent already does** ("write clean code", "be careful") and what the linter
  or the code enforces.

## 5. Fix an existing file

1. `sync.sh .`, merging any diverged content.
2. `audit.sh .` and read the whole file.
3. Delete getting-started sections, duplicates, file paths, enforced and generic rules.
4. Move each task-specific section verbatim to `docs/<topic>.md` and leave one line:
   `- Styling: read docs/css.md before writing CSS.`
5. Monorepo: move package-only sections into `apps/<pkg>/AGENTS.md` with a one-line description
   of the package at the top, then `sync.sh .` again.
6. Rerun `audit.sh .` until only intentional warnings remain, then check every link resolves:
   `grep -o 'docs/[^ )]*\.md' AGENTS.md | xargs ls`.

## 6. Start a new file

Don't have an agent read the repo and generate one: that produces a long, generic file. Start
with this, then `sync.sh .`:

```markdown
# <Project>

<One or two sentences: what it is and who uses it.>

- Package manager: pnpm
- Layout: `apps/web` (React frontend), `apps/api` (FastAPI backend), `packages/` (shared libs)

## Conventions
```

It grows only from real mistakes: when an agent gets something wrong, write the correction where
the table puts it (usually a doc) and add the doc's trigger line here if it isn't linked yet.

## Loading

- Claude Code loads CLAUDE.md (or a lone AGENTS.md) from the launch directory and every parent at
  startup, and a subdirectory's file when it reads files there.
- Codex and other AGENTS.md agents read the chain from the repo root down to the launch
  directory, so launching at the root doesn't load `apps/api/AGENTS.md`. The root file says
  "Working in apps/api? Read apps/api/AGENTS.md." for agents that don't load nested files.
- Every installed skill's name and description also load on every request. Remove skills you
  don't use.
