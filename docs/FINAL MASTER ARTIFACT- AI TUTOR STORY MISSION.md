📘 FINAL MASTER ARTIFACT: AI TUTOR STORY MISSION
Version: 5.0 (Objective-Driven Architecture) Status: APPROVED FOR IMPLEMENTATION Core Philosophy: "Deterministic Rails, Human-like Flexibility"

I. TRIẾT LÝ CỐT LÕI & SƯ PHẠM (THE SOUL)
Content-Aware (Nhận thức nội dung): Ms. Nova không nói chuyện phiếm. Mọi câu hỏi, từ vựng, và ngữ pháp cô dùng phải nằm trong Syllabus của tuần hiện tại.

Production-Oriented (Hướng sản phẩm): Mục tiêu là khiến học sinh nói. Nếu học sinh thụ động, Ms. Nova thất bại.

Flexible Steering (Lái chuyện linh hoạt): Khác với chatbot kịch bản cứng nhắc, Ms. Nova cho phép học sinh hỏi ngược lại. Cô sẽ trả lời, sau đó dùng kỹ thuật "Cầu nối" (Bridge) để khéo léo đưa học sinh trở lại bài học.

The "One Brain" Principle: TurnManager là bộ não duy nhất quyết định trạng thái hội thoại. AI (LLM) chỉ là công cụ sinh nội dung theo chỉ đạo của TurnManager.

II. KIẾN TRÚC HỆ THỐNG: "THE 3-LAYER BRAIN"
Hệ thống được chia làm 3 lớp tách biệt để đảm bảo tính ổn định và linh hoạt.

Lớp 1: Dữ liệu (The Rails - Syllabus Data)
Chứa định nghĩa bài học. Không còn lưu "Câu hỏi cứng" (Strings), mà lưu Mục tiêu Hội thoại (Objectives).

Cấu trúc dữ liệu mẫu (Week 1):

JavaScript

export const storyMissionData = {
  id: 1,
  topic: "First Day at School",
  constraints: {
    vocabulary: ["teacher", "student", "book", "pen", "hello", "school", "class"],
    grammar: ["My name is...", "I am...", "It is a..."],
    tone: "warm, encouraging, patient"
  },
  objectives: [
    { id: "greet", goal: "Greeting & Name", context: "Introduce self as Ms. Nova." },
    { id: "age", goal: "Ask Age", context: "Natural follow-up." },
    { id: "role", goal: "Confirm Student Role", context: "Are you a student?" },
    { id: "school_name", goal: "Ask School Name", context: "Where do you study?" },
    { id: "grade", goal: "Ask Grade Level", context: "What grade?" },
    { id: "feeling", goal: "Check Emotion", context: "Do you like school?" },
    // ... đủ 10 objectives
    { id: "goodbye", goal: "End Conversation", type: "termination" }
  ]
};
Lớp 2: Điều phối (The Conductor - TurnManager)
Đây là một State Machine. Nó quản lý con trỏ currentObjectiveIndex và xử lý logic "Parking".

Logic Xử lý Turn:

Nhận Input từ học sinh.

Phân loại Input (AI hoặc Regex): ANSWER (Trả lời) hoặc QUESTION (Hỏi ngược).

Nếu là ANSWER:

Kiểm tra xem câu trả lời có hợp lệ/đủ ý không.

Tăng currentObjectiveIndex (+1).

Lệnh cho AI: "ACK -> RECAST -> Hỏi mục tiêu tiếp theo".

Nếu là QUESTION (Reverse Q&A):

GIỮ NGUYÊN currentObjectiveIndex.

Lệnh cho AI: "Trả lời câu hỏi của học sinh -> Dùng cầu nối (Bridge) -> Hỏi lại mục tiêu hiện tại".

Kiểm soát giới hạn (Limits):

Soft Limit: 10 Objectives hoàn thành -> Goodbye.

Hard Limit: 15 Turns tổng cộng -> Cưỡng chế Goodbye (để tránh lặp vô tận).

Lớp 3: Sáng tạo (The Creator - AI Prompt)
AI nhận lệnh từ TurnManager và sinh ra JSON response. AI chịu trách nhiệm tạo Hints để đảm bảo khớp 100% với câu hỏi nó vừa nghĩ ra.

