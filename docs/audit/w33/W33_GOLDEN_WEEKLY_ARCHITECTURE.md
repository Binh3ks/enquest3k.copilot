# 🏛️ ENGQUEST3K — MASTER GOLDEN WEEKLY ARCHITECTURE

**Document Reference**: `docs/W33_GOLDEN_WEEKLY_ARCHITECTURE.md`  
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Effective Date**: 2026-08-29  
**Status**: 🟢 **CANONICAL GOLDEN ARCHITECTURE**

---

## 1. Fundamental System Invariants

### Invariant 1: 5 Quests = 5 Days Structure
$$\mathbf{ONE \; WEEK} = \mathbf{FIVE \; QUESTS} = \mathbf{FIVE \; DAYS}$$

```
WEEKLY HIERARCHY:
WEEK
 ├── QUEST 1 / DAY 1 : Story World (Learning — CLIL + Cambridge-aligned practice)
 ├── QUEST 2 / DAY 2 : Knowledge Lab (Learning — CLIL + Cambridge-aligned practice)
 ├── QUEST 3 / DAY 3 : Battle Arena (Learning — Gamified practice drills)
 ├── QUEST 4 / DAY 4 : Creator Studio (Learning — Creative production & dialogue practice)
 └── QUEST 5 / DAY 5 : Boss Castle (Summative Assessment — Exact Cambridge Flyers format)
```

### Invariant 2: Learning vs Assessment Separation
- **Quests 1–4 (Days 1–4)**: **Formative Learning & Scaffolded Practice**.
  - Uses Cambridge-aligned skills, vocabulary, and grammar.
  - Features 1-tap word pills, sentence frames, unlimited attempts, hints, and feedback.
  - **MUST NOT** be represented as rigid Cambridge exam tests.
- **Quest 5 (Day 5 - Boss Castle)**: **Summative Assessment**.
  - Uses **exact Cambridge A2 Flyers exam mechanics and strict interaction contracts**.
  - Evaluates authentic performance across Listening, Reading & Writing, and Speaking.

### Invariant 3: 16 Cambridge Parts vs 15 Shields
$$\mathbf{16 \; Cambridge \; Parts} \quad \neq \quad \mathbf{15 \; Maximum \; Shield \; Score}$$
- **16 Cambridge Parts**: Atomic exam tasks (5 Listening, 7 Reading & Writing, 4 Speaking).
- **15 Paper Shields**: Cambridge Paper performance scores (max 5 Listening + max 5 R&W + max 5 Speaking = max 15 Total).
- Part completion count $\ne$ Shield score. Shield scores are computed at the Paper level.

---

## 2. Master 4-Week Rotary Schedule (W33–W36) + Full Mock (W37)

All 16 Cambridge Parts are collectively evaluated across the 4 weekly rotations (4 parts/week $\times$ 4 weeks = 16 parts total):

| Cycle | Primary Week | Cambridge Parts Scheduled | Quest 1 (`boss_listening`) | Quest 2 (`boss_reading`) | Quest 3 (`weekly_review`) | Total Parts |
| :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **Cycle 1** | **W33** | **L1, L2, R1, S1** | `list_p1` (Draw Lines)<br>`list_p2` (Note Completion) | `rw_p1` (Word Bank Match) | `spk_p1` (Find Differences) | **4** |
| **Cycle 2** | **W34** | **L3, R2, R3, S2** | `list_p3` (Match A–H) | `rw_p2` (Dialogue A–H)<br>`rw_p3` (Story Cloze) | `spk_p2` (Info Exchange) | **4** |
| **Cycle 3** | **W35** | **L4, R4, R5, S3** | `list_p4` (3-Pic Quiz) | `rw_p4` (Text Cloze)<br>`rw_p5` (Story Detective) | `spk_p3` (Picture Story) | **4** |
| **Cycle 4** | **W36** | **L5, R6, R7, S4** | `list_p5` (Colour & Write) | `rw_p6` (Open Cloze)<br>`rw_p7` (Story Writing) | `spk_p4` (Personal Questions) | **4** |
| **Cycle 0 / 5**| **W37** | **ALL 16 PARTS** | `list_p1` – `list_p5` (All 5) | `rw_p1` – `rw_p7` (All 7) | `spk_p1` – `spk_p4` (All 4) | **16** |

---

## 3. Day 5 Routing Invariants & Zero-Collision Contract

1. **Route `boss_listening`** (`/week/:weekId/task/boss_listening`):
   - **Contract**: Cambridge Listening Paper ONLY.
   - **Allowed Components**: `SVGLineMatcher` (L1), `NotepadNoteCompleter` (L2), `VisualMatchingAH` (L3), `MultipleChoice3Pic` (L4), `SVGColorAndWrite` (L5).
   - **Strict Negative Assertion**: NEVER mounts Reading or Speaking components.

2. **Route `boss_reading`** (`/week/:weekId/task/boss_reading`):
   - **Contract**: Cambridge Reading & Writing Paper ONLY.
   - **Allowed Components**: `WordBankMatchingGrid` (R1), `DialogueAHCompleter` (R2), `RWPart3ClozeWithTitle` (R3), `InlineTextClozeDropdown` (R4), `TextExtractionCompleter` (R5), `OpenClozeCompleter` (R6), `StoryWriting` (R7).
   - **Strict Negative Assertion**: NEVER mounts Listening or Speaking components.

3. **Route `weekly_review`** (`/week/:weekId/task/weekly_review`):
   - **Contract**: Cambridge Speaking Paper & 15-Shield Passport Ceremony ONLY.
   - **Allowed Components**: `FindDifferencesInteractive` (S1), `InformationExchangeP2` (S2), `PictureStoryContinuation` (S3), `PersonalQuestionsCompleter` (S4).
   - **Strict Negative Assertion**: NEVER mounts Listening or Reading components.

4. **Zero Index-Derived Identity**:
   - Assessment identity is strictly derived from explicit `{ partId, questId }` mapping via `CAMBRIDGE_PART_REGISTRY`, NEVER from array indexes.
