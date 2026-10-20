---
type: llm
focus: { source: file, path: page.html }
---

PASS if default values are shown in a neutral style and color is used for at most one value (one that differs from the default) or none, and the toggle uses the accent only while it is on (selected is one of the meanings the skill allows).
Also require that the values are quiet text or neutral chips without a decorative icon in front of each value.
FAIL if all values still share the same saturated blue chip style, or every value still carries its own icon.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
