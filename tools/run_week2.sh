#!/bin/bash
cd /Users/binhnguyen/Downloads/Engquest3k
echo "🚀 Starting Week 2 generation in background..."
echo "📋 Log file: /tmp/week2_bg.log"
echo "⏰ Estimated time: ~3 minutes (29 files with rate limiting)"
echo ""
echo "Monitor progress: tail -f /tmp/week2_bg.log"
echo "Check files: ls -la src/data/weeks/week_02/"
echo ""

nohup node tools/generate_week.js 2 > /tmp/week2_bg.log 2>&1 &
BG_PID=$!
echo "✅ Process started (PID: $BG_PID)"
echo ""
echo "Waiting for completion..."

# Wait and show progress every 30s
for i in {1..6}; do
    sleep 30
    if ps -p $BG_PID > /dev/null 2>&1; then
        FILES_COUNT=$(ls -1 src/data/weeks/week_02/*.js 2>/dev/null | wc -l)
        echo "[$((i*30))s] Still running... Files created: $FILES_COUNT"
    else
        echo "Process completed!"
        break
    fi
done

# Show final result
echo ""
echo "=== FINAL STATUS ==="
tail -30 /tmp/week2_bg.log
