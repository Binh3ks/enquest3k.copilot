# PHÂN TÍCH TÁI CẤU TRÚC V28 → V29 (3 PROMPTS)

**Date**: 18/01/2026
**Purpose**: Document cấu trúc đúng trước khi tạo prompts mới

---

## 📊 PHÂN TÍCH V28 HIỆN TẠI (5,368 dòng)

### Cấu trúc content trong V28:

```
ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt (5,368 dòng)
│
├── SECTION I-III: Introduction & CEFR Rules (~200 dòng)
│
├── SECTION IV: 14 STATION SCHEMAS (~1,800 dòng)
│   ├── vocab.js
│   ├── read.js
│   ├── grammar.js
│   ├── dictation.js
│   ├── shadowing.js
│   ├── writing.js
│   ├── ask_ai.js
│   ├── logic.js
│   ├── explore.js
│   ├── mindmap.js
│   ├── word_power.js
│   ├── daily_watch.js
│   ├── word_match.js
│   └── video_queries.json
│
├── SECTION V-XII: AI TUTOR SCHEMA (~1,500 dòng) ⬅️ PHẦN DÀI NHẤT!
│   ├── week_XX_real.js complete schema
│   ├── target_vocab (7 words)
│   ├── story_missions structure (3 missions)
│   ├── objectives với question_variants
│   ├── Student question invitations
│   ├── hints structure (full scrambled sentences)
│   ├── ACK/RECAST/Question format
│   ├── TurnManager detection rules
│   ├── FreeTalk knowledge structure
│   ├── Week 1-4 examples
│   └── Common mistakes to avoid
│
├── SECTION XIII: AI Runtime Behavior (~600 dòng)
│   ├── Response format rules
│   ├── Subject agreement
│   ├── Recast technique
│   └── Turn management
│
└── SECTION XIV-END: Workflow + Troubleshooting (~1,268 dòng)
    ├── 9-step pipeline
    ├── Tool commands
    ├── Validation checklist
    └── Troubleshooting guide
```

---

## ✅ CẤU TRÚC ĐÚNG CHO V29: MODULE SYSTEM (11 FILES)

### 🎯 MASTER PROMPT (1 file):
**V29_MASTER_ORCHESTRATOR.txt** (~500 dòng) ← ĐỌC ĐẦU TIÊN

**Mục đích**: Central control - chỉ dẫn đọc prompt nào, khi nào

**Nội dung**:
- Execution pipeline (5 phases)
- Decision tree (khi nào đọc file nào)
- Token efficiency guide (98% token saving)
- Validation checklist
- Troubleshooting

---

### PROMPT 1: V29 STATIONS (4 files, ~1,800 dòng total)

**Files**:
1. **V29_STATIONS_CORE.txt** (~300 dòng) ← Always read
2. **V29_STATIONS_ADVANCED.txt** (~600 dòng) ← For Advanced difficulty
3. **V29_STATIONS_EASY.txt** (~500 dòng) ← For Easy difficulty
4. **V29_STATIONS_EXAMPLES.txt** (~400 dòng) ← Read when confused

**Nội dung CORE**:
```
I. Execution Guide (100 dòng)
   - When to read ADVANCED vs EASY
   - Reuse context for 14 files
   - Token efficiency tips

II. Common Schema Elements (100 dòng)
   - CEFR level rules
   - Vocabulary tier mapping
   - Cross-reference rules (vocab ↔ read ↔ dictation)

III. File Generation Order (100 dòng)
   - Generate vocab first (wordbank for other stations)
   - Generate read second (source for dictation/shadowing)
   - Generate others in sequence
```

**Nội dung EASY (~500 dòng)**:
```
Same 14 stations as Advanced, but simpler:
- Shorter reading passages (50-80 words vs 150-200)
- Easier grammar (present simple vs complex tenses)
- More multiple choice, less open-ended
- Simpler vocabulary
```

**Nội dung EXAMPLES (~400 dòng)**:
```
- Complete vocab.js example
- Complete read.js example (with bolded vocab)
- Complete dictation.js (matching read sentences)
- Complete writing.js (with model_sentence)
```

**Token usage**: 
- Generate 14 Advanced: 300 + 600 = **900 dòng** (đọc 1 lần, reuse context)
- Generate 14 Easy: reuse CORE + 500 = **500 dòng**
- Total: **1,400 dòng** cho 28 files (thay vì 1,800 × 28 = 50,400 dòng!)

