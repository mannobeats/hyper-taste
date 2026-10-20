---
description: "Pair 05-icons: Icon-only is for universal icons. Eight icons with no labels. You can't tell what any of them does until its tooltip shows up."
expected_outcome: "A count, three actions with labels, and icons only where everyone knows them: delete and more."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the bulk-action bar that appears when someone selects messages. New users don't understand it. Fix it in place.
