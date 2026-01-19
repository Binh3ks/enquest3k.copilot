# 📝 BÁO CÁO RÀ SOÁT NỘI DUNG WEEK 1 - PHIÊN BẢN ĐẦY ĐỦ
## Đánh giá toàn diện theo Syllabus, Blueprint & App Architecture

**Ngày**: 13/01/2026  
**Phạm vi**: Week 1 Advanced + Easy Mode + AI Tutor  
**Mục tiêu**: Rà soát nội dung và đề xuất cải tiến

---

## I. TỔNG QUAN CẤU TRÚC ĐÃ RÀ SOÁT

### A. Stations đã kiểm tra (15)
| # | Station | File | Status |
|---|---------|------|--------|
| 1 | Read & Explore | read.js | ✅ Có |
| 2 | New Words | vocab.js | ✅ Có |
| 3 | Word Match | word_match.js | ✅ Có |
| 4 | Grammar | grammar.js | ✅ Có |
| 5 | Mindmap Speaking | mindmap.js | ✅ Có |
| 6 | Ask AI | ask_ai.js | ✅ Có |
| 7 | Dictation | dictation.js | ✅ Có |
| 8 | Shadowing | shadowing.js | ✅ Có |
| 9 | Writing | writing.js | ✅ Có |
| 10 | Explore | explore.js | ✅ Có |
| 11 | Logic Lab | logic.js | ✅ Có |
| 12 | Word Power | word_power.js | ✅ Có |
| 13 | Daily Watch | daily_watch.js | ✅ Có |
| 14 | Game Hub | N/A (built-in) | ✅ OK |
| 15 | Self Regulation | N/A (built-in) | ✅ OK |

### B. AI Tutor Tabs (5)
| Tab | Data Source | Status |
|-----|-------------|--------|
| Story Mission | week_01_real.js | ✅ Có (3 missions) |
| Free Talk | week data | ✅ Dynamic |
| Pronunciation | vocab.js | ✅ Uses vocab |
| Quiz | week data | ✅ Dynamic |
| Debate | N/A | ✅ Built-in |

### C. Supporting Files
| File | Status |
|------|--------|
| index.js | ✅ Có |
| video_queries.json | ✅ Có |
| week1_objectives.js | ✅ Có |

---

## II. PHÂN TÍCH CHI TIẾT TỪNG COMPONENT

### 📖 1. READ.JS - Read & Explore

#### ADVANCED MODE
**Current Content**:
```
Title: "Alex's School Day"
10 Bold Words: name, student, School, backpack, books, notebooks, classroom, teacher, library, scientist
```

| Tiêu chí | Đánh giá | Chi tiết |
|----------|----------|----------|
| Grammar alignment | ✅ Tốt | "I am", "She is", "There are" |
| Story engagement | ⚠️ Cần cải thiện | Thiếu conflict/emotion |
| Bold words match | ⚠️ Vấn đề | "books"/"notebooks" plural, vocab.js có singular |
| Sentence variety | ✅ OK | Có compound sentences |

**VẤN ĐỀ CỤ THỂ**:
1. `**books**` và `**notebooks**` trong read.js là số nhiều
2. `vocab.js` có `book` và `notebook` (số ít)
3. → **Không khớp chính xác** → Component có thể không highlight đúng

**KHUYẾN NGHỊ**:
```javascript
// Sửa read.js - dùng số ít để match vocab.js:
content_en: "...I carry many **book** items and **notebook** pages..."
// HOẶC sửa vocab.js để có cả hai forms
```

#### EASY MODE
**Current Content**:
```
Title: "My New Classroom"
Bold Words: name, desk, friend, chair, pen, bag, picture, door
```

| Tiêu chí | Đánh giá | Chi tiết |
|----------|----------|----------|
| Sentence length | ⚠️ Quá dài | 11 câu thay vì 6-8 |
| Bold words | ⚠️ Thiếu | Chỉ 8 từ, thiếu "toy", "box" |
| Vocabulary level | ✅ Đúng | Tier 1, concrete |

