#!/bin/bash
# =================================================================
# VALIDATE_DUAL_MODE.SH - Advanced vs Easy Mode Differentiation
# Purpose: Verify that Easy and Advanced modes are properly differentiated
# =================================================================

WEEK=$1

if [ -z "$WEEK" ]; then
  echo "❌ Usage: $0 <week_number>"
  echo "   Example: $0 12"
  exit 1
fi

echo "================================================"
echo "🔄 DUAL-MODE VALIDATION - WEEK $WEEK"
echo "================================================"
echo ""

ERRORS=0
WARNINGS=0

# =================================================================
# CHECK 1: Bold Words MUST BE IDENTICAL (same 10 words)
# =================================================================
echo "**️⃣ [CHECK 1] Bold Words - Must Match Between Modes"
echo "   Rule: Easy and Advanced must teach SAME 10 vocab words"
echo ""

# Extract bold words from both modes
grep -o '\*\*[^*]\+\*\*' "src/data/weeks/week_${WEEK}/read.js" | sed 's/\*\*//g' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_adv_bold.txt
grep -o '\*\*[^*]\+\*\*' "src/data/weeks_easy/week_${WEEK}/read.js" | sed 's/\*\*//g' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_easy_bold.txt

# Compare
DIFF_BOLD=$(diff /tmp/week${WEEK}_adv_bold.txt /tmp/week${WEEK}_easy_bold.txt 2>&1)

if [ -z "$DIFF_BOLD" ]; then
  echo "   ✅ PASS: Bold words match between modes"
  echo "   Words:"
  cat /tmp/week${WEEK}_adv_bold.txt | tr '\n' ', ' | sed 's/,$//'
  echo ""
else
  echo "   ❌ FAIL: Bold words differ between modes"
  echo ""
  echo "   Advanced bold words:"
  cat /tmp/week${WEEK}_adv_bold.txt
  echo ""
  echo "   Easy bold words:"
  cat /tmp/week${WEEK}_easy_bold.txt
  echo ""
  echo "   Differences:"
  diff /tmp/week${WEEK}_adv_bold.txt /tmp/week${WEEK}_easy_bold.txt
  ERRORS=$((ERRORS + 1))
fi

echo ""

# =================================================================
# CHECK 2: Sentence Counts (Advanced MUST be more than Easy)
# =================================================================
echo "📊 [CHECK 2] Sentence Counts - Advanced > Easy"
echo "   Rule: Advanced read.js should have more sentences than Easy"
echo ""

ADV_SENTENCES=$(grep -o 'text:' "src/data/weeks/week_${WEEK}/dictation.js" 2>/dev/null | wc -l | tr -d ' ')
EASY_SENTENCES=$(grep -o 'text:' "src/data/weeks_easy/week_${WEEK}/dictation.js" 2>/dev/null | wc -l | tr -d ' ')

# If dictation.js doesn't use 'text:', try counting from read.js
if [ "$ADV_SENTENCES" -eq 0 ]; then
  ADV_SENTENCES=$(grep -o '\. ' "src/data/weeks/week_${WEEK}/read.js" | wc -l | tr -d ' ')
fi
if [ "$EASY_SENTENCES" -eq 0 ]; then
  EASY_SENTENCES=$(grep -o '\. ' "src/data/weeks_easy/week_${WEEK}/read.js" | wc -l | tr -d ' ')
fi

echo "   Advanced sentences: $ADV_SENTENCES"
echo "   Easy sentences: $EASY_SENTENCES"

if [ "$ADV_SENTENCES" -le "$EASY_SENTENCES" ]; then
  echo "   ❌ FAIL: Advanced ($ADV_SENTENCES) should have MORE sentences than Easy ($EASY_SENTENCES)"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Advanced has more sentences than Easy"
fi

# Expected counts for Phase 1
if [ "$ADV_SENTENCES" -lt 12 ] || [ "$ADV_SENTENCES" -gt 16 ]; then
  echo "   ⚠️  WARNING: Advanced sentence count ($ADV_SENTENCES) outside typical range 12-16 for Phase 1"
  WARNINGS=$((WARNINGS + 1))
fi

if [ "$EASY_SENTENCES" -lt 8 ] || [ "$EASY_SENTENCES" -gt 12 ]; then
  echo "   ⚠️  WARNING: Easy sentence count ($EASY_SENTENCES) outside typical range 8-12 for Phase 1"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""

# =================================================================
# CHECK 3: Context Differentiation (Personal vs Global)
# =================================================================
echo "🌍 [CHECK 3] Context Style - Easy (Personal) vs Advanced (Global)"
echo "   Rule: Easy uses 'I/my/we', Advanced uses third-person/global context"
echo ""

# Check for first-person pronouns in Easy mode
EASY_FIRST_PERSON=$(grep -E -i '(^|[^a-z])(I am|my |I have|I can|we can|I like)' "src/data/weeks_easy/week_${WEEK}/read.js" | wc -l | tr -d ' ')
ADV_FIRST_PERSON=$(grep -E -i '(^|[^a-z])(I am|my |I have|I can|we can|I like)' "src/data/weeks/week_${WEEK}/read.js" | wc -l | tr -d ' ')

echo "   Easy mode first-person usage: $EASY_FIRST_PERSON instances"
echo "   Advanced mode first-person usage: $ADV_FIRST_PERSON instances"

if [ "$EASY_FIRST_PERSON" -gt "$ADV_FIRST_PERSON" ]; then
  echo "   ✅ PASS: Easy mode uses more first-person context (personal)"
