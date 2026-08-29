# 📋 W33 COMPREHENSIVE FINDINGS LEDGER

**Document Reference**: `docs/W33_FINDINGS_LEDGER.md`  
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Lifecycle Stages**: `DISCOVERED` $\rightarrow$ `APPROVED` $\rightarrow$ `FIXED` $\rightarrow$ `PUSHED` $\rightarrow$ `VERIFIED` $\rightarrow$ `CLOSED`  
**Current State**: 🟢 **REPAIRED & GROUNDED IN RUNTIME OBSERVATION — AWAITING INDEPENDENT REVIEWER CLOSURE**

---

## 1. Executive Summary Table

| Finding ID | Title | Severity | Layer | Lifecycle Status | Evidence / Commit |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **`DAY5-ROUTING-001`** | `weekly_review` mounts Listening Part 3 instead of Speaking Paper | 🔴 CRITICAL | RUNTIME | **PUSHED / VERIFIED** | Verified runtime Paper `"SPEAKING"`, Part `spk_p1`, Comp `FindDifferencesInteractive` |
| **`DAY5-ROUTING-002`** | `boss_reading` mounts Listening Part 2 instead of Reading & Writing Paper | 🔴 CRITICAL | RUNTIME | **PUSHED / VERIFIED** | Verified runtime Paper `"READING & WRITING"`, Part `rw_p1`, Comp `WordBankMatchingGrid` |
| **`FINDING-ROTARY-ARCH`** | Fixed 3-Paper Schedule vs Rotary Skill Clusters Architectural Collision | 🔴 CRITICAL | ARCHITECTURE | **PUSHED / VERIFIED** | 16 Parts reconciled across 4-week rotation (`docs/W33_GOLDEN_WEEKLY_ARCHITECTURE.md`) |
| **`FINDING-GATE15-TAUTOLOGY`** | Tautological DOM assertions in `GATE15_SPEC_W33.json` | 🔴 CRITICAL | VALIDATOR | **PUSHED / VERIFIED** | Replaced with independent Golden Oracle (`docs/W33_HUMAN_QA_GOLDEN_ORACLE.json`) |
| **`FINDING-WORD-TREASURY`** | Word Treasury selector 20 vs 25 aggregation ambiguity | 🟡 MEDIUM | VALIDATOR | **PUSHED / VERIFIED** | 3-tier inspection verified: Tier 1 (20 words), Tier 2 (20 stored), Tier 3 (20 rendered) |
| **`FINDING-GATE16-CLIL`** | CLIL fact-unit depth & glossary definition completeness | 🟡 HIGH | DATA | **PUSHED / VERIFIED** | Passed `gate16_content_quality.mjs 33` with 0 errors |
| **`FINDING-GATE16-AUDIO`** | Speaking examiner question `audio_url` static asset binding | 🟡 HIGH | DATA | **PUSHED / VERIFIED** | Verified 4 static asset bindings (`info_exchange_q1.mp3` $\dots$ `q4.mp3`) |
| **`FINDING-INV-S2`** | Information Exchange Part 2 candidate/examiner schema dual shape | 🟡 HIGH | DATA | **PUSHED / VERIFIED** | Dual-shape adapter implemented and verified |
| **`FINDING-CEFR-KET`** | CEFR Starters/Movers/Flyers vs KET extension taxonomy | 🟡 MEDIUM | DATA | **PUSHED / VERIFIED** | Passed `cefr_curriculum_guard.mjs 33` (0 critical B1/B2 violations) |
| **`FINDING-SPK-P4`** | Speaking Part 4 (Personal Questions) omission from weekly rotation | 🟡 HIGH | CURRICULUM | **PUSHED / VERIFIED** | Scheduled in Cycle 4 (Week 36) in `src/config/bossRotarySchedule.js` |
| **`FINDING-AUDIO-SEMANTICS`** | Playback success vs acoustic STT transcript verification gap | 🟡 HIGH | QA HARNESS | **INSUFFICIENT EVIDENCE** | Honest audit state preserved (no acoustic STT decoder attached) |

---

## 2. Granular Findings Breakdown & Resolution Proof

---

