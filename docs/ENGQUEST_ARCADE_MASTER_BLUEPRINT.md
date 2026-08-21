# 🕹️ ENGQUEST3K ARCADE ROOM — MASTER BLUEPRINT & FROZEN STANDARD
**Phiên bản:** Golden Master 3.0 — **Ngày đóng băng:** 2026-08-21  
**Phạm vi áp dụng:** Toàn bộ hệ thống Mini-Games Arcade từ W01 đến W72 và các module mở rộng về sau.

---

## 1. 🎯 TRIẾT LÝ SƯ PHẠM & CƠ CHẾ NĂNG LƯỢNG (CORE PILLARS)

### 1.1. Chu kỳ Nghỉ giải lao Não bộ (Brain Break Cycle)
- **Chu kỳ học tập theo lứa tuổi:**
  - *G1 (W01–W10):* 10 phút học (600s).
  - *G2 (W11–W20):* 12 phút học (720s).
  - *G3 (W21–W32):* 15 phút học (900s).
  - *G4–G5 (W33+):* 18 phút học (1080s).
- **Tự động nhắc nhở nghỉ ngơi (`ArcadeBreakPromptModal`):**
  - Khi học sinh đạt ngưỡng học tập tích lũy của chu kỳ, hệ thống kích hoạt Popup hỏi nhẹ nhàng với Cáo Lexio 🦊:  
    `"Wanna play some mini game to relax?"` kèm 2 nút: `🕹️ PLAY MINI GAME (3 MINS)` và `Skip / Keep Studying`.
- **Cơ chế thưởng Pin tích lũy trong ngày (Cumulative Study Rewards):**
  - Đạt **30 phút học** $\rightarrow$ Thưởng $+5$ phút Pin game (+300s).
  - Đạt **45 phút học** $\rightarrow$ Thưởng thêm $+5$ phút Pin game (+300s).
  - Đạt **60 phút học** $\rightarrow$ Thưởng thêm $+5$ phút Pin game (+300s).

### 1.2. Chuẩn hóa Thời lượng Phiên chơi 3 Phút (180 Giây)
- **180 giây per Game Session:** Thay thế chuẩn 1 phút cũ bằng chuẩn **3 phút (180 giây)** để học sinh có trải nghiệm trọn vẹn, không bị hối thúc hay áp lực thời gian quá ngắn.
- **Banner chào mừng chuẩn trong Arcade Room:**  
  `"⚡ You have 3 minutes to play any mini game! · Trip XX Content"`

### 1.3. Thước đo Phản xạ Tức thì & Thử thách Tốc độ (Speed & Speedrun Attack)
1. **Phản xạ Tức thì (Instant Retrieval / Automaticity):**
   - Đo thời gian từ lúc mục tiêu xuất hiện đến lúc học sinh bấm/bắn trúng (`reactionSec`).
   - Nếu $\text{reactionSec} \le 1.5\text{s}$ (hoặc $\le 2.0\text{s}$): Thưởng danh hiệu **`⚡ LIGHTNING REFLEX`** kèm $+5$ điểm tốc độ.
   - Ghi nhận kỷ lục phản xạ tốt nhất (`bestReactionTimes`).
2. **Thử thách Speedrun Time Attack (Hoàn thành sớm toàn bộ mục tiêu):**
   - Khi hoàn thành đủ Target Goal (20 từ / 15 thiên thạch / toàn bộ câu) trước 180s:
     - Kích hoạt **Chiến thắng Speedrun sớm** với danh hiệu **`⚡ SPEEDRUN CHAMPION — ALL CLEARED!`**.
     - **Thưởng điểm thời gian còn lại:** Mỗi giây còn lại quy đổi thành **$+2$ điểm thưởng**.
     - Ghi nhận kỷ lục thời gian hoàn thành (`bestSpeedrunTimes`).

---

## 2. 🦊 HỆ SINH THÁI LINH VẬT CÁO ĐỎ LEXIO (MASCOT COMPANION)

Mọi trò chơi Arcade bắt buộc tích hợp linh vật Cáo Lexio 🦊 theo 2 tầng tương tác:

```
                  ┌──────────────────────────────────────────────┐
                  │          LEXIO MASCOT COMPANION             │
                  └──────────────────────┬───────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     [TẦNG 1: BASE BOT-LEFT]                         [TẦNG 2: FLYING TARGET TRACKER]
- Tọa độ cố định: Bottom: 14px, Left: 16px.     - Xuất hiện khi học sinh phân vân ≥ 7s.
- Nút bấm Mascot tròn bán kính 54px.            - Bay lơ lửng ngay trên mục tiêu đúng.
- Bấm vào để nhận gợi ý tức thì.                - Chỉ tay trực quan: "🦊 Here! Laser this one! 👇"
- Hiển thị bóng thoại + animation nhảy.         - Tự động biến mất khi hoàn thành round.
```

- **Quy tắc gợi ý (No Preachy / Clean ESL):**  
  Bóng thoại ngắn gọn, rõ ràng: `🦊 Laser the "corridor" meteor! (hành lang)` hoặc `🦊 Pop the "ancient" bubble!`.

---

## 3. 🕹️ THIẾT KẾ CHI TIẾT 4 TRÒ CHƠI NỀN TẢNG (THE CORE FOUR)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 4 TRÒ CHƠI ARCADE NỀN TẢNG W33+                                 │
├───────────────────────┬───────────────────────┬────────────────────────┬────────────────────────┤
│ 🫧 GAME 1             │ 🛸 GAME 2             │ 🏎️ GAME 3              │ 🎯 GAME 4              │
│ Bubble Pop Dash       │ Meteor Smasher        │ Highway Road Runner    │ Catapult Chunk Match   │
├───────────────────────┼───────────────────────┼────────────────────────┼────────────────────────┤
│ Phản xạ từ đơn        │ Khớp định nghĩa       │ Nhặt từ trên cao tốc   │ Cụm từ & Ngữ pháp      │
│ Thủy cung 600x420     │ Vũ trụ & Pháo Plasma  │ Cao tốc thẳng đứng     │ Súng cao su & Khay từ  │
└───────────────────────┴───────────────────────┴────────────────────────┴────────────────────────┘
```

---

### 3.1. Game 1: Bubble Pop Dash (Phản xạ Từ vựng Thủy cung)

- **Mục tiêu học tập:** Nhận diện và phát âm từ đơn siêu tốc (A1–A2 Vocabulary).
- **Không gian & Vật lý:**
  - Bể thủy cung $600 \times 420\text{px}$, hiệu ứng gradient đại dương sâu.
  - 6 bong bóng nước chuyển động điều hòa 2D mượt mà kèm dao động sin/cos (`phase += 0.03`).
- **Cơ chế Gameplay:**
  - Bấm trúng bong bóng mục tiêu $\rightarrow$ Bong bóng vỡ tung, phát âm thanh pop, cộng điểm streak ($15 + 2 \times \text{streak}$).
  - Bấm sai bong bóng bẫy $\rightarrow$ Hiệu ứng mực mực đen (`Ink Splat`) che màn hình 0.9s, reset streak về 0, loa đọc lại từ mục tiêu đúng.
  - **Mục tiêu Speedrun:** Bắn vỡ **20 từ vựng mục tiêu**.

---

### 3.2. Game 2: Meteor Smasher (Pháo Plasma Phòng thủ Định nghĩa)

- **Mục tiêu học tập:** Nghe hiểu định nghĩa Tiếng Anh (`definition_en`) và chọn đúng từ vựng tương ứng.
- **Không gian & Vật lý:**
  - Không gian vũ trụ không trọng lực, thiên thạch rơi thẳng đứng từ trên xuống với vận tốc tối ưu $v_y \approx 0.42 + 0.18$ (~12–14s/round).
  - Thiên thạch xuất phát ngay sát mép trên ($y \approx -15\text{px}$) để hiển thị chữ trong $<1.5\text{s}$.
  - **Chữ trên thiên thạch LUÔN NẰM NGANG 100% (Fixed Horizontal)**: Chỉ có bề mặt texture thiên thạch xoay tròn, chữ tuyệt đối không xoay để trẻ đọc dễ dàng.
- **Họng pháo Plasma xoay linh hoạt (Rotating Plasma Turret):**
  - Đặt tại đáy màn hình $X=300, Y=396$.
  - Góc nòng pháo tự động xoay mượt mà theo vector hướng mục tiêu:  
    $$\theta = \arctan\left(\frac{x_{\text{target}} - X_{\text{cannon}}}{-(y_{\text{target}} - Y_{\text{cannon}})}\right) \times \frac{180^\circ}{\pi}$$
  - Tia laser màu xanh lá `#4ade80` (bắn trúng) hoặc đỏ `#ef4444` (bắn trượt).
