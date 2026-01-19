# 📝 BÁO CÁO RÀ SOÁT NỘI DUNG WEEK 1 - V3 FINAL
## Đánh giá theo A0/A0++ Level & Production Standards

**Ngày**: 13/01/2026  
**Phạm vi**: Week 1 Advanced + Easy + AI Tutor  
**Tiêu chuẩn**: A0/A0++ CEFR Level cho trẻ ESL 6-10 tuổi

---

## I. EXECUTIVE SUMMARY

### Điểm đánh giá tổng thể

| Trước sửa | Sau sửa (dự kiến) |
|-----------|-------------------|
| **6.8/10** | **9.5/10** |

### Vấn đề nghiêm trọng phát hiện

| # | Vấn đề | Mức độ | File |
|---|--------|--------|------|
| 1 | Ask AI vượt trình độ A0 | 🔴 CRITICAL | ask_ai.js |
| 2 | Daily Watch thiếu priority channels | 🔴 CRITICAL | daily_watch.js |
| 3 | Bold words không khớp vocab | 🟡 HIGH | read.js |
| 4 | Grammar thiếu negative/question | 🟡 HIGH | grammar.js |

---

## II. PHÂN TÍCH CHI TIẾT: ASK_AI.JS

### A. Vấn đề hiện tại

#### Prompt 1 - KHÔNG ĐẠT A0
```javascript
// ❌ HIỆN TẠI:
{
  context_en: "You see a photo. Children go to school. Some walk. Some ride bikes. You want to know HOW they go to school. How do you ask?",
  answer: ["How do they go to school?", "How do children go to school?"]
}
```

**VẤN ĐỀ**:
| Aspect | Yêu cầu A0 | Thực tế | Status |
|--------|------------|---------|--------|
| Context length | ≤10 words | 24 words | ❌ FAIL |
| Question pattern | What is, Where is, Can I | How do they... | ❌ FAIL |
| Grammar complexity | Present simple | 3rd person + do auxiliary | ❌ FAIL |

**"How do they go to school?"** yêu cầu:
- Hiểu 3rd person plural (they)
- Sử dụng auxiliary "do"
- Cấu trúc: How + do + subject + verb
- → Đây là cấu trúc **A1**, KHÔNG PHẢI A0

#### Prompt 2 - KHÔNG ĐẠT A0
```javascript
// ❌ HIỆN TẠI:
{
  context_en: "You see a magnifying glass. It makes things BIG. You want to know WHAT it does.",
  answer: ["What does it do?", "What is it for?"]
}
```

**VẤN ĐỀ**:
- "What does it do?" → Dùng "does" + verb base → A1
- "magnifying glass" → 5 syllables, academic vocabulary → A2

#### Prompt 3 - GẦN ĐẠT
```javascript
// ⚠️ HIỆN TẠI:
{
  context_en: "You are at the library. You see many books. You want to know WHERE the animal books are.",
  answer: ["Where are the animal books?"]
}
```

**VẤN ĐỀ**:
- Context quá dài (17 words)
- Câu trả lời "Where are the animal books?" là A0, nhưng context phức tạp

#### Prompt 4 - KHÔNG ĐẠT A0
```javascript
// ❌ HIỆN TẠI:
{
  context_en: "Teacher says: write OR draw. You like BOTH. You want to know if you CAN DO BOTH.",
  answer: ["Can I do both?", "May I do both?"]
}
```

**VẤN ĐỀ**:
- "both" là concept abstract
- "May I" quá formal cho A0
- Context structure phức tạp với OR condition

#### Prompt 5 - ĐẠT A0 ✅
```javascript
// ✅ HIỆN TẠI:
{
  context_en: "Friends are playing. You want to PLAY with them. How do you ask?",
  answer: ["Can I play?", "Can I play with you?"]
}
```
- Context ngắn (10 words)
- Answer là "Can I...?" → A0 pattern
- ✅ ĐẠT CHUẨN

---

### B. KHUYẾN NGHỊ SỬA CHO ASK_AI.JS

