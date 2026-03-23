#!/bin/bash
# =============================================================================
# CODE_QUALITY_GATE.SH — EngQuest3k Code Pattern Quality Gate
# =============================================================================
#
# PURPOSE:
#   Check for KNOWN CODE BUG PATTERNS that existing data validators miss.
#   This gate checks React components + service files, not just data files.
#
# MANDATORY: Run and pass BEFORE every git commit for a new week.
#
# Why this exists:
#   - validate_week.js / validate_content_quality.sh only check DATA files
#   - 3 bugs slipped to production (Week 16) because code patterns were wrong:
#     BUG-18: SingaporeMathDisplay — missing getImageUrl() → 404 in production
#     BUG-19: MindMapSpeaking — wrong station='read' instead of 'mindmap_speaking'
#     BUG-20: voiceService — male voices quieter (fixed once, now in VOICE_GAIN_BOOST)
#   - Documentation alone cannot prevent these: agents don't re-read docs mid-session
#   - Only a FAILING SCRIPT creates a forcing function
#
# CHECKS:
#   [1] Images: all <img> src in components use getImageUrl() — no raw paths
#   [2] MindMap: station='mindmap_speaking' not 'read'
#   [3] CDN_WEEKS: new week number is included in voiceService.js
#   [4] Images: no leftover download*.png in week image folders
#   [5] word_match.js: pairs array contains objects, not bare numbers
#   [6] sing_math (LogicLab): bar_model images use getImageUrl() if present
#   [7] No raw /images/ paths in JSX src attributes
#
# Usage:
#   bash tools/code_quality_gate.sh <week_number>
#   bash tools/code_quality_gate.sh 17
#
# Exit codes:
#   0 = all checks passed (safe to commit)
#   1 = one or more checks failed (DO NOT commit until fixed)
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

WEEK="${1:-}"
if [ -z "$WEEK" ]; then
  echo -e "${RED}❌ Usage: bash tools/code_quality_gate.sh <week_number>${NC}"
  echo -e "   Example: bash tools/code_quality_gate.sh 17"
  exit 1
fi

WEEK_INT=$(echo "$WEEK" | sed 's/^0*//')   # strip leading zeros for number checks
WEEK_PAD=$(printf '%02d' "$WEEK_INT")      # zero-padded e.g. 08, 17

ERRORS=0
WARNINGS=0

echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  CODE QUALITY GATE — Week ${WEEK_PAD}${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Checking code patterns that data validators do NOT catch.${NC}"
echo ""

# =============================================================================
# CHECK 1: All <img src={}> in components must use getImageUrl()
# =============================================================================
echo -e "${BOLD}[CHECK 1] Image URLs — All <img src> must use getImageUrl()${NC}"
echo "   Scanning: src/components/**/*.jsx, src/modules/**/*.jsx"

# Strategy: find src={something} that looks like a DATA IMAGE field name
# but is NOT wrapped in getImageUrl() call.
# 
# What to CATCH:  src={item.image_url}  src={word.image}  src={problem.bar_model}
# What to SKIP:   src={imageSrc}         (state var already processed by getImageUrl)
#                 src={currentUser.avatar_url}  (external user avatar)
#                 src={av.url}  src={avatar}    (profile images)
#                 src={video.thumb}             (YouTube URL)
#                 _BAK.jsx / _broken.jsx        (dead/backup files)

RAW_IMG_HITS=$(grep -rn --include="*.jsx" --include="*.tsx" \
  'src={[^g(]' \
  src/components/ src/modules/ 2>/dev/null | \
  grep -v "_BAK\." | \
  grep -v "_broken\." | \
  grep -v "getImageUrl" | \
  grep -v "avatar\|avatarUrl\|avatar_url\|\.thumb\|profilePic\|userPhoto" | \
  grep -v "src={imageSrc}" | \
  grep -v "src={currentAvatar}" | \
  grep -v "src={av\." | \
  grep -v "src={url}" | \
  grep -v 'https://' | \
  grep -iE 'src=\{[a-zA-Z]+\.(image_url|image_path|bar_model|cover_image|img_url|photo_url|image|thumbnail)' \
  || true)

if [ -n "$RAW_IMG_HITS" ]; then
  echo -e "   ${RED}❌ FAIL: Found <img> with raw data image path (missing getImageUrl):${NC}"
  echo "$RAW_IMG_HITS" | while IFS= read -r line; do
    echo -e "      ${RED}$line${NC}"
  done
  echo ""
  echo -e "   ${YELLOW}FIX: Add import + wrap:${NC}"
  echo -e "      import { getImageUrl } from '../../utils/imageUrl';"
  echo -e "      src={getImageUrl(item.image_url)}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}✅ PASS: All data image src attributes use getImageUrl()${NC}"
fi
echo ""

# =============================================================================
# CHECK 2: MindMapSpeaking.jsx must use station='mindmap_speaking'
# =============================================================================
echo -e "${BOLD}[CHECK 2] MindMap Station Name — must be 'mindmap_speaking'${NC}"
MINDMAP_FILE="src/modules/production/MindMapSpeaking.jsx"

if [ ! -f "$MINDMAP_FILE" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $MINDMAP_FILE not found${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  # Check for wrong station 'read' in speakText calls
  WRONG_STATION=$(grep -n "'read'" "$MINDMAP_FILE" | grep "speakText" || true)
  if [ -n "$WRONG_STATION" ]; then
    echo -e "   ${RED}❌ FAIL: Found station='read' in MindMapSpeaking.jsx speakText calls:${NC}"
    echo "$WRONG_STATION" | while IFS= read -r line; do
      echo -e "      ${RED}$line${NC}"
    done
    echo -e "   ${YELLOW}FIX: Change 'read' → 'mindmap_speaking' in speakText() calls${NC}"
    ERRORS=$((ERRORS + 1))
  else
    # Also verify mindmap_speaking IS present (not replaced with something else wrong)
    CORRECT_STATION=$(grep -c "'mindmap_speaking'" "$MINDMAP_FILE" || true)
    if [ "$CORRECT_STATION" -gt 0 ]; then
      echo -e "   ${GREEN}✅ PASS: MindMapSpeaking uses 'mindmap_speaking' ($CORRECT_STATION occurrences)${NC}"
    else
      echo -e "   ${YELLOW}⚠️  WARNING: No 'mindmap_speaking' found in $MINDMAP_FILE — verify station name${NC}"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
fi
echo ""

# =============================================================================
# CHECK 3: CDN_WEEKS must include the new week number
# =============================================================================
echo -e "${BOLD}[CHECK 3] CDN_WEEKS in voiceService.js — must include week $WEEK_INT${NC}"
echo "   ⚠️  This check is a WARNING until R2 audio upload is confirmed."
VOICE_SERVICE="src/services/voiceService.js"

if [ ! -f "$VOICE_SERVICE" ]; then
  echo -e "   ${RED}❌ FAIL: $VOICE_SERVICE not found${NC}"
  ERRORS=$((ERRORS + 1))
else
  CDN_LINE=$(grep "^const CDN_WEEKS" "$VOICE_SERVICE" | head -1)
  if echo "$CDN_LINE" | grep -qw "$WEEK_INT"; then
    echo -e "   ${GREEN}✅ PASS: Week $WEEK_INT found in CDN_WEEKS${NC}"
    echo -e "   ${CYAN}   $CDN_LINE${NC}"
  else
    echo -e "   ${YELLOW}⚠️  WARNING: Week $WEEK_INT NOT in CDN_WEEKS${NC}"
    echo -e "   ${CYAN}   Current: $CDN_LINE${NC}"
    echo -e "   ${YELLOW}   ACTION NEEDED: Upload audio to R2 first, then add $WEEK_INT to CDN_WEEKS${NC}"
    echo -e "   ${YELLOW}   Without this: Week $WEEK_INT TTS falls back to live Deepgram (slower, not cached)${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi
echo ""

# =============================================================================
# CHECK 4: No leftover download*.png in week image folders
# =============================================================================
echo -e "${BOLD}[CHECK 4] Image naming — no leftover 'download*.png' files${NC}"
ADV_FOLDER="public/images/week${WEEK_PAD}"
EASY_FOLDER="public/images/week${WEEK_PAD}_easy"
# Also check underscore format
ADV_FOLDER2="public/images/week_${WEEK_PAD}"
EASY_FOLDER2="public/images/week_${WEEK_PAD}_easy"

DOWNLOAD_FILES=""
for folder in "$ADV_FOLDER" "$EASY_FOLDER" "$ADV_FOLDER2" "$EASY_FOLDER2"; do
  if [ -d "$folder" ]; then
    FOUND=$(find "$folder" -name "download*.png" -o -name "download*.jpg" 2>/dev/null || true)
    if [ -n "$FOUND" ]; then
      DOWNLOAD_FILES="${DOWNLOAD_FILES}${FOUND}"$'\n'
    fi
  fi
done

if [ -n "$DOWNLOAD_FILES" ]; then
  echo -e "   ${RED}❌ FAIL: Found unnamed download files (must be renamed before R2 upload):${NC}"
  echo "$DOWNLOAD_FILES" | while IFS= read -r line; do
    [ -n "$line" ] && echo -e "      ${RED}$line${NC}"
  done
  echo -e "   ${YELLOW}FIX: Run: python3 auto_rename.py $WEEK_INT${NC}"
  ERRORS=$((ERRORS + 1))
else
  # Check folders exist at all
  FOLDER_FOUND=false
  for folder in "$ADV_FOLDER" "$EASY_FOLDER" "$ADV_FOLDER2" "$EASY_FOLDER2"; do
    [ -d "$folder" ] && FOLDER_FOUND=true && break
  done
  if [ "$FOLDER_FOUND" = true ]; then
    echo -e "   ${GREEN}✅ PASS: No download*.png files in week image folders${NC}"
  else
    echo -e "   ${YELLOW}⚠️  SKIP: Image folders not found yet (may not be generated yet)${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi
echo ""

# =============================================================================
# CHECK 5: word_match.js — pairs must be objects, not bare numbers
# =============================================================================
echo -e "${BOLD}[CHECK 5] word_match.js — pairs must be definition objects, not numbers${NC}"
WM_ADV="src/data/weeks/week_${WEEK_PAD}/word_match.js"
WM_EASY="src/data/weeks_easy/week_${WEEK_PAD}/word_match.js"
# Also check without underscore prefix
WM_ADV2="src/data/weeks/week${WEEK_PAD}/word_match.js"
WM_EASY2="src/data/weeks_easy/week${WEEK_PAD}/word_match.js"

WM_FILE=""
for f in "$WM_ADV" "$WM_ADV2"; do
  [ -f "$f" ] && WM_FILE="$f" && break
done

if [ -z "$WM_FILE" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: word_match.js not found yet${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  # Bad pattern: pairs: [1, 2, 3 ...] or pairs: [ 1, (number array)
  BAD_PAIRS=$(grep -n "pairs: *\[ *[0-9]" "$WM_FILE" 2>/dev/null || true)
  if [ -n "$BAD_PAIRS" ]; then
    echo -e "   ${RED}❌ FAIL: word_match.js 'pairs' contains bare numbers (should be objects):${NC}"
    echo "$BAD_PAIRS" | while IFS= read -r line; do
      echo -e "      ${RED}$line${NC}"
    done
    echo -e "   ${YELLOW}FIX: Replace number array with proper pair objects:${NC}"
    echo -e "      { word: 'kick', definition: 'to hit with your foot' }"
    ERRORS=$((ERRORS + 1))
  else
    echo -e "   ${GREEN}✅ PASS: word_match.js pairs are properly structured${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 6: LogicLab bar_model images — must use getImageUrl()
# =============================================================================
echo -e "${BOLD}[CHECK 6] LogicLab / SingaporeMath — bar_model must use getImageUrl()${NC}"
SINGAPORE_FILE="src/components/LogicLab/SingaporeMathDisplay.jsx"

if [ ! -f "$SINGAPORE_FILE" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $SINGAPORE_FILE not found${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  # Must import getImageUrl
  HAS_IMPORT=$(grep -c "getImageUrl" "$SINGAPORE_FILE" || true)
  # Must NOT have raw src={problem.bar_model} without getImageUrl
  RAW_BAR=$(grep -n "src={problem\.bar_model}" "$SINGAPORE_FILE" | grep -v "getImageUrl" || true)

  if [ -n "$RAW_BAR" ]; then
    echo -e "   ${RED}❌ FAIL: bar_model uses raw path (missing getImageUrl):${NC}"
    echo -e "      ${RED}$RAW_BAR${NC}"
    echo -e "   ${YELLOW}FIX: src={getImageUrl(problem.bar_model)}${NC}"
    ERRORS=$((ERRORS + 1))
  elif [ "$HAS_IMPORT" -gt 0 ]; then
    echo -e "   ${GREEN}✅ PASS: SingaporeMathDisplay uses getImageUrl() ($HAS_IMPORT occurrences)${NC}"
  else
    echo -e "   ${YELLOW}⚠️  WARNING: getImageUrl not found in SingaporeMathDisplay.jsx — verify manually${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
fi
echo ""

# =============================================================================
# CHECK 7: No raw /images/ paths in JSX src attributes
# =============================================================================
echo -e "${BOLD}[CHECK 7] JSX — no raw src={\`/images/...\`} in components${NC}"
RAW_TEMPLATE=$(grep -rn --include="*.jsx" --include="*.tsx" \
  'src={`/images/' \
  src/components/ src/modules/ 2>/dev/null || true)

if [ -n "$RAW_TEMPLATE" ]; then
  echo -e "   ${RED}❌ FAIL: Found raw template literal image paths:${NC}"
  echo "$RAW_TEMPLATE" | while IFS= read -r line; do
    echo -e "      ${RED}$line${NC}"
  done
  echo -e "   ${YELLOW}FIX: Use getImageUrl() instead of template literals for image paths${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "   ${GREEN}✅ PASS: No raw template literal image paths in JSX${NC}"
fi
echo ""

# =============================================================================
# SUMMARY
# =============================================================================
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}${BOLD}  ✅ CODE QUALITY GATE PASSED — Week ${WEEK_PAD}${NC}"
  echo -e "${GREEN}  All 7 code pattern checks passed. Safe to commit.${NC}"
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}${BOLD}  ⚠️  PASSED WITH ${WARNINGS} WARNING(S) — Week ${WEEK_PAD}${NC}"
  echo -e "${YELLOW}  Warnings: items skipped (files not yet generated). Review before deploy.${NC}"
else
  echo -e "${RED}${BOLD}  ❌ CODE QUALITY GATE FAILED — ${ERRORS} ERROR(S), ${WARNINGS} WARNING(S)${NC}"
  echo -e "${RED}  DO NOT COMMIT. Fix all errors above first.${NC}"
  echo ""
  echo -e "${YELLOW}  Quick reference: LESSONS_LEARNED_WEEK_9-11_FOR_W12.md (BUG-18/19/20)${NC}"
fi
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"

exit $ERRORS
