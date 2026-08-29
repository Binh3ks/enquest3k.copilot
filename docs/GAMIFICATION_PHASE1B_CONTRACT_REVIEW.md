# 📜 GAMIFICATION PHASE 1B: CONTRACT FORENSIC REVIEW & DECISION GATE

**Review Date:** 2026-08-28  
**Audit Standard:** Contract Forensic Review & Architecture Decision Gate  
**Governing Roles:** Investigator & Implementation Engineer (Antigravity) vs Strategic Reviewer / QA Brain (ChatGPT)  
**Baseline State:** W33 Golden Master Reference v1.0.0 (`GOLDEN FROZEN`)  

---

## A. ARCHITECTURE VERDICT

### 🟡 **READY WITH CONDITIONS**

**Executive Summary:**
1. **Learning / Assessment Core Inviolability:** The architectural boundary between Learning Core and Game Layer is strictly validated. No gamification logic will have write access to answer keys, scoring algorithms, CEFR rules, or Cambridge assessment mechanics.
2. **Resolution of Ambiguities:**
   - **Event Authority:** UI sub-components must NOT emit events directly. Authoritative learning events MUST originate from Zone Orchestration Handlers (where completion is validated and `completeQuest` is called).
   - **Idempotency Multi-Key Architecture:** Separated `attemptId`, `completionId`, `xpTransactionId`, and `shieldScoreId`.
   - **Shield / XP Ceiling Contradiction:** Discovered that the "430 XP ceiling" in the handoff was an un-reconciled theoretical proposal. Reconciled with `src/config/questSchedule.js` (355 Base XP + 125 Daily Bonus = 480 Max Standard XP).
   - **Offline Window:** "72-hour offline window" is classified as a `DESIGN PROPOSAL`. Existing repository code supports 24-hour window via `progressReport.js`.
3. **Condition for Phase 1C:** Implementation may proceed only after approving the 4 formal contracts defined in Sections C, D, E, and F below.

---

## B. FINDING LEDGER

| ID | Title | Discovered Evidence | Risk | Decision | Required Action | Status |
|:---|:---|:---|:---:|:---:|:---|:---:|
| **W34-CON-001** | **UI Button Event Fabrication** | 22 components call `addXP` on local click without zone verification | **HIGH** | `ACCEPT WITH CONDITION` | Move event emission to Zone Orchestration Handlers. | `DISCOVERED` |
| **W34-CON-002** | **XP / Shield Ceiling Contradiction** | Proposal 430 XP vs `questSchedule.js` 480 XP vs Rotary 4 parts | **MEDIUM** | `ACCEPT WITH CONDITION` | Establish canonical Weekly XP Invariant matching `questSchedule.js`. | `DISCOVERED` |
| **W34-CON-003** | **Un-namespaced Transaction Ledger** | Global `claimedTransactions` in localStorage collides on account switch | **HIGH** | `ACCEPT WITH CONDITION` | Namespace ledger by `userId`: `transactions[userId][txKey]`. | `DISCOVERED` |
| **W34-CON-004** | **Unverified 72h Offline Policy** | `progressReport.js:140` supports 24h only; 72h is un-implemented | **LOW** | `REJECT (REVERT TO 24H)` | Keep 24h local calendar day rule until backend timestamp server exists. | `DISCOVERED` |
| **W34-CON-005** | **App-Mount Streak Inflation** | `App.jsx:363` calls `recordDailyStreak()` on mount without study | **HIGH** | `ACCEPT` | Remove from `App.jsx`; trigger on `LEARNING_TASK_COMPLETED`. | `DISCOVERED` |
| **W34-CON-006** | **Dev Starter Balance (1250 XP)** | `useUserStore.js:31` sets default `userXP: 1250` | **MEDIUM** | `ACCEPT` | Set default `userXP: 0`; isolate seed balance to Teacher Panel. | `DISCOVERED` |

---

## C. AUTHORITATIVE EVENT CONTRACT

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LEARNING / ASSESSMENT CORE (AUTHORITATIVE)                │
│  - Evaluates student input against canonical answer keys                   │
│  - Calculates score (0..100) and Cambridge Shields (0..5)                   │
│  - Calls `completeQuest(weekId, questId)` in Zone Orchestration Handler     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ (Emits Normalized Event)
┌─────────────────────────────────────────────────────────────────────────────┐
│                       IMMUTABLE LEARNING EVENT BUS                          │
│  `emitLearningEvent(EVENT_TYPE, payload)`                                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ (Read-Only Consumer)
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GAME / MOTIVATION LAYER                            │
│  - Checks `claimedTransactions[userId][txKey]`                             │
│  - Awards idempotent XP to `userXP`                                         │
│  - Evaluates streak increment                                              │
│  - Checks badge unlock conditions                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Event Specifications:

