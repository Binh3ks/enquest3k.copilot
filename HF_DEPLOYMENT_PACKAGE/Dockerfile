# Dockerfile for Hugging Face Spaces - EngQuest TTS Server
# Kokoro v1.0 int8 + Edge TTS for Vietnamese

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
# - ffmpeg: For WAV→MP3 conversion (Kokoro outputs WAV)
# - curl: For downloading model files
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (better Docker layer caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download Kokoro models (115MB total)
# Model: kokoro-v1.0.int8.onnx (88MB, quantized for speed)
# Voices: voices-v1.0.bin (27MB, 26 voices including af_sky, af_bella, am_adam)
RUN echo "📥 Downloading Kokoro models..." && \
    curl -L --progress-bar -o kokoro-v1.0.int8.onnx \
    https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx && \
    curl -L --progress-bar -o voices-v1.0.bin \
    https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin && \
    echo "✅ Models downloaded successfully"

# Verify model files
RUN ls -lh kokoro-v1.0.int8.onnx voices-v1.0.bin

# Copy application code
COPY app.py .

# Create cache directory for generated audio files
RUN mkdir -p cache

# Hugging Face Spaces uses port 7860 by default
EXPOSE 7860

# Environment variable for port (HF Spaces sets this automatically)
ENV PORT=7860

# Health check (optional, for monitoring)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:7860/health || exit 1

# Run the FastAPI server with Uvicorn
# - host 0.0.0.0: Listen on all interfaces (required for HF Spaces)
# - port 7860: HF Spaces default port
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
