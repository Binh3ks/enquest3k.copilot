# PRODUCTION NEVER RULES — SINGLE SOURCE OF TRUTH

> Canonical reference for ALL production rules that an agent must NEVER violate.
> All other production documents (onboarding, workflow) should link here instead of repeating rules.
> Source: BUG-INSTINCTS.md + ONBOARDING_PROMPT.md + AGENT_SELF_CHECK_WORKFLOW.md
> Last updated: June 1, 2026 (updated: W33 audit fixes + Chunk-First enforcement — GrammarEngine/Easy field names, StoryRemixGame fill_blank type, WordDuelGame meaning_vi fallback, explore NOT identical to read, week_33_real story_missions key, StoryRemixGame isValidChipAnswer guard, CHUNK-FIRST enforcement rules L151-170, CHECK 20c wired into workflow, formal Chunk/Collocation definition rules, mandatory content station + AI Tutor chunk audit)

---

## Chunk & Collocation Content Rules (MANDATORY for ALL English Content)

> **Scope**: These rules apply to `read.js`, `explore.js`, `dictation.js`, `shadowing.js`, `writing.js` sentence_frames, and AI Tutor content (`story_text`, `opening_narrative`, `phase_questions`, `spark_talk`, `freetalk_knowledge`).

### What is a Chunk?

A **chunk** is a multi-word phrase that naturally occurs together in English and forms one unit of meaning. Chunks help students learn real English patterns rather than translating word-by-word.

**Good chunk examples (natural, common, and grammatically sound):**
- `by the way`, `as a matter of fact`, `take a break`
- `sit next to`, `on the wall`, `look outside`, `fall asleep`
- `had fun`, `felt proud`, `said goodbye`, `made a mistake`

**Bad forced combinations (NEVER create these):**
- `made fresh food`, `brought fresh fruit`, `ate yummy food`
- `kind chef`, `nice scientist`, `friendly artist`, `kind teacher is kind`
- `very very tall`, `big big lion`, `busy big classroom`, `right right order`

### What is a Collocation?

A **collocation** is a conventional word partnership that native speakers expect. If you break a collocation, the sentence sounds awkward even if it is grammatically possible.

**Good collocation examples:**
- verb + noun: `make a mistake`, `draw pictures`, `build a birdhouse`, `cut the grass`, `do homework`
- adj + noun: `heavy rain`, `strong wind`, `local market`, `slow tortoise`, `sharp knife`
- adv + verb: `listen carefully`, `read quietly`, `run quickly`
- fixed expressions: `on the wall`, `at the front`, `in the field`, `under her bed`

**NEVER force a collocation that does not sound native.** If a phrase sounds odd to a competent English speaker, simplify it into normal English.

### Mandatory Rules

1. **NEVER create forced adj + profession chunks that sound unnatural.**
   - Wrong: `kind chef`, `nice scientist`, `friendly artist`, `brave firefighters` (while eating lunch)
   - Right: `good cook`, `science lab`, `artist`, `firefighters`

2. **NEVER create forced verb + adjective collocations that sound unnatural.**
   - Wrong: `made fresh food`, `brought fresh fruit`, `ate yummy sandwiches`
   - Right: `made sandwiches`, `brought strawberries`, `ate sandwiches`

3. **NEVER leave a bold chunk word reused standalone in the same sentence if it breaks natural grammar.**
   - Wrong: `My **kind teacher** is kind.`
   - Wrong: `I see a **big brown cow**. The cow...`
   - Wrong: `Emma can **jump high** very high.`

4. **NEVER double modifiers.**
   - Wrong: `very very tall`, `big big lion`, `busy big classroom`, `right right order`, `inside inside`

5. **NEVER prioritize a forced chunk over natural English.**
   - If you must choose between a clever multi-word bold and a clean, natural sentence, choose the natural sentence.
   - A readable passage is more important than a high bold-chunk count.

6. **NEVER change content in read.js, explore.js, writing.js, or AI Tutor without checking the downstream content.**
   - If `read.js` changes, then `dictation.js` and `shadowing.js` must be checked for consistency.
   - If the story or grammar focus changes, then AI Tutor `story_text`, `opening_narrative`, `spark_talk`, and `phase_questions` must stay consistent.

7. **ALWAYS verify chunks and collocations by reading them aloud.**
   - If a sentence sounds awkward when read aloud, rewrite it.
   - The test is simple: would a native teacher or student naturally say this sentence in class?

### Verification Commands

```bash
# CHECK 20c: bold chunks only, no single-word bolds
bash production_kit/tools/code_quality_gate.sh N | grep "20c"

# CHECK 20e: unnatural adj+profession patterns
bash production_kit/tools/code_quality_gate.sh N | grep "20e"

# CHECK 20f: redundant bold chunk + standalone word in same sentence
bash production_kit/tools/code_quality_gate.sh N | grep "20f"
```

---

## Grammar Schema

**Rule: NEVER write grammar exercises with more or fewer than 20 exercises**
- Every grammar.js must have exactly 20 exercises per mode (both Advanced and Easy)
- **Why:** W28+ had 22-24 exercises; quality gate requires exactly 20
- **Verification:** `grep -c '"question":' grammar.js` → must be 20 (both ADV and EAS)
- **Source:** CHECK 20b, BUG-W28-A (confidence 0.9)

**Rule: NEVER use `correct:` field in grammar.js exercises**
- Always use `answer:` — GrammarEngine does NOT validate `correct:` fields
- **Why:** W24-W30 used `correct:` → Grammar always marked wrong, silent failure
- **Verification:** `grep "correct:" grammar.js` → must be EMPTY or comment
- **Source:** BUG-B7 (confidence 0.9), BUG-27 (AGENT_SELF_CHECK_WORKFLOW.md)

**Rule: NEVER assume all grammar exercises use the same field names across modes**
- ADV grammar: exercises use `question_en` (not `question`)
- Easy grammar: exercises use `sentence` (not `question_en`)
- GrammarEngine.jsx: uses `currentQ.question || currentQ.question_en || currentQ.sentence` for display
- StoryRemixGame (SentenceBlitzGame): uses `question || question_en || sentence` for question text
- WordDuelGame: filters for `definition_en` but accepts `meaning_vi` as fallback
- **Why:** W33 — Easy grammar used `sentence:` field → GrammarEngine rendered blank questions; StoryRemixGame used `fill` type → 0 exercises loaded; WordDuelGame in ADV mode showed blank definitions
- **Source:** W33 Audit (May 19, 2026)


- Every exercise must have a real, non-empty answer value
- **Why:** Empty answer = always marked wrong, students get 100% failure on those items
- **Verification:** `grep 'answer: ""' grammar.js` → must be EMPTY
- **Source:** BUG-B8 (confidence 0.9), BUG-30

**Rule: NEVER write unscramble exercises without a `words: []` array**
- Unscramble type must include `words: ["word1", "word2", ...]` array
- **Why:** Embedding words in `[w1/w2/w3]` inside the question string causes a parsing crash
- **Verification:** Check unscramble exercises have `words:` array; `grep -c '"words":\s*\[' grammar.js`
- **Source:** BUG-B9 (confidence 0.9), BUG-28

