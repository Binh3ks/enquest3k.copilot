# W33 STRATEGIC FORENSIC REVIEW & ROOT-CAUSE AUDIT

**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Baseline Commit**: `455915df`  
**Review Type**: Strategic Architectural & Root-Cause Forensic Review (Read-Only)  
**Lifecycle Status**: `FINDING-AUDIO-SEMANTICS` = **`VERIFIED` (NOT CLOSED — Awaiting Strategic Reviewer Evaluation)**

---

## 1. Executive Verdict

**VERDICT**: **`PARTIALLY VERIFIED`**
- **Audio Semantic Acoustic Integrity**: **VERIFIED** on physical MP3 assets (54/54 assets pass acoustic STT transcription with 0 fatal errors and 9/9 fail-closed adversarial self-tests).
- **Data Derivation & Manifest Architecture**: **DEFECTS IDENTIFIED** (Manifest string duplication in Part 4, hardcoded `p5InstCanonical`, and multi-script generator divergence between `tools/generate_w33_all_audio.mjs` and `scripts/regenerate_w33_listening_audio.mjs`).
- **Product vs Validator Distinction**: The physical MP3 audio is acoustically correct; however, the manifest was constructing misaligned Frankenstein strings that caused artificial transcription variances.
- **E2E Posture**: **COMPLETION_NOT_TESTED**. E2E playthrough and completion contracts remain unexecuted.

---

## 2. What Previous Audits Got Right

1. **Physical Acoustic Validation**: Established real offline Whisper STT execution on all 54 audio assets on disk, proving that the underlying MP3 audio recordings actually speak the canonical English dialogue rather than silence or placeholders.
2. **Fail-Closed Adversarial Detection**: Built a 9-test adversarial suite (Tests A–I) proving that character swaps, location substitutions, object replacements, numeric mutations (`2 min` $\leftrightarrow$ `20 min`), room code alterations (`4B` $\leftrightarrow$ `4C`), bidirectional polarity inversions (`did not help` $\leftrightarrow$ `helped`), and material truncations ($<60\%$) fail loudly as `SEMANTIC_MISMATCH`.
3. **Validator Independence**: Verified that the transcription path inside `whisper_audio_semantic_validator.mjs` consumes ONLY the physical MP3 audio and never injects or falls back to the expected transcript.
4. **SOP Formalization**: Codified in `week_pipeline_sop.md` that *"Playback success does not prove semantic correctness"* and formally separated Tier 1 (Existence), Tier 2 (Binding), Tier 3 (Playback), and Tier 4 (Semantic STT Content).

---

## 3. What Previous Audits Missed

1. **Manifest Constructor String Duplication**: The 4 minor variances in Part 4 (`listening_p4_q1..q5`) were not Whisper transcription flaws; they were caused by `scripts/build_w33_audio_manifest.mjs` concatenating `q.question_en` with `q.dialogue_script`, which duplicated the question prompt in the expected string.
2. **Generator Script Fragmentation**: Two distinct audio generation scripts exist in the repository (`tools/generate_w33_all_audio.mjs` from early production and `scripts/regenerate_w33_listening_audio.mjs` from Cambridge alignment fixes). `tools/generate_w33_all_audio.mjs` contained outdated instructions for Part 5 (e.g. orange warning sign) while disk MP3s and `listening_hub.js` used the modern blue backpack / wet warning sign instructions.
3. **Hardcoded Manifest Entries**: `p5InstCanonical` in `scripts/build_w33_audio_manifest.mjs` was hardcoded as a parallel array instead of being dynamically projected from `src/data/weeks/week_33/listening_hub.js` (`listeningHub.listening_p5.instructions`).
4. **Speaker Prefix Inconsistencies**: `listening_p2_full.mp3` in the manifest prepended `woman:` / `man:` speaker prefixes into the expected transcript, while physical audio only spoke the words, creating an artificial similarity degradation ($91.8\%$).

---

## 4. Root-Cause Map

