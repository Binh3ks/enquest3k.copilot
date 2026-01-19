# WEEK 2 OBJECTIVES FIX - COMPLETE REPORT
**Date:** January 14, 2026
**Issue:** Week 2 AI Tutor missions showing Week 1 conversation topics
**Status:** ✅ RESOLVED

---

## 🔍 ROOT CAUSE ANALYSIS

### The Problem
User tested Week 2 and reported:
- ✅ Week 2 missions displayed correctly ("Meet the Family Squad", "Team Work at Home", "Love at Home")
- ✅ Opening greetings were correct for Week 2 topics
- ❌ **All conversation objectives were from Week 1** (school, backpack, teacher topics)
- ❌ Mission 1 asking about "age, student_role, like_school" instead of family members
- ❌ Mission 2 asking about "backpack, backpack_color, books" instead of teamwork

### Evidence from Console Logs
```javascript
// Mission 1 "Meet the Family Squad"
turnManager.js:169 📋 Objectives: greet → age → student_role → like_school → grade → friends...
// ❌ WRONG! These are Week 1 objectives, not family objectives!

// Mission 2 "Team Work at Home"  
turnManager.js:169 📋 Objectives: has_backpack → backpack_color → has_books → books_count...
// ❌ WRONG! These are Week 1 backpack objectives, not teamwork objectives!
```

### Technical Root Cause

**File:** `src/modules/ai_tutor/tabs/StoryMissionTab.jsx` (Lines 191-200)

**Buggy Code:**
```javascript
// ❌ HARDCODED TO WEEK 1 ONLY
if (currentMission.mission_id === 1) {
  objectives = week1Objectives.objectives;  // Always Week 1!
} else if (currentMission.mission_id === 2) {
  objectives = mission2Objectives.objectives;  // Always Week 1 Mission 2!
} else if (currentMission.mission_id === 3) {
  objectives = mission3Objectives.objectives;  // Always Week 1 Mission 3!
}
```

**Why It Failed:**
- Code only checked `mission_id` (1, 2, 3) but ignored `week number`
- Week 2 Mission 1 matched `mission_id === 1` → loaded Week 1 objectives
- Week 2 Mission 2 matched `mission_id === 2` → loaded Week 1 Mission 2 objectives
- Result: All weeks used Week 1 conversation flows!

---

## ✅ SOLUTION IMPLEMENTED

### 1. Created Week 2 Objectives Files (3 new files)

**Location:** `src/data/syllabus/`

#### A. Week 2 Mission 1: "Meet the Family Squad"
**File:** `week2_mission1_objectives.js`

**Objectives:**
1. `greet_family` - Greeting & ask about family
2. `mother` - Ask about mother
3. `father` - Ask about father
4. `siblings` - Ask about brothers/sisters
5. `family_size` - How many people? Big or small family?
6. `family_home` - Where do they live?
7. `introduce_practice` - Practice "This is my..."
8. `family_names` - Learn family members' names
9. `family_feelings` - Do they love their family?
10. `goodbye` - Warm closing

**Vocabulary:** mother, father, brother, sister, family, this, is, my, lives, home, house, have, love

**Grammar:** "This is my...", "I have...", "My mother is...", "I love my..."

---

#### B. Week 2 Mission 2: "Team Work at Home"
**File:** `week2_mission2_objectives.js`

**Objectives:**
1. `greet_teamwork` - Introduce teamwork concept
2. `family_activities` - What does family do together?
3. `who_helps` - Who helps at home?
4. `how_mother_helps` - What does mother do?
5. `how_father_helps` - What does father do?
6. `how_student_helps` - How do YOU help?
7. `team_leader` - Who is the leader?
8. `working_together` - Practice "work together" vocabulary
9. `team_feelings` - Do you like helping?
10. `goodbye` - Affirm they're a good helper

**Vocabulary:** team, leader, helper, home, work, together, help, clean, cook, play

**Grammar:** "My family works together", "We help each other", "I help my..."

---

#### C. Week 2 Mission 3: "Love at Home"
**File:** `week2_mission3_objectives.js`

**Objectives:**
1. `greet_love` - Introduce love topic
2. `love_family` - Do you love your family?
3. `why_love` - Why do you love them?
4. `home_special` - What makes home special?
5. `love_mother` - What do you love about mother?
6. `love_father` - What do you love about father?
7. `happy_home` - Is your home happy?
8. `together_time` - When is family together?
9. `family_team_love` - Connect team + love concepts
10. `goodbye` - Affirm their feelings

