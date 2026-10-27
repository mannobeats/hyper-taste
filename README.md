# Hyper Taste

Agent skills with taste. Each one teaches a coding agent a job it usually does badly, with rules,
numbers and checks instead of vibes. Install all of them at once, or only the ones you want.

Works with any agent that supports [Agent Skills](https://agentskills.io): Claude Code, Codex,
Cursor, OpenCode, Gemini CLI and others.

## Skills

| Skill | What it does |
|---|---|
| [ui-director](docs/ui-director/README.md) | Interfaces nobody can tell were made by AI: striking landing pages, calm app screens, and a token system for any stack. [23 before/after pairs, live](https://mannobeats.github.io/hyper-taste/docs/ui-director/). |
| [agents-md](docs/agents-md/README.md) | Keeps AGENTS.md small and every agent in sync: CLAUDE.md and GEMINI.md become symlinks, and an audit flags bloat and stale paths. |

## Install

### Any agent, with the skills CLI

```bash
npx skills add mannobeats/hyper-taste                       # pick from the list
npx skills add mannobeats/hyper-taste --skill '*'           # every skill
npx skills add mannobeats/hyper-taste --skill ui-director   # one skill
```

Add `-g` to install for your user instead of the current project.

### Claude Code plugin marketplace

```
/plugin marketplace add mannobeats/hyper-taste
/plugin install hyper-taste@hyper-taste       # every skill
/plugin install ui-director@hyper-taste       # one skill
/plugin install agents-md@hyper-taste
```

### Codex

```bash
codex plugin marketplace add mannobeats/hyper-taste
codex plugin add hyper-taste@hyper-taste
```

For a single skill in Codex, use the skills CLI above.

### Manual

Download a zip from [Releases](https://github.com/mannobeats/hyper-taste/releases), or clone and
copy the folders you want into your agent's skills directory:

```bash
git clone https://github.com/mannobeats/hyper-taste
cp -r hyper-taste/skills/ui-director ~/.claude/skills/    # Claude Code, all projects
cp -r hyper-taste/skills/* ~/.agents/skills/              # agents that read ~/.agents/skills
cp -r hyper-taste/skills/* ~/.codex/skills/               # Codex
```

**Agents without skill support:** put the folder in your repo and add one line to `AGENTS.md`,
`.cursorrules` or `.github/copilot-instructions.md`, for example:

```
For any UI work, read and follow skills/ui-director/SKILL.md before writing code.
```

## Repository layout

```
skills/<name>/          one folder per skill: SKILL.md plus what it opens on demand
commands/<name>/        Claude Code slash commands that belong to a skill
docs/<name>/            the skill's README, screenshots and demos, for humans
evals/<name>/           eval cases for `claude plugin eval`, run by hand
.claude-plugin/         Claude Code marketplace: the bundle plus one plugin per skill
.codex-plugin/          Codex plugin manifest
scripts/validate.mjs    checks skills, manifests and versions (runs in CI)
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) to add a skill or cut a release.

## License

[MIT](LICENSE). The Geist fonts bundled with ui-director are under the
[SIL Open Font License](skills/ui-director/fonts/OFL.txt).
