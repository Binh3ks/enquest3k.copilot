# 🎭 ROLEPLAY RESPONSE PATTERN FIX - FEB 2, 2026

## ❌ VẤN ĐỀ PHÁT HIỆN

**User report:** "Tuần 2 là golden standard thì phải hiệu chỉnh cho thật hoàn thiện. Câu mở đầu thì tốt vì hardcoded, nhưng các câu sau AI tạo ra thì không đúng template."

**Roleplay session analysis (Week 2 - Family Dinner Time):**

```
Turn 1: "Dinner smells good! Who cooked this food? Your mother, your father, or you?"
✅ GOOD: Opening line (hardcoded from week_02_real.js)

Turn 2: 
Student: "My mother"
AI: "Your mother is kind. What does your father do?"
❌ PROBLEM: Assumes mother is "kind" when student only said "My mother"

Turn 3:
Student: "he works in an office"  
AI: "He works in an office. Is he happy?"
❌ PROBLEM: Just repeats user input verbatim, doesn't add value

Turn 4:
Student: "yes he is happy"
AI: "Your family is happy. Do you have a brother or a sister?"
✅ ACCEPTABLE: But still a bit abrupt

Turn 5:
Student: "I have a brother"
AI: "Your brother is happy. What does he do?"
❌ PROBLEM: Assumes "brother is happy" when student NEVER said that
```

## 🔍 ROOT CAUSE ANALYSIS

### Issue 1: Making Assumptions
AI adds information student never provided:
- Student: "I have a brother" → AI: "Your brother is happy"
- Student: "My mother" → AI: "Your mother is kind"

### Issue 2: Parroting Without Value
AI repeats exact student input:
- Student: "he works in an office" → AI: "He works in an office. Is he happy?"
- No correction, no expansion, no pedagogical value

### Issue 3: Weak ACK + RECAST Pattern
Current prompt has ACK + RECAST guidance but not strict enough:
```
📝 ACK + RECAST PATTERN:
- When user gives SHORT answer ("a big sofa", "green"), acknowledge it and RECAST as full sentence
- Example: User: "a big sofa" → You: "A big sofa! Great choice. I want a big sofa too."
```

This works for GAMES but not for ROLEPLAY. Roleplay needs:
1. Brief acknowledgment
2. ONE expansion/detail
3. NEW different question

## ✅ GIẢI PHÁP TRIỂN KHAI

### 1. **Enhanced ROLEPLAY Prompt Template**
**File:** `src/services/ai_tutor/tutorPrompts.js`

**Added strict 3-step response formula:**

```javascript
📝 STRICT ACK + RECAST PATTERN (CRITICAL FOR WEEK 2):
🚨 STEP-BY-STEP RESPONSE FORMULA:

STEP 1 - ACKNOWLEDGE: Repeat ONLY what student said (don't add assumptions!)
STEP 2 - RECAST/CORRECT: If grammar wrong, show correct version
STEP 3 - NEW QUESTION: Ask a DIFFERENT question (not about same thing)

✅ CORRECT EXAMPLES:

Example 1:
Student: "My mother"
❌ WRONG: "Your mother is kind. What does your father do?"
✅ RIGHT: "Your mother! Good. Your mother cooks the dinner. What does your father do?"

Example 2:
Student: "he works in an office"
❌ WRONG: "He works in an office. Is he happy?"
✅ RIGHT: "Good! He works in an office. What does your mother do?"

Example 3:
Student: "I have a brother"
❌ WRONG: "Your brother is happy. What does he do?"
✅ RIGHT: "Good! You have a brother. What is your brother's name?"

🚨 NEVER ADD INFORMATION STUDENT DIDN'T SAY:
- Student said "I have a brother" → DON'T add "Your brother is happy"
- Student said "he works" → DON'T add assumptions about feelings
- ONLY acknowledge what they ACTUALLY said
- Then ask a NEW, DIFFERENT question
```

**Added critical response rules at end:**

```javascript
🚨 CRITICAL RESPONSE RULES:
1. DO NOT repeat student's exact words back as a statement
2. DO NOT make assumptions about information student didn't provide
3. DO acknowledge briefly, then ask a DIFFERENT question
4. Each turn must ask about something NEW
5. Keep roleplay natural and conversational
```

### 2. **Enhanced Week 2 Roleplay Guide Rules**
**File:** `src/data/weeks/week_02_real.js`

**Updated all 3 roleplay scenarios with explicit response patterns:**

#### Family Dinner Time 🍽️ (rp_family_dinner)
```javascript
guide_rules: `Be polite and curious dinner guest. 

🚨 RESPONSE PATTERN (MANDATORY):
1. ACKNOWLEDGE BRIEFLY: "Good!" or "I see!" or "Nice!"
2. RECAST/EXPAND: Add ONE more detail about what they said
3. ASK NEW QUESTION: Must be DIFFERENT from previous questions

EXAMPLES:
- Student: "My mother" → You: "Good! Your mother cooks. What does your father do?"
- Student: "he works" → You: "I see! He works. Where does he work?"
- Student: "yes he is happy" → You: "Great! He is happy. Do you have a brother or a sister?"

🚨 NEVER DO THIS:
❌ DON'T repeat their answer as statement: "He works in an office. Is he happy?"
❌ DON'T make assumptions: "Your brother is happy" (when they only said "I have a brother")
❌ DON'T ask about the SAME thing twice

