# TRUE W33→W37 PRODUCTION GAP AUDIT REPORT

---

## 1. COMPREHENSIVE WEEK-BY-WEEK CONTENT & LEARNING EXPERIENCE MATRIX

This audit evaluates the actual live learning experience across Weeks 33 to 37 by comparing the **Original 156-Week Syllabus (Sole Source of Truth)** against the actual runtime data objects and UI rendering.

| Dimension | W33 Baseline (Gold Standard) | W34 Actual (Current Production) | W35 Actual (Current Production) | W36 Actual (Current Production) | W37 Actual (Current Production) |
|---|---|---|---|---|---|
| **Syllabus Topic** | Accidents happen! (*"Corridor Safety & School Care"*) | Fable: *"The Lion and the Mouse"* | Personal Recount: *"The Best Day Ever"* | Review & Project 3: *"My Adventure Book"* | CLIL Unit 6: *"Living vs. Non-Living"* |
| **Grammar Focus** | Past Continuous with WHILE (`Break-Broke`, `Fall-Fell`, `Hurt-Hurt`) | Mixed Past Tense Verbs (`caught`, `freed`, `chewed`, `roared`) | Past Simple + Adjectives (`sunny`, `exciting`, `memorable`) | Past Irregular Verbs Review (`went`, `saw`, `found`, `took`, `made`) | Scientific Reasoning with *"Because"* (`It is living because it breathes`) |
| **Target Lexicon** | 20 words (`corridor`, `slipped`, `nurse`, `bandage`, `relieved`) | 20 words (`net`, `trap`, `roar`, `help`, `friend`, `tiny`, `huge`) | 20 words (`wonderful`, `exciting`, `sunny`, `memorable`, `happy`) | 20 words (`adventure`, `journey`, `explore`, `map`, `compass`, `treasure`) | 20 words (`living`, `non-living`, `breathe`, `grow`, `need`, `food`, `water`, `rock`, `plastic`) |
| **STEM / Reading Story** | 3-Step STEM Problem-Solving Cycle (Jake slipping, nurse, bandage) | 1-Sentence Placeholder ("Explore The Lion and the Mouse...") ❌ | 1-Sentence Placeholder ("Explore The Best Day Ever...") ❌ | 1-Sentence Placeholder ("Explore My Adventure Book...") ❌ | 1-Sentence Placeholder ("Explore Living vs. Non-Living...") ❌ |
| **Hub 1 (Reading)** | 5 Webtoon Pixar 3D Scenes + 5 Open Cloze Gaps + 10 Check Drills | 5 Dummy Scenes (Cover image fallback) + 1 Open Cloze Gap ❌ | 5 Dummy Scenes (Cover image fallback) + 1 Open Cloze Gap ❌ | 5 Dummy Scenes (Cover image fallback) + 1 Open Cloze Gap ❌ | 5 Dummy Scenes (Cover image fallback) + 1 Open Cloze Gap ❌ |
| **Hub 2 (Listening/Arena)** | Speed Match 5 Pairs + 5 Dictation Sentences | 1 Dummy Pair + 5 Generic Dictation Sentences ❌ | 1 Dummy Pair + 5 Generic Dictation Sentences ❌ | 1 Dummy Pair + 5 Generic Dictation Sentences ❌ | 1 Dummy Pair + 5 Generic Dictation Sentences ❌ |
| **Hub 3 (Writing Studio)** | 3 Pixar 3D Panels + Script Area + Rule Engine | 1 Generic Sentence Frame ("This lesson is about...") ❌ | 1 Generic Sentence Frame ("This lesson is about...") ❌ | 1 Generic Sentence Frame ("This lesson is about...") ❌ | 1 Generic Sentence Frame ("This lesson is about...") ❌ |
| **Hub 4 (Nova Talk Show)** | 36-Branch Mindmap (6x6) + 5 AI Voice Dialogue Turns | 1 Dummy Stem ("The Lion and the Mouse") + 1 AI Turn ❌ | 1 Dummy Stem ("The Best Day Ever") + 1 AI Turn ❌ | 1 Dummy Stem ("My Adventure Book") + 1 AI Turn ❌ | 1 Dummy Stem ("Living vs. Non-Living") + 1 AI Turn ❌ |
| **Logic Lab** | 15 Independent Quiz Items (5 STEM, 5 Bar Math SVGs, 5 Social) | 1 Dummy Question ❌ | 1 Dummy Question ❌ | 1 Dummy Question ❌ | 1 Dummy Question ❌ |

---

