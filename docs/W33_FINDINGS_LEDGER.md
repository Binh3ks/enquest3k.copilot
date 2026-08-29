# 📋 W33 COMPREHENSIVE FINDINGS LEDGER

**Document Reference**: `docs/W33_FINDINGS_LEDGER.md`  
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Lifecycle Stages**: `DISCOVERED` $\rightarrow$ `APPROVED` $\rightarrow$ `FIXED` $\rightarrow$ `VERIFIED` $\rightarrow$ `CLOSED`  
**Current State**: 🟡 **IMPLEMENTATION FIXED & GROUNDED IN RUNTIME OBSERVATION — AWAITING INDEPENDENT REVIEWER VERIFICATION**

---

## 1. Executive Summary Table

| Finding ID | Title | Severity | Layer | Status | Confidence |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`DAY5-ROUTING-001`** | `weekly_review` mounts Listening Part 3 instead of Speaking Paper | 🔴 CRITICAL | RUNTIME | `FIXED` | HIGH |
| **`DAY5-ROUTING-002`** | `boss_reading` mounts Listening Part 2 instead of Reading & Writing Paper | 🔴 CRITICAL | RUNTIME | `FIXED` | HIGH |
| **`FINDING-ROTARY-ARCH`** | Fixed 3-Paper Schedule vs Rotary Skill Clusters Architectural Collision | 🔴 CRITICAL | ARCHITECTURE | `FIXED` | HIGH |
| **`FINDING-GATE15-TAUTOLOGY`** | Tautological DOM assertions in `GATE15_SPEC_W33.json` | 🔴 CRITICAL | VALIDATOR | `FIXED` | HIGH |
| **`FINDING-WORD-TREASURY`** | Word Treasury selector 20 vs 25 aggregation ambiguity | 🟡 MEDIUM | VALIDATOR | `FIXED` | HIGH |
| **`FINDING-GATE16-CLIL`** | CLIL fact-unit depth & glossary definition completeness | 🟡 HIGH | DATA | `FIXED` | HIGH |
| **`FINDING-GATE16-AUDIO`** | Speaking examiner question `audio_url` static asset binding | 🟡 HIGH | DATA | `FIXED` | HIGH |
| **`FINDING-INV-S2`** | Information Exchange Part 2 candidate/examiner schema dual shape | 🟡 HIGH | DATA | `FIXED` | HIGH |
| **`FINDING-CEFR-KET`** | CEFR Starters/Movers/Flyers vs KET extension taxonomy | 🟡 MEDIUM | DATA | `FIXED` | HIGH |
| **`FINDING-SPK-P4`** | Speaking Part 4 (Personal Questions) omission from weekly rotation | 🟡 HIGH | CURRICULUM | `FIXED` | HIGH |
| **`FINDING-AUDIO-SEMANTICS`** | Playback success vs acoustic STT transcript verification gap | 🟡 HIGH | QA HARNESS | `INSUFFICIENT EVIDENCE` | HIGH |

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
- **RUNTIME VERIFICATION**: 
  - Rendered Header: `"Speaking & Passport (S1)"`
  - Mounted Component: `FindDifferencesInteractive` (S1)
  - Forbidden Violations: 🟢 0 Listening collisions
- **STATUS**: `FIXED` (Awaiting Independent Verification)
- **CONFIDENCE**: HIGH

---

### FINDING ID: `DAY5-ROUTING-002`
- **TITLE**: Route `/week/33/task/boss_reading` Mounts Listening Part 2 Instead of Reading & Writing Paper
- **SEVERITY**: 🔴 CRITICAL
- **ROOT CAUSE**: Positional array assumption (`forcedStation === 'rw_boss' -> activeTaskIndex = 1`) in `BossBattleZone.jsx` combined with Listening-only Cycle 1 in `bossRotarySchedule.js`.
- **RESOLUTION**: 
  1. Updated `bossRotarySchedule.js` Cycle 1 to assign `rw_p1` to `boss_reading`.
  2. Replaced index-based lookup in `BossBattleZone.jsx` with contract-driven `questId` and `paper === PAPER.READING_WRITING` resolution.
- **RUNTIME VERIFICATION**: 
  - Rendered Header: `"Reading & Writing Shield (R1)"`
  - Mounted Component: `WordBankMatchingGrid` (R1)
  - Forbidden Violations: 🟢 0 Listening collisions
- **STATUS**: `FIXED` (Awaiting Independent Verification)
- **CONFIDENCE**: HIGH

---

### FINDING ID: `FINDING-ROTARY-ARCH`
- **TITLE**: Architectural Collision Between Fixed 3-Paper Schedule and Rotary Skill Clusters
- **SEVERITY**: 🔴 CRITICAL
- **ROOT CAUSE**: Misalignment between `AGENTS.md` (3-Paper fixed schedule) and rotary schedule (skill-focused clusters).
- **RESOLUTION**: Established canonical Golden Weekly Architecture (`docs/W33_GOLDEN_WEEKLY_ARCHITECTURE.md`) reconciling both models: 16 Cambridge Parts evenly distributed across 4 weekly rotations (4 parts/week = 16 parts total), where every weekly Boss Castle provides balanced 1L + 1RW + 1S assessment without skill collisions.
- **STATUS**: `FIXED`
- **CONFIDENCE**: HIGH

---

### FINDING ID: `FINDING-SPK-P4`
- **TITLE**: Speaking Part 4 (Personal Questions) Omission from Weekly Rotation
- **SEVERITY**: 🟡 HIGH
- **ROOT CAUSE**: `spk_p4` was omitted from Cycles 1–4 and scheduled only in Full Mock.
- **RESOLUTION**: `spk_p4` scheduled in Cycle 4 (Week 36) Boss Castle, ensuring all 16 Cambridge Parts are covered across the 4-week learning cycle prior to Mock.
- **STATUS**: `FIXED`
- **CONFIDENCE**: HIGH

---

### FINDING ID: `FINDING-AUDIO-SEMANTICS`
- **TITLE**: Playback Success vs Acoustic STT Transcript Verification Gap
- **SEVERITY**: 🟡 HIGH
- **CURRENT POSTURE**: Harness verifies `<audio>` element creation, valid URL binding, non-zero audio duration, and user playback initiation, but honestly records acoustic speech transcription content verification as `INSUFFICIENT_EVIDENCE` until a dedicated offline STT validator is attached.
- **STATUS**: `INSUFFICIENT EVIDENCE` (Honest audit state preserved)
- **CONFIDENCE**: HIGH
