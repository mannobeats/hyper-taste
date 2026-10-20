---
type: llm
focus: { source: file, path: page.html }
---

PASS if the greeting with the emoji and the gradient card are gone, the screen leads with the day's sailing answer (wind and when it's good to sail) shown as data rather than four equal stat tiles with percentage pills, the main action (booking a boat) is a labeled button rather than a floating + button, the tab bar has 3–5 items with labels of at least 10px where only the active item is colored or filled, and the content is padded so the tab bar never covers it.
FAIL if "Good morning" with 👋 or the gradient hero card remains, the stat tiles still carry trend pills like "↑ 12%", or every tab icon is filled in the same color.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