**Rule: NEVER write unscramble exercises without a `question:` field**
- Minimum: `"question": "Unscramble the words:"`
- **Why:** Missing question field causes undefined behavior
- **Source:** BUG-29

**Rule: NEVER use slash-separated answer strings `"A / B"`**
- Always use array format `["A", "B"]` for alternate answers
- **Why:** Engine treats entire string as a single target; only first token matches
- **Verification:** `grep '"answer".*/' read.js | grep -v '//'` → must be EMPTY
- **Source:** BUG-32 (confidence 0.9)

**Rule: NEVER omit synonyms from `answer[]` arrays in read/explore**
- If both "farm" AND "countryside" appear in `content_en`, both must be in the answer array
- **Why:** Students who type a valid synonym from content get marked wrong
- **Source:** BUG-33

**Rule: NEVER write explore `check_questions` without an `answer: [...]` array**
- Even MCQ-style questions with `correct_answer: "B"` must also have a text-based `answer` array
- **Why:** UI renders blank when answer array is missing
- **Verification:** Every check_questions item must have `answer: [...]`
- **Source:** BUG-31 (confidence 0.9)

**Rule: NEVER write read.js comprehension_questions without full scaffolding**
- W1-W16: exactly 3 questions; W17+: exactly 4 questions
- Each question MUST have: `answer: [...]` (array, ≥2 answers), `clue_statement`, `hint_en`, `hint_vi`
- **Why:** Missing scaffolding = students cannot use hints/clues when stuck
- **Verification:** `bash production_kit/tools/bug_prevention_check.sh N` → B25 must PASS
- **Source:** May 2026 — 12 files found with wrong count or missing fields

**Rule: NEVER use curly quotes `'` `'` in answer strings**
- Always use ASCII apostrophe `'` — never `'` or `'`
- **Why:** Normalization mismatch between user input and expected answer
- **Verification:** `grep "[''']" *.js` → must be EMPTY
- **Source:** BUG-B10 (confidence 0.9), BUG-34

---

## Singapore Math Types

**Rule: NEVER use type names `addition`, `subtraction`, `multiplication`, `division`**
- These are NOT valid renderer types — they silently fall back to `part_whole`
- **VALID types ONLY:** `part_whole | comparison | missing_part | groups | before_after`
- **Why:** W22-W24, W28+ silently rendered wrong type; math content invisible to students
- **Verification:** `grep -E "addition|subtraction|multiplication|division" singapore_math.js` → EMPTY
- **Source:** BUG-B5 (confidence 0.9)

**Rule: NEVER assume existing Singapore Math content is correct without auditing**
- Before any edit, verify: (1) all 5 type names are valid, (2) numbers match week's domain/level, (3) exactly 5 distinct types present per mode
- **Why:** Legacy weeks may have wrong types silently cached
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §Singapore Math W22+ audit

**Rule: NEVER write Singapore Math with single-digit numbers in Advanced mode (W22+)**
- Advanced (W22+): numbers must be ≥2 digits (e.g. 23-8, 27+18, 35-19, 6×8)
- Easy: numbers ≤15; hints must explicitly show operation
- **Why:** Single-digit math is below level for Advanced W22+
- **Source:** BUG-W24 (AGENT_SELF_CHECK_WORKFLOW.md, grammar section)

---

## Audio / TTS

