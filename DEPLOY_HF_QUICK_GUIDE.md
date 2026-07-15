# Quick Deployment Guide - HF Spaces

## ✅ Pre-Deployment Checklist

All deployment files are ready in `esl_server/`:

- ✅ `Dockerfile` - Docker build configuration with Kokoro models
- ✅ `app.py` - FastAPI server with 7-voice mapping
- ✅ `requirements.txt` - Python dependencies with versions
- ✅ `README.md` - Complete API documentation
- ✅ `.spacesconfig` - HF Spaces metadata
- ✅ `deploy_to_hf.sh` - Automated deployment script

## 🚀 Deployment Options

### Option A: Automated Script (Recommended)

```bash
cd esl_server
./deploy_to_hf.sh https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server
```

### Option B: Manual Deployment

#### Step 1: Create Space on Hugging Face

1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Settings:
   - **Name**: `engquest-tts-server`
   - **SDK**: Docker
   - **Hardware**: CPU Basic (FREE)
   - **Visibility**: Public
4. Click "Create Space"

#### Step 2: Login to Hugging Face CLI

```bash
pip install huggingface_hub
huggingface-cli login
```

Paste your token from: https://huggingface.co/settings/tokens

#### Step 3: Clone and Deploy

```bash
# Clone your Space
git clone https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server
cd engquest-tts-server

# Copy files from esl_server
cp ../esl_server/Dockerfile .
cp ../esl_server/app.py .
cp ../esl_server/requirements.txt .
cp ../esl_server/README.md .
cp ../esl_server/.spacesconfig .

# Commit and push
git add .
git commit -m "Deploy Kokoro TTS v1.0 with 7-voice support"
git push
```

#### Step 4: Monitor Build

1. Go to your Space URL
2. Click "Logs" tab
3. Wait 5-10 minutes for build

Expected logs:
```
📥 Downloading Kokoro models...
✅ Models downloaded successfully
🎙️ Initializing Kokoro TTS...
✅ Kokoro TTS ready (88MB int8 model)
INFO:     Application startup complete.
```

#### Step 5: Test Deployment

```bash
# Replace YOUR_USERNAME with your actual username
SPACE_URL="https://YOUR_USERNAME-engquest-tts-server.hf.space"

# Test health
curl "$SPACE_URL/health"

# Test 7 voices
curl "$SPACE_URL/tts?text=Hello%20student&station=read" -o test_read.mp3
curl "$SPACE_URL/tts?text=Apple&station=new_word" -o test_vocab.mp3
curl "$SPACE_URL/tts?text=Listen&station=dictation" -o test_dictation.mp3
curl "$SPACE_URL/tts?text=How%20can%20I%20help&station=ask_ai" -o test_ask.mp3
curl "$SPACE_URL/tts?text=Repeat&station=shadowing" -o test_shadow.mp3
curl "$SPACE_URL/tts?text=Explore&station=explore" -o test_explore.mp3
curl "$SPACE_URL/tts?text=Spell&station=word_power" -o test_word.mp3

# Test Vietnamese
curl "$SPACE_URL/tts?text=Xin%20chào&voice=vi" -o test_vi.mp3
```

## 📊 Expected Results

### Health Check Response
```json
{
  "status": "ok",
  "kokoro": "loaded",
  "edge_tts": "available"
}
```

### Audio Files
- Size: 8-15KB per file (MP3, 64kbps, 24kHz)
- Quality: Clear speech optimized for ESL learners
- Format: MPEG ADTS, layer III, v2, Monaural

### Voice Mapping Verification

| Station | Expected Voice | Test Output |
|---------|---------------|-------------|
| read | af_sky (woman) | ✅ Should sound professional |
| new_word | af_bella (teen girl) | ✅ Should sound energetic |
| dictation | am_adam (man) | ✅ Should sound clear |
| ask_ai | af_sky (woman) | ✅ Same as read |
| shadowing | am_adam (man) | ✅ Same as dictation |
| explore | af_bella (teen girl) | ✅ Same as new_word |
| word_power | af_bella (teen girl) | ✅ Same as new_word |

## 🔧 Troubleshooting

### Build Failed

**Symptom**: Build logs show errors

**Common Causes**:
1. Model download timeout → Retry build
2. Python version mismatch → Check Dockerfile uses Python 3.11
3. Missing ffmpeg → Check RUN apt-get install command

**Solution**: Check logs, fix Dockerfile, commit and push again

### "Kokoro not loaded" in Health Check

**Symptom**: Health response shows `"kokoro": "unavailable"`

**Solution**: 
1. Check logs for model download errors
2. Verify model URLs in Dockerfile
3. Check disk space (needs 200MB free)

### Space Sleeping After 1 Hour

**Symptom**: First request after idle takes 30+ seconds

**Solution**: 
- Accept cold start (normal for FREE tier)
- OR upgrade to persistent hardware (GPU T4 Small: $0.60/hour)
- OR setup Cloudflare Worker to keep Space warm

### Audio Quality Issues

**Symptom**: Robotic voice, artifacts, clipping

**Solution**:
1. Check ffmpeg is installed (for MP3 conversion)
2. Try fp16 model instead of int8 (better quality, 2x size)
3. Adjust Kokoro speed parameter in app.py

## ✅ Deployment Success Criteria

### Immediate (After Build)
- ✅ Health endpoint returns `"kokoro": "loaded"`
- ✅ All 7 stations generate different voices
- ✅ Audio quality is clear and natural
- ✅ Response time <5 seconds (cold)

### Week 1
- ✅ 99% uptime (HF Spaces reliability)
- ✅ <1% error rate
- ✅ No cost incurred (FREE tier sufficient)

## 📝 Next Steps After Deployment

1. **Copy Space URL** for Cloudflare setup
2. **Test all 7 voices** manually (listen to audio)
3. **Monitor logs** for first 24 hours (catch any errors)
4. **Setup Cloudflare CDN** (see CLOUDFLARE_CDN_SETUP_GUIDE.md)
5. **Update frontend** (.env: VITE_TTS_SERVER_URL)

## 📚 Additional Resources

- [HF Spaces Docker Guide](https://huggingface.co/docs/hub/spaces-sdks-docker)
- [Kokoro ONNX Docs](https://github.com/thewh1teagle/kokoro-onnx)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

## 🆘 Need Help?

- HF Spaces: https://discuss.huggingface.co/
- Kokoro Issues: https://github.com/thewh1teagle/kokoro-onnx/issues
- Project docs: See TTS_REFACTOR_COMPLETE_REPORT.md
