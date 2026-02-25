# ✅ STORY MISSION AI HALLUCINATION FIX - FEB 2, 2026

## ❌ VẤN ĐỀ NGƯỜI DÙNG BÁO CÁO

**Sau khi xóa cache:**
- Week 4 Mission 1: AI hỏi "What is in your living room?" ← Câu này Week 5!
- Week 6 Mission 1: AI hỏi "What color is your house?" ← Câu không tồn tại trong data!

**Root Cause:**
✅ Data files 100% correct (verified với test script)  
❌ AI đang **HALLUCINATE** (tự generate câu) thay vì follow `phase_questions.template`

## 🛠️ FIXES IMPLEMENTED

### Fix 1: Opening Narrative Enforcement ✅
**File:** `src/services/ai_tutor/tutorPrompts.js` line ~257

**What it does:**
- Khi `chatHistory.length === 0` (Turn 0), inject **OPENING NARRATIVE** với warning rõ ràng
- Force AI phải hỏi EXACTLY opening_narrative, không được tự tạo câu

**Code added:**
```javascript
${context.chatHistory.length === 0 && mission.opening_narrative ? `
🚨 FIRST TURN (Turn 0) - OPENING NARRATIVE 🚨
THIS IS THE VERY FIRST QUESTION - YOU MUST USE THE EXACT OPENING NARRATIVE:

⚠️ MANDATORY OPENING (ASK EXACTLY AS WRITTEN):
"${mission.opening_narrative}"

🎯 HINTS FOR OPENING:
[${mission.default_hints?.join(', ') || 'My, name, is'}]

❌ DO NOT ask any different question!
❌ DO NOT create your own question!
✅ ASK THE EXACT OPENING NARRATIVE ABOVE!
` : ''}
```

**Result:**
- Week 4 M1 Turn 0: MUST ask "What do I call you?" (not "What is in your living room?")
- Week 6 M1 Turn 0: MUST ask "What do I call you, young treasure hunter?" (not "What color is your house?")

---

### Fix 2: Strengthened Phase Question Templates ✅
**File:** `src/services/ai_tutor/tutorPrompts.js` line ~276

**What it does:**
- Add **CRITICAL INSTRUCTION** warnings to every phase question
- Make template mandatory with emoji emphasis
- Explicitly block custom questions

**Before:**
```javascript
return `${currentQuestion.template}
🎯 USE THESE EXACT HINTS in suggested_hints: [${currentQuestion.hints?.join(', ')}]`;
```

**After:**
```javascript
return `
⚠️ CRITICAL INSTRUCTION - YOU MUST ASK THIS EXACT QUESTION ⚠️
QUESTION TEMPLATE (MUST USE WORD-FOR-WORD):
"${currentQuestion.template}"

🎯 MANDATORY HINTS TO PROVIDE:
[${currentQuestion.hints?.join(', ')}]

❌ DO NOT CREATE YOUR OWN QUESTIONS
❌ DO NOT DEVIATE FROM THE TEMPLATE
❌ DO NOT USE VOCABULARY FROM OTHER WEEKS
✅ ASK THE EXACT QUESTION ABOVE
`;
```

**Result:**
- AI có ít space hơn để deviate
- Template được repeat với emphasis
- Explicit blocking của custom generation

---

### Fix 3: Week-Specific Vocabulary Restriction ✅
**File:** `src/services/ai_tutor/tutorPrompts.js` line ~313

**What it does:**
- Inject **STRICT VOCABULARY CONTROL** section
- List allowed words cho week hiện tại
- Explicitly FORBID words từ các week khác
- Special case cho Week 4 (block Week 5 words "living room")

**Code added:**
```javascript
📚 STRICT VOCABULARY CONTROL:
ALLOWED WORDS (WEEK ${mission.week_id} ONLY):
${mission.target_vocab?.join(', ')}

❌ DO NOT USE WORDS FROM OTHER WEEKS:
${mission.week_id === 4 ? '- Week 5: living room, bedroom, kitchen, bathroom ← FORBIDDEN IN WEEK 4' : ''}
${mission.week_id === 6 ? '- Week 4: happy, sad, excited, playing ← FORBIDDEN IN WEEK 6
- Week 5: living room, bedroom, bathroom ← FORBIDDEN IN WEEK 6' : ''}

✅ ONLY USE WEEK ${mission.week_id} VOCABULARY IN YOUR QUESTIONS!
```

**Result:**
- Week 4: Cannot use "living room", "bedroom", "kitchen" (Week 5 words)
- Week 6: Cannot use "happy", "sad" (Week 4) or "living room" (Week 5)
- Forces AI to stay within week vocabulary scope

---

## 🧪 TESTING STEPS

