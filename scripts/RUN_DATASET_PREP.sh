#!/bin/bash
# Script chạy dataset preparation cho Piper TTS
# Dùng script này thay vì chạy trực tiếp Python để có logging đầy đủ

echo "🎙️ PIPER TTS DATASET PREPPER"
echo "================================"
echo ""

# 1. Check dependencies
echo "🔍 Kiểm tra dependencies..."

# Check FFmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg chưa cài!"
    echo "💡 Chạy: brew install ffmpeg"
    exit 1
fi
echo "   ✅ FFmpeg: $(ffmpeg -version | head -1)"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 chưa cài!"
    exit 1
fi
echo "   ✅ Python: $(python3 --version)"

# Check required Python packages
echo ""
echo "🔍 Kiểm tra Python packages..."
python3 -c "import whisper" 2>/dev/null || { echo "❌ whisper chưa cài! Run: pip install openai-whisper"; exit 1; }
python3 -c "import pydub" 2>/dev/null || { echo "❌ pydub chưa cài! Run: pip install pydub"; exit 1; }
python3 -c "import pandas" 2>/dev/null || { echo "❌ pandas chưa cài! Run: pip install pandas"; exit 1; }
echo "   ✅ Tất cả packages đã sẵn sàng!"

# 2. Check input folder
echo ""
echo "🔍 Kiểm tra input folder..."
INPUT_FOLDER="/Volumes/MY DOCUMENT/Apps/Voices/LV/raw_audio"

if [ ! -d "$INPUT_FOLDER" ]; then
    echo "❌ Không tìm thấy folder: $INPUT_FOLDER"
    echo "💡 Kiểm tra:"
    echo "   - External drive đã mount chưa?"
    echo "   - Đường dẫn có đúng không?"
    exit 1
fi

FILE_COUNT=$(find "$INPUT_FOLDER" -type f \( -name "*.mp3" -o -name "*.wav" -o -name "*.m4a" -o -name "*.flac" \) | wc -l)
echo "   ✅ Tìm thấy $FILE_COUNT file audio trong folder"

# 3. Create log directory
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/dataset_prep_$(date +%Y%m%d_%H%M%S).log"

# 4. Run Python script with logging
echo ""
echo "🚀 Bắt đầu xử lý..."
echo "📝 Logs sẽ được lưu tại: $LOG_FILE"
echo ""
echo "================================"
echo ""

# Run with both console output and log file
python3 scripts/prep_dataset.py 2>&1 | tee "$LOG_FILE"

# 5. Check results
if [ $? -eq 0 ]; then
    echo ""
    echo "================================"
    echo "✅ HOÀN TẤT!"
    echo ""
    echo "📂 Kết quả:"
    ls -lh my_dataset/ 2>/dev/null || echo "   ⚠️ Dataset folder chưa tạo"
    
    if [ -d "my_dataset/wavs" ]; then
        CLIP_COUNT=$(find my_dataset/wavs -name "*.wav" | wc -l)
        echo "   📊 Đã tạo $CLIP_COUNT clips"
        echo ""
        echo "🎧 Nghe thử một clip:"
        FIRST_CLIP=$(find my_dataset/wavs -name "*.wav" | head -1)
        if [ -n "$FIRST_CLIP" ]; then
            echo "   afplay \"$FIRST_CLIP\""
            afplay "$FIRST_CLIP"
        fi
    fi
    
    echo ""
    echo "📦 Next steps:"
    echo "   1. Kiểm tra metadata: head -20 my_dataset/metadata.csv"
    echo "   2. Nén dataset: zip -r my_dataset.zip my_dataset/"
    echo "   3. Upload lên Google Colab để train!"
else
    echo ""
    echo "❌ Có lỗi xảy ra! Xem log tại: $LOG_FILE"
    exit 1
fi
