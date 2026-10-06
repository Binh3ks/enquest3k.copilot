# 🎮 BÁO CÁO PLAYTEST BASELINE BATCH 3 (CHROME GUI THẬT)
**Ngày thực hiện:** 2026-09-13  
**Môi trường:** Google Chrome GUI (`headless: false`, `/Applications/Google Chrome.app`, 1280x800)  
**Tình trạng code:** Giữ nguyên trạng thái hiện tại (Zero-Modification Phase)  
**Nhóm game (Batch 3):**
1. **BubbleStormChase** (`BubbleStormChase.jsx` — Floor 1, Door 1)
2. **WordWagonJump** (`WordWagonJump.jsx` — Floor 1, Door 2)
3. **AnvilRushGrammar** (`AnvilRushGrammar.jsx` — Floor 2, Door 2)
4. **RiddleRunMaze** (`RiddleRunMaze.jsx` — Floor 4, Door 3)
5. **TitanGrammarForge** (`TitanGrammarForge.jsx` — Floor 5, Door 2)

---

## I. TỔNG HỢP 15 MINH CHỨNG SCREENSHOTS (3 FRAME / GAME)

| Game | Frame 1: Spawn (Sạch, 3/3 ❤️, 0 XP) | Frame 2: Correct Action (+XP, Banner/Modal) | Frame 3: Wrong Action / Hazard (-1 ❤️, 2/3 ❤️❤️🖤) |
|---|---|---|---|
| **1. BubbleStormChase** | ![Spawn](screenshots/b3_real_bubble_spawn.png) | ![Correct](screenshots/b3_real_bubble_correct.png) | ![Wrong](screenshots/b3_real_bubble_wrong.png) |
| **2. WordWagonJump** | ![Spawn](screenshots/b3_real_wagon_spawn.png) | ![Correct](screenshots/b3_real_wagon_correct.png) | ![Wrong](screenshots/b3_real_wagon_wrong.png) |
| **3. AnvilRushGrammar** | ![Spawn](screenshots/b3_real_anvil_spawn.png) | ![Correct](screenshots/b3_real_anvil_correct.png) | ![Wrong](screenshots/b3_real_anvil_wrong.png) |
| **4. RiddleRunMaze** | ![Spawn](screenshots/b3_real_riddle_spawn.png) | ![Correct](screenshots/b3_real_riddle_correct.png) | ![Wrong](screenshots/b3_real_riddle_wrong.png) |
| **5. TitanGrammarForge**| ![Spawn](screenshots/b3_real_titan_spawn.png) | ![Correct](screenshots/b3_real_titan_correct.png) | ![Wrong](screenshots/b3_real_titan_wrong.png) |

---

## II. ĐÁNH GIÁ CHI TIẾT TỪNG GAME THEO 4 CÂU HỎI TRUNG THỰC

### 1. BubbleStormChase (`BubbleStormChase.jsx`)
- **Ảnh minh chứng:**
  - `b3_real_bubble_spawn.png`: Leo ở góc trái sàn, 3 bóng bay lơ lửng ("terrible", "mistake", "leg"), 2 lọ axit xanh trên sàn, HUD 3/3 tim, 0 XP, Wave 1/5 Target "terrible".
  - `b3_real_bubble_correct.png`: Leo nhảy lên bục chạm bóng mục tiêu "terrible", kích hoạt Modal MCQ Blitz với đếm ngược 5s ("What does 'terrible' mean?").
  - `b3_real_bubble_wrong.png`: Leo di chuyển va chạm với lọ axit trên sàn, tim giảm còn 2/3 (`❤️❤️🖤`), Leo nhấp nháy hiệu ứng bị thương.
