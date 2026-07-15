# COMPLETE TEST CHECKLIST - Week 4, 6, 7
**Date:** Jan 27, 2026
**Tester:** AI Agent + User Review

## ✅ FIXES APPLIED

### 1. Roleplay UI - Title Display
- ✅ Added `title_vi` and `title_en` to ALL roleplay_scenarios:
  - Week 4: 4 roleplays (Happiness Interviewer, Emotion Teacher, Activity Suggester, Happiness Collector)
  - Week 6: 4 roleplays (Treasure Map Reader, Location Guide, Hide and Seek Master, Treasure Shop)
  - Week 7: 4 roleplays (Backpack Checker, Classroom Pointer, Supply Shopping, Classroom Helper)
- ✅ UI code already uses `roleplay.title_vi` / `roleplay.title_en`
- ✅ Grid changed to `grid-cols-4` to show all 4 roleplays

### 2. Roleplay Data Source
- ✅ FreeTalkTab.jsx now uses `weekRealData.roleplay_scenarios` (NOT dynamicRoleplays.js)
- ✅ Removed import of `getRoleplaysForWeek`
- ✅ Dynamic scenario lookup by `title_en` (no hardcoded roleIdMap)

---

## 🧪 TEST PROCEDURES

### **WEEK 4 TESTING (My Happy Jar - "I like + V-ing")**

#### Test 1.1: Roleplay UI Display
- [ ] Navigate to Week 4 → Free Talk → Click "Roleplay 🎭" button
- [ ] **EXPECTED:** See 4 roleplay buttons with BOTH emoji AND text:
  - 🎤 Phỏng vấn Hạnh phúc / Happiness Interviewer
  - 🎭 Giáo viên Cảm xúc / Emotion Teacher
  - 💡 Gợi ý Hoạt động / Activity Suggester
  - 🏺 Sưu tầm Hạnh phúc / Happiness Collector
- [ ] **ACTUAL:**  
  _[User fills in what they see]_

#### Test 1.2: Roleplay Content - Happiness Interviewer 🎤
- [ ] Click "Happiness Interviewer 🎤"
- [ ] **EXPECTED OPENING:** "Welcome to Happy TV! 🎤 I'm Ms. Nova! Today's question: What do you like doing? Say: I like playing OR I like reading."
- [ ] **ACTUAL OPENING:**  
  _[User copies exact AI message]_

- [ ] Respond with: "I like playing"
- [ ] **EXPECTED AI BEHAVIOR:**
  - ✅ Acknowledges response
  - ✅ Asks NEXT question about LIKES (e.g., "Do you like reading?")
  - ✅ Gives scaffolding: "Say: I like reading" or "Say: Yes, I like reading"
  - ❌ Does NOT ask "What color?", "Where?", "How are you?"
  - ❌ Does NOT ask about season, family, house, rooms (Week 5 content)
- [ ] **ACTUAL AI BEHAVIOR:**  
  _[User describes what AI says for turns 2-5]_

#### Test 1.3: Play Game - Word Chain
- [ ] Week 4 → Free Talk → Click "Play Game 🎮"
- [ ] Select "Word Chain 🔗"
- [ ] **EXPECTED:** Game uses Week 4 vocab (happy, sad, excited, playing, reading, drawing, singing, jar)
- [ ] **ACTUAL:**  
  _[User tests 3-4 rounds and lists words used]_

#### Test 1.4: TTS (Text-to-Speech)
- [ ] During any roleplay or chat, click speaker icon 🔊
- [ ] **EXPECTED:** AI voice reads the message
- [ ] **ACTUAL:**  
  _[Does TTS play? Yes/No]_

---

### **WEEK 6 TESTING (Treasure Hunt - Prepositions)**

#### Test 2.1: Roleplay UI Display
- [ ] Navigate to Week 6 → Free Talk → Click "Roleplay 🎭"
- [ ] **EXPECTED:** 4 roleplays with text:
  - 🗺️ Đọc bản đồ kho báu / Treasure Map Reader
  - 🧭 Hướng dẫn Vị trí / Location Guide
  - 🔍 Trò Trốn Tìm / Hide and Seek Master
  - 💎 Cửa hàng Kho báu / Treasure Shop
- [ ] **ACTUAL:**  
  _[User fills in]_

#### Test 2.2: Roleplay Content - Treasure Map Reader 🗺️
- [ ] Click "Treasure Map Reader 🗺️"
- [ ] **EXPECTED OPENING:** "Ahoy! You have a treasure map! Where is the first treasure? Say: The treasure is ON the desk. Or: It is UNDER the box."
- [ ] **ACTUAL OPENING:**  
  _[User copies exact message]_

- [ ] Respond: "The treasure is ON the desk"
- [ ] **EXPECTED AI:**
  - ✅ "Ahoy! Great!" or similar excitement
  - ✅ Asks about NEXT treasure location
  - ✅ Gives scaffolding: "Say: It is UNDER the box"
  - ❌ Does NOT ask "Do you like cats?" (off-topic)
  - ❌ Does NOT ask about "I like + V-ing" (Week 4 grammar)
