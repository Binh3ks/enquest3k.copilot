# Round 94 Quality Gates Verification & Staging Remediation Report

> 🧠 **Tier 4 Execution Report** — Full 18-week (W55–W72) pedagogical remediation, authentic Cambridge Flyers R&W and Speaking Part 2 generation, and 17-gate mechanical verification.

## 1. Speaking Part 2 (Info Exchange) Defect Remediation

| Defect Category | Round 93 (Before) | Round 94 (Remediated) | Status |
|:---|:---:|:---:|:---:|
| **Table B missing `nova_question`** | 90 / 90 fields (100% missing) | **0 / 90 fields** (100% present) | ✅ 100% RESOLVED |
| **Table A missing `nova_reply`** | 54 / 90 fields (60% missing) | **0 / 90 fields** (100% present) | ✅ 100% RESOLVED |
| **Placeholder / Generic Values** (`... on file`, `is recorded for...`) | 36 / 90 fields (40% placeholder) | **0 / 90 fields** (0 placeholders) | ✅ 100% RESOLVED |
| **Noun Phrase Cues instead of Flyers Cues** (`Calculated difference`, etc.) | 90 / 90 fields | **0 / 90 fields** (100% Flyers `/` format) | ✅ 100% RESOLVED |

## 2. 18-Week Curricular & Pedagogical Alignment (W55–W72)

| Week | Source B Master Syllabus Theme | Source B Vocab | CLIL FK | Gates | Off-List Curricular Disclosures |
|:---:|:---|:---:|:---:|:---:|:---|
| **W55** | ELA: Cause & Effect (Sentences) / Math: Addition with Regrouping | 7/7 (100%) | **4.1** | 17/17 PASS | cause, effect, reason, result, connect, therefore, column, digit, carry over, sum, ones, tens, place value, domino, action, block, rule |
| **W56** | ELA: Cause & Effect (Paragraph) / Math: Subtraction with Regrouping | 7/7 (100%) | **5.8** | 17/17 PASS | lead to, due to, consequently, finally, regroup, minus, subtract, bottom number, seed |
| **W57** | ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts | 8/8 (100%) | **5** | 17/17 PASS | solution, solve, suggest, multiply, times, groups of, product, array, repeated addition, tool |
| **W58** | ELA: Problem & Solution (Paragraph) / Math: Division Concepts | 7/7 (100%) | **5.5** | 17/17 PASS | plan, success, fail, strategy, divide, share equally, split, quotient, equal, fair share, rule |
| **W59** | ELA: Message in a Bottle (Informal Writing) / Math: Remainders | 8/8 (100%) | **5.1** | 17/17 PASS | reply, miss you, remainder, left over, divide, equal group, sailor |
| **W60** | ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations | 8/8 (100%) | **6.7** | 17/17 PASS | Sir, Madam, sincerely, request, community, order, calculate, parentheses, mayor |
| **W61** | ELA: Main Idea Hunter / Math: Word Problems | 7/7 (100%) | **7** | 17/17 PASS | main idea, detail, support, topic, title, word problem, plan, solve, check, volcano, smoke, ash, erupt |
| **W62** | ELA: The Movie Trailer (Summarizing) / Math: Rounding | 7/7 (100%) | **7.5** | 17/17 PASS | summary, retell, scene, character, plot, nearest, estimate, closer, number line, beginning, ending |
| **W63** | ELA: Reading Maps / Math: Coordinates | 10/10 (100%) | **6.4** | 17/17 PASS | compass, direction, grid, coordinate, distance |
| **W64** | ELA: Data Stories / Math: Pictographs | 8/8 (100%) | **6.2** | 17/17 PASS | chart, graph, data, least, pictograph, symbol, count by, total, compare, survey |
| **W65** | Review & Consolidation (Cycle 2.1) | 20/20 (100%) | **6.5** | 17/17 PASS | cause, effect, solution, plan, review, solve, compass, graph, data, summary, retell, symbol, calculate, equal, success |
| **W66** | Micro-Debate 1: Email vs Handwritten Letters | 7/7 (100%) | **6.7** | 17/17 PASS | faster, slower, personal, delete, debate, opinion |
| **W67** | ELA: The OREO Structure / Math: Measuring Mass | 7/7 (100%) | **6.2** | 17/17 PASS | opinion, disagree, reason, mass, gram, kilogram, scale, weigh, balance |
| **W68** | ELA: Strong Reasons / Math: Bar Graphs | 6/6 (100%) | **6.4** | 17/17 PASS | support, detail, fact, true, prove, clear, bar graph, scale, height, value, compare, skip counting, reason |
| **W69** | Science/ELA: Environmental Protection / Math: Line Plots | 8/8 (100%) | **6.6** | 17/17 PASS | protect, pollution, waste, recycle, plot, frequency, line plot, most common, x-mark, nature |
| **W70** | ELA: Presentation "My Green Idea" / Math: Graph Review | 7/7 (100%) | **6.1** | 17/17 PASS | speech, voice, clear, audience, bar graph, line plot, pictograph, chart, data |
| **W71** | Science/ELA: The Solar System / Math: Large Numbers | 8/8 (100%) | **7.6** | 17/17 PASS | solar system, orbit, telescope, billion, large number, place value, comma |
| **W72** | Science/ELA: Photosynthesis / Math: Area & Perimeter | 8/8 (100%) | **5.9** | 17/17 PASS | photosynthesis, sunlight, carbon dioxide, oxygen, energy, absorb, area, perimeter, square units, measure |

