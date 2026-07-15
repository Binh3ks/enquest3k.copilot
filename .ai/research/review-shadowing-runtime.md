# Review: SHADOWING_REPAIR_RUNTIME.md

**Date**: 2026-07-14
**Reviewer**: shadowing-runtime-review agent
**Document under review**: [.ai/runtime/SHADOWING_REPAIR_RUNTIME.md](../runtime/SHADOWING_REPAIR_RUNTIME.md)
**Versions reviewed**: v1.0 (initial draft) → v1.1 (architecture-hardened)

This review evaluates the runtime specification from an architecture perspective and identifies what was strengthened, what remains as residual risk, and whether the document is ready to drive a Shadowing Repair Agent.

---

## STRENGTHS

### S1. Grounded in actual code (not aspirational)

The v1.0 runtime was reverse-engineered from real implementation files. Every claim is traceable:
- `FAST_RATE = 0.4s/word` → from `useWordHighlight.js:52`
- Dual-threshold Challenge pause → from `useShadowingChallenge.js:441-484`
- `getCleanedTranscriptSentences` wps filter → from `transcriptUtils.js:79-85`
- 5 ASR fix patterns (D hey, Im, dont) → from `clean_transcripts.mjs:38-59`

This is rare for a runtime spec. Most AI-generated runtimes are aspirational ("the system should do X") and decoupled from real code. v1.0 reads as "the system DOES X, and here is the rule" — every rule has a source file.

### S2. Segmentation rules are quantitative, not just narrative

Part 3 specified:
- Max 12/14/16 words by level
- Max 18/22 syllables by level
- Min gap 0.15s, max 3.0s
- 6 worked examples

This converts "good shadowing" from a feeling into a measurable property. v1.1 extended this with 3-axis cognitive load (reading/speaking/rhythm) in Part 16, which is even more rigorous.

### S3. Validation is exhaustive and traceable

Part 4 has 40+ rules across 6 categories (H/T/K/S/M/I). Every rule is named (H1, T1, etc.), has a check, and has a failure mode. This is the kind of structure a repair agent can actually implement.

### S4. Quality score has explicit thresholds

Part 5 specifies:
- 7 weighted components
- Override rule: any individual FAIL = overall FAIL
- Per-component thresholds (90/75)
- Required output format for `validate_shadowing.sh`

This is the kind of "verdict" output that a CI/CD pre-commit hook can act on (exit code 0/1/2).

### S5. Repair vs Rebuild distinction (v1.1)

v1.1 Part 13 separates these as independent workflows. v1.0 conflated them, which was a real architectural risk:
- W11 (full transcript dump) cannot be REPAIRED — must be REBUILT
- W35 ADV (wrong vi) is a REPAIR-only operation
- Different rollback requirements
- Different PO approval requirements

The bifurcation prevents the most common repair-script error: "I'll just patch it" applied to a script that needs full reconstruction.

### S6. Decision matrix is a lookup table (v1.1)

Part 14 has 30+ symptom→action rows. A repair agent can:
1. Run `validate_shadowing.sh` and get a list of failing rules
2. Grep the decision matrix for matching row
3. Apply the action

This is the kind of structure that scales — adding new failure modes is a one-row addition, not a paragraph rewrite.

### S7. Human approval gates are explicit (v1.1)

v1.1 Part 15 enumerates 14 decision points where PO approval is required. The most critical:
- Quality score FAIL → HALT
- Any id change → HALT
- REBUILD triggered → HALT
- videoId changed → HALT

Without this, an autonomous agent might "fix" a broken week by deleting user corrections, which would be invisible to the repair script but visible to users.

### S8. Future compatibility protocol (v1.1)

Part 19 specifies:
- 6 change-trigger types
- Self-update protocol (5 steps)
- Hardcoded-anti-pattern list
- 5-week test fixture set
- Breaking-change protocol

Without this, the runtime would ossify the first time someone tweaked `FAST_RATE` or added a new IPA stress level. v1.1 explicitly tells future agents "if X changes, update Y in this document."

### S9. Output contract enumerates 18 file types (v1.1)

