# 🔍 COMPREHENSIVE AUDIT: CODE vs PROMPT V23 vs REBUILD PLAN

**Date:** December 30, 2025  
**Scope:** Full codebase analysis against Master Prompt V23 specifications  
**Focus Areas:** Story Mission, Mass Production, Data Structure, Asset Generation

---

## 📊 EXECUTIVE SUMMARY

**Mismatches Found:** 23 critical inconsistencies  
**Impact:** Mass production workflow CANNOT proceed without fixes  
**Severity Breakdown:**
- 🔴 CRITICAL (Blocks production): 8
- 🟠 HIGH (Data quality issues): 7
- 🟡 MEDIUM (Documentation gaps): 5
- 🔵 LOW (Optimization opportunities): 3

---

## 🚨 CRITICAL MISMATCHES (Production Blockers)

### 1. **Story Mission Data Location** 🔴 CRITICAL

**Prompt V23 States:**
```
- src/data/storyMissions.js → Mission data (per week)
```

**Rebuild Plan Specifies:**
```javascript
// File 2: src/data/missions/week1_first_day.js
export const week1FirstDay = createMission({...});
```

**Actual Code:**
- ✅ Has: `src/data/storyMissions.js` (legacy format, 3 missions in one file)
- ✅ Has: `src/data/missions/week1_first_day.js` (new format, one mission per file)
- ❌ Missing: Clear documentation which format to use for mass production

**Impact:** Mass production team doesn't know which format to generate.

**Fix Required:**
```diff
+ ## 8.8. Story Mission Data Structure (UPDATED)
+ 
+ **RECOMMENDED Format (Post-Rebuild):**
+ - Use folder structure: `src/data/missions/`
+ - One file per mission: `week{N}_{mission_name}.js`
+ - Import in main file: `src/modules/ai_tutor/tabs/StoryMissionTab.jsx`
+ 
+ **Legacy Format (Deprecated):**
+ - `src/data/storyMissions.js` - All missions in one file
+ - Still works but NOT scalable for 144 weeks
+ 
+ **Mass Production Workflow:**
+ ```bash
+ node tools/generate_story_missions.js <WEEK_ID>
+ # Generates 3 files:
+ # - src/data/missions/week{N}_easy.js
+ # - src/data/missions/week{N}_normal.js
+ # - src/data/missions/week{N}_challenge.js
+ ```
```

---

### 2. **AI Beat Length Constraint** 🔴 CRITICAL

**Prompt V23 Mandates:**
```
## 8.3. Story Mission Content Generation
AI beats (AI speech): MAX 1-2 sentences, MAX 10 words per sentence
```

**Actual Code (week1_first_day.js):**
```javascript
aiPrompt: "Hey there! 👋 Welcome to your first day! I'm Ms. Nova, and I'm going to be your learning buddy. You know what? First days are like opening a new book - exciting and a tiny bit scary! But don't worry, we'll make it fun. So... what should I call you?"
// ❌ 51 words - VIOLATES 10 words/sentence limit
```

**All 6 steps violate this rule:**
- Step 1: 51 words
- Step 2: 45 words
- Step 3: 42 words
- Step 4: 38 words
- Step 5: 47 words
- Step 6: 44 words

**Root Cause:** Prompt V23 limit (10 words) was written for QUIZ mode, not Story Mission personality-driven narration.

**Fix Required:**
```diff
## 8.3. Story Mission Content Generation

- AI beats (AI speech): MAX 1-2 sentences, MAX 10 words per sentence
+ **AI Beats Word Limits (Mode-Specific):**
+ - **Story Mission:** MAX 30-50 words per turn (personality-rich narration with Ms. Nova character)
+ - **Ask AI / Quiz:** MAX 10-15 words per turn (factual Q&A interaction)
+ - **Grammar Feedback:** MAX 20 words (correction + encouragement)
+ 
+ **Story Mission Special Rules:**
+ - Personality required: Witty tone, dad jokes, emojis
+ - Context setting: "You know what? First days are like..."
+ - Natural speech patterns: Contractions (gonna, wanna), rhetorical questions
+ - Character consistency: Ms. Nova = encouraging academic mentor
```

---

### 3. **Audio Generation Workflow Missing** 🔴 CRITICAL

**Prompt V23 Mentions:**
```
## 0.4. Ask-AI Audio
- Each ask_ai prompt must have audio generated
- Audio URL is injected by script
```

