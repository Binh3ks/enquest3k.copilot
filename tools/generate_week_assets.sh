#!/bin/bash

# =========================================================================
# EngQuest Week Asset Generator - Single Command Wrapper
# =========================================================================
# Usage: ./generate_week_assets.sh <WEEK_ID>
# Example: ./generate_week_assets.sh 20
#
# This script generates ALL assets (audio, images, videos) for a week
# in a single command, with automatic API key loading from API keys.txt
# =========================================================================

set -e  # Exit on any error

WEEK_ID=$1

# Validation
if [ -z "$WEEK_ID" ]; then
  echo "❌ Error: Week ID is required"
  echo ""
  echo "Usage: ./generate_week_assets.sh <WEEK_ID>"
  echo "Example: ./generate_week_assets.sh 20"
  exit 1
fi

# Check if week data exists
if [ ! -d "src/data/weeks/week_$WEEK_ID" ]; then
  echo "❌ Error: Week $WEEK_ID data folder not found"
  echo "Please create data files first using the week generator"
  exit 1
fi

# Check API keys file
if [ ! -f "API keys.txt" ]; then
  echo "⚠️  Warning: API keys.txt not found"
  echo "Asset generation may fail without valid API keys"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "╔═══════════════════════════════════════════════════════╗"
echo "║  EngQuest Week $WEEK_ID Asset Generator              ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Step 1: Audio Generation
echo "🎵 Step 1/3: Generating audio for Week $WEEK_ID..."
echo "───────────────────────────────────────────────────────"
node tools/generate_audio.js $WEEK_ID $WEEK_ID
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Audio generation failed!"
  echo "Check error messages above and fix data files"
  exit 1
fi
echo "✅ Audio generation complete"
echo ""

# Step 2: Image Generation
echo "🖼️  Step 2/3: Generating images for Week $WEEK_ID..."
echo "───────────────────────────────────────────────────────"
node tools/batch_manager.js $WEEK_ID $WEEK_ID
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Image generation failed!"
  echo "Check error messages above and verify Gemini API key"
  exit 1
fi
echo "✅ Image generation complete"
echo ""

# Step 3: Video Generation
echo "📹 Step 3/3: Generating videos for Week $WEEK_ID..."
echo "───────────────────────────────────────────────────────"

# Extract YouTube API key from API keys.txt if available
if [ -f "API keys.txt" ]; then
  YOUTUBE_KEY=$(grep "YOUTUBE_API_KEY" "API keys.txt" | head -1 | cut -d'=' -f2 | tr -d ' "')
  if [ ! -z "$YOUTUBE_KEY" ]; then
    export YOUTUBE_API_KEY="$YOUTUBE_KEY"
  fi
fi

node tools/update_videos.js $WEEK_ID --reset
if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Video generation failed!"
  echo "Check error messages above and verify YouTube API key"
  exit 1
fi
echo "✅ Video generation complete"
echo ""

# Verification
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  Asset Generation Summary for Week $WEEK_ID          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Count audio files
AUDIO_ADV_COUNT=$(ls public/audio/week$WEEK_ID/*.mp3 2>/dev/null | wc -l | tr -d ' ')
AUDIO_EASY_COUNT=$(ls public/audio/week${WEEK_ID}_easy/*.mp3 2>/dev/null | wc -l | tr -d ' ')
echo "🎵 Audio files:"
echo "   Advanced: $AUDIO_ADV_COUNT files"
echo "   Easy:     $AUDIO_EASY_COUNT files"

# Count image files
IMG_ADV_COUNT=$(ls public/images/week$WEEK_ID/*.jpg 2>/dev/null | wc -l | tr -d ' ')
IMG_EASY_COUNT=$(ls public/images/week${WEEK_ID}_easy/*.jpg 2>/dev/null | wc -l | tr -d ' ')
echo "🖼️  Image files:"
echo "   Advanced: $IMG_ADV_COUNT files (expected: 15)"
echo "   Easy:     $IMG_EASY_COUNT files (expected: 15)"

# Count videos
VIDEO_COUNT=$(grep -c "videoId" src/data/weeks/week_$WEEK_ID/daily_watch.js 2>/dev/null || echo "0")
echo "📹 Videos: $VIDEO_COUNT (expected: 5)"
echo ""

# Validation warnings
WARNINGS=0
if [ "$IMG_ADV_COUNT" != "15" ]; then
  echo "⚠️  Warning: Advanced mode images should be 15, found $IMG_ADV_COUNT"
  WARNINGS=$((WARNINGS + 1))
fi
if [ "$IMG_EASY_COUNT" != "15" ]; then
  echo "⚠️  Warning: Easy mode images should be 15, found $IMG_EASY_COUNT"
  WARNINGS=$((WARNINGS + 1))
fi
if [ "$VIDEO_COUNT" != "5" ]; then
  echo "⚠️  Warning: Videos should be 5, found $VIDEO_COUNT"
  WARNINGS=$((WARNINGS + 1))
fi

if [ $WARNINGS -eq 0 ]; then
  echo "✅ All asset counts verified!"
  echo ""
  echo "╔═══════════════════════════════════════════════════════╗"
  echo "║  Week $WEEK_ID is ready for production! 🎉          ║"
  echo "╚═══════════════════════════════════════════════════════╝"
else
  echo ""
  echo "⚠️  Asset generation completed with $WARNINGS warnings"
  echo "Please review the warnings above"
fi

echo ""
echo "Next steps:"
echo "1. Test in app: npm run dev"
echo "2. Navigate to Week $WEEK_ID and test all stations"
echo "3. Verify audio playback, image display, and video links"
