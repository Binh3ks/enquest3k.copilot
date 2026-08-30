# W33 GENERATOR AUTHORITY GRAPH & EXECUTION SAFETY AUDIT

**Document Reference**: `docs/audit/w33/W33_STEP1H_GENERATOR_AUTHORITY_GRAPH.md`  
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Audit Phase**: `STEP_1H_GENERATOR_AUTHORITY_FORENSICS`  
**Mode**: `AUDIT ONLY (READ-ONLY)`

---

## 1. Executive Summary & Authoritative Entry Point

### The Single Authoritative Command:
```bash
npm run generate:audio:w33
# (Executes: node scripts/generate_w33_audio_canonical.mjs)
```

**Authority Invariant**:
- Must derive 100% of spoken content from authoritative hub files and official Cambridge blueprints.
- Must emit dual-voice multi-speaker audio with official neural voice profiles.
- Must produce cryptographic generation manifest `docs/audit/w33/W33_AUDIO_GENERATION_MANIFEST.json`.

---

## 2. Complete Repository Generator Authority Matrix

| Script / Entry Point | Declared Status | Actual Execution Behavior | Overwrite Production Audio Risk | Governance Status |
| :--- | :---: | :--- | :---: | :---: |
| **`package.json` (`generate:audio:w33`)** | **AUTHORITATIVE** | Runs `scripts/generate_w33_audio_canonical.mjs` | ✅ Authoritative Target | 🟢 **CANONICAL ENTRYPOINT** |
| **`scripts/generate_w33_audio_canonical.mjs`** | **AUTHORITATIVE** | Generates 54 files reading from hubs, blueprints, and internal constants | ✅ Authoritative Target | 🟢 **CANONICAL GENERATOR** |
| **`tools/generate_w33_all_audio.mjs`** | DEPRECATED | **FAILS CLOSED** (Exits 1 with deprecation message directing to canonical script) | ❌ NONE (Blocked) | 🟢 **DEPRECATION PROTECTED** |
| **`tools/generate_w33_dialogue_audio.mjs`** | DEPRECATED | **FAILS CLOSED** (Exits 1 with deprecation message directing to canonical script) | ❌ NONE (Blocked) | 🟢 **DEPRECATION PROTECTED** |
| **`tools/generate_w33_part1_audio.mjs`** | DEPRECATED | **FAILS CLOSED** (Exits 1 with deprecation message directing to canonical script) | ❌ NONE (Blocked) | 🟢 **DEPRECATION PROTECTED** |
| **`tools/generate_w33_all_cambridge_audio.mjs`** | UNTRACKED COMPETITOR | **ACTIVE EXECUTION**: Synthesizes listening audio with parallel voice mapping and overwrites `public/audio/week33/` | 🔴 **HIGH (Active Overwrite Risk)** | 🔴 **UNPROTECTED COMPETITOR** |
| **`scripts/generate_exam_intro_audio.mjs`** | UNTRACKED COMPETITOR | **ACTIVE EXECUTION**: Synthesizes W33/W34 exam intros with single Journey-F voice and overwrites `public/audio/week33/` | 🔴 **HIGH (Active Overwrite Risk)** | 🔴 **UNPROTECTED COMPETITOR** |
| **`scripts/regenerate_w33_listening_audio.mjs`** | UNTRACKED COMPETITOR | **ACTIVE EXECUTION**: Synthesizes listening audio with custom pitch parameters and overwrites `public/audio/week33/` | 🔴 **HIGH (Active Overwrite Risk)** | 🔴 **UNPROTECTED COMPETITOR** |
| **`scripts/regenerate_w33_stale_audio.mjs`** | UNTRACKED COMPETITOR | **ACTIVE EXECUTION**: Synthesizes hub audio and overwrites `public/audio/week33/` | 🔴 **HIGH (Active Overwrite Risk)** | 🔴 **UNPROTECTED COMPETITOR** |
| **`scripts/generate_week_audio_universal.mjs`** | UNIVERSAL UTILITY | **ACTIVE EXECUTION**: If run as `node ... 33`, parses week 33 and overwrites `public/audio/week33/` | 🟡 **MEDIUM (Positional Overwrite Risk)** | 🟡 **UNPROTECTED MULTI-WEEK SCRIPT** |

---

## 3. Risk Assessment & Discovery

### Critical Finding: `GEN-COMPETING-ACTIVE-SCRIPTS`
- **Fact**: 5 generator scripts remain active and executable in the repository with the ability to overwrite production W33 audio files using non-canonical voice mappings, hardcoded strings, or single-voice profiles.
- **Root Cause**: Step 1G only deprecated 3 legacy generator scripts (`tools/generate_w33_all_audio.mjs`, `tools/generate_w33_dialogue_audio.mjs`, `tools/generate_w33_part1_audio.mjs`) but left 5 other generator scripts active without fail-closed guards.
- **Impact**: If any developer or CI job runs `tools/generate_w33_all_cambridge_audio.mjs`, `scripts/generate_exam_intro_audio.mjs`, `scripts/regenerate_w33_listening_audio.mjs`, or `scripts/regenerate_w33_stale_audio.mjs`, canonical W33 audio will be silently overwritten by obsolete configurations.

---

## 4. Planned Resolution (For Future Implementation Step)

1. Convert `tools/generate_w33_all_cambridge_audio.mjs` to a fail-closed deprecation wrapper pointing to `npm run generate:audio:w33`.
2. Convert `scripts/generate_exam_intro_audio.mjs` to a fail-closed deprecation wrapper pointing to `npm run generate:audio:w33`.
3. Convert `scripts/regenerate_w33_listening_audio.mjs` to a fail-closed deprecation wrapper pointing to `npm run generate:audio:w33`.
4. Convert `scripts/regenerate_w33_stale_audio.mjs` to a fail-closed deprecation wrapper pointing to `npm run generate:audio:w33`.
5. In `scripts/generate_week_audio_universal.mjs`, add a guard blocking `targetWeek === 33` and instructing the user to use the canonical generator.
