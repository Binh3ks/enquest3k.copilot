# 🏛️ ENGQUEST3K — GAMIFICATION PHASE 2A: CONTRACT & ARCHITECTURE AUDIT REPORT

**Audit Date:** 2026-08-29  
**Role Alignment:** Antigravity (Implementation Engineer & Investigator) | ChatGPT (Strategic QA / Architecture Reviewer Brain)  
**Governing Standard:** W33 Golden Learning & Assessment Standard v1.0.0 (Cryptographically Frozen)  
**Audit Stage:** READ-ONLY CONTRACT & ARCHITECTURE RECONNAISSANCE (0 production code modified)  

---

## 🛡️ 1. EXECUTIVE SUMMARY

Phase 2 focuses on the **Gamification UI & Domain Feature Layer**, consisting of three core features:
1. **Badges Engine & Visualizer** (Achievements, milestone unlock rules, reactive Event Bus integration).
2. **Mascot Shop & Word Treasury** (Nova cosmetics spending sink, SRS vocabulary collection browser).
3. **Class Co-op Milestone Visualizer** (Positive cohort goal visualization without toxic individual ranking).

### Core Architectural Invariants:
- **Learning Core Inviolability**: Gamification UI is strictly a downstream consumer of learning completion events. It has 0 write access to answer evaluation, Cambridge assessment scoring, CEFR grading, or quest validity.
- **Economic Soundness**: XP is earned exclusively through the 15 Daily Quests (355 Base XP), 5 Daily Pacing Bonuses (125 XP), 50 XP Perfect Week bonus, and Cambridge Shield improvement deltas. The Mascot Shop acts as an authorized **XP spending sink** and must never award XP.
- **Client-Side Trust Boundaries**: Local storage and Web Locks provide atomic tab safety for a single learner profile; Class Co-op progress is explicitly classified as a **Client-Side Presentation / Simulation** rather than an authoritative multi-tenant backend.

---

## 🏗️ 2. CURRENT ARCHITECTURAL TOPOLOGY

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LEARNING / ASSESSMENT CORE (AUTHORITATIVE)                │
│  - Evaluates student answers, Cambridge exam mechanics & CEFR criteria     │
│  - Dispatches quest completion inside Zone Orchestration Handlers           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼ (Dispatches Authoritative Event)
┌─────────────────────────────────────────────────────────────────────────────┐
│                      IMMUTABLE GAMIFICATION EVENT BUS                        │
│  - `gamificationEventBus.js` with deepFreeze and subscriber try/catch       │
│  - Events: LEARNING_TASK_COMPLETED, DAILY_QUESTS_COMPLETED,                 │
│            CAMBRIDGE_SHIELD_AWARDED, WEEK_COMPLETED                         │
└──────────────┬───────────────────────┬───────────────────────────┬──────────┘
               │                       │                           │
               ▼                       ▼                           ▼
┌───────────────────────────┐ ┌───────────────────┐ ┌─────────────────────────┐
│     USER XP STORE         │ │   BADGES ENGINE   │ │    WORD MEMORY BANK     │
│ - awardIdempotentXP       │ │ - Reactive event  │ │ - SRS Vocab Collection  │
│ - Web Locks protected     │ │   evaluation      │ │ - Word status & review  │
│ - Disk balance sync       │ │ - earnedBadges[]  │ │ - Read-only dictionary  │
└──────────────┬────────────┘ └────────┬──────────┘ └────────────┬────────────┘
               │                       │                         │
               └───────────────────────┼─────────────────────────┘
                                       │
                                       ▼ (Downstream Projections)
┌─────────────────────────────────────────────────────────────────────────────┐
│                       GAMIFICATION PRESENTATION UI                          │
│  - NovaMascotStore.jsx (Cosmetics spending sink)                            │
│  - BadgeDisplay.jsx / CollectionBoard.jsx (Visual achievements)            │
│  - WordTreasury.jsx (Vocabulary browser)                                    │
│  - ClassLeaderboardModal.jsx (Class Co-op Goal visualizer)                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📡 3. EVENT TOPOLOGY RELEVANT TO PHASE 2

