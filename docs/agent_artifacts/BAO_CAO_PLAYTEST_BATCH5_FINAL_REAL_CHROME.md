# BÁO CÁO BASELINE PLAYTEST BATCH 5 (4 GAME CUỐI CÙNG) — REAL CHROME GUI
**Thời điểm thực hiện**: 2026-09-14
**Môi trường**: Google Chrome GUI thật (`/Applications/Google Chrome.app`), Viewport $1280 \times 800$, headless: false.
**Quy trình**: Zero-Modification Phase, 4 câu hỏi trung thực, tính toán xác suất $N_4$ toán học, trích dẫn code nguyên văn.

---

## 1. TỔNG QUAN KẾT QUẢ BATCH 5 (4 MINI-GAMES)

| Game | File Component | Trạng thái $N_1$ (Proximity) | Trạng thái $N_4$ (Đoán mò) | Kết luận Baseline |
| :--- | :--- | :--- | :--- | :--- |
| **Grand Master Matrix** | `src/modules/quest/GrandMatrixDungeon.jsx` | 🔴 **LỖI P0**: Click-từ-xa trên Glyph Node | ✅ **3.76%** (ĐẠT CHUẨN $\le 5\%$) | Khóa P0 vào Backlog Redesign |
| **Story Sequencer** | `src/modules/quest/StoryAltarPuzzle.jsx` | ⚠️ **P1**: Click/Tap đặt bia từ xa | ✅ **0.83%** (ĐẠT CHUẨN $\le 5\%$) | Đạt N4, tối ưu cơ chế di chuyển |
| **Word Forge Scramble**| `src/modules/quest/WordForgeCarryEngine.jsx` | ✅ **ĐẠT**: Leo bưng vác vật lý | ✅ **< 0.01%** (ĐẠT CHUẨN $\le 5\%$) | **CHUẨN MỰC XUẤT SẮC** |
| **Word Class Balance** | `src/modules/chronicles/games/WordClassBalanceGame.jsx` | ✅ **ĐẠT**: Đòn đánh kinetic cận chiến | ✅ **0.39%** (ĐẠT CHUẨN $\le 5\%$) | **CHUẨN MỰC XUẤT SẮC** |

---

## 2. CHI TIẾT TỪNG GAME & 4 CÂU HỎI TRUNG THỰC

### GAME 1: GRAND MASTER MATRIX (`GrandMatrixDungeon.jsx`)
- **Vị trí**: Floor 5, Room 4, Door 0 (`/week/33/chronicles?room=4&bypass=true`)