**KHUYẾN NGHỊ**:
1. Rút ngắn xuống 6-8 câu
2. Thêm bold cho "toy" và "box" hoặc bỏ từ vocab không dùng

---

### 📚 2. VOCAB.JS - New Words

#### ADVANCED MODE (10 từ)
```
student, teacher, school, classroom, backpack, book, notebook, library, scientist, name
```

| Tiêu chí | Đánh giá |
|----------|----------|
| Tier level | ✅ Tier 2 phù hợp |
| Definition quality | ✅ Dictionary style |
| Example sentences | ✅ Contextual |
| Collocations | ✅ Useful |

**KHÔNG CẦN SỬA**

#### EASY MODE (10 từ)
```
name, friend, desk, chair, pen, bag, toy, picture, box, door
```

| Tiêu chí | Đánh giá |
|----------|----------|
| Tier level | ✅ Tier 1 |
| Definition style | ✅ Kid-friendly |
| Theme coherence | ⚠️ Lỏng lẻo | "toy", "box" không classroom |

**KHUYẾN NGHỊ**: Cân nhắc thay "toy" → "book" nếu muốn focus classroom hơn

---

### 🎤 3. ASK_AI.JS - Ask AI Station

#### ⚠️ VẤN ĐỀ QUAN TRỌNG: CONTEXT QUÁ DÀI

**Current (Bad)**:
```javascript
context_en: "You see a photo. Children go to school. Some walk. Some ride bikes. 
You want to know HOW they go to school. How do you ask?"
// → 4 câu, quá dài cho beginner
```

**Should Be (Good)**:
```javascript
context_en: "Children go to school in different ways. Ask HOW."
// → 2 câu, đủ ngữ cảnh, không lộ câu trả lời
```

#### PHÂN TÍCH 5 PROMPTS HIỆN TẠI:

| ID | Context hiện tại | Vấn đề | Đề xuất sửa |
|----|------------------|--------|-------------|
| 1 | "You see a photo. Children go to school. Some walk. Some ride bikes..." | Quá dài (4 câu) | "Children go to school. Ask HOW they go." |
| 2 | "You see a magnifying glass. It makes things BIG. You want to know WHAT it does..." | OK nhưng dài | "You see a magnifying glass. Ask what it does." |
| 3 | "You are at the library. You see many books. You want to know WHERE..." | OK | "You are at the library. Ask WHERE animal books are." |
| 4 | "Teacher says: write OR draw. You like BOTH. You want to know if you CAN DO BOTH..." | Quá dài | "Teacher says write OR draw. You want both. Ask permission." |
| 5 | "Friends are playing. You want to PLAY with them..." | ✅ Tốt | Giữ nguyên |

**KHUYẾN NGHỊ SỬA**:
```javascript
// Prompt 1 - RÚT GỌN
{
  id: 1,
  context_en: "Children go to school in different ways. Ask HOW.",
  context_vi: "Trẻ em đi học bằng nhiều cách. Hỏi BẰNG CÁCH NÀO.",
  answer: ["How do they go to school?", "How do you go to school?"],
  hint: "How do..."
}

// Prompt 4 - RÚT GỌN  
{
  id: 4,
  context_en: "Teacher says: write OR draw. You want BOTH. Ask permission.",
  context_vi: "Cô nói: viết HOẶC vẽ. Bạn muốn CẢ HAI. Xin phép.",
  answer: ["Can I do both?", "May I do both?"],
  hint: "Can I..."
}
```

---

### 📺 4. DAILY_WATCH.JS - Daily Watch

#### ⚠️ VẤN ĐỀ: VIDEO SEARCH KEYWORDS KHÔNG TỐI ƯU

**Current video_queries.json**:
```json
{
  "query": "subject pronouns I you he she we they",
  "backup_query": "pronouns song kids English"
}
```

**VẤN ĐỀ**:
- Không có "ESL" trong query
- Không có "for kids" hoặc "cartoon"
- Kết quả có thể không phù hợp lứa tuổi

