# 📋 W33 COMPREHENSIVE FINDINGS LEDGER
## Master Governance Registry & Historical Findings Reconciliation

**Document Reference**: `docs/audit/w33/W33_FINDINGS_LEDGER.md`
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0
**Lifecycle Stages**: `DISCOVERED` $\rightarrow$ `APPROVED` $\rightarrow$ `FIXED` $\rightarrow$ `PUSHED` $\rightarrow$ `VERIFIED` $\rightarrow$ `CLOSED`
**Current State**: 🔒 **ALL 20 FINDINGS SYSTEMATICALLY RESOLVED & FORMALLY CLOSED / RATIFIED**

---

## 1. Master Executive Summary Table

| Finding ID | Title | Severity | Layer | Lifecycle Status | Final Resolution / Closure Evidence |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **`DAY5-ROUTING-001`** | `weekly_review` mounts Listening Part 3 instead of Speaking Paper | 🔴 CRITICAL | RUNTIME | **CLOSED** | Verified runtime Paper `"SPEAKING"`, Part `spk_p1`, Comp `FindDifferencesInteractive` |
| **`DAY5-ROUTING-002`** | `boss_reading` mounts Listening Part 2 instead of Reading & Writing Paper | 🔴 CRITICAL | RUNTIME | **CLOSED** | Verified runtime Paper `"READING & WRITING"`, Part `rw_p1`, Comp `WordBankMatchingGrid` |
| **`FINDING-ROTARY-ARCH`** | Fixed 3-Paper Schedule vs Rotary Skill Clusters Architectural Collision | 🔴 CRITICAL | ARCHITECTURE | **CLOSED** | 16 Parts reconciled across 4-week rotation (`docs/W33_GOLDEN_WEEKLY_ARCHITECTURE.md`) |
| **`FINDING-GATE15-TAUTOLOGY`** | Tautological DOM assertions in `GATE15_SPEC_W33.json` | 🔴 CRITICAL | VALIDATOR | **CLOSED** | Replaced with independent Golden Oracle (`docs/W33_HUMAN_QA_GOLDEN_ORACLE.json`) |
| **`FINDING-WORD-TREASURY`** | Word Treasury selector 20 vs 25 aggregation ambiguity | 🟡 MEDIUM | VALIDATOR | **CLOSED** | 3-tier inspection verified: Tier 1 (20 words), Tier 2 (20 stored), Tier 3 (20 rendered) |
| **`FINDING-GATE16-CLIL`** | CLIL fact-unit depth & glossary definition completeness | 🟡 HIGH | DATA | **CLOSED** | Passed `gate16_content_quality.mjs 33` with 0 errors |
| **`FINDING-GATE16-AUDIO`** | Speaking examiner question `audio_url` static asset binding | 🟡 HIGH | DATA | **CLOSED** | Verified 4 static asset bindings (`info_exchange_q1.mp3` $\dots$ `q4.mp3`) |
| **`FINDING-INV-S2`** | Information Exchange Part 2 candidate/examiner schema dual shape | 🟡 HIGH | DATA | **CLOSED** | Dual-shape adapter implemented and verified |
| **`FINDING-CEFR-KET`** | CEFR Starters/Movers/Flyers vs KET extension taxonomy | 🟡 MEDIUM | DATA | **CLOSED** | Passed `cefr_curriculum_guard.mjs 33` (0 critical B1/B2 violations) |
| **`FINDING-SPK-P4`** | Speaking Part 4 (Personal Questions) omission from weekly rotation | 🟡 HIGH | CURRICULUM | **CLOSED** | Scheduled in Cycle 4 (Week 36) in `src/config/bossRotarySchedule.js` |
| **`FINDING-AUDIO-SEMANTICS`** | Playback success vs acoustic STT transcript verification gap | 🟡 HIGH | QA HARNESS | **CLOSED** | 100% (54/54 assets) verified via Whisper STT (`scripts/whisper_audio_semantic_validator.mjs`) |
| **`AUDIT-FINDING-GEN-SPLIT`** | Audio Generator Fragmentation & Stale Generation Task Defect | 🟡 HIGH | GOVERNANCE | **CLOSED** | Unified in `scripts/generate_w33_audio_canonical.mjs`; deprecated legacy scripts with fail-closed errors |
| **`AUDIT-FINDING-MANIFEST-DECOUPLING`** | Manifest Rebuild Decoupled from Validator Gate | 🟡 MEDIUM | QA HARNESS | **CLOSED** | Cryptographic Source-Manifest Identity Gate enforced; 4/4 drift tests pass fail-closed |
| **`SEC-FINDING-HARDCODED-KEY`** | Hardcoded Google Cloud TTS API Key Fallback in Tooling & Services | 🟡 HIGH | SECURITY | **CLOSED** | Purged 100% of hardcoded credentials from code; enforced env configuration |
| **`AUDIT-FINDING-P3-CONCAT-HASH`** | Raw Buffer Concatenation in L3/L4 Full Composite Audio | 🟢 LOW | ENCODING | **CLOSED (ACCEPTED RISK)** | Decodable across all HTML5 browsers and Whisper with 0 decode errors |
| **`GEN-CANONICAL-HARDCODED-SPOKEN-CONTENT`** | Canonical Generator Contains Hardcoded Learner-Facing Spoken Strings | 🔴 HIGH | SOURCE OF TRUTH | **CLOSED** | Dynamic derivation from `read.js` (`social_story`) and `speaking_hub.js` (`nova_question`) |
| **`GENERATOR-PROVENANCE-NOT-PROVEN`** | Physical MP3 Assets Lack Cryptographic Provenance to Canonical Generator | 🔴 HIGH | PROVENANCE | **CLOSED** | Published `W33_AUDIO_GENERATION_MANIFEST.json` with 54 cryptographic file hashes |
| **`GEN-COMPETING-ACTIVE-SCRIPTS`** | Unprotected Competing Generator Scripts Can Overwrite Production Audio | 🔴 HIGH | PIPELINE SAFETY | **CLOSED** | All 4 standalone scripts deprecated with fail-closed errors; universal script guarded |
| **`MANIFEST-LEGACY-SOURCE-DEPENDENCY`** | Manifest Builder Depends on Deprecated Generator for Social Story | 🟡 MEDIUM | PROVENANCE | **CLOSED** | `build_w33_audio_manifest.mjs` imports directly from `src/data/weeks/week_33/read.js` |
| **`GOLDEN-FREEZE-SPEC-MUTATION`** | Golden Freeze Spec and Manifest Hashes Mutated Without Formal Amendment | 🔴 HIGH | GOVERNANCE | **RATIFIED** | Recorded formal `AMENDMENT-W33-FREEZE-001` in `W33_MASTER_GOVERNANCE_MATRIX.json` |

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
- **STATUS**: `CLOSED`

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
- **STATUS**: `CLOSED`

