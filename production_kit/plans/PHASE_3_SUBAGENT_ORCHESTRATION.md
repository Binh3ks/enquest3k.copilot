# Phase 3 — Subagent Orchestration + Prompt Cache

> **Status:** In progress (2026-07-10)
> **Completed:** Item 1 (week-pipeline Skill built, auto-registered)
> **Pending:** Item 2 (prompt cache test requires explicit Bash permission)

## Item 1: Subagent Chain for Week Pipeline

### Problem solved

Today: Claude runs week production as one monolithic task — reads Syllabus, writes 16 files, runs validators, reports. All happens in ONE context window, which means:

- After writing 16 files, context is ~80-120K tokens consumed by file content
- Validator output adds another 10-20K tokens
- If something fails, Claude has to re-read files it already wrote to debug → context grows

With subagent orchestration:
- Content-writer agent writes files (separate context)
- Quality-reviewer agent validates files (separate context)
- Parent orchestrator coordinates without being polluted by content details

### Architecture

```
User: "Build week 36"
    ↓
Orchestrator (main context — ~2K tokens)
    ↓
Agent(content-writer, prompt="Produce W36 using Syllabus, golden standard W16")
    ↓ (returns file list + validator results)
Agent(quality-reviewer, prompt="Validate W36 — run all 7 validators")
    ↓ (returns pass/fail report)
Orchestrator → "Week 36 complete, 16 files created, all validators PASS"
```

Key constraint: content-writer MUST run first (it creates the files); quality-reviewer MUST run after content-writer (it validates the files). These cannot be parallelized for the same week.

### Implementation

**Option A: A Skill that describes the orchestration**

```yaml
name: week-pipeline
description: Orchestrates week production using subagents. Creates content via content-writer, validates via quality-reviewer, reports consolidated results.
```

This skill loads into context and instructs Claude to use Agent() calls in sequence. The actual execution is still by Claude Code's Agent tool — the skill just provides the workflow spec.

**Option B: Direct Agent() calls in conversation**

No skill needed — the user just says "build week 36" and Claude chains Agent() calls. Less reproducible but no infrastructure.

**Recommendation**: Option A (skill) — it encodes the orchestration pattern and reuses across sessions.

### Exit criteria

- [ ] `.claude/skills/week-pipeline/SKILL.md` exists
- [ ] Demonstration: run week-pipeline on a test week, observe subagent output
- [ ] Parent context stays < 10K tokens (verified via context summary)

---

## Item 2: Prompt Cache Investigation

### Current state

| Property | Value |
|---|---|
| Base URL | `https://api.nkq.vn` |
| Model | `claude-opus-4-7` |
| System prompt sent | CLAUDE.md (~8K tokens) + system rules |
| User message content | Variable (file reads, grep, etc.) |

### What prompt caching does

Anthropic's prompt caching caches repeated prefixes on the server:
- First API call: full token cost
- Second+ API calls with same prefix: cached portion costs 0.1x input price

If CLAUDE.md + system rules = 8K tokens, and every message re-sends them, caching saves ~90% of that 8K per message.

### How to test

Check if the proxy passes `cache_control` headers. Send a test request:

```bash
curl -X POST https://api.nkq.vn/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: AGOP-CBA7-2D25-BC71" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-haiku-4-6",
    "max_tokens": 20,
    "system": [
      {
        "type": "text",
        "text": "You are a concise assistant.",
        "cache_control": {"type": "ephemeral"}
      }
    ],
    "messages": [{"role": "user", "content": "Say the number 42 and nothing else."}]
  }'
```

Look at response `usage` object:
- `"cache_creation_input_tokens": 42` → caching WAS created (first call)
- `"cache_read_input_tokens": 0` → not read yet (expected on first call)
- Send same request again: if `cache_read_input_tokens > 0` → caching works ✅

If `usage` has no `cache_*` fields → proxy strips `cache_control` → caching NOT supported.

**Note**: classifier blocked this curl in automatic mode (2026-07-10). Run manually or add to settings.json permissions.

### What to do if supported

Nothing immediately — Claude Code already sends stable system prompts. The cache should activate automatically if the proxy doesn't strip `cache_control`. The real benefit is:
- Reduced cost per message (90% discount on cached portion)
- Faster response time (cached portion read from disk, not computed)

### What to do if NOT supported

Ask NKQ proxy maintainer to enable `cache_control` passthrough. If they can't:
- Consider moving to `api.anthropic.com` directly for expensive sessions
- Or accept the cost — 8K tokens per message is ~$0.24 at Opus pricing, not the bottleneck

### Exit criteria

- [ ] Proxy tested with `cache_control: ephemeral` — pass/fail
- [ ] If supported: documented in CURRENT.md
- [ ] If not supported: documented, no further action needed

---

## Phase 3 scope (NOT in this phase)

These are Phase 4+ items, kept here for reference:

- **AgentOS merge (9→3 files)**: Consolidate `.ai/architecture/` — deferred because current 9-file structure works and no one's complained
- **GitNexus**: Duplicate of GitHub MCP functionality — skip until GitHub MCP is needed
- **LSP setup**: Wait for Claude Code native LSP support or ecosystem maturity
