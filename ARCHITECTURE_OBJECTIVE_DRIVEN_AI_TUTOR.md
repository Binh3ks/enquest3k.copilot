# 🏗️ Objective-Driven AI Tutor Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STORY MISSION UI LAYER                             │
│                       (StoryMissionTab.jsx)                                  │
└────────────────┬─────────────────────────────────────────────────────────────┘
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
                 ├─→ [Build Context Object]
                 │   ├─ studentInputType
                 │   ├─ turnDecision
                 │   ├─ currentObjective
                 │   ├─ instruction
                 │   └─ ... other context
                 │
                 ├─→ novaEngine.sendToNova(context)
                 │   │
                 │   └─→ [AI Processes Context]
                 │       ├─ Instruction: "ANSWER_STUDENT_THEN_BRIDGE_BACK"
                 │       ├─ Current Objective: {goal, context, required_info}
                 │       └─ Generates Response
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

┌─────────────────────────────────────────────────────────────────────────────┐
│                      TURN MANAGER STATE MACHINE                              │
│                   (src/services/ai_tutor/turnManager.js)                     │
│                                                                               │
│  Core Behavior: Deterministic conversation flow management                  │
│  - Tracks: totalTurns, currentObjectiveIndex, askedSteps                    │
│  - Ensures: No repeated questions, syllabus coverage, reasonable limits     │
│  - Enforces: Hard limit (15 turns), soft limit (10 turns minimum)           │
│                                                                               │
│  processTurn(studentInputType) State Machine:                                │
│                                                                               │
│    INPUT TYPES:                                                              │
│    ┌─────────────────────────────────────────────────────────────────┐      │
│    │ QUESTION: Student is asking AI a question                       │      │
│    │ ANSWER:   Student is answering AI's question                    │      │
│    │ OFF_TOPIC: Student message is off-topic/irrelevant              │      │
│    └─────────────────────────────────────────────────────────────────┘      │
│                                                                               │
│    OUTPUT INSTRUCTIONS:                                                      │
│    ┌─────────────────────────────────────────────────────────────────┐      │
│    │ END_MISSION_WARMLY:               Complete mission gracefully   │      │
│    │ ANSWER_STUDENT_THEN_BRIDGE_BACK:  Park & answer student Qs     │      │
│    │ ACK_RECAST_THEN_ASK_TARGET:       Normal progression           │      │
│    └─────────────────────────────────────────────────────────────────┘      │
│                                                                               │
│  LOGIC FLOW:                                                                 │
│  1. Increment totalTurns counter                                             │
│  2. IF totalTurns >= 15:  return GOODBYE (hard limit)                       │
│  3. IF studentInputType === QUESTION:  return HOLD_CURRENT (park)           │
│  4. ELSE:  return ADVANCE_OBJECTIVE (normal progression)                    │
│                                                                               │
│  Return Object:                                                              │
│  {                                                                            │
│    type: 'GOODBYE' | 'ANSWER_STUDENT_THEN_BRIDGE' | 'NORMAL',             │
│    objective: {...current or next learning objective...},                   │
│    instruction: 'END_MISSION_WARMLY' | 'ANSWER_STUDENT_THEN_...' | ...,   │
│    reason: 'HARD_LIMIT_REACHED' | 'Student asked question' | ...           │
│  }                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        OBJECTIVE-DRIVEN DATA SCHEMA                          │
│                     (src/data/weeks/week_01/index.js)                       │
│                                                                               │
│  storyMission: {                                                             │
│    metadata: {                                                               │
│      duration_minutes: 10-15,                                                │
│      expected_turns: 10-15,                                                  │
│      ai_talker_ratio: 0.3                                                    │
│    },                                                                         │
│    objectives: [                                                             │
│      {                                                                        │
│        id: 'obj_greeting',                                                   │
│        goal: 'Establish warm greeting and rapport',                         │
│        context: 'Opening of conversation',                                   │
│        required_info: 'Student name',                                        │
│        teaching_strategy: 'Open-ended, welcoming',                           │
│        proficiency_level: 'A0'                                               │
│      },                                                                       │
│      ... 8 more objectives ...                                               │
│      {                                                                        │
│        id: 'obj_goodbye',                                                    │
│        goal: 'Gracefully close the conversation',                            │
│        context: 'End of mission',                                            │
│        teaching_strategy: 'Encouraging, positive',                           │
│        proficiency_level: 'A0'                                               │
│      }                                                                        │
│    ]                                                                          │
│  }                                                                            │
│                                                                               │
│  OBJECTIVE PROGRESSION:                                                      │
│  1. obj_greeting       → Establish rapport                                    │
│  2. obj_age            → Learn student age                                    │
│  3. obj_student_status → Confirm student status                              │
│  4. obj_school_feelings → Understand school experience                       │
│  5. obj_grade          → Identify current grade                              │
│  6. obj_friends        → Learn about friendships                             │
│  7. obj_classroom      → Describe classroom                                  │
│  8. obj_favorite_subject → Identify interests                                │
│  9. obj_goodbye        → Close conversation                                  │
│                                                                               │
│  TURN ALLOCATION (10-15 turns):                                              │
│  ├─ Each objective: 1-2 turns                                                │
│  ├─ Buffer for questions: 3-5 turns                                          │
│  └─ Hard limit: 15 turns max                                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          RESPONSE GUARD LAYER                                │
│                  (src/services/ai_tutor/utils/responseGuard.js)             │
│                                                                               │
│  PRE-VALIDATION:                                                             │
│  ├─ Schema structure enforcement                                             │
│  └─ Required field validation                                                │
│                                                                               │
│  POST-VALIDATION:                                                            │
│  ├─ Banned phrase detection & removal                                        │
│  ├─ Grammar correction (A0-A1 compliance)                                    │
│  ├─ Question repetition prevention                                           │
│  ├─ Instruction constraint enforcement                                       │
│  └─ Hint quality validation                                                  │
│                                                                               │
│  INPUT:                                                                       │
│  {                                                                            │
│    ai_response: "...",                                                       │
│    suggested_hints: [...],                                                   │
│    mission_status: "continue" | "complete"                                   │
│  }                                                                            │
│                                                                               │
│  GUARD CONTEXT:                                                              │
│  {                                                                            │
│    studentInputType: 'QUESTION' | 'ANSWER' | 'OFF_TOPIC',                   │
│    turnDecision: {...},                                                       │
│    instruction: 'END_MISSION_WARMLY' | 'ANSWER_STUDENT_...' | ...,         │
│    turnCount: number,                                                        │
│    turnManager: TurnManager instance                                         │
│  }                                                                            │
│                                                                               │
│  OUTPUT:                                                                      │
│  {                                                                            │
│    ai_response: "...validated & corrected...",                               │
│    suggested_hints: [...validated...],                                       │
│    mission_status: "continue" | "complete"                                   │
│  }                                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          NOVA ENGINE INTEGRATION                             │
│                   (src/services/ai_tutor/novaEngine.js)                      │
│                                                                               │
│  CONTEXT INJECTION:                                                          │
│  The novaEngine receives comprehensive context including:                   │
│  ├─ studentInputType: Type of student input detected                        │
│  ├─ turnDecision: State machine decision result                             │
│  ├─ currentObjective: Learning objective being tracked                      │
│  ├─ instruction: AI behavior instruction                                    │
│  ├─ studentName: Student name extracted from first message                  │
│  ├─ missionId: Current mission identifier                                   │
│  ├─ turnCount: Current turn number                                          │
│  └─ chatHistory: Full conversation history                                  │
│                                                                               │
│  INSTRUCTIONS RECOGNIZED:                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │ END_MISSION_WARMLY:                                             │        │
│  │   - Gracefully conclude the mission                             │        │
│  │   - Express positive sentiment                                  │        │
│  │   - Use student name if available                               │        │
│  │   - Suggest next steps or encouragement                         │        │
│  │                                                                  │        │
│  │ ANSWER_STUDENT_THEN_BRIDGE_BACK:                                │        │
│  │   - Acknowledge student's question respectfully                 │        │
│  │   - Provide answer to their question                            │        │
│  │   - Use bridge phrase to return to learning objective           │        │
│  │   - Do NOT mark objective as complete                           │        │
│  │                                                                  │        │
│  │ ACK_RECAST_THEN_ASK_TARGET:                                     │        │
│  │   - Acknowledge student's answer                                │        │
│  │   - Validate the response                                       │        │
│  │   - Transition to next learning objective                       │        │
│  │   - Ask new question advancing syllabus                         │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  PROMPT ENGINEERING:                                                         │
│  The system prompt includes the instruction type and objective context,     │
│  allowing the model to generate contextually appropriate responses.         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONVERSATION FLOW EXAMPLE                             │
│                                                                               │
│  TURN 1: GREETING                                                            │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │ AI: "Hello! I'm Ms. Nova. What is your name?"                   │        │
│  │ Current Objective: obj_greeting                                 │        │
│  │ Expected Input Type: ANSWER                                     │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  TURN 2: STUDENT ANSWERS (Normal Case)                                       │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │ Student: "My name is Alex"                                      │        │
│  │ Detection: ANSWER (no ? mark, direct statement)                 │        │
│  │ processTurn('ANSWER'):                                          │        │
│  │   - totalTurns = 2                                              │        │
│  │   - Check: 2 >= 15? NO                                          │        │
│  │   - Check: QUESTION? NO                                         │        │
│  │   - Advance objective → obj_age                                 │        │
│  │   - Return: ACK_RECAST_THEN_ASK_TARGET                          │        │
│  │                                                                  │        │
│  │ AI: "Great to meet you, Alex! How old are you?"                │        │
│  │ Current Objective: obj_age                                      │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  TURN 3: STUDENT ASKS QUESTION (Reverse Case)                               │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │ Student: "Are you a real teacher?"                              │        │
│  │ Detection: QUESTION (ends with ? mark)                          │        │
│  │ processTurn('QUESTION'):                                        │        │
│  │   - totalTurns = 3                                              │        │
│  │   - Check: 3 >= 15? NO                                          │        │
│  │   - Check: QUESTION? YES                                        │        │
│  │   - Hold objective → obj_age (unchanged)                        │        │
│  │   - Return: ANSWER_STUDENT_THEN_BRIDGE_BACK                    │        │
│  │                                                                  │        │
│  │ AI: "I'm an AI assistant, but I'm here to help you learn       │        │
│  │      English. Anyway, how old are you?"                         │        │
│  │ Current Objective: obj_age (PARKED)                             │        │
│  │ Note: Objective counter did NOT advance                         │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  TURN 4: STUDENT ANSWERS (Resume from Park)                                 │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │ Student: "I'm 12 years old"                                     │        │
│  │ Detection: ANSWER (statement, no question)                      │        │
│  │ processTurn('ANSWER'):                                          │        │
│  │   - totalTurns = 4                                              │        │
│  │   - Current objective still: obj_age (parked from turn 3)       │        │
│  │   - Advance → obj_student_status                                │        │
│  │   - Return: ACK_RECAST_THEN_ASK_TARGET                          │        │
│  │                                                                  │        │
│  │ AI: "12 is a great age! Are you a student?"                    │        │
│  │ Current Objective: obj_student_status                           │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  ... (Turns 5-14: Continue objective progression) ...                       │
│                                                                               │
│  TURN 15: HARD LIMIT                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │ Student: "..." (any input)                                      │        │
│  │ processTurn(studentInputType):                                  │        │
│  │   - totalTurns = 15                                             │        │
│  │   - Check: 15 >= 15? YES                                        │        │
│  │   - Force goodbye regardless of progress                        │        │
│  │   - Return: END_MISSION_WARMLY                                  │        │
│  │                                                                  │        │
│  │ AI: "Great talking with you! You've learned a lot today.       │        │
│  │      See you next time!"                                        │        │
│  │ Mission Status: COMPLETE                                        │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Key Design Principles

