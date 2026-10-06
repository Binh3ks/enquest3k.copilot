# TỔNG HỢP TOÀN BỘ BACKLOG REDESIGN 21 MINI-GAMES (BATCHES 1–5)
**Thời điểm cập nhật**: 2026-09-14 (Phiên bản v4 — Toán học N4 chuẩn hóa toàn diện)  
**Trạng thái nguồn**: Hoàn tất 100% Baseline Audit 21/21 Mini-Games trên Real Chrome GUI ($1280 \times 800$, Zero-Modification Phase).  
**Mục đích**: Danh sách ưu tiên kỹ thuật duy nhất làm cơ sở triển khai code sửa lỗi, có công thức xác suất toán học kèm theo từng dòng.

---

## 1. BẢNG TỔNG HỢP ƯU TIÊN DUY NHẤT (P0 TRƯỚC, P1 SAU)

| Mức độ | Game | Vị trí Floor/Door | Lỗi cốt lõi phát hiện từ Baseline | Công thức toán học & Giải pháp kỹ thuật chuẩn hóa |
| :--- | :--- | :--- | :--- | :--- |
| ✅ **P0-1** | **Chunk Catapult** | Floor 3, Door 2 | $N_4 \approx 100\%$ — KHÔNG CÓ TIM, bắn vô hạn lần | **✅ ĐÃ HOÀN THÀNH 100%**: Đã thêm 3 tim persistent, trừ tim khi miss/wrong, KO Modal khi hết tim kèm nút Try Again reset sạch, bảo đảm $R \ge 5$, $N_4 = \frac{11}{243} \approx \mathbf{4.53\%} \le 5\%$. Build exit 0, Validator 8/8 pass, Playtest Chrome thật 4/4 frames đạt chuẩn. |
| ✅ **P0-2** | **Riddle Run** | Floor 4, Door 3 | $N_4 = \mathbf{20.99\%}$ (Bernoulli) / $\mathbf{37.04\%}$ (Elimination) do 3 cửa, 3 rounds | **✅ ĐÃ HOÀN THÀNH 100%**: 4 cửa Sanctuary ($p=0.25$), 4 rounds ($R=4$), 3 tim persistent ($L \le 2$), $N_4 = \mathbf{3.76\%} \le 5\%$. N1 Proximity guard ($d \le 85$px). Random Chaser spawn tránh door_3. Fix lật chữ CHASER. Validator 9/9 pass, Playtest Chrome 8/8 frames. |
| ✅ **P0-3** | **Titan Grammar Forge**| Floor 5, Door 2 | $N_4 = \mathbf{20.99\%}$ (Bernoulli) / $\mathbf{37.04\%}$ (Elimination) do 3 cogs, 3 rounds | **✅ ĐÃ HOÀN THÀNH 100%**: 4 cogs ($p=0.25$), 4 rounds ($R=4$), 3 tim persistent ($L \le 2$), $N_4 = \mathbf{3.76\%} \le 5\%$. N1 Proximity guard ($d \le 85$px). Steam Vent reset idle khi retry. Validator 9/9 pass, Playtest Chrome 8/8 frames. |
| ✅ **P0-4** | **Anvil Rush Grammar** | Floor 2, Door 2 | $N_1$ Exploit: `onClick={() => strikeAnvil(idx)}` đập đe từ xa; $N_4 = 20.99\%$ (3 đe, 3 rounds) | **✅ ĐÃ HOÀN THÀNH 100%**: 4 đe ($p=0.25$), 4 rounds ($R=4$), 3 tim persistent ($L \le 2$), $N_4 = \mathbf{3.76\%} \le 5\%$. N1 Proximity guard ($d \le 75$px). Step platforms ($y=410$). Hazard tuần tra Forge Imp (`👺`) an toàn $N_2$ ($11.95$s $\le 22.5$s, margin $+10.55$s). Tách toast UI khỏi banner (hết chồng chữ). Validator 9/9 pass, Playtest Chrome 4 frames khớp 100%. *(Ghi chú: P0-4 margin là ước tính công thức, chưa verify bằng log thật)*. |
| ✅ **P0-5** | **Grand Master Matrix** | Floor 5, Door 0 | $N_1$ Exploit: `onClick={() => harvestNode(node)}` trên Glyph ($N_4 = 3.76\%$ đã đạt chuẩn) | **✅ ĐÃ HOÀN THÀNH 100%**: N1 Proximity guard ($d \le 65$px). Giữ nguyên 4 glyphs ($p=0.25$), 4 rounds ($R=4$), 3 tim ($N_4 = \mathbf{3.76\%} \le 5\%$). Tách transform Glitch Sentinel (giữ chữ GLITCH upright không bị lật khi dir=-1). Validator 9/9 pass, Playtest Chrome 5 frames đạt chuẩn. Margin $+31.28$s. *(Ghi chú: P0-5 margin là ước tính công thức, chưa verify bằng log thật)*. |
| ✅ **P0-6** | **Echo Arena Shooter** | Floor 3, Door 1 | $N_1$ Exploit: Click chuột trực tiếp vào drone; $N_4 = 10.35\%$ (P1-1 hợp nhất) | **✅ ĐÃ HOÀN THÀNH 100%**: Gỡ bỏ click trực tiếp trên orb (`pointer-events: none`), bắt buộc ngắm bắn tia từ Leo (`speed=14`px đạn plasma vàng bay giữa không). Hợp nhất P1-1: 4 orbs/round ($p=0.25$), 4 rounds ($R=4$), 3 tim persistent ($L \le 2$), $N_4 = \mathbf{3.76\%} \le 5\%$. Spacing chống đè $160$px $> 120$px. Jammer bay tầng $y=235$, cách đáy orb $41$px (không che chữ). Tách transform Noise Gremlin (`scaleX(-1)` trên icon, nhãn JAMMER upright). Validator 10/10 pass, Playtest Chrome 6/6 frames đạt chuẩn. |
| ✅ **P1-1** | **Echo Arena Shooter** | Floor 3, Door 1 | $N_4 = 10.35\% > 5\%$ + Jammer spawn đè | **✅ ĐÃ HỢP NHẤT VÀ HOÀN THÀNH CÙNG P0-6** ($N_4 = \mathbf{3.76\%} \le 5\%$, spacing $160$px $> 120$px, clearance $41$px). |
| ✅ **P1-2** | **Storm Shield Defense** | Floor 3, Door 3 | $N_4 = \mathbf{15.29\%} > 5\%$ ($R=5, p=0.45$, 3 tim) do tỷ lệ target $45\%$ quá cao | **✅ ĐÃ HOÀN THÀNH 100%**: 3 tim persistent ($L=2$), $p = 1/3$ (1 Target : 2 Hazards). Mô hình Random Walk chuẩn (ăn hazard bị phạt $-10\%$ pin + trừ 1 tim) $\implies N_4 = \frac{17}{729} \approx \mathbf{2.33\%} \le 5\%$ (chặt chẽ hơn Negative Binomial $\frac{11}{243} = 4.53\%$). *(Ghi chú: $N_4 = \frac{17}{729} \approx 2.33\%$ là CẬN TRÊN tính theo Random Walk thuần, chưa tính pity-timer `hazardStreakRef >= 3` ép spawn target chắc chắn — giá trị thực tế $\le 2.33\%$)*. N1 shield collision ($d < 52$px). Sửa dứt điểm double-fire bằng `meteorsRef.current`. Đã chơi tay thật qua GUI Chrome chứng minh đồng thời tim trừ 1 & pin giảm $10\%$ (`p1_2_storm_hazard_penalty_proof.png`). Validator 8/8 pass, build exit 0. |
| ✅ **P1-5** | **Synonym Storm Defense** | Floor 6, Door 1 | Kế thừa cùng lỗi double-fire template cũ và mô hình N4 cũ ($3.76\%$) tính nhầm trên $p=0.25$ trong khi code là $p=0.45$ ($N_4=15.29\%$) | **✅ ĐÃ HOÀN THÀNH 100%**: Đã xóa double-fire bằng `meteorsRef.current` + `consumedMeteorsRef`. Chuẩn hóa spawn $p=0.25$ (1 synonym : 3 distractors) $\implies N_4 = \frac{211}{16384} \approx \mathbf{1.29\%} \le 5\%$ ($R=5, L=2$, hazard phạt 1 tim, 0% phạt pin vì round-based). *(Ghi chú: $N_4 = \frac{211}{16384} \approx 1.29\%$ là CẬN TRÊN tính theo i.i.d. Bernoulli thuần, chưa tính pity-timer `hazardStreakRef >= 3` ép spawn target chắc chắn — giá trị thực tế $\le 1.29\%$)*. Đã sửa off-by-one HUD `ROUND 0/5` $\to$ `ROUND 1/5...5/5`, bỏ mẫu số cứng và chấm kim cương thừa. Đã sửa dọn sạch hazard khi `phase === 'cleared'`. Chơi tay thật Chrome GUI xác thực: dính hazard "jumped" (-1 tim, pin giữ nguyên 20%, HUD `ROUND 2/5`), hoàn thành ở `ROUND 5/5` (100% pin, 424 XP). Ảnh minh chứng: `f6d1_synonym_storm_hazard_proof.png` và `f6d1_synonym_storm_cleared_proof.png`. |
| ✅ **P1-3** | **Cambridge Cloze Gauntlet** | Floor 5, Door 3 | Overlap 34.5px giữa HUD Overlay và Objective Banner; 2 tinh thể (`safety`, `eating`) spawn đè lên đài tế; bug "ô điền đè text" là ghost bug từ file cũ | **✅ ĐÃ HOÀN THÀNH 100%**: Xóa ghost bug khỏi backlog. Đã hạ `.gauntlet-objective-banner` xuống `top: 92px` (tách rời sạch khỏi HUD 83.5px, khoảng hở $8.5$px). Đã dời tọa độ 2 tinh thể từ bục đài tế sang bục mây cạnh bên (`y: 370`), đài tế 5 ô slot hoàn toàn thông thoáng. Chuẩn hóa nhãn HUD `SEALS: 0/5`. Xác thực Chrome GUI thật trên route production `DailyRoomScreen` (`p1_3_cambridge_cloze_fixed_proof.png` và `p1_3_cambridge_cloze_carrying_proof.png`). Validator pass, build exit 0. |
| 🟡 **P1-4** | **Story Sequencer** | Floor 6, Room 5 | $N_1$: Point-and-click đặt bia, Leo chưa bưng vác vật lý ($N_4 = \mathbf{4.17\%} \le 5\%$ đã duyệt) | Nâng cấp cơ chế bưng vác vật lý (tương tự Word Forge) khi hoàn tất các P0. |

