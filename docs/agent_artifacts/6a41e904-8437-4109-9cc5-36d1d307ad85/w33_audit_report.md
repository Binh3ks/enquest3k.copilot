# 🔍 W33 Audit Report + Implementation Plan

> Generated: 2026-08-26 | Status: Awaiting Execution

---

## Root-Cause Summary

| # | Vấn đề | File | Severity |
|---|--------|------|----------|
| 1 | CLIL Fact Finder: `check_questions` chỉ có 3 câu (không phải 5), và `rw_part1.word_bank` chứa `"handrail"` vi phạm A2 Flyers | `reading_hub.js` | 🔴 HIGH |
| 2 | MathQuest: `svg_url` fallback mặc định trỏ đến `week34` thay vì `week33` — khi `barModelData` từ `skill_practice_hub` không có `svg_url` field thì render sai SVG | `BarModelQuest.jsx` | 🟡 MEDIUM |
| 3 | Story Writer: Scene 2 thiếu connector trong `steps[1]` gắn cứng, Scene 3 keywords không đủ phong phú để học sinh tự ghép ≥20 từ | `writing_hub.js` | 🟡 MEDIUM |
| 4 | Info Exchange: `info_exchange_cards.candidate_card.fields` dùng format `label/value` thay vì Wh-question cards chuẩn Flyers | `speaking_hub.js` | 🔴 HIGH |
| 5 | L1 Draw a Line: `x, y` dùng tọa độ tuyệt đối pixel → lệch khi resize; audio script thiếu example exchange đầu file | `listening_hub.js` + audio | 🟡 MEDIUM |
| 6 | L3 Visual Matching: Item 1 = `"School Handrail"` — từ vi phạm A2 Flyers; card A cũng ghi `"School Handrail"` | `listening_hub.js` | 🔴 HIGH |

---

## ISSUE 1 — CLIL Fact Finder & `handrail` A2 Violation

### Thực trạng
- `clil_article.check_questions` = **3 câu** (INV-CLIL kiểm tra `≥ 3` → đã pass Gate 17, nhưng UI Fact Finder ở giao diện thực cần **5 câu** đúng format với `id, question_en, options[], answer`)
- `rw_part1.word_bank` chứa `"handrail"` — **KHÔNG CÓ** trong Cambridge A2 Flyers Wordlist
- Definition 8: `"You hold onto this long metal bar..."` → target `"handrail"` cũng phải xóa

### Fix
**`reading_hub.js`**:
1. Thêm 2 câu hỏi `check_questions` để có đủ 5 MCQ (format: `id, question_en, options[], answer`)
2. Xóa `"handrail"` khỏi `word_bank` → thay bằng `"stairs"` (đã có trong Flyers Wordlist)
3. Xóa definition id=8 về `"handrail"` → thay bằng definition về `"stairs"` (các bậc thang)

---

## ISSUE 2 — MathQuest Early Completion Bug

### Thực trạng
- `BarModelQuest.jsx` line 122: `svg_url` fallback = `/images/week34/barmodel_w34_adv_p${idx+1}.svg`
- `skill_practice_hub.js` W33 singapore_math entries có `bar_model_svg` field (đúng W33 paths), nhưng trong `questions` mapping (line 122), code check `q.svg_url || q.bar_model_svg` → **`bar_model_svg` được check đúng**
- Nguyên nhân thực sự loop bug: `BarModelQuest` dùng **hardcoded fallback 5 questions** `WEEK33_BAR_QUESTIONS` (line 1-99 của file). Khi `barModelData` null/empty → load 5 hardcoded questions OK. Nhưng khi load từ `skill_practice_hub.singapore_math` với 5 items → `correctAnswer` field mapping:
  - `correctAnswer: q.correctAnswer || q.answer_value || parseInt(q.answer) || 10`
  - `skill_practice_hub.singapore_math[0]` chỉ có `answer_value`, không có `correctAnswer` → **`q.correctAnswer` = undefined**, `q.answer_value` = 60 → đúng
  - Vậy math đúng. Lỗi loop **1/5 → gameover** có thể do timer (90s) expire khi render SVG lỗi 404 → `finishGame()` được gọi sớm
- Fix: Tăng timer lên 180s và fix svg_url fallback trỏ đúng week number

### Fix
**`BarModelQuest.jsx`**:
1. Line 122: Đổi fallback `week34` → dynamic `week${weekNumber}`
2. Line 109: `setTimeLeft(90)` → `setTimeLeft(180)` (18s/câu × 10 câu padding)

---

## ISSUE 3 — Story Writer Connectivity

### Thực trạng
`picture_story.steps[1]` (Scene 2) có `connectors: ["Then", "Suddenly", "After that"]` nhưng không có `locked_connector` — UI chỉ hiện chips mà không context connector rõ ràng. Scene 3 `keywords` chỉ có 4 từ → học sinh khó ghép ≥20 từ.

