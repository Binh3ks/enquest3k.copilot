# Implementation Plan v4.1 — Chronicles Phaser 3 Upgrade (Revised)

**Revision notes:** Bản v4.0 có **2 mâu thuẫn nội bộ** và **6 lỗ hổng** được phát hiện qua review. Bản v4.1 này giải quyết dứt điểm tất cả. Mọi quyết định đã được chốt — không còn "Open Question" nào.

**Spec gốc:** [CHRONICLES_UPGRADE_SPEC_v4.md](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/CHRONICLES_UPGRADE_SPEC_v4.md)

---

## Chốt cứng — 8 quyết định đã được giải quyết (đọc TRƯỚC khi code)

### ✅ QĐ-1: Lazy-load Phaser bắt buộc (giải quyết mâu thuẫn tree-shaking)

Phaser 3 là monolithic (~1.2MB gzipped), **KHÔNG tree-shake tốt**. Thiết bị mục tiêu là Android 4G tầm trung.

**Quyết định dứt khoát:** Phaser **KHÔNG ĐƯỢC** nằm trong main bundle. Bắt buộc dùng `React.lazy()` + `import()` động:

```javascript
// src/modules/chronicles/ChroniclesScreen.jsx — lazy load toàn bộ chronicles route
const ChroniclesWorldMap = React.lazy(() => import('./ChroniclesWorldMap'));
const DailyRoomScreen = React.lazy(() => import('./DailyRoomScreen'));
```

```javascript
// src/phaser/PhaserGameCanvas.jsx — lazy load Phaser library chính nó
let Phaser = null;
async function loadPhaser() {
  if (!Phaser) {
    const mod = await import('phaser');
    Phaser = mod.default || mod;
  }
  return Phaser;
}
```

Vite sẽ tách Phaser thành chunk riêng, chỉ tải khi người dùng vào route `/chronicles`. Đây là **yêu cầu bắt buộc**, không phải "cân nhắc sau".

---

### ✅ QĐ-2: Tilemap bằng code thuần, KHÔNG dùng Tiled JSON (giải quyết mâu thuẫn tilemap)

**Quyết định dứt khoát:** Giai đoạn này dùng **sprite-grid code tay** (phương án B). Toàn bộ skeleton HubScene đã được viết lại cho khớp — không gọi `this.make.tilemap()`, không cần file `.json` từ Tiled.

Collision dùng **static physics group** (từng sprite tường riêng lẻ), KHÔNG dùng `setCollisionByProperty()` (đó là API của tilemap layer, không tồn tại khi code tay).

```javascript
// ĐÚNG — code tay, không cần Tiled
create() {
  // Ground: tiled background image lặp
  this.add.tileSprite(0, 0, bounds.width, bounds.height, 'floor_tile').setOrigin(0);
  
  // Walls: static physics group từ array vị trí
  this.walls = this.physics.add.staticGroup();
  WALL_POSITIONS.forEach(({ x, y, w, h }) => {
    const wall = this.walls.create(x, y, 'wall_tile');
    wall.setDisplaySize(w, h).refreshBody();
  });
  
  // Player va chạm với wall group
  this.physics.add.collider(this.player, this.walls);
}
```

```javascript
// SAI — KHÔNG viết dòng nào dưới đây trong giai đoạn này
// const map = this.make.tilemap({ key: '...' });           ← CẤM
// wallLayer.setCollisionByProperty({ collides: true });    ← CẤM
```

---

### ✅ QĐ-3: Ép `Phaser.CANVAS`, KHÔNG dùng `Phaser.AUTO` (giải quyết rủi ro WebGL)

Trên Android tầm trung, trình duyệt giới hạn 8–16 WebGL context đồng thời. Trẻ em di chuyển nhanh giữa Hub ↔ game ↔ Hub, và `useEffect` cleanup có thể không kịp destroy context cũ (đặc biệt với React 18 StrictMode double-invoke).

**Quyết định dứt khoát:**

```javascript
// PhaserGameCanvas.jsx
const config = {
  type: Phaser.CANVAS,  // BẮT BUỘC — không dùng Phaser.AUTO hay Phaser.WEBGL
  // ...
};
```

