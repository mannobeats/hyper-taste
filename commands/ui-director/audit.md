---
description: Review a page against ui-director in a real browser, at desktop and phone, and report what to fix
argument-hint: "[file, localhost address or URL] [fix]"
---

Use the ui-director skill in audit mode on: $ARGUMENTS

1. If no page was given, find the running dev server or the main entry file.
2. Open it with the browser your harness gives you (`references/look.md`) at desktop (about 1440 wide) and phone (390) widths, in light and dark. Scroll the whole page, use every control once, read the console, and run the page check from `references/look.md`.
3. Go through the audit list in SKILL.md. Check the hard bans and model habits, and search the source for raw colors.
4. Report at most 5 findings, worst first. Give each one the evidence you saw and the smallest fix.
5. Change nothing unless the input includes "fix". In that case, fix the findings and look again until nothing on the list fails.