#### 1. `LEARNING_TASK_COMPLETED`
- **Authoritative Source:** Zone Orchestration Handlers (`StoryWorldZone`, `BattleArenaZone`, `CreatorStudioZone`, `BossBattleZone`).
- **Trigger Point:** Called immediately after validating that the task's completion criteria are met.
- **Payload:**
  ```json
  {
    "userId": "user_owner",
    "weekNumber": 33,
    "taskId": "gear3_retell",
    "score": 95,
    "maxScore": 100,
    "timeSpentSec": 180,
    "timestamp": "2026-08-28T23:15:00.000Z"
  }
  ```
- **Transaction Identity:** `${userId}_w${weekNumber}_${taskId}`
- **Idempotency Semantics:** Awards Base XP on first completion only. Subsequent attempts update score analytics in `progressCache` but award 0 new Base XP.

#### 2. `DAILY_QUESTS_COMPLETED`
- **Authoritative Source:** `useDailyQuestStore.js` (`claimDailyBonus`).
- **Trigger Point:** When all 3 daily quests for Day $N$ are completed.
- **Payload:** `{ userId, weekNumber, dayNumber, timestamp }`
- **Transaction Identity:** `${userId}_w${weekNumber}_d${dayNumber}`
- **Idempotency Semantics:** Awards +25 Daily Bonus XP exactly once per day per week.

#### 3. `CAMBRIDGE_SHIELD_AWARDED`
- **Authoritative Source:** `BossBattleZone.jsx` (`handlePartComplete`).
- **Trigger Point:** When an official Cambridge assessment part is submitted and graded.
- **Payload:** `{ userId, weekNumber, shieldPart, shieldsEarned, rawScore, timestamp }`
- **Transaction Identity:** `${userId}_w${weekNumber}_${shieldPart}`
- **Idempotency Semantics:** Delta-only award: `(shieldsEarned - highestPreviousShields) * SHIELD_UNIT_XP`.

---

## D. CANONICAL XP & CEILING CONTRACT

### Reconciled Weekly XP Schedule (Matching `src/config/questSchedule.js`):

| Category | Tasks / Rules | XP per Unit | Maximum Earnable Weekly XP |
|:---|:---|:---:|:---:|
| **Day 1 (Story World)** | `gear1` (0), `gear2` (0), `gear3_retell` (50) | Config | **50 XP** |
| **Day 2 (Knowledge Lab)**| `gear4` (0), `science_lab` (50), `science_report` (50) | Config | **100 XP** |
| **Day 3 (Battle Arena)** | `word_blitz` (45), `sentence_smash` (50), `math_quest` (40) | Config | **135 XP** |
| **Day 4 (Creator Studio)**| `story_writer` (50), `broadcast` (0), `info_exchange` (20) | Config | **70 XP** |
| **Day 5 (Boss Castle)** | 3 Quests: `boss_listening` (0), `boss_reading` (0), `review` (0) | 0 Base | **0 XP (Base)** |
| **Subtotal Practice Quests** | 12 Practice Quests in `QUEST_SCHEDULE` | — | **355 XP** |
| **Daily Completion Bonus** | 5 Days × 25 XP (`DAILY_BONUS_XP`) | 25 XP / day | **125 XP** |
| **Weekly Total Standard Cap** | **All 15 Quests Completed** | — | **480 XP / week** |

*Formal Invariant:*
$$\text{Max Weekly Standard XP} = \sum_{q=1}^{15} \text{BaseXP}(q) + 5 \times \text{DAILY\_BONUS\_XP} = 355 + 125 = \mathbf{480\text{ XP}}$$

---

## E. STREAK CONTRACT

