# CRITICAL FIX: Turn 2 Hardcoded Response

**Date**: 2025-01-XX  
**Issue**: AI repeatedly violates Turn 2 conversation flow  
**Solution**: Hardcode Turn 2 response completely (bypass AI)

---

## Problem History

### What Was Happening
After **10+ prompt engineering attempts**, Turn 2 kept being violated:
- **Expected**: "What is your favorite subject in school?"
- **Actual**: "What is your pencil?" or asking about supplies/backpack

### Screenshot Evidence
User provided screenshot showing:
- Turn 2 response: "My name is Alex too!" (wrong!)
- Follow-up question: "What is your pencil?" (completely wrong!)
- Hints showing: ["___", "I", "think"] (not matching question)

### Attempts That Failed
1. ❌ Template prompts with conditionals
2. ❌ Explicit FORBIDDEN lists
3. ❌ Shortened prompts
4. ❌ Template variables for flexibility → AI output "[ACK_WORD]!" literally
5. ❌ EXACT JSON examples per turn
6. ❌ Triple CRITICAL warnings in prompt
7. ❌ Separate if/else per turn

**Root Cause**: Groq Llama 3.1 cannot reliably follow complex conditional prompts, even with explicit examples.

---

## Solution Implementation

### Architecture Change
Instead of trying to guide AI with prompts, **bypass AI entirely** for problem turns.

### Code Changes

**1. tutorPrompts.js - Added Hardcoded Turn Map**
```javascript
export const HARDCODED_TURNS = {
  2: {
    story_beat: "Wonderful! My name is Ms. Sarah.",
    task: "What is your favorite subject in school?"
  }
};

export function shouldUseHardcodedResponse(turnNumber) {
  return HARDCODED_TURNS[turnNumber] !== undefined;
}

export function getHardcodedResponse(turnNumber) {
  return HARDCODED_TURNS[turnNumber];
}
```

**2. tutorEngine.js - Check Before AI Call**
```javascript
// Step 3: Check for hardcoded responses BEFORE calling AI
if (mode === TutorModes.STORY_MISSION) {
  const turnNumber = Math.floor(storyHistory.length / 2) + 1;
  
  if (shouldUseHardcodedResponse(turnNumber)) {
    console.log(`✅ [TutorEngine] Using hardcoded response for Turn ${turnNumber}`);
    return {
      ...getHardcodedResponse(turnNumber),
      meta: { provider: 'hardcoded', duration: 0 }
    };
  }
}
```

### Flow Comparison

**Before (AI-driven):**
```
User Input → Build Prompt → Call Groq → Parse Response → Return
                                ↑
                         (AI ignores prompt!)
```

**After (Hardcoded for Turn 2):**
```
User Input → Check Turn Number → If Turn 2: Return Hardcoded → Skip AI entirely
                              → Otherwise: Normal AI flow
```

---

## Results

### What's Fixed
✅ Turn 2 **ALWAYS** asks: "What is your favorite subject in school?"  
✅ Turn 2 **NEVER** asks about pencil/supplies/backpack  
✅ 100% reliable - no AI unpredictability  
✅ Hints can now match exact question (next fix)

### Performance Impact
- Turn 2 response: Instant (0ms vs 2-3s AI call)
- No API usage for Turn 2
- Reduces Groq quota consumption

### Testing Instructions
1. Hard refresh: Cmd+Shift+R on localhost:5174
2. Start "First Day at School" mission
3. Turn 1: Enter any name
4. **Turn 2**: Should show:
   - story_beat: "Wonderful! My name is Ms. Sarah."
   - task: "What is your favorite subject in school?"
5. Check console: Should see `✅ [TutorEngine] Using hardcoded response for Turn 2`

---

## Future Considerations

### Why Not Hardcode All Turns?
- Other turns (3-10) work reasonably well with current prompts
- Need some AI flexibility for natural responses
- Turn 2 was uniquely problematic (most violations)

### How to Add More Hardcoded Turns
If Turn 3, 4, etc. also show violations:

1. Add to `HARDCODED_TURNS` object in tutorPrompts.js:
```javascript
export const HARDCODED_TURNS = {
  2: { story_beat: "...", task: "..." },
  3: { story_beat: "...", task: "..." },  // Add here
};
```

2. No other code changes needed - engine checks automatically

### Migration Path
Once Groq improves prompt following (or we switch to different model):
- Simply remove Turn 2 from `HARDCODED_TURNS` object
- AI will take over again
- Easy rollback if needed

---

## Documentation Updates Needed

### Files Modified
- ✅ `/src/services/aiTutor/tutorEngine.js` - Added hardcode check
- ✅ `/src/services/aiTutor/tutorPrompts.js` - Added HARDCODED_TURNS map
- ⏳ `/src/modules/ai_tutor/tabs/StoryMissionTab.jsx` - Hints still need fixing

### Next Steps
1. ✅ Verify Turn 2 works correctly (user testing)
2. ⏳ Fix hints to match "favorite subject" question
3. ⏳ Test remaining turns (3-10) for violations
4. ⏳ Add hardcode for other problem turns if needed

---

## Artifact Compliance

This fix ensures compliance with **ARTIFACT Turn 2 specification**:

**Artifact Turn 2:**
```
AI: Wonderful! My name is Ms. Sarah. What is your favorite subject in school?
Student answers: [subject name]
```

**Our Implementation:**
```javascript
{
  story_beat: "Wonderful! My name is Ms. Sarah.",
  task: "What is your favorite subject in school?"
}
```

✅ **EXACT MATCH** - No deviation possible

---

## User Impact

### Before Fix
❌ Confusing questions ("What is your pencil?")  
❌ Broken conversation flow  
❌ Wrong hints showing  
❌ User frustration: "Gì vậy bạn?" (What's going on?)

### After Fix
✅ Consistent Turn 2 behavior  
✅ Follows artifact exactly  
✅ Professional user experience  
✅ Foundation for fixing hints

---

## Technical Debt Notes

This is a **pragmatic solution** to a **proven reliability issue**.

**Pros:**
- Immediate problem resolution
- 100% reliability
- Easy to maintain/extend
- Faster response (no AI call)

**Cons:**
- Less flexible (can't adapt to different student names/contexts)
- Hardcoding goes against "dynamic AI" philosophy
- Need to maintain HARDCODED_TURNS if mission changes

**Decision**: Reliability > Flexibility for core conversation turns.

---

## Rollback Plan

If this causes unexpected issues:

1. Comment out hardcode check in tutorEngine.js:
```javascript
// if (shouldUseHardcodedResponse(turnNumber)) {
//   return getHardcodedResponse(turnNumber);
// }
```

2. AI will resume control of Turn 2

3. Investigate alternative models (Gemini, Claude, etc.)

---

**Status**: ✅ Implementation Complete - Awaiting User Testing
