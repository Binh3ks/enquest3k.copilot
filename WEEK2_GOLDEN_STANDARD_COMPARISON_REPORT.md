# 🏆 WEEK 2 GOLDEN STANDARD vs WEEKS 3-7 - COMPARISON REPORT

**Date:** February 2, 2026  
**Golden Standard:** Week 2 (`week_02_real.js`)  
**Compare Against:** Weeks 3, 4, 5, 6, 7

---

## 📋 EXECUTIVE SUMMARY

Week 2 đã được thiết kế theo **WEEK_PRODUCTION_PROMPT_V2.1.md** với cấu trúc hoàn chỉnh nhất. Sau khi so sánh, có **6 vấn đề chính** cần sửa ở các tuần 3-7 để đồng bộ với Golden Standard.

---

## ✅ WEEK 2 GOLDEN STANDARD - CẤU TRÚC CHUẨN

### **1. Metadata Hoàn Chỉnh**
```javascript
{
  week_id: 2,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 2
}
```

### **2. Story Missions Structure**
```javascript
missions: [
  {
    mission_id: 1,
    title: "Meet My Family",
    title_en: "Meet My Family",
    title_vi: "Gặp Gỡ Gia Đình Tôi",
    theme: "Introducing Family Members",
    
    nova_greeting: "...",
    default_hints: [...],
    
    // 🔥 CRITICAL: mission_context với CHI TIẾT rules
    mission_context: `
      🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
      🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER ASK THESE
      🚨 USING {student_answer} PLACEHOLDER CORRECTLY
      🚨 HANDLING SHORT STUDENT ANSWERS
      🚨 HINTS GENERATION (CRITICAL!)
    `,
    
    target_vocab: [...],
    grammar_pattern: "My [family member] is [adjective].",
    
    story_character: {
      name: "Ms. Nova",
      personality: "...",
      backstory: "...",
      speaking_style: "...",
      facts: [...],
      role: "Family conversation guide"
    },
    
    opening_narrative: "🏠 Hi! I'm Ms. Nova! ...",
    
    // 🔥 CRITICAL: story_arc với 4 phases
    story_arc: [
      {
        phase: "intro",
        turns: "1-5",
        phase_name: "Family Members Introduction",
        focus: "Name family members and start describing",
        phase_questions: [
          {
            template: "(After student says...) Great! Tell me... Say: ...",
            hints: ["My", "mother", "is", "kind", "nice", "beautiful"]
          }
        ]
      },
      {
        phase: "family_details",
        turns: "6-11",
        phase_name: "Family Characteristics",
        focus: "...",
        phase_questions: [...]
      },
      {
        phase: "family_love",
        turns: "12-17",
        phase_name: "Family Love and Togetherness",
        focus: "...",
        phase_questions: [...]
      },
      {
        phase: "closing",
        turns: "18-20",
        phase_name: "Final Reflection",
        focus: "...",
        phase_questions: [...]
      }
    ]
  }
]
```

---

## ❌ VẤN ĐỀ PHÁT HIỆN - SO SÁNH WEEK 3-7

### **ISSUE 1: Week 3 - THIẾU story_arc Phase 4 (Closing)**

**File:** `week_03_real.js`

**Hiện tại:** Week 3 Mission 1 chỉ có **3 phases**:
- Phase 1: "intro" (turns 1-5)
- Phase 2: "middle" (turns 6-11)
- Phase 3: "more_practice" (turns 12-16)
- ❌ **MISSING:** Phase 4: "closing" (turns 17-20)

**Week 2 có 4 phases đầy đủ:**
```javascript
// Week 2 - GOLDEN STANDARD
story_arc: [
  { phase: "intro", turns: "1-5" },
  { phase: "family_details", turns: "6-11" },
  { phase: "family_love", turns: "12-17" },
  { phase: "closing", turns: "18-20" }  // ✅ CÓ
]
```

**Week 3 - THIẾU:**
```javascript
// Week 3 - MISSING Phase 4
story_arc: [
  { phase: "intro", turns: "1-5" },
  { phase: "middle", turns: "6-11" },
  { phase: "more_practice", turns: "12-16" },
  { phase: "closing", turns: "17-20" }  // ❌ KHÔNG CÓ trong mission 1
]
```

**Impact:**
- AI không có hướng dẫn cho turns 17-20
- Không có goodbye phase tự nhiên
- Mission kết thúc đột ngột

---

### **ISSUE 2: Week 3 - mission_context NGẮN HƠN, THIẾU CHI TIẾT**

