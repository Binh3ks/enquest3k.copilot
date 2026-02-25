#!/usr/bin/env bash
# EngQuest TTS Worker — Deploy Script
# Chạy: bash cloudflare-worker/deploy.sh

set -e

echo "=== EngQuest TTS Worker Deploy ==="
echo ""

# Check wrangler
if ! command -v wrangler &> /dev/null; then
  echo "❌ Wrangler chưa cài. Đang cài..."
  npm install -g wrangler
fi

# Move to worker directory
cd "$(dirname "$0")"

echo "📋 Bước 1/3: Verify login Cloudflare..."
wrangler whoami || (echo "Chưa login. Chạy: wrangler login" && exit 1)

echo ""
echo "🔑 Bước 2/3: Set GOOGLE_TTS_API_KEY secret..."
echo "   Paste key khi được hỏi (AIzaSyBKYuYuGW6c8gbkmeJVdCRKb15MXcdPmH8):"
wrangler secret put GOOGLE_TTS_API_KEY

echo ""
echo "🚀 Bước 3/3: Deploy Worker..."
wrangler deploy

echo ""
echo "✅ Deploy xong!"
echo ""
echo "🧪 Test Worker:"
WORKER_URL=$(wrangler deploy --dry-run 2>&1 | grep -o 'https://.*workers.dev' | head -1 || echo "https://engquest-tts-worker.<subdomain>.workers.dev")
echo "   Health: curl ${WORKER_URL}/health"
echo "   TTS:    curl -o /tmp/test.mp3 \"${WORKER_URL}/tts?text=Hello+student&station=ai_tutor\""
echo ""
echo "📝 Sau khi test OK, cập nhật .env:"
echo "   VITE_TTS_WORKER_URL=${WORKER_URL}"
echo ""
echo "🌐 Để dùng custom domain api-tts.bkbacademy.vn:"
echo "   Cloudflare Dashboard → Workers & Pages → engquest-tts-worker → Settings → Triggers → Add Custom Domain"
echo "   Nhập: api-tts.bkbacademy.vn"
echo "   Rồi đổi .env: VITE_TTS_WORKER_URL=https://api-tts.bkbacademy.vn"
