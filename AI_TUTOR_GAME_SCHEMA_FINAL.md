# 🎯 AI TUTOR GAME SCHEMA - IMMUTABLE STANDARD

**Date Created:** February 6, 2026  
**Purpose:** Single source of truth cho game templates - KHÔNG BAO GIỜ THAY ĐỔI  
**Scope:** Tất cả games trong AI Tutor (Word Chain, 20 Questions, Sentence Builder)

---

## 📜 NGUYÊN TẮC CORE:

### 1. SINGLE SOURCE OF TRUTH
- **FreeTalkTab.jsx** = Validation logic (JavaScript code)
- **freeTalkModes.js** = Response formatter (uses validation result)
- **gamePromptBuilder.js** = Template library (documentation only)

### 2. DATA FLOW (IMMUTABLE):
```
User Input
  ↓
FreeTalkTab.jsx validates (CODE)
  ↓
Create validation object
  ↓
Pass to novaEngine
  ↓
freeTalkModes.js formats response (uses validation object)
  ↓
AI returns EXACT formatted text
  ↓
Display to user
```

### 3. NEVER:
- ❌ Let AI validate game rules
- ❌ Let AI decide correct/wrong
- ❌ Let AI pick next word/object
- ❌ Have multiple sources validating same thing

---

## 🎮 GAME 1: WORD CHAIN

### A. Validation Logic (FreeTalkTab.jsx)
**Location:** `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` lines 325-450

**Rule:**
```javascript
const hasLetter = studentWord.includes(requiredLetter);
```
Student's word must CONTAIN (not start with) AI's last letter.

**Validation Object:**
```javascript
{
  isCorrect: boolean,           // TRUE if word contains letter
  requiredLetter: string,       // Letter student needs (e.g., "K")
  studentWord: string,          // What student typed (e.g., "BOOK")
  studentWordSpelled: string,   // Spelled out (e.g., "B-O-O-K")
  aiNextWord: string,           // AI's next word (if correct)
  aiNextLetter: string,         // Next required letter
  validatedHints: string[],     // 3 words with required letter
  roundNumber: number           // Current round (1-20)
}
```

### B. Response Templates (freeTalkModes.js)
**Location:** `src/services/ai_tutor/freeTalkModes.js` lines 75-110

**✅ CORRECT Template:**
```
"Great! [WORD] has [LETTER]! ✅ Round [X]/20: I say [AI_WORD]! Find word with [LETTER]! Try: [hint1, hint2, hint3]"
```

**❌ WRONG Template:**
```
"Oops! [WORD] doesn't have [LETTER]. Let me spell it: [W-O-R-D]. Try again! Words with [LETTER]: [hint1, hint2, hint3]"
```

**🎮 START GAME Template:**
```
"Great! Let's play Word Chain! 🔗 Rule: I say a word. You find a word that CONTAINS my word's last letter! Example: I say HAPPY (ends Y) → You say FAMILY, PLAYING or YELLOW (all have Y)! Round 1/20: I say [STARTER]! Find word with [LETTER]! Try: [hint1, hint2, hint3]"
```

### C. Required Elements (ALL templates MUST have):
1. ✅ Round number: "Round X/20"
2. ✅ Clear instruction: "Find word with [LETTER]!"
3. ✅ Hints: "Try: [hint1, hint2, hint3]"
4. ✅ AI's word: "I say [WORD]!"

---

## 🎮 GAME 2: 20 QUESTIONS

### A. Validation Logic (FreeTalkTab.jsx)
**Location:** `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` lines 450-560

**Rules:**
```javascript
const isCorrectGuess = cleanedGuess === currentSecret || studentMsg.includes(currentSecret);
const isYesNoQuestion = studentMsg.includes("is it") || studentMsg.endsWith("?");
const isGiveUp = studentMsg.includes("i don't know") || studentMsg.includes("give up");
```

**Validation Object:**
```javascript
{
  type: 'correct' | 'wrong' | 'yesno' | 'giveup',
  currentSecret: string,        // Current secret object
  newSecret: string,            // New secret (for correct/giveup)
  newHints: string[],           // 2 hints for new object
  isPerson: boolean,            // Is it a person or thing?
  turnCount: number,            // Current turn
  studentGuess: string,         // What student guessed (for wrong)
  studentQuestion: string,      // Yes/No question (for yesno)
  hint: string                  // First letter hint (for wrong)
}
```

