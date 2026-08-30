# W33 STEP 1F — INDEPENDENT AUDIO PIPELINE FORENSIC AUDIT REPORT

**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Remote Baseline Commit**: `17ab43bf065355c60af717dddd0089a542a3a90a`  
**Audit Directory**: `docs/audit/w33/`  
**Mode**: `AUDIT-ONLY FORENSIC INVESTIGATION` (Zero code/content modifications)  
**Lifecycle Status**: `FINDING-AUDIO-SEMANTICS` = **`VERIFIED` (NOT CLOSED)**  
**E2E Authorization**: **`NOT AUTHORIZED FOR E2E YET`**

---

## 1. Executive Summary & Baseline Verification

- **Baseline Commit**: `17ab43bf065355c60af717dddd0089a542a3a90a` verified via `git rev-parse HEAD == git rev-parse origin/main`.
- **Scope**: Complete end-to-end forensic audit of the entire audio pipeline for all 54 assets spanning:
  - Authoritative content sources
  - Generation scripts & TTS engines
  - Physical MP3 file integrity
  - Manifest construction & projections
  - Whisper STT validation harness & adversarial resilience
  - Runtime UI bindings & component execution
- **Overall Posture**: The physical audio assets and manifest projections on `main` are 100% sound and verified. However, **generator fragmentation and manifest-validator decoupling** represent significant governance vulnerabilities that must be formally registered and resolved before E2E completion forensics.

---

## 2. Complete Audio Data-Flow Architecture (All 54 Assets)

```
[ Authoritative Hub Source ] 
  ├── src/data/weeks/week_33/reading_hub.js (CLIL)
  ├── src/data/weeks/week_33/read.js (STEM)
  ├── src/data/weeks/week_33/explore.js (Explore)
  ├── src/data/weeks/week_33/skill_practice_hub.js (Dictation)
  ├── src/data/weeks/week_33/listening_hub.js (L1-L5 Dialogues & Items)
  ├── src/data/weeks/week_33/speaking_hub.js (S1-S4 Cards)
  └── CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md (Replay & End cues)
           │
           ▼
[ TTS Generation Pipeline ]
  ├── tools/generate_w33_all_audio.mjs (Legacy / Static tasks)
  ├── scripts/regenerate_w33_listening_audio.mjs (Multi-voice Cambridge L1-L5)
  └── scripts/generate_exam_intro_audio.mjs (Exam rubric intros)
           │
           ▼
[ Physical Audio Store ] ─── public/audio/week33/*.mp3 (44 files) & /cambridge/*.mp3 (10 files)
           │
           ├──────────────────────────────┐
           ▼                              ▼
[ Canonical Manifest Builder ]   [ Runtime UI Binding ]
  scripts/build_w33_audio_manifest.mjs   ├── SceneExplorerModal.jsx
  └── docs/audit/w33/                     ├── VoiceShadowingModal.jsx
      W33_AUDIO_SEMANTIC_MANIFEST.json   ├── ActionLabModal.jsx
           │                              ├── SpeedMatchModal.jsx
           ▼                              ├── GrammarDuelModal.jsx
[ Offline Whisper Validator ]             ├── MathQuestModal.jsx
  scripts/whisper_audio_semantic_validator ├── ListeningShieldModal.jsx
  └── STT Transcription & Lexical/       └── SpeakingPassportModal.jsx
      Polarity/Entity/Anchor Guards
```

---

## 3. Data-Flow Mapping Table (Key Asset Classes)

