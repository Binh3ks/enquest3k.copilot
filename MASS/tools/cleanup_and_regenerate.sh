#!/bin/bash
# CLEANUP AND REGENERATE ASSETS
# Purpose: Delete incorrectly named files and regenerate missing assets
# Usage: bash MASS/tools/cleanup_and_regenerate.sh <week> [mode]

WEEK=$1
MODE=${2:-"advanced"}

if [ -z "$WEEK" ]; then
  echo ""
  echo "❌ Missing week number"
  echo "📖 Usage: bash MASS/tools/cleanup_and_regenerate.sh <week> [mode]"
  echo "📖 Example: bash MASS/tools/cleanup_and_regenerate.sh 5 advanced"
  echo ""
  exit 1
fi

WEEK_STR="week${WEEK}"
if [ "$MODE" == "easy" ]; then
  WEEK_STR="week${WEEK}_easy"
fi

AUDIO_DIR="public/audio/$WEEK_STR"
IMAGE_DIR="public/images/$WEEK_STR"

echo ""
echo "======================================================================"
echo "🧹 CLEANUP & REGENERATE - WEEK $WEEK ($MODE MODE)"
echo "======================================================================"
echo ""

# Create directories if they don't exist
mkdir -p "$AUDIO_DIR"
mkdir -p "$IMAGE_DIR"

echo "📂 Directories:"
echo "   Audio: $AUDIO_DIR"
echo "   Images: $IMAGE_DIR"
echo ""

# ===== STEP 1: CLEANUP =====
echo "🧹 STEP 1: Cleaning up incorrectly named files..."
echo ""

CLEANUP_COUNT=0

# Remove vocab files missing "vocab_" prefix
echo "  Checking vocab audio files..."
if ls "$AUDIO_DIR"/def_*.mp3 1> /dev/null 2>&1; then
  echo "    ❌ Found files: def_*.mp3 (should be vocab_def_*.mp3)"
  rm -f "$AUDIO_DIR"/def_*.mp3
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

if ls "$AUDIO_DIR"/ex_*.mp3 1> /dev/null 2>&1; then
  echo "    ❌ Found files: ex_*.mp3 (should be vocab_ex_*.mp3)"
  rm -f "$AUDIO_DIR"/ex_*.mp3
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

if ls "$AUDIO_DIR"/coll_*.mp3 1> /dev/null 2>&1; then
  echo "    ❌ Found files: coll_*.mp3 (should be vocab_coll_*.mp3)"
  rm -f "$AUDIO_DIR"/coll_*.mp3
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

# Remove read.js files with wrong naming
if [ -f "$AUDIO_DIR/read_main.mp3" ]; then
  echo "    ❌ Found: read_main.mp3 (should be read_explore_main.mp3)"
  rm -f "$AUDIO_DIR/read_main.mp3"
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

# Remove explore files with double prefix
if [ -f "$AUDIO_DIR/explore_explore_narration.mp3" ]; then
  echo "    ❌ Found: explore_explore_narration.mp3 (should be explore_narration.mp3)"
  rm -f "$AUDIO_DIR/explore_explore_narration.mp3"
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

# Remove word_power files with wrong prefix (word_power_ instead of wordpower_)
if ls "$AUDIO_DIR"/word_power_*.mp3 1> /dev/null 2>&1; then
  echo "    ❌ Found files: word_power_*.mp3 (should be wordpower_*.mp3)"
  rm -f "$AUDIO_DIR"/word_power_*.mp3
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

