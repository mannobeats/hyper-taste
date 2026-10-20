---
description: "Pair 15-table: Let the data decide the form. Every column is left-aligned plain text at the same weight."
expected_outcome: "Departments become chips, numbers line up on the right in tabular figures, long emails truncate, the inactive row fades, and only the unusual status gets color."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is our team table. Make it easier to read, editing the file in place.