**Bổ sung bắt buộc trong cleanup:**

```javascript
useEffect(() => {
  // ... mount logic ...
  
  return () => {
    if (gameRef.current) {
      gameRef.current.destroy(true, false); // removeCanvas = true
      gameRef.current = null;
    }
    // Safety: force remove any orphaned canvas
    if (containerRef.current) {
      const orphans = containerRef.current.querySelectorAll('canvas');
      orphans.forEach(c => c.remove());
    }
  };
}, [sceneClass]);
```

**Bổ sung bước verify (Bước 5.5):** Sau khi nối Hub vào WorldMap, navigate nhanh Hub → Room → Hub → Room 10 lần liên tiếp trên Chrome DevTools, rồi chạy:

```javascript
console.log('Canvas count:', document.querySelectorAll('canvas').length);
// Expected: luôn = 1 (hoặc 0 nếu đang ở trang không có Phaser)
// Nếu > 1 → memory/context leak, PHẢI sửa trước khi tiếp tục
```

---

### ✅ QĐ-4: Test trên thiết bị Android thật, không chỉ DevTools emulation

DevTools Device Toolbar chỉ giả lập viewport, không giả lập GPU/CPU yếu.

**Yêu cầu bắt buộc cho Bước 10:**
1. Bật **CPU 6x slowdown** trong tab Performance của DevTools khi test trên desktop
2. Nếu có thiết bị Android thật: remote-debug qua `chrome://inspect` → test Hub World + 1 game flagship
3. Chạy performance profile 30 giây gameplay → FPS phải ổn ≥ 24fps (có thể dưới 60 trên máy yếu, nhưng không được drop dưới 24 gây giật visible)

---

### ✅ QĐ-5: `fallbackPool` phải scope theo tuần + độ khó (giải quyết rủi ro sư phạm)

```javascript
// ĐÚNG — scope theo tuần
export function validateMCQOptions(options, correctAnswer, fallbackPool = []) {
  // fallbackPool PHẢI là vocab pool của ĐÚNG TUẦN HIỆN TẠI + ĐÚNG CẤP ĐỘ CEFR
  // Caller chịu trách nhiệm truyền đúng pool, KHÔNG dùng danh sách generic toàn hệ thống
  // ...
}

// Ví dụ gọi đúng:
const weekVocab = extractQuestVocab(weekData, dayIndex).vocabItems;
const pool = weekVocab.map(v => v.definition); // chỉ lấy definitions từ tuần hiện tại
const validated = validateMCQOptions(rawOptions, correct, pool);
```

**Ràng buộc trong JSDoc:**

```javascript
/**
 * @param {string[]} fallbackPool - PHẢI là pool từ vựng của tuần hiện tại (cùng week, cùng CEFR level).
 *   CẤM truyền danh sách generic toàn hệ thống — sẽ tạo distractor sai cấp độ sư phạm.
 */
```

---

### ✅ QĐ-6: Chunk Catapult data là task NỘI DUNG, không phải task code thuần

`grammarSentences` được thiết kế cho sắp xếp tuần tự (spell_train), còn Catapult cần **cặp ghép đôi cố định** (starter ↔ completion). Đây **KHÔNG thể tự động map** — cần nội dung biên soạn riêng.

**Giải pháp tạm thời (cho phép code tiếp mà không block):**

```javascript
// extractQuestVocab.js — thêm hàm mới
export function extractCatapultPairs(weekData, dayIndex) {
  // Tạm thời: dùng vocab items (word ↔ definition) làm pairs
  // TODO [CONTENT]: Đội curriculum cần viết sentence-pair data riêng
  // cho Chunk Catapult (starter chunk ↔ completion chunk)
  const vocab = extractQuestVocab(weekData, dayIndex).vocabItems;
  return vocab.slice(0, 6).map(v => ({
    starter: v.word,
    completion: v.definition_vi || v.definition,
  }));
}
```

