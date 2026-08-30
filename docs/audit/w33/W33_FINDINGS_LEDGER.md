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
| **`FINDING-AUDIO-SEMANTICS`** | Playback success vs acoustic STT transcript verification gap | 🟡 HIGH | QA HARNESS | **PUSHED / VERIFIED** | 100% (54/54 assets) verified via Whisper STT (`scripts/whisper_audio_semantic_validator.mjs`) |
| **`AUDIT-FINDING-GEN-SPLIT`** | Audio Generator Fragmentation & Stale Generation Task Defect | 🟡 HIGH | GOVERNANCE | **PUSHED / VERIFIED** | Unified in `scripts/generate_w33_audio_canonical.mjs`; deprecated legacy scripts with fail-closed errors |
| **`AUDIT-FINDING-MANIFEST-DECOUPLING`** | Manifest Rebuild Decoupled from Validator Gate | 🟡 MEDIUM | QA HARNESS | **PUSHED / VERIFIED** | Cryptographic Source-Manifest Identity Gate enforced; 4/4 drift tests pass fail-closed |
| **`SEC-FINDING-HARDCODED-KEY`** | Hardcoded Google Cloud TTS API Key Fallback in Tooling & Services | 🟡 HIGH | SECURITY | **PUSHED / VERIFIED** | Purged 100% of hardcoded credentials from code; enforced env configuration |
| **`AUDIT-FINDING-P3-CONCAT-HASH`** | Raw Buffer Concatenation in L3/L4 Full Composite Audio | 🟢 LOW | ENCODING | **PUSHED / VERIFIED (ACCEPTED RISK)** | Decodable across all HTML5 browsers and Whisper with 0 decode errors |
| **`GEN-CANONICAL-HARDCODED-SPOKEN-CONTENT`** | Canonical Generator Contains Hardcoded Learner-Facing Spoken Strings | 🔴 HIGH | SOURCE OF TRUTH | **FIXED / VERIFIED** | Dynamic derivation from `read.js` (`social_story`) and `speaking_hub.js` (`nova_question`) |
| **`GENERATOR-PROVENANCE-NOT-PROVEN`** | Physical MP3 Assets Lack Cryptographic Provenance to Canonical Generator | 🔴 HIGH | PROVENANCE | **VERIFIED** | Published `W33_AUDIO_GENERATION_MANIFEST.json` with 54 cryptographic file hashes |
| **`GEN-COMPETING-ACTIVE-SCRIPTS`** | Unprotected Competing Generator Scripts Can Overwrite Production Audio | 🔴 HIGH | PIPELINE SAFETY | **FIXED / VERIFIED** | All 4 standalone scripts deprecated with fail-closed errors; universal script guarded |
| **`MANIFEST-LEGACY-SOURCE-DEPENDENCY`** | Manifest Builder Depends on Deprecated Generator for Social Story | 🟡 MEDIUM | PROVENANCE | **FIXED / VERIFIED** | `build_w33_audio_manifest.mjs` imports directly from `src/data/weeks/week_33/read.js` |
| **`GOLDEN-FREEZE-SPEC-MUTATION`** | Golden Freeze Spec and Manifest Hashes Mutated Without Formal Amendment | 🔴 HIGH | GOVERNANCE | **AMENDMENT FORMALIZED** | Recorded formal `AMENDMENT-W33-FREEZE-001` in `W33_MASTER_GOVERNANCE_MATRIX.json` |

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
- **LIFECYCLE STATUS**: `DISCOVERED` → `FIXED` → `VERIFIED` (NOT CLOSED — Awaiting Independent Reviewer Final Closure)
- **ROOT CAUSE**: Prior QA validated only HTML5 audio creation, valid URL binding, and non-zero duration, leaving a gap between file playback and spoken phoneme accuracy.
- **RESOLUTION & HARDENING SPECIFICATION**: 
  - **Manifest Path**: [`docs/W33_AUDIO_SEMANTIC_MANIFEST.json`](file:///Users/binhnguyen/projects/Engquest3k/docs/W33_AUDIO_SEMANTIC_MANIFEST.json) (54 deterministic records).
  - **Validator Path**: [`scripts/whisper_audio_semantic_validator.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/whisper_audio_semantic_validator.mjs) (`npm run audit:audio:semantic 33`).
  - **Whisper Engine**: `/Library/Frameworks/Python.framework/Versions/3.11/bin/whisper` (Model: `tiny`, Language: `en`).
  - **Scoring Algorithm**: Blended $50\%$ Token Overlap (Jaccard) + $50\%$ Normalized Character Levenshtein distance on normalized text.
  - **Classification Thresholds**:
    - Standard Audio ($>12$ words): `PASS` $\ge 85.0\%$, `MINOR_TRANSCRIPTION_VARIANCE` $70.0\% - <85.0\%$, `SEMANTIC_MISMATCH` $< 70.0\%$.
    - Short Audio ($\le 12$ words): `PASS` $\ge 85.0\%$, `MINOR_TRANSCRIPTION_VARIANCE` $65.0\% - <85.0\%$, `SEMANTIC_MISMATCH` $< 65.0\%$.
  - **Fail-Closed Semantic Guards (Overrides similarity score)**:
    1. **Polarity / Negation Guard**: Rejects negation insertion/removal (`helped` $\leftrightarrow$ `did not help`) as `SEMANTIC_MISMATCH`.
    2. **Critical Entity / Location Guard**: Rejects character name or location substitutions (`corridor` $\leftrightarrow$ `classroom`, `Jake` $\leftrightarrow$ `Tom`) as `SEMANTIC_MISMATCH`.
    3. **Numeric & Code Identifier Guard**: Rejects number and identifier mutations (`2 minutes` $\leftrightarrow$ `20 minutes`, `Room 4B` $\leftrightarrow$ `Room 4C`) as `SEMANTIC_MISMATCH`.
    4. **Material Truncation Guard**: Rejects transcripts with token length ratio $<60\%$ as `SEMANTIC_MISMATCH`.
  - **Adversarial Self-Tests**: 9 deterministic positive and negative test fixtures (Tests A through I) executed on production classifier prior to corpus validation.
- **EMPIRICAL VERIFICATION EVIDENCE**: 
  - Corpus Evaluated: 54 / 54 Assets (W33: 44, Cambridge: 10)
  - Result Counts: 50 Strict PASS, 4 Accepted Minor Transcription Variances, 0 SEMANTIC_MISMATCH, 0 NO_TRANSCRIPT, 0 MISSING_ASSET, 0 BLOCKED
  - Verdict: 🟢 **PASS (54/54 Semantic Validation Success, 0 Fatal Errors)**
  - Machine-Readable Artifact: [`artifacts/w33_audio_semantic_validation.json`](file:///Users/binhnguyen/projects/Engquest3k/artifacts/w33_audio_semantic_validation.json)
  - Documentation Reports: [`docs/W33_AUDIO_SEMANTIC_VALIDATION_REPORT.json`](file:///Users/binhnguyen/projects/Engquest3k/docs/W33_AUDIO_SEMANTIC_VALIDATION_REPORT.json) & [`.md`](file:///Users/binhnguyen/projects/Engquest3k/docs/W33_AUDIO_SEMANTIC_VALIDATION_REPORT.md)
- **CONFIDENCE**: HIGH (Hardened against polarity, entity, numeric, and truncation mutations)
