# BẢNG TỔNG HỢP NỘI DUNG TĨNH 21 MINI-GAME — SUPER LEO CHRONICLES (WEEK 33)
**Tài liệu thẩm định nội dung thủ công cho chuyên gia sư phạm & ban điều hành**  
**Ngày trích xuất:** 2026-09-10  
**Phạm vi:** Toàn bộ 21 Mini-Game thuộc 7 Tầng (Floor 1 → 7) của Tuần 33 (Chủ đề: Corridors, Friction & School Safety).

---

## MỤC LỤC 7 TẦNG / 21 MINI-GAME

- [Floor 1: Chamber of Tales (Story World)](#floor-1-chamber-of-tales)
  - [Game 1 (F1D1 - Vocab): Arcane Bubble (Bubble Storm Chase)](#game-1-f1d1---vocab-arcane-bubble)
  - [Game 2 (F1D2 - Grammar): Spell Train (Word Wagon Jump)](#game-2-f1d2---grammar-spell-train)
  - [Game 3 (F1D3 - Integration): Lexical Detective (Shadow Vault Infiltrate)](#game-3-f1d3---integration-lexical-detective)
- [Floor 2: Alchemy Lab (Knowledge Lab)](#floor-2-alchemy-lab)
  - [Game 4 (F2D1 - Vocab): Crystal Match (Potion Flip Dungeon)](#game-4-f2d1---vocab-crystal-match)
  - [Game 5 (F2D2 - Grammar): Rune Forge (Anvil Rush Grammar)](#game-5-f2d2---grammar-rune-forge)
  - [Game 6 (F2D3 - Integration): Ancient Scroll (Scroll Chamber Decode)](#game-6-f2d3---integration-ancient-scroll)
- [Floor 3: Thunder Arena (Battle Arena)](#floor-3-thunder-arena)
  - [Game 7 (F3D1 - Vocab): Phonics Bubble (Echo Arena Shooter)](#game-7-f3d1---vocab-phonics-bubble)
  - [Game 8 (F3D2 - Grammar): Chunk Catapult (Chunk Catapult Match)](#game-8-f3d2---grammar-chunk-catapult)
  - [Game 9 (F3D3 - Integration): Meteor Smasher (Storm Shield Defense)](#game-9-f3d3---integration-meteor-smasher)
- [Floor 4: Rune Sanctum (Creator Studio)](#floor-4-rune-sanctum)
  - [Game 10 (F4D1 - Vocab): Highway Runner (Highway Word Runner)](#game-10-f4d1---vocab-highway-runner)
  - [Game 11 (F4D2 - Grammar): Syntax Express Rail (Syntax Express)](#game-11-f4d2---grammar-syntax-express-rail)
  - [Game 12 (F4D3 - Integration): Lexical Riddle (Riddle Run Maze)](#game-12-f4d3---integration-lexical-riddle)
- [Floor 5: Apex Spire (Boss Castle Prep)](#floor-5-apex-spire)
  - [Game 13 (F5D1 - Vocab): Grand Matrix (Grand Matrix Dungeon)](#game-13-f5d1---vocab-grand-matrix)
  - [Game 14 (F5D2 - Grammar): Titan Forge (Titan Grammar Forge)](#game-14-f5d2---grammar-titan-forge)
  - [Game 15 (F5D3 - Integration): Cambridge Cloze (Cambridge Cloze Gauntlet)](#game-15-f5d3---integration-cambridge-cloze)
- [Floor 6: Arcane Skyway (Advanced Synthesis)](#floor-6-arcane-skyway)
  - [Game 16 (F6D1 - Vocab): Synonym Storm (Synonym Storm)](#game-16-f6d1---vocab-synonym-storm)
  - [Game 17 (F6D2 - Grammar): Connector Relay (Connector Relay)](#game-17-f6d2---grammar-connector-relay)
  - [Game 18 (F6D3 - Integration): Story Sequencer (Story Sequencer)](#game-18-f6d3---integration-story-sequencer)
- [Floor 7: Master Sanctum (Ultimate Master Gate)](#floor-7-master-sanctum)
  - [Game 19 (F7D1 - Vocab): Word Forge Scramble (Word Forge Scramble)](#game-19-f7d1---vocab-word-forge-scramble)
  - [Game 20 (F7D2 - Grammar): Question Quest (Question Quest)](#game-20-f7d2---grammar-question-quest)
  - [Game 21 (F7D3 - Integration): Word Class Duel (Rune Balance Scale)](#game-21-f7d3---integration-word-class-duel)

---

## FLOOR 1: CHAMBER OF TALES

### Game 1 (F1D1 - Vocab): Arcane Bubble
- **Component:** `src/modules/quest/BubbleStormChase.jsx`
- **Cơ chế:** Leo nhảy trên các tầng đá để làm vỡ bong bóng chứa từ vựng đúng khớp với định nghĩa ở thanh HUD trên cùng.
- **Dữ liệu hiển thị (10 Target Words tiêu biểu của tuần):**

| STT | Target Word | Định nghĩa hiển thị (Spellbook Banner) | Phương án nhiễu (Distractors) |
|---|---|---|---|
| 1 | `corridor` | a long passage in a building with doors on each side | classroom, cafeteria, balcony |
| 2 | `slipped` | slid accidentally on a wet surface and lost balance | jumped, climbed, rested |
| 3 | `nurse` | a person trained to care for sick or injured people | doctor, teacher, driver |
| 4 | `bandage` | a strip of material used to bind a wound or cut | ribbon, blanket, cushion |
| 5 | `safe` | not in danger or at risk of getting hurt | risky, dangerous, wild |
| 6 | `mistake` | an action or decision that is wrong or incorrect | victory, success, rule |
| 7 | `accident` | an unfortunate incident that happens unexpectedly | event, party, trip |
| 8 | `fix` | to repair or mend something that is broken or damaged | break, destroy, drop |
| 9 | `sorry` | feeling sadness or regret for a mistake made | happy, proud, angry |
| 10 | `careful` | giving serious attention to avoid danger or mistakes | clumsy, reckless, hasty |

---

### Game 2 (F1D2 - Grammar): Spell Train
- **Component:** `src/modules/quest/WordWagonJump.jsx`
- **Cơ chế:** Tàu hoả toa kéo chạy ngang. Học sinh nhảy lên toa tàu và chọn đúng từ điền vào các chỗ trống của câu văn ngữ pháp.
- **Dữ liệu hiển thị (3 Rounds liên hoàn):**

#### Round 1
- **Câu gốc hoàn chỉnh:** `"Jake was walking down the school corridor."`
- **Cấu trúc toa tàu & chỗ trống:**
  - Toa 1: `Jake was` (Cố định)
  - Toa 2 (Chỗ trống 1): Đáp án đúng: **`walking`** | Nhiễu: `sleeping`, `flying`
  - Toa 3: `down the school` (Cố định)
  - Toa 4 (Chỗ trống 2): Đáp án đúng: **`corridor.`** | Nhiễu: `kitchen.`, `garden.`

#### Round 2
- **Câu gốc hoàn chỉnh:** `"Rubber soles give strong grip on slippery tiles."`
- **Cấu trúc toa tàu & chỗ trống:**
  - Toa 1: `Rubber soles` (Cố định)
  - Toa 2 (Chỗ trống 1): Đáp án đúng: **`give`** | Nhiễu: `melt`, `drop`
  - Toa 3: `strong grip on` (Cố định)
  - Toa 4 (Chỗ trống 2): Đáp án đúng: **`slippery tiles.`** | Nhiễu: `flying clouds.`, `hot lava.`

#### Round 3
- **Câu gốc hoàn chỉnh:** `"Water on smooth tiles reduces friction quickly."`
- **Cấu trúc toa tàu & chỗ trống:**
  - Toa 1: `Water on tiles` (Cố định)
  - Toa 2 (Chỗ trống 1): Đáp án đúng: **`reduces`** | Nhiễu: `builds`, `freezes`
  - Toa 3: `friction` (Cố định)
  - Toa 4 (Chỗ trống 2): Đáp án đúng: **`quickly.`** | Nhiễu: `loudly.`, `softly.`

---

### Game 3 (F1D3 - Integration): Lexical Detective
- **Component:** `src/modules/quest/ShadowVaultInfiltrate.jsx`
- **Cơ chế:** Đột nhập hầm chứa cổ vật, né lính canh và mở khoá các két sắt chứa đúng từ vựng tương ứng với manh mối định nghĩa hiển thị.
- **Dữ liệu hiển thị (5 Két sắt mục tiêu):**

| Két số | Manh mối điều tra (Prompt Definition) | Đáp án đúng (Target Word) | Lựa chọn mở khoá (Choices) |
|---|---|---|---|
| Vault 1 | You walk along this long passage inside a school building to get to your classroom. | **`corridor`** | `corridor`, `cafeteria`, `playground` |
| Vault 2 | A trained medical worker at school who helps students when they get hurt. | **`nurse`** | `nurse`, `headmaster`, `cleaner` |
| Vault 3 | A soft piece of cloth used to cover and protect a cut or knee injury. | **`bandage`** | `bandage`, `cold pack`, `sticker` |
| Vault 4 | The person in charge of managing the school who praises students for safe behaviour. | **`headmaster`** | `headmaster`, `teacher`, `student` |
| Vault 5 | The resistance that one surface encounters when moving over another, stopping slips. | **`friction`** | `friction`, `gravity`, `speed` |

---

## FLOOR 2: ALCHEMY LAB

### Game 4 (F2D1 - Vocab): Crystal Match
- **Component:** `src/modules/quest/PotionFlipDungeon.jsx`
- **Cơ chế:** Lật thẻ ma thuật ghép đôi từ vựng với định nghĩa tiếng Anh tương ứng.
- **Dữ liệu hiển thị (6 Cặp thẻ mục tiêu):**

| Cặp | Thẻ Từ Vựng (Card A) | Thẻ Định Nghĩa (Card B) |
|---|---|---|
| 1 | `corridor` | a long passage in a building with doors on each side |
| 2 | `bandage` | a strip of material used to bind a wound or cut |
| 3 | `nurse` | a person trained to care for sick or injured people |
| 4 | `safe` | not in danger or at risk of getting hurt |
| 5 | `clumsy` | moving or acting awkwardly without grace or balance |
| 6 | `cold_pack` | a gel bag chilled in ice used to reduce swelling |

---

### Game 5 (F2D2 - Grammar): Rune Forge
- **Component:** `src/modules/quest/AnvilRushGrammar.jsx`
- **Cơ chế:** Leo lên giàn đe rèn ma thuật và nhảy dập (Jump-Strike) vào chiếc đe mang dạng ngữ pháp đúng của động từ.
- **Dữ liệu hiển thị (3 Rounds rèn đe):**

| Round | Câu hiển thị trên bảng rèn | Đáp án đúng (Đe chuẩn) | Các phương án đe (Options) |
|---|---|---|---|
| Round 1 | `Jake ___ carefully down the school corridor.` | **`walked`** | `walk`, `walked`, `walking` |
| Round 2 | `Rubber shoes ___ strong grip on wet floor.` | **`give`** | `gives`, `give`, `giving` |
| Round 3 | `Water on tiles ___ the friction quickly.` | **`reduces`** | `reduces`, `reduce`, `reduced` |

---

### Game 6 (F2D3 - Integration): Ancient Scroll
- **Component:** `src/modules/quest/ScrollChamberDecode.jsx`
- **Cơ chế:** Nhặt đá rune cổ rải rác trong thư viện, né bóng ma và nhảy lên bục đặt đá vào đúng 4 chỗ trống của cuộn giấy da.
- **Dữ liệu hiển thị:**
  - **Tiêu đề cuộn giấy da:** `"The Principles of Friction & Safety"`
  - **Văn bản hoàn chỉnh:** `"Rubber shoes create strong friction to prevent dangerous slips."`
  - **4 Vị trí chỗ trống cần giải mã:**
    - Chỗ trống 1 (`slot_0`): **`Rubber`**
    - Chỗ trống 2 (`slot_1`): **`friction`**
    - Chỗ trống 3 (`slot_2`): **`prevent`**
    - Chỗ trống 4 (`slot_3`): **`slips`**
  - **4 Đá rune gây nhiễu (Distractor Runes):** `Smooth`, `ice`, `cause`, `falls`

---

## FLOOR 3: THUNDER ARENA

### Game 7 (F3D1 - Vocab): Phonics Bubble
- **Component:** `src/modules/quest/EchoArenaShooter.jsx`
- **Cơ chế:** Bắn tia năng lượng làm nổ các quả cầu âm thanh chứa đúng âm vị mục tiêu.
- **Dữ liệu hiển thị (3 Vòng âm vị):**

| Vòng | Âm vị mục tiêu | Từ gợi ý | Quả cầu ĐÚNG (Targets) | Quả cầu SAI (Distractors) |
|---|---|---|---|---|
| Round 1 | **/sh/** | `shoe` | **`shoe`**, **`ship`** | `chair` (/ch/), `think` (/th/) |
| Round 2 | **/ch/** | `chair` | **`cheese`**, **`chalk`** | `sheep` (/sh/), `thumb` (/th/) |
| Round 3 | **/th/** | `thin` | **`thick`**, **`thumb`** | `shin` (/sh/), `chin` (/ch/) |

---

### Game 8 (F3D2 - Grammar): Chunk Catapult
- **Component:** `src/modules/chronicles/games/ChunkCatapultCanvas.jsx`
- **Nguồn dữ liệu tĩnh:** Constant `WEEKLY_CATAPULT_PAIRS[33]` trong `src/modules/chronicles/extractQuestVocab.js`.
- **Số lượng phần tử trong constant nguồn:** Đúng **6 cặp** (W33 core).
- **Cơ chế Runtime (SRS Pool):** Khi chạy qua `contentService.js` (`targetSize = 8` cho grammar), hệ thống nạp 6 cặp W33 core + bổ sung 2 cặp review từ các tuần trước (hoặc grammar duel sentences) để tạo thành chuỗi 8 lượt chơi (`Pair 1/8`).
- **Cơ chế chọn 2 bia mục tiêu nhiễu (Distractors):**
  - Trích xuất từ code `ChunkCatapultCanvas.jsx` (dòng 131-141): Lấy 2 `completion` từ các cặp khác trong `activePairs` (`activePairs.filter((_, idx) => idx !== currentIdx)`), kết hợp với `pair.completion` đúng thành 3 ứng viên và shuffle ngẫu nhiên vào 3 tọa độ bia `{ x: 420, 560, 680 }`.
  - Đây là **chủ đích thiết kế** (in-pool contextual distractors): các cụm từ nhiễu đều là cụm từ có thật trong bài học W33, nhưng khi ghép vào vế mở đầu thì chỉ có duy nhất 1 đáp án tạo thành câu đúng ngữ nghĩa và ngữ pháp.
- **Dữ liệu nguyên văn 6 Cặp cốt lõi W33 từ `WEEKLY_CATAPULT_PAIRS[33]`:**

| STT | Vế câu mở đầu (Slingshot Starter) | Cụm từ ĐÚNG (Target Completion) | Cơ chế 2 Bia Nhiễu (Distractors) |
|---|---|---|---|
| 1 | *"Jake was walking carefully down"* | **`the school corridor`** | Rút động từ pool completions còn lại (ví dụ: `the wet floor`, `the school nurse`) |
| 2 | *"Suddenly, he lost his balance on"* | **`the wet floor`** | Rút động từ pool completions còn lại (ví dụ: `the school corridor`, `a clean bandage`) |
| 3 | *"Jake stopped immediately and called"* | **`the school nurse`** | Rút động từ pool completions còn lại (ví dụ: `never to run in corridors`, `the wet floor`) |
| 4 | *"The nurse arrived quickly with"* | **`a clean bandage`** | Rút động từ pool completions còn lại (ví dụ: `the school nurse`, `a strong grip`) |
| 5 | *"The headmaster reminded all students"* | **`never to run in corridors`** | Rút động từ pool completions còn lại (ví dụ: `the wet floor`, `the school corridor`) |
| 6 | *"Rubber shoe soles provide"* | **`a strong grip`** | Rút động từ pool completions còn lại (ví dụ: `the wet floor`, `a clean bandage`) |

---

### Game 9 (F3D3 - Integration): Meteor Smasher
- **Component:** `src/modules/quest/StormShieldDefense.jsx`
- **Cơ chế:** Dùng khiên chắn sấm sét đỡ thiên thạch vàng chứa từ khóa bài học để nạp đầy 100% pin tháp ma thuật; né thiên thạch đỏ độc hại.
- **Dữ liệu hiển thị:**
  - **Thiên thạch ĐÚNG (Cần đỡ để nạp +20% pin):**
    `friction`, `rubber shoes`, `strong grip`, `prevent slips`, `polished tiles`, `bandage`, `corridor`, `nurse`
  - **Thiên thạch ĐỘC HẠI (Phải né tránh, chạm vào mất 1 Máu):**
    `ice slick`, `oil spill`, `banana peel`, `soap water`, `broken glass`

---

## FLOOR 4: RUNE SANCTUM

### Game 10 (F4D1 - Vocab): Highway 3D Word Runner
- **Component:** `src/modules/quest/HighwaySprint.jsx` (wraps `HighwaySprintCanvas.jsx`).
- **Khôi phục bản 3D:** Đã sửa route trong `DailyRoomScreen.jsx` trỏ về đúng component 3D pseudo-perspective (Subway Surfers style) với nhân vật Leo 3D.
- **Cơ chế:** Chạy dọc theo đường cao tốc 3D (3 làn), nghe/đọc định nghĩa mục tiêu trên banner đỉnh, chuyển làn để nhặt biển từ vựng đúng (`target_word`), nhảy qua rào cản (`⚡ JUMP`), trượt dưới tia laser (`⚡ SLIDE`) và né thùng chướng ngại vật (`DODGE`).
- **Nguồn dữ liệu:** Nạp động từ SRS `vocabItems` (10 items từ bài học W33) với fallback từ constant `DEFAULT_HIGHWAY_ROUNDS`:

| Đợt (Round) | Định nghĩa mục tiêu (Target Definition) | Biển từ ĐÚNG (Target Billboard) | Biển từ NHIỄU & Chướng ngại vật |
|---|---|---|---|
| Round 1 | *"The force that slows things down when surfaces slide together"* | **`friction`** | `gravity`, `magnetism`, rào cản Hurdle (`JUMP`) |
| Round 2 | *"The state of being protected from danger or injury"* | **`safety`** | `hazard`, `accident`, tia laser trên cao (`SLIDE`) |
| Round 3 | *"Difficult to stand or walk on because it is wet or smooth"* | **`slippery`** | `sticky`, `bumpy`, thùng cản Barrels (`DODGE`) |
| Round 4 | *"A tough, elastic material used to make shoes grip the floor"* | **`rubber`** | `plastic`, `metal`, rào cản Hurdle (`JUMP`) |
| Round 5 | *"A long hallway or passage inside a school or building"* | **`corridor`** | `balcony`, `basement`, tia laser trên cao (`SLIDE`) |
| Round 6 | *"A room specially equipped for scientific experiments"* | **`laboratory`** | `cafeteria`, `gymnasium`, rào cản Hurdle (`JUMP`) |
| Round 7 | *"The grip between shoes or tires and the floor to stop slipping"* | **`traction`** | `motion`, `weight`, thùng cản Barrels (`DODGE`) |
| Round 8 | *"To stop something dangerous or painful from happening"* | **`prevent`** | `allow`, `create`, tia laser trên cao (`SLIDE`) |
| Round 9 | *"Made smooth and shiny by rubbing or waxing"* | **`polished`** | `rough`, `dusty`, rào cản Hurdle (`JUMP`) |
| Round 10 | *"A strip of clean cloth used to cover and protect a wound"* | **`bandage`** | `blanket`, `ribbon`, thùng cản Barrels (`DODGE`) |

---

### Game 11 (F4D2 - Grammar): Syntax Express Rail
- **Component:** `src/modules/quest/SyntaxExpressRail.jsx`
- **Cơ chế:** Chạy trên giàn cầu vượt đường sắt và gạt cần bẻ ghi nối đúng mệnh đề ngữ pháp trước khi tàu hỏa chạy tới.
- **Dữ liệu hiển thị (3 Cần bẻ ghi):**

| Round | Mệnh đề chính (Stem) | Cần gạt ĐÚNG (Correct Clause) | 2 Cần gạt SAI (Distractors) |
|---|---|---|---|
| 1 | `If corridor floors are wet, people` | **`will slip easily`** | `slipped yesterday`, `are slipping now` |
| 2 | `Because friction was increased by rubber, Jake` | **`walked without falling`** | `fall down quickly`, `will fall tomorrow` |
| 3 | `Although polished tiles looked clean, they` | **`were very dangerous`** | `is safe today`, `was sticky honey` |

---

### Game 12 (F4D3 - Integration): Lexical Riddle
- **Component:** `src/modules/quest/RiddleRunMaze.jsx`
- **Cơ chế:** Mê cung đá cổ có quái vật tuần tra; giải câu đố Cambridge và mở cánh cửa hầm tương ứng.
- **Dữ liệu hiển thị (3 Câu đố):**

| Câu | Nội dung câu đố (Riddle Prompt) | Cửa ĐÚNG (Answer) | 2 Cửa SAI (Distractor Doors) |
|---|---|---|---|
| Riddle 1 | *"I am the invisible force that stops shoes from slipping on wet tiles. What am I?"* | **`Friction`** | `Gravity`, `Electricity` |
| Riddle 2 | *"I have soles made of special rubber that give strong grip on wet floors. What am I?"* | **`Sneakers`** | `Skates`, `Slippers` |
| Riddle 3 | *"I am a room filled with test tubes where students investigate science. What am I?"* | **`Laboratory`** | `Library`, `Kitchen` |

---

## FLOOR 5: APEX SPIRE

### Game 13 (F5D1 - Vocab): Grand Matrix
- **Component:** `src/modules/quest/GrandMatrixDungeon.jsx`
- **Cơ chế:** Đấu trường lưới tọa độ không gian ma trận; đọc định nghĩa và thu thập ký tự glyph đúng trên các nút tọa độ.
- **Dữ liệu hiển thị Thực tế (4 Vòng ma trận đã kiểm chứng Runtime qua Phương án B):**
- **Xuất xứ (Provenance):** 100% từ vựng Cambridge A2 chính thống từ `src/data/weeks/week_33/vocab.js`. Định nghĩa viết thường chuẩn từ điển đồng nhất.

| Round | Định nghĩa mục tiêu (Target Definition) | Glyph ĐÚNG (Correct Target Word) | 3 Glyph NHIỄU trên sân (Distractor Glyphs) |
|---|---|---|---|
| Round 1 | `"a strip of material used to bind a wound or cut"` | **`bandage`** | `nurse`, `slipped`, `mistake` |
| Round 2 | `"a person trained to care for sick or injured people"` | **`nurse`** | `bandage`, `mistake`, `slipped` |
| Round 3 | `"an action or decision that is wrong or incorrect"` | **`mistake`** | `slipped`, `bandage`, `nurse` |
| Round 4 | `"slid accidentally on a wet surface and lost balance"` | **`slipped`** | `nurse`, `mistake`, `bandage` |
- **File bằng chứng kiểm chứng:** `docs/agent_artifacts/screenshots/c5_grand_matrix_4rounds_semantic_evidence.json`
- **Ảnh bằng chứng:** `c5_grand_matrix_round_1_verified.png` $\rightarrow$ `c5_grand_matrix_round_4_verified.png`

---

### Game 14 (F5D2 - Grammar): Titan Forge
- **Component:** `src/modules/quest/TitanGrammarForge.jsx`
- **Cơ chế:** Phòng máy khổng lồ của người máy Titan; nhảy qua các sàn bánh răng nâng cao, né tránh các luồng hơi nước áp suất cao định kỳ và kích hoạt bánh răng mang mệnh đề ngữ pháp chuẩn xác.
- **Xuất xứ (Provenance):** Câu cấu trúc ngữ pháp điều kiện và hệ quả (Conditional clauses with Without, Purpose clause with So that, Inversion conditional with Had) biên soạn sư phạm nâng cao cho Tầng 5 Apex Spire theo chủ đề ma sát và đế giày cao su an toàn của W33.
- **Dữ liệu hiển thị (3 Bánh răng Titan — Đã kiểm chứng Runtime):**

| Round | Mệnh đề dẫn (Stem) | Bánh răng ĐÚNG (Correct Clause) | 2 Bánh răng SAI (Distractors) |
|---|---|---|---|
| 1 | `Without sufficient friction, the vehicle` | **`could not stop in time`** | `stops immediately now`, `will stopped yesterday` |
| 2 | `The engineer designed rubber soles so that` | **`workers would stay safe`** | `tiles are slippery`, `everyone falling down` |
| 3 | `Had Jake not noticed the warning sign, he` | **`might have suffered an injury`** | `walks happily away`, `is safe right now` |

- **File bằng chứng kiểm chứng:** `docs/agent_artifacts/screenshots/c6_titan_forge_audit_evidence.json`
- **Ảnh bằng chứng:** `c6_titan_forge_desktop_1280x800.png`, `c6_titan_forge_guide_modal.png`, `c6_titan_forge_baseline_before_click.png`, `c6_titan_forge_after_correct_action.png`, `c6_titan_forge_mobile_390x844.png`, `c6_titan_forge_victory_modal.png`

---

### Game 15 (F5D3 - Integration): Cambridge Cloze
- **Component:** `src/modules/quest/CambridgeClozeGauntlet.jsx`
- **Cơ chế:** Đỉnh tháp Zenith Spire; bưng các tinh thể từ vựng nhảy qua các tầng mây để khảm vào 5 vị trí trống của đài tưởng niệm.
- **Dữ liệu hiển thị:**
  - **Tiêu đề văn bản:** `"The Master Investigation of Corridors & Friction"`
  - **Đoạn văn hoàn chỉnh:** `"During the science investigation, Jake noticed that wet tiles cause dangerous accidents because friction decreases rapidly. By wearing special rubber shoes, students gain strong grip and maintain perfect safety."`
  - **5 Vị trí khảm tinh thể:**
    - Khảm 1 (`slot_0`): **`investigation`**
    - Khảm 2 (`slot_1`): **`dangerous`**
    - Khảm 3 (`slot_2`): **`friction`**
    - Khảm 4 (`slot_3`): **`rubber`**
    - Khảm 5 (`slot_4`): **`safety`**
  - **5 Tinh thể gây nhiễu (Distractor Crystals):** `eating`, `pleasant`, `sugar`, `paper`, `danger`

---

## FLOOR 6: ARCANE SKYWAY

### Game 16 (F6D1 - Vocab): Synonym Storm
- **Component:** `src/modules/chronicles/games/SynonymStormGame.jsx`
- **Cơ chế:** Ghép cặp từ đồng nghĩa (Synonyms) trong cơn bão băng ma thuật với chuỗi combo nhân điểm.
- **Dữ liệu hiển thị (8 Cặp từ đồng nghĩa chuẩn Cambridge A2):**

| STT | Từ gốc (Target Word) | Từ đồng nghĩa ĐÚNG (Match) | 3 Phương án nhiễu (Distractors) |
|---|---|---|---|
| 1 | `careful` | **`cautious`** | `reckless`, `hasty`, `noisy` |
| 2 | `prevent` | **`stop`** | `cause`, `allow`, `start` |
| 3 | `slipped` | **`slid`** | `climbed`, `jumped`, `stood` |
| 4 | `clean` | **`pure`** | `dirty`, `muddy`, `dusty` |
| 5 | `rapid` | **`quick`** | `slow`, `delayed`, `heavy` |
| 6 | `safe` | **`secure`** | `risky`, `broken`, `wild` |
| 7 | `help` | **`assist`** | `harm`, `ignore`, `block` |
| 8 | `firmly` | **`tightly`** | `loosely`, `weakly`, `softly` |

---

### Game 17 (F6D2 - Grammar): Connector Relay
- **Component:** `src/modules/chronicles/games/ConnectorRelayGame.jsx`
- **Cơ chế:** Leo chạy trên cầu năng lượng chasm; chọn liên từ (connector) chuẩn xác để nạp năng lượng cho đoạn cầu tiếp theo.
- **Dữ liệu hiển thị (5 Câu liên từ):**

| Câu | Câu hỏi với chỗ trống (Sentence) | Liên từ ĐÚNG | 3 Phương án nhiễu | Gợi ý sư phạm (Pedagogy Hint) |
|---|---|---|---|---|
| 1 | *Jake walked carefully down the corridor _____ the floor was wet after science class.* | **`because`** | `although`, `so`, `unless` | The second clause explains the cause/reason for walking carefully. |
| 2 | *The nurse arrived immediately, _____ she quickly wrapped a clean bandage around his knee.* | **`and`** | `but`, `although`, `because` | Connecting two consecutive actions in the sequence. |
| 3 | *Tom lost his balance _____ rubber shoes normally provide good friction.* | **`although`** | `because`, `so`, `unless` | Contrast between normal expectation and the actual outcome. |
| 4 | *Students should always walk slowly _____ dangerous slips can be avoided.* | **`so`** | `because`, `although`, `since` | Shows the intended result or purpose of walking slowly. |
| 5 | *You will slip on the smooth corridor tiles _____ you wear shoes with strong rubber grip.* | **`unless`** | `because`, `although`, `so` | 'Unless' means 'except if'. |

---

### Game 18 (F6D3 - Integration): Story Sequencer
- **Component:** `src/modules/chronicles/games/StorySequencerGame.jsx`
- **Cơ chế:** Sắp xếp 5 thẻ diễn biến câu chuyện bị xáo trộn về đúng trình tự thời gian (1 $\rightarrow$ 5).
- **Dữ liệu hiển thị (5 Thẻ diễn biến W33 theo đúng thứ tự logic):**

| Thứ tự chuẩn | Nội dung thẻ câu chuyện (Narrative Scene) |
|---|---|
| **Vị trí 1** | *Jake was walking carefully down the school corridor after science class.* |
| **Vị trí 2** | *Suddenly, he lost his balance on the wet floor and slipped.* |
| **Vị trí 3** | *Jake stopped immediately to help his friend and called the school nurse.* |
| **Vị trí 4** | *The nurse arrived quickly with a clean bandage and a cold pack to treat the cut.* |
| **Vị trí 5** | *Everyone felt relieved, and the headmaster reminded all students never to run.* |

---

## FLOOR 7: MASTER SANCTUM

### Game 19 (F7D1 - Vocab): Word Forge Scramble
- **Component:** `src/modules/chronicles/games/WordForgeScrambleGame.jsx`
- **Cơ chế:** Lò rèn chữ cổ; học sinh đọc định nghĩa và chạm vào các khối chữ cái đảo lộn (Anagram) để sắp xếp thành từ đúng.
- **Dữ liệu hiển thị (5 Từ vựng mục tiêu):**

| STT | Từ vựng cần xếp | Định nghĩa hiển thị (Definition Hint) | Bộ ký tự bị xáo trộn (Letter Tiles) |
|---|---|---|---|
| 1 | **`CORRIDOR`** | a long passage in a building with doors on each side | `C, O, R, R, I, D, O, R` (xáo ngẫu nhiên) |
| 2 | **`BANDAGE`** | a strip of material used to bind a wound or cut | `B, A, N, D, A, G, E` (xáo ngẫu nhiên) |
| 3 | **`FRICTION`** | the resistance that one surface encounters when moving over another | `F, R, I, C, T, I, O, N` (xáo ngẫu nhiên) |
| 4 | **`SLIPPED`** | slid accidentally on a wet surface and lost balance | `S, L, I, P, P, E, D` (xáo ngẫu nhiên) |
| 5 | **`CAREFUL`** | giving serious attention to avoid danger or mistakes | `C, A, R, E, F, U, L` (xáo ngẫu nhiên) |

---

### Game 20 (F7D2 - Grammar): Question Quest
- **Component:** `src/modules/chronicles/games/QuestionQuestGame.jsx`
- **Nguồn dữ liệu:** `src/data/weeks/week_33/wh_questions.js`
- **Cơ chế:** Đọc câu trần thuật và chọn câu hỏi WH-question tương ứng để truy vấn thông tin cốt lõi.
- **Dữ liệu hiển thị (5 Câu hỏi WH chuẩn hóa):**

| STT | Câu gốc (Narrative Sentence) | Câu hỏi WH ĐÚNG | 2 Câu hỏi WH NHIỄU | Gợi ý sư phạm (Hint) |
|---|---|---|---|---|
| 1 | *Jake was walking carefully down the school corridor after science class.* | **What was Jake doing?** | Where was Jake going? / When was Jake walking? | Notice the past continuous tense: 'was walking carefully'. |
| 2 | *Suddenly, he lost his balance on the wet floor and slipped.* | **What happened suddenly?** | Why did he slip? / Where did he fall? | Look at the time adverb 'Suddenly' at the start of the event. |
| 3 | *Jake stopped immediately to help his friend and called the school nurse.* | **What did Jake do?** | Who did Jake help? / When did Jake stop? | This question asks about the primary action Jake took. |
| 4 | *The nurse arrived quickly with a clean bandage and a cold pack to treat the cut.* | **What did the nurse bring?** | Who did the nurse help? / When did the nurse arrive? | Notice the supplies brought: 'a clean bandage and a cold pack'. |
| 5 | *Everyone felt relieved, and the headmaster reminded all students never to run.* | **What did the headmaster remind everyone about?** | Why did everyone feel relieved? / Who did the headmaster talk to? | Look at the advice given by the headmaster in the corridor. |

---

### Game 21 (F7D3 - Integration): Word Class Duel
- **Component:** `src/modules/chronicles/games/WordClassDuelGame.jsx`
- **Nguồn dữ liệu:** `src/data/weeks/week_33/word_class_duel.js`
- **Cơ chế:** Cân thăng bằng ngữ pháp cổ; học sinh xác định chính xác câu văn nào sử dụng từ mục tiêu với từ loại (Part of Speech) được yêu cầu (Danh từ hay Động từ).
- **Dữ liệu hiển thị (Đủ 4 Rounds, 4 Thẻ mỗi Round):**

#### Round 1: Từ mục tiêu `grip` — Tìm câu dùng như ĐỘNG TỪ (VERB)
- **Yêu cầu (Prompt):** *"Which sentence uses 'grip' as a VERB (hành động)?"*
- **Thẻ 1 (ĐÚNG — VERB):** *"Your rubber shoes grip firmly on dry corridor tiles."*
- **Thẻ 2 (SAI — NOUN):** *"Rubber gives a strong grip on clean floors."*
- **Thẻ 3 (SAI — NOUN):** *"Plastic soles with no grip can cause accidents."*
- **Thẻ 4 (SAI — NOUN):** *"The friendly grip between soles and floor keeps you safe."*
- **Gợi ý sư phạm (Hint):** *"Look for the sentence where 'grip' describes an action done by the shoes."*
- **Xuất xứ (Provenance):** Trích verbatim từ bài đọc CLIL Tuần 33.

#### Round 2: Từ mục tiêu `slide` — Tìm câu dùng như DANH TỪ (NOUN)
- **Yêu cầu (Prompt):** *"Which sentence uses 'slide' as a NOUN (danh từ)?"*
- **Thẻ 1 (ĐÚNG — NOUN):** *"Water turns safe corridors into a dangerous slide."*
- **Thẻ 2 (SAI — VERB):** *"Smooth soles slide easily across wet tiles."*
- **Thẻ 3 (SAI — VERB):** *"Children might slide and fall when running."*
- **Thẻ 4 (SAI — VERB):** *"Friction stops you before you slide too far."*
- **Gợi ý sư phạm (Hint):** *"Notice 'a dangerous slide' — 'slide' is preceded by an article and adjective."*
- **Xuất xứ (Provenance):** Câu biên soạn sư phạm (authored draft) theo chủ đề W33.

#### Round 3: Từ mục tiêu `care` — Tìm câu dùng như ĐỘNG TỪ (VERB)
- **Yêu cầu (Prompt):** *"Which sentence uses 'care' as a VERB (hành động)?"*
- **Thẻ 1 (ĐÚNG — VERB):** *"Teachers care deeply about student safety."*
- **Thẻ 2 (SAI — NOUN):** *"Take great care when walking down the corridor."*
- **Thẻ 3 (SAI — NOUN):** *"School safety and care are our responsibility."*
- **Thẻ 4 (SAI — NOUN):** *"The nurse provided gentle medical care."*
- **Gợi ý sư phạm (Hint):** *"Find the sentence where 'care' tells what teachers do."*
- **Xuất xứ (Provenance):** Câu biên soạn sư phạm (authored draft) theo chủ đề W33.

#### Round 4: Từ mục tiêu `help` — Tìm câu dùng như DANH TỪ (NOUN)
- **Yêu cầu (Prompt):** *"Which sentence uses 'help' as a NOUN (danh từ)?"*
- **Thẻ 1 (ĐÚNG — NOUN):** *"Jake called the nurse for immediate help."*
- **Thẻ 2 (SAI — VERB):** *"Good students help each other when someone falls."*
- **Thẻ 3 (SAI — VERB):** *"Cold packs help reduce painful swelling."*
- **Thẻ 4 (SAI — VERB):** *"Warning signs help students stay alert."*
- **Gợi ý sư phạm (Hint):** *"'immediate help' — 'help' functions as the object of the preposition 'for'."*
- **Xuất xứ (Provenance):** Câu biên soạn sư phạm (authored draft) theo chủ đề W33.
