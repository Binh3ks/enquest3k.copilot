# PHASE 1 TESTING INSTRUCTIONS 🧪

## OBJECTIVE
Verify that Mission 1 now uses **objective-driven** conversation (natural) instead of **script-based** (robotic).

---

## PRE-TEST CHECKLIST

### 1. Clear Browser Cache & Storage
**Why**: Old code might be cached  
**How**:
```
1. Open http://localhost:5177/
2. Press F12 (DevTools)
3. Right-click Refresh button → "Empty Cache and Hard Reload"
OR
4. Application → Storage → Clear Site Data
```

### 2. Check Console for Startup Logs
Look for:
```
✅ "🎯 TurnManager: Objective-driven mode"
✅ "🎯 Objectives for Mission 1: LOADED (Objective-driven)"
❌ No red errors
❌ No "requestBody is not defined"
```

---

## TEST SCENARIO 1: Opening Turn (Turn 1)

### Steps:
1. Open http://localhost:5177/
2. Click "Story Mission" tab
3. Start Mission 1 "First Day at School"
4. **DO NOT TYPE YET** - Just observe first message

### Expected Behavior:
**AI Opening Message** should be:
```
Hello! I am Ms. Nova, your English teacher. What is your name?
```

**Console should show**:
```
🎯 TurnManager: Objective-driven mode
🎯 Building objective-driven prompt | Turn: 1 | Type: next_objective | Objective: greet
```

### ❌ FAIL if:
- AI says: "Great! Thank you! Are you a student?" (hardcoded response)
- Console shows: "🎯 TurnManager: Processing turn (legacy)"
- Red errors appear

---

## TEST SCENARIO 2: Natural Conversation (Turn 2-5)

### Steps:
1. Type your name: **"Binh"**
2. AI should ask about age
3. Type age: **"10"**
4. AI should ask if you're a student
5. Type: **"yes"**
6. AI should ask about school feelings

### Expected Behavior:

**Turn 2 (After "Binh")**:
```
AI: "Great! Your name is Binh! How old are you?"
     ↑ACK   ↑RECAST         ↑NATURAL QUESTION
```

**Console**:
```
🎯 Student answered → Mark objective complete: greet
🎯 Advanced to next objective: age
🎯 Building objective-driven prompt | Turn: 2 | Type: next_objective | Objective: age
```

**Turn 3 (After "10")**:
```
AI: "Nice! You are 10 years old! Are you a student?"
```

**Console**:
```
🎯 Student answered → Mark objective complete: age
🎯 Advanced to next objective: student_role
```

### ✅ PASS if:
- AI responses are NATURAL (varied phrasing)
- Console shows objective progression
- Each turn advances to next objective
- No hardcoded "Great! Thank you!" responses

### ❌ FAIL if:
- AI repeats exact same question every time
- AI says "Great! Thank you! Are you a student?" (ResponseGuard hardcode)
- Console shows errors

---

## TEST SCENARIO 3: Parking Mode (Student Question)

### Steps:
1. At any turn, ask AI a question: **"What is your name?"**
2. Observe AI response

### Expected Behavior:
```
AI: "Good question! I am Ms. Nova, your English teacher! Now, what about you? [Next objective question]"
     ↑ACK            ↑ANSWER STUDENT Q        ↑STEER BACK
```

**Console**:
```
🎯 Student asked question → Parking mode (stay at objective) [objective_id]
🎯 Building objective-driven prompt | Type: answer_and_steer | isParkingMode: true
```

### ✅ PASS if:
- AI answers your question
- AI steers back to current objective
- Objective index does NOT advance

### ❌ FAIL if:
- AI ignores your question
- AI advances to next objective anyway

---

## TEST SCENARIO 4: 15-Turn Hard Cap

### Steps:
1. Start Mission 1
2. Keep responding to AI (give any answer)
3. Count turns in console
4. Observe what happens at **Turn 15**

### Expected Behavior:

**Turn 15 Console**:
```
🎯 TurnManager: Processing turn 15 | Student question? false
🚨 Hard cap reached (15 turns) - forcing goodbye
🎯 Termination objective reached → DONE
```

**AI Final Message** (Around turn 15):
```
"Wonderful! You did great in our conversation! Great job, Binh!"
```

**mission_status**: `"complete"`

