# Motion

Every timing in this skill lives here. Motion makes cause and effect visible and leads the
eye; on a page that sells it also shows what the product does. The working code for entrances,
reveals and scenes is in the golds (`.enter`, `[data-reveal]`, `.stage`).

## Rules

- **Every animation has a job:** confirm an action, show where something came from, show a
  change in the data, lead the eye, or act out the product. "It looked static" is not a job.
- **Responses are fast:** hover, press, toggle and tab 140–220ms.
- **Arrivals are slower, once:** a selling page's entrance and reveals 0.9–1.3s; app layers
  160–200ms in, 120ms out. Nothing in app UI runs past 800ms.
- **Ease out** (`cubic-bezier(.16, 1, .3, 1)`) for arriving and responding; ease in-out for
  something on screen moving to a new place; linear for progress and loops; springs on native.
- **The temperament follows the voice** (`voice.md`): masks and soft blur for Precise, slow
  plain fades for Editorial and Still, steps and typing for Technical, cuts and wipes for Loud.
- **Things come from where they live:** a menu grows from its button, a sheet from its edge, a
  detail from its row, and goes back the same way. Transitions, not keyframes, so they reverse
  midway.
- **Only `transform`, `opacity` and `filter`** (plus colors). Never width, top or margin. The
  one exception is a row or panel making room: its own `grid-template-rows` from `0fr` to `1fr`,
  or its height with `interpolate-size: allow-keywords`, never a whole layout.
- **Loops** only for loading, the film, and at most two ambient touches, all paused offscreen
  and still under reduced motion.
- **Content never waits:** everything shows without JavaScript, the headline is legible within
  about 400ms, and reduced motion keeps color and opacity feedback and drops movement.

## Changing values and neighbors

- **Content that changes moves; it never swaps in one frame.** A label or number rolls in a slot
  sized to the longer of the two. A button keeps its width and changes its own label.
- **Animate the relationship, not just the object.** A new row carries the rows below it; a
  resizing surface moves size, position and content as one transition, and its text never
  stretches.
- **Exits get their time:** keep what leaves mounted for its exit, then remove it.
- **Interrupted motion retargets** from where it is; re-keying an entrance restarts it.
- **A changing state has a cause:** data never rewinds in view without one.

## Pages that sell

1. **Feedback on every control,** a pressed state at `scale(.98)`.
2. **One entrance for the first screen, the only motion that starts hidden:** headline first,
   then line, actions and the visual, 40–110ms apart, in the voice's temperament. It runs in
   CSS, so it plays without JavaScript. The headline may rise line by line or word by word;
   never letter by letter.
3. **Reveals once, below the fold:** only elements JavaScript marks pending are hidden, and only
   those that start below the fold; children 60–80ms apart.
4. **Reveals that act out the content** where they explain it: bars grow from the baseline, a
   line types itself, a list fills a row at a time, a real number counts up once over 1.2–1.8s
   in tabular figures.
5. **The signature:** the film, the control to try or the scene, the most ambitious motion on
   the page. Pointer effects: at most one per screen, eased toward the pointer, fine pointers
   only.

## App UI

- **No entrance** on screens people open often (dashboards, lists, settings, inboxes, a phone
  app's home): on screen the moment they load, no staged cards, no counting numbers.
- **Instant** for what people do many times a day: command menus, context menus, tab and
  sidebar switches.
- **State changes in place:** a filter reflows (FLIP or `document.startViewTransition`), a
  segmented highlight slides, a saved icon fills.
- **Layers** fade and scale from .96 toward their trigger, in and out with no JavaScript:

  ```css
  [popover], dialog { transition: opacity 160ms, transform 160ms cubic-bezier(.16, 1, .3, 1), overlay 160ms allow-discrete, display 160ms allow-discrete; }
  [popover]:not(:popover-open), dialog:not([open]) { opacity: 0; transform: scale(.96); }
  @starting-style { [popover]:popover-open, dialog[open] { opacity: 0; transform: scale(.96); } }
  ```

- **Tooltips** wait about 500ms the first time, then show at once along a toolbar.
- **Real waits** get progress or a skeleton; a result too fast to believe gets a short
  confirming moment. Entrances belong to moments people see once: onboarding, a success.

In a framework, run reveals inside the component (a hook, `onMounted`, a Svelte action) so
content that mounts later still reveals, and use the project's animation library with these
timings instead of adding another.
