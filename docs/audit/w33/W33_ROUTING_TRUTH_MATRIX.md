# 🧭 W33 ROUTING TRUTH MATRIX (SOURCE-LEVEL COMPLETE TRACE)

**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Verification Method**: Independent Golden Oracle vs Actual Router / Component Trace  
**Status**: 🔴 **2 CRITICAL ROUTING COLLISIONS DETECTED (DAY 5)**

---

## 1. Trace Overview & Methodology

Every task was traced through the entire runtime execution path:
$$\text{questSchedule.js} \longrightarrow \text{URL Route} \longrightarrow \text{TaskScreen.jsx} \longrightarrow \text{Zone/Task Resolver} \longrightarrow \text{Target Component} \longrightarrow \text{Data Hub} \longrightarrow \text{Rendered Identity}$$

A task receives **PASS** only if:
$$\mathbf{EXPECTED} \equiv \mathbf{ACTUAL} \quad \text{across all architectural and semantic layers.}$$

---

## 2. Master 15-Task Routing Truth Table

| # | Day | Quest | Task ID | Route Path | Expected Semantic Role | Expected Type | Expected Paper / Part | Actual Mounted Component | Actual Data Source | Actual Content Key | Actual Rendered Title | Actual Part ID | Forbidden Mismatch? | Result |
| :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **1** | 1 | Q1 | `gear1_webtoon` | `/week/33/task/gear1_webtoon` | Scene Explorer | Non-Assessment | Core Story (3D Scenes) | `StoryWorldZone` (Gear 1) | `reading_hub.js` | `story_scenes` | Scene Explorer | `gear: 1` | None | ✅ **PASS** |
| **2** | 1 | Q2 | `gear2_karaoke` | `/week/33/task/gear2_karaoke` | Voice Shadow | Non-Assessment | Shadowing Studio | `StoryWorldZone` (Gear 2) | `reading_hub.js` | `shadowingData` | Voice Shadow | `gear: 2` | None | ✅ **PASS** |
| **3** | 1 | Q3 | `gear3_retell` | `/week/33/task/gear3_retell` | Story Retell | Non-Assessment | Guided Oral Retell | `StoryWorldZone` (Gear 3) | `reading_hub.js` | `retell_questions` | Story Retell | `gear: 3` | None | ✅ **PASS** |
| **4** | 2 | Q1 | `gear4_clil` | `/week/33/task/gear4_clil` | Fact Finder | Non-Assessment | CLIL Explorer | `StoryWorldZone` (Gear 4) $\rightarrow$ `CLILExplorer` | `reading_hub.js` | `clil_article` | Fact Finder | `gear: 4` | None | ✅ **PASS** |
| **5** | 2 | Q2 | `science_lab` | `/week/33/task/science_lab` | Action Lab | Non-Assessment | Interactive STEM Lab | `BattleArenaZone` $\rightarrow$ `ScienceDragDropLab` | `listening_hub.js` / `skill_practice_hub.js` | `science_lab` | Action Lab | `station: science_lab` | None | ✅ **PASS** |
| **6** | 2 | Q3 | `science_report` | `/week/33/task/science_report` | Discovery Report | Non-Assessment | Science Report Writer | `CreatorStudioZone` $\rightarrow$ `ScienceReportCreator` | `writing_hub.js` / `reading_hub.js` | `science_report_config` | Discovery Report | `station: science_report` | None | ✅ **PASS** |
| **7** | 3 | Q1 | `word_blitz` | `/week/33/task/word_blitz` | Speed Match | Non-Assessment | Vocab Reflex Arcade | `BattleArenaZone` $\rightarrow$ `FlashArena` | `reading_hub.js` / `vocab.js` | `vocab` | Speed Match | `station: word_blitz` | None | ✅ **PASS** |
| **8** | 3 | Q2 | `sentence_smash`| `/week/33/task/sentence_smash`| Grammar Duel | Non-Assessment | Syntax Builder Battle | `BattleArenaZone` $\rightarrow$ `SentenceBuilderBattle` | `listening_hub.js` / `skill_practice_hub.js` | `grammar_drills` | Grammar Duel | `station: sentence_smash`| None | ✅ **PASS** |
| **9** | 3 | Q3 | `math_quest` | `/week/33/task/math_quest` | Math Quest | Non-Assessment | Singapore Math Bar Model | `BattleArenaZone` $\rightarrow$ `BarModelQuest` | `listening_hub.js` / `skill_practice_hub.js` | `singapore_math` | Math Quest | `station: math_quest` | None | ✅ **PASS** |
| **10**| 4 | Q1 | `story_writer` | `/week/33/task/story_writer` | Story Writer | Formative Scaffold | Cambridge R&W Part 7 | `CreatorStudioZone` $\rightarrow$ `StoryWriting` | `writing_hub.js` | `picture_story` | Story Writer | `station: writing` | None | ✅ **PASS** |
| **11**| 4 | Q2 | `broadcast_studio`| `/week/33/task/broadcast_studio`| Video Challenge | Non-Assessment | Podcast Retelling | `CreatorStudioZone` $\rightarrow$ `RetellRecorder` | `writing_hub.js` / `creatorStudio.podcastScenes` | `podcastScenes` | Video Challenge | `station: broadcast` | None | ✅ **PASS** |
| **12**| 4 | Q3 | `info_exchange` | `/week/33/task/info_exchange` | Info Exchange | Formative Scaffold | Cambridge Speaking Part 2 | `InfoExchangeZone` | `speaking_hub.js` | `info_exchange_cards` | Info Exchange | `zone: info_exchange` | None | ✅ **PASS** |
| **13**| 5 | Q1 | `boss_listening` | `/week/33/task/boss_listening` | Listening Shield | Summative Assessment | Cambridge Listening Part 1 | `BossBattleZone` $\rightarrow$ `SVGLineMatcher` | `listening_hub.js` | `listening_p1` | Listening Parts (L1–L3) | `list_p1` | 🟡 Title Mismatch | 🟡 **TITLE MISMATCH** |
| **14**| 5 | Q2 | `boss_reading` | `/week/33/task/boss_reading` | Reading & Writing Shield | Summative Assessment | Cambridge Reading & Writing Part | `BossBattleZone` $\rightarrow$ `NotepadNoteCompleter` | `listening_hub.js` | `listening_p2` | Listening Part (L2) | `list_p2` | 🔴 **MOUNTED LISTENING COMPONENT** | 🔴 **FAIL (DAY5-ROUTING-002)** |
| **15**| 5 | Q3 | `weekly_review` | `/week/33/task/weekly_review` | Speaking & Passport | Summative Assessment | Cambridge Speaking Part | `BossBattleZone` $\rightarrow$ `VisualMatchingAH` | `listening_hub.js` | `listening_p3` | Listening Part (L3) | `list_p3` | 🔴 **MOUNTED LISTENING COMPONENT** | 🔴 **FAIL (DAY5-ROUTING-001)** |