## 2. CLONE & PLACEHOLDER SHELL MATRIX

| Component / Station | W34 Status | W35 Status | W36 Status | W37 Status | Classification |
|---|---|---|---|---|---|
| **`explore.js`** | 1-Sentence Placeholder | 1-Sentence Placeholder | 1-Sentence Placeholder | 1-Sentence Placeholder | **Placeholder Shell** (Missing 145-220w narrative & questions) |
| **`grammar.js`** | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | **Placeholder Shell** (Missing grammar rule & 10 exercises) |
| **`logic_lab.js`** | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | **Placeholder Shell** (Missing 15 quiz items & Bar Model SVGs) |
| **`writing.js`** | 1-Frame Dummy | 1-Frame Dummy | 1-Frame Dummy | 1-Frame Dummy | **Placeholder Shell** (Missing 3 Pixar 3D Panels & Word Bank) |
| **`mindmap.js`** | 1-Stem Dummy | 1-Stem Dummy | 1-Stem Dummy | 1-Stem Dummy | **Placeholder Shell** (Missing 36-branch 6x6 mindmap) |
| **`ask_ai.js`** | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | **Placeholder Shell** (Missing 5 Mascot Dialogue Turns) |
| **`singapore_math.js`** | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | **Placeholder Shell** (Missing 5 Bar Model SVG problems) |
| **`word_power.js`** | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | 1-Item Dummy | **Placeholder Shell** (Missing 8 Collocation Cards) |
| **`daily_watch.js`** | 1 Dummy Link | 1 Dummy Link | 1 Dummy Link | 1 Dummy Link | **Placeholder Shell** (Missing 5 Educational Videos) |

---

## 3. MISSING WEEKLY STRUCTURES, CONTENT & PEDAGOGY

### A. Missing Weekly Structures
1. **Singapore Bar Models (Hub 2 / Logic Lab)**: W34–W37 lack individual SVG bar model diagrams (`barmodel_wXX_adv_p1.svg` to `p5.svg`).
2. **Writing Studio Picture Panels (Hub 3)**: W34–W37 lack `story_prompts.picture_mode` with 3 Pixar 3D picture panel cards (`writing_panel_1.png` to `panel_3.png`).
3. **36-Branch Speaking Mindmap (Hub 4)**: W34–W37 contain only 1 stem instead of the mandatory 6 centerStems x 6 branchLabels = 36 branch nodes required by Gold Standard W33.

### B. Missing Content Depth
1. **STEM Story Framework**: W34–W37 `read.js` narratives lack the 3-step STEM Problem-Solving Cycle (Problem $\rightarrow$ Science/Math Application $\rightarrow$ Test & Result).
2. **Social Studies / History & Geography**: W34–W37 `explore.js` lack global perspective narratives (e.g. Ancient Greek Olympic Truce, Kenya Rift Valley marathon runners, Marco Polo Silk Road).
3. **AI Tutor V28 Format**: W34–W37 `week_XX_real.js` lack 3 story missions (Mission 1 retell STEM, Mission 2 retell Social, Mission 3 personal recount) and 2 Spark Talk cards.

### C. Missing Pedagogical Alignment
* **W34 (Fable)**: Lacks explicit pronunciation drills for regular vs. irregular past tense endings (`-ed` sound classification: `/t/`, `/d/`, `/ɪd/`).
* **W35 (Recount)**: Lacks adjective scaffolding for personal recount writing (descriptive sensory adjectives).
* **W36 (Project 3)**: Lacks 5-chapter mini-book structure for Project 3 presentation.
* **W37 (CLIL Unit 6)**: Lacks logical reasoning decision trees for classifying living vs. non-living objects using *"Because"*.

---

## 4. TARGET ARCHITECTURE GAP

When comparing the current production state against the locked Master Blueprint Matrix:

1. **Format Check Mode Progression**: W34–W37 lack the 10-Question Cambridge Format Check Mode in Hub 1 (`WorldDiscoveryHub.jsx`).
2. **Gamification Layer Integration**: W34–W37 lack activity-specific Motivation Policies for Flash Arena (speed match threshold 90%) and Podcast Shadowing (fluency threshold 75%).
3. **Learn / Practice / Check Progression**: Current W34–W37 render only a single static view rather than enforcing the 3-step Learn $\rightarrow$ Practice $\rightarrow$ Check progression proven in Milestone 1–6.

---

## 5. ROOT CAUSE

