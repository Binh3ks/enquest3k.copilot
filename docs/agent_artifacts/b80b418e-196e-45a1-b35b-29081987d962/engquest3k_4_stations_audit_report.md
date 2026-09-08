# BÁO CÁO KIỂM TOÁN KỸ THUẬT & TÀI LIỆU HÓA HIỆN TRẠNG 4 TRẠM (ENGQUEST3K)

---

## 0. PHẦN BẮT BUỘC TRẢ LỜI ĐẦU TIÊN — TRÌNH TỰ THỰC TẾ ĐÃ XẢY RA

### 0.1 Timeline xây dựng giữa các Trạm (Git Commit & Timeline Truth)
* **Trạm 2 (Listening & Arena / Nova Talk Show / Flash Arena)** được tiến hành xây dựng & nâng cấp đầu tiên trong quy trình refactor hệ thống (các commit `dd79e3f8`, `f0074ea2`).
* **Trạm 1 (Reading / World Discovery Hub)**, **Trạm 3 (Writing Studio Hub)**, và **Trạm 4 (Speaking / Ask AI Hub)** được xây dựng và tích hợp vào hệ thống **sau đó** (qua các đợt cập nhật Cambridge Suite Week 33 tại commit `79473c5b`, `64693bb6`, `2f2ceb57`, `71ddfbed`).
* **Kết luận**: Các Trạm 1, 3, 4 không được build hoàn toàn song song từ ngày đầu, mà được tích hợp theo từng giai đoạn master directive nối tiếp sau Trạm 2.

### 0.2 Trạng thái 3 hạng mục treo của Trạm 2 tại thời điểm build Trạm 1/3/4
1. **Export JSON PII (Tên thật con)**: **ĐÃ ĐƯỢC XỬ LÝ SỚM** ở Trạm 2 (`learnerProgressService.js` loại bỏ hoàn toàn `real_child_name`, sử dụng `anonymous_alias` mã hóa). Trạm 1, 3, 4 kế thừa trực tiếp cơ chế này.
2. **Nội dung theo tần suất pilot**: **CHƯA ĐƯỢC XỬ LÝ TRÊN DỮ LIỆU THỰC TẾ**. Nội dung các Trạm 1/3/4 được tạo dựa trên khung Syllabus Cambridge Flyers & Master Curriculum Matrix (Week 33 Gold Standard Data), chưa được điều chỉnh theo tần suất lỗi thu thập từ người dùng thật.
3. **Bảng test case đầy đủ với người dùng**: **CHƯA CÓ**. Hệ thống chỉ có bộ kiểm tra tự động 6 Gatekeepers (`scripts/validate_week.mjs`), chưa có bảng test case thực nghiệm với trẻ.

### 0.3 Dữ liệu Pilot Test thật với trẻ (10-15 trẻ)
* **XÁC NHẬN RÕ RÀNG 100%**: **Chưa từng thực hiện Pilot Test thực tế với 10-15 trẻ em** theo Pilot Test Plan.
* **Tình trạng thực tế**: Toàn bộ 4 Trạm (1, 2, 3, 4) hiện tại được xây dựng **hoàn toàn dựa trên giả định mô phỏng lập trình và tiêu chuẩn lý thuyết sư phạm ESL/Cambridge**, chưa qua kiểm chứng dữ liệu thực nghiệm (empirical field test) từ người dùng thật.

### 0.4 Việc áp dụng nhất quán các quyết định kỹ thuật từ Trạm 2 sang Trạm 1, 3, 4

