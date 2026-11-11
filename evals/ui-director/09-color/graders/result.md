---
type: llm
focus: { source: file, path: page.html }
---

PASS if the gradient background and the saturated per-file card colors are gone, file cards are neutral, and color remains only where it carries data (the storage bar segments by type).
Also require that the storage section is not a tinted box inside the panel (it is split from the file list by a hairline or space), and that the storage types use clearly different hues, not shades of one hue, since they are categories.
FAIL if file cards still have saturated colored backgrounds with white text, the panel background is still a gradient, the storage block is a tinted or bordered box nested inside the panel, or the bar segments are lighter and darker shades of a single hue.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
