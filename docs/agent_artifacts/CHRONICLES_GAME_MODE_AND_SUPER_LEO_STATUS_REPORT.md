# 🎮 BÁO CÁO TOÀN DIỆN HIỆN TRẠNG GAME MODE / SUPER LEO (THE LEXIO CHRONICLES)

**Ngày lập báo cáo:** 10/09/2026  
**Phạm vi:** Kiến trúc tổng thể, Số lượng game, Phân bổ theo tuần/quest, Hiện trạng từng game, Cơ chế mapping & Cơ chế thưởng (Reward Economy).

---

## 1. KIẾN TRÚC TỔNG THỂ (SYSTEM ARCHITECTURE)

Hệ thống Game Mode trong Engquest3k được tổ chức theo **mô hình 3 tầng tích hợp**, kết nối trực tiếp với tiến trình học tập hàng ngày:

```
                                  ┌─────────────────────────────────────────────────────────┐
                                  │             THE LEXIO CHRONICLES (CHÍNH)                │
                                  │           Route: /week/:weekId/chronicles               │
                                  └─────────────────────────────────────────────────────────┘
                                                               │
                ┌──────────────────────────────────────────────┴──────────────────────────────────────────────┐
                ▼                                                                                             ▼
   【TẦNG 1: WORLD MAP 3D & CITADEL】                                                           【TẦNG 2: 5 DAILY CHAMBERS (DAYS 1–5)】
   • Three.js WebGL Canvas (Citadel Hall)                                                      • Mỗi ngày tương ứng 1 Tầng Tháp (Floor 1–5).
   • Nhân vật Leo 3D di chuyển góc nhìn thứ 3.                                                 • Mỗi phòng gồm 3 Rương / Cửa (3-Door Rotation):
   • 5 Portal Doors dẫn vào 5 phòng ngày.                                                        - Door 0: Vocab Chest (Rương Từ vựng)
   • 1 Boss Portal mở cổng đánh Boss cuối tuần.                                                  - Door 1: Grammar Chest (Rương Ngữ pháp)
   • 7 Chapters chia theo 156 tuần (Thư viện, Đại dương, Bão,...)                                - Door 2: Integration Chest (Rương Tổng hợp)
                │                                                                                             │
                └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                               │
                                                               ▼
                                             【TẦNG 3: GAME RUNTIMES & ENGINES】
                   ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
                   ▼                                           ▼                                           ▼
         [Phaser 3 Engine]                          [Leo Physics 2D Engine]                     [Pure Canvas / React 2D]
     • HighwayRunnerScene (Xe đua)               • Super Leo Dungeon Room                    • ChunkCatapultCanvas (Bắn ná)
     • BossCombatScene (Đánh Boss)               • Di chuyển top-down, D-pad                 • ThreeHubCanvas (3D WebGL)
     • PhaserGameCanvas bridge                   • Nhặt ngọc + MCQBlitzPopup                 • 15 Standalone React Games
```

Bên cạnh The Lexio Chronicles, hệ thống còn có 2 lối vào phụ:
- **`/quest-demo`**: Môi trường test harness riêng cho engine vật lý Super Leo (`src/modules/quest/QuestDemoScreen.jsx`).
- **`ArcadeModal`**: Modal chơi game giải trí nhanh tích hợp hệ thống Pin năng lượng (`src/components/games/ArcadeModal.jsx`).

### 1.1. Bất biến Kiến trúc Chính thức: 5 Chamber × 3 Game + 1 Weekly Boss Gate (Đã Chốt)
- **Công thức bất biến tuần học:** **5 Chamber (Floor 1–5) × 3 rương/game mỗi Chamber = 15 game-slot/tuần + 1 Weekly Boss Gate**.
  - **Không phải 4 Chamber + Boss, không phải 6 Chamber**. Đây là kiến trúc chuẩn cuối cùng.
  - Toàn bộ 5 Chamber dùng chung pool nội dung tuần (Reading, Listening, Writing, Speaking Hubs). Ngày 5 không cần pipeline dữ liệu riêng.
  - **CHỈ giữ 1 Boss Gate cấp tuần** (mở sau khi tích lũy đủ Power Points hoặc hoàn thành đủ 5 Chamber) — **KHÔNG có boss sau mỗi Chamber/ngày** (codebase chưa từng tồn tại daily boss).
