#!/bin/bash
# UPLOAD_TO_R2.SH - Upload Kokoro audio files to Cloudflare R2
# Prerequisites: wrangler installed and configured

set -e  # Exit on error

echo "📤 CLOUDFLARE R2 UPLOAD SCRIPT"
echo "======================================================"

# Configuration
BUCKET_NAME="engquest-tts"
SOURCE_DIR="./public/audio_kokoro"
R2_PREFIX="tts"  # Prefix in bucket

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ ERROR: Wrangler CLI not found!"
    echo "   Install: npm install -g wrangler"
    echo "   Login: wrangler login"
    exit 1
fi

echo "✅ Wrangler CLI detected"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ ERROR: Source directory not found: $SOURCE_DIR"
    echo "   Run generate_kokoro_batch.py first!"
    exit 1
fi

# Count files
TOTAL_FILES=$(find "$SOURCE_DIR" -name "*.mp3" | wc -l)
echo "📊 Found $TOTAL_FILES MP3 files to upload"

# Calculate total size
TOTAL_SIZE=$(du -sh "$SOURCE_DIR" | cut -f1)
echo "💾 Total size: $TOTAL_SIZE"

# Confirm
echo ""
read -p "🚦 Start upload to R2 bucket '$BUCKET_NAME'? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "🚀 Starting upload..."
echo "======================================================"

# Upload files with progress
COUNTER=0
find "$SOURCE_DIR" -name "*.mp3" | while read file; do
    # Get relative path from SOURCE_DIR
    REL_PATH="${file#$SOURCE_DIR/}"
    
    # R2 object key
    R2_KEY="$R2_PREFIX/$REL_PATH"
    
    # Upload with wrangler
    wrangler r2 object put "$BUCKET_NAME/$R2_KEY" --file="$file" \
        --content-type="audio/mpeg" \
        --cache-control="public, max-age=31536000, immutable" \
        2>&1 | grep -v "Uploading" || true
    
    COUNTER=$((COUNTER + 1))
    
    # Progress update every 50 files
    if [ $((COUNTER % 50)) -eq 0 ]; then
        PERCENT=$((COUNTER * 100 / TOTAL_FILES))
        echo "📊 Progress: $COUNTER/$TOTAL_FILES ($PERCENT%)"
    fi
done

echo ""
echo "======================================================"
echo "✅ UPLOAD COMPLETE"
echo "📊 Uploaded: $TOTAL_FILES files"
echo "💾 Total size: $TOTAL_SIZE"
echo ""
echo "🌐 Next steps:"
echo "   1. Configure custom domain in Cloudflare dashboard"
echo "   2. Point cdn.bkbacademy.vn to R2 bucket"
echo "   3. Update voiceService.js with CDN URL"
echo "   4. Test: https://cdn.bkbacademy.vn/tts/week1/shadowing_1.mp3"
echo "======================================================"
