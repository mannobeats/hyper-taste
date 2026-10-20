---
description: "Pair 12-color: Color is for meaning. A gradient background, a loud color on every card, and white text that's hard to read on them."
expected_outcome: "Neutral surfaces hold the structure, and color is saved for the data: storage by type."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the library panel in our files app. It's too loud. Calm it down, editing the file in place.