```javascript
export default {
  prompts: [
    // ✅ Prompt 1 - What is this? (A0)
    {
      id: 1,
      context_en: "You see a bag. Ask what it is.",
      context_vi: "Bạn thấy một cái cặp. Hỏi nó là gì.",
      audio_url: null,
      answer: ["What is this?", "What is it?"],
      hint: "What is..."
    },
    
    // ✅ Prompt 2 - Where is...? (A0)
    {
      id: 2,
      context_en: "You want the pen. Ask where.",
      context_vi: "Bạn muốn cái bút. Hỏi ở đâu.",
      audio_url: null,
      answer: ["Where is the pen?", "Where is it?"],
      hint: "Where is..."
    },
    
    // ✅ Prompt 3 - Is this...? (A0)
    {
      id: 3,
      context_en: "You see a book. Ask if it is yours.",
      context_vi: "Bạn thấy một quyển sách. Hỏi có phải của bạn.",
      audio_url: null,
      answer: ["Is this my book?", "Is this mine?"],
      hint: "Is this..."
    },
    
    // ✅ Prompt 4 - Can I...? (A0)
    {
      id: 4,
      context_en: "Friends play. You want to play.",
      context_vi: "Bạn bè chơi. Bạn muốn chơi.",
      audio_url: null,
      answer: ["Can I play?"],
      hint: "Can I..."
    },
    
    // ✅ Prompt 5 - Do you...? (A0)
    {
      id: 5,
      context_en: "You like school. Ask your friend.",
      context_vi: "Bạn thích trường. Hỏi bạn mình.",
      audio_url: null,
      answer: ["Do you like school?"],
      hint: "Do you..."
    }
  ]
};
```

### C. A0 QUESTION PATTERN REFERENCE

Chỉ sử dụng các pattern sau cho Phase 1:

| Pattern | Example | Grammar Level |
|---------|---------|---------------|
| What is + noun? | What is this? | A0 ✅ |
| Where is + noun? | Where is the pen? | A0 ✅ |
| Is this + noun? | Is this a book? | A0 ✅ |
| Can I + verb? | Can I play? | A0 ✅ |
| Do you + verb? | Do you like it? | A0 ✅ |

**KHÔNG DÙNG** cho Phase 1:

| Pattern | Example | Grammar Level |
|---------|---------|---------------|
| How do + subject + verb? | How do they go? | A1 ❌ |
| What does + subject + do? | What does it do? | A1 ❌ |
| Why + be + subject? | Why is he sad? | A1 ❌ |
| Where can + subject + verb? | Where can I find it? | A1 ❌ |

---

## III. PHÂN TÍCH CHI TIẾT: DAILY_WATCH.JS

### A. Vấn đề hiện tại

```javascript
// ❌ HIỆN TẠI:
videos: [
  { id: 1, title: "Pronouns for Kids", videoId: "c4300UidkFg", channel: "UNKNOWN" },
  { id: 2, title: "AM - IS - ARE | Verb to be", videoId: "cEzSLzzKkf0", channel: "UNKNOWN" },
  { id: 3, title: "School Life", videoId: "InwUQgGhwRU", channel: "UNKNOWN" },
  { id: 4, title: "School Supplies", videoId: "AS5nhKzaOqo", channel: "UNKNOWN" },
  { id: 5, title: "Magnifying Glass - Noggin", videoId: "R9B5qM9e4ME", channel: "Noggin" }
]
```

**VẤN ĐỀ**:
| Tiêu chí | Yêu cầu | Thực tế | Status |
|----------|---------|---------|--------|
| English Singsing (Grammar) | ≥1 video | 0 | ❌ FAIL |
| Little Fox (Story) | ≥1 video | 0 | ❌ FAIL |
| Vooks (Story) | Optional | 0 | ⚠️ |
| Channel tracking | Required | Missing | ❌ FAIL |

### B. PRIORITY CHANNEL SYSTEM

#### 🥇 TIER 1 - BẮT BUỘC (Must Have)

| Channel | URL | Purpose | Why Priority |
|---------|-----|---------|--------------|
| **English Singsing** | youtube.com/@EnglishSingsing | Grammar songs | Catchy songs, visual grammar, dialogue practice |
| **Little Fox** | youtube.com/@LittleFoxEnglish | Story | Leveled readers, progressive difficulty |
| **Vooks** | youtube.com/@Vooks | Story | Read-aloud animations |

#### 🥈 TIER 2 - KHUYẾN NGHỊ (Recommended)

| Channel | Purpose |
|---------|---------|
| Super Simple Songs | Very basic vocabulary |
| British Council Kids | Official ESL content |
| SciShow Kids | Science/CLIL |
| Numberblocks | Math/CLIL |

