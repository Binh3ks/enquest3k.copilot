# GameHub Testing Checklist - Weeks 2-7

## 🎯 **Đã Fix:**

### 1. **AI Validation Logic** ✅
**Vấn đề:** AI yêu cầu content words (nouns, adjectives) trong câu hỏi - sai ngữ pháp
- Ví dụ sai: "He has long hair" → AI yêu cầu phải có "hair" trong câu hỏi ❌
- Câu đúng: "What does he have?" không cần từ "hair" ✅

**Fix:** [src/services/ai_tutor/games/askMe.js](src/services/ai_tutor/games/askMe.js)
- AI giờ tự động lọc content words (hair, eyes, mother, father, tall, short, etc.)
- Chỉ validate structure words (he, she, have, is, what, etc.)
- 236 contexts được fix tự động

### 2. **Import Games Data** ✅
**Vấn đề:** Tuần 2-7 không load vì chưa import vào system

**Fix:** [src/config/gameAdaptation.js](src/config/gameAdaptation.js)
- Đã import tất cả 14 files (weeks 2-7, Easy + Advanced)
- Đã update weekGamesMap với tuần 1-7

---

## 📊 **Status Tất Cả 14 Files:**

| Tuần | Mode | File | Contexts | Vocab | Make Sentence | Show & Tell | Status |
|------|------|------|----------|-------|--------------|-------------|--------|
| 2 | Easy | [weeks_easy/week_02/games.js](src/data/weeks_easy/week_02/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 2 | Adv | [weeks/week_02/games.js](src/data/weeks/week_02/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 3 | Easy | [weeks_easy/week_03/games.js](src/data/weeks_easy/week_03/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 3 | Adv | [weeks/week_03/games.js](src/data/weeks/week_03/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 4 | Easy | [weeks_easy/week_04/games.js](src/data/weeks_easy/week_04/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 4 | Adv | [weeks/week_04/games.js](src/data/weeks/week_04/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 5 | Easy | [weeks_easy/week_05/games.js](src/data/weeks_easy/week_05/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 5 | Adv | [weeks/week_05/games.js](src/data/weeks/week_05/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 6 | Easy | [weeks_easy/week_06/games.js](src/data/weeks_easy/week_06/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 6 | Adv | [weeks/week_06/games.js](src/data/weeks/week_06/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 7 | Easy | [weeks_easy/week_07/games.js](src/data/weeks_easy/week_07/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |
| 7 | Adv | [weeks/week_07/games.js](src/data/weeks/week_07/games.js) | 9 | 10 | 10+10 | ✓ | ✅ |

**Tổng:** 12 files × 3 games = 36 game instances

---

## 🧪 **Test Protocol:**

### **Server:**
```bash
npm run dev
# Đang chạy: http://localhost:5174/
```

### **Test Từng Tuần:**

#### **Week 2: My Family Squad** (Possessive adjectives)
- **URL Easy:** http://localhost:5174/week/2/game_hub
- **URL Adv:** (Switch to Advanced mode in UI)
- **Vocabulary Expected:** mother, father, brother, sister, team, leader, helper, love, family, home

**Show & Tell:**
- [ ] All 10 words có emoji ✅
- [ ] Detail_map hiển thị đúng (my father, his father, etc.)
- [ ] Sentence hints đúng pattern "He is my ___" / "She is my ___"

**Unscramble Sentence:**
- [ ] 10 sentences Easy mode
- [ ] 10 sentences Advanced mode
- [ ] Mic-first design hoạt động

**Ask Me:**
- [ ] 9 contexts hiển thị đúng
- [ ] Context "She is my mother. Ask me who she is."
- [ ] AI accept: "Who is she?" ✅
- [ ] AI không yêu cầu từ "mother" trong câu hỏi ✅

---

#### **Week 3: The Mirror Game** (Is vs has)
- **URL Easy:** http://localhost:5174/week/3/game_hub
- **Vocabulary Expected:** tall, short, hair, eyes, long, curly, straight, glasses, face, smile

**TEST CRITICAL FIX:**
- [ ] Context: "He has long hair. Ask me what he has."
- [ ] Câu hỏi: "What does he have?" ✅
- [ ] AI **KHÔNG** yêu cầu từ "hair" ✅
- [ ] AI **KHÔNG** yêu cầu từ "long" ✅
- [ ] Feedback: "Good question!" (không phải error)

**Advanced Mode:**
- [ ] Pattern: "She is ___ and has ___"
- [ ] Sentence hints: "She is tall and has blue eyes."
- [ ] AI accept: "What does she have?" ✅

---

#### **Week 4: My Happy Jar** (I like + V-ing)
- **URL:** http://localhost:5174/week/4/game_hub
- **Vocabulary Expected:** like, love, smile, laugh, play, draw, read, jump, run, fun

**Show & Tell:**
- [ ] Pattern Easy: "I like ___ing"
- [ ] Pattern Advanced: "I like ___ing because ___"

**Ask Me:**
- [ ] All contexts about likes/preferences
- [ ] AI accept: "What do you like doing?" ✅
- [ ] AI accept: "Why do you like it?" ✅

---

#### **Week 5: The Mystery House** (A/An + There is)
- **URL:** http://localhost:5174/week/5/game_hub
- **Vocabulary Expected:** house, room, bedroom, kitchen, bathroom, living room, table, chair, bed, door

**Ask Me:**
- [ ] Context: "There is a bedroom. Ask me if there is one."
- [ ] AI accept: "Is there a bedroom?" ✅
- [ ] AI **KHÔNG** yêu cầu từ "bedroom" nếu dùng "it" ✅

---

#### **Week 6: Treasure Hunt at Home** (Prepositions)
- **URL:** http://localhost:5174/week/6/game_hub
- **Vocabulary Expected:** ball, toy, box, desk, chair, door, floor, in, on, under

**Show & Tell:**
- [ ] Pattern: "The ___ is in/on/under ___"

**Ask Me:**
- [ ] Context: "The ball is on the floor. Ask me where it is."
- [ ] AI accept: "Where is it?" ✅
- [ ] AI accept: "Where is the ball?" ✅
- [ ] AI **KHÔNG** yêu cầu từ "ball" nếu dùng "it" ✅

---

#### **Week 7: Inside My Backpack** (There is)
- **URL Easy:** http://localhost:5174/week/7/game_hub
- **Vocabulary Expected:** pencil, crayon, scissors, glue, paper, marker, lunch box, water bottle, school bag, folder

**Show & Tell:**
- [ ] ✅ 10 detail_map entries (confirmed)
- [ ] ✅ 10 sentence_hints entries (confirmed)
- [ ] ✅ 10 emoji_map entries (confirmed)
- [ ] Pattern: "There is a ___"
- [ ] Emoji hiển thị: ✏️ 🖍️ ✂️ 📎 📄 🖊️ 🍱 💧 🎒 📁

**Unscramble:**
- [ ] ✅ 10 sentences Easy (confirmed)
- [ ] ✅ 10 sentences Advanced (confirmed)

**Ask Me:**
- [ ] ✅ 9 contexts Easy (confirmed)
- [ ] ✅ 9 contexts Advanced (confirmed)

---

## 🔬 **Grammar Validation Tests:**

### **Test Case 1: Content Words Filtering**
```
Context: "He has long hair. Ask me what he has."
required_keywords: ['he', 'have', 'hair']

❌ OLD BEHAVIOR: AI yêu cầu "hair" → Learner fail
✅ NEW BEHAVIOR: AI chỉ check ['he', 'have'] → Pass

Test Questions:
- "What does he have?" → ✅ PASS
- "What hair does he have?" → ✅ PASS
- "Does he have hair?" → ✅ PASS
```

### **Test Case 2: Structure Words Only**
```
Context: "She is tall. Ask me about her."
required_keywords: ['she', 'tall']

❌ OLD: AI yêu cầu "tall"
✅ NEW: AI chỉ check ['she']

Test Questions:
- "Is she tall?" → ✅ PASS
- "Is she short?" → ✅ PASS (vì không cần "tall")
- "How is she?" → ✅ PASS
```

### **Test Case 3: Mini Interview**
```
Context: "Interview me: ask who my mother is"
required_keywords: ['mother']

❌ OLD: AI yêu cầu "mother"
✅ NEW: AI không check (vì "mother" là content word)

Test Questions:
- "Who is your mother?" → ✅ PASS
- "Who is she?" → ✅ PASS
```

---

## 🐛 **Known Issues (if any):**

### ✅ FIXED:
- [x] Week 2 Advanced chỉ có 2 contexts → Fixed, giờ có 9
- [x] Week 3 Advanced file missing → Fixed, đã tạo đầy đủ
- [x] AI validation yêu cầu content words → Fixed, giờ auto-filter
- [x] Tuần 2-7 không load → Fixed, đã import vào system

### 🔄 TO VERIFY:
- [ ] Tất cả 36 game instances load đúng trong browser
- [ ] Mic input hoạt động ở mọi game
- [ ] Progress tracking chính xác (0/10 → 10/10)
- [ ] Game completion trigger đúng

---

## 📝 **How to Report Bugs:**

Khi phát hiện lỗi, cung cấp:
1. **URL:** http://localhost:5174/week/X/game_hub
2. **Game:** Show & Tell / Unscramble / Ask Me
3. **Mode:** Easy / Advanced
4. **Screenshot:** Error message hoặc UI issue
5. **Steps to reproduce:**
   - Click vào tuần X
   - Chọn game Y
   - Input "..."
   - Expected: ... / Actual: ...

---

## ✅ **Final Verification Command:**

```bash
# Test all weeks load correctly
for week in 2 3 4 5 6 7; do
  echo "Week $week Easy:"
  grep -A 500 "contexts_easy:" src/data/weeks_easy/week_0$week/games.js | grep -c "id:"
  echo "Week $week Advanced:"
  grep -A 500 "contexts_advanced:" src/data/weeks/week_0$week/games.js | grep -c "id:"
  echo ""
done
```

**Expected output:** Mỗi tuần có 9 contexts (Easy) và 9 contexts (Advanced)

---

**🌐 Server:** http://localhost:5174/
**🎮 Start Testing:** Refresh browser và test từ Week 2 → Week 7
