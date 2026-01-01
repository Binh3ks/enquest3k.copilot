# Story Mission Scaffolding Plan

## Overview

This document outlines the progressive mission structure for EngQuest ESL App Story Mission feature. The plan scales from **3 missions per week** (Phase 1.1) to **7 missions per week** (Phase 2+) based on student proficiency development.

---

## Mission Quantity by Phase

### Phase 1.1: Weeks 1-14 (Foundation)
**3 Missions per Week**

- **Easy Mission** (4 steps)
  - Core vocabulary only (6-8 words)
  - Simple grammar structures
  - Single sentence responses
  - Max 5 minutes completion time

- **Normal Mission** (6 steps)  
  - Full week vocabulary (10-12 words)
  - Compound sentences introduced
  - Connected turns (reference previous answers)
  - Max 8 minutes completion time

- **Challenge Mission** (8 steps)
  - Bonus vocabulary (14-16 words total)
  - Multi-turn storytelling
  - Personal expression encouraged
  - Max 12 minutes completion time

**Rationale:** Vietnamese ESL A0++ learners (6-12 years old) need time to build confidence. Three missions provide adequate practice without overwhelming beginners.

---

### Phase 1.2: Weeks 15-28 (Expansion)
**5 Missions per Week**

Add 2 new mission types:

- **Easy, Normal, Challenge** (continue from Phase 1.1)

- **Review Mission** (6 steps)
  - Mix vocabulary from previous 4 weeks
  - Spiral review of grammar patterns
  - "Remember when..." prompts to activate prior knowledge
  - Max 8 minutes completion time

- **Creative Mission** (6 steps)
  - Student chooses conversation topic from 3 options
  - Apply week's vocabulary to personal interests
  - More open-ended questions
  - Max 10 minutes completion time

**Rationale:** After 14 weeks, students need review to consolidate learning and creative expression to maintain motivation.

---

### Phase 2+: Weeks 29+ (Advanced)
**7 Missions per Week**

Add 2 new mission types:

- **Easy, Normal, Challenge, Review, Creative** (continue from Phase 1.2)

- **Debate Mission** (8 steps)
  - Agree/disagree with simple statements
  - "I think..." and "I don't think..." patterns
  - Compare two options (A vs B)
  - Max 12 minutes completion time

- **Project Mission** (10 steps)
  - Multi-turn planning task (e.g., "Plan a school event")
  - Sequential steps with dependencies
  - Use past missions' vocabulary in new context
  - Max 15 minutes completion time

**Rationale:** Advanced learners (A1/A2 level) need critical thinking tasks and extended discourse practice.

---

## Mission Level Definitions

### Easy Missions
- **Steps:** 4 steps
- **Grammar:** Single structure per mission (e.g., "I am", "I have")
- **Vocabulary:** 6-8 core words
- **Response type:** Fill-in-the-blank, yes/no, single word
- **Scaffolding:** High (Levels 1-4 hints always available)
- **Target audience:** Students struggling with week's content

### Normal Missions
- **Steps:** 6 steps
- **Grammar:** 2 structures per mission (e.g., "I am" + "I have")
- **Vocabulary:** 10-12 words
- **Response type:** Short sentences (5-7 words)
- **Scaffolding:** Medium (Levels 2-4 hints available)
- **Target audience:** Average learners following syllabus pace

### Challenge Missions
- **Steps:** 8 steps
- **Grammar:** 3 structures, introduce new pattern at step 5
- **Vocabulary:** 14-16 words (includes bonus words)
- **Response type:** Compound sentences (8-10 words)
- **Scaffolding:** Low (Levels 3-4 hints only)
- **Target audience:** Advanced students ready for extra challenge

---

## Grammar Constraints by Phase

### Phase 1.1: Weeks 1-14
**Present Simple ONLY**
- Affirmative: I am, you are, he/she is, we/they are
- Negative: I am not, you are not
- Questions: Are you...? Is he/she...?
- NO past tense (was/were/did)
- NO future (will/going to)
- NO modals (can/could/should)

### Phase 1.2: Weeks 15-28
**Add Present Continuous**
- I am playing, you are reading
- What are you doing?
- NO past continuous yet

### Phase 2+: Weeks 29+
**Add Simple Past**
- I played, you went
- Past questions: Did you...?
- NO past perfect yet

---

## Vocabulary Scope by Week Type

### Regular Weeks (Weeks 1-14, 29+)
- **Core vocabulary:** 10 words per week (from syllabus_database.js)
- **Bonus vocabulary:** 4 words per week (Challenge missions only)
- **Recycled vocabulary:** 6 words from previous weeks

### Review Weeks (Every 4th week in Phase 1.2+)
- **No new vocabulary**
- **Mix vocabulary from previous 4 weeks:** 40 words total
- **Focus on consolidation and retention**

---