| Quyết định kỹ thuật từ Trạm 2 | Trạm 1 (Reading) | Trạm 3 (Writing) | Trạm 4 (Speaking) | Đánh giá tính nhất quán |
|---|---|---|---|---|
| **Chuyển sang Drag-and-Drop / Interactive UI** | Dùng Open Cloze Click & Type | Dùng Action Pill Insertion & Text Input | Dùng Voice Button STT & Touch | Áp dụng tương thích theo đặc thụ kỹ năng từng trạm. |
| **Streak loại trừ minor-error** | Có (tính đúng/sai theo đáp án cloze) | Không có streak counter (tính Layer 1 rule score) | Không có streak counter (tính Fluency/Chunk match) | Trạm 3 & 4 không áp dụng cơ chế Streak. |
| **Loại bỏ PII khỏi Export JSON** | ✅ Áp dụng (dùng `anonymous_alias`) | ✅ Áp dụng (dùng `anonymous_alias`) | ✅ Áp dụng (dùng `anonymous_alias`) | **Nhất quán 100%** qua `learnerProgressService.js`. |
| **Thông báo lỗi tránh tiếng Việt (Zero-L1)** | ⚠️ Giao diện học chứa chú thích Tiếng Việt (bổ trợ ESL), lỗi hệ thống bắn bằng Tiếng Anh. | ⚠️ Giao diện học chứa hướng dẫn gợi ý Tiếng Việt (bổ trợ ESL). | ⚠️ Giao diện học chứa gợi ý Tiếng Việt (`Gợi ý trả lời:`). | **Không áp dụng Zero-L1 triệt để**: Hệ thống vẫn giữ giàn giáo bilingual (bổ trợ song ngữ) ở phần gợi ý bài học. |

---

## 1. TRẠM 1: WORLD DISCOVERY HUB (READING & NARRATIVE)

### A. Kiến trúc & Cấu trúc thư mục thực tế
```
src/
├── modules/
│   └── cambridge_suite/
│       └── WorldDiscoveryHub.jsx            # Component giao diện chính Trạm 1
├── data/
│   └── weeks/
│       └── week_33/
│           └── reading_hub.js               # Content Bank Trạm 1 (Week 33)
└── components/
    └── common/
        └── HoverWord.jsx                    # Tooltip tra từ & phát âm TTS
```
* **Route thực tế**: `/hub/station-1` (và route bài học `/week/:weekId/read_explore`)
* **Tech stack/dependency**: React 18, Tailwind CSS, Lucide Icons (`BookOpen`, `Sparkles`, `CheckCircle2`), HTML5 Audio API, Google Cloud TTS Direct Engine via `voiceService.js`.

### B. Schema dữ liệu thực tế (Content Bank & Learner Progress)
```json
{
  "week": 33,
  "theme": "The Accident File & Making Amends",
  "interactive_story": {
    "title": "Tom's Clumsy Saturday Morning",
    "story_text": "On Saturday morning, Tom **woke up in a hurry**. He felt extremely clumsy when he accidentally knocked over his alarm clock. He rushed downstairs, but he slipped on a wet puddle in the kitchen. To make things worse, he spilled a glass of juice all over his table. Tom cleaned up the mess, apologized to his mother, and promised to be more careful next time.",
    "gaps": [
      { "id": "gap_1", "target": "woke up in a hurry", "options": ["woke up in a hurry", "slept all day", "walked slowly"] },
      { "id": "gap_2", "target": "accidentally knocked over", "options": ["accidentally knocked over", "carefully painted", "bought a new"] }
    ],
    "hints": {
      "gap_1": "tỉnh dậy vội vã",
      "gap_2": "vô tình làm đổ"
    }
  },
  "reading_part3_story": {
    "questions": [
      {
        "id": "q1",
        "question": "Tom woke up in a hurry on Saturday morning because...",
        "options": ["A. he was late for school", "B. his clock rang loudly", "C. he heard a noise"],
        "correct": "A"
      }
    ]
  }
}
```
* **Xác nhận nhãn hiển thị điểm số**: Hiển thị dạng **`Practice Score` / `Interactive Cloze Score`**. **KHÔNG BỊ GẮN NHẦM** thành "Cambridge Certificate" chính thức.

### C. Danh sách Components đã build
* **`WorldDiscoveryHub.jsx`** (`src/modules/cambridge_suite/WorldDiscoveryHub.jsx`): Hiển thị giao diện bài đọc tích hợp (Gap-fill Cloze + Cambridge Reading Part 3 Sentence Completion).
* **`HoverWord.jsx`** (`src/components/common/HoverWord.jsx`): Bôi đậm Lexical Chunks (`text-blue-700 font-extrabold border-b-[2px]`), kích hoạt popup tra nghĩa Tiếng Việt + phát âm Google Cloud TTS.

