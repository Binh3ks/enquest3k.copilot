# MASS PRODUCTION SYSTEM - ENGQUEST 3K
**Version**: 1.0
**Date**: January 18, 2026
**Purpose**: Generate 156 weeks of content with 4-layer architecture

---

## 📁 FOLDER STRUCTURE

```
MASS/
├── README.md                          ← You are here
├── 4_LAYER_ARCHITECTURE.md            ← Complete system guide
├── BAO_CAO_HOAN_THANH_V29.md          ← V29 completion report
│
├── tools/                             ← LAYER 4: Automation
│   ├── create_week.cjs                ⭐ ONE COMMAND (use this!)
│   ├── generate_spec.cjs              (Spec generator)
│   └── validate_week_v2.cjs           (Validator)
│
├── SPECS/                             ← LAYER 1: Data Source (JSON)
│   ├── week_01_spec.json              (Week 1 locked data)
│   ├── week_05_spec.json              ✅ (Week 5 ready)
│   └── ... (week_06-156 to generate)
│
├── TEMPLATES/                         ← LAYER 2: Structure
│   ├── week_template_canonical.js     (Week 1-3 format)
│   └── week_template_variants.js      (Week 4+ format)
│
└── PROMPTS/                           ← LAYER 3: Instructions (16 files)
    ├── 01_MASTER_ORCHESTRATOR.txt
    ├── 02_CRITICAL_CHANGES.txt
    ├── 03_CEFR_GUIDELINES.txt
    ├── 04_AI_TUTOR_CORE.txt
    ├── 05_AI_TUTOR_SCHEMA_BASIC.txt
    ├── 06_AI_TUTOR_SCHEMA_VARIANT.txt
    ├── 07_AI_TUTOR_EXAMPLES.txt
    ├── 08_STATIONS_CORE.txt
    ├── 09_STATIONS_ADVANCED.txt
    ├── 10_STATIONS_EASY.txt
    ├── 11_STATIONS_EXAMPLES.txt
    ├── 12_ASSET_GENERATION.txt
    ├── 13_WORKFLOW_CORE.txt
    ├── 14_WORKFLOW_VALIDATION.txt
    ├── 15_WORKFLOW_TESTING.txt
    └── 16_GAME_HUB.txt
```

---

## 🚀 QUICK START

### ONE COMMAND to create any week:

```bash
node MASS/tools/create_week.cjs <week_number>
```

**Example: Generate Week 5**

```bash
node MASS/tools/create_week.cjs 5
```

**What it does automatically:**

1. ✅ Check if spec exists (generate if not)
2. ✅ Show AI which prompts to read
3. ✅ Show AI where to find data (spec + template)
4. ✅ Wait for AI to generate content
5. ✅ Validate generated content
6. ✅ Report success or show errors

**That's it! One command for everything.**

---

### Manual workflow (if needed):

```bash
# Step 1: Generate spec only
node MASS/tools/generate_spec.cjs 5

# Step 2: AI generates content (manual)
# AI reads prompts + spec + template
# AI writes: src/data/weeks/week_05_real.js

# Step 3: Validate only
node MASS/tools/validate_week_v2.cjs 5
```

---

## 📊 WORKFLOW DIAGRAM

```
┌─────────────────────────────────────────────┐
│ 1. GENERATE SPEC (Locked Data)             │
│    $ node MASS/tools/generate_spec.cjs 5    │
│    → MASS/SPECS/week_05_spec.json           │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 2. AI GENERATES CONTENT                     │
│    Read: Spec + Template + Prompts          │
│    Write: src/data/weeks/week_05_real.js    │
│    Time: ~40 minutes                        │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 3. VALIDATE (Automated Check)               │
│    $ node MASS/tools/validate_week_v2.cjs 5 │
│    → Schema, CEFR, Cross-refs, Structure    │
│    Time: ~30 seconds                        │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 4. COMMIT (If validation passes)            │
│    git add week_05_real.js                  │
│    git commit -m "Week 5 complete"          │
└─────────────────────────────────────────────┘
```

---

## 🎯 CURRENT STATUS

### ✅ Completed:
- [x] 4-layer architecture designed
- [x] Spec generator tool (Week 1-8 in database)
- [x] 2 templates (canonical + variants)
- [x] 16 V29 prompt files
- [x] Validation pipeline
- [x] Week 5 spec generated

### ⏳ In Progress:
- [ ] Generate Week 5 content (AI)
- [ ] Validate Week 5
- [ ] Test in browser

### 📅 Next:
- [ ] Expand spec database (Week 9-20)
- [ ] Mass generate Week 6-20
- [ Main Tool (Use this!)
```bash
node MASS/tools/create_week.cjs <week_number>

# Creates one complete week with full pipeline
```

### Individual Tools (Advanced)
```bash
# Generate spec only
node MASS/tools/generate_spec.cjs <week_number>

# Validate week only  
node MASS/tools/validate_week_v2.cjs <week_number>

# Bulk generate specs (Week 7-20)
for i in {7..20}; do
  node MASS/tools/generate_spec.cjs $i
done
  node MASS/tools/generate_spec.cjs $i
done
```

### Validate Week
```bash
node MASS/tools/validate_week_v2.cjs <week_number>

# Examples:
node MASS/tools/validate_week_v2.cjs 4   # Test with Week 4
node MASS/tools/validate_week_v2.cjs 5   # Validate new Week 5

# Exit codes:
# 0 = Pass (ready to commit)
# 1 = Fail (errors found, fix needed)
```

---

## 🔑 KEY CONCEPTS

### 4-Layer Architecture

1. **LAYER 1: SPEC (JSON)**
   - Single source of truth
   - Data from syllabus (locked)
   - AI cannot modify

2. **LAYER 2: TEMPLATE (JS)**
   - Empty skeleton
   - Structure locked
   - Placeholders for AI

3. **LAYER 3: PROMPTS (TXT)**
   - 16 instruction files
   - How to write content
   - Examples & rules

4. **LAYER 4: VALIDATION (CJS)**
   - Automated checks
   - 5 validation levels
   - Catch errors early

### Why This Works

| Problem | Solution |
|---------|----------|
| AI hallucinates content | ✅ Spec locks data from syllabus |
| Inconsistent structure | ✅ Template enforces schema |
| Late error detection | ✅ Validator runs before commit |
| Manual oversight needed | ✅ Automated pipeline |
| Token waste | ✅ 96.3% reduction (3K vs 80K lines) |

---

## 📞 SUPPORT

**Questions?**
1. Read: [4_LAYER_ARCHITECTURE.md](4_LAYER_ARCHITECTURE.md)
2. Check: [BAO_CAO_HOAN_THANH_V29.md](BAO_CAO_HOAN_THANH_V29.md)
3. Review: Week 1-4 examples in `src/data/weeks/`

**Next Action**: Generate Week 5 content using this system

---

**Last Updated**: January 18, 2026
