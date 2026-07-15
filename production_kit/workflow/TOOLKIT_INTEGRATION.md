# 🧰 PRODUCTION TOOLKIT — Integration Guide

> **For agents working on W33-W156 mass production.**  
> Maps new toolkit tools to existing workflow steps.  
> **Last updated:** May 21, 2026

---

## 🎯 OVERVIEW: What Was Added

Based on ECC best practices, 4 new tools were created to enhance the existing workflow:

| Tool | Type | Purpose |
|------|------|---------|
| `tools/fix_dictionary_examples.mjs` | Node.js script | Repair broken dictionary examples (mid-sentence cuts, stray **, grammar errors) |
| `production_kit/tools/preflight_check.sh` | Shell script | Automated pre-production system checks (6 tests) |
| `production_kit/tools/bug_prevention_check.sh` | Shell script | Automated bug detection (10 bug patterns) |
| `tests/e2e/week_production.spec.js` | Playwright | Automated UI testing (17 critical flows) |
| `playwright.config.js` | Config | Playwright test configuration |

---

## 🔗 INTEGRATION WITH EXISTING WORKFLOW

### BƯỚC -1: Pre-Production System Check

**ENHANCED with:** `tools/preflight_check.sh`

**Before (manual):**
```bash
# Run 5 separate tests manually...
```

**After (automated):**
```bash
# ONE command replaces all manual checks
bash production_kit/tools/preflight_check.sh
```

**Output includes:**
- ✅ Deepgram API authentication (model: `aura-orion-en`)
- ✅ R2 upload permission test
- ✅ Node.js version check
- ✅ Golden standards existence
- ✅ Git status check
- ✅ Session log creation

**Add to BƯỚC -1:**
```bash
# ENHANCED: Use automated pre-flight check
bash production_kit/tools/preflight_check.sh
# If this passes → proceed to BƯỚC 0
# If this fails → STOP and fix before proceeding
```

---

### BƯỚC 0.5: Mandatory File Verification Protocol

**ENHANCED with:** `tools/bug_prevention_check.sh`

**Before (manual per-file checks):**
```bash
# Run 6 checks manually after EACH file...
```

**After (automated):**
```bash
# ONE command checks ALL files at once
bash production_kit/tools/bug_prevention_check.sh 33
```

**Detects these bugs automatically:**
- B1: **bold** in TTS files (dictation/shadowing)
- B5: Invalid Singapore Math types
- B7: `correct:` field in grammar.js
- B8: Empty grammar answers
- B10: Curly quotes in answer strings
- B11: Easy = Advanced copy-paste detection
- B13: Mindmap hash collision
- B15: ask_ai.js invalid fields
- B17: Missing freetalk_knowledge

**Add to BƯỚC 0.5:**
```bash
# ENHANCED: Run bug prevention check after ALL files created
bash production_kit/tools/bug_prevention_check.sh 33
# If this passes → proceed to BƯỚC 1
# If this fails → STOP and fix specific bugs
```

---

### BƯỚC 5: Browser Test

**ENHANCED with:** Playwright E2E tests

**Before (manual):**
```bash
npm run dev
# Open browser, test each station manually...
```

**After (automated):**
```bash
# Install Playwright (first time only)
npx playwright install --with-deps

# Run E2E tests for specific week
TEST_WEEK=33 npx playwright test --project=chromium

# Or run smoke tests only (fast)
TEST_WEEK=33 npx playwright test --grep "Smoke" --project=chromium
```

**Test coverage (17 tests):**
- Week loading without fallback
- Sidebar shows correct week
- All 6 stations accessible
- Vocabulary station (13 words, audio)
- AI Tutor widget (all 5 tabs)
- Game Hub (Word Chain, etc.)
- Voice playback
- Mindmap rendering
- Grammar station
- Dictation station
- Teacher Panel Lesson Plan
- Console error check

**Add to BƯỚC 5:**
```bash
# ENHANCED: Automated E2E testing
TEST_WEEK=33 npx playwright test --project=chromium
# All tests pass → Week ready for deploy
# Tests fail → Check specific failures
```

---

### BƯỚC 6: Deployment

**ENHANCED with:** Smoke test on production

**Before (manual):**
```bash
git push origin main
# Wait 2 minutes, test manually...
```

**After (automated):**
```bash
# After git push, run smoke test on production
TEST_WEEK=33 BASE_URL=https://engquest3k.com \
npx playwright test --grep "Smoke" --project=chromium
```

---

## 📋 QUICK REFERENCE: ONE-COMMAND WORKFLOW

```bash
# ============================================
# COMPLETE WEEK PRODUCTION — ONE COMMAND FLOW
# ============================================

# 1. Pre-flight check (3 minutes)
bash production_kit/tools/preflight_check.sh || exit 1

# 2. Create content (follow workflow BƯỚC 1-4)
# ... your content creation ...

# 3. Bug prevention check (1 minute)
bash production_kit/tools/bug_prevention_check.sh 33 || exit 1

# 4. Quality gate (2 minutes)
bash production_kit/tools/code_quality_gate.sh 33 || exit 1
npm run content:lint -- --week 33 --errors-only || exit 1

# 5. E2E tests (5 minutes)
TEST_WEEK=33 npx playwright test --project=chromium || exit 1

# 6. Deploy
git add . && git commit -m "Week 33 content" && git push

# ============================================
# TOTAL: ~15 minutes automated validation
# ============================================
```

