# MASS PRODUCTION WORKFLOW - QUY TRÌNH HOÀN CHỈNH

**Mục đích**: Mô tả từng bước cụ thể để sản xuất Week 5-156  
**Cập nhật**: Sau khi fix Week 4 schemas (4-5 audio fields)  
**Thời gian**: ~45-60 phút/tuần

---

## 📊 TỔNG QUAN HỆ THỐNG

### **QUAN TRỌNG - Hiểu về Specs và Templates:**

#### ❓ **Tại sao chỉ có 2 specs?**
**Trả lời**: Specs **KHÔNG được tạo sẵn** cho 152 tuần!
- **Specs được GENERATE động** khi cần
- Chỉ có 2 specs (week 5-6) = ví dụ đã generate
- Khi generate Week 7: chạy `generate_spec.cjs 7` → tạo `week_07_spec.json`
- Mỗi tuần có spec riêng từ syllabus database

#### ❓ **Tại sao chỉ có 2 templates?**
**Trả lời**: Templates là **REFERENCE** (mẫu tham khảo), KHÔNG phải copy trực tiếp!
- `week_template_canonical.js` = Mẫu cho Week 1-3 (single question format)
- `week_template_variants.js` = Mẫu cho Week 4+ (3 question variants format)
- AI đọc template để hiểu cấu trúc, rồi **generate nội dung mới** dựa trên spec
- Mỗi tuần có nội dung UNIQUE, không copy y hệt template

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

```
SYLLABUS DATABASE (3 năm - 156 tuần)
         ↓
    [generate_spec.cjs] ← Script tạo spec động
         ↓
    SPEC FILE (week_XX_spec.json) ← Dữ liệu input bị "khóa"
         ↓
    [AI + 23 PROMPTS + TEMPLATES] ← AI generate content
         ↓
    29 FILES (1 AI Tutor + 14 Advanced + 14 Easy)
         ↓
    [validate_week_v2.cjs] ← Kiểm tra quality
         ↓
    [Asset Generation] ← Tạo audio/images/videos
         ↓
    ✅ TUẦN HOÀN CHỈNH
```

---

## 📁 CẤU TRÚC FOLDERS

```
MASS/
├── tools/
│   ├── generate_spec.cjs        ← Tạo spec từ syllabus
│   ├── create_week.cjs          ← Orchestrator chính
│   └── validate_week_v2.cjs     ← Validate output
│
├── SPECS/
│   ├── week_05_spec.json        ← Ví dụ đã generate
│   ├── week_06_spec.json        ← Ví dụ đã generate
│   └── (Week 7-156 generate khi cần)
│
├── TEMPLATES/
│   ├── week_template_canonical.js   ← Week 1-3 format
│   └── week_template_variants.js    ← Week 4+ format
│
└── PROMPTS/
    ├── 01_MASTER_ORCHESTRATOR.txt    ← Điều phối chính
    ├── 02_CRITICAL_CHANGES.txt       ← Breaking changes
    ├── 03_CEFR_GUIDELINES.txt        ← Chuẩn ngôn ngữ
    ├── 04-07_AI_TUTOR_*.txt          ← AI Tutor prompts
    ├── 08-11_STATIONS_*.txt          ← Stations prompts
    ├── 12_ASSET_GENERATION.txt       ← Audio/image guide
    └── 13-16_WORKFLOW_*.txt          ← Process guides
```

---

## 🔄 QUY TRÌNH 5 BƯỚC ĐẦY ĐỦ

### **BƯỚC 1: TẠO SPEC FILE (5 phút)**

#### Mục đích:
Extract dữ liệu từ syllabus database → tạo file spec bị "khóa" (AI không được modify)

#### Lệnh:
```bash
cd /Users/binhnguyen/Downloads/Engquest3k
node MASS/tools/generate_spec.cjs 7
```

#### Input:
- **Syllabus database**: `src/data/syllabus_database.js` (hardcoded 156 tuần)
- **Week number**: 7

#### Output:
- **File**: `MASS/SPECS/week_07_spec.json`

#### Nội dung spec:
```json
{
  "week_id": 7,
  "title_en": "Daily Routines",
  "title_vi": "Thói quen hàng ngày",
  "topic": "Time & Daily Activities",
  "topic_vi": "Thời gian & Hoạt động hàng ngày",
  "grammar_focus": "Present Simple (Daily routines)",
  "grammar_pattern": "I [verb] at [time]",
  "cefr_level": "A0",
  "vocab_count": 10,
  "target_vocab": [
    "wake up", "breakfast", "school", "lunch", "homework",
    "dinner", "sleep", "morning", "afternoon", "evening"
  ],
  "phase": 1,
  "block": "A",
  "unit": 2
}
```

#### Prompts sử dụng:
- KHÔNG CẦN prompts (script tự động extract từ database)

#### Templates sử dụng:
- KHÔNG CẦN templates

#### Thời gian:
- ~1 giây (chạy script tự động)

---

### **BƯỚC 2: GENERATE AI TUTOR (10-15 phút)**

#### Mục đích:
Generate 1 file `week_07_real.js` chứa toàn bộ AI Tutor data (3 missions + freetalk)

#### Lệnh:
```bash
# KHÔNG CÓ lệnh tự động - cần manual AI generation
# User phải copy prompts + spec vào AI tool (Claude/GPT)
```

