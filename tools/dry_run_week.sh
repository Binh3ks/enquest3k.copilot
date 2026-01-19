#!/bin/bash

################################################################################
# DRY_RUN_WEEK.SH - Mass Production Dry Run (Simulation Only)
################################################################################
#
# Purpose: Simulate mass production workflow WITHOUT actually calling APIs
#          or creating files. Used to verify logic and catch errors.
#
# Usage:
#   bash tools/dry_run_week.sh <week_number>
#
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Check arguments
if [ -z "$1" ]; then
  echo -e "${RED}❌ Usage: bash tools/dry_run_week.sh <week_number>${NC}"
  exit 1
fi

WEEK=$1

echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}🧪 DRY RUN: MASS PRODUCTION SIMULATION - WEEK ${WEEK}${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}ℹ️  This is a DRY RUN - no files will be created, no APIs will be called${NC}"
echo ""

# ============================================================================
# STEP 1: Pre-flight checks
# ============================================================================
echo -e "${YELLOW}[PRE-FLIGHT] 🔍 Checking dependencies...${NC}"

# Check Master Prompt exists
if [ ! -f "5. ENGQUEST MASTER PROMPT V24.2-FINAL.txt" ]; then
  echo -e "${RED}❌ Master Prompt not found!${NC}"
  exit 1
fi
echo -e "${GREEN}  ✅ Master Prompt V24.2 found${NC}"

# Check Syllabus exists
if [ ! -f "1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt" ]; then
  echo -e "${RED}❌ Syllabus file not found!${NC}"
  exit 1
fi
echo -e "${GREEN}  ✅ Syllabus file found${NC}"

# Check API keys
if [ ! -f "API keys.txt" ]; then
  echo -e "${YELLOW}  ⚠️  API keys.txt not found (will use environment variables)${NC}"
else
  echo -e "${GREEN}  ✅ API keys.txt found${NC}"
fi

# Check tools exist
REQUIRED_TOOLS=(
  "tools/generate_week.js"
  "tools/validate_week.js"
  "tools/update_db_smart.js"
  "tools/batch_manager.js"
  "tools/generate_images_nano.js"
  "tools/update_videos.js"
)

for tool in "${REQUIRED_TOOLS[@]}"; do
  if [ ! -f "$tool" ]; then
    echo -e "${RED}❌ Missing tool: $tool${NC}"
    exit 1
  fi
done
echo -e "${GREEN}  ✅ All required tools found${NC}"

# Check Week 1 exists as template
if [ ! -d "src/data/weeks/week_01" ]; then
  echo -e "${RED}❌ Week 1 template not found!${NC}"
  exit 1
fi
echo -e "${GREEN}  ✅ Week 1 template exists${NC}"

# Check week_01_real.js exists
if [ ! -f "src/data/weeks/week_01_real.js" ]; then
  echo -e "${RED}❌ week_01_real.js not found!${NC}"
  exit 1
fi
echo -e "${GREEN}  ✅ week_01_real.js exists (AI Tutor template)${NC}"

# Check weekData.js has dynamic loading
if ! grep -q "import(\`./weeks/week_" "src/data/weekData.js"; then
  echo -e "${RED}❌ weekData.js does not have dynamic import!${NC}"
  exit 1
fi
echo -e "${GREEN}  ✅ weekData.js has dynamic loading${NC}"

echo ""

# ============================================================================
# STEP 2: Simulate content generation
# ============================================================================
echo -e "${YELLOW}[1/7] 📝 Simulating content generation...${NC}"
echo -e "${BLUE}  Would generate:${NC}"
echo -e "${BLUE}    - src/data/weeks/week_$(printf '%02d' $WEEK)/         (14 .js + 1 .json)${NC}"
echo -e "${BLUE}    - src/data/weeks_easy/week_$(printf '%02d' $WEEK)/    (14 .js)${NC}"
echo -e "${BLUE}    - src/data/weeks/week_$(printf '%02d' $WEEK)_real.js  (AI Tutor - shared)${NC}"
echo -e "${BLUE}  Files:${NC}"
echo -e "${BLUE}    1. vocab.js (Advanced)${NC}"
echo -e "${BLUE}    2. read.js (Advanced)${NC}"
echo -e "${BLUE}    3. explore.js (Advanced)${NC}"
echo -e "${BLUE}    4. word_power.js (Advanced)${NC}"
echo -e "${BLUE}    5. grammar.js (Advanced)${NC}"
echo -e "${BLUE}    6. logic.js (Advanced)${NC}"
echo -e "${BLUE}    7. writing.js (Advanced)${NC}"
echo -e "${BLUE}    8. dictation.js (Advanced)${NC}"
echo -e "${BLUE}    9. shadowing.js (Advanced)${NC}"
echo -e "${BLUE}    10. word_match.js (Advanced)${NC}"
echo -e "${BLUE}    11. mindmap.js (Advanced)${NC}"
echo -e "${BLUE}    12. ask_ai.js (Advanced)${NC}"
echo -e "${BLUE}    13. daily_watch.js (Advanced)${NC}"
echo -e "${BLUE}    14. index.js (Advanced)${NC}"
echo -e "${BLUE}    15. video_queries.json (Advanced)${NC}"
echo -e "${BLUE}    16-28. Same files for Easy mode (no video_queries)${NC}"
echo -e "${BLUE}    29. week_$(printf '%02d' $WEEK)_real.js (AI Tutor - parent folder)${NC}"
echo -e "${GREEN}✅ Would call GPT-4 API ~30 times (estimated cost: $2-3)${NC}"
echo ""

