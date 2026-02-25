# Roleplay Scenarios Audit Report

**Date:** February 11, 2026  
**Scope:** Week 1-7 roleplay_scenarios in week_XX_real.js files  
**Focus:** Grammar guards, cumulative vocab, difficulty, scalability

---

## 🎯 Executive Summary

**Status:** ⚠️ **NEEDS IMPROVEMENT**

| Criteria | Rating | Details |
|----------|--------|---------|
| **Grammar Guards** | 🔴 **WEAK** | No explicit grammar structure limits in guide_rules |
| **Cumulative Vocab** | 🟡 **PARTIAL** | vocab_focus exists but no validation against cumulative list |
| **Difficulty** | 🟡 **INCONSISTENT** | Week 2 (simple) vs Week 4 (overly strict) |
| **Scalability** | 🟡 **MODERATE** | Consistent structure but monolithic content |
| **ESL Pedagogy** | 🟡 **MIXED** | Good production focus, but some scenarios too rigid |

---

## 📊 Detailed Analysis

### 1. Grammar Guards - 🔴 **CRITICAL ISSUE**

#### Current State
- ❌ **No explicit grammar boundaries** in guide_rules
- ❌ **No reference to grammar structures** from syllabus
- ❌ **No enforcement mechanism** to prevent AI from using advanced grammar

