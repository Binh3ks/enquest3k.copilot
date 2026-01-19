# HƯỚNG DẪN SỬ DỤNG GENERIC PROMPT

## 📋 TỔNG QUAN

File `PROMPT_FOR_CLAUDE_CHAT_GENERIC.txt` là **template tổng quát** để generate content cho **BẤT KỲ tuần nào** (Week 1-156).

**30 files sẽ được tạo:**
- 14 files Advanced mode
- 14 files Easy mode
- 1 file AI Tutor (shared)
- 1 file video_queries.json (input cho update_videos.js tool)

---

## 🚀 CÁCH SỬ DỤNG

### Bước 1: Chuẩn bị thông tin từ Syllabus

Từ file syllabus, lấy thông tin của tuần cần generate:

```
Week Number: 5
Theme: My Daily Routine
CEFR Level: A0++
Grammar Focus: Present Simple - affirmative sentences
Target Vocabulary: wake up, brush teeth, eat breakfast, go to school, have lunch, do homework, play, watch TV, take a bath, go to bed
Phase: 1
Block: A
```

### Bước 2: Sửa phần CONTEXT trong prompt

Mở file `PROMPT_FOR_CLAUDE_CHAT_GENERIC.txt`, tìm phần **CONTEXT** (dòng 7-18), replace các placeholder:

**TRƯỚC (Generic):**
```
**Week Number**: {WEEK_NUMBER}  
**Theme**: {WEEK_THEME}  
**CEFR Level**: {CEFR_LEVEL} (usually A0++ for Phase 1)  
**Grammar Focus**: {GRAMMAR_FOCUS}  
**Target Vocabulary**: {10_VOCABULARY_WORDS}
```

**SAU (Week 5 example):**
```
**Week Number**: 5
**Theme**: My Daily Routine
**CEFR Level**: A0++
**Grammar Focus**: Present Simple - affirmative sentences
**Target Vocabulary**: wake up, brush teeth, eat breakfast, go to school, have lunch, do homework, play, watch TV, take a bath, go to bed
```

### Bước 3: Copy toàn bộ prompt vào Claude Chat