**Rule: NEVER leave `**bold**` in read.js content_en — strip before TTS pipeline**
**Rule: `content_vi` in read.js and explore.js MUST NEVER have `**bold**` markers**
- Vietnamese text must be plain — no `**` bold markers in content_vi fields
- **Why:** Bold markers in Vietnamese text trigger dictionary popups on Vietnamese words — this is wrong UX
- **Detection:** `content_vi` is extracted from template literals (`content_vi: \`...\`) and checked for `**` patterns
- **Affected files:** read.js and explore.js across weeks/ and weeks_easy/
- **Source:** W16 (ghi), W18 (micro), W23 (pigment/texture/symmetry) — all fixed May 2026

- `read.js` content_en contains `**` for UI rendering (students see bold words)
- The TTS pipeline strips `**` before sending to Deepgram — this is correct
- **Why:** W27, W24 had bare text fed to TTS (no bold markers) but the issue was `sentences[]` in dictation/shadowing — see next rule
- **Source:** BUG-B1 (confidence 0.9)

**Rule: dictation/shadowing `sentences[]` CAN contain `**bold**` markers — CHECK 42 handles this**
- The `sentences[]` array in dictation.js and shadowing.js CAN include `**` bold markers
- CHECK 42 applies `strip_bold()` to BOTH read.js content AND sentence text before substring matching — so `**` in sentences[] MATCHES correctly
- The TTS pipeline strips `**` before sending to Deepgram (so "star star word star star" never happens)
- **Why:** W28-33 audit found B1 was a false positive — `sentences[]` `**` markers are fine because `strip_bold()` is applied to both sides in CHECK 42, and the TTS service strips before API call
- **Verification:** `bug_prevention_check.sh` B1 check was corrected — do NOT reject `**` in dictation/shadowing sentences
- **Source:** W28-33 Audit (May 19, 2026), CHECK 42 implementation

**Rule: dictation/shadowing `content_en` must EXACTLY match read.js `content_en`**
- Copy `content_en` verbatim from read.js — include ALL `**` bold markers and `\n` newlines
- NEVER truncate, rephrase, or omit any portion of read.js content_en
- **Why:** CHECK 42 validates this; `content_en` mismatch causes TTS/text mismatch. W32 Easy: missing final sentence and missing `**` markers in both dictation and shadowing
- **Verification:** CHECK 42 (code_quality_gate.sh C-42) — dictation/shadowing content_en must match read.js content_en character-for-character
- **Source:** W28-33 Audit (May 19, 2026), CHECK 42

**Rule: NEVER replace `___` with "blank" in TTS text**
- Always keep `___` — `cleanTextForTTS()` in `voiceService.js` converts `___` → `,` (natural pause)
- **Why:** Reverting causes TTS to literally say "blank" during mindmap playback; W-MAY2026-TTS incident
- **Source:** BUG-B14 (confidence 0.8), BUG-W-MAY2026-TTS

**Rule: NEVER use different audio_url patterns for dictation vs shadowing when sharing same text**
- dictation.js and shadowing.js must point to the SAME R2 file when text is identical
- **Why:** Prevents double R2 storage, ensures audio consistency; W27 had mixed `_NN` vs `_sN` naming
- **Verification:** Compare `audio_url` paths between dictation.js and shadowing.js for identical sentences
- **Source:** BUG-B20 (confidence 0.8), BUG-27

**Rule: NEVER assume R2 purge alone fixes stale audio**
- After any R2 audio purge, also clear browser IndexedDB (site data)
- **Why:** R2 purge removes server cache; browser IndexedDB Layer 1 cache persists
- **Source:** ONBOARDING_PROMPT.md

---

## Collocations / Chunks — Chunk-First Authoring (ALL Weeks)

> **Single source of truth for chunk-based content.** Source: Blueprint Section VII.b (updated May 22, 2026)

**Rule: NEVER bold a single word in read.js — bold ONLY multi-word chunks**
- ✅ `**ran down** the hill` | ❌ `ran down **the** hill` | ❌ `**ran** down the hill`
- **Why:** Single-word bolds = 0 allowed ALL weeks (W1-156). Single-word bold = wrong UI behavior (dictionary lookup vs. chunk popover). W28-33 audit found 100% single-word bolds — catastrophic policy violation.
- **Verification:** CHECK 20c — `code_quality_gate.sh` flags single-word bolds. Run: `bash production_kit/tools/code_quality_gate.sh N | grep "20c"`
- **Source:** Blueprint §VII.b (2026-05-22 enforcement note)

**Rule: W28+ MUST embed ≥10 multi-word chunks per passage, 1-3 per sentence**
- Every sentence in read.js must contain ≥1 natural chunk from the checklist
- Target collocation lists: Movement (went to, ran down...), Daily routine (got up, fell asleep...), Action (looked at, picked up...), Communication (talked to, listened to...), Mental state (felt happy, got angry...), Accumulated (hurt my knee, fell down...)
- **Why:** Cambridge Flyers/Movers evaluate chunk knowledge. W29 and W31 had 0 multi-word chunks — complete failure. W30 had 2 chunks — major gap.
- **Verification:** `bash production_kit/tools/code_quality_gate.sh N | grep "20c"` → must show ≥10 multi-word chunks
- **Fix:** Rewrite sentences to embed natural chunks instead of isolated vocabulary
- **Source:** Blueprint §VII.b, Phase 3 spec (W28-156: ≥10 chunks/passages)

**Rule: dictation/shadowing sentence selection must prioritize chunk-rich sentences from read.js**
- W28+: Select 10-12 (ADV) / 8-10 (Easy) sentences that contain the most chunks
- **Why:** Students practice chunks they see in the reading passage. W29-W31 had chunk-rich sentences excluded from dictation/shadowing.
- **Verification:** CHECK 20c validates bold count in both read.js and dictation/shadowing coverage
- **Source:** Blueprint §VII.b Station Strategy (read.js → dictation.js → shadowing.js chunk flow)

---

## Mindmap

**Rule: NEVER create a mindmap.js with fewer than 3 personal stems**
- Both ADV and Easy modes: at least 3 stems must start with `"I ___"` or `"My ___"`
- Examples: `"I am ___."`, `"My favourite ___ is ___."`, `"I feel ___ when ___."`
- **Why:** Personal stems are REQUIRED for both modes, ALL weeks W2+; PERSONAL-STEMS-MAY2026
- **Verification:** `grep '"I '" mindmap.js | wc -l` ≥ 3 AND `grep '"My "' mindmap.js | wc -l` ≥ 3
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §Week 22 Regression Guards, PERSONAL-STEMS-MAY2026

**Rule: NEVER put mindmap branch text with `/audio/` or `{ ... }` in `text` fields**
- `text` fields must contain plain sentence strings only
- **Why:** BUG pattern — invalid data causes rendering failure
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §Week 22 Regression Guards

**Rule: After ANY mindmap audio URL scheme change, bump `DB_VERSION` in `ttsCache.js`**
- Current value: `= 11` in `src/services/ttsCache.js`
- Bumping forces `onupgradeneeded` → wipes stale IndexedDB blobs → users get fresh audio
- **Why:** W-MAY2026-CACHE incident — stale blobs caused wrong audio playback
- **Source:** BUG-W-MAY2026-CACHE

---

## File Structure

**Rule: NEVER place `week_NN_real.js` at the `src/data/weeks/` root level**
- MUST be at: `src/data/weeks/week_NN/week_NN_real.js`
- NOT at: `src/data/weeks/week_NN_real.js`
- **Why:** `weekData.js` → `getCurrentWeekData()` only tries the subfolder path at Priority 1; root-level placement causes PronunciationTab to return default data → "No sentence available"; W28 incident
- **Verification:** `ls src/data/weeks/week_*/week_*_real.js` → must EXIST
- **Source:** BUG-B6 (confidence 0.9), BUG-W28

**Rule: NEVER create `.js` or `.jsx` files with Python**
- ALWAYS use Node.js with `fs.writeFileSync()` or heredoc
- **Why:** W12-W13: 36% of all bugs traced to Python-generated JS files — encoding issues, f-string syntax, missing exports
- **Verification:** Check which tool created the file; Python scripts for JS creation are a bug
- **Source:** BUG-B2 (confidence 0.9)

**Rule: NEVER write Vietnamese file content using shell heredoc (`cat << EOF`)**
- Always write a Python helper script using `pathlib.Path.write_text(content, encoding="utf-8")`
- **Why:** Terminal mangles UTF-8 Vietnamese characters in heredoc
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md

**Rule: NEVER skip metadata.js update with the real week title**
- Must update with actual week title from Syllabus — NOT "Week N" generic
- **Why:** Sidebar shows "Week N" generic if metadata is blank; B6 bug
- **Verification:** `grep "Week N" metadata.js` → must be EMPTY
- **Source:** BUG-B3 (confidence 0.9)

**Rule: NEVER skip UI imports (3 files must be updated for every new week)**
- Files: `StoryMissionTab.jsx`, `FreeTalkTab.jsx`, `gameAdaptation.js`
- Missing = Week falls back to Week 7 content
- **Why:** Vite's module loader only loads weeks registered in these files
- **Verification:** `grep "weekNRealData" src/modules/ai_tutor/tabs/StoryMissionTab.jsx` → 2 matches (import + ternary)
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER forget `index.js` — week WILL NOT LOAD without it**
- Required in BOTH Advanced and Easy week folders
- **Why:** Vite's lazy loader requires index.js as the entry point for each week folder
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §BƯỚC 3

**Rule: NEVER use `logic.js` for W16+ stations — use `logic_science.js` instead**
- W1-15: `logic.js` is the correct file
- W16+: `logic_science.js` is the correct file (NOT `logic.js`)
- Both files exist in Week 6 as legacy; Week 16+ only uses `logic_science.js`
- Golden standard: Week 6 for W1-15, Week 16 for W16+
- **Why:** W33 workflow cloned `logic.js` for W16+ — wrong file, quality gate expects `logic_science.js`
- **Verification:** W16+: `ls logic_science.js` must exist; `logic.js` should not be referenced
- **Source:** Quality gate CHECK 19.5

**Rule: video_tasks.json must include BOTH Advanced and Easy entries per week**
- For each new week N, add two entries to `src/data/video_tasks.json`:
  - `{ "weekId": N, "note": "...", "videos": [...] }` (Advanced)
  - `{ "weekId": "N_easy", "note": "...", "videos": [...] }` (Easy)
- **Why:** W31+ explore.js requires W31/W32_easy entries; missing Easy entry causes quality gate failure
- **Verification:** `grep "\"weekId\".*\"${WEEK}_easy\"" src/data/video_tasks.json` → must return 1 match
- **Source:** W28-33 Audit (May 19, 2026), CHECK 20b
- Before creating a new week, check for and rename any `src/data/weeks/week_N.js` or `src/data/weeks_easy/week_N.js`
- Vite checks FLAT FILE FIRST, FOLDER SECOND — old flat files silently override folders
- **Why:** W15: Easy mode loaded "Grandma's Old Box" from Jan 6 flat file instead of new folder content
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §BƯỚC 0 (PRE-FLIGHT FILE CLEANUP)

**Rule: NEVER forget to `git add public/images/weekN/` after R2 upload**
- Cloudflare Pages deploys from git, NOT from R2 wrangler upload
- **Why:** W26: 21 images uploaded to R2 but never committed → git had placeholders → Cloudflare Pages deployed blanks
- **Verification:** `git status public/images/weekN/` → must show CLEAN (no modified files)
- **Source:** BUG-B4 (confidence 0.9), BUG-W26

**Rule: NEVER create week sub-tab files (read_stem.js, read_social.js, explore_stem.js, explore_social.js, social_quiz.js) before W35 spec exists**
- W16+ sub-tab architecture is PLANNED but NOT YET DEPLOYED
- **Why:** Referencing aspirational specs before implementation causes broken builds
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §CRITICAL ARCHITECTURE NOTE

---

## Content Quality

### 🚨 FUNDAMENTAL PRINCIPLE: Collocations/Chunks Are The Core

> **Collocations/chunks are the single most important element across ALL weeks and ALL stations.**

Cambridge Flyers and Movers evaluate chunk knowledge — not individual word memorization. Every piece of content we create must embed, practice, and reinforce natural collocations/chunks. This is not one rule among many; it is the lens through which all content decisions are made.

**What this means across stations:**

| Station | How to embed collocations/chunks |
|---------|----------------------------------|
| **read.js / explore.js** | Bold **only** chunks/collocations — never bold single words |
| **vocab.js** | `collation` field uses natural chunk examples, not word + random noun |
| **grammar.js** | Use chunk-based fill-in-the-blank (e.g., "**ran down** the hill" not "ran ___ the hill") |
| **dictation.js** | Include chunk-rich sentences from read.js |
| **shadowing.js** | Select collocation-rich sentences (W28+: ≥8 sentences) |
| **logic_science.js** | Context includes chunks in question text and scenario descriptions |
| **mindmap_speaking.js** | Node labels use chunk phrases; speaking prompts reference chunk vocabulary |
| **AI Tutor** | Must have `chunk_focus[]` (key chunks from read.js); `knowledge_base` must include empathy rules; `opening_narrative` and `phase_questions` must be empathetic — NEVER use "Great!" after negative student input |
| **word_power.js** | Items are phrasal verbs/idioms (multi-word chunks) |
| **GameHubs** | Match/choice games feature chunk pairs, not isolated words |

**Bolding = ONLY chunks.** Single words are clickable dictionary lookups — they are NOT highlighted in the reading text.

**Verification:** Count bold spans that are single-word (no space inside `**`) — must be 0. Count bold spans that contain ≥1 space (chunks) — must be ≥10 (W1-15) or ≥13 (W16+).

**Why:** W28-33 deployed with individual words bolded instead of chunks. Students learned words but failed Cambridge Flyers chunk-based questions.

**Rule: AI Tutor (week_XX_real.js) MUST have `chunk_focus[]` field**
- `chunk_focus` must be added to every week_XX_real.js file (W25+)
- Source: extract multi-word chunks from read.js bold items; select 5-8 key chunks per week
- Place before `target_vocab` field
- Also add to `knowledge_base`: `"IMPORTANT — Must use these chunks in story_text: 'chunk1', 'chunk2'"`
- **Why:** AI-generated content was not using chunk/collocations from read.js; students were not reinforced

**Rule: AI Tutor MUST respond with empathy — NEVER use positive feedback after negative input**
- `knowledge_base` must include: "Always respond with empathy and understanding. Acknowledge student feelings before correcting. If a student shares something negative, say you are sorry or that sounds difficult. NEVER say 'Great!' after a student describes an injury or accident."
- `opening_narrative` and `phase_questions` must use empathetic framing ("That sounds scary!", "Poor Jake!", "I am sorry to hear that")
- `spark_talk` follow-up questions must stay on topic, not jump to unrelated emotions
- **Why:** W33 screenshot showed "Great!" after "broke my leg" — wrong tone for safety topic

**Rule: NEVER use wrong vocab count for the current sub-period**
- vocab.js word count by sub-period:
  - W1-15: 10 words
  - W16-27: 13 words
  - W28+: 18 words
- Easy mode must have the same vocab count as Advanced mode
- **Why:** W28-31 deployed with 18 words (correct), W33 has only 13 (should be 18 for W33 since W33≥28)
- **Verification:** `grep -c "image_url:" vocab.js` → 18 for W28+, 13 for W16-27, 10 for W1-15
- **Source:** Audit W28-31, CHECK 34/35, BUG-W28-A

**Rule: NEVER write vocab.js `collation` field with unnatural or template-generated phrases**
- The `collation` field (singular, not `collocations`) must contain natural, authentic chunk examples
- Each `collation` entry should show the target word INSIDE a real collocation, not just "the word + a noun"
- **Good:** `"ran down the hill / got up early / looked after the cat / kept on trying"`
- **Bad:** `"a slow tortoise / a fast hare / the exciting race"` (these are adjective+noun, not collocations)
- **Why:** W28 vocab had template-generated "collocations" that were just adjective+noun phrases, not authentic collocations
- **NO minimum count** — include 1-3 natural collocations per entry if they exist; omit if no natural collocations apply
- **Verification:** `collation` field must show verb+particle, verb+preposition, or verb+adverb patterns — NOT just "adjective + noun"
- **Source:** Fundamental Principle (May 19, 2026), User directive

**Rule: NEVER use wrong word_power count for the current sub-period**
- word_power.js uses phrasal verb/idiom structure (NOT preposition phrases from W1-6)
- Count by sub-period:
  - W1-15: ≥ 6 items
  - W16-27: exactly 6 items
  - W28+: exactly 8 items
- Each `word:` field must be a multi-word phrase (contains a space)
- **NO** `collocations:` sub-field — items are standalone phrasal verbs/idioms
- **Why:** W28-31: 8 items, W33: 6 items. Quality gate CHECK 20 enforces W28+=8, W16-27=6
- **Verification:** `grep -c '"id":' word_power.js` → 8 for W28+, 6 for W16-27
- **Source:** Audit W28-31, CHECK 20

**Rule: NEVER use dictation.js = exact copy of read.js (W28+)**
- dictation.js is a **SELECTED SUBSET** of read.js sentences, not a full copy
- **W1-27:** all sentences from read.js (8-15 sentences)
- **W28+:** Advanced=10-12 sentences, Easy=8-10 sentences — selected to cover all vocab + key collocations + story arc
- **Never recreate dictation sentences from scratch** — always SELECT from read.js
- **Why:** Copying all read.js sentences makes dictation too long; W28 ADV had 32-sentence read → 21-dict (still too many); target is 10-12
- **Verification:** dictation sentence count vs read.js: W28+=10-12 Adv / 8-10 Easy
- **Source:** Audit W28-33, User directive (May 18, 2026)

**Rule: NEVER use wrong shadowing format for the current phase**
- **W1-15:** phrase chunks (3-5 words per block) — pronunciation training
- **W16-27:** full sentences, gradually increasing toward 15-17 sentences
- **W28+:** full sentences, **minimum 8**, focus on collocation-rich sentences; count increases gradually with phase
- **Never copy ALL read.js sentences into shadowing.js** — select collocation-rich sentences
- **Why:** W28 shadowing=18 sentences (56% of read.js); W33 shadowing=8 (47%) — inconsistent; W28+ should use 8-12
- **Verification:** shadowing sentence count: W28+ ≥ 8, matches collocation coverage of read.js
- **Source:** User directive (May 18, 2026)
- Easy = Personal context (Grade 2-3 level), simpler vocabulary
- Advanced = Global/formal context
- **Why:** W24 — students learn identical content twice; violates dual-mode differentiation
- **Verification:** First sentence of Easy read.js must differ from Advanced read.js
- **Source:** BUG-B11 (confidence 0.8)

**Rule: NEVER use `comprehension_questions` in explore.js for W31+ — use `check_questions`**
- W1-30: explore.js uses `comprehension_questions`
- W31+: explore.js must use `check_questions` (different schema)
- **Why:** W31 Easy explore.js used `comprehension_questions:` — wrong field name caused quality gate failure
- **Verification:** For W31+: `grep "check_questions" explore.js` → must exist; `grep "comprehension_questions" explore.js` → must be EMPTY
- **Source:** W28-33 Audit (May 19, 2026), CHECK 20b
- **BOLD ONLY chunks/collocations — never bold single words**
- W1-15: ≥ 10 bolded chunks (multi-word phrases with ≥1 space)
- W16+: ≥ 13 bolded chunks
- Single words (no space inside `**`) = 0 allowed in read.js content_en
- **Why:** Cambridge Flyers tests chunk knowledge; bolding single words teaches vocabulary but fails chunk acquisition
- **Verification:** Single-word bold count = 0; chunk bold count ≥ 10 (W1-15) or ≥ 13 (W16+)
- **Source:** BUG-B12 (confidence 0.8), CHECK 20c, Fundamental Principle (May 19, 2026)

**Rule: NEVER write read.js with zero collocations/chunks (ALL weeks)**
- Every week (W1-156) must embed collocations/chunks in read.js content_en
- W1-15: embed natural chunks where they appear (e.g., "**go to school**", "**wake up**", "**put on**")
- W16-27: embed 2-5+ chunks per passage (increase gradually)
- **W28+: embed ≥10 collocations/chunks per passage** (Cambridge Flyers focus)
- Each sentence should contain 1+ collocation where natural (e.g., "The hare **ran down** the hill" not just "The hare ran fast")
- Common collocations to embed: went to, ran to, fell asleep, got up, looked at, picked up, kept on, came back, ran away, waited for, looked after, gave up, turned on/off, made up, found out, got dressed, came in, went out, go shopping, do homework, play games, read books, eat breakfast, clean the room, paint a picture, write a letter, open the door, close the window
- **Why:** Cambridge Flyers evaluates chunk knowledge; W28-33 deployed with 0-5 collocations in 300-word passages — far below standard
- **Verification:** Count collocations in read.js with `grep -oE 'collocations pattern'` or manual review
- **Source:** User directive (May 18, 2026)

**Rule: NEVER use `node tools/generate_images_nano.js N` output as final prompts**
- Auto-generated descriptions use dictionary definitions, not visual scene descriptions
- Always rewrite with rich scene descriptions before AI image generation
- **Why:** Dictionary definitions produce flat/abstract images unsuitable for vocabulary learning
- **Source:** ONBOARDING_PROMPT.md

**Rule: dictation/shadowing sentences must include FULL read.js text — NEVER truncate at em-dash or comma**
- Every sentence in dictation.js and shadowing.js must be a verbatim substring of read.js content_en
- Read.js often continues a sentence after an em-dash (`—`) or comma. Dictation/shadowing sentences MUST include this continuation text.
- **Example failure:** read.js = `"They hammered the nails carefully and put the birdhouse on the tall oak tree near the fence."` → shadowing had `"They put the birdhouse on the tall oak tree near the fence."` → CHECK 42 FAIL
- **Example success:** shadowing sentence = `"They hammered the nails carefully and put the **birdhouse** on the tall oak tree near the fence."` → CHECK 42 PASS
- **Why:** CHECK 42 uses substring matching — any truncation breaks the match. W31 ADV dictation sentence 11 and W32 ADV shadowing 7 sentences failed this way.
- **Verification:** CHECK 42 (code_quality_gate.sh C-42) — all dictation/shadowing sentences must be verbatim substrings of read.js content_en (after `strip_bold` is applied to both)
- **Source:** W28-33 Audit (May 19, 2026), CHECK 42, BUG-W31-A, BUG-W32-A

---

## ASK_AI Schema (Scaffolding — W1-33)

**Rule: NEVER put wh-words or aux verbs before `___` in `question_frame`**
- `question_frame` MUST start with `___` — the blank must come FIRST
- Students pick a wh-word (W1-27) or wh+aux starter (W28+) and fill the blank
- **Why:** Progressive scaffolding: show less → student does more. W1-14 had wh-words before `___` which bypassed the blank-filling step.
- **Example WRONG:** `"What ___ is your bag?"` → `correctWord: "What"`
- **Example CORRECT:** `"___ is your bag?"` → `correctWord: "What"`
- **Source:** Ask AI Scaffolding Audit (May 19, 2026), User directive

**Rule: NEVER omit `correctWord` field in any ask_ai.js prompt**
- Every prompt MUST have `correctWord: "X"` where X is the exact correct word/starter
- Component validates student selection against `correctWord`
- **Why:** Without `correctWord`, the component cannot validate or show green/red feedback
- **Source:** Ask AI Component (AskAi.jsx, May 19, 2026)

**Rule: NEVER use wrong word bank size in ask_ai.js**
- **W1-27:** `question_word_bank` must have exactly 6 options (the 6 wh-words)
  `["What","When","Where","Who","Why","How"]`
- **W28+:** `question_word_bank` must have exactly 4 aux verb options (wh-word + aux combined)
  e.g. `["Why did","Why does","What did","What does"]`
- **Why:** W1-27 = wh-word recognition (6 options). W28+ = wh-word + auxiliary verb (4 options = 2×2 grid). Progressive difficulty increase.
- **Source:** Ask AI Scaffolding Audit (May 19, 2026), User directive

**Rule: NEVER add `task_en`/`task_vi` in ask_ai.js prompts for W17+**
- `task_en`/`task_vi` are scaffolding hints shown in W1-16 ONLY
- **W1-16:** prompts may include `task_en: "Ask Nova WHAT her bag is."` (ALL CAPS wh-word)
- **W17+:** prompts must NOT have `task_en`/`task_vi` — student selects without hints
- **Why:** Removing the hint increases difficulty progressively
- **Source:** Ask AI Scaffolding Audit (May 19, 2026)

**Rule: NEVER add `topic_talk_prompt` field to `ask_ai.js`**
- Topic Talk has been REMOVED from Ask AI (free speaking belongs to AI Tutor tab)
- **Why:** W28+: `topic_talk_prompt` mistakenly included in ask_ai
- **Verification:** `grep "topic_talk" ask_ai.js` → must be EMPTY
- **Source:** BUG-B19 (confidence 0.8)

**Rule: NEVER add `prompt_en`, `prompt_vi`, or `hint_en` fields to `ask_ai.js`**
- These are invalid fields for the current Ask AI engine
- **Why:** W28-31 — Invalid fields cause parsing errors
- **Verification:** `grep -E "prompt_en|prompt_vi|hint_en" ask_ai.js` → must be EMPTY
- **Source:** BUG-B15 (confidence 0.8)

**Rule: NEVER create opinion/discussion contexts in `ask_ai.js`**
- `nova_says` MUST be a single simple sentence — not roleplay, not advice-seeking
- **Why:** Ask AI is strictly a question-formation exercise; W28 Advanced used long roleplay contexts incompatible with question-making blueprint
- **Verification:** `nova_says` length ≤ 100 chars; ends with a statement that prompts a question
- **Source:** BUG-B16 (confidence 0.8), BUG-W28

---

## Images

**Rule: NEVER include `barmodel_` entries in `week_N_image_prompts.txt`**
- Bar models are auto-generated by `generate_logiclab_barmodels.py N`, NOT from AI prompts
- **Why:** W26: `barmodel_` entries in prompts caused duplicate/unneeded AI image generation
- **Source:** ONBOARDING_PROMPT.md, C-40 quality gate

**Rule: NEVER use `immutable` cache-control — always use `max-age=86400`**
- **Why:** W25: Wrong cache-control header caused images to never update in browser
- **Source:** BUG-W25, ONBOARDING_PROMPT.md

**Rule: NEVER upload images to the wrong R2 bucket**
- Correct bucket: `engquest-images` (not `engquest-audio`)
- **Why:** W25: Uploading to wrong bucket → images in local simulation, not on CDN
- **Source:** BUG-W25

**Rule: NEVER hardcode image filenames from a previous week in `image_url` fields**
- All `image_url` paths must use `/images/weekN/` where N = current week
- **Why:** W25: Hardcoded previous-week filenames → CHECK 23b FAIL
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER copy or auto-generate vocab/wordpower/cover images from other weeks**
- Only create prompts for `week_N_image_prompts.txt`; manually generate images
- **Why:** W26: Copying images from prior weeks → CHECK 23c FAIL, broken filenames
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER save image prompts files to the project root**
- Always save to `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt`
- **Why:** W28: File created at root level, had to be manually moved
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER skip bar model generation**
- Always run `python3 tools/generate_logiclab_barmodels.py N` + upload to R2 after creating Singapore Math content
- **Why:** W26: Treated as optional → Logic Lab showed blank bar models
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER use markdown format (`### N. filename.jpg`) in image prompt files**
- Use `Filename:` format matching W30+ style
- Correct format: `N. [Vietnamese intro]. Filename: [filename]. [prompt]. No text or letters in the image.`
- Incorrect format: `### N. filename.jpg` (markdown headers) or bare numbered lists
- **Why:** code_quality_gate.sh CHECK 34 uses `grep -c "Filename:"` — markdown format gives 0 matches → all vocab image checks fail. W32 image_prompts.txt had this exact failure.
- **Verification:** `grep -c "Filename:" Production_FINAL/IMAGE\ PROMPTS/week_NN_image_prompts.txt` → must equal number of prompts
- **Source:** W28-33 Audit (May 19, 2026), CHECK 34
- Only include: vocab images + wordpower collocation images + read/explore covers
- **Why:** W28: Original prompt file had 29 items including unused covers (should be 13 vocab + N collocations + 2 covers)
- **Source:** ONBOARDING_PROMPT.md

---

## Writing

**Rule: NEVER write writing.js without `sentence_frames` (W31+ mandatory)**
- `sentence_frames` array must exist in every writing.js
- Blanks: `___` (triple underscore) — VideoChallenge splits on exactly `___`
- **Why:** VideoChallenge Write tab requires this to render fill-in inputs; W30 students had no prompts
- **Verification:** `grep "sentence_frames" writing.js` → must exist
- **Source:** ONBOARDING_PROMPT.md §Live Features

**Rule: NEVER write `sentence_frames` that don't cover all questions in `prompt_en`**
- Count question marks in `prompt_en` → need ≥ that many frames; each frame should answer at least one question
- **Why:** Pedagogical requirement: passive students must produce a complete paragraph by filling frames only
- **Verification:** Count `?` in prompt_en ≤ count of sentence_frames entries
- **Source:** C-50 quality gate, ONBOARDING_PROMPT.md

**Rule: NEVER use `____` (4+ underscores) or `[blank]` or `( )` in sentence frame templates**
- Only `___` (exactly 3 underscores) is recognized by VideoChallenge as a fill-in blank
- **Why:** Wrong blank format = inputs not rendered; W30 had mixed formats
- **Source:** C-52 quality gate

**Rule: NEVER skip `topic_talk_prompt` in writing.js (W8+ mandatory)**
- Must add `topic_talk_prompt: "Tell me about [week theme — 1 short sentence]"` to both ADV and Easy writing.js
- **Why:** W8-W30 already have it; W31+ must continue — TopicTalk speaking tab depends on this
- **Source:** ONBOARDING_PROMPT.md §Live Features, C-51 quality gate

---

## Dictionary

**Rule: NEVER use unaccented Vietnamese in dictionary entries**
- Correct: `đã nhìn`, `đã chơi`, `tối qua`, `nhìn`, `chơi`
- Incorrect: `da nhin`, `da choi`, `toi qua`
- **Why:** W21: Entries used ASCII "da nhin" instead of proper Vietnamese with tone marks — user confusion
- **Verification:** `npm run dict:lint -- --errors-only` → [E2] check for unaccented Vietnamese
- **Source:** BUG-W21, ONBOARDING_PROMPT.md §Dictionary

**Rule: NEVER use generic example sentences in dictionary**
- Examples must have real context children can recognize (classroom, family, sports, nature)
- Forbidden: `"These X are interesting to study"`, `"The X is very important to us"`, `"X plays an important role today"`
- **Why:** W29: Generic "plays an important role today" examples; W21: "nhưng hệ thống expect" normalization mismatch
- **Verification:** `npm run dict:lint -- --errors-only` → [E1] check for generic examples
- **Source:** BUG-W29, ONBOARDING_PROMPT.md §Dictionary

---

## AI Tutor Data (`week_NN_real.js`)

**Rule: NEVER skip `freetalk_knowledge` in `week_NN_real.js`**
- Schema: `{ week_title, week_number, theme, knowledge_base[≥8 facts], example_opening_questions[≥5], starter_prompts[] }`
- **Why:** Missing = FreeTalk AI has no context → generic responses; W17, W18, W20-28 were backfilled
- **Verification:** `grep "freetalk_knowledge" week_*_real.js` → must EXIST
- **Source:** BUG-B17 (confidence 0.8)

**Rule: NEVER skip `spark_talk` array in `week_NN_real.js`**
- ≥ 2 cards per week; each card has ≥ 3 `scaffold_frames` (fill-in templates with `___`)
- **Why:** Missing = Spark Talk tab shows "No topics available"; W1-W30 all backfilled Apr 2026
- **Verification:** `spark_talk` array length ≥ 2; each card has ≥ 3 `scaffold_frames`
- **Source:** BUG-B18 (confidence 0.8)

**Rule: NEVER leave `spark_talk` `frames` array empty**
- Use `scaffold_frames` fallback minimum if `frames` is empty
- **Why:** W2-W29 engine needs backward-compat `scaffold_frames`
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER write `spark_talk` bridge without a pivot phrase**
- Bridge MUST end with: "And what about YOU?" or "And what is YOUR…?" — no abrupt story-to-personal jump
- **Why:** Abrupt transitions confuse students; bridge should smoothly pivot from story to personal
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER write `spark_talk` seed_question as multiple sub-questions**
- Must be a SINGLE question with `Say: A or B!` hint — not 3 questions at once
- **Why:** Multiple questions overwhelm young learners
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER skip `target_vocab` array in `week_NN_real.js`**
- 13 word objects, each with `word`, `pronunciation`, `definition_en`, `definition_vi`
- **Why:** Missing = AI Tutor Speak tab shows "Loading..." forever; W24 bug
- **Source:** BUG-W24

**Rule: NEVER put ACK words at start of `phase_questions` strings**
- Do not start with "Great!", "Wonderful!", "Excellent!" etc.
- **Why:** Nova should not affirm before asking; ACK comes after student response, not in questions
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §BƯỚC 2

**Rule: NEVER use `missions` key in `week_NN_real.js` — use `story_missions`**
- The AI Tutor components (`StoryMissionTab.jsx`, `FreeTalkTab.jsx`) use a large ternary chain that reads `weekRealData.story_missions?.[currentMissionIndex]`
- **Key name MUST be `story_missions`** (plural, snake_case, `story_` prefix)
- NOT `missions`, NOT `storyMissions`, NOT `story-missions`
- **Why:** W33 used `missions: [...]` → 0 missions loaded → AI Tutor Story Mission tab blank
- **Verification:** `grep -E "story_missions|missions\b" src/data/weeks/week_N/week_NN_real.js` → `story_missions` must exist, `missions` must NOT exist
- **Source:** W33 Audit (May 19, 2026)

**Rule: NEVER use `conversation_cards` inside missions — rename to `discussion_prompts`**
- Top-level `conversation_cards` use `exchanges[]` format (NOT `prompt_en`/`starter` format)
- **Why:** C-39 quality gate flags `prompt_en:` anywhere in real.js
- **Source:** C-39 quality gate

---

## Architecture & Infrastructure

**Rule: NEVER modify `public/_redirects`, `public/_headers`, `vite.config.js` without explicit permission**
- These files control Cloudflare SPA routing — changes can break the entire site
- **Why:** W-MAY2026: Agent added `/assets/* /404.html 404` to `_redirects` → broke ALL React Router routes (SPA returned 404.html instead of index.html)
- **Rule:** `_redirects` must ONLY contain: audio proxy rule + `/* /index.html 200` as the LAST rule
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §INCIDENT LOG [2026-05-15]

**Rule: NEVER skip `bash tools/code_quality_gate.sh N` before committing**
- 46 automated checks covering schema, content, cross-week conflicts, and lint
- **Why:** W20: Agent bypassed manual checks → 3 UI files uncommitted, missing conversation_cards, wrong vocab count
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §BƯỚC 8.5

**Rule: NEVER skip `npm run content:lint -- --week N --errors-only` before committing**
- Validates read.js + explore.js word count, bold markers, Vietnamese in content_en, banned B1+ vocab
- **Why:** W29: Generic dict examples + unaccented Vietnamese — lint catches [E1], [E2]
- **Source:** ONBOARDING_PROMPT.md, CHECK 43 quality gate

**Rule: NEVER skip `npm run dict:lint -- --errors-only` after `dict:build`**
- Blocks [E1] generic examples, [E2] unaccented Vietnamese, [E3] missing fields
- **Why:** W29: Dict had generic "plays an important role today" examples caught by lint
- **Source:** BUG-W29, ONBOARDING_PROMPT.md

**Rule: NEVER deploy without browser testing**
- Must test BOTH Advanced AND Easy modes separately in browser
- **Why:** W7-W12: Agent reported "done" but files did not exist; Easy mode silently fell back to Week 7
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §BƯỚC 9

**Rule: NEVER push to git without verifying `git status public/images/weekN/` is clean**
- **Why:** W26: 21 images uploaded to R2 but not in git → Cloudflare Pages deployed placeholder images
- **Source:** BUG-B4, BUG-W26, ONBOARDING_PROMPT.md

**Rule: NEVER use `node tools/generate_images_nano.js N` output as final prompts**
- Auto-generated descriptions use dictionary definitions, not visual scene descriptions
- Always rewrite with rich, descriptive scene prompts before AI image generation
- **Why:** Dictionary definitions produce abstract/flat images unsuitable for vocabulary learning
- **Source:** ONBOARDING_PROMPT.md

**Rule: NEVER skip bar model generation + R2 upload**
- Run `python3 tools/generate_logiclab_barmodels.py N` then `python3 tools/upload_week_images_r2.py N`
- **Why:** W26: Treated as optional → Logic Lab showed blank bar models
- **Source:** ONBOARDING_PROMPT.md

---

## Theme & Consistency

**Rule: NEVER make explore.js content identical to read.js content**
- explore.js (W31+) must be thematically-related but DIFFERENT content — an expansion of the week's theme into real-world knowledge, cross-cultural perspectives, or critical thinking
- explore.js is NOT a retelling of the read.js story — it is a thematic extension
- **Why:** W33 explore.js was a verbatim copy of read.js → Explore station identical to Read → student confusion
- Good examples: W32 explore = "Saturday chores around the world" (different culture angle on same week's vocab); W33 explore should = "School safety and first aid" (thematic extension)
- **Verification:** `diff <(grep content_en read.js | head -5) <(grep content_en explore.js | head -5)` → must differ
- **Source:** W33 Audit (May 19, 2026)


- ADV games.js (W28+): `{ title, image_url, audio_url, games[], show_tell, make_sentence, ask_me }` — NO detail_map/emoji_map/distractor_map/frame_map/sentence_hints_map/definitions
- Easy games.js (W28+): Same structure as ADV, 3 games (matching + sorting + fill_in), simplified vocabulary
- games[]: 2 games for ADV (matching + sorting), 3 games for Easy (matching + sorting + fill_in)
- show_tell: `{ steps, word_list, instructions_easy, instructions_advanced, step_instructions }` — ONLY these fields
- make_sentence: `{ instructions_easy, instructions_advanced, sentences_easy[], sentences_advanced[] }`
- ask_me: `{ instructions_easy, instructions_advanced, contexts_easy[], contexts_advanced[] }`
- **Why:** W33 agent cloned W16 format (with detail_map/emoji_map) — this is DEPRECATED. W28-32 games.js is the golden standard.
- **Verification:** `grep "detail_map\|emoji_map\|distractor_map" src/data/weeks/week_N/games.js` → must be EMPTY for W28+
- **Source:** BUG-W33 (agent error)

**Rule: NEVER generate image prompts for only Advanced word_power without checking Easy**
- Check BOTH `weeks/week_N/word_power.js` AND `weeks_easy/week_N/word_power.js` for unique collocations
- Generate prompts for the UNION of both sets
- **Why:** W27: 3 Easy-only collocations (grow_towards_the_sun, make_its_own_food, watch_it_grow) were missing images
- **Source:** BUG-W27

**Rule: NEVER change Cambridge YLE station content without updating all 5 stations**
- When changing a week's theme, must update: grammar.js + ask_ai.js + games.js + read.js bold words + word_match.js pairs
- **Why:** Week 28-31 incident showed cross-station theme drift
- **Source:** ONBOARDING_PROMPT.md §Cambridge YLE Integration

---

## Week-Specific Rules

**Rule: W16+ word_power.js `word` field must be a multi-word collocation**
- Must contain a space (e.g. "go to kindergarten" not "kindergarten")
- **Why:** Single-word entries violate W16+ collocation standard
- **Verification:** `grep -E '^\s+word: "[^ "]+",' word_power.js | grep -v audio_` → must be EMPTY
- **Source:** ONBOARDING_PROMPT.md

**Rule: W16+ images: only 1 prompt file exists (`week_N_image_prompts.txt`)**
- Easy JS files point to the SAME `/images/weekN/` folder as Advanced
- Do NOT create `week_N_easy_image_prompts.txt` or `public/images/weekN_easy/` folder
- **Why:** W16+ uses shared image infrastructure
- **Source:** ONBOARDING_PROMPT.md

**Rule: W1-15 audio must use the `_sN` suffix pattern for shadowing audio URLs**
- e.g. `shadowing_s1.mp3` — NOT bare `shadowing_1.mp3`
- **Why:** W27: Mixed `_NN` vs `_sN` naming caused R2 purge to miss files
- **Source:** BUG-W27

**Rule: W35+ sub-tab files are NOT yet deployed**
- Do NOT create `read_stem.js`, `read_social.js`, `explore_stem.js`, `explore_social.js`, `social_quiz.js`
- Continue using `read.js`, `explore.js`, `logic_science.js` as single files
- **Why:** Architecture note states these are planned but not deployed; following aspirational specs breaks builds
- **Source:** AGENT_SELF_CHECK_WORKFLOW.md §CRITICAL ARCHITECTURE NOTE

**Rule: W40+ debate content requires separate launch guide**
- Mission 3: type="debate" (NOT "story"); debate_config, conversation_phases, sentence_frames required
- Unlock logic: weekNumber >= 40 (NOT 20)
- Topics: Dynamic (W40-112) or 3 fixed deep topics (W113-144)
- **Why:** 2-tier debate system with different frame requirements per tier
- **Source:** ONBOARDING_PROMPT.md §W40+ Debate, DEBATE_2TIER_IMPLEMENTATION_SUMMARY.md

---

## Quick Reference: Top 10 Most Critical

| # | Rule | Bug ID | Impact |
|---|------|--------|--------|
| 1 | NEVER use Python for .js files | B2 | 36% of W12 bugs |
| 2 | NEVER `correct:` → always `answer:` | B7 | Grammar always wrong |
| 3 | NEVER Singapore Math wrong types | B5 | Silent math failure |
| 4 | NEVER content_en mismatch in dictation/shadowing | B22 | CHECK 42 fail, TTS/text mismatch |
| 5 | NEVER Easy = copy of Advanced | B11 | Students learn twice |
| 6 | NEVER root-level `week_NN_real.js` | B6 | PronunciationTab blank |
| 7 | NEVER forget `git add images/` | B4 | Deploys blank images |
| 8 | NEVER skip quality gate | W20 | 3 UI files uncommitted |
| 9 | NEVER modify `_redirects` | MAY2026 | Breaks entire site |
| 11 | NEVER unnatural adj+profession chunks | W30 | "kind chef", "nice scientist", "friendly artist" — forced pairings |
| 12 | NEVER doubled modifiers in chunks | W20 | "tall trees tall trees", "wooden wooden bridge" |
| 13 | NEVER repeated adverb chunk >3x | W23 | "carefully" repeated 6x in art lesson |
| 14 | NEVER orphan chunk (no grammar support) | W17 | "rainy weather" with no sentence support |
| 15 | NEVER circular topic chunk | W19 | "was little" repeated verbatim in photo album |
| 16 | NEVER redundant chunk+standalone word in same sentence | W1-E | "**kind teacher** is kind", "**big brown cow**. The **big brown cow**", "jump high** very high" — chunk word reused nearby after bold ends |

---

## Verification Commands

Run these before every commit:

```bash
# Grammar schema
grep "correct:" src/data/weeks/week_N/grammar.js && echo "BUG-B7 FOUND"
grep 'answer: ""' src/data/weeks/week_N/grammar.js && echo "BUG-B8 FOUND"

# dictation/shadowing content_en match (B22 — replaces old B1 check)
bash production_kit/tools/bug_prevention_check.sh N 2>&1 | grep B22

# Singapore Math types
grep -E "addition|subtraction|multiplication|division" src/data/weeks/week_N/singapore_math.js && echo "BUG-B5 FOUND"

# Curly quotes
grep "[''']" src/data/weeks/week_N/*.js && echo "BUG-B10 FOUND"

# Root-level real.js
ls src/data/weeks/week_NN/week_NN_real.js 2>/dev/null || echo "BUG-B6: root-level real.js"

# Curlies
grep -Pn "[‘’“”]" src/data/weeks/week_N/read.js && echo "BUG-34 FOUND"

# Ask AI invalid fields
grep -E "prompt_en|prompt_vi|hint_en|topic_talk" src/data/weeks/week_N/ask_ai.js && echo "BUG-B15/B19 FOUND"

# Image prompts barmodel_
grep "barmodel_" Production_FINAL/IMAGE\ PROMPTS/week_NN_image_prompts.txt && echo "C-40 FAIL"

# Full quality gate
bash tools/code_quality_gate.sh N

# Content lint
npm run content:lint -- --week N --errors-only

# Dictionary lint
npm run dict:lint -- --errors-only
```
