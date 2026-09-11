# Báo Cáo Việc YY — Unanswerable Distractors
**Ngày:** 2026-09-11 | **Commit:** `d231cb11`

## Vấn Đề Gốc

Trước khi sửa, hầu như 100% distractor vi phạm quy tắc — chúng hỏi về thông tin ĐÃ CÓ trong câu.

**Ví dụ điển hình (W34, câu 1):**
```
Sentence: "On a warm afternoon, the mighty lion was sleeping peacefully under the trees."
Thông tin CÓ: WHEN + WHERE + WHAT

❌ Distractor 1: "Where was the mighty lion sleeping?" → CÓ ĐÁP ÁN (under the trees)
❌ Distractor 2: "When was the mighty lion sleeping?" → CÓ ĐÁP ÁN (on a warm afternoon)
```
Cả 3 options đều có đáp án trong câu → bài thi vô nghĩa.

## Quy Tắc Mới
```
✅ Correct  → Hỏi thông tin EXPLICITLY có trong câu (1/3)
❌ Distract1 → Hỏi thông tin KHÔNG có trong câu (2/3)
❌ Distract2 → Hỏi thông tin KHÔNG có trong câu (2/3)
```

## Bảng Audit — WEEK_33

| ID | Thông tin CÓ | Option | Text | Đáp án trong câu? |
|---|---|---|---|---|
| w33_wh_1 | WHO+WHAT+WHERE+WHEN | ✅ Correct | What was Jake doing in the corridor? | **CÓ** |
| | | ❌ D1 | Where was Jake going **after** the corridor? | **KHÔNG** |
| | | ❌ D2 | Why was Jake walking so carefully? | **KHÔNG** |
| w33_wh_2 | WHEN+WHO+WHAT | ✅ Correct | What happened suddenly? | **CÓ** |
| | | ❌ D1 | Who warned him about the wet floor? | **KHÔNG** |
| | | ❌ D2 | How long did he stay on the floor after slipping? | **KHÔNG** |
| w33_wh_3 | WHO+WHEN+WHAT | ✅ Correct | What did Jake do immediately? | **CÓ** |
| | | ❌ D1 | What was his friend's name? | **KHÔNG** |
| | | ❌ D2 | Where was the school nurse's office? | **KHÔNG** |
| w33_wh_4 | WHO+HOW+WHAT+WHY | ✅ Correct | What did the nurse bring to the corridor? | **CÓ** |
| | | ❌ D1 | Where was the cut on the student's body? | **KHÔNG** |
| | | ❌ D2 | How did the nurse hear about the accident? | **KHÔNG** |
| w33_wh_5 | WHO+WHAT | ✅ Correct | What did the headmaster remind everyone about? | **CÓ** |
| | | ❌ D1 | Why did everyone feel relieved? | **KHÔNG** |
| | | ❌ D2 | Where did the headmaster speak to the students? | **KHÔNG** |

## Bảng Audit — WEEK_34

| ID | Thông tin CÓ | Option | Text | Đáp án trong câu? |
|---|---|---|---|---|
| w34_wh_1 | WHEN+WHO+WHAT+WHERE | ✅ Correct | What was the mighty lion doing on the warm afternoon? | **CÓ** |
| | | ❌ D1 | Why was the mighty lion sleeping so deeply? | **KHÔNG** |
| | | ❌ D2 | How long had the mighty lion been sleeping? | **KHÔNG** |
| w34_wh_2 | WHO-ran+WHERE | ✅ Correct | What ran across the lion's big front paw? | **CÓ** |
| | | ❌ D1 | Why was the tiny mouse running so fast? | **KHÔNG** |
| | | ❌ D2 | Where was the tiny mouse trying to go? | **KHÔNG** |
| w34_wh_3 | WHO+WHAT | ✅ Correct | What did the mouse promise to do? | **CÓ** |
| | | ❌ D1 | How did the mouse plan to help the lion? | **KHÔNG** |
| | | ❌ D2 | Where did the mouse hide after the lion let him go? | **KHÔNG** |
| w34_wh_4 | WHEN+WHO+WHOM+WHAT-with | ✅ Correct | Who trapped the lion in a strong net? | **CÓ** |
| | | ❌ D1 | How many hunters set the trap for the lion? | **KHÔNG** |
| | | ❌ D2 | Where did the hunters go after trapping the lion? | **KHÔNG** |
| w34_wh_5 | WHO+HOW+OUTCOME | ✅ Correct | How did the little mouse set the lion free? | **CÓ** |
| | | ❌ D1 | How long did it take the mouse to chew through the ropes? | **KHÔNG** |
| | | ❌ D2 | Where did the lion run after being set free? | **KHÔNG** |

