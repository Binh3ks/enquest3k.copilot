# GOLDEN LEARNING & ASSESSMENT STANDARD v1.0
**EngQuest3K — W33+ Production Contract**
**Status:** NORMATIVE — Supersedes all prior informal guidelines.
**Date:** 2026-08-27 | **Derived from:** W33 Final Forensic Audit (READ-ONLY)

---

## 1. Executive Summary

This document establishes the authoritative Learning and Assessment contract for EngQuest3K Week 33 and all subsequent weeks. It was derived by auditing the W33 implementation against Cambridge A2 Flyers standards, internal consistency requirements, and sound pedagogical principles.

**Key findings driving this standard:**

1. W33 demonstrates a high-quality structural approach (15 tasks, 4 zones, Cambridge-aligned Boss) but contains systematic gaps between what is designed and what is actually produced.
2. The most severe failures are not implementation bugs — they are missing contracts at the data, generation, and validation layers.
3. No generation pipeline can be trusted without explicit validation gates. W33 lacks half of them.
4. The Game Layer (XP, quests, animations) must never be allowed to alter the Learning/Assessment Core. This boundary is currently unenforceable because the core is not formally specified.

**Final freeze decision:** `🟡 CONDITIONAL — REMEDIATION REQUIRED` (see Section 15 for exact remediation list).

---

## 2. Scope and Audit Method

### Scope

This standard covers:
- All W33+ weekly content (W33–W72)
- All 15 tasks per week (Gears 1–15)
- All 4 hub files: `listening_hub.js`, `reading_hub.js`, `speaking_hub.js`, `writing_hub.js`
- All audio assets in `public/audio/weekNN/`
- All validation and generation scripts
- The Boss/Shield assessment architecture (Cycle 1–5)

### Out of Scope

- Game mechanics, XP, quests, progression, badges (Game Layer — addressed in Section 19)
- W01–W32 legacy content
- Infrastructure (hosting, CDN, CI/CD pipelines)

### Audit Method

1. Static inspection of W33 hub data files (Node.js introspection)
2. Whisper ASR transcription of all W33 audio
3. Source → TTS → ASR forensic comparison
4. Cambridge A2 Flyers official specification cross-check
5. Component source code inspection (runtime references)
6. Generation script analysis (what scripts invent vs. transform)

**Audit constraint: No files were modified.**

---

## 3. Current W33 Learning Architecture

### 3.1 Weekly Structure

| Zone | Days | Gear IDs | Station Types |
|------|------|----------|--------------|
| Zone 1 — Story World | Day 1 | gear1_webtoon, gear2_karaoke, gear3_retell | Receptive: reading/viewing, Listening-imitation, Productive-oral |
| Zone 2 — Knowledge Lab | Day 2 | gear4_clil, science_lab, science_report | CLIL: reading+watching, Experiment, Productive-writing |
| Zone 3 — Battle Arena | Day 3 | word_blitz, sentence_smash, math_quest | Vocabulary recall, Grammar production, Math-English integration |
| Zone 4 — Creator Studio | Day 4 | story_writer, broadcast_studio, info_exchange | Productive-writing, Productive-speaking, Info-gap speaking |
| Zone 5 — Boss Castle | Day 5 | boss_listening, boss_reading, weekly_review | ASSESSMENT (Cambridge-aligned) |

### 3.2 W33 Station Map

| Station ID | Title | Hub File | Primary Skill | Type |
|-----------|-------|---------|--------------|------|
| `read_explore` | Corridor Safety & School Care | reading_hub | Reading comprehension | GUIDED PRACTICE |
| `explore` | School Safety Rules Around the World | explore.js | CLIL reading | GUIDED PRACTICE |
| `new_words` | Vocabulary (20 words) | vocab.js | Vocabulary acquisition | LEARNING |
| `word_match` | Word-picture matching | vocab.js | Vocabulary recall | CONTROLLED PRACTICE |
| `word_power` | Phrase patterns (collocations) | index.js | Vocabulary extension | GUIDED PRACTICE |
| `grammar` | Past Continuous with WHILE | index.js | Grammar | LEARNING + CONTROLLED PRACTICE |
| `dictation` | 5-sentence dictation | skill_practice_hub.js | Listening + Spelling | ASSESSMENT |
| `shadowing` | Video + karaoke audio | shadowing.js | Pronunciation + fluency | GUIDED PRACTICE |
| `mindmap_speaking` | Mindmap oral production | index.js | Speaking fluency | FREE PRACTICE |
| `ask_ai` | AI tutor conversation | week_33_real.js | Speaking + Grammar | FREE PRACTICE |
| `writing` | Picture story + story frames | writing_hub.js | Writing production | FREE PRACTICE → ASSESSMENT |
| `skill_practice_hub` | Grammar drills, Singapore Math | skill_practice_hub.js | Grammar + Math | CONTROLLED PRACTICE |
| `boss_listening` | Cambridge L1+L2+L3 (Cycle 1) | listening_hub.js | Listening | ASSESSMENT |
| `boss_reading` | Cambridge R&W Parts | reading_hub.js | Reading & Writing | ASSESSMENT |
| `weekly_review` | Speaking Parts + Passport | speaking_hub.js | Speaking | ASSESSMENT |

### 3.3 W33 Vocabulary Profile

| Metric | Value | Standard Requirement |
|--------|-------|---------------------|
| Total vocabulary items | 20 words | 20 (required) |
| Word Power phrases | 8–10 collocations | ≥ 6 |
| Topic coherence | School safety/corridor | Must match week theme |
| CEFR declared | A2 Flyers | Must be verified |
| Vocabulary recycled in assessment | Partial | MUST be verified against assessment items |

**W33 vocabulary sample (first 10):** corridor, slipped, nurse, bandage, relieved, mistake, accident, fix, sorry, careful.
These are appropriate A2 Flyers vocabulary. All concrete, action-related, contextually motivated.

### 3.4 W33 Grammar

**Target:** Past Continuous with WHILE + Irregular Verbs Group 5
**Structure:** `While + subject + was/were + V-ing, subject + V-ed (Past Simple)`
**Examples in hub:** "While Jake was walking down the corridor, a boy slipped."

**Assessment:** Grammar MCQ exercises in grammar station + sentence builder in skill_practice_hub.
**Cambridge alignment:** Grammar is practiced but not assessed as a standalone Cambridge Part in Cycle 1.

---

## 4. Current W33 Assessment Architecture

### 4.1 Boss/Shield Architecture

The Boss Battle uses a 5-Cycle rotation:

| Cycle | Cambridge Parts Tested | Shield Paper |
|-------|----------------------|-------------|
| 1 (W33) | L1, L2, L3 | Listening |
| 2 (W34) | L4, L5, R&W P1, S1 | Mixed |
| 3 (W35) | R&W P2, P3, P4, P5 | Reading |
| 4 (W36) | R&W P6, P7, S2, S3 | Production |
| 5 (W37) | All 16 Parts | Full Mock |

**Shield score model:** 0–5 per paper (Listening, Reading & Writing, Speaking), max 15. Shield score is a PRODUCT SCORING ABSTRACTION, not a Cambridge Part count. This distinction is correctly documented in `bossRotarySchedule.js`.

### 4.2 Assessment Tasks in W33

