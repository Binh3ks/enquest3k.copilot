# 🤖 OpenHands / Devin Startup Workflow

## 1. Context Synchronization
Before executing ANY task or investigation, you MUST:
1. Read `.ai/AGENTOS_SPEC.md` to understand your execution boundaries.
2. Read `.ai/memory/CURRENT.md` to synchronize with the current system state.
3. Read `.ai/tasks/ACTIVE.md` to verify if your assigned bug/task matches the active context.

## 2. Quality Gates & Cooperation
- Do not conflict with Claude Code active workflows.
- After fixing a bug, you MUST append details to `.ai/decisions/DECISIONS_LOG.md`.
- Run `bash production_kit/tools/bug_prevention_check.sh` before pushing any changes.
