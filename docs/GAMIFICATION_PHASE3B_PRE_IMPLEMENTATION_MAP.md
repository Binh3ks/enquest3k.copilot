# 🗺️ GAMIFICATION PHASE 3B — PRE-IMPLEMENTATION MAP

**Date:** 2026-08-29  
**Role Alignment:** Antigravity (Implementation Engineer & Codebase Investigator) | ChatGPT (Strategic QA Brain)  
**Governing Standard:** W33 Golden Learning & Assessment Standard v1.0.0 (Cryptographically Frozen)  
**Scope:** Arcade & Active Focus Heartbeat Hardening (Phase 3B)  

---

## 1. CURRENT ARCADE STATE MODEL

`src/stores/useArcadeStore.js` manages:
- `studySeconds`: Number (Active study seconds accumulated today).
- `playEnergySeconds`: Number (Arcade play energy seconds, starting at 180s = 3m).
- `lastActiveTimestamp`: Number (Epoch ms of last active input).
- `dailyDate`: String (`new Date().toDateString()` for midnight reset).
- `rewardedMilestones`: Array (`[1800, 2700, 3600]` for study milestone bonuses).
- `isArcadeOpen`: Boolean.
- `showBreakPrompt`: Boolean.
- `breakPromptDismissedCycle`: Boolean.
- `activeGameId`: String (`'bubble_pop'`, etc.).
- `highScores`: Object (`{ gameId: number }`).
- `bestReactionTimes`: Object (`{ gameId: number }`).
- `bestSpeedrunTimes`: Object (`{ gameId: number }`).
- `sfxEnabled`: Boolean (Default `true`).
- `bgmEnabled`: Boolean (Default `true`).

---

## 2. PERSISTENCE KEY & USER IDENTITY SOURCE

- **Current Key**: Static `'engquest_arcade_store_v1'` (Un-namespaced).
- **Target Key**: Namespaced `'engquest_arcade_store_${uid}'`.
- **User Identity Source**:
  - `useUserStore.getState().currentUser?.id` or `currentUser?.username`.
  - Fallback: `'default'`.
- **Migration Policy**:
  - If `engquest_arcade_store_${uid}` does not exist, check if legacy `'engquest_arcade_store_v1'` exists on disk.
  - If present, migrate the legacy state to `engquest_arcade_store_${uid}` and retain it.

---

## 3. INITIALIZATION & HYDRATION FLOW

```text
App Mount / User Login
  ↓
Resolve active learner ID (`uid = getActiveUserId()`)
  ↓
Read `engquest_arcade_store_${uid}` (or migrate from legacy `engquest_arcade_store_v1`)
  ↓
Hydrate `useArcadeStore` with learner-specific state
  ↓
User Switch / Logout
  ↓
Persist current state to `engquest_arcade_store_${previousUid}`
  ↓
Load `engquest_arcade_store_${newUid}` (or blank starting state: 0 study seconds, 180s energy)
```

---

## 4. ACTIVE HEARTBEAT & AFK BEHAVIOR

- **Input Triggers**: User interactions (`click`, `keydown` in `TaskScreen.jsx` or game screens).
- **Heartbeat Math**:
  - `delta = Math.min(10, Math.max(1, Math.round((now - prev) / 1000)))` (Delta cap $\le 10$s).
  - If `now - prev > 45000` (45s AFK idle period), elapsed time is NOT added to `studySeconds`. Only `lastActiveTimestamp` is updated to `now`.
  - If `dailyDate !== todayStr` (Day boundary), daily counters (`studySeconds`, `rewardedMilestones`) reset to `0` / `[]`.

---

## 5. BREAK THRESHOLD & MILESTONE CONTRACT

- **Focus Cycle Thresholds**:
  - Grade 1 (W01–W10): **600s** (10 mins).
  - Grade 2 (W11–W20): **720s** (12 mins).
  - Grade 3 (W21–W32): **900s** (15 mins).
  - Grade 4+ (W33+): **1080s** (18 mins).
- **Break Prompt**:
  - Fires when `studySeconds >= focusReq && !breakPromptDismissedCycle && !isArcadeOpen`.
  - Dismissal via `dismissBreakPrompt()` sets `breakPromptDismissedCycle = true` until cycle completion.
- **Daily Cumulative Study Rewards**:
  - 30 mins (1800s) study $\rightarrow$ `+300s` (5m) play energy.
  - 45 mins (2700s) study $\rightarrow$ `+300s` (5m) play energy.
  - 60 mins (3600s) study $\rightarrow$ `+300s` (5m) play energy.

---

## 6. GAME UNLOCK CONTRACT (`SPEC-P3-001`)

- **Deterministic Rule**: Game unlock is evaluated strictly by `weekNumber >= minWeek` from `ARCADE_GAMES` catalog:
  - Game 1 (`bubble_pop`): W01+
  - Game 2 (`meteor_smasher`): W11+
  - Game 3 (`physics_drift`): W21+
  - Game 4 (`chunk_catapult`): W31+
  - Game 5 (`neon_rider`): W41+
  - Game 6 (`castle_defense`): W51+
  - Game 7 (`lightning_connect`): W61+
  - Game 8 (`potion_lab`): W71+
  - Game 9 (`temple_runner`): W81+
  - Game 10 (`galaxy_orbit`): W91+
  - Game 11 (`dragon_duel`): W101+
  - Game 12 (`grand_arena`): W111+
- **Zero XP Invariant**: Unlock evaluation performs zero XP awards or mutations.

---

## 7. PROPOSED MINIMAL IMPLEMENTATION PLAN

1. Update `src/stores/useArcadeStore.js`:
   - Implement dynamic per-user state namespacing (`syncUserArcadeState(uid)`, `engquest_arcade_store_${uid}`).
   - Add defensive checks to `recordActiveInteraction` (negative delta sanitization, AFK cutoff, daily date rollover).
   - Ensure clean helper functions `getActiveUserId()` and `getUnlockedGames(weekNumber)`.
2. Authored `tests/gamification_phase3b.test.mjs` (16+ adversarial tests covering user isolation, heartbeat delta caps, AFK timeouts, break boundaries, unlock schedule, and zero XP).
3. Execute full regression suite (Golden Freeze, Golden Regression 11/11, Production Build).
