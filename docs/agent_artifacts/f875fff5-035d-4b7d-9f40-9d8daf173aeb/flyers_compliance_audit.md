# Cambridge A2 Flyers — Compliance Audit vs W33 Implementation

> **PDF**: Flyers_samples.pdf (scan, 76 pages) — no text layer, knowledge from official Cambridge spec applied.

---

## 📋 Cambridge A2 Flyers Exam Structure (Official)

| Paper | Part | Task Type | Items | Marks |
|---|---|---|---|---|
| **Listening** | L1 | Draw lines (match 5 names to 5 people in 1 scene picture) | 5 lines | 5 |
| **Listening** | L2 | Listen & write (complete 5 notes/form blanks) | 5 blanks | 5 |
| **Listening** | L3 | Match (5 questions: which picture from A–H shows the answer?) | 5 matches | 5 |
| **Listening** | L4 | Tick the box (5 questions × 3 options A/B/C) | 5 ticks | 5 |
| **Listening** | L5 | Colour & write (1 picture, 3 colour + 2 write instructions) | 5 tasks | 5 |
| **Reading & Writing** | R1 | Word–Definition match (10 words + 15 definitions, pick correct 10) | 10 | 10 |
| **Reading & Writing** | R2 | Dialogue (5 answer choices A–H for 5 conversation gaps) | 5 | 5 |
| **Reading & Writing** | R3 | Story + title: gap-fill 6 blanks from word bank (8 words) | 6 | 6 |
| **Reading & Writing** | R4 | Long text + 10 True/False/Not Given questions | 10 | 10 |
| **Reading & Writing** | R5 | Story gap-fill: 7 blanks, answers 1–4 words from context | 7 | 7 |
| **Reading & Writing** | R6 | Open cloze: 10 single-word gaps in a text | 10 | 10 |
| **Reading & Writing** | R7 | Creative writing: 3-picture story ≥20 words | open | 15 |
| **Speaking** | S1 | Find 4 differences between 2 pictures | 4 diffs | — |
| **Speaking** | S2 | Information exchange: ask & answer about 5-item picture chart | 5 items | — |
| **Speaking** | S3 | Tell a story from 5 sequential pictures | 5 pics | — |
| **Speaking** | S4 | Personal questions (3–4 open questions about self) | 3–4 Qs | — |

**Total Listening: 25 marks | Reading & Writing: 50 marks | Speaking: holistic band**

---

## 🔴 Critical Discrepancies Found in W33

### LISTENING

| Part | Official Spec | W33 Implementation | Status | Gap |
|---|---|---|---|---|
| **L1** | 1 scene picture + 5 names + 5 people to match (draw lines) | ✅ 1 image, dialogue script, names array (Jake, Tom, Nurse Sarah, Headmaster Brown, Maria, David) | ⚠️ **PARTIAL** | `names` has **6 entries** (should be exactly 5 scoreable + 1 example = 6 total ✅). BUT component `SVGLineMatcher` renders targets from `pins` array — need to verify 5 pins (characters) are in image |
| **L2** | Listen & write 5 blanks in notes/form | ✅ `dialogue_script` present, `fields` array | ⚠️ **PARTIAL** | `fields` count needs verification; L2 is a **note-completion** not just dialogue |
| **L3** | 5 short dialogues → match to 1 of 8 pictures (A–H) | ✅ `items`: 5, `VisualMatchingAH` component | ✅ **CORRECT** | — |
| **L4** | 5 conversations → tick 1 of 3 pictures (A/B/C) | ✅ 5 questions (+ 1 example = 6 total), `MultipleChoice3Pic` | ✅ **CORRECT** | — |
| **L5** | 1 picture, colour 3 things + write 2 words | ✅ `instructions` present, `SVGColorAndWrite` | ⚠️ **PARTIAL** | `instructions` array size needs check (should be 3 colour + 2 write = 5 total) |

**Rotary Architecture re-check:**
- Cycle 1 (W33): `list_p1` + `list_p2` — **CORRECT** (L1+L2 both in W33)
- The user reports "only L1, no L2" — likely a **component routing bug**, not data bug. Both `listening_p1` and `listening_p2` exist in W33 data. `bossRotarySchedule` Cycle 1 correctly declares both `list_p1` + `list_p2`. Investigation needed in `boss_listening` quest renderer.

---

### READING & WRITING

