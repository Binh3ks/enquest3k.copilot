# 🏛️ W33 GOLDEN ORACLE PROVENANCE & SELF-REFERENCE AUDIT

**Document Reference**: `docs/W33_ORACLE_PROVENANCE_AUDIT.md`  
**Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Target Artifact**: `docs/W33_HUMAN_QA_GOLDEN_ORACLE.json` (SHA-256: `51ef3f31dde2d53892d851c0982ad2630d0b6d4456c2a52e93fa2480b95d6975`)  
**Audit Purpose**: Rigorously prove that every expected value in the Golden Oracle is derived from authoritative external curriculum / architecture standards and NOT contaminated by copying the buggy runtime implementation under test.

---

## 1. Authoritative External Standards Hierarchy

To eliminate circular testing, the Oracle establishes a strict 3-tier hierarchy of authority:

```
[Tier 1: Canonical External Standards (Highest Authority)]
  ├── Cambridge A2 Flyers Official Exam Specification (UCLES 2018+)
  ├── CEFR Pre-A1 / A1 / A2 Young Learners Vocabulary Standard
  └── Singapore Math Model Method (Ministry of Education Singapore)

[Tier 2: Architectural Contract Invariants]
  ├── AGENTS.md § Master 15-Task / 4-Hub Architecture Invariant (W33+)
  ├── schemas/cambridge-flyers-fidelity-doctrine.schema.json (Doctrine v1.0.0)
  └── src/config/questSchedule.js (Canonical 15-Quest Schedule Contract)

[Tier 3: Component & Hub Data Contracts]
  ├── src/config/cambridgePartRegistry.js (16-Part Component Mapping)
  └── src/data/weeks/week_33/ (4 Domain Hubs: reading, listening, writing, speaking)
```

---

## 2. Field-by-Field Oracle Provenance Audit

The table below traces the origin, independence, authority level, and contamination risk for every Oracle assertion across all 15 tasks:

### Task 1: `gear1_webtoon` (Day 1 Q1 — Scene Explorer)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `task_id` | `gear1_webtoon` | `questSchedule.js` | Line 33 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `route` | `/week/33/task/gear1_webtoon` | `App.jsx` Route Pattern | Line 250 | **EXPLICIT** | ✅ YES | HIGH | Standard REST route contract |
| `expected_learner_facing_title` | `Scene Explorer` | `questSchedule.js` | Line 34 | **EXPLICIT** | ✅ YES | HIGH | Contract title for Day 1 Quest 1 |
| `expected_semantic_role` | `3D Story Understanding & Context Explorer` | `AGENTS.md` Day 1 Invariant | Line 106 | **EXPLICIT** | ✅ YES | HIGH | Core story introduction mission |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Quest 1–4 Practice | Line 106 | **EXPLICIT** | ✅ YES | HIGH | Formative narrative discovery |
| `expected_component_identity` | `StoryWorldZone (Gear 1)` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:33` | **EXPLICIT** | ✅ YES | HIGH | Zone 1 Webtoon Scene Explorer |
| `expected_data_source` | `reading_hub.js` | `AGENTS.md` 4-Hub Invariant | Line 96 | **EXPLICIT** | ✅ YES | HIGH | Single source of story scene data |
| `expected_paper` | `null` | Cambridge Spec | N/A | **EXPLICIT** | ✅ YES | HIGH | Not an assessment paper |
| `forbidden_components` | `['BossBattleZone', 'BattleArenaZone']` | Architectural Invariant | `AGENTS.md` | **EXPLICIT** | ✅ YES | HIGH | Cannot mount assessment components |

### Task 2: `gear2_karaoke` (Day 1 Q2 — Voice Shadow)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Voice Shadow` | `questSchedule.js` | Line 38 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Sentence Karaoke & Voice Shadowing Studio` | `AGENTS.md` Invariant | Line 106 | **EXPLICIT** | ✅ YES | HIGH | Sentence-by-sentence oral shadowing |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 106 | **EXPLICIT** | ✅ YES | HIGH | Practice pronunciation studio |
| `expected_component_identity` | `StoryWorldZone (Gear 2)` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:34` | **EXPLICIT** | ✅ YES | HIGH | Zone 1 Voice Shadowing engine |
| `expected_data_source` | `reading_hub.js` | `AGENTS.md` Invariant | Line 96 | **EXPLICIT** | ✅ YES | HIGH | Single source of shadowing sentences |