**Ghi chú bắt buộc trong code:** Comment `// TODO [CONTENT]` để đội curriculum biết cần bổ sung dữ liệu chuyên biệt.

---

### ✅ QĐ-7: Danh sách file MCQ chính xác, không dùng magic number

Thay vì `grep | wc -l >= 15`, liệt kê chính xác các game component dùng MCQ cần import `validateMCQOptions`:

**Các file CÓ cơ chế MCQ (cần import):**
1. `MCQBlitzPopup.jsx` (popup dùng chung)
2. `ArcaneBubbleGame.jsx` (bubble pop + MCQ)
3. `MeteorSmasherGame.jsx` (shoot + MCQ)
4. `HighwayRunnerGame.jsx` (collect + MCQ)
5. `EchoArenaShooter.jsx` (shoot + MCQ)
6. `StormShieldDefense.jsx` (defense + MCQ)
7. `GrandMasterMatrixGame.jsx` (matrix MCQ)
8. `RiddleDetectiveGame.jsx` (riddle MCQ)
9. `BossBattleScreen.jsx` (boss combat MCQ)

**Các file KHÔNG dùng MCQ (KHÔNG cần import):**
- `SpellTrainGame.jsx` (drag-drop sắp xếp)
- `AncientScrollFillGame.jsx` (fill-in-blank)
- `CambridgeClozeGame.jsx` (cloze fill-in)
- `CrystalMemoryMatchGame.jsx` (flip-match)
- `RuneForgeGame.jsx` (type-in)
- `TitanForgeGame.jsx` (grammar type-in)
- `SyntaxExpressGame.jsx` (tap-select, không phải MCQ chuẩn)

**Verify đúng:**
```bash
grep -rl "validateMCQOptions" src/ --include="*.jsx" --include="*.js" | wc -l
# Expected: 9-10 files (9 game + 1 utility)
```

---

### ✅ QĐ-8: Feature flag rollback + dead code cleanup

**a) Feature flag bắt buộc:**

```javascript
// src/config/featureFlags.js — TẠO MỚI
export const FEATURES = {
  PHASER_HUB_WORLD: localStorage.getItem('ff_phaser_hub') === 'true',
  // Mặc định: false (grid button cũ). Chỉ bật khi đã test kỹ.
  // Bật cho tester: localStorage.setItem('ff_phaser_hub', 'true')
};
```

```javascript
// ChroniclesWorldMap.jsx — điểm nối
import { FEATURES } from '../../config/featureFlags';

{activeTab === 'map' && (
  FEATURES.PHASER_HUB_WORLD
    ? <PhaserGameCanvas sceneClass={HubScene} ... />
    : <OldGridButtonMap ... />  // Component cũ, giữ nguyên cho đến khi Phaser ổn định
)}
```

**Quy trình rollout:**
1. Merge code với `PHASER_HUB_WORLD = false` (an toàn, không ảnh hưởng production)
2. Bật cho owner/tester qua localStorage
3. Sau 1 tuần test không lỗi → đổi default thành `true`
4. Sau 1 tháng ổn định → xoá flag + xoá code cũ

**b) Dead code cleanup:**

Sau khi feature flag chuyển sang `true` ổn định:
- **XOÁ:** `HighwaySprintCanvas.jsx`, `HighwaySprint.jsx`, `HighwaySprint.css` (thay bằng `HighwayRunnerScene.js`)
- **XOÁ:** `CatapultCommander.jsx`, `CatapultCommander.css` (thay bằng `ChunkCatapultScene.js`)
- **GIỮ:** `RoomNode`, `BossChamberNode` functions trong `ChroniclesWorldMap.jsx` (fallback cho flag = false)
- **GIỮ:** `BossBattleScreen.jsx` (vẫn dùng cho Boss Type 2-5)

**Timing:** Dead code cleanup là bước cuối cùng (sau rollout ổn định), KHÔNG xoá ngay khi merge.

---

## Proposed Changes (đã sửa lại toàn bộ)

### Phase 0 — Sửa 3 Bug Dữ Liệu

