# 📋 EngQuest3K Production Checklist — Week N (W33-W156)

> Master checklist for mass production of weeks 33-156.  
> Based on 34+ known bugs from W12-W34 and ECC best practices.  
> **Run EVERY step before committing to production.**

---

## 🚀 PHASE 0: Pre-Production Setup

### [ ] 0.1 System Health Check
```bash
# Run pre-flight check
bash tools/preflight_check.sh
```

**Checks:**
- [ ] Deepgram API authentication (model: `aura-orion-en`)
- [ ] R2 upload permission
- [ ] Node.js ≥ 18
- [ ] Golden standards exist (Week 16)
- [ ] Git status clean

### [ ] 0.2 Environment Variables
```bash
# Verify .env has all required keys
cat .env | grep -E "DEEPGRAM|R2|AI_PROVIDER"
```

**Required:**
- [ ] `DEEPGRAM_API_KEY`
- [ ] `R2_ACCOUNT_ID` (if using wrangler)
- [ ] AI Provider keys (Cerebras, Gemini, Groq, Together)

### [ ] 0.3 Documentation Review
- [ ] Read target week section in `ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`
- [ ] Read `CONTENT_RULES_READ_EXPLORE.md` (if updating read/explore)
- [ ] Review `AGENT_SELF_CHECK_WORKFLOW.md` for target week type

---

## 📦 PHASE 1: Content Creation

### [ ] 1.1 Clone Golden Standards

**For W33-W156 (16 files + index):**
```bash
WEEK=33
WEEK_PAD=$(printf "%02d" $WEEK)

mkdir -p src/data/weeks/week_$WEEK_PAD
mkdir -p src/data/weeks_easy/week_$WEEK_PAD

# Clone from Week 16 (golden standard)
for file in ask_ai daily_watch dictation explore games grammar logic_science mindmap read shadowing singapore_math vocab word_match word_power writing; do
  cp src/data/weeks/week_16/$file.js src/data/weeks/week_$WEEK_PAD/$file.js
done
cp src/data/weeks/week_16/index.js src/data/weeks/week_$WEEK_PAD/index.js

# Clone Easy mode
for file in ask_ai daily_watch dictation explore games grammar logic_science mindmap read shadowing singapore_math vocab word_match word_power writing; do
  cp src/data/weeks_easy/week_16/$file.js src/data/weeks_easy/week_$WEEK_PAD/$file.js
done
cp src/data/weeks_easy/week_16/index.js src/data/weeks_easy/week_$WEEK_PAD/index.js

echo "✅ Cloned Week $WEEK_PAD from Week 16"
```

### [ ] 1.2 Update Metadata
```bash
# Update metadata.js
node -e "
const fs = require('fs');
const metadata = JSON.parse(fs.readFileSync('src/data/weeks/metadata.json', 'utf8'));
const WEEK_PAD = '33';
metadata[WEEK_PAD] = {
  week_id: parseInt(WEEK_PAD),
  title: 'Week Title Here',
  unit_theme: 'Theme',
  // ... other fields
};
fs.writeFileSync('src/data/weeks/metadata.json', JSON.stringify(metadata, null, 2));
"
```

### [ ] 1.3 Create Week Folders
```bash
mkdir -p public/images/week33
mkdir -p public/audio/week33
echo "✅ Week 33 folders created"
```

---

## ✅ PHASE 2: Per-Station Content (16 files + 16 Easy)

### [ ] 2.1 vocab.js (BOTH Advanced AND Easy)
- [ ] **13 words** for W16+ (10 core + 3 STEM/Social seeds)
- [ ] All image_url paths use `/images/week33/`
- [ ] All audio paths use `/audio/week33/`
- [ ] Syntax validated: `node --input-type=module < vocab.js && echo OK`
- [ ] **EASY MODE: Different vocabulary from Advanced mode**