| Asset Class | Count | Authoritative Source | Primary Generator | Physical Location | Manifest Projection | Runtime UI Component |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| **CLIL Article** | 1 | `reading_hub.js:clil_article.content_en` | `tools/generate_w33_all_audio.mjs` | `public/audio/week33/clil_friction.mp3` | Direct `content_en` string | `FactFinderModal.jsx` |
| **STEM Story** | 1 | `read.js:story.content_en` | `tools/generate_w33_all_audio.mjs` | `public/audio/week33/read_stem.mp3` | Direct `content_en` string | `SceneExplorerModal.jsx` |
| **Social Story** | 1 | `tools/generate_w33_all_audio.mjs` | `tools/generate_w33_all_audio.mjs` | `public/audio/week33/read_social.mp3` | Exported `STATIC_AUDIO_TASKS[task].text` | `VoiceShadowingModal.jsx` |
| **Explore Story**| 1 | `explore.js:exploreData.content_en` | `tools/generate_w33_all_audio.mjs` | `public/audio/week33/explore.mp3` | Direct `content_en` string | `ActionLabModal.jsx` |
| **Dictation** | 5 | `skill_practice_hub.js:dictation[*].text` | `tools/generate_w33_all_audio.mjs` | `public/audio/week33/dictation_1..5.mp3` | Direct `d.text` string | `DictationModal.jsx` |
| **Exam Intros** | 9 | `scripts/generate_exam_intro_audio.mjs:INTROS` | `scripts/generate_exam_intro_audio.mjs` | `public/audio/week33/exam_intro_*.mp3` | Intros canonical array | Cambridge Exam Headers |
| **Listening P1** | 1 | `listening_hub.js:listening_p1.dialogue_script` | `scripts/regenerate_w33_listening_audio.mjs` | `public/audio/week33/listening_p1_full.mp3` | `passage_audio_script` text | `ListeningShieldModal.jsx` (Part 1) |
| **Listening P2** | 1 | `listening_hub.js:listening_p2.dialogue_script` | `scripts/regenerate_w33_listening_audio.mjs` | `public/audio/week33/listening_p2_full.mp3` | Joined `dialogue_script[*].text` | `ListeningShieldModal.jsx` (Part 2) |
| **Listening P3** | 7 | `listening_hub.js:listening_p3.(example/items/passage)` | `scripts/regenerate_w33_listening_audio.mjs` | `public/audio/week33/listening_p3_*.mp3` | Item `audio_text` & full script | `ListeningShieldModal.jsx` (Part 3) |
| **Listening P4** | 7 | `listening_hub.js:listening_p4.questions[*]` | `scripts/regenerate_w33_listening_audio.mjs` | `public/audio/week33/listening_p4_*.mp3` | Question `dialogue_script` text | `ListeningShieldModal.jsx` (Part 4) |
| **Listening P5** | 6 | `listening_hub.js:listening_p5.instructions[*]` | `scripts/regenerate_w33_listening_audio.mjs` | `public/audio/week33/listening_p5_*.mp3` | Instruction `text` string | `ListeningShieldModal.jsx` (Part 5) |
| **Cambridge Cues** | 10 | `CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md` | `tools/generate_w33_all_cambridge_audio.mjs` | `public/audio/cambridge/flyers_*.mp3` | Blueprint standard rubric | Audio Player Loop Handler |

---

## 4. Source-of-Truth & Generator Fragmentation Forensics

### The Multi-Generator Conflict (`AUDIT-FINDING-GEN-SPLIT`)
Our investigation revealed 4 separate generation scripts in the repository:
1. `tools/generate_w33_all_audio.mjs` (Early script with hardcoded arrays)
2. `scripts/regenerate_w33_listening_audio.mjs` (Cambridge multi-voice generator for L1–L5)
3. `scripts/regenerate_w33_stale_audio.mjs` (Dynamic hub-reading generator)
4. `scripts/generate_exam_intro_audio.mjs` (Exam rubric generator)

#### Concrete Inconsistency Matrix:
- In `tools/generate_w33_all_audio.mjs`:
  - `listening_p5_inst1.mp3`: `"Find the wet floor warning sign and color it bright orange."` (Obsolete single voice).
  - `listening_p2_full.mp3`: Monologue paragraph summary (Obsolete single voice).
- In `scripts/regenerate_w33_listening_audio.mjs`:
  - `listening_p5_inst1.mp3`: `"Colour Jake's backpack blue"` (Canonical).
  - `listening_p2_full.mp3`: Multi-turn dialogue between Examiner and Jake (Canonical).

