# BÁO CÁO PLAYTEST THỰC TẾ CHROME GUI — BATCH 2 (SHAPE D: STATIC CHAMBERS)
*Dự án EngQuest3K — Baseline Evidence Gathering (Trạng thái hiện tại chưa sửa code)*  
*Thời gian thực hiện: 2026-09-13T19:16:00+07:00*  
*Môi trường: Google Chrome Desktop GUI thật (`/Applications/Google Chrome.app`, `headless: false`), Viewport 1280×800*

---

## 1. TỔNG QUAN THỰC HIỆN BATCH 2

Theo đúng quy trình kiểm chứng thực tế đã được chuẩn hoá từ Batch 1, toàn bộ 4 mini-game thuộc **Batch 2 (Nhóm Shape D — Static Chambers / Phòng Thí Nghiệm Đóng)** đã được kiểm thử trực tiếp bằng Chrome GUI thật ở trạng thái hiện tại (chưa can thiệp sửa code logic):

1. **ScrollChamberDecode** (Floor 2 • Door 3) — Giải mã cuộn văn bản cổ (4 chỗ trống / 8 viên đá).
2. **ShadowVaultInfiltrate** (Floor 1 • Door 3) — Đột nhập kho két sắt (4 từ vựng / 4 định nghĩa / 2 robot tuần tra).
3. **PotionFlipDungeon** (Floor 2 • Door 1) — Ghép đôi vạc thuốc trí nhớ (8 vạc thuốc / Lab Gremlin tuần tra).
4. **CambridgeClozeGauntlet** (Floor 5 • Door 3) — Đài phong ấn Apex Monument (5 chỗ trống Cambridge / 10 tinh thể / Astral Watcher).

Đủ **12/12 khoảnh khắc** (3 khoảnh khắc chuẩn per game: **Spawn**, **Correct**, **Wrong** tim giảm còn 2/3 không KO) đã được chụp, kiểm tra trực quan từng ảnh bằng công cụ `view_file`, và đối soát khớp 100% với nhãn nội dung trước khi đưa vào báo cáo.

---

## 2. BẰNG CHỨNG HÌNH ẢNH & ĐÁNH GIÁ CHI TIẾT TỪNG GAME

---

### 🎮 GAME 1: SCROLL CHAMBER DECODE (Floor 2 • Door 3)

#### A. Bộ 3 Bằng Chứng Thực Tế
![Scroll Chamber Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_scroll_spawn.png)
*Hình 1.1: `b2_real_scroll_spawn.png` — Spawn ban đầu: 3 tim đỏ (3/3), 0 XP, Timer 1:59, 4 chỗ trống `[?]`, 8 viên đá phân bố trên sàn và bục đá, Leo ở vị trí trung tâm sàn.*

![Scroll Chamber Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_scroll_correct.png)
*Hình 1.2: `b2_real_scroll_correct.png` — Phản hồi ĐÚNG: Banner xanh lá `✨ "corridor" Bound to Scroll!`, tích lũy +40 XP (40 XP), 3 tim nguyên vẹn (3/3), chỗ trống 0 được khoá bằng đá ngọc xanh.*

![Scroll Chamber Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_scroll_wrong.png)
*Hình 1.3: `b2_real_scroll_wrong.png` — Phản hồi SAI: Banner đỏ `⚡ "Smooth" rejected by ancient seal!`, tim giảm còn 2/3 (`❤️❤️🖤`), 0 XP, không bị KO.*

#### B. Trả Lời 4 Câu Hỏi Quan Sát Trung Thực
1. **Phản hồi điều khiển có tốt không?**  
   - Điều khiển bàn phím (`ArrowLeft`, `ArrowRight`, `ArrowUp` nhảy, `Space` nhặt/gắn) hoạt động tức thì. Tuy nhiên, cơ chế vật lý platformer khá thô cứng: không có coyote time (thời gian đệm mép bục), hitbox của bục đá nhỏ khiến Leo rất dễ trượt chân rơi xuống sàn, buộc học sinh phải nhảy lại nhiều lần để leo lên bàn tế tự (Scroll Table).
