# EngQuest3K — Week Content Pipeline SOP (W33+)
**Schema Version**: 2.1 | **Effective from**: W33 | **Updated**: 2026-08-26
**Single Source of Truth**: AGENTS.md §🏰 Master 15-Task Architecture Invariant

---

## ⚖️ CRITICAL GOVERNANCE PRINCIPLES (Read First — Non-Negotiable)

### TWO-LEVEL REVIEW SYSTEM

W33+ content is reviewed at **two separate levels**. These levels MUST NOT be confused.

**Level A — Learning & Practice Content (Quest 1–4)**
- Quests 1–4 are learning/practice quests. They develop the 3-year syllabus.
- They **DO NOT** need to reproduce the exact Cambridge Flyers exam format.
- They must be: Cambridge-aligned, age-appropriate (A2), CEFR-compliant, pedagogically sound,
  communicatively valid, and supportive of CLIL English-medium learning.
- A practice task CAN be structurally different from the exam and still be **fully valid**.

**Level B — Flyers Shields (Quest 5)**
- Shields are the assessment units. Exact Cambridge Flyers mechanics are **mandatory**.
- Number of examples, scored items, distractor rules, interaction model, audio structure —
  all must match the Cambridge doctrine in `schemas/cambridge-flyers-fidelity-doctrine.schema.json`.

> ⚠️ **"Cambridge-aligned practice does not mean every practice task must replicate the Cambridge exam format."**
>
> ⚠️ **"Exact Cambridge Flyers format is mandatory for active Flyers Shields and the full Mock Test."**

### VALIDATION GATES ARE INDEPENDENT

A PASS on one gate does NOT imply a PASS on any other gate:

| Gate | What it validates |
|------|------------------|
| Gate A | Learning Practice Quality (Level A) |
| Gate B | Cambridge Alignment |
| Gate C | Flyers Shield Fidelity (Level B) |
| Gate D | Wordlist / Vocabulary Governance |
| Gate E | CLIL / Domain Accuracy |
| Gate F | Runtime / Schema Integrity |
| Gate G | Asset / Audio / Data Parity |
| Gate H | Visual QA |

CEFR PASS ≠ Flyers Shield PASS. Wordlist PASS ≠ Cambridge Mechanics PASS.

### CLIL / DOMAIN TERMINOLOGY GOVERNANCE

CLIL-specific science/topic terms (e.g., `friction`, `surface`, `tiles`, `grip`) are NOT
core learner vocabulary — they are domain terms explicitly approved for a specific week's
CLIL topic. They must be:
- Listed in the week's `clil_article.vocab_focus[]`
- NOT treated as silent wordlist passes
- NOT rejected as "B2+ jargon" if they are genuine A2 CLIL concepts
- Pedagogically justified by the CLIL lesson context

### WORDLIST GOVERNANCE — 5 REGISTERS

Do NOT merge all wordlists into one undifferentiated set. Maintain 5 registers:

| Register | Source | Validator action |
|----------|---------|-----------------|
| Core Flyers A2 | `flyers_a2.json` + `movers_a1.json` + `starters_pre_a1.json` | PASS |
| Function words | Grammar, pronouns, auxiliaries | PASS always |
| Proper names | Character names, week-specific places | PASS (explicit list) |
| CLIL domain terms | Week's `clil_article.vocab_focus[]` | PASS if on approved list |
| KET extension | `ket_a2.json` words NOT in Flyers/Movers/Starters | **WARN** — not a silent PASS |

> KET vocabulary is NOT a silent fallback for core Flyers A2. KET-only words trigger a WARN,
> not a PASS, in the vocabulary gate. Do NOT use KET to expand core learner vocabulary silently.

### RUNTIME REACHABILITY RULE

The mere existence of Shield data in a week's hub files does NOT mean it is active in Quest 5.
A Shield is active ONLY if `bossRotarySchedule.js` includes its ID in `testedSkills[cycleNumber]`
for that week. Non-active data is valid **future rotation material** — NOT a bug.

Do NOT treat extra Shield data in a hub file as a rotation violation unless it is reachable
from the active Quest 5 runtime for that week's cycle.

