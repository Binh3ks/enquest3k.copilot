# WEEK 1 CRITICAL ERRORS - PART 2 (Content Quality Issues)

## 📊 USER TESTING DISCOVERED 2 MORE FUNDAMENTAL ERRORS

Testing Date: December 28, 2025
Tester: User (hands-on app testing)
Status: **CRITICAL - Blueprint violations**

---

## ERROR 13: LOGIC LAB - Wrong Question Format (5/5 puzzles)

### Problem:
Questions are DIRECT CALCULATIONS without story context or problem setup. Blueprint requires "context-based word problems."

### Example (Puzzle 1):

**❌ CURRENT (Week 1 - WRONG):**
```javascript
{
  id: 1,
  context_en: "Alex's classroom has 20 desks arranged in rows. Each row has 4 desks. Alex sits in the third row from the front. In the morning, 3 students are absent, so some desks are empty.",
  question_en: "How many rows of desks are there in Alex's classroom?",
  //❌ Problem: Just asks for counting - no problem to solve
  // ❌ Answer is IN the context ("Each row has 4 desks") → 20÷4=5
  // ❌ No real-world problem scenario
}
```

**✅ CORRECT (Week 19 - Blueprint-aligned):**
```javascript
{
  id: 1, 
  type: "math",
  title_en: "Birthday Candles",
  question_en: "Last year, Tom was 7 years old. He had 7 candles on his cake. This year, how many candles will he have?",
  // ✅ Has story: Birthday scenario
  // ✅ Has problem: Age increases → candles increase
  // ✅ Requires inference: 7 + 1 year = 8 candles
  answer: ["8 candles", "Eight candles", "8"],
  hint_en: "7 + 1"
}
```

### Blueprint Requirement (Line 100-110):
> "Logic Lab: Luôn có context (ngữ cảnh) cho các câu hỏi, theo đúng văn phong bản xứ trong SGK"
> "Phase 1 (Weeks 1-54): Vocab & Patterns (Math Bridge) - Nội dung: Nối hình với từ, Quy luật màu sắc, Đọc phép tính"

### Root Cause:
AI generated "realistic scenarios" but asked for FACTS IN TEXT, not PROBLEMS TO SOLVE. Week 1 questions are reading comprehension disguised as math.

### Impact:
- Students just read text and extract numbers (not problem-solving)
- No critical thinking required
- Math skills NOT developed
- Blueprint requirement violated: "văn phong bản xứ trong SGK" (textbook word problem style)

### Fix Required:
Rewrite ALL 5 puzzles to have:
1. **Story setup** (situation)
2. **Problem statement** (what needs solving)
3. **Question** (clear mathematical operation required)
4. Remove redundant context (Alex sitting, students absent = irrelevant info)

---

## ERROR 14: ASK AI - Wrong Answer Type (5/5 prompts)

### Problem:
Answers are RESPONSES to questions, not QUESTIONS themselves. Ask AI is for teaching students to ASK questions (critical inquiry), not answer them.

### Example (Prompt 1):

**❌ CURRENT (Week 1 - WRONG):**
```javascript
{
  id: 1,
  context_en: "Alex is a young student who loves learning...",
  question_en: "How do you think children go to school?",
  answer: ["By bus", "By boat", "By walking", "By bicycle"],  
  // ❌ These are ANSWERS to a question
  // ❌ NOT questions that students should ask
}
```

**✅ CORRECT (Week 19 - Blueprint-aligned):**
```javascript
{
  id: 1,
  context_en: "You are looking at your parents' wedding photo. The picture is in black and white, and your parents look very young. You want to know about that day.",
  audio_url: "/audio/week19/ask_ai_1.mp3",
  answer: ["How old were you?", "What was the weather like?", "Were you happy?"],
  // ✅ These are QUESTIONS students should ask
  // ✅ Teaching question formation
  hint: "How old... / What was..."
}
```

