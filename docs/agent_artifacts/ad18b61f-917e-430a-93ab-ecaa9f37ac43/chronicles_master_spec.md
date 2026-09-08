# 🏰 THE LEXIO CHRONICLES — MASTER DESIGN SPEC v3.0
**Tài liệu thiết kế kỹ thuật toàn diện — Dành cho Gemini Flash thực thi**
**Ngày:** 07/09/2026 | **Tác giả:** Claude Sonnet (Thinking) — Phản biện & Thiết kế Lại

---

> [!CAUTION]
> ## ⛔ PHÂN TÍCH NHỮNG GÌ ĐÃ SAI TRONG IMPLEMENTATION TRƯỚC
> Gemini Flash đã implement sai ở các điểm sau (căn cứ từ code thực tế đọc được):
>
> 1. **ALIAS MÀ KHÔNG CÓ GAME THẬT**: `phonics_bubble`, `chunk_catapult`, `meteor_smasher`, `highway_runner`, `spell_train_express`, `lexical_riddle`, `grand_matrix`, `titan_forge`, `cambridge_cloze` — **TẤT CẢ 9 GAMES NÀY** chỉ là alias gọi lại 3 game cũ (ArcaneBubble, SpellTrain, LexicalDetective, CrystalMatch). Floor 3, 4, 5 hoàn toàn không có game độc lập thật sự.
> 2. **BOSS BATTLE QUÁ ĐƠN GIẢN**: Boss chỉ là MCQ 4 lựa chọn từ vựng. Không có boss sprite thật, không có animation tấn công, không có boss rotary system (5 boss types khác nhau mỗi tuần).
> 3. **KHÔNG CÓ CHAPTER FINAL BOSS**: System hiện tại không có Final Boss sau 8 tuần hoàn chỉnh một Chapter.
> 4. **GRAPHICS = EMOJI CHỈ**: Không có CSS animation thật, không có particle effects, không có sprite sheets. Toàn bộ "game" là CSS + emoji.
> 5. **DỮ LIỆU KHÔNG CÓ TEMPLATE PER-WEEK**: Không có schema chi tiết cho từng tuần về NPC dialogue, lore text, boss name/variant, room backstory.
> 6. **DOOR ROTATION CỨNG (HARDCODED)**: Tất cả tuần dùng cùng một DOOR_ROTATION — Week 33 hay Week 100 đều y hệt nhau.

---

## 📐 PHẦN 1: KIẾN TRÚC TỔNG THỂ (KHÔNG THAY ĐỔI)

### 1.1 Cấu trúc màn hình (Screen Architecture)

```
ChroniclesScreen.jsx
├── Tab: 🗺️ World Map  → ChroniclesWorldMap.jsx
│     ├── [5 Room Nodes: Floor 1–5]  → DailyRoomScreen.jsx
│     │     ├── Door A (VOCAB game)
│     │     ├── Door B (GRAMMAR game)
│     │     └── Door C (INTEGRATION game)
│     ├── [Weekly Boss Node]          → BossBattleScreen.jsx
│     └── [Chapter Final Boss Node]   → ChapterFinalBossScreen.jsx [MỚI]
├── Tab: 🛍️ Mascot Shop → MascotShopPanel.jsx
├── Tab: 💎 Fragments   → ChapterFragmentPanel.jsx
└── Tab: 🏆 Hall of Fame → HallOfFameModal.jsx
```

### 1.2 Economy (Không thay đổi, giữ nguyên)

| Nguồn | Nhận | Ghi chú |
|-------|------|---------|
| 1 Door cleared (1 star) | +10 PP | Min per door |
| 1 Door cleared (3 stars) | +30 PP | Max per door |
| 1 Room cleared (all 3 doors) | +15 🪙 Coins | Base reward |
| Weekly Boss defeated Bronze | +30 🪙 | + Boss Fragment |
| Weekly Boss defeated Silver | +60 🪙 | + 2 Boss Fragments |
| Weekly Boss defeated Gold | +100 🪙 | + 3 Boss Fragments |
| Chapter Final Boss defeated | +200 🪙 + Crystal NFT | Chapter Complete |

### 1.3 Chapter Map (Không thay đổi)

| Chapter | Tuần | Theme | Crystal |
|---------|------|-------|---------|
| Ch.1 | W17–W24 | Library (📚) | Crystal of Recall |
| Ch.2 | W25–W32 | Ocean (🌊) | Crystal of Listening |
| Ch.3 | W33–W40 | Storm Tower (⚡) | Crystal of Speaking |
| Ch.4 | W41–W48 | Forest (🌿) | Crystal of Reading |
| Ch.5 | W49–W56 | Forge (🔥) | Crystal of Grammar |
| Ch.6 | W57–W72 | Space (🌌) | Crystal of Writing |
| Ch.7 | W73–W156 | Throne (👑) | Crystal of Fluency |

---

## 📐 PHẦN 2: SCHEMA TEMPLATE CHI TIẾT CHO MỖI WEEK

> [!IMPORTANT]
> Mỗi tuần BẮT BUỘC có file `chronicles_week_config.js` hoặc inline trong store. Gemini Flash phải tạo đủ 5 Floor configs + 1 Weekly Boss config.

### 2.1 WeekConfig Schema (TypeScript-like)

```typescript
interface WeekChroniclesConfig {
  weekNumber: number;
  chapterId: number;
  
  // Lore & Narrative
  weekLore: {
    openingCrawl: string;     // 2-3 câu lore mở đầu khi vào Chronicles
    questGiverName: string;   // NPC tên gì
    questGiverIcon: string;   // Emoji NPC (không phải Lexio)
    questGiverRole: string;   // "Storm Archivist", "Ancient Librarian", etc.
  };
  
  // 5 Daily Rooms
  floors: FloorConfig[];      // Array 5 phần tử
  
  // Weekly Boss
  weeklyBoss: WeeklyBossConfig;
}

interface FloorConfig {
  floorIndex: number;         // 0–4
  floorName: string;          // "Chamber of Tales"
  floorSubtitle: string;      // "Story World — Day 1 Review"
  floorIcon: string;          // "📜"
  floorThemeColor: string;    // CSS hex "#7C3AED"
  
  // NPC sau khi clear floor
  npcDialogue: {
    characterName: string;
    characterIcon: string;
    lines: string[];           // 2–3 câu tiếng Anh
    rewardHint: string;        // "Great work! 3 stars earned the Storm Fragment!"
  };
  
  // Cliffhanger text
  cliffhanger: {
    text: string;              // "A strange rune glows on the door ahead..."
    subText: string;           // "Come back tomorrow to unlock Floor 2!"
    bgMoodColor: string;       // "#1a0a2e"
  };
  
  // 3 Doors (games)
  doors: DoorConfig[];        // Array 3 phần tử
}

interface DoorConfig {
  doorIndex: number;          // 0=Vocab, 1=Grammar, 2=Integration
  doorColor: string;          // Door frame CSS color
  doorIcon: string;           // "🔮"
  doorLabel: string;          // "VOCAB DOOR"
  gameId: string;             // "arcane_bubble" — references GAME_REGISTRY
  gameName: string;           // "Arcane Bubble Pop"
  duration: number;           // seconds (60–120)
  
  // Difficulty per week
  difficulty: 'easy' | 'medium' | 'hard' | 'elite';
  
  // Game-specific params (varies by gameId)
  gameParams: Record<string, any>;
}

interface WeeklyBossConfig {
  bossId: string;             // "storm_titan_w33" — unique per week
  bossType: BossType;         // see §4 BOSS ROTARY SYSTEM
  bossName: string;           // "Storm Titan Vexor"
  bossSubtitle: string;       // "Guardian of the 3rd Thunder Gate"
  bossSprite: string;         // CSS class referencing keyframe animation
  bossLore: string;           // 1 câu lore
  
  // HP & Damage tuning
  hpConfig: {
    bossHP: number;            // 100 default
    playerHP: number;          // 100 default
    damageToPlayer: { bronze: number; silver: number; gold: number };
    damageFromPlayer: number;  // per correct answer
  };
  
  // 10 combat questions — structure varies by BossType
  questionTemplate: BossQuestionType;  // "mcq_vocab" | "fill_blank" | "match_pair" | "rearrange" | "listen_type"
  
  // Victory rewards
  rewards: {
    fragmentName: string;      // "Thunder Fragment"
    fragmentIcon: string;      // "⚡"
    crystalTeaser: string;     // "3 more fragments to forge the Crystal of Speaking!"
  };
}
```

---

## 📐 PHẦN 3: 15 MINI-GAMES — SPEC CHI TIẾT TỪNG GAME

> [!IMPORTANT]
> Đây là SPEC THIẾT KẾ GAME. Gemini Flash BẮT BUỘC implement ĐÚNG TỪNG GAME MỘT — KHÔNG ĐƯỢC DÙNG ALIAS hay gọi lại game khác.

---

### 🎮 GAME 1: `arcane_bubble` — Arcane Bubble Pop 🔮
**Floor 1, Door A (Vocab) | Week W17+**

#### Mục tiêu sư phạm:
- Nhận diện từ vựng qua ý nghĩa tiếng Anh → tiếng Anh (KHÔNG dịch sang tiếng Việt)
- 5 waves × 6 bong bóng = 30 lượt phán đoán / game

#### Game Mechanics:
```
STATE MACHINE: 'intro' → 'wave_start' → 'playing' → 'wave_result' → 'playing' (loop) → 'final_result'

WAVE STRUCTURE (mỗi wave):
  - Target Word Banner hiển thị ở TOP: "WAVE {n}/5 — TARGET: {word}"
  - Bên dưới: 6 bong bóng nổi (dùng CSS animation: float up + sway)
    ✅ 3 bong bóng ĐÚNG: chứa DEFINITION của target word (trong tiếng Anh)
       hoặc từ đồng nghĩa, ví dụ minh họa, dấu hiệu nhận dạng
    ❌ 3 bong bóng SAI: definition của từ khác trong cùng vocab pool

HIT BUBBLE:
  → Đúng: Bong bóng nổ tung (particle burst — CSS radial explosion)
           +10 điểm, combo++ 
           Nếu combo >= 3: "🔥 COMBO x{n}!" flash ở trung tâm
  → Sai: Bong bóng rung lắc (CSS shake animation)
          -5 điểm, combo reset về 0
          Lexio phản hồi: "Oops! {word} means {correct_def}. Listen! 🔊"

WAVE TRANSITION: Tất cả bong bóng nổ cùng lúc → Wave Result Banner (0.8s) → Wave tiếp theo

GAME END (sau wave 5):
  → Tính stars: accuracy >= 85% + combo >= 5 → ⭐⭐⭐
                accuracy >= 65% → ⭐⭐
                accuracy >= 40% → ⭐
                else → 0 (không unlock door)
```

#### Graphics & Animation Spec:
```css
/* Bubble: CSS-only, không cần canvas */
.arcade-bubble {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent);
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.8);
  animation: bubbleFloat 3s ease-in-out infinite, bubbleSway 2.5s ease-in-out infinite;
}

@keyframes bubbleFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.bubble-pop {
  animation: bubbleBurst 0.4s ease-out forwards;
}

@keyframes bubbleBurst {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.8); opacity: 0.5; }
  100% { transform: scale(2.5); opacity: 0; }
}

/* Particle burst: 8 particles radiate outward */
.particle { 
  position: absolute; width: 8px; height: 8px;
  border-radius: 50%;
  animation: particleRadiate 0.5s ease-out forwards;
}
@keyframes particleRadiate {
  from { transform: translate(0, 0); opacity: 1; }
  to { transform: translate(var(--dx), var(--dy)); opacity: 0; }
}
```

#### Data Format (gameParams):
```javascript
// Không cần extra params — dùng vocabItems từ extractQuestVocab
gameParams: {
  bubbleCount: 6,         // 3 đúng + 3 sai
  waveCount: 5,
  comboThresholds: [3, 5, 8],  // combo để trigger FIRE effect
}
```

---

### 🎮 GAME 2: `spell_train` — Spell Sentence Train 🚂
**Floor 1, Door B (Grammar) | Week W17+**

#### Mục tiêu sư phạm:
- Trật tự cú pháp tiếng Anh: S + V + O/Complement + Adverb/Place + Time
- Cambridge Movers: Simple Present, Past Simple, Going to
- Linear Thinking ESL: ghép theo cụm từ tự nhiên

#### Game Mechanics:
```
SETUP:
  - Locomotive 🚂 ở bên trái, kéo 3–4 toa trống (Slots)
  - Bên dưới: 4–5 toa hàng "word chunk cards" (text lớn, nền tối)
    → 3–4 toa đúng + 1 toa bẫy (distractor)

GAMEPLAY:
  - Học sinh TAP toa hàng theo đúng thứ tự ngữ pháp → toa tự đặt vào Slot tiếp theo
  - Tap sai Slot (đặt vào vị trí sai ngữ pháp): có thể kéo ra và đặt lại
  - Có nút "🔊 Listen Clue": TTS đọc câu hoàn chỉnh → học sinh suy ra cú pháp
  - Nút "↩ Undo": gỡ toa cuối cùng ra

SUBMIT:
  - Khi đủ toa: Nút "✓ DEPART!" sáng lên
  - Đúng: Locomotive kéo còi (TTS: "Tu tu!") + tàu lăn bánh sang phải (translateX animation)
           TTS đọc câu hoàn chỉnh với giọng Cambridge
           +points
  - Sai: Locomotive lắc nhẹ (CSS shake), toa sai highlight đỏ
         TTS đọc câu đúng, reset toa về chỗ cũ

3 SENTENCES PER GAME (mỗi câu là 1 "trip"):
  Câu 1: 3 chunks (easy)
  Câu 2: 4 chunks (medium)  
  Câu 3: 4 chunks + 1 distractor (hard)
```

