🚩 TỔNG LỆNH TÁI THIẾT HỆ THỐNG AI TUTOR (MS. NOVA V3)

Tài liệu này là nguồn sự thật duy nhất (Source of Truth). AI Agent phải thực hiện theo đúng cấu trúc Modular được quy định dưới đây để tối ưu token và đảm bảo tính sư phạm.

🏗️ 1. KIẾN TRÚC HỆ THỐNG MỤC TIÊU (MODULAR)

Để tiết kiệm token, chúng ta KHÔNG viết code vào một file duy nhất. Hệ thống sẽ được chia như sau:

Tầng Dịch vụ & Logic (src/services/ai_tutor/)

novaEngine.js: Chứa hàm gọi Gemini API, cấu hình JSON Schema và xử lý Tool Calling (MCP).

promptLibrary.js: Thư viện chứa Persona Ms. Nova, Master Prompt V23 và các chỉ dẫn sư phạm.

mcpTools.js: Định nghĩa các công cụ tra cứu Syllabus và User Progress.

Tầng Giao diện (src/modules/ai_tutor/)

AITutor.jsx: File chính quản lý State (messages, activeTab) và điều phối các Tab.

Thư mục tabs/:

StoryMissionTab.jsx (Viết mới): Dẫn dắt theo cốt truyện tuần.

FreeTalkTab.jsx (Viết mới): Hội thoại tự do linh hoạt.

PronunciationTab.jsx (Lấy lại logic cũ): Luyện phát âm.

QuizTab.jsx (Lấy lại logic cũ): Kiểm tra kiến thức.

DebateTab.jsx (Lấy lại logic cũ): Tranh biện.

Thư mục components/: Các thành phần UI nhỏ như ChatBubble.jsx, InputBar.jsx.

🛠️ 2. CHỈ DẪN KỸ THUẬT CHI TIẾT

A. Cơ chế Phản hồi (Engine)

AI phải luôn trả về JSON: { ai_response, pedagogy_note, mission_status, suggested_hints, grammar_focus }.

Talk Ratio Guard: Ép AI phản hồi ngắn hơn học sinh (tỉ lệ 0.8).

Recast Technique: Tuyệt đối không bảo học sinh "Sai". AI phải nhắc lại câu đúng trong lời thoại của mình.

B. Story Mission Tab (Mới)

Phải gọi get_syllabus_info ngay khi bắt đầu để biết bối cảnh.

AI đóng vai NPC (nhân vật trong truyện) để giao nhiệm vụ.

Chỉ hiện suggested_hints sau 2 lượt học sinh không trả lời được hoặc im lặng.

C. Free Talk Tab (Mới)

Ms. Nova bắt chuyện bằng một câu hỏi "mở" về đời sống.

Khéo léo lồng ghép từ vựng của tuần vào cuộc trò chuyện một cách tự nhiên.

📅 3. KẾ HOẠCH TRIỂN KHAI CỤ THỂ (9 BƯỚC)

Bạn hãy yêu cầu AI Agent thực hiện lần lượt các bước sau:

Giai đoạn 1: Thanh trừng & Chuẩn bị

Bước 1 (Purge): Tạo thư mục src/legacy_archive/. Di chuyển tất cả file liên quan đến AI Tutor hiện tại (trong services, modules, tabs) vào đó. Cập nhật @clauderules.md để bỏ qua thư mục này.

Bước 2 (Context): Cập nhật file @docs/ai_application_context.md để phản ánh đúng cấu trúc Modular mới.

Giai đoạn 2: Xây dựng Bộ não (The Brain)

Bước 3 (Library): Tạo src/services/ai_tutor/promptLibrary.js. Đưa Persona Ms. Nova và Master Prompt V23 vào đây.

Bước 4 (Engine): Tạo src/services/ai_tutor/novaEngine.js. Tích hợp gọi API Gemini với chế độ ép JSON Output.

Giai đoạn 3: Xây dựng Khung xương UI (The Shell)

Bước 5 (Main UI): Tạo src/modules/ai_tutor/AITutor.jsx mới với Header và Thanh Tab (5 nút).

Bước 6 (Shared UI): Tạo các component nhỏ trong src/modules/ai_tutor/components/ (Bong bóng chat, ô nhập liệu).

Giai đoạn 4: Hoàn thiện Tính năng (The Soul)

Bước 7 (New Tabs): Viết mới hoàn toàn StoryMissionTab.jsx và FreeTalkTab.jsx theo đúng triết lý V3.

Bước 8 (Legacy Integration): Khôi phục 3 Tab cũ (Pronunciation, Quiz, Debate) từ legacy_archive và đưa vào giao diện mới.

Giai đoạn 5: Kiểm định (The Test)

Bước 9 (Audit): Chạy thử với Syllabus Tuần 1. Kiểm tra xem AI có "nhớ" bối cảnh và có hiện "Gợi ý" đúng lúc không.

Lệnh cho AI: "Tôi là Tổng trưởng. Hãy đọc kỹ file này và bắt đầu thực hiện BƯỚC 1 ngay lập tức."