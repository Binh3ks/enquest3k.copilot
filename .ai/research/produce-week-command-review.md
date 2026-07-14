# produce-week Command Review
> Reviewing `.claude/commands/produce-week.md`. 2026-07-13.

---

## Duplication Check

### Business logic
**NONE.** The command contains no business rules. It does not define grammar rules,
vocab constraints, question count rules, bold policies, or any content-authoring logic.
All such rules are owned by `production_kit/never_rules/` and the canonical workflow
skill, and are only referenced by path.

### Validation rules
**NONE.** The command does not redefine any of the 7 validators. It references
`VALIDATION_PIPELINE.md` (which references the content-check skill). No validator
logic, pass/fail thresholds, or validation commands are duplicated.

### Schemas
**NONE.** The command does not define any file schemas. Week file schemas are owned
by the golden standards (`src/data/weeks/week_36/` and `src/data/weeks_easy/week_36/`),
referenced by CONTEXT.md and PROCESS.md. The command references those documents.

### Workflow logic
**NONE.** The command does not duplicate the 11-step production workflow. It
references `EXECUTION_FLOW.md` for the execution sequence and `PROCESS.md` for
phase detail. The canonical BƯỚC steps are owned by the week-builder SKILL.

---

## Reference Checks

### Runtime referenced correctly
**YES.** Step 2 lists all 9 runtime files explicitly. Step 3 directs the agent
to load CONTEXT.md for the production context loading order. Step 4 references
EXECUTION_FLOW.md for the Stage Map. Step 5 references CHECKPOINTS.md for
gate conditions.

### Canonical workflow referenced correctly
**YES.** The command states in step 3 and in the mandatory rules:
- "Always reference the canonical workflow skill for concrete commands"
- References `.claude/skills/week-builder/SKILL.md` as the source of truth

### Validation pipeline referenced correctly
**YES.** Step 7 references `VALIDATION_PIPELINE.md` and the quality-reviewer
subagent. The command does not duplicate validator names, commands, or outcomes.

---

## Completeness Check

The command covers all 8 required actions:
1. Validate week number ✓
2. Load the Week Production Runtime ✓
3. Load required production context ✓
4. Start canonical production workflow ✓
5. Follow runtime execution flow ✓
6. Respect checkpoints ✓
7. Execute validation pipeline ✓
8. Produce completion summary ✓

---

## Issues Found

None.

---

## Final Assessment

**PASS — No duplication found.**

The command is a pure launcher. It validates input, loads the runtime, loads
context, then delegates to the authoritative sources. It adds no business logic,
no validation rules, no schemas, and no workflow steps of its own.
