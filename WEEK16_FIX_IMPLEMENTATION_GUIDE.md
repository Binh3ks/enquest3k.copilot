# 🔧 WEEK 16 - FIX IMPLEMENTATION GUIDE
**Total Time:** ~55 minutes  
**Priority:** CRITICAL (blocks W16+ Golden Standard status)

---

## 🎯 OVERVIEW: 3 FIXES NEEDED

| Fix | Files Affected | Time | Priority |
|-----|----------------|------|----------|
| **1. Add Bold Words** | 8 files (4 Adv + 4 Easy) | 35 mins | 🔴 CRITICAL |
| **2. Add Easy Grammar** | 1 file | 10 mins | 🔴 CRITICAL |
| **3. Delete Backups** | 3 files | 5 mins | 🟡 MEDIUM |

---

## ⚠️ FIX #1: ADD BOLD WORDS (35 minutes)

### Rule: 100% Vocabulary Coverage

**From VOCAB_BOLD_WORD_RULES_W16_PLUS.md:**
> ALL 13 vocab words MUST appear as **bold** (`**word**`) across story files.
> Minimum: 13+ in read files, 10+ in explore files

**13 Vocabulary Words:**
kick, throw, catch, run, jump, score, hit, pass, cheer, goal, energy, motion, team

### Current Status: 0 bold words in ALL 8 files ❌

---

## 📝 FIX #1A: ADVANCED MODE - read_stem.js

**File:** `src/data/weeks/week_16/read_stem.js`  
**Target:** Bold 13-15 words (focus on physics/sports science context)

**Current Text (Sample):**
```javascript
content_en: `
  Look at the soccer field! The players are running very fast.
  When a player is kicking the ball, they are using force.
  The team is passing the ball quickly.
`,
```

**AFTER FIX:**
```javascript
content_en: `
  Look at the soccer field! The players are **running** very fast.
  When a player is **kicking** the **ball**, they are using force.
  The **team** is **passing** the **ball** quickly.
  
  A player can **throw** the **ball** in from the sideline. 
  Another player tries to **catch** it. The goalkeeper is **jumping** up high!
  He is using **energy** from his muscles.
  
  The **ball** moves in a curve. This is called **motion**. 
  The wind can **hit** the **ball** and change its direction.
  
  At the end, everyone is **cheering**! The **team** **scored** a **goal**!
`,
```

**Words bolded: 15/13** ✅ (kick, run, jump, throw, catch, score, pass, hit, cheer, goal, energy, motion, team, ball × multiple times OK)

**Vietnamese translation:** (Thêm bold tương ứng)
```javascript
content_vi: `
  Nhìn sân bóng! Các cầu thủ đang **chạy** rất nhanh.
  Khi một cầu thủ **đá** **bóng**, họ đang dùng lực.
  **Đội** đang **chuyền** **bóng** nhanh.
  
  Một cầu thủ có thể **ném** **bóng** vào từ biên. 
  Cầu thủ khác cố **bắt** nó. Thủ môn đang **nhảy** lên cao!
  Anh ta đang dùng **năng lượng** từ cơ bắp.
  
  **Bóng** di chuyển theo đường cong. Đây gọi là **chuyển động**. 
  Gió có thể **đập** vào **bóng** và thay đổi hướng.
  
  Cuối cùng, mọi người **cổ vũ**! **Đội** đã **ghi** một **bàn thắng**!
`,
```

---

## 📝 FIX #1B: ADVANCED MODE - read_social.js

**File:** `src/data/weeks/week_16/read_social.js`  
**Target:** Bold 13-15 words (focus on Olympics/Sports history)

**Strategy:** Embed vocab words in historical context

**AFTER FIX (Sample):**
```javascript
content_en: `
  Long ago in ancient Greece, people played sports in the Olympics.
  Athletes would **run** races. They would **jump** over obstacles.
  Some would **throw** the discus very far!
  
  The crowd would **cheer** loudly. Everyone wanted their **team** to win.
  Athletes used all their **energy** to compete.
  
  In modern Olympics, athletes **kick** soccer balls, **pass** to teammates,
  and **score** amazing **goals**. They **hit** baseballs, **catch** frisbees,
  and show incredible **motion** skills.
  
  The whole **team** celebrates together!
`,
```

**Words bolded: 15/13** ✅

---

## 📝 FIX #1C: ADVANCED MODE - explore_stem.js

**File:** `src/data/weeks/week_16/explore_stem.js`  
**Target:** Bold 10-12 words (activities/questions)

