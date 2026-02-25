#!/usr/bin/env python3
"""
Auto-deploy EngQuest TTS to Hugging Face Spaces
"""
import os
from huggingface_hub import HfApi, login

# Token — set via environment variable: export HF_TOKEN=hf_...
TOKEN = os.environ.get("HF_TOKEN", "")

# Login
print("🔐 Logging in to Hugging Face...")
login(token=TOKEN)
print("✅ Authenticated")
print()

# Initialize API
api = HfApi()

# Space info
REPO_ID = "binh3k/Engquest3k"
REPO_TYPE = "space"

# Files to upload
PACKAGE_DIR = "/Users/binhnguyen/Downloads/Engquest3k/HF_DEPLOYMENT_PACKAGE"
FILES_TO_UPLOAD = [
    ("Dockerfile", "Dockerfile"),
    ("app.py", "app.py"),
    ("requirements.txt", "requirements.txt"),
    ("README.md", "README.md"),
]

print("🚀 Deploying to Hugging Face Spaces...")
print(f"📦 Space: {REPO_ID}")
print()

# Upload files one by one
for local_name, remote_name in FILES_TO_UPLOAD:
    local_path = os.path.join(PACKAGE_DIR, local_name)
    print(f"📤 Uploading {remote_name}...")
    
    try:
        api.upload_file(
            path_or_fileobj=local_path,
            path_in_repo=remote_name,
            repo_id=REPO_ID,
            repo_type=REPO_TYPE,
            commit_message=f"Add {remote_name} - Kokoro TTS deployment",
        )
        print(f"   ✅ {remote_name} uploaded")
    except Exception as e:
        print(f"   ⚠️ Error uploading {remote_name}: {e}")
        print(f"   Trying to update existing file...")
        # Try again without commit message
        api.upload_file(
            path_or_fileobj=local_path,
            path_in_repo=remote_name,
            repo_id=REPO_ID,
            repo_type=REPO_TYPE,
        )
        print(f"   ✅ {remote_name} updated")

print()
print("=" * 60)
print("✅ DEPLOYMENT SUCCESSFUL!")
print("=" * 60)
print()
print("🎉 Your TTS server is now building on Hugging Face!")
print()
print("📊 Monitor build progress:")
print(f"   👉 https://huggingface.co/spaces/{REPO_ID}")
print()
print("⏱️  Expected build time: 5-10 minutes")
print()
print("🔍 What's happening:")
print("   1. HF Spaces is downloading Kokoro models (115MB)")
print("   2. Building Docker image")
print("   3. Starting TTS server")
print()
print("🧪 Test when status is 'Running' (green):")
print(f"   Health: https://binh3k-engquest3k.hf.space/health")
print(f"   Voice: https://binh3k-engquest3k.hf.space/tts?text=Hello&station=read")
print()
print("📱 Update frontend (.env):")
print("   VITE_TTS_SERVER_URL=https://binh3k-engquest3k.hf.space")
print()
print("✨ Done! Check the Space in ~10 minutes.")