### WEEK 5 MOCK TEST — SEPARATE FROM WEEKLY ROTATION

Every 5th week (W37, W42, W47, W52…) is a Full Cambridge A2 Flyers Mock Exam.
The Mock Test:
- Is NOT a Shield rotation week
- Must cover all 16 Cambridge Flyers parts (L1–L5, R&W P1–P7, Speaking P1–P4)
- Must follow real exam timing per Cambridge specification
- Corresponds to `cycleNumber === 5` / `cycleKey === 0` in `bossRotarySchedule.js`

---

## KIẾN TRÚC NỀN TẢNG (Đọc trước khi làm bất cứ điều gì)

### A. 5 Hub Files — Toàn bộ nội dung tuần

| File | Zone | Nội dung chính |
|------|------|----------------|
| `reading_hub.js` | Zone 1 & 4 | `clil_article` (Fact Finder), `story_scenes[]` (Webtoon), `rw_part1`–`rw_part6` (Boss) |
| `listening_hub.js` | Zone 2 & 4 | `listening_p1`–`listening_p5` (L1-L5 Cambridge) |
| `writing_hub.js` | Zone 3 & 4 | `picture_story{}` (Story Writer P7), `rw_part7{}` (Boss) |
| `speaking_hub.js` | Zone 3 & 4 | `info_exchange_cards{}`, `picture_story{}` (S3), `personal_questions{}`, `find_differences{}` (S1) |
| `skill_practice_hub.js` | Zone 2 | `dictation[]`, `grammar_drills[]`, `singapore_math[]`, `science_lab{}` |

> ❌ CẤM TUYỆT ĐỐI: `weekNN_real.js`, `weekNN_easy_real.js`, `story_missions`, `spark_talk`,
> `target_vocab`, `explore.js`, `logic_lab.js`, `daily_watch.js` — ĐÃ XÓA TỪ W33+.

---

### B. 15 Quests — Gamification Layer Hàng Tuần

| Day | Quest ID | Label | Data Source |
|-----|----------|-------|-------------|
| 1 | `gear1_webtoon` | Scene Explorer | `reading_hub.story_scenes[]` |
| 1 | `gear2_karaoke` | Voice Shadow | `reading_hub.story_scenes[].audio_script` |
| 1 | `gear3_retell` | Story Retell | `reading_hub.clil_article` |
| 2 | `gear4_clil` | Fact Finder | `reading_hub.clil_article.check_questions[]` (5 MCQ bắt buộc) |
| 2 | `science_lab` | Action Lab | `skill_practice_hub.science_lab{}` |
| 2 | `science_report` | Discovery Report | `reading_hub.clil_article` + `writing_hub` |
| 3 | `word_blitz` | Speed Match | vocab |
| 3 | `sentence_smash` | Grammar Duel | `skill_practice_hub.grammar_drills[]` |
| 3 | `math_quest` | Math Quest | `skill_practice_hub.singapore_math[]` |
| 4 | `story_writer` | Story Writer | `writing_hub.picture_story{}` |
| 4 | `broadcast_studio` | Video Challenge | `speaking_hub.talkshow_video{}` |
| 4 | `info_exchange` | Info Exchange | `speaking_hub.info_exchange_cards{}` |
| 5 | `boss_listening` | Listening Shield | **→ xem §C Rotary** |
| 5 | `boss_reading` | R&W Shield | **→ xem §C Rotary** |
| 5 | `weekly_review` | Speaking & Passport | **→ xem §C Rotary** |

> ⚠️ 15 Quests ≠ Cambridge Shields.  
> 15 Quests = gamification tasks học sinh làm hàng ngày.  
> Cambridge Shields = format bài thi Cambridge được **xoay tua** 4+1 tuần (chỉ xuất hiện Day 5).

---

### C. Boss Rotary Schedule — Bắt buộc tra cứu TRƯỚC khi viết Boss data

```js
// LUÔN chạy dòng này đầu tiên khi bắt đầu tuần mới
import { getBossRotaryConfig } from 'src/config/bossRotarySchedule.js';
const { cycleNumber, testedSkills, shieldCount } = getBossRotaryConfig(weekNumber);
// → Chỉ sinh data cho testedSkills của cycleNumber này
```

