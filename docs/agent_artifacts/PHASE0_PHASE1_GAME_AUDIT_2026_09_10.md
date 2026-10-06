# BÁO CÁO PHASE 0 + PHASE 1 — KIỂM CHỨNG & CHỐT 21 MINI-GAMES
**Ngày:** 10/09/2026  
**Phiên:** Checkpoint 39  
**Phương pháp:** Puppeteer Deep Audit v3 — Click "🔑 Open Chest" → Enter game thật → DOM verbatim + Screenshot  
**Bằng chứng:** 12 screenshots thật + DOM text trích xuất 100% từ `document.body.innerText` runtime

---

## PHASE 0 — KIỂM CHỨNG 15 GAMES HIỆN TẠI

### Kết quả tổng quan
- **Tổng:** 15 games × 5 floors × 3 doors
- **Status:** 15/15 games load thành công — 0 crash, 0 blank screen, 0 console error
- **Phương thức truy cập đúng:** URL `?room=N` sử dụng dayIndex 0-indexed (Floor 1 = room=0, Floor 5 = room=4)

---

### Floor 1: Chamber of Tales (room=0)

**[1] arcane_bubble — Arcane Bubble Pop (Vocab)**  
- **Status:** ✅ PREV_VERIFIED (pilot session)  
- **Engine:** Phaser (`BubbleStormChase`)  
- **Pedagogy:** Vocab recognition — pop correct bubbles

**[2] spell_train — Spell Sentence Train (Grammar)**  
- **Status:** ✅ REACT_LOADED — No crash, no error  
- **Engine:** Phaser (`WordWagonJump`)  
- **DOM verbatim (observed):**
```
TRAIN 1/3 | The | [ 1: ??? ] | arrived quickly with a clean | [ 2: ??? ]
STATION 1 | nurse | running | sleeping
👾 GREMLIN | FLOOR 1 | Door 2 — Word Wagon Jump | ⏱️ 1:27 | ⚡ 0 XP
```
- **Nội dung W33:** Câu "The [nurse] arrived quickly with a clean [bandage]" — chủ đề trường học/y tế ✅

**[3] lexical_det — Lexical Detective (Integration)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`ShadowVaultInfiltrate`)  
- **DOM verbatim (observed):**
```
VAULT INFILTRATION • 0/4 CRACKED | Touch an unsolved safe on the LEFT to grab a word!
🔒 playground | 🔒 slippery layer | 🔒 Suddenly, he lost his balance on the wet floor
🔒 slipped on the wet floor
📦 Related to slipped on the wet floor | 📦 A thin layer of water that makes surfaces slick
📦 An open area where children play during break time.
FLOOR 1 | Door 3 — Vault Infiltration | ⏱️ 1:27
```
- **Nội dung W33:** Từ vựng + định nghĩa chủ đề sàn trượt/sân trường ✅

---

### Floor 2: Alchemy Lab (room=1)

**[4] crystal_match — Crystal Memory Match (Vocab)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`PotionFlipDungeon`)  
- **DOM verbatim (observed):**
```
0/4 BREWED | Jump on cauldrons to match pairs!
⚗️ ⚗️ ⚗️ ⚗️ ⚗️ ⚗️ ⚗️ ⚗️
🦎 | ❤️ ❤️ ❤️ | FLOOR 2 | Door 1 — Potion Flip Dungeon | ⏱️ 1:27
```
- **Ghi chú:** 8 cauldrons đang úp — từ vựng chỉ lộ khi flip. DOM không thể capture nội dung ẩn. **Không phải lỗi — đây là cơ chế memory match đúng design.**

**[5] rune_forge — Rune Forge (Grammar)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`AnvilRushGrammar`)  
- **DOM verbatim (observed):**
```
RUNE FORGE • TRIAL 1/3 | Jake ___ immediately and called the school nurse
stopped ⚒️ | stoppeds ⚒️ | stoppeding ⚒️
👺 | ❤️ ❤️ ❤️ | FLOOR 2 | Door 2 — Anvil Rush Grammar | ⏱️ 1:12
```
- **Nội dung W33:** Câu W33 thực tế + morphology errors làm distractors ✅

**[6] ancient_scroll — Ancient Scroll Cloze (Integration)**  
- **Status:** ⚠️ LOADED nhưng có vấn đề HARDCODE  
- **Engine:** Phaser (`ScrollChamberDecode`)  
- **DOM verbatim (observed):**
```
The Principles of Friction & Safety | Blanks Restored: 0/4
[?] [?] [?] [?]
stays balanced | playground | Jake stopped immediately and called the school nurse | slippery layer
Smooth | ice | cause | falls
FLOOR 2 | Door 3 — Scroll Chamber Decode | ⏱️ 1:57
```
- **🔴 Bug phát hiện:** Title `"The Principles of Friction & Safety"` và distractors `['Smooth', 'ice', 'cause', 'falls']` bị HARDCODE trong `DailyRoomScreen.jsx` lines 308-316. Khi sang tuần khác (W34, W40...) title vẫn là "Friction & Safety" và distractors vẫn là 4 từ này — **sẽ sai hoàn toàn về chủ đề.**
- **Các blank answers:** `stays balanced | playground | Jake stopped | slippery layer` — đây là vocabItems[0-3] từ W33, đúng ✅  
- **Cần fix trước Phase 3:** Đọc title và distractors từ `writingHubData` hoặc `listeningHubData` theo tuần

