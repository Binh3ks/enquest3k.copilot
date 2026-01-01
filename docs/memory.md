# 🧠 PROJECT MEMORY (Copilot)

> Only FINAL decisions, rules, or conclusions.
> No chat logs. No discussion.

---

## [2025-01-xx] Context System Decision
- Copilot context is built from:
  - source code
  - master prompts / artifacts
  - this memory file
- Copilot does NOT persist chat.
- `npm run context:build` is the ONLY way to update context.

---

## [2025-01-xx] AI Tutor Architecture
- Tutor is pedagogy-driven, not conversational
- Content-aware by week (grammar + vocab)
- Student must produce more language than AI

### 2025-12-30 07:21:36
- Decision: Copilot context is built only from files listed in docs/context-sources.md. Memory is appended via add-memory script.

### 2025-12-30 07:26:39
- Decision: Context built only from docs

### Rule (2025-12-30)
- Copilot context is built ONLY from files listed in docs/context-sources.md.


### Decision (2025-12-30)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-30)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-30)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-30)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-30)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-30)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-30)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-30)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-30)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-30)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-30)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-30)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-30)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-30)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-30)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-30)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-30)
- project_manager.sh option 5 now auto-saves 16 critical memory entries (AI Tutor fixes, grammar rules, bugs, implementation plan) and rebuilds context automatically. No manual input needed.


### Decision (2025-12-30)
- AI Tutor now reads actual student responses for contextual acknowledgments instead of hardcoded patterns. Responses are personalized based on what student actually said.


### Decision (2025-12-30)
- Turn progression scaffolding built for 156 weeks - Phase 1 (Week 1-14): 10 turns, Phase 2 (Week 15-112): 20 turns, Phase 3 (Week 113-156): 30 turns. Flexible conversation depth.


### Decision (2025-12-30)
- Conversation closing now invites continuation instead of abrupt ending. Asks if student wants to continue or suggests next topic (family, hobbies, etc).


### Fact (2025-12-30)
- Name extraction regex now supports unicode characters (Vietnamese names like Bình, Hà). Pattern changed from [a-z]+ to [A-Za-z\u00C0-\u1EF9]+.


### Fact (2025-12-30)
- Generator context (studentName, age, favoriteSubject, teacherName) now resets when starting new mission to prevent context bleed from previous conversations.


### Fact (2025-12-30)
- Turn logic fixed - currentTurn means we just received answer for (currentTurn-1) and will ask currentTurn. Acknowledgment now uses previousTurn topic, not currentTurn topic.


### Decision (2025-12-30)
- AI Tutor Story Missions now use tutorEngine with Groq/Gemini instead of hardcoded responses. Hints come from AI response.scaffold.hints, not hardcoded question matching.


### Decision (2025-12-30)
- Removed ALL hardcoded turn responses. AI now generates responses for ALL turns via Groq/Gemini. Removed word count validation. Hints included in scaffold.hints field of every AI response.


### Constraint (2025-12-30)
- StoryMissionSchema requires only story_beat and task (not required_vocab). Scaffold.hints is optional but MUST be returned by AI for UI to show hints.


### Decision (2025-12-30)
- Story Mission now AI-driven, NOT hardcoded turns. AI decides questions based on mission topic/goal. AI generates hints based on its own questions. Follows Chat tab pattern - natural conversation flow.


### Decision (2025-12-30)
- Replaced SmartCheck with AI feedback. AI now detects grammar/pronunciation errors and provides gentle corrections in feedback.correction field. Feedback shown as system message with 💡 icon before AI response.