**AFTER FIX:**
```javascript
content_en: `
  🧪 Experiment: Rolling Ball Energy
  
  1. **Kick** a **ball** gently. How far does it **roll**?
  2. Now **kick** it harder. What happens?
  3. The **ball** has **energy** when it moves. This is called **motion**!
  
  💡 Think: Why do soccer players **run** before they **kick**?
  Answer: They add more **energy** to make the **ball** **go** faster!
  
  🎯 Challenge: Can you **throw** and **catch** the **ball** 10 times?
  Work with your **team**!
`,
```

**Words bolded: 12/10** ✅

---

## 📝 FIX #1D: ADVANCED MODE - explore_social.js

**File:** `src/data/weeks/week_16/explore_social.js`  
**Target:** Bold 10-12 words

**AFTER FIX:**
```javascript
content_en: `
  🏛️ Activity: Make Your Own Olympics
  
  1. Form a **team** with your classmates
  2. Choose 3 sports: **run**, **jump**, or **throw**
  3. Everyone can **cheer** for their favorite **team**!
  
  🤔 Questions:
  - Which sport needs the most **energy**?
  - Can you **score** more **goals** with practice?
  - How do you **pass** the **ball** to help your **team**?
  
  🎖️ At the end, **cheer** for everyone who tried!
`,
```

**Words bolded: 11/10** ✅

---

## 📝 FIX #1E: EASY MODE - 4 Files (Same Process)

**Files:**
1. `src/data/weeks_easy/week_16/read_stem.js` - Bold 13+ words
2. `src/data/weeks_easy/week_16/read_social.js` - Bold 13+ words
3. `src/data/weeks_easy/week_16/explore_stem.js` - Bold 10+ words
4. `src/data/weeks_easy/week_16/explore_social.js` - Bold 10+ words

**Strategy:** Simplify sentences but keep same bold words

**Example (Easy read_stem.js):**
```javascript
content_en: `
  Look! The players **run** fast. They **kick** the **ball**.
  One player **throws** the **ball**. Another player tries to **catch** it.
  
  The **team** is **passing** the **ball**. The **ball** is moving. 
  This is called **motion**.
  
  Players use **energy** to **run** and **jump**. 
  They **hit** the **ball** with their head!
  
  The **team** **scored** a **goal**! Everyone is **cheering**!
`,
```

**Words bolded: 15/13** ✅ (simpler sentences, same vocab coverage)

---

## ⚠️ FIX #2: ADD 7 EASY GRAMMAR EXERCISES (10 minutes)

**File:** `src/data/weeks_easy/week_16/grammar.js`  
**Current:** 13 exercises  
**Target:** 20 exercises

**Add after existing exercise id:13:**

```javascript
  {
    id: 14,
    type: "fill",
    question: "We ___ (jump) in the park.",
    answer: "are jumping",
    hint: "We are + verb-ing"
  },
  {
    id: 15,
    type: "mc",
    question: "My mom ___ dinner now.",
    options: ["cook", "is cooking", "cooks"],
    answer: "is cooking",
    hint: "She is + verb-ing"
  },
  {
    id: 16,
    type: "fill",
    question: "You ___ (throw) the ball.",
    answer: "are throwing",
    hint: "You are + verb-ing"
  },
  {
    id: 17,
    type: "unscramble",
    question: "Put the words in order:",
    words: ["am", "I", "playing", "soccer"],
    answer: "I am playing soccer.",
    hint: "Start with 'I am'"
  },
  {
    id: 18,
    type: "fill",
    question: "The dog ___ (run) fast.",
    answer: "is running",
    hint: "It is + verb-ing"
  },
  {
    id: 19,
    type: "mc",
    question: "They ___ TV now.",
    options: ["watch", "watching", "are watching"],
    answer: "are watching",
    hint: "They are + verb-ing"
  },
  {
    id: 20,
    type: "fill",
    question: "My brother ___ (score) a goal!",
    answer: "is scoring",
    hint: "He is + verb-ing"
  }
```

**Validation:**
- ✅ Uses Week 16 vocab (jump, throw, run, score, play)
- ✅ Focus: Present Continuous (am/is/are + verb-ing)
- ✅ Mix of types: fill (4), mc (2), unscramble (1)
- ✅ Progressive difficulty (maintains Easy mode scaffolding)

---

## ⚠️ FIX #3: DELETE 3 BACKUP FILES (5 minutes)

**Commands:**

```bash
# Backup 1: Advanced mode word_power
rm src/data/weeks/week_16/word_power_BACKUP.js

# Backup 2: Easy mode word_power
rm src/data/weeks_easy/week_16/word_power_BACKUP.js

# Backup 3: Easy mode word_power (fixed version, now obsolete)
rm src/data/weeks_easy/week_16/word_power_FIXED.js
```

**Verification:**
```bash
# Check file count (should be 39 total)
find src/data/weeks/week_16 -name "*.js" | wc -l
# Expected: 19

find src/data/weeks_easy/week_16 -name "*.js" | wc -l
# Expected: 19

find src/data/week_16_real.js | wc -l
# Expected: 1

# Total: 19 + 19 + 1 = 39 ✅
```