---

## 2. CHI TIẾT KỸ THUẬT TỪNG HẠNG MỤC & CÔNG THỨC TOÁN HỌC

### NHÓM P0 (CRITICAL BUGS — ẢNH HƯỞNG TRỰC TIẾP TÍNH TOÀN VẸN CỦA GAME)

#### P0-1: Chunk Catapult (`src/modules/chronicles/games/ChunkCatapultCanvas.jsx`)
- **Hiện trạng Baseline**: Hoàn toàn không có biến `hearts` / cơ chế Game Over khi bắn trượt. Học sinh có thể kéo ná bắn vô hạn lần đến khi trúng $\implies N_4 \approx 100\%$.
- **Cấu hình chuẩn hóa**:
  - Số rổ/round: Cố định 3 rổ (1 completion đúng + 2 distractors, $p = 1/3, q = 2/3$).
  - Số round: 5 rounds ($R = 5$, tương ứng 5 cặp câu `DEFAULT_PAIRS`) hoặc 6 rounds ($R = 6$, `WEEKLY_CATAPULT_PAIRS`).
  - Mô hình tim: 3 tim persistent dùng chung toàn bộ session ($H = 3$, cho phép tối đa $L = 2$ lần bắn trượt/sai).
- **Công thức toán học đầy đủ (Negative Binomial)**:
  $$P(\text{pass}) = \sum_{k=0}^{L} \binom{R - 1 + k}{k} p^R q^k$$
  - **Với $R = 5$ rounds, $p = 1/3$, 3 tim ($L = 2$)**:
    - $k = 0$: $\binom{4}{0} (1/3)^5 (2/3)^0 = \frac{1}{243} \approx 0.41\%$
    - $k = 1$: $\binom{5}{1} (1/3)^5 (2/3)^1 = 5 \times \frac{2}{729} = \frac{10}{729} \approx 1.37\%$
    - $k = 2$: $\binom{6}{2} (1/3)^5 (2/3)^2 = 15 \times \frac{4}{2187} = \frac{60}{2187} \approx 2.74\%$
    - $\implies N_4(R=5) = \frac{9 + 30 + 60}{2187} = \frac{99}{2187} = \frac{11}{243} \approx \mathbf{4.53\%} \le 5\%$ ✅ **ĐẠT CHUẨN**.
  - *(Lưu ý: Nếu chỉ chơi 4 rounds thì $N_4 = \frac{73}{729} \approx 10.01\% > 5\%$, do đó game BẮT BUỘC phải chơi tối thiểu 5 rounds).*

