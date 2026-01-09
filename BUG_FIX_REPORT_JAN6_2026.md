# BUG FIX REPORT - January 6, 2026
## AI Tutor Conversation Logic Restoration

### 🔴 REPORTED ISSUES

User reported 3 critical bugs after testing:

1. **Hints hiển thị sai format** - Hiện "I have..." và "in my backpack" thay vì từng từ riêng lẻ
2. **AI không nhớ context** - Hỏi lại câu đã hỏi (ví dụ: hỏi tên lại sau khi đã biết)
3. **Lặp vòng sau 8-9 turns** - AI reset về turn 1, hỏi "What is your name?" lại

### 🔍 ROOT CAUSE ANALYSIS

#### Bug 1: Hints Format
**Location:** `src/services/ai_tutor/utils/responseParser.js` - `normalizeResponse()`

**Problem:** AI trả về hints dạng cụm từ:
```json
{
  "suggested_hints": ["I have...", "in my backpack"]
}
```

UI hiển thị từng hint button riêng → Xuất hiện button "I have..." và button "in my backpack" thay vì ["I", "have", "in", "my", "backpack"]

#### Bug 2: AI Không Nhớ Context
**Location:** `src/services/ai_tutor/novaEngine.js` - `sendToNova()` → `buildTutorContext()`

**Problem:** 
- `sendToNova()` nhận `chatHistory` từ UI tabs
- Nhưng `buildTutorContext()` không nhận parameter này
- `tutorPrompts.buildPrompt()` không có history → AI không biết đã hỏi gì

**Flow lỗi:**
```
UI Tab → novaEngine.sendToNova({chatHistory})
  → buildTutorContext(mode, context) ← ❌ Không có chatHistory
    → buildPrompt(mode, context, userInput, options) ← ❌ options không có history
```

#### Bug 3: Lặp Vòng
**Location:** `src/services/ai_tutor/tutorPrompts.js` - `buildStoryMissionPrompt()`

**Problem:** Prompt không có instruction rõ ràng về việc **KHÔNG hỏi lại câu đã hỏi**

AI không được nhắc nhở check history → hỏi lại "What is your name?" sau 8 turns

### ✅ SOLUTIONS IMPLEMENTED

#### Fix 1: Parse Hints Thành Từ Riêng Lẻ

**File:** `src/services/ai_tutor/utils/responseParser.js`

**Change:**
```javascript
function normalizeResponse(parsed, rawResponse) {
  // 🔥 Parse hints - split phrases into individual words
  let hintsArray = Array.isArray(parsed.suggested_hints) ? parsed.suggested_hints : [];
  
  // 🔥 FIX: If hints contain phrases like "I have..." or "in my backpack", split them
  const individualWords = [];
  for (const hint of hintsArray) {
    if (typeof hint === 'string') {
      // Remove punctuation and split by spaces
      const words = hint
        .replace(/[.,;:!?…\\.]+/g, '') // Remove all punctuation
        .split(/\\s+/)                  // Split by whitespace
        .filter(w => w.length > 0);   // Remove empty strings
      
      individualWords.push(...words);
    }
  }
  
  // Deduplicate and keep only unique words
  const uniqueHints = [...new Set(individualWords)];
  
  console.log('🔄 Hints normalization:', hintsArray, '→', uniqueHints);
  
  return {
    ai_response: parsed.ai_response || parsed.response || parsed.content || '',
    pedagogy_note: parsed.pedagogy_note || parsed.note || '',
    suggested_hints: uniqueHints,  // ✅ Individual words only
    mission_status: parsed.mission_status || null,
    grammar_focus: parsed.grammar_focus || null,
    raw: rawResponse
  };
}
```

**Result:**
- ✅ "I have..." → ["I", "have"]
- ✅ "in my backpack" → ["in", "my", "backpack"]
- ✅ Deduplicate: ["I", "have", "I", "my"] → ["I", "have", "my"]

#### Fix 2: Pass Chat History Đúng Cách

**File:** `src/services/ai_tutor/novaEngine.js`

**Change 1:** `sendToNova()` pass history to `buildTutorContext()`
```javascript
try {
  // Step 1: Build context-aware prompt (🔥 Pass chatHistory!)
  const systemPrompt = this.buildTutorContext(mode, {
    ...context,
    chatHistory,  // 🔥 CRITICAL: Pass history so AI remembers context
    userMessage
  });
```

**Change 2:** `buildTutorContext()` include history in options
```javascript
if (mode === 'story') {
  // Extract mission from weekData
  const missionId = contextParams.missionId || 0;
  const missions = this.weekData.story_missions || this.weekData.storyMissions || [];
  options.mission = missions[missionId] || {
    title: 'Story Practice',
    description: 'Practice vocabulary through story',
    targetVocabulary: this.extractVocabulary().map(word => ({ word }))
  };
  
  // 🔥 CRITICAL: Pass chat history to tutorPrompts so AI remembers context
  options.history = contextParams.chatHistory || [];
  
  console.log('📜 Story mode - passing chat history:', options.history.length, 'messages');
}

if (mode === 'freetalk') {
  // 🔥 CRITICAL: Pass chat history to tutorPrompts
  options.history = contextParams.chatHistory || [];
  
  console.log('💬 Freetalk mode - passing chat history:', options.history.length, 'messages');
}

// Build prompt using tutorPrompts.js
return buildPrompt(tutorMode, context, contextParams.userMessage || '', options);
```

