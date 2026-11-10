# Hyper Taste

Agent skills with taste. They teach a coding agent to plan, design and build software that
doesn't look or read generated: interfaces with a point of view, Mac apps that feel native,
phone apps that answer the question first, and code that stays one coherent system.

Each skill says what good is and how to judge it, then trusts the agent and its harness (browser,
screenshots, simulator, subagents) to get there. No check scripts, no templates to copy. One owner
per job, and skills point to each other instead of repeating each other, so they never
contradict.

Works with any agent that supports [Agent Skills](https://agentskills.io): Claude Code, Codex,
Cursor, OpenCode, Gemini CLI and others.

## Skills

Start with `start-here` (`/hyper-taste:start-here`): it names the next skill for where the work is.

| Plan | |
|---|---|
| [research](skills/research/SKILL.md) | The best apps in a category, what people love and hate, how the platform lets you build it |
| [clone](skills/clone/SKILL.md) | Walk an existing app screen by screen and turn it into stories |
| [product-brief](skills/product-brief/SKILL.md) | One page: what it is, who for, the jobs, data, stack, look, scope, how we know it works |
| [user-stories](skills/user-stories/SKILL.md) | A backlog of thin, checkable stories in milestones that each end in something usable |
| [quality-bar](skills/quality-bar/SKILL.md) | The project's bar as `CONSTRAINTS.md`, a command per rule, never quietly lowered |

| Design | |
|---|---|
| [ui-director](skills/ui-director/SKILL.md) | Web and phone interfaces with a direction from the product's world, hard rules, no slop |
| [mac-design](skills/mac-design/SKILL.md) | Native Mac behavior in SwiftUI, Electron or Tauri: native chrome, creative content |
| [design-system](skills/design-system/SKILL.md) | Tokens, parts in every state, a grid, and one page that says which to use when |
| [ux-design](skills/ux-design/SKILL.md) | Names, flow, where it opens, states, words, accessibility, AI features |
| [app-icon](skills/app-icon/SKILL.md) | A Liquid Glass Mac icon from an Icon Composer file |

| Build | |
|---|---|
| [build](skills/build/SKILL.md) | Read first, reuse what exists, thin tested slices, official docs, finish every caller |
| [mac-app](skills/mac-app/SKILL.md) | Set up, build, verify and speed up a Mac app in SwiftUI, Electron or Tauri |
| [debug](skills/debug/SKILL.md) | Reproduce, find the root cause, fix it once, prove it with a test |
| [review](skills/review/SKILL.md) | Review a diff or audit a repo: every finding with a failing case and the smallest fix |
| [improve-loop](skills/improve-loop/SKILL.md) | Work through the backlog one story at a time, unattended if needed |
| [agents-md](docs/agents-md/README.md) | Keeps AGENTS.md small and every agent in sync |

## Install

### Any agent, with the skills CLI

Name your agents with `-a`, so the installer doesn't ask you to scroll through its list:

```bash
# every skill, for Claude Code, for your user (all projects), no prompts
npx skills add mannobeats/hyper-taste -g -a claude-code -s '*' -y

# Claude Code and Codex together
npx skills add mannobeats/hyper-taste -g -a claude-code codex -s '*' -y

# one skill
npx skills add mannobeats/hyper-taste -g -a claude-code -s ui-director -y
```

Drop `-g` to install into the current project only. Leave out `-a` to pick agents from the list,
or `-s` to pick skills from it. `-a '*'` installs for every agent the CLI knows.

### Claude Code plugin marketplace

```
/plugin marketplace add mannobeats/hyper-taste
/plugin install hyper-taste@hyper-taste       # every skill
/plugin install ui-director@hyper-taste       # one skill
```

### Codex

```bash
codex plugin marketplace add mannobeats/hyper-taste
codex plugin add hyper-taste@hyper-taste
```

### Manual

Download a zip from [Releases](https://github.com/mannobeats/hyper-taste/releases), or clone and
copy the folders you want into your agent's skills directory:

```bash
git clone https://github.com/mannobeats/hyper-taste
cp -r hyper-taste/skills/* ~/.claude/skills/    # Claude Code, all projects
cp -r hyper-taste/skills/* ~/.agents/skills/    # agents that read ~/.agents/skills
```

Install the whole set rather than single skills when you can: skills name each other, and a
missing one leaves a gap. Remove older copies of the same skills (BAMA, Agent Skills) so each job
has one owner.

## Repository layout

```
skills/<name>/          one folder per skill: SKILL.md plus references it opens on demand
commands/<name>/        Claude Code slash commands that belong to a skill
docs/<name>/            the skill's README and demos, for humans
evals/<name>/           eval cases for `claude plugin eval`, run by hand
.claude-plugin/         Claude Code marketplace: the bundle plus one plugin per skill
.codex-plugin/          Codex plugin manifest
scripts/validate.mjs    checks skills, manifests and versions (runs in CI)
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) to add a skill or cut a release.

## License

[MIT](LICENSE). Parts are adapted from other MIT-licensed work, credited in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The Geist fonts used by the demo pages in
`docs/` are under the SIL Open Font License.