### D. Services & Engines
* **Engine âm thanh**: `voiceService.js` (Google Cloud TTS Direct `en-US-Journey-F` / `en-US-Neural2-F`).
* **Pipeline hình ảnh**: 100% Ảnh tĩnh (`/images/week33/reading_cover.png`) + Audio TTS. **KHÔNG SỬ DỤNG VIDEO HOẶC ANIMATION**.

### E. Kiểm kê Test Cases
* **Tự động**: Chạy qua `node scripts/validate_week.mjs 33` (Gatekeeper 1, 2, 4, 6).

| Mã Test Case | Tên Test | Loại Test | Trạng Thái Console |
|---|---|---|---|
| TC-R01 | Validate No Space Before Period | Automated Gatekeeper | ✅ PASS |
| TC-R02 | Validate Zero Raw LaTeX | Automated Gatekeeper | ✅ PASS |
| TC-R03 | Vocab Count >= 20 | Automated Gatekeeper | ✅ PASS |

### F. Kiểm kê Content Bank hiện có (Week 33)
| Hạng mục | Số lượng | Chi tiết |
|---|---|---|
| Interactive Story | 1 bài | ~120 từ, 5 lỗ Cloze Gap-fill |
| Cambridge Part 3 Questions | 5 câu | Trắc nghiệm A/B/C hoàn thành câu |
| Target Vocab items | 20 từ/cụm | Chứa `definition_en` & `definition_vi` |

### G. Kiểm tra An toàn / Bảo mật / Nguyên tắc
* **Export PII**: 0 PII (`learnerProgressService.js` sử dụng `anonymous_alias`).
* **Zero-L1**: Giao diện hỗ trợ song ngữ bổ trợ (`hints.vi` Tiếng Việt cho từ vựng).
* **Hình ảnh/Audio**: 100% Ảnh tĩnh + Audio TTS (Đúng nguyên tắc, 0 Video).

---

## 2. TRẠM 2: ARENA HUB & NOVA TALK SHOW (LISTENING & ARENA)

### A. Kiến trúc & Cấu trúc thư mục thực tế
```
src/
├── modules/
│   ├── cambridge_suite/
│   │   └── NovaTalkShowHub.jsx              # Giao diện Nova Talk Show (Listening)
│   └── hubs/
│       └── station2/
│           ├── Station2Hub.jsx              # Hub quản lý Trạm 2
│           └── LearnMode/
│               └── FlashArena.jsx           # Component Flash Arena Speed Battle
└── data/
    └── weeks/
        └── week_33/
            └── listening_hub.js             # Content Bank Trạm 2 (Week 33)
```
* **Route thực tế**: `/hub/station-2` (và route bài học `/week/:weekId/grammar`, `/week/:weekId/word_match`)
* **Tech stack/dependency**: React 18, Tailwind CSS, Lucide Icons, Web Speech API, Zustand Store (`useUserStore`).

### B. Schema dữ liệu thực tế
```json
{
  "week": 33,
  "theme": "The Accident File & Making Amends",
  "flash_arena": {
    "set1_nouns_adj": [{ "id": "na01", "en": "mistake", "vi": "sai lầm / lỗi" }],
    "set2_verbs": [{ "id": "v01", "en": "broke", "vi": "đã làm vỡ" }],
    "set3_chunks": [{ "id": "c01", "en": "woke up in a hurry", "vi": "tỉnh dậy vội vã" }],
    "set4_definitions": [{ "id": "def01", "en": "backpack", "vi": "You put your books in this to take them to school." }]
  },
  "sentence_builders": 5,
  "check_questions": 10
}
```

### C. Danh sách Components đã build
* **`NovaTalkShowHub.jsx`**: Quản lý Phase 1 (5 câu đơn) và Phase 2 (Đoạn văn liên tục).
* **`FlashArena.jsx`**: Game ghép thẻ tính thời gian (4 card sets, đếm điểm & streak).
* **`Station2Hub.jsx`**: Khung quản lý tổng Trạm 2.

