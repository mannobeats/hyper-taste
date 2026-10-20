# Scroll: structure, depth and feeling for pages that sell

Read this with `direction.md` and `visuals.md` for any landing, launch or product page. A clean
page that scrolls like a document is the floor. A breathtaking one treats the scroll as a
timeline: each section does something different with the visitor's hand, the hero has real
depth, and one moment is engineered to be remembered.

## 1. Pick a grammar before sections

A grammar is what the page *is*: what a section is, what the navigation does, how it ends. The
palette changes how a page looks; the grammar changes what it is. Pick one, write it into
`DESIGN.md`, and keep its bans. Blending two is a filmic page with extra headings.

| Grammar | Fits | Navigation, hero, ending | Forbids |
|---|---|---|---|
| Filmic one-shot | One linear argument, a launch, a consumer product | Minimal bar; a full-bleed moving hero; a held closing frame | Visible sequence, chapter numbers, hard cuts |
| Chaptered editorial | A method, a story, research | A margin folio that updates; a title-page hero with no media; a colophon close with the action as running text | A scrubbed hero, continuous color drift, centered hero copy |
| Live surface | Software where the demo is the pitch | The product's own chrome; the hero is the product in a state, and the scroll advances that state (the diff rewrites, the queue drains); the close is a real input | Marketing headlines over imagery, fake dashboards, a surface that only sits there |
| Continuous world | One place the visitor travels through | Minimal; the camera never cuts; the world lands somewhere | Hard cuts, unrelated sections |
| Typographic poster | A strong idea, an event, a manifesto | Type is the image; sections change scale, not media | Stock imagery, a picture in every section |
| Gallery | Work, places, collections | Images lead, captions small; an index or a filter | Feature grids, long copy blocks |
| Split stage | Two things in dialogue (before and after, maker and product) | The stage fills the first screen, then pins to one side while the story scrolls beside it | Centered stacks, a headline-left picture-right first screen |
| Rhythmic cutlist | Energy: a festival, sport, music | Short hard cuts, full-bleed, one slow held frame | Long pins, gentle crossfades |

A software product picks live surface before filmic. Filmic is the default everyone drifts to,
so choosing it needs a reason.

## 2. Write the feeling curve, then the sections

One line per section: the feeling, then what on screen causes it. Feeling first, technique
second, because a technique chosen first is looking for a reason.

```
1 Recognition  their own 7am counter, at eye height
2 Fatigue      the two containers and the mess, held still while one line names it
3 Delight      a wipe, and the frame is one cold can, condensation running   <- peak
4 Trust        macro texture at a scale a shop never shows
5 Appetite     the flavors sliding sideways, each landing whole
6 Resolve      everything stops: one can, one line, one place to buy it
```

- **Two neighbors with the same feeling:** one is filler. Cut it.
- **One peak.** It gets the best asset, the most scroll room and a quieter section before it.
  Three impressive sections flatten each other into "nice".
- **Name it as a visitor would:** "it's the site where ___", filled with something that happened
  to them ("the room filled with light as I scrolled"), not a technique ("it has parallax"). That
  sentence is the signature from `SKILL.md` step 1: it starts on the first screen and pays off at
  the peak.
- **The ending resolves and holds:** the page arrives somewhere and stops with content on screen.
  It never fades out or just becomes a footer.
- **Pacing is emotion.** Scroll distance is the page's clock. A long pin feels like a held breath,
  short hard cuts like a pulse, an empty screen before a reveal like silence before the drop.
  Specs, FAQ and logistics get ordinary short sections; they aren't experience.

## 3. The hero has depth: a layer contract

A single beautiful image with fading text is flat. A premium hero is built from planes that
move at different rates, planned before any asset is made. Write the contract in `DESIGN.md`:

| Plane | What it is | Movement | Rule |
|---|---|---|---|
| Far | Clean background plate, the subject removed and the space rebuilt | Least | No ghost of the subject left behind |
| Mid | Architecture, landscape, a surface that sets scale | Some | Establishes distance |
| Subject | The product or person, a real alpha cutout or a 3D model | Deliberate travel or turn | Stays on its support: feet on the rock, bottle on the plinth |
| Near | A cutout close to the lens: a leaf, a curtain edge, a ledge | Most, still restrained | Frames the subject, never covers the headline or the button |
| Atmosphere | Mist, light, dust, if the scene has it | Slow, independent | Separates planes without washing out the image |
| Type and action | Real HTML | Still, at 1× | The full headline readable on the first frame |

