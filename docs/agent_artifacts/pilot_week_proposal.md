# EngQuest3K — Phase 0 Pilot Week Selection Proposal (Round 59)

**Date:** 2026-11-06  
**Context:** Giai đoạn 2 Automated Content Pipeline (Nhóm 2 Reactivation)  
**Quality Gate Authority:** Claude (ESL-Expert Quality Gate)  
**Status:** Proposal Submitted for Review (Pre-Generation Stop Gate Active)

---

## I. Executive Summary

Per the project owner's strategic directive in Round 59:
1. **Reactivation of Nhóm 2:** Pedagogical content authoring for Giai đoạn 2 of `WEEK_PRODUCTION_SOP.md` is reactivated as an automated, staged pipeline.
2. **Claude as Primary ESL-Expert Quality Gate:** Rather than per-item owner check-ins, Claude serves as the pedagogical review authority for generated content packages.
3. **Pilot-First Rollout Discipline:** Before scaling to all 151 un-authored weeks, a focused **4-week pilot batch** will be executed, reviewed, and refined.
4. **W35 Rebuilt Fresh:** All legacy Round 58 migration data in W35 has been discarded; W35 is reset to a clean un-authored baseline and will be authored 100% fresh through the standardized pipeline.

Based on the 156-week Giai đoạn 2 Completion Inventory (`giaidoan2_inventory.tsv`), the following 4 pilot candidates are proposed.

---

## II. Proposed 4 Pilot Weeks

| Week | Title / Theme | CEFR Level | Program Stage | Inventory Status | Target Focus & Grammar Invariant |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **W35** | **Storytelling Practice 2 (Personal Recount)** | **A2 Flyers** | Year 1 Capstone (Rotary 3) | `POLLUTED` → Reset to Clean Baseline | Narrative recount, Past Simple + descriptive adjectives, C.U.B.E.S. math |
| **W38** | **Animal Abilities (Modals)** | **A2 Flyers** | Early Program (Post-Review) | `BLUEPRINT_ONLY` (0 code files) | STEM Biology (Animal capabilities), Modal verbs (*can / cannot / can't*), past-tense triad |
| **W78** | **Social Studies: Cultures & Math Surveys** | **B1 PET** | Mid Program (Year 2) | `BLUEPRINT_ONLY` (0 code files) | Cross-curricular Social Studies, Comparative structures (*Unlike...*, *Similar to...*, *Whereas*) |
| **W125** | **Intro & Conclusion (Academic Essay Structure)** | **B1+ Academic** | Late Program (Year 3) | `BLUEPRINT_ONLY` (0 code files) | Academic discourse, Rhetorical essay structure, Persuasive verbs (*Urge*, *Recommend*, *Should*) |

---

## III. Detailed Candidate Justifications

### 1. Week 35 — Mandatory Reset Candidate
- **Theme:** *The Best Day Ever / Storytelling Practice 2 (Personal Recount)*
- **CEFR Level:** A2 Flyers (Rotary Cycle 3, Year 1 Capstone)
- **Inventory Status:** `POLLUTED` (W34 Lion/Mouse legacy pollution eliminated; reset to clean stubs in Round 59 Phase 0)
- **Why This Week:**
  - **P0 Priority Rectification:** W35 is currently locked behind `TOTAL_TRIPS = 34` hotfix due to historical W34 data corruption. Authoring W35 fresh through the pipeline permanently resolves the defect at the root.
  - **Zero Special-Casing Validation:** Proves that the standardized pipeline operates identically on weeks with troubled git history as on completely blank weeks, with zero ad hoc manual patching.
  - **Narrative Genre Coverage:** Tests the pipeline's ability to generate coherent personal recounts, emotional/sensory descriptive adjectives, and Cambridge Flyers R&W Part 6 open cloze passages.

### 2. Week 38 — Early Program Candidate
- **Theme:** *Animal Abilities (Modals)*
- **CEFR Level:** A2 Flyers (Early Year 2 Foundation)
- **Inventory Status:** `BLUEPRINT_ONLY` (Contains only `blueprint.json`; exactly 0 code files exist in `src/data/weeks/week_38/`)
- **Why This Week:**
  - **Clean Blueprint Baseline:** Follows immediately after the Year 1 consolidation and review weeks (W36–W37), making it the first purely blank curriculum week in the sequence.
  - **Verified Foundation:** Possesses 8 verified Source B syllabus verbs (`jump`, `fly`, `swim`, `hunt`, `climb`, `run`, `heavy`, `fast`) and a complete past-tense phonological triad (`/t/`, `/d/`, `/ɪd/`) tagged in Round 54.
  - **STEM Integration:** Tests the pipeline's capability to generate Life Sciences CLIL content (locomotion, adaptations, predator-prey dynamics) and Singapore Math comparative bar models.

### 3. Week 78 — Mid-Program Candidate
- **Theme:** *Social Studies/ELA: Cultures / Math: Surveys*
- **CEFR Level:** B1 Preliminary (PET)
- **Inventory Status:** `BLUEPRINT_ONLY` (Contains only `blueprint.json`; 0 code files exist)
- **Why This Week:**
  - **CEFR Progression Validation:** Elevates the pedagogical complexity from Primary Young Learners (A2 Flyers) to Lower Secondary (B1 Preliminary / PET), testing if the pipeline adjusts vocabulary lexile, sentence length, and grammatical complexity appropriately.
  - **Cross-Disciplinary Rigor:** Bridges Social Studies (world cultural traditions, holidays, celebrations) with Singapore Math statistical data (survey frequency tables, bar graphs).
  - **Grammar Scaffolding:** Validates synthesis of nuanced comparative conjunctions and contrastive clause structures (`Unlike...`, `Similar to...`, `Whereas...`).

### 4. Week 125 — Late-Program Candidate
- **Theme:** *Intro & Conclusion (Academic Essay Structure)*
- **CEFR Level:** B1+ Academic (Secondary English for Academic Purposes)
- **Inventory Status:** `BLUEPRINT_ONLY` (Contains only `blueprint.json`; 0 code files exist)
- **Why This Week:**
  - **Upper-Tier Difficulty Gate:** Tests whether the pipeline can scaffold advanced academic rhetoric, formal thesis statements, rhetorical question hooks, and synthesis conclusions without falling back to simplistic young-learner tropes.
  - **EAP Vocabulary:** Validates academic collocation generation (`conclusion`, `summarize`, `restate`, `persuade`, `recommend`) and academic register.
  - **Long-Term Scaling Assurance:** Successfully generating W125 alongside W35/W38/W78 proves that the pipeline is robust across the entire 3-year curriculum continuum (W01–W156).

---

## IV. Pilot Execution Guardrails

1. **Safety Freeze Protection:** Weeks 33 and 34 remain cryptographically frozen and will not be touched by any pipeline script under any circumstance.
2. **Hotfix Retention:** `TOTAL_TRIPS = 34` in `QuestSidebar.jsx` and `PassportTracker.jsx` remains strictly active during pilot authoring. It will only be updated after W35 passes all Giai đoạn 4 Quality Gates and receives sign-off from Claude.
3. **No Direct Production Commits:** All generated content for the 4 pilot weeks will be packaged into isolated review packages (`.zip`) with complete TSV checklists, diffs, and test logs for Claude's review prior to merging.
4. **Stop Gate:** No pipeline construction or content generation scripts will execute until this proposal is formally confirmed.