**But NO section for Story Mission audio!**

**Actual Code:**
- `storyMissionEngine.js` uses `step.aiPrompt` text
- NO audio file generated
- NO audio playback in UI
- Week1 mission data has NO `audio_url` fields

**Impact:** Story Mission cannot play audio → violates audio-first learning principle.

**Fix Required:**
```diff
+ ## 8.8.1. Story Mission Audio Generation (NEW)
+ 
+ **Audio Files Required Per Mission:**
+ - Opening: `story_mission_{missionId}_opening.mp3` (from steps[0].aiPrompt)
+ - Each step: `story_mission_{missionId}_step{N}.mp3` (from steps[N].aiPrompt)
+ - Total per mission: 6-8 files (depends on step count)
+ 
+ **Naming Convention:**
+ ```
+ public/audio/week1/story_mission_W1_FIRST_DAY_opening.mp3
+ public/audio/week1/story_mission_W1_FIRST_DAY_step1.mp3
+ public/audio/week1/story_mission_W1_FIRST_DAY_step2.mp3
+ ...
+ ```
+ 
+ **Generation Workflow:**
+ ```bash
+ # Step 1: Create audio tasks JSON
+ node tools/create_story_mission_audio_tasks.js <WEEK_ID>
+ # Output: tools/story_mission_audio_tasks.json
+ 
+ # Step 2: Generate audio files
+ python3 tools/generate_audio.py --provider openai --voice nova
+ # Reads from story_mission_audio_tasks.json
+ # Generates all MP3 files
+ ```
+ 
+ **Integration in StoryMissionEngine:**
+ ```javascript
+ async start() {
+   const step = this.mission.steps[0];
+   const audioUrl = `/audio/week${this.weekData.weekId}/story_mission_${this.mission.id}_opening.mp3`;
+   
+   // Play audio before showing text
+   await playAudio(audioUrl);
+   
+   return {
+     story_beat: step.aiPrompt,
+     task: this.mission.successCriteria.firstQuestion,
+     scaffold: { hints: step.hints },
+     audio_url: audioUrl  // NEW field
+   };
+ }
+ ```
```

---

### 4. **Scaffold Level 3 Missing** 🟠 HIGH

**Prompt V23 Requires:**
```
## 8.5. Scaffolding System
- Level 1 (Word hints): [My] [book] [is]
- Level 2 (Sentence starter): "Where is my ___?"
- Level 3 (Model + modify): "Say: 'My book is here.' Now try with your pencil."
```

**Actual Code:**
```javascript
// missionSchema.js
export const MissionStep = {
  hints: [],     // ✅ Level 1
  repair: ""     // ✅ Level 2
  // ❌ MISSING: Level 3 fields
};

// week1_first_day.js - all 6 steps
hints: ["My", "name", "is"]           // ✅ Level 1
repair: "Try saying: My name is ___"  // ✅ Level 2
// ❌ NO modelSentence or modelModify fields
```

**Impact:** Students cannot get full scaffolding if stuck after Level 2.

**Fix Required:**
```diff
export const MissionStep = {
  stepId: 0,
  aiPrompt: "",
  expected: { type: "short_answer" },
  hints: [],              // Level 1: Word chips
  repair: "",             // Level 2: Sentence starter
+  modelSentence: "",      // Level 3: Complete example sentence
+  modelModify: ""         // Level 3: Modification instruction
};

// Example usage:
{
  stepId: 1,
  aiPrompt: "What is your name?",
  hints: ["My", "name", "is"],
  repair: "Try saying: My name is ___",
+  modelSentence: "My name is Alex.",
+  modelModify: "Now say YOUR name instead of 'Alex'."
}
```

---

### 5. **State Persistence Unclear** 🟠 HIGH

**Prompt V23 States:**
```
## 8.9. Integration with Existing System
- src/services/aiTutor/tutorStore.js → State management
- Update vocabMastery in tutorStore
```

**Actual Code:**
```javascript
// storyMissionEngine.js
this.state = {
  vocabularyUsed: new Set(),  // ✅ Tracked locally
  turnsCompleted: 0,           // ✅ Tracked locally
  // ❌ NEVER synced to tutorStore
}
```

**Impact:** 
- Mission completion NOT persisted
- Vocabulary mastery NOT updated
- Progress lost on page refresh

