# 🚀 ENGQUEST3K IMPLEMENTATION PLAN - WEEK 1-20
## Kế hoạch Triển khai Hoàn chỉnh (4 ngày làm việc)

**Mục tiêu:** Hoàn thiện 20 tuần đầu với đầy đủ tính năng Progressive Saving để học sinh test ngay.

**Timeline:** 29 Dec 2025 - 2 Jan 2026 (4 ngày)

**Owner:** Development Team  
**Priority:** 🔴 CRITICAL - Production Ready

---

## 📊 PHÂN TÍCH TÌNH TRẠNG BAN ĐẦU

### ✅ Đã có (Foundation)
- **App Infrastructure:** React 19 + Vite + TailwindCSS hoàn chỉnh
- **15 Learning Stations:** Tất cả modules đã implement
- **Dual-mode System:** Easy/Advanced mode hoạt động
- **User Management:** Login/Register + Progress tracking
- **Asset Generation Tools:** 35+ scripts automation
- **Gold Standard:** Week 19 làm template chuẩn
- **Documentation:** Master Prompt V23 (3040 lines) + Blueprint + Syllabus

### ❌ Thiếu (Gaps)
1. **Progressive Saving UI Feedback:**
   - ✅ Logic đã có (`saveStationProgress()` + `getWeekProgress()`)
   - ❌ Không có visual feedback (toast/notification)
   - ❌ Không có progress indicators trong sidebar
   - ❌ Không có auto-save animation
   - ❌ Không có "Continue Learning" feature

2. **Data Coverage:**
   - ✅ Week 1: Complete (cần fix voiceConfig + regenerate assets)
   - ❌ Week 2-17: Chưa có data (16 weeks missing)
   - ✅ Week 18-21: Complete
   - **Gap:** 16/20 weeks chưa sẵn sàng

3. **API Status:**
   - ✅ YouTube API: 3 keys working
   - ⚠️ Google TTS API: Chưa enable (project 153898303209)
   - ⚠️ Gemini API: "No image data" error (cần verify)
   - ✅ OpenAI TTS: 1 key working

4. **Quality Issues:**
   - Week 1 có voiceConfig giống hệt Week 19 (vi phạm MANDATORY unique rule)
   - Week 1 Easy mode morphing không đúng (changed topic instead of simplifying)
   - Cần QA process để đảm bảo 20 weeks consistent

---

## 🎯 OBJECTIVES & SUCCESS CRITERIA

### Primary Goals
1. **20 weeks production-ready** - All data + assets complete
2. **Progressive Saving với UX tốt** - Visual feedback + indicators
3. **QA Passed** - All weeks tested and verified
4. **Documentation Updated** - Master Prompt V23 + Implementation docs

### Success Metrics
- [ ] 20 weeks × 2 modes = 40 complete datasets
- [ ] ~2,800 audio files generated (20 weeks × 140 files/week)
- [ ] ~300 images generated (20 weeks × 15 images/week)
- [ ] 100 videos curated (20 weeks × 5 videos/week)
- [ ] Progressive Saving working with <2s response time
- [ ] All stations showing progress % in sidebar
- [ ] Toast notifications on every save action
- [ ] 0 critical errors in QA testing

---

## 📅 DETAILED SCHEDULE

### 🔴 DAY 1: FOUNDATION FIX (29 Dec 2025)
**Duration:** 6-8 hours  
**Owner:** Development Team  
**Priority:** CRITICAL

#### Morning Session (3-4 hours): Progressive Saving UI

**Task 1.1: Create SaveToast Component** (45 min)
```jsx
Location: src/components/common/SaveToast.jsx
Features:
- Success toast (green, CheckCircle icon)
- Saving toast (blue, Save icon with pulse animation)
- Auto-dismiss after 2 seconds
- Slide-up animation from bottom-right
Dependencies: lucide-react (already installed)
```

**Task 1.2: Update App.jsx - Toast Integration** (30 min)
```jsx
Changes needed:
1. Import SaveToast component
2. Add state: const [saveToast, setSaveToast] = useState({...})
3. Update handleReportProgress() to show toast
4. Add <SaveToast /> component to render tree
Testing: Verify toast shows when completing any station activity
```