---

## 3. Deep Analysis of Forbidden Component Invocations

### Task 14 (`boss_reading` $\rightarrow$ Route `/week/33/task/boss_reading`):
- **Expected Paper**: `Reading & Writing`
- **Expected Component Family**: `WordBankMatchingGrid` (R1), `DialogueAHCompleter` (R2), `RWPart3ClozeWithTitle` (R3), `InlineTextClozeDropdown` (R4), `TextExtractionCompleter` (R5), `OpenClozeCompleter` (R6), `StoryWriting` (R7).
- **Actual Component**: `<NotepadNoteCompleter>` (Listening Part 2 Note Completer with Cambridge audio dialogue).
- **Violation**: **FORBIDDEN COMPONENT DETECTED**. Mounting a Listening Paper audio note completer on a Reading & Writing Shield route is a direct contract violation.

### Task 15 (`weekly_review` $\rightarrow$ Route `/week/33/task/weekly_review`):
- **Expected Paper**: `Speaking`
- **Expected Component Family**: `FindDifferencesInteractive` (S1), `InformationExchangeP2` (S2), `PictureStoryContinuation` (S3), `PersonalQuestionsCompleter` (S4).
- **Actual Component**: `<VisualMatchingAH>` (Listening Part 3 Visual Matching A–H with Cambridge audio dialogue).
- **Violation**: **FORBIDDEN COMPONENT DETECTED**. Mounting a Listening Paper matching component on a Speaking & Passport Shield route is a direct contract violation.

---

## 4. Architectural Summary

- **Day 1 (Story World)**: 3/3 PASS (100% Alignment)
- **Day 2 (Knowledge Lab)**: 3/3 PASS (100% Alignment)
- **Day 3 (Battle Arena)**: 3/3 PASS (100% Alignment)
- **Day 4 (Creator Studio)**: 3/3 PASS (100% Alignment)
- **Day 5 (Boss Castle)**: 1 Title Mismatch, 2 Critical Routing Failures (0/3 Clean Assessment Pass)