### Decision (2025-12-30)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-30)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-30)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-30)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-30)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-30)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-30)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-30)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-30)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-30)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-30)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-30)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-30)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-30)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-30)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-30)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-30)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-30)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-30)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-30)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-30)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-30)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-30)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-30)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-30)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-30)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-30)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-30)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-30)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-30)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-30)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-30)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-30)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-30)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-30)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-30)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-30)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-30)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-30)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-30)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-30)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-30)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-30)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-30)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-30)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-30)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-30)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-30)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1 data complete with assets. Week 2-17 are MISSING (16 weeks need generation). Week 18-21 are complete.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 2-17, Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Discovery (2025-12-31)
- copilot-context.md outdated - Shows Week 2-17 MISSING but Week 2 actually complete with full structure (Advanced + Easy modes, voice config, AI Tutor checklist).


### Decision (2025-12-31)
- Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference.


### Fact (2025-12-31)
- Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar.


### Rule (2025-12-31)
- Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state.


### Discovery (2025-12-31)
- Week 2 audio tasks generated in tools/audio_tasks.json for mindmap branches (week2_easy) - Shows asset generation pipeline working for completed weeks.


### Constraint (2025-12-31)
- Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions.


### Decision (2025-12-31)
- Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system.


### Fact (2025-12-31)
- Week 2 structure complete - 14 station files in both modes: read.js, vocab.js, grammar.js, ask_ai.js, logic.js, dictation.js, shadowing.js, writing.js, explore.js, word_power.js, daily_watch.js, word_match.js, mindmap.js, index.js.


### Rule (2025-12-31)
- Chat session memory capture workflow - (1) Review chat for insights (2) Add to add-chat-insights.mjs (3) Run script to append to memory (4) Rebuild context for next session.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1-2 data complete with full station structure. Week 2 has Advanced (Family Observation) + Easy (My Family Squad) modes with UK voice config. Week 3-17 are MISSING (15 weeks need generation). Week 18-21 are complete.


### Fact (2025-12-31)
- Week 2 structure complete - Advanced: Present Continuous & Questions, Easy: This is my... (Possession). Both modes have 14 station files, UK voice config (en-GB-Neural2-A/C), and AI Tutor specific checklist.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 3-17 (15 weeks), Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- Week 2 Easy mode correctly implements family topic with simpler grammar (This is my...) vs Advanced (Present Continuous). Both share family context but different complexity levels.


### Decision (2025-12-31)
- Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference.


### Fact (2025-12-31)
- Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar.


### Rule (2025-12-31)
- Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state.


### Constraint (2025-12-31)
- Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions.


### Decision (2025-12-31)
- Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1-2 data complete with full station structure. Week 2 has Advanced (Family Observation) + Easy (My Family Squad) modes with UK voice config. Week 3-17 are MISSING (15 weeks need generation). Week 18-21 are complete.


### Fact (2025-12-31)
- Week 2 structure complete - Advanced: Present Continuous & Questions, Easy: This is my... (Possession). Both modes have 14 station files, UK voice config (en-GB-Neural2-A/C), and AI Tutor specific checklist.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 3-17 (15 weeks), Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- Week 2 Easy mode correctly implements family topic with simpler grammar (This is my...) vs Advanced (Present Continuous). Both share family context but different complexity levels.


### Decision (2025-12-31)
- Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference.


### Fact (2025-12-31)
- Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar.


### Rule (2025-12-31)
- Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state.


### Constraint (2025-12-31)
- Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions.


### Decision (2025-12-31)
- Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system.


### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1-2 data complete with full station structure. Week 2 has Advanced (Family Observation) + Easy (My Family Squad) modes with UK voice config. Week 3-17 are MISSING (15 weeks need generation). Week 18-21 are complete.


### Fact (2025-12-31)
- Week 2 structure complete - Advanced: Present Continuous & Questions, Easy: This is my... (Possession). Both modes have 14 station files, UK voice config (en-GB-Neural2-A/C), and AI Tutor specific checklist.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 3-17 (15 weeks), Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- Week 2 Easy mode correctly implements family topic with simpler grammar (This is my...) vs Advanced (Present Continuous). Both share family context but different complexity levels.


### Decision (2025-12-31)
- Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference.