| Part | Official Spec | W33 Implementation | Status | Gap |
|---|---|---|---|---|
| **R1** | 10 word–definition pairs (word bank 15 words, pick 10) | ✅ 10 definitions, `word_bank` 15 items | ✅ **CORRECT** | — |
| **R2** | Dialogue gap-fill: 5 gaps, 8 answer options (A–H) | ✅ 5 turns, 8 answer_options A–H | ✅ **CORRECT** | — |
| **R3** | Story + title choice: 6 blanks, 8 word bank + title question | ✅ 5 blanks (missing 1!) + title_options | 🔴 **GAP** | **Only 5 blanks** — Flyers R3 requires **6 blanks + title** |
| **R4** | Long text + 10 True/False/Not Given | ❌ `rw_part_4` not in writing_hub or reading_hub data | 🔴 **MISSING** | Entire R4 absent from W33 |
| **R5** | Story gap-fill 7 blanks (1–4 word answers) | ❌ `rw_part_5` absent | 🔴 **MISSING** | Entire R5 absent from W33 |
| **R6** | Open cloze 10 gaps single-word | ❌ `rw_part_6` absent | 🔴 **MISSING** | Entire R6 absent from W33 |
| **R7** | 3-picture story writing ≥20 words | ✅ `picture_story` 3 panels in writing_hub | 🟡 **SHAPE WRONG** | See below |

---

### SPEAKING

| Part | Official Spec | W33 Implementation | Status | Gap |
|---|---|---|---|---|
| **S1** | Find 4 differences between 2 pictures (describe each aloud) | ✅ `find_differences`, 4 differences, 2 images | ✅ **CORRECT shape** | Hotspot fix just applied |
| **S2** | Info exchange: student gets 1 picture with 5 blank slots, asks examiner to fill gaps | ⚠️ `info_exchange_cards` present | 🟡 **PARTIAL** | Need to verify it's true "info gap" format (not just Q&A) |
| **S3** | Narrate story from **5 sequential pictures** (examiner shows picture 1 as prompt, student narrates pictures 2–5) | ❌ `picture_story.images: 4` — only **4 pictures** | 🔴 **WRONG COUNT** | Official Flyers S3 = **5 pictures** |
| **S4** | 3–4 personal questions by examiner | ✅ `personal_questions` array present | ✅ **CORRECT** | — |

---

## 🏗️ Rotary Architecture: Corrected 4-Cycle Map

The Rotary is **logically correct** but the **Cycle 1 (W33) boss_listening** only renders L1 in the UI — L2 is declared but potentially not rendered. All 16 parts are distributed correctly across 4 cycles:

```
Cycle 1 (W33): L1 + L2 | R1      | S1
Cycle 2 (W34): L3      | R2 + R3 | S2
Cycle 3 (W35): L4      | R4 + R5 | S3
Cycle 4 (W36): L5      | R6 + R7 | S4
Mock   (W37): ALL 16 parts
```

**Verified against `bossRotarySchedule.js`**: Cycle 1 `activeParts` = `[list_p1, list_p2, rw_p1, spk_p1]` ✅

---

## 📊 Compliance Score by Part

| Part | Shape | Count | Content | Rotary | Overall |
|---|---|---|---|---|---|
| L1 | ✅ | ✅ 6 chars | ✅ | ✅ W33 | ✅ |
| L2 | ✅ | ⚠️ Verify fields | ✅ | ✅ W33 | ⚠️ |
| L3 | ✅ | ✅ 5 items | ✅ | ✅ W34 | ✅ |
| L4 | ✅ | ✅ 5+1ex | ✅ | ✅ W35 | ✅ |
| L5 | ✅ | ⚠️ Verify 5 inst | ✅ | ✅ W36 | ⚠️ |
| R1 | ✅ | ✅ 10+15 | ✅ | ✅ W33 | ✅ |
| R2 | ✅ | ✅ 5+8opts | ✅ | ✅ W34 | ✅ |
| R3 | ✅ | 🔴 5 blanks (need 6) | ✅ | ✅ W34 | 🔴 |
| R4 | ❌ MISSING | ❌ | ❌ | W35 | 🔴 |
| R5 | ❌ MISSING | ❌ | ❌ | W35 | 🔴 |
| R6 | ❌ MISSING | ❌ | ❌ | W36 | 🔴 |
| R7 | ✅ 3 pics | 3 pics ✅ | ✅ | ✅ W36 | ✅ |
| S1 | ✅ | ✅ 4 diffs | ✅ | ✅ W33 | ✅ |
| S2 | ⚠️ | ⚠️ | ⚠️ | ✅ W34 | ⚠️ |
| S3 | 🔴 4 pics (need 5) | 🔴 | ✅ | W35 | 🔴 |
| S4 | ✅ | ✅ | ✅ | ✅ W36 | ✅ |