**Task 1.3: Add Progress Indicators to Sidebar** (1 hour)
```jsx
Location: src/components/layout/Sidebar.jsx
Features:
- Small badge showing % completion for each station
- Green checkmark when 100% complete
- Animated progress ring around station icon
Visual: Position absolute, -top-1 -right-1, z-index high
Testing: Complete vocab station → verify badge shows 100%
```

**Task 1.4: Add Auto-Save Animation** (45 min)
```jsx
Location: src/components/common/AutoSaveIndicator.jsx
Features:
- Small pulsing icon in header when saving
- Displays: "Saving..." → "Saved ✓" → fadeout
- Non-intrusive, top-right corner
- Timeout: 1 second display
Testing: Rapid-fire progress updates → smooth animations
```

**Task 1.5: Testing Progressive Saving** (30 min)
```bash
Test scenarios:
1. Guest mode → no save (verify)
2. Student login → complete Read → verify toast + badge update
3. Complete 3 stations → logout → login → verify progress persists
4. Network offline simulation → verify localStorage fallback
5. Rapid progress updates → no UI jank
```

#### Afternoon Session (3-4 hours): Week 1 Fix + API Setup

**Task 1.6: Fix Week 1 VoiceConfig** (30 min)
```javascript
File: src/data/weeks/week_01/index.js
Changes:
- narration: 'en-GB-Neural2-A' (was D)
- vocabulary: 'en-AU-Neural2-B' (was F)
- dictation: 'en-US-Neural2-F' (was E)
- questions: 'en-GB-Neural2-C' (was D)
- mindmap: 'en-AU-Neural2-A' (was F)

Also update: src/data/weeks_easy/week_01/index.js (same voices)
Validation: All 5 voices must be different from Week 19
```

**Task 1.7: Enable Google Cloud TTS API** (1 hour)
```bash
Steps:
1. Open Google Cloud Console (console.cloud.google.com)
2. Select project: 153898303209
3. Navigate to: APIs & Services → Library
4. Search: "Cloud Text-to-Speech API"
5. Click "Enable"
6. Verify billing account is active
7. Test with: node tools/generate_audio.js 1 1 (should work now)

Troubleshooting:
- If "billing required" error → attach billing account
- If "quota exceeded" → request quota increase
```

**Task 1.8: Verify Gemini API Keys** (30 min)
```bash
Test all 3 Gemini keys:
1. AIzaSyBK3F6TPXfI88sat6-r3EvxNTt2kFpaIRU
2. AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU
3. AIzaSyBq8z3A_vspgE8s2lY53iQ7kUhqMCt4tTw

Command: node tools/batch_manager.js 1 1
Expected: 15 images generated
If fails: Check API key permissions (Imagen API enabled?)
```

**Task 1.9: Regenerate Week 1 Assets** (1.5 hours)
```bash
# Clean old assets
rm -rf public/audio/week1/*
rm -rf public/audio/week1_easy/*
rm -rf public/images/week1/*
rm -rf public/images/week1_easy/*

# Regenerate with new voiceConfig
node tools/generate_audio.js 1 1        # ~30 min, ~280 audio files
node tools/batch_manager.js 1 1         # ~45 min, ~30 images
# Videos already OK, skip

# Verify counts
ls public/audio/week1/*.mp3 | wc -l     # Should be ~140
ls public/audio/week1_easy/*.mp3 | wc -l # Should be ~140
ls public/images/week1/*.jpg | wc -l    # Should be 15
ls public/images/week1_easy/*.jpg | wc -l # Should be 15
```

**Task 1.10: End-of-Day Testing** (30 min)
```bash
Test checklist:
✓ Progressive saving shows toast
✓ Sidebar shows progress badges
✓ Week 1 audio plays with new voices
✓ Week 1 images load correctly
✓ No console errors
✓ Performance: <2s load time per week
```

---

### 🟡 DAY 2-3: MASS GENERATION WEEK 2-17 (30-31 Dec 2025)
**Duration:** 2 full days (16 hours total)  
**Owner:** Content Generation Team + AI  
**Priority:** HIGH

#### Day 2 Morning: Setup & Week 2-9 (4 hours)