**KHUYẾN NGHỊ SỬA**:
```json
{
  "id": 1,
  "purpose": "GRAMMAR",
  "query": "subject pronouns ESL for kids cartoon",
  "backup_query": "I you he she pronouns song kids"
},
{
  "id": 2,
  "purpose": "GRAMMAR", 
  "query": "verb to be am is are ESL kids song",
  "backup_query": "am is are English grammar cartoon"
}
```

**SEARCH PATTERN CHUẨN**:
```
[topic] + ESL + for kids + cartoon/song
```

#### CURRENT VIDEOS ANALYSIS:
| ID | Title | Channel | Phù hợp? |
|----|-------|---------|----------|
| 1 | Pronouns for Kids | Unknown | ✅ OK |
| 2 | AM - IS - ARE for kids | Unknown | ✅ OK |
| 3 | School Life | Unknown | ✅ OK |
| 4 | School Supplies | Unknown | ✅ OK |
| 5 | Magnifying Glass - Noggin | Known | ✅ Excellent |

**KẾT LUẬN**: Videos OK, nhưng search pattern cần chuẩn hóa cho consistency.

---

### 🧠 5. AI TUTOR - STORY MISSIONS

#### FILE: week_01_real.js

**CẤU TRÚC 3 MISSIONS**:
| Mission | Theme | Target Vocab | Status |
|---------|-------|--------------|--------|
| 1 | First Day at School | name, age, student | ✅ Excellent |
| 2 | What's in Your Backpack? | backpack, book, notebook | ✅ Excellent |
| 3 | My Classroom | teacher, school, classroom | ✅ Excellent |

**ĐIỂM MẠNH**:
- Vocabulary progression rõ ràng giữa 3 missions
- Mission context chi tiết cho AI
- Có conversation_topics và example_questions
- Có success_criteria

**ĐIỂM CẦN CẢI THIỆN**:

1. **nova_greeting có thể ngắn hơn**:
```javascript
// Current:
nova_greeting: "Hello! I am Ms. Nova, your English teacher. What is your name?"

// Suggestion (more natural):
nova_greeting: "Hello! I'm Ms. Nova. What's your name?"
```

2. **Mission context cần thêm guidance về length**:
```javascript
// Add to mission_context:
"Keep responses under 25 words. One question per turn."
```

---

### 📝 6. GRAMMAR.JS - Grammar Station

| Tiêu chí | Đánh giá |
|----------|----------|
| Exercise count | ✅ 20 câu |
| Type variety | ✅ MC + Fill + Unscramble |
| Grammar focus | ✅ Subject Pronouns + Be |

**VẤN ĐỀ**: Thiếu câu phủ định và câu hỏi

**KHUYẾN NGHỊ THÊM**:
```javascript
// Thêm câu phủ định
{ id: 21, type: "fill", question: "She ___ not a teacher. (be)", answer: "is", hint: "She + is + not" },

// Thêm câu hỏi Yes/No
{ id: 22, type: "mc", question: "___ you a student?", options: ["Am", "Is", "Are"], answer: "Are", hint: "You + are" },

// Thêm câu hỏi Wh-
{ id: 23, type: "unscramble", question: "Order:", words: ["is", "What", "your", "name"], answer: "What is your name?", hint: "What + is..." }
```

---

### 🧩 7. LOGIC.JS - Logic Lab

| Tiêu chí | Đánh giá |
|----------|----------|
| Quantity | ✅ 5 puzzles |
| Context | ✅ Full sentences |
| Answer format | ✅ Includes units |
| Variety | ✅ Math + Pattern + Logic |

**ĐIỂM MẠNH**:
- Puzzle 2 (Pattern: star-moon) không cần tính toán
- Puzzle 4 (Tools) connect với Explore

**KHÔNG CẦN SỬA**

---

### 🗺️ 8. MINDMAP.JS - Mindmap Speaking

| Tiêu chí | Đánh giá |
|----------|----------|
| Stem count | ✅ 6 stems |
| Branch count | ✅ 6 per stem |
| Grammar match | ✅ "I am", "My X is" |
| Vocabulary reuse | ✅ Uses week vocab |

**KHÔNG CẦN SỬA** - Đây là file tuân thủ tốt nhất

