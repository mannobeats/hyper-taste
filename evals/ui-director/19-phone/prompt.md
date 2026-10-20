---
description: "Pair 19-phone: On a phone, rows stop being a table. The desktop table at 390 wide: tiny text, cut-off columns and a sideways scroll."
expected_outcome: "Two lines per row: who and how much, then the details and the status. Grouped by what needs attention, and easy to tap."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is our orders screen, and most customers open it on their phone. Make it work at 390px wide, editing the file in place.
