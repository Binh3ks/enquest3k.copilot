# 🏰 Kế hoạch Thiết kế & Triển khai Chronicles Hub World v7.0 (Three.js 3D thật)

## 1. Bối cảnh & Quyết định
- **Đối tượng sử dụng hiện tại:** Chỉ có Owner đang sử dụng và test trên thiết bị flagship **Samsung Galaxy S23** và máy tính dev. Chưa có học sinh truy cập công khai.
- **Quyết định:** Chuyển hoàn toàn Hub World từ 2.5D Phaser sprite sang **Three.js 3D thật (WebGL)** thông qua `@react-three/fiber` (R3F v9) + `@react-three/drei` (Drei v10).
- **Phạm vi bảo toàn:** Giữ nguyên 100% các mini-game hiện có viết bằng Phaser (Highway Runner, Chunk Catapult...). Chỉ Hub World thay đổi engine sang 3D.
- **Quy trình 2 giai đoạn:**
  1. **Giai đoạn 1:** Dựng khung cảnh 3D tĩnh (scene, đại sảnh đá sáng, trần vòm, cột trụ, cầu thang dẫn lên bục cao, 6 cổng phòng 3D có chiều sâu và đổ bóng thật, hệ thống ánh sáng 3D thật, camera phối cảnh isometric-influenced) → Xuất video màn hình thật để Owner duyệt.
  2. **Giai đoạn 2 (Sau khi duyệt):** Thêm character controller chú Cáo mascot 🦊, di chuyển trục Y leo cầu thang, tương tác click/chạm mở cổng phòng.

---

## 2. Kiến trúc Kỹ thuật & WebGL Context Lifecycle
- **Thư viện:** `three`, `@react-three/fiber`, `@react-three/drei` (tương thích React 19.2.0).
- **Component:** `<ThreeHubCanvas />` tách biệt, đặt tại `src/modules/chronicles/three/`.
- **Quản lý tài nguyên WebGL:**
  - `dispose()` toàn bộ geometries, materials, textures khi unmount.
  - Gọi `gl.dispose()` ngăn chặn tuyệt đối rò rỉ WebGL context khi người dùng chuyển qua lại giữa Hub World ↔ mini-games Phaser.

---

## 3. Thiết kế Mỹ thuật 3D (Grand Citadel Hall)
- **Bảng màu:** Đá sáng màu ấm (be/kem `#e2d5c3`), thảm nhung đỏ hoàng gia (`#b91c1c`) viền chỉ vàng (`#f59e0b`), cổng phòng phát sáng xanh ngọc (`#38bdf8`/`#34d399`), cổng Boss tím bão tố (`#a855f7`).
- **Cấu trúc không gian:**
  - Sàn đá chính với hoa văn lát đá khổ lớn.
  - Cầu thang 3D thật (Grand Staircase) dẫn lên bục cao phía sau (raised dais `Y: +1.6m`).
  - Cổng Boss đặt uy nghi trên đỉnh bục cao nhất ở cuối thảm đỏ.
  - 5 Cổng phòng thường phân bố đều ở 2 cánh sảnh.
- **Ánh sáng:**
  - Ambient light sáng ấm đều.
  - Directional light đổ bóng mềm tự nhiên.
  - Point lights vàng cam lung linh tại các ngọn đuốc gắn tường cạnh cột đá.
