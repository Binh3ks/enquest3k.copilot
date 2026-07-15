# QUY TRÌNH TẠO WEEK 3 - ENGQUEST3K
## Tài liệu Mô tả Chi tiết & Danh sách File cần Tạo

**Ngày**: 16/01/2026  
**Phiên bản**: 1.0  
**Trạng thái**: Chờ Duyệt từ chủ Dự án  
**Cơ sở**: Master Prompt V28 + Syllabus + Blueprint  

---

## 📋 PHẦN I: TỔNG QUAN QUY TRÌNH

### 1.1 Mục tiêu Week 3
```
Week 3: "The Mirror Game" (Trò chơi Soi gương)
Chủ đề: Describing Physical Traits (Miêu tả đặc điểm ngoại hình)
Grammar Focus (Implicit): "is" vs "has" (She is tall vs She has long hair)
Vocabulary: tall, short, hair, eyes, long, curly, straight, glasses
Chuẩn độ: CEFR A0 (Beginner)
Giai đoạn: Phase 1 (Weeks 1-54) - Nền tảng Trôi chảy
```

### 1.2 Đặc tính của Week 3
- **Dual Mode**: Easy Mode (cá nhân, cụ thể) + Advanced Mode (toàn cầu, trừu tượng)
- **Chuẩn vàng tham khảo**: Week 1 ("The Young Scholar") & Week 2 ("My Family Squad")
- **Tổng cộng file**: 29 file (14 Advanced + 14 Easy + 1 AI Tutor)
- **Đặc thù**: KHÔNG thay đổi schema, chỉ nội dung

---

## 📂 PHẦN II: DANH SÁCH FILE CẦN TẠO

### 2.1 Cấu trúc Thư mục

```
src/data/weeks/week_03/
├── index.js                    # Aggregator (13 stations + voiceConfig)
├── vocab.js                    # 10 từ cốt lõi ⚠️ PHẢI TẠO TRƯỚC
├── read.js                     # Bài đọc chính (10 bold từ từ vocab.js)
├── explore.js                  # CLIL - 10 từ KHÁC (90% unique)
├── word_power.js               # 3 Collocations (Phase 1)
├── grammar.js                  # 20 Exercises (10 MC + 4-6 Fill + 2-4 Unscramble)
├── logic.js                    # 5 Puzzles + Full Story Context
├── ask_ai.js                   # 5 A0 Prompts (≤10 words context) ⚠️ CRITICAL
├── writing.js                  # Writing Challenge + Model Sentence
├── dictation.js                # Copy từ read.js (auto-generated)
├── shadowing.js                # Copy từ read.js (auto-generated)
├── word_match.js               # Placeholder (uses vocab.js)
├── mindmap.js                  # Speaking Stems + 3 Branches
└── daily_watch.js + video_queries.json  # 3-5 Videos từ Priority Channels

src/data/weeks_easy/week_03/   # Same structure as above (Easy Mode content)
```

### 2.2 Danh sách 29 File Chi tiết

#### **ADVANCED MODE (14 files)**

| # | Tên File | Loại | Mô Tả | Dòng Code | Ghi Chú |
|---|----------|------|-------|----------|--------|
| 1 | `vocab.js` | JS | 10 từ cốt lõi (Advanced) | 50-80 | ⚠️ TẠO TRƯỚC |
| 2 | `read.js` | JS | Bài đọc chính (Advanced: 10-11 câu, 8-10 từ/câu) | 80-120 | 10 bold words từ vocab.js |
| 3 | `explore.js` | JS | CLIL - Science/Nature topic (Advanced: 10-11 câu) | 80-120 | 10 từ KHÁC từ read.js |
| 4 | `word_power.js` | JS | 3 Collocations (Phase 1) | 50-70 | Verb + Noun phrases |
| 5 | `grammar.js` | JS | 20 Exercises (Advanced level) | 150-200 | Mix: MC + Fill + Unscramble |
| 6 | `logic.js` | JS | 5 Math/Logic Puzzles + Context | 80-120 | Full story context (không cắt ngắn) |
| 7 | `ask_ai.js` | JS | 5 A0 Prompts (Advanced: 8-10 words context) | 60-80 | CRITICAL: Không A1 patterns |
| 8 | `writing.js` | JS | Writing Challenge + Model Sentence | 40-50 | No image_url field |
| 9 | `dictation.js` | JS | Copy từ read.js (tự động) | 20-30 | Same as read.js |
| 10 | `shadowing.js` | JS | Copy từ read.js (tự động) | 20-30 | Same as read.js |
| 11 | `word_match.js` | JS | Placeholder (uses vocab.js) | 10-20 | Tối giản |
| 12 | `mindmap.js` | JS | Speaking Stems (Advanced) | 100-150 | 6 stems × 6 branches each (standard) |
| 13 | `daily_watch.js` | JS | 3-5 YouTube Videos (Priority Channels) | 50-80 | English Singsing, Little Fox, Vooks |
| 14 | `video_queries.json` | JSON | Search Keywords for Videos | 10-20 | Backup nếu không tìm được video |

