# EngQuest3K — Task 0 Verification: Week 35 Full Wipe to BLUEPRINT_ONLY Baseline

**Date:** 2026-11-06  
**Context:** Round 60 Task 0 (Prerequisite full content wipe of legacy pre-SOP content)  
**Status:** 100% VERIFIED & CONFIRMED

---

## I. Summary of Content Wipe

In strict accordance with the project owner's mandate, the reset of Week 35 has been expanded beyond the 6 hub files to **every single file** in `src/data/weeks/week_35/` holding legacy pre-SOP content:

1. `grammar.js`: Reset to clean placeholder stub (`title: "Grammar Practice"`, `drills: []`, `exercises: []`).
2. `mindmap.js`: Reset to clean placeholder stub (`central_idea: ""`, `stems: []`, `branches: []`).
3. `vocab_dictionary_master.js`: Reset to clean placeholder stub (`export default []`).
4. `logic_lab.js`: Reset to clean placeholder stub (`title: "Logic Lab"`, `problems: []`).
5. `logic_science.js`: Reset to clean placeholder stub (`title: "Science Lab"`, `experiments: []`, `scenarios: []`).
6. `word_match.js`: Reset to clean placeholder stub (`export default []`).
7. `word_power.js`: Reset to clean placeholder stub (`export default []`).
8. `ask_ai.js`: Reset to clean placeholder stub (`CUE_CARD_PROMPTS = []`, `INFORMATION_EXCHANGE_P2 = {}`, `export default []`).
9. `writing.js`: Reset to clean placeholder stub (`title: "Writing Studio"`, `prompts: []`, `panels: []`).
10. `shadowing_ipa.js`: Reset to clean placeholder stub (`export default []`).
11. `daily_watch.js`: Reset to clean placeholder stub (`export default []`).
12. `games.js`: Reset to clean placeholder stub (`export const week35GamesAdvanced = {}`).
13. `read.js`: Reset to clean placeholder stub (`title: "Storytelling Practice 2 (Personal Recount)"`, `story_scenes: []`).
14. `explore.js`: Reset to clean placeholder stub (`theme: "Storytelling Practice 2 (Personal Recount)"`, `check_questions: []`).
15. `shadowing.js`: Reset to clean placeholder stub (`sentences: []`).
16. `shadowing.js.bak`: Completely deleted from disk (`rm -f`).
17. `dictation.js`: Reset to clean placeholder stub (`export default []`).
18. `singapore_math.js`: Reset to clean placeholder stub (`title: "Singapore Math"`, `problems: []`).
19. `week_35_real.js`: Reset to clean placeholder stub (`title: "Storytelling Practice 2 (Personal Recount)"`, `target_vocab: []`).
20. `index.js`: Standard wrapper cleanly importing the clean stubs with English titles only.
21. (Plus 6 Hub files: `vocab.js`, `reading_hub.js`, `listening_hub.js`, `speaking_hub.js`, `writing_hub.js`, `skill_practice_hub.js` verified clean).

**Canonical Authority Preserved:**  
`src/data/weeks/week_35/blueprint.json` was kept 100% untouched.

---

## II. Verification Results

1. **Grep Lexical Token Elimination:**
   - Command: `grep -rn -i -E "Pine Valley|campfire|marshmallow|campsite|tent\b|sleeping bag|hiking|stargazing|Leo the Lion|Milo the Mouse|Hunter Jack" src/data/weeks/week_35/`
   - Result: **0 matches** (100% CLEAN).
   - Word check `\blion\b` and `\bmouse\b`: **0 matches** (100% CLEAN).

2. **Vietnamese Vocabulary Leak Scan (`vietnamese_leak_scan_w35.log`):**
   - Command: `node scripts/verify_w35_cleanliness.mjs`
   - Files scanned: 26 files (25 JS files + blueprint.json).
   - Leaks detected: **0 leaks** (100% PASS).

3. **Generalized Dynamic Cross-Week Pollution Detector (`pollution_detector_w35.log`):**
   - Pairwise overlap: W35 vs W33 (0 words, 0 sentences), W35 vs W34 (0 words, 0 sentences), W35 vs W36 (0 words, 0 sentences), W35 vs W37 (0 words, 0 sentences).
   - W34 Contaminants: **0 findings**.
   - Camping Legacy Remnants: **0 findings**.
   - Total Pollution Findings: **0 findings** (100% PASS).

4. **Vite Production Build (`build_output.log`):**
   - Command: `npm run build`
   - Result: **Exit Code: 0** (`✓ built in 13.81s`).

5. **Equivalence Confirmation:**
   - In `docs/agent_artifacts/giaidoan2_inventory.tsv`, Week 35 reports:
     `W035 | BLUEPRINT_ONLY | CEFR: A2 Flyers | CLIL: MISSING | Vocab: MISSING | Title: Storytelling Practice 2 (Personal Recount)`
   - Week 35 is now verifiably and structurally identical to a true `BLUEPRINT_ONLY` week (such as W38, W78, and W125), carrying zero pedagogical content outside of `blueprint.json`.