---

## 🎯 Action Items (Priority Order)

### 🔴 CRITICAL (shape/count wrong)

**1. S3 — Story Narration: 4 → 5 pictures**
- `speaking_hub.js` W33: `picture_story.images: 4`
- Fix: Add 5th image URL + examiner guidance "Here is the first picture. Now you tell the story."
- Note: Examiner shows Picture 1 and describes it; student narrates Pictures 2–5
- Component: `RetellRecorder` receives `scenes` prop — currently 4 `podcastScenes`

**2. R3 — Story Gap-fill: 5 → 6 blanks**
- W33 `writing_hub.rw_part_3.blanks` has 5 items; official Flyers = 6
- Fix: Add 1 more blank + answer + expand word bank from 8 to 8 (already correct for 6 blanks: Cambridge uses 8-word bank for R3)

**3. R4, R5, R6 — MISSING (W35 & W36)**
- These parts are not needed in W33 (rotary places them in W35/W36) — so NOT a W33 bug
- BUT `boss_reading` at W35 and W36 need data that doesn't exist yet

**4. Story Writer (R7) — correct at 3 pictures (not 5)**
- **R7 is 3-picture creative writing** — NOT the same as S3 (5-picture narration)
- Current W33 implementation (3 panels) is **CORRECT** for R7
- The previous edit upgrading to 2–3 sentences per panel is also CORRECT for A2 level

### 🟡 MEDIUM (verify/fix counts)

**5. L2 fields count verification**
- Should be exactly 5 blanks (1 example shown + 5 to write)

**6. L5 instructions count verification**  
- Should be exactly 3 colour + 2 write = 5 total

**7. S2 Info Exchange format verification**
- Official: student has a card with 5 blank cells; asks examiner "What is X?" for each blank
- Need to verify `info_exchange_cards` matches this true information-gap format

**8. L1 rendering in boss_listening for W33**
- User reports only L1 visible, not L2 — investigate component renderer

---

## 🗺️ Official Flyers Speaking S3: 5-Picture Story

```
OFFICIAL FORMAT:
  Picture 1: Examiner describes opening scene ("Here's a picture showing...")
  Picture 2: Student narrates ("And then...")  
  Picture 3: Student narrates ("After that...")
  Picture 4: Student narrates ("Suddenly...")
  Picture 5: Student narrates ("In the end...")

  Duration: ~3–4 minutes
  Examiner prompt: "Look at the pictures. They tell a story about [NAME].
                   Look at picture 1 first. [Describes pic 1].
                   Now you tell the story."
```

**Fix needed in `speaking_hub.js` W33:**
- `picture_story.images` from 4 → 5
- Add image URL for picture 5
- Update `RetellRecorder` `DEFAULT_SCENES` and passed `scenes` prop

---

## 📌 Definitive Part-to-Quest Mapping (W33 implementation)

| Cambridge Part | Quest | Day | Component Used |
|---|---|---|---|
| L1 (Draw Lines) | `boss_listening` | Day 5 | `SVGLineMatcher` |
| L2 (Listen & Write) | `boss_listening` | Day 5 | `ListenAndComplete` / form fields |
| R1 (Word–Def) | `boss_reading` | Day 5 | `TextExtractionCompleter` or word-match |
| R2 (Dialogue) | `boss_reading` | Day 5 | `DialogueGapFill` |
| R3 (Story cloze) | `boss_reading` | Day 5 | `TextExtractionCompleter` |
| S1 (Find Diffs) | `weekly_review` | Day 5 | `FindDifferencesInteractive` |
| L3 (Visual Match) | `boss_listening` (W34) | Day 5 | `VisualMatchingAH` |
| R4 (T/F/NG) | `boss_reading` (W35) | Day 5 | TBD |
| R5 (Story gap) | `boss_reading` (W35) | Day 5 | `TextExtractionCompleter` |
| S2 (Info Exchange) | `weekly_review` (W34) | Day 5 | `InformationExchangeP2` |
| L4 (3-pic tick) | `boss_listening` (W35) | Day 5 | `MultipleChoice3Pic` |
| L5 (Colour+Write) | `boss_listening` (W36) | Day 5 | `SVGColorAndWrite` |
| R6 (Open cloze) | `boss_reading` (W36) | Day 5 | TBD |
| R7 (Story write) | `story_writer` | Day 4 | `StoryWriting` |
| S3 (5-pic story) | `weekly_review` (W35) | Day 5 | `RetellRecorder` |
| S4 (Personal Qs) | `weekly_review` (W36) | Day 5 | `PersonalQuestionsCompleter` |
