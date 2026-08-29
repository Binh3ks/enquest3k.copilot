# 🏛️ W33 GOLDEN BASELINE SPECIFICATION
**Standard Version:** 1.0.0 (Golden Master Frozen)  
**Effective Date:** 2026-08-28  
**Reference Week:** Week 33 ("Corridor Safety & Friction")  
**Target Level:** Cambridge A2 Flyers / Stage 1 Young Learners (Ages 7–10)

---

## 1. PRODUCT ARCHITECTURE INVARIANTS

### 1.1 Master Structure (3-Year English Quest Journey)
- **Weekly Structure:** Exactly **15 Quests** distributed across **5 Days** (3 Quests/Day) and **4 Hubs/Zones**.
- **Pedagogical Boundary:**
  - **Quests 1–4 (Days 1–4):** Learning & Practice Content. Cambridge-aligned, age-appropriate (A2), CEFR-compliant, communicative, and supportive of CLIL English-medium learning.
  - **Quest 5 (Day 5):** Boss Castle / Assessment. Exact Cambridge Flyers mechanics, structure, scoring rubrics, and two-play listening loops are **mandatory**.
  - **Week 5 / Cycle 5 (e.g. W37, W42):** Full Cambridge A2 Flyers Mock Exam (16 parts, timed).

### 1.2 5-Day / 4-Zone Rotary Quest Schedule
| Day | Zone / Hub | Quest ID | Quest Label | Pedagogy / Assessment Type | Data Source |
|:---|:---|:---|:---|:---|:---|
| **Day 1** | Zone 1: Story World | `gear1_webtoon` | Scene Explorer | ESL Chunked Reading & Webtoon Visuals | `reading_hub.story_scenes[]` |
| **Day 1** | Zone 1: Story World | `gear2_karaoke` | Voice Shadow | Multimodal Karaoke Shadowing | `reading_hub.story_scenes[].audio_script` |
| **Day 1** | Zone 1: Story World | `gear3_retell` | Story Retell | Comprehension & Story Recall | `reading_hub.clil_article` |
| **Day 2** | Zone 1/2: Knowledge Lab | `gear4_clil` | Fact Finder | CLIL Science Reading + 5 MCQ Comprehension | `reading_hub.clil_article.check_questions[]` |
| **Day 2** | Zone 1/2: Knowledge Lab | `science_lab` | Action Lab | Physics / Interactive Safety Experiment | `skill_practice_hub.science_lab` |
| **Day 2** | Zone 1/2: Knowledge Lab | `science_report`| Discovery Report| 4-Step Scaffolding Discovery Report (Data Card) | `reading_hub.clil_article` + `writing_hub` |
| **Day 3** | Zone 2: Battle Arena | `word_blitz` | Speed Match | 1-Tap Rapid Vocab Matching | `vocab.js` |
| **Day 3** | Zone 2: Battle Arena | `sentence_smash` | Grammar Duel | Syntax & Target Grammar Construction | `skill_practice_hub.grammar_drills[]` |
| **Day 3** | Zone 2: Battle Arena | `math_quest` | Math Quest | Singapore Bar Model (5 SVG Problems) | `skill_practice_hub.singapore_math[]` |
| **Day 4** | Zone 3: Creator Studio | `story_writer` | Story Writer P7 | 3-Panel Progressive Writing (Model, Build, Write) | `writing_hub.picture_story` |
| **Day 4** | Zone 3: Creator Studio | `broadcast_studio`| Video Challenge | Student News Anchor / Safety Video Challenge | `speaking_hub.talkshow_video` |
| **Day 4** | Zone 3: Creator Studio | `info_exchange` | Info Exchange P2| Speaking Part 2 Information Exchange Cards | `speaking_hub.info_exchange_cards` |
| **Day 5** | Zone 4: Boss Castle | `boss_listening` | Listening Shield| Cambridge Flyers Listening Assessment | `listening_hub.listening_p1` (Cycle 1) |
| **Day 5** | Zone 4: Boss Castle | `boss_reading` | R&W Shield | Cambridge Flyers Reading & Writing Assessment | `listening_hub.listening_p2` (Cycle 1) |
| **Day 5** | Zone 4: Boss Castle | `weekly_review` | Speaking Shield | Cambridge Flyers Speaking / Visual Assessment | `listening_hub.listening_p3` (Cycle 1) |

