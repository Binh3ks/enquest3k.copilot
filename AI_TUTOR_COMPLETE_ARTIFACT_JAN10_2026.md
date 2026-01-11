# 🎓 AI TUTOR - COMPLETE MASTER ARTIFACT
**Single Source of Truth for Ms. Nova AI Tutor System**

**Date:** January 10, 2026  
**Status:** ✅ PRODUCTION READY  
**Last Updated:** After Mission 2 comprehensive fixes  

---

## 📖 TABLE OF CONTENTS

1. [System Philosophy](#1-system-philosophy)
2. [Architecture Overview](#2-architecture-overview)
3. [Story Mission Deep Dive](#3-story-mission-deep-dive)
4. [Free Talk Mode](#4-free-talk-mode)
5. [Objective-Driven System](#5-objective-driven-system)
6. [Prompt Engineering](#6-prompt-engineering)
7. [Response Structure](#7-response-structure)
8. [Content Awareness](#8-content-awareness)
9. [Recent Critical Fixes](#9-recent-critical-fixes)
10. [Testing & Validation](#10-testing--validation)

---

## 1. SYSTEM PHILOSOPHY

### 1.1 Core Principles

**AI Tutor ≠ Chatbot**
- AI Tutor is a **teacher following a lesson plan**, not a conversational assistant
- Every output is **content-aware**: aligned with current week's grammar, vocabulary, pedagogy
- **Student produces MORE language than AI** (AI speaks less, student speaks more)
- If student doesn't speak enough, AI uses **scaffolding**, not answering for them

**Core Mantra:**
> "If student doesn't speak, AI has failed."

### 1.2 Ms. Nova Persona

**Character:**
- Warm, encouraging English teacher for Vietnamese children (A0-A1 level)
- Patient and never says "wrong" or "incorrect" (uses **Recast Technique**)
- Production-oriented: pushes students to speak, not just understand
- Vocabulary-aware: only uses words from current week's syllabus

**Tone Guidelines:**
- ✅ "Great! Your name is Binh!" (positive, specific)
- ✅ "What color is your backpack?" (simple, direct)
- ❌ "That's interesting, but..." (filler words)
- ❌ "Can you tell me more about that?" (too vague)

### 1.3 Recast Technique (Never Say Wrong)

**Philosophy:** Children learn better through positive modeling than correction.

**How it works:**
```
Student: "I have book"           (Missing article)
AI: "Great! You have a book!"    (RECAST with correct grammar)
    ↑ Praise + model correct form, never say "wrong"
```

**Recast Rules:**
- Always acknowledge first: "Great!", "Nice!", "Perfect!"
- Expand student's answer into full sentence (≤8 words)
- Model correct grammar naturally
- NEVER say: "wrong", "incorrect", "that's not right", "try again"

---

## 2. ARCHITECTURE OVERVIEW

### 2.1 System Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                        STORY MISSION UI LAYER                        │
│                     (StoryMissionTab.jsx)                           │
└───────────────┬─────────────────────────────────────────────────────┘
                │
                ├─→ [User Types Message]
                │
                ├─→ detectStudentInputType()
                │   ├─→ Check for "?" ending
                │   ├─→ Check for question words
                │   └─→ Return: QUESTION | ANSWER | OFF_TOPIC
                │
                ├─→ getTurnManager(missionId)
                │
                ├─→ turnManager.processTurn(studentInputType)
                │   │
                │   ├─→ Check: totalTurns >= 15?
                │   │   └─→ Return: END_MISSION_WARMLY
                │   │
                │   ├─→ Check: studentInputType === QUESTION?
                │   │   └─→ Return: ANSWER_STUDENT_THEN_BRIDGE_BACK
                │   │       (Park on current objective)
                │   │
                │   └─→ else
                │       └─→ Return: ACK_RECAST_THEN_ASK_TARGET
                │           (Advance to next objective)
                │
                ├─→ buildObjectiveDrivenPrompt(context)
                │   │
                │   └─→ [Construct AI Instruction]
                │       ├─ Turn type (opening, goodbye, regular)
                │       ├─ Objective (goal, context, required_info)
                │       ├─ Vocabulary constraints
                │       └─ Response structure (ACK/RECAST/QUESTION)
                │
                ├─→ novaEngine.sendToNova(prompt)
                │   │
                │   └─→ [AI Providers Chain]
                │       ├─ Try Groq (gemma2-9b-it)
                │       └─ Fallback to Gemini (gemini-2.0-flash-exp)
                │
                ├─→ guardResponseObject(response, guardContext)
                │   │
                │   └─→ [Response Validation]
                │       ├─ Check for banned phrases
                │       ├─ Validate grammar (A0-A1 level)
                │       ├─ Apply instruction constraints
                │       └─ Return safe response
                │
                └─→ [Add to Chat & Continue]
```

### 2.2 File Structure

**Core Files:**
```
src/services/ai_tutor/
├── novaEngine.js              # AI provider orchestration (Groq → Gemini)
├── turnManager.js             # Conversation state machine (objective mode)
├── tutorPrompts.js            # Prompt builders (buildObjectiveDrivenPrompt)
└── utils/
    ├── responseGuard.js       # Response validation & fallbacks
    ├── inputDetection.js      # Student input classification
    └── tts/                   # Text-to-speech (4-layer cascade)

src/modules/ai_tutor/tabs/
├── StoryMissionTab.jsx        # Story Mission UI & orchestration
├── FreeTalkTab.jsx            # Free conversation mode
├── PronunciationTab.jsx       # Word pronunciation practice
├── GrammarTab.jsx             # Grammar drills
└── VocabularyTab.jsx          # Vocabulary flashcards

src/data/syllabus/
├── week1_objectives.js        # Mission 1 objectives (greetings)
├── week1_mission2_objectives.js  # Mission 2 objectives (backpack)
└── week1_mission3_objectives.js  # Mission 3 objectives (teacher/classroom)
```

---

## 3. STORY MISSION DEEP DIVE

### 3.1 What is Story Mission?

**Story Missions** are structured roleplay scenarios where:
- AI plays Ms. Nova, guiding student through conversation
- Student must produce language to progress the story
- Every turn has a **learning objective** student must complete
- Missions have clear success criteria (10 objectives + goodbye)

**Example: Mission 2 - "What's in Your Backpack?"**
```
Turn 1: Ms. Nova asks: "What do you have in your backpack?"
        → Student answers: "book"
        → AI recasts: "Great! You have a book!"
        
Turn 2: Ms. Nova asks: "What color is your backpack?"
        → Student answers: "red"
        → AI recasts: "Nice! Your backpack is red!"

... continues through 10 objectives + goodbye
```

### 3.2 Mission Structure

**Objective Schema:**
```javascript
{
  id: "backpack_color",
  goal: "Learn backpack color",
  context: "What color is their backpack? Show interest in the backpack itself.",
  type?: "termination" // Only for goodbye objective
}
```

**Mission Schema:**
```javascript
{
  id: 2,
  week: 1,
  topic: "What's in Your Backpack?",
  
  constraints: {
    vocabulary: ["backpack", "book", "notebook", "pen", ...],
    grammar: ["I have...", "My backpack is...", "It is..."],
    tone: "warm, encouraging, curious, friendly"
  },
  
  objectives: [
    { id: "has_backpack", goal: "...", context: "..." },
    { id: "backpack_color", goal: "...", context: "..." },
    // ... 10 core objectives
    { id: "goodbye", goal: "End Conversation", type: "termination" }
  ]
}
```

### 3.3 Turn Flow Logic

**Turn Manager State Machine:**

```javascript
// src/services/ai_tutor/turnManager.js

processTurn(studentInputType) {
  this.turnCount++; // Increment turn counter
  
  // 1. CHECK HARD LIMIT (15 turns maximum)
  if (this.turnCount >= 15) {
    return {
      type: 'goodbye',
      instruction: 'END_MISSION_WARMLY',
      reason: 'HARD_LIMIT_REACHED'
    };
  }
  
  // 2. CHECK IF STUDENT ASKING QUESTION (reverse question)
  if (studentInputType === 'QUESTION') {
    // PARK on current objective (don't advance)
    return {
      type: 'answer_and_steer',
      objective: this.getCurrentObjective(), // SAME objective
      instruction: 'ANSWER_STUDENT_THEN_BRIDGE_BACK',
      reason: 'Student asked question'
    };
  }
  
  // 3. NORMAL FLOW: Student answered, advance to next objective
  const nextObjective = this.advanceToNextObjective();
  
  if (nextObjective.type === 'termination') {
    return {
      type: 'goodbye',
      instruction: 'END_MISSION_WARMLY'
    };
  }
  
  return {
    type: 'normal',
    objective: nextObjective,
    instruction: 'ACK_RECAST_THEN_ASK_TARGET'
  };
}
```

**Three Instruction Types:**

1. **ACK_RECAST_THEN_ASK_TARGET** (Normal progression)
   - Student answered the question
   - AI acknowledges + recasts + asks next objective
   - Advances to next objective

2. **ANSWER_STUDENT_THEN_BRIDGE_BACK** (Reverse question)
   - Student asked AI a question (e.g., "What is your name?")
   - AI answers + bridges back to current objective
   - **DOES NOT advance** (parks on current objective)

3. **END_MISSION_WARMLY** (Mission complete)
   - Turn count ≥ 15 OR all objectives complete
   - AI celebrates student's work and says goodbye

### 3.4 Student Input Detection

**Function:** `detectStudentInputType(message)`

**Classification Logic:**
```javascript
// src/services/ai_tutor/utils/inputDetection.js

export function detectStudentInputType(message) {
  if (!message || message.trim().length === 0) {
    return 'ANSWER'; // Empty = treat as answer attempt
  }
  
  const msg = message.trim().toLowerCase();
  
  // Check for question mark
  if (msg.endsWith('?')) {
    return 'QUESTION';
  }
  
  // Check for question words at start
  const questionStarters = [
    /^what/, /^where/, /^when/, /^who/, /^why/, /^how/,
    /^do you/, /^are you/, /^can you/, /^did you/,
    /^is your/, /^have you/
  ];
  
  for (const pattern of questionStarters) {
    if (pattern.test(msg)) {
      return 'QUESTION';
    }
  }
  
  // Default: treat as answer to AI's question
  return 'ANSWER';
}
```

**Examples:**
- `"Binh"` → ANSWER
- `"What is your name?"` → QUESTION
- `"How old are you?"` → QUESTION
- `"I have a book"` → ANSWER
- `"red"` → ANSWER

### 3.5 Objective Parking (Critical Feature)

**Problem:** Student asks AI a question mid-mission. What happens to the current objective?

**Solution:** **Objective Parking** - AI answers student's question BUT stays on the same objective.

**Example:**
```
Turn 3: AI asks: "What color is your backpack?"
        (Current objective: backpack_color)
        
Student: "What is your name?"  ← Student asks question instead of answering

AI Response:
  "My name is Ms. Nova! I am your English teacher.
   Speaking of which, what color is your backpack?"
   ↑ Answer student's Q      ↑ Bridge back to SAME objective

Next Turn: Still on objective "backpack_color" (PARKED, not advanced)
```

**Implementation:**
```javascript
// In turnManager.processTurn()
if (studentInputType === 'QUESTION') {
  return {
    objective: this.getCurrentObjective(), // SAME objective (parking)
    instruction: 'ANSWER_STUDENT_THEN_BRIDGE_BACK'
  };
}
```

---

## 4. FREE TALK MODE

### 4.1 Free Talk vs Story Mission

| Feature | Story Mission | Free Talk |
|---------|--------------|-----------|
| **Structure** | Linear objectives | Free-form conversation |
| **AI Role** | Teacher with lesson plan | Friendly conversation partner |
| **Objectives** | Must complete 10 objectives | No fixed objectives |
| **Turn Limit** | Hard cap at 15 turns | No hard limit (soft limit: 20) |
| **Topic Control** | Strictly follows mission topic | Student-led topics |
| **Grammar Scope** | Week-specific grammar only | Week-specific grammar only |
| **Vocabulary** | Mission-specific vocab pool | Week's full vocab pool |

### 4.2 Free Talk Behavior

**Opening Greetings (Random Selection):**
```javascript
const greetings = [
  "What makes you happy?",
  "What did you dream about last night?",
  "If you could be any animal, which one?",
  "What's your favorite thing to do after school?",
  "Tell me about something cool you saw today!"
];
```

**Conversation Style:**
- No strict objective sequence
- AI shows genuine interest in student's responses
- Gradually introduces Week 1 vocabulary naturally
- Encourages longer responses with follow-ups
- Uses Recast for errors (same as Story Mission)

**Example Flow:**
```
AI: "What makes you happy?"
Student: "play"
AI: "Great! Playing makes you happy! What do you play?"
Student: "I play with friend"
AI: "Nice! You play with your friends! Where do you play?"
Student: "at school"
AI: "Perfect! You play at school with your friends! 
     Do you have books at school?"
     ↑ Natural introduction of "books" from Week 1 vocab
```

### 4.3 Free Talk Prompt Structure

**Key Differences from Story Mission:**
- No `objective` context (more open-ended)
- Encourages follow-up questions based on student's answer
- Still constrained by Week 1 grammar and vocabulary
- Shorter AI responses (≤15 words instead of structured ACK/RECAST/QUESTION)

---

## 5. OBJECTIVE-DRIVEN SYSTEM

### 5.1 Philosophy

**Old System (Step-based):**
```javascript
// ❌ HARDCODED: AI must ask exact question
{
  key: "age",
  question: "How old are you?",  // AI MUST use these exact words
  hints: ["I", "am", "years", "old"]
}
```

**New System (Objective-driven):**
```javascript
// ✅ FLEXIBLE: AI generates natural variations
{
  id: "age",
  goal: "Learn student's age",
  context: "Natural follow-up to learn more about the student. Keep it casual."
}

// AI can generate:
// - "How old are you?"
// - "What is your age?"
// - "Are you 10 years old?"
// - "Can you tell me your age?"
```

**Benefits:**
- Natural conversation variation
- AI adapts question style to context
- Less robotic, more human-like
- Still achieves same learning objectives

### 5.2 Objective Schema

**Full Objective Definition:**
```javascript
{
  id: "backpack_color",           // Unique identifier
  goal: "Learn backpack color",   // What to achieve
  context: "What color is their backpack? Show interest in the backpack itself.",
  // ↑ Instructions for AI on HOW to ask and WHAT to focus on
  
  type?: "termination"            // Optional: marks goodbye objective
}
```

**Context Guidelines:**
- Be specific about what to ask ("What color is their backpack?")
- Include teaching notes ("Show interest in the backpack itself")
- Mention conditional logic ("Only if they said YES to books...")
- Suggest natural transitions ("Use 'what else' since you already asked...")

### 5.3 Three Mission Types

**Mission 1: What's Your Name?**
- **File:** `src/data/syllabus/week1_objectives.js`
- **Topics:** Name, age, being a student, school feelings
- **Vocabulary:** name, age, student, teacher, school, grade
- **Objectives:** 10 core + 1 termination

**Mission 2: What's in Your Backpack?** (Recently Fixed ✅)
- **File:** `src/data/syllabus/week1_mission2_objectives.js`
- **Topics:** Backpack contents, color, weight, feelings
- **Vocabulary:** backpack, book, notebook, pen, pencil, color words
- **Objectives:** 10 core + 1 termination
- **Special Logic:** 
  - Turn 1: Asks about contents (opening acknowledges this)
  - Turn 3: Uses "what else" (not redundant question)
  - Conditional: Skips "how many books" if student has no books

**Mission 3: Your Classroom** (Recently Fixed ✅)
- **File:** `src/data/syllabus/week1_mission3_objectives.js`
- **Topics:** Teacher, classroom, school environment
- **Vocabulary:** teacher, classroom, school, desk, whiteboard, friend
- **Objectives:** 10 core + 1 termination

---

## 6. PROMPT ENGINEERING

### 6.1 buildObjectiveDrivenPrompt() Function

**Location:** `src/services/ai_tutor/tutorPrompts.js`

**Purpose:** Dynamically construct AI instructions based on:
- Turn number (1 = opening, 15 = goodbye, else = regular)
- Turn decision type (normal, answer_and_steer, goodbye)
- Current objective (goal, context)
- Mission constraints (vocabulary, grammar, tone)

### 6.2 Opening Turn Prompt (Turn 1)

**Structure:**
```javascript
if (turnNumber === 1 && objective) {
  const mission = options.mission || {};
  const missionGreeting = mission.nova_greeting || 
    `Hello! I am Ms. Nova, your English teacher.`;
  
  return `You are Ms. Nova, a warm English teacher for young Vietnamese children.

🎯 OPENING TURN - OBJECTIVE: "${objective.goal}"
CONTEXT: ${objective.context}

📚 VOCABULARY POOL (MUST PRIORITIZE):
${vocabPool.join(', ')}

GENERATE OPENING:
1. Start with: "${missionGreeting}"
2. Ask ONE question to achieve objective
3. Keep it simple, friendly, natural (A0 level)

RETURN JSON:
{
  "ack": "",
  "recast": "",
  "bridge": "",
  "question": "[Your natural question for objective]",
  "hints": ["[4-6 hints matching your question]"]
}`;
}
```

**Example Output:**
```json
{
  "ack": "",
  "recast": "",
  "bridge": "",
  "question": "Hello! I am Ms. Nova, your English teacher. What is your name?",
  "hints": ["My", "name", "is", "I", "am"]
}
```

### 6.3 Regular Turn Prompt (Turns 2-14)

**Structure:**
```javascript
return `You are Ms. Nova, a warm English teacher for young Vietnamese children.

Student just said: "${userInput}"
Previous Objective: "${previousObjective?.goal || 'N/A'}" ✅ COMPLETED

🎯 NEXT OBJECTIVE: "${objective.goal}"
Context: ${objective.context}

🔥 READ THE CONTEXT CAREFULLY:
- If context says "only if...", check student's previous answer first
- If context says "skip naturally", acknowledge and move on smoothly

📚 VOCABULARY POOL (🚨 MUST PRIORITIZE):
${vocabPool.join(', ')}

🚨 ⚠️ CRITICAL WARNING - READ CAREFULLY:
Your QUESTION must focus on the OBJECTIVE TOPIC, NOT the student's answer!

🔥 RULE: Student's words = RECAST ONLY. Objective topic = QUESTION ONLY.

❌ COMMON MISTAKES (AVOID THESE):
1. Student mentions X → Objective asks about Y
   ❌ WRONG: Ask about X (what student said)
   ✅ RIGHT: Ask about Y (objective topic)

2. Student: "teacher" → Objective: "student_name"
   ❌ WRONG: "What is your teacher's name?"
   ✅ RIGHT: "What is YOUR name?"

3. Student: "desk" → Objective: "classroom_size"
   ❌ WRONG: "Is your desk big?"
   ✅ RIGHT: "Is your classroom big?"

🎯 YOUR QUESTION = Objective's specified topic ONLY
📝 RECAST = Student's exact words expanded
🚫 NEVER mix student's vocabulary into your question!

🎯 MANDATORY 3-PART RESPONSE STRUCTURE:

1️⃣ ACK (Acknowledge): 1-3 word praise
   ✅ "Great!"
   ✅ "Nice!"
   ✅ "Perfect!"

2️⃣ RECAST (Rephrase): EXPAND student's answer into full sentence (≤8 words)
   Student: "Binh" → Recast: "Your name is Binh!"
   Student: "10" → Recast: "You are 10 years old!"
   Student: "yes" → Recast: "You are a student!"
   Student: "book" → Recast: "You have a book!"

3️⃣ QUESTION (Next objective): Ask naturally to achieve "${objective.goal}"
   
   ✅ BE NATURAL & CONVERSATIONAL:
   - Talk like a friendly teacher, NOT a robot
   - Vary your phrasing each time
   - Show genuine curiosity
   - Keep it simple for kids (A0-A1 level)
   
   ❌ DON'T:
   - Use the same question format every time
   - Sound scripted or robotic
   - Ask about what student just said
   
   🔥 CRITICAL: Your question topic = objective topic, NOT student's words!
   
   Examples:
   - Ask about properties: "What color is...?" OR "Is it big or small?"
   - Ask yes/no: "Do you have...?" OR "Is there a...?"
   - Ask quantity: "How many...?" OR "Do you have one or two?"

💬 EXAMPLE FULL RESPONSE:
Student: "Hung"
Your response: "Great! Your name is Hung! How old are you?"
           ↑ACK  ↑RECAST        ↑QUESTION (to achieve next objective)

🎯 GENERATE HINTS (CRITICAL):
Create 4-6 hints that match YOUR question exactly.

Examples:
- Question: "How old are you?" → Hints: ["I", "am", "years", "old", "10"]
- Question: "Are you a student?" → Hints: ["Yes", "I", "am", "student", "No"]

RETURN ONLY JSON (🚨 EXACTLY THIS FORMAT):
{
  "ack": "[1-3 word praise]",
  "recast": "[EXPAND student's answer, max 8 words]",
  "bridge": "",
  "question": "[Natural question for: ${objective.goal}]",
  "hints": ["[4-6 hints matching YOUR question]"]
}

🚨 FORBIDDEN:
❌ "Tell me more" (too vague)
❌ "That's interesting" (filler words)
❌ Asking 2 questions in one turn
❌ Skipping RECAST (always expand student's answer)
❌ Generic RECAST like "I heard you" or "You said yes"
❌ Robotic scripted questions - be NATURAL!
❌ Asking about student's vocabulary instead of objective topic
❌ Repeating the same question you just asked`;
```

### 6.4 Reverse Question Prompt (Parking Mode)

**When Student Asks AI a Question:**

```javascript
if (turnDecision.type === 'answer_and_steer') {
  return `You are Ms. Nova. Student asked YOU a question.

Student's question: "${userInput}"

INSTRUCTION MODE: ANSWER_STUDENT_THEN_BRIDGE_BACK

RESPONSE LOGIC:
1️⃣ ANSWER: Respond to student's question clearly (A0 level, 2-3 sentences)
   - Be helpful and friendly
   - Keep answer simple and short
   - Stay in character as Ms. Nova

2️⃣ BRIDGE: Use natural transition phrase
   Examples: "Speaking of which...", "By the way...", "Now let me ask you..."

3️⃣ ASK TARGET: Ask question for CURRENT objective (we are PARKED)
   Objective: "${objective.goal}"
   Context: ${objective.context}

RETURN JSON:
{
  "ack": "",
  "recast": "",
  "bridge": "[Natural transition phrase]",
  "question": "[Answer student's Q + bridge + ask objective Q]",
  "hints": ["[4-6 hints for objective question]"]
}

EXAMPLE:
Student: "What is your name?"
Your response: "My name is Ms. Nova! I am your English teacher. 
                Speaking of which, how old are you?"
                ↑ Answer            ↑ Bridge  ↑ Back to objective`;
}
```

### 6.5 Goodbye Turn Prompt (Mission Complete)

```javascript
if (turnDecision.type === 'goodbye') {
  const mission = options.mission || {};
  const missionTitle = mission.title || 'conversation';
  
  return `You are Ms. Nova finishing "${missionTitle}" mission.

🎉 CLOSING TURN STRUCTURE:
1️⃣ ACK: Praise (1-3 words) - "Wonderful!" or "Excellent!"
2️⃣ RECAST: Celebrate completion - "You completed all the objectives!"
3️⃣ GOODBYE: Final praise - "Great job, ${studentName}!"

TONE: Warm, encouraging, celebrating student's progress

RETURN JSON:
{
  "ack": "Wonderful!",
  "recast": "You did a great job today!",
  "bridge": "",
  "question": "Keep practicing your English! Goodbye!",
  "hints": []
}`;
}
```

### 6.6 Mission-Agnostic Warnings (Critical Fix ✅)

**Problem:** Previous prompts had Mission 2-specific examples (backpack, book, notebook) that confused Mission 1 (greetings) and Mission 3 (classroom).

**Solution:** Use universal patterns that apply to ALL missions.

**Before (Mission 2-specific):**
```
❌ COMMON MISTAKES:
1. Student: "book" → Objective: "backpack_color"
   ❌ WRONG: "What color is your book?"
   ✅ RIGHT: "What color is your backpack?"
```

**After (Mission-agnostic):**
```
❌ COMMON MISTAKES:
1. Student mentions X → Objective asks about Y
   ❌ WRONG: Ask about X (what student said)
   ✅ RIGHT: Ask about Y (objective topic)

2. Student: "teacher" → Objective: "student_name"
   ❌ WRONG: "What is your teacher's name?"
   ✅ RIGHT: "What is YOUR name?"

3. Student: "desk" → Objective: "classroom_size"
   ❌ WRONG: "Is your desk big?"
   ✅ RIGHT: "Is your classroom big?"
```

**Result:** All 3 missions now work correctly with generic pattern warnings.

---

## 7. RESPONSE STRUCTURE

### 7.1 Expected JSON Format

**AI MUST return this exact JSON structure:**

```json
{
  "ack": "Great!",
  "recast": "Your name is Binh!",
  "bridge": "",
  "question": "How old are you?",
  "hints": ["I", "am", "years", "old", "10"]
}
```

**Field Definitions:**

| Field | Purpose | Max Length | Required |
|-------|---------|------------|----------|
| `ack` | Acknowledge student's effort | 1-3 words | Always |
| `recast` | Expand student's answer into full sentence | ≤8 words | Always |
| `bridge` | Transition phrase (used in parking mode) | ≤5 words | Optional |
| `question` | Next question for objective OR full response | ≤25 words | Always |
| `hints` | Word buttons student can tap | 4-6 words | Always |

### 7.2 Response Guard System

**Location:** `src/services/ai_tutor/utils/responseGuard.js`

**Purpose:** Validate and sanitize AI responses before showing to student.

**Validation Checks:**

1. **JSON Parsing**
   - Try parsing as JSON
   - If fails, try extracting JSON from markdown code blocks
   - If still fails, treat as legacy format (plain text)

2. **Required Fields Check**
   ```javascript
   const requiredFields = ['ack', 'recast', 'question', 'hints'];
   for (const field of requiredFields) {
     if (!response[field]) {
       // Apply fallback
     }
   }
   ```

3. **Fallback Logic**
   ```javascript
   // Missing ACK → fallback: "Great!"
   if (!response.ack) {
     response.ack = "Great!";
   }
   
   // Missing RECAST → fallback: "I heard you!"
   if (!response.recast) {
     response.recast = "I heard you!";
   }
   
   // Missing QUESTION → CRITICAL ERROR
   if (!response.question) {
     console.error('⚠️ AI missing question - mission cannot continue');
     response.question = "Tell me more!"; // Emergency fallback
   }
   
   // Missing HINTS → generate from question
   if (!response.hints || response.hints.length === 0) {
     response.hints = generateHintsFromQuestion(response.question);
   }
   ```

4. **Banned Phrase Filter**
   ```javascript
   const bannedPhrases = [
     "Tell me more",
     "That's interesting",
     "Can you elaborate",
     "I see",
     "Okay"
   ];
   
   for (const phrase of bannedPhrases) {
     if (response.question.includes(phrase)) {
       // Replace with more specific question
     }
   }
   ```

5. **Length Validation**
   ```javascript
   // Recast too long? Truncate
   if (response.recast.split(' ').length > 8) {
     response.recast = response.recast.split(' ').slice(0, 8).join(' ');
   }
   
   // Question too long? Truncate
   if (response.question.split(' ').length > 25) {
     response.question = response.question.split(' ').slice(0, 25).join(' ') + '?';
   }
   ```

### 7.3 Legacy Format Handling

**If AI returns plain text instead of JSON:**

```javascript
// AI returns: "Great! Your name is Binh! How old are you?"
// Response Guard extracts:

{
  ack: "Great!",                    // First sentence or word
  recast: "Your name is Binh!",    // Second sentence
  question: "How old are you?",     // Last sentence with "?"
  hints: ["I", "am", "years", "old"] // Generated from question
}
```

---

## 8. CONTENT AWARENESS

### 8.1 Grammar Scope System

**Philosophy:** AI can ONLY use grammar structures student has learned.

**Week 1 Grammar Scope:**
```javascript
grammarAllowed: [
  "I am...",
  "My name is...",
  "I have...",
  "I like...",
  "It is...",
  "Yes/No answers"
]

grammarBanned: [
  "I was..." (past simple),
  "I will..." (future),
  "I have been..." (perfect),
  "I did..." (past simple),
  "I went..." (past simple)
]
```

**Example Violations:**

| Week | ❌ WRONG (Grammar not taught) | ✅ RIGHT (Grammar in scope) |
|------|-------------------------------|----------------------------|
| 1-14 | "Where did you go?" | "Where are you?" |
| 1-14 | "I saw a book" | "I see a book" |
| 1-14 | "I was happy" | "I am happy" |
| 1-29 | "What will you do?" | "What do you do?" |

### 8.2 Vocabulary Constraints

**Mission-Specific Vocabulary Pools:**

**Mission 1 (Greetings):**
```javascript
vocabulary: [
  "teacher", "student", "book", "pen", "desk",
  "hello", "hi", "goodbye", "school", "class", "friend",
  "name", "age", "grade", "like", "have", "is", "am", "my"
]
```

**Mission 2 (Backpack):**
```javascript
vocabulary: [
  "backpack", "book", "notebook", "pen", "pencil", "eraser",
  "have", "in", "my", "color", "is", "red", "blue", "green",
  "heavy", "light", "new", "old", "like", "yes", "no"
]
```

**Mission 3 (Classroom):**
```javascript
vocabulary: [
  "teacher", "school", "classroom", "student", "friend",
  "nice", "kind", "funny", "big", "small", "like", "love",
  "have", "is", "am", "my", "yes", "no", "name"
]
```

**AI Behavior:**
- ✅ PRIORITIZE vocabulary from mission's pool
- ✅ Can use common words (I, you, is, have)
- ❌ AVOID introducing words not in Week 1 syllabus
- ❌ NEVER use complex vocabulary (e.g., "elaborate", "describe", "explain")

### 8.3 Tense Guard (Critical)

**Problem:** AI often suggests past tense verbs before Week 15.

**Example Bug:**
```javascript
// Week 1 - Past tense NOT allowed yet
hints: ["I", "saw", "library"]  // ❌ "saw" = past simple
aiPrompt: "Where did you see it?"  // ❌ "did" = past simple helper
```

**Solution:**
```javascript
// Tense validation in Response Guard
const pastTenseMarkers = [
  /\b(was|were)\b/i,
  /\b(did|didn't)\b/i,
  /\b(went|saw|had|got|came|made|took)\b/i,
  /\b(\w+ed)\b/i  // -ed endings
];

for (const marker of pastTenseMarkers) {
  if (week <= 14 && marker.test(response.question)) {
    // BLOCK and regenerate
    console.error('⚠️ Past tense detected in Week', week);
  }
}
```

---

## 9. RECENT CRITICAL FIXES

### 9.1 Mission 2 Comprehensive Fix (January 10, 2026)

**Problem Reported:**
- AI asking about "book" instead of "backpack"
- Redundant questions about backpack contents
- Inappropriate use of "what else"
- Robotic phrasing

**Root Causes Identified:**

1. **Weak Single-Example Warning**
   - Old prompt had 1 generic example
   - AI didn't understand pattern clearly

2. **Illogical Objective Flow**
   - Opening asks "what's in backpack?" but objective 1 also asks same thing
   - Objective 3 ID was "whats_inside" but should be "whats_ELSE_inside"

3. **Missing Conditional Logic**
   - "How many books?" asked even if student has no books
   - No context about skipping gracefully

**Fixes Applied:**

**Fix 1: Rewrite Mission 2 Objectives** (5 objectives modified)

```javascript
// src/data/syllabus/week1_mission2_objectives.js

objectives: [
  {
    id: "has_backpack",
    goal: "Check if student has backpack",
    context: "Ask what they have in their backpack. The opening question asks about backpack contents."
    // ↑ Acknowledges opening already asks
  },
  {
    id: "backpack_color",
    goal: "Learn backpack color",
    context: "What color is their backpack? Show interest in the backpack itself."
    // ↑ Emphasizes "backpack itself" not student's vocab
  },
  {
    id: "whats_else_inside",  // ← Renamed from "whats_inside"
    goal: "Ask what ELSE is inside",
    context: "Ask about OTHER things in backpack. Use 'what else' or 'anything else' since you already asked what's inside."
    // ↑ Instructs to use "what else" appropriately
  },
  {
    id: "has_books",
    goal: "Confirm they have books",
    context: "Ask if they have any books in their backpack. Show interest in reading materials."
    // ↑ Simplified wording
  },
  {
    id: "books_count",
    goal: "Ask how many books",
    context: "Only if they said YES to books - ask how many. If they said NO books, skip this naturally and just acknowledge. Count together: one, two, three..."
    // ↑ Added conditional logic: "Only if YES"
  }
]
```

**Fix 2: Strengthen Prompt Warnings** (Made mission-agnostic)

Before (Mission 2-specific):
```
❌ Student: "book" → Objective: "backpack_color"
   WRONG: "What color is your book?"
   RIGHT: "What color is your backpack?"
```

After (Universal pattern):
```
❌ Student mentions X → Objective asks about Y
   WRONG: Ask about X (what student said)
   RIGHT: Ask about Y (objective topic)
```

**Fix 3: Remove Mission-Specific FORBIDDEN Patterns**

Removed:
- ❌ "Using 'what else' when you haven't asked 'what' before" (Mission 2 only)

**Fix 4: Fix StoryMissionTab Runtime Error**

```javascript
// src/modules/ai_tutor/tabs/StoryMissionTab.jsx (Line 500)

// ❌ BEFORE (caused runtime error):
const currentObjective = objectives?.[currentObjectiveIndex];

// ✅ AFTER:
const turnManager = getTurnManager(currentMission.mission_id);
const currentObjective = turnManager?.getCurrentObjective();
```

**Fix 5: Fix Mission 3 Early Termination**

```javascript
// src/services/ai_tutor/turnManager.js

// ❌ BEFORE (caused early termination):
if (nextObjective.type === 'termination') {
  return { type: 'termination', ... };
}

// ✅ AFTER:
if (nextObjective.type === 'termination') {
  return { type: 'goodbye', ... };  // Matches check in StoryMissionTab
}
```

**Result:**
- ✅ Mission 2: AI asks about backpack, not book
- ✅ Mission 2: Uses "what else" appropriately (not redundant)
- ✅ Mission 2: Skips "how many books" if student has no books
- ✅ Mission 1: No longer broken (mission-agnostic prompts)
- ✅ Mission 3: No longer terminates early
- ✅ All missions: Natural, varied questions

### 9.2 Mission 1 & 3 Shared Prompt Fix (January 10, 2026)

**Problem:** After Mission 2 fix, Mission 1 and 3 broke.

**Root Cause:** Modified shared file `tutorPrompts.js` with Mission 2-specific instructions that confused other missions.

**Examples of Mission 2-specific content:**
- "backpack", "book", "notebook" examples (irrelevant to Mission 1 greetings)
- "what else" usage instructions (irrelevant to Mission 3 classroom)
- Backpack color examples (don't apply to Mission 1 name/age questions)

**Solution:** Make all prompt warnings **mission-agnostic** (apply to ALL missions).

**Changes Applied:**

1. **WARNING Section** - Universal pattern instead of specific examples
2. **Context Reading** - Removed Mission 2-specific "what else" mention
3. **QUESTION Examples** - Generic patterns instead of backpack examples
4. **FORBIDDEN List** - Removed Mission 2-specific pattern

**Result:** All 3 missions now work with shared, mission-agnostic prompts.

---

## 10. TESTING & VALIDATION

### 10.1 Mission Testing Checklist

**Mission 1 (What's Your Name?):**
- [ ] Opening asks: "What is your name?"
- [ ] Turn 2 asks about age after name given
- [ ] If student says "I have a teacher", AI asks about NAME not teacher
- [ ] Questions varied: "What...", "How...", "Do you..."
- [ ] No backpack warnings appear
- [ ] Mission completes at turn 15 or after 11 objectives

**Mission 2 (What's in Your Backpack?):**
- [ ] Opening asks: "What do you have in your backpack?"
- [ ] Turn 2 asks about backpack COLOR (not book color)
- [ ] Turn 3 uses "what else" (not redundant question)
- [ ] If student says "book", AI asks about BACKPACK not book
- [ ] If student has NO books, AI skips "how many books" naturally
- [ ] Questions natural and varied (not robotic)
- [ ] Mission completes successfully

**Mission 3 (Your Classroom):**
- [ ] Opening asks about teacher or classroom
- [ ] If student mentions "desk", AI asks about CLASSROOM not desk
- [ ] No backpack warnings appear
- [ ] Questions natural and age-appropriate
- [ ] Mission completes successfully

### 10.2 Response Format Validation

**Check AI Response:**
```javascript
{
  "ack": "Great!",           // ✅ 1-3 words
  "recast": "Your name is Binh!",  // ✅ ≤8 words, expands student's answer
  "bridge": "",              // ✅ Empty (used only in parking mode)
  "question": "How old are you?",  // ✅ ≤25 words, achieves objective
  "hints": ["I", "am", "years", "old", "10"]  // ✅ 4-6 words
}
```

**Common Issues:**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Missing ACK | Fallback "Great!" used | Check AI prompt clarity |
| Missing RECAST | Fallback "I heard you!" used | AI not following structure |
| Empty question | Mission stops | CRITICAL - regenerate response |
| Generic RECAST | "I heard you" instead of specific | Strengthen prompt examples |
| Wrong hints | Hints don't match question | AI not reading instructions |

### 10.3 Parking Mode Testing

**Test Scenario:**
```
Turn 3: AI asks: "What color is your backpack?"
        (Current objective: backpack_color)

Student types: "What is your name?"  ← Reverse question

Expected AI Response:
{
  "ack": "",
  "recast": "",
  "bridge": "Speaking of which,",
  "question": "My name is Ms. Nova! I am your English teacher. Speaking of which, what color is your backpack?",
  "hints": ["red", "blue", "green", "it", "is"]
}

Next Turn: Should STILL be on objective "backpack_color" (PARKED)
```

**Validation:**
- [ ] AI answers student's question clearly
- [ ] AI uses bridge phrase ("Speaking of which...")
- [ ] AI returns to SAME objective (not next objective)
- [ ] Turn count increases but objective index does NOT

### 10.4 Hard Limit Testing

**Test Scenario:**
```
Complete Mission 1, tracking turn count:

Turn 1: "What is your name?" → Student: "Binh"
Turn 2: "How old are you?" → Student: "10"
Turn 3-13: Continue through objectives
Turn 14: Last objective question
Turn 15: Student answers

Expected: Turn 15 triggers goodbye (hard limit)

AI Response:
{
  "ack": "Wonderful!",
  "recast": "You did a great job today!",
  "question": "Keep practicing your English! Goodbye!",
  "hints": []
}
```

**Validation:**
- [ ] Mission ends at turn 15 (no turn 16)
- [ ] Goodbye message is warm and encouraging
- [ ] Uses student's name if captured
- [ ] No objectives marked as incomplete

### 10.5 Conditional Logic Testing (Mission 2)

**Test Scenario: Student Has NO Books**

```
Turn 3: "Do you have any books in your backpack?"
Student: "no"

Turn 4: AI should SKIP "how many books" objective naturally

Expected AI Response:
{
  "ack": "Great!",
  "recast": "You don't have books!",
  "question": "Do you have a notebook?",  ← Skips to next objective
  "hints": ["Yes", "I", "have", "notebook", "No"]
}
```

**Validation:**
- [ ] AI acknowledges "no books" in RECAST
- [ ] AI does NOT ask "How many books?"
- [ ] AI moves to next objective (has_notebook)
- [ ] Transition is natural (not abrupt)

### 10.6 Dev Server Testing

**Start Dev Server:**
```bash
cd /Users/binhnguyen/Downloads/Engquest3k
npm run dev
```

**Access:**
- URL: http://localhost:5173/
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)

**Test Flow:**
1. Open AI Tutor widget (bottom-right corner)
2. Click "Story Mission" tab
3. Select Mission 1, 2, or 3
4. Complete full conversation (15 turns or 11 objectives)
5. Check console for errors (F12 → Console)

**Console Debugging:**
```javascript
// Look for these logs:
"🎯 TurnManager: Objective-driven mode - Mission X"
"📋 Objectives: has_backpack → backpack_color → ..."
"🔥 Turn X: Student input type: ANSWER"
"🎯 Advancing to objective: backpack_color"
"✅ Nova Response: {ack: 'Great!', recast: '...', ...}"
```

---

## 11. FILE QUICK REFERENCE

### 11.1 Core Service Files

| File | Purpose | Key Functions |
|------|---------|---------------|
| `src/services/ai_tutor/novaEngine.js` | AI provider orchestration | `sendToNova()` - Groq → Gemini fallback |
| `src/services/ai_tutor/turnManager.js` | Conversation state machine | `processTurn()`, `advanceToNextObjective()` |
| `src/services/ai_tutor/tutorPrompts.js` | Dynamic prompt builder | `buildObjectiveDrivenPrompt()` |
| `src/services/ai_tutor/utils/responseGuard.js` | Response validation | `guardResponseObject()` |
| `src/services/ai_tutor/utils/inputDetection.js` | Input classification | `detectStudentInputType()` |

### 11.2 UI Component Files

| File | Purpose | State Management |
|------|---------|------------------|
| `src/modules/ai_tutor/tabs/StoryMissionTab.jsx` | Story Mission UI | `messages`, `currentMission`, `turnManager` |
| `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` | Free Talk UI | `messages`, `conversationStarted` |
| `src/modules/ai_tutor/tabs/PronunciationTab.jsx` | Pronunciation practice | `currentWord`, `recordedAudio` |
| `src/modules/ai_tutor/tabs/GrammarTab.jsx` | Grammar drills | `currentExercise`, `userAnswer` |
| `src/modules/ai_tutor/tabs/VocabularyTab.jsx` | Vocabulary flashcards | `currentCard`, `knownWords` |

### 11.3 Data Files (Week 1)

| File | Mission | Objectives |
|------|---------|------------|
| `src/data/syllabus/week1_objectives.js` | Mission 1: What's Your Name? | Name, age, student role, school feelings (10 + goodbye) |
| `src/data/syllabus/week1_mission2_objectives.js` | Mission 2: What's in Your Backpack? | Backpack contents, color, weight, feelings (10 + goodbye) |
| `src/data/syllabus/week1_mission3_objectives.js` | Mission 3: Your Classroom | Teacher, classroom, school environment (10 + goodbye) |
| `src/data/weeks/week_01_real.js` | Week 1 metadata | Vocabulary, grammar, mission configs |

---

## 12. DEVELOPMENT GUIDELINES

### 12.1 Adding New Missions

**Step 1: Create Objectives File**

```javascript
// src/data/syllabus/week1_mission4_objectives.js

export const mission4Objectives = {
  id: 4,
  week: 1,
  topic: "Your Mission Title",
  
  constraints: {
    vocabulary: ["word1", "word2", ...],
    grammar: ["I have...", "My ... is..."],
    tone: "warm, encouraging, friendly"
  },
  
  objectives: [
    {
      id: "obj_1",
      goal: "What to achieve",
      context: "How to ask, what to focus on, conditional logic"
    },
    // ... 10 core objectives
    {
      id: "goodbye",
      goal: "End Conversation",
      type: "termination",
      context: "Celebrate student's work"
    }
  ]
};
```

**Step 2: Import in StoryMissionTab.jsx**

```javascript
// src/modules/ai_tutor/tabs/StoryMissionTab.jsx

import { mission4Objectives } from '../../../data/syllabus/week1_mission4_objectives';

// Add to switch statement:
case 4:
  objectives = mission4Objectives.objectives;
  missionVocabulary = mission4Objectives.constraints.vocabulary;
  break;
```

**Step 3: Add Mission Config in week_01_real.js**

```javascript
// src/data/weeks/week_01_real.js

story_missions: [
  // ... existing missions
  {
    mission_id: 4,
    title: "Your Mission Title",
    nova_greeting: "Hello! I am Ms. Nova. [First question]",
    mission_context: "Mission description and AI behavior guidelines",
    target_vocab: ["word1", "word2", ...],
    target_pattern: "I am [...]"
  }
]
```

**Step 4: Test**
- Start mission 4
- Verify objectives load correctly
- Check AI asks natural questions
- Validate mission completes at turn 15

### 12.2 Modifying Prompts

**When to Modify tutorPrompts.js:**
- ✅ Improving universal instruction clarity
- ✅ Adding mission-agnostic examples
- ✅ Fixing response format issues
- ❌ Adding mission-specific instructions (use objectives instead)

**Safe Modification Pattern:**
```javascript
// ✅ GOOD: Universal pattern
"Student mentions X → Objective Y → Ask about Y (not X)"

// ❌ BAD: Mission-specific example
"Student: 'book' → Objective: 'backpack_color' → Ask about backpack"
```

**Testing After Prompt Changes:**
1. Test ALL missions (not just the one you're fixing)
2. Check for mission-agnostic wording
3. Verify examples work for Mission 1, 2, and 3
4. Watch for fallback usage (sign of AI confusion)

### 12.3 Debugging Tips

**Problem: AI returns empty question**
```javascript
// Check console:
"⚠️ AI missing question - mission cannot continue"

// Causes:
// 1. Prompt too complex → simplify
// 2. AI provider timeout → check Groq/Gemini status
// 3. JSON parsing failed → check AI response format
```

**Problem: AI asks about student's vocabulary instead of objective**
```javascript
// Check objective context:
context: "What color is their backpack? Show interest in the backpack itself."
//        ↑ Add clarity: "backpack itself" (not student's words)

// Check prompt WARNING section:
"Your QUESTION = Objective topic ONLY (ignore student's vocabulary)"
```

**Problem: Mission ends too early**
```javascript
// Check turnManager.processTurn():
if (nextObjective.type === 'termination') {
  return { type: 'goodbye', ... };  // Must match StoryMissionTab check
}
```

**Problem: Objectives not loading**
```javascript
// Check import and switch statement in StoryMissionTab.jsx:
import { mission2Objectives } from '../../../data/syllabus/week1_mission2_objectives';

case 2:
  objectives = mission2Objectives.objectives;  // Must be .objectives array
  break;
```

### 12.4 Performance Optimization

**AI Provider Chain:**
1. **Groq (Primary)** - Fast, free tier
   - Model: `gemma2-9b-it`
   - Speed: ~500ms response time
   - Quota: 30 requests/minute

2. **Gemini (Fallback)** - Reliable, Google
   - Model: `gemini-2.0-flash-exp`
   - Speed: ~800ms response time
   - Quota: 10 requests/minute (free tier)

**Caching Strategy:**
- TurnManager state cached in memory (per mission)
- Conversation history cached (last 10 turns)
- Student name cached after first capture
- No API calls for hints (generated locally if missing)

---

## 13. KNOWN LIMITATIONS

### 13.1 Current Constraints

1. **Hard Turn Limit (15 turns)**
   - Rationale: Prevent infinite conversations
   - Impact: Some missions may feel rushed
   - Workaround: Carefully design objectives to fit in 12-13 turns

2. **Mission-Agnostic Prompts**
   - Benefit: All missions work with shared prompt
   - Limitation: Can't provide mission-specific examples in prompt
   - Solution: Use objective `context` field for mission-specific instructions

3. **AI Provider Limitations**
   - Groq: 30 requests/minute (free tier)
   - Gemini: 10 requests/minute (free tier)
   - Impact: High traffic may hit rate limits
   - Mitigation: Fallback chain + exponential backoff

4. **Grammar Scope Enforcement**
   - Current: Warning in prompt, no hard validation
   - Risk: AI may still generate past tense in Week 1-14
   - Future: Add regex-based grammar validator in Response Guard

### 13.2 Future Enhancements

**Planned:**
- [ ] Adaptive turn limit (extend if student engaged)
- [ ] Mission-specific prompt templates (conditional loading)
- [ ] Automated grammar scope validation (reject past tense pre-Week 15)
- [ ] Student progress tracking across missions
- [ ] Mission difficulty adjustment based on performance

**Under Consideration:**
- [ ] Voice input for student responses
- [ ] Real-time pronunciation feedback
- [ ] Mission replay with different AI personality
- [ ] Parent/teacher dashboard for progress monitoring

---

## 14. CHANGELOG

### January 10, 2026
- ✅ Fixed Mission 2: AI asking about book instead of backpack
- ✅ Fixed Mission 2: Redundant questions about backpack contents
- ✅ Fixed Mission 2: Inappropriate "what else" usage
- ✅ Fixed Mission 1 & 3: Broken after Mission 2 fix (mission-agnostic prompts)
- ✅ Fixed Mission 3: Early termination bug (type mismatch)
- ✅ Fixed StoryMissionTab: Runtime error "cannot read property" (line 500)
- ✅ Rewrote 5 Mission 2 objectives with better context
- ✅ Made prompt warnings mission-agnostic (removed backpack-specific examples)
- ✅ Created comprehensive master artifact (this document)

### January 9, 2026
- ✅ Implemented objective-driven prompt builder
- ✅ Added objective parking for reverse questions
- ✅ Fixed turn count hard limit (15 turns)
- ✅ Added conditional logic support in objectives

### December 31, 2024
- ✅ Implemented 5 AI Tutor tabs (Story Mission, Free Talk, Pronunciation, Grammar, Vocabulary)
- ✅ Integrated Week 1 syllabus content
- ✅ Added Ms. Nova persona
- ✅ Implemented Recast Technique
- ✅ Added multi-provider AI (Groq → Gemini fallback)

---

## 15. QUICK START GUIDE

### For Developers

**1. Start Dev Server:**
```bash
cd /Users/binhnguyen/Downloads/Engquest3k
npm run dev
```

**2. Test Story Mission:**
- Open http://localhost:5173/
- Click AI Tutor widget (bottom-right)
- Select "Story Mission" tab
- Choose Mission 1, 2, or 3
- Complete conversation

**3. Check Console:**
```javascript
// Look for:
"🎯 TurnManager: Objective-driven mode"
"📋 Objectives: has_backpack → backpack_color → ..."
"✅ Nova Response: {ack: '...', recast: '...', question: '...'}"
```

### For Content Creators

**1. Create New Mission:**
- Copy `week1_mission2_objectives.js`
- Rename to `week1_mission4_objectives.js`
- Change ID, topic, objectives (10 + goodbye)

**2. Write Objective Context:**
```javascript
context: "What to ask? How to ask it? Any conditions?"
```

**3. Test Mission:**
- Import in StoryMissionTab.jsx
- Add to switch statement
- Test full conversation flow

### For AI Tutor Designers

**1. Understand Core Philosophy:**
- Student speaks MORE than AI
- AI uses Recast (never says "wrong")
- Grammar scope enforced by week
- Vocabulary constrained by mission

**2. Write Clear Objectives:**
- `goal`: What to achieve (1 sentence)
- `context`: How to ask, what to focus on (2-3 sentences)
- Include conditional logic if needed

**3. Test with Real Students:**
- Observe turn-by-turn responses
- Check if questions feel natural
- Verify grammar scope adherence

---

**End of Master Artifact**

*This document is the single source of truth for EngQuest AI Tutor system. For questions or updates, modify this file and commit with detailed change notes.*