#### **EASY MODE (14 files)**

| # | Tên File | Loại | Mô Tả | Dòng Code | Ghi Chú |
|---|----------|------|-------|----------|--------|
| 15 | `vocab.js` | JS | 10 từ cốt lõi (Easy: Tier 1, max 2 âm tiết) | 50-80 | Same vocabulary as Advanced |
| 16 | `read.js` | JS | Bài đọc chính (Easy: 6-8 câu, 5-7 từ/câu) | 60-90 | 10 bold words từ vocab.js |
| 17 | `explore.js` | JS | CLIL - Simpler topic (Easy: 6-8 câu) | 60-90 | 10 từ KHÁC từ Advanced |
| 18 | `word_power.js` | JS | 3 Collocations (Phase 1) | 50-70 | Same collocations as Advanced |
| 19 | `grammar.js` | JS | 20 Exercises (Easy level) | 150-200 | Simpler vocab, shorter sentences |
| 20 | `logic.js` | JS | 5 Math/Logic Puzzles + Context (Easy) | 80-120 | Số nhỏ hơn, context rõ ràng |
| 21 | `ask_ai.js` | JS | 5 A0 Prompts (Easy: 5-6 words context) | 60-80 | More scaffolded hints |
| 22 | `writing.js` | JS | Writing Challenge + Model Sentence (Easy) | 40-50 | Simpler prompts, more guidance |
| 23 | `dictation.js` | JS | Copy từ read.js (tự động) | 20-30 | Same as read.js |
| 24 | `shadowing.js` | JS | Copy từ read.js (tự động) | 20-30 | Same as read.js |
| 25 | `word_match.js` | JS | Placeholder (uses vocab.js) | 10-20 | Tối giản |
| 26 | `mindmap.js` | JS | Speaking Stems (Easy) | 100-150 | 6 stems × 6 branches (simplified vocabulary) |
| 27 | `daily_watch.js` | JS | 3-5 YouTube Videos (Easy) | 50-80 | Same videos as Advanced (or similar) |
| 28 | `video_queries.json` | JSON | Search Keywords for Videos (Easy) | 10-20 | Backup nếu không tìm được |

#### **AI TUTOR (1 file)**

| # | Tên File | Loại | Mô Tả | Dòng Code | Ghi Chú |
|---|----------|------|-------|----------|--------|
| 29 | `week_03_real.js` | JS | AI Tutor Mission + Steps (V28 Format) | 200-300 | ⚠️ CRITICAL: ack/recast/question format |

#### **AGGREGATOR (sẽ tạo tự động sau)**

| # | Tên File | Loại | Mô Tả | Dòng Code | Ghi Chú |
|---|----------|------|-------|----------|--------|
| 30 | `index.js` (Advanced) | JS | Combine 13 stations + voiceConfig | 80-120 | Tạo sau khi các file khác hoàn |
| 31 | `index.js` (Easy) | JS | Same structure, different data | 80-120 | Tạo sau khi các file khác hoàn |

---

## 📝 PHẦN III: CHI TIẾT NỘI DUNG TỪNG FILE

### 3.1 VOCAB.JS (TRƯỚC TIÊN - CRITICAL)

