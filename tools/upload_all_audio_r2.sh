#!/bin/bash
# ============================================================
# Upload ALL local audio files to Cloudflare R2 (remote)
# Handles both Advanced (week1..7) and Easy (week1_easy..7_easy)
#
# ⚠️  CRITICAL: Always use --remote flag with wrangler r2 commands.
#     Without --remote, wrangler v4+ silently uploads to LOCAL dev
#     environment only — files will NOT appear on CDN!
#
# Usage:
#   ./tools/upload_all_audio_r2.sh              # upload all weeks (with confirmation)
#   ./tools/upload_all_audio_r2.sh --yes        # upload all weeks (skip confirmation)
#   ./tools/upload_all_audio_r2.sh 3            # upload only week 3 (with confirmation)
#   ./tools/upload_all_audio_r2.sh 3 --yes      # upload week 3 (skip confirmation)
#   ./tools/upload_all_audio_r2.sh 3 easy       # upload only week 3 easy
# ============================================================

BUCKET="engquest-audio"
LOCAL_DIR="./public/audio"
WRANGLER="npx wrangler"
AUTO_CONFIRM=false

# Parse flags
for arg in "$@"; do
  case $arg in
    --yes|-y)
      AUTO_CONFIRM=true
      shift
      ;;
  esac
done

echo "📤 UPLOAD ALL AUDIO TO CLOUDFLARE R2 (--remote)"
echo "=================================================="

# Check wrangler login
if ! $WRANGLER whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare. Run: npx wrangler login"
    exit 1
fi
echo "✅ Wrangler authenticated"
echo ""

# Determine which folders to upload
FILTER_WEEK="$1"
FILTER_MODE="$2"

get_folders() {
    if [ -n "$FILTER_WEEK" ] && [ -n "$FILTER_MODE" ]; then
        echo "week${FILTER_WEEK}_${FILTER_MODE}"
    elif [ -n "$FILTER_WEEK" ]; then
        echo "week${FILTER_WEEK}"
        echo "week${FILTER_WEEK}_easy"
    else
        # All weeks: advanced + easy
        for w in $(seq 1 20); do
            [ -d "$LOCAL_DIR/week${w}" ]      && echo "week${w}"
            [ -d "$LOCAL_DIR/week${w}_easy" ] && echo "week${w}_easy"
        done
    fi
}

FOLDERS=($(get_folders))

# Count total files
TOTAL=0
for folder in "${FOLDERS[@]}"; do
    dir="$LOCAL_DIR/$folder"
    [ -d "$dir" ] || continue
    count=$(ls "$dir"/*.mp3 2>/dev/null | wc -l | tr -d ' ')
    TOTAL=$((TOTAL + count))
done

echo "📁 Folders to upload: ${FOLDERS[*]}"
echo "🎵 Total files: $TOTAL"
echo ""

if [ "$AUTO_CONFIRM" = false ]; then
    read -p "🚦 Start upload to R2? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled"
        exit 0
    fi
else
    echo "🚦 Auto-confirm enabled (--yes flag)"
fi

echo ""
UPLOADED=0
FAILED=0
SKIPPED=0

for folder in "${FOLDERS[@]}"; do
    dir="$LOCAL_DIR/$folder"
    [ -d "$dir" ] || continue

    mp3_files=("$dir"/*.mp3)
    [ -f "${mp3_files[0]}" ] || continue

    file_count=${#mp3_files[@]}
    echo "📁 Uploading $folder ($file_count files)..."

    for file in "${mp3_files[@]}"; do
        [ -f "$file" ] || continue
        filename=$(basename "$file")
        r2_key="audio/$folder/$filename"

        # ⚠️ --remote is MANDATORY — without it wrangler uploads to local only
        if $WRANGLER r2 object put "$BUCKET/$r2_key" --file "$file" --remote > /dev/null 2>&1; then
            UPLOADED=$((UPLOADED + 1))
            if [ $((UPLOADED % 25)) -eq 0 ]; then
                echo "  ✅ $UPLOADED uploaded..."
            fi
        else
            FAILED=$((FAILED + 1))
            echo "  ❌ Failed: $r2_key"
        fi
    done

    echo "  ✅ Done: $folder"
    echo ""
done

echo "=================================================="
echo "✅ UPLOAD COMPLETE"
echo "📤 Uploaded: $UPLOADED files"
echo "❌ Failed:   $FAILED files"
echo ""
echo "🌐 CDN URL pattern:"
echo "   https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{N}/filename.mp3"
echo ""
echo "🔍 To verify, run:"
echo "   python3 tools/audit_r2_audio.py"
