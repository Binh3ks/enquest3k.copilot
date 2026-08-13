# W33 GOLDEN v2 STRICT CAPABILITY GAP AUDIT
**To**: Antigravity Development Team  
**Status**: BLOCKER — ALL CONTENT GENERATION HALTED (W34–W72 STOPPED)  
**Subject**: Cambridge A2 Flyers 16-Part Learner-Facing Interactive UI Audit  

---

## EXECUTIVE SUMMARY & AUDIT PRINCIPLE

Per the locked supreme directive:
> *A capability is **NOT IMPLEMENTED** merely because a schema exists, a backend parameter is defined, a component file is in the codebase, or a unit test passes. It is **ONLY IMPLEMENTED** when and only when the real learner-facing UI, real interaction, scoring/validation, content, and progress persistence are functioning smoothly in the browser.*

The recent deployment updated W33 content and cleaned up fallback text strings (*Content Refresh*), but **did not introduce the full suite of interactive Cambridge A2 Flyers learner-facing UI formats** required by the locked Target Architecture. 

This audit evaluates all 16 official Cambridge A2 Flyers parts against the actual learner-facing UI.

---

## OFFICIAL CAMBRIDGE A2 FLYERS 16-PART AUDIT MATRIX

| Exam Section | Cambridge Format | Official Task Requirement | Learner-Facing UI Status | Classification | Audit Detail & UI Reality |
|---|---|---|---|---|---|
| **Reading & Writing** | **Part 1** | Match 10 definitions to 15 word options. | 10-to-10 matching grid active in Hub 2. Shared 15-word bank layout missing. | **PARTIAL** | Matching grid UI exists, but lacks 15-word shared bank layout with 5 distractor word cards. |
| **Reading & Writing** | **Part 2** | Complete dialogue with 5 gaps using 8 options (A–H). | Isolated 3-option MC cards active in Check Mode. | **PARTIAL** | Individual A/B/C cards exist, but 5-turn continuous dialogue with shared A–H crossed-out pool is missing. |
| **Reading & Writing** | **Part 3** | Read story with 5 gaps + Choose best story title. | 5-gap interactive story active in Hub 1. Title choice card missing. | **PARTIAL** | 5-gap Open Cloze UI works, but "Choose best title" 3-option card at end of story is missing on UI. |
| **Reading & Writing** | **Part 4** | Factual text with 10 Multiple Choice gaps (A/B/C). | 10 separate quiz card screens active in Check Mode. | **PARTIAL** | Separate MC quiz cards exist, but continuous text with 10 embedded inline popover/dropdown selectors is missing. |
| **Reading & Writing** | **Part 5** | Complete 7 sentences using 1–4 words from story text. | No sentence completion UI for text extraction. | **MISSING** | **Zero UI** for reading 3 story pages and completing 7 sentences with 1–4 words extracted from text. |
| **Reading & Writing** | **Part 6** | Open Cloze: Free-text typing in 5 text gaps without bank. | 5 free-text input boxes with instant validation active in Hub 1. | **IMPLEMENTED** | **Real UI active**: Learner types directly into 5 text gaps in Hub 1 Open Cloze tab with real-time scoring. |
| **Reading & Writing** | **Part 7** | Write a 3-picture story (20–50 words). | 3 Pixar panel cards + Word Pills + Rule Trackers active in Hub 3. | **IMPLEMENTED** | **Real UI active**: 3 Pixar picture cards, Word Pills, real-time word counter (35–50w), past verb counter, and submit. |
| **Listening** | **Part 1** | Line matching: Connect 7 names to people in picture scene. | Text card matching active in Flash Arena. SVG picture line matching missing. | **MISSING** | **Zero UI** for SVG/DOM line matching between 7 name tags and people in a picture scene (Canvas forbidden). |
| **Listening** | **Part 2** | Note completion: Write name / number / word from audio. | Full sentence audio dictation active in Hub 3. | **PARTIAL** | 5-sentence dictation typing exists, but authentic Notepad Card with specific slot prompts (e.g. *Teacher: ___*) is missing. |
| **Listening** | **Part 3** | Visual matching: Match 5 items/days to 8 picture cards (A–H). | Text matching active in Hub 2. | **MISSING** | **Zero UI** for matching 5 items/days to 8 picture cards (A–H) driven by audio narration. |
| **Listening** | **Part 4** | 5 audio questions with 3 picture choices (A/B/C) per item. | Text-based A/B/C MC active in Check Mode. | **PARTIAL** | Text MC questions exist, but 3-picture option cards (A/B/C) with per-question audio playback are missing. |
| **Listening** | **Part 5** | Colour & Write: Color 4 objects and write 1 label word on scene. | No interactive coloring or labelling UI exists. | **MISSING** | **Zero UI** for interactive SVG/DOM object coloring and label writing on a scene image. |
| **Speaking** | **Part 1** | Find Differences: Compare 2 pictures and speak differences. | No side-by-side or toggle picture comparison UI exists. | **MISSING** | **Zero UI** for interactive Find Differences picture comparison with clickable difference hotspots & audio record. |
| **Speaking** | **Part 2** | Information Exchange: Student MUST ASK 5 questions from cue-card. | Student answering mascot questions active in Hub 4. | **PARTIAL** | Student answering UI works, but Cue-Card UI prompting student to FORM AND ASK 5 QUESTIONS to AI is missing. |
| **Speaking** | **Part 3** | Picture story continuation: Describe story from 4 pictures. | Single sentence & paragraph shadowing active in Hub 4. | **PARTIAL** | Shadowing and Mindmap exist, but 4-picture sequential story narration flow (listen intro, speak P2-P4) is missing. |
| **Speaking** | **Part 4** | Personal questions: 5 open speaking Q&A turns with mascot. | 5-turn Nova Live Talk Show AI Voice Q&A active in Hub 4. | **IMPLEMENTED** | **Real UI active**: 5-turn mascot voice dialogue, mic/text input, instant evaluation, and completion scoring in Hub 4. |