| Event Name | Producer | Consumers | Payload Schema | Idempotent Consumer? |
| :--- | :--- | :--- | :--- | :---: |
| `LEARNING_TASK_COMPLETED` | `useDailyQuestStore.completeQuest` | `useUserStore` (XP & Streak), `badgeEngine` (Task Badges) | `{ userId, weekNumber, taskId, baseXP, timestamp }` | ✅ Yes (`tx_task_...`) |
| `DAILY_QUESTS_COMPLETED` | `useDailyQuestStore.completeQuest` | `useUserStore` (Daily XP), `badgeEngine` (Daily Badges) | `{ userId, weekNumber, dayNumber, timestamp }` | ✅ Yes (`tx_daily_...`) |
| `CAMBRIDGE_SHIELD_AWARDED`| `BossBattleZone.handleShieldEvaluation` | `useUserStore` (Shield Delta XP), `badgeEngine` (Exam Badges) | `{ userId, weekNumber, shieldPart, newShields, rawScore }`| ✅ Yes (`tx_shield_...`) |
| `WEEK_COMPLETED` | `useDailyQuestStore.completeQuest` | `useUserStore` (Perfect Week XP), `badgeEngine` (Week Badges) | `{ userId, weekNumber, timestamp }` | ✅ Yes (`tx_perfect_...`) |

---

## 🧮 4. AUTHORITATIVE XP MUTATION MATRIX

| Mutation Action | Method Location | Operation Direction | Amount / Source | Trigger Context | Mutex Guarded? |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **Task Completion** | `useUserStore.awardIdempotentXP` | **+XP (Credit)** | `TASK_BASE_XP_MAP[taskId]` (10–50 XP) | `LEARNING_TASK_COMPLETED` event | ✅ `engquest_xp_lock_${uid}` |
| **Daily Bonus** | `useUserStore.awardIdempotentXP` | **+XP (Credit)** | `DAILY_BONUS_XP` (25 XP) | `DAILY_QUESTS_COMPLETED` event | ✅ `engquest_xp_lock_${uid}` |
| **Shield Delta** | `useUserStore.awardShieldDeltaXP` | **+XP (Credit)** | `delta * 15 XP` (15–75 XP) | `CAMBRIDGE_SHIELD_AWARDED` event | ✅ `engquest_shield_lock_${uid}` |
| **Perfect Week** | `useUserStore.awardIdempotentXP` | **+XP (Credit)** | `PERFECT_WEEK_XP` (50 XP) | `WEEK_COMPLETED` event | ✅ `engquest_xp_lock_${uid}` |
| **Mascot Item Buy** | `useUserStore.buyNovaItem` | **-XP (Debit)** | `item.price` (200–800 XP) | User click in `NovaMascotStore` | ⚠️ **NEEDS LOCK (Phase 2B)** |
| **Dev Seed XP** | `useUserStore.seedDevXP` | **+XP (Credit)** | `amount` (Default 1250 XP) | Teacher testing panel only | ⚠️ Dev tool only |

---

## 🏆 5. BADGES ENGINE AUDIT

### Current State:
- **Data Location**: `src/data/badgeConfig.js` defines 10 legacy badges (`first_week`, `five_weeks`, `ten_weeks`, `perfect_week`, `star_collector`, `dedication`, `champion`, `collection_1`, `collection_2`, `collection_3`).
- **Store State**: `state.earnedBadges` (array of strings) stored in `useUserStore.js`.
- **Existing Limitation**: Badges were historically checked inside `useUserStore.checkAndAwardBadges()` using an outdated star calculation instead of reacting to authoritative events.

### Phase 2 Badge Contract Specification:

| Badge ID | Display Name | Category | Unlock Condition | Source Event | Idempotency Key |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `badge_first_quest` | **First Spark** | Milestone | Complete 1st learning quest | `LEARNING_TASK_COMPLETED` | `badge_first_quest` |
| `badge_first_week` | **Week Pioneer** | Milestone | Complete 15/15 quests of any week | `WEEK_COMPLETED` | `badge_first_week` |
| `badge_perfect_week` | **Perfectionist** | Mastery | Complete all 15 quests with 0 retries | `WEEK_COMPLETED` | `badge_perfect_week_w{N}` |
| `badge_streak_3` | **Streak Novice** | Habit | Maintain 3-day learning streak | `LEARNING_TASK_COMPLETED` | `badge_streak_3` |
| `badge_streak_7` | **Streak Master** | Habit | Maintain 7-day learning streak | `LEARNING_TASK_COMPLETED` | `badge_streak_7` |
| `badge_shield_5` | **Flyers Ace** | Cambridge | Earn 5 shields on any Cambridge Part | `CAMBRIDGE_SHIELD_AWARDED` | `badge_shield_5_{part}` |
| `badge_vocab_50` | **Word Hunter** | Vocab | Collect 50 words in Word Treasury | `WORD_BANK_UPDATED` | `badge_vocab_50` |

