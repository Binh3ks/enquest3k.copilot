# Implementation Plan — Chronicles Engine Upgrade v4.0 (Phaser 3)

**Goal:** Nâng cấp hệ thống Lexio Chronicles từ CSS/DOM mini-games lên ~50% cảm giác game thật bằng Phaser 3 Arcade Physics, theo đúng spec [CHRONICLES_UPGRADE_SPEC_v4.md](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/CHRONICLES_UPGRADE_SPEC_v4.md).

**Tóm tắt phạm vi:**
- **TRONG phạm vi (Phaser 3):** Hub World Map, Highway Runner, Chunk Catapult, Boss Type 1
- **NGOÀI phạm vi (giữ nguyên React/CSS):** 12 game còn lại — KHÔNG đụng vào ngoại trừ import `quizValidation.js`
- **Ưu tiên tuyệt đối:** Sửa 3 bug dữ liệu trước khi bắt tay vào Phaser

> [!CAUTION]
> ## Bài học từ v3.0 — Anti-pattern tuyệt đối
> - **KHÔNG** dùng CSS `@keyframes` / `transform` để giả lập chuyển động vật lý ở 4 mục trong phạm vi
> - **KHÔNG** render control trang trí (joystick, slider) mà không có handler thật
> - **KHÔNG** để Phaser Scene tự gọi API/Zustand — mọi giao tiếp qua `EventEmitter` bridge
> - **KHÔNG** tự ý mở rộng Phaser sang 12 game ngoài phạm vi

---

## Proposed Changes

### Phase 0 — Sửa 3 Bug Dữ Liệu (Bắt buộc làm trước, không nhảy bước)

#### [NEW] [`src/utils/quizValidation.js`](file:///Users/binhnguyen/projects/Engquest3k/src/utils/quizValidation.js)

Utility function `validateMCQOptions(options, correctAnswer, fallbackPool)` — validate đáp án MCQ trước khi render. Đảm bảo:
- Tối thiểu 3 options unique, không rỗng
- `correctAnswer` luôn nằm trong danh sách
- Dev mode: `console.error` khi phát hiện bad data
- Prod mode: fallback sang pool generic thay vì hiển thị đáp án trùng/rỗng

**Logic chính (từ spec Phần 1.1):**
```javascript
export function validateMCQOptions(options, correctAnswer, fallbackPool = []) {
  const cleaned = options.map(o => (o || '').trim()).filter(o => o.length > 0);
  const unique = [...new Set(cleaned)];
  if (unique.length < 3 || !unique.includes(correctAnswer)) {
    // Fallback: pull generic distractors
    const pool = fallbackPool.filter(w => w !== correctAnswer);
    return shuffleArray([correctAnswer, ...shuffleArray(pool).slice(0, 3)]);
  }
  return shuffleArray(unique);
}
```

**Tích hợp:** Import vào `MCQBlitzPopup.jsx` và tất cả component MCQ hiện có (cả 12 game cũ) tại điểm render options. Đây là sửa lỗi dữ liệu, không phải nâng cấp ngoài phạm vi.

---

#### [NEW] [`src/utils/textSanitize.js`](file:///Users/binhnguyen/projects/Engquest3k/src/utils/textSanitize.js)

```javascript
export function sanitizeChunkText(raw) {
  return (raw || '').trim()
    .replace(/^[.,;:!?]+/, '')
    .replace(/[.,;:]+$/, '');
}
```

Áp dụng tại `extractQuestVocab.js` (data layer) khi sinh `grammarSentences` chunks — sửa tận gốc, không chỉ sửa ở UI.

---

#### [MODIFY] Game `spell_train_express` (Syntax Express) trong [`src/modules/quest/SyntaxExpressRail.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/SyntaxExpressRail.jsx)

Xoá icon joystick trang trí (skeuomorphic dead control). Chỉ giữ lại các nút STRIKE/TAP có handler thật.

---

### Phase 1 — Phaser 3 Infrastructure