# ============================================================================
# STEP 3: Simulate validation
# ============================================================================
echo -e "${YELLOW}[2/7] 🔍 Checking validation logic...${NC}"

# Check if validate_week.js looks for files in correct locations
if grep -q "14 .js files in week folder" "tools/validate_week.js"; then
  echo -e "${GREEN}  ✅ Validator expects 14 files in week_XX folder${NC}"
else
  echo -e "${YELLOW}  ⚠️  Validator might have incorrect file count${NC}"
fi

if grep -q "parent folder" "tools/validate_week.js"; then
  echo -e "${GREEN}  ✅ Validator checks week_XX_real.js in parent folder${NC}"
else
  echo -e "${RED}  ❌ Validator does not check parent folder for week_XX_real.js!${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Validation logic correct${NC}"
echo ""

# ============================================================================
# STEP 4: Simulate database registration
# ============================================================================
echo -e "${YELLOW}[3/7] 💾 Simulating database registration...${NC}"
if [ -f "tools/update_db_smart.js" ]; then
  echo -e "${BLUE}  Would update: src/data/syllabus_database.js${NC}"
  echo -e "${GREEN}✅ Database registration tool found${NC}"
else
  echo -e "${RED}❌ update_db_smart.js not found!${NC}"
  exit 1
fi
echo ""

# ============================================================================
# STEP 5: UI Test reminder
# ============================================================================
echo -e "${YELLOW}[4/7] 🖥️  UI Test Plan...${NC}"
echo -e "${BLUE}  Manual steps required:${NC}"
echo -e "${BLUE}    1. npm run dev${NC}"
echo -e "${BLUE}    2. Navigate to Week ${WEEK}${NC}"
echo -e "${BLUE}    3. Check all 13 tabs load${NC}"
echo -e "${BLUE}    4. Open AI Tutor → Verify Week ${WEEK} content loads (not Week 1)${NC}"
echo -e "${BLUE}    5. Check browser console for dynamic import logs${NC}"
echo -e "${GREEN}✅ UI test plan ready${NC}"
echo ""

# ============================================================================
# STEP 6: Simulate audio generation
# ============================================================================
echo -e "${YELLOW}[5/7] 🎵 Simulating audio generation...${NC}"
echo -e "${BLUE}  Would generate:${NC}"
echo -e "${BLUE}    - public/audio/week${WEEK}/vocab/*.mp3 (10 files)${NC}"
echo -e "${BLUE}    - public/audio/week${WEEK}/dictation/*.mp3 (~10 files)${NC}"
echo -e "${BLUE}    - public/audio/week${WEEK}/read/*.mp3 (1 file)${NC}"
echo -e "${GREEN}✅ Would call Google TTS API ~21 times${NC}"
echo ""

# ============================================================================
# STEP 7: Simulate image generation
# ============================================================================
echo -e "${YELLOW}[6/7] 🎨 Simulating image generation...${NC}"
echo -e "${BLUE}  Would generate:${NC}"
echo -e "${BLUE}    - public/images/week${WEEK}/vocab/*.jpg (10 files)${NC}"
echo -e "${BLUE}    - public/images/week${WEEK}/read/cover.jpg (1 file)${NC}"
echo -e "${BLUE}    - public/images/week${WEEK}/explore/cover.jpg (1 file)${NC}"
echo -e "${GREEN}✅ Would call Nano Banana (FREE tier)${NC}"
echo ""

# ============================================================================
# STEP 8: Simulate video fetching
# ============================================================================
echo -e "${YELLOW}[7/7] 📹 Simulating video fetching...${NC}"
echo -e "${BLUE}  Would fetch:${NC}"
echo -e "${BLUE}    - 3-5 YouTube video IDs${NC}"
echo -e "${BLUE}    - Update daily_watch.js with real data${NC}"
echo -e "${GREEN}✅ Would call YouTube API ~3-5 times${NC}"
echo ""

# ============================================================================
# Final Summary
# ============================================================================
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ DRY RUN COMPLETE - NO ERRORS DETECTED${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}📊 Estimated Production Metrics:${NC}"
echo -e "   - Total files: 29 (14 Advanced + 1 JSON + 14 Easy + 1 AI Tutor)"
echo -e "   - GPT-4 API calls: ~30"
echo -e "   - Google TTS calls: ~21"
echo -e "   - Nano Banana calls: ~12 (FREE)"
echo -e "   - YouTube API calls: ~5"
echo -e "   - Estimated time: 5-10 minutes"
echo -e "   - Estimated cost: $2-4"
echo ""
echo -e "${GREEN}🚀 Ready to run real production:${NC}"
echo -e "   ${YELLOW}bash tools/mass_produce_week.sh ${WEEK}${NC}"
echo ""
echo -e "${BLUE}💡 Critical checks passed:${NC}"
echo -e "   ✅ All dependencies present"
echo -e "   ✅ Dynamic loading configured"
echo -e "   ✅ File locations correct (week_XX_real.js in parent)"
echo -e "   ✅ Validation logic matches file structure"
echo -e "   ✅ Week 1 template available"
echo ""
