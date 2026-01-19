# V29 AI TUTOR CONTENT GENERATION - DETAILED OUTLINE
**Purpose**: Structure for creating week_XX_real.js (1,100+ lines per week)
**Date**: 18/01/2026

---

## FILE TO CREATE: `/MASS_PROMPTS/V29_CONTENT_AI_TUTOR.txt`

Expected size: **~2,000 dòng** (dài nhất trong 3 prompts)

---

## SECTION BREAKDOWN

### SECTION I: INTRODUCTION & OVERVIEW (100 dòng)
- Purpose of week_XX_real.js
- File location (parent level, NOT inside week folder)
- When to use (for Claude generating AI Tutor data)
- Relationship with 14 station files
- Dynamic loading mechanism

### SECTION II: COMPLETE SCHEMA REFERENCE (300 dòng)
**2.1 Metadata Fields** (50 dòng)
```javascript
week_id, phase, block, unit, week_number
```

**2.2 Syllabus Data** (50 dòng)
```javascript
week_title_en, week_title_vi, topic, topic_vi
```

**2.3 Learning Outcome** (30 dòng)
```javascript
learning_outcome, learning_outcome_vi
```

**2.4 Grammar Focus** (50 dòng)
```javascript
grammar_focus, grammar_pattern, grammar_examples: [...]
```

**2.5 Target Vocabulary** (120 dòng) ⬅️ CRITICAL
```javascript
target_vocab: [  // 7-10 words, MUST be array of OBJECTS
  {
    word: "string",
    pronunciation: "/IPA/",
    definition_vi: "string",
    definition_en: "string",
    example: "string",
    syllabus_context: "string"
  }
]
```
**Common mistake**: Using array of strings → breaks Quiz/Speak tabs

### SECTION III: STORY MISSIONS STRUCTURE (400 dòng) ⬅️ PHẦN PHỨC TẠP
**3.1 Mission Metadata** (100 dòng)
```javascript
mission_id, title, title_vi, theme, nova_greeting
```
- **CRITICAL**: `title` field MANDATORY for TurnManager detection
- Week detection keywords table

**3.2 Mission Context** (100 dòng)
```javascript
mission_context: `Detailed AI instructions...`
```
- Student profile
- Language rules
- Grammar pattern
- Vocabulary to use
- ENCOURAGE student questions
- What to avoid

**3.3 Mission Config** (100 dòng)
```javascript
target_vocab: [...],  // 3-6 words per mission
grammar_pattern: "string",
minimum_turns: 10-15,
maximum_turns: 15-20,
expected_duration: "string"
```

**3.4 Objectives Overview** (100 dòng)
- Two schema formats (Week 1-3 vs Week 4+)
- When to use which format
- Comparison table

### SECTION IV: OBJECTIVES SCHEMAS (600 dòng) ⬅️ PHẦN DÀI NHẤT

**4.1 Week 1-3 Format: canonical_question** (150 dòng)
```javascript
{
  stepKey: "string",
  category: "string",
  canonical_question: "Single question text?",  // ONE question
  hints: ["word1", "word2", "word3", "word4", "word5"],  // Individual words
  target_keywords: [...],
  ack_options: ["Nice!", "Great!", "Wonderful!"],
  recast_templates: [...],
  success_criteria: "string"
}
```
- When to use
- Hints format (5-6 individual words)
- Complete example from Week 1

**4.2 Week 4+ Format: question_variants** (250 dòng) ⬅️ QUAN TRỌNG
```javascript
{
  stepKey: "string",
  category: "string",
  question_variants: [  // 3 variants for replay value
    {
      question: "Variant 1 question?",
      hints: ["word5", "word1", "word3", "word2", "word4", "word6"]  // FULL SCRAMBLED (6-9 words)
    },
    {
      question: "Variant 2 question?",
      hints: ["word4", "word2", "word6", "word1", "word5"]
    },
    {
      question: "Variant 3 question?",
      hints: ["word3", "word1", "word5", "word2", "word6", "word4"]
    }
  ],
  target_keywords: [...],
  ack_options: ["Nice!", "Great!", "Wonderful!"],
  recast_templates: [...],
  success_criteria: "string"
}
```
- Why 3 variants (replay value)
- Hints format (full scrambled sentence 6-9 words)
- How to scramble properly
- Transformation examples table
- Complete example from Week 4

