---
description: "Pair 13-dark: Dark mode is built, not inverted. The light theme flipped: pure black, pure white text, borders you can't see, and an accent that buzzes."
expected_outcome: "Surfaces get lighter as they rise, text steps down from white, and the accent takes a lighter step of its ramp."
max_turns: 30
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

page.html is the bandwidth card in our dark theme. It looks harsh. Fix it in place.
