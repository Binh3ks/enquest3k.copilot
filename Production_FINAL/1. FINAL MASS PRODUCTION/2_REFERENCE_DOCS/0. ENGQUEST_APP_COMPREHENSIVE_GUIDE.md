# 📖 ENGQUEST APP - COMPREHENSIVE GUIDE
**Complete Documentation: Principles, Methodology, Architecture & Features**

**Version:** 5.0  
**Date:** March 16, 2026  
**Status:** Production Reference Document

---

## 📋 TABLE OF CONTENTS

### PART I: FOUNDATION
1. [App Overview & Vision](#part-i-app-overview--vision)
2. [Core Design Principles](#core-design-principles)
3. [Pedagogical Foundation](#pedagogical-foundation)
4. [Target Audience & Differentiation](#target-audience--differentiation)

### PART II: ARCHITECTURE
5. [Content Architecture](#part-ii-content-architecture)
6. [Technical Architecture](#technical-architecture)
7. [AI & Multimodal Systems](#ai--multimodal-systems)

### PART III: STATIONS & FEATURES
8. [Detailed Station Breakdown](#part-iii-detailed-station-breakdown)
9. [AI Tutor System](#ai-tutor-system)
10. [Assessment & Progress Tracking](#assessment--progress-tracking)

### PART IV: CONTENT PRODUCTION
11. [Production Methodology](#part-iv-production-methodology)
12. [Quality Assurance](#quality-assurance)
13. [Continuous Improvement](#continuous-improvement)

---

## PART I: APP OVERVIEW & VISION

### 1. WHAT IS ENGQUEST?

**Definition:**  
EngQuest is an **AI-powered, gamified English learning ecosystem** for Vietnamese children ages 6-12, combining:
- **Structured language curriculum** (156 weeks = 3 years)
- **STEM integration** (Science, Math, Critical Thinking from Week 16+)
- **Adaptive AI tutoring** (personalized conversations, scaffolded inquiry)
- **Dual-mode differentiation** (Easy for mass market, Advanced for elite exam prep)
- **Multimodal learning** (Reading, Listening, Speaking, Writing, Visual, Interactive)

**Unique Value Proposition:**
```
Traditional English App          EngQuest 5.0
├─ Grammar drills               ├─ Grammar in meaningful STEM contexts
├─ Isolated vocabulary          ├─ Vocabulary via life cycles, food webs, physics
├─ One-size-fits-all            ├─ Dual-mode (Easy/Advanced)
├─ Pre-recorded responses       ├─ AI conversation (GPT-4o, dynamic)
└─ Tests only                   └─ 16 interactive stations + AI Tutor + Assessments
```

---

### 2. VISION & MISSION

#### Vision:
> "Empower every Vietnamese child to master English while developing critical thinking, scientific literacy, and problem-solving skills that prepare them for international education and global citizenship."

#### Mission:
1. **Accessibility:** Easy Mode ensures students from all backgrounds can learn effective English
2. **Excellence:** Advanced Mode prepares top students for elite entrance exams (Trần Đại Nghĩa, international schools)
3. **Integration:** Break down silos between English, Science, Math through CLIL pedagogy
4. **Engagement:** Gamification, storytelling, and AI interaction make learning joyful
5. **Evidence-based:** Every design decision backed by cognitive science research

---

### 3. CORE DESIGN PRINCIPLES

#### 3.1 Dual-Mode Philosophy

**Why Two Modes?**

Vietnamese education has **extreme heterogeneity:**
- **Group A (40%):** Rural/suburban, first-time English learners, age 6-8, limited resources
- **Group B (35%):** Urban, some English exposure, age 8-10, motivated parents
- **Group C (20%):** International school students, bilingual families, high English proficiency
- **Group D (5%):** Near-native, returnees from abroad, need advanced challenge

**Single-mode system = fails to serve everyone:**
- Too easy for Group C/D → boredom, churn
- Too hard for Group A → frustration, dropout

**Dual-mode solution:**
| Aspect | **Easy Mode (Đại trà)** | **Advanced Mode (Ivy)** |
|--------|----------------------|----------------------|
| **Target** | Group A, B (75% of users) | Group B, C, D (25% of users) |
| **Goal** | Conversational fluency, A2-B1 level | Academic English, B1-B2 level + exam readiness |
| **Vocabulary** | Everyday (plant, water, animal, cloud) | Academic (photosynthesis, precipitation, predator, ecosystem) |
| **Sentence Length** | 5-8 words (simple SVO) | 12-15 words (complex with clauses) |
| **Science Depth** | Observable facts (Butterflies have wings) | Explanatory concepts (Metamorphosis requires hormones) |
| **Math Level** | Arithmetic within 20 | Pre-algebra (missing addend, variables) |
| **Reading Length** | 6-8 sentences per passage | 10-15 sentences |
| **Visual Support** | Heavy (diagram every concept) | Moderate (text-focused, selective diagrams) |
| **Logic/Reasoning** | 1-step (What comes next?) | Multi-step (If A and B, then what?) |
| **Flexibility** | Switch to Advanced anytime | Switch to Easy anytime (no penalty) |

**Pedagogical Research:**
- **Vygotsky's ZPD:** Each student has unique "zone of proximal development" - dual-mode ensures both groups stay in their ZPD
- **Flow Theory (Csikszentmihalyi):** Optimal learning = challenge matches skill level - too easy/hard = disengagement
- **Universal Design for Learning (UDL):** Provide multiple means of representation, engagement, action/expression

---

#### 3.2 Grammar Anchor Principle

**Cognitive Load Management Strategy**

**Problem:** Learning requires Working Memory (capacity: 4-6 chunks for children)  
**Risk:** Changing grammar + vocabulary + science concepts simultaneously = OVERLOAD

**Solution: Grammar Anchor**
```
Week 1-15: ESTABLISH grammar foundation
├─ Master: Present Simple, Present Continuous, Past Simple
├─ Master: Question forms (Wh-, Yes/No)
├─ Master: Basic sentence structures (SVO, SVC)
└─ Content: Personal/everyday contexts (family, animals, food)

Week 16+: ANCHOR grammar, EXPAND vocabulary
├─ Grammar: SAME structures (Present Simple, etc.) ← FAMILIAR (0 cognitive load)
├─ Vocabulary: NEW STEM terms (metamorphosis, ecosystem) ← NEW (1-2 chunks)
├─ Science: NEW concepts (life cycles, food webs) ← NEW (1 chunk)
└─ Result: Total load = 2-3 chunks (manageable, stays in ZPD)
```

**Research Evidence:**
- **Nation & Newton (2009):** "i-1 grammar + i+1 vocabulary = optimal acquisition rate"
- **EngQuest Implementation:** Grammar = i-1 (mastered), STEM vocab = i+1 (just beyond current level)

**Example:**
```
Week 10 (Personal context):
"My cat eats fish. My cat sleeps all day."
Grammar: Present Simple (Subject + Verb + Object)
Vocab: cat, eats, fish, sleeps

Week 16 (STEM context):
"The caterpillar eats leaves. The caterpillar turns into a butterfly."
Grammar: IDENTICAL Present Simple (Subject + Verb + Object)
Vocab: caterpillar, leaves, butterfly ← ONLY this is new
→ Student feels: "Oh! Same grammar I know, just different words. I can do this!"
```

---

#### 3.3 CLIL Integration (Content & Language Integrated Learning)

**What is CLIL?**  
Learning a target language (English) THROUGH content subjects (Science, Math, History) instead of learning them separately.

**Traditional Approach:**
```
Monday: English Class
- Topic: Present Simple tense
- Sentences: "I eat rice." "She plays tennis."
- Context: Abstract, generic

Tuesday: Science Class (in Vietnamese)
- Topic: Butterfly life cycle
- Language: Vietnamese only
- Result: Knowledge stays separated (English ≠ Science)
```

**EngQuest CLIL Approach:**
```
Monday: Integrated Lesson
- Grammar: Present Simple (FAMILIAR anchor)
- Vocabulary: caterpillar, cocoon, butterfly (STEM context)
- Content: Life cycle of butterfly (SCIENCE knowledge)
- Stations: Read (story), AI Tutor (inquiry), Logic Lab (math problem about caterpillars)

Result: Student builds UNIFIED SCHEMA:
"I use Present Simple to describe science facts. 
Science concepts help me remember English words. 
English is a TOOL for understanding the world."
```

**Benefits:**
1. **Cognitive Load Reduction** (paradoxically!):
   - Meaningful context activates prior knowledge → reduces intrinsic load
   - Dual coding (text + science visual) → stronger memory encoding
   - Single integrated schema vs two separate schemas → less storage demand

2. **Motivation & Engagement:**
   - Real-world relevance (not artificial drills) → higher motivation
   - Curiosity-driven (science naturally prompts "why?" questions) → deeper processing
   - Cross-domain connections (English ↔ Science ↔ Math) → transfer learning

3. **Retention:**
   - CLIL retention: **68-82%** after 2 weeks (research)
   - Traditional retention: **35-45%** after 2 weeks
   - Reason: Contextualized vocabulary has multiple retrieval pathways (visual, conceptual, linguistic)

4. **Future-Readiness:**
   - International schools use CLIL extensively
   - Elite exams (Trần Đại Nghĩa) require cross-domain thinking
   - 21st-century skills: Critical thinking, problem-solving in authentic contexts

---

#### 3.4 Singapore Math CPA Method

**CPA = Concrete → Pictorial → Abstract Progression**

**Philosophy:**  
Children cannot jump directly from concrete reality to abstract symbols (causes frustration & errors). Must bridge through visual representations.

**Three Stages:**

**1. CONCRETE (Manipulatives, Touchable objects)**
```
Problem: "5 apples + 3 apples = ?"
Concrete Stage:
- Student has 5 physical apple counters
- Student adds 3 more apple counters
- Student counts: 1, 2, 3... 8 total
- Learning: Deeply embodied, kinesthetic memory
```

**2. PICTORIAL (Visual diagrams - Bar Model)**
```
Problem: "A T-Rex ate 5 eggs Monday, 3 eggs Tuesday. How many total?"
Pictorial Stage (EngQuest W16+):

Bar Model:
┌─────────────────────────┐
│ Monday:  [■■■■■]        │  5 eggs
│ Tuesday: [■■■]          │  3 eggs
├─────────────────────────┤
│ Total:   [■■■■■■■■]     │  ? eggs
└─────────────────────────┘

Student sees:
- Part 1 (5) + Part 2 (3) = Whole (?)
- Visual "proof" that 5+3=8
```

**3. ABSTRACT (Symbolic equations)**
```
Problem: "5 + 3 = ?"
Abstract Stage (Phase 2+):
- Student writes: 5 + 3 = 8
- No pictures needed (internalized mental model)
- Can solve without bar model (automaticity achieved)
```

**EngQuest Implementation by Phase:**

| Phase | Age Range | CPA Stage | Example | Visual Support |
|-------|-----------|-----------|---------|----------------|
| **Phase 1 (W1-54)** | 6-8 years | Concrete → Pictorial | Bar Models with pictures of objects (eggs, leaves, fish) | Heavy (every problem) |
| **Phase 2 (W55-120)** | 8-10 years | Pictorial → Abstract | Bar Models with numbers, transition to equations | Moderate (complex problems only) |
| **Phase 3 (W121-156)** | 10-12 years | Abstract (selective Pictorial) | Equations primary, bar models for multi-step word problems | Light (student choice) |

**Why Singapore Math?**
- **TIMSS Rankings:** Singapore consistently #1 in international math assessments
- **CPA Method:** Proven to reduce cognitive load (visual scaffold supports abstract thinking)
- **Word Problem Mastery:** Singapore students excel at applying math to real situations (vs rote calculation)
- **EngQuest Goal:** Prepare students for Singapore Math-based international schools & Trần Đại Nghĩa exam (30% Singapore Math-style problems)

---

#### 3.5 Scaffolding & Gradual Release

**Vygotsky's Zone of Proximal Development (ZPD):**
```
┌──────────────────────────────────┐
│ Can do independently             │  (Current ability level)
├──────────────────────────────────┤
│ ZONE OF PROXIMAL DEVELOPMENT     │  ← OPTIMAL LEARNING ZONE
│ (Can do with guidance/support)   │     (AI Tutor, hints, visuals)
├──────────────────────────────────┤
│ Cannot do even with help         │  (Too difficult, causes frustration)
└──────────────────────────────────┘
```

**EngQuest Scaffolding Strategy:**

**Week 1-15: Full Scaffolding (Establishing foundation)**
- Heavy visual support (images for every word)
- Sentence frames provided ("I am _____", "I have _____")
- AI Tutor models every conversation first
- Grammar explicitly taught before application

**Week 16-54: High Scaffolding (STEM introduction)**
- Grammar = familiar (anchor) → low support needed
- STEM vocab = new → heavy support (diagrams, audio, examples)
- AI Tutor uses "Shadow Asking" (student repeats model questions)
- Bar Models provided for every math problem

**Week 55-120: Medium Scaffolding (Increasing independence)**
- Grammar = automatic → no support
- STEM vocab = partially familiar → moderate support (some diagrams)
- AI Tutor uses "Guided Asking" (prompts, not full models)
- Bar Models for complex problems only

**Week 121-156: Low Scaffolding (Student-driven)**
- Grammar & basic STEM = automatic
- Advanced STEM = new → selective support
- AI Tutor uses "Free Inquiry" (student-initiated questions)
- Bar Models optional (student choice for visualization)

**Gradual Release Model:**
```
I DO       →    WE DO     →    YOU DO TOGETHER    →    YOU DO ALONE
(W1-15)         (W16-54)       (W55-120)              (W121-156)
```

**Research Foundation:**
- **Pearson & Gallagher (1983):** Gradual Release of Responsibility framework
- **Wood, Bruner, Ross (1976):** "Scaffolding" term coined - temporary support that fades as learner gains competence
- **Key Principle:** Support should be **just enough** to keep student in ZPD, then systematically reduced

---

#### 3.6 Gamification & Motivation

**Engagement Strategy:**

**1. Narrative/Thematic Coherence**
- Every week = coherent theme (Time Traveler, Space Explorer, Ocean Detective)
- All stations connect to theme (not random topics)
- Story continuity creates anticipation ("What happens next week?")

**2. Point & Reward Systems**
- **Gold Stars:** Accuracy-based (correct answers)
- **Achievement Badges:** Milestone-based (complete 10 weeks, unlock 50 words, etc.)
- **Leaderboard:** Optional competitive element (can be turned off)
- **Collectibles:** Unlock new AI Tutor avatars, themes, backgrounds

**3. Agency & Choice**
- **Station order:** Student chooses which station to complete first
- **Mode selection:** Switch Easy ↔ Advanced anytime
- **AI Tutor personality:** Choose avatar & conversation style
- **Writing prompts:** 2-3 options per week (student picks favorite topic)

**4. Progress Visualization**
- **Journey Map:** Visual representation of 156-week curriculum
- **Skill Trees:** Unlock new grammar branches (Past Tense → Past Continuous → Past Perfect)
- **Vocabulary Garden:** Each learned word = flower planted (visual growth)

**5. Social Learning (Optional)**
- **Weekly Challenges:** Collaborative goals (class unlocks bonus game if 80% complete week)
- **Peer Showcase:** Share best Free Talk recordings or Writing samples
- **Parent Portal:** Weekly report with celebration of achievements

**Research Foundation:**
- **Self-Determination Theory (Deci & Ryan):** Motivation requires Autonomy, Competence, Relatedness
  - Autonomy: Choice of station order, mode, topics ✅
  - Competence: Dual-mode ensures success (Easy fallback, Advanced challenge) ✅
  - Relatedness: Social features, AI Tutor relationship ✅
- **Flow Theory (Csikszentmihalyi):** Optimal experience when challenge matches skill
  - Easy Mode: Low challenge, low skill → comfortable flow
  - Advanced Mode: High challenge, high skill → engaged flow

---

## 📚 PEDAGOGICAL FOUNDATION

### 4. LEARNING THEORY INTEGRATION

EngQuest synthesizes **7 evidence-based learning theories:**

#### 4.1 Behaviorism (Skinner)
**Application:** Immediate feedback, positive reinforcement
- **Example:** Correct answer → ⭐ +10 points + audio praise ("Great job!")
- **Research:** Operant conditioning strengthens desired behaviors (repeated practice)

#### 4.2 Cognitivism (Piaget, Bruner)
**Application:** Schema building, CPA progression, chunking
- **Example:** Grammar = schema (mental model) → expand with new contexts (STEM)
- **Research:** Learning = constructing mental representations, not passive absorption

#### 4.3 Constructivism (Vygotsky)
**Application:** ZPD, scaffolding, social learning (AI Tutor as "More Knowledgeable Other")
- **Example:** AI Tutor guides student to discover answer, not just tells answer
- **Research:** Learning = active construction of knowledge through interaction

#### 4.4 Cognitive Load Theory (Sweller)
**Application:** Grammar anchor, visual scaffolding, gradual STEM exposure
- **Example:** Never change grammar + vocab simultaneously (minimize extraneous load)
- **Research:** Working memory limits require careful instructional design

#### 4.5 Dual Coding Theory (Paivio)
**Application:** Text + Image + Audio for every concept
- **Example:** "Metamorphosis" = word (verbal) + life cycle diagram (visual) + audio narration (auditory)
- **Research:** Multi-modal encoding creates stronger memory traces

#### 4.6 Spaced Repetition (Ebbinghaus)
**Application:** Review schedule (Week N → N+2 → N+5 → N+10)
- **Example:** "Metamorphosis" introduced W16 → reviewed W18, W21, W26
- **Research:** Forgetting curve shows retention decays without timed reviews

#### 4.7 Situated Learning (Lave & Wenger)
**Application:** CLIL contexts, AI Tutor authentic conversations
- **Example:** Learn "photosynthesis" while discussing how plants make food (authentic use)
- **Research:** Knowledge transfer better when learned in context of application

---

## PART II: CONTENT ARCHITECTURE

### 5. CURRICULUM STRUCTURE

#### 5.1 Overall Timeline

**156 Weeks = 3 Years**

```
Phase 1: Foundation (Weeks 1-54)
├─ W1-15: Pure Language (Personal contexts)
│   ├─ Grammar: Present Simple, Present Continuous, Basic Past
│   ├─ Vocabulary: Family, animals, food, daily routines
│   ├─ Skills: Introduce, describe self, simple conversations
│   └─ Assessment: A1 → A2 level (CEFR)
│
├─ W16-54: Language + STEM Integration Begins
│   ├─ Grammar: SAME as W1-15 (anchor) + expand to Past Continuous
│   ├─ Vocabulary: 30-40% STEM (life cycles, simple machines, weather)
│   ├─ Skills: Describe science processes, solve word problems, ask "why" questions
│   └─ Assessment: A2 → B1 level

Phase 2: Expansion (Weeks 55-120)
├─ W55-90: Intermediate CLIL
│   ├─ Grammar: Present Perfect, Future tenses, Passive Voice intro
│   ├─ Vocabulary: 50-70% STEM (ecosystems, geometry, cause-effect)
│   ├─ Skills: Multi-step reasoning, compare/contrast, hypothesis formation
│   └─ Assessment: B1 → B1+ level
│
├─ W91-120: Advanced CLIL
│   ├─ Grammar: All tenses mastered, Conditionals (Type 1, 2)
│   ├─ Vocabulary: 70-80% STEM (biochemistry terms, algebra, scientific method)
│   ├─ Skills: Argumentation, evidence-based reasoning, creative problem-solving
│   └─ Assessment: B1+ → B2 level

Phase 3: Mastery (Weeks 121-156)
├─ W121-156: Expert Integration
│   ├─ Grammar: Advanced structures (Conditionals Type 3, Subjunctive)
│   ├─ Vocabulary: 80-90% STEM (academic terms across all sciences)
│   ├─ Skills: Independent research, debate, academic writing
│   └─ Assessment: B2 → C1 level (Advanced Mode), B1 → B2 (Easy Mode)
```

---

#### 5.2 Weekly Structure (Standard Template)

**Each Week Contains:**

```
📂 Week N (Example: Week 16 - Time Traveler)
│
├── 📖 1. READ & EXPLORE
│   ├─ Story (8-12 sentences Easy, 12-15 Advanced)
│   ├─ Theme: Dinosaurs, fossils, time travel
│   ├─ Grammar: Present Simple (describe facts)
│   └─ Vocabulary: 10 theme words (dinosaur, fossil, extinct, etc.)
│
├── 🤖 2. AI TUTOR (3 Modes)
│   ├─ Mode 1: Shadow Asking (repeat model questions - Phase 1)
│   ├─ Mode 2: Guided Asking (prompts given - Phase 2)
│   └─ Mode 3: Free Talk (open conversation - Phase 3)
│
├── 🧩 3. LOGIC LAB (W16+: Dual Sub-Tabs)
│   ├─ Sub-tab A: Logic & Science
│   │   ├─ 5-7 reasoning problems (pattern, logic yes/no, science facts)
│   │   └─ Focus: Critical thinking, deductive/inductive reasoning
│   ├─ Sub-tab B: Singapore Math
│   │   ├─ 5-7 word problems (part-whole, comparison, before-after)
│   │   └─ Focus: Bar Model, CPA method, math vocabulary
│   └─ (W1-15: Single tab with simple riddles/puzzles)
│
├── ❓ 4. ASK AI
│   ├─ Text-based Q&A with AI
│   ├─ W16+: STEM inquiry scaffolding
│   └─ Student types questions, AI responds pedagogically
│
├── 📝 5. GRAMMAR STATION
│   ├─ Explicit grammar lesson (5-8 slides)
│   ├─ Examples from week's theme
│   ├─ Practice exercises (drag-drop, fill-blank, sentence building)
│   └─ Mastery quiz (8-10 questions)
│
├── ✍️ 6. WRITING STATION
│   ├─ Guided writing prompt (theme-based)
│   ├─ W1-15: Personal narrative (My Favorite Animal)
│   ├─ W16+ Easy: STEM description (My Favorite Planet - simple)
│   ├─ W16+ Advanced: STEM explanation (How Gravity Works - complex)
│   ├─ Sentence frames provided (Easy: heavy, Advanced: light)
│   └─ AI scoring (grammar, vocabulary, coherence)
│
├── 🎥 7. DAILY WATCH
│   ├─ 5 curated YouTube videos (3-10 min each)
│   ├─ W1-15: English Singsing, Little Fox, Peppa Pig
│   ├─ W16+: Add STEM channels (SciShow Kids, NatGeo Kids, Khan Academy Kids)
│   ├─ Distribution: 2 Grammar + 1 STEM Science + 1 Vocab + 1 Story
│   └─ Auto-generated queries (OpenAI YouTube API)
│
├── 🎮 8-13. MINI-GAMES (6 stations)
│   ├─ Matching Game (vocab pairs)
│   ├─ Word Search (10 theme words)
│   ├─ Crossword (clues in English)
│   ├─ Fill in the Blank (story completion)
│   ├─ Sentence Scramble (reorder words)
│   └─ Quiz Show (multiple choice, timed)
│
├── 🗣️ 14. PRONUNCIATION
│   ├─ 10 target words with IPA
│   ├─ Audio models (native speaker)
│   ├─ Student records voice
│   ├─ AI scoring (Whisper transcription + phoneme match)
│   └─ Feedback on specific sounds (e.g., "th" in "three")
│
├── 📊 15. PROGRESS CHECK
│   ├─ Weekly summary (all stations)
│   ├─ Accuracy %
│   ├─ Time spent
│   ├─ Skill breakdown (Grammar 85%, Vocab 92%, etc.)
│   └─ Recommendations (review W15 Grammar, advance to W17)
│
└── 🎁 16. BONUS GAMES (Unlockable)
    ├─ Story Mission (interactive narrative)
    ├─ Grammar Battle (competitive quiz)
    └─ Vocabulary Race (speed matching)
```

---

#### 5.3 STEM Integration Gradual Curve (W16-156)

**STEM % by Week:**

| Week Range | Phase | STEM Content % | Science Topics | Math Topics |
|------------|-------|---------------|----------------|-------------|
| **W1-15** | Foundation | 0% (Pure language) | None | Basic counting (contextual only) |
| **W16-25** | Early CLIL | 30% | Life cycles, simple weather | Addition/subtraction word problems |
| **W26-35** | Early CLIL | 40% | Animals, habitats, day/night | Part-whole, comparison |
| **W36-54** | Late CLIL | 50-60% | Food chains, plants, magnets | Missing addend, groups |
| **W55-75** | Intermediate | 60-70% | Ecosystems, water cycle, simple machines | Multiplication, division word problems |
| **W76-90** | Intermediate | 70-75% | States of matter, energy, geology | Fractions (concrete, bar models) |
| **W91-120** | Advanced CLIL | 75-85% | Cells, body systems, chemistry intro | Decimals, percentages, ratios |
| **W121-156** | Expert CLIL | 85-90% | Genetics, physics concepts, earth science | Pre-algebra, variables, equations |

**Rationale for Gradual Curve:**
- **Week 1-15:** Establish grammar foundation (no STEM cognitive load)
- **Week 16 (First STEM):** Only 30% STEM (7/10 vocab words = personal, 3/10 = STEM)
  - Example W16 story: "Max the Time Traveler meets a **dinosaur**. The **dinosaur** is big. Max sees **fossils**. Max asks, 'What are fossils?'"
  - 3 STEM words (dinosaur, fossils), 7 familiar words (meets, big, sees, asks, what, are)
- **Week 54 (End Phase 1):** 60% STEM (6/10 vocab = STEM, 4/10 = bridging/review)
- **Week 156 (Final):** 90% STEM (9/10 vocab = STEM, 1/10 = functional/connective)

**Effect on Cognitive Load:**
- W16: 30% STEM = 2.5 chunks total load (comfortable)
- W30: 50% STEM = 2.8 chunks (grammar now automatic, STEM vocab chunked from W16-29 exposure)
- W54: 60% STEM = 3.0 chunks (still below 4-chunk WM capacity)
- W90: 75% STEM = 3.2 chunks (student now 12 years old, WM capacity increased to 6 chunks)

---

### 6. STATION DESIGN PHILOSOPHY

**16 Stations + AI Tutor = 17 touchpoints/week**

**Design Criteria for Each Station:**
1. **Clear Learning Objective** (1 primary skill per station)
2. **Engagement Hook** (gamification, narrative, visual appeal)
3. **Scaffolding Built-in** (hints, examples, progressive difficulty)
4. **Immediate Feedback** (right/wrong, explanations, score)
5. **Theme Coherence** (connects to week's theme)
6. **Dual-Mode Differentiation** (Easy vs Advanced paths)
7. **Accessibility** (colorblind-friendly, audio support, clear UI)
8. **Mobile-Optimized** (touch-friendly, works on tablets/phones)

**Station Categories:**

```
📚 Core Learning Stations (Must-complete, 60% of grade)
├─ Read & Explore (comprehension)
├─ AI Tutor (speaking, conversation)
├─ Logic Lab (critical thinking, math)
├─ Grammar Station (explicit instruction)
├─ Writing Station (production)
└─ Pronunciation (phonetics)

🎮 Practice Stations (Reinforcement, 30% of grade)
├─ Ask AI (Q&A, inquiry)
├─ Daily Watch (video immersion)
├─ Matching Game
├─ Word Search
├─ Crossword
├─ Fill in the Blank
├─ Sentence Scramble
└─ Quiz Show

🎁 Bonus Stations (Optional, 10% extra credit)
├─ Story Mission (narrative game)
├─ Grammar Battle (competitive)
└─ Vocabulary Race (speed challenge)
```

---

## PART III: DETAILED STATION BREAKDOWN

### 📖 STATION 1: READ & EXPLORE

#### Purpose:
Develop **reading comprehension, vocabulary acquisition, and narrative understanding** through thematically coherent stories.

#### Structure:

**A. Story Presentation**
```
┌────────────────────────────────────────┐
│ [Image: Max with dinosaur]             │
│                                        │
│ 🔊 Audio: Auto-play option             │
│                                        │
│ Easy Mode (8 sentences):               │
│ "Max is a time traveler. He goes to   │
│  the past. He sees big dinosaurs. The  │
│  dinosaurs are strong. Max finds a     │
│  fossil. A fossil is very old. Max    │
│  takes a photo. He is happy!"          │
│                                        │
│ Advanced Mode (12 sentences):          │
│ "Max the Explorer discovers a time     │
│  machine. He travels to the Jurassic   │
│  period. Massive dinosaurs roam the    │
│  land. T-Rex hunts for prey. Max       │
│  observes a fossilized footprint. He   │
│  learns fossils preserve ancient life. │
│  The herbivores eat plants. The        │
│  carnivores eat meat. Max documents    │
│  everything. He wonders how extinction │
│  happened. Time travel is amazing!"    │
└────────────────────────────────────────┘
```

**B. Interactive Elements**
- **Hotspot Words:** Click STEM terms (dinosaur, fossil) → definition popup + image
- **Highlighter:** Student can highlight phrases → save to "My Vocabulary Bank"
- **Translation Toggle:** Vietnamese translation available (but hidden by default to encourage English immersion)
- **Audio Control:** Sentence-by-sentence playback or full story

**C. Comprehension Check (5 questions)**
```
Q1: Where does Max go? 
   [a) The future  b) The past  c) The ocean]

Q2: What does Max find?
   [a) A shell  b) A fossil  c) A toy]

Q3 (Advanced Only): What is the difference between herbivores and carnivores?
   [Open text response, AI-scored]

Q4: True or False: Fossils are new.
   [True / False]

Q5 (Inference): Why is Max happy at the end?
   [a) He learned something  b) He is hungry  c) He is tired]
```

**D. STEM Integration (W16+ Only)**

**Easy Mode:**
- Vocabulary: 3 STEM terms (dinosaur, fossil, extinct)
- Context: Observable facts (Dinosaurs are big, Fossils are old)
- Complexity: Single-clause sentences

**Advanced Mode:**
- Vocabulary: 7 STEM terms (Jurassic, carnivore, herbivore, fossilized, extinction, predator, prey)
- Context: Explanatory (T-Rex hunts prey = predator-prey relationship)
- Complexity: Multi-clause sentences (cause-effect, time sequences)

**E. Pedagogical Goals**
- **Linguistic:** Vocab acquisition via context, grammar reinforcement (week's target structures)
- **Cognitive:** Inference, sequencing, cause-effect reasoning
- **STEM (W16+):** Science literacy (paleontology basics), academic vocabulary

---

### 🤖 STATION 2: AI TUTOR (Adaptive Conversation)

#### Purpose:
Develop **speaking fluency, conversational competence, and inquiry skills** through dynamic AI-powered dialogues.

#### AI Architecture:

**A. Technology Stack**
- **Language Model:** GPT-4o (OpenAI) - multimodal, low latency
- **Speech Recognition:** Whisper API (speech-to-text)
- **Text-to-Speech:** OpenAI TTS HD (natural prosody, multiple voices)
- **Prompt Engineering:** Custom system prompts per Phase + Mode
- **Memory:** Conversation history (session-based) + Student profile (persistent)

**B. Three Modes by Phase**

**MODE 1: Shadow Asking (Phase 1, W1-54)**
```
Goal: Student learns to ASK questions (not just answer)

AI: "Let me show you how to ask about dinosaurs."
AI: "First, I'll ask: 'What is a dinosaur?'"
AI: "Now, you ask the same question."
Student: [records] "What is a dinosaur?"
AI: "Great! Now I answer: A dinosaur is a very old animal."
AI: "Next question: 'Are dinosaurs alive today?'"
AI: "You try..."
Student: [records] "Are dinosaurs alive today?"
AI: "Perfect! No, dinosaurs are extinct. They lived long ago."

Pattern: AI models → Student shadows → AI provides content answer
```

**MODE 2: Guided Asking (Phase 2, W55-120)**
```
Goal: Student asks questions with prompts (less modeling)

AI: "Let's talk about ecosystems. Ask me a question about food chains."
Student: [thinks, then records] "What is a food chain?"
AI: "Good question! A food chain shows who eats whom. For example..."
AI: "Now ask about an animal in the food chain."
Student: "What does a rabbit eat?"
AI: "Rabbits eat grass and plants. They are herbivores. What else would you like to know?"

Pattern: AI prompts topic → Student generates question → AI answers + prompts next
```

**MODE 3: Free Talk (Phase 3, W121-156)**
```
Goal: Open conversation, student-driven

Student: [initiates] "Why do we need to protect rainforests?"
AI: "That's a thoughtful question! Rainforests produce oxygen and are home to millions of species. What do you think happens if we cut them all down?"
Student: "Animals lose their homes?"
AI: "Exactly! And it also affects climate. Have you heard about CO2 and global warming?"
Student: "A little. Can you explain?"
AI: [provides explanation, asks follow-up to deepen understanding]

Pattern: Student drives conversation, AI scaffolds learning through Socratic questions
```

**C. Prompt Engineering (Example: Mode 1, Easy, W16)**

```
System Prompt:
You are a friendly English tutor for a 6-year-old Vietnamese child learning about dinosaurs. This is Week 16, Phase 1, Easy Mode, Shadow Asking.

RULES:
1. Speak at A2 level (simple sentences, present simple tense)
2. Use only these STEM words: dinosaur, fossil, extinct, carnivore, herbivore
3. Model questions first, then ask student to repeat
4. After student asks, YOU answer the question (don't ask student to answer)
5. Give positive feedback ("Great job!", "Perfect!") after each successful repetition
6. If student makes grammar error, gently model correct form without explicit correction
7. Keep conversation to 5 question cycles (10 turns total)
8. End with: "You asked great questions today! See you next time!"

THEME: Time Traveler meets dinosaurs
GRAMMAR FOCUS: Present Simple, Wh- questions
CONVERSATION FLOW:
- Model: "What is a dinosaur?"
- Student repeats
- You answer: "A dinosaur is a very old, big animal."
- Model: "Are dinosaurs alive?"
- Student repeats
- You answer: "No, dinosaurs are extinct. Extinct means they are all gone."
[Continue for 5 cycles]
```

**D. Safety & Guardrails**
- **Content Filter:** Block inappropriate topics (violence, politics, religion)
- **Age-Appropriate Language:** GPT-4o fine-tuned to avoid complex/adult vocabulary
- **No Personal Data Collection:** Student name = pseudonym, no sharing with third parties
- **Moderation:** Parent/teacher can review conversation transcripts

**E. Assessment & Feedback**

**Metrics Tracked:**
1. **Fluency:** Words per minute (WPM), hesitation count
2. **Accuracy:** Grammar errors (Whisper transcription → GPT-4o analysis)
3. **Vocabulary:** New words used, STEM terms correctly applied
4. **Engagement:** Questions asked, follow-up depth

**Post-Conversation Report:**
```
┌────────────────────────────────────────┐
│ AI TUTOR SESSION SUMMARY               │
├────────────────────────────────────────┤
│ Date: March 16, 2026                   │
│ Duration: 8 minutes                    │
│ Questions Asked: 6                     │
│ New Vocabulary Used: 3 (fossil, extinct,│
│   carnivore)                           │
│ Grammar Accuracy: 85%                  │
│ Fluency: 45 WPM (Good for age!)        │
│                                        │
│ 🌟 Highlights:                         │
│ - Great pronunciation of "dinosaur"!   │
│ - Used "extinct" correctly in sentence │
│                                        │
│ 💡 Areas to Practice:                  │
│ - Past tense ("I see" → "I saw")      │
│                                        │
│ 🎯 Next Session Goal:                  │
│ - Practice asking "Why" questions      │
└────────────────────────────────────────┘
```

---

### 🧩 STATION 3: LOGIC LAB (W16+: Dual Sub-Tabs)

#### Purpose:
Develop **critical thinking, mathematical reasoning, and problem-solving** through logic puzzles and Singapore Math word problems.

#### Structure (W16+ STEM Integration):

**A. Dual Sub-Tab Architecture**

```
┌─────────────────────────────────────────┐
│ LOGIC LAB                               │
├──────────────────┬──────────────────────┤
│ 📊 Sub-tab 1:    │ 🔢 Sub-tab 2:        │
│ Logic & Science  │ Singapore Math       │
│                  │                      │
│ 5-7 Problems     │ 5-7 Problems         │
│ Focus: Reasoning │ Focus: Word Problems │
└──────────────────┴──────────────────────┘
```

**WHY Dual Sub-Tabs?**
1. **Separation of Skills:**
   - Logic & Science = critical thinking, reasoning patterns (NO arithmetic)
   - Singapore Math = applied arithmetic, bar models (NO abstract logic)
   - Mixing them = confusing for children ("Is this logic or math?")

2. **Pedagogical Research:**
   - Brain uses DIFFERENT circuits for deductive reasoning vs calculation
   - Trần Đại Nghĩa exam separates these (Section 1: Logic, Section 2: Math)
   - Singapore curriculum treats as distinct skills

3. **Differentiation:**
   - Some students excel at logic but struggle with math → can show strength
   - Some students love math but find logic frustrating → balanced assessment

---

#### B. SUB-TAB 1: Logic & Science

**Question Types (5 types):**

**Type 1: PATTERN RECOGNITION**
```
Example (Easy):
┌────────────────────────────────────┐
│ What comes next?                   │
│ [🦖] [🦕] [🦖] [🦕] [?]            │
│                                    │
│ Answer choices:                    │
│ a) 🦖                               │
│ b) 🦕                               │
│ c) 🐢                               │
└────────────────────────────────────┘
Reasoning Type: Inductive (pattern observation)

Example (Advanced):
┌────────────────────────────────────┐
│ Complete the sequence:             │
│ Egg → Larva → Pupa → ?             │
│                                    │
│ a) Egg                             │
│ b) Adult                           │
│ c) Larva                           │
│                                    │
│ Explain: Why did you choose this? │
│ [Open text field]                  │
└────────────────────────────────────┘
Reasoning Type: Inductive + Science knowledge (life cycle)
```

**Type 2: LOGIC YES/NO (Deductive Reasoning)**
```
Example (Easy):
┌────────────────────────────────────┐
│ Statement: T-Rex eats meat.        │
│ Question: Is T-Rex a vegetarian?   │
│                                    │
│ a) Yes                             │
│ b) No                              │
└────────────────────────────────────┘
Logic: If carnivore → NOT vegetarian (deduction)

Example (Advanced):
┌────────────────────────────────────┐
│ Facts:                             │
│ 1. All carnivores eat meat.        │
│ 2. T-Rex is a carnivore.           │
│ 3. Rabbits eat plants.             │
│                                    │
│ Can T-Rex eat rabbits?             │
│ a) Yes  b) No  c) Not enough info  │
│                                    │
│ Explain your reasoning:            │
│ [Open text]                        │
└────────────────────────────────────┘
Logic: Syllogism (All A are B, C is A, therefore C is B)
```

**Type 3: SCIENCE FACT (Factual Recall + Application)**
```
Example (Easy):
┌────────────────────────────────────┐
│ [Image: Butterfly]                 │
│ What was this animal before?       │
│                                    │
│ a) A fish                          │
│ b) A caterpillar                   │
│ c) An egg                          │
└────────────────────────────────────┘

Example (Advanced):
┌────────────────────────────────────┐
│ Which statement is TRUE?           │
│                                    │
│ a) Fossils are alive.              │
│ b) Fossils show us ancient life.   │
│ c) All rocks are fossils.          │
│                                    │
│ Why is your answer true?           │
│ [Open text]                        │
└────────────────────────────────────┘
```

**Type 4: TOOL FUNCTION (Functional Reasoning)**
```
Example (Easy):
┌────────────────────────────────────┐
│ What do we use to see far away?    │
│                                    │
│ a) Microscope                      │
│ b) Telescope                       │
│ c) Thermometer                     │
└────────────────────────────────────┘

Example (Advanced):
┌────────────────────────────────────┐
│ A scientist wants to study cells.  │
│ Which tool should she use?         │
│                                    │
│ a) Telescope (sees stars)          │
│ b) Microscope (sees tiny things)   │
│ c) Ruler (measures length)         │
│                                    │
│ Explain why:                       │
│ [Open text]                        │
└────────────────────────────────────┘
```

**Type 5: CLASSIFICATION (Categorical Reasoning)**
```
Example (Easy):
┌────────────────────────────────────┐
│ Which one is different?            │
│                                    │
│ a) 🦖 T-Rex                         │
│ b) 🦕 Brachiosaurus                 │
│ c) 🐢 Turtle                        │
└────────────────────────────────────┘
Answer: c (Turtle is alive, dinosaurs extinct)

Example (Advanced):
┌────────────────────────────────────┐
│ Classify these animals:            │
│ Lion, Rabbit, Fox, Deer            │
│                                    │
│ Carnivores: [Drag here]            │
│ Herbivores: [Drag here]            │
│                                    │
│ Explain the rule you used:         │
│ [Open text]                        │
└────────────────────────────────────┘
```

---

#### C. SUB-TAB 2: Singapore Math

**CPA Method Application:**

**Phase 1 (W16-54): Concrete → Pictorial (Heavy Bar Models)**

**Question Types (5 types):**

**Type 1: PART-WHOLE**
```
Example (Easy):
┌────────────────────────────────────┐
│ A T-Rex ate 5 eggs on Monday and   │
│ 3 eggs on Tuesday. How many eggs   │
│ in total?                          │
│                                    │
│ Bar Model:                         │
│ Monday:  [🥚🥚🥚🥚🥚]                          │
│ Tuesday: [🥚🥚🥚]                             │
│ ────────────────────               │
│ Total:   [________] eggs           │
│                                    │
│ Answer: [___] eggs                 │
└────────────────────────────────────┘

Data Structure (backend):
{
  "type": "part_whole",
  "question_en": "A T-Rex ate 5 eggs on Monday and 3 eggs on Tuesday. How many eggs in total?",
  "answer": ["8 eggs", "8"],
  "bar_model": "/images/week16/bar_model_part_whole_1.svg",
  "cpa_stage": "pictorial",
  "math_vocab": ["total", "part", "whole", "add"],
  "difficulty": "easy"
}
```

**Type 2: COMPARISON**
```
Example (Easy):
┌────────────────────────────────────┐
│ Max found 7 fossils. Mia found 4.  │
│ Who found more? How many more?     │
│                                    │
│ Bar Model:                         │
│ Max: [■■■■■■■]                      │
│ Mia: [■■■■]                         │
│       └───┘ Difference = ?         │
│                                    │
│ Answer:                            │
│ Who found more? [Max / Mia]        │
│ How many more? [___] fossils       │
└────────────────────────────────────┘

Data:
{
  "type": "comparison",
  "question_en": "Max found 7 fossils. Mia found 4. Who found more? How many more?",
  "answer": ["Max", "3", "3 more", "3 fossils"],
  "bar_model": "/images/week16/bar_model_comparison_1.svg",
  "cpa_stage": "pictorial",
  "math_vocab": ["more", "fewer", "difference", "compare"],
  "difficulty": "easy"
}
```

**Type 3: MISSING PART**
```
Example (Easy):
┌────────────────────────────────────┐
│ There were 10 dinosaurs. Some ran  │
│ away. Now there are 6. How many    │
│ ran away?                          │
│                                    │
│ Bar Model:                         │
│ [■■■■■■■■■■] Total = 10             │
│ [■■■■■■] Remaining = 6              │
│ [????] Ran away = ?                │
│                                    │
│ Strategy: Whole - Part = Other Part│
│ Answer: [___] dinosaurs            │
└────────────────────────────────────┘

Data:
{
  "type": "missing_part",
  "question_en": "There were 10 dinosaurs. Some ran away. Now there are 6. How many ran away?",
  "answer": ["4", "4 dinosaurs"],
  "bar_model": "/images/week16/bar_model_missing_part_1.svg",
  "cpa_stage": "pictorial",
  "math_vocab": ["missing", "left", "remaining", "subtract"],
  "difficulty": "easy",
  "strategy_hint": "Whole - Part = Other Part"
}
```

**Type 4: GROUPS (Multiplication Intro)**
```
Example (Easy - Phase 1):
┌────────────────────────────────────┐
│ A Triceratops has 3 horns. There   │
│ are 4 Triceratops. How many horns  │
│ in total?                          │
│                                    │
│ Bar Model:                         │
│ Triceratops 1: [horn horn horn]    │
│ Triceratops 2: [horn horn horn]    │
│ Triceratops 3: [horn horn horn]    │
│ Triceratops 4: [horn horn horn]    │
│ ─────────────────────────          │
│ Total: [___] horns                 │
│                                    │
│ Strategy: Count all, or add        │
│ 3 + 3 + 3 + 3 = [___]              │
└────────────────────────────────────┘

Data:
{
  "type": "groups",
  "question_en": "A Triceratops has 3 horns. There are 4 Triceratops. How many horns in total?",
  "answer": ["12", "12 horns"],
  "bar_model": "/images/week16/bar_model_groups_1.svg",
  "cpa_stage": "pictorial",
  "math_vocab": ["groups", "each", "in total"],
  "difficulty": "easy",
  "note": "Multiplication NOT taught yet, use repeated addition"
}
```

**Type 5: BEFORE-AFTER (Timeline)**
```
Example (Easy):
┌────────────────────────────────────┐
│ A caterpillar was 3 cm long. After │
│ eating, it grew 2 cm. How long is  │
│ it now?                            │
│                                    │
│ Bar Model:                         │
│ Before: [■■■] 3 cm                 │
│ Grew:   [■■] 2 cm                  │
│ ──────────────────                 │
│ After:  [■■■■■] ? cm               │
│                                    │
│ Answer: [___] cm                   │
└────────────────────────────────────┘

Data:
{
  "type": "before_after",
  "question_en": "A caterpillar was 3 cm long. After eating, it grew 2 cm. How long is it now?",
  "answer": ["5", "5 cm"],
  "bar_model": "/images/week16/bar_model_before_after_1.svg",
  "cpa_stage": "pictorial",
  "math_vocab": ["before", "after", "grew", "change"],
  "difficulty": "easy"
}
```

---

**Advanced Mode Differences:**
- **Numbers:** Easy uses 0-10, Advanced uses 10-20 (or higher)
- **Steps:** Easy = 1 operation, Advanced = 2 operations
- **Vocabulary:** Easy = everyday terms, Advanced = academic terms
- **Bar Models:** Easy = heavily pictorial (images of eggs), Advanced = abstract bars (rectangles with numbers)

**Example (Advanced, Type 1: Part-Whole, 2-step):**
```
┌────────────────────────────────────┐
│ In the Jurassic period, there were │
│ 15 carnivorous dinosaurs and 28    │
│ herbivorous dinosaurs. How many    │
│ dinosaurs in total? If 12 became   │
│ extinct, how many remained?        │
│                                    │
│ Step 1 Bar Model:                  │
│ Carnivores: [■■■■■■■■■■■■■■■] 15    │
│ Herbivores: [■■■■...] 28            │
│ ───────────────────────            │
│ Total: [___]                       │
│                                    │
│ Step 2 Bar Model:                  │
│ Total:    [■■■■...] (from Step 1)  │
│ Extinct:  [■■■■...] 12              │
│ ─────────────────────              │
│ Remaining: [___]                   │
└────────────────────────────────────┘
```

---

#### D. Assessment & Feedback (Logic Lab)

**Metrics:**
- **Accuracy:** % correct per question type
- **Time:** Avg seconds per problem (flag if >3x baseline = struggling)
- **Strategy:** Which bar model type used (automatically detected from student's drawing if interactive)
- **Progression:** Track mastery of each question type (Need 80% accuracy 3 weeks in a row = mastered)

**Feedback Example:**
```
┌────────────────────────────────────┐
│ LOGIC LAB RESULTS                  │
├────────────────────────────────────┤
│ Logic & Science: 6/7 correct (86%) │
│ ✅ Pattern: 3/3                     │
│ ✅ Logic YES/NO: 2/2                │
│ ⚠️ Science Fact: 1/2                │
│                                    │
│ Singapore Math: 5/7 correct (71%)  │
│ ✅ Part-Whole: 2/2                  │
│ ⚠️ Comparison: 1/2                  │
│ ❌ Missing Part: 0/1                │
│ ✅ Groups: 2/2                      │
│                                    │
│ 💡 Recommendation:                  │
│ Practice "Missing Part" problems.  │
│ Try drawing the bar model first!   │
└────────────────────────────────────┘
```

---

### ❓ STATION 4: ASK AI (Text-Based Q&A)

#### Purpose:
Develop **written English fluency, inquiry skills, and STEM curiosity** through text-based dialogue with AI.

#### Difference from AI Tutor (Station 2):
| Aspect | AI Tutor (Station 2) | Ask AI (Station 4) |
|--------|---------------------|-------------------|
| **Modality** | Voice (speaking practice) | Text (writing practice) |
| **Structure** | Guided (3 modes: Shadow/Guided/Free) | Fully open (student types ANY question) |
| **Scaffolding** | High (AI prompts conversation flow) | Low (student initiates all questions) |
| **Primary Skill** | Speaking fluency, pronunciation | Writing fluency, question formation |
| **STEM Focus** | Moderate (theme-based) | High (inquiry-driven) |

#### Structure:

**A. Interface**
```
┌────────────────────────────────────┐
│ ASK AI - Week 16: Time Traveler    │
├────────────────────────────────────┤
│ Chat History:                      │
│                                    │
│ 🧒 Student: What is a fossil?      │
│ 🤖 AI: A fossil is the remains of  │
│    an ancient plant or animal      │
│    preserved in rock. For example, │
│    a dinosaur bone that turned to  │
│    stone over millions of years.   │
│                                    │
│ 🧒 Student: Why do dinosaurs turn  │
│    into fossils?                   │
│ 🤖 AI: Good question! When a       │
│    dinosaur dies, it gets buried   │
│    in mud. Over time, minerals     │
│    replace the bones, turning them │
│    into rock. This takes millions  │
│    of years!                       │
│                                    │
│ [Type your question here...]       │
│ [Send Button] [Hint Button]        │
└────────────────────────────────────┘
```

**B. STEM Inquiry Scaffolding (W16+ Only)**

**Phase 1 (W16-54): Shadow Asking in Text**
- **Hint Button:** Suggests 3 pre-written question starters
  ```
  💡 Try asking:
  - "What is [theme word]?"
  - "Why do [science process]?"
  - "How does [concept] work?"
  ```
- **AI Response:** Provides answer + follow-up prompt
  ```
  AI: "Great question about fossils! They form when..."
  AI: "Now try asking: How do scientists find fossils?"
  ```

**Phase 2 (W55-120): Guided Inquiry**
- **Hint Button:** Suggests question TYPES (not full questions)
  ```
  💡 You could ask about:
  - Definitions (What is...?)
  - Causes (Why does...?)
  - Processes (How does...?)
  - Comparisons (What's the difference between...?)
  ```
- **AI Response:** Socratic follow-ups to deepen thinking
  ```
  Student: "What is photosynthesis?"
  AI: "Photosynthesis is how plants make food from sunlight. 
      What do you think plants need besides sunlight?"
  Student: "Water?"
  AI: "Exactly! And one more thing... it's a gas in the air. 
      Can you guess?"
  ```

**Phase 3 (W121-156): Free Inquiry**
- **No hints** (student fully independent)
- **AI Response:** Challenges student to think deeper
  ```
  Student: "Why do we need rainforests?"
  AI: "Rainforests produce oxygen and store carbon. But let me 
      ask YOU: What do you think happens to CO2 levels if we 
      cut down rainforests?"
  Student: [types answer]
  AI: [evaluates, corrects misconceptions, extends thinking]
  ```

**C. Safety & Content Moderation**

Same as AI Tutor:
- Content filter (inappropriate topics blocked)
- Age-appropriate vocabulary
- Parent/teacher transcript review available

**D. Assessment**

**Metrics:**
- **Question Quality:** Simple (What is X?) vs Complex (Why does X cause Y?)
- **Vocabulary Used:** Track STEM terms used correctly
- **Engagement:** Number of questions asked (target: 5-10 per session)
- **Grammar:** Automatic error detection (but NO explicit correction to avoid discouraging)

**Report:**
```
┌────────────────────────────────────┐
│ ASK AI SESSION SUMMARY             │
├────────────────────────────────────┤
│ Questions Asked: 8                 │
│ Question Types:                    │
│ - Definitions: 4 (What is...)      │
│ - Explanations: 3 (Why/How...)     │
│ - Comparisons: 1 (Difference...)   │
│                                    │
│ STEM Terms Used:                   │
│ ✅ fossil (3 times)                 │
│ ✅ carnivore (1 time)               │
│ ✅ extinct (2 times)                │
│                                    │
│ Grammar Notes:                     │
│ ⚠️ "Why dinosaurs died?" →          │
│    Correct: "Why did dinosaurs die?"│
│                                    │
│ 🌟 Great job exploring fossils!    │
└────────────────────────────────────┘
```

---

### 📝 STATION 5: GRAMMAR STATION

#### Purpose:
Provide **explicit grammar instruction** following Syllabus progression, with contextualized practice using week's theme.

#### Structure:

**A. Lesson Flow (5-8 Interactive Slides)**

**Slide 1: Learning Objective**
```
┌────────────────────────────────────┐
│ 🎯 This Week's Grammar:            │
│                                    │
│ PRESENT SIMPLE TENSE               │
│                                    │
│ Use: To talk about facts and       │
│      habits                        │
│                                    │
│ Examples:                          │
│ ✅ Dinosaurs eat plants. (fact)    │
│ ✅ I study English every day.      │
│    (habit)                         │
└────────────────────────────────────┘
```

**Slide 2: Form (Structure)**
```
┌────────────────────────────────────┐
│ HOW TO BUILD IT:                   │
│                                    │
│ Subject + Verb (+ s/es for he/she/it)│
│                                    │
│ I eat        We eat                │
│ You eat      You eat               │
│ He eats      They eat              │
│ She eats                           │
│ It eats                            │
│                                    │
│ Negative:                          │
│ I do not (don't) eat               │
│ He does not (doesn't) eat          │
│                                    │
│ Question:                          │
│ Do you eat...?                     │
│ Does he eat...?                    │
└────────────────────────────────────┘
```

**Slide 3: Contextualized Examples (Week's Theme)**
```
┌────────────────────────────────────┐
│ EXAMPLES FROM TIME TRAVELER:       │
│                                    │
│ ✅ T-Rex eats meat.                 │
│ ✅ Max finds a fossil.              │
│ ✅ Dinosaurs live in the Jurassic   │
│    period.                         │
│                                    │
│ ❌ T-Rex eating meat. (wrong!)      │
│ ❌ Max find a fossil. (wrong!)      │
└────────────────────────────────────┘
```

**Slide 4-6: Practice Exercises**

**Exercise 1: Drag & Drop**
```
┌────────────────────────────────────┐
│ Complete the sentence:             │
│                                    │
│ The caterpillar [___] leaves.      │
│                                    │
│ Drag the correct word:             │
│ [eat]  [eats]  [eating]            │
└────────────────────────────────────┘
```

**Exercise 2: Multiple Choice**
```
┌────────────────────────────────────┐
│ Which sentence is correct?         │
│                                    │
│ a) Dinosaurs is extinct.           │
│ b) Dinosaurs are extinct.          │
│ c) Dinosaurs be extinct.           │
└────────────────────────────────────┘
```

**Exercise 3: Sentence Building**
```
┌────────────────────────────────────┐
│ Put the words in order:            │
│                                    │
│ [fossil]  [find]  [Max]  [a]       │
│                                    │
│ Correct order:                     │
│ [____] [____] [____] [____]        │
└────────────────────────────────────┘
Answer: Max finds a fossil.
```

**Slide 7: Mastery Quiz (10 questions)**
```
Mix of drag-drop, multiple choice, sentence building
Passing score: 70% (7/10 correct)
If fail: Must review + retake
```

**Slide 8: Summary & Next Week Preview**
```
┌────────────────────────────────────┐
│ 🎉 You mastered Present Simple!    │
│                                    │
│ Remember:                          │
│ ✅ Use for facts and habits         │
│ ✅ Add s/es for he/she/it           │
│                                    │
│ Preview - Next Week:               │
│ Present Continuous (I am eating)   │
└────────────────────────────────────┘
```

---

**B. STEM Integration (W16+ Examples)**

All grammar examples use week's STEM context:

**Week 16 (Dinosaurs):**
- Present Simple: "T-Rex eats meat." "Fossils preserve ancient life."

**Week 17 (Space):**
- Present Simple: "The Earth orbits the Sun." "Astronauts float in space."

**Week 30 (Ecosystems):**
- Present Simple: "Plants produce oxygen." "Animals depend on food chains."

**Rationale:** 
- Grammar taught explicitly BUT with STEM content
- Reinforces week's vocabulary
- Shows grammar as TOOL for describing science (CLIL principle)

---

**C. Dual-Mode Differentiation**

| Aspect | Easy Mode | Advanced Mode |
|--------|-----------|---------------|
| **Exercises** | 10 questions | 15 questions |
| **Sentence Length** | 4-6 words | 8-12 words |
| **Vocabulary** | Everyday STEM terms | Academic STEM terms |
| **Mastery Threshold** | 70% (7/10) | 80% (12/15) |

**Example (Week 16):**

**Easy:**
- "The caterpillar eats leaves." (6 words, simple vocab)

**Advanced:**
- "The larva consumes nutrients before metamorphosis." (6 words but academic vocab + complex concept)

---

### ✍️ STATION 6: WRITING STATION

#### Purpose:
Develop **written expression, composition skills, and STEM expository writing** through guided prompts.

#### Structure:

**A. Prompt Presentation**

**W1-15 (Personal Narrative):**
```
┌────────────────────────────────────┐
│ 📝 WRITING PROMPT - Week 10        │
│                                    │
│ Topic: My Favorite Animal          │
│                                    │
│ Write 5-8 sentences about your     │
│ favorite animal. Use:              │
│ - Present Simple tense             │
│ - Describing words (big, small,...)│
│                                    │
│ Sentence frames (Easy Mode):       │
│ 1. My favorite animal is _____.   │
│ 2. It is _____ and _____.          │
│ 3. It eats _____.                  │
│ 4. It lives in _____.              │
│ 5. I like it because _____.        │
└────────────────────────────────────┘
```

**W16+ (STEM Description - Easy Mode):**
```
┌────────────────────────────────────┐
│ 📝 WRITING PROMPT - Week 16 (Easy) │
│                                    │
│ Topic: My Favorite Dinosaur        │
│                                    │
│ Write 6-8 sentences about a        │
│ dinosaur. Tell about:              │
│ - What it looks like               │
│ - What it eats                     │
│ - Where it lives                   │
│                                    │
│ Sentence frames:                   │
│ 1. My favorite dinosaur is _____.  │
│ 2. It has _____.                   │
│ 3. It is _____ (big/small).        │
│ 4. It eats _____.                  │
│ 5. It is a _____ (carnivore/       │
│    herbivore).                     │
│ 6. It lives in _____.              │
│ 7. I think it is _____.            │
└────────────────────────────────────┘
```

**W16+ (STEM Explanation - Advanced Mode):**
```
┌────────────────────────────────────┐
│ 📝 WRITING PROMPT - Week 16 (Adv)  │
│                                    │
│ Topic: How Fossils Form            │
│                                    │
│ Write 10-15 sentences explaining   │
│ the process of fossilization.      │
│ Include:                           │
│ - What happens when animal dies    │
│ - How bones are preserved          │
│ - How long it takes                │
│ - Why fossils are important        │
│                                    │
│ Use these sequence words:          │
│ First, Next, Then, After that,     │
│ Finally                            │
│                                    │
│ Use these STEM words (at least 5): │
│ fossil, ancient, preserve, buried, │
│ minerals, sediment, layers, extinct│
└────────────────────────────────────┘
```

---

**B. Writing Interface**

```
┌────────────────────────────────────┐
│ [Topic displayed above]            │
│                                    │
│ Write your answer here:            │
│ ┌────────────────────────────────┐ │
│ │ [Text area - 15 line minimum]  │ │
│ │                                │ │
│ │                                │ │
│ │ [Student types here...]        │ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Word count: 0 / Target: 50-80      │
│                                    │
│ [Save Draft] [Submit]              │
│                                    │
│ 💡 Tips:                            │
│ - Use capital letters for sentences│
│ - End sentences with periods (.!)  │
│ - Check spelling before submit     │
└────────────────────────────────────┘
```

---

**C. AI Scoring System**

**Criteria (4 dimensions):**

**1. Grammar (30%)**
- Correct tense usage
- Subject-verb agreement
- Sentence structure

**2. Vocabulary (30%)**
- STEM terms used correctly
- Variety (not repeating same words)
- Age-appropriate complexity

**3. Content (25%)**
- Answers prompt fully
- Includes required elements (W16 Easy: describe what eats, where lives, etc.)
- STEM accuracy (facts are correct)

**4. Coherence & Organization (15%)**
- Logical sequence
- Uses transition words (First, Next, Then)
- Clear introduction/conclusion

**Scoring Output:**
```
┌────────────────────────────────────┐
│ WRITING SCORE: 82/100 (B+)         │
├────────────────────────────────────┤
│ Grammar: 25/30 ⭐⭐⭐⭐              │
│ ✅ Good tense usage                 │
│ ⚠️ One error: "It eat" → "It eats" │
│                                    │
│ Vocabulary: 28/30 ⭐⭐⭐⭐⭐          │
│ ✅ Excellent STEM words: fossil,    │
│    carnivore, extinct, ancient     │
│                                    │
│ Content: 22/25 ⭐⭐⭐⭐              │
│ ✅ Answered all parts of prompt     │
│ ⚠️ Could add more details about     │
│    where dinosaur lives            │
│                                    │
│ Coherence: 7/15 ⭐⭐                │
│ ⚠️ Use transition words (First,     │
│    Next, Then) to connect ideas    │
│                                    │
│ 🎉 Great job! Keep practicing       │
│    transition words to improve     │
│    organization.                   │
└────────────────────────────────────┘
```

---

**D. Feedback & Improvement Loop**

**Option to Revise:**
```
Your score: 82/100

Would you like to revise and improve your writing?
[Yes - Show me how] [No - Submit as is]

[If Yes]
→ AI provides specific suggestions:
  "Try adding transition words here:
   'First, the dinosaur dies. Next, it gets buried...'"
  
→ Student revises

→ Resubmit for new score (can improve up to 95/100 max)
```

---

### 🎥 STATION 7: DAILY WATCH (YouTube Video Curation)

#### Purpose:
Provide **authentic English immersion** through curated educational videos aligned with week's theme and grammar.

#### Structure:

**A. Video Distribution (5 videos per week)**

**W1-15 (Language-only):**
- **2 Grammar videos:** English Singsing, Little Fox (grammar songs/stories)
- **1 Story video:** Peppa Pig, Super Simple Songs (narrative)
- **1 Vocabulary video:** Sesame Street, BBC Learning English
- **1 Review/Fun video:** Fun Kids English, Dream English

**W16+ (STEM Integration):**
- **2 Grammar videos:** (maintained - grammar anchor principle)
- **1 STEM Science video:** SciShow Kids, NatGeo Kids, Khan Academy Kids, Mystery Science
- **1 Vocabulary video:** (can be STEM-themed)
- **1 Story video:** (can be science narrative)

**Channels by Category:**

**Grammar (All weeks):**
- English Singsing (animated grammar lessons)
- Little Fox (story-based grammar)
- Fun Kids English (interactive)

**STEM Science (W16+ only):**
- **SciShow Kids:** Physics, Biology, Ecology (age 6-10)
- **National Geographic Kids:** Animals, Nature, Geography
- **Khan Academy Kids:** Math, Science concepts
- **Crash Course Kids:** Science topics (age 9-12, Phase 2+)
- **Mystery Science:** Hands-on investigations
- **Homeschool Pop:** Science, History, Geography

**Stories:**
- Peppa Pig (everyday situations)
- Little Fox Library (narrative stories)
- StoryBots (science stories W16+)

---

**B. Video Selection Criteria (Auto-Generated)**

**Technology:**
- **YouTube Data API v3:** Search by keywords
- **OpenAI GPT-4o:** Generate search queries from week theme
- **Manual Review:** Content team validates (no inappropriate content)

**Query Generation (Week 16 Example):**
```javascript
// Auto-generated by tools/generate_video_queries.js

{
  "weekId": "week_16",
  "theme": "Time Traveler",
  "grammar_focus": "Present Simple",
  "stem_topics": ["dinosaurs", "fossils", "paleontology"],
  
  "videos": [
    {
      "purpose": "GRAMMAR",
      "priority_search": "present simple tense dinosaurs facts",
      "backup_search": "simple present animals English Singsing",
      "channel_preference": ["English Singsing", "Fun Kids English"],
      "duration": "3-8 min"
    },
    {
      "purpose": "GRAMMAR",
      "priority_search": "present simple tense habits daily routine",
      "backup_search": "present tense Little Fox",
      "channel_preference": ["Little Fox", "Dream English"],
      "duration": "3-8 min"
    },
    {
      "purpose": "STEM_SCIENCE",
      "priority_search": "dinosaurs for kids what are fossils",
      "backup_search": "dinosaurs facts paleontology kids",
      "channel_preference": ["SciShow Kids", "NatGeo Kids", "Khan Academy Kids"],
      "duration": "4-10 min",
      "requirements": {
        "language": "English",
        "age_appropriate": "6-12",
        "scientifically_accurate": true
      }
    },
    {
      "purpose": "VOCABULARY",
      "priority_search": "dinosaur names types carnivore herbivore",
      "backup_search": "dinosaur vocabulary children"
    },
    {
      "purpose": "STORY",
      "priority_search": "time travel dinosaurs story kids",
      "backup_search": "dinosaur adventure story English"
    }
  ]
}
```

---

**C. Dual-Mode Differentiation (STEM Videos)**

**Easy Mode (W16+ STEM video):**
- **Criteria:**
  - Simple explanations (observable facts, not complex processes)
  - Everyday vocabulary (dinosaur, big, eat, not Jurassic, carnivorous)
  - Heavy visuals (lots of pictures/animations)
  - Shorter duration (3-6 min)
  - Channels: NatGeo Kids, Khan Academy Kids (simpler content)

**Example search (Easy):**
```
"what are dinosaurs simple explanation for kids"
"dinosaurs facts easy English"
```

**Advanced Mode (W16+ STEM video):**
- **Criteria:**
  - Complex explanations (processes, cause-effect)
  - Academic vocabulary (Mesozoic era, extinction event, fossilization)
  - More text/narration (less reliance on visuals)
  - Longer duration (6-10 min)
  - Channels: SciShow Kids, Crash Course Kids (deeper content)

**Example search (Advanced):**
```
"how fossils form process paleontology kids"
"dinosaur extinction asteroid impact theory"
```

---

**D. Video Quality Assurance**

**Red Flags (Manual reviewers reject):**
- ❌ Not in English (or mostly non-English)
- ❌ Scientifically inaccurate ("Humans and dinosaurs lived together!")
- ❌ Too advanced (college-level biochemistry)
- ❌ Poor quality (grainy video, bad audio)
- ❌ Inappropriate content (violence, scary images for young kids)
- ❌ Too long (>15 min = attention span loss)

**Green Flags (Approved):**
- ✅ Clear English narration (native or near-native accent)
- ✅ Aligned with week's theme and grammar
- ✅ Age-appropriate (6-12 years old target)
- ✅ Engaging visuals (animations, diagrams, real footage)
- ✅ Educational value (teaches concept clearly)
- ✅ From whitelisted channels (trusted sources)

---

**E. Student Interaction**

```
┌────────────────────────────────────┐
│ 🎥 DAILY WATCH - Week 16           │
├────────────────────────────────────┤
│ Video 1: Present Simple Facts      │
│ [Thumbnail]                        │
│ 📺 English Singsing                 │
│ ⏱️ 5:32 min                         │
│ [▶️ Watch]                          │
│                                    │
│ Video 2: Dinosaurs for Kids        │
│ [Thumbnail]                        │
│ 📺 SciShow Kids                     │
│ ⏱️ 7:15 min                         │
│ [▶️ Watch]                          │
│                                    │
│ ... (3 more videos)                │
│                                    │
│ 📊 Progress: 2/5 watched            │
└────────────────────────────────────┘
```

**Post-Video Quiz (Optional, for engagement):**
```
After watching "Dinosaurs for Kids":

Q1: What does "carnivore" mean?
    a) Eats plants
    b) Eats meat ✅
    c) Eats both

Q2: T-Rex is a _____.
    a) herbivore
    b) carnivore ✅

Q3: What did you learn today? (Open response)
    [Text box]
```

---

### 🎮 STATIONS 8-13: MINI-GAMES (Gamified Practice)

**Purpose:** Reinforce vocabulary and grammar through **fun, low-stakes practice**.

#### Game 1: Matching Game
```
Match English words to images:

[dinosaur] ----? [Image: T-Rex]
[fossil]   ----? [Image: Bone in rock]
[extinct]  ----? [Image: Crossed-out dinosaur]

Timer: 60 seconds
Score: 10 points per match
```

#### Game 2: Word Search
```
Find 10 theme words:

T F O S S I L X Z
R D I N O S A U R
E P R E D A T O R
X E G G C A R N O
...

Words: FOSSIL, DINOSAUR, PREDATOR, EGG, CARNIVORE, ...
```

#### Game 3: Crossword
```
Across:
1. An animal that eats meat (9 letters) → CARNIVORE
3. Very old remains in rock (6 letters) → FOSSIL

Down:
2. All dead, no more alive (7 letters) → EXTINCT
...
```

#### Game 4: Fill in the Blank
```
Complete the story:

Max finds a _____. (fossil / fish / flower)
It is very _____. (new / old / blue)
Fossils show us _____ life. (modern / ancient / future)
```

#### Game 5: Sentence Scramble
```
Put words in correct order:

[eats] [leaves] [caterpillar] [The]

Answer: The caterpillar eats leaves.
```

#### Game 6: Quiz Show
```
Multiple choice, 10 questions, timed (5 sec each):

Q1: T-Rex is a _____.
   a) plant  b) dinosaur ✅  c) car

[Leaderboard shows top 10 players]
```

---

### 🗣️ STATION 14: PRONUNCIATION

#### Purpose:
Develop **accurate pronunciation and phonemic awareness** through AI-powered speech recognition.

#### Structure:

**A. Target Words (10 per week)**
```
Week 16 Pronunciation Practice:

1. dinosaur /ˈdaɪnəsɔːr/
2. fossil /ˈfɒsəl/
3. extinct /ɪkˈstɪŋkt/
4. carnivore /ˈkɑːrnɪvɔːr/
5. herbivore /ˈhɜːrbɪvɔːr/
6. ancient /ˈeɪnʃənt/
7. Jurassic /dʒʊˈræsɪk/
8. predator /ˈpredətər/
9. prey/preɪ/
10. metamorphosis /ˌmetəˈmɔːrfəsɪs/
```

**B. Interface**
```
┌────────────────────────────────────┐
│ 🗣️ PRONUNCIATION - Word 1/10       │
├────────────────────────────────────┤
│ [Image: Dinosaur]                  │
│                                    │
│ Word: dinosaur                     │
│ IPA:  /ˈdaɪnəsɔːr/                 │
│                                    │
│ 🔊 [Play Audio] (Native speaker)   │
│                                    │
│ 🎤 [Record Your Voice]             │
│                                    │
│ Your recording: [▶️ Play back]      │
│                                    │
│ 📊 Score: 85/100                    │
│ ✅ Good! Try stressing first        │
│    syllable: DI-no-saur            │
│                                    │
│ [Try Again] [Next Word →]          │
└────────────────────────────────────┘
```

**C. AI Scoring (Whisper + Phoneme Analysis)**

**Technology:**
- **Whisper API:** Transcribe student's speech
- **Phoneme Matcher:** Compare to target pronunciation
- **Scoring Algorithm:**
  ```
  Score = (Correct phonemes / Total phonemes) × 100
  
  Example:
  Target: /ˈdaɪnəsɔːr/ (8 phonemes)
  Student: /daɪnəsɔːr/ (no stress = 7/8 correct)
  Score: 87/100
  ```

**Feedback:**
```
Word: "extinct" /ɪkˈstɪŋkt/

Student said: /ekˈstɪnk/ (missing final "t")

Feedback:
❌ Missing sound: /t/ at end
💡 Tip: Say "exSTINK-t" (emphasize the T)
🔊 Listen again: [Audio]
```

**Common Challenges Detected:**
- Vietnamese speakers struggle with: /θ/ (th), /r/ (retroflex vs tap), final consonants
- AI provides targeted practice: "th" drill (three, think, thanks)

---

### 📊 STATION 15: PROGRESS CHECK

#### Purpose:
Provide **weekly summary and actionable feedback** to guide student's learning path.

#### Report Structure:

```
┌────────────────────────────────────┐
│ 📊 WEEK 16 PROGRESS REPORT         │
├────────────────────────────────────┤
│ Overall Score: 87/100 (B+) ⭐⭐⭐⭐  │
│ Time Spent: 3 hours 15 minutes     │
│ Completion: 15/16 stations (94%)   │
├────────────────────────────────────┤
│ 🎯 SKILL BREAKDOWN:                 │
│                                    │
│ Reading:       90% ████████████▓   │
│ Speaking:      82% ██████████▒▒    │
│ Writing:       85% ██████████▓▒    │
│ Grammar:       92% █████████████   │
│ Vocabulary:    78% █████████▒▒▒    │
│ Pronunciation: 88% ███████████▓    │
│ Logic/Math:    75% █████████▒▒▒    │
├────────────────────────────────────┤
│ 📈 PROGRESS THIS MONTH:             │
│                                    │
│ Week 13: 78/100                    │
│ Week 14: 81/100 ↗️                  │
│ Week 15: 84/100 ↗️                  │
│ Week 16: 87/100 ↗️ (Improving!)     │
├────────────────────────────────────┤
│ 🌟 STRENGTHS:                       │
│ • Excellent grammar mastery!       │
│ • Reading comprehension is strong  │
│ • Great pronunciation improvement  │
├────────────────────────────────────┤
│ 💡 AREAS TO IMPROVE:                │
│ • Vocabulary: Review Week 15 words │
│ • Logic Lab: Practice "Missing     │
│   Part" problems (Singapore Math)  │
│ • Speaking: Try Advanced Mode AI   │
│   Tutor next week?                 │
├────────────────────────────────────┤
│ 🎁 ACHIEVEMENTS UNLOCKED:           │
│ 🏆 "Fossil Hunter" Badge            │
│ ⭐ 100 Total Stars Milestone        │
│ 📚 Week 16 Completion               │
├────────────────────────────────────┤
│ 📝 RECOMMENDATION:                  │
│ You're doing great! Ready for      │
│ Week 17: Space Explorer            │
│                                    │
│ [Continue to Week 17 →]            │
│ [Review Week 16]                   │
└────────────────────────────────────┘
```

---

### 🎁 STATION 16: BONUS GAMES (Unlockable)

**Unlocked after completing core stations (1-7)**

#### Game 1: Story Mission
```
Interactive branching narrative:

Max finds 3 fossils. He must choose which to study first.

Choice A: Study the T-Rex tooth
→ Leads to carnivore learning path
→ Mini-game: Food chain puzzle

Choice B: Study the plant fossil
→ Leads to herbivore learning path
→ Mini-game: Match animals to diets

Choice C: Study the footprint
→ Leads to size comparison learning
→ Mini-game: Measure dinosaur sizes
```

#### Game 2: Grammar Battle
```
Competitive quiz (vs AI or other students):

Round 1: Fix the grammar (30 sec)
"The dinosaur is eat meat." → "The dinosaur eats meat."

Round 2: Build a sentence (20 sec)
[subject] [verb] [object] → T-Rex + eats + prey

Leaderboard: Top 10 this week
```

#### Game 3: Vocabulary Race
```
Speed matching game:

Words appear randomly, drag to correct category:

CARNIVORES: [T-Rex] [Lion] [Fox]
HERBIVORES: [Rabbit] [Deer] [Brachiosaurus]

60 seconds, 20 words, bonus for streaks
```

---

## 🤖 AI TUTOR SYSTEM (Detailed Architecture)

### Technology Stack:
- **LLM:** OpenAI GPT-4o (multimodal: text + audio input/output)
- **Speech-to-Text:** Whisper API (English ASR, high accuracy)
- **Text-to-Speech:** OpenAI TTS HD (natural prosody, 6 voices available)
- **Memory:** Redis (session state) + PostgreSQL (student profile, conversation history)
- **Prompt Engineering:** Dynamic system prompts (Phase + Mode + Week + Student level)

### Conversation Flow:

```
Student clicks "Start AI Tutor":
  ↓
[1] Load Student Profile (Phase, Mode, Week, Past performance)
  ↓
[2] Generate System Prompt:
    - Phase 1 → Shadow Asking template
    - Phase 2 → Guided Asking template
    - Phase 3 → Free Talk template
    - Include week's theme, grammar focus, STEM vocab
  ↓
[3] Initialize Conversation:
    AI sends opening (text + audio): "Hi! Let's talk about dinosaurs today..."
  ↓
[4] Student responds (voice or text)
  ↓
[5] Process input:
    - If voice → Whisper transcription
    - If text → direct to GPT-4o
  ↓
[6] GPT-4o generates response:
    - Check grammar (log errors, but don't interrupt)
    - Provide content answer
    - Prompt next question (if Shadow/Guided mode)
  ↓
[7] TTS converts to audio → Play to student
  ↓
[8] Loop back to [4] until:
    - Student clicks "End session", OR
    - 10 conversation cycles reached, OR
    - 15 minutes elapsed
  ↓
[9] Generate Session Summary Report
  ↓
[10] Save conversation to database (for review/progress tracking)
```

### Prompt Engineering Example (Shadow Asking, Week 16, Easy):

```
SYSTEM PROMPT:
You are "Timi the Time Traveler Robot", a friendly AI English tutor for a 6-year-old Vietnamese child named [Student Name]. This is Week 16, Theme: Time Traveler (Dinosaurs). Mode: Shadow Asking (Phase 1, Easy).

PERSONALITY:
- Enthusiastic and encouraging
- Patient (never criticize errors)
- Uses simple language (A2 level)
- Loves dinosaurs!

PEDAGOGICAL RULES:
1. Shadow Asking Method:
   - YOU model a question first: "I'll ask: What is a fossil?"
   - STUDENT repeats your question
   - YOU answer the question (student listens, learns content)
   - Repeat for 5 question cycles

2. Language Level:
   - Use ONLY Present Simple tense
   - Sentences: 5-8 words max
   - STEM vocab allowed: dinosaur, fossil, extinct, carnivore, herbivore, ancient, Jurassic
   - NO complex words (avoid: paleontologist, sedimentary, Mesozoic unless Week 50+)

3. Error Handling:
   - If student makes grammar mistake, model correct form naturally:
     Student: "What is dinosaurs?"
     You: "Good try! We say: What IS A dinosaur? Now you ask..."
   - Don't say "That's wrong" - always positive reframe

4. Feedback:
   - After each correct repetition: "Great job!" / "Perfect!" / "Well done!"
   - After student struggles: "That's okay! Listen again..." [repeat model]

5. Conversation Flow (5 cycles):
   Cycle 1: Model "What is a dinosaur?" → Student repeats → Answer "A dinosaur is a very old, big animal."
   Cycle 2: Model "Are dinosaurs alive today?" → Student repeats → Answer "No, dinosaurs are extinct."
   Cycle 3: Model "What is a fossil?" → Student repeats → Answer "A fossil is an old bone or plant in a rock."
   Cycle 4: Model "What does T-Rex eat?" → Student repeats → Answer "T-Rex eats meat. It is a carnivore."
   Cycle 5: Model "Do you like dinosaurs?" → Student repeats → Answer varies based on student response

6. Ending:
   After 5 cycles: "You asked great questions today, [Name]! You learned about fossils and carnivores. See you next time!"

7. Safety:
   - NEVER discuss politics, religion, violence, inappropriate content
   - If student asks off-topic: "That's interesting, but let's talk about dinosaurs today!"

CONVERSATION MEMORY:
You remember this session only. You don't remember past weeks (unless critical for continuity).

BEGIN CONVERSATION:
"Hi [Name]! I'm Timi the Time Traveler Robot! 🦖 Today we're going to talk about dinosaurs. Are you ready to ask me questions? I'll show you how! Let's start..."
```

---

## 📊 ASSESSMENT & PROGRESS TRACKING

### Assessment Types:

**1. Formative (Continuous, Every station)**
- Immediate feedback after each question
- No high stakes (can retry)
- Purpose: Guide learning, identify gaps

**2. Summative (Weekly Progress Check)**
- Aggregate score from all stations
- Determines readiness for next week
- Passing: 70% (Easy), 80% (Advanced)

**3. Milestone (Every 5 weeks)**
- Comprehensive review quiz
Week 5 Review: W1-5 content
- Week 10 Review: W6-10 content
- Gates progression (must pass 75% to continue)

**4. Phase Transition Assessment (W54, W120)**
- Major test before Phase 2, Phase 3
- Covers all grammar, vocab, skills from Phase 1
- Passing: 80% → Advance to next Phase

---

### Progress Tracking Dimensions:

**1. Accuracy**
- % Correct answers per skill (Grammar, Vocab, Logic, etc.)
- Tracked per week, month, Phase

**2. Fluency**
- Speaking: WPM (words per minute)
- Reading: Reading speed (WPM)
- Hesitation count (AI Tutor tracks pauses)

**3. Vocabulary Size**
- Total words learned (cumulative)
- Retention rate (spaced repetition quiz)
- Active use (words used in Writing, AI Tutor)

**4. Grammar Mastery**
- Structures mastered (checklist: Present Simple ✅, Past Simple ✅, ...)
- Accuracy in production (Writing, Speaking)

**5. STEM Proficiency (W16+)**
- Science facts recalled correctly
- Singapore Math problem types mastered
- Inquiry question complexity (Ask AI, AI Tutor)

**6. Engagement**
- Time spent per week
- Station completion rate
- Return rate (% of weeks completed)

---

## PART IV: PRODUCTION METHODOLOGY

### Content Creation Workflow:

**Phase 1: Planning (Week N-2)**
```
[1] Theme Selection
    - Review Syllabus (grammar for Week N)
    - Choose theme (Time Traveler, Space, Ocean, etc.)
    - Align STEM content (if Week >= 16)

[2] Vocabulary Selection
    - 10 target words (3 STEM if W16+, 7-10 STEM if W50+)
    - Check against retention curve (don't repeat W1-5 words in W6)
    - Build semantic network (related words cluster)

[3] Story Development (Read & Explore)
    - Draft Easy Mode story (6-8 sentences)
    - Draft Advanced Mode story (10-15 sentences)
    - Integrate grammar focus + vocabulary
    - Fact-check STEM content (if W16+)

[4] Station Content Mapping
    - Logic Lab: Design 5-7 logic problems, 5-7 math problems
    - Grammar: Create 10 practice exercises
    - Writing: Design prompts (Easy vs Advanced)
    - Pronunciation: Select 10 target words with IPA
    - Mini-Games: Generate word lists for matching, word search, etc.
```

**Phase 2: Content Creation (Week N-1)**
```
[5] Asset Generation
    - Illustrations (Read & Explore story scenes)
    - Bar Model SVG diagrams (Singapore Math)
    - Science diagrams (life cycles, food webs, etc.)
    - Audio recording (TTS for all text content)

[6] Data File Creation
    - read.js (story text, comprehension questions)
    - logic_science.js (reasoning problems)
    - singapore_math.js (word problems + bar models)
    - grammar.js (lesson slides, exercises)
    - writing.js (prompts, sentence frames)
    - daily_watch.js (video queries)
    - pronunciation.js (target words + IPA)
    - etc. (all 16 station files)

[7] AI Prompt Engineering
    - AI Tutor system prompt (Phase + Mode + Week specific)
    - Ask AI scaffolding (hint questions)
    - Writing scoring rubric (criteria for Week N theme)
```

**Phase 3: Quality Assurance (Week N, before launch)**
```
[8] STEM Accuracy Review (W16+ only)
    - Science expert validates all facts
    - Math problems checked (correct answers, age-appropriate)

[9] Language Review
    - Grammar aligned with Syllabus?
    - Vocabulary at correct CEFR level (A2 for Easy, B1 for Advanced)?
    - Sentence structures appropriate?

[10] Technical Testing
    - All audio files playable?
    - Images load correctly?
    - Interactive elements (drag-drop, record voice) functional?
    - AI Tutor responds correctly?

[11] Dual-Mode Validation
    - Easy Mode: Cognitive load check (sentence length, vocab complexity)
    - Advanced Mode: Challenge level check (not too easy, not impossible)
    - Mode switching works seamlessly?

[12] User Testing (Sample group)
    - 5-10 students test Week N content
    - Track completion time, accuracy, feedback
    - Iterate based on results

[13] Final Approval & Deployment
    - Product lead signs off
    - Deploy to production (Friday evening, students access Monday)
```

---

### Quality Assurance Checklists:

**STEM Content (W16+):**
- [ ] All science facts verified against trusted sources (textbooks, .edu sites)
- [ ] No misconceptions (e.g., "Humans and dinosaurs lived together" = FALSE)
- [ ] Age-appropriate (no biochemistry formulas for 6-year-olds)
- [ ] Explanations match student's Phase (Phase 1 = simple, Phase 3 = complex)
- [ ] Math problems solvable (correct answers confirmed)
- [ ] Bar Models accurate (parts + parts = whole)

**Language:**
- [ ] Grammar matches Syllabus for Week N
- [ ] Vocabulary: 70% familiar (review) + 30% new (optimal i+1)
- [ ] Sentence length appropriate (5-8 words Easy, 12-15 Advanced)
- [ ] No grammatical errors in provided content
- [ ] Pronunciation IPA correct (verified against dictionaries)

**Dual-Mode Differentiation:**
- [ ] Easy Mode has heavy scaffolding (sentence frames, hints, visuals)
- [ ] Advanced Mode challenges without overwhelming (still in ZPD)
- [ ] Both modes cover same grammar/topics (just different depth)
- [ ] Mode switching accessible (clear UI, no penalty)

**Technical:**
- [ ] All 16 station data files present and valid JSON
- [ ] Audio files: correct hash-based naming (SHA-256)
- [ ] Images: optimized (< 500 KB), correct paths
- [ ] Video queries: return 5 valid results (tested via API)
- [ ] AI Tutor: system prompt loads correctly, no errors
- [ ] Mobile-friendly (tested on iOS/Android tablets)

**Engagement:**
- [ ] Theme coherent across all stations
- [ ] Narrative continuity (if multi-week arc)
- [ ] Gamification elements (points, badges) working
- [ ] Feedback messages positive and encouraging

---

## 🎯 SUMMARY: ENGQUEST CORE PRINCIPLES

**1. DUAL-MODE FOR ACCESSIBILITY & EXCELLENCE**
- Easy Mode: Accessible to all (A2-B1 level, inclusive)
- Advanced Mode: Elite preparation (B2-C1 level, exam-ready)

**2. GRAMMAR ANCHOR PREVENTS COGNITIVE OVERLOAD**
- W1-15: Establish grammar foundation
- W16+: Grammar familiar (0 load) + STEM vocab new (manageable load)

**3. CLIL INTEGRATION (W16+) FOR DEEPER LEARNING**
- English THROUGH Science/Math, not separate subjects
- Meaningful context → better retention, motivation, transfer

**4. SINGAPORE MATH CPA METHOD**
- Concrete → Pictorial → Abstract progression
- Bar Models reduce cognitive load, build visual reasoning

**5. SCAFFOLDING & GRADUAL RELEASE**
- Phase 1: High support (Shadow, heavy visuals)
- Phase 2: Medium support (Guided, moderate visuals)
- Phase 3: Low support (Independent, minimal scaffolding)

**6. MULTIMODAL LEARNING (Text + Visual + Audio + Interactive)**
- Dual Coding Theory: Multiple encoding = stronger memory
- 16 stations cover all modalities (Read, Speak, Write, Listen, Play)

**7. AI-POWERED PERSONALIZATION**
- GPT-4o Tutor adapts to student level
- Speech recognition for pronunciation feedback
- Writing scoring provides specific improvement suggestions

**8. GAMIFICATION FOR SUSTAINED ENGAGEMENT**
- Points, badges, leaderboards (optional)
- Narrative themes create anticipation
- Choice and agency (station order, mode selection)

**9. EVIDENCE-BASED DESIGN**
- Every principle grounded in cognitive science research
- Spaced repetition, ZPD, Cognitive Load Theory, CLIL, CPA
- Continuous A/B testing and iteration

**10. STEM PREPARATION FOR FUTURE SUCCESS**
- Trần Đại Nghĩa exam readiness: 85-90% coverage (Advanced Mode)
- International school readiness: CLIL = global standard
- 21st-century skills: Critical thinking, problem-solving, scientific literacy

---

## 📞 DOCUMENT USAGE

**Target Audiences:**

**1. Product Team:**
- Use this as master reference for all design decisions
- Refer to Pedagogical Foundation when debugging UX issues
- Use Station Breakdown for feature specs

**2. Content Creators:**
- Use Production Methodology for weekly workflow
- Use Quality Assurance Checklists before submission
- Use STEM Integration principles (W16+) for accuracy

**3. Investors/Leadership:**
- Use Vision & Mission for strategic alignment
- Use Core Principles for competitive differentiation messaging
- Use Assessment section for outcome metrics

**4. Parents/Teachers:**
- Use App Overview to understand EngQuest value
- Use Station Breakdown to guide children through app
- Use Progress Tracking to interpret reports

**5. Researchers/Academics:**
- Use Pedagogical Foundation for research validation
- Use CLIL Integration section for CLIL methodology
- Cite this document in research papers (if applicable)

---

**END OF COMPREHENSIVE GUIDE**

**Version:** 5.0  
**Last Updated:** March 16, 2026  
**Maintained by:** EngQuest Pedagogical Team  
**Contact:** [Insert contact info]  

**Related Documents:**
- [COGNITIVE_LOAD_ANALYSIS_AND_RECOMMENDATIONS.md](./COGNITIVE_LOAD_ANALYSIS_AND_RECOMMENDATIONS.md) - Research report
- [STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md](./STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md) - Implementation strategy
- [LOGIC_LAB_DUAL_TAB_BLUEPRINT.md](./LOGIC_LAB_DUAL_TAB_BLUEPRINT.md) - Logic Lab detailed specs
- [WEEK_PRODUCTION_CHECKLIST_V2.md](./WEEK_PRODUCTION_CHECKLIST_V2.md) - Content production guide
- [2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt](./2.%20ENGQUEST%20APP%20MASTER%20BLUEPRINT-FINAL%20copy.txt) - Original blueprint
