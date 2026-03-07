#!/bin/bash
# =================================================================
# VALIDATE_CONTENT_QUALITY.SH - Week Content Quality Validation
# Purpose: Check for common content errors that count validation misses
# =================================================================

WEEK=$1

if [ -z "$WEEK" ]; then
  echo "❌ Usage: $0 <week_number>"
  echo "   Example: $0 12"
  exit 1
fi

echo "================================================"
echo "🔍 CONTENT QUALITY VALIDATION - WEEK $WEEK"
echo "================================================"
echo ""

ERRORS=0

# =================================================================
# CHECK 1: Daily Watch - Must have 5 actual video URLs
# =================================================================
echo "📺 [CHECK 1] Daily Watch - Video Count & URLs"
echo "   Expected: 5 videos with real YouTube URLs"
echo ""

ADV_VIDEOS=$(grep -o "https://www.youtube.com/watch" "src/data/weeks/week_${WEEK}/daily_watch.js" 2>/dev/null | wc -l | tr -d ' ')
EASY_VIDEOS=$(grep -o "https://www.youtube.com/watch" "src/data/weeks_easy/week_${WEEK}/daily_watch.js" 2>/dev/null | wc -l | tr -d ' ')

echo "   Advanced videos: $ADV_VIDEOS"
echo "   Easy videos: $EASY_VIDEOS"

if [ "$ADV_VIDEOS" -ne 5 ]; then
  echo "   ❌ FAIL: Advanced mode daily_watch.js should have exactly 5 videos (found $ADV_VIDEOS)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Advanced mode has 5 videos"
fi

if [ "$EASY_VIDEOS" -ne 5 ]; then
  echo "   ❌ FAIL: Easy mode daily_watch.js should have exactly 5 videos (found $EASY_VIDEOS)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Easy mode has 5 videos"
fi

# Check for placeholder URLs
PLACEHOLDER_COUNT=$(grep -E '(url: "#"|video_url: "#")' "src/data/weeks/week_${WEEK}/daily_watch.js" "src/data/weeks_easy/week_${WEEK}/daily_watch.js" 2>/dev/null | wc -l | tr -d ' ')
if [ "$PLACEHOLDER_COUNT" -gt 0 ]; then
  echo "   ❌ FAIL: Found $PLACEHOLDER_COUNT placeholder URLs (url: \"#\") - must use real YouTube URLs"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: No placeholder URLs found"
fi

echo ""

# =================================================================
# CHECK 2: NO Sentence Builder in index.js
# =================================================================
echo "🚫 [CHECK 2] Sentence Builder - Must NOT exist"
echo "   Expected: No sentence_builder in stations"
echo ""

SB_IN_INDEX=$(grep -i "sentence.?builder" "src/data/weeks/week_${WEEK}/index.js" "src/data/weeks_easy/week_${WEEK}/index.js" 2>/dev/null | wc -l | tr -d ' ')

if [ "$SB_IN_INDEX" -gt 0 ]; then
  echo "   ❌ FAIL: Found sentence_builder reference in index.js (should not exist)"
  grep -n "sentence" "src/data/weeks/week_${WEEK}/index.js" 2>/dev/null
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: No sentence_builder in index.js"
fi

# Check if sentence_builder.js file exists (should not)
if [ -f "src/data/weeks/week_${WEEK}/sentence_builder.js" ]; then
  echo "   ❌ FAIL: sentence_builder.js file exists (should be deleted)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: No sentence_builder.js file"
fi

echo ""

# =================================================================
# CHECK 3: AI Tutor Missions - Theme Verification
# =================================================================
echo "🤖 [CHECK 3] AI Tutor Missions - Theme Verification"
echo "   Checking if week_${WEEK}_real.js mentions Week $WEEK theme"
echo ""

if [ ! -f "src/data/weeks/week_${WEEK}_real.js" ]; then
  echo "   ❌ FAIL: week_${WEEK}_real.js file not found"
  ERRORS=$((ERRORS + 1))