- **Trả lời 4 câu hỏi trung thực:**
  1. *Hành động đúng có phân biệt được bằng giác quan không?* Có. Khi nhảy chạm đúng bóng mục tiêu, bong bóng nổ vỡ và màn hình lập tức hiện popup trắc nghiệm MCQ Blitz với âm thanh và thanh đếm giờ 5 giây.
  2. *Hành động sai có bị trừng phạt không?* Có đối với chướng ngại vật (axit sàn trừ 1 tim). Nhưng đối với việc **nhảy vào bong bóng từ gây nhiễu (distractor)**: code chỉ làm bóng nảy ra mà KHÔNG trừ tim.
  3. *Tốc độ phản ứng có cần thiết không?* Có ở khâu MCQ Blitz (5s timer), nhưng khâu nhảy bắt bóng thì bóng bay chậm, người chơi có thể đứng chờ bóng rơi vào tầm nhảy.
  4. *Đoán mò có thắng được không?* Có một phần. Vì nhảy trúng bóng sai không bị phạt tim, người chơi có thể nhảy bừa vào tất cả bóng cho đến khi trúng bóng target.

---

### 2. WordWagonJump (`WordWagonJump.jsx`)
- **Ảnh minh chứng:**
  - `b3_real_wagon_spawn.png`: Leo đứng trên sân ga Station 1, đoàn tàu đang chạy từ phải qua trái, Zombie tuần tra dưới ray, HUD 3/3 tim, 0 XP, Round 0/3.
  - `b3_real_wagon_correct.png`: Leo chọn đúng toa mục tiêu ("nurse"), ô trống số 1 trên banner được điền dạng pill màu xanh lá, banner hiện thông báo xác nhận `✨ Correct chunk: "nurse"!`, điểm tăng `+25 XP` (`⚡ 25 XP`), HUD nguyên vẹn 3/3 tim.
  - `b3_real_wagon_wrong.png`: Leo nhảy lên toa Gremlin (`👾 GREMLIN`), banner cảnh báo đỏ `❌ Watch out! Grammar Gremlin hazard!`, tim giảm còn 2/3 (`❤️❤️🖤`).
- **Trả lời 4 câu hỏi trung thực & Phát hiện lỗi nghiêm trọng:**
  1. *Hành động đúng có phân biệt được bằng giác quan không?* Có. Toa tàu đổi viền xanh lá, âm thanh vang lên, từ được điền vào khoảng trống trên banner, điểm tăng +25 XP.
  2. *Hành động sai có bị trừng phạt không?* **CHỈ PHẠT KHI NHẢY VÀO TOA GREMLIN**. Nếu nhảy nhầm vào toa từ gây nhiễu (distractor): code (dòng 443–449) chỉ hất nhẹ Leo ra và hiện banner nhắc nhở, **HOÀN TOÀN KHÔNG TRỪ TIM**.
  3. *BUG 1 — Zombie dưới sàn hoàn toàn không thể chạm tới (Unreachable Collision Bug):*
     - Trích dẫn code dòng 332–335 và 351:
       ```javascript
       const TRACK_GROUND_Y = TRACK_Y + 40; // 430 + 40 = 470px
       if (leo.y >= TRACK_GROUND_Y - LEO_HITBOX.height) {
         leo.y = TRACK_GROUND_Y - LEO_HITBOX.height; // leo.y bị chặn ở 470 - 55 = 415px
       ...
       if (!invincible && leo.y >= FLOOR_Y - LEO_HITBOX.height - 10) { // 520 - 55 - 10 = 455px
         const distToZombie = Math.abs((leo.x + 20) - (zombie.x + 25));
         if (distToZombie < 35) { leo.hearts--; ... }
       }
       ```
     - Vì Leo bị chặn đứng trên mặt ray ở $y = 415$px, trong khi điều kiện xét va chạm Zombie đòi hỏi $y \ge 455$px, nên **Leo không bao giờ có thể chạm vào Zombie**! Quái vật Zombie tuần tra bên dưới chỉ là ảnh động trang trí vô hại.
  4. *BUG 2 — Copy-Paste Modal Title:* Dòng 641 của `WordWagonJump.jsx`:
     ```jsx
     <h2>SYNTAX EXPRESS CLEARED!</h2>
     ```
     Tiêu đề modal chiến thắng bị copy nguyên xi từ `SyntaxExpressRail` mà chưa được đổi tên sang `WORD WAGON JUMP`.

---

