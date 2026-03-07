#!/bin/bash
# 🔍 WEEK VALIDATION SCRIPT
# Usage: bash tools/validate_week.sh 12

WEEK=$1

if [ -z "$WEEK" ]; then
  echo "❌ Usage: bash tools/validate_week.sh [WEEK_NUMBER]"
  exit 1
fi

ADV="src/data/weeks/week_${WEEK}"
EASY="src/data/weeks_easy/week_${WEEK}"

echo "🔍 VALIDATING WEEK $WEEK"
echo "======================================"
echo ""

# Test 1: Field names in dictation.js
echo "Test 1: dictation.js field names..."
if grep -q 'translation_vi:' "$ADV/dictation.js" 2>/dev/null; then
  echo "❌ FAIL: Advanced dictation uses 'translation_vi' (should be 'meaning')"
  exit 1
fi

if grep -q '"audio":' "$ADV/dictation.js" 2>/dev/null | grep -v 'audio_url:'; then
  echo "❌ FAIL: Advanced dictation uses 'audio' (should be 'audio_url')"
  exit 1
fi

if grep -q 'translation_vi:' "$EASY/dictation.js" 2>/dev/null; then
  echo "❌ FAIL: Easy dictation uses 'translation_vi' (should be 'meaning')"
  exit 1
fi

echo "✅ PASS: dictation field names correct"

# Test 2: shadowing.js structure
echo ""
echo "Test 2: shadowing.js structure..."
if ! grep -q 'script:' "$ADV/shadowing.js" 2>/dev/null; then
  echo "❌ FAIL: Advanced shadowing missing 'script' array"
  exit 1
fi

if ! grep -q 'audio_full:' "$ADV/shadowing.js" 2>/dev/null; then
  echo "❌ FAIL: Advanced shadowing missing 'audio_full'"
  exit 1
fi

if grep -q 'passages:' "$EASY/shadowing.js" 2>/dev/null; then
  echo "❌ FAIL: Easy shadowing uses old 'passages' structure (should be 'script')"
  exit 1
fi

if ! grep -q 'script:' "$EASY/shadowing.js" 2>/dev/null; then
  echo "❌ FAIL: Easy shadowing missing 'script' array"
  exit 1
fi

echo "✅ PASS: shadowing structure correct"

# Test 3: Station counts
echo ""
echo "Test 3: Station counts..."

if [ ! -f "$ADV/logic.js" ]; then
  echo "❌ FAIL: logic.js missing"
  exit 1
fi

LOGIC_COUNT=$(grep -c '"id":' "$ADV/logic.js" 2>/dev/null || echo "0")
if [ "$LOGIC_COUNT" -ne 5 ]; then
  echo "❌ FAIL: logic.js has $LOGIC_COUNT items (should be 5)"
  exit 1
fi

if [ ! -f "$ADV/word_match.js" ]; then
  echo "❌ FAIL: word_match.js missing"
  exit 1
fi

WORD_MATCH_COUNT=$(grep -c '"id":' "$ADV/word_match.js" 2>/dev/null || echo "0")
if [ "$WORD_MATCH_COUNT" -ne 10 ]; then
  echo "❌ FAIL: word_match.js has $WORD_MATCH_COUNT pairs (should be 10)"
  exit 1
fi

echo "✅ PASS: Station counts correct (logic=5, word_match=10)"

# Test 4: Easy mode paths
echo ""
echo "Test 4: Easy mode image paths..."
if grep -r "images/week${WEEK}/" "$EASY/" 2>/dev/null | grep -v "week${WEEK}_easy" | grep -qv '.md:'; then
  echo "❌ FAIL: Easy mode has images/week${WEEK}/ (should be week${WEEK}_easy/)"
  echo "Found:"
  grep -r "images/week${WEEK}/" "$EASY/" | grep -v "week${WEEK}_easy" | grep -v '.md:'
  exit 1
fi

echo "✅ PASS: Easy mode paths use week${WEEK}_easy"

# Test 5: Required files
echo ""
echo "Test 5: Required files..."
REQUIRED_FILES=(
  "vocab.js"
  "word_power.js"
  "read.js"
  "explore.js"
  "dictation.js"
  "shadowing.js"
  "mindmap.js"
  "grammar.js"
  "word_match.js"
  "writing.js"
  "logic.js"
  "ask_ai.js"
  "daily_watch.js"
  "games.js"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$ADV/$file" ]; then
    MISSING_FILES+=("$file (Advanced)")
  fi
  if [ ! -f "$EASY/$file" ]; then
    MISSING_FILES+=("$file (Easy)")
  fi
done

if [ ${#MISSING_FILES[@]} -gt 0 ]; then
  echo "❌ FAIL: Missing files:"
  for file in "${MISSING_FILES[@]}"; do
    echo "   - $file"
  done
  exit 1
fi

echo "✅ PASS: All 14 station files exist (both modes)"

# Test 6: ask_ai.js structure
echo ""
echo "Test 6: ask_ai.js structure..."
if ! grep -q 'prompts:' "$ADV/ask_ai.js" 2>/dev/null; then
  echo "❌ FAIL: ask_ai.js should have 'prompts' array"
  exit 1
fi

if grep -q 'contexts_easy:' "$ADV/ask_ai.js" 2>/dev/null; then
  echo "❌ FAIL: ask_ai.js uses old 'contexts_easy' structure"
  exit 1
fi

echo "✅ PASS: ask_ai.js structure correct"

# Final result
echo ""
echo "======================================"
echo "🎉 ALL TESTS PASSED!"
echo "Week $WEEK is ready to commit."
echo "======================================"
