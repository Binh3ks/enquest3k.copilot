# ENGQUEST MASS PRODUCTION PROMPTS - README
## How to Use and Update These Prompts

**Created**: January 18, 2026
**Current Version**: V29.0
**Location**: `/MASS_PROMPTS/`

---

## 📁 FOLDER STRUCTURE

```
MASS_PROMPTS/
├── V29_CONTENT_GENERATION.txt      (~1,500 lines) - For Claude to generate 29 files
├── V29_AI_TUTOR_BEHAVIOR.txt       (~800 lines)   - For Gemini/Together AI runtime
├── V29_WORKFLOW_PIPELINE.txt       (~500 lines)   - For developers running scripts
└── README.txt                      (this file)    - Usage instructions
```

**Total**: ~2,800 lines (vs old V28: 5,368 lines = **48% reduction**)

---

## 🎯 WHY 3 SEPARATE PROMPTS?

### Problem with Old V28 (5,368 lines)
- ❌ Too large → AI information overload → Hallucinations (~15-20%)
- ❌ No clear execution order → AI reads wrong section first
- ❌ Mixed concerns → Content rules + Runtime behavior + Workflow steps
- ❌ Hard to maintain → Changes to one section affect unrelated parts

### Solution with New V29 (3 specialized prompts)
- ✅ Smaller prompts → AI focuses only on relevant info → Less hallucinations (~5% expected)
- ✅ Clear execution order → Each prompt has numbered steps
- ✅ Separation of concerns → Update one without touching others
- ✅ Easy maintenance → Know exactly which prompt to update

---

## 📖 WHEN TO USE WHICH PROMPT

### 1. V29_CONTENT_GENERATION.txt
**WHO USES**: Claude (or any AI assistant generating week content)
**WHEN**: Step 1 of mass production (creating 29 files)
**WHAT**: CEFR rules, 14 station schemas, validation checklist

**Example usage**:
```
Copy entire V29_CONTENT_GENERATION.txt to Claude chat, then say:

"Generate Week 5 content following this prompt.
Week 5 theme: Family (from syllabus_database.js)
CEFR level: A0 (Week 1-18 range)"
```

### 2. V29_AI_TUTOR_BEHAVIOR.txt
**WHO USES**: Gemini/Together AI (Ms. Nova runtime)
**WHEN**: Every AI Tutor conversation (injected into system prompt)
**WHAT**: Response format, subject agreement, recast technique, turn management

**Example usage** (in code):
```javascript
// src/services/ai_tutor/novaEngine.js
import { readFileSync } from 'fs';

const systemPrompt = readFileSync('./MASS_PROMPTS/V29_AI_TUTOR_BEHAVIOR.txt', 'utf8');

const response = await geminiAPI.generateContent({
  systemInstruction: systemPrompt + missionContext,
  contents: conversationHistory
});
```

### 3. V29_WORKFLOW_PIPELINE.txt
**WHO USES**: Developers (humans)
**WHEN**: Running mass production pipeline for new weeks
**WHAT**: 9-step workflow, tool commands, troubleshooting guide

**Example usage**:
```bash
# Developer opens this file as reference guide
cat MASS_PROMPTS/V29_WORKFLOW_PIPELINE.txt

# Then follows steps 0-9 manually or runs:
bash tools/mass_production_final.sh 5
```

---

## 🔄 HOW TO UPDATE PROMPTS

### Update Workflow (3-Step Process)

#### STEP 1: Identify Which Prompt to Update

| Change Type | Update Prompt |
|-------------|---------------|
| New station schema (e.g., add `reflection.js`) | V29_CONTENT_GENERATION.txt |
| Change CEFR level rules (e.g., A0 now allows "Why") | V29_CONTENT_GENERATION.txt |
| Fix vocabulary requirements (e.g., need 12 words now) | V29_CONTENT_GENERATION.txt |
| Change AI response format (e.g., new JSON field) | V29_AI_TUTOR_BEHAVIOR.txt |
| Update ACK options (e.g., add "Amazing!") | V29_AI_TUTOR_BEHAVIOR.txt |
| Fix subject agreement rules | V29_AI_TUTOR_BEHAVIOR.txt |
| Add new tool to pipeline (e.g., Step 5.5) | V29_WORKFLOW_PIPELINE.txt |
| Change script commands (e.g., new validation) | V29_WORKFLOW_PIPELINE.txt |
| Update troubleshooting guide | V29_WORKFLOW_PIPELINE.txt |

#### STEP 2: Make the Edit

**Example 1**: Add new station to content generation
```
File: V29_CONTENT_GENERATION.txt
Section: III. 14 STATION SCHEMAS

Add after "### 14. video_queries.json":

### 15. reflection.js - Reflection Station

[Schema here]
```

**Example 2**: Change AI Tutor ACK options
```
File: V29_AI_TUTOR_BEHAVIOR.txt
Section: I. RESPONSE FORMAT

Change:
"ONLY 3 options: 'Nice!', 'Great!', 'Wonderful!'"

To:
"ONLY 4 options: 'Nice!', 'Great!', 'Wonderful!', 'Amazing!'"
```

**Example 3**: Add validation step to workflow
```
File: V29_WORKFLOW_PIPELINE.txt
Section: II. MANUAL STEP-BY-STEP WORKFLOW

Add new subsection:
### STEP 2.5: Check Audio URLs ✅

[Instructions here]
```

#### STEP 3: Update Version Number

**Version Format**: `VXX.Y`
- **XX**: Major version (e.g., 29, 30, 31)
- **Y**: Minor version (e.g., 29.1, 29.2)

