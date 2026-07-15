# Review: SHADOWING_REPAIR_RUNTIME v1.2

**Date**: 2026-07-14
**Reviewer**: shadowing-runtime-review agent
**Document under review**: [.ai/runtime/SHADOWING_REPAIR_RUNTIME.md](../runtime/SHADOWING_REPAIR_RUNTIME.md)
**Version reviewed**: v1.2 (4-Layer Transcript Pipeline)

---

## 1. Summary of architectural changes

v1.2 introduces a **4-Layer Transcript Pipeline** as the foundational architecture for all repair and production work. The four layers are:

```
L1  Original Transcript   — never edited, permanent archive
L2  Clean Transcript      — ASR error repair only (semantics unchanged)
L3  Learning Transcript   — educational segmentation for A1–A2 learners
L4  shadowing.js          — final student-facing artifact (ids, IPA, vi, timestamps)
```

The pipeline is a one-way funnel (L1→L2→L3→L4). Each layer can be regenerated from layers above it, but never from layers below.

**Key architectural shifts from v1.1**:

| Aspect | v1.1 | v1.2 |
|--------|------|------|
| Repair starting point | Existing `shadowing.js` | Original video (L1) |
| Rebuild starting point | Cleaned transcript (L2) | Original video (L1) |
| Source of Truth (runtime) | `shadowing.js` (L4) | L4 at runtime; L1 at repair time |
| Segmentation ownership | L2 or L4 (conflated) | L3 (centralized) |
| ASR repair ownership | L2 (implicit) | L2 (explicit, documented) |
| Long-term storage | 1 file (L2 cleaned) | 4 files (L1, L2, L3, L4) |
| Decision Matrix | 30+ flat rows | 30+ rows with layer column + workflow column |

---

## 2. Why the transcript pipeline changed

### v1.1's fundamental flaw

v1.1 treated `shadowing.js` as the "Source of Truth" that repair starts from. This is correct for a well-built system but wrong for repairing an accumulated codebase where many `shadowing.js` files are already damaged:

- **W11 ADV**: 68 entries, 45 missing IPA, duplicate ids. Starting from this `shadowing.js` and "repairing" it is absurd — the file IS the error.
- **W35 ADV**: 13 of 30 vi entries are from the Ant and the Grasshopper story. Starting from this `shadowing.js` and "fixing the vi" requires re-translating, but the TEXT is also wrong (no alignment with read.js).
- **W23-W32**: All 10 weeks have identical vi between ADV/EASY modes. "Repairing" vi from this `shadowing.js` means generating new translations from scratch — which is a rebuild.

### The v1.2 solution

By always starting from the original video (L1), the repair agent has a **known-good reference** (the actual spoken audio) to compare against. This makes the diagnosis unambiguous:
- If L4 text differs from L2 → REBUILD L4 from L3
- If L4 text matches L2 → REPAIR only metadata

The 4-layer model also separates ASR repair (L2) from educational segmentation (L3) — two concerns that were previously conflated. This is not just a documentation change; it prevents the repair agent from mixing "fixing what the speaker said" with "fixing what the student should practice."

---

## 3. Repair vs Rebuild comparison (v1.2)

### Repair (L4 metadata only)

**When**: `script[].text` overlaps L2 cleaned ≥ 0.5, text is trustworthy, only metadata is wrong.

**What is modified**:
- `vi` (wrong translation) — regenerate
- `ipa` (missing/stale) — regenerate
- `timestamps` (drifted) — re-run transcriptAligner
- `content_en` (mismatch) — rebuild from L4.text
- `**bold**` in text (cosmetic) — strip

**What is preserved**:
- `id` values (stable across repair)
- `text` (correct, no changes)
- User corrections in localStorage
- TTS audio cache
- Challenge progress and completed-sentence tracking

**Effort**: ~1-2 hours per week

### Rebuild (full L1→L4 regeneration)

**When**: `script[].text` is wrong (< 50% overlap with L2), structurally broken (duplicate ids), or never properly segmented (full transcript dump).

**What is modified** (everything):
- L2: re-cleaned from L1
- L3: re-segmented from L2 using Learning Rhythm rules
- L4: regenerated from L3 (fresh ids, fresh timestamps, fresh IPA, fresh vi)

**What is lost**:
- User corrections (id-based, cannot migrate)
- Challenge progress
- Completed-sentence tracking
- TTS audio cache (all sentences invalidated)

**Effort**: ~3-6 hours per week (depends on vi translation effort)

### Decision criteria (v1.2)

The v1.2 Decision Matrix (Part 14) adds a **layer column** that was missing in v1.1. This makes it unambiguous which layer is broken and which workflow is required:

| Symptom | Layer | Workflow |
|---------|-------|----------|
| Wrong IPA | L4 only | Repair |
| Wrong vi | L4 only | Repair |
| Wrong text | L4 ↔ L2 | Repair (patch from L2) |
| Broken structure (ids) | L4 | Rebuild (from L3) |
| Wrong segmentation | L3 | Rebuild from L3 |
| ASR errors in L2 | L2 | Rebuild L2 from L1 |
| Full transcript dump (W11) | L3 never applied | Rebuild L1→L4 |
| Video unavailable | L1 | Escalate (PO) |