---

## ✅ VALIDATION CHECKLIST

After completing all fixes, validate:

### 1. Run Audit Scripts (2 minutes)
```bash
python3 audit_week16_complete.py
python3 audit_week16_deep_content.py
```

**Expected Output:**
```
✅ File count: 39 (19+19+1)
✅ Grammar: Advanced=20, Easy=20
✅ Bold words: read_stem=13+, read_social=13+, explore_stem=10+, explore_social=10+ (all modes)
✅ NO ISSUES FOUND
```

### 2. Manual File Checks (3 minutes)

**Check bold words:**
```bash
# Should return 13+ for read files, 10+ for explore files
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/read_stem.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/read_social.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/explore_stem.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/explore_social.js | wc -l

# Repeat for Easy mode
grep -o '\*\*[^*]*\*\*' src/data/weeks_easy/week_16/read_stem.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks_easy/week_16/read_social.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks_easy/week_16/explore_stem.js | wc -l
grep -o '\*\*[^*]*\*\*' src/data/weeks_easy/week_16/explore_social.js | wc -l
```

**Check Easy grammar count:**
```bash
grep '"id":' src/data/weeks_easy/week_16/grammar.js | wc -l
# Expected: 20
```

**Check no backup files:**
```bash
find src/data -name "*BACKUP*" -o -name "*FIXED*" | grep week_16
# Expected: (empty output)
```

### 3. Browser Test (5 minutes)

```bash
npm run dev
```

**Test URLs:**
1. http://localhost:5173/week/16/ai_tutor
2. http://localhost:5173/week/16/read (check STEM/Social tabs)
3. http://localhost:5173/week/16/explore (check STEM/Social tabs)
4. http://localhost:5173/week/16/grammar?isEasy=true (check 20 exercises)

**Visual Validation:**
- ✅ Read stories show **bold** vocabulary words
- ✅ Explore activities show **bold** vocabulary words
- ✅ Easy grammar has 20 exercises (scroll to id:20)
- ✅ TTS audio plays for bold words on-demand
- ✅ No console errors

---

## 📊 SUCCESS CRITERIA

Week 16 becomes W16+ Golden Standard when ALL pass:

1. ✅ 39 files total (no backups)
2. ✅ Grammar: Advanced=20, Easy=20
3. ✅ Bold words: 100% vocab coverage across all story files
4. ✅ Audit scripts pass with 0 issues
5. ✅ Browser test shows correct content
6. ✅ All 12 Golden Standard criteria met (per comprehensive report)

**Current Status:** 9/12 criteria (75%)  
**After fixes:** 12/12 criteria (100%) ✅

---

## 🕐 IMPLEMENTATION SCHEDULE

| Task | Time | Status |
|------|------|--------|
| Fix #1A: Advanced read_stem | 8 min | ⬜ |
| Fix #1B: Advanced read_social | 8 min | ⬜ |
| Fix #1C: Advanced explore_stem | 5 min | ⬜ |
| Fix #1D: Advanced explore_social | 5 min | ⬜ |
| Fix #1E: Easy mode (4 files) | 15 min | ⬜ |
| Fix #2: Easy grammar (+7 exercises) | 10 min | ⬜ |
| Fix #3: Delete backups | 2 min | ⬜ |
| Validation: Scripts + Browser | 10 min | ⬜ |
| **Total** | **~60 min** | |

**Recommended Order:**
1. Fix #3 (cleanup) - 2 min
2. Fix #2 (grammar) - 10 min
3. Fix #1 (bold words) - 40 min (do all 8 files in batch)
4. Validation - 10 min

---

## 🎯 NEXT STEPS AFTER FIXES

Once Week 16 passes all validation:

1. ✅ Mark Week 16 as **W16+ Golden Standard**
2. 📋 Use Week 16 as template for Weeks 17-156
3. 🔄 Mass production workflow can clone from Week 16 structure
4. 📝 Update `Production_FINAL/GOLDEN_STANDARDS.md`:
   - W1-15: Use Week 6 (Simple structure, 15 files/mode)
   - W16-156: Use Week 16 (STEM structure, 19 files/mode)

**Command to clone Week 16:**
```bash
# Example: Create Week 17 from Week 16
cp -r src/data/weeks/week_16 src/data/weeks/week_17
cp -r src/data/weeks_easy/week_16 src/data/weeks_easy/week_17
# Then customize: weekId=17, new theme, new vocab, etc.
```

---

**Document Created:** March 20, 2026  
**Estimated Completion:** ~1 hour  
**Blocker Status:** CRITICAL - Must fix before mass production W17+
