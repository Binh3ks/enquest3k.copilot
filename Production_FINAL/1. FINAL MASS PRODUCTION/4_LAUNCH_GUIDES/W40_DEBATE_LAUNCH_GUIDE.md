# 🎭 DEBATE CORNER LAUNCH GUIDE (2-TIER SYSTEM)
**Simple Debates (W40+) → Formal Debates (W113+)**  
**Created:** March 2026 | **Reference:** ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md Section II | **Aligned:** Syllabus Phase 3

---

## 📌 OVERVIEW: 2-TIER DEBATE SYSTEM

### Implementation Strategy

**🎯 TIER 1: Simple Debates (W40-112)**
- **Unlock Week:** Week 40 (Phase 1 ending)
- **Purpose:** Practice mode for opinion expression
- **AI Persona:** Friendly challenger (encouraging tone)
- **Structure:** Simple chat flow (opinion → reason → discussion)
- **Topics:** Dynamic per week theme (3-4 variations each week)
- **Duration:** 3-5 minutes per debate
- **Grammar Scope:** Present simple, basic comparatives
- **Target Age:** 8-12 years old

**🏆 TIER 2: Formal Debates (W113-144)**
- **Unlock Week:** Week 113 (Phase 3: Advanced Synthesis & Debate)
- **Purpose:** Academic preparation & B1+ assessment
- **AI Persona:** Devil's Advocate (always opposes student)
- **Structure:** 5-phase guided flow (Opinion → Reason → Counter → Defense → Conclusion)
- **Topics:** 3 fixed deep topics (8 weeks each):
  - W113-120: "Should homework be banned in primary schools?"
  - W121-128: "Should kids play video games daily?"
  - W129-136: "Should kids under 12 have smartphones?"
- **Duration:** 8-12 minutes per debate
- **Grammar Scope:** Present perfect, conditionals, advanced comparatives
- **Target Age:** 10-14 years old (B1+ level)

### Pedagogical Rationale

**Why 2 Tiers?**
1. **Progressive Scaffolding:** Simple → Formal mirrors syllabus progression
2. **Confidence Building:** 73 weeks of practice (W40-112) before formal assessment
3. **Grammar Alignment:** Simple debates use learned grammar; formal debates require advanced structures
4. **Cognitive Load:** Simple debates = low-stakes fun; formal debates = academic challenge
5. **Syllabus Integration:** Tier 2 aligns perfectly with Phase 3 debate cycles

---

## ✅ IMPLEMENTATION STATUS (March 2026)

### What's Built
- ✅ **DebateTab.jsx** exists at `/src/modules/ai_tutor/tabs/DebateTab.jsx` (370 lines)
- ✅ **Unlock logic** implemented (W40 unlock, locked for W1-39)
- ✅ **Tier detection** implemented (`debateTier = 'simple'` for W40-112, `'formal'` for W113+)
- ✅ **Simple Debate UI** complete:
  - Agree/Disagree stance selector (ThumbsUp/ThumbsDown buttons)
  - Chat interface (ChatBubble + InputBar)
  - Dynamic topic generation from week theme
  - Turn counter
  - Sentence frames helper (4 basic phrases)
  - Auto TTS integration
- ✅ **Formal Debate UI** complete:
  - 5-phase progress tracker (visual badges 1-5)
  - Devil's Advocate header badge
  - Advanced sentence frames (7 academic phrases)
  - Phase-specific completion message
- ✅ **AI Integration** complete:
  - Dual system prompts (simple vs formal)
  - Grammar Guard integration via aiRouter
  - Automatic phase progression
  - Devil's Advocate logic for W113+

### What Needs Content
- ⏳ **W40-112 Topics:** Dynamic generation works but quality depends on week theme data
- ⏳ **W113-144 Topics:** 3 fixed topics coded but need content alignment:
  - W113-120: Homework debate → Need weekly sub-topics/angles
  - W121-128: Video Games debate → Need weekly sub-topics/angles
  - W129-136: Smartphones debate → Need weekly sub-topics/angles
- ⏳ **Sentence Frame Expansion:** 7 frames coded, may need 20+ variations for diversity

