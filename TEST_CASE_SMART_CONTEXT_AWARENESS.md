# 🧪 TEST CASE: SMART CONTEXT AWARENESS

**Feature**: Prevent AI from asking redundant questions  
**Priority**: 🔴 CRITICAL  
**Test Date**: January 17, 2026

---

## 📋 TEST SCENARIO 1: Implicit Answer Detection

### **Setup:**
- Week: 4 (My Happy Jar - Emotions)
- Mission: 1 (My Happy Feelings)
- Turn: 2

### **Test Steps:**

#### Turn 1:
```
AI: "Cool! You are happy! What do you like to do?"
Student: "playing games" ✅ [Types in input]
```

#### Turn 2 - BEFORE FIX:
```
❌ AI: "Nice! You like games! Do you like playing games?"
   Problem: Student JUST SAID "playing games" - redundant question!
```

#### Turn 2 - AFTER FIX:
```
✅ AI: "Nice! You like playing games! What games do you play?"
   Correct: AI detected "playing games" already answers "Do you like playing games?"
   Natural follow-up: Asks WHAT games instead
```

---

## 📋 TEST SCENARIO 2: Explicit Answer Detection

### **Setup:**
- Week: 1 (The Young Scholar)
- Mission: 2 (What's in Your Backpack?)
- Turn: 3

### **Test Steps:**

#### Turn 2:
```
AI: "What color is your backpack?"
Student: "red backpack" ✅
```

#### Turn 3 - BEFORE FIX:
```
❌ AI: "Great! Your backpack is red! Do you have a backpack?"
   Problem: Student JUST mentioned backpack - asking if they have one is redundant!
```

#### Turn 3 - AFTER FIX:
```
✅ AI: "Great! Your backpack is red! What is inside your backpack?"
   Correct: AI detected student already mentioned having a backpack
   Skips "Do you have a backpack?" → Moves to contents
```

---

## 📋 TEST SCENARIO 3: Partial Info Detection

### **Setup:**
- Week: 2 (My Family Squad)
- Mission: 1 (Meet the Family)
- Turn: 4

### **Test Steps:**

#### Turn 3:
```
AI: "Who lives in your home?"
Student: "mother father brother" ✅
```

#### Turn 4 - BEFORE FIX:
```
❌ AI: "Nice! You have mother, father, brother! Do you have a mother?"
   Problem: Student JUST listed mother - asking if they have mother is silly!
```

#### Turn 4 - AFTER FIX:
```
✅ AI: "Nice! You have mother, father, and brother! What does your mother do?"
   Correct: AI detected "mother" already mentioned
   Skips "Do you have a mother?" → Asks about what she does
```

---

## 📋 TEST SCENARIO 4: Name Detection

### **Setup:**
- Week: 1 (The Young Scholar)
- Mission: 1 (First Day at School)
- Turn: 2

### **Test Steps:**

#### Turn 1:
```
AI: "Hello! I am Ms. Nova. What is your name?"
Student: "my name is Binh" ✅
```

#### Turn 2 - BEFORE FIX:
```
❌ AI: "Great! Your name is Binh! What is your name?"
   Problem: Literal loop - just asked and got answer!
```

#### Turn 2 - AFTER FIX:
```
✅ AI: "Great! Your name is Binh! How old are you?"
   Correct: AI detected name already provided
   Moves to next objective (age)
```

---

## 📋 TEST SCENARIO 5: Activity Detection

### **Setup:**
- Week: 4 (My Happy Jar)
- Mission: 1 (My Happy Feelings)
- Turn: 4

### **Test Steps:**

#### Turn 3:
```
AI: "What do you like to do?"
Student: "I like reading" ✅
```

#### Turn 4 - BEFORE FIX:
```
❌ AI: "Great! You like reading! Do you like reading?"
   Problem: Circular question - student just said they like reading!
```

#### Turn 4 - AFTER FIX:
```
✅ AI: "Great! You like reading! What books do you read?"
   Correct: AI detected "like reading" already stated
   Natural progression: What specific books?
```

---

## 🎯 VALIDATION CRITERIA

For each test case, verify:

### ✅ **PASS** if:
1. AI does NOT repeat question when student already answered
2. AI asks a NATURAL follow-up question instead
3. Console shows: `📜 RECENT CONVERSATION:` with history
4. Console shows: `🧠 SMART CONTEXT CHECK` being applied

### ❌ **FAIL** if:
1. AI asks the same question in different words
2. AI ignores what student just said
3. Conversation feels robotic/interrogative
4. Student has to answer same thing twice

---

## 🔍 HOW TO TEST

### Step 1: Open Week 4, Mission 1
```
http://localhost:5174/week/4/read_explore
```

### Step 2: Open AI Tutor Widget
Click purple chat button

### Step 3: Select Story Mission tab

### Step 4: Run Test Scenarios
Follow each test scenario above, comparing behavior

### Step 5: Check Console Logs
Open DevTools → Console
Look for:
```javascript
📜 Conversation history lines: 4 | Showing last: 4
🧠 SMART CONTEXT CHECK: Detecting semantic match...
🎯 Next planned question: "Do you like playing games?"
✅ Detected overlap: "playing games" in student answer
→ Using natural follow-up instead
```

---

## 📊 EXPECTED RESULTS

| Scenario | Before Fix | After Fix | Status |
|----------|-----------|-----------|--------|
| 1. Playing games | ❌ Redundant | ✅ Natural | 🟢 PASS |
| 2. Backpack color | ❌ Circular | ✅ Progressive | 🟢 PASS |
| 3. Family members | ❌ Redundant | ✅ Deepening | 🟢 PASS |
| 4. Name intro | ❌ Loop | ✅ Sequential | 🟢 PASS |
| 5. Like reading | ❌ Circular | ✅ Expanding | 🟢 PASS |

---

## 🐛 POTENTIAL EDGE CASES

### Edge Case 1: Ambiguous Answers
```
Question: "Do you have books?"
Student: "yes"
→ AI should still ask "Do you have books?" (only "yes" is not specific enough)
```

### Edge Case 2: Off-topic Answers
```
Question: "What do you like to do?"
Student: "I am happy"
→ AI should re-ask or guide: "That's great! But what activities do you like?"
```

### Edge Case 3: Multiple Info in One Answer
```
Question: "Do you like playing games?"
Student: "yes I like playing games with my brother"
→ AI should detect answer AND catch "brother" for future reference
```

---

## 📝 TEST REPORT TEMPLATE

```markdown
## Test Execution Report

**Tester**: [Your Name]
**Date**: [Date]
**Environment**: localhost:5174
**Browser**: Chrome/Safari/Firefox

### Test Results:

| Scenario | Pass/Fail | Notes |
|----------|-----------|-------|
| 1. Playing games | ⬜ | |
| 2. Backpack color | ⬜ | |
| 3. Family members | ⬜ | |
| 4. Name intro | ⬜ | |
| 5. Like reading | ⬜ | |

### Issues Found:
- [ ] None
- [ ] AI still asks redundant questions in scenario: ___
- [ ] Console logs not showing expected output
- [ ] Other: ___

### Overall Assessment:
- [ ] 🟢 PASS - All scenarios work as expected
- [ ] 🟡 PARTIAL - Some scenarios need tweaking
- [ ] 🔴 FAIL - Major issues, needs revision

### Recommendations:
[Your feedback here]
```

---

## 🚀 ACCEPTANCE CRITERIA

**Definition of Done:**
- [x] Code changes deployed to dev server
- [x] All 5 test scenarios documented
- [ ] At least 3/5 scenarios PASS in testing
- [ ] No regression in existing conversation flow
- [ ] Console logs confirm smart context check is running
- [ ] User feedback: "AI feels more natural"

**Ready for Production when:**
- [ ] All 5/5 scenarios PASS
- [ ] QA team approval
- [ ] No critical bugs in 48-hour testing window
- [ ] Performance impact < 100ms per turn

---

**Status**: 🟡 **READY FOR QA TESTING**  
**Next Step**: Run test scenarios and fill out Test Report