### Blueprint Requirement (Line 114-125):
> "Ask AI: Yêu cầu bắt buộc: luôn có context cho các câu gợi ý... sao cho học sinh có thể suy diễn ra được câu hỏi trong bối cảnh đó"
> "Phase 1 (Shadow Asking): Prompt: 'Bạn đang ở sở thú. Hãy bấm mic và hỏi người trông thú sư tử ăn gì: What do lions eat?'"
> "Mục tiêu: Luyện ngữ điệu câu hỏi (Mimicry)"

### Root Cause:
Misunderstood feature purpose. Asked "How do you think..." (opinion question) instead of "What question would you ask?" (inquiry training).

### Impact:
- Students type OPINIONS ("By bus") instead of QUESTIONS ("How do they go to school?")
- Critical inquiry skill NOT developed
- Voice-first feature useless (can't practice question intonation)
- Blueprint violated: "Luyện ngữ điệu câu hỏi"

### Fix Required:
Rewrite ALL 5 prompts to:
1. **Setup scenario** (where student is, what they see)
2. **Curiosity trigger** (what they want to know)
3. **Expected questions** (sample questions as answers)
4. Remove "How do you think..." format → Use "You want to know..." format

---

## COMPARISON: Week 1 vs Week 19 Content Philosophy

| Aspect | Week 1 (WRONG) | Week 19 (CORRECT) |
|--------|----------------|-------------------|
| **Logic Lab** | Extract facts from text | Solve word problems |
| **Question Style** | "How many X are there?" | "How many X will there be?" |
| **Context Usage** | Contains answer | Sets up problem |
| **Cognitive Level** | Reading comprehension | Mathematical reasoning |
| **Ask AI** | Answer opinion questions | Form inquiry questions |
| **Answer Type** | Facts/opinions | Questions |
| **Learning Goal** | Information recall | Critical thinking |
| **Blueprint Align** | ❌ Misses mark | ✅ Perfect match |

---

## AUDIO IMPACT

### Current Audio Files (Week 1):
- Logic Lab: Reads context + question with answer embedded
- Ask AI: Reads context asking for opinion

### After Fix:
- Logic Lab: Will read story problem requiring calculation
- Ask AI: Will read scenario prompting question formation

### Regeneration Required:
```bash
# After fixing data, regenerate:
node tools/create_audio_tasks_only.js 1 1
python3 tools/generate_audio.py --provider openai --voice nova

# Expected changes:
# - 5 Logic Lab audio files (logic_1.mp3 to logic_5.mp3)
# - 5 Ask AI audio files (ask_ai_1.mp3 to ask_ai_5.mp3)
# - Total: 10 files to regenerate
```

---

## BLUEPRINT COMPLIANCE CHECKLIST (Week 1)

Before mass production, verify:

**Logic Lab (Lines 100-110):**
- [ ] Has story context (not just facts)
- [ ] Requires calculation (not just reading)
- [ ] Problem is age-appropriate (Week 1 = simple addition/subtraction)
- [ ] Answer is NUMBER + UNIT ("8 candles" not "8")
- [ ] Hint shows operation ("7 + 1") not answer

**Ask AI (Lines 114-125):**
- [ ] Context sets up curiosity (not opinion poll)
- [ ] Answer is QUESTIONS (not facts/opinions)
- [ ] Questions use correct grammar patterns
- [ ] Hint shows question starters ("How... / What...")
- [ ] Audio supports voice-first learning

**Phase 1 Requirements (Weeks 1-54):**
- [ ] Logic Lab: "Vocab & Patterns (Math Bridge)" - simple operations
- [ ] Ask AI: "Shadow Asking" - mimic question patterns
- [ ] No complex reasoning yet (Phase 2 starts Week 55)

---

## TOTAL WEEK 1 ERRORS: 14

Errors 1-10: Structural issues (FIXED)
Errors 11-12: SmartCheck missing (FIXED)
**Errors 13-14: Content quality issues (NEEDS FIX)**

Status: 12/14 fixed, 2/14 require content rewrite + audio regeneration

