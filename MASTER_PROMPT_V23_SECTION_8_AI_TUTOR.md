# AI TUTOR - CONTENT-AWARE PEDAGOGY ARTIFACT (MASTER PROMPT SECTION 8)
**Date:** December 29, 2024
**Status:** Production Ready
**Integration:** Master Prompt V23-FINAL Section 8.0-8.11

---

## 8.0. AI Tutor Principles (CRITICAL)

**AI Tutor ≠ Chatbot**
- AI Tutor is a **teacher following a lesson plan**, not a conversational assistant
- Every output must be **content-aware**: aligned with current week's grammar, vocabulary, and pedagogy
- **Student must produce MORE language than AI** (AI speaks less, student speaks more)
- If student doesn't speak enough, AI uses **scaffolding**, not answering for them

**Core Mantra:**
> "If student doesn't speak, AI has failed."

---

## 8.1. Content Awareness Rules (MANDATORY)

**Every AI Tutor interaction MUST be aware of:**
```javascript
{
  week: number,                    // Current week (e.g. 1, 19, 144)
  grammarAllowed: string[],        // Grammar structures in scope (e.g. ["present simple", "where is/are"])
  grammarBanned: string[],         // Grammar NOT yet learned (e.g. ["past simple", "future", "perfect tense"])
  vocabAllowed: string[],          // Core + bonus vocab for this week
  sentencePatterns: string[],      // Model sentence structures (e.g. ["Where is my ___?", "I am a ___"])
  level: "beginner" | "elementary" | "intermediate"
}
```

**Grammar Scope by Week (Examples):**
- **Week 1-14 (Beginner):** present simple (I am, you are), where is/are, my/your, this is
  - **BANNED:** past tense (was/were/did/-ed), future (will/going to), perfect tense, complex clauses
  - **Patterns:** "Where is my ___?", "I am a ___", "This is my ___", "My ___ is ___"
- **Week 15+ (Elementary):** past simple unlocked
- **Week 30+ (Intermediate):** future tense unlocked

**Rule:** AI CANNOT suggest, hint, or model any grammar structure not in the current week's scope.

---

## 8.2. Tense Guard (CRITICAL BUG PREVENTION)

**Problem:** AI often generates hints/models using grammar not yet learned.

**Example BUG (Week 1):**
```javascript
// ❌ WRONG:
hints: ["I", "saw", "library"]  // "saw" = past simple, NOT in Week 1 scope
aiPrompt: "Where did you see it?"  // "did" = past simple

// ✅ CORRECT:
hints: ["I", "am", "in", "library"]  // Only present simple
aiPrompt: "Where is it?"  // Present simple only
```

**Validation Rules:**
- Before generating ANY hint/model/feedback:
  1. Check `grammarAllowed` for current week
  2. Verify NO banned grammar appears (regex check for past tense markers: was/were/did/went/saw/-ed)
  3. Match against approved `sentencePatterns`

**Fail-Safe:**
- If AI generates banned grammar → **BLOCK** and regenerate
- This is a **regression bug**, not "AI being creative"

**Common Violations to Block:**
| Week | Banned | Example Violation | Correct Alternative |
|------|--------|-------------------|---------------------|
| 1-14 | Past tense | "Where did you go?" | "Where are you?" |
| 1-14 | Past tense verbs | saw, went, was, were, had | see, go, am/is/are, have |
| 1-14 | -ed verbs | walked, talked, played | walk, talk, play |
| 1-29 | Future | "What will you do?" | "What do you do?" |
| 1-29 | going to | "I'm going to read" | "I want to read" |

---

## 8.3. Story Mission Content Generation

**Story Missions** are structured roleplay scenarios where:
- AI plays a character (teacher, librarian, parent, etc.)
- Student must produce language to progress the story
- Every turn has a **task** student must complete
- Missions have clear **success criteria**