### Fact (2025-12-31)
- Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar.


### Rule (2025-12-31)
- Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state.


### Constraint (2025-12-31)
- Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions.


### Decision (2025-12-31)
- Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system.



### Rule (2025-12-31)
- Video queries format standardized - All weeks use Week 19 format with weekId, theme, grammar, topic, science metadata from syllabus_database.js. Queries are CLEAN (no "for kids" or "ESL" added in JSON).


### Decision (2025-12-31)
- Video search priority system - Script searches in order: (1) Whitelist channels + keyword match, (2) Backup query + whitelist, (3) Expanded search (no whitelist), (4) Purpose-specific fallback. Script automatically adds "for kids ESL" during YouTube search.


### Rule (2025-12-31)
- Video distribution must be 2+2+1 format - All weeks follow Week 19 standard: 2 GRAMMAR + 2 TOPIC + 1 SCIENCE videos. No other distributions allowed (e.g., 3 TOPIC + 0 SCIENCE).


### Constraint (2025-12-31)
- Video duration validation mandatory - All videos must be 60s ≤ duration ≤ 900s (1-15 minutes). Shorts (<60s) and long videos (>15min) are automatically filtered out.


### Decision (2025-12-31)
- Week 19 is STRUCTURE template only - Week 19 provides file schema, station keys, and format standards. Each week uses own TOPIC/CONTENT from syllabus_database.js, not Week 19's "Childhood & Memories" content.


### Rule (2025-12-31)
- Video queries generated from syllabus + blueprint - Each week's video_queries.json must extract grammar, topic, and science from syllabus_database.js, then create 5 search queries (3-5 keywords each) with backup_query for safety fallback.


### Fact (2025-12-31)
- Batch manager and generate_images_nano_banana.js both use Nano Banana - Both image generation scripts now use gemini-3-pro-image-preview (free tier) after fixing batch_manager.js from broken imagen-3.0-generate-001 model.


### Decision (2025-12-31)
- Audio and image asset generation workflows documented - Master Prompt V23 Section 0.10 now contains complete workflows: generate_audio.js for TTS (Neural2 voices), generate_images_nano_banana.js for images, update_videos.js for video curation. All scripts have skip logic for existing files.

### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1-2 data complete with full station structure. Week 2 has Advanced (Family Observation) + Easy (My Family Squad) modes with UK voice config. Week 3-17 are MISSING (15 weeks need generation). Week 18-21 are complete.


### Fact (2025-12-31)
- Week 2 structure complete - Advanced: Present Continuous & Questions, Easy: This is my... (Possession). Both modes have 14 station files, UK voice config (en-GB-Neural2-A/C), and AI Tutor specific checklist.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 3-17 (15 weeks), Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- Week 2 Easy mode correctly implements family topic with simpler grammar (This is my...) vs Advanced (Present Continuous). Both share family context but different complexity levels.


### Decision (2025-12-31)
- Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference.


### Fact (2025-12-31)
- Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar.


### Rule (2025-12-31)
- Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state.


### Constraint (2025-12-31)
- Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions.


### Decision (2025-12-31)
- Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system.



### Rule (2025-12-31)
- Story Mission file structure standardized - Each mission is separate file in src/data/missions/ with format week{N}_{theme}.js (e.g., week2_family_introduction.js). Central registry in storyMissions.js exports Week{N}Missions arrays and getMissionsForWeek() function.


### Fact (2025-12-31)
- Story Mission architecture implemented - 3 missions per week format: Mission 1 (introduction), Mission 2 (deeper focus), Mission 3 (activities/application). Week 1: school themed, Week 2: family themed. Each mission has 10 steps with scaffolding (7 core + 3 expansion).


### Rule (2025-12-31)
- Story Mission schema requirements - Each mission must have: id, weekId, title, description, targetVocabulary (5-7 words with mustUse flags), successCriteria (minTurns, mustUseWords, optionalBonus), steps array (10 steps with hints/repair/modelSentence), scaffolding config, novaPersonality with dadJokes.


