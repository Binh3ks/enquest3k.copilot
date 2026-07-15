# COMPREHENSIVE FIX: Critical Bug + Artifact Alignment

## CRITICAL BUG FIXED ✅

**Error**: `TypeError: this.isStudentQuestion is not a function`  
**Location**: turnManager.js:292 in `getUserStatus()`  
**Root Cause**: Called `this.isStudentQuestion()` but it's a standalone function, not a class method  
**Fix**: Changed to `isStudentQuestion(userMessage)` (remove `this.`)

---

## ARTIFACT COMPLIANCE ANALYSIS

### ✅ What We Have (Phase 1-3):
1. **Objective-driven data** - week1_objectives.js with 11 objectives
2. **TurnManager dual-mode** - Supports both objective and step modes
3. **15-turn hard cap** - Enforced at turn 15
4. **getUserStatus()** - Detects if student answered or asked question
5. **processObjectiveTurn()** - Handles objective-based flow

### ❌ What's Missing vs Final Artifact v5.0:

#### 1. **Output Format Mismatch**
**Artifact Requires**:
```json
{
  "ack": "Great job!",
  "recast": "Yes, you are a student.",
  "bridge": "",
  "question": "Do you like your school?",
  "hints": ["I like...", "school", "yes/no"]
}
```

**Current System Returns**:
```json
{
  "teacher_ack": "Great!",
  "teacher_recast": "I heard you!",
  "teacher_question": "...",
  "suggested_hints": [...],
  "mission_status": "continue"
}
```

**Action**: Need to update tutorPrompts.js to match new format

---

#### 2. **Bridge Field Missing**
**Required**: When student asks question, AI should return:
- `ack`: Answer their question
- `bridge`: "By the way...", "So..." to steer back
- `question`: Ask current objective

**Current**: We have `answer_and_steer` logic but no explicit `bridge` field

**Action**: Add bridge generation in parking mode

---

#### 3. **Hints Generation by AI**
**Artifact**:  
> "AI chịu trách nhiệm tạo Hints để đảm bảo khớp 100% với câu hỏi nó vừa nghĩ ra"

**Current**: We use `defaultHints` from objectives file

**Action**: Make AI generate hints that match the question it created

---

#### 4. **Vocab Pool Injection**
**Artifact**:  
> "VOCAB POOL: {vocabulary list}. (MUST PRIORITIZE THESE WORDS)"

**Current**: Constraints exist in week1_objectives.js but not explicitly in prompt

**Action**: Inject vocabulary list prominently in system prompt

---

#### 5. **Anti-Loop Warning UI**
**Artifact**: "Tại Turn 15, TurnManager sẽ cưỡng chế set nextObjective = goodbye"

**Current**: Hard cap exists but no user warning

**Added in Phase 3**: Orange "Wrapping up soon" badge at turn 12-14 ✅

---

## NEXT ACTIONS TO ALIGN WITH ARTIFACT

### Priority 1: Fix Output Format (30 mins)
Update response structure in `tutorPrompts.js`:

```javascript
// Current
{
  "teacher_ack": "...",
  "teacher_recast": "...",
  "teacher_question": "...",
  "suggested_hints": [...]
}

// Should be (per Artifact)
{
  "ack": "...",
  "recast": "...",
  "bridge": "", // Add this
  "question": "...",
  "hints": [...] // Rename from suggested_hints
}
```

### Priority 2: Add Bridge Logic (20 mins)
In parking mode (student asks question):
```javascript
{
  "ack": "Good question!",
  "recast": "I am Ms. Nova, your teacher.",
  "bridge": "By the way, let me ask you:", // NEW
  "question": "[Current objective question]",
  "hints": [...]
}
```

### Priority 3: Vocab Injection (15 mins)
Modify system prompt to emphasize vocabulary:
```
VOCAB POOL (MUST USE): teacher, student, book, pen, hello, school, class
YOU MUST PRIORITIZE THESE WORDS IN YOUR QUESTIONS.
```