### B. Response Templates (freeTalkModes.js)
**Location:** `src/services/ai_tutor/freeTalkModes.js` lines 113-185

**✅ CORRECT GUESS Template:**
```
"Yes! It's [a/my] [object]! 🎉 Round [X]/20: NEW ROUND! I'm thinking of [someone in the family / something in the room]. 🔍 [Hint1] 🔍 [Hint2] [Who is it? / What is it?]"
```

**❌ WRONG GUESS Template:**
```
"No, not [guess]. Round [X]/20: Keep asking! Hint: It starts with '[LETTER]'."
```

**❓ YES/NO ANSWER Template:**
```
"[Yes/No]! [Answer details]. Round [X]/20: What else?"
```

**🏳️ GIVE UP Template:**
```
"It was [secret]! Let's try another one! 🎉 Round [X]/20: NEW ROUND! I'm thinking of [someone/something]. 🔍 [Hint1] 🔍 [Hint2] [Who/What] is it?"
```

**🎮 START GAME Template:**
```
"Let's play 20 Questions! 🎉 Round 1/20: I'm thinking of [someone in the family / something in the room]. 🔍 [Hint1] 🔍 [Hint2] [Who/What] is it? Ask YES/NO questions!"
```

### C. Required Elements (ALL templates MUST have):
1. ✅ Round number: "Round X/20"
2. ✅ 2 hints: "🔍 [Hint1] 🔍 [Hint2]"
3. ✅ Question prompt: "Who is it?" or "What is it?"
4. ✅ Correct pronouns: "they/them" for people, "it" for things
5. ✅ NEW ROUND marker (after correct guess)

---

## 🎮 GAME 3: SENTENCE BUILDER

### A. Validation Logic
**Note:** Sentence Builder has LESS strict validation - AI checks if sentence uses vocab.

**Validation Object (if needed):**
```javascript
{
  pattern: string,              // Which pattern to use
  vocabSuggestions: string[],   // 3-5 vocab words that fit
  turnNumber: number            // Current turn (1-20)
}
```

### B. Response Templates
**Location:** `gamePromptBuilder.js` lines 320-400

**✅ ACCEPT Template:**
```
"Great! [Student's answer]! 🎉 Complete this sentence: '[EXACT PATTERN]' Use: [word1, word2, word3]. Your turn?"
```

**Pattern Schedule:**
- Turns 1-10: Pattern 1 only
- Turns 11-20: Pattern 2 only

### C. Required Elements:
1. ✅ Acknowledge student: "Great! [their answer]!"
2. ✅ Clear pattern: "Complete this sentence: '[PATTERN]'"
3. ✅ Vocab suggestions: "Use: [word1, word2, word3]"
4. ✅ End with: "Your turn?"

---

## 📋 TEMPLATE CHECKLIST (For All Games):

### Every AI response MUST have:
- [ ] Round/Turn counter (e.g., "Round 5/20")
- [ ] Clear next instruction (what student should do)
- [ ] Hints/Suggestions (specific words/actions)
- [ ] Consistent structure (matches template above)

### Every validation MUST:
- [ ] Be done in FreeTalkTab.jsx (CODE, not AI)
- [ ] Create validation object with all required fields
- [ ] Pass object to freeTalkModes.js
- [ ] Let freeTalkModes format (not validate again)

---

## 🔧 ADDING NEW GAMES (Future Weeks):

### Step 1: Define Validation Logic in FreeTalkTab.jsx
```javascript
// 🎯 NEW_GAME: Code-level validation
let newGameValidation = null;
const isInNewGame = effectiveGame?.id === 'new_game';
if (isInNewGame && !userMessage.startsWith('START_')) {
  // 1. Extract game state from last AI message
  // 2. Validate student's answer (CODE logic)
  // 3. Generate next challenge data
  // 4. Create validation object
  newGameValidation = {
    isCorrect: boolean,
    // ... other fields
  };
}
```

