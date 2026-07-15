# 🔍 STORY MISSION WRONG QUESTIONS DEBUG - FEB 2, 2026

## ❌ VẤN ĐỀ PHÁT HIỆN

**User báo cáo SAU KHI XÓA CACHE:**
- Week 4 Mission 1: AI hỏi "What is in your living room?" (Turn 1)
- Week 6 Mission 1: AI hỏi "What color is your house?" (Turn 1)

**Data file verification:**
✅ Week 4 M1 opening: "What do I call you?"  
✅ Week 6 M1 opening: "What do I call you, young treasure hunter?"  
✅ Không có "living room" trong Week 4 data  
✅ Không có "What color is your house" trong Week 6 data

## 🔬 ROOT CAUSE ANALYSIS

### ❌ KHÔNG PHẢI Cache Issue
- User đã clear cache → vẫn sai
- Data files verified 100% correct
- Vậy vấn đề là **AI generation logic**

### 🎯 POSSIBLE CAUSES

#### 1. **AI Hallucination (Most Likely)**
AI đang **TỰ GENERATE câu hỏi** thay vì follow `phase_questions.template`:
- Có thể prompt KHÔNG inject `phase_questions` đủ rõ ràng
- Có thể AI ignore `🎯 NEXT QUESTION TO ASK:` section
- Có thể có conflict giữa `mission_context` và `phase_questions`

#### 2. **Turn Counting Error**
AI đang count sai turns → jump phase sớm:
- `chatHistory.length / 2` có thể tính sai
- AI có thể đang đếm cả system messages
- Phase transition logic có thể trigger sớm

#### 3. **Accumulative Vocab Contamination**
Week 5 vocab (living room, bedroom) đang leak vào Week 4:
- `gamePromptBuilder.js` inject Week 1-5 vocab cho Week 4
- AI thấy "living room" trong vocab list → tự hỏi
- **CHÚ Ý:** gamePromptBuilder CHỈ cho GAME mode, KHÔNG phải Story Mission

#### 4. **Wrong Mission Loading**
App đang load sai mission:
- Có thể Week 4 component đang load Week 5 data
- Có thể có cache ở component level (React state)
- Có thể có mixup trong mission routing

## 🔧 DEBUG STEPS USER CẦN LÀM

### Step 1: Check Browser Console Logs
**Open DevTools → Console, search for:**

```
"PRIORITY 0 TRIGGERED"
"NEXT QUESTION TO ASK"
"Story Arc Phases"
```

**Expected output (Week 4 M1):**
```
✅ PRIORITY 0 TRIGGERED - Ms. Nova character mode! (STRUCTURED with story_arc)

🎯 NEXT QUESTION TO ASK:
What do I call you?
🎯 USE THESE EXACT HINTS in suggested_hints: [My, name, is, I, am]
```

**If AI receives wrong prompt → PROMPT INJECTION BUG**

### Step 2: Check Network Request to Claude API
**DevTools → Network → Filter "claude" or "anthropic":**

1. Click on AI request
2. Go to "Payload" tab
3. Check `messages[].content`
4. Verify it contains:
   ```
   NEXT QUESTION TO ASK: What do I call you?
   ```

**If prompt is correct but AI responds wrong → CLAUDE API ISSUE**

### Step 3: Test Incognito Mode
**Completely fresh browser state:**
- Open browser in Incognito/Private mode
- Navigate to localhost:5174
- Test Week 4 M1 from scratch
- If STILL wrong → NOT a state/cache issue

### Step 4: Check Mission ID
**Console log when clicking Week 4 M1:**
```javascript
console.log('Loading mission:', { weekId, missionId, mission: currentMission });
```

**Expected:**
```
weekId: 4
missionId: 1
mission.title: "The Happy Jar"
mission.opening_narrative: "Hi! I'm Ms. Nova!..."
```

**If wrong → ROUTING/LOADING BUG**

## 🛠️ POSSIBLE FIXES

### Fix 1: Strengthen Phase Question Injection
**File:** `src/services/ai_tutor/tutorPrompts.js`

**Current (line 265-270):**
```javascript
if (currentQuestion && typeof currentQuestion === 'object' && currentQuestion.template) {
  // NEW SYSTEM: phase_questions as objects with template + hints
  return `${currentQuestion.template}
🎯 USE THESE EXACT HINTS in suggested_hints: [${currentQuestion.hints?.join(', ') || 'none'}]`;
}
```

**Enhanced:**
```javascript
if (currentQuestion && typeof currentQuestion === 'object' && currentQuestion.template) {
  return `
