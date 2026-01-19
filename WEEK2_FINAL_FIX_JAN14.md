# Week 2 AI Tutor - Final Fix Report
**Date:** January 14, 2026  
**Status:** ✅ COMPLETE

## 🎯 Issues Addressed

### Issue 1: Mission Turns Too Short (5 vs 15 Required)
**Problem:** Week 2 missions ended at turn 5-6, but minimum requirement is 15 turns per mission.

**Root Cause:**
- `turnManager.js` only had 6-7 steps per Week 2 mission
- Goodbye step was reached too early
- Not enough conversation depth

**Solution:**
- Expanded all 3 Week 2 missions from 6-7 steps to **15 steps each**
- Added more granular questions to explore topics fully
- Each mission now has proper conversation depth

**Before:**
```javascript
'family_1': [  // 6 steps only
  { key: 'family_members', question: 'Who lives in your home?' },
  { key: 'mother', question: 'Tell me about your mother' },
  { key: 'father', question: 'Tell me about your father' },
  { key: 'siblings', question: 'Do you have brothers or sisters?' },
  { key: 'family_size', question: 'Is your family big or small?' },
  { key: 'family_names', question: 'What are their names?' },
  { key: 'goodbye', question: null }
]
```

**After:**
```javascript
'family_1': [  // 15 steps - proper depth
  { key: 'family_members', question: 'Who lives in your home?' },
  { key: 'have_mother', question: 'Do you have a mother?' },
  { key: 'mother_name', question: 'What is your mother name?' },
  { key: 'mother_nice', question: 'Is your mother nice?' },
  { key: 'have_father', question: 'Do you have a father?' },
  { key: 'father_name', question: 'What is your father name?' },
  { key: 'father_strong', question: 'Is your father strong?' },
  { key: 'have_siblings', question: 'Do you have a brother?' },
  { key: 'have_sister', question: 'Do you have a sister?' },
  { key: 'sibling_name', question: 'What is your brother name?' },
  { key: 'family_big', question: 'Is your family big?' },
  { key: 'live_together', question: 'Do you live together?' },
  { key: 'love_family', question: 'Do you love your family?' },
  { key: 'family_nice', question: 'Is your family nice?' },
  { key: 'goodbye', question: null }
]
```

---

### Issue 2: Questions Too Complex for A0++ Level
**Problem:** Questions like "What do you love about your family?" are IELTS 5.0 level, not A0++ beginner level.

**A0++ Requirements (from Blueprint):**
- 7-16 words per question
- Simple yes/no questions or basic "What is..." questions
- No "Why", "How", complex constructions
- Must be answerable with 1-5 words

**Changes Made:**

| ❌ TOO COMPLEX (Before) | ✅ A0++ SIMPLE (After) |
|------------------------|----------------------|
| Tell me about your mother | Do you have a mother? |
| Do you have brothers or sisters? | Do you have a brother? |
| Is your family big or small? | Is your family big? |
| What are their names? | What is your mother name? |
| Why do you love your family? | Do you love your family? |
| What makes your family special? | Is your family kind? |
| When are you happy with family? | Are you happy? |
| What does your family do together? | Do you play together? |
| How do you help your family? | Do you help at home? |
| What does your mother do? | Does mother cook? |
| Who is the team leader? | Who is the leader? |

**Pattern Analysis:**
- ✅ **Yes/No questions:** "Do you have a mother?" → "Yes/No"
- ✅ **Simple "What is":** "What is your name?" → "My name is..."
- ✅ **Simple "Who":** "Who is the leader?" → "My father"
- ✅ **Simple descriptions:** "Is mother nice?" → "Yes, nice"
- ❌ **Avoid "Why":** Requires explanation (A1+ level)
- ❌ **Avoid "How":** Requires process description
- ❌ **Avoid "Tell me about":** Open-ended, too complex

---

### Issue 3: FreeTalk Using Wrong Week Knowledge
**Problem:** Week 2 FreeTalk was asking Week 1 school questions instead of Week 2 family questions.

**Console Evidence:**
```
FreeTalkTab.jsx: You are a student. What is in your backpack?  // ❌ Week 1!
weekData.js:27 ✅ Loaded REAL syllabus data for Week 1  // ❌ Wrong week!
```