### Testing Checklist
```bash
# Test unlock logic
- [ ] Navigate to W39 → Debate tab shows lock icon + "Unlocks at Week 40"
- [ ] Navigate to W40 → Debate tab unlocked, shows "Friendly Debate" header
- [ ] Navigate to W113 → Debate tab shows "Formal Debate" + 5 phase tracker

# Test Tier 1 (W40)
- [ ] Topic generated from week theme (check console log)
- [ ] Agree/Disagree buttons work
- [ ] Chat flow works (student → AI → student)
- [ ] Sentence frames show: "I think...", "Because...", etc.
- [ ] Turn counter increments
- [ ] TTS plays AI response (if autoplay enabled)

# Test Tier 2 (W113)
- [ ] Fixed topic: "Should homework be banned..."
- [ ] Devil's Advocate persona detected
- [ ] Phase tracker shows Phase 1/5 initially
- [ ] Phase increments after each student response
- [ ] Phase 5 shows completion message
- [ ] Advanced sentence frames: "I believe that...", "However...", etc.
```

---

## 🎯 SECTION I: TIER 1 ARCHITECTURE (W40-112)

### A. AI Tutor Mission Structure (W40+)

**Standard Missions (W1-39):**
```javascript
{
  mission_id: 1,
  missions: [
    { type: "story", ... },
    { type: "story", ... },
    { type: "story", ... }
  ]
}
```

**W40+ With Debate:**
```javascript
{
  mission_id: 1,
  missions: [
    { type: "story", ... },      // Regular story mission
    { type: "story", ... },      // Regular story mission
    { type: "debate", ... }      // NEW: Debate mission (replaces 3rd story)
  ]
}
```

**Key Change:** Mission 3 becomes Debate Corner (missions 1-2 remain story-based)

### B. Debate Mission Schema

```javascript
{
  type: "debate",
  mission_id: 3,
  title: "Debate Corner: Should Schools Ban Smartphones?",
  
  // DEBATE-SPECIFIC FIELDS:
  debate_config: {
    topic: "Should schools ban smartphones in classrooms?",
    topic_vi: "Các trường học có nên cấm điện thoại thông minh trong lớp học không?",
    
    stance_options: [
      {
        id: "agree",
        label_en: "Yes, ban smartphones",
        label_vi: "Có, nên cấm điện thoại",
        ai_persona: "devil_advocate_disagree"  // AI will oppose this
      },
      {
        id: "disagree",
        label_en: "No, allow smartphones",
        label_vi: "Không, nên cho phép điện thoại",
        ai_persona: "devil_advocate_agree"  // AI will oppose this
      }
    ],
    
    // AI behavior
    ai_role: "devil_advocate",
    ai_personality: {
      name: "Professor Challenge",
      description: "Always disagrees with you to make you think deeper",
      speaking_style: "Polite but questioning, uses 'But what about...?' and 'Have you considered...?'"
    },
    
    // Sentence frames to help students
    sentence_frames: {
      opinion: [
        "I think schools should _____ because _____.",
        "In my opinion, _____ is better because _____.",
        "I believe _____ because _____."
      ],
      reason: [
        "One reason is _____.",
        "First, _____. Second, _____.",
        "This is important because _____."
      ],
      defense: [
        "That's a good point, but _____.",
        "I understand, however _____.",
        "Yes, but we also need to consider _____."
      ]
    },
    
    // Background context for AI to stay on-topic
    debate_context: {
      key_arguments_for: [
        "Phones distract students from learning",
        "Students may cheat on tests using phones",
        "Face-to-face communication skills decline"
      ],
      key_arguments_against: [
        "Phones are tools for research and learning apps",
        "Students need phones for emergencies",
        "Banning creates enforcement problems"
      ],
      real_world_examples: [
        "France banned phones in schools (2018)",
        "Some US schools allow 'phone breaks' between classes",
        "Singapore uses controlled phone use for digital literacy"
      ]
    }
  },
  
  // CONVERSATION FLOW (replaces story_arc for debates)
  conversation_phases: [
    {
      phase: "topic_intro",
      ai_message: "Today we're debating: Should schools ban smartphones in classrooms? This is a question many schools around the world are discussing. What do you think?",
      expected_response: "student_chooses_stance",
      validation: "none"  // Any stance is valid
    },
    {
      phase: "opinion_statement",
      ai_message: "Interesting! Can you explain WHY you think that? Use one of the sentence frames to help you.",
      expected_response: "student_gives_reason",
      validation: "contains_because_clause"  // Must have reasoning
    },
    {
      phase: "counterargument",
      ai_message_template: "I hear your point about {student_reason}. But have you considered that {counterpoint}? How would you respond to that?",
      counterpoints: {
        agree: [
          "students might need phones for emergencies like contacting parents",
          "phones can be educational tools with learning apps and research",
          "a total ban is hard to enforce and creates conflict"
        ],
        disagree: [
          "phones are very distracting and reduce focus in class",
          "students might use phones to cheat on tests",
          "too much screen time hurts social skills development"
        ]
      },
      expected_response: "student_defends_stance",
      validation: "addresses_counterpoint"
    },
    {
      phase: "conclusion",
      ai_message: "Thank you for this debate! You made a strong argument that {student_main_point}. The opposing view is that {counterargument}. Both sides have valid concerns. In real life, many schools find compromises, like allowing phones only during lunch or for specific learning activities. Great job thinking critically!",
      expected_response: "none",
      validation: "none"
    }
  ],
  
  // GRADING CRITERIA (for XP rewards)
  grading: {
    criteria: [
      {
        key: "expressed_opinion",
        description: "Student clearly stated their stance",
        points: 25
      },
      {
        key: "provided_reason",
        description: "Student gave at least one reason with 'because'",
        points: 25
      },
      {
        key: "responded_to_challenge",
        description: "Student addressed AI's counterargument",
        points: 25
      },
      {
        key: "used_sentence_frames",
        description: "Student used provided sentence frames",
        points: 25
      }
    ],
    total_possible: 100
  }
}
```

