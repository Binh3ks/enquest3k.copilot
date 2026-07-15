# 🔍 WEEK 2 - COMPREHENSIVE AI TUTOR AUDIT - FEB 2, 2026

## 📋 EXECUTIVE SUMMARY

**Audit Scope:** Full review of Week 2 AI Tutor (Golden Standard)
**Date:** February 2, 2026
**Auditor:** GitHub Copilot
**User Request:** "hãy rà soát toàn bộ AI Tutor của tuần 2 xem có lỗi nào tương tự như vậy nữa không và đề xuất để tôi duyệt"

**Reference Issue:** Roleplay responses making assumptions and not following proper ACK + RECAST pattern
- Example: Student said "I have a brother" → AI responded "Your brother is happy" (assumed feelings)
- Example: Student said "he works in an office" → AI parroted "He works in an office. Is he happy?" (no value added)

---

## ✅ SECTIONS REVIEWED

### 1. **Metadata & Learning Outcomes** ✅ GOOD
**File:** `src/data/weeks/week_02_real.js` (Lines 1-50)

**Status:** ✅ NO ISSUES

**Quality:**
- Clear documentation header
- Proper metadata (week_id, phase, block, unit)
- Learning outcome well-defined
- Grammar focus clear (Possessive Adjectives)
- 5 grammar examples provided

**Examples:**
```javascript
grammar_examples: [
  "My mother is kind.",
  "My father is strong.",
  "My brother is funny.",
  "My sister is smart.",
  "My family is happy."
]
```

**Recommendation:** KEEP AS IS ✅

---

### 2. **Target Vocabulary** ✅ GOOD
**File:** `src/data/weeks/week_02_real.js` (Lines 50-130)

**Status:** ✅ NO ISSUES

**Quality:**
- 10 target words (consistent with other weeks)
- Complete pronunciation guides
- Both Vietnamese and English definitions
- Example sentences for each word
- Syllabus context provided

**Sample Entry:**
```javascript
{
  word: "mother",
  pronunciation: "/ˈmʌðər/",
  definition_vi: "Mẹ",
  definition_en: "A female parent.",
  example: "My mother is kind.",
  syllabus_context: "Family members"
}
```

**Recommendation:** KEEP AS IS ✅

---

### 3. **Story Missions** ⚠️ MINOR ISSUES FOUND

#### **Mission 1: Meet My Family** ⚠️ NEEDS REVIEW

**File:** `src/data/weeks/week_02_real.js` (Lines 130-240)

**Issue 1: Potential Assumption Pattern in phase_questions**

**Problematic Questions Found:**
```javascript
// Phase: family_details (Lines 199-206)
"(After mother's activities) Great! She {student_answer}! 🍳 
What about your father? What does your father do? 
Say: My father works OR My father plays with me OR My father helps me"
```

**Analysis:**
- Uses `{student_answer}` placeholder correctly ✅
- But if student says "cooks" → AI will say "She cooks!" ✅
- HOWEVER, if student gives short answer like "my mother" → AI might assume activity

**Risk Level:** 🟡 MEDIUM (depends on AI interpretation)

**Same Pattern Found in:**
1. Line 187: "(After describing mother) Wonderful! Your mother is {student_answer}!"
2. Line 188: "(After describing father) Excellent! Your father is {student_answer}!"
3. Line 189: "(After sibling answer) I see!"
4. Line 190: "(After sibling description) Nice! {student_answer}!"

**Issue 2: "What are they like?" - Ambiguous Question**

Line 189:
```javascript
"(After sibling answer) I see! Now, tell me about your brother or sister! 
What are they like? Say: My brother is funny OR My sister is smart"
```

**Problem:** 
- Student might say "I have a brother" 
- AI asks "What are they like?" (plural "they" when student mentioned one sibling)
- Should be: "What is your brother like?" or "What is he like?"

**Risk Level:** 🟡 MEDIUM (grammar inconsistency)

