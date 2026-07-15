# 🔧 ENGQUEST UPGRADE IMPLEMENTATION CONTEXT
**Dành cho: Agent/Phiên chat mới thực hiện các nâng cấp theo kế hoạch**
**Ngày tạo: 08/04/2026**
**⚠️ TRẠNG THÁI (cập nhật tháng 4/2026): PHẦN LỚN ĐÃ HOÀN THÀNH**

> **LƯU Ý CHO AGENT MỚI**: File này là tài liệu lập kế hoạch cho Sprints 1-4 (infrastructure).
> Hầu hết hạng mục đã được triển khai:
> - S1.1 ✅ `tools/qa_check.js` | S1.2 ✅ `srsEngine.js` + `wordMemoryBank.js`
> - S1.3 ✅ `writingRubric.js` | S2.1/S2.2 ✅ UI components
> - S3.1 ✅ `PlacementTest.jsx` | S3.2 ✅ Checkpoints W14/W26/W36/W54
> - S4.2 ✅ `adaptiveEngine.js` | S4.3 ✅ `ParentDashboard.jsx`
> - S3.3 ✅ `topic_talk_prompt` W8-W29 đã có (42 writing.js files + W29 golden)
> - S4.1 ✅ Cambridge CEFR tags W1-W29 trong `metadata.js`
> - S5 ❌ **Content W30-W54 = VIỆC CHÍNH CÒN LẠI** — xem `0. NEW_AGENT_ONBOARDING_PROMPT.md`
>
> **Nếu mục tiêu của bạn là tạo nội dung tuần mới → đọc `0. NEW_AGENT_ONBOARDING_PROMPT.md`, KHÔNG phải file này.**

---

## ⚠️ CẢNH BÁO ĐỌC ĐẦU TIÊN

Bạn đang làm việc trên một **app đang vận hành thật** (production) với ~28 tuần nội dung đã deploy lên Cloudflare Pages. Mọi thay đổi sai schema, sai field name, hoặc sai file path **sẽ làm hỏng app ngay lập tức cho học sinh thật**. Đọc TOÀN BỘ file này trước khi gõ bất kỳ dòng code nào.

---

## 📍 MỤC LỤC

