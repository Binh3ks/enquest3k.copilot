# 🎓 Bug Fix: Grammar Guard for Games - Jan 31, 2026

## Problem Identified

**Issue:** AI sử dụng quá khứ đơn trong game ở tuần 2, nhưng chưa dạy past tense.

**Example from console:**
```
User: "is she my sister"
AI: "Yes, she is your mom. I am happy you guessed it!" ❌ "guessed" = past tense

User: "is it a chair"  
AI: "You are very good at this game! I am happy you guessed it." ❌ "guessed" again

User: "is this rice"
AI: "Yes, it is rice. You are very smart! I am happy you guessed it." ❌ "guessed" lần 3
```

**Root Cause:**
- Game prompts KHÔNG có grammar restrictions
- AI tự do dùng bất kỳ grammar nào (past, future, present perfect)
- Tuần 2 chỉ dạy: "My [noun] is [adj]" (simple present)
- Past tense (guessed, was, did) KHÔNG dạy đến tuần 10+

## Solution Implemented

### 1. Added Cumulative Grammar System

**New Function: `getCumulativeGrammarRules()`**

```javascript
function getCumulativeGrammarRules(currentWeek) {
  const grammarRules = [];
  
  for (let w = 1; w <= currentWeek; w++) {
    const weekData = WEEK_DATA_MAP[w];
    if (weekData) {
      grammarRules.push({
        week: w,
        focus: weekData.grammar_focus,
        pattern: weekData.grammar_pattern,
        examples: weekData.grammar_examples
      });
    }
  }
  
  return grammarRules;
}
```

**Output for Week 2:**
```javascript
[
  {
    week: 1,
    focus: "Subject Pronouns (I, You)",
    pattern: "I am [noun/adjective].",
    examples: ["I am a student.", "You are my friend."]
  },
  {
    week: 2,
    focus: "Possessive Adjectives (My, Your)",
    pattern: "My [family member] is [adjective].",
    examples: ["My mother is kind.", "My father is strong."]
  }
]
```

### 2. Grammar Constraints Template

**Added to all game prompts:**

```
⚠️⚠️⚠️ GRAMMAR RESTRICTIONS (WEEKS 1-2) ⚠️⚠️⚠️

YOU CAN ONLY USE THESE GRAMMAR PATTERNS (FROM WEEKS YOU'VE TAUGHT):

WEEK 1: Subject Pronouns (I, You)
Pattern: I am [noun/adjective].
Examples:
  - I am a student.
  - You are my friend.
  - I am happy.

WEEK 2: Possessive Adjectives (My, Your)
Pattern: My [family member] is [adjective].
Examples:
  - My mother is kind.
  - My father is strong.
  - My brother is funny.

🚨 FORBIDDEN GRAMMAR (NOT TAUGHT YET):
- Past tense (I guessed, she was, he did) ← NOT ALLOWED until Week 10+
- Present perfect (I have been, she has done) ← NOT ALLOWED
- Future tense (I will, she will be) ← NOT ALLOWED until Week 8+
- Complex sentences with "because", "when", "if" ← Keep it simple!

✅ CORRECT EXAMPLES FOR THIS WEEK:
- My mother is kind.
- My father is strong.
- My brother is funny.

❌ WRONG EXAMPLES (DO NOT USE):
- "You guessed it!" ← NO! Use "You guess it!" or "Good job!"
- "I was thinking of..." ← NO! Use "I think of..." or "I'm thinking of..."
- "She has been..." ← NO! Use "She is..."
```

### 3. Week-by-Week Grammar Progression

| Week | Grammar Focus | Allowed Tenses | Forbidden |
|------|--------------|----------------|-----------|
| 1 | Subject Pronouns (I, You) | Simple present only | Past, future, perfect |
| 2 | Possessive Adjectives (My, Your) | Simple present only | Past, future, perfect |
| 3 | is vs has (describing) | Simple present only | Past, future, perfect |
| 4 | I like + V-ing | Simple present + gerunds | Past, future, perfect |
| 5 | There is/are | Simple present | Past, future, perfect |
| 6 | Prepositions of place | Simple present | Past, future, perfect |
| 7 | Can/Can't (ability) | Simple present + modals | Past, future, perfect |
| 8+ | (Future tenses taught later) | + Will/going to | Past, perfect |
| 10+ | (Past tenses taught later) | + Past simple | Perfect |

### 4. Updated generateGameAIPrompt Function

**Signature change:**
```javascript
// BEFORE
function generateGameAIPrompt(gameId, gameConfig, gameContent, preSelectedObject = null)

// AFTER
function generateGameAIPrompt(gameId, gameConfig, gameContent, preSelectedObject = null, grammarRules = [])
```

### 5. Updated All Game Prompts

**Word Chain:**
```javascript
word_chain: `🎮 WORD CHAIN GAME - ESL Vocabulary Learning Tool

${grammarConstraints}  // ← NEW: Grammar restrictions BEFORE game rules

