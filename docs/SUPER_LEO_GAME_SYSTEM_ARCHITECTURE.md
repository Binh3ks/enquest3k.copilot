# 🏰 SUPER LEO — TÀI LIỆU KIẾN TRÚC, THIẾT KẾ & ĐẶC TẢ KỸ THUẬT HỆ THỐNG GAME

> **Phiên bản:** 4.1 (Unified Game System — Super Leo)  
> **Ngày cập nhật:** 09/09/2026  
> **Phân định trạng thái thực thi (Implementation Status):**  
> - 🟢 **ĐÃ TRIỂN KHAI THỰC TẾ TRONG CODEBASE:**  
>   1. Xóa bỏ hoàn toàn Arcade độc lập trên UI, thống nhất thương hiệu **Super Leo** (`QuestMap3D.jsx`, `Header.jsx`).  
>   2. Đại sảnh 3D Citadel Hall Three.js (`CitadelHallScene.jsx`), cầu thang Grand Staircase, điều khiển nhân vật Leo 3D voxel bằng WASD/Mũi tên, 7 cánh cửa vòm (gồm 4 cửa Zones thật, 2 cửa bí mật "Nothing's here!", 1 Cổng Boss trên tầng 2).  
>   3. Đấu trường Boss Battle với Google Cloud TTS SSML (`en-GB-Wavenet-D`), cười ngạo mạn và thở dài đau đớn, 5 dạng trùm xoay vòng (`BossBattleScreen.jsx`).  
>   4. Hệ thống kinh tế: Power Points (PP), Stars (70% accuracy + 30% speed), Lexio Coins, ngưỡng mở Boss (Bronze/Silver/Gold) (`useChroniclesStore.js`).  
> - 🟡 **ĐỀ XUẤT NÂNG CẤP ĐANG CHỜ PHÊ DUYỆT (RFC / PROPOSED ROADMAP):**  
>   1. **Cơ chế mở sớm từng cửa:** Hoàn thành 1 quest con bất kỳ $\rightarrow$ mở 1 cửa tự chọn trong ngày (thay vì bắt chờ đủ cả 3 quests mới mở cả phòng). Vẫn giữ nguyên điều kiện phải clear đủ cả 3 cửa mới nhận thưởng lớn Clear Room.  
>   2. **Thưởng tương tác cho 2 Cửa bí mật:** Thêm +5 Coins và mascot Leo reo mừng (thay vì để rỗng gây hiểu nhầm bug).  
>   3. **Loại bỏ Phaser Bundle 1.4 MB:** Chuyển `Chunk Catapult` và `Highway Runner` về Canvas 2D/React thuần nhẹ nhàng.  
>   4. **Bảo mật Owner Bypass:** Yêu cầu nhập mã Teacher PIN 4 số trên production, chặn can thiệp qua `localStorage`.  
>   5. **Cân chỉnh sư phạm mini-game:** Nâng Rune Forge lên 3–4 lựa chọn, thêm cơ chế Bullet Time làm chậm thời gian cho nhóm game vận động.  
> **Quy chuẩn lưu trữ:** Bắt buộc lưu trữ cố định tại `docs/SUPER_LEO_GAME_SYSTEM_ARCHITECTURE.md` theo *MANDATORY ARTIFACT PERSISTENCE PROTOCOL (AGENTS.md)*.


## 📑 MỤC LỤC