---

### Floor 3: Thunder Arena (room=2)

**[7] phonics_bubble — Phonics Sound Blaster (Vocab)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`EchoArenaShooter`)  
- **DOM verbatim (observed):**
```
Listen | Sound: /sh/ | 1/3 | chair | think | shoe | ship
🦇 JAMMER | ⚡ Tap any orb or tap screen to shoot! Swipe to steer Leo.
❤️ ❤️ ❤️ | FLOOR 3 | Door 1 — Echo Arena Shooter | ⏱️ 0:57
```
- **Ghi chú Sư phạm:** Game này dùng **phonics curriculum cố định** (/sh/ sound), KHÔNG lấy vocab từ weekly hub. Đây là thiết kế đúng — phonics dạy sound patterns, không phải weekly vocab. ✅ Acceptable.

**[8] chunk_catapult — Chunk Catapult Match (Grammar)** — PREV_VERIFIED ✅

**[9] meteor_smasher — Meteor Smasher (Integration)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`StormShieldDefense`)  
- **DOM verbatim (observed):**
```
Storm Battery: 0% | Deflect Golden Meteors! | first-aid kit
❤️ ❤️ ❤️ | FLOOR 3 | Door 3 — Storm Shield Defense | ⏱️ 0:42
```
- **Nội dung W33:** `"first-aid kit"` là vocab W33 ✅

---

### Floor 4: Rune Sanctum (room=3)

**[10] highway_runner — Highway Word Runner (Vocab)** — PREV_VERIFIED ✅

**[11] spell_train_express — Syntax Express 4-Car (Grammar)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`SyntaxExpressRail`)  
- **DOM verbatim (observed):**
```
R1/3 | Rubber shoe soles | [ ? ] | Junction:
🚆 stopped completely 🎚️ | provide a strong grip 🎚️ | is floating in air 🎚️
❤️ ❤️ ❤️ | FLOOR 4 | Door 2 — Syntax Express Rail | ⏱️ 1:27
```
- **Nội dung W33:** "Rubber shoe soles [provide a strong grip]" — câu grammar hoàn chỉnh về friction ✅

**[12] lexical_riddle — Mystery Riddle Detective (Integration)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`RiddleRunMaze`)  
- **DOM verbatim (observed):**
```
"I am the invisible force that stops shoes from slipping on wet tiles. What am I?"
Riddle 1/3 | Electricity 🚪 | Gravity 🚪 | Friction 🚪
🐺 CHASER | ❤️ ❤️ 🖤 | FLOOR 4 | Door 3 — Riddle Run Maze | ⏱️ 1:27
```
- **Nội dung W33:** Riddle về Friction — đúng chủ đề ✅

---

### Floor 5: Apex Spire (room=4)

**[13] grand_matrix — Grand Master Matrix (Vocab)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`GrandMatrixDungeon`)  
- **DOM verbatim (observed):**
```
Matrix Query: "You walk along this long passage inside a school building to get to your classroom."
Node 1/4 | applied a clean bandage | nurse | corridor | reduces friction
👁️ GLITCH | ❤️ ❤️ ❤️ | FLOOR 5 | Door 1 — Grand Matrix Dungeon | ⏱️ 1:27
```
- **Nội dung W33:** Definition for "corridor" ✅, vocab nodes gồm W33 words ✅

**[14] titan_forge — Titan Grammar Forge (Grammar)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`TitanGrammarForge`)  
- **DOM verbatim (observed):**
```
Friction prevents dangerous | [ ___ ? ___ ] | Gear 1/3
💨 Scalded by Titan Steam Vent! (-1 Heart)
slips across wet surfaces. ⚙️ | stopped unexpectedly ⚙️ | is falling fast ⚙️
❤️ ❤️ 🖤 | FLOOR 5 | Door 2 — Titan Grammar Forge | ⏱️ 1:27
```
- **Nội dung W33:** "Friction prevents dangerous [slips across wet surfaces]" ✅

