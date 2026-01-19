# AUDIT REPORT: Week 3 vs Week 2 - Content Quality Comparison
**Date**: January 16, 2026
**Status**: ⚠️ CRITICAL ISSUES FOUND
**Compared Against**: V27/V26 Specifications & Week 2 Golden Standard

---

## CRITICAL FINDING: MISSING AUDIO FIELDS IN vocab.js

### Issue 1: Missing `audio_def`, `audio_ex`, `audio_coll` Fields

**V27 File Naming Convention (Line 1282-1296)**:
```
| Vocab | `vocab_word.mp3` | `/audio/week2/vocab_mother.mp3` | + `vocab_def_mother.mp3`, `vocab_ex_mother.mp3`, `vocab_coll_mother.mp3` |
```

**What Actually Exists in Production**:
Week 2 has **49 vocab audio files** for 10 words = ~5 files per word:
- ✅ `/audio/week2/vocab_mother.mp3` (word)
- ✅ `/audio/week2/vocab_def_mother.mp3` (definition)
- ✅ `/audio/week2/vocab_ex_mother.mp3` (example)
- ✅ `/audio/week2/vocab_coll_mother.mp3` (collocation)

**Week 2 & Week 3 vocab.js Structure**:
```javascript
{
  id: 1,
  word: "mother",
  pronunciation: "/ˈmʌðər/",
  definition_vi: "Mẹ",
  definition_en: "A female parent...",
  example: "This is my mother...",
  collocation: "loving mother",
  image_url: "/images/week2/mother.jpg",
  audio_word: "/audio/week2/vocab_mother.mp3"   // ⚠️ ONLY THIS FIELD!
  // ❌ MISSING: audio_def, audio_ex, audio_coll
}
```

**Week 11 Correct Structure** (Reference):
```javascript
{
  id: 1,
  word: "community",
  image_url: "/images/week11/community.jpg",
  definition_en: "A group of people living in one area.",
  definition_vi: "Cộng đồng",
  pronunciation: "/kəˈmjuːnɪti/",
  example: "We help our community.",
  collocation: "local community",
  audio_word: "/audio/week11/vocab_community.mp3",
  audio_def: "/audio/week11/vocab_def_community.mp3",     // ✅ PRESENT
  audio_ex: "/audio/week11/vocab_ex_community.mp3",       // ✅ PRESENT
  audio_coll: "/audio/week11/vocab_coll_community.mp3"    // ✅ PRESENT
}
```

**Frontend Code Expectations**:
- `VocabManager.jsx` line 143: `word.audio_def` (plays definition audio)
- `VocabManager.jsx` line 152: `word.audio_coll` (plays collocation audio)
- `WordPower.jsx` line 134: `word.audio_def` (plays definition audio)
- `WordPower.jsx` line 143: `word.audio_coll` (plays collocation audio)

### **Impact**:
- ❌ Definition audio button won't work (null audio_def)
- ❌ Collocation audio button won't work (null audio_coll)
- ❌ Example audio button won't work (missing audio_ex field entirely)
- ❌ Week 3 will be MISSING 30 audio files that are expected to be generated

**This affects Week 1, Week 2, Week 3, and ALL weeks created with V28!**

---

## Issue 2: Insufficient Vocab Examples

### Week 2 vs Week 3 Example Content

**Week 2 Example**:
```javascript
example: "This is my mother. She loves me very much."  // 7 words, contextual
```

**Week 3 Example**:
```javascript
example: "I am tall."                                   // 3 words, too minimal
example: "Tom is short."                                // 3 words, too minimal
example: "She has long hair."                           // 4 words, too minimal
example: "He has brown eyes."                           // 4 words, too minimal
example: "Her hair is long."                            // 4 words, too minimal
example: "Tom has curly hair."                          // 4 words, too minimal
example: "Sarah has straight hair."                     // 4 words, too minimal
example: "He wears glasses."                            // 3 words, too minimal
example: "She has a big smile."                         // 5 words, too minimal
example: "His face is happy."                           // 4 words, too minimal
```

**Issue**: Week 3 examples are too short and lack context. Week 2 provides full sentences (6-7 words) that demonstrate word usage in realistic situations.

---

## Issue 3: Missing Audio Files in ask_ai.js

### Week 2 ask_ai.js Structure**:
```javascript
{
  id: 1,
  context_en: "You see something on the desk. Ask what it is.",
  context_vi: "Bạn thấy cái gì trên bàn. Hỏi nó là gì.",
  audio_url: "/audio/week2/ask_ai_1.mp3",              // ✅ PRESENT - TTS of context
  answer: ["What is this?", "What is it?"],
  hint: "What is..."
}
```

**Week 3 ask_ai.js Structure**:
```javascript
{
  id: 1,
  context_en: "You see a girl with curly hair. Ask what it is.",
  context_vi: "Bạn thấy một cô bé có tóc xoăn. Hỏi nó là gì.",
  audio_url: "/audio/week3/ask_ai_1.mp3",              // ✅ PRESENT - OK
  answer: ["What is her hair?", "Is her hair curly?"],
  hint: "What is... / Is..."
}
```

