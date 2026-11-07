# Mobile: phone apps

For a phone app's screens, on the web or native: home, lists, detail, forms, onboarding, paywalls,
success and failure. Read `app-ui.md` too, for states, controls and moments. The gold is
`examples/phone-app.html`; open it at 390 wide. `teaching/19-phone` shows a table becoming phone
rows.

## The direction block

Write it into `DESIGN.md` before any code.

```
App: <product>, for <who>, doing <the primary job>, <how often, where: one hand, on a train, half asleep>.
They open it asking: <question>. The answer, in one line: <…>.
Key object: <the session, the booking, the day's wind> and its states.
Moments: <the peak>, <how the core flow ends>, <the screen they come back to>.
Platform: <iOS | Android | both, one language per app>. Gold: <the example you start from>.
Obvious version: <the screen any model builds for this>.
Palette: <neutrals, the accent from the user's world, what red means>. Type: <family>.
Sample world: <one person, their real-looking data>.
```

## The first screen answers the question

- **The answer as the title or the first line:** "7 sends, hardest a V5", "Sail from 11 to 3".
  Not a greeting, not four stat tiles.
- **Then the key object, drawn:** the day's wind hour by hour, the grade pyramid, the week's
  bookings. The largest thing on the screen.
- **Then the list people act on,** with the one action that matters on each row.
- **One primary action,** labeled, in the bottom third where the thumb is. Never a floating
  button over content.

## Anatomy and sizes

Design at 390 × 844 (check 375 and 430). All sizes in points.

- **Safe areas:** content clears the status bar (about 54 on a phone with an island) and the
  home indicator (`env(safe-area-inset-*)` on the web, `viewport-fit=cover`). Nothing sits under
  the island; a sheet or grabber starts below the status bar.
- **Side margins** 16–20. Rows 56–64 for a two-line row, 44 minimum for any target.
- **Type:** body 15–17, secondary 13, captions 12 (11 the floor, tab labels only). Large titles
  34 bold, collapsing to 17 in the nav bar on scroll. Inputs 16 or more on the web, so iOS
  doesn't zoom.
- **Tab bar:** 3–5 sections, 49 plus the safe area, outline icons at rest and the filled one for
  where you are, labels 10–11 in the ink step that passes contrast (the accent at 600 often
  doesn't).
- **Nav bar:** the back button names the previous screen; one or two icon actions on the right.
- **Sheets** for secondary tasks, with a grabber and medium and large detents; a full screen only
  for a real separate task. Never a centered modal on a phone.
- **Lists** are rows, not cards: grouped by what needs attention, two lines each (who and how
  much, then the detail), separators inset to the text.
- **Keyboard:** the right `type`, `inputmode` and `autocomplete`; the primary action stays above
  the keyboard; Return moves to the next field.

## Platform conventions

- **iOS:** SF-style glyphs, large titles, inset grouped lists, sheets with detents, swipe actions
  on rows, the system's blue only when the app has no accent. A messaging app keeps Messages'
  conventions unless the brief gives it a look.
- **Android:** Material 3 navigation bar, top app bar, a FAB only for the one creation action,
  bottom sheets, Material Symbols.
- **One language per app.** Don't mix iOS sheets with Material chips.
- Platform conventions are the product's chrome, not placeholders: a banner at its true size, the
  status bar from the system or a faithful copy, never redrawn with invented proportions.

## Native stacks

SwiftUI, Compose, React Native: the system pieces first (`TabView`, `NavigationStack`, `.sheet`,
SF Symbols; Material 3), restyled with the tokens (`system.md`, Native). Springs with no bounce
in UI (`.smooth`, `.snappy`; Compose `dampingRatio = 1f`), a drag handing its velocity to the
spring. Haptics on confirm, success and error only. Check the largest Dynamic Type size; if text
feels small, cut or split the screen, don't shrink the text.

## Motion on a phone

- Things come from where they live: a detail grows from its row, a sheet from the bottom edge,
  and goes back the same way.
- A swipe throws at the finger's speed and the gap closes in one ease; nothing snaps.
- No entrance animation on screens people open many times a day; the peak moment gets the motion.

## Showing a phone app on a page

When the job is the app's landing page, the phone is the hero: `product-shots.md`, Phones in a
page. Real proportions, the crop under the content, the notification the app sends over empty
screen, never over a row.

## Done means

- [ ] The first screen answers the question in one glance; the key object is the largest view.
- [ ] One primary action, labeled, in thumb reach; no floating button over content.
- [ ] 44pt targets, 16pt inputs, text 11pt or more, safe areas respected, nothing under the island.
- [ ] Every list has empty, loading and error; every action ends with a named result.
- [ ] The peak, the end and the screen they come back to are designed (`app-ui.md`, Moments).
- [ ] Dark is designed and checked; `scripts/check.mjs` passes at 390 (or the simulator
      screenshots are seen, for a native app).