### [ ] 2.2 read.js (BOTH Advanced AND Easy)
- [ ] Story about Week 33 theme
- [ ] **≥ 13 bold vocabulary words** (`**word**` format)
- [ ] `comprehension_questions` field (NOT `check_questions`)
- [ ] Vietnamese content in `content_vi` only
- [ ] Word count within range (see `content_lint.mjs`)
- [ ] **EASY MODE: Simpler vocabulary, Grade 2-3 level**

### [ ] 2.3 explore.js (BOTH Advanced AND Easy)
- [ ] CLIL non-fiction article (≥13 `**bold**` markers, ≥100 words)
- [ ] **NOT a grammar exercise** (BUG-23 prevention)
- [ ] `check_questions` array (NOT `comprehension_questions`)
- [ ] Each question uses `question_en:` field (NOT `question:`)

### [ ] 2.4 grammar.js (BOTH Advanced AND Easy)
- [ ] Exactly **20 exercises** per mode
- [ ] Use `answer:` NOT `correct:` field
- [ ] No empty answers: `answer: ""`
- [ ] Unscramble exercises have `words: ["word1", ...]` array
- [ ] No curly quotes (`'` `'` `""`)

### [ ] 2.5 ask_ai.js (BOTH Advanced AND Easy)
- [ ] Schema format correct (W1-14 / W15-28 / W29-42)
- [ ] NO `prompt_en`, `prompt_vi`, `hint_en` fields
- [ ] NO `topic_talk_prompt` (Topic Talk removed)
- [ ] `nova_says` = single simple sentence (≤100 chars)

### [ ] 2.6 mindmap.js (BOTH Advanced AND Easy)
- [ ] `hash(fullSentence)` NOT `hash(branchText)` — UNIQUE per branch
- [ ] ≥3 stems starting with `"I ___"` or `"My ___"` (personal stems)
- [ ] ≥36 audio entries (6 stems × 6 branches)
- [ ] Schema validated

### [ ] 2.7 dictation.js (BOTH Advanced AND Easy)
- [ ] **NO `**` markers** — strip all bold from copied text
- [ ] ≥5 sentence entries
- [ ] Audio URLs match `fullSentence` hash

### [ ] 2.8 shadowing.js (BOTH Advanced AND Easy)
- [ ] **NO `**` markers**
- [ ] Content matches current `read.js` narrative
- [ ] Grammar focus aligned with read.js