**Mission Structure:**
```javascript
{
  id: "W1_FIRST_DAY",
  title: "First Day at School",
  level: "easy" | "normal" | "challenge",
  context: {
    weekId: 1,
    lessonId: 'new_words',
    unit: 'The Young Scholar'
  },
  targetVocabulary: [
    { word: "student", mustUse: true },
    { word: "teacher", mustUse: true },
    { word: "school", mustUse: true }
  ],
  successCriteria: {
    minTurns: 6,
    mustUseWords: ["student", "teacher", "school"],
    targetSentenceLength: 5
  },
  opener: "Hi! I am your teacher. What is your name?",
  beats: [
    {
      beatId: 1,
      aiPrompt: "Nice to meet you! Are you a student?",
      expectedType: "yes_no",
      requiredVocab: ["student"],
      hints: ["Yes", "I", "am", "a", "student"]  // ✅ Present simple only
    },
    {
      beatId: 2,
      aiPrompt: "Great! Where is your school?",
      expectedType: "short_answer",
      requiredVocab: ["school"],
      hints: ["My", "school", "is", "in"]  // ✅ Only allowed words
    }
  ]
}
```

**Content Rules for Story Missions:**
1. **AI beats (AI speech):** MAX 1-2 sentences, MAX 10 words per sentence
2. **Student turn:** REQUIRED every beat (cannot skip)
3. **Hints:** ONLY use grammar/vocab in current week scope
4. **Tasks:** Clear, actionable (e.g. "Tell me where your book is")
5. **Progression:** Linear story, 5-8 turns total
6. **Completion:** Student must use all `mustUseWords`

**Example Week 1 Mission Flow:**
```
AI: "Where is your backpack?"
Student: "My backpack is in the classroom."  // Uses: backpack, is, classroom ✅
AI: "Good! What is in your backpack?"
Student: "My book and notebook are in my backpack."  // Uses: book, notebook ✅
[Mission continues 4-6 more turns]
[Success: Student used all required words]
```

---

## 8.4. Hint Generation System

**Hints are NOT random** — they must derive from week syllabus.

**Hint Levels:**
- **Level 1 (Word Bank):** 3-5 words from `vocabAllowed`, ONLY present simple
  - ✅ Example: ["My", "book", "is", "here"]
  - ❌ Wrong: ["I", "saw", "went"] (past tense)
- **Level 2 (Sentence Starter):** From `sentencePatterns`, with blank
  - ✅ Example: "Where is my ___?"
  - ❌ Wrong: "Where did you ___?" (past tense)
- **Level 3 (Model Sentence):** Complete sentence, present simple only
  - ✅ Example: "My book is in the library."
  - ❌ Wrong: "I saw my book in the library." (past tense)

**Hint Generation Algorithm:**
```javascript
function generateHints(context) {
  const { weekId, grammarAllowed, vocabAllowed, sentencePatterns } = context;
  
  // Step 1: Get function words for this week's grammar
  const functionWords = getFunctionWords(grammarAllowed);
  // Week 1: ["I", "am", "is", "are", "my", "your", "a", "the", "in", "at", "where"]
  
  // Step 2: Filter vocab to exclude banned grammar
  const safeVocab = vocabAllowed.filter(word => {
    return !isPastTense(word) && !isFuture(word);
  });
  
  // Step 3: Select 3-5 words
  const hints = [
    ...selectFunctionWords(functionWords, 2),  // 2 function words
    ...selectContentWords(safeVocab, 3)        // 3 content words
  ];
  
  return hints;
}

function isPastTense(word) {
  const pastForms = ['was', 'were', 'did', 'went', 'saw', 'had', 'got', 'came', 'made'];
  return pastForms.includes(word.toLowerCase()) || word.match(/ed$/);
}

function isFuture(word) {
  return ['will', 'shall', 'gonna', 'going'].includes(word.toLowerCase());
}
```

**Hint Word Sources:**
- **Function words (Week 1):** I, am, is, are, my, your, a, the, this, that, in, at, on, where, what, who
- **Content words:** From `vocabAllowed` (e.g. student, teacher, book, backpack, school)
- **NO banned words:** No past tense, no future, no complex grammar

---

## 8.5. Scaffolding System

**Scaffolding ≠ Giving answers**
- Scaffolding helps student **produce language**, not copy it

