---
type: llm
focus: { source: file, path: page.html }
---

PASS if the screen shows the product or its result rather than a checkmark list of 6+ features, offers one clear plan (or at most two) without BEST VALUE/POPULAR badges or struck-through prices, states the price and when the trial ends and charges in readable text (at least 13px), has a clearly visible close button and a restore option, and drops the full-screen gradient.
FAIL if the three-plan grid with badges remains, the price is still only in 9–10px fine print, or the close control is still faint.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine; on this screen, one entrance under 700ms that plays once is also fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