#### Input files:
1. **Spec**: `MASS/SPECS/week_07_spec.json` (dữ liệu bị khóa)
2. **Prompts** (đọc theo thứ tự):
   - `MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt` (513 dòng)
   - `MASS/PROMPTS/04_AI_TUTOR_CORE.txt` (~400 dòng)
   - `MASS/PROMPTS/06_AI_TUTOR_SCHEMA_VARIANT.txt` (~400 dòng) ← Week 4+
   - `MASS/PROMPTS/07_AI_TUTOR_EXAMPLES.txt` (~600 dòng) nếu cần
3. **Template**: `MASS/TEMPLATES/week_template_variants.js` (reference)

#### AI Generation Process:
```
AI đọc:
├── 01_MASTER_ORCHESTRATOR → Hiểu workflow tổng thể
├── week_07_spec.json → Load dữ liệu tuần 7
├── 04_AI_TUTOR_CORE → Hiểu nguyên tắc design
├── 06_SCHEMA_VARIANT → Hiểu cấu trúc 3 question variants
├── week_template_variants.js → Xem ví dụ cấu trúc
└── Generate nội dung mới cho week 7
```

#### Output:
- **File**: `src/data/weeks/week_07_real.js` (~900-1100 lines)

#### Cấu trúc file:
```javascript
const week7RealData = {
  week_id: 7,
  title_en: "Daily Routines",
  title_vi: "Thói quen hàng ngày",
  
  // 10 từ vựng (từ spec)
  target_vocab: [
    {
      word_en: "wake up",
      word_vi: "thức dậy",
      phonetic: "/weɪk ʌp/",
      audio: "/audio/week7/vocab_wake_up.mp3",
      image: "/images/week7/vocab_wake_up.jpg",
      example_en: "I wake up at 7 AM.",
      example_vi: "Tôi thức dậy lúc 7 giờ sáng."
    },
    // ... 9 từ còn lại
  ],
  
  // 3 missions
  story_missions: [
    {
      mission_id: 1,
      title: "Morning Routine",
      objectives: [
        {
          objective_id: "7_1_1",
          question_variants: [
            {
              question_en: "When do you wake up?",
              question_vi: "Bạn thức dậy lúc mấy giờ?",
              // ... 3 variants
            }
          ]
        },
        // ... 6 objectives/mission
      ]
    },
    // ... Mission 2 & 3
  ],
  
  // FreeTalk knowledge
  freetalk_knowledge: {
    grammar_patterns: [...],
    vocabulary_groups: [...],
    common_phrases: [...]
  }
};

export default week7RealData;
```

#### Prompts sử dụng:
- ✅ `01_MASTER_ORCHESTRATOR.txt`
- ✅ `04_AI_TUTOR_CORE.txt`
- ✅ `06_AI_TUTOR_SCHEMA_VARIANT.txt` (Week 4+)
- ❓ `07_AI_TUTOR_EXAMPLES.txt` (optional nếu confused)

#### Templates sử dụng:
- ✅ `week_template_variants.js` (reference only)

#### Tokens estimate:
- Best case: 513 + 400 + 400 = ~1,313 dòng
- Worst case: 513 + 400 + 400 + 600 = ~1,913 dòng

---

### **BƯỚC 3: GENERATE ADVANCED STATIONS (20-25 phút)**

#### Mục đích:
Generate 14 files cho Advanced mode stations

#### Lệnh:
```bash
# KHÔNG CÓ lệnh tự động - cần manual AI generation
```

#### Input files:
1. **Spec**: `MASS/SPECS/week_07_spec.json`
2. **Prompts**:
   - `MASS/PROMPTS/08_STATIONS_CORE.txt` (~300 dòng)
   - `MASS/PROMPTS/09_STATIONS_ADVANCED.txt` (~600 dòng)
   - `MASS/PROMPTS/11_STATIONS_EXAMPLES.txt` (~400 dòng) nếu cần
3. **Template**: `MASS/TEMPLATES/week_template_variants.js`
4. **Reference**: `src/data/weeks/week_04/` (golden standard)

#### ⚠️ QUAN TRỌNG - Các quy tắc đặc biệt:

**dictation.js & shadowing.js**:
- ⚠️ KHÔNG TỰ VIẾT câu mới!
- ✅ COPY NGUYÊN XI 14 câu từ `read.js` passage
- dictation.js: Chỉ lấy text + meaning
- shadowing.js: Lấy text + meaning + thêm audio paths

#### AI Generation Process:
```
AI đọc:
├── week_07_spec.json → Load dữ liệu
├── 08_STATIONS_CORE → Nguyên tắc chung
├── 09_STATIONS_ADVANCED → Specifics cho Advanced
├── week_04/ (golden standard) → Xem cấu trúc actual
└── Generate 14 files theo schemas Week 4
```

#### Output files (14 files):
```
src/data/weeks/week_07/
├── vocab.js                 ← 10 words với 4 audio fields
├── word_power.js            ← 3 phrases với 5 audio fields
├── word_match.js            ← Simple pairs array [1-10]
├── read.js                  ← 1 reading passage
├── grammar.js               ← Grammar exercises
├── dictation.js             ← 3 dictation sentences
├── shadowing.js             ← 3 shadowing sentences
├── writing.js               ← Writing prompts
├── ask_ai.js                ← AI chat scenarios
├── logic.js                 ← Logic challenges
├── explore.js               ← Exploration activities
├── mindmap.js               ← 6 stems × 6 branches (36 total)
├── daily_watch.js           ← Video watching
├── video_queries.json       ← Video search queries
└── index.js                 ← Export tất cả
```

