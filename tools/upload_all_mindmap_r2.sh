#!/bin/bash
# Upload ALL mindmap files to R2 (not just regenerated)

cd /Users/binhnguyen/Downloads/Engquest3k

echo "📤 UPLOADING ALL MINDMAP FILES TO R2"
echo "=============================================="

# Find ALL mindmap files (remove the -newer filter)
FILES=$(find public/audio/week*/mindmap*.mp3 -type f 2>/dev/null)
COUNT=$(echo "$FILES" | wc -l | tr -d ' ')

echo "📊 Found $COUNT total mindmap files"
echo ""

uploaded=0
failed=0

for file in $FILES; do
    # Extract key: audio/week2/mindmap_branch_1.mp3
    key=$(echo $file | sed 's|public/||')
    
    echo -n "[$((uploaded + failed + 1))/$COUNT] Uploading: $key ... "
    
    if npx wrangler r2 object put engquest-audio/$key --file=$file &>/dev/null; then
        echo "✅"
        ((uploaded++))
    else
        echo "❌"
        ((failed++))
    fi
    
    # Progress every 50 files
    if [ $(((uploaded + failed) % 50)) -eq 0 ]; then
        echo ""
        echo "📊 Progress: $((uploaded + failed))/$COUNT | ✅ $uploaded | ❌ $failed"
        echo ""
    fi
done

echo ""
echo "=============================================="
echo "✅ UPLOAD COMPLETE"
echo "📤 Uploaded: $uploaded files"
echo "❌ Failed: $failed files"