- **Hệ thống Giáp bảo vệ (3 Shields):**
  - Để thiên thạch mục tiêu chạm đáy hoặc bắn nhầm thiên thạch khác $\rightarrow$ Trừ 1 khiên.
  - Hết 3 khiên $\rightarrow$ Game Over (Shields Down).
- **Mục tiêu Speedrun:** Tiêu diệt **15 thiên thạch định nghĩa**.

---

### 3.3. Game 3: Highway Road Runner (Đua xe Thu thập Từ vựng Cao tốc)

- **Mục tiêu học tập:** Phản xạ vận động nhanh, phối hợp tay - mắt với từ vựng chuyển động.
- **Không gian & Đồ họa xe đua thẳng đứng:**
  - Đường cao tốc 3 làn trượt dọc liên tục từ trên xuống (`roadOffset`).
  - **Xe đua SVG góc nhìn từ trên xuống (Top-Down Vertical Car):** Thân xe hướng thẳng lên trên ($\uparrow$), 2 vệt đèn pha vàng chiếu sáng mặt đường.
- **Vật lý Vết dầu trơn trượt thực tế (Realistic Oil Slick Physics):**
  - Khi đâm phải thùng dầu `🛢️` $\rightarrow$ Xe bị xoay lật **720° spinout**, lạng sang trái/phải ngẫu nhiên $\pm 18\text{px}$, để lại **2 vệt bánh xe đen cháy (`Skid Marks`)** trên mặt đường, khói bụi bốc lên `💨` và phát âm thanh **phanh xe rít chói tai (`AudioContext synthesized tire screech`)**.
- **Hiệu ứng 2 Giai đoạn khi Húc trúng Từ (2-Stage Catch FX):**
  - *Giai đoạn 1:* Từ vựng phóng to cực đại **2.4x** (`scale(2.4)`) ngay trước mũi xe.
  - *Giai đoạn 2:* Nổ tung thành ngôi sao vàng phát sáng `💥 +20 PTS!`.
- **Điều khiển đa nền tảng:**
  - Bàn phím: `ArrowLeft` / `ArrowRight` hoặc phím `A` / `D`.
  - Cảm ứng/Chuột: Nút bấm to 2 bên màn hình hoặc chạm/click trực tiếp vào làn đường.
- **Mục tiêu Speedrun:** Thu thập đủ **20 ngôi sao từ vựng**.

---

### 3.4. Game 4: Catapult Chunk Match (Ghép Cụm từ & Cấu trúc Ngữ pháp)

- **Mục tiêu học tập:** Tư duy ghép cụm từ Linear Thinking ESL, trật tự câu (Subject - Verb - Object - Adverbial) và ghép nối định nghĩa.
- **Cơ chế Kéo thả & Chạm linh hoạt (Dual Input: Drag & Drop + Tap-to-Place):**
  - Hỗ trợ cả 2 phương thức: Kéo cụm từ thả vào ô **HOẶC** Chạm vào cụm từ bay rồi chạm vào ô đích (tối ưu 100% cho màn hình cảm ứng iPad/điện thoại).
- **Đa dạng thể loại câu:**
  - Khớp các thành phần câu theo ngữ pháp tuần học (`In Panel One`, `the coach explained`, `the winning strategy`).
  - Nối thuật ngữ Khoa học/Toán/Địa lý với ý nghĩa tương ứng.
- **Mục tiêu Speedrun:** Hoàn thành toàn bộ các vòng thử thách ngữ pháp của tuần.

---