---

### 🔬 9. EXPLORE.JS - CLIL Explore

| Tiêu chí | Đánh giá |
|----------|----------|
| CLIL integration | ✅ Excellent - Science tools |
| 10 Bold words | ✅ Different from vocab.js |
| Critical thinking Q | ✅ "If you were a scientist..." |
| Connection to theme | ✅ Links to "scientist" aspiration |

**ĐIỂM MẠNH**:
- Kết nối hoàn hảo với read.js ("I want to become a scientist")
- Academic vocabulary: observe, discover, measure
- Non-fiction style đúng chuẩn

**KHÔNG CẦN SỬA** - Đây là best practice

---

### 🎮 10. GAME HUB - (Built-in)

**PHÂN TÍCH CODE GameHub.jsx**:

| Game | Data Source | Status |
|------|-------------|--------|
| Hangman | vocab.js | ✅ Works |
| Spell Bee | vocab.js | ✅ Works |
| Vocab Pop | vocab.js | ✅ Works |

**EXTERNAL GAMES**:
- Arcade World (gamestolearnenglish.com)
- Wordwall Park (wordwall.net)
- Baamboozle
- ESL Games Plus

**KHÔNG CẦN DATA FILE** - Game Hub tự động dùng vocab.js

---

### 🎯 11. SELF REGULATION - (Built-in)

**PHÂN TÍCH CODE SelfRegulation.jsx**:
- Goal setting: 3 goals
- Mood tracking: 4 options
- Reflection journal: Free text

**KHÔNG CẦN DATA FILE** - User-driven content

---

## III. TÓM TẮT VẤN ĐỀ VÀ KHUYẾN NGHỊ

### 🔴 CRITICAL - PHẢI SỬA

| # | Vấn đề | File | Hành động |
|---|--------|------|-----------|
| 1 | Bold words không khớp vocab | read.js | Sửa "books"→"book", "notebooks"→"notebook" |
| 2 | Easy read.js quá dài | read.js (easy) | Rút xuống 6-8 câu |
| 3 | Ask AI context quá dài | ask_ai.js | Rút gọn prompt 1, 2, 4 |

### 🟡 HIGH - NÊN SỬA

| # | Vấn đề | File | Hành động |
|---|--------|------|-----------|
| 4 | Video search pattern | video_queries.json | Thêm "ESL for kids cartoon" |
| 5 | Grammar thiếu negatives | grammar.js | Thêm 3-4 câu phủ định/hỏi |
| 6 | Easy vocab theme loose | vocab.js (easy) | Cân nhắc thay "toy" |

### 🟢 LOW - TÙY CHỌN

| # | Vấn đề | File | Hành động |
|---|--------|------|-----------|
| 7 | Nova greeting formal | week_01_real.js | Có thể ngắn gọn hơn |
| 8 | Read.js thiếu emotion | read.js | Thêm feeling sentences |

---

## IV. ĐỀ XUẤT CODE SỬA CỤ THỂ

### Fix 1: read.js - Bold words match vocab.js

```javascript
// TRƯỚC:
content_en: "...I carry many **books** and **notebooks**..."

// SAU:
content_en: "...I carry my **book** and **notebook** every day..."
```

### Fix 2: ask_ai.js - Rút gọn context

