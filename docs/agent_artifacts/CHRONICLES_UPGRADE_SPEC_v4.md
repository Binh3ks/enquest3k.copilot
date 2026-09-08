# 🏰 THE LEXIO CHRONICLES — UPGRADE SPEC v4.0
**Artifact kỹ thuật để giao cho Antigravity (hoặc bất kỳ coding agent nào)**
**Mục tiêu: nâng world map + 3 mini-game lên physics/engine thật bằng Phaser 3, giữ nguyên 12 game còn lại.**

> [!CAUTION]
> ## ⛔ BÀI HỌC TỪ v3.0 — ĐỌC TRƯỚC KHI LÀM GÌ KHÁC
> Bản spec trước (v3.0) dùng ngôn ngữ "3D", "physics", "arc animation", "catapult" nhưng
> chỉ định giải pháp CSS transform trên `<div>`. Kết quả: agent tạo ra hiệu ứng trang trí
> (ví dụ joystick không có chức năng ở Floor 4 Door 2) thay vì chuyển động thật.
>
> **Spec này sửa lỗi đó bằng cách khóa cứng stack kỹ thuật, không để agent tự suy diễn:**
> - Bất cứ chỗ nào ghi **"Phaser"** → bắt buộc dùng `Phaser.Scene` + `Phaser.Physics.Arcade`,
>   KHÔNG được thay bằng CSS animation, KHÔNG được dùng `<div>` giả lập.
> - Bất cứ chỗ nào ghi **"React/CSS (giữ nguyên)"** → KHÔNG được đụng vào, không "nâng cấp thêm"
>   ngoài phạm vi Giai đoạn 0 (sửa lỗi dữ liệu).
> - Mọi control trên màn hình (nút, joystick, thanh trượt) PHẢI có hành vi thật gắn với nó.
>   Không tạo control trang trí. Nếu chưa làm chức năng, KHÔNG render control đó.

---

## PHẦN 0 — PHẠM VI & KHÔNG PHẠM VI (đọc kỹ trước khi code)

### ✅ TRONG PHẠM VI (được đổi sang Phaser 3, `Phaser.Physics.Arcade`)
| # | Hạng mục | File hiện tại | File mới |
|---|---|---|---|
| 1 | World Map (5 phòng + Boss) | `ChroniclesWorldMap.jsx` | giữ layout React (header/tabs/PP bar), thay phần bản đồ bằng `<PhaserHubCanvas />` |
| 2 | Highway Word Runner | (chưa có / CSS giả) | `HighwayRunnerScene.js` (Phaser) |
| 3 | Chunk Catapult Match | (chưa có / CSS giả) | `ChunkCatapultScene.js` (Phaser) |
| 4 | Weekly Boss Type 1 (Vocab Gauntlet) | `BossBattleScreen.jsx` (MCQ thuần) | `BossCombatScene.js` (Phaser, dùng chung cho boss type 1 trước, mở rộng sau) |

### ❌ NGOÀI PHẠM VI (giữ nguyên React + CSS, KHÔNG được sửa ngoài Giai đoạn 0)
12 game còn lại: `arcane_bubble`, `spell_train`, `lexical_det`, `crystal_match`, `rune_forge`,
`ancient_scroll`, `phonics_bubble`, `lexical_riddle`, `grand_matrix`, `titan_forge`,
`cambridge_cloze`, `spell_train_express`.

> Lý do: đây là các game dạng quiz/logic — bản chất sư phạm của chúng không cần physics.
> Việc "Phaser hóa" chúng chỉ tốn effort mà không tăng giá trị học tập hay retention.
> Nếu Antigravity thấy các game này "cũng nên nâng cấp" — **dừng lại, không tự ý làm**,
> quay lại hỏi trước.

---

## PHẦN 1 — GIAI ĐOẠN 0: SỬA LỖI DỮ LIỆU (làm trước tiên, bắt buộc, không được bỏ qua)

Đây là các lỗi đã quan sát được trên bản build hiện tại (screenshot thật), phải sửa trước khi
động vào Phaser vì lỗi dữ liệu sẽ lặp lại y hệt trong engine mới nếu không sửa tận gốc hàm sinh dữ liệu.

### 1.1 Bug: Đáp án MCQ trùng lặp hoặc rỗng
**Triệu chứng quan sát được:** câu hỏi "What does 'invisible science force' mean?" hiển thị
đáp án A = B = `"(none of the above)"`, đáp án C trống.

**Nguyên nhân khả dĩ:** hàm sinh distractor không đủ pool từ vựng riêng biệt cho tuần/CLIL topic
đó, rơi vào fallback rỗng.

**Yêu cầu sửa — thêm hàm validate bắt buộc trước khi render bất kỳ câu hỏi MCQ nào trong toàn hệ thống:**

