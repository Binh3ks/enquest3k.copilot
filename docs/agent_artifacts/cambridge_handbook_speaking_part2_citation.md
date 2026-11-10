# Task B.5: Cambridge Handbook Citation — Speaking Part 2 (Information Exchange)

## 1. Official Reference & Citation Status
- **Trạng thái**: ⚠️ **UNVERIFIED (Không có file Cambridge Handbook PDF trong repository)**
- **Kiểm tra repo**: Lệnh `git ls-files "*.pdf"` và `find . -name "*.pdf"` trả về **0 kết quả**. Không có bất kỳ file PDF nào thuộc bộ tài liệu Cambridge Handbook được lưu trữ trong codebase.
- **Xử lý vi phạm**: Khối "Trích nguyên văn" (Verbatim Description) ở Round 73 là do AI tự sinh từ trí nhớ (training memory), KHÔNG trích xuất từ file vật lý trong repo. Khối này ĐÃ BỊ XÓA hoàn toàn để tuân thủ quy tắc chống bịa đặt (Anti-Hallucination & Provenance Gate).

---

## 2. Trạng thái kiểm chứng định dạng Info Exchange

| Chi tiết | Trạng thái | Ghi chú kiểm chứng |
| :--- | :---: | :--- |
| **File PDF nguồn trong repo** | ❌ **KHÔNG TỒN TẠI** | Repo không có file `*handbook*.pdf`. Mọi trích dẫn số trang (pp. 29–30) chưa được verify qua file vật lý. |
| **Cấu trúc 2 Card (Card A / Card B)** | ⚠️ **UNVERIFIED TRONG REPO** | Quy ước kiến trúc hiện tại của dự án: 2 thẻ gồm thông tin sự kiện và câu hỏi gợi ý. Cần Owner cấp PDF chính thức để đóng dấu Verified. |
| **Số lượng câu hỏi (5 items/card)** | ⚠️ **UNVERIFIED TRONG REPO** | Quy ước kiến trúc hệ thống: 5 cues (`candidateCuesCount: 5`, `examinerCuesCount: 5`). |
| **Cơ chế đổi vai (Role Reversal)** | ⚠️ **UNVERIFIED TRONG REPO** | Quy ước luồng thi Phase 1 (học sinh trả lời) và Phase 2 (học sinh hỏi). |
| **Danh mục đề tài bắt buộc từng tuần** | ❌ **KHÔNG BẮT BUỘC** | Kể cả trong tài liệu YLE Handbook, Cambridge chỉ cung cấp format mẫu và thang điểm, không ấn định danh sách cố định đề tài Speaking cho từng tuần. |