#### Week 3: "The Mirror Game"

**10 Từ Cốt lõi (Advanced)**:
```
1. tall      - chiều cao (cao)
2. short     - chiều cao (thấp)
3. hair      - tóc
4. eyes      - mắt
5. long      - dài (về tóc)
6. curly     - xoăn
7. straight  - thẳng
8. glasses   - kính mắt
9. smile     - nụ cười
10. face     - mặt
```

**Định dạng mẫu**:
```javascript
{
  id: 1,
  word: "tall",
  pronunciation: "/tɔːl/",
  definition_vi: "Cao (chiều cao)",
  definition_en: "Having great height. You are tall if you reach high places easily.",
  example: "I am tall. My brother is taller than me.",
  collocation: "tall building",
  image_url: "/images/week3/tall.jpg",
  audio_word: "/audio/week3/vocab_tall.mp3"
}
```

**Yêu cầu**:
- ✅ Đúng 10 từ
- ✅ IPA pronunciation chính xác
- ✅ Definition tiếng Việt + tiếng Anh
- ✅ Example ≤ 8 từ (A0)
- ✅ Collocation đơn giản
- ✅ image_url + audio_word đúng format

---

### 3.2 READ.JS (Sử dụng 10 từ từ vocab.js)

#### Advanced Mode (10-11 câu, 8-10 từ/câu)

**Mẫu**:
```
Topic: Describing myself and my friends
Title: "My Friends are Different"

Content:
I have two best friends. **Sarah** is **tall** and has **long** **hair**. 
She has brown **eyes** and wears **glasses**. **Tom** is **short** and has **curly** **hair**. 
He has a big **smile** and a round **face**. We are different, but we are best friends.

(7 câu, ~70 từ, 10 bold từ)
```

**Yêu cầu**:
- ✅ Đúng 10 bold words từ vocab.js
- ✅ 10-11 sentences (Advanced)
- ✅ 8-10 words per sentence
- ✅ CEFR A0: Present Simple only
- ✅ No past tense, no complex grammar
- ✅ Có Vietnamese translation (content_vi)
- ✅ audio_url: null (sẽ fill tự động)
- ✅ 3 comprehension questions (A0 patterns: What/Where/Is)

---

### 3.3 EXPLORE.JS (10 TỪ KHÁC - 90% UNIQUE)

#### CLIL Topic: Mirrors & Reflection (Science)

**Read.js words** (10):
tall, short, hair, eyes, long, curly, straight, glasses, smile, face

**Explore.js words** (10 NEW):
mirror, reflection, image, glass, surface, light, bright, clear, see, opposite

**Content**:
```
Topic: How Mirrors Work (Science)
Title: "Magic Mirrors"

Content:
A **mirror** is a flat **surface** made of **glass**. 
When **light** hits the **mirror**, it makes a **reflection**. 
The **image** in the **mirror** looks the same, but **opposite**. 
Your **left** side looks like **right** side in the **mirror**. 
Can you see the **brightness** of the **light**?

(Cấu trúc: 8-11 câu, 10 bold từ KHÁC)
```

**Yêu cầu**:
- ✅ KHÁC 90% từ read.js (max 2 từ overlap)
- ✅ CLIL topic liên quan (Science/Nature)
- ✅ 10-11 sentences (Advanced)
- ✅ 8-10 words per sentence
- ✅ 3 comprehension questions (A0)
- ✅ 1 open-ended question

---

### 3.4 WORD_POWER.JS (3 Collocations - Phase 1)

**Mẫu**:
```javascript
{
  id: 1,
  word: "brush hair",
  pronunciation: "/brʌʃ heər/",
  definition_en: "To clean and arrange your hair using a brush.",
  definition_vi: "Chải tóc",
  example: "I brush my hair every morning.",
  model_sentence: "She brushes her hair before school.",
  collocation: "brush hair",
  image_url: "/images/week3/brush_hair.jpg"
}
```

**3 Collocations cho Week 3**:
1. **brush hair** - chải tóc
2. **wear glasses** - đeo kính
3. **see reflection** - thấy bóng (câu, hoặc: nhìn thấy bóng)

