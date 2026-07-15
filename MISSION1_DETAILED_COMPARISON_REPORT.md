# 🔍 MISSION 1 - DETAILED COMPARISON REPORT

**Focus:** Mission 1 của mỗi tuần  
**Golden Standard:** Week 2 Mission 1 - "Meet My Family"  
**Date:** February 2, 2026

---

## 📊 EXECUTIVE SUMMARY

Sau khi phân tích chi tiết **Mission 1** của tất cả các tuần (2-7), đây là kết luận:

🏆 **Week 2 Mission 1 là HOÀN THIỆN NHẤT** với:
- mission_context dài nhất (600+ lines)
- Chi tiết nhất về rules, examples, forbidden questions
- 4 phases story_arc hoàn chỉnh
- Exact hints cho từng question

⚠️ **Week 3 Mission 1 là BẤT THƯỜNG** - KHÔNG có cấu trúc mission đầy đủ, chỉ có:
```javascript
{
  mission_id: 1,
  title: "Looking in the Mirror",
  context_en: "...",
  target_vocab: [...],
  learning_focus: "..."
}
```
❌ THIẾU: mission_context, story_arc, story_character, opening_narrative, minimum/maximum_turns

✅ **Week 4, 5, 6, 7 có cấu trúc tương tự nhau** nhưng:
- mission_context ngắn hơn Week 2 (~100-200 lines vs 600+ lines)
- Thiếu chi tiết về forbidden questions, placeholder examples

---

## 📋 SO SÁNH CHI TIẾT TỪNG TUẦN

### **WEEK 2 - MISSION 1: "Meet My Family"** 🏆

#### **Cấu trúc hoàn chỉnh:**
```javascript
{
  mission_id: 1,
  title: "Meet My Family",
  title_en: "Meet My Family",
  title_vi: "Gặp Gỡ Gia Đình Tôi",
  theme: "Introducing Family Members",
  
  nova_greeting: "...",
  default_hints: [...],
  
  // 🔥 600+ LINES chi tiết
  mission_context: `
    🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
    🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER EVER ASK THESE
    🚨 USING {student_answer} PLACEHOLDER CORRECTLY (300 lines examples)
    🚨 HANDLING SHORT STUDENT ANSWERS (100 lines examples)
    🚨 HINTS GENERATION (CRITICAL!) (200 lines với exact hints)
    🎯 EXACT HINTS FOR EACH PHASE QUESTION (Q1-Q20 chi tiết)
  `,
  
  target_vocab: ["mother", "father", ...],
  grammar_pattern: "My [family member] is [adjective].",
  
  story_character: {
    name: "Ms. Nova",
    personality: "warm, curious about families, encouraging",
    backstory: "I love learning about different families!...",
    speaking_style: "asks about family members one by one...",
    facts: [
      "I think families are wonderful teams!",
      "Every family member is important!",
      ...
    ],
    role: "Family conversation guide"
  },
  
  opening_narrative: "🏠 Hi! I'm Ms. Nova! I want to learn about YOUR family!...",
  
  // 🔥 4 PHASES ĐẦY ĐỦ
  story_arc: [
    {
      phase: "intro",
      turns: "1-5",
      phase_name: "Family Members Introduction",
      focus: "Name family members and start describing",
      phase_questions: [
        {
          template: "(After student says who they live with) Great! Tell me about your mother! What is your mother like? Say: My mother is kind OR...",
          hints: ["My", "mother", "is", "kind", "nice", "beautiful"]
        },
        // ... 4 more questions with detailed templates
      ]
    },
    {
      phase: "family_details",
      turns: "6-11",
      phase_name: "Family Characteristics",
      focus: "Describe family personality and relationships",
      phase_questions: [
        // 6 detailed questions
      ]
    },
    {
      phase: "family_love",
      turns: "12-17",
      phase_name: "Family Love and Togetherness",
      focus: "Express feelings about family",
      phase_questions: [
        // 6 detailed questions
      ]
    },
    {
      phase: "closing",
      turns: "18-20",
      phase_name: "Celebration and Gratitude",
      focus: "Wrap up with appreciation for family",
      phase_questions: [
        // 3 detailed questions
      ]
    }
  ],
  
  minimum_turns: 15,
  maximum_turns: 20
}
```

