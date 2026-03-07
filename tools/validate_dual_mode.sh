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
# CHECK 1: Bold Words Count (10 per mode, CAN be different)
# =================================================================
echo "**️⃣ [CHECK 1] Bold Words - Count Check"
echo "   Rule: Each mode must have 10 bold words (words CAN differ by level)"
echo "   Blueprint: Easy=Tier 1, Advanced=Tier 2/3"
echo ""

# Extract bold words from both modes
grep -o '\*\*[^*]\+\*\*' "src/data/weeks/week_${WEEK}/read.js" | sed 's/\*\*//g' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_adv_bold.txt
grep -o '\*\*[^*]\+\*\*' "src/data/weeks_easy/week_${WEEK}/read.js" | sed 's/\*\*//g' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_easy_bold.txt

ADV_BOLD_COUNT=$(wc -l < /tmp/week${WEEK}_adv_bold.txt | tr -d ' ')
EASY_BOLD_COUNT=$(wc -l < /tmp/week${WEEK}_easy_bold.txt | tr -d ' ')

echo "   Advanced bold words ($ADV_BOLD_COUNT):"
cat /tmp/week${WEEK}_adv_bold.txt | tr '\n' ', ' | sed 's/,$//'
echo ""
echo ""
echo "   Easy bold words ($EASY_BOLD_COUNT):"
cat /tmp/week${WEEK}_easy_bold.txt | tr '\n' ', ' | sed 's/,$//'
echo ""

if [ "$ADV_BOLD_COUNT" -eq 10 ] && [ "$EASY_BOLD_COUNT" -eq 10 ]; then
  echo "   ✅ PASS: Both modes have 10 bold words"
else
  echo "   ❌ FAIL: Expected 10 bold words per mode"
  echo "   Advanced: $ADV_BOLD_COUNT, Easy: $EASY_BOLD_COUNT"
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
# CHECK 5: Vocab.js Tier Differentiation
# =================================================================
echo "📚 [CHECK 5] Vocab.js - Tier Level Differentiation"
echo "   Rule: Words SHOULD differ between modes (Easy=Tier 1, Advanced=Tier 2/3)"
echo "   Blueprint: Easy uses simple daily words, Advanced uses academic words"
echo ""

# Extract word field from vocab.js (only the word value, not audio paths)
grep 'word:' "src/data/weeks/week_${WEEK}/vocab.js" | sed 's/.*word: *"\([^"]*\)".*/\1/' | grep -v '^/audio' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_adv_vocab.txt
grep 'word:' "src/data/weeks_easy/week_${WEEK}/vocab.js" | sed 's/.*word: *"\([^"]*\)".*/\1/' | grep -v '^/audio' | tr '[:upper:]' '[:lower:]' | sort > /tmp/week${WEEK}_easy_vocab.txt

ADV_VOCAB_COUNT=$(wc -l < /tmp/week${WEEK}_adv_vocab.txt | tr -d ' ')
EASY_VOCAB_COUNT=$(wc -l < /tmp/week${WEEK}_easy_vocab.txt | tr -d ' ')

echo "   Advanced vocab ($ADV_VOCAB_COUNT): $(cat /tmp/week${WEEK}_adv_vocab.txt | tr '\n' ', ' | sed 's/,$//')"
echo "   Easy vocab ($EASY_VOCAB_COUNT): $(cat /tmp/week${WEEK}_easy_vocab.txt | tr '\n' ', ' | sed 's/,$//')"
echo ""

if [ "$ADV_VOCAB_COUNT" -eq 10 ] && [ "$EASY_VOCAB_COUNT" -eq 10 ]; then
  echo "   ✅ PASS: Both modes have 10 vocab words"
  
  # Check if words are identical (this is unusual but not necessarily wrong)
  SAME_WORDS=$(comm -12 /tmp/week${WEEK}_adv_vocab.txt /tmp/week${WEEK}_easy_vocab.txt | wc -l | tr -d ' ')
  if [ "$SAME_WORDS" -eq 10 ]; then
    echo "   ⚠️  WARNING: All vocab words are identical - check if differentiation is intended"
    echo "   Note: Blueprint recommends Easy=Tier 1, Advanced=Tier 2/3"
    WARNINGS=$((WARNINGS + 1))
  elif [ "$SAME_WORDS" -gt 5 ]; then
    echo "   ⚠️  INFO: $SAME_WORDS words overlap - this may be intentional for some weeks"
  else
    echo "   ✅ GOOD: Vocab properly differentiated by tier level"
  fi
else
  echo "   ❌ FAIL: Expected 10 vocab words per mode"
  echo "   Advanced: $ADV_VOCAB_COUNT, Easy: $EASY_VOCAB_COUNT"
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
  echo "   1. Bold Words: Ensure 10 words per mode (can differ by tier)"
  echo "   2. Vocab: Easy=Tier 1 (simple), Advanced=Tier 2/3 (academic)"
  echo "   3. Sentence Count: Advanced should have 12-16, Easy should have 8-12 (Phase 1)"
  echo "   4. Context: Easy uses 'I/my/we', Advanced uses third-person"
  echo "   5. Grammar: Easy uses simple sentences, Advanced uses complex structures"
  echo "   6. Image Paths: Check /images/week${WEEK}/ vs /images/week${WEEK}_easy/"
  exit 1
fi