| Cycle | Tuần (W33+) | Boss data cần sinh | Cambridge Parts |
|-------|-------------|-------------------|----------------|
| **1** | W33, W38, W43… | `listening_p1`, `listening_p2`, `listening_p3` | L P1, P2, P3 |
| **2** | W34, W39, W44… | `listening_p4`, `listening_p5`, `rw_p1`, `speaking_p1` | L P4, P5; R&W P1; S P1 |
| **3** | W35, W40, W45… | `rw_p2`, `rw_p3`, `rw_p4`, `rw_p5` | R&W P2, P3, P4, P5 |
| **4** | W36, W41, W46… | `rw_p6`, `rw_p7`, `speaking_p2`, `speaking_p3`, `speaking_p4` | R&W P6, P7; S P2, P3, P4 |
| **5** | W37, W42, W47… | ALL 16 Cambridge parts (Full Mock Exam) | All L/R&W/S |

> Total across Cycles 1–4: 16 unique Cambridge Flyers parts (L1–L5 + R&W P1–P7 + Speaking P1–P4).
>
> ❌ CẤM sinh data cho Shield không thuộc `testedSkills[cycleNumber]`.

---

## PIPELINE 5 PHASES

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4
(Setup)  (Syllabus) (DATA)   (ASSETS)  (Gates)
                    ↑viết text  ↑sinh audio/ảnh từ text Phase 2
