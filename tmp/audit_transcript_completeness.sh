#!/bin/bash
# Audit transcript completeness: compare transcript duration vs video duration
# Requires: YouTube Data API key (YOUTUBE_API_KEY env var)
# Usage: YOUTUBE_API_KEY=xxx bash tmp/audit_transcript_completeness.sh

set -e

API_KEY="${YOUTUBE_API_KEY:-}"
TRANSCRIPT_DIR="src/data/video_transcripts_by_id/sentences"

if [ -z "$API_KEY" ]; then
  echo "❌ Set YOUTUBE_API_KEY env var first"
  echo "   export YOUTUBE_API_KEY=your_key_here"
  exit 1
fi

echo "=== TRANSCRIPT COMPLETENESS AUDIT ==="
echo "Comparing transcript duration vs actual video duration"
echo ""

# Collect all videoIds from shadowing.js files
declare -A WEEK_VIDEO

for f in src/data/weeks/week_{01..36}/shadowing.js; do
  [ -f "$f" ] || continue
  week=$(echo "$f" | grep -o 'week_[0-9]*' | sed 's/week_//')
  vid=$(grep -m1 "videoId:" "$f" | head -1 | sed "s/.*videoId: *['\"]\\([^'\"]*\\)['\"].*/\\1/")
  [ -n "$vid" ] && WEEK_VIDEO["ADV_$week"]="$vid"
done

for f in src/data/weeks_easy/week_{01..36}/shadowing.js; do
  [ -f "$f" ] || continue
  week=$(echo "$f" | grep -o 'week_[0-9]*' | sed 's/week_//')
  vid=$(grep -m1 "videoId:" "$f" | head -1 | sed "s/.*videoId: *['\"]\\([^'\"]*\\)['\"].*/\\1/")
  [ -n "$vid" ] && WEEK_VIDEO["Easy_$week"]="$vid"
done

echo "| Week | Mode | videoId | Transcript Segs | Transcript Duration | Video Duration | Gap | Status |"
echo "|------|------|---------|-----------------|--------------------|----------------|----|---------|"

# Check each unique videoId
declare -A CHECKED

for key in $(echo "${!WEEK_VIDEO[@]}" | tr ' ' '\n' | sort); do
  vid="${WEEK_VIDEO[$key]}"
  mode=$(echo "$key" | cut -d_ -f1)
  week=$(echo "$key" | cut -d_ -f2)

  # Skip if already checked this videoId
  [ -n "${CHECKED[$vid]}" ] && continue
  CHECKED[$vid]="$week"

  # Get transcript duration
  transcript_file="$TRANSCRIPT_DIR/$vid.json"
  if [ ! -f "$transcript_file" ]; then
    echo "| $week | $mode | $vid | ❌ NO FILE | - | - | - | MISSING |"
    continue
  fi

  # Check if error file
  if grep -q '"error"' "$transcript_file" 2>/dev/null; then
    echo "| $week | $mode | $vid | ❌ ERROR | - | - | - | NO CAPTIONS |"
    continue
  fi

  # Count segments and get duration from alignment info
  segs=$(grep -o '"id":' "$transcript_file" | wc -l | tr -d ' ')
  transcript_dur=$(grep -o '"totalDuration": [0-9.]*' "$transcript_file" | head -1 | sed 's/"totalDuration": //')

  # If no totalDuration in file, calculate from last segment
  if [ -z "$transcript_dur" ]; then
    transcript_dur=$(grep -o '"duration": [0-9.]*' "$transcript_file" | tail -1 | sed 's/"duration": //')
    last_start=$(grep -o '"start": [0-9.]*' "$transSCRIPT_FILE" | tail -1 | sed 's/"start": //')
    if [ -n "$last_start" ] && [ -n "$transcript_dur" ]; then
      transcript_dur=$(echo "$last_start + $transcript_dur" | bc 2>/dev/null || echo "$transcript_dur")
    fi
  fi

  # Fetch video duration from YouTube API
  video_dur=$(curl -s "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=$vid&key=$API_KEY" | grep -o '"duration":"[^"]*"' | head -1 | sed 's/"duration":"//;s/"//')

  # Convert ISO 8601 duration to seconds
  if [ -n "$video_dur" ]; then
    # Parse PT##M##S format
    mins=$(echo "$video_dur" | grep -o '[0-9]*M' | sed 's/M//')
    secs=$(echo "$video_dur" | grep -o '[0-9]*S' | sed 's/S//')
    mins=${mins:-0}
    secs=${secs:-0}
    video_seconds=$((mins * 60 + secs))
  else
    video_seconds="?"
  fi

  # Calculate gap
  if [ "$video_seconds" != "?" ] && [ -n "$transcript_dur" ]; then
    gap=$(echo "$video_seconds - $transcript_dur" | bc 2>/dev/null || echo "?")
    if [ "$gap" != "?" ]; then
      gap_pct=$(echo "scale=0; $gap * 100 / $video_seconds" | bc 2>/dev/null || echo "?")
      if [ "$gap_pct" != "?" ] && [ "$gap_pct" -gt 20 ]; then
        status="⚠️ MISSING ${gap_pct}%"
      elif [ "$gap_pct" != "?" ] && [ "$gap_pct" -gt 5 ]; then
        status="⚠️ GAP ${gap_pct}%"
      else
        status="✅ OK"
      fi
    else
      status="❓"
    fi
  else
    status="❓ NO VIDEO DUR"
  fi

  echo "| $week | $mode | $vid | $segs | ${transcript_dur}s | ${video_seconds}s | ${gap}s | $status |"
done