#### P0-2: Riddle Run (`src/modules/quest/RiddleRunMaze.jsx`) & P0-3: Titan Grammar Forge (`src/modules/quest/TitanGrammarForge.jsx`)
- **Phân tích bản chất Template**: Cả Riddle Run và Titan Grammar Forge (cùng Anvil Rush) chia sẻ **CÙNG 1 TEMPLATE KỸ THUẬT: "Platformer MCQ 3-Node"**.
  - *(Lưu ý về Syntax Express Rail: Đã được đóng băng thành công ở Batch 1 với cấu hình 6 rounds, 2 tim persistent; cơ chế đứng nguyên tại ngã rẽ khi sai tuân theo Negative Binomial với $N_4 = \frac{5}{729} \approx \mathbf{0.686\%} \le 5\%$, hoàn toàn đạt chuẩn và không thuộc danh sách cần sửa)*.
  - Hiện tại: 3 lựa chọn ($p = 1/3$), 3 rounds ($R = 3$), 3 tim persistent.
  - $N_4$ hiện tại: Bernoulli độc lập $= \frac{17}{81} \approx \mathbf{20.99\%}$; nếu đoán loại trừ trong round $= \frac{10}{27} \approx \mathbf{37.04\%}$ (hoàn toàn không phải $70.37\%$ — con số $70.37\%$ là hiểu nhầm của $1 - (2/3)^3$).
  - *Đính chính*: Tim KHÔNG reset mỗi round, biến tim được giữ nguyên.
