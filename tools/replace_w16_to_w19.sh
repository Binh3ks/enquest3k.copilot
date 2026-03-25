#!/bin/bash
# W19 Mass Replacement Script - Replace ALL W16 references with W19 content
# Must be run from project root

set -e

echo "═══════════════════════════════════════════════════════════"
echo "W19 MASS REPLACEMENT - W16 → W19"
echo "═══════════════════════════════════════════════════════════"
echo ""

# W16 → W19 Mappings
declare -A REPLACEMENTS=(
  # Week number
  ["week16"]="week19"
  ["Week 16"]="Week 19"
  ["week_16"]="week_19"
  
  # Theme
  ["My First Soccer Game"]="When I Was Small"
  ["Sports Commentary"]="When I Was Small" 
  ["The Science of Sports"]="Growing Up"
  
  # Grammar
  ["Present Continuous"]="Was/Were (Past)"
  ["I am playing"]="I was small"
  ["I am + verb-ing"]="I/He/She/It was + adjective"
  ["You/We/They are + verb-ing"]="You/We/They were + adjective"
  ["He/She/It is + verb-ing"]="Use 'was/were' for the past"
  
  # Main vocab (10 words)
  ["kick"]="baby"
  ["throw"]="cute"
  ["catch"]="little"
  ["run"]="noisy"
  ["jump"]="quiet"
  ["score"]="kindergarten"
  ["team"]="grow"
  ["goal"]="past"
  ["energy"]="young"
  ["motion"]="small"
  
  # Secondary vocab
  ["pass"]="was"
  ["hit"]="were"
  ["cheer"]="before"
  ["ball"]="photo"
  ["field"]="album"
  
  # Image/Audio paths
  ["/images/week16"]="/images/week19"
  ["/audio/week16"]="/audio/week19"
  ["/images/week16_easy"]="/images/week19_easy"
  ["/audio/week16_easy"]="/audio/week19_easy"
)

# Files to process
ADV_DIR="src/data/weeks/week_19"
EASY_DIR="src/data/weeks_easy/week_19"

FILES=(
  "vocab.js"
  "grammar.js"
  "read.js"
  "dictation.js"
  "shadowing.js"
  "word_match.js"
  "word_power.js"
  "writing.js"
  "ask_ai.js"
  "explore.js"
  "mindmap.js"
  "games.js"
  "logic_science.js"
  "singapore_math.js"
  "daily_watch.js"
  "index.js"
)

echo "Step 1: Replacing in Advanced Mode..."
for file in "${FILES[@]}"; do
  if [ -f "$ADV_DIR/$file" ]; then
    echo "  Processing: $file"
    for key in "${!REPLACEMENTS[@]}"; do
      sed -i '' "s/$key/${REPLACEMENTS[$key]}/g" "$ADV_DIR/$file" 2>/dev/null || true
    done
  fi
done

echo ""
echo "Step 2: Replacing in Easy Mode..."
for file in "${FILES[@]}"; do
  if [ -f "$EASY_DIR/$file" ]; then
    echo "  Processing: $file"
    for key in "${!REPLACEMENTS[@]}"; do
      sed -i '' "s/$key/${REPLACEMENTS[$key]}/g" "$EASY_DIR/$file" 2>/dev/null || true
    done
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ REPLACEMENT COMPLETE"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Next: Manually customize content for W19 theme"