### [ ] 2.9 singapore_math.js (BOTH Advanced AND Easy)
- [ ] Valid type names: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after`
- [ ] **NO**: `addition`, `subtraction`, `multiplication`, `division`
- [ ] ≥3 problems per mode

### [ ] 2.10 writing.js (W31+)
- [ ] `model_sentence` line ≥ 200 chars
- [ ] `sentence_frames` array present
- [ ] Cambridge Format seed (W28+) applied

### [ ] 2.11 daily_watch.js
- [ ] Unique video IDs (no generic fallback)
- [ ] Video IDs validated: 11-char YouTube format

### [ ] 2.12 games.js
- [ ] `show_tell`, `make_sentence`, `ask_me` present
- [ ] ≥10 answer entries

### [ ] 2.13 word_match.js
- [ ] `pairs` objects (NOT bare numbers)
- [ ] Pairs reference current week vocabulary

### [ ] 2.14 word_power.js
- [ ] ≥6 words
- [ ] Schema validated

### [ ] 2.15 index.js (BOTH Advanced AND Easy)
- [ ] `weekId` matches week number
- [ ] `voiceConfig` has all 6 required keys
- [ ] `stations` has all 14 required W16 keys
- [ ] All paths reference Week 33 (not Week 16)

### [ ] 2.16 week_NN_real.js (AI Tutor)
```bash
# Create in correct location
mkdir -p src/data/weeks/week_33
# NOT: src/data/weeks/week_33_real.js
```
- [ ] Located at: `src/data/weeks/week_33/week_33_real.js`
- [ ] `freetalk_knowledge` array with ≥8 facts
- [ ] `spark_talk` array with ≥2 cards, each ≥3 frames
- [ ] `target_vocab` array (≥13 words)
- [ ] V28 format: 3 missions + `v28_format_notes` + `nova` + `pacing`

---

## 🔧 PHASE 3: Validation & Quality Gates

### [ ] 3.1 Content Lint (read.js + explore.js)
```bash
npm run content:lint -- --week 33 --errors-only
```
- [ ] 0 errors
- [ ] Warnings reviewed and addressed

### [ ] 3.2 Dictionary Lint
```bash
npm run dict:lint -- --errors-only
```
- [ ] 0 errors

### [ ] 3.3 Code Quality Gate
```bash
bash tools/code_quality_gate.sh 33
```
**Checks:**
- [ ] 0 ERRORS
- [ ] All 41 checks pass

### [ ] 3.4 Per-File Syntax Validation
```bash
# Validate each .js file
for file in src/data/weeks/week_33/*.js; do
  node --input-type=module < "$file" && echo "OK: $file"
done

for file in src/data/weeks_easy/week_33/*.js; do
  node --input-type=module < "$file" && echo "OK: $file"
done
```

### [ ] 3.5 Bug Prevention Checks
```bash
# B1: No **bold** in TTS files
grep '\*\*' src/data/weeks/week_33/dictation.js \
       src/data/weeks/week_33/shadowing.js && echo "B1: FAIL"
# Expected: EMPTY

# B7: No correct: field in grammar
grep "correct:" src/data/weeks/week_33/grammar.js && echo "B7: FAIL"
# Expected: EMPTY

# B5: Valid Singapore Math types
grep -E "addition|subtraction|multiplication|division" \
  src/data/weeks/week_33/singapore_math.js && echo "B5: FAIL"
# Expected: EMPTY

# B10: No curly quotes
grep "[''']" src/data/weeks/week_33/*.js && echo "B10: FAIL"
# Expected: EMPTY
```

### [ ] 3.6 Content Consistency Checks
- [ ] 100% vocab coverage (all words in vocab.js appear in read.js + explore.js)
- [ ] dictation.js matches read.js narrative
- [ ] shadowing.js matches read.js narrative
- [ ] Easy mode content different from Advanced mode

---

## 🎨 PHASE 4: Media & Assets

### [ ] 4.1 Generate Image Prompts
```bash
node tools/generate_images.js --week 33
```
- [ ] `Production_FINAL/IMAGE PROMPTS/week_33_image_prompts.txt` created
- [ ] All vocabulary words covered

### [ ] 4.2 Generate Audio Tasks
```bash
node tools/create_audio_tasks.js --week 33
```
- [ ] `tools/audio_tasks.json` updated with Week 33 entries
- [ ] All vocab audio tasks created
- [ ] All mindmap audio tasks created

### [ ] 4.3 Generate Audio (Deepgram)
```bash
python3 tools/generate_audio_deepgram.py --week 33
```
- [ ] Audio files generated for vocab
- [ ] Audio files generated for dictation
- [ ] Audio files generated for mindmap
- [ ] All files uploaded to R2

### [ ] 4.4 Verify R2 Upload
```bash
# Test R2 upload
npx wrangler r2 object put engquest-audio/audio/week33/vocab_test.mp3 \
  --file=/tmp/test.txt --remote

# Check git status for images
git status public/images/week33/
```
- [ ] Audio on R2 verified
- [ ] Images committed to git (NOT just uploaded to R2)

### [ ] 4.5 Generate Bar Models (W16+)
```bash
python3 tools/gen_week33_barmodels.py
```
- [ ] Bar model images generated
- [ ] Images follow naming convention: `bm_w33_adv_N.jpg`, `bm_w33_easy_N.jpg`

---

## 🔍 PHASE 5: Browser Testing

### [ ] 5.1 Manual Browser Test
```bash
npm run dev
# Open http://localhost:5173/week/33/read_explore
```

**Check each station:**
- [ ] Read & Explore loads (≥13 bold words)
- [ ] Vocabulary station (13 words, audio plays)
- [ ] Grammar station (20 exercises, scoring works)
- [ ] Word Power station
- [ ] Logic Lab / Singapore Math
- [ ] Mindmap Speaking
- [ ] Dictation station
- [ ] Daily Watch (video plays)
- [ ] Game Hub (games start)
- [ ] AI Tutor widget (all 5 tabs work)

### [ ] 5.2 E2E Tests (if Playwright installed)
```bash
npx playwright install --with-deps
TEST_WEEK=33 npx playwright test --project=chromium
```
- [ ] All tests pass
- [ ] No fallback to Week 7
- [ ] AI Tutor responds correctly

### [ ] 5.3 Teacher Panel Test
```bash
# Navigate to /teacher
# Check Lesson Plan tab for Week 33
```
- [ ] Week 33 appears in Lesson Plan
- [ ] Answer Key renders correctly
- [ ] Task Cards accessible

---

## 🚀 PHASE 6: Deployment

### [ ] 6.1 Pre-Deploy Checklist
- [ ] `git status` shows clean (no uncommitted week content)
- [ ] All week data committed: `git add . && git commit -m "Week 33 content (W33)"`
- [ ] Branch up to date: `git pull origin main`

### [ ] 6.2 Deploy
```bash
git push origin main
# GitHub Actions triggers deployment
# Cloudflare Pages serves new content
```

### [ ] 6.3 Post-Deploy Verification
```bash
# Wait 2 minutes for deployment
# Test production URL
curl -I https://engquest3k.com/week/33/read_explore
```
- [ ] HTTP 200 response
- [ ] No MIME type errors
- [ ] Content loads correctly

### [ ] 6.4 Production Smoke Test
```bash
TEST_WEEK=33 BASE_URL=https://engquest3k.com npx playwright test \
  --grep "Smoke" --project=chromium
```
- [ ] App loads
- [ ] Week 33 accessible
- [ ] No critical console errors

---

## 📊 PHASE 7: Documentation & Reporting

### [ ] 7.1 Update Production Log
```bash
echo "Week 33: $(date) - Completed" >> PRODUCTION_LOG.md
```

### [ ] 7.2 Document Issues
```bash
# If any issues found during testing:
# Create bug report in BUG_REPORTS/week_33.md
```

### [ ] 7.3 Update Progress Tracker
- [ ] Weeks completed: 32/156 (20%)
- [ ] Weeks remaining: 124
- [ ] Estimated completion: Q4 2026

---

## 🎯 Quick Reference: Bug Prevention Commands

```bash
# ONE COMMAND to catch most bugs:
bash tools/preflight_check.sh && \
npm run content:lint -- --week 33 --errors-only && \
npm run dict:lint -- --errors-only && \
bash tools/code_quality_gate.sh 33 && \
echo "✅ ALL CHECKS PASSED"

# If any fail, STOP and fix before proceeding.
```

---

## 📞 Support & Debugging

### Common Issues

| Issue | Fix |
|-------|-----|
| Deepgram 401 | Check `DEEPGRAM_API_KEY` in `.env` |
| R2 upload failed | Run `npx wrangler whoami` to verify auth |
| Node < 18 | Run `nvm install 18 && nvm use 18` |
| Week 7 fallback | Check `metadata.json` and week folder structure |
| Audio not playing | Check R2 paths match `fullSentence` hash |
| Grammar always wrong | Check for `correct:` instead of `answer:` |

### Debug Commands
```bash
# Check if week data exists
ls src/data/weeks/week_33/

# Check metadata
grep "33" src/data/weeks/metadata.json

# Check R2 audio
npx wrangler r2 object list engquest-audio/audio/week33 --remote

# Check Cloudflare deployment
# Visit: https://dash.cloudflare.com
```

---

**Last updated: May 17, 2026**
**Version: 1.0**
**Based on: 34 bugs documented in W12-W34 + ECC best practices**
