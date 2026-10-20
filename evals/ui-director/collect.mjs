#!/usr/bin/env node
// Turns a `claude plugin eval --json` result into results/<run>/viewer.json for viewer.html.
// Usage: node evals/ui-director/collect.mjs [result.json]   (default: the newest results/*/aggregate-result.json)
// Each arm's page.html is copied into results/<run>/pages/<case>/ from the run's --keep-temp
// directories (their sealed home/ is opened read-only with chmod, as the eval CLI suggests).
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync, copyFileSync, chmodSync } from 'node:fs';
import { join, resolve } from 'node:path';

const here = resolve(import.meta.dirname);
const results = join(here, 'results');
const runs = () => existsSync(results) ? readdirSync(results).filter((d) => existsSync(join(results, d, 'aggregate-result.json'))).sort().reverse() : [];

const file = process.argv[2] ?? (runs()[0] && join(results, runs()[0], 'aggregate-result.json'));
if (!file) { console.error('No eval result found. Pass the --json file from the run.'); process.exit(1); }
const run = JSON.parse(readFileSync(file, 'utf8'));
const id = run.startedAt.replace(/[:.]/g, '-');
const pairs = JSON.parse(readFileSync(join(here, '../../docs/ui-director/pairs.json'), 'utf8'));

const arm = (a, skillGrader) => a && {
  score: a.score,
  fired: a.graders?.some((g) => g.name === skillGrader && g.passed) ?? false,
  error: a.error ?? undefined,
  graders: (a.graders ?? []).map((g) => ({
    name: g.name, pass: g.passed, indicator: g.withOnly || g.scored === false || undefined,
    reason: g.explanation?.replace(/\s*—?\s*note: long file.*$/s, '') || undefined,
  })),
};

function savePage(c, armName, file) {
  const dest = join(results, id, 'pages', c.name, file), trace = c.arms[armName]?.[0]?.tracePath;
  if (existsSync(dest) || !trace) return;
  const root = trace.split('/out/')[0], src = join(root, 'sealed/home/cwd/page.html');
  try { chmodSync(root, 0o700); chmodSync(join(root, 'sealed'), 0o700); } catch {}
  if (!existsSync(src)) return;
  mkdirSync(join(results, id, 'pages', c.name), { recursive: true });
  copyFileSync(src, dest);
}

const cases = run.cases.map((c) => {
  savePage(c, 'with', 'with-skill.html');
  savePage(c, 'without', 'without-skill.html');
  const pair = pairs.find((p) => p.id === c.name) ?? {};
  const skillGrader = c.graders.find((g) => g.type === 'tool_used')?.name;
  const page = (name) => existsSync(join(results, id, 'pages', c.name, name)) ? `pages/${c.name}/${name}` : undefined;
  const doc = (name) => existsSync(join(here, `../../docs/ui-director/pairs/${c.name}/${name}`)) ? `../../docs/ui-director/pairs/${c.name}/${name}` : undefined;
  return {
    id: c.name, title: pair.title, rule: pair.rule, layout: pair.layout, prompt: c.promptMarkdown,
    delta: c.aggregates.delta,
    with: arm(c.arms.with?.[0], skillGrader),
    without: arm(c.arms.without?.[0], skillGrader),
    pages: { start: doc('before.html'), without: page('without-skill.html'), with: page('with-skill.html'), after: doc('after.html') },
  };
});

mkdirSync(join(results, id), { recursive: true });
writeFileSync(join(results, id, 'viewer.json'), JSON.stringify({ run: id, cost: run.costUsd, cases }, null, 1));
writeFileSync(join(results, 'runs.json'), JSON.stringify(readdirSync(results).filter((d) => existsSync(join(results, d, 'viewer.json'))).sort().reverse()));
const missing = cases.flatMap((c) => ['with', 'without'].filter((k) => !c.pages[k]).map((k) => `${c.id} (${k})`));
console.log(`✓ results/${id}/viewer.json: ${cases.length} cases${missing.length ? `, no page for ${missing.join(', ')}` : ''}`);
