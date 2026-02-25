# 🗺️ AI TUTOR REFACTOR ROADMAP

## 🎯 MỤC TIÊU
Refactor AI Tutor để "không cứ sửa 1 thứ lại hỏng toàn bộ"

## ⚠️ NGUYÊN TẮC VÀNG
> **"Tests first, refactor second. No tests = No refactor."**

---

## 📋 PHASE 0: HIỆN TRẠNG (COMPLETED ✅)

### Đã làm:
- ✅ Tạo test harness đơn giản (wordChain.simple.test.js)
- ✅ Phát hiện bug: HOME không có R từ MOTHER (validation sai)

### Phát hiện:
```
Test output:
❌ Test 4: HOME has R from MOTHER
   Expected: true, Got: false
   Feedback: Oops! HOME doesn't have R.
```

**Root cause:** Validation logic đúng, nhưng test case SAI (HOME không có R!)

---

## 🚀 PHASE 1: TEST FOUNDATION (2-3 ngày)

### Mục tiêu: 
Tạo test suite cho 3 games TRƯỚC KHI refactor bất cứ thứ gì

### 1.1. Word Chain Tests (1 ngày)

**File:** `src/services/ai_tutor/__tests__/wordChain.test.js`

**Test cases cần cover:**
```javascript
describe('Word Chain Validation', () => {
  // Basic validation
  test('accepts word containing target letter')
  test('rejects word NOT containing target letter')
  
  // Edge cases
  test('case insensitive: LOVE + home = valid')
  test('trims whitespace: "LOVE" + " HOME " = valid')
  test('handles uppercase input')
  
  // Real bugs từ production
  test('BUG: BOOK + PEN (no K) = invalid')
  test('BUG: BACKPACK + PENCIL (no K) = invalid')
});

describe('Hint Validation', () => {
  test('validates AI suggested hints against vocab')
  test('filters out hints without target letter')
  test('returns max 5 valid hints')
});

describe('Game Prompt Generation', () => {
  test('generates correct first message for Week 1')
  test('generates correct first message for Week 2')
  test('includes correct vocab for each week')
});
```

**Deliverable:**
- [ ] 15+ test cases cho Word Chain
- [ ] All tests PASS
- [ ] Coverage: validation logic, hint generation, prompt building

---

### 1.2. Twenty Questions Tests (1 ngày)

**File:** `src/services/ai_tutor/__tests__/twentyQuestions.test.js`

**Test cases:**
```javascript
describe('Secret Object Selection', () => {
  test('selects from allowed objects only')
  test('never repeats same object consecutively')
  test('rotates through all objects in list')
});

describe('Person vs Thing Detection', () => {
  test('identifies PERSON: mother, father, brother')
  test('identifies THING: table, chair, lamp')
  test('uses correct pronouns: they/them for person')
  test('uses correct pronouns: it for thing')
});

describe('Hint Generation', () => {
  test('gives 2 subtle hints on first message')
  test('hints match the secret object')
  test('hints use only allowed vocabulary')
});
```

**Deliverable:**
- [ ] 12+ test cases cho Twenty Questions
- [ ] All tests PASS

---

### 1.3. Sentence Builder Tests (1 ngày)

**File:** `src/services/ai_tutor/__tests__/sentenceBuilder.test.js`

**Test cases:**
```javascript
describe('Pattern Validation', () => {
  test('Week 4: accepts "I like playing"')
  test('Week 6: accepts "The treasure is ON the desk"')
  test('Week 7: accepts "There is a pen in my backpack"')
  test('rejects patterns not in week config')
});

describe('Vocab Restriction', () => {
  test('only suggests words from allowed vocab')
  test('rejects AI using words outside vocab list')
});

describe('Turn Management', () => {
  test('turns 1-10 use pattern 1')
  test('turns 11-20 use pattern 2')
});
```

**Deliverable:**
- [ ] 10+ test cases cho Sentence Builder
- [ ] All tests PASS

---

## 🔧 PHASE 2: SCHEMA VALIDATION (2-3 ngày)

### 2.1. Install Zod (5 phút)

```bash
npm install zod
```

### 2.2. Define Schemas (1 ngày)

**File:** `src/services/ai_tutor/schemas/gameSchemas.js`