#### Example - Week 2 (Family Photo Album)
```javascript
guide_rules: `Accept any family member answer. React warmly...
RESPONSE PATTERN:
1. ACKNOWLEDGE: "Beautiful!"
2. EXPAND: Add ONE detail
3. ASK NEW: Ask about a DIFFERENT family member
```

**Problem:** This says WHAT to do, but not HOW (grammar-wise). AI could say:
- ✅ "Your mother is kind." (Simple present - A0+)
- ❌ "Your mother has been very kind to you, hasn't she?" (Present perfect + tag question - B1)

#### Required Fix
Add explicit grammar constraints:
```javascript
grammar_guard: {
  allowed_structures: ["to be + adjective", "to be + noun", "have/has + noun"],
  forbidden_structures: ["present continuous", "past tense", "present perfect", "modal verbs except 'can'"],
  max_sentence_length: 10, // words
  example_good: "Your mother is kind.",
  example_bad: "Your mother has been helping you a lot."
}
```

---

### 2. Cumulative Vocab Compliance - 🟡 **PARTIAL**

#### Current State
- ✅ Each scenario has `vocab_focus` array
- ❌ No validation that vocab is from cumulative list
- ❌ No reference to `cumulative_vocab` field

#### Example - Week 4 (Happy TV Show)
```javascript
vocab_focus: ["happy", "excited", "playing", "reading", "drawing", "singing", "like"]
```

**Question:** Are "drawing" and "singing" taught in W1-W4? **Unknown** - no verification.

#### Verification Needed
| Week | Scenario | Vocab Focus | Needs Check |
|------|----------|-------------|-------------|
| W2 | Family Photo | mother, father, brother, sister, kind, happy, beautiful, strong, smart, funny | ✅ Likely OK (family week) |
| W3 | Mirror Friend | tall, short, hair, eyes, long, curly, straight, glasses, smile | ✅ Likely OK (appearance week) |
| W4 | Happy TV | happy, excited, playing, reading, drawing, singing, like | ⚠️ Needs verification |
| W4 | Emotion Game | happy, sad, excited, funny, friendly, feel | ⚠️ Needs verification |

#### Required Fix
1. **Add cumulative_vocab validation**:
```javascript
vocab_focus: ["happy", "excited", "playing"], // MUST be subset of cumulative_vocab W1-W4
vocab_source: "cumulative", // or "target_vocab" (current week) or "word_power"
```

2. **Create automated check**:
```javascript
// At runtime, validate vocab_focus against cumulative list
const invalidWords = vocab_focus.filter(word => 
  !cumulativeVocab.includes(word)
);
if (invalidWords.length > 0) {
  console.error(`⚠️ Roleplay uses non-cumulative vocab: ${invalidWords}`);
}
```

---

### 3. Difficulty Level - 🟡 **INCONSISTENT**

#### Analysis by Week

**Week 2 - Family Photo Album** (Simple ✅)
- Opening: "Who is kind? Your mother or your father?"
- Pattern: "My mother is kind."
- Grammar: to be + adjective (A0+)
- **Assessment:** Age-appropriate, simple, clear

**Week 4 - Happy TV Show** (Too Strict ❌)
- Opening: "Do you like playing games or reading books? Say the full answer: I like playing games or I like reading books."
- Pattern: "I like + V-ing"
- Grammar: like + gerund (A1 level!)
- Guide rules: "EVERY question MUST use 'Do you like [A] or [B]?' format"
- **Assessment:** TOO RIGID - Feels like drill, not conversation

**Week 4 - Emotion Game** (Overly Prescriptive ❌)
```javascript
guide_rules: "CRITICAL RULES: (1) Describe a situation... (2) Ask: 'How do YOU feel?'... 
FORBIDDEN: Asking about AI emotions, repeating situations, 'Do you like...?', 'What makes you...?'. 
ONLY ask: 'When you [situation], how do YOU feel? Are you [A] or [B]?'"
```
- **Problem:** 8+ strict rules, multiple FORBIDDEN items - AI will struggle to follow
- **ESL Issue:** Forced choice questions ("Are you A or B?") every time = unnatural

#### ESL Pedagogy Issue: Over-Scaffolding

**Research Principle:** Gradual Release of Responsibility
1. **Heavy scaffolding** (early turns): Provide sentence frames
2. **Medium scaffolding** (mid turns): Offer choices
3. **Light scaffolding** (late turns): Open-ended prompts

**Current Problem:** Week 4 scenarios keep HEAVY scaffolding for ALL 20 turns.

#### Recommended Difficulty Levels

| Week | A0+ Level | Suggested Pattern | Example |
|------|-----------|-------------------|---------|
| W1-W2 | Beginner | to be + noun/adj | "I am Alex. I am happy." |
| W3-W4 | Elementary | Simple present | "I have long hair. I like pizza." |
| W5-W6 | Pre-A1 | Present continuous (basic) | "I am playing. She is reading." |
| W7 | A1 Foundation | Can + verb | "I can swim. Can you sing?" |

**Current State:** Week 4 jumps to "I like + V-ing" (gerunds = A1) - might be too early.

---

### 4. Scalability - 🟡 **MODERATE**

#### Current Structure - Strengths ✅
```javascript
{
  id: "rp_family_photo",
  title: "Family Photo Album 📷",
  emoji: "📷",
  description: "Show Ms. Nova your family photos!",
  ai_role: "Curious friend",
  user_role: "Photo presenter",
  context: "...",
  vocab_focus: [...],
  opening_line: "...",
  guide_rules: "...",
  backup_questions: [...]
}
```
- ✅ Consistent field structure across weeks
- ✅ Clear separation of metadata vs content
- ✅ Self-contained (no external dependencies)

#### Scalability Issues ❌

**1. Monolithic guide_rules (500+ chars)**
```javascript
guide_rules: "CRITICAL RULES - FOLLOW EXACTLY: (1) EVERY question MUST use format... 
(2) NEVER ask yes/no questions... (3) NEVER ask open questions... (4) Student MUST answer... 
(5) After answer, acknowledge... (6) Then ask NEXT question... (7) Activities sequence... 
(8) TRACK which questions asked... (9) ONE question per turn. FORBIDDEN: Asking same question twice..."
```

**Problems:**
- Hard to read (wall of text)
- Hard to update (must edit entire block)
- Hard to debug (which rule caused issue?)
- Hard to test (no atomic units)

**2. No Template System**
Each week creates scenarios from scratch → Copy-paste → Inconsistency creep

**3. No Grammar Inheritance**
Week 2 scenarios should automatically inherit W1-W2 grammar limits, but they don't reference syllabus grammar.

#### Proposed Scalable Structure

**Option A: Component-Based Rules**
```javascript
{
  id: "rp_family_photo",
  // ... metadata ...
  
  // Separated rule components
  rules: {
    grammar: {
      allowed: ["to be + adjective", "to be + noun"],
      forbidden: ["present continuous", "past tense"],
      reference: "cumulative_grammar_w1_w2" // Link to syllabus
    },
    
    response_pattern: {
      steps: ["acknowledge", "expand_one_detail", "ask_new_question"],
      examples: [
        { student: "My mother", ai: "Wonderful! Your mother is kind. What is your father like?" }
      ]
    },
    
    conversation_flow: {
      strategy: "topic_rotation", // Don't repeat same family member
      max_topic_repeats: 1,
      end_trigger: "all_family_members_discussed"
    },
    
    forbidden: {
      assumptions: true, // Don't say "Your brother is happy" if not mentioned
      repeat_questions: true,
      complex_sentences: true
    }
  },
  
  backup_questions: [...] // Keep as-is
}
```

**Benefits:**
- ✅ Atomic rule units (easier to test)
- ✅ Grammar linked to syllabus (automatic updates)
- ✅ Clear separation of concerns
- ✅ Easier to maintain and scale

**Option B: Template + Override System**
```javascript
// Template (shared across weeks)
const ROLEPLAY_TEMPLATE_A0 = {
  grammar: { allowed: ["to be", "have/has"], forbidden: ["modals", "continuous"] },
  response_pattern: ["acknowledge", "expand", "ask_new"],
  conversation_flow: { strategy: "topic_rotation", max_repeats: 1 }
};

