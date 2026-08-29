# 🔍 GAMIFICATION PHASE 1A: FORENSIC ARCHITECTURAL AUDIT

**Audit Date:** 2026-08-28  
**Audit Standard:** Forensic Codebase & Mutation Path Investigation  
**Governing Role:** Investigator & Implementation Engineer (Antigravity) vs Strategic Reviewer (ChatGPT)  
**Baseline State:** W33 Golden Master Reference v1.0.0 (`GOLDEN FROZEN`)  

---

## A. EXECUTIVE VERDICT

### 🟡 **DESIGN WITH CONDITIONS**

**Executive Summary:**
1. **Learning Core Integrity:** The Learning and Assessment Core in W33 and the 4 Learning Zones is clean, deterministic, and free of direct hard dependencies on Game Layer rewards.
2. **Current Gamification State:** The existing codebase contains a **fragmented, un-gated gamification implementation**:
   - `addXP(amount)` is directly and unconditionally called inside 22+ individual UI components with ad-hoc hardcoded values (`10`, `20`, `25`, `50`, `60`, `100`).
   - `recordDailyStreak()` in `src/utils/progressReport.js` is triggered on **App Mount** (`App.jsx` line 363) upon simply opening the app, rather than completing actual learning tasks.
   - `userXP` has a default starting value of `1250` in `useUserStore.js` line 31 for dev testing.
   - No deduplication or idempotency transaction ledger exists for XP awards; re-submitting exercises awards duplicate XP indefinitely.
3. **Verdict Rationale:** The proposed decoupled Event Bus architecture (`Core -> Event Bus -> Game Layer`) is mathematically and architecturally sound and can be safely introduced **WITHOUT modifying Learning Core semantics**, provided the 6 specific Architectural Conditions in Section J are approved prior to implementation.

---

## B. CURRENT ARCHITECTURE MAP (ACTUAL REPOSITORY STATE)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             LEARNING RUNTIME (UI)                           │
│  (Cambridge Components: SVGLineMatcher, NotepadNoteCompleter, etc.)         │
└──────────────────────┬───────────────────────────────┬──────────────────────┘
                       │                               │
                       ▼                               ▼
  [Direct Task Completion]                    [Direct Uncontrolled Call]
  `completeQuest(weekId, questId)`            `userStore.addXP(50)`
                       │                               │
                       ▼                               ▼
┌──────────────────────────────────────────┐   ┌──────────────────────────────┐
│       useDailyQuestStore (Zustand)       │   │     useUserStore (Zustand)   │
│  - completedQuests: { w33: { qId: true } }│   │  - userXP: 1250 + amount     │
│  - dailyBonusClaimed: { w33_d1: true }   │   │  - progressCache: { ... }    │
└──────────────────────┬───────────────────┘   └───────────────┬──────────────┘
                       │                                       │
                       ▼                                       ▼
  localStorage ('engquest-daily-quests')       localStorage ('engquest-user-storage')
                       │                                       │
                       └───────────────────┬───────────────────┘
                                           │
                                           ▼ (Background Sync)
                       ┌───────────────────────────────────────┐
                       │     progressBackup.js (Triple Write)  │
                       │  - sessionStorage journal             │
                       │  - localStorage backups               │
                       │  - POST /api/progress                 │
                       └───────────────────────────────────────┘
