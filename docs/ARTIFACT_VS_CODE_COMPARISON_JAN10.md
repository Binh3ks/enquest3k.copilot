# 🔄 ARTIFACT vs CODE COMPARISON - January 10, 2026

## 🐛 CRITICAL BUG FIXED
**Issue**: `ReferenceError: requestBody is not defined` at aiRouter.js:830  
**Impact**: Groq 400 errors every request → Always falls back to hardcoded responses  
**Status**: ✅ FIXED - Extracted requestBody variable for debugging  
**Test**: Refresh browser, should now see detailed Groq 400 error data

---

## 📊 MASTER ARTIFACT VS CURRENT CODE

### **PHILOSOPHY COMPARISON**

| Aspect | New Artifact (v5.0) | Current Code | Status |
|--------|---------------------|--------------|---------|
| **Architecture** | "Objective-Driven" (Goals, not Scripts) | "Step-Driven" (Hardcoded questions) | ❌ NEEDS UPGRADE |
| **Data Model** | `objectives: [{ id, goal, context }]` | `steps: [{ key, question, hints }]` | ❌ WRONG MODEL |
| **AI Response** | Natural ACK + RECAST + Question | Forced structure via responseGuard | ⚠️ RIGID |
| **Student Questions** | "Parking" logic (Answer → Return) | Limited support | ⚠️ PARTIAL |
| **Termination** | 15-turn hard cap | Soft 15-20 turns | ⚠️ INCOMPLETE |

---

## 🔍 DETAILED GAP ANALYSIS

### **1. DATA STRUCTURE** ❌ CRITICAL GAP

#### Current Code (`week1_first_day.js`):
```javascript
{
  steps: [
    { 
      key: "name", 
      question: "What is your name?",  // ❌ HARDCODED STRING
      hints: ["My", "name", "is", "I", "am"]
    }
  ]
}
```

#### New Artifact Requirement:
```javascript
{
  objectives: [
    { 
      id: "greet",
      goal: "Greeting & Name",  // ✅ GOAL, not script
      context: "Introduce self as Ms. Nova."
    }
  ]
}
```

**Why This Matters:**
- **Current**: AI is told "Ask this exact question" → Feels robotic
- **Artifact**: AI is told "Achieve this goal" → Sounds natural
- **Impact**: Current code forces responseGuard to hardcode ACK/RECAST when AI fails

---

### **2. TURNMANAGER LOGIC** ⚠️ INCOMPLETE

#### Current Implementation:
```javascript
// turnManager.js - Line 267
if (isStudentQuestion) {
  // 👉 Student asked → Keep stepIndex same
  console.log('📌 TurnManager: Student asked Q');
  return nextStep;  // Return to same objective
}
```

✅ **Good**: Basic "parking" logic exists  
❌ **Missing**: No distinction between Answer vs Question in prompt  
❌ **Missing**: No 15-turn hard cap enforcement

#### Artifact Requirement:
```javascript
// LAW 4: THE 15-TURN CAP
if (turnCount >= 15) {
  currentObjectiveIndex = objectives.findIndex(o => o.id === 'goodbye');
  console.log('🚨 Hard cap reached - forcing goodbye');
}
```

---

### **3. AI PROMPT STRUCTURE** ❌ CRITICAL GAP

#### Current Prompt (`tutorPrompts.js` - Line 290+):
```javascript
const prompt = `
You are Ms. Nova. The student is at step ${stepKey}.
Ask them: "${canonicalQuestion}"  // ❌ TELLING AI WHAT TO SAY

Response format:
{
  "acknowledgment": "...",
  "recast": "...",
  "main_response": "...",
  "hints": [...]
}
`;
```

**Problem**: AI is given the EXACT question to ask → No flexibility → Sounds scripted

#### Artifact Requirement:
```javascript
const prompt = `
CURRENT OBJECTIVE: "${objective.goal}" (${objective.context})
USER STATUS: ${userStatus}  // "answered" or "questioned"

INSTRUCTIONS:
1. IF User Answered: ACK → Recast → Ask about Current Objective
2. IF User Asked: Answer briefly → Bridge → Ask Current Objective

OUTPUT JSON:
{
  "ack": "Great!",
  "recast": "Yes, you are a student.",
  "bridge": "",  // Only if student asked
  "question": "Do you like your school?",  // ✅ AI DECIDES HOW TO ASK
  "hints": ["I like...", "school", "yes/no"]  // ✅ AI GENERATES MATCHING HINTS
}
`;
```