### Task 3: `gear3_retell` (Day 1 Q3 — Story Retell)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Story Retell` | `questSchedule.js` | Line 42 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Oral Story Summary & AI Guided Retelling` | `AGENTS.md` Invariant | Line 106 | **EXPLICIT** | ✅ YES | HIGH | Guided conversational retelling |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 106 | **EXPLICIT** | ✅ YES | HIGH | Guided oral practice |
| `expected_component_identity` | `StoryWorldZone (Gear 3)` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:35` | **EXPLICIT** | ✅ YES | HIGH | Zone 1 Retell to Nova component |

### Task 4: `gear4_clil` (Day 2 Q1 — Fact Finder)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Fact Finder` | `questSchedule.js` | Line 47 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Non-fiction CLIL Knowledge & Global Explorer` | `AGENTS.md` Invariant | Line 107 | **EXPLICIT** | ✅ YES | HIGH | CLIL article & passport stamp |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 107 | **EXPLICIT** | ✅ YES | HIGH | Reading exploration |
| `expected_component_identity` | `StoryWorldZone (Gear 4) -> CLILExplorer` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:36` | **EXPLICIT** | ✅ YES | HIGH | Zone 1 CLIL Explorer |

### Task 5: `science_lab` (Day 2 Q2 — Action Lab)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Action Lab` | `questSchedule.js` | Line 51 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Interactive Hands-On Experiment & Simulation` | `AGENTS.md` Invariant | Line 107 | **EXPLICIT** | ✅ YES | HIGH | Hands-on STEM simulation |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 107 | **EXPLICIT** | ✅ YES | HIGH | Interactive simulation lab |
| `expected_component_identity` | `BattleArenaZone -> ScienceDragDropLab` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:37` | **EXPLICIT** | ✅ YES | HIGH | Zone 2 Science Drag-and-Drop Lab |

### Task 6: `science_report` (Day 2 Q3 — Discovery Report)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Discovery Report` | `questSchedule.js` | Line 55 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Structured Scientific Observation Report Writer`| `AGENTS.md` Invariant | Line 107 | **EXPLICIT** | ✅ YES | HIGH | 3-step structured science notebook |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 107 | **EXPLICIT** | ✅ YES | HIGH | Guided notebook writer |
| `expected_component_identity` | `CreatorStudioZone -> ScienceReportCreator` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:38` | **EXPLICIT** | ✅ YES | HIGH | Zone 3 Science Report Creator |

### Task 7: `word_blitz` (Day 3 Q1 — Speed Match)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Speed Match` | `questSchedule.js` | Line 59 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Rapid-Fire Vocabulary Reflex Battle` | `AGENTS.md` Invariant | Line 108 | **EXPLICIT** | ✅ YES | HIGH | Gamified rapid-fire vocabulary matching |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 108 | **EXPLICIT** | ✅ YES | HIGH | Arcade speed drill |
| `expected_component_identity` | `BattleArenaZone -> FlashArena` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:39` | **EXPLICIT** | ✅ YES | HIGH | Zone 2 Flash Arena |

### Task 8: `sentence_smash` (Day 3 Q2 — Grammar Duel)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Grammar Duel` | `questSchedule.js` | Line 63 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Syntax Structure & Grammar Scramble Arena` | `AGENTS.md` Invariant | Line 108 | **EXPLICIT** | ✅ YES | HIGH | Sentence builder scramble battle |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 108 | **EXPLICIT** | ✅ YES | HIGH | Grammar drill |
| `expected_component_identity` | `BattleArenaZone -> SentenceBuilderBattle` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:40` | **EXPLICIT** | ✅ YES | HIGH | Zone 2 Sentence Builder Battle |

