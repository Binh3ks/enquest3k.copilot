#!/bin/bash
# Auto-deploy to Hugging Face Spaces
# Run this script: ./auto_deploy.sh

set -e

echo "🚀 EngQuest TTS - Auto Deploy to Hugging Face"
echo "=============================================="
echo ""

# Space URL
SPACE_URL="https://huggingface.co/spaces/binh3k/Engquest3k"
SPACE_REPO="spaces/binh3k/Engquest3k"

# Check if huggingface_hub is installed
echo "📦 Checking dependencies..."
if ! python3 -c "import huggingface_hub" 2>/dev/null; then
    echo "Installing huggingface_hub..."
    pip3 install huggingface_hub --quiet
fi
echo "✅ Dependencies OK"
echo ""

# Check if already logged in
if ! huggingface-cli whoami >/dev/null 2>&1; then
    echo "🔐 Login to Hugging Face"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Bạn cần HF token để deploy. Lấy token tại:"
    echo "👉 https://huggingface.co/settings/tokens"
    echo ""
    echo "Chọn: New token → Name: 'engquest-deploy' → Role: Write → Create"
    echo "Copy token và paste vào đây (text sẽ ẩn, bình thường):"
    echo ""
    huggingface-cli login
    echo ""
fi

echo "✅ Authenticated as: $(huggingface-cli whoami)"
echo ""

# Create temp directory for git operations
TEMP_DIR="/tmp/engquest-deploy-$(date +%s)"
echo "📁 Creating workspace: $TEMP_DIR"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

# Clone the Space
echo "📥 Cloning Space repository..."
git clone "https://huggingface.co/$SPACE_REPO" . 2>/dev/null || {
    echo "⚠️  Clone failed, initializing new repo..."
    git init
    git remote add origin "https://huggingface.co/$SPACE_REPO"
}

# Copy deployment files
echo "📋 Copying deployment files..."
PACKAGE_DIR="/Users/binhnguyen/Downloads/Engquest3k/HF_DEPLOYMENT_PACKAGE"

cp "$PACKAGE_DIR/Dockerfile" .
cp "$PACKAGE_DIR/app.py" .
cp "$PACKAGE_DIR/requirements.txt" .
cp "$PACKAGE_DIR/README.md" .

# Create .gitattributes for HF Spaces (required)
cat > .gitattributes << 'EOF'
*.7z filter=lfs diff=lfs merge=lfs -text
*.arrow filter=lfs diff=lfs merge=lfs -text
*.bin filter=lfs diff=lfs merge=lfs -text
*.bz2 filter=lfs diff=lfs merge=lfs -text
*.ckpt filter=lfs diff=lfs merge=lfs -text
*.ftz filter=lfs diff=lfs merge=lfs -text
*.gz filter=lfs diff=lfs merge=lfs -text
*.h5 filter=lfs diff=lfs merge=lfs -text
*.joblib filter=lfs diff=lfs merge=lfs -text
*.lfs.* filter=lfs diff=lfs merge=lfs -text
*.mlmodel filter=lfs diff=lfs merge=lfs -text
*.model filter=lfs diff=lfs merge=lfs -text
*.msgpack filter=lfs diff=lfs merge=lfs -text
*.npy filter=lfs diff=lfs merge=lfs -text
*.npz filter=lfs diff=lfs merge=lfs -text
*.onnx filter=lfs diff=lfs merge=lfs -text
*.ot filter=lfs diff=lfs merge=lfs -text
*.parquet filter=lfs diff=lfs merge=lfs -text
*.pb filter=lfs diff=lfs merge=lfs -text
*.pickle filter=lfs diff=lfs merge=lfs -text
*.pkl filter=lfs diff=lfs merge=lfs -text
*.pt filter=lfs diff=lfs merge=lfs -text
*.pth filter=lfs diff=lfs merge=lfs -text
*.rar filter=lfs diff=lfs merge=lfs -text
*.safetensors filter=lfs diff=lfs merge=lfs -text
saved_model/**/* filter=lfs diff=lfs merge=lfs -text
*.tar.* filter=lfs diff=lfs merge=lfs -text
*.tar filter=lfs diff=lfs merge=lfs -text
*.tflite filter=lfs diff=lfs merge=lfs -text
*.tgz filter=lfs diff=lfs merge=lfs -text
*.wasm filter=lfs diff=lfs merge=lfs -text
*.xz filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.zst filter=lfs diff=lfs merge=lfs -text
*tfevents* filter=lfs diff=lfs merge=lfs -text
EOF

# Create README.md header for Space (HF Spaces metadata)
cat > README_HEADER.txt << 'EOF'
---
title: EngQuest TTS Server
emoji: 🎙️
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
license: mit
---

EOF

# Combine header with README
cat README_HEADER.txt "$PACKAGE_DIR/README.md" > README_TEMP.md
mv README_TEMP.md README.md
rm README_HEADER.txt

echo "✅ Files prepared"
echo ""

# Git operations
echo "📝 Committing files..."
git add .

# Check if there are changes
if git diff --cached --quiet; then
    echo "ℹ️  No changes detected. Files already up to date!"
    cd /Users/binhnguyen/Downloads/Engquest3k
    rm -rf "$TEMP_DIR"
    echo ""
    echo "✅ Space already deployed!"
    echo "🔗 URL: $SPACE_URL"
    exit 0
fi

git commit -m "Deploy Kokoro TTS v1.0 with 7-voice support

- Model: kokoro-v1.0.int8.onnx (88MB)  
- Voices: 7 stations → 3 Kokoro voices (af_sky, af_bella, am_adam)
- Cache headers: Cloudflare-ready (1-month TTL)
- Languages: English (Kokoro) + Vietnamese (Edge TTS)
- Cost: \$0/month (FREE tier)

Station mapping:
- read, ask_ai → af_sky (clear woman)
- new_word, explore, word_power → af_bella (teen girl)  
- dictation, shadowing → am_adam (man)"

echo "✅ Committed"
echo ""

# Push to HF
echo "🚀 Deploying to Hugging Face Spaces..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git push origin main || git push origin master || {
    echo "⚠️  First push, setting upstream..."
    git branch -M main
    git push -u origin main
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 Your TTS server is now building on Hugging Face!"
echo ""
echo "📊 Monitor build progress:"
echo "   👉 $SPACE_URL"
echo ""
echo "⏱️  Expected build time: 5-10 minutes"
echo ""
echo "🔍 What happens next:"
echo "   1. HF Spaces builds Docker image (downloading 115MB Kokoro models)"
echo "   2. Server starts automatically"
echo "   3. Status changes to 'Running' (green)"
echo ""
echo "🧪 Test when ready (after 5-10 min):"
echo "   Health check:"
echo "   curl https://binh3k-engquest3k.hf.space/health"
echo ""
echo "   Test voice (download MP3):"
echo "   curl \"https://binh3k-engquest3k.hf.space/tts?text=Hello&station=read\" -o test.mp3"
echo ""
echo "📱 Update frontend (.env):"
echo "   VITE_TTS_SERVER_URL=https://binh3k-engquest3k.hf.space"
echo ""
echo "✨ Done! Your TTS server will be live in ~10 minutes."

# Cleanup
cd /Users/binhnguyen/Downloads/Engquest3k
rm -rf "$TEMP_DIR"