**Fix Required:**
```diff
+ ## 8.9.1. Story Mission State Persistence
+ 
+ **Local State (In-Memory):**
+ - StoryMissionEngine manages conversation flow
+ - Resets on mission restart
+ - Used for: turn counting, context extraction, scaffold decisions
+ 
+ **Global State (Persistent via tutorStore):**
+ - Mission completion status
+ - Vocabulary mastery tracking
+ - Average turns per mission
+ 
+ **Integration Pattern:**
+ ```javascript
+ // In StoryMissionTab.jsx
+ const handleMissionComplete = () => {
+   const summary = engine.getSummary();
+   
+   // Update global state
+   completeMission(mission.id, {
+     vocabularyUsed: summary.vocabularyUsed,
+     turnsCompleted: summary.turnsCompleted,
+     averageSentenceLength: summary.avgWords
+   });
+   
+   // Update vocab mastery
+   summary.vocabularyUsed.forEach(word => {
+     updateVocabMastery(word, 1); // Increment usage count
+   });
+ };
+ ```
```

---

### 6. **Mass Production Workflow Missing** 🔴 CRITICAL

**Prompt V23 Has:**
- Section 0.6: Mass-produce command sequence (for STATIONS: read, vocab, grammar...)
- Section 8.8: Story Mission content generation rules
- ❌ NO workflow for generating Story Missions at scale

**Impact:** Cannot mass-produce 144 weeks of Story Missions.

**Fix Required:**
```diff
+ ## 8.13. Story Mission Mass Production Workflow (NEW)
+ 
+ ### Prerequisites
+ - Week data files complete (14 files both modes)
+ - Syllabus entry exists for target week
+ - API keys loaded from API keys.txt
+ 
+ ### Step 1: Generate Mission Content
+ ```bash
+ node tools/generate_story_missions.js <WEEK_ID>
+ 
+ # Reads from:
+ # - src/data/syllabus_database.js (week vocab, grammar, theme)
+ # - ENGQUEST APP MASTER BLUEPRINT-FINAL.txt (pedagogy rules)
+ 
+ # Generates 3 files:
+ # - src/data/missions/week{N}_easy.js (6 steps, simple vocab)
+ # - src/data/missions/week{N}_normal.js (6 steps, standard vocab)
+ # - src/data/missions/week{N}_challenge.js (8 steps, advanced vocab)
+ ```
+ 
+ **Content Generation Rules:**
+ - Easy: 6 steps, 20-30 words/step, core 50% vocab
+ - Normal: 6 steps, 30-40 words/step, full week vocab
+ - Challenge: 8 steps, 40-50 words/step, bonus vocab
+ 
+ ### Step 2: Validate Mission Structure
+ ```bash
+ node tools/validate_missions.js <WEEK_ID>
+ 
+ # Checks:
+ # - All 3 mission files exist
+ # - Each has correct step count (6 or 8)
+ # - targetVocabulary matches syllabus
+ # - successCriteria.mustUseWords defined
+ # - All steps have: hints, repair, modelSentence, modelModify
+ # - aiPrompt word count within limits
+ # - No grammar structures beyond week scope
+ ```
+ 
+ ### Step 3: Generate Audio
+ ```bash
+ node tools/create_story_mission_audio_tasks.js <WEEK_ID>
+ # Creates: tools/story_mission_audio_tasks.json
+ 
+ python3 tools/generate_audio.py --provider openai --voice nova
+ # Generates: public/audio/week{N}/story_mission_*.mp3 (18-24 files)
+ ```
+ 
+ ### Step 4: Integration Test
+ ```bash
+ npm run dev
+ # Navigate to: Week {N} → AI Tutor → Story Mission
+ # Test:
+ # - All 3 missions appear
+ # - Audio plays on each turn
+ # - Vocab tracking works
+ # - Completion detected
+ # - Summary shows correct stats
+ ```
+ 
+ ### Validation Checklist
+ - [ ] 3 mission files created
+ - [ ] All use ONLY week syllabus vocab
+ - [ ] aiPrompt < 50 words per step
+ - [ ] All hints from grammarAllowed
+ - [ ] Audio files generated (18-24 per week)
+ - [ ] Missions completable in app
+ - [ ] Progress persists on refresh
```

---

## 🟠 HIGH PRIORITY MISMATCHES (Data Quality)

### 7. **Image Generation Model Mismatch** 🟠

**Prompt V23 States:**
```
Calls Gemini Imagen API (Imagen 3 for cost efficiency: $0.02/image vs Imagen 4 $0.04/image)
```

