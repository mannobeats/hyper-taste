# ui-director evals

One case per before/after pair in [`docs/ui-director/pairs`](../../docs/ui-director/pairs). Each
case copies the pair's `before.html` into an empty workspace as `page.html`, asks for the fix the
way a user would (without naming the skill), and grades the edited file:

- `result.md`: a judge model checks the rubric taken from the pair's "after".
- `slop-gone.md` (some cases): a regex that fails if a specific tell is still in the file.
- `skill-fired.md`: whether the agent opened ui-director. Reported, not scored.

Each run also has a baseline arm without the skill, so `Δ` is what the skill adds.

## Run

From the repo root, with [Claude Code](https://code.claude.com/docs/en/plugin-evals):

```bash
claude plugin eval . --eval-dir evals/ui-director --scaffold --allow-tools Write Edit --runs 1 -j 4 --judge-model opus
```

Add `--case 08-landing-product` for one case. `--scaffold` is needed because each case copies its
starting page with `scaffold.sh`. A full run costs model usage on your account (roughly $0.30 to
$1.50 per case and arm), so it isn't part of CI.

## See the results

Add `--keep-temp --json <file>` to the run, then turn it into a viewer (it copies each arm's page
from the kept run folders):

```bash
node evals/ui-director/collect.mjs <file>
python3 -m http.server 4321 --bind 127.0.0.1
```

Open http://localhost:4321/evals/ui-director/viewer.html. For every case it shows the scores
with and without the skill, each grader's verdict and reason, and the pages: where the agent
started, what it made without the skill, what it made with it, and the reference "after". Switch
between them with the toggle (keys 1–5), compare the two arms side by side, and step through
cases with J and K. "No gain" lists the cases where the skill added nothing, the first ones to
read.

## Add a case

Add the pair to `docs/ui-director/pairs.json` and its folder first, then copy a case folder here,
change the pair id in `scaffold.sh`, and write the prompt and rubric. Write the rubric as concrete
PASS and FAIL conditions about the file, so a judge reading the HTML can decide.