// Week 2 scenario (inherits template)
{
  id: "rp_family_photo",
  template: "ROLEPLAY_TEMPLATE_A0",
  overrides: {
    vocab_focus: ["mother", "father", "kind", "happy"], // Week-specific vocab
    opening_line: "Who is kind? Your mother or your father?"
  }
}
```

**Benefits:**
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ Consistency enforced by template
- ✅ Easy to create new scenarios (just override specifics)
- ✅ Easy to update all scenarios (change template)

---

### 5. ESL Pedagogy - 🟡 **MIXED QUALITY**

#### What's Good ✅

1. **Production-Focused**
   - All scenarios require students to speak/type
   - No multiple choice or passive clicking
   - Aligned with Output Hypothesis

2. **Contextualized Practice**
   - Scenarios use week themes (family, appearance, emotions)
   - Vocabulary practiced in meaningful contexts
   - Roleplay = authentic communication task

3. **Backup Questions**
   - Provides safety net if student gets stuck
   - Maintains conversation flow

#### What's Problematic ❌

1. **Over-Scaffolding (Week 4)**
   - **Issue:** Forced binary choices ALL the time: "Do you like A or B?"
   - **ESL Problem:** Students don't learn to generate language autonomously
   - **Research:** Scaffolding should FADE over turns (high → medium → low support)
   
   **Better Progression:**
   ```
   Turn 1: "Do you like playing or reading? Say: I like playing." (Heavy)
   Turn 3: "What about drawing? Do you like drawing?" (Medium) Turn 5: "Tell me one more activity you like." (Light)
   ```

2. **Grammar Jumping (Week 4: "I like + V-ing")**
   - **Issue:** Gerunds (V-ing as noun) = A1 level grammar
   - **Problem:** Week 4 is still A0+ level
   - **Better:** Use "I like pizza" (like + noun) first, THEN "I like playing" later

3. **Repetitive Patterns**
   - **Issue:** Same question format 10+ times = boring drill
   - **ESL Principle:** Variety maintains engagement
   - **Better:** Mix question types (yes/no, or-choice, wh-questions) across turns

4. **Missing Error Correction Strategy**
   - **Issue:** No guidance on HOW to correct student errors
   - **Options:** Recast (subtle), explicit correction, or ignore?
   - **Better:** Define correction strategy in rules:
     ```javascript
     error_handling: {
       strategy: "recast", // Subtle correction
       example: "Student: 'My mother is kind' → AI: 'Yes! Your mother IS kind. (recast)'"
     }
     ```

5. **Turn Limits No Pedagogical Justification**
   - **Current:** 20 turns per roleplay
   - **Question:** Why 20? Based on what research/testing?
   - **Better:** Define based on learning objective completion, not arbitrary number

---

## 🔧 Recommended Improvements

### Priority 1: Add Grammar Guards (CRITICAL)

**Action:** Add `grammar_guard` field to every scenario

```javascript
{
  id: "rp_family_photo",
  // ... existing fields ...
  
  grammar_guard: {
    allowed_structures: [
      "to be + adjective (I am happy)",
      "to be + noun (She is my mother)",
      "have/has + noun (I have a brother)"
    ],
    forbidden_structures: [
      "present continuous (I am playing)",
      "past tense (I was happy)",
      "present perfect (I have lived)",
      "modals except 'can' (should, would, must)",
      "complex sentences (when, because, although)"
    ],
    max_sentence_length: 10, // words
    reference: "cumulative_grammar_w1_w2", // Link to syllabus grammar field
    examples: {
      good: ["Your mother is kind.", "I have a sister.", "She is beautiful."],
      bad: ["Your mother has been helping you.", "I was happy yesterday.", "She is playing now."]
    }
  }
}
```

**Implementation:**
1. Add to NovaEngine prompt construction
2. AI checks every response against grammar_guard before sending
3. Log violations for debugging

---

### Priority 2: Validate Cumulative Vocab

**Action:** Link vocab_focus to cumulative_vocab from syllabus

```javascript
{
  id: "rp_family_photo",
  vocab_focus: ["mother", "father", "brother", "sister", "kind", "happy"],
  vocab_validation: {
    source: "cumulative_vocab_w1_w2", // From week_02_real.cumulative_vocab
    allow_target_vocab: true, // Can also use current week new words
    strict_mode: false // If true, ONLY cumulative words allowed
  }
}
```

**Automated Check:**
```javascript
export function validateRoleplayVocab(roleplay, weekNumber, weekData) {
  const cumulativeWords = weekData.cumulative_vocab || [];
  const invalidWords = roleplay.vocab_focus.filter(word => 
    !cumulativeWords.includes(word.toLowerCase())
  );
  
  if (invalidWords.length > 0) {
    console.error(`⚠️ ${roleplay.id} uses non-cumulative vocab:`, invalidWords);
    return { valid: false, invalidWords };
  }
  
  return { valid: true };
}
```

---

### Priority 3: Refactor guide_rules for Scalability

**Action:** Break monolithic text into structured components

**Option 1: Nested Objects (Recommended)**
```javascript
{
  id: "rp_family_photo",
  // ... metadata ...
  
  ai_behavior: {
    response_pattern: {
      steps: [
        { name: "acknowledge", examples: ["Beautiful!", "Wonderful!", "Great!"] },
        { name: "expand", rule: "Add ONE detail about what student said" },
        { name: "ask_new", rule: "Ask about DIFFERENT family member using OR choice" }
      ]
    },
    
    conversation_strategy: {
      type: "topic_rotation",
      topics: ["mother", "father", "brother", "sister"],
      max_repeats: 1,
      end_condition: "all_topics_covered"
    },
    
    forbidden_behaviors: [
      "Making assumptions (don't say 'Your brother is happy' if not mentioned)",
      "Repeating same question twice",
      "Using grammar outside allowed structures"
    ],
    
    error_correction: {
      strategy: "recast", // Subtle correction by repeating correctly
      example: "Student: 'My mother kind' → AI: 'Yes! Your mother IS kind.'"
    }
  }
}
```

**Option 2: Template Inheritance**
```javascript
// Shared template
const TEMPLATE_FAMILY_ROLEPLAY = {
  grammar_guard: { allowed: ["to be", "have/has"], forbidden: ["continuous", "past"] },
  response_pattern: ["acknowledge", "expand", "ask_new"],
  conversation_strategy: { type: "topic_rotation", max_repeats: 1 }
};