- **Giải pháp kỹ thuật DUY NHẤT thống nhất cho Template này**:
  - **Phương án chọn**: Tăng lên **4 lựa chọn/round** (4 cửa Sanctuary / 4 bánh răng Cogs, $p = 0.25$) VÀ tăng lên **4 rounds** ($R = 4$), giữ 3 tim persistent ($L = 2$).
- **Công thức toán học đầy đủ**:
  $$P(\text{pass}) = \sum_{k=0}^{2} \binom{3 + k}{k} (0.25)^4 (0.75)^k$$
  - $k = 0$: $\binom{3}{0} (0.25)^4 = \frac{1}{256} \approx 0.39\%$
  - $k = 1$: $\binom{4}{1} (0.25)^4 (0.75)^1 = \frac{3}{256} \approx 1.17\%$
  - $k = 2$: $\binom{5}{2} (0.25)^4 (0.75)^2 = \frac{5.625}{256} \approx 2.20\%$
  - $\implies N_4 = \frac{1 + 3 + 5.625}{256} = \frac{9.625}{256} = \mathbf{3.7598\%} \approx \mathbf{3.76\%} \le 5\%$ ✅ **ĐẠT CHUẨN**.

#### P0-4: Anvil Rush Grammar (`src/modules/quest/AnvilRushGrammar.jsx`)
- **Hiện trạng**: `onClick={() => strikeAnvil(idx)}` cho phép dập đe từ xa mà không cần Leo chạy lại; chia sẻ cùng template 3 đe rèn ($N_4 = 20.99\%$).
- **Kế hoạch sửa**:
  1. Gỡ bỏ hoàn toàn `onClick` trên đe; chỉ cho phép dập đe khi $d(\text{Leo}, \text{Anvil}) \le 75$px.
  2. Nâng cấp lên 4 đe rèn, 4 trials, 3 tim persistent $\to N_4 = \mathbf{3.76\%} \le 5\%$.

#### P0-5: Grand Master Matrix (`src/modules/quest/GrandMatrixDungeon.jsx`)
- **Hiện trạng**: Dòng 548 `onClick={() => harvestNode(node)}` trên `.matrix-glyph-entity` bỏ qua khoảng cách của Leo. $N_4 = 3.76\%$ đã chuẩn xác ($R=4, p=0.25, L=2$).
- **Kế hoạch sửa**: Gỡ bỏ `onClick`; bắt buộc kích hoạt cận chiến khi $d < 65$px qua phím `E` hoặc Tap.

