# CRITICAL CORRECTION: Vocab Differentiation Rule
## Date: March 7, 2026

---

## ❌ PREVIOUS MISUNDERSTANDING (NOW FIXED)

**What I thought (WRONG)**:
- Bold words in read.js MUST be identical between modes
- vocab.js words MUST match between Easy and Advanced
- Differentiation only in definitions/examples

**What I did (WRONG)**:
1. Changed Advanced vocab.js from academic words (perform, talent, ability, showcase...) to simple words (climb, cook, dance, draw...)
2. Created validation rules forcing vocab words to match
3. Committed these changes as "fixes" (commits 79902e6 and f02d377)

---

## ✅ CORRECT UNDERSTANDING (FROM BLUEPRINT & SYLLABUS)

### **Vocabulary Tier System**

From Blueprint Section IV - Production Specs:

**Easy Mode:**
- **Tier 1 & Basic Tier 2**
- 50% từ vựng cốt lõi giống Syllabus, 50% từ vựng sinh hoạt dễ hiểu
- Examples: sing, dance, run, jump, climb, ride, draw, play, cook, swim

**Advanced Mode:**
- **Tier 2 & 3**
- 100% từ vựng học thuật, chuyên ngành (CLIL)
- Examples: perform, talent, ability, showcase, demonstrate, skill, practice, achieve, improve, confident

### **Vocabulary Lag Rule**

From Blueprint:
> "Vocabulary Lag (Độ trễ): Đảm bảo từ vựng Advanced Mode tuần này là tiền đề (Pre-teach) cho Easy Mode của 2-3 tuần sau trong Syllabus."

**This means:**
- Advanced vocab teaches MORE COMPLEX words earlier
- These words may later appear in Easy mode of future weeks (simplified)
- Words SHOULD be different between modes at the same week

---

## 📋 CORRECT RULES

### **Rule 1: Bold Words**
- ✅ Each mode has 10 bold words
- ✅ Words **CAN and SHOULD differ** by tier level
- ✅ Advanced uses Tier 2/3, Easy uses Tier 1
- ❌ DO NOT require bold words to match between modes

### **Rule 2: vocab.js**
- ✅ Each mode has 10 vocab words
- ✅ Words **SHOULD differ** to reflect tier levels
- ✅ Advanced = academic/CLIL vocabulary
- ✅ Easy = daily/simple vocabulary
- ❌ DO NOT require vocab words to match between modes

### **Rule 3: Syllabus Alignment**
- Week 12 Syllabus: "sing, dance, run, jump, climb, ride a bike, draw"
- Easy Mode Week 12: sing, dance, run, jump, climb, ride, draw, play, cook, swim ✅ (Tier 1)
- Advanced Mode Week 12: perform, talent, ability, showcase, demonstrate, skill, practice, achieve, improve, confident ✅ (Tier 2/3)

---

## 🔧 FIXES APPLIED

### 1. **Reverted Incorrect Commits**
```bash
git revert --no-commit f02d377 79902e6
```
- Restored Advanced vocab.js to academic words
- Removed incorrect WEEK_12_COMPLETE_AUDIT_FIX_REPORT.md

### 2. **Fixed validate_dual_mode.sh**

**CHECK 1 - Before (WRONG):**
```bash
# Bold Words MUST BE IDENTICAL (same 10 words)
echo "Rule: Easy and Advanced must teach SAME 10 vocab words"
```

**CHECK 1 - After (CORRECT):**
```bash
# Bold Words Count (10 per mode, CAN be different)
echo "Rule: Each mode must have 10 bold words (words CAN differ by level)"
echo "Blueprint: Easy=Tier 1, Advanced=Tier 2/3"
```

**CHECK 5 - Before (WRONG):**
```bash
# Vocab.js Words Match
echo "Rule: Same 10 words in both vocab.js files"
if words_match; then PASS; else FAIL; fi
```

**CHECK 5 - After (CORRECT):**
```bash
# Vocab.js Tier Differentiation
echo "Rule: Words SHOULD differ between modes (Easy=Tier 1, Advanced=Tier 2/3)"
if same_count=10 && easy_count=10; then PASS; fi
if all_words_identical; then WARNING; fi
```

### 3. **Updated mass_produce_week.py**
- Removed incorrect vocab matching validation
- Kept original dual vocab list structure:
  ```python
  "vocab_advanced": [],  # Academic/complex words (Tier 2/3)
  "vocab_easy": [],      # Simple daily words (Tier 1)
  ```

