# Round 85 Report — Extend CEFR B1+ Register Fix to Non-CLIL Sections (`W126`, `W127`, `W133`, `W134`)

**Status:** `STAGING ONLY` (`review_status: PENDING_CLAUDE_ESL_SIGNOFF` across all 4 weeks; zero production mutations)
**Baseline Commit (Round 84 HEAD):** `0347975fb7f84808b23901179b562ba167853774`

## 1. Scope & Changes Applied
Extended Round 84's CEFR B1+ register standardization across all non-CLIL files of the 4 staged Wave 3 weeks ([`apply_round85_nonclil_b1.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/apply_round85_nonclil_b1.mjs)):
- **Vocab (`vocab[]` in `reading_hub.js` & synced 1:1 in `vocab.js`):** Replaced C1 filler (`scholarly`, `unsubstantiated`, `anecdotes`, `fatigue`, `adolescent`, `monotonous`, `succinct`, `peer-reviewed`, `cross-examination`, `testimonies`, `philosophical treatise`, `adjudicator`, `deliberation`, etc.) with short, concrete middle-school B1+ `example_en` sentences (8–14 words) and simplified academic `definition_en` lines. Every target word remains present in its `example_en`.
- **Shadowing & Dictation (`reading_hub.js` `shadowingData.sentences` synced 1:1 to `listening_hub.js` `shadowing_sentences` & `passage_audio_script`):** Rewrote all flagged C1 sentences (`exhibit signs of problematic screen usage`, `subjective personal assertions into credible scholarly arguments`, `independently replicated`, `manipulative advertising and false propaganda`, `rigorous rebuttal training`, etc.) and recomputed matching `words[]` arrays, `vi`, and `ipa`.
- **Story / RW / Writing / Speaking / Skill Practice (`story_scenes`, `rw_part2`, `rw_part6`, `writing_hub.js`, `speaking_hub.js`, `skill_practice_hub.js` `grammar_drills` & `science_lab`):** Cleaned all remaining flagged non-target C1 terms (`monotone`, `verbatim`, `standardized`, `substantial`, `fatigue`, `adolescent`, `rigorous`, `collegiate`, `syllogisms`, `adjudicators`, `unfounded`, `epistemology`, `predominantly`, `stratified`, `longitudinal`, `tabulation`, `mandate`, `shatters`, `methodically`, `empirical`/`methodology` outside W133), fixed W127 `rw_part6` collocation (`"By dealing directly [4] opposing points"` for `"4": "with"`), and enforced 100% `[slot]`-in-`pills[]` alignment across all `panels[]` and `ladder_stages[]`.
- **Syllabus Targets Preserved in W133:** `empirical` and `methodology` ARE W133 syllabus targets and were kept inside concrete, self-explanatory B1+ sentences (e.g., `"Empirical evidence—real facts you can check—is stronger than one person's guess."` and `"Our club shared its full methodology so other classes could repeat the same steps."`).
- **Math Preserved Byte-for-Byte:** `singapore_math` across all 4 weeks verified identical to `0347975f`.

## 2. Dynamic Audit & Cambridge Wordlist Cross-Check ([`round85_nonclil_register_raw.txt`](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/round85_nonclil_register_raw.txt))
Repository wordlists (`src/data/official_wordlists/`): `1,679` cumulative tokens (`starters_pre_a1.json` 504, `movers_a1.json` 412, `flyers_a2.json` 519, partial A–C `ket_a2.json` 316, partial A–C `pet_b1.json` 481).

| Week | `example_en` (20) BEFORE → AFTER | `shadowing/dictation` (8) BEFORE → AFTER | Non-Target C1 Hits (All 6 Files) | Unjustified Tokens | Sync & Math |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **W126** | Unlisted `19 A-C / 70 D-Z`, FK `12.1` → `6 A-C / 24 D-Z`, FK `6.4` | Unlisted `4 A-C / 33 D-Z`, FK `10.7` → `2 A-C / 16 D-Z`, FK `6.9` | `0` | `0` | `PASS` (incl. `panel_pills_aligned`) |
| **W127** | Unlisted `16 A-C / 81 D-Z`, FK `12.1` → `6 A-C / 35 D-Z`, FK `6.6` | Unlisted `7 A-C / 31 D-Z`, FK `12.1` → `6 A-C / 24 D-Z`, FK `7.4` | `0` | `0` | `PASS` (incl. `panel_pills_aligned`) |
| **W133** | Unlisted `11 A-C / 75 D-Z`, FK `14` → `7 A-C / 25 D-Z`, FK `6.6` | Unlisted `5 A-C / 36 D-Z`, FK `15.8` → `4 A-C / 13 D-Z`, FK `9.2` | `0` | `0` | `PASS` (incl. `panel_pills_aligned`) |
| **W134** | Unlisted `12 A-C / 75 D-Z`, FK `14.9` → `6 A-C / 28 D-Z`, FK `7.5` | Unlisted `8 A-C / 29 D-Z`, FK `14.7` → `4 A-C / 18 D-Z`, FK `8.1` | `0` | `0` | `PASS` (incl. `panel_pills_aligned`) |

- Re-ran [`audit_round84_b1_register.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/audit_round84_b1_register.mjs) (`round85_r84_check_raw.txt`): Whole-week non-CLIL elevated scan shows `0` hits in W126, W127, W134, and only W133's 2 syllabus target words (`empirical`, `methodology`) in W133.
- Re-ran [`run_round83_wave3_gates.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/run_round83_wave3_gates.mjs) (`round85_wave3_gate_raw.txt`): **`OVERALL WAVE 3 STAGING GATE STATUS: ALL_PASS`** (`G-GEN-11..16` + math strand checks pass on W126, W127, W133, W134; `0` ESL anomalies; `100%` vocab coverage in CLIL).

## 3. Claude ESL Sign-Off Readiness (Per Week — CLIL + Non-CLIL)
- **W126 (`From Essay to Speech`):** **READY for full Claude ESL sign-off (both CLIL & non-CLIL sections).** `0` non-target C1 hits across all 6 staged files, concrete school speech/debate examples, `G-GEN-11..16` PASS.
- **W127 (`Rebuttal Practice`):** **READY for full Claude ESL sign-off (both CLIL & non-CLIL sections).** `0` non-target C1 hits across all 6 staged files, concrete debate rebuttal examples, `SB 5/5`, `G-GEN-11..16` PASS.
- **W133 (`Deep Research & Data`):** **READY for full Claude ESL sign-off (both CLIL & non-CLIL sections).** All residual C1 filler (`adolescent`, `fatigue`, `scholarly`, `substantial`, `exhibit signs`, `problematic screen usage`, `assertions`, `replicated`, `rigorous`, `standardized`, `unsubstantiated`, `anecdotes`, `subjective`, `credible`, `deficits`) replaced; syllabus targets `empirical` and `methodology` preserved in concrete B1+ context; `SB 8/8`, `G-GEN-11..16` PASS.
- **W134 (`Identifying Fallacies`):** **READY for full Claude ESL sign-off (both CLIL & non-CLIL sections).** `0` non-target C1 hits across all 6 staged files, concrete fallacy examples, `SB 8/8`, `G-GEN-11..16` PASS.
- **Merge Gate Reminder:** All 4 weeks remain **STAGING ONLY** (`PENDING_CLAUDE_ESL_SIGNOFF`). Upon promotion approval, copy `docs/agent_artifacts/staging/week_133/svg/*.svg` and `week_134/svg/*.svg` alongside the 6 hub files.

