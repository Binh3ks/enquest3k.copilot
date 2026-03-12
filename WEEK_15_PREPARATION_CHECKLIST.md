# ✅ WEEK 15 PREPARATION CHECKLIST

**Date:** March 12, 2026  
**Status:** Ready to generate Week 15  
**Master Prompt:** V26-WEEK15-READY.txt ✅

---

## 📋 PRE-GENERATION CHECKLIST

### 1. Verify Week Type
```javascript
// Week 15 is NOT a Review Week (only 14, 28, 42, 54)
isReviewWeek(15) → false ✅

// Week 15 has its own grammar from syllabus
// NOT aggregating from previous weeks
```

### 2. Read Syllabus for Week 15
- [ ] Identify theme (e.g., "My Daily Routine")
- [ ] Identify grammar focus (e.g., "Present Simple - Daily Activities")
- [ ] List target vocabulary (10 words)
- [ ] Note any special requirements

### 3. Prepare Video Queries
- [ ] Search for 1-2 **English Singsing** videos (grammar)
- [ ] Search for 1 **Little Fox** or **Vooks** video (story)
- [ ] Prepare 3-5 total videos under 10 minutes

---

## 🔥 CRITICAL REMINDERS (From Week 14 Bugs)

### ❌ Common Mistakes to AVOID:

#### 1. Field Name Mismatches
```javascript
// ❌ WRONG:
export const week15GamesAdvanced = {
  sentence_expander: { ... }  // Component won't find this!
}

// ✅ CORRECT:
export const week15GamesAdvanced = {
  make_sentence: { ... }  // Matches MakeSentenceGame.jsx
}
```

**Validation:**
```bash
grep "make_sentence:" src/data/weeks/week_15/games.js  # ✅ Should exist
```

#### 2. Shadowing Field Names
```javascript
// ❌ WRONG:
export default {
  sentences: [...],   // Component doesn't use this
  meaning: "..."      // Component doesn't use this
}

// ✅ CORRECT:
export default {
  script: [...],      // ShadowingStation.jsx expects this
  vi: "..."           // Component uses 'vi' field
}
```

**Validation:**
```bash
grep "script:" src/data/weeks/week_15/shadowing.js  # ✅ Should exist
grep "vi:" src/data/weeks/week_15/shadowing.js      # ✅ Should exist
```

#### 3. Easy Mode Validation
```bash
# MUST create ALL 15 Easy files:
ls src/data/weeks_easy/week_15/*.js | wc -l
# Should output: 15 ✅

# Content MUST differ from Advanced:
grep "My name is" src/data/weeks/week_15/read.js
grep "My name is" src/data/weeks_easy/week_15/read.js
# Should show DIFFERENT names ✅
```

#### 4. AI Tutor Conversation Cards
```bash
# MUST have 3 conversation cards at END of file:
grep -c "card_id:" src/data/weeks/week_15_real.js
# Should output: 3 ✅

# Cards MUST match Week 15 theme (NOT Week 14):
grep "title:" src/data/weeks/week_15_real.js | tail -3
# Should show Week 15 themes ✅
```

---

## 🚀 GENERATION WORKFLOW

### Step 1: Generate Advanced Mode (14 files)
- [ ] read.js
- [ ] vocab.js (10 words)
- [ ] grammar.js
- [ ] ask_ai.js (5 prompts, A0 questions only)
- [ ] logic.js (5 problems)
- [ ] dictation.js (extract from read.js)
- [ ] shadowing.js (use `script` and `vi` fields!)
- [ ] writing.js
- [ ] explore.js
- [ ] word_power.js
- [ ] daily_watch.js (manual curation required)
- [ ] word_match.js
- [ ] mindmap.js
- [ ] games.js (use `make_sentence` field!)
- [ ] index.js (aggregate all + voiceConfig)

### Step 2: Generate Easy Mode (15 files)
- [ ] All 15 files in `weeks_easy/week_15/`
- [ ] Different story character from Advanced
- [ ] Simpler vocab (A0 only)
- [ ] Shorter sentences (5-8 words)
- [ ] index.js with `isEasy: true`

### Step 3: Generate AI Tutor File
- [ ] week_15_real.js at `/src/data/weeks/` (parent level)
- [ ] 3 story missions
- [ ] Target vocab (7 words from syllabus)
- [ ] **3 conversation cards at END OF FILE** (lines 252-365)
- [ ] Verify cards match Week 15 theme

### Step 4: Validate Everything
```bash
# Run all validation commands from CRITICAL REMINDERS above
# Fix any mismatches before deployment
```

---

## 🎯 DEPLOYMENT WORKFLOW (Updated)

### What Changed from Week 14:

#### ❌ NO LONGER NEEDED:
```bash
# DON'T DO THIS:
python3 tools/generate_audio_deepgram.py 15 --mode all --force
./tools/upload_all_audio_r2.sh 15
```

#### ✅ NEW WORKFLOW:
```bash
# 1. Update database
node tools/update_db_smart.js

# 2. Generate images ONLY (audio is on-demand!)
node tools/generate_images_nano_banana.js 15 advanced
node tools/generate_images_nano_banana.js 15 easy

# 3. Manual: Curate YouTube videos
# - Find videos from English Singsing, Little Fox, Vooks
# - Add to daily_watch.js

# 4. Deploy
git add src/data/weeks/week_15*
git add src/data/weeks_easy/week_15*
git commit -m "feat: Add Week 15 content with on-demand TTS"
git push

# Audio will auto-generate when students click play! ✅
```

**Time Saved:** 45-60 minutes per week (no audio generation!) 🎉

---

## 📚 REFERENCE DOCUMENTS

### Must Read:
- **Master Prompt V26:** `ENGQUEST MASTER PROMPT V26-WEEK15-READY.txt`
- **Week 14 Bugs:** `WEEK_14_LESSON_LEARNED_BUGFIXES.md`
- **TTS System:** `LESSON_LEARNED_WEEK14_ON_DEMAND_TTS.md`

### Validation Commands:
```bash
# Field name validation:
grep "make_sentence:" src/data/weeks/week_15/games.js
grep "script:" src/data/weeks/week_15/shadowing.js
grep "vi:" src/data/weeks/week_15/shadowing.js

# Easy mode validation:
ls src/data/weeks_easy/week_15/*.js | wc -l  # Should be 15

# AI Tutor validation:
grep -c "card_id:" src/data/weeks/week_15_real.js  # Should be 3

# Character difference:
diff <(grep "My name" src/data/weeks/week_15/read.js) \
     <(grep "My name" src/data/weeks_easy/week_15/read.js)
```

---

## ✅ FINAL CHECKLIST BEFORE GENERATION

- [ ] Read Master Prompt V26 completely
- [ ] Understand Review Week logic (Week 15 is NOT review)
- [ ] Know correct field names (make_sentence, script, vi)
- [ ] Plan Easy mode content (different from Advanced)
- [ ] Prepare video queries (English Singsing + Little Fox)
- [ ] Understand on-demand TTS (no audio generation needed)
- [ ] Ready to validate all files after generation

---

## 🎉 READY FOR WEEK 15!

**With Master Prompt V26:**
- ✅ All Week 14 bugs prevented
- ✅ Clear validation checklist
- ✅ On-demand TTS saves 45-60 min
- ✅ Review week logic documented
- ✅ Field name validation added
- ✅ Easy mode validation added

**Let's generate Week 15 content!** 🚀
