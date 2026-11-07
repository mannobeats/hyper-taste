# Look at it

Code that looks right can render wrong: a font that never loaded, a window over the headline, a
status cut by a crop, a desktop layout shrunk onto a phone, a reveal that never fires. Look like a
visitor, measure what eyes miss, and fix from what you saw, never from the code.

## The check

`scripts/check.mjs` in this skill does the routine part in one command, with no dependencies
(Node 22 and a Chrome, Chromium, Edge or Brave on the machine):

```sh
node <skill>/scripts/check.mjs http://localhost:4321/ --out shots
```

It opens the page headless at 1440, 820 and 390, light and dark, then once with reduced motion;
screenshots the first screen and the whole page; scrolls so every reveal fires; runs
`scripts/page-check.js` at the top and after the scroll; and prints two lists:

- **Fix** lines are never intentional: sideways scroll, a font that didn't load, contrast,
  `covered` words, words `cut by the crop`, clipped text, tiny text, small tap targets, cramped
  labels, words too close to a card's edge or spilling out of it, an `empty band` between
  sections, an `off-center` column or button group, `unbalanced` cards, an `empty pane`, a card
  that `touches the edge` of its section, content `never shown`, console and load errors, and
  the slop from "Never" (dots in pills, icons on tinted shapes, emoji, buzzwords, placeholders,
  an invented logo, sparkles, violet gradients, mixed icon styles, arrows on buttons).
- **Judge** lines are leads: habit fonts, all caps, tracking, two-fragment headlines, type and
  control-height counts, loose lists and fat rows, uneven padding, invented-looking proof.

The last line is `check passed` only when no Fix line is left. Clearing a line by hiding,
removing or shrinking the thing it points at is a bug. A passing check is necessary, not
sufficient: it can't see the obvious version, a weak idea or a bad crop of a photo. **Open every
screenshot it writes**, then delete the shots folder when you're done.

The dark pass emulates `prefers-color-scheme`. A project that only switches dark mode with a
class or an attribute needs that toggled too: use your browser tool for the dark look.

## When the check can't run

Use the browser your harness gives you: a built-in browser, a browser or Chrome MCP server, a
preview tool. These are often deferred tools that stay hidden until you search, so search your
tools for "browser", "chrome", "preview", "screenshot" and "playwright" before deciding you have
none. Paste `scripts/page-check.js` into its JavaScript at each width and mode; it returns the
same `{ fix, judge }` lists. Failing that, headless Chrome takes a screenshot in one command:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1440,900 --virtual-time-budget=2000 --screenshot=shot.png http://localhost:4321/
```

**Serve the page over http,** with the project's dev server or `python3 -m http.server`. A
`file://` page breaks quietly: canvases can't read their images, modules and some fonts don't
load. Only when all of this fails, tell the user what you tried and exactly what to look at.

## What to look at

Every pass, in order:

1. **The first screen at 1440, beside the gold** you started from at the same width. Name the one
   difference. If yours is the emptier, flatter, busier or more generic one, that is the fix.
2. **The whole scroll at 1440:** every section, every scene played (a full-page screenshot can
   show scenes empty).
3. **The tablet at 820 and the phone at 390,** the same scroll: each its own composition, nothing
   covered, nothing cut.
4. **Dark at every width.**
5. **Every control once:** hover, click, tab, type, drag; and the console.
6. **Reduced motion:** everything shows, nothing travels.

Then judge it against `DESIGN.md` and your job's "Done means". Fix the largest visible fault
first (composition, then hierarchy, then motion, then polish) and look again: two passes at
least. A first render always has problems. Text on a photo is judged on the screenshot, where the
scrim is part of the picture: zoom into each line, and where a bright patch sits behind the
words, deepen the scrim on that side or move the photo.

## What you see, what you do

| You see | You do |
|---|---|
| A window or card over the headline or the button (`covered`) | Start the window a column past the words, or below the action; move the satellite over chrome or empty screen |
| A status, date or button sliced by an edge (`cut by the crop`) | Move the window or change its columns so the crop falls on filler; at the bottom, crop between rows |
| 4–8px type at 390 (`tiny text`) | A phone composition: the key panel at a 360–400px design width, two-line rows |
| A small window boxed in a frame | 80% of the content width or more, rising from the fold; in a tile, bleed it off an edge |
| A paragraph on the first screen | One line of 14 words at most; the rest goes or becomes the picture |
| A pane that ends in a void, rows spread to fill it | Crop under the content, or add product; never spread the rows |
| Gray bars where the eye lands | Words there; filler stays at the edges |
| Text 3–7px from a card's edge (`tight inset`) | 12px of padding, or let the content run off with the crop |
| A link or tab label at 4.2:1 | The accent's ink step (700 in light) for small text |
| A section that stays blank (`never shown`) | Its reveal never fires: the observer, the threshold, or content waiting on JavaScript |
| Your page is the gold with a new name | Change the idea, the headline, the picture and the palette from the product's world |
| Ten fixes, the check green, the screen unchanged | Stop and get a fresh eye (`review.md`) |

## Before you hand over

Write the "Check" section of `DESIGN.md`:

```md
## Check
Gold: <example> (what you kept, what you changed)
Looked at: 1440, 820 and 390, light and dark, reduced motion, every control
Check: <the last line of check.mjs, pasted>
Review: <each finding> → <fix, or why it stands>
Not checked: <what you didn't see: a real phone, a slow network, a browser>
```

Close your tabs, stop the servers you started and delete the shots.