## 3. Cryptographic & Governance Safety Verification

- **W33 Golden Master Freeze Guard**: `npm run guard:freeze:w33` -> **147/147 locked files cryptographically verified** (PASS).
- **Governance Documents Guard**: `npm run guard:governance` -> **100% locked documents verified** (PASS).
- **Production Integrity Scope Boundary**: `git diff -- src/data/weeks/` -> **0 modifications** (100% untouched).
- **Production Build Verification**: `npm run build` -> **Exit code 0** (PASS).

## 4. Verbatim Raw Quality Gates Execution Log

```text
================================================================================
ROUND 94 COMPREHENSIVE QUALITY GATES AUDIT (WEEKS 55–72)
Timestamp: 2026-11-14T04:22:28.042Z
Scope: docs/agent_artifacts/staging/week_{55..72}/
================================================================================

>>> AUDITING STAGED WEEK 55 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_55)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (152 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 88885857ea5e2305..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=4.1 [4.0-8.5], LongWords=0.7% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (17/20 = 85% >= 60%, SB=7/7 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 55 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 56 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_56)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (139 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 34dda45ec4b2d533..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=5.8 [4.0-8.5], LongWords=2.9% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (17/20 = 85% >= 60%, SB=7/7 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 56 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 57 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_57)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (133 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 4bc77df2dad65861..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=5 [4.0-8.5], LongWords=1.5% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (15/20 = 75% >= 60%, SB=8/8 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 57 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 58 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_58)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (124 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 3dc7447c85cbc369..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=5.5 [4.0-8.5], LongWords=1.6% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (12/20 = 60% >= 60%, SB=5/7 = 71%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 58 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 59 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_59)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (131 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 000b60920ade0dae..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=5.1 [4.0-8.5], LongWords=0% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (16/20 = 80% >= 60%, SB=7/8 = 88%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 59 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 60 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_60)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (137 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: def811941f33c2a3..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.7 [4.0-8.5], LongWords=2.9% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (17/20 = 85% >= 60%, SB=8/8 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 60 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 61 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_61)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (145 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: f9fbe9627d1f4674..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=7 [4.0-8.5], LongWords=3.4% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (18/20 = 90% >= 60%, SB=6/7 = 86%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 61 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 62 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_62)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (141 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 86701d8c9839344a..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=7.5 [4.0-8.5], LongWords=4.3% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (17/20 = 85% >= 60%, SB=5/7 = 71%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 62 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 63 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_63)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (139 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: afaf169213b86c8c..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 10 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.4 [4.0-8.5], LongWords=5.8% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (14/20 = 70% >= 60%, SB=10/10 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 63 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 64 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_64)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (134 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 33be6cf55c8a5487..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.2 [4.0-8.5], LongWords=6% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (17/20 = 85% >= 60%, SB=8/8 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 64 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 65 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_65)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (123 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: b0f4433fd35d7974..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 20 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.5 [4.0-8.5], LongWords=4.1% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (12/20 = 60% >= 60%, SB=12/20 = 60%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 65 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 66 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_66)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (138 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 53d4430e3c1b94b5..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.7 [4.0-8.5], LongWords=5.1% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (16/20 = 80% >= 60%, SB=6/7 = 86%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 66 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 67 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_67)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (125 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: c75a03670faacabf..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.2 [4.0-8.5], LongWords=0.8% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (14/20 = 70% >= 60%, SB=7/7 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 67 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 68 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_68)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (145 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: b79b81463009f816..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 6 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.4 [4.0-8.5], LongWords=2.8% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (16/20 = 80% >= 60%, SB=6/6 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 68 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 69 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_69)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (153 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 2cd8ad0df055d847..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.6 [4.0-8.5], LongWords=3.3% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (17/20 = 85% >= 60%, SB=7/8 = 88%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 69 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 70 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_70)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (122 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: 0a86c6830ab0d12f..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 7 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=6.1 [4.0-8.5], LongWords=0.8% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (13/20 = 65% >= 60%, SB=5/7 = 71%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 70 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 71 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_71)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (140 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: b9491295fa1d105e..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=7.6 [4.0-8.5], LongWords=5% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (14/20 = 70% >= 60%, SB=7/8 = 88%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 71 VERDICT: 100% PASS (All 17 evaluated gates passed)

>>> AUDITING STAGED WEEK 72 (at /Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/staging/week_72)
  [G-GEN-01 Schema Contract]: PASS (All 9 deliverable files exist)
  [G-GEN-02 Vocab & SRS]: PASS (20/20 target words with valid GA IPA, bilingual defs and examples)
  [G-GEN-03 CLIL Rigor]: PASS (138 words, 5 glossary terms, 3 check questions)
  [G-GEN-04 Shadowing IPA]: PASS (8 sentences with valid GA IPA, no long spelled-out numbers)
  [G-GEN-05 Cambridge R&W]: PASS (Part 1 matching, Part 2 5-turn dialogue, Part 6 cloze)
  [G-GEN-06 Mini-Games]: PASS (5 valid bar models with modelData, 3 lab stages, 5 grammar drills)
  [G-GEN-07 Vietnamese Leak]: PASS (0 Vietnamese leaks in English target fields)
  [G-GEN-08 Banned Tokens]: PASS (0 adult/literary banned tokens found)
  [G-GEN-09 Generic Boilerplate]: PASS (0 placeholder / on-file strings)
  [G-GEN-10 Skeleton Differentiation]: PASS (SHA256: f18bcdd8dde4735f..., 0 collisions)
  [G-GEN-11 Pedagogical Fidelity]: PASS (Theme strict match, 100% of 8 Source B syllabus words covered)
  [G-GEN-12 CEFR Consistency]: PASS (reading_hub, blueprint, provenance all "A2 Flyers")
  [G-GEN-13 Readability Bounds]: PASS (CLIL FK=5.9 [4.0-8.5], LongWords=2.2% <= 10%, Defs FK<=9.5, Examples FK<=10.0)
  [G-GEN-14 Provenance Integrity]: PASS (Agent attribution and Source B reference verified)
  [G-GEN-15 Vocab in CLIL]: PASS (20/20 = 100% >= 60%, SB=8/8 = 100%)
  [G-GEN-16 ESL Anomalies]: PASS (0 duplicate words or coarse ESL grammatical anomalies)
  [G-GEN-SP2 Speaking Part 2]: PASS (10/10 fields compliant: 5/5 Table B with nova_question & real value, 5/5 Table A with Flyers cues & real nova_reply)
  🎉 WEEK 72 VERDICT: 100% PASS (All 17 evaluated gates passed)

================================================================================
FINAL MECHANICAL AUDIT SUMMARY ACROSS ALL 18 WEEKS (W55–W72)
Weeks Audited: 18/18
Weeks 100% Passed: 18/18
================================================================================

| Week | Passed Gates | Failed Gates | Quality Status | Speaking Part 2 | Vocab Source B | CLIL FK |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| W55 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 4.1 |
| W56 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 5.8 |
| W57 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 5 |
| W58 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 5.5 |
| W59 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 5.1 |
| W60 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.7 |
| W61 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 7 |
| W62 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 7.5 |
| W63 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.4 |
| W64 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.2 |
| W65 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.5 |
| W66 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.7 |
| W67 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.2 |
| W68 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.4 |
| W69 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.6 |
| W70 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 6.1 |
| W71 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 7.6 |
| W72 | 17/17 | 0 | ✅ 100% PASS | ✅ 10/10 compliant | ✅ 100% covered | 5.9 |
```
