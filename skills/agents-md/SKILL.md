---
name: agents-md
description: Create, fix, slim down, or restructure AGENTS.md / CLAUDE.md / GEMINI.md agent instruction files, and keep them in sync so an edit to AGENTS.md is automatically reflected in CLAUDE.md (symlink). Use when asked to set up, write, audit, clean up, split, or sync AGENTS.md or CLAUDE.md, when an agent keeps repeating a mistake, or when deciding what belongs in AGENTS.md vs docs/ vs a skill.
---

# AGENTS.md / CLAUDE.md

AGENTS.md is injected in full into **every** request. Every line costs tokens and attention on tasks it has nothing to do with. The job is to keep it tiny and have it point to detail loaded only on demand.

The scripts are in `scripts/` next to this file. Below, `<skill>` is the folder this SKILL.md is in; it depends on the agent (`~/.claude/skills/agents-md`, `~/.agents/skills/agents-md`, `~/.codex/skills/agents-md`, or a project's skills folder). Run them from the repo root with `bash`, which works even if the files lost their executable bit.

## 1. One file, no drift: symlink CLAUDE.md to AGENTS.md

AGENTS.md is the source of truth. CLAUDE.md (and GEMINI.md) are symlinks to it, so an agent writing to either file edits the same content. A CLAUDE.md that only says "see AGENTS.md" is worse: agents append rules to it and the two files drift apart.

```bash
bash <skill>/scripts/sync.sh .            # every AGENTS.md in the tree gets a CLAUDE.md link
bash <skill>/scripts/sync.sh . --gemini   # also GEMINI.md
```

What it does in each directory (skips node_modules, .git, dist, build, .venv):
- CLAUDE.md with no AGENTS.md: renames it to AGENTS.md, then links.
- CLAUDE.md identical to AGENTS.md: replaces it with the link.
- CLAUDE.md different: prints the diff and exits 1. Merge the unique lines into AGENTS.md (into the right place, see step 3), then rerun. `--force` moves it to `CLAUDE.md.bak` instead; merge from the backup, then delete it.
- Safe to rerun. Run it again after creating any new nested AGENTS.md.

Manual equivalent: `ln -s AGENTS.md CLAUDE.md`. On Windows (admin shell or Developer Mode): `mklink CLAUDE.md AGENTS.md` (file link, no `/D`), and `git config core.symlinks true` so git checks out real links. Commit the symlink; git stores it as a link.

## 2. Audit

```bash
bash <skill>/scripts/audit.sh .
```

Flags: files over 60 lines or ~1500 tokens, onboarding sections (Getting Started/Setup/Install), task-specific headings (testing, styling, PRs, API, auth...), sections over 15 lines, file paths that no longer exist, and CLAUDE.md/GEMINI.md that are not links. Treat the output as a to-do list, not a verdict.

## 3. What goes where

Ask of each rule: does it apply to nearly every task in this directory?

| Content | Home |
|---|---|
| 1-2 sentence project description, non-standard tooling (`pnpm` not npm, unusual scripts), high-level layout (top-level folders only) | AGENTS.md |
| Conventions for one area: CSS, React, TypeScript, testing, API, database | `docs/<area>-conventions.md`, linked from AGENTS.md |
| Workflows that happen sometimes: submitting a PR, release, delivery checklist (lint, format, tests, summary) | `docs/<workflow>.md`, linked with a trigger ("When opening a PR, read ...") |
| Rules for one package in a monorepo (`apps/web` is TS, `apps/api` is Python) | That package's own `AGENTS.md` (plus its CLAUDE.md link) |
| Rare, specialized, repeatable procedure (auth flow, migrations, a deploy) | A skill (`<skills folder>/<name>/SKILL.md`, such as `.claude/skills/` or `.agents/skills/`); only its name + description cost context until used |
| Getting started, install steps, onboarding for humans | README. Not AGENTS.md: the agent works in an already set-up repo |
| Individual file paths, exhaustive folder trees | Nowhere. They go stale and mislead |

Docs may link to each other (e.g. typescript-conventions.md links testing.md). Keep each file a flat list of rules without duplicates.

## 4. Fix an existing AGENTS.md

1. `sync.sh .` so there is one file per directory, and merge any diverged content.
2. `audit.sh .` and read the whole AGENTS.md.
3. Delete: getting-started/setup sections, duplicate rules (the same topic often appears twice), granular file paths, anything the code or linter already enforces, generic advice ("write clean code").
4. For each task-specific section: move its body verbatim to `docs/<topic>.md`, replace it with one line:
   `- Styling: read docs/css-conventions.md before writing CSS.`
   The trigger ("before writing CSS", "when opening a PR") tells the agent when to load it.
5. Monorepo: move package-only sections into `apps/<pkg>/AGENTS.md` with a one-line description of that package at the top. Rerun `sync.sh .`.
6. Rare procedures: turn into a skill instead of a doc.
7. Rerun `audit.sh .` until only intentional warnings remain. Target: under ~50 lines.
8. Check every link resolves: `grep -o 'docs/[^ )]*\.md' AGENTS.md | xargs ls`.

## 5. Create a new AGENTS.md

Do **not** have an agent read the repo and generate one; that produces a long, generic file. Start with this and nothing more:

```markdown
# <Project>

<One or two sentences: what it is and who uses it.>

- Package manager: pnpm
- Layout: `apps/web` (React frontend), `apps/api` (FastAPI backend), `packages/` (shared libs)

## Conventions
<!-- Add links here only after the agent gets something wrong. -->
```

Then `sync.sh .`.

## 6. Grow it only from real mistakes

When the agent does something wrong, record the correction where it belongs (table in step 3), usually a docs file, then add a link line to AGENTS.md if that doc is not linked yet. Don't add rules for mistakes that haven't happened. Never fix a mistake by appending one more bullet to the root file; that is how 500-line AGENTS.md files happen.

## Loading behavior (why nesting works)

- Claude Code loads CLAUDE.md from the launch directory and every parent at startup. A CLAUDE.md in a subdirectory loads when the agent reads files in that subtree.
- Codex and other AGENTS.md agents read the chain from repo root down to the launch directory, so launching in the repo root does not load `apps/api/AGENTS.md`.
- For every agent to see a package's rules, launch it in that package, or have the root AGENTS.md say: "Working in apps/api? Read apps/api/AGENTS.md."
- Skill names and descriptions are loaded on every request, so 100 installed skills also cost context. Remove skills you don't use.