```javascript
// src/utils/quizValidation.js — TẠO MỚI, dùng chung cho MỌI game MCQ (cả 12 game cũ và game mới)

/**
 * Validate a set of MCQ options before rendering.
 * Throws in dev, silently falls back to a safe generic pool in prod.
 */
export function validateMCQOptions(options, correctAnswer, fallbackPool = []) {
  const cleaned = options
    .map(o => (o || '').trim())
    .filter(o => o.length > 0);

  const unique = [...new Set(cleaned)];

  if (unique.length < 3 || !unique.includes(correctAnswer)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[quizValidation] Bad MCQ options:', { options, correctAnswer });
    }
    // Fallback: pull generic distractors from fallbackPool, guaranteed non-duplicate
    const pool = fallbackPool.filter(w => w !== correctAnswer);
    const picked = shuffleArray(pool).slice(0, 3);
    return shuffleArray([correctAnswer, ...picked]);
  }
  return shuffleArray(unique);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

**Bắt buộc:** mọi component MCQ hiện có (kể cả 12 game "giữ nguyên") phải gọi qua hàm này
trước khi render. Đây là sửa lỗi dữ liệu, không phải "nâng cấp ngoài phạm vi" — được phép sửa.

### 1.2 Bug: Word chunk dính dấu câu thừa
**Triệu chứng quan sát được:** toa tàu hiển thị `"door."` thay vì `"door"`.

**Yêu cầu sửa:**

```javascript
// src/utils/textSanitize.js — TẠO MỚI
export function sanitizeChunkText(raw) {
  return (raw || '')
    .trim()
    .replace(/^[.,;:!?]+/, '')   // strip leading punctuation
    .replace(/[.,;:]+$/, '');   // strip trailing punctuation EXCEPT '?' and '!' (giữ nếu là câu hoàn chỉnh)
}
```

Áp dụng hàm này tại điểm sinh dữ liệu `grammarSentences` chunks (data layer), không chỉ ở
tầng hiển thị — nếu chỉ sửa ở UI thì dữ liệu lưu trong store/analytics vẫn sai.

### 1.3 Bug: Control trang trí không có chức năng (joystick chết)
**Triệu chứng quan sát được:** Floor 4 / Door 2 "Syntax Express" hiển thị icon joystick nhưng
hành động thật là nút "STRIKE / TAP" riêng biệt bên dưới.

**Yêu cầu sửa:** Xoá icon joystick trang trí khỏi component hiện tại của `spell_train_express`
(đây là game React/CSS, thuộc "ngoài phạm vi" nhưng xoá 1 icon chết là data-integrity fix,
được phép). Không thêm control mới nào không có handler.

---

## PHẦN 2 — KIẾN TRÚC TỔNG THỂ SAU NÂNG CẤP

```
ChroniclesScreen.jsx                              [KHÔNG ĐỔI — vẫn điều hướng map/room/boss]
│
├── ChroniclesWorldMap.jsx                         [SỬA — xem Phần 3]
│    ├── (giữ nguyên) Header, PP bar, Tab bar, Mascot Shop, Fragments, Hall of Fame
│    └── (MỚI) <PhaserHubCanvas weekNumber onEnterRoom onEnterBoss />
│           └── src/phaser/scenes/HubScene.js      [MỚI — Phaser Scene]
│
├── DailyRoomScreen.jsx                            [SỬA — thêm 2 case Phaser]
│    ├── 12 game cũ                                [KHÔNG ĐỔI — React + CSS]
│    ├── case 'highway_runner':
│    │     <PhaserGameCanvas scene={HighwayRunnerScene} .../>
│    └── case 'chunk_catapult':
│          <PhaserGameCanvas scene={ChunkCatapultScene} .../>
│
└── BossBattleScreen.jsx                           [SỬA — boss type 1 dùng Phaser]
     └── case bossType === 1:
           <PhaserGameCanvas scene={BossCombatScene} .../>
```

### 2.1 Nguyên tắc Bridge: React (dữ liệu/state) ↔ Phaser (rendering/input)

React tiếp tục sở hữu MỌI thứ liên quan dữ liệu học thuật (vocab, store, tiến trình, TTS,
lưu server). Phaser CHỈ chịu trách nhiệm rendering + input + physics + phát sự kiện ra ngoài.
Không được để Phaser tự gọi API hay tự đọc/ghi Zustand store trực tiếp — mọi giao tiếp đi qua
một React wrapper component dùng `EventEmitter` (Phaser đã có sẵn `Phaser.Events.EventEmitter`).

**File bắt buộc tạo — dùng chung cho mọi Phaser canvas trong app:**

```jsx
// src/phaser/PhaserGameCanvas.jsx — TẠO MỚI, wrapper dùng chung
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

/**
 * Generic React <-> Phaser bridge.
 * `sceneClass` must be a Phaser.Scene subclass.
 * `sceneData` is passed into scene.init(data) — vocab items, config, callbacks.
 * `onEvent(eventName, payload)` receives everything the scene emits via
 *   this.game.events.emit('bridge', eventName, payload)
 */
