# Context — Week Production Runtime

---

## Loading Order

Load files in this exact order before beginning production.

### Phase A — Orient

1. **`.ai/memory/CURRENT.md`** — current session state, active week number, any in-progress work
2. **`.ai/research/RESEARCH_INDEX.md`** — always read first; confirms which runtime file to load
3. **`.ai/architecture/REPOSITORY_MAP.md`** — folder layout, key paths

### Phase B — Authoritative Workflow

4. **`.claude/skills/week-builder/SKILL.md`** — canonical 11-step production workflow (BƯỚC -1 → 11)
   - Golden standard selection rules
   - Question count rules by week range
   - Chunk-first authoring rules
   - Step-by-step phase commands

### Phase C — Business Rules

5. **`production_kit/never_rules/PRODUCTION_NEVER_RULES.md`** — hard rules that block production if violated
6. **`production_kit/reference/Syllabus_V5_PublicationReady.docx`** — extract grammar focus, vocab list, reading topic, writing task for target week
7. **`production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`** — §VII.b chunk-first authoring rules

### Phase D — Golden Standards

8. **`src/data/weeks/week_36/`** — ADV golden standard (19 files)
9. **`src/data/weeks_easy/week_36/`** — Easy golden standard (19 files)
10. **`src/data/weeks/week_36_real.js`** — AI Tutor data golden standard

### Phase E — Validation

11. **`.claude/skills/content-check/SKILL.md`** — validator chain (run at BƯỚC 5)
12. **`production_kit/tools/preflight_check.sh`** — system integrity check (run at BƯỚC -1)

---

## What NOT to Load

Do not load any file under `Production_FINAL_DEPRECATED/` — these are archived and obsolete.

Do not load `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` as a production entry point — it is deprecated.