### Potential Issue in Week 3 ask_ai.js (Line 42):
```javascript
context_vi: "Bạn nhìn vào gương và thấy chính mình. Hỏi bạn thấy gì.",
answer: ["What do you see?", "Do you see yourself?"],
hint: "What do... / Do you..."
```

**Question**: These are more A1 level than A0. "Do you see yourself?" is complex for A0 beginners.

---

## Issue 4: Mindmap Audio Files - NONE GENERATED YET

### Week 2 Mindmap Structure**:
```javascript
centerStems: [
  { text: "This is my ___.", audio: "/audio/week2/mindmap_stem_1.mp3" },  // ✅ Has audio URL
  { text: "My mother is ___.", audio: "/audio/week2/mindmap_stem_2.mp3" },
  ...
],
branchLabels: {
  "This is my ___.": [
    { text: "mother and father", audio: "/audio/week2/mindmap_branch_1.mp3" },  // ✅ Has audio
    ...
  ]
}
```

**Week 3 Mindmap Structure** (Created by script):
```javascript
centerStems: [
  { text: "This is ___.", audio: "/audio/week3/mindmap_stem_1.mp3" },          // URL created but file NOT YET GENERATED
  { text: "My hair is ___.", audio: "/audio/week3/mindmap_stem_2.mp3" },
  ...
],
branchLabels: {
  "This is ___.": [
    { text: "tall", audio: "/audio/week3/mindmap_branch_1.mp3" },             // URL created but file NOT YET GENERATED
    ...
  ]
}
```

**Status**: URLs are CORRECT FORMAT but actual files don't exist yet (will be created by `batch_manager.js`).

---

## Issue 5: ask_ai.js LEVEL COMPLIANCE

### V27/V26 A0 QUESTION PATTERNS (ALLOWED ONLY):

| Pattern | Example | Notes |
|---------|---------|-------|
| What + be | What is this? | Basic identification |
| Where + be | Where is the pen? | Location |
| Is + subject | Is this a book? | Yes/No |
| Can I | Can I play? | Permission |
| Do you + verb | Do you like it? | Simple preference |

### Week 3 ask_ai.js VIOLATIONS:

**Prompt 2**:
```javascript
context_en: "Your friend wears glasses. Ask about it.",
answer: ["Do you wear glasses?", "Can you see without them?"]
                                 ↑ TOO COMPLEX for A0 (auxiliary + verb)
```

**Prompt 3**:
```javascript
context_en: "You look in mirror and see yourself. Ask what you see.",
answer: ["What do you see?", "Do you see yourself?"]
         ↑ OK (What do = A0)
```

**Prompt 4**:
```javascript
context_en: "Your friend is very tall. Ask about his height.",
answer: ["Are you very tall?", "Is your height from your father?"]
                                ↑ TOO COMPLEX (Is + noun phrase from)
```

**Prompt 5**:
```javascript
context_en: "Two friends have different hair styles. Ask about it.",
answer: ["Do they have different hair?", "Is her hair different from his?"]
         ↑ "they have" = slightly complex; "different from" = comparison (A1+)
```

**Issue**: Week 3 has 3-4 prompts with A1-level patterns, not pure A0.

---

## Issue 6: Content Quality & Vocab Consistency

### Week 2 read.js Vocab Coverage**:
```
Story vocab: name, family, team, mother, leader, father, helper, brother, sister, love, home (11+ words)
Bolded: name, family, team, mother, leader, father, helper, brother, sister, love, home
Exactly matches vocab.js: ✅ YES
```

### Week 3 read.js Vocab Coverage**:
```
Story vocab: Sarah, tall, long, hair, brown, eyes, wears, glasses, Tom, short, curly, smile, round, face (14+ words)
Bolded: Sarah, tall, long, hair, eyes, glasses, Tom, short, curly, hair, smile, face (12 words)
From vocab.js: tall, short, hair, eyes, long, curly, straight, glasses, smile, face (10 words)
Problem: 
  - "brown" is NOT in vocab.js but used in text
  - "round" is NOT in vocab.js but used in text
  - "wears" is NOT in vocab.js
  - "Sarah" is NOT in vocab.js
  - "Tom" is NOT in vocab.js
```

**Issue**: read.js introduces 4 new words not in vocab.js, violating the constraint that ALL bolded words should come from vocab.js.

---

## Issue 7: Explore.js Topic Consistency

### Week 2 explore.js**:
```
Title: "Family People Around Us" (CLIL science)
Topic: Different family roles and responsibilities
Words used: leader, helper, member, team, work together, family
Vocab overlap with vocab.js: HIGH (90%)
Content: Science/Social Studies about family structure
```