---

## 4. New Source of Truth hierarchy (v1.2)

### At runtime (student using the app)

```
L4 shadowing.js  →  L2 cleaned timestamps  →  L1 (archive, unused at runtime)
```

L4 is what the student sees. If L4 disagrees with L2 timestamps, L2 wins (timestamps come from video). If L4 IPA is missing, CMU fallback wins.

### At repair time (repair agent working)

```
L1 original  →  L2 cleaned  →  L3 learning  →  L4 shadowing.js
```

The repair agent compares L4 against the pipeline. If L4 matches the pipeline, no work needed. If L4 disagrees, the repair agent determines which layer is broken and rebuilds from there.

### v1.2 conflict resolution rules (Part 12)

v1.2 separates conflicts into two categories:

**Repair-time conflicts** (which layer is wrong):
| Conflict | Winner | Action |
|----------|--------|--------|
| L1 ≠ L2 (ASR errors persist in L2) | L1 is canonical | Re-run L2 cleaning |
| L2 ≠ L3 (L3 has different words than L2) | L2 is canonical | Re-segment L3 from L2 |
| L3 ≠ L4 (L4 text differs from L3) | L3 is canonical | Regenerate L4 from L3 |
| L4.vi ≠ L3.vi (vi mismatch) | L3.vi is canonical | Rebuild L4 vi from L3 |
| L4.ipa ≠ L4.text words (IPA stale) | L4.text is canonical | Regenerate L4 IPA |
| L4.content_en ≠ read.js.content_en | read.js is canonical (CHECK 42) | Align L4.content_en with read.js |

**Runtime conflicts** (which source wins for display):
| Conflict | Winner | Action |
|----------|--------|--------|
| L4.text differs from L2 | L4 wins | Log warning |
| L4 timestamps disagree with L2 | L2 wins | Re-run aligner |
| L4.ipa missing id | CMU fallback | "Chưa có" toast |
| L4.vi null | AI fallback | Translates on demand |

This dual-category model (repair vs runtime) was completely missing in v1.1.

---

## 5. Impact on future W36+ production

v1.2's 4-layer model is **identical** for repair and production. The only difference is the starting point:

| Mode | Starting point | L1 source | L2 source | L3 source | L4 output |
|------|---------------|-----------|-----------|-----------|-----------|
| Repair (W1–W35) | Existing videoId | Re-extract (YouTube/Whisper) | Re-clean from L1 | Re-segment from L2 | Generated from L3 |
| Production (W36+) | Newly chosen video | Fetch YouTube captions | Clean from L1 | Segment from L2 | Generated from L3 |

This means the same scripts and tools serve both modes. The `generate_shadowing_from_video.sh` tool (Part 7.3) needs to be updated to:
1. Capture L1 first (new step)
2. Clean L2 from L1 (existing step, clarified)
3. Segment L3 from L2 (new step — was implicit in v1.1)
4. Build L4 from L3 (existing step, clarified)

The v1.2 model also means W36+ production benefits from the same long-term storage as repair. If a future curriculum change adjusts A1 word limits, the L3 segmenter can be re-run on the same L2 files without re-downloading videos.

---

## 6. Compatibility with existing runtime

### What v1.2 added

- Part 0 (4-Layer Transcript Pipeline) — new foundational section, ~200 lines
- Part 12.2 (Layer-level conflict resolution) — replaces v1.1 flat conflict table
- Part 13.2-3 (Repair vs Rebuild) — rewritten for 4-layer model
- Part 14 (Decision Matrix) — extended with layer column + workflow column + 4 new layer-specific rows
- Part 21.4 (v1.2 architectural decisions) — 8 new decisions
- Part 22 (Approval) — revised implementation order for 4-layer prerequisites

### What v1.2 did NOT change

- Part 1 (Current Implementation) — still accurate, describes the existing code as-is
- Part 3 (Sentence Segmentation Rules) — unchanged; referenced by L3 in the new model
- Part 4 (Highlight Validation) — unchanged; still validates L4
- Part 5 (Quality Score) — unchanged; still scores L4
- Part 6 (Future Production) — unchanged but now clarified to use L1→L2→L3→L4
- Part 7 (Automation Scripts) — unchanged but each script needs a v1.2 update
- Part 8 (Repair Priorities) — unchanged; same phases, same effort estimates
- Part 9 (Recovery + Safety) — unchanged; same backup protocol
- Part 10 (Glossary) — unchanged
- Part 11 (Tool Inventory) — unchanged but L1/L3 capture tools are new P1 items
- Part 15-20 — unchanged

### Backward compatibility

The v1.2 model is a **superset** of v1.1. Everything that worked in v1.1 still works in v1.2. The difference is that v1.2 adds the conceptual layers and enforces a "start from L1" discipline that v1.1 lacked.

An agent trained on v1.1 can execute v1.2 by:
1. Reading Part 0 to understand the 4-layer model
2. Updating its mental model: "I always start from L1, not from L4"
3. Following the same Part 14 Decision Matrix rows (now with layer column)

---

## 7. Residual risks (carried forward + new)