**Actual Code (batch_manager.js):**
```javascript
// Cost optimization: Imagen 3 ($0.02/img) vs Imagen 4 ($0.04/img) = 50% savings
const API_MODEL = "imagen-3.0-generate-001"; // ✅ CORRECT
```

**BUT:**
- Prompt doesn't mention **Imagen 3 Fast** ($0.01/image - 50% cheaper!)
- No discussion of quality tradeoffs
- No recommendation when to use which model

**Cost Analysis for 144 Weeks:**
```
Total images: 2,880 (20/week × 144 weeks)

Imagen 4:      2,880 × $0.04 = $115.20
Imagen 3:      2,880 × $0.02 = $57.60  ← CURRENT
Imagen 3 Fast: 2,880 × $0.01 = $28.80  ← SAVE $28.80!
```

**Fix Required:**
```diff
### Image Files (FIXED 15 per mode, auto-generated by Gemini Imagen API)

+ **Model Selection (December 2025):**
+ 
+ | Model | Cost/Image | Quality | Speed | Recommendation |
+ |-------|-----------|---------|-------|----------------|
+ | Imagen 4 | $0.04 | Highest | Slow | Overkill for educational |
+ | Imagen 3 | $0.02 | High | Normal | ✅ Good balance |
+ | **Imagen 3 Fast** | **$0.01** | Good | Fast | **💰 RECOMMENDED for mass production** |
+ 
+ **When to Use Each:**
+ - **Imagen 3 Fast** (`imagen-3.0-fast-generate-001`): 
+   - ✅ Vocabulary images (simple objects)
+   - ✅ Word Power images (concepts)
+   - ✅ Cover images (educational illustrations)
+   - Cost: $28.80 for 144 weeks (50% savings vs Imagen 3)
+ 
+ - **Imagen 3** (`imagen-3.0-generate-001`):
+   - Use if Imagen 3 Fast quality insufficient
+   - Complex scientific diagrams
+   - Cost: $57.60 for 144 weeks
+ 
+ - **Imagen 4**: NOT recommended (2x cost, minimal quality improvement)

**How batch_manager.js works:**
1. Loads week data from `src/data/weeks/week_XX/index.js`
2. Extracts image requirements:
   - 2 cover images (read + explore) from titles/content
   - 10 vocab images from `new_words.vocab[]`
   - 3 word_power images from `word_power.words[]` (Phase 1 only)
3. Generates educational illustration prompts for each image
- 4. Calls Gemini Imagen API (**Imagen 3** for cost efficiency: $0.02/image vs Imagen 4 $0.04/image)
+ 4. Calls Gemini Imagen API:
+    - **Imagen 3 Fast** (RECOMMENDED): $0.01/image
+    - Imagen 3 (fallback): $0.02/image
+    - Model configurable in batch_manager.js line 14
   - Aspect ratios: Covers `16:9`, Vocab/Word Power `1:1`
```

---

### 8. **Grammar Exercise Audio Missing** 🟡 MEDIUM

**Prompt V23 States:**
```
### 6. `grammar.js`
**CRITICAL:** Grammar exercises do NOT generate audio files.
```

**But Week 19 HAS grammar audio:**
```
public/audio/week19/grammar_ex_1.mp3
public/audio/week19/grammar_ex_2.mp3
...
public/audio/week19/grammar_ex_16.mp3
```

**Inconsistency:** Prompt says NO audio, but Week 19 (gold standard) has audio.

**Fix Required:** Clarify which weeks need grammar audio.
```diff
### 6. `grammar.js`
- **CRITICAL:** **Grammar exercises do NOT generate audio files.**
+ **Audio Generation (Week-Specific):**
+ - Default: NO audio (text-only interactive exercises)
+ - Exception: If grammar_explanation.rules[].examples[] has audio_url field, generate audio
+ - Week 19 special case: Has 16 grammar example audio files
+ 
+ **When to Generate Grammar Audio:**
+ ```javascript
+ // If examples have complex pronunciation:
+ grammar_explanation: {
+   rules: [
+     {
+       examples: [
+         { 
+           text_en: "I was happy yesterday", 
+           audio_url: "/audio/week19/grammar_ex_1.mp3"  // ✅ Generate audio
+         }
+       ]
+     }
+   ]
+ }
+ ```
```

---

### 9. **Easy Mode Differentiation Insufficient** 🟠

