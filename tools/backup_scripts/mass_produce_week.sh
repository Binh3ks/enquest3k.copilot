#!/bin/bash

################################################################################
# MASS_PRODUCE_WEEK.SH - EngQuest3k Automated Week Production Workflow
################################################################################
#
# Purpose: Automate full week content generation pipeline
#
# Flow:
#   1. Generate content (GPT-4)
#   2. Validate quality (8 QA rules)
#   3. Register in database
#   4. Test UI (optional manual step)
#   5. Generate audio (Google TTS)
#   6. Generate images (Gemini Nano)
#   7. Fetch videos (YouTube API)
#
# Usage:
#   bash tools/mass_produce_week.sh <week_number>
#
# Example:
#   bash tools/mass_produce_week.sh 2
#
################################################################################

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check arguments
if [ -z "$1" ]; then
  echo -e "${RED}❌ Usage: bash tools/mass_produce_week.sh <week_number>${NC}"
  echo -e "   Example: bash tools/mass_produce_week.sh 2"
  exit 1
fi

WEEK=$1

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 MASS PRODUCTION WORKFLOW - WEEK ${WEEK}${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Generate content
echo -e "${YELLOW}[1/7] 📝 Generating content with GPT-4...${NC}"
node tools/generate_week.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Content generation failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Content generation complete${NC}"
echo ""

# Step 2: Validate quality
echo -e "${YELLOW}[2/7] 🔍 Validating quality (8 QA rules)...${NC}"
node tools/validate_week.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Validation failed! Please review and fix issues.${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Validation passed${NC}"
echo ""

# Step 3: Register in database
echo -e "${YELLOW}[3/7] 💾 Registering in syllabus database...${NC}"
node tools/update_db_smart.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Database registration failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Database registration complete${NC}"
echo ""

# Step 4: Test UI (manual prompt)
echo -e "${YELLOW}[4/7] 🖥️  Testing UI...${NC}"
echo -e "${BLUE}   To test: npm run dev → http://localhost:5173${NC}"
echo -e "${BLUE}   Navigate to Week ${WEEK} and verify all tabs load correctly.${NC}"
read -p "   Press Enter after testing UI (or Ctrl+C to abort)..."
echo -e "${GREEN}✅ UI test complete${NC}"
echo ""

# Step 5: Generate audio
echo -e "${YELLOW}[5/7] 🎵 Generating audio files (Google TTS)...${NC}"
node tools/batch_manager.js week$WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Audio generation failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Audio generation complete${NC}"
echo ""

# Step 6: Generate images
echo -e "${YELLOW}[6/7] 🎨 Generating images (Gemini Nano)...${NC}"
node tools/generate_images_nano.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Image generation failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Image generation complete${NC}"
echo ""

# Step 7: Fetch videos
echo -e "${YELLOW}[7/7] 📹 Fetching videos (YouTube API)...${NC}"
node tools/update_videos.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Video fetch failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Video fetch complete${NC}"
echo ""

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 WEEK ${WEEK} PRODUCTION COMPLETE!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}✅ All steps completed successfully!${NC}"
echo ""
echo -e "📁 Output:"
echo -e "   - Content: src/data/weeks/week_$(printf '%02d' $WEEK)/"
echo -e "   - Audio:   public/audio/week$WEEK/"
echo -e "   - Images:  public/images/week$WEEK/"
echo ""
echo -e "🔄 Next steps:"
echo -e "   - Test all tabs in UI"
echo -e "   - Manual content review (optional)"
echo -e "   - Push to production"
echo ""
