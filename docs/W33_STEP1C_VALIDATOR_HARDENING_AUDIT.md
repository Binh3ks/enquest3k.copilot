# W33 STEP 1C — VALIDATOR HARDENING AUDIT
**Read-Only Forensic Audit of Whisper Semantic Validator Architecture & Blind Spots**

**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Audit Baseline**: Commit `455915df`  
**Review Posture**: `FINDING-AUDIO-SEMANTICS` = `VERIFIED` (Awaiting Independent Reviewer Hardening Sign-off)

---

## 1. Current Semantic Validation Architecture

The current validation pipeline in [`scripts/whisper_audio_semantic_validator.mjs`](file:///Users/binhnguyen/projects/Engquest3k/scripts/whisper_audio_semantic_validator.mjs) executes across 4 layers:
1. **Layer T4-A (Asset Existence)**: File exists on disk with `fs.statSync(fullPath).size > 0`.
2. **Layer T4-B (Transcript Existence)**: Native Whisper CLI transcribes audio into non-empty text.
3. **Layer T4-C (Normalized Lexical Similarity)**: Blended $50\%$ Character Levenshtein + $50\%$ Token Overlap metric.
4. **Layer T4-D (Semantic Key Anchors)**: Keyword search matching $\ge 75\%$ of declared required anchors.

---

## 2. Current Classification Rules

In `evaluateAsset(entry, actualTranscript)`:
- **Short Audio ($\le 12$ words)**:
  - $\text{Similarity} \ge 0.85 \land \text{AnchorsPassed} \implies \mathbf{PASS}$
  - $0.65 \le \text{Similarity} < 0.85 \land \text{AnchorsPassed} \implies \mathbf{MINOR\_TRANSCRIPTION\_VARIANCE}$
  - $\text{Similarity} < 0.65 \lor \neg \text{AnchorsPassed} \implies \mathbf{SEMANTIC\_MISMATCH}$
- **Standard Audio ($> 12$ words)**:
  - $\text{Similarity} \ge 0.85 \land \text{AnchorsPassed} \implies \mathbf{PASS}$
  - $0.70 \le \text{Similarity} < 0.85 \land \text{AnchorsPassed} \implies \mathbf{MINOR\_TRANSCRIPTION\_VARIANCE}$
  - $\text{Similarity} < 0.70 \lor \neg \text{AnchorsPassed} \implies \mathbf{SEMANTIC\_MISMATCH}$

---

## 3. Current Anchor Rules

In `verifyAnchors(anchors, actualText)`:
- Iterates over `anchors`.
- Checks if normalized anchor substring or all tokens of multi-word anchor exist in normalized actual transcript.
- Passes if `matchedCount / anchors.length >= 0.75`.

---

## 4. Current Normalization Rules

In `normalizeText(text)`:
- Lowercase, punctuation removal (`[^a-z0-9\s] \to ' '`), apostrophe removal (`[’'] \to ''`).
- UK/US spelling normalization (`colour` $\to$ `color`, `favourite` $\to$ `favorite`, `practise` $\to$ `practice`, `door frame` $\to$ `doorframe`).
- Single digit word expansion (`1` $\to$ `one`, ..., `10` $\to$ `ten`).
- Whitespace collapsing (`\s+ \to ' '`).

---

## 5. Current Self-Tests

Executed via `runSelfTests(whisperBin)`:
- **TEST A**: Known good asset (`info_exchange_q1.mp3`) $\to$ `PASS`.
- **TEST B**: Missing asset fixture $\to$ `MISSING_ASSET`.
- **TEST C**: Blocked/invalid Whisper binary path $\to$ `BLOCKED`.
- **TEST D**: Semantic character name swap (`Jake` $\to$ `Tom`) $\to$ `SEMANTIC_MISMATCH`.

---

## 6. Known Blind Spots & Exact Code Locations

| Blind Spot ID | Description | Exact Code Location | Vulnerability / Failure Mode |
| :--- | :--- | :--- | :--- |
| **BS-01 (Polarity)** | Negation insertion or removal (`did not help` vs `helped`) | `scripts/whisper_audio_semantic_validator.mjs:93-115` | Adding `did not` yields $\approx 77.4\%$ similarity + all anchors match $\implies$ falsely classified as `MINOR_TRANSCRIPTION_VARIANCE`. |
| **BS-02 (Location)** | Required location substitution (`corridor` $\to$ `classroom`) | `scripts/whisper_audio_semantic_validator.mjs:139-141` | When 4 anchors exist, matching 3/4 equals $75\% \ge 75\% \implies$ missing critical location passes anchor check. |
| **BS-03 (Numbers)** | Quantity or numeric alteration (`2 minutes` $\to$ `20 minutes`, `Room 4B` $\to$ `Room 4C`) | `scripts/whisper_audio_semantic_validator.mjs:45-48, 93-115` | Digits $>10$ are not mapped; changing `two` $\to$ `twenty` or `4B` $\to$ `4C` yields $>80\%$ similarity and escapes detection. |
| **BS-04 (Truncation)** | Material transcript truncation ($<60\%$ length) | `scripts/whisper_audio_semantic_validator.mjs:101-115` | First clause sharing 100% of its words with expected can achieve $\ge 70\%$ similarity if anchors are in the first clause. |
| **BS-05 (Collision)** | Generic vocabulary collision with high stop-word overlap | `scripts/whisper_audio_semantic_validator.mjs:106-112` | Unrelated sentences sharing `the`, `was`, `at`, `in` can have inflated lexical scores. |
| **BS-06 (SOP Gap)** | Missing verbatim rule and threshold floor codification | `production_kit/workflow/week_pipeline_sop.md:65-71` | SOP does not state *"Playback success does not prove semantic correctness"* or secondary variance floors ($70\% / 65\%$). |

---

## 7. Proposed Remediation

1. **Polarity Guard (`verifyPolarity`)**:
   - Extract semantic negation markers: `not`, `no`, `never`, `dont`, `doesnt`, `didnt`, `cannot`, `cant`, `wasnt`, `werent`, `isnt`, `arent`, `wont`, `couldnt`, `shouldnt`.
   - If canonical and actual polarity differ $\implies$ immediately return `SEMANTIC_MISMATCH` with reason `"Polarity mismatch"`.
2. **Strict Required Anchor Guard (`verifyAnchors`)**:
   - Distinguish mandatory critical entity anchors from optional contextual tokens.
   - If any explicitly declared required anchor (character, location, essential item) is missing $\implies$ fail anchor check (`passed = false`).
3. **Numeric & Identifier Entity Integrity Guard (`verifyNumericEntities`)**:
   - Extract numbers, measurements (`minutes`, `hours`, `meters`), and alphanumeric room/code identifiers (`4B`, `4C`).
   - If numeric entities in expected transcript are altered or substituted in actual transcript $\implies$ immediately return `SEMANTIC_MISMATCH`.
4. **Length Ratio / Truncation Guard**:
   - Compute length ratio $\frac{\text{actualTokens}}{\text{expectedTokens}}$.
   - If length ratio $< 0.60$ for multi-clause transcripts $\implies$ immediately return `SEMANTIC_MISMATCH` with reason `"Material truncation"`.
5. **SOP Codification**:
   - Add verbatim principle: *"Playback success does not prove semantic correctness."*
   - Codify the 4-tier model and the exact $85\% / 70\% / 65\%$ thresholds in `week_pipeline_sop.md`.

---

## 8. Proposed Adversarial Test Matrix

| Test ID | Fixture Type | Expected Transcript | Actual Input | Target Classification |
| :---: | :--- | :--- | :--- | :---: |
| **TEST A** | Known Good | `"Where did Jake help his friend?"` | Real Whisper on `info_exchange_q1.mp3` | `PASS` |
| **TEST B** | Missing Asset | Non-existent file path | Disk check | `MISSING_ASSET` |
| **TEST C** | Blocked Whisper | Valid asset | Invalid binary `/invalid/whisper` | `BLOCKED` |
| **TEST D** | Character Swap | `"Where did Jake help his friend?"` | `"Where did Tom help his friend?"` | `SEMANTIC_MISMATCH` |
| **TEST E** | Location Swap | `"Jake helped Tom in the school corridor"` | `"Jake helped Tom in the classroom"` | `SEMANTIC_MISMATCH` |
| **TEST F** | Polarity Inversion | `"Jake helped Tom after he slipped"` | `"Jake did not help Tom after he slipped"` | `SEMANTIC_MISMATCH` |
| **TEST G** | Number Alteration | `"Jake waited for 2 minutes"` | `"Jake waited for 20 minutes"` | `SEMANTIC_MISMATCH` |
| **TEST H** | Identifier Swap | `"The accident happened near Room 4B"` | `"The accident happened near Room 4C"` | `SEMANTIC_MISMATCH` |
| **TEST I** | Material Truncation | `"Jake was walking down the corridor when Tom slipped heavily"` | `"Jake was walking"` | `SEMANTIC_MISMATCH` |

---

## 9. Regression Risks & Mitigation

- **Risk**: Stricter numeric or anchor checks might fail valid minor ASR phoneme variances in the existing 54 assets.
- **Mitigation**: Verify that the 54 active assets in W33 retain 100% correct numbers and names before and after hardening.
- **Invariant**: The 4 existing minor variances (`listening_p4_q1..q5`) must remain `MINOR_TRANSCRIPTION_VARIANCE` with exact reasons documented.

---

## 10. Audit Conclusion

The current validator has demonstrated offline Whisper independence, but requires the 5 fail-closed protections and SOP governance codification to ensure complete adversarial robustness prior to reviewer sign-off.
