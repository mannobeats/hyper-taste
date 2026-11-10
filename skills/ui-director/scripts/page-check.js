// The page check. Paste it into your browser tool's JavaScript (or the devtools console) at each
// width and mode, or let scripts/check.mjs run it for you. It returns { fix, judge }:
//   fix   lines are never intentional: fix the cause and look again. Hiding the element to clear
//         a line is a bug.
//   judge lines are leads: keep one only when you can say why, from the product's world.
// Some detectors are adapted from Stageshow's film checks (MIT, Copyright (c) 2026 Benji Taylor).
(() => {
  const fix = new Set(), judge = new Set(), W = innerWidth, css = (e, p) => getComputedStyle(e)[p];
  const tag = (e) => e ? ` [${e.tagName.toLowerCase()} "${(e.innerText || e.alt || e.getAttribute?.('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40)}"]` : '';
  const say = (set, rule, msg, e) => set.add(`${rule}: ${msg}${tag(e)}`);
  const shown = (e) => { for (let a = e; a; a = a.parentElement) { const s = getComputedStyle(a); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < .05) return false; } return true; };
  const all = [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && shown(e); });
  const isText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const texts = all.filter(isText);
  const decorative = (e) => !!e.closest('[aria-hidden="true"]');
  const ctx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#0000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = (v) => (v /= 255) <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const hue = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (d < 40) return null; let h = mx === r ? (g - b) / d : mx === g ? 2 + (b - r) / d : 4 + (r - g) / d; return (h * 60 + 360) % 360; };
  const media = (x) => /^(IMG|VIDEO|CANVAS|PICTURE|svg)$/i.test(x.tagName) || css(x, 'backgroundImage') !== 'none';
  const pictures = all.filter((x) => x.tagName !== 'svg' && media(x));
  const y0 = scrollY;
  const behind = (e) => { let r = e.getBoundingClientRect();
    if (r.top + r.height / 2 < 0 || r.top + r.height / 2 > innerHeight) { scrollBy(0, r.top + r.height / 2 - innerHeight / 2); r = e.getBoundingClientRect(); } // bring it into view to see what is painted under it
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (cx > 0 && cx < W && cy > 0 && cy < innerHeight) { // in view: what is really painted under the words, in paint order
      for (const x of document.elementsFromPoint(cx, cy)) { if ((x !== e && e.contains(x)) || !shown(x)) continue; if (media(x) && x.tagName !== 'svg') return null; const c = rgba(css(x, 'backgroundColor')); if (c[3] > .5) return c; }
    }
    if (pictures.some((x) => { if (x === e || e.contains(x) || x.contains(e)) return false; const m = x.getBoundingClientRect(); return cx >= m.left && cx <= m.right && cy >= m.top && cy <= m.bottom; })) return null;
    for (let p = e; p; p = p.parentElement) { if (css(p, 'backgroundImage') !== 'none' || /^(IMG|VIDEO|CANVAS|PICTURE)$/.test(p.tagName)) return null; const c = rgba(css(p, 'backgroundColor')); if (c[3] > .5) return c; }
    return rgba(css(document.documentElement, 'backgroundColor')); };
  const clipText = (e) => /text/.test(css(e, 'backgroundClip') + css(e, 'webkitBackgroundClip'));
  const radius = (e) => parseFloat(css(e, 'borderTopLeftRadius')) || 0;
  const boxed = (e) => rgba(css(e, 'backgroundColor'))[3] > .05 || parseFloat(css(e, 'borderTopWidth')) > 0 || css(e, 'boxShadow') !== 'none';
  const pill = (e) => { const r = e.getBoundingClientRect(); return r.height <= 52 && r.width - r.height > 4 && radius(e) >= r.height / 2 - 1 && boxed(e); };
  const textRect = (e) => { const g = document.createRange(); g.selectNodeContents(e); return g.getBoundingClientRect(); };

  // Layout and loading
  if (document.documentElement.scrollWidth > W + 1) for (const e of all.filter((e) => e.getBoundingClientRect().right > W + 1 && !e.closest('[style*="overflow"], .scroll, [data-scroll]')).slice(0, 3))
    say(fix, 'sideways scroll', `ends at ${Math.round(e.getBoundingClientRect().right)}px on a ${W}px screen`, e);
  const loaded = new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')));
  for (const f of new Set(texts.map((e) => css(e, 'fontFamily').split(',')[0].trim().replace(/["']/g, ''))))
    if (!loaded.has(f) && !/^(system-ui|ui-|-apple|BlinkMacSystemFont|sans-serif|serif|monospace|inherit|Arial|Helvetica|Georgia|Times)/i.test(f)) say(fix, 'font', `"${f}" isn't loaded, so a fallback shows; put the font files in the project`);
  for (const h of document.querySelectorAll('h1, h2, h3')) { const f = css(h, 'fontFamily');
    if (/Fraunces|Instrument Serif|Playfair|Newsreader|DM Serif|Cormorant|EB Garamond|Libre Baskerville|Lora|Crimson|Young Serif|Space Grotesk|Syne|Bricolage|Clash Display|Cabinet Grotesk|Inter\b/i.test(f.split(',')[0])) { say(judge, 'habit font', `${f.split(',')[0]}: keep it only with a reason from the product's world`, h); break; } }
  if (window.__uiScrolled) for (const e of [...document.querySelectorAll('body *')].filter(isText)) {
    if (e.closest('[hidden], dialog:not([open]), details:not([open]), [aria-hidden="true"], [inert], template, noscript, [popover]:not(:popover-open)')) continue;
    // Hidden on purpose: inside something positioned (a menu, a toast), or stacked over a sibling
    // in the same place (the states of a film, captions that take turns).
    const hidden = []; for (let a = e; a && a !== document.body; a = a.parentElement) if (+css(a, 'opacity') < .05 || css(a, 'visibility') === 'hidden') hidden.push(a);
    if (!hidden.length) continue;
    let chain = []; for (let a = e; a && a !== document.body; a = a.parentElement) chain.push(a);
    if (chain.some((a) => /absolute|fixed/.test(css(a, 'position')) && hidden.some((h) => a.contains(h) || h === a))) continue;
    const stacked = (h) => { const r = h.getBoundingClientRect(); return [...(h.parentElement?.children || [])].some((s) => s !== h && Math.abs(s.getBoundingClientRect().top - r.top) < 4 && Math.abs(s.getBoundingClientRect().left - r.left) < 4); };
    const r = hidden.at(-1).getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || hidden.some(stacked)) continue;
    say(fix, 'never shown', 'still invisible after scrolling the whole page: a reveal that never fires, or content that waits on JavaScript', e); break;
  }

  // Words covered by another box, or cut by a crop. Only filler may run off an edge.
  const pinned = (x) => { for (let a = x; a; a = a.parentElement) if (/fixed|sticky/.test(css(a, 'position'))) return true; return false; };
  for (const e of texts) {
    if (clipText(e) || css(e, 'pointerEvents') === 'none' || e.closest('[inert]')) continue; // a mockup's words count too; a page behind a modal is inert
    const t = textRect(e); if (!t.width || !t.height) continue;
    const y = t.top + t.height / 2;
    if (y > 0 && y < innerHeight && !pinned(e)) {
      const clipped = (x) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { if (!/hidden|clip/.test(css(a, 'overflowX') + css(a, 'overflowY'))) continue; const c = a.getBoundingClientRect(); if (x < c.left || x > c.right || y < c.top || y > c.bottom) return true; } return false; };
      const over = [t.left + 3, t.left + t.width / 2, t.right - 3].map((x) => x > 0 && x < W && !clipped(x) ? document.elementFromPoint(x, y) : null)
        .filter((top) => top && top !== e && !e.contains(top) && !top.contains(e) && !pinned(top) && shown(top));
      if (over.length >= 2) { say(fix, 'covered', `${tag(over[0]).trim()} sits on top of these words`, e); continue; }
    }
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
      const ox = css(a, 'overflowX'), oy = css(a, 'overflowY'); if (!/hidden|clip/.test(ox + oy) || /auto|scroll/.test(ox + oy)) continue;
      if (css(a, 'position') === 'sticky') continue; // a pinned scene: the scroll brings the rest into view
      if (css(a, 'textOverflow') === 'ellipsis') continue; // truncated on purpose, with an ellipsis
      const size = parseFloat(css(e, 'fontSize')), slack = Math.max(2, size * .3); // display type's inline box overshoots its tight line height
      const c = a.getBoundingClientRect(), cutX = /hidden|clip/.test(ox) && (t.left < c.left - 2 || t.right > c.right + 2), cutY = /hidden|clip/.test(oy) && (t.top < c.top - slack || t.bottom > c.bottom + slack);
      const inside = t.right > c.left && t.left < c.right && t.bottom > c.top && t.top < c.bottom;
      if ((cutX || cutY) && inside && css(e, 'textOverflow') !== 'ellipsis') { say(fix, 'cut by the crop', `words cut by the edge of ${tag(a).trim() || a.tagName.toLowerCase()}; crop only filler, keep words whole`, e); break; }
    }
  }

  // Space: a page column hugging the left of a wide area, and bands of nothing between sections.
  for (const e of all) {
    if (css(e, 'maxWidth') === 'none' || e.children.length < 4 || !e.parentElement || /flex|grid/.test(css(e.parentElement, 'display'))) continue;
    const r = e.getBoundingClientRect(), p = e.parentElement.getBoundingClientRect(), pl = parseFloat(css(e.parentElement, 'paddingLeft')), pr = parseFloat(css(e.parentElement, 'paddingRight'));
    const left = r.left - p.left - pl, right = p.right - pr - r.right;
    if (r.width >= 560 && right > 160 && right > left * 3 + 80) { say(fix, 'off-center', `the content keeps to the left with ${Math.round(right)}px empty on its right; center the column (margin-inline: auto) or let it fill`, e); break; }
  }
  // A block that should sit in the middle of a centered column but doesn't (a button group, a form).
  for (const e of all) { const par = e.parentElement; if (!par || e.closest('[aria-hidden="true"]') || !/^(block|flex|grid|table|flow-root|list-item)$/.test(css(e, 'display'))) continue;
    const pc = getComputedStyle(par); if (!/^(block|flex|grid|flow-root)$/.test(pc.display)) continue;
    const centered = (/^(block|flow-root)$/.test(pc.display) && pc.textAlign === 'center') || (pc.display === 'flex' && pc.flexDirection.startsWith('column') && pc.alignItems === 'center');
    if (!centered || /absolute|fixed/.test(css(e, 'position'))) continue;
    const r = e.getBoundingClientRect(), p = par.getBoundingClientRect(), l = r.left - p.left - parseFloat(pc.paddingLeft), rt = p.right - parseFloat(pc.paddingRight) - r.right;
    if (r.width > 40 && r.width < p.width - 24 && Math.abs(l - rt) > 12 && css(e, 'display') !== 'inline') { say(fix, 'off-center', `${Math.round(l)}px on the left, ${Math.round(rt)}px on the right inside a centered column; margin-inline: auto`, e); break; } }
  // Boxes that touch their section's edge, or end in an empty pane.
  for (const e of all.filter((x) => boxed(x) && radius(x) >= 10 && !pill(x))) {
    const r = e.getBoundingClientRect(); if (r.width < 200 || r.height < 120) continue;
    let sec = e.parentElement; while (sec && sec !== document.body && !(rgba(css(sec, 'backgroundColor'))[3] > .5 || css(sec, 'backgroundImage') !== 'none')) sec = sec.parentElement;
    if (sec && sec !== document.body) { const sr = sec.getBoundingClientRect(), side = Math.min(r.left - sr.left, sr.right - r.right);
      if (side >= 16 && sr.height > r.height + 40 && r.bottom <= sr.bottom + .5 && sr.bottom - r.bottom < 12 && /hidden|clip/.test(css(sec, 'overflowY') + css(sec, 'overflow')) === false) { say(fix, 'touches the edge', `a card ends ${Math.round(sr.bottom - r.bottom)}px from the bottom of its section; give it the section's spacing, or run it clearly past the edge`, e); break; } }
    const kids = [...e.querySelectorAll(':scope > *')].filter(shown).map((k) => k.getBoundingClientRect()).filter((k) => k.height);
    if (kids.length && r.height > 240 && css(e, 'alignContent') !== 'space-between' && css(e, 'justifyContent') !== 'space-between') { const low = Math.max(...kids.map((k) => k.bottom)), gap = r.bottom - low;
      if (gap > Math.max(120, r.height * .3)) { say(fix, 'empty pane', `${Math.round(gap)}px of nothing at the foot of a ${Math.round(r.height)}px panel; size it to its content or fill it with more of the product`, e); break; } }
  }
  { const spans = [], y = scrollY;
    for (const e of document.querySelectorAll('body *')) { const r = e.getBoundingClientRect(); if (r.height < 2 || r.width < 2 || css(e, 'visibility') === 'hidden') continue; // reveals still pending count as content
      if ([...e.children].some((k) => css(k, 'position') === 'sticky')) { spans.push([r.top + y, r.bottom + y]); continue; }
      if (isText(e) || /^(IMG|VIDEO|CANVAS|PICTURE|svg|INPUT|BUTTON)$/i.test(e.tagName) || (boxed(e) && r.width < W * .9)) spans.push([r.top + y, r.bottom + y]); }
    spans.sort((a, b) => a[0] - b[0]); let end = spans.length ? spans[0][1] : 0;
    for (const [t, b] of spans.slice(1)) { const gap = t - end; if (gap > Math.max(360, innerHeight * .45)) { fix.add(`empty band: ${Math.round(gap)}px of nothing at ${Math.round(end)}px down the page; sections keep one rhythm (the section spacing, once)`); break; } end = Math.max(end, b); } }

  // Type and contrast
  let photo = 0; const sizes = new Set();
  for (const e of texts) {
    const size = parseFloat(css(e, 'fontSize')), bold = +css(e, 'fontWeight') >= 700, fg = rgba(css(e, 'color')), mono = /mono/i.test(css(e, 'fontFamily')) || e.closest('code, pre, kbd, samp');
    if (!e.closest('[role=img]') && size < 30) sizes.add(Math.round(size));
    if (size < 10 && !decorative(e)) say(fix, 'tiny text', `${size.toFixed(1)}px; 11px is the floor for words people read, 10px for a chart's axis`, e);
    else if (W < 500 && size < 11 && !decorative(e)) say(judge, 'small text', `${size.toFixed(1)}px on a phone`, e);
    if (!decorative(e)) { const bg = behind(e);
      if (!bg || clipText(e) || fg[3] === 0) photo++;
      else { const seen = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3])), [a, b] = [lum(seen), lum(bg)].sort((x, y) => y - x), ratio = (a + .05) / (b + .05), need = size >= 24 || (bold && size >= 18.6) ? 3 : 4.5;
        if (ratio < need) say(fix, 'contrast', `${ratio.toFixed(2)}:1, needs ${need}:1`, e); } }
    const track = parseFloat(css(e, 'letterSpacing')) / size;
    if (size >= 20 && !decorative(e) && track < (size >= 40 ? -.055 : -.04)) say(judge, 'tracking', `${track.toFixed(3)}em at ${Math.round(size)}px; −.055em at most on display type, −.04em below 40px`, e);
    if (!mono && size < 20 && (css(e, 'textTransform') === 'uppercase' || (/[A-Z]{4}/.test(e.innerText) && e.innerText === e.innerText.toUpperCase() && !/^[A-Z0-9 .,·/-]{1,6}$/.test(e.innerText.trim())))) say(judge, 'all caps', 'sentence case, unless the product itself capitalizes', e);
    if (css(e, 'overflowX') !== 'visible' && css(e, 'textOverflow') !== 'ellipsis' && e.scrollWidth > e.clientWidth + 1) say(fix, 'clipped', 'text cut off at the side', e);
    else if (css(e, 'overflowY') !== 'visible' && parseFloat(css(e, 'lineHeight')) < size * 1.15) say(fix, 'clipped', 'line height under 1.15 inside a box that clips: descenders get cut', e);
    const lh = css(e, 'lineHeight') === 'normal' ? size * 1.3 : parseFloat(css(e, 'lineHeight')), h = e.getBoundingClientRect().height;
    if (/flex|grid/.test(css(e, 'display')) && h <= 60 && h >= lh + 2 && lh > size * 1.2 && !e.children.length) {
      const centered = /center/.test(css(e, 'alignItems'));
      if (!centered) say(fix, 'off-center label', `the label sits at the top of a ${Math.round(h)}px control; align-items: center and line-height: 1`, e);
      else if (lh % 1) say(judge, 'off-center label', `a ${lh.toFixed(2)}px line box on a ${Math.round(h)}px control snaps the label a pixel off; set line-height: 1`, e); }
  }
  if (photo) judge.add(`contrast: ${photo} text elements sit on an image, a gradient or clipped type; zoom into the screenshot and check them on the pixels`);
  if (sizes.size > 9) say(judge, 'type sizes', `${sizes.size} text sizes under 30px (${[...sizes].sort((a, b) => a - b).join(', ')}px); 9 at most, display sizes aside`);
  // Lines of display type that touch: the descenders of one line reach the ascenders of the next.
  for (const h of document.querySelectorAll('h1, h2, h3')) { if (!shown(h) || decorative(h)) continue; const st = getComputedStyle(h), size = parseFloat(st.fontSize), lh = parseFloat(st.lineHeight), t = (h.innerText || '').trim();
    if (size < 28 || !lh || h.getBoundingClientRect().height < lh * 1.6 || !/[gjpqy]/.test(t.replace(/[gjpqy][^gjpqy]*$/, 'g_'))) continue;
    ctx.font = `${st.fontStyle} ${st.fontWeight} ${size}px ${st.fontFamily}`; const m = ctx.measureText(t), need = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
    if (lh < need - size * .03) { say(fix, 'lines collide', `a line height of ${(lh / size).toFixed(2)} on type that needs ${(need / size).toFixed(2)}: descenders run into the line below; raise the line height`, h); break; } }
  const lit = texts.filter(clipText).filter((e) => !decorative(e));
  if (lit.length > 1) say(fix, 'gradient type', `${lit.length} elements with gradient text; one headline at most`, lit[1]);
  const labels = [...document.querySelectorAll('h1, h2')].filter((h) => shown(h) && !decorative(h)).map((h) => { const p = h.previousElementSibling; return p && p.innerText && p.innerText.length < 80 && parseFloat(css(p, 'fontSize')) < parseFloat(css(h, 'fontSize')) * .5 ? p : null; }).filter(Boolean);
  if (labels.length > 1) say(judge, 'labels above headlines', `${labels.length} of them; one at most, above the main headline, carrying a fact`, labels[1]);
  const frag = [...document.querySelectorAll('h1, h2, h3, p, blockquote')].filter(shown).filter((e) => { const t = (e.innerText || '').trim(), parts = t.split(/(?<=[.!?])\s+/);
    return t.length < 90 && parts.length === 2 && parts.every((x) => /[.!?]$/.test(x) && x.split(/\s+/).length <= 4); });
  if (frag.length > 2) say(judge, 'two-fragment lines', `${frag.length} lines like "${frag[0].innerText.trim().replace(/\s+/g, ' ')}"; vary the shape`, frag[1]);

  // Controls and boxes
  const isButton = (e) => e.tagName === 'BUTTON' || rgba(css(e, 'backgroundColor'))[3] > .1 || parseFloat(css(e, 'borderTopWidth')) > 0;
  for (const e of [...document.querySelectorAll('a, button, [role=button]')].filter((e) => shown(e) && /[→↗↘↓➜»]\s*$/.test(e.innerText || '') && isButton(e))) say(fix, 'arrow', 'no arrows on buttons', e);
  if (W < 500) for (const e of document.querySelectorAll('a, button, input, select, [role=button]')) { if (!shown(e) || decorative(e)) continue; const r = e.getBoundingClientRect(), min = e.tagName === 'A' && css(e, 'display') === 'inline' ? 24 : 44; if (r.width && r.height < min - .5) say(fix, 'tap target', `${Math.round(r.height)}px tall, needs ${min}`, e); }
  for (const e of texts.filter(pill)) { const r = e.getBoundingClientRect(), t = textRect(e), gap = Math.min(t.left - r.left, r.right - t.right); if (t.width && gap < 6) say(fix, 'cramped', `text ${Math.round(gap)}px from the edge of its pill or button; keep 10px`, e); else if (t.width && gap < 9 && !decorative(e)) say(judge, 'cramped', `text ${Math.round(gap)}px from the edge of its pill or button`, e); }
  for (const e of texts.filter((e) => !pill(e) && e.tagName !== 'BUTTON')) {
    let box = null; for (let a = e; a && a !== document.body; a = a.parentElement) if (boxed(a) && radius(a) >= 2) { box = a; break; }
    if (!box || pill(box) || /^(BUTTON|INPUT|SELECT|TEXTAREA|TD|TH|TR|LI|A|CODE|KBD|MARK)$/.test(box.tagName) || box.getBoundingClientRect().width > W * .9) continue;
    const b = box.getBoundingClientRect(), t = textRect(e); if (!t.width || t.right < b.left || t.left > b.right) continue;
    const gap = Math.min(t.left - b.left, b.right - t.right);
    if (t.bottom > b.bottom + 2 && t.top < b.bottom && css(box, 'overflowY') === 'visible') { say(fix, 'spills', `words run ${Math.round(t.bottom - b.bottom)}px out of the bottom of their panel`, e); break; }
    if (gap < -1 && css(box, 'overflowX') === 'visible') { say(fix, 'spills', `words run ${Math.round(-gap)}px out of their panel; give them room or hide them at this width`, e); break; }
    if (gap >= 0 && gap < 8 && b.width > 60 && b.height > 28) { say(fix, 'tight inset', `words ${gap.toFixed(1)}px from the edge of their card or panel; 12px or more`, e); break; }
  }
  const heights = new Set(all.filter((e) => (/^(BUTTON|SELECT|INPUT)$/.test(e.tagName) || pill(e)) && e.getBoundingClientRect().height >= 16 && !e.closest('[role=img]')).map((e) => Math.round(e.getBoundingClientRect().height)));
  if (heights.size > 4) say(judge, 'control heights', `${heights.size} pill and button heights: ${[...heights].sort((a, b) => a - b).join(', ')}px; keep 3–4`);
  for (const c of all.filter((e) => boxed(e) && radius(e) >= 6 && !pill(e) && e.children.length && e.getBoundingClientRect().width < W * .9)) {
    const r = c.getBoundingClientRect(), kids = [...c.children].filter((k) => shown(k) && !/absolute|fixed/.test(css(k, 'position'))).map((k) => k.getBoundingClientRect()).filter((k) => k.width && k.height);
    if (!kids.length || [...c.querySelectorAll(':scope > img, :scope > video, :scope > picture, :scope > canvas, :scope > svg')].length) continue;
    const L = Math.min(...kids.map((k) => k.left)) - r.left, R = r.right - Math.max(...kids.map((k) => k.right)), T = Math.min(...kids.map((k) => k.top)) - r.top, B = r.bottom - Math.max(...kids.map((k) => k.bottom));
    if (T >= 0 && B >= 0 && Math.max(T, B) > 80 && Math.max(T, B) > Math.min(T, B) * 3 && css(c, 'alignContent') !== 'space-between' && kids.length <= 3 && r.height < innerHeight * .8 && !/^(ASIDE|NAV|HEADER)$/.test(c.tagName)) { say(fix, 'unbalanced', `${Math.round(T)}px above the content and ${Math.round(B)}px below it; center it in its card, or fill the space on purpose`, c); break; }
    if (Math.min(L, R) >= 12 && T >= 0 && B >= 0 && Math.min(T, B) < Math.min(L, R) * .5 && r.height < 400) { say(judge, 'uneven padding', `${Math.round(T)}px top, ${Math.round(B)}px bottom against ${Math.round(Math.min(L, R))}px at the sides; pad a card the same all round`, c); break; }
  }

  // Lists
  for (const p of all.filter((e) => e.children.length >= 3 && (/^(UL|OL|TBODY|DL)$/.test(e.tagName) || /list|rowgroup|grid|table/.test(e.getAttribute('role') || '') || [...e.children].filter((k) => /^(LI|TR)$/.test(k.tagName) || /row|listitem/.test(k.getAttribute('role') || '') || /(^|[-_ ])(row|item)s?($|[-_ ])/.test(typeof k.className === 'string' ? k.className : '')).length >= 3))) {
    const rows = [...p.children].filter(shown).filter((k) => k.innerText?.trim() && !k.querySelector('p, h2, h3, img, video'));
    if (rows.length < 3) continue;
    const rr = rows.map((k) => k.getBoundingClientRect()), same = rr.every((r) => Math.abs(r.left - rr[0].left) < 2 && Math.abs(r.width - rr[0].width) < 2);
    if (!same) continue;
    const one = rows.filter((k) => { const t = textRect(k); const lh = parseFloat(css(k, 'fontSize')) * 1.5; return t.height <= lh; });
    const fat = one.filter((k) => k.getBoundingClientRect().height > Math.max(3 * parseFloat(css(k, 'fontSize')) * 1.3, 64));
    if (fat.length >= 2 && fat.length === one.length) { say(judge, 'fat row', `${fat.length} one-line rows about ${Math.round(fat[0].getBoundingClientRect().height)}px tall; words plus 8–12px a side, and more rows instead of taller ones`, fat[0]); break; }
    const gaps = rr.slice(1).map((r, i) => r.top - rr[i].bottom), h = Math.min(...rr.map((r) => r.height));
    if (gaps.every((g) => g > Math.max(24, h))) { say(judge, 'loose list', `rows ${Math.round(gaps[0])}px apart for ${Math.round(h)}px of row; the row's padding carries the air`, rows[0]); break; }
  }

  // Slop
  for (const e of all.filter((e) => pill(e) && !decorative(e) && (e.innerText || '').trim())) { const dot = [...e.children].find((c) => { const r = c.getBoundingClientRect(); return r.width <= 10 && Math.abs(r.width - r.height) < 1 && radius(c) >= r.width / 2 - .5 && rgba(css(c, 'backgroundColor'))[3] > .3; });
    if (dot || /^[●•◉]/.test((e.innerText || '').trim())) { say(fix, 'dot in a pill', 'status is a word, no dot', e); break; } }
  const repeated = (e) => { const row = e.parentElement, list = row?.parentElement; return !!list && [...list.children].filter((x) => x.className === row.className && x.tagName === row.tagName).length >= 3; }; // a list's rows may each carry a glyph
  const circles = all.filter((e) => { if (repeated(e)) return false; const r = e.getBoundingClientRect(); return r.width >= 24 && r.width <= 72 && Math.abs(r.width - r.height) <= 2 && radius(e) >= r.width * .2 && rgba(css(e, 'backgroundColor'))[3] > .05 && e.querySelector('svg, i, img') && !(e.innerText || '').trim() && !e.closest('a, button, [role=button], [role=img], ol > li'); });
  if (circles.length >= 3) say(fix, 'icons on tinted shapes', `${circles.length} of them; let the words carry it`, circles[0]);
  const marks = all.filter((e) => { const r = e.getBoundingClientRect(), t = (e.innerText || '').trim(), c = rgba(css(e, 'backgroundColor'));
    return r.width >= 18 && r.width <= 48 && Math.abs(r.width - r.height) <= 3 && /^[A-Za-z]{1,2}$/.test(t) && radius(e) < r.width * .45 && hue(c) !== null && e.closest('header, nav, [class*=logo], [class*=brand]'); });
  if (marks.length) say(fix, 'invented mark', 'a letter in a colored square is not a logo; the real mark, or the name as a plain wordmark', marks[0]);
  if (document.querySelector('[data-lucide="sparkles"], [data-lucide="sparkle"], [data-lucide="wand-sparkles"], [data-lucide="wand"], .lucide-sparkles, .lucide-sparkle, .lucide-wand-sparkles')) fix.add('ai sparkle: a sparkle or wand standing for AI; show what the AI does, in words or the product\'s own mark');
  for (const e of all) { const bi = css(e, 'backgroundImage'); if (!/gradient/.test(bi)) continue;
    const hues = [...bi.matchAll(/rgba?\(([^)]+)\)/g)].map((m) => m[1].split(/[ ,/]+/).map(Number)).filter((c) => (c[3] ?? 1) > .25).map(hue).filter((h) => h !== null);
    if (hues.filter((h) => h >= 255 && h <= 335).length >= 2 || (hues.some((h) => h >= 255 && h <= 290) && hues.some((h) => h >= 300 && h <= 345))) { say(fix, 'ai gradient', 'violet, purple or pink in a gradient reads as generated; color comes from the product\'s world', e); break; } }
  const emoji = texts.find((e) => /\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F/u.test(e.innerText) && !e.closest('[data-emoji-ok], .reaction'));
  if (emoji) say(fix, 'emoji', 'no emoji in interface text; emoji are content (a message, a reaction), never icons', emoji);
  const body = document.body.innerText;
  const buzz = [...new Set((body.match(/\b(elevate|seamless(ly)?|unleash|revolutioni[sz]e|next-gen|cutting-edge|game-?changer|empower|supercharge|unlock|robust|leverage|delve|curated|all-in-one|effortless(ly)?|harness|streamline)\b/gi) || []).map((w) => w.toLowerCase()))];
  if (buzz.length) fix.add(`words: ${buzz.join(', ')}; say what it does instead`);
  // The examples' own worlds, left in a page built from one.
  if (![...document.head.childNodes].some((n) => n.nodeType === 8 && /Gold example|Teaching pair/.test(n.data))) { const kept = body.match(/\b(Cirrus|Ferro Audio|Larkspur|fieldnotes\.app|Maya Lindqvist|Jonas Berg|Ines Duarte|Noor Okafor|Atelier Duarte|Halvorsen)\b|mostly clear\.|minus the\s+rack\.|already sorted\./i);
    if (kept) fix.add(`the example's world: "${kept[0]}" belongs to the gold you started from; replace its world with this product's (the idea, the words, the picture, the sample data)`); }
  const filler = body.match(/\b(lorem ipsum|dolor sit amet|Acme|John Doe|Jane Doe|Company Name|Your Name|Feature (one|two|three|1|2|3))\b/i);
  if (filler) fix.add(`placeholder: "${filler[0]}"; one sample world with real-sounding names (references/words.md)`);
  const proof = body.match(/trusted by|loved by|★★★★★|\b\d{1,3}(,\d{3})+\+ (users|customers|teams)|\b\d+k\+ (users|customers|teams)/i);
  if (proof) judge.add(`proof: "${proof[0]}"; real only if the user gave it, otherwise a labeled slot`);
  const icons = (p) => [...p.querySelectorAll(':scope > svg, :scope > * > svg')].filter((s) => s.getBoundingClientRect().width >= 10 && s.getBoundingClientRect().width <= 32);
  for (const p of all.filter((e) => e.children.length >= 3 && !e.closest('[role=img]'))) { const ss = icons(p); if (ss.length < 3) continue;
    const kind = (s) => { const g = s.querySelector('path, circle, rect, polygon'); if (!g) return null; const f = css(g, 'fill'), st = css(g, 'stroke'); return f !== 'none' && rgba(f)[3] > 0 && (st === 'none' || !parseFloat(css(g, 'strokeWidth'))) ? 'fill' : st !== 'none' ? 'line' : null; };
    const k = ss.map(kind).filter(Boolean), filled = ss.filter((x) => kind(x) === 'fill');
    if (filled.length === 1 && filled[0].closest('[aria-current], [aria-selected="true"], [aria-pressed="true"], .on, .active')) continue; // the current tab, filled: the platform's convention
    if (k.includes('fill') && k.includes('line') && k.length >= 3) { say(fix, 'mixed icons', 'filled and outline icons side by side; one family, one construction', p); break; } }
  for (const s of document.querySelectorAll('svg[viewBox]')) { if (!shown(s) || s.closest('[aria-hidden="true"]') && s.getBoundingClientRect().width > 64) continue;
    try { const v = s.viewBox.baseVal, b = s.getBBox(), sw = Math.max(...[...s.querySelectorAll('*')].map((x) => parseFloat(css(x, 'strokeWidth')) || 0), 0) / 2 + .75;
      if (v.width && v.width <= 64 && (b.x < v.x - sw || b.y < v.y - sw || b.x + b.width > v.x + v.width + sw || b.y + b.height > v.y + v.height + sw)) { say(fix, 'clipped glyph', 'an icon drawn past its viewBox, so a stroke is cut', s.parentElement); break; } } catch {}
  }
  if ([...document.querySelectorAll('a[href="#"]')].some(shown)) judge.add('links to "#": give each link its real target, or make it a button');
  scrollTo(0, y0);
  return { fix: [...fix], judge: [...judge] };
})()
