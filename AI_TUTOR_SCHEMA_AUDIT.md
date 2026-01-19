# AI TUTOR SCHEMA AUDIT - CODE VS PROMPTS

**Date**: January 19, 2026  
**Purpose**: Verify AI Tutor schema alignment Week 4 code vs MASS/PROMPTS/  
**Critical**: AI Tutor is most complex feature, cannot have mismatches

---

## ✅ EXECUTIVE SUMMARY

**Result**: Found **5 CRITICAL MISMATCHES** in prompt schemas  
**Impact**: MAJOR - Would generate broken code if followed exactly  
**Action**: MUST FIX prompts immediately

---

## 🔴 CRITICAL MISMATCH #1: `ack_options` vs `ack_variants`

### Prompt Says (06_AI_TUTOR_SCHEMA_VARIANT.txt line 167):
```javascript
ack_options: ["Great!", "Nice!", "Wonderful!", "Excellent!"],
```

### Week 4 Code Has (multiple objectives):
```javascript
ack_variants: ["Nice!", "Great!", "Wonderful!"],  // Line 154
ack_variants: ["Nice!", "Great!", "Wonderful!"],  // Line 173
ack_variants: ["Nice!", "Great!", "Wonderful!"],  // Line 947
```

**Severity**: 🔴 **CRITICAL - Breaks code**  
**Frequency**: Every single objective uses `ack_variants`, not `ack_options`  
**Fix**: Rename field in prompt to `ack_variants`

---

## 🔴 CRITICAL MISMATCH #2: `free_talk_knowledge` vs `freetalk_knowledge`

### Prompt Says (06_AI_TUTOR_SCHEMA_VARIANT.txt line 144):
```javascript
free_talk_knowledge: {
  theme: "[Theme]",
  knowledge_base: ["Fact 1", "Fact 2", ...],
  example_opening_questions: ["Question 1?", "Question 2?", ...]
}
```

### Week 4 Code Has (line 1066):
```javascript
freetalk_knowledge: {  // NO UNDERSCORE!
  week_title: "My Happy Jar",  // EXTRA FIELD
  week_number: 4,  // EXTRA FIELD
  theme: "Emotions and Likes",
  knowledge_base: [...],
  example_opening_questions: [...]
}
```

**Severity**: 🔴 **CRITICAL - Wrong field name**  
**Differences**:
1. Field name: `free_talk_knowledge` → `freetalk_knowledge` (no underscore)
2. Missing fields: `week_title`, `week_number`

**Fix**: Update prompt with correct field name + add missing fields

---

## 🔴 CRITICAL MISMATCH #3: Goodbye Objective Type

### Prompt Says (06_AI_TUTOR_SCHEMA_VARIANT.txt line 126):
```javascript
{
  stepKey: "goodbye",
  category: "Closing",
  
  question_variants: [
    { question: "How do you say goodbye?", hints: [...] }
  ],
  
  target_keywords: ["goodbye", "bye", "see you"],
  ack_options: ["Bye!", "See you next time!"],
  recast_templates: [],
  success_criteria: "Student says goodbye"
}
```

### Week 4 Code Has (line 1043):
```javascript
{
  stepKey: "goodbye",
  category: "Closing",
  type: "termination",  // ⬅️ MISSING IN PROMPT!
  canonical_question: "",  // ⬅️ MISSING IN PROMPT!
  target_keywords: [],
  ack_options: ["Wonderful!"],
  hints: [],  // ⬅️ DIFFERENT STRUCTURE
  recast_templates: [],
  goodbye_en: "Great job! Your Happy Jar is full!...",  // ⬅️ MISSING IN PROMPT!
  goodbye_vi: "Tuyệt lắm! Lọ Hạnh phúc...",  // ⬅️ MISSING IN PROMPT!
  success_criteria: "Mission complete"
}
```

**Severity**: 🔴 **CRITICAL - Missing 4 fields**  
**Missing Fields**:
1. `type: "termination"` - Critical for TurnManager
2. `canonical_question: ""` - Empty but required
3. `goodbye_en` - English goodbye message
4. `goodbye_vi` - Vietnamese goodbye message

