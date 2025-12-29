#!/bin/bash
# Merge missing mindmap easy branches into audio_tasks.json and generate

cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k

# Read the main tasks and remove closing bracket
HEAD=$(head -n -1 tools/audio_tasks.json)

# Merge them: main tasks (minus last ]) + comma + new tasks
echo "$HEAD," > tools/audio_tasks_merged.json
tail -n +2 tools/mindmap_easy_branches.json >> tools/audio_tasks_merged.json

# Replace old with merged
mv tools/audio_tasks_merged.json tools/audio_tasks.json

# Run generator
export OPENAI_API_KEY="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"
python3 tools/generate_audio.py --provider openai --voice "nova"

echo "✅ Done! Mindmap audio for both modes should be ready."
