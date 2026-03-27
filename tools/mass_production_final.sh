#!/bin/bash

################################################################################
# MASS_PRODUCTION_FINAL.SH - EngQuest3k Complete Week Production Pipeline
################################################################################
#
# Purpose: Automated week content generation with manual content creation
#
# Flow:
#   0. Backup existing data
#   1. Manual content generation (29 JS files + image prompt file(s))
#   2. Validate content (schema, counts, URLs)
#   3. Sync data (dictation/shadowing from read.js, auto-fill URLs)
#   4. Register in database
#   5. Generate audio files (TTS)
#   5.5. Auto-fill mindmap audio URLs (prevent browser TTS fallback)
#   6. Generate images (automated AI) — image prompt files must exist first
#   7. Fetch videos (YouTube) — REQUIRES video_tasks.json entries, backs up daily_watch.js
#   8. Final validation
#   8.5. CODE QUALITY GATE (34 checks) — verifies image prompts + video IDs + all schemas + W20 lessons
#   9. Report & cleanup
#
# CRITICAL RULES:
#   - Create image prompt file(s) BEFORE Step 6: Production_FINAL/IMAGE PROMPTS/week_NN_*.txt
#   - Add week entries to video_tasks.json BEFORE Step 7 (update_videos.js)
#   - NEVER run update_videos.js without checking video_tasks.json — fallback destroys videos
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
echo -e "${CYAN}   3. Generate files (W16+ template):${NC}"
echo -e "${CYAN}      - Advanced: 16 JS files in src/data/weeks/week_$(printf '%02d' $WEEK)/${NC}"
echo -e "${CYAN}      - Easy: 16 JS files in src/data/weeks_easy/week_$(printf '%02d' $WEEK)/${NC}"
echo -e "${CYAN}      - AI Tutor: 1 file in src/data/weeks/week_$(printf '%02d' $WEEK)_real.js${NC}"
echo -e "${CYAN}      (W16 adds: logic_science.js + singapore_math.js + games.js — no logic.js)${NC}"
echo -e "${CYAN}   4. Use Week 16 as Golden Standard (NOT Week 1/2 — W16 = current template)${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📸 ALSO REQUIRED — Image prompt files (for manual + AI image generation):${NC}"
if [ "$WEEK" -ge 20 ]; then
  echo -e "${YELLOW}   Create ONE unified file in Production_FINAL/IMAGE PROMPTS/:${NC}"
  echo -e "${YELLOW}      week_$(printf '%02d' $WEEK)_image_prompts.txt${NC}"
  echo -e "${YELLOW}      (31 lines: vocab/wordpower + 2 covers + 10 bar models for both modes)${NC}"
  echo -e "${YELLOW}      Required bar model names:${NC}"
  echo -e "${YELLOW}      - barmodel_w$(printf '%02d' $WEEK)_adv_p1.jpg ... barmodel_w$(printf '%02d' $WEEK)_adv_p5.jpg${NC}"
  echo -e "${YELLOW}      - barmodel_w$(printf '%02d' $WEEK)_easy_p1.jpg ... barmodel_w$(printf '%02d' $WEEK)_easy_p5.jpg${NC}"
else
  echo -e "${YELLOW}   Create BOTH files in Production_FINAL/IMAGE PROMPTS/:${NC}"
  echo -e "${YELLOW}      week_$(printf '%02d' $WEEK)_image_prompts.txt      (Advanced — 26 lines)${NC}"
  echo -e "${YELLOW}      week_$(printf '%02d' $WEEK)_easy_image_prompts.txt  (Easy — same structure, simpler descriptions)${NC}"
fi
echo -e "${YELLOW}   Format: see week_16_image_prompts.txt as golden standard${NC}"
echo -e "${RED}   ⚠️  COVER NAMING: image_url in read.js/explore.js must use w\${WEEK} (NO zero-padding)${NC}"
echo -e "${RED}      e.g. read_cover_w17.jpg — NOT read_cover_w017.jpg (w016 is unique to W16 golden)${NC}"
echo -e "${RED}      Check 26 will FAIL if image_url does not match a real file on disk.${NC}"
echo -e "${YELLOW}   NOTE: Code Quality Gate Check 25 will FAIL if these files are missing${NC}"
echo -e "${YELLOW}         Code Quality Gate Checks 31-34 catch: no conv_cards / image missing / video dup / vocab count mismatch${NC}"
echo -e "${YELLOW}         Code Quality Gate Check 26 will FAIL if cover image_url doesn't match actual filename${NC}"
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

