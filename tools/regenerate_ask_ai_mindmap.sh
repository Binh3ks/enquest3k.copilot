#!/bin/bash
# REGENERATE WRONG AUDIO FILES - Ask AI + MindMap for all weeks
# 
# WHY: Previous generation had 2 bugs:
#   1. ask_ai_N.mp3 contained context_en (situation description) instead of ANSWER text
#   2. mindmap_branch_N.mp3 on some weeks contained file paths instead of branch text
#
# FIXES:
#   - generate_audio_final.py now produces ask_ai_N.mp3 = answer text
#   - This script regenerates ask_ai + mindmap for weeks 1-7 and uploads to R2
#
# USAGE:
#   bash tools/regenerate_ask_ai_mindmap.sh [week]   # specific week
#   bash tools/regenerate_ask_ai_mindmap.sh           # all weeks 1-7

set -e

cd "$(dirname "$0")/.."

WEEKS="${1:-1 2 3 4 5 6 7}"
if [ -n "$1" ]; then WEEKS="$1"; fi

echo "🔧 REGENERATING AUDIO: ask_ai + mindmap"
echo "   Weeks: $WEEKS"
echo ""

# Step 1: Run generation script for each week (only mindmap + ask_ai stations)
for WEEK in $WEEKS; do
    echo "📝 Week $WEEK..."
    
    # Run the full audio generation script (it handles both mindmap and ask_ai)
    python3 tools/generate_audio_final.py "$WEEK"
    
    echo "✅ Generated week $WEEK"
    echo ""
done

# Step 2: Upload regenerated files to R2
echo "📤 Uploading to R2..."
echo ""

UPLOADED=0
FAILED=0

for WEEK in $WEEKS; do
    # Upload ask_ai files
    for FILE in public/audio/week${WEEK}/ask_ai_*.mp3; do
        [ -f "$FILE" ] || continue
        KEY=$(echo "$FILE" | sed 's|public/||')
        echo -n "  $KEY ... "
        if npx wrangler r2 object put engquest-audio/$KEY --file="$FILE" --remote 2>/dev/null; then
            echo "✅"
            ((UPLOADED++))
        else
            echo "❌"
            ((FAILED++))
        fi
    done
    
    # Upload mindmap files  
    for FILE in public/audio/week${WEEK}/mindmap_*.mp3; do
        [ -f "$FILE" ] || continue
        KEY=$(echo "$FILE" | sed 's|public/||')
        echo -n "  $KEY ... "
        if npx wrangler r2 object put engquest-audio/$KEY --file="$FILE" --remote 2>/dev/null; then
            echo "✅"
            ((UPLOADED++))
        else
            echo "❌"
            ((FAILED++))
        fi
    done
    
    # Easy mode: upload ask_ai + mindmap
    for FILE in public/audio/week${WEEK}_easy/ask_ai_*.mp3 public/audio/week${WEEK}_easy/mindmap_*.mp3; do
        [ -f "$FILE" ] || continue
        KEY=$(echo "$FILE" | sed 's|public/||')
        echo -n "  $KEY ... "
        if npx wrangler r2 object put engquest-audio/$KEY --file="$FILE" --remote 2>/dev/null; then
            echo "✅"
            ((UPLOADED++))
        else
            echo "❌"
            ((FAILED++))
        fi
    done
done

echo ""
echo "============================================"
echo "✅ Done: $UPLOADED uploaded, $FAILED failed"
echo ""
echo "NEXT STEP: Re-enable ask_ai audio in dataHooks.js"
echo "  Change: audio_url: null"  
echo "  To:     audio_url: mkUrl(\`ask_ai_\${p.id}.mp3\`)"