Part 18 lists every file the runtime produces, with producer, consumer, and mutability. This is the kind of spec that prevents accidents like "we forgot to backup the IPA file" or "the rollback bundle is incomplete."

### S10. Batch execution modes (v1.1)

Part 20 has 12 modes with confirmation rules. v1.0 only spec'd 5 tools. v1.1 makes the modes explicit (review / repair / regenerate / rollback / approve / report / dry-run), with interaction rules (no parallel writes, sequential per-week).

---

## WEAKNESSES (still present in v1.1)

### W1. Segmentation philosophy is partially aspirational

Part 16 introduces 3-axis cognitive load (reading/speaking/rhythm) and gives 3 worked examples. But:
- Syllable counting algorithm is given as "vowel groups = 1 syllable" — naive, doesn't handle diphthongs or schwas
- Speaking time estimation `0.18s × syllables + 0.3s × pause` is a guess, not derived from data
- No validation that A1 students actually process 7 ± 2 words in working memory (this is just a model, not measured)

**Risk**: A repair agent following Part 16 strictly might produce over-segmented or under-segmented transcripts because the syllable/time models aren't calibrated.

**Mitigation needed**: run Part 16 against a sample (W36 + W1) and compare to actual shadowing outcomes. Tune if needed.

### W2. IPA regeneration depends on CMU dict coverage

Part 18.3 says "Regenerate IPA" is a routine action. But Part 19 lists 10 common-word overrides (`schedule`, `progress`, `project`, etc.) and 6 phonological rules. Beyond these, IPA is generated from CMU dict which has ~134K words.

**Risk**: words not in CMU dict (Vietnamese loanwords, brand names, slang) will get `null` IPA → "Chưa có trong từ điển" toast. The audit found no week with > 1 missing IPA, but the threshold isn't quantified.

**Mitigation needed**: Part 16 should specify a "missing IPA threshold per week" (e.g., ≤ 1 missing word per 100-word transcript = OK; > 1 = WARN; > 5 = FAIL).

### W3. Repair vs Rebuild decision depends on `validate_shadowing.sh --dry` which doesn't exist yet

Part 13.1 references the "usability test" — but `validate_shadowing.sh` is in the P1 tool list (Part 11) which is spec-only. Until that tool is built, the repair agent has no way to classify a week as "Repair" or "Rebuild."

**Risk**: First few repair runs will manually classify, which is error-prone.

**Mitigation needed**: the FIRST implementation task in Part 22 should be `validate_shadowing.sh` (not `repair_shadowing_week.sh`).

### W4. "vi translated independently" is unverified for ADV/EASY

Part 6.3 says "Do NOT copy vi from ADV to EASY. Translate independently per the actual English sentence in that mode." But:
- The audit found 10 weeks (W23-W32) where ADV/EASY vi are identical
- No spec for HOW to translate independently (use AI? Human? Bilingual lookup?)
- No way to detect "wrong vi" automatically (the audit caught it by reading, not by script)

**Risk**: After repair, ADV/EASY vi could still be identical-but-wrong. Repair would just re-apply the wrong vi.

**Mitigation needed**: Part 14 row "ADV vi == EASY vi" should specify the detection (hash comparison) and the fix (per-mode AI translation with English sentence as input, validated by `content_en` topic match).

### W5. Local storage correction migration is described but not implemented

Part 9.4 says "If ids must change, bump localStorage correction key to v3 and provide one-time migration." The current code is v2 (per Shadowing.jsx:95). No migration code exists.

**Risk**: REBUILD workflow breaks user data silently. Even with PO approval, the user experience is "I lost my progress."

**Mitigation needed**: v3 migration code in `Shadowing.jsx` BEFORE rebuild workflow is run. The migration must:
- Read v2 entries (id → text)
- For each v2 entry, try to find a matching id in new script by text similarity
- If match ≥ 0.7: copy correction to new id
- If no match: log + drop

### W6. "Chunk density ≥ 8" rule is from production kit, not validated in runtime