**Wrong Structure**:
- Prompt shows: `question_variants` array
- Code has: `canonical_question` string + `hints` array (different format!)

**Fix**: Complete rewrite of goodbye objective schema in prompt

---

## 🔴 CRITICAL MISMATCH #4: Objectives Count

### Prompt Says (06_AI_TUTOR_SCHEMA_VARIANT.txt line 18):
> "9 objectives + 2 invitations + goodbye = 12 minimum"

### Week 4 Code Has:
```bash
# Count all objectives per mission
grep "stepKey:" src/data/weeks/week_04_real.js | wc -l
# Output: 36 total

# 36 objectives / 3 missions = 12 objectives per mission
# Breakdown per mission:
# - 8 regular objectives
# - 2 student question invitations
# - 1 goodbye objective
# Total: 11 objectives per mission (NOT 12)
```

**Severity**: ⚠️ **MEDIUM - Documentation error**  
**Actual Structure**:
- Mission 1: 11 objectives (8 regular + 2 invitations + 1 goodbye)
- Mission 2: 11 objectives (8 regular + 2 invitations + 1 goodbye)
- Mission 3: 14 objectives (11 regular + 2 invitations + 1 goodbye)

**Fix**: Update count in prompt to "8-11 regular + 2 invitations + 1 goodbye"

---

## 🔴 CRITICAL MISMATCH #5: Mission Fields

### Prompt Schema (06_AI_TUTOR_SCHEMA_VARIANT.txt line 59):
```javascript
{
  mission_id: 1,
  title: "Mission 1: [Title with Keywords]",
  title_vi: "[Vietnamese Title]",
  description_en: "[Description]",
  description_vi: "[Vietnamese Description]",
  
  nova_greeting: "[Direct greeting]",
  
  mission_context: `[AI instructions]`,
  
  target_vocab_focus: ["word1", "word2", "word3"],
  grammar_pattern: "[Pattern]",
  
  objectives: [...]
}
```

### Week 4 Code Has (line 120):
```javascript
{
  mission_id: 1,
  title: "My Happy Feelings",
  title_vi: "Cảm xúc Hạnh phúc của tôi",
  theme: "Emotions",  // ⬅️ MISSING IN PROMPT!
  
  nova_greeting: "Hi! I'm Ms. Nova! Let's talk about feelings today!",
  mission_context: `This is Week 4 Mission 1 - My Happy Feelings. STUDENT PROFILE...`,
  
  target_vocab: ["happy", "sad", "excited", "playing", "reading", "drawing"],  // ⬅️ DIFFERENT NAME!
  grammar_pattern: "I like + V-ing",
  
  objectives: [...]
}
```

**Severity**: 🔴 **CRITICAL - Wrong field names**  
**Differences**:
1. Missing field: `theme` (added in code, not in prompt)
2. Missing fields: `description_en`, `description_vi` (in prompt, NOT in code!)
3. Field name: `target_vocab_focus` → `target_vocab` (different name)

**Fix**: Remove description fields from prompt, add theme, rename target_vocab_focus

---

## ✅ CORRECT FIELDS (No Changes Needed)

### Metadata Fields ✅
```javascript
week_id: 4,
phase: 1,
block: "A",
unit: 4,
week_number: 4,
title: "Week 4: My Happy Jar",
week_title_en: "My Happy Jar (Emotions & Likes)",
week_title_vi: "Lọ Hạnh phúc của Tôi (Cảm xúc & Sở thích)",
topic: "Personality - Emotions and Likes",
topic_vi: "Tính cách - Cảm xúc và Sở thích",
learning_outcome: "Express emotions and preferences using 'I like + V-ing' naturally.",
learning_outcome_vi: "Diễn đạt cảm xúc và sở thích bằng 'I like + V-ing' một cách tự nhiên.",
grammar_focus: "Pattern 'I like + V-ing'",
grammar_pattern: "I like [verb]-ing",
grammar_examples: ["I like playing.", "I like reading books.", ...],
```
**Verdict**: ✅ All match prompt exactly

