#!/bin/bash
# Quick delete remaining Week 14 audio files from R2
# Uses wrangler CLI with --remote flag

BUCKET="engquest-audio"
PREFIX="audio/week14"

echo "🗑️  Deleting key Week 14 audio files from R2..."
echo "=================================================="

cd cloudflare-worker || exit 1

# Delete explore_main.mp3
echo "Deleting explore_main.mp3..."
npx wrangler r2 object delete ${BUCKET}/${PREFIX}/explore_main.mp3 --remote 2>/dev/null
echo "✅ explore_main.mp3"

# Delete all new_word files (vocab)
for i in {1..8}; do
  echo "Deleting new_word_${i}.mp3..."
  npx wrangler r2 object delete ${BUCKET}/${PREFIX}/new_word_${i}.mp3 --remote 2>/dev/null
done
echo "✅ new_word files (1-8)"

# Delete all word_power files
for i in {1..10}; do
  npx wrangler r2 object delete ${BUCKET}/${PREFIX}/word_power_${i}.mp3 --remote 2>/dev/null
done
echo "✅ word_power files (1-10)"

echo ""
echo "🎉 Deletion complete!"
echo ""
echo "Remaining files in Week 14:"
echo "- All dictation/shadowing files (if any)"
echo "- All logic/mindmap files (if any)"
echo ""
echo "Next: Test read station again - should generate on-demand with voice from voiceConfig"