---

### PROMPT 2: V29 AI TUTOR (4 files, ~1,700 dòng total)

**Files**:
1. **V29_AI_TUTOR_CORE.txt** (~400 dòng) ← Always read
2. **V29_AI_TUTOR_SCHEMA_BASIC.txt** (~300 dòng) ← Week 1-3
3. **V29_AI_TUTOR_SCHEMA_VARIANT.txt** (~400 dòng) ← Week 4+
4. **V29_AI_TUTOR_EXAMPLES.txt** (~600 dòng) ← Week 1, 2, 4 examples

**Nội dung CORE (~400 dòng)**:
**Nội dung CORE (~400 dòng)**:
```
I. Execution Order (150 dòng) ⬅️ QUAN TRỌNG NHẤT
   - Step 1: Read syllabus for theme
   - Step 2: Determine CEFR level
   - Step 3: Choose format (canonical vs variants)
   - Step 4: Generate metadata + vocab
   - Step 5-7: Generate 3 missions
   - Step 8: Generate FreeTalk
   - Step 9: Validate

II. Format Decision Tree (100 dòng)
   - Week 1-3 → Read SCHEMA_BASIC
   - Week 4+ → Read SCHEMA_VARIANT
   - Flowchart

III. File Structure Overview (100 dòng)
   - Metadata fields
   - target_vocab structure
   - story_missions structure
   - FreeTalk structure
   - Refer to SCHEMA files for details

IV. TurnManager Detection Rules (50 dòng)
   - Mission title keywords for week routing
```

**Nội dung SCHEMA_BASIC (~300 dòng)**:
```
I. Complete Schema (150 dòng)
   - All fields + types
   - canonical_question format

II. Objectives: canonical_question Format (100 dòng)
   {
     stepKey: "string",
     canonical_question: "Single question?",
     hints: ["word1", "word2", "word3", "word4", "word5"],
     target_keywords: [...],
     ack_options: [...],
     recast_templates: [...]
   }
   - Hints: 5-6 individual words
   - Example from Week 1

III. Goodbye + FreeTalk (50 dòng)
```

**Nội dung SCHEMA_VARIANT (~400 dòng)**:

```
I. Complete Schema (150 dòng)
   - All fields + types
   - question_variants format

II. Objectives: question_variants Format (150 dòng)
   {
     stepKey: "string",
     question_variants: [  // 3 variants per objective
       {
         question: "Variant 1?",
         hints: ["word5", "word1", "word3", "word2", "word4", "word6"]
       },
       {
         question: "Variant 2?",
         hints: ["word4", "word2", "word6", "word1", "word5"]
       },
       {
         question: "Variant 3?",
         hints: ["word3", "word1", "word5", "word2", "word6", "word4"]
       }
     ],
     target_keywords: [...],
     ack_options: [...],
     recast_templates: [...]
   }
   - Hints: 6-9 words (full scrambled sentence)
   - How to scramble hints

III. Student Question Invitations (70 dòng)
   {
     stepKey: "student_question_1",
     type: "invitation",
     question_variants: [...],
     allow_skip: true
   }
   - Placement: every 3-4 objectives
   - Empty hints array

IV. Goodbye + FreeTalk (30 dòng)
```

**Nội dung EXAMPLES (~600 dòng)**:
```
I. Week 1 Mission 1 (150 dòng) - canonical_question
II. Week 2 Mission 2 (150 dòng) - canonical_question
III. Week 4 Mission 1 (300 dòng) - question_variants + invitations ⬅️ GOLDEN STANDARD
```

**Token usage**:
- Week 1-3: CORE + BASIC = 400 + 300 = **700 dòng**
- Week 4+: CORE + VARIANT = 400 + 400 = **800 dòng**
- With EXAMPLES: +600 dòng only when confused

---

### PROMPT 3: V29 WORKFLOW (3 files, ~900 dòng total)

**Files**:
1. **V29_WORKFLOW_CORE.txt** (~300 dòng) ← Execution pipeline
2. **V29_WORKFLOW_VALIDATION.txt** (~300 dòng) ← Validation rules
3. **V29_WORKFLOW_TESTING.txt** (~300 dòng) ← Testing commands

