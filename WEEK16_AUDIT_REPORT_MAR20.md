# 📊 WEEK 16 AUDIT REPORT - March 20, 2026

## 🎯 Mục đích
Rà soát Week 16 để biến thành **golden standard mới** cho W16+ (cấu trúc 19 files với sub-tabs)

---

## ✅ NHỮNG GÌ ĐÃ ĐÚNG

### 1. File Structure (Gần đúng)
- ✅ Advanced: 20 files (dư 1 backup)
- ✅ Easy: 21 files (dư 2 backups)
- ✅ AI Tutor: `week_16_real.js` tồn tại
- ✅ Có đủ 7 sub-tab files: `logic_science.js`, `singapore_math.js`, `social_quiz.js`, `read_stem.js`, `read_social.js`, `explore_stem.js`, `explore_social.js`

### 2. Metadata (Perfect!)
**Advanced Mode:**
- ✅ weekId: 16
- ✅ weekTitle_en: "Sports Commentary"
- ✅ grammar_focus: "Present Continuous (is/are + verb-ing)"
- ✅ isEasy: false

**Easy Mode:**
- ✅ weekId: 16
- ✅ weekTitle_en: "Sports Commentary"
- ✅ grammar_focus: "Present Continuous (am/is/are + verb-ing)"
- ✅ isEasy: true

### 3. Voice Config (Pass với ghi chú)
**Advanced Mode:**
- 7 assignments, 5 unique voices ✅
- Có duplicates nhưng đạt tiêu chí "5 distinct voices"
- Voices: D, F, E, C, G (5 unique)

**Easy Mode:**
- 7 assignments, 5 unique voices ✅
- Có duplicates nhưng đạt tiêu chí "5 distinct voices"
- Voices: F, H, D, C, G (5 unique)

**Ghi chú:** Workflow yêu cầu "5 DISTINCT voices" - hiện tại đạt (5 unique) nhưng có duplicate assignments (questions=narration, mindmap=vocabulary). Điều này không vi phạm strict requirement nhưng nên optimize để mỗi station có voice riêng.

### 4. Grammar Exercises
- ✅ Advanced: **20 exercises** (correct!)
- ❌ Easy: **13 exercises** (need 20)

### 5. Sub-Tabs (Perfect!)
**Advanced:**
- ✅ logic_science: 3 questions
- ✅ singapore_math: 5 questions
- ✅ social_quiz: 7 questions
- ✅ **Total: 15 questions** (3+5+7)

**Easy:**
- ✅ logic_science: 3 questions
- ✅ singapore_math: 5 questions
- ✅ social_quiz: 7 questions
- ✅ **Total: 15 questions** (3+5+7)

### 6. Vocabulary Count
- ✅ Advanced: 13 words (10 sports core + 3+ STEM/Social seeds)
- ✅ Easy: 13 words

**Vocabulary List (Week 16):**
1. kick
2. throw
3. catch
4. run
5. jump
6. score
7. hit
8. pass
9. cheer
10. goal
11. energy
12. motion
13. team

---

## ❌ CÁC VẤN ĐỀ CẦN SỬA (4 issues)

### 🔴 ISSUE #1: BACKUP FILES DƯ THỪA (File Count Mismatch)
**Severity:** LOW (không ảnh hưởng runtime, chỉ làm rối file structure)

**Advanced Mode:**
- `word_power_BACKUP.js` (1 file dư)

**Easy Mode:**
- `word_power_BACKUP.js`
- `word_power_FIXED.js`
- (tổng 2 files dư)

**Fix:**
```bash
# Xóa backup files
rm src/data/weeks/week_16/word_power_BACKUP.js
rm src/data/weeks_easy/week_16/word_power_BACKUP.js
rm src/data/weeks_easy/week_16/word_power_FIXED.js

# Verify file count
ls -1 src/data/weeks/week_16/*.js | wc -l       # Should be 19
ls -1 src/data/weeks_easy/week_16/*.js | wc -l  # Should be 19
```

**Expected After Fix:**
- Advanced: 19 files ✅
- Easy: 19 files ✅

---