2. **Nhịp độ có hợp lý cho trẻ 6-10 tuổi không?**  
   - **Chưa hợp lý / Tải nhận thức quá cao (Cognitive Overload)**: Cuộn văn bản chứa một đoạn văn dài ~35 từ ngữ cảnh liên môn. Học sinh 6-10 tuổi vừa phải đọc hiểu đoạn văn, vừa phải đọc 8 viên đá phân tán, vừa phải điều khiển Leo nhảy platformer né gai/bẫy. Việc tách sự chú ý giữa thao tác vận động (motor skills) và đọc hiểu ngữ pháp làm gián đoạn dòng suy nghĩ ngôn ngữ.
3. **Có thể đoán mò thắng được không?**  
   - **KHÔNG THỂ ĐOÁN MÒ**: Game có cơ chế trừ tim nghiêm ngặt (`setHearts(h => h - 1)`). Với 8 viên đá (4 đúng, 4 gây nhiễu) cho 4 ô trống, người chơi chỉ có 3 tim (được sai tối đa 2 lần). Xác suất bấm bừa trúng cả 4 ô theo đúng thứ tự là $\frac{1}{8} \times \frac{1}{7} \times \frac{1}{6} \times \frac{1}{5} \approx 0.059\%$.
4. **Bug / Lỗi hiển thị phát hiện được:**  
   - **Lệch kích thước ô trống ($\Delta \ne 0$)**: Kích thước các khung `[?]` trên thanh cuộn không đồng nhất mà bị co giãn theo font chữ dự kiến, vô tình tạo gợi ý về độ dài từ cần điền.
   - **Xuyên bục lửng (Edge collision glitch)**: Khi Leo nhảy cọ sát vào mép dưới bục, thỉnh thoảng bị kẹt đầu hoặc rơi xuyên qua bục do hàm kiểm tra va chạm trục $Y$ đơn giản.

---

### 🎮 GAME 2: SHADOW VAULT INFILTRATE (Floor 1 • Door 3)

#### A. Bộ 3 Bằng Chứng Thực Tế
![Shadow Vault Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_shadow_spawn.png)
*Hình 2.1: `b2_real_shadow_spawn.png` — Spawn ban đầu: 3 tim đỏ (3/3), 0 XP, Timer 1:29, 4 két từ vựng bên trái, 4 két định nghĩa bên phải, 2 robot bảo vệ tuần tra ở giữa.*

![Shadow Vault Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_shadow_correct.png)
*Hình 2.2: `b2_real_shadow_correct.png` — Phản hồi ĐÚNG: Banner xanh lá `🔓 VAULT UNLOCKED! "clumsy" correctly matched! (+30 XP)`, tích luỹ 30 XP, 3 tim (3/3), két định nghĩa bên phải bật dấu kiểm xanh.*

![Shadow Vault Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_shadow_wrong.png)
*Hình 2.3: `b2_real_shadow_wrong.png` — Phản hồi SAI / VA CHẠM: Banner cảnh báo `🚨 SPOTTED! Cargo dropped back to vault safe!`, tim giảm còn 2/3 (`❤️❤️🖤`), Leo nhấp nháy bất tử sau khi va chạm robot bảo vệ tuần tra dưới sàn, 0 XP, không bị KO.*

#### B. Trả Lời 4 Câu Hỏi Quan Sát Trung Thực
1. **Phản hồi điều khiển có tốt không?**  
   - 🔴 **BUG NGHIÊM TRỌNG TRÊN DESKTOP (Pointer Events Blocker)**: File CSS `ShadowVaultInfiltrate.css` đặt `.vault-gesture-layer` ở `z-index: 35; pointer-events: auto;` phủ toàn bộ màn hình, trong khi các két sắt chỉ ở `z-index: 20`. Kết quả: **Người chơi dùng chuột click vào các két sắt KHÔNG HỀ CÓ PHẢN HỒI NÀO**! Chuột bị chặn 100%. Người chơi chỉ có thể dùng bàn phím điều khiển Leo đi bộ va chạm cơ học vào két sắt.
