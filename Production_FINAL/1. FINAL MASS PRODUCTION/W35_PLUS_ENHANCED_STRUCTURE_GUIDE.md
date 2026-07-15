# 🎯 W35+ ENHANCED STRUCTURE - PRODUCTION GUIDE
**Sub-Tabs + STEM/Social Integration - Complete Implementation**  
**Created:** March 17, 2026 | **Status:** UI Complete, Ready for Content Production

---

## 📌 OVERVIEW: 3-TIER STRUCTURE

### **Tier 1: W1-15 (Standard Structure)**  
✅ **Status:** COMPLETE & DEPLOYED
- 14 stations per week (single files)
- Basic Read/Explore/Logic
- No sub-tabs

### **Tier 2: W16-34 (Transition Phase)**  
⏳ **Status:** Ready to produce
- Keep 14-station structure
- Add STEM/Social vocabulary in stories
- Prepare for W35 upgrade

### **Tier 3: W35+ (Enhanced Structure with Sub-Tabs)**  
✅ **Status:** UI COMPLETE, Schema Templates Ready
- **Read & Explore:** 2 tabs (STEM + Social Studies)
- **Logic Lab:** 3 tabs (Logic&Science 3Q + Singapore Math 5Q + Social Quiz 7Q)
- **Debate:** 2-tier system (Simple W40-112, Formal W113+)

---

## 🏗️ UI COMPONENTS (✅ ALL BUILT)

### **1. TabbedLogicLab.jsx** ✅
**Location:** `/src/components/LogicLab/TabbedLogicLab.jsx`

**Features:**
- Triple tab navigation (purple/blue/green)
- Progress tracking per tab (3/5/7 questions)
- Total completion: 15 questions (100%)
- Auto-save to localStorage
- Visual progress bar

**Sub-Components:**
- `LogicScienceDisplay.jsx` (3 critical thinking questions)
- `SingaporeMathDisplay.jsx` (5 bar model problems)
- `SocialQuizDisplay.jsx` (7 MCQ history/geography)

**Data Structure Required:**
```javascript
weekData = {
  logic_science: { questions: [...] },  // 3 questions
  singapore_math: { problems: [...] },  // 5 problems
  social_quiz: { questions: [...] }     // 7 MCQ
};
```

---

### **2. TabbedReadExplore.jsx** ✅
**Location:** `/src/components/ReadExplore/TabbedReadExplore.jsx`

**Features:**
- Dual tab navigation (cyan STEM / amber Social)
- Full story display with paragraphs
- 10 vocabulary cards per tab (20 total)
- Audio playback support
- Comprehension questions
- Responsive image display

**Data Structure Required:**
```javascript
weekData = {
  read_stem: {
    title_en: "...",
    paragraphs: [...],
    key_vocabulary: [10 STEM terms],
    comprehension_questions: [...],
    audio_url: "/audio/week_X/read_stem.mp3"
  },
  read_social: {
    title_en: "...",
    paragraphs: [...],
    key_vocabulary: [10 social terms],
    comprehension_questions: [...],
    audio_url: "/audio/week_X/read_social.mp3"
  }
};
```

---

### **3. Display Components** ✅

#### **SingaporeMathDisplay.jsx**
- Bar model image rendering
- Math vocabulary highlighting (yellow badges)
- Answer validation with unit checking
- CPA stage indicators (Concrete-Pictorial-Abstract)
- Hint system
- Problem navigation (5 problems)
- Completion badge

#### **SocialQuizDisplay.jsx**
- MCQ with 4 options per question
- Visual feedback (green correct / red incorrect)
- Explanation after answer
- Category labels (Ancient History, Geography, etc.)
- Image support for questions
- 7 questions total

#### **LogicScienceDisplay.jsx**
- Open-ended text answers
- Textarea for reasoning
- Auto-save submissions
- 3 questions total
- Purple theme

---

## 📋 WEEK 16 SCHEMA TEMPLATE (✅ COMPLETE)

**Location:** `/src/data/weeks/week_16/`

### **Files Created (7 Total):**

#### **1. logic_science.js** ✅ (Already existed)
```javascript
{
  questions: [
    {
      id: 1,
      question_en: "...",
      answer_guidance: "...",
      audio_url: "/audio/week16/logic_q1.mp3"
    }
    // ... 3 questions total
  ]
}
```

#### **2. singapore_math.js** ✅ (Already existed - Excellent quality!)
```javascript
{
  problems: [
    {
      id: 1,
      type: "part_whole",  // or "comparison"
      question_en: "A T-Rex had 5 eggs...",
      answer: ["8 eggs", "eight eggs", "8"],
      bar_model: "/images/week16/singapore_math/bar_q1.svg",
      cpa_stage: "pictorial",
      math_vocab: ["total", "part", "whole", "more"],
      hint_en: "Think: Part 1 + Part 2 = Whole",
      audio_url: "/audio/week16/singapore_math_q1.mp3"
    }
    // ... 5 problems total
  ]
}
```

