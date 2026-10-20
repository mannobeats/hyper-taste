# App UI: dashboards, tools and phone screens

Read this for admin panels, analytics, CRMs, tables, settings, detail pages, onboarding and any
app screen, on the web or on a phone. There's no example dashboard on purpose: the layout comes
from the job this product does.

A dashboard can look finished and still fail in use. Three things give away one that was never
used: the data doesn't shape the UI, everything is visible at once, and the invisible states were
never designed.

Start with the app direction in `SKILL.md` step 1, written into `DESIGN.md`. The best app screens
in testing each drew their key object as the signature: open invoices as one bar split at
"today", a step key that lights as loud as its hit. The template (greeting, four stat cards, a
chart, a table) is the obvious version, not a starting point. Those examples belong to their products;
find the one that belongs to yours.

## The first screen answers the question

- **The answer first, as words and numbers:** "€4,120 is overdue across 3 invoices" beats three
  cards that make the reader add it up. One or two big figures, each with its context line.
- **Then the key object as a view:** the queue, the strip, the board, the map. Make it the
  largest thing on the screen, and let it be something only this product would draw.
- **Then the work:** the list people act on, with the frequent action on each row.

## Pick the shell from the job

A sidebar over a table is one answer, not the default:

- **Many sections people move between:** a sidebar.
- **Three to five views of one thing:** tabs or a segmented control in the top bar.
- **Working through a queue** (inbox, support, review): a list with the selected item beside it.
- **One focused job** (checkout, settings, an editor): one column, or a canvas with tools around it.
- **Monitoring:** the few numbers that need action first, everything else one click away.

Whatever the shell:

- **One surface.** Side panels on `panel`, the main area on `surface`, a 1px `line` between.
  Headings, hairlines and whitespace group things, not a card around each section.
- **Sidebar, if there is one:** workspace switcher at the top, search, 4–6 items with muted icons
  (the active one gets the `hover` fill), small sentence-case group labels, settings and help at
  the bottom. Color only a count that needs attention.
- **Top bar:** breadcrumbs left; sync status, share and icon buttons with tooltips right.
- **Page title** without an explanatory subtitle, and never "Welcome back 👋".
- **Toolbar over a table:** a segmented filter with counts on the left, icon buttons with
  tooltips on the right, the one primary action ("New invoice") as the darkest button on the page.
- **One primary per view.** The top bar holds navigation, search and the account; the page's
  primary action sits once, in the page header or the toolbar, never in both.
- **Natural widths:** a settings panel is 360–560px, not 1200px. On wide screens add a column.

## Let the data decide the form

**Tables:**

- Values from a fixed set become chips: a neutral chip for categories, a tinted chip with words
  or an icon for states. Never a dot inside a chip.
- Numbers align right with `tabular-nums`. Text aligns left. IDs in mono, muted.
- Long text truncates with the full value in a tooltip. Inactive rows fade to `ink-3`.
- People get a face (an avatar). Headers are quiet: 12px, `ink-3`, sentence case. The first and
  last columns sit flush with the section edges.

**Time:** events over time are a timeline or a chart, not a table sorted by date. Group the dates
(Today, This week). A timeline fits in a right column or a drawer.

**Charts:** the current series solid, the comparison a tint of the same hue; few solid gridlines;
about 3 labels on the y-axis; a hover tooltip with exact values instead of a legend block.

**Stats:** a label (muted, 13px), a value (600, tabular), a context line. No icon circles, no
trend pill on every number: color only the value that needs attention. The stats can double as
the chart's tabs.

## Show the right things, reveal the rest

Place each control by how often it's used and how important it is:

1. an always-visible labeled button for the page's one primary action
2. an always-visible icon with a tooltip for frequent tools
3. on hover or focus for row actions (swipe or long-press on touch)
4. in a popover for share, filters, date pickers
5. in the `…` menu for rare actions, destructive ones at the bottom
6. a separate page only for a real separate task

## Design the invisible UI

- **Tooltips** on every icon-only button and truncated value.
- **Empty states:** one line on what goes here, plus the action that fills it.
- **Loading:** skeletons shaped like the final layout, not a page spinner.
- **Errors:** inline, next to the cause, with a way to recover.
- **After every action** people know what happened, can take it back and know what's next: a
  toast that names the result, with Undo for anything that isn't destructive.
