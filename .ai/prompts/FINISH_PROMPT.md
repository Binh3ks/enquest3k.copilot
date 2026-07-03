# CHỈ DẪN ĐÓNG SESSION TỰ ĐỘNG
Mỗi khi người dùng gõ "Agent kết thúc", bạn PHẢI tự động hành động:
1. Nhắc người dùng chạy các script quality gate tương ứng nếu có.
2. Tự sửa file `.ai/tasks/ACTIVE.md` về trạng thái chờ (Chưa có task).
3. Tự thêm lịch sử hoàn thành công việc vào file `.ai/tasks/DONE.md`.
4. Cập nhật trạng thái hệ thống mới nhất vào `.ai/memory/CURRENT.md`.
5. Đề xuất một thông điệp Commit Message chuẩn Conventional Commits.