#### P0-6: Echo Arena Shooter (`src/modules/quest/EchoArenaShooter.jsx`)
- **Hiện trạng**: Click chuột trực tiếp lên drone đang bay để bắn hạ từ xa mà không cần định hướng súng.
- **Kế hoạch sửa**: Bắt buộc bắn đạn có quỹ đạo từ vị trí nòng súng của Leo về hướng chỉ định.

---

### NHÓM P1 (HIGH RISKS & QUALITY ENHANCEMENTS)

#### P1-1: Echo Arena Shooter (N4 & Jammer Collision)
- **Hiện trạng**: Cấu hình hiện tại có 4 orbs nhưng có tới 2 orbs đúng ($p = 2/4 = 0.5$) trong 3 rounds $\to N_4 \gg 5\%$. Nếu đổi thành 1 đúng 3 sai ($p = 0.25$) nhưng chỉ có 3 rounds với 3 tim thì $N_4 = \frac{53}{512} \approx \mathbf{10.35\%} > 5\%$.
- **Kế hoạch sửa chuẩn hóa**:
  - Cấu hình: 4 drones/round (1 drone âm đúng, 3 drones distractors, $p = 0.25$).
  - Nâng lên **4 rounds** ($R = 4$), giữ 3 tim persistent ($L = 2$):
    $$N_4 = \sum_{k=0}^2 \binom{3+k}{k} (0.25)^4 (0.75)^k = \frac{9.625}{256} = \mathbf{3.76\%} \le 5\% \quad \text{✅ ĐẠT CHUẨN}$$
  - Thêm thuật toán kiểm tra khoảng cách spawn giữa các drone và Jammer `minDist > 120`px chống va chạm trùng tọa độ.

#### P1-2: Storm Shield Defense (`src/modules/quest/StormShieldDefense.jsx`)
- **Hiện trạng Baseline**: $R = 5$ lần sạc battery (+20%/lần), tỷ lệ target $p = 0.45$, hazard $q = 0.55$, 3 tim ($L = 2$).
  $$N_4 = \sum_{k=0}^2 \binom{4+k}{k} (0.45)^5 (0.55)^k = (0.45)^5 [1 + 2.75 + 4.5375] = 0.018453 \times 8.2875 = \mathbf{15.29\%} > 5\%$$
- **Phương án Chốt & Toán học N4**:
  - Giữ nguyên 3 tim persistent ($L = 2$), chuẩn hóa tỷ lệ spawn $p = 1/3$, hazard $q = 2/3$.
  - Negative Binomial $R=5, p=1/3, L=2$:
    $$N_4 = \binom{4}{0}(1/3)^5 + \binom{5}{1}(1/3)^5(2/3) + \binom{6}{2}(1/3)^5(4/9) = \frac{1 + 10/3 + 20/3}{243} = \frac{11}{243} \approx \mathbf{4.53\%} \le 5\% \quad \text{✅ ĐẠT CHUẨN}$$
- **Phát hiện Bug Double-Fire & Sửa lỗi gốc (2026-09-15)**:
  - *Root Cause*: Side-effects (`setBatteryCharge`, `setScore`, `speakText`, `console.log`) được đặt bên trong functional updater `setMeteors(prev => ...)`. Trong `<React.StrictMode>`, React chạy updater 2 lần liên tiếp dẫn đến handler battery cộng 2 lần (+40%/va chạm thay vì +20%), khiến runtime chỉ cần $R=3$ va chạm thật đã thắng.
  - *Fix*: Chuyển toàn bộ physics và lifecycle thiên thạch sang `meteorsRef.current` và `consumedMeteorsRef`, tách rời 100% side-effects ra khỏi updater, bảo đảm mỗi va chạm vật lý phát ra đúng 1 event duy nhất.
  - *Chơi thật Keyboard Navigation qua Chrome GUI*: Đã thực hiện playtest bằng phím điều hướng thật (`ArrowLeft`, `ArrowRight`, `ArrowUp`), đo đủ 5 lần va chạm thật $R=5$ ($20\% \to 40\% \to 60\% \to 80\% \to 100\%$) với ảnh chụp minh chứng `p1_2_storm_manual_keyboard_play.png` và `p1_2_storm_manual_cleared.png`.