| Finding ID | Root Cause | Affected Layer | Current Status | Fix Required | Evidence Required for VERIFIED | Evidence Required for CLOSED |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **DEF-P4-DUP** | Manifest builder concatenated `q.question_en` before `q.dialogue_script` when `q.dialogue_script` already contained the question. | Manifest Builder (`build_w33_audio_manifest.mjs:270`) | **DISCOVERED** | Update manifest builder to project `q.dialogue_script.map(d => d.text).join(' ')` directly. | Manifest expected transcript matches spoken dialogue 100% without duplicated clauses. | Re-run validator achieves $\ge 95\%$ strict PASS on Part 4 Q1–Q5 with 0 minor variances. |
| **DEF-P5-HARDCODE** | `p5InstCanonical` was hardcoded in manifest builder rather than derived from `listening_hub.js`. | Manifest Builder (`build_w33_audio_manifest.mjs:290`) | **DISCOVERED** | Derive expected transcript directly from `listHub.listening_p5.instructions[idx + 1].text`. | Manifest reflects changes to `listening_hub.js` dynamically without hardcoding. | Drift test confirms 100% dynamic derivation. |
| **DEF-GEN-SPLIT** | Audio generator scripts were fragmented between `tools/generate_w33_all_audio.mjs` and `scripts/regenerate_w33_listening_audio.mjs`. | Build / Audio Tools | **DISCOVERED** | Establish `scripts/regenerate_w33_listening_audio.mjs` + single unified generator as the single source for all 54 assets. | Single generation command builds 100% of week assets matching data hubs. | Full regeneration produces identical byte hashes and passes STT audit. |
| **FINDING-AUDIO-SEMANTICS** | Playback duration verified without STT semantic confirmation. | Validation Engine & SOP | **VERIFIED** | Manifest & validator hardened with 9 adversarial tests; SOP updated. | 9/9 self-tests pass; 54/54 assets evaluate with 0 fatal errors. | Strategic Reviewer signoff after E2E completion verification. |

---

## 5. Source-of-Truth Matrix

| Asset Class | Authoritative Source | Audio Generator | Manifest Derivation | Physical MP3 on Disk | Validator Source | Drift Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **CLIL Reader** | `reading_hub.js` (`clil_article.content_en`) | `tools/generate_w33_all_audio.mjs` | Imported from `reading_hub.js` | `public/audio/week33/clil_friction.mp3` | Host Whisper STT | 🟢 LOW |
| **STEM Story** | `read.js` (`text_en`) | `tools/generate_w33_all_audio.mjs` | Imported from `read.js` | `public/audio/week33/read_stem.mp3` | Host Whisper STT | 🟢 LOW |
| **Social Story** | `tools/generate_w33_all_audio.mjs` (`STATIC_AUDIO_TASKS`) | `tools/generate_w33_all_audio.mjs` | Imported from `tools/generate_w33_all_audio.mjs` | `public/audio/week33/read_social.mp3` | Host Whisper STT | 🟡 MEDIUM (Defined in tool rather than data hub) |
| **Explore** | `explore.js` (`content_en`) | `tools/generate_w33_all_audio.mjs` | Imported from `explore.js` | `public/audio/week33/explore.mp3` | Host Whisper STT | 🟢 LOW |
| **Dictation (1–5)** | `skill_practice_hub.js` (`dictation[*].text`) | `tools/generate_w33_all_audio.mjs` | Imported from `skill_practice_hub.js` | `public/audio/week33/dictation_1..5.mp3` | Host Whisper STT | 🟢 LOW |
| **Exam Intros** | `CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md` | `tools/generate_w33_all_audio.mjs` | Defined in `build_w33_audio_manifest.mjs` | `public/audio/week33/exam_intro_*.mp3` | Host Whisper STT | 🟢 LOW |
| **Speaking S2** | `speaking_hub.js` (`info_exchange_cards`) | `tools/generate_w33_all_audio.mjs` | Imported from `speaking_hub.js` | `public/audio/week33/info_exchange_q1..4.mp3` | Host Whisper STT | 🟢 LOW |
| **Listening L1** | `listening_hub.js` (`listening_p1`) | `scripts/regenerate_w33_listening_audio.mjs` | Imported from `listening_hub.js` | `public/audio/week33/listening_p1_full.mp3` | Host Whisper STT | 🟢 LOW |
| **Listening L2** | `listening_hub.js` (`listening_p2`) | `scripts/regenerate_w33_listening_audio.mjs` | Imported from `listening_hub.js` | `public/audio/week33/listening_p2_full.mp3` | Host Whisper STT | 🟡 MEDIUM (Prepends `speaker:` in manifest) |
| **Listening L3** | `listening_hub.js` (`listening_p3`) | `scripts/regenerate_w33_listening_audio.mjs` | Imported from `listening_hub.js` | `public/audio/week33/listening_p3_*.mp3` | Host Whisper STT | 🟢 LOW |
| **Listening L4** | `listening_hub.js` (`listening_p4`) | `scripts/regenerate_w33_listening_audio.mjs` | Constructed in `build_w33_audio_manifest.mjs` | `public/audio/week33/listening_p4_*.mp3` | Host Whisper STT | 🔴 HIGH (Manifest duplicated question clause) |
| **Listening L5** | `listening_hub.js` (`listening_p5`) | `scripts/regenerate_w33_listening_audio.mjs` | Hardcoded in `build_w33_audio_manifest.mjs` | `public/audio/week33/listening_p5_*.mp3` | Host Whisper STT | 🟡 MEDIUM (Hardcoded `p5InstCanonical`) |

