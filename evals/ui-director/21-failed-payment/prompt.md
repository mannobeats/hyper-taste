---
description: "Pair 21-failed-payment: A failed payment gets the care of a success. A red alert that says \"Error!\", an error code nobody can act on and one OK button that throws the booking away."
expected_outcome: "A sheet over the booking that says what happened, that nothing was charged and how long the table stays held, then one way forward and two more below it."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html shows what happens in our restaurant booking app when the deposit payment fails. Make that moment better, editing the file in place.