| Task | Cambridge Part | Mechanic | Assessed or Practice? |
|------|---------------|---------|----------------------|
| L1 Draw Lines | Listening Part 1 | Name → picture matching | ASSESSMENT |
| L2 Note Completion | Listening Part 2 | Write info from dialogue | ASSESSMENT |
| L3 Match A–H | Listening Part 3 | Written description → letter | ASSESSMENT |
| L4 Tick the Box (W34 Boss) | Listening Part 4 | 3-picture MCQ | ASSESSMENT |
| L5 Colour & Write (W34 Boss) | Listening Part 5 | Colour/write on picture | ASSESSMENT |
| Dictation 1–5 | Non-Cambridge | Listen, transcribe | ASSESSMENT |
| Grammar MCQ | Non-Cambridge | Select correct form | CONTROLLED PRACTICE |
| Reading Parts 1–6 | R&W Parts 1–6 | Various reading tasks | ASSESSMENT (W35 Boss) |
| Writing Part 7 | R&W Part 7 | Story from pictures | ASSESSMENT (W36 Boss) |
| Find Differences | Speaking Part 1 | Describe differences | ASSESSMENT (W34 Boss) |
| Info Exchange | Speaking Part 2 | Information gap | ASSESSMENT (W36 Boss) |
| Picture Story | Speaking Part 3 | Narrate from pictures | ASSESSMENT (W36 Boss) |
| Personal Questions | Speaking Part 4 | Personal responses | ASSESSMENT (W36 Boss) |

---

## 5. Learning Quality Audit

### 5.1 Skill Progression Analysis

**Current W33 progression (reconstructed):**

```
EXPOSURE (read_explore narrative → explore CLIL)
    ↓
VOCABULARY ACQUISITION (new_words + word_match)
    ↓
GRAMMAR NOTICE (grammar station — rules + examples)
    ↓
CONTROLLED PRACTICE (grammar MCQ, dictation, skill_practice_hub)
    ↓
GUIDED PRODUCTION (shadowing, writing frames)
    ↓
FREE PRODUCTION (mindmap speaking, ask_ai, story_writer)
    ↓
ASSESSMENT (boss_listening: L1, L2, L3)
```

**Verdict:** The high-level arc is PEDAGOGICALLY SOUND. Exposure → Notice → Practice → Assessment follows established SLA principles. However:

**Defect LP-01:** Vocabulary recycling between learning and assessment is NOT systematically verified. The dictation answer key uses words ("classmate", "relieved", "followed safety rules") that may not appear in the 20 vocabulary items or in the week's dialogue. No automated gate exists to verify vocabulary recycling.

**Defect LP-02:** The explore station (W33) narrates GLOBAL SCHOOL SAFETY RULES, not the week's central friction/corridor narrative. This breaks the thematic input chain at the first exposure step. Students are exposed to the corridor story in `read_explore` but then pivot to a different perspective in `explore` before encountering the same story again in Cambridge tasks.

**Defect LP-03:** Scaffolding removal before assessment is not verified. Word bank hints that appear during writing practice must not appear during boss/assessment tasks. Currently no gate ensures this.

### 5.2 Task Validity Analysis

For each W33 practice/learning task:

| Task | Can learner succeed by guessing? | Target skill actually required? | Answer leakage risk |
|------|--------------------------------|---------------------------------|---------------------|
| new_words (flashcards) | No — no scoring | N/A (learning) | N/A |
| word_match | Low — 20 items | Word-meaning match | Low |
| grammar MCQ | Medium — 3 options | Grammar select | Low |
| dictation | None — transcription required | Listening + spelling | None |
| shadowing | Medium — effort, not accuracy | Pronunciation fluency | N/A |
| mindmap speaking | None — open production | Speaking | None |
| writing | Low — frames provided | Writing production | Low |
| L1 boss | Low — 6 names, picture | Listening-identification | Low |
| L2 boss | None — requires listening | Information extraction | None |
| L3 boss | Low — 8 options | Written-description matching | Low |
| **L4 boss** | **TRIVIALLY — tick "A" every time** | **NONE** | **CRITICAL LEAK** |
| L5 boss | None — requires following instructions | Listening comprehension | Low |
| Dictation (boss context) | None | Listening + transcription | None |

### 5.3 Retrieval and Recycling Assessment

The corridor/safety theme recurs through:
- read_explore (narrative)
- explore (global safety — WRONG THEME)
- clil_article (friction science — correct)
- vocabulary (corridor, slipped, nurse, bandage)
- grammar (While Jake was walking...)
- speaking_hub (same incident)
- listening_hub (same incident and characters)

**Verdict:** STRONG thematic recycling for vocabulary and grammar, supporting spaced retrieval. The grammar structure (Past Continuous + While) genuinely recurs across tasks. However, the explore station breaks thematic coherence.

---

## 6. Assessment Validity Audit

### 6.1 Cambridge Listening Parts — Full Validity Analysis

#### L1: Draw Lines

| Criterion | Status | Evidence |
|-----------|--------|---------|
| Construct validity (listening identification) | ✅ PASS | Student must match spoken name to correct picture location |
| Content validity (A2 school vocabulary) | ✅ PASS | corridor, nurse, headmaster — appropriate |
| Response validity (line drawn = evidence of comprehension) | ✅ PASS | |
| Scoring validity (deterministic) | ✅ PASS | Each name has one correct target |
| Reliability | ⚠️ CONDITIONAL | Single-voice audio reduces naturalness of discrimination task |
| Fairness | ✅ PASS | All names provided; no cultural bias |
| Difficulty validity | ✅ PASS | 7 names, 6 targets (1 extra name = Mia with no line) — appropriate A2 |
| No answer leakage | ✅ PASS | Cannot derive matches without listening |
| **Overall** | **ALIGNED** | Not EXACT due to single-voice limitation |

#### L2: Note Completion

| Criterion | Status | Evidence |
|-----------|--------|---------|
| Construct validity (info extraction from dialogue) | ✅ PASS | |
| Content validity | ✅ PASS | 5 distinct information types |
| Response validity | ✅ PASS | Written answer demonstrable |
| Scoring validity | ✅ PASS | All 5 answers confirmed in ASR |
| Reliability | ✅ PASS | Two-voice audio — Cambridge-standard |
| Fairness | ✅ PASS | |
| Difficulty | ✅ PASS | Appropriate A2 interview format |
| No answer leakage | ✅ PASS | |
| **Overall** | **EXACT** | ✅ Gold standard implementation |

#### L3: Match A–H

| Criterion | Status | Evidence |
|-----------|--------|---------|
| Construct validity (description → object matching) | ✅ PASS | |
| Content validity | ✅ PASS | School safety objects |
| Response validity | ✅ PASS | Letter written = evidence |
| Scoring validity | ✅ PASS | All 5 letters confirmed |
| Reliability | ✅ PASS | Two-voice audio per item confirmed |
| Source-of-truth | ❌ FAIL | Audio scripts exist ONLY in generation script |
| **Overall** | **ALIGNED** | Not EXACT: source-of-truth architecture unsafe |

#### L4: Tick the Box

| Criterion | Status | Evidence |
|-----------|--------|---------|
| Construct validity | ❌ FAIL | Single voice, not conversational |
| Content validity | ✅ PASS | Questions match story |
| Response validity | ✅ PASS | Tick = evidence of selection |
| Scoring validity | ❌ FAIL | All answers = A; student who ticks A scores 5/5 |
| Reliability | ❌ FAIL | Positional bias invalidates comparison between students |
| Fairness | ❌ FAIL | Answer pattern discoverable without listening |
| Difficulty | ❌ FAIL | Task is trivial for any student who notices the pattern |
| No answer leakage | ❌ FAIL | Pattern IS the leak: AAAAA |
| Source of truth | ❌ FAIL | `audio_script` contains raw `Woman:`/`Man:` labels |
| **Overall** | **DEFECTIVE — MUST FIX** | Cannot be assessed until redesigned |

#### L5: Colour and Write

| Criterion | Status | Evidence |
|-----------|--------|---------|
| Construct validity (follow spoken instructions) | ✅ PASS | |
| Content validity | ✅ PASS | 3 colour + 2 write actions |
| Response validity | ✅ PASS | Colouring/writing = observable |
| Scoring validity | ✅ PASS | CARE fix confirmed; all values in audio |
| Reliability | ✅ PASS | |
| Fairness | ✅ PASS | |
| Difficulty | ✅ PASS | Appropriate A2 |
| No answer leakage | ✅ PASS | |
| **Overall** | **EXACT** | ✅ Gold standard implementation |

