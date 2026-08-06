#!/bin/bash
cd /Users/binhnguyen/projects/Engquest3k

echo "========== COMMAND 1: JSON validity + structure check + issues =========="
python3 .ai/tmp_cmd1.py

echo ""
echo "========== COMMAND 2: Cross-reference orphans and missing =========="
python3 .ai/tmp_cmd2.py

echo ""
echo "========== COMMAND 3: Segment count outliers =========="
python3 .ai/tmp_cmd3.py