export default function PhaserGameCanvas({ sceneClass, sceneData, onEvent, width = 390, height = 640 }) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width,
      height,
      backgroundColor: 'transparent',
      transparent: true,
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [sceneClass],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    game.events.on('bridge', (eventName, payload) => {
      onEvent && onEvent(eventName, payload);
    });

    // Pass initial data once scene is ready
    game.events.once('ready', () => {
      const scene = game.scene.keys[sceneClass.name];
      if (scene) scene.scene.restart(sceneData);
    });

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [sceneClass]); // eslint-disable-line

  return <div ref={containerRef} style={{ width: '100%', maxWidth: width, margin: '0 auto' }} />;
}
```

**Quy ước sự kiện bắt buộc mọi Scene phải phát ra (đặt tên chính xác, không tự đổi):**

| Event name | Khi nào phát | Payload |
|---|---|---|
| `door_enter` | Player va chạm 1 cửa phòng trên Hub | `{ dayIndex: number }` |
| `boss_enter` | Player va chạm cửa Boss | `{}` |
| `game_correct` | Trả lời/thu thập đúng trong mini-game | `{ points: number, comboCount: number }` |
| `game_wrong` | Trả lời/va chạm sai | `{ livesLeft: number }` |
| `game_complete` | Mini-game kết thúc | `{ stars: 0\|1\|2\|3, accuracy: number }` |

React lắng nghe qua `onEvent` để cập nhật Zustand store, gọi TTS, điều hướng — Phaser không
bao giờ tự làm các việc này.

---

## PHẦN 3 — HUB WORLD (World Map) — SCHEMA CHI TIẾT

### 3.1 Vì sao KHÔNG dùng virtual joystick kéo-thả
Thiết bị mục tiêu là Android tầm trung/4G (quan sát từ ảnh thực tế người dùng). Virtual
joystick kéo-thả (rex plugin) dễ bị input lag và khó thao tác chính xác trên màn hình nhỏ với
ngón tay trẻ em 6-9 tuổi. **Quyết định kỹ thuật bắt buộc: dùng "tap-to-move"** — chạm vào một
điểm trên sàn, nhân vật tự động đi bộ (pathfinding đơn giản theo đường thẳng hoặc theo tile
path) đến đó, có animation đi bộ thật. Đây là input pattern phổ biến trong game mobile casual
(Sky: Children of Light, Genshin's minimap-tap) và ổn định hơn nhiều so với joystick trên
thiết bị yếu.

### 3.2 Yêu cầu Asset (bắt buộc dùng nguồn có sẵn, KHÔNG tự vẽ mới từ đầu)

- **Nguồn đề xuất:** [kenney.nl](https://kenney.nl) — license CC0, có sẵn "Tiny Dungeon",
  "RPG Urban Pack", "Toon Characters" phù hợp phong cách trẻ em, nhẹ (spritesheet PNG nhỏ).
- **Nhân vật (Lexio 🦊 hoặc placeholder tương đương):**
  - Spritesheet dạng lưới đều, tối thiểu: `idle` (2-4 frame), `walk` (4-6 frame theo 4 hướng
    hoặc chỉ trái/phải nếu top-down đơn giản), `celebrate` (3-4 frame).
  - Kích thước khung hình đề xuất: 32×32px hoặc 48×48px (nhẹ, đủ rõ trên mobile).
- **Tileset sàn/tường:** 1 tileset đơn giản theo theme Chapter hiện tại (Storm Tower = đá +
  neon accent), dùng Tiled Map Editor (`.json` export) hoặc dựng tay bằng tilemap layer trong Phaser.
- **KHÔNG YÊU CẦU** animation phức tạp, particle hệ thống nặng, hay lighting engine — giữ nhẹ.

### 3.3 JSON Schema — Room/Door Layout (per Chapter, tái dùng cho mọi tuần trong Chapter)

```typescript
// src/data/chronicles/hubLayouts/chapter3_layout.json — TẠO MỚI (1 file / Chapter, không phải / tuần)
interface HubLayoutConfig {
  chapterId: number;
  tilemapKey: string;        // asset key đã load, vd "storm_tower_tileset"
  spawnPoint: { x: number; y: number };
  doors: HubDoorConfig[];
  bossDoor: HubDoorConfig;
  worldBounds: { width: number; height: number };
}

interface HubDoorConfig {
  dayIndex: number;          // 0-4, khớp CHAMBER_METADATA hiện có
  x: number;
  y: number;
  spriteKey: string;         // vd "door_closed", "door_open", "door_locked"
  triggerRadius: number;     // px, vùng va chạm để trigger door_enter
}
```

Ví dụ cụ thể cho Chapter 3 (Storm Tower):

```json
{
  "chapterId": 3,
  "tilemapKey": "storm_tower_tileset",
  "spawnPoint": { "x": 100, "y": 500 },
  "worldBounds": { "width": 800, "height": 600 },
  "doors": [
    { "dayIndex": 0, "x": 200, "y": 400, "spriteKey": "door_closed", "triggerRadius": 40 },
    { "dayIndex": 1, "x": 400, "y": 350, "spriteKey": "door_closed", "triggerRadius": 40 },
    { "dayIndex": 2, "x": 600, "y": 300, "spriteKey": "door_closed", "triggerRadius": 40 },
    { "dayIndex": 3, "x": 500, "y": 200, "spriteKey": "door_closed", "triggerRadius": 40 },
    { "dayIndex": 4, "x": 300, "y": 150, "spriteKey": "door_closed", "triggerRadius": 40 }
  ],
  "bossDoor": { "dayIndex": -1, "x": 700, "y": 100, "spriteKey": "boss_door", "triggerRadius": 50 }
}
```

> Chú thích cho Antigravity: toạ độ x/y trên là placeholder minh hoạ — khi implement thật,
> layout theo bố cục hình tháp leo dần (day 0 ở dưới, day 4 ở trên, boss trên cùng) để giữ
> đúng ẩn dụ "leo tháp" đã có trong narrative hiện tại (Apex Spire).

### 3.4 HubScene.js — Skeleton bắt buộc theo cấu trúc này

```javascript
// src/phaser/scenes/HubScene.js — TẠO MỚI
import Phaser from 'phaser';

