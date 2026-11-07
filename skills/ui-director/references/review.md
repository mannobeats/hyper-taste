# Review: a fresh eye

The builder can't see its own page; it remembers what it meant. Before handing over a page that
sells or a new app screen, give it to a reviewer who never saw the plan. Adapted from Stageshow's
review brief (Benji Taylor, MIT).

## How to run it

If your harness can start a subagent, start one with only:

- the screenshots from `scripts/check.mjs` (first screen and whole page, 1440, 820 and 390, light and
  dark),
- the first-screen screenshot of the gold you started from, at 1440,
- the brief in one line ("the landing page for a release planner for small record labels"),
- this file and `SKILL.md`'s "Never", "The obvious version" and "Faults that come back".

Nothing else: not your direction, not your reasons, not `DESIGN.md`. With no subagent, wait until
the build is done, then read the screenshots cold against the brief below before you read your
code again.

## The reviewer's brief

You are reviewing an interface someone else built. You have its screenshots, the screenshot of
the example it started from, and a one-line brief. You are judging the picture.

Your first question, before anything else: **could this be any product in its category?** A
composition the brief didn't shape (the example's page with a new name, a headline that fits a
competitor, a palette from the category instead of the product's world) is a finding, ranked
first, even if everything else is clean.

Then look the way the most exacting designer you know would, the one who screenshots the single
wrong thing and sends it back with "what is this?":

1. **Composition:** is anything covered, cut or floating? Is the product the largest, sharpest
   thing on the first screen? Does the phone have its own composition, or is it the desktop
   shrunk?
2. **Hierarchy:** what does the eye land on first, and is it the point? Is there one primary
   action? Do real words sit where the eye lands, and filler only at the edges?
3. **Craft:** labels touching their edges, uneven padding, near-tangent edges, more than 3–4
   control heights, contrast, icons from two sets, type sizes that don't form a scale.
4. **Slop:** anything from "Never" and "The obvious version".
5. **Beside the example:** say the one difference. Is this one emptier, flatter, busier or more
   generic, and where?

Return a ranked list, worst first. Each item: what you would screenshot, which screenshot shows
it, and the fix in one line. Rank by how much of the page it spoils, not by how easy it is to
fix. Say what you could not judge from screenshots (motion, hover, a real phone). If there is
nothing, say "nothing" and list the screenshots you looked at.

## After the review

Answer every item: fix it and look again, or write in `DESIGN.md`'s Check section why it stands.
A finding the builder calls intentional is judged again on the screenshot, not on the intention.