2. **Nhịp độ có hợp lý cho trẻ 6-10 tuổi không?**  
   - **Chưa hợp lý**: Khối định nghĩa bên phải viết bằng tiếng Anh học thuật khá dài (ví dụ: *"A soft piece of cloth used to cover and protect a cut or knee injury"* — 14 từ). Cỡ chữ hiển thị trong két sắt bên phải khá nhỏ, trẻ 6-10 tuổi phải dừng lại giữa phòng để đọc trong khi robot bảo vệ liên tục tuần tra qua lại gây áp lực vô lý.
3. **Có thể đoán mò thắng được không?**  
   - ⚠️ **LỖ HỔNG ĐOÁN MÒ LỚN (Zero Heart Penalty for Wrong Match)**: Kiểm tra code `handleDeliverAttempt()` tại dòng 358-369 của `ShadowVaultInfiltrate.jsx`:
     ```javascript
     } else {
       // Wrong safe!
       setVaultFeedback(`❌ Wrong Definition Safe! Look carefully!`);
       guardsRef.current.forEach(g => { g.vx = g.vx * 1.5; });
     ```
     **Chạm sai két định nghĩa KHÔNG HỀ BỊ TRỪ TIM!** Hệ thống chỉ hiển thị banner cảnh báo và tăng tốc độ robot lên $1.5\times$. Tim chỉ bị trừ khi Leo va chạm trực tiếp vào robot. Do đó, người chơi hoàn toàn có thể bốc 1 từ ở két trái rồi chạy sang phải thử lần lượt cả 4 két bên phải (brute-force trial) mà không sợ thua!
4. **Bug / Lỗi hiển thị phát hiện được:**  
   - Lớp `.vault-gesture-layer` chặn click chuột trên máy tính.
   - Không có hình phạt tim cho câu trả lời sai về mặt học thuật.
   - Khi robot tăng tốc $1.5\times$, nếu gặp mép bục đôi khi bị hiện tượng giật rung (jittering) qua lại tại điểm đảo chiều.

---

### 🎮 GAME 3: POTION FLIP DUNGEON (Floor 2 • Door 1)

#### A. Bộ 3 Bằng Chứng Thực Tế
![Potion Flip Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_potion_spawn.png)
*Hình 3.1: `b2_real_potion_spawn.png` — Spawn ban đầu: 3 tim đỏ (3/3), 0 XP, Timer 1:29, 8 vạc thuốc đóng nắp, quái vật Lab Gremlin bò tuần tra dưới sàn, Leo đứng ở sàn trung tâm.*

![Potion Flip Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_potion_correct.png)
*Hình 3.2: `b2_real_potion_correct.png` — Phản hồi ĐÚNG: Banner xanh lá `✨ POTION BREWED! Matched "rubber soles" (+25 XP)`, tích luỹ 25 XP, 3 tim (3/3), 2 vạc thuốc mở nắp phát sáng xanh vĩnh viễn.*

![Potion Flip Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_potion_wrong.png)
*Hình 3.3: `b2_real_potion_wrong.png` — Phản hồi SAI: Banner xám tro `🧪 Poison gas! Cauldrons closing in 1.5s...`, tim giảm còn 2/3 (`❤️❤️🖤`) do Leo tiếp xúc quái vật Gremlin, 0 XP, không bị KO.*

#### B. Trả Lời 4 Câu Hỏi Quan Sát Trung Thực
1. **Phản hồi điều khiển có tốt không?**  
   - 🔴 **BUG TƯƠNG TỰ VỀ POINTER EVENTS**: Lớp `.potion-gesture-layer` (`z-index: 35`) nằm đè lên các vạc thuốc (`z-index: 20`). Học sinh dùng chuột click vào vạc thuốc trên desktop hoàn toàn KHÔNG THỂ LẬT ĐƯỢC THẺ! Bắt buộc phải điều khiển Leo nhảy đụng vào từng vạc thuốc.
