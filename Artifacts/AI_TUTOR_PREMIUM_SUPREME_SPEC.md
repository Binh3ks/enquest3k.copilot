👑 TỔNG LỆNH TÁI THIẾT AI TUTOR PREMIUM (MS. NOVA V5)

Tài liệu này quy định kiến trúc của một Hệ thống Trợ lý AI Toàn cầu với khả năng đa nền tảng (Multi-provider) và âm thanh sống động (Advanced TTS).

🏗️ 1. KIẾN TRÚC HỆ THỐNG "NATIVE AI"

A. Giao diện Người dùng (UI/UX) - Nút Nổi Toàn cầu

AITutorWidget.jsx: Thay thế trang AITutor cũ. Đây là một nút nổi (Floating Button) có mặt ở tất cả các trang của App.

Tính năng Widget: Khi bấm vào nút, mở ra một cửa sổ nhỏ (Mini-dashboard) chứa 5 Tab: Story, Free Talk, Pronun, Quiz, Debate.

Persistence: Cửa sổ này phải giữ nguyên trạng thái hội thoại khi người dùng chuyển trang.

B. Tầng Xử lý Nội dung (AI Content Router)

Tạo file src/services/ai_tutor/aiRouter.js với logic:

Priority 1: Groq (Llama-3) - Dùng cho phản hồi siêu tốc.

Fallback: Gemini 2.0 Flash - Dùng khi Groq lỗi hoặc cần xử lý ngữ cảnh Syllabus cực lớn.

C. Tầng Âm thanh (Multi-layered TTS Engine)

Tạo file src/services/ai_tutor/ttsEngine.js với thứ tự Fallback nghiêm ngặt:

Layer 1: Gemini TTS (Giọng nói tự nhiên nhất).

Layer 2: OpenAI TTS (Whisper/TTS-1) - Nếu Layer 1 lỗi.

Layer 3: Puter.js TTS - Giải pháp dự phòng đám mây.

Layer 4: Browser Speech Synthesis - Giải pháp cuối cùng (Offline).

🛠️ 2. CHI TIẾT CÁC MODULE CHỨC NĂNG

Tầng Dịch vụ (src/services/ai_tutor/)

novaEngine.js: Điều phối Router nội dung và TTS. Đảm bảo ép đầu ra JSON theo Schema Ms. Nova.

promptLibrary.js: Chứa Persona Ms. Nova V3 (Wit, Engaging, Concise).

tutorStore.js: Zustand store quản lý isWidgetOpen, activeTab, messages, currentAudioUrl.

Tầng Giao diện (src/modules/ai_tutor/)

components/FloatingButton.jsx: Nút tròn có icon Ms. Nova.

components/TutorWindow.jsx: Cửa sổ chat chính.

tabs/StoryMissionTab.jsx: Viết mới - Đồng bộ hóa với Syllabus tuần qua MCP Tools.

tabs/FreeTalkTab.jsx: Viết mới - Hội thoại linh hoạt có cơ chế Recast (Sửa lỗi gián tiếp).

⚖️ 3. QUY TẮC SƯ PHẠM BẮT BUỘC

Auto-Play Voice: Mọi phản hồi của AI phải tự động phát âm thanh qua TTS.

Talk Ratio: AI nói < 0.8 lần User.

Scaffolding: Hệ thống gợi ý 3 bước tích hợp sẵn trong UI (Suggested Hints).

📅 4. KẾ HOẠCH TRIỂN KHAI 6 BƯỚC (QUYẾT ĐỊNH)

AI Agent phải thực hiện tuần tự và không được nhảy bước:

BƯỚC 1: THANH TRỪNG & LÀM SẠCH (THE PURGE)

Di chuyển TOÀN BỘ file trong src/modules/ai_tutor/ và src/services/aiTutor/ vào src/legacy_archive/.

Xóa bỏ các file rác _OLD, _BACKUP, copy để làm sạch Context của AI.

BƯỚC 2: THIẾT LẬP CƠ SỞ HẠ TẦNG (SERVICES)

Xây dựng aiRouter.js (Groq/Gemini) và ttsEngine.js (4 layers).

Tạo tutorStore.js để quản lý trạng thái Widget toàn cầu.

BƯỚC 3: DỰNG GIAO DIỆN WIDGET NỔI (GLOBAL UI)

Tạo AITutorWidget.jsx và nhúng nó vào App.jsx để hiển thị trên toàn ứng dụng.

Thiết kế giao diện Chat chuyên nghiệp, tối ưu cho cả Mobile.

BƯỚC 4: VIẾT MỚI STORY & FREE TALK (THE SOUL)

Thực hiện logic Story bám sát Syllabus.

Thực hiện logic Free Talk với khả năng "Recast" (Nhắc lại câu đúng).

BƯỚC 5: HỢP NHẤT LEGACY TABS (INTEGRATION)

Đưa logic Pronunciation, Quiz, Debate cũ vào giao diện Widget mới.

Nâng cấp chúng để sử dụng chung ttsEngine.js.

BƯỚC 6: KIỂM ĐỊNH TỔNG THỂ (FINAL AUDIT)

Chạy thử nghiệm thực tế. Kiểm tra khả năng Fallback của AI và TTS.

Tối ưu hóa Token (< 1500 tokens/lượt chat).