### Week 3 explore.js**:
```
Title: "Magic Mirrors" (CLIL science)
Topic: Observation and appearance
Words used: tall, short, curly, straight, smile, face, eyes, hair, same/different
Vocab overlap with vocab.js: MEDIUM (70%)
Content: Science/Observation about physical features
Status: ✅ Content seems OK but needs verification
```

---

## Issue 8: Writing.js Structure Missing/Incomplete

### Expected from V27/V26 Spec**:
```javascript
{
  content: "Write about...",
  model_sentence: "I am...",
  keywords: ["word1", "word2", ...],
  min_words: 40,  // A0 = 40 words
  image_url: "...",
  audio_url: "..."
}
```

### Week 3 writing.js Status**: Need to verify if complete.

---

## SUMMARY OF CRITICAL ISSUES

### 🔴 BLOCKING ISSUES (Must Fix Before Production):

1. **Missing vocab.js Fields** (CRITICAL)
   - Missing: `audio_def`, `audio_ex`, `audio_coll` in all vocab words
   - Affects: Week 1, 2, 3, and all weeks using current structure
   - Fix: Add 3 missing fields to vocab.js
   - Impact: Definition & collocation audio buttons won't work

2. **Weak Example Sentences** (HIGH)
   - Week 3 examples are too short (3-5 words vs Week 2's 6-7 words)
   - Fix: Expand examples to 6-7 words with proper context

3. **read.js Vocab Violations** (HIGH)
   - Non-vocabulary words in text: "brown", "round", "wears", "Sarah", "Tom"
   - Fix: Remove non-vocabulary words from read.js or add to vocab.js

4. **ask_ai.js Level Violations** (MEDIUM)
   - Prompts 2, 4, 5 have A1-level patterns (not A0)
   - Fix: Simplify prompts to match A0 pattern list

### 🟡 VALIDATION ISSUES (Found by Validator):

5. **Validator Script Gap** (MEDIUM)
   - Validation script didn't catch missing audio_def/audio_ex/audio_coll
   - Reason: Script only checks URL FORMAT, not field existence
   - Fix: Update validate_week3_urls.js to check for all required fields

### 🟢 STATUS OK:

- Mindmap structure: ✅ Correct format, URLs present, files will be generated
- daily_watch.js: ✅ Proper YouTube video IDs
- video_queries.json: ✅ 6 backup search keywords present
- Grammar.js: ✅ Mix of MC/Fill/Unscramble
- Logic.js: ✅ 5 puzzles with context
- Dictation/Shadowing: ✅ Extracted from read.js
- Database: ✅ Registered
- Index.js: ✅ All stations present

---

## ROOT CAUSE ANALYSIS: Why V28 Failed

### V28 Specification Gaps:

1. **V28 doesn't specify audio_def, audio_ex, audio_coll in vocab.js structure**
   - V27 spec was unclear about these fields
   - Frontend code expects them but they're not documented in V28
   - Created in 10+ weeks but missing from V28

2. **V28 reduced ask_ai context length** (maybe too aggressive)
   - This forced week creators to use shorter, less natural contexts
   - Resulted in A1-level questions being forced into A0 framework

3. **V28 didn't validate bolded word source**
   - Script validates URL format but not semantic compliance
   - Should verify all bolded words = vocab.js words

---

## RECOMMENDATIONS

1. **FIX vocab.js IMMEDIATELY**
   - Add audio_def, audio_ex, audio_coll to Week 1, 2, 3 and all weeks
   - Pattern: `/audio/week<id>/vocab_def_<word>.mp3`

2. **Regenerate Week 3 Content**
   - Fix examples to be 6-7 words
   - Remove non-vocabulary words from read.js
   - Simplify ask_ai.js to pure A0 patterns

3. **Update V28 Specification**
   - Add explicit vocab.js audio field requirements
   - Show Week 11 as golden standard example

4. **Update Validation Script**
   - Check for audio_def, audio_ex, audio_coll presence
   - Validate bolded words match vocab.js
   - Check ask_ai patterns against allowed list

5. **Regenerate audio files**
   - After fixing data, run batch_manager.js to generate missing 30 audio files per week

---

## FILES TO REVIEW/FIX

- [ ] `/src/data/weeks/week_03/vocab.js` - Add audio fields
- [ ] `/src/data/weeks/week_03/read.js` - Fix examples, remove extra words
- [ ] `/src/data/weeks/week_03/ask_ai.js` - Simplify level violations
- [ ] `/src/data/weeks_easy/week_03/vocab.js` - Add audio fields
- [ ] `/src/data/weeks_easy/week_03/read.js` - Fix examples
- [ ] `/src/data/weeks_easy/week_03/ask_ai.js` - Simplify  
- [ ] `tools/validate_week3_urls.js` - Update to check field existence
- [ ] `ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt` - Add audio field documentation

---

**Status**: 🔴 READY FOR FIXES - Do not proceed with audio/image generation until these issues are resolved.