# Remove .wav files (should be .mp3)
if ls "$AUDIO_DIR"/*.wav 1> /dev/null 2>&1; then
  echo "    ❌ Found .wav files (should be .mp3)"
  rm -f "$AUDIO_DIR"/*.wav
  CLEANUP_COUNT=$((CLEANUP_COUNT + 1))
fi

if [ $CLEANUP_COUNT -eq 0 ]; then
  echo "  ✅ No incorrectly named files found"
else
  echo ""
  echo "  🗑️  Removed $CLEANUP_COUNT types of incorrect files"
fi

echo ""

# ===== STEP 2: VALIDATE =====
echo "🔍 STEP 2: Running asset validation..."
echo ""

node MASS/tools/validate_assets.cjs $WEEK $MODE

VALIDATION_RESULT=$?

if [ $VALIDATION_RESULT -eq 0 ]; then
  echo ""
  echo "======================================================================"
  echo "✅ SUCCESS - Week $WEEK ($MODE) has all required assets!"
  echo "======================================================================"
  echo ""
  exit 0
fi

# ===== STEP 3: REGENERATE =====
echo ""
echo "======================================================================"
echo "⚠️  VALIDATION FAILED - Missing assets detected"
echo "======================================================================"
echo ""
echo "🔄 STEP 3: Regenerating missing assets..."
echo ""

# Check if OpenAI API key exists
if [ -z "$VITE_OPENAI_API_KEY" ]; then
  echo "⚠️  Warning: VITE_OPENAI_API_KEY not set in environment"
  echo "   Loading from .env file..."
  
  if [ -f ".env" ]; then
    export $(cat .env | grep VITE_OPENAI_API_KEY | xargs)
  else
    echo ""
    echo "❌ ERROR: .env file not found"
    echo ""
    echo "   Please create .env file with valid OpenAI API key:"
    echo "   VITE_OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXX"
    echo ""
    echo "   Get key from: https://platform.openai.com/api-keys"
    echo ""
    exit 1
  fi
fi

echo "  API Key: ${VITE_OPENAI_API_KEY:0:20}..."
echo ""

# Generate audio files
echo "  🔊 Generating audio files..."
echo "     This may take 10-15 minutes..."
echo ""

# Check if audio generation script exists
if [ ! -f "tools/generate_complete_audio.js" ]; then
  echo "  ❌ Audio generation script not found: tools/generate_complete_audio.js"
  echo ""
  echo "  Available alternative scripts:"
  ls -1 tools/generate*audio*.js 2>/dev/null || echo "    No audio generation scripts found"
  echo ""
  echo "  Please run audio generation manually:"
  echo "     node tools/<your_audio_script>.js $WEEK $MODE"
  echo ""
else
  node tools/generate_complete_audio.js $WEEK $MODE
  
  if [ $? -ne 0 ]; then
    echo ""
    echo "  ❌ Audio generation failed"
    echo "     Check OpenAI API key and quota"
    echo ""
    exit 1
  fi
  
  echo ""
  echo "  ✅ Audio generation complete"
fi

echo ""

# Generate images
echo "  🖼️  Generating images..."
echo "     This may take 5-10 minutes..."
echo ""

if [ ! -f "tools/generate_images_nano.js" ]; then
  echo "  ❌ Image generation script not found: tools/generate_images_nano.js"
  echo ""
  echo "  Please run image generation manually:"
  echo "     node tools/<your_image_script>.js $WEEK $MODE"
  echo ""
else
  node tools/generate_images_nano.js $WEEK $MODE
  
  if [ $? -ne 0 ]; then
    echo ""
    echo "  ⚠️  Image generation had errors (may be partial)"
  else
    echo ""
    echo "  ✅ Image generation complete"
  fi
fi

echo ""

# ===== STEP 4: FINAL VALIDATION =====
echo "======================================================================"
echo "✅ STEP 4: Running final validation..."
echo "======================================================================"
echo ""

node MASS/tools/validate_assets.cjs $WEEK $MODE

FINAL_RESULT=$?

echo ""

if [ $FINAL_RESULT -eq 0 ]; then
  echo "======================================================================"
  echo "🎉 SUCCESS - Week $WEEK ($MODE) is now complete!"
  echo "======================================================================"
  echo ""
  echo "📋 Next steps:"
  echo "   1. Test in UI: npm run dev"
  echo "   2. Navigate to: http://localhost:5173/week/$WEEK"
  echo "   3. Test all stations to verify assets load correctly"
  echo "   4. Commit changes:"
  echo "      git add src/data/weeks*/"
  echo "      git add public/audio/$WEEK_STR/"
  echo "      git add public/images/$WEEK_STR/"
  echo "      git commit -m \"Week $WEEK ($MODE): Complete with assets\""
  echo ""
  exit 0
else
  echo "======================================================================"
  echo "❌ VALIDATION STILL FAILING"
  echo "======================================================================"
  echo ""
  echo "🔍 Possible causes:"
  echo "   1. OpenAI API key invalid or quota exceeded"
  echo "   2. Generation scripts had errors"
  echo "   3. Manual intervention required"
  echo ""
  echo "🛠️  Manual steps:"
  echo "   1. Check .env file has valid VITE_OPENAI_API_KEY"
  echo "   2. Check OpenAI account quota: https://platform.openai.com/usage"
  echo "   3. Review error messages above"
  echo "   4. Generate missing assets manually"
  echo "   5. Re-run: bash MASS/tools/cleanup_and_regenerate.sh $WEEK $MODE"
  echo ""
  exit 1
fi