#### **Điểm mạnh:**
✅ mission_context CỰC KỲ CHI TIẾT (600+ lines)  
✅ 4 phases story_arc với natural flow  
✅ Exact hints cho từng question (Q1-Q20)  
✅ Forbidden questions list đầy đủ  
✅ {student_answer} placeholder với 20+ examples  
✅ Short answer handling với examples  
✅ story_character với personality, backstory, facts, role  
✅ opening_narrative với emoji và scaffolding  
✅ minimum/maximum_turns  

#### **File size:**
- Total lines: **1816 lines**
- Mission 1: Lines 132-600 (~**470 lines**)

---

### **WEEK 3 - MISSION 1: "Looking in the Mirror"** ❌

#### **Cấu trúc BẤT THƯỜNG:**
```javascript
{
  mission_id: 1,
  title: "Looking in the Mirror",
  title_en: "Looking in the Mirror",
  title_vi: "Nhìn Vào Gương",
  context_en: "Ms. Nova asks you to look in a mirror and describe what you see.",
  context_vi: "Cô Nova yêu cầu bạn nhìn vào gương và miêu tả những gì bạn thấy.",
  target_vocab: ["tall", "short", "hair", "eyes", "face", "smile"],
  learning_focus: "Use 'I am' for qualities and 'I have' for features"
}
```

#### **VẤN ĐỀ:**
❌ **KHÔNG CÓ mission_context**  
❌ **KHÔNG CÓ story_arc**  
❌ **KHÔNG CÓ story_character**  
❌ **KHÔNG CÓ opening_narrative**  
❌ **KHÔNG CÓ nova_greeting**  
❌ **KHÔNG CÓ default_hints**  
❌ **KHÔNG CÓ minimum/maximum_turns**  
❌ **KHÔNG CÓ grammar_pattern**  

#### **Lý do:**
- Mission 1 của Week 3 **CHỈ LÀ PLACEHOLDER** - định nghĩa concept, không phải implementation
- **Mission 2 và Mission 3** của Week 3 mới có full structure (story_arc, story_character, etc.)

#### **So sánh với Mission 2 của Week 3:**
```javascript
// Week 3 - Mission 2 ("Guess My Friend") - CÓ ĐẦY ĐỦ:
{
  mission_id: 2,
  title: "Guess My Friend",
  
  nova_greeting: "...",
  default_hints: [...],
  mission_context: `... (50 lines)`,
  
  story_character: { ... },
  opening_narrative: "...",
  
  story_arc: [
    { phase: "intro", turns: "1-5", phase_questions: [...] },
    { phase: "middle", turns: "6-11", phase_questions: [...] },
    { phase: "more_practice", turns: "12-16", phase_questions: [...] },
    { phase: "closing", turns: "17-20", phase_questions: [...] }
  ],
  
  minimum_turns: 15,
  maximum_turns: 20
}
```

#### **Kết luận về Week 3 Mission 1:**
🚨 **Week 3 Mission 1 là INCOMPLETE** - Cần implement đầy đủ như Mission 2, Mission 3

---

### **WEEK 4 - MISSION 1: "The Happy Jar"** ✅

#### **Cấu trúc:**
```javascript
{
  mission_id: 1,
  title: "The Happy Jar",
  title_vi: "Lọ Hạnh Phúc",
  theme: "Emotions & Preferences",
  
  story_character: {
    name: "Ms. Nova",
    personality: "Cheerful, loves collecting happy moments...",
    backstory: "Ms. Nova has a special jar...",
    speaking_style: "Warm, enthusiastic about emotions...",
    facts: {
      has_happy_jar: true,
      jar_color: "blue",
      favorite_activity: "drawing",
      ...
    }
  },
  
  opening_narrative: "Hi! I'm Ms. Nova! 🌟 Look at my Happy Jar!...",
  
  // 🔥 ~150 LINES
  mission_context: `
    STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level.
    LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence.
    ONLY ask about ACTIVITIES using "I like + V-ing" pattern.
    STRICT FOCUS: ACTIVITIES WITH "I LIKE + V-ING" ONLY
    FORBIDDEN: Do NOT ask "What color...?", "Is it big?", ...
    ONLY allowed questions: "What do you like doing?", ...
  `,
  
  target_vocab: ["happy", "excited", "playing", "reading", "drawing", "singing"],
  grammar_pattern: "I like [verb]-ing",
  
  // 🔥 4 PHASES ĐẦY ĐỦ
  story_arc: [
    { phase: "introduction", turns: "1-5", goal: "...", phase_questions: [...] },
    { phase: "discovering_likes", turns: "6-12", goal: "...", phase_questions: [...] },
    { phase: "filling_jar", turns: "13-17", goal: "...", phase_questions: [...] },
    { phase: "conclusion", turns: "18-20", goal: "...", phase_questions: [...] }
  ],
  
  minimum_turns: 15,
  maximum_turns: 20,
  
  objectives: [
    {
      stepKey: "student_name",
      category: "Identity",
      question_variants: [...],
      target_keywords: [...],
      ack_options: [...],
      recast_templates: [...],
      success_criteria: "..."
    },
    // ... more objectives
  ]
}
```

