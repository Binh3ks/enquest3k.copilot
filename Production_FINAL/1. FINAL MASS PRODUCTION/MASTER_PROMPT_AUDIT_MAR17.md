# 🔍 MASTER PROMPT AUDIT & FIXES — MAR 17, 2026

**Triggered By:** User detected misunderstandings about TTS workflow + guide organization concerns

---

## ✅ ISSUES FIXED

### 1. ❌ **Audio Pre-Generation Misunderstanding** → ✅ CLARIFIED

**Problem:**
- Agent suggested pre-generating 30 audio files for Week 16
- Proposed `generate_audio_batch.sh` scaffolding tool
- **Reality:** Audio is on-demand TTS (since Week 14)

**Root Cause:**
- Master prompt section "Audio Generation" (lines 150-400) describes OLD Week 1-13 workflow
- V5.3 header mentions "Deepgram Worker API" but buried in long document
- No prominent WARNING that audio is on-demand

**Fix Applied:**
- ✅ Added **"AUDIO IS ON-DEMAND"** section to README (prominent placement)
- ✅ Deleted `SCAFFOLDING_TOOLS_GUIDE.md` (unnecessary for audio on-demand)
- ✅ Clarified TTS architecture: Frontend → Worker → R2 cache → Deepgram API (auto)

**How It Works Now:**
```
Student clicks audio → Frontend sends (text + path) to Worker
                    ↓
Worker: https://engquest-tts-worker.binhkhoi08.workers.dev/tts
                    ↓
Check R2 cache (pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev)
                    ↓
If cached → return instantly (< 100ms)
If not → Deepgram API → save R2 → return (300-500ms first time)
```

**Confirmed in Code:**
- `src/services/ai_tutor/ttsEngine.js` line 97: `TTS_WORKER_URL` defined
- `src/services/ai_tutor/ttsEngine.js` line 100: `R2_CDN_URL` defined
- Worker handles: Cache check → API call → R2 upload (all automatic)

**Production Impact:**
- ✅ **NO audio file upload** needed during Week 16-144 production
- ✅ **Define audio paths** in schema (e.g., `/audio/week16/vocab_1.mp3`)
- ✅ **Worker auto-generates** on first student request
- ⚠️ **Images still need upload** to R2 manually

---

### 2. ❌ **W35+ Guide Reference Sai** → ✅ FIXED

**Problem:**
- `0. NEW_AGENT_ONBOARDING_PROMPT.md` line 119 referenced: `W35_SUB_TAB_LAUNCH_GUIDE.md`
- **Reality:** File doesn't exist → actual file is `W35_PLUS_ENHANCED_STRUCTURE_GUIDE.md` (520 lines)

**Fix Applied:**
- ✅ Updated onboarding prompt line 119-131
- ✅ Added complete W35+ structure details:
  - UI components (TabbedLogicLab, TabbedReadExplore, 3 display sub-components)
  - 7-file structure (vs old 3 files)
  - Template reference (Week 16 complete)
  - Production workflow (4 phases)

**Now References:**
```markdown
### Week 35+ SUB-TAB LAUNCH (BIG BANG)
- **Reference:** `W35_PLUS_ENHANCED_STRUCTURE_GUIDE.md` (MANDATORY READ - 520 lines)
- **Critical Changes:**
  - Read & Explore: Dual tabs → TabbedReadExplore.jsx
  - Logic Lab: Triple tabs → TabbedLogicLab.jsx
  - Total: 7 files per week (vs old 3 files)
```

---

### 3. ❌ **W40+ Debate Reference Thiếu Chi Tiết** → ✅ ENHANCED

**Problem:**
- Onboarding mention `W40_DEBATE_LAUNCH_GUIDE.md` but no details about 2-tier system
- Missing: Simple vs Formal debate differences

