---
name: week-pipeline
description: Chains subagents to produce and validate a week of EngQuest3K content. Content-writer creates files, quality-reviewer validates. Use when building a complete week from Syllabus. Audio is on-demand (no batch step).
---

# Week Pipeline — Subagent Orchestration

Chain content-writer + quality-reviewer subagents to produce and validate a week.

## When to invoke

- User says "build week N via pipeline", "produce W36 via pipeline"
- For complete week production with isolated content creation + validation
- NOT for: editing one file (use normal editing), or validation only (use `/content-check`)

## Orchestration sequence

### Step 0: Pre-flight (Claude main context)

Read Syllabus for target week. Identify: grammar focus, vocab list, reading topic, writing task, question count (W17+: 4 questions).

### Step 1: Content-writer subagent

```python
Agent(
    subagent_type="content-writer",
    prompt="""
    Produce week N for EngQuest3K.
    - Clone from src/data/weeks/week_16/ (ADV) and src/data/weeks_easy/week_16/ (Easy)
    - Clone AI Tutor: cp src/data/weeks/week_16_real.js src/data/weeks/week_N_real.js
    - Syllabus: production_kit/reference/Syllabus_V5_PublicationReady.docx
    - W28+: ≥10 multi-word chunks per read.js passage, canonical-longest bold policy for W36+
    - W17+: 4 comprehension questions per read.js (not 3)
    - grammar.js: exactly 20 exercises, answer: not correct:
    - voiceConfig in index.js: 5 distinct voices
    - After each file edit, hook auto-validates (content_lint, sgmath types, dict lint)
    
    5-FEATURE DATA CONTRACTS (v2.0.0):
    - vocab[] in reading_hub.js: EXACTLY 20 items with word, definition_en, definition_vi (SRS Leitner auto-enrollment)
    - clil_article.inference_questions[] in reading_hub.js: ≥2 items (≥3 for W113+)
      - At least 1 × mcq_with_evidence (with options[], correct index, scaffoldHint)
      - At least 1 × open_response (with modelAnswer, acceptableKeywords[])
      - Question id format: "infer_1", "infer_2", etc.
      - Question text format: "Why did [character]...?" or "What can we learn...?"
    - retellData.questions[].chips[] in reading_hub.js: Linear Thinking ESL collocation chunks
    - Reference template: production_kit/templates/template_flyers_rotary.js (or appropriate template for week range)
    """
)
```

### Step 2: Quality-reviewer subagent

```python
Agent(
    subagent_type="quality-reviewer",
    prompt="Validate week N — run full 7-validator chain"
)
```

### Step 3: Post-validation (Claude main context)

- Generate bar models: `python3 tools/generate_logiclab_barmodels.py N --skip-existing`
- Validate: `node tools/validate_barmodels.js N`
- Update videos: `node tools/update_videos.js N --reset`
- Validate thumbnails: `node tools/validate_video_thumbnails.js N`
- Generate images: `node tools/image_pipeline/orchestrator.mjs --week N`
- **[W33+] Listening P1 Pins**: Tạo ảnh scene → deploy → dùng 🎯 Calibrate Pins tool trên browser → copy JSON → paste vào `listening_hub.js` (xem skill `listening-p1-pins`)
- Fetch transcripts: `node tools/fetch_video_transcripts.js --only N` (if new video)
- Clean + split: `node tools/clean_transcripts.mjs && python3 tools/split_transcripts.py`
- **5-Feature compliance**: `node scripts/gate18_feature_compliance.mjs N`
- Build: `rm -rf node_modules/.vite dist && npm run build`

**Audio is on-demand** (no batch generation for W16+). The Deepgram Worker generates + caches on first user play.

### Step 4: Decision

- Quality-reviewer **SHIP** → build + commit
- Quality-reviewer **FAIL** → fix specific errors, re-run only the failing validator

## Context budget

| Step | Context | Notes |
|---|---|---|
| Step 0 (pre-flight) | ~3K | Read Syllabus |
| Step 1 (content-writer) | 80-120K | SEPARATE context |
| Step 2 (quality-reviewer) | 20-40K | SEPARATE context |
| Step 3-4 (post-validation + decision) | ~10K | Parent runs scripts + reads results |
| **Total parent** | **~16K** | vs ~150K without subagents |

## Report format

```markdown
## Week N Pipeline Complete

| Step | Status | Detail |
|---|---|---|
| Pre-flight | ✅ | Syllabus read |
| Content-writer | ✅/❌ | 39 files created (19 ADV + 19 Easy + 1 Real) |
| Quality-reviewer | ✅/❌ | 7/7 validators PASS |
| Gate 18 (5-feature) | ✅/⚠️ | inference_questions, vocab SRS, retell chips |
| Bar models | ✅/⏭ skipped | N images generated |
| Daily watch | ✅ | N videos found |
| Images | ✅/⏭ | N generated, R2 uploaded |
| Transcripts | ✅/⏭ | fetched/cleaned |
| Build | ✅/❌ | npm run build |
| Audio | N/A | on-demand (no batch step) |

**Decision: SHIP / FIX-THEN-SHIP / BLOCKER**
```