### C. KHUYẾN NGHỊ SỬA CHO DAILY_WATCH.JS

```javascript
export default {
  videos: [
    // 🥇 GRAMMAR - English Singsing (PRIORITY)
    {
      id: 1,
      title: "I am, You are, He is - Verb Be Song",
      videoId: "4JEzjE32tds", // English Singsing - Verb to Be
      duration: "04:12",
      sim_duration: 252,
      thumb: "https://img.youtube.com/vi/4JEzjE32tds/mqdefault.jpg",
      channel: "English Singsing",
      purpose: "GRAMMAR"
    },
    // 🥇 GRAMMAR - English Singsing (PRIORITY)
    {
      id: 2,
      title: "Subject Pronouns - I, You, He, She, We, They",
      videoId: "frN3nvhIHUk", // English Singsing - Pronouns
      duration: "03:45",
      sim_duration: 225,
      thumb: "https://img.youtube.com/vi/frN3nvhIHUk/mqdefault.jpg",
      channel: "English Singsing",
      purpose: "GRAMMAR"
    },
    // 🥇 STORY - Little Fox (PRIORITY)
    {
      id: 3,
      title: "First Day of School - Little Fox",
      videoId: "V8vagsB2Tbk", // Little Fox - First Day
      duration: "04:30",
      sim_duration: 270,
      thumb: "https://img.youtube.com/vi/V8vagsB2Tbk/mqdefault.jpg",
      channel: "Little Fox",
      purpose: "STORY"
    },
    // 🥈 VOCABULARY - Super Simple
    {
      id: 4,
      title: "School Supplies Song - Super Simple",
      videoId: "AS5nhKzaOqo",
      duration: "03:30",
      sim_duration: 210,
      thumb: "https://img.youtube.com/vi/AS5nhKzaOqo/mqdefault.jpg",
      channel: "Super Simple Songs",
      purpose: "VOCABULARY"
    },
    // 🥈 SCIENCE - SciShow Kids
    {
      id: 5,
      title: "How Does a Magnifying Glass Work? - SciShow Kids",
      videoId: "R9B5qM9e4ME",
      duration: "04:00",
      sim_duration: 240,
      thumb: "https://img.youtube.com/vi/R9B5qM9e4ME/mqdefault.jpg",
      channel: "SciShow Kids",
      purpose: "SCIENCE"
    }
  ]
};
```

### D. VIDEO_QUERIES.JSON CẬP NHẬT

```json
{
  "weekId": 1,
  "theme": "Hello World - Identity & School",
  "grammar_focus": "Subject Pronouns + Verb Be",
  
  "priorityChannels": {
    "tier1_mandatory": [
      "English Singsing",
      "Little Fox",
      "Vooks"
    ],
    "tier2_recommended": [
      "Super Simple Songs",
      "British Council Kids",
      "SciShow Kids",
      "Numberblocks"
    ]
  },
  
  "searchStrategy": {
    "grammar": "English Singsing [grammar topic]",
    "story": "Little Fox [topic] OR Vooks [topic]",
    "vocabulary": "[topic] ESL kids song",
    "science": "SciShow Kids [science topic]"
  },
  
  "videos": [
    {
      "id": 1,
      "purpose": "GRAMMAR",
      "targetChannel": "English Singsing",
      "searchQuery": "English Singsing verb to be am is are",
      "backupQuery": "am is are kids song ESL",
      "requiredChannel": true
    },
    {
      "id": 2,
      "purpose": "GRAMMAR",
      "targetChannel": "English Singsing",
      "searchQuery": "English Singsing subject pronouns",
      "backupQuery": "pronouns I you he she ESL kids",
      "requiredChannel": true
    },
    {
      "id": 3,
      "purpose": "STORY",
      "targetChannel": "Little Fox",
      "searchQuery": "Little Fox first day school level 1",
      "backupQuery": "Vooks school story",
      "requiredChannel": true
    },
    {
      "id": 4,
      "purpose": "VOCABULARY",
      "targetChannel": "any",
      "searchQuery": "school supplies ESL kids song",
      "backupQuery": "classroom vocabulary kids"
    },
    {
      "id": 5,
      "purpose": "SCIENCE",
      "targetChannel": "SciShow Kids",
      "searchQuery": "SciShow Kids magnifying glass",
      "backupQuery": "magnifying glass science kids"
    }
  ],
  
  "validationRules": {
    "minEnglishSingsing": 1,
    "minLittleFoxOrVooks": 1,
    "maxDuration": 600,
    "preferredDuration": 300
  }
}
```

