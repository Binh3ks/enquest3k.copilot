# Sub-Tab Architecture Roadmap

> **Status**: Living document — last updated May 2026
> **Canonical source**: This file is the single source of truth for sub-tab deployment schedule.

---

## Current Status

| Weeks | Structure | read.js | explore.js | Status |
|-------|-----------|---------|------------|--------|
| W1–34 | Single file per mode | `read.js` | `explore.js` | ✅ DEPLOYED |
| W35+  | Sub-tab split | TBD | TBD | ⏳ AWAITING SPEC |

---

## W1–34: Current Production (Active)

Each mode (Advanced / Easy) has exactly **1 read.js + 1 explore.js**:

```
src/data/weeks/week_NN/read.js        # 1 file — story text
src/data/weeks/week_NN/explore.js      # 1 file — CLIL article
src/data/weeks_easy/week_NN/read.js
src/data/weeks_easy/week_NN/explore.js
```

**Golden template**: Week 16 (`week_16/read.js`, `week_16/explore.js`)

**Rule**: When in doubt about sub-tabs, follow this structure until a SPEC.md is provided for W35+.

---

## W35+: Planned Sub-Tab Split (NOT YET DEPLOYED)

### Planned Files Per Mode

```
src/data/weeks/week_NN/
  read_stem.js       # STEM reading (science/technology context)
  read_social.js     # Social studies reading (culture/geography context)
  explore_stem.js    # STEM exploration
  explore_social.js  # Social studies exploration
```

### Trigger Condition

Sub-tab files will be deployed **only when** a dedicated `SUBTAB_SPEC_W35.md` is written with:
- [ ] UI component spec (TabbedReadExplore.jsx tab labels)
- [ ] File schema for each of the 4 new files
- [ ] Vocab distribution (which words go to STEM vs Social)
- [ ] Image prompt strategy for 4 files vs 1 file
- [ ] Quality gate updates required

### Pre-W35 Preparation

While waiting for the spec, production agents should:
- Continue using single `read.js` + `explore.js` for W34 and below
- Not attempt to pre-split content into STEM/Social categories
- Focus on content quality within the current single-file structure

---

## What "NOT YET DEPLOYED" Means

| Aspect | Meaning |
|--------|---------|
| File structure | `read.js` + `explore.js` are the only supported files |
| UI components | `TabbedReadExplore.jsx` expects single files |
| Quality gate | CHECK 37 only validates the current single-file structure |
| Image prompts | Only `week_NN_image_prompts.txt` (1 file) is generated |
| Vocab splitting | All vocab words go into a single `vocab.js` |

**Agent behavior**: If asked to create `read_stem.js` or `read_social.js` before this spec exists, **decline and ask for the spec first**.

---

## Related Documents

- `STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md` — STEM context guidelines (70% Universal / 30% Vietnamese)
- `ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` — Station structure philosophy
- `AGENT_SELF_CHECK_WORKFLOW.md` § W16+ — Current file count (16/mode = single files)

---

## Change Log

| Date | Change |
|------|--------|
| May 2026 | Document created — formalized W35+ as "awaiting spec" |