## Bảng Audit — WEEK_35

| ID | Thông tin CÓ | Option | Text | Đáp án trong câu? |
|---|---|---|---|---|
| w35_wh_1 | WHEN+WHO+WHAT+WHERE | ✅ Correct | Where did the family drive towards? | **CÓ** |
| | | ❌ D1 | How many people were in the family? | **KHÔNG** |
| | | ❌ D2 | How far was Pine Mountain from their home? | **KHÔNG** |
| w35_wh_2 | WHO-dad+WHAT-dad+WHO-children+WHAT-children | ✅ Correct | What was Dad doing while the children collected wood? | **CÓ** |
| | | ❌ D1 | What color was the camp tent? | **KHÔNG** |
| | | ❌ D2 | How many children helped collect the firewood? | **KHÔNG** |
| w35_wh_3 | WHAT+WHERE | ✅ Correct | What did they spot along the stream? | **CÓ** |
| | | ❌ D1 | What were the two squirrels eating? | **KHÔNG** |
| | | ❌ D2 | How deep was the mountain stream? | **KHÔNG** |
| w35_wh_4 | WHO+WHAT+WHEN | ✅ Correct | When did Dad light the campfire? | **CÓ** |
| | | ❌ D1 | What tool did Dad use to light the campfire? | **KHÔNG** |
| | | ❌ D2 | How long did the warm campfire burn that night? | **KHÔNG** |
| w35_wh_5 | WHERE+WHAT-roasted+WHAT-sang | ✅ Correct | What did they roast under the starry night sky? | **CÓ** |
| | | ❌ D1 | Which song did the family sing together? | **KHÔNG** |
| | | ❌ D2 | How many marshmallows did each person roast? | **KHÔNG** |

## Bảng Audit — GENERIC

| ID | Thông tin CÓ | Option | Text | Đáp án trong câu? |
|---|---|---|---|---|
| gen_wh_1 | WHO+WHAT+WHERE+HOW | ✅ Correct | What was the astronaut doing in the chamber? | **CÓ** |
| | | ❌ D1 | Why was the astronaut chosen for the training? | **KHÔNG** |
| | | ❌ D2 | How long did the training session last? | **KHÔNG** |
| gen_wh_2 | WHEN+WHAT+WHY | ✅ Correct | Why did the warning buzzer beep? | **CÓ** |
| | | ❌ D1 | Who fixed the oxygen gauge problem? | **KHÔNG** |
| | | ❌ D2 | Where was the oxygen gauge located on the spacecraft? | **KHÔNG** |
| gen_wh_3 | WHO+WHAT+WHEN | ✅ Correct | What did the chief engineer calibrate? | **CÓ** |
| | | ❌ D1 | Why did the solar panels need to be calibrated? | **KHÔNG** |
| | | ❌ D2 | How long did the calibration process take? | **KHÔNG** |
| gen_wh_4 | WHO+WHAT+WHERE | ✅ Correct | Where did Dr. Nova find the sparkling crystal? | **CÓ** |
| | | ❌ D1 | When did Dr. Nova arrive at the lunar crater? | **KHÔNG** |
| | | ❌ D2 | How did Dr. Nova reach the bottom of the crater? | **KHÔNG** |
| gen_wh_5 | WHO-gave+WHAT+TO-WHOM+WHY | ✅ Correct | Why did the commander award gold badges? | **CÓ** |
| | | ❌ D1 | When did the award ceremony take place? | **KHÔNG** |
| | | ❌ D2 | How many gold badges were awarded in total? | **KHÔNG** |

---

## Evidence

### Node.js Validation (verbatim stdout):
```
✅ ALL PASS
20/20 entries verified
```
[Đây là output thực từ tool call — không suy diễn]

### Build Verification:
```
✓ built in 15.09s   (exit code 0)
```

### Browser Playtest:
> ⛔ Browser tool blocked — Playwright driver 404 từ Azure CDN.
> Tuân thủ AGENTS.md: KHÔNG mô tả UI khi chưa có screenshot.
>
> **Action cần user làm:** Mở http://localhost:5174 → W33/W35 Question Quest
> → Xác nhận mỗi round: 1/3 answerable, 2/3 unanswerable.

## Commit
```
d231cb11  fix(chronicles): enforce unanswerable distractors in all WH-question pools [YY]
1 file changed, 124 insertions(+), 44 deletions(-)
```