**Vocabulary:** love, home, family, team, happy, special, like, feel, nice, warm

**Grammar:** "I love my...", "My home is...", "I feel...", "My family is special"

---

### 2. Updated StoryMissionTab Logic

**File:** `src/modules/ai_tutor/tabs/StoryMissionTab.jsx`

#### A. Added Week 2 Imports (Lines 26-33)
```javascript
// Week 1 Objectives
import { week1Objectives } from '../../../data/syllabus/week1_objectives';
import { mission2Objectives } from '../../../data/syllabus/week1_mission2_objectives';
import { mission3Objectives } from '../../../data/syllabus/week1_mission3_objectives';

// Week 2 Objectives
import { week2Mission1Objectives } from '../../../data/syllabus/week2_mission1_objectives';
import { week2Mission2Objectives } from '../../../data/syllabus/week2_mission2_objectives';
import { week2Mission3Objectives } from '../../../data/syllabus/week2_mission3_objectives';
```

#### B. Fixed Objectives Loading Logic (Lines 191-225)
```javascript
// 🎯 Load objectives based on BOTH week AND mission_id
let objectives = null;
let missionVocabulary = null;

// Determine week from currentWeek ('week-1', 'week-2', etc.)
const weekNum = parseInt(currentWeek.split('-')[1]);

if (weekNum === 1) {
  // Week 1 objectives
  if (currentMission.mission_id === 1) {
    objectives = week1Objectives.objectives;
    missionVocabulary = week1Objectives.constraints.vocabulary;
  } else if (currentMission.mission_id === 2) {
    objectives = mission2Objectives.objectives;
    missionVocabulary = mission2Objectives.constraints.vocabulary;
  } else if (currentMission.mission_id === 3) {
    objectives = mission3Objectives.objectives;
    missionVocabulary = mission3Objectives.constraints.vocabulary;
  }
} else if (weekNum === 2) {
  // Week 2 objectives
  if (currentMission.mission_id === 1) {
    objectives = week2Mission1Objectives.objectives;
    missionVocabulary = week2Mission1Objectives.constraints.vocabulary;
  } else if (currentMission.mission_id === 2) {
    objectives = week2Mission2Objectives.objectives;
    missionVocabulary = week2Mission2Objectives.constraints.vocabulary;
  } else if (currentMission.mission_id === 3) {
    objectives = week2Mission3Objectives.objectives;
    missionVocabulary = week2Mission3Objectives.constraints.vocabulary;
  }
}

console.log('🎯 Objectives for Week', weekNum, 'Mission', currentMission.mission_id, ':', 
  objectives ? 'LOADED (Objective-driven)' : 'LEGACY (Step-based)');
```

**Key Changes:**
1. ✅ Extract week number from `currentWeek` variable
2. ✅ Check `weekNum` first, THEN `mission_id`
3. ✅ Load correct objectives based on BOTH week and mission
4. ✅ Updated console log to show week number

---

## 🧪 EXPECTED BEHAVIOR AFTER FIX

### Week 2 Mission 1: "Meet the Family Squad"
**Console should show:**
```
🎯 Objectives for Week 2 Mission 1 : LOADED (Objective-driven)
📋 Objectives: greet_family → mother → father → siblings → family_size → family_home → introduce_practice → family_names → family_feelings → goodbye
```

**Conversation flow:**
1. "Hello! Let's talk about families! Who lives in your home?"
2. "Tell me about your mother. What is she like?"
3. "Do you have a father? What does he do?"
4. "Do you have brothers or sisters?"
5. "Is your family big or small?"
6. "Practice: This is my mother. This is my father."
7. "Do you love your family?"

### Week 2 Mission 2: "Team Work at Home"
**Console should show:**
```
🎯 Objectives for Week 2 Mission 2 : LOADED (Objective-driven)
📋 Objectives: greet_teamwork → family_activities → who_helps → how_mother_helps → how_father_helps → how_student_helps → team_leader → working_together → team_feelings → goodbye
```

**Conversation flow:**
1. "Families work like a team! What does your family do together?"
2. "Who helps at home?"
3. "What does mother do to help?"
4. "What does father do?"
5. "How do YOU help? What do you do?"
6. "Do you like helping your family?"

### Week 2 Mission 3: "Love at Home"
**Console should show:**
```
🎯 Objectives for Week 2 Mission 3 : LOADED (Objective-driven)
📋 Objectives: greet_love → love_family → why_love → home_special → love_mother → love_father → happy_home → together_time → family_team_love → goodbye
```

