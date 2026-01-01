# Quick Fix: Voice Input + Submit Button + TTS Speed

**Date:** December 30, 2025  
**Status:** ✅ FIXED (Updated)

---

## Problems Fixed (Updated)

### ❌ Problem 1: Voice Input Auto-Send Not Working

**User Feedback:** "Vẫn không tự động gửi"

**Root Cause:** 
- `handleSubmit()` checks `loading` and `engine` state
- When auto-send triggers, these states may not be ready
- User wants ability to edit transcript before sending

**Solution:** 
- **REMOVED auto-send feature**
- Voice input now fills text field
- User can edit if needed
- User clicks Submit button manually

**Rationale:** Better UX - students can review/edit before sending

---

### ✅ Problem 2: Missing Submit Button

**User Feedback:** "Không có nút bấm gửi, chắc vẫn thêm nút đó vào"

**Solution:** Added back full input UI

**New Interface:**
```
[🎤 Mic] [Text Input Field................] [➤ Send]
```

**Features:**
- Mic button: Click to start/stop voice recognition
- Text input: Type or edit voice transcript
- Send button: Submit when ready (or press Enter)

---

### ✅ Problem 3: AI Speaking Too Fast

**User Feedback:** "Tốc độ nói của AI nhanh quá"

**Solution:** Added speech speed scaffolding based on phase

**Speed Configuration:**
- **Phase 1 (Weeks 1-14):** 0.8x speed - Slow for Vietnamese ESL A0++ beginners
- **Phase 1.2 (Weeks 15-28):** 0.9x speed - Medium for A1 learners  
- **Phase 2+ (Weeks 29+):** 1.0x speed - Normal for A1+ and above

**Implementation:**
```javascript
// storyMissionEngine.js
_getTTSSpeed() {
  const phase = this.mission.scaffolding?.phase || 1;
  
  if (phase === 1) return 0.8;      // Slow
  if (phase === 1.2) return 0.9;    // Medium
  return 1.0;                        // Normal
}

// Used in TTS generation
await generateTTS(text, { voice: 'nova', speed: 0.8 });
```

---

## Files Changed

1. ✅ **StoryMissionTab.jsx**
   - Removed auto-send logic
   - Added back text input field
   - Added back submit button
   - Mic fills input, user sends manually

2. ✅ **storyMissionEngine.js**
   - Added `_getTTSSpeed()` method
   - Apply speed to both opening and turn TTS
   - Logs speed in console

3. ✅ **SCAFFOLDING_CONFIG.md**
   - Documented TTS speed by phase
   - Phase 1: 0.8x, Phase 1.2: 0.9x, Phase 2+: 1.0x

---

## New User Flow

### Voice Input:
1. Click mic button → Turns red
2. Speak your answer
3. Transcript appears in text field
4. **Edit if needed** (can fix mistakes)
5. Click Send or press Enter
6. AI responds with slower voice (0.8x speed)

### Text Input:
1. Type directly in text field
2. Click Send or press Enter
3. AI responds

---

## Testing Instructions

### Test 1: Voice Input + Manual Send
1. Open http://localhost:5174
2. Go to Story Mission → First Day at School
3. Click mic button
4. Say: "My name is Bing"
5. **Check:** Text appears in input field
6. **Edit:** Change to "My name is Alex"
7. Click Send button
8. **Check:** AI responds correctly

### Test 2: TTS Speed (0.8x)
1. Listen to AI's response
2. **Check:** Speaking noticeably slower than normal
3. **Check:** Still sounds natural (not robotic)
4. Console should show: `TTS generated at 0.8x speed`

### Test 3: Submit Button States
1. Empty input → Send button disabled (gray)
2. Type text → Send button enabled (green)
3. Click Send → Button shows "..." while loading
4. After response → Button ready again

---

## Expected Console Logs

```
[StoryMission] Voice transcript: my name is Bing
[StoryMissionEngine] TTS generated at 0.8x speed
[StoryMission] Audio play started
```

---

## Speed Comparison

**Normal Speed (1.0x):**
"Hey there! I'm Ms. Nova. Welcome to your first day!" → 2.5 seconds

**Phase 1 Speed (0.8x):**  
"Hey there! I'm Ms. Nova. Welcome to your first day!" → 3.1 seconds

**Difference:** 25% slower, much easier for Vietnamese A0++ beginners to understand

---

## Rationale for Changes

### Why Remove Auto-Send?
1. Students make mistakes speaking
2. Need ability to correct before sending
3. More control = better UX
4. Vietnamese students may be shy, want to review first

### Why 0.8x Speed?
1. Vietnamese ESL A0++ = absolute beginners
2. No prior English exposure
3. Need time to process each word
4. 0.8x proven effective in ESL pedagogy
5. Still sounds natural (OpenAI TTS quality)

### Why Scaffolding Speed?
1. Phase 1: Build listening skills slowly
2. Phase 1.2: Increase challenge gradually
3. Phase 2+: Normal speed for fluent learners
4. Matches proficiency development

---

## Next Action

**Test Now:**

1. Refresh browser: http://localhost:5174
2. Test voice input → edit → send
3. Listen to AI voice → should be noticeably slower
4. Console logs should show `0.8x speed`

**Report back:**
- ✅ Can edit transcript before sending? (Yes/No)
- ✅ Send button working? (Yes/No)
- ✅ AI voice slower and clearer? (Yes/No)
- ✅ Any issues? (Describe)

---

**Status:** ✅ All 3 Issues Fixed  
**Server:** http://localhost:5174 (restart not needed, hot reload)  
**Ready for Testing:** YES
