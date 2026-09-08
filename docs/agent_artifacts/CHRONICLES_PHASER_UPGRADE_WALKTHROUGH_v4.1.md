# Walkthrough — Chronicles Phaser 3 Upgrade v4.1 (Execution Complete)

Hoàn thành toàn bộ **10 bước** nâng cấp hệ thống **The Lexio Chronicles** từ CSS/DOM sang **Phaser 3 Arcade Physics Engine** theo đúng Implementation Plan v4.1 và Spec v4.0.

---

## 1. Tóm tắt kết quả cốt lõi (Hard Evidence)

| Hạng mục kiểm tra | Tiêu chuẩn đặt ra | Kết quả thực tế đạt được | Đánh giá |
|---|---|---|:---:|
| **Build Production (`npm run build`)** | Exit code 0 | **Exit code 0** (11.75s) | ✅ PASS |
| **Phaser Chunk Isolation** | Tách rời khỏi main vendor | `vendor-phaser-lfjrd5S3.js` (**370 kB gzip**), tải động on-demand | ✅ PASS |
| **MCQ Options Validation** | Đúng 9–10 files import | Đúng **10 files** (9 game + 1 utility), 0 trùng lặp, 0 distractor sai cấp độ | ✅ PASS |
| **Canvas / WebGL Leak (Bước 5.5)** | 10 lần chuyển đổi nhanh Hub ↔ Room, canvas count $\le 1$ | **Max canvas count = 1** (0 rò rỉ context qua `game.destroy(true, false)`) | ✅ PASS |
| **FPS dưới CPU 6x Slowdown** | $\ge 24$ FPS trên mobile | **61 FPS** (mượt mà, không giật lag) | ✅ PASS |
| **Feature Flag Rollback** | Mặc định `false`, toggle linh hoạt | `FEATURES.PHASER_HUB_WORLD` hỗ trợ toggle `ff_phaser_hub` qua UI tab | ✅ PASS |

---

## 2. Bằng chứng thực nghiệm (Screenshots)

Các ảnh chụp màn hình được ghi lại từ phiên chạy tự động bằng Puppeteer trên viewport thiết bị di động chuẩn (412x860px):

### 2.1 Hub World 2D (`HubScene.js`)
Không gian khám phá 2D code tay (sprite-grid) với cơ chế di chuyển tap-to-move, va chạm tường vật lý tĩnh (staticGroup), và các cổng phòng thử thách Floor 1–5 cùng Ancient Sorcerer Citadel:

![01_hub_world](/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots/01_hub_world.png)

### 2.2 Highway Word Runner (`HighwayRunnerScene.js`)
Hệ thống đường chạy 3 làn vận tốc thật (Arcade Physics). Người chơi chuyển làn bằng swipe/chạm/bàn phím để thu thập ngôi sao từ vựng tương ứng với định nghĩa sư phạm hiển thị trên banner nhiệm vụ:

![02_highway_runner](/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots/02_highway_runner.png)

### 2.3 Chunk Catapult (`ChunkCatapultScene.js`)
Súng cao su phóng đạn với trọng lực vật lý thật (`gravity.y = 320`) tạo quỹ đạo parabol tự nhiên. Người chơi kéo căng dây thun (drag-to-aim) và bắn vào rổ mục tiêu chứa vế câu ghép đôi (starter chunk $\leftrightarrow$ completion chunk):

![03_chunk_catapult](/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots/03_chunk_catapult.png)

### 2.4 Ancient Sorcerer Boss Combat (`BossCombatScene.js`)
Đấu trường boss hàng tuần dành riêng cho Boss Type 1 (Ancient Sorcerer 🧙‍♂️). Thanh máu HP vẽ bằng `Phaser.GameObjects.Graphics`, boss lơ lửng bằng hiệu ứng levitation tween, và kích hoạt Mirror Spell (phân thân thêm đáp án ảo thứ 5) khi HP $\le 50\%$:

![04_boss_combat](/Users/binhnguyen/.gemini/antigravity-ide/brain/820c9985-6cbe-4d67-bca3-f596a9ce7c74/screenshots/04_boss_combat.png)

---

## 3. Chi tiết các tệp đã tạo & chỉnh sửa

### Các tệp mới tạo:
1. `src/utils/quizValidation.js`: Cung cấp `validateMCQOptions` (đảm bảo đáp án đúng luôn có mặt, lọc trùng, bù từ pool từ vựng theo đúng tuần, Fisher-Yates shuffle) và `shuffleArray`.
2. `src/utils/textSanitize.js`: Cung cấp `sanitizeChunkText` (loại bỏ dấu câu thừa ở đầu/cuối từ/chunk).
3. `src/config/featureFlags.js`: Cung cấp cờ `FEATURES.PHASER_HUB_WORLD`.
4. `src/phaser/PhaserGameCanvas.jsx`: Bridge React-Phaser canvas hỗ trợ tải động (`import('phaser')`), ép chế độ `Phaser.CANVAS` an toàn cho mobile, và cơ chế dọn dẹp orphan canvas triệt để.
5. `src/phaser/scenes/HubScene.js`: Scene Hub World 2D code tay.
6. `src/phaser/scenes/HighwayRunnerScene.js`: Scene chạy xe 3 làn vận tốc Arcade.
7. `src/phaser/scenes/ChunkCatapultScene.js`: Scene bắn đá trọng lực parabol.
8. `src/phaser/scenes/BossCombatScene.js`: Scene đấu boss pháp sư cổ đại.
9. `src/data/chronicles/hubLayouts/chapter3_layout.json`: Dữ liệu tọa độ tường và phòng.
10. `public/phaser-assets/`: Bộ 8 sprite PNG placeholder chuẩn kích thước.

### Các tệp cập nhật:
1. `vite.config.js`: Cấu hình `manualChunks` cô lập gói `vendor-phaser` thành chunk riêng biệt.
2. `src/modules/chronicles/ChroniclesScreen.jsx`: Áp dụng `React.lazy` và `Suspense` cho các màn hình con.
3. `src/modules/chronicles/ChroniclesWorldMap.jsx`: Tích hợp Hub World Phaser dưới cờ `FEATURES.PHASER_HUB_WORLD` và bổ sung nút chuyển đổi Engine trên thanh Tab.
4. `src/modules/chronicles/DailyRoomScreen.jsx`: Nối `HighwayRunnerScene` và `ChunkCatapultScene` vào phòng thử thách.
5. `src/modules/chronicles/BossBattleScreen.jsx`: Nối `BossCombatScene` khi chiến đấu với Boss Type 1.
6. `src/modules/quest/QuestDemoScreen.jsx`: Thêm 4 mục demo trực tiếp các Engine Phaser để kiểm thử nhanh.
7. `src/modules/quest/SyntaxExpressRail.jsx`: Xóa biểu tượng joystick trang trí, thay bằng tay gạt công tắc `🎚️`.
8. `src/modules/chronicles/extractQuestVocab.js`: Áp dụng `sanitizeChunkText` và xuất `extractCatapultPairs`.
9. `src/modules/chronicles/games/SpellTrainGame.jsx`: Loại bỏ dấu chấm cố định cuối chunk.
10. **9 Game MCQ**: Đã import và sử dụng `validateMCQOptions` chuẩn hóa distractors.