**Yêu cầu**:
- ✅ Đúng 3 collocations (Phase 1)
- ✅ Verb + Noun phrases
- ✅ Có full example sentence
- ✅ image_url đúng format
- ✅ Chuẩn CEFR A0

---

### 3.5 GRAMMAR.JS (20 Exercises)

**Mix bắt buộc**:
- Multiple Choice: 10-12 (vd: 11)
- Fill Blank: 4-6 (vd: 5)
- Unscramble: 2-4 (vd: 4)

**Phủ sóng**:
- Affirmative: ~6 (vd: "She is tall")
- Negative: ~6 (vd: "He is not short")
- Questions: ~8 (vd: "Is she tall?")

**Mẫu Exercise**:
```javascript
{
  id: 1,
  type: "mc",
  question: "She ____ long hair.",
  options: ["is", "has", "has got", "do"],
  answer: "has",
  hint: "Use 'has' for possessions (hair, eyes)"
}
```

**Yêu cầu**:
- ✅ Đúng 20 exercises
- ✅ Mix type (MC, Fill, Unscramble)
- ✅ Coverage affirmative/negative/questions
- ✅ Vocabulary từ vocab.js + word_power.js
- ✅ Max 8 words per question
- ✅ A0 grammar patterns only

---

### 3.6 LOGIC.JS (5 Puzzles + Full Context)

**Mẫu**:
```javascript
{
  id: 1,
  type: "logic",
  title_en: "The Height Game",
  title_vi: "Trò chơi Chiều cao",
  question_en: "Sarah is taller than Tom. Tom is taller than Lisa. Who is the tallest?",
  question_vi: "Sarah cao hơn Tom. Tom cao hơn Lisa. Ai là người cao nhất?",
  answer: ["Sarah", "sarah"],
  hint_en: "Think about the order: Tallest → Shortest",
  hint_vi: "Sắp xếp thứ tự từ cao nhất đến thấp nhất"
}
```

**5 Puzzles cho Week 3**:
1. **Height Logic**: Sắp xếp chiều cao (Sarah > Tom > Lisa)
2. **Mirror Reflection**: Nhận biết hình ảnh đối xứng
3. **Counting Attributes**: Đếm số người có cùng đặc điểm
4. **Same or Different**: So sánh hai người
5. **Pattern Recognition**: Tìm quy luật trong hình ảnh

**Yêu cầu**:
- ✅ Đúng 5 puzzles
- ✅ Mỗi cái có FULL story context (không "2+3=?")
- ✅ Answer có unit/label (không chỉ số)
- ✅ Hint rõ ràng (2-3 từ)
- ✅ Tiếng Anh + Tiếng Việt

---

### 3.7 ASK_AI.JS (5 A0 Prompts - CRITICAL)

#### ⚠️ CRITICAL RULES:
- Context: **≤ 10 words** (Advanced: 8-10)
- Patterns: **A0 ONLY** (What is, Where is, Is this, Can I, Do you)
- **FORBIDDEN**: Why, How do they, What does it do, How many/much
- Answer: Simple (1-4 words)

**5 Prompts cho Week 3**:

```javascript
{
  id: 1,
  context_en: "You see a girl with curly hair. Ask what it is.", // 8 words ✅
  context_vi: "Bạn thấy một cô bé có tóc xoăn. Hỏi nó là gì.",
  answer: ["What is her hair?", "Is her hair curly?"], // A0 patterns
  hint: "What... / Is..."
}

{
  id: 2,
  context_en: "Your friend wears glasses. Ask why.", // 6 words ✅
  context_vi: "Bạn của bạn đeo kính. Hỏi tại sao.",
  answer: ["Why does he wear glasses?"], // ⚠️ This is A1! NOT ALLOWED
  // Better: ["Do you like glasses?", "Can you see without glasses?"]
}

{
  id: 3,
  context_en: "You look in the mirror. Ask what you see.", // 8 words ✅
  context_vi: "Bạn nhìn vào gương. Hỏi bạn nhìn thấy gì.",
  answer: ["What do you see?"],
  hint: "What... / Do you see..."
}

{
  id: 4,
  context_en: "Your friend is very tall. Ask how tall.", // 7 words ✅
  context_vi: "Bạn bạn rất cao. Hỏi bạn cao bao nhiêu.",
  answer: ["How tall are you?"], // ⚠️ "How" is A1 for measurement
  // Better: ["Are you very tall?"]
}

{
  id: 5,
  context_en: "Two friends have different hair styles. Ask about differences.", // 8 words ✅
  context_vi: "Hai bạn có kiểu tóc khác nhau. Hỏi về khác biệt.",
  answer: ["Do they have different hair?", "Is her hair different?"],
  hint: "Is / Do..."
}
```

