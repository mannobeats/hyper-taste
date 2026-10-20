---
type: llm
focus: { source: file, path: page.html }
---

PASS if the list has a natural width of at most 640px (a max-width or fixed width on the list or its container), so each task sits near its date, instead of stretching across the viewport.
FAIL if the list still stretches to the full page width with dates pushed to the far right edge, or its width or max-width is above 640px (for example 680px or 800px).
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