export default class HubScene extends Phaser.Scene {
  constructor() {
    super('HubScene');
  }

  init(data) {
    this.weekNumber = data.weekNumber;
    this.layoutConfig = data.layoutConfig;       // HubLayoutConfig từ Phần 3.3
    this.unlockedDays = data.unlockedDays;        // number[] — dayIndex đã unlock, từ React store
    this.completedDays = data.completedDays;      // number[]
  }

  preload() {
    // Asset key phải khớp đúng với asset đã copy vào /public/phaser-assets/
    this.load.spritesheet('lexio', '/phaser-assets/lexio_spritesheet.png', { frameWidth: 48, frameHeight: 48 });
    this.load.image('door_closed', '/phaser-assets/door_closed.png');
    this.load.image('door_open', '/phaser-assets/door_open.png');
    this.load.image('door_locked', '/phaser-assets/door_locked.png');
    this.load.tilemapTiledJSON('storm_tower_map', '/phaser-assets/storm_tower_map.json');
    this.load.image('storm_tower_tiles', '/phaser-assets/storm_tower_tileset.png');
  }

  create() {
    // 1. Tilemap
    const map = this.make.tilemap({ key: 'storm_tower_map' });
    const tileset = map.addTilesetImage('storm_tower_tileset', 'storm_tower_tiles');
    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const wallLayer = map.createLayer('Walls', tileset, 0, 0);
    wallLayer.setCollisionByProperty({ collides: true });

    // 2. Player
    this.player = this.physics.add.sprite(
      this.layoutConfig.spawnPoint.x,
      this.layoutConfig.spawnPoint.y,
      'lexio'
    );
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, wallLayer);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('lexio', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'lexio', frame: 0 }],
      frameRate: 1,
    });

    // 3. Doors — static group with per-door state
    this.doorSprites = {};
    this.layoutConfig.doors.forEach((doorCfg) => {
      const isUnlocked = this.unlockedDays.includes(doorCfg.dayIndex) || doorCfg.dayIndex === 0;
      const isCompleted = this.completedDays.includes(doorCfg.dayIndex);
      const key = isCompleted ? 'door_open' : isUnlocked ? 'door_closed' : 'door_locked';

      const doorSprite = this.physics.add.staticSprite(doorCfg.x, doorCfg.y, key);
      doorSprite.dayIndex = doorCfg.dayIndex;
      doorSprite.isUnlocked = isUnlocked;
      this.doorSprites[doorCfg.dayIndex] = doorSprite;

      this.physics.add.overlap(this.player, doorSprite, () => this.handleDoorOverlap(doorSprite));
    });

    // Boss door
    const bossCfg = this.layoutConfig.bossDoor;
    this.bossDoorSprite = this.physics.add.staticSprite(bossCfg.x, bossCfg.y, 'door_locked');
    this.physics.add.overlap(this.player, this.bossDoorSprite, () => this.handleBossOverlap());

    // 4. Tap-to-move input
    this.moveTarget = null;
    this.input.on('pointerdown', (pointer) => {
      this.moveTarget = { x: pointer.worldX, y: pointer.worldY };
    });

    // 5. Camera
    this.cameras.main.setBounds(0, 0, this.layoutConfig.worldBounds.width, this.layoutConfig.worldBounds.height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  update() {
    if (!this.moveTarget) {
      this.player.setVelocity(0, 0);
      this.player.anims.play('idle', true);
      return;
    }
    const dx = this.moveTarget.x - this.player.x;
    const dy = this.moveTarget.y - this.player.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 4) {
      this.moveTarget = null;
      this.player.setVelocity(0, 0);
      this.player.anims.play('idle', true);
      return;
    }
    const speed = 160;
    this.player.setVelocity((dx / dist) * speed, (dy / dist) * speed);
    this.player.anims.play('walk', true);
    this.player.setFlipX(dx < 0);
  }

  handleDoorOverlap(doorSprite) {
    if (!doorSprite.isUnlocked) return;
    // Debounce: chỉ emit 1 lần / lần chạm vào cửa (tránh spam event mỗi frame overlap)
    if (this._lastDoorTrigger === doorSprite.dayIndex) return;
    this._lastDoorTrigger = doorSprite.dayIndex;
    this.game.events.emit('bridge', 'door_enter', { dayIndex: doorSprite.dayIndex });
  }

  handleBossOverlap() {
    if (this._lastDoorTrigger === 'boss') return;
    this._lastDoorTrigger = 'boss';
    this.game.events.emit('bridge', 'boss_enter', {});
  }
}
```

### 3.5 Sửa `ChroniclesWorldMap.jsx` — điểm nối chính xác

```diff
+ import PhaserGameCanvas from '../../phaser/PhaserGameCanvas';
+ import HubScene from '../../phaser/scenes/HubScene';
+ import { getHubLayoutForChapter } from '../../data/chronicles/hubLayouts';

  {activeTab === 'map' && (
    <>
      {/* Power Points Bar — GIỮ NGUYÊN */}
      ...

-     {/* 5 Room Nodes — GRID BUTTON CŨ, THAY THẾ */}
-     <div className="cwm-rooms-grid">...</div>
-     <div className="cwm-boss-section">...</div>

+     {/* Hub World — Phaser canvas thay cho grid button */}
+     <PhaserGameCanvas
+       sceneClass={HubScene}
+       sceneData={{
+         weekNumber,
+         layoutConfig: getHubLayoutForChapter(chapter.id),
+         unlockedDays: CHAMBER_METADATA.map((_, idx) =>
+           idx === 0 || isOwnerBypass || isRoomUnlocked(weekNumber, idx) || isDayComplete(weekNumber, idx) ? idx : null
+         ).filter(x => x !== null),
+         completedDays: CHAMBER_METADATA.map((_, idx) => idx).filter(idx => getRoomStars(weekNumber, idx) > 0),
+       }}
+       onEvent={(eventName, payload) => {
+         if (eventName === 'door_enter') onEnterRoom && onEnterRoom(payload.dayIndex);
+         if (eventName === 'boss_enter') onEnterBoss && onEnterBoss(bossTier);
+       }}
+     />
    </>
  )}
