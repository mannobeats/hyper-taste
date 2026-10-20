---
type: llm
focus: { source: file, path: page.html }
---

PASS if the failure says in plain words what happened (the card was declined), says that nothing was charged or that the booking/table is still held, offers a clear next step as the primary button (for example use another card) plus at least one alternative (retry, another method or contacting the restaurant), keeps the booking context instead of a blank dead end, and shows no raw error code.
FAIL if the page still shows "Error!", the code "402" or "card_declined" to the user, or a single OK button as the only way forward.
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