**Task 2.1: Create VoiceConfig Rotation Database** (1 hour)
```javascript
File: tools/voiceconfig_rotation.json
Structure:
{
  "1": { "narration": "en-GB-Neural2-A", ... },
  "2": { "narration": "en-US-Neural2-G", ... },
  "3": { "narration": "en-AU-Neural2-D", ... },
  ...
  "20": { "narration": "en-GB-Neural2-F", ... }
}

Strategy:
- Rotate through US (10 voices) → GB (6 voices) → AU (4 voices)
- Never repeat same combination
- Female/Male voice alternation
- Document pattern for weeks 21-144
```

**Task 2.2: Create Batch Generation Script** (1 hour)
```bash
File: tools/generate_weeks_batch.sh
Features:
- Accept START_WEEK and END_WEEK params
- Pre-flight validation (check syllabus_database.js)
- Data generation loop (call AI for 14 files)
- Structure validation (14 files, 10 bold words, schema match)
- Asset generation (audio + images + videos)
- Error logging to generate_weeks_batch.log
- Rollback on failure

Usage: ./tools/generate_weeks_batch.sh 2 9
```

**Task 2.3: Generate Week 2-5 Data** (2 hours)
```bash
Process per week:
1. Read syllabus for Week X (grammar, topic, vocab)
2. Generate 14 files following Week 19 structure:
   - read.js (10 bold words, 8-12 sentences)
   - explore.js (10 bold words, 8-12 sentences)
   - vocab.js (10 words from syllabus)
   - word_power.js (3 collocations, Phase 1)
   - grammar.js (20 exercises, week's grammar focus)
   - logic.js (5 puzzles with context)
   - ask_ai.js (5 prompts with context)
   - dictation.js (8-10 sentences from read.js)
   - shadowing.js (same 8-10 sentences)
   - mindmap.js (6 stems × 6 branches, nested object)
   - daily_watch.js (5 videos placeholder)
   - writing.js (1 prompt)
   - word_match.js (pairs 1-10)
   - index.js (imports + voiceConfig from rotation.json)

3. Create Easy mode (same 14 files, simplified):
   - 6-8 sentences (not 8-12)
   - Simpler grammar, same topic
   - Same vocab words, simpler definitions

4. Create bridge files:
   - src/data/weeks/week_X.js
   - src/data/weeks_easy/week_X.js

5. Validation:
   - 14 files exist ✓
   - Bold words = 10 ✓
   - VoiceConfig unique ✓
   - Schema matches Week 19 ✓

Estimated: 30 min per week = 2 hours for Week 2-5
```

#### Day 2 Afternoon: Week 6-9 Data + Assets (4 hours)

**Task 2.4: Generate Week 6-9 Data** (2 hours)
```bash
Same process as Task 2.3
Weeks: 6, 7, 8, 9
Total: 4 weeks × 30 min = 2 hours
```

**Task 2.5: Generate Assets for Week 2-9** (2 hours)
```bash
# Batch audio generation (parallel possible if multiple API keys)
for WEEK in {2..9}; do
  echo "Generating audio for Week $WEEK..."
  node tools/generate_audio.js $WEEK $WEEK &
done
wait  # Wait for all parallel jobs

# Batch image generation
for WEEK in {2..9}; do
  echo "Generating images for Week $WEEK..."
  node tools/batch_manager.js $WEEK $WEEK
done

# Batch video curation
for WEEK in {2..9}; do
  echo "Curating videos for Week $WEEK..."
  node tools/update_videos.js $WEEK
done

Estimated:
- Audio: 8 weeks × 15 min = 2 hours (parallel: 30 min)
- Images: 8 weeks × 10 min = 1.5 hours
- Videos: 8 weeks × 5 min = 40 min
Total: ~2 hours with parallelization
```

#### Day 3 Morning: Week 10-13 (4 hours)

**Task 2.6: Generate Week 10-13 Data** (2 hours)
```bash
Weeks: 10, 11, 12, 13
Process: Same as Task 2.3
4 weeks × 30 min = 2 hours
```

**Task 2.7: Generate Assets for Week 10-13** (2 hours)
```bash
Same batch process as Task 2.5
Estimated: 1 hour (with parallelization)
```

#### Day 3 Afternoon: Week 14-17 (4 hours)

**Task 2.8: Generate Week 14-17 Data** (2 hours)
```bash
Weeks: 14, 15, 16, 17
Process: Same as Task 2.3
4 weeks × 30 min = 2 hours
```

