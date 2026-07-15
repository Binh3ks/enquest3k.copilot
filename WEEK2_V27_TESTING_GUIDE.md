# Week 2 AI Tutor - V27 Testing Guide

## What Has Been Fixed

The following components have been updated to properly support Master Prompt V27 format:

1. ✅ **Data Layer:** week_02_real.js now has V27 structure (story_missions with turns array)
2. ✅ **Prompt Generation:** tutorPrompts.js detects V27 format and uses buildV27StoryPrompt
3. ✅ **Response Parsing:** responseParser.js handles teacher_ack, teacher_recast, etc.
4. ✅ **Context Passing:** novaEngine.js passes weekData so V27 detection works

## Expected Behavior - Week 2 Story Mission

### Opening Turn (Turn 1)
**URL:** http://localhost:5173/week/2/ai-tutor

**Console Output Should Show:**
```
✨ V27 FORMAT DETECTED - Using buildV27StoryPrompt
🎯 V27 FORMAT DETECTED
```

**Expected Response:**
- Teacher ACK: "" (empty - student hasn't spoken)
- Teacher Recast: "" (empty)
- Teacher Encouragement: "" (empty - just greet)
- Teacher Question: "Hello! I am Ms. Nova, your English teacher. Tell me about your family. Who is in your family?"
- Hints: ["I", "have", "my", "family", "mother", "father"]
- Current Turn: 1/15
- Mission Status: "in_progress"

### Middle Turns (Turns 2-14)
**Expected Response When Student Speaks:**
- Teacher ACK: "Wonderful!" (1-3 words)
- Teacher Recast: "[Student's answer rephrased warmly]"
- Teacher Encouragement: "[Optional encouragement - 1 sentence]"
- Teacher Question: "[Next step question from mission.turns[n].step]"
- Hints: [5-6 words matching the new question]
- Current Turn: 2/15, 3/15, etc.

### Closing Turn (Turn 15)
**Expected Response:**
- Teacher ACK: "Excellent!"
- Teacher Recast: "You completed all 15 turns about your family!"
- Teacher Encouragement: "Great job!"
- Teacher Question: "Great job, [StudentName]!" (No new question)
- Hints: []
- Mission Status: "complete"

## Mission Content - Week 2

### Mission 1: "Tell Me About Your Family"
- **Focus:** Family members, relationships, descriptions
- **Opening Question:** "Tell me about your family. Who is in your family?"
- **Expected Topics:**
  - Who is in your family?
  - How many people in your family?
  - Do you have brothers or sisters?
  - What does your mother do?
  - What does your father do?
  - Where does your family live?

### Mission 2: "My Mother's Day"  
- **Focus:** Mother, daily routines, feelings, appreciation
- **Opening Question:** "Tell me about your mother's day. What does your mother do?"
- **Expected Topics:**
  - Mother's occupations
  - Daily activities
  - What mother likes
  - How student helps mother
  - Family time together

### Mission 3: "My Father's Strength"
- **Focus:** Father, characteristics, strength, activities, family role
- **Opening Question:** "Tell me about your father. What is your father like?"
- **Expected Topics:**
  - Father's characteristics
  - Father's occupation
  - Father's hobbies
  - Activities with father
  - What student likes about father

## Testing Steps

### Step 1: Start Mission 1
1. Open http://localhost:5173/week/2/ai-tutor
2. Click "Mission 1: Tell Me About Your Family"
3. Open Browser DevTools (F12) → Console
4. Look for: `✨ V27 FORMAT DETECTED`

### Step 2: Check Opening Turn
1. First message should be Teacher asking about family
2. Should NOT ask about backpack, school, or teacher
3. Hints should be 6 words: I, have, my, family, mother, father

### Step 3: Answer and Continue
1. Type: "I have a mother and a father" (or similar)
2. Check response:
   - Starts with ACK (e.g., "Wonderful!")
   - Then RECAST (your answer rephrased)
   - Then NEW QUESTION (next step)
   - Hints match the new question
   - Turn counter shows 2/15

### Step 4: Complete Mission 1
1. Continue through turns 3-14
2. Each response should follow ACK+RECAST+QUESTION formula
3. Turn 15 should say "You completed all 15 turns!"
4. Mission Status should change to "complete"

### Step 5: Start Mission 2
1. Click "Mission 2: My Mother's Day"
2. Verify opening question is about mother (NOT family)
3. Questions should be mother-focused throughout
4. Verify no cross-mission contamination

### Step 6: Start Mission 3  
1. Click "Mission 3: My Father's Strength"
2. Verify opening question is about father (NOT family or mother)
3. Questions should be father-focused throughout

## Expected Console Outputs

### Success Indicators:
```
✨ V27 FORMAT DETECTED - Using buildV27StoryPrompt
🎯 V27 FORMAT DETECTED
✅ V27 format check added to responseParser
```

### Debug Information:
```
🎯 Building objective-driven prompt | Turn: 1 | Type: continue
✨ V27 FORMAT DETECTED
🔄 Hints normalization: [...] → [...]
```

## If Something Goes Wrong

### Issue: Response shows old format (ack field instead of teacher_ack)
- **Cause:** V27 format detection not working
- **Check:** Browser console for `✨ V27 FORMAT DETECTED`
- **Debug:** Run `node /tmp/test_v27_integration.js`

### Issue: Questions ask about wrong topics (backpack in Mission 1)
- **Cause:** V27 prompt builder not being called
- **Check:** File `/src/services/ai_tutor/prompts/storyInstructionsV27.js` exists
- **Check:** tutorPrompts.js line ~470 has `if (isV27Format(weekData))`

### Issue: Browser shows "Cannot find module" error
- **Cause:** Syntax error in V27 integration
- **Fix:** Run `npm run lint` to check for errors
- **Check:** Scroll down for actual error message

### Issue: Turn counter wrong or hints not appearing
- **Cause:** responseParser not properly normalizing V27 response
- **Check:** Browser console for `✅ V27 FORMAT DETECTED` in responseParser
- **Fix:** Verify responseParser.js has V27 detection code inserted

## Quick Verification Checklist

- [ ] Dev server running at localhost:5173
- [ ] Week 2 AI Tutor page loads without errors
- [ ] Console shows "✨ V27 FORMAT DETECTED"
- [ ] Mission 1 opening asks about family (not backpack)
- [ ] Response includes ACK+RECAST+QUESTION
- [ ] Turn counter shows 1/15, 2/15, etc.
- [ ] Mission 2 opening asks about mother (not family)
- [ ] Mission 3 opening asks about father (not mother)
- [ ] Turn 15 shows "complete" status
- [ ] No duplicate questions within mission

## Browser DevTools Commands

```javascript
// Check if V27 functions loaded
typeof isV27Format  // Should be 'function'

// Check if tutorPrompts module loaded
typeof buildPrompt  // Should be 'function'

// Check if storyInstructionsV27 loaded
typeof buildV27StoryPrompt  // Should be 'function'
```

---

**Target:** Full Week 2 functionality with V27 prompt format and ACK+RECAST formula
**Status:** Implementation Complete - Ready for Testing ✨