### 6.2 Dictation Validity

| Item | Scoring validity | Audio-key match | Verdict |
|------|-----------------|-----------------|---------|
| D1 | ⚠️ Minor drift | "school corridor" vs "corridor" | MINOR |
| D2 | ❌ FAIL | "running" vs "ran" (grammar change) | HIGH |
| D3 | ❌ FAIL | Completely different sentence | CRITICAL |
| D4 | ❌ FAIL | Different predicate | CRITICAL |
| D5 | ❌ FAIL | Different ending | CRITICAL |

---

## 7. Cambridge/Flyers Compliance Audit

### 7.1 Alignment Level Definitions (Normative)

| Level | Definition | Criteria |
|-------|-----------|---------|
| **EXACT** | The task faithfully reproduces the official Cambridge mechanic in all material respects | Correct mechanic, correct item count, correct example, correct response type, correct language level, no assessment-invalidating defects |
| **ALIGNED** | The task implements the spirit and primary mechanic of the Cambridge Part, with acceptable deviations | Correct mechanic; deviations are presentation-level or source-architecture-level, not assessment-validity-level |
| **FLYERS-INSPIRED** | The task is informed by the Cambridge Part but has one or more mechanic deviations that reduce assessment fidelity | Correct stimulus type; one or more of: wrong item count, missing example, single-voice, answer distribution invalid |
| **NOT_FLYERS** | The task is a learning/practice activity that does not replicate a Cambridge mechanic | Most learning stations |

**MUST NOT claim EXACT or ALIGNED if the task has an answer-distribution defect or a source-of-truth defect that breaks regeneration.**

### 7.2 Complete Cambridge Compliance Matrix — W33

| Cambridge Part | Mechanic | Items | Ex | Speakers | Answers | Source-of-Truth | Alignment | Freeze-Ready |
|---------------|----------|-------|-----|---------|---------|----------------|-----------|-------------|
| L1 | Lines | 5 ✅ | ✅ | 1 ❌ | Valid ✅ | Fragile ⚠️ | ALIGNED | Conditional |
| L2 | Form fill | 5 ✅ | ✅ | 2 ✅ | All pass ✅ | dialogue_script[] ✅ | **EXACT** | ✅ YES |
| L3 | Letter match | 5 ✅ | ✅ | 2 ✅ | All pass ✅ | Script-only ❌ | ALIGNED | Fix required |
| L4 | 3-pic MCQ | 5 ✅ | ✅ | 1 ❌ | ALL-A ❌ | Label in text ❌ | **DEFECTIVE** | ❌ NO |
| L5 | Colour/write | 5 ✅ | ✅ | 1 (ok) ✅ | All pass ✅ | instructions[] ✅ | **EXACT** | ✅ YES |
| R&W P1 | Word-def match | 10 ✅ | n/a | n/a | — | word_bank ✅ | ALIGNED | Conditional |
| R&W P2 | Dialogue gap | 5 ✅ | n/a | n/a | — | turns[] ✅ | ALIGNED | Conditional |
| R&W P3 | Cloze story | — | n/a | n/a | — | story_text ✅ | ALIGNED | Conditional |
| R&W P4 | Grammar MCQ | 0 ⚠️ | n/a | n/a | — | Empty | INCOMPLETE | ❌ NO |
| R&W P5 | Story gap-fill | — | n/a | n/a | — | story_text ✅ | ALIGNED | Conditional |
| R&W P6 | Open cloze | — | n/a | n/a | — | text_template ✅ | ALIGNED | Conditional |
| R&W P7 | Story writing | — | n/a | n/a | — | picture_story ✅ | ALIGNED | Conditional |
| S1 | Find differences | 4 diffs ✅ | n/a | n/a | — | differences[] ✅ | ALIGNED | ✅ YES |
| S2 | Info exchange | — | n/a | n/a | — | cards ✅ | ALIGNED | ✅ YES |
| S3 | Picture story | — | n/a | n/a | — | panels ✅ | ALIGNED | ✅ YES |
| S4 | Personal Qs | — | n/a | n/a | — | questions[] ✅ | ALIGNED | ✅ YES |

### 7.3 L4 Answer Distribution Rule (Deterministic)

**Defect class:** All-A answer pattern makes the assessment trivially gameable.

**Rule (normative):**

> A Cambridge L4 task MUST have correct answers distributed across options A, B, and C.
> Specifically: no single answer letter MAY appear for more than 3 of the 5 scored items.
> If this constraint is violated, Gate 15 MUST fail and block generation.

**Rationale:** Cambridge L4 official samples show varied answer distribution. The purpose of distractors B and C is to require genuine listening discrimination. If all answers are A, the distractor mechanism fails entirely.

**Implementation:** Gate 15 will programmatically verify: `count(A) ≤ 3 AND count(B) ≥ 1 AND count(C) ≥ 1`.

---

## 8. CEFR/A2 Language Audit

### 8.1 W33 Language Level Assessment

| Domain | Sample | Level | Verdict |
|--------|--------|-------|---------|
| Vocab: corridor, slipped, bandage | Concrete, common school nouns | A1–A2 | ✅ Appropriate |
| Grammar: While + Past Continuous | Standard A2 grammar | A2 | ✅ Appropriate |
| Listening dialogue (L2): "My favourite subject is Science" | Simple interview, A2 | A2 | ✅ Exact |
| Listening dialogue (L4): "Why was the floor slippery near the science room?" | Slightly formal question | A2 | ✅ Appropriate |
| CLIL (clil_article): "Friction is a force that stops things from sliding" | Topic-specific; B1 vocabulary level | B1 | ✅ Acceptable for CLIL |
| Explore (current): Canada/UK/Japan safety comparisons | Informational prose | B1 | ⚠️ Above assessed level |
| Grammar rule text: "Past Continuous for a long action, interrupted by Past Simple" | Meta-language | B2+ | ⚠️ Instruction in Vietnamese needed |
| Dictation D3: "Jake stopped immediately to help his classmate" | Natural A2 narrative | A2 | ✅ Appropriate |

### 8.2 CEFR Distinction: Assessment Language vs. Extension Language

**This is a critical boundary:**

| Zone | Language Constraint | Example |
|------|--------------------|----|
| Cambridge L1–L5 assessment | MUST be A2 Flyers vocabulary and sentence length | "Write the word wet on the sign" |
| Cambridge R&W assessment | MUST be A2 Flyers; up to ~250 words for P5 story | Narrative, factual, concrete |
| CLIL / Explore stations | MAY exceed A2 for topic-specific terms IF scaffolded | "friction", "lubricant" are acceptable with context |
| Grammar instruction text | SHOULD be in Vietnamese for metalanguage; English examples only | Rule text in L1 is best practice for A2 learners |
| Speaking free production | Language may exceed A2 — no ceiling on output | Students can draw on all known English |

**Rule:** CEFR A2 constraints apply to the STIMULUS (what students must understand to respond). They do NOT constrain student output (which may exceed the target level).

---

## 9. Cross-Modal Integrity Audit

### 9.1 Character Name Consistency — W33 Evidence

| Character | listening_hub.js | read.js | skill_practice_hub.js | explore.js | Audio (ASR) |
|-----------|----------------|--------|---------------------|-----------|-------------|
| Boy who slips | Tom | "a boy" (anonymous) | "A boy" (anonymous) | N/A | read_stem: "Tom slipped" (stale) |
| Boy who helps | Jake | Jake | Jake | N/A | ✅ consistent |
| Nurse | Nurse Sarah | "the nurse" (anonymous) | "the school nurse" | N/A | read_stem: "Nurse Clara" (stale) |
| Headmaster | Headmaster Brown | "The headmaster" | N/A | N/A | listening_p1: Headmaster Brown ✅ |
| Cleaner | Cleaner Bob | N/A | N/A | N/A | listening_p1: Cleaner Bob ✅ |
| Teacher | Teacher David | N/A | N/A | N/A | listening_p1: Teacher David ✅ |

