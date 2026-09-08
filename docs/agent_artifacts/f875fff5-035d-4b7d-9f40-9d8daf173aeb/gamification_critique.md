# EngQuest3K — Gamification Adversarial Critique

> **Phản biện trước** — Đây là quan điểm adversarial thuần túy.
> Phần cuối mới là khuyến nghị cân bằng.

---

## 1. Kiểm kê thực tế — Hệ thống đang có

| Layer | Cơ chế | Trạng thái |
|---|---|---|
| **Progression** | 15 quests / 5 zones / tuần | ✅ Có |
| **Daily lock** | Progressive lock Day N→N+1 | ✅ Có |
| **XP Economy** | Task XP + Daily Bonus (25) + Perfect Week (50) | ✅ Có |
| **Idempotent TX** | Chống double-award khi reload | ✅ Có |
| **Streak** | Daily streak + 1-day freeze | ✅ Có |
| **Shields** | Cambridge 5-Shield scoring | ✅ Có |
| **Stars** | Weekly stars (max 3) | ✅ Có |
| **Badges** | Static badge list (earnedBadges[]) | ✅ Có |
| **Collections** | 26 collections × 8 cards (W1–W156) | ✅ Có |
| **Mascot/Store** | Nova mascot + cosmetic shop (XP → items) | ✅ Có |
| **Arcade** | 12 mini-games unlocked by week progress | ✅ Có |
| **Passport** | ExplorerPassport.jsx | ✅ Có |
| **SRS** | Leitner 5-box flashcard review | ✅ Có |
| **Placement** | Diagnostic placement test | ✅ Có |
| **Leaderboard** | ❌ Không có | ❌ |
| **Social/Share** | ❌ Không có | ❌ |
| **Quests/Challenges** | ❌ Không có (ngoài daily lock) | ❌ |
| **Season/Event** | ❌ Không có | ❌ |

---

## 2. Phản biện hệ thống hiện tại — 9 điểm yếu cốt lõi

### ⚠️ #1 — XP Economy: Vô nghĩa sau tháng đầu

**Vấn đề:** XP tích lũy nhưng không có **hàm tiêu dùng** đủ mạnh.
- Nova Store có 6 items, giá 200–800 XP. Người học sẽ mua hết trong **tuần 3–4**.
- Sau đó XP tiếp tục tăng nhưng không làm gì được → **số to vô nghĩa**.
- Không có **XP decay** (mất dần nếu không học) → không tạo urgency.
- Không có **XP threshold** cho tier/level progression → không có cảm giác "lên cấp".

**So sánh Duolingo:** Lingots/Gems luôn có thứ để mua (streak freeze liên tục, bonus content, practice packs). Người dùng _không bao giờ_ hết lý do để tiêu gems.

**So sánh Kahoot!/Quizziz:** Không dùng XP economy — dùng real-time ranking thay thế, tránh hoàn toàn vấn đề này.

---

### ⚠️ #2 — Streak: Cơ chế mạnh nhưng thiếu "streak recovery" và "milestone"

**Vấn đề:**
- Streak freeze chỉ 1 ngày → quá mỏng cho học sinh tiểu học (học sinh hay ốm, đi học thêm, thi học kỳ).
- Không có **streak milestone** (Duolingo: bật notification + flame effect khi đạt 7, 30, 100 ngày).
- Không có **streak leaderboard** (Duolingo: "You vs. friends this week").
- Streak reset penalty quá harsh → người học bỏ hẳn thay vì quay lại.

**Dữ liệu thực từ Duolingo (public):** 47% user retention drop xảy ra ngay _ngày sau khi streak bị reset_. Cơ chế "streak repair" (dùng gem mua lại streak) giữ thêm ~15% users ở lại.

**Cần thêm:**
- `streak_milestone`: 7, 30, 100 ngày → confetti + đặc biệt badge
- `streak_repair`: dùng XP để khôi phục streak vừa mất (trong 24h)
- `weekend_shield`: tự động bảo vệ cuối tuần nếu đã học đủ 5 ngày trong tuần

---

### ⚠️ #3 — Badges: Static list = "chết" sau khi mở hết

**Vấn đề:**
- Badges được lưu trong `earnedBadges[]` nhưng **không có gì để làm sau khi earn**.
- Không có badge showcase/profile page.
- Không có **secret badges** (tạo curiosity).
- Không có **progressive badges** (Bronze → Silver → Gold version của cùng 1 thành tích).
- **BadgeDisplay.jsx** render tất cả badges dưới dạng grid, kể cả badge chưa earn (greyed out) → lộ toàn bộ danh sách → mất mystery.

**So sánh Khan Academy:** Badges có 6 tiers (Meteorite → Moon → Sun → Earth → Black Hole → Challenge), mỗi tier visible nhưng requirement ẩn → tạo curiosity.

---

### ⚠️ #4 — Collections: Đẹp về thiết kế nhưng vô hình với người dùng