```

---

### PHASE 0 — Setup & Rotary Lookup (5 phút)

```bash
# 1. Xác định tuần và chu kỳ Boss
node -e "
import('./src/config/bossRotarySchedule.js').then(m => {
  console.log(JSON.stringify(m.getBossRotaryConfig(NN), null, 2));
});
"
```

Ghi vào `docs/weekNN_build_manifest.md`:
- Cycle: X | testedSkills: `[list]` | shieldCount: N

---

### PHASE 1 — Syllabus Extraction (10 phút)

Đọc Syllabus gốc, extract:
- **Theme** (e.g. "Corridor Safety & Friction")
- **Vocabulary** — chỉ từ Cambridge A2 Flyers Wordlist
- **Grammar Focus** (e.g. Past Simple / Past Progressive)
- **STEM Topic** (cho `clil_article` + `science_lab`)
- **3 Story Panels** (cho `writing_hub.picture_story`)

> ❌ CẤM bịa từ ngoài Wordlist. Kiểm tra: `node scripts/check_flyers_wordlist.mjs <word>`

---

### PHASE 2 — DATA AUTHORING: Viết nội dung 5 Hubs

> **PHASE NÀY VIẾT TEXT/JSON/SCRIPT — KHÔNG SINH AUDIO HAY HÌNH Ở ĐÂY.**
> Audio cần text source trước. Hình cần context trước. Không thể đảo ngược.

#### 2A. `reading_hub.js`

**Hàng tuần (bắt buộc):**
- `clil_article`: `title_en/vi`, `content_en` (~180w, A2), **`check_questions[]` đúng 5 MCQ** (field: `question_en`, `options[]`, `answer`), `vocab_focus[]`
- `story_scenes[]`: 3 scenes, mỗi scene: `text_en`, `bold_chunks[]` (ESL chunking), `audio_script`

**Boss data (chỉ nếu `testedSkills` bao gồm `rw_pX`):**
- `rw_part1{}`: `word_bank[15]` (không trùng lặp, không dùng từ ngoài Wordlist), `definitions[10]`
- `rw_part2{}`: `dialogue[]` (5 turns, 8 option distractors)
- `rw_part3{}`: `story_text`, `title_options[4]`, `gap_fill[7]`
- `rw_part4{}`: `grammar_mcq[10]`
- `rw_part5{}`: `long_story`, `comprehension[7]` (1-4 words each)
- `rw_part6{}`: `open_cloze_text`, `gaps[5]`

**CLIL Invariants:**
- `check_questions[]` PHẢI có field `question_en` (component đọc: `q.question || q.question_en || q.prompt`)
- Mọi label/term trong Action Lab PHẢI khớp với `vocab_focus[]` của `clil_article` — cùng chủ đề

#### 2B. `listening_hub.js`

**L1 (`listening_p1{}`):**
- `image_url` (1264×848 scene)
- `passage_audio_script` — Cambridge format bắt buộc:
  ```
  [Teacher intro] → [Example exchange: 2 người nhận ra nhân vật Example]
  → "Can you see the example line? Now you listen and draw lines."
  → [5 exchange pairs cho 5 items]
  ```
- `names[]`: 6 tên + 1 distractor, `isExample: true` cho ví dụ
- `targets[]`: 6 pins với `x, y` phần trăm **phân tán đủ xa** (min 8% cách nhau) trên image 1264×848

**L3 (`listening_p3{}`):**
- `example{}`: `name`, `target_letter` (distractor H/G/F)
- `items[]`: 5 items, `name` PHẢI **khớp chính xác** với `cards[].name` tương ứng (không có `location_name`)
- `cards[]`: 8 cards A-H, CHỈ có `letter`, `name`, `image_url` — **KHÔNG dùng `location_name`** (component dùng `card.location_name || card.name`, nếu có `location_name` sẽ override gây mismatch)

**L4 & L5:** Chỉ sinh nếu `cycleNumber === 2`

#### 2C. `writing_hub.js`

- `picture_story{}`: 3 `steps[]`:
  - Scene 1 (MODEL): `locked_connector`, `ordered_chips[]`, `pills[]`
  - Scene 2 (BUILD): `locked_connector`, `display_chips[]`, `correct_order[]`, `pills[]`
  - Scene 3 (WRITE): `locked_connector`, **`keywords[]` ≥ 8 items bao gồm ĐỘNG TỪ QUÁ KHỨ** (e.g. `"washed the wound"`, `"put on a bandage"`), `sentence_frame`
- Boss `rw_part7{}`: Chỉ sinh nếu `cycleNumber === 4`

#### 2D. `speaking_hub.js`

- `info_exchange_cards{}`:
  - `candidate_card.items[]`: 4 items, format `{ label: "Where — accident?", value: "..." }`
  - `examiner_card.items[]`: 4 items cùng format
  - **Không dùng `fields[]`** (schema cũ)
- `picture_story{}` (S3): `images[]` (4 panels)
- `find_differences{}`: Chỉ sinh nếu `cycleNumber === 2`

#### 2E. `skill_practice_hub.js`

- `dictation[]`: 5 câu, A2 level
- `grammar_drills[]`: 5 bài
- `singapore_math[]`: 5 bài, `svg_url: '/images/weekNN/barmodel_wNN_adv_pX.svg'`
- `science_lab{}`:
  - `targets[]`: 4 vùng, tên A2 đơn giản (ví dụ: `"Wet Tiles"`, `"Rubber Shoes"`)
  - `labels[]`: 4 nhãn, ngôn ngữ A2 (KHÔNG dùng B2+ như `"Physical Balance & Stability Aid"`)
  - Tất cả concepts PHẢI từ `clil_article.vocab_focus[]`

**Gate 2 — Pre-Asset:**
```bash
node scripts/cefr_curriculum_guard.mjs NN   # 0 violations
node scripts/audit_chunks.js NN              # 0 chunking errors
grep -rn "handrail\|lubricant\|predominantly\|mechanism\|sterile" src/data/weeks/weekNN/ # → ZERO
```

---

### PHASE 3 — ASSET GENERATION: Sinh Audio & Hình ảnh

> **Dùng script/text từ Phase 2. Không tự bịa.**

#### 3A. Audio — Cambridge Format Bắt buộc

```bash
node scripts/regenerate_w33_listening_audio.mjs  # Hoặc script tương đương cho tuần khác
```

**L1 Full Audio Structure (BẮT BUỘC):**
```
[Teacher intro] + [Example exchange] + "Can you see the example line? Now listen and draw lines."
+ [Item pairs 1-5, mỗi item cách nhau bằng pause]
```

**L3 Full Audio Structure (BẮT BUỘC):**
```
[Intro: "Listen and write a letter..."] + [Example exchange → "letter H in the box? That is the example."]
+ [5 item exchanges]
```

Files bắt buộc per week (Cycle 1):
- `listening_p1_full.mp3` — Journey-F, include Example exchange
- `listening_p2_full.mp3` — Neural2-D + Journey-F, include Example field
- `listening_p3_example.mp3` + `listening_p3_item1-5.mp3` + `listening_p3_full.mp3`
- `listening_p4_full.mp3` + `p4_q1-5.mp3` (Cycle 2 only)
- `listening_p5_full.mp3` + `p5_inst1-5.mp3` (Cycle 2 only)
- `dictation_1-5.mp3`

#### 3B. Images

```bash
# Bar models (SVG, không phải PNG)
node scripts/generate_barmodels_weekNN.mjs
# Output: public/images/weekNN/barmodel_wNN_adv_p1-5.svg

