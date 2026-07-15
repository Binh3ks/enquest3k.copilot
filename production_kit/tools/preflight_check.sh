#!/bin/bash
# =============================================================================
# PREFLIGHT_CHECK.SH — EngQuest3k System Health Check
# =============================================================================
#
# PURPOSE:
#   Test external dependencies BEFORE starting production workflow.
#   Fail fast if API keys, R2, Node.js, or golden standards are broken.
#   Run this at the START of every production session.
#
# WHAT IT TESTS:
#   [1] Deepgram API authentication + model name validation
#   [2] R2 upload permission (engquest-audio bucket)
#   [3] Node.js version (must be >= 18 for ES modules)
#   [4] Golden standards existence (Week 16/6 templates)
#   [5] Git status (ensure no uncommitted week content)
#   [6] Session logging setup
#
# USAGE:
#   bash tools/preflight_check.sh
#   bash tools/preflight_check.sh --week 32
#
# EXIT CODES:
#   0 = all systems GO (safe to start production)
#   1 = one or more systems FAIL (STOP, fix before proceeding)
# =============================================================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

ERRORS=0
WARNINGS=0
PASSED=0

echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  ENGQUEST3K PRE-FLIGHT SYSTEM CHECK${NC}"
echo -e "${BLUE}${BOLD}  $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# =============================================================================
# CHECK 1: Deepgram API Authentication + Model Name
# =============================================================================
echo -e "${BOLD}[1/6] Deepgram API — Authentication & Model Name${NC}"