1. Mở [claude.ai](https://claude.ai)
2. Tạo new chat
3. Copy **TOÀN BỘ** nội dung file đã sửa
4. Paste vào Claude Chat
5. Enter

### Bước 4: Nhận output và lưu vào file

Claude sẽ generate **30 files** với format:

```
=== FILE: ADVANCED/vocab.js ===
export default { ... }
=== END FILE ===

=== FILE: ADVANCED/read.js ===
export default { ... }
=== END FILE ===

[... 28 files nữa ...]
```

**Nếu response quá dài**, Claude sẽ split thành 2 parts:
- **Part 1**: 14 ADVANCED files + video_queries.json (15 files)
- **Part 2**: 14 EASY files + AI Tutor (15 files)

### Bước 5: Lưu output vào 1 file text

1. Copy TOÀN BỘ output của Claude (cả 2 parts nếu có)
2. Save vào file: `week_05_output.txt`

### Bước 6: Chạy parser để tạo files

```bash
cd /Users/binhnguyen/Downloads/Engquest3k
node tools/parse_claude_output.js week_05_output.txt 5
```

Parser sẽ:
- Đọc file output
- Tách thành 30 files riêng biệt
- Tạo folders:
  - `src/data/weeks/week_05/` (14 Advanced files)
  - `src/data/weeks_easy/week_05/` (14 Easy files)
  - `src/data/weeks/week_05_real.js` (1 AI Tutor - parent level)
  - `src/data/weeks/week_05/video_queries.json` (1 Video Queries)

---

## 📝 LƯU Ý QUAN TRỌNG

### 1. Placeholders phải được replace thủ công

Generic prompt có các placeholders cần thay bằng thông tin thực:

| Placeholder | Ví dụ | Vị trí |
|-------------|-------|--------|
| `{WEEK_NUMBER}` | 5 | CONTEXT section |
| `{WEEK_THEME}` | My Daily Routine | CONTEXT section |
| `{CEFR_LEVEL}` | A0++ | CONTEXT section |
| `{GRAMMAR_FOCUS}` | Present Simple - affirmative | CONTEXT section |
| `{10_VOCABULARY_WORDS}` | wake up, brush teeth, eat... | CONTEXT section |
| `{PHASE_NUMBER}` | 1 | AI Tutor section |
| `{BLOCK_LETTER}` | A | AI Tutor section |

### 2. Week number trong file paths

Prompt sẽ tự động dùng `{XX}` cho week number trong paths:
- `/audio/week{XX}/vocab_word.mp3` → Claude sẽ replace bằng week number trong CONTEXT
- `/images/week{XX}_easy/word.jpg` → Tự động replace

### 3. Video Queries cần tư duy

Phần **video_queries.json** cần tư duy về keywords phù hợp:

**Ví dụ Week 5 - Daily Routine:**
```json
{
  "masterQuery": "daily routine present simple for kids ESL",
  "grammar": "present simple affirmative verbs actions",
  "videos": [
    {
      "id": 1,
      "query": "English Singsing present simple daily routine song",
      "purpose": "GRAMMAR"
    },
    {
      "id": 2,
      "query": "daily routine morning activities for kids",
      "purpose": "TOPIC"
    },
    {
      "id": 3,
      "query": "my day routine Little Fox ESL cartoons",
      "purpose": "TOPIC"
    },
    {
      "id": 4,
      "query": "Numberblocks time clock telling time",
      "purpose": "SCIENCE"
    },
    {
      "id": 5,
      "query": "SciShow Kids sleep healthy habits children",
      "purpose": "SCIENCE"
    }
  ]
}
```

### 4. AI Tutor missions cần creativity

3 missions phải liên quan đến theme, ví dụ Week 5:

- **Mission 1**: "My Morning Routine" (talk about breakfast, getting ready)
- **Mission 2**: "After School Activities" (homework, play, dinner)
- **Mission 3**: "Bedtime Routine" (bath, brush teeth, sleep)

Claude sẽ tự động generate dựa trên theme, nhưng bạn có thể hint trong CONTEXT.

---

## ⚠️ XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: Claude quên bold vocab words

**Triệu chứng**: read.js không có **bold words**

**Giải pháp**: Thêm vào prompt:
```
REMINDER: read.js MUST have EXACTLY 10 bolded words: **word1**, **word2**, etc.
```

### Lỗi 2: Sentences quá ngắn/dài

**Triệu chứng**: 
- Advanced: Sentences chỉ 5-6 words
- Easy: Sentences 10+ words

**Giải pháp**: Nhắc lại trong prompt:
```
CRITICAL REMINDER:
- Advanced mode: 8-14 words per sentence
- Easy mode: 5-8 words per sentence
```

### Lỗi 3: Thiếu files

**Triệu chứng**: Output chỉ có 28 files thay vì 30

**Giải pháp**: 
1. Đếm số file trong output
2. Nếu thiếu, ask Claude: "You forgot {missing_file}.js. Please generate it."

### Lỗi 4: Video queries không có channel names

**Triệu chứng**: Queries không mention "English Singsing", "Numberblocks", etc.

**Giải pháp**: Nhắc Claude:
```
For video_queries.json:
- Query 1 MUST include "English Singsing"
- Query 4-5 MUST include "Numberblocks" or "SciShow Kids"
```

---

## 🎯 WORKFLOW ĐẦY ĐỦ (7 STEPS)

```bash
# Step 1: Lấy info từ syllabus → Update CONTEXT trong generic prompt
vim PROMPT_FOR_CLAUDE_CHAT_GENERIC.txt

# Step 2: Copy prompt → Claude Chat → Generate
# (Làm trên browser claude.ai)

# Step 3: Save output
# Copy output → Save to week_05_output.txt

# Step 4: Parse output thành files
node tools/parse_claude_output.js week_05_output.txt 5

# Step 5: Validate code quality
node tools/validate_week.js 5

# Step 6: Sync dictation/shadowing from read.js
python3 tools/sync_week_data.py 5

# Step 7: Generate video metadata từ video_queries.json
node tools/update_videos.js 5

# Step 8: Generate audio files
node tools/generate_audio.js 5

# Step 9: Generate image prompts
node tools/generate_image_prompts.js 5 > week5_image_prompts.txt
```

---

## 📊 CHECKLIST TRƯỚC KHI SUBMIT

Sau khi generate, check:

- [ ] 30 files đã được tạo (14 Advanced + 14 Easy + 1 AI Tutor + 1 video_queries.json)
- [ ] vocab.js (cả 2 modes) có đúng 10 words
- [ ] read.js (cả 2 modes) có đúng 10 bolded words
- [ ] grammar.js (cả 2 modes) có đúng 20 exercises
- [ ] Audio paths đúng format: `/audio/week{XX}/...` và `/audio/week{XX}_easy/...`
- [ ] Image paths đúng format: `/images/week{XX}/...` và `/images/week{XX}_easy/...`
- [ ] AI Tutor có 3 missions, mỗi mission 15 turns
- [ ] video_queries.json có 5 queries (1 GRAMMAR + 2 TOPIC + 2 SCIENCE)
- [ ] Không có markdown code blocks (```javascript)
- [ ] Không có placeholders còn sót lại ({...})

---

## 🔄 CẬP NHẬT PROMPT CHO TUẦN MỚI

Khi cần generate Week mới, **CHỈ CẦN** sửa phần CONTEXT:

```diff
- **Week Number**: 5
+ **Week Number**: 6

- **Theme**: My Daily Routine
+ **Theme**: Food and Drink

- **Grammar Focus**: Present Simple - affirmative sentences
+ **Grammar Focus**: Do you like...? Yes, I do / No, I don't

- **Target Vocabulary**: wake up, brush teeth, eat breakfast, go to school, have lunch, do homework, play, watch TV, take a bath, go to bed
+ **Target Vocabulary**: apple, banana, milk, water, rice, chicken, fish, bread, juice, egg
```

Không cần sửa gì khác! Prompt structure vẫn giữ nguyên.

---

## 💡 TIPS

1. **Luôn validate sau khi generate**:
   ```bash
   node tools/validate_week.js {WEEK_NUMBER}
   ```

2. **Nếu Claude generate sai, đừng generate lại toàn bộ**. Chỉ cần:
   ```
   Please regenerate ADVANCED/read.js only with EXACTLY 10 bolded vocab words.
   ```

3. **Save các version tốt**:
   ```bash
   cp week_05_output.txt week_05_output_GOOD.txt
   ```

4. **Test với Week nhỏ trước** (Week 3-5) để quen workflow trước khi generate Week lớn.

5. **Video queries có thể manual edit sau**:
   - Generate files trước
   - Edit video_queries.json sau nếu queries không tốt
   - Run `node tools/update_videos.js {WEEK}` lại

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:

1. Check file `tools/parse_claude_output.js` có parse đúng separator format không
2. Check validation errors: `node tools/validate_week.js {WEEK}`
3. Check structure của Week 1-2 (golden standard)

**Format chuẩn của separator:**
```
=== FILE: ADVANCED/vocab.js ===
{code}
=== END FILE ===
```

Không được có:
- Markdown code blocks: ❌ ```javascript
- Placeholders: ❌ {...existing code...}
- Comments thừa: ❌ // ... rest of file
