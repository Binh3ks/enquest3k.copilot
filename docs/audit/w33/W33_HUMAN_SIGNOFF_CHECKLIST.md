# 📋 ENGQUEST3K — W33 HUMAN SIGN-OFF CHECKLIST
**Governance Standard:** Evidence Over Claim (`DISCOVERED → FIXED → VERIFIED → CLOSED`)  
**Target Week:** Week 33 ("Corridor Safety & Friction")  
**Golden Core Status:** `100% LOCKED` (7/7 Protected Files Cryptographically Verified)  
**Automated Suites:** `100% PASS` (Freeze Guard, Golden Regression, Concurrency, Gamification, Browser E2E, Vite Build)  
**Human Owner Acceptance Authority:** `PENDING HUMAN OWNER SIGN-OFF`  

---

## INSTRUCTIONS FOR HUMAN OWNER
The four items below are **qualitative acceptance gates** that cannot be closed purely by automated tests.  
Please inspect each item using the criteria described and check the box once satisfied.

---

### [ ] H1 — Scene 4 Visual Artwork Acceptance
- **Asset Path:** [`public/images/week33/webtoon_scene_4.png`](file:///Users/binhnguyen/projects/Engquest3k/public/images/week33/webtoon_scene_4.png)
- **What Automation Already Proves:**
  - File exists at exact canonical path.
  - Byte length is valid ($1.40\text{ MB} > 10\text{ KB}$).
  - Aspect ratio and image dimensions load cleanly in Chrome browser without error (HTTP 200).
  - Gate 3 (`gate3_media_integrity.mjs 33`) passes 100%.
- **What Automation CANNOT Prove:**
  - Visual anatomical integrity and absence of generative diffusion hallucinations.
  - Character consistency (boy in red t-shirt, friend in blue hoodie, nurse in uniform).
  - Story setting continuity (school hallway with blue lockers, bench, first-aid kit).
  - Pedagogical suitability for young English learners (ages 7–10).
- **Human Inspection Criteria:**
  1. Verify the young boy in the red shirt is sitting intact and naturally on the wooden bench (complete head, torso, arms, legs).
  2. Verify the friendly school nurse is kneeling and applying a clean medical bandage to his scraped knee.
  3. Verify the open red first-aid kit is sitting beside him on the bench.
  4. Verify there are **zero floating, severed, or distorted limbs** anywhere in the image.
  5. Verify the 3D Pixar animation art style matches Scenes 1, 2, 3, and 5.
- **Current Machine Status:** `SCENE4_MACHINE_QA = PASS`
- **Current Governance Status:** `VERIFIED / HUMAN REVIEW REQUIRED`

---

### [ ] H2 — Word Treasury UX & Ingestion Acceptance
- **Route:** `#/word-treasury` (Component: `src/pages/WordTreasury.jsx`)
- **What Automation Already Proves:**
  - Route `#/word-treasury` returns HTTP 200 with zero console errors.
  - Exactly 20 vocabulary words from Week 33 are loaded and ingested into `wordMemoryBank`.
  - Status filter tabs (All, New, Learning, Reviewing, Mastered) filter array counts correctly.
  - LocalStorage data isolation is namespaced by active learner UID.
- **What Automation CANNOT Prove:**
  - Qualitative flashcard UX, visual clarity of English terms, Vietnamese definitions, and examples.
  - Card interaction smoothness and visual appeal of status badges.
  - Audio pronunciation playback naturalness on card interaction.
- **Human Inspection Criteria:**
  1. Open `#/word-treasury` in the browser and verify the 20 Week 33 words are displayed with definitions and examples.
  2. Click status tabs (New, Learning, Reviewing, Mastered) and confirm list updates cleanly.
  3. Click card pronunciation/audio icons and verify sound plays cleanly without UI lag.
  4. Verify zero unwanted legacy words appear on a fresh learner session.
- **Current Machine Status:** `WORD_TREASURY_MACHINE_QA = PASS`
- **Current Governance Status:** `VERIFIED / HUMAN REVIEW REQUIRED`

---

### [ ] H3 — QuestMap3D Header Quick-Access Layout Acceptance
- **Component:** `src/components/questmap/QuestMap3D.jsx` (Styles: `src/components/questmap/QuestMap3D.css`)
- **What Automation Already Proves:**
  - Header right container (`.qm3d-header-right`) renders 3 action buttons: Arcade (`Gamepad2`), Word Treasury (`BookOpen`), and Class Co-op (`Users`).
  - Button click handlers trigger their respective modals (`ArcadeModal`, `ClassLeaderboardModal`) or navigation.
  - DOM elements are visible and interactive in Playwright E2E.
- **What Automation CANNOT Prove:**
  - Visual aesthetic balance and responsive layout across desktop and mobile screens.
  - Absence of visual clipping or overlap with title, week progress, or map canvas on non-standard viewport dimensions.
- **Human Inspection Criteria:**
  1. View `QuestMap3D` at standard desktop resolution ($1920\times 1080$ / $1440\times 900$) and confirm the top action buttons look polished and balanced.
  2. View `QuestMap3D` at mobile viewport width ($375\text{px}$ to $414\text{px}$) and confirm buttons wrap or scale without colliding with map navigation.
  3. Click each button to confirm modal opens smoothly over the map canvas.
- **Current Machine Status:** `QUESTMAP_HEADER_MACHINE_QA = PASS`
- **Current Governance Status:** `VERIFIED / HUMAN REVIEW REQUIRED`

---

### [ ] H4 — Day 5 Boss Castle Assessment & Passport Flow Acceptance
- **Route:** `#/week/33/task/weekly_review` (Component: `src/modules/zones/BossBattleZone.jsx`)
- **Rotary Cycle Context:** Week 33 executes **Rotary Cycle 1 (Listening Shield Quests)**:
  - Task 13 (`boss_listening`): Cambridge Listening Part 1 (`list_p1` — Draw Lines)
  - Task 14 (`boss_reading`): Cambridge Listening Part 2 (`list_p2` — Note Taking)
  - Task 15 (`weekly_review`): Cambridge Listening Part 3 (`list_p3` — Visual Matching) $\rightarrow$ Grand Stamp Passport Completion
  - *(Note: Cambridge Speaking Part 2 practice is integrated in Day 4 Task 12 `info_exchange`; Speaking assessment parts S1–S4 execute in Cycles 2, 4, and 5).*
- **What Automation Already Proves:**
  - In `QuestSidebar.jsx` and `TaskScreen.jsx`, navigating to Day 5 quests routes directly to `BossBattleZone.jsx`.
  - Day 5 Boss Castle loads `Master Soundwave Nova` with active Cambridge Listening Parts 1–3 without invoking legacy W01–W32 `srsGenerator.js`.
  - Zero runtime React/DOM errors or broken network requests logged in browser audit.
- **What Automation CANNOT Prove:**
  - Pedagogical suitability and clarity of Cambridge audio prompts and visual matching interactions.
  - Overall game feel, pacing of the Boss Battle encounter, and satisfaction of the Grand Stamp Passport completion ceremony.
- **Human Inspection Criteria:**
  1. Navigate to `/week/33/task/weekly_review` (or `/week/33/task/boss_listening`).
  2. Confirm the Day 5 Boss Castle task loads with Cambridge A2 Flyers Cycle 1 context (`Master Soundwave Nova` — Listening Parts 1–3).
  3. Verify Cambridge audio prompts play with two-play loop standard and questions render cleanly.
  4. Confirm zero legacy W01–W32 review cards appear in this task.
  5. Verify completion triggers the Grand Stamp / Explorer Passport modal.
- **Current Machine Status:** `DAY5_REVIEW_MACHINE_QA = PASS`
- **Current Governance Status:** `VERIFIED / HUMAN REVIEW REQUIRED`

---

## GOVERNANCE SUMMARY & NEXT STEPS
When all four checkboxes are accepted by the Human Owner:
1. Findings `FINDING-SCENE4`, `FINDING-A`, `FINDING-B`, and `FINDING-C` may be formally transitioned from `VERIFIED` to `CLOSED`.
2. Overall repository state transitions to `17/17 CLOSED`.
3. The Human Owner may authorize `git commit` and `git push`.
4. Phase 3D may be unlocked and authorized.

```text
CURRENT AUTHORIZATION STATE
===========================
W33 Golden Core     : VERIFIED (100% LOCKED)
Historical Findings : 13 CLOSED / 4 VERIFIED (HUMAN REVIEW REQUIRED) / 0 OPEN
Human Sign-Off      : PENDING HUMAN OWNER

Phase 3D            : NOT AUTHORIZED
Git Commit          : NOT AUTHORIZED
Git Push            : NOT AUTHORIZED
W34                 : NOT AUTHORIZED
```