---

## 1. EXACTLY WHAT V2 ADDS OVER V1 (UI/UX CHANGES ONLY)

* **Hub 1 (World Discovery)**:
  - **3D Webtoon Scene Viewer**: Added 5 Pixar 3D scene cards (`webtoon_scene_1.png` $\rightarrow$ `scene_5.png`) with interactive hotspot audio pins and `HoverWord` popover dictionary.
  - **Interactive Open Cloze Tab**: Added a dedicated sub-tab switching between 3D Webtoon and Open Cloze 5-gap text entry.
* **Hub 2 (Arena Battles)**:
  - **Sentence Builder Battle**: Upgraded drag-and-drop word blocks UI supporting Past Continuous syntax (`While + Subject + was/were + V-ing`).
  - **Bar Model Quest (Singapore Math)**: Added 5 custom SVG bar model visualization cards with interactive numerical answer inputs.
* **Hub 3 (Writing Studio)**:
  - **3-Picture Panel Card Layout**: Added 3 Pixar 3D story cards (`writing_panel_1.png`, `panel_2.png`, `panel_3.png`) with expandable modal preview.
  - **Word Bank Pills**: Added clickable word pills (Action Verbs, Connectors, Chunks, Boosters) that insert directly into the text editor.
  - **Live Rule Trackers**: Added real-time progress bars for Word Count (35-50 target), Past Verbs ($\ge 3$), and Connectors ($\ge 2$).
* **Hub 4 (Nova Talk Show)**:
  - **2-Phase Podcast Shadowing**: Added Phase 1 single-sentence listen-and-repeat and Phase 2 continuous narrative shadowing.
  - **Nova Live Talk Show**: Added a 5-turn interactive AI Voice chat interface with mascot speech synthesis and mic input.
  - **36-Branch Mindmap**: Added an expandable 6x6 node speaking mindmap visualization.

---

## 2. MISSING CAPABILITIES (ACTUAL LEARNER-FACING UI GAPS)