**Scaffolding Escalation:**
1. **Level 0 (No scaffold):** Student tries freely
   - UI: Input box, no hints visible
2. **Level 1 (Word hints):** Show 3-5 clickable words
   - UI: Green box with hint buttons: [My] [book] [is] [in]
3. **Level 2 (Sentence starter):** Show pattern with blank
   - UI: "Where is my ___?" (student fills blank)
4. **Level 3 (Model + modify):** Full sentence + ask to modify
   - UI: "Say: 'My book is here.' Now try with your pencil."

**When to escalate:**
- Student writes <3 words (below minimum) → Show Level 1 hints
- Student stuck for >30s → Escalate one level
- Student clicks "Help" button → Show next level
- **NEVER** escalate immediately (give student chance first)

**Anti-pattern:**
- ❌ AI provides model sentence, student copies exactly → No learning
- ✅ AI provides starter, student completes with own words → Learning happens

**Example Scaffolding Flow:**
```
Turn 1:
AI: "Where is your book?"
Student: "book"  // ❌ Too short (<3 words)
System: Shows hints → [My] [book] [is] [in]

Turn 2:
Student: "My book is in my backpack."  // ✅ Good! Uses hints + adds own words
AI: "Great! What is in your backpack?"
[Scaffold level resets to 0]
```

---

## 8.6. Feedback Rules

**Feedback MUST:**
- Be specific to student's output
- Correct gently (no grammar lectures)
- Encourage production (not perfection)
- Use models, not explanations

**Feedback Formula:**
```
1. Acknowledge attempt: "Good try!"
2. Micro-correction (if needed): "Let's add: 'Where is my book?'"
3. Encourage next step: "Now tell me about your pencil."
```

**Week 1 Feedback Examples:**
- ✅ "Good! Let's add: 'Where is my book?'"
- ✅ "Nice! Try: 'My book is in the backpack.'"
- ❌ "This is present simple interrogative with subject-verb inversion..." (too complex, grammar lecture)
- ❌ "You forgot the auxiliary verb..." (too technical)

**Rule:** NEVER teach grammar rules explicitly in feedback. Model correct form instead.

**Feedback Types:**
| Student Output | Feedback | Type |
|----------------|----------|------|
| "book" | "Try a full sentence: 'My book is...'" | Expand |
| "My book in bag" | "Good! Say: 'My book is in my bag.'" | Model |
| "Where my book?" | "Almost! Try: 'Where is my book?'" | Micro-correct |
| "My book is in my backpack." | "Perfect! ✅" | Praise |

---

## 8.7. Validation Before Output (CRITICAL CHECKLIST)

**Before ANY AI Tutor output (hint/task/feedback/story beat):**

**Grammar Validation:**
- [ ] Uses ONLY grammar from `grammarAllowed`
- [ ] NO past tense if week < 15 (no was/were/did/-ed verbs)
- [ ] NO future tense if week < 30 (no will/going to)
- [ ] NO perfect tense if week < 50 (no have/has + V3)
- [ ] NO complex clauses if level = beginner

**Vocab Validation:**
- [ ] Uses ONLY vocab from `vocabAllowed` + function words whitelist
- [ ] All content words appear in week syllabus
- [ ] No advanced vocabulary (check CEFR level)

**Format Validation:**
- [ ] Hints are single words or short phrases (not full sentences)
- [ ] AI beats are 1-2 sentences max
- [ ] Student prompts are clear and actionable
- [ ] Success criteria are measurable

**Production Validation:**
- [ ] Student speaks MORE words than AI per turn
- [ ] Student cannot skip turns
- [ ] Student must use minimum words (default: 3)
- [ ] Student must use required vocab to complete mission

**If any check fails:**
- **BLOCK output immediately**
- **Regenerate** following rules
- **Log violation** for debugging
- **DO NOT** proceed until all checks pass

---

## 8.8. Content Generation Workflow (for Copilot)

**When asked to create AI Tutor content for a week:**