---

## 🧪 PLAYWRIGHT SETUP

### First-Time Setup
```bash
cd /Users/binhnguyen/Downloads/Engquest3k

# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install --with-deps

# Verify installation
npx playwright --version
```

### Running Tests
```bash
# All tests
npx playwright test --project=chromium

# Specific week
TEST_WEEK=33 npx playwright test --project=chromium

# Smoke tests only (fast)
TEST_WEEK=33 npx playwright test --grep "Smoke" --project=chromium

# AI Tutor tests only
TEST_WEEK=33 npx playwright test --grep "AI Tutor" --project=chromium

# Watch mode (auto-reload)
TEST_WEEK=33 npx playwright test --project=chromium --ui
```

### Test Reports
```bash
# HTML report (opens in browser)
open test-results/playwright-report/index.html

# JSON results
cat test-results/playwright-results.json | jq
```

---

## 🔧 TROUBLESHOOTING

### Playwright Tests Fail
```bash
# Check if dev server is running
curl http://localhost:5173

# Start dev server
npm run dev

# Retry tests
TEST_WEEK=33 npx playwright test --project=chromium
```

### Bug Prevention Check False Positives
```bash
# Check specific bug
grep '\*\*' src/data/weeks/week_33/dictation.js
# If intentionally has ** (rare), add comment: // intentional-bold

# Skip specific check
# Edit tools/bug_prevention_check.sh to comment out specific check
```

### Pre-flight Check Fails
```bash
# Check .env exists
ls -la .env

# Check Deepgram API key
grep DEEPGRAM .env

# Verify R2 auth
npx wrangler whoami
```

---

## 📚 FILES REFERENCE

| File | Location | Purpose |
|------|----------|---------|
| `preflight_check.sh` | `production_kit/tools/` | Automated pre-production checks |
| `bug_prevention_check.sh` | `production_kit/tools/` | Automated bug detection |
| `week_production.spec.js` | `tests/e2e/` | E2E test suite |
| `playwright.config.js` | Root | Playwright configuration |
| `AGENT_SELF_CHECK_WORKFLOW.md` | `1_CORE_WORKFLOW/` | Main workflow (2500 lines) |
| `PRODUCTION_BUG_INSTINCTS.md` | Root | Bug prevention reference |

---

## 🔄 UPDATE SCHEDULE

- **Weekly:** Run `preflight_check.sh` and `bug_prevention_check.sh` for each new week
- **Monthly:** Review and update E2E tests based on new features
- **After schema/template/UI/station changes:** Run `/update-toolkit --apply`
- **As needed:** Update Playwright selectors if UI changes

---

## 🛠️ TOOLKIT UPDATE COMMAND

### `/update-toolkit` — Detect & update toolkit when schemas change

**Run this after ANY of:**
- Adding/changing station structure (src/components/, src/modules/)
- Adding new AI Tutor fields (chunk_focus, knowledge_base, etc.)
- Changing week data schema (index.js station keys, voiceConfig)
- Updating golden standards (week_16/, week_07/)
- Adding new validation rules

**Usage:**
```bash
/update-toolkit          # scan + report (dry-run)
/update-toolkit --apply  # scan + auto-apply updates + refresh baselines
/update-toolkit --audit  # deep audit with commit history
```

**What it detects:**
| Change type | What it checks |
|---|---|
| AI Tutor schema | New required fields in week_XX_real.js |
| Week data schema | Station keys, voiceConfig, weekId changes |
| Station components | New/modified .jsx files in src/components/ or src/modules/ |
| Golden standards | week_16/, week_07/ file changes |
| Validation rules | New B-checks or C-checks needed |
| NEVER rules | New rules detected from schema changes |

**What it auto-updates:**
- `CLAUDE.md` — bug_prevention_check.sh count, AI Tutor rules
- `TOOLKIT_INTEGRATION.md` — last updated date
- Toolkit baselines (`.claude/toolkit-baseline/`) — schema snapshots

**What it CANNOT auto-update (requires human review):**
- Golden standard templates — clone from source manually
- AGENT_SELF_CHECK_WORKFLOW.md — process changes
- Playwright selectors — UI changes
- New B/C checks in .sh files — add manually with template

---

## ⚠️ KNOWN LIMITATIONS

1. **Playwright tests** require dev server running (`npm run dev`)
2. **Bug prevention check** may have false positives for intentionally bold text
3. **E2E tests** are browser-based and may be flaky on CI
4. **preflight_check.sh** assumes Wrangler is installed for R2 checks

---

**Ready for W33+ production! 🚀**