**4.3 Student Question Invitations** (200 dòng) ⬅️ NEW IN WEEK 4+
```javascript
{
  stepKey: "student_question_1",
  category: "Student Inquiry",
  type: "invitation",  // Special type
  question_variants: [
    {
      question: "Do you have a question for me?",
      hints: []  // Empty for invitations
    },
    {
      question: "What do you want to ask me?",
      hints: []
    },
    {
      question: "Ask me anything!",
      hints: []
    }
  ],
  target_keywords: ["question", "ask", "what", "how", "why", "yes", "no"],
  ack_options: ["Great question!", "Good question!"],
  recast_templates: ["You asked about {topic}!"],
  success_criteria: "Student asks a question OR declines",
  allow_skip: true
}
```
- Purpose & rationale
- Placement strategy (every 3-4 objectives)
- type: "invitation" flag
- Empty hints array
- allow_skip: true
- Complete example

**4.4 Goodbye Objective** (50 dòng)
```javascript
{
  stepKey: "goodbye",
  category: "Closing",
  type: "termination",
  canonical_question: "",
  target_keywords: [],
  ack_options: ["Wonderful!"],
  hints: [],
  recast_templates: [],
  goodbye_en: "Great job! [Celebration]! Bye!",
  goodbye_vi: "Tuyệt lắm! [Lời chúc]! Tạm biệt!",
  success_criteria: "Mission complete"
}
```

### SECTION V: TURNMANAGER INTEGRATION (250 dòng)

**5.1 Week Detection Mechanism** (100 dòng)
- How TurnManager uses mission `title` keywords
- Code snippet from turnManager.js
- Week detection table:
  - Week 1: default (school keywords)
  - Week 2: "Family", "Mother", "Father", "Team"
  - Week 3: "Mirror", "Appearance", "Tom", "Portraits"
  - Week 4: "Happy", "Emotions", "Feelings", "Activities"
  - Week 5+: How to add new detection

**5.2 Mission Title Requirements** (50 dòng)
- **MANDATORY** title field
- Must contain detection keywords
- Examples of good vs bad titles
- Validation commands

**5.3 Conversation Steps Routing** (100 dòng)
- How TurnManager maps title → steps
- Step sequence structure
- minimum_turns vs maximum_turns
- Extension mode (Week 1-3)
- Disabled features for Week 4+ (intelligent skip, min turns extension)

### SECTION VI: FREETALK KNOWLEDGE (150 dòng)

**6.1 Purpose** (30 dòng)
- Provides context for FreeTalk mode
- Without it: generic questions
- With it: theme-relevant questions

**6.2 Complete Schema** (70 dòng)
```javascript
freetalk_knowledge: {
  week_title: "string",
  theme: "string",  // Clear description
  knowledge_base: [
    "Fact 1...",
    "Fact 2...",
    // ... minimum 10 facts
  ],
  example_opening_questions: [
    "Question 1?",
    "Question 2?",
    // ... minimum 8 questions
  ]
}
```

**6.3 Examples** (50 dòng)
- Week 1: School theme
- Week 2: Family theme
- Week 3: Appearance theme
- Week 4: Emotions theme

### SECTION VII: COMPLETE WEEK EXAMPLES (300 dòng) ⬅️ GOLDEN STANDARD

**7.1 Week 1 Example** (80 dòng)
- Mission 1: First Day at School
- canonical_question format
- Individual word hints
- 10 objectives + goodbye

**7.2 Week 2 Example** (80 dòng)
- Mission 2: My Mother's Day
- canonical_question format
- Family theme
- TurnManager detection

**7.3 Week 4 Example** (140 dòng) ⬅️ MOST IMPORTANT
- Mission 1: My Happy Jar (FULL mission)
- question_variants format (3 variants each)
- Full scrambled sentence hints
- Student question invitations (2 invitations)
- 9 regular objectives + 2 invitations + 1 goodbye = 12 total

### SECTION VIII: ACK/RECAST/QUESTION TEMPLATES (150 dòng)

**8.1 ACK Options** (30 dòng)
- ONLY 3: "Nice!", "Great!", "Wonderful!"
- Why these 3
- Forbidden ACKs

**8.2 RECAST Templates** (60 dòng)
- Subject agreement rules
- Template structure
- Variables: {verb}, {object}, {adjective}, {person}, {activity}, {time}, {reason}
- Examples by context

**8.3 Success Criteria** (60 dòng)
- What counts as completing objective
- Be specific
- Examples

### SECTION IX: COMMON MISTAKES & PITFALLS (200 dòng)

**9.1 Missing Title Field** (40 dòng)
- Symptom: AI asks wrong context questions
- Root cause: TurnManager defaults to Week 1
- Example: Week 3 bug (Jan 16)
- Fix: Always add title with keywords

**9.2 Wrong target_vocab Format** (40 dòng)
- ❌ Array of strings: ["happy", "sad"]
- ✅ Array of objects: [{word: "happy", ...}]
- Impact: Quiz/Speak tabs show "undefined"
- Validation command