1. [Trạng thái hiện tại của app](#1-trạng-thái-hiện-tại)
2. [Kiến trúc tổng thể](#2-kiến-trúc-tổng-thể)
3. [Schema chuẩn — các file JS per week](#3-schema-chuẩn)
4. [Rules không được vi phạm](#4-critical-rules)
5. [Danh sách 15 gaps cần fix](#5-danh-sách-gaps)
6. [Kế hoạch triển khai theo Sprint](#6-sprint-plan)
7. [Hướng dẫn cho từng Feature mới](#7-feature-specs)
8. [Files tham chiếu bắt buộc](#8-reference-files)
9. [Quy trình làm việc an toàn](#9-safe-workflow)
10. [Xác nhận khi onboard xong](#10-confirmation)

---

## 1. TRẠNG THÁI HIỆN TẠI

### Workspace
```
/Users/binhnguyen/Downloads/Engquest3k/
```

### Git status
- Branch: `main`
- Last commit: `d5367e5` — Fix min_words in writing.js to match standards (6 files)
- Deployed: Cloudflare Pages (auto-deploy từ git push)

### Content hiện có (đã deploy)
```
Advanced mode: src/data/weeks/week_01 → week_28  (28 tuần)
Easy mode:     src/data/weeks_easy/week_01 → week_28  (28 tuần)
AI Tutor:      src/data/weeks/week_NN_real.js  (W1-W28)
```

### Tuần đã verified sạch lỗi (sau commit d5367e5):
- **Tất cả W1-W28** đều đúng chuẩn Blueprint:
  - Advanced min_words = 40, Easy min_words = 30 ✅
  - explore.js: dùng `check_questions` + `question:` field ✅
  - read.js: dùng `comprehension_questions` (không phải check_questions) ✅
  - logic_science.js: 5 câu minimum ✅
  - W22 logic_science: không còn duplicate W21 ✅

### Công nghệ stack
- **Frontend**: React (Vite)
- **Hosting**: Cloudflare Pages (auto-deploy từ GitHub main branch)
- **Audio**: Deepgram Worker (on-demand TTS, cache R2) — W16+
- **Images**: Cloudflare R2 CDN
- **AI**: GPT-4o (Ask AI, Writing feedback)

---

## 2. KIẾN TRÚC TỔNG THỂ

### Cấu trúc thư mục data
```
src/data/
├── weeks/                      ← Advanced mode
│   ├── metadata.js             ← Danh sách tất cả tuần (PHẢI update khi thêm tuần)
│   ├── index.js                ← Export router
│   ├── week_01/                ← Mỗi tuần = 1 folder
│   │   ├── index.js
│   │   ├── read.js
│   │   ├── vocab.js
│   │   ├── word_power.js
│   │   ├── grammar.js
│   │   ├── dictation.js
│   │   ├── shadowing.js
│   │   ├── ask_ai.js
│   │   ├── explore.js
│   │   ├── writing.js
│   │   ├── daily_watch.js
│   │   ├── word_match.js
│   │   ├── mindmap.js          ← W16+ only
│   │   ├── games.js            ← W16+ only
│   │   ├── logic_science.js    ← W16+ (thay logic.js)
│   │   └── singapore_math.js   ← W16+ (thay logic.js)
│   ├── week_01_real.js         ← AI Tutor data (V28 format)
│   └── ...
├── weeks_easy/                 ← Easy mode (cùng cấu trúc)
│   ├── index.js
│   ├── week_01/
│   └── ...
└── weekData.js                 ← Main router, load week data

src/components/
├── tabs/                       ← Tab components (ReadExplore, LogicLab, etc.)
│   ├── TabbedLogicLab.jsx
│   ├── TabbedReadExplore.jsx
│   └── ...
├── AITutor.jsx
├── StoryMissionTab.jsx         ← Cần update khi thêm tuần mới
├── FreeTalkTab.jsx             ← Cần update khi thêm tuần mới
└── ...
```

### File counts per week (CRITICAL — sai là app crash)
```
W1-W15:  13 files/mode = read, vocab, word_power, grammar, dictation, shadowing,
                          ask_ai, explore, writing, daily_watch, word_match, index + week_XX.js root
W16+:    16 files/mode = 13 trên + mindmap.js + games.js + logic_science.js + singapore_math.js
                          (KHÔNG còn logic.js đơn)
AI Tutor: 1 file         = week_NN_real.js (nằm trong weeks/ folder, TRONG subfolder week_NN/)
```

### Golden Standards (template để clone)
```
AI Tutor W16+:  src/data/weeks/week_16_real.js   (V28 format)
Stations W16+:  src/data/weeks/week_16/*.js       (16 files — CLONE NÀY cho W17+)
Stations W1-15: src/data/weeks/week_06/*.js       (legacy 13-file template)
Easy W16+:      src/data/weeks_easy/week_16/*.js  (16 files — CLONE NÀY cho Easy W17+)
```

---

## 3. SCHEMA CHUẨN

### 3.1 read.js (Tab Read & Explore — Reading panel)
```javascript
export default {
  title: "...",
  image_url: "/images/weekNN/read_cover_wNNN.jpg",
  audio_url: "/audio/weekNN/read_main.mp3",
  content_en: `... **bold word** ... (10 bold words bắt buộc)`,
  content_vi: `... **từ đậm** ...`,
  comprehension_questions: [   // ← ĐÚNG: comprehension_questions (KHÔNG PHẢI check_questions)
    {
      id: 1,
      question_en: "...",
      answer: ["...", "..."],  // array các accepted answers
      hint_en: "...",
      hint_vi: "..."
    }
  ]
};
```

### 3.2 explore.js (Tab Read & Explore — Explore panel)
```javascript
export default {
  title_en: "...",
  title_vi: "...",
  image_url: "/images/weekNN/explore_cover_wNNN.jpg",
  audio_url: "/audio/weekNN/explore_main.mp3",
  content_en: `... **bold word** ... (10 bold words bắt buộc)`,
  content_vi: `...`,
  check_questions: [           // ← ĐÚNG: check_questions (KHÔNG PHẢI comprehension_questions)
    {
      id: 1,
      question_en: "...",      // ← ĐÚNG: question_en (KHÔNG PHẢI question:)
      question_vi: "...",
      answer: ["..."],
      hint_en: "...",
      hint_vi: "..."
    }
  ],
  question: {                  // ← Open-ended writing prompt
    text_en: "...",
    text_vi: "...",
    min_words: 20,
    hint_en: "...",
    hint_vi: "..."
  }
};
```

### 3.3 writing.js (Tab Writing Challenge)
```javascript
// Phase 1 (W1-W54) — CẢ 2 MODES
export default {
  title: "...",
  min_words: 40,               // Advanced = 40, Easy = 30 (KHÔNG ĐƯỢC thấp hơn)
  model_sentence: "...",       // BẮT BUỘC cho W1-W54 cả 2 modes
  instruction_en: "...",
  instruction_vi: "...",
  prompt_en: "...",
  prompt_vi: "...",
  keywords: ["..."],           // Hoặc word_bank: ["..."] cho Advanced
};

// Phase 2 (W55-W120) — sẽ thêm sau (xem Section 7.3)
// Phase 3 (W121-W156) — sẽ thêm sau (xem Section 7.3)
```

### 3.4 ask_ai.js (Tab Ask AI — Question Formation Exercise)
```javascript
// ⚠️ CRITICAL: Đây là bài tập ĐẶT CÂU HỎI, KHÔNG phải opinion/discussion
export default {
  prompts: [
    {
      id: 1,
      context_en: "...",       // Tình huống để học sinh suy ra câu hỏi (KHÔNG lộ câu hỏi)
      context_vi: "...",
      audio_url: "/audio/weekNN/ask_ai_1.mp3",
      answer: ["..."],         // MẢng các câu hỏi học sinh CẦN HỎI (không phải answers)
      hint: "Why are you..."   // Gợi ý từ đầu câu hỏi
    }
    // 5+ prompts minimum
  ]
};
// KHÔNG CÓ: prompt_en, prompt_vi, hint_en, hint_vi ở level object
// KHÔNG CÓ: roleplay contexts, opinion questions, advice seeking
```

### 3.5 logic_science.js (Tab Logic Lab — Logic & Science sub-tab, W16+)
```javascript
export default {
  questions: [
    {
      id: 1,
      question_en: "...",
      question_vi: "...",
      options_en: ["A. ...", "B. ...", "C. ...", "D. ..."],
      options_vi: ["A. ...", "B. ...", "C. ...", "D. ..."],
      correct_answer: "B",     // Chỉ chữ cái
      explanation_en: "...",
      explanation_vi: "...",
      audio_url: "/audio/weekNN/logic_q1.mp3"
    }
    // 5 câu minimum (Phase 1), 7 câu (Phase 2), 10 câu (Phase 3)
    // Distribution Phase 1+: 2 Physics, 1 Biology, 1 Ecology, 1 Reasoning
    // KHÔNG CÓ arithmetic word problems (phải để ở singapore_math.js)
  ]
};
```

### 3.6 singapore_math.js (Tab Logic Lab — Singapore Math sub-tab, W16+)
```javascript
export default {
  problems: [
    {
      id: 1,
      type: "part_whole",      // part_whole | comparison | missing_part | groups | before_after
      question_en: "...",
      question_vi: "...",
      bar_model: {
        type: "part_whole",
        total: 8,
        parts: [5, 3],
        labels: ["...", "...", "Total: ..."],
        image_url: "/images/weekNN/barmodel_1_wNNN.svg"  // Generated by script
      },
      answer: "8",
      unit: "apples",
      solution_en: "...",
      solution_vi: "...",
      audio_url: "/audio/weekNN/math_q1.mp3"
    }
    // 5 câu minimum (Phase 1+)
    // W22+ Advanced: numbers ≥2 digits
    // Easy: numbers ≤15, operation shown
  ]
};
```

### 3.7 vocab.js (Tab New Words)
```javascript
export default [
  {
    id: 1,
    word: "...",               // Từ đơn
    definition_en: "...",
    definition_vi: "...",
    sentence_en: "...",
    sentence_vi: "...",
    image_url: "/images/weekNN/vocab_word_wNNN.jpg",
    audio_word: "/audio/weekNN/vocab_word.mp3",
    audio_def: "/audio/weekNN/vocab_def_word.mp3"
  }
  // ĐÚNG 13 từ cho W16+ (không ít hơn, không nhiều hơn)
];
```

### 3.8 word_power.js (Tab Word Power)
```javascript
export default [
  {
    id: 1,
    word: "kick the ball",     // W16+: BẮT BUỘC là collocation phrase (2+ words)
                               // KHÔNG PHẢI từ đơn ("kick" = SAI)
    definition_en: "...",
    definition_vi: "...",
    sentence_en: "...",
    sentence_vi: "...",
    image_url: "/images/weekNN/wordpower_kick_the_ball_wNNN.jpg",
    audio_word: "/audio/weekNN/wordpower_kick_the_ball.mp3",
    audio_def: "/audio/weekNN/wordpower_def_kick_the_ball.mp3"
  }
  // Phase 1: 3 collocations/tuần
  // Phase 2: 5 synonyms/antonyms/tuần
  // Phase 3: 7 idioms/phrasal verbs/tuần
];
```

### 3.9 grammar.js (Tab Grammar)
```javascript
export default {
  title: "...",
  focus: "...",
  questions: [
    {
      id: 1,
      question: "...",
      options: ["A. ...", "B. ...", "C. ...", "D. ..."],
      correct_answer: "A",
      explanation: "..."
    }
    // ĐÚNG 20 câu — không ít hơn, không nhiều hơn
    // Câu phải đủ context, không quá ngắn
  ]
};
```

### 3.10 week_NN_real.js (AI Tutor — V28 format)
```javascript
// File này PHẢI nằm TRONG subfolder: src/data/weeks/week_NN/week_NN_real.js
// KHÔNG ĐƯỢC để ở root src/data/weeks/week_NN_real.js
export default {
  week: NN,
  title: "...",
  target_vocab: [              // BẮT BUỘC 13 objects — thiếu = Speak tab blank
    { word: "...", definition: "...", example: "..." }
  ],
  nova_instructions: "...",
  story_missions: [
    {
      id: 1,
      title: "...",
      story_character: "...",  // BẮT BUỘC
      minimum_turns: 4,        // BẮT BUỘC
      story_arc: "...",
      phase_questions: [...]
    }
  ],
  conversation_cards: [        // BẮT BUỘC ≥3 cards
    {
      id: 1,
      topic: "...",
      exchanges: [...]          // BẮT BUỘC
    }
  ]
};
```

---

## 4. CRITICAL RULES (KHÔNG ĐƯỢC VI PHẠM)

### ❌ TUYỆT ĐỐI KHÔNG:

```
1. Dùng Python để tạo/sửa file .js hoặc .jsx
   → Chỉ dùng Node.js cho JS files

2. Dùng "check_questions" trong read.js
   → Đúng: "comprehension_questions"

3. Dùng "comprehension_questions" trong explore.js
   → Đúng: "check_questions"

4. Dùng "question:" thay vì "question_en:" trong explore.js check_questions array
   → Đúng: "question_en:"

5. Để week_NN_real.js ở root src/data/weeks/
   → Phải ở: src/data/weeks/week_NN/week_NN_real.js

6. Đặt từ đơn trong word_power.js word field (W16+)
   → Phải là collocation: "kick the ball", "take a shower"

7. Copy Advanced content sang Easy mode
   → Easy phải được viết riêng, đơn giản hơn rõ ràng

8. Skip validation sau khi tạo file
   → Luôn chạy: node --input-type=module < file.js

9. Deploy mà chưa test browser
   → Bắt buộc test trước khi git push

10. Skip metadata.js update khi thêm tuần mới
    → Causes "Week N" generic title trong sidebar

11. Tạo prompt roleplay/opinion/advice trong ask_ai.js
    → ask_ai.js chỉ là question formation exercise

12. Đặt bar model images vào week_N_image_prompts.txt
    → Bar models được generate bằng script tools/generate_logiclab_barmodels.py

13. Commit mà không git add images
    → Images phải được git add + commit (Cloudflare Pages deploy từ git, KHÔNG từ R2)

14. Sửa file existing mà không đọc nội dung trước
    → Luôn đọc file trước khi sửa

15. Thay đổi schema của file hiện tại mà không kiểm tra component sử dụng field đó
    → Sẽ crash React component đang load data
```

### ✅ LUÔN LÀM:

```
1. Đọc file trước khi sửa (read_file tool)
2. Validate syntax: node --input-type=module < file.js
3. Chạy code_quality_gate: bash tools/code_quality_gate.sh N
4. Test browser TRƯỚC khi git push
5. Update metadata.js khi thêm tuần mới
6. Update StoryMissionTab.jsx + FreeTalkTab.jsx + gameAdaptation.js khi thêm tuần
7. Generate bar models ngay sau tạo singapore_math.js content
8. Upload R2 ngay sau generate bar models
9. git add images + commit ngay sau upload R2
10. Sử dụng multi_replace_string_in_file cho nhiều thay đổi trong cùng 1 lần
```

---

## 5. DANH SÁCH GAPS CẦN FIX

*(Chi tiết spec đầy đủ trong file: `2_REFERENCE_DOCS/ENGQUEST_PEDAGOGICAL_ANALYSIS_AND_UPGRADE_PLAN.txt`)*

| # | Gap | Mức độ | Nhóm | Sprint |
|---|-----|--------|------|--------|
| G1 | App chỉ có 28/156 tuần content | 🔴 Critical | Content Roadmap | P1 |
| G2 | Không có SRS algorithm | 🔴 Critical | Vocabulary Engine | P1 |
| G3 | Writing chỉ check word count | 🔴 Critical | Writing AI | P1 |
| G4 | Speaking assessment quá mỏng | 🟠 High | Speaking Engine | P2 |
| G5 | Không có summative checkpoint | 🟠 High | Assessment Layer | P2 |
| G6 | Phase 2 CLIL Math chưa có | 🟠 High | Content Roadmap | P2 |
| G7 | Không có Phase 3 features | 🟠 High | Feature Expansion | P4 |
| G8 | Không có Parent/Teacher Dashboard | 🟡 Medium | Analytics | P3 |
| G9 | Không có placement test | 🟡 Medium | Onboarding | P2 |
| G10 | Không có Cambridge YLE alignment | 🟡 Medium | Certification | P3 |
| G11 | Không có adaptive difficulty | 🟡 Medium | Adaptive Engine | P3 |
| G12 | Cross-week vocab recycling | 🟡 Medium | Vocabulary Engine | P1 |
| G13 | Writing portfolio không có tracking | 🟡 Medium | Analytics | P3 |
| G14 | Không có offline mode | 🟢 Low | Infrastructure | P4 |
| G15 | Ask AI context lộ câu hỏi | 🟠 High | Content QA | P1 |

---

## 6. SPRINT PLAN (Thứ tự triển khai)

### SPRINT 1 — Ngay bây giờ (P1 — Nền tảng kỹ thuật & tooling)

> **Nguyên tắc sắp xếp**: Content W29+ được dời sang Sprint 5, SAU KHI toàn bộ tính năng
> (SRS, Writing Rubric, Speaking Engine, Adaptive, Checkpoint) đã hoàn chỉnh. Lý do:
> mỗi tuần content mới cần bake sẵn schema của các tính năng đó. Sản xuất quá sớm
> sẽ phải làm lại khi feature ra đời.

**S1.1 — Automated QA Script** *(Gap G15)*
```
File cần tạo: tools/qa_check.js
Chức năng:
  - Check explore.js: phải có "check_questions" (không phải "comprehension_questions")
  - Check explore.js: phải có "question_en:" trong check_questions items
  - Check read.js: phải có "comprehension_questions"
  - Check writing.js: min_words ≥40 (Adv) hoặc ≥30 (Easy) cho Phase 1
  - Check logic_science.js: questions.length ≥ 5
  - Check singapore_math.js: problems.length ≥ 5
  - Check grammar.js: questions.length === 20
  - Check vocab.js: length === 13 (W16+)
  - Check word_power.js: mỗi word field phải có ≥2 words (space check)
  - Check ask_ai.js: KHÔNG có prompt_en, KHÔNG có hint_en ở level object gốc
  - Flag nếu ask_ai context chứa word của accepted answer
Chạy: node tools/qa_check.js [weekNumber] [mode]
       mode = "advanced" | "easy" | "both"
```

**S1.2 — SRS Database Schema Design** *(Gap G2, G12)*
```
KHÔNG implement full UI ngay — chỉ design schema và backend structure.

Tham chiếu: Section 7.1 của Upgrade Plan file
Database schema (Supabase hoặc local storage tạm):
  word_memory_bank: {
    user_id, word_id, week_number, word, status, 
    next_review_date, correct_count, last_seen
  }
  status enum: "new" | "learning" | "reviewing" | "mastered"

Files cần tạo:
  src/utils/srsEngine.js      ← SM-2 algorithm implementation
  src/utils/wordMemoryBank.js ← CRUD operations cho word bank
```

**S1.3 — Writing Quality Rubric Backend** *(Gap G3)*
```
KHÔNG implement full UI ngay — design rubric engine và API call.

Tham chiếu: Section 7.2 của Upgrade Plan file
4 Dimensions:
  D1: Task Completion (1-3)
  D2: Vocabulary Use (1-3) — check words from word_bank/keywords
  D3: Grammar Accuracy (1-3) — fragment detection, basic tense check
  D4: Connector/Coherence (1-3) — phase-dependent connector requirements

Files cần tạo/sửa:
  src/utils/writingRubric.js  ← Rubric scoring logic
  src/utils/writingAnalyzer.js ← Text analysis (connector detection, fragment check)
  
Phase activation:
  Phase 1 (W1-54): D1 + D2 + D3 active; D4 = warning only
  Phase 2 (W55-120): D1 + D2 + D3 + D4 active, threshold D4
  Phase 3 (W121+): Full rubric + paragraph structure check
```

---

### SPRINT 2 — Sau Sprint 1 (P1 tiếp theo)

**S2.1 — Word Memory Bank UI** *(Gap G2)*
```
Components cần tạo:
  src/components/tabs/DailyReviewTab.jsx
    - Flashcard UI (word → flip → image + definition)
    - Thumbs up/down buttons
    - Progress bar (today's review count)
    - "Review complete" celebration screen
    
  src/components/VocabDigest.jsx
    - End-of-week vocab check (5 current + 5 past week words)
    - Context fill-in format (không phải matching)
    - Required before unlocking next week
    
Integration:
  - Thêm "Review" tab vào main navigation
  - Call srsEngine.js khi user completes New Words tab
  - Notifications: localStorage-based reminder badge
```

**S2.2 — Writing Rubric UI** *(Gap G3)*
```
Sửa file: src/components/tabs/WritingChallengeTab.jsx

Thêm vào sau submission:
  1. Highlight overlay (màu xanh/vàng/đỏ/xám) — CSS class-based
  2. Rubric score card (4 dimensions, 1-3 each)
  3. AI feedback message (tiếng Anh đơn giản, phù hợp tuổi)
  4. "Best Sentence" highlight
  5. History view — list past submissions với score

Không xóa existing features — chỉ ADD vào sau current flow
```

---

### SPRINT 3 — P2

**S3.1 — Placement Test** *(Gap G9)*
```
Components cần tạo:
  src/components/PlacementTest.jsx
    - 5 modules (Vocab, Grammar, Reading, Writing, Speaking)
    - Adaptive branching: đúng → jump; sai → stop module
    - Result screen với recommended starting week
    
Data file cần tạo:
  src/data/placementTest.js
    - 3 difficulty levels của vocab questions
    - 3 difficulty levels của grammar questions
    - 2 reading passages (Easy + Advanced)
    
Integration:
  - Trigger sn onboarding flow cho new users
  - Store result: localStorage["placement_result"] = { startWeek, mode }
```

**S3.2 — Checkpoint System (W14, W26, W36, W54)** *(Gap G5)*
```
Components cần tạo:
  src/components/CheckpointAssessment.jsx
    - Multi-session quiz (4 sessions: Vocab, Grammar, Reading, Writing)
    - Pass/fail per session + overall outcome
    - "Remediation Plan" nếu fail 1-2 sessions
    
Data files cần tạo:
  src/data/checkpoints/checkpoint_w14.js
  src/data/checkpoints/checkpoint_w26.js
  src/data/checkpoints/checkpoint_w36.js
  src/data/checkpoints/checkpoint_w54.js
  
  Schema mỗi checkpoint:
  {
    week: 14,
    vocab_test: { questions: [...20 context fill-in...], pass_threshold: 0.75 },
    grammar_test: { questions: [...15 MCQ...], pass_threshold: 0.70 },
    reading: { passage: "...", questions: [...6...], pass_threshold: 0.70 },
    writing: { prompt: "...", rubric_threshold: 7 }
  }
```

**S3.3 — Topic Talk Speaking Mode** *(Gap G4)*
```
Sửa file: src/components/tabs/AskAITab.jsx

Thêm Mode Selector: [Shadow Asking | Topic Talk | Story Retell]

Topic Talk (W8+):
  - Hiện topic card (30-45 giây timer)
  - Record button → Web Audio API recording
  - Sau record: gửi lên AI endpoint → nhận fluency/vocab/accuracy score
  - Display: "You spoke for X seconds. Words used from this week: Y"
  
Story Retell (W28+):
  - Hiện 3-4 picture sequence (images từ existing CDN)
  - Record → AI score 4-dimension rubric (giống writing)
  
Data cần thêm vào existing week files (optional flag):
  Thêm vào writing.js hoặc separate topic_talk.js:
  {
    topic_talk_prompt: "Tell me about your favorite sport",
    picture_sequence: ["/images/weekNN/story_img1.jpg", ...]  // optional
  }
```

---

### SPRINT 4 — P2 tiếp (Platform features — chuẩn bị trước khi sản xuất content)

> **Mục tiêu Sprint 4**: Hoàn thiện toàn bộ tính năng nền tảng (tags, adaptive engine,
> dashboard). Sau Sprint 4, mọi tính năng đã sẵn sàng để content agent bake vào tuần mới.

**S4.1 — Cambridge YLE Level Tags** *(Gap G10)*
```
Sửa file: src/data/weeks/metadata.js
Thêm vào mỗi week object:
  {
    week: 1,
    title: "Hello, World!",
    cefr_level: "Pre-A1",           // thêm field mới
    cambridge_prep: "YLE Starters"  // thêm field mới
  }

Cambridge mapping:
  W1-14:   Pre-A1 (YLE Starters prep)
  W15-28:  A1 (Starters → Movers transition)
  W29-54:  A1+ (YLE Movers prep)
  W55-80:  A2 (Movers → Flyers transition)
  W81-120: A2+ (YLE Flyers prep)
  W121-144: B1 (B1 Preliminary prep)
  W145-156: B1+ (B1 Preliminary mastery)

UI thêm vào progress bar:
  "You are at: A1 | Next: A1+ (Week 29) ★"
  
In-app milestone badge khi complete W14, W28, W54, W80, W120, W156
```

**S4.2 — Adaptive Difficulty Rules** *(Gap G11)*
```
File cần tạo: src/utils/adaptiveEngine.js

5 Rules implementation:
  Rule 1 (Vocab Boost): Watch New Words accuracy < 60% for 2 weeks
    → Create "Word Workout" mini-session data dynamically from SRS bank
    
  Rule 2 (Grammar Pacing): Watch Grammar accuracy > 90% for 3 weeks
    → Set flag: unlockChallengeGrammar = true
    → Challenge questions: extra 3 questions at +1 level in GrammarTab
    
  Rule 3 (Writing Scaffolding): Watch Writing rubric < 7/12 for 2 tries
    → Override scaffold_level to 1 (model_sentence) even in Phase 2
    → Set flag: needsWritingSupport = true
    
  Rule 4 (Logic Difficulty): Watch Logic Lab > 85% for 3 weeks
    → Easy Mode: show "Try Advanced Mode?" banner
    → Advanced Mode: unlock bonus question (6th question in logic_science)
    
  Rule 5 (Speaking Confidence): Watch Shadowing + Ask AI not used for 2 weeks
    → Show "Speaking Streak Day 1" badge
    → Collectible character reward per 7-day streak
    
Storage: localStorage["adaptive_state"] = { rules tracking data }
Integration: Call adaptiveEngine.js from main app router on week load
```

**S4.3 — Parent Dashboard (basic)** *(Gap G8)*
```
Approach: Separate web app (React SPA) hoặc subdomain
  URL: dashboard.engquest.vn (hoặc /dashboard)
  
Tính năng Phase 1 (basic):
  - Weekly report: stations completed, time spent, streak
  - Vocab health: learned/mastered/at-risk counts
  - Writing score trend (last 4 weeks)
  - Next checkpoint countdown
  
Data source:
  - localStorage sync từ student app → shared cloud storage
  - Hoặc email-based: student app generates weekly PDF report
  
Files cần tạo:
  src/pages/ParentDashboard.jsx
  src/utils/progressReport.js  ← Generate report data
```

---

### SPRINT 5 — Content Production W29-W54 (P2 — CHỈ bắt đầu SAU khi Sprint 1-4 xong)

> **Điều kiện tiên quyết** (phải hoàn thành TRƯỚC khi bắt đầu Sprint 5):
> ✅ SRS engine hoạt động (S1.2 + S2.1)
> ✅ Writing Rubric active (S1.3 + S2.2)
> ✅ Placement Test + Checkpoint live (S3.1 + S3.2)
> ✅ Topic Talk Speaking Mode live (S3.3)
> ✅ Cambridge YLE tags deployed (S4.1)
> ✅ Adaptive Engine hoạt động (S4.2)
>
> Nhờ đó, mỗi tuần content được tạo ra từ Sprint 5 sẽ tự động có:
> SRS vocab tracking, Writing rubric scoring, Speaking prompts, Checkpoint data, CEFR tag.

**S5.1 — Content W29-W36: Irregular Verbs + Story Retell** *(Gap G1)*
```
Tạo theo quy trình chuẩn (xem AGENT_SELF_CHECK_WORKFLOW.md Bước 0-10):
  W29: Irregular Verbs 1 (Go→Went, Run→Ran, Come→Came, Fly→Flew) — Transport
  W30: Irregular Verbs 2 (Eat→Ate, Drink→Drank, Buy→Bought) — Food/Picnic
  W31: Irregular Verbs 3 (See→Saw, Hear→Heard, Feel→Felt) — 5 Senses
  W32: Irregular Verbs 4 (Do→Did, Make→Made, Have→Had, Take→Took) — Chores
  W33: Irregular Verbs 5 (Break→Broke, Fall→Fell, Lose→Lost) — Accidents
  W34: Story Retell 1 (Mixed Past — The Lion and the Mouse)
  W35: Story Retell 2 (Personal Recount — The Best Day Ever)
  W36: Review Block B2 (Irregular Verbs — Adventure Book project)

Schema mới cần bake vào mỗi tuần (so với W1-W28):
  writing.js: thêm topic_talk_prompt field (dùng cho Topic Talk feature S3.3)
  writing.js: thêm rubric config placeholder (dùng cho Writing Rubric feature S2.2)
  W36 checkpoint data: tạo src/data/checkpoints/checkpoint_w36.js

Writing.js đặc biệt cho W34-W36:
  - W34: Thêm "story_structure" object:
    { beginning_prompt: "...", middle_prompt: "...", ending_prompt: "..." }
  - W35: Narrative model sentence với adjectives + past tense
  - W36: Multi-section writing (3 panels, each 40+/30+ words)
```

**S5.2 — Content W37-W54: CLIL Science + Math Bridge + Graduation** *(Gap G1)*
```
W37-W42: CLIL Science — Nature (Living Things, Animals, Habitats, Comparisons,
         Life Cycles, Water Cycle)
W43-W48: Math Bridge (Addition, Subtraction, Shapes, Patterns, Numbers, Measuring)
W49-W54: Graduation Prep (Future Tense, Grammar Reviews, Portfolio, Graduation)

Đặc biệt W54:
  Writing: Graduation Speech format
  Video Challenge: Graduation special mode (xem Section 7 — Feature Specs)
  Logic Lab: Cumulative review thay vì topic mới
  Checkpoint: src/data/checkpoints/checkpoint_w54.js (tạo cùng lúc)
```

---

### SPRINT 6-7 — P3 tiếp

**S6.1 — Content W55-W76 (Phase 2 Cycle 2.1)** *(Gap G1, G6)*
```
Xem ENGQUEST_PEDAGOGICAL_ANALYSIS_AND_UPGRADE_PLAN.txt Section I Sprint 2
cho chi tiết đầy đủ mỗi tuần từ W55-W76.

Schema changes bắt buộc cho Phase 2 writing.js:
  - Thay model_sentence bằng sentence_starters array
  - Tăng min_words ramp: W55=60, W65=70, W77=80
  - Thêm scaffold_level field (2 = starters mode)
  - Thêm rubric config object
  
Schema changes cho Phase 2 explore.js:
  - Thêm critical_prompt object (ngoài existing check_questions)
  
Logic Lab Phase 2 (7 câu/tuần):
  logic_science: 7 câu (2 Physics, 2 Biology/Systems, 1 Sci Method, 
                         1 Data Interpretation, 1 Constraint Puzzle)
  singapore_math: 7 câu (multi-step, equations, ratio, fractions, area/perimeter)
```

**S6.2 — Research Station** *(Gap G7)*
```
Tham chiếu: Section 7.4 (Feature Specs) trong file này

Component: src/components/tabs/ResearchStationTab.jsx
Data schema: src/data/weeks/week_NN/research.js (new file từ W105+)

research.js schema:
  {
    week: 105,
    topic: "Volcanoes",
    big_questions: ["...", "...", "..."],
    source_articles: [
      { id, title, author, level, content, key_facts: [] }
    ],
    note_taking_template: { main_idea, detail_1, detail_2, my_question }
  }
```

**S6.3 — Essay Builder** *(Gap G7)*
```
Component: src/components/tabs/EssayBuilderTab.jsx
Mode 1 (W105-120): Drag-drop outline slots
Mode 2 (W121+): Full text editor với revision tracking
Mode 3 (W145+): Independent (no template)

Essay Versioning: Lưu tối đa 3 drafts, compare rubric scores
Final draft feeds into Writing Portfolio
```

**S6.4 — Teacher Dashboard** *(Gap G8)*
```
Separate web app với teacher login
Class overview: grid view color-coded
Individual drill-down: full submission history
Assignment system: assign stations với deadline
Content preview: xem trước nội dung tuần sau
Reporting: PDF monthly + CSV export
```

---

### SPRINT 7-10 — P4

**S7.1 — Debate Arena** *(Gap G7)*
```
Component: src/components/tabs/DebateArenaTab.jsx
Data schema: src/data/weeks/week_NN/debate.js (new từ W121+)

debate.js schema:
  {
    week, topic, for_arguments: [{claim, evidence, talking_points}],
    against_arguments: [...],
    rebuttal_starters: [...],
    fallacies_to_watch: [...],
    debate_format: { opening, rebuttal, closing }
  }

3 phases: Preparation → AI Warm-up → Live Debate (teacher facilitated)
Progression: Structured (W121-128) → Semi (W129-140) → Open (W141-156)
```

**S7.2 — Project Hub** *(Gap G7)*
```
Component: src/components/ProjectHub.jsx
Timeline tracker với checklist milestones
Passion Project: W99-120 (Expository research)
Debate Projects: W121-156 (3 cycles)
Feeds into Essay Builder + Video Challenge special modes
```

**S7.3 — B1+ Graduation Assessment** *(Gap G5)*
```
Component: src/components/GraduationAssessment.jsx
Data: src/data/graduation_assessment.js
Format: Mô phỏng Cambridge B1 Preliminary
4 parts: Reading (40') + Writing (40') + Listening (30') + Speaking (15')
Pass threshold: 60% total
Certificate: PDF download
```

**S7.4 — Offline Mode Level 1** *(Gap G14)*
```
Approach: Progressive Web App (PWA)
Files cần sửa:
  public/manifest.json      ← PWA manifest
  public/sw.js              ← Service Worker (cache strategy)
  vite.config.js            ← Add vite-plugin-pwa

Cache strategy:
  - Cache weekly JS content khi load đầu tuần
  - Cache audio files (vocab + reading)
  - Không cache video (quá nặng)
  - Sync scores khi reconnect (background sync)
  
Stations hoạt động offline: New Words, Grammar, Logic Lab, Dictation
Stations cần internet: Ask AI, Writing AI feedback, Video, Shadowing AI
```

---

## 7. FEATURE SPECS CHI TIẾT

### 7.1 Writing Rubric — 4 Dimension Scoring

```javascript
// src/utils/writingRubric.js
const RUBRIC = {
  D1_task_completion: {
    3: "Trả lời đúng và đầy đủ yêu cầu của prompt",
    2: "Trả lời một phần, còn thiếu 1 yếu tố",
    1: "Lạc đề hoặc không liên quan"
  },
  D2_vocabulary_use: {
    3: "Dùng ≥3 từ từ word_bank/keywords đúng ngữ cảnh",
    2: "Dùng 1-2 từ từ word_bank",
    1: "Không dùng từ nào từ word_bank"
  },
  D3_grammar_accuracy: {
    3: "<2 lỗi, tất cả câu có subject+verb",
    2: "2-4 lỗi, ý vẫn hiểu được",
    1: ">4 lỗi hoặc nhiều sentence fragments"
  },
  D4_coherence: {
    phase1: "Có ≥1 connector (and, but, so, because, then)",
    phase2: "Có ≥1 complex connector (therefore, however, as a result)",
    phase3: "Paragraph structure đúng (topic sentence + details + closing)"
  }
};

// Score thresholds
const THRESHOLDS = {
  excellent: { min: 10, badge: "Writing Star" },
  good: { min: 7, badge: null },
  needs_work: { min: 4, badge: null, can_submit: true },
  fail: { min: 0, can_submit: false, phase: 2 } // Phase 2+ only
};
```

### 7.2 SRS Algorithm (Simplified SM-2)

```javascript
// src/utils/srsEngine.js
const INTERVALS = {
  learning_correct: 1,      // review sau 1 ngày
  reviewing_1: 3,           // review sau 3 ngày
  reviewing_2: 7,           // review sau 7 ngày
  reviewing_3: 14,          // review sau 14 ngày → mastered
  mastered_wrong: 1         // nếu sai sau mastered → về learning
};

function updateWordStatus(word, isCorrect) {
  if (!isCorrect) {
    return { ...word, status: "learning", nextReview: addDays(new Date(), 1) };
  }
  const transitions = {
    learning: { status: "reviewing", interval: 3, correctCount: 1 },
    reviewing: (word) => {
      const count = (word.correct_count || 0) + 1;
      if (count >= 3) return { status: "mastered", interval: null };
      const intervals = [3, 7, 14];
      return { status: "reviewing", interval: intervals[count-1], correctCount: count };
    },
    mastered: { status: "reviewing", interval: 7 }
  };
  // ... apply transition
}
```

### 7.3 Writing Phase Evolution

```javascript
// Schema evolution qua các phases

// Phase 1 (W1-54) — HIỆN TẠI (không thay đổi)
{ min_words: 40/30, model_sentence: "...", keywords: [...] }

// Phase 2 (W55-120) — THÊM fields mới, GIỮ existing fields
{
  min_words: 60,                // tăng dần (60→70→80→90→100)
  sentence_starters: [...],     // THAY THẾ model_sentence
  model_sentence: null,         // giữ field nhưng null để backward compat
  scaffold_level: 2,            // 1=model, 2=starters, 3=free
  word_bank: [...],             // giữ cho Advanced
  rubric: {                     // MỚI
    connector_required: ["because", "so", "therefore"],
    min_complex_sentences: 1
  }
}

// Phase 3 (W121-156) — Free writing
{
  min_words: 120,               // tăng: 120→150→free
  scaffold_level: 3,
  sentence_starters: null,
  word_bank: null,
  rubric: {
    full_rubric: true,
    paragraph_structure: true
  }
}
```

### 7.4 Research Station Data Schema

```javascript
// src/data/weeks/week_105/research.js
export default {
  week: 105,
  topic: "Volcanoes",
  big_questions: [
    "What causes a volcano to erupt?",
    "How do volcanoes affect the environment?",
    "Why do people live near volcanoes?"
  ],
  source_articles: [
    {
      id: "src_1",
      title: "How Volcanoes Work",
      author: "National Geographic Kids",
      level: "intermediate",
      content: "...",
      key_facts: ["Magma rises through cracks...", "Over 1500 active volcanoes..."]
    }
  ],
  note_taking_template: {
    main_idea: "",
    detail_1: "",
    detail_2: "",
    my_question: ""
  }
};

// Phase 3 (W121+): 2 articles (FOR + AGAINST)
// W133+: 3 articles + student must identify 1 statistic per article
// W145+: No source articles — student provides own notes
```

### 7.5 Debate Data Schema

```javascript
// src/data/weeks/week_128/debate.js
export default {
  week: 128,
  topic: "Should homework be banned in primary schools?",
  for_arguments: [
    {
      claim: "Homework causes excessive stress in young children.",
      evidence: "A 2022 study found 72% of primary students report homework stress.",
      talking_points: ["stress statistics", "sleep deprivation", "family time loss"]
    }
  ],
  against_arguments: [...],
  rebuttal_starters: [
    "I understand your point, however...",
    "While that may be true, the evidence shows...",
    "That statistic may be outdated because..."
  ],
  fallacies_to_watch: ["hasty generalization", "slippery slope"],
  debate_format: {
    opening_seconds: 90,
    rebuttal_seconds: 60,
    closing_seconds: 45
  }
};
```

---

## 8. REFERENCE FILES BẮT BUỘC ĐỌC TRƯỚC KHI LÀM

### Luôn phải đọc (mỗi phiên):
1. **Onboarding Prompt**: `Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/0. NEW_AGENT_ONBOARDING_PROMPT.md`
2. **Workflow**: `Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/AGENT_SELF_CHECK_WORKFLOW.md`
3. **Upgrade Plan**: `Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/ENGQUEST_PEDAGOGICAL_ANALYSIS_AND_UPGRADE_PLAN.txt`

### Đọc theo context:
4. **Blueprint V5.0**: `Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`
5. **Syllabus 3 năm**: `Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/0. Final_reviewed Syllabus.docx`
6. **STEM Integration**: `Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md`
7. **Validation Table**: `Production_FINAL/1. FINAL MASS PRODUCTION/3_VALIDATION/VALIDATION_TABLE_ALL_STATIONS.md`
8. **Debate Guide (W40+)**: `Production_FINAL/1. FINAL MASS PRODUCTION/4_LAUNCH_GUIDES/W40_DEBATE_LAUNCH_GUIDE.md`

### Golden Standard files (đọc trước khi tạo content):
9. **AI Tutor template**: `src/data/weeks/week_16_real.js` (hoặc `week_16/week_16_real.js`)
10. **Advanced stations template**: `src/data/weeks/week_16/*.js` (16 files)
11. **Easy stations template**: `src/data/weeks_easy/week_16/*.js` (16 files)

---

## 9. QUY TRÌNH LÀM VIỆC AN TOÀN

### Trước khi BẤT KỲ thay đổi nào:

```bash
# 1. Kiểm tra git status
git status

# 2. Đọc file trước khi sửa
# (Dùng read_file tool, đọc ít nhất 30-50 dòng xung quanh vùng cần sửa)

# 3. Validate JS file sau khi tạo/sửa
node --input-type=module < src/data/weeks/week_NN/file.js

# 4. Chạy code quality gate
bash tools/code_quality_gate.sh NN

# 5. Chạy QA check (sau khi S1.1 build xong)
node tools/qa_check.js NN both
```

### Khi tạo file JS mới:
```bash
# LUÔN dùng Node.js (KHÔNG bao giờ dùng Python)
node -e "
const fs = require('fs');
fs.writeFileSync('path/to/file.js', \`
export default {
  // ... content
};
\`);
console.log('Created successfully');
"

# Validate ngay sau khi tạo
node --input-type=module < path/to/file.js
```

### Khi sửa file hiện tại:
```bash
# 1. Đọc file trước (read_file tool)
# 2. Dùng replace_string_in_file với ít nhất 3-5 dòng context
# 3. Validate sau khi sửa
# 4. Chạy quality gate
```

### Khi thêm tuần mới (W29+):
```bash
# Phải update 4 UI files sau khi tạo xong tất cả data files:
# 1. src/data/weeks/metadata.js          ← Add week to list
# 2. src/components/StoryMissionTab.jsx  ← Add week number
# 3. src/components/FreeTalkTab.jsx      ← Add week number
# 4. src/utils/gameAdaptation.js         ← Add week theme

# Generate bar models
python3 tools/generate_logiclab_barmodels.py NN

# Upload R2 (images):
python3 tools/upload_week_images_r2.py NN --remote

# Add + commit images:
git add public/images/weekNN/ && git commit -m "Add W29 images"

# Final push (sau browser test)
git push origin main
```

### Khi tạo Feature mới (New Components):
```bash
# 1. Đọc related existing component trước (để hiểu pattern)
# 2. Tạo component trong src/components/ (React functional component)
# 3. Tạo data schema trong src/data/ (nếu cần)
# 4. Import vào parent component (đọc parent trước khi thêm import)
# 5. Test browser (npm run dev)
# 6. KHÔNG deploy ngay — test thorough trước
```

---

## 10. XÁC NHẬN KHI ONBOARD XONG

Sau khi đọc toàn bộ file này, hãy trả lời:

```
✅ UPGRADE AGENT ONBOARDING COMPLETE

Tôi đã đọc và hiểu:

CURRENT STATE:
- Workspace: /Users/binhnguyen/Downloads/Engquest3k/
- 28 tuần đã deploy (W1-W28), tất cả sạch lỗi sau commit d5367e5
- Golden standard: W16 (16 files/mode, Advanced + Easy)
- File naming: week_NN_real.js phải trong subfolder week_NN/

SCHEMAS ĐÃ NẮM:
- read.js: "comprehension_questions" (KHÔNG phải check_questions)
- explore.js: "check_questions" + "question_en:" + "question:" object
- writing.js Phase 1: min_words 40/30, model_sentence bắt buộc
- ask_ai.js: question formation only, KHÔNG có prompt_en/hint_en
- logic_science.js: 5+ câu, KHÔNG có arithmetic problems
- vocab.js W16+: đúng 13 từ
- word_power.js W16+: collocation phrase (2+ words)

15 GAPS ĐÃ NẮM:
- G1 (Critical): Cần content W29-W156
- G2 (Critical): Cần SRS engine
- G3 (Critical): Cần Writing Rubric AI
- ... [G4-G15]

SPRINT ƯU TIÊN:
- Sprint 1: QA script + W29-W36 content + SRS schema + Rubric design
- Sprint 2: SRS UI + Writing Rubric UI
- Sprint 3: Placement Test + Checkpoints + Topic Talk

RULES KHÔNG VI PHẠM:
- Không dùng Python cho JS files
- Không thay đổi schema mà không kiểm tra component
- Luôn validate + quality gate + browser test trước deploy
- Đọc file trước khi sửa

Sẵn sàng nhận lệnh:
  "Thực hiện Sprint 1" / "Tạo feature [X]" / "Tạo tuần W[N]" 🟢
```

---

## 📎 PHỤ LỤC — Quick Reference

### Deploy command sequence
```bash
git add -A
git commit -m "feat: [description]"
git push origin main
# Cloudflare Pages auto-deploy ~2-3 phút
```

### Validate a week (sau khi tạo)
```bash
bash tools/code_quality_gate.sh 29    # Replace 29 với week number
node tools/qa_check.js 29 both        # Sau khi S1.1 built
```

### Check lỗi field name phổ biến
```bash
# Tìm file nào đang dùng sai field trong explore.js
grep -rn "comprehension_questions" src/data/weeks/*/explore.js
grep -rn "comprehension_questions" src/data/weeks_easy/*/explore.js

# Tìm file nào đang dùng sai field trong read.js  
grep -rn '"check_questions"' src/data/weeks/*/read.js
grep -rn '"check_questions"' src/data/weeks_easy/*/read.js

# Check min_words thấp hơn chuẩn
grep -rn "min_words: [0-9]" src/data/weeks/*/writing.js | grep -v ": 40"
grep -rn "min_words: [0-9]" src/data/weeks_easy/*/writing.js | grep -v ": 30"

# Check word_power.js có dùng từ đơn không (W16+)
grep -rn '"word": "[^" ]*"' src/data/weeks/week_{16..28}/word_power.js
```

### Week range mapping
```
W1-W15:   Phase 1 Block A (Present Simple, Present Continuous)
W16-W28:  Phase 1 Block B (Past Simple Regular + Irregular) ← ĐANG Ở ĐÂY
W29-W36:  Phase 1 Block B tiếp (Irregular Verbs 1-5 + Story Retell)
W37-W54:  Phase 1 Block C (CLIL Science + Math Bridge + Graduation)
W55-W76:  Phase 2 Cycle 2.1 (Logic & Explanation — Cause/Effect/Problem/Solution)
W77-W98:  Phase 2 Cycle 2.2 (Fully Integrated CLIL — Science/History)
W99-W120: Phase 2 Cycle 2.3 (My Passion Project)
W121-W132: Phase 3 Cycle 1 (Homework Debate)
W133-W144: Phase 3 Cycle 2 (Video Games Debate)
W145-W156: Phase 3 Cycle 3 (Smartphones Debate + Graduation)
```

---

*Tài liệu này tham chiếu đến và phải đọc cùng với:*
- *`0. NEW_AGENT_ONBOARDING_PROMPT.md` — Production workflow*
- *`AGENT_SELF_CHECK_WORKFLOW.md` — 10-step process*
- *`ENGQUEST_PEDAGOGICAL_ANALYSIS_AND_UPGRADE_PLAN.txt` — Full spec của tất cả 15 gaps*

*Ngày tạo: 08/04/2026 | Phiên bản: 1.0*