# Step 5: Audio — W16+ uses on-demand TTS (no local pre-generation)
# W1-15: Generate local audio via Google TTS → manual upload to R2 → add to CDN_WEEKS
# W16+:  audio_url in data files = R2 storage key. Worker generates on first play.
WEEK_INT_NUM=$(echo "$WEEK" | sed 's/^0*//')
if [ "$WEEK_INT_NUM" -lt 16 ]; then
  echo -e "${YELLOW}[5/9] 🔊 Generating audio files (pre-generation for W1-15)...${NC}"
  python3 tools/generate_audio_final.py $WEEK
  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Audio generation failed!${NC}"
    exit 1
  fi
  echo -e "${GREEN}✅ Audio generation complete${NC}"
else
  echo -e "${CYAN}[5/9] ⏭️  On-demand TTS — no audio pre-generation for W16+${NC}"
  echo -e "${CYAN}   audio_url fields in data = R2 storage keys for Deepgram Worker cache${NC}"
  echo -e "${CYAN}   Audio is generated on first playback and cached to R2 automatically${NC}"
fi
echo ""

# Step 5.5: Auto-fill audio URL paths in data files (still needed for W16+ on-demand R2 keys)
# These are NOT local file paths — they are R2 storage keys used by the Deepgram Worker.
echo -e "${YELLOW}[5.5/9] 🔗 Auto-filling audio URL paths (R2 storage keys)...${NC}"
node tools/update_mindmap_audio_urls.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Audio URL path auto-fill failed!${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Audio URL paths auto-filled${NC}"
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

# SAFETY CHECK 0: Always regenerate week video_queries.json before update
echo -e "${CYAN}   Regenerating week video_queries.json from blueprint...${NC}"
node tools/generate_video_queries.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to generate video_queries.json for week $(printf '%02d' $WEEK)${NC}"
  exit 1
fi
VQ_FILE="src/data/weeks/week_$(printf '%02d' $WEEK)/video_queries.json"
if [ ! -f "$VQ_FILE" ]; then
  echo -e "${RED}❌ ABORT: Missing $VQ_FILE after generation${NC}"
  exit 1
fi
echo -e "${GREEN}   ✅ video_queries.json refreshed: $VQ_FILE${NC}"

# SAFETY CHECK 1: video_tasks.json must have entries for this week
echo -e "${CYAN}   Checking video_tasks.json has Week $(printf '%02d' $WEEK) entries...${NC}"
VT_FILE="src/data/video_tasks.json"
if [ ! -f "$VT_FILE" ]; then
  echo -e "${RED}❌ ABORT: video_tasks.json not found. Cannot run update_videos.js safely.${NC}"
  echo -e "${YELLOW}   FIX: Create video_tasks.json with week_$(printf '%02d' $WEEK) and week_$(printf '%02d' $WEEK)_easy queries.${NC}"
  exit 1
fi
HAS_VT=$(grep -c "\"weekId\": *${WEEK_INT_NUM}[^0-9]\|\"weekId\": *${WEEK_INT_NUM}$\|week_$(printf '%02d' $WEEK)" "$VT_FILE" 2>/dev/null || true)
if [ "$HAS_VT" -eq 0 ]; then
  echo -e "${RED}❌ ABORT: video_tasks.json has no Week $(printf '%02d' $WEEK) entries.${NC}"
  echo -e "${YELLOW}   FIX: Add week_$(printf '%02d' $WEEK) and week_$(printf '%02d' $WEEK)_easy query entries to video_tasks.json${NC}"
  echo -e "${YELLOW}   THEN re-run this script from Step 7 (--skip-backup OK).${NC}"
  exit 1
fi
echo -e "${GREEN}   ✅ video_tasks.json has Week $(printf '%02d' $WEEK) entries ($HAS_VT found)${NC}"

# SAFETY CHECK 2: Backup daily_watch.js before update_videos.js can overwrite
DW_ADV="src/data/weeks/week_$(printf '%02d' $WEEK)/daily_watch.js"
DW_EASY="src/data/weeks_easy/week_$(printf '%02d' $WEEK)/daily_watch.js"
if [ -f "$DW_ADV" ]; then
  cp "$DW_ADV" "${DW_ADV}.bak"
  echo -e "${CYAN}   💾 Backed up Advanced daily_watch.js (${DW_ADV}.bak)${NC}"
fi
if [ -f "$DW_EASY" ]; then
  cp "$DW_EASY" "${DW_EASY}.bak"
  echo -e "${CYAN}   💾 Backed up Easy daily_watch.js (${DW_EASY}.bak)${NC}"
fi
echo -e "${YELLOW}   ⚠️  WARNING: update_videos.js uses YouTube API. If API fails (quota/403), it will${NC}"
echo -e "${YELLOW}   replace all videos with generic fallback IDs. Code Quality Gate Check 23 will${NC}"
echo -e "${YELLOW}   catch this — if it fails, restore from .bak files above.${NC}"

node tools/update_videos.js $WEEK
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Video fetch failed!${NC}"
  exit 1
fi

# SAFETY CHECK 3: Validate fetched video thumbnails are not 404
echo -e "${CYAN}   Validating fetched video thumbnails...${NC}"
WEEK=$WEEK python3 << 'EOF'
import os
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen

week = int(os.environ.get('WEEK', 0))
week_str = f"{week:02d}"
files = [
  Path(f"src/data/weeks/week_{week_str}/daily_watch.js"),
  Path(f"src/data/weeks_easy/week_{week_str}/daily_watch.js"),
]

bad = []
for f in files:
  if not f.exists():
    continue
  txt = f.read_text(encoding='utf-8')
  ids = re.findall(r'videoId:\s*"([^"]+)"', txt)
  for vid in ids:
    url = f"https://img.youtube.com/vi/{vid}/mqdefault.jpg"
    try:
      req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
      with urlopen(req, timeout=8) as r:
        if r.status >= 400:
          bad.append((str(f), vid, r.status))
    except Exception:
      bad.append((str(f), vid, 'ERR'))

if bad:
  print("❌ Thumbnail validation failed:")
  for path, vid, code in bad:
    print(f"   - {path}: {vid} -> {code}")
  sys.exit(1)

print("✅ All daily_watch thumbnail URLs are reachable")
EOF
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Video thumbnail validation failed!${NC}"
  echo -e "${YELLOW}   FIX: Re-run update_videos.js or replace invalid video IDs manually.${NC}"
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
# W16+ uses on-demand TTS: 16 JS files per mode (not 14)
expected_js = 16 if week >= 16 else 14
on_demand_tts = week >= 16

print(f"   📄 Content Advanced: {content_adv}/{expected_js} JS files")
print(f"   📄 Content Easy: {content_easy}/{expected_js} JS files")
print(f"   🤖 AI Tutor: {'✅' if ai_tutor else '❌ MISSING'}")
print(f"   🖼️  Images Advanced: {images_adv} files (Expected: 15-20)")
print(f"   🖼️  Images Easy: {images_easy} files (Expected: 25-35)")
if on_demand_tts:
    print(f"   🔊 Audio: ⏭️  On-demand TTS (W16+) — no local pre-generated files")
else:
    print(f"   🔊 Audio Advanced: {audio_adv} files (Expected: 120-150)")
    print(f"   🔊 Audio Easy: {audio_easy} files (Expected: 115-145)")

issues = []
warnings = []

# Critical checks
if content_adv < expected_js:
    issues.append(f"Advanced content incomplete ({content_adv}/{expected_js} JS files)")
if content_easy < expected_js:
    issues.append(f"Easy content incomplete ({content_easy}/{expected_js} JS files)")
if not ai_tutor:
    issues.append(f"AI Tutor file missing: week_{week_str}_real.js")

# Asset checks (W1-15 pre-gen audio only)
if not on_demand_tts:
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

# Step 8.5: CODE QUALITY GATE — checks React components + service files
# (data validators above only check .js data files, not JSX/service code)
echo -e "${YELLOW}[8.5/9] 🛡️  Code Quality Gate — code pattern checks...${NC}"
echo ""
bash tools/code_quality_gate.sh $WEEK
GATE_EXIT=$?
if [ $GATE_EXIT -ne 0 ]; then
  echo ""
  echo -e "${RED}❌ CODE QUALITY GATE FAILED. Fix errors above before committing.${NC}"
  echo -e "${YELLOW}   Reference: LESSONS_LEARNED_WEEK_9-11_FOR_W12.md (BUG-18/19/20)${NC}"
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