#### ⚠️ QUAN TRỌNG - Schemas cập nhật (Week 4 corrections):

**vocab.js** - 10 words với **4 audio fields**:
```javascript
export default {
  words: [
    {
      word: "wake up",
      phonetic: "/weɪk ʌp/",
      definition: "to stop sleeping",
      example: "I wake up at 7 AM every day.",
      collocation: "wake up early",
      image: "/images/week7/vocab_wake_up.jpg",
      audio_word: "/audio/week7/vocab_wake_up.mp3",
      audio_definition: "/audio/week7/vocab_def_wake_up.mp3",      // ← THÊM
      audio_example: "/audio/week7/vocab_ex_wake_up.mp3",          // ← THÊM
      audio_collocation: "/audio/week7/vocab_coll_wake_up.mp3"     // ← THÊM
    },
    // ... 9 words nữa
  ]
};
```

**word_power.js** - 3 phrases với **5 audio fields**:
```javascript
export default {
  phrases: [
    {
      word: "get ready for school",
      definition: "prepare yourself to go to school",
      example: "I get ready for school at 7:30.",
      collocation: "get ready quickly",
      audio_word: "/audio/week7/wordpower_get_ready.mp3",
      audio_definition: "/audio/week7/wordpower_def_get_ready.mp3",     // ← THÊM
      audio_example: "/audio/week7/wordpower_ex_get_ready.mp3",         // ← THÊM
      audio_collocation: "/audio/week7/wordpower_coll_get_ready.mp3",   // ← THÊM
      audio_model: "/audio/week7/wordpower_model_get_ready.mp3"         // ← THÊM
    },
    // ... 2 phrases nữa
  ]
};
```

**word_match.js** - Simple pairs:
```javascript
export default {
  pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};
```

#### Prompts sử dụng:
- ✅ `08_STATIONS_CORE.txt`
- ✅ `09_STATIONS_ADVANCED.txt`
- ❓ `11_STATIONS_EXAMPLES.txt` (optional)

#### Templates sử dụng:
- ✅ `week_template_variants.js` (reference)

#### Reference sử dụng:
- ✅ `src/data/weeks/week_04/` (golden standard cho schemas)

#### Tokens estimate:
- 300 + 600 = ~900 dòng (reuse cho tất cả 14 files)

#### Thời gian:
- ~20-25 phút (generate 14 files)

---

### **BƯỚC 4: GENERATE EASY STATIONS (20-25 phút)**

#### Mục đích:
Generate 14 files cho Easy mode stations (simplified version)

#### Lệnh:
```bash
# KHÔNG CÓ lệnh tự động - cần manual AI generation
```

#### Input files:
1. **Spec**: `MASS/SPECS/week_07_spec.json`
2. **Prompts**:
   - `MASS/PROMPTS/08_STATIONS_CORE.txt` (reuse từ Bước 3)
   - `MASS/PROMPTS/10_STATIONS_EASY.txt` (~500 dòng)
   - `MASS/PROMPTS/11_STATIONS_EXAMPLES.txt` (optional)
3. **Template**: `MASS/TEMPLATES/week_template_canonical.js` (simpler format)
4. **Reference**: `src/data/weeks_easy/week_04/` (golden standard)

#### AI Generation Process:
```
AI đọc:
├── week_07_spec.json → Cùng dữ liệu như Advanced
├── 08_STATIONS_CORE (reuse) → Nguyên tắc chung
├── 10_STATIONS_EASY → Simplify instructions
├── week_04_easy/ → Xem golden standard Easy
└── Generate 13 files (KHÔNG CÓ word_power!)
```

#### Output files (14 files - GIỐNG Advanced):
```
src/data/weeks_easy/week_07/
├── vocab.js                 ← 10 words với 4 audio fields (SAME as Advanced)
├── word_power.js            ← 3 phrases với 5 audio fields (CÓ MÀ!)
├── word_match.js            ← Copy vocab IDs: [1-10]
├── read.js                  ← Shorter passage (50-80 words)
├── grammar.js               ← Simpler exercises
├── dictation.js             ← 3 sentences (shorter)
├── shadowing.js             ← 3 sentences (simpler)
├── writing.js               ← Guided writing
├── ask_ai.js                ← Simple scenarios
├── logic.js                 ← Easier challenges
├── explore.js               ← Simpler activities
├── mindmap.js               ← 6 stems × 6 branches (36 total, SAME as Advanced)
├── daily_watch.js           ← Same videos
├── video_queries.json       ← Same queries
└── index.js                 ← Export tất cả
```

#### ⚠️ KHÁC BIỆT Easy vs Advanced:

| Station | Advanced | Easy |
|---------|----------|------|
| vocab.js | 10 words + 4 audio | 10 words + 4 audio (SAME) |
| word_power.js | ✅ 3 phrases + 5 audio | ✅ 3 phrases + 5 audio (SAME) |
| word_match.js | Simple pairs [1-10] | Simple pairs [1-10] (SAME) |
| read.js | 150-200 words passage | 50-80 words passage (SHORTER) |
| grammar.js | Complex tenses | Present simple only (SIMPLER) |
| mindmap.js | 6 stems × 6 branches (36) | 6 stems × 6 branches (36, SAME) |
| dictation.js | Copy read.js (14 câu) | Copy read.js (all sentences, SAME) |
| shadowing.js | Copy read.js (14 câu) | Copy read.js (all sentences, SAME) |