if [ ! -f .env ]; then
  echo -e "   ${YELLOW}⚠️  WARNING: .env file not found in project root${NC}"
  echo -e "   ${CYAN}   → Copy .env.example to .env and add DEEPGRAM_API_KEY${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  # Load .env if exists
  set -a
  source .env 2>/dev/null || true
  set +a
  
  if [ -z "${DEEPGRAM_API_KEY:-}" ]; then
    echo -e "   ${RED}❌ FAIL: DEEPGRAM_API_KEY not found in .env${NC}"
    echo -e "   ${CYAN}   → Add: DEEPGRAM_API_KEY=your_key_here${NC}"
    ERRORS=$((ERRORS + 1))
  else
    # Test API with CORRECT model name (aura-orion-en, NOT aura-2-orion-en)
    RESULT=$(python3 -c "
import os, json, urllib.request, urllib.error

key = os.getenv('DEEPGRAM_API_KEY')
url = 'https://api.deepgram.com/v1/speak?model=aura-orion-en&encoding=mp3'
data = json.dumps({'text': 'Test audio generation.'}).encode()
req = urllib.request.Request(url, data=data,
    headers={'Authorization': f'Token {key}', 'Content-Type': 'application/json'},
    method='POST')

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        size = len(resp.read())
        print(f'OK:{size}')
except urllib.error.HTTPError as e:
    print(f'HTTP:{e.code}:{e.reason}')
except Exception as e:
    print(f'ERR:{e}')
" 2>&1)
    
    if [[ "$RESULT" == OK:* ]]; then
      SIZE=${RESULT#OK:}
      echo -e "   ${GREEN}✅ PASS: Deepgram API responding ($SIZE bytes)${NC}"
      echo -e "   ${GREEN}✅ PASS: Model name CORRECT (aura-orion-en)${NC}"
      PASSED=$((PASSED + 1))
    elif [[ "$RESULT" == HTTP:400:* ]]; then
      echo -e "   ${RED}❌ FAIL: Deepgram 400 Bad Request${NC}"
      echo -e "   ${RED}   → Check model name: use 'aura-orion-en', NOT 'aura-2-orion-en'${NC}"
      ERRORS=$((ERRORS + 1))
    elif [[ "$RESULT" == HTTP:401:* ]]; then
      echo -e "   ${RED}❌ FAIL: Deepgram 401 Unauthorized${NC}"
      echo -e "   ${RED}   → Check DEEPGRAM_API_KEY in .env${NC}"
      ERRORS=$((ERRORS + 1))
    else
      echo -e "   ${RED}❌ FAIL: Deepgram error: $RESULT${NC}"
      ERRORS=$((ERRORS + 1))
    fi
  fi
fi
echo ""

# =============================================================================
# CHECK 2: R2 Upload Permission
# =============================================================================
echo -e "${BOLD}[2/6] Cloudflare R2 — Upload Permission${NC}"

# Create test file
echo "pre-flight-test-$(date +%s)" > /tmp/r2_preflight_$$.txt

R2_RESULT=$(npx wrangler r2 object put engquest-audio/audio/preflight_test.txt \
  --file=/tmp/r2_preflight_$$.txt \
  --remote 2>&1 || echo "FAILED:$?")

rm -f /tmp/r2_preflight_$$.txt

if [[ "$R2_RESULT" == FAILED:* ]]; then
  echo -e "   ${RED}❌ FAIL: R2 upload failed (exit code ${R2_RESULT#FAILED:})${NC}"
  echo -e "   ${CYAN}   → Check Wrangler authentication: npx wrangler whoami${NC}"
  echo -e "   ${CYAN}   → Verify API token has R2 Object Write permission${NC}"
  echo -e "   ${CYAN}   → Verify bucket name: engquest-audio${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}✅ PASS: R2 upload permission OK${NC}"
  PASSED=$((PASSED + 1))
  
  # Cleanup test file
  npx wrangler r2 object delete engquest-audio/audio/preflight_test.txt --remote 2>/dev/null || true
fi
echo ""

# =============================================================================
# CHECK 3: Node.js Version
# =============================================================================
echo -e "${BOLD}[3/6] Node.js — Version Check${NC}"

NODE_VERSION=$(node --version 2>/dev/null || echo "NOT_FOUND")
NODE_MAJOR=$(echo "$NODE_VERSION" | sed 's/v\([0-9]*\).*/\1/')

if [ "$NODE_VERSION" = "NOT_FOUND" ]; then
  echo -e "   ${RED}❌ FAIL: Node.js not found${NC}"
  echo -e "   ${CYAN}   → Install Node.js 18+: https://nodejs.org/${NC}"
  ERRORS=$((ERRORS + 1))
elif [ "$NODE_MAJOR" -lt 18 ]; then
  echo -e "   ${RED}❌ FAIL: Node.js $NODE_VERSION (need v18+ for ES modules)${NC}"
  echo -e "   ${CYAN}   → Run: nvm install 18 && nvm use 18${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}✅ PASS: Node.js $NODE_VERSION${NC}"
  PASSED=$((PASSED + 1))
fi
echo ""

# =============================================================================
# CHECK 4: Golden Standards Existence
# =============================================================================
echo -e "${BOLD}[4/6] Golden Standards — Template Files${NC}"

GOLDEN_ERRORS=0

# Week 16 AI Tutor (W16+ golden standard)
if [ -f "src/data/weeks/week_16_real.js" ]; then
  echo -e "   ${GREEN}✅ PASS: week_16_real.js (AI Tutor V28 template)${NC}"
  PASSED=$((PASSED + 1))
else
  echo -e "   ${RED}❌ FAIL: week_16_real.js not found${NC}"
  GOLDEN_ERRORS=$((GOLDEN_ERRORS + 1))
fi

# Week 16 Advanced stations
if [ -f "src/data/weeks/week_16/index.js" ]; then
  ADV_COUNT=$(ls src/data/weeks/week_16/*.js 2>/dev/null | wc -l | tr -d ' ')
  echo -e "   ${GREEN}✅ PASS: week_16/ ($ADV_COUNT station files)${NC}"
  PASSED=$((PASSED + 1))
else
  echo -e "   ${RED}❌ FAIL: week_16/ folder or index.js not found${NC}"
  GOLDEN_ERRORS=$((GOLDEN_ERRORS + 1))
fi

# Week 16 Easy stations
if [ -f "src/data/weeks_easy/week_16/index.js" ]; then
  EASY_COUNT=$(ls src/data/weeks_easy/week_16/*.js 2>/dev/null | wc -l | tr -d ' ')
  echo -e "   ${GREEN}✅ PASS: week_16_easy/ ($EASY_COUNT station files)${NC}"
  PASSED=$((PASSED + 1))
else
  echo -e "   ${RED}❌ FAIL: week_16_easy/ folder or index.js not found${NC}"
  GOLDEN_ERRORS=$((GOLDEN_ERRORS + 1))
fi

if [ $GOLDEN_ERRORS -gt 0 ]; then
  echo -e "   ${CYAN}   → Clone from existing week or restore from git${NC}"
  ERRORS=$((ERRORS + GOLDEN_ERRORS))
fi
echo ""

# =============================================================================
# CHECK 5: Git Status (Uncommitted Changes)
# =============================================================================
echo -e "${BOLD}[5/6] Git — Uncommitted Changes${NC}"

# Check if there are uncommitted changes in src/data/
UNCOMMITTED=$(git status --porcelain src/data/ 2>/dev/null | grep -v "^??" | head -5 || true)

if [ -n "$UNCOMMITTED" ]; then
  echo -e "   ${YELLOW}⚠️  WARNING: Uncommitted changes in src/data/${NC}"
  echo -e "   ${CYAN}   Recent changes:${NC}"
  echo "$UNCOMMITTED" | while IFS= read -r line; do
    echo -e "   ${CYAN}   $line${NC}"
  done
  echo -e "   ${CYAN}   → Commit or stash before starting new week production${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "   ${GREEN}✅ PASS: No uncommitted changes in src/data/${NC}"
  PASSED=$((PASSED + 1))
fi

# Check if branch is up to date
BEHIND=$(git fetch origin 2>/dev/null && git rev-list HEAD..origin/main --count 2>/dev/null || echo "0")
if [ "$BEHIND" -gt 0 ] 2>/dev/null; then
  echo -e "   ${YELLOW}⚠️  WARNING: Branch is $BEHIND commits behind origin${NC}"
  echo -e "   ${CYAN}   → Run: git pull origin main${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# =============================================================================
# CHECK 6: Session Logging Setup
# =============================================================================
echo -e "${BOLD}[6/6] Session Logging — Log Directory${NC}"

SESSION_LOG_DIR="logs"
if [ ! -d "$SESSION_LOG_DIR" ]; then
  mkdir -p "$SESSION_LOG_DIR"
  echo -e "   ${GREEN}✅ PASS: Created $SESSION_LOG_DIR/${NC}"
  PASSED=$((PASSED + 1))
else
  echo -e "   ${GREEN}✅ PASS: $SESSION_LOG_DIR/ exists${NC}"
  PASSED=$((PASSED + 1))
fi

# Create session log
SESSION_LOG="logs/session_$(date +%Y%m%d_%H%M%S).log"
mkdir -p logs
echo "========================================" > "$SESSION_LOG"
echo "ENGQUEST3K PRODUCTION SESSION" >> "$SESSION_LOG"
echo "Started: $(date)" >> "$SESSION_LOG"
echo "========================================" >> "$SESSION_LOG"
echo "" >> "$SESSION_LOG"
echo -e "   ${GREEN}✅ PASS: Session log created: $SESSION_LOG${NC}"
PASSED=$((PASSED + 1))
echo ""

# =============================================================================
# SUMMARY
# =============================================================================
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  PRE-FLIGHT SUMMARY${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "   ${GREEN}✅ Passed:  $PASSED/6${NC}"
echo -e "   ${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
echo -e "   ${RED}❌ Errors:   $ERRORS${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "${RED}${BOLD}❌ PRE-FLIGHT FAILED — Fix errors before starting production${NC}"
  echo ""
  echo -e "${CYAN}Common fixes:${NC}"
  echo -e "   • Deepgram 401: Check DEEPGRAM_API_KEY in .env"
  echo -e "   • R2 FAILED: Run 'npx wrangler whoami' to verify auth"
  echo -e "   • Node < 18: Run 'nvm install 18 && nvm use 18'"
  echo -e "   • Golden standards missing: git checkout or clone from backup"
  echo ""
  echo -e "${CYAN}Session log: $SESSION_LOG${NC}"
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "${YELLOW}${BOLD}⚠️  PRE-FLIGHT PASSED WITH WARNINGS — Review above${NC}"
  echo ""
  echo -e "${CYAN}Session log: $SESSION_LOG${NC}"
  echo -e "${CYAN}You may proceed, but address warnings when convenient.${NC}"
  exit 0
else
  echo -e "${GREEN}${BOLD}✅ ALL SYSTEMS GO — Ready for production!${NC}"
  echo ""
  echo -e "${CYAN}Next steps:${NC}"
  echo -e "   1. Read syllabus + blueprint for target week"
  echo -e "   2. Follow AGENT_SELF_CHECK_WORKFLOW.md (Steps 0→10)"
  echo -e "   3. Run quality gate before commit: bash tools/code_quality_gate.sh N"
  echo ""
  echo -e "${CYAN}Session log: $SESSION_LOG${NC}"
  exit 0
fi
