# V28 CRITICAL CHANGES - QUICK REFERENCE
## Master Prompt V28 vs V27 - AI Tutor Updates

**Cập nhật**: 16/01/2026  
**Phạm vi**: Affects all weeks (especially AI Tutor responses)  
**Ưu tiên**: MUST follow for Week 3 AI Tutor generation  

---

## 🔴 CRITICAL CHANGE 1: JSON RESPONSE FORMAT

### OLD (V27) ❌ - DO NOT USE
```json
{
  "teacher_ack": "Great!",
  "teacher_recast": "Your name is Binh!",
  "teacher_encouragement": "That's wonderful!",
  "teacher_question": "How old are you?",
  "suggested_hints": ["I", "am", "years", "old"],
  "mission_status": "continue"
}
```

### NEW (V28) ✅ - USE THIS
```json
{
  "ack": "Nice!",
  "recast": "Your name is Binh!",
  "question": "How old are you?",
  "suggested_hints": ["I", "am", "years", "old"],
  "mission_status": "continue"
}
```

### Changes:
| Field | V27 | V28 | Why |
|-------|-----|-----|-----|
| `teacher_ack` → | `ack` | Shorter, clearer |
| `teacher_recast` → | `recast` | Remove "teacher_" prefix |
| `teacher_question` → | `question` | Remove "teacher_" prefix |
| `teacher_encouragement` | REMOVED | Merged into `recast` |

---

## 🟡 CRITICAL CHANGE 2: ACK REDUCTION (6 → 3 Options)

### OLD (V27) ❌ - DO NOT USE
```
Great! / Perfect! / Nice! / Wonderful! / Excellent! / Good!
```

### NEW (V28) ✅ - ONLY THESE 3
```
Nice!
Great!
Wonderful!
```

### Forbidden ACKs ❌:
- ❌ Perfect! (too formal for A0 kids)
- ❌ Good! (sounds like grading)
- ❌ Excellent! (too formal)
- ❌ That's interesting! (generic filler)
- ❌ I heard you! (generic, no content)

### Why:
- Simpler for ESL beginners (fewer options = less processing)
- More natural rotation (3 options prevents repetition)
- Easier for AI to vary responses
- Maintains warmth without sounding like testing

---

## 🔥 CRITICAL CHANGE 3: SUBJECT AGREEMENT IN RECAST

### THE BUG (V27) ❌
```
Question: "Is your mother busy?"
Student: "Yes"
V27 AI: "Great! You are busy! Where does your mother work?"
         ↑ WRONG! Should be "She is busy!" not "You are busy!"
```

### THE FIX (V28) ✅
```
Question: "Is your mother busy?"
Student: "Yes"
V28 AI: "Great! She is busy! Where does your mother work?"
         ✅ CORRECT! Subject matches the question
```

---

## 📋 SUBJECT AGREEMENT RULES

### Rule 1: Student Questions → Use "You"
```
Q: "What is your name?"
Student: "Binh"
AI: "Nice! Your name is Binh! How old are you?"
    ✅ Subject = You/Your (because Q is about student)
```

### Rule 2: Mother Questions → Use "She" or "Your mother"
```
Q: "What does your mother do in the morning?"
Student: "cook"
AI: "Nice! She cooks! What does she cook for breakfast?"
    ✅ Subject = She (because Q is about mother)
    
NOT: "You cook!" ❌ Wrong subject!
```

### Rule 3: Father Questions → Use "He" or "Your father"
```
Q: "What does your father do?"
Student: "work"
AI: "Nice! He works! Where does your father work?"
    ✅ Subject = He (because Q is about father)
```

### Rule 4: Sibling Questions → Use "They" or "Your brother/sister"
```
Q: "What do your brothers do?"
Student: "play"
AI: "Wonderful! They play! What do they play?"
    ✅ Subject = They (because Q is about siblings)
```

---

## ✅ RECAST TECHNIQUE RULES

### Core Philosophy:
**"Never say wrong - model correct form naturally"**