#### **So sánh với Week 2:**
| Feature | Week 2 | Week 4 | Status |
|---------|--------|--------|--------|
| mission_context detail | 600+ lines | ~150 lines | ⚠️ Ngắn hơn |
| Forbidden questions list | ✅ Chi tiết | ✅ Có nhưng ngắn | ⚠️ |
| {student_answer} examples | ✅ 20+ examples | ❌ Không có | ❌ |
| Short answer handling | ✅ Chi tiết | ❌ Không có | ❌ |
| Hints generation guide | ✅ 200 lines | ❌ Không có | ❌ |
| Exact hints for each Q | ✅ Q1-Q20 | ❌ Không có | ❌ |
| story_arc structure | ✅ 4 phases | ✅ 4 phases | ✅ |
| story_character | ✅ Đầy đủ | ✅ Đầy đủ (facts object) | ✅ |
| opening_narrative | ✅ Có | ✅ Có | ✅ |
| objectives array | ❌ Không có | ✅ Có (7 objectives) | ✅ Bonus |

#### **Điểm mạnh Week 4:**
✅ Có **objectives array** (Week 2 không có)  
✅ story_character.facts dùng **object** thay vì array (structured hơn)  
✅ story_arc có **goal** field cho mỗi phase  

#### **Điểm yếu Week 4:**
⚠️ mission_context ngắn hơn (150 vs 600 lines)  
❌ Thiếu {student_answer} placeholder examples  
❌ Thiếu short answer handling guide  
❌ Thiếu hints generation detailed guide  
❌ Thiếu exact hints for each question (Q1-Q20)  

---

### **WEEK 5 - MISSION 1: "Exploring My House"** ✅

#### **Cấu trúc:**
```javascript
{
  mission_id: 1,
  title: "Exploring My House",
  title_vi: "Khám phá Ngôi nhà",
  theme: "Rooms",
  
  story_character: {
    name: "Ms. Nova",
    personality: "Curious, enthusiastic, loves visiting houses",
    backstory: "Ms. Nova travels the world visiting different houses...",
    speaking_style: "Friendly, asks follow-up questions...",
    facts: {
      house_size: "small",
      house_color: "blue",
      favorite_room: "bedroom",
      ...
    }
  },
  
  opening_narrative: "Hi! I'm Ms. Nova! I travel around the world...",
  
  nova_greeting: "Hi! Let's explore your house together!", // DEPRECATED
  
  // 🔥 ~100 LINES
  mission_context: `
    STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level.
    LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence.
    Ask OPEN-ENDED questions (What...? Tell me about...?) NOT Yes/No.
    GRAMMAR: Articles A/An (This is a kitchen).
    VOCABULARY: bedroom, kitchen, bathroom, living_room, bed, chair, table.
    ENCOURAGE: Invite student to ask YOU questions every 3-4 turns.
    AVOID: Complex grammar, past tense.
    FOCUS: Rooms and basic furniture only.
  `,
  
  target_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "bed", "chair"],
  grammar_pattern: "This is a/an [noun]",
  
  // 🔥 4 PHASES ĐẦY ĐỦ
  story_arc: [
    { phase: "introduction", turns: "1-5", goal: "...", required_vocab: [], phase_questions: [...] },
    { phase: "room_exploration", turns: "6-12", goal: "...", required_vocab: [...], phase_questions: [...] },
    { phase: "family_and_activities", turns: "13-17", goal: "...", required_vocab: [], phase_questions: [...] },
    { phase: "conclusion", turns: "18-20", goal: "...", required_vocab: [], phase_questions: [...] }
  ],
  
  minimum_turns: 15,
  maximum_turns: 20,
  
  objectives: [
    // 7+ objectives with question_variants, hints, etc.
  ]
}
```