```

> **Giữ nguyên 100%:** Header, PP bar (số liệu), Stars summary, Footer text, Tab bar,
> Mascot Shop panel, Fragment panel, Hall of Fame modal. CHỈ thay phần render 5 room node +
> boss node bằng canvas Phaser.

---

## PHẦN 4 — 3 GAME FLAGSHIP: SCHEMA CHI TIẾT

### 4.1 `highway_runner` — Highway Word Runner (Arcade Physics thật)

**Khác biệt bắt buộc so với v3.0 (đã sai):** không dùng lane-swipe rời rạc qua CSS `left`
transition. Dùng `Phaser.Physics.Arcade` velocity thật + `overlap` detection thật.

```javascript
// src/phaser/scenes/HighwayRunnerScene.js — TẠO MỚI
import Phaser from 'phaser';

const LANES_X = [100, 195, 290]; // 3 lane center-x trong world 390px width

export default class HighwayRunnerScene extends Phaser.Scene {
  constructor() { super('HighwayRunnerScene'); }

  init(data) {
    this.vocabItems = data.vocabItems;      // [{ word, definition }] từ React
    this.duration = data.duration || 60;
    this.currentLane = 1;
    this.score = 0;
    this.lives = 3;
    this.currentTargetDef = null;
  }

  preload() {
    this.load.image('car', '/phaser-assets/highway_car.png');
    this.load.image('star_word', '/phaser-assets/word_star.png');
    this.load.image('road_bg', '/phaser-assets/road_tile.png');
  }

  create() {
    this.roadBg = this.add.tileSprite(195, 320, 390, 640, 'road_bg');

    this.car = this.physics.add.sprite(LANES_X[1], 550, 'car');
    this.car.setCollideWorldBounds(true);

    this.wordGroup = this.physics.add.group();

    this.setNewTarget();
    this.spawnTimer = this.time.addEvent({ delay: 1400, callback: this.spawnWord, callbackScope: this, loop: true });

    // Swipe input — chuyển lane bằng physics tween thật (velocity-based, không phải CSS left)
    this.input.on('pointerdown', (p) => { this._touchStartX = p.x; });
    this.input.on('pointerup', (p) => {
      const dx = p.x - this._touchStartX;
      if (Math.abs(dx) < 30) return;
      this.changeLane(dx > 0 ? 1 : -1);
    });

    this.physics.add.overlap(this.car, this.wordGroup, this.handleCollect, null, this);

    this.timeLeft = this.duration;
    this.timerEvent = this.time.addEvent({ delay: 1000, callback: this.tickTimer, callbackScope: this, loop: true });
  }

  changeLane(dir) {
    const next = Phaser.Math.Clamp(this.currentLane + dir, 0, 2);
    if (next === this.currentLane) return;
    this.currentLane = next;
    this.tweens.add({ targets: this.car, x: LANES_X[next], duration: 150, ease: 'Cubic.Out' });
  }

  setNewTarget() {
    const item = Phaser.Utils.Array.GetRandom(this.vocabItems);
    this.currentTargetDef = item;
    this.game.events.emit('bridge', 'target_changed', { definition: item.definition });
  }