**Step 1: Load Week Context**
```javascript
const weekId = 1;
const syllabus = syllabusDB[weekId];
// Returns: { title: "The Young Scholar", grammar: ["Subject Pronouns", "Verb to be"], 
//            topic: ["School supplies"], vocab: [...] }
```

**Step 2: Define Grammar Scope**
```javascript
const grammarRules = getGrammarRules(weekId);
// Returns:
// {
//   allowed: ["present simple: I am, you are", "where is/are", "my/your", "this is"],
//   banned: ["past tense", "future", "perfect tense", "complex clauses"],
//   patterns: ["Where is my ___?", "I am a ___", "This is my ___", "My ___ is ___"]
// }
```

**Step 3: Generate Missions**
- **3 missions per week:** easy, normal, challenge
- **Each mission:** 5-8 beats
- **Each beat:** 
  - AI prompt (1-2 sentences, present simple only)
  - Expected response type (yes_no, short_answer, location, etc.)
  - Required vocab (from week scope)
  - Hints (3-5 words, all allowed grammar)

**Step 4: Validate ALL Content**
```javascript
// Run validation pipeline
for (const mission of missions) {
  for (const beat of mission.beats) {
    validateGrammar(beat.aiPrompt, grammarRules);  // Check no banned grammar
    validateHints(beat.hints, grammarRules.allowed);  // Check hints are safe
    validateVocab(beat.requiredVocab, syllabus.vocab);  // Check vocab in scope
  }
}
```

**Step 5: Generate Assets**
- Audio for AI opener/beats (TTS)
- Naming: `week1/mission_first_day_beat1.mp3`
- No images needed (missions are text-based)

**Step 6: Create Mission Data File**
```javascript
// Output: src/data/storyMissions/week_1.js
export const Week1Missions = [
  { id: 'W1_FIRST_DAY', title: 'First Day at School', ... },
  { id: 'W1_LOST_BACKPACK', title: 'Lost Backpack', ... },
  { id: 'W1_LIBRARY', title: 'At the Library', ... }
];
```

---

## 8.9. Integration with Existing System

**AI Tutor Architecture:**
```
UI Layer (StoryMissionTab.jsx)
  ↓
State Management (tutorStore.js - Zustand)
  ↓
Engine Layer (tutorEngine.js)
  ↓
Context Builder (tutorContext.js) → Grammar Rules (tutorPrompts.js)
  ↓
Provider Router (providerRouter.js) → AI Providers (Gemini/Groq)
  ↓
Schema Parser (tutorSchemas.js)
  ↓
Back to UI (display response + hints)
```

**AI Tutor uses:**
- `src/data/syllabus_database.js` → Week grammar/vocab scope
- `src/services/aiTutor/tutorContext.js` → Context builder
- `src/services/aiTutor/tutorPrompts.js` → Grammar rules enforcer (getGrammarRules)
- `src/services/aiTutor/tutorEngine.js` → Validation pipeline
- `src/services/aiTutor/tutorSchemas.js` → JSON parser (tolerant)

**AI Tutor outputs:**
- `src/data/storyMissions.js` → Mission data (per week)
- Audio files → `public/audio/weekX/mission_*.mp3`

**DO NOT:**
- Create separate grammar rules outside tutorPrompts.js
- Bypass context validation in tutorEngine.js
- Generate hints without checking grammarAllowed
- Allow student to skip turns
- Let AI speak more than student

---

## 8.10. Error Prevention Checklist (Common Bugs)

**Grammar Scope Violations:**
| Bug | Wrong | Correct | Why Wrong |
|-----|-------|---------|-----------|
| Past tense in Week 1 | `["I", "saw", "library"]` | `["I", "am", "in", "library"]` | "saw" = past simple, not in scope |
| Past question | `"Where did you see it?"` | `"Where is it?"` | "did" = past simple marker |
| Future in Week 1 | `"What will you do?"` | `"What do you do?"` | "will" = future, not unlocked |
| Complex clause | `"Tell me what you want to read"` | `"What book do you want?"` | Embedded question too complex |
| -ed verb | `"I walked to school"` | `"I walk to school"` | "-ed" = past tense |

