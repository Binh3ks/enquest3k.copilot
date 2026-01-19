# PHẢN BIỆN: TÁCH PROMPT AI TUTOR ĐỂ TIẾT KIỆM TOKEN

**Date**: 18/01/2026
**Analysis**: Week 4 real code vs Prompt structure optimization

---

## 📊 PHÂN TÍCH THỰC TẾ

### Week 1-4 Code Size:
```
Week 1: 575 dòng (canonical_question format)
Week 2: 640 dòng (canonical_question format)
Week 3: 277 dòng (canonical_question format) ← Chưa đầy đủ?
Week 4: 1,099 dòng (question_variants format) ← GẤP ĐÔI
```

### Week 4 Breakdown (1,099 dòng):
```
Metadata + Vocab: ~100 dòng
Mission 1: ~380 dòng
  - 9 regular objectives (question_variants) × 25 dòng = 225 dòng
  - 2 student invitations × 20 dòng = 40 dòng
  - 1 goodbye = 15 dòng
  - Mission config = 100 dòng
Mission 2: ~360 dòng (tương tự)
Mission 3: ~250 dòng (ít objectives hơn)
FreeTalk knowledge: ~100 dòng
```

**Kết luận**: 60% nội dung là **objectives với question_variants**!

---

## 🤔 VẤN ĐỀ VỚI 1 PROMPT 2,000 DÒNG

### ❌ Nhược điểm:

1. **Token waste khi generate**: Claude phải đọc HẾT 2,000 dòng mỗi lần
   - Chỉ cần generate Mission 1 → đọc 2,000 dòng
   - Generate Mission 2 → lại đọc 2,000 dòng
   - Generate Mission 3 → lại đọc 2,000 dòng
   - **Total**: 6,000 dòng cho 3 missions (3x lãng phí!)

2. **Cognitive overload**: AI khó focus vào phần đang cần
   - Example Week 1 trộn lẫn Example Week 4
   - Schema canonical_question trộn lẫn question_variants
   - AI bị confused giữa 2 formats

3. **Khó maintain**: Sửa 1 section → phải đọc lại toàn bộ file

4. **Khó debug**: Khi AI generate sai, khó biết đọc sai phần nào

### ✅ Cách AI thực sự làm việc:

Claude generate week_XX_real.js theo **TỪN buớc tuần tự**:
```
Step 1: Generate metadata + vocab → Cần: Schema reference (100 dòng)
Step 2: Generate Mission 1 → Cần: Mission structure + Objective format (200 dòng)
Step 3: Generate Mission 2 → Cần: Same as Step 2
Step 4: Generate Mission 3 → Cần: Same as Step 2
Step 5: Generate FreeTalk → Cần: FreeTalk schema (50 dòng)
```

**Mỗi step chỉ cần 50-200 dòng reference, KHÔNG cần 2,000 dòng!**

---

## 💡 ĐỀ XUẤT: TÁCH THÀNH MODULE SYSTEM

### Cấu trúc mới (4 files thay vì 1):

```
MASS_PROMPTS/
├── V29_AI_TUTOR_CORE.txt           (~400 dòng) ← PROMPT CHÍNH
├── V29_AI_TUTOR_SCHEMA_BASIC.txt   (~300 dòng) ← Reference 1
├── V29_AI_TUTOR_SCHEMA_VARIANT.txt (~400 dòng) ← Reference 2
└── V29_AI_TUTOR_EXAMPLES.txt       (~600 dòng) ← Reference 3
```

---

### FILE 1: V29_AI_TUTOR_CORE.txt (~400 dòng) ⬅️ ĐỌC ĐẦU TIÊN

**Mục đích**: Execution guide + workflow + khi nào đọc file nào

**Nội dung**:
```
I. Introduction (50 dòng)
   - Purpose of week_XX_real.js
   - File location
   - When to use

II. Execution Order (100 dòng) ⬅️ QUAN TRỌNG NHẤT
   STEP 1: Read syllabus_database.js for theme
   STEP 2: Determine CEFR level
   STEP 3: Choose format:
      - Week 1-3 → Read V29_AI_TUTOR_SCHEMA_BASIC.txt
      - Week 4+ → Read V29_AI_TUTOR_SCHEMA_VARIANT.txt
   STEP 4: Generate metadata + vocab (use SCHEMA_BASIC Section I)
   STEP 5: Generate Mission 1 (use chosen SCHEMA)
   STEP 6: Generate Mission 2 (use chosen SCHEMA)
   STEP 7: Generate Mission 3 (use chosen SCHEMA)
   STEP 8: Generate FreeTalk (use SCHEMA_BASIC Section VI)
   STEP 9: Validate (checklist below)

III. Schema Format Decision Tree (50 dòng)
   Week 1-18 (A0) → canonical_question
   Week 19+ → question_variants
   Flowchart

IV. File Structure Overview (100 dòng)
   - Metadata fields list
   - target_vocab structure (brief)
   - story_missions structure (brief)
   - FreeTalk structure (brief)
   - Refer to SCHEMA files for details

V. Validation Checklist (100 dòng)
   - Before generation checks
   - After generation checks
   - Validation commands
```

