---
type: llm
focus: { source: file, path: page.html }
---

PASS if the bar shows a selection count and the main actions have text labels, keeping icon-only buttons only for universally known actions such as delete or a more menu, and less common actions move into a menu or are removed.
Also require the bar to keep at most about six visible controls after the count (three or four labeled actions plus icon-only Delete and More), with rare actions such as Auto-sort and Make private moved into the More menu.
FAIL if most actions are still icon-only without visible labels, or if every action is now a labeled button in the bar (seven or more visible actions, no More menu).
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