**Root Cause:**
- FreeTalk tab loaded default Week 1 knowledge
- No `freetalk_knowledge` field in week data files
- Prompt library didn't check for week-specific freetalk context

**Solution:**

**1. Added `freetalk_knowledge` to Week 1:**
```javascript
freetalk_knowledge: {
  week_title: "Hello, World! (Identity)",
  week_number: 1,
  theme: "Introduction & School",
  
  knowledge_base: [
    "We introduce ourselves: 'I am [name]', 'I am [age] years old'",
    "We are students who go to school",
    "We have backpacks with books and notebooks",
    // ... 8 total knowledge points
  ],
  
  example_opening_questions: [
    "What is your name?",
    "How old are you?",
    "Are you a student?",
    // ... school-related questions
  ],
  
  freetalk_context: `Week 1 is about IDENTITY and SCHOOL...`
}
```

**2. Added `freetalk_knowledge` to Week 2:**
```javascript
freetalk_knowledge: {
  week_title: "My Family Squad",
  week_number: 2,
  theme: "Family and Home",
  
  knowledge_base: [
    "Family members: mother, father, brother, sister, family",
    "Families live together in homes",
    "Families help each other like a team",
    // ... 8 total knowledge points
  ],
  
  example_opening_questions: [
    "Do you have a family?",
    "Who lives in your home?",
    "Do you have a mother?",
    // ... family-related questions
  ],
  
  freetalk_context: `Week 2 is about FAMILY...`
}
```

**3. Updated promptLibrary.js to use week-specific knowledge:**
```javascript
export function buildFreeTalkPrompt({ weekData, userName, userAge, scaffoldingLevel = 2 }) {
  // ... existing code ...
  
  // 🔥 NEW: Extract week-specific freetalk knowledge
  const freetalkData = weekData?.freetalk_knowledge || null;
  const weekTitle = freetalkData?.week_title || 'Week 1';
  const weekNumber = freetalkData?.week_number || 1;
  
  // Week-specific knowledge base
  let weekKnowledge = '';
  if (freetalkData && freetalkData.knowledge_base) {
    weekKnowledge = `
**WEEK ${weekNumber} KNOWLEDGE BASE:**
${freetalkData.knowledge_base.map((k, i) => `${i+1}. ${k}`).join('\n')}

**WEEK ${weekNumber} OPENING QUESTIONS:**
${freetalkData.example_opening_questions.map(q => `- ${q}`).join('\n')}

**WEEK ${weekNumber} CONTEXT:**
${freetalkData.freetalk_context}`;
  }
  
  return `${persona}
**CURRENT WEEK: Week ${weekNumber} - ${weekTitle}**
${weekKnowledge}
...`;
}
```

**Expected Behavior Now:**

**Week 1 FreeTalk:**
- "What is your name?"
- "Are you a student?"
- "What is in your backpack?"
- "Who is your teacher?"

**Week 2 FreeTalk:**
- "Do you have a family?"
- "Who lives in your home?"
- "Do you have a mother?"
- "Do you love your family?"

---

## 📊 Complete Changes Summary

### Files Modified:

1. **`/src/services/ai_tutor/turnManager.js`** ✅
   - Expanded Week 2 Mission 1 from 6 to **15 steps**
   - Expanded Week 2 Mission 2 from 6 to **15 steps**
   - Expanded Week 2 Mission 3 from 5 to **15 steps**
   - Simplified all questions to A0++ level

2. **`/src/data/weeks/week_01_real.js`** ✅
   - Added `freetalk_knowledge` section
   - 8 knowledge base points about identity & school
   - 8 example opening questions
   - Detailed freetalk context

3. **`/src/data/weeks/week_02_real.js`** ✅
   - Added `freetalk_knowledge` section
   - 8 knowledge base points about family
   - 7 example opening questions
   - Detailed freetalk context
   - Added `global_vocab` section

4. **`/src/services/ai_tutor/promptLibrary.js`** ✅
   - Updated `buildFreeTalkPrompt()` function
   - Now extracts and uses week-specific freetalk knowledge
   - Dynamically adapts conversation topics to current week
   - Shows week number and theme in prompts

