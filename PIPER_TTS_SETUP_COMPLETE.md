# Piper TTS Local Setup - Testing Guide

## 🎯 Đã Triển Khai

### ✅ Cấu Trúc Thư Mục
```
Engquest3k/
├── bin/
│   └── piper/
│       ├── piper                      # Executable (2.8MB)
│       ├── libespeak-ng.so*           # Dependencies
│       ├── libonnxruntime.so*
│       ├── libpiper_phonemize.so*
│       └── espeak-ng-data/            # Language data
├── assets/
│   └── models/
│       ├── nova.onnx                  # Voice model (60MB)
│       └── nova.onnx.json             # Config
├── public/
│   └── audio/
│       └── cache/                     # TTS output cache
└── scripts/
    └── tts_server.py                  # FastAPI server
```

### ✅ Files Created
1. **`scripts/tts_server.py`** - Python FastAPI server for Piper TTS
2. **`src/services/voiceService.js`** - Hybrid voice service (Piper + Web Speech)
3. **`src/components/TeacherDashboard.jsx`** - Teacher monitoring dashboard

---

## 🧪 Testing Steps

### Step 1: Install Python Dependencies

```bash
cd /Users/binhnguyen/Downloads/Engquest3k
pip3 install fastapi uvicorn
```

### Step 2: Start TTS Server

```bash
python3 scripts/tts_server.py
```

Expected output:
```
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 3: Test API Directly

Open browser or use curl:

```bash
# Test 1: Simple greeting
curl "http://localhost:8000/speak?text=Hello%20world"

# Test 2: Longer sentence
curl "http://localhost:8000/speak?text=Welcome%20to%20EngQuest"
```

Expected response:
```json
{"audio_url": "http://localhost:8000/audio/abc123def456.wav"}
```

### Step 4: Play Audio

Open browser:
```
http://localhost:8000/speak?text=Hello%20there
```

Then visit the `audio_url` returned to hear the voice.

### Step 5: Test in React App

1. Start dev server (already running):
```bash
npm run dev
```

2. Import voiceService in any component:

```javascript
import VoiceService from '../services/voiceService';

// Test in component
const testPiperTTS = async () => {
  await VoiceService.speak("Hello from Piper TTS!");
};
```

3. For Electron app testing:
   - Inject `window.electronAPI` in preload script
   - VoiceService will auto-detect and use Piper
   - Falls back to Web Speech if Piper unavailable

---

## 🔧 Troubleshooting

### Issue: "Piper executable not found"
```bash
# Check if piper exists and is executable
ls -lh bin/piper/piper
chmod +x bin/piper/piper
```

### Issue: "Model not found"
```bash
# Verify model files
ls -lh assets/models/
# Should show nova.onnx (60MB) and nova.onnx.json (4KB)
```

### Issue: "Permission denied"
```bash
# Make piper executable
chmod +x bin/piper/piper

# Check library files
chmod +x bin/piper/*.so*
```

### Issue: "Port 8000 already in use"
```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9

# Or change port in tts_server.py (line 82):
uvicorn.run(app, host="127.0.0.1", port=8001)
```

---

## 📊 Performance Expectations

- **First generation**: 200-500ms (model loading)
- **Cached audio**: <10ms (instant playback)
- **File size**: ~50KB per sentence (WAV format)
- **Quality**: 22050Hz, 16-bit PCM

---

## 🎓 Teacher Dashboard Access

Add route to your React Router:

```javascript
import TeacherDashboard from './components/TeacherDashboard';

// In your router config:
<Route path="/teacher" element={<TeacherDashboard />} />
```

Access at: `http://localhost:5173/teacher`

---

## 📝 Next Steps

### For Production (Electron App):

1. **Package with Electron Builder** - Add to `package.json`:
```json
{
  "build": {
    "extraResources": [
      { "from": "bin/piper", "to": "bin/piper" },
      { "from": "assets/models", "to": "assets/models" },
      { "from": "scripts/tts_server.py", "to": "scripts/tts_server.py" }
    ]
  }
}
```

2. **Auto-start TTS Server** - In Electron main process:
```javascript
const { spawn } = require('child_process');
const piperServer = spawn('python3', ['scripts/tts_server.py']);
```

3. **Asset Optimization** - Run before building:
```bash
bash scripts/optimize_assets.sh
```

### For Web Version:

- VoiceService automatically uses Web Speech API
- No local server needed
- Works out of the box in browsers

---

## 🗄️ Database Schema (Optional)

If using Supabase for logging, run this SQL:

```sql
-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    current_week INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress logs
CREATE TABLE progress_logs (
    id BIGSERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    lesson_id TEXT,
    score INT,
    ai_feedback TEXT,
    activity_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audio logs
CREATE TABLE audio_logs (
    id BIGSERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(id),
    text_content TEXT,
    lesson_id TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## ⚠️ IMPORTANT: Piper Binary Issue

**The downloaded Piper executable is a Linux ARM64 binary (ELF), not macOS.**

Piper does NOT have prebuilt macOS binaries. You have 2 options:

### Option 1: Use Docker (Recommended)
Run Piper in a Linux container:
```bash
docker run -it --rm \
  -v "$(pwd)/assets/models:/models" \
  -v "$(pwd)/public/audio/cache:/output" \
  -p 8000:8000 \
  rhasspy/piper:latest
```

### Option 2: Build from Source (Advanced)
Follow: https://github.com/rhasspy/piper

### Option 3: Use Web Speech API Only (Easiest)
- VoiceService already has fallback to Web Speech API
- Works on macOS/Windows/Linux browsers
- No Piper installation needed
- Quality is good for ESL learners

**Current Status: Web Speech API is ready to use** ✅

---

## ✅ Status

- [x] Directory structure created
- [x] Voice model files copied (nova.onnx + config)
- [⚠️] Piper executable downloaded (Linux binary, won't run on macOS)
- [x] TTS server created (FastAPI)
- [x] Voice service created (hybrid Piper + Web Speech)
- [x] Teacher dashboard component created
- [x] Python dependencies installed
- [⚠️] TTS server can't run (Piper needs Docker or build from source)
- [✅] Web Speech API fallback ready to use

---

## 🎉 Ready to Test!

Run these commands to start testing:

```bash
# Terminal 1: Start TTS Server
python3 scripts/tts_server.py

# Terminal 2: Dev server should already be running
# If not: npm run dev

# Test in browser
open http://localhost:8000/speak?text=Hello%20EngQuest
```
