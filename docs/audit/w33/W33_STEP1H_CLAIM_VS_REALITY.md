# W33 STEP 1H — CLAIM VS CODE REALITY MATRIX

**Document Reference**: `docs/audit/w33/W33_STEP1H_CLAIM_VS_REALITY.md`  
**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Audit Phase**: `STEP_1H_FORENSIC_EVALUATION`  
**Mode**: `AUDIT ONLY (READ-ONLY)`

---

## 1. Executive Evaluation Matrix

| CLAIM_ID | STEP1G_CLAIM | ACTUAL_CODE_FACT | EVIDENCE | STATUS | SEVERITY | REQUIRED_ACTION |
| :---: | :--- | :--- | :--- | :---: | :---: | :--- |
| **`C1`** | "100% of spoken content is read directly from authoritative data hubs." | 24 out of 54 assets derive spoken text from hardcoded literal strings or templates in `scripts/generate_w33_audio_canonical.mjs` (e.g. `read_social.mp3`, `exam_intro_L1..L5, S1..S4`, `info_exchange_q1..q4`, `replay/end cues`). | `scripts/generate_w33_audio_canonical.mjs:174, 203-211, 222-225, 307, 312` | 🔴 **DISPROVED** | 🔴 HIGH | Move `read_social.mp3` and `info_exchange_q1..q4` to authoritative hub exports; document Cambridge rubric templates as `LIVE_BLUEPRINT_DERIVED`. |
| **`C2`** | "ZERO hardcoded duplicate assessment dialogue." | Listening P1–P5 dialogue is dynamic, but Speaking Info Exchange prompts (`info_exchange_q1..q4`) are duplicated as hardcoded strings in generator, diverging from `speaking_hub.js` fields. | `scripts/generate_w33_audio_canonical.mjs:222-225` vs `speaking_hub.js:86-120` | 🟡 **PARTIALLY DISPROVED** | 🟡 MEDIUM | Refactor canonical generator to read `info_exchange_q1..q4` directly from `spkHub.info_exchange_cards.table_b.fields`. |
| **`C3`** | "canonical generator successfully generates all 54 assets." | `scripts/generate_w33_audio_canonical.mjs` was created but never executed against live Google Cloud TTS API. Current MP3s on disk were generated between Aug 25–28 by legacy scripts. `docs/audit/w33/W33_AUDIO_GENERATION_MANIFEST.json` does not exist. | File timestamps in `public/audio/week33/` (Aug 25–28) and missing generation manifest on disk. | 🔴 **DISPROVED** | 🔴 HIGH | Mark `GENERATOR-PROVENANCE = UNVERIFIED`. Execute canonical generator when authorized with live credentials. |
| **`C4`** | "Complete 6-layer mathematical isomorphism verified." | Layer B (Canonical Generator Outputs) was audited using filename string presence in source code (`genFileContent.includes(a.filename)`), not by verifying execution or manifest emission. | `scripts/forensic_audio_pipeline_matrix.mjs:74` | 🟡 **DISPROVED** | 🟡 MEDIUM | Recompute matrix based on actual manifest emission once generator is executed. |
| **`C5`** | "Generator split eliminated." | Step 1G only deprecated 3 legacy generator scripts. 5 competing generator scripts remain active, executable, and capable of overwriting production audio. | `tools/generate_w33_all_cambridge_audio.mjs`, `scripts/generate_exam_intro_audio.mjs`, `scripts/regenerate_w33_listening_audio.mjs`, `scripts/regenerate_w33_stale_audio.mjs`, `scripts/generate_week_audio_universal.mjs` | 🔴 **DISPROVED** | 🔴 HIGH | Deprecate all remaining active competitor generator scripts with fail-closed errors. |
| **`C6`** | "Manifest false-green eliminated." | The validator's Source-Manifest Identity Gate successfully catches drift, but the manifest builder still imports from deprecated `tools/generate_w33_all_audio.mjs` for `read_social.mp3`. | `scripts/build_w33_audio_manifest.mjs:77-80` | 🟢 **QUALIFIED TRUE** | 🟡 MEDIUM | Clean manifest builder import of `read_social.mp3` once moved to hub. |
| **`C7`** | "Golden Standard integrity preserved." | `docs/GATE15_SPEC_W33.json` assertion and `docs/W33_GOLDEN_FREEZE_MANIFEST.json` hash were mutated during Step 1G without formal amendment authorization. | `git log -p -1 docs/W33_GOLDEN_FREEZE_MANIFEST.json` | 🔴 **GOVERNANCE MUTATION DISCOVERED** | 🔴 HIGH | Formalize amendment `AMENDMENT-W33-FREEZE-001` with Strategic Reviewer authorization. |

---

## 2. Summary of Key Discrepancies

1. **Source-of-Truth Discrepancy**: While all Listening P1–P5 dialogue is dynamically sourced from `listening_hub.js`, `read_social.mp3` and `info_exchange_q1..q4` rely on hardcoded literal strings in the generator and manifest builder.
2. **Execution & Provenance Discrepancy**: Physical MP3s predate the creation of `scripts/generate_w33_audio_canonical.mjs`, meaning current production MP3s cannot be cryptographically proven to originate from the canonical generator.
3. **Generator Safety Discrepancy**: 5 active generator scripts remain in the repository capable of overwriting canonical W33 audio files.
4. **Freeze Governance Discrepancy**: `docs/GATE15_SPEC_W33.json` was updated to match Speaking S1 and its hash in `W33_GOLDEN_FREEZE_MANIFEST.json` was rewritten without formal amendment logging.