  spawnWord() {
    const isCorrectWord = Math.random() < 0.4;
    const item = isCorrectWord
      ? this.currentTargetDef
      : Phaser.Utils.Array.GetRandom(this.vocabItems.filter(v => v.word !== this.currentTargetDef.word));
    const lane = Phaser.Math.Between(0, 2);

    const star = this.wordGroup.create(LANES_X[lane], -40, 'star_word');
    star.setVelocityY(180);
    star.isCorrect = item.word === this.currentTargetDef.word;
    star.wordText = item.word;

    const label = this.add.text(star.x, star.y, item.word, { fontSize: '14px', color: '#fff' }).setOrigin(0.5);
    star.label = label;
  }

  handleCollect(car, star) {
    if (star.isCorrect) {
      this.score += 10;
      this.game.events.emit('bridge', 'game_correct', { points: 10, comboCount: this.score / 10 });
      this.setNewTarget();
    } else {
      this.lives -= 1;
      this.game.events.emit('bridge', 'game_wrong', { livesLeft: this.lives });
      if (this.lives <= 0) this.endGame();
    }
    star.label.destroy();
    star.destroy();
  }

  update() {
    this.roadBg.tilePositionY -= 4;
    this.wordGroup.children.iterate((star) => {
      if (!star) return;
      star.label.setPosition(star.x, star.y);
      if (star.y > 700) { star.label.destroy(); star.destroy(); }
    });
  }

  tickTimer() {
    this.timeLeft -= 1;
    if (this.timeLeft <= 0) this.endGame();
  }

  endGame() {
    this.timerEvent.remove();
    this.spawnTimer.remove();
    const stars = this.score >= 150 ? 3 : this.score >= 100 ? 2 : this.score >= 50 ? 1 : 0;
    this.game.events.emit('bridge', 'game_complete', { stars, accuracy: this.score });
  }
}
```

### 4.2 `chunk_catapult` — projectile physics thật (không phải CSS `translate` tính tay)

**Yêu cầu cốt lõi:** dùng `this.physics.add.image(...).setVelocity(vx, vy)` với gravity thật
trong world config, KHÔNG dùng `@keyframes catapultArc` như v3.0.

```javascript
// src/phaser/scenes/ChunkCatapultScene.js — TẠO MỚI (rút gọn, đủ để Antigravity mở rộng đúng hướng)
import Phaser from 'phaser';

export default class ChunkCatapultScene extends Phaser.Scene {
  constructor() { super('ChunkCatapultScene'); }

  init(data) {
    this.pairs = data.pairs; // [{ starter, completion }]
    this.loadedCard = null;
  }

  preload() {
    this.load.image('catapult_base', '/phaser-assets/catapult_base.png');
    this.load.image('projectile', '/phaser-assets/projectile_orb.png');
  }

  create() {
    this.physics.world.gravity.y = 300; // Physics thật, không phải CSS keyframe cố định

    this.leftCards = this.createCardColumn(this.pairs.map(p => p.starter), 60, true);
    this.rightCards = this.createCardColumn(
      Phaser.Utils.Array.Shuffle(this.pairs.map(p => p.completion)), 330, false
    );

    this.catapult = this.add.image(60, 550, 'catapult_base');
  }

  createCardColumn(items, x, isLeft) {
    return items.map((text, i) => {
      const y = 100 + i * 90;
      const card = this.add.text(x, y, text, { fontSize: '14px', backgroundColor: '#1e3a5f', padding: 8 })
        .setOrigin(isLeft ? 0 : 1, 0.5)
        .setInteractive();
      card.on('pointerdown', () => isLeft ? this.loadCard(card, text) : this.fireAt(card, text));
      return card;
    });
  }

  loadCard(card, text) {
    this.loadedCard = { card, text };
    card.setStyle({ backgroundColor: '#f97316' });
  }

  fireAt(targetCard, targetText) {
    if (!this.loadedCard) return;

    const startX = this.catapult.x;
    const startY = this.catapult.y;
    const dx = targetCard.x - startX;
    const dy = targetCard.y - startY;
    const t = 0.6; // thời gian bay (giây), điều chỉnh để cảm giác đẹp
    const vx = dx / t;
    const vy = dy / t - 0.5 * this.physics.world.gravity.y * t;

    const projectile = this.physics.add.image(startX, startY, 'projectile');
    projectile.setVelocity(vx, vy);
    projectile.setGravityY(0); // world gravity đã áp dụng toàn cục

    const isMatch = this.checkMatch(this.loadedCard.text, targetText);

    this.time.delayedCall(t * 1000, () => {
      projectile.destroy();
      if (isMatch) {
        this.loadedCard.card.setStyle({ backgroundColor: '#22c55e' });
        targetCard.setStyle({ backgroundColor: '#22c55e' });
        this.game.events.emit('bridge', 'game_correct', { points: 20, comboCount: 0 });
      } else {
        this.cameras.main.shake(150, 0.005);
        this.game.events.emit('bridge', 'game_wrong', { livesLeft: 2 });
      }
      this.loadedCard = null;
    });
  }