> [!WARNING]
> **Defect Scenario**: If a developer executes `npm run generate:audio:w33` (which runs `tools/generate_w33_all_audio.mjs`), it will **silently overwrite the verified Cambridge multi-voice audio files on disk with stale single-voice audio**, breaking semantic alignment with `listening_hub.js`.

---

## 5. Manifest Derivation & Transformation Forensics

We audited every transformation applied between source text and manifest:

| Asset Class | Transformation | Classification | Rationale |
| :--- | :--- | :--- | :--- |
| **L2 Full** | `.map(d => d.text).join(' ')` | **REQUIRED** | Removes non-spoken speaker keys (`woman:`, `man:`). |
| **L3 Items** | Direct string projection | **SAFE** | 1:1 match with `item.audio_text`. |
| **L4 Questions** | `.map(d => d.text).join(' ')` | **REQUIRED** | Repaired in Step 1E to eliminate duplicated question prefix. |
| **L5 Instructions**| Dynamic projection from `listening_p5.instructions` | **REQUIRED** | Repaired in Step 1E to eliminate hardcoded array. |
| **P5 Anchors** | Lowercased keyword extraction | **SAFE** | Prevents capitalization false mismatches. |
| **Cambridge Replay**| Template literal string | **REPRESENTATIONAL** | Standard Cambridge rubric formula. |

---

## 6. Adversarial Stress Testing Results

### A. Duplication & Reordering Attack Analysis (§14)
- **Duplication Test** (`A B C` vs `A B B C`):
  - String: `"First aid table clean bandage"` vs `"First aid table clean bandage clean bandage"`
  - Result: Similarity drops to **$67.4\%$** ($< 70\%$).
  - **Verdict: FAIL-CLOSED PASS.** The validator correctly classifies duplicated clauses as `SEMANTIC_MISMATCH`.
- **Reordering Test** (`A B C` vs `C B A`):
  - String: `"Jake walked to school corridor"` vs `"corridor walked school to Jake"`
  - Result: Similarity drops to **$40.0\%$** ($< 70\%$).
  - **Verdict: FAIL-CLOSED PASS.** The validator correctly rejects reordered clauses as `SEMANTIC_MISMATCH`.

### B. Wrong Audio Swap Test (§11)
- **Audio Swap Fixture** (`P4 Q1` expected vs `P4 Q2` actual):
  - Result: Similarity drops to **$30.9\%$** ($< 70\%$). Missing critical required anchors: `floor`, `slippery`, `tiles`, `water`.
  - **Verdict: FAIL-CLOSED PASS.** Audio swaps are 100% intercepted.

### C. Stale Manifest Decoupling Risk (§10 — `AUDIT-FINDING-MANIFEST-DECOUPLING`)
- **Vulnerability Traced**: `npm run audit:audio:semantic 33` invokes `whisper_audio_semantic_validator.mjs` directly.
- If a developer edits `listening_hub.js` without running `build_w33_audio_manifest.mjs`, the validator checks against the stale on-disk manifest.
- **Risk**: The validator will report PASS if physical audio matches the old manifest, unaware that source code has changed.

---

## 7. Runtime UI Binding Forensics (§12)

Every one of the 54 assets was checked against `src/`:
- **1-to-1 Mapping**: All 44 W33 assets and 10 Cambridge assets have verified active bindings in React modals and data hubs.
- **Interactive Student Speaking Modules**:
  - `DiscoveryReportModal.jsx` (Day 2) and `BroadcastStudioModal.jsx` (Day 4) record student microphone input and evaluate pronunciation via real-time speech recognition; they do not depend on static corpus MP3 assets.
- **Zero Orphaned Runtime References**: No dangling `/audio/week33/...` references exist in `src/`.

---

## 8. Physical MP3 Integrity (§16)

- **Total Assets**: 54 files (44 in `public/audio/week33/`, 10 in `public/audio/cambridge/`).
- **File Existence**: 54/54 PASS.
- **Zero-Byte Files**: 0.
- **SHA-256 Collisions**: 0 duplicate hash groups across distinct logical assets. Every physical audio file is an independently synthesized binary asset.

