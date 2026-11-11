---
type: llm
focus: { source: file, path: page.html }
---

PASS if the button that removes the workspace is red (or uses a red/danger color token), its label names the action (for example "Remove workspace", not "Yes"), the cancel option is a neutral button, and the dialog says what will be lost.
Also require the dialog to be left-aligned with the actions at the bottom right, with no warning icon in a tinted circle, and the title to name the workspace ("Remove Northshore?" or similar).
FAIL if the remove button still uses the brand purple, is labeled "Yes", the dialog still asks a yes/no question without saying what is lost, the text is centered, or a warning icon sits in a colored circle.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
