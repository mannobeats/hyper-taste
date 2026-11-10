# Hyper Taste

A collection of agent skills. Each skill lives in `skills/<name>/` and is installed into users'
projects as is, so put nothing there that isn't for the agent using the skill.

- Skills describe outcomes and how to judge them. No check scripts, templates or examples to
  copy: agents use their own tools. A rule a script would enforce is written as a rule.
- One owner per job. Before adding a rule, find the skill that owns the topic and put it there;
  other skills point to it by name. Never repeat content between skills.
- Adapted text keeps its source line, and the skill's `NOTICE.md` keeps the license.
- Adding a skill or cutting a release: follow `CONTRIBUTING.md`.
- After any change to skills or manifests, run `node scripts/validate.mjs` and
  `claude plugin validate .`.
- Human docs go in `docs/<name>/`, slash commands in `commands/<name>/`, evals in `evals/<name>/`.
  The ui-director before and after pairs in `docs/ui-director/pairs/` are eval fixtures and the
  live gallery; keep each pair's `before.html` and `after.html`.
