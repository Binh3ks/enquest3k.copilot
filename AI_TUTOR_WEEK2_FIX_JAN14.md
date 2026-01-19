# AI TUTOR WEEK 2 FIX - January 14, 2026 (3:15 PM)

## 🔴 VẤN ĐỀ: Week 2 hiển thị missions của Week 1

**Screenshot Evidence:**
User đang ở Week 2 "My Family Squad" nhưng AI Tutor hiển thị:
- Mission 1: "First Day at School" ❌ (Week 1)
- Mission 2: "What's in Your Backpack?" ❌ (Week 1)  
- Mission 3: "Meeting Your Teacher" ❌ (Week 1)

**Expected (Week 2):**
- Mission 1: "Meet the Family Squad" ✅
- Mission 2: "Team Work at Home" ✅
- Mission 3: "Love at Home" ✅

---

## 🔍 ROOT CAUSE ANALYSIS

### Schema Mismatch Between Week Files

**Week 1 Schema:**
```javascript
// src/data/weeks/week_01_real.js
export const week1RealData = {
  story_missions: [  // ✅ snake_case
    {
      mission_id: 1,   // ✅ Has mission_id
      title: "First Day at School",
      nova_greeting: "Hello! I am Ms. Nova..."
    }
  ]
}
```

**Week 2 Schema (WRONG):**
```javascript
// src/data/weeks/week_02_real.js
export default {
  storyMissions: [  // ❌ camelCase - component tìm story_missions!
    {
      id: 1,          // ❌ Uses 'id' not 'mission_id'
      title: "Meet the Family Squad",
      // ❌ Missing nova_greeting
      // ❌ Missing title_vi
    }
  ]
}
```

**Component Expectations:**
```javascript
// src/modules/ai_tutor/tabs/StoryMissionTab.jsx (line 58)
const weekRealData = weekNumber === 1 ? week1RealData : week2RealData;
const currentMission = weekRealData.story_missions?.[currentMissionIndex];
//                                    ^^^^^^^^^^^^^^^ 
//                     Component expects 'story_missions' (snake_case)
```