// Scenario inherits template
{
  id: "rp_family_photo",
  template: "TEMPLATE_FAMILY_ROLEPLAY",
  custom_rules: {
    topics: ["mother", "father", "brother", "sister"],
    opening_line: "Who is kind? Your mother or your father?"
  }
}
```

---

### Priority 4: Improve ESL Pedagogy

#### 4a. **Add Scaffolding Fade**

**Action:** Define scaffolding levels for turn ranges

```javascript
{
  id: "rp_happiness_tv",
  scaffolding: {
    turns_1_5: {
      level: "heavy",
      strategy: "forced_choice_with_frame",
      example: "Do you like A or B? Say: I like A or I like B."
    },
    turns_6_12: {
      level: "medium",
      strategy: "forced_choice_no_frame",
      example: "Do you like A or B?"
    },
    turns_13_20: {
      level: "light",
      strategy: "open_question",
      example: "What else do you like?"
    }
  }
}
```

#### 4b. **Simplify Week 4 Grammar**

**Action:** Change "I like + V-ing" → "I like + noun" for W4

```javascript
// BEFORE (Too advanced)
opening_line: "Do you like playing games or reading books?"
vocab_focus: ["playing", "reading", "drawing", "singing"]

// AFTER (Grade-appropriate)
opening_line: "Do you like games or books?"
vocab_focus: ["games", "books", "music", "pictures"]
grammar_focus: "I like + noun" // A0+ level
```

**Rationale:** Gerunds require understanding V-ing as noun = A1 cognitive load. Use concrete nouns first.

#### 4c. **Add Variety to Question Types**

**Action:** Mix question formats across turns

```javascript
{
  question_variety: {
    turn_1: { type: "or_choice", example: "Do you like A or B?" },
    turn_3: { type: "yes_no_plus", example: "Do you like A? Tell me!" },
    turn_5: { type: "wh_simple", example: "What do you like?" },
    turn_7: { type: "or_choice", example: "Do you like C or D?" },
    turn_9: { type: "open", example: "Tell me more!" }
  }
}
```

---

### Priority 5: Add Metadata for Maintenance

**Action:** Add creation/update tracking and difficulty tags

```javascript
{
  id: "rp_family_photo",
  
  // Metadata for tracking
  metadata: {
    created_date: "2026-01-15",
    last_updated: "2026-02-11",
    author: "Content Team",
    version: "2.0",
    status: "production", // draft | review | production
    tested_weeks: [2, 3], // Which weeks this was tested in
    avg_completion_rate: 0.87, // % of students who complete it
    avg_turns_to_complete: 15
  },
  
  // Difficulty tags
  difficulty: {
    cefr_level: "A0+",
    grammar_complexity: 1, // 1-5 scale
    vocab_complexity: 1,
    cognitive_load: "low",
    recommended_age: [7, 8, 9] // Age range
  }
}
```

---

## 📈 Implementation Roadmap

### Phase 1: Grammar Guards (Week 1)
- [ ] Add `grammar_guard` field to all scenarios
- [ ] Update NovaEngine to enforce grammar limits
- [ ] Test with Week 2-4 scenarios
- [ ] Document violations during testing

### Phase 2: Vocab Validation (Week 1)
- [ ] Create `validateRoleplayVocab()` function
- [ ] Run validation on all weeks
- [ ] Fix any non-cumulative vocab
- [ ] Add automated check to build process

### Phase 3: Refactor guide_rules (Week 2)
- [ ] Design structured rule format (Option 1 or 2)
- [ ] Refactor Week 2 scenarios as pilot
- [ ] Test refactored scenarios
- [ ] Roll out to all weeks

### Phase 4: ESL Improvements (Week 2-3)
- [ ] Add scaffolding fade to Week 4 scenarios
- [ ] Simplify Week 4 grammar (remove gerunds)
- [ ] Add question variety across turns
- [ ] Define error correction strategy

### Phase 5: Metadata & Templates (Week 3)
- [ ] Add metadata fields to all scenarios
- [ ] Create scenario templates
- [ ] Document template usage
- [ ] Train content team on new system

---

## ✅ Success Criteria

### Technical
- [ ] All scenarios have `grammar_guard` field
- [ ] All vocab validated against cumulative list
- [ ] guide_rules refactored to structured format
- [ ] Automated validation in place

### Pedagogical
- [ ] Week 4 grammar simplified to A0+ level
- [ ] Scaffolding fades across turns
- [ ] Question variety implemented
- [ ] Difficulty progression W1→W7 is smooth

### Scalability
- [ ] Template system operational
- [ ] New scenario creation time reduced by 50%
- [ ] Maintenance effort reduced (update template, not 50+ scenarios)
- [ ] Documentation complete

---

## 🎓 ESL Best Practices Reference

### Gradual Release Model
```
Teacher: "I do, you watch" (Heavy scaffolding)
       ↓
