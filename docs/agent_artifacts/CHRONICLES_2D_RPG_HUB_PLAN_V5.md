# Implementation Plan: Chronicles 2D RPG Hub World Upgrade (v5.0)

Nâng cấp toàn diện Hub World của The Lexio Chronicles từ bản prototype thô sơ sang một không gian game 2D RPG thực thụ, sử dụng bộ Tileset lâu đài đá và Spritesheet nhân vật hoạt họa 4 hướng (walk cycle thật), đồng thời sửa lỗi hiển thị và đồ họa trong Highway Runner.

---

## User Review Required

> [!IMPORTANT]
> **Về tài nguyên hình ảnh (Assets):**
> Hệ thống sẽ sử dụng bộ asset chuẩn CC0 (Public Domain) chất lượng cao đã được kiểm chứng trong cộng đồng Phaser:
> 1. **Nhân vật người hùng 2D RPG (Fauna)**: Texture atlas PNG + JSON với đầy đủ chuỗi animation 8 frame bước chân thật cho cả 4 hướng (`run-down`, `run-up`, `run-side`, `idle`), giải quyết triệt để hình tượng "viên thuốc tím" vô hồn.
> 2. **Tileset Đại sảnh Lâu đài (Buch & Kenney CC0 Dungeon/RPG Tileset)**: Sàn đá, tường thành có vòm đá, ngọn đuốc có hiệu ứng lửa bập bùng, thảm đỏ trung tâm, cột đá và cổng gỗ.
> 3. **Bố cục Single-Screen Citadel (800×500)**: Thiết kế toàn bộ 5 cửa phòng (Floor 1–5) và cổng Boss nằm trọn trong 1 màn hình vừa vặn, không dùng camera cuộn trôi làm cắt cụt hoặc che giấu các phòng.

---

## Proposed Changes

Grouped by component:

### 1. Asset Pipeline & Texture Atlas
Lưu trữ và cấu hình các asset 2D RPG trong thư mục tĩnh của dự án.

#### [NEW] `public/phaser-assets/rpg/fauna.png`
- Spritesheet nhân vật 2D chất lượng cao (130×147 px RGBA).

#### [NEW] `public/phaser-assets/rpg/fauna.json`
- TexturePacker JSON atlas định nghĩa tọa độ từng frame cho `run-down-1..8`, `run-up-1..8`, `run-side-1..8`, `walk-down-3`, `walk-up-3`, `walk-side-3`.

#### [NEW] `public/phaser-assets/rpg/dungeon_tiles.png`
- Tileset gạch đá lâu đài cổ (160×256 px RGBA, grid 16×16 px).

---

### 2. Hub World 2D RPG Scene (`HubScene.js`)
Viết lại hoàn toàn `HubScene.js` để biến nó thành một Đại sảnh Tòa tháp (The Storm Tower Grand Citadel Hall).

#### [MODIFY] `src/phaser/scenes/HubScene.js`
- **`preload()`**:
  - Nạp atlas `this.load.atlas('player_hero', '/phaser-assets/rpg/fauna.png', '/phaser-assets/rpg/fauna.json')`.
  - Nạp spritesheet tileset `this.load.spritesheet('dungeon_tiles', '/phaser-assets/rpg/dungeon_tiles.png', { frameWidth: 16, frameHeight: 16 })`.