2. **Nhịp độ có hợp lý cho trẻ 6-10 tuổi không?**  
   - **Rất gượng ép & Ức chế vận động**: Trò chơi lật thẻ nhớ (Concentration / Memory Match) bản chất là game giải đố tĩnh. Việc ép học sinh phải điều khiển Leo nhảy qua 3 tầng bục đá để đi từ vạc A sang vạc B mất từ 8-12 giây. Trong khi đó, vạc A sau khi mở sẽ tự đóng lại nếu quá thời gian hoặc học sinh quên vị trí do bận tập trung né Gremlin dưới sàn.
3. **Có thể đoán mò thắng được không?**  
   - ⚠️ **CỰC KỲ DỄ ĐOÁN MÒ (Brute-Force Flipping)**: Lật sai 2 vạc thuốc KHÔNG BỊ PHẠT TIM! Game chỉ đóng nắp vạc lại sau 1.5 giây. Vì chỉ có 8 vạc thuốc (4 cặp), học sinh chỉ cần chạy quanh lật ngẫu nhiên liên tục là sẽ giải xong toàn bộ bài trong vòng 40 giây mà không cần đọc hiểu từ vựng hay định nghĩa!
4. **Bug / Lỗi hiển thị phát hiện được:**  
   - Chặn click chuột trên desktop.
   - Bong bóng hiển thị định nghĩa trên vạc thuốc quá nhỏ, các định nghĩa dài bị cắt chữ (text overflow/ellipsis) hoặc che khuất tầm nhìn của Leo.

---

### 🎮 GAME 4: CAMBRIDGE CLOZE GAUNTLET (Floor 5 • Door 3)

#### A. Bộ 3 Bằng Chứng Thực Tế
![Cambridge Cloze Spawn](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_cloze_spawn.png)
*Hình 4.1: `b2_real_cloze_spawn.png` — Spawn ban đầu: 3 tim đỏ (3/3), 0 XP, Timer 1:59, đài tế Zenith Star Monument ở trung tâm với 5 ô phong ấn, 10 tinh thể từ vựng trên các bục, quái vật Astral Watcher tuần tra.*

![Cambridge Cloze Correct](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_cloze_correct.png)
*Hình 4.2: `b2_real_cloze_correct.png` — Phản hồi ĐÚNG: Banner xanh lá `🌟"investigation" Bound to Apex Monument!`, tích luỹ +45 XP (45 XP), 3 tim nguyên vẹn (3/3), ô khuyết đầu tiên được phong ấn thành công.*

![Cambridge Cloze Wrong](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/b2_real_cloze_wrong.png)
*Hình 4.3: `b2_real_cloze_wrong.png` — Phản hồi SAI: Banner đỏ `⚡ "sugar" rejected by Zenith seal!`, tim giảm còn 2/3 (`❤️❤️🖤`), 0 XP, tinh thể gây nhiễu "sugar" bị từ chối, không KO.*

#### B. Trả Lời 4 Câu Hỏi Quan Sát Trung Thực
1. **Phản hồi điều khiển có tốt không?**  
   - Bàn phím điều khiển nhạy, đài tế trung tâm có diện tích tiếp xúc lớn giúp thao tác nạp tinh thể (`Space` hoặc chạm) dễ thực hiện hơn so với `ScrollChamberDecode`.
2. **Nhịp độ có hợp lý cho trẻ 6-10 tuổi không?**  
   - **Tải nhận thức cực hạn (Extreme Cognitive Overload)**: Đề bài Cloze Test Cambridge Flyers yêu cầu học sinh đọc hiểu một văn bản học thuật gồm 5 chỗ khuyết ngữ pháp phức tạp. Tuy nhiên, thay vì tập trung vào văn bản, học sinh phải điều khiển nhân vật chạy nhảy qua 4 bục lơ lửng, tránh quái vật Astral Watcher bay theo đường cong sin. Khi bị quái vật đụng phải hoặc chọn sai từ, học sinh bị trừ tim ngay lập tức. Đây là sự kết hợp khiên cưỡng giữa bài thi chứng chỉ Cambridge và game hành động platformer.