#### **So sánh với Week 2:**
| Feature | Week 2 | Week 5 | Status |
|---------|--------|--------|--------|
| mission_context detail | 600+ lines | ~100 lines | ⚠️ Ngắn hơn nhiều |
| Forbidden questions list | ✅ Chi tiết | ❌ Không có | ❌ |
| {student_answer} examples | ✅ 20+ examples | ❌ Không có | ❌ |
| story_arc structure | ✅ 4 phases | ✅ 4 phases | ✅ |
| story_arc có "goal" | ❌ Không có | ✅ Có | ✅ Bonus |
| story_arc có "required_vocab" | ❌ Không có | ✅ Có | ✅ Bonus |
| objectives array | ❌ Không có | ✅ Có | ✅ Bonus |

#### **Điểm mạnh Week 5:**
✅ story_arc có **goal** và **required_vocab** per phase  
✅ Có objectives array  
✅ Có deprecated field note (nova_greeting)  

#### **Điểm yếu Week 5:**
⚠️ mission_context CỰC KỲ NGẮN (100 vs 600 lines)  
❌ Thiếu toàn bộ detailed examples như Week 2  

---

### **WEEK 6 & 7** - Tương tự Week 5

Week 6 Mission 1: "The Treasure Map"  
Week 7 Mission 1: "What's in My Backpack"  

**Cấu trúc giống hệt Week 5:**
- story_character với facts object ✅
- opening_narrative ✅
- mission_context ~100-150 lines ⚠️
- story_arc 4 phases với goal, required_vocab ✅
- objectives array ✅
- minimum/maximum_turns ✅

---

## 📊 BẢNG SO SÁNH TỔNG HỢP

| Feature | W2 | W3 | W4 | W5 | W6 | W7 |
|---------|----|----|----|----|----|----|
| **Có Mission 1 đầy đủ?** | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| **mission_context length** | 600+ | - | 150 | 100 | 100 | 150 |
| **Forbidden questions list** | ✅ | - | ⚠️ | ❌ | ❌ | ⚠️ |
| **{student_answer} examples** | ✅ | - | ❌ | ❌ | ❌ | ❌ |
| **Short answer handling** | ✅ | - | ❌ | ❌ | ❌ | ❌ |
| **Hints generation guide** | ✅ | - | ❌ | ❌ | ❌ | ❌ |
| **Exact hints for Q1-Q20** | ✅ | - | ❌ | ❌ | ❌ | ❌ |
| **story_arc 4 phases** | ✅ | - | ✅ | ✅ | ✅ | ✅ |
| **story_arc has "goal"** | ❌ | - | ✅ | ✅ | ✅ | ✅ |
| **story_arc has "required_vocab"** | ❌ | - | ❌ | ✅ | ✅ | ✅ |
| **story_character** | ✅ | - | ✅ | ✅ | ✅ | ✅ |
| **story_character.facts type** | array | - | object | object | object | object |
| **opening_narrative** | ✅ | - | ✅ | ✅ | ✅ | ✅ |
| **nova_greeting (deprecated)** | ✅ | - | ✅ | ✅ | ✅ | ✅ |
| **objectives array** | ❌ | - | ✅ | ✅ | ✅ | ✅ |
| **minimum/maximum_turns** | ✅ | - | ✅ | ✅ | ✅ | ✅ |

---

## 🎯 PHÂN TÍCH CHI TIẾT

### **1. mission_context - CHÊNH LỆCH LỚN**