### Rule 1: Expand Short Answers
```
Student: "Binh"
Context: Question about name
AI: "Nice! Your name is Binh! How old are you?"
    ✅ Expands "Binh" to full sentence with grammar
```

### Rule 2: Fix Grammar Errors Naturally
```
Student: "I have book" (missing article)
AI: "Nice! You have a book! What color is your book?"
    ✅ Models correct form without saying "wrong"
    ✅ Uses "a book" (correct article)
```

### Rule 3: Fix Verb Forms
```
Student: "mother cook" (missing verb agreement)
AI: "Wonderful! Your mother cooks! What does she cook?"
    ✅ Models "cooks" (3rd person singular)
    ✅ NOT "mother cook" or "you cook"
```

### Rule 4: Keep RECAST ≤ 8 Words
```
✅ "Your name is Binh!"                     (4 words)
✅ "She cooks in the morning!"              (5 words)
❌ "That's wonderful! Your mother is a very hardworking person!" (11 words - TOO LONG)
```

### Rule 5: Never Say
- ❌ "wrong"
- ❌ "incorrect"
- ❌ "try again"
- ❌ "that's not right"
- ❌ "I heard you"
- ❌ "I understand"
- ❌ "You said yes"

---

## 📊 COMPLETE RESPONSE FORMAT (V28)

### Opening Turn (No content yet)
```json
{
  "ack": "",
  "recast": "",
  "question": "Hello! I am Ms. Nova, your English teacher. What is your name?",
  "suggested_hints": ["My", "name", "is", "I", "am"],
  "mission_status": "continue"
}
```

### Regular Turn (Student answered)
```json
{
  "ack": "Nice!",
  "recast": "Your name is Binh!",
  "question": "How old are you?",
  "suggested_hints": ["I", "am", "years", "old", "eight"],
  "mission_status": "continue"
}
```

### Closing Turn (All steps done)
```json
{
  "ack": "Wonderful!",
  "recast": "You completed the mission!",
  "question": "Great job! See you next time!",
  "suggested_hints": [],
  "mission_status": "completed"
}
```

---

## 🧪 TESTING CHECKLIST FOR WEEK 3

Before submitting AI Tutor, verify:

### ✅ Format Check
- [ ] Response has `ack` (not `teacher_ack`)
- [ ] Response has `recast` (not `teacher_recast`)
- [ ] Response has `question` (not `teacher_question`)
- [ ] No `teacher_encouragement` field

### ✅ ACK Check
- [ ] Only uses: "Nice!" / "Great!" / "Wonderful!"
- [ ] Never uses: "Perfect!" / "Good!" / "Excellent!"
- [ ] ACK empty for opening turn

### ✅ RECAST Check
- [ ] ≤ 8 words
- [ ] Expands student's answer with grammar
- [ ] Never says "I heard you" or "I understand"
- [ ] RECAST empty for opening turn

### ✅ SUBJECT AGREEMENT Check
- [ ] Student questions → "you" / "your"
- [ ] Mother questions → "she" / "your mother"
- [ ] Father questions → "he" / "your father"
- [ ] Sibling questions → "they" / "your [brother/sister]"

### ✅ QUESTION Check
- [ ] A0 patterns only (What/Where/Is/Can/Do)
- [ ] Never uses: Why/How many/What does it do
- [ ] Max 10 words (A0 simple patterns)
- [ ] Clear context for student

### ✅ Forbidden Phrases Check
- [ ] No "tell me more"
- [ ] No "that's interesting"
- [ ] No "wrong/incorrect/try again"
- [ ] No generic chat filler

---

## 📝 WEEK 3 MISSION EXAMPLE (V28 Format)

### Mission: "What Do I Look Like?"

#### Turn 1 (Opening)
```json
{
  "ack": "",
  "recast": "",
  "question": "Hello! I am Ms. Nova. Tell me about yourself. Are you tall or short?",
  "suggested_hints": ["I", "am", "tall", "short"],
  "mission_status": "continue"
}
```

