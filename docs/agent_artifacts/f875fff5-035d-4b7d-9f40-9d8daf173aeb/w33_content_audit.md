# 📋 W33 Content Audit — Cambridge Doctrine + CLIL + 3-Year Trajectory
**Evidence-based: mọi phát biểu đều traceable đến data file thực tế**
Date: 2026-09-01 | Method: `node -e` trực tiếp trên data files

---

## I. 🗂️ Blueprint Manifest W33

| Trường | Giá Trị [OBSERVED] | Đánh Giá |
|---|---|---|
| `week` | 33 | ✅ |
| `theme` | "Safety First at School & The Force of Friction" | ✅ |
| `cefr_level` | A2 Flyers | ✅ |
| `grammar_pattern` | Past Continuous vs. Past Simple with *while/when* | ✅ Chuẩn Flyers |
| `clil_topic` | "The Science of Friction & Floor Safety" | ✅ STEM Physics |
| `math_focus` | "Friction & Velocity Singapore Bar Models, 5 problems" | ✅ |
| `target_shields` | 3 (L1, R1, S1) | ✅ |
| `rotary_cycle` | 1 | ✅ |

---

## II. 📖 Cambridge Reading & Writing — 6 Parts Audit

### Part 1: Word Bank Matching
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Word bank = 15 từ | `word_bank.length = 15` | ✅ |
| Definitions = 10 items | `definitions.length = 10` | ✅ |
| Example item | `example: {text:"A quiet room filled with books...", target:"library"}` | ✅ |

### Part 2: Dialogue Completion (5 turns)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| 5 dialogue turns | `dialogue.length = 5` | ✅ |
| Options per gap | `options` key exists | ✅ |

### 🔴 Part 3: Story Gap-Fill (~120 words, 5 gaps)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Story ~120 words | **63 words** | 🔴 THIẾU ~47% |
| 5 gaps | **6 gaps** (index [0]–[5]) | 🟡 Lệch 1 |
| 3 title choices | 3 title options | ✅ |

**Evidence**: `story_text` = *"Jake was walking carefully down the school corridor after [0]_____ class. Suddenly, Tom ran past him very [1]_____. Tom didn't notice the wet [2]_____ on the floor and slipped heavily, hurting his knee. Jake stopped immediately and called the school [3]_____. The nurse arrived quickly with a clean [4]_____ and a cold pack. The headmaster gave both boys a safety [5]_____ during assembly."* → **63 words, cần ~120.**

### 🔴 Part 4: Grammar MCQ (10 independent questions A/B/C)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Format: 10 MCQs A/B/C | `rw_part_4.keys = ['instructions','story_text','example','blanks','gaps','title_options']` — đây là **story gap-fill format**, giống Part 3 | 🔴 SAI FORMAT |
| 10 questions | 5 blanks | 🔴 Thiếu 5 câu hỏi |

**Root cause**: `rw_part_4` bị implement như một bản sao format Part 3, không phải 10 câu MCQ độc lập với 3 lựa chọn (A/B/C) theo Cambridge Flyers Reading & Writing Part 4 thực tế.

### 🔴 Part 5: Long Story + 7 Completions (~250 words)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Story ~250 words | **121 words** | 🔴 THIẾU ~52% |
| 7 completion items | `summary_sentences.length = 7` | ✅ |
| 1-4 words per answer | `target: "science class"` | ✅ |

### Part 6: Open Cloze (5 gaps, 1 word each)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| 5 gaps (excl. example) | answers keys 1-5 = 5 gaps | ✅ |
| 1 word per gap | All single words: corridor, slipped, hurt, called, bandage | ✅ |
| Diary/letter format | "Jake's Diary: Tuesday" | ✅ |

### Part 7: Picture Story Writing (≥20 words, 3 images)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| 3 pictures | `panels.length = 3` (writing_hub.picture_story) | ✅ |
| min 20 words | `min_words = 20` | ✅ |
| Scaffold chips | `ordered_chips`, `frame_L1`, `sentence_frames` provided | ✅ |

---

## III. 🎧 Cambridge Listening — 5 Parts Audit

### Part 1: Draw the Lines
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| 5 names + 1 example | `names.length = 7` — có `"Mia the Monitor"` với `target_id: null` | 🟡 1 name thừa |
| 6 targets (5+example) | `targets.length = 6` | ✅ |
| x/y coordinates | All 6 targets have `{x, y}` | ✅ |
| Dialogue audio script | `passage_audio_script` present | ✅ |

### Part 2: Note Completion
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Man + Woman speakers | `required_speakers: ["man","woman"]` | ✅ |
| Form/note fields | `fields` key exists | ✅ |
| Full dialogue script | `dialogue_script` array present | ✅ |

### Part 3: Matching Letters
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Cambridge alignment | `cambridge_alignment: "EXACT"` | ✅ |
| H-L lettered cards | `cards` key exists | ✅ |
| 5 items + example | `items` key exists | ✅ |

### Part 4: 3-Option Tick Box (5 questions)
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Cambridge alignment | `cambridge_alignment: "ALIGNED"` | ✅ |
| 5 questions + example | `questions.length = 6` (incl. `isExample: true`) | ✅ |
| Audio format | Dialogue-based | ✅ |

### Part 5: Color and Write
| Tiêu Chí Flyers | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Color + write format | `"Nova: Listen and colour and write. There is one example."` | ✅ |
| Audio script | Examiner-guided with example | ✅ |

---