```javascript
import { z } from 'zod';

// AI Response Schema - ENFORCE JSON format
export const GameResponseSchema = z.object({
  ai_response: z.string().min(10).max(500),
  suggested_hints: z.array(z.string()).min(3).max(5)
});

// Game Prompt Schema
export const GamePromptSchema = z.object({
  gameId: z.enum(['word_chain', 'twenty_questions', 'sentence_builder']),
  weekNumber: z.number().min(1).max(156),
  systemPrompt: z.string(),
  vocab: z.array(z.string()),
  firstMessageTemplate: z.string()
});

// Validation Result Schema
export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  feedback: z.string(),
  validatedHints: z.array(z.string()).optional(),
  newHints: z.array(z.string()).optional()
});
```

**Deliverable:**
- [ ] GameResponseSchema
- [ ] GamePromptSchema  
- [ ] ValidationResultSchema
- [ ] Tests cho schemas

---

### 2.3. Integrate Schemas vào novaEngine.js (1 ngày)

**Before:**
```javascript
// novaEngine.js - KHÔNG validate
const aiResponse = await callAI(prompt);
return aiResponse; // Có thể là bất cứ format gì
```

**After:**
```javascript
// novaEngine.js - CÓ validate
const aiResponse = await callAI(prompt);

const parsed = GameResponseSchema.safeParse(aiResponse);
if (!parsed.success) {
  console.error('❌ Invalid AI response:', parsed.error);
  return {
    ai_response: "Sorry, I had trouble understanding. Let's try again!",
    suggested_hints: ["try", "again", "please"]
  };
}

return parsed.data; // Type-safe!
```

**Deliverable:**
- [ ] novaEngine.js validates ALL AI responses
- [ ] Fallback responses khi AI trả về invalid format
- [ ] Tests verify schema enforcement

---

### 2.4. Add Runtime Validation cho prompts (1 ngày)

**File:** `src/services/ai_tutor/gamePromptBuilder.js`

```javascript
import { GamePromptSchema } from './schemas/gameSchemas.js';

export function buildGamePrompt(gameId, weekData, preSelectedObject) {
  // ... build prompt logic ...
  
  const prompt = {
    gameId,
    weekNumber,
    systemPrompt,
    vocab,
    firstMessageTemplate
  };
  
  // VALIDATE before returning
  const validated = GamePromptSchema.safeParse(prompt);
  if (!validated.success) {
    throw new Error(`Invalid game prompt: ${validated.error}`);
  }
  
  return validated.data;
}
```

**Deliverable:**
- [ ] All prompt builders validate output
- [ ] Tests catch invalid prompts at BUILD time, not RUNTIME

---

## 🔨 PHASE 3: EXTRACT VALIDATION LOGIC (3-4 ngày)

### 3.1. Create Validation Directory

```
src/services/ai_tutor/validation/
├── wordChainValidator.js
├── twentyQuestionsValidator.js
├── sentenceBuilderValidator.js
└── index.js
```

### 3.2. Extract Word Chain Validation (1 ngày)

**Before:** Validation ở FreeTalkTab.jsx (line 800+)

**After:**
```javascript
// validation/wordChainValidator.js
export function validateWordChain(aiWord, studentWord) {
  const lastLetter = aiWord.slice(-1).toLowerCase();
  const word = studentWord.toLowerCase().trim();
  
  const isValid = word.includes(lastLetter);
  
  return {
    isValid,
    targetLetter: lastLetter,
    feedback: isValid 
      ? `Great! ${word.toUpperCase()} has ${lastLetter.toUpperCase()}!`
      : `Oops! ${word.toUpperCase()} doesn't have ${lastLetter.toUpperCase()}.`
  };
}

export function validateHints(hints, targetLetter, allowedVocab) {
  return hints
    .filter(hint => hint.toLowerCase().includes(targetLetter))
    .filter(hint => allowedVocab.includes(hint.toLowerCase()))
    .slice(0, 5);
}
```

**Deliverable:**
- [ ] validation/wordChainValidator.js với tests
- [ ] FreeTalkTab.jsx imports và sử dụng validator
- [ ] All existing tests still PASS

---

### 3.3. Extract Twenty Questions Validation (1 ngày)

```javascript
// validation/twentyQuestionsValidator.js
export function validateSecret(secret, allowedObjects) {
  return allowedObjects.includes(secret.toLowerCase());
}

export function detectPersonOrThing(secret) {
  const people = ['mother', 'father', 'brother', 'sister', 'grandma', 'grandpa'];
  return people.includes(secret.toLowerCase()) ? 'PERSON' : 'THING';
}