#### [NEW] `npm install phaser --save`

Phaser 3 (~1.2MB gzipped) sẽ được tree-shaken bởi Vite. Không cần thêm build plugin.

---

#### [NEW] `public/phaser-assets/` (Thư mục asset mới)

Toàn bộ asset cho Phaser tách biệt khỏi `/src`:

```
public/phaser-assets/
  ├── lexio_spritesheet.png      (48×48 per frame, 4-frame walk + idle + celebrate)
  ├── door_closed.png / door_open.png / door_locked.png
  ├── boss_door.png
  ├── storm_tower_tileset.png    (tileset từ Kenney.nl hoặc tương đương)
  ├── storm_tower_map.json       (Tiled export hoặc dựng tay)
  ├── highway_car.png / word_star.png / road_tile.png
  ├── catapult_base.png / projectile_orb.png
  └── boss_sorcerer.png          (96×96 spritesheet, 4-frame cast animation)
```

**Nguồn asset:** [kenney.nl](https://kenney.nl) — CC0, có sẵn "Tiny Dungeon", "RPG Urban Pack", "Toon Characters". Nếu chưa tải được, dùng placeholder hình chữ nhật đúng kích thước để code tiếp, nhưng PHẢI ghi TODO rõ ràng.

---

#### [NEW] [`src/phaser/PhaserGameCanvas.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/phaser/PhaserGameCanvas.jsx) — React ↔ Phaser Bridge

Wrapper component dùng chung cho mọi Phaser canvas trong app. Kiến trúc:

```
React (data owner)  ──sceneData──>  Phaser Scene (render/input/physics)
                    <──bridge events──
```

- `sceneClass`: Phaser.Scene subclass
- `sceneData`: vocab items, config, callbacks — truyền vào `scene.init(data)`
- `onEvent(eventName, payload)`: nhận events từ scene qua `game.events.emit('bridge', ...)`

**Quy ước event bắt buộc (tất cả Scene phải emit):**

| Event | Trigger | Payload |
|-------|---------|---------|
| `door_enter` | Player va chạm cửa phòng | `{ dayIndex: number }` |
| `boss_enter` | Player va chạm cửa Boss | `{}` |
| `game_correct` | Trả lời/thu thập đúng | `{ points, comboCount }` |
| `game_wrong` | Trả lời/va chạm sai | `{ livesLeft }` |
| `game_complete` | Game kết thúc | `{ stars: 0-3, accuracy }` |
| `target_changed` | (Highway) Đổi từ mục tiêu | `{ definition: string }` |

**Lifecycle:** `useEffect` mount → `new Phaser.Game(config)` → scene.restart(sceneData). Cleanup: `game.destroy(true)` on unmount.

**Scale:** `Phaser.Scale.FIT` + `CENTER_BOTH` — auto-fit mobile viewport 375–430px.

---

### Phase 2 — Hub World (Thay thế grid button bằng canvas game thật)

#### [NEW] [`src/data/chronicles/hubLayouts/index.js`](file:///Users/binhnguyen/projects/Engquest3k/src/data/chronicles/hubLayouts/index.js)

```javascript
export function getHubLayoutForChapter(chapterId) {
  // Chapter 3 (Storm Tower) — placeholder, mở rộng cho các chapter khác sau
  return require(`./chapter${chapterId}_layout.json`);
}
```

#### [NEW] `src/data/chronicles/hubLayouts/chapter3_layout.json`

Layout config cho Chapter 3 (Storm Tower). Bố cục hình tháp leo dần (day 0 dưới, day 4 trên, boss trên cùng).

Schema: `{ chapterId, tilemapKey, spawnPoint, worldBounds, doors: [{ dayIndex, x, y, spriteKey, triggerRadius }], bossDoor }`

---

#### [NEW] [`src/phaser/scenes/HubScene.js`](file:///Users/binhnguyen/projects/Engquest3k/src/phaser/scenes/HubScene.js)

**Scene chính của Hub World.** Implement theo skeleton trong spec Phần 3.4:

1. **Tilemap:** Load JSON tilemap, tạo Ground + Walls layer, set collision by property
2. **Player (Lexio 🦊):** `physics.add.sprite` với spritesheet animation `idle` + `walk`, `setCollideWorldBounds(true)`
3. **Doors:** Static sprite group, trạng thái `locked/closed/open` dựa trên `unlockedDays` / `completedDays` từ React store
4. **Input:** **Tap-to-move** (KHÔNG joystick) — `pointerdown` → set `moveTarget` → `update()` tính velocity hướng về target, `setFlipX` theo hướng đi
5. **Camera:** `setBounds` theo worldBounds, `startFollow(player, true, 0.1, 0.1)` — lerp mượt
6. **Overlap detection:** Player + Door → emit `bridge:door_enter` (debounced), Player + BossDoor → emit `bridge:boss_enter`

**Tốc độ di chuyển:** 160px/s. Threshold dừng: 4px.

---

#### [MODIFY] [`src/modules/chronicles/ChroniclesWorldMap.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/ChroniclesWorldMap.jsx)

**Thay đổi duy nhất:** Thay block `cwm-rooms-grid` (line 221–248) + `cwm-boss-section` (line 251–261) bằng `<PhaserHubCanvas />`.

**GIỮ NGUYÊN 100%:** Header, PP bar, Stars summary, Tab bar, Mascot Shop panel, Fragment panel, Hall of Fame modal, Footer.

```diff
- <div className="cwm-rooms-grid" ...>...</div>
- <div className="cwm-boss-section">...</div>
+ <PhaserGameCanvas
+   sceneClass={HubScene}
+   sceneData={{
+     weekNumber,
+     layoutConfig: getHubLayoutForChapter(chapter.id),
+     unlockedDays: [...computed from store...],
+     completedDays: [...computed from store...],
+   }}
+   onEvent={(eventName, payload) => {
+     if (eventName === 'door_enter') onEnterRoom(payload.dayIndex);
+     if (eventName === 'boss_enter') onEnterBoss(bossTier);
+   }}
+ />
```

---

### Phase 3 — Highway Word Runner (Phaser Arcade Physics)

#### [NEW] [`src/phaser/scenes/HighwayRunnerScene.js`](file:///Users/binhnguyen/projects/Engquest3k/src/phaser/scenes/HighwayRunnerScene.js)

**Khác biệt bắt buộc vs v3.0:** velocity-based lane change thật, KHÔNG dùng CSS `left` transition.

1. **Road:** `tileSprite` cuộn liên tục (`tilePositionY -= 4` mỗi frame) tạo ảo giác đường chạy
2. **Car (Player):** `physics.add.sprite` tại lane giữa, `setCollideWorldBounds(true)`
3. **3 Lanes:** `LANES_X = [100, 195, 290]` trong world 390px
4. **Lane change:** Swipe input → `tweens.add({ targets: car, x: LANES_X[next], duration: 150, ease: 'Cubic.Out' })` — vật lý thật, không CSS
5. **Word spawner:** Timer 1400ms, tạo `physics.add.image` tại lane random với `setVelocityY(180)`, gắn label text
6. **Overlap detection:** Car + word star → `handleCollect()` → emit `game_correct` hoặc `game_wrong`
7. **Target definition:** Hiển thị bằng React overlay bên ngoài canvas (qua event `target_changed`), KHÔNG render text dài trong canvas
8. **Game over:** Timer 60s hoặc lives = 0 → emit `game_complete` với stars tính theo score

---

#### [MODIFY] [`src/modules/chronicles/DailyRoomScreen.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/DailyRoomScreen.jsx#L275-L276)

Thêm case `highway_runner` trong `renderActiveGame()`:

```diff
  case 'highway_runner':
-   return <HighwaySprint vocabItems={vocabItems} ... />;
+   return (
+     <PhaserGameCanvas
+       sceneClass={HighwayRunnerScene}
+       sceneData={{ vocabItems, duration: door.duration || 60 }}
+       onEvent={(name, payload) => {
+         if (name === 'game_complete') handleDoorComplete(activeDoor, payload.stars, payload);
+       }}
+     />
+   );
```

---

### Phase 4 — Chunk Catapult (Projectile Physics thật)

#### [NEW] [`src/phaser/scenes/ChunkCatapultScene.js`](file:///Users/binhnguyen/projects/Engquest3k/src/phaser/scenes/ChunkCatapultScene.js)

**Yêu cầu cốt lõi:** Quỹ đạo đạn là parabol tính từ gravity thật (`physics.world.gravity.y = 300`), KHÔNG phải CSS easing cố định.

1. **Layout:** Cột trái = starters (clickable), cột phải = completions (clickable targets)
2. **Catapult base:** Static image phía dưới bên trái
3. **Cơ chế:** Click starter → load card → click target → `physics.add.image` projectile bay với velocity tính từ công thức kinematic thật: `vx = dx/t`, `vy = dy/t - 0.5*g*t`
4. **Match check:** Sau khi projectile bay xong (delay `t*1000`ms), kiểm tra pair → emit `game_correct` hoặc `game_wrong` + camera shake
5. **Verification:** Đổi `gravity.y` phải làm quỹ đạo thay đổi tương ứng (parabol thấp/cao)

#### [MODIFY] `DailyRoomScreen.jsx` — case `chunk_catapult`

```diff
  case 'chunk_catapult':
-   return <CatapultCommander ... />;
+   return <PhaserGameCanvas sceneClass={ChunkCatapultScene} sceneData={{ pairs: grammarSentences.map(...) }} ... />;
```

---

### Phase 5 — Boss Combat Type 1 (Vocab Gauntlet)

#### [NEW] [`src/phaser/scenes/BossCombatScene.js`](file:///Users/binhnguyen/projects/Engquest3k/src/phaser/scenes/BossCombatScene.js)

Chỉ chuyển **Boss Type 1 (Ancient Sorcerer)** sang Phaser trước. 4 type còn lại giữ nguyên `BossBattleScreen.jsx`.

1. **Boss sprite:** Spritesheet 96×96, animation `cast` khi bị đánh
2. **HP bars:** `Phaser.GameObjects.Graphics` — fill rect tỷ lệ % HP
3. **MCQ trong canvas:** 4 nút `this.add.text(...).setInteractive()` — KHÔNG dùng React overlay (tránh z-index conflict)
4. **Đáp án qua `validateMCQOptions()`** trước khi truyền vào sceneData
5. **Game flow:** 10 câu, boss HP -10/correct, player HP -15/wrong (gold tier), camera shake khi sai
6. **End:** `bossHP <= 0` = victory (3 stars), `playerHP <= 0` = defeat (0 stars)

#### [MODIFY] [`src/modules/chronicles/BossBattleScreen.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/BossBattleScreen.jsx)

Thêm điều kiện: nếu `getBossType(weekNumber) === 1` → render `<PhaserGameCanvas scene={BossCombatScene} />`, else giữ nguyên React component hiện tại.

---

## Open Questions

> [!IMPORTANT]
> **Q1: Asset pipeline — tải từ Kenney.nl hay tự generate?**
> Spec yêu cầu dùng sprite pack có sẵn từ Kenney.nl (CC0). Agent thực thi có thể:
> - (A) Tải thủ công từ kenney.nl, copy vào `public/phaser-assets/`
> - (B) Dùng placeholder hình chữ nhật màu đơn sắc đúng kích thước, đánh TODO
>
> Khuyến nghị: Chọn (B) trước để unblock code, bạn tự tải asset sau.

> [!IMPORTANT]
> **Q2: Tilemap — dùng Tiled JSON hay code tay?**
> - (A) Dựng layout bằng Tiled Map Editor → export JSON → load trong Phaser (chuẩn nhất)
> - (B) Vẽ tilemap bằng code Phaser thuần (sprite grid) — đơn giản hơn nhưng kém linh hoạt
>
> Khuyến nghị: Giai đoạn đầu chọn (B) để tránh dependency vào Tiled editor. Nâng lên (A) sau khi pattern ổn.

> [!WARNING]
> **Q3: Phaser bundle size impact**
> Phaser 3 full bundle ~1.2MB gzipped. Vite sẽ tree-shake nhưng Phaser không hỗ trợ tree-shaking tốt (monolithic). Cần kiểm tra build size sau khi install. Nếu tăng >500KB gzipped so với hiện tại, cân nhắc dùng `phaser` submodule hoặc lazy-load route `/chronicles` riêng.

---

## Verification Plan

### Automated Tests (chạy sau mỗi Phase)
```bash
# Sau mỗi bước
npm run build   # PHẢI exit code 0

# Sau Phase 0
# Verify: grep toàn bộ game files để confirm validateMCQOptions được import
grep -r "validateMCQOptions" src/modules/ --include="*.jsx" | wc -l
# Expected: >= 15 files

# Verify: joystick icon đã bị xoá
grep -r "joystick\|gamepad" src/modules/quest/SyntaxExpressRail.jsx
# Expected: 0 matches
```

### Manual Verification Checklist (Phần 8 của spec)
```
□ Hub World: nhân vật đi bộ bằng animation thật (KHÔNG phải emoji tĩnh dịch vị trí)
□ Hub World: camera follow player mượt, không giật khung hình
□ Hub World: cửa khoá/mở đổi sprite đúng trạng thái
□ Highway Runner: velocity-based lane change (DevTools Performance → Arcade Physics body update, KHÔNG CSS transition)
□ Chunk Catapult: quỹ đạo là parabol thật (đổi gravity.y → quỹ đạo thay đổi tương ứng)
□ Boss Type 1: MCQ options qua validateMCQOptions(), không trùng/rỗng
□ Không còn control trang trí không chức năng
□ 12 game ngoài phạm vi: git diff xác nhận KHÔNG thay đổi ngoại trừ import quizValidation
□ FPS ổn định trên Chrome DevTools mobile emulation 375px/430px
□ npm run build exit code 0
```

### Browser Testing
- Chrome DevTools → Device Toolbar → iPhone SE (375px) + Pixel 5 (393px)
- Chụp screenshot của:
  1. Hub World với player đang đi bộ
  2. Highway Runner đang chơi (car + word stars)
  3. Chunk Catapult projectile đang bay
  4. Boss Combat với HP bar

---

## Thứ tự thực thi bắt buộc (KHÔNG nhảy bước)

| Bước | Mô tả | Verify |
|------|-------|--------|
| 1 | Phase 0: Tạo `quizValidation.js` + `textSanitize.js`, xoá joystick | `npm run build` pass |
| 2 | `npm install phaser`. Tạo `PhaserGameCanvas.jsx`. Test scene rỗng (chữ nhật màu) | Canvas mount đúng, không vỡ layout |
| 3 | Tạo placeholder assets trong `/public/phaser-assets/` | Files tồn tại, đúng kích thước |
| 4 | Implement `HubScene.js` | Player đi bộ, va chạm cửa, camera follow |
| 5 | Nối `HubScene` vào `ChroniclesWorldMap.jsx` | Test 375px + 430px viewport |
| 6 | Implement `HighwayRunnerScene.js` | Swipe đổi lane, overlap phát đúng event |
| 7 | Implement `ChunkCatapultScene.js` | Parabol thật do gravity |
| 8 | Implement `BossCombatScene.js` cho Type 1 | 10 câu, HP bar đúng, thắng/thua đúng |
| 9 | Rà lại Phần 6 (Anti-pattern list) | Tự xác nhận từng dòng |
| 10 | `npm run build` + screenshot 4 màn hình trên mobile | Present cho review |