  checkMatch(starterText, completionText) {
    return this.pairs.some(p => p.starter === starterText && p.completion === completionText);
  }
}
```

### 4.3 Boss Combat — Boss Type 1 (Vocab Gauntlet) làm flagship trước

Chỉ chuyển **1 trong 5 boss type** sang Phaser trước (Vocab Gauntlet — đơn giản nhất để làm
mẫu pattern). 4 boss type còn lại vẫn dùng `BossBattleScreen.jsx` React hiện tại cho đến khi
pattern này được duyệt. Cấu trúc: sprite boss với `tween` tấn công thật (không phải CSS
keyframe áp lên `<div>` boss), health bar cập nhật qua `Phaser.GameObjects.Graphics`, nhưng
câu hỏi MCQ vẫn là logic quen thuộc — chỉ đổi lớp trình bày.

```javascript
// src/phaser/scenes/BossCombatScene.js — TẠO MỚI (khung sườn, Antigravity điền chi tiết theo pattern trên)
import Phaser from 'phaser';

export default class BossCombatScene extends Phaser.Scene {
  constructor() { super('BossCombatScene'); }

  init(data) {
    this.questions = data.questions; // 10 câu, mỗi câu qua validateMCQOptions() TRƯỚC KHI truyền vào đây
    this.bossHP = 100;
    this.playerHP = 100;
    this.qIndex = 0;
  }

  preload() {
    this.load.spritesheet('boss_sorcerer', '/phaser-assets/boss_sorcerer.png', { frameWidth: 96, frameHeight: 96 });
  }

  create() {
    this.bossSprite = this.add.sprite(195, 150, 'boss_sorcerer');
    this.anims.create({
      key: 'cast',
      frames: this.anims.generateFrameNumbers('boss_sorcerer', { start: 0, end: 3 }),
      frameRate: 6,
    });

    this.bossHPBar = this.add.graphics();
    this.playerHPBar = this.add.graphics();
    this.drawHPBars();

    this.renderQuestion();
  }

  drawHPBars() {
    this.bossHPBar.clear();
    this.bossHPBar.fillStyle(0xef4444).fillRect(20, 40, (this.bossHP / 100) * 350, 16);
    this.playerHPBar.clear();
    this.playerHPBar.fillStyle(0x22c55e).fillRect(20, 580, (this.playerHP / 100) * 350, 16);
  }

  renderQuestion() {
    if (this.qIndex >= this.questions.length) return this.endBattle();
    const q = this.questions[this.qIndex];
    // Render 4 nút MCQ bằng Phaser Text + setInteractive — KHÔNG dùng React overlay ở đây
    // để tránh xung đột z-index/coordinate giữa DOM và canvas.
    this.optionButtons?.forEach(b => b.destroy());
    this.optionButtons = q.options.map((opt, i) => {
      const btn = this.add.text(30, 300 + i * 60, opt, { fontSize: '16px', backgroundColor: '#374151', padding: 10 })
        .setInteractive();
      btn.on('pointerdown', () => this.handleAnswer(opt === q.correctAnswer));
      return btn;
    });
  }

  handleAnswer(isCorrect) {
    if (isCorrect) {
      this.bossSprite.anims.play('cast');
      this.bossHP = Math.max(0, this.bossHP - 10);
      this.game.events.emit('bridge', 'game_correct', { points: 10, comboCount: 0 });
    } else {
      this.playerHP = Math.max(0, this.playerHP - 15);
      this.cameras.main.shake(150, 0.008);
      this.game.events.emit('bridge', 'game_wrong', { livesLeft: this.playerHP });
    }
    this.drawHPBars();
    this.qIndex += 1;

    if (this.bossHP <= 0 || this.playerHP <= 0) return this.endBattle();
    this.renderQuestion();
  }

  endBattle() {
    const victory = this.bossHP <= 0;
    this.game.events.emit('bridge', 'game_complete', { stars: victory ? 3 : 0, accuracy: this.bossHP });
  }
}
```

---

## PHẦN 5 — DEPENDENCIES & SETUP

```bash
npm install phaser --save
```

```
public/phaser-assets/         [TẠO MỚI — toàn bộ asset Phaser, KHÔNG lẫn với /src]
  ├── lexio_spritesheet.png
  ├── door_closed.png / door_open.png / door_locked.png
  ├── storm_tower_tileset.png / storm_tower_map.json
  ├── highway_car.png / word_star.png / road_tile.png
  ├── catapult_base.png / projectile_orb.png
  └── boss_sorcerer.png

src/phaser/                   [TẠO MỚI — toàn bộ code Phaser tách biệt khỏi React components]
  ├── PhaserGameCanvas.jsx
  └── scenes/
        ├── HubScene.js
        ├── HighwayRunnerScene.js
        ├── ChunkCatapultScene.js
        └── BossCombatScene.js

src/utils/
  ├── quizValidation.js       [TẠO MỚI — Phần 1.1]
  └── textSanitize.js         [TẠO MỚI — Phần 1.2]

src/data/chronicles/hubLayouts/
  └── chapter3_layout.json    [TẠO MỚI — 1 file / Chapter, không phải / tuần]