Part 3.6 references W28+ requirement of ≥ 8 multi-word bolds. But:
- The runtime Part 5 (quality score) doesn't include chunk density as a component
- Part 4 (validation) doesn't have a chunk-density rule
- So `validate_shadowing.sh` won't catch a W28+ week with < 8 chunks

**Risk**: A "passed" repair can still violate production standards.

**Mitigation needed**: add Chunk Density as Part 5 component #8 (or add it to Part 4 as C-rule).

### W7. No regression test for "repair caused Highlight to break"

The 5-week test fixture set (Part 19.7) checks validity. But:
- W11 (worst case) is REBUILD target
- W23 (vi issue) is REPAIR target
- W35 (vi issue) is REPAIR target
- W36 (gold standard) is regression baseline
- W3 (single IPA miss) is minor repair

None of these test the **interaction** between repair and runtime. If a repair changes `script[].text` but IPA is regenerated with a bug, the repair "passes" validate but breaks at runtime.

**Risk**: silent runtime regression.

**Mitigation needed**: add a 6th test fixture — pick a week with a known-working video+IPA+highlight, run a no-op repair, verify the 5-sentence highlight advance works in browser.

### W8. "Syllable counting" doesn't handle edge cases

Part 16.3 gives naive rule "vowel groups = 1 syllable." Counterexamples:
- "Beautiful" = 3 syllables (beau-ti-ful) ✓
- "Area" = 3 syllables (a-re-a), not 2
- "Business" = 2 syllables (biz-ness), not 3
- "Colonel" = 3 syllables (ker-nel)

A repair agent that uses naive counting will mis-segment.

**Mitigation needed**: either drop the syllable constraint, or use a real syllable counter (e.g., `hyphen` package).

### W9. "Random sentence selection" anti-determinism mentioned but not tested

Part 18.7 says "Outputs are deterministic." But Part 13.4 (curation K) involves "score each sentence on chunk-density" + "keep top N" — which is deterministic. Part 6.4 (Stage 6 Choose best) involves "Take top candidate" — also deterministic.

But what if the segmenter has random tie-breaking? Part 3.5 (ASR auto-split) is deterministic, but Part 6.2 (Stage 8 segmentation) could be non-deterministic if soft preferences tie.

**Risk**: same input + same options might give different outputs on different runs.

**Mitigation needed**: spec the seed (e.g., `seed = hash(videoId + weekNum + text)`) for any random tie-breaking.

### W10. No "translation source" spec for vi

W23-W32 ADV/EASY vi issue (audit) implies vi was written by ONE translator. To repair, we need:
- WHO translated (human or AI?)
- WHAT source (English sentence? Glossary? Curriculum topic?)
- HOW to validate (back-translation? Topic match? Word count?)

None of this is in the runtime.

**Risk**: AI-generated vi might have different errors than human-generated. Repair agent treats them as same problem.

**Mitigation needed**: Part 13.5 (escalation) should specify: "vi regeneration → AI translation → human review for ADV (≥ 50% of entries) + content lead review for ADV/EASY paired weeks."

---

## ARCHITECTURAL IMPROVEMENTS (already in v1.1)

v1.1 added 9 new parts. Each addresses a v1.0 gap:

| v1.0 gap | v1.1 part | What it adds |
|----------|-----------|--------------|
| No source precedence rule | Part 12 | 5-level hierarchy + 7 conflict rules + derived-data rule |
| Repair/rebuild conflated | Part 13 | 2 workflows + decision tests + escalation rules |
| "What should I do?" unclear | Part 14 | 30+ symptom→action rows |
| No PO gates | Part 15 | 14 decision points + approval workflow |
| Segmentation = punctuation | Part 16 | 3-axis cognitive model + A1/A2/B1 examples |
| No read-only mode | Part 17 | review mode with 8-section report |
| Output files not enumerated | Part 18 | 18 file categories + diff format + rollback bundle |
| No future-proofing | Part 19 | 6 change triggers + self-update protocol + test fixtures |
| Execution modes not catalogued | Part 20 | 12 modes + 7 exit codes + confirmation rules |
| No history | Part 21 | append-only revision log |