**Yêu cầu**:
- ✅ Đúng 5 prompts
- ✅ Context ≤ 10 words (Advanced: 8-10, Easy: 5-6)
- ✅ Answer là A0 patterns ONLY
- ✅ NO "Why", NO "How many/much", NO "What does it do"
- ✅ Hint rõ ràng (2 words: "What is...", "Is...")
- ✅ Validator check: validate_ask_ai.js

---

### 3.8 WRITING.JS

**Mẫu**:
```javascript
export default {
  title: "Describe Your Friend",
  prompt_en: "Write about a friend. What does he/she look like?",
  prompt_vi: "Viết về một bạn. Bạn ấy trông như thế nào?",
  keywords: ["tall", "short", "hair", "eyes", "curly", "straight"],
  model_sentence_en: "My friend is tall and has curly hair.",
  model_sentence_vi: "Bạn tôi cao và có tóc xoăn.",
  min_words: 40
};
```

**Yêu cầu**:
- ✅ Prompt cụ thể, liên quan topic
- ✅ Model sentence cho Easy + Advanced (Phase 1)
- ✅ Keywords từ vocab.js (5-7 từ)
- ✅ min_words: 40 (Phase 1)
- ✅ **NO image_url field** (fixed in V25)

---

### 3.9 DAILY_WATCH.JS (3-5 Videos)

**Priority Channels** (Bắt buộc sử dụng):
1. **English Singsing** - Grammar videos (1-2 videos/week)
2. **Little Fox** - Story videos (1 video/week)
3. **Vooks** - Story backup (nếu cần)

**Mẫu**:
```javascript
{
  id: 1,
  title: "Describing People - English Singsing",
  videoId: "dQw4w9WgXcQ", // 11-char ID
  duration: "03:45",
  sim_duration: 225,
  thumb: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  channel: "English Singsing",
  purpose: "GRAMMAR"
}
```

**5 Video suggestions cho Week 3**:
1. **English Singsing**: "Describing People" (GRAMMAR)
2. **Little Fox**: "Lucy's Mirror Story" (STORY)
3. **Vooks**: "Looking in the Mirror" (STORY) - backup
4. **English Singsing**: "Body Parts Song" (VOCABULARY)
5. **Kids Learning Tube**: "Adjectives - Tall, Short, Long" (GRAMMAR)

**Yêu cầu**:
- ✅ 3-5 videos (3 is minimum)
- ✅ At least 1 English Singsing (GRAMMAR)
- ✅ At least 1 Little Fox or Vooks (STORY)
- ✅ Real YouTube IDs (11 characters)
- ✅ Duration correct format (MM:SS)
- ✅ Purpose tag: GRAMMAR/STORY/VOCABULARY/SCIENCE

---

### 3.10 WEEK_03_REAL.JS (AI TUTOR - V28 Format)

#### CRITICAL: V28 Format

**Structure**:
```javascript
export default {
  weekId: 3,
  weekTitle: "The Mirror Game",
  mission: {
    id: 1,
    title: "What Do I Look Like?",
    context: "Ms. Nova asks you to describe yourself and your friends.",
    target_vocab: ["tall", "short", "hair", "eyes", "curly", "straight", "glasses"],
    minimum_turns: 5,
    steps: [
      {
        id: 1,
        prompt: "Ms. Nova asks: 'Hello! Tell me about your appearance. Are you tall or short?'",
        contextual_guidance: "Think about your height",
        transition: "Great! Now tell me about your hair."
      },
      // ... more steps
    ]
  }
};
```

