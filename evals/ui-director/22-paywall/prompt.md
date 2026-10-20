---
description: "Pair 22-paywall: A paywall that tells you what happens next. A gradient, three plans to compare, a BEST VALUE badge, a wall of checkmarks, a grey close button you can barely find and the price in the fine print."
expected_outcome: "What you get, shown. One plan, a timeline of the trial with the day you'll be reminded and the day you'll pay, and a close button you can see."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the paywall for our birdsong ID app. It converts but people complain it feels pushy. Redesign it, editing the file in place.