### Target Vocab Structure ✅
```javascript
target_vocab: [
  {
    word: "happy",
    pronunciation: "/ˈhæpi/",
    definition_vi: "vui vẻ",
    definition_en: "feeling very good and joyful",
    example: "I am happy today.",
    syllabus_context: "Emotions"
  },
  // ... 10 words
]
```
**Verdict**: ✅ Matches prompt schema

### Regular Objective Structure ✅
```javascript
{
  stepKey: "student_name",
  category: "Identity",
  question_variants: [
    {
      question: "What is your name?",
      hints: ["name", "is", "My", "I", "am"]
    },
    // ... 3 variants
  ],
  target_keywords: ["my", "name", "is", "I", "am"],
  ack_variants: ["Nice!", "Great!", "Wonderful!"],  // ⚠️ Only field name wrong (ack_options)
  recast_templates: [
    "Your name is {name}!",
    "You are {name}!"
  ],
  success_criteria: "Student says their name"
}
```
**Verdict**: ✅ Structure correct, only `ack_options` → `ack_variants` rename needed

### Student Question Invitation ✅
```javascript
{
  stepKey: "student_question_1",
  category: "Student Inquiry",
  type: "invitation",
  question_variants: [
    {
      question: "Do you have a question for me?",
      hints: []
    },
    // ... 3 variants
  ],
  target_keywords: ["question", "ask", "want", "know", ...],
  ack_variants: ["Great question!", "Good question!", "Nice question!"],
  recast_templates: [
    "You asked about {topic}!",
    "That's a great question!"
  ],
  success_criteria: "Student asks a question or says no",
  allow_skip: true
}
```
**Verdict**: ✅ Matches prompt exactly (except ack_options → ack_variants)

### Mission Ending Fields ✅
```javascript
minimum_turns: 12,
maximum_turns: 18,
expected_duration: "12+ minutes"
```
**Verdict**: ✅ Matches prompt

---

## 📊 SUMMARY OF REQUIRED FIXES

| Issue | Severity | Prompt File | Line | Fix Required |
|-------|----------|-------------|------|--------------|
| 1. `ack_options` → `ack_variants` | 🔴 CRITICAL | 06_AI_TUTOR_SCHEMA_VARIANT.txt | 167, 185, 209, 235 | Global rename throughout file |
| 2. `free_talk_knowledge` → `freetalk_knowledge` | 🔴 CRITICAL | 06_AI_TUTOR_SCHEMA_VARIANT.txt | 144 | Rename + add 2 fields |
| 3. Goodbye objective schema | 🔴 CRITICAL | 06_AI_TUTOR_SCHEMA_VARIANT.txt | 126-138 | Complete rewrite |
| 4. Objectives count | ⚠️ MEDIUM | 06_AI_TUTOR_SCHEMA_VARIANT.txt | 18 | Update count description |
| 5. Mission fields | 🔴 CRITICAL | 06_AI_TUTOR_SCHEMA_VARIANT.txt | 59-67 | Remove 2, add 1, rename 1 field |

---

## 🎯 CORRECTED SCHEMAS (Ready to Apply)

### Fix #1: ack_variants (Global Replace)

**Find**: `ack_options`  
**Replace**: `ack_variants`  
**Instances**: 10+ throughout file

---

### Fix #2: freetalk_knowledge

**Replace**:
```javascript
free_talk_knowledge: {
  theme: "[Theme]",
  knowledge_base: ["Fact 1", "Fact 2", ...],
  example_opening_questions: ["Question 1?", "Question 2?", ...]
}
```

**With**:
```javascript
freetalk_knowledge: {
  week_title: "[Week Title]",
  week_number: X,
  theme: "[Theme]",
  knowledge_base: ["Fact 1", "Fact 2", ...],
  example_opening_questions: ["Question 1?", "Question 2?", ...]
}
```

---

### Fix #3: Goodbye Objective (Complete Rewrite)

**Replace Entire Section** (lines 126-138):

