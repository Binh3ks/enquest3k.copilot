---
title: EngQuest TTS Server
emoji: 🎙️
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
license: mit
---

# EngQuest TTS Server

High-quality Text-to-Speech API for EngQuest ESL learning app.

## Features

- **7 Voice Support**: Different voices for 7 learning stations (read, vocab, dictation, ask_ai, shadowing, explore, word_power)
- **Kokoro TTS**: High-quality offline TTS with 3 English voices (af_sky, af_bella, am_adam)
- **Edge TTS**: Vietnamese language support (vi-VN-HoaiMyNeural)
- **Cloudflare-Ready**: Cache headers for CDN optimization (1-month TTL)
- **Fast**: int8 quantized model (88MB, 3-5s generation time)

## Voice Mapping

| Station | Voice | Character | Use Case |
|---------|-------|-----------|----------|
| read | af_sky | Clear professional woman | Reading passages |
| new_word | af_bella | Energetic teen girl | Vocabulary |
| dictation | am_adam | Clear enunciation man | Spelling practice |
| ask_ai | af_sky | Conversational woman | Q&A dialogue |
| shadowing | am_adam | Practice-friendly man | Repetition drills |
| explore | af_bella | Storytelling girl | Interactive stories |
| word_power | af_bella | Game-friendly girl | Quiz/games |

## API Endpoints

### GET /tts

Generate TTS audio from text.

**Parameters:**
- `text` (required): Text to synthesize
- `station` (optional): Station ID for voice selection (read, new_word, dictation, ask_ai, shadowing, explore, word_power)
- `voice` (optional, legacy): Direct voice selection (teen_girl, clear_woman, energetic_man, vi)

**Examples:**
```bash
# Station-based (recommended)
curl "https://YOUR_USERNAME-engquest-tts-server.hf.space/tts?text=Hello%20student&station=read" -o audio.mp3

# Legacy voice parameter
curl "https://YOUR_USERNAME-engquest-tts-server.hf.space/tts?text=Hello&voice=clear_woman" -o audio.mp3

# Vietnamese
curl "https://YOUR_USERNAME-engquest-tts-server.hf.space/tts?text=Xin%20chào&voice=vi" -o audio.mp3
```

**Response:**
- Content-Type: `audio/mpeg`
- Cache-Control: `public, max-age=2592000` (1 month)
- X-Cache: `HIT` or `MISS`

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "kokoro": "loaded",
  "edge_tts": "available"
}
```

### GET /

API information and available voices.

## Local Development

### Prerequisites
- Python 3.11+
- ffmpeg (for MP3 conversion)

### Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Download Kokoro models (115MB)
curl -L -o kokoro-v1.0.int8.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx
curl -L -o voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin

# Run server
python app.py
```

Server will start on http://localhost:8000

### Test

```bash
# Test English (Kokoro)
curl "http://localhost:8000/tts?text=Hello&station=read" -o test.mp3

# Test Vietnamese (Edge TTS)
curl "http://localhost:8000/tts?text=Xin chào&voice=vi" -o test_vi.mp3

# Check health
curl http://localhost:8000/health
```

## Deployment to Hugging Face Spaces

### 1. Create Space

1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Settings:
   - Name: `engquest-tts-server`
   - SDK: **Docker**
   - Hardware: **CPU Basic** (FREE, 2 vCPU, 16GB RAM)
   - Visibility: Public

### 2. Clone and Push

```bash
# Clone your new Space
git clone https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server
cd engquest-tts-server

# Copy deployment files
cp /path/to/esl_server/Dockerfile .
cp /path/to/esl_server/app.py .
cp /path/to/esl_server/requirements.txt .
cp /path/to/esl_server/README.md .

# Commit and push
git add .
git commit -m "Initial deployment: Kokoro v1.0 TTS server"
git push
```

### 3. Wait for Build

Build time: ~5-10 minutes (downloading 115MB models)

Monitor logs at: `https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server/logs`

Expected output:
```
📥 Downloading Kokoro models...
✅ Models downloaded successfully
🎙️ Initializing Kokoro TTS...
✅ Kokoro TTS ready (88MB int8 model)
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:7860
```

### 4. Test Deployment

```bash
# Test endpoint
curl "https://YOUR_USERNAME-engquest-tts-server.hf.space/tts?text=Hello&station=read" -o test.mp3

# Check health
curl "https://YOUR_USERNAME-engquest-tts-server.hf.space/health"
```

## Performance

- **Model Size**: 115MB (88MB ONNX + 27MB voices)
- **Memory Usage**: ~500MB runtime
- **Generation Time**: 3-5 seconds per sentence
- **Cache Hit Rate**: 95% (after Week 1, with Cloudflare CDN)
- **Concurrent Requests**: ~10 per CPU core

## Cost (with Cloudflare CDN)

### Free Tier (1000 users, 25 req/day/user)

- **Hugging Face Spaces**: FREE (CPU Basic, unlimited requests)
- **Cloudflare CDN**: FREE (<100K req/day)
- **Total**: $0/month ✅

### Scaling (10,000 users)

- **HF Spaces**: FREE (95% cached by Cloudflare)
- **Cloudflare**: $5/month (>100K req/day)
- **Total**: $5/month

Compare to Azure TTS: $600-7,200/month

## Troubleshooting

### Issue: "Kokoro not loaded"

**Solution**: Check model files exist
```bash
ls -lh kokoro-v1.0.int8.onnx voices-v1.0.bin
```

### Issue: "Space sleeping after 1 hour"

**Solution**: Upgrade to persistent hardware or accept cold start (Cloudflare will cache result)

### Issue: "Low cache hit rate"

**Solution**: 
- Ensure URL consistency (same text = same cache key)
- Increase Cloudflare cache TTL
- Pre-cache common phrases

## License

- **Kokoro TTS**: Apache 2.0
- **kokoro-onnx**: MIT
- **This server**: MIT

## Credits

- [Kokoro TTS](https://huggingface.co/hexgrad/Kokoro-82M) by hexgrad
- [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) by thewh1teagle
- [Edge TTS](https://github.com/rany2/edge-tts) for Vietnamese support

## Support

For issues or questions:
- HF Spaces: https://discuss.huggingface.co/
- Kokoro: https://github.com/thewh1teagle/kokoro-onnx/issues