**Issue 3: Assumption Risk in "She {student_answer}"**

Lines 200-206 Pattern:
```javascript
"Great! She {student_answer}! 🍳 What about your father?"
"Excellent! He {student_answer}! 💼 Do you help your family?"
"Wonderful! You {student_answer}! 👏 What do you do together?"
```

**Problem:**
- If student says incomplete answer: "cooks" → "She cooks!" ✅ OK
- If student says: "my mother" → "She my mother!" ❌ GRAMMATICALLY WRONG
- If student says: "she cooks" → "She she cooks!" ❌ DUPLICATE

**Risk Level:** 🔴 HIGH (potential grammar errors)

---

#### **Mission 2: Family Photos** ⚠️ NEEDS REVIEW

**File:** `src/data/weeks/week_02_real.js` (Lines 240-780)

**Issue: Inconsistent "I see!" Acknowledgments**

Found multiple instances:
- Line 728: "(After student says father) Correct! Your father! 💪"
- Line 729: "(After describing father) Great! Your father is {student_answer}!"
- Line 744: "(After student says mother) Yes! Your mother! ❤️"

**Problem:** Same pattern as Mission 1
- "Your father is {student_answer}" might produce "Your father is strong!" ✅
- But could also produce "Your father is father!" if student says "father"

**Risk Level:** 🟡 MEDIUM

---

#### **Mission 3: Mixed Up Family** ✅ EXCELLENT

**File:** `src/data/weeks/week_02_real.js` (Lines 780-1270)

**Status:** ✅ NO ISSUES FOUND

**Quality:** 
- Very clear response format defined
- Strict STEP 1 + STEP 2 pattern enforced
- No assumption risk (grammar correction game)
- Immediate feedback pattern perfect

**Example Template:**
```javascript
mission_context: `
RESPONSE FORMAT - MUST FOLLOW:
STEP 1: Acknowledge fix: "Yes! Fixed! [CORRECT SENTENCE]! ✅"
STEP 2: Give next error: "🤔 I said: [WRONG SENTENCE]. Can you fix this?"

FORBIDDEN:
❌ "Good job!" without giving next sentence
❌ Explaining grammar rules (game only!)
❌ Asking "Do you understand?"
❌ Breaking character
`
```

**Recommendation:** USE THIS AS MODEL FOR OTHER MISSIONS ⭐

---

### 4. **Roleplay Scenarios** ✅ FIXED

**File:** `src/data/weeks/week_02_real.js` (Lines 1320-1449)

**Status:** ✅ ALREADY FIXED (in previous session)

**Quality:**
- All 3 scenarios now have explicit RESPONSE PATTERN
- Clear ACKNOWLEDGE → EXPAND → ASK NEW structure
- Strong warnings against assumptions
- Good examples of WRONG vs RIGHT

**Example (Family Dinner Time):**
```javascript
guide_rules: `Be polite and curious dinner guest. 

🚨 RESPONSE PATTERN (MANDATORY):
1. ACKNOWLEDGE BRIEFLY: "Good!" or "I see!" or "Nice!"
2. RECAST/EXPAND: Add ONE more detail about what they said
3. ASK NEW QUESTION: Must be DIFFERENT from previous questions

EXAMPLES:
- Student: "My mother" → You: "Good! Your mother cooks. What does your father do?"
- Student: "he works" → You: "I see! He works. Where does he work?"

🚨 NEVER DO THIS:
❌ DON'T repeat their answer as statement
❌ DON'T make assumptions
❌ DON'T ask about the SAME thing twice
`
```

**Recommendation:** KEEP AS IS ✅

---

### 5. **FreeTalk Knowledge Base** ✅ GOOD

**File:** `src/data/weeks/week_02_real.js` (Lines 1270-1320)

**Status:** ✅ NO ISSUES

**Quality:**
- Clear knowledge base facts
- Example opening questions provided
- Starter prompts (game, help, roleplay, ask)
- Legacy bonus roleplay for compatibility