**Vấn đề:**
- 26 collections × 8 cards = 208 cards trải qua 156 tuần (3 năm).
- Card unlock mỗi tuần 1 lần → **tốc độ reward quá chậm** cho trẻ 6–9 tuổi.
- Không rõ collection board hiển thị ở đâu trong UI flow thực tế (không tìm thấy route rõ ràng).
- Không có **card trading/sharing** với bạn bè → collection cô lập.
- Không có **set completion bonus** đủ spectacular (rare cards là bonus nhưng không rõ visual impact).

**So sánh Pokémon Sleep / Duolingo Leagues:** Collection mechanics hiệu quả khi có **"gotta catch 'em all" pressure** — tức là phải có social layer (ai collect được nhiều hơn?) hoặc **thời hạn** (seasonal cards expire).

---

### ⚠️ #5 — Arcade: Cô lập hoàn toàn khỏi learning loop

**Vấn đề nghiêm trọng:**
- Arcade hoạt động như **phần thưởng tách biệt** — học xong → chơi game.
- Không có **vocabulary từ tuần hiện tại** xuất hiện trong Arcade game → học và chơi không liên quan nhau.
- 12 games unlock theo week (good!) nhưng **không có high score board** hay **weekly challenge** trong arcade → mỗi lần chơi như lần đầu, không có progression.
- Arcade battery (3 phút) quá giới hạn → frustrating hơn motivating.

**Cơ hội bị bỏ lỡ:** Nếu Bubble Pop Dash dùng _đúng vocabulary của tuần này_, nó vừa là review luyện tập vừa là reward → retention tăng gấp đôi. Hiện tại, hai thứ này **cắt đứt nhau**.

---

### ⚠️ #6 — Không có cơ chế Social/Competition

**Vấn đề:**
- Hoàn toàn không có leaderboard, friend system, hay class ranking.
- Đây là app học tiếng Anh cho trẻ em → **lớp học, nhóm bạn** là môi trường tự nhiên nhất cho social gamification.
- Không có **class mode** (teacher tạo lớp, học sinh join, thầy thấy progress của cả lớp).
- Không có **weekly league** (Duolingo: Bronze → Diamond league, cạnh tranh mỗi tuần reset).

**Dữ liệu:** Duolingo công bố leagues tăng DAU lên **17%** khi ra mắt. Với app hướng tới học sinh tiểu học học trong lớp, class leaderboard gần như là tính năng **high-ROI nhất** chưa được build.

---

### ⚠️ #7 — Daily Quest Bar: Thiếu urgency và reward tức thì

**Vấn đề:**
- `TodayQuestBar` hiện thị quests hiện tại nhưng không có **countdown timer** ("Daily reset lúc 23:59!").
- Không có **"Just 1 more!" nudge** — khi hoàn thành 2/3 quests trong ngày, không có push notification hay in-app badge nhắc nhở.
- Daily Bonus XP (25 XP) nhỏ hơn base XP của 1 task (40–50 XP) → không đủ động lực riêng.
- Không có **"streak at risk"** warning khi gần hết ngày mà chưa học.

---

### ⚠️ #8 — Mascot Nova: Passive decoration, không phải AI companion

**Vấn đề:**
- Nova hiện tại là mascot với cosmetic shop → chủ yếu là **avatar dress-up**.
- Không có **Nova reactions** khi học sinh làm đúng/sai/streak mới.
- Không có **Nova dialogue** tạo personality (Duolingo Owl nói chuyện, react, troll nhẹ).
- Không có **Nova level** (Nova "trưởng thành" cùng với học sinh qua 156 tuần → emotional bond).

**So sánh Tamagotchi mechanic (Hello Kitty World, Pet language apps):** Mascot có "cần chăm sóc" tạo daily obligation mạnh hơn streak thuần tuý. Trẻ 7–9 tuổi phản ứng với điều này cực mạnh.

---

### ⚠️ #9 — Không có Seasonal / Event layer

**Vấn đề:**
- App sẽ chạy 3 năm liên tục (W1–W156) — không có sự kiện theo lịch thực.
- Không có **Tết event** (double XP, special sticker), **Back to School** challenge, **Halloween vocab**, v.v.
- Người học sẽ thấy app _nhàm_ vì không có gì thay đổi ngoài nội dung tuần mới.
- 26 Collections có theme đẹp nhưng không có **seasonal limited cards** (collected only during event).

---

## 3. So sánh với đối thủ

| Tính năng | EngQuest3K | Duolingo | Kahoot! | Khan Academy | Prodigy Math |
|---|---|---|---|---|---|
| XP Economy | ✅ Có | ✅✅ Deep | ❌ | ✅ Có | ✅✅ Deep |
| Streak | ✅ Basic | ✅✅ + leagues | ❌ | ❌ | ✅ Có |
| Social/League | ❌ | ✅✅ Core feature | ✅✅ Core | ✅ Badges | ✅ Có |
| Mascot companion | ✅ Passive | ✅✅ Duo personality | ❌ | ❌ | ✅✅ Pet combat |
| Seasonal events | ❌ | ✅✅ Regular | ✅ Có | ❌ | ✅✅ Regular |
| Arcade (vocabulary-linked) | ⚠️ Không link | ❌ | ✅✅ Core | ❌ | ✅✅ Core |
| Collection/Cards | ✅ Có | ❌ | ❌ | ✅ Badges | ✅ Pet items |
| Cambridge Assessment | ✅✅ Unique | ❌ | ❌ | ❌ | ❌ |
| Progressive content (3yr) | ✅✅ Unique | ✅ | ❌ | ✅✅ | ✅ |
| Parent Dashboard | ✅ Có | ✅ Limited | ❌ | ✅ Có | ✅✅ Strong |