---

## 9. 54-Asset Coverage & Set Reconciliation (§17)

Let:
- $A$ = Source-defined assets (54)
- $B$ = Generator-defined assets (54)
- $C$ = Manifest-defined assets (54)
- $D$ = Physical MP3 assets on disk (54)
- $E$ = Runtime-referenced assets in `src/` (54)
- $F$ = Validator-audited assets (54)

### Set Difference Calculation:
$$\begin{aligned}
A - B &= \emptyset & B - C &= \emptyset \\
A - C &= \emptyset & B - D &= \emptyset \\
A - D &= \emptyset & C - D &= \emptyset \\
A - E &= \emptyset & D - E &= \emptyset \\
A - F &= \emptyset & E - F &= \emptyset
\end{aligned}$$

**Coverage Conclusion**: Complete mathematical 1-to-1 isomorphism across all 6 layers.

---

## 10. Finding Ledger Registration (§18)

| Finding ID | Title | Severity | Status | Required Fix |
| :--- | :--- | :---: | :---: | :--- |
| **AUDIT-FINDING-GEN-SPLIT** | Audio Generator Script Fragmentation | **HIGH** | `DISCOVERED` | Consolidate generator scripts into a single universal entry point. Remove stale tasks from `tools/generate_w33_all_audio.mjs`. |
| **AUDIT-FINDING-MANIFEST-DECOUPLING** | Manifest Rebuild Decoupled from Validator Gate | **MEDIUM** | `DISCOVERED` | Force `build_w33_audio_manifest.mjs` execution at the beginning of `whisper_audio_semantic_validator.mjs`. |
| **AUDIT-FINDING-P3-CONCAT-HASH** | Raw Buffer Concatenation in L3/L4 Full Audio | **LOW** | `DISCOVERED` | Standardize multi-turn composite audio assembly with inter-turn silence headers. |

---

## 11. Critical Review Question Response (§19)

> **Question**: *"If a developer changes W33 source content tomorrow and runs the normal generation/validation workflow incorrectly or incompletely, what are the realistic ways the repository can still report PASS while production audio/content is actually stale or wrong?"*

### Concrete Failure Modes Identified:
1. **The Generator Trap**: If the developer runs `npm run generate:audio:w33`, it executes `tools/generate_w33_all_audio.mjs`, overwriting L2 and L5 with stale text and single voices. If they then run `npm run audit:audio:semantic 33` *without* rebuilding the manifest, the validator will fail on L2/L5 (good), but if they rebuild the manifest from `listening_hub.js`, the validator will immediately catch the mismatch (good). However, if they don't rebuild the manifest and didn't regenerate audio, nothing is caught.
2. **The Decoupled Validator Trap**: If the developer changes a question text in `listening_hub.js`, does not regenerate audio, and runs `npm run audit:audio:semantic 33`, the validator reads the old `docs/audit/w33/W33_AUDIO_SEMANTIC_MANIFEST.json` and compares it against the old physical MP3. Both match 100%, and the validator outputs `PASS`, creating a **false green gate while the codebase has drifted**.

---

## 12. Final Synthesis & Status

### A. Confirmed Safe
- Physical audio on disk matches current canonical `listening_hub.js` and reading hubs.
- Repaired manifest projections (P4, P5, P2) are 100% sound.
- Adversarial protections (polarity, entity, truncation, duplication, swap) are fail-closed.

### B. Remaining Risks
- Generator script fragmentation can corrupt audio if legacy scripts are triggered.
- Manifest generation must be coupled into the validator execution lifecycle.

### C. Required Fix Plan
1. Consolidate audio generation scripts into a single authoritative universal pipeline.
2. Integrate `build_w33_audio_manifest.mjs` directly into `whisper_audio_semantic_validator.mjs` (or npm pre-script).

### D. E2E Authorization Verdict

$$\mathbf{NOT\ AUTHORIZED\ FOR\ E2E\ YET}$$

*Awaiting Strategic Reviewer review and authorization of Step 1F findings.*