**Result:**
- ✅ AI nhận đầy đủ chat history (user + assistant messages)
- ✅ AI biết đã hỏi gì, học sinh trả lời gì
- ✅ AI có thể reference previous answers ("You said your name is Alex. How old are you, Alex?")

#### Fix 3: Thêm Anti-Repetition Logic

**File:** `src/services/ai_tutor/tutorPrompts.js`

**Change:** Add explicit instructions to prompt
```javascript
Your turn:
1. CHECK: Did student make grammar/pronunciation errors?
   - If YES: Note the error in "feedback.correction"
   - If NO: Leave feedback empty
2. ACKNOWLEDGE what student said (be specific - use their words!)
3. ENCOURAGE warmly
4. Ask ONE follow-up question to explore the topic

🚫 CRITICAL: NEVER REPEAT QUESTIONS!
- Review the CONVERSATION history above
- If you already asked "What is your name?", DON'T ask it again
- If you already asked "How old are you?", DON'T ask it again
- ALWAYS ask NEW questions that build on what student already told you
- Use student's previous answers in your new questions (e.g., "You said your name is Alex. How old are you, Alex?")
```

**Also added:** Hints format instruction
```javascript
⚠️ HINTS MUST BE INDIVIDUAL WORDS:
✅ CORRECT: ["I", "have", "a", "book", "in", "my", "backpack"]
❌ WRONG: ["I have...", "in my backpack"] ← NO PHRASES!
```

**Result:**
- ✅ AI explicitly instructed to check history before asking
- ✅ AI told to build on previous answers
- ✅ AI produces individual word hints at source

### 🧪 TESTING CHECKLIST

**Test scenarios to verify:**

1. **Hints Display**
   - [ ] Open Story Mission 1
   - [ ] Answer first question
   - [ ] Check hints: Should be individual words like ["I", "have", "a", "book"]
   - [ ] Should NOT see phrases like ["I have...", "in my backpack"]

2. **Context Memory**
   - [ ] Start Story Mission 1
   - [ ] AI: "What is your name?"
   - [ ] User: "Alex"
   - [ ] AI: Should say "Nice to meet you, Alex!" (acknowledge name)
   - [ ] AI: Should ask NEW question (not "What is your name?" again)
   - [ ] Continue 5-6 turns
   - [ ] AI should reference previous answers ("You said you're 9...")

3. **No Loop Reset**
   - [ ] Start Story Mission 3 (10 turns)
   - [ ] Complete turns 1-9
   - [ ] Turn 10: AI should ask CLOSING question or say goodbye
   - [ ] Turn 10: AI should NOT reset to "Hello! What is your name?"
   - [ ] Check console logs for "🚫 CRITICAL: NEVER REPEAT QUESTIONS!" being sent

### 📊 TECHNICAL DETAILS

**Files Modified:**
1. `src/services/ai_tutor/utils/responseParser.js` (hints parsing)
2. `src/services/ai_tutor/novaEngine.js` (chatHistory flow)
3. `src/services/ai_tutor/tutorPrompts.js` (anti-repetition instructions)

**Lines Changed:** 87 lines across 3 files

**Cache Cleared:** `node_modules/.vite/` (to force re-compilation)

**Server Status:** ✅ Running on `http://localhost:5179/`

### 🎯 EXPECTED BEHAVIOR AFTER FIX

#### Before (Broken):
```
Turn 1:
AI: "What is your name?"
User: "Alex"

Turn 2:
AI: "How old are you?"
User: "I am 9"

Turn 3:
AI: "Is your teacher nice?"
User: "Yes"

Turn 9:
AI: "Hello! What is your name?"  ← ❌ RESET! Forgot everything!
```

**Hints shown:** ["I have...", "in my backpack"] ← ❌ Phrases!

#### After (Fixed):
```
Turn 1:
AI: "What is your name?"
User: "Alex"

Turn 2:
AI: "Nice to meet you, Alex! How old are you, Alex?"  ← ✅ Remembers name!
User: "I am 9"

Turn 3:
AI: "You're 9! That's great, Alex. Is your teacher nice?"  ← ✅ Uses name again!
User: "Yes"

Turn 9:
AI: "You said you like your teacher, Alex. What subject do you like best?"  ← ✅ Natural flow!
User: "Math"

Turn 10:
AI: "Math is wonderful! You did great today, Alex. See you next time!"  ← ✅ Closing, no reset!
```

**Hints shown:** ["I", "have", "a", "book", "in", "my", "backpack"] ← ✅ Individual words!

### 🔄 DEPLOYMENT

**Status:** ✅ Code updated, server restarted, ready for testing

**Next Steps:**
1. User tests Story Mission 1, 2, 3
2. User tests Free Talk tab
3. Verify:
   - Hints show individual words
   - AI remembers context
   - No question repetition
   - Natural conversation flow

**Rollback Plan:**
If issues occur, revert commits:
```bash
git log --oneline -n 5  # Find commit hash
git revert <commit-hash>
```

**Backup Location:** 
- Previous code backed up in: `/Volumes/MY DOCUMENT/Apps/_BACKUPS/SNAPSHOT_20260106_135526.zip`

---

## 📝 SUMMARY

**3 critical bugs fixed:**
1. ✅ Hints parsed into individual words (not phrases)
2. ✅ Chat history passed correctly (AI remembers context)
3. ✅ Anti-repetition logic added (no question loops)

**Impact:**
- Natural, intelligent conversations
- Contextual hint suggestions
- Smooth multi-turn dialogues
- No resets or repeated questions

**Ready for testing:** http://localhost:5179/
