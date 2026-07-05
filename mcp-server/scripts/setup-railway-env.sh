#!/usr/bin/env bash
# setup-railway-env.sh — One-shot script to set Railway environment variables
# Usage: railway link → then this script
# Requires: railway CLI (https://docs.railway.app/develop/cli)

set -euo pipefail

echo "=== Railway Environment Setup ==="
echo "Verifying Railway CLI is linked..."
if ! railway status >/dev/null 2>&1; then
  echo "❌ Not linked. Run 'railway link' first to connect to your project."
  exit 1
fi

echo ""
echo "Current service:"
railway status

echo ""
echo "Setting required variables..."

# Use --skip-deploys so variables update without auto-redeploy
railway variables --skip-deploys --set "DEEPGRAM_API_KEY=${DEEPGRAM_API_KEY:-your_deepgram_key_here}"
railway variables --skip-deploys --set "DATABASE_URL=${DATABASE_URL:-your_database_url_here}"

echo ""
echo "✅ Variables set. Triggering redeploy..."
railway up --detach

echo ""
echo "Done. Check logs with: railway logs"