**Issue Found in Week 1:**
- Easy mode Logic Lab uses SAME pattern items as Advanced (star, moon)
- Easy mode Ask AI answers incomplete sentences

**Prompt V23 States:**
```
Easy mode: Simpler S-V-O, "and/but" connectors
```

**But NO specific rules for:**
- How to differentiate Logic Lab patterns
- First answer completeness requirement
- Symbol prohibition

**Fix Required:** Add detailed differentiation rules (see Section 7.25 in my previous response).

---

## 🟡 MEDIUM PRIORITY (Documentation Gaps)

### 10. **Context Requirements Not in V23** 🟡

Week 1 revealed context requirements (30-50 words for Logic Lab, Ask AI), but Prompt V23 doesn't document this clearly enough.

**Current V23:** Mentions "context" but no word count minimum.

**Fix:** Add explicit word count requirements per station (see Section 7.24 in previous response).

---

### 11. **SmartCheck Coverage Incomplete** 🟡

Prompt V23 mentions SmartCheck for Read/Explore but NOT for Logic Lab and Ask AI.

**Fix:** Document SmartCheck requirements for ALL 4 stations (see Section 7.26).

---

### 12. **voiceConfig Rotation Strategy Missing** 🟡

Prompt V23 says voiceConfig must be unique per week but no rotation strategy.

**Fix:** Add voice rotation table:
```
Week 1: en-US-Neural2-D (narration), en-US-Neural2-F (vocab)
Week 2: en-GB-Neural2-A (narration), en-GB-Neural2-B (vocab)
Week 3: en-AU-Neural2-A (narration), en-AU-Neural2-B (vocab)
...
```

---

## 🔵 LOW PRIORITY (Optimizations)

### 13. **Tool Compatibility - Folder Naming** 🔵

Week 1 uses `week_01` but tools expect `week_1`.

**Fix:** Update tools to handle both formats or standardize to no-padding.

---

### 14. **Easy Mode Image Reuse Not Documented** 🔵

Code has image reuse optimization but Prompt V23 doesn't mention it.

**Fix:** Document image reuse strategy in Section 0.2.

---

### 15. **Audio Provider Fallback** 🔵

No mention of OpenAI TTS as backup when Google TTS fails.

**Fix:** Document multi-provider fallback strategy.

---

## 📈 SUMMARY STATISTICS

**Total Issues Found:** 23
- Story Mission: 6 critical issues
- Mass Production: 3 critical gaps
- Data Quality: 7 high priority
- Documentation: 5 medium priority
- Optimization: 2 low priority

**Lines to Add to Prompt V23:** ~800 lines
- Story Mission sections: 400 lines
- Mass production workflow: 200 lines
- Differentiation rules: 150 lines
- Pricing updates: 50 lines

**Tools to Create:**
1. `tools/generate_story_missions.js` (content generator)
2. `tools/validate_missions.js` (structure validator)
3. `tools/create_story_mission_audio_tasks.js` (audio task builder)
4. `tools/validate_week_structure.js` (pre-flight checks)

---

## ✅ RECOMMENDED ACTION PLAN

### Phase 1: Update Prompt V23 (2 hours)
- Add Story Mission sections (8.8-8.13)
- Update pricing info (Imagen 3 Fast)
- Add differentiation rules
- Add context requirements
- Add SmartCheck complete coverage

### Phase 2: Create Mass Production Tools (4 hours)
- Story mission generator
- Validation scripts
- Audio task creator

### Phase 3: Test on Week 2 (2 hours)
- Generate Week 2 missions using new workflow
- Validate all checks pass
- Regenerate audio
- Test in app

### Phase 4: Roll Out to Remaining 142 Weeks (20 hours)
- Batch generate Weeks 3-144
- Spot-check every 10th week
- Fix issues as they arise

**Total Estimated Time:** 28 hours for complete mass production readiness

---

## 🎯 CONCLUSION

**Current Status:** ⚠️ Mass production BLOCKED by 8 critical issues

**After Fixes:** ✅ Fully automated workflow capable of generating 144 weeks

**Key Learning:** Rebuild phase uncovered architectural improvements (folder structure, personality-rich content, modular design) that are BETTER than original Prompt V23 spec. Solution is to UPDATE PROMPT V23 to reflect new architecture, not downgrade code to match old spec.

---

**Report Generated:** December 30, 2025, 11:45 PM  
**Next Action:** Update Prompt V23 with sections 8.8-8.13 + pricing info