## IV. 🔬 CLIL Quality Audit

### CLIL Article: "The Science of Friction in Corridors"

| Tiêu Chí AGENTS.md Stage 1 | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Sentences ≤ 22 words | Max = **18 words/sentence** | ✅ |
| Avg sentence length | **10.8 words** | ✅ Excellent |
| B2/C1 banned words | **0 violations** | ✅ |
| STEM 3-step framework | Problem (wet floor) → Science (friction) → Result (rubber soles, warning signs) | ✅ |
| Critical thinking | *"Why is it more dangerous to run in socks on a wooden floor than wearing sports shoes?"* | ✅ |
| Grammar patterns | Present Simple (scientific principles) + Past Continuous (narrative) — regex provided | ✅ |
| Vocab focus collocations | 11 phrases: slippery layer, shoe soles, rubber soles, reduces friction... | ✅ |
| Context tie-in to story | Jake/Tom corridor incident directly referenced in CLIL | ✅ |

### Singapore Math (Math Quest — 5 Bar Model Problems)

| Tiêu Chí | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Problem count | `problems.length = 5` | ✅ |
| Bar model type | `type: "part_whole"` | ✅ |
| Context link to theme | *"Jake walked 40 meters. The corridor is 100 meters long. How many meters are left?"* | ✅ |

---

## V. 📝 Vocabulary CEFR Compliance

| Tiêu Chí | W33 [OBSERVED] | Kết Quả |
|---|---|---|
| Vocab count | 20 words | ✅ |
| Vietnamese diacritics | All present: hành lang, băng cá nhân, nhẹ nhõm, hành lang... | ✅ |

### Từ Cần Review Cấp Độ [6 từ — manual check]:

| Từ | Cambridge Flyers Core? | Risk | Quyết Định |
|---|---|---|---|
| `relieved` | ❌ Không có trong Starters/Movers/Flyers core | 🟡 B1 borderline | Giữ passive (story text), loại khỏi **active** vocab card |
| `clumsy` | ✅ Flyers | OK | Giữ |
| `terrible` | ✅ Flyers | OK | Giữ |
| `recover` | ❌ Không có trong Flyers core | 🟡 B1 | Thay bằng "get better" trong vocab card |
| `explain` | ✅ Movers | OK | Giữ |
| `accident` | ✅ Flyers | OK | Giữ |

---

## VI. 🗓️ 3-Year Trajectory Alignment Check

| Aspect | 3-Year Syllabus Spec | W33 Position | Kết Quả |
|---|---|---|---|
| Phase | Phase 1: Foundational Fluency (W1–42) | W33 = Cycle 1.3 "Procedural & Expository Writing" | ✅ |
| Grammar target | Past Simple narrative, procedural text | Past Continuous vs Past Simple + CLIL science report | ✅ |
| Writing type | Simple narrative + procedural paragraphs | Story Retell + Science Report + Picture Story | ✅ |
| Math integration | Phase 1: CLIL-embedded (no standalone Math block) | Singapore Math embedded in CLIL game | ✅ |
| Speaking confidence | Build basic production confidence | Voice Shadow + Story Retell + Info Exchange + Video Challenge | ✅ |
| CEFR stage | Pre-A1 → A2 Flyers (W1-72) | W33 = A2 Flyers | ✅ |

---

## VII. 🚨 Critical Issues Summary

### 🔴 CRITICAL — Must fix before Golden Freeze

| ID | Issue | Evidence | File |
|---|---|---|---|
| **C1** | R&W Part 3 story only 63 words (need ~120) | `story_text word count = 63` | `reading_hub.js → reading_part3_story` |
| **C2** | R&W Part 4 uses WRONG format (story gap-fill, not 10 MCQs A/B/C) | `rw_part_4.keys = ['story_text','blanks','gaps']` | `reading_hub.js → rw_part_4` |
| **C3** | R&W Part 5 story only 121 words (need ~250) | `story paragraphs word count = 121` | `reading_hub.js → rw_part_5` |

### 🟡 HIGH — Fix before W34 pipeline runs

| ID | Issue | Evidence | Fix |
|---|---|---|---|
| **H1** | L-P1: "Mia the Monitor" extra name with `target_id: null` | `names[6].target_id = null` | Remove or assign target |
| **H2** | `relieved` may be above A2 active vocab | Not in Flyers core list | Demote to passive |
| **H3** | `recover` likely B1 active vocab | Not in Flyers core list | Replace with "get better" |

### 🟢 LOW — Nice to have

| ID | Issue | Fix |
|---|---|---|
| **L1** | `blueprint.json → tested_skills` only has 3 items (listening only) | Add reading, writing, speaking |
| **L2** | `blueprint.json → grammar_pattern` has regex but no example sentences | Add 2-3 ví dụ mẫu câu |

---

## VIII. ✅ Điểm Sáng Cần Bảo Toàn

1. ✅ CLIL article: 0 banned words, avg 10.8 words/sentence
2. ✅ 20 vocab words với Vietnamese diacritics đầy đủ
3. ✅ R&W Parts 1, 2, 6 — đúng format và đúng count
4. ✅ Listening Parts 3, 4, 5 — đúng Cambridge structure
5. ✅ Singapore Math 5 problems với context corridor tie-in
6. ✅ Story Writer P7 có 3 panels, min 20 words, đủ scaffold
7. ✅ Grammar focus (Past Continuous + while/when) đúng Phase 1 Cycle 1.3 trajectory