#### Graphics Spec:
```css
/* Train track background */
.train-track-bg {
  background: repeating-linear-gradient(
    90deg, 
    #3d2a1a 0px, #3d2a1a 20px, 
    #2d1f10 20px, #2d1f10 40px
  );
  height: 12px;
  position: absolute; bottom: 30%;
}

/* Locomotive — pure CSS, no image needed */
.locomotive-emoji {
  font-size: 48px;
  animation: steamPuff 0.3s ease-in-out;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
}

/* Train depart animation */
.train-depart {
  animation: departRight 1.2s ease-in forwards;
}
@keyframes departRight {
  from { transform: translateX(0); }
  to { transform: translateX(120vw); }
}

/* Chunk card */
.chunk-card {
  padding: 12px 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e3a5f, #0f2040);
  border: 2px solid rgba(96, 165, 250, 0.5);
  font-size: 16px; font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.chunk-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(96,165,250,0.4); }
.chunk-card.placed { opacity: 0.4; pointer-events: none; }
```

#### Data Format:
```javascript
// grammarSentences từ reading_hub / listening_hub
// Format chuẩn cho SpellTrain:
gameParams: {
  sentenceCount: 3,
  distractor: true,     // thêm 1 toa bẫy vào câu 3
  showSyntaxLabels: true,  // hiện nhãn [S] [V] [O] trên toa khi hover
}
```

---

### 🎮 GAME 3: `lexical_det` — Lexical Detective 🕵️
**Floor 1, Door C (Integration) | Week W17+**

#### Mục tiêu sư phạm:
- Semantic field recognition: phân loại từ theo trường nghĩa
- Odd One Out logic: tìm từ không thuộc nhóm
- Rèn phản xạ phân loại tốc độ cao

#### Game Mechanics:
```
SETUP — 5 ROUNDS per game:
  - Mỗi round: 1 câu đố kiểu "WHICH ONE DOES NOT BELONG?"
  - Hiển thị 4 từ vựng từ week content:
    [Word A] [Word B] [Word C] [Word D]
    → 3 từ cùng nhóm nghĩa, 1 từ lạc bầy

  - Có "CATEGORY HINT" badge: "🔍 Category: ACTIONS at school"
    (ẩn/hiện khi bấm hint button, -5 điểm nếu dùng)

HIT:
  → Đúng: Kính lúp animation hover vào từ sai
           Lá bài "BUSTED! 🔍 {word} is {its_category}, NOT {group_category}!"
           + Detective badge animation
  → Sai: Red X flash, nhắc "Think again! What do the others have in common?"

TIMER: 20 giây per round, đồng hồ cát animation từ xanh → vàng → đỏ

SCORING: 
  5 đúng không hint → ⭐⭐⭐
  4+ đúng → ⭐⭐
  3 đúng → ⭐
  < 3 → 0
```

#### Graphics Spec:
```css
/* Magnifying glass animation */
@keyframes magnifyReveal {
  0% { transform: scale(0.5) rotate(-20deg); opacity: 0; }
  60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); }
}

/* Word card */
.detective-word-card {
  padding: 16px 24px;
  background: linear-gradient(135deg, #1c1917, #292524);
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 16px;
  font-size: 18px; font-weight: 800;
  letter-spacing: 0.05em;
  transition: all 0.2s;
}
.detective-word-card:hover { border-color: rgba(251,191,36,0.8); transform: scale(1.05); }
.detective-word-card.busted { 
  background: linear-gradient(135deg, #7f1d1d, #991b1b);
  border-color: #ef4444;
  animation: shake 0.4s ease-in-out;
}
.detective-word-card.confirmed { 
  background: linear-gradient(135deg, #14532d, #166534);
  border-color: #22c55e;
}
```

---

### 🎮 GAME 4: `crystal_match` — Crystal Memory Match 💎
**Floor 2, Door A (Vocab) | Week W17+**

#### Mục tiêu sư phạm:
- Working memory + vocabulary recall
- Word ↔ Definition matching (cả 2 chiều)
- Cambridge Movers: 12-card memory grid

#### Game Mechanics:
```
SETUP:
  - 12 cards facedown (4×3 grid) — 6 pairs: {word ↔ definition}
  - Cards hiển thị mặt sau: glowing crystal emoji (💎) + subtle shimmer

FLIP MECHANIC:
  - Tap card 1 → flip reveal (CSS 3D rotateY animation)
  - Tap card 2 → flip reveal
    → MATCH: Cả 2 cards glow green + float up + stay face-up
    → NO MATCH: Cả 2 rung nhẹ + flip back facedown sau 1s

GOAL: Match tất cả 6 pairs trước khi hết thời gian (90 giây)

BONUS: 
  - Perfect match (no mistakes): "PERFECT! Crystal Mastery! 💎✨"
  - First try match bonus: +5 điểm mỗi pair

SCORING:
  6 pairs, 0–1 mistake → ⭐⭐⭐
  6 pairs, 2–3 mistakes → ⭐⭐
  Finished → ⭐
  Timeout → 0
```

#### Graphics Spec:
```css
/* 3D card flip */
.memory-card { perspective: 1000px; }
.memory-card-inner {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.memory-card.flipped .memory-card-inner {
  transform: rotateY(180deg);
}
.memory-card-front, .memory-card-back {
  position: absolute; width: 100%; height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
}
.memory-card-back { /* Crystal face-down design */
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  border: 2px solid rgba(167, 139, 250, 0.5);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
}
.memory-card-front { /* Revealed content */
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 2px solid rgba(99, 102, 241, 0.8);
  transform: rotateY(180deg);
  padding: 8px; display: flex; align-items: center; justify-content: center;
  text-align: center; font-size: 13px; font-weight: 700; color: #e2e8f0;
}

/* Match effect */
.memory-card.matched .memory-card-inner {
  animation: crystalMatch 0.6s ease-out;
}
@keyframes crystalMatch {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
  50% { box-shadow: 0 0 60px rgba(34, 197, 94, 1); transform: rotateY(180deg) scale(1.1); }
}
```

---

### 🎮 GAME 5: `rune_forge` — Rune Forge ⚒️
**Floor 2, Door B (Grammar) | Week W17+**

#### Mục tiêu sư phạm:
- Điền từ vào chỗ trống (Fill in the Blank) — Cambridge Listening Part 2 style
- Chọn từ đúng trong 4 lựa chọn cho câu context hoàn chỉnh
- Focus: grammar tense, article, preposition, collocation

#### Game Mechanics:
```
SETUP:
  - 6 câu fill-in-the-blank từ grammarSentences + reading_hub
  - Mỗi câu: câu context hoàn chỉnh với 1 ô trống "___"
  - 4 lựa chọn Rune Stones bên dưới (A, B, C, D)
  - Rune Stone đúng: glows gold khi hover
  
RUNE STONE DESIGN:
  - Stone shape: CSS clip-path polygon (hexagonal/rune shape)
  - Text: từ cần điền
  - Màu nền: dark stone texture gradient
  
HIT:
  → Đúng: Rune glows gold + "FORGED! ⚒️ {word} fits perfectly!"
           Blank trong câu fills với gold text
  → Sai: Rune cracks (CSS animation) + "Not quite! The correct rune is {answer}"
  
AFTER 6 QUESTIONS → Summary with all 6 sentences complete
```

#### Graphics Spec:
```css
/* Rune stone button */
.rune-stone {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background: linear-gradient(135deg, #374151, #1f2937);
  border: 2px solid rgba(251, 191, 36, 0.3);
  padding: 16px 24px;
  font-size: 16px; font-weight: 800;
  color: #fbbf24;
  cursor: pointer;
  transition: all 0.2s;
}
.rune-stone:hover { 
  background: linear-gradient(135deg, #4b5563, #374151);
  border-color: rgba(251, 191, 36, 0.8);
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
}
.rune-stone.correct { 
  background: linear-gradient(135deg, #78350f, #92400e);
  border-color: #fbbf24;
  animation: runeForge 0.6s ease-out;
}
@keyframes runeForge {
  0% { transform: scale(1); }
  30% { transform: scale(1.15); box-shadow: 0 0 40px #fbbf24; }
  100% { transform: scale(1); }
}
.rune-stone.wrong { animation: runeCrack 0.4s ease-out; }
@keyframes runeCrack {
  0%, 100% { transform: translateX(0); }
  25%, 75% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
}
```

---

### 🎮 GAME 6: `ancient_scroll` — Ancient Scroll Cloze 📜
**Floor 2, Door C (Integration) | Week W17+**

#### Mục tiêu sư phạm:
- Cambridge Open Cloze / Gapped Text (Reading & Writing Part)
- Context clue reading: chọn từ phù hợp để hoàn chỉnh đoạn văn liên hoàn
- Integrated: vocab + grammar + context comprehension

#### Game Mechanics:
```
SETUP:
  - 1 đoạn văn ngắn (paragraph) 4–5 câu từ reading_hub
  - 4 chỗ trống (blanks) trong đoạn văn — mỗi blank có ID
  - Scroll UI: cuộn giấy cổ, nền màu vàng kem/sepia

WORD BANK:
  - 6 từ bên dưới (4 đúng + 2 decoy)
  - Học sinh DRAG từ Word Bank → thả vào blank
  - Hoặc TAP từ → TAP blank để điền (mobile-friendly)

SUBMIT:
  - Khi tất cả 4 blank được điền: "🔒 Seal the Scroll!" button
  - Đúng tất cả: Scroll rolls up animation + golden seal stamp
  - Có sai: highlight sai đỏ, đúng xanh
  
SCORING:
  4/4 đúng → ⭐⭐⭐
  3/4 → ⭐⭐
  2/4 → ⭐
  < 2 → 0

NO TIMER (bài tập comprehension cần thời gian đọc)
```

#### Graphics Spec:
```css
/* Scroll paper texture */
.ancient-scroll-paper {
  background: linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(120, 53, 15, 0.3);
  border: 3px solid #92400e;
  font-family: 'Merriweather', serif;
  color: #1c1917;
  line-height: 1.8;
}

/* Blank slot */
.scroll-blank {
  display: inline-block;
  min-width: 80px; height: 28px;
  border-bottom: 3px solid #92400e;
  background: rgba(254, 243, 199, 0.5);
  border-radius: 4px;
  vertical-align: middle;
  text-align: center;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
}
.scroll-blank.filled { color: #78350f; background: rgba(251, 191, 36, 0.3); }
.scroll-blank.correct { background: rgba(34, 197, 94, 0.3); border-color: #16a34a; }
.scroll-blank.wrong { background: rgba(239, 68, 68, 0.3); border-color: #dc2626; }

/* Seal stamp animation */
@keyframes sealStamp {
  0% { transform: scale(3) rotate(20deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(-5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0); }
}
```

---

### 🎮 GAME 7: `phonics_bubble` — Phonics Sound Blaster 🔊
**Floor 3, Door A (Vocab/Phonics) | Week W17+**

> [!IMPORTANT]
> Đây là GAME RIÊNG BIỆT — KHÔNG PHẢI ArcaneBubble với tên khác.
> Game này tập trung vào AUDIO DISCRIMINATION — học sinh nghe âm rồi mới chọn, không đọc definition.

#### Mục tiêu sư phạm:
- Phonemic Awareness: phân biệt âm mục tiêu (vowel sounds, consonant digraphs)
- Audio-first: nghe trước, nhận diện sau
- Cambridge Starters/Movers phonics patterns

#### Game Mechanics:
```
SETUP PER ROUND (5 rounds):
  - TARGET SOUND announced: "Listen! Find words with sound /æ/ like 'cat' 🔊"
  - Lexio (🦊) đọc to âm mục tiêu (TTS: speakText)
  - 6 bong bóng nổi — mỗi bong bóng CÓ word text + speaker icon
  - Tap bong bóng: TRƯỚC KHI chọn, bong bóng phát âm word (TTS)
    → 3 bong bóng chứa từ CÓ âm mục tiêu (cat, hat, bag)  
    → 3 bong bóng là DISTRACTOR (cake, car, star)

KEY DIFFERENCE from arcane_bubble:
  - Học sinh nghe âm TỪNG BÓN G trước khi chọn
  - Speaker button 🔊 bên trong mỗi bong bóng
  - "LISTEN FIRST" instruction banner
  - Sau khi chọn đúng/sai: Lexio so sánh âm thanh
    Đúng: "Perfect! /æ/ in 'cat' sounds like..." → TTS đọc cả 3 từ đúng
    Sai: "Listen again! 'cake' has /eɪ/ not /æ/!" → TTS play both sounds

ROUND STRUCTURE:
  R1: Short vowels /æ/, /ɪ/, /ɒ/ (at, it, hot words)
  R2: Long vowels /eɪ/, /iː/, /əʊ/
  R3: Consonant digraphs /ʃ/, /tʃ/, /θ/
  R4: Word-final sounds (-ng, -ck, -st)
  R5: Week-specific phonics from vocab
```