### Architectural Invariant for Badges:
> **Badges are purely prestige / visual recognitions. Badges do NOT award secondary XP to prevent economy inflation.**

---

## 🛍️ 6. MASCOT SHOP AUDIT

### Current State:
- **Component**: `src/components/mascot/NovaMascotStore.jsx`.
- **Store Method**: `useUserStore.buyNovaItem(item)` and `equipNovaItem(category, itemId)`.
- **Catalog**: 6 items (`crown`, `astronaut`, `headphones`, `cape`, `glasses`, `streak_freeze`).
- **State Fields**:
  - `purchasedNovaItems`: array of owned item IDs.
  - `equippedNovaGear`: `{ hat, glasses, accessory }`.
  - `streakFreezeActive`: boolean flag protecting against a missed calendar day.

### Identified Concurrency Gap (Phase 2B Requirement):
- `buyNovaItem` currently executes directly without `navigator.locks.request`.
- **Required Hardening**: Wrap `buyNovaItem` in `navigator.locks.request('engquest_xp_lock_${uid}', ...)` to ensure atomic balance verification and debit across multi-tab scenarios.

---

## 📖 7. WORD TREASURY AUDIT

### Current State:
- **Component**: `src/pages/WordTreasury.jsx`.
- **Storage Layer**: `src/utils/wordMemoryBank.js` (`localStorage.getItem('engquest_word_bank')`).
- **Engine**: `src/utils/srsEngine.js` (Spaced Repetition tracking: `new` $\to$ `learning` $\to$ `reviewing` $\to$ `mastered`).
- **Data Model**: `{ [word_id]: { word_id, word, week_number, status, correct_count, last_seen, next_review_date } }`.
- **Integration with Learning Core**: Words are populated when learners explore vocabulary in Day 1 / Day 2 quests.

### Architectural Invariant for Word Treasury:
> **Word Treasury is a read-only learner dictionary and SRS flashcard tool. It has zero authority over quest scores, syllabus answer keys, or CEFR requirements.**

---

## 🤝 8. CLASS CO-OP MILESTONE VISUALIZER AUDIT

### Current State:
- **Component**: `src/components/common/ClassLeaderboardModal.jsx`.
- **Pedagogical Alignment**: In compliance with primary project standards for Young Learners (7–12 years old), **toxic individual ranking / leaderboard zero-sum competition is prohibited**.
- **Visualizer Structure**:
  - Displays a shared **Class Co-op Target** (e.g. 1000 XP Weekly Class Goal).
  - Displays individual contribution without publicly shaming slower learners.
  - Features individual streak and personal badge milestones.

### Trust Boundary Declaration:
- In the current offline-first architecture, Class Co-op progress is a **Client-Side Simulation / Projection**.
- It does not represent an authoritative backend synchronized across multiple independent learner devices.

---

## 📊 9. STATE OWNERSHIP & PERSISTENCE MATRIX

| State Key | Owner Store / Module | Persistent? | Storage Backend | Per User? | Multi-Tab Safe? |
| :--- | :--- | :---: | :--- | :---: | :---: |
| `userXP` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ✅ Web Locks |
| `claimedTransactions` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ✅ Web Locks |
| `highestShieldScores` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ✅ Web Locks |
| `earnedBadges` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ⚠️ Needs Mutex |
| `purchasedNovaItems` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ⚠️ Needs Mutex |
| `equippedNovaGear` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ✅ In-memory sync |
| `streakFreezeActive` | `useUserStore` | **YES** | `localStorage` (`engquest-user-storage`) | **YES** (`[uid]`) | ✅ In-memory sync |
| `word_bank` | `wordMemoryBank.js` | **YES** | `localStorage` (`engquest_word_bank`) | ⚠️ Browser-global | ⚠️ Needs namespacing |
| `classCoopGoal` | `ClassLeaderboardModal` | **NO** | Derived in memory / presentation | **YES** | ✅ Derived |

---

## 🚫 10. LEARNING CORE ISOLATION CHECK

$$\text{Learning Content / Assessment Engine} \xrightarrow[\text{Completion Events}]{\text{One-Way Dispatch}} \text{Gamification Event Bus} \xrightarrow{\text{Read-Only Payload}} \text{Phase 2 UI}$$