**Fix Applied:**
- ✅ Updated onboarding prompt with 2-tier breakdown:
  - Tier 1 (W40-112): Simple debates (friendly AI, dynamic topics)
  - Tier 2 (W113-144): Formal debates (Devil's Advocate, 3 fixed topics, 5 phases)
- ✅ Reference correct file: `DEBATE_2TIER_IMPLEMENTATION_SUMMARY.md`

---

### 4. ❌ **README Thiếu W35+ Section** → ✅ ADDED

**Problem:**
- README listed folder structure but no mention of W35+ enhanced structure importance
- No quick guidance on when to use which guide

**Fix Applied:**
- ✅ Added **"ROOT-LEVEL GUIDES"** section with 2 critical guides:
  - `W35_PLUS_ENHANCED_STRUCTURE_GUIDE.md` (READ FOR W16-144)
  - `DEBATE_2TIER_IMPLEMENTATION_SUMMARY.md` (READ FOR W40-144)
- ✅ Added **"QUICK START FOR AGENT"** with 3 scenarios:
  - Week 1-15 (Standard)
  - Week 16-34 (Transition)
  - Week 35-144 (Enhanced)
- ✅ Added **"AUDIO IS ON-DEMAND"** section (prominent warning)
- ✅ Added **"PRODUCTION ROADMAP"** (4 phases with timelines)

---

### 5. ❌ **Scaffolding Tools Guide Không Cần** → ✅ DELETED

**Problem:**
- Created `SCAFFOLDING_TOOLS_GUIDE.md` with:
  - `scaffold_week_35plus.js` (auto-generate 7-file structure) → **CÓ THỂ HỮU ÍCH**
  - `validate_week_structure.js` (check file counts) → **CÓ THỂ HỮU ÍCH**
  - `generate_audio_batch.sh` (batch audio) → **KHÔNG CẦN** (audio on-demand)

**Decision:**
- ❌ **Deleted entire file** vì:
  - 2/3 nội dung là về audio generation (không còn đúng)
  - Scaffolding for data structure có thể hữu ích NHƯNG chưa implement
  - Nếu cần scaffold → tạo sau khi có requirement rõ ràng

**Alternative:**
- Agent có thể clone Week 16 structure (template đã hoàn chỉnh)
- Manually create 7 files nhanh hơn viết + test scaffolding tool

---

## 📊 GUIDE ORGANIZATION ANALYSIS

### Current Structure (26 Files)

**Folder Breakdown:**
- `1_CORE_WORKFLOW/` — 4 files (onboarding, master prompt, checklist, quick ref)
- `2_REFERENCE_DOCS/` — 5 files (blueprint, syllabus, STEM guide, etc.)
- `3_VALIDATION/` — 2 files (validation tables, templates)
- `4_LAUNCH_GUIDES/` — W35/W40 guides
- `5_TECHNICAL/` — Architecture docs
- `6_LESSONS_LEARNED/` — Post-mortems
- **Root:** 5 files (README, W35 guide, Debate summary, Production summary, old scaffolding guide)

### ✅ **RECOMMENDATION: KEEP MODULAR**

**Why NOT Consolidate?**
1. **Separation of Concerns:**
   - W35+ guide (520 lines) focuses ONLY on enhanced structure
   - Debate guide focuses ONLY on debate system
   - Master prompt (7345 lines) already too long
   
2. **Easier Navigation:**
   - Agent reads ONLY what's needed for current week
   - Week 20 → reads standard workflow (no W35+ clutter)
   - Week 38 → reads W35+ guide (prepare for launch)
   - Week 45 → reads Debate guide (prep Mission 3)

3. **Incremental Learning:**
   - New agent: Read onboarding → quick ref → start W1-15
   - Experienced agent: Jump to W35+ guide when reaching Week 35
   - Context-specific: No cognitive overload from 10,000-line mega-file

4. **Modular Updates:**
   - Fix W35+ issues → edit ONE file (520 lines)
   - Fix debate bugs → edit ONE file (debate summary)
   - No risk of breaking other sections

5. **Reference Citations:**
   - Clear file names = easy references in prompts
   - "See W35_PLUS_ENHANCED_STRUCTURE_GUIDE.md" → agent knows what to read
   - Consolidated = agent must search through 15,000 lines

### ❌ **CONSOLIDATION RISKS:**

**If we merge all guides into master prompt:**
- 🚨 **Size:** 15,000+ line file (hard to navigate, slow to load)
- 🚨 **Maintenance:** Fixing W35 bug requires reading 15K lines context
- 🚨 **Cognitive Load:** Agent sees W113 debate info when working on W20
- 🚨 **Version Control:** Every small fix = massive git diff
- 🚨 **Search Overhead:** Finding "Singapore Math schema" in 15K lines vs 520 lines

### ✅ **CURRENT PHILOSOPHY: "Just-In-Time Documentation"**

**Week 1-15:**
- Read: Onboarding + Quick Ref + Master Prompt (W1-15 section)
- Skip: W35 guide, Debate guide (not relevant yet)

**Week 16-34:**
- Read: All of above + SKIM W35 guide (prepare mentally)
- Action: Continue standard structure (no changes yet)

**Week 35-39:**
- Read: W35 guide IN DETAIL (520 lines, implement now)
- Action: Switch to 7-file structure, deploy dual/triple tabs

**Week 40-112:**
- Read: All of above + Debate guide (simple tier)
- Action: Add debate_config to Mission 3

**Week 113-144:**
- Read: Debate guide (formal tier section)
- Action: Implement 5-phase formal debates

---

## 🎯 MASTER PROMPT UPDATE PLAN (NOT DONE YET)

**Options:**

### Option A: Add Short W35+ Section to Master Prompt (RECOMMENDED)
**Location:** After "NEW IN V5.3" section (line ~150)
**Content:** 50-line summary with reference to detailed guide
```markdown
## 🔥 WEEK 35+ ENHANCED STRUCTURE (MAR 2026)

**🎯 CRITICAL FOR W16-144 PRODUCTION:**

Starting Week 35, structure changes from 14 stations to 7-file enhanced structure:
- Read & Explore: 2 files → 4 files (read_stem, read_social, explore_stem, explore_social)
- Logic Lab: 1 file → 3 files (logic_science [3Q], singapore_math [5Q], social_quiz [7Q])

**MANDATORY READ:** `W35_PLUS_ENHANCED_STRUCTURE_GUIDE.md` (520 lines)
- Complete UI component docs (5 components pre-built)
- Week 16 template (all 7 files, high quality)
- Production workflow (4 phases)
- Content guidelines (STEM/Social vocab, Singapore Math, Social Quiz)

**Template:** Clone Week 16 structure for all W35+ weeks
**Validation:** Check 7 files vs old 3 files

See guide for full details.
```

**Pros:**
- ✅ Adds awareness to master prompt
- ✅ Keeps master prompt concise (50 lines vs 520)
- ✅ Clear pointer to detailed guide
- ✅ Agent knows W35+ exists when reading master prompt

**Cons:**
- ⚠️ Requires editing 7345-line file (risk of breaking formatting)

### Option B: Keep Separate (CURRENT STATE)
**Status:** W35+ guide referenced in:
- ✅ Onboarding prompt (fixed)
- ✅ README (added)
- ❌ Master prompt (not mentioned)

**Pros:**
- ✅ No risk of breaking master prompt
- ✅ Modular (easy to update W35+ guide separately)

**Cons:**
- ⚠️ Agent might miss W35+ guide if only reads master prompt

### Option C: Add to Quick Ref (MIDDLE GROUND)
**Location:** `QUICK_REF.md` line ~300 (after "Review Weeks" section)
**Content:** Same 50-line summary as Option A

**Pros:**
- ✅ Quick Ref is already shorter (1962 lines vs 7345)
- ✅ Agents ALWAYS read Quick Ref before production
- ✅ Low risk of breaking

**Cons:**
- ⚠️ Quick Ref supposed to be "quick" (adding 50 lines)

---

## 🚀 NEXT STEPS (USER DECISION)

### Immediate (DONE ✅):
- ✅ Fix onboarding prompt references (W35 guide, Debate guide)
- ✅ Update README with comprehensive guide structure
- ✅ Delete scaffolding tools guide (audio on-demand)
- ✅ Add "AUDIO IS ON-DEMAND" warning to README

### Pending (USER INPUT NEEDED):

**Question 1: Master Prompt Update**
- **Option A:** Add 50-line W35+ summary to master prompt (line 150)
- **Option B:** Keep separate (current state - guides referenced in README + Onboarding)
- **Option C:** Add to Quick Ref instead (safer)

**Question 2: Images Workflow**
- Images still need manual R2 upload (not on-demand like audio)
- Should we add images workflow to W35+ guide OR keep in MASS_PRODUCTION_CHECKLIST?

**Question 3: Week 16 Template**
- Week 16 already complete (7/7 files, high quality)
- Should we promote Week 16 as "Golden Standard W35+" in all docs?

---

## 📝 TÓM TẮT CHO USER

**Đã fix:**
1. ✅ Xóa scaffolding tools guide (audio on-demand, không cần)
2. ✅ Fix onboarding prompt references (W35 guide name sai)
3. ✅ Update README comprehensive (W35+ section, audio on-demand warning, production roadmap)
4. ✅ Clarify TTS architecture (Worker → R2 cache → Deepgram API auto)

**Guide organization:**
- ✅ **Giữ modular** (26 files) — KHÔNG merge
- ✅ Lý do: Separation of concerns, easier navigation, incremental learning
- ✅ Philosophy: "Just-In-Time Documentation" (đọc khi cần)

**Audio workflow:**
- ✅ **On-demand TTS** (đã có từ Week 14)
- ✅ Worker auto-generate + cache vào R2
- ✅ Không cần pre-generate scripts
- ✅ Chỉ cần define audio paths trong schema

**Images workflow:**
- ⚠️ **Vẫn cần upload R2 manually** (12 images/week: 5 bar models + 7 quiz images)
- ⚠️ Workflow đã có trong MASS_PRODUCTION_CHECKLIST (Nano Banana, R2 upload)

**Quyết định cần user input:**
1. Có cần add W35+ summary vào master prompt không? (Option A/B/C)
2. Có cần update images workflow vào W35+ guide không?
3. Có promote Week 16 làm "Golden Standard W35+" không?

---

**End of Audit — Ready for User Feedback** 🎯