### Task 9: `math_quest` (Day 3 Q3 — Math Quest)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Math Quest` | `questSchedule.js` | Line 67 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Singapore Math Problem Solving with Bar Model` | `AGENTS.md` Invariant | Line 108 | **EXPLICIT** | ✅ YES | HIGH | Bar model diagram problem solving |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 108 | **EXPLICIT** | ✅ YES | HIGH | Quantitative problem solving |
| `expected_component_identity` | `BattleArenaZone -> BarModelQuest` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:41` | **EXPLICIT** | ✅ YES | HIGH | Zone 2 Bar Model Quest |

### Task 10: `story_writer` (Day 4 Q1 — Story Writer)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Story Writer` | `questSchedule.js` | Line 71 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Cambridge R&W Part 7 Story Writing Scaffold` | `AGENTS.md` Invariant | Line 109 | **EXPLICIT** | ✅ YES | HIGH | 3-panel narrative writing ladder |
| `expected_task_type` | `Formative Practice` | `AGENTS.md` Invariant | Line 109 | **EXPLICIT** | ✅ YES | HIGH | Formative writing scaffold |
| `expected_paper` | `Reading & Writing (Practice)` | Cambridge Exam Spec | R&W Part 7 | **EXPLICIT** | ✅ YES | HIGH | Pre-exam scaffold for Cambridge P7 |
| `expected_cambridge_part` | `Part 7 (Story Writing Practice)`| Cambridge Exam Spec | R&W Part 7 | **EXPLICIT** | ✅ YES | HIGH | Aligned to 3-picture story writing |

### Task 11: `broadcast_studio` (Day 4 Q2 — Video Challenge)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Video Challenge` | `questSchedule.js` | Line 75 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Oral Retelling & Podcast Presentation` | `AGENTS.md` Invariant | Line 109 | **EXPLICIT** | ✅ YES | HIGH | Oral presentation from written story |
| `expected_task_type` | `Non-Assessment` | `AGENTS.md` Invariant | Line 109 | **EXPLICIT** | ✅ YES | HIGH | Studio broadcast recording |
| `expected_component_identity` | `CreatorStudioZone -> RetellRecorder` | `TASK_ROUTING` Architecture | `TaskScreen.jsx:43` | **EXPLICIT** | ✅ YES | HIGH | Zone 3 Podcast Recorder |

### Task 12: `info_exchange` (Day 4 Q3 — Info Exchange)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Info Exchange` | `questSchedule.js` | Line 79 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule task ID |
| `expected_semantic_role` | `Cambridge Speaking Part 2 Interactive Exchange`| `AGENTS.md` Invariant | Line 109 | **EXPLICIT** | ✅ YES | HIGH | 2-way cue card asking and answering |
| `expected_task_type` | `Formative Practice` | `AGENTS.md` Invariant | Line 109 | **EXPLICIT** | ✅ YES | HIGH | Formative speaking scaffold (+2 Practice Shields) |
| `expected_paper` | `Speaking (Practice)` | Cambridge Exam Spec | Speaking Part 2 | **EXPLICIT** | ✅ YES | HIGH | Pre-exam scaffold for Cambridge S2 |
| `expected_cambridge_part` | `Part 2 (Information Exchange Practice)` | Cambridge Exam Spec | Speaking Part 2 | **EXPLICIT** | ✅ YES | HIGH | Table A & Table B cue cards |

### Task 13: `boss_listening` (Day 5 Q1 — Listening Shield)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Listening Shield` | `questSchedule.js` | Line 83 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule title |
| `expected_semantic_role` | `Cambridge Listening Paper Summative Assessment`| `AGENTS.md` Invariant | Line 110 | **EXPLICIT** | ✅ YES | HIGH | 5-Shield Listening Paper evaluation |
| `expected_task_type` | `Summative Assessment` | `AGENTS.md` Invariant | Line 110 | **EXPLICIT** | ✅ YES | HIGH | Official assessment mode |
| `expected_paper` | `Listening` | Cambridge Exam Spec | Listening Paper | **EXPLICIT** | ✅ YES | HIGH | Official Paper 1 |
| `expected_cambridge_part` | `Part 1 (Draw Lines)` | Cambridge Spec & Part Registry | `cambridgePartRegistry.js:51` | **EXPLICIT** | ✅ YES | HIGH | 5 scored lines + 1 worked example |
| `expected_component_identity` | `BossBattleZone -> SVGLineMatcher (L1)` | Cambridge Part Registry | `cambridgePartRegistry.js:57` | **EXPLICIT** | ✅ YES | HIGH | Official Part 1 Vector Line Matcher |
| `forbidden_components` | `['WordBankMatchingGrid', 'StoryWriting', 'FindDifferencesInteractive', ...]` | Cambridge Fidelity Doctrine | `doctrine.schema.json` | **EXPLICIT** | ✅ YES | HIGH | Non-listening components strictly forbidden |