### Priority 4: AI-Generated Hints (40 mins)
Instead of using defaultHints, make AI generate hints:
```
GENERATE HINTS: Create 3 hints that match YOUR generated question exactly.
Example: If you ask "Do you like school?", hints should be ["I", "like", "school"]
```

### Priority 5: ResponseGuard Update (30 mins)
Update responseGuard.js to:
- Accept new field names (ack, recast, bridge, question, hints)
- Keep backward compatibility with old format
- Validate bridge field in parking mode

---

## TESTING SCENARIOS (Per Artifact)

### Scenario 1: Normal Flow (Answer)
```
Turn 1:
AI: "Hello! I am Ms. Nova. What is your name?"
Student: "Binh"

Expected Output:
{
  "ack": "Great!",
  "recast": "Your name is Binh!",
  "bridge": "",
  "question": "How old are you?",
  "hints": ["I", "am", "10"]
}
```

### Scenario 2: Parking Mode (Question)
```
Turn 2:
AI: "How old are you?"
Student: "What is your name?"

Expected Output:
{
  "ack": "Good question!",
  "recast": "I am Ms. Nova, your English teacher.",
  "bridge": "By the way,",
  "question": "How old are you?", // Same objective
  "hints": ["I", "am", "10"]
}
```

### Scenario 3: 15-Turn Cap
```
Turn 15:
TurnManager forces goodbye objective
AI: "You did great! See you next time!"
Disable input
Show "Complete Mission" button
```

---

## IMPLEMENTATION ROADMAP

### Phase 4: Output Format Update (NEXT)
**Files**: tutorPrompts.js, responseGuard.js, responseParser.js  
**Time**: 1.5 hours  
**Tasks**:
- Change field names to match artifact
- Add bridge field generation
- Update all references in StoryMissionTab

### Phase 5: Vocab Emphasis
**Files**: tutorPrompts.js, week1_objectives.js  
**Time**: 30 mins  
**Tasks**:
- Inject vocab pool at top of system prompt
- Add "MUST PRIORITIZE" instruction
- Test AI follows vocab constraints

### Phase 6: AI Hint Generation
**Files**: tutorPrompts.js  
**Time**: 45 mins  
**Tasks**:
- Remove defaultHints fallback
- Make AI generate hints matching its question
- Validate hints relevance

### Phase 7: Full Integration Test
**Time**: 1 hour  
**Tasks**:
- Test all 11 objectives flow
- Test parking mode (ask question)
- Test 15-turn cap
- Test goodbye termination

---

## CURRENT STATUS

**Phase 1-3**: ✅ COMPLETE  
- Architecture: Objective-driven ✅
- TurnManager: Dual-mode + 15-cap ✅  
- UI: Turn warning + progress ✅
- **Bug Fix**: isStudentQuestion error ✅

**Phase 4-7**: 🔲 PENDING  
- Output format alignment
- Bridge field addition
- Vocab emphasis
- AI hint generation

**Estimated Total Time**: ~4 hours remaining

---

## KEY DIFFERENCES: Current vs Artifact

| Feature | Current | Artifact v5.0 | Status |
|---------|---------|---------------|--------|
| Data Structure | Objectives ✅ | Objectives ✅ | ✅ Match |
| TurnManager | One Brain ✅ | One Brain ✅ | ✅ Match |
| 15-Turn Cap | Hard cap ✅ | Hard cap ✅ | ✅ Match |
| Parking Mode | Logic exists ✅ | Logic exists ✅ | ✅ Match |
| Output Format | teacher_ack/recast | ack/recast/bridge | ❌ Mismatch |
| Hints Source | defaultHints | AI-generated | ❌ Mismatch |
| Vocab Injection | In constraints | Prominent in prompt | ⚠️ Weak |
| Bridge Field | Missing | Required | ❌ Missing |

**Overall Compliance**: 60% → Need Phase 4-7 to reach 100%

---

## RECOMMENDATION

**Immediate**: Continue with Phase 4 to align output format with Artifact v5.0. This is the largest gap remaining.

**Critical**: The bug fix (`isStudentQuestion`) unblocks the system. Test immediately to verify conversation works end-to-end.
