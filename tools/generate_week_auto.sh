#!/bin/bash

# Auto Week Generation with Asset Pipeline
# Usage: ./tools/generate_week_auto.sh <week_number>

WEEK=$1
LOG_FILE="/tmp/week${WEEK}_auto.log"

if [ -z "$WEEK" ]; then
    echo "❌ Usage: ./tools/generate_week_auto.sh <week_number>"
    exit 1
fi

echo "🚀 Starting automated Week $WEEK generation..."
echo "📋 Log file: $LOG_FILE"
echo "⏰ Estimated time: 5-7 minutes"
echo ""
echo "⚠️  DO NOT INTERRUPT THIS PROCESS!"
echo ""

# Run in background and wait for completion
node tools/generate_week.js "$WEEK" > "$LOG_FILE" 2>&1 &
PID=$!

echo "✅ Process started (PID: $PID)"
echo ""

# Monitor progress
while ps -p $PID > /dev/null 2>&1; do
    sleep 30
    ELAPSED=$((ELAPSED + 30))
    
    # Count files created
    ADV_COUNT=$(ls -1 src/data/weeks/week_$(printf "%02d" $WEEK)/*.js 2>/dev/null | wc -l)
    EASY_COUNT=$(ls -1 src/data/weeks_easy/week_$(printf "%02d" $WEEK)/*.js 2>/dev/null | wc -l)
    
    echo "[${ELAPSED}s] Advanced: ${ADV_COUNT}/14 | Easy: ${EASY_COUNT}/14"
    
    # Show last 3 lines of log
    tail -3 "$LOG_FILE" | grep -v "^$"
    echo ""
done

echo ""
echo "=========================================="
echo "✅ PROCESS COMPLETED!"
echo "=========================================="
echo ""

# Show final summary
tail -50 "$LOG_FILE"

echo ""
echo "Full log: $LOG_FILE"