**Week 2 - mission_context CỰC KỲ CHI TIẾT (500+ lines):**
```javascript
mission_context: `This is Week 2 Mission 1 - Meet My Family (Introduction).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions
- COPY question text word-for-word from phase_questions
- Each student answer = Move to NEXT question in phase_questions array

🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER EVER ASK THESE: 🚨🚨🚨
❌ "What do you think?" - FORBIDDEN!
❌ "How do you feel?" - FORBIDDEN!
❌ "Do you like...?" (without options) - FORBIDDEN!

🚨 USING {student_answer} PLACEHOLDER CORRECTLY:
[300 lines of detailed examples]

🚨 HANDLING SHORT STUDENT ANSWERS:
[100 lines of examples]

🚨 HINTS GENERATION (CRITICAL!):
[200 lines with exact hints for each question]

GRAMMAR: "My [family member] is [adjective]" pattern
VOCABULARY: mother, father, brother, sister, family, home, kind, happy, love, together`
```

**Week 3 - mission_context NGẮN HƠN (50 lines):**
```javascript
mission_context: `This is Week 3 Mission 2 - Guess My Friend (Description Game).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions

QUESTION TRACKING:
- Question #1 (after opening): "Good! She has curly hair! ..."
- Question #2: "Nice! Her hair is black! ..."

STRICT RULES:
1. After student answers, use NEXT question from list above
2. NEVER ask same question twice

FORBIDDEN:
❌ "What color?" (missing choices!)

GRAMMAR: "is" for qualities (tall), "has" for features (hair, eyes)
VOCABULARY: tall, short, long, curly, straight, glasses, brown, black, blonde`
```

**Missing từ Week 3:**
- ❌ Không có section "ABSOLUTELY FORBIDDEN QUESTIONS"
- ❌ Không có chi tiết về "{student_answer} placeholder"
- ❌ Không có "HANDLING SHORT STUDENT ANSWERS"
- ❌ Không có "HINTS GENERATION (CRITICAL!)" với examples
- ❌ Không có exact hints cho từng question

---

### **ISSUE 3: Week 4, 5, 6, 7 - story_arc CÓ, NHƯNG STRUCTURE KHÁC Week 2**

**Week 2 (Golden Standard) - phase_questions structure:**
```javascript
phase_questions: [
  {
    template: "(After student says...) Great! Tell me... Say: My mother is kind OR...",
    hints: ["My", "mother", "is", "kind", "nice", "beautiful"]
  }
]
```

**Week 4, 5, 6, 7 - phase_questions structure (GIỐNG):**
```javascript
phase_questions: [
  {
    template: "What is your favorite room? Bedroom, living room, or kitchen? Say: My favorite room is the bedroom OR...",
    hints: ["My", "favorite", "room", "is", "the", "bedroom", "living", "room"]
  }
]
```

✅ **Week 4-7 CÓ story_arc đầy đủ 4 phases**  
✅ **Week 4-7 CÓ phase_questions với hints**

**So sánh:**
- Week 2: `template` có context "(After student says...)" → Rõ ràng hơn
- Week 4-7: `template` chỉ có question → Ít context hơn

---

### **ISSUE 4: Week 3 - KHÔNG CÓ field `global_vocab`**

**Week 2 - CÓ global_vocab:**
```javascript
{
  target_vocab: [{ word: "mother", ... }, ...],
  global_vocab: ["mother", "father", "brother", "sister", "family", "home", "kind", "happy", "love", "together"]
}
```

**Week 3 - THIẾU global_vocab:**
```javascript
{
  target_vocab: [{ word: "tall", ... }, ...],
  // ❌ MISSING: global_vocab field
}
```

**Week 4, 5, 6, 7 - ✅ CÓ global_vocab**

---

### **ISSUE 5: Week 3 - Metadata field name INCONSISTENT**

**Week 2, 4, 5, 6, 7 - Dùng `week_id`:**
```javascript
{
  week_id: 2,
  week_number: 2
}
```

**Week 3 - Dùng CẢ `weekId` VÀ `week_id`:**
```javascript
{
  weekId: 3,  // 🔥 Thêm field này
  week_id: 3,
  week_number: 3
}
```

**Lý do Week 3 có `weekId`:**  
Comment ghi: `// 🔥 NovaEngine expects number for GAME_TEMPLATES`

**Đánh giá:**  
- ✅ Không sai nếu NovaEngine cần `weekId`
- ⚠️ Nhưng các tuần khác không có → Inconsistency

---

### **ISSUE 6: Week 3, 4, 5, 6, 7 - `export const` vs `const` (no export)**

**Week 2, 4, 5, 6, 7:**
```javascript
const week2RealData = { ... };
export default week2RealData;
```

