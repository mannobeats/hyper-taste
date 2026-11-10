# Look at it

Code that looks right can render wrong: a font that never loaded, a window over the headline, a
status cut by a crop, a desktop layout shrunk onto a phone, a reveal that never fires. Look like a
visitor, measure what eyes miss, and fix from what you saw, never from the code.

## The check

`scripts/check.mjs` does the routine part in one command, with no dependencies (Node 22 and a
Chrome, Chromium, Edge or Brave on the machine). Serve the page over http first (the project's
dev server or `python3 -m http.server`); a `file://` page breaks canvases, modules and fonts
quietly.

```sh
node <skill>/scripts/check.mjs http://localhost:4321/ --out shots
```

It opens the page at 1440, 820 and 390, light and dark, then once with reduced motion; scrolls
so every reveal fires; and writes three kinds of screenshot. **Open every one.**

- `-first-screen`: what a visitor sees on arrival.
- `-page`: the whole page at once, sharp enough to read. A pinned scene looks like an empty band
  in it and a fixed bar lands mid-page.
- `-scroll`: frames taken as a visitor scrolls. The truth about scenes and fixed bars.

It prints two lists, and each line says what is wrong and what to do:

- **Fix** lines are never intentional (layout, contrast, covered or cut words, lines of a headline that collide, tiny text, tap
  targets, spacing and balance, reveals that never fire, the example's world left in your page,
  console errors, and the slop from "Never"). Clearing a line by hiding, removing or shrinking
  the thing it points at is a bug.
- **Judge** lines are leads (habit fonts, all caps, tracking, type and control counts, uneven
  padding, invented-looking proof). Keep one only with a reason from the product's world.

The last line is `check passed` only when no Fix line is left. A passing check is necessary,
not sufficient: it can't see the obvious version, a weak idea or a bad crop.

The dark passes emulate `prefers-color-scheme` and set `class="dark"` or `data-theme="dark"`
when the page's CSS switches on one. A project with another switch needs your browser tool.

**When the check can't run,** use the browser your harness gives you. Browser tools are often
deferred: search your tools for "browser", "chrome", "preview", "screenshot" and "playwright"
before deciding you have none. Paste `scripts/page-check.js` into its JavaScript at each width
and mode; it returns the same lists. Only when all of this fails, tell the user what you tried
and exactly what to look at.

## What to look at

Every pass, in order. Fix the largest visible fault first (composition, then hierarchy, then
motion, then polish) and look again: two passes at least. A first render always has problems.

1. **The first screen at 1440, beside the gold** you started from. Name the one difference. If
   yours is the emptier, flatter, busier or more generic one, that is the fix. If it is the gold
   with a new name, change the voice, then the composition.
2. **The whole scroll:** sections on the page shot, scenes and bars on the `-scroll` sheet.
3. **820 and 390:** each its own composition, nothing covered, nothing cut.
4. **Dark at every width.**
5. **Every control once:** hover, click, tab, type, drag; and the console.
6. **Text on a photo or a scene,** zoomed in on the screenshot: where a bright patch, a dot or
   a line sits behind a word, deepen the shade on that side or move the picture.

## A fresh eye

The builder can't see its own page; it remembers what it meant. Before handing over a page that
sells or a new app screen, start a subagent with only the screenshots, the first-screen
screenshot of the gold, the brief in one line, and the brief below. Not your direction, not your
reasons. With no subagent, read the screenshots cold before you read your code again. (Adapted
from Stageshow's review brief, Benji Taylor, MIT.)

> You are reviewing an interface someone else built, from its screenshots, the screenshot of
> the example it started from, and a one-line brief. A pinned scene looks empty on a `-page`
> shot; judge it on the `-scroll` sheet.
>
> First: **could this be any product in its category?** The example's page with a new name, its
> typeface and headline shape around other words, a headline that fits a competitor, a palette
> from the category: each is a finding, ranked first.
>
> Then look the way the most exacting designer you know would:
> 1. **Composition:** anything covered, cut or floating? Is the picture the largest, sharpest
>    thing on the first screen? Does the phone have its own composition?
> 2. **Hierarchy:** what does the eye land on first, and is it the point? One primary action?
> 3. **Craft:** labels touching edges, uneven padding, near-tangent edges, too many control
>    heights, contrast, two icon sets, sizes that don't form a scale.
> 4. **Slop:** anything from "Never" and "The obvious version" in `SKILL.md`.
>
> Return a ranked list, worst first: what you would screenshot, which screenshot shows it, the
> fix in one line. Say what you could not judge from screenshots. If there is nothing, say
> "nothing" and list what you looked at.

Answer every item: fix it and look again, or write in `DESIGN.md` why it stands. A finding the
builder calls intentional is judged again on the screenshot, not on the intention.

## Redesigns and audits

Run the check and look first, then read the page against "Never" and "The obvious version" in
`SKILL.md`. `teaching/` has a before and after pair for each small problem.

**What you see, what you do instead:**

| You see | Instead |
|---|---|
| Everything centered | Left-align what people read in order; center only a short headline stack or a statement |
| Sections in cards, cards in cards | One surface split by lines and headings |
| Three equal feature cards | A grid of product states: one hero tile, a number, a component (`product-shots.md`) |
| The same composition section after section | Change form and pace: full-bleed, a tight list, one huge number, a quiet pause |
| Nothing bigger than a polite headline | Scale the one thing you're proudest of until it feels too big, then pull back a little |
| A screenshot in a frame on a glow | The product rebuilt in code at real size, 80% of the content width |
| Only fade-ups | Motion that acts out the product: the film, a scene, something to try |
| White page, gray text, one blue button; or the gold's look on another product | A voice from this product's world (`voice.md`) |
| Categories as shades of one color; every card a different color | Different hues at one lightness; neutral by default, color for meaning |
| Pure black text, `#fff` on black, dark mode by inverting | Gray text levels, dark surfaces at L .13–.21, a designed dark (`system.md`) |
| Stretched rows: a label far left, its value far right | Natural widths, more columns |
| The stat card grid | A row with dividers: muted label, 600 value, context line |
| Two equal buttons; a modal for everything | One primary per view; popovers, drawers, inline editing |
| A library's default look | Its variables mapped to the tokens (`stacks.md`) |
| Raw hex in components, `z-index: 9999`, links to `#`, `// TODO` | Tokens, a small z scale, real targets, finished sections |
| Ten fixes, the check green, the screen unchanged | Stop and get a fresh eye |

**Redesign order:** list every tell and missing state; keep URLs, nav labels, field names and
order, the logo, legal copy and analytics hooks; fix tokens, then spacing and edges, emphasis,
cards to layout, states, copy, motion, looking after each; stop when the brief is met.

## Before you hand over

Write the "Check" section of `DESIGN.md`, then close your tabs, stop the servers you started
and delete the shots.

```md
## Check
Gold: <example> (what you kept, what you changed)
Looked at: 1440, 820 and 390, light and dark, reduced motion, every control
Check: <the last line of check.mjs, pasted>
Review: <each finding> → <fix, or why it stands>
Not checked: <what you didn't see: a real phone, a slow network, a browser>
```