**Finding:** The `read.js` story was DELIBERATELY made anonymous (removing "Nurse Clara", "Tom") while `listening_hub.js` retained proper names. But audio for `read_stem.mp3` was NOT regenerated after this anonymization, creating a cross-modal identity conflict in the audio channel.

**Standard:** Character identity MUST be consistent across ALL modalities (text, audio, images) within a single week. If a character is anonymous in one source, they MUST be anonymous in all sources, or a character-mapping table MUST be maintained.

### 9.2 Cross-Modal Integrity Framework

```
For every assessed task:

SOURCE DATA (hub file)
    ↓ defines
CHARACTER NAMES, OBJECT NAMES, COLOURS, NUMBERS, LOCATIONS
    ↓ must appear consistently in
QUESTION TEXT ↔ ANSWER KEY ↔ AUDIO CONTENT ↔ VISUAL ASSETS ↔ RUNTIME UI

Any discrepancy across these five channels = CROSS-MODAL INTEGRITY FAILURE.
```

**Required Gate (Cross-Modal):** Before releasing a week, a script MUST verify that all character names referenced in `listening_hub.js names[]` also appear (or are consistently absent) in `read.js`, `explore.js`, and `skill_practice_hub.js`. Mismatch = BLOCK.

---

## 10. Audio Assessment Standard (Normative)

### Rule A — SOURCE OF TRUTH [CRITICAL]
Every spoken word in assessed audio MUST be traceable to a field in the authoritative hub data file. Generation scripts MUST transform data; they MUST NOT invent assessment content.

**Violation pattern (W33 L3):** Audio scripts exist only inside `regenerate_w33_listening_audio.mjs`. Hub data has `{id, name, target_letter, audio_url}` with no `audio_text` field.
**Required fix:** Add `audio_text` field to every `listening_p3.items[]` entry.

**Validation:** Gate A1 — verify every audio-bearing task has its `audio_text` or `dialogue_script` field in the hub data.

### Rule B — SPEAKER IDENTITY IS METADATA [CRITICAL]
Speaker identity MUST be the `speaker` field. It MUST NOT appear in the `text` field.

```js
// CORRECT:
{ speaker: "woman", text: "Where is the first-aid room?" }

// FORBIDDEN:
{ speaker: "woman", text: "Woman: Where is the first-aid room?" }
```

**Validation:** Gate B1 — scan all text fields for `/\b(Man|Woman|Girl|Boy|Speaker\s*\d)\s*:/`. Fail if found.

### Rule C — MULTI-SPEAKER REQUIRES SEPARATE TTS CALLS [HIGH]
Cambridge L1, L2, L3, L4 require ≥ 2 acoustically distinct speakers. Each speaker turn MUST be sent to the correct voice in a separate TTS call. Concatenation must preserve turn order.

```
man / boy  → en-US-Neural2-D
woman / girl → en-US-Journey-F
```

**L2 implementation is the reference pattern.** `generateDialogueAudio(dialogue_script)` + `validateDialogueScript()` is the required architecture.

### Rule D — ANSWER FIDELITY [CRITICAL]
Names, numbers, times, colours, locations, objects, and quantities MUST remain semantically identical from source to audio.

| Source | Audio | Acceptable? |
|--------|-------|-------------|
| "2 minutes" | "two minutes" | ✅ Normalization |
| "Nurse Sarah" | "Nurse Clara" | ❌ Semantic error |
| "A boy ran fast" | "A boy running fast" | ❌ Grammar change (dictation task) |
| "followed safety rules" | "praised Jake for safety" | ❌ Different meaning |
| "14" | "forty" | ❌ Use `spoken_text: "fourteen"` |

Add `spoken_text` field when normalization risk exists.

### Rule E — CEFR A2 ASSESSMENT LANGUAGE [HIGH]
Assessed audio (L1–L5) MUST use A2 Flyers vocabulary and sentence structure. CLIL/extension audio MAY exceed A2 for topic-specific terms with context.

### Rule F — EXAM MECHANIC FIDELITY [CRITICAL]
- L4: Answer distribution MUST include ≥ 2 distinct letters across 5 scored items
- L3: 8 option cards (A–H), 5 scored items, 1 example
- L5: 3 colour actions + 2 write actions + 1 example
- L2: 5 answer fields + 1 example

### Rule G — EXAMPLES REQUIRED [HIGH]
Every Cambridge Part MUST include one example that demonstrates the mechanic without revealing a scored answer.

### Rule H — NO DUPLICATE PLAYS [MEDIUM]
One clean recording per file. Player controls replay. Never concatenate the same content twice.

### Rule I — NO SPOKEN UI ELEMENTS [HIGH]
MUST NOT speak: "Question 1", "Question 2", "Man", "Woman", "Speaker 1", "Answer key".
MUST speak: Cambridge official exam instruction sentences.

### Rule J — NO ANSWER LEAKAGE [CRITICAL]
Distractors MUST be plausible. Answer pattern MUST NOT be exploitable without listening.
Positional bias (all-A) = answer leakage = task-design failure.

### Rule K — NATURAL AUDIO QUALITY [MEDIUM]
Assessed content: speaking rate 0.85–0.90. Narrated content: 0.90–1.00. Speaker switch pause: ≥ 200ms.

### Rule L — ACRONYM/CAPITALIZATION [MEDIUM]
Written uppercase does NOT imply letter-by-letter pronunciation. `"CARE"` → TTS receives `"care"`.

### Rule M — TTS NORMALIZATION TRACKING [HIGH]
Review all text fields for normalization risks before generation. Add `spoken_text` when risk exists.

### Rule N — POST-PROCESSING INTEGRITY [HIGH]
Concatenation MUST: preserve turn order, insert ≥200ms silence on speaker change, not clip words, not duplicate turns.

### Rule O — RUNTIME INTEGRITY [CRITICAL]
After generation: MD5-compare `public/audio/weekNN/` vs `dist/audio/weekNN/`. Any mismatch = BLOCK RELEASE.

### Rule P — ASR VERIFICATION [HIGH]
Run Whisper ASR on all generated assessed audio. Cross-check against answer keys.
ASR is EVIDENCE, NOT GROUND TRUTH. Human review REQUIRED for:
- Proper nouns
- Names
- Numbers (digit/word normalization)
- Cases where Whisper confidence < 0.7

---

## 11. Content Generation Standard (Normative)

### 11.1 Fundamental Principle

```
DATA → VALIDATION → TTS → ASR → ANSWER-KEY VERIFICATION → MECHANIC CHECK → PUBLIC/DIST SYNC → RELEASE

NOT:
DATA → SCRIPT INVENTS CONTENT → AUDIO → HOPE
```

### 11.2 Required Data Fields (Normative)

**All listening tasks MUST have:**

```js
// L2 — dialogue format (REQUIRED):
listening_p2: {
  dialogue_script: [
    { speaker: "woman", text: "..." },
    { speaker: "man",   text: "..." }
  ],
  required_speakers: ["man", "woman"],
  answer_key: {
    example: "Room 4B",
    f1: "Science",
    f2: "school corridor",
    f3: "2 minutes",
    f4: "clean bandage",
    f5: "safety badge"
  }
}

// L3 items — audio_text required (REQUIRED):
listening_p3: {
  items: [
    { id: 1, name: "School Stairs", target_letter: "A",
      audio_text: "What are the steps inside the school that go between floors? School stairs. Write the letter.",
      audio_url: "/audio/weekNN/listening_p3_item1.mp3" }
  ]
}

// L4 — dialogue_script required, no labels in text, mixed answers (REQUIRED):
listening_p4: {
  questions: [
    { id: "p4_q1", answer: "B",  // NOT "A" for all
      dialogue_script: [
        { speaker: "woman", text: "Why was the floor slippery?" },
        { speaker: "man",   text: "The cleaner had just washed the tiles." }
      ]
    }
  ]
}

// L5 — audio_text on each instruction (REQUIRED):
listening_p5: {
  instructions: [
    { id: "inst_1", action: "colour", item: "Jake's Backpack", target: "blue",
      audio_text: "Colour Jake's backpack blue." }
  ]
}
```