- **Ranh giới Floor 6 & 7 — Staging Sandbox (Unused in Weekly Flow):**
  - Các slot `room=5` (Floor 6: Arcane Skyway) và `room=6` (Floor 7: Master Sanctum) trong `DOOR_ROTATION` là **Staging Sandboxes** được tạo để mount và kiểm thử 6 game mở rộng của pool 21 game (`synonym_storm`, `connector_relay`, `story_sequencer`, `word_forge_scramble`, `question_quest`, `rune_balance_scale`).
  - Chúng **HOÀN TOÀN KHÔNG thuộc luồng tuần 5 ngày** của học sinh. Luồng học sinh chuẩn chỉ chạy từ Floor 1 đến Floor 5 (15 game-slots = 45 sao = 450 PP tối đa).
- **Trạng thái 3D Scene (`CitadelHallScene.jsx`) & Kế hoạch Fix:**
  - Cả 3 game của Chamber 5 (`grand_matrix`, `titan_forge`, `cambridge_cloze`) đã tồn tại sẵn trong dữ liệu và chạy hoàn hảo tại `room=4`.
  - Mảng `doors` của 3D scene hiện đang thiếu cánh cửa `idx: 4` (lệch khỏi kiến trúc gốc do comment cũ).
  - Code fix thêm cửa `idx: 4` vào 3D Scene sẽ được thực hiện sau khi C1–C7 đóng xong toàn bộ theo đúng hàng đợi.

---

## 2. SỐ LƯỢNG GAMES & DANH MỤC GAME THỰC TẾ

Hệ thống hiện có tổng cộng **15 Game định danh chính** trong vòng quay phòng ngày (`DOOR_ROTATION`), được hiện thực hóa qua các engine khác nhau:

### Bảng Danh Mục 15 Games Trong 5 Floors (Vòng quay chuẩn của tuần)

| Floor / Ngày | Door / Rương | Game ID nội bộ | Tên hiển thị UI | Engine thực tế | Trạng thái kỹ thuật |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Floor 1** (Day 1: Story World) | Door 0 (Vocab) | `arcane_bubble` | Arcane Bubble Pop | Leo Physics 2D (`BubbleStormChase`) | Chạy mượt |
| | Door 1 (Grammar) | `spell_train` | Spell Sentence Train | Leo Physics 2D (`WordWagonJump`) | Chạy mượt |
| | Door 2 (Integration) | `lexical_det` | Lexical Detective | Leo Physics 2D (`ShadowVaultInfiltrate`) | Chạy mượt |
| **Floor 2** (Day 2: Knowledge Lab) | Door 0 (Vocab) | `crystal_match` | Crystal Memory Match | Leo Physics 2D (`PotionFlipDungeon`) | Chạy mượt |
| | Door 1 (Grammar) | `rune_forge` | Rune Forge | Leo Physics 2D (`AnvilRushGrammar`) | Chạy mượt |
| | Door 2 (Integration) | `ancient_scroll` | Ancient Scroll Cloze | React Cloze (`ScrollChamberDecode`) | Chạy mượt |
| **Floor 3** (Day 3: Battle Arena) | Door 0 (Vocab) | `phonics_bubble` | Phonics Sound Blaster | Leo Physics 2D (`EchoArenaShooter`) | Chạy mượt |
| | Door 1 (Grammar) | `chunk_catapult` | Chunk Catapult Match | **Pure HTML5 Canvas** (`ChunkCatapultCanvas`) | **Đã wire Content Service** |
| | Door 2 (Integration) | `meteor_smasher` | Meteor Smasher | Leo Physics 2D (`StormShieldDefense`) | Chạy mượt |
| **Floor 4** (Day 4: Creator Studio) | Door 0 (Vocab) | `highway_runner` | Highway Word Runner | **Phaser 3 Arcade** (`HighwayRunnerScene`) | **Đã wire Content Service** |
| | Door 1 (Grammar) | `spell_train_express` | Syntax Express 4-Car | Leo Physics 2D (`SyntaxExpressRail`) | Chạy mượt |
| | Door 2 (Integration) | `lexical_riddle` | Mystery Riddle Detective | Leo Physics 2D (`RiddleRunMaze`) | Chạy mượt |
| **Floor 5** (Day 5: Boss Castle) | Door 0 (Vocab) | `grand_matrix` | Grand Master Matrix | Leo Physics 2D (`GrandMatrixDungeon`) | Chạy mượt |
| | Door 1 (Grammar) | `titan_forge` | Titan Grammar Forge | Leo Physics 2D (`TitanGrammarForge`) | Chạy mượt |
| | Door 2 (Integration) | `cambridge_cloze` | Cambridge Cloze Gauntlet | React Cloze (`CambridgeClozeGauntlet`) | Chạy mượt |