```

---

## C. MUTATION GRAPH

### 1. XP Mutation Path
- **Declaration:** `src/stores/useUserStore.js` (line 37): `addXP: (amount) => set((state) => ({ userXP: (state.userXP || 0) + amount }))`
- **Callers (22+ direct ad-hoc calls):**
  - `WritingStudioHub.jsx` (line 76): `addXP(100)`
  - `Station2CheckMode.jsx` (line 110): `userStore.addXP(50)`
  - `ScienceDragDropLab.jsx` (line 172): `userStore.addXP(xpEarned)`
  - `FlashArena.jsx` (line 120): `userStore.addXP(xpEarned)`
  - `BarModelQuest.jsx` (line 170): `userStore.addXP(xpEarned)`
  - `SentenceBuilderBattle.jsx` (line 167): `userStore.addXP(xpEarned)`
  - `NotepadNoteCompleter.jsx` (line 132): `userStore.addXP(50)`
  - `DialogueAHCompleter.jsx` (line 108): `userStore.addXP(50)`
  - `InformationExchangeP2.jsx` (line 339): `userStore.addXP(50)`
  - `SVGColorAndWrite.jsx` (line 150): `userStore.addXP(50)`
  - `RWPart3ClozeWithTitle.jsx` (line 93): `userStore.addXP(50)`
  - `TextExtractionCompleter.jsx` (line 121): `userStore.addXP(50)`
  - `WordBankMatchingGrid.jsx` (line 90): `userStore.addXP(50)`
  - `AIDebateMode.jsx` (lines 138, 200): `userStore.addXP(50)`, `userStore.addXP(60)`
  - `PictureStoryContinuation.jsx` (line 98): `userStore.addXP(50)`
  - `FindDifferencesInteractive.jsx` (line 203): `userStore.addXP(50)`
  - `InlineTextClozeDropdown.jsx` (line 128): `userStore.addXP(50)`
  - `CLILExplorer.jsx` (lines 164, 217): `userStore.addXP(25)`, `userStore.addXP(10)`
  - `VisualMatchingAH.jsx` (line 78): `userStore.addXP(50)`
  - `PersonalQuestionsCompleter.jsx` (line 98): `userStore.addXP(50)`
  - `StoryWorldZone.jsx` (line 846): `userStore.addXP(20)`
  - `TodayQuestBar.jsx` (line 43): `addXP(DAILY_BONUS_XP)`
  - `QuestMap.jsx` (line 161): `addXP(DAILY_BONUS_XP)`

### 2. Quest & Task Completion Mutation Path
- **Declaration:** `src/stores/useDailyQuestStore.js` (lines 88–99): `completeQuest(weekId, questId)`
- **Task Storage:** `completedQuests: { 'w33': { 'gear1_webtoon': true, ... } }`
- **Station Storage:** `useUserStore.updateLocalProgress(weekId, stationId, { isCompleted, score })`

### 3. Streak Mutation Path
- **Declaration:** `src/utils/progressReport.js` (lines 149–161): `recordDailyStreak()`
- **Storage:** `localStorage.getItem('engquest_streak')` -> `{ days: number, lastDate: string }`
- **Caller:** `src/App.jsx` (line 363) inside root `useEffect` on route/week change.

### 4. Badge Mutation Path
- **Declaration:** `src/stores/useUserStore.js` (lines 352–371): `checkAndAwardBadges()`
- **Evaluation Engine:** `src/utils/scoringSystem.js` (lines 211–230): `getNewlyEarnedBadges(userData)`
- **Storage:** `useUserStore.earnedBadges` array.

---

## D. SOURCE-OF-TRUTH MATRIX

| Domain | Authoritative Store | Mutation Entrypoint | Persistence Mechanism | Idempotent? | Multi-Tab / Replay Risk |
|:---|:---|:---|:---|:---:|:---:|
| **1. Task Completion** | `useDailyQuestStore` (`completedQuests`) | `completeQuest(weekId, questId)` | `localStorage` (`'engquest-daily-quests'`) | **YES** (`[questId]: true`) | Low |
| **2. Station Progress & Score** | `useUserStore` (`progressCache`) | `updateLocalProgress(weekId, stationId, payload)` | `localStorage` (`'engquest-user-storage'`) + `progressBackup.js` | **YES** (Overwrites state) | Low |
| **3. Assessment Shields** | `useUserStore` (`progressCache[weekId][bossStation]`) | `updateLocalProgress(...)` | `localStorage` + server | **YES** (Overwrites state) | Low |
| **4. XP Balance** | `useUserStore` (`userXP`) | `addXP(amount)` | `localStorage` (`'engquest-user-storage'`) | ❌ **NO** (Accumulator without ledger) | **CRITICAL** (Duplicate XP on retry/refresh) |
| **5. Streak** | `localStorage` (`'engquest_streak'`) | `recordDailyStreak()` in `progressReport.js` | `localStorage` raw key | ⚠️ **PARTIAL** (Same day idempotent, but triggered on app open without learning) | **HIGH** (Bogus streaks on login without study) |
| **6. Badges** | `useUserStore` (`earnedBadges`) | `checkAndAwardBadges()` | `localStorage` (`'engquest-user-storage'`) | **YES** (`!currentBadges.includes(id)`) | Safe |
| **7. Levels / Rank** | Derived in UI | Derived from Collections / Star count | Dynamic computation | **YES** | Safe |
| **8. Shop Currency / Outfits** | `useUserStore` (`purchasedNovaItems`) | `buyNovaItem(item)` | `localStorage` (`'engquest-user-storage'`) | **YES** (`includes(item.id)` check) | Safe |
| **9. Offline Events** | `sessionStorage` (`'engquest_progress_journal'`) | `appendJournal(entry)` in `progressBackup.js` | `sessionStorage` + `localStorage` backups | **YES** (Deduplicates by `weekId_stationId`) | Safe |
| **10. Server Sync** | Express Backend (`/api/progress`) | `progressAPI.saveProgress` via `progressBackup.js` | PostgreSQL / JSONB on server | **YES** (Server merges JSONB) | Safe |

---

## E. PROPOSED EVENT CONTRACT AUDIT

| Proposed Event | Source Component | Authoritative Payload | Idempotency Key Evaluation | Replay & Multi-Tab Safety | Current Feasibility |
|:---|:---|:---|:---|:---|:---:|
| `LEARNING_TASK_COMPLETED` | Zone / TaskRunnerModal | `{ userId, weekNumber, taskId, score, maxScore, timestamp }` | **MUST BE DETERMINISTIC:** `${userId}_w${weekNumber}_${taskId}` | Safe if checked against an `awardedTransactions` set in store. | **100% FEASIBLE** |
| `DAILY_QUESTS_COMPLETED` | `useDailyQuestStore` | `{ userId, weekNumber, dayNumber, timestamp }` | `${userId}_w${weekNumber}_d${dayNumber}` | Already guarded by `dailyBonusClaimed[bonusKey]`. | **100% FEASIBLE** |
| `CAMBRIDGE_SHIELD_AWARDED` | `BossBattleZone` | `{ userId, weekNumber, shieldPart, shieldsEarned: 0..5, timestamp }` | `${userId}_w${weekNumber}_${shieldPart}` | Must track `highestShieldsAwarded` to allow delta-only XP. | **100% FEASIBLE** |
| `STREAK_DAY_LOGGED` | Gamification Event Bus | `{ userId, date: 'YYYY-MM-DD', activeTasksCount, timestamp }` | `${userId}_${calendarDateLocal}` | Safe; only increments when $\ge 1$ task completed on date. | **100% FEASIBLE** |
| `WEEK_COMPLETED` | Weekly Review Zone | `{ userId, weekNumber, totalShields, timestamp }` | `${userId}_w${weekNumber}_complete` | Safe; awarded once when `getWeekQuestCount() === 15`. | **100% FEASIBLE** |

---

## F. XP INFLATION THREAT MODEL

| Threat ID | Vulnerability Description | Severity | Concrete Code Evidence | Required Architectural Mitigation |
|:---|:---|:---:|:---|:---|
| **XP-THR-001** | **Un-gated Retry XP Accumulation:** Re-playing a practice task calls `userStore.addXP(50)` every time. | **CRITICAL** | `NotepadNoteCompleter.jsx:132`, `BarModelQuest.jsx:170` | Intercept all XP awards through `awardIdempotentXP(txKey, amount)` backed by an immutable transaction ledger. |
| **XP-THR-002** | **Ad-Hoc Hardcoded XP Values:** 22 components award arbitrary XP (10, 20, 25, 50, 60, 100). | **HIGH** | `WritingStudioHub.jsx:76` (+100 XP), `AIDebateMode.jsx:200` (+60 XP) | Deprecate component-level `addXP` calls; emit `LEARNING_TASK_COMPLETED` and let Game Engine look up canonical XP in `gamificationConfig.js`. |
| **XP-THR-003** | **Default Starter XP Balance:** New user state initializes with `userXP: 1250`. | **MEDIUM** | `useUserStore.js:31` (`userXP: 1250`) | Set production default `userXP: 0`. Isolate seed balance to dev-mode testing accounts only. |
| **XP-THR-004** | **Boss Shield Ping-Pong Exploitation:** Re-taking a Boss Shield from 5 -> 3 -> 5 could re-award 75 XP repeatedly. | **HIGH** | `BossBattleZone.jsx` | Track `highestShieldScore` per shield part; award delta only if `newShields > highestShieldScore`. |

---

## G. STREAK THREAT MODEL

| Threat ID | Vulnerability Description | Severity | Concrete Code Evidence | Required Architectural Mitigation |
|:---|:---|:---:|:---|:---|
| **STR-THR-001** | **App-Mount Bogus Streak:** Streak increments simply by opening the app without doing any coursework. | **HIGH** | `App.jsx:363` (`recordDailyStreak()` called inside `useEffect [weekId, currentUser]`) | Decouple streak logging from app mount. Move streak evaluation strictly to `LEARNING_TASK_COMPLETED` event handler. |
| **STR-THR-002** | **Timezone Rollover Discrepancy:** `new Date().toDateString()` uses local machine clock which can be manipulated. | **MEDIUM** | `progressReport.js:151` (`toDateString()`) | Use ISO date string format (`YYYY-MM-DD`) with monotonic client-date tracking. |
| **STR-THR-003** | **Streak Freeze Unsynced Consumption:** Streak freeze state is a simple boolean (`streakFreezeActive: false`) in localStorage. | **LOW** | `useUserStore.js:34` | Persist freeze inventory and record freeze usage date to prevent double consumption. |

---

## H. OFFLINE / SYNC READINESS

- **Classification:** **PARTIAL (Client-Authoritative with Resilient Offline Journal)**
- **Evidence:**
  1. `src/utils/progressBackup.js` maintains a robust triple-write layer (`sessionStorage` unsynced journal + `localStorage` station backups + background retry with exponential backoff).
  2. `src/services/api.js` has an automatic circuit breaker for offline / Cloudflare client-side operation.
  3. **Backend Scope:** The remote Express server (`/api/progress`) accepts station-level score/completion payloads. It does **NOT** maintain a distributed event-sourcing ledger.
  4. **Architectural Implication:** The Gamification Layer must be designed as a **Client-Side Authoritative Event & Transaction Engine** persisting in `localStorage` (via Zustand persist) and syncing core learning progress via the established `progressBackup.js` pipeline.

---

## I. ARCHITECTURAL CONTRADICTIONS IN CURRENT PROPOSALS

1. **Transaction Key Discrepancy:**
   - *Handoff Table A:* `${userId}_${weekNumber}_${taskId}_${firstCompletionTimestamp}`
   - *Handoff Table B:* `${userId}_w${weekNumber}_${taskId}`
   - *Forensic Resolution:* Table A's timestamp is non-deterministic across reloads. **Table B (`${userId}_w${weekNumber}_${taskId}`) MUST be the canonical transaction key.**
2. **First-Completion vs Repeat-Attempt Semantics:**
   - Practice Quests award XP **on first completion only**. Subsequent attempts update learning analytics and accuracy scores, but do **NOT** award base XP.
3. **430 XP Weekly Cap vs Component Callers:**
   - Currently, if all 22 components execute, a user earns > 800 XP in a single week.
   - Centralizing XP in `gamificationConfig.js` enforces the exact **430 XP weekly ceiling**:
     - 12 Practice Quests: 12 × 15 XP = 180 XP
     - 5 Daily Completion Bonuses: 5 × 25 XP = 125 XP
     - 3 Boss Castle Shields: 3 × (5 × 5 XP) = 75 XP
     - 1 Perfect Week Bonus: 50 XP
     - **Total Maximum:** Exactly **430 XP / week**.

---

## J. REQUIRED DECISIONS BEFORE IMPLEMENTATION

Prior to writing Phase 1 code, the following decisions must be reviewed and approved:

1. **Decision 1 (Deprecation of Component-Level `addXP`):**
   Do you approve replacing all direct `userStore.addXP(N)` calls inside the 22 UI components with an event emission `emitLearningEvent('LEARNING_TASK_COMPLETED', payload)`?
2. **Decision 2 (Transaction Ledger Storage):**
   Do you approve adding a `claimedTransactions: { [txKey]: { xpEarned, timestamp } }` map inside `useUserStore.js` (persisted in `localStorage`) to make all XP awards 100% idempotent?
3. **Decision 3 (Streak Trigger Relocation):**
   Do you approve removing `recordDailyStreak()` from `App.jsx` mount and relocating it into the Gamification Event Bus (triggered only upon quest completion)?
4. **Decision 4 (Dev Starting XP):**
   Do you approve setting default `userXP: 0` for fresh user profiles, with a dev-only seed button in the Teacher Panel?
5. **Decision 5 (Shield Delta Policy):**
   Do you approve the delta-only XP award formula for Boss Shield improvements: `(newShields - highestPreviousShields) * 15 XP`?

---

## K. DISCOVERED FINDINGS SUMMARY (DISCOVERED ONLY)

- `DISCOVERED`: **W34-ARCH-001** (`src/stores/useDailyQuestStore.js`): Hardcoded `DAILY_BONUS_XP = 25` in store and config.
- `DISCOVERED`: **W34-ARCH-002** (`src/stores/useUserStore.js`): `addXP` is an un-gated accumulator susceptible to retry inflation.
- `DISCOVERED`: **W34-ARCH-003** (`src/utils/progressReport.js` & `App.jsx`): Streak increments on app mount without coursework.
- `DISCOVERED`: **W34-ARCH-004** (`src/stores/useUserStore.js`): Default `userXP = 1250` in initial state.
- `DISCOVERED`: **22 Component Files**: Ad-hoc hardcoded `addXP(...)` calls bypass centralized economy.

---

## L. W33 REGRESSION STATUS

```text
========================================================================
🛡️  W33 GOLDEN FREEZE REGRESSION VERIFICATION:
========================================================================
  ✅ guard:freeze:w33 (SHA-256 Cryptographic Lock) → PASS (100% Locked)
  ✅ audit:golden:w33 (11/11 Automated Quality Gates) → PASS (Exit 0)
========================================================================
```
*Zero W33 protected files were modified during this forensic audit.*
