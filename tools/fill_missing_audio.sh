#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  EngQuest3K — Fill Missing Audio (Deepgram → Google → HF Kokoro)
#
#  Scans EVERY week+mode for audio files not yet on R2, generates them
#  with Deepgram, and uploads immediately.
#
#  Usage:
#    bash tools/fill_missing_audio.sh              # all weeks 1-7, both modes
#    bash tools/fill_missing_audio.sh 3            # only week 3, both modes
#    bash tools/fill_missing_audio.sh 3 advanced   # week 3 advanced only
#    bash tools/fill_missing_audio.sh 3 easy ask_ai  # week 3 easy, ask_ai only
#    bash tools/fill_missing_audio.sh all           # explicit all weeks
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

WEEK="${1:-all}"
MODE="${2:-all}"
STATION="${3:-}"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  EngQuest3K — Fill Missing Audio"
echo "  Week: $WEEK | Mode: $MODE | Station: ${STATION:-all}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Build args
ARGS=("$WEEK" "--mode" "$MODE" "--upload")
if [ -n "$STATION" ]; then
  ARGS+=("--station" "$STATION")
fi

python3 tools/generate_audio_deepgram.py "${ARGS[@]}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Done. Files generated + uploaded to R2."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
