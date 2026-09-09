# Báo Cáo Nghiệm Thu Hạng Mục 1: Đổi Tên "⚡ Boss Energy" & Mở Sớm Từng Cửa

**Ngày thực hiện**: 2026-09-09  
**Người thực hiện**: Antigravity Assistant  
**Trạng thái**: Đã code, build thành công (`npm run build` exit code 0) & nghiệm thu qua Puppeteer trên URL live (`http://localhost:5173`).

---

## 1. Tóm Tắt Thực Hiện

### 1.1. Đổi tên toàn diện "Power Points" / "PP" $\rightarrow$ "⚡ Boss Energy" trên UI
- **Nguyên tắc**: 100% tên biến nội bộ (`weeklyPP`, `PP_PER_STAR`, `weeklyPP[weekKey]`) được **giữ nguyên vẹn** để không phá vỡ logic đang chạy ổn định.
- **Tất cả các vị trí hiển thị người dùng (UI Labels)** đã được đổi nhất quán sang **⚡ Boss Energy**:
  - `src/modules/chronicles/ChroniclesWorldMap.jsx`: Header thanh năng lượng, tooltip và thông báo ngưỡng mở cổng Boss Chamber (`Earn X more ⚡ Boss Energy to unlock Boss Chamber`).
  - `src/modules/chronicles/DailyRoomScreen.jsx`: Huy hiệu header phòng (`⚡ X Boss Energy`), popup và thông báo.
  - `src/modules/chronicles/BossBattleScreen.jsx`: Huy hiệu năng lượng vào Boss Battle, mô tả các mốc Huy hiệu (Bronze, Silver, Gold).
  - `src/modules/chronicles/ChapterFragmentPanel.jsx`: Nhãn năng lượng tuần.
  - `src/modules/chronicles/games/SpellTrainGame.jsx`: Nhãn năng lượng nhận được khi hoàn thành.
  - `src/phaser/scenes/HighwayRunnerScene.js`: Nhãn năng lượng thưởng.
  - `src/components/questmap/ChroniclesFAB.jsx`: Nút truy cập nhanh Super Leo hiển thị `⚡ X Boss Energy`.
  - `src/components/questmap/QuestCompleteFanfare.jsx`: Fanfare hoàn thành quest hiển thị `+30 ⚡ Boss Energy`.
  - `src/components/questmap/DoorUnlockCeremony.jsx`: Lễ mở cổng hiển thị `⚡ Boss Energy`.
  - `src/components/questmap/QuestEntryOverlay.jsx`: Cửa sổ chi tiết nhiệm vụ hiển thị `⚡ Boss Energy`.
  - Mascot Shop (`MascotShopPanel.jsx`): Xác nhận chỉ dùng tiền tệ **🪙 Lexio Coins**, không hiển thị hay gây xung đột với Boss Energy.

### 1.2. Triển khai Cơ Chế Mở Sớm Từng Cửa (Micro-Reward Pacing)
- **Tập tin can thiệp**: `src/modules/chronicles/DailyRoomScreen.jsx`
- **Logic vận hành**:
  1. **Chìa khóa theo tiến độ**: `availableKeys = completedQuestCount - clearedDoorsCount` (với `completedQuestCount` là số quest đã hoàn thành trong ngày theo `useDailyQuestStore`).
  2. **Tự do chọn cửa**: Học sinh khi có ít nhất 1 chìa khóa (`availableKeys > 0`) có thể tự do mở **bất kỳ rương/cửa nào chưa mở** trong phòng ngày hôm đó (`🔓 Open Chest`).
  3. **Cửa đã clear ($\ge 1$ sao)**: Luôn giữ trạng thái mở và cho phép chơi lại thoải mái (`↺ Replay`) mà không tiêu tốn chìa khóa mới.
  4. **Cửa chưa clear**: Nếu học sinh chưa hoàn thành thêm quest trên bản đồ (`availableKeys <= 0`), cửa sẽ ở trạng thái khóa kèm hướng dẫn rõ ràng: `🔒 Need Key`.
  5. **Giữ nguyên Invariant Clear Room**: Phần thưởng lớn của phòng (+15 Lexio Coins, Chapter Collectible, hội thoại chúc mừng của NPC Guardian) **bắt buộc yêu cầu hoàn thành đủ cả 3 cửa ($\ge 1$ sao)**. Không thể né tránh kỹ năng để nhận phần thưởng phòng.