1. [Khảo Sát Hiện Trạng Tài Liệu Trong Codebase](#1-khảo-sát-hiện-trạng-tài-liệu-trong-codebase)
2. [Tầm Nhìn & Triết Lý Thống Nhất: Xóa Bỏ Arcade, Hợp Nhất Thành Super Leo](#2-tầm-nhìn--triết-lý-thống-nhất-xóa-bỏ-arcade-hợp-nhất-thành-super-leo)
3. [Kiến Trúc Tổng Thể Hệ Thống (System Architecture)](#3-kiến-trúc-tổng-thể-hệ-thống-system-architecture)
4. [Không Gian Trung Tâm: Sảnh Citadel Hall 3D (Three.js Canvas)](#4-không-gian-trung-tâm-sảnh-citadel-hall-3d-threejs-canvas)
5. [Cơ Cấu 5 Tầng Phòng (Floors) & Bộ 3 Cửa Thử Thách Mỗi Ngày](#5-cơ-cấu-5-tầng-phòng-floors--bộ-3-cửa-thử-thách-mỗi-ngày)
6. [Chi Tiết Cơ Chế Chơi Của 15 Mini-Games](#6-chi-tiết-cơ-chế-chơi-của-15-mini-games)
7. [Đặc Tả Đấu Trường Boss (Citadel Apex Boss Battle) & Âm Thanh SSML](#7-đặc-tả-đấu-trường-boss-citadel-apex-boss-battle--âm-thanh-ssml)
8. [Cơ Chế Hai Cửa Bí Mật ("Nothing's here!")](#8-cơ-chế-hai-cửa-bí-mật-nothings-here)
9. [Hệ Thống Thưởng Game Sư Phạm (Pedagogical Reward & Token Economy)](#9-hệ-thống-thưởng-game-sư-phạm-pedagogical-reward--token-economy)
10. [Bộ Schema Dữ Liệu Chuẩn (Data Schemas)](#10-bộ-schema-dữ-liệu-chuẩn-data-schemas)
11. [Mẫu Code Kiến Trúc (Implementation Code Blueprints)](#11-mẫu-code-kiến-trúc-implementation-code-blueprints)

---

## 1. KHẢO SÁT HIỆN TRẠNG TÀI LIỆU TRONG CODEBASE

Trước khi lập tài liệu này, codebase đã có một số tài liệu phân tán qua các đợt phát triển:

| Đường dẫn tài liệu | Nội dung chính | Hạn chế / Điểm lỗi thời |
|---|---|---|
| `docs/MINI_GAMES_PEDAGOGY_AND_REWARD_AUDIT_REPORT.md` | Báo cáo phản biện sư phạm ESL & Game Design (06/09/2026), đề xuất mô hình thưởng kép (Milestone Token + Micro-Battery). | Chỉ mang tính chất báo cáo audit sư phạm; chưa mô tả kiến trúc code, Three.js Citadel Hall và việc xóa bỏ Arcade. |
| `docs/agent_artifacts/ad18b61f.../chronicles_master_spec.md` | Bản thảo thiết kế ban đầu của The Lexio Chronicles (07/09/2026). | Tài liệu lưu trong thư mục tạm `agent_artifacts`, còn dùng tên cũ "Chronicles", chưa có Three.js 3D Citadel Hall, chưa có 2 cửa bí mật, chưa cập nhật Boss SSML TTS. |
| `docs/agent_artifacts/CHRONICLES_3D_THREEJS_HUB_PLAN_V7.md` | Bản kế hoạch dựng Three.js Citadel Hall. | Tài liệu kế hoạch tạm thời, thiếu đặc tả chi tiết 15 mini-games và hệ thống thưởng. |
| `docs/agent_artifacts/aabf7447.../arcade_game_design_blueprint.md` | Bản thiết kế phòng Arcade cũ với catalog 15 game độc lập. | **ĐÃ LỖI THỜI HOÀN TOÀN** do Arcade đã bị xóa bỏ để đưa toàn bộ game vào cốt truyện nhập vai RPG của Super Leo. |

**Kết luận:** Chưa từng có một Master Architecture Document hoàn chỉnh, chuẩn mực mô tả đúng hiện trạng thực tế của hệ sinh thái game sau khi xóa Arcade và hợp nhất vào **Super Leo**. Tài liệu này chính thức trở thành **Single Source of Truth** cho toàn bộ hệ thống game của dự án EngQuest3K.

---

## 2. TẦM NHÌN & TRIẾT LÝ THỐNG NHẤT: XÓA BỎ ARCADE, HỢP NHẤT THÀNH SUPER LEO

### 2.1. Tại sao phải xóa bỏ Arcade độc lập?
Trong các phiên bản trước, app tồn tại song song hai thực thể:
1. **Arcade Mode**: Một danh mục game kiểu phòng máy thẻ (coin-op), học sinh thích chơi game nào thì bấm vào chơi game đó.
2. **The Lexio Chronicles (nay là Super Leo)**: Chế độ thám hiểm cốt truyện RPG theo tuần học.

**Hệ quả sư phạm tiêu cực của Arcade độc lập:**
- **Phân mảnh tâm lý học sinh:** Trẻ em bấm thẳng vào Arcade chỉ để "chơi game", biến app học tiếng Anh thành game console miễn phí.
- **Xé nhỏ trải nghiệm học (Cognitive Fragmentation):** Không có mối liên hệ mật thiết giữa bài học hôm nay với thử thách trong game.
- **Lãng phí tài nguyên phát triển:** Cùng một minigame (như Highway Runner, Chunk Catapult, Phonics Bubble) nhưng lại phải duy trì 2 entry point, 2 màn hình quản lý điểm và 2 logic unlock riêng biệt.

### 2.2. Hợp nhất vào thương hiệu duy nhất: "Super Leo"
- Toàn bộ các nút bấm, menu, link dẫn mang tên `Arcade` trên bản đồ chính (`QuestMap3D.jsx`), thanh điều hướng (`Header.jsx`) và menu ứng dụng đã được **loại bỏ hoặc đổi tên thành "Super Leo"**.
- Tên gọi chính thức được thống nhất trên toàn bộ UI/UX là: **🏰 Super Leo** (thay thế cho cả Arcade và tên kỹ thuật cũ The Lexio Chronicles).
- **Nguyên tắc Sư phạm Bất biến (Pedagogical Invariant):** *Học sinh không thể chơi game tùy tiện nếu chưa học bài*. Muốn bước vào các tầng phòng của Super Leo, học sinh phải hoàn thành nhiệm vụ học tập (Zone Quests) của ngày hôm đó trên bản đồ bài học chính.

```
                  ┌──────────────────────────────────────────────────┐
                  │      BẢN ĐỒ CHÍNH APP (DAILY QUEST MAP)          │
                  │   Day 1 ➔ Day 2 ➔ Day 3 ➔ Day 4 ➔ Day 5          │
                  └─────────────────────────┬────────────────────────┘
                                            │ (Hoàn thành Quests từng ngày)
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │          🏰 ĐẠI SẢNH SUPER LEO (3D CITADEL)      │
                  │   Floor 1 ➔ Floor 2 ➔ Floor 3 ➔ Floor 4 ➔ Boss   │
                  └─────────────────────────┬────────────────────────┘
                                            │ (Vượt 3 Cửa Thử Thách)
                                            ▼
                  ┌──────────────────────────────────────────────────┐
                  │   TÍCH LŨY POWER POINTS (PP) & LEXIO COINS 🪙    │
                  │   Mở khóa Boss Battle ➔ Mua Skin Mascot Shop     │
                  └──────────────────────────────────────────────────┘
```

---

## 3. KIẾN TRÚC TỔNG THỂ HỆ THỐNG (SYSTEM ARCHITECTURE)

### 3.1. Cấu trúc Component Tree
Toàn bộ hệ thống Super Leo nằm trong module `src/modules/chronicles/`:

```
src/modules/chronicles/
├── ChroniclesScreen.jsx             # Shell chính điều phối routing nội bộ (World Map vs Room vs Boss)
├── ChroniclesWorldMap.jsx           # Màn hình Hub tổng quan (Citadel Hall 3D + Header + PP Bar)
│   ├── three/
│   │   ├── ThreeHubCanvas.jsx       # Canvas WebGL bọc Three.js Fiber
│   │   └── CitadelHallScene.jsx     # Scene 3D Đại sảnh Citadel, vật lý Leo, 7 cổng vòm
│   ├── MascotShopPanel.jsx          # Cửa hàng đổi đồ Mascot Lexio bằng Coins
│   ├── ChapterFragmentPanel.jsx     # Bảng sưu tầm mảnh ghép Crystal của Chapter
│   └── HallOfFameModal.jsx          # Bảng vinh danh điểm cao cá nhân
├── DailyRoomScreen.jsx              # Phòng chơi thử thách ngày (3 Cánh cửa Vocab / Grammar / Integration)
│   ├── extractQuestVocab.js         # Trích xuất dữ liệu từ 4 Hubs bài học tuần
│   ├── CollectorPopup.jsx           # Nhận vật phẩm bí mật khi đạt 6+ stars
│   └── games/                       # Thư viện 15 React Mini-Games
├── BossBattleScreen.jsx             # Đấu trường Boss hàng tuần (5 Rotary Archetypes + SSML Audio)
├── ChapterFinalBossScreen.jsx       # Trùm cuối chương (sau 8 tuần thu thập đủ mảnh vỡ)
└── ../quest/DungeonRoom.jsx         # Base Game Engine 2D (Physics, Collision, Enemy AI, Crystals)
```

### 3.2. Quản lý trạng thái (State Management)
Hệ thống vận hành dựa trên Zustand Store tập trung: `src/stores/useChroniclesStore.js`:
- **Room Unlocks (`unlockedRooms`):** Khóa/mở từng tầng phòng dựa trên sự kiện `isDayComplete(weekNumber, dayIndex)` từ `useDailyQuestStore`.
- **Door Stars (`roomStars`):** Lưu điểm sao (0 đến 3 sao) cho mỗi cánh cửa trong ngày.
- **Power Points (`weeklyPP`):** Tích lũy năng lượng từ số sao: $1 \text{ Star} = 10 \text{ PP}$. Tối đa 450 PP/tuần.
- **Boss Gating (`bossAccessTier`):** Xác định đẳng cấp mở khóa trận đấu Boss:
  - `Bronze`: $\ge 150 \text{ PP}$ (33%)
  - `Silver`: $\ge 270 \text{ PP}$ (60%)
  - `Gold`: $\ge 360 \text{ PP}$ (80%)
- **Lexio Coins (`lexioCoins`):** Tiền tệ trao thưởng khi clear phòng (+15 coins) và hạ gục Boss (+30/60/100 coins).
- **Chapter Fragments (`bossFragments`):** Lưu giữ mảnh ngọc chương sau mỗi chiến thắng Boss tuần.
- **Owner Bypass (`arcade_owner_bypass`):** Cờ ghi đè quyền lực cao cấp dành cho giáo viên và admin để kiểm thử nhanh mọi màn chơi.

---

## 4. KHÔNG GIAN TRUNG TÂM: SẢNH CITADEL HALL 3D (THREE.JS CANVAS)

### 4.1. Thông số kỹ thuật Scene 3D (`CitadelHallScene.jsx`)
- **Render Engine:** `@react-three/fiber` và `three.js`.
- **Tọa độ Camera:** `position = [0, 5.5, 9]`, `target = [0, 2, -2]`. Góc nhìn Isometric góc cao bao quát toàn bộ sảnh đường.
- **Kích thước không gian:**
  - Chiều rộng ($X$): $-12$ đến $+12$ (Tổng bề ngang 24m).
  - Chiều cao ($Y$): Tầng 1 ở $y=0$, Tầng 2 ở $y=4.0$, Trần nhà ở $y=14.0$.
  - Chiều sâu ($Z$): Từ $-25$ đến $+25$.
- **Ánh sáng & Thẩm mỹ:**
  - Ambient Light ấm (`#fff8ee`, intensity 0.9).
  - Directional Light có đổ bóng (Shadow Map 1024x1024).
  - Đuốc tường dọc hành lang có `pointLight` nhấp nháy phát sáng vàng cam rực rỡ.
  - Sàn đá cẩm thạch ô cờ trắng đen (`CanvasTexture`) tạo chiều sâu hoàng gia.

### 4.2. Cầu thang lớn trung tâm (Grand Staircase)
- Bắt đầu từ chân thang tại $z = +5.0$ ($y=0$) kéo dài đến đỉnh ban công tầng 2 tại $z = +2.0$ ($y=4.0$).
- Gồm 12 bậc đá cẩm thạch xám viền vàng kim loại, trải thảm đỏ nhung hoàng gia ở chính giữa.
- Khi điều khiển Leo bước vào khoảng $z \in [2, 5]$ và $|x| < 3.5$, hệ thống tự động nội suy (lerp) tọa độ $Y$ từ 0 lên 4m.

### 4.3. Bố cục 7 Cánh Cửa (Doors Layout Matrix)
Sảnh Citadel Hall bố trí đúng 7 cánh cửa vòm đá viền đồng/vàng rực rỡ:

| STT | Mã Door | Tọa độ ($X, Y, Z$) | Tên hiển thị UI | Loại cửa | Đích đến |
|---|---|---|---|---|---|
| 1 | `door_0` | Left ($X=-12, Y=0, Z=7$) | 📖 Story World | Cửa thật (Day 1) | Daily Room: Floor 1 (Chamber of Tales) |
| 2 | `door_1` | Left ($X=-12, Y=0, Z=3$) | 🔬 Action Lab | Cửa thật (Day 2) | Daily Room: Floor 2 (Alchemy Lab) |
| 3 | `door_5` | Left ($X=-12, Y=0, Z=11$) | ❓ Mystery Vault | **Cửa bí mật (Fake)** | Buồng rỗng: *"Nothing's here!"* 🕸️ |
| 4 | `door_2` | Right ($X=+12, Y=0, Z=7$) | ⚡ Arena | Cửa thật (Day 3) | Daily Room: Floor 3 (Thunder Arena) |
| 5 | `door_3` | Right ($X=+12, Y=0, Z=3$) | ✍️ Creator Studio | Cửa thật (Day 4) | Daily Room: Floor 4 (Rune Sanctum) |
| 6 | `door_6` | Right ($X=+12, Y=0, Z=11$) | 🔒 Secret Room | **Cửa bí mật (Fake)** | Buồng rỗng: *"Nothing's here!"* 🕸️ |
| 7 | `boss` | Center ($X=0, Y=4.5, Z=-8$) | 👑 Citadel Apex | Cổng Trùm Tầng 2 | Đấu trường Weekly Boss Battle |

### 4.4. Cơ chế điều khiển nhân vật Leo 3D
- Học sinh di chuyển Leo bằng cụm phím **WASD** hoặc **4 phím Mũi tên**.
- Tốc độ di chuyển: 10 đơn vị/giây, tự động quay mặt về hướng di chuyển (`lookAt`).
- Bán kính kích hoạt cửa: Khi khoảng cách giữa Leo và tọa độ cánh cửa $< 2.0\text{m}$, hệ thống tự động kích hoạt chuyển cảnh vào phòng chơi.

---

## 5. CƠ CẤU 5 TẦNG PHÒNG (FLOORS) & BỘ 3 CỬA THỬ THÁCH MỖI NGÀY

Mỗi ngày học trong tuần tương ứng với 1 Tầng phòng (Floor) trong Super Leo. Khi bước vào phòng, học sinh đối diện với **Bộ 3 Cánh Cửa Thử Thách**:
1. **Door A — Vocab Chest (Rương Từ Vựng):** Khai thác từ vựng trọng tâm trong ngày.
2. **Door B — Grammar Chest (Rương Ngữ Pháp):** Luyện trật tự từ, cấu trúc câu, thì và liên từ.
3. **Door C — Integration Chest (Rương Tích Hợp):** Thử thách tổng hợp phản xạ nhanh, đọc hiểu hoặc đục lỗ logic.

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       DAILY ROOM SCREEN (FLOOR 1–5)                        │
├──────────────────────┬──────────────────────┬──────────────────────────────┤
│    🚪 DOOR A         │      🚪 DOOR B       │          🚪 DOOR C           │
│   VOCAB CHEST        │    GRAMMAR CHEST     │      INTEGRATION CHEST       │
│  [★ ★ ★] 0-3 Stars   │  [★ ★ ★] 0-3 Stars   │     [★ ★ ★] 0-3 Stars        │
│   (Arcane Bubble)    │    (Spell Train)     │      (Lexical Detective)     │
└──────────────────────┴──────────────────────┴──────────────────────────────┘
```

---

## 6. CHI TIẾT CƠ CHẾ CHƠI CỦA 15 MINI-GAMES

Toàn bộ 15 game được phân bổ độc nhất trên 5 tầng phòng, không có game nào bị trùng lặp:

### 🌟 TẦNG 1: CHAMBER OF TALES (Ngày 1 — Story World)
- **Game 1: Arcane Bubble Pop 🔮 (`BubbleStormChase.jsx` / `ArcaneBubbleGame.jsx`)**
  - *Mục tiêu sư phạm:* Nhận diện nhanh mặt chữ và định nghĩa từ vựng cốt lõi của bài đọc Story.
  - *Cơ chế:* Các bong bóng mang từ vựng bay lơ lửng. Leo nhảy trên các platform đá, chạm vào bóng chứa từ khớp với câu hỏi định nghĩa trên HUD. Ăn đúng bóng nổ hiệu ứng phép thuật, ăn sai bóng phát nổ đỏ trừ 5s.
- **Game 2: Spell Sentence Train 🚂 (`WordWagonJump.jsx` / `SpellTrainGame.jsx`)**
  - *Mục tiêu sư phạm:* Cú pháp câu tiếng Anh (S + V + O + Trạng từ) theo tư duy tuyến tính (Linear Thinking).
  - *Cơ chế:* Đầu tàu kéo các toa trống. Các khối từ/cụm từ nằm rải rác. Học sinh phải nhảy nhặt các toa và sắp xếp đúng thứ tự ngữ pháp. Ghép xong tàu hú còi `Tu tu!` và TTS đọc toàn bộ câu.
- **Game 3: Lexical Detective 🕵️‍♂️ (`ShadowVaultInfiltrate.jsx` / `LexicalDetectiveGame.jsx`)**
  - *Mục tiêu sư phạm:* Phân loại trường nghĩa (Semantic Categorization) và phát hiện từ lạc bầy (Odd One Out).
  - *Cơ chế:* 4 rương báu bí mật chứa 4 từ vựng. 3 từ cùng nhóm (ví dụ: `apple, banana, grape`), 1 từ lạc nhóm (ví dụ: `bus`). Học sinh kích hoạt kính lúp thám tử để mở rương tìm kẻ đột lốt trước khi hết giờ.

### 🌟 TẦNG 2: ALCHEMY LAB (Ngày 2 — Knowledge Lab)
- **Game 4: Crystal Memory Match 💎 (`PotionFlipDungeon.jsx` / `CrystalMemoryMatchGame.jsx`)**
  - *Mục tiêu sư phạm:* Ghi nhớ không gian kết hợp liên tưởng song ngữ Anh - Định nghĩa CLIL.
  - *Cơ chế:* Bàn cờ 12 lọ thuốc/tinh thể úp sấp. Lật từng cặp lọ để tìm cặp từ vựng và định nghĩa tương ứng. Lật đúng phát sáng xanh lục và khóa lại; lật sai úp lại sau 1s.
- **Game 5: Rune Forge ⚒️ (`AnvilRushGrammar.jsx` / `RuneForgeGame.jsx`)**
  - *Mục tiêu sư phạm:* Biến đổi hình thái từ (Word Formation, Động từ V2/V3, Tiền tố/Hậu tố).
  - *Cơ chế:* Lò rèn kim loại nhả phôi thép chứa từ gốc (e.g. `care`). Hai đe rèn đưa ra hai lựa chọn (e.g. `careful` vs `careless`). Bấm búa gõ đúng đe để rèn bảo kiếm, tích điểm Combo lửa rực sáng.
- **Game 6: Ancient Scroll Cloze 📜 (`ScrollChamberDecode.jsx` / `AncientScrollFillGame.jsx`)**
  - *Mục tiêu sư phạm:* Đọc hiểu đoạn văn liên môn CLIL và điền từ khuyết theo ngữ cảnh bài học.
  - *Cơ chế:* Cuộn da cổ chứa đoạn văn thực hành khoa học có các chỗ trống `[ ? ]`. Bên dưới là khay ngọc chữ. Học sinh kéo ngọc thả vào đúng vị trí để hoàn nguyên cuộn bí kíp.

### 🌟 TẦNG 3: THUNDER ARENA (Ngày 3 — Battle Arena)
- **Game 7: Phonics Sound Blaster 🔊 (`EchoArenaShooter.jsx` / `PhonicsBubbleGame.jsx`)**
  - *Mục tiêu sư phạm:* Nhận thức ngữ âm (Phonemic Awareness) Audio-First. Trẻ nghe trước khi nhìn chữ.
  - *Cơ chế:* Loa phát âm chuẩn Cambridge đọc to âm mục tiêu (e.g. short `/æ/` hoặc âm `/ʃ/`). 6 mục tiêu bay lên, học sinh phải bắn đúng các từ chứa âm đó (`cat, hat, map`), tránh các từ bẫy (`cake, car`).
- **Game 8: Chunk Catapult Match 🧩 (`CatapultCommander.jsx` + `ChunkCatapultScene.js`)**
  - *Mục tiêu sư phạm:* Ghép cụm từ ngữ pháp cố định (Collocations & Idiomatic Chunks).
  - *Cơ chế Canvas Phaser:* Leo điều khiển máy bắn đá. Cột đối diện chứa các cụm kết thúc (e.g. `...in the morning`). Kéo súng cao su ngắm bắn viên đá mang cụm mở đầu (e.g. `Every day...`) để ghép thành câu trọn vẹn.
- **Game 9: Meteor Smasher 🛸 (`StormShieldDefense.jsx` / `MeteorSmasherGame.jsx`)**
  - *Mục tiêu sư phạm:* Phản xạ nối nhanh từ vựng với từ đồng nghĩa (Synonyms) hoặc trái nghĩa (Antonyms).
  - *Cơ chế:* Thiên thạch mang từ rơi từ bầu trời xuống thành phố. Tháp laser xoay 360 độ. Chọn đáp án đúng kích hoạt luồng laser phá hủy thiên thạch trước khi chạm đất.

### 🌟 TẦNG 4: RUNE SANCTUM (Ngày 4 — Creator Studio)
- **Game 10: Highway Word Runner 🏎️ (`HighwaySprintCanvas.jsx` + `HighwayRunnerScene.js`)**
  - *Mục tiêu sư phạm:* Phân loại ngữ pháp tốc độ cao dưới áp lực thời gian.
  - *Cơ chế Canvas Phaser:* Xe đua của Leo lao vun vút trên cao tốc 3 làn xe. Phía trước xuất hiện 2 cổng thu phí ngữ pháp (Cổng A: `Noun`, Cổng B: `Verb`). Học sinh phải đọc từ trên nóc xe và chuyển làn phi qua đúng cổng.
- **Game 11: Syntax Express 4-Car 🚆 (`SyntaxExpressRail.jsx` / `SyntaxExpressGame.jsx`)**
  - *Mục tiêu sư phạm:* Ghép câu phức và câu ghép nâng cao (Mệnh đề liên từ `Because, Although, So that`).
  - *Cơ chế:* Đoàn tàu hỏa tốc độ cao gồm 4 toa riêng biệt. Học sinh phải kết nối đúng thứ tự mệnh đề chính, liên từ và mệnh đề phụ.
- **Game 12: Mystery Riddle Detective 🔍 (`RiddleRunMaze.jsx` / `RiddleDetectiveGame.jsx`)**
  - *Mục tiêu sư phạm:* Đọc hiểu suy luận logic (Deductive Reasoning) từ các manh mối câu đố.
  - *Cơ chế:* Leo chạy trong mê cung hầm mộ. Mỗi cánh cửa ngáng đường đưa ra 1 câu đố ngắn (e.g. *"I have keys but no doors. I have space but no room. What am I?"*). Chọn đúng chìa khóa `Keyboard` để phá cổng.

### 🌟 TẦNG 5: APEX SPIRE (Ngày 5 — Boss Castle)
- **Game 13: Grand Master Matrix 👑 (`GrandMatrixDungeon.jsx` / `GrandMasterMatrixGame.jsx`)**
  - *Mục tiêu sư phạm:* Tổng hợp ma trận từ vựng toàn diện cả tuần học.
  - *Cơ chế:* Ma trận lưới ô chữ thần thánh. Học sinh phải kết nối các ô chữ theo chiều ngang, dọc, chéo để tạo ra chuỗi từ vựng logic giải trừ phong ấn.
- **Game 14: Titan Grammar Forge ⚡ (`TitanGrammarForge.jsx` / `TitanForgeGame.jsx`)**
  - *Mục tiêu sư phạm:* Sửa lỗi sai ngữ pháp câu (Error Identification & Correction).
  - *Cơ chế:* Khổng lồ Titan tấn công bằng các câu thần chú có lỗi sai (e.g. *"She go to school yesterday"*). Học sinh phải chạm chuẩn xác vào vị trí từ sai (`go` $\rightarrow$ `went`) để kích hoạt khiên phản đòn sét đánh lui Titan.
- **Game 15: Cambridge Cloze Gauntlet 🏆 (`CambridgeClozeGauntlet.jsx` / `CambridgeClozeGame.jsx`)**
  - *Mục tiêu sư phạm:* Chuẩn khảo thí Cambridge Movers & Flyers Reading & Writing Part 4.
  - *Cơ chế:* Bài thi tổng duyệt cuối tuần gồm đoạn văn 5 chỗ trống với các bẫy ngữ pháp thực tế. Vượt qua đấu trường với 3 sao để chứng nhận danh hiệu Kiện tướng ngôn ngữ.

---

## 7. ĐẶC TẢ ĐẤU TRƯỜNG BOSS (CITADEL APEX BOSS BATTLE) & ÂM THANH SSML

### 7.1. Hệ Thống 5 Dạng Trùm Xoay Vòng (Rotary Boss System)
Hệ thống tính toán dạng Boss tuần theo công thức modulo bảo vệ an toàn:
$$\text{BossType} = \left(\left(w - 17\right) \bmod 5\right) + 1$$

| Dạng | Tên Trùm (Boss Archetype) | Icon / Sprite | Màu sắc chủ đạo | Tuyệt chiêu đặc biệt khi Boss tụt máu |
|---|---|---|---|---|
| **1** | **Ancient Sorcerer** 🧙‍♂️ | 🧙‍♂️ / 😈 / 🤕 | Tím `#8B5CF6` | **✨ Mirror Spell (50% HP):** Nhân bản thêm phương án gây nhiễu thứ 5 làm rối mắt. |
| **2** | **Lord of Echoes (Vampire)** 🧛‍♂️ | 🧛‍♂️ / 🦇 / 😡 | Xám đá `#78716C` | **🦇 Swarm of Bats (30% HP):** Đàn dơi bay che khuất và cướp mất 3 giây thời gian suy nghĩ. |
| **3** | **Sound Dragon** 🐉 | 🐉 / 🔥 / 🦎 | Đỏ lửa `#EF4444` | **🔥 Dragon Roar (50% HP):** Rồng gầm vang trời, đánh cắp ngay 2 giây trên đồng hồ đếm ngược. |
| **4** | **Cloze Sphinx** 🦁 | 🦁 / 😾 / 😿 | Vàng cát `#F59E0B` | **🔐 Riddle Lock (40% HP):** Nhân đôi độ khó của chỗ trống, yêu cầu suy luận kép. |
| **5** | **Memory Guardian** 🔮 | 🔮 / 👁️ / 💢 | Chàm `#6366F1` | **🌫️ Mind Fog (50% HP):** Màn sương ma mị bao phủ làm mờ màn hình, đòi hỏi sự tập trung cực độ. |

### 7.2. Chuẩn Âm Thanh Giọng Đọc Bí Ẩn & Thẻ SSML Google Cloud TTS
Để tạo cảm giác huyền bí chuẩn phong cách game nhập vai như Bowser (Mario) hay Boss Dungeon, Boss sử dụng mã giọng nam trầm chuẩn Anh: **`en-GB-Wavenet-D`** kết hợp các thẻ cấu trúc **SSML (Speech Synthesis Markup Language)**:

#### 😈 Khi Boss Ra Đòn / Học Sinh Trả Lời Sai (Cười Ngạo Mạn, Độc Ác):
```xml
<speak>
  <prosody pitch="-5st" rate="85%">
    Heh-heh-heh!
  </prosody>
  <break time="150ms"/>
  <prosody pitch="-8st" rate="75%">
    Mwahaha!
  </prosody>
  <break time="200ms"/>
  <prosody pitch="-4st" rate="90%">
    Foolish mortal! You thought you could defeat my ancient power?
  </prosody>
</speak>
```

#### 🤕 Khi Boss Bị Đánh Trúng / Thất Trận (Rên Rỉ, Thở Dài, Đau Đớn Hài Hước):
```xml
<speak>
  <prosody pitch="-3st" rate="80%">
    Arghh!
  </prosody>
  <break time="180ms"/>
  <prosody pitch="-6st" rate="70%">
    Ouch! Huhu...
  </prosody>
  <break time="200ms"/>
  <prosody pitch="-4st" rate="85%">
    Impossible! How could your words break through my shadow shield?
  </prosody>
</speak>
```

### 7.3. Cơ chế chiến đấu và sát thương (Combat & Damage Rules)
- Bộ câu hỏi gồm đúng **10 câu trắc nghiệm tổng hợp toàn bộ bài học trong tuần**.
- **Máu của Boss (Boss HP):** Khởi điểm 100%. Mỗi câu trả lời đúng trừ **10% HP**.
- **Máu của Người chơi (Player HP):** Khởi điểm 100%. Trả lời sai bị trừ máu phụ thuộc vào hạng Power Points khi mở cổng:
  - **Hạng Vàng (Gold $\ge$ 360 PP):** Trừ **10% HP** mỗi lần sai (cho phép sai tối đa 9 lần).
  - **Hạng Bạc (Silver $\ge$ 270 PP):** Trừ **15% HP** mỗi lần sai (cho phép sai 6 lần).
  - **Hạng Đồng (Bronze $\ge$ 150 PP):** Trừ **20% HP** mỗi lần sai (chỉ được sai tối đa 4 lần).
- **Chiến thắng:** Hạ Boss về 0% HP trước khi người chơi hết máu. Nhận phần thưởng Coins và mảnh vỡ Chapter Fragment.
- **Thất bại:** Người chơi về 0% HP trước. Không mất Power Points, được phép hồi phục máu và tái đấu.

---

## 8. CƠ CHẾ HAI CỬA BÍ MẬT ("NOTHING'S HERE!")

Theo đúng yêu cầu thiết kế không gian game thế giới mở (Easter Egg Discovery):
- Tại tầng 1 của sảnh 3D Citadel Hall, có hai cánh cửa vòm bí ẩn:
  - Cửa số 5: `❓ Mystery Vault` ($Z=11$, bên trái).
  - Cửa số 6: `🔒 Secret Room` ($Z=11$, bên phải).
- Hai cánh cửa này **hoàn toàn mở được** khi học sinh điều khiển Leo bước vào.
- Khi bước vào bên trong, màn hình hiển thị hoạt cảnh buồng đá hoang vắng:
  - Icon mạng nhện: `🕸️`
  - Tiêu đề bí ẩn: **Nothing's here!**
  - Dòng miêu tả: *"This chamber is completely empty... Only echoes and cobwebs remain."*
  - Nút bấm thoát: `← Return to Hall` (Đưa người chơi quay lại sảnh 3D mà không làm mất trạng thái hay crash ứng dụng).
- Cơ chế này tạo cảm giác tò mò khám phá lâu đài cổ kính cho trẻ nhỏ mà vẫn đảm bảo tính an toàn tuyệt đối cho hệ thống luồng chuyển cảnh.

---

## 9. HỆ THỐNG THƯỞNG GAME SƯ PHẠM (PEDAGOGICAL REWARD & TOKEN ECONOMY)

### 9.1. Khóa Sư Phạm Bất Biến (Pedagogical Gating Law)
Học sinh **không thể cày game tự do** mà phải trả qua chu trình học tập nghiêm túc:
1. Mỗi ngày trong tuần có 3 Quests bài học tương ứng với 1 Zone trên Daily Quest Map.
2. Khi hoàn thành đủ 3 Quests của Day $N$ (`useDailyQuestStore.isDayComplete(w, N)` trả về `true`), cánh cửa của Tầng phòng $N$ tương ứng trong Super Leo mới giải phóng phong ấn mở khóa.
3. Day 1 (Chamber of Tales) mặc định luôn mở để kích thích trẻ bắt đầu hành trình.

```
                   ┌────────────────────────────────────────┐
                   │    HOÀN THÀNH 3 QUESTS TRONG NGÀY      │
                   │ (Scene Explorer + Shadowing + Retell)  │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │    MỞ PHÒNG SUPER LEO TƯƠNG ỨNG        │
                   │    (Chamber of Tales - 3 Doors)        │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │     VƯỢT 3 CỬA THỬ THÁCH MINI-GAME     │
                   │     Tích lũy 3 sao x 3 = 9 Sao/Phòng   │
                   └───────────────────┬────────────────────┘
                                       │
                                       ▼
                   ┌────────────────────────────────────────┐
                   │   +90 POWER POINTS & +15 COINS 🪙      │
                   │   Đạt 150+ PP ➔ Mở Khóa Đấu Boss Cuối  │
                   └────────────────────────────────────────┘
```

### 9.2. Công Thức Tính Sao & Điểm Năng Lượng (Power Points — PP)
Điểm số của từng cửa game được đánh giá theo công thức kết hợp giữa **Độ chính xác (70%)** và **Tốc độ phản xạ (30%)**:
$$\text{Score} = \left(\frac{\text{Correct}}{\text{Total}} \times 0.7\right) + \left(\max\left(0, 1 - \frac{\text{TimeTaken}}{\text{MaxTime}}\right) \times 0.3\right)$$

- $\text{Score} \ge 0.85 \implies \mathbf{3\text{ Stars}}$ (Nhận 30 PP)
- $\text{Score} \ge 0.65 \implies \mathbf{2\text{ Stars}}$ (Nhận 20 PP)
- $\text{Score} \ge 0.40 \implies \mathbf{1\text{ Star}}$ (Nhận 10 PP)
- $\text{Score} < 0.40 \implies \mathbf{0\text{ Star}}$ (0 PP — Chưa đạt, phải chơi lại)

### 9.3. Bảng Cân Bằng Kinh Tế (Economy Balance Sheet)

| Nguồn hoạt động | Điểm Power Points (PP) | Tiền thưởng (Lexio Coins) | Phần thưởng phụ |
|---|---|---|---|
| Vượt 1 Cửa Mini-game (1–3 Sao) | +10 đến +30 PP | — | Điểm cá nhân lưu vào Hall of Fame |
| Clear trọn vẹn 1 Phòng (3 Cửa $\ge 1$ Sao) | +30 đến +90 PP | **+15 Coins** 🪙 | Lời khen ngợi từ NPC Cố Vấn |
| Đạt $\ge 6$ Sao trong một phòng | — | — | Nhận **Cổ vật bí mật (Collectible Artifact)** |
| Đạt mốc 150 PP | — | — | Mở khóa Cổng Boss hạng **Bronze** |
| Đạt mốc 270 PP | — | — | Nâng cấp Cổng Boss lên hạng **Silver** |
| Đạt mốc 360 PP (Max 450 PP) | — | — | Mở khóa Cổng Boss hạng **Gold Vàng Kim** |
| Chiến thắng Boss hạng Bronze | — | **+30 Coins** 🪙 | 1 Mảnh vỡ Chapter Fragment |
| Chiến thắng Boss hạng Silver | — | **+60 Coins** 🪙 | 2 Mảnh vỡ Chapter Fragment |
| Chiến thắng Boss hạng Gold | — | **+100 Coins** 🪙 | 3 Mảnh vỡ Chapter Fragment |
| Chiến thắng Trùm Cuối Chương (Ch. Final Boss) | — | **+200 Coins** 🪙 | **Viên Ngọc Pha Lê Chapter Crystal** 💎 |

### 9.4. Cửa Hàng Mascot Shop & Giá Trị Sử Dụng Của Coins
Số Coins tích lũy được sử dụng tại `MascotShopPanel.jsx` để cá nhân hóa chú cáo Leo:
- **Trang phục Mascot (Skins):** Mũ phù thủy (50 Coins), Áo choàng hiệp sĩ (100 Coins), Bộ giáp phi hành gia (200 Coins), Vua cáo hoàng gia (500 Coins).
- **Vật phẩm trợ chiến:** Thuốc hồi sinh tim Boss Battle (30 Coins), Bùa đóng băng thời gian mini-game 10s (20 Coins).

### 9.5. Chế Độ Quản Trị Viên (👑 OWNER BYPASS MODE)
Để hỗ trợ giáo viên kiểm tra giáo trình và lập trình viên debug mà không phải cày hết bài học:
- Tích hợp cờ bật/tắt `👑 OWNER MODE: ON/OFF` ngay trên header của Super Leo.
- Khi kích hoạt:
  - Tự động mở khóa toàn bộ 5 Tầng phòng ngay lập tức.
  - Tự động cấp 360 PP ảo, mở khóa ngay Cổng Boss hạng Gold với đầy đủ quyền năng.
  - Lưu cờ vào `localStorage.getItem('arcade_owner_bypass')`.

---

## 10. BỘ SCHEMA DỮ LIỆU CHUẨN (DATA SCHEMAS)

### 10.1. Data Extraction Contract (`extractQuestVocab.js`)
Dữ liệu cho 15 mini-games được trích xuất hoàn toàn tự động từ 4 Hubs bài học tuần:

```typescript
interface ExtractedVocabData {
  vocabItems: Array<{
    word: string;          // Từ vựng mục tiêu (đã sanitize)
    definition: string;    // Định nghĩa tiếng Anh chuẩn
    type: 'vocab' | 'chunk' | 'clil';
  }>;
  grammarSentences: Array<{
    fullSentence: string;  // Câu hoàn chỉnh
    chips: string[];       // Các mảnh ghép cú pháp (S, V, O, Modifier)
    correctOrder: number[];// Thứ tự ghép đúng
  }>;
}
```

### 10.2. Mini-game Props Contract (`MiniGameProps`)
Mọi React Component mini-game trong thư viện Super Leo đều tuân thủ chặt chẽ Contract giao tiếp sau:

```typescript
interface MiniGameProps {
  vocabItems?: Array<{ word: string; definition: string }>;
  grammarSentences?: Array<{ fullSentence: string; chips: string[] }>;
  duration?: number;       // Thời gian quy định (giây), mặc định 60-90s
  weekNumber: number;      // Tuần học hiện tại (e.g. 33)
  onComplete: (stars: number, score: number, maxCombo?: number) => void;
  onExit: () => void;      // Thoát an toàn về lại Daily Room Map
}
```

---

## 11. MẪU CODE KIẾN TRÚC (IMPLEMENTATION CODE BLUEPRINTS)

### 11.1. Blueprint 1: Khung Base Engine 2D Cho Game Phòng (`DungeonRoom.jsx`)
Khung sườn chuẩn mực hỗ trợ vòng lặp vật lý `requestAnimationFrame`, va chạm tinh thể từ vựng và popup trắc nghiệm:

```jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import MCQBlitzPopup from './MCQBlitzPopup';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';

export default function BaseDungeonGame({ vocabItems, duration = 60, onComplete, onExit }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [leoPos, setLeoPos] = useState({ x: 100, y: 300, vx: 0, vy: 0 });
  const [activeMCQ, setActiveMCQ] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const totalQuestions = vocabItems.length;

  // Game Loop chính
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Cập nhật vị trí và vật lý tại đây...
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Xử lý khi trả lời xong câu hỏi trắc nghiệm
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    setActiveMCQ(null);

    // Kiểm tra điều kiện hoàn thành
    if (correctCount + 1 >= totalQuestions) {
      const stars = calculateStars(correctCount + 1, totalQuestions, duration - timeLeft, duration);
      onComplete(stars, (correctCount + 1) * 10);
    }
  };

  return (
    <div className="dungeon-container">
      <HUDOverlay timeLeft={timeLeft} correct={correctCount} total={totalQuestions} onExit={onExit} />
      <div className="game-canvas">
        <LeoCharacter pos={leoPos} />
        {/* Render platforms và tinh thể chữ */}
      </div>
      {activeMCQ && <MCQBlitzPopup data={activeMCQ} onAnswer={handleAnswer} />}
      <VirtualDPad onMove={(dir) => {/* Xử lý di chuyển */}} />
    </div>
  );
}
```

### 11.2. Blueprint 2: Tích Hợp Game Canvas Phaser (`ChunkCatapultScene.js`)
Mẫu tích hợp Canvas Phaser vào màn hình React của Super Leo:

```jsx
import React from 'react';
import PhaserGameCanvas from '../../phaser/PhaserGameCanvas';
import ChunkCatapultScene from '../../phaser/scenes/ChunkCatapultScene';

export default function ChunkCatapultGameWrapper({ pairs, duration = 75, weekNumber, onComplete, onExit }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0a0d18' }}>
      <button 
        onClick={onExit}
        style={{ position: 'absolute', top: 16, left: 16, zIndex: 20, padding: '8px 16px' }}
      >
        ← Exit Room
      </button>

      <PhaserGameCanvas
        sceneClass={ChunkCatapultScene}
        sceneData={{ pairs, duration, weekNumber }}
        onSceneEvent={(eventName, payload) => {
          if (eventName === 'game_complete') {
            onComplete(payload.stars || 3, payload.score || 100);
          }
        }}
      />
    </div>
  );
}
```

### 11.3. Blueprint 3: Phát Giọng Đọc Boss Battle Kèm Cười/Thở Dài SSML
Mẫu gọi âm thanh Google Cloud TTS Direct với payload `<speak>` và thẻ `<prosody>`:

```javascript
import VoiceService from '../../services/voiceService';

export async function playBossReaction(isBossHit) {
  const ssmlPayload = isBossHit
    ? `<speak>
        <prosody pitch="-3st" rate="80%">Arghh!</prosody>
        <break time="180ms"/>
        <prosody pitch="-6st" rate="70%">Ouch! Huhu...</prosody>
        <break time="200ms"/>
        <prosody pitch="-4st" rate="85%">My magical defense is broken!</prosody>
       </speak>`
    : `<speak>
        <prosody pitch="-5st" rate="85%">Heh-heh-heh!</prosody>
        <break time="150ms"/>
        <prosody pitch="-8st" rate="75%">Mwahaha!</prosody>
        <break time="200ms"/>
        <prosody pitch="-4st" rate="90%">You cannot defeat the Lord of Shadows!</prosody>
       </speak>`;

  // Gọi VoiceService với mã giọng nam trầm chuẩn Anh
  await VoiceService.speak(ssmlPayload, 'boss', {
    voice: 'en-GB-Wavenet-D',
    forceDirect: true
  });
}
```

---

## 12. KẾT LUẬN & NGUYÊN TẮC BẢO TRÌ

1. **Thống nhất tuyệt đối tên gọi:** Từ nay về sau, chỉ tồn tại một thực thể game duy nhất trong EngQuest3K là **Super Leo**. Tuyệt đối không tái sinh nút bấm hoặc menu mang tên Arcade độc lập.
2. **Tuân thủ khóa sư phạm:** Mọi minigame mới được phát triển trong tương lai đều phải nằm trong hệ thống 5 Tầng phòng của Super Leo và chịu sự chi phối của tiến trình học tập `useDailyQuestStore`.
3. **Độ ổn định của Scene 3D:** Giữ nguyên cấu trúc 7 Cổng vòm trong `CitadelHallScene.jsx` (gồm 4 cổng zone thật, 2 cổng bí mật "Nothing's here!" và 1 Cổng Boss trên đỉnh ban công). Mọi nâng cấp đồ họa chỉ được tối ưu Shader hoặc Texture, không thay đổi vị trí tương tác tọa độ.

*(Tài liệu này đã được kiểm tra tính tương thích và liên kết trực tiếp với mã nguồn hiện hành tại nhánh chính của dự án).*
