🗺️ LỘ TRÌNH HOÀN THIỆN AI TUTOR (MS. NOVA) - BẢN CHI TIẾT V6

Tài liệu này tập trung vào việc sửa lỗi logic Audio, kích hoạt Auto-send cho Mic và nạp dữ liệu thật từ Syllabus.

BƯỚC 1: FIX HẠ TẦNG ÂM THANH (AI TTS CẤP ĐỘ PREMIUM)

Vấn đề: Log báo thành công nhưng thực tế vẫn chạy Browser TTS hoặc im lặng do sai định dạng dữ liệu (PCM vs WAV).

[ ] Cập nhật src/services/ai_tutor/tts_engine.js:

Gemini TTS: PHẢI tích hợp hàm encodeWAV(pcmData, sampleRate) để đóng gói dữ liệu PCM16 (24kHz) từ Gemini vào header WAV chuẩn. Trình duyệt không thể phát PCM thô.

OpenAI TTS: Đảm bảo nhận đúng responseType: 'arraybuffer' và chuyển thành Blob audio/mpeg.

Cơ chế Ưu tiên: Chỉ fallback về Browser TTS khi TẤT CẢ các API (Gemini/OpenAI/Puter) trả về lỗi thực sự, không phải do lỗi code xử lý buffer.

[ ] Sửa src/utils/AudioHelper.js:

Viết hàm playAudioBuffer(buffer, mimeType) dùng AudioContext để phát trực tiếp thay vì tạo thẻ <audio> rác.

Đảm bảo giải phóng bộ nhớ (cleanup) sau khi phát xong để tránh lag widget.

BƯỚC 2: NÂNG CẤP VOICE UX (SPEAKING-FIRST & AUTO-SEND)

Vấn đề: Nút Mic đã có nhưng người dùng vẫn phải bấm Send thủ công, làm mất mạch hội thoại.

[ ] Cập nhật src/modules/ai_tutor/components/InputBar.jsx:

Auto-send Logic: Thêm useEffect theo dõi transcript. Khi người dùng ngừng nói (silence detection) khoảng 1.5 giây, tự động gọi onSendMessage(transcript) và reset bộ nhận diện.

Visual State: Khi Mic đang lắng nghe, icon Ms. Nova trên nút nổi hoặc nút Mic phải có hiệu ứng "Pulse" hoặc "Waveform" Indigo.

Bàn phím: Nếu người dùng gõ phím, lập tức tắt Mic (abort) và ưu tiên chế độ gõ.

BƯỚC 3: NẠP NỘI DUNG THẬT (REAL SYLLABUS INTEGRATION)

Vấn đề: AI vẫn đang dùng nội dung placeholder hoặc dữ liệu cũ, không đúng với trình độ Hero Academy.

[ ] Tạo src/data/weeks/week_01_real.js:

Đọc file 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt.

Trích xuất:

Topic: First Day at School.

Target Vocab: name, teacher, student, classroom, backpack, pencil.

Grammar: Present Simple (am/is/are).

Story Mission: Ms. Nova chào đón "Young Hero" và yêu cầu tìm chiếc cặp sách thần kỳ (Magic Backpack) để bắt đầu hành trình.

[ ] Cập nhật weekData.js: Đảm bảo logic load dữ liệu luôn ưu tiên file _real.js này.

BƯỚC 4: FIX LỖI API 400 & SCHEMA (RELIABILITY)

Vấn đề: Nhật ký log báo lỗi 400 (Bad Request) khi gọi Groq/Gemini.

[ ] Sửa src/services/ai_tutor/aiRouter.js:

Kiểm tra lại cấu hình generationConfig. Đảm bảo responseMimeType: "application/json" đi kèm với một systemInstruction cực kỳ rõ ràng về Schema.

Fix lỗi truyền history. Gemini 2.0 yêu cầu format role: "user" | "model". Đảm bảo không truyền role "ai" hay "system" vào mảng contents.

Recast Logic: Ms. Nova phải nhắc lại câu đúng (ví dụ: "I is Bing" -> "Great! You are Bing. Nice to meet you!").

Lệnh cho AI Agent: "Cập nhật trạng thái từng đầu mục vào @FINAL_STRIKE_PLAN.md. Tuyệt đối không xóa logic Modular đang chạy tốt. Chỉ tập trung lắp ráp phần âm thanh và dữ liệu."