export function validatePronoun(secret, pronoun) {
  const type = detectPersonOrThing(secret);
  const validPronouns = type === 'PERSON' 
    ? ['they', 'them', 'who', 'someone']
    : ['it', 'what', 'something'];
  
  return validPronouns.includes(pronoun.toLowerCase());
}
```

**Deliverable:**
- [ ] validation/twentyQuestionsValidator.js với tests
- [ ] FreeTalkTab.jsx refactored
- [ ] All tests PASS

---

### 3.4. Extract Sentence Builder Validation (1 ngày)

```javascript
// validation/sentenceBuilderValidator.js
export function validatePattern(sentence, allowedPatterns) {
  // Check if sentence matches any allowed pattern
  return allowedPatterns.some(pattern => {
    const regex = patternToRegex(pattern);
    return regex.test(sentence);
  });
}

export function validateVocabUsage(sentence, allowedVocab) {
  const words = sentence.toLowerCase().split(/\s+/);
  const invalidWords = words.filter(w => !allowedVocab.includes(w));
  
  return {
    isValid: invalidWords.length === 0,
    invalidWords
  };
}
```

**Deliverable:**
- [ ] validation/sentenceBuilderValidator.js với tests
- [ ] All validation logic extracted
- [ ] FreeTalkTab.jsx giảm từ 1069 → ~700 lines

---

## 🏗️ PHASE 4: SPLIT PROMPTS (Optional - 5-7 ngày)

**⚠️ CHỈ LÀM SAU KHI:**
- ✅ All tests từ Phase 1 PASS
- ✅ Schema validation từ Phase 2 working
- ✅ Validation logic từ Phase 3 extracted

### 4.1. New Structure

```
src/services/ai_tutor/prompts/games/
├── wordChain.js      - Word Chain prompt only
├── twentyQuestions.js - 20Q prompt only
├── sentenceBuilder.js - Sentence Builder prompt only
├── shared.js         - Shared instructions (persona, vocab format, etc.)
└── index.js          - Exports all
```

### 4.2. Refactor gamePromptBuilder.js

**Before:**
```javascript
// gamePromptBuilder.js (404 lines)
// All 3 game prompts in 1 file
```

**After:**
```javascript
// prompts/games/wordChain.js (100 lines)
import { GamePromptSchema } from '../../schemas/gameSchemas.js';

export function buildWordChainPrompt(weekData) {
  const vocab = getCumulativeVocabulary(weekData.weekNumber);
  
  const prompt = {
    gameId: 'word_chain',
    weekNumber: weekData.weekNumber,
    systemPrompt: `🎮 WORD CHAIN GAME...`,
    vocab,
    firstMessageTemplate: `Great! Let's play...`
  };
  
  return GamePromptSchema.parse(prompt); // Validate!
}
```

**Deliverable:**
- [ ] wordChain.js with schema validation
- [ ] twentyQuestions.js with schema validation
- [ ] sentenceBuilder.js with schema validation
- [ ] gamePromptBuilder.js becomes orchestrator (50 lines)
- [ ] ALL tests from Phase 1 still PASS

---

## 📊 PHASE 5: REFACTOR TABS (Optional - 1-2 tuần)

**⚠️ CHỈ SAU KHI Phase 1-4 hoàn thành**

### 5.1. Split FreeTalkTab.jsx (1069 lines → 3 files)

```
src/modules/ai_tutor/tabs/
├── FreeTalkTab.jsx (300 lines) - Container only
└── freetalk/
    ├── GameMode.jsx (300 lines) - Game logic
    ├── RoleplayMode.jsx (200 lines) - Roleplay logic
    └── ChatMode.jsx (200 lines) - Free talk logic
```

### 5.2. Split StoryMissionTab.jsx (1247 lines → 4 files)

```
src/modules/ai_tutor/tabs/
├── StoryMissionTab.jsx (400 lines) - Container
└── story/
    ├── StoryRenderer.jsx (300 lines) - Story display
    ├── ChoiceHandler.jsx (200 lines) - Choice logic
    ├── ProgressTracker.jsx (200 lines) - Progress
    └── RewardCalculator.jsx (150 lines) - Stars/XP