#### **3. social_quiz.js** ✅ (NEW)
```javascript
{
  questions: [
    {
      id: 1,
      category: "Ancient History",
      question_en: "Where did Ancient Egyptians live?",
      options: ["Near Nile River", "In desert", "On island", "In mountains"],
      correct_answer: "Near Nile River",
      explanation_en: "Egyptians built along the Nile for water...",
      audio_url: "/audio/week16/social_quiz_q1.mp3"
    }
    // ... 7 MCQ total
  ]
}
```

#### **4. read_stem.js** ✅ (NEW)
```javascript
{
  title_en: "The Time Machine Experiment",
  paragraphs: [
    "Professor Nova stood in her laboratory...",
    "She carefully prepared for her first experiment...",
    // ... 5 paragraphs
  ],
  key_vocabulary: [
    { word: "laboratory", definition: "...", example: "..." },
    { word: "invention", definition: "...", example: "..." },
    // ... 10 STEM terms total
  ],
  comprehension_questions: [...],
  stem_topic: "Scientific Method",
  audio_url: "/audio/week16/read_stem.mp3"
}
```

#### **5. read_social.js** ✅ (NEW)
```javascript
{
  title_en: "Journey Through History",
  paragraphs: [...],  // 5 paragraphs
  key_vocabulary: [
    { word: "civilization", definition: "...", example: "..." },
    { word: "empire", definition: "...", example: "..." },
    // ... 10 social terms total
  ],
  comprehension_questions: [...],
  social_topic: "Historical Periods",
  audio_url: "/audio/week16/read_social.mp3"
}
```

#### **6. explore_stem.js** ✅ (NEW)
```javascript
{
  title_en: "Time Machine Science Lab",
  activities: [
    {
      id: 1,
      type: "experiment",
      title: "Build a Simple Clock",
      description: "...",
      materials: ["bottle", "water", "marker"],
      steps: [...],
      stem_concept: "Measurement & Time"
    }
    // ... 3 activities
  ],
  discussion_questions: [...]
}
```

#### **7. explore_social.js** ✅ (NEW)
```javascript
{
  title_en: "History Detective Lab",
  activities: [
    {
      id: 1,
      type: "research",
      title: "Timeline Creator",
      description: "...",
      instructions: "...",
      social_concept: "Chronological Thinking"
    }
    // ... 3 activities
  ],
  discussion_questions: [...]
}
```

#### **8. index.js** ✅ (NEW - Exports all)
```javascript
import logic_science from './logic_science.js';
import singapore_math from './singapore_math.js';
import social_quiz from './social_quiz.js';
import read_stem from './read_stem.js';
import read_social from './read_social.js';
import explore_stem from './explore_stem.js';
import explore_social from './explore_social.js';

export default {
  week_number: 16,
  title: "Time Travel Adventure",
  theme: "Time Travel & Historical Periods",
  grammar_focus: "Past Simple (Irregular Verbs)",
  
  // All 7 files
  logic_science,
  singapore_math,
  social_quiz,
  read_stem,
  read_social,
  explore_stem,
  explore_social,
  
  station_counts: {
    logic_lab: 15,   // 3+5+7
    read_explore: 2, // STEM + Social
    explore: 2       // STEM + Social activities
  }
};
```

---

## 🎯 PRODUCTION WORKFLOW (W16-54)

### **Phase 1: W16-39 Content (Standard + STEM/Social Prep)**

**Goal:** Create weeks 16-39 with enhanced vocabulary

**Structure:** 14 stations (standard) BUT with STEM/Social integration:
- Read: Add 5 STEM terms in story context
- Explore: Add 5 social/geography terms
- Logic: Keep focused on critical thinking
- Vocab: Mix academic + theme vocabulary

**Why:** Prepare students for W35+ sub-tab split

**Timeline:** ~2 weeks (24 weeks × 1 hour each)

---

### **Phase 2: W35-39 Upgrade (Deploy Sub Tabs First Time)**

**Goal:** Launch W35+ enhanced structure

**New Requirements:**
- **Read & Explore:** Split into dual tabs (STEM + Social)
- **Logic Lab:** Split into triple tabs (Logic + Math + Social Quiz)
- **Total questions:** 15 (3+5+7) instead of old 15

**Content Creation Workflow:**

#### **Step 1: Read & Explore (Dual Stories)**
```bash
# Create read_stem.js
Task: Write STEM story (5 paragraphs)
- Theme-aligned science/tech context
- Include 10 STEM vocabulary terms
- 3-4 comprehension questions
- Audio generation command: python tools/generate_audio_deepgram.py 35 read_stem

# Create read_social.js
Task: Write Social Studies story (5 paragraphs)
- History/geography context aligned with theme
- Include 10 social vocabulary terms
- 3-4 comprehension questions
- Audio: python tools/generate_audio_deepgram.py 35 read_social
```