# Story panels
node scripts/generate_week_images.mjs NN
# Output: public/images/weekNN/writing_panel_1-3.png
```

---

### PHASE 4 — GATES (Không skip, không thương tiếc)

```bash
# Gate 15 — CEFR + Audit
npm run audit:week NN               # 0 errors
node scripts/cefr_curriculum_guard.mjs NN  # 0 violations

# Gate 17 — Cambridge Fidelity Doctrine
node scripts/gate17_fidelity_doctrine.mjs NN
# Expect: "finalVerdict": "PASS", "failReasons": []

# Gate B — Build
npm run build                       # exit code 0

# Manual spot-check
# - L1: Pins hiển thị đúng nhân vật, không chồng lên nhau
# - L3: Item names (left) khớp với Card names (right)
# - CLIL: Question text hiển thị (không chỉ Options)
# - Story Writer Scene 3: keywords có động từ quá khứ
```

**Multi-Agent Review Report bắt buộc:**
```
## 📋 Review Report — Week NN
### 🔴 CRITICAL BUGS (crashes / wrong scores)
### 🟡 HIGH RISKS (cheating loopholes / data pollution)  
### ✅ PASSED
```
Push chỉ khi 0 CRITICAL BUGS.

---

## Quy Tắc Bất Biến (Không Bao Giờ Vi Phạm)

1. **Phase 2 TRƯỚC Phase 3** — Không có audio script → không có audio
2. **Rotary Lookup TRƯỚC Boss data** — Chỉ sinh Shield thuộc `testedSkills[cycleNumber]`
3. **15 Quests ≠ Cambridge Shields** — Quests = daily gamification; Shields = Day 5 Cambridge exam format
4. **5 Hubs là tất cả** — Không tạo file data ngoài 5 hubs
5. **`check_questions[]` luôn có `question_en`** — Component fallback: `q.question || q.question_en || q.prompt`
6. **L3 cards không có `location_name`** — Sẽ override `name` và gây mismatch UI
7. **Story Writer Scene 3 phải có động từ quá khứ** — `"washed the wound"`, `"put on a bandage"`, etc.
8. **L1 pins cách nhau ≥ 8%** — Tránh overlap trên mọi màn hình
9. **Action Lab vocab từ `clil_article.vocab_focus[]`** — Không dùng B2+ terms
10. **Vocabulary Gate** — `grep -rn "handrail\|lubricant\|predominantly" src/data/weeks/weekNN/` → ZERO
11. **Quest 1–4 KHÔNG yêu cầu exact Cambridge exam format** — Chỉ cần Cambridge-aligned & pedagogically valid (Level A)
12. **Quest 5 Shields BẮT BUỘC exact Cambridge Flyers format** — Gate17 PHẢI PASS trước khi push (Level B)
13. **CLIL domain terms phải có trong `clil_article.vocab_focus[]`** — Không hardcode vào function whitelist
14. **KET là WARN không phải PASS** — KET-only words không được tính là core Flyers A2 vocabulary
15. **Extra Shield data trong hub ≠ active Shield** — Chỉ `testedSkills[cycleNumber]` mới là active Quest 5 Shields
16. **Week 5 Mock = 16 Cambridge parts** — Khác hoàn toàn với weekly Shield rotation, có full timing
