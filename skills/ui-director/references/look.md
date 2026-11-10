# Look at it

Code that looks right can render wrong. Look like a visitor, and fix from what you saw, never
from the code. Use whatever your harness gives you to open the page and take screenshots: a
browser tool, Playwright, a simulator, computer use. Browser tools are often deferred; search
your tools for "browser", "screenshot", "preview" or "playwright" before deciding you have none.

## What to look at

Fix the largest visible fault first (composition, then hierarchy, then motion, then polish), and
look again after each round. Two rounds at least.

1. **The first screen at desktop width.** Is the picture the largest thing? Could this be any
   product in its category? If yours is the emptier, flatter, busier or more generic version of
   what you meant, that is the fix.
2. **The whole scroll**, as a visitor scrolls it: scenes, pinned sections, fixed bars, reveals
   that fire.
3. **Tablet and phone widths:** each its own composition, nothing covered, nothing cut.
4. **Dark** at every width, and **reduced motion**.
5. **Every control once:** hover, focus, click, type, the keyboard path; and the console.
6. **Text on a photo or scene**, zoomed in: where a bright patch sits behind a word, deepen the
   shade on that side or move the picture.

## A fresh eye

The builder can't see its own work; it remembers what it meant. Before handing over a page that
sells or a new app screen, start a subagent with only the screenshots, a one-line brief and the
prompt below. Not your direction, not your reasons. With no subagent, read the screenshots cold
before you read your code again. (Adapted from Stageshow's review brief, Benji Taylor, MIT.)

> You are reviewing an interface someone else built, from its screenshots and a one-line brief.
>
> First: **could this be any product in its category?** A headline that fits a competitor, a
> palette from the category, a template layout: each is a finding, ranked first.
>
> Then look the way the most exacting designer you know would:
> 1. **Composition:** anything covered, cut or floating? Is the picture the largest, sharpest
>    thing on the first screen? Does the phone have its own composition?
> 2. **Hierarchy:** what does the eye land on first, and is it the point? One primary action?
> 3. **Craft:** labels touching edges, uneven padding, edges 1–3px apart, too many control
>    heights, weak contrast, two icon sets, sizes that don't form a scale.
> 4. **Slop:** violet glow gradients, icons on tinted circles, dots in pills, emoji as icons,
>    invented testimonials or logos, placeholder names, buzzwords, the template dashboard.
>
> Return a ranked list, worst first: what you would screenshot, which screenshot shows it, the
> fix in one line. Say what you could not judge. If there is nothing, say "nothing" and list
> what you looked at.

Answer every item: fix it and look again, or write in `DESIGN.md` why it stands. A finding the
builder calls intentional is judged again on the screenshot, not on the intention.

## Redesigns and audits

**Audit:** at most five findings, worst first, each with its screenshot and the smallest fix.
Change nothing unless asked.

**Redesign:** keep URLs, nav labels, field names and order, the logo, legal copy and analytics
hooks. Fix tokens, then spacing and edges, emphasis, cards to layout, states, copy, motion,
looking after each. Stop when the brief is met.

| You see | Instead |
|---|---|
| Everything centered | Left-align what people read in order; center only a short headline stack |
| Sections in cards, cards in cards | One surface split by lines and headings |
| Three equal feature cards | A grid of product states: one hero tile, a number, a component |
| The same composition section after section | Change form and pace: full-bleed, a tight list, one huge number |
| Nothing bigger than a polite headline | Scale the one thing you're proudest of until it feels too big, then pull back |
| A screenshot in a frame on a glow | The product rebuilt in code at real size |
| Only fade-ups | Motion that acts out the product |
| Categories as shades of one color | Different hues at one lightness; neutral by default, color for meaning |
| Pure black text, dark mode by inverting | Gray text levels, a designed dark palette |
| A label far left, its value far right across a wide row | Natural widths, more columns |
| Two equal buttons; a modal for everything | One primary per view; popovers, drawers, inline editing |
| A component library's default look | Its variables mapped to the product's tokens |
| Ten fixes, and the screen looks the same | Stop and get a fresh eye |