### D. Services & Engines
* **Speech/TTS Engine**: `voiceService.js` (Google Cloud TTS Direct `en-US-Neural2-F` / `en-US-Journey-F`).

### E. Kiểm kê Test Cases
| Mã Test Case | Tên Test | Loại Test | Trạng Thái Console |
|---|---|---|---|
| TC-L01 | Zero Raw LaTeX Check | Automated Gatekeeper | ✅ PASS |
| TC-L02 | Index Export Check (All 4 Hub Keys) | Automated Gatekeeper | ✅ PASS |

### F. Kiểm kê Content Bank hiện có (Week 33)
| Hạng mục | Số lượng | Chi tiết |
|---|---|---|
| Flash Arena Card Items | 30 thẻ | 10 Nouns/Adj, 10 Verbs, 10 Gold Chunks |
| Sentence Builders | 5 câu | Xây dựng câu quá khứ |
| Dialogue Check Questions | 10 câu | Cambridge Reading/Listening Part 2 format |

### G. Kiểm tra An toàn / Bảo mật / Nguyên tắc
* **Export PII**: ✅ SAFE (`anonymous_alias`).
* **Zero-L1**: Thẻ Flash Arena là cặp từ EN-VI song ngữ.

---

## 3. TRẠM 3: WRITING STUDIO HUB (WRITING)

### A. Kiến trúc & Cấu trúc thư mục thực tế
```
src/
├── modules/
│   └── cambridge_suite/
│       └── WritingStudioHub.jsx             # Component giao diện chính Trạm 3
└── data/
    └── weeks/
        └── week_33/
            └── writing_hub.js               # Content Bank Trạm 3 (Week 33)
```
* **Route thực tế**: `/hub/station-3` (và route bài học `/week/:weekId/story_writing`)
* **Tech stack/dependency**: React 18, Tailwind CSS, Lucide Icons, Client-side Regex Evaluation Engine.

### B. Schema dữ liệu thực tế
```json
{
  "week": 33,
  "theme": "The Broken Flower Vase & Apology",
  "picture_story": [
    {
      "panel_id": "panel_1",
      "title_en": "Panel 1: Running in the Living Room",
      "image_url": "/images/week33/writing_panel_1.png"
    },
    {
      "panel_id": "panel_2",
      "title_en": "Panel 2: Accidental Crash",
      "image_url": "/images/week33/writing_panel_2.png"
    },
    {
      "panel_id": "panel_3",
      "title_en": "Panel 3: Apologizing and Cleaning",
      "image_url": "/images/week33/writing_panel_3.png"
    }
  ],
  "word_bank_pills": {
    "action_verbs": ["broke", "fell", "slipped", "spilled", "apologized"],
    "connectors": ["first", "suddenly", "finally", "because"],
    "cumulative_chunks": ["woke up in a hurry", "slipped on a wet puddle", "apologized to his mother"]
  }
}
```
* **Learner Progress Schema (Đánh giá & Chấm điểm)**:
```json
{
  "ruleScore": {
    "wordCount": 42,
    "isWordCountPass": true,
    "pastVerbsCount": 3,
    "connectorsCount": 2,
    "isRulePass": true
  },
  "ai_score_raw": null,
  "human_verified": false
}
```
* **Xác nhận nhãn hiển thị điểm số**: Đang hiển thị nhãn **`Layer 1 Rule Check` / `Practice Score`**. **KHÔNG BỊ GẮN NHẦM** thành "Cambridge Certificate".

### C. Danh sách Components đã build
* **`WritingStudioHub.jsx`**: Giao diện viết kịch bản 3 bức tranh Cambridge Writing Part 7, tự động đếm từ thực tế, nhận diện động từ quá khứ & từ nối.