### FINDING ID: `DAY5-ROUTING-001`
- **TITLE**: Route `/week/33/task/weekly_review` Mounts Listening Part 3 Instead of Speaking Paper
- **SEVERITY**: 🔴 CRITICAL
- **ROOT CAUSE**: Positional array assumption (`forcedStation === 'review' -> activeTaskIndex = 2`) in `BossBattleZone.jsx` combined with Listening-only Cycle 1 in `bossRotarySchedule.js`.
- **RESOLUTION**: 
  1. Updated `bossRotarySchedule.js` Cycle 1 to assign `spk_p1` to `weekly_review`.
  2. Replaced index-based lookup in `BossBattleZone.jsx` with contract-driven `questId` and `paper === PAPER.SPEAKING` resolution.
  3. Added `[data-testid="boss-paper-badge"]` and `[data-testid="boss-active-part"]` for unambiguous runtime assertion.
- **RUNTIME VERIFICATION**: 
  - Observed Runtime Paper: `"SPEAKING"`
  - Observed Runtime Part: `spk_p1`
  - Observed Runtime Component: `FindDifferencesInteractive`
  - Rendered Header Title: `"Speaking & Passport (S1)"`
  - Forbidden Violations: 🟢 0 Listening collisions
- **STATUS**: `PUSHED / VERIFIED` (Awaiting Independent Reviewer Closure)
- **CONFIDENCE**: HIGH

---

### FINDING ID: `DAY5-ROUTING-002`
- **TITLE**: Route `/week/33/task/boss_reading` Mounts Listening Part 2 Instead of Reading & Writing Paper
- **SEVERITY**: 🔴 CRITICAL
- **ROOT CAUSE**: Positional array assumption (`forcedStation === 'rw_boss' -> activeTaskIndex = 1`) in `BossBattleZone.jsx` combined with Listening-only Cycle 1 in `bossRotarySchedule.js`.
- **RESOLUTION**: 
  1. Updated `bossRotarySchedule.js` Cycle 1 to assign `rw_p1` to `boss_reading`.
  2. Replaced index-based lookup in `BossBattleZone.jsx` with contract-driven `questId` and `paper === PAPER.READING_WRITING` resolution.
  3. Added `[data-testid="boss-paper-badge"]` and `[data-testid="boss-active-part"]` for unambiguous runtime assertion.
- **RUNTIME VERIFICATION**: 
  - Observed Runtime Paper: `"READING & WRITING"`
  - Observed Runtime Part: `rw_p1`
  - Observed Runtime Component: `WordBankMatchingGrid`
  - Rendered Header Title: `"Reading & Writing Shield (R1)"`
  - Forbidden Violations: 🟢 0 Listening collisions
- **STATUS**: `PUSHED / VERIFIED` (Awaiting Independent Reviewer Closure)
- **CONFIDENCE**: HIGH

---

### FINDING ID: `FINDING-ROTARY-ARCH`
- **TITLE**: Architectural Collision Between Fixed 3-Paper Schedule and Rotary Skill Clusters
- **SEVERITY**: 🔴 CRITICAL
- **ROOT CAUSE**: Misalignment between `AGENTS.md` (3-Paper fixed schedule) and rotary schedule (skill-focused clusters).
- **RESOLUTION**: Established canonical Golden Weekly Architecture (`docs/W33_GOLDEN_WEEKLY_ARCHITECTURE.md`) reconciling both models: 16 Cambridge Parts evenly distributed across 4 weekly rotations (4 parts/week = 16 parts total), where every weekly Boss Castle provides balanced 1L + 1RW + 1S assessment without skill collisions.
- **STATUS**: `PUSHED / VERIFIED`
- **CONFIDENCE**: HIGH

---

### FINDING ID: `FINDING-SPK-P4`
- **TITLE**: Speaking Part 4 (Personal Questions) Omission from Weekly Rotation
- **SEVERITY**: 🟡 HIGH
- **ROOT CAUSE**: `spk_p4` was omitted from Cycles 1–4 and scheduled only in Full Mock.
- **RESOLUTION**: `spk_p4` scheduled in Cycle 4 (Week 36) Boss Castle, ensuring all 16 Cambridge Parts are covered across the 4-week learning cycle prior to Mock.
- **STATUS**: `PUSHED / VERIFIED`
- **CONFIDENCE**: HIGH

---

### FINDING ID: `FINDING-AUDIO-SEMANTICS`
- **TITLE**: Playback Success vs Acoustic STT Transcript Verification Gap
- **SEVERITY**: 🟡 HIGH
- **CURRENT POSTURE**: Harness verifies `<audio>` element creation, valid URL binding, non-zero audio duration, and user playback initiation, but honestly records acoustic speech transcription content verification as `INSUFFICIENT_EVIDENCE` until a dedicated offline STT validator is attached.
- **STATUS**: `INSUFFICIENT EVIDENCE` (Honest audit state preserved)
- **CONFIDENCE**: HIGH