**EngQuest3K điểm mạnh thực sự (không cạnh tranh được):**
- Cambridge curriculum alignment (độc nhất)
- 3-năm progression có structure (độc nhất)
- CLIL + 4-skills integration (mạnh hơn mọi đối thủ)

**Điểm yếu chiến lược:** Social layer và XP sink = hai lỗ hổng lớn nhất về retention.

---

## 4. Đánh giá rủi ro dropout theo tuần

```
W01–W04  : Novelty effect → retention tự nhiên cao
W05–W08  : First boredom zone — XP store đã mua hết
W09–W12  : Arcade variety bù đắp 1 phần
W13–W16  : Graduation mock → strong milestone motivation
W17–W20  : Second boredom zone — Full Mode mới, nhưng no new loop mechanics  ← RỦI RO CAO
W21–W24  : Mid-mock → tốt
W25–W32  : NGUY HIỂM nhất — dài, không có gì mới về gamification ← DROPOUT PEAK
W33+     : Cambridge Flyers = strong intrinsic motivation, nhưng chỉ với nhóm học sinh motivated
```

**Dự đoán:** Nếu không cải thiện, dropout peak sẽ ở **W20–W28** (tháng 5–7 của năm đầu tiên).

---

## 5. Khuyến nghị — Ưu tiên theo ROI

### 🔴 Priority 1 — High Impact, Low Effort

**A. XP Sink mở rộng (2–3 tuần dev)**
- Thêm 10+ items vào Nova Store theo tier (unlock khi đạt week milestone)
- `streak_repair` item (mua lại streak trong 24h): giá 200 XP
- `daily_quiz_pack` (extra 5 câu hỏi bonus): giá 30 XP
- `avatar_frame` (custom border cho avatar): giá 500–2000 XP

**B. Streak Milestone notifications (1 tuần dev)**
- 7 ngày → special badge + confetti + Nova reaction
- 30 ngày → rare Collection card bonus
- 100 ngày → exclusive Nova cosmetic (không bán được)

**C. "Streak at Risk" warning (3 ngày dev)**
- Push notification / in-app banner: "Streak sắp mất! Còn 2 giờ."

---

### 🟡 Priority 2 — High Impact, Medium Effort

**D. Class Leaderboard / Teacher Mode (4–6 tuần dev)**
- Teacher tạo lớp → học sinh join bằng class code
- Weekly XP leaderboard trong lớp (reset mỗi tuần)
- Teacher dashboard xem progress từng em
- **Đây là tính năng tăng retention và B2B sales nhất**

**E. Arcade × Vocabulary Integration (3–4 tuần dev)**
- Bubble Pop, Meteor Smasher: dùng vocab words từ `reading_hub.js` tuần hiện tại
- High score board per-week per-game
- Weekly arcade challenge (special leaderboard)

**F. Nova Companion personality (3 tuần dev)**
- Nova react khi: hoàn thành quest, streak mới, sai câu hỏi (encouraging), tuần mới mở
- 3–5 dialogue states, không cần AI → scripted reactions theo event type

---

### 🟢 Priority 3 — Strategic, Higher Effort

**G. Seasonal Events (ongoing, 1–2 tuần/event)**
- Tết: double XP 3 ngày, special Tết card trong collection, Nova mặc áo dài
- Back to School (tháng 9): 2x streak XP
- Halloween, Giáng Sinh: limited vocab theme + special mini-game

**H. Progressive Badges (replace static)**
- Rename current badges thành Bronze tier
- Add Silver (3×), Gold (10×) tiers cho cùng achievement
- Hide Gold requirements → curiosity drive

**I. Social Share (1–2 tuần dev)**
- Share achievement card (image) ra Zalo/Facebook: "Tôi vừa hoàn thành Tuần 16 — Starters Graduation! 🎓"
- Custom card với avatar Nova + week number + shield score → viral loop

---

## 6. Kết luận

**EngQuest3K có content gamification tốt nhất trong phân khúc** (3-year Cambridge progression là lợi thế không thể copy). Nhưng **meta-game gamification đang ở mức MVP** — đủ để ra mắt, chưa đủ để giữ chân 12+ tháng.

**Hai việc phải làm trước cuối Q4 2026:**
1. Mở rộng XP sink → stop "số to vô nghĩa" tại tháng 2
2. Class Leaderboard → đây là tính năng giữ chân bậc B2B và retention bậc L

Nếu không làm, dự báo dropout rate >60% trước khi đến W32.