**Yêu cầu**:
- ✅ V28 JSON format: `ack` / `recast` / `question`
- ✅ NO `teacher_ack`, NO `teacher_recast`, NO `teacher_question`
- ✅ ACK: "Nice!" / "Great!" / "Wonderful!" only
- ✅ RECAST: ≤ 8 words, matches subject (you/she/he)
- ✅ QUESTION: A0 patterns only
- ✅ Subject agreement check (Critical)
  - Student about self → "you"
  - Student about mother → "she"
  - Student about father → "he"

---

### 3.11 MINDMAP.JS (Speaking Stems)

**6 Center Stems × 6 Branches Each (Standard Week Structure)**:

**Stem 1: Description**
```
"She is..."
├─ tall
├─ short
├─ beautiful
├─ strong
├─ happy
└─ kind
```

**Stem 2: Hair**
```
"Her hair is..."
├─ long
├─ short
├─ curly
├─ straight
├─ black
└─ brown
```

**Stem 3: Has**
```
"She has..."
├─ long hair
├─ glasses
├─ a smile
├─ brown eyes
├─ curly hair
└─ a round face
```

**Stem 4: Comparison**
```
"Tom is... Sarah"
├─ taller than
├─ shorter than
├─ different from
├─ the same as
├─ funnier than
└─ smarter than
```

**Stem 5: Look Like**
```
"I look like..."6 stems × 6
├─ my mother
├─ my father
├─ my brother
├─ my sister
├─ my friend
└─ a mirror image
```

**Stem 6: Describe**
```
"This person has..."
├─ a kind face
├─ strong arms
├─ happy eyes
├─ curly hair
├─ glasses on
└─ a big smile
```

---

## ✅ PHẦN IV: CHECKLIST TRƯỚC DỰA

### 4.1 Content Files (14 Advanced + 14 Easy)

**ADVANCED MODE**:
- [ ] `vocab.js` - 10 từ + IPA + định nghĩa VN/EN + example + image + audio
- [ ] `read.js` - 10-11 câu, 10 bold từ từ vocab.js, 3 comprehension questions
- [ ] `explore.js` - 10-11 câu, 10 từ KHÁC (90% unique), 3 comprehension + 1 open-ended
- [ ] `word_power.js` - 3 collocations, full sentences, image URLs
- [ ] `grammar.js` - 20 exercises (11 MC + 5 Fill + 4 Unscramble)
- [ ] `logic.js` - 5 puzzles with full context
- [ ] `ask_ai.js` - 5 prompts, 8-10 words context, A0 patterns ✅
- [ ] `writing.js` - Prompt + model sentence + keywords
- [ ] `dictation.js` - Auto (copy read.js)
- [ ] `shadowing.js` - Auto (copy read.js)
- [ ] `word_match.js` - Placeholder
- [ ] `mindmap.js` - 3 branches, A0 vocabulary
- [ ] `daily_watch.js` - 3-5 videos (English Singsing + Little Fox)
- [ ] `video_queries.json` - Search keywords

**EASY MODE**:
- [ ] Same as Advanced (with simpler content)
- [ ] `vocab.js` - Same 10 từ, simpler definitions
- [ ] `read.js` - 6-8 câu, 5-7 words/sentence
- [ ] `explore.js` - 6-8 câu, simpler CLIL topic
- [ ] Grammar/Logic/Ask-AI - Easier level

### 4.2 AI Tutor (1 file)

- [ ] `week_03_real.js` - V28 format (ack/recast/question)
- [ ] Subject agreement enforced
- [ ] ACK variety: only Nice/Great/Wonderful
- [ ] RECAST: ≤ 8 words, correct grammar

### 4.3 Quality Assurance

**Content Quality**:
- [ ] CEFR A0: No past tense, no conditionals
- [ ] Sentence length: Advanced 8-10 words, Easy 5-7 words
- [ ] Vocabulary Tier 1 (Advanced: Tier 1-2 max)
- [ ] Bold words consistent (10 in read, 10 in explore)

