# Round 84 Report — Wave 3 CLIL B1+ Register Alignment (STAGING ONLY)

**Baseline Commit (Round 83):** `0e7419a6e69b7157d33434da26acbe5d713b4c3b`  
**Scope:** Staged Wave 3 (`docs/agent_artifacts/staging/week_{126,127,133,134}/`) — **NO production merge** (`review_status: PENDING_CLAUDE_ESL_SIGNOFF`).

---

## 1. Root Cause Confirmed in Round 83 CLIL Articles

All 4 Round 83 CLIL passages (`reading_hub.js` `clil_article.content_en`) achieved 100% target vocabulary coverage and 0 regex-flagged ESL anomalies (`G-GEN-15`, `G-GEN-16`), but failed genuine CEFR B1+ register for 11–12-year-olds:
- **Sentence density:** Average sentence length ran `18.6–22` words/sentence (`max 26–30` words), stacking dense abstract noun phrases and subordinate clauses (`Uncalibrated_FK` ranged `12.4–15.3`).
- **Assumed C1/undergraduate prose around targets:** e.g., `"compelling speech"`, `"verbatim"`, `"monotone"`, `"dismantle each specific point"`, `"rigorous study with clear methodology"`, `"representative sample"`, `"standardized survey"`, `"adolescent participants"`, `"utilize cooperative games"`, `"exclusively alone"`, `"sleep deficits"`, `"insomnia"`, `"formal argumentation"`, `"sweeping universal conclusion"`.
- **Comprehension-check & critical-thinking alignment:** Existing `check_questions` and `critical_thinking` (plus W126 `glossary`) echoed several elevated or orphaned terms (`verbatim`, `monotone`, `substantial majority utilize`, `sweeping universal conclusion`, `insomnia`, `pause`, `cross-examination`).

---

## 2. Before vs. After CLIL Register Comparison (Computed from `0e7419a6` vs. Current Staging)

Full raw computation & verbatim prose live in [`docs/agent_artifacts/round84_b1_register_raw.txt`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/round84_b1_register_raw.txt).

| Week | Theme | Before Words / Sents | Before Avg / Max Sent | Before FK (uncal.) | After Words / Sents | After Avg / Max Sent | After FK (uncal.) | Target Vocab Coverage |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| **W126** | From Essay to Speech | 167 / 9 | 18.6 / 28 | 12.4 | 174 / 14 | 12.4 / 16 | 6.7 | `20/20 (100%)` |
| **W127** | Rebuttal Practice | 154 / 7 | 22 / 27 | 14.7 | 170 / 15 | 11.3 / 15 | 6.1 | `20/20 (100%, SB 5/5)` |
| **W133** | Deep Research & Data | 168 / 8 | 21 / 30 | 15.3 | 206 / 17 | 12.1 / 17 | 7.5 | `20/20 (100%, SB 8/8)` |
| **W134** | Identifying Fallacies | 145 / 7 | 20.7 / 26 | 13.6 | 165 / 14 | 11.8 / 17 | 7 | `20/20 (100%, SB 8/8)` |

Key pedagogical adjustments made in each rewrite (`reading_hub.js` `clil_article.content_en`, `check_questions`, `critical_thinking`, and W126 `glossary`):
- **W126:** Introduced `oratory`, `elocution`, `projection`, `pacing`, `intonation`, and `rhetoric` with concrete classroom explanations (short notes on small cue cards, speaking for the back row, how voice rises and falls). Replaced `verbatim` / `monotone` with `"word by word"` / `"feel bored"`.
- **W127:** Framed rebuttal via school debate club replies; glossed `rebuttal`, `premise`, `validity`, `concede`, `flaw`, `fallacious`, and `evidence` inline; removed `"dismantle"`, `"credibility"`, `"rivals"`, `"disciplined"`.
- **W133:** Framed as a 100-student school debate club screen-habit project; explained `empirical`, `hypothesis`, `quantitative data`, `methodology` (`"step-by-step plan for collecting answers"`), `metric`, `variable`, and `correlation` (`"two habits happen together, like late gaming and tired mornings"`) inline; removed `"rigorous"`, `"representative"`, `"standardized"`, `"adolescent participants"`, `"utilize"`, `"exclusively"`, `"sleep deficits"`, `"insomnia"`.
- **W134:** Replaced `"formal argumentation"` / `"sweeping universal conclusion"` with concrete school debate examples (`"jumps to a big conclusion after seeing only one or two examples"`) and short conditional/contrastive clauses.

---

## 3. Repository Cambridge Wordlist Cross-Check (`src/data/official_wordlists/`)