---

## 📚 EXAMPLES OF CORRECT DIFFERENTIATION

### Week 12: The Talent Show

**Easy Mode (Tier 1):**
```javascript
vocab: [
  { word: "sing", definition_en: "to make music with your voice" },
  { word: "dance", definition_en: "to move your body to music" },
  { word: "run", definition_en: "to move fast with your legs" },
  { word: "jump", definition_en: "to push yourself up into the air" },
  { word: "swim", definition_en: "to move through water" },
  { word: "draw", definition_en: "to make pictures with pencils" },
  { word: "play", definition_en: "to do something for fun" },
  { word: "cook", definition_en: "to make food hot and ready to eat" },
  { word: "climb", definition_en: "to go up using hands and feet" },
  { word: "ride", definition_en: "to sit on and control something" }
]
```

**Advanced Mode (Tier 2/3):**
```javascript
vocab: [
  { word: "perform", definition_en: "to do an activity in front of an audience" },
  { word: "talent", definition_en: "a natural ability to do something well" },
  { word: "ability", definition_en: "the power or skill to do something" },
  { word: "showcase", definition_en: "to show the best of something" },
  { word: "demonstrate", definition_en: "to show how something works" },
  { word: "skill", definition_en: "the ability to do something well through practice" },
  { word: "practice", definition_en: "to do something regularly to improve" },
  { word: "achieve", definition_en: "to successfully do or complete something" },
  { word: "improve", definition_en: "to become or make something better" },
  { word: "confident", definition_en: "believing in your ability to do something" }
]
```

**Why This is Correct:**
- Easy uses ACTION VERBS (Tier 1): sing, dance, run, swim...
- Advanced uses ABSTRACT NOUNS (Tier 2/3): talent, ability, skill, performance...
- Both teach the SAME THEME (abilities/talents) at different complexity levels
- Advanced pre-teaches concepts that may appear in Easy mode later

---

## ⚠️ VALIDATION UPDATES

### validate_dual_mode.sh

**Now checks:**
1. ✅ Bold word COUNT (10 per mode) - not identity
2. ✅ Vocab word COUNT (10 per mode) - not identity
3. ⚠️ WARNING if vocab words are 100% identical (unusual but not error)
4. ✅ PASS if vocab properly differentiated by tier

### Previous behavior (WRONG):
- ❌ FAIL if bold words differ
- ❌ FAIL if vocab words differ

### New behavior (CORRECT):
- ✅ PASS if 10 words per mode (regardless of identity)
- ⚠️ WARNING if words are suspiciously similar
- ✅ INFO message explaining proper differentiation

---

## 📖 DOCUMENTATION UPDATES

### QUICK_REF.md
Already correct - mentions "Vocabulary levels (Tier 1/2 vs 2/3, Easy vs Advanced)"

### Blueprint
Correctly specifies:
- Easy: Tier 1 & Basic Tier 2
- Advanced: Tier 2 & 3
- Vocabulary Lag rule

### Master Prompt
Need to verify alignment with corrected understanding

---

## 🎯 KEY TAKEAWAYS

1. **DO NOT force vocab words to match** between Easy and Advanced
2. **DO enforce 10 words per mode** (count requirement)
3. **DO check tier appropriateness** (Easy=simple, Advanced=academic)
4. **DO follow Syllabus** for theme/topic alignment
5. **DO Pre-teach** advanced concepts (Vocabulary Lag rule)

6. **Validation should be DESCRIPTIVE not PRESCRIPTIVE** for word choice
7. **Trust the content creator** to choose appropriate tier-level words
8. **Focus on COUNT and LEVEL** not exact word matching

---

## ✅ CURRENT STATUS

- ✅ Advanced vocab.js restored to academic words
- ✅ validate_dual_mode.sh fixed
- ✅ mass_produce_week.py corrected
- ✅ Incorrect commits reverted
- ✅ Documentation created

**Week 12 is now CORRECT:**
- Easy: Tier 1 simple action verbs
- Advanced: Tier 2/3 academic vocabulary
- Both aligned with Blueprint and Syllabus

---

## 🔗 REFERENCES

- Blueprint Section IV: Production Specs - Vocabulary Lag
- Syllabus Week 12: sing, dance, run, jump, climb, ride a bike, draw
- QUICK_REF.md: Vocabulary levels (Tier 1/2 vs 2/3)
- validate_dual_mode.sh: CHECK 1 & CHECK 5
