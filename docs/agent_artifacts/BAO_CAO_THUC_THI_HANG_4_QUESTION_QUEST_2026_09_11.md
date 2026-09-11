# BÁO CÁO THỰC THI TOÀN DIỆN: HẠNG #4 — QUESTION QUEST (SANCTUM MAZE)
*Ngày lập: 11/09/2026 — Phiên làm việc Antigravity v2 Forensic & Staging*

---

## 1. TỔNG QUAN KIẾN TRÚC & QUYẾT ĐỊNH KỸ THUẬT

### 1.1. Bối cảnh & Cơ chế Sanctum Maze
- **Vị trí**: Floor 7, Door 2 (Grammar) — Master Sanctum.
- **Nguồn gốc**: Fork từ nền tảng Platformer Labyrinth [RiddleRunMaze.jsx](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/RiddleRunMaze.jsx) $\rightarrow$ [QuestionQuestGame.jsx](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/QuestionQuestGame.jsx).
- **Quy chuẩn Biển 220px (Invariant Requirement)**:
  - Bảng hiệu `.vault-door-plaque-220` có chiều rộng cố định **220px** (`width: 220px; box-sizing: border-box`), đặt trên 3 bệ đá Sanctuary Tiers (chiều rộng 220px):
    - Cổng 0: Left Vault Tier (`x: 50, y: 370, width: 220`)
    - Cổng 1: High Apex Altar (`x: 340, y: 185, width: 220`)
    - Cổng 2: Right Vault Tier (`x: 630, y: 370, width: 220`)
  - Nhờ chiều rộng 220px, toàn bộ câu hỏi WH-question (25–45 ký tự) hiển thị trọn vẹn trong 2 dòng thanh thoát, có viền vàng dạ quang tím, chữ hiển thị to rõ, không bị tràn viền hay co giật font.
- **Biểu ngữ Mục tiêu trên cùng (Top Banner)**:
  - `.question-quest-banner-text`: Hiển thị sự kiện tường thuật của câu chuyện (e.g. *"Jake was walking carefully down the school corridor after science class."* hoặc *"Early in the morning, the family packed their gear and drove towards Pine Mountain."*).
  - `.question-quest-round-pill`: Hiển thị tiến độ vòng chơi cố định chuẩn xác `"Round X / 5"`.
- **Cơ chế tương tác & Hệ quả va chạm**:
  - Leo di chuyển, nhảy lên các bậc đá tiếp cận cổng Sanctuary mong muốn. Nhấn `[E]`, `Enter`, `Space` hoặc chạm màn hình để mở cổng:
    - *Chọn đúng cổng WH-Question*: Hào quang thần thánh bùng nổ, +40 XP, TTS phát âm câu hỏi chuẩn, toast `"✨ SANCTUARY UNLOCKED!"`, chuyển sang câu hỏi tiếp theo sau 1200ms.
    - *Chọn sai cổng WH-Question*: Tia sét phong ấn đỏ giáng xuống, Leo bị đẩy lùi nhẹ, **trừ 1 Tim (3 $\rightarrow$ 2)**, toast `"🔒 SEALED!"`.
- **Anti-Leak Invariant**:
  - Toàn bộ 3 cổng đều mang thuộc tính `targetRoundId: roundIdx + 1`.
  - Khi chuyển vòng (`roundIdx` tăng), danh sách cổng của vòng cũ bị loại bỏ hoàn toàn, sinh ra 3 cổng mới mang ID của vòng mới. Hàm `getStaleDoors(oldRoundId)` kiểm chứng 0 cổng cũ còn tồn tại trong bộ nhớ.

---

## 2. KẾT QUẢ PUPPETEER PLAYTEST ĐỦ 4/4 TỔ HỢP THỰC TẾ (ĐỌC TRỰC TIẾP TỪ DOM)

Chạy script kiểm thử: `node scripts/test_question_quest_playtest.mjs`

