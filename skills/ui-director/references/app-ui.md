# App UI: dashboards, tools and phone apps

For admin panels, analytics, CRMs, tables, settings, detail pages, phone apps, and an app's
onboarding, waits, paywalls, success and failure. The layout comes from the job this product
does; the template (greeting, four stat cards, a chart, a table) is the obvious version.

## The direction block

Write it into `DESIGN.md` before any code.

```
App: <product>, for <who>, doing <the primary job>, <how often>. They open it asking: <question>.
Key object: <the invoice, the take, the shift…> and its states.
Moments: <the peak>, <how the core flow ends>, <the screen they come back to>.
Needs attention: <what must jump out, and the one color it gets>.
Actions: primary "<label>"; frequent <…>; rare <…>; destructive <…>.
Density: <calm | standard | dense>, because <…>. Shell: <sidebar | top tabs | queue and detail | canvas>.
Obvious version: <the screen any model builds for this>.
Directions, each from one thing in the user's world (a ledger, a board, a score, a map):
  A. <the thing>: <what the first screen shows and how> / <palette> / <type>
  B. …
  C. …
Pick: <letter>, because <one sentence>.
Signature: <the key object drawn so the answer is visible at a glance>.
Palette: <neutrals and tint, the accent from the user's world, what red means>. Type: <family>.
Sample world: <one team or person, their real-looking data>.
First screen: <what the user learns in one glance, in one sentence>.
```

What worked in testing: open invoices drawn as one bar split at "today"; a drum step key that
lights as loud as its hit; a take's waveform with the removed room noise drawn as grain. Each
belongs to its product.

## The first screen answers the question

- **The answer first, in words and numbers:** "€4,120 is overdue across 3 invoices" beats three
  cards the reader has to add up. One or two big figures, each with its context line.
- **Then the key object as a view,** the largest thing on the screen: the queue, the board, the
  strip, the map.
- **Then the work:** the list people act on, with the frequent action on each row.

## The shell

- **Many sections:** a sidebar. **3–5 views of one thing:** tabs in the top bar. **A queue:** a
  list with the selected item beside it. **One focused job:** one column or a canvas.
  **Monitoring:** the few numbers that need action first.
- **One surface:** side panels on `panel`, the main area on `surface`, a 1px `line` between;
  headings and hairlines group things, not a card per section.
- **Sidebar:** workspace switcher, search, 4–6 main items with muted icons (the active one on
  `hover`), small sentence-case group labels, settings and help at the bottom.
- **Top bar:** breadcrumbs left; sync status and icon buttons with tooltips right.
- **Page title** without a subtitle explaining it.
- **One primary per view,** the darkest button, in the page header or the toolbar, never both. A
  monitoring screen with no main action has no dark button.
- **Natural widths:** lists, settings and forms 360–600px; wide screens get another column.

## Let the data decide the form

- **Tables:** fixed sets become neutral chips. States are words: plain for the ordinary (Paid,
  Sent), a tinted chip only for the one that needs action (Overdue). Numbers right-aligned and
  tabular, text left, IDs muted in mono. Long text truncates with a tooltip (wraps on touch).
  People get a face. Headers quiet: 12px, `ink-3`. First and last columns flush with the edges;
  hover actions sit just before a final amount column, or last when the row ends in text.
  Inactive rows fade to `ink-3` and keep 4.5:1.
- **Time:** events over time are a timeline grouped by Today and This week, not a table.
- **Charts:** categories get different hues at one lightness (the chart tokens); one hue's
  shades only for an ordered scale. The current series solid, the comparison a tint; few
  gridlines, about 3 y-axis labels, a hover tooltip instead of a legend block (a one-line key
  that states the totals is fine).
- **Stats:** a muted 13px label, a 600 tabular value, a context line. Color only the value that
  needs attention; the stats can double as the chart's tabs.

## Show the right things, reveal the rest

1. The page's one primary action: a labeled button, always visible.
2. Frequent tools: icon buttons with tooltips, icon-only only for icons everyone knows (delete,
   more, close, search, share). A bar shows 3–4 labeled actions plus More.
3. Row actions on hover or focus (swipe or long-press on touch).
4. Share, filters and date pickers in popovers; rare actions in the `…` menu, destructive last.
5. A new page only for a real separate task; drawers and inline editing for the rest.

## The invisible states

- **Tooltips** on every icon-only button and truncated value.
- **Empty:** one line on what goes here, plus the action that fills it.
- **Loading:** skeletons shaped like the final layout.
- **Errors:** inline, next to the cause, with a way to recover.
- **After every action:** a toast naming the result, Undo for anything not destructive.
  Destructive actions are red, never one click away, and name what's lost.
