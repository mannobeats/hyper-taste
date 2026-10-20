---
description: "Pair 04-show: Show, don't tell. An info icon, a paragraph about how to read the report, one sentence per number, and a note explaining the note."
expected_outcome: "Bars you compare at a glance, with the one far over its average in amber. Exact values are one hover away."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is our weekly cloud spend card. It has a lot of text and nobody reads it. Improve it, editing the file in place.