### Decision (2025-12-31)
- Story Mission dynamic loading pattern - StoryMissionTab.jsx uses getMissionsForWeek(weekData.weekId) instead of hardcoded imports. This enables automatic mission loading when new weeks are added without UI code changes.


### Constraint (2025-12-31)
- Story Mission vocab alignment mandatory - All targetVocabulary must exist in week's vocab.js file from syllabus_database.js. mustUseWords should be 3-4 core words from week grammar focus, optionalBonus should be 2-3 supporting words.


### Rule (2025-12-31)
- Story Mission naming convention - Files named week{N}_{theme}.js in lowercase with underscores. Mission IDs use format W{N}_{THEME_CAPS} (e.g., W2_FAMILY_INTRO). Titles are natural English (e.g., "Meet My Family", "Family Team").


### Decision (2025-12-31)
- Story Mission generation from syllabus - Each week's 3 missions derived from syllabus_database.js topic field. Week 2 topic "Family members" → 3 missions: introduction (meet family), roles (team/leader/helper), activities (family time together).

### Decision (2025-12-31)
- AI Tutor conversation flow fixed - Turn order now: Name → Age → Teacher → Subject → Friends → Classroom → What you like (natural progression)


### Decision (2025-12-31)
- AI Tutor now uses 3-part teacher personality pattern - (1) Specific acknowledgment (2) Encouragement (3) Contextual next question. No more robotic responses.


### Fact (2025-12-31)
- 4 files modified for AI Tutor fix - tutorPrompts.js (turn logic), week1.js (conversation structure), StoryMissionTab.jsx (hints matching), responseGenerator.js (acknowledgment patterns)


### Rule (2025-12-31)
- Week 1 grammar MUST be Present Simple only (I am, you are, is/are, have/has, my/your). NO past tense, NO future tense, NO complex clauses in Phase 1 (Weeks 1-14).


### Constraint (2025-12-31)
- Hints in StoryMissionTab.jsx MUST match the exact question being asked. Use getCurrentHints() function with question text matching logic.


### Fact (2025-12-31)
- Week 1-2 data complete with full station structure. Week 2 has Advanced (Family Observation) + Easy (My Family Squad) modes with UK voice config. Week 3-17 are MISSING (15 weeks need generation). Week 18-21 are complete.


### Fact (2025-12-31)
- Week 2 structure complete - Advanced: Present Continuous & Questions, Easy: This is my... (Possession). Both modes have 14 station files, UK voice config (en-GB-Neural2-A/C), and AI Tutor specific checklist.


### Constraint (2025-12-31)
- Week 1 voiceConfig is identical to Week 19 (CRITICAL BUG). Must regenerate Week 1 audio with unique voiceConfig per MANDATORY rule in Master Prompt V23.


### Decision (2025-12-31)
- Progress tracking UI missing - Need to implement toast notifications, progress indicators in sidebar, auto-save animation, and Continue Learning feature. Logic exists in progressHelper.js but no visual feedback.


### Fact (2025-12-31)
- Master Prompt V23 is production-ready (3,040 lines) - All Week 1 errors documented and fixed, single-command asset generation enabled, pre-flight validation added, automated fix scripts documented.


### Constraint (2025-12-31)
- Google Cloud TTS API not enabled yet (project 153898303209). Need to enable before regenerating Week 1 audio assets.


### Decision (2025-12-31)
- Implementation Plan timeline - Day 1: Foundation fixes (Week 1 + API setup), Day 2-3: Mass generation Week 3-17 (15 weeks), Day 4: Testing + polish. Target completion: Jan 2, 2026.


### Rule (2025-12-31)
- AI Tutor must read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) and Blueprint (2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt) to understand grammar scope and vocabulary for each week.