#### [NEW] `src/utils/quizValidation.js`
- `validateMCQOptions(options, correctAnswer, fallbackPool)` — fallbackPool **bắt buộc scope theo tuần**
- `shuffleArray(arr)` — Fisher-Yates shuffle

#### [NEW] `src/utils/textSanitize.js`
- `sanitizeChunkText(raw)` — strip punctuation from chunk labels

#### [NEW] `src/config/featureFlags.js`
- `FEATURES.PHASER_HUB_WORLD` — default `false`, bật qua localStorage

#### [MODIFY] 9 file MCQ (danh sách QĐ-7) — import `validateMCQOptions`
#### [MODIFY] `extractQuestVocab.js` — apply `sanitizeChunkText` tại data layer
#### [MODIFY] `SyntaxExpressRail.jsx` — xoá joystick icon trang trí

---

### Phase 1 — Phaser Infrastructure

#### `npm install phaser --save`

#### [NEW] `src/phaser/PhaserGameCanvas.jsx`
- **Renderer:** `Phaser.CANVAS` (bắt buộc, không AUTO/WEBGL)
- **Lazy-load:** `import('phaser')` động, không static import
- **Cleanup:** `game.destroy(true, false)` + orphan canvas removal
- **Scale:** `Phaser.Scale.FIT` + `CENTER_BOTH`

#### [NEW] `public/phaser-assets/` — placeholder rectangles đúng kích thước, TODO cho asset thật

---

### Phase 2 — Hub World

#### [NEW] `src/phaser/scenes/HubScene.js`
- **Tilemap:** Sprite-grid code tay (`add.tileSprite` + `physics.add.staticGroup` cho walls)
- **KHÔNG** dùng `make.tilemap()` / `setCollisionByProperty()`
- **Player:** `physics.add.sprite` + walk/idle animations
- **Input:** Tap-to-move (KHÔNG joystick)
- **Camera:** `startFollow(player, true, 0.1, 0.1)`
- **Doors:** Static sprites, overlap → emit `bridge:door_enter`

#### [NEW] `src/data/chronicles/hubLayouts/chapter3_layout.json`
- Wall positions array (thay cho tilemap JSON)
- Door positions + spawn point

#### [MODIFY] `ChroniclesWorldMap.jsx`
- Feature flag gate: `PHASER_HUB_WORLD ? <PhaserGameCanvas /> : <OldGridButtonMap />`
- Giữ nguyên 100%: Header, PP bar, Tabs, Shop, Fragments, Hall of Fame

---

### Phase 3 — Highway Runner (Phaser Arcade Physics)

#### [NEW] `src/phaser/scenes/HighwayRunnerScene.js`
- 3-lane road, velocity-based lane change
- Word stars spawned via physics group
- Swipe input → tween to lane position
- Target definition hiển thị qua React overlay (event `target_changed`)

#### [MODIFY] `DailyRoomScreen.jsx` — case `highway_runner` → `<PhaserGameCanvas />`

---

### Phase 4 — Chunk Catapult (Gravity Physics)

#### [NEW] `src/phaser/scenes/ChunkCatapultScene.js`
- `physics.world.gravity.y = 300` — parabol thật
- Projectile bay bằng `setVelocity(vx, vy)` tính từ kinematic
- Verify: đổi gravity → quỹ đạo thay đổi tương ứng

#### [NEW] `extractCatapultPairs()` trong `extractQuestVocab.js`
- Tạm dùng word ↔ definition
- Ghi rõ `// TODO [CONTENT]` cho đội curriculum

#### [MODIFY] `DailyRoomScreen.jsx` — case `chunk_catapult` → `<PhaserGameCanvas />`

---

### Phase 5 — Boss Combat Type 1

#### [NEW] `src/phaser/scenes/BossCombatScene.js`
- Chỉ Boss Type 1 (Ancient Sorcerer). Type 2-5 giữ `BossBattleScreen.jsx`
- MCQ options qua `validateMCQOptions()` trước khi truyền vào scene
- HP bars bằng `Phaser.GameObjects.Graphics`
- MCQ buttons bằng Phaser Text (KHÔNG React overlay trong canvas)