- **One pattern per situation, everywhere.** A limit reads the same on every screen ("2 of 3
  used, resets 1 November"); one failure never gets two different screens.
- **Failures get the care of the success screens.** A failed payment says what happened, that
  the money is safe, what to do next, and has a contact button. Offline says what still works
  and retries on its own. A result too small to count still shows something. Before you ship,
  break it on purpose: go offline mid-flow, fail a payment, empty every list.
- **Hover, focus-visible, active, selected and disabled** on every interactive element.
- **Dense tables:** a copy button over cells on hover, a selected-row state, a bulk-action bar
  when rows are checked.
- **Drawers, popovers and inline editing** instead of new pages and modals for secondary tasks.
- **Onboarding** one step at a time: a single tip at the most important action, a quiet checklist
  in a corner. Never a six-bullet modal on first login.
- **Flows:** ask for the minimum, branch on answers (a solo user skips "invite teammates"), show
  progress and a Back link on every step after the first.

## Controls that hold their shape

Most "it looks off" comes from this list. Check every item in the browser, at every width, in
light and dark.

- **Nothing touches its edge.** Text sits at least 10px inside any pill, button, highlight or
  selected row, and never runs under an icon. A label that doesn't fit gets shorter or loses
  its icon. It is never clipped.
- **Segmented controls:** options size to their labels (`flex: 1 1 auto` plus side padding),
  not equal columns too narrow for the longest label. The highlight sits exactly on its option
  at every width.
- **Dropdowns:** one chevron for the whole product, centered on the text's line and inset from
  the right edge by the same padding as the text on the left. The value gets right padding, so
  a long one truncates before the chevron. A native `select` gets `appearance: none` and that
  chevron.
- **Labels centered on their height:** single-line controls (buttons, chips, tabs, segmented
  options, rows) get `line-height: 1` and `align-items: center`. An inherited body line height
  makes a fractional line box that snaps the text a pixel or more above center, right next to
  an icon that is centered. Zoom into a screenshot: the space above the capitals equals the
  space below the baseline.
- **Descenders:** no fixed height or `overflow: hidden` that cuts off g, y and p. Line height
  at least 1.2 on anything that clips, and equal padding top and bottom.
- **One height scale:** three or four control heights for the whole product, as tokens (for
  example 24 tags, 32 small buttons, 40 chips, 44 fields and main buttons). Every pill, badge
  and button uses one. A status on the right of a list row is plain text, not a pill.
- **Sizes don't move between states.** A button whose label changes (Follow, Following) keeps
  its width, set from the longest label. Icons sit centered in a square box
  (`place-items: center`), one size for the whole set.
- **Floating bars never cover content.** The scroll area pads by the bar's height plus the
  safe area. Labels and timestamps stay clear of side panels.
- **No browser defaults left:** sliders, checkboxes, radios and selects styled with the tokens.
- **Only what the person knows:** no hashes, internal IDs, enum names or raw timestamps on
  consumer screens. Each person and business gets its own picture, never one photo on two
  accounts. Use the words of the apps they already use; coin a word only for what's new.

## Density and dark

- Base text 13–14px, labels and meta 12px, mono one step smaller than the sans beside it.
- Rows 40–48px (touch 56px+), toolbar controls 28–32px.
- Dark dashboards: one line color, hover at about 5% white, selection at 10%, the brand's lighter
  step, weights 400–500 (semibold looks muddy on dark).
- **Faded still reads.** Inactive rows, secondary numbers and "none" values use `ink-3` and keep
  4.5:1; `ink-4` is for placeholders and disabled controls only. Measure on tinted panels.
- A wide table scrolls inside its own wrapper, never the page. Grid children need `min-width: 0`.

## Phones and responsive layouts

- Design at 1440, check 1024, 768 and 390. Test 390 every time, not at the end.
- Below about 720px every multi-column layout becomes one column, declared in the same component.
- The page never scrolls sideways.
- Tables become two-line rows: who and how much, then date and status. Drop the columns nobody
  needs on a phone.
- The sidebar becomes a drawer over a scrim. Nothing important is hover-only.
- Body at least 16px, inputs 16px (or iOS zooms), the right `type` and `inputmode` on inputs.
- `min-height: 100dvh`, never `100vh`. Side padding 16px on phones, 24px on tablets.
- Targets at least 44×44px with space between them. Primary actions in the bottom third.
- Fixed bars respect `env(safe-area-inset-*)` with `viewport-fit=cover`.

**App patterns:**

- **Tab bar** for 3–5 top-level sections, icon plus label. Icons outlined at rest and filled
  when active, drawn from the product's world when you can; the main action is a labeled button
  on the first screen, never something to discover.
- **Launch:** a first frame shaped like the first screen, so the app feels open at once. A
  splash only as a brand moment, under a second.
- **Stack navigation** for drill-down; the back button names the previous screen.
- **Large title** on top-level screens, collapsing when scrolled.
- **Segmented control** to switch views within a screen.
- **Sheets** for secondary tasks, with a grabber and a separate Cancel; destructive options red,
  naming what's deleted.
- **Lists** are the default: rows 56–64px, grouped under small muted labels.
- **Detail screens:** the key value is the headline, then a timeline and details, actions in a
  bottom bar.
- **One platform language per app:** iOS (tab bar, sheets, large titles) or Android (top app bar,
  bottom nav, FAB). Native apps use the platform's own components, styled with the tokens.

If text feels small, the screen isn't finished: cut content or split it across screens instead
of shrinking the text.
