---
description: Review a page against ui-director in a real browser, at desktop and phone, and report what to fix
argument-hint: "[file, localhost address or URL] [fix]"
---

Use the ui-director skill in audit mode on: $ARGUMENTS

1. If no page was given, find the running dev server or the main entry file.
2. Serve it over http and run `node <skill>/scripts/check.mjs <url>` (`references/look.md`). Open every screenshot it writes (1440, 820 and 390, light and dark), then use every control once in your browser. If the script can't run, use your browser tool at every width and paste `scripts/page-check.js` into its JavaScript.
3. Read it against "Never" and "The obvious version" in SKILL.md, the "Done means" list of `references/landing.md`, `references/app-ui.md` or `references/mobile.md`, and "Redesigns and audits" in `references/look.md`. Put the first screen beside the closest gold in `examples/`. Search the source for raw colors.
4. Report at most 5 findings, worst first. Give each one the evidence you saw and the smallest fix.
5. Change nothing unless the input includes "fix". In that case, fix the findings and look again until the check ends `check passed` and nothing on the list fails.