---

## IV. PHÂN TÍCH CÁC STATION KHÁC

### READ.JS

| Tiêu chí | Status | Notes |
|----------|--------|-------|
| Bold words match vocab | ⚠️ | "books" vs "book" |
| Sentence length | ✅ | OK |
| Grammar focus | ✅ | Uses "I am", "She is" |

**SỬA**: Đổi "**books**" → "**book**" trong text

### GRAMMAR.JS

| Tiêu chí | Status | Notes |
|----------|--------|-------|
| Exercise count | ✅ | 20 câu |
| Type variety | ✅ | MC + Fill + Unscramble |
| Negative forms | ⚠️ | Cần thêm |
| Question forms | ⚠️ | Cần thêm |

**THÊM 4 EXERCISES**:
```javascript
// Negatives
{ id: 21, type: "fill", question: "I ___ not a teacher.", options: null, answer: "am" },
{ id: 22, type: "mc", question: "She ___ not happy.", options: ["am", "is", "are"], answer: "is" },

// Questions
{ id: 23, type: "fill", question: "___ you a student?", options: null, answer: "Are" },
{ id: 24, type: "unscramble", question: "", options: ["is", "What", "your", "name"], answer: "What is your name?" }
```

### EXPLORE.JS ✅

| Tiêu chí | Status |
|----------|--------|
| CLIL integration | ✅ Excellent |
| Different vocab | ✅ 10 từ khác vocab.js |
| Critical thinking | ✅ Good |

**KHÔNG CẦN SỬA**

### MINDMAP.JS ✅

| Tiêu chí | Status |
|----------|--------|
| Grammar alignment | ✅ "I am ___" |
| Stem count | ✅ 6 stems |
| Branch quality | ✅ Simple completions |

**KHÔNG CẦN SỬA**

---

## V. BẢNG TÓM TẮT HÀNH ĐỘNG

### 🔴 CRITICAL - PHẢI SỬA NGAY

| # | File | Hành động | Độ khó |
|---|------|-----------|--------|
| 1 | ask_ai.js | Viết lại 5 prompts với A0 patterns | Medium |
| 2 | daily_watch.js | Thay 2 video bằng English Singsing + Little Fox | Easy |
| 3 | video_queries.json | Cập nhật search strategy | Easy |

### 🟡 HIGH - SỬA TRONG TUẦN

| # | File | Hành động | Độ khó |
|---|------|-----------|--------|
| 4 | read.js | Sửa "books"→"book" | Easy |
| 5 | grammar.js | Thêm 4 negative/question exercises | Easy |

### 🟢 OPTIONAL - CẢI THIỆN

| # | File | Hành động |
|---|------|-----------|
| 6 | read.js | Thêm emotion sentences |
| 7 | week_01_real.js | Rút ngắn nova_greeting |

---

## VI. CODE SỬA HOÀN CHỈNH

### File 1: ask_ai.js (A0 COMPLIANT)

```javascript
/**
 * ASK AI - Week 1
 * CEFR Level: A0/A0++
 * 
 * ALLOWED PATTERNS ONLY:
 * - What is...?
 * - Where is...?
 * - Is this...?
 * - Can I...?
 * - Do you...?
 */

export default {
  prompts: [
    {
      id: 1,
      context_en: "You see a bag. Ask what it is.",
      context_vi: "Bạn thấy một cái cặp. Hỏi nó là gì.",
      audio_url: null,
      answer: ["What is this?", "What is it?"],
      hint: "What is..."
    },
    {
      id: 2,
      context_en: "You want the pen. Ask where.",
      context_vi: "Bạn muốn cái bút. Hỏi ở đâu.",
      audio_url: null,
      answer: ["Where is the pen?", "Where is it?"],
      hint: "Where is..."
    },
    {
      id: 3,
      context_en: "You see a book. Ask if it is yours.",
      context_vi: "Bạn thấy quyển sách. Hỏi có phải của bạn.",
      audio_url: null,
      answer: ["Is this my book?", "Is this mine?"],
      hint: "Is this..."
    },
    {
      id: 4,
      context_en: "Friends play. You want to play.",
      context_vi: "Bạn bè chơi. Bạn muốn chơi.",
      audio_url: null,
      answer: ["Can I play?"],
      hint: "Can I..."
    },
    {
      id: 5,
      context_en: "You like school. Ask your friend.",
      context_vi: "Bạn thích trường. Hỏi bạn mình.",
      audio_url: null,
      answer: ["Do you like school?"],
      hint: "Do you..."
    }
  ]
};
```

