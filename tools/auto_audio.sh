#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "❌ Usage: sh tools/auto_audio.sh [START_WEEK] [END_WEEK] [VOICE_ID]"
    exit 1
fi

START=$1
END=$2
VOICE=$3

echo ">>> Generating Audio List for Week $START to $END (Voice: $VOICE)..."

# 1. Chạy Node để lấy danh sách JSON (List text cần đọc)
node tools/audio_batch_generator.js $START $END > tools/temp_audio_tasks.json

# 2. Chạy Python để tải file (Sử dụng Edge TTS)
if [ -s tools/temp_audio_tasks.json ]; then
    cat tools/temp_audio_tasks.json | python3 tools/generate_audio.py $VOICE
    rm tools/temp_audio_tasks.json
else
    echo "❌ Error: Could not generate audio task list."
    exit 1
fi