### Fix
**`writing_hub.js`**:
1. Scene 2: Thêm `locked_connector: "Then,"` để anchor connector
2. Scene 3: Mở rộng `keywords` lên 6 từ, thêm `sentence_frame` scaffolding

---

## ISSUE 4 — Info Exchange Wrong Format

### Thực trạng
```js
// HIỆN TẠI (SAI) — label-value format
candidate_card.fields = [
  { label: "Location", value: "School Corridor", known: true },
  { label: "Injured Body Part", value: null, known: false },  // Student phải hỏi
  ...
]
```
Cambridge Flyers Speaking P2 chuẩn: Candidate nhận **thẻ gợi ý Wh-question** để HỎI examiner.

```
// ĐÚNG CHUẨN FLYERS
Candidate Card shows:
  ✓ Known: Location = School Corridor  
  ? Unknown → "Where - accident ?"  ← Wh-question prompt để hỏi
```

### Fix
**`speaking_hub.js`** → Cấu trúc lại `info_exchange_cards` thành format chuẩn Flyers:
- `candidate_card.known_info[]`: Thông tin candidate đã biết
- `candidate_card.questions_to_ask[]`: Wh-question cards dạng `{ wh: "Where", topic: "accident" }`
- `examiner_card.known_info[]`: Thông tin examiner đã biết  
- `examiner_card.questions_to_ask[]`: Wh-question cards

---

## ISSUE 5 — L1 Pin Coordinates Responsive Fix

### Thực trạng
`listening_hub.js` L1 targets dùng `x, y` percent (31%, 66%...) — về nguyên tắc đã là relative. Nhưng `SVGLineMatcher.jsx` cần dùng `masterContainerRef` để normalize → pin lệch khi container width thay đổi.

### Fix — Data (không sửa component frozen)
Hiệu chỉnh lại tọa độ `x, y` cho từng target dựa trên vị trí **thực tế** của nhân vật trong ảnh W33 (theo calibration pipeline):

| Name | isExample | x (%) | y (%) | Ghi chú |
|------|-----------|--------|--------|---------|
| Jake | ✓ | 31 | 66 | Left side boy |
| Tom | - | 52 | 60 | Center falling |
| Sarah | - | 68 | 55 | Right nurse |
| Mr Brown | - | 21 | 35 | Top-left teacher |
| Bob | - | 75 | 72 | Bottom-right student |
| David | - | 43 | 28 | Top-center headmaster |

Audio: Script hiện tại trong `passage_audio_script` đã có example exchange (Jake lines) → Nếu audio file `/audio/week33/listening_p1_full.mp3` không có example, phải note để regenerate.

---

## ISSUE 6 — L3 "School Handrail" Non-Flyers Violation

### Thực trạng
- `items[0].name = "School Handrail"` → vi phạm A2 Flyers (handrail không trong Wordlist)
- `cards[0].name = "School Handrail"` → phải đồng bộ
- Audio file `listening_p3_item1.mp3` nói về "Handrail" → **audio cần regenerate**

### Fix
Cambridge A2 Flyers chuẩn: L3 "Where are the things?" — Dùng đồ vật thông thường trong trường học.
Thay `"School Handrail"` → **`"Stair Steps"`** hoặc tốt hơn: **`"School Stairs"`** (stairs = từ chuẩn A2 Flyers).

**`listening_hub.js`**:
- `items[0].name` = `"School Stairs"`
- `cards[0].name` = `"School Stairs"`, `cards[0].location_name` = `"Corridor Corner"`
- Audio script P3 item 1 phải được viết lại → user/admin cần regenerate MP3

---

## Files to Modify

| File | Changes |
|------|---------|
| [`reading_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/reading_hub.js) | CLIL +2 questions; rw_part1 xóa handrail → stairs |
| [`speaking_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/speaking_hub.js) | info_exchange_cards → Wh-question format |
| [`listening_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/listening_hub.js) | L3 items[0] & cards[0]: "Handrail" → "School Stairs" |
| [`BarModelQuest.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/BarModelQuest.jsx) | svg_url fallback: week34 → week${weekNumber}; timer 90→180s |
| [`writing_hub.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/writing_hub.js) | Scene 2 locked_connector; Scene 3 keywords expansion |

## ⚠️ Items Requiring Human Action (Audio Regeneration)

> [!IMPORTANT]
> Các file audio sau cần regenerate bằng GCP TTS sau khi data fix:
> - `/audio/week33/listening_p3_item1.mp3` — Nội dung cũ: "School Handrail" → mới: "School Stairs"
> - `/audio/week33/listening_p1_full.mp3` — Xác nhận example exchange đã được include ngay đầu file
> - `/audio/week33/listening_p3_full.mp3` — Nếu có file full, phải regenerate sau khi sửa items

Reviewer có thể APPROVE để agent tiến hành sửa code (không sửa audio file — chỉ update data).