#### Prompts sử dụng:
- ✅ `08_STATIONS_CORE.txt` (reuse)
- ✅ `10_STATIONS_EASY.txt`
- ❓ `11_STATIONS_EXAMPLES.txt` (optional)

#### Templates sử dụng:
- ✅ `week_template_canonical.js` (simpler format)

#### Reference sử dụng:
- ✅ `src/data/weeks_easy/week_04/`

#### Tokens estimate:
- 0 (reuse CORE) + 500 = ~500 dòng

#### Thời gian:
- ~20-25 phút (generate 13 files)

---

### **BƯỚC 5: VALIDATION (5 phút)**

#### Mục đích:
Kiểm tra tất cả files đã generate đúng chuẩn chưa

#### Lệnh:
```bash
cd /Users/binhnguyen/Downloads/Engquest3k
node MASS/tools/validate_week_v2.cjs 7
```

#### Kiểm tra gì:
1. **File count**:
   - Advanced: 14 files ✅
   - Easy: 13 files ✅
   - AI Tutor: 1 file ✅

2. **Schema compliance**:
   - vocab.js: 10 words với 4 audio fields mỗi word ✅
   - word_power.js: 3 phrases với 5 audio fields (Advanced only) ✅
   - word_match.js: Có pairs array [1-10] ✅
   - read.js: Có passage + questions ✅
   - ... tất cả stations

3. **Audio paths**:
   - Tất cả audio paths follow naming convention ✅
   - `/audio/week7/vocab_[word].mp3`
   - `/audio/week7/vocab_def_[word].mp3`
   - `/audio/week7/vocab_ex_[word].mp3`
   - `/audio/week7/vocab_coll_[word].mp3`

4. **Required fields**:
   - Mỗi station có đủ fields theo schema ✅
   - Không có fields null/undefined ✅

#### Output:
```
✅ VALIDATION SUCCESSFUL!

Advanced Mode (14 files):
  ✅ vocab.js - 10 words, 4 audio fields each
  ✅ word_power.js - 3 phrases, 5 audio fields each
  ✅ word_match.js - 10 pairs
  ✅ read.js - 1 passage
  ✅ grammar.js - exercises OK
  ✅ dictation.js - 3 sentences
  ✅ shadowing.js - 3 sentences
  ✅ writing.js - prompts OK
  ✅ ask_ai.js - scenarios OK
  ✅ logic.js - challenges OK
  ✅ explore.js - activities OK
  ✅ mindmap.js - 9 scenarios
  ✅ daily_watch.js - video OK
  ✅ video_queries.json - queries OK

Easy Mode (14 files - GIỐNG Advanced):
  ✅ vocab.js - 10 words, 4 audio fields each
  ✅ word_power.js - 3 phrases, 5 audio fields each
  ✅ word_match.js - 10 pairs
  ✅ read.js - 1 passage (shorter)
  ✅ mindmap.js - 6 stems × 6 branches (SAME as Advanced)
  ... all other stations

AI Tutor (1 file):
  ✅ week_07_real.js - 3 missions, freetalk OK

Total audio paths: 268 (138 Advanced + 130 Easy)
Total image paths: 30 (15 Advanced + 15 Easy)
```

#### Prompts sử dụng:
- ✅ `14_WORKFLOW_VALIDATION.txt` (built into script)

#### Templates sử dụng:
- KHÔNG CẦN

#### Thời gian:
- ~5 giây (automated check)

---

### **BƯỚC 6: ASSET GENERATION (15-20 phút)**

#### Mục đích:
Generate audio files, images, và videos cho tuần mới

#### Lệnh:

**6.1. Generate Images**:
```bash
node tools/generate_images_nano.js 7
```
- Input: vocab words + scenarios từ week_07 files (CẢ 2 MODE)
- Output:
  - **Advanced**: ~15 images trong `public/images/week7/`
  - **Easy**: ~15 images trong `public/images/week7_easy/`
  - **TOTAL**: ~30 images
- Thời gian: ~5 phút

**6.2. Generate Audio**:
```bash
node tools/generate_audio.js 7 7
```
- Input: Tất cả text cần audio từ week_07 files (CẢ 2 MODE)
- Output: 
  - **Advanced**: ~138 files trong `public/audio/week7/`
  - **Easy**: ~130 files trong `public/audio/week7_easy/`
  - **TOTAL**: ~268 audio files
- Audio types (Advanced):
  - Vocab: 40 files (10 words × 4 audio each)
  - Word Power: 15 files (3 phrases × 5 audio each)
  - Read: 1 file
  - Dictation: 14 files
  - Shadowing: 15 files (1 full + 14 sentences)
  - Explore: 1 file
  - Mindmap: 42 files (6 stems + 36 branches)
  - Ask AI: 5 files
  - Logic: 5 files
- Audio types (Easy):
  - Same structure as Advanced (6 stems + 36 branches = 42 mindmap files)
- Thời gian: ~15 phút (cả 2 modes)

**6.3. Update Videos** (optional):
```bash
node tools/update_videos.js 7
```
- Input: Video queries từ `video_queries.json`
- Output: Video links trong `daily_watch.js`
- Thời gian: ~2 phút

#### Prompts sử dụng:
- ✅ `12_ASSET_GENERATION.txt` (guide cho scripts)

#### Templates sử dụng:
- KHÔNG CẦN

#### Verification:
```bash
# Check audio count
ls public/audio/week7/ | wc -l
# Expected: ~138 files (Advanced)
ls public/audio/week7_easy/ | wc -l
# Expected: ~130 files (Easy)

# Check images count
ls public/images/week7/ | wc -l
# Expected: ~15 files (Advanced)
ls public/images/week7_easy/ | wc -l
# Expected: ~15 files (Easy)
```