**Recommendation:** KEEP AS IS ✅

---

## 🔥 CRITICAL ISSUES SUMMARY

### **Issue #1: {student_answer} Placeholder Risk** 🔴 HIGH PRIORITY

**Location:** Story Missions (Mission 1 & 2)

**Problem:** 
Pattern like "She {student_answer}!" can produce grammatically incorrect responses:
- Input: "my mother" → Output: "She my mother!" ❌
- Input: "she cooks" → Output: "She she cooks!" ❌

**Affected Lines:**
- Mission 1: Lines 187, 188, 190, 200-206, 214-219
- Mission 2: Lines 728-729, 744-745

**Root Cause:**
AI is told to use `{student_answer}` but not told to:
1. Extract the VERB or ADJECTIVE only
2. Avoid repeating pronouns/nouns

**Proposed Fix:**

**Option A: Extract Keywords (Recommended)**
```javascript
// BEFORE:
"(After mother's activities) Great! She {student_answer}! 🍳"

// AFTER:
"(After mother's activities) Great! She {verb_from_answer}! 🍳 
[SYSTEM: Extract ONLY the verb from student answer. 
If student says 'my mother cooks' → extract 'cooks'
If student says 'cooks' → use 'cooks'
If student says 'she cooks' → extract 'cooks']"
```

**Option B: Rewrite to Avoid Placeholder (Safest)**
```javascript
// BEFORE:
"(After mother's activities) Great! She {student_answer}! 🍳 What about your father?"

// AFTER:
"(After mother's activities) Good! Your mother helps at home! 🍳 What about your father?"
```

**Option C: Add Validation Instruction (Simplest)**
```javascript
mission_context: `
🚨 USING {student_answer} PLACEHOLDER:
- EXTRACT only the key word (verb or adjective)
- NEVER repeat pronouns (I, you, he, she)
- NEVER repeat nouns (mother, father)
- Example: Student says "my mother cooks" → You say "She cooks!" (extract "cooks" only)
- Example: Student says "cooks" → You say "She cooks!" (add subject)
- Example: Student says "she cooks" → You say "She cooks!" (remove duplicate "she")
`
```

**Recommendation:** Use **Option C** (validation instruction) + **Option B** (rewrite critical ones)

---

### **Issue #2: Ambiguous Pronoun "they" for Single Sibling** 🟡 MEDIUM PRIORITY

**Location:** Mission 1, Line 189

**Problem:**
```javascript
"(After sibling answer) I see! Now, tell me about your brother or sister! 
What are they like?"
```

Student says "I have a brother" → AI asks "What are they like?" (incorrect plural)

**Proposed Fix:**
```javascript
"(After sibling answer) I see! Now, tell me about your brother or sister! 
What is your brother like? What is your sister like?"
```

OR dynamically:
```javascript
"(After sibling answer) I see! 
[SYSTEM: If student mentioned brother, ask 'What is your brother like?'
If student mentioned sister, ask 'What is your sister like?'
If both, ask 'What are they like?']"
```

**Recommendation:** Use dynamic conditional instruction

---

### **Issue #3: Potential Short Answer Assumptions** 🟡 MEDIUM PRIORITY

**Location:** All Story Missions using `{student_answer}`

**Problem:**
Student gives SHORT answer → AI might not know how to handle it

Examples:
- Question: "What is your mother like?"
- Student: "kind" (just one word)
- AI might say: "Your mother is kind!" ✅ (correct guess)
- OR "kind! Great!" ❌ (incomplete)

**Proposed Fix:**
Add to ALL mission_context:
```javascript
🚨 HANDLING SHORT ANSWERS:
- If student gives ONE WORD (adjective or verb), RECAST as full sentence
- Example: Student: "kind" → You: "Your mother is kind!" (add subject + verb)
- Example: Student: "cooks" → You: "Your mother cooks!" (add subject)
- NEVER just repeat the word back: "kind!" ❌
- ALWAYS make it a complete sentence: "Your mother is kind!" ✅
```