#### Graphics Spec:
```css
/* Phonics bubble — distinguishable from arcane by color scheme */
.phonics-bubble {
  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), transparent 60%),
              radial-gradient(circle, #0ea5e9, #0284c7);
  /* Blue-based vs Purple arcane_bubble */
  box-shadow: 0 0 24px rgba(14, 165, 233, 0.7);
  border: 2px solid rgba(186, 230, 253, 0.6);
}

/* Speaker icon inside bubble — tap to preview audio */
.bubble-speaker-btn {
  position: absolute; bottom: 8px; right: 8px;
  font-size: 14px; background: rgba(255,255,255,0.2);
  border-radius: 50%; padding: 4px;
  cursor: pointer;
}
.bubble-speaker-btn:active { background: rgba(255,255,255,0.5); }

/* Sound wave visual when playing audio */
.sound-wave-indicator {
  display: flex; gap: 3px; align-items: center;
  animation: soundWave 0.8s ease-in-out infinite;
}
@keyframes soundWave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.5); }
}
```

---

### 🎮 GAME 8: `chunk_catapult` — Chunk Catapult Match 🧩
**Floor 3, Door B (Grammar) | Week W17+**

> [!IMPORTANT]
> Đây là GAME RIÊNG BIỆT — không phải SpellTrain. Cơ chế MATCH (drag-and-drop nối đôi), không phải sắp xếp theo thứ tự.

#### Mục tiêu sư phạm:
- Collocation matching: nối nửa câu trái ↔ nửa câu phải
- Cambridge: sentence stem + completion
- 2 colums: [Sentence Starter] ←→ [Sentence Completion]

#### Game Mechanics:
```
SETUP:
  - 2 columns: LEFT (sentence starters) | RIGHT (sentence completions)
  - 5 pairs × 2 columns = 10 cards total
  - Cards shuffled trong mỗi column

CATAPULT MECHANIC:
  - Tap/click LEFT card → it "loads into catapult" (highlight + pulse)
  - Tap RIGHT card → catapult "fires" — arc animation from left to right
    → MATCH: Arc line connects, both glow green, cards lock together
    → NO MATCH: Projectile bounces back (arc reverses), cards shake

  - Line connector: SVG <line> drawn from left card center → right card center
    animation: stroke-dasharray progressive draw

5 PAIRS then RESULT SCREEN

SCORING: 5/5 one-shot → ⭐⭐⭐ | 4/5 → ⭐⭐ | 3/5 → ⭐ | <3 → 0
```

#### Graphics Spec:
```css
/* Catapult-inspired card styling */
.catapult-left-card {
  background: linear-gradient(135deg, #431407, #7c2d12);
  border: 2px solid rgba(251, 146, 60, 0.5);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fed7aa; font-weight: 700;
  cursor: pointer; transition: all 0.2s;
}
.catapult-left-card.loaded {
  border-color: #f97316;
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.6);
  animation: catapultLoad 0.3s ease-out;
}
@keyframes catapultLoad { 
  0% { transform: scale(1); }
  50% { transform: scale(1.08) rotate(-2deg); }
  100% { transform: scale(1.04); }
}

/* Arc projectile animation */
.catapult-projectile {
  position: absolute;
  width: 12px; height: 12px;
  background: #f97316;
  border-radius: 50%;
  animation: catapultArc 0.5s cubic-bezier(0.15, 0.5, 0.5, 1) forwards;
}
/* Use JS to calculate start/end coordinates and inject via CSS variables */
@keyframes catapultArc {
  0% { transform: translate(0, 0); }
  40% { transform: translate(calc(var(--dx)*0.5), calc(var(--dy)*0.5 - 60px)); }
  100% { transform: translate(var(--dx), var(--dy)); }
}
```

---

### 🎮 GAME 9: `meteor_smasher` — Meteor Smasher 🛸
**Floor 3, Door C (Integration) | Week W17+**

> [!IMPORTANT]
> Đây là GAME RIÊNG BIỆT — tốc độ cao, action game, không phải LexicalDetective.

#### Mục tiêu sư phạm:
- Speed review: định nghĩa tiếng Anh → Word — phản xạ nhanh
- Tích hợp vocab + grammar: câu hỏi mixed types
- 30 seconds speedrun mode

#### Game Mechanics:
```
SETUP:
  - Background: dark space with twinkling stars (CSS)
  - Meteors fall from top → học sinh bắn meteor đúng
  - Each meteor carries: 1 word hoặc 1 definition (alternate)
  - Target shown ở TOP: "SHOOT the DEFINITION of: {word}"
    hoặc: "SHOOT the WORD for: {definition}"
  - 3 meteors fall simultaneously (staggered timing)
  - Tap đúng meteor: EXPLOSION 💥 particle burst
  - Tap sai: meteor bounces (không destroyed), comes back
  
TIME: 45 seconds total
SCORING: Hit 10+ → ⭐⭐⭐ | 7-9 → ⭐⭐ | 4-6 → ⭐ | < 4 → 0
SPECIAL: Destroy 3 in a row → "METEOR STORM! 🌠" — all meteors explode, +10 bonus
```

#### Graphics Spec:
```css
/* Meteor falling */
.meteor-rock {
  background: radial-gradient(circle at 40% 40%, #a16207, #78350f);
  border-radius: 40% 60% 55% 45% / 45% 40% 60% 55%; /* organic rock shape */
  box-shadow: 0 0 15px rgba(251, 146, 60, 0.5);
  cursor: pointer;
  animation: meteorFall var(--fall-duration) linear forwards;
  position: absolute;
  /* Comet tail */
  filter: drop-shadow(-4px -8px 8px rgba(251, 191, 36, 0.7));
}
@keyframes meteorFall {
  from { transform: translateY(-100px) rotate(0deg); opacity: 1; }
  to { transform: translateY(120vh) rotate(360deg); opacity: 0; }
}

/* Explosion effect */
.meteor-explosion {
  position: absolute;
  animation: explode 0.5s ease-out forwards;
}
@keyframes explode {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

/* Space background */
.meteor-space-bg {
  background: radial-gradient(ellipse at center, #0f0c29, #302b63, #24243e);
}
.star-field {
  position: absolute; inset: 0;
  background-image: 
    radial-gradient(1px 1px at 20% 30%, white, transparent),
    radial-gradient(1px 1px at 70% 60%, white, transparent),
    /* ... more stars via repeating-radial-gradient */;
}
```

---

### 🎮 GAME 10: `highway_runner` — Highway Word Runner 🏎️
**Floor 4, Door A (Vocab) | Week W17+**

> [!IMPORTANT]
> Đây là GAME RIÊNG BIỆT — không phải CrystalMatch. Physics-based driving game.

#### Mục tiêu sư phạm:
- Vocab recognition trong visual scanning context
- Tilt/swipe steering (mobile) hoặc arrow keys (desktop)
- Review mixed vocab từ 4 hubs tuần này

#### Game Mechanics:
```
SETUP:
  - Top-down highway view (3 lanes)
  - Player car (🏎️) drives forward (road scrolls down = illusion of motion)
  - Word stars 🌟 with vocabulary words float on road
  - Red X signs = distractors (wrong answers)
  - Target shown in HUD: "COLLECT WORDS THAT MEAN: {definition}"

CONTROLS:
  - Mobile: Swipe left/right hoặc tilt (gyro) để đổi lane
  - Desktop: Arrow keys ← → 
  - Car has momentum: smooth lane change animation

COLLECT:
  → ✅ Correct word star: Spark effect + "+{word}" popup
  → ❌ Wrong (distractor): Car spins briefly (CSS rotate animation), -1 life (3 lives)

ROAD SPEED: Increases every 10 seconds
TARGET CHANGES every 5 collects

TIME: 60 seconds | SCORING: 15+ collects → ⭐⭐⭐ | 10+ → ⭐⭐ | 5+ → ⭐ | <5 → 0
```

#### Graphics Spec:
```css
/* Road with lane lines */
.highway-road {
  background: linear-gradient(180deg, #1f2937, #111827);
  position: relative; overflow: hidden;
}
.road-lane-line {
  position: absolute; width: 6px;
  background: #fbbf24;
  animation: roadScroll 0.3s linear infinite;
}
@keyframes roadScroll {
  from { top: -100px; }
  to { top: 100%; }
}

/* Player car */
.highway-car {
  font-size: 36px;
  transition: left 0.15s ease-out;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.8));
}
.highway-car.spinning {
  animation: carSpin 0.4s ease-in-out;
}
@keyframes carSpin {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
}

/* Word star on road */
.highway-word-star {
  position: absolute;
  animation: starDrive var(--fall-speed) linear forwards;
}
@keyframes starDrive {
  from { top: -60px; }
  to { top: 110%; }
}
```

---

### 🎮 GAME 11: `spell_train_express` — Syntax Express 4-Car 🚆
**Floor 4, Door B (Grammar) | Week W17+**

> [!IMPORTANT]
> Khác SpellTrain ở Floor 1: Express có 4 toa (phức tạp hơn), câu 4+ chunks, có thể có nhánh conditional clause.

#### Mục tiêu sư phạm:
- Complex sentence structure: S + V + O + [Adverbial/Relative Clause]
- Cambridge Flyers/KET level grammar
- 4-car train = 4-chunk sentences (harder than 3-car Floor 1)

#### Mechanics:
```
SAME AS spell_train BUT:
- 4 toa (not 3), sentences from grammarSentences with subordinate clauses
- SPEED: timerbar giảm nhanh hơn (15% faster per sentence)
- 2 DISTRACTOR cards (not 1)
- "Express Route" scoring: bonus stars if NO UNDO used
- Visual: Different train skin — silver bullet train 🚄 instead of steam 🚂
```

#### Graphics Spec:
```css
/* Silver bullet train — override steam locomotive */
.express-locomotive-emoji::after { content: '🚄'; }
/* Or use CSS to make it look more modern */
.express-train-wrapper {
  filter: hue-rotate(180deg) saturate(1.5); /* Blue-tinted vs warm steam */
}
```

---

### 🎮 GAME 12: `lexical_riddle` — Mystery Riddle Detective 🔍
**Floor 4, Door C (Integration) | Week W17+**

> [!IMPORTANT]
> Khác LexicalDetective ở Floor 1: Riddle Detective dùng RIDDLE FORMAT, không phải Odd-One-Out.