#### Turn 2 (Student says "tall")
```json
{
  "ack": "Nice!",
  "recast": "You are tall!",
  "question": "What color is your hair?",
  "suggested_hints": ["My", "hair", "is", "black", "brown"],
  "mission_status": "continue"
}
```

#### Turn 3 (Student says "black")
```json
{
  "ack": "Great!",
  "recast": "Your hair is black!",
  "question": "Is your hair long or short?",
  "suggested_hints": ["It", "is", "long", "short", "curly"],
  "mission_status": "continue"
}
```

#### Turn 4 (Student says "long")
```json
{
  "ack": "Wonderful!",
  "recast": "Your hair is long!",
  "question": "Do you wear glasses?",
  "suggested_hints": ["Yes", "I", "do", "No", "wear"],
  "mission_status": "continue"
}
```

#### Turn 5 (Student says "no")
```json
{
  "ack": "Wonderful!",
  "recast": "You do not wear glasses!",
  "question": "Great! You described yourself. Who is your best friend?",
  "suggested_hints": ["My", "best", "friend", "is", "name"],
  "mission_status": "continue"
}
```

#### Turn 6 (Student says friend name)
```json
{
  "ack": "Nice!",
  "recast": "Your best friend is Sarah!",
  "question": "What does Sarah look like?",
  "suggested_hints": ["She", "is", "has", "hair", "tall"],
  "mission_status": "continue"
}
```

#### Turn 7 (Student describes friend)
```json
{
  "ack": "Great!",
  "recast": "She has curly hair!",
  "question": "Wonderful! You described both of you!",
  "suggested_hints": [],
  "mission_status": "completed"
}
```

---

## 🔍 COMPARISON: V27 vs V28 for Week 3

### Example: Mother Description Mission

#### V27 (OLD - BUG) ❌
```
Q: "Is your mother busy?"
Student: "yes"

V27 Response:
{
  "teacher_ack": "Good!",
  "teacher_recast": "You are busy!",  ❌ WRONG SUBJECT!
  "teacher_question": "Where does your mother work?"
}
```

#### V28 (NEW - FIXED) ✅
```
Q: "Is your mother busy?"
Student: "yes"

V28 Response:
{
  "ack": "Great!",
  "recast": "She is busy!",  ✅ CORRECT SUBJECT!
  "question": "Where does she work?"
}
```

---

## 📚 REFERENCE FILES

### Updated Files in Master Prompt V28:
1. **tutorPrompts.js** (Lines 340-492)
   - New JSON format examples
   - ACK options (3 only)
   - Subject agreement rules
   - RECAST examples

2. **responseParser.js** (Lines 225-370)
   - Format detection (ack/recast/question)
   - Validation rules

3. **responseGuard.js** (Lines 540-580)
   - Subject detection logic
   - Fallback RECAST generation

4. **novaEngine.js** (Lines 270-320)
   - Support both formats (backward compatible)
   - Sanitization for new format

---

## ⚡ QUICK SWITCH GUIDE

For Week 3 AI Tutor (`week_03_real.js`):

### DO THIS ✅
```javascript
{
  "ack": "Nice!",
  "recast": "Your name is [Student's Answer]!",
  "question": "[Next A0 question]",
  "suggested_hints": [...],
  "mission_status": "continue"
}
```

### NOT THIS ❌
```javascript
{
  "teacher_ack": "Good!",
  "teacher_recast": "You [wrong subject]!",
  "teacher_encouragement": "That's nice!",
  "teacher_question": "[Complex question]"
}
```

---

## 🎯 IMPLEMENTATION PRIORITY

For **Week 3**:
1. ✅ Use V28 format (ack/recast/question)
2. ✅ ACK: Nice/Great/Wonderful only
3. ✅ RECAST: ≤ 8 words, correct subject
4. ✅ QUESTION: A0 patterns only
5. ✅ Subject Agreement: Critical for family missions

---

**Status**: ✅ READY FOR WEEK 3 IMPLEMENTATION  
**Next**: Generate content files following this V28 specification

