# 🎯 20 QUESTIONS FIX - SINGLE SOURCE OF TRUTH

**Date:** February 6, 2026  
**Issue:** AI response không đúng template khi student guess  
**Root Cause:** freeTalkModes.js không sử dụng code validation từ FreeTalkTab  

---

## ❌ VẤN ĐỀ:

### Screenshot Evidence:
```
AI: "I'm thinking of someone in the family. They are kind. You can talk to them. Who is it?"
User: "my brothers"
AI: "Round 2/20: Your brothers are kind. They can play with you. What are they?"
```

**Sai:**
1. ❌ Không acknowledge guess ("Yes!" hoặc "No, not brothers")
2. ❌ Template không đúng (thiếu acknowledgment)
3. ❌ Không start NEW ROUND nếu guess đúng
4. ❌ Không có 2 hints mới

---

## 🔍 ROOT CAUSE ANALYSIS:

### FreeTalkTab.jsx:
✅ **ĐÃ CÓ** full validation logic (lines 450-560):
- Detects correct guess
- Detects wrong guess  
- Detects yes/no question
- Detects give up
- Creates `twentyQuestionsValidation` object

### freeTalkModes.js:
❌ **KHÔNG DÙNG** validation object!
- Để AI tự validate → unpredictable
- Không có handler cho `context.twentyQuestionsValidation`

➡️ **Kết quả:** AI tự nghĩ ra response → sai template!

---

## ✅ GIẢI PHÁP:

### Added: 20Q Validation Handler in freeTalkModes.js

**Location:** `src/services/ai_tutor/freeTalkModes.js` lines 113-185

**Code Structure:**
```javascript
if (context.twentyQuestionsValidation && isInGame && !startingNewGame) {
  const val = context.twentyQuestionsValidation;
  
  // Handle 4 types:
  if (val.type === 'correct') {
    // ✅ CORRECT GUESS
    responseText = `Yes! It's ${articlePrefix} ${val.currentSecret}! 🎉 
                    Round ${nextRound}/20: NEW ROUND! 
                    I'm thinking of ${...}. 
                    🔍 ${val.newHints[0]} 🔍 ${val.newHints[1]} 
                    ${...}?`;
  } 
  else if (val.type === 'giveup') {
    // 🏳️ GIVE UP
    responseText = `It was ${val.currentSecret}! Let's try another one! 🎉 ...`;
  } 
  else if (val.type === 'wrong') {
    // ❌ WRONG GUESS
    responseText = `No, not ${val.studentGuess}. Round ${turnCount}/20: Keep asking! Hint: It starts with "${val.hint}".`;
  } 
  else if (val.type === 'yesno') {
    // ❓ YES/NO QUESTION - Let AI answer
    return `... Answer honestly based on secret ...`;
  }
}
```

---

## 📊 DATA FLOW - Fixed:

```
1. User guesses: "my brothers"
   ↓
2. FreeTalkTab.jsx validates:
   currentSecret = "brother"
   cleanedGuess = "brothers"
   isCorrectGuess = TRUE ✅
   Creates twentyQuestionsValidation = {
     type: 'correct',
     currentSecret: 'brother',
     newSecret: 'desk',
     newHints: ['It has 4 legs.', 'You put books on it.'],
     isPerson: true,
     turnCount: 1
   }
   ↓
3. FreeTalkTab passes to novaEngine:
   context: { twentyQuestionsValidation: {...} }
   ↓
4. freeTalkModes.js (NEW LOGIC):
   ✅ Checks context.twentyQuestionsValidation exists
   ✅ Builds response using validation data
   ✅ Tells AI: "Use this EXACT text"
   ↓
5. AI returns:
   "Yes! It's my brother! 🎉 Round 2/20: NEW ROUND! 
    I'm thinking of something in the room. 
    🔍 It has 4 legs. 🔍 You put books on it. 
    What is it?"
```

---

## 🎯 TEMPLATES - Now Correct:

### ✅ CORRECT GUESS (PERSON):
```
"Yes! It's my [person]! 🎉 Round [X]/20: NEW ROUND! I'm thinking of someone in the family. 🔍 [Hint1] 🔍 [Hint2] Who is it?"
```

### ✅ CORRECT GUESS (THING):
```
"Yes! It's a [object]! 🎉 Round [X]/20: NEW ROUND! I'm thinking of something in the room. 🔍 [Hint1] 🔍 [Hint2] What is it?"
```

### ❌ WRONG GUESS:
```
"No, not [guess]. Round [X]/20: Keep asking! Hint: It starts with '[LETTER]'."
```

### ❓ YES/NO ANSWER:
```
"[Yes/No]! [Details]. Round [X]/20: What else?"
```

### 🏳️ GIVE UP:
```
"It was [secret]! Let's try another one! 🎉 Round [X]/20: NEW ROUND! ..."
```

**All templates have:**
- ✅ Round number: "Round X/20"
- ✅ NEW ROUND marker (if correct/giveup)
- ✅ 2 new hints (if correct/giveup)
- ✅ Question prompt: "Who is it?" / "What is it?"

---

## 🎓 SINGLE SOURCE OF TRUTH:

| Component | Role | Responsibility |
|-----------|------|----------------|
| **FreeTalkTab.jsx** | Validation | ✅ ONLY source that validates guess |
| | | ✅ ONLY source that picks new secret |
| | | ✅ ONLY source that generates hints |
| **freeTalkModes.js** | Formatter | ✅ Uses code validation result |
| | | ✅ Formats message with template |
| | | ❌ Does NOT validate or decide |
| **gamePromptBuilder.js** | Template Library | ✅ Documents expected format |
| | | ❌ Not used for runtime validation |

**Result:** No conflicts - each component has ONE clear job!

---

## ✅ VERIFICATION:

### Test Case 1: CORRECT GUESS (Person)
**AI:** "I'm thinking of someone... They are kind..."
**User:** "my brother"
**Expected:**
```
"Yes! It's my brother! 🎉 Round 2/20: NEW ROUND! I'm thinking of something in the room. 🔍 It has 4 legs. 🔍 You sit on it. What is it?"
```
- ✅ Acknowledges guess: "Yes! It's my brother!"
- ✅ Has NEW ROUND marker
- ✅ Has 2 new hints
- ✅ Round incremented

### Test Case 2: WRONG GUESS
**AI:** "I'm thinking of someone... They are kind..."
**User:** "my sister"
**Expected:**
```
"No, not sister. Round 1/20: Keep asking! Hint: It starts with 'B'."
```
- ✅ Says "No, not [guess]"
- ✅ Same round (retry)
- ✅ Gives hint (first letter)

### Test Case 3: YES/NO QUESTION
**AI:** "I'm thinking of something..."
**User:** "Is it big?"
**Expected:**
```
"Yes! It is big. Round 2/20: What else?"
```
- ✅ Answers honestly
- ✅ Round incremented
- ✅ Encourages more questions

---

## 📝 FILES MODIFIED:

1. **freeTalkModes.js** (lines 113-185)
   - Added: `twentyQuestionsValidation` handler
   - Added: Response templates for 4 types (correct, wrong, yesno, giveup)
   - Added: Pronoun logic (person vs thing)

---

## 🔗 RELATED FIXES:

1. **Word Chain** - Fixed earlier (same pattern)
2. **Schema Document** - Created AI_TUTOR_GAME_SCHEMA_FINAL.md
3. **Template Standardization** - All games now follow same pattern

---

**Impact:** 20 Questions game now has consistent, correct templates matching schema  
**Next:** Test Sentence Builder (if needed)