### Carried forward from v1.1

| Risk | Status in v1.2 | Mitigation |
|------|----------------|------------|
| W1. Naive syllable counting | Still present | Part 16 gives naive rule; real implementation needed |
| W2. CMU dict coverage gap | Still present | Threshold not quantified |
| W3. validate_shadowing.sh not built | Still present (P1 tool, not yet implemented) | Part 22 lists as first script |
| W4. vi translated independently unverified | Still present (vi generation at L4) | Part 13.3 specifies L4 vi generation, not L3 |
| W5. v2→v3 corrections migration | Still present (P1 code not built) | Part 22 lists as prerequisite |
| W6. Chunk density not in quality score | Still present | Part 5 still has 7 components, not 8 |
| W7. Highlight regression not tested | Still present | 5-week fixture set exists but highlight interaction untested |
| W8. Syllable edge cases | Still present | Hyphen package suggested but not required |
| W9. Non-deterministic tie-breaking | Still present | Seed spec not added |
| W10. vi translation source spec missing | Still present | Referenced at L4 vi generation |

### New in v1.2

| Risk | Description | Mitigation |
|------|-------------|------------|
| **R11. L1 capture for 31 videoIds** | Must re-extract YouTube transcripts for all 31 unique videos in W1-W35. Some may have been removed or captioned differently since original extraction. | Fetch early; if unavailable, use Whisper fallback or escalate to PO |
| **R12. L2 re-cleaning may differ from current** | Running `clean_transcripts.mjs` on fresh L1 may produce different results than the original L2 (due to code changes since original clean). | Run L2 integrity check (Part 0.7) before and after; diff the two |
| **R13. L3 segmentation for ADV/EASY may require manual review** | Part 16 rules are mechanical; some sentences may need manual split/merge judgment. | Run L3 → validate → manual QA (Part 17 review mode) |
| **R14. Storage layout change** | New directories `original/`, `learning/`, `shadowing/` require migration of existing files. | Script migration: `original/` = new fetch; `learning/` = new; `shadowing/` = move existing `week_NN/` files to `{videoId}_{MODE}.js` naming |
| **R15. Content_en coupling to read.js not in scope** | L4.content_en must match read.js (CHECK 42). v1.2 doesn't change this coupling, but doesn't resolve it either. | Same as v1.1 W4 — out of scope for shadowing runtime |
| **R16. "Never rebuild from existing shadowing.js" may slow emergency fixes** | If a week is broken and L1 must be re-extracted, the repair takes longer than a direct L4 patch. | Emergency PO override: Part 15.1 allows PO to bypass L1-L3 for hotfixes (with logging) |

---

## 8. Architectural improvement summary

| v1.1 weakness | v1.2 resolution |
|---------------|-----------------|
| Repair started from corrupted shadowing.js | Repair now starts from L1 (original video) |
| No separation of ASR repair from educational segmentation | L2 (ASR) and L3 (segmentation) are distinct layers |
| `shadowing.js` was simultaneously "source of truth" and "derived artifact" | L4 is explicitly derived from L3 + L2; L1 is the permanent source |
| Decision Matrix was flat (no layer awareness) | Decision Matrix now includes layer column + workflow column |
| Repair vs Rebuild was "fix text" vs "regenerate everything" | Repair = fix L4 metadata; Rebuild = regenerate L1→L4 |
| Long-term storage not specified | All 4 layers stored permanently (~3 MB total) |
| No integrity checks between layers | Part 0.7 specifies 6 integrity checks (L1→L2, L2→L3, L3→L4) |
| Anti-patterns not documented | Part 0.9 lists 7 anti-patterns with correct alternatives |

---

## 9. APPROVED

**APPROVED_FOR_USE = YES**

v1.2 is the **canonical runtime specification** for the Shadowing Repair Agent. It addresses the fundamental architectural flaw in v1.1 (repair starting from corrupted source) and provides a complete, layer-aware model for both repair and production.

### What makes v1.2 ready

- ✅ 4-Layer model is well-defined with permission matrix and integrity checks
- ✅ Repair vs Rebuild is unambiguous and grounded in the 4-layer model
- ✅ Source of Truth hierarchy has dual categories (repair-time + runtime)
- ✅ Decision Matrix covers 35+ symptoms with layer + workflow
- ✅ Long-term storage preserves all 4 layers for future improvement
- ✅ v1.2 is backward-compatible with v1.1 (superset, not replacement)
- ✅ Anti-patterns explicitly documented
- ✅ Migration plan from v1.1 (Part 0.10) is clear

### What remains unready (not blocking)

- P1 tools not implemented (validate, repair, regenerate, IPA, generate)
- Syllable counting needs real implementation (Part 16)
- v2→v3 corrections migration not coded
- W11 L1 re-extraction may fail (YouTube captions may have changed)
- L3 segmentation for W11 (68→10 sentences) requires human curation
- Chunk density not in quality score
- Highlight regression test not in fixture set

### Next step

Implement the L1 capture and L2/L3 re-extraction tools (Part 0.10 migration plan), then begin Phase 1 repair (W11 + W35 ADV) using the v1.2 4-layer model.
