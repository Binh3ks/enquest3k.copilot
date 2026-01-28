# 🔥 CRITICAL FIXES QUICK REFERENCE - Week Production (Jan 27, 2026)

## ⚠️ 4 Lỗi Nghiêm Trọng Đã Fix - TRÁNH Trong Production Tuần Sau

### 1. **20 Questions Objects = PHYSICAL ITEMS ONLY**

**❌ SAI (Week 4):**
```javascript
objects: ['happy', 'sad', 'excited', 'playing', 'reading', 'drawing']
// → AI hỏi: "It is about fun" / "Is it a feeling?" ❌
```

**✅ ĐÚNG:**
```javascript
objects: ['jar', 'book', 'pencil', 'paper', 'picture', 'crayon', 'game', 'toy']
// → AI hỏi: "Is it on the desk?" / "Can you write with it?" ✅
```

**Rule:**
- ✅ Physical objects: chair, book, pen, box, door, window
- ❌ Abstract: happy, sad, playing, reading, big, small

---

### 2. **Roleplay Scenarios MUST Have title_en + title_vi**

**❌ SAI (Week 5):**
```javascript
roleplay_scenarios: [
  {
    id: "rp_designer",
    title: "Room Designer 🎨",  // ← Only this
    emoji: "🎨"
    // Missing: title_en, title_vi ❌
  }
]
// → UI không hiển thị tên roleplay!
```

**✅ ĐÚNG:**
```javascript
roleplay_scenarios: [
  {
    id: "rp_designer",
    title: "Room Designer 🎨",
    title_en: "Room Designer",       // ✅ REQUIRED
    title_vi: "Thiết kế phòng",     // ✅ REQUIRED
    emoji: "🎨"
  }
]
```

**Rule:**
- Every roleplay MUST have: `title`, `title_en`, `title_vi`

---

### 3. **Week Data Property = week_id (snake_case)**

**❌ SAI:**
- Code đọc `weekData.weekId` (camelCase)
- Week files dùng `week_id` (snake_case)
- → Games fallback về Week 5 vocab! ❌

**✅ ĐÚNG:**
```javascript
// freeTalkModes.js & gamePromptBuilder.js
const weekId = weekData?.week_id || weekData?.weekId || 5;
// Support BOTH for defensive programming
```

**Rule:**
- Week files: Use `week_id: N` (snake_case)
- Code: Support both `week_id` AND `weekId`

---

### 4. **Mode Switching = Clear State + setTimeout**

**❌ SAI:**
```javascript
if (actionId === 'translate') {
  setMode('translation_help');
  handleSendMessage('Translate...');  // ← State chưa reset!
}
// → Phải bấm 2-3 lần mới chuyển được
```

**✅ ĐÚNG:**
```javascript
if (actionId === 'translate') {
  // Clear state FIRST
  setActiveScenario(null);
  setActiveActivityId(null);
  setTurnCount(0);
  setMode('translation_help');
  // Use setTimeout to ensure state cleared
  setTimeout(() => handleSendMessage('Translate...'), 50);
}
```

**Rule:**
- Clear active state BEFORE switching mode
- Use setTimeout(fn, 50) for message trigger

---

## 📋 Validation Checklist

**Before submitting ANY new week:**

```bash
# 1. Check 20Q objects are physical
node -e "const g=require('./src/config/gameAdaptation.js').GAME_TEMPLATES[N]; console.log(g.games.twenty_questions.objects);"
# → Should see: chair, book, pen, etc. (NOT happy, sad, playing)

# 2. Check roleplay has title_en + title_vi
grep -c "title_en" src/data/weeks/week_N_real.js
grep -c "title_vi" src/data/weeks/week_N_real.js
# → Both should return >= 3 (one per roleplay)

# 3. Check week_id is set
node -e "const w=require('./src/data/weeks/week_N_real.js').default; console.log('week_id:', w.week_id);"
# → Should return: week_id: N (not undefined)
```

---

## 🎯 Quick Test After Production

1. **Test 20 Questions:**
   - Bấm Play Game → 20 Questions
   - AI nói: "I'm thinking of something in the room"
   - ✅ Should be: desk, chair, pen, book (physical items)
   - ❌ Should NOT: happy, sad, playing (abstract)

2. **Test Roleplay:**
   - Bấm Roleplay 🎭
   - ✅ Should see: Titles in English + Vietnamese
   - ❌ Should NOT: Empty cards or missing names

3. **Test Mode Switch:**
   - Start any game
   - Bấm "Help Me Translate 🌐"
   - ✅ Should switch immediately (1 click)
   - ❌ Should NOT: Need 2-3 clicks

---

## 📌 Files Updated (Jan 27, 2026)

1. `src/config/gameAdaptation.js` - Fixed Week 4 20Q objects
2. `src/data/weeks/week_05_real.js` - Added title_en/title_vi to roleplays
3. `src/services/ai_tutor/freeTalkModes.js` - Read week_id correctly
4. `src/services/ai_tutor/gamePromptBuilder.js` - Support week_id
5. `src/modules/ai_tutor/tabs/FreeTalkTab.jsx` - Fix mode switching
6. `MASS_Final/1. WEEK_PRODUCTION_PROMPT_V2.md` - Updated with all fixes

---

**Updated Validation Count: 41 points** (from 38)
**Added Commands: 3 new checks** (total 9 commands)

✅ Ready for Week 8+ production!
