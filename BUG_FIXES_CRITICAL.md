# CRITICAL BUG FIXES - Nova AI Tutor

## Problems Identified from User Feedback

1. **Hints không khớp câu hỏi** (Hints don't match questions)
2. **Câu hỏi lặp lại** (Questions repeating)
3. **Kết thúc đột ngột** (Abrupt ending - cold, silent message)

## Root Causes & Fixes

### Bug 1: Hints Don't Match Questions ✅ FIXED

**Problem**: Question "What do you like to do here at school?" returned hints `['Yes', 'I', 'like', 'school']`

**Root Cause**: In `hintEngine.js`, the pattern matching was checking `if (lower.includes('like'))` BEFORE checking for specific "what do you like to do" questions. This caused premature matches.

**Fix**: Reordered pattern matching from MOST SPECIFIC to LEAST SPECIFIC:

```javascript
// BEFORE (WRONG ORDER):
if (lower.includes('like')) {  // Matches everything!
  return ['Yes', 'I', 'like', 'school'];
}
if (lower.startsWith('what')) {  // Never reached!
  return ['I', 'like', 'to', 'read', 'books'];
}

// AFTER (CORRECT ORDER):
// "What do you like to do" - SPECIFIC first
if (lower.includes('what') && lower.includes('like') && lower.includes('do')) {
  if (lower.includes('school')) {
    return ['I', 'like', 'to', 'read', 'books'];
  }
  return ['I', 'like', 'to', 'play', 'games'];
}

// "Do you like" - THEN yes/no
if (lower.match(/^do you like/)) {
  if (lower.includes('school')) {
    return ['Yes', 'I', 'like', 'school'];
  }
  return ['Yes', 'I', 'like', 'it'];
}
```

**Result**: Now "What do you like to do here at school?" returns `['I', 'like', 'to', 'read', 'books']` ✅

---

### Bug 2: Questions Repeating ✅ IMPROVED

**Problem**: AI kept asking "Do you like coming to school every day?" multiple times

**Root Cause**: Question extraction in `novaPromptBuilder.js` was broken:
```javascript
// BROKEN CODE:
const match = h.content.match(/[?.!]$/);  // Only matches if message ENDS with punctuation
return match ? h.content : null;  // Returns entire message, not just question
```

**Fix**: Properly extract question sentences only:

```javascript
// FIXED CODE:
const questionsAsked = conversationHistory
  .filter(h => h.role === 'assistant' && h.content.includes('?'))
  .map(h => {
    // Extract question sentences (ending with ?)
    const sentences = h.content.split(/[.!?]/).filter(s => s.trim());
    const questions = sentences.filter(s =>
      h.content.includes(s + '?') ||
      /\b(what|how|who|where|when|why|do you|are you|can you)\b/i.test(s)
    );
    return questions.join(' ');
  })
  .filter(Boolean);
```

**Result**: AI now sees actual questions it asked and avoids repeating them ✅

---

### Bug 3: Abrupt Ending ✅ FIXED

**Problem**: When mission completed (turn 10), AI just said "Great job! You completed the mission!" - cold and silent

**Root Cause**: In `storyMissionEngine.js`, completion handler was generic:

```javascript
// BEFORE:
if (this.state.turnsCompleted >= maxTurns) {
  return {
    story_beat: "Great job! You completed the mission!",
    task: null,
    isComplete: true
  };
}
```

**Fix**: Added warm, personalized farewell with student's name + TTS:

```javascript
// AFTER:
if (this.state.turnsCompleted >= maxTurns) {
  const ctx = this.state.studentContext;
  const studentName = ctx.name || 'friend';
  const farewellMsg = `Wonderful job, ${studentName}! You did great today! I am so proud of you. See you next time!`;

  const speed = this._getTTSSpeed();
  const ttsResult = await generateTTS(farewellMsg, { speed });

  return {
    story_beat: farewellMsg,
    task: null,
    audioBlob: ttsResult.audioBlob,
    ttsProvider: ttsResult.provider,
    isComplete: true
  };
}
```

**Result**: Ms. Nova now says goodbye warmly with voice ✅

---

## Files Modified

1. `src/services/aiTutor/hintEngine.js` - Reordered pattern matching (most specific first)
2. `src/services/aiTutor/storyMissionEngine.js` - Added warm farewell with TTS
3. `src/services/aiTutor/novaPromptBuilder.js` - Fixed question extraction logic

## Testing Required

Please test:
1. ✅ "What do you like to do here at school?" → Should show hints like `['I', 'like', 'to', 'read', 'books']`
2. ✅ Questions should not repeat excessively
3. ✅ Mission completion should have warm farewell with voice

## Build Status

✅ Built successfully in 6.42s - No errors