### 11.3 Generation Script Constraints

**Generation scripts MUST:**
- Import hub data as the sole source of content
- Transform data using defined field names (`audio_text`, `dialogue_script`, `answer_key`)
- Call `validateDialogueScript()` before any multi-speaker TTS call
- Throw an error (not silently continue) when required fields are missing
- Write output MD5 checksums to a manifest file after generation

**Generation scripts MUST NOT:**
- Hard-code character names, object names, colours, numbers, locations
- Construct dialogue turns from inferred descriptions
- Build spoken content from fields not designed to contain spoken content
- Use regex stripping of speaker labels as the primary safety mechanism (it may be a secondary safeguard, but it is NOT a substitute for correct data structure)

---

## 12. Difficulty Standard

### 12.1 W33 Difficulty Model

| Difficulty Dimension | L1 | L2 | L3 | L4 (defective) | L5 |
|---------------------|----|----|----|----|-----|
| Lexical difficulty | Low | Low | Low | Low | Low |
| Grammar complexity | Low | Low | Low | Low | Low |
| Processing speed | Medium | Medium | Medium | Low | Low |
| Memory demand | Medium | Medium | Medium | Low | Low |
| Distractors | 1 extra name | Example field | 3 unused letters | B,C always wrong | None |
| Visual complexity | Medium | Low | Medium | Medium | Medium |
| Inference distance | Low | Low | Low | Low (too low) | Low |
| Response complexity | Motor (draw) | Spelling | Letter write | Motor (tick) | Motor + spelling |

### 12.2 Difficulty Rules

**Rule D1:** An A2 assessment item MUST require the learner to listen (or read) to determine the correct response. If the response can be determined from the visual alone, scoring, position, or pattern, the item is invalid.

**Rule D2:** Distractors MUST be plausible within the topic domain and must NOT be obviously absurd. "A warm cup of hot tea" (L4 Q4 distractor) is marginally acceptable; "He laughed at his friend" (L4 Q3 distractor B) is acceptable as a behavioural contrast. However, if all correct answers are A, the distractors become irrelevant regardless of their individual quality.

**Rule D3:** Task difficulty MUST come from the target skill, not from irrelevant factors (obscure vocabulary, confusing instructions, ambiguous visuals, or excessive cognitive load unrelated to listening).

**Rule D4:** The gap between practice difficulty and assessment difficulty MUST NOT be greater than one cognitive step. Learners SHOULD encounter the task mechanic during practice before encountering it under timed/scored conditions.

---

## 13. Validation Architecture

### 13.1 Gate Categories

**STRUCTURAL GATES** — Data schema and file integrity

| Gate | Check | Blocking? |
|------|-------|-----------|
| S1 | All hub files load without error | CRITICAL |
| S2 | All `audio_url` paths resolve in `public/` | CRITICAL |
| S3 | All `dialogue_script[]` fields have `{speaker, text}` per turn | CRITICAL |
| S4 | All `required_speakers[]` present in `dialogue_script` | CRITICAL |
| S5 | No `Man:`/`Woman:`/`Girl:`/`Boy:` in any `text` field | CRITICAL |
| S6 | All `audio_text` fields present for L3 items and L5 instructions | CRITICAL |
| S7 | L4 `questions[]` use `dialogue_script[]` format, not string `audio_script` | CRITICAL |
| S8 | `answer_key` field present in L2 and L4 hub sections | HIGH |

**SEMANTIC GATES** — Content consistency and cross-modal integrity

| Gate | Check | Blocking? |
|------|-------|-----------|
| M1 | Character names consistent across all hub files for the week | CRITICAL |
| M2 | Answer values semantically identical in source vs ASR transcript | CRITICAL |
| M3 | No character name from hub appears with a different name in any audio ASR | CRITICAL |
| M4 | Dictation audio ASR matches `skill_practice_hub.js dictation[].text` exactly | CRITICAL |
| M5 | `read_stem.mp3` ASR is consistent with `read.js text_en` | HIGH |
| M6 | `explore.mp3` ASR narrates content relevant to the week theme | HIGH |

**PEDAGOGICAL GATES** — Learning quality

| Gate | Check | Blocking? |
|------|-------|-----------|
| P1 | All 20 vocabulary items appear in at least one task or story passage | HIGH |
| P2 | Grammar target structure appears in at least 3 different stations | HIGH |
| P3 | Boss assessment tasks use vocabulary from the week's vocabulary list | HIGH |
| P4 | Scaffolding (word banks, hints) is absent during assessment tasks | HIGH |
| P5 | `explore.js content_en` is thematically consistent with the week's reading narrative | HIGH |

**ASSESSMENT GATES** — Assessment validity

| Gate | Check | Blocking? |
|------|-------|-----------|
| A1 | L4 answer distribution: no single letter appears for all 5 scored items | CRITICAL |
| A2 | L4 answer distribution: ≥ 2 distinct letters across Q1–Q5 | CRITICAL |
| A3 | L3: 8 option cards, 5 scored items, 1 example | HIGH |
| A4 | L2: 5 answer fields, 1 example | HIGH |
| A5 | L5: 3 colour instructions + 2 write instructions + 1 example | HIGH |
| A6 | L1: 5 named targets + 1 example + ≥ 1 distractor name (no matching target) | HIGH |
| A7 | R&W P4: 10 questions present (currently 0 in W33) | HIGH |

**AUDIO GATES** — Audio fidelity

| Gate | Check | Blocking? |
|------|-------|-----------|
| AU1 | All assessed audio files present with duration > 0 | CRITICAL |
| AU2 | Whisper transcript of each L2 answer field contains the `answer_key` value | CRITICAL |
| AU3 | Whisper transcript of each L3 item contains the target object name | CRITICAL |
| AU4 | Whisper transcript of each L5 instruction contains object + action + value | CRITICAL |
| AU5 | No ASR output contains sentence-initial "Man.", "Woman.", "Question N." | HIGH |
| AU6 | L2 audio: ≥ 2 acoustically distinct voices (neural voice IDs differ) | HIGH |
| AU7 | L3 items: each item audio has ≥ 2 voice turns | HIGH |
| AU8 | No duplicate turns in audio (duration within ±20% of expected) | HIGH |

**RUNTIME GATES** — Asset synchronization

| Gate | Check | Blocking? |
|------|-------|-----------|
| R1 | MD5(public/audio/weekNN/f) == MD5(dist/audio/weekNN/f) for all f | CRITICAL |
| R2 | All runtime `audio_url` references resolve | CRITICAL |
| R3 | All image URLs referenced in L4 `options[].image_url` resolve | HIGH |
| R4 | Speaking hub image URLs resolve | HIGH |

**RELEASE GATE**

| Gate | Check | Blocking? |
|------|-------|-----------|
| REL | All CRITICAL gates pass; all HIGH gates pass or are documented exceptions | CRITICAL |
| GOLD | REL + all MEDIUM gates pass + alignment declared + remediation list empty | Required for Golden certification |

### 13.2 Automation Priority

| Script | Gates Covered | Priority |
|--------|--------------|---------|
| `validate_hub_structure.mjs <weekNum>` | S1–S8, A3–A7 | **P0** |
| `validate_l4_answer_distribution.mjs <weekNum>` | A1, A2 | **P0** |
| `validate_public_dist_sync.mjs <weekNum>` | R1 | **P0** |
| `validate_cross_modal_names.mjs <weekNum>` | M1, M3 | **P0** |
| `asr_answer_verification.mjs <weekNum>` | AU2–AU5, M2, M4, M5 | **P1** |
| `validate_audio_speakers.mjs <weekNum>` | AU6, AU7 | **P1** |
| `validate_pedagogical_coverage.mjs <weekNum>` | P1–P5 | **P2** |

