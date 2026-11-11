---
type: llm
focus: { source: file, path: page.html }
---

PASS if the nested boxes are gone: fields are laid out as label/value rows or a definition list on one surface, sections are separated by headings or thin lines, there is no card inside a card, and the all-caps tracked field labels are gone.
Also require that the one unusual value, the Trial contract, is the only value marked with color (a colored chip or text); every other value stays plain ink.
FAIL if the layout still has field boxes inside a box inside a card, or uppercase letter-spaced labels, or if Trial is not marked, or other values are colored too.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