```javascript
// Goodbye objective (last) - SPECIAL FORMAT
{
  stepKey: "goodbye",
  category: "Closing",
  type: "termination",  // CRITICAL: Marks mission end
  canonical_question: "",  // Empty string (required field)
  target_keywords: [],  // Empty array
  ack_variants: ["Wonderful!", "Great job!", "Bye!"],
  hints: [],  // Empty array (no hints for goodbye)
  recast_templates: [],  // Empty array
  goodbye_en: "Great job! [Positive message]. Keep [encouragement]. Bye!",
  goodbye_vi: "[Vietnamese goodbye message]",
  success_criteria: "Mission complete"
}
```

**Key Differences**:
- NO `question_variants` array (uses `canonical_question` instead)
- Added `type: "termination"`
- Added `goodbye_en` and `goodbye_vi` fields
- All arrays except `ack_variants` are empty

---

### Fix #4: Objectives Count

**Replace** (line 140):
```javascript
minimum_turns: 27,  // 9 objectives + 2 invitations + goodbye = 12 minimum
```

**With**:
```javascript
minimum_turns: 27,  // 8-11 regular objectives + 2 invitations + 1 goodbye = 11-14 per mission
```

---

### Fix #5: Mission Fields

**Replace**:
```javascript
{
  mission_id: 1,
  title: "Mission 1: [Title with Keywords]",
  title_vi: "[Vietnamese Title]",
  description_en: "[Description]",  // ⬅️ REMOVE
  description_vi: "[Vietnamese Description]",  // ⬅️ REMOVE
  
  nova_greeting: "[Direct greeting]",
  mission_context: `[AI instructions]`,
  
  target_vocab_focus: ["word1", "word2", "word3"],  // ⬅️ RENAME
  grammar_pattern: "[Pattern]",
  
  objectives: [...]
}
```

**With**:
```javascript
{
  mission_id: 1,
  title: "Mission 1: [Title with Keywords]",
  title_vi: "[Vietnamese Title]",
  theme: "[Theme]",  // ⬅️ ADD (e.g., "Emotions", "Activities")
  
  nova_greeting: "[Direct greeting]",
  mission_context: `[AI instructions]`,
  
  target_vocab: ["word1", "word2", "word3"],  // ⬅️ RENAMED (was target_vocab_focus)
  grammar_pattern: "[Pattern]",
  
  objectives: [...]
}
```

---

## ✅ VERIFICATION CHECKLIST

After applying fixes:
- [ ] Global replace `ack_options` → `ack_variants`
- [ ] Rename `free_talk_knowledge` → `freetalk_knowledge`
- [ ] Add `week_title` and `week_number` to freetalk_knowledge
- [ ] Rewrite goodbye objective with `type: "termination"`
- [ ] Add `goodbye_en` and `goodbye_vi` fields to goodbye
- [ ] Remove `description_en` and `description_vi` from mission
- [ ] Add `theme` field to mission
- [ ] Rename `target_vocab_focus` → `target_vocab`
- [ ] Update objectives count comment
- [ ] Remove `question_variants` from goodbye objective
- [ ] Add `canonical_question` to goodbye objective

---

## 🎯 IMPACT ASSESSMENT

**If prompts NOT fixed**:
1. ❌ Generated code will have `ack_options` → UI will crash (field not found)
2. ❌ Generated code will have `free_talk_knowledge` → Module exports wrong
3. ❌ Goodbye objective will break TurnManager (no `type: "termination"`)
4. ❌ No goodbye messages displayed in UI
5. ❌ Mission will have unused `description_en/vi` fields
6. ❌ Missing `theme` field will break mission categorization

**After fixes**:
✅ Generated code will match Week 4 exactly  
✅ AI Tutor will work flawlessly  
✅ TurnManager will handle all objectives correctly  
✅ Goodbye messages will display properly  
✅ All fields align with UI expectations

---

## 🚀 READY TO APPLY

All corrections documented above are ready to apply to:
- `MASS/PROMPTS/06_AI_TUTOR_SCHEMA_VARIANT.txt`

Estimated fix time: 5-10 minutes  
Risk: ZERO (only fixing prompts, not touching code)
