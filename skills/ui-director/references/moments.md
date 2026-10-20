# Moments

Read this for any app, on a phone or the web, and whenever you design its first run, waits,
paywall, success or failure screens. Clean screens are the floor now; anyone can ship them.
People remember a product by a few moments, mostly its best one and how it ends, and judge it
premium by the evidence they collect there.

## Find the moments

- **Map the core flow** from install to the job done. Mark where people wait, where stress peaks,
  and where they already come back on their own (the summary ready after the meeting, the result
  after the upload). Write them into `DESIGN.md` under "Moments" before designing screens.
- **One peak, one end.** The peak sits on the core moment: the right listing found, the plan
  built in front of them. The end closes the flow with what was done and what's next. Most apps
  just stop; that's the moment they miss.
- **The screen people come back to is the best screen in the product,** never a block of text
  and a "See full" link.

## Build the peak

- **Let them do it.** A reveal they perform (pull, peel, flip) beats one they watch. A small
  bounce shows the gesture before any instruction does.
- **Pay off on two senses:** motion plus a haptic tap or a sound, on confirm only.
- **Name what they got:** the first entry, the record, the milestone, not just a check mark.
- **Put the next step inside the peak** (book the next session, start tomorrow's lesson), not on
  a screen that comes later.
- **Fit the person.** Tone is a dial set by the subject: therapy is neither clinical nor cute,
  money is calm and exact, a game can be loud. Small wins get small reactions; save the big one
  for a real milestone.

## First run

- **Default to the shortest path to value:** sign in, the one permission the core feature needs,
  then the core action. Ask for everything else when it's needed.
- **A long onboarding only when every answer shapes the first screen,** and then build the result
  in front of them from those answers.
- **The first try never dead-ends.** A test too short to count still produces something: a sample
  result, a preview of what they'll get.
- **Each step shows where they are** (2 of 4, or a bar) and has a Back link after the first.
- **Teach with cues, not tours:** a grabber, a card peeking from the edge, a hint of motion.

## Waits

- **Name each step while it works** (Uploading, Transcribing, Summarizing) with real progress,
  never a bare spinner past two seconds. On phones, a Live Activity or the Dynamic Island keeps
  it with them after they leave the app.

## Paywalls and any screen that asks for money

- **After they've felt the value,** never before the first result.
- **Say exactly what happens to their money:** when they're charged, how much, how to cancel. A
  trial shows its timeline (today full access, day 5 a reminder, day 7 the charge) and says
  "Nothing to pay today" in plain words.
- **One plan, two at most,** the recommended one first and selected, with a close button you can
  see and Restore. No side options (credit packs, add-ons) that turn one choice into a comparison.
- **Their language and currency.** Never blur the person's own content as bait.

## Progress and rewards

- **Show real progress:** a ring or bar filling toward a goal they chose, personal records, a skill
  level. Not points, badges and global leaderboards that only count how often the app was opened.
- **Streaks with agency:** they set the goal and can pause it. A missed day is neutral, not red.
- **No shame anywhere:** a missed target adjusts the plan instead of turning the number red.
- **Small, winnable comparisons** (this week, a local group) over one global board.

## Rethink the screen

- **Question what the category assumes.** A list of text rows is wrong for people who struggle to
  read lists: draw a timeline of blocks. Typing a meal is wrong when the camera can see it: make
  the camera the home screen.
- **Shortest line to the outcome:** cut the steps software can do for them. Keep the interface
  visible where people compare, scan and judge.
- **Design for the real situation of use:** half asleep, one hand, in a meeting, on a train. An
  alarm that only stops once you've moved; big targets when hands are busy.

## Native feel

- **Physics:** content rubber-bands at the ends, flings with momentum, sheets follow the finger
  and settle on a spring.
- **Continuous corners:** the platform's own shapes on iOS; `corner-shape: squircle` on the web
  where it's supported.
- **Haptics** on confirm, success, error and snapping into place. Never on every tap.
- **Frequent actions** a tap or two away, in the same place on every screen.
- **Screens connect:** a detail grows from the item tapped, a sheet rises from its edge. Never a
  hard cut between related screens.