**Key Difference**: 
- **Current**: "Say this question" → Robot
- **Artifact**: "Achieve this goal" → Human

---

### **4. RESPONSE GUARD** ⚠️ TOO STRICT

#### Current Behavior (From Console Logs):
```
⚠️ AI missing ACK, using fallback: Great!
⚠️ AI missing RECAST, using context-aware fallback: Thank you for telling me!
🔒 Forced canonical: stepKey=student | question="Are you a student?"
```

**Why This Happens:**
1. Groq fails (400 error) → Falls back to hardcoded response
2. Hardcoded response doesn't have ACK/RECAST structure
3. ResponseGuard forces "Great! Thank you for telling me! Are you a student?"

**Artifact Expectation:**
- AI **always** generates natural ACK + RECAST + Question
- ResponseGuard only validates **grammar** and **talk ratio**, NOT structure

---

### **5. STUDENT QUESTION HANDLING** ⚠️ PARTIAL

#### Current Implementation:
```javascript
// turnManager.js - Line 189
isStudentQuestion(userMessage, chatHistory) {
  const questionWords = ['what', 'why', 'how', 'who', 'when', 'where'];
  const hasQuestionWord = questionWords.some(w => 
    userMessage.toLowerCase().includes(w)
  );
  const endsWithQuestionMark = userMessage.trim().endsWith('?');
  
  return hasQuestionWord || endsWithQuestionMark;
}
```

✅ **Good**: Detects student questions  
❌ **Missing**: No "Bridge" instruction in AI prompt  
❌ **Missing**: TurnManager doesn't tell AI "Student asked, use bridge"

#### Artifact Requirement:
```javascript
// In prompt builder:
if (turnManager.isStudentQuestion(userMessage)) {
  instructions = `
  The student asked you a question: "${userMessage}"
  
  1. Answer their question BRIEFLY (1-2 sentences)
  2. Use a BRIDGE: "By the way...", "So...", "Now..."
  3. Ask about Current Objective: "${objective.goal}"
  `;
}
```

---

## 🎯 UPGRADE PRIORITY LIST

### **PHASE 1: CRITICAL FIXES** 🔴

#### Fix 1.1: Test Groq After Bug Fix (5 mins)
```bash
# Refresh browser, check if Groq 400 errors now show detailed debug info
# Expected: "🔍 Groq 400 Debug: { model, messagesCount, systemPromptLength, errorData }"
```

#### Fix 1.2: Change Data Model (30 mins)
**File**: `src/data/syllabus/week1_objectives.js` (NEW)

```javascript
export const week1Objectives = {
  id: 1,
  topic: "First Day at School",
  constraints: {
    vocabulary: ["teacher", "student", "book", "pen", "hello", "school", "class"],
    grammar: ["My name is...", "I am...", "It is a..."],
    tone: "warm, encouraging, patient"
  },
  objectives: [
    { 
      id: "greet", 
      goal: "Greeting & Name", 
      context: "Introduce yourself as Ms. Nova and ask student's name." 
    },
    { 
      id: "age", 
      goal: "Ask Student Age", 
      context: "Natural follow-up to learn more about them." 
    },
    { 
      id: "role", 
      goal: "Confirm Student Role", 
      context: "Check if they are a student." 
    },
    { 
      id: "school_name", 
      goal: "Ask School Name", 
      context: "Where do you study?" 
    },
    { 
      id: "grade", 
      goal: "Ask Grade Level", 
      context: "What grade are you in?" 
    },
    { 
      id: "feeling", 
      goal: "Check School Feelings", 
      context: "Do you like school?" 
    },
    { 
      id: "friends", 
      goal: "Ask About Friends", 
      context: "Do you have friends at school?" 
    },
    { 
      id: "teacher", 
      goal: "Ask About Teacher", 
      context: "Who is your teacher?" 
    },
    { 
      id: "favorite_subject", 
      goal: "Ask Favorite Subject", 
      context: "What do you like to learn?" 
    },
    { 
      id: "goodbye", 
      goal: "End Conversation", 
      type: "termination",
      context: "Say goodbye warmly and praise the student." 
    }
  ]
};
```

#### Fix 1.3: Upgrade TurnManager (1 hour)
**File**: `src/services/ai_tutor/turnManager.js`

**Changes Needed:**
1. Rename `stepIndex` → `currentObjectiveIndex`
2. Add `getUserStatus(userMessage)` → Returns "answered" or "questioned"
3. Add `getNextObjective()` → Returns `{ id, goal, context }`
4. Add hard cap: `if (turnCount >= 15) force goodbye`