**Recommendation:** Add this instruction to mission_context for Mission 1 & 2

---

## 📊 RISK ASSESSMENT MATRIX

| Issue | Location | Severity | Impact | Likelihood | Priority |
|-------|----------|----------|---------|------------|----------|
| {student_answer} placeholder grammar errors | Mission 1 & 2 | 🔴 HIGH | Grammatically incorrect responses | HIGH | P0 |
| Ambiguous "they" pronoun | Mission 1, Line 189 | 🟡 MEDIUM | Confusing for students | MEDIUM | P1 |
| Short answer handling | All missions | 🟡 MEDIUM | Incomplete responses | MEDIUM | P1 |
| Roleplay assumptions | ALL FIXED ✅ | ✅ FIXED | N/A | N/A | DONE |

---

## ✅ WHAT'S ALREADY EXCELLENT (DON'T CHANGE)

### **Mission 3: Mixed Up Family** ⭐ GOLD STANDARD
- **Why:** Crystal clear response format (STEP 1 + STEP 2)
- **Why:** No assumption risk (grammar correction game)
- **Why:** Immediate feedback loop perfect
- **Recommendation:** Use as template for future missions

### **Roleplay Scenarios** ⭐ ALREADY FIXED
- **Why:** Explicit ACK + EXPAND + ASK NEW pattern
- **Why:** Clear examples of WRONG vs RIGHT
- **Why:** Strong warnings against assumptions
- **Recommendation:** Keep current implementation

### **Vocabulary & Grammar** ⭐ EXCELLENT
- **Why:** Complete pronunciation, definitions, examples
- **Why:** Clear grammar pattern and 5 examples
- **Recommendation:** Keep as golden standard

---

## 🎯 PROPOSED FIXES - FOR APPROVAL

### **Priority 0 (Critical) - Fix Immediately**

#### **Fix #1: Add Placeholder Validation to Mission 1**

**File:** `src/data/weeks/week_02_real.js` 
**Location:** Mission 1 mission_context (Line ~141)

**Add this section:**
```javascript
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
```

---

#### **Fix #2: Add Placeholder Validation to Mission 2**

**File:** `src/data/weeks/week_02_real.js`
**Location:** Mission 2 mission_context (Line ~248)

**Add same validation section as Fix #1**

---

#### **Fix #3: Add Short Answer Handling to Mission 1**

**File:** `src/data/weeks/week_02_real.js`
**Location:** Mission 1 mission_context (after placeholder validation)

**Add this section:**
```javascript
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
```

---

#### **Fix #4: Add Short Answer Handling to Mission 2**

**File:** `src/data/weeks/week_02_real.js`
**Location:** Mission 2 mission_context (after placeholder validation)

**Add same short answer handling as Fix #3**

---

### **Priority 1 (Important) - Fix Soon**

#### **Fix #5: Correct Ambiguous "they" Pronoun**

**File:** `src/data/weeks/week_02_real.js`
**Location:** Mission 1, Line 189

**Current:**
```javascript
"(After sibling answer) I see! Now, tell me about your brother or sister! 
What are they like? Say: My brother is funny OR My sister is smart OR My brother is kind"
```

**Proposed Change:**
```javascript
"(After sibling answer) I see! Tell me about your brother or sister! 
What is your brother like? What is your sister like? 
Say: My brother is funny OR My sister is smart OR My brother is kind

[SYSTEM: If student mentioned 'brother', focus on brother question.
If student mentioned 'sister', focus on sister question.
If student mentioned 'both' or 'brother and sister', use 'they'.]"
```

---

### **Priority 2 (Nice to Have) - Consider for Next Update**

#### **Enhancement #1: Add Response Quality Check**

