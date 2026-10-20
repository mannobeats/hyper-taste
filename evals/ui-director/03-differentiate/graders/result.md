---
type: llm
focus: { source: file, path: page.html }
---

PASS if tasks are grouped by when they're due (for example Tomorrow / Next week) and at least two of these are used: people shown with an avatar or initials, categories shown as chips, due dates shown as separate right-aligned values.
FAIL if each task is still one long sentence containing the person, category and due date in plain text.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