### Strict Negative Rules:
1. Phase 2 components must **NEVER import from `src/data/weeks/`** directly to write or override content.
2. Phase 2 components must **NEVER call `useDailyQuestStore.completeQuest`** on behalf of the user.
3. Mascot gear or badges must **NEVER modify quiz scoring multipliers or Cambridge Shield grades**.

---

## 📋 11. SPEC GAP REGISTER (REQUIRING PRODUCT CONFIRMATION)

| Gap ID | Feature Area | Description of Ambiguity | Recommended Strategy |
| :--- | :--- | :--- | :--- |
| **SPEC-P2-001** | Badges | Should badges award bonus XP upon unlock? | **RECOMMEND NO**: Keep badges purely cosmetic to prevent inflating the 480 XP weekly schedule. |
| **SPEC-P2-002** | Mascot Shop | What happens if a learner equips an item on Tab A while buying on Tab B? | Wrap `buyNovaItem` in `navigator.locks.request` with disk balance check. |
| **SPEC-P2-003** | Word Treasury | `engquest_word_bank` is currently shared across all users on the same machine. | Namespace the word bank key by user ID (`engquest_word_bank_${uid}`). |
| **SPEC-P2-004** | Class Co-op | Should Class Co-op progress aggregate real classmate progress via Railway backend? | Mark as **Client Simulation** in Phase 2; schedule backend sync for Phase 3. |

---

## ⚠️ 12. RISK REGISTER

| Risk ID | Area | Finding / Risk | Severity | Proposed Mitigation |
| :--- | :--- | :--- | :---: | :--- |
| **RISK-P2-001** | Shop | `buyNovaItem` does not use Web Locks mutex | **P1** | Add `navigator.locks.request` critical section in `useUserStore.buyNovaItem`. |
| **RISK-P2-002** | Treasury | Un-namespaced `engquest_word_bank` localStorage key | **P2** | Namespace storage key by active learner ID. |
| **RISK-P2-003** | Badges | Ad-hoc legacy badge check in `scoringSystem.js` | **P2** | Replace with event-driven `badgeEngine.js` subscribing to Event Bus. |

---

## 🛣️ 13. PROPOSED PHASE 2 IMPLEMENTATION PHASING

### Phase 2B: Badges Engine & Reactive Visualizer
- Implement decoupled `src/services/badgeEngine.js` subscribing to Event Bus.
- Add badge unlock notifications (toast / popup animation).
- Update `BadgeDisplay.jsx` and `CollectionBoard.jsx` to consume reactive badge state.
- **Validation**: 8 unit & idempotency tests in `tests/gamification_badges.test.mjs`.

### Phase 2C: Mascot Shop Mutex Hardening & Word Treasury Namespacing
- Wrap `buyNovaItem` in Web Locks mutex (`engquest_xp_lock_${uid}`).
- Namespace `wordMemoryBank.js` storage by learner ID.
- Polish `NovaMascotStore.jsx` live preview and inventory management.
- **Validation**: 6 purchase concurrency & balance tests in `tests/gamification_shop.test.mjs`.

### Phase 2D: Class Co-op Milestone Visualizer Polish
- Refactor `ClassLeaderboardModal.jsx` to render polished cooperative milestone progress and individual milestones.
- Ensure 0 competitive ranking leaks.
- **Validation**: Visual regression & accessibility check.

---

## 🔒 14. PROTECTED FILES INVARIANT

The following files are **CRYPTOGRAPHICALLY PROTECTED** and must **NEVER BE MODIFIED** during Phase 2:
- `src/data/weeks/week_33/reading_hub.js`
- `src/data/weeks/week_33/listening_hub.js`
- `src/data/weeks/week_33/writing_hub.js`
- `src/data/weeks/week_33/speaking_hub.js`
- `src/data/weeks/week_33/skill_practice_hub.js`
- `src/data/weeks/week_33/vocab.js`
- `docs/GATE15_SPEC_W33.json`

---

## 🏁 15. CONCLUSION & RECOMMENDATION

Phase 2A reconnaissance is complete. The contract and architecture boundaries are clear, robust, and safe.
- **Production Code Modified**: `NO` (0 modifications during Phase 2A audit).
- **Recommendation**: Strategic QA review and approval of the Phase 2 contract, followed by authorized implementation of **Phase 2B (Badges Engine & Reactive Visualizer)**.