*(Ngoài ra còn có màn **Weekly Boss Battle** độc lập tại `BossBattleScreen.jsx` gồm 10 câu hỏi tổng hợp: Boss Type 1 chạy qua `BossCombatScene.js` Phaser 3 canvas, Boss Types 2–5 chạy trên React DOM. Đặc tả Boss Battle né tránh vật lý thời gian thực — Boss di chuyển ngang chậm, dang 2 tay; Leo né đòn chạy vòng lấy mảnh; chạm boss mất tim/bị đẩy lùi — hiện đang **ĐÓNG BĂNG, CHƯA CODE** với 3 thông số [Số mảnh Weekly, Tổng tim, Công thức độ khó] ở trạng thái **PENDING (chờ duyệt)**).*

---

## 3. PHÂN BỔ GAME THEO TUẦN VÀ CƠ CHẾ MAPPING VỚI QUEST

### 3.1. Phân bổ Game theo Tuần (Chapter Progression)
156 tuần học được nhóm thành **7 Chapters** (mỗi Chapter mang một chủ đề thị giác & nhạc nền riêng):
- **Chapter 1 (Tuần 17–24)**: *The Grand Library* (Theme: `library`) — Tinh thể Tri Thức (*Crystal of Recall*).
- **Chapter 2 (Tuần 25–32)**: *The Aqua Vault* (Theme: `ocean`) — Tinh thể Lắng Nghe (*Crystal of Listening*).
- **Chapter 3 (Tuần 33–40)**: *The Storm Tower* (Theme: `storm`) — Tinh thể Phát Âm (*Crystal of Speaking*).
- **Chapter 4 (Tuần 41–48)**: *The Ancient Greenhouse* (Theme: `forest`) — Tinh thể Đọc Hiểu (*Crystal of Reading*).
- **Chapter 5 (Tuần 49–56)**: *The Forge of Words* (Theme: `forge`) — Tinh thể Ngữ Pháp (*Crystal of Grammar*).
- **Chapter 6 (Tuần 57–72)**: *The Observatory* (Theme: `space`) — Tinh thể Viết Sáng Tạo (*Crystal of Writing*).
- **Chapter 7 (Tuần 73–156)**: *The Throne of Mastery* (Theme: `throne`) — Tinh thể Thông Thạo (*Crystal of Fluency*).
*(W01–W16 áp dụng Lite Mode dành cho Pre-A1 Starters).*

### 3.2. Cơ chế Mapping Game với Quest (Micro-Reward Gating)
Cơ chế liên kết giữa **Bản đồ nhiệm vụ chính (Quest Map)** và **Game Mode (Chronicles)** tuân thủ nguyên tắc sư phạm cốt lõi: **"Học trước - Chơi sau"**:
1. **Một ngày học = Một Zone = 3 Quests**:
   - Ví dụ: Day 1 (Zone 1) gồm `gear1_webtoon`, `gear2_karaoke`, `gear3_retell`.
2. **Cơ chế cấp Chìa khóa (Key Currency)**:
   - Biến `completedQuestCount` đếm số nhiệm vụ đã hoàn thành trong Zone ngày hôm đó (từ 0 đến 3).
   - Biến `clearedDoorsCount` đếm số rương đã vượt qua trong phòng ngày hôm đó.
   - Điều kiện mở rương: `completedQuestCount > clearedDoorsCount`.
     - Học sinh hoàn thành 1 Quest bất kỳ trên bản đồ $\rightarrow$ Nhận được **1 Chìa khóa**.
     - Có chìa khóa, học sinh được **tự do chọn mở bất kỳ rương nào** (Vocab, Grammar, hoặc Integration).
     - Hoàn thành rương đó $\rightarrow$ Tiêu thụ 1 chìa khóa. Muốn mở rương tiếp theo, phải quay lại bản đồ làm tiếp Quest thứ 2.
3. **Chế độ Replay vĩnh viễn**:
   - Rương nào đã đạt $\ge 1$ sao sẽ chuyển thành trạng thái `'cleared'` và **luôn mở** cho phép học sinh chơi lại tự do để cải thiện điểm số/sao mà không cần chìa khóa mới.
4. **Quy tắc Bypass (Owner / Teacher Mode)**:
   - Giáo viên, phụ huynh hoặc URL param `?owner=true` sẽ tự động mở khóa toàn bộ 5 phòng và 3 rương để kiểm thử nội dung.

---

## 4. HIỆN TRẠNG TỪNG GAME & TÌNH TRẠNG ĐẤU NỐI CONTENT SERVICE

Hiện tại, hệ thống game đang trong lộ trình chuẩn hóa dữ liệu tập trung qua `ContentService`:

### Nhóm 1: Đã Đấu Nối Hoàn Tất Vào Content Service (Bước 10 nghiệm thu)
1. **Chunk Catapult (`chunk_catapult` — Grammar Chest)**:
   - Đã bỏ hoàn toàn việc chia đôi câu cơ học (`naive-split`).
   - 100% nhận các cặp `{ starter, completion }` chuẩn sư phạm từ `WEEKLY_CATAPULT_PAIRS` (W33–W37) hoặc fallback an toàn theo Chapter Theme (`generateStubCatapultPairs`).
   - Chạy trên HTML5 Canvas mượt mà, hỗ trợ Bullet Time khi ngắm bắn.
2. **Highway Runner (`highway_runner` — Vocab Chest)**:
   - Nhận 18 từ vựng kèm định nghĩa từ `pools.vocab` có thuật toán lặp lại ngắt quãng SRS nhẹ (60/20/12/8%).
   - Tự động sinh distractors, đảm bảo luôn có $\ge 4$ từ vựng.
   - Chạy trên Phaser 3 Arcade Physics với xe đua thể thao 3 làn.

### Nhóm 2: Chạy Ổn Định Bằng Engine Super Leo (Chờ đấu nối Content Service)
- Các game thuộc Floor 1, 2, 3, 4, 5 (như `BubbleStormChase`, `WordWagonJump`, `PotionFlipDungeon`, `SyntaxExpressRail`, v.v.):
  - Engine vật lý 2D `LeoPhysics` chạy rất mượt, nhân vật Leo di chuyển linh hoạt, va chạm AABB chuẩn xác, D-pad cảm ứng nhạy trên mobile.
  - Hiện tại vẫn nhận dữ liệu thông qua props `vocabItems` và `grammarSentences` được `DailyRoomScreen` chia rẽ tạm thời từ pool tuần, chưa áp dụng các adapter chuyên biệt như Catapult.

---

## 5. CƠ CHẾ THƯỞNG & KINH TẾ GAME (REWARD ECONOMY)

Hệ thống phần thưởng được thiết kế đa tầng để tạo động lực học tập lâu dài (Long-term Retention):

### 5.1. Hệ thống Sao & Power Points (PP)
- **Công thức tính Sao (1–3 Sao per Door)**:
  $$\text{Score} = (\text{Accuracy} \times 0.7) + (\text{TimeBonus} \times 0.3)$$
  - $\ge 85\% \rightarrow \mathbf{3\text{ Sao}}$ | $\ge 65\% \rightarrow \mathbf{2\text{ Sao}}$ | $\ge 40\% \rightarrow \mathbf{1\text{ Sao}}$.
- **Quy đổi Power Points (PP)**:
  - **1 Sao = 10 Power Points (PP)**.
  - Mỗi phòng ngày (3 rương): Tối đa 9 sao $\rightarrow$ **90 PP**.
  - Toàn tuần (5 phòng): Tối đa 45 sao $\rightarrow$ **450 PP**.

### 5.2. Điều Kiện Mở Cổng Boss (Boss Gate Thresholds)
Để bước vào Apex Spire đánh Boss cuối tuần, học sinh phải tích lũy đủ Boss Energy từ các phòng ngày:
- 🥉 **Bronze Boss Gate**: Cần **150 PP** (Đạt $33\%$ tổng điểm tuần, tương đương 15 sao).
- 🥈 **Silver Boss Gate**: Cần **270 PP** (Đạt $60\%$ tổng điểm tuần, tương đương 27 sao).
- 🥇 **Gold Boss Gate**: Cần **360 PP** (Đạt $80\%$ tổng điểm tuần, tương đương 36 sao).

### 5.3. Tiền Tệ Game: Lexio Coins 🪙
- **Cách kiếm Coins**:
  - Hoàn thành trọn vẹn 1 phòng ngày (clear cả 3 rương): Thưởng **15 Coins** (`COINS_PER_ROOM_CLEAR`).
  - Đánh bại Boss tuần: Thưởng lớn theo hạng Boss:
    - Bronze Defeat: **30 Coins**
    - Silver Defeat: **60 Coins**
    - Gold Defeat: **100 Coins**
- **Nơi tiêu thụ (Mascot Shop 🛍️)**:
  - Mua sắm trang phục, phụ kiện (mũ phù thủy, kính râm, áo choàng, cánh rồng) cho linh vật Super Leo.
  - Mở khóa các hiệu ứng hào quang, danh hiệu Hall of Fame.

### 5.4. Tinh Thể Kỹ Năng (Crystal Fragments 💎)
- Mỗi lần vượt ải Boss, học sinh thu thập được 1 Mảnh Tinh thể (`Fragments: 0/4`).
- Thu thập đủ 4 mảnh trong Chapter $\rightarrow$ Phục chế hoàn chỉnh Tinh thể kỹ năng đại diện cho Chapter đó (gắn lên vòng vương miện Citadel).
