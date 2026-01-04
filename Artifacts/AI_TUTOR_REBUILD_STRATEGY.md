🚩 CHIẾN LƯỢC TÁI THIẾT TỔNG THỂ AI TUTOR (MS. NOVA V3)

Tài liệu này đóng vai trò là "Tổng lệnh" cho quá trình chuyển đổi từ một Chatbot hỗn loạn sang một Hệ thống Giáo viên AI (Pedagogical AI System) tinh tế.

1. Phản biện & Đề xuất: Tại sao phải viết mới?

Sạch bối cảnh (Context Clarity): Loại bỏ mã rác giúp AI Agent không bị nhầm lẫn.

Tiết kiệm Token (Token Efficiency): Cấu trúc module giúp giảm 70-80% chi phí vận hành mỗi lượt chat.

Thực thi Ms. Nova: Triết lý "Recast" và "Scaffolding" yêu cầu một bộ khung logic ổn định mà mã cũ không có.

2. Cấu trúc Thư mục Mục tiêu

Mọi file liên quan đến AI Tutor sẽ được quy hoạch lại như sau:

src/modules/ai_tutor/AITutor.jsx (Nhạc trưởng điều phối UI)

src/modules/ai_tutor/components/ (Các mảnh ghép UI: Chat, Hints, Grammar)

src/modules/ai_tutor/tabs/ (5 Tab: Story, FreeTalk, Pronunciation, Quiz, Debate)

src/services/ai_tutor/novaEngine.js (Bộ não xử lý API & MCP)

src/services/ai_tutor/promptLibrary.js (Thư viện Persona & Scenarios)

3. Danh mục các Tab chức năng

Story Mission (Viết mới): Bám sát Syllabus tuần học, dẫn dắt học sinh hoàn thành nhiệm vụ ngôn ngữ.

Free Talk (Viết mới): Hội thoại tự do dựa trên sở thích của học sinh nhưng vẫn khéo léo lồng ghép từ vựng mục tiêu.

Pronunciation (Lấy lại): Luyện phát âm (Sử dụng Web Speech API).

Quiz (Lấy lại): Kiểm tra nhanh từ vựng/ngữ pháp qua các câu hỏi trắc nghiệm JSON.

Debate (Lấy lại): Tranh biện với Ms. Nova về các chủ đề trong tuần.

4. Kế hoạch triển khai 5 bước (The Implementation Path)

Bước 1: Thanh trừng (The Purge): Di chuyển toàn bộ file cũ vào /legacy_archive.

Bước 2: Đúc não (The Core): Xây dựng novaEngine.js và promptLibrary.js.

3: Dựng khung (The Shell): Viết lại AITutor.jsx và hệ thống Tab Navigation.

4: Hoàn thiện Tab (The Features): Implement lần lượt 5 Tab từ Story tới Debate.

5: Kiểm soát chất lượng (QA): Chạy Test Case "Thử sai" để kiểm tra tính sư phạm.

Ghi chú: Luôn sử dụng @docs/ai_application_context.md làm kim chỉ nam.