// Builds the skill's gold examples and teaching pairs from the pages in this folder.
// Each gold is made self-contained: tokens.css and pair.js inlined, fonts pointed at the skill's
// fonts/ (the teaching pairs share one teaching/tokens.css), photos resized into examples/img/. Edit the sources here, never the built files.
// Usage (from docs/ui-director, macOS for sips): npm run examples
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const here = resolve(import.meta.dirname);
const skill = resolve(here, '../../skills/ui-director');
const pairs = JSON.parse(await readFile(join(here, 'pairs.json'), 'utf8'));
const byId = Object.fromEntries(pairs.map((p) => [p.id, p]));

// Gold: finished pages to start from. Name in the skill → source here.
const gold = {
  'landing-sky': 'gold/landing-sky.html',
  'landing-object': 'gold/landing-object.html',
  'landing-card': 'gold/landing-card.html',
  'landing-night': 'gold/landing-night.html',
  'app-dashboard': 'gold/app-dashboard.html',
  'app-analytics': 'gold/app-analytics.html',
  'app-finance': 'gold/app-finance.html',
  'phone-app': 'gold/phone-app.html',
};
// Teaching: the small pairs, before and after, for diagnosing one problem.
const teaching = ['01-edges', '02-close', '03-differentiate', '04-show', '05-icons', '06-emphasis', '07-dissolve',
  '12-color', '13-dark', '14-destructive', '15-table', '16-timeline', '17-disclosure', '19-phone'];

const tokens = (await readFile(join(here, 'pairs/tokens.css'), 'utf8'))
  .replace(/^\/\* tokens\.css:[\s\S]*?\*\/\n/, '/* The token system every example uses. A project writes these in its own format (references/system.md). */\n')
  .replaceAll('../../../skills/ui-director/fonts/', '../fonts/');
const theme = `<script>
  // ?theme=dark or ?theme=light picks a mode; otherwise the system's.
  const t = new URLSearchParams(location.search).get('theme');
  if (t === 'dark' || (!t && !document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.dataset.theme = 'dark';
</script>`;
const pairJs = (await readFile(join(here, 'pairs/pair.js'), 'utf8')).replace(/^.*\?theme=dark.*\n/m, '');

async function build(src, out, note, imgDir, imgPrefix, shared) {
  const dir = join(here, src, '..');
  let html = await readFile(join(here, src), 'utf8');
  html = html
    .replace(/<link rel="stylesheet" href="\.\.\/(?:pairs\/)?tokens\.css">/, shared ? `<link rel="stylesheet" href="tokens.css">\n${theme}` : `<style>\n${tokens}</style>\n${theme}`)
    .replace(/<script src="\.\.\/(?:pairs\/)?pair\.js"><\/script>/, `<script>\n${pairJs}</script>`)
    .replace(/<script>if \(self === top\) (document\.documentElement\.classList\.add\('arrive'\);)<\/script>/, '<script>$1</script>')
    .replace(/<head>\n/, `<head>\n<!-- ${note} -->\n`)
    .replaceAll('../../../skills/ui-director/fonts/', '../fonts/');
  for (const [, file] of html.matchAll(/(?:src|href)="([\w-]+\.(?:jpe?g|png|webp))"/g)) {
    await mkdir(imgDir, { recursive: true });
    const name = `${out}-${file.replace(/\.\w+$/, '')}.jpg`;
    execFileSync('sips', ['-Z', '1600', '-s', 'format', 'jpeg', '-s', 'formatOptions', '55', join(dir, file), '--out', join(imgDir, name)], { stdio: 'ignore' });
    html = html.replaceAll(`"${file}"`, `"${imgPrefix}${name}"`);
  }
  if (/\.\.\/(pairs\/)?tokens\.css|pair\.js|self === top/.test(html)) throw new Error(`${src}: something wasn't inlined`);
  return html;
}

await rm(join(skill, 'examples'), { recursive: true, force: true });
await rm(join(skill, 'teaching'), { recursive: true, force: true });
await mkdir(join(skill, 'examples'), { recursive: true });
await mkdir(join(skill, 'teaching'), { recursive: true });

for (const [name, src] of Object.entries(gold)) {
  const id = src.split('/')[1];
  const note = 'Gold example: copy its structure and its craft, replace its world.';
  await writeFile(join(skill, 'examples', `${name}.html`), await build(src, name, note, join(skill, 'examples/img'), 'img/'));
}
// The pairs share one tokens.css, so reading a pair costs its own few KB, not the token file again.
await writeFile(join(skill, 'teaching', 'tokens.css'), tokens);
for (const id of teaching) {
  const p = byId[id];
  await writeFile(join(skill, 'teaching', `${id}.before.html`), await build(`pairs/${id}/before.html`, id, `Teaching pair, the wrong half: ${p.before}`, join(skill, 'teaching'), '', true));
  await writeFile(join(skill, 'teaching', `${id}.after.html`), await build(`pairs/${id}/after.html`, id, `Teaching pair, the right half: ${p.after}`, join(skill, 'teaching'), '', true));
}
console.log(`${Object.keys(gold).length} examples, ${teaching.length} teaching pairs`);