### ✅ PASS if:
- Conversation ends at turn 15 (no matter what objective)
- AI says goodbye warmly
- No infinite loop

### ❌ FAIL if:
- Conversation continues past turn 15
- AI keeps asking questions
- No goodbye

---

## TEST SCENARIO 5: Groq 400 Error (Bug Fix)

### Steps:
1. Monitor console for API calls
2. Look for Groq requests

### Expected Behavior:

**If Groq Works**:
```
✅ "🤖 Groq response received"
✅ No 400 errors
✅ Fast response (~1-2 seconds)
```

**If Groq Fails** (Acceptable):
```
⚠️ "🔍 Groq 400 Debug: { model: 'llama-3.1-70b-versatile', messagesCount: X, ... }"
✅ Fallback to OpenAI works
✅ Detailed error data shown (not "requestBody is not defined")
```

### ✅ PASS if:
- Either Groq works OR detailed 400 debug shown
- NO "ReferenceError: requestBody is not defined"
- Fallback works if Groq fails

### ❌ FAIL if:
- "ReferenceError: requestBody is not defined" appears
- No AI response at all

---

## TEST SCENARIO 6: Legacy Mode (Mission 2-6)

### Steps:
1. Start Mission 2 "What's in Your Backpack?"
2. Observe console and conversation

### Expected Behavior:

**Console**:
```
🎯 Objectives for Mission 2: LEGACY (Step-based)
🎯 TurnManager: Processing turn (legacy)
```

**AI Behavior**:
- Still uses old script-based questions
- Works as before (no breaking changes)

### ✅ PASS if:
- Mission 2-6 still work normally
- No errors
- Console shows "legacy" mode

### ❌ FAIL if:
- Mission 2-6 broken
- Errors appear

---

## DEBUGGING TIPS

### If AI is still robotic:
1. Check console for: `🎯 TurnManager: Objective-driven mode`
2. If missing → Check import path in StoryMissionTab.jsx
3. Verify `week1Objectives` is loaded: `console.log(week1Objectives)`

### If Groq 400 still happening:
1. Check console for: `🔍 Groq 400 Debug: {...}`
2. Look at `errorData` field
3. Possible issues:
   - API key invalid
   - Prompt too long
   - Rate limit hit

### If 15-turn cap not working:
1. Check console for: `🎯 TurnManager: Processing turn X`
2. Verify `turnCount` increments
3. At turn 15, should see: `🚨 Hard cap reached`

---

## SUCCESS CRITERIA

| Feature | Status | Notes |
|---------|--------|-------|
| Mission 1 uses objective-driven mode | ⏳ TEST | Check console logs |
| AI asks naturally (not robotic) | ⏳ TEST | Compare with old version |
| Parking mode works | ⏳ TEST | Ask AI a question |
| 15-turn cap enforced | ⏳ TEST | Continue past turn 15 |
| Groq 400 error fixed | ⏳ TEST | Check console |
| Mission 2-6 still work (legacy) | ⏳ TEST | Start Mission 2 |
| No console errors | ⏳ TEST | Check F12 console |

---

## REPORTING RESULTS

After testing, report:

### 1. What Worked ✅
- Example: "Mission 1 is natural, AI varied questions"

### 2. What Failed ❌
- Example: "Groq still 400, but fallback works"

### 3. Console Logs 📋
- Copy/paste key console messages
- Include any errors

### 4. Screenshots 📸
- AI conversation (show natural flow)
- Console logs (show objective progression)

---

## ROLLBACK IF NEEDED

If Phase 1 breaks everything:

```javascript
// In StoryMissionTab.jsx, line ~137:
const objectives = null; // Force legacy mode for all missions
```

This will disable objective-driven mode and revert to scripts.

---

## NEXT STEPS AFTER TESTING

### If All Tests Pass ✅:
- **Phase 2**: Add objectives for Mission 2-6
- **Phase 2**: Remove ResponseGuard hardcoding
- **Phase 2**: Add 15-turn warning UI

### If Some Tests Fail ⚠️:
- **Debug**: Fix specific issues
- **Re-test**: Verify fixes
- **Document**: Update known issues

---

**STATUS**: 🧪 READY FOR TESTING  
**TESTER**: User (Binh)  
**DURATION**: ~15 minutes  
**EXPECTED OUTCOME**: Mission 1 feels like talking to a real teacher, not a robot