---

## 2. Bằng Chứng Thực Nghiệm Trực Tiếp (Puppeteer Live Evidence)

Các bằng chứng dưới đây được chụp trực tiếp từ ứng dụng đang chạy thật trên trình duyệt (port 5173) thông qua kịch bản kiểm thử tự động `scripts/verify_hangmuc_1.mjs`:

### Bằng chứng 1: Sảnh Chính Citadel — Nhãn "⚡ Boss Energy" Đồng Bộ
- **URL**: `http://localhost:5173/week/33/chronicles`
- **Quan sát thực tế**: Thanh tiến độ hiển thị `⚡ Boss Energy 0 / 450` và dòng hướng dẫn `Earn 150 more ⚡ Boss Energy to unlock Boss Chamber`. Sảnh 3D Three.js và nhân vật Leo Cáo hoạt động trơn tru.
- **Ảnh bằng chứng**: `docs/agent_artifacts/evidence/hangmuc1_01_world_map_boss_energy.png`

### Bằng chứng 2: Phòng Ngày Khi Chưa Hoàn Thành Quest Nào (0/3 Quests)
- **URL**: `http://localhost:5173/week/33/chronicles?room=0`
- **Quan sát thực tế**:
  - Banner hướng dẫn: `🔒 Complete Quest 1 on the Map to earn your next Key! (0/3 Quests done)`
  - Header: `⚡ 0 Boss Energy`
  - Cả 3 rương kỹ năng (Arcane Bubble Pop, Spell Sentence Train, Lexical Detective) đều hiển thị nút `🔒 Need Key` và bị vô hiệu hóa.
- **Ảnh bằng chứng**: `docs/agent_artifacts/evidence/hangmuc1_02_daily_room_0_quests_locked.png`

### Bằng chứng 3: Phòng Ngày Sau Khi Hoàn Thành 1 Quest Trên Bản Đồ (1/3 Quests)
- **Kịch bản**: Giả lập hoàn thành Quest 1 của Ngày 1 (`gear1_webtoon`).
- **Quan sát thực tế**:
  - Banner hướng dẫn chuyển sang màu vàng tươi: `🗝️ Key ready! Choose any chest to unlock (0/3 cleared)`
  - Cả 3 rương đều sáng viền vàng rực rỡ và hiển thị nút hành động `🔓 Open Chest`. Học sinh được toàn quyền chọn rương mình yêu thích để chơi trước.
- **Ảnh bằng chứng**: `docs/agent_artifacts/evidence/hangmuc1_03_daily_room_1_quest_unlocked.png`

### Bằng chứng 4: Phòng Ngày Sau Khi Chơi Xong Cửa 1 Được Chọn (1 Cửa Clear)
- **Kịch bản**: Chơi xong Cửa 1 (Arcane Bubble Pop) đạt 3 sao (`★★★`).
- **Quan sát thực tế**:
  - Header: Tăng ngay lên `⚡ 30 Boss Energy` (10 Boss Energy mỗi sao).
  - Cửa 1: Đổi sang viền xanh ngọc, tích `✓`, nút chuyển thành `↺ Replay`.
  - Vì mới hoàn thành 1 quest và đã mở 1 cửa (`availableKeys = 1 - 1 = 0`), 2 cửa còn lại lập tức hiển thị `🔒 Need Key`.
  - Banner cập nhật hướng dẫn chính xác: `🔒 Complete Quest 2 on the Map to earn your next Key! (1/3 Quests done)`.
  - Phần thưởng Clear Room (+15 Coins, Collectible) **chưa kích hoạt**, đảm bảo đúng quy tắc sư phạm không thể bỏ sót cửa.
- **Ảnh bằng chứng**: `docs/agent_artifacts/evidence/hangmuc1_04_daily_room_1_door_cleared.png`

---

## 3. Kết Luận & Sẵn Sàng Chuyển Giao
- Hạng mục 1 đã hoàn thành trọn vẹn, giải quyết dứt điểm điểm nghẽn "học 3 quest mới được chơi 1 lần" đồng thời bảo vệ 100% tính toàn vẹn sư phạm của tuần học.
- Đã build thành công với 0 lỗi.
- Đang chờ người dùng phê duyệt để bắt đầu **Hạng mục 2** (Thêm thưởng tương tác cho 2 cửa bí mật trong Sảnh).