### 🔴 ISSUE #2: EASY MODE GRAMMAR THIẾU 7 EXERCISES
**Severity:** HIGH (vi phạm quy tắc "EXACTLY 20 exercises")

**Current State:**
- Easy grammar.js: 13 exercises (exercises id 1-13)
- Expected: 20 exercises

**Root Cause:**
File bị thiếu 7 exercises (id 14-20)

**Fix Strategy:**
Thêm 7 exercises vào cuối exercises array trong `src/data/weeks_easy/week_16/grammar.js`

**Sample Exercises to Add** (Present Continuous, Easy level):
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
  question: "My mom ___ dinner.",
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
  question: "Order:",
  words: ["am", "I", "playing", "soccer"],
  answer: "I am playing soccer.",
  hint: "I am"
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

**Validation After Fix:**
```bash
python3 -c "
import re
with open('src/data/weeks_easy/week_16/grammar.js') as f:
    content = f.read()
    count = len(re.findall(r'\bid:\s*\d+', content))
    print(f'Easy grammar: {count} exercises')
    if count == 20:
        print('✅ PASS')
    else:
        print(f'❌ FAIL: Need {20-count} more exercises')
"
```

---

### 🔴 ISSUE #3: BOLD WORDS = 0 (CRITICAL!) - Advanced Mode
**Severity:** CRITICAL (vi phạm quy tắc "100% vocab coverage")

**Affected Files (Advanced):**
1. `src/data/weeks/week_16/read_stem.js` - 0 bold words ❌
2. `src/data/weeks/week_16/read_social.js` - 0 bold words ❌
3. `src/data/weeks/week_16/explore_stem.js` - 0 bold words ❌
4. `src/data/weeks/week_16/explore_social.js` - 0 bold words ❌

**Requirement:**
- Each file MUST have **>= 13 bold words** (100% vocab coverage)
- Format: `**word**` in story text
- All 13 vocab words must appear as bold across all 4 files

**Current Content Sample (read_stem.js):**
```
The players are running very fast.  ← "running" cần bold
When a player is kicking the ball...  ← "kicking" cần bold
The team is passing the ball quickly.  ← "passing" và "team" cần bold
```

**Fix Strategy:**
Bold tất cả 13 vocab words trong stories:
- kick, throw, catch, run, jump, score, hit, pass, cheer, goal, energy, motion, team

**Example After Fix:**
```javascript
content_en: `
  Look at the soccer field! The players are **running** very fast. But why can they **run** so fast? It's because of physics!

  When a player is **kicking** the ball, they are using force. Force is a push or a pull. The stronger the **kick**, the farther the ball goes. That's Newton's law of **motion**!

  The ball is flying through the air. But air is slowing it down. This is called air resistance. That's why players **kick** the ball hard - to fight against the air.

  Now the goalkeeper is **jumping** up. He is using **energy** from his muscles. His muscles are pushing his body up against gravity.

  The **team** is **passing** the ball quickly. Each **pass** is using force and motion. 

  At the end, everyone is **cheering**! The team scored a **goal**! They won because they understood physics.
`,
```

**Bold Word Distribution Strategy:**
- read_stem.js: Bold 10-13 words (STEM-focused: run, kick, jump, motion, energy, team, pass)
- read_social.js: Bold 10-13 words (Social-focused: team, goal, cheer, throw, catch)
- explore_stem.js: Bold 8-10 words (overlap OK)
- explore_social.js: Bold 8-10 words (overlap OK)
- **Total unique bolded**: All 13 words across 4 files

**Validation After Fix:**
```bash
# Check each file
for file in read_stem.js read_social.js explore_stem.js explore_social.js; do
  count=$(grep -o '\*\*[^*]*\*\*' src/data/weeks/week_16/$file | wc -l)
  echo "$file: $count bold words"
done

# Must see:
# read_stem.js: 10-15 bold words ✅
# read_social.js: 10-15 bold words ✅
# explore_stem.js: 8-12 bold words ✅
# explore_social.js: 8-12 bold words ✅
```

---

