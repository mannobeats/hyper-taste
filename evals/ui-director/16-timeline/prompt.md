---
description: "Pair 16-timeline: Events over time want a timeline. A table of timestamps you have to read cell by cell."
expected_outcome: "Order, who and what at a glance: faces, markers whose color means something, and dates the way people say them."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the activity log on a contract page. It's a table of timestamps. Make it better, editing the file in place.