**Task 2.9: Generate Assets for Week 14-17** (2 hours)
```bash
Same batch process as Task 2.5
Estimated: 1 hour (with parallelization)
```

**Task 2.10: Mid-Generation QA** (1 hour)
```bash
Spot-check weeks 5, 10, 15:
✓ Audio files playable?
✓ Images display correctly?
✓ Videos valid (not 404)?
✓ Bold words = 10?
✓ Easy mode simpler but same topic?
✓ VoiceConfig all unique?

Create: QA_SPOT_CHECK_REPORT.md
```

---

### 🟢 DAY 4: TESTING + POLISH (1 Jan 2026)
**Duration:** 8 hours  
**Owner:** QA Team  
**Priority:** CRITICAL (Production blocker)

#### Morning Session (4 hours): Full QA Testing

**Task 4.1: Automated Structure Validation** (1 hour)
```bash
Script: tools/validate_all_weeks.sh

for WEEK in {1..20}; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Validating Week $WEEK..."
  
  # File count check
  FILE_COUNT=$(ls src/data/weeks/week_$WEEK/*.js 2>/dev/null | wc -l)
  if [ "$FILE_COUNT" -ne 14 ]; then
    echo "❌ FAIL: Only $FILE_COUNT files (expected 14)"
    exit 1
  fi
  
  # Bold words check
  BOLD_READ=$(grep -o '\*\*[^*]*\*\*' src/data/weeks/week_$WEEK/read.js 2>/dev/null | wc -l)
  BOLD_EXPLORE=$(grep -o '\*\*[^*]*\*\*' src/data/weeks/week_$WEEK/explore.js 2>/dev/null | wc -l)
  
  if [ "$BOLD_READ" -ne 10 ]; then
    echo "❌ FAIL: read.js has $BOLD_READ bold words (expected 10)"
    exit 1
  fi
  
  if [ "$BOLD_EXPLORE" -ne 10 ]; then
    echo "❌ FAIL: explore.js has $BOLD_EXPLORE bold words (expected 10)"
    exit 1
  fi
  
  # Asset count check
  AUDIO_ADV=$(ls public/audio/week$WEEK/*.mp3 2>/dev/null | wc -l)
  AUDIO_EASY=$(ls public/audio/week${WEEK}_easy/*.mp3 2>/dev/null | wc -l)
  IMAGE_ADV=$(ls public/images/week$WEEK/*.jpg 2>/dev/null | wc -l)
  IMAGE_EASY=$(ls public/images/week${WEEK}_easy/*.jpg 2>/dev/null | wc -l)
  VIDEO_COUNT=$(grep -c '"videoId"' src/data/weeks/week_$WEEK/daily_watch.js 2>/dev/null)
  
  echo "  ✓ Data files: $FILE_COUNT"
  echo "  ✓ Bold words (read): $BOLD_READ"
  echo "  ✓ Bold words (explore): $BOLD_EXPLORE"
  echo "  ✓ Audio (adv): $AUDIO_ADV"
  echo "  ✓ Audio (easy): $AUDIO_EASY"
  echo "  ✓ Images (adv): $IMAGE_ADV"
  echo "  ✓ Images (easy): $IMAGE_EASY"
  echo "  ✓ Videos: $VIDEO_COUNT"
  
  if [ "$AUDIO_ADV" -lt 120 ]; then
    echo "  ⚠️ WARNING: Low audio count (expected ~138)"
  fi
  
  if [ "$IMAGE_ADV" -ne 15 ]; then
    echo "  ⚠️ WARNING: Image count not 15"
  fi
  
  if [ "$VIDEO_COUNT" -ne 5 ]; then
    echo "  ❌ FAIL: Video count not 5 (got $VIDEO_COUNT)"
    exit 1
  fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ALL 20 WEEKS VALIDATED SUCCESSFULLY"
```