else
  # Get week title from index.js
  WEEK_THEME=$(grep "weekTitle_en:" "src/data/weeks/week_${WEEK}/index.js" | sed 's/.*weekTitle_en: *"\(.*\)".*/\1/' | head -1)
  echo "   Week theme from index.js: \"$WEEK_THEME\""
  
  # Check if week_XX_real.js has updated week_id
  REAL_WEEK_ID=$(grep "week_id:" "src/data/weeks/week_${WEEK}_real.js" | grep -o "[0-9]\+" | head -1)
  
  if [ "$REAL_WEEK_ID" != "$WEEK" ]; then
    echo "   ❌ FAIL: week_id in week_${WEEK}_real.js is $REAL_WEEK_ID (should be $WEEK)"
    ERRORS=$((ERRORS + 1))
  else
    echo "   ✅ PASS: week_id is correct ($WEEK)"
  fi
  
  # Check if title is updated
  REAL_TITLE=$(grep "title:" "src/data/weeks/week_${WEEK}_real.js" | head -1)
  if echo "$REAL_TITLE" | grep -q "Week $WEEK"; then
    echo "   ✅ PASS: Title mentions Week $WEEK"
  else
    echo "   ⚠️  WARNING: Title might not mention Week $WEEK: $REAL_TITLE"
  fi
  
  # Check mission titles (should not be generic)
  GENERIC_MISSIONS=$(grep -E "mission_title.*\"(Skills Check|My Favorite|Learn Something New)\"" "src/data/weeks/week_${WEEK}_real.js" | wc -l | tr -d ' ')
  if [ "$GENERIC_MISSIONS" -gt 0 ]; then
    echo "   ⚠️  WARNING: Found $GENERIC_MISSIONS generic mission titles (may need customization)"
  fi
fi

echo ""

# =================================================================
# CHECK 4: File Count - Must have exactly 14 station files
# =================================================================
echo "📁 [CHECK 4] Station File Count"
echo "   Expected: 14 .js files per mode (no sentence_builder)"
echo ""

ADV_FILE_COUNT=$(ls -1 "src/data/weeks/week_${WEEK}"/*.js 2>/dev/null | grep -v "index.js" | wc -l | tr -d ' ')
EASY_FILE_COUNT=$(ls -1 "src/data/weeks_easy/week_${WEEK}"/*.js 2>/dev/null | grep -v "index.js" | wc -l | tr -d ' ')

echo "   Advanced station files: $ADV_FILE_COUNT"
echo "   Easy station files: $EASY_FILE_COUNT"

if [ "$ADV_FILE_COUNT" -ne 14 ]; then
  echo "   ❌ FAIL: Advanced mode should have 14 station files (found $ADV_FILE_COUNT)"
  echo "   Files found:"
  ls "src/data/weeks/week_${WEEK}"/*.js | grep -v "index.js"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Advanced mode has 14 station files"
fi

if [ "$EASY_FILE_COUNT" -ne 14 ]; then
  echo "   ❌ FAIL: Easy mode should have 14 station files (found $EASY_FILE_COUNT)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Easy mode has 14 station files"
fi

echo ""

# =================================================================
# CHECK 5: Read.js Bold Words - Must have exactly 10
# =================================================================
echo "**️⃣ [CHECK 5] Read.js Bold Words (10 mandatory)"
echo ""

ADV_BOLD=$(grep -o '\*\*[^*]\+\*\*' "src/data/weeks/week_${WEEK}/read.js" | wc -l | tr -d ' ')
EASY_BOLD=$(grep -o '\*\*[^*]\+\*\*' "src/data/weeks_easy/week_${WEEK}/read.js" | wc -l | tr -d ' ')

echo "   Advanced bold words: $ADV_BOLD"
echo "   Easy bold words: $EASY_BOLD"

if [ "$ADV_BOLD" -ne 10 ]; then
  echo "   ❌ FAIL: Advanced read.js should have 10 bold words (found $ADV_BOLD)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Advanced mode has 10 bold words"
fi

if [ "$EASY_BOLD" -ne 10 ]; then
  echo "   ❌ FAIL: Easy read.js should have 10 bold words (found $EASY_BOLD)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Easy mode has 10 bold words"
fi

echo ""

# =================================================================
# SUMMARY
# =================================================================
echo "================================================"
if [ $ERRORS -eq 0 ]; then
  echo "✅ CONTENT QUALITY: ALL CHECKS PASSED"
  echo "================================================"
  exit 0
else
  echo "❌ CONTENT QUALITY: $ERRORS ERROR(S) FOUND"
  echo "================================================"
  echo ""
  echo "💡 Common fixes:"
  echo "   1. Daily Watch: Add 5 real YouTube URLs per mode"
  echo "   2. Sentence Builder: Delete file + remove from index.js"
  echo "   3. AI Tutor: Update week_id, title, and mission themes"
  echo "   4. Bold Words: Ensure exactly 10 **words** in read.js"
  exit 1
fi