**Week 3:**
```javascript
export const week3RealData = { ... };  // 🔥 Named export
```

**Impact:**
- Week 3 dùng **named export**
- Các tuần khác dùng **default export**
- Import syntax khác nhau:
  - `import week2RealData from './week_02_real.js'`  
  - `import { week3RealData } from './week_03_real.js'`

---

## 📊 SUMMARY TABLE - CÁC VẤN ĐỀ CẦN FIX

| Week | story_arc 4 phases | mission_context detail | global_vocab | weekId field | export type | Status |
|------|-------------------|------------------------|--------------|--------------|-------------|--------|
| **Week 2** | ✅ CÓ | ✅ CỰC KỲ CHI TIẾT (500+ lines) | ✅ CÓ | ❌ KHÔNG CÓ | Default | 🏆 GOLDEN |
| **Week 3** | ❌ THIẾU phase 4 | ⚠️ NGẮN (50 lines) | ❌ THIẾU | ✅ CÓ | Named | 🔧 CẦN FIX |
| **Week 4** | ✅ CÓ | ⚠️ NGẮN (~100 lines) | ✅ CÓ | ❌ KHÔNG CÓ | Default | ⚠️ OK nhưng thiếu detail |
| **Week 5** | ✅ CÓ | ⚠️ NGẮN (~100 lines) | ✅ CÓ | ❌ KHÔNG CÓ | Default | ⚠️ OK nhưng thiếu detail |
| **Week 6** | ✅ CÓ | ⚠️ NGẮN (~100 lines) | ✅ CÓ | ❌ KHÔNG CÓ | Default | ⚠️ OK nhưng thiếu detail |
| **Week 7** | ✅ CÓ | ⚠️ NGẮN (~100 lines) | ✅ CÓ | ❌ KHÔNG CÓ | Default | ⚠️ OK nhưng thiếu detail |

---

## 🔧 RECOMMENDED FIXES

### **FIX 1: Week 3 - Thêm Phase 4 (Closing)**

**File:** `src/data/weeks/week_03_real.js`

**Mission 1 - Thêm phase 4:**
```javascript
story_arc: [
  { phase: "intro", turns: "1-5", ... },
  { phase: "middle", turns: "6-11", ... },
  { phase: "more_practice", turns: "12-16", ... },
  // ✅ THÊM PHASE 4
  {
    phase: "closing",
    turns: "17-20",
    phase_name: "Goodbye & Reflection",
    focus: "Wrap up conversation about appearance",
    phase_questions: [
      {
        template: "You did great! Now tell me - are you tall or short? Say: I am tall OR I am short?",
        hints: ["I", "am", "tall", "short"]
      },
      {
        template: "Good! You are {student_answer}! What color is your hair? Say: My hair is black OR brown OR blonde?",
        hints: ["My", "hair", "is", "black", "brown", "blonde"]
      },
      {
        template: "Nice! Your hair is {student_answer}! Do you wear glasses? Say: Yes I wear glasses OR No I don't wear glasses?",
        hints: ["Yes", "I", "wear", "glasses", "No", "don't"]
      },
      {
        template: "Perfect! Thank you for playing! Goodbye! Say: Goodbye OR See you!",
        hints: ["Goodbye", "See", "you", "Bye"]
      }
    ]
  }
]
```

---

### **FIX 2: Week 3 - Thêm global_vocab**

**File:** `src/data/weeks/week_03_real.js`

**Thêm sau target_vocab:**
```javascript
target_vocab: [...],

// ✅ THÊM global_vocab
global_vocab: ["tall", "short", "hair", "eyes", "long", "curly", "straight", "glasses", "face", "smile"],
```

---

### **FIX 3: Week 3 - Chuẩn hóa export**

**File:** `src/data/weeks/week_03_real.js`

**Before:**
```javascript
export const week3RealData = { ... };
```

**After:**
```javascript
const week3RealData = { ... };
export default week3RealData;
```

**Hoặc giữ nguyên named export, nhưng update file import nó:**
- Check `src/data/weekData.js` xem import Week 3 như thế nào

---

### **FIX 4: Week 3, 4, 5, 6, 7 - Mở rộng mission_context**

**Cấu trúc mission_context nên có (theo Week 2):**

```javascript
mission_context: `This is Week X Mission Y - [Title].

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
- Student: "my bedroom is big" → Extract "big" → Say: "Your bedroom is big!"
- Student: "big" → Use "big" → Say: "Your bedroom is big!"  
- Student: "it is big" → Extract "big" → Say: "Your bedroom is big!"

NEVER output:
❌ "it!" 
❌ "big!" (incomplete)