**Task 4.2: Manual Content QA (Sample)** (1 hour)
```markdown
Sample weeks: 1, 5, 10, 15, 20

For each sample week:
1. Read story quality check:
   ✓ Grammar correct?
   ✓ Story coherent?
   ✓ Bold words contextually appropriate?
   ✓ Matches syllabus topic?

2. Explore article quality check:
   ✓ CLIL content accurate?
   ✓ Age-appropriate?
   ✓ Bold words domain-specific?

3. Vocab relevance check:
   ✓ All 10 words from syllabus?
   ✓ Definitions clear?
   ✓ Images appropriate?

4. Grammar exercises check:
   ✓ Matches week's grammar focus?
   ✓ Answer keys correct?
   ✓ Hints helpful?

5. Logic puzzles check:
   ✓ Context 30-50 words?
   ✓ Math solvable?
   ✓ Age-appropriate difficulty?

Create: CONTENT_QA_SAMPLE_REPORT.md
```

**Task 4.3: User Flow Testing** (2 hours)
```markdown
Test Scenarios:

Scenario 1: First-time Student
1. Register new account
2. Select Week 1
3. Complete Read station → verify toast shows
4. Complete Vocab station → verify progress badge updates
5. Logout
6. Login → verify Week 1 progress shows in sidebar
Expected: All progress persists, badges show correct %

Scenario 2: Multiple Weeks Progress
1. Login as existing student
2. Complete Week 1 (all 15 stations) → verify confetti
3. Switch to Week 5 → complete 3 stations
4. Switch to Week 10 → complete 2 stations
5. Logout
6. Login → check "Continue Learning" card
Expected: Shows Week 10 (last accessed), all progress retained

Scenario 3: Easy/Advanced Mode Switching
1. Login
2. Set mode to "Easy"
3. Complete Week 2 Read station
4. Switch to "Advanced" mode
5. Verify Week 2 Read is different (harder)
6. Switch back to "Easy"
Expected: Progress tracks separately per mode

Scenario 4: Offline/Online Handling
1. Login
2. Disable network
3. Complete Week 3 Vocab station
4. Verify toast shows (localStorage fallback)
5. Enable network
6. Refresh page
7. Verify progress still there
Expected: Offline progress persists via localStorage

Scenario 5: Guest Mode Limitations
1. Click "Guest Login"
2. Complete Week 1 Read station
3. Verify NO toast shows (guest can't save)
4. Logout
5. Login as registered user
Expected: Guest progress not saved, registered user can save

Create: USER_FLOW_TEST_RESULTS.md
```

#### Afternoon Session (4 hours): Polish & Documentation

**Task 4.4: Add "Continue Learning" Feature** (1 hour)
```jsx
Location: src/components/layout/Sidebar.jsx

Feature:
- Card showing last accessed week
- "Resume" button → navigates to last station
- Shows progress % of that week
- Only shows if user has progress data

Implementation:
1. Track lastWeek + lastStation in user object
2. Update on every station access
3. Add card component in Sidebar
4. Add navigation handler
```

**Task 4.5: Add Week Completion Celebration** (30 min)
```jsx
Location: src/App.jsx

Feature:
- When weekProgress === 100%, trigger confetti
- Show congratulations modal
- Award 50 stars (bonus)
- Unlock next week

Implementation:
1. Import react-confetti (already in package.json)
2. Add useEffect watching weekProgress
3. Trigger <Confetti /> component
4. Add CongratulationsModal component
5. Update user.stats.stars
```

**Task 4.6: Performance Optimization** (1 hour)
```javascript
Optimizations needed:
1. Lazy load audio files (only load when station active)
2. Image lazy loading (react-lazy-load-image-component)
3. Code splitting per module (React.lazy)
4. Memoize expensive calculations (useMemo)
5. Debounce progress save calls (avoid spam)

Target metrics:
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Performance Score: >90

Run: npm run build && npm run preview
Test with Chrome DevTools Performance tab
```

**Task 4.7: Update Master Prompt V23** (1 hour)
```markdown
File: 4. ENGQUEST MASTER PROMPT V23-FINAL.txt

Add new sections:
1. Section 0.8: Progressive Saving Requirements
   - Toast notification specs
   - Progress indicator specs
   - Auto-save behavior
   - Continue Learning feature

2. Section 0.9: Week Completion Celebration
   - Confetti animation trigger
   - Star bonus system
   - Next week unlock logic

3. Update Section 0.6: Audio count clarification
   - Remove "~138" ambiguity
   - Specify exact counts per station type
   - Add grammar examples audio note

4. Update Section 0.5: Video Generation
   - Emphasize EXACTLY 5 videos (not 3-5)
   - Add video_queries.json template
   - Document WHITELIST priorities

Backup old version:
cp "4. ENGQUEST MASTER PROMPT V23-FINAL.txt" "4. ENGQUEST MASTER PROMPT V23-FINAL.txt.bak"
```