**[15] cambridge_cloze — Cambridge Cloze Gauntlet (Integration)**  
- **Status:** ✅ REACT_LOADED  
- **Engine:** Phaser (`CambridgeClozeGauntlet`)  
- **DOM verbatim (observed):**
```
The Master Investigation of Corridors & Friction | Zenith Seals Restored: 0/5
ZENITH STAR MONUMENT | [?] [?] [?] [?] [?]
investigation | dangerous | friction | rubber | safety
eating | pleasant | sugar | paper | danger
🔮 WATCHER | ❤️ ❤️ ❤️ | FLOOR 5 | Door 3 — Cambridge Cloze Gauntlet | ⏱️ 1:57
```
- **Nội dung W33:** Cloze về "Corridors & Friction" với các từ W33 (investigation, friction, rubber, safety) ✅

---

## BẢNG TỔNG KẾT PHASE 0

| # | Floor | Game ID | Display Name | Engine | Status | Nội dung W33 |
|---|-------|---------|--------------|--------|--------|--------------|
| 1 | F1/D0 | `arcane_bubble` | Arcane Bubble Pop | Phaser | ✅ PREV VERIFIED | ✅ |
| 2 | F1/D1 | `spell_train` | Spell Sentence Train | Phaser | ✅ LOADED | ✅ "The nurse arrived..." |
| 3 | F1/D2 | `lexical_det` | Lexical Detective | Phaser | ✅ LOADED | ✅ "slippery layer/playground" |
| 4 | F2/D0 | `crystal_match` | Crystal Memory Match | Phaser | ✅ LOADED | ⚠️ Words hidden (expected) |
| 5 | F2/D1 | `rune_forge` | Rune Forge | Phaser | ✅ LOADED | ✅ "Jake ___ immediately" |
| 6 | F2/D2 | `ancient_scroll` | Ancient Scroll Cloze | Phaser | ⚠️ LOADED+BUG | 🔴 Title+distractors hardcoded |
| 7 | F3/D0 | `phonics_bubble` | Phonics Sound Blaster | Phaser | ✅ LOADED | ℹ️ Fixed phonics curriculum |
| 8 | F3/D1 | `chunk_catapult` | Chunk Catapult Match | React Canvas | ✅ PREV VERIFIED | ✅ |
| 9 | F3/D2 | `meteor_smasher` | Meteor Smasher | Phaser | ✅ LOADED | ✅ "first-aid kit" |
| 10 | F4/D0 | `highway_runner` | Highway Word Runner | React | ✅ PREV VERIFIED | ✅ |
| 11 | F4/D1 | `spell_train_express` | Syntax Express 4-Car | Phaser | ✅ LOADED | ✅ "Rubber shoe soles" |
| 12 | F4/D2 | `lexical_riddle` | Mystery Riddle Detective | Phaser | ✅ LOADED | ✅ "invisible force/Friction" |
| 13 | F5/D0 | `grand_matrix` | Grand Master Matrix | Phaser | ✅ LOADED | ✅ "corridor" definition |
| 14 | F5/D1 | `titan_forge` | Titan Grammar Forge | Phaser | ✅ LOADED | ✅ "Friction prevents dangerous..." |
| 15 | F5/D2 | `cambridge_cloze` | Cambridge Cloze Gauntlet | Phaser | ✅ LOADED | ✅ "Corridors & Friction cloze" |

**Kết luận Phase 0:** 15/15 games hoạt động. 1 bug hardcode tại `ancient_scroll` cần fix trước Phase 3.

---

## PHASE 1 — CHỐT DANH SÁCH 21 GAMES (7/7/7)

### Phân bổ hiện tại (15 games)

| Category | Games hiện có (5) |
|----------|------------------|
| **Vocab** | arcane_bubble, crystal_match, phonics_bubble, highway_runner, grand_matrix |
| **Grammar** | spell_train, rune_forge, chunk_catapult, spell_train_express, titan_forge |
| **Integration** | lexical_det, ancient_scroll, meteor_smasher, lexical_riddle, cambridge_cloze |

**Còn thiếu:** 2 Vocab + 2 Grammar + 2 Integration = **6 games mới (Track C)**

### Đề xuất 6 Games Mới (Track C)

Dựa trên kỹ năng Cambridge còn thiếu trong ma trận sư phạm (từ kế hoạch 10/09/2026):