III. QUY TẮC PROMPT & OUTPUT (THE PROTOCOL)
Prompt gửi lên AI (Gemini/Groq) phải tuân thủ nghiêm ngặt định dạng sau.

1. System Prompt Structure
Plaintext

ROLE: You are Ms. Nova, an AI ESL Tutor for kids (A0-A1 level).
CONTEXT: Week {weekId} - Topic: {topic}.
VOCAB POOL: {vocabulary list}. (MUST PRIORITIZE THESE WORDS).
GRAMMAR: {grammar list}.

CURRENT STATE:
- User Status: {answer/question/off-topic}
- Current Objective: "{objective.goal}" ({objective.context})

INSTRUCTIONS:
1. IF User Answered: Acknowledge (ACK), Recast their sentence slightly better, then move to Current Objective.
2. IF User Asked: Answer briefly, use a Bridge ("By the way...", "So..."), then ASK the Current Objective question.
3. GENERATE HINTS: Create 3 hints that match YOUR generated question exactly.

OUTPUT JSON ONLY:
{
  "ack": "Great job!",
  "recast": "Yes, you are a student.",
  "bridge": "", 
  "question": "Do you like your school?",
  "hints": ["I like...", "school", "yes/no"]
}
2. Output Fields Definition
ack: Phản hồi cảm xúc ngắn (Wow, Great, I see).

recast: Sửa lỗi ngữ pháp nhẹ nhàng cho câu nói trước của học sinh (Implicit Feedback).

bridge: (Chỉ dùng khi học sinh hỏi ngược) Câu dẫn dắt để quay lại chủ đề.

question: Câu hỏi chính để đạt được Objective. Phải đơn giản, A0.

hints: Mảng 3 gợi ý (Scaffolding). Bắt buộc AI tự sinh để khớp với question.

IV. CÁC QUY LUẬT BẤT BIẾN (THE LAWS - UPDATED)
Đây là các quy tắc "Cứng" (Hard-coded Guards) để bảo vệ hệ thống:

LAW 1: ONE BRAIN (TurnManager Sovereignty)
Chỉ duy nhất một instance TurnManager được tồn tại trong suốt phiên (Session).

missionId phải luôn được ép kiểu Number để tránh lỗi NaN.

Không module nào khác (UI, Engine) được phép tự ý thay đổi stepIndex.

LAW 2: DETERMINISTIC FINISH (Goodbye is Goodbye)
Khi TurnManager chạm đến objective goodbye:

AI Prompt chuyển sang chế độ "Say Goodbye ONLY".

Hệ thống vô hiệu hóa khả năng nhận input mic/text của học sinh.

Hiển thị nút "Complete Mission".

Tuyệt đối không có "Follow-up questions" hay "Zombie loops" sau khi đã Goodbye.

LAW 3: SYLLABUS ENFORCEMENT (Data Integrity)
AI không được phép "bịa" ra từ vựng quá khó (C1/C2).

Hệ thống sẽ inject danh sách Vocab của tuần vào Prompt và yêu cầu AI ưu tiên sử dụng.

Nếu AI hỏi lạc đề quá xa so với Current Objective, học sinh có quyền bấm "Hint" để thấy câu hỏi đúng hướng.

LAW 4: THE 15-TURN CAP (Anti-Loop)
Dù học sinh hỏi ngược nhiều thế nào, hội thoại không bao giờ vượt quá 15 turns.

Tại Turn 15, TurnManager sẽ cưỡng chế set nextObjective = goodbye.

V. KẾ HOẠCH TRIỂN KHAI (ACTION PLAN)
Các bước thực hiện để nâng cấp hệ thống hiện tại lên chuẩn Master Artifact này:

Refactor Data: Xóa file week1_first_day.js cũ. Tạo week1_objectives.js theo cấu trúc mới.

Upgrade TurnManager: Viết lại class TurnManager để xử lý State (Answer/Question) và Logic Parking.

Upgrade NovaEngine: Sửa novaPromptBuilder để tạo dynamic prompt dựa trên Objective và Context.

Wiring: Kết nối lại StoryMissionTab với Engine mới. Đảm bảo ID được truyền đúng.

Test: Kiểm thử kịch bản "Hỏi ngược" (Student asks question) để đảm bảo AI lái về đúng bài.

Tài liệu này là nguồn sự thật duy nhất (Single Source of Truth) cho tính năng Story Mission kể từ thời điểm này