1. **Definition of a Learning Day:** A calendar date (in the student's local timezone) where at least ONE `LEARNING_TASK_COMPLETED` event was authoritatively emitted.
2. **Consecutive Day Progression:**
   - Same day: Streak count unchanged (`newDays = prevDays`).
   - Exactly next day (`lastDate === yesterday`): Streak increments (`newDays = prevDays + 1`).
   - Missed 1 day (`lastDate === twoDaysAgo`):
     - If `streakFreezeActive === true`: Freeze is consumed, `streakFreezeActive` set to `false`, streak preserved (`newDays = prevDays`).
     - If `streakFreezeActive === false`: Streak resets (`newDays = 1`).
   - Missed $\ge 2$ days: Streak resets (`newDays = 1`).
3. **Prohibition:** Merely opening the app, navigating pages, or launching modals without completing a task MUST NOT trigger streak logging.

---

## F. PERSISTENCE & NAMESPACING CONTRACT

1. **Client Storage Partitioning (`localStorage`):**
   ```json
   {
     "engquest-user-storage": {
       "state": {
         "currentUser": { "id": "user_owner", "role": "owner" },
         "userXP": 0,
         "claimedTransactions": {
           "user_owner": {
             "user_owner_w33_gear3_retell": { "xp": 50, "ts": "2026-08-28T23:15:00Z" },
             "user_owner_w33_d1": { "xp": 25, "ts": "2026-08-28T23:16:00Z" }
           }
         }
       }
     }
   }
   ```
2. **Multi-Tab Concurrency Guard:** Prior to writing an XP award, `awardIdempotentXP` performs a synchronous read of raw `localStorage` to guard against race conditions between concurrent tabs.
3. **Account Isolation:** On logout or account switch, `clearProgressCache` resets in-memory active session state, ensuring user A's claimed transactions cannot contaminate user B.

---

## G. REPOSITORY-WIDE INVENTORY OF XP MUTATION PATHS

| File | Line | Trigger Event | XP Amount | Learning Authority? | Duplicate Risk |
|:---|:---:|:---|:---:|:---:|:---:|
| `useUserStore.js` | 37 | `addXP(amount)` declaration | Variable | Store Setter | 🚨 Un-gated |
| `TodayQuestBar.jsx` | 43 | Click "Claim Bonus" button | 25 (`DAILY_BONUS_XP`) | `useDailyQuestStore` | Safe (`dailyBonusClaimed`) |
| `QuestMap.jsx` | 161 | Click "Claim Bonus" button | 25 (`DAILY_BONUS_XP`) | `useDailyQuestStore` | Safe (`dailyBonusClaimed`) |
| `WritingStudioHub.jsx` | 76 | Submit Story Writing | 100 | Component | 🚨 High (Un-gated) |
| `Station2CheckMode.jsx` | 110 | Submit Station 2 Check | 50 | Component | 🚨 High (Un-gated) |
| `ScienceDragDropLab.jsx`| 172 | Submit Science Lab | 50 | Component | 🚨 High (Un-gated) |
| `FlashArena.jsx` | 120 | Submit Word Blitz | 45 | Component | 🚨 High (Un-gated) |
| `BarModelQuest.jsx` | 170 | Submit Singapore Math | 40 | Component | 🚨 High (Un-gated) |
| `SentenceBuilderBattle.jsx`| 167| Submit Grammar Duel | 50 | Component | 🚨 High (Un-gated) |
| `NotepadNoteCompleter.jsx` | 132| Submit Note Completer | 50 | Component | 🚨 High (Un-gated) |
| `DialogueAHCompleter.jsx` | 108| Submit Dialogue Completer | 50 | Component | 🚨 High (Un-gated) |
| `InformationExchangeP2.jsx`| 339| Submit Info Exchange | 50 | Component | 🚨 High (Un-gated) |
| `SVGColorAndWrite.jsx` | 150| Submit SVG Color | 50 | Component | 🚨 High (Un-gated) |
| `RWPart3ClozeWithTitle.jsx`| 93 | Submit Cloze | 50 | Component | 🚨 High (Un-gated) |
| `TextExtractionCompleter.jsx`| 121| Submit Text Extraction | 50 | Component | 🚨 High (Un-gated) |
| `WordBankMatchingGrid.jsx` | 90 | Submit Word Bank Match | 50 | Component | 🚨 High (Un-gated) |
| `AIDebateMode.jsx` | 138, 200| Debate round complete | 50, 60 | Component | 🚨 High (Un-gated) |
| `PictureStoryContinuation.jsx`| 98| Submit Picture Story | 50 | Component | 🚨 High (Un-gated) |
| `FindDifferencesInteractive.jsx`| 203| Submit Find Differences | 50 | Component | 🚨 High (Un-gated) |
| `InlineTextClozeDropdown.jsx`| 128| Submit Inline Cloze | 50 | Component | 🚨 High (Un-gated) |
| `CLILExplorer.jsx` | 164, 217| Step completion | 25, 10 | Component | 🚨 High (Un-gated) |
| `VisualMatchingAH.jsx` | 78 | Submit Visual Match | 50 | Component | 🚨 High (Un-gated) |
| `PersonalQuestionsCompleter.jsx`| 98| Submit Personal Qs | 50 | Component | 🚨 High (Un-gated) |
| `StoryWorldZone.jsx` | 846 | Gear step complete | 20 | Zone | 🚨 High (Un-gated) |

---

## H. W33 GOLDEN FREEZE VERIFICATION

```bash
npm run guard:freeze:w33
```
- **Result:** `✅ [LOCKED] 100% OF PROTECTED FILES LOCKED (Exit 0)`.
- Zero lines of W33 pedagogical or assessment content were modified.