### 3. AnvilRushGrammar (`AnvilRushGrammar.jsx`)
- **Ảnh minh chứng:**
  - `b3_real_anvil_spawn.png`: 3 đe rèn trên sàn với 3 dạng từ, quái Imp bay lượn ở giữa, bục cao phía trên, HUD 3/3 tim, 0 XP, Round 0/3.
  - `b3_real_anvil_correct.png`: Leo đập đe đúng ("he"), banner hiện `✨ RUNE FORGED! "he" (+30 XP)`, điểm nhảy lên `⚡ 30 XP`, HUD 3/3 tim.
  - `b3_real_anvil_wrong.png`: Leo va chạm với quái Imp tuần tra, hiệu ứng viền đỏ, tim giảm còn 2/3 (`❤️❤️🖤`).
- **Trả lời 4 câu hỏi trung thực:**
  1. *Hành động đúng có phân biệt được bằng giác quan không?* Có. Banner lóe sáng vàng, âm thanh phát ra câu hoàn chỉnh, điểm tăng +30 XP, chuyển vòng sau 1.5s.
  2. *Hành động sai có bị trừng phạt không?* Đập đe sai sẽ kích hoạt ngọn lửa bốc lên trên đe (`anvil-burning`, dòng 348) trong 2 giây. Nếu người chơi đứng gần ngọn lửa hoặc chạm Imp thì bị trừ 1 tim. Tuy nhiên nếu đứng xa đập bằng click chuột thì ngọn lửa không gây sát thương.
  3. *Tốc độ phản ứng có cần thiết không?* Thời gian 90s rất dư dả cho 3 câu, người chơi không bị áp lực thời gian.
  4. *Đoán mò có thắng được không?* Có khả năng đoán mò nếu không nhảy mà click thẳng vào đe, vì đe sai chỉ phun lửa tại chỗ trong 2 giây rồi tắt, người chơi có thể click đe khác ngay sau đó.

---

### 4. RiddleRunMaze (`RiddleRunMaze.jsx`)
- **Ảnh minh chứng:**
  - `b3_real_riddle_spawn.png`: Câu đố CLIL hiện trên đỉnh: *"I am the invisible force that stops shoes from slipping on wet tiles. What am I?"*, 3 cánh cửa ("Gravity", "Electricity", "Friction"), quái Sói Chaser tuần tra bên dưới, HUD 3/3 tim, 0 XP.
  - `b3_real_riddle_correct.png`: Mở đúng cửa "Friction", banner xanh rực sáng `✨ SANCTUARY UNLOCKED! "Friction" is correct!`, điểm tăng `⚡ 40 XP`, HUD 3/3 tim.
  - `b3_real_riddle_wrong.png`: Mở sai cửa "Electricity", banner đỏ cảnh báo `🔒 SEALED! "Electricity" does not solve the riddle!`, tim lập tức bị trừ còn 2/3 (`❤️❤️🖤`), điểm giữ 0 XP.
- **Trả lời 4 câu hỏi trung thực:**
  1. *Hành động đúng có phân biệt được bằng giác quan không?* Rất rõ. Cửa mở, banner xanh `SANCTUARY UNLOCKED`, hiệu ứng âm thanh và điểm số nhảy +40 XP.
  2. *Hành động sai có bị trừng phạt không?* **CỰC KỲ NGHIÊM KHẮC VÀ ĐÚNG NGHĨA**. Khác với các game khác, RiddleRunMaze **TRỪ THẲNG 1 TIM KHI CHỌN SAI CỬA** (code dòng 267: `setHearts(h => h - 1)`). Đây là game duy nhất trong Batch 3 xử phạt trực tiếp hành vi chọn sai đáp án kiến thức!
  3. *Tốc độ phản ứng có cần thiết không?* Quái Chaser tuần tra bên dưới tạo áp lực phải nhảy lên các bục cao để đọc và chọn cửa.
  4. *Đoán mò có thắng được không?* **VẪN THẮNG ĐƯỢC VỚI XÁC SUẤT 70.37% (CHƯA ĐẠT N4)**.
     Mặc dù game trừ 1 tim ngay khi chọn sai cửa, nhưng với tham số hiện tại ($n=3$ cửa, $R=3$ vòng, $hearts=3 \to$ cho phép sai tối đa $L=2$ lần):
     $$P(\text{pass}) = \binom{3}{0}\left(\frac{1}{3}\right)^3 + \binom{3}{1}\left(\frac{1}{3}\right)^2\left(\frac{2}{3}\right) + \binom{3}{2}\left(\frac{1}{3}\right)\left(\frac{2}{3}\right)^2 = \frac{1 + 6 + 12}{27} = \frac{19}{27} \approx 70.37\%$$
     Đây chính là con số Bug Template 70.37% đã được dự án nhận diện. Phạt tim ngay là điều kiện cần nhưng chưa đủ; game cần được nâng lên $R=6, L=1$ ($P \approx 1.78\%$) để đạt chuẩn N4 ($<5\%$).