### Step 1: Clear Browser Cache ✅
```bash
Open: /Users/binhnguyen/Downloads/Engquest3k/clear_all_feb2_story_mission_fix.html
Click: STEP 1 → CLEAR ALL CACHE + STORAGE
```

### Step 2: Reload Server ✅
```bash
# Kill current dev server (Ctrl+C in terminal)
npm run dev

# Wait for "ready in XXX ms"
```

### Step 3: Hard Reload Browser ✅
```bash
# Open: clear_all_feb2_story_mission_fix.html
# Click: STEP 2 → HARD RELOAD
# Or manually: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
```

### Step 4: Test Week 4 Mission 1 ✅
**Expected behavior:**
```
Turn 1: "Hi! I'm Ms. Nova! 🌟 Look at my Happy Jar! 🏺 When I feel happy, 
         I put it in here! Today, let's make YOUR Happy Jar! What do I call you?"

Hints: [My, name, is, I, am] ← Scrambled display

❌ Should NOT ask: "What is in your living room?"
✅ Should ask: "What do I call you?"
```

### Step 5: Test Week 6 Mission 1 ✅
**Expected behavior:**
```
Turn 1: "Ahoy! I'm Captain Nova! I'm a treasure hunter! I have a treasure map 
         for your house! There are treasures hiding everywhere! Will you help me 
         find them? Say: Yes, Captain! Let's find the treasure!"

Hints: [Yes, Captain, find, treasure, help] ← Scrambled

❌ Should NOT ask: "What color is your house?"
✅ Should ask opening narrative → then "What do I call you, young treasure hunter?"
```

---

## 📊 VERIFICATION CHECKLIST

After testing, check Browser Console for:

✅ **Correct prompt injection:**
```
✅ PRIORITY 0 TRIGGERED - Ms. Nova character mode! (STRUCTURED with story_arc)

🚨 FIRST TURN (Turn 0) - OPENING NARRATIVE 🚨
MANDATORY OPENING: "Hi! I'm Ms. Nova!..."
```

✅ **No Week 5 contamination:**
```
📚 STRICT VOCABULARY CONTROL:
ALLOWED WORDS (WEEK 4 ONLY): happy, sad, funny, friendly, excited, playing, reading...
❌ DO NOT USE: living room, bedroom, kitchen, bathroom ← FORBIDDEN IN WEEK 4
```

✅ **Phase question enforcement:**
```
⚠️ CRITICAL INSTRUCTION - YOU MUST ASK THIS EXACT QUESTION ⚠️
QUESTION TEMPLATE: "What do I call you?"
```

❌ **If still wrong:**
- Screenshot console logs
- Check Network → Payload to Claude API
- Verify server reloaded with new code

---

## 🎯 FILES CHANGED

1. **src/services/ai_tutor/tutorPrompts.js**
   - Line ~257: Opening narrative enforcement
   - Line ~276: Strengthened phase question templates
   - Line ~313: Vocabulary restriction

2. **clear_all_feb2_story_mission_fix.html**
   - New cache clear tool with 2-step process

3. **BUG_DEBUG_STORY_MISSION_WRONG_QUESTIONS.md**
   - Debug guide (for reference)

4. **test_week4_week6_openings.js**
   - Data integrity verification script

---

## ✅ EXPECTED OUTCOME

**Week 4 Mission 1:**
- Turn 1: "What do I call you?" ✅
- Turn 2: "Do you know what a jar is?" ✅
- Turn 3: "Are you happy today?" ✅
- NO "living room" questions ❌

**Week 6 Mission 1:**
- Turn 1: "What do I call you, young treasure hunter?" ✅
- Turn 2: "Are you ready? Say: Yes, Captain!" ✅
- Turn 3: "Do you have a box at home?" ✅
- NO "What color is your house?" ❌

**Success Criteria:**
1. AI asks EXACT template questions (not custom ones)
2. Hints display correctly (scrambled)
3. No Week 5 vocabulary in Week 4/6
4. TTS pronounces "my/your" correctly (not spelling)

---

## 🔧 IF PROBLEM PERSISTS

**Scenario 1: AI still asks wrong questions**
→ Check console logs, verify prompt contains "🚨 FIRST TURN"
→ If yes: Claude API ignoring instructions (increase emphasis)
→ If no: Prompt builder not injecting correctly (check turnManager.js)

**Scenario 2: AI asks correct question but wrong hints**
→ Check if default_hints match opening_narrative
→ Verify hints array in phase_questions

**Scenario 3: Correct question but Week 5 vocab in response**
→ Vocabulary restriction not strong enough
→ Add more explicit blocks in mission_context

---

**STATUS:** 🟢 IMPLEMENTED - READY TO TEST  
**PRIORITY:** P0 - Critical fix  
**TESTING:** User must reload server + hard reload browser  
**ETA:** Should work immediately after reload
