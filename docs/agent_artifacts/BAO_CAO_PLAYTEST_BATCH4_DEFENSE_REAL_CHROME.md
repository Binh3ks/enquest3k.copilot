# BÁO CÁO PLAYTEST CHƠI THẬT TRÊN CHROME GUI — BATCH 4 (DEFENSE & SHOOTER)
**Ngày thực hiện:** 2026-09-14  
**Môi trường:** Real Chrome GUI (`/Applications/Google Chrome.app`), $1280 \times 800$, tương tác bàn phím + chuột thực tế  
**Mục tiêu:** Kiểm thử baseline trạng thái hiện tại (Zero-Modification Phase) cho 4 mini-game nhóm B/F: `EchoArenaShooter`, `ChunkCatapultCanvas`, `StormShieldDefense`, `SynonymStormDefense`.

---

## 1. TỔNG QUAN XÁC MINH 12/12 ẢNH THẬT

| Game | Mã | Tình trạng | Frame 1: Spawn | Frame 2: Đúng (+XP / Phản hồi) | Frame 3: Sai (-1 Tim / Phạt) |
|---|---|:---:|---|---|---|
| **Echo Arena Shooter** | F3D1 | ✅ ĐÃ BẮT TRÚNG | `ROUND 1/3` (❤️❤️❤️, 0 XP) | `🎯 "shoe" matches /sh/!` (+35 XP, ❤️❤️❤️) | `❌ "chair" does NOT match!` (❤️❤️🖤, 2/3 tim) |
| **Chunk Catapult Match** | F3D2 | ✅ ĐÃ BẮT TRÚNG | 3 Baskets, Slingshot nạp | Đạn va chạm trúng rổ đúng (`a strong grip`) | Đạn trượt rơi đất (`Off Target!`, rung) |
| **Storm Shield Defense** | F3D3 | ✅ ĐÃ BẮT TRÚNG | Spire Rooftop (❤️❤️❤️, 0% Pin) | `⚡ DEFLECTED "evidence"` (+20% Pin, 60 XP) | `💥 HAZARD HIT!` (❤️❤️🖤, 2/3 tim) |
| **Synonym Storm** | F6D1 | ✅ ĐÃ BẮT TRÚNG | `TARGET: CAREFUL` (❤️❤️❤️, 0%) | `✨ SYNONYM DEFLECTED! "cautious"` (+25% Pin) | `⚡ HAZARD! "reckless"` (❤️❤️🖤, 2/3 tim) |

---

## 2. CHI TIẾT TRẢ LỜI 4 CÂU HỎI TRUNG THỰC & ĐỐI SOÁT CODE