**ask_ai.js Compliance**:
- [ ] 5 prompts exactly
- [ ] Context ≤ 10 words (Advanced: 8-10, Easy: 5-6)
- [ ] Answer patterns: A0 ONLY
- [ ] FORBIDDEN: Why, How many/much, What does it do
- [ ] Validator passes: `validate_ask_ai.js`

**Schema Validation**:
- [ ] All required fields present
- [ ] Image URLs format: `/images/week3/...jpg`
- [ ] Audio URLs format: `/audio/week3/...mp3`
- [ ] No null/empty URLs
- [ ] JSON syntax valid

---

## 🎯 PHẦN V: QUY TRÌNH THỰC HIỆN

### Step 1: Tạo Content Files
**Claude creates** 29 files theo template trên (14 Advanced + 14 Easy + 1 AI Tutor)

### Step 2: Validate Quality
```bash
node tools/validate_week.js 3
```
**Kiểm tra**: 8 validation checks (syntax, counts, A0, ask_ai)

### Step 3: Sync Data
```bash
python tools/sync_week_data.py 3
```
**Auto-fill**: dictation + shadowing từ read.js, URLs từ naming convention

### Step 4: Register Database
```bash
node tools/update_db_smart.js 3
```
**Add entry** vào `src/data/syllabus_database.js`

### Step 5: Generate Audio
```bash
node tools/batch_manager.js 3 3
```
**Output**: ~130 MP3 files (65 Advanced + 70 Easy)

### Step 6: Generate Images
```bash
node tools/generate_images_nano_banana.js 3 both
```
**Output**: ~60 JPG files (30 Advanced + 30 Easy)

### Step 7: Fetch Videos
```bash
node tools/update_videos.js 3
```
**Output**: Real YouTube video IDs in daily_watch.js

### Step 8: Final Validation
```bash
# Compare với Week 1 baseline
ls src/data/weeks/week_03/*.js | wc -l  # Should be 14
ls public/audio/week3/*.mp3 | wc -l     # Should be ~130
ls public/images/week3/*.jpg | wc -l    # Should be ~30
```

---

## 📊 PHẦN VI: EXPECTED OUTPUT

### File Counts (Targets)

| Category | Advanced | Easy | Total |
|----------|----------|------|-------|
| Content Files (.js) | 14 | 14 | 28 |
| Metadata (.json) | 1 | 1 | 2 |
| Audio Files (.mp3) | 65 | 70 | 135 |
| Image Files (.jpg) | 30 | 30 | 60 |
| **TOTAL** | 110 | 115 | **225** |

### Vocabulary Distribution

| Category | Count | Overlap |
|----------|-------|---------|
| vocab.js | 10 | 100% (same in both modes) |
| word_power.js | 3 | 100% (same in both modes) |
| explore.js (Advanced) | 10 | - |
| explore.js (Easy) | 10 | ≤2 overlap with Advanced read.js |
| **TOTAL WORDS** | 23 | 90% unique |

---

## ⏱️ PHẦN VII: THỜI GIAN DỰ KIẾN

| Bước | Tên | Thời gian |
|------|------|----------|
| 1 | Manual Content Generation (Claude) | 30-45 phút |
| 2 | Validate Quality | 30 giây |
| 3 | Sync Data | 1 phút |
| 4 | Register Database | Instant |
| 5 | Generate Audio | 3-5 phút |
| 6 | Generate Images | 5-10 phút |
| 7 | Fetch Videos | 30 giây |
| 8 | Final Validation | 1 phút |
| **TOTAL** | - | **~45 phút** |

---

## 📋 PHẦN VIII: TEMPLATE REFERENCE

### Quick Reference - File Sizes

```
vocab.js           ~50-80 lines
read.js            ~80-120 lines
explore.js         ~80-120 lines
word_power.js      ~50-70 lines
grammar.js         ~150-200 lines
logic.js           ~80-120 lines
ask_ai.js          ~60-80 lines
writing.js         ~40-50 lines
dictation.js       ~20-30 lines (auto)
shadowing.js       ~20-30 lines (auto)
word_match.js      ~10-20 lines
mindmap.js         ~100-150 lines
daily_watch.js     ~50-80 lines
video_queries.json ~10-20 lines
index.js           ~50-70 lines (Advanced + Easy) ← MANUAL CREATION
week_03_real.js    ~200-300 lines
```