## Success Criteria by Mission Type

### Easy Missions
- Complete 4/4 steps
- Use 4/6 target vocabulary words
- Grammar accuracy: 60%+ (allow errors)
- Completion rate: 80%+ of attempts

### Normal Missions  
- Complete 5/6 steps (allow 1 skip)
- Use 6/10 target vocabulary words
- Grammar accuracy: 70%+
- Completion rate: 70%+ of attempts

### Challenge Missions
- Complete 6/8 steps (allow 2 skips)
- Use 8/14 target vocabulary words
- Grammar accuracy: 75%+
- Completion rate: 60%+ of attempts

---

## Mission Naming Convention

**Format:** `weekX_topic_level.js`

**Examples:**
- `week1_first_day.js` (Normal - default)
- `week1_my_classroom_easy.js`
- `week1_school_friends_challenge.js`
- `week5_review.js` (Review mission)
- `week10_creative_my_hobby.js` (Creative mission)
- `week30_debate_pets.js` (Debate mission)
- `week30_project_school_event.js` (Project mission)

---

## Implementation Priority

### Immediate (Weeks 1-4)
- ✅ Week 1: 3 missions (First Day, My Classroom, School Friends)
- ⏳ Week 2: 3 missions (Family, Home, Colors)
- ⏳ Week 3: 3 missions (Food, Drinks, Snacks)
- ⏳ Week 4: 3 missions (Body Parts, Feelings, Health) + **Review Mission #1**

### Short-term (Weeks 5-14)
- Create remaining Phase 1.1 missions (10 weeks × 3 = 30 missions)
- Total: 42 missions (including 3 review missions at weeks 4, 8, 12)

### Medium-term (Weeks 15-28)
- Expand to 5 missions per week
- Add Creative mission types
- Total: 70 missions (14 weeks × 5)

### Long-term (Weeks 29+)
- Expand to 7 missions per week
- Add Debate and Project mission types
- Scale with syllabus expansion (up to 52 weeks)

---

## Student Context Integration

All missions MUST include Vietnamese ESL A0++ context in AI prompts:

```javascript
// novaPromptBuilder.js - System Prompt
STUDENT PROFILE (CRITICAL):
- Age: 6-12 years old Vietnamese children
- Native language: Vietnamese (NO prior English exposure)
- Proficiency: A0++ (Absolute beginner+)
- Cultural context: Vietnamese classroom
- Attention span: 30-45 seconds per interaction
- Learning style: Visual learners, need repetition and emojis
```

---

## Quality Assurance Checklist

Before deploying any mission:

- [ ] Grammar constraints match phase (no past tense in Phase 1.1)
- [ ] Vocabulary aligns with syllabus_database.js for that week
- [ ] Sentences MAX 10 words for Weeks 1-4
- [ ] NO idioms, metaphors, or cultural references
- [ ] Emojis used appropriately (1-2 per turn)
- [ ] AI prompts include full question at end
- [ ] `task` field properly extracted
- [ ] Success criteria realistic for level
- [ ] Hints scaffolded across 4 levels
- [ ] Model sentences provided for each step
- [ ] `modelModify` instructions clear

---

## Future Enhancements

### Adaptive Missions (Post-Phase 2)
- AI adjusts difficulty based on student performance
- Skip Easy missions if 3 Normal missions completed with 85%+ accuracy
- Unlock Challenge missions early for advanced students

### Collaborative Missions (Post-Phase 2)
- Pair missions: 2 students work together
- Classroom missions: Whole class participates
- Teacher moderates, AI facilitates

### Story Continuation (Post-Phase 1)
- Missions connect across weeks (e.g., "Remember your friend Linh? Where is she today?")
- Character development (Ms. Nova references previous conversations)
- Long-term memory integration

---

## Technical Notes

### Mission Schema
All missions use `createMission()` from [missionSchema.js](src/data/missions/missionSchema.js):
- Validates grammar rules
- Enforces vocabulary limits
- Checks step consistency

### Engine Integration
[storyMissionEngine.js](src/services/aiTutor/storyMissionEngine.js) handles:
- Turn generation with AI (Gemini)
- TTS audio (OpenAI)
- State management
- Vocabulary tracking

### UI Component
[StoryMissionTab.jsx](src/modules/ai_tutor/tabs/StoryMissionTab.jsx):
- Displays mission list
- Shows current conversation
- Scaffolding hints (4 levels)
- Voice input/output

---

## Revision History

- **2025-01-06**: Initial plan created
  - Phase 1.1: 3 missions/week (Weeks 1-14)
  - Phase 1.2: 5 missions/week (Weeks 15-28)
  - Phase 2+: 7 missions/week (Weeks 29+)
  - Vietnamese ESL A0++ context integrated

---

**Status:** Active Development
**Last Updated:** 2025-01-06
**Owner:** EngQuest Dev Team
