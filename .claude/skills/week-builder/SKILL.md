---
name: week-builder
description: Produces a complete week of EngQuest3K content (16 files) using the 11-step production workflow. Use when asked to create, build, produce, or scaffold a new week. Always specify which week number when invoking.
---

# Week Builder

Orchestrate the full week-production workflow for a single EngQuest3K week.

## When to invoke

- User says "build week 40", "create W40", "produce week 36", "tạo tuần 38"
- User says "continue week production" and a specific week is in scope
- NOT for: editing one file in an existing week (use normal editing flow)

## Pre-flight

1. Read `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` (the authoritative 11-step checklist)
2. Read the relevant week's section from `production_kit/reference/Syllabus_V5_PublicationReady.docx`
3. Determine golden standard week: **W1-W15** -> clone from `week_06`; **W16+** -> clone from `week_16`

## Workflow (condensed)

### BƯỚC -1: Pre-flight system check
```bash
bash production_kit/tools/preflight_check.sh
```

### BƯỚC 0: Read Syllabus + Blueprint
Identify: grammar focus, vocab list, reading topic, writing task, all stations.

### BƯỚC 0.5: Clone from golden standard
```bash
cp -r src/data/weeks/week_16/ src/data/weeks/week_NN/
cp -r src/data/weeks_easy/week_16/ src/data/weeks_easy/week_NN/
cp src/data/weeks/week_16_real.js src/data/weeks/week_NN_real.js
```
Then edit each file to match the target week's Syllabus spec.

### BƯỚC 1-5: Content creation
For each of the 16 files, replace golden-stand content with target-week content.

### BƯỚC 6: Validators (all must pass)
```bash
bash production_kit/tools/bug_prevention_check.sh N
bash production_kit/tools/code_quality_gate.sh N
node production_kit/tools/validate_sgmath_types.mjs N
node tools/validate_barmodels.js N
node tools/validate_video_thumbnails.js N
npm run content:lint -- --week N --errors-only
```

### BƯỚC 7: Build
```bash
npm run build
```

### BƯỚC 8: Audio (if no audio yet)
```bash
python3 tools/generate_audio_deepgram.py N --upload
```

### BƯỚC 9: Images (if no images yet)
```bash
node tools/image_pipeline/orchestrator.mjs --week N
```

### BƯỚC 10: E2E smoke
```bash
TEST_WEEK=N npx playwright test --grep "Smoke" --project=chromium
```

## Report (return at end)

```
## Week N Complete
- Files created: <list>
- Files modified: <list>
- Validators: all PASS / list FAIL
- Build: PASS / FAIL
- Audio: generated N MP3s / skipped
- Images: generated N images / skipped
- Open items: <list or "None">
```