**Week 2 (600+ lines):**
```javascript
mission_context: `
  🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
  - DON'T modify or shorten the questions
  - COPY question text word-for-word from phase_questions
  - Each student answer = Move to NEXT question in phase_questions array

  🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER EVER ASK THESE: 🚨🚨🚨
  ❌ "What do you think?" - FORBIDDEN!
  ❌ "How do you feel?" - FORBIDDEN!
  ❌ "Do you like...?" (without options) - FORBIDDEN!
  ❌ "What can I do for you?" - FORBIDDEN!
  ❌ Personal opinion questions - FORBIDDEN!
  ❌ Breaking character - FORBIDDEN!

  ✅ ONLY ASK QUESTIONS FROM THE phase_questions ARRAY BELOW!

  🚨 USING {student_answer} PLACEHOLDER CORRECTLY:
  When you see {student_answer} in phase_questions:
  1. EXTRACT the key word only (verb or adjective)
  2. REMOVE pronouns if student included them
  3. REMOVE nouns if student repeated them

  EXAMPLES:
  - Student: "my mother cooks" → Extract "cooks" → Say: "She cooks!"
  - Student: "cooks" → Use "cooks" → Say: "She cooks!"  
  - Student: "she cooks" → Extract "cooks" → Say: "She cooks!" (not "She she cooks!")
  - Student: "kind" → Use "kind" → Say: "Your mother is kind!"
  - Student: "my mother is kind" → Extract "is kind" → Say: "Your mother is kind!"

  NEVER output:
  ❌ "She my mother!" 
  ❌ "She she cooks!"
  ❌ "He father!"
  ❌ "kind!" (incomplete)

  ALWAYS output complete sentences:
  ✅ "She cooks!"
  ✅ "Your mother is kind!"
  ✅ "He works!"

  🚨 HANDLING SHORT STUDENT ANSWERS:
  Students might give SHORT answers (one word only):
  - Question: "What is your mother like?"
  - Student: "kind" (just one word)
  - YOU MUST recast as FULL SENTENCE: "Your mother is kind!" ✅
  - DON'T just repeat: "kind!" ❌

  EXAMPLES:
  - Student: "kind" → You: "Your mother is kind! ❤️"
  - Student: "cooks" → You: "Your mother cooks! 🍳"
  - Student: "strong" → You: "Your father is strong! 💪"
  - Student: "happy" → You: "Your family is happy! 😊"

  PATTERN: [Subject] + [is/are] + [adjective] OR [Subject] + [verb]

  🚨 HINTS GENERATION (CRITICAL!):
  When you ask a question, provide hints that help student answer THAT SPECIFIC QUESTION.

  STEP 1: Look at the question YOU just asked
  STEP 2: Think: "What words would a student need to answer this?"
  STEP 3: Put those ANSWER WORDS in suggested_hints array

  EXAMPLES:

  Question: "What is your mother like?"
  ❌ WRONG hints: ["what", "is", "your", "mother", "like"] (question words)
  ✅ RIGHT hints: ["My", "mother", "is", "kind", "nice", "beautiful"]

  Question: "who do you live with?"
  ❌ WRONG hints: ["who", "do", "you", "live", "with"] (question words)  
  ✅ RIGHT hints: ["I", "live", "with", "my", "mother", "father"]

  🎯 EXACT HINTS FOR EACH PHASE QUESTION:

  Phase 1 - Questions & Their Exact Hints:
  Q1: "What is your mother like?"
  → Hints: ["My", "mother", "is", "kind", "nice", "beautiful"]

  Q2: "What is your father like?"
  → Hints: ["My", "father", "is", "strong", "kind", "tall"]

  ... (Q3-Q20 chi tiết)

  GRAMMAR: "My [family member] is [adjective]" pattern
  VOCABULARY: mother, father, brother, sister, family, home, kind, happy, love, together
`
```

**Week 4-7 (~100-150 lines):**
```javascript
mission_context: `
  This is Week X Mission 1.
  STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level.
  LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence.
  GRAMMAR: [pattern]
  VOCABULARY: [list]
  STRICT FOCUS: [focus area]
  FORBIDDEN: Do NOT ask [a few examples]
  ONLY allowed questions: [a few examples]
`
```

**Chênh lệch:**
- Week 2: **600+ lines** với examples cụ thể cho mọi tình huống
- Week 4-7: **100-150 lines** chỉ có rules tổng quát

---

### **2. story_arc - Cấu trúc khác nhau**

**Week 2:**
```javascript
story_arc: [
  {
    phase: "intro",
    turns: "1-5",
    phase_name: "Family Members Introduction",
    focus: "Name family members and start describing",
    phase_questions: [...]
  }
]
```

**Week 4-7:**
```javascript
story_arc: [
  {
    phase: "introduction",
    turns: "1-5",
    goal: "Learn student's name, basic house info",  // ✅ BONUS
    required_vocab: [],  // ✅ BONUS (Week 5-7)
    phase_questions: [...]
  }
]
```

**Khác biệt:**
- Week 2: `focus` field (text description)
- Week 4-7: `goal` field (more explicit)
- Week 5-7: Thêm `required_vocab` array

---

### **3. story_character.facts - Array vs Object**

**Week 2:**
```javascript
story_character: {
  facts: [
    "I think families are wonderful teams!",
    "Every family member is important!",
    ...
  ]
}
```

**Week 4-7:**
```javascript
story_character: {
  facts: {
    has_happy_jar: true,
    jar_color: "blue",
    favorite_activity: "drawing",
    ...
  }
}
```

