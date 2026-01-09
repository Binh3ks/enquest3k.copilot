# Ms. Nova - AI-Driven Pedagogical Logic Artifact
**Comprehensive Technical Documentation**  
**Version:** 2.0 (Restored System)  
**Date:** January 6, 2026  
**Author:** EngQuest Development Team

---

## 📚 Table of Contents

1. [Overview & Philosophy](#overview--philosophy)
2. [Architecture & Data Flow](#architecture--data-flow)
3. [Core Components](#core-components)
4. [AI-Driven Logic Explained](#ai-driven-logic-explained)
5. [Grammar Progression System](#grammar-progression-system)
6. [Mode-Specific Intelligence](#mode-specific-intelligence)
7. [Pedagogical Techniques](#pedagogical-techniques)
8. [Scaffolding & Adaptation](#scaffolding--adaptation)
9. [Quality Control & Guardrails](#quality-control--guardrails)
10. [Examples & Use Cases](#examples--use-cases)
11. [Configuration & Customization](#configuration--customization)

---

## 1. Overview & Philosophy

### What is Ms. Nova?

Ms. Nova is an **AI-driven ESL speaking coach** designed for Vietnamese children aged 6-12 (A0-A2 level). Unlike traditional chatbots, Ms. Nova operates on a **pedagogical AI framework** where the AI makes intelligent, context-aware teaching decisions in real-time.

### Core Philosophy: AI-Driven vs. Scripted

```
❌ TRADITIONAL (Scripted):
Turn 1: "What is your name?"
Turn 2: "How old are you?"
Turn 3: "What grade are you in?"
Turn 4: "Do you like school?"
[Fixed sequence, no adaptation]

✅ MS. NOVA (AI-Driven):
Turn 1: "What is your name?" 
→ Student: "My name is Alex."
Turn 2: AI decides → "Nice to meet you, Alex! How old are you?"
→ Student: "I am 8."
Turn 3: AI decides → "Eight years old! Are you a student, Alex?"
→ Student: "Yes."
Turn 4: AI decides → "Great! Do you have a backpack for school?"
[Natural flow, builds on answers]
```

**Key Difference:** 
- **Scripted:** Follows predetermined path regardless of student input
- **AI-Driven:** AI analyzes context and decides next question dynamically

### Design Principles

1. **Context Awareness**: AI reads conversation history before every response
2. **Grammar-Scoped**: Enforces week-specific grammar rules strictly
3. **Production-Oriented**: Forces student to speak more than the AI
4. **Adaptive Scaffolding**: Adjusts support level based on student performance
5. **Natural Flow**: Conversations progress organically, not mechanically

---

## 2. Architecture & Data Flow

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│          (StoryMissionTab / FreeTalkTab / QuizTab)             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        NOVA ENGINE                              │
│                   (Orchestration Layer)                         │
│                                                                 │
│  • sendToNova()          ← Entry point                         │
│  • buildTutorContext()   ← Context preparation                 │
│  • applyGuardrails()     ← Post-processing                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PROMPT BUILDER                             │
│                   (tutorPrompts.js)                             │
│                                                                 │
│  buildPrompt(mode, context, userInput, options)                │
│      │                                                          │
│      ├─► buildSystemPrompt(context)                            │
│      │      └─► getGrammarRules(weekId)                        │
│      │                                                          │
│      └─► buildModePrompt(mode, ...)                            │
│           ├─► buildStoryMissionPrompt()  ← AI-driven logic     │
│           ├─► buildChatPrompt()          ← Free talk logic     │
│           ├─► buildQuizPrompt()          ← Assessment logic    │
│           └─► buildDebatePrompt()        ← Opinion logic       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        AI ROUTER                                │
│                    (Multi-Provider)                             │
│                                                                 │
│  sendToAI() → Gemini / OpenAI / Anthropic                      │
│             → Retry logic on failure                            │
│             → Provider fallback                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        GUARDRAILS                               │
│                                                                 │
│  • Grammar Guard    → Validates grammar scope                  │
│  • Talk Ratio Guard → Ensures student speaks more              │
│  • Response Parser  → Validates JSON structure                 │
│  • Error Handler    → Graceful fallbacks                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PROCESSED RESPONSE                           │
│                                                                 │
│  {                                                              │
│    ai_response: "...",                                          │
│    pedagogy_note: "...",                                        │
│    suggested_hints: [...],                                      │
│    grammar_focus: "...",                                        │
│    mission_status: "ongoing"                                    │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Example (Story Mission)

```javascript
// 1. USER INPUT
User types: "I like school"

// 2. NOVA ENGINE receives request
{
  mode: 'story',
  userMessage: 'I like school',
  chatHistory: [
    { role: 'assistant', content: 'Hello! What is your name?' },
    { role: 'user', content: 'My name is Alex.' },
    { role: 'assistant', content: 'Nice to meet you, Alex! Do you like school?' }
  ],
  context: { missionId: 0, turnCount: 2 }
}

// 3. BUILD CONTEXT
weekData = { weekId: 1, weekTitle: 'The Young Scholar', ... }
userProfile = { name: 'Alex', age: 8 }

// 4. BUILD PROMPT
context = {
  weekId: 1,
  unitTitle: 'The Young Scholar',
  topic: 'School & Learning',
  coreVocab: ['student', 'teacher', 'school', 'book', ...],
  learner: { name: 'Alex', age: 8, level: 'A0' },
  constraints: { aiMaxWords: 25, userMinWords: 5, ... }
}

systemPrompt = buildSystemPrompt(context)
// → "You are an ESL teacher for A0 learners (Week 1: 'The Young Scholar')..."
// → Includes grammar rules, constraints, core pedagogy

modePrompt = buildStoryMissionPrompt(context, 'I like school', options)
// → Mission-specific instructions
// → Conversation history
// → AI decision framework

fullPrompt = systemPrompt + "\n\n" + modePrompt

// 5. SEND TO AI
rawResponse = await sendToAI({
  systemPrompt: fullPrompt,
  chatHistory: [...],
  userMessage: 'I like school',
  weekId: 1,
  mode: 'story'
})

// 6. AI GENERATES (example)
{
  "story_beat": "That's wonderful, Alex! School is a great place to learn!",
  "task": "What is your favorite subject at school?",
  "scaffold": {
    "hints": ["My", "favorite", "subject", "is", "math", "English"]
  }
}

// 7. PARSE & VALIDATE
parsedResponse = responseParser.parseAIResponse(rawResponse)
validatedResponse = responseParser.validateResponse(parsedResponse, 'story')

// 8. APPLY GUARDRAILS
- Grammar check: ✅ Uses present simple only
- Talk ratio: ✅ AI response < 25 words
- Structure: ✅ Has all required fields

// 9. RETURN TO UI
{
  ai_response: "That's wonderful, Alex! School is a great place to learn! What is your favorite subject at school?",
  pedagogy_note: "Building on student's interest, introducing 'subject' vocabulary",
  suggested_hints: ["My", "favorite", "subject", "is", "math", "English"],
  mission_status: "ongoing"
}
```

---

## 3. Core Components

### 3.1 NovaEngine (Orchestrator)

**File:** `src/services/ai_tutor/novaEngine.js`

**Responsibilities:**
- Entry point for all AI interactions
- Context preparation and mapping
- Error handling and retry logic
- Guardrail application
- Response post-processing

**Key Methods:**

```javascript
class NovaEngine {
  constructor(weekData, userProfile) { ... }
  
  async sendToNova({ mode, userMessage, chatHistory, context, skipGrammarGuard }) {
    // 1. Build context-aware prompt
    const systemPrompt = this.buildTutorContext(mode, context);
    
    // 2. Call AI with retry logic
    const rawResponse = await errorHandler.handleAIError(
      () => sendToAI({ systemPrompt, chatHistory, userMessage, ... })
    );
    
    // 3. Parse and validate
    const parsedResponse = responseParser.parseAIResponse(rawResponse);
    const validatedResponse = responseParser.validateResponse(parsedResponse, mode);
    
    // 4. Apply guardrails
    return this.applyGuardrails(validatedResponse, mode, context);
  }
  
  buildTutorContext(mode, contextParams) {
    // Maps UI mode names to tutor mode constants
    // Builds context object with week data, vocab, grammar rules
    // Calls buildPrompt() from tutorPrompts.js
  }
  
  extractVocabulary() {
    // Extracts vocab from weekData (supports multiple formats)
  }
  
  applyGuardrails(response, mode, context) {
    // Ensures response has required structure
    // Sanitizes content for security
    // Validates hints are provided
    // Adds fallback hints if needed
  }
}
```

### 3.2 Prompt Builder (AI Logic Core)

**File:** `src/services/ai_tutor/tutorPrompts.js`

**Responsibilities:**
- Builds intelligent, context-aware prompts
- Implements AI decision frameworks
- Enforces grammar progression
- Defines pedagogical strategies per mode

**Key Functions:**

```javascript
// Main entry point
export function buildPrompt(mode, context, userInput, options = {}) {
  const systemPrompt = buildSystemPrompt(context);
  const modePrompt = buildModePrompt(mode, context, userInput, options);
  return `${systemPrompt}\n\n${modePrompt}`;
}

// Universal teaching rules (applies to ALL modes)
function buildSystemPrompt(context) {
  // Returns:
  // - Teacher persona
  // - Week-specific grammar rules (strict)
  // - Production constraints (AI speaks less)
  // - Core pedagogical principles
}

// Week-specific grammar rules
function getGrammarRules(weekId) {
  // Returns allowed/banned grammar structures
  // Week 1: present simple only
  // Week 2: add has/have, family pronouns
  // Progressive complexity
}

// Mode dispatcher
function buildModePrompt(mode, context, userInput, options) {
  switch (mode) {
    case 'story_mission': return buildStoryMissionPrompt(...);
    case 'chat': return buildChatPrompt(...);
    case 'quiz': return buildQuizPrompt(...);
    case 'debate': return buildDebatePrompt(...);
  }
}
```

### 3.3 Tutor Modes & Constants

**File:** `src/services/ai_tutor/tutorModes.js`

**Defines:**

```javascript
// Mode types (teaching strategies)
export const TutorModes = {
  CHAT: 'chat',                    // Free talk
  PRONUNCIATION: 'pronunciation',   // Pronunciation practice
  STORY_MISSION: 'story_mission',  // Guided storytelling
  QUIZ: 'quiz',                    // Assessment
  DEBATE: 'debate'                 // Opinion sharing
};

// Scaffolding levels (support intensity)
export const ScaffoldLevel = {
  HINT_WORDS: 1,        // Just vocabulary hints
  SENTENCE_STARTER: 2,  // "You can say: I like..."
  MODEL_SENTENCE: 3,    // "Try this: I like cats."
  COPY_ONLY: 4         // Multiple choice
};

// Difficulty constraints (WOW pedagogy)
export const DifficultyConstraints = {
  easy: {
    aiMaxSentences: 1,
    aiMaxWords: 10,
    userMinWords: 3,
    userTargetWords: 7
  },
  normal: {
    aiMaxSentences: 2,
    aiMaxWords: 20,
    userMinWords: 6,
    userTargetWords: 12
  },
  challenge: {
    aiMaxSentences: 2,
    aiMaxWords: 25,
    userMinWords: 10,
    userTargetWords: 18
  }
};
```

---

## 4. AI-Driven Logic Explained

### 4.1 What Makes It "AI-Driven"?

Traditional systems use **decision trees** or **state machines**:
```
IF turn == 1 THEN ask_name()
IF turn == 2 THEN ask_age()
IF turn == 3 THEN ask_grade()
```

Ms. Nova uses **AI reasoning**:
```
GIVEN:
- Conversation history
- Mission objectives
- Target vocabulary
- Grammar scope
- Student's last response

AI DECIDES:
- What to acknowledge
- How to encourage
- What question to ask next
- What hints to provide
- When to close conversation
```

### 4.2 Decision Framework

Ms. Nova provides AI with a **decision framework**, not a script:

```javascript
// Story Mission Prompt (Ongoing Conversation)
return `You are Ms. Sarah continuing "${missionTitle}".

CONVERSATION HISTORY:
${historyText}
Student: ${userInput}

YOUR TURN - MAKE THESE DECISIONS:

1. CHECK: Did student make grammar/pronunciation errors?
   - If YES: Note the error in "feedback.correction"
   - If NO: Leave feedback empty

2. ACKNOWLEDGE what student said (be specific - use their words!)
   - Example: If student says "My name is Binh" → "Nice to meet you, Binh!"
   - Don't say generic "Good job" - say what was good

3. ENCOURAGE warmly
   - Celebrate effort, not just correctness
   - "That's a lovely name!" / "Eight years old, wonderful!"

4. DECIDE: What question to ask next?
   - Consider mission goal: ${missionGoal}
   - Consider target vocabulary: ${targetVocab}
   - Follow natural conversation flow
   - Build on student's previous answer
   
SUGGESTED TOPIC FLOW:
Name → Age → Teacher → Favorite subject → Friends → Classroom

BUT YOU DECIDE the exact progression based on conversation!`;
```

**Key Point:** AI is given **guidance**, not **commands**. It chooses the best next question based on context.

### 4.3 Context Awareness

Before every response, AI receives:

```javascript
// 1. System Context (universal rules)
{
  weekId: 1,
  unitTitle: "The Young Scholar",
  topic: "School & Learning",
  grammarRules: {
    allowed: ['present simple: I am, you are', 'where is/are', 'my/your'],
    banned: ['past tense', 'future', 'perfect tense']
  },
  constraints: {
    aiMaxWords: 25,      // AI speaks less
    userMinWords: 5      // Student speaks more
  }
}

// 2. Conversation History (recent 6 messages)
[
  { role: 'assistant', content: 'Hello! What is your name?' },
  { role: 'user', content: 'My name is Alex.' },
  { role: 'assistant', content: 'Nice to meet you, Alex! How old are you?' },
  { role: 'user', content: 'I am 8.' },
  { role: 'assistant', content: 'Eight years old! Are you a student?' },
  { role: 'user', content: 'Yes.' }
]

// 3. Current User Input
"I like school"

// 4. Mission Context (for story mode)
{
  title: "First Day at School",
  description: "Learn to introduce yourself and talk about school",
  targetVocabulary: ['student', 'teacher', 'school', 'backpack', 'book'],
  turnNumber: 4
}
```

**AI Analyzes:**
- What has been discussed already
- What vocabulary hasn't been used yet
- What grammar structures are appropriate
- How engaged the student is
- What natural follow-up question makes sense

**AI Generates:**
- Contextual acknowledgment
- Appropriate encouragement
- Next intelligent question
- Helpful hints for student

### 4.4 Natural Flow vs. Scripted Flow

**Example Comparison:**

**SCRIPTED (Bad):**
```
Turn 1: "What is your name?"
Student: "My name is Alex."

Turn 2: "How old are you?"
Student: "I like pizza."

Turn 3: "What grade are you in?"  ← Ignores "pizza" comment
Student: "I don't understand."

Turn 4: "Do you like school?"     ← Still following script
```

**AI-DRIVEN (Good):**
```
Turn 1: "What is your name?"
Student: "My name is Alex."

Turn 2: AI decides → "Nice to meet you, Alex! How old are you?"
Student: "I like pizza."

Turn 3: AI adapts → "Pizza! That's yummy! But Alex, can you tell me how old you are?"
Student: "I am 8."

Turn 4: AI continues → "Eight years old! Do you like pizza at your school lunch?"
                       ← Connected student's interest (pizza) to mission (school)
```

**Key Difference:** AI **listens** and **adapts**, doesn't blindly follow script.

---

## 5. Grammar Progression System

### 5.1 Week-by-Week Grammar Scope

Ms. Nova enforces **strict grammar scope** based on curriculum week:

```javascript
function getGrammarRules(weekId) {
  const rules = {
    1: {
      allowed: [
        'present simple: I am, you are', 
        'where is/are', 
        'my/your', 
        'this is'
      ],
      banned: [
        'past tense (was/were/did/-ed)', 
        'future (will/going to)', 
        'perfect tense', 
        'complex clauses'
      ]
    },
    2: {
      allowed: [
        'present simple', 
        'has/have', 
        'family pronouns (my/your/his/her)'
      ],
      banned: [
        'past tense', 
        'future', 
        'conditionals'
      ]
    },
    3: {
      allowed: [
        'present simple', 
        'can/can\'t', 
        'I like/don\'t like'
      ],
      banned: [
        'past tense', 
        'future', 
        'perfect tense'
      ]
    }
    // ... more weeks
  };
  
  // Default for undefined weeks
  if (!rules[weekId]) {
    return weekId <= 14 ? rules[1] : {
      allowed: ['present simple', 'basic structures'],
      banned: ['complex grammar']
    };
  }
  
  return rules[weekId];
}
```

### 5.2 How Grammar Scope is Enforced

**In Prompts:**
```
GRAMMAR SCOPE (STRICT - Week 1):
✅ Allowed: present simple: I am, you are | where is/are | my/your | this is
❌ Banned: past tense (was/were/did/-ed) | future (will/going to) | perfect tense
```

**In Grammar Guard (aiRouter.js):**
```javascript
// Before sending AI response to student
const grammarCheck = validateAIResponse({
  aiResponse: "You went to school yesterday?",  // ← Uses past tense
  weekId: 1,                                     // ← Week 1 = present simple only
  mode: 'story'
});

// grammarCheck.isValid === false
// grammarCheck.violations = ['past tense: went']
// System blocks response, requests regeneration
```

### 5.3 Progressive Complexity

```
Week 1-4:   Present Simple only
            "I am a student."
            "You are my teacher."
            
Week 5-8:   Add Present Continuous
            "I am reading a book."
            "She is playing."
            
Week 9-12:  Add Simple Past
            "I went to school yesterday."
            "We played soccer."
            
Week 13+:   Complex structures gradually introduced
```

**Philosophy:** Build strong foundation before adding complexity.

---

## 6. Mode-Specific Intelligence

### 6.1 Story Mission Mode (AI-Driven Storytelling)

**Objective:** Guide student through immersive story missions using target vocabulary naturally.

#### Opening Turn Logic

```javascript
if (turnNumber === 1) {
  return `You are Ms. Sarah starting the "${missionTitle}" mission.

MISSION GOAL: ${missionGoal}
TARGET VOCABULARY: ${targetVocab}
GRAMMAR: ${grammarRules.allowed.join(' | ')}

Start the conversation:
1. Greet warmly
2. Introduce yourself
3. Ask ONE opening question related to: ${missionTitle}

Return JSON:
{
  "story_beat": "Warm greeting (1 sentence)",
  "task": "Opening question (1 simple question)",
  "scaffold": {
    "hints": ["Expected", "answer", "words"]
  }
}`;
}
```

**AI decides:**
- How to greet warmly (natural variety)
- What opening question fits mission context
- What hints would help student respond

**Example outputs:**
```json
// Mission: "First Day at School"
{
  "story_beat": "Hello! Welcome to your first day at school!",
  "task": "I am Ms. Sarah, your teacher. What is your name?",
  "scaffold": { "hints": ["My", "name", "is"] }
}

// OR (AI variety)
{
  "story_beat": "Good morning! I'm so happy to meet you!",
  "task": "My name is Ms. Sarah. What's your name?",
  "scaffold": { "hints": ["I", "am", "name"] }
}
```

#### Ongoing Conversation Logic

```javascript
// After turn 1, AI gets full decision framework
return `You are Ms. Sarah continuing "${missionTitle}".

CONVERSATION HISTORY:
${historyText}        // Last 6 messages
Student: ${userInput}  // What student just said

YOUR TURN - DECISION FRAMEWORK:

1. CHECK: Did student make errors?
   If "I have 9 age" → Note correction needed
   
2. ACKNOWLEDGE specifically
   If student says "My name is Binh" 
   → Say "Nice to meet you, Binh!" (use name)
   → NOT generic "Good job"
   
3. ENCOURAGE warmly
   → "That's a lovely name!"
   → "Eight years old, wonderful!"
   
4. DECIDE next question
   Mission goal: ${missionGoal}
   Target vocab: ${targetVocab}
   
   SUGGESTED FLOW:
   Name → Age → Teacher → Favorite subject → Friends
   
   BUT you decide based on conversation!
   Build on what student said.
   
GRAMMAR: Only use ${grammarRules.allowed}
NO: ${grammarRules.banned}`;
```

**AI reasoning example:**

```
Student said: "My name is Alex."

AI thinks:
- ✅ Student used correct grammar (My name is...)
- ✅ Student answered the question
- ✅ "Alex" is the name
- → Acknowledge: Use the name "Alex"
- → Encourage: Compliment the name
- → Next question: What hasn't been asked? → Age
- → Connect: Keep conversation flowing naturally

AI generates:
{
  "story_beat": "Nice to meet you, Alex! That's a lovely name!",
  "task": "How old are you, Alex?",
  "scaffold": { "hints": ["I", "am", "years", "old"] }
}
```

#### Error Handling (Recast)

```javascript
// Student makes error
Student: "I have 9 age."

AI receives:
"Student said: 'I have 9 age'"

AI generates:
{
  "story_beat": "I understand you're 9! That's a great age!",
  "task": "How old are you?",  // Asks again gently
  "scaffold": {
    "hints": ["I", "am", "9", "years", "old"]
  },
  "feedback": {
    "correction": "Try: 'I am 9 years old' (not 'I have 9 age')",
    "grammar_note": "We use 'I am __ years old' to talk about age"
  }
}
```

**Notice:** AI models correct form ("you're 9") without saying "wrong".

### 6.2 Chat/Free Talk Mode (Natural Conversation)

**Objective:** Practice natural conversation with gentle guidance.

#### Key Characteristics

```javascript
function buildChatPrompt(context, userInput, options) {
  const history = options.history || [];
  const historyText = history.slice(-6).map(m => 
    `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`
  ).join('\n');
  
  return `Scenario: ${scenario}
Topic: ${context.topic}
Core vocabulary: ${context.coreVocab.slice(0, 5).join(', ')}

Grammar scope: ${grammarRules.allowed.join(' | ')}

${historyText}
Student: ${userInput}

Respond naturally in 1 short sentence (present simple only).
Ask 1 simple question about "${context.topic}".

Tutor:`;
}
```

**AI decisions:**
- Natural acknowledgment of student input
- One short sentence (keep it conversational)
- One simple question related to topic
- Use target vocabulary naturally

**Example flow:**

```
Topic: "Hobbies & Activities"
Vocab: ['play', 'read', 'watch', 'game', 'book']

Tutor: "Hi! What do you like to do after school?"
Student: "I play games."

AI decides:
- Acknowledge: "Games! Fun!"
- Ask related: "What games do you like?"

Output: "Games! Fun! What games do you like?"

Student: "I like soccer."

AI decides:
- Acknowledge: "Soccer is great!"
- Ask related: "Who do you play soccer with?"

Output: "Soccer is great! Who do you play soccer with?"
```

**Key difference from Story Mission:**
- Less structured (no mission objectives)
- Student-led conversation
- More casual, less pedagogical
- Still grammar-scoped

### 6.3 Quiz Mode (Assessment)

```javascript
function buildQuizPrompt(context, options) {
  const problemTypes = ['multiple-choice', 'fill-blank', 'true-false'];
  
  return `Generate 1 quiz problem for Week ${context.weekId}: "${context.topic}"

Vocabulary pool: ${context.coreVocab.slice(0, 8).join(', ')}
Problem type: ${problemTypes[Math.floor(Math.random() * problemTypes.length)]}

Return JSON:
{
  "question": "Question text",
  "correct_answer": "Correct answer",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "explanation": "Why this is correct",
  "hint": "Scaffold hint if student struggles"
}`;
}
```

**AI decides:**
- Question difficulty appropriate for week
- Distractors that make sense
- Clear explanation
- Helpful hint

**Example:**

```json
{
  "question": "I ___ a student.",
  "correct_answer": "am",
  "options": ["am", "is", "are", "be"],
  "explanation": "We use 'am' with 'I'. I am, you are, he/she is.",
  "hint": "Think about 'I'. What do we say? I ___."
}
```

### 6.4 Debate Mode (Opinion Sharing)

```javascript
function buildDebatePrompt(context, userInput, options) {
  const topic = options.debateTopic || 'Should students have homework?';
  const history = options.debateHistory || [];
  
  return `Debate topic: "${topic}"
Week ${context.weekId} level: ${context.learner.level}

${historyText}
Student: ${userInput}

Respond with counter-argument or follow-up (2-3 sentences).
Ask 1 question to continue debate.

Tutor:`;
}
```

**AI decides:**
- Whether to agree or disagree (friendly debate)
- How to present counter-argument age-appropriately
- What follow-up question deepens thinking

**Example:**

```
Topic: "Cats vs. Dogs"

Tutor: "I think cats are better pets. What do you think?"
Student: "I like dogs."

AI decides:
- Acknowledge opinion respectfully
- Present gentle counter-view
- Ask reasoning question

Output: "Dogs are great! But cats are quiet and clean. Why do you like dogs?"

Student: "Dogs play with me."

AI decides:
- Acknowledge point
- Concede validity
- Continue friendly debate

Output: "That's true! Dogs love to play. But cats can play too! Do you have a dog?"
```

---

## 7. Pedagogical Techniques

### 7.1 Recast Technique

**Definition:** Model correct form naturally without explicit correction.

**Implementation:**

```javascript
// Student error detection in prompt
"1. CHECK: Did student make grammar/pronunciation errors?
   - If YES: Note the error in 'feedback.correction'
   - If NO: Leave feedback empty"

// Recast in acknowledgment
"2. ACKNOWLEDGE what student said
   - If error: Model correct form naturally
   - Example: Student 'I have 9 age' → You 'You are 9 years old!'"
```

**Examples:**

```
Student: "I go school yesterday."
AI: "You went to school yesterday? What did you learn?"
    ↑ Models "went" naturally, doesn't say "wrong"

Student: "My favorite is play football."
AI: "Your favorite activity is playing football! That's awesome!"
    ↑ Models "playing" naturally

Student: "I like cat."
AI: "You like cats! They're so cute!"
    ↑ Models plural naturally
```

**Why Recast?**
- Preserves student confidence
- Provides correct model without shame
- Research-backed effective technique
- Natural language acquisition method

### 7.2 Elicitation

**Definition:** Ask questions that naturally elicit target vocabulary.

**Implementation in Prompts:**

```javascript
// In Story Mission prompt
"4. DECIDE next question
   Mission goal: ${missionGoal}
   Target vocab: ${targetVocab}
   
   Ask questions that naturally elicit these words"
```

**Examples:**

```
Target vocab: ['backpack', 'book', 'notebook']

❌ Bad elicitation: "Do you know what a backpack is?"
✅ Good elicitation: "What do you carry your books in?"
   → Student answers: "A backpack"
   → Vocabulary acquired naturally

❌ Bad: "Can you say 'teacher'?"
✅ Good: "Who helps you learn at school?"
   → Student: "My teacher"
   → Meaningful use

❌ Bad: "The word is 'classroom'. Say it."
✅ Good: "Where do you study with your friends?"
   → Student: "In my classroom"
   → Contextual learning
```

### 7.3 Scaffolding (Adaptive Support)

**Definition:** Provide support adjusted to student need level.

**Levels:**

```javascript
export const ScaffoldLevel = {
  HINT_WORDS: 1,        // Lowest support
  SENTENCE_STARTER: 2,  // Gentle support
  MODEL_SENTENCE: 3,    // More support
  COPY_ONLY: 4         // Maximum support
};
```

**Level 1: Hint Words**
```
Question: "What is your favorite subject?"
Hints: ["My", "favorite", "subject", "is", "math", "English"]

Student constructs: "My favorite subject is math."
```

**Level 2: Sentence Starter**
```
Question: "What do you like to do?"
Scaffold: "You can say: I like to ___."

Student completes: "I like to read books."
```

**Level 3: Model Sentence**
```
Question: "Tell me about your teacher."
Scaffold: "Try this: My teacher is kind."

Student can copy or modify: "My teacher is nice."
```

**Level 4: Copy Only (Multiple Choice)**
```
Question: "Do you like school?"
Options: [A] Yes, I like school. [B] No, I don't like school.

Student selects: A
```

**Dynamic Adjustment:**

```javascript
// In prompt
"SCAFFOLDING RULES:
- If student answers confidently → Level 1 (hint words)
- If student hesitates → Level 2 (sentence starter)
- If student struggles 2+ turns → Level 3 (model)
- If student very shy → Level 4 (choices)"
```

### 7.4 Production-Oriented Teaching

**Philosophy:** Student must speak MORE than the AI.

**Implementation:**

```javascript
// In system prompt
"CORE RULES:
- Force student language production (student must speak/write more than you)
- Your response: MAX ${constraints.aiMaxSentences} sentences, MAX ${constraints.aiMaxWords} words
- Student target: ${constraints.userMinWords}-${constraints.userTargetWords} words"

// Difficulty levels
const DifficultyConstraints = {
  easy: {
    aiMaxWords: 10,        // AI speaks little
    userTargetWords: 7     // Student speaks more
  },
  normal: {
    aiMaxWords: 20,
    userTargetWords: 12
  },
  challenge: {
    aiMaxWords: 25,
    userTargetWords: 18
  }
};
```

**Enforcement:**

```javascript
// Talk Ratio Guard (in aiRouter.js)
const aiWords = countWords(aiResponse);
const studentWords = countWords(userMessage);
const ratio = aiWords / studentWords;

if (ratio > 0.8) {
  console.warn('AI speaking too much!');
  // Request shorter AI response
}
```

**Example:**

```
❌ Bad (AI talks too much):
Student: "I like school." (3 words)
AI: "That's wonderful! School is such a great place to learn new things, make friends, and discover exciting subjects. I'm so happy to hear that you enjoy going to school every day! What is your favorite thing about school?" (37 words)
Ratio: 37/3 = 12.3 ❌ Way too much!

✅ Good (production-oriented):
Student: "I like school." (3 words)
AI: "Great! What do you like most about school?" (8 words)
Ratio: 8/3 = 2.67 ✅ Still higher, but reasonable for a question

✅ Better (forces production):
Student: "I like school." (3 words)
AI: "Why?" (1 word)
Student forced to elaborate: "Because I like my teacher and I learn math." (9 words)
```

---

## 8. Scaffolding & Adaptation

### 8.1 Hint Generation System

Ms. Nova provides **intelligent hints** that help students construct answers.

**Rules for Hint Generation:**

```javascript
// In Story Mission prompt
"HINT GENERATION RULES:
1. Provide 4-6 words that help answer YOUR question
2. Include both answer options and connecting words
3. Scramble order - not sentence order
4. Must include specific answer possibilities

Examples:
- You ask 'What is your favorite color?'
  → hints: ['My', 'favorite', 'is', 'blue', 'red', 'green']
  
- You ask 'How old are you?'
  → hints: ['I', 'am', 'years', 'old', 'eight', 'ten']
  
- You ask 'Do you have a backpack?'
  → hints: ['Yes', 'I', 'have', 'do', 'backpack', 'my']"
```

**AI decides hint content based on question:**

```javascript
// Example AI reasoning
Question: "What is your favorite subject?"

AI thinks:
- Student needs: Subject names (math, English, science)
- Student needs: Connecting words (My, favorite, is)
- Scramble them

Hints generated: ["My", "favorite", "subject", "is", "math", "English", "science"]

Student can construct:
- "My favorite subject is math."
- "My favorite subject is English."
- etc.
```

### 8.2 Adaptive Response to Student Performance

**Silent Student (No Response):**

```javascript
// In prompt guidance
"If student doesn't speak enough, USE SCAFFOLD (don't answer for them)"

// AI response example
{
  "story_beat": "Take your time! I'm listening.",
  "task": "Can you tell me your name? You can say: My name is ___.",
  "scaffold": {
    "hints": ["My", "name", "is"],
    "level": 2  // Sentence starter
  }
}
```

**Struggling Student (Multiple Errors):**

```javascript
// After 2-3 turns of struggle
{
  "story_beat": "It's okay! Let's try together.",
  "task": "Is your name Alex or Maria?",  // Multiple choice
  "scaffold": {
    "hints": ["My", "name", "is", "Alex", "Maria"],
    "level": 4  // Copy only
  }
}
```

**Confident Student (Correct Answers):**

```javascript
// Reduce scaffolding
{
  "story_beat": "Excellent! You're doing great!",
  "task": "Tell me about your favorite thing at school.",  // Open-ended
  "scaffold": {
    "hints": ["like", "favorite", "teacher", "book"],  // Minimal hints
    "level": 1
  }
}
```

### 8.3 Conversation Flow Adaptation

**Example: AI adapts to student interest**

```
Planned flow: Name → Age → Teacher → Subject

Actual conversation:

Turn 1: "What is your name?"
Student: "My name is Alex."

Turn 2 (planned): "How old are you?"
Student: "I am 8 and I like dinosaurs!"

Turn 3 (AI adapts): "Dinosaurs! That's so cool! What is your favorite dinosaur?"
                     ↑ Follows student's interest instead of rigid plan

Student: "T-Rex!"

Turn 4 (AI connects back): "T-Rex is awesome! Do you learn about dinosaurs at school?"
                            ↑ Brings conversation back to mission (school)
                            ↑ But maintains student's engagement (dinosaurs)
```

**Key principle:** Follow student interest while guiding toward learning objectives.

---

## 9. Quality Control & Guardrails

### 9.1 Grammar Guard

**Purpose:** Ensure AI doesn't use banned grammar structures.

**File:** `src/services/ai_tutor/grammarGuard.js`

**Flow:**

```javascript
// Before response reaches student
function validateAIResponse({ aiResponse, weekId, mode }) {
  const grammarRules = getGrammarRules(weekId);
  const violations = [];
  
  // Check for banned patterns
  grammarRules.banned.forEach(pattern => {
    if (detectPattern(aiResponse, pattern)) {
      violations.push(pattern);
    }
  });
  
  return {
    isValid: violations.length === 0,
    violations: violations
  };
}

// If invalid, request regeneration
if (!validation.isValid) {
  console.warn(`Grammar violations: ${validation.violations}`);
  // Request AI to regenerate with stricter prompt
}
```

**Example:**

```
Week 1 Response: "You went to school yesterday?"
Grammar Guard: ❌ BLOCKED
Reason: "went" is past tense, Week 1 allows only present simple
Action: Request regeneration

Regenerated: "Do you go to school every day?"
Grammar Guard: ✅ APPROVED
Reason: Uses present simple "go"
```

### 9.2 Talk Ratio Guard

**Purpose:** Ensure AI doesn't dominate conversation.

**File:** `src/services/ai_tutor/talkRatioGuard.js`

**Implementation:**

```javascript
function enforceTalkRatio({ aiResponse, userMessage, turnCount }) {
  const MIN_STUDENT_WORDS = turnCount < 5 ? 3 : 10;  // Lenient early, strict later
  const MAX_AI_WORDS = 25;
  
  const studentWords = countWords(userMessage);
  const aiWords = countWords(aiResponse);
  
  // Check if student spoke enough
  if (studentWords < MIN_STUDENT_WORDS) {
    return {
      needsScaffolding: true,
      message: "Student needs more encouragement to speak"
    };
  }
  
  // Check if AI spoke too much
  if (aiWords > MAX_AI_WORDS) {
    return {
      needsTruncation: true,
      suggestion: truncateResponse(aiResponse, MAX_AI_WORDS)
    };
  }
  
  return { valid: true };
}
```

### 9.3 Response Parser & Validator

**Purpose:** Ensure AI response has correct structure.

**File:** `src/services/ai_tutor/utils/responseParser.js`

**Functions:**

```javascript
// Parse AI response (handles multiple formats)
parseAIResponse(rawResponse) {
  // Try JSON parse
  if (isJSON(rawResponse)) {
    return JSON.parse(rawResponse);
  }
  
  // Try extract JSON from text
  const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  // Fallback: Treat as plain text
  return { ai_response: rawResponse };
}

// Validate structure
validateResponse(response, mode) {
  if (mode === 'story') {
    // Must have story_beat and task
    if (!response.story_beat || !response.task) {
      throw new Error('Story response missing required fields');
    }
  }
  
  // Must have some response text
  if (!response.ai_response && !response.story_beat) {
    throw new Error('Response has no content');
  }
  
  return response;
}

// Extract hints from question if AI didn't provide
extractHintsFromQuestion(question, fallbackHints) {
  // Smart extraction logic
  // Returns words that would help answer the question
}

// Sanitize response (security)
sanitizeResponse(text) {
  // Remove potential XSS
  // Remove markdown that might break TTS
  // Clean up formatting
  return cleanText;
}

// Format for text-to-speech
formatForTTS(text) {
  // Remove emojis (TTS reads them aloud)
  // Expand abbreviations
  // Add appropriate pauses
  return ttsText;
}
```

### 9.4 Error Handler & Retry Logic

**Purpose:** Handle API failures gracefully.

**File:** `src/services/ai_tutor/utils/errorHandler.js`

**Implementation:**

```javascript
// Retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000;  // 1s, 2s, 4s
      await sleep(delay);
    }
  }
}

// Fallback responses by mode
getFallbackResponse(mode, error) {
  const fallbacks = {
    story: {
      ai_response: "That's interesting! Tell me more.",
      pedagogy_note: "Fallback response",
      suggested_hints: ["Tell", "me", "more", "about", "it"]
    },
    freetalk: {
      ai_response: "I'd love to hear more about that!",
      pedagogy_note: "Fallback response",
      suggested_hints: ["I", "like", "it", "because"]
    }
  };
  
  return fallbacks[mode] || fallbacks.freetalk;
}

// User-friendly error messages
const ERROR_MESSAGES = {
  NETWORK_ERROR: "Let's try that again. Connection issue.",
  QUOTA_EXCEEDED: "Taking a short break. Please try again in a moment.",
  INVALID_RESPONSE: "Let me think about that differently..."
};
```

---

## 10. Examples & Use Cases

### 10.1 Complete Story Mission Conversation

```
CONTEXT:
- Week: 1 (The Young Scholar)
- Mission: "First Day at School - Self-Introduction"
- Target Vocab: student, teacher, school, backpack, book, notebook, name, age
- Grammar: Present simple only

CONVERSATION:
---

Turn 1:
AI: {
  "story_beat": "Hello! Welcome to your first day at school!",
  "task": "I am Ms. Sarah, your teacher. What is your name?",
  "scaffold": { "hints": ["My", "name", "is"] }
}

Display: "Hello! Welcome to your first day at school! I am Ms. Sarah, your teacher. What is your name?"
Hints shown: [My] [name] [is]

Student types: "My name is Alex."

---

Turn 2:
AI analyzes:
- ✅ Student used correct grammar
- ✅ Student answered the question
- → Acknowledge: Use student's name
- → Encourage: Compliment
- → Next: Ask age (natural progression)

AI: {
  "story_beat": "Nice to meet you, Alex! That's a lovely name!",
  "task": "How old are you, Alex?",
  "scaffold": { "hints": ["I", "am", "years", "old", "eight", "nine"] }
}

Display: "Nice to meet you, Alex! That's a lovely name! How old are you, Alex?"
Hints shown: [I] [am] [years] [old] [eight] [nine]

Student types: "I have 8 age."  ← ERROR

---

Turn 3:
AI analyzes:
- ❌ Student made grammar error ("I have 8 age")
- ✅ Student attempted to answer
- → Recast: Model correct form naturally
- → Ask again gently
- → Provide better hints

AI: {
  "story_beat": "I understand you're 8! That's a great age for learning!",
  "task": "Can you tell me again? How old are you?",
  "scaffold": { 
    "hints": ["I", "am", "8", "years", "old"] 
  },
  "feedback": {
    "correction": "Try: 'I am 8 years old' (not 'I have 8 age')",
    "grammar_note": "We use 'I am' with age, not 'I have'"
  }
}

Display: "I understand you're 8! That's a great age for learning! Can you tell me again? How old are you?"
Hints shown: [I] [am] [8] [years] [old]
(Feedback shown to teacher dashboard, not student)

Student types: "I am 8 years old."

---

Turn 4:
AI analyzes:
- ✅ Student corrected the error
- ✅ Used correct grammar now
- → Celebrate: Praise the correction
- → Progress: Next topic (student status)

AI: {
  "story_beat": "Perfect, Alex! Eight years old! You're doing great!",
  "task": "Are you a student here at this school?",
  "scaffold": { "hints": ["Yes", "I", "am", "a", "student"] }
}

Display: "Perfect, Alex! Eight years old! You're doing great! Are you a student here at this school?"
Hints shown: [Yes] [I] [am] [a] [student]

Student types: "Yes."  ← Very short

---

Turn 5:
AI analyzes:
- ✅ Student answered correctly
- ⚠️ But very short response
- → Acknowledge answer
- → Encourage elaboration with scaffolding
- → Introduce target vocab: backpack

AI: {
  "story_beat": "Yes! You are a student! Students bring things to school.",
  "task": "Do you have a backpack for school?",
  "scaffold": { 
    "hints": ["Yes", "I", "have", "a", "backpack", "my"] 
  }
}

Display: "Yes! You are a student! Students bring things to school. Do you have a backpack for school?"
Hints shown: [Yes] [I] [have] [a] [backpack] [my]

Student types: "Yes, I have a backpack."

---

Turn 6:
AI analyzes:
- ✅ Good full sentence!
- ✅ Used target vocab "backpack"
- → Praise: Acknowledge full sentence
- → Follow up: Ask about backpack (elicit more vocab)

AI: {
  "story_beat": "Wonderful! I like that you said a full sentence!",
  "task": "What color is your backpack, Alex?",
  "scaffold": { 
    "hints": ["My", "backpack", "is", "blue", "red", "green"] 
  }
}

Display: "Wonderful! I like that you said a full sentence! What color is your backpack, Alex?"
Hints shown: [My] [backpack] [is] [blue] [red] [green]

Student types: "My backpack is blue."

---

Turn 7:
AI analyzes:
- ✅ Excellent sentence structure
- ✅ Color vocabulary used correctly
- → Connect to mission: What's in backpack? (elicit: book, notebook)

AI: {
  "story_beat": "Blue is a nice color! Backpacks carry important things.",
  "task": "What do you have in your backpack?",
  "scaffold": { 
    "hints": ["I", "have", "a", "book", "notebook", "my", "in"] 
  }
}

... continues for 10+ turns ...

Turn 12: (Closing)
AI analyzes:
- ✅ Minimum turns reached (10+)
- ✅ Target vocab practiced (80%)
- → Close conversation warmly
- → Summarize what was learned

AI: {
  "story_beat": "You did an amazing job today, Alex! You told me your name, your age, and all about your school things!",
  "task": "Great work! I'm proud of you! See you next time!",
  "mission_status": "completed"
}

Display: "You did an amazing job today, Alex! You told me your name, your age, and all about your school things! Great work! I'm proud of you! See you next time!"
```

**Key Observations:**
- ✅ AI never repeated questions
- ✅ AI adapted to student errors (Turn 3)
- ✅ AI encouraged longer responses (Turn 5)
- ✅ AI built on previous answers
- ✅ AI naturally introduced target vocabulary
- ✅ Grammar scope maintained (present simple only)
- ✅ 12 turns (minimum 10 reached)

### 10.2 Free Talk Conversation Example

```
CONTEXT:
- Mode: Free Talk
- Topic: "Hobbies & Free Time"
- Grammar: Present simple
- Turns: 8-14 maximum

CONVERSATION:
---

Turn 1:
AI: "Hi! How are you today?"
Student: "I am good."

Turn 2:
AI decides: Acknowledge, ask about activities
AI: "That's nice! What do you like to do after school?"
Student: "I play games."

Turn 3:
AI decides: Follow student's interest (games)
AI: "Games! Fun! What games do you like?"
Student: "I like soccer and tag."

Turn 4:
AI decides: Dig deeper on specific game
AI: "Soccer and tag are great! Who do you play soccer with?"
Student: "I play with my friends."

Turn 5:
AI decides: Explore friendship
AI: "Nice! Do you have a best friend?"
Student: "Yes, his name is Tom."

Turn 6:
AI decides: Connect back to activities
AI: "Tom sounds fun! What do you and Tom do together?"
Student: "We play and watch TV."

Turn 7:
AI decides: Explore watching (new vocab)
AI: "What do you like to watch on TV?"
Student: "Cartoons."

Turn 8:
AI decides: Get specific
AI: "Cartoons! What is your favorite cartoon?"
Student: "SpongeBob."

... continues to Turn 14 ...

Turn 14: (Mandatory close)
AI: "I loved talking with you! I learned you like soccer, play with Tom, and watch SpongeBob! Keep practicing English! See you next time!"
```

**Key Observations:**
- ✅ AI followed student's interests naturally
- ✅ Each question built on previous answer
- ✅ Topics flowed naturally (games → friends → TV)
- ✅ No repeated questions
- ✅ Closed at turn 14 (mandatory limit)

---

## 11. Configuration & Customization

### 11.1 Adding New Weeks to Grammar Progression

```javascript
// In tutorPrompts.js
function getGrammarRules(weekId) {
  const rules = {
    1: { 
      allowed: ['present simple: I am, you are', ...],
      banned: ['past tense', ...]
    },
    2: { 
      allowed: ['present simple', 'has/have', ...],
      banned: ['past tense', ...]
    },
    // Add new week here:
    3: {
      allowed: ['present simple', 'has/have', 'can/can\'t'],
      banned: ['past tense', 'future', 'perfect tense']
    },
    4: {
      allowed: ['present simple', 'has/have', 'can/can\'t', 'prepositions (in/on/under)'],
      banned: ['past tense', 'future']
    }
    // ... add more weeks
  };
  
  if (!rules[weekId]) {
    // Fallback for undefined weeks
    return weekId <= 14 ? rules[1] : {
      allowed: ['present simple', 'basic structures'],
      banned: ['complex grammar']
    };
  }
  
  return rules[weekId];
}
```

### 11.2 Adjusting Difficulty Constraints

```javascript
// In tutorModes.js
export const DifficultyConstraints = {
  easy: {
    aiMaxSentences: 1,    // Adjust: AI sentence limit
    aiMaxWords: 10,       // Adjust: AI word limit
    userMinWords: 3,      // Adjust: Student minimum
    userTargetWords: 7,   // Adjust: Student target
    pronMaxWordLen: 6     // Adjust: Max word length for pronunciation
  },
  normal: {
    aiMaxSentences: 2,
    aiMaxWords: 20,
    userMinWords: 6,
    userTargetWords: 12,
    pronMaxWordLen: 10
  },
  challenge: {
    aiMaxSentences: 2,
    aiMaxWords: 25,
    userMinWords: 10,
    userTargetWords: 18,
    pronMaxWordLen: 15
  }
};
```

### 11.3 Customizing Mode Prompts

```javascript
// In tutorPrompts.js

// Add new mode
export const TutorModes = {
  // ... existing modes
  READING: 'reading',  // New mode
};

// Add mode-specific prompt builder
function buildReadingPrompt(context, userInput, options) {
  const passage = options.passage || '';
  
  return `You are Ms. Sarah helping with reading comprehension.

PASSAGE:
"${passage}"

STUDENT SAID: "${userInput}"

Ask 1 comprehension question about the passage.
Keep it simple for ${context.learner.level} level.

Return JSON:
{
  "question": "Your comprehension question",
  "expected_answer": "What you expect student to say",
  "hints": ["Words", "to", "help"]
}`;
}

// Add to mode dispatcher
function buildModePrompt(mode, context, userInput, options) {
  switch (mode) {
    case TutorModes.CHAT:
      return buildChatPrompt(context, userInput, options);
    case TutorModes.STORY_MISSION:
      return buildStoryMissionPrompt(context, userInput, options);
    case TutorModes.READING:  // New mode
      return buildReadingPrompt(context, userInput, options);
    // ... other modes
  }
}
```

### 11.4 Adjusting Turn Limits

```javascript
// In Story Mission prompt
const STORY_MIN_TURNS = 10;  // Adjust minimum turns
const STORY_MAX_TURNS = 15;  // Adjust maximum turns

// In Free Talk prompt
const FREETALK_MIN_TURNS = 8;   // Adjust minimum
const FREETALK_MAX_TURNS = 14;  // Adjust maximum
const FREETALK_MANDATORY_CLOSE = 14;  // Adjust mandatory close

// Usage in prompt
`CONVERSATION RULES:
- Continue for at least ${STORY_MIN_TURNS} turns
- Do not exceed ${STORY_MAX_TURNS} turns
- Close conversation when vocabulary practiced 80%+`
```

---

## 🎯 Summary: What Makes Ms. Nova "AI-Driven"?

1. **Context Awareness**: AI reads and analyzes conversation history before every response
2. **Dynamic Decision Making**: AI chooses next question based on context, not script
3. **Grammar Intelligence**: Week-specific rules strictly enforced
4. **Adaptive Responses**: AI adjusts to student performance (errors, silence, confidence)
5. **Natural Flow**: Conversations progress organically, following student interest
6. **Pedagogical Techniques**: Recast, elicitation, scaffolding applied intelligently
7. **Quality Control**: Multiple guardrails ensure appropriate, safe responses

**Bottom Line:** Ms. Nova is a **pedagogical AI** that makes teaching decisions in real-time, not a scripted chatbot that follows predetermined paths. Every response is intelligently generated based on accumulated context, mission objectives, grammar scope, and student performance.