```

**Deliverable:**
- [ ] FreeTalkTab split, all tests PASS
- [ ] StoryMissionTab split, all tests PASS
- [ ] No regression bugs

---

## ✅ DEFINITION OF DONE

### Phase 1 (Tests):
- [ ] 37+ test cases total (Word Chain: 15, 20Q: 12, SB: 10)
- [ ] 100% of core validation logic covered
- [ ] All tests GREEN
- [ ] Can run tests with: `npm test`

### Phase 2 (Schemas):
- [ ] Zod schemas defined
- [ ] novaEngine.js validates all AI responses
- [ ] Invalid responses have fallbacks
- [ ] Schema tests PASS

### Phase 3 (Validation):
- [ ] 3 validation modules extracted
- [ ] FreeTalkTab.jsx reduced to ~700 lines
- [ ] All tests still PASS
- [ ] No regression bugs

### Phase 4 (Prompts - Optional):
- [ ] gamePromptBuilder.js split into 3 files
- [ ] Each game has isolated prompt
- [ ] Can modify 1 game without affecting others
- [ ] All tests PASS

### Phase 5 (Tabs - Optional):
- [ ] FreeTalkTab split (1069 → 300 lines)
- [ ] StoryMissionTab split (1247 → 400 lines)
- [ ] All tests PASS
- [ ] No bugs introduced

---

## 🎯 PRIORITY ORDER

### MUST DO (Critical):
1. ✅ Phase 1: Tests - **START HERE**
2. ✅ Phase 2: Schema validation
3. ✅ Phase 3: Extract validation logic

### NICE TO HAVE (Improvement):
4. ⚠️ Phase 4: Split prompts (sau khi tests pass)
5. ⚠️ Phase 5: Refactor tabs (sau khi Phase 4 done)

---

## 📅 TIMELINE ESTIMATE

| Phase | Time | Status |
|-------|------|--------|
| Phase 0: Current state analysis | 2h | ✅ DONE |
| Phase 1: Test foundation | 3 days | 🔄 IN PROGRESS |
| Phase 2: Schema validation | 3 days | ⏳ TODO |
| Phase 3: Extract validation | 4 days | ⏳ TODO |
| Phase 4: Split prompts | 7 days | 📅 OPTIONAL |
| Phase 5: Refactor tabs | 14 days | 📅 OPTIONAL |
| **TOTAL (Critical only)** | **~10 days** | **Phase 1-3** |
| **TOTAL (Full refactor)** | **~1 month** | **All phases** |

---

## 🚨 RED FLAGS - STOP IF:

1. **Tests không PASS sau 2 ngày** → Logic có vấn đề nghiêm trọng, cần fix trước
2. **Schema validation gây performance issues** → Re-evaluate approach
3. **Refactor gây regression bugs** → Rollback, add more tests
4. **Timeline vượt quá 2x estimate** → Re-scope, reduce ambition

---

## 🎓 LESSONS LEARNED

### DO:
- ✅ Write tests FIRST
- ✅ Validate incrementally  
- ✅ Keep tests GREEN at all times
- ✅ Commit after each working phase

### DON'T:
- ❌ Refactor without tests
- ❌ Change multiple things at once
- ❌ Skip validation steps
- ❌ Over-engineer (KISS principle)

---

## 📞 NEXT STEPS

### Immediate (Today):
1. Fix test case #4 (HOME doesn't have R)
2. Add 5 more Word Chain test cases
3. Run tests, make sure all GREEN

### Tomorrow:
1. Complete Word Chain tests (15 total)
2. Start Twenty Questions tests
3. Goal: 27 tests by end of day

### This Week:
1. Complete Phase 1 (all 37+ tests)
2. Start Phase 2 (install Zod, define schemas)

---

## 💬 COMMUNICATION

**Daily standup questions:**
1. Tests written today: X
2. Tests passing: Y/X  
3. Blockers: None / [describe]
4. Tomorrow goal: [specific deliverable]

**Weekly review:**
- Total tests: X
- Coverage: Y%
- Phases completed: [1, 2, 3...]
- Ready for refactor: Yes/No

---

## 🏆 SUCCESS CRITERIA

**You'll know refactor is successful when:**

1. ✅ Can modify Word Chain without breaking 20Q or Sentence Builder
2. ✅ All AI responses follow consistent JSON schema
3. ✅ "Cứ sửa 1 thứ lại hỏng" không còn xảy ra
4. ✅ Test suite catches bugs BEFORE production
5. ✅ Can add new game in < 1 day (with tests)

---

**Created:** Feb 6, 2026
**Status:** Phase 0 Complete ✅, Phase 1 In Progress 🔄
**Next Review:** After Phase 1 completion
