---
description: "Pair 02-close: Keep related things close. The same list stretched across the whole screen. Every task sits a long way from its due date."
expected_outcome: "At its natural width, each task and its date read as one row."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is our task list. On a big monitor it feels hard to read. Improve it, editing the file in place.