**Production Violations:**
| Bug | Wrong | Correct | Why Wrong |
|-----|-------|---------|-----------|
| AI talks too much | AI: 3-4 sentences | AI: 1-2 sentences | Student should speak more |
| Student skips | Allow proceed without input | Block until input | Student must produce language |
| Copy-paste | Give full model answer | Give starter only | Student must generate own sentence |
| No minimum | Accept "yes" | Require "Yes I am a student" | Need full sentence production |

**Hint Violations:**
| Bug | Wrong | Correct | Why Wrong |
|-----|-------|---------|-----------|
| Full sentence | `["My book is here"]` | `["My", "book", "is", "here"]` | Hints should be words, not sentences |
| Past tense word | `["saw", "went"]` | `["see", "go"]` | Past tense not in scope |
| Too many words | 10 hint words | 3-5 hint words | Overwhelming for beginner |
| Random words | Words not in vocab | Words from vocabAllowed | Must be syllabus-aligned |

**Pre-Publication Validation:**
- [ ] All hints checked against `grammarAllowed`
- [ ] No banned grammar in any AI output
- [ ] Student speaks more words than AI per turn
- [ ] Missions completable with week vocab only
- [ ] Audio generated for all AI beats
- [ ] Success criteria measurable and achievable
- [ ] All required vocab in `mustUseWords`

---

## 8.11. Testing & Quality Assurance

**Manual Test Checklist (per mission):**
1. **Grammar Check:**
   - [ ] Open mission file
   - [ ] Search for past tense markers: was, were, did, -ed
   - [ ] Search for future: will, going to
   - [ ] Verify NO matches for banned grammar
2. **Hint Check:**
   - [ ] All hints are single words or short phrases
   - [ ] All hints appear in vocabAllowed or function word list
   - [ ] Hints help but don't give away full answer
3. **Production Check:**
   - [ ] Count AI words per beat (should be <15)
   - [ ] Verify student must write every turn
   - [ ] Check minimum word requirement (default: 3)
4. **Completion Check:**
   - [ ] Play through mission start to finish
   - [ ] Verify all `mustUseWords` are used
   - [ ] Check success message appears

**Automated Validation (tutorEngine):**
```javascript
// Before every AI response:
const violations = validateResponse(response, context);
if (violations.length > 0) {
  console.error('[TutorEngine] Grammar violations:', violations);
  // Block and regenerate
  return regenerateResponse(context, userInput);
}
```

**Regression Tests:**
- Week 1 should NEVER have past tense
- Week 1-14 should NEVER have future tense
- Hints should ALWAYS be syllabus-aligned
- Student production should ALWAYS exceed AI production

---

## 8.12. Master Prompt Integration Summary

**Section Added:** 8.0-8.12 (AI Tutor Content-Aware Pedagogy)
**Lines Added:** ~600 lines
**Total Master Prompt Sections:** 28 (0.1-8.12)

**Key Additions:**
- ✅ Grammar scope rules by week (8.1)
- ✅ Tense guard system with examples (8.2)
- ✅ Story mission structure specs (8.3)
- ✅ Hint generation algorithm (8.4)
- ✅ Scaffolding escalation rules (8.5)
- ✅ Feedback formula and examples (8.6)
- ✅ Validation checklist (8.7)
- ✅ Content generation workflow (8.8)
- ✅ System integration map (8.9)
- ✅ Error prevention table (8.10)
- ✅ Testing procedures (8.11)

**Impact on Development:**
- All future AI Tutor content MUST follow Section 8 rules
- No more past tense bugs in beginner weeks
- Hints always match syllabus scope
- Student production enforced at code level
- Clear validation pipeline for all outputs

**Related Artifacts:**
- AI TUTOR CONTENT-AWARE PEDAGOGY ARTIFACT.txt (detailed pedagogy rules)
- AITutor_EXECUTION ARTIFACT.txt (6-phase implementation plan)
- AITutor-Artifacts-FULL.txt (complete architecture specs)

**Status:** ✅ Production Ready - December 29, 2024