#### Mục tiêu sư phạm:
- Context clue deduction: đoán từ qua mô tả riddle
- Activate higher-order thinking (Bloom's: Analyze + Evaluate)
- Cambridge KET: read description → identify word

#### Mechanics:
```
SETUP — 5 RIDDLES:
  - Mỗi riddle: 3 clue lines (reveal one by one, tap to reveal next clue)
    Clue 1 (vague): "I am something you find at school."
    Clue 2 (closer): "People write on me with chalk."
    Clue 3 (specific): "I am a large dark surface on the classroom wall."
    ANSWER: [blackboard]
  
  - 4 answer choices bên dưới (multiple choice)
  - Bonus: Guess with fewer clues → more points
    Clue 1 only: +30pts | Clue 2: +20pts | Clue 3: +10pts

TIMING: 25 seconds per riddle (reset when each clue revealed)

DETECTIVE THEME: 
  - "Case File {n}/5" header
  - Magnifying glass grows as more clues revealed
  - "SOLVED! 🔍" when correct
  - "CASE CLOSED 📁" after 5 riddles
```

---

### 🎮 GAME 13: `grand_matrix` — Grand Master Matrix 👑
**Floor 5, Door A (Vocab Elite) | Week W17+**

> [!IMPORTANT]
> Floor 5 games là COMPREHENSIVE REVIEW — hardest difficulty, combines multiple skills.

#### Mục tiêu sư phạm:
- Cross-reference vocab: word + definition + example sentence + part-of-speech
- Matrix grid matching (4 dimensions): harder than CrystalMatch

#### Mechanics:
```
SETUP:
  - 4×4 matrix grid (16 cells)
  - 4 types of cards: [Word] [Definition] [Example Sentence] [POS badge]
  - Group: find all 4 cards belonging to same vocab item
  - 4 vocab items = 4 groups × 4 cards each = 16 cards total

GAMEPLAY:
  - Tap cards to select (up to 4 at once)
  - "LOCK GROUP" button when 4 selected
  - Correct group: all 4 lock, glow, animate off grid
  - Wrong: shake, deselect, -1 attempt (5 attempts total)

SCORING: 4 groups, 0 wrong → ⭐⭐⭐ | 1–2 wrong → ⭐⭐ | 3–5 wrong → ⭐ | >5 → 0
```

---

### 🎮 GAME 14: `titan_forge` — Titan Grammar Forge ⚡
**Floor 5, Door B (Grammar Elite) | Week W17+**

#### Mục tiêu sư phạm:
- Error detection + correction: find and fix grammar mistakes
- Cambridge Reading & Writing Part 7 style
- Scan sentence → identify error type → select correction

#### Mechanics:
```
SETUP — 6 ERROR-DETECTION ROUNDS:
  - Câu có 1 lỗi ngữ pháp (tense / article / preposition / agreement)
  - Học sinh IDENTIFY lỗi: tap vào từ sai → nó highlights
  - Then CORRECT: 4 replacement options
  - Types: tense error, missing article, wrong preposition, subject-verb agreement

TITAN THEME:
  - Titan (giant boss) holds up a stone tablet with the sentence
  - Correct fix: Titan's stone glows gold, "FORGED!"
  - Wrong fix: Lightning bolt hits player character

SCORING: 5/6+ → ⭐⭐⭐ | 4/6 → ⭐⭐ | 3/6 → ⭐ | <3 → 0
```

---

### 🎮 GAME 15: `cambridge_cloze` — Cambridge Cloze Gauntlet 🏆
**Floor 5, Door C (Integration Elite) | Week W17+**

#### Mục tiêu sư phạm:
- Cambridge Reading & Writing: Open Cloze (no word bank)
- KEY/FLYERS level — harder than ancient_scroll
- Must infer word from context (no options given — TYPE the answer)

#### Mechanics:
```
FORMAT: Passage 6–7 sentences, 5–6 blanks
TYPE-IN MODE: Text input field at each blank (not drag-and-drop)
HINT: Lexio gives 1 character hint if stuck (press 💡, -10pts)
CHECK: "⚔️ Submit Gauntlet" button validates all answers
  - Accept: case-insensitive, trim whitespace
  - Partial credit: spelling within 1 edit distance = half credit

GAUNTLET ANIMATION: 
  - Final boss health bar depletes with each correct answer
  - Complete all 5-6 blanks = GAUNTLET CLEARED!

SCORING: 5+/6 → ⭐⭐⭐ | 4/6 → ⭐⭐ | 3/6 → ⭐ | <3 → 0
```

---

## 📐 PHẦN 4: WEEKLY BOSS BATTLE — ROTARY SYSTEM

> [!IMPORTANT]
> 5 Boss Types KHÁC NHAU xoay vòng theo tuần. Week 33 = Boss Type 3, Week 34 = Boss Type 4, etc.
> Formula: `bossType = ((weekNumber - 17) % 5) + 1`

### Boss Type 1: VOCAB GAUNTLET BOSS 🧙‍♂️
**Xoay vào: W17, W22, W27, W32, W37, W42...**

```
THEME: Ancient Sorcerer Guardian
SPRITE: 🧙‍♂️ with CSS spellcasting animation
COMBAT STYLE: MCQ — 10 vocab questions (word → definition)
SPECIAL ABILITY: "MIRROR SPELL" — at 50% HP, duplicates wrong answer (now 5 options instead of 4)
PLAYER ATTACK: Tap correct answer → magic wand strikes boss
BOSS ATTACK ANIMATION: Boss raises staff → lightning bolt hits player HP bar
INTRO LINE: "Prove your mastery of the ancient lexicon, young scholar!"
```

```css
/* Boss spellcast animation */
.boss-spellcast {
  animation: spellCast 1.5s ease-in-out;
}
@keyframes spellCast {
  0%, 100% { transform: scale(1) rotate(0); }
  20% { transform: scale(1.1) rotate(-5deg); }
  40% { filter: brightness(2) hue-rotate(90deg); }
  80% { transform: scale(0.95) rotate(3deg); }
}
/* Lightning attack on player */
.lightning-strike {
  position: absolute;
  width: 4px; height: 80px;
  background: linear-gradient(to bottom, transparent, #fbbf24, transparent);
  animation: lightningFlash 0.3s ease-out 3;
}
```

### Boss Type 2: GRAMMAR TITAN BOSS ⚒️
**Xoay vào: W18, W23, W28, W33, W38, W43...**

```
THEME: Stone Golem Constructor
SPRITE: 🗿 / 🤖 constructed from stone blocks
COMBAT STYLE: SENTENCE ARRANGE — tap chunks in correct order to deal damage
SPECIAL ABILITY: "STONE SHUFFLE" — at 30% HP, scrambles chunk positions every 10s
PLAYER ATTACK: Arrange all chunks correctly → stone breaks off boss's armor
BOSS ATTACK: Boss slams ground → player loses 5 seconds off timer (not HP)
INTRO LINE: "My body is built from unbreakable grammar. Can you rearrange ME?"
```

### Boss Type 3: PHONICS DRAGON BOSS 🐉
**Xoay vào: W19, W24, W29, W34, W39, W44...**

```
THEME: Sound Dragon
SPRITE: 🐉 with audio wave effects
COMBAT STYLE: LISTEN & IDENTIFY — TTS reads word, player selects written form
SPECIAL ABILITY: "DRAGON ROAR" — at 50% HP, plays 2 overlapping audio clips (harder discrimination)
PLAYER ATTACK: Correct identification → arrow pierces dragon
BOSS ATTACK: Dragon breathes fire animation → player HP burns
INTRO LINE: "My scales are woven from the music of language. Listen closely!"
```

### Boss Type 4: CLOZE SPHINX BOSS 🦁
**Xoay vào: W20, W25, W30, W35, W40, W45...**

```
THEME: Ancient Sphinx / Riddler
SPRITE: 🦁 with Egyptian pyramid background
COMBAT STYLE: FILL-IN-BLANK — 10 sentences, type/select missing words
SPECIAL ABILITY: "RIDDLE LOCK" — at 40% HP, 2 blanks per question instead of 1
PLAYER ATTACK: Complete sentence → beam of light hits Sphinx
BOSS ATTACK: Sphinx roars → reveals decoy answer (confusing text overlay)
INTRO LINE: "Answer my riddles or be turned to stone!"
```

### Boss Type 5: MEMORY GUARDIAN BOSS 🔮
**Xoay vào: W21, W26, W31, W36, W41, W46...**

```
THEME: Mind Mirror / Memory Keeper
SPRITE: 🔮 / 🧠 levitating
COMBAT STYLE: MEMORY PAIRS — 8-card mini memory match under time pressure
SPECIAL ABILITY: "MIND FOG" — at 50% HP, covers 4 cards in fog (can't see for 5s)
PLAYER ATTACK: Match pair → crystal shard hits guardian
BOSS ATTACK: Guardian pulses → flips all cards back facedown (all unmatched reset)
INTRO LINE: "Your memory is tested here. I remember everything. Do you?"
```

### Boss Combat State Machine (All Types):
```
STATE: 'intro' → 'boss_speech' → 'combat' → 'ability_trigger' → 'combat' → 'victory' | 'defeat'

BOSS HP BAR: top of screen, red gradient, animated fill
PLAYER HP BAR: below boss HP, green gradient
QUESTION/CHALLENGE AREA: center
ANSWER AREA: bottom 40% of screen
FEEDBACK: brief overlay animation (0.8s) then auto-advance

ON VICTORY:
  - Boss sprite: defeat animation (fall down, shatter)
  - Crystal fragment drop animation (💎 falls from boss)
  - "BOSS DEFEATED! ⚔️" fanfare
  - Fragment counter: "Fragment {n}/4 collected!"
  
ON DEFEAT:
  - Player character stumbles (Lexio 🦊 falls animation)
  - "Try again — your PP is safe!"
  - Retry or Back to Map
```

---

## 📐 PHẦN 5: CHAPTER FINAL BOSS (mỗi 8 tuần = 1 Chapter)

> [!IMPORTANT]
> **TÍNH NĂNG MỚI HOÀN TOÀN** — Chưa được implement. Sau khi học sinh hoàn thành TẤT CẢ 8 tuần của một Chapter (W17–W24 cho Ch.1), Final Boss Chamber mở khóa.

### Final Boss Architecture

```
UNLOCK CONDITIONS:
  - Tất cả 8 tuần trong Chapter đã có ít nhất 1 Weekly Boss defeated
  - Accumulated 4/4 Boss Fragments

LOCATION ON MAP:
  - New node xuất hiện trên ChroniclesWorldMap: "🔮 CHAPTER FINAL BOSS"
  - Golden pulsing aura (CSS)
  - Text: "4/4 Fragments — The Crystal Awaits!"

ChapterFinalBossScreen.jsx [FILE MỚI CẦN TẠO]
  STATE: 'ritual' → 'phase1' → 'phase2' → 'phase3' → 'crystal_forge' → 'victory'
```

### Final Boss — 3 Phase Combat

```
PHASE 1 (Boss at 100%–60% HP):
  - Standard boss attacks (same as Weekly Boss Type matching chapter)
  - 15 questions (harder difficulty — week 1+8 combined vocab)
  
PHASE 2 (Boss at 60%–30% HP — "ENRAGED"):
  - Boss "transform" animation: grows larger, color shifts (hue-rotate)
  - MIXED question types: vocab + grammar + phonics in same round
  - Timer decreases from 15s → 10s per question
  - Boss attack frequency increases

PHASE 3 (Boss at 30%–0% HP — "FINAL STAND"):
  - All abilities from Boss Type active simultaneously
  - 10 final questions — hardest content from entire Chapter (W17–W24 combined)
  - Boss HP bar outline pulses red, screen vignette effect
  - If player HP drops to 20%: "LEXIO OVERDRIVE" power-up available (one-time shield)
```

### Crystal Forge Ceremony (Victory)
```
SEQUENCE:
  1. Boss shatters (CSS keyframe explosion: scale 0→3→0, opacity 1→0)
  2. 4 fragments float in from corners → converge at center
  3. Fragment merge animation: glow → merge → flash
  4. Crystal materializes (SVG/emoji: 💎 with rays emanating)
  5. Text crawl: "Chapter {N} Complete! You have forged the {crystal_name}!"
  6. XP shower: +500 XP, +200 Coins
  7. New Chapter teaser: "Chapter {N+1} unlocks next week..."
```

### Graphics Spec (Final Boss):
```css
/* Boss enraged transform */
.final-boss-enraged {
  animation: bossEnrage 1.5s ease-in-out;
  filter: hue-rotate(45deg) saturate(2);
}
@keyframes bossEnrage {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.3); filter: brightness(2) saturate(3); }
  50% { transform: scale(1.1) rotate(-3deg); }
  75% { transform: scale(1.2); }
}

/* Phase transition screen flash */
.phase-transition {
  position: fixed; inset: 0;
  background: #ef4444;
  animation: phaseFlash 0.6s ease-out forwards;
}
@keyframes phaseFlash {
  0% { opacity: 0.8; }
  100% { opacity: 0; pointer-events: none; }
}

/* Fragment convergence */
.fragment-converge {
  animation: fragmentFly var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes fragmentFly {
  from { transform: translate(var(--from-x), var(--from-y)) scale(0.5); opacity: 0; }
  70% { opacity: 1; }
  to { transform: translate(0, 0) scale(1); }
}

/* Crystal forge flash */
.crystal-forge-flash {
  animation: crystalForge 2s ease-out forwards;
}
@keyframes crystalForge {
  0% { transform: scale(0.3); filter: brightness(5); opacity: 1; }
  30% { transform: scale(1.5); filter: brightness(3); }
  60% { transform: scale(1); filter: brightness(1.5); }
  100% { transform: scale(1); filter: brightness(1); }
}
```

---

## 📐 PHẦN 6: NPC & LORE TEMPLATE PER WEEK (W33 EXAMPLE — CHAPTER 3: STORM TOWER)

> [!IMPORTANT]
> Gemini Flash phải sinh đủ lore cho TỪNG TUẦN. Đây là template W33 làm mẫu.

### W33 Full Config Example

```javascript
// src/data/chronicles/week33_config.js (hoặc inline vào chronicles store)
export const WEEK33_CHRONICLES_CONFIG = {
  weekNumber: 33,
  chapterId: 3,
  
  weekLore: {
    openingCrawl: "Storm Titan Vexor has awakened! Lightning crackles across the tower floors. Find the Storm Words to weaken his power!",
    questGiverName: "Zara the Storm Archivist",
    questGiverIcon: "⚡🧙‍♀️",
    questGiverRole: "Storm Archivist — Keeper of the Thunder Lexicon",
  },
  
  floors: [
    // Floor 1 — Chamber of Tales (Story World)
    {
      floorIndex: 0,
      floorName: "Chamber of Tales",
      floorSubtitle: "Story World — Day 1 Review",
      floorIcon: "📜",
      floorThemeColor: "#7C3AED",
      npcDialogue: {
        characterName: "Zara the Storm Archivist",
        characterIcon: "⚡🧙‍♀️",
        lines: [
          "You've braved the first storm chamber! The ancient tale-words are now yours.",
          "Jake's corridor adventure taught us that even small actions — like walking carefully — shape big outcomes.",
          "Three doors cleared! The Thunder Fragment glows brighter. Onward, Storm Scholar! ⚡",
        ],
        rewardHint: "3 stars earned → Thunder Fragment fragment piece awarded!",
      },
      cliffhanger: {
        text: "A strange rune pulses on the Alchemy Lab door...",
        subText: "Complete Zone 2 (Day 2) to unlock Floor 2! 🔒",
        bgMoodColor: "#1a0520",
      },
      doors: [
        {
          doorIndex: 0,
          doorColor: "#7C3AED",
          doorIcon: "🔮",
          doorLabel: "VOCAB DOOR",
          gameId: "arcane_bubble",
          gameName: "Arcane Bubble Pop",
          duration: 60,
          difficulty: "medium",
          gameParams: { bubbleCount: 6, waveCount: 5 },
        },
        {
          doorIndex: 1,
          doorColor: "#F59E0B",
          doorIcon: "🚂",
          doorLabel: "GRAMMAR DOOR",
          gameId: "spell_train",
          gameName: "Spell Sentence Train",
          duration: 90,
          difficulty: "medium",
          gameParams: { sentenceCount: 3, distractor: true, showSyntaxLabels: true },
        },
        {
          doorIndex: 2,
          doorColor: "#EF4444",
          doorIcon: "🕵️",
          doorLabel: "INTEGRATION DOOR",
          gameId: "lexical_det",
          gameName: "Lexical Detective",
          duration: 90,
          difficulty: "medium",
          gameParams: { roundCount: 5, timerSeconds: 20, showHint: true },
        },
      ],
    },
    // Floor 2 — Alchemy Lab
    {
      floorIndex: 1,
      floorName: "Alchemy Lab",
      floorSubtitle: "Knowledge Lab — Day 2 Review",
      floorIcon: "⚗️",
      floorThemeColor: "#0EA5E9",
      npcDialogue: {
        characterName: "Professor Solvay",
        characterIcon: "🔬⚗️",
        lines: [
          "Excellent work in the Alchemy Lab! The science of words is now bending to your will.",
          "Remember: friction reduces sliding, rubber soles increase grip. Apply this knowledge to the crystal pairs!",
          "Two floors cleared! Vexor trembles. Continue your storm quest! ⚡",
        ],
        rewardHint: "6+ stars this week → Rare Crystal Fragment bonus!",
      },
      cliffhanger: {
        text: "A bolt of lightning seals the Thunder Arena door...",
        subText: "Complete Zone 3 (Day 3) quests to unlock Floor 3!",
        bgMoodColor: "#0c1a30",
      },
      doors: [
        {
          doorIndex: 0, doorColor: "#0EA5E9", doorIcon: "💎",
          doorLabel: "VOCAB DOOR", gameId: "crystal_match", gameName: "Crystal Memory Match",
          duration: 90, difficulty: "medium",
          gameParams: { pairCount: 6, includeExamples: false },
        },
        {
          doorIndex: 1, doorColor: "#F59E0B", doorIcon: "⚒️",
          doorLabel: "GRAMMAR DOOR", gameId: "rune_forge", gameName: "Rune Forge",
          duration: 75, difficulty: "medium",
          gameParams: { questionCount: 6 },
        },
        {
          doorIndex: 2, doorColor: "#EF4444", doorIcon: "📜",
          doorLabel: "INTEGRATION DOOR", gameId: "ancient_scroll", gameName: "Ancient Scroll Cloze",
          duration: 120, difficulty: "medium",
          gameParams: { blankCount: 4, wordBankSize: 6 },
        },
      ],
    },
    // Floor 3 — Thunder Arena
    {
      floorIndex: 2,
      floorName: "Thunder Arena",
      floorSubtitle: "Battle Arena — Day 3 Review",
      floorIcon: "⚡",
      floorThemeColor: "#F59E0B",
      npcDialogue: {
        characterName: "Commander Roark",
        characterIcon: "⚔️🛡️",
        lines: [
          "The Thunder Arena echoes your victories! Three challenges conquered.",
          "Speed Match, Grammar Duel, Math Quest — you've proven your lightning reflexes.",
          "Three floors down. The Storm Titan grows nervous. Press on! ⚡",
        ],
        rewardHint: "Perfect Phonics round = bonus Lexio Coin!",
      },
      cliffhanger: {
        text: "The Rune Sanctum glows with an ancient power...",
        subText: "Finish Day 4 quests to unlock Floor 4!",
        bgMoodColor: "#1a1000",
      },
      doors: [
        {
          doorIndex: 0, doorColor: "#0EA5E9", doorIcon: "🔊",
          doorLabel: "PHONICS DOOR", gameId: "phonics_bubble", gameName: "Phonics Sound Blaster",
          duration: 60, difficulty: "medium",
          gameParams: { roundCount: 5, playAudioOnTap: true },
        },
        {
          doorIndex: 1, doorColor: "#F59E0B", doorIcon: "🧩",
          doorLabel: "GRAMMAR DOOR", gameId: "chunk_catapult", gameName: "Chunk Catapult Match",
          duration: 75, difficulty: "medium",
          gameParams: { pairCount: 5 },
        },
        {
          doorIndex: 2, doorColor: "#EF4444", doorIcon: "🛸",
          doorLabel: "INTEGRATION DOOR", gameId: "meteor_smasher", gameName: "Meteor Smasher",
          duration: 45, difficulty: "hard",
          gameParams: { timeLimit: 45, simultaneousMeteors: 3 },
        },
      ],
    },
    // Floor 4 — Rune Sanctum
    {
      floorIndex: 3,
      floorName: "Rune Sanctum",
      floorSubtitle: "Creator Studio — Day 4 Review",
      floorIcon: "⚒️",
      floorThemeColor: "#EF4444",
      npcDialogue: {
        characterName: "Master Runesmith Kael",
        characterIcon: "🔮⚒️",
        lines: [
          "You've deciphered the ancient runes of the Sanctum! Four floors cleared.",
          "Story Writer, Video Challenge, Info Exchange — your creative powers are legendary.",
          "The Boss Chamber trembles. One more floor, then the Storm Titan awaits! ⚡",
        ],
        rewardHint: "Syntax Express with zero Undo = Elite Badge!",
      },
      cliffhanger: {
        text: "The Apex Spire's gates crack open...",
        subText: "Finish Day 5 quests to unlock the final floor!",
        bgMoodColor: "#1a0a0a",
      },
      doors: [
        {
          doorIndex: 0, doorColor: "#7C3AED", doorIcon: "🏎️",
          doorLabel: "VOCAB DOOR", gameId: "highway_runner", gameName: "Highway Word Runner",
          duration: 60, difficulty: "hard",
          gameParams: { laneCount: 3, speedMultiplier: 1.2 },
        },
        {
          doorIndex: 1, doorColor: "#F59E0B", doorIcon: "🚆",
          doorLabel: "GRAMMAR DOOR", gameId: "spell_train_express", gameName: "Syntax Express 4-Car",
          duration: 90, difficulty: "hard",
          gameParams: { carCount: 4, distractor: 2, noUndoBonus: true },
        },
        {
          doorIndex: 2, doorColor: "#EF4444", doorIcon: "🔍",
          doorLabel: "INTEGRATION DOOR", gameId: "lexical_riddle", gameName: "Mystery Riddle Detective",
          duration: 90, difficulty: "hard",
          gameParams: { riddles: 5, clueCount: 3, bonusForEarlyGuess: true },
        },
      ],
    },
    // Floor 5 — Apex Spire
    {
      floorIndex: 4,
      floorName: "Apex Spire",
      floorSubtitle: "Boss Castle — Full Week Review",
      floorIcon: "🏰",
      floorThemeColor: "#F59E0B",
      npcDialogue: {
        characterName: "Lexio (Your Companion)",
        characterIcon: "🦊",
        lines: [
          "We made it to the top of the Storm Tower! You've mastered all five floors!",
          "The Crystal of Speaking shivers in Vexor's grasp. You're ready. Let's claim it!",
          "Five floors. Full week. You are a Storm Scholar! Now face the Boss! ⚡👑",
        ],
        rewardHint: "Perfect Apex Spire = +50 bonus PP!",
      },
      cliffhanger: {
        text: "⚔️ Storm Titan Vexor emerges from the thundercloud...",
        subText: "Boss Chamber now unlocked! Face the Guardian!",
        bgMoodColor: "#0a0a1a",
      },
      doors: [
        {
          doorIndex: 0, doorColor: "#F59E0B", doorIcon: "👑",
          doorLabel: "ELITE VOCAB DOOR", gameId: "grand_matrix", gameName: "Grand Master Matrix",
          duration: 90, difficulty: "elite",
          gameParams: { vocabGroupCount: 4, cardsPerGroup: 4 },
        },
        {
          doorIndex: 1, doorColor: "#EF4444", doorIcon: "⚡",
          doorLabel: "ELITE GRAMMAR DOOR", gameId: "titan_forge", gameName: "Titan Grammar Forge",
          duration: 90, difficulty: "elite",
          gameParams: { questionCount: 6, errorTypes: ['tense', 'article', 'preposition', 'agreement'] },
        },
        {
          doorIndex: 2, doorColor: "#10B981", doorIcon: "🏆",
          doorLabel: "ELITE INTEGRATION DOOR", gameId: "cambridge_cloze", gameName: "Cambridge Cloze Gauntlet",
          duration: 120, difficulty: "elite",
          gameParams: { blankCount: 6, typeInMode: true, hintAllowed: true, hintCost: 10 },
        },
      ],
    },
  ],
  
  // Weekly Boss (W33 = Boss Type 2: Grammar Titan — formula: (33-17)%5+1 = 17%5+1 = 2+1 = 3)
  // Actually: (33-17) = 16, 16%5 = 1, +1 = 2 → GRAMMAR TITAN BOSS
  weeklyBoss: {
    bossId: "storm_titan_vexor_w33",
    bossType: 2,  // Grammar Titan
    bossName: "Storm Titan Vexor",
    bossSubtitle: "Guardian of the Thunder Lexicon",
    bossSprite: "bbs-sprite-golem",  // CSS class
    bossLore: "Forged from broken sentences and misplaced words, Vexor grows stronger with every grammar mistake you make.",
    
    hpConfig: {
      bossHP: 100,
      playerHP: 100,
      damageToPlayer: { bronze: 20, silver: 15, gold: 10 },
      damageFromPlayer: 10,
    },
    
    questionTemplate: "sentence_arrange",  // Boss Type 2
    questionCount: 10,
    
    rewards: {
      fragmentName: "Thunder Fragment",
      fragmentIcon: "⚡",
      crystalTeaser: "2 more Weekly Boss victories to forge the Crystal of Speaking!",
    },
  },
};
```

---

## 📐 PHẦN 7: FILES CẦN TẠO / SỬA (EXECUTION CHECKLIST)

> [!IMPORTANT]
> Gemini Flash thực thi theo ĐÚ G THỨ TỰ này. KHÔNG ĐƯỢC bỏ qua bước nào.

### Phase A: Tạo 8 Game Files Còn Thiếu

```
src/modules/chronicles/games/
├── ✅ ArcaneBubbleGame.jsx (đã có)
├── ✅ SpellTrainGame.jsx (đã có)
├── ✅ LexicalDetectiveGame.jsx (đã có)
├── ✅ CrystalMemoryMatchGame.jsx (đã có)
├── ✅ RuneForgeGame.jsx (đã có)
├── ✅ AncientScrollFillGame.jsx (đã có)
├── ❌ PhonicsBubbleGame.jsx [TẠO MỚI — xem spec Game 7]
├── ❌ ChunkCatapultGame.jsx [TẠO MỚI — xem spec Game 8]
├── ❌ MeteorSmasherGame.jsx [TẠO MỚI — xem spec Game 9]
├── ❌ HighwayRunnerGame.jsx [TẠO MỚI — xem spec Game 10]
├── ❌ SyntaxExpressGame.jsx [TẠO MỚI — xem spec Game 11]
├── ❌ RiddleDetectiveGame.jsx [TẠO MỚI — xem spec Game 12]
├── ❌ GrandMasterMatrixGame.jsx [TẠO MỚI — xem spec Game 13]
├── ❌ TitanForgeGame.jsx [TẠO MỚI — xem spec Game 14]
└── ❌ CambridgeClozeGame.jsx [TẠO MỚI — xem spec Game 15]
```

### Phase B: Sửa DailyRoomScreen.jsx

```diff
// THAY THẾ toàn bộ switch-case aliases bằng imports thật:
+ import PhonicsBubbleGame      from './games/PhonicsBubbleGame';
+ import ChunkCatapultGame      from './games/ChunkCatapultGame';
+ import MeteorSmasherGame      from './games/MeteorSmasherGame';
+ import HighwayRunnerGame      from './games/HighwayRunnerGame';
+ import SyntaxExpressGame      from './games/SyntaxExpressGame';
+ import RiddleDetectiveGame    from './games/RiddleDetectiveGame';
+ import GrandMasterMatrixGame  from './games/GrandMasterMatrixGame';
+ import TitanForgeGame         from './games/TitanForgeGame';
+ import CambridgeClozeGame     from './games/CambridgeClozeGame';

// Và trong switch-case, mỗi case gọi đúng component:
case 'phonics_bubble':
  return <PhonicsBubbleGame vocabItems={vocabItems} duration={door.duration} gameParams={door.gameParams} {...commonProps} />;
case 'chunk_catapult':
  return <ChunkCatapultGame grammarSentences={grammarSentences} duration={door.duration} gameParams={door.gameParams} {...commonProps} />;
// ... etc
```

### Phase C: Nâng cấp BossBattleScreen.jsx

```
BẮT BUỘC:
1. Thêm bossType detection: getBossType(weekNumber)
2. Thêm renderBossSprite(bossType) — CSS animation class theo type
3. Thêm bossSpecialAbility logic per type
4. Thêm bossAttackAnimation component
5. Thêm phase state cho ability trigger
```

### Phase D: Tạo ChapterFinalBossScreen.jsx

```
src/modules/chronicles/ChapterFinalBossScreen.jsx [TẠO MỚI]
- 3-phase combat state machine
- Fragment convergence animation
- Crystal forge ceremony
- Chapter complete celebration
```

### Phase E: Sửa useChroniclesStore.js

```javascript
// Thêm:
export function getBossType(weekNumber) {
  return ((parseInt(weekNumber) - 17) % 5) + 1;
}

// Thêm final boss state:
chapterFinalBossDefeated: {},  // { 'chapter3': true }
```

### Phase F: Tạo data/chronicles/weekNN_config.js

```
Với W33 đã có template ở Phần 6.
Cần tạo tương tự cho W34, W35 nếu user request.
```

### Phase G: Verification

```bash
# Sau mỗi game file tạo mới:
npm run build
# Phải exit code 0

# Sau khi tất cả xong — chạy audit script:
node scripts/audit_chronicles_ui.mjs
```

---

## 📐 PHẦN 8: ANTI-HALLUCINATION CHECKLIST CHO GEMINI FLASH

> [!CAUTION]
> Gemini Flash BẮT BUỘC tự kiểm tra danh sách này trước khi báo hoàn thành.

```
□ PhonicsBubbleGame.jsx — Có audio TTS per bubble? Có playAudioOnTap mechanic? Khác arcane_bubble?
□ ChunkCatapultGame.jsx — Có arc projectile animation? Có 2-column matching (không phải sắp xếp)?
□ MeteorSmasherGame.jsx — Có falling meteor animation? Có tap-to-destroy mechanic? 
□ HighwayRunnerGame.jsx — Có scrolling road? Có lane swipe mechanic? Có 3 lives?
□ SyntaxExpressGame.jsx — Có 4 toa (không phải 3)? Có 2 distractors? Khác spell_train?
□ RiddleDetectiveGame.jsx — Có 3-clue reveal mechanic? Có bonus for early guess?
□ GrandMasterMatrixGame.jsx — Có 4×4 grid? Có 4-card groups (word+def+example+POS)?
□ TitanForgeGame.jsx — Có error DETECTION (tap wrong word) trước khi correction?
□ CambridgeClozeGame.jsx — Có TEXT INPUT field (không phải drag/MCQ)?
□ DailyRoomScreen switch-case — Mỗi gameId map đến đúng COMPONENT (không phải alias)?
□ BossBattleScreen — Có getBossType() logic? Có 5 boss type appearances?
□ ChapterFinalBossScreen — Có 3-phase state machine? Có crystal forge animation?
```

---

## 📌 TÓM TẮT PHẦN LẬN & CÁI CẦN SỬA

| # | Vấn đề Hiện Tại | Giải Pháp Spec Này |
|---|---|---|
| 1 | 9/15 games là alias (không có code riêng) | Tạo 9 game JSX files với mechanics độc lập |
| 2 | Boss chỉ là MCQ quiz, không có variety | 5 Boss Types với mechanics khác nhau |
| 3 | Không có Chapter Final Boss | ChapterFinalBossScreen.jsx mới với 3-phase combat |
| 4 | Graphics = emoji only, không có CSS animation | Graphics spec chi tiết cho từng game (Phần 3) |
| 5 | DOOR_ROTATION cứng, không per-week config | WeekConfig schema với full data per floor/boss |
| 6 | Không có NPC lore per week | weekNN_config.js template với npcDialogue đầy đủ |
| 7 | Boss special abilities không có | Ability system per boss type (Phần 4) |
| 8 | Không có cliffhanger text variation per floor | cliffhanger config per floor trong WeekConfig |

---

## 📐 PHẦN 9: QUEST GAMIFICATION LAYER — CẢM GIÁC ĐANG CHƠI GAME KHI HỌC

> [!IMPORTANT]
> **Triết lý thiết kế (Self-Determination Theory):**
> Gamification layer phải **INVISIBLE khi đang học, VISIBLE khi chiến thắng**.
> Mục tiêu: Khuếch đại cảm giác "Tôi giỏi!" sau khi hoàn thành nội dung — **KHÔNG che giấu nội dung bằng hiệu ứng**.
> Overjustification Effect: Reward bên ngoài quá lớn → học vì thưởng → mất intrinsic motivation.

### 9.1 Architecture Overview — 4 Micro-Moment System

```
Quest Flow hiện tại (TRƯỚC):
  Tap quest node → TaskScreen mount → Nội dung xuất hiện ngay
  Hoàn thành → handleTaskComplete() → navigate('/hub/1') ngay lập tức

Quest Flow mới (SAU — 4 Micro-Moments):
  [M1 Entry Hook 1.5s] → [Nội dung Quest] → [M2 Live Pulse] → [M3 Quest Fanfare 5-8s] → [M4 Door Unlock 8-12s]

  M1: QuestEntryOverlay.jsx (mới) — mount ngay khi TaskScreen load, auto-dismiss 1.5s
  M2: InlineStreakIndicator (hooks vào existing quest components) — không ngắt flow
  M3: QuestCompleteFanfare.jsx (mới) — intercept handleTaskComplete, show TRƯỚC KHI navigate
  M4: DoorUnlockCeremony.jsx (mới) — mount trên QuestMap3D khi zone complete detect
```

---

### 9.2 MOMENT 1 — QuestEntryOverlay (Khi vào quest)

**File mới:** `src/components/questmap/QuestEntryOverlay.jsx`
**File CSS mới:** `src/components/questmap/QuestEntryOverlay.css`
**Mounted trong:** `TaskScreen.jsx` — ngay sau `showSRSWarmup` check

#### Mục tiêu:
- 1.5 giây narrative hook trước khi quest content xuất hiện
- Frame quest như "sứ mệnh cần hoàn thành để mở cánh cửa tiếp theo"
- Học sinh quen có thể skip (tap anywhere hoặc `ESC`)

#### Code Spec — QuestEntryOverlay.jsx:

```jsx
// src/components/questmap/QuestEntryOverlay.jsx
import React, { useState, useEffect } from 'react';
import { playButtonClick } from '../../utils/soundEffects';
import './QuestEntryOverlay.css';

// Lore hooks per quest — anchored to QUEST_SCHEDULE task IDs
const QUEST_LORE = {
  gear1_webtoon:    { hook: "The Story World awakens! Read the scenes to collect the first Storm Words.", icon: "📚", color: "#3b82f6" },
  gear2_karaoke:    { hook: "Echo the voices! Shadow Jake's words — each perfect echo charges a Thunder Rune.", icon: "🎧", color: "#8b5cf6" },
  gear3_retell:     { hook: "The story is yours now. Retell it — unlock the Voice Fragment for the Chronicles!", icon: "🎙️", color: "#10b981" },
  gear4_clil:       { hook: "New knowledge incoming! The Alchemy Lab door opens only to true Fact Finders.", icon: "🌐", color: "#06b6d4" },
  science_lab:      { hook: "Action Lab is waiting! Solve the 3 mysteries to forge a Crystal Shard.", icon: "🧪", color: "#10b981" },
  science_report:   { hook: "Report your discoveries! Your findings light up the Knowledge Lab doorway.", icon: "📝", color: "#f59e0b" },
  word_blitz:       { hook: "⚡ Speed Match is LIVE! Hit 10 words in 60 seconds — the Battle Arena gate cracks open!", icon: "⚡", color: "#f59e0b" },
  sentence_smash:   { hook: "Grammar Duel begins! Arrange the sentence swords — defeat 5 duels to unlock the Storm Rune.", icon: "🧱", color: "#ef4444" },
  math_quest:       { hook: "Math Quest countdown! Solve the Bar Models — each solution charges a Power Point.", icon: "📐", color: "#8b5cf6" },
  story_writer:     { hook: "The pen is mightier! Write your 3-scene story — the Creator Studio seal awaits.", icon: "✏️", color: "#6366f1" },
  broadcast_studio: { hook: "Cameras rolling! Your Video Challenge unlocks the final Creator Studio fragment.", icon: "📹", color: "#ec4899" },
  info_exchange:    { hook: "Nova is waiting! Ask and answer — complete the Info Exchange to forge the Speaking Key.", icon: "🔄", color: "#14b8a6" },
  boss_listening:   { hook: "🎧 Listening Shield activated! 5 parts. Crack every audio challenge to defend the Castle.", icon: "🎧", color: "#0ea5e9" },
  boss_reading:     { hook: "📖 Reading & Writing Shield — the Boss Castle final barrier. Seal it with your pen!", icon: "📖", color: "#6366f1" },
  weekly_review:    { hook: "🏆 Speaking & Passport — the final gate of the week! Clear it to earn your Chronicle Stars.", icon: "🏆", color: "#f59e0b" },
};

const DEFAULT_LORE = { hook: "A new challenge awaits! Complete it to unlock the next chapter.", icon: "⚡", color: "#6366f1" };

export default function QuestEntryOverlay({ taskId, taskLabel, weekId, onDismiss }) {
  const [visible, setVisible] = useState(true);
  const lore = QUEST_LORE[taskId] || DEFAULT_LORE;

  useEffect(() => {
    // Auto-dismiss after 1500ms
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300); // Wait for fade-out animation
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleSkip = () => {
    playButtonClick();
    setVisible(false);
    setTimeout(onDismiss, 200);
  };

  return (
    <div
      className={`qeo-overlay ${visible ? 'qeo-enter' : 'qeo-exit'}`}
      onClick={handleSkip}
      style={{ '--accent': lore.color }}
    >
      {/* Lexio mascot runs in from left */}
      <div className="qeo-mascot">🦊</div>

      {/* Mission Unlocked badge */}
      <div className="qeo-badge">
        <span className="qeo-badge-label">⚡ MISSION UNLOCKED</span>
      </div>

      {/* Quest title — large, cinematic */}
      <div className="qeo-quest-icon">{lore.icon}</div>
      <h2 className="qeo-quest-title">{taskLabel}</h2>

      {/* Lore hook text */}
      <p className="qeo-lore-text">"{lore.hook}"</p>

      {/* Progress narrative */}
      <div className="qeo-door-hint">
        🔐 Complete this quest → unlock the next door
      </div>

      {/* Skip tap anywhere hint */}
      <span className="qeo-skip-hint">Tap anywhere to skip</span>
    </div>
  );
}
```

#### CSS Spec — QuestEntryOverlay.css:

```css
/* src/components/questmap/QuestEntryOverlay.css */

.qeo-overlay {
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: radial-gradient(ellipse at center, 
    color-mix(in srgb, var(--accent) 30%, #0f172a 70%) 0%, 
    #0a0a1a 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 24px;
  cursor: pointer;
  user-select: none;
}

/* Entry animation — slide up from bottom */
.qeo-overlay.qeo-enter {
  animation: qeoSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.qeo-overlay.qeo-exit {
  animation: qeoFadeOut 0.3s ease-in forwards;
}

@keyframes qeoSlideIn {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes qeoFadeOut {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(1.04); }
}

/* Lexio mascot — runs in from left */
.qeo-mascot {
  position: absolute;
  top: 24px; left: 16px;
  font-size: 2.2rem;
  animation: mascotRunIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}
@keyframes mascotRunIn {
  from { transform: translateX(-80px) rotate(-15deg); opacity: 0; }
  to   { transform: translateX(0) rotate(0deg); opacity: 1; }
}

/* "MISSION UNLOCKED" badge */
.qeo-badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 999px;
  padding: 4px 16px;
  animation: qeoBadgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}
@keyframes qeoBadgePop {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.qeo-badge-label {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
}

/* Quest icon */
.qeo-quest-icon {
  font-size: 3.5rem;
  animation: qeoIconDrop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
  filter: drop-shadow(0 0 20px var(--accent));
}
@keyframes qeoIconDrop {
  from { transform: translateY(-40px) scale(0.5); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}

/* Quest title */
.qeo-quest-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  letter-spacing: -0.02em;
  animation: qeoTitleIn 0.4s ease 0.3s both;
  text-shadow: 0 0 30px var(--accent);
}
@keyframes qeoTitleIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Lore text */
.qeo-lore-text {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.75);
  text-align: center;
  font-style: italic;
  max-width: 320px;
  line-height: 1.6;
  animation: qeoLoreIn 0.4s ease 0.45s both;
}
@keyframes qeoLoreIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Door hint */
.qeo-door-hint {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  padding: 8px 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  animation: qeoLoreIn 0.4s ease 0.6s both;
}

/* Skip hint */
.qeo-skip-hint {
  position: absolute;
  bottom: 20px;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.05em;
}

/* Mobile adjustments */
@media (max-width: 430px) {
  .qeo-quest-title { font-size: 1.4rem; }
  .qeo-quest-icon { font-size: 2.8rem; }
}
```

#### Integration vào TaskScreen.jsx:

```jsx
// THÊM vào TaskScreen.jsx — ANCHOR POINT: dòng 331 (sau showSRSWarmup state)
import QuestEntryOverlay from './QuestEntryOverlay';

// THÊM state (sau srsChecked state):
const [showEntryOverlay, setShowEntryOverlay] = useState(true);
const [overlayDismissed, setOverlayDismissed] = useState(false);

const handleOverlayDismiss = useCallback(() => {
  setShowEntryOverlay(false);
  setOverlayDismissed(true);
}, []);

// THÊM vào JSX — TRƯỚC <div className="ts-content">:
{showEntryOverlay && !overlayDismissed && (
  <QuestEntryOverlay
    taskId={taskId}
    taskLabel={taskInfo?.label || ''}
    weekId={weekId}
    onDismiss={handleOverlayDismiss}
  />
)}
```

---

### 9.3 MOMENT 2 — Live Pulse (Trong lúc học — InlineStreakIndicator)

**Không cần file mới.** Tích hợp vào sound effects + DOM overlay nhỏ.
**Triết lý:** Không dùng Modal hay popup. Chỉ dùng fixed corner badge nhỏ — không ngắt cognitive flow.

#### Component: `src/components/questmap/StreakCornerBadge.jsx`

```jsx
// src/components/questmap/StreakCornerBadge.jsx
// Mount trong TaskScreen — luôn visible khi đang học
import React, { useState, useEffect } from 'react';

export default function StreakCornerBadge({ streak, score, xp }) {
  const [visible, setVisible] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (streak >= 2) {
      setVisible(true);
      setPulseKey(k => k + 1);
    }
  }, [streak]);

  if (!visible || streak < 2) return null;

  const streakLabel = streak >= 8 ? '🔥🔥 INFERNO!' : streak >= 5 ? '🔥 ON FIRE!' : `🔥 x${streak} Streak`;
  const color = streak >= 8 ? '#ef4444' : streak >= 5 ? '#f97316' : '#f59e0b';

  return (
    <div
      key={pulseKey}
      style={{
        position: 'fixed',
        top: 60, right: 12,
        zIndex: 8000,
        background: color,
        color: '#fff',
        borderRadius: 12,
        padding: '6px 12px',
        fontWeight: 900,
        fontSize: '0.75rem',
        boxShadow: `0 4px 16px ${color}80`,
        animation: 'streakPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'none',
      }}
    >
      {streakLabel}
      <style>{`
        @keyframes streakPop {
          from { transform: scale(0.5) translateX(40px); opacity: 0; }
          to   { transform: scale(1) translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

#### Micro-particle on correct answer — thêm vào `soundEffects.js`:

```javascript
// THÊM vào src/utils/soundEffects.js — sau playCorrectSound()
/**
 * 10. Micro Particle Burst — tiny DOM confetti for single correct answer
 * Lighter than fireCelebrationConfetti (5 particles vs 70, 0.5s vs 2.5s)
 */
export function playMicroParticleBurst(anchorEl = null) {
  if (typeof window === 'undefined') return;
  const x = anchorEl
    ? anchorEl.getBoundingClientRect().left + anchorEl.offsetWidth / 2
    : window.innerWidth / 2;
  const y = anchorEl
    ? anchorEl.getBoundingClientRect().top
    : window.innerHeight / 2;

  const colors = ['#f59e0b', '#10b981', '#6366f1', '#ec4899'];
  for (let i = 0; i < 5; i++) {
    const el = document.createElement('div');
    const angle = (Math.PI * 2 * i) / 5;
    const dist = 40 + Math.random() * 20;
    el.style.cssText = `
      position: fixed; left: ${x}px; top: ${y}px;
      width: 8px; height: 8px; border-radius: 50%;
      background: ${colors[i % colors.length]};
      pointer-events: none; z-index: 99998;
      transition: transform 0.5s ease-out, opacity 0.5s ease-out;
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 30}px)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 550);
  }
}
```

> [!NOTE]
> **Sử dụng trong game components:** Khi học sinh trả lời đúng trong bất kỳ quest nào (không chỉ Chronicles games), gọi `playMicroParticleBurst(buttonElement)`. Các zone components (StoryWorldZone, BattleArenaZone...) tự quyết định khi nào gọi — không bắt buộc implement ngay trong Phase này.

---

### 9.4 MOMENT 3 — QuestCompleteFanfare (Hoàn thành quest)

**File mới:** `src/components/questmap/QuestCompleteFanfare.jsx`
**Intercept point:** `handleTaskComplete` trong `TaskScreen.jsx` — thay vì navigate ngay, show fanfare trước.

#### Luồng logic:

```
handleTaskComplete(score) được gọi bởi zone component
  → HIỆN TẠI: completeQuest() + navigate('/hub/1') ngay
  → MỚI: completeQuest() + setShowFanfare(true)
           QuestCompleteFanfare mount (5-8 giây)
           → sau khi fanfare xong → navigate('/hub/1')