---

## 14. Blocking vs Non-Blocking Defects

### Severity Definitions

| Severity | Definition | Blocks What |
|----------|-----------|-------------|
| **CRITICAL** | Incorrect answer key, invalid assessment, answer leakage, semantic content error | Generation + Assessment Release + Weekly Release + Golden |
| **HIGH** | Source-of-truth violation, required speaker missing, substantial CEFR mismatch, visual ambiguity in scored content | Assessment Release + Weekly Release |
| **MEDIUM** | Minor content drift (extra word), spoken metadata, minor audio quality issue | Weekly Release (if unresolved after 2 weeks) |
| **LOW** | ASR artifact (Whisper mishear of semantically equivalent word), cosmetic inconsistency | Does not block release; logged for future fix |
| **OBSERVATION** | Documentation gap, technical debt, non-priority improvement | No blocking effect |

### Blocking Classification Rules

**ALWAYS blocks CRITICAL:**
- An answer key is wrong
- An audio file says the wrong answer
- The assessment mechanic is invalid (all-A L4)
- A character name in audio contradicts the answer key
- A dictation sentence in audio is different from the answer key sentence
- Missing required Cambridge element (no example)

**ALWAYS blocks HIGH:**
- Audio script content invented in generation script (not in hub data)
- Required speaker not in audio (e.g., L2 is single-voice)
- `audio_url` does not resolve
- public/dist MD5 mismatch

**NEVER blocks (LOW or OBSERVATION):**
- Whisper mishears "drying" as "drawing" (phonetically similar, not semantically different in context)
- "colour" spelled as "color" (US/UK spelling — same word)
- Minor capitalization difference in a non-answer-bearing word

---

## 15. W33 Golden Readiness Scorecard

| Domain | Score | Status | Blocking Issues |
|--------|-------|--------|----------------|
| Learning Architecture | 7/10 | 🟡 CONDITIONAL | LP-02 (explore theme), LP-03 (scaffolding gate) |
| Assessment Validity — Listening | 4/10 | 🔴 FAIL | L4 all-A (CRITICAL), dictation D3/D4/D5 stale (CRITICAL) |
| Assessment Validity — Reading | 6/10 | 🟡 CONDITIONAL | R&W P4 empty (HIGH) |
| Assessment Validity — Speaking | 8/10 | 🟢 PASS | Minor |
| Cambridge Alignment | 5/10 | 🟡 CONDITIONAL | L4 DEFECTIVE, L3 source-of-truth |
| Content Integrity | 4/10 | 🔴 FAIL | read_stem stale (CRITICAL), dictation stale (CRITICAL) |
| Audio Integrity | 5/10 | 🟡 CONDITIONAL | explore wrong content, dictation mismatch |
| Visual Integrity | 7/10 | 🟡 CONDITIONAL | L4 image_url not verified in this audit |
| CEFR Appropriateness | 8/10 | 🟢 PASS | Minor (explore complexity) |
| Source-of-Truth Integrity | 4/10 | 🔴 FAIL | L4 labels in text, L3 scripts in generator |
| Validation Coverage | 3/10 | 🔴 FAIL | Most gates not automated |
| Runtime Integrity | 9/10 | 🟢 PASS | public/dist 100% match |

**Overall:** 🟡 CONDITIONAL — REMEDIATION REQUIRED BEFORE FREEZE

---

## 16. GOLDEN LEARNING & ASSESSMENT STANDARD v1.0 (Normative)

This section constitutes the normative standard. All rules use RFC 2119 language.

---

### STANDARD 1 — LEARNING OBJECTIVE

**S1.1** Every task that is classified as ASSESSMENT MUST have a declared `learning_objective` field in its hub data.

**S1.2** The `learning_objective` MUST specify: target skill, target content domain, learner action, and observable success criterion.

**S1.3** Vague objectives such as "practice English" MUST NOT be used as `learning_objective` values.

**S1.4** Example compliant objective:
```
"Identify spoken factual information about people and school locations
 in a short A2-level dialogue with two speakers."
```

---

### STANDARD 2 — SKILL CLASSIFICATION

**S2.1** Every task MUST be classified as one of:
- `LEARNING` — Exposure; no scoring
- `GUIDED_PRACTICE` — Supported practice; hint/scaffold present
- `CONTROLLED_PRACTICE` — Constrained production; item-level feedback
- `FREE_PRACTICE` — Open production; no mandatory scaffold
- `ASSESSMENT` — Scored; no scaffold; reproducible scoring

**S2.2** Tasks classified as `ASSESSMENT` MUST NOT provide hints that reveal the correct answer.

**S2.3** Tasks classified as `LEARNING` MAY NOT be used to determine Shield scores.

---

### STANDARD 3 — CAMBRIDGE ALIGNMENT DECLARATION

**S3.1** Every task that uses Cambridge A2 Flyers mechanics MUST declare a `cambridge_alignment` value: `EXACT`, `ALIGNED`, `FLYERS_INSPIRED`, or `NOT_FLYERS`.

**S3.2** `EXACT` MUST NOT be declared unless: correct mechanic, correct item count, correct example, correct speaker structure, correct answer distribution, and source-of-truth integrity are all satisfied.

**S3.3** `EXACT` MUST be revoked if any Gate S3–S8, AU6, AU7, A1, A2 fails after generation.

**S3.4** Gate A1 (L4 answer distribution) MUST run automatically before any `cambridge_alignment: "EXACT"` declaration is accepted for L4.

---

### STANDARD 4 — SOURCE OF TRUTH

**S4.1** All spoken content in assessed audio MUST originate from a named field in the authoritative hub data file for that week.

**S4.2** The following fields are REQUIRED in hub data:

| Task | Required Field | Field Type |
|------|--------------|-----------|
| L2 | `dialogue_script[]` | Array of `{speaker, text}` |
| L3 items | `audio_text` | String |
| L4 questions | `dialogue_script[]` per question | Array of `{speaker, text}` |
| L5 instructions | `audio_text` | String |
| Dictation items | `text` | String (source of truth for answer key) |

**S4.3** Generation scripts that cannot find a required field MUST throw a build error, not silently continue with invented content.

**S4.4** Speaker identity MUST appear in the `speaker` field. It MUST NOT appear in the `text` field.

---

### STANDARD 5 — MULTI-SPEAKER TTS

**S5.1** All Cambridge Listening Parts that use conversational dialogue (L1, L2, L3, L4) MUST use acoustically distinct voices for each speaker role.

**S5.2** Voice mapping MUST be:
```
man / boy  → en-US-Neural2-D
woman / girl → en-US-Journey-F
```

**S5.3** Each speaker turn MUST be sent to the TTS API in a separate call.

**S5.4** `validateDialogueScript()` MUST be called before every `generateDialogueAudio()` call.

**S5.5** The L2 implementation pattern (`dialogue_script[]` → `validateDialogueScript()` → `generateDialogueAudio()`) is the REFERENCE IMPLEMENTATION for all multi-speaker tasks.

---

### STANDARD 6 — ANSWER FIDELITY

**S6.1** Names, numbers, times, colours, locations, objects, and quantities that appear in the answer key MUST appear semantically identically in the audio.

**S6.2** Acceptable normalizations:
- Digit to word: "2 minutes" → "two minutes"
- US/UK spelling: "colour" → "color"

**S6.3** Unacceptable substitutions:
- Name change: any character name → different name
- Grammar change that alters dictation answer: "ran" → "running"
- Semantic change: "followed safety rules" → "praised Jake for safety"
- Number substitution: "14" → "forty"