---

### **BƯỚC 7: DATABASE REGISTRATION (2 phút)**

#### Mục đích:
Register tuần mới vào syllabus database và lazy loading

#### Lệnh:
```bash
# Edit syllabus_database.js manually
code src/data/syllabus_database.js
```

#### Thêm entry:
```javascript
export const syllabusDatabase = {
  // ... existing weeks
  
  7: {
    week_id: 7,
    title_en: "Daily Routines",
    title_vi: "Thói quen hàng ngày",
    topic: "Time & Daily Activities",
    cefr_level: "A0",
    phase: 1,
    block: "A",
    unit: 2,
    // ... full spec data
  },
  
  // ...
};
```

#### Update lazy loading:
```bash
# src/data/weeks/index.js tự động detect file mới
# KHÔNG CẦN edit thủ công (sử dụng import.meta.glob)
```

#### Verify:
```javascript
import { syllabusDatabase } from './data/syllabus_database.js';
console.log(syllabusDatabase[7]); // Should show week 7 data
```

---

### **BƯỚC 8: UI TESTING & ITERATION (15-20 phút)**

#### Mục đích:
Test tuần mới trong UI, validate, fix bugs, test lại cho đến hoàn thiện

#### Lệnh:
```bash
npm run dev
# Server runs at http://localhost:5173
```

#### Open Simple Browser:
- VS Code: Command Palette → "Simple Browser: Show"
- Enter URL: `http://localhost:5173`
- Hoặc dùng external browser

#### Test checklist (ITERATION 1):

**8.1. AI Tutor**:
- [ ] Week 7 appears in week selector
- [ ] 3 missions load correctly
- [ ] Questions display với variants
- [ ] Audio plays for questions
- [ ] FreeTalk works

**8.2. Advanced Stations**:
- [ ] All 14 stations accessible
- [ ] Vocab station: 10 words với 4 audio buttons mỗi word
- [ ] Word Power: 3 phrases với 5 audio buttons mỗi phrase
- [ ] Word Match: Matching game works
- [ ] Read: Passage + questions display
- [ ] Grammar: Exercises work
- [ ] Dictation: Audio plays, input works
- [ ] Shadowing: Audio plays, recording works
- [ ] Writing: Prompts display
- [ ] Ask AI: Chat works
- [ ] Logic: Challenges display
- [ ] Explore: Activities work
- [ ] Mindmap: Scenarios load
- [ ] Daily Watch: Videos play

**8.3. Easy Stations**:
- [ ] All 13 stations accessible (NO word_power)
- [ ] Content simpler than Advanced
- [ ] Shorter reading passages
- [ ] Simpler grammar exercises

**8.4. Assets**:
- [ ] All audio files play correctly
- [ ] All images display correctly
- [ ] Videos load (if available)

#### Prompts sử dụng:
- ✅ `15_WORKFLOW_TESTING.txt`

#### ⚠️ ITERATION WORKFLOW - Lặp lại cho đến hoàn thiện:

**Nếu có lỗi trong UI**:
1. **Note errors**: Screenshot hoặc ghi lại lỗi cụ thể
2. **Check console**: `Ctrl+Shift+I` → Console tab
3. **Identify source**: File nào gây lỗi?
4. **Fix code**: Edit file stations tương ứng
5. **Re-validate**: `node MASS/tools/validate_week_v2.cjs 7`
6. **Refresh browser**: `Ctrl+R` hoặc `Cmd+R`
7. **Re-test**: Lặp lại test checklist
8. **Repeat**: Cho đến khi KHÔNG còn lỗi

**Common issues**:
- ❌ Audio not playing → Check audio paths in code vs actual files
- ❌ Images not showing → Check image paths + file extensions
- ❌ Station not loading → Check index.js exports
- ❌ Questions not displaying → Check question_variants structure
- ❌ Missing data → Check all required fields present

**Definition of Done**:
- ✅ NO console errors
- ✅ All audio files play
- ✅ All images display
- ✅ All stations accessible
- ✅ All interactions work (click, type, record)
- ✅ Both modes work (Advanced + Easy)
- ✅ Can complete full week flow

---

## 📊 TỔNG KẾT QUY TRÌNH

### **Tổng thời gian: ~50-70 phút/tuần** (bao gồm iteration testing)

| Bước | Thời gian | Scripts | Prompts | Templates | Output |
|------|-----------|---------|---------|-----------|--------|
| 1. Generate Spec | 1 giây | generate_spec.cjs | - | - | week_XX_spec.json |
| 2. AI Tutor | 10-15 phút | Manual AI | 01,04,06,07 | variants.js | week_XX_real.js |
| 3. Advanced Stations | 20-25 phút | Manual AI | 08,09,11 | variants.js | 14 files |
| 4. Easy Stations | 20-25 phút | Manual AI | 08,10,11 | variants.js | 14 files (CÓ word_power) |
| 5. Validation | 5 giây | validate_week_v2.cjs | 14 | - | Report |
| 6. Assets | 15-20 phút | generate_audio/images | 12 | - | ~268 audio + 30 images |
| 7. Database | 2 phút | Manual edit | - | - | Updated DB |
| 8. UI Testing | 15-20 phút | npm run dev + browser | 15 | - | Verified + Fixed |