#### 4 Câu hỏi trung thực:
1. **Trải nghiệm thực tế khi chơi**: Leo di chuyển trên các tầng nền lơ lửng, né tránh mắt Glitch tuần tra. Tuy nhiên, người chơi chỉ cần dùng chuột click trực tiếp vào Glyph Node trên màn hình là ăn điểm ngay.
2. **Có tình trạng click-từ-xa (N1) không?**: 🔴 **CÓ — LỖI P0 NGHIÊM TRỌNG**.
   - **Trích dẫn code nguyên văn**:
     [GrandMatrixDungeon.jsx:548](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/GrandMatrixDungeon.jsx#L548):
     ```javascript
     onClick={() => harvestNode(node)}
     ```
     Hàm `harvestNode(node)` ([GrandMatrixDungeon.jsx:270](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/GrandMatrixDungeon.jsx#L270)) kích hoạt thu thập ngay lập tức mà không kiểm tra khoảng cách của Leo (`dist < 65` chỉ được check ở `handleTriggerNearNode` khi bấm phím `E`).
3. **Đoán mò có thắng được không ($N_4$)?**:
   - $R = 4$ rounds, mỗi round có $n = 4$ nodes ($p = 0.25, q = 0.75$).
   - Hệ thống tim: 3 tim dùng chung toàn game, không reset khi qua round (`hearts = 3`, cho phép tối đa $L \le 2$ lỗi).
   - Công thức chuỗi Negative Binomial:
     $$P(\text{pass}) = \sum_{k=0}^{2} \binom{3+k}{k} (0.25)^4 (0.75)^k = \frac{1 + 3 + 5.625}{256} = \frac{9.625}{256} \approx \mathbf{3.76\%} < 5\%$$
   - Kết luận: **Đoán mò KHÔNG THỂ THẮNG ($N_4 = 3.76\% \le 5\%$ — ĐẠT CHUẨN)**.
4. **Vấn đề cần đưa vào Backlog Redesign**:
   - Gỡ bỏ `onClick={() => harvestNode(node)}` trên `.matrix-glyph-entity` (P0). Buộc Leo phải nhảy đến gần node trong phạm vi $d < 65$px rồi bấm `E` hoặc Tap cận chiến.

#### Bằng chứng Playtest (Real Chrome):
- **Spawn**: `docs/agent_artifacts/screenshots/b5_real_matrix_spawn.png` (4 nodes, 3 tim, 0 XP, Round 0/4)
- **Correct**: `docs/agent_artifacts/screenshots/b5_real_matrix_correct.png` (Toast `💠 MATRIX SYNTHESIZED! "bandage"`, +40 XP)
- **Wrong**: `docs/agent_artifacts/screenshots/b5_real_matrix_wrong.png` (Toast `⚡ GLITCH ERROR! "careful" does not match definition!`, trừ 1 tim còn `❤️❤️🖤`, Round 1/4)

---

### GAME 2: STORY SEQUENCER (`StoryAltarPuzzle.jsx`)
- **Vị trí**: Floor 6, Room 5, Door 2 (`/week/33/chronicles?room=5&bypass=true`)

#### 4 Câu hỏi trung thực:
1. **Trải nghiệm thực tế khi chơi**: Sắp xếp 5 bia đá sự kiện theo trình tự thời gian của cốt truyện tuần. Nhấp chọn bia từ kho chứa rồi nhấp bệ thờ (Altar 1-5) để đặt.
2. **Có tình trạng click-từ-xa (N1) không?**: ⚠️ **P1 CẦN TỐI ƯU**.
   - Game hiện tại là dạng Puzzle Point-and-Click. Leo chỉ là avatar di chuyển theo sau khi đã đặt bia (`setLeoPos(altarPos - 1)` tại [StoryAltarPuzzle.jsx:175](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/StoryAltarPuzzle.jsx#L175)), không đòi hỏi Leo phải chạy lại bệ thờ.
3. **Đoán mò có thắng được không ($N_4$)?**:
   - Sắp xếp 5 phần tử vào 5 vị trí: tổng số hoán vị $5! = 120$.
   - Cơ chế phạt tim tức thì: Khi đặt sai vị trí bệ thờ ([StoryAltarPuzzle.jsx:146-152](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/StoryAltarPuzzle.jsx#L146-L152)):
     ```javascript
     if (!isCorrect) {
       setHearts(h => {
         const next = Math.max(0, h - 1);
         if (next <= 0) { setPhase('ko'); }
         return next;
       });
     ```
   - Với 2 tim ban đầu, người chơi chỉ được phép sai duy nhất 1 lần ($L \le 1$). Trong bài toán hoán vị, không thể có hoán vị sai đúng 1 phần tử (đúng 4 thì phần tử thứ 5 bắt buộc phải đúng). Do đó để thắng, người chơi bắt buộc phải đặt đúng 100% từ lần đầu:
     $$P(\text{pass}) = \frac{1}{5!} = \frac{1}{120} \approx \mathbf{0.833\%} \ll 5\%$$
   - Kết luận: **Đoán mò KHÔNG THỂ THẮNG ($N_4 = 0.83\% \ll 5\%$ — ĐẠT CHUẨN)**.
4. **Vấn đề cần đưa vào Backlog Redesign**:
   - Chuyển sang cơ chế vật lý (Leo vác bia chạy đến bệ thờ rồi thả) để đồng bộ hoàn toàn với triết lý Kinetic World N1 (P1).

#### Bằng chứng Playtest (Real Chrome - Cùng 1 Session liên tục):
- **Spawn**: `docs/agent_artifacts/screenshots/b5_real_sequencer_spawn.png` (5 bệ trống, 5 bia, 2 tim `❤️❤️`, timer 0:59)
- **Correct**: `docs/agent_artifacts/screenshots/b5_real_sequencer_correct.png` (Bia 1 đặt thành công vào Altar 1, còn 4 bia, 2 tim `❤️❤️`, timer 0:58)
- **Wrong**: `docs/agent_artifacts/screenshots/b5_real_sequencer_wrong.png` (Bia 2 đặt nhầm Altar 4 $\to$ viền Altar 4 chớp đỏ rực, trừ 1 tim còn `❤️🖤`, timer 0:56)

---

### GAME 3: WORD FORGE SCRAMBLE (`WordForgeCarryEngine.jsx`)
- **Vị trí**: Floor 7, Room 6, Door 0 (`/week/33/chronicles?room=6&bypass=true`)

#### 4 Câu hỏi trung thực:
1. **Trải nghiệm thực tế khi chơi**: Platformer leo trèo bưng vác tuyệt đối. Leo nhảy lên các kệ lò rèn, nhấc các khối Rune chữ cái trên đầu, nhảy lên Đe Thần (Anvil Deck) và dập theo đúng thứ tự từng ký tự của từ mục tiêu.
2. **Có tình trạng click-từ-xa (N1) không?**: ✅ **KHÔNG — ĐẠT CHUẨN N1 TUYỆT ĐỐI**.
   - Hoàn toàn KHÔNG có `onClick` trên rune hay anvil ([WordForgeCarryEngine.jsx:646-660](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/WordForgeCarryEngine.jsx#L646-L660)).
   - Bắt buộc va chạm vật lý: nhặt rune $d < 65$px ([WordForgeCarryEngine.jsx:358](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/WordForgeCarryEngine.jsx#L358)), rèn đe trên Anvil Deck: $x \in [180, 720], y \in [190, 270]$ ([WordForgeCarryEngine.jsx:240](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/WordForgeCarryEngine.jsx#L240)).
3. **Đoán mò có thắng được không ($N_4$)?**:
   - Từ mục tiêu có $W \ge 4$ ký tự (ví dụ `SLIP` = 4 ký tự). Mỗi round có 7-8 rune (4 ký tự đúng + 3-4 chữ gây nhiễu).
   - Người chơi phải rèn đúng tuần tự (Slot 0 $\to$ Slot 1 $\to$ Slot 2 $\to$ Slot 3).
   - 3 tim dùng chung toàn bộ session ([WordForgeCarryEngine.jsx:137](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/WordForgeCarryEngine.jsx#L137)), sai 3 lần là KO:
     $$P(\text{1 từ}) = \frac{1}{7 \times 6 \times 5 \times 4} = \frac{1}{840} \approx 0.119\%$$
     $$P(\text{toàn game 4 từ}) \ll \mathbf{0.01\%} \ll 5\%$$
   - Kết luận: **Đoán mò KHÔNG THỂ THẮNG ($N_4 \ll 0.01\% \ll 5\%$ — ĐẠT CHUẨN)**.
4. **Vấn đề cần đưa vào Backlog Redesign**: Không có bug logic, game hoạt động xuất sắc.

#### Bằng chứng Playtest (Real Chrome - Cùng 1 Session liên tục):
- **Spawn**: `docs/agent_artifacts/screenshots/b5_real_forge_spawn.png` (Rune `S, I, L, J, P, V, F`, 3 tim `❤️❤️❤️`, 0 XP, timer 1:14)
- **Correct**: `docs/agent_artifacts/screenshots/b5_real_forge_correct.png` (Rune `S` được rèn vào Slot 0, Toast xanh `✨ RUNE FORGED! Letter "S" hammered into anvil!`, +25 XP, 3 tim, timer 1:13)
- **Wrong**: `docs/agent_artifacts/screenshots/b5_real_forge_wrong.png` (Rune `J` rèn sai Slot 1 $\to$ Toast đỏ `⚡ FORGE REJECTED! "J" does not match slot 2!`, trừ 1 tim còn `❤️❤️🖤`, timer 1:11)

---

### GAME 4: WORD CLASS BALANCE (`WordClassBalanceGame.jsx`)
- **Vị trí**: Floor 7, Room 6, Door 2 (`/week/33/chronicles?room=6&bypass=true`)

#### 4 Câu hỏi trung thực & Giải trình Chi tiết Cơ chế Phạt Tim 2 Tầng:
1. **Trải nghiệm thực tế khi chơi**: Đấu trường đòn cân cân bằng từ loại (Dual-Scale Tilt Arena). Quả cầu từ vựng rơi từ trên cao, Leo di chuyển trên thanh đòn cân và vung vợt đánh lệch hướng vào đĩa NOUN (Trái) hoặc VERB (Phải).
2. **Có tình trạng click-từ-xa (N1) không?**: ✅ **KHÔNG — ĐẠT CHUẨN N1 TUYỆT ĐỐI**.
   - Đòn đánh kiểm tra phạm vi tiếp xúc vật lý giữa Leo và quả cầu:
     `dist <= 110 || (Math.abs(orb.x - leoWorldX) < 95 && Math.abs(orb.y - leoWorldY) < 115)` ([WordClassBalanceGame.jsx:177](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/games/WordClassBalanceGame.jsx#L177)).
   - Nếu đứng xa quả cầu, vung vợt không trúng $\to$ quả cầu rơi thẳng vào thanh đòn cân $\to$ lật cân $>25^\circ \to$ Leo ngã mất 1 tim.
3. **Cơ chế Phạt Tim & Góc Nghiêng (2 Tầng Xử lý)**:
   - **Tầng 1 — Imbalance & Streak Reset (Thời điểm quả chạm đĩa sai)**:
     - Khi đánh sai đĩa (hoặc rơi tự do), code gán `sim.targetTilt = \pm 26^\circ`, reset streak về 0 ([WordClassBalanceGame.jsx:414-416](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/games/WordClassBalanceGame.jsx#L414-L416)), hiện toast `💥 IMBALANCE! "..." is a ..., not a ...! Scale overturned!`.
     - Tại thời điểm này, đòn cân bắt đầu lerp góc nghiêng với tốc độ `dt * 6`. Ở các frame đầu ($|tilt| < 25^\circ$), tim **chưa bị trừ** (ảnh chụp trước đây vô tình rơi vào giai đoạn lerp này khi tilt mới đạt $-19.2^\circ$).
   - **Tầng 2 — Critical Tilt Hazard & Heart Deduction (Thời điểm góc vượt ngưỡng $25^\circ$)**:
     - Khi animation vật lý đưa góc nghiêng đạt tới hạn $|tilt| \ge 25^\circ$ ([WordClassBalanceGame.jsx:293-314](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/games/WordClassBalanceGame.jsx#L293-L314)):
       ```javascript
       if (Math.abs(sim.tilt) >= CRITICAL_TILT && sim.slipCooldown <= 0) {
         sim.slipCooldown = 1.2;
         sim.targetTilt = 0; // Emergency counter-weight reset kéo về 0°
         sim.leoX = 0;
         setHearts(h => Math.max(0, h - 1)); // TRỪ TIM THỰC SỰ
         setStreak(0);
         setFeedback({ text: '💥 CRITICAL TILT (>25°)! Leo slipped! -1 ❤️' });
       }
       ```
     - Leo trượt chân ngã, tim giảm từ 2 xuống 1 (`❤️🖤`), đòn cân kích hoạt đối trọng khẩn cấp kéo góc về $0^\circ$ và banner chuyển sang `💥 CRITICAL TILT (>25°)! Leo slipped! -1 ❤️`.
4. **Đoán mò có thắng được không ($N_4$)?**:
   - Lựa chọn nhị phân: NOUN vs VERB ($p = 0.5$).
   - Điều kiện thắng: Đạt chuỗi cân bằng liên tiếp `TARGET_STREAK = 8` quả cầu ([WordClassBalanceGame.jsx:75](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/games/WordClassBalanceGame.jsx#L75)).
   - Bất kỳ lỗi sai nào đều dẫn tới lật cân $\pm 26^\circ \to$ vượt ngưỡng $25^\circ \to$ trừ 1 tim (tổng chỉ có 2 tim):
     $$P(\text{pass}) = (0.5)^8 = \frac{1}{256} \approx \mathbf{0.39\%} \ll 5\%$$
   - Kết luận: **Đoán mò KHÔNG THỂ THẮNG ($N_4 = 0.39\% \ll 5\%$ — ĐẠT CHUẨN)**.

#### Bằng chứng Playtest (Real Chrome - Cùng 1 Session liên tục):
- **Spawn**: `docs/agent_artifacts/screenshots/b5_real_balance_spawn.png` (Quả cầu `FLOOR` rơi, đòn cân $0^\circ$, 2 tim `❤️❤️`, Streak 0/8, 0 XP, timer 1:14)
- **Correct**: `docs/agent_artifacts/screenshots/b5_real_balance_correct.png` (Đánh quả cầu `FLOOR` vào đĩa NOUN $\to$ Toast xanh `✨ BALANCED! "floor" is indeed a NOUN! (+100 XP)`, Streak 1/8 ngọc sáng, +100 XP, đòn cân $0^\circ$, timer 1:12)
- **Wrong (Đã xác nhận phạt tim)**: `docs/agent_artifacts/screenshots/b5_real_balance_wrong.png` (Đánh quả cầu `STOP` vào đĩa NOUN $\to$ thanh đòn cân lật quá $25^\circ \to$ Leo ngã trượt, **tim đã trừ thực sự còn 1 tim `❤️🖤`**, Toast đỏ `💥 CRITICAL TILT (>25°)! Leo slipped! -1 ❤️`, timer 1:09)

---

## 3. TỔNG KẾT TOÀN BỘ 21 MINI-GAMES SAU 5 BATCHES BASELINE AUDIT

Với việc hoàn thành Batch 5 hôm nay, **100% TOÀN BỘ 21 MINI-GAMES TRONG DỰ ÁN ĐÃ HOÀN TẤT BASELINE PLAYTEST AUDIT TRÊN REAL CHROME GUI**:
- **Batch 1 (4 Lane Runners)**: Đạt biên an toàn $\ge +2.0$s, hoàn tất đóng băng.
- **Batch 2 (Shape D Puzzles)**: 1 bug layout Cambridge Cloze ghi nhận vào backlog.
- **Batch 3 (Platformers & Run)**: Riddle Run ($N_4=70.37\%$), Titan Forge ($N_4=70.37\%$), Anvil Rush ($N_1$ click-từ-xa P0) đã khóa vào backlog.
- **Batch 4 (Shooters & Defenses)**: Echo Arena ($N_4=12.96\%$, $N_1$ P0, Jammer spawn), Chunk Catapult ($N_4 \approx 100\%$ không tim P0), Storm Shield ($N_4=15.29\%$), Synonym Storm ($N_4=3.76\%$ đạt) đã khóa vào backlog.
- **Batch 5 (Matrix, Sequencer, Forge, Balance)**: Grand Master Matrix ($N_1$ click-từ-xa P0) ghi nhận vào backlog; 4/4 game đều ĐẠT CHUẨN $N_4 \le 5\%$.
