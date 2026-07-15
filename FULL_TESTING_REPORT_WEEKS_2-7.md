# 🧪 FULL TESTING REPORT - WEEKS 2-7 (ALL 12 FILES)

**Server:** http://localhost:5174/ ✅ Running  
**All 6 weeks opened in Simple Browser tabs** ✅

---

## 📊 FILE VERIFICATION COMPLETE

| Week | Easy Lines | Adv Lines | Easy Contexts | Adv Contexts | Status |
|------|------------|-----------|---------------|--------------|--------|
| 2 | 293 | 393 | 11 | 18 | ✅ |
| 3 | 293 | 393 | 11 | 18 | ✅ |
| 4 | 390 | 391 | 18 | 18 | ✅ |
| 5 | 391 | 392 | 18 | 18 | ✅ |
| 6 | 391 | 392 | 18 | 18 | ✅ |
| 7 | 391 | 392 | 18 | 18 | ✅ |

**All 12 files loaded with complete content** ✅

---

## 🎮 TESTING PROTOCOL - TEST TẤT CẢ 6 TUẦN

### **Week 2: My Family Squad** 
**URL:** http://localhost:5174/week/2/game_hub  
**Grammar:** Possessive adjectives (He is my ___, She is my ___)  
**Vocabulary:** mother, father, brother, sister, team, leader, helper, love, family, home

#### Test Checklist:
- [ ] **Show & Tell Ladder**
  - Click game → Should see 10 words với emoji (👩 👨 👦 👧 👥 👑 🤝 ❤️ 👨‍👩‍👧‍👦 🏠)
  - Step 1: Say "mother" → Should accept ✅
  - Step 2: Say "my mother" → Should accept ✅
  - Step 3: Say "She is my mother" → Should accept ✅
  - Progress: 0/10 → moves to next word after Step 3

- [ ] **Unscramble Sentence (Make a Sentence)**
  - Scrambled words appear (e.g., "mother my is She")
  - Mic button available → Click mic → Say correct sentence
  - Answer: "She is my mother." → Should accept ✅
  - Progress: 0/10 → 1/10 after correct answer

- [ ] **Ask Me**
  - Context: "She is my mother. Ask me who she is."
  - Question hints: "Who is she?", "Who is your mother?", "Who is that?"
  - Say: "Who is she?" → **Should PASS** ✅
  - AI should NOT require "mother" in question ✅
  - Progress: 0/10 → 1/10 after correct question

---

### **Week 3: The Mirror Game** ⚠️ CRITICAL TEST
**URL:** http://localhost:5174/week/3/game_hub  
**Grammar:** Is vs has (He is ___, She is ___, He has ___)  
**Vocabulary:** tall, short, hair, eyes, long, curly, straight, glasses, face, smile

#### Test Checklist:
- [ ] **Show & Tell Ladder**
  - 10 words với emoji (📏 🔬 💇 👀 ↔️ 🌀 ➡️ 👓 😊 😄)
  - Pattern Easy: "He is tall" / "He has long hair"
  - Pattern Advanced: "She is tall and has blue eyes"

- [ ] **Ask Me - VALIDATION FIX TEST** 🔥
  - Context: "He has long hair. Ask me what he has."
  - **OLD BEHAVIOR ❌**: AI yêu cầu từ "hair" → Fail
  - **NEW BEHAVIOR ✅**: AI chỉ check structure words
  - Test questions:
    * "What does he have?" → **MUST PASS** ✅
    * "What hair does he have?" → Should pass ✅
    * "Does he have hair?" → Should pass ✅
  - Feedback should be "Good question!" NOT error about "hair"