**S6.4** When normalization risk exists, the hub data MUST include a `spoken_text` field with the exact pronunciation intended.

---

### STANDARD 7 — L4 ANSWER DISTRIBUTION

**S7.1** For Cambridge L4 (and any 3-option MCQ assessment), the distribution of correct answers MUST satisfy:

```
∀ letter ∈ {A, B, C}: count(letter in scored answers) ≤ 3
∃ letters ∈ {A, B, C}: count(letter in scored answers) ≥ 1
```

That is: no single letter may have all 5 correct answers, and all 3 letters must appear at least once.

**S7.2** Gate A1 MUST verify this before accepting the L4 task. Violation = CRITICAL block.

**S7.3** Distractors MUST be plausible within the topic domain. They MUST NOT be obviously absurd.

---

### STANDARD 8 — CROSS-MODAL INTEGRITY

**S8.1** Every character, object, colour, and location referenced in assessed content MUST be consistent across: hub data (source), audio (ASR), visual assets, question text, and answer key.

**S8.2** If a character is named in one modality, they MUST be named consistently in all modalities, OR be consistently anonymous in all modalities.

**S8.3** Gate M1 MUST verify character name consistency across all hub files for a week. Mismatch = HIGH block.

**S8.4** Audio files generated from a superseded version of hub data MUST NOT be used. Audio regeneration MUST be triggered whenever the source text changes.

---

### STANDARD 9 — AUDIO PIPELINE

**S9.1** The complete audio pipeline MUST follow this sequence:

```
1. Hub data validated (Gates S1–S8)
2. TTS generation (using dialogue_script[] and audio_text fields)
3. Audio files written to public/audio/weekNN/
4. MD5 manifest generated
5. Whisper ASR run on all assessed files
6. ASR compared against answer_key (Gates AU2–AU5, M2, M4)
7. Audio speaker count verified (Gates AU6, AU7)
8. public/ → dist/ copy + MD5 verify (Gate R1)
9. All gates must PASS before week is declared ASSESSMENT-READY
```

**S9.2** Steps 3–9 MUST be automated. Manual verification MAY supplement but MUST NOT replace automated gates for CRITICAL-severity checks.

---

### STANDARD 10 — THEMATIC COHERENCE

**S10.1** All learning stations within a week (read_explore, explore, clil, vocabulary, grammar, dictation, speaking) MUST address the same thematic domain.

**S10.2** The `explore.js content_en` MUST narrate content that extends or deepens understanding of the same topic introduced in `read.js text_en`.

**S10.3** Vocabulary items MUST appear in at least one passage, story, or listening task in the same week.

**S10.4** The grammar target structure MUST appear in at least 3 different station types in the same week.

---

### STANDARD 11 — DIFFICULTY CALIBRATION

**S11.1** Assessment task difficulty MUST derive from the target skill, not from irrelevant factors (obscure vocabulary, confusing instructions, visual ambiguity).

**S11.2** Tasks that can be answered correctly by any test-taking strategy (pattern guessing, letter selection, visual prominence) without demonstrating the target skill MUST NOT be classified as ASSESSMENT.

**S11.3** The gap between the most scaffolded practice task and the assessment version MUST be traversable in a single cognitive step.

---

### STANDARD 12 — STALE ASSET POLICY

**S12.1** An audio file is STALE if its content does not match the current version of its source hub data field.

**S12.2** A stale asset in an active audio URL MUST trigger a CRITICAL block until regenerated.

**S12.3** An orphaned audio file (not referenced by any runtime component) MUST be documented in a machine-readable manifest (`ORPHANED_AUDIO_MANIFEST.json`) with:
- filename
- reason for orphaning
- date orphaned
- content summary
- whether it is safe to activate

**S12.4** Orphaned assets with incorrect content MUST be explicitly marked `safe_to_activate: false` in the manifest.

---

## 17. Required Architecture Implications

Every field listed below is required by the standards above. None are optional extras.

### Hub Data Schema Additions Required

```js
// NEW: learning_objective field (Standard 1)
task.learning_objective = {
  skill: "listening_identification",
  content: "school safety vocabulary",
  action: "draw a line between name and picture",
  criterion: "5 correct name-to-picture matches from spoken dialogue"
}

// NEW: task_type field (Standard 2)
task.task_type = "ASSESSMENT" // | GUIDED_PRACTICE | CONTROLLED_PRACTICE | FREE_PRACTICE | LEARNING

// NEW: cambridge_alignment field (Standard 3)
task.cambridge_alignment = "EXACT" // | ALIGNED | FLYERS_INSPIRED | NOT_FLYERS

// NEW: answer_key field (Standard 6 — already exists in L2, needs L3, L4, L5)
task.answer_key = { f1: "Science", f2: "school corridor", ... }

// NEW: audio_text in L3 items (Standard 4)
listening_p3.items[n].audio_text = "Description sentence. Target name. Write the letter."

// CHANGE: L4 questions must use dialogue_script[] (Standard 4, 5)
listening_p4.questions[n].dialogue_script = [
  { speaker: "woman", text: "Question text" },
  { speaker: "man",   text: "Answer information" }
]
// REMOVE: audio_script string field

// NEW: spoken_text for normalization risk (Standard 6)
{ speaker: "man", text: "She arrived in 2 minutes.", spoken_text: "She arrived in two minutes." }

// NEW: week_character_registry (Standard 8)
// Single source of truth for all character names used in the week
week_character_registry = {
  jake: { display_name: "Jake", anonymous_in: ["read.js"] },
  nurse_sarah: { display_name: "Nurse Sarah", anonymous_in: ["read.js", "skill_practice_hub.js"] }
}

// NEW: cambridge_alignment per task in hub data (Standard 3)
listening_hub.cambridge_alignment = {
  listening_p1: "ALIGNED",
  listening_p2: "EXACT",
  listening_p3: "ALIGNED",
  listening_p4: "EXACT", // only after L4 redesign
  listening_p5: "EXACT"
}
```

### Validation Script Requirements

```
P0 scripts (must exist before any W34+ generation):
  - validate_hub_structure.mjs         → Gates S1–S8, A3–A7
  - validate_l4_answer_distribution.mjs → Gates A1, A2
  - validate_public_dist_sync.mjs      → Gate R1
  - validate_cross_modal_names.mjs     → Gates M1, M3

P1 scripts (must exist before W34 Boss release):
  - asr_answer_verification.mjs        → Gates AU2–AU5, M2, M4, M5
  - validate_audio_speakers.mjs        → Gates AU6, AU7

P2 scripts (before W35):
  - validate_pedagogical_coverage.mjs  → Gates P1–P5
  - cambridge_alignment_report.mjs     → Gate S3.1, S3.2
```

---

## 18. Required Production Pipeline Implications

**Current pipeline (implicit):**
```
Someone writes hub data → Script generates audio → Deploy
```

**Required pipeline (Standard 9.1):**

```
STAGE 0 — PRE-GENERATION VALIDATION
  validate_hub_structure.mjs weekNN        → Fail = STOP
  validate_l4_answer_distribution.mjs weekNN → Fail = STOP
  validate_cross_modal_names.mjs weekNN    → Fail = WARN/STOP

STAGE 1 — TTS GENERATION
  node scripts/regenerate_weekNN_listening_audio.mjs
  → Must call validateDialogueScript() before each generateDialogueAudio()
  → Must write MD5 manifest on completion

STAGE 2 — POST-GENERATION VERIFICATION
  asr_answer_verification.mjs weekNN       → Fail = STOP
  validate_audio_speakers.mjs weekNN       → Fail = STOP

STAGE 3 — ASSET SYNCHRONIZATION
  validate_public_dist_sync.mjs weekNN     → Fail = STOP (copy and re-verify)

STAGE 4 — RELEASE GATE
  All gate checks must PASS
  cambridge_alignment declared for all tasks
  ORPHANED_AUDIO_MANIFEST.json updated

STAGE 5 — GOLDEN CERTIFICATION (optional per week)
  validate_pedagogical_coverage.mjs weekNN
  cambridge_alignment_report.mjs weekNN
  All P2 gates pass
  → Week declared GOLDEN
```

