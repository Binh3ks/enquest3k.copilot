# CHÍNH XÁC - CẦN TẠO GÌ CHO WEEK 5

## Week 4 Thực Tế (Golden Standard)

### Part 1: Stations (14 files) - `src/data/weeks/week_04/`
```
ask_ai.js          (44 lines)
daily_watch.js     (9 lines)
dictation.js       (18 lines) - Copy từ read.js, use meaning:
explore.js         (37 lines)
grammar.js         (38 lines)
index.js           (46 lines)
logic.js           (49 lines)
mindmap.js         (62 lines)
read.js            (36 lines)
shadowing.js       (20 lines) - Copy từ read.js, use vi: + audio_full
video_queries.json (11 lines)
vocab.js           (114 lines)
word_power.js      (40 lines) - NO audio fields
writing.js         (10 lines)
```

### Part 2: AI Tutor (1 file) - `src/data/weeks/week_04_real.js`
```javascript
const week4RealData = {
  week_id: 4,
  title: "Week 4: My Happy Jar",
  target_vocab: [
    // 10 words with pronunciation, definition_vi, definition_en, example
  ],
  story_missions: [
    // 3 missions
    {
      mission_id: 1,
      objectives: [
        // 9-11 objectives
        {
          question_variants: [ // 3 variants per objective
            { question: "...", hints: [...] }
          ],
          target_keywords: [...],
          // ...
        }
      ],
      minimum_turns: 15,
      maximum_turns: 20
    }
  ]
};
export default week4RealData;
```
**Size**: 1099 lines

### Part 3: Easy Mode (14 files) - `src/data/weeks_easy/week_04/` (chưa có?)
- Cần kiểm tra xem có folder này không

---

## CẦN TẠO CHO WEEK 5

### 1. Advanced Stations - `src/data/weeks/week_05/` (14 files)
```
week_05/
├── vocab.js           ← 10 words from spec, audio_word only
├── read.js            ← Story 150-200 words, split into sentences
├── grammar.js         ← 20 exercises on Articles A/An
├── dictation.js       ← From read.js, use meaning: key
├── shadowing.js       ← From read.js, use vi: + audio_full
├── writing.js         ← Writing prompt
├── ask_ai.js          ← 5 prompts
├── logic.js           ← 5 problems
├── explore.js         ← Exploration content
├── word_power.js      ← 3 items, NO audio, words array
├── mindmap.js         ← 6 stems × 6 branches
├── daily_watch.js     ← 5 video slots (empty)
├── index.js           ← Import all, export weekData
└── video_queries.json ← 5 search queries
```

### 2. AI Tutor Data - `src/data/weeks/week_05_real.js` (1 file, ~1100 lines)
```javascript
const week5RealData = {
  week_id: 5,
  title: "Week 5: The Mystery House",
  target_vocab: [
    {
      word: "bedroom",
      pronunciation: "/ˈbed.ruːm/",
      definition_vi: "phòng ngủ",
      definition_en: "a room for sleeping",
      example: "This is a bedroom.",
      syllabus_context: "Rooms"
    },
    // ... 9 more words
  ],
  global_vocab: ["bedroom", "kitchen", "bathroom", ...],
  
  story_missions: [
    {
      mission_id: 1,
      title: "Exploring My House",
      title_vi: "Khám phá Ngôi nhà",
      theme: "Rooms",
      
      nova_greeting: "Hi! Let's explore your house together!",
      
      mission_context: `Week 5 Mission 1 - Room Exploration. STUDENT: 6-12 years, A0++ level. LANGUAGE: Simple, max 8 words/sentence. OPEN-ENDED questions. GRAMMAR: Articles A/An. VOCAB: bedroom, kitchen, bathroom, living room, bed, chair, table. ENCOURAGE: Student questions every 3-4 turns.`,
      
      target_vocab: ["bedroom", "kitchen", "bathroom", "living room", "bed", "chair"],
      
      grammar_pattern: "A/An [noun]",
      
      objectives: [
        {
          stepKey: "house_has_rooms",
          category: "Rooms",
          question_variants: [
            {
              question: "What rooms are in your house?",
              hints: ["My", "house", "has", "a", "bedroom", "and", "kitchen"]
            },
            {
              question: "Tell me about your house.",
              hints: ["has", "It", "a", "living", "room", "and", "bathroom"]
            },
            {
              question: "What does your house have?",
              hints: ["has", "My", "house", "rooms", "many"]
            }
          ],
          target_keywords: ["bedroom", "kitchen", "bathroom", "living room", "has"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: [
            "Your house has a {room}!",
            "A {room} is in your house!"
          ],
          success_criteria: "Student names rooms"
        },
        {
          stepKey: "student_question_1",
          category: "Student Inquiry",
          type: "invitation",
          question_variants: [
            { question: "Do you have a question for me?", hints: [] },
            { question: "What do you want to ask me?", hints: [] }
          ],
          target_keywords: ["question", "ask", "yes", "no"],
          ack_options: ["Great question!"],
          success_criteria: "Student asks or declines",
          allow_skip: true
        },
        // ... 7-9 more objectives (total 9-11)
        {
          stepKey: "goodbye",
          category: "Closing",
          type: "termination",
          goodbye_en: "Great job! You told me about your house! Bye!",
          goodbye_vi: "Tuyệt lắm! Bạn đã kể về ngôi nhà! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 15
    },
    // Mission 2 (10 objectives)
    // Mission 3 (11 objectives)
  ]
};

export default week5RealData;
```