ALWAYS output complete sentences:
✅ "Your bedroom is big!"
✅ "It is big!"

🚨 HANDLING SHORT STUDENT ANSWERS:
Students might give SHORT answers (one word only):
- Question: "What is your room like?"
- Student: "big" (just one word)
- YOU MUST recast as FULL SENTENCE: "Your room is big!" ✅
- DON'T just repeat: "big!" ❌

🚨 HINTS GENERATION (CRITICAL!):
When you ask a question, provide hints that help student answer THAT SPECIFIC QUESTION.

STEP 1: Look at the question YOU just asked
STEP 2: Think: "What words would a student need to answer this?"
STEP 3: Put those ANSWER WORDS in suggested_hints array

EXAMPLES:

Question: "What is your favorite room?"
❌ WRONG hints: ["what", "is", "your", "favorite", "room"] (question words)
✅ RIGHT hints: ["My", "favorite", "room", "is", "the", "bedroom", "living", "room"]

🎯 EXACT HINTS FOR EACH PHASE QUESTION:
[Chi tiết hints cho từng question trong story_arc]

GRAMMAR: [Week-specific grammar pattern]
VOCABULARY: [Week-specific vocab list]`
```

**Áp dụng cho Week 3, 4, 5, 6, 7:**
- Copy template trên
- Customize EXAMPLES, HINTS, GRAMMAR, VOCABULARY theo từng tuần

---

### **FIX 5: Week 3 - Xóa field `weekId` (optional)**

**Nếu không cần thiết:**
```javascript
// Before
{
  weekId: 3,  // 🔥 NovaEngine expects number for GAME_TEMPLATES
  week_id: 3,
}

// After
{
  week_id: 3,
}
```

**Nếu cần thiết:** Thêm `weekId` vào tất cả các tuần khác để đồng bộ.

---

## 🎯 PRIORITY RANKING

### **CRITICAL (Phải fix ngay):**
1. ✅ **Week 3 - Thêm global_vocab** (Breaking: game system cần field này)
2. ✅ **Week 3 - Fix export syntax** (Breaking: import không được nếu sai)
3. ✅ **Week 3 - Thêm Phase 4 closing** (UX: Mission kết thúc đột ngột)

### **HIGH (Nên fix):**
4. ⚠️ **Week 3-7 - Mở rộng mission_context** (Quality: AI cần chi tiết hơn)

### **MEDIUM (Nice to have):**
5. 🔵 **Week 3 - Xóa hoặc đồng bộ field weekId** (Consistency)

---

## 📝 NOTES

### **Tại sao Week 2 là Golden Standard?**

1. **Được generate theo WEEK_PRODUCTION_PROMPT_V2.1.md** - Prompt chuẩn nhất
2. **mission_context CỰC KỲ CHI TIẾT** - 500+ lines với examples
3. **4 phases đầy đủ** - intro → middle → deep → closing
4. **Hints chi tiết** - Exact hints cho từng question
5. **Forbidden rules** - Liệt kê cụ thể những gì AI KHÔNG ĐƯỢC phép hỏi

### **Lý do Week 3 khác biệt?**

- Week 3 comment: "Generated per: ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt"
- → Dùng prompt **V28**, không phải V2.1
- → Structure khác, thiếu nhiều details

### **Làm sao để fix?**

**Option 1: Manual Fix (Nhanh)**
- Áp dụng các FIX 1-5 ở trên
- Chỉ sửa những gì thiếu

**Option 2: Re-generate Week 3 (Chậm nhưng chuẩn)**
- Dùng WEEK_PRODUCTION_PROMPT_V2.1.md
- Generate lại Week 3 từ đầu
- Copy structure từ Week 2

**Recommendation:** Option 1 - Manual fix (nhanh hơn, ít risk hơn)

---

## ✅ CHECKLIST - SAU KHI FIX

- [ ] Week 3 có `global_vocab`
- [ ] Week 3 có phase 4 "closing" trong story_arc
- [ ] Week 3 export syntax giống Week 2, 4, 5, 6, 7
- [ ] Week 3 mission_context chi tiết hơn (ít nhất 200 lines)
- [ ] Week 3 có "ABSOLUTELY FORBIDDEN QUESTIONS" section
- [ ] Week 3 có "HINTS GENERATION (CRITICAL!)" section
- [ ] Week 3-7 mission_context có examples về {student_answer}
- [ ] Test Week 3 Mission 1 trong browser (check console logs)
- [ ] Verify AI không bị stuck ở turn 17-20

---

**Status:** 🔍 ANALYSIS COMPLETE  
**Next Step:** Apply fixes to Week 3  
**ETA:** ~30 minutes for manual fixes

