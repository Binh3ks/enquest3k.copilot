#!/bin/bash

################################################################################
# MASS_PRODUCTION_FINAL.SH - EngQuest3k Complete Week Production Pipeline
################################################################################
#
# Purpose: Automated week content generation with manual content creation
#
# Flow:
#   0. Backup existing data
#   1. Manual content generation (Claude creates 29 files)
#   2. Validate content (schema, counts, URLs)
#   3. Sync data (dictation/shadowing from read.js, auto-fill URLs)
#   4. Register in database
#   5. Generate audio files (TTS)
#   5.5. Auto-fill mindmap audio URLs (prevent browser TTS fallback)
#   6. Generate images (AI)
#   7. Fetch videos (YouTube)
#   8. Final validation
#   9. Report & cleanup
#
# Usage:
#   bash tools/mass_production_final.sh <week_number> [--skip-backup]
#
# Example:
#   bash tools/mass_production_final.sh 3
#
################################################################################

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check arguments
if [ -z "$1" ]; then
  echo -e "${RED}❌ Usage: bash tools/mass_production_final.sh <week_number> [--skip-backup]${NC}"
  echo -e "   Example: bash tools/mass_production_final.sh 3"
  exit 1
fi

WEEK=$1
SKIP_BACKUP=$2
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="Backup/weeks/week_$(printf '%02d' $WEEK)_backup_${TIMESTAMP}"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 MASS PRODUCTION FINAL - WEEK ${WEEK}${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 0: Backup existing data
if [ "$SKIP_BACKUP" != "--skip-backup" ]; then
  echo -e "${YELLOW}[0/9] 💾 Backing up existing data...${NC}"
  
  WEEK_FOLDER="src/data/weeks/week_$(printf '%02d' $WEEK)"
  WEEK_EASY_FOLDER="src/data/weeks_easy/week_$(printf '%02d' $WEEK)"
  AI_TUTOR_FILE="src/data/weeks/week_$(printf '%02d' $WEEK)_real.js"
  
  if [ -d "$WEEK_FOLDER" ] || [ -d "$WEEK_EASY_FOLDER" ] || [ -f "$AI_TUTOR_FILE" ]; then
    mkdir -p "$BACKUP_DIR"
    
    if [ -d "$WEEK_FOLDER" ]; then
      cp -r "$WEEK_FOLDER" "$BACKUP_DIR/advanced"
      echo -e "${GREEN}   ✅ Backed up Advanced mode to ${BACKUP_DIR}/advanced${NC}"
    fi
    
    if [ -d "$WEEK_EASY_FOLDER" ]; then
      cp -r "$WEEK_EASY_FOLDER" "$BACKUP_DIR/easy"
      echo -e "${GREEN}   ✅ Backed up Easy mode to ${BACKUP_DIR}/easy${NC}"
    fi
    
    if [ -f "$AI_TUTOR_FILE" ]; then
      cp "$AI_TUTOR_FILE" "$BACKUP_DIR/"
      echo -e "${GREEN}   ✅ Backed up AI Tutor file${NC}"
    fi
    
    echo -e "${GREEN}✅ Backup complete${NC}"
  else
    echo -e "${CYAN}   ℹ️  No existing data to backup${NC}"
  fi
  echo ""
else
  echo -e "${CYAN}[0/9] ⏭️  Skipping backup (--skip-backup flag)${NC}"
  echo ""
fi

# Step 1: Manual content generation
echo -e "${YELLOW}[1/9] ✍️  Manual Content Generation${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}📋 INSTRUCTIONS:${NC}"
echo -e "${CYAN}   1. Read: ENGQUEST MASTER PROMPT V25-FINAL.txt${NC}"
echo -e "${CYAN}   2. Read: Syllabus for Week ${WEEK}${NC}"
echo -e "${CYAN}   3. Generate 29 files:${NC}"
echo -e "${CYAN}      - Advanced: 14 files in src/data/weeks/week_$(printf '%02d' $WEEK)/${NC}"
echo -e "${CYAN}      - Easy: 14 files in src/data/weeks_easy/week_$(printf '%02d' $WEEK)/${NC}"
echo -e "${CYAN}      - AI Tutor: 1 file in src/data/weeks/week_$(printf '%02d' $WEEK)_real.js${NC}"
echo -e "${CYAN}   4. Use Week 1 & 2 as Golden Standard${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
read -p "Press Enter after you have created all 29 files (or Ctrl+C to abort)..."
echo -e "${GREEN}✅ Content files ready${NC}"
echo ""

# Step 2: Validate content quality (comprehensive)
echo -e "${YELLOW}[2/9] 🔍 Validating content quality...${NC}"
node tools/validate_week.js $WEEK

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Validation failed! Please fix errors and retry.${NC}"
  echo ""
  read -p "Retry validation? (Y/n): " RETRY
  if [ "$RETRY" != "n" ] && [ "$RETRY" != "N" ]; then
    echo -e "${CYAN}🔄 Retrying validation...${NC}"
    node tools/validate_week.js $WEEK
    if [ $? -ne 0 ]; then
      echo -e "${RED}❌ Validation still failing. Aborting.${NC}"
      exit 1
    fi
  else
    echo -e "${RED}❌ Aborted by user.${NC}"
    exit 1
  fi
fi
echo -e "${GREEN}✅ Quality validation passed${NC}"
echo ""

# Step 3: Sync data
echo -e "${YELLOW}[3/9] 🔄 Syncing data (dictation/shadowing/URLs)...${NC}"
python3 tools/sync_week_data.py $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Data sync failed!${NC}"
  exit 1
fi

# Verify URLs are filled
echo -e "${CYAN}   Verifying URLs are filled...${NC}"
python3 << 'EOF'
import re
import sys
import os
from pathlib import Path

week = int(os.environ.get('WEEK', 0))
week_str = f"{week:02d}"

errors = []
for mode in ['advanced', 'easy']:
    base = f"src/data/{'weeks' if mode == 'advanced' else 'weeks_easy'}/week_{week_str}"
    
    # Check vocab.js for audio_word and image_url
    vocab_file = Path(base) / "vocab.js"
    if vocab_file.exists():
        content = vocab_file.read_text()
        if 'audio_word: ""' in content or 'audio_word: null' in content:
            errors.append(f"{mode} vocab.js has empty audio_word")
        if 'image_url: ""' in content or 'image_url: null' in content:
            errors.append(f"{mode} vocab.js has empty image_url")
    
    # Check dictation.js for audio_url
    dictation_file = Path(base) / "dictation.js"
    if dictation_file.exists():
        content = dictation_file.read_text()
        if 'audio_url: ""' in content or 'audio_url: null' in content:
            errors.append(f"{mode} dictation.js has empty audio_url")

if errors:
    print("❌ URL Fill Errors:")
    for err in errors:
        print(f"   - {err}")
    sys.exit(1)

print("✅ All URLs filled correctly")
EOF

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ URL validation failed! Please check sync_week_data.py${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Data sync complete${NC}"
echo ""

# Step 4: Register in database
echo -e "${YELLOW}[4/9] 💾 Registering in syllabus database...${NC}"
node tools/update_db_smart.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Database registration failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Database registration complete${NC}"
echo ""

# Validate Ask-AI prompts before audio generation
echo -e "${YELLOW}[5_pre] 🔎 Validating Ask-AI prompts...${NC}"
node tools/validate_ask_ai.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Ask-AI validation failed! Aborting before audio generation.${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Ask-AI validation passed${NC}"
echo ""

# Step 5: Generate audio files
echo -e "${YELLOW}[5/9] 🔊 Generating audio files...${NC}"
python3 tools/generate_audio_final.py $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Audio generation failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Audio generation complete${NC}"
echo ""

# Step 5.5: Auto-fill audio URLs for mindmap
echo -e "${YELLOW}[5.5/9] 🔗 Auto-filling mindmap audio URLs...${NC}"
node tools/update_mindmap_audio_urls.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Mindmap audio URL auto-fill failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Mindmap audio URLs auto-filled${NC}"
echo ""

# Step 6: Generate images
echo -e "${YELLOW}[6/9] 🖼️  Generating images...${NC}"
echo -e "${CYAN}   Generating Advanced mode images...${NC}"
node tools/generate_images_nano_banana.js $WEEK advanced
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Advanced mode image generation failed!${NC}"
  exit 1
fi

echo -e "${CYAN}   Generating Easy mode images...${NC}"
node tools/generate_images_nano_banana.js $WEEK easy
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Easy mode image generation failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Image generation complete${NC}"
echo ""

# Step 7: Fetch videos
echo -e "${YELLOW}[7/9] 📹 Fetching videos from YouTube...${NC}"
node tools/update_videos.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Video fetch failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Video fetch complete${NC}"
echo ""

# Step 8: Final validation
echo -e "${YELLOW}[8/9] ✅ Final validation...${NC}"
WEEK=$WEEK python3 << 'EOF'
import os
import glob
import sys

week = int(os.environ.get('WEEK', 0))

# Count files
week_str = f"{week:02d}"
content_adv = len(glob.glob(f"src/data/weeks/week_{week_str}/*.js"))
content_easy = len(glob.glob(f"src/data/weeks_easy/week_{week_str}/*.js"))
ai_tutor = os.path.exists(f"src/data/weeks/week_{week_str}_real.js")
# Check both week2 and week_02 formats for images
images_adv = len(glob.glob(f"public/images/week{week}/*")) + len(glob.glob(f"public/images/week_{week_str}/*"))
images_easy = len(glob.glob(f"public/images/week{week}_easy/*")) + len(glob.glob(f"public/images/week_{week_str}_easy/*"))
# Check both week2 and week_02 formats for audio
audio_adv = len(glob.glob(f"public/audio/week{week}/*.mp3")) + len(glob.glob(f"public/audio/week_{week_str}/*.mp3"))
audio_easy = len(glob.glob(f"public/audio/week{week}_easy/*.mp3")) + len(glob.glob(f"public/audio/week_{week_str}_easy/*.mp3"))

print(f"\n📊 WEEK {week} FINAL REPORT:")
print(f"   📄 Content Advanced: {content_adv}/14 files")
print(f"   📄 Content Easy: {content_easy}/14 files")
print(f"   🤖 AI Tutor: {'✅' if ai_tutor else '❌ MISSING'}")
print(f"   🖼️  Images Advanced: {images_adv} files (Expected: 15-20)")
print(f"   🖼️  Images Easy: {images_easy} files (Expected: 25-35)")
print(f"   🔊 Audio Advanced: {audio_adv} files (Expected: 120-150)")
print(f"   🔊 Audio Easy: {audio_easy} files (Expected: 115-145)")

issues = []
warnings = []

# Critical checks
if content_adv < 14:
    issues.append(f"Advanced content incomplete ({content_adv}/14)")
if content_easy < 14:
    issues.append(f"Easy content incomplete ({content_easy}/14)")
if not ai_tutor:
    issues.append(f"AI Tutor file missing: week_{week_str}_real.js")

# Asset checks (warnings only - might vary by content)
if audio_adv < 100:
    warnings.append(f"Advanced audio suspiciously low ({audio_adv} files, Week 1 has 130)")
if audio_easy < 100:
    warnings.append(f"Easy audio suspiciously low ({audio_easy} files, Week 1 has 126)")
if images_adv < 10:
    warnings.append(f"Advanced images suspiciously low ({images_adv} files, Week 1 has 17)")
if images_easy < 15:
    warnings.append(f"Easy images suspiciously low ({images_easy} files, Week 1 has 29)")

if warnings:
    print("\n⚠️  WARNINGS:")
    for warning in warnings:
        print(f"   - {warning}")

if issues:
    print("\n❌ CRITICAL ISSUES:")
    for issue in issues:
        print(f"   - {issue}")
    sys.exit(1)

print("\n✅ All critical validations passed!")
EOF

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Final validation failed!${NC}"
  exit 1
fi
echo ""

# Step 9: Report & cleanup
echo -e "${YELLOW}[9/9] 📊 Final report${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 WEEK ${WEEK} PRODUCTION COMPLETE!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$SKIP_BACKUP" != "--skip-backup" ] && [ -d "$BACKUP_DIR" ]; then
  echo -e "${CYAN}💾 Backup location: ${BACKUP_DIR}${NC}"
  echo ""
  read -p "Delete backup? (y/N): " DELETE_BACKUP
  if [ "$DELETE_BACKUP" = "y" ] || [ "$DELETE_BACKUP" = "Y" ]; then
    rm -rf "$BACKUP_DIR"
    echo -e "${GREEN}✅ Backup deleted${NC}"
  else
    echo -e "${CYAN}ℹ️  Backup kept at: ${BACKUP_DIR}${NC}"
  fi
fi

echo ""
echo -e "${GREEN}✅ Week ${WEEK} is ready for production!${NC}"
echo ""