---

## 19. Game Layer Boundary

The Game Layer encompasses: XP, coins, badges, streaks, leaderboard, Boss animations, quest narrative, character persona (Nova), reward sequences, engagement mechanics.

**The Game Layer MUST NOT:**

| Forbidden Action | Why |
|-----------------|-----|
| Change answer keys | Assessment validity |
| Change shield scoring thresholds | Cambridge scoring integrity |
| Change CEFR level of tasks | Pedagogical contract |
| Change learning objectives | Curriculum contract |
| Change Cambridge mechanic (items, structure) | Flyers fidelity |
| Override source-of-truth content | Data integrity |
| Provide answer hints during assessment | Answer leakage |
| Modify audio content | Audio contract |
| Grant "correct" status for wrong answers | Scoring validity |

**The Game Layer MAY:**

| Permitted Action | Scope |
|-----------------|-------|
| Award XP/coins for completing tasks | Engagement only |
| Display Boss animations and narratives | Presentation only |
| Adjust time limits | Pacing only (must not invalidate scoring) |
| Provide encouragement messages | Motivation only |
| Control task ordering within a day | Navigation only |
| Show streaks, badges, leaderboards | Retention only |
| Change visual themes and character designs | Presentation only |

**Architectural boundary:**

```
┌─────────────────────────────────────────────────────────┐
│  GAME LAYER                                             │
│  (XP, animations, boss narrative, rewards, pacing)      │
│                                                         │
│  MAY read from: task_type, score, completion_status     │
│  MUST NOT write to: answer_key, learning_objective,     │
│      cambridge_alignment, dialogue_script, audio_url    │
└─────────────────────────┬───────────────────────────────┘
                          │ READ ONLY
┌─────────────────────────▼───────────────────────────────┐
│  LEARNING / ASSESSMENT CORE (this standard)             │
│  (hub data, audio, answer keys, objectives, alignment)  │
│                                                         │
│  Validated by: Gates S1–AU8, R1–R4                      │
│  Frozen by: Golden certification                         │
└─────────────────────────────────────────────────────────┘
```

---

## 20. Pre-Freeze Checklist

### P0 — CRITICAL (must complete before any freeze attempt)

- [ ] P0-1: Redesign L4 Q1–Q5 so answers span A, B, C (verify with Gate A1)
- [ ] P0-2: Regenerate `dictation_3.mp3`, `dictation_4.mp3`, `dictation_5.mp3` from current `skill_practice_hub.js dictation[].text`
- [ ] P0-3: Regenerate `read_stem.mp3` from current `read.js text_en`
- [ ] P0-4: Convert L4 `audio_script` fields to `dialogue_script[]`; remove `Woman:`/`Man:` labels
- [ ] P0-5: Add `audio_text` to all `listening_p3.items[]` entries in `listening_hub.js`
- [ ] P0-6: Rewrite `explore.js content_en` to be thematically consistent with friction/corridor narrative
- [ ] P0-7: Regenerate `explore.mp3` after P0-6
- [ ] P0-8: Create `validate_hub_structure.mjs` (runs Gates S1–S8)
- [ ] P0-9: Create `validate_l4_answer_distribution.mjs` (Gate A1, A2)
- [ ] P0-10: Create `validate_public_dist_sync.mjs` (Gate R1)

### P1 — HIGH (complete before Boss release)

- [ ] P1-1: Convert L1 `passage_audio_script` to `dialogue_script[]`; regenerate with two voices
- [ ] P1-2: Regenerate `dictation_1.mp3`, `dictation_2.mp3` from current source
- [ ] P1-3: Remove "Question N." prefix from L4 audio_script text before P0-4 conversion
- [ ] P1-4: Create `asr_answer_verification.mjs`
- [ ] P1-5: Create `validate_cross_modal_names.mjs`
- [ ] P1-6: Verify R&W P4 questions array (currently empty) — add 10 grammar MCQ items or declare as deferred
- [ ] P1-7: Verify L4 `options[].image_url` all resolve
- [ ] P1-8: Add `cambridge_alignment` field to all listening tasks in `listening_hub.js`

### P2 — ARCHITECTURE (before W35)

- [ ] P2-1: Add `learning_objective` field to all ASSESSMENT tasks
- [ ] P2-2: Add `task_type` classification to all hub tasks
- [ ] P2-3: Create `week_character_registry` in each week's hub index
- [ ] P2-4: Create `ORPHANED_AUDIO_MANIFEST.json` (machine-readable)
- [ ] P2-5: Create `validate_pedagogical_coverage.mjs`
- [ ] P2-6: Create `cambridge_alignment_report.mjs`

---

## 21. Open Questions / Evidence Gaps

| # | Question | Evidence Gap | Action |
|---|---------|-------------|--------|
| OQ-1 | Are L4 image_url values (card_a.jpg–card_g.jpg) all present? | Not verified in this audit | Run visual asset check |
| OQ-2 | Does `inst4.mp3` actually say "Notis Board" or is this Whisper artifact? | ASR only; no human ear check | Human listening required |
| OQ-3 | Is R&W P4 intentionally empty in W33 or a data gap? | 0 questions found | Clarify with content team |
| OQ-4 | Are dictation D1 and D2 audio accurate enough for current use (minor drift)? | ASR shows "school" added in D1, "running" vs "ran" in D2 | Regenerate as part of P1-2 |
| OQ-5 | Do shadowing station transcripts align with the video content? | Not audited | Future audit |
| OQ-6 | Does `mindmap_speaking` have a valid scoring mechanism or is it purely free practice? | Not audited in depth | Clarify assessment status |
| OQ-7 | What is the intended character identity policy — should read.js be named or anonymous? | Policy not documented | Define in `week_character_registry` |

---

## 22. Final Recommendation

### Can W33 be frozen as the Golden Standard today?

## 🟡 CONDITIONAL — REMEDIATION REQUIRED BEFORE FREEZE

**W33 is the right starting point for a Golden Standard.** Its Boss/Shield architecture, Hub file structure, L2 reference implementation, L5 reference implementation, and thematic vocabulary-grammar-speaking coherence are sound foundations.

**W33 cannot be frozen today because:**

1. Three active dictation audio files (D3, D4, D5) contain completely different sentences from their answer keys. Students who listen and write would be scored incorrectly.
2. L4 has all 5 answers as "A". This is not a stylistic preference — it is a fundamental assessment failure. Any student who ticks A five times scores perfectly.
3. read_stem.mp3 says "Nurse Clara" but no current source file contains "Nurse Clara". The audio is from a deleted draft.
4. explore.mp3 narrates global school safety policy (Canada/UK/Japan), not the week's friction/corridor theme. The thematic coherence of the input chain is broken at the first CLIL step.
5. L3 audio scripts exist only inside the generation script, not in hub data. Future regeneration cannot guarantee identical content.
6. L4 source data embeds raw `"Woman:"` and `"Man:"` labels in text fields. This is a latent pipeline defect.
7. No automated validation gates exist for answer distribution, cross-modal name consistency, or ASR answer verification.

**After the P0 checklist is complete:**
- W33 audio and data will be internally consistent
- L4 will constitute a valid assessment instrument
- The generation pipeline will be source-of-truth compliant
- The L2+L5 pattern will be safely replicable to W34+

**W33 SHOULD be frozen as the Golden Standard after P0 remediation is complete and verified.** The architecture is sound. The defects are remediable. The standard defined in this document provides the framework to prevent their recurrence.

---

*Standard version: 1.0 | Status: NORMATIVE | No files were modified during this audit.*
*This document is the authoritative contract for W33+ learning and assessment content.*