3. **Có thể đoán mò thắng được không?**  
   - **KHÔNG THỂ ĐOÁN MÒ**: Có 10 tinh thể (5 từ đúng, 5 từ gây nhiễu). Mỗi lần chọn sai một tinh thể bị trừ 1 tim ngay lập tức. Với 3 tim (cho phép sai tối đa 2 lần), xác suất học sinh bấm bừa thắng được 5 chỗ trống liên tiếp là xấp xỉ $0.03\%$.
4. **Bug / Lỗi hiển thị phát hiện được:**  
   - **Lệch độ dài từ vựng ($\Delta \ne 0$)**: Tinh thể "investigation" dài 13 chữ cái trong khi "sugar" chỉ có 5 chữ cái; độ rộng của ô trống trên đài tế bị co giãn theo chữ mẫu, tạo kẽ hở đoán từ dựa trên độ dài.
   - Astral Watcher bay xuyên qua chân đài tế mà không có tương tác hình học vật lý thực tế.

---

## 3. TỔNG HỢP CÁC LỖI NỀN TẢNG CẦN KHẮC PHỤC (BASELINE DEFECT AUDIT)

Qua kiểm thử thực tế 4 game Batch 2, chúng tôi ghi nhận 4 khiếm khuyết hệ thống cần đưa vào hồ sơ thiết kế lại (Redesign Baseline):

| Nhóm Lỗi | Game Bị Ảnh Hưởng | Chi Tiết Lỗi Gốc & Bằng Chứng Mã Nguồn |
|---|---|---|
| **1. Chặn click chuột Desktop (Pointer Events Bug)** | `ShadowVaultInfiltrate`, `PotionFlipDungeon` | `.vault-gesture-layer` và `.potion-gesture-layer` có `z-index: 35; pointer-events: auto;` phủ kín màn hình, đè lên các két sắt và vạc thuốc (`z-index: 20`). Chuột máy tính bị vô hiệu hoá hoàn toàn. |
| **2. Triệt tiêu hình phạt học thuật (Guess Exploit)** | `ShadowVaultInfiltrate`, `PotionFlipDungeon` | Chọn sai két hoặc lật sai vạc thuốc **KHÔNG BỊ TRỪ TIM**. Học sinh có thể bấm bừa thử sai 100% để vượt qua màn chơi mà không cần học từ vựng. |
| **3. Lệch độ dài ký tự ($\Delta \ne 0$)** | `ScrollChamberDecode`, `CambridgeClozeGauntlet` | Kích thước ô trống co giãn theo độ dài từ vựng cần điền (`investigation` vs `sugar`), làm lộ đáp án qua hình học thị giác. |
| **4. Xung đột Sư phạm & Vận động (Pedagogical Overload)** | Toàn bộ 4 game Batch 2 | Ép buộc bài tập đọc hiểu chuyên sâu (Cambridge Cloze, Reading Scroll) vào cơ chế nhảy platformer né quái vật, gây phân mảnh chú ý nghiêm trọng cho trẻ 6-10 tuổi. |

---

## 4. KẾT LUẬN & ĐỀ XUẤT BƯỚC TIẾP THEO

- **Batch 2 (Shape D)** đã hoàn thành việc thu thập bằng chứng baseline với 12/12 ảnh thật, 0 hallucination, không sửa code game.
- Hồ sơ baseline này xác nhận rõ: **Cả 4 game Shape D đều đang chịu lỗi thiết kế nghiêm trọng về tải nhận thức hoặc lỗ hổng đoán mò**, cần được đưa vào kế hoạch Redesign theo đúng lộ trình sau khi hoàn thành audit toàn bộ 21 game.
- **Sẵn sàng chuyển sang Batch 3**: `BubbleStormChase`, `WordWagonJump`, `Anvil Rush`, `Riddle Run Maze`, `Titan Grammar Forge`.