### 2.1. Output NGUYÊN VĂN từ tool call
```
================================================================================
>>> HẠNG #4: QUESTION QUEST — PLAYTEST FULL 4 TỔ HỢP + ANTI-LEAK (DIRECT DOM) <<<
================================================================================

--- TỔ HỢP 1: W33 SUCCESS (Vào đúng cổng WH-Question -> Sanctuary Unlocked) ---
[W33 Success DOM Sentence]: "Jake was walking carefully down the school corridor after science class."
[W33 Success DOM Round]: "Round 1 / 5"
[W33 220px Door Plaques]: [
  'What was Jake doing?',
  'Where was Jake going?',
  'When was Jake walking?'
]
[W33 Target WH-Question]: "What was Jake doing?"
[W33 Collision Toast]: "✨ SANCTUARY UNLOCKED! "What was Jake doing?" is the correct WH-question!"
[W33 Score HUD]: 0 -> 40 (+40 XP)
[W33 Hearts DOM]: 3 -> 3 (Hook: 3 -> 3)
[Tổ hợp 1 Assertion]: Sanctuary unlocked & +40 XP & no heart penalty & DOM Round 1 / 5? => PASS ✅

--- TỔ HỢP 2: W33 HAZARD (Vào cổng sai WH-Question -> Trừ 1 Tim) ---
[W33 Hazard DOM Sentence]: "Jake was walking carefully down the school corridor after science class."
[W33 Hazard DOM Round]: "Round 1 / 5"
[W33 Wrong WH-Question Chosen]: "Where was Jake going?"
[W33 Hazard Collision Toast]: "🔒 SEALED! "Where was Jake going?" does not match this event!"
[W33 Hazard Score HUD]: 0 -> 0 (+0 XP)
[W33 Hazard Hearts DOM]: 3 -> 2 (Expected: 3 -> 2)
[W33 Hazard Hearts Hook]: 3 -> 2 (Expected: 3 -> 2)
[Tổ hợp 2 Assertion]: Wrong door sealed (-1 heart) & warning toast & DOM Round 1 / 5? => PASS ✅

--- TỔ HỢP 3: W35 SUCCESS (Vào đúng cổng WH-Question -> Sanctuary Unlocked) ---
[W35 Success DOM Sentence]: "Early in the morning, the family packed their gear and drove towards Pine Mountain."
[W35 Success DOM Round]: "Round 1 / 5"
[W35 220px Door Plaques]: [
  'Where did the family drive towards?',
  'Who drove the yellow bus?',
  'Why did they return home?'
]
[W35 Target WH-Question]: "Where did the family drive towards?"
[W35 Collision Toast]: "✨ SANCTUARY UNLOCKED! "Where did the family drive towards?" is the correct WH-question!"
[W35 Score HUD]: 0 -> 40 (+40 XP)
[W35 Hearts DOM]: 3 -> 3 (Hook: 3 -> 3)
[Tổ hợp 3 Assertion]: W35 Sanctuary unlocked & +40 XP & no heart penalty & DOM Round 1 / 5? => PASS ✅

--- TỔ HỢP 4: W35 HAZARD (Vào cổng sai WH-Question -> Trừ 1 Tim) ---
[W35 Hazard DOM Sentence]: "Early in the morning, the family packed their gear and drove towards Pine Mountain."
[W35 Hazard DOM Round]: "Round 1 / 5"
[W35 Wrong WH-Question Chosen]: "Who drove the yellow bus?"
[W35 Hazard Collision Toast]: "🔒 SEALED! "Who drove the yellow bus?" does not match this event!"
[W35 Hazard Score HUD]: 0 -> 0 (+0 XP)
[W35 Hazard Hearts DOM]: 3 -> 2 (Expected: 3 -> 2)
[W35 Hazard Hearts Hook]: 3 -> 2 (Expected: 3 -> 2)
[Tổ hợp 4 Assertion]: Wrong door sealed (-1 heart) & warning toast & DOM Round 1 / 5? => PASS ✅

--- PHẦN 5: ANTI-LEAK QUESTION TRANSITION VERIFICATION ---
[Question Transition]: Round 1 (idx: 0) -> Round 2 (idx: 1)
[Old Round Doors Active Before]: 3
[Old Round Doors Remaining After Transition]: 0 (Expected: 0)
[New Round Active Doors]: 3 (active for new round)
[Anti-Leak Assertion]: Transition advanced correctly & old doors purged from memory? => PASS ✅

================================================================================
>>> HOÀN THÀNH 100%: TẤT CẢ 4/4 TỔ HỢP QUESTION QUEST VÀ ANTI-LEAK ĐỀU PASS TUYỆT ĐỐI! <<<
================================================================================
```

### 2.2. Bằng chứng ảnh chụp màn hình Live (Đủ 4/4 Tổ Hợp)

1. **W33 Success — Biển 220px `"What was Jake doing?"`, Mở cổng Sanctuary (+40 XP, 3 Tim, Round 1 / 5):**
   ![W33 Question Quest Success](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w33_question_quest_success_live.png)

2. **W33 Hazard — Chọn nhầm biển `"Where was Jake going?"` $\rightarrow$ Cổng phong ấn, trừ 1 Tim (3 $\rightarrow$ 2):**
   ![W33 Question Quest Hazard](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w33_question_quest_hazard_live.png)

3. **W35 Success — Biển 220px `"Where did the family drive towards?"`, Mở cổng Sanctuary (+40 XP, 3 Tim, Round 1 / 5):**
   ![W35 Question Quest Success](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w35_question_quest_success_live.png)

4. **W35 Hazard — Chọn nhầm biển `"Who drove the yellow bus?"` $\rightarrow$ Cổng phong ấn, trừ 1 Tim (3 $\rightarrow$ 2):**
   ![W35 Question Quest Hazard](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w35_question_quest_hazard_live.png)

---

## 3. TỔNG KẾT TÍCH HỢP HỆ THỐNG
- **Component**: `src/modules/quest/QuestionQuestGame.jsx` (573 dòng)
- **Stylesheet**: `src/modules/quest/QuestionQuestGame.css` (230 dòng)
- **Export**: `src/modules/quest/index.js`
- **Mount**: `src/modules/chronicles/DailyRoomScreen.jsx:406` (`case 'question_quest':`)
- **Build Status**: `npm run build` exit code 0 (`13.83s`).
- **Playtest Suite**: Đạt 100% cả 4/4 tổ hợp và Anti-leak ngay từ lần chạy đầu tiên, toàn bộ log đối chiếu khớp 100% với ảnh chụp live.
