import os
import hashlib
import asyncio
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from kokoro_onnx import Kokoro
import edge_tts
import soundfile as sf
import numpy as np

app = FastAPI(title="ESL TTS API - Kokoro + Edge")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CẤU HÌNH ---
CACHE_DIR = "cache"
os.makedirs(CACHE_DIR, exist_ok=True)

# Model paths
MODEL_PATH = "kokoro-v1.0.int8.onnx"
VOICES_PATH = "voices-v1.0.bin"

# Khởi tạo Kokoro với models đã download
print("🎙️ Initializing Kokoro TTS...")
try:
    kokoro = Kokoro(MODEL_PATH, VOICES_PATH)
    print("✅ Kokoro TTS ready (88MB int8 model)")
except Exception as e:
    print(f"❌ Kokoro failed to load: {e}")
    print("⚠️ Fallback to Edge TTS only")
    kokoro = None

# 7-Station Voice Mapping (3 Kokoro voices strategically mapped)
STATION_VOICE_MAP = {
    "read": "af_sky",          # Read: Clear professional woman
    "new_word": "af_bella",    # Vocab: Energetic teen girl
    "dictation": "am_adam",    # Dictation: Clear enunciation man
    "ask_ai": "af_sky",        # Ask AI: Conversational woman
    "shadowing": "am_adam",    # Shadowing: Practice-friendly man
    "explore": "af_bella",     # Explore: Storytelling girl
    "word_power": "af_bella",  # Word Power: Game-friendly girl
}

# Legacy support (voice parameter)
VOICE_MAP = {
    "teen_girl": "af_bella",
    "clear_woman": "af_sky",
    "energetic_man": "am_adam"
}

@app.get("/")
def home():
    return {
        "message": "ESL TTS Server - Kokoro v1.0 (int8) + Edge TTS",
        "endpoints": {
            "/tts": "Generate TTS audio (supports station or voice parameter)",
            "/health": "Health check"
        },
        "stations": list(STATION_VOICE_MAP.keys()),
        "voices": list(VOICE_MAP.keys()) + ["vi"],
        "kokoro_status": "loaded" if kokoro else "unavailable"
    }

@app.get("/health")
def health():
    return {
        "status": "ok", 
        "kokoro": "loaded" if kokoro else "unavailable",
        "edge_tts": "available"
    }

@app.get("/speak")
@app.get("/tts")
async def tts(
    text: str = Query(..., description="Text to synthesize"),
    voice: str = Query(None, description="Legacy: teen_girl, clear_woman, energetic_man, vi"),
    station: str = Query(None, description="Station ID: read, new_word, dictation, ask_ai, shadowing, explore, word_power"),
):
    """
    Generate TTS audio from text
    - Station parameter (recommended): Use station ID for automatic voice selection
    - Voice parameter (legacy): Direct voice selection
    """
    
    # Determine Kokoro voice from station or voice parameter
    kokoro_voice = None
    
    if station:
        # New approach: station-based voice selection
        kokoro_voice = STATION_VOICE_MAP.get(station, "af_sky")
    elif voice and voice in VOICE_MAP:
        # Legacy approach: direct voice selection
        kokoro_voice = VOICE_MAP[voice]
    elif voice == "vi":
        # Vietnamese: use Edge TTS
        kokoro_voice = None
    else:
        # Default: clear woman voice
        kokoro_voice = "af_sky"
    
    # Generate cache key
    cache_key = f"{text}_{station or voice or 'default'}"
    file_hash = hashlib.md5(cache_key.encode()).hexdigest()
    output_path = os.path.join(CACHE_DIR, f"{file_hash}.mp3")

    # Return cached file if exists (with Cloudflare-friendly headers)
    if os.path.exists(output_path):
        return FileResponse(
            output_path, 
            media_type="audio/mpeg",
            headers={
                "Cache-Control": "public, max-age=2592000",  # 1 month
                "X-Cache": "HIT"
            }
        )

    try:
        if voice == "vi":
            # Vietnamese: Edge TTS
            communicate = edge_tts.Communicate(text, "vi-VN-HoaiMyNeural")
            await communicate.save(output_path)
            print(f"✅ Edge TTS (vi): {text[:30]}...")
        
        elif kokoro and kokoro_voice:
            # English: Kokoro TTS
            samples, sample_rate = kokoro.create(text, voice=kokoro_voice, speed=1.0)
            
            # Save as WAV first
            wav_path = output_path.replace('.mp3', '.wav')
            sf.write(wav_path, samples, sample_rate)
            
            # Convert WAV to MP3 using ffmpeg (if available)
            if os.system(f"which ffmpeg > /dev/null 2>&1") == 0:
                os.system(f"ffmpeg -i {wav_path} -codec:a libmp3lame -qscale:a 2 {output_path} -y > /dev/null 2>&1")
                os.remove(wav_path)
            else:
                # Fallback: use WAV instead
                os.rename(wav_path, output_path)
            
            print(f"✅ Kokoro ({kokoro_voice}): {text[:30]}...")
        
        else:
            # Fallback: Edge TTS for English
            communicate = edge_tts.Communicate(text, "en-US-JennyNeural")
            await communicate.save(output_path)
            print(f"⚠️ Fallback Edge TTS: {text[:30]}...")

        return FileResponse(
            output_path, 
            media_type="audio/mpeg",
            headers={
                "Cache-Control": "public, max-age=2592000",  # 1 month for Cloudflare
                "X-Cache": "MISS"
            }
        )
    
    except Exception as e:
        print(f"❌ TTS Error: {e}")
        raise HTTPException(status_code=500, detail=f"TTS generation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Local dev port 8000, Hugging Face Spaces dùng port 7860
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