**Cách dùng**: Claude đọc file này FIRST, sau đó được hướng dẫn đọc file nào tiếp theo

---

### FILE 2: V29_AI_TUTOR_SCHEMA_BASIC.txt (~300 dòng)

**Khi nào đọc**: Week 1-3 (canonical_question format)

**Nội dung**:
```
I. Complete Schema (150 dòng)
   - Metadata
   - target_vocab (7-10 words)
   - story_missions array
   - Mission config

II. Objectives: canonical_question Format (100 dòng)
   {
     stepKey: "string",
     category: "string",
     canonical_question: "Single question?",
     hints: ["word1", "word2", "word3", "word4", "word5"],
     target_keywords: [...],
     ack_options: ["Nice!", "Great!", "Wonderful!"],
     recast_templates: [...],
     success_criteria: "string"
   }
   - Hints: 5-6 individual words
   - Example from Week 1

III. Goodbye Objective (20 dòng)

IV. FreeTalk Knowledge (30 dòng)
   - Schema only
```

**Token saving**: Chỉ 300 dòng thay vì 2,000 dòng!

---

### FILE 3: V29_AI_TUTOR_SCHEMA_VARIANT.txt (~400 dòng)

**Khi nào đọc**: Week 4+ (question_variants format)

**Nội dung**:
```
I. Complete Schema (150 dòng)
   - Metadata
   - target_vocab (7-10 words)
   - story_missions array
   - Mission config

II. Objectives: question_variants Format (150 dòng)
   {
     stepKey: "string",
     category: "string",
     question_variants: [  // 3 variants
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
     ack_options: ["Nice!", "Great!", "Wonderful!"],
     recast_templates: [...],
     success_criteria: "string"
   }
   - Hints: 6-9 words (full scrambled sentence)
   - How to scramble
   - Transformation table

III. Student Question Invitations (70 dòng)
   {
     stepKey: "student_question_1",
     category: "Student Inquiry",
     type: "invitation",
     question_variants: [...],
     allow_skip: true
   }
   - Placement: every 3-4 objectives
   - Empty hints array
   - Example

IV. Goodbye Objective (20 dòng)

V. FreeTalk Knowledge (30 dòng)
```

**Token saving**: Chỉ 400 dòng, focused vào Week 4+ format!

---

### FILE 4: V29_AI_TUTOR_EXAMPLES.txt (~600 dòng) ⬅️ CHỈ ĐỌC KHI CẦN

**Khi nào đọc**: Khi Claude confused hoặc cần reference

**Nội dung**:
```
I. Week 1 Mission 1 - Complete Example (150 dòng)
   - Full metadata
   - 10 objectives (canonical_question)
   - Individual word hints
   - All fields complete

II. Week 2 Mission 2 - Complete Example (150 dòng)
   - Family theme
   - TurnManager title keywords
   - canonical_question format

III. Week 4 Mission 1 - Complete Example (300 dòng) ⬅️ GOLDEN STANDARD
   - Full metadata
   - 9 regular objectives (question_variants)
   - 2 student invitations
   - 1 goodbye
   - All fields complete
   - Full scrambled sentence hints
```

**Cách dùng**: 
- CORE prompt nói: "If confused, read EXAMPLES file"
- Claude chỉ đọc khi thật sự cần
- Không phải đọc mỗi lần generate

---

## 📈 SO SÁNH TOKEN USAGE

### Scenario: Generate Week 5 (question_variants format)

#### Cách cũ (1 prompt 2,000 dòng):
```
Generate metadata + vocab: 2,000 dòng
Generate Mission 1: 2,000 dòng
Generate Mission 2: 2,000 dòng
Generate Mission 3: 2,000 dòng
Generate FreeTalk: 2,000 dòng
Total: 10,000 dòng input tokens
```