Add to mission_context for ALL missions:
```javascript
🚨 RESPONSE QUALITY CHECKLIST:
Before sending your response, verify:
✅ Is it a complete sentence? (not just a word)
✅ Does it acknowledge student's answer? (Good!, Great!, Nice!)
✅ Does it ask a NEW question? (not repeating previous question)
✅ Does it give OR options? (choice A or choice B?)
✅ Does it use correct grammar? (no duplicates, proper pronouns)

If any ❌, rewrite your response before sending!
```

---

#### **Enhancement #2: Add Debug Mode Instructions**

For testing purposes:
```javascript
🧪 DEBUG MODE (for testing only):
When testing, AI should log:
- Student raw input: "{raw_input}"
- Extracted key word: "{extracted_word}"
- Generated response: "{response}"
- Used placeholder?: Yes/No
- Complete sentence?: Yes/No
```

---

## 📝 SUMMARY OF RECOMMENDED ACTIONS

### **Immediate Actions (This Week)**
1. ✅ **Add placeholder validation** to Mission 1 & 2 mission_context (Fix #1, #2)
2. ✅ **Add short answer handling** to Mission 1 & 2 mission_context (Fix #3, #4)
3. ✅ **Fix ambiguous "they" pronoun** in Mission 1, Line 189 (Fix #5)

**Estimated Time:** 30 minutes
**Risk:** LOW (adding clarification, not changing structure)
**Impact:** HIGH (prevents grammar errors in AI responses)

---

### **Testing Required After Fix**
1. **Test Mission 1** with various student answer types:
   - Full sentence: "My mother is kind"
   - Verb only: "cooks"
   - Adjective only: "kind"
   - With pronoun: "she cooks"
   - With repetition: "my mother cooks"

2. **Test Mission 2** with same variations

3. **Verify AI responses are:**
   - Complete sentences ✅
   - No duplicate pronouns ✅
   - No grammar errors ✅
   - Acknowledge student properly ✅

---

### **Future Enhancements (Next Sprint)**
1. ⏳ Add response quality checklist (Enhancement #1)
2. ⏳ Consider debug mode for testing (Enhancement #2)
3. ⏳ Apply same patterns to Week 3-7 missions

---

## 🎯 DECISION REQUIRED

**Option A: Fix Critical Issues Only (P0)**
- Apply Fix #1, #2 (placeholder validation)
- Apply Fix #3, #4 (short answer handling)
- Time: 20 minutes
- Risk: VERY LOW

**Option B: Fix All Priority Issues (P0 + P1)**
- Apply Fix #1, #2, #3, #4 (P0)
- Apply Fix #5 (ambiguous pronoun)
- Time: 30 minutes
- Risk: LOW

**Option C: Full Enhancement (P0 + P1 + P2)**
- Apply all fixes
- Add enhancements #1, #2
- Time: 45 minutes
- Risk: LOW-MEDIUM

---

## ✅ MY RECOMMENDATION

**Choose Option B: Fix All Priority Issues (P0 + P1)**

**Rationale:**
1. Week 2 is "Golden Standard" - should be flawless
2. Fixes are low-risk (adding clarification, not changing logic)
3. Will serve as template for Week 3-7
4. Prevents grammar errors that confuse students
5. Total time investment: 30 minutes
6. High impact on teaching quality

**Implementation Order:**
1. Add placeholder validation to Mission 1 & 2
2. Add short answer handling to Mission 1 & 2
3. Fix ambiguous "they" pronoun
4. Test with sample conversations
5. Apply same patterns to other weeks

---

## 📊 QUALITY COMPARISON

### **Before Audit:**
- Roleplay: ❌ Made assumptions, parroted responses
- Missions: ⚠️ Potential grammar errors with placeholders
- Overall: 🟡 Good but needs polish

### **After Fixes (Proposed):**
- Roleplay: ✅ Clear patterns, no assumptions (ALREADY FIXED)
- Missions: ✅ Safe placeholder handling, complete sentences
- Overall: ✅ Excellent - true "Golden Standard"

---

**Awaiting your approval to proceed with fixes! 🚀**