- **One pattern per situation:** a limit reads the same everywhere ("2 of 3 used, resets 1
  November"). Failures get the care of successes: a failed payment says what happened, that the
  money is safe, what to do next, and has a contact button. Offline says what still works.
  Break it on purpose before you ship: go offline mid-flow, fail a payment, empty every list.
- **Flows:** ask for the minimum, branch on answers, show 2 of 4, Back after the first step.
- **Hover, focus-visible, active, selected and disabled** on every interactive element.

## Controls that hold their shape

Most "it looks off" is here. Check each in the browser at every width, light and dark.

- **Nothing touches its edge:** text at least 10px inside any pill, button or highlight, never
  under an icon. A label that doesn't fit gets shorter, never clipped.
- **Centered labels:** single-line controls get `line-height: 1` and `align-items: center`; an
  inherited body line height sits the text a pixel high.
- **Segmented controls** size options to their labels; the highlight sits exactly on its option.
- **Dropdowns:** one chevron for the product, centered on the text line and inset by the text's
  own padding; native selects get `appearance: none` and that chevron.
- **Descenders:** line height 1.2 or more on anything that clips.
- **One height scale** of 3–4 control heights, as tokens.
- **Sizes don't move between states:** a button keeps the width of its longest label (Follow,
  Following); icons sit in a square box, one size for the set.
- **Floating bars never cover content;** the scroll area pads by the bar plus the safe area.
- **No browser defaults left:** sliders, checkboxes, radios and selects styled with the tokens.
- **Only what the person knows:** no hashes, internal IDs, error codes or enum names on consumer
  screens. Each person and business gets its own picture.

## Density and dark

- Base text 13–14px, meta 12px, mono one step smaller than the sans beside it.
- Rows 40–48px (56px+ on touch), toolbar controls 28–32px.
- Dark: one line color, hover about 5% white, selection 10%, the accent's lighter step,
  headings at 500–600 (heavier looks muddy on dark).
- A wide table scrolls inside its own wrapper; grid children get `min-width: 0`.

## Phones and responsive

- Design at 1440, check 1024, 768 and 390 as you go.
- Below about 720px every multi-column layout becomes one column, in the same component.
- Tables become two-line rows: who and how much, then date and status as plain text.
- The sidebar becomes a drawer; nothing important is hover-only.
- Body and inputs 16px with the right `type` and `inputmode`; `min-height: 100dvh`; side
  padding 16px; targets 44×44px; primary actions in the bottom third; fixed bars respect
  `env(safe-area-inset-*)`.
- **Patterns:** a tab bar for 3–5 sections (outlined icons, filled when active); stack
  navigation whose back button names the previous screen; large titles that collapse; sheets
  with a grabber for secondary tasks; lists with 56–64px rows. One platform language per app.
- **Native** (SwiftUI, Compose, React Native): the system pieces first (`TabView`,
  `NavigationStack`, `.sheet`, SF Symbols; Material 3), restyled with the tokens. Springs with
  no bounce in UI (`.smooth`, `.snappy`; Compose `dampingRatio = 1f`), a drag handing its
  velocity to the spring. Sheets with medium and large detents. Haptics on confirm, success and
  error only. Check the largest Dynamic Type size.

If text feels small, the screen isn't finished: cut or split it, don't shrink the text.

## Moments

People remember an app by its best moment and how it ends. Write the moments into `DESIGN.md`.

- **The peak** sits on the core job (the plan built in front of them, the take that sounds
  right). Let them perform it (pull, flip, press) rather than watch it; pay off with motion plus
  a haptic or sound on confirm; name what they got; put the next step inside it.
- **The end** closes the flow with what was done and what's next. The screen they come back to
  is the best screen in the product.
- **First run:** the shortest path to value (sign in, the one permission the core needs, the
  core action). A long onboarding only when every answer changes the first screen, and then
  build that screen in front of them. The first try never dead-ends: a sample result, a preview.
- **Waits** name their steps (Uploading, Transcribing, Mixing) with real progress; never a bare
  spinner past two seconds.
- **Money:** a paywall comes after they've felt the value. It says when they're charged, how
  much and how to cancel; a trial shows its timeline and "Nothing to pay today". One plan, two
  at most, a visible close, Restore. Never blur their own content as bait.
- **Progress:** toward a goal they chose; streaks they can pause; a missed day is neutral, never
  red. Small, winnable comparisons over one global board.
- **Question the category:** a list is wrong for people who struggle to read lists, typing a
  meal is wrong when the camera can see it. Design for the real situation: one hand, half
  asleep, on a train.

## Done means

- [ ] The first screen answers the question in one glance; the key object is the largest view.
- [ ] Nothing from the obvious version or "Never" in `SKILL.md`.
- [ ] Every control has hover, focus, active, disabled; every list has empty, loading, error.
- [ ] The peak, the end and the screen they return to are designed.
- [ ] Phone (390): no sideways scroll, two-line rows, 44px targets, 16px inputs.
- [ ] Dark is designed and checked; the page check in `look.md` is clean or explained.