---

## 🎯 Week 2 Mission Details

### Mission 1: Meet the Family Squad (15 turns)
**Topic:** Family introductions  
**Pattern:** "This is my [family member]"

**Questions (A0++ Level):**
1. Who lives in your home?
2. Do you have a mother?
3. What is your mother name?
4. Is your mother nice?
5. Do you have a father?
6. What is your father name?
7. Is your father strong?
8. Do you have a brother?
9. Do you have a sister?
10. What is your brother name?
11. Is your family big?
12. Do you live together?
13. Do you love your family?
14. Is your family nice?
15. (Goodbye)

### Mission 2: Teamwork at Home (15 turns)
**Topic:** Family activities and helping  
**Pattern:** "We [verb] together"

**Questions (A0++ Level):**
1. Do you play together?
2. Do you eat together?
3. Does mother cook?
4. Does father work?
5. Do you help at home?
6. Do you clean?
7. Do you help cook?
8. Do you watch TV together?
9. Who is the leader?
10. Is your family a good team?
11. Do you help mother?
12. Do you help father?
13. Do you work together?
14. Are you happy?
15. (Goodbye)

### Mission 3: Love and Feelings (15 turns)
**Topic:** Expressing love for family  
**Pattern:** "I love my [family member]"

**Questions (A0++ Level):**
1. Do you love your family?
2. Do you love mother?
3. Do you love father?
4. Is mother nice?
5. Is father nice?
6. Is your family kind?
7. Is your family fun?
8. Are you happy?
9. Do you hug your family?
10. Do you kiss mother?
11. Do you say I love you?
12. Does your family help you?
13. Do you feel good?
14. Is your family the best?
15. (Goodbye)

---

## ✅ Testing Checklist

**Story Missions:**
- [ ] Week 2 Mission 1 reaches 15 turns (not 5)
- [ ] Week 2 Mission 2 reaches 15 turns
- [ ] Week 2 Mission 3 reaches 15 turns
- [ ] All questions are A0++ simple (yes/no, basic What/Who)
- [ ] Hints are 1-5 words maximum
- [ ] Console shows: `family_members → mother → father → siblings...` (15 steps)

**FreeTalk:**
- [ ] Week 1 FreeTalk asks school questions ("Are you a student?")
- [ ] Week 2 FreeTalk asks family questions ("Do you have a family?")
- [ ] Console shows: `✅ Loaded REAL syllabus data for Week 2` (not Week 1!)
- [ ] Opening question is family-related, not school-related
- [ ] Hints include family words: mother, father, brother, sister

---

## 🔍 Verification Commands

**Check Week 2 Steps:**
```javascript
// In browser console:
console.log(turnManager.getMissionSteps(1, 'Meet the Family Squad'));
// Should show 15 steps
```

**Check FreeTalk Knowledge:**
```javascript
// In browser console:
import week2Data from './src/data/weeks/week_02_real.js';
console.log(week2Data.freetalk_knowledge);
// Should show Week 2 family knowledge
```

---

## 📝 Key Lessons Learned

1. **A0++ = VERY SIMPLE:** If a 6-year-old can't answer with 1-5 words, it's too complex
2. **Turn Count Matters:** 15 turns minimum enforces proper conversation depth
3. **Week-Specific Knowledge:** Each week needs its own freetalk context
4. **Avoid Complex Questions:** No "Why", "How", "Tell me about" - stick to Yes/No and simple What/Who
5. **One Question = One Step:** Don't combine multiple questions ("Do you have brothers or sisters?")

---

## 🚀 Next Steps

1. **Test Week 2 Story Missions** - Verify 15 turns minimum
2. **Test Week 2 FreeTalk** - Verify family questions (not school)
3. **Hard Refresh Browser** - Cmd+Shift+R to clear cache
4. **Check Console Logs** - Look for "Week 2" and "family_members → ..." steps
5. **Apply Same Pattern to Week 3+** - Use this template for future weeks

---

**Implementation Complete:** January 14, 2026  
**Ready for Testing:** ✅