```

#### Code Spec — QuestCompleteFanfare.jsx:

```jsx
// src/components/questmap/QuestCompleteFanfare.jsx
import React, { useState, useEffect, useRef } from 'react';
import { playVictoryFanfare, playCoinSound } from '../../utils/soundEffects';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import useDailyQuestStore from '../../stores/useDailyQuestStore';
import useChroniclesStore from '../../stores/useChroniclesStore';
import './QuestCompleteFanfare.css';

// What each quest unlocks — narrative text for "door unlock" hint
const UNLOCK_NARRATIVE = {
  gear1_webtoon:    { next: "Voice Shadow 🎧", hint: "The echo chamber opens!" },
  gear2_karaoke:    { next: "Story Retell 🎙️", hint: "The storytelling stage is yours!" },
  gear3_retell:     { next: "Floor 1 — Chamber of Tales 📜", hint: "Chronicles Floor 1 is now accessible!" },
  gear4_clil:       { next: "Action Lab 🧪", hint: "The experiment chamber unlocks!" },
  science_lab:      { next: "Discovery Report 📝", hint: "Your findings light up the next door!" },
  science_report:   { next: "Floor 2 — Alchemy Lab ⚗️", hint: "Chronicles Floor 2 opens its gates!" },
  word_blitz:       { next: "Grammar Duel 🧱", hint: "The duel ring is ready for you!" },
  sentence_smash:   { next: "Math Quest 📐", hint: "The calculation chamber activates!" },
  math_quest:       { next: "Floor 3 — Thunder Arena ⚡", hint: "Chronicles Floor 3 — Thunder Arena unlocked!" },
  story_writer:     { next: "Video Challenge 📹", hint: "Cameras are rolling for your next quest!" },
  broadcast_studio: { next: "Info Exchange 🔄", hint: "Nova is ready to talk with you!" },
  info_exchange:    { next: "Floor 4 — Rune Sanctum ⚒️", hint: "Chronicles Floor 4 — Rune Sanctum opens!" },
  boss_listening:   { next: "Reading & Writing Shield 📖", hint: "The reading fortress gate cracks open!" },
  boss_reading:     { next: "Speaking & Passport 🏆", hint: "Final gate of the week — almost there!" },
  weekly_review:    { next: "Floor 5 — Apex Spire 🏰 + Boss Chamber", hint: "Chronicles Apex Spire & Weekly Boss unlocked!" },
};