**Example Code:**
```javascript
class TurnManager {
  constructor(missionData) {
    this.objectives = missionData.objectives;  // ✅ NEW
    this.currentObjectiveIndex = 0;
    this.turnCount = 0;
    this.completedObjectives = [];
  }

  getUserStatus(userMessage, chatHistory) {
    // Check if student's message is answering previous question
    // or asking a new question
    if (this.isStudentQuestion(userMessage)) {
      return 'questioned';  // Student asked → Parking mode
    }
    return 'answered';  // Student replied → Move forward
  }

  processUserTurn(userMessage, chatHistory) {
    this.turnCount++;
    
    // LAW 4: 15-TURN HARD CAP
    if (this.turnCount >= 15) {
      console.log('🚨 Hard cap reached - forcing goodbye');
      this.currentObjectiveIndex = this.objectives.findIndex(o => o.id === 'goodbye');
      return this.objectives[this.currentObjectiveIndex];
    }

    const userStatus = this.getUserStatus(userMessage, chatHistory);
    
    if (userStatus === 'answered') {
      // Move to next objective
      if (this.currentObjectiveIndex < this.objectives.length - 1) {
        this.currentObjectiveIndex++;
      }
    }
    // If 'questioned', keep same objective (parking)

    return this.objectives[this.currentObjectiveIndex];
  }
}
```

#### Fix 1.4: Upgrade AI Prompt (1 hour)
**File**: `src/services/ai_tutor/tutorPrompts.js`

**Function**: `buildStoryMissionPrompt()`

**Changes:**
```javascript
function buildStoryMissionPrompt(context, userInput, options) {
  const { objective, userStatus } = options;  // ✅ NEW
  const { vocabulary, grammar } = context.syllabus.constraints;

  let instructions = '';
  
  if (userStatus === 'answered') {
    instructions = `
The student just answered your previous question.

YOUR TASK:
1. Acknowledge (ACK): Give brief praise ("Great!", "I see!", "Wow!")
2. Recast: Repeat what they said with better grammar (Implicit Feedback)
3. Question: Ask about Current Objective: "${objective.goal}"
   Context: ${objective.context}

IMPORTANT: Your question must be simple (A0 level) and use ONLY vocabulary from this list:
${vocabulary.join(', ')}
    `;
  } else if (userStatus === 'questioned') {
    instructions = `
The student asked YOU a question: "${userInput}"

YOUR TASK:
1. Answer: Respond to their question BRIEFLY (1-2 sentences max)
2. Bridge: Use a transition like "By the way...", "So...", "Now let's talk about..."
3. Question: Guide back to Current Objective: "${objective.goal}"
   Context: ${objective.context}

IMPORTANT: Keep your answer short. The focus is bringing them back to the lesson.
    `;
  }

  const systemPrompt = `
ROLE: You are Ms. Nova, a warm and encouraging ESL teacher for young students (A0-A1 level).

MISSION CONTEXT:
- Topic: First Day at School
- Current Objective: "${objective.goal}"
- Vocabulary Pool: ${vocabulary.join(', ')}
- Grammar Allowed: ${grammar.join(', ')}

USER STATUS: ${userStatus}

${instructions}

OUTPUT FORMAT (JSON ONLY):
{
  "ack": "Great job!" or "",
  "recast": "Yes, you are a student." or "",
  "bridge": "By the way..." or "",
  "question": "Your natural-sounding question here?",
  "hints": ["word1", "word2", "word3"]
}

RULES:
- If User Answered: Fill "ack" and "recast", leave "bridge" empty
- If User Asked: Fill "bridge", leave "ack" and "recast" empty
- ALWAYS generate "hints" that match your "question" exactly
- Keep everything simple (A0 level)
- Be warm and encouraging
  `;

  return { systemPrompt, userMessage: userInput };
}
```

---

### **PHASE 2: ENHANCED UX** 🟡

#### Fix 2.1: Remove ResponseGuard Hardcoding (30 mins)
**File**: `src/services/ai_tutor/responseGuard.js`

**Current Problem** (Lines 597, 612, 618):
```javascript
// ❌ TOO AGGRESSIVE
if (!ack || ack === '(none)') {
  ack = 'Great!';  // HARDCODED
}
if (!recast || recast === '(none)') {
  recast = 'Thank you for telling me!';  // HARDCODED
}
if (!question) {
  question = canonicalQuestion;  // FORCES SCRIPT
}
```