---

### FINDING ID: `FINDING-ROTARY-ARCH`
- **TITLE**: Architectural Collision Between Fixed 3-Paper Schedule and Rotary Skill Clusters
- **SEVERITY**: 🔴 CRITICAL
- **ROOT CAUSE**: Misalignment between `AGENTS.md` (3-Paper fixed schedule) and rotary schedule (skill-focused clusters).
- **RESOLUTION**: Established canonical Golden Weekly Architecture (`docs/W33_GOLDEN_WEEKLY_ARCHITECTURE.md`) reconciling both models: 16 Cambridge Parts evenly distributed across 4 weekly rotations (4 parts/week = 16 parts total), where every weekly Boss Castle provides balanced 1L + 1RW + 1S assessment without skill collisions.
- **STATUS**: `CLOSED`

---

### FINDING ID: `FINDING-SPK-P4`
- **TITLE**: Speaking Part 4 (Personal Questions) Omission from Weekly Rotation
- **SEVERITY**: 🟡 HIGH
- **ROOT CAUSE**: `spk_p4` was omitted from Cycles 1–4 and scheduled only in Full Mock.
- **RESOLUTION**: `spk_p4` scheduled in Cycle 4 (Week 36) Boss Castle, ensuring all 16 Cambridge Parts are covered across the 4-week learning cycle prior to Mock.
- **STATUS**: `CLOSED`

---