- [ ] **ACTUAL AI BEHAVIOR:**  
  _[User describes 3-4 turns]_

#### Test 2.3: Play Game - 20 Questions
- [ ] Week 6 → Free Talk → Play Game → "20 Questions 🤔"
- [ ] **EXPECTED:** Game uses Week 6 vocab (box, treasure, desk, floor, wall, window, door, on, in, under, next to)
- [ ] **ACTUAL:**  
  _[User tests and lists words/phrases used]_

---

### **WEEK 7 TESTING (Inside My Backpack - "There is a...")**

#### Test 3.1: Roleplay UI Display
- [ ] Week 7 → Free Talk → Roleplay 🎭
- [ ] **EXPECTED:** 4 roleplays:
  - 🎒 Kiểm tra Balo / Backpack Checker
  - 👉 Chỉ Đồ vật / Classroom Pointer
  - 🛒 Mua Đồ dùng học tập / Supply Shopping
  - 🔍 Trợ giúp Lớp học / Classroom Helper
- [ ] **ACTUAL:**  
  _[User fills in]_

#### Test 3.2: Roleplay Content - Backpack Checker 🎒
- [ ] Click "Backpack Checker 🎒"
- [ ] **EXPECTED OPENING:** "Good morning! I'm checking backpacks today! 🎒 Can you see a pen in your backpack? Say: Yes, there is a pen OR No, there isn't a pen."
- [ ] **ACTUAL OPENING:**  
  _[User copies]_

- [ ] Respond: "Yes, there is a pen"
- [ ] **EXPECTED AI:**
  - ✅ "Great!" or acknowledgment
  - ✅ Asks about NEXT item: "Can you see a ruler?"
  - ✅ Scaffolding: "Say: Yes, there is a ruler"
  - ❌ Does NOT ask "Do you like to sing?" (Week 4 grammar)
  - ❌ Does NOT ask "Where is it?" without "There is..." pattern
- [ ] **ACTUAL AI BEHAVIOR:**  
  _[User describes 3-4 turns]_

#### Test 3.3: Play Game - Sentence Builder
- [ ] Week 7 → Free Talk → Play Game → "Sentence Builder 🏗️"
- [ ] **EXPECTED:** Game uses Week 7 vocab (pen, ruler, eraser, book, notebook, pencil case, backpack)
- [ ] **ACTUAL:**  
  _[User tests and describes]_

---

## 🐛 KNOWN ISSUES TO VERIFY FIXED

### Issue A: Roleplay showing wrong content
**Before:** Week 4 showed "House & Rooms Activity 2" (Week 5 content)  
**Fix Applied:** FreeTalkTab.jsx now reads from `weekRealData.roleplay_scenarios`  
**Test Result:** _[User confirms if Week 4 now shows correct roleplays]_

### Issue B: UI only shows emoji, no text
**Before:** Roleplay buttons had emoji only (🎤🎭💡🏺)  
**Fix Applied:** Added `title_vi` and `title_en` to all roleplay_scenarios  
**Test Result:** _[User confirms if text now shows]_

### Issue C: AI asks off-topic questions
**Before:** Week 7 roleplay asked "Do you like animals?" instead of school supplies  
**Fix Applied:** Data has strict `guide_rules` + `backup_questions`  
**Test Result:** _[User confirms if AI stays on-topic after 5+ turns]_

### Issue D: TTS not working
**Before:** User reported "còn mất AI TTS"  
**Fix Applied:** _[Need to verify TTS code]_  
**Test Result:** _[User tests speaker icon in all 3 weeks]_

---

## 📊 SUMMARY TABLE

| Feature | Week 4 | Week 6 | Week 7 | Status |
|---------|--------|--------|--------|--------|
| Roleplay UI shows 4 buttons | ⏳ | ⏳ | ⏳ | Testing |
| Roleplay buttons show text | ⏳ | ⏳ | ⏳ | Testing |
| Opening line correct | ⏳ | ⏳ | ⏳ | Testing |
| AI uses week grammar | ⏳ | ⏳ | ⏳ | Testing |
| AI stays on-topic | ⏳ | ⏳ | ⏳ | Testing |
| Game uses week vocab | ⏳ | ⏳ | ⏳ | Testing |
| TTS works | ⏳ | ⏳ | ⏳ | Testing |

---

## ✍️ USER FEEDBACK SECTION

### What's working well:
_[User fills in]_

### What still has issues:
_[User fills in]_

### Specific errors/screenshots:
_[User attaches]_

---

## 🔧 NEXT STEPS (If issues found)

1. If roleplay content wrong → Check NovaEngine prompt injection
2. If game vocab wrong → Update gameAdaptation.js
3. If TTS broken → Check ttsEngine.js and audio autoplay settings
4. If titles missing → Verify weekData structure matches UI expectations

**COMPLETION STATUS:** ⏳ Awaiting user testing
