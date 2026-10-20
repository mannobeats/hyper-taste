---
type: llm
focus: { source: file, path: page.html }
---

PASS if the carousel of claims is replaced by a step that asks the user something that changes the app (for example their light, plants or experience), with tappable answers of at least 44px, a visible progress indicator, a way back or a way to skip, and one primary button; marketing copy like "AI-powered" and "like never before" is gone.
FAIL if the screen is still a welcome slide with an emoji illustration, carousel dots and a Next button, or still contains "AI-powered" or "like never before".
Also FAIL if the screen animates in on load (an entrance keyframe, a staged fade or slide of the screen's own content when the page opens; a menu, popover, toast, sheet or dialog that rises from its edge or trigger when it appears is fine; on this screen, one entrance under 700ms that plays once is also fine), if any hover or press transition lasts longer than 220ms, or if a fixed-height chip, pill, tab or element styled as a button does not center its label (a native <button> centers its text by itself and passes; anything else needs flex or grid centering), or if any label is clipped or touches its edge.
Also FAIL if a status pill or chip has a dot inside it, a label is uppercase with letter-spacing, or numbers in stats, tables or aligned columns lack tabular-nums.