### Fact (2025-12-31)
- AI Tutor Phase 2 MVP complete - 3 Story Missions for Week 1 (First Day, Lost Backpack, Library) with turn-by-turn conversation, scaffolding system, vocab tracking. Known issue: Turn 2 was hardcoded (now fixed with natural flow).


### Decision (2025-12-31)
- User progress saved in localStorage with keys: engquest_current_user, engquest_users_db, engquest_station_<weekId>_<stationKey>, engquest-tutor-storage. Main files: progressHelper.js, userStorage.js, stationStateHelper.js, tutorStore.js.


### Rule (2025-12-31)
- Easy mode vs Advanced mode - Easy uses personal/immediate context with Tier 1 vocab and simple grammar. Advanced uses global/abstract context with Tier 2/3 vocab and complex grammar.


### Constraint (2025-12-31)
- Week 1 Easy mode changed topic instead of simplifying (CRITICAL ERROR). Easy mode must use same topic as Advanced but with simpler vocabulary and grammar.


### Decision (2025-12-31)
- Week 2 Easy mode correctly implements family topic with simpler grammar (This is my...) vs Advanced (Present Continuous). Both share family context but different complexity levels.


### Decision (2025-12-31)
- Memory system needs chat session insights capture - Important discussions, design decisions, and implementation considerations from chat sessions must be preserved in memory for future reference.


### Fact (2025-12-31)
- Week 2 has unique AI Tutor features - Special checklist in AITutor.jsx (line 1053) with tips and learning objectives specific to family vocabulary and Present Continuous grammar.


### Rule (2025-12-31)
- Context rebuild required after major discoveries - When significant gaps found between documentation and reality, immediate context rebuild needed to sync copilot knowledge with actual project state.


### Constraint (2025-12-31)
- Memory entries in project_manager.sh were hardcoded and outdated - Need dynamic system to capture real-time project insights and decisions from active development sessions.


### Decision (2025-12-31)
- Manual memory curation essential - Critical insights from chat sessions about project structure, implementation gaps, and strategic decisions must be manually reviewed and added to memory system.



### Decision (2026-01-01)
- Chat tab opening messages now week-aware - Dynamic opening system checks weekId and vocabList to generate context-specific greetings. Week 2 "family" scenario now asks "Who is the leader in your family?" using week vocab (team, leader, helper) instead of generic "How many people are in your family?".


### Rule (2026-01-01)
- Chat AI prompts must include week vocabulary - chatAI() function updated to include grammar focus and 8 key vocab words in prompt. Beginner level (Weeks 1-14) limited to 10 words max, present simple only. AI instructed to use week vocabulary in responses.


### Fact (2026-01-01)
- Chat tab has 2 layers of content awareness - Layer 1: Opening messages (now dynamic based on weekId/vocabList). Layer 2: AI responses (already context-aware with weekInfo, vocabList, grammar). Both layers now aligned with week content.


### Decision (2026-01-01)
- Chat tab converted to Free Talk Mode - Renamed "Chat" → "Talk", removed scenario selection buttons, implemented immersive UI with Ms. Nova "off-duty" persona. Focus on connection over correction - no explicit grammar checking, week-aware but natural conversation.


### Fact (2026-01-01)
- Free Talk UI uses Immersive Header design - Large avatar (Ms. Nova 🐾) with gradient background (indigo), online status indicator, "Nova is typing" animation with bouncing dots. Big Mic button (p-4, 24px icon) for voice-first interaction. Rounded chat bubbles (rounded-3xl) with TTS button on hover.


### Rule (2026-01-01)
- Free Talk prompt uses Ms. Nova "Off-Duty" persona - Temperature 0.75 for creativity. NO teaching, NO explicit corrections. Uses "Recasting" technique (repeat correct form naturally). Responses under 40 words, always end with question. Open to ANY topic (games, pets, dreams) not just syllabus. Week vocabulary used naturally, not forced.