⚠️ CRITICAL INSTRUCTION - YOU MUST ASK THIS EXACT QUESTION ⚠️
QUESTION TEMPLATE (MUST USE WORD-FOR-WORD):
"${currentQuestion.template}"

🎯 MANDATORY HINTS TO PROVIDE:
[${currentQuestion.hints?.join(', ')}]

❌ DO NOT CREATE YOUR OWN QUESTIONS
❌ DO NOT DEVIATE FROM THE TEMPLATE
✅ ASK THE EXACT QUESTION ABOVE
`;
}
```

### Fix 2: Add Opening Narrative Enforcement
**File:** `src/services/ai_tutor/tutorPrompts.js`

**Add BEFORE story_arc section:**
```javascript
${context.chatHistory.length === 0 ? `
🚨 FIRST TURN - OPENING NARRATIVE 🚨
THIS IS TURN 0 (ZERO) - YOU MUST USE THE EXACT OPENING NARRATIVE:

MANDATORY OPENING:
"${mission.opening_narrative}"

🎯 HINTS FOR OPENING:
[${mission.default_hints?.join(', ') || 'My, name, is'}]

⚠️ DO NOT ask any other question for Turn 1!
⚠️ ASK THE EXACT OPENING NARRATIVE ABOVE!
` : ''}
```

### Fix 3: Block Accumulative Vocab for Story Missions
**File:** `src/services/ai_tutor/tutorPrompts.js`

**Add vocabulary restriction:**
```javascript
📚 STRICT VOCABULARY CONTROL:
ALLOWED WORDS (WEEK ${mission.week_id} ONLY):
${mission.target_vocab?.join(', ')}

❌ DO NOT USE WORDS FROM OTHER WEEKS:
- Week 5: living room, bedroom, kitchen, bathroom ← FORBIDDEN
- Week 6: box, desk, treasure ← ${mission.week_id !== 6 ? 'FORBIDDEN' : 'ALLOWED'}
- Week 7: backpack, pen, ruler ← ${mission.week_id !== 7 ? 'FORBIDDEN' : 'ALLOWED'}

✅ ONLY USE WEEK ${mission.week_id} VOCABULARY IN YOUR QUESTIONS!
```

### Fix 4: Add Mission ID Verification
**File:** `src/modules/ai_tutor/tabs/StoryMissionTab.jsx`

**Before sending message:**
```javascript
console.log('🔍 MISSION VERIFICATION:', {
  weekId: currentWeek,
  missionId: currentMission.mission_id,
  title: currentMission.title,
  opening: currentMission.opening_narrative?.substring(0, 50),
  firstQuestion: currentMission.story_arc?.[0]?.phase_questions?.[0]?.template
});
```

## 📊 NEXT STEPS

### Priority 1: DEBUG (User làm ngay)
1. Open DevTools Console
2. Play Week 4 M1, check logs for:
   - ✅ "What do I call you?" in prompt?
   - ❌ "What is in your living room?" từ đâu ra?
3. Screenshot console logs → send to dev

### Priority 2: TEMPORARY WORKAROUND
Nếu AI vẫn hallucinate, **increase prompt weight**:
- Add "MANDATORY" keywords
- Use emoji warnings (🚨 ⚠️ ❌)
- Repeat critical instructions 3 times

### Priority 3: LONG-TERM FIX
- Migrate to **JSON-only response mode** (no natural generation)
- Force AI to return `{question, hints}` object
- Frontend renders template directly (AI can't deviate)

## 🎓 DEVELOPER NOTES

**Why "living room" appears in Week 4:**
1. gamePromptBuilder.js has accumulative vocab (Week 1-5)
2. BUT this is ONLY for games, NOT Story Missions
3. Story Missions should ONLY use `target_vocab` from that week
4. Likely cause: AI sees too much context, generates its own question

**Why clear cache didn't fix:**
- Cache clears browser localStorage
- But AI generation happens SERVER-SIDE (Claude API)
- If prompt is wrong, cache won't help
- Need to fix prompt injection logic

**Test case that should NEVER happen:**
```javascript
// Week 4 Mission 1 should NEVER ask:
"What is in your living room?" ← Week 5 vocab
"Where is the treasure?" ← Week 6 vocab
"Do you have a backpack?" ← Week 7 vocab

// Should ONLY ask:
"What do I call you?" ← First question
"Are you happy today?" ← Week 4 emotions
"Do you like playing?" ← Week 4 activities
```

---

**STATUS:** NEEDS USER DEBUG LOGS TO PROCEED
**PRIORITY:** P0 - Blocking Week 4/6 testing
**ETA:** Can fix in 30 mins after receiving console logs
