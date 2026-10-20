---
description: "Pair 03-differentiate: Differentiate instead of spacing out. Six sentences at the same weight. Adding padding would only make the block taller."
expected_outcome: "Grouped by due date, with faces for people, chips for categories and the link color for links. You find any task in a second."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is a list of upcoming tasks. People say it's hard to scan. Make it scannable, editing the file in place.