---

## 6. Known Part-4 Duplication Bug — Full Impact Analysis

- **Defect Pattern**: In `scripts/build_w33_audio_manifest.mjs:270`:
  ```javascript
  transcript: `Question ${idx + 1}. ${q.question_en} ${qText}`
  ```
  Since `qText` is `q.dialogue_script.map(d => d.text).join(' ')` and turn 1 of `q.dialogue_script` is already `q.question_en`, this produced:
  `"Question 1. Why was the floor slippery near the science room? Why was the floor slippery near the science room? The cleaner had just washed the tiles with water."`
- **Scope Assessment**:
  - `listening_p4_q1..q5`: **CONFIRMED DEFECT** in manifest builder.
  - `listening_p2_full`: **SUSPECT PATTERN** (manifest prepends `speaker:` prefixes into expected text).
  - `listening_p5_inst1..5`: **SUSPECT PATTERN** (manifest uses hardcoded parallel array instead of importing from `listening_hub.js`).
  - Other 42 assets: **SAFE** (direct 1:1 projection of source text).

---

## 7. Audio Binding Integrity

| Hub / Task Class | Hub Data Key | Audio URL on Disk | Verified Spoken Content | Runtime UI Binding Component | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Day 1: STEM Story** | `readJs.audio_url` | `/audio/week33/read_stem.mp3` | Story of Jake & Tom in corridor | `WebtoonReader.jsx` / `AudioPlayer` | ✅ VERIFIED |
| **Day 2: CLIL Reader** | `readingHub.clil_article.audio_url` | `/audio/week33/clil_friction.mp3` | Science article on friction & tiles | `CLILFactFinder.jsx` | ✅ VERIFIED |
| **Day 2: Dictation** | `skillPracticeHub.dictation[*].audio_url` | `/audio/week33/dictation_1..5.mp3` | 5 dictation sentences | `DictationTrainer.jsx` | ✅ VERIFIED |
| **Day 4: Info Exchange** | `speakingHub.info_exchange_cards.table_b.fields[*].audio_url` | `/audio/week33/info_exchange_q1..4.mp3` | 4 Nova question prompts | `InfoExchangeStudio.jsx` | ✅ VERIFIED |
| **Day 5: Boss Listening L1** | `listeningHub.listening_p1.audio_url` | `/audio/week33/listening_p1_full.mp3` | Draw lines dialogue | `BossListeningQuest.jsx` | ✅ VERIFIED |
| **Day 5: Boss Listening L2** | `listeningHub.listening_p2.audio_url` | `/audio/week33/listening_p2_full.mp3` | Secret notes dialogue | `BossListeningQuest.jsx` | ✅ VERIFIED |
| **Day 5: Boss Listening L3** | `listeningHub.listening_p3.audio_url` | `/audio/week33/listening_p3_full.mp3` | Item match dialogue | `BossListeningQuest.jsx` | ✅ VERIFIED |
| **Day 5: Boss Listening L4** | `listeningHub.listening_p4.audio_url` | `/audio/week33/listening_p4_full.mp3` | 3-picture quiz dialogue | `BossListeningQuest.jsx` | ✅ VERIFIED |
| **Day 5: Boss Listening L5** | `listeningHub.listening_p5.audio_url` | `/audio/week33/listening_p5_full.mp3` | Color & write dialogue | `BossListeningQuest.jsx` | ✅ VERIFIED |
| **Day 5: Boss Speaking S1–S4** | `speakingHub.weekly_review.parts[*].audio_url` | `/audio/week33/exam_intro_S1..S4.mp3` | Examiner prompt guidance | `SpeakingPassportQuest.jsx` | ✅ VERIFIED |