These 9 additions transformed v1.0 from "a good spec" to "a deployable agent spec."

---

## REMAINING RISKS

### R1. Repair scripts must be implemented first

v1.1 assumes 5 P1 shell scripts exist (`validate_shadowing.sh`, `repair_shadowing_week.sh`, etc.). They are SPEC-ONLY. Without them, the runtime is a paper document.

**Severity**: HIGH. Without the scripts, no repair can happen.

**Mitigation**: implement `validate_shadowing.sh` first (it's the keystone — needed for everything else).

### R2. W11 rebuild requires human curation

Part 13.3 rebuild workflow is mechanical (load transcript, segment, generate IPA). But W11 is 68 entries of unsplit ASR — the segmentation algorithm will need human review of which 10-12 sentences to keep (vs. auto-select).

**Severity**: MEDIUM. The agent can produce a candidate, but PO must approve the actual selection.

**Mitigation**: Part 13.5 already lists "W11-style full transcript dump" as escalation case. Document the manual workflow for it.

### R3. W36+ future production depends on YouTube captions

The future W36+ workflow (Part 6) depends on YouTube having captions for the chosen video. Not all kids' channels have captions.

**Severity**: MEDIUM. Without captions, the agent falls back to TTS-only mode (loses video sync).

**Mitigation**: `curate_shadowing_videos.js` should add "has English captions" as a positive signal. Reject videos without captions.

### R4. Cross-station coupling (read.js content_en) is not in scope

`content_en` of `shadowing.js` must match `read.js content_en` (CHECK 42). A repair of shadowing might break this if content_en is regenerated. The runtime knows this (Part 9.6) but doesn't specify the fix.

**Severity**: MEDIUM. A "passed" shadowing repair can fail CHECK 42.

**Mitigation**: `repair_shadowing_week.sh` must re-run CHECK 42 after shadowing repair and re-patch `read.js content_en` if mismatch. OR the runtime should refuse to repair shadowing without also touching read.js (which is out of scope per Part 18.4).

### R5. IPA stress colors depend on CMU dict convention

Part 4.6 I5 says "At least 1 word per sentence has `stress=1`." But CMU dict is US English. A British video might have different stress patterns.

**Severity**: LOW. US convention is consistent.

**Mitigation**: not needed unless students report IPA feels off.

### R6. Highlight window FAST_RATE is hardcoded in source

Part 19.3 says runtime must not hardcode `FAST_RATE = 0.4`. But the runtime itself (Part 16.4, Part 1.2) repeatedly cites this value. If the source changes, the runtime doc becomes stale.

**Severity**: MEDIUM. The runtime is the canonical spec; if it disagrees with code, the runtime should win or be updated.

**Mitigation**: Part 19.2 self-update protocol covers this. Need discipline to actually run the protocol.

### R7. No spec for "what if 2 repair agents run concurrently"

Part 20.2 says "Only ONE mutation mode at a time (no parallel writes to same week)." But what if 2 different agents each repair a different week simultaneously? They could:
- Both read the same `video_transcripts.json` cache
- Both try to write
- Race condition on the cache

**Severity**: LOW. Realistic workflows are single-agent. But adding a lockfile would prevent accidents.

**Mitigation**: add `.lock` files in `repair_log/` for active repairs.

### R8. Migration of v2 → v3 corrections not implemented

Part 9.4 says "If ids must change, bump localStorage correction key to v3 and provide one-time migration." No code exists. The v2 → v3 migration is documented but not built.

**Severity**: HIGH for any REBUILD workflow. User data will be lost without migration.

**Mitigation**: implement v3 migration in `Shadowing.jsx` BEFORE running any REBUILD.

### R9. Audio cache invalidation has no spec for partial regen

Part 9.5 says "Always regenerate TTS audio after text change." But the audio cache (`generate_audio_deepgram.py`) is text-hash-keyed. If 2 of 10 sentences change, only 2 audio files need to be regenerated. The runtime says "always" which is wasteful.

**Severity**: LOW. R2 audio files is cheaper than rebuilding all 10.

**Mitigation**: Part 9.5 should say "Regenerate TTS audio for changed sentences only."

### R10. W36 future production isn't validated end-to-end

W36 is the "golden standard" but its production wasn't run through Part 6 (future production runtime). It was hand-crafted. We don't know if Part 6 can actually produce a W36-quality transcript from scratch.

**Severity**: MEDIUM. Part 6 is theoretical until tested.

**Mitigation**: when implementing Part 6 tools, run a W36+ test week (e.g., W37) through the full pipeline and compare to hand-crafted W36.

---

## APPROVED

**APPROVED = YES (with caveats)**

The v1.1 runtime is the **canonical specification** for the Shadowing Repair Agent. It is sufficient to drive implementation, validation, and approval workflows.

### Readiness by component

| Component | Ready? | Notes |
|-----------|--------|-------|
| Source of Truth (Part 12) | ✅ | 5-level hierarchy + 7 conflict rules |
| Repair vs Rebuild (Part 13) | ✅ | Decision tests, escalation, sub-cases |
| Decision Matrix (Part 14) | ✅ | 30+ symptom→action rows |
| Human Approval Gates (Part 15) | ✅ | 14 decision points, workflow, log |
| Segmentation Rules (Part 3 + Part 16) | ✅ | Hard limits + 3-axis philosophy + A1/A2/B1 examples |
| Validation (Part 4) | ✅ | 40+ rules across 6 categories |
| Quality Score (Part 5) | ✅ | 7 components, override rule, output format |
| Future Production (Part 6) | ✅ | Workflow, dual-mode spec |
| Automation Scripts (Part 7) | ✅ | 5 scripts with inputs/outputs/exit codes |
| Repair Priorities (Part 8) | ✅ | 4 phases from audit |
| Recovery (Part 9) | ✅ | Backup, rollback, 4 dependency rules |
| Glossary (Part 10) | ✅ | 11 terms |
| Tool Inventory (Part 11) | ✅ | 8 existing + 8 new |
| Review Mode (Part 17) | ✅ | Read-only pipeline, 8-section report |
| Output Contract (Part 18) | ✅ | 18 file categories + diff + rollback |
| Future Compatibility (Part 19) | ✅ | 6 triggers, self-update, test fixtures |
| Batch Execution (Part 20) | ✅ | 12 modes, 7 exit codes |
| Revision History (Part 21) | ✅ | Append-only log |
| Approval (Part 22) | ✅ | Implementation order |

### Required to unblock repair (priority order)

1. **Implement `validate_shadowing.sh`** (P1) — keystone. Without it, no repair can classify a week.
2. **Implement `generate_ipa.sh`** (P1) — independent of validate. Used by every repair.
3. **Implement `repair_shadowing_week.sh`** (P1) — depends on validate + generate_ipa.
4. **Implement v2→v3 corrections migration** (in `Shadowing.jsx`) — required for any REBUILD workflow.
5. **Implement `repair_shadowing_all.sh`** (P1) — depends on repair_shadowing_week.sh.
6. **Implement `generate_shadowing_from_video.sh`** (P1) — for W36+ future production.

### Open issues (not blocking but should address)

- W6: Chunk density ≥ 8 should be added to Part 5 quality score (currently only in Part 3.6)
- W7: 6th test fixture needed (highlight regression)
- W9: Random tie-breaking needs seed spec
- W10: vi translation source spec missing (human vs AI)
- R3: `curate_shadowing_videos.js` should require captions
- R4: CHECK 42 coupling to read.js not in scope
- R8: v2→v3 migration not implemented
- R9: audio partial regen spec is wasteful

### Verdict

**APPROVED_FOR_USE = YES** as the canonical runtime specification for the Shadowing Repair Agent.

**NOT READY FOR**:
- Direct execution (no scripts implemented yet — see P1 list above)
- Production commit (no validation, no migration code)
- W36+ future production in automated mode (R10 — needs W37 test run)

**Next step**: implement the 6 P1 items in order. After `validate_shadowing.sh` is built, run it against W1-W35 to confirm the audit's findings, then proceed with Phase 1 repairs (W11 + W35 ADV).