**Đánh giá:**
- Week 4-7 **TỐT HƠN** - structured data, dễ query
- Week 2 - array of strings, khó parse

---

### **4. objectives array - Week 4-7 có, Week 2 không**

**Week 4-7:**
```javascript
objectives: [
  {
    stepKey: "student_name",
    category: "Identity",
    question_variants: [
      {
        question: "What is your name?",
        hints: ["name", "is", "My", "I", "am"]
      }
    ],
    target_keywords: ["my", "name", "is", "I", "am"],
    ack_options: ["Nice!", "Great!", "Wonderful!"],
    recast_templates: ["Your name is {name}!", ...],
    success_criteria: "Student says their name"
  },
  ...
]
```

**Week 2:** ❌ KHÔNG CÓ objectives array

**Đánh giá:**
- objectives array là **BONUS FEATURE** của Week 4-7
- Giúp AI có alternative questions, structured validation

---

## 🔧 RECOMMENDED FIXES

### **FIX 1: Week 3 Mission 1 - Implement đầy đủ**

**Priority:** 🔴 CRITICAL

**Current:**
```javascript
{
  mission_id: 1,
  title: "Looking in the Mirror",
  context_en: "...",
  target_vocab: [...],
  learning_focus: "..."
}
```

**Should be (theo pattern Week 4-7):**
```javascript
{
  mission_id: 1,
  title: "Looking in the Mirror",
  title_vi: "Nhìn Vào Gương",
  theme: "Self-Description",
  
  story_character: {
    name: "Ms. Nova",
    personality: "...",
    backstory: "...",
    speaking_style: "...",
    facts: {
      has_mirror: true,
      likes_appearance_games: true,
      ...
    }
  },
  
  opening_narrative: "Hi! I'm Ms. Nova! Let's look in the mirror!...",
  
  mission_context: `...`,
  
  target_vocab: ["tall", "short", "hair", "eyes", "face", "smile"],
  grammar_pattern: "I am [adjective]. / I have [noun].",
  
  story_arc: [
    { phase: "introduction", turns: "1-5", ... },
    { phase: "describing_self", turns: "6-12", ... },
    { phase: "comparing", turns: "13-17", ... },
    { phase: "conclusion", turns: "18-20", ... }
  ],
  
  minimum_turns: 15,
  maximum_turns: 20,
  
  objectives: [...]
}
```

---

### **FIX 2: Week 4-7 - Mở rộng mission_context**

**Priority:** 🟡 HIGH

**Thêm vào mission_context của Week 4-7:**

```javascript
mission_context: `
  This is Week X Mission 1.
  
  // ✅ THÊM SECTION NÀY:
  🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER EVER ASK THESE: 🚨🚨🚨
  ❌ "What do you think?" - FORBIDDEN!
  ❌ "How do you feel?" - FORBIDDEN!
  ❌ "Do you like...?" (without options) - FORBIDDEN!
  ❌ "What can I do for you?" - FORBIDDEN!
  ❌ Personal opinion questions - FORBIDDEN!
  ❌ Breaking character - FORBIDDEN!

  ✅ ONLY ASK QUESTIONS FROM THE phase_questions ARRAY!

  // ✅ THÊM SECTION NÀY:
  🚨 USING {student_answer} PLACEHOLDER CORRECTLY:
  When you see {student_answer} in phase_questions:
  1. EXTRACT the key word only (verb or adjective)
  2. REMOVE pronouns if student included them
  3. REMOVE nouns if student repeated them

  EXAMPLES:
  - Student: "my bedroom is big" → Extract "big" → Say: "Your bedroom is big!"
  - Student: "big" → Use "big" → Say: "Your bedroom is big!"  
  - Student: "it is big" → Extract "big" → Say: "Your bedroom is big!"

  NEVER output:
  ❌ "it!" 
  ❌ "big!" (incomplete)

  ALWAYS output complete sentences:
  ✅ "Your bedroom is big!"
  ✅ "It is big!"

  // ✅ THÊM SECTION NÀY:
  🚨 HANDLING SHORT STUDENT ANSWERS:
  Students might give SHORT answers (one word only):
  - Question: "What is your room like?"
  - Student: "big" (just one word)
  - YOU MUST recast as FULL SENTENCE: "Your room is big!" ✅
  - DON'T just repeat: "big!" ❌

  EXAMPLES:
  - Student: "big" → You: "Your room is big! 🏠"
  - Student: "blue" → You: "Your house is blue! 💙"
  - Student: "happy" → You: "You are happy! 😊"

  // ✅ THÊM SECTION NÀY:
  🚨 HINTS GENERATION (CRITICAL!):
  When you ask a question, provide hints that help student answer THAT SPECIFIC QUESTION.

  STEP 1: Look at the question YOU just asked
  STEP 2: Think: "What words would a student need to answer this?"
  STEP 3: Put those ANSWER WORDS in suggested_hints array

  EXAMPLES:

  Question: "What is your favorite room?"
  ❌ WRONG hints: ["what", "is", "your", "favorite", "room"] (question words)
  ✅ RIGHT hints: ["My", "favorite", "room", "is", "the", "bedroom", "living", "room"]

  Question: "What is in your bedroom?"
  ❌ WRONG hints: ["what", "is", "in", "your", "bedroom"] (question words)
  ✅ RIGHT hints: ["In", "my", "bedroom", "is", "a", "bed", "chair", "table"]

  CRITICAL RULES FOR HINTS:
  1. Extract ANSWER words (nouns, verbs, adjectives) from YOUR question
  2. Add grammar words: "My", "is", "I", "a", etc.
  3. NEVER include question words: "what", "who", "when", "where", "how"
  4. Hints = vocabulary student needs to BUILD the answer sentence
  5. Always return 5-8 hints

  // Existing content...
  STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level.
  ...