*Finding*: 100% of audio-backed tasks have correct relative URL paths bound to existing, verified MP3 audio on disk. No orphaned or cross-bound audio assets detected.

---

## 8. Validator Integrity

- **Independence (PASS)**: `transcribeAudio` invokes host Whisper directly on physical MP3 files; no access to manifest expected text or data hubs.
- **Correctness (PASS)**: Blended 50% Jaccard + 50% Levenshtein similarity metric correctly evaluates lexical retention.
- **Coverage (PASS)**: Evaluates 100% of auditable week assets (54/54).
- **Limitations**:
  - Requires local Python Whisper (`tiny` model) in execution environment.
  - Relies on manifest expected transcript being an accurate, non-duplicated representation of canonical spoken text.

---

## 9. Adversarial Test Coverage

### Existing Invariants Tested (Tests A–I):
1. ✅ Known good asset transcription (`info_exchange_q1.mp3` $\to$ `PASS`)
2. ✅ Missing physical asset path $\to$ `MISSING_ASSET`
3. ✅ Blocked / invalid Whisper binary $\to$ `BLOCKED`
4. ✅ Character entity swap (`Jake` $\to$ `Tom` $\to$ `SEMANTIC_MISMATCH`)
5. ✅ Object entity swap (`bandage` $\to$ `notebook` $\to$ `SEMANTIC_MISMATCH`)
6. ✅ Location entity swap (`corridor` $\to$ `classroom` $\to$ `SEMANTIC_MISMATCH`)
7. ✅ Bidirectional polarity inversion (`did not help` $\leftrightarrow$ `helped` $\to$ `SEMANTIC_MISMATCH`)
8. ✅ Number / quantity alteration (`2 min` $\to$ `20 min` $\to$ `SEMANTIC_MISMATCH`)
9. ✅ Room / identifier alteration (`Room 4B` $\to$ `Room 4C` $\to$ `SEMANTIC_MISMATCH`)
10. ✅ Material truncation ($<60\%$ length ratio $\to$ `SEMANTIC_MISMATCH`)

### Missing Adversarial Classes Identified:
1. ⚠️ **Stale Manifest Drift Test**: Verify validator fails closed if source hub changes but manifest is not regenerated.
2. ⚠️ **Question Clause Duplication Test**: Verify validator detects when a prompt sentence is accidentally repeated.
3. ⚠️ **Wrong Speaker Assignment**: Verify validator fails if a dialogue speaker turn is attributed to the wrong gender/voice.

---

## 10. E2E Evidence Gap & Test Plan

*E2E completion testing is NOT yet executed. The following minimum test matrix is required before Golden Standard closure:*