- **Write the opening, the midpoint and the exit** in one sentence each. The scroll reveals a
  relationship: outside becomes inside, scattered becomes ordered, the near detail passes the
  viewer. Unrelated floating things don't become meaningful because their speeds differ.
- **Small differences between planes:** neighbors differ by 10–30% in speed; total parallax
  travel stays under about 200px, past that it reads as sliding, not depth. Words ride at 1×.
- **The headline can sit between planes** so the subject stands in front of it, as long as every
  word stays readable. On phones it may move above the subject instead.
- **Cut the near plane around the product:** it dips where the subject is and rises at the edges,
  so the button stays visible longer. Fill every plane solid below its silhouette, and fade the
  section's bottom edge to the page color so no plane's cut line shows.
- **Real alpha, checked:** inspect cutout edges over light and dark; a white or checkerboard
  backdrop isn't transparency. Load all planes before swapping out the still poster.
- **Phones get their own composition:** new crop, subject position, shallower travel, maybe one
  fewer plane. Check a 360 × 640 screen too.
- Choose the method for the subject: HTML planes for photography, a real 3D model when turning or
  light response sells it, video only for footage that needs it.

With no image tool, depth still comes from planes you can make: a drawn plate in SVG, the real
interface as the subject, type as the far plane, a cropped object as the near plane.

## 4. Vary what the scroll does

Give each section one technique and never the same one twice in a row. Four or more across a
long page, in every grammar: a hero that holds still on purpose doesn't excuse the sections
below it. The kit and its rules:

- **Pin:** the frame holds while lines cross inside it. Lines overlap by about 15% so the
  stage is never empty; the hero's first line is already visible on arrival; only the final
  section's last line holds. At least about 1.2 screens of travel, or it snaps.
- **Scrub:** a camera move or turntable tied to the wheel. At most two per page. Encode with a
  keyframe on every frame, ease the playhead toward the scroll target (about 0.18 per frame)
  instead of writing it directly, and map the clip across the whole time the section is visible
  so it never freezes while sliding in or out. A still frame shows until the video has painted.
- **Pan:** vertical scroll moves a rail sideways, for a range or a lineup, never a hierarchy.
  Measure the overflow (`rail.scrollWidth - innerWidth` must be well above zero at every width);
  items settle in sequence; under reduced motion the rail becomes a native scroll region with
  snapping.
- **Reveal:** a clip-path wipe for a change of state, edge to edge on a big image. On a small
  element it's a fidget. The wipe clips to the box, so give tightly set type room.
- **Kinetic type:** a heading assembles line by line from behind a mask that leaves room for
  descenders. One per section at most; never letter by letter.
- **Count:** a number ticks to its value, eased out over 1.2–1.8s, once, at half visibility, in
  tabular figures. Only real numbers; a concept brand has no counters.
- **Drift:** the page's ground shifts color between sections, 3–5 small steps inside one family.
  For chapters and cuts, hard edges instead.
- **Pointer:** one per screen: a tilt of 5–9° on one object, a slight pull toward the pointer on
  the primary button, or a light that follows the pointer across one surface. It eases toward the
  pointer instead of tracking it exactly. Fine pointers only, off under reduced motion.
- **Flow:** ordinary sections that rise in once (the reveal in `motion.md`: 12px over 600ms,
  children about 70ms apart). A page of nothing but pinned sections is exhausting; contrast makes the pins land.

**Being there, not watching:** one or two per page, serving the peak. The pointer moves the world
slightly, the way a room shifts when you lean (that screen's one pointer effect); holding still reveals one extra detail; one line at
the turn speaks to "you".

## 5. Depth beyond parallax

Five tools, used together: shadows with offset and blur, tinted to the background; a 1px top
edge light on raised surfaces; distance as smaller, softer and lower contrast; overlap, one thing
crossing another's edge; grain at 4–5% on large dark grounds so they read as a lit room, not flat
paint. Three elevation steps at most.

## 6. Check every in-between frame

A scroll page has no single state. Capture each section at its opening, middle and exit, on
desktop and a phone, and look for:

- **dead scroll:** wheel turns where nothing on screen changes, unless you wrote that silence on
  purpose into `DESIGN.md`
- **lines that never reach full opacity,** or arrive on an empty stage
- **contrast on the composited frame,** at the brightest image that passes under each line
- **a frozen clip, a rail that doesn't move at this width, a plane's cut line**

Then scroll it cold, write one word per section for what you felt, and compare with the curve.
Where they disagree, the page is wrong, not the curve.