**Solution**: Only guard **grammar** and **talk ratio**, NOT structure
```javascript
// ✅ TRUST AI, ONLY VALIDATE
function guardResponseObject(response, context) {
  const { ack, recast, bridge, question, hints } = response;

  // Only check if response is missing entirely
  if (!question || question.trim() === '') {
    console.error('❌ AI failed to generate question - using fallback');
    return getFallbackResponse(context);
  }

  // Validate grammar (existing logic)
  if (!isGrammarValid(question, context.weekId)) {
    console.warn('⚠️ Grammar violation detected, regenerating...');
    // Force regeneration, don't hardcode
    throw new Error('GRAMMAR_VIOLATION');
  }

  // Return as-is (trust AI)
  return { ack, recast, bridge, question, hints };
}
```

#### Fix 2.2: Add 15-Turn Warning UI (15 mins)
**File**: `src/components/AI_Tutor/StoryMissionTab.jsx`

**Add visual indicator:**
```javascript
{turnCount >= 13 && (
  <div className="turn-warning">
    ⏰ {15 - turnCount} turns remaining
  </div>
)}
```

---

## 🎬 TESTING CHECKLIST

After implementing Phase 1 fixes:

### Test 1: Natural Conversation ✅
1. Start Mission 1
2. **Expected**: AI says "Hello! I am Ms. Nova, your English teacher. What is your name?" (Natural, not hardcoded)
3. Answer: "Binh"
4. **Expected**: AI says something like "Nice to meet you, Binh! How old are you?" (Varies each time)

### Test 2: Student Question (Parking) ✅
1. During mission, type: "What is your favorite color?"
2. **Expected**: 
   - AI answers: "I like blue! By the way, what grade are you in?"
   - TurnManager keeps same objective
   - Console shows: `📌 Parking: Student asked question`

### Test 3: Hard Cap ✅
1. Continue conversation past 15 turns
2. **Expected**:
   - Console shows: `🚨 Hard cap reached - forcing goodbye`
   - AI says goodbye regardless of progress
   - Input disabled

### Test 4: Groq Now Works ✅
1. Send a message
2. **Expected**:
   - Console shows: `✅ Groq succeeded with valid grammar + talk ratio in 450ms`
   - NO fallback responses
   - Natural conversation

---

## 📊 COMPARISON SUMMARY

| Feature | Current Code | New Artifact | Gap Size |
|---------|--------------|--------------|----------|
| **Data Model** | Scripted steps | Goal-driven objectives | 🔴 LARGE |
| **AI Prompt** | "Say this question" | "Achieve this goal" | 🔴 LARGE |
| **Response Guard** | Forces structure | Validates quality only | 🟡 MEDIUM |
| **Parking Logic** | Basic detection | Full Answer/Question split | 🟡 MEDIUM |
| **Hard Cap** | Soft limit | 15-turn enforcement | 🟡 MEDIUM |
| **Termination** | Zombie loops possible | Goodbye is goodbye | 🟡 MEDIUM |

---

## 🚀 IMMEDIATE NEXT STEPS

1. **Test Groq Fix** (Now)
   - Refresh browser
   - Start Mission 1
   - Check console for detailed Groq 400 debug info

2. **Create New Data File** (30 mins)
   - `src/data/syllabus/week1_objectives.js`
   - Copy structure from Artifact section above

3. **Upgrade TurnManager** (1 hour)
   - Add `getUserStatus()` method
   - Add 15-turn hard cap
   - Change `stepIndex` → `currentObjectiveIndex`

4. **Upgrade AI Prompt** (1 hour)
   - Implement Objective-driven prompts
   - Add Answer/Question conditional logic
   - Remove hardcoded canonical questions

5. **Test End-to-End** (30 mins)
   - Verify natural conversation
   - Test student questions
   - Confirm hard cap works

**Total Estimated Time: 3.5 hours**

---

## 💡 KEY INSIGHT

**The fundamental problem:**
- **Current**: Data says "Ask this question" → AI has no freedom → Sounds robotic → ResponseGuard forces structure when AI fails
- **Artifact**: Data says "Achieve this goal" → AI decides how to ask → Sounds natural → ResponseGuard only checks quality

**This is why you're seeing hardcoded responses:** Because Groq was failing (requestBody bug), falling back to generic responses, which then got forced into rigid structure by ResponseGuard.

**After upgrade:** AI will generate natural, varied responses that still achieve the same educational objectives.