## 4. 🔒 QUY TẮC QUẢN LÝ TRẠNG THÁI & KẾT THÚC GAME (STATE INVARIANTS)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          VÒNG ĐỜI TRẠNG THÁI (GAME LIFECYCLE)                          │
├─────────────────────────┬───────────────────────────────┬──────────────────────────────┤
│ 1. IDLE STATE           │ 2. PLAYING STATE              │ 3. RESULTS / GAME OVER STATE │
│ - Giới thiệu mục tiêu   │ - Đồng hồ 180s đếm lùi        │ - GIỮ NGUYÊN màn hình kết quả│
│ - Nút bấm Bắt đầu lớn   │ - Đo Reflex & Speedrun        │ - Không bao giờ tự đóng!     │
│ - Tải trước từ vựng/TTS │ - Cáo hỗ trợ sau 7s           │ - Nút "Play Again" + "Exit"  │
└─────────────────────────┴───────────────────────────────┴──────────────────────────────┘
```

1. **Màn hình Kết quả (Results / Game Over) BẤT BIẾN:**
   - Khi hết giờ (180s) hoặc hoàn thành Speedrun sớm, game **BẮT BUỘC giữ nguyên màn hình kết quả** (`gameState === 'done'`).
   - Tuyệt đối **KHÔNG tự động đóng** hay gọi `onComplete` ngắt màn hình của học sinh.
   - Hiển thị đầy đủ:
     - Cúp danh hiệu (`🏆 Target Achieved!` hoặc `⚡ Speedrun Champion!`).
     - Tốc độ phản xạ nhanh nhất: `⚡ Fastest Reflex: X.XXs`.
     - Thời gian hoàn thành Speedrun: `⏱️ Speedrun Time: XX.Xs (NEW BEST!)`.
     - Tổng điểm và Kỷ lục cá nhân.
     - 2 Nút hành động: `🔄 Play Again / Race Again` và `Back to Arcade`.
2. **Đặc quyền Owner / Staff (Unlimited Bypass):**
   - Tài khoản Owner (`role: 'owner'`, tên `Bình`) hoặc Staff tự động mở khóa 100% cả 12 games, không bị trừ pin, vượt qua mọi màn hình Onboarding/Placement Test.

---

## 5. 🔊 PIPELINE ÂM THANH CHỐNG LỆCH & CHỐNG GIỌNG ĐÈ (AUDIO GUARDS)

1. **Hủy âm thanh cũ tức thì (`VoiceService.stop()`):**
   - Mỗi khi bắt đầu round mới hoặc chuyển câu, hệ thống bắt buộc gọi đồng thời:
     ```javascript
     try { VoiceService.stop(); } catch (_) {}
     try { window.speechSynthesis?.cancel(); } catch (_) {}
     ```
   - Triệt tiêu 100% hiện tượng câu cũ của từ trước đọc đè lên từ mới.
2. **Chống lỗi Double-Voice (2 giọng đọc cùng lúc):**
   - Khi worker Deepgram/Google timeout quá 1.5s, chỉ để `VoiceService` kích hoạt duy nhất 1 luồng `webFallback()`. `AudioHelper.js` không được kích hoạt thêm native TTS thứ 2 gây tiếng vang.
3. **Phát trực tiếp định nghĩa (Direct Definition):**
   - Loa đọc trực tiếp nội dung định nghĩa ngắn gọn, không chèn các tiền tố dài dòng làm trôi thời gian phản xạ của trẻ.

---

## 6. 📋 BẢNG TIÊU CHUẨN KỸ THUẬT CHO CÁC GAME TIẾP THEO (G5–G12)

Mọi mini-game mới được phát triển thêm trong tương lai (Games 5–12) bắt buộc tuân thủ 100% bản đặc tả này:
- [x] Thời lượng chuẩn: **180 giây (3 phút)**.
- [x] Tích hợp đầy đủ thước đo **`⚡ Reaction Reflex`** và **`⏱️ Speedrun Time Attack`**.
- [x] Kết nối store `useArcadeStore` lưu `highScores`, `bestReactionTimes`, `bestSpeedrunTimes`.
- [x] Tích hợp linh vật **Cáo Lexio 🦊** ở góc dưới trái + Cáo bay chỉ điểm sau $\ge 7\text{s}$ suy nghĩ.
- [x] Màn hình **Game Over / Results Screen** cố định kèm nút `Play Again` và `Back to Arcade`.
- [x] Điều khiển mượt mà trên cả máy tính (Phím/Chuột) và điện thoại/máy tính bảng (Cảm ứng).
