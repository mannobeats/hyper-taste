---
description: "Pair 17-disclosure: Show the right things, reveal the rest. Every row carries every action, so the list is mostly buttons, and Delete is always one click away."
expected_outcome: "Rows show the data. Frequent actions appear on hover with tooltips, and rare ones live in the menu."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the saved reports list. It's covered in buttons. Clean it up, editing the file in place.
