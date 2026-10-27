---
description: "Brief to page: a landing page built from scratch for a software product, with no starting file."
expected_outcome: "A first screen with a claim from the visitor's world, the product rebuilt in code as the hero and playing its job, one action with its risk line, product states instead of feature cards, and a held ending."
max_turns: 40
timeout_seconds: 900
allowed_tools: [Read, Glob, Grep, Skill]
plugins: ["../../../skills/ui-director"]
---

Build the landing page for Tidewell, as a single page.html in this folder. Tidewell is a scheduling app for small sailing schools: it reads the tide and wind forecast, moves lessons to the hours a class can actually go out, and texts every student when their lesson moves. Schools pay €29 a month per instructor, with a 30-day free trial and no card needed.
