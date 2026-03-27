#!/bin/bash
# =============================================================================
# CODE_QUALITY_GATE.SH — EngQuest3k Full-App Quality Gate
# =============================================================================
#
# PURPOSE:
#   Catches bugs that data validators (validate_week.js) CANNOT catch because
#   they only check data file structure, not:
#     - React component code patterns
#     - Service registrations (STATIC_STATIONS, STATION_VOICE_KEY)
#     - Week data schema / template integrity (cloned from W16 golden standard)
#     - Cross-file consistency (audio paths match week number, AI Tutor V28 schema)
#
# HOW PRODUCTION WORKS:
#   Clone Week 16 (golden standard) → replace content → validate quality gate
#   Gate checks: (1) code patterns + (2) W16 schema compliance + (3) content consistency
#
# CHECKS (30 total):
#   Code pattern checks (React/service bugs):
#   [1]  Images: all <img src> from data use getImageUrl()
#   [2]  MindMap: station='mindmap_speaking' (not 'read')
#   [3]  CDN_WEEKS includes new week (WARNING – upload audio first)
#   [4]  Images: no leftover download*.png before R2 upload
#   [5]  word_match: pair objects not bare numbers
#   [6]  SingaporeMathDisplay bar_model uses getImageUrl()
#   [7]  No raw src={`/images/...`} template literals in JSX
#   [8]  STATIC_STATIONS includes logic_lab + singapore_math + social_quiz
#   [9]  LogicLab.jsx uses correct station name (not 'read' for old puzzles)
#   [10] All TabbedLogicLab display components use getImageUrl()
#
#   Data schema/template checks (W16 clone issues):
#   [11] Both week_NN/ and weeks_easy/week_NN/ directories exist
#   [12] index.js voiceConfig has all 6 required keys
#   [13] index.js stations has all 14 required W16 keys
#   [14] weekId in index.js matches week N
#   [15] Audio/image paths reference week N (not stale from W16)
#   [16] AI Tutor week_NN_real.js: 3 missions + v28_format_notes + nova + pacing
#
#   Data content checks (schema correctness + actual content counts):
#   [17] dictation.js: exports { sentences: [...] } + >= 5 sentence entries (by { id: count)
#   [18] singapore_math.js: schema correct + >= 3 problems (question_en count)
#   [19] writing.js: schema correct + model_sentence line >= 200 chars
#   [20] word_power.js: has >= 6 words
#   [21] mindmap.js: schema correct + >= 36 audio entries (6 stems × 6 branches, by audio: count)
#   [22] metadata.js: week N has real title (not generic "Week N")
#
#   Production readiness checks (content completeness):
#   [23] daily_watch.js: video IDs are unique (no generic fallback from update_videos.js)
#   [24] video_tasks.json: has queries for week N (video search was run)
#   [25] Image prompt files exist for week N in Production_FINAL/IMAGE PROMPTS/
#   [26] Cover image_url paths in read.js/explore.js resolve to actual files on disk
#
#   Content count / registration checks (catches missing wiring):
#   [27] grammar.js: exactly 20 exercises per mode (question: count)
#   [28] gameAdaptation.js: week N imports + weekGamesMap entry (GameHub wiring)
#   [29] StoryMissionTab + FreeTalkTab: import/ternary for week N (AI Tutor wiring)
#   [30] games.js: show_tell + make_sentence + ask_me present, >= 10 answer entries
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

echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  CODE QUALITY GATE — Week ${WEEK_PAD} (Full App Coverage)${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Checks 1-10: code patterns  |  11-16: data schema  |  17-22: content counts  |  23-26: production  |  27-30: wiring/registration${NC}"
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
# CHECK 3: CDN_WEEKS — on-demand TTS (W16+) or pre-generated R2 (W1-15)
# =============================================================================
echo -e "${BOLD}[CHECK 3] TTS Architecture — verify correct mode for week $WEEK_INT${NC}"
VOICE_SERVICE="src/services/voiceService.js"

if [ ! -f "$VOICE_SERVICE" ]; then
  echo -e "   ${RED}❌ FAIL: $VOICE_SERVICE not found${NC}"; ERRORS=$((ERRORS+1))
elif [ "$WEEK_INT" -ge 16 ]; then
  # W16+: On-demand TTS via Deepgram Worker — CDN_WEEKS is NOT expected to include this week
  CDN_LINE=$(grep "^const CDN_WEEKS" "$VOICE_SERVICE" | head -1)
  if echo "$CDN_LINE" | grep -qw "$WEEK_INT"; then
    echo -e "   ${YELLOW}⚠️  WARNING: Week $WEEK_INT is in CDN_WEEKS — unexpected for on-demand architecture${NC}"
    echo -e "   ${CYAN}   $CDN_LINE${NC}"
    echo -e "   ${YELLOW}   W16+ should NOT be in CDN_WEEKS (on-demand: Worker handles R2 caching)${NC}"
    WARNINGS=$((WARNINGS+1))
  else
    echo -e "   ${GREEN}✅ PASS: Week $WEEK_INT correctly NOT in CDN_WEEKS (on-demand TTS mode)${NC}"
    echo -e "   ${CYAN}   On-demand: audio_url in data = R2 storage key for Deepgram Worker${NC}"
    echo -e "   ${CYAN}   First playback: Worker generates via Deepgram → cached to R2 automatically${NC}"
    echo -e "   ${CYAN}   $CDN_LINE${NC}"
  fi
else
  # W1-15: Pre-generated audio should be in CDN_WEEKS
  CDN_LINE=$(grep "^const CDN_WEEKS" "$VOICE_SERVICE" | head -1)
  if echo "$CDN_LINE" | grep -qw "$WEEK_INT"; then
    echo -e "   ${GREEN}✅ PASS: Week $WEEK_INT in CDN_WEEKS (pre-generated audio on R2)${NC}"
    echo -e "   ${CYAN}   $CDN_LINE${NC}"
  else
    echo -e "   ${YELLOW}⚠️  WARNING: Week $WEEK_INT NOT in CDN_WEEKS${NC}"
    echo -e "   ${CYAN}   Current: $CDN_LINE${NC}"
    echo -e "   ${YELLOW}   ACTION: Upload audio to R2 first, then add $WEEK_INT to CDN_WEEKS${NC}"
    WARNINGS=$((WARNINGS+1))
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
# CHECK 8: STATIC_STATIONS in voiceService.js — must include W16+ logic stations
# =============================================================================
echo -e "${BOLD}[CHECK 8] STATIC_STATIONS — must include logic_lab + singapore_math + social_quiz${NC}"
VOICE_SVC="src/services/voiceService.js"
if [ ! -f "$VOICE_SVC" ]; then
  echo -e "   ${RED}❌ FAIL: voiceService.js not found${NC}"; ERRORS=$((ERRORS+1))
else
  STATIC_LINE=$(grep "^const STATIC_STATIONS" "$VOICE_SVC" | head -1)
  MISS_STATIC=""
  for st in logic_lab singapore_math social_quiz; do
    echo "$STATIC_LINE" | grep -q "'$st'" || MISS_STATIC="$MISS_STATIC $st"
  done
  if [ -n "$MISS_STATIC" ]; then
    echo -e "   ${RED}❌ FAIL: Missing from STATIC_STATIONS:${MISS_STATIC}${NC}"
    echo -e "   ${CYAN}   $STATIC_LINE${NC}"
    echo -e "   ${YELLOW}FIX: Add missing stations to STATIC_STATIONS array in voiceService.js${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: STATIC_STATIONS includes all logic_lab sub-stations${NC}"
    echo -e "   ${CYAN}   $STATIC_LINE${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 9: LogicLab.jsx — old puzzle path must NOT use station='read'
# =============================================================================
echo -e "${BOLD}[CHECK 9] LogicLab.jsx — puzzle speakText must use 'logic_lab' not 'read'${NC}"
LOGIC_FILE="src/modules/logic/LogicLab.jsx"
if [ ! -f "$LOGIC_FILE" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  WRONG_LOGIC=$(grep -n "speakText.*p\.question\|speakText.*p\.audio" "$LOGIC_FILE" | grep "'read'" || true)
  if [ -n "$WRONG_LOGIC" ]; then
    echo -e "   ${RED}❌ FAIL: station='read' for puzzle audio (should be 'logic_lab'):${NC}"
    echo "$WRONG_LOGIC" | while IFS= read -r line; do echo -e "      ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Change 'read' → 'logic_lab' in LogicLab.jsx speakText calls${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: LogicLab.jsx uses correct station for old puzzle audio${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 10: TabbedLogicLab + TabbedReadExplore display components use getImageUrl()
# =============================================================================
echo -e "${BOLD}[CHECK 10] Display components — all image fields must use getImageUrl()${NC}"
DISPLAY_ERRORS=""
for f in \
  "src/components/LogicLab/LogicScienceDisplay.jsx" \
  "src/components/LogicLab/SingaporeMathDisplay.jsx" \
  "src/components/LogicLab/SocialQuizDisplay.jsx" \
  "src/components/ReadExplore/TabbedReadExplore.jsx"; do
  [ ! -f "$f" ] && continue
  RAW=$(grep -n 'src={.*\.\(image_url\|bar_model\|cover_image\)}' "$f" | grep -v "getImageUrl" || true)
  [ -n "$RAW" ] && DISPLAY_ERRORS="${DISPLAY_ERRORS}$(basename $f): $RAW\n"
done
if [ -n "$DISPLAY_ERRORS" ]; then
  echo -e "   ${RED}❌ FAIL: Raw image paths in display components:${NC}"
  echo -e "$DISPLAY_ERRORS" | while IFS= read -r line; do
    [ -n "$line" ] && echo -e "      ${RED}$line${NC}"
  done
  echo -e "   ${YELLOW}FIX: Wrap src with getImageUrl()${NC}"; ERRORS=$((ERRORS+1))
else
  echo -e "   ${GREEN}✅ PASS: All display components use getImageUrl()${NC}"
fi
echo ""

echo -e "${CYAN}${BOLD}────────────────── DATA SCHEMA / TEMPLATE CHECKS ──────────────────${NC}"
echo -e "${CYAN}        Validates Week ${WEEK_PAD} data matches W16 golden standard${NC}"
echo -e "${CYAN}${BOLD}────────────────────────────────────────────────────────────────────${NC}"
echo ""

ADV_DIR="src/data/weeks/week_${WEEK_PAD}"
EASY_DIR="src/data/weeks_easy/week_${WEEK_PAD}"
IDX_ADV="${ADV_DIR}/index.js"
IDX_EASY="${EASY_DIR}/index.js"

# =============================================================================
# CHECK 11: Both data directories must exist
# =============================================================================
echo -e "${BOLD}[CHECK 11] Data directories — both advanced and easy must exist${NC}"
MISS_DIRS=""
[ ! -d "$ADV_DIR"  ] && MISS_DIRS="$MISS_DIRS\n      $ADV_DIR"
[ ! -d "$EASY_DIR" ] && MISS_DIRS="$MISS_DIRS\n      $EASY_DIR"
if [ -n "$MISS_DIRS" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: Directories not yet created:${NC}"
  echo -e "$MISS_DIRS"
  echo -e "   ${CYAN}   → Run after content generation (Step 1 of mass_production_final.sh)${NC}"
  WARNINGS=$((WARNINGS+1))
else
  ADV_COUNT=$(ls "$ADV_DIR"/*.js 2>/dev/null | wc -l | tr -d ' ')
  EASY_COUNT=$(ls "$EASY_DIR"/*.js 2>/dev/null | wc -l | tr -d ' ')
  echo -e "   ${GREEN}✅ PASS: Both exist  (Advanced: $ADV_COUNT .js files, Easy: $EASY_COUNT .js files)${NC}"
fi
echo ""

# =============================================================================
# CHECK 12: index.js voiceConfig must have all 6 required keys
# =============================================================================
echo -e "${BOLD}[CHECK 12] voiceConfig — must have: narration / vocabulary / dictation / shadowing / questions / mindmap${NC}"
if [ ! -f "$IDX_ADV" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $IDX_ADV not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  for mode_dir in "$IDX_ADV" "$IDX_EASY"; do
    [ ! -f "$mode_dir" ] && continue
    LABEL=$([ "$mode_dir" = "$IDX_ADV" ] && echo "Advanced" || echo "Easy")
    MISS_V=""
    for key in narration vocabulary dictation shadowing questions mindmap; do
      grep -q "${key}:" "$mode_dir" || MISS_V="$MISS_V $key"
    done
    if [ -n "$MISS_V" ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): voiceConfig missing keys:${MISS_V}${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): voiceConfig complete${NC}"
    fi
  done
fi
echo ""

# =============================================================================
# CHECK 13: index.js stations must have all 14 required W16 keys
# =============================================================================
echo -e "${BOLD}[CHECK 13] stations — must have all 14 W16 keys${NC}"
REQUIRED_STATIONS="read_explore new_words word_match grammar word_power ask_ai logic_lab dictation shadowing writing explore mindmap_speaking daily_watch game_hub"
if [ ! -f "$IDX_ADV" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $IDX_ADV not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  MISS_ST=""
  for st in $REQUIRED_STATIONS; do
    grep -q "${st}[: ,]" "$IDX_ADV" || MISS_ST="$MISS_ST $st"
  done
  if [ -n "$MISS_ST" ]; then
    echo -e "   ${RED}❌ FAIL: stations missing keys:${MISS_ST}${NC}"
    echo -e "   ${YELLOW}FIX: Add missing station keys in index.js 'stations' object${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: All 14 station keys present in index.js${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 14: weekId in index.js must match week N
# =============================================================================
echo -e "${BOLD}[CHECK 14] weekId — must equal $WEEK_INT in both index.js files${NC}"
if [ ! -f "$IDX_ADV" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  for mode_dir in "$IDX_ADV" "$IDX_EASY"; do
    [ ! -f "$mode_dir" ] && continue
    LABEL=$([ "$mode_dir" = "$IDX_ADV" ] && echo "Advanced" || echo "Easy")
    WID_LINE=$(grep "weekId:" "$mode_dir" | head -1)
    if echo "$WID_LINE" | grep -qE "weekId: *${WEEK_INT}[^0-9]|weekId: *${WEEK_INT}$"; then
      echo -e "   ${GREEN}✅ PASS ($LABEL): weekId = $WEEK_INT${NC}"
    else
      echo -e "   ${RED}❌ FAIL ($LABEL): weekId mismatch → $WID_LINE${NC}"
      echo -e "   ${YELLOW}FIX: Update 'weekId: $WEEK_INT' in ${mode_dir}${NC}"
      ERRORS=$((ERRORS+1))
    fi
  done
fi
echo ""

# =============================================================================
# CHECK 15: Audio/image paths must reference week N (no stale W16 paths)
# =============================================================================
echo -e "${BOLD}[CHECK 15] Path consistency — audio/image refs must use week $WEEK_PAD${NC}"
if [ "$WEEK_INT" -eq 16 ]; then
  echo -e "   ${CYAN}ℹ️  SKIP: Week 16 is the golden standard — no stale-path check needed${NC}"
elif [ ! -d "$ADV_DIR" ] && [ ! -d "$EASY_DIR" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: Data directories not yet generated${NC}"; WARNINGS=$((WARNINGS+1))
else
  STALE_PATHS=""
  for dir in "$ADV_DIR" "$EASY_DIR"; do
    [ ! -d "$dir" ] && continue
    FOUND=$(grep -rn "/audio/week[0-9]\{1,2\}/\|/images/week[0-9]\{1,2\}/" "$dir" 2>/dev/null | \
      grep -v "/week${WEEK_INT}/\|/week${WEEK_PAD}/" | grep -v "^Binary" || true)
    [ -n "$FOUND" ] && STALE_PATHS="${STALE_PATHS}${FOUND}"$'\n'
  done
  if [ -n "$STALE_PATHS" ]; then
    echo -e "   ${RED}❌ FAIL: Stale paths from wrong week:${NC}"
    echo "$STALE_PATHS" | head -10 | while IFS= read -r line; do
      [ -n "$line" ] && echo -e "      ${RED}$line${NC}"
    done
    echo -e "   ${YELLOW}FIX: Replace all /weekXX/ references with /week${WEEK_PAD}/${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: All audio/image paths reference week $WEEK_PAD${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 16: AI Tutor week_NN_real.js — V28 schema completeness
# =============================================================================
echo -e "${BOLD}[CHECK 16] AI Tutor week_${WEEK_PAD}_real.js — V28 schema (3 missions + v28_format_notes + nova)${NC}"
AI_TUTOR="src/data/weeks/week_${WEEK_PAD}_real.js"
if [ ! -f "$AI_TUTOR" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $AI_TUTOR not yet created${NC}"; WARNINGS=$((WARNINGS+1))
else
  AI_ERRS=""
  MC=$(grep -c "mission_id:" "$AI_TUTOR" 2>/dev/null || echo "0")
  [ "$MC" -ne 3 ] && AI_ERRS="${AI_ERRS}\n   • story_missions: $MC mission_id entries (expected 3)"
  grep -q "v28_format_notes"  "$AI_TUTOR" || AI_ERRS="${AI_ERRS}\n   • Missing: v28_format_notes"
  grep -q "nova_instructions" "$AI_TUTOR" || AI_ERRS="${AI_ERRS}\n   • Missing: nova_instructions"
  grep -q "story_character"   "$AI_TUTOR" || AI_ERRS="${AI_ERRS}\n   • Missing: story_character"
  grep -q "minimum_turns"     "$AI_TUTOR" || AI_ERRS="${AI_ERRS}\n   • Missing: minimum_turns (≥10)"
  grep -q "grammar_examples"  "$AI_TUTOR" || AI_ERRS="${AI_ERRS}\n   • Missing: grammar_examples"
  WN_LINE=$(grep "week_number:" "$AI_TUTOR" 2>/dev/null | head -1 || true)
  echo "$WN_LINE" | grep -qE "week_number: *${WEEK_INT}[^0-9]|week_number: *${WEEK_INT}$" || \
    AI_ERRS="${AI_ERRS}\n   • week_number mismatch or missing: '$WN_LINE' (expected week_number: $WEEK_INT)"
  AI_WID=$(grep -E "weekId:|week_id:" "$AI_TUTOR" 2>/dev/null | head -1 || true)
  echo "$AI_WID" | grep -qE "(weekId|week_id): *${WEEK_INT}[^0-9]|(weekId|week_id): *${WEEK_INT}$" || \
    AI_ERRS="${AI_ERRS}\n   • weekId/week_id mismatch or missing: '$AI_WID' (expected: $WEEK_INT)"

  if [ -n "$AI_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL: AI Tutor schema errors:${NC}"
    echo -e "$AI_ERRS" | while IFS= read -r line; do echo -e "      ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Match V28 schema from week_16_real.js${NC}"; ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: AI Tutor V28 schema complete (3 missions, nova_instructions, v28_format_notes)${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 17: dictation.js must export { sentences: [...] } not a plain array
# =============================================================================
echo -e "${BOLD}[CHECK 17] dictation.js — must export { sentences: [...] } not a plain array${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  DICT_FILE="${dir}/dictation.js"
  [ ! -f "$DICT_FILE" ] && echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): $DICT_FILE not found${NC}" && WARNINGS=$((WARNINGS+1)) && continue
  # Bad: export default [  (plain array at top level)
  BAD_DICT=$(grep -n "^export default \[" "$DICT_FILE" || true)
  if [ -n "$BAD_DICT" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): dictation.js exports plain array — must be { sentences: [...] }${NC}"
    echo -e "      ${RED}$BAD_DICT${NC}"
    echo -e "   ${YELLOW}FIX: export default { sentences: [ ...your array... ] };${NC}"
    ERRORS=$((ERRORS+1))
  else
    HAS_SENTENCES=$(grep -c "sentences:" "$DICT_FILE" || true)
    if [ "$HAS_SENTENCES" -gt 0 ]; then
      SENT_COUNT=$(grep -c "  { id:" "$DICT_FILE" || true)
      if [ "$SENT_COUNT" -lt 5 ]; then
        echo -e "   ${RED}❌ FAIL ($LABEL): dictation.js has only $SENT_COUNT sentence(s) — need >= 5${NC}"
        ERRORS=$((ERRORS+1))
      else
        echo -e "   ${GREEN}✅ PASS ($LABEL): dictation.js exports { sentences: [...] } with $SENT_COUNT entries${NC}"
      fi
    else
      echo -e "   ${YELLOW}⚠️  WARNING ($LABEL): 'sentences' key not found in dictation.js — verify schema${NC}"
      WARNINGS=$((WARNINGS+1))
    fi
  fi
done
echo ""

# =============================================================================
# CHECK 18: singapore_math.js — correct answer/bar_model/hint schema
# =============================================================================
echo -e "${BOLD}[CHECK 18] singapore_math.js — answer must be string array, bar_model string, hint_en/hint_vi present${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  SM_FILE="${dir}/singapore_math.js"
  [ ! -f "$SM_FILE" ] && echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): $SM_FILE not found${NC}" && WARNINGS=$((WARNINGS+1)) && continue

  SM_ERRS=""
  # Bad: answer: [{ label: or answer: [{ value:  (object array instead of string array)
  BAD_ANSWER=$(grep -n "answer: *\[{" "$SM_FILE" || true)
  [ -n "$BAD_ANSWER" ] && SM_ERRS="${SM_ERRS}\n      answer is an object array (must be string array like [\"5\",\"five\"]): $BAD_ANSWER"

  # Bad: bar_model: { (object instead of string path)
  BAD_BAR=$(grep -n "bar_model: *{" "$SM_FILE" || true)
  [ -n "$BAD_BAR" ] && SM_ERRS="${SM_ERRS}\n      bar_model is an object (must be string path like \"/images/...\"/): $BAD_BAR"

  # Must have hint_en and hint_vi (not hints: [...] array)
  HAS_HINT_EN=$(grep -c "hint_en:" "$SM_FILE" || true)
  HAS_HINT_VI=$(grep -c "hint_vi:" "$SM_FILE" || true)
  BAD_HINTS=$(grep -n "hints: *\[" "$SM_FILE" || true)
  [ -n "$BAD_HINTS" ] && SM_ERRS="${SM_ERRS}\n      hints is an array (must be hint_en/hint_vi strings): $BAD_HINTS"
  [ "$HAS_HINT_EN" -eq 0 ] && SM_ERRS="${SM_ERRS}\n      Missing hint_en fields"
  [ "$HAS_HINT_VI" -eq 0 ] && SM_ERRS="${SM_ERRS}\n      Missing hint_vi fields"

  if [ -n "$SM_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): singapore_math.js schema errors:${NC}"
    echo -e "$SM_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: answer=[\"5\",\"five\"], bar_model=\"/images/...\", hint_en=\"...\", hint_vi=\"...\"${NC}"
    ERRORS=$((ERRORS+1))
  else
    PROB_COUNT=$(grep -c "question_en:" "$SM_FILE" || true)
    if [ "$PROB_COUNT" -lt 3 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): singapore_math.js has only $PROB_COUNT problem(s) — need >= 3${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): singapore_math.js schema correct ($PROB_COUNT problems)${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# CHECK 19: writing.js must have model_sentence, prompt_en, prompt_vi
# =============================================================================
echo -e "${BOLD}[CHECK 19] writing.js — must have model_sentence, prompt_en, prompt_vi (no example_en/rubric)${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  WR_FILE="${dir}/writing.js"
  [ ! -f "$WR_FILE" ] && echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): $WR_FILE not found${NC}" && WARNINGS=$((WARNINGS+1)) && continue

  WR_ERRS=""
  grep -q "model_sentence:" "$WR_FILE" || WR_ERRS="${WR_ERRS}\n      Missing: model_sentence"
  grep -q "prompt_en:"      "$WR_FILE" || WR_ERRS="${WR_ERRS}\n      Missing: prompt_en"
  grep -q "prompt_vi:"      "$WR_FILE" || WR_ERRS="${WR_ERRS}\n      Missing: prompt_vi"
  BAD_EXAMPLE=$(grep -n "example_en:" "$WR_FILE" || true)
  [ -n "$BAD_EXAMPLE" ] && WR_ERRS="${WR_ERRS}\n      Non-standard field 'example_en' (use model_sentence instead): $BAD_EXAMPLE"
  BAD_RUBRIC=$(grep -n "rubric:" "$WR_FILE" || true)
  [ -n "$BAD_RUBRIC" ] && WR_ERRS="${WR_ERRS}\n      Non-standard field 'rubric' (not in W16 schema): $BAD_RUBRIC"

  if [ -n "$WR_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): writing.js schema errors:${NC}"
    echo -e "$WR_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Add model_sentence/prompt_en/prompt_vi, remove example_en/rubric${NC}"
    ERRORS=$((ERRORS+1))
  else
    MODEL_LINE=$(grep "model_sentence:" "$WR_FILE" | head -1 || true)
    MODEL_CHARS=$(echo "$MODEL_LINE" | wc -c | tr -d ' ')
    MODEL_TEXT=$(echo "$MODEL_LINE" | sed -E 's/^[[:space:]]*model_sentence:[[:space:]]*"(.*)",[[:space:]]*$/\1/' )
    MODEL_WORDS=$(echo "$MODEL_TEXT" | tr -d '"' | wc -w | tr -d ' ')
    MODEL_SENTENCES=$(echo "$MODEL_TEXT" | grep -o '[.!?]' | wc -l | tr -d ' ')

    if [ "$MODEL_CHARS" -lt 200 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): writing.js model_sentence too short ($MODEL_CHARS chars on that line) — need >= 200${NC}"
      echo -e "   ${YELLOW}   FIX: Expand model_sentence to >= 25 complete sentences covering week vocabulary${NC}"
      ERRORS=$((ERRORS+1))
    elif [ "$MODEL_WORDS" -lt 45 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): writing.js model_sentence has only $MODEL_WORDS words — need >= 45${NC}"
      echo -e "   ${YELLOW}   FIX: Add richer model with full ideas (not short fragments)${NC}"
      ERRORS=$((ERRORS+1))
    elif [ "$MODEL_SENTENCES" -lt 6 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): writing.js model_sentence has only $MODEL_SENTENCES sentence(s) — need >= 6${NC}"
      echo -e "   ${YELLOW}   FIX: Ensure model_sentence includes multiple complete sentences for Write/Video guidance${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): writing.js schema correct ($MODEL_CHARS chars, $MODEL_WORDS words, $MODEL_SENTENCES sentences)${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# CHECK 19.5: Core station schema must match runtime components
# =============================================================================
echo -e "${BOLD}[CHECK 19.5] Core station schema — read/explore/ask_ai/shadowing/logic_science${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  SCHEMA_ERRS=""

  READ_FILE="${dir}/read.js"
  EXP_FILE="${dir}/explore.js"
  ASK_FILE="${dir}/ask_ai.js"
  SH_FILE="${dir}/shadowing.js"
  LOGIC_FILE="${dir}/logic_science.js"

  if [ -f "$READ_FILE" ]; then
    grep -q "content_en:" "$READ_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • read.js missing content_en"
    grep -q "comprehension_questions:" "$READ_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • read.js missing comprehension_questions"
  else
    SCHEMA_ERRS="${SCHEMA_ERRS}\n   • Missing file: read.js"
  fi

  if [ -f "$EXP_FILE" ]; then
    grep -q "content_en:" "$EXP_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • explore.js missing content_en"
    grep -q "check_questions:" "$EXP_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • explore.js missing check_questions"
    grep -q "question:" "$EXP_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • explore.js missing question block"
  else
    SCHEMA_ERRS="${SCHEMA_ERRS}\n   • Missing file: explore.js"
  fi

  if [ -f "$ASK_FILE" ]; then
    grep -q "prompts:" "$ASK_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • ask_ai.js missing prompts array"
    ASK_COUNT=$(grep -c "context_en:" "$ASK_FILE" || true)
    [ "$ASK_COUNT" -lt 5 ] && SCHEMA_ERRS="${SCHEMA_ERRS}\n   • ask_ai.js has only $ASK_COUNT prompt(s) — need >= 5"
  else
    SCHEMA_ERRS="${SCHEMA_ERRS}\n   • Missing file: ask_ai.js"
  fi

  if [ -f "$SH_FILE" ]; then
    grep -q "script:\|sentences:" "$SH_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • shadowing.js missing script/sentences array"
    SH_COUNT=$(grep -c "text:" "$SH_FILE" || true)
    [ "$SH_COUNT" -lt 8 ] && SCHEMA_ERRS="${SCHEMA_ERRS}\n   • shadowing.js has only $SH_COUNT line(s) — need >= 8"
  else
    SCHEMA_ERRS="${SCHEMA_ERRS}\n   • Missing file: shadowing.js"
  fi

  if [ -f "$LOGIC_FILE" ]; then
    grep -q "questions:" "$LOGIC_FILE" || SCHEMA_ERRS="${SCHEMA_ERRS}\n   • logic_science.js missing questions array"
    LOGIC_COUNT=$(grep -c "question_en:" "$LOGIC_FILE" || true)
    [ "$LOGIC_COUNT" -lt 3 ] && SCHEMA_ERRS="${SCHEMA_ERRS}\n   • logic_science.js has only $LOGIC_COUNT question(s) — need >= 3"
  else
    SCHEMA_ERRS="${SCHEMA_ERRS}\n   • Missing file: logic_science.js"
  fi

  if [ -n "$SCHEMA_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): Core schema mismatch:${NC}"
    echo -e "$SCHEMA_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Align files to W16 runtime schema to avoid endless loading states${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS ($LABEL): core runtime schema is valid${NC}"
  fi
done
echo ""

# =============================================================================
# CHECK 20: word_power.js — exactly 6 words (W16+), each must be a multi-word collocation
# =============================================================================
echo -e "${BOLD}[CHECK 20] word_power.js — exactly 6 collocation phrases (W16+ standard)${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  WP_FILE="${dir}/word_power.js"
  [ ! -f "$WP_FILE" ] && echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): $WP_FILE not found${NC}" && WARNINGS=$((WARNINGS+1)) && continue

  WORD_COUNT=$(grep -c "\"id\":\|  id:" "$WP_FILE" || true)
  if [ "$WEEK_INT" -ge 16 ]; then
    if [ "$WORD_COUNT" -ne 6 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): word_power.js has $WORD_COUNT word(s) — W16+ standard requires exactly 6${NC}"
      echo -e "   ${YELLOW}FIX: Keep exactly 6 collocations (not the full vocab list)${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): word_power.js has exactly 6 entries${NC}"
    fi
    # Validate each `word:` field is a multi-word collocation (must contain a space)
    SINGLE_WORD_LINES=$(grep -E "^\s+word: \"[^ \"]+\"," "$WP_FILE" | grep -v "audio_word\|image_url\|audio_" || true)
    if [ -n "$SINGLE_WORD_LINES" ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): word_power.js has single-word entries (should be collocations like 'grow up', 'in the past')${NC}"
      echo "$SINGLE_WORD_LINES" | while read line; do
        echo -e "   ${YELLOW}   → $line${NC}"
      done
      echo -e "   ${YELLOW}FIX: word field must be a collocation phrase (2+ words), NOT a single vocabulary word${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): all word entries are multi-word collocations${NC}"
    fi
  else
    if [ "$WORD_COUNT" -lt 6 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): word_power.js has only $WORD_COUNT word(s) — need at least 6${NC}"
      echo -e "   ${YELLOW}FIX: Add more collocations until count >= 6${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): word_power.js has $WORD_COUNT words (>= 6)${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# CHECK 21: mindmap.js — branchLabels keyed by stem text, no completions in centerStems
# =============================================================================
echo -e "${BOLD}[CHECK 21] mindmap.js — branchLabels must be keyed by stem text, no completions array${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  MM_FILE="${dir}/mindmap.js"
  [ ! -f "$MM_FILE" ] && echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): $MM_FILE not found${NC}" && WARNINGS=$((WARNINGS+1)) && continue

  MM_ERRS=""
  # Bad: completions: [ in centerStems
  BAD_COMPLETIONS=$(grep -n "completions:" "$MM_FILE" || true)
  [ -n "$BAD_COMPLETIONS" ] && MM_ERRS="${MM_ERRS}\n      Found 'completions:' — must use branchLabels[stemText] instead: $BAD_COMPLETIONS"

  # Bad: branchLabels with simple string values (not arrays of {text,audio})
  # Detect: branchLabels: { weather: "Weather or weather: { (category object keys)
  BAD_BL_STRING=$(grep -n "branchLabels:" "$MM_FILE" | head -1 || true)
  # Check if branchLabels uses category name keys (not stem sentence keys)
  BAD_CATEGORY=$(grep -n "weather:\|clothing:\|science:\|action:" "$MM_FILE" | grep -v "#\|//" || true)
  [ -n "$BAD_CATEGORY" ] && MM_ERRS="${MM_ERRS}\n      branchLabels uses category name keys (must be keyed by exact stem text): $BAD_CATEGORY"

  if [ -n "$MM_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): mindmap.js schema errors:${NC}"
    echo -e "$MM_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: branchLabels[\"exact stem text\"] = [{text,audio},...] — no completions${NC}"
    ERRORS=$((ERRORS+1))
  else
    BRANCH_COUNT=$(grep -c "audio:" "$MM_FILE" || true)
    if [ "$BRANCH_COUNT" -lt 36 ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): mindmap.js has only $BRANCH_COUNT audio entries — need >= 36 (6 stems × 6 branches)${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): mindmap.js schema correct ($BRANCH_COUNT audio entries)${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# CHECK 22: metadata.js — week N must not have generic "Week N" title
# =============================================================================
echo -e "${BOLD}[CHECK 22] metadata.js — week $WEEK_INT must have a real title (not generic 'Week $WEEK_INT')${NC}"
META_FILE="src/data/weeks/metadata.js"
if [ ! -f "$META_FILE" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $META_FILE not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  # Look for the week entry and check for generic title
  GENERIC_TITLE=$(grep -A2 "^  ${WEEK_INT}:" "$META_FILE" | grep -E "title_en: \"Week ${WEEK_INT}\"|title_en: 'Week ${WEEK_INT}'" || true)
  if [ -n "$GENERIC_TITLE" ]; then
    echo -e "   ${RED}❌ FAIL: metadata.js week $WEEK_INT still has generic title 'Week $WEEK_INT'${NC}"
    echo -e "      ${RED}$GENERIC_TITLE${NC}"
    echo -e "   ${YELLOW}FIX: Update title_en and title_vi in metadata.js for week $WEEK_INT${NC}"
    ERRORS=$((ERRORS+1))
  else
    ACTUAL_TITLE=$(grep -A2 "^  ${WEEK_INT}:" "$META_FILE" | grep "title_en:" | head -1 || true)
    if [ -n "$ACTUAL_TITLE" ]; then
      echo -e "   ${GREEN}✅ PASS: metadata.js week $WEEK_INT has real title:${NC}"
      echo -e "   ${CYAN}   $ACTUAL_TITLE${NC}"
    else
      echo -e "   ${YELLOW}⚠️  WARNING: Could not verify week $WEEK_INT title in metadata.js${NC}"
      WARNINGS=$((WARNINGS+1))
    fi
  fi
fi
echo ""

# =============================================================================
# CHECK 23: daily_watch.js — must have unique video IDs (no generic fallback)
# =============================================================================
echo -e "${BOLD}[CHECK 23] daily_watch.js — video IDs must be unique (no generic fallback)${NC}"
DW_ADV="src/data/weeks/week_${WEEK_PAD}/daily_watch.js"
DW_EASY="src/data/weeks_easy/week_${WEEK_PAD}/daily_watch.js"

for dw_file in "$DW_ADV" "$DW_EASY"; do
  [ ! -f "$dw_file" ] && continue
  LABEL=$([ "$dw_file" = "$DW_ADV" ] && echo "Advanced" || echo "Easy")

  VIDEO_IDS=$(grep -o 'videoId: *"[^"]*"' "$dw_file" | grep -o '"[^"]*"$' | tr -d '"' | sort)
  UNIQUE_COUNT=$(echo "$VIDEO_IDS" | sort -u | grep -c . || true)
  TOTAL_COUNT=$(echo "$VIDEO_IDS" | grep -c . || true)

  if [ "$TOTAL_COUNT" -eq 0 ]; then
    echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): No videoId fields found in $dw_file${NC}"
    WARNINGS=$((WARNINGS+1))
  elif [ "$UNIQUE_COUNT" -lt 2 ]; then
    FALLBACK_ID=$(echo "$VIDEO_IDS" | head -1)
    echo -e "   ${RED}❌ FAIL ($LABEL): All $TOTAL_COUNT videos share same ID '$FALLBACK_ID' — generic fallback!${NC}"
    echo -e "   ${YELLOW}FIX: Restore real topic-specific video IDs in $dw_file${NC}"
    ERRORS=$((ERRORS+1))
  else
    BAD_FORMAT=$(echo "$VIDEO_IDS" | grep -vE '^[A-Za-z0-9_-]{11}$' || true)
    if [ -n "$BAD_FORMAT" ]; then
      echo -e "   ${RED}❌ FAIL ($LABEL): Invalid videoId format detected:${NC}"
      echo "$BAD_FORMAT" | while IFS= read -r vid; do echo -e "   ${RED}   • $vid${NC}"; done
      echo -e "   ${YELLOW}FIX: videoId must be valid 11-char YouTube ID${NC}"
      ERRORS=$((ERRORS+1))
      continue
    fi

    THUMB_FAIL=0
    if command -v curl >/dev/null 2>&1; then
      while IFS= read -r vid; do
        [ -z "$vid" ] && continue
        CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://img.youtube.com/vi/${vid}/mqdefault.jpg" || echo "000")
        if [ "$CODE" = "404" ] || [ "$CODE" = "000" ]; then
          echo -e "   ${RED}❌ FAIL ($LABEL): Thumbnail check failed for videoId '${vid}' (HTTP ${CODE})${NC}"
          THUMB_FAIL=1
        fi
      done <<EOF
$VIDEO_IDS
EOF
    else
      echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): curl not available, thumbnail validation skipped${NC}"
      WARNINGS=$((WARNINGS+1))
    fi

    if [ "$THUMB_FAIL" -eq 1 ]; then
      echo -e "   ${YELLOW}FIX: Re-run update_videos.js or replace dead YouTube IDs${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS ($LABEL): $TOTAL_COUNT videos, $UNIQUE_COUNT unique IDs + thumbnails reachable${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# CHECK 24: video_tasks.json — must have week N queries
# =============================================================================
echo -e "${BOLD}[CHECK 24] video_tasks.json — must include Week ${WEEK_PAD} queries${NC}"
VT_FILE="src/data/video_tasks.json"
if [ ! -f "$VT_FILE" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: video_tasks.json not found${NC}"
  WARNINGS=$((WARNINGS+1))
else
  HAS_WEEK=$(grep -c "\"weekId\": *${WEEK_INT}[^0-9]\|\"weekId\": *${WEEK_INT}$\|week_${WEEK_PAD}" "$VT_FILE" 2>/dev/null || true)
  if [ "$HAS_WEEK" -eq 0 ]; then
    echo -e "   ${RED}❌ FAIL: video_tasks.json missing Week ${WEEK_PAD} entries${NC}"
    echo -e "   ${YELLOW}FIX: Add week_${WEEK_PAD} and week_${WEEK_PAD}_easy queries to video_tasks.json${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: video_tasks.json has Week ${WEEK_PAD} entries ($HAS_WEEK occurrences)${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 25: Image prompt files must exist for week N
# If Easy mode shares images with Advanced (no week_easy images folder / all Easy
# image_url point to /images/weekN/), only the Advanced prompts file is required.
# =============================================================================
echo -e "${BOLD}[CHECK 25] Image prompts — files must exist for Week ${WEEK_PAD}${NC}"
IMG_PROMPTS_DIR="Production_FINAL/IMAGE PROMPTS"
ADV_PROMPTS="${IMG_PROMPTS_DIR}/week_${WEEK_PAD}_image_prompts.txt"
EASY_PROMPTS="${IMG_PROMPTS_DIR}/week_${WEEK_PAD}_easy_image_prompts.txt"

if [ ! -f "$ADV_PROMPTS" ]; then
  echo -e "   ${RED}❌ FAIL: Missing Advanced image prompts: $ADV_PROMPTS${NC}"
  echo -e "   ${YELLOW}FIX: Create $ADV_PROMPTS with 26 image prompts (vocab/wordpower/covers/barmodels)${NC}"
  ERRORS=$((ERRORS+1))
else
  PROMPT_COUNT=$(grep -c "Filename:" "$ADV_PROMPTS" || true)
  if [ "$PROMPT_COUNT" -ne 26 ]; then
    echo -e "   ${RED}❌ FAIL (Advanced): $ADV_PROMPTS has $PROMPT_COUNT prompts — need exactly 26${NC}"
    echo -e "   ${YELLOW}FIX: 13 vocab + 6 wordpower (collocations) + 5 barmodels + 2 covers = 26${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS (Advanced): Found 26 image prompts${NC}"
  fi
fi

# Check if Easy shares images with Advanced (no separate easy prompts needed)
EASY_SHARED=false
if [ -f "$EASY_DIR/vocab.js" ]; then
  EASY_IMG_REFS=$(grep "image_url" "$EASY_DIR/vocab.js" 2>/dev/null | grep -c "week${WEEK}_easy" || true)
  [ "${EASY_IMG_REFS:-0}" -eq 0 ] && EASY_SHARED=true
fi

if [ "$EASY_SHARED" = true ]; then
  echo -e "   ${GREEN}✅ PASS (Easy): Shared images with Advanced — no separate prompts file needed${NC}"
elif [ ! -f "$EASY_PROMPTS" ]; then
  echo -e "   ${RED}❌ FAIL: Missing Easy image prompts: $EASY_PROMPTS${NC}"
  echo -e "   ${YELLOW}FIX: Either create $EASY_PROMPTS OR point all Easy image_url to /images/week${WEEK}/ (shared mode)${NC}"
  ERRORS=$((ERRORS+1))
else
  PROMPT_COUNT=$(grep -c "Filename:" "$EASY_PROMPTS" || true)
  echo -e "   ${GREEN}✅ PASS (Easy): Found $PROMPT_COUNT image prompts${NC}"
fi
echo ""

# =============================================================================
# CHECK 26: Cover image_url paths in read.js/explore.js must exist on disk
# =============================================================================
echo -e "${BOLD}[CHECK 26] Cover images — image_url in read.js/explore.js must match actual files on disk${NC}"
if [ ! -d "$ADV_DIR" ] && [ ! -d "$EASY_DIR" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: Data directories not yet generated${NC}"; WARNINGS=$((WARNINGS+1))
else
  COVER_ERRORS=0
  for JS_FILE in \
    "$ADV_DIR/read.js" \
    "$ADV_DIR/explore.js" \
    "$EASY_DIR/read.js" \
    "$EASY_DIR/explore.js"; do
    [ ! -f "$JS_FILE" ] && continue
    IMG_URL=$(grep 'image_url' "$JS_FILE" | head -1 | sed "s/.*image_url:[[:space:]]*['\"]//;s/['\"].*//" || true)
    [ -z "$IMG_URL" ] && continue
    BASENAME=$(basename "$IMG_URL")
    # Resolve disk path from actual image_url (supports shared-image mode — W16+ Easy may point to /images/weekN/)
    DISK_PATH="public${IMG_URL}"
    if [ ! -f "$DISK_PATH" ]; then
      echo -e "   ${RED}❌ FAIL ($(basename $JS_FILE)): image_url='$IMG_URL' → file not found: $DISK_PATH${NC}"
      echo -e "   ${YELLOW}FIX: image_url must use w${WEEK_INT} (no zero-padding), e.g. read_cover_w${WEEK_INT}.jpg — NOT w0${WEEK_INT}${NC}"
      COVER_ERRORS=$((COVER_ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: $(basename $JS_FILE) → $BASENAME exists${NC}"
    fi
  done
  [ $COVER_ERRORS -gt 0 ] && ERRORS=$((ERRORS+COVER_ERRORS))
fi
echo ""
echo -e "${CYAN}${BOLD}────────────────── CONTENT COUNT / REGISTRATION CHECKS ────────────${NC}"
echo -e "${CYAN}   Validates exercise counts, GameHub registry, AI Tutor tab wiring${NC}"
echo -e "${CYAN}${BOLD}────────────────────────────────────────────────────────────────────${NC}"
echo ""

# =============================================================================
# CHECK 27: grammar.js must have exactly 20 exercises per mode
# =============================================================================
echo -e "${BOLD}[CHECK 27] grammar.js — must have exactly 20 exercises (both modes)${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  GR_FILE="${dir}/grammar.js"
  if [ ! -f "$GR_FILE" ]; then
    echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): grammar.js not found${NC}"; WARNINGS=$((WARNINGS+1)); continue
  fi
  EX_COUNT=$(grep -c "question:" "$GR_FILE" || true)
  if [ "$EX_COUNT" -ne 20 ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): grammar.js has $EX_COUNT exercises (expected exactly 20)${NC}"
    echo -e "   ${YELLOW}FIX: Add/remove exercises until count = 20 in ${GR_FILE}${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS ($LABEL): grammar.js has exactly $EX_COUNT exercises${NC}"
  fi
done
echo ""

# =============================================================================
# CHECK 28: gameAdaptation.js — weekGamesMap must register week N
# =============================================================================
echo -e "${BOLD}[CHECK 28] gameAdaptation.js — week $WEEK_INT must be in weekGamesMap${NC}"
GA_FILE="src/config/gameAdaptation.js"
if [ ! -f "$GA_FILE" ]; then
  echo -e "   ${RED}❌ FAIL: src/config/gameAdaptation.js not found${NC}"; ERRORS=$((ERRORS+1))
else
  GA_ERRS=""
  ADV_IMPORT=$(grep -c "week${WEEK_INT}GamesAdvanced" "$GA_FILE" || true)
  EASY_IMPORT=$(grep -c "week${WEEK_INT}GamesEasy" "$GA_FILE" || true)
  MAP_ENTRY=$(grep -cE "[[:space:]]+${WEEK_INT}: \{" "$GA_FILE" || true)
  [ "$ADV_IMPORT" -eq 0 ] && GA_ERRS="${GA_ERRS}\n   • Missing import: week${WEEK_INT}GamesAdvanced"
  [ "$EASY_IMPORT" -eq 0 ] && GA_ERRS="${GA_ERRS}\n   • Missing import: week${WEEK_INT}GamesEasy"
  [ "$MAP_ENTRY" -eq 0 ] && GA_ERRS="${GA_ERRS}\n   • weekGamesMap missing entry for week $WEEK_INT"
  if [ -n "$GA_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL: gameAdaptation.js not wired for week $WEEK_INT:${NC}"
    echo -e "$GA_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Add imports + register '${WEEK_INT}: { advanced: week${WEEK_INT}GamesAdvanced, easy: week${WEEK_INT}GamesEasy }' in weekGamesMap${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: gameAdaptation.js registers week $WEEK_INT (imports + weekGamesMap entry)${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 29: StoryMissionTab.jsx + FreeTalkTab.jsx must import week N real data
# =============================================================================
echo -e "${BOLD}[CHECK 29] AI Tutor tabs — StoryMissionTab + FreeTalkTab must include week $WEEK_INT${NC}"
for tab_file in \
  "src/modules/ai_tutor/tabs/StoryMissionTab.jsx" \
  "src/modules/ai_tutor/tabs/FreeTalkTab.jsx"; do
  TAB_NAME=$(basename "$tab_file" .jsx)
  if [ ! -f "$tab_file" ]; then
    echo -e "   ${YELLOW}⚠️  SKIP: $TAB_NAME not found${NC}"; WARNINGS=$((WARNINGS+1)); continue
  fi
  HAS_IMPORT=$(grep -c "week${WEEK_INT}RealData\|week_${WEEK_PAD}_real" "$tab_file" || true)
  if [ "$HAS_IMPORT" -eq 0 ]; then
    echo -e "   ${RED}❌ FAIL ($TAB_NAME): week $WEEK_INT not wired — AI Tutor will fall back to older week content${NC}"
    echo -e "   ${YELLOW}FIX: Add import week${WEEK_INT}RealData + ternary 'weekNumber === $WEEK_INT ? week${WEEK_INT}RealData :' in $tab_file${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS ($TAB_NAME): week $WEEK_INT import/ternary present ($HAS_IMPORT occurrence(s))${NC}"
  fi
done
echo ""

# =============================================================================
# CHECK 30: games.js — show_tell, make_sentence, ask_me must have content
# =============================================================================
echo -e "${BOLD}[CHECK 30] games.js — show_tell, make_sentence, ask_me must have content (both modes)${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  GM_FILE="${dir}/games.js"
  if [ ! -f "$GM_FILE" ]; then
    echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): games.js not found${NC}"; WARNINGS=$((WARNINGS+1)); continue
  fi
  GM_ERRS=""
  grep -q "show_tell:" "$GM_FILE" || GM_ERRS="${GM_ERRS}\n   • Missing: show_tell section"
  grep -q "make_sentence:" "$GM_FILE" || GM_ERRS="${GM_ERRS}\n   • Missing: make_sentence section"
  grep -q "ask_me:" "$GM_FILE" || GM_ERRS="${GM_ERRS}\n   • Missing: ask_me section"
  ANSWER_COUNT=$(grep -c "answer:" "$GM_FILE" || true)
  [ "$ANSWER_COUNT" -lt 10 ] && GM_ERRS="${GM_ERRS}\n   • Too few sentence answers ($ANSWER_COUNT 'answer:' entries — need >= 10 across make_sentence + ask_me)"
  if [ -n "$GM_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): games.js content issues:${NC}"
    echo -e "$GM_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Ensure show_tell/make_sentence/ask_me each have >= 5 items${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS ($LABEL): games.js has all 3 game types ($ANSWER_COUNT answer entries)${NC}"
  fi
done
echo ""
# =============================================================================
# CHECK 31: AI Tutor week_NN_real.js — must have conversation_cards array
# =============================================================================
echo -e "${BOLD}[CHECK 31] AI Tutor week_${WEEK_PAD}_real.js — must have conversation_cards (>= 3 cards)${NC}"
if [ ! -f "$AI_TUTOR" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: $AI_TUTOR not yet created${NC}"; WARNINGS=$((WARNINGS+1))
else
  CC_COUNT=$(grep -c "id:.*_cards\|id: \"[a-z_]*\"" "$AI_TUTOR" 2>/dev/null || true)
  HAS_CC=$(grep -c "conversation_cards:" "$AI_TUTOR" 2>/dev/null || true)
  CARD_IDS=$(grep -c "completion_message" "$AI_TUTOR" 2>/dev/null || true)
  if [ "$HAS_CC" -eq 0 ]; then
    echo -e "   ${RED}❌ FAIL: Missing conversation_cards array in $AI_TUTOR${NC}"
    echo -e "   ${YELLOW}FIX: Add conversation_cards: [ ...3 cards... ] at end of file (before closing });)${NC}"
    ERRORS=$((ERRORS+1))
  elif [ "$CARD_IDS" -lt 3 ]; then
    echo -e "   ${RED}❌ FAIL: conversation_cards has only $CARD_IDS card(s) — need >= 3${NC}"
    echo -e "   ${YELLOW}FIX: Add at least 3 cards each with completion_message${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: conversation_cards present with $CARD_IDS card(s)${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 32: Vocab image_url files must exist on disk (catches vocab added after prompts)
# =============================================================================
echo -e "${BOLD}[CHECK 32] vocab.js — all image_url files must exist on disk${NC}"
for dir in "$ADV_DIR" "$EASY_DIR"; do
  [ ! -d "$dir" ] && continue
  LABEL=$([ "$dir" = "$ADV_DIR" ] && echo "Advanced" || echo "Easy")
  VOCAB_FILE="${dir}/vocab.js"
  [ ! -f "$VOCAB_FILE" ] && echo -e "   ${YELLOW}⚠️  SKIP ($LABEL): vocab.js not found${NC}" && WARNINGS=$((WARNINGS+1)) && continue
  VOCAB_ERRS=""
  while IFS= read -r img_path; do
    # Strip quotes and trim
    clean=$(echo "$img_path" | grep -o '"/images/[^"]*"' | tr -d '"')
    [ -z "$clean" ] && continue
    disk_path="public${clean}"
    [ ! -f "$disk_path" ] && VOCAB_ERRS="${VOCAB_ERRS}\n   • MISSING on disk: $clean"
  done < <(grep "image_url" "$VOCAB_FILE")
  if [ -n "$VOCAB_ERRS" ]; then
    echo -e "   ${RED}❌ FAIL ($LABEL): vocab.js references images that don't exist:${NC}"
    echo -e "$VOCAB_ERRS" | while IFS= read -r line; do echo -e "   ${RED}$line${NC}"; done
    echo -e "   ${YELLOW}FIX: Either add the image to public/images/week${WEEK}/ or reuse an existing image${NC}"
    echo -e "   ${YELLOW}NOTE: If you added vocab words AFTER creating image prompts, update the prompt file too${NC}"
    ERRORS=$((ERRORS+1))
  else
    VOCAB_IMG_COUNT=$(grep -c "image_url" "$VOCAB_FILE" || true)
    echo -e "   ${GREEN}✅ PASS ($LABEL): All $VOCAB_IMG_COUNT vocab images exist on disk${NC}"
  fi
done
echo ""

# =============================================================================
# CHECK 33: daily_watch.js — video IDs must not duplicate previous week
# =============================================================================
echo -e "${BOLD}[CHECK 33] daily_watch.js — no duplicate video IDs from previous week (week $((WEEK_INT-1)))${NC}"
PREV_WEEK=$((WEEK_INT - 1))
PREV_WEEK_PAD=$(printf "%02d" $PREV_WEEK)
PREV_DW="src/data/weeks/week_${PREV_WEEK_PAD}/daily_watch.js"
DW_CURR="src/data/weeks/week_${WEEK_PAD}/daily_watch.js"
if [ ! -f "$PREV_DW" ] || [ ! -f "$DW_CURR" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: Previous week daily_watch not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  PREV_IDS=$(grep -o 'videoId: *"[^"]*"' "$PREV_DW" | grep -o '"[^"]*"$' | tr -d '"' | sort)
  CURR_IDS=$(grep -o 'videoId: *"[^"]*"' "$DW_CURR" | grep -o '"[^"]*"$' | tr -d '"' | sort)
  DUPES=""
  while IFS= read -r vid; do
    echo "$PREV_IDS" | grep -qx "$vid" && DUPES="${DUPES} $vid"
  done <<< "$CURR_IDS"
  if [ -n "$DUPES" ]; then
    echo -e "   ${RED}❌ FAIL: Videos duplicated from Week ${PREV_WEEK_PAD}:${DUPES}${NC}"
    echo -e "   ${YELLOW}FIX: Run: node tools/update_videos.js ${WEEK_INT} --reset${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: No duplicate video IDs from Week ${PREV_WEEK_PAD}${NC}"
  fi
fi
echo ""

# =============================================================================
# CHECK 34: vocab.js word count must match image prompt Filename count
# =============================================================================
echo -e "${BOLD}[CHECK 34] vocab.js word count vs image prompt vocab count must match${NC}"
ADV_PROMPTS_CHECK="${IMG_PROMPTS_DIR}/week_${WEEK_PAD}_image_prompts.txt"
VOCAB_FILE_CHECK="${ADV_DIR}/vocab.js"
if [ ! -f "$ADV_PROMPTS_CHECK" ] || [ ! -f "$VOCAB_FILE_CHECK" ]; then
  echo -e "   ${YELLOW}⚠️  SKIP: prompt file or vocab.js not found${NC}"; WARNINGS=$((WARNINGS+1))
else
  # Count vocab entries — use image_url lines which appear exactly once per entry
  PROMPT_VOCAB_COUNT=$(grep "Filename:" "$ADV_PROMPTS_CHECK" | grep -v "wordpower_\|barmodel_\|cover_\|_cover" | grep -c "Filename:" || true)
  DATA_VOCAB_COUNT=$(grep -c "image_url:" "$VOCAB_FILE_CHECK" || true)
  if [ "$PROMPT_VOCAB_COUNT" -ne "$DATA_VOCAB_COUNT" ]; then
    echo -e "   ${RED}❌ FAIL: vocab.js has $DATA_VOCAB_COUNT words but image prompt has $PROMPT_VOCAB_COUNT vocab images${NC}"
    echo -e "   ${YELLOW}FIX: If you added vocab words after images were generated, either:${NC}"
    echo -e "   ${YELLOW}  (a) Reuse an existing image_url for the new word, OR${NC}"
    echo -e "   ${YELLOW}  (b) Add the new word as prompt #$(($PROMPT_VOCAB_COUNT+1)) to the prompt file and generate the image${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: vocab.js ($DATA_VOCAB_COUNT words) matches image prompts ($PROMPT_VOCAB_COUNT vocab images)${NC}"
  fi
fi
echo ""

# =============================================================================
# SUMMARY
# =============================================================================
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}${BOLD}  ✅ CODE QUALITY GATE PASSED — Week ${WEEK_PAD}${NC}"
  echo -e "${GREEN}  All 34 checks passed. Safe to commit.${NC}"
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}${BOLD}  ⚠️  PASSED WITH ${WARNINGS} WARNING(S) — Week ${WEEK_PAD}${NC}"
  echo -e "${YELLOW}  Zero errors (safe to commit). Review warnings before deploy.${NC}"
else
  echo -e "${RED}${BOLD}  ❌ GATE FAILED — ${ERRORS} ERROR(S), ${WARNINGS} WARNING(S) — Week ${WEEK_PAD}${NC}"
  echo -e "${RED}  DO NOT COMMIT. Fix all errors above.${NC}"
  echo ""
  echo -e "${YELLOW}  Reference: CRITICAL_RULES.md | LESSONS_LEARNED_WEEK_9-11_FOR_W12.md${NC}"
fi
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"

exit $ERRORS
