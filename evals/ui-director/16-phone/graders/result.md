---
type: llm
focus: { source: file, path: page.html }
---

PASS if on narrow screens the table is replaced or transformed into stacked rows (customer and amount on one line, details and status on another), primary text (customer and amount) is at least 15px, status labels at least 12px, and secondary meta such as invoice IDs at least 12px, nothing requires sideways scrolling, and nothing important is hover-only.
FAIL if the page still renders a wide table that scrolls sideways on a phone, or keeps 11px text.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