---

## 🧠 SECTION II: AI PERSONA - DEVIL'S ADVOCATE MODE

### A. Behavior Guidelines

**Core Principle:** AI always takes the OPPOSITE stance of the student to encourage critical thinking

**Example Flow:**
```
STUDENT: "I think schools should ban smartphones because they distract students."

AI (Devil's Advocate): "I understand your concern about distraction. 
But have you considered that smartphones can be powerful learning tools? 
Students can use them to look up information quickly, access educational apps, 
and even take notes. How would you respond to that argument?"
```

**NOT Pure Opposition:**
- ✅ Acknowledge student's point first ("I understand...", "That's a valid concern...")
- ✅ Then present counterpoint politely ("But have you considered...", "What about...")
- ✅ Ask follow-up question to keep conversation going
- ❌ Don't be aggressive or dismissive ("That's wrong!", "You're not thinking clearly")

### B. AI Prompt Template (For Production)

```javascript
debate_system_prompt: `You are Professor Challenge, a friendly debate coach for 10-12 year old ESL students learning English.

YOUR ROLE: Always take the OPPOSITE stance from the student to help them think deeper.

BEHAVIOR RULES:
1. If student says "Yes, ban phones" → You argue "No, allow phones"
2. If student says "No, allow phones" → You argue "Yes, ban phones"
3. ALWAYS acknowledge their point first: "I see your point about..."
4. THEN present counterargument: "But have you considered..."
5. Keep language simple (CEFR A2-B1 level)
6. Encourage with phrases: "Good thinking!", "That's an interesting point", "Tell me more"
7. If student struggles, offer sentence frames: "You could say: I think ____ because ____"

DEBATE TOPIC: ${debate_config.topic}

KEY COUNTERPOINTS TO USE:
FOR stance: ${JSON.stringify(debate_context.key_arguments_for)}
AGAINST stance: ${JSON.stringify(debate_context.key_arguments_against)}

CONVERSATION STRUCTURE:
Phase 1: Ask student to choose stance (agree or disagree)
Phase 2: Ask WHY they think that (must give reason)
Phase 3: Present counterargument (use key_arguments opposite to their stance)
Phase 4: Ask them to defend their position
Phase 5: Conclude by summarizing both sides (no winner declaration)

AVOID:
- Declaring a "winner" (both sides are valid)
- Using academic debate terminology (motion, proposition, rebuttal)
- Asking for multiple rounds of back-and-forth (keep it to 1 opinion + 1 defense)
- Complex political or controversial topics (keep age-appropriate)

GOAL: Help student articulate opinions in English, not win a competition.`
```

---

## 📚 SECTION III: DEBATE TOPIC SELECTION GUIDELINES

### A. Topic Criteria (W40-54)