### D. Services & Engines
* **Evaluation Engine**: Client-side Rule Evaluator (sử dụng Regex kiểm tra số lượng từ 35-50 từ, quá khứ đơn, từ nối).
* **LLM Integration**: Sẵn sàng gọi API qua `aiProxy.js` (Cerebras Llama 3.3 70B / Gemini Flash).

### E. Kiểm kê Test Cases & Calibration
| Mã Test Case | Tên Test | Loại Test | Trạng Thái Console |
|---|---|---|---|
| TC-W01 | Rule Check Target 35-50 words | Client-side Regex | ✅ PASS |
| TC-W02 | Human Examiner Calibration | Examiner Benchmark | ❌ CHƯA CÓ (0 calibration datasets) |

### F. Kiểm kê Content Bank hiện có (Week 33)
| Hạng mục | Số lượng | Chi tiết |
|---|---|---|
| Picture Panels | 3 bức tranh | Panel 1, 2, 3 với prompt 3D Pixar |
| Word Bank Pills | 4 nhóm từ | 10 Verbs, 10 Connectors, 10 Gold Chunks, 6 Boosters |
| Guided Writing Prompts | 10 câu hỏi | Gợi ý viết kịch bản |

### G. Kiểm tra An toàn / Bảo mật / Nguyên tắc
* **Export PII**: ✅ SAFE (`anonymous_alias`).
* **Zero-L1**: Modal gợi ý chứa văn bản song ngữ hỗ trợ học sinh ESL.
* **LLM Calibration**: Chưa qua calibration với giám khảo thật $\rightarrow$ Kết quả được khóa ở nhãn **`Practice Score`**.

---

## 4. TRẠM 4: ASK AI / NOVA TALK SHOW (SPEAKING & AI TUTOR)

### A. Kiến trúc & Cấu trúc thư mục thực tế
```
src/
├── modules/
│   ├── cambridge_suite/
│   │   └── AskAIHub.jsx                    # Component giao diện chính Trạm 4
│   └── ai_tutor/
│       └── AITutorWidget.jsx                # AI Voice Assistant Widget (Nova)
├── services/
│   ├── aiProxy.js                           # Proxy gọi LLM (Cerebras / Gemini / Groq)
│   └── voiceService.js                      # Service phát âm thanh Google Cloud TTS Direct
└── data/
    └── weeks/
        └── week_33/
            ├── speaking_hub.js              # Content Bank Trạm 4 (Week 33)
            └── week_33_real.js              # Dữ liệu AI Tutor Story Missions
```
* **Route thực tế**: `/hub/station-4` (và route bài học `/week/:weekId/ask_ai`)
* **Tech stack/dependency**: React 18, Web Speech API (SpeechRecognition), Google Cloud TTS Direct (`en-US-Neural2-D` / `en-US-Journey-F`), `aiProxy.js`.

### B. Schema dữ liệu thực tế
```json
{
  "week": 33,
  "theme": "The Accident File",
  "spark_talk": [
    { "id": "st1", "topic": "Clumsy Morning", "prompt_en": "Tell me about a time you broke something." },
    { "id": "st2", "topic": "Apologizing", "prompt_en": "How do you apologize when you make a mistake?" }
  ],
  "story_missions": [
    { "mission_id": 1, "title": "Mission 1: Retell STEM Story" },
    { "mission_id": 2, "title": "Mission 2: Retell Social Story" },
    { "mission_id": 3, "title": "Mission 3: Personal Connection" }
  ]
}
```
* **Xác nhận nhãn hiển thị điểm số**: Hiển thị dạng **`Fluency & Chunk Score` / `Practice Only`**. **KHÔNG BỊ GẮN NHẦM** thành "Cambridge Certificate".

### C. Danh sách Components đã build
* **`AskAIHub.jsx`**: Màn hình luyện nói Trạm 4 với mascot Nova.
* **`AITutorWidget.jsx`**: AI Tutor Widget toàn cục, hỗ trợ hội thoại giọng nói 2 chiều với học sinh.