```text
===============================================================================
ROOT CAUSE 1: PLACEHOLDER GENERATION DURING ANTI-DRIFT FIXES
To satisfy anti-drift keyword gatekeepers quickly, helper scripts (`rebuild_all_station_files_w33_w37.mjs`) generated 1-sentence dummy objects for explore.js, grammar.js, logic_lab.js, writing.js, mindmap.js, and ask_ai.js.
While the topic names matched the Syllabus, the rich pedagogical content (STEM stories, 36-branch mindmaps, 3-picture writing panels, 15 logic questions) was replaced by empty placeholder shells.

ROOT CAUSE 2: LACK OF DEEP CONTENT VALIDATION IN CI GATEKEEPERS
The audit scripts checked keyword presence in text files, but did NOT check minimum line counts, mindmap stem counts (6x6), quiz item counts (15), or picture panel properties.
===============================================================================
```

---

## 6. CORRECTIVE IMPLEMENTATION PLAN (FAITHFUL SYLLABUS REBUILD)

To restore full Gold Standard quality across Weeks 34, 35, 36, and 37 without breaking existing contracts:

1. **Rebuild W34 (*"The Lion and the Mouse"* - Fable & Past Endings)**:
   - Full 3-step STEM narrative (`read.js`).
   - Global Perspective Fable History (`explore.js`).
   - 3 Pixar 3D Picture Panels for Writing (`writing.js`).
   - 36-Branch Mindmap for Speaking (`mindmap.js`).
   - 15 Logic & Science Quiz Items (`logic_lab.js`).

2. **Rebuild W35 (*"The Best Day Ever"* - Personal Recount & Adjectives)**:
   - Full Personal Memory narrative with descriptive adjectives (`read.js`).
   - 3 Pixar 3D Picture Panels for Writing (`writing.js`).
   - 36-Branch Mindmap for Speaking (`mindmap.js`).
   - 15 Logic & Science Quiz Items (`logic_lab.js`).

3. **Rebuild W36 (*"My Adventure Book"* - Review & Project 3)**:
   - Full 5-chapter Adventure Story narrative (`read.js`).
   - 3 Pixar 3D Picture Panels for Project 3 (`writing.js`).
   - 36-Branch Mindmap for Speaking (`mindmap.js`).
   - 15 Logic & Science Quiz Items (`logic_lab.js`).

4. **Rebuild W37 (*"Living vs. Non-Living"* - CLIL Unit 6 Nature's Rules)**:
   - Full Scientific Reasoning narrative with *"Because"* (`read.js`).
   - 3 Pixar 3D Picture Panels for Science Classification (`writing.js`).
   - 36-Branch Mindmap for Speaking (`mindmap.js`).
   - 15 Logic & Science Quiz Items (`logic_lab.js`).

5. **Strengthen Deep Field Gatekeeper (`validate_week.mjs`)**:
   - Enforce 36 mindmap branches, 15 logic quiz items, 20 vocab items, and 3 writing picture panels on all new weeks.

---

## 7. FINAL MANDATORY STATUS SECTIONS

### CURRENT STATE
W34–W37 display restored topic names on the Sidebar and Hub headers, BUT the inner activity content consists of 1-sentence placeholder shells copied from templates during automated fixes.

### WHAT MUST CHANGE
W34–W37 must be populated with full-length, authentic, Syllabus-aligned content matching the Gold Standard W33 specifications (145-220w stories, 36-branch mindmaps, 3-picture writing panels, 15 logic items, 20 vocab cards).

### WHAT CAN BE REUSED
* All UI Components (`WorldDiscoveryHub.jsx`, `ArenaHub.jsx`, `WritingStudioHub.jsx`, `NovaTalkShowHub.jsx`, `ChoiceGrid.jsx`, `MatchingCardGrid.jsx`).
* Orchestrator Pipelines (`GenericVerticalSliceOrchestrator.js`).
* Contracts & Taxonomies (`ContentSchemas.js`, `DiagnosticTaxonomy.js`, `RuntimeDataSourceRegistry.js`).
* Motivation & Gamification Layer (`MotivationService.js`).

### GO/NO-GO
```text
===============================================================================
TRUE PRODUCTION GAP AUDIT STATUS:
TOPIC TITLES MATCH SYLLABUS:      [ YES ]
ACTIVITY CONTENT DEPTH:           [ NO-GO (Needs full-length Syllabus rebuild for W34-W37) ]
COMPONENT REUSABILITY:            [ 100% REUSABLE ]
DECISION:                         [ NO-GO FOR W38–W52 ]
ACTION REQUIRED:                  [ Execute Rebuild of W34-W37 Content Files to Gold Standard ]
===============================================================================
```
