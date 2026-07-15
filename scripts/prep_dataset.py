#!/usr/bin/env python3
"""
Piper TTS Dataset Prepper - "Mì ăn liền" Script
Tự động chuẩn bị dataset từ audio dài thành format Piper TTS
- Dùng Whisper AI để transcribe
- Tự động cắt thành câu ngắn (2-10s)
- Chuẩn hóa audio 22050Hz Mono
- Tạo metadata.csv cho Piper training

Requirements:
    brew install ffmpeg
    pip install openai-whisper pydub pandas
"""

import os
import sys
import whisper
from pydub import AudioSegment
import pandas as pd
from pathlib import Path

# --- CẤU HÌNH ---
# Tên thư mục chứa file MP3/WAV gốc bạn tải từ LibriVox
INPUT_FOLDER = sys.argv[1] if len(sys.argv) > 1 else "/Volumes/MY DOCUMENT/Apps/Voices/LV/raw_audio" 
# Tên thư mục xuất dữ liệu (sẽ dùng để upload lên Colab)
OUTPUT_DATASET = sys.argv[2] if len(sys.argv) > 2 else "my_dataset" 
# Độ dài tối thiểu và tối đa của một câu (giây) - Piper thích câu ngắn
MIN_DURATION = 2.0 
MAX_DURATION = 10.0

def prepare_audio_tensor(audio_path):
    """Chuẩn hóa audio về đúng format Piper yêu cầu: 22050Hz, Mono, 16bit"""
    print(f"      📊 Chuẩn hóa audio: {os.path.basename(audio_path)}...")
    audio = AudioSegment.from_file(audio_path)
    audio = audio.set_frame_rate(22050).set_channels(1).set_sample_width(2)
    return audio

def main():
    # 0. Kiểm tra input folder tồn tại
    if not os.path.exists(INPUT_FOLDER):
        print(f"❌ ERROR: Không tìm thấy thư mục '{INPUT_FOLDER}'")
        print(f"💡 Hãy kiểm tra lại đường dẫn hoặc mount external drive!")
        return
    
    # 1. Tạo thư mục output
    wavs_dir = os.path.join(OUTPUT_DATASET, "wavs")
    os.makedirs(wavs_dir, exist_ok=True)
    print(f"📁 Đã tạo thư mục output: {OUTPUT_DATASET}/wavs/")
    
    # 2. Load Model Whisper (Dùng 'medium' hoặc 'small' trên M4 chạy rất nhanh)
    print("🤖 Đang load model Whisper (AI nghe nhạc)...")
    print("   ⏳ Lần đầu sẽ download model (~1.5GB), sau đó cache local...")
    model = whisper.load_model("base")  # Use base model for faster processing
    print("   ✅ Model loaded!")

    metadata = []
    clip_count = 0
    skipped_count = 0

    # 3. Quét file trong thư mục input
    print(f"\n📂 Quét thư mục: {INPUT_FOLDER}")
    input_files = [f for f in os.listdir(INPUT_FOLDER) if f.endswith(('.mp3', '.wav', '.m4a', '.flac'))]
    
    if not input_files:
        print(f"❌ Không tìm thấy file audio nào trong thư mục '{INPUT_FOLDER}'")
        print("💡 Đảm bảo có file .mp3, .wav, .m4a hoặc .flac trong folder!")
        return

    print(f"✅ Tìm thấy {len(input_files)} file gốc. Bắt đầu xử lý...")
    print("=" * 60)

    for idx, filename in enumerate(input_files, 1):
        filepath = os.path.join(INPUT_FOLDER, filename)
        print(f"\n[{idx}/{len(input_files)}] 🎙️ Đang xử lý: {filename}")
        file_start_count = clip_count
        
        try:
            # Bước A: Transcribe (AI nghe và tách câu)
            # word_timestamps=True giúp cắt chính xác hơn
            print(f"      🧠 Whisper đang nghe và tách câu...")
            result = model.transcribe(filepath, word_timestamps=True, language='en')
            print(f"      ✅ Phát hiện {len(result['segments'])} segments")
            
            # Load audio gốc để chuẩn bị cắt
            original_audio = prepare_audio_tensor(filepath)

            # Bước B: Loop qua từng segment (câu)
            for seg_idx, segment in enumerate(result["segments"], 1):
                start_time = segment["start"]
                end_time = segment["end"]
                text = segment["text"].strip()
                duration = end_time - start_time

                # Lọc rác: Bỏ câu quá ngắn, quá dài hoặc chứa ký tự lạ
                if duration < MIN_DURATION or duration > MAX_DURATION:
                    skipped_count += 1
                    continue
                if "[" in text or "]" in text:  # Bỏ tiếng động như [music], [applause]
                    skipped_count += 1
                    continue
                if len(text) < 10:  # Bỏ câu quá ngắn
                    skipped_count += 1
                    continue

                # Bước C: Cắt và Xuất file
                # Pydub dùng mili-giây
                chunk = original_audio[start_time * 1000 : end_time * 1000]
                
                # Đặt tên file con: filegoc_001.wav
                clip_name = f"{Path(filename).stem}_{clip_count:04d}"
                clip_path = os.path.join(wavs_dir, f"{clip_name}.wav")
                
                # Thêm chút Fade in/out để âm thanh mượt, không bị bụp
                chunk.fade_in(50).fade_out(50).export(clip_path, format="wav")

                # Bước D: Lưu metadata (định dạng: ID|Text)
                # Piper yêu cầu format: tên_file_không_đuôi|Nội dung văn bản
                metadata.append(f"{clip_name}|{text}")
                
                clip_count += 1
                
                # Progress indicator
                if seg_idx % 20 == 0:
                    print(f"      ⏳ Đã xử lý {seg_idx}/{len(result['segments'])} segments...")
            
            file_clips = clip_count - file_start_count
            print(f"      ✅ File này tạo được {file_clips} clips (bỏ {skipped_count} clips không hợp lệ)")
            
        except Exception as e:
            print(f"      ❌ Lỗi khi xử lý file {filename}: {e}")
            continue

    print("\n" + "=" * 60)

    # 4. Lưu file metadata.csv
    csv_path = os.path.join(OUTPUT_DATASET, "metadata.csv")
    with open(csv_path, "w", encoding="utf-8") as f:
        f.write("\n".join(metadata))

    print(f"\n🎉 HOÀN TẤT! Đã tạo bộ dataset tại thư mục: /{OUTPUT_DATASET}")
    print(f"📊 Tổng số file audio: {clip_count}")
    print(f"🗑️ Đã bỏ: {skipped_count} clips (quá ngắn/dài/lỗi)")
    print(f"📝 File metadata: {csv_path}")
    print("\n📦 NEXT STEPS:")
    print(f"   1. Kiểm tra: ls -lh {OUTPUT_DATASET}/wavs/ | head -20")
    print(f"   2. Nghe thử: afplay {OUTPUT_DATASET}/wavs/*.wav")
    print(f"   3. Nén dataset: zip -r my_dataset.zip {OUTPUT_DATASET}/")
    print(f"   4. Upload my_dataset.zip lên Google Colab để train!")
    print("\n👉 Nếu kết quả tốt, lặp lại với thêm audio để có >1000 clips!")

if __name__ == "__main__":
    main()
