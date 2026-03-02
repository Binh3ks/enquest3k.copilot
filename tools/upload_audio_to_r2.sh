#!/bin/bash
# Upload audio files to Cloudflare R2

BUCKET="engquest-audio"
LOCAL_DIR="./public/audio"

echo "📤 UPLOAD AUDIO TO CLOUDFLARE R2"
echo "=================================="

# Use npx wrangler
WRANGLER="npx wrangler"

# Check if logged in
if ! $WRANGLER whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare"
    echo ""
    echo "Run: npx wrangler login"
    exit 1
fi

echo "✅ Logged in to Cloudflare"

# Count files
FILE_COUNT=$(find "$LOCAL_DIR" -name "*.mp3" | wc -l | tr -d ' ')
echo "📊 Found $FILE_COUNT MP3 files to upload"

# Confirm
read -p "🚦 Start upload? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled"
    exit 0
fi

echo ""
echo "🚀 Uploading..."
echo ""

# Upload each week folder
UPLOADED=0
FAILED=0

for week_folder in week{1..7}{,_easy}; do
    week_path="$LOCAL_DIR/$week_folder"
    
    if [ ! -d "$week_path" ]; then
        continue
    fi
    
    echo "📁 Uploading $week_folder..."
    
    # Upload all MP3 files in this folder
    for file in "$week_path"/*.mp3; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            r2_key="$week_folder/$filename"
            
            # Upload with wrangler (--remote flag REQUIRED for real R2, else uploads to local dev only)
            if $WRANGLER r2 object put "$BUCKET/$r2_key" --file "$file" --remote > /dev/null 2>&1; then
                UPLOADED=$((UPLOADED + 1))
                if [ $((UPLOADED % 50)) -eq 0 ]; then
                    echo "  ✅ Uploaded $UPLOADED files..."
                fi
            else
                FAILED=$((FAILED + 1))
                echo "  ❌ Failed: $filename"
            fi
        fi
    done
done

echo ""
echo "=================================="
echo "✅ UPLOAD COMPLETE"
echo "📤 Uploaded: $UPLOADED files"
echo "❌ Failed: $FAILED files"
echo ""
echo "🌐 Your files are now on R2!"
echo "   Access at: https://pub-YOUR_ID.r2.dev/audio/"
echo ""
echo "To get CDN URL:"
echo "1. Go to Cloudflare Dashboard → R2"
echo "2. Click on '$BUCKET' bucket"
echo "3. Settings → Public Access → Enable"
echo "4. Copy the public URL"
