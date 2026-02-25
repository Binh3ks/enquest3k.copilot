#!/usr/bin/env python3
"""
Test different Piper voice models
Usage: python3 test_voices.py
"""

import os
import sys
from pathlib import Path
from piper.voice import PiperVoice
import wave

# Test text (cleaned, no emojis)
TEST_TEXT = "Hello! I am Miss Nova, your English teacher. What is your name?"

# Voice models to test
VOICES = [
    ("nova", "Original Nova voice"),
    ("en_US-lessac-medium", "Lessac - Natural female (current)"),
    ("en_US-amy-medium", "Amy - High quality, clear"),
    ("en_US-libritts_r-medium", "LibriTTS - Most expressive"),
]

def test_voice(model_name, description):
    """Generate audio sample for a voice model"""
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_PATH = os.path.join(BASE_DIR, "assets", "models", f"{model_name}.onnx")
    OUTPUT_DIR = os.path.join(BASE_DIR, "public", "audio", "voice_tests")
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    output_file = os.path.join(OUTPUT_DIR, f"test_{model_name}.wav")
    
    print(f"\n{'='*60}")
    print(f"Testing: {description}")
    print(f"Model: {model_name}")
    print(f"Path: {MODEL_PATH}")
    
    if not os.path.exists(MODEL_PATH):
        print(f"❌ Model file not found!")
        return False
    
    try:
        # Load voice
        print("🎙️ Loading voice model...")
        voice = PiperVoice.load(MODEL_PATH)
        
        # Generate audio
        print(f"🎤 Generating: '{TEST_TEXT}'")
        audio_chunks = list(voice.synthesize(TEST_TEXT))
        
        if not audio_chunks:
            print("❌ No audio generated")
            return False
        
        # Collect audio bytes
        audio_bytes = b''.join([chunk.audio_int16_bytes for chunk in audio_chunks])
        
        # Write WAV file
        with wave.open(output_file, 'wb') as wav_file:
            wav_file.setnchannels(1)  # Mono
            wav_file.setsampwidth(2)  # 16-bit
            wav_file.setframerate(voice.config.sample_rate)
            wav_file.writeframes(audio_bytes)
        
        file_size = os.path.getsize(output_file)
        duration = len(audio_bytes) / (voice.config.sample_rate * 2)  # 16-bit = 2 bytes per sample
        
        print(f"✅ Generated: {output_file}")
        print(f"   Size: {file_size:,} bytes")
        print(f"   Duration: {duration:.2f}s")
        print(f"   Sample rate: {voice.config.sample_rate}Hz")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("🎯 Piper Voice Comparison Test")
    print(f"Test text: '{TEST_TEXT}'")
    
    results = []
    for model_name, description in VOICES:
        success = test_voice(model_name, description)
        results.append((model_name, description, success))
    
    # Summary
    print("\n" + "="*60)
    print("📊 SUMMARY:")
    print("="*60)
    for model_name, description, success in results:
        status = "✅" if success else "❌"
        print(f"{status} {model_name:30s} - {description}")
    
    print("\n🎧 Listen to samples in: public/audio/voice_tests/")
    print("   test_nova.wav")
    print("   test_en_US-lessac-medium.wav")
    print("   test_en_US-amy-medium.wav")
    print("   test_en_US-libritts_r-medium.wav")

if __name__ == "__main__":
    main()