#### **Step 2: Logic Lab (Triple Tabs)**
```bash
# Create logic_science.js
Task: 3 critical thinking questions
- Open-ended reasoning
- Theme-related science puzzles
- Audio: python tools/generate_audio_deepgram.py 35 logic

# Create singapore_math.js
Task: 5 bar model problems
- Part-whole OR comparison models
- Math vocabulary highlighted
- CPA stage noted (concrete/pictorial/abstract)
- Include: answer, hint, bar_model SVG path
- Audio (per question): _q1.mp3, _q2.mp3, etc.

# Create social_quiz.js
Task: 7 MCQ questions
- Geography (2-3 questions)
- History (2-3 questions)
- Culture/Current events (1-2 questions)
- 4 options each
- Include explanation + correct answer
- Audio: python tools/generate_audio_deepgram.py 35 social_quiz
```

#### **Step 3: Explore Activities**
```bash
# Create explore_stem.js
Task: 3 hands-on STEM activities
- Experiment, Observation, Design Challenge
- Materials list + steps
- STEM concept tags

# Create explore_social.js
Task: 3 social studies activities
- Research, Comparison, Map work
- Instructions + social concept tags
- Discussion questions
```

---

### **Phase 3: W40-112 (Add Debate Topics)**

**New Requirement:** Dynamic debate topics per week theme

