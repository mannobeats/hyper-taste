---
type: llm
focus: { source: file, path: page.html }
---

PASS if the card is no longer a centered stack: name, bio and meta are left-aligned, the actions are reduced to a few (a primary like hiring or following, a secondary, and the rest behind icons or a menu) placed in a row aligned to an edge, and the stats sit in an aligned row or grid.
Also require that the avatar shares a line with something (the name, or the actions), so it is not a centered circle alone on its own row, and that the stats are not centered under uppercase tracked labels.
FAIL if the content is still centered with text-align: center (including centered stat cells), the stat labels are uppercase with letter-spacing, the avatar sits alone on its own row, or seven or more buttons still wrap into multiple rows.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
