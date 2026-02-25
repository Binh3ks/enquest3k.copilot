#!/bin/bash
# Generate Week 6 Easy Explore Audio using Kokoro TTS

cd /Users/binhnguyen/Downloads/Engquest3k

TEXT='Do you like to play hide and seek? This is a fun game! One person closes their eyes. The other kids hide. Some hide in a box. Some hide under the desk. Some hide next to the door. Some hide on the floor behind the chair. When you finish counting, you seek the kids! You look in the box. You look under the desk. You look next to the window. This game is a hunt for friends! Where do you hide? Where do you seek? Hide and seek is fun!'

OUTPUT_FILE="public/audio/week6_easy/explore_main.mp3"
BACKUP_FILE="public/audio/week6_easy/explore_main.mp3.backup"

echo "🎙️  Generating Week 6 Easy Explore Audio"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "HF Space: https://binh3k-engquest3k.hf.space/tts"
echo "Text length: ${#TEXT} characters"
echo ""

# Backup existing file
if [ -f "$OUTPUT_FILE" ]; then
  cp "$OUTPUT_FILE" "$BACKUP_FILE"
  echo "✅ Backed up old file to $BACKUP_FILE"
fi

# URL encode text
ENCODED_TEXT=$(node -p "encodeURIComponent('$TEXT')")
URL="https://binh3k-engquest3k.hf.space/tts?text=${ENCODED_TEXT}&station=explore"

echo "⏳ Fetching from Kokoro TTS (may take 10-30 seconds)..."
echo ""

# Try with timeout
if curl -s -m 60 "$URL" -o "$OUTPUT_FILE" 2>&1; then
  if [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')
    FILE_TYPE=$(file -b "$OUTPUT_FILE")
    
    if [[ "$FILE_TYPE" == *"Audio"* ]] || [[ "$FILE_TYPE" == *"MPEG"* ]]; then
      echo "✅ SUCCESS!"
      echo "   File: $OUTPUT_FILE"
      echo "   Size: $FILE_SIZE"
      echo "   Type: $FILE_TYPE"
      echo ""
      echo "🎵 Testing playback (first 3 seconds):"
      afplay -t 3 "$OUTPUT_FILE" 2>/dev/null || echo "   (afplay not available)"
    else
      echo "❌ ERROR: Downloaded file is not audio"
      echo "   Content: $(cat "$OUTPUT_FILE")"
      if [ -f "$BACKUP_FILE" ]; then
        mv "$BACKUP_FILE" "$OUTPUT_FILE"
        echo "   Restored backup file"
      fi
    fi
  fi
else
  echo "❌ FAILED: curl returned error or timeout"
  if [ -f "$BACKUP_FILE" ]; then
    mv "$BACKUP_FILE" "$OUTPUT_FILE"
    echo "   Restored backup file"
  fi
fi

# Cleanup backup if successful
if [ -f "$BACKUP_FILE" ] && [ -f "$OUTPUT_FILE" ]; then
  FILE_TYPE=$(file -b "$OUTPUT_FILE")
  if [[ "$FILE_TYPE" == *"Audio"* ]] || [[ "$FILE_TYPE" == *"MPEG"* ]]; then
    rm "$BACKUP_FILE"
  fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "If this fails, the HF Space may be sleeping."
echo "Try again in 1-2 minutes or wake it up first:"
echo "  curl https://binh3k-engquest3k.hf.space/health"
