# Week Production Runtime
> Phase 1 — `.ai/agents/week-production/`

---

## What This Is

The Week Production Runtime is the **single entry point** for all future EngQuest3K
week production sessions. It does not generate content or own business rules. It
orchestrates existing authoritative artifacts — the canonical workflow, validators,
golden standards, and schemas — that already exist in the repository.

## Entry Point

Any agent tasked with producing a new week should begin here:

```
.ai/agents/week-production/README.md  →  links to all runtime files
.ai/agents/week-production/PROCESS.md  →  production phases
.ai/agents/week-production/CONTEXT.md  →  what to load and in what order
.ai/agents/week-production/SOURCE_OF_TRUTH.md  →  authoritative sources by topic
```

## Scope

This runtime covers the production of one week's content (ADV + Easy mode),
from pre-flight check through git commit.

It does not cover:
- Feature development
- Bug fixes
- QA workflow (separate skill)
- Subagent orchestration (separate skill)

## Constraints

- This runtime does not duplicate prompts, validators, schemas, or rules.
- All content-generation logic lives in the canonical workflow skill.
- All validation logic lives in the content-check skill.
- Business rules are owned by `production_kit/never_rules/`.