```javascript
export default {
  prompts: [
    {
      id: 1,
      context_en: "Children go to school in different ways. Ask HOW.",
      context_vi: "Trẻ em đi học bằng nhiều cách. Hỏi BẰNG CÁCH NÀO.",
      audio_url: null,
      answer: ["How do they go to school?", "How do you go to school?"],
      hint: "How do..."
    },
    {
      id: 2,
      context_en: "You see a magnifying glass. Ask WHAT it does.",
      context_vi: "Bạn thấy kính lúp. Hỏi NÓ LÀM GÌ.",
      audio_url: null,
      answer: ["What does it do?", "What is it for?"],
      hint: "What does..."
    },
    {
      id: 3,
      context_en: "You are at the library. Ask WHERE animal books are.",
      context_vi: "Bạn ở thư viện. Hỏi SÁCH ĐỘNG VẬT Ở ĐÂU.",
      audio_url: null,
      answer: ["Where are the animal books?", "Where can I find animal books?"],
      hint: "Where are..."
    },
    {
      id: 4,
      context_en: "Teacher says: write OR draw. You want BOTH. Ask permission.",
      context_vi: "Cô nói: viết HOẶC vẽ. Bạn muốn CẢ HAI. Xin phép.",
      audio_url: null,
      answer: ["Can I do both?", "May I do both?"],
      hint: "Can I..."
    },
    {
      id: 5,
      context_en: "Friends are playing. You want to join. Ask permission.",
      context_vi: "Bạn bè đang chơi. Bạn muốn tham gia. Xin phép.",
      audio_url: null,
      answer: ["Can I play?", "Can I play with you?"],
      hint: "Can I..."
    }
  ]
};
```

### Fix 3: video_queries.json - ESL search pattern

```json
{
  "weekId": 1,
  "theme": "The Young Scholar",
  "grammar": "Subject Pronouns, Verb to be",
  "topic": "School day, Student life",
  "science": "Scientist tools",
  "searchPattern": "[topic] ESL for kids cartoon",
  "videos": [
    {
      "id": 1,
      "purpose": "GRAMMAR",
      "query": "subject pronouns ESL for kids cartoon",
      "backup_query": "I you he she pronouns kids song"
    },
    {
      "id": 2,
      "purpose": "GRAMMAR",
      "query": "verb to be am is are ESL kids cartoon",
      "backup_query": "am is are English kids song"
    },
    {
      "id": 3,
      "purpose": "TOPIC",
      "query": "first day school ESL kids cartoon",
      "backup_query": "school day kids English"
    },
    {
      "id": 4,
      "purpose": "VOCABULARY",
      "query": "school supplies ESL for kids cartoon",
      "backup_query": "classroom vocabulary kids English"
    },
    {
      "id": 5,
      "purpose": "SCIENCE",
      "query": "magnifying glass science for kids cartoon",
      "backup_query": "scientist tools kids SciShow"
    }
  ]
}
```

---

## V. ĐIỂM ĐÁNH GIÁ TỔNG THỂ

### Trước khi sửa: **7.8/10**

| Component | Score | Notes |
|-----------|-------|-------|
| read.js | 7/10 | Bold mismatch |
| vocab.js | 9/10 | Good |
| word_power.js | 10/10 | Perfect |
| grammar.js | 8/10 | Needs negatives |
| logic.js | 9/10 | Good |
| ask_ai.js | 6/10 | Context too long |
| explore.js | 10/10 | Excellent CLIL |
| daily_watch.js | 7/10 | Search pattern |
| mindmap.js | 10/10 | Perfect |
| AI Tutor | 9/10 | Well structured |

### Sau khi sửa (dự kiến): **9.2/10**

---

## VI. CHECKLIST CHO MASS PRODUCTION

Khi tạo tuần mới, đảm bảo:

### Content
- [ ] 10 vocab words xuất hiện **bolded** trong read.js (exact match)
- [ ] Ask AI context ngắn (1-2 câu cho Phase 1)
- [ ] Grammar có cả affirmative, negative, và question forms
- [ ] Video queries dùng pattern: `[topic] ESL for kids cartoon`
- [ ] Story missions có 3 themes distinct, vocabulary progression

### Technical
- [ ] Easy mode: 6-8 câu reading
- [ ] Advanced mode: 8-12 câu reading
- [ ] 20 grammar exercises (10 MC + 6 Fill + 4 Unscramble)
- [ ] 5 ask_ai prompts minimum
- [ ] 3-5 daily_watch videos

### AI Tutor
- [ ] 3 story missions với target_vocab riêng
- [ ] mission_context có clear boundaries
- [ ] nova_greeting natural và short
- [ ] objectives.js có 10 objectives + 1 termination

---

**Người phân tích**: Claude AI  
**Thời gian**: 13/01/2026  
**Version**: 2.0 (Complete)
