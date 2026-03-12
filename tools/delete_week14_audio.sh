#!/bin/bash
# Delete ALL Week 14 audio from R2 to force on-demand regeneration
# Uses wrangler CLI (no credentials needed - uses existing auth)

BUCKET="engquest-audio"
PREFIX="audio/week14"

echo "🗑️  Deleting ALL audio in ${BUCKET}/${PREFIX}/"
echo "=================================================="

# Get list of files from R2 (using Cloudflare Dashboard API would be better, but this works)
# Since wrangler doesn't have 'list' command, we'll use the known file patterns

# Option 1: If you know the file names, delete them directly
# Option 2: Delete via Dashboard UI (select all + delete)
# Option 3: Use Node.js with @cloudflare/workers-sdk

echo ""
echo "❌ wrangler r2 doesn't support bulk operations"
echo ""
echo "📋 MANUAL DELETION OPTIONS:"
echo ""
echo "1. 🌐 Cloudflare Dashboard (FASTEST):"
echo "   - Open: https://dash.cloudflare.com/60599222f6f817a651fc103a6255d2cc/r2/default/buckets/engquest-audio/objects/view?path=audio%2Fweek14%2F"
echo "   - Select all files (checkbox at top)"
echo "   - Click 'Delete' button"
echo "   - Confirm"
echo ""
echo "2. 🔧 Wrangler (one by one - slow):"
echo "   cd cloudflare-worker"
echo "   npx wrangler r2 object delete engquest-audio/audio/week14/explore_main.mp3"
echo "   npx wrangler r2 object delete engquest-audio/audio/week14/logic_1.mp3"
echo "   ... (repeat for each file)"
echo ""
echo "3. 💡 Recommended: Use Dashboard UI option #1 (takes 10 seconds)"
