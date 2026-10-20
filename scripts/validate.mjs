#!/usr/bin/env node
// Checks that every skill, manifest and version in the repo agree.
// Usage: node scripts/validate.mjs [vX.Y.Z]   (the tag is checked on release)
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const errors = [];
const fail = (msg) => errors.push(msg);
const json = (path) => JSON.parse(readFileSync(path, 'utf8'));

const skills = readdirSync('skills', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

// Skills: frontmatter name matches the folder, a description is there, referenced files exist.
for (const skill of skills) {
  const path = `skills/${skill}/SKILL.md`;
  if (!existsSync(path)) { fail(`${path} is missing`); continue; }
  const text = readFileSync(path, 'utf8');
  const front = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  if (!front) { fail(`${path} has no frontmatter`); continue; }
  const name = front.match(/^name:\s*(.+)$/m)?.[1].trim();
  const description = front.match(/^description:\s*(.+)$/m)?.[1].trim() ?? '';
  if (name !== skill) fail(`${path}: name "${name}" must match the folder "${skill}"`);
  if (!description) fail(`${path}: description is empty`);
  if (description.length > 1024) fail(`${path}: description is ${description.length} chars, the limit is 1024`);
  for (const [, ref] of text.matchAll(/`((?:references|scripts|fonts)\/[\w./-]+)`/g)) {
    if (!existsSync(`skills/${skill}/${ref}`)) fail(`${path}: links to ${ref}, which doesn't exist`);
  }
}

// Claude marketplace: one bundle with every command folder, one entry per skill.
const market = json('.claude-plugin/marketplace.json');
const bundle = market.plugins.find((p) => p.name === market.name);
if (!bundle) fail(`marketplace.json needs a bundle plugin named "${market.name}"`);
if (bundle?.skills) fail('the bundle must not list skills, so it picks up every folder in skills/');

const commandDirs = existsSync('commands') ? readdirSync('commands').filter((d) => !d.startsWith('.')) : [];
for (const dir of commandDirs) {
  if (!skills.includes(dir)) fail(`commands/${dir} has no matching skill`);
  if (!bundle?.commands?.includes(`./commands/${dir}`)) fail(`the bundle is missing "./commands/${dir}" in commands`);
}

for (const skill of skills) {
  const entry = market.plugins.find((p) => p.name === skill);
  if (!entry) { fail(`marketplace.json has no plugin entry for skill "${skill}"`); continue; }
  if (JSON.stringify(entry.skills) !== JSON.stringify([`./skills/${skill}`])) {
    fail(`plugin "${skill}" must set "skills": ["./skills/${skill}"]`);
  }
  const ownCommands = commandDirs.includes(skill) ? [`./commands/${skill}`] : [];
  if (JSON.stringify(entry.commands) !== JSON.stringify(ownCommands)) {
    fail(`plugin "${skill}" must set "commands": ${JSON.stringify(ownCommands)}`);
  }
  if (!/^\d+\.\d+\.\d+$/.test(entry.version ?? '')) fail(`plugin "${skill}" needs a semver version`);
}
for (const p of market.plugins) {
  if (p !== bundle && !skills.includes(p.name)) fail(`plugin "${p.name}" has no folder in skills/`);
}

// Docs pairs: every pair listed has its pages, its screenshot and its eval case.
for (const skill of skills) {
  const list = `docs/${skill}/pairs.json`;
  if (!existsSync(list)) continue;
  for (const { id, dark } of json(list)) {
    for (const file of [`pairs/${id}/before.html`, `pairs/${id}/after.html`, `gallery/${id}.png`, ...(dark ? [] : [`gallery/${id}-dark.png`])]) {
      if (!existsSync(`docs/${skill}/${file}`)) fail(`docs/${skill}/${file} is missing (pair ${id})`);
    }
    if (!existsSync(`evals/${skill}/${id}/prompt.md`)) fail(`evals/${skill}/${id}/prompt.md is missing (pair ${id})`);
  }
}

// Versions: the bundle version is the repo version, the same in every manifest.
const version = bundle?.version;
const others = {
  '.codex-plugin/plugin.json': json('.codex-plugin/plugin.json').version,
  '.agents/plugins/marketplace.json': json('.agents/plugins/marketplace.json').plugins[0].version,
};
for (const [file, v] of Object.entries(others)) {
  if (v !== version) fail(`${file} has version ${v}, the bundle has ${version}`);
}
if (!readFileSync('CHANGELOG.md', 'utf8').includes(`## [${version}]`)) {
  fail(`CHANGELOG.md has no "## [${version}]" section`);
}
const tag = process.argv[2];
if (tag && tag !== `v${version}`) fail(`tag ${tag} doesn't match the bundle version v${version}`);

if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  process.exit(1);
}
console.log(`✓ ${skills.length} skills, bundle v${version}: ${skills.join(', ')}`);