1. **R&W Part 1 (15-Word Shared Bank)**: Learner cannot pick from a shared pool of 15 word cards to answer 10 definition cards.
2. **R&W Part 2 (Dialogue A–H)**: Learner cannot view a 5-turn continuous dialogue with an 8-option (A–H) side drawer that strikes out used options.
3. **R&W Part 3 (Story Title Selection)**: Learner is not presented with a 3-option "Choose the best title for the story" card at the end of Hub 1.
4. **R&W Part 4 (Inline Text Dropdown MC)**: Learner cannot complete a continuous factual text with 10 embedded inline popover/dropdown selectors.
5. **R&W Part 5 (1–4 Word Sentence Completion)**: Learner has no UI to read 3 story pages and fill 7 sentence completion gaps using 1-4 words extracted from text.
6. **Listening Part 1 (SVG Line Matching)**: Learner cannot drag/connect SVG lines between 7 name tags and people in a picture scene image.
7. **Listening Part 2 (Notepad Card Slots)**: Learner has no authentic Notepad Card UI with 5 specific field slot prompts (e.g. *Teacher's name: ___*).
8. **Listening Part 3 (5-to-8 Picture Card Matching)**: Learner cannot drag 5 day/object tokens onto 8 picture cards (A–H) while listening to audio.
9. **Listening Part 4 (3-Picture Option MC)**: Learner cannot select from 3 picture option cards (A/B/C) per audio question.
10. **Listening Part 5 (SVG Object Colour & Write)**: Learner cannot click SVG/DOM object layers to apply colors or type a label on a scene sign.
11. **Speaking Part 1 (Find Differences)**: Learner cannot view side-by-side or toggle picture comparisons, click difference hotspots, and speak explanations.
12. **Speaking Part 2 (Cue-Card Question Forming)**: Learner is never presented with a Cue-Card prompting them to FORM AND ASK 5 QUESTIONS to the AI mascot.
13. **Speaking Part 3 (4-Picture Story Continuation)**: Learner cannot listen to Picture 1 intro and record spoken descriptions for Pictures 2, 3, and 4 in sequence.

---

## 3. CAPABILITIES THAT CAN REUSE EXISTING ENGINES

1. **R&W Part 3 (Story Title Selection)**: Can reuse existing `ChoiceGrid` / `MCQuiz` UI component placed at the bottom of `WorldDiscoveryHub.jsx`.
2. **Listening Part 2 (Notepad Card Slots)**: Can reuse existing `Dictation` input engine embedded inside a styled Notepad Card container component.
3. **Listening Part 4 (3-Picture Choice MC)**: Can reuse existing `ReadingPart3` MC state engine, replacing text option labels with `<img src="..." />` cards.
4. **Speaking Part 2 (Cue-Card Question Forming)**: Can reuse existing `NovaTalkShowHub.jsx` speech-to-text and AI evaluation pipeline, adding a Cue-Card prompt UI step before mascot responses.
5. **Speaking Part 3 (4-Picture Story Continuation)**: Can reuse existing `WritingStudioHub.jsx` 3-picture panel card component + `NovaTalkShowHub.jsx` audio recording pipeline.

---

## 4. GENUINELY NEW CAPABILITIES (REQUIRE BRAND-NEW UI COMPONENTS)

1. **R&W Part 1 Shared 15-Word Bank UI (`WordBankMatchingGrid.jsx`)**: Must build a 15-card shared word bank with 10 target drop/click zones and distractor management.
2. **R&W Part 2 Dialogue A–H Drawer UI (`DialogueAHCompleter.jsx`)**: Must build a continuous 5-gap dialogue component with an 8-item (A–H) collapsible choice drawer that strikes out selected letters.
3. **R&W Part 4 Inline Text MC Dropdown UI (`InlineTextClozeDropdown.jsx`)**: Must build an inline text parser that embeds 10 interactive popover/dropdown selectors directly into paragraph flow.
4. **R&W Part 5 Text Extraction Sentence Completer (`TextExtractionCompleter.jsx`)**: Must build a 3-page split-screen reader (Story text on left, 7 sentence completion inputs on right with 1-4 word validator).
5. **Listening Part 1 SVG Line Matching UI (`SVGLineMatcher.jsx`)**: Must build an SVG overlay over a scene image connecting 7 name tags to x,y target coordinates (NO Canvas; pure SVG `<line>` / `<path>`).
6. **Listening Part 3 Visual Matching A–H UI (`VisualMatchingAH.jsx`)**: Must build a 5-item token list and an 8-picture card grid (A–H) with drag-and-drop or click-to-pair assignment.
7. **Listening Part 5 SVG Colour & Write UI (`SVGColorAndWrite.jsx`)**: Must build a layered SVG scene with clickable target paths, color palette picker, and 1 text label slot.
8. **Speaking Part 1 Find Differences UI (`FindDifferencesInteractive.jsx`)**: Must build a side-by-side / toggle picture comparison component with hotspot detection markers and mic recording.

---

## 5. REQUIRED IMPLEMENTATION ORDER (DEPENDENCY-BASED ROADMAP)

```text
STEP 1: Implement Low-Hanging UI Enhancements (Reusing Existing Engines)
        ├── 1.1 R&W Part 3: Add "Choose Best Title" card to Hub 1
        ├── 1.2 Listening Part 2: Restructure Dictation into Notepad Card UI
        └── 1.3 Listening Part 4: Add 3-Picture Option Cards to Audio MC

STEP 2: Implement High-Priority R&W UI Components
        ├── 2.1 R&W Part 1: Build WordBankMatchingGrid (10 definitions, 15 words)
        ├── 2.2 R&W Part 2: Build DialogueAHCompleter (5 gaps, 8 options A-H)
        ├── 2.3 R&W Part 4: Build InlineTextClozeDropdown (10 inline text dropdowns)
        └── 2.4 R&W Part 5: Build TextExtractionCompleter (3-page story + 7 sentence inputs)

STEP 3: Implement SVG & Interactive Audio Listening Components (NO CANVAS)
        ├── 3.1 Listening Part 1: Build SVGLineMatcher (SVG line connecting 7 names)
        ├── 3.2 Listening Part 3: Build VisualMatchingAH (5 items to 8 picture cards A-H)
        └── 3.3 Listening Part 5: Build SVGColorAndWrite (SVG object coloring + label)

STEP 4: Implement Interactive Speaking Components
        ├── 4.1 Speaking Part 1: Build FindDifferencesInteractive (2 pictures + difference hotspots)
        ├── 4.2 Speaking Part 2: Build CueCardQuestionForming (Student asks AI 5 questions)
        └── 4.3 Speaking Part 3: Build PictureStoryContinuation (4 pictures audio narration)
```

---

## 6. WHAT MUST EXIST IN THE W33 GOLDEN UI BEFORE LOCK

Before Week 33 can be formally locked as **W33 GOLDEN WEEK v2**, the following **16 interactive learner-facing UI capabilities** must be present, visible, interactive, scored, and persisted on the browser:

- [ ] **R&W P1**: Shared 15-word bank matching 10 definitions with 5 distractor word pills (`WordBankMatchingGrid`).
- [ ] **R&W P2**: 5-turn continuous dialogue with 8-option (A–H) choice drawer and used-letter strikethrough (`DialogueAHCompleter`).
- [ ] **R&W P3**: 5-gap story + 3-option "Choose the best title for the story" card at the end of Hub 1.
- [ ] **R&W P4**: Factual paragraph with 10 embedded inline popover/dropdown selectors (`InlineTextClozeDropdown`).
- [ ] **R&W P5**: Split-screen 3-page reader with 7 sentence completion inputs extracting 1–4 words directly from text (`TextExtractionCompleter`).
- [ ] **R&W P6**: 5-gap Open Cloze free-text typing (Currently **IMPLEMENTED** in Hub 1).
- [ ] **R&W P7**: 3-picture story writing with 3 Pixar panels, Word Pills, live word counter (35–50w), and rule trackers (Currently **IMPLEMENTED** in Hub 3).
- [ ] **L P1**: SVG line matching connecting 7 name tags to target coordinates on a scene image (`SVGLineMatcher`).
- [ ] **L P2**: Authentic Notepad Card with 5 specific field slot prompts driven by audio narration.
- [ ] **L P3**: 5 item/day tokens draggable/assignable to 8 picture cards (A–H) driven by audio (`VisualMatchingAH`).
- [ ] **L P4**: 5 audio questions with 3 picture choice cards (A/B/C) per item.
- [ ] **L P5**: Layered SVG scene with 4 clickable coloring paths and 1 text label slot (`SVGColorAndWrite`).
- [ ] **S P1**: Side-by-side or toggle picture comparison with 4–5 clickable difference hotspots and mic recording (`FindDifferencesInteractive`).
- [ ] **S P2**: Cue-Card UI where the student MUST FORM AND ASK 5 QUESTIONS to the AI mascot before answering.
- [ ] **S P3**: 4-picture story continuation flow (Listen to Picture 1 intro, record spoken descriptions for Pictures 2–4).
- [ ] **S P4**: 5-turn mascot voice Q&A dialogue with mic/text input and evaluation (Currently **IMPLEMENTED** in Hub 4).

---

```text
===============================================================================
W33 GOLDEN v2 STRICT CAPABILITY GAP AUDIT DECISION:
CONTENT PRODUCTION STATUS:       [ BLOCKED (W34-W72 HALTED) ]
IMPLEMENTED CAMBRIDGE PARTS:     [ 3 / 16 Parts (18.75%) ]
PARTIAL CAMBRIDGE PARTS:         [ 8 / 16 Parts (50.00%) ]
MISSING CAMBRIDGE PARTS:         [ 5 / 16 Parts (31.25%) ]
CANVAS FORBIDDEN RULE:           [ ENFORCED (Pure SVG / DOM Overlay mandatory) ]
NEXT ACTION:                     [ AWAIT USER APPROVAL OF THIS AUDIT REPORT ]
===============================================================================
```
