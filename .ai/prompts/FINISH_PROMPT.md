# CHỈ DẪN ĐÓNG SESSION & CHƯNG CẤT KIẾN THỨC
Mỗi khi người dùng gõ "Agent kết thúc", bạn PHẢI tự động thực hiện:
1. Kiểm tra nếu session có sửa lỗi logic hoặc thay đổi kiến trúc, hãy tự động trích xuất và tạo file tài liệu kỹ thuật mới trong `.ai/knowledge/` dựa theo mẫu tại `.ai/templates/KNOWLEDGE_TEMPLATE.md`.
2. Tự động ghi nhận ngày tháng và tóm tắt quyết định vào `.ai/decisions/DECISIONS_LOG.md`.
3. Di chuyển các task đã hoàn thành từ `.ai/tasks/ACTIVE.md` sang `.ai/tasks/DONE.md`.
4. Cập nhật trạng thái hệ thống và danh sách backlog tồn đọng vào `.ai/memory/CURRENT.md`.
5. Đề xuất Commit Message chuẩn Conventional Commits cho người dùng.