---

## 3.12 INDEX.JS (Aggregator - MANUAL CREATION)

⚠️ **IMPORTANT: This is NOT auto-generated. Must be created for BOTH modes.**

**Purpose**: Combines all 13 station files + voiceConfig into single export

**Template (based on Week 1 reference)**:

```javascript
import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import explore from './explore.js';
import word_power from './word_power.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import mindmap from './mindmap.js';

const weekData = {
  weekId: 3,
  isEasy: false,  // Change to true for Easy mode
  weekTitle_en: "The Mirror Game",
  weekTitle_vi: "Trò chơi Soi Gương",
  grammar_focus: "Adjectives - 'is' vs 'has'",
  global_vocab: vocab.vocab,
  
  // MANDATORY: voiceConfig (same for all Phase 1 weeks)
  voiceConfig: {
    narration: 'en-US-Neural2-D',    // US Male
    vocabulary: 'en-US-Neural2-F',   // US Female
    dictation: 'en-US-Neural2-F',    // US Female
    questions: 'en-US-Neural2-D',    // US Male
    mindmap: 'en-US-Neural2-D'       // US Male
  },
  
  // ALL 13 STATIONS
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    video: writing,
    writing: writing,
    explore: explore,
    word_power: word_power,
    daily_watch: daily_watch,
    mindmap_speaking: mindmap
  }
};

export default weekData;
```

**Key Requirements**:
- ✅ `weekId: 3` (must match week number)
- ✅ `isEasy: false` for Advanced, `true` for Easy
- ✅ Import ALL 13 station files
- ✅ `voiceConfig` MANDATORY (same voices for all Phase 1)
- ✅ `stations` object maps all stations correctly

**File Locations**:
- Advanced: `src/data/weeks/week_03/index.js`
- Easy: `src/data/weeks_easy/week_03/index.js`

---

## 3.13 SYLLABUS_DATABASE.JS (UPDATE)

⚠️ **CRITICAL: App dropdown depends on this**

**File location**: `src/data/syllabus_database.js`

**Current placeholder entry**:
```javascript
3: { title: "Observing Differences", grammar: ["Adjectives"], math: ["Height"], science: ["Senses"], topic: ["Appearance"] },
```

**Update to**:
```javascript
3: { 
  title: "The Mirror Game", 
  grammar: ["Adjectives (is vs has)"], 
  math: ["Comparisons"], 
  science: ["Senses - Sight"], 
  topic: ["Appearance & Physical Traits"] 
},
```

**Why This Is Critical**:
- App dropdown shows week titles from this database
- If not updated, Week 3 will display "Observing Differences" (old placeholder)
- Must match `weekTitle_en` in index.js for consistency

**Validation**:
- After all files created, test: `npm run dev`
- Navigate to Week dropdown
- Verify Week 3 shows "The Mirror Game" (not old name)

---

## 🔗 LIÊN KẾT TÀI LIỆU

- **Master Prompt V28**: ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt
- **Syllabus**: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt (Weeks 1-3 details)
- **Blueprint**: 2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt
- **Week 1 Golden Standard**: src/data/weeks/week_01/
- **Week 2 Reference**: src/data/weeks/week_02/

---

## ✨ GHI CHÚ QUAN TRỌNG

⚠️ **CRITICAL POINTS**:
1. **vocab.js FIRST**: Phải tạo trước, vì read.js phụ thuộc
2. **ask_ai.js VALIDATION**: V28 strict - context ≤ 10 words, A0 ONLY
3. **Subject Agreement**: V28 enforces "She" for mother questions (not "You")
4. **Dual Mode**: Easy ≠ Simple translate, content path khác (khác topic cho explore.js)
5. **Video URLs**: Real YouTube IDs (11 characters), priority channels first

---

**Status**: ✅ QUY TRÌNH SẴN SÀNG ĐỈ DỨC  
**Chờ duyệt**: ✏️ Duyệt danh sách file + content requirements