```

---

## PHẦN 6 — DANH SÁCH "KHÔNG ĐƯỢC LÀM" (Anti-pattern List)

```
✗ KHÔNG dùng CSS @keyframes để giả lập chuyển động vật lý (bay, rơi, va chạm) ở 4 mục
  trong phạm vi (Hub, Highway Runner, Chunk Catapult, Boss Type 1).
✗ KHÔNG render bất kỳ icon/control nào (joystick, slider, nút) mà không có onPointerDown/
  onClick handler thật gắn kèm.
✗ KHÔNG tự ý mở rộng Phaser sang 12 game "ngoài phạm vi" mà không hỏi trước.
✗ KHÔNG để Phaser Scene tự gọi fetch/API hay đọc trực tiếp Zustand store — mọi dữ liệu
  vào qua `sceneData`, mọi kết quả ra qua event `bridge`.
✗ KHÔNG tạo route/file trùng tên khác iOS/Android case-sensitivity (vd `HubScene.js` vs
  `hubscene.js`) — Linux CI sẽ fail build.
✗ KHÔNG dùng emoji Unicode làm nhân vật chính trong Phaser scene (dùng spritesheet PNG thật
  từ Kenney.nl hoặc asset tương đương) — emoji không animate mượt trong canvas.
✗ KHÔNG thay đổi cấu trúc `useChroniclesStore.js`, `getBossAccessTier`, `MAX_PP_PER_WEEK`
  hay bất kỳ logic kinh tế nào — chỉ thay lớp rendering.
```

---

## PHẦN 7 — THỨ TỰ THỰC THI BẮT BUỘC (không nhảy bước)

```
[ ] Bước 1: Giai đoạn 0 — sửa 3 bug dữ liệu (Phần 1). Chạy `npm run build`, xác nhận
    exit code 0, chụp lại 3 màn hình lỗi cũ để xác nhận đã hết lỗi.
[ ] Bước 2: `npm install phaser`. Tạo `PhaserGameCanvas.jsx` (Phần 2.1). Test bằng 1 Scene
    rỗng (chỉ vẽ hình chữ nhật màu) để xác nhận canvas mount đúng trong React, không vỡ layout
    mobile 375-430px.
[ ] Bước 3: Xin/tải asset từ Kenney.nl theo danh sách Phần 3.2 và 4.x, copy vào
    `/public/phaser-assets/`. KHÔNG code tiếp nếu chưa có asset — placeholder màu đơn sắc
    tạm được nhưng phải đúng kích thước khai báo.
[ ] Bước 4: Implement `HubScene.js` theo skeleton Phần 3.4. Test: player đi bộ được bằng
    tap-to-move, va chạm cửa unlock được, cửa locked chặn overlap đúng.
[ ] Bước 5: Nối `HubScene` vào `ChroniclesWorldMap.jsx` theo Phần 3.5. Test trên thiết bị/
    Chrome DevTools mobile emulation ở 375px và 430px viewport.
[ ] Bước 6: Implement `HighwayRunnerScene.js` (Phần 4.1). Test: đổi lane bằng swipe, va chạm
    từ đúng/sai, timer chạy đúng, `game_complete` phát đúng payload.
[ ] Bước 7: Implement `ChunkCatapultScene.js` (Phần 4.2). Test: quỹ đạo bay cong tự nhiên
    (parabol thật do gravity, không phải easing giả), match/no-match logic đúng.
[ ] Bước 8: Implement `BossCombatScene.js` cho Boss Type 1 (Phần 4.3). Test đủ 10 câu, HP
    bar cập nhật đúng, thắng/thua trigger đúng event.
[ ] Bước 9: Chạy checklist Phần 6 lại lần cuối — tự rà từng dòng, xác nhận không vi phạm.
[ ] Bước 10: `npm run build` exit code 0. Present cho người review kèm ảnh chụp thật của
    Hub World + 2 game flagship đang chạy trên mobile viewport.
```

---

## PHẦN 8 — TIÊU CHÍ NGHIỆM THU (Definition of Done)

```
□ Hub World: nhân vật đi bộ bằng animation thật (không phải emoji tĩnh dịch chuyển vị trí)
□ Hub World: camera follow player mượt, không giật khung hình
□ Hub World: cửa khoá/mở đổi sprite đúng trạng thái, không unlock nhầm
□ Highway Runner: velocity-based lane change (kiểm tra bằng DevTools Performance — phải
  thấy Arcade Physics body update, không phải CSS transition)
□ Chunk Catapult: quỹ đạo đạn là parabol tính từ gravity thật, verify bằng cách đổi
  physics.world.gravity.y và quan sát quỹ đạo thay đổi tương ứng
□ Boss Type 1: MCQ options đã qua validateMCQOptions(), không còn trùng/rỗng
□ Không còn joystick hay control trang trí không chức năng ở bất kỳ đâu trong 4 hạng mục
  thuộc phạm vi
□ 12 game ngoài phạm vi: diff `git diff` xác nhận KHÔNG có thay đổi nào ngoài 2 file
  quizValidation.js / textSanitize.js được import vào
□ FPS ổn định (không cần đo chính xác, nhưng không được cảm giác giật khi test tay trên
  thiết bị Android tầm trung qua Chrome)
```