---

### 5. TitanGrammarForge (`TitanGrammarForge.jsx`)
- **Ảnh minh chứng:**
  - `b3_real_titan_spawn.png`: Cỗ máy Titan với 2 bánh răng khổng lồ xoay nền, 3 ổ trục chứa 3 cụm ngữ pháp, banner câu `Without sufficient friction, the vehicle [___?___]`, HUD 3/3 tim, 0 XP.
  - `b3_real_titan_correct.png`: Lắp đúng bánh răng `"could not stop in time"`, bánh răng quay phát sáng, banner xanh `⚙️ TITAN HEART ENGAGED! "could not stop in time"`, điểm tăng `⚡ 40 XP`, HUD 3/3 tim.
  - `b3_real_titan_wrong.png`: Lắp sai bánh răng `"will stopped yesterday"`, bánh răng kẹt tia lửa, banner đỏ `💥 GEAR JAM! "will stopped yesterday" broke the piston!`, tim lập tức bị trừ còn 2/3 (`❤️❤️🖤`).
- **Trả lời 4 câu hỏi trung thực:**
  1. *Hành động đúng có phân biệt được bằng giác quan không?* Có. Bánh răng Titan xoay mạnh, piston hoạt động, banner xanh lóe sáng, cộng 40 XP.
  2. *Hành động sai có bị trừng phạt không?* **CÓ, PHẠT TIM NGAY LẬP TỨC**. Code dòng 284: `setHearts(h => h - 1)`. Bánh răng bị kẹt, văng tia lửa, banner đỏ báo vỡ piston và mất 1 tim.
  3. *Tốc độ phản ứng có cần thiết không?* Không cao, chủ yếu là giải đố ngữ pháp và di chuyển nhảy lên bục chọn bánh răng.
  4. *Đoán mò có thắng được không?* **VẪN THẮNG ĐƯỢC VỚI XÁC SUẤT 70.37% (CHƯA ĐẠT N4)**. Tương tự RiddleRunMaze, tham số hiện tại ($n=3, R=3, hearts=3 \to L=2$) khiến xác suất đoán mò qua màn là $19/27 \approx 70.37\%$. Chưa đạt chuẩn sư phạm N4 ($<5\%$).

---

## III. BẢNG SO SÁNH CƠ CHẾ PHẠT TIM & XÁC SUẤT ĐOÁN MÒ (N4) GIỮA 5 GAME BATCH 3

| Game | Va chạm quái/vật cản có trừ tim? | Chọn SAI bài học có trừ tim? | Xác suất đoán mò thắng (N4)? | Đánh giá chuẩn N4 (<5%) |
|---|---|---|---|---|
| **BubbleStormChase** | ✅ Có (Axit sàn: -1 ❤️) | ❌ Không (Distractor nảy ra) | $\approx 100\%$ (thử bừa các bóng) | ❌ Không đạt |
| **WordWagonJump** | ⚠️ Chỉ toa Gremlin (-1 ❤️) | ❌ Không (Distractor đẩy ra) | $\approx 100\%$ (thử bừa các toa) | ❌ Không đạt |
| **AnvilRushGrammar** | ✅ Có (Imp: -1 ❤️, Lửa đe: -1 ❤️) | ❌ Không trực tiếp | $\approx 100\%$ (click từ xa) | ❌ Không đạt |
| **RiddleRunMaze** | ✅ Có (Chaser wolf: -1 ❤️) | ✅ Có (Trừ 1 ❤️ trực tiếp) | **$19/27 \approx 70.37\%$** ($n=3, R=3, L=2$) | ❌ **Chưa đạt** (cần $R=6, L=1 \to 1.78\%$) |
| **TitanGrammarForge** | N/A (Không có quái tuần tra) | ✅ Có (Trừ 1 ❤️ trực tiếp) | **$19/27 \approx 70.37\%$** ($n=3, R=3, L=2$) | ❌ **Chưa đạt** (cần $R=6, L=1 \to 1.78\%$) |

