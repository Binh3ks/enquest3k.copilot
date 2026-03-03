#!/bin/bash
# upload_images_to_r2.sh - Upload all week images to Cloudflare R2
# Prerequisites: wrangler installed (npm i -g wrangler) and logged in (wrangler login)
#
# After upload, set VITE_IMAGES_CDN_URL in Cloudflare Pages env vars:
#   https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev
# → All images will automatically switch from /images/... to CDN URLs

set -e

BUCKET_NAME="engquest-images"
SOURCE_DIR="./public/images"
R2_PREFIX="images"

echo "📸 CLOUDFLARE R2 IMAGE UPLOAD SCRIPT"
echo "======================================================"
echo "Bucket : $BUCKET_NAME"
echo "Source : $SOURCE_DIR"
echo "Prefix : $R2_PREFIX"
echo ""

if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Install: npm i -g wrangler && wrangler login"
    exit 1
fi

TOTAL=$(find "$SOURCE_DIR" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) | wc -l | tr -d ' ')
SIZE=$(du -sh "$SOURCE_DIR" | cut -f1)
echo "📊 Found $TOTAL image files ($SIZE)"

read -p "🚦 Upload to R2 bucket '$BUCKET_NAME/$R2_PREFIX/'? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then echo "❌ Cancelled"; exit 0; fi

echo ""
echo "🚀 Uploading..."
COUNTER=0
ERRORS=0

find "$SOURCE_DIR" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) | sort | while read file; do
    REL_PATH="${file#$SOURCE_DIR/}"
    R2_KEY="$R2_PREFIX/$REL_PATH"

    # Detect content type
    case "${file##*.}" in
        jpg|jpeg) CTYPE="image/jpeg" ;;
        png)      CTYPE="image/png" ;;
        webp)     CTYPE="image/webp" ;;
        *)        CTYPE="application/octet-stream" ;;
    esac

    wrangler r2 object put "$BUCKET_NAME/$R2_KEY" \
        --file="$file" \
        --content-type="$CTYPE" \
        --cache-control="public, max-age=31536000, immutable" \
        2>&1 | grep -v "^$\|Uploading\|Success" || true

    COUNTER=$((COUNTER + 1))
    if [ $((COUNTER % 25)) -eq 0 ]; then
        PERCENT=$((COUNTER * 100 / TOTAL))
        echo "📊 Progress: $COUNTER/$TOTAL ($PERCENT%)"
    fi
done

echo ""
echo "======================================================"
echo "✅ UPLOAD COMPLETE — $COUNTER files"
echo ""
echo "📋 Next step: Set env var in Cloudflare Pages:"
echo "   VITE_IMAGES_CDN_URL = https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev"
echo "   (Settings → Environment variables → Add variable)"
echo ""
echo "🧪 Test a URL:"
echo "   https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/images/week1_easy/name.jpg"
echo "======================================================"