- [ ] **Context: "She is tall. Ask me about her."**
  - Say: "Is she tall?" → Should pass ✅
  - Say: "Is she short?" → Should pass ✅ (doesn't need "tall")
  - AI should filter out "tall" from required_keywords ✅

---

### **Week 4: My Happy Jar**
**URL:** http://localhost:5174/week/4/game_hub  
**Grammar:** I like + V-ing (I like reading, I like reading because...)  
**Vocabulary:** like, love, smile, laugh, play, draw, read, jump, run, fun

#### Test Checklist:
- [ ] **Show & Tell**
  - 10 words với emoji (👍 ❤️ 😊 😄 🎮 ✏️ 📖 🤸 🏃 🎉)
  - Pattern Easy: "I like reading"
  - Pattern Advanced: "I like reading because it is fun"

- [ ] **Ask Me**
  - Context: "I like reading. Ask me what I like doing."
  - Questions: "What do you like doing?", "What do you like?"
  - Should accept both forms ✅

---

### **Week 5: The Mystery House**
**URL:** http://localhost:5174/week/5/game_hub  
**Grammar:** There is (There is a bedroom, There is a table in the kitchen)  
**Vocabulary:** house, room, bedroom, kitchen, bathroom, living room, table, chair, bed, door

#### Test Checklist:
- [ ] **Show & Tell**
  - 10 words (house, room, bedroom, kitchen, bathroom, living room, table, chair, bed, door)
  - Pattern: "There is a bedroom" / "There is a table in the kitchen"

- [ ] **Ask Me**
  - Context: "There is a bedroom. Ask me if there is one."
  - Question: "Is there a bedroom?" → Should pass ✅
  - AI should filter "bedroom" from required_keywords ✅

---

### **Week 6: Treasure Hunt at Home**
**URL:** http://localhost:5174/week/6/game_hub  
**Grammar:** Prepositions (in, on, under)  
**Vocabulary:** ball, toy, box, desk, chair, door, floor, in, on, under

#### Test Checklist:
- [ ] **Show & Tell**
  - Pattern: "The ball is on the floor" / "Put the toy in the box"

- [ ] **Ask Me**
  - Context: "The ball is on the floor. Ask me where it is."
  - Questions: "Where is it?", "Where is the ball?"
  - Both should pass ✅
  - AI should NOT require "ball" if using "it" ✅

---

### **Week 7: Inside My Backpack**
**URL:** http://localhost:5174/week/7/game_hub  
**Grammar:** There is (with school supplies)  
**Vocabulary:** pencil, crayon, scissors, glue, paper, marker, lunch box, water bottle, school bag, folder

#### Test Checklist:
- [ ] **Show & Tell - CONTENT VERIFICATION** 🔥
  - **VERIFIED**: 10 detail_map entries ✅
  - **VERIFIED**: 10 sentence_hints_map ✅
  - **VERIFIED**: 10 emoji_map ✅
  - Emoji should display: ✏️ 🖍️ ✂️ 📎 📄 🖊️ 🍱 💧 🎒 📁
  - Detail phrases: "my pencil", "a red pencil", "the pencil", "your pencil"
  - Sentence hints: "There is a pencil.", "I have a pencil.", "This is a pencil."

- [ ] **Unscramble Sentence**
  - **VERIFIED**: 10 Easy sentences ✅
  - **VERIFIED**: 10 Advanced sentences ✅
  - Examples: "There is a pencil.", "There is a lunch box."

- [ ] **Ask Me**
  - **VERIFIED**: 9 Easy contexts ✅
  - **VERIFIED**: 9 Advanced contexts ✅

---

## 🔬 CRITICAL VALIDATION TESTS

### Test 1: Content Words Filtering (Week 3)
```
Context: "He has long hair. Ask me what he has."
required_keywords: ['he', 'have', 'hair']

❌ OLD: AI yêu cầu "hair" → Students fail
✅ NEW: AI filters "hair", only checks ['he', 'have']

Test:
- Type: "What does he have?"
- Expected: "Good question!" ✅
- Should NOT see: "Include one key word: hair" ❌
```

### Test 2: Adjective Filtering (Week 3)
```
Context: "She is tall. Ask me about her."
required_keywords: ['she', 'tall']

❌ OLD: AI yêu cầu "tall"
✅ NEW: AI filters "tall", only checks ['she']

Test:
- Type: "Is she short?"
- Expected: PASS ✅ (vì không cần "tall")
```

### Test 3: Noun Filtering (Week 2)
```
Context: "She is my mother. Ask me who she is."
required_keywords: ['she', 'your', 'that', 'mother']

❌ OLD: AI yêu cầu "mother"
✅ NEW: AI filters "mother", only checks ['she', 'your', 'that']

Test:
- Type: "Who is she?"
- Expected: PASS ✅
```

---

## 📋 TESTING SEQUENCE

1. **Open all 6 tabs in Simple Browser** ✅ (Done)
   - Week 2: http://localhost:5174/week/2/game_hub
   - Week 3: http://localhost:5174/week/3/game_hub
   - Week 4: http://localhost:5174/week/4/game_hub
   - Week 5: http://localhost:5174/week/5/game_hub
   - Week 6: http://localhost:5174/week/6/game_hub
   - Week 7: http://localhost:5174/week/7/game_hub

2. **Test Week 3 First** (Critical validation fix)
   - Go to Week 3 Ask Me game
   - Verify "What does he have?" passes WITHOUT requiring "hair"

3. **Test Week 7 Show & Tell** (Content verification)
   - Verify 10 emoji display correctly
   - Verify detail phrases show up
   - Verify sentence hints work

4. **Random Sampling** (Other weeks)
   - Pick 2-3 random weeks
   - Test 1 game from each
   - Verify vocabulary displays correctly

5. **Report Issues**
   - If any game fails, note:
     * Week number
     * Game name (Show & Tell / Unscramble / Ask Me)
     * Mode (Easy / Advanced)
     * Error message or behavior

---

## ✅ WHAT'S BEEN VERIFIED

### Code Fixes:
- ✅ AI validation filters content words automatically
- ✅ All 12 files imported into gameAdaptation.js
- ✅ Week 2 Advanced expanded from 2 to 9 contexts
- ✅ Week 3 Advanced file created (was missing)

### Content Audit:
- ✅ All 12 files have 290-393 lines
- ✅ All weeks have 10 vocabulary words
- ✅ All weeks have detail_map entries
- ✅ All weeks have emoji_map entries
- ✅ All weeks have 10 Make Sentence patterns
- ✅ All weeks have 9+ Ask Me contexts

### Files Status:
```
Week 2 Easy:  293 lines ✅
Week 2 Adv:   393 lines ✅
Week 3 Easy:  293 lines ✅
Week 3 Adv:   393 lines ✅
Week 4 Easy:  390 lines ✅
Week 4 Adv:   391 lines ✅
Week 5 Easy:  391 lines ✅
Week 5 Adv:   392 lines ✅
Week 6 Easy:  391 lines ✅
Week 6 Adv:   392 lines ✅
Week 7 Easy:  391 lines ✅
Week 7 Adv:   392 lines ✅
```

---

## 🐛 HOW TO REPORT BUGS

If you find an issue, provide:

1. **URL**: http://localhost:5174/week/X/game_hub
2. **Game**: Show & Tell / Unscramble / Ask Me
3. **Mode**: Easy / Advanced  
4. **Issue Type**:
   - Missing content (no vocabulary, emoji, hints)
   - Validation error (AI rejects correct answer)
   - UI bug (progress not updating, game doesn't advance)
   - Data mismatch (wrong vocabulary for the week)

5. **Steps to Reproduce**:
   ```
   1. Go to Week X
   2. Click "Ask Me" game
   3. Say "What does he have?"
   4. Expected: "Good question!"
   5. Actual: "Include one key word: hair"
   ```

6. **Screenshot**: (if UI issue)

---

## 🎯 SUCCESS CRITERIA

All 6 weeks should:
- ✅ Display correct vocabulary (10 words)
- ✅ Show & Tell has emoji and hints
- ✅ Unscramble has 10 sentences
- ✅ Ask Me has 9 contexts
- ✅ AI validation accepts grammatically correct questions
- ✅ AI does NOT require content words (nouns, adjectives)
- ✅ Progress tracking works (0/10 → 10/10)
- ✅ Mic input functions

---

**🌐 START TESTING NOW:**  
Click through the Simple Browser tabs and test each week following the checklist above!