**9.3 Wrong Hints Format** (40 dòng)
- Week 1-3: Individual words
- Week 4+: Full scrambled sentences
- Mixing formats causes confusion
- Examples

**9.4 Missing Student Question Invitations** (40 dòng)
- Week 4+ requires 1-2 invitations per mission
- Placement: every 3-4 objectives
- type: "invitation" flag required
- allow_skip: true

**9.5 Incomplete FreeTalk Knowledge** (40 dòng)
- Missing theme → generic questions
- < 10 facts → insufficient context
- < 8 questions → limited variety

### SECTION X: VALIDATION CHECKLIST (100 dòng)

**Before Generation**:
- [ ] Check week theme in syllabus_database.js
- [ ] Identify CEFR level (A0/A1/A2)
- [ ] Choose schema format (canonical vs variants)

**After Generation**:
- [ ] 7-10 target_vocab (array of objects)
- [ ] 3 story missions
- [ ] Each mission has title field with keywords
- [ ] Objectives count: 10-12 total (8-10 regular + 1-2 invitations + 1 goodbye)
- [ ] Week 4+: All objectives have question_variants (3 each)
- [ ] Week 4+: Hints are full scrambled sentences (6-9 words)
- [ ] Week 4+: 1-2 student_question invitations with type: "invitation"
- [ ] FreeTalk knowledge complete (10+ facts, 8+ questions)
- [ ] minimum_turns set (10-15)
- [ ] maximum_turns set (15-20)
- [ ] File exports: `export const weekXRealData`

**Validation Commands**:
```bash
# Check file exists
ls src/data/weeks/week_XX_real.js

# Count target_vocab (should be 7-10)
grep -c '"word":' src/data/weeks/week_XX_real.js

# Check mission titles
grep '"title":' src/data/weeks/week_XX_real.js

# Verify question_variants (Week 4+)
grep -c '"question_variants":' src/data/weeks/week_XX_real.js

# Check student question invitations
grep '"type": "invitation"' src/data/weeks/week_XX_real.js
```

---

## EXECUTION ORDER (CRITICAL)

When Claude generates week_XX_real.js, follow this order:

```
STEP 1: Read syllabus_database.js for week theme
STEP 2: Determine CEFR level (check week range)
STEP 3: Choose schema format:
   - Week 1-3 → canonical_question
   - Week 4+ → question_variants
STEP 4: Write metadata (50 dòng)
STEP 5: Write target_vocab (7-10 words as OBJECTS)
STEP 6: Write 3 story missions:
   - Mission metadata with TITLE (keywords!)
   - Mission context
   - Objectives (8-12 total):
     - Regular objectives (8-10)
     - Student invitations (1-2) if Week 4+
     - Goodbye (1)
STEP 7: Write FreeTalk knowledge (10 facts + 8 questions)
STEP 8: Validate with checklist
```

---

## SIZE COMPARISON

| Week | File Size | Missions | Objectives/Mission | Invitation | Format |
|------|-----------|----------|-------------------|------------|--------|
| Week 1 | ~800 dòng | 3 | 10 | 0 | canonical_question |
| Week 2 | ~900 dòng | 3 | 10 | 0 | canonical_question |
| Week 3 | ~950 dòng | 3 | 10 | 0 | canonical_question |
| Week 4 | **1,099 dòng** | 3 | 12 (9+2+1) | 2 | question_variants |
| Week 5+ | ~1,100 dòng | 3 | 12 (9+2+1) | 2 | question_variants |

**Why Week 4+ is longer**:
- 3 question variants per objective (vs 1 canonical question)
- Full scrambled sentence hints (6-9 words vs 5 words)
- Student question invitations (2 per mission)
- Increased minimum_turns (15 vs 10)

---

## CRITICAL WARNINGS

### ⚠️ DO NOT:
1. Use array of strings for target_vocab
2. Forget title field in missions
3. Mix hints formats (individual words vs scrambled sentences)
4. Skip student question invitations in Week 4+
5. Use < 10 facts or < 8 questions in FreeTalk knowledge
6. Place week_XX_real.js inside week folder (must be parent level)

### ✅ ALWAYS:
1. Use array of objects for target_vocab
2. Include title field with detection keywords
3. Match hints format to week schema (canonical vs variants)
4. Add 1-2 student_question invitations per mission (Week 4+)
5. Complete FreeTalk knowledge section
6. Place file at `/src/data/weeks/week_XX_real.js`
7. Export as `export const weekXRealData`
8. Validate with checklist before marking complete

---

**END OF OUTLINE**
**Next step**: Create full V29_CONTENT_AI_TUTOR.txt following this structure
**Expected size**: ~2,000 dòng (dài nhất trong 3 prompts)