### **Tổng tokens estimate: ~3,113 dòng**
- Bước 1: 0 (automated)
- Bước 2: 513 + 400 + 400 = 1,313 dòng
- Bước 3: 300 + 600 = 900 dòng
- Bước 4: 500 dòng (reuse CORE)
- Bước 5-8: 0 (automated/manual testing)

**So với V28**: 155,672 dòng → **98% giảm tokens!**

---

## 🎯 VÍ DỤ HOÀN CHỈNH: GENERATE WEEK 7

### **Command sequence:**

```bash
# Terminal 1: Generate spec
cd /Users/binhnguyen/Downloads/Engquest3k
node MASS/tools/generate_spec.cjs 7
# Output: MASS/SPECS/week_07_spec.json ✅

# Terminal 2: AI Tutor (Manual AI tool)
# Copy these into Claude/GPT:
# - MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt
# - MASS/PROMPTS/04_AI_TUTOR_CORE.txt
# - MASS/PROMPTS/06_AI_TUTOR_SCHEMA_VARIANT.txt
# - MASS/SPECS/week_07_spec.json
# - MASS/TEMPLATES/week_template_variants.js
# Ask AI: "Generate week_07_real.js following these prompts"
# Save to: src/data/weeks/week_07_real.js ✅

# Terminal 3: Advanced Stations (Manual AI)
# Copy these into Claude/GPT:
# - MASS/PROMPTS/08_STATIONS_CORE.txt
# - MASS/PROMPTS/09_STATIONS_ADVANCED.txt
# - MASS/SPECS/week_07_spec.json
# - Reference: src/data/weeks/week_04/ (golden standard)
# Ask AI: "Generate 14 Advanced station files"
# Save to: src/data/weeks/week_07/ ✅

# Terminal 4: Easy Stations (Manual AI)
# Copy these into Claude/GPT:
# - MASS/PROMPTS/08_STATIONS_CORE.txt
# - MASS/PROMPTS/10_STATIONS_EASY.txt
# - MASS/SPECS/week_07_spec.json
# - Reference: src/data/weeks_easy/week_04/
# Ask AI: "Generate 13 Easy station files"
# Save to: src/data/weeks_easy/week_07/ ✅

# Terminal 5: Validation
node MASS/tools/validate_week_v2.cjs 7
# Output: ✅ All checks passed

# Terminal 6: Generate assets
node tools/generate_images_nano.js 7
# Output: 30 images in public/images/week7/ ✅

node tools/generate_audio.js 7 7
# Output: 138 audio files in public/audio/week7/ ✅

node tools/update_videos.js 7
# Output: Video links updated ✅

# Terminal 7: Update database (Manual)
code src/data/syllabus_database.js
# Add week 7 entry ✅

# Terminal 8: Test
npm run dev
# Open http://localhost:5173
# Test Week 7 in UI ✅

# Terminal 9: Commit
git add .
git commit -m "Week 7: Daily Routines - Complete with 29 files + assets"
git push ✅
```

---

## ❓ CÂU HỎI THƯỜNG GẶP

### **Q1: Tại sao không tạo sẵn 152 specs?**
**A**: Specs rất nhẹ (1KB/file), generate động giúp:
- Dễ update syllabus database (1 nơi)
- Tránh sync issues (152 files)
- Generate on-demand khi cần

### **Q2: Tại sao không có script tự động generate AI content?**
**A**: AI generation cần context window lớn và creative judgment:
- Claude/GPT Web UI có context 200K tokens
- Script automation bị giới hạn API rate limits
- Manual review ensures quality

### **Q3: Có thể generate nhiều tuần cùng lúc?**
**A**: KHÔNG khuyến khích:
- Context window sẽ quá tải
- Quality giảm (AI skip details)
- Hard to debug errors
- Best practice: 1 tuần/lần

### **Q4: Template có thay đổi không?**
**A**: Templates ổn định:
- `canonical.js` cho Week 1-3 (rare, đã generate xong)
- `variants.js` cho Week 4-156 (consistent format)
- Nếu cần update schema → update golden standard (Week 4)

### **Q5: Prompts có thay đổi không?**
**A**: Prompts evolve:
- Core principles stable (08-10 STATIONS)
- Schemas update khi fix bugs (Week 4 audio fields)
- Always reference latest Week 4 as golden standard

### **Q6: Làm sao track progress 152 tuần?**
**A**: Tracking spreadsheet:
```
Week | Spec | AI Tutor | Advanced | Easy | Validation | Assets | Status
-----|------|----------|----------|------|------------|--------|--------
1    | ✅   | ✅       | ✅       | ✅   | ✅         | ✅     | Done
2    | ✅   | ✅       | ✅       | ✅   | ✅         | ✅     | Done
3    | ✅   | ✅       | ✅       | ✅   | ✅         | ✅     | Done
4    | ✅   | ✅       | ✅       | ✅   | ✅         | ✅     | Done
5    | ✅   | ✅       | ✅       | ✅   | ✅         | ✅     | Done
6    | ✅   | ❌       | ❌       | ❌   | ❌         | ❌     | In Progress
7-156| ❌   | ❌       | ❌       | ❌   | ❌         | ❌     | Pending
```

### **Q7: Week 4 có gì đặc biệt?**
**A**: Week 4 là **GOLDEN STANDARD**:
- ✅ Full schemas với 4-5 audio fields
- ✅ Có word_match.js (missing trong Week 1-3)
- ✅ Complete 138 audio files
- ✅ Reference cho tất cả weeks tiếp theo
- ⚠️ Nếu update Week 4 → update prompts + templates

