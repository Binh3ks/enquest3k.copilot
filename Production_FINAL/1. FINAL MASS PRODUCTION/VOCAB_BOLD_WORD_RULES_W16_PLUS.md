# 📚 VOCABULARY & BOLD WORD RULES - W16+ STEM/SOCIAL SEEDING

**Created:** March 17, 2026  
**Status:** MANDATORY for W16+ mass production  
**Purpose:** CLIL preparation through vocabulary seeding

---

## 🎯 RULE CHANGES: W1-15 vs W16+

| Element | W1-15 (Standard) | W16+ (STEM/Social Seeding) | Reason |
|---------|------------------|---------------------------|---------|
| **vocab.js count** | 10 words | 13+ words | Add 3+ STEM/Social seeds for CLIL prep |
| **read.js bold** | 10+ words | 13+ words | MUST match vocab.js count (100% coverage) |
| **explore.js bold** | 10+ words | 13+ words | MUST match vocab.js count (100% coverage) |
| **word_power.js** | 3 collocations (Phase 1) | 3 collocations (unchanged) | Still collocation-focused |

---

## 📊 ACTUAL DATA FROM WEEKS 6-15

```bash
=== Week 06 ===
vocab.js words: 10
read.js bold: 12
explore.js bold: 10

=== Week 07 ===
vocab.js words: 10
read.js bold: 10
explore.js bold: 7

=== Week 12 ===
vocab.js words: 10
read.js bold: 10
explore.js bold: 10

=== Week 15 ===
vocab.js words: 10
read.js bold: 12
explore.js bold: 0 (ERROR!)
```

**Issues Found:**
- ❌ Week 7: explore.js only 7 bold (missing 3)
- ❌ Week 15: explore.js has 0 bold words (CRITICAL BUG)
- ⚠️ Inconsistent: Some weeks 10, some 12 bold words

**Correct Rule (Clarified March 17):**
- ✅ **MUST bold 100% of vocab.js words in BOTH read.js AND explore.js**
- ✅ Week 6 with 12 bold words is CORRECT (includes extra context words)
- ✅ Week 15 explore.js = NEEDS FIX (must add bold words)

---

## 🔥 W16+ VOCABULARY STRUCTURE

### vocab.js Schema (13+ words)

```javascript
export default {
  vocab: [
    // 10 CORE WORDS (from Syllabus)
    { id: 1, word: "kick", ... },
    { id: 2, word: "throw", ... },
    { id: 3, word: "catch", ... },
    { id: 4, word: "run", ... },
    { id: 5, word: "jump", ... },
    { id: 6, word: "score", ... },
    { id: 7, word: "hit", ... },
    { id: 8, word: "pass", ... },
    { id: 9, word: "cheer", ... },
    { id: 10, word: "goal", ... },
    
    // 3+ STEM/SOCIAL SEED WORDS (W16+ only)
    { id: 11, word: "energy", ...},      // Science seed
    { id: 12, word: "motion", ... },     // Science seed
    { id: 13, word: "team", ... }        // Social Studies seed
  ]
};
```

**Why 3+ seeds?**
- ✅ Prepares for W36 CLIL (Content and Language Integrated Learning)
- ✅ Students gradually build STEM/Social vocabulary before intensive use
- ✅ Prevents "vocabulary shock" at W36 transition

---

## ✅ BOLD WORD COVERAGE RULE

### **100% Coverage Principle:**

**read.js MUST bold:**
- ALL 13+ words from vocab.js
- Can add 1-2 extra context words (total 13-15 bold)
- Primary focus: vocab.js words

**explore.js MUST bold:**
- ALL 13+ words from vocab.js
- Can add 1-2 extra context words (total 13-15 bold)
- Primary focus: vocab.js words

**Example Week 16 (Sports Commentary):**

**vocab.js (13 words):**
kick, throw, catch, run, jump, score, hit, pass, cheer, goal, energy, motion, team

**read.js (Advanced - 15 bold words):**
> "The Big Game is starting! Players **run** onto the field. They have **energy** and are ready to play. Look! Number 7 **kicks** the **ball**. It flies through the air with fast **motion**. Number 9 **catches** the **pass**. He **jumps** high! The goalkeeper tries to stop it, but... **GOAL!** The fans **cheer** loudly. Their **team** wins! What an exciting **game**!"

Bold count: 15 (13 from vocab.js + "ball" + "game" as context)

**explore.js (Advanced - 14 bold words):**
> "Sports around the world use similar actions. Athletes **run**, **jump**, and **throw**. In soccer, players **kick** and **pass** the **ball**. In basketball, they **catch** and **score** with **motion** and **energy**. Fans **cheer** for their **team**. Every sport needs **teamwork** to win. Which sport do you like?"

Bold count: 14 (13 from vocab.js + "ball" as context)

---

## 🚨 VALIDATION COMMANDS

**Add to BƯỚC 0.5 verification:**

