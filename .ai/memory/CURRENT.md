# 🧠 Current System State & Context

## Model Configuration
Settings in `.claude/settings.local.json`:
- `ANTHROPIC_MODEL`: `agentgw-opus-4-8` (default session)
- `DEFAULT_OPUS_MODEL`: `agentgw-opus-4-8` (hard tasks: multi-file bugs, architecture)
- `DEFAULT_SONNET_MODEL`: `agentgw-gpt-5.5-xhigh` (routine: read/edit/grep)
- `DEFAULT_HAIKU_MODEL`: `agentgw-fable-5` (lightweight tasks)

## System Status
- **AgentOS**: v2 (active)
- **PostToolUse hook**: Active (lint + build + rollback)
- **Memory system**: Manual update via `node scripts/update_memory.js`

## Recent Work (July 2026)

### Shadowing Station (Major Refactor)
- **Batch pipeline**: 36 weeks APPROVED (W1-W36)
- **Deepgram timestamp alignment**: 35 weeks complete
- **LLM-powered sentence splitting**: 99/99 files clean
- **Transcript fixes**: W7/W10/W12/W16/W27/W34 restored
- **Video alignment**: Syllabus-aware video selection working

### Scripts Created
- `scripts/mass_updater.cjs` — Pipeline: search + eval + format
- `scripts/sync_timestamps.cjs` — Deepgram timestamp alignment
- `scripts/split_with_llm.cjs` — LLM sentence splitting
- `scripts/fix_sentence_formatting.cjs` — Regex cleanup
- `scripts/llmClient.cjs` — LLM API client (fable-5 → Groq)

### Validation Scripts
- `production_kit/tools/bug_prevention_check.sh` — 13 checks
- `production_kit/tools/code_quality_gate.sh` — 48 checks (C-01→C-48)
- `production_kit/tools/validate_sgmath_types.mjs` — Singapore Math types
- `tools/validate_barmodels.js` — Bar model paths
- `tools/validate_video_thumbnails.js` — Video thumbnails

---

## Auto Status (auto-updated on commit)

**Updated:** 2026-07-31T06:16:32.952Z
**Branch:** `main`
**Working tree:** Dirty
**Last commit:** eac9692a fix: literal \n in JSON files causing build failure (2026-07-31)

### Recent commits
```
eac9692a fix: literal \n in JSON files causing build failure
e12d58c3 fix: LLM-powered sentence splitting — 99/99 files clean
3a7b2224 fix: restore clean text + preserve Deepgram timestamps
53b03a7b fix: restore correct timestamps + fix split_with_llm.cjs
d9361c50 feat: LLM-powered sentence splitting for all 94 sentence files
```

### Active Tasks
- No active tasks

### Pending Items (from manual section)
- None