### FINDING ID: `FINDING-AUDIO-SEMANTICS`
- **TITLE**: Playback Success vs Acoustic STT Transcript Verification Gap
- **SEVERITY**: 🟡 HIGH
- **LIFECYCLE STATUS**: `CLOSED`
- **ROOT CAUSE**: Prior QA validated only HTML5 audio creation, valid URL binding, and non-zero duration, leaving a gap between file playback and spoken phoneme accuracy.
- **RESOLUTION & HARDENING SPECIFICATION**:
  - **Manifest Path**: [`docs/W33_AUDIO_SEMANTIC_MANIFEST.json`](file:///Users/binhnguyen/projects/Engquest3k/docs/W33_AUDIO_SEMANTIC_MANIFEST.json) (54 deterministic records).
  - **Validator Path**: [`scripts/whisper_audio_semantic_validator.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/whisper_audio_semantic_validator.mjs) (`npm run audit:audio:semantic 33`).
  - **Whisper Engine**: `/Library/Frameworks/Python.framework/Versions/3.11/bin/whisper` (Model: `tiny`, Language: `en`).
  - **Scoring Algorithm**: Blended $50\%$ Token Overlap (Jaccard) + $50\%$ Normalized Character Levenshtein distance on normalized text.
  - **Fail-Closed Semantic Guards**: Polarity/Negation Guard, Critical Entity Guard, Numeric Guard, Material Truncation Guard.
- **EMPIRICAL VERIFICATION EVIDENCE**:
  - Corpus Evaluated: 54 / 54 Assets (W33: 44, Cambridge: 10)
  - Result Counts: 50 Strict PASS, 4 Accepted Minor Transcription Variances, 0 SEMANTIC_MISMATCH, 0 NO_TRANSCRIPT, 0 MISSING_ASSET, 0 BLOCKED.
- **STATUS**: `CLOSED`

---

### FINDING ID: `AUDIT-FINDING-GEN-SPLIT`
- **TITLE**: Audio Generator Fragmentation & Stale Generation Task Defect
- **SEVERITY**: 🟡 HIGH
- **ROOT CAUSE**: Multiple competing audio generator scripts across repository.
- **RESOLUTION**: Unified in `scripts/generate_w33_audio_canonical.mjs` and deprecated legacy scripts with fail-closed errors.
- **STATUS**: `CLOSED`

---

### FINDING ID: `AUDIT-FINDING-MANIFEST-DECOUPLING`
- **TITLE**: Manifest Rebuild Decoupled from Validator Gate
- **SEVERITY**: 🟡 MEDIUM
- **ROOT CAUSE**: Manifest could drift from source data without failing build.
- **RESOLUTION**: Implemented Cryptographic Source-Manifest Drift Gate (`scripts/test_manifest_drift.mjs`).
- **STATUS**: `CLOSED`

---

### FINDING ID: `SEC-FINDING-HARDCODED-KEY`
- **TITLE**: Hardcoded Google Cloud TTS API Key Fallback in Tooling & Services
- **SEVERITY**: 🟡 HIGH
- **ROOT CAUSE**: API keys hardcoded as fallback literals in client services.
- **RESOLUTION**: Purged 100% of hardcoded API keys from repository; enforced environment variables.
- **STATUS**: `CLOSED`

---

### FINDING ID: `AUDIT-FINDING-P3-CONCAT-HASH`
- **TITLE**: Raw Buffer Concatenation in L3/L4 Full Composite Audio
- **SEVERITY**: 🟢 LOW
- **ROOT CAUSE**: MP3 frame header preservation during buffer concatenation.
- **RESOLUTION**: Evaluated across HTML5 audio decoders and Whisper STT with 0 decode errors. Formally accepted as LOW residual risk.
- **STATUS**: `CLOSED (ACCEPTED RISK)`

---

### FINDING ID: `GEN-CANONICAL-HARDCODED-SPOKEN-CONTENT`
- **TITLE**: Canonical Generator Contains Hardcoded Learner-Facing Spoken Strings
- **SEVERITY**: 🔴 HIGH
- **ROOT CAUSE**: Spoken prompts hardcoded in generator script instead of imported from hubs.
- **RESOLUTION**: Generator imports directly from `read.js` (`social_story`) and `speaking_hub.js` (`nova_question`).
- **STATUS**: `CLOSED`

---

### FINDING ID: `GENERATOR-PROVENANCE-NOT-PROVEN`
- **TITLE**: Physical MP3 Assets Lack Cryptographic Provenance to Canonical Generator
- **SEVERITY**: 🔴 HIGH
- **ROOT CAUSE**: Physical audio files on disk lacked explicit cryptographic hash manifest.
- **RESOLUTION**: Published `docs/audit/w33/W33_AUDIO_GENERATION_MANIFEST.json` with 54 SHA-256 hashes.
- **STATUS**: `CLOSED`

---

### FINDING ID: `GEN-COMPETING-ACTIVE-SCRIPTS`
- **TITLE**: Unprotected Competing Generator Scripts Can Overwrite Production Audio
- **SEVERITY**: 🔴 HIGH
- **ROOT CAUSE**: 4 standalone generator scripts could run and mutate audio files without guard checks.
- **RESOLUTION**: All 4 standalone scripts deprecated with fail-closed errors; universal script guarded.
- **STATUS**: `CLOSED`

---

### FINDING ID: `MANIFEST-LEGACY-SOURCE-DEPENDENCY`
- **TITLE**: Manifest Builder Depends on Deprecated Generator for Social Story
- **SEVERITY**: 🟡 MEDIUM
- **ROOT CAUSE**: Manifest builder referenced deprecated tool path.
- **RESOLUTION**: `build_w33_audio_manifest.mjs` imports directly from `src/data/weeks/week_33/read.js`.
- **STATUS**: `CLOSED`

---

### FINDING ID: `GOLDEN-FREEZE-SPEC-MUTATION`
- **TITLE**: Golden Freeze Spec and Manifest Hashes Mutated Without Formal Amendment
- **SEVERITY**: 🔴 HIGH
- **ROOT CAUSE**: Hash update in freeze manifest lacked formal governance amendment documentation.
- **RESOLUTION**: Formally recorded `AMENDMENT-W33-FREEZE-001` in governance matrix with full justification.
- **STATUS**: `RATIFIED`