Inventory audited directly in [`audit_round84_b1_register.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/audit_round84_b1_register.mjs):
- Full A–Z YLE lists: `starters_pre_a1.json` (504), `movers_a1.json` (412), `flyers_a2.json` (519).
- **Partial A–C lists in repo:** `ket_a2.json` (316, `ability..candidate`) and `pet_b1.json` (481, `abroad..candidate`).

Because `pet_b1.json` in the repo stops at `candidate` (letter C), tokens outside `whitelist + week's 20 targets` are reported in two honest buckets:
1. **Unlisted A–C tokens** (genuinely absent from repo `pet_b1.json` despite A–C coverage):
   - **W126 (1):** `clearly` (from `clear`).
   - **W127 (5):** `clear`, `check`, `claim`, `claims` (W134 target), `contrary` (Source B grammar `"On the contrary"`).
   - **W133 (3):** `check`, `common`, `causes`.
   - **W134 (5):** `case`, `clear`, `check`, `common`, `creates`.
   - Zero academic/undergrad A–C terms remain outside each week's 20 targets.
2. **Unlisted D–Z tokens** (absent from A2 `flyers_a2.json`, evaluated as everyday A2/B1 classroom vocabulary in [`round84_b1_register_raw.txt`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/round84_b1_register_raw.txt)):
   - **W126 (14):** `speech, essay, readers, paragraphs, voice, final, phrases, listeners, depends, row, rises, easier, persuade, even`.
   - **W127 (23):** `debate, politely, real, skill, own, speech, reply, main, reason, logical, sense, helpful, frame, detail, share, fact, logic, facts, speakers, finally, serious, linking, however`.
   - **W133 (24):** `debate, facts, speakers, proof, measure, testing, simply, useful, suppose, habits, plan, whole, track, imagine, real, report, introduced, seventy, proves, fifteen, reason, stress, link, prove`.
   - **W134 (14):** `debate, smart, listeners, unfair, whole, gamers, proof, real, facts, personal, however, support, tend, simple`.
   - **0 unjustified tokens** remain across all 4 weeks.

---

## 4. Gate Verification (`G-GEN-11..16` + R83 Strand Contracts)

Re-ran `node scripts/run_round83_wave3_gates.mjs --out docs/agent_artifacts/round84_wave3_gate_raw.txt` after the rewrite:
- **G-GEN-11..14:** `PASS` across W126, W127, W133, W134 (100% valid schema, 0 Vietnamese leaks, 0 boilerplate).
- **G-GEN-15 (Vocab coverage):** `20/20 = 100%` on all 4 weeks (`SB 5/5 = 100%` on W127, `SB 8/8 = 100%` on W133 & W134).
- **G-GEN-16 (ESL anomalies):** `0 hits` across all files in all 4 weeks.
- **R83 Math Strands & Geometry SVGs:** All `PASS` (`OVERALL WAVE 3 STAGING GATE STATUS: ALL_PASS`).

Raw log: [`docs/agent_artifacts/round84_wave3_gate_raw.txt`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/round84_wave3_gate_raw.txt).

---

## 5. Honest Sign-Off Assessment (Staging Only — No Merge)

1. **CLIL Articles (`clil_article` — `content_en`, `glossary`, `check_questions`, `critical_thinking` across all 4 staged weeks):** **READY for Claude C17-b ESL sign-off.** All 4 passages now use short, clear sentences (`11.3–12.4` avg words, max `15–17`), explain specialized syllabus terms inline using concrete middle-school debate examples, keep `100%` target vocabulary coverage, and align every glossary/comprehension/critical-thinking prompt cleanly with the text.
2. **Non-CLIL Hub Sections & `vocab[]` Definitions (Important Caveat — Needs Another Pass if Reviewing Whole-Week Prose):** As surfaced by the whole-week non-CLIL scan inside [`round84_b1_register_raw.txt`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/round84_b1_register_raw.txt) (plus `vocab[].definition_en`/`example_en` in `reading_hub.js`), pre-existing non-CLIL files (`listening_hub.js`, `writing_hub.js`, `reading_hub.js` `story_scenes`/`rw_part1`/`vocab[]`, `speaking_hub.js`) were **not** rewritten in Round 84 and still contain elevated undergraduate phrasing from earlier generation:
   - **W133 (highest priority if whole-week register matters):** `listening_hub.js` (`passage_audio_script`), `reading_hub.js` (`vocab[]`, `story_scenes` & `rw_part1`), and `writing_hub.js` still contain `"adolescents"`, `"substantial majority utilize"`, `"exhibit signs of problematic screen usage"`, `"empirical"`, `"assertions"`, `"scholarly"`, `"fatigue"`, `"replicated"`, `"rigorous"`, `"regression analysis"`.
   - **W126 / W127 / W134 (lighter residue):** isolated terms (`monotone`, `verbatim` in W126; `empirical`, `methodology`, `rigorous` in W127; `empirical`, `rigorous`, `assertions`, `adolescent` in W134; plus C1 phrasing in `vocab[]` entries).
   - **Recommendation:** Sign off **Round 84 CLIL (`clil_article`) + Round 83 Math/SVGs** now, and schedule one focused pass on **non-CLIL prose (especially W133 `listening_hub.js`, `writing_hub.js`, `story_scenes`)** before promoting Wave 3 out of staging into `src/data/weeks/`.