Teacher & Student: "We do together" (Medium scaffolding)
       ↓
Student: "You do, I watch" (Light scaffolding)
       ↓
Student: "You do independently" (No scaffolding)
```

**Application to Roleplays:**
- **Turns 1-5:** Sentence frames provided ("Say: I like...")
- **Turns 6-12:** Choices given ("Do you like A or B?")
- **Turns 13-20:** Open prompts ("Tell me more!")

### CEFR Grammar by Level
| Level | Grammar Focus | Examples |
|-------|---------------|----------|
| **A0** | to be, have/has (present) | I am happy. I have a cat. |
| **A0+** | Simple present (basic verbs) | I like pizza. She plays. |
| **A1** | Present continuous, can/can't | I am reading. I can swim. |
| **A1+** | Past simple (regular), going to | I played. I am going to eat. |

**Current Problem:** Week 4 uses gerunds (like + V-ing) = A1 level, but students are A0+.

### Task-Based Language Teaching (TBLT)
**Principles:**
1. **Meaningful communication** (not grammar drills)
2. **Gap activities** (information/opinion gap to close)
3. **Outcome-focused** (produce something: story, description, plan)

**Application:**
- ✅ Roleplay scenarios = meaningful communication tasks
- ✅ Opinion gap (student shares their likes/family/feelings)
- ⚠️ Some scenarios too drill-like (forced choice x 20) - reduce rigidity

---

## 📝 Conclusion

**Overall Assessment:** The roleplay system has a solid foundation (consistent structure, production-focused, contextualized) but needs critical improvements in **grammar enforcement**, **vocab validation**, and **ESL pedagogy** to be mass-production ready.

**Priority Actions:**
1. **Add grammar guards** (blocks AI from using advanced structures)
2. **Validate cumulative vocab** (ensure scenarios don't use untaught words)
3. **Simplify Week 4** (remove gerunds, reduce rigidity)
4. **Refactor for scale** (templates, structured rules)

**Timeline:** 3 weeks for full implementation (1 week per priority phase)

**Success Metric:** After improvements, 90% of student responses should stay within A0+ grammar boundaries (currently unknown, likely 60-70% based on lack of guards).

---

**Report Author:** AI Development Team  
**Review Status:** Pending stakeholder approval  
**Next Action:** Present to Content Team + ESL Advisor for validation