**When to increment**:
- **Major version** (29 → 30): Breaking changes affecting multiple prompts
  - Example: Complete schema overhaul, new AI provider
- **Minor version** (29.0 → 29.1): Small fixes in single prompt
  - Example: Fix typo, add clarification, update example

**How to update version**:
```bash
# 1. Create new file with updated version
cp V29_CONTENT_GENERATION.txt V29.1_CONTENT_GENERATION.txt

# 2. Edit the new file (change version line at top)
# Line 4: **Version**: 29.0 → 29.1

# 3. Add "Last Updated" note at bottom
# **Last Updated**: 18/01/2026 → 25/01/2026

# 4. Keep old version for reference (don't delete)
# Rename: V29_CONTENT_GENERATION.txt → V29.0_CONTENT_GENERATION.txt
```

**Version History Example**:
```
MASS_PROMPTS/
├── V29.0_CONTENT_GENERATION.txt     (original)
├── V29.1_CONTENT_GENERATION.txt     (fixed vocab bug)
├── V29.2_CONTENT_GENERATION.txt     (added reflection.js)
├── V30.0_CONTENT_GENERATION.txt     (major: B1+ debate update)
└── README.txt
```

---

## 📝 UPDATE CHECKLIST

When updating any prompt, verify:

### Before Editing
- [ ] Identify correct prompt file
- [ ] Read current version completely
- [ ] Understand impact of change

### During Editing
- [ ] Update only affected sections
- [ ] Keep execution order intact (Step 1 → Step 2 → ...)
- [ ] Update examples if rules change
- [ ] Add warnings for breaking changes

### After Editing
- [ ] Update version number (VXX.Y)
- [ ] Update "Last Updated" date
- [ ] Test with sample week generation
- [ ] Update this README if process changes

---

## 🧪 TESTING UPDATES

### Test Prompt Updates Before Mass Production

#### Test Content Generation Prompt
```bash
# Use Claude to generate test week (e.g., Week 99 test)
# Follow V29_CONTENT_GENERATION.txt exactly
# Check output matches expectations
# Verify no hallucinations or missing fields
```

#### Test AI Tutor Behavior Prompt
```bash
# Update system prompt in novaEngine.js
# Start dev server: npm run dev
# Open Week 1, Story Mission 1
# Chat with AI for 10 turns
# Verify: ACK variety, subject agreement, recast quality
# Check console logs for fallback rate (<5%)
```

#### Test Workflow Pipeline Prompt
```bash
# Follow V29_WORKFLOW_PIPELINE.txt for new week
# Run steps 0-9 manually
# Verify no errors at each step
# Check final output matches expectations
```

---

## 🚨 CRITICAL WARNINGS

### ⚠️ DO NOT:
1. **Delete old versions** - Keep for rollback if needed
2. **Mix prompt concerns** - Content rules stay in CONTENT, behavior stays in BEHAVIOR
3. **Skip version increment** - Always bump version on edits
4. **Update all 3 prompts** unless change affects all (rare)
5. **Test in production first** - Always test with sample week

### ✅ ALWAYS:
1. **Increment version** on every change (even typo fixes)
2. **Update "Last Updated"** date
3. **Test before using** for real week production
4. **Document reason** for update (in version control commit)
5. **Sync with code** if prompt assumes code changes

---

## 📊 CHANGE LOG TEMPLATE

When updating, add entry to this README:

```
## CHANGE LOG

### V29.1 (25/01/2026) - Minor Fix
**File**: V29_CONTENT_GENERATION.txt
**Change**: Fixed vocab.js example (missing pronunciation field)
**Reason**: Week 5 generation hallucinated without clear example
**Impact**: Content generation only
**Tested**: Week 5 test successful

### V29.0 (18/01/2026) - Initial Split
**Files**: All 3 prompts created
**Change**: Split V28 (5,368 lines) into 3 specialized prompts (2,800 lines)
**Reason**: Reduce AI hallucinations, improve maintainability
**Impact**: All components (content, AI, workflow)
**Tested**: Week 1-4 validation passed
```

---

## 🔗 RELATED FILES

- **Original prompt**: `/ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt` (5,368 lines - deprecated)
- **Context document**: `/docs/MASS/0. MASS_PRODUCTION_CONTEXT.md`
- **Workflow script**: `/tools/mass_production_final.sh`
- **Validation script**: `/tools/validate_week.js`
- **AI Tutor engine**: `/src/services/ai_tutor/novaEngine.js`

---

## 📞 SUPPORT

**Issues with prompts**:
1. Check this README first
2. Review CHANGE LOG for recent updates
3. Test with sample week before reporting
4. Document hallucinations or errors clearly

**Questions**:
- Which prompt to update? → See "WHEN TO USE WHICH PROMPT"
- How to version? → See "Update Version Number"
- How to test? → See "TESTING UPDATES"

---

## 🎯 NEXT STEPS

### For New Developers:
1. Read this README completely
2. Read all 3 prompts to understand system
3. Test with Week 5 generation (following V29_WORKFLOW_PIPELINE.txt)
4. Compare output to Week 1-4 golden standard

### For Production Use:
1. Use V29_CONTENT_GENERATION.txt with Claude for new weeks
2. Ensure V29_AI_TUTOR_BEHAVIOR.txt injected in novaEngine.js
3. Follow V29_WORKFLOW_PIPELINE.txt for complete production
4. Update prompts when bugs found (following this README)

### For Future Enhancements:
1. Monitor hallucination rate (target: <5%)
2. Gather feedback from week production
3. Update prompts based on real-world usage
4. Increment versions systematically

---

**END OF README**
**Version**: 1.0
**Last Updated**: January 18, 2026
**Maintained by**: EngQuest3k Team