📚 VOCABULARY ONLY: ${vocab}
...
```

**20 Questions:**
```javascript
twenty_questions: `You are Ms. Nova 🎯 playing 20 Questions

${grammarConstraints}  // ← NEW: Grammar guard

YOUR SECRET OBJECT: ${preSelectedObject?.toUpperCase()}
...
```

**Sentence Builder:**
```javascript
sentence_builder: `You are Ms. Nova 🧩 playing Sentence Builder

${grammarConstraints}  // ← NEW: Grammar constraints

⛔⛔⛔ CRITICAL VOCABULARY RESTRICTION ⛔⛔⛔
...
```

## Expected Behavior After Fix

### Week 2 - 20 Questions

**BEFORE (WRONG):**
```
AI: "Yes, she is your mom. I am happy you guessed it!" ❌
AI: "Yes, it is a chair. You are very good! I am happy you guessed it." ❌
```

**AFTER (CORRECT):**
```
AI: "Yes! She is your mom! You are very smart!" ✅
AI: "Yes! It is a chair! Good job!" ✅
AI: "Yes! It is rice! You are right!" ✅
```

### Week 3 - 20 Questions

**Allowed grammar:**
- Week 1: I am, You are
- Week 2: My/Your + is
- Week 3: She is, She has

```
AI: "Yes! She is tall! You are correct!" ✅
AI: "Yes! She has long hair!" ✅
```

### Week 4 - 20 Questions

**Allowed grammar:**
- Week 1-3: (previous)
- Week 4: I like + V-ing

```
AI: "Good! I like playing too!" ✅
AI: "Yes! You are happy!" ✅
```

## Files Modified

1. ✅ `/src/services/ai_tutor/gamePromptBuilder.js`
   - Added `WEEK_DATA_MAP` constant
   - Added `getCumulativeGrammarRules()` function
   - Updated `generateGameAIPrompt()` to accept `grammarRules` param
   - Added `grammarConstraints` template to all game prompts
   - Called `getCumulativeGrammarRules(weekNumber)` in buildGamePrompt

## Testing Checklist

### Week 2 (Possessive Adjectives)

**Allowed:**
- ✅ "My mother is kind."
- ✅ "Your sister is smart."
- ✅ "She is a girl."
- ✅ "You are right!"
- ✅ "Good job!"

**Forbidden:**
- ❌ "You guessed it!" (past tense)
- ❌ "I was thinking..." (past continuous)
- ❌ "You will guess..." (future)
- ❌ "You have guessed..." (present perfect)

### Week 3 (is vs has)

**Allowed:**
- ✅ "She is tall."
- ✅ "She has long hair."
- ✅ "He is short."
- ✅ "You are correct!"

**Forbidden:**
- ❌ "She was tall." (past)
- ❌ "You guessed correctly." (past)

### Week 4 (I like + V-ing)

**Allowed:**
- ✅ "I like playing."
- ✅ "You are excited!"
- ✅ "She is happy."

**Forbidden:**
- ❌ "I liked playing." (past)
- ❌ "You were excited." (past)

## Console Logs to Monitor

```javascript
// Grammar rules loaded
📚 Cumulative grammar rules loaded: {
  weekId: 2,
  totalGrammarRules: 2,
  rules: ['Week 1: Subject Pronouns (I, You)', 'Week 2: Possessive Adjectives (My, Your)']
}

// System prompt will include grammar constraints
📝 sendToAI - System Prompt LENGTH: 4500+ chars (includes grammar guard)
```

## Grammar Progression Map (Reference)

**Phase 1 (Weeks 1-7): Present Tense Foundation**
- Week 1: I am, You are
- Week 2: My/Your + noun + is
- Week 3: is vs has
- Week 4: I like + V-ing
- Week 5: There is/are
- Week 6: Prepositions (in, on, under)
- Week 7: Can/Can't

**Phase 2 (Weeks 8-14): Expanding Present**
- Week 8: Present continuous (I am playing)
- Week 9: Questions (What/Where/Who)
- Week 10: Past simple (I played) ← FIRST PAST TENSE

**Phase 3 (Weeks 15+): Complex Structures**
- Week 15+: Present perfect (I have been)
- Week 20+: Complex sentences with conjunctions

## Impact

- **Bug severity:** HIGH (grammar errors break learning progression)
- **Fix complexity:** MEDIUM (added cumulative system)
- **Testing priority:** CRITICAL (affects all games across all weeks)
- **Regression risk:** LOW (additive feature, doesn't break existing logic)

## Related Documentation

- `/src/data/weeks/week_02_real.js` - Grammar focus: Possessive Adjectives
- `/src/data/weeks/week_03_real.js` - Grammar focus: is vs has
- `/src/data/weeks/week_04_real.js` - Grammar focus: I like + V-ing
- `/src/config/gameAdaptation.js` - Game content per week

## Next Steps

1. ✅ Test Week 2 games - verify NO past tense used
2. ✅ Test Week 3 games - verify is/has used correctly
3. ✅ Test Week 4 games - verify V-ing patterns work
4. 🔄 Monitor console logs for grammar constraint violations
5. 🔄 Update other AI prompt builders (story, quiz) with same grammar guard