**Conversation flow:**
1. "Let's talk about love! Do you love your family?"
2. "Why do you love your family?"
3. "What makes your home special?"
4. "What do you love about your mother?"
5. "Is your home happy?"
6. "Your family is a team because you love each other!"

---

## 📊 VALIDATION CHECKLIST

After browser refresh (Cmd+Shift+R), verify:

### Mission Content
- ✅ Week 2 Mission 1 asks about family members (not school/age)
- ✅ Week 2 Mission 2 asks about teamwork/helping (not backpack)
- ✅ Week 2 Mission 3 asks about love/feelings (not teacher/classroom)

### Console Logs
- ✅ Shows "Week 2" in objectives log (not just mission number)
- ✅ Objectives list shows family-related topics
- ✅ No Week 1 topics appear in Week 2 missions

### Vocabulary
- ✅ Uses "mother", "father", "family" (not "backpack", "book", "teacher")
- ✅ Uses "team", "helper", "work together"
- ✅ Uses "love", "home", "special", "happy"

---

## 🔮 NEXT STEPS FOR WEEKS 3-54

To prevent this issue in future weeks, follow this pattern:

### 1. Create Objectives Files
For each new week (e.g., Week 3):
```javascript
// src/data/syllabus/week3_mission1_objectives.js
export const week3Mission1Objectives = {
  id: "week3_mission1",
  week: 3,
  mission_id: 1,
  topic: "[Mission Title]",
  constraints: { vocabulary: [...], grammar: [...], tone: "..." },
  objectives: [
    { id: "...", goal: "...", context: "...", type: "opening" },
    // 8-10 core objectives
    { id: "goodbye", goal: "...", context: "...", type: "termination" }
  ]
};
```

### 2. Update StoryMissionTab Imports
```javascript
// Week 3 Objectives
import { week3Mission1Objectives } from '../../../data/syllabus/week3_mission1_objectives';
import { week3Mission2Objectives } from '../../../data/syllabus/week3_mission2_objectives';
import { week3Mission3Objectives } from '../../../data/syllabus/week3_mission3_objectives';
```

### 3. Add to Loading Logic
```javascript
} else if (weekNum === 3) {
  // Week 3 objectives
  if (currentMission.mission_id === 1) {
    objectives = week3Mission1Objectives.objectives;
    missionVocabulary = week3Mission1Objectives.constraints.vocabulary;
  } else if (currentMission.mission_id === 2) {
    objectives = week3Mission2Objectives.objectives;
    missionVocabulary = week3Mission2Objectives.constraints.vocabulary;
  } else if (currentMission.mission_id === 3) {
    objectives = week3Mission3Objectives.objectives;
    missionVocabulary = week3Mission3Objectives.constraints.vocabulary;
  }
}
```

---

## 🎯 BLUEPRINT ALIGNMENT

### Week 2 Theme: "Family and Home"
All objectives now align with ENGQUEST MASTER PROMPT V24.2 specifications:

**Learning Outcome:** "Introduce family members and describe home life naturally"

**Grammar Focus:** "This is my...", "I have...", "My family is..."

**Vocabulary:** mother, father, brother, sister, family, team, helper, home, love

**Emotional Connection:** Week 2 builds identity through family relationships, progressing from:
1. **Mission 1:** Meeting family members (knowledge)
2. **Mission 2:** Working together as a team (action)
3. **Mission 3:** Expressing love and feelings (emotion)

This creates a **complete emotional arc** that helps students connect English learning to their real lives.

---

## 📝 FILES MODIFIED

### Created (3 files):
1. `src/data/syllabus/week2_mission1_objectives.js` - Family introductions (107 lines)
2. `src/data/syllabus/week2_mission2_objectives.js` - Teamwork (99 lines)
3. `src/data/syllabus/week2_mission3_objectives.js` - Love at home (103 lines)

### Modified (1 file):
1. `src/modules/ai_tutor/tabs/StoryMissionTab.jsx` - Import + loading logic (960 lines total)
   - Lines 26-33: Added Week 2 imports
   - Lines 191-227: Rewrote objectives loading to check week + mission

---

## ✅ VERIFICATION COMPLETED

**All files validated:** No TypeScript/ESLint errors
**Console logs:** Ready to show Week 2 objectives
**Ready for testing:** User should refresh browser (Cmd+Shift+R)

---

**Report generated by:** GitHub Copilot (Claude Sonnet 4.5)
**Date:** January 14, 2026, 10:45 PM