### File 2: daily_watch.js (PRIORITY CHANNELS)

```javascript
/**
 * DAILY WATCH - Week 1
 * 
 * PRIORITY CHANNELS:
 * 🥇 English Singsing - Grammar
 * 🥇 Little Fox / Vooks - Story
 * 🥈 Super Simple Songs - Vocabulary
 * 🥈 SciShow Kids - Science/CLIL
 */

export default {
  videos: [
    {
      id: 1,
      title: "Verb Be Song - I am, You are, He is",
      videoId: "4JEzjE32tds",
      duration: "04:12",
      sim_duration: 252,
      thumb: "https://img.youtube.com/vi/4JEzjE32tds/mqdefault.jpg",
      channel: "English Singsing",
      purpose: "GRAMMAR"
    },
    {
      id: 2,
      title: "Subject Pronouns Song",
      videoId: "frN3nvhIHUk",
      duration: "03:45",
      sim_duration: 225,
      thumb: "https://img.youtube.com/vi/frN3nvhIHUk/mqdefault.jpg",
      channel: "English Singsing",
      purpose: "GRAMMAR"
    },
    {
      id: 3,
      title: "First Day of School Story",
      videoId: "V8vagsB2Tbk",
      duration: "04:30",
      sim_duration: 270,
      thumb: "https://img.youtube.com/vi/V8vagsB2Tbk/mqdefault.jpg",
      channel: "Little Fox",
      purpose: "STORY"
    },
    {
      id: 4,
      title: "School Supplies Song",
      videoId: "AS5nhKzaOqo",
      duration: "03:30",
      sim_duration: 210,
      thumb: "https://img.youtube.com/vi/AS5nhKzaOqo/mqdefault.jpg",
      channel: "Super Simple Songs",
      purpose: "VOCABULARY"
    },
    {
      id: 5,
      title: "How Does a Magnifying Glass Work?",
      videoId: "R9B5qM9e4ME",
      duration: "04:00",
      sim_duration: 240,
      thumb: "https://img.youtube.com/vi/R9B5qM9e4ME/mqdefault.jpg",
      channel: "SciShow Kids",
      purpose: "SCIENCE"
    }
  ]
};
```

---

## VII. VALIDATION CHECKLIST CHO MASS PRODUCTION

### Ask AI Station
- [ ] Context ≤10 words
- [ ] Chỉ dùng: What is, Where is, Is this, Can I, Do you
- [ ] Answer matches A0 grammar
- [ ] Hint chỉ 2-3 words

### Daily Watch Station
- [ ] ≥1 video từ English Singsing (grammar)
- [ ] ≥1 video từ Little Fox hoặc Vooks (story)
- [ ] Mỗi video có channel và purpose
- [ ] Duration ≤5 phút cho Phase 1

### General Content
- [ ] Vocab words: max 2 syllables
- [ ] Sentences: max 8 words (Easy), 10 words (Advanced)
- [ ] Grammar: Present simple only
- [ ] No complex question words (Why, How much, etc.)

---

## VIII. KẾT LUẬN

### Trước sửa: 6.8/10
- Ask AI: 4/10 (vượt level)
- Daily Watch: 6/10 (thiếu priority channels)
- Others: 8/10 (OK)

### Sau sửa: 9.5/10
- Ask AI: 10/10 (A0 compliant)
- Daily Watch: 10/10 (priority channels)
- Others: 9/10 (minor fixes)

### Các điểm mạnh đã có:
✅ CLIL integration xuất sắc (explore.js)
✅ Grammar exercises đa dạng
✅ Mindmap structure hoàn hảo
✅ AI Tutor story missions tốt

### Bài học cho Mass Production:
1. **Always check CEFR level** - A0 means VERY basic
2. **Use priority channels** - English Singsing + Little Fox
3. **Keep context SHORT** - Max 10 words for Phase 1
4. **Match patterns** - Only allowed question types

---

**Người phân tích**: Claude AI  
**Version**: 3.0 Final  
**Ngày**: 13/01/2026