**Nội dung CORE (~300 dòng)**:
```
I. 5-Phase Execution (150 dòng)
   Phase 1: Setup (folder structure)
   Phase 2: Generate AI Tutor (1 file)
   Phase 3: Generate 14 Advanced stations
   Phase 4: Generate 14 Easy stations
   Phase 5: Validation + Testing

II. Quick Start Guide (100 dòng)
   - npm run dev
   - Manual generation steps
   - Shortcuts

III. Troubleshooting Index (50 dòng)
   - Common errors
   - Where to find solutions
```

**Nội dung VALIDATION (~300 dòng)**:
```
I. Schema Validation Rules (150 dòng)
   - AI Tutor: target_vocab must be objects
   - Stations: cross-references (vocab ↔ read ↔ dictation)
   - File export checks

II. Validation Commands (100 dòng)
   - node scripts/validate_week.js
   - Import tests
   - Syntax checks

III. Validation Checklist (50 dòng)
   - Before generation
   - After generation
   - Before marking complete
```

**Nội dung TESTING (~300 dòng)**:
```
I. Automated Tests (100 dòng)
   - Import all 29 files
   - Schema validation
   - Cross-reference checks

II. Browser Testing (100 dòng)
   - Start dev server
   - Load week X
   - Test AI Tutor (3 missions)
   - Test 1 Advanced station
   - Test 1 Easy station

III. Audio/Image Verification (100 dòng)
   - TTS generation
   - Image display
   - Video playback
```

---

## 🎯 AI RUNTIME BEHAVIOR → ĐI ĐÂU?

**Câu trả lời**: KHÔNG cần prompt riêng, inject trực tiếp vào code!

**Tại sao**:
- Phần runtime behavior (~600 dòng) là cho Gemini/Together AI
- Nó không phải content generation (không tạo file)
- Nó là system prompt cho novaEngine.js

**Cách implement**:
```javascript
// src/services/ai_tutor/novaEngine.js

const SYSTEM_PROMPT = `
You are Ms. Nova, an English teacher for Vietnamese children.

## RESPONSE FORMAT
{
  "ack": "Nice!" | "Great!" | "Wonderful!",
  "recast": "Student's words with corrected grammar (≤8 words)",
  "question": "Next question from objectives",
  "suggested_hints": [...],
  "mission_status": "continue" | "completed"
}

## SUBJECT AGREEMENT RULES
- Student questions → use "you/your"
- Mother questions → use "she/your mother"
- Father questions → use "he/your father"

## RECAST TECHNIQUE
- Never say "wrong"
- Model correct form naturally
- Use student's words + fix grammar
- Maximum 8 words

## CRITICAL EXAMPLES
[Paste Week 1-4 examples here]
`;

// Use in API call
const response = await geminiAPI.generateContent({
  systemInstruction: SYSTEM_PROMPT + missionContext,
  contents: conversationHistory
});
```

**Lợi ích**:
- Không cần prompt file riêng
- Code control trực tiếp
- Dễ test và debug
- Giảm số prompts từ 4 xuống 3

---

## 📊 SO SÁNH CUỐI CÙNG

| Metric | V28 (Cũ) | V29 (Mới - 3 Prompts) |
|--------|----------|------------------------|
| **Total dòng** | 5,368 | ~4,300 (giảm 20%) |
| **Prompt files** | 1 (monolithic) | 3 (specialized) |
| **AI Runtime** | Mixed trong prompt | Inject vào code |
| **Prompt 1** | N/A | 14 Stations (~1,800 dòng) |
| **Prompt 2** | N/A | AI Tutor (~1,600 dòng) |
| **Prompt 3** | N/A | Workflow (~900 dòng) |

---

## ✅ XÁC NHẬN TRƯỚC KHI TẠO

Trước khi tôi tạo 3 prompts mới, xin xác nhận:

1. **Prompt 1**: 14 stations (vocab, read, grammar...) - ~1,800 dòng ✅
2. **Prompt 2**: AI Tutor (week_XX_real.js) - ~1,600 dòng ✅ (PHẦN DÀI NHẤT)
3. **Prompt 3**: Workflow pipeline - ~900 dòng ✅
4. **AI Runtime**: Inject vào novaEngine.js code (KHÔNG cần prompt riêng) ✅

**Có đúng không?** Nếu đúng, tôi sẽ tạo 3 prompts với cấu trúc này.
