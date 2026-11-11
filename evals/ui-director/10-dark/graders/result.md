---
type: llm
focus: { source: file, path: page.html }
---

PASS if pure black backgrounds and pure white text are replaced by dark grays with lighter raised surfaces, borders are visible, text uses at least two lighter-to-dimmer levels, and the accent is softened; the near-full usage is shown with a warning color rather than pure red.
FAIL if the background is still #000 and text is still #fff throughout, or the bar is still pure #ff0000.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
