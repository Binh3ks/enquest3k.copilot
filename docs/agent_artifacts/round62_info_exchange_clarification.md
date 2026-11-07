# ARCHITECTURAL CLARIFICATION: Speaking Hub Info Exchange Design (Round 62)

## I. EXECUTIVE SUMMARY & CONFIRMATION

In response to the clarifying directive in Round 62:
1. **Intended Solo AI-Tutor Interaction Design:** 
   The pairing of two related yet distinct character scenarios in `info_exchange_cards` (e.g. W35: Maya's Museum Visit vs Lucas's Birthday Party; W38: Peregrine Falcons vs Red Kangaroos; W78: Mid-Autumn Festival vs Dia de los Muertos; W125: Julian's Essay Architecture vs Claire's Empirical Study) is **100% INTENTIONAL** and matches the Cambridge Speaking Part 2 examination protocol adapted for a solo learner interacting with the AI examiner ("Nova").
2. **UI Data Consumption & Redundancy Elimination:**
   The live UI components (`src/components/cambridge/InformationExchangeP2.jsx` and `src/modules/zones/InfoExchangeZone.jsx`) strictly and exclusively consume `table_a` and `table_b`. The legacy sub-objects `card_a` and `card_b` were never accessed by runtime code. In accordance with the Round 62 instruction, `card_a` and `card_b` have been permanently dropped from `generate_giaidoan2_content.mjs` and all 4 merged weeks to eliminate dead data.

---

## II. PEDAGOGICAL & ARCHITECTURAL MECHANICS

### 1. The Cambridge Speaking Part 2 Examination Protocol
In the official Cambridge Young Learners English (YLE Flyers) and Cambridge PET Speaking Part 2 examinations:
- The candidate does NOT engage in a two-way peer dialogue where two students share identical data.
- Instead, the examination consists of two structured interaction rounds between the Candidate and the Examiner:
  - **Round 1 (Candidate Answers):** The candidate is handed an Information Card with factual data and answers questions posed by the Examiner.
  - **Round 2 (Candidate Asks):** The candidate is handed a Question Card containing prompt cues (`Where`, `When`, `What`, `Who`, `How`) and must formulate grammatically accurate inquiry questions to elicit information held exclusively by the Examiner.

### 2. Solo Learner Adaptation with AI Partner "Nova"
In EngQuest3K, the learner completes the quest individually. The interactive component (`InformationExchangeP2.jsx` / `InfoExchangeZone.jsx`) establishes a 2-phase conversational state machine:

```
[IDLE]
  │
  ▼ handleStartExam()
[PHASE 1: table_b — Examiner Nova Asks, Student Answers]
  • Nova: "I don't know anything about [Character B], but you do. I'm going to ask you some questions."
  • Student inspects Table B (their Information Card with known facts).
  • Nova prompts: nova_question (e.g., "Where was Lucas's birthday party held?")
  • Student speaks into microphone; speechSyntaxEvaluator grades against acceptable_answers[].
  │
  ▼ startPhase2()
[PHASE 2: table_a — Student Asks, Examiner Nova Answers]
  • Nova: "Now, you don't know anything about [Character A], so you ask me some questions."
  • Student inspects Table A (their Question Card with prompt cues: "where / Maya go?").
  • Student speaks question into microphone (e.g., "Where did Maya go on Saturday morning?").
  • Evaluator grades against acceptable_questions[].
  • Nova responds with factual answer: nova_reply ("Maya went to the Discovery Science Museum...").
  │
  ▼ onComplete()
[COMPLETED: +50 XP & Speaking Shield Awarded]
```

### 3. Why the Scenarios Must Differ (Authentic Information Gap)
If Table A and Table B shared the exact same scenario and data fields:
- The student would already know all the facts about Character A before asking Nova.
- This would violate the communicative principle of an **information gap** (the student would be roleplaying asking for information they already possess on their screen).
- By providing two distinct scenarios unified by the weekly theme:
  - Table B tests **factual comprehension & responsive speech delivery**.
  - Table A tests **syntactic question-formation & active inquiry**.
  - Neither party has prior knowledge of the other's card, producing an authentic communicative purpose.

This matches the precedent established in the frozen Golden Standards:
- **Week 33 (Golden Master):** Table A = "Tom's Accident" (Ask about Tom); Table B = "Jake's First Aid Action" (Answer about Jake).
- **Week 34 (Golden Master):** Table A = "Milo the Mouse's Home" (Ask about Milo); Table B = "Leo the Lion's Home" (Answer about Leo).

---

## III. DATA SCHEMA CLEANUP & RESOLUTION

### 1. Codebase Audit of `card_a` / `card_b` vs `table_a` / `table_b`
A comprehensive scan of `src/` confirmed:
- `InformationExchangeP2.jsx:16`: `if (raw.table_a && raw.table_b) return raw;`
- `InformationExchangeP2.jsx:98`: `const missingFieldsA = data.table_a.fields.filter(f => f.is_missing);`
- `InformationExchangeP2.jsx:99`: `const tableBFields = data.table_b.fields;`
- `InfoExchangeZone.jsx:61-62`: `const tableA = infoExData?.table_a; const tableB = infoExData?.table_b;`
- `card_a` and `card_b` were never referenced or rendered by any component in the entire frontend repository.

### 2. Actions Taken
- Removed all `card_a` and `card_b` blocks from `scripts/generate_giaidoan2_content.mjs`.
- Regenerated all staged and merged files for W35, W38, W78, W125.
- `info_exchange_cards` now cleanly contains only `table_a` and `table_b` across all authored weeks, matching W33 schema byte-for-byte.