Focus: Ask about family routines, who helps, what everyone does. React positively. Always end with a question using OR options.`
```

#### Family Photo Album 📷 (rp_family_photo)
```javascript
guide_rules: `Accept any family member answer. React warmly ('Beautiful!', 'Wonderful!'). 

🚨 RESPONSE PATTERN:
1. ACKNOWLEDGE: "Beautiful!" or "Wonderful!"
2. EXPAND: Add ONE detail about that person
3. ASK NEW: Ask about a DIFFERENT family member

EXAMPLES:
- Student: "My mother" → You: "Wonderful! Your mother is kind. What is your father like?"
- Student: "he is strong" → You: "Great! Your father is strong. Do you have a brother or sister?"

🚨 DON'T make assumptions. DON'T repeat same questions. Focus on adjectives: kind, happy, strong, smart, funny. Always end with question using OR options.`
```

#### Weekend with Family 🎉 (rp_weekend_family)
```javascript
guide_rules: `Be enthusiastic and supportive. 

🚨 RESPONSE PATTERN:
1. REACT POSITIVELY: "Fun!" or "Nice!" or "Great!"
2. ACKNOWLEDGE: Briefly mention what they said
3. ASK NEW: Ask about DIFFERENT activity or family member

EXAMPLES:
- Student: "play together" → You: "Fun! You play together. What do you play?"
- Student: "we eat" → You: "Nice! You eat together. Is your family happy?"

🚨 DON'T assume feelings. DON'T repeat questions. Ask about activities and feelings. Always give OR options in questions.`
```

## 📊 EXPECTED RESULTS

### **Trước khi fix:**
```
Student: "My mother"
AI: "Your mother is kind. What does your father do?"
❌ Assumes "kind" without basis

Student: "I have a brother"
AI: "Your brother is happy. What does he do?"
❌ Assumes "happy" without basis
```

### **Sau khi fix:**
```
Student: "My mother"
AI: "Good! Your mother cooks the dinner. What does your father do?"
✅ Acknowledges + adds realistic detail + asks new question

Student: "I have a brother"
AI: "Good! You have a brother. What is your brother's name?"
✅ Acknowledges only what was said + asks different question
```

## 🎓 QUY TẮC SƯ PHẠM

**ACK + RECAST Pattern for Roleplay:**
1. **ACKNOWLEDGE**: Brief positive reaction ("Good!", "Nice!", "I see!")
2. **RECAST/EXPAND**: Add ONE detail related to context (not assumptions!)
3. **NEW QUESTION**: Must be DIFFERENT topic from last question

**DON'T:**
- ❌ Make assumptions about information student didn't provide
- ❌ Repeat student's exact words back as statement
- ❌ Ask same question twice
- ❌ Assume feelings ("is happy", "is kind") without student saying it

**DO:**
- ✅ Acknowledge briefly what student ACTUALLY said
- ✅ Add contextual detail based on scenario (dinner → cooking, photo → appearance)
- ✅ Ask about NEW topic each turn
- ✅ Use OR options in questions to guide student

## 🔧 FILES CHANGED

1. **src/services/ai_tutor/tutorPrompts.js** (Lines 760-850)
   - Enhanced ACK + RECAST pattern with strict 3-step formula
   - Added WRONG vs RIGHT examples for each step
   - Added critical response rules at end

2. **src/data/weeks/week_02_real.js** (Lines 1335-1400)
   - Updated `rp_family_dinner` guide_rules with mandatory response pattern
   - Updated `rp_family_photo` guide_rules with response pattern
   - Updated `rp_weekend_family` guide_rules with response pattern

## ✅ TESTING PLAN

**Test Scenario:** Week 2 - Family Dinner Time roleplay

**Test Conversation:**
```
AI: "Dinner smells good! Who cooked this food? Your mother, your father, or you?"
User: "My mother"
✅ Expected: "Good! Your mother cooks. What does your father do?"
❌ Not: "Your mother is kind. What does your father do?"

User: "he works"
✅ Expected: "I see! He works. Where does he work? At home or in an office?"
❌ Not: "He works in an office. Is he happy?"

User: "I have a brother"
✅ Expected: "Nice! You have a brother. What is your brother's name?"
❌ Not: "Your brother is happy. What does he do?"
```

**Success Criteria:**
- ✅ AI acknowledges only what student said
- ✅ AI adds contextual detail (not assumptions)
- ✅ AI asks NEW question each turn
- ✅ No repetition of previous questions
- ✅ No assumptions about feelings/traits

## 🚀 DEPLOYMENT

1. **Clear browser cache:** Use `clear_all_jan30.html`
2. **Restart Vite dev server:** `npm run dev`
3. **Test roleplay:** Week 2 → AI Tutor → Chat tab → Roleplay 🎭
4. **Select:** "Family Dinner Time 🍽️"
5. **Verify:** AI responses follow 3-step pattern

## 📝 STATUS

**Roleplay Response Pattern Enhancement:** IMPLEMENTED ✅
**Week 2 Guide Rules Updated:** COMPLETE ✅
**Testing:** PENDING USER VERIFICATION ⏳

---

**Next Steps:**
1. Test in browser with Week 2 roleplay scenarios
2. Monitor console logs for compliance
3. If successful, apply same pattern to Week 3-7 roleplays
4. Document as standard for future week content generation