**MUST Be:**
- ✅ **Age-appropriate** (10-12 years old can have informed opinions)
- ✅ **School/life relevant** (topics kids actually think about)
- ✅ **Balanced** (both sides have valid arguments, no "right" answer)
- ✅ **ESL-friendly** (vocabulary within A2-B1 range)
- ✅ **Theme-aligned** (syncs with week's learning theme)

**MUST NOT Be:**
- ❌ Controversial politics (elections, political parties)
- ❌ Religion (faith-based arguments too complex)
- ❌ Sensitive social issues (poverty, discrimination require maturity)
- ❌ Abstract philosophy (too advanced for A2-B1 English)

### B. Topic Bank by Theme (W40-54 Examples)

**W40: Technology & Innovation**
> **Topic:** "Should schools ban smartphones in classrooms?"
> - FOR: Distraction, cheating, reduced social skills
> - AGAINST: Learning tool, emergencies, digital literacy

**W41: Health & Fitness**
> **Topic:** "Should schools serve only healthy food in cafeterias?"
> - FOR: Reduces obesity, teaches nutrition, improves focus
> - AGAINST: Costs more, limits choice, some kids won't eat

**W42: Travel & Adventure**
> **Topic:** "Should students take a gap year before university?"
> - FOR: Real-world experience, maturity, discover passions
> - AGAINST: Lose academic momentum, costs money, delayed career

**W43: Art & Creativity**
> **Topic:** "Should all students learn to play a musical instrument?"
> - FOR: Brain development, discipline, cultural appreciation
> - AGAINST: Not everyone enjoys music, expensive, time-consuming

**W44: Community Service**
> **Topic:** "Should volunteer work be required for graduation?"
> - FOR: Builds character, helps community, college applications
> - AGAINST: Forced volunteering isn't genuine, time burden

**W45: Sports & Competition**
> **Topic:** "Should schools eliminate competitive sports leagues?"
> - FOR: Reduces pressure, inclusive for all abilities, focus on fun
> - AGAINST: Competition builds resilience, teamwork, healthy rivalry

**W46: Media & Entertainment**
> **Topic:** "Should children under 13 be allowed on social media?"
> - FOR: Stays connected with friends, digital skills, creative expression
> - AGAINST: Cyberbullying, privacy risks, mental health impacts

**W47: Science & Discovery**
> **Topic:** "Should space exploration funding go to solving Earth problems instead?"
> - FOR: Poverty, climate, healthcare need money now
> - AGAINST: Space research creates innovations, inspires future scientists

**W48: Fashion & Identity**
> **Topic:** "Should schools require uniforms?"
> - FOR: Equality, focus on learning, saves money
> - AGAINST: Limits self-expression, uncomfortable, expensive for families

**W49: Food & Culture**
> **Topic:** "Should everyone try to be vegetarian?"
> - FOR: Better for environment, animal welfare, health benefits
> - AGAINST: Personal choice, cultural traditions, nutritional needs vary

**W50: Work & Careers**
> **Topic:** "Should teenagers work part-time jobs during school?"
> - FOR: Responsibility, money management, work experience
> - AGAINST: Less study time, fatigue, miss extracurriculars

**W51: Friendship & Relationships**
> **Topic:** "Should students be allowed to choose their own groupmates?"
> - FOR: Comfort, better collaboration, friendship bonding
> - AGAINST: Cliques form, shy students excluded, need diverse perspectives

**W52: Environment & Sustainability**
> **Topic:** "Should plastic bags be banned completely?"
> - FOR: Ocean pollution, wildlife harm, encourages reusables
> - AGAINST: Hygiene needs, costs burden poor families, alternatives also have impact

**W53: History & Heritage**
> **Topic:** "Should students learn their local history before world history?"
> - FOR: Relevance, cultural identity, easier to relate
> - AGAINST: Global perspective first, common knowledge foundation

**W54: Future & Dreams**
> **Topic:** "Should AI tutors replace human teachers?"
> - FOR: Personalized learning, 24/7 availability, cost-effective
> - AGAINST: Lacks empathy, teacher mentorship, social interaction

---

## 🛠️ SECTION IV: SENTENCE FRAMES & SCAFFOLDING

### A. Sentence Frame Categories

**Phase 1: Expressing Opinion**
```
Strongly agree:
- "I completely agree that _____."
- "I definitely think _____."
- "There's no doubt that _____."

Agree:
- "I think _____ because _____."
- "In my opinion, _____."
- "I believe _____ is the right choice."

Disagree:
- "I don't think _____ is a good idea because _____."
- "I disagree with _____ because _____."
- "I'm not sure _____ would work."

Strongly disagree:
- "I completely disagree with _____."
- "I don't think _____ at all."
- "That's not a good idea because _____."
```

**Phase 2: Giving Reasons**
```
Single reason:
- "The main reason is _____."
- "This is because _____."
- "One important reason is _____."

Multiple reasons:
- "First, _____. Second, _____."
- "There are two reasons: _____ and _____."
- "Not only _____, but also _____."

Adding examples:
- "For example, _____."
- "Like when _____."
- "In my school, _____."
```

**Phase 3: Responding to Counterarguments**
```
Acknowledging + Defending:
- "That's a good point, but _____."
- "I understand that concern, however _____."
- "Yes, but we also need to think about _____."

Conceding partially:
- "You're right about _____, but _____."
- "I agree with that part, but _____."
- "That's true in some cases, but _____."

Adding new information:
- "What about _____?"
- "We should also consider _____."
- "Another thing to think about is _____."
```

**Phase 4: Concluding**
```
Summary:
- "So, my main point is _____."
- "To sum up, I think _____."
- "In conclusion, _____."

Balanced view:
- "Both sides have good points, but I still think _____."
- "It's complicated, but I believe _____."
- "There's no perfect answer, but _____ seems better."
```

### B. Visual Scaffolding in UI

**Display in Debate Panel:**
```
┌─────────────────────────────────────┐
│  SENTENCE FRAMES (Click to use)    │
├─────────────────────────────────────┤
│  💬 I think _____ because _____.   │
│  💬 That's a good point, but _____.│
│  💬 For example, _____.             │
└─────────────────────────────────────┘
```

**Click-to-Fill Behavior:**
- Student clicks "I think ___ because ___"
- Input field auto-populates: "I think [CURSOR] because "
- Student fills in the blanks
- Encourages proper structure without full automation

---

## 🎨 SECTION V: UI/UX DESIGN SPECIFICATIONS

### A. Debate Interface Layout

**Mission Selection Screen:**
```
┌──────────────────────────────────────┐
│  MISSION 1: The Lost Robot          │  ← Story mission
│  Status: Completed ✅                │
├──────────────────────────────────────┤
│  MISSION 2: Future City              │  ← Story mission
│  Status: In Progress 🟡              │
├──────────────────────────────────────┤
│  🎭 MISSION 3: DEBATE CORNER         │  ← NEW badge
│  Topic: Should schools ban phones?   │
│  Status: Not Started 🔒              │
└──────────────────────────────────────┘
```

**Debate Screen (Active Debate):**
```
┌────────────────────────────────────────────────┐
│  🎭 DEBATE CORNER                              │
│  Topic: Should schools ban smartphones?        │
├────────────────────────────────────────────────┤
│  Professor Challenge (AI)                      │
│  "Today we're debating: Should schools ban     │
│   smartphones? What do you think?"             │
├────────────────────────────────────────────────┤
│  CHOOSE YOUR STANCE:                           │
│  [ ✅ Yes, ban them ]  [ ❌ No, allow them ]   │
├────────────────────────────────────────────────┤
│  SENTENCE FRAMES (helpers):                    │
│  • I think ___ because ___.                    │
│  • One reason is ___.                          │
└────────────────────────────────────────────────┘
```

**Progress Tracker:**
```
DEBATE PHASES:
[①────②────③────④]
 └─ Opinion stated
     └─ Reason given
         └─ Challenge answered
             └─ Conclusion
```

### B. Visual Indicators

**Debate Mission Badge:**
- Icon: 🎭 (theater masks - debate symbol)
- Color: Purple gradient (differentiates from story missions)
- Label: "DEBATE CORNER" (always in caps)

**AI Persona Avatar:**
- Character: Professor Challenge (scholarly owl or academic figure)
- Expression: Thoughtful, questioning (raised eyebrow)
- Speech bubble: Question mark icon when challenging student

**Student Stance Badges:**
- "👍 AGREE" (green)
- "👎 DISAGREE" (red)
- Displayed next to student's messages for clarity

---

## 🧪 SECTION VI: TESTING & VALIDATION

### A. Debate Logic Testing Checklist

**Test Case 1: Stance Selection**
- [ ] Student clicks "Agree" → AI correctly argues "Disagree" stance
- [ ] Student clicks "Disagree" → AI correctly argues "Agree" stance
- [ ] Stance selection locks after first choice (can't switch mid-debate)

**Test Case 2: Reason Validation**
- [ ] Student gives reason WITH "because" → AI proceeds to challenge
- [ ] Student gives reason WITHOUT reasoning → AI prompts "Can you explain WHY?"
- [ ] Student uses sentence frame → XP bonus awarded

**Test Case 3: Counterargument Dynamics**
```
Student: "I think phones should be banned because they distract students."
Expected AI Response: "Good point about distraction. But phones can be learning tools..."

Student: "I think phones should be allowed because they help with research."
Expected AI Response: "I see your point about research. But phones also distract..."
```
- [ ] AI uses correct counterpoint pool (opposite of student stance)
- [ ] AI tone is polite and encouraging (not argumentative)

**Test Case 4: Completion & Grading**
- [ ] Student completes all 4 phases → Receives XP (75-100 XP based on quality)
- [ ] Student gives minimal responses → Still completes but lower XP (50-75 XP)
- [ ] Student abandons debate → Progress saved, can resume later

**Test Case 5: Edge Cases**
- [ ] Student types "I don't know" → AI offers sentence frames and simplifies question
- [ ] Student uses profanity → Content filter blocks, AI prompts "Let's keep it respectful"
- [ ] Student copies/pastes entire essay → Length limiter (max 100 words per response)

### B. Content Quality Validation

**Pre-Launch Checklist (Per Week):**
```bash
# Check debate mission exists in AI Tutor file
grep -A 50 '"type": "debate"' src/data/weeks/week_N/week_N_real.js

# Verify topic is age-appropriate (manual review)
# Read topic + key_arguments_for + key_arguments_against

# Count sentence frames (should have 3+ per phase)
grep -c 'sentence_frames' src/data/weeks/week_N/week_N_real.js

# Verify AI persona is "devil_advocate"
grep 'ai_role.*devil_advocate' src/data/weeks/week_N/week_N_real.js
```

**Manual Testing (Human QA):**
1. **Completeness:** Can a 10-year-old understand the topic?
2. **Balance:** Are both sides equally valid?
3. **Language:** Is vocabulary within A2-B1 range?
4. **Engagement:** Does the topic feel relevant to students' lives?

---

## 📋 SECTION VII: PRODUCTION WORKFLOW (W40+ Debates)

### Step-by-Step Integration with Standard Workflow

**BƯỚC 0: Read References (UPDATED)**
- [ ] Read Syllabus Week N theme
- [ ] Read Blueprint V5.0 Section II (Debate Specifications)
- [ ] Read W40_DEBATE_LAUNCH_GUIDE.md (this document)
- [ ] Select debate topic from Topic Bank (aligned with theme)

**BƯỚC 2: Clone AI Tutor (MODIFIED FOR W40+)**
```bash
# Clone Week 7 as usual
cp src/data/weeks/week_07_real.js src/data/weeks/week_40_real.js

# But now MODIFY Mission 3 to be Debate type
```

**Example AI Tutor Structure (W40+):**
```javascript
export default {
  missions: [
    {
      id: 1,
      type: "story",
      title: "The Robot Inventor",
      // ... standard story mission
    },
    {
      id: 2,
      type: "story",
      title: "Smart Home of the Future",
      // ... standard story mission
    },
    {
      id: 3,
      type: "debate",  // ← CHANGED from "story"
      title: "Debate Corner: Should Schools Ban Smartphones?",
      // ... debate mission (see Section I schema)
    }
  ]
};
```

**BƯỚC 2.5: Debate Mission Content Creation**

**Substep 2.5a: Write Debate Topic**
```javascript
debate_config: {
  topic: "[Yes/No question related to week theme]",
  topic_vi: "[Vietnamese translation]",
  // Example: "Should schools ban smartphones in classrooms?"
}
```

**Substep 2.5b: Research Key Arguments** (Spend 15 min researching both sides)
```javascript
debate_context: {
  key_arguments_for: [
    "[Reason 1 supporting YES]",
    "[Reason 2 supporting YES]",
    "[Reason 3 supporting YES]"
  ],
  key_arguments_against: [
    "[Reason 1 supporting NO]",
    "[Reason 2 supporting NO]",
    "[Reason 3 supporting NO]"
  ],
  real_world_examples: [
    "[Example 1: Country/school that implemented policy]",
    "[Example 2: Study or statistic]",
    "[Example 3: Expert opinion or news article]"
  ]
}
```

**Research Sources:**
- Wikipedia (for basic facts)
- britannica.com (for kid-friendly explanations)
- newsela.com (for current events at reading levels)
- commonsensemedia.org (for tech/media topics)

**Substep 2.5c: Adapt Sentence Frames** (Use templates from Section IV)
```javascript
sentence_frames: {
  opinion: [
    "I think [topic stance] because [reason].",
    "In my opinion, [claim] is better because [justification].",
    // Add 1-2 more variations
  ],
  reason: [ /* 3 frames */ ],
  defense: [ /* 3 frames */ ]
}
```

**Substep 2.5d: Write Conversation Phases** (Use Phase Template from Section I)
- Phase 1: Topic intro + stance selection
- Phase 2: Opinion statement + reason request
- Phase 3: Counterargument + defense request
- Phase 4: Conclusion + summary

**BƯỚC 3-10: Standard Workflow** (No changes for other 14 stations)

---

## 🧩 SECTION VIII: DEBATE-SPECIFIC AUDIO GENERATION

### A. Audio Requirements (W40+ Only)

**Unlike Story Missions:** Debate audio is 100% dynamic (no pre-recorded)

**Why No Pre-recorded Audio?**
- Student responses are unpredictable (can't pre-generate all variations)
- AI counterarguments adapt to student's specific reason
- Conversation flow is non-linear (depends on student choices)

**Solution: Use Deepgram Worker API** (on-demand TTS)
- AI generates text response → Sent to `tts-worker.js` → Deepgram Aura-2 → Audio played
- Same system as AI Tutor dynamic conversations (already implemented)

### B. Pre-Launch Audio Test

**Test Debate Topic Pronunciation:**
```bash
# Use test script to preview how key terms sound
node tools/test_debate_audio.js

# Sample inputs:
"Should schools ban smartphones in classrooms?"
"Distraction" "Cheat" "Emergency" "Research" "Learning app"
```

**Common Pronunciation Issues:**
- "Smartphone" → Sometimes pronounced as "smart-phone" (two words)
- "Cyberbullying" → Stress on wrong syllable
- Acronyms (AI, CO2, SDG) → Spell out in text: "A-I", "C-O-two", "S-D-G"

**Fix:** Add to TTS preprocessing:
```javascript
// tools/tts-worker.js
text = text.replace(/\bAI\b/g, "A-I");
text = text.replace(/\bCO2\b/g, "C-O-two");
text = text.replace(/\bSDG\b/g, "S-D-G");
```

---

## 🚀 SECTION IX: DEPLOYMENT & MONITORING

### A. Phased Rollout Plan

**Phase 0: W39 (1 week before launch)**
- Deploy UI components (Debate Corner badge, stance selector)
- Backend debate logic (devil's advocate algorithm)
- Test in staging with fake W40 data

**Phase 1: W40 Launch Day**
- Deploy W40 AI Tutor with Debate Mission 3
- Monitor first 100 completions for bugs
- Track metrics: Completion rate, average time, user feedback

**Phase 2: W41+ (Standard Operation)**
- All future weeks include Debate Mission 3
- Use Debate Topic Bank (Section III) for weekly topics
- Adjust difficulty based on user data (if <50% complete, make easier)

### B. Success Metrics

**Quantitative KPIs:**
- **Completion Rate:** Target >70% of students who start finish the debate
- **Avg Time:** Target 5-8 minutes (if >10 min, too complex; if <3 min, too shallow)
- **Stance Distribution:** Target ~50/50 split (if 90/10, topic is biased)
- **Sentence Frame Usage:** Target >60% use at least one frame (scaffolding is helpful)

**Qualitative Feedback:**
- Survey question (post-debate): "Did you enjoy Debate Corner?" (👍/👎)
- Open-ended: "What did you find challenging?" (detect common struggles)

**Analytics Dashboard Additions:**
```javascript
// Track in database
{
  mission_type: "debate",
  week: 40,
  student_id: "...",
  stance_chosen: "agree" | "disagree",
  time_spent: 456,  // seconds
  sentence_frames_used: 2,  // count
  xp_earned: 85,
  completed: true
}
```

---

## 🎓 SECTION X: PEDAGOGICAL NOTES & RESEARCH BASIS

### A. Why Micro-Debates for ESL Learners?

**Research Support:**
- **Vygotsky's Zone of Proximal Development:** Scaffolding (sentence frames) helps students attempt tasks slightly above current level
- **Krashen's Input Hypothesis:** Authentic communication (debates) provides comprehensible i+1 input
- **CLIL (Content and Language Integrated Learning):** Learning content (critical thinking) through language (English)

**Age-Appropriate Justification:**
- 10-12 years: Piaget's "Concrete Operational Stage" → Can think logically about concrete events
- Micro-debates use real-world topics (phones, uniforms) instead of abstract philosophy
- Single opinion + defense (not multi-round rebuttals) matches attention span

### B. Differentiation from Academic Debate

**Academic Debate (NOT EngQuest):**
- Multiple speakers (teams)
- Formal structure (Constructive → Rebuttal → Cross-examination)
- Judging criteria (evidence, logic, delivery)
- Time limits & rules (CX Debate, Policy Debate, Lincoln-Douglas)
- Tournament competition

**EngQuest Micro-Debate:**
- Single student vs AI
- Informal conversation (just opinion + reason + defense)
- Feedback focused on language use, not winning
- No time pressure (can take breaks)
- Collaborative learning (AI helps improve arguments)

**Why This Distinction Matters:**
- ✅ Reduces performance anxiety (no audience, no judges)
- ✅ Language focus (grammar, vocabulary) not content expertise
- ✅ Accessible to all students (no prior debate training needed)

---

## 📖 SECTION XI: TROUBLESHOOTING GUIDE

### Common Issues & Solutions

**Issue 1: AI Doesn't Oppose Student**
- **Symptom:** AI agrees with student instead of playing devil's advocate
- **Cause:** System prompt not loaded correctly
- **Fix:** Verify `ai_role: "devil_advocate"` in debate_config
- **Test:** Student says "Yes" → AI must argue "No" (and vice versa)

**Issue 2: Student Stuck (Doesn't Know What to Say)**
- **Symptom:** Student types "idk" or silent for >2 minutes
- **Cause:** Topic too complex OR sentence frames not visible
- **Fix 1:** AI detects "idk" → Offers simplified rephrasing: "Let me ask differently..."
- **Fix 2:** UI highlights sentence frames (pulsing animation)
- **Fix 3:** AI offers multiple choice: "Do you agree or disagree? Click one: [Agree] [Disagree]"

**Issue 3: Debate Goes Off-Topic**
- **Symptom:** Student talks about unrelated things ("I like pizza")
- **Cause:** Open-ended prompt too loose
- **Fix:** AI redirects: "That's interesting, but let's talk about [topic]. Do you think [restate question]?"
- **Prevent:** Add context reminder in every AI message: "Remember, we're discussing [topic]."

**Issue 4: Language Too Difficult**
- **Symptom:** Student uses translate tool OR copies/pastes long text
- **Cause:** AI used B2-C1 vocabulary instead of A2-B1
- **Fix:** Add vocabulary filter in system prompt:
  ```
  Use only these word types:
  - Simple verbs: think, help, stop, use, need
  - Common adjectives: good, bad, important, easy, hard
  - Avoid: utilize (use 'use'), detrimental (use 'bad'), facilitate (use 'help')
  ```

**Issue 5: Students Always Choose Same Stance**
- **Symptom:** 90% choose "Agree" (or "Disagree")
- **Cause:** Topic wording is biased ("Should schools ban dangerous smartphones?")
- **Fix:** Neutral wording ("Should schools allow/ban smartphones?")
- **Test:** Show topic to 5 people → If >4 choose same side, rewrite neutrally

---

## ✅ W40 PRODUCTION QUICK START SUMMARY

**For agents creating W40+ debates:**

1. **Topic Selection:**
   - Choose from Topic Bank (Section III) aligned with week theme
   - Verify both sides have 3+ valid arguments
   - Check vocabulary is A2-B1 (britannica.com for kid-friendly terms)

2. **Mission 3 Structure:**
   - Type: `"debate"` (NOT `"story"`)
   - debate_config: topic, stance_options, ai_role, sentence_frames
   - debate_context: key_arguments_for, key_arguments_against, real_world_examples
   - conversation_phases: 4 phases (intro, opinion, challenge, conclusion)

3. **AI Persona:**
   - ai_role: `"devil_advocate"` (always oppose student)
   - Tone: Polite but questioning ("But have you considered...?")
   - System prompt: See Section II.B template

4. **Validation Commands:**
   ```bash
   # Check debate exists
   grep '"type": "debate"' src/data/weeks/week_40/week_40_real.js
   
   # Count sentence frames (should be 9+)
   grep -c 'sentence_frames' src/data/weeks/week_40/week_40_real.js
   
   # Verify key_arguments (should be 3 for each side)
   grep -A 10 'key_arguments_for' src/data/weeks/week_40/week_40_real.js
   ```

5. **Testing:**
   - Test both stances (agree AND disagree)
   - Verify AI counterarguments are different for each stance
   - Check sentence frames are clickable and helpful
   - Measure time: 5-8 minutes = ideal

**Ready to launch W40 Debate Corner!** 🎭