**Task 4.8: Create Implementation Summary** (30 min)
```markdown
File: IMPLEMENTATION_SUMMARY.md

Contents:
1. What was built
2. Architecture decisions
3. File structure overview
4. Key features
5. Known limitations
6. Future roadmap (Week 21-144)
7. Handoff notes for team

Reference: This implementation plan
```

**Task 4.9: Final Testing Checklist** (1 hour)
```bash
Production Readiness Checklist:

System Health:
✓ No console errors in any module
✓ All API keys valid and working
✓ All assets loading correctly
✓ No 404 errors
✓ No memory leaks (test 30min session)

Data Completeness:
✓ 20 weeks × 2 modes = 40 datasets ✓
✓ ~2,800 audio files present
✓ ~300 images present
✓ 100 videos present
✓ All voiceConfigs unique

Feature Testing:
✓ Progressive saving works all stations
✓ Toast notifications appear
✓ Progress badges update
✓ Continue Learning shows correct week
✓ Week completion celebration triggers
✓ Easy/Advanced mode switching works
✓ Logout/Login preserves progress

Performance:
✓ Load time <3s per week
✓ Audio playback smooth (<500ms latency)
✓ Image loading lazy (no blocking)
✓ No UI jank during progress updates
✓ Memory usage <200MB after 10 weeks browsing

Cross-browser:
✓ Chrome (latest)
✓ Safari (latest)
✓ Firefox (latest)
✓ Mobile Safari (iOS)
✓ Chrome Mobile (Android)

Create: FINAL_QA_REPORT.md
```

---

## 📦 DELIVERABLES

### Documentation
- [x] `IMPLEMENTATION_PLAN.md` (this file)
- [ ] `CHAT_SESSION_REPORT.md` - Full transcript summary
- [ ] `MASTER_PROMPT_V23_UPDATES.md` - Changelog
- [ ] `QA_SPOT_CHECK_REPORT.md` - Mid-generation QA
- [ ] `CONTENT_QA_SAMPLE_REPORT.md` - Manual content review
- [ ] `USER_FLOW_TEST_RESULTS.md` - User testing results
- [ ] `FINAL_QA_REPORT.md` - Production readiness sign-off
- [ ] `IMPLEMENTATION_SUMMARY.md` - Handoff document

### Code Deliverables
- [ ] `src/components/common/SaveToast.jsx`
- [ ] `src/components/common/AutoSaveIndicator.jsx`
- [ ] `src/components/common/CongratulationsModal.jsx`
- [ ] Updated `src/components/layout/Sidebar.jsx`
- [ ] Updated `src/App.jsx`
- [ ] `tools/voiceconfig_rotation.json`
- [ ] `tools/generate_weeks_batch.sh`
- [ ] `tools/validate_all_weeks.sh`

### Data Deliverables
- [ ] Week 1-20 complete data (40 datasets)
- [ ] Week 1-20 audio assets (~2,800 files)
- [ ] Week 1-20 image assets (~300 files)
- [ ] Week 1-20 video curation (100 videos)

---

## 🚨 RISK MANAGEMENT

### High-Risk Items

**1. API Quota Limits**
- **Risk:** Google TTS/Gemini may hit quota during mass generation
- **Mitigation:** 
  - Use multiple API keys (rotate)
  - Batch generation with delays
  - Monitor quota usage in Cloud Console
  - Have OpenAI TTS as backup for audio

**2. AI Content Quality Inconsistency**
- **Risk:** Weeks 2-17 generated content may vary in quality
- **Mitigation:**
  - Spot-check every 5th week (Task 4.2)
  - Use Week 19 as strict template reference
  - Human review on sample weeks before full deployment
  - Maintain content quality rubric

**3. Asset Generation Failures**
- **Risk:** Network issues, API errors during overnight generation
- **Mitigation:**
  - Add retry logic to batch script (3 attempts)
  - Log all errors to `generate_weeks_batch.log`
  - Rollback mechanism if week fails
  - Manual intervention checklist