| Test ID | Task / Station | Interaction Simulated | Assertion | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **E2E-D1** | Day 1: Story World | Play `read_stem.mp3`, flip webtoon panels, record retell voice. | Task completion state recorded in localStorage; 30 XP awarded. | Progression advances to Day 2. |
| **E2E-D2** | Day 2: Knowledge Lab | Read CLIL article with `clil_friction.mp3`, answer 3 comprehension MCQs, submit discovery report. | Correct score computed; no NaN; report saved. | Day 2 unlocks Day 3. |
| **E2E-D3** | Day 3: Battle Arena | Speed match dictation (`dictation_1..5.mp3`), grammar duel, Singapore Math bar model. | Real score recorded; timer functions cleanly; no crash. | Day 3 complete. |
| **E2E-D4** | Day 4: Creator Studio | Story writer P7 submission ($\ge 20$ words), video challenge, info exchange (`info_exchange_q1..4.mp3`). | Rubric evaluates 5 shields; writing submitted. | Day 4 complete. |
| **E2E-D5-L** | Day 5: Boss Listening | Play 2-play loop on L1–L5; draw lines, fill blanks, tick boxes, color/write. | 5 Listening Shields calculated from Cambridge rubric. | Shields 0–5 awarded. |
| **E2E-D5-R** | Day 5: Boss Reading | Complete R1–R6 (def match, dialogue, story cloze, grammar, open cloze). | Reading Shields calculated accurately. | Shields 0–5 awarded. |
| **E2E-D5-S** | Day 5: Boss Speaking | Examiner prompts S1–S4; user records responses. | Speaking Shields calculated; passport stamped. | Weekly mastery flag set. |
| **E2E-NEG** | Negative / Incomplete | User abandons task midway or submits 0 correct answers. | Task does NOT falsely mark complete; 0 shields awarded. | Fail-closed progression. |

---

## 11. Golden Standard Integrity

- **Learning Core vs Assessment Core**: Day 1–4 practice stations remain completely separate from Day 5 Boss Castle exam stations.
- **Cambridge 5-Shield Standard**: Listening, Reading & Writing, and Speaking rubrics maintain Cambridge Young Learners A2 Flyers criteria.
- **Weekly Schedule Invariant**: 15 Quests / 5 Days architecture remains 100% intact.
- **Zero Regression**: No learning content, question text, or answer keys were modified during the audio validator audit.

---

## 12. Findings Ledger Status

- `FINDING-ROTARY-ARCH`: **VERIFIED**
- `FINDING-GATE16-PURITY`: **VERIFIED**
- `FINDING-CEFR-GUARD`: **VERIFIED**
- `FINDING-DAY5-CONTRACT`: **VERIFIED**
- `FINDING-AUDIO-SEMANTICS`: **VERIFIED (NOT CLOSED — Awaiting Strategic Reviewer Evaluation)**
- *(No findings have been marked CLOSED; all remain strictly governed).*

---

## 13. Required Fixes Before E2E

### Priority P0 (Must Fix in Manifest / Build Architecture):
1. **Fix Part 4 Manifest Projection** in `scripts/build_w33_audio_manifest.mjs:270`: Remove `q.question_en` concatenation to eliminate prompt duplication and align expected text with actual spoken audio.
2. **Fix Part 5 Manifest Derivation** in `scripts/build_w33_audio_manifest.mjs:290`: Derive instructions dynamically from `listeningHub.listening_p5.instructions` instead of hardcoding `p5InstCanonical`.

### Priority P1 (Code Hygiene & Tool Consolidation):
1. **Consolidate Audio Generators**: Retire or synchronize `tools/generate_w33_all_audio.mjs` with `scripts/regenerate_w33_listening_audio.mjs` so a single authoritative script handles all 54 assets.
2. **Clean Speaker Prefixes in L2 Manifest**: Remove `woman:` / `man:` string prefixes from `listening_p2_full` expected transcript.

### Priority P2 (Documentation & SOP Polish):
1. Document the exact derivation contract between `dialogue_script` arrays and audio manifest entries in `week_pipeline_sop.md`.

---

## 14. STOP / GO Decision

**DECISION**: **`STOP — ROOT CAUSE STILL OPEN`**
- **Rationale**:
  - The physical audio assets are acoustically verified and correct.
  - However, the manifest builder contains confirmed derivation defects (Part 4 prompt duplication and Part 5 hardcoding) that must be cleanly repaired before proceeding to E2E completion forensics.
  - This ensures the contract layer is 100% pure before executing full browser simulation and progression testing.
- **Next Phase Action**: Await ChatGPT Strategic Reviewer directive to patch P0 manifest derivation defects and authorize E2E completion execution.
