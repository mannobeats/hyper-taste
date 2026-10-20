# Contributing

## Add a skill

1. Create `skills/<name>/SKILL.md`. The frontmatter `name` must equal the folder name, and the
   `description` (1,024 characters at most) says what the skill does and when to use it. Put
   anything the agent opens on demand next to it, in `references/`, `scripts/` or `fonts/`.
2. Optional: Claude Code slash commands go in `commands/<name>/`.
3. Optional: a README, screenshots and demos for humans go in `docs/<name>/`. Keep them out of
   the skill folder, since everything in it is installed into the user's project.
4. Add a plugin entry to `.claude-plugin/marketplace.json`, so the skill can be installed alone:

   ```json
   {
     "name": "<name>",
     "version": "1.0.0",
     "source": "./",
     "description": "…",
     "license": "MIT",
     "skills": ["./skills/<name>"],
     "commands": []
   }
   ```

   Set `"commands": ["./commands/<name>"]` if the skill has commands, and add the same path to
   the `hyper-taste` bundle's `commands`. The bundle picks up every skill on its own.
5. Optional: eval cases in `evals/<name>/` (see `evals/ui-director/README.md`).
6. Add a row to the skills table in `README.md` and a line under "Unreleased" in `CHANGELOG.md`.
7. Run `node scripts/validate.mjs` and `claude plugin validate .`. CI runs both.

Slash command names are shared across the bundle (`/hyper-taste:<command>`), so pick names that
won't clash with another skill's commands.

## Release

The bundle version (the `hyper-taste` entry in `.claude-plugin/marketplace.json`) is the repo
version. Each skill also has its own version in its plugin entry, bumped when that skill changes.

1. Bump the bundle version in `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json` and
   `.agents/plugins/marketplace.json`, and the version of every skill that changed.
2. Rename "Unreleased" in `CHANGELOG.md` to `## [X.Y.Z] - YYYY-MM-DD`.
3. Commit, then tag and push:

   ```bash
   git tag vX.Y.Z && git push origin main vX.Y.Z
   ```

The release workflow checks that the tag matches every manifest, then publishes a GitHub release
with the changelog notes, a zip of all skills, and one zip per skill.