```bash
# Step 1: Count vocab words
VOCAB_COUNT=$(grep -c "id:" src/data/weeks/week_N/vocab.js)
echo "✅ vocab.js: $VOCAB_COUNT words"

# Step 2: Count bold words in read.js
READ_BOLD=$(grep -o '\*\*[^*]*\*\*' src/data/weeks/week_N/read.js | wc -l)
echo "📖 read.js bold: $READ_BOLD"

# Step 3: Count bold words in explore.js
EXPLORE_BOLD=$(grep -o '\*\*[^*]*\*\*' src/data/weeks/week_N/explore.js | wc -l)
echo "🔍 explore.js bold: $EXPLORE_BOLD"

# Step 4: Validate coverage
if [ $READ_BOLD -ge $VOCAB_COUNT ] && [ $EXPLORE_BOLD -ge $VOCAB_COUNT ]; then
  echo "✅ PASS: Bold word coverage correct"
else
  echo "❌ FAIL: Bold words insufficient!"
  echo "   Required: >= $VOCAB_COUNT bold words in BOTH files"
  echo "   Actual: read=$READ_BOLD, explore=$EXPLORE_BOLD"
  exit 1
fi
```

**Expected Output for Week 16:**
```
✅ vocab.js: 13 words
📖 read.js bold: 14
🔍 explore.js bold: 13
✅ PASS: Bold word coverage correct
```

---

## 📋 WORKFLOW INTEGRATION

### BƯỚC 3: Create Advanced Stations

**Step 3.2: Replace Semantic Content**

**For vocab.js:**
```bash
# Create 13 words (10 core + 3 STEM/Social seeds)
# Week 16 example:
# Core (10): kick, throw, catch, run, jump, score, hit, pass, cheer, goal
# Seeds (3): energy (science), motion (science), team (social)
```

**For read.js:**
```bash
# CRITICAL: MUST bold ALL 13 words from vocab.js
# Count check after creation:
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/read.js | wc -l
# Expected: 13+ (must be >= vocab.js count)
```

**For explore.js:**
```bash
# CRITICAL: MUST bold ALL 13 words from vocab.js
# Count check after creation:
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/explore.js | wc -l
# Expected: 13+ (must be >= vocab.js count)
```

### BƯỚC 4: Create Easy Stations

**Same rules apply:**
- Easy vocab.js: 13 words (10 Tier 1 core + 3 basic STEM/Social)
- Easy read.js: 13+ bold words (100% coverage)
- Easy explore.js: 13+ bold words (100% coverage)

---

## 🎯 STEM/SOCIAL SEED CATEGORIES

### Science Seeds (for STEM preparation):
- **Physics:** energy, motion, force, gravity, friction, speed, mass
- **Biology:** habitat, species, ecosystem, adaptation, survive, growth
- **Chemistry:** matter, solid, liquid, gas, change, mixture
- **Earth Science:** weather, climate, temperature, season, environment

### Social Studies Seeds (for Geography/History preparation):
- **Geography:** location, map, direction, region, continent, country, city
- **History:** past, present, future, ancient, modern, event, timeline
- **Culture:** tradition, community, family, language, celebration
- **Economics:** trade, market, buy, sell, goods, services

### Week 16 Example (Sports + Science):
- Core (10): kick, throw, catch, run, jump, score, hit, pass, cheer, goal
- Science (2): energy, motion
- Social (1): team

---

## 🔍 COMMON MISTAKES TO AVOID

### ❌ Mistake 1: Not bolding STEM/Social seeds
```javascript
// WRONG (read.js):
"Players run with energy and motion." // energy, motion not bold

// CORRECT:
"Players run with **energy** and **motion**."
```

### ❌ Mistake 2: Bolding in read.js but NOT explore.js
```javascript
// WRONG:
// read.js: 13 bold words ✅
// explore.js: 10 bold words ❌ (missing 3 seeds)

// CORRECT:
// read.js: 13 bold words ✅
// explore.js: 13 bold words ✅
```

### ❌ Mistake 3: Forgetting to update Easy mode vocab
```javascript
// WRONG (Easy mode):
vocab.js: 10 words (missing seeds)

// CORRECT (Easy mode):
vocab.js: 13 words (10 Tier 1 + 3 basic STEM/Social)
```

---

## ✅ CHECKLIST: Before Production Week N (N >= 16)

- [ ] vocab.js created with 13+ words (10 core + 3+ seeds)
- [ ] STEM/Social seeds appropriate for week theme
- [ ] read.js bolds ALL vocab.js words (13+ bold count)
- [ ] explore.js bolds ALL vocab.js words (13+ bold count)
- [ ] Easy mode vocab.js has 13+ words (Tier 1 versions)
- [ ] Easy mode read.js/explore.js bold ALL vocab words
- [ ] Validation commands run successfully (BƯỚC 0.5)
- [ ] Word continuity check: vocab → read → explore flow verified

---

**Status:** ✅ RULE UPDATED for W16+ production  
**Effective Date:** March 17, 2026  
**Applies To:** All weeks 16-156 (CLIL preparation phase)