### 🔴 ISSUE #4: BOLD WORDS = 0 (CRITICAL!) - Easy Mode
**Severity:** CRITICAL (vi phạm quy tắc "100% vocab coverage")

**Affected Files (Easy):**
1. `src/data/weeks_easy/week_16/read_stem.js` - 0 bold words ❌
2. `src/data/weeks_easy/week_16/read_social.js` - 0 bold words ❌
3. `src/data/weeks_easy/week_16/explore_stem.js` - 0 bold words ❌
4. `src/data/weeks_easy/week_16/explore_social.js` - 0 bold words ❌

**Same requirement as Advanced:** >= 13 bold words per file

**Fix Strategy:** Same as Issue #3 (bold all 13 vocab words)

**Important:** Easy mode stories have DIFFERENT content from Advanced (personal context vs. school context), so bold words must be added independently.

---

## 📋 PRIORITIZED FIX CHECKLIST

### Priority 1: CRITICAL FIXES (Must fix for golden standard)
- [ ] **1.1** Add 7 exercises to Easy grammar.js (reach 20 total)
- [ ] **1.2** Add bold words to Advanced read_stem.js (need >= 13)
- [ ] **1.3** Add bold words to Advanced read_social.js (need >= 13)
- [ ] **1.4** Add bold words to Advanced explore_stem.js (need >= 10)
- [ ] **1.5** Add bold words to Advanced explore_social.js (need >= 10)
- [ ] **1.6** Add bold words to Easy read_stem.js (need >= 13)
- [ ] **1.7** Add bold words to Easy read_social.js (need >= 13)
- [ ] **1.8** Add bold words to Easy explore_stem.js (need >= 10)
- [ ] **1.9** Add bold words to Easy explore_social.js (need >= 10)

**Total files to edit:** 9 files (1 grammar + 8 story files)

### Priority 2: CLEANUP (Nice to have)
- [ ] **2.1** Delete `word_power_BACKUP.js` in Advanced
- [ ] **2.2** Delete `word_power_BACKUP.js` in Easy
- [ ] **2.3** Delete `word_power_FIXED.js` in Easy

**Total files to delete:** 3 files

### Priority 3: OPTIMIZATION (Optional)
- [ ] **3.1** Optimize voiceConfig to avoid duplicates (questions, mindmap có thể dùng voices khác)

---

## 🧪 VALIDATION COMMANDS

**After fixes, run these to verify:**

```bash
# 1. File count
echo "=== FILE COUNT ==="
echo "Advanced: $(ls -1 src/data/weeks/week_16/*.js | wc -l) (expect 19)"
echo "Easy: $(ls -1 src/data/weeks_easy/week_16/*.js | wc -l) (expect 19)"

# 2. Grammar count
echo ""
echo "=== GRAMMAR COUNT ==="
python3 << 'EOF'
import re
for mode, path in [('Advanced', 'src/data/weeks/week_16/grammar.js'), 
                   ('Easy', 'src/data/weeks_easy/week_16/grammar.js')]:
    with open(path) as f:
        count = len(re.findall(r'\bid:\s*\d+', f.read()))
        status = "✅" if count == 20 else "❌"
        print(f"{mode}: {count} exercises {status}")
EOF

# 3. Bold words
echo ""
echo "=== BOLD WORDS (must be >= 13 for read files) ==="
for mode in "week_16" "week_16_easy"; do
    echo "$mode:"
    for file in read_stem.js read_social.js; do
        count=$(grep -o '\*\*[^*]*\*\*' src/data/weeks/$mode/$file 2>/dev/null | wc -l)
        status=""
        [ $count -ge 13 ] && status="✅" || status="❌"
        echo "  $file: $count $status"
    done
done

# 4. Run full audit script
echo ""
echo "=== FULL AUDIT ==="
python3 audit_week16_complete.py
```

