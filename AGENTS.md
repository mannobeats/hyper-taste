# Hyper Taste

A collection of agent skills. Each skill lives in `skills/<name>/` and is installed into users'
projects as is, so put nothing there that isn't for the agent using the skill.

- Adding a skill or cutting a release: follow `CONTRIBUTING.md`.
- After any change to skills or manifests, run `node scripts/validate.mjs` and
  `claude plugin validate .`.
- Human docs and images for a skill go in `docs/<name>/`, slash commands in `commands/<name>/`, evals in `evals/<name>/`.
- ui-director pairs and gold pages: edit the HTML in `docs/ui-director/pairs/` and `docs/ui-director/gold/`, then run `npm run examples` (rebuilds `skills/ui-director/examples/` and `teaching/`) and `npm run shoot` in `docs/ui-director`. Never hand-edit the built files in the skill folder. Every page in `skills/ui-director/examples/`, and the right half (`*.after.html`) of every pair in `teaching/`, must pass `node skills/ui-director/scripts/check.mjs <url>` (1440, 820 and 390, light and dark).
