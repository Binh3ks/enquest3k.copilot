# ⚠️ DEPRECATION NOTICE — DO NOT EDIT

**Thư mục này (`src/data/weeks_easy/`) đã ngừng hoạt động và bị DEPRECATED.**

1. **Lịch sử**: Tuần 01–32 đã được dọn dẹp và archive tại Git Tag `v1-w01-w32-final-20260820` (commit `ee8ea277`).
2. **Kiến trúc Hiện tại (W33+)**: 
   - Hệ thống từ Tuần 33 trở đi hoạt động trên **15 Tasks / 4 Hubs DUY NHẤT** tại `src/data/weeks/week_XX/`.
   - Router `src/data/weeks/index.js` đã chặn và ép `effectiveEasy = false` cho `weekId >= 33`.
   - Các file trong thư mục này là tàn dư cũ từ tháng 5–8/2026 và **KHÔNG ĐƯỢC PHÉP CHỈNH SỬA**.
3. **Mọi sửa đổi dữ liệu**: Bắt buộc chỉ thực hiện tại `src/data/weeks/week_XX/` (các file `reading_hub.js`, `listening_hub.js`, `writing_hub.js`, `speaking_hub.js`, `index.js`, v.v.).
