---
type: llm
focus: { source: file, path: page.html }
---

PASS if the purple glow, gradient text, glowing pill and glass cards are gone; the headline names the concrete problem the tool solves; and the page shows real-looking product output (for example a terminal or report showing a migration that would lock a table).
FAIL if gradient text, a radial purple glow or backdrop-filter glass cards remain, or the page shows no product output. A backdrop-filter on a sticky top nav is fine; only glass cards count.
Also FAIL if the first screen is a split hero (headline and buttons in a left column, the picture in a right column), if the headline is two short clipped fragments ("X. More Y."), or if a small label or pill sits above the headline.
Also FAIL if the main visual (the product, a photo, its output, or the type itself) is small and boxed under the copy instead of carrying the first screen.
Also FAIL if the page is a static document apart from fade-ins. It needs a scroll-linked scene: a hero whose layers move at different rates, a pinned section whose content advances, a sideways rail, or a scroll-driven reveal or rotation. Also FAIL if that motion keeps running under prefers-reduced-motion.