### 🎮 GAME 1: Echo Arena Shooter (F3D1 — Floor 3, Door 0)
- **Tệp mã nguồn:** `src/modules/quest/EchoArenaShooter.jsx`
- **Cảm giác chơi thật (2-4 câu):** Giao diện bắn bóng âm thanh đẹp mắt, đạn resonance bolt bay nhanh và có âm thanh chime thanh thoát. Tuy nhiên, người chơi có thể click chuột trực tiếp lên các quả bóng đang bay để bắn trúng mà không cần di chuyển nhân vật Leo bên dưới sàn.
- **4 Câu hỏi quan sát:**
  1. *Phản hồi điều khiển:* Nhạy, nhưng phím điều hướng Leo (ArrowLeft/Right) hầu như bị người chơi bỏ qua vì cơ chế tap thẳng vào bóng quá tiện lợi.
  2. *Nhịp độ & Khả năng đọc:* Tốt, các từ hiển thị to rõ trên quả cầu tinh thể (e.g. `shoe`, `ship`, `chair`), âm thanh phát âm mẫu `/sh/` rõ ràng.
  3. *Toán học N4 & Đối soát vòng lặp Round từ code thật:*
     - **Giải mã chỉ số tiến trình "1/3":**
       Trích nguyên văn [[EchoArenaShooter.jsx:471](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/EchoArenaShooter.jsx#L471)]:
       ```javascript
       <div className="echo-round-tag">{roundIdx + 1}/{rounds.length}</div>
       ```
       Chỉ số "1/3" hiển thị ở header là `{roundIdx + 1}/{rounds.length}`: nghĩa là **Round 1 trên tổng số 3 Rounds** (`DEFAULT_PHONICS_ROUNDS.length = 3`), **KHÔNG PHẢI** là cần 3 lần bắn trúng trong 1 round.
     - **Cơ chế chuyển round trong code:**
       Trích nguyên văn [[EchoArenaShooter.jsx:408-419](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/EchoArenaShooter.jsx#L408-L419)]:
       ```javascript
       const correctRemaining = orbs.filter(o => o.isCorrect && !o.popped).length;
       if (correctRemaining === 0 && orbs.length > 0 && phase === 'playing') {
         if (roundIdx + 1 < rounds.length) {
           setRoundIdx(r => r + 1);
           setScore(s => s + 50);
         } else {
           setPhase('cleared');
           const finalScore = score + timeLeft * 2 + 60;
           setScore(finalScore);
           recordPersonalBest('echo_arena_shooter', finalScore);
         }
       }
       ```
       Trong mỗi round, hệ thống khởi tạo chính xác 4 bóng (`validatedLabels.length = 4`: 2 bóng đúng mang âm đích, 2 bóng gây nhiễu). Khi bóng bị bắn trúng thì `popped: true` và biến mất, **HOÀN TOÀN KHÔNG RESPAWN** trong round đó. Round chỉ hoàn thành khi học sinh bắn nổ **cả 2 bóng đúng** (`correctRemaining === 0`).
     - **Tính toán chính xác $N_4$ (Sequential Sampling without Replacement):**
       - Trong 1 round (4 bóng gồm $2C$ đúng và $2W$ sai):
         - Xác suất 0 lỗi ($C, C$): $\frac{2}{4} \times \frac{1}{3} = \frac{1}{6} \approx 16.67\%$.
         - Xác suất 1 lỗi ($W, C, C$ hoặc $C, W, C$): $2 \times (\frac{2}{4} \times \frac{2}{3} \times \frac{1}{2}) = \frac{2}{6} = \frac{1}{3} \approx 33.33\%$.
         - Xác suất 2 lỗi ($W, W, C, C$ hoặc hoán vị): $3 \times \frac{1}{6} = \frac{3}{6} = 50\%$.
       - Người chơi có 3 tim trên cả 3 round, bị KO ở lỗi thứ 3 $\to$ Cho phép tối đa $L \le 2$ lỗi trên toàn bộ 3 rounds.
       - Tổng xác suất đoán mò ngẫu nhiên vượt qua 3 rounds:
         - 0 lỗi: $(\frac{1}{6})^3 = \frac{1}{216}$.
         - 1 lỗi: $3 \times \frac{2}{6} \times (\frac{1}{6})^2 = \frac{6}{216}$.
         - 2 lỗi: $3 \times \frac{3}{6} \times (\frac{1}{6})^2 + 3 \times (\frac{2}{6})^2 \times \frac{1}{6} = \frac{9 + 12}{216} = \frac{21}{216}$.
         $$P(\text{pass}) = \frac{1 + 6 + 21}{216} = \frac{28}{216} = \frac{\mathbf{7}}{\mathbf{54}} \approx \mathbf{12.96\%} > 5\% \implies \text{CHƯA ĐẠT N4}$$
         *(Chính xác là $12.96\%$, thấp hơn ước lượng nhị thức thô $28.5\%$ trước đây, nhưng vẫn cao hơn ngưỡng an toàn $5\%$, cần siết trong Redesign).*
  4. *Phát hiện vi phạm N1/N2/N4 & Bug Code:*
     - **Lỗi N1 Nghiêm trọng (Remote Click không cần di chuyển Leo):**
       Trích nguyên văn [[EchoArenaShooter.jsx:244-248](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/EchoArenaShooter.jsx#L244-L248)]:
       ```javascript
       const handleOrbDirectPop = useCallback((orb) => {
         if (phase !== 'playing' || orb.popped) return;
         fireBoltTowards(orb.x + 34, orb.y + 34);
       }, [phase, fireBoltTowards]);
       ```
     - **Lỗi P1 Layout / Spawn Hazard (Dơi Jammer đè lên đáp án đúng):**
       Trích nguyên văn [[EchoArenaShooter.jsx:109](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/EchoArenaShooter.jsx#L109)]:
       ```javascript
       const [gremlin, setGremlin] = useState({ x: 80, y: 130, vx: 2.2, dir: 1 });
       ```
       Tọa độ cố định ban đầu $(x: 80, y: 130)$ của Noise Gremlin trùng khớp với vị trí xuất hiện của Quả cầu 0 $(x \approx 80\text{--}120, y \approx 125)$ mang từ đúng `"shoe"`. Khi đạn bắn ra ở $t=0$, dơi Jammer lập tức hấp thụ đạn (`Noise Gremlin absorbed bolt!`), gây cản trở vô lý. Đã đưa vào Redesign Backlog: cho Gremlin spawn từ ngoài màn hình hoặc bay trên trần xa bóng.
- **Minh chứng ảnh thật:**
  - *Spawn Frame:* ![Echo Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_echo_spawn.png)
  - *Correct Action:* ![Echo Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_echo_correct.png)
  - *Wrong Action:* ![Echo Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_echo_wrong.png)

---

### 🎮 GAME 2: Chunk Catapult Match (F3D2 — Floor 3, Door 1)
- **Tệp mã nguồn:** `src/modules/chronicles/games/ChunkCatapultCanvas.jsx`
- **Cảm giác chơi thật (2-4 câu):** Vật lý súng cao su kéo-thả (slingshot drag & release) mô phỏng quỹ đạo parabol rất mượt, có hiệu ứng đạn bay chân thực. Điểm nghẽn là không hề có hệ thống mạng/tim: bắn trượt thoải mái mà không lo bị Game Over.
- **4 Câu hỏi quan sát:**
  1. *Phản hồi điều khiển:* Chuột kéo dây chun súng cao su rất mượt, thả tay là đạn phóng theo vector lực.
  2. *Nhịp độ & Khả năng đọc:* Banner đề bài to rõ, 3 rổ mục tiêu có nhãn chữ dễ đọc.
  3. *Toán học N4 (Xác suất đoán mò):*
     - Cấu hình: $R = 5$ pairs, $n = 3$ rổ/pair.
     - **Hệ thống tim: HOÀN TOÀN KHÔNG CÓ TIM ($L = \infty$).**
     - Trích nguyên văn [[ChunkCatapultCanvas.jsx:410-427](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/games/ChunkCatapultCanvas.jsx#L410-L427)]:
       ```javascript
       } else {
         playSfx('hit_wrong');
         b.shake = 12;
         state.attemptsOnCurrentPair++;
         state.popups.push({ text: 'MISS! Try Again', color: '#f87171' });
         setTimeout(() => { resetBullet(); }, 500);
       }
       ```
       Bắn trúng rổ sai chỉ bị trừ điểm thưởng tiềm năng và nạp lại đạn sau 500ms, không trừ tim, không KO.
     - **Xác suất đoán mò thắng:** $P(\text{pass}) = \mathbf{100\%}$ (Brute-force Exploit). Người chơi có thể bắn bừa cả 3 rổ cho đến khi trúng mà vẫn qua bàn trong thời gian 90s.
  4. *Phát hiện vi phạm N1/N2/N4 & Đối soát nguồn dữ liệu Pair:*
     - **Giải mã câu hỏi khác nhau giữa các ảnh ("Rubber shoe soles provide..." vs "Suddenly, he lost his balance..."):**
       Trích nguyên văn [[contentService.js:364](file:///Users/binhnguyen/projects/Engquest3k/src/services/contentService.js#L364)]:
       ```javascript
       const shuffled = [...pool].sort(() => Math.random() - 0.5);
       ```
       Mỗi lần tải phòng (mount component), `contentService.js` xáo trộn ngẫu nhiên pool 8 câu ngữ pháp. Hai ảnh trước đó được chụp ở hai phiên trình duyệt khác nhau nên câu ở vị trí index 0 (`Pair: 1/8`) khác nhau. Chỉ số Pair hoạt động đúng 100%. Lần chụp mới đã được thực hiện trong **cùng 1 phiên duy nhất (single continuous session)**, cả 3 frame đều mang cùng 1 câu hỏi `"Rubber shoe soles provide ... ?"`.
     - **Minh chứng trạng thái va chạm chuẩn xác (đã chụp lại hoàn tất):**
       - *Spawn:* Ná nghỉ hoàn toàn, 0 thao tác kéo, đạn nằm trên giá súng, Score: 0, Pair: 1/8.
       - *Wrong:* Đạn va chạm rổ sai ("the school nurse"), viền rổ chuyển đỏ, rung giật, popup `MISS! Try Again` hiện rõ màu đỏ trên canvas, Score: 0.
       - *Correct:* Đạn va chạm rổ đúng ("a strong grip"), popup `+12 PERFECT!` hiện rõ màu xanh trên canvas, hạt pháo hoa bùng nổ, HUD góc trên cập nhật ngay `Score: 12`.
- **Minh chứng ảnh thật (Single Continuous Session):**
  - *Spawn Frame:* ![Catapult Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_catapult_spawn.png)
  - *Correct Action:* ![Catapult Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_catapult_correct.png)
  - *Wrong Action:* ![Catapult Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_catapult_wrong.png)

---

### 🎮 GAME 3: Storm Shield Defense (F3D3 — Floor 3, Door 2)
- **Tệp mã nguồn:** `src/modules/quest/StormShieldDefense.jsx`
- **Cảm giác chơi thật (2-4 câu):** Cơ chế Leo mang khiên chạy và nhảy để chặn thiên thạch rơi rất sống động, đòi hỏi vận động thực sự. Thiên thạch rơi với vận tốc 90-140px/s cho thời gian quan sát vừa phải. Bị trừ 1 tim ngay khi chạm thiên thạch đỏ và trừ 10% pin.
- **4 Câu hỏi quan sát:**
  1. *Phản hồi điều khiển:* Phím `ArrowLeft`/`ArrowRight` và `Space` nhảy di chuyển Leo rất nhạy, có va chạm vật lý với các bệ Spire.
  2. *Nhịp độ & Khả năng đọc:* Chữ trên thiên thạch to, màu sắc phân biệt rõ rệt (vàng = từ đúng, đỏ = bẫy).
  3. *Toán học N4 (Xác suất đoán mò):*
     - Cấu hình: Cần sạc 100% pin (mỗi thiên thạch đúng sạc +20% $\to R = 5$ lần chặn thành công).
     - Tỷ lệ spawn: $45\%$ target, $55\%$ hazard.
     - Hearts: 3 tim ($L = 2$ lần va chạm bẫy tối đa trước khi KO).
     - Nếu học sinh đứng yên hoặc lao vào đỡ bừa mọi thiên thạch rơi gần:
       Mô hình Negative Binomial (5 thành công trước 3 thất bại với $p=0.45, q=0.55$):
       $$P(\text{pass}) = \sum_{k=0}^2 \binom{4+k}{k} p^5 q^k = (0.45)^5 \left[ 1 + 5(0.55) + 15(0.55)^2 \right] \approx \mathbf{15.29\%} > 5\%$$
       $\implies$ Xác suất bắt bừa vẫn đạt $15.29\%$, cần siết chặt thêm để về $<5\%$.
  4. *Phát hiện vi phạm N1/N2/N4 & Bug Code:*
     - **N1:** Tuân thủ tốt (không có nút bấm từ xa, Leo phải di chuyển đến đúng tọa độ va chạm: `distLeo < 52`).
     - **Trích dẫn phạt tim thật** [[StormShieldDefense.jsx:347-351](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/StormShieldDefense.jsx#L347-L351)]:
       ```javascript
       setHearts(h => {
         const next = Math.max(0, h - 1);
         if (next === 0) setPhase('ko');
         return next;
       });
       setBatteryCharge(b => Math.max(0, b - 10));
       ```
- **Minh chứng ảnh thật:**
  - *Spawn Frame:* ![Storm Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_storm_spawn.png)
  - *Correct Action:* ![Storm Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_storm_correct.png)
  - *Wrong Action:* ![Storm Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_storm_wrong.png)

---

### 🎮 GAME 4: Synonym Storm (F6D1 — Floor 6, Door 0)
- **Tệp mã nguồn:** `src/modules/quest/SynonymStormDefense.jsx`
- **Cảm giác chơi thật (2-4 câu):** Đỉnh tháp giông bão Arcane Gale Spire với banner hiển thị từ gốc (e.g. `TARGET: CAREFUL`). Thiên thạch chứa từ đồng nghĩa và từ trái nghĩa rơi liên tục. Leo chạy và nhảy đỡ đúng từ đồng nghĩa mang lại cảm giác hành động rất phấn khích và có phản hồi rung giật màn hình khi va chạm thiên thạch đỏ.
- **4 Câu hỏi quan sát:**
  1. *Phản hồi điều khiển:* Rất tốt, Leo di chuyển mượt mà trên sàn và bệ nhảy gantry.
  2. *Nhịp độ & Khả năng đọc:* Tuyệt vời, banner từ gốc nổi bật ở giữa màn hình, từ đồng nghĩa/trái nghĩa hiển thị rõ ràng trên từng khối thiên thạch.
  3. *Toán học N4 (Xác suất đoán mò):*
     - Cấu hình: $R = 4$ round (hoặc 5 round tuỳ tuần). Mỗi round có 1 từ đồng nghĩa đúng và 3 từ gây nhiễu/trái nghĩa ($n = 4 \implies p = 0.25, q = 0.75$).
     - Hearts: 3 tim ($L = 2$ lần va chạm bẫy tối đa).
     - Xác suất đoán mò ngẫu nhiên (Negative Binomial 4 thành công trước 3 thất bại):
       $$P(\text{pass}) = \sum_{k=0}^2 \binom{3+k}{k} (0.25)^4 (0.75)^k = \frac{1}{256} \left[ 1 + 4(0.75) + 10(0.75)^2 \right] = \frac{9.625}{256} \approx \mathbf{3.76\%} < 5\%$$
       $\implies$ **ĐẠT CHUẨN N4 TOÁN HỌC ($3.76\% < 5\%$)!**
  4. *Phát hiện vi phạm N1/N2/N4 & Bug Code:*
     - **N1:** Tuân thủ tốt, Leo phải di chuyển thân mình tới đúng tọa độ va chạm, không có click từ xa.
     - **Trích dẫn phạt tim thật** [[SynonymStormDefense.jsx:335-339](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/SynonymStormDefense.jsx#L335-L339)]:
       ```javascript
       setHearts(h => {
         const next = Math.max(0, h - 1);
         if (next === 0) setPhase('ko');
         return next;
       });
       ```
- **Minh chứng ảnh thật:**
  - *Spawn Frame:* ![Synonym Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_synonym_spawn.png)
  - *Correct Action:* ![Synonym Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_synonym_correct.png)
  - *Wrong Action:* ![Synonym Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b4_real_synonym_wrong.png)

---

## 3. TỔNG HỢP BACKLOG KỸ THUẬT PHÁT HIỆN TỪ BATCH 4

| Game | Mức độ | Phân loại lỗi | Mô tả chi tiết & Hướng xử lý khi bước vào pha Redesign |
|---|:---:|:---:|---|
| **ChunkCatapultCanvas** | **P0** | **N4 Exploit** | **Hoàn toàn không có hệ thống tim ($L = \infty$, đoán mò $100\%$):** Bổ sung HUD tim (Hearts = 2 hoặc 3), trừ tim khi bắn trúng rổ sai để triệt tiêu lỗ hổng brute-force. |
| **EchoArenaShooter** | **P0** | **N1 Flaw** | **Click chuột từ xa không cần di chuyển Leo:** `handleOrbDirectPop` cho phép bấm trực tiếp vào bóng trên trời, vô hiệu hóa việc điều khiển Leo. Cần gỡ bỏ click trực tiếp trên bóng, bắt buộc ngắm bắn qua vị trí Leo. |
| **EchoArenaShooter** | **P1** | **Layout / Spawn Bug** | **Dơi Jammer đè lên bóng đáp án đúng ở $t=0$:** `gremlin` khởi tạo cố định $(80, 130)$ đè lên Quả cầu 0 mang từ đúng, hấp thụ đạn ngay khi vừa bắn. Cần spawn Gremlin từ ngoài màn hình hoặc trên trần. |
| **EchoArenaShooter** | **P1** | **N4 Pacing** | **Xác suất đoán mò cao ($12.96\% > 5\%$):** Nâng số round từ 3 lên 5 round hoặc siết tim để đưa xác suất về $< 5\%$. |
| **StormShieldDefense** | **P1** | **N4 Pacing** | **Xác suất đỡ bừa còn cao ($15.29\%$):** Tăng tỷ lệ hazard meteor hoặc yêu cầu streak đỡ đúng liên tiếp để giảm $P(\text{pass}) < 5\%$. |
| **SynonymStormDefense** | ✅ | **Chuẩn N1 & N4** | Đã đạt chuẩn toán học $3.76\% < 5\%$, phạt tim nghiêm ngặt, cơ chế đồng bộ tốt. |
