🚩 ENGQUEST - MASTER MANAGEMENT PLAN (v1.1)

Agent Tổng trưởng: Gemini
Chủ dự án: @binh3ks
Công cụ thực thi (IDE Agent): Cline (VS Code Extension)

🎯 MỤC TIÊU CHIẾN LƯỢC

Chuẩn hóa AI Tutor: Đảm bảo dạy đúng sư phạm, đúng ngữ cảnh, không lỗi logic.

Gold Standard (W1-W2): Xây dựng tuần 1 và 2 thành "khuôn mẫu vàng" không tì vết.

Mass Production 20: Tự động hóa sản xuất nội dung cho 20 tuần đầu tiên.

Pilot Test: Sẵn sàng cho học sinh thực tế vào trải nghiệm.

🛠️ THIẾT LẬP CÔNG CỤ (TOOLING)

IDE Agent: Cài đặt Extension "Cline" hoặc "Roo Code" trên VS Code.

Cấu hình: Sử dụng API Key của Gemini (vì bạn đã có sẵn trong dự án) để làm bộ não cho Agent này.

Cách dùng: Bạn chỉ cần copy "Lệnh dành cho Agent" mà tôi cung cấp, dán vào chat của Cline, và nó sẽ tự động sửa file/chạy script trên máy bạn.

🛠️ LỘ TRÌNH THỰC THI (PHASES)

Giai đoạn 1: Tinh chỉnh "Bộ não" AI Tutor (Tuần hiện tại)

[ ] Task 1.0: Thiết lập Cline Agent và kiểm tra quyền truy cập thư mục dự án.

[ ] Task 1.1: Module hóa tutorEngine.js. Tách biệt Logic Story, Hint và Grammar.

[ ] Task 1.2: Inject Master Prompt V23 vào hệ thống System Instruction.

[ ] Task 1.3: Thiết lập cơ chế "Structured Output" (AI luôn trả về JSON để App không bị crash).

[ ] Task 1.4: Triển khai Memory System đơn giản qua Firestore (AI nhớ tên học sinh và lỗi sai vừa mắc).

Giai đoạn 2: Kiểm định "Khuôn mẫu vàng" Tuần 1 & 2

[ ] Task 2.1: Rà soát Syllabus vs Blueprint. Đảm bảo từ vựng/ngữ pháp xuất hiện đúng chỗ.

[ ] Task 2.2: Test "Happy Path" (Học sinh học giỏi) và "Edge Cases" (Học sinh nhập bậy, nhập sai liên tục).

[ ] Task 2.3: Kiểm tra Media Alignment (Ảnh và âm thanh phải khớp 100% với nội dung bài học).

Giai đoạn 3: Tự động hóa Sản xuất (Mass Production)

[ ] Task 3.1: Hoàn thiện Script generate_week.js sử dụng Gemini 1.5 Pro.

[ ] Task 3.2: Chạy Batch cho tuần 3 đến tuần 20.

[ ] Task 3.3: Chạy Script Audit tự động để kiểm tra lỗi file hàng loạt.

Giai đoạn 4: Đóng gói & Deploy Test

[ ] Task 4.1: Tối ưu hóa UI/UX cho di động.

[ ] Task 4.2: Thiết lập hệ thống Log để theo dõi học sinh học như thế nào.

[ ] Task 4.3: Mở cổng cho 10-20 học sinh đầu tiên test (Pilot Test).

📋 DANH SÁCH VIỆC CẦN LÀM NGAY (BACKLOG)

Hướng dẫn cài đặt Cline: Thiết lập để Agent có thể sửa code.

Refactor tutorEngine.js: Cập nhật logic xử lý tin nhắn để tích hợp V23 chặt chẽ hơn thông qua Cline.

Tạo Script Validator: Công cụ kiểm tra cấu trúc file dữ liệu tuần.

Lưu ý: Agent Tổng trưởng sẽ cập nhật file này sau mỗi cột mốc quan trọng.