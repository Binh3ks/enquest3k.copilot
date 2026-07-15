#!/bin/bash
# Validation script to check week data structure compliance with gold standard

WEEK=$1
MODE=${2:-"advanced"}  # advanced or easy

if [ -z "$WEEK" ]; then
  echo "Usage: ./validate_week_structure.sh <WEEK_NUMBER> [mode]"
  echo "Example: ./validate_week_structure.sh 1 advanced"
  exit 1
fi

WEEK_PADDED=$(printf "%02d" $WEEK)
if [ "$MODE" = "easy" ]; then
  BASE_PATH="src/data/weeks_easy/week_$WEEK_PADDED"
else
  BASE_PATH="src/data/weeks/week_$WEEK_PADDED"
fi

echo "=========================================="
echo "VALIDATING WEEK $WEEK ($MODE mode)"
echo "Path: $BASE_PATH"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check if week directory exists
if [ ! -d "$BASE_PATH" ]; then
  echo -e "${RED}✗ Week directory not found: $BASE_PATH${NC}"
  exit 1
fi

echo "## FILE STRUCTURE"
echo "-------------------"

# Check required files (14 stations + index.js)
REQUIRED_FILES=(
  "read.js"
  "explore.js"
  "vocab.js"
  "word_power.js"
  "grammar.js"
  "logic.js"
  "ask_ai.js"
  "dictation.js"
  "shadowing.js"
  "mindmap.js"
  "daily_watch.js"
  "word_match.js"
  "writing.js"
  "index.js"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$BASE_PATH/$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (MISSING)"
    ((ERRORS++))
  fi
done

echo ""
echo "## CONTENT VALIDATION"
echo "----------------------"

# 1. Check read.js for 10 bold words
if [ -f "$BASE_PATH/read.js" ]; then
  BOLD_COUNT=$(grep -o '\*\*[^*]*\*\*' "$BASE_PATH/read.js" | wc -l | tr -d ' ')
  if [ "$BOLD_COUNT" -eq 10 ]; then
    echo -e "${GREEN}✓${NC} read.js: 10 bold words found"
  else
    echo -e "${RED}✗${NC} read.js: Found $BOLD_COUNT bold words (expected 10)"
    ((ERRORS++))
  fi
  
  # Check comprehension_questions
  if grep -q "comprehension_questions:" "$BASE_PATH/read.js"; then
    COMP_Q_COUNT=$(grep -o '"id":' "$BASE_PATH/read.js" | grep -A 10 "comprehension_questions:" | wc -l | tr -d ' ')
    if [ "$COMP_Q_COUNT" -ge 3 ]; then
      echo -e "${GREEN}✓${NC} read.js: comprehension_questions exists (${COMP_Q_COUNT} questions)"
    else
      echo -e "${YELLOW}⚠${NC} read.js: comprehension_questions has only ${COMP_Q_COUNT} questions (expected 3)"
      ((WARNINGS++))
    fi
  else
    echo -e "${RED}✗${NC} read.js: comprehension_questions NOT found"
    ((ERRORS++))
  fi
fi

# 2. Check explore.js for 10 bold words
if [ -f "$BASE_PATH/explore.js" ]; then
  BOLD_COUNT=$(grep -o '\*\*[^*]*\*\*' "$BASE_PATH/explore.js" | wc -l | tr -d ' ')
  if [ "$BOLD_COUNT" -eq 10 ]; then
    echo -e "${GREEN}✓${NC} explore.js: 10 bold words found"
  else
    echo -e "${RED}✗${NC} explore.js: Found $BOLD_COUNT bold words (expected 10)"
    ((ERRORS++))
  fi
  
  # Check check_questions
  if grep -q "check_questions:" "$BASE_PATH/explore.js"; then
    echo -e "${GREEN}✓${NC} explore.js: check_questions exists"
  else
    echo -e "${RED}✗${NC} explore.js: check_questions NOT found"
    ((ERRORS++))
  fi
  
  # Check open-ended question
  if grep -q "question:" "$BASE_PATH/explore.js" && grep -q "min_words:" "$BASE_PATH/explore.js"; then
    echo -e "${GREEN}✓${NC} explore.js: open-ended question exists"
  else
    echo -e "${RED}✗${NC} explore.js: open-ended question object NOT found"
    ((ERRORS++))
  fi
fi

# 3. Check vocab.js for 10 items
if [ -f "$BASE_PATH/vocab.js" ]; then
  VOCAB_COUNT=$(grep -c '"word":' "$BASE_PATH/vocab.js" | tr -d ' ')
  if [ "$VOCAB_COUNT" -eq 10 ]; then
    echo -e "${GREEN}✓${NC} vocab.js: 10 words"
  else
    echo -e "${RED}✗${NC} vocab.js: Found $VOCAB_COUNT words (expected 10)"
    ((ERRORS++))
  fi
fi

# 4. Check word_power.js for 3 items (Phase 1)
if [ -f "$BASE_PATH/word_power.js" ]; then
  WP_COUNT=$(grep -c '"word":' "$BASE_PATH/word_power.js" | tr -d ' ')
  if [ "$WP_COUNT" -eq 3 ]; then
    echo -e "${GREEN}✓${NC} word_power.js: 3 words (Phase 1)"
  elif [ "$WP_COUNT" -eq 5 ]; then
    echo -e "${GREEN}✓${NC} word_power.js: 5 words (Phase 2)"
  elif [ "$WP_COUNT" -eq 7 ]; then
    echo -e "${GREEN}✓${NC} word_power.js: 7 words (Phase 3)"
  else
    echo -e "${YELLOW}⚠${NC} word_power.js: Found $WP_COUNT words (expected 3/5/7)"
    ((WARNINGS++))
  fi
fi

# 5. Check grammar.js for 20 exercises
if [ -f "$BASE_PATH/grammar.js" ]; then
  GRAMMAR_COUNT=$(grep -c '"id":' "$BASE_PATH/grammar.js" | tr -d ' ')
  if [ "$GRAMMAR_COUNT" -ge 20 ]; then
    echo -e "${GREEN}✓${NC} grammar.js: ${GRAMMAR_COUNT} exercises (≥20)"
  else
    echo -e "${RED}✗${NC} grammar.js: Found $GRAMMAR_COUNT exercises (expected 20)"
    ((ERRORS++))
  fi
fi

# 6. Check logic.js for 5 puzzles with rich context
if [ -f "$BASE_PATH/logic.js" ]; then
  LOGIC_COUNT=$(grep -c '"id":' "$BASE_PATH/logic.js" | tr -d ' ')
  if [ "$LOGIC_COUNT" -ge 5 ]; then
    echo -e "${GREEN}✓${NC} logic.js: ${LOGIC_COUNT} puzzles (≥5)"
  else
    echo -e "${RED}✗${NC} logic.js: Found $LOGIC_COUNT puzzles (expected 5+)"
    ((ERRORS++))
  fi
  
  # Check for rich context (30-50 words per question)
  # Simplified check: look for character names (Tom, Mary, etc.)
  if grep -q -E "Tom|Mary|John|Sarah|Alex" "$BASE_PATH/logic.js"; then
    echo -e "${GREEN}✓${NC} logic.js: Contains character names (likely has rich context)"
  else
    echo -e "${YELLOW}⚠${NC} logic.js: No character names found - may lack rich context"
    ((WARNINGS++))
  fi
fi

# 7. Check ask_ai.js for 5 prompts with scenarios
if [ -f "$BASE_PATH/ask_ai.js" ]; then
  ASK_AI_COUNT=$(grep -c '"id":' "$BASE_PATH/ask_ai.js" | tr -d ' ')
  if [ "$ASK_AI_COUNT" -ge 5 ]; then
    echo -e "${GREEN}✓${NC} ask_ai.js: ${ASK_AI_COUNT} prompts (≥5)"
  else
    echo -e "${RED}✗${NC} ask_ai.js: Found $ASK_AI_COUNT prompts (expected 5)"
    ((ERRORS++))
  fi
  
  # Check for context_en field
  if grep -q "context_en:" "$BASE_PATH/ask_ai.js"; then
    echo -e "${GREEN}✓${NC} ask_ai.js: Contains context_en (scenarios)"
  else
    echo -e "${YELLOW}⚠${NC} ask_ai.js: May lack rich scenarios (no context_en field)"
    ((WARNINGS++))
  fi
fi

# 8. Check dictation.js for 8 sentences
if [ -f "$BASE_PATH/dictation.js" ]; then
  DICT_COUNT=$(grep -c '"text":' "$BASE_PATH/dictation.js" | tr -d ' ')
  if [ "$DICT_COUNT" -eq 8 ]; then
    echo -e "${GREEN}✓${NC} dictation.js: 8 sentences"
  else
    echo -e "${YELLOW}⚠${NC} dictation.js: Found $DICT_COUNT sentences (expected 8)"
    ((WARNINGS++))
  fi
fi

# 9. Check shadowing.js for 8 sentences (SAME as dictation)
if [ -f "$BASE_PATH/shadowing.js" ]; then
  SHADOW_COUNT=$(grep -c '"text":' "$BASE_PATH/shadowing.js" | tr -d ' ')
  if [ "$SHADOW_COUNT" -eq 8 ]; then
    echo -e "${GREEN}✓${NC} shadowing.js: 8 sentences"
  else
    echo -e "${YELLOW}⚠${NC} shadowing.js: Found $SHADOW_COUNT sentences (expected 8)"
    ((WARNINGS++))
  fi
fi

# 10. Check mindmap.js for nested object structure
if [ -f "$BASE_PATH/mindmap.js" ]; then
  # Check for centerStems array
  if grep -q "centerStems:" "$BASE_PATH/mindmap.js"; then
    STEM_COUNT=$(grep -o '"[^"]*"' "$BASE_PATH/mindmap.js" | grep -A 1 "centerStems:" | grep -c '"' | tr -d ' ')
    echo -e "${GREEN}✓${NC} mindmap.js: centerStems array exists"
  else
    echo -e "${RED}✗${NC} mindmap.js: centerStems NOT found"
    ((ERRORS++))
  fi
  
  # Check for nested object branchLabels (NOT flat array)
  if grep -A 5 "branchLabels:" "$BASE_PATH/mindmap.js" | grep -q '{'; then
    echo -e "${GREEN}✓${NC} mindmap.js: branchLabels is nested object (correct)"
  else
    echo -e "${RED}✗${NC} mindmap.js: branchLabels may be flat array (incorrect)"
    ((ERRORS++))
  fi
fi

# 11. Check daily_watch.js for EXACTLY 5 videos
if [ -f "$BASE_PATH/daily_watch.js" ]; then
  VIDEO_COUNT=$(grep -c '"videoId":' "$BASE_PATH/daily_watch.js" | tr -d ' ')
  if [ "$VIDEO_COUNT" -eq 5 ]; then
    echo -e "${GREEN}✓${NC} daily_watch.js: EXACTLY 5 videos"
  else
    echo -e "${RED}✗${NC} daily_watch.js: Found $VIDEO_COUNT videos (MUST BE 5)"
    ((ERRORS++))
  fi
fi

echo ""
echo "## SUMMARY"
echo "----------"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed! Week $WEEK ($MODE) is valid.${NC}"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}⚠ $WARNINGS warnings found (non-critical)${NC}"
  exit 0
else
  echo -e "${RED}✗ $ERRORS errors found${NC}"
  echo -e "${YELLOW}⚠ $WARNINGS warnings found${NC}"
  exit 1
fi
