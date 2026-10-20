---
description: "Pair 14-destructive: Destructive means red, and says what it does. The brand color on \"Yes\" makes removing things look like the normal path, and \"Yes / No\" sends you back to reread the question."
expected_outcome: "Red for the action you can't undo, a button that names it, and what you'll lose in one sentence."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the confirm dialog we show before someone removes a workspace. It feels off. Fix it in place.