#### 2 Vocab Games Mới:
| # | Tên Game | Mechanic | Kỹ năng Cambridge | Priority |
|---|----------|----------|-------------------|----------|
| V6 | **Word Morph Builder** | Kéo thả morpheme (root/prefix/suffix) để xây từ | Spelling & Word Construction (#3) | 🔥 HIGH |
| V7 | **Synonym Storm** | Chọn synonym/antonym trong luồng từ rơi | Synonyms/Antonyms (#2) | 🔥 HIGH |

#### 2 Grammar Games Mới:
| # | Tên Game | Mechanic | Kỹ năng Cambridge | Priority |
|---|----------|----------|-------------------|----------|
| G6 | **Preposition Portal** | Điền giới từ đúng để mở cổng dịch chuyển | Prepositions & Collocations (#7) | 🔥 HIGH |
| G7 | **Tense Transformer** | Chuyển câu sang thì yêu cầu (Present→Past→Future) | Tense & Aspect (#4) | ⬆️ MED |

#### 2 Integration Games Mới:
| # | Tên Game | Mechanic | Kỹ năng Cambridge | Priority |
|---|----------|----------|-------------------|----------|
| I6 | **Story Sequencer** | Xếp lại 4-5 câu theo đúng trật tự logic câu chuyện | Text Organization / Reading (#9) | 🔥 HIGH |
| I7 | **Paragraph Detective** | Đọc đoạn văn ngắn, trả lời 3 câu hỏi WH | Reading Comprehension (#10) | ⬆️ MED |

### Ma trận 21 Games Hoàn chỉnh (7/7/7)

| # | Category | Game ID | Display Name | Floor/Door | Status |
|---|----------|---------|--------------|------------|--------|
| V1 | Vocab | `arcane_bubble` | Arcane Bubble Pop | F1/D0 | ✅ Live |
| V2 | Vocab | `crystal_match` | Crystal Memory Match | F2/D0 | ✅ Live |
| V3 | Vocab | `phonics_bubble` | Phonics Sound Blaster | F3/D0 | ✅ Live |
| V4 | Vocab | `highway_runner` | Highway Word Runner | F4/D0 | ✅ Live |
| V5 | Vocab | `grand_matrix` | Grand Master Matrix | F5/D0 | ✅ Live |
| **V6** | Vocab | `word_morph` | **Word Morph Builder** | Track C | 🔨 TO BUILD |
| **V7** | Vocab | `synonym_storm` | **Synonym Storm** | Track C | 🔨 TO BUILD |
| G1 | Grammar | `spell_train` | Spell Sentence Train | F1/D1 | ✅ Live |
| G2 | Grammar | `rune_forge` | Rune Forge | F2/D1 | ✅ Live |
| G3 | Grammar | `chunk_catapult` | Chunk Catapult Match | F3/D1 | ✅ Live |
| G4 | Grammar | `spell_train_express` | Syntax Express 4-Car | F4/D1 | ✅ Live |
| G5 | Grammar | `titan_forge` | Titan Grammar Forge | F5/D1 | ✅ Live |
| **G6** | Grammar | `preposition_portal` | **Preposition Portal** | Track C | 🔨 TO BUILD |
| **G7** | Grammar | `tense_transformer` | **Tense Transformer** | Track C | 🔨 TO BUILD |
| I1 | Integration | `lexical_det` | Lexical Detective | F1/D2 | ✅ Live |
| I2 | Integration | `ancient_scroll` | Ancient Scroll Cloze | F2/D2 | ⚠️ Live+BugFix |
| I3 | Integration | `meteor_smasher` | Meteor Smasher | F3/D2 | ✅ Live |
| I4 | Integration | `lexical_riddle` | Mystery Riddle Detective | F4/D2 | ✅ Live |
| I5 | Integration | `cambridge_cloze` | Cambridge Cloze Gauntlet | F5/D2 | ✅ Live |
| **I6** | Integration | `story_sequencer` | **Story Sequencer** | Track C | 🔨 TO BUILD |
| **I7** | Integration | `paragraph_detective` | **Paragraph Detective** | Track C | 🔨 TO BUILD |

---

## BUG LIST CẦN FIX TRƯỚC PHASE 3

### 🔴 BUG-001 — ancient_scroll: Title + Distractors Hardcoded
- **File:** `src/modules/chronicles/DailyRoomScreen.jsx` lines 303-322
- **Vấn đề:** `title: 'The Principles of Friction & Safety'` và `distractors: ['Smooth', 'ice', 'cause', 'falls']` không thay đổi theo tuần
- **Fix:** Đọc title từ `listeningHubData.action_lab?.report_templates[0]?.title` và distractors từ vocab pool W33

### ℹ️ NOTE-001 — phonics_bubble: Fixed Curriculum (Acceptable)
- Phonics game dùng curriculum cố định (/sh/, /ch/, /th/ sounds) — KHÔNG lấy từ weekly hub
- Đây là thiết kế đúng về sư phạm phonics
- **Không cần fix**

### ℹ️ NOTE-002 — crystal_match: Words Hidden (Expected)
- Memory match game: từ vựng được úp mặt xuống theo design
- **Không phải bug** — đây là cơ chế gameplay đúng

---

## BƯỚC TIẾP THEO

1. **Fix BUG-001** (`ancient_scroll` hardcode) — 30 phút
2. **Track C: Build 6 games mới** — chờ phê duyệt danh sách trên
3. **Phase 2: ContentService Rotation** — implement sliding window N=7
4. **Phase 3: Pilot W33 full** — test toàn bộ 21 games