**4. Performance Degradation**
- **Risk:** Loading 20 weeks data slows app
- **Mitigation:**
  - Lazy loading per week (don't load all upfront)
  - Code splitting per module
  - Image optimization (WebP format, lazy load)
  - Audio on-demand loading (not preload)

### Medium-Risk Items

**5. VoiceConfig Collision**
- **Risk:** Accidentally repeat voice combinations
- **Mitigation:**
  - Pre-generate rotation database (Task 2.1)
  - Automated validation in batch script
  - Manual spot-check in Task 4.1

**6. Easy Mode Morphing Errors**
- **Risk:** Easy mode changes topic instead of simplifying
- **Mitigation:**
  - Clear guidelines in generation prompt
  - Automated check: topic keywords must match
  - Manual review in Task 4.2

---

## 🎓 LESSONS LEARNED (To Document)

### From Week 1 Errors
1. **Always validate schema** before asset generation
2. **Bold word syntax matters** - Must use `**word**` not `*word*`
3. **VoiceConfig must be unique** - No default fallbacks
4. **Easy mode = same topic, simplified** - Not different topic
5. **Grammar structure critical** - Must match Week 19 exactly

### Best Practices Established
1. Use Week 19 as gold standard for all validation
2. Run pre-flight checks before expensive asset generation
3. Spot-check every 5th week to catch drift early
4. Keep Master Prompt V23 as single source of truth
5. Document all changes in markdown files (not just code comments)

---

## 🔄 HANDOFF NOTES

### For Next Phase (Week 21-144)

**Prerequisites Completed:**
- Week 1-20 template proven and stable
- Batch generation scripts tested and working
- VoiceConfig rotation pattern established
- QA process defined and validated

**To Continue:**
1. Extend `voiceconfig_rotation.json` to week 144
2. Generate weeks in batches of 10-20
3. Run same QA process per batch
4. Monitor API costs (may need budget approval)
5. Consider Phase 2/3 morphing rules (word_power 3→5→7, logic 5→7→10)

**Critical Files to Understand:**
- `4. ENGQUEST MASTER PROMPT V23-FINAL.txt` - Source of truth
- `1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` - Content requirements
- `2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt` - Pedagogical rules
- `src/data/weeks/week_19/index.js` - Gold standard structure

**Team Contacts:**
- Content Lead: [TBD]
- Technical Lead: [TBD]
- QA Lead: [TBD]
- Project Manager: [TBD]

---

## 📊 BUDGET & RESOURCES

### API Costs (Estimated)
- **Google TTS:** 
  - ~2,800 audio files × $16 per 1M chars
  - Avg 50 chars/file = 140,000 chars
  - Cost: ~$2.24 per 20 weeks
  
- **Gemini Imagen:**
  - ~300 images × $0.02 per image
  - Cost: ~$6.00 per 20 weeks

- **YouTube API:**
  - Free tier: 10,000 queries/day (sufficient)
  - Cost: $0

**Total estimated: ~$10 for Week 1-20**

### Time Investment
- Development: 30 hours (4 days × 7.5 hours)
- QA: 8 hours
- Documentation: 4 hours
- **Total: 42 hours**

---

## ✅ SIGN-OFF

### Development Team
- [ ] Progressive Saving UI complete and tested
- [ ] Week 1 fixed and regenerated
- [ ] All API keys enabled and working
- [ ] No critical bugs in core features

### Content Team
- [ ] Week 2-17 data generated following Master Prompt V23
- [ ] All voiceConfigs unique and rotated properly
- [ ] Easy mode morphing correctly applied
- [ ] Sample weeks manually reviewed for quality

### QA Team
- [ ] All automated validation passed
- [ ] User flow testing completed with 0 critical issues
- [ ] Performance benchmarks met
- [ ] Cross-browser testing passed

### Project Manager
- [ ] All deliverables received
- [ ] Documentation complete and organized
- [ ] Timeline met (or variance documented)
- [ ] Ready for student pilot testing

**Final Approval Date:** _____________  
**Approved By:** _____________

---

**End of Implementation Plan**

*Last Updated: 29 Dec 2025*  
*Version: 1.0*  
*Status: 🟢 ACTIVE*
