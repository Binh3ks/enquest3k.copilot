# CHIEF ARCHITECT EXECUTIVE DECISIONS & SCALING BLUEPRINT (W34–W72)
> **Kim chỉ nam**: *"Nếu nhân bản y hệt cái này 39 lần cho W34–72, lỗi này có nhân bản theo không?"*

---

## 🎯 1. PHÂN BIỆT 2 NHÓM LỖI & QUY TRÌNH XỬ LÝ ĐỘC LẬP

Để tránh vòng lặp sửa lỗi thủ công tốn kém qua 40 tuần, toàn bộ backlog kỹ thuật được phân lập thành 2 nhóm:

### 🔴 Nhóm A: Lỗi Hệ Thống (System-Level Architectural Bugs)
*   **Đặc điểm**: Nằm ở tầng Layout, Wrapper, Router, State Store hoặc Config toàn cục.
*   **Quy tắc xử lý**: **Fix 1 lần duy nhất ở tầng kiến trúc** $\rightarrow$ Tự động áp dụng cho 100% các tuần từ W01 đến W72.
*   **Các mục đã xử lý**:
    1. **SSOT Naming (`src/config/stationLabels.js`)**: Tạo 1 file config duy nhất làm chân lý, xoá bỏ mọi hardcode tên station phân tán.
    2. **Mascot 3D Layer (`TaskScreen.jsx`)**: Nhúng `LexioMascot` 3D vào tầng Task Wrapper dùng chung, không để từng page tự quyết định.
    3. **Zero-L1 Rule**: 100% UI chức năng dùng Tiếng Anh tự nhiên; Tiếng Việt chỉ xuất hiện ở Onboarding/Settings phụ huynh.
    4. **Hard Progressive Locking**: Duy nhất 1 cơ chế mở khóa qua PIN Modal + Auto-bypass cho Super Admin / Teacher.

---

### 🟡 Nhóm B: Lỗi Nội Dung (Content & Asset Semantic Mismatches)
*   **Đặc điểm**: Thuộc về ngữ liệu, hình ảnh, bài đọc riêng biệt của từng tuần.
*   **Quy tắc xử lý**: **KHÔNG sửa tay từng tuần** $\rightarrow$ Bắt buộc xây dựng **Content Linter tự động (`scripts/audit_writing_panels.mjs`)** chặn ngay tại cổng Build Gatekeeper.
*   **Quy chuẩn bắt buộc (`action_tags`)**:
    - Mỗi Panel trong `writing.js` bắt buộc khai báo `action_tags: [...]`.
    - Chunks và Sentence Frames phải đối chiếu ngữ nghĩa với `action_tags` trước khi commit.

---

## ✂️ 2. QUYẾT ĐỊNH TINH GỌN PHẠM VI (FEATURE PRUNING)

### Tạm hoãn AI Debate (`ai_debate`) $\rightarrow$ Ưu tiên Cambridge Info Exchange (Speaking Part 2)
1. **Lý do**:
   - `ai_debate` là hội thoại mở 2 chiều phức tạp, có rủi ro cao về kiểm soát câu trả lời AI với trẻ nhỏ, và có sự trùng lặp với Story Retell.
   - Nhân bản `ai_debate` qua 39 tuần tạo diện rủi ro QA rất lớn.
2. **Giải pháp thay thế**:
   - Tích hợp bài luyện tập **Speaking Part 2 (Information Exchange - Đặt câu hỏi W-H ngược lại cho giám khảo)** vào giữa tuần.
   - Giúp học sinh làm quen với dạng bài khó này trước khi thi thật ở Boss Castle.

---

## 🚀 3. QUY TRÌNH TRIỂN KHAI SẢN XUẤT HÀNG LOẠT (3-SPRINT CADENCE)

```
Sprint 1 (Đóng băng Nền tảng W33):
  ✅ Content-Linter cho action_tags (audit_writing_panels.mjs)
  ✅ stationLabels.js (SSOT toàn hệ thống)
  ✅ LexioAvatar 3D tại TaskScreen Layout
  ✅ Cố định dữ liệu chuẩn W33

Sprint 2 (Chuẩn hóa Trải nghiệm):
  ✅ Enforce Zero-L1 100% UI
  ✅ Tối ưu Visual Anchor cho Story Retell (3D scene thumbnail)
  ✅ Tích hợp master audit gatekeeper (audit_new_week.mjs)

Sprint 3 (Bắt đầu Nhân bản W34–W72):
  → Chạy pipeline sản xuất W34 tự động
  → Kiểm định bằng Content-Linter tự động trước khi đóng gói
```