**Expected output after all fixes:**
```
=== FILE COUNT ===
Advanced: 19 (expect 19)
Easy: 19 (expect 19)

=== GRAMMAR COUNT ===
Advanced: 20 exercises ✅
Easy: 20 exercises ✅

=== BOLD WORDS (must be >= 13 for read files) ===
week_16:
  read_stem.js: 13+ ✅
  read_social.js: 13+ ✅
week_16_easy:
  read_stem.js: 13+ ✅
  read_social.js: 13+ ✅

=== FULL AUDIT ===
📊 SUMMARY - ISSUES TO FIX
✅ NO ISSUES FOUND - Week 16 is ready to be golden standard!
```

---

## 📝 WORKFLOW COMPLIANCE CHECK

### Week 16 vs. Mass Production Workflow

| Requirement | Status | Notes |
|-------------|--------|-------|
| **File Structure** | ⚠️ | 20+21 files (dư 3 backups) → Need cleanup |
| **W16+ Sub-Tabs** | ✅ | 7 files: logic_science, singapore_math, social_quiz, read_stem, read_social, explore_stem, explore_social |
| **Metadata** | ✅ | weekId=16, title correct, grammar correct |
| **Voice Config** | ✅ | 5 distinct voices (có duplicates nhưng pass) |
| **Grammar Count** | ⚠️ | Advanced=20✅, Easy=13❌ |
| **Sub-Tabs Count** | ✅ | 3+5+7=15 (both modes) |
| **Vocab Count** | ✅ | 13 words (10 core + 3 STEM/Social seeds) |
| **Bold Words** | ❌ | 0 in all story files → CRITICAL FIX |
| **AI Tutor** | ✅ | week_16_real.js exists |
| **Index.js** | ✅ | Exports all sub-tabs correctly |

**Overall Grade:** 7/10 (Ready with fixes)

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Critical Fixes (30-45 minutes)
1. **Add 7 exercises to Easy grammar.js** (10 mins)
   - Copy structure from Advanced grammar exercises 14-20
   - Simplify language for Easy level
   - Validate: `grep -c 'id:' grammar.js` = 20

2. **Add bold words to all 8 story files** (30 mins)
   - Advanced: 4 files (read_stem, read_social, explore_stem, explore_social)
   - Easy: 4 files (same names)
   - Bold all 13 vocab words across stories
   - Validate: `grep -o '\*\*[^*]*\*\*' file.js | wc -l` >= 13

### Phase 2: Cleanup (5 minutes)
3. **Delete 3 backup files**
   ```bash
   rm src/data/weeks/week_16/word_power_BACKUP.js
   rm src/data/weeks_easy/week_16/word_power_BACKUP.js
   rm src/data/weeks_easy/week_16/word_power_FIXED.js
   ```

### Phase 3: Validation (5 minutes)
4. **Run full audit**
   ```bash
   python3 audit_week16_complete.py
   ```
5. **Verify in browser**
   ```bash
   npm run dev
   # Test: http://localhost:5173/week/16/ai_tutor
   # Check: vocab words are bold in stories
   ```

### Total Estimated Time: 45-60 minutes

---

## ✅ GOLDEN STANDARD CRITERIA (After Fixes)

Week 16 will be golden standard when:
- ✅ 19 files per mode (no backups)
- ✅ Metadata correct (weekId=16, titles match theme)
- ✅ 5 distinct voices in voiceConfig
- ✅ Grammar = 20 exercises (both modes)
- ✅ Sub-tabs = 3+5+7=15 questions (both modes)
- ✅ Vocab = 13 words (W16+ structure)
- ✅ **Bold words >= 13 in all story files** ← Currently failing
- ✅ All syntax validated
- ✅ Browser test passes

**Current Status:** 🟡 7/8 criteria met (87.5%)  
**After Fixes:** 🟢 8/8 criteria met (100%) → Ready for golden standard!

---

## 📚 References
- Workflow: `Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/AGENT_SELF_CHECK_WORKFLOW.md`
- Onboarding: `Production_FINAL/1. FINAL MASS PRODUCTION/1_CORE_WORKFLOW/0. NEW_AGENT_ONBOARDING_PROMPT.md`
- Blueprint: `Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`

---

**Report Generated:** March 20, 2026  
**Audit Script:** `audit_week16_complete.py`  
**Next Steps:** Execute Phase 1-3 Action Plan above
