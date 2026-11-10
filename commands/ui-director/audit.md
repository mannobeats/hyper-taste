---
description: Review a page or screen against ui-director, at desktop, tablet and phone, light and dark, and report what to fix
argument-hint: "[file, localhost address or URL] [fix]"
---

Use the ui-director skill in audit mode on: $ARGUMENTS

1. If no page was given, find the running dev server or the main entry file, and open it in the browser your harness gives you.
2. Look at it as `references/look.md` describes: every width, light and dark, reduced motion, every control once, the console.
3. Read it against the hard rules and Slop in the skill, and the job's reference file.
4. Report at most 5 findings, worst first, each with the screenshot that shows it and the smallest fix.
5. Change nothing unless the input includes "fix". Then fix the findings and look again until none is left.
