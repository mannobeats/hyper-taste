# AGENTS.md

An agent skill for writing and maintaining the instruction files coding agents read on every
request: AGENTS.md, CLAUDE.md and GEMINI.md.

Those files are loaded in full into every request, so every line costs tokens and attention on
tasks it has nothing to do with. Left alone they grow to hundreds of lines, and CLAUDE.md drifts
away from AGENTS.md because each agent writes to its own file. This skill keeps one short source
of truth and moves everything else to where it's loaded only when needed.

## What it does

- **One file, no drift.** AGENTS.md is the source of truth; CLAUDE.md and GEMINI.md become
  symlinks to it, in every directory of the repo. Whichever file an agent edits, they all change.
- **Audit.** Flags files over 60 lines or ~1,500 tokens, onboarding sections, task-specific
  sections that belong in `docs/`, long sections, file paths that no longer exist, and CLAUDE.md
  or GEMINI.md files that aren't links.
- **What goes where.** A clear rule for AGENTS.md, `docs/`, a package's own AGENTS.md, a skill,
  or the README, plus how to fix a bloated file and start a new one.
- **Grow from real mistakes.** Rules get added only after an agent gets something wrong, in the
  place they belong.

## What's inside

```
skills/agents-md/
├── SKILL.md              the rules and workflow (what the agent reads)
└── scripts/
    ├── sync.sh           link CLAUDE.md (and GEMINI.md) to AGENTS.md in every directory
    └── audit.sh          report bloat, onboarding sections, stale paths and missing links
```

## Install

```bash
npx skills add mannobeats/hyper-taste --skill agents-md
```

```
/plugin marketplace add mannobeats/hyper-taste
/plugin install agents-md@hyper-taste
```

See the [main README](../../README.md#install) for every other way. For agents without skill
support, add this line to `AGENTS.md`:

```
When creating or editing AGENTS.md or CLAUDE.md, read and follow skills/agents-md/SKILL.md.
```

## Use

The skill triggers on its own ("set up AGENTS.md", "clean up our CLAUDE.md", "the agent keeps
doing X"). You can also run the scripts yourself from the repo root:

```bash
bash skills/agents-md/scripts/sync.sh .              # link CLAUDE.md to AGENTS.md everywhere
bash skills/agents-md/scripts/sync.sh . --gemini     # also GEMINI.md
bash skills/agents-md/scripts/sync.sh . --force      # back up a diverged CLAUDE.md, then link
bash skills/agents-md/scripts/audit.sh .             # report what to trim or move
```

Use the path where the skill is installed (for example `~/.agents/skills/agents-md`). Both
scripts skip `node_modules`, `.git`, `dist`, `build` and `.venv`, and are safe to rerun. They
need bash, so on Windows use Git Bash or WSL, or link by hand with `mklink CLAUDE.md AGENTS.md`.