---

## 📝 CHECKLIST MỖI TUẦN

**Trước khi bắt đầu**:
- [ ] Syllabus database có data cho tuần này
- [ ] Week 4 golden standard stable
- [ ] Prompts updated với schemas mới nhất

**Generate content**:
- [ ] Spec generated: `MASS/SPECS/week_XX_spec.json`
- [ ] AI Tutor: `src/data/weeks/week_XX_real.js`
- [ ] Advanced: 14 files in `src/data/weeks/week_XX/`
- [ ] Easy: 13 files in `src/data/weeks_easy/week_XX/`

**Validation**:
- [ ] Schema compliance: All fields correct
- [ ] Audio paths: Follow naming convention
- [ ] Image paths: Follow naming convention
- [ ] No null/undefined values

**Assets**:
- [ ] Images: ~30 files in `public/images/week_XX/`
- [ ] Audio: ~138 files in `public/audio/week_XX/`
- [ ] Videos: Links updated (optional)

**Integration**:
- [ ] Database updated: `syllabusDatabase[XX]`
- [ ] Lazy loading works (auto-detect)

**Testing**:
- [ ] Week appears in selector
- [ ] AI Tutor missions work
- [ ] All stations load
- [ ] Audio plays correctly
- [ ] Images display correctly
- [ ] No console errors

**Commit**:
- [ ] **TRƯỚC KHI COMMIT**: Kiểm tra Git status (xem section Git Best Practices phía dưới)
- [ ] `git add src/data/weeks/week_XX`
- [ ] `git add src/data/weeks_easy/week_XX`
- [ ] `git add public/audio/week_XX`
- [ ] `git add public/images/week_XX`
- [ ] ⚠️ **KHÔNG commit**: .wrangler/, Backup/, server folders, large .txt files
- [ ] Verify: `git diff --cached --stat` (chỉ thấy week files)
- [ ] `git commit -m "Week XX: [Title] - Complete"`
- [ ] `git push`

---

## 🧹 GIT HYGIENE & REPOSITORY BEST PRACTICES

> **⚠️ QUAN TRỌNG**: Repository được clean up vào March 13, 2026
> - Giảm từ 6,479 → 1,600 tracked files (-75%)
> - Giảm .git/ size từ 453MB → 289MB (-36%)
> - ✅ Tất cả file không cần thiết đã được loại bỏ khỏi Git history

### 📁 Files NÊN COMMIT (Production Code):

```bash
✅ Source Code:
   - src/data/weeks/week_XX/**/*.js
   - src/data/weeks_easy/week_XX/**/*.js
   - src/components/**/*.jsx
   - src/services/**/*.js
   - src/hooks/**/*.js

✅ Assets (Curated):
   - public/audio/week_XX/**/*.mp3      # Chỉ audio đã validate
   - public/images/week_XX/**/*.jpg     # Chỉ images đã optimize
   - public/videos/                     # Nếu self-hosted

✅ Configuration:
   - package.json, package-lock.json
   - vite.config.js, wrangler.toml
   - .gitignore (luôn update!)
   - MASS/tools/**/*.cjs               # Production scripts
   - MASS/PROMPTS/**/*.txt             # AI prompts

✅ Documentation (Essential Only):
   - README.md
   - MASS_PRODUCTION_*.md (latest versions)
   - ARCHITECTURE_*.md
   - API_*.md
```

### 🚫 Files KHÔNG BAO GIỜ COMMIT:

```bash
❌ Development Cache:
   - .wrangler/                    # Cloudflare dev cache (100MB+)
   - node_modules/                 # NPM packages (auto-install)
   - dist/                         # Build output (auto-generate)
   - .debris/                      # Temp files

❌ Backend/Servers:
   - esl_server/                   # TTS backend (deprecated)
   - mcp-server/                   # VSCode dev tool (local only)
   - Any */node_modules/           # Nested dependencies

❌ Backups & Archives:
   - Backup/                       # Local backups
   - Production_FINAL/             # Archive folders
   - MASS_Final/                   # Old versions
   - *_backup/                     # Any backup folders

❌ Large Documentation Duplicates:
   - *MASTER PROMPT*.txt           # Keep only in MASS/PROMPTS/
   - *_copy.txt, *_copy 2.txt      # Delete duplicates
   - *SYLLABUS*.txt                # Keep only in database

❌ OS & IDE Files:
   - .DS_Store                     # MacOS folder metadata
   - Icon\r                        # MacOS custom icons
   - .vscode/                      # VSCode workspace settings
   - *.swp, *.swo                  # Vim temp files

❌ Sensitive Data:
   - .env, .env.local              # API keys
   - *API keys*.txt                # Credentials
```

### ✅ Pre-Commit Checklist (TRƯỚC MỖI LẦN COMMIT):