### 1. **Deterministic Conversation Flow**
- Every turn has a clear decision path
- State is tracked in TurnManager (totalTurns, currentObjectiveIndex)
- No random behavior or "chatbot randomness"

### 2. **Syllabus Guarantee**
- 9 learning objectives must be covered
- Hard limit at 15 turns ensures completion
- Questions don't consume objectives (park on current)
- Student diversions don't derail progress

### 3. **Natural Conversational AI**
- AI model receives explicit instruction on how to respond
- Context includes student input type and learning objective
- Guard layer ensures compliance with instructions
- Hints and grammar validated for consistency

### 4. **Learner-Centered**
- Student name detected and used throughout
- Objectives focus on required information
- Teaching strategies match proficiency level (A0)
- Hints provided for vocabulary support

## Data Flow Sequence

```
User Input
    ↓
[React Component: handleSendMessage]
    ├─ Extract student name
    ├─ Detect input type (detectStudentInputType)
    └─ Record turn for analytics
         ↓
[TurnManager State Machine]
    ├─ Increment totalTurns
    ├─ Evaluate student input type
    ├─ Check hard limit (15 turns)
    └─ Determine next action (park/advance/end)
         ↓
[Build Context Object]
    ├─ studentInputType: Detected type
    ├─ turnDecision: State machine result
    ├─ instruction: AI behavior directive
    ├─ currentObjective: Learning goal
    └─ Additional context (profile, history)
         ↓
[NovaEngine.sendToNova]
    ├─ Inject context into prompt
    ├─ Call Claude LLM
    ├─ Receive response with hints
    └─ Return to UI layer
         ↓
[Response Guard]
    ├─ Validate schema
    ├─ Check instruction compliance
    ├─ Fix grammar/banned phrases
    └─ Return safe response
         ↓
[Update Chat UI]
    ├─ Display AI response
    ├─ Play TTS if enabled
    ├─ Show hints to user
    └─ Wait for next input
```

## Performance Considerations

### Token Usage
- Hard limit at 15 turns = predictable token budget
- Average tokens per turn: ~200-300
- Total per mission: ~3000-4500 tokens
- Manageable rate with sliding window limiter

### Response Time
- State machine decision: <1ms
- Input type detection: <1ms
- Guard validation: <5ms
- Negligible overhead vs. LLM latency

### Memory Footprint
- TurnManager per mission: ~1KB (state tracking)
- Objectives array: ~2KB per mission
- Chat history: Grows with turns (~100 bytes/turn)
- Total: ~20-50KB per active mission

---

**Architecture Version**: 1.0
**Last Updated**: January 2025
**Status**: Production Ready ✅
