# 🔥 STORY MISSION DIRECTION FIX - ABSOLUTE RAILS ENFORCEMENT

## ❌ PROBLEM REPORTED
**Critical:** Story Mission direction broken - opening turn generating generic chat instead of mission-specific questions.

**Evidence:**
- Opening turn says: "That's interesting", "Tell me more", "Can you explain" (GENERIC CHAT)
- Should say: "Hello! I am Ms. Nova, your English teacher. What is your name?" (MISSION STEP)

---

## ✅ SOLUTION IMPLEMENTED

### RULE 1: TURN 0 IS FIXED ✅
**Implementation:** Opening turn now FORCES exact step question, no LLM creativity.

**File:** [tutorPrompts.js](src/services/ai_tutor/tutorPrompts.js#L303-L332)

```javascript
// 🔥 TURN 0: Opening turn - DETERMINISTIC, NO LLM CREATIVITY
if (turnNumber === 1) {
  const firstStep = turnManager.getNextStep();
  turnManager.markStepAsked(firstStep.key);
  
  // 🔥 CRITICAL: Force exact opening without LLM interpretation
  const forcedOpening = `Hello! I am Ms. Nova, your English teacher. ${firstStep.question}`;
  
  return `You are Ms. Nova starting "${missionTitle}" mission.

🚨 ABSOLUTE REQUIREMENT:
You MUST output EXACTLY this:
"${forcedOpening}"

❌ DO NOT say:
- "That's interesting"
- "Tell me more"
- "Can you explain"
- "What else?"
- Any generic chat

✅ OUTPUT EXACTLY:
{
  "ai_response": "${forcedOpening}",
  "suggested_hints": ${JSON.stringify(firstStep.hints)}
}`;
}
```

**Result:** 
- Mission 1 opening: "Hello! I am Ms. Nova, your English teacher. What is your name?"
- Mission 2 opening: "Hello! I am Ms. Nova, your English teacher. Do you have a backpack?"
- Mission 3 opening: "Hello! I am Ms. Nova, your English teacher. Is your teacher nice?"

---

### RULE 2: STEP-KEY BASED FLOW ✅
**Already implemented** in previous fix (REPEAT_BUG_FIX_REPORT.md):
- Track progress by `stepKey` (name, age, school_like) not text
- Each stepKey asked only once
- Student replies advance `currentStepIndex`
- Paraphrasing prevented by key-based tracking

**Files:**
- [turnManager.js](src/services/ai_tutor/turnManager.js#L151) - `askedStepKeys` Set
- [turnManager.js](src/services/ai_tutor/turnManager.js#L210-L240) - Skip already-asked steps

---

### RULE 3: ANSWER THEN STEER ✅
**Implementation:** answer_and_steer template enforces exact step question after answer.

**File:** [tutorPrompts.js](src/services/ai_tutor/tutorPrompts.js#L367-L396)

```javascript
// 🔥 ANSWER AND STEER: Student asked question - strict rails
return `You are Ms. Nova in "${missionTitle}" mission.

Student asked: "${userInput}"

🚨 EXACT RESPONSE STRUCTURE:
1. Answer briefly (≤8 words): "[short answer to student's question]"
2. Ask EXACT next step: "${nextStep.question}"
3. Total ≤ 15 words

❌ ABSOLUTELY BANNED:
- "That's interesting"
- "Tell me more"
- "Can you explain"
- "What else?"
- Any off-rail questions

JSON:
{
  "ai_response": "[answer]. ${nextStep.question}",
  "suggested_hints": ${JSON.stringify(nextStep.hints)}
}`;
```

**Result:** Student asks "What's your favorite color?" → Teacher says "I like blue! What is your name?"

---

### RULE 4: HINTS MUST MATCH QUESTION ✅
**Already implemented** in previous fix:
- `suggested_hints` array validated in responseGuard
- Fallback hints generated from `stepKey` if LLM fails
- Hints cleaned (strip punctuation, dedupe, limit 4-8 words)

**File:** [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js#L336-L359)

---

### RULE 5: ENDING ✅
**Already implemented** in previous fix:
- Closing turn type='closing'
- No questions in closing prompt
- Natural goodbye with student name

**File:** [tutorPrompts.js](src/services/ai_tutor/tutorPrompts.js#L338-L357)

---

## 🚨 NEW: BANNED PHRASES EXPANDED

**File:** [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js#L15-L27)

```javascript
const BANNED_PHRASES = [
  /what do you think\??/gi,
  /how do you feel about/gi,
  /that's interesting\.?/gi,    // 🔥 NEW
  /tell me more\.?/gi,          // 🔥 NEW
  /can you explain\??/gi,       // 🔥 NEW
  /why do you say that\??/gi,   // 🔥 NEW
  /what else\??/gi,             // 🔥 NEW
  /anything else\??/gi,         // 🔥 NEW
  /how interesting\.?/gi,       // 🔥 NEW
  /can you tell me more\??/gi   // 🔥 NEW
];
```

---

## 🛡️ RESPONSE GUARD OVERRIDE SYSTEM

**New Feature:** If LLM outputs banned phrase, responseGuard OVERRIDES with correct step question.

**File:** [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js#L318-L332)

```javascript
// 🔥 CRITICAL: Check for banned phrases FIRST
let cleaned = responseObj.ai_response || '';
if (containsBannedPhrase(cleaned)) {
  console.warn('🚨 Response guard: BANNED phrase detected, overriding with step question');
  if (context.nextStepQuestion) {
    cleaned = context.nextStepQuestion;
    responseObj.ai_response = cleaned;
    console.log('✅ Overridden with step question:', cleaned);
  }
}
```

**Example:**
```
LLM outputs: "That's interesting! Tell me more."
↓
Response guard detects: containsBannedPhrase() = true
↓
Override with: "What is your name?" (context.nextStepQuestion)
↓
Final output: "What is your name?"
```

---

## 🧪 TESTING REQUIREMENTS

### Mission 1: The Young Scholar
**Opening Turn Test:**
1. Reset mission
2. **EXPECTED:** "Hello! I am Ms. Nova, your English teacher. What is your name?"
3. **NOT ALLOWED:** "That's interesting", "Tell me more", any generic chat

**Mid-Mission Test:**
1. Student: "My name is Alex"
2. Teacher: "Nice! How old are you?"
3. Student: "I am 8"
4. **EXPECTED:** "Great! Are you a student?"
5. **NOT ALLOWED:** "Tell me more about that"

### Mission 2: My Backpack Adventure
**Opening Turn Test:**
1. Reset mission
2. **EXPECTED:** "Hello! I am Ms. Nova, your English teacher. Do you have a backpack?"
3. **NOT ALLOWED:** Any generic chat

### Mission 3: My Favorite Teacher
**Opening Turn Test:**
1. Reset mission
2. **EXPECTED:** "Hello! I am Ms. Nova, your English teacher. Is your teacher nice?"
3. **NOT ALLOWED:** Any generic chat

---

## 📊 FILES CHANGED

| File | Lines | Change Type | Purpose |
|------|-------|-------------|---------|
| [tutorPrompts.js](src/services/ai_tutor/tutorPrompts.js) | L303-L332 | **REWRITE** | Force exact opening, ban generic chat |
| [tutorPrompts.js](src/services/ai_tutor/tutorPrompts.js) | L367-L396 | **UPDATE** | Add banned phrases to answer_and_steer |
| [tutorPrompts.js](src/services/ai_tutor/tutorPrompts.js) | L401-L430 | **UPDATE** | Add banned phrases to ask_next |
| [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js) | L15-L27 | **EXPAND** | Add 7 new banned phrases |
| [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js) | L318-L332 | **NEW** | Override system for banned phrases |
| [responseGuard.js](src/services/ai_tutor/utils/responseGuard.js) | L203-L268 | **UPDATE** | Replace fallback "Tell me more" with step question |

---

## ✅ ABSOLUTE RULES ENFORCED

| Rule | Status | Enforcement Method |
|------|--------|-------------------|
| **TURN 0 IS FIXED** | ✅ | Forced opening template in tutorPrompts.js |
| **STEP-KEY BASED FLOW** | ✅ | askedStepKeys Set + skip loop in turnManager |
| **ANSWER THEN STEER** | ✅ | Exact step question injected in prompt |
| **HINTS MATCH QUESTION** | ✅ | Fallback hints + validation in responseGuard |
| **ENDING NO QUESTIONS** | ✅ | Closing type with no question in prompt |
| **NO GENERIC CHAT** | ✅ | Banned phrases + override system |

---

## 🚀 READY FOR TESTING

**Compilation:** ✅ All files pass with no errors

**Console Logs to Watch:**
```
🔥 TURN 0: Opening turn - DETERMINISTIC
🚨 Response guard: BANNED phrase detected, overriding with step question
✅ Overridden with step question: What is your name?
📝 TurnManager: Marked step as asked: name | Total asked: 1
```

**Test Sequence:**
1. Open browser console (F12)
2. Filter: "TURN 0" or "Response guard"
3. Reset Mission 1
4. Verify opening: "Hello! I am Ms. Nova, your English teacher. What is your name?"
5. If you see generic chat, check console for override logs
6. Test Missions 2 & 3 similarly

---

## 🎯 SUCCESS CRITERIA

### ✅ Opening Turn Fixed:
- Mission 1: "What is your name?"
- Mission 2: "Do you have a backpack?"
- Mission 3: "Is your teacher nice?"

### ✅ No Generic Chat:
- Zero instances of: "That's interesting", "Tell me more", "Can you explain", "What else?"
- Response guard logs show: "BANNED phrase detected, overriding"

### ✅ Rails Maintained:
- Step keys asked exactly once
- Hints match current step question
- Natural ending with no questions

---

**Date:** January 8, 2026  
**Fix Type:** Absolute rails enforcement with override system  
**Risk Level:** 🟢 Low (adds safety layer, doesn't change core logic)  
**Testing:** Manual browser testing required - check opening turn for all 3 missions