#### P1-3: Cambridge Cloze Gauntlet (`src/modules/quest/CambridgeClozeGauntlet.jsx`)
- **Hiện trạng kiểm chứng**: Bug "ô điền từ đè dòng text" là ghost bug từ file cũ `CambridgeClozeGame.jsx` (đã xóa khỏi backlog). Bug layout thật gồm 2 điểm: HUD đè Banner 34.5px và 2 tinh thể (`safety`, `eating`) spawn đè lên đài tế.
- **Giải pháp tối giản đã thực hiện**:
  1. Đã hạ `.gauntlet-objective-banner` xuống `top: 92px` (tách rời sạch khỏi HUD 83.5px, khoảng hở $8.5$px).
  2. Đã dời tọa độ 2 tinh thể từ bục đài tế (`y: 220`) sang bục mây cạnh bên (`y: 370`), đài tế 5 ô slot hoàn toàn thông thoáng.
  3. Chuẩn hóa nhãn HUD `SEALS: 0/5` (tránh nhầm lẫn `ROUND 0/5`).
- **Bằng chứng playtest Chrome thật**: Chạy trên route production `DailyRoomScreen` Floor 5 Door 3 (`p1_3_cambridge_cloze_fixed_proof.png`, `p1_3_leo_carrying_crystal_proof.png` và `p1_3_slot_bound_success_proof.png`). Build exit 0.
- **⚠️ Hạng mục Nợ Nội Dung (Content Debt - Tách riêng)**: `DEFAULT_GAUNTLET_PASSAGE` hiện tại là fallback tĩnh dùng cho MỌI tuần (156/156) do chưa có service biên soạn `clozeData` riêng cho từng tuần (lỗ hổng nội dung hệ thống tương tự Chunk Catapult trước đây). Không chặn đóng băng phần fix layout/gameplay P1-3, cần mở ticket nội dung riêng để biên soạn data 156 tuần.

#### P1-4: Story Sequencer (`src/modules/quest/StoryAltarPuzzle.jsx`)
- **Hiện trạng**: Gameplay dạng Point-and-Click puzzle tĩnh, Leo chưa có hành vi bưng vác vật lý.
- **Toán học xác suất N4 chuẩn duyệt ($4.17\%$)**:
  - 5 bia đá vào 5 bệ thờ ($5! = 120$ hoán vị), 2 tim ($L \le 1$ lần đặt sai tối đa).
  - $P(\text{pass}) = P(\text{0 lỗi}) + P(\text{1 lỗi})$:
    - $P(\text{0 lỗi}) = \frac{1}{5!} = \frac{1}{120} \approx 0.833\%$ (đặt đúng ngay lần đầu cho cả 5 bia).
    - $P(\text{1 lỗi}) = 4 \times \frac{1}{120} = \frac{4}{120} \approx 3.333\%$ (lỗi xảy ra ở 1 trong 4 bệ đầu, lần thử tiếp theo đặt đúng và các bệ sau không sai).
    - $\implies N_4 = \frac{1 + 4}{120} = \frac{5}{120} = \frac{1}{24} = \mathbf{4.1667\%} \approx \mathbf{4.17\%} \le 5\%$ ✅ **ĐẠT CHUẨN ĐÃ DUYỆT**.
- **Kế hoạch sửa**: Tái cấu trúc cơ chế bưng vác vật lý tương tự `WordForgeCarryEngine` sau khi đã xử lý xong toàn bộ P0.

---

## 3. NGUYÊN TẮC BẤT BIẾN KHI THỰC HIỆN CODE FIX
1. **Toán học trước (Math Pre-Check)**: Bắt buộc giải đúng công thức xác suất $N_4 \le 5\%$ trên spec trước khi chạm vào bất kỳ dòng code nào. Tuyệt đối không sao chép con số mẫu giữa các cấu hình khác nhau.
2. **Automated Validator**: Chạy script lint/unit test kiểm tra triệt tiêu `onClick` từ xa và bảo đảm `hearts` không reset giữa chừng.
3. **Puppeteer Evidence**: Bắt buộc có kịch bản chạy Chrome GUI thật ghi nhận đủ 3 frame: `spawn` $\to$ `correct` $\to$ `wrong` (chứng minh tim trừ thật và KO khi hết tim).