---

## IV. CÁC PHÁT HIỆN SÂU (DEEP BUGS DISCOVERED) ĐƯA VÀO REDESIGN BACKLOG

### 🔴 NHÓM ƯU TIÊN CAO NHẤT (P0 — Critical Architecture & Mechanic Exploits)

1. **`AnvilRushGrammar.jsx` — Lỗ hổng click chuột từ xa phá vỡ hoàn toàn nguyên lý N1 (Simultaneity):**
   - **Vị trí:** Dòng 456: `onClick={() => handleAnvilStrike(anvil, idx)}`.
   - **Tác hại:** Cho phép người chơi đứng yên ở vùng an toàn và click thẳng vào đe để giải bài mà không cần điều khiển Leo di chuyển tới đe. Phá vỡ triệt để nguyên lý N1 (đọc câu đố và rủi ro va chạm vật lý Imp/Lửa đe phải diễn ra đồng thời tại cùng vị trí).
   - **Hướng khắc phục:** Xóa bỏ sự kiện `onClick` trên toàn màn hình; bắt buộc Leo phải dùng cơ chế Jump-Strike (nhảy đáp xuống đe) hoặc đứng trong phạm vi tương tác gần ($|x_{leo} - x_{anvil}| < 40$px) mới được kích hoạt búa rèn.
2. **`WordWagonJump.jsx` — Lỗi tọa độ va chạm Zombie (Unreachable Zombie Bug):**
   - **Vị trí:** Dòng 332 và dòng 351.
   - **Tác hại:** `TRACK_GROUND_Y = 470px` chặn Leo ở $y = 415$px, trong khi điều kiện xét va chạm Zombie đòi hỏi $y \ge 455$px. Leo không bao giờ có thể chạm tới Zombie, biến quái vật sàn thành hình ảnh động vô hại.
3. **`WordWagonJump.jsx` — Lỗi copy-paste tiêu đề Modal chiến thắng:**
   - **Vị trí:** Dòng 641: `<h2>SYNTAX EXPRESS CLEARED!</h2>` copy nguyên xi từ `SyntaxExpressRail`.
4. **`CambridgeClozeGauntlet.jsx` — Lỗi layout trùng tọa độ tinh thể đè lên đài tế:**
   - **Vị trí:** Tinh thể 4 `{ x: 350, y: 220 }` và tinh thể 5 `{ x: 520, y: 220 }` đè trực tiếp lên bounding box của `.apex-monument-prop`, che lấp ô đài tế ngay khi spawn.

### 🟡 NHÓM ƯU TIÊN P1 (Curriculum N4 Parameter Calibration & Penalty Enforcement)

5. **`RiddleRunMaze` & `TitanGrammarForge` — Hiệu chỉnh tham số N4 từ $70.37\% \to 1.78\%$:**
   - Cả 2 game hiện phạt tim đúng hướng nhưng số câu quá ít ($R=3$) và số tim quá nhiều ($hearts=3 \to L=2$), dẫn tới xác suất đoán mò $P_{\text{guess}} = 19/27 \approx 70.37\%$. Cần chuyển tham số sang $n=3, R=6, hearts=2 \to L=1$ để đưa $P_{\text{guess}} \to 1.78\% (<5\%)$.
6. **`WordWagonJump` & `BubbleStormChase` — Bổ sung phạt tim khi chọn Distractor:**
   - Cần bổ sung trừ 1 tim khi nhảy nhầm vào toa từ sai hoặc bắt nhầm bóng sai, thay vì chỉ đẩy nhẹ ra.

