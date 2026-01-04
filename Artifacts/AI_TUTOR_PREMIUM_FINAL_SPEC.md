👑 MASTER SPEC: GLOBAL AI TUTOR PREMIUM (MS. NOVA V5.1)

Tài liệu này là nguồn sự thật duy nhất. AI Agent phải sử dụng bộ khung Modular hiện có và nâng cấp các tầng "Brain", "Voice" và "Content".

🏗️ 1. GIAO DIỆN SPEAKING-FIRST (MIC PRIORITY)

Global Widget: Sử dụng AITutorWidget.jsx (đã có) làm điểm neo toàn cầu.

Mic Button: * Tại InputBar.jsx, mặc định hiển thị nút Microphone lớn (màu xanh Indigo/Purple).

Khi người dùng bấm Mic: Kích hoạt Web Speech API để lắng nghe (Speech-to-Text).

Chỉ khi người dùng bắt đầu gõ phím, nút Mic mới thu nhỏ lại và hiện nút Send.

Audio Autoplay: Phản hồi của AI phải tự động phát âm thanh ngay lập tức mà không đợi bấm nút Play.

🧠 2. BỘ NÃO ĐA TẦNG (LLM ROUTER LOGIC)

Cập nhật src/services/ai_tutor/ai_router.js:

Layer 1 (Default): Groq (model: llama-3.1-70b-versatile) * Mục đích: Phản hồi siêu tốc (< 500ms) cho Free Talk.

Layer 2 (Fallback): Gemini 2.0 Flash * Mục đích: Khi Groq lỗi (Rate limit) hoặc khi cần phân tích Syllabus phức tạp.

Context Guard: Luôn gửi kèm studentName, currentWeek, và SyllabusData trong mỗi request.

🔊 3. GIỌNG NÓI ĐA TẦNG (TTS ENGINE LOGIC)

Cập nhật src/services/ai_tutor/tts_engine.js:

Priority 1: Gemini TTS (Giọng Kore/Aoede - Tự nhiên nhất).

Priority 2: OpenAI TTS (model: tts-1, voice: nova).

Priority 3: Puter.js TTS (puter.ai.txt2speech).

Priority 4: Browser API (window.speechSynthesis).

📝 4. NỘI DUNG THẬT (REAL SYLLABUS DATA)

AI Agent phải chuyển đổi nội dung từ tệp 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt thành tệp:

File: src/data/weeks/week_01_real.js

Cấu trúc: ```javascript
export const week1Data = {
week_id: 1,
topic: "First Day at School",
target_vocab: ["teacher", "student", "classroom", "backpack", "pencil"],
grammar: "Present Simple (to be)",
story_mission: "Bạn là học sinh mới, hãy làm quen với cô giáo Ms. Nova và tìm chiếc cặp sách bị mất."
};




📅 5. KẾ HOẠCH TRIỂN KHAI 3 BƯỚC (DÀNH CHO COPILOT)

BƯỚC 1: KÍCH HOẠT ĐA TẦNG (SERVICES)

Hoàn thiện ai_router.js (Groq + Gemini) và tts_engine.js (4 layers).

Đảm bảo useUserStore được import đúng dạng named export.

BƯỚC 2: CÀI ĐẶT MIC & SPEAKING UI

Thêm logic ghi âm vào AITutor.jsx hoặc InputBar.jsx.

Tích hợp hiệu ứng sóng âm (Waveform) khi đang nghe học sinh nói.

BƯỚC 3: ĐƯA NỘI DUNG THẬT VÀO GIẢNG DẠY

Tạo file week_01_real.js.

Ms. Nova phải dùng chính xác nhân vật và từ vựng trong file này để bắt đầu câu chuyện.