**Debate Tab Logic (Already Built):**
- Week 40-112: Simple debates (friendly AI, 3-4 topic variations per theme)
- Week 113+: Formal debates (Devil's Advocate, fixed topics)

**Content Addition:**
```javascript
// In week_real.js missions array
missions: [
  { type: "story", ... },
  { type: "story", ... },
  { type: "debate" }  // Mission 3 becomes debate
]

// Debate topics auto-generated from theme
// NO manual work needed - DebateTab.jsx handles it
```

---

### **Phase 4: W113-144 (Formal Debates + Projects)**

**Structure Changes:**
- 3 debate cycles (8 weeks each):
  - W113-120: "Should homework be banned?"
  - W121-128: "Should kids play video games daily?"
  - W129-136: "Should kids under 12 have smartphones?"
- Each week explores different angle of same topic
- Research → Essay → Debate workflow

**Content Requirements:**
- Weekly sub-topics (angles)
- Research prompts
- Essay scaffolding
- Debate preparation questions

---

## 🛠️ SCAFFOLDING TOOLS (Need to Build)

### **Priority 1: scaffold_week_35plus.js** (2 hours to build)

**Purpose:** Auto-generate 7-file structure with TODO markers

**Usage:**
```bash
node tools/scaffold_week_35plus.js 35
# Creates:
# - week_35/logic_science.js (TODO markers)
# - week_35/singapore_math.js (TODO markers)
# - week_35/social_quiz.js (TODO markers)
# - week_35/read_stem.js (TODO markers)
# - week_35/read_social.js (TODO markers)
# - week_35/explore_stem.js (TODO markers)
# - week_35/explore_social.js (TODO markers)
# - week_35/index.js (complete)
```

**Template Structure:**
```javascript
// logic_science.js template
export default {
  questions: [
    {
      id: 1,
      question_en: "TODO: Write critical thinking question about [THEME]",
      answer_guidance: "TODO: What reasoning should students use?",
      audio_url: "/audio/week_35/logic_q1.mp3"
    },
    // ... repeat for 3 questions
  ]
};
```

---

### **Priority 2: validate_week_structure.js** (1 hour to build)

**Purpose:** Check file counts, question counts, schema compliance

**Usage:**
```bash
node tools/validate_week_structure.js 35
# Checks:
# ✓ 7 files exist
# ✓ Logic: 3 questions
# ✓ Singapore Math: 5 problems
# ✓ Social Quiz: 7 MCQ
# ✓ Read STEM: 10 vocab
# ✓ Read Social: 10 vocab
# ✓ All audio paths defined
```

---

### **Priority 3: generate_audio_batch.sh** (30 mins to build)

**Purpose:** Generate all audio for a week in one command

**Usage:**
```bash
bash tools/generate_audio_batch.sh 35
# Runs:
# - python generate_audio_deepgram.py 35 logic
# - python generate_audio_deepgram.py 35 singapore_math
# - python generate_audio_deepgram.py 35 social_quiz
# - python generate_audio_deepgram.py 35 read_stem
# - python generate_audio_deepgram.py 35 read_social
```

---

## 📊 CONTENT GUIDELINES

### **STEM Vocabulary (10 per week)**

**Categories:**
- Biology: cell, organism, habitat, adaptation, ecosystem
- Physics: energy, force, motion, gravity, electricity
- Chemistry: molecule, matter, solid, liquid, gas
- Technology: algorithm, data, program, circuit, invention
- Math: equation, variable, geometry, measurement, pattern
- Earth Science: climate, weather, volcano, earthquake, ocean

**Selection Criteria:**
- Age-appropriate (8-12 years)
- Theme-aligned
- Tier 2 academic vocabulary (high-frequency)
- Concrete examples possible

---

### **Social Studies Vocabulary (10 per week)**

**Categories:**
- History: civilization, empire, revolution, democracy, colony
- Geography: continent, ocean, climate, landform, population
- Culture: tradition, custom, festival, heritage, diversity
- Economics: trade, goods, services, market, currency
- Civics: government, citizen, law, rights, responsibility

**Selection Criteria:**
- Relevant to child's world
- Visual/concrete concepts
- Current events connection possible
- Cultural sensitivity checked

---

### **Singapore Math Problem Types**

#### **1. Part-Whole Model** (Addition/Subtraction)
```
[Part 1] [Part 2]
├─────────────────┤
      Whole
```
Example: "5 red apples + 3 green apples = ? total apples"

#### **2. Comparison Model** (Difference)
```
[Longer bar    ]
[Shorter bar ]
        ↑
    Difference
```
Example: "Tower A is 15m, Tower B is 9m. How much taller is A?"

#### **3. Before-After Model** (Change)
```
Before: [██████]
 +3:       [███]
After:  [█████████]
```
Example: "Had 8 eggs, laid 3 more. How many now?"

---

### **Social Quiz Question Types**

#### **1. Geography (2-3 questions)**
- Continents, oceans, countries
- Landforms, climate zones
- Maps, directions, scales

#### **2. History (2-3 questions)**
- Ancient civilizations
- Historical figures
- Major inventions
- Cultural artifacts

#### **3. Current Affairs (1-2 questions)**
- Modern countries
- Cultural festivals
- Global challenges (age-appropriate)

---

## ✅ IMPLEMENTATION CHECKLIST

### **Week 16 Status (Demo Week)**
- [x] UI Components built (all 6 components)
- [x] Schema complete (7 files)
- [x] index.js exports all
- [ ] Audio files generated
- [ ] Images/bar models created
- [ ] Full stack routing test
- [ ] Deploy to staging

### **Week 17-34 Status (Standard + Prep)**
- [ ] Outline created (18 weeks)
- [ ] Content drafts (batch 1: W17-22)
- [ ] Audio generation (batch 1)
- [ ] Validation passed
- [ ] Deploy batch 1

### **Week 35-39 Status (First Sub-Tab Launch)**
- [ ] W35 complete (all 7 files)
- [ ] W36-39 complete
- [ ] Routing updated (use TabbedLogicLab + TabbedReadExplore)
- [ ] Beta test week 35
- [ ] Deploy week 35-39

### **Week 40-112 Status (Debate Era)**
- [ ] Debate topics reviewed
- [ ] Content production ongoing
- [ ] Weekly deployment

### **Week 113-144 Status (Formal Debates)**
- [ ] 3 debate cycles planned
- [ ] Research prompts created
- [ ] Essay scaffolding designed

---

## 🚀 DEPLOYMENT COMMANDS

```bash
# Test Week 16 locally
npm run dev
# Navigate to: localhost:5173/week/16/ai-tutor

# Validate Week 16 structure
node tools/validate_week_structure.js 16

# Generate all audio for Week 16
bash tools/generate_audio_batch.sh 16

# Deploy Week 16 to staging
git add src/data/weeks/week_16
git commit -m "feat: Add Week 16 complete W35+ structure"
git push origin staging

# Deploy to production
git checkout main
git merge staging
git push origin main
```

---

## 📞 SUPPORT & TROUBLESHOOTING

### **Issue: Component not rendering**
- Check: Is week_16/index.js exporting all files?
- Check: Route using correct component (TabbedLogicLab vs old LogicStation)
- Console: Look for import errors

### **Issue: Progress not saving**
- Check: localStorage enabled in browser?
- Key format: `logic_lab_progress_w16`, `singapore_math_w16`
- Clear: localStorage.clear() to reset

### **Issue: Audio not playing**
- Check: File exists at path in schema
- Check: voiceService.js fallback chain
- Test: Manual audio file URL in browser

### **Need Help?**
- Documentation: `/Production_FINAL/1. FINAL MASS PRODUCTION/`
- Examples: Week 16 complete schema
- Contact: Production team

---

**✅ Ready for W16-54 Mass Production!**  
**Next Step:** Generate audio + images for Week 16, test full stack, then proceed to W17-39.