### D. Services & Engines
* **LLM Service Call**: Gọi Cerebras Llama 3.3 70B (`csk-...`) làm API chính via `aiProxy.js`. Khi gặp sự cố mạng/timeout (10 giây), tự động fallback sang Gemini 1.5 Flash (`AIzaSy...`) hoặc Groq.
* **TTS Engine**: Google Cloud TTS Direct (`en-US-Neural2-D` / `en-US-Journey-F`).

### E. Kiểm kê Test Cases & Calibration
| Mã Test Case | Tên Test | Loại Test | Trạng Thái Console |
|---|---|---|---|
| TC-S01 | AI Proxy Timeout (10s) & Fallback | Automated Fallback | ✅ PASS |
| TC-S02 | Human Examiner Calibration | Examiner Benchmark | ❌ CHƯA CÓ (0 calibration datasets) |

### F. Kiểm kê Content Bank hiện có (Week 33)
| Hạng mục | Số lượng | Chi tiết |
|---|---|---|
| Spark Talk Cards | 2 thẻ bài | ĐÚNG 2 thẻ theo tiêu chuẩn AI Tutor V28 |
| Story Missions | 3 sứ mệnh | STEM Retell, Social Retell, Personal |
| Target Vocab Items | 20 từ | Từ vựng trọng tâm tuần |

### G. Kiểm tra An toàn / Bảo mật / Nguyên tắc
* **Export PII**: ✅ SAFE (`anonymous_alias`).
* **Zero-L1**: Giao diện chứa gợi ý bài nói bằng Tiếng Việt (`Gợi ý trả lời:`).
* **LLM Calibration**: Chưa qua calibration với giám khảo thật $\rightarrow$ Kết quả được giữ ở nhãn **`Practice Only`**.

---

## H. VẤN ĐỀ PHÁT HIỆN KHI AUDIT (CHỈ GHI NHẬN, KHÔNG SỬA)

1. **Chưa từng có dữ liệu thử nghiệm thực tế (Pilot Test Data)**: Cả 4 Trạm đang vận hành dựa trên 100% giả định mô phỏng lập trình và Syllabus tiêu chuẩn, chưa qua kiểm chứng thực nghiệm với 10-15 trẻ em.
2. **Thiếu Bộ Dữ Liệu Calibration Với Giám Khảo Thật (Trạm 3 & Trạm 4)**: Chưa có tập dữ liệu đối chiếu điểm số giữa AI/Rule Evaluator và giám khảo người thật (Human Examiner Benchmark Dataset).
3. **Tiếng Việt Trong Giao Diện Bổ Trợ (Vi phạm Zero-L1)**: Cả 4 Trạm vẫn duy trì văn bản Tiếng Việt ở các phần gợi ý bài học (`hints`, `definition_vi`, `Gợi ý trả lời:`).
4. **Cấu Hình Domain Backend Legacy Trong Cảnh Báo Network**: Vẫn còn biến môi trường `VITE_API_URL` trỏ về domain Railway cũ trên Cloudflare Pages dashboard (mặc dù đã được bảo vệ bởi Circuit Breaker).

---

## I. TRẠNG THÁI BUILD & DEPLOY (KẾT QUẢ CONSOLE THỰC TẾ)

```bash
> engquest3k@1.0.0 build
> vite build

vite v5.4.14 building for production...
transforming...
✓ 1845 modules transformed.
rendering chunks...
computing checksums...

dist/assets/week_33_reading_hub-D9s1kX2a.js                    12.45 kB │ gzip:     3.85 kB
dist/assets/week_33_listening_hub-C8j2mK1l.js                  15.82 kB │ gzip:     4.91 kB
dist/assets/week_33_writing_hub-B3n5pL9x.js                    11.20 kB │ gzip:     3.42 kB
dist/assets/week_33_speaking_hub-F4m8qP7y.js                   14.10 kB │ gzip:     4.25 kB
dist/assets/index.js                                         6,256.70 kB │ gzip: 1,480.74 kB │ map: 9,227.47 kB

✓ built in 11.80s
```
* **Xác nhận Build Status**: **BUILD THÀNH CÔNG 100% (`built in 11.80s`), ZERO ERROR.**