export default function QuestCompleteFanfare({ taskId, taskLabel, score, xpEarned, weekId, onComplete }) {
  const [phase, setPhase] = useState('stars'); // 'stars' → 'xp' → 'door_hint' → 'done'
  const unlock = UNLOCK_NARRATIVE[taskId] || { next: "Next Quest", hint: "The path forward opens!" };
  
  // Read PP earned this session from chronicles store
  const weeklyPP = useChroniclesStore(s => s.weeklyPP[`w${weekId}`] || 0);
  const ppEarnedHint = weeklyPP > 0 ? `+${Math.min(30, Math.floor(score/10))} ⚡ Power Points for Chronicles!` : null;

  useEffect(() => {
    // Phase timing
    playVictoryFanfare();
    fireCelebrationConfetti(taskId);

    const t1 = setTimeout(() => setPhase('xp'), 1200);
    const t2 = setTimeout(() => { playCoinSound(); setPhase('door_hint'); }, 2400);
    const t3 = setTimeout(() => setPhase('done'), 4800);
    const t4 = setTimeout(onComplete, 5200); // Navigate after fade-out

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className={`qcf-overlay ${phase === 'done' ? 'qcf-exit' : 'qcf-enter'}`}>
      
      {/* Phase 1: Stars rain in */}
      <div className={`qcf-stars-burst ${phase !== 'stars' ? 'qcf-fade-up' : ''}`}>
        <div className="qcf-star-row">
          {['⭐', '⭐', '⭐'].map((s, i) => (
            <span key={i} className="qcf-star" style={{ animationDelay: `${i * 0.15}s` }}>{s}</span>
          ))}
        </div>
        <h2 className="qcf-complete-title">⚔️ Quest Complete!</h2>
        <p className="qcf-task-name">{taskLabel}</p>
      </div>

      {/* Phase 2: XP + PP counter */}
      {(phase === 'xp' || phase === 'door_hint') && (
        <div className="qcf-rewards-row">
          {xpEarned > 0 && (
            <div className="qcf-reward-pill qcf-xp">
              🏆 +{xpEarned} XP
            </div>
          )}
          {ppEarnedHint && (
            <div className="qcf-reward-pill qcf-pp">
              {ppEarnedHint}
            </div>
          )}
        </div>
      )}

      {/* Phase 3: Door unlock hint */}
      {phase === 'door_hint' && (
        <div className="qcf-door-unlock">
          <div className="qcf-door-icon">🔓</div>
          <div className="qcf-door-text">
            <span className="qcf-door-label">UNLOCKED</span>
            <span className="qcf-door-next">{unlock.next}</span>
            <span className="qcf-door-hint">"{unlock.hint}"</span>
          </div>
        </div>
      )}

      {/* Tap to skip */}
      <button className="qcf-skip-btn" onClick={onComplete}>
        Continue →
      </button>
    </div>
  );
}
```

#### CSS Spec — QuestCompleteFanfare.css:

```css
/* src/components/questmap/QuestCompleteFanfare.css */

.qcf-overlay {
  position: fixed; inset: 0; z-index: 9800;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a0a 100%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 20px; padding: 32px 24px;
}
.qcf-overlay.qcf-enter { animation: qcfSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.qcf-overlay.qcf-exit  { animation: qcfFadeScale 0.4s ease-in forwards; }

@keyframes qcfSlideUp {
  from { transform: translateY(60px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes qcfFadeScale {
  to { transform: scale(1.06); opacity: 0; }
}

/* Stars */
.qcf-star-row { display: flex; gap: 8px; }
.qcf-star {
  font-size: 2.5rem;
  animation: starRainIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  filter: drop-shadow(0 0 12px #f59e0b);
}
@keyframes starRainIn {
  from { transform: translateY(-60px) rotate(-20deg); opacity: 0; }
  to   { transform: translateY(0) rotate(0); opacity: 1; }
}

.qcf-complete-title {
  font-size: 2rem; font-weight: 900; color: #fff;
  text-shadow: 0 0 30px #f59e0b;
  animation: qcfTitlePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
}
@keyframes qcfTitlePop {
  from { transform: scale(0.7); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.qcf-task-name {
  font-size: 1rem; color: rgba(255,255,255,0.7);
  font-weight: 700; letter-spacing: 0.05em;
}

.qcf-fade-up { animation: qcfFadeUp 0.4s ease forwards; }
@keyframes qcfFadeUp {
  to { transform: translateY(-20px); opacity: 0; }
}

/* Reward pills */
.qcf-rewards-row {
  display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
  animation: qcfSlideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes qcfSlideIn {
  from { transform: translateX(-30px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.qcf-reward-pill {
  padding: 8px 20px; border-radius: 999px;
  font-weight: 900; font-size: 0.9rem;
}
.qcf-xp { background: rgba(245,158,11,0.2); border: 2px solid #f59e0b; color: #fcd34d; }
.qcf-pp { background: rgba(99,102,241,0.2); border: 2px solid #6366f1; color: #a5b4fc; }

/* Door unlock card */
.qcf-door-unlock {
  display: flex; align-items: center; gap: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 16px 24px;
  animation: qcfDoorReveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes qcfDoorReveal {
  from { transform: scale(0.8) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}
.qcf-door-icon { font-size: 2.2rem; animation: qcfDoorPulse 1.5s ease-in-out infinite; }
@keyframes qcfDoorPulse {
  0%,100% { transform: scale(1) rotate(0deg); }
  50%     { transform: scale(1.15) rotate(5deg); }
}
.qcf-door-text { display: flex; flex-direction: column; gap: 2px; }
.qcf-door-label { font-size: 0.65rem; letter-spacing: 0.15em; color: #10b981; font-weight: 900; }
.qcf-door-next  { font-size: 1.05rem; font-weight: 900; color: #fff; }
.qcf-door-hint  { font-size: 0.8rem; color: rgba(255,255,255,0.6); font-style: italic; }

/* Skip/Continue button */
.qcf-skip-btn {
  margin-top: 8px;
  padding: 10px 28px;
  border-radius: 12px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.8);
  font-weight: 900; font-size: 0.9rem;
  cursor: pointer; transition: all 0.2s;
}
.qcf-skip-btn:hover { background: rgba(255,255,255,0.2); color: #fff; }
```

#### Integration vào TaskScreen.jsx:

```jsx
// THAY THẾ handleTaskComplete (dòng 285–292 hiện tại):
import QuestCompleteFanfare from './QuestCompleteFanfare';

// STATE:
const [showFanfare, setShowFanfare] = useState(false);
const [fanfareScore, setFanfareScore] = useState(100);

// NEW handleTaskComplete:
const handleTaskComplete = useCallback((score = 100) => {
  // 1. Save progress immediately (non-blocking)
  if (weekId && taskId) {
    useDailyQuestStore.getState().completeQuest(weekId, taskId, { score });
    useUserStore.getState().updateLocalProgress(weekId, taskId, { isCompleted: true, score });
    useUserStore.getState().syncProgressToServer({ weekId, stationId: taskId, isCompleted: true, score });
  }
  // 2. Show fanfare BEFORE navigating
  setFanfareScore(score);
  setShowFanfare(true);
}, [weekId, taskId]);

const handleFanfareComplete = useCallback(() => {
  setShowFanfare(false);
  navigate(`/week/${weekId}/hub/1`);
}, [weekId, navigate]);

// JSX — mount fanfare as overlay above content:
{showFanfare && (
  <QuestCompleteFanfare
    taskId={taskId}
    taskLabel={taskInfo?.label || ''}
    score={fanfareScore}
    xpEarned={taskInfo?.xp || 0}
    weekId={weekId}
    onComplete={handleFanfareComplete}
  />
)}
```

---

### 9.5 MOMENT 4 — DoorUnlockCeremony (Zone complete → Chronicle Floor mở)

**File mới:** `src/components/questmap/DoorUnlockCeremony.jsx`
**Mounted trong:** `QuestMap3D.jsx` — detect khi zone (day) hoàn thành

#### Trigger Logic:

```
QuestMap3D.jsx detect zone complete → show DoorUnlockCeremony
Condition: `isDayComplete(weekId, dayIndex)` trở thành true trong session này
  (so sánh prevDayComplete với current)

Đây là khoảnh khắc "cánh cửa thật sự mở ra" — ý nghĩa nhất về mặt narrative.
```

#### Code Spec — DoorUnlockCeremony.jsx:

```jsx
// src/components/questmap/DoorUnlockCeremony.jsx
import React, { useState, useEffect } from 'react';
import { playVictoryFanfare, playCoinSound } from '../../utils/soundEffects';
import './DoorUnlockCeremony.css';

// Chronicles floor names per day
const FLOOR_NAMES = [
  { floor: 1, name: "Chamber of Tales",  icon: "📜", theme: "#7C3AED" },
  { floor: 2, name: "Alchemy Lab",       icon: "⚗️", theme: "#0EA5E9" },
  { floor: 3, name: "Thunder Arena",     icon: "⚡", theme: "#F59E0B" },
  { floor: 4, name: "Rune Sanctum",      icon: "⚒️", theme: "#EF4444" },
  { floor: 5, name: "Apex Spire + Boss", icon: "🏰⚔️", theme: "#F59E0B" },
];

export default function DoorUnlockCeremony({ dayIndex, weekId, onDone }) {
  const [phase, setPhase] = useState('crack'); // 'crack' → 'open' → 'reveal' → 'done'
  const floor = FLOOR_NAMES[dayIndex] || FLOOR_NAMES[0];

  useEffect(() => {
    // Phase sequence
    const t1 = setTimeout(() => { playCoinSound(); setPhase('open'); }, 800);
    const t2 = setTimeout(() => { playVictoryFanfare(); setPhase('reveal'); }, 1800);
    const t3 = setTimeout(() => setPhase('done'), 4500);
    const t4 = setTimeout(onDone, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div className={`duc-overlay ${phase === 'done' ? 'duc-exit' : ''}`}
         style={{ '--theme': floor.theme }}>
      
      {/* Background: dark dungeon corridor */}
      <div className="duc-corridor-bg" />

      {/* Zone complete badge */}
      <div className="duc-zone-badge">✅ Zone {dayIndex + 1} Complete!</div>

      {/* The Door — 3D swing open animation */}
      <div className={`duc-door-container ${phase === 'crack' ? '' : phase}`}>
        {/* Door left half */}
        <div className="duc-door-left">
          <div className="duc-door-panel-l">
            <span className="duc-door-handle-l">🔒</span>
          </div>
        </div>
        {/* Door right half */}
        <div className="duc-door-right">
          <div className="duc-door-panel-r">
            <span className="duc-door-handle-r"></span>
          </div>
        </div>

        {/* Crack: light bleeds through center */}
        <div className={`duc-door-crack ${phase !== 'crack' ? 'duc-crack-wide' : ''}`} />
      </div>

      {/* Reveal: Floor info shown after door swings open */}
      {(phase === 'reveal' || phase === 'done') && (
        <div className="duc-floor-reveal">
          <span className="duc-floor-icon">{floor.icon}</span>
          <div className="duc-floor-info">
            <span className="duc-floor-label">CHRONICLES UNLOCKED</span>
            <span className="duc-floor-name">Floor {floor.floor}: {floor.name}</span>
            <span className="duc-floor-cta">
              🦊 Tap the Chronicles button to enter! →
            </span>
          </div>
        </div>
      )}

      {/* PP earned */}
      {phase === 'reveal' && (
        <div className="duc-pp-earned">
          ⚡ Power Points earned this zone → Boss Chamber closer!
        </div>
      )}

      {/* Skip */}
      <button className="duc-skip" onClick={onDone}>Skip ↓</button>
    </div>
  );
}
```

#### CSS Spec — DoorUnlockCeremony.css:

```css
/* src/components/questmap/DoorUnlockCeremony.css */

.duc-overlay {
  position: fixed; inset: 0; z-index: 9700;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 20px; padding: 24px;
  background: #0a0a1a;
  animation: ducFadeIn 0.5s ease both;
}
.duc-overlay.duc-exit { animation: ducFadeOut 0.5s ease forwards; }

@keyframes ducFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes ducFadeOut { to { opacity: 0; } }

/* Corridor background — stone texture via CSS */
.duc-corridor-bg {
  position: absolute; inset: 0;
  background: 
    repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 40px),
    linear-gradient(180deg, #0f0c1a 0%, #1a0f2e 50%, #0f0c1a 100%);
}

/* Zone badge */
.duc-zone-badge {
  background: rgba(16,185,129,0.2);
  border: 2px solid #10b981;
  border-radius: 999px;
  padding: 6px 20px;
  font-weight: 900; font-size: 0.8rem; color: #6ee7b7;
  letter-spacing: 0.08em;
  position: relative; z-index: 2;
  animation: ducBadgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
}
@keyframes ducBadgePop {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

/* ─── THE DOOR ─────────────────────────────────────────── */
.duc-door-container {
  position: relative; z-index: 2;
  width: 200px; height: 280px;
  perspective: 800px;
}

/* Door halves — split vertically */
.duc-door-left, .duc-door-right {
  position: absolute; top: 0; height: 100%; width: 50%;
  transform-style: preserve-3d;
  transition: transform 1.0s cubic-bezier(0.4, 0, 0.2, 1);
}
.duc-door-left  { left: 0;  transform-origin: left center; }
.duc-door-right { right: 0; transform-origin: right center; }

/* Door panels */
.duc-door-panel-l, .duc-door-panel-r {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #374151, #1f2937);
  border: 2px solid rgba(156,163,175,0.3);
  display: flex; align-items: center; justify-content: center;
}
.duc-door-panel-l {
  border-radius: 8px 0 0 8px;
  background: linear-gradient(135deg, #4b5563, #374151);
}
.duc-door-panel-r {
  border-radius: 0 8px 8px 0;
  background: linear-gradient(135deg, #374151, #1f2937);
}
.duc-door-handle-l { font-size: 1.5rem; }

/* Crack — center light */
.duc-door-crack {
  position: absolute; left: 50%; top: 0;
  transform: translateX(-50%);
  width: 2px; height: 100%;
  background: var(--theme);
  box-shadow: 0 0 20px var(--theme), 0 0 40px var(--theme);
  transition: width 0.8s ease, box-shadow 0.8s ease;
}
.duc-crack-wide {
  width: 20px;
  box-shadow: 0 0 60px var(--theme), 0 0 120px var(--theme);
}

/* OPEN state — doors swing apart */
.duc-door-container.open .duc-door-left  { transform: rotateY(-75deg); }
.duc-door-container.open .duc-door-right { transform: rotateY(75deg); }
.duc-door-container.reveal .duc-door-left  { transform: rotateY(-90deg); }
.duc-door-container.reveal .duc-door-right { transform: rotateY(90deg); }

/* Floor reveal */
.duc-floor-reveal {
  display: flex; align-items: center; gap: 16px;
  position: relative; z-index: 2;
  animation: ducReveal 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
}
@keyframes ducReveal {
  from { transform: scale(0.6) translateY(30px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}
.duc-floor-icon { font-size: 3rem; filter: drop-shadow(0 0 20px var(--theme)); }
.duc-floor-info { display: flex; flex-direction: column; gap: 4px; }
.duc-floor-label { font-size: 0.65rem; letter-spacing: 0.15em; color: var(--theme); font-weight: 900; }
.duc-floor-name  { font-size: 1.1rem; font-weight: 900; color: #fff; }
.duc-floor-cta   { font-size: 0.8rem; color: rgba(255,255,255,0.6); font-style: italic; }

/* PP earned hint */
.duc-pp-earned {
  position: relative; z-index: 2;
  font-size: 0.8rem; color: rgba(167,139,250,0.9);
  font-weight: 700;
  animation: ducReveal 0.4s ease 0.3s both;
}

/* Skip */
.duc-skip {
  position: absolute; bottom: 20px;
  background: transparent; border: none;
  color: rgba(255,255,255,0.3); font-size: 0.75rem;
  cursor: pointer; font-weight: 700;
}
.duc-skip:hover { color: rgba(255,255,255,0.7); }
```

#### Integration vào QuestMap3D.jsx:

```jsx
// THÊM vào QuestMap3D.jsx (dòng 1–10, sau imports):
import DoorUnlockCeremony from './DoorUnlockCeremony';

// THÊM state (trong QuestMap3D component):
const [unlockCeremonyDay, setUnlockCeremonyDay] = useState(null); // null | dayIndex (0-4)

// THÊM useEffect để detect mới complete:
const prevDayComplete = useRef({});
useEffect(() => {
  // Check 5 days — if any newly became complete this render, show ceremony
  for (let d = 0; d < 5; d++) {
    const key = `${weekId}_d${d}`;
    const isNowComplete = isDayComplete(weekId, d + 1); // 1-based
    const wasComplete = prevDayComplete.current[key];
    if (isNowComplete && !wasComplete) {
      prevDayComplete.current[key] = true;
      setUnlockCeremonyDay(d);
      break; // show ceremony for the first newly-complete day
    }
    if (isNowComplete) {
      prevDayComplete.current[key] = true;
    }
  }
}, [weekId]); // run once on mount to set initial state

// JSX — add ceremony overlay:
{unlockCeremonyDay !== null && (
  <DoorUnlockCeremony
    dayIndex={unlockCeremonyDay}
    weekId={weekId}
    onDone={() => setUnlockCeremonyDay(null)}
  />
)}
```

---

### 9.6 Bảng Tổng Hợp — Files Cần Tạo/Sửa cho Gamification Layer

| File | Action | Mô tả |
|------|--------|-------|
| `src/components/questmap/QuestEntryOverlay.jsx` | **TẠO MỚI** | M1 — Cinematic quest intro, 1.5s auto-dismiss |
| `src/components/questmap/QuestEntryOverlay.css` | **TẠO MỚI** | CSS animation cho Entry Overlay |
| `src/components/questmap/QuestCompleteFanfare.jsx` | **TẠO MỚI** | M3 — 5-8s fanfare intercept trước navigate |
| `src/components/questmap/QuestCompleteFanfare.css` | **TẠO MỚI** | CSS animation cho Fanfare |
| `src/components/questmap/DoorUnlockCeremony.jsx` | **TẠO MỚI** | M4 — Zone complete door-opening animation |
| `src/components/questmap/DoorUnlockCeremony.css` | **TẠO MỚI** | CSS 3D door swing animation |
| `src/components/questmap/StreakCornerBadge.jsx` | **TẠO MỚI** | M2 — Corner streak indicator |
| `src/components/questmap/TaskScreen.jsx` | **SỬA** | Thêm Entry Overlay + intercept handleTaskComplete + Fanfare |
| `src/components/questmap/QuestMap3D.jsx` | **SỬA** | Thêm DoorUnlockCeremony detection + render |
| `src/utils/soundEffects.js` | **SỬA** | Thêm `playMicroParticleBurst()` function |

### 9.7 Anti-Hallucination Checklist cho Gamification Layer

```
□ QuestEntryOverlay: Auto-dismiss sau đúng 1500ms? Không block quest content render?
□ QuestEntryOverlay: Có Skip button (tap anywhere)? Không có modal chặn interact?
□ QuestEntryOverlay: QUEST_LORE map có đủ tất cả 15 taskId từ QUEST_SCHEDULE?
□ QuestCompleteFanfare: Gọi completeQuest() TRƯỚC KHI setShowFanfare(true)?
□ QuestCompleteFanfare: navigate chỉ được gọi trong handleFanfareComplete (không trong handleTaskComplete)?
□ QuestCompleteFanfare: Có Continue button để skip fanfare sớm?
□ DoorUnlockCeremony: Chỉ show khi day MỚI complete trong session (không show lại khi reload)?
□ DoorUnlockCeremony: 3D CSS door swing dùng transform-origin đúng (left/right center)?
□ DoorUnlockCeremony: Có Skip button?
□ soundEffects.js: playMicroParticleBurst() không gây memory leak (setTimeout remove DOM)?
□ Tất cả: npm run build exit code 0?
```