elif [ "$EASY_FIRST_PERSON" -eq 0 ] && [ "$ADV_FIRST_PERSON" -eq 0 ]; then
  echo "   ⚠️  WARNING: Neither mode uses first-person - check context differentiation manually"
  WARNINGS=$((WARNINGS + 1))
else
  echo "   ⚠️  WARNING: Advanced mode has more/equal first-person than Easy - context may not be differentiated"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""

# =================================================================
# CHECK 4: Grammar Complexity (Simple vs Complex)
# =================================================================
echo "📝 [CHECK 4] Grammar Complexity - Easy (Simple) vs Advanced (Complex)"
echo "   Rule: Easy uses simple sentences, Advanced uses complex structures"
echo ""

# Check for complex grammar markers in Advanced
ADV_COMPLEX=$(grep -E -i '(because|although|which|that|who|was built|is made|can be)' "src/data/weeks/week_${WEEK}/read.js" | wc -l | tr -d ' ')
EASY_COMPLEX=$(grep -E -i '(because|although|which|that|who|was built|is made|can be)' "src/data/weeks_easy/week_${WEEK}/read.js" | wc -l | tr -d ' ')

echo "   Advanced complex grammar markers: $ADV_COMPLEX"
echo "   Easy complex grammar markers: $EASY_COMPLEX"

if [ "$ADV_COMPLEX" -gt "$EASY_COMPLEX" ]; then
  echo "   ✅ PASS: Advanced uses more complex grammar than Easy"
elif [ "$ADV_COMPLEX" -eq "$EASY_COMPLEX" ]; then
  echo "   ⚠️  WARNING: Grammar complexity appears similar - review manually"
  WARNINGS=$((WARNINGS + 1))
else
  echo "   ⚠️  WARNING: Easy mode has more complex grammar - this may be incorrect"
  WARNINGS=$((WARNINGS + 1))
fi

echo ""

# =================================================================
# CHECK 5: Vocab.js Words Match
# =================================================================
echo "📚 [CHECK 5] Vocab.js Words - Must Match Between Modes"
echo "   Rule: Same 10 words in both vocab.js files"
echo ""

# Extract word field from vocab.js
grep 'word:' "src/data/weeks/week_${WEEK}/vocab.js" | sed 's/.*word: *"\([^"]*\)".*/\1/' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_adv_vocab.txt
grep 'word:' "src/data/weeks_easy/week_${WEEK}/vocab.js" | sed 's/.*word: *"\([^"]*\)".*/\1/' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_easy_vocab.txt

DIFF_VOCAB=$(diff /tmp/week${WEEK}_adv_vocab.txt /tmp/week${WEEK}_easy_vocab.txt 2>&1)

if [ -z "$DIFF_VOCAB" ]; then
  echo "   ✅ PASS: Vocab words match between modes"
else
  echo "   ❌ FAIL: Vocab words differ between modes"
  echo ""
  echo "   Differences:"
  diff /tmp/week${WEEK}_adv_vocab.txt /tmp/week${WEEK}_easy_vocab.txt
  ERRORS=$((ERRORS + 1))
fi

echo ""

# =================================================================
# CHECK 6: Image Paths (Different folders for each mode)
# =================================================================
echo "🖼️  [CHECK 6] Image Paths - Must Use Correct Folders"
echo "   Rule: Advanced uses /images/week${WEEK}/, Easy uses /images/week${WEEK}_easy/"
echo ""

ADV_WRONG_PATH=$(grep -E "images/week${WEEK}_easy/" "src/data/weeks/week_${WEEK}"/*.js 2>/dev/null | wc -l | tr -d ' ')
EASY_WRONG_PATH=$(grep -E "images/week${WEEK}/" "src/data/weeks_easy/week_${WEEK}"/*.js 2>/dev/null | grep -v "_easy/" | wc -l | tr -d ' ')

if [ "$ADV_WRONG_PATH" -gt 0 ]; then
  echo "   ❌ FAIL: Advanced mode has $ADV_WRONG_PATH references to _easy image folder"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Advanced mode uses correct image folder"
fi

if [ "$EASY_WRONG_PATH" -gt 0 ]; then
  echo "   ❌ FAIL: Easy mode has $EASY_WRONG_PATH references to non-_easy image folder"
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ PASS: Easy mode uses correct image folder"
fi

echo ""

# =================================================================
# SUMMARY
# =================================================================
echo "================================================"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo "✅ DUAL-MODE: ALL CHECKS PASSED"
  echo "================================================"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo "⚠️  DUAL-MODE: PASSED WITH $WARNINGS WARNING(S)"
  echo "================================================"
  echo ""
  echo "💡 Review warnings manually to ensure proper differentiation"
  exit 0
else
  echo "❌ DUAL-MODE: $ERRORS ERROR(S), $WARNINGS WARNING(S)"
  echo "================================================"
  echo ""
  echo "💡 Common fixes:"
  echo "   1. Bold Words: Ensure SAME 10 words in both modes"
  echo "   2. Sentence Count: Advanced should have 12-16, Easy should have 8-12 (Phase 1)"
  echo "   3. Context: Easy uses 'I/my/we', Advanced uses third-person"
  echo "   4. Grammar: Easy uses simple sentences, Advanced uses complex structures"
  echo "   5. Image Paths: Check /images/week${WEEK}/ vs /images/week${WEEK}_easy/"
  exit 1
fi