```bash
# 1. Kiểm tra Git status
git status

# 2. Review danh sách files STAGED
#    ✅ CHỈ nên thấy: src/data/weeks/*, public/audio/*, public/images/*
#    ❌ KHÔNG nên thấy: .wrangler/, node_modules/, Backup/, *.txt copies
git diff --cached --name-only

# 3. Nếu thấy file KHÔNG nên commit → UNSTAGE ngay:
git reset HEAD .wrangler/
git reset HEAD "*.txt"
git reset HEAD Backup/

# 4. Kiểm tra kích thước commit (nên < 10MB cho code, < 50MB cho assets)
git diff --cached --stat

# 5. Verify .gitignore đang hoạt động
git check-ignore -v .wrangler/
# Expected: .gitignore:XX:.wrangler/    .wrangler/

# 6. CHỈ ADD files cần thiết (KHÔNG dùng "git add .")
git add src/data/weeks/week_XX
git add public/audio/week_XX
git add public/images/week_XX

# 7. Commit với message rõ ràng
git commit -m "feat: Week XX - [Topic Title]

- Add 14 Advanced station files
- Add 13 Easy station files
- Add 143 audio files (vocab, dictation, shadowing, etc.)
- Add 23 images (vocab, covers, logic puzzles)"

# 8. Push to GitHub
git push
```

### 🔍 Git Status Examples:

**✅ GOOD - Chỉ commit production files:**
```bash
$ git status
Changes to be committed:
  new file:   src/data/weeks/week_15/vocab.js
  new file:   src/data/weeks/week_15/read.js
  new file:   public/audio/week_15/vocab_running.mp3
  new file:   public/images/week_15/vocab_running.jpg
```

**❌ BAD - Có file không cần thiết:**
```bash
$ git status
Changes to be committed:
  new file:   src/data/weeks/week_15/vocab.js
  new file:   .wrangler/state/v3/r2/blobs/abc123    ← ❌ UNSTAGE!
  new file:   Backup/old_version.js                 ← ❌ UNSTAGE!
  modified:   ENGQUEST MASTER PROMPT V27 copy.txt   ← ❌ UNSTAGE!
```

**FIX:**
```bash
git reset HEAD .wrangler/
git reset HEAD Backup/
git reset HEAD "*.txt"
```

### 🛡️ .gitignore Maintenance:

```bash
# Verify .gitignore is tracking everything correctly
cat .gitignore

# Expected entries:
# - .wrangler/
# - esl_server/
# - mcp-server/
# - Backup/
# - Production_FINAL/
# - MASS_Final/
# - *MASTER PROMPT*.txt
# - *_copy.txt
# - Icon?

# Test if files are properly ignored
git status --ignored

# Should show:
# Ignored files:
#   (use "git add -f <file>..." to include in what will be committed)
#         .wrangler/
#         esl_server/
#         ...
```

### 📊 Monitoring Repository Health:

```bash
# Check repository size
du -sh .git/
# Target: < 300MB (current: 289MB after cleanup)

# Count tracked files
git ls-files | wc -l
# Target: < 2000 files (current: 1,600 files)

# Find largest files in repository
git rev-list --objects --all \
  | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
  | awk '$1=="blob" && $3 > 1000000 {print $3/1024/1024 " MB", $4}' \
  | sort -rn | head -10

# Expected: Only legitimate images (1-2MB each), NO code files > 1MB

# Check for accidentally committed large files
git log --all --pretty=format: --name-only --diff-filter=A \
  | sort -u \
  | while read file; do
      [ -f "$file" ] && [ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file") -gt 1000000 ] && echo "$(du -h "$file")"
    done
```

### 🚨 Emergency: Nếu Commit Nhầm File Lớn:

**Trường hợp 1: CHƯA PUSH (local only)**
```bash
# Undo commit nhưng giữ changes
git reset --soft HEAD~1

# Unstage file không cần thiết
git reset HEAD .wrangler/
git reset HEAD "large_file.txt"

# Commit lại (chỉ files cần thiết)
git add src/data/weeks/week_XX/
git commit -m "Week XX: Complete"
```

**Trường hợp 2: ĐÃ PUSH lên GitHub**
```bash
# ⚠️ WARNING: Phải force push, sẽ rewrite history!

# Remove from latest commit
git rm --cached -r .wrangler/
git commit --amend -m "Week XX: Complete (removed cache files)"
git push --force

# Remove from ALL history (nếu đã commit nhiều lần)
# 1. Install BFG: brew install bfg
# 2. Backup: git clone --mirror <repo> backup.git
# 3. Clean: bfg --delete-folders .wrangler .
# 4. Expire: git reflog expire --expire=now --all
# 5. GC: git gc --prune=now --aggressive
# 6. Push: git push --force
```

### 📝 Weekly Git Workflow Summary:

**Mỗi tuần sản xuất (Week XX):**

1. **Generate content** → Local files created
2. **Validate** → Ensure quality
3. **Generate assets** → Audio/images ready
4. **Pre-commit check** → `git status` (verify ONLY production files)
5. **Selective add** → `git add src/data/weeks/week_XX public/audio/week_XX public/images/week_XX`
6. **Verify staged** → `git diff --cached --stat` (should be ~170 files, ~20-50MB)
7. **Commit** → Clear message with breakdown
8. **Push** → `git push` (should be fast, <100KB for code)

**🎯 Result**: Clean commits, fast pushes, no repository bloat!

---

## 🚀 BẮT ĐẦU MASS PRODUCTION

**Tuần tiếp theo**: Week 7

**Lệnh đầu tiên**:
```bash
node MASS/tools/generate_spec.cjs 7
```

**Sau đó**: Follow Bước 2-8 như trên

**Estimated timeline** (assuming ~1 hour/week): 
- 1 tuần/ngày = 152 ngày (~5 tháng)
- 2 tuần/ngày = 76 ngày (~2.5 tháng)  
- 3 tuần/ngày = 51 ngày (~1.7 tháng)

**Realistic with iterations**: Add 20% time for bug fixes = ~60 days total nếu 3 tuần/ngày

**Good luck! 🎉**