#### Cách mới (4 prompts module):
```
1. Read CORE: 400 dòng
2. Read SCHEMA_VARIANT: 400 dòng
3. Generate metadata + vocab: (400+400) = 800 dòng
4. Generate Mission 1: (400+400) = 800 dòng
5. Generate Mission 2: (400+400) = 800 dòng
6. Generate Mission 3: (400+400) = 800 dòng
7. Generate FreeTalk: (400+400) = 800 dòng
Total: 4,800 dòng input tokens
```

**Tiết kiệm: 52%** (10,000 → 4,800 dòng)

**Nếu cần EXAMPLES**: +600 dòng chỉ khi confused
- Worst case: 5,400 dòng (vẫn tiết kiệm 46%)

---

## 🎯 ĐỀ XUẤT CUỐI CÙNG

### Cấu trúc 4 files tối ưu:

```
1. V29_AI_TUTOR_CORE.txt (400 dòng)
   → Always read first
   → Execution guide + decision tree

2. V29_AI_TUTOR_SCHEMA_BASIC.txt (300 dòng)
   → Read for Week 1-3
   → canonical_question format

3. V29_AI_TUTOR_SCHEMA_VARIANT.txt (400 dòng)
   → Read for Week 4+
   → question_variants + invitations

4. V29_AI_TUTOR_EXAMPLES.txt (600 dòng)
   → Read only when confused
   → Week 1, 2, 4 complete examples
```

**Total**: 1,700 dòng (thay vì 2,000 dòng)
**Tiết kiệm**: 52% token usage per generation
**Maintainability**: Sửa 1 format không ảnh hưởng format khác

---

## ✅ LỢI ÍCH

### 1. Token Economy:
- Mỗi mission chỉ đọc 800 dòng (thay vì 2,000)
- Generate Week 5-156: Tiết kiệm hàng triệu tokens

### 2. Cognitive Focus:
- AI chỉ đọc format đang cần (canonical vs variants)
- Không bị confused giữa 2 formats
- Examples riêng → chỉ đọc khi cần

### 3. Maintainability:
- Update Week 4+ format → chỉ sửa SCHEMA_VARIANT
- Update examples → chỉ sửa EXAMPLES
- CORE prompt ít khi cần sửa

### 4. Scalability:
- Thêm Week 5+ format mới? → Add file mới, không động cũ
- Thêm Week 10 examples? → Add vào EXAMPLES file

### 5. Error Reduction:
- Format rõ ràng → ít lỗi
- Examples riêng → dễ verify
- Validation checklist tập trung

---

## ❓ PHẢN BIỆN: CÓ NÊN TÁCH KHÔNG?

### Nhược điểm của việc tách:

1. **Nhiều file hơn**: 4 files thay vì 1
   - Nhưng: Mỗi file nhỏ, focused, dễ quản lý

2. **Phải đọc nhiều lần**: CORE → SCHEMA → EXAMPLES
   - Nhưng: Tổng tokens ít hơn 52%

3. **Phải nhớ đọc đúng thứ tự**: CORE first → SCHEMA → EXAMPLES
   - Nhưng: CORE có execution guide rõ ràng

### Ưu điểm của việc tách:

1. **Tiết kiệm 52% tokens** → Tiết kiệm tiền + nhanh hơn
2. **AI focus hơn** → Ít lỗi hơn
3. **Dễ maintain** → Update 1 file không ảnh hưởng khác
4. **Scalable** → Thêm format mới dễ dàng

**KẾT LUẬN**: ✅ **NÊN TÁCH!**

---

## 🚀 HÀNH ĐỘNG TIẾP THEO

### Option A: Tách 4 files (ĐỀ XUẤT)
```
1. Tạo V29_AI_TUTOR_CORE.txt (400 dòng)
2. Tạo V29_AI_TUTOR_SCHEMA_BASIC.txt (300 dòng)
3. Tạo V29_AI_TUTOR_SCHEMA_VARIANT.txt (400 dòng)
4. Tạo V29_AI_TUTOR_EXAMPLES.txt (600 dòng)
Total: 1,700 dòng, 52% token saving
```

### Option B: Giữ 1 file 2,000 dòng
```
Pros: Đơn giản, 1 file
Cons: Lãng phí tokens, khó maintain, AI confused
```

**Gợi ý**: Chọn Option A (tách 4 files)

---

**BẠN QUYẾT ĐỊNH**: Tách 4 files hay giữ 1 file 2,000 dòng?