- **`create()`**:
  - **Tạo Animation Frames**:
    - `hero-run-down` (8 frames, 12 fps, repeat -1)
    - `hero-run-up` (8 frames, 12 fps, repeat -1)
    - `hero-run-side` (8 frames, 12 fps, repeat -1, flipX cho trái/phải)
    - `hero-idle-down`, `hero-idle-up`, `hero-idle-side`
  - **Xây dựng Đại sảnh (Single-Screen 800×500)**:
    - Nền sàn đá phủ toàn bộ 800×500, thảm hoàng gia chạy dọc từ cổng vào đến điện Boss.
    - Tường đá phía trên với đuốc lửa động (flickering torch animation).
    - 5 Cổng phòng Floor 1–5: Đặt ở 2 hàng đối xứng hoặc vòng cung chữ U, có cổng vòm đá, biểu tượng từng tầng, số sao đã đạt (★), và nhãn trạng thái (🔒 Khóa / ⚡ Vào phòng / ✓ Hoàn thành).
    - Cổng Boss Chamber: Đặt uy nghi ở trung tâm trên cùng, bao quanh bởi luồng hào quang tím và hiển thị tiến độ ⚡ Power Points.
  - **Khởi tạo Nhân vật**:
    - Spawn nhân vật ở vị trí trung tâm sảnh (400, 380), kích thước hiển thị 36×36 px (scale 1.5x pixel art).
    - Thiết lập hitbox vật lý vừa vặn (circle hoặc rectangle 16×16 px dưới chân) để va chạm mượt mà với tường và cổng.
  - **Hệ thống Điều khiển Kép**:
    - **Tap-to-Move**: Chạm/click bất kỳ đâu trên sàn $\rightarrow$ vẽ vòng tròn target nhấp nháy $\rightarrow$ nhân vật quay mặt về hướng đó, bật animation bước chân tương ứng, di chuyển với vận tốc 180 px/s đến đích rồi chuyển về idle.
    - **Bàn phím WASD / Mũi tên**: Hỗ trợ di chuyển tức thì, nhả phím dừng lại ngay lập tức.
  - **Tương tác Cổng phòng (Door Proximity & Entry)**:
    - Khi nhân vật tiến sát cổng phòng (< 50 px): Hiển thị bong bóng gợi ý `[⚡ Click to Enter]` hoặc tự động kích hoạt khi bước xuyên qua cửa.
    - Phát bridge event `this.events.emit('bridge:event', 'door_enter', doorData)` để React chuyển màn hình vào Daily Room hoặc Boss Chamber.

---

### 3. Sửa lỗi Highway Runner (`HighwayRunnerScene.js`)
Giải quyết các lỗi giao diện trong ảnh chụp màn hình của người dùng.

#### [MODIFY] `src/phaser/scenes/HighwayRunnerScene.js`
- **Sửa lỗi Text đè khung HUD**:
  - Dời vị trí spawn của các huy hiệu từ vựng xuống dưới đáy khung HUD (từ $y \ge 130$ thay vì $y = -20$).
  - Giới hạn vùng di chuyển của nhãn chữ để tuyệt đối không bị trôi đè lên khung "TARGET DEFINITION".
- **Nâng cấp Đồ họa Xe đua & Đường cao tốc**:
  - Sử dụng sprite xe thể thao rõ nét với hiệu ứng đèn pha chiếu sáng mặt đường.
  - Vẽ vạch kẻ đường phản quang (asphalt texture + neon lane dividers cuộn mượt).
  - Tăng độ tương phản màu sắc cho huy hiệu từ vựng (chữ trắng đậm viền nổi trên nền ngọc/pha lê rực rỡ, dễ đọc cho học sinh).

---

### 4. Cấu hình & Tích hợp (`ChroniclesWorldMap.jsx`)
Đảm bảo trải nghiệm chuyển đổi mượt mà và an toàn.

#### [MODIFY] `src/modules/chronicles/ChroniclesWorldMap.jsx`
- Cập nhật wrapper canvas Phaser: kích thước chuẩn 800×500 tỉ lệ 16:10, bo góc, viền neon tinh tế.
- Giữ nút toggle nhanh giữa `🎮 Hub: 2D RPG` và `🗺️ Hub: Map Grid` trên thanh tab để người dùng có thể tự do chuyển đổi qua lại bất kỳ lúc nào.

---

## Verification Plan

### Automated Tests
1. **Kiểm tra cú pháp & khai báo biến**:
   - `npx eslint src/phaser/scenes/HubScene.js src/phaser/scenes/HighwayRunnerScene.js`
2. **Kiểm tra biên dịch Production Build**:
   - `npm run build` — bắt buộc exit code 0, không có chunk warning lỗi, thời gian build < 15s.

### Manual Verification
1. **Kiểm tra Hub World trên trình duyệt**:
   - Mở `http://localhost:5173/week/33/chronicles` (hoặc test harness).
   - Kiểm tra xem Đại sảnh 800×500 có hiển thị trọn vẹn cả 5 cổng phòng và cổng Boss mà không bị cắt cụt không.
   - Bấm chuột di chuyển nhân vật: Xác nhận có animation bước chân thật (nhấc chân, đổi hướng 4 chiều).
   - Đi vào cửa Floor 1: Xác nhận vào đúng phòng Chamber of Tales.
2. **Kiểm tra Highway Runner**:
   - Vào Floor 1 hoặc Floor 2 $\rightarrow$ chơi game Highway Runner.
   - Xác nhận text các từ không còn đè lên thanh banner HUD phía trên.
   - Xác nhận xe đua và đường đua hiển thị sắc nét, chuyển làn mượt bằng phím hoặc chạm.