---

## 2. LEARNING & ASSESSMENT BOUNDARY

> ⚠️ **"Cambridge-aligned practice does not mean every practice task must replicate the Cambridge exam format."**
>
> ⚠️ **"Exact Cambridge Flyers format is mandatory for active Flyers Shields and the full Mock Test."**
>
> ⚠️ **"Game Layer must never alter Learning/Assessment Core."**

---

## 3. ASSESSMENT INVARIANTS (CAMBRIDGE FLYERS FIDELITY)

1. **Two-Play Audio Loop Standard (Listening Parts 1–5):**
   - Play 1 (Full audio asset) → Examiner Rubric (*"Now listen to Part X again."*) → 3s pause → Play 2 (Exact same audio asset) → Examiner Closing (*"That is the end of Part X."*).
2. **Multi-Voice Audio Distribution:**
   - Adult Examiner: `en-US-Neural2-F` (Pitch: -1.5, Rate: 0.86)
   - Male Candidate: `en-US-Neural2-D` (Pitch: +1.0)
   - Child Candidate: `en-US-Neural2-C` (Pitch: +4.0)
3. **Scoring & Shield Rubric:**
   - 5 Cambridge Shields awarded based on deterministic rubric (0–5 shields).
   - Distractors correctly handled (e.g. non-targeted character award score when unlinked).
4. **Boss Rotary Schedule:**
   - Cycle 1: Listening P1, P2, P3
   - Cycle 2: Listening P4, P5, R&W P1, Speaking P1
   - Cycle 3: R&W P2, P3, P4, P5
   - Cycle 4: R&W P6, P7, Speaking P2, P3, P4
   - Cycle 5: Full Mock Exam (All 16 parts)

---

## 4. DATA CONTRACT INVARIANTS

1. **Listening Data Alignment:**
   - Audio must remain aligned across: `DATA TARGET → SCRIPT → MP3 ASSET → UI INTERACTION`.
   - L1: Maria standing near yellow sign holding mop to dry wet floor (Target `t5` at coords 71, 70).
   - L5: Example = Student's Notebook (Yellow); Target 5 = Nurse's Room Door (Red).
2. **Speaking Part 2 Canonical Schema:**
   - `table_a.fields`: Array of candidate question cue items with `is_missing: true`.
   - `table_b.fields`: Array of examiner answers with `audio_url` pointing to static MP3s.
3. **Reading & Writing Part 2 Compatibility:**
   - Supported schema: `dialogue` (5 turns) + `options` (8 choices A–H).
4. **Single-Source Math Purity:**
   - `skill_practice_hub.singapore_math` and `reading_hub.singapore_math` must be 100% identical.

---

## 5. MEDIA & VOCABULARY GOVERNANCE

1. **Zero-Live-TTS on First Play:** 100% pre-generated static MP3 assets (44/44 in W33) with 3-tier fallback (IndexedDB → CDN Static MP3 → Google Cloud TTS → SpeechSynthesis).
2. **CEFR Staging Standard (Stage 1 / A2 Flyers):**
   - Core Learner Vocabulary: `starters_pre_a1.json`, `movers_a1.json`, `flyers_a2.json`.
   - CLIL Domain Terms: Explicitly declared in `clil_article.vocab_focus[]`.
   - KET Extension Words: Monitored with WARN (never silent bypass).
   - Prohibited B2/C1 Academic Jargon: Zero tolerance (`lubricant`, `sterile`, `kinetic momentum`, `predominantly`, etc.).
3. **No-Fallback Doctrine (Fail-Loud Standard):** Zero hardcoded fallback text strings inside component UI. Missing data must fail loudly rather than silently degrading UX.
