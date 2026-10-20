# Hyper Taste

A collection of agent skills. Each skill lives in `skills/<name>/` and is installed into users'
projects as is, so put nothing there that isn't for the agent using the skill.

- Adding a skill or cutting a release: follow `CONTRIBUTING.md`.
- After any change to skills or manifests, run `node scripts/validate.mjs` and
  `claude plugin validate .`.
- Human docs and images for a skill go in `docs/<name>/`, slash commands in `commands/<name>/`, evals in `evals/<name>/`.
- ui-director pairs: edit the HTML in `docs/ui-director/pairs/`, then regenerate screenshots with `npm run shoot` in `docs/ui-director`. Never copy pair pages into the skill folder.