**What Happened:**
1. User navigates to Week 2
2. Component loads `week2RealData`
3. Looks for `week2RealData.story_missions` → **undefined** (because it's `storyMissions`)
4. Falls back to empty array or Week 1 data
5. Displays Week 1 missions instead

---

## ✅ FIX APPLIED

### Changed: `/src/data/weeks/week_02_real.js`

**Before:**
```javascript
export default {
  storyMissions: [  // ❌ Wrong key
    { id: 1, title: "Meet the Family Squad" }  // ❌ Missing fields
  ]
}
```

**After:**
```javascript
export default {
  story_missions: [  // ✅ Correct key (snake_case)
    {
      mission_id: 1,  // ✅ Correct field
      title: "Meet the Family Squad",
      title_vi: "Gặp Biệt Đội Gia Đình",  // ✅ Added Vietnamese
      nova_greeting: "Hello! I am Ms. Nova, your AI English coach. Today, we're going to talk about families! Can you tell me about your family?",  // ✅ Added greeting
      scenario: "You visit your friend's house and meet their family members",
      task: "Introduce each family member using 'This is my...'",
      vocabulary_focus: ["mother", "father", "brother", "sister", "family"],
      success_criteria: "Student introduces 3 or more family members correctly"
    },
    {
      mission_id: 2,
      title: "Team Work at Home",
      title_vi: "Làm Việc Nhóm Ở Nhà",
      nova_greeting: "Hi again! Families work together like a team. What does your family do together?",
      // ... full fields
    },
    {
      mission_id: 3,
      title: "Love at Home",
      title_vi: "Yêu Thương Ở Nhà",
      nova_greeting: "Let's talk about love! What do you love about your family?",
      // ... full fields
    }
  ]
}
```

---

## 📊 SCHEMA REQUIREMENTS FOR ALL WEEKS

### Mandatory Structure (week_XX_real.js)

```javascript
export default {
  id: X,  // Week number
  title: "Week Title",
  theme: "Theme name",
  
  // ✅ MUST be 'story_missions' (snake_case)
  story_missions: [
    {
      // ✅ MUST have these fields:
      mission_id: 1,           // NOT 'id'
      title: "Mission Title",
      title_vi: "Tiêu đề",     // Vietnamese translation
      nova_greeting: "Hello! I am Ms. Nova...",  // AI's opening line
      
      // ✅ Additional required fields:
      scenario: "Context for mission",
      task: "What student should do",
      vocabulary_focus: ["word1", "word2"],
      success_criteria: "How to complete mission"
    }
    // ... more missions
  ],
  
  // ✅ Other required fields:
  targetVocabulary: [...],
  grammarFocus: {...},
  pronunciationFocus: {...},
  freeTalkScenarios: [...]
}
```

### Fields Comparison

| Field | Week 1 ✅ | Week 2 Before ❌ | Week 2 After ✅ |
|-------|----------|------------------|----------------|
| Array key | `story_missions` | `storyMissions` | `story_missions` |
| Mission ID | `mission_id` | `id` | `mission_id` |
| Vietnamese title | `title_vi` | Missing | `title_vi` |
| AI greeting | `nova_greeting` | Missing | `nova_greeting` |

---

## 🧪 TESTING

### Test in Browser:

1. **Navigate to Week 2:**
   - URL: http://localhost:5174/week/2/read_explore
   - Click "Ms. Nova" AI Tutor button

2. **Click Story Tab:**
   - Should show "Week - Choose Your Mission"
   - Should display 3 missions:
     - ✅ "Meet the Family Squad"
     - ✅ "Team Work at Home"  
     - ✅ "Love at Home"

3. **Start Mission 1:**
   - Click "Meet the Family Squad"
   - Nova greeting: "Hello! I am Ms. Nova... talk about families!"
   - Vocabulary focus: mother, father, brother, sister, family

### Console Checks:

```javascript
// Should see in console:
✅ Loaded REAL syllabus data for Week 2
🎯 Starting Mission 1 at index 0
📋 Mission Details: {
  title: "Meet the Family Squad",
  vocabulary_focus: ["mother", "father", "brother", "sister", "family"]
}
```

---

## 📝 MASS PRODUCTION UPDATE

### Add to Generation Scripts

**File: `tools/generate_week.js`**

Add validation for week_XX_real.js:

```javascript
function validateAITutorData(weekData) {
  // ✅ Check array key is snake_case
  if (weekData.storyMissions) {
    throw new Error("Use 'story_missions' not 'storyMissions'");
  }
  
  if (!weekData.story_missions || !Array.isArray(weekData.story_missions)) {
    throw new Error("Missing story_missions array");
  }
  
  // ✅ Check each mission has required fields
  weekData.story_missions.forEach((mission, idx) => {
    const required = ['mission_id', 'title', 'title_vi', 'nova_greeting', 
                      'scenario', 'task', 'vocabulary_focus', 'success_criteria'];
    
    required.forEach(field => {
      if (!mission[field]) {
        throw new Error(`Mission ${idx + 1} missing required field: ${field}`);
      }
    });
    
    // ✅ Check uses mission_id not id
    if (mission.id && !mission.mission_id) {
      throw new Error(`Mission ${idx + 1} uses 'id' instead of 'mission_id'`);
    }
  });
  
  console.log('✅ AI Tutor data validation passed');
}
```

---

## 🎯 CHECKLIST FOR WEEK 3+

When creating new weeks, ensure:

- [ ] Use `story_missions` (NOT `storyMissions`)
- [ ] Each mission has `mission_id` (NOT `id`)
- [ ] Each mission has `title_vi` (Vietnamese)
- [ ] Each mission has `nova_greeting` (AI opening line)
- [ ] Each mission has `scenario`, `task`, `vocabulary_focus`, `success_criteria`
- [ ] Export as `export default { ... }` (not `export const`)
- [ ] File named `week_XX_real.js` (with leading zero: `week_03_real.js`)

---

**Fix Completed:** January 14, 2026 - 3:15 PM  
**Ready for Testing:** AI Tutor Story Missions Week 2  
**Files Modified:** 1 (`week_02_real.js`)