`
```

**Kết quả:**
- mission_context từ 100-150 lines → **300-400 lines**
- Vẫn ngắn hơn Week 2 (600 lines) nhưng **ĐỦ CHI TIẾT** hơn

---

### **FIX 3: Week 2 - Thêm objectives array (Optional)**

**Priority:** 🔵 MEDIUM

Week 2 có thể học hỏi từ Week 4-7:
- Thêm objectives array
- Chuyển story_character.facts từ array → object

**Ví dụ:**
```javascript
// Week 2 - Thêm objectives:
objectives: [
  {
    stepKey: "mother_description",
    category: "Family Member",
    question_variants: [
      {
        question: "What is your mother like?",
        hints: ["My", "mother", "is", "kind", "nice", "beautiful"]
      }
    ],
    target_keywords: ["mother", "kind", "nice", "beautiful"],
    ack_options: ["Wonderful!", "Beautiful!", "Great!"],
    recast_templates: ["Your mother is {adjective}!"],
    success_criteria: "Student describes mother"
  },
  ...
]
```

---

### **FIX 4: Standardize story_character.facts**

**Priority:** 🔵 LOW

**Recommendation:** Chuyển tất cả sang **object** (như Week 4-7)

**Lý do:**
- Structured data
- Dễ query: `story_character.facts.has_happy_jar`
- AI có thể tham chiếu dễ dàng

---

## 📊 TỔNG KẾT

### **Mission 1 hoàn thiện nhất:**
🏆 **Week 2** - 600+ lines mission_context với examples chi tiết

### **Mission 1 thiếu nhất:**
❌ **Week 3** - Không có implementation, chỉ có placeholder

### **Mission 1 cân bằng nhất:**
✅ **Week 4, 5, 6, 7** - Có đầy đủ structure nhưng mission_context ngắn

### **Features Week 2 có mà các tuần khác không:**
1. mission_context CỰC KỲ CHI TIẾT (600+ lines)
2. Forbidden questions list chi tiết
3. {student_answer} placeholder với 20+ examples
4. Short answer handling với examples
5. Hints generation detailed guide
6. Exact hints for Q1-Q20

### **Features Week 4-7 có mà Week 2 không:**
1. objectives array
2. story_character.facts dạng object (structured)
3. story_arc có "goal" field
4. story_arc có "required_vocab" (Week 5-7)

### **Recommendation:**
**Option 1:** Giữ nguyên Week 2 là Golden Standard, áp dụng style đó cho các tuần khác  
**Option 2:** Học hỏi best practices từ cả Week 2 và Week 4-7, tạo hybrid model:
- mission_context chi tiết như Week 2
- objectives array như Week 4-7
- story_arc có goal + required_vocab như Week 5-7

---

**Status:** 🔍 ANALYSIS COMPLETE  
**Next Step:** Implement Week 3 Mission 1, expand mission_context for Week 4-7  
**ETA:** ~2 hours for all fixes