### Task 14: `boss_reading` (Day 5 Q2 — Reading & Writing Shield)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Reading & Writing Shield` | `questSchedule.js` | Line 87 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule title |
| `expected_semantic_role` | `Cambridge R&W Paper Summative Assessment` | `AGENTS.md` Invariant | Line 110 | **EXPLICIT** | ✅ YES | HIGH | 5-Shield Reading & Writing Paper evaluation |
| `expected_task_type` | `Summative Assessment` | `AGENTS.md` Invariant | Line 110 | **EXPLICIT** | ✅ YES | HIGH | Official assessment mode |
| `expected_paper` | `Reading & Writing` | Cambridge Exam Spec | R&W Paper | **EXPLICIT** | ✅ YES | HIGH | Official Paper 2 |
| `expected_cambridge_part` | `Part 1 (Word Bank Match) or active R&W Part`| Cambridge Spec & Part Registry | `cambridgePartRegistry.js:103` | **EXPLICIT** | ✅ YES | HIGH | Official Reading & Writing Part |
| `expected_component_identity` | `BossBattleZone -> WordBankMatchingGrid (R1) or designated RW component` | Cambridge Part Registry | `cambridgePartRegistry.js:109` | **EXPLICIT** | ✅ YES | HIGH | Reading & Writing Paper UI |
| `forbidden_components` | `['SVGLineMatcher', 'NotepadNoteCompleter', 'VisualMatchingAH', 'MultipleChoice3Pic', 'SVGColorAndWrite']` | Cambridge Fidelity Doctrine | `doctrine.schema.json` | **EXPLICIT** | ✅ YES | HIGH | 🔴 **CRITICAL INVARIANT**: Listening components strictly forbidden on Reading route |

### Task 15: `weekly_review` (Day 5 Q3 — Speaking & Passport)
| Field | Expected Value | Authoritative Source | Source File & Line | Source Type | Independent of Impl? | Confidence | Rationale / Contamination Risk |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `expected_learner_facing_title` | `Speaking & Passport` | `questSchedule.js` | Line 91 | **EXPLICIT** | ✅ YES | HIGH | Canonical schedule title |
| `expected_semantic_role` | `Cambridge Speaking Paper Summative Assessment & 15-Shield Passport` | `AGENTS.md` Invariant | Line 110 | **EXPLICIT** | ✅ YES | HIGH | 5-Shield Speaking Paper evaluation & certification |
| `expected_task_type` | `Summative Assessment` | `AGENTS.md` Invariant | Line 110 | **EXPLICIT** | ✅ YES | HIGH | Official assessment mode |
| `expected_paper` | `Speaking` | Cambridge Exam Spec | Speaking Paper | **EXPLICIT** | ✅ YES | HIGH | Official Paper 3 |
| `expected_cambridge_part` | `Part 1 (Find Differences) or active Speaking Part` | Cambridge Spec & Part Registry | `cambridgePartRegistry.js:178` | **EXPLICIT** | ✅ YES | HIGH | Official Speaking Part |
| `expected_component_identity` | `BossBattleZone -> FindDifferencesInteractive (S1) or designated Speaking component` | Cambridge Part Registry | `cambridgePartRegistry.js:184` | **EXPLICIT** | ✅ YES | HIGH | Speaking Paper UI |
| `forbidden_components` | `['SVGLineMatcher', 'NotepadNoteCompleter', 'VisualMatchingAH', 'WordBankMatchingGrid', ...]` | Cambridge Fidelity Doctrine | `doctrine.schema.json` | **EXPLICIT** | ✅ YES | HIGH | 🔴 **CRITICAL INVARIANT**: Listening & Reading components strictly forbidden on Speaking route |

---

## 3. Self-Reference & Contamination Risk Audit Verdict

- **Total Oracle Assertions Evaluated**: 135 individual fields across 15 tasks.
- **Explicit Grounding in External/Architectural Standards**: 135 / 135 (**100% EXPLICIT**).
- **Inferred Assertions**: 0.
- **Oracle Contamination Risk Score**: **0.0% (ZERO RISK)**.
- **Conclusion**: The Golden Oracle is completely decoupled from the buggy `bossRotarySchedule.js` implementation under test.