### Step 2: Add Response Handler in freeTalkModes.js
```javascript
// 🎯 NEW_GAME: Use code-validated result
if (context.newGameValidation && isInGame && !startingNewGame) {
  const val = context.newGameValidation;
  
  const responseText = val.isCorrect 
    ? `✅ CORRECT TEMPLATE`
    : `❌ WRONG TEMPLATE`;
  
  return `
  SYSTEM_MODE: NEW_GAME_CODE_VALIDATED
  
  EXACT RESPONSE TO USE:
  "${responseText}"
  
  RESPOND IN JSON:
  {
    "ai_response": "${responseText}",
    "suggested_hints": [...]
  }
  `;
}
```

### Step 3: Add Template to gamePromptBuilder.js
```javascript
new_game: `
📝 CORRECT ANSWER TEMPLATE:
"[Your template here]"

📝 WRONG ANSWER TEMPLATE:
"[Your template here]"
`
```

### Step 4: Test with Manual Testing
1. Start game
2. Test correct answer
3. Test wrong answer
4. Test edge cases
5. Verify template consistency

---

## ⚠️ COMMON PITFALLS (AVOID):

### ❌ DON'T:
1. Let AI decide correct/wrong (AI is unpredictable)
2. Have validation logic in prompt (AI can ignore)
3. Use multiple detection methods (causes conflicts)
4. Change templates per week (breaks consistency)
5. Let AI generate hints randomly (may not match vocab)

### ✅ DO:
1. Validate in FreeTalkTab (CODE)
2. Format in freeTalkModes (uses validation)
3. Use activeGame state for detection (reliable)
4. Follow exact templates above (immutable)
5. Generate hints in CODE (from vocab pool)

---

## 🎓 ARCHITECTURE PRINCIPLES:

### Separation of Concerns:
| Component | Responsibility | Can Modify? |
|-----------|---------------|-------------|
| FreeTalkTab.jsx | Validation logic, game state | YES (for new games) |
| freeTalkModes.js | Response formatting | YES (for new games) |
| gamePromptBuilder.js | Template documentation | NO (reference only) |
| AI Model | Return formatted text | NO (uses our templates) |

### Data Flow:
```
CODE validates → Creates object → Passes to formatter → AI formats → Returns to user
    ↑                                                                      ↓
    └────────────────── NO VALIDATION LOOP ─────────────────────────────┘
                    (AI never validates, only formats)
```

---

## 📝 WEEKLY CONTENT FILES:

### What Changes Per Week:
1. ✅ Vocabulary list (target_vocab in week_XX_real.js)
2. ✅ Theme (e.g., "Family", "School", "Home")
3. ✅ Game objects (for 20Q: which objects to guess)
4. ✅ Sentence patterns (for Sentence Builder)

### What NEVER Changes:
1. ❌ Validation logic (always in FreeTalkTab)
2. ❌ Template structure (follows schema above)
3. ❌ Data flow (CODE → format → AI → user)
4. ❌ Response format (always JSON with ai_response + suggested_hints)

---

## 🔒 IMMUTABLE SCHEMA VERSION:

**Schema Version:** 1.0  
**Last Updated:** February 6, 2026  
**Status:** FROZEN - Do not modify core structure  
**Allowed Changes:** Only add new games following Step 1-4 above

---

## ✅ VERIFICATION CHECKLIST (Before Production):

### For Each Game:
- [ ] Validation logic in FreeTalkTab.jsx
- [ ] Response handler in freeTalkModes.js
- [ ] Template in gamePromptBuilder.js
- [ ] All templates have required elements
- [ ] Tested correct/wrong/edge cases
- [ ] No AI-based validation
- [ ] Single source of truth maintained

### For Each Week:
- [ ] Vocabulary defined in week_XX_real.js
- [ ] Game content in GAME_TEMPLATES (gameAdaptation.js)
- [ ] Objects/patterns defined for all games
- [ ] Cumulative vocab working (Week 1 → current)

---

**⚠️ WARNING:** Modifying this schema requires full regression testing of ALL weeks and ALL games!

**📌 RULE:** If unsure, follow this schema EXACTLY. Do not deviate. Do not let AI validate. Code validates, AI formats.