### 3. Easy Mode Stations - `src/data/weeks_easy/week_05/` (14 files)
```
week_05_easy/
├── vocab.js           ← Same structure, simpler examples
├── read.js            ← Shorter story 60-80 words
├── grammar.js         ← 15 exercises (vs 20)
├── dictation.js       ← Fewer sentences (~10 vs 14)
├── shadowing.js       ← Same as dictation
├── writing.js         ← Simpler prompt
├── ask_ai.js          ← 5 prompts (same)
├── logic.js           ← 5 simpler problems
├── explore.js         ← Simpler content
├── word_power.js      ← 3 items (same)
├── mindmap.js         ← 6 stems × 6 branches (same)
├── daily_watch.js     ← 5 videos (same)
├── index.js           ← Import all
└── video_queries.json ← Same queries
```

---

## TỔNG KẾT

### Week 5 cần tạo:
- **28 station files** (14 Advanced + 14 Easy)
- **1 AI Tutor file** (~1100 lines với 3 missions)
- **Total**: 29 files

### Các files RIÊNG BIỆT:
1. **Stations** (week_05/ + week_05_easy/) - Nội dung học cho các tabs (Vocab, Read, Grammar, etc.)
2. **AI Tutor** (week_05_real.js) - Data cho Story Mission tab (conversations với Ms. Nova)

### AI Tutor KHÔNG NẰM trong folder week_05/
- AI Tutor = `src/data/weeks/week_05_real.js` (file riêng, cùng level với folder)
- Stations = `src/data/weeks/week_05/` (folder với 14 files)

---

## QUY TRÌNH ĐÚNG

### Step 1: Generate Spec với CẢ HAI parts
```json
{
  "stations": {
    "format": "station_files",
    "count": 14,
    "required_files": [...]
  },
  "story_missions": {
    "format": "question_variants",
    "count": 3,
    "objectives_distribution": [9, 10, 11]
  }
}
```

### Step 2: Generate Content
- **Advanced Stations**: 14 files in week_05/
- **Easy Stations**: 14 files in week_05_easy/
- **AI Tutor**: 1 file week_05_real.js

### Step 3: Generate Assets
- Audio: 138 Advanced, 116 Easy
- Images: 15 files
- Videos: 5 videos

---

**Xin lỗi đã hiểu sai! Bây giờ tôi hiểu rõ:**
- Week 4 có 14 station files + 1 AI Tutor file (~1100 lines)
- Week 5 cần tạo TƯƠNG TỰ
- AI Tutor là file RIÊNG, không nằm trong folder stations
- Spec cần CÓ CẢ story_missions VÀ stations