#### [MODIFY] `BossBattleScreen.jsx`
- `if (getBossType(weekNumber) === 1)` → `<PhaserGameCanvas scene={BossCombatScene} />`
- Else → giữ nguyên React component

---

## Thứ tự thực thi bắt buộc (10 bước + 1 bước verify WebGL)

| Bước | Mô tả | Verify |
|------|-------|--------|
| 1 | Phase 0: `quizValidation.js` (scoped pool), `textSanitize.js`, xoá joystick, tạo `featureFlags.js` | `npm run build` pass |
| 2 | `npm install phaser`. Tạo `PhaserGameCanvas.jsx` (lazy-load, CANVAS mode, cleanup). Test scene rỗng | Canvas mount đúng, `document.querySelectorAll('canvas').length === 1` |
| 3 | Tạo placeholder assets trong `/public/phaser-assets/` | Files tồn tại, kích thước đúng |
| 4 | Implement `HubScene.js` (sprite-grid, KHÔNG tilemap) | Player walk, wall collision, door overlap |
| 5 | Nối `HubScene` vào `ChroniclesWorldMap.jsx` (sau feature flag) | Test 375px + 430px viewport |
| **5.5** | **WebGL/context leak test: navigate Hub↔Room 10 lần nhanh** | **`canvas` count luôn ≤ 1, không crash** |
| 6 | Implement `HighwayRunnerScene.js` | Swipe đổi lane, overlap đúng, timer đúng |
| 7 | Implement `ChunkCatapultScene.js` | Parabol thật (đổi gravity → quỹ đạo đổi) |
| 8 | Implement `BossCombatScene.js` Type 1 | 10 câu, HP bar đúng, MCQ validated |
| 9 | Anti-pattern checklist (Phần 6 spec) | Tự xác nhận từng dòng |
| 10 | `npm run build` + **CPU 6x throttle test** + screenshot 4 màn hình | FPS ≥ 24 under throttle, build pass |

---

## Verification Plan

### Build & Static Analysis
```bash
npm run build                    # PHẢI exit code 0
# Kiểm tra Phaser nằm trong chunk riêng, KHÔNG trong main bundle:
ls -la dist/assets/*.js | sort -k5 -n
# Chunk chứa "phaser" phải tách biệt khỏi index-*.js
```

### MCQ Validation Coverage
```bash
# Đúng 9-10 files (QĐ-7):
grep -rl "validateMCQOptions" src/ --include="*.jsx" --include="*.js" | sort
# Expected list:
#   src/utils/quizValidation.js
#   src/modules/quest/MCQBlitzPopup.jsx
#   src/modules/chronicles/games/ArcaneBubbleGame.jsx
#   src/modules/chronicles/games/MeteorSmasherGame.jsx
#   src/modules/chronicles/games/HighwayRunnerGame.jsx
#   src/modules/chronicles/games/GrandMasterMatrixGame.jsx
#   src/modules/chronicles/games/RiddleDetectiveGame.jsx
#   src/modules/quest/EchoArenaShooter.jsx
#   src/modules/chronicles/BossBattleScreen.jsx
```

### Context Leak Test (Bước 5.5)
```javascript
// Chạy trong Console sau 10 lần navigate nhanh Hub↔Room:
console.log('Canvas count:', document.querySelectorAll('canvas').length);
// PHẢI = 0 hoặc 1. Nếu > 1 → STOP, sửa cleanup trước khi tiếp.
```

### Performance Test (Bước 10)
1. Chrome DevTools → Performance tab → CPU: **6x slowdown**
2. Record 30 giây gameplay Hub World + 1 game
3. FPS phải ≥ 24fps (không cần 60, nhưng không được drop dưới 24)
4. Nếu có thiết bị Android thật: `chrome://inspect` remote debug

### Feature Flag Rollout
```
Week 1: ff_phaser_hub = false (production safe)
         ff_phaser_hub = true  (owner/tester only, via localStorage)
Week 2: Nếu không lỗi → default = true
Month 2: Xoá flag + xoá dead code (HighwaySprint, CatapultCommander)
```
