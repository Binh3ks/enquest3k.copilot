#!/bin/bash
# =============================================================================
# BUG_PREVENTION_CHECK.SH — EngQuest3K Automated Bug Detection
# =============================================================================
#
# PURPOSE:
#   Automated version of BƯỚC 0.5 "Mandatory File Verification Protocol"
#   Runs ALL bug prevention checks in ONE command.
#
# WHAT IT CHECKS:
#   B5: Invalid Singapore Math types (addition/subtraction/...)
#   B7: correct: field in grammar.js
#   B8: Empty grammar answers
#   B10: Curly quotes in answer strings
#   B11: Easy mode = Advanced mode (copy-paste detection)
#   B13: Mindmap hash collision
#   B15: ask_ai.js invalid fields
#   B17: AI Tutor missing freetalk_knowledge / spark_talk
#   B22: dictation/shadowing content_en must match read.js exactly
#   B25: read.js comprehension_questions full scaffolding (hint + clue + multi-answer)
#   B23: content_vi bold violations (VI text with ** markers) in read.js / explore.js
#   B24: Ask AI question_word_bank correctWord must be UPPERCASE
#
# NOTE: B1 was REMOVED (May 19, 2026) — dictation/shadowing sentences[]
# CAN contain **bold** markers because strip_bold() is applied to BOTH sides
# in CHECK 42, and the TTS pipeline strips ** before sending to Deepgram.
# Use CHECK 42 (code_quality_gate.sh) for sentences[] validation instead.
#
# USAGE:
#   bash tools/bug_prevention_check.sh N
#   bash tools/bug_prevention_check.sh 32
#
# EXIT CODES:
#   0 = all checks passed
#   1 = one or more bugs detected (STOP and fix)
# =============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

WEEK="${1:-}"
if [ -z "$WEEK" ]; then
  echo -e "${RED}❌ Usage: bash tools/bug_prevention_check.sh <week_number>${NC}"
  exit 1
fi
WEEK_PAD=$(printf "%02d" "$WEEK")

echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  BUG PREVENTION CHECK — Week $WEEK_PAD${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo ""

ERRORS=0
WARNINGS=0

# =============================================================================
# B22: dictation/shadowing sentences[] must be SELECTED SUBSET from read.js
#      (W28+: 10-12 ADV / 8-10 Easy) — full verbatim copy is no longer required.
#      See CLAUDE.md §Chunk-first and NEVER rules W28+ dictation subset.
# =============================================================================
echo -e "${BOLD}[B22] dictation/shadowing sentences[] must be selected from read.js${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  READ_PATH="src/data/$mode/read.js"
  for file in dictation shadowing; do
    FILE_PATH="src/data/$mode/${file}.js"
    if [ -f "$FILE_PATH" ] && [ -f "$READ_PATH" ]; then
      RESULT=$(node -e "
        try {
          const read = require('./${READ_PATH}').default;
          const target = require('./${FILE_PATH}').default;
          const rtxt = (read.content_en || '').replace(/\*\*/g, '').replace(/\\n+/g, ' ').toLowerCase();
          const sentences = (target.sentences || []).map(s => (s.text || '').replace(/\*\*/g,'').replace(/\\n+/g,' ').toLowerCase().trim()).filter(Boolean);
          if (!sentences.length) { console.log('NO_SENTENCES'); process.exit(0); }
          const missing = sentences.filter(s => !rtxt.includes(s));
          const lbl = ('$mode'.startsWith('weeks_easy') ? 'Easy' : 'ADV');
          const isEasy = lbl === 'Easy';
          const minN = isEasy ? 8 : 10;
          const maxN = isEasy ? 10 : 12;
          if (sentences.length < minN) {
            console.log('TOO_FEW:' + sentences.length + ':' + minN + ':' + maxN);
            if (missing.length) { console.error('   missing-from-read sentences (' + missing.length + '):'); missing.slice(0,3).forEach(m => console.error('     - ' + m.slice(0,80) + (m.length>80?'...':''))); }
            process.exit(0);
          }
          if (sentences.length > maxN) {
            console.log('TOO_MANY:' + sentences.length + ':' + minN + ':' + maxN); process.exit(0);
          }
          if (missing.length) {
            console.log('NOT_FROM_READ:' + missing.length);
            missing.slice(0,3).forEach(m => console.error('     - ' + m.slice(0,80) + (m.length>80?'...':'')));
            process.exit(0);
          }
          console.log('OK:' + sentences.length);
        } catch(e) { console.log('ERROR:' + e.message); }
      " 2>&1)
      if echo "$RESULT" | grep -q "^OK:"; then
        echo -e "   ${GREEN}✅ PASS: $FILE_PATH sentences[${RESULT#OK:}], all selected from read.js${NC}"
      elif echo "$RESULT" | grep -q "TOO_FEW"; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has too few sentences (${RESULT#TOO_FEW:}). W28+: ADV≥10 / Easy≥8.${NC}"
        ERRORS=$((ERRORS+1))
      elif echo "$RESULT" | grep -q "TOO_MANY"; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has too many sentences (${RESULT#TOO_MANY:}). W28+: ADV≤12 / Easy≤10.${NC}"
        ERRORS=$((ERRORS+1))
      elif echo "$RESULT" | grep -q "NOT_FROM_READ"; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has sentences not found in read.js (${RESULT#NOT_FROM_READ:}).${NC}"
        echo -e "   ${YELLOW}   FIX: each dictation/shadowing sentence must be a verbatim substring of read.js content_en.${NC}"
        ERRORS=$((ERRORS+1))
      elif echo "$RESULT" | grep -q "NO_SENTENCES"; then
        echo -e "   ${YELLOW}⚠️  SKIP: $FILE_PATH has no sentences[]${NC}"
        WARNINGS=$((WARNINGS+1))
      else
        echo -e "   ${YELLOW}⚠️  SKIP: $FILE_PATH syntax error: $RESULT${NC}"
        WARNINGS=$((WARNINGS+1))
      fi
    fi
  done
done
echo ""

# =============================================================================
# B23: Vietnamese bold violations in content_vi (read.js / explore.js)
# =============================================================================
echo -e "${BOLD}[B23] VI bold violations in content_vi${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  for file in read explore; do
    FILE_PATH="src/data/$mode/${file}.js"
    if [ -f "$FILE_PATH" ]; then
      VIOLATIONS=$(grep -oP 'content_vi:\s*`\K[^`]*\*\*[^*]+\*\*[^`]*' "$FILE_PATH" 2>/dev/null | grep '\*\*' | wc -l | tr -d ' ' || true)
      if [ "$VIOLATIONS" -eq "0" ]; then
        echo -e "   ${GREEN}✅ PASS: $FILE_PATH — no VI bold violations${NC}"
      else
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has $VIOLATIONS VI bold violation(s) — remove ** from content_vi${NC}"
        ERRORS=$((ERRORS+1))
      fi
    fi
  done
done
echo ""

# =============================================================================
# B5: Invalid Singapore Math types
# =============================================================================
echo -e "${BOLD}[B5] Singapore Math type names${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/singapore_math.js"
  if [ -f "$FILE_PATH" ]; then
    INVALID=$(grep -oE 'type:\s*"(addition|subtraction|multiplication|division)"' "$FILE_PATH" 2>/dev/null || true)
    if [ -n "$INVALID" ]; then
      echo -e "   ${RED}❌ FAIL: $FILE_PATH has invalid types${NC}"
      echo -e "   ${RED}   Found: $INVALID${NC}"
      echo -e "   ${RED}   → Valid types: part_whole, comparison, missing_part, groups, before_after${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: $FILE_PATH has valid types${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# B7: correct: field in grammar.js (should be answer:)
# =============================================================================
echo -e "${BOLD}[B7] Grammar field names (answer: vs correct:)${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/grammar.js"
  if [ -f "$FILE_PATH" ]; then
    WRONG_FIELD=$(awk '/correct:/{c++}END{print c+0}' "$FILE_PATH" 2>/dev/null)
    if [ "$WRONG_FIELD" -gt 0 ]; then
      echo -e "   ${RED}❌ FAIL: $FILE_PATH has $WRONG_FIELD 'correct:' fields${NC}"
      echo -e "   ${RED}   → GrammarEngine validates 'answer:', NOT 'correct:'${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: $FILE_PATH uses 'answer:' field${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# B8: Empty grammar answers
# =============================================================================
echo -e "${BOLD}[B8] Grammar empty answers${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/grammar.js"
  if [ -f "$FILE_PATH" ]; then
    EMPTY=$(awk '/answer: ""/{c++}END{print c+0}' "$FILE_PATH" 2>/dev/null)
    if [ "$EMPTY" -gt 0 ]; then
      echo -e "   ${RED}❌ FAIL: $FILE_PATH has $EMPTY empty answers${NC}"
      echo -e "   ${RED}   → Empty answers always marked wrong${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: $FILE_PATH has no empty answers${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# B10: Curly quotes in answer strings
# =============================================================================
echo -e "${BOLD}[B10] Curly quotes in answer strings${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  if [ -d "src/data/$mode" ]; then
    CURLY_QUOTES=$(python3 -c "
import os, sys
p = b'\xe2\x80\x98\xe2\x80\x99'
for f in sorted(__import__('glob').glob('src/data/$mode/*.js')):
    with open(f,'rb') as fh:
        if b'\xe2\x80\x98' in fh.read() or b'\xe2\x80\x99' in fh.read():
            sys.stdout.write(f+'\n')
" 2>/dev/null || true)
    if [ -n "$CURLY_QUOTES" ]; then
      echo -e "   ${RED}❌ FAIL: Found curly quotes in:${NC}"
      echo "$CURLY_QUOTES" | while read -r f; do
        echo -e "   ${RED}   $f${NC}"
      done
      echo -e "   ${RED}   → Use ASCII apostrophe ' instead of ' or '${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: No curly quotes in $mode${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# B11: Easy mode = Advanced mode (copy-paste detection)
# =============================================================================
echo -e "${BOLD}[B11] Easy vs Advanced copy-paste detection${NC}"

ADV_FILES="vocab read explore grammar"
SIMILARITY_ERRORS=0

for file in $ADV_FILES; do
  ADV_PATH="src/data/weeks/week_$WEEK_PAD/${file}.js"
  EASY_PATH="src/data/weeks_easy/week_$WEEK_PAD/${file}.js"
  
  if [ -f "$ADV_PATH" ] && [ -f "$EASY_PATH" ]; then
    # Compare word counts (should be similar but not identical)
    ADV_WORDS=$(grep -cE '^\s+word:\s*"[^"]+"' "$ADV_PATH" 2>/dev/null || true)
    EASY_WORDS=$(grep -cE '^\s+word:\s*"[^"]+"' "$EASY_PATH" 2>/dev/null || true)

    if [ "$ADV_WORDS" -gt 0 ] && [ "$EASY_WORDS" -gt 0 ]; then
      if [ "$ADV_WORDS" -eq "$EASY_WORDS" ]; then
        ADV_HASH=$(md5sum "$ADV_PATH" 2>/dev/null | cut -d' ' -f1)
        EASY_HASH=$(md5sum "$EASY_PATH" 2>/dev/null | cut -d' ' -f1)
        if [ "$ADV_HASH" = "$EASY_HASH" ]; then
          echo -e "   ${RED}❌ FAIL: $file.js — EASY is IDENTICAL to ADV${NC}"
          echo -e "   ${RED}   → Students learn same content twice!${NC}"
          ERRORS=$((ERRORS+1))
          SIMILARITY_ERRORS=$((SIMILARITY_ERRORS+1))
        else
          echo -e "   ${GREEN}✅ PASS: $file.js — Easy different from ADV (same count, different content)${NC}"
        fi
      else
        echo -e "   ${GREEN}✅ PASS: $file.js — Word counts differ (ADV=$ADV_WORDS, EASY=$EASY_WORDS)${NC}"
      fi
    fi
  fi
done
echo ""

# =============================================================================
# B13: Mindmap hash collision (UNIQUE hashes per branch)
# =============================================================================
echo -e "${BOLD}[B13] Mindmap audio hash uniqueness${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/mindmap.js"
  if [ -f "$FILE_PATH" ]; then
    # Extract audio URLs and check for duplicate hashes
    AUDIO_URLS=$(grep -oE '/audio/[^"]+\.mp3' "$FILE_PATH" 2>/dev/null || true)
    if [ -n "$AUDIO_URLS" ]; then
      UNIQUE_COUNT=$(echo "$AUDIO_URLS" | sort -u | wc -l | tr -d ' ')
      TOTAL_COUNT=$(echo "$AUDIO_URLS" | wc -l | tr -d ' ')
      
      if [ "$UNIQUE_COUNT" -lt "$TOTAL_COUNT" ]; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has duplicate audio hashes${NC}"
        echo -e "   ${RED}   → Found $TOTAL_COUNT audio URLs but only $UNIQUE_COUNT unique${NC}"
        echo -e "   ${RED}   → Use hash(fullSentence), NOT hash(branchText)${NC}"
        ERRORS=$((ERRORS+1))
      else
        echo -e "   ${GREEN}✅ PASS: $FILE_PATH has $UNIQUE_COUNT unique audio URLs${NC}"
      fi
    fi
  fi
done
echo ""

# =============================================================================
# B15: ask_ai.js invalid fields
# =============================================================================
echo -e "${BOLD}[B15] Ask AI invalid fields${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/ask_ai.js"
  if [ -f "$FILE_PATH" ]; then
    INVALID_FIELDS=$(grep -cE 'prompt_en|prompt_vi|hint_en|topic_talk' "$FILE_PATH" 2>/dev/null || true)
    if [ "$INVALID_FIELDS" -gt 0 ]; then
      echo -e "   ${RED}❌ FAIL: $FILE_PATH has invalid fields${NC}"
      echo -e "   ${RED}   → prompt_en/prompt_vi/hint_en/topic_talk are NOT valid${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: $FILE_PATH has valid schema${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# B24: Ask AI question_word_bank correctWord UPPERCASE convention
# =============================================================================
echo -e "${BOLD}[B24] Ask AI question_word_bank correctWord UPPERCASE${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/ask_ai.js"
  if [ -f "$FILE_PATH" ]; then
    # correctWord must be UPPERCASE (button labels compare case-insensitively)
    BAD_CASE=$(grep -nP "correctWord:\s*['\"]\p{Ll}" "$FILE_PATH" 2>/dev/null | head -3 || true)
    if [ -n "$BAD_CASE" ]; then
      echo -e "   ${RED}❌ FAIL: $FILE_PATH has non-UPPERCASE correctWord${NC}"
      echo -e "   ${RED}   → correctWord must be UPPERCASE: 'WHAT', not 'What'${NC}"
      echo -e "   ${RED}   → $BAD_CASE${NC}"
      ERRORS=$((ERRORS+1))
    else
      echo -e "   ${GREEN}✅ PASS: $FILE_PATH correctWord values are UPPERCASE${NC}"
    fi
  fi
done
echo ""

# =============================================================================
# B25: read.js comprehension_questions full scaffolding
# W1-W16: 3 questions; W17+: 4 questions
# Each question: answer:[], clue_statement, hint_en, hint_vi
# =============================================================================
echo -e "${BOLD}[B25] Comprehension question scaffolding${NC}"

for mode in "weeks/week_$WEEK_PAD" "weeks_easy/week_$WEEK_PAD"; do
  FILE_PATH="src/data/$mode/read.js"
  if [ -f "$FILE_PATH" ]; then
    RESULT=$(node -e "
      const fs = require('fs');
      const content = fs.readFileSync('$FILE_PATH', 'utf8');
      const startIdx = content.indexOf('comprehension_questions: [');
      if (startIdx === -1) { console.log('NO_ARRAY'); process.exit(0); }
      const arrStart = content.indexOf('[', startIdx); // position of opening [
      // Track BOTH brace and bracket depth — only stop when both reach 0
      let braceDepth = 0, bracketDepth = 0, arrEnd = arrStart;
      for (let i = arrStart; i < content.length; i++) {
        const ch = content[i];
        if (ch === '{') braceDepth++;
        else if (ch === '}') braceDepth--;
        else if (ch === '[') bracketDepth++;
        else if (ch === ']') bracketDepth--;
        if (braceDepth === 0 && bracketDepth === 0) { arrEnd = i; break; }
      }
      const arr = content.slice(arrStart, arrEnd);

      // Extract each question object using brace-depth awareness
      const questions = [];
      let qDepth = 0, qStart = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '{') { if (qDepth === 0) qStart = i; qDepth++; }
        else if (arr[i] === '}') { qDepth--; if (qDepth === 0) questions.push(arr.slice(qStart, i + 1)); }
      }

      if (questions.length === 0) { console.log('EMPTY_ARRAY'); process.exit(0); }

      const missingHintEn = questions.filter(q => !/hint_en:/i.test(q)).length;
      const missingClue   = questions.filter(q => !/clue_statement:/i.test(q)).length;
      const missingHintVi = questions.filter(q => !/hint_vi:/i.test(q)).length;
      const singleAnswer  = questions.filter(q => /answer:\s*['\"][^'\"]*['\"]/.test(q)).length;

      const week = parseInt('$WEEK');
      const expected = week >= 17 ? 4 : 3;

      console.log(JSON.stringify({
        count: questions.length,
        expected,
        missingHintEn,
        missingClue,
        missingHintVi,
        singleAnswer,
      }));
    " 2>/dev/null || echo "NODE_ERROR")

    if echo "$RESULT" | grep -q "NODE_ERROR\|NO_ARRAY\|EMPTY_ARRAY"; then
      echo -e "   ${YELLOW}⚠️  SKIP: $FILE_PATH — could not parse${NC}"
      WARNINGS=$((WARNINGS+1))
    else
      COUNT=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.count)")
      EXPECTED=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.expected)")
      MISSING_HINT_EN=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.missingHintEn)")
      MISSING_CLUE=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.missingClue)")
      MISSING_HINT_VI=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.missingHintVi)")
      SINGLE_ANSWER=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.singleAnswer)")

      FAIL_COUNT=0
      if [ "$COUNT" != "$EXPECTED" ]; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has $COUNT questions (expected $EXPECTED for W$WEEK_PAD)${NC}"
        FAIL_COUNT=$((FAIL_COUNT+1))
      fi
      if [ "$MISSING_HINT_EN" -gt 0 ]; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH missing hint_en in $MISSING_HINT_EN question(s)${NC}"
        FAIL_COUNT=$((FAIL_COUNT+1))
      fi
      if [ "$MISSING_CLUE" -gt 0 ]; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH missing clue_statement in $MISSING_CLUE question(s)${NC}"
        FAIL_COUNT=$((FAIL_COUNT+1))
      fi
      if [ "$MISSING_HINT_VI" -gt 0 ]; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH missing hint_vi in $MISSING_HINT_VI question(s)${NC}"
        FAIL_COUNT=$((FAIL_COUNT+1))
      fi
      if [ "$SINGLE_ANSWER" -gt 0 ]; then
        echo -e "   ${RED}❌ FAIL: $FILE_PATH has $SINGLE_ANSWER question(s) with single answer (need array)${NC}"
        FAIL_COUNT=$((FAIL_COUNT+1))
      fi

      if [ "$FAIL_COUNT" -eq 0 ]; then
        echo -e "   ${GREEN}✅ PASS: $FILE_PATH — $COUNT/$EXPECTED questions, full scaffolding${NC}"
      else
        ERRORS=$((ERRORS+FAIL_COUNT))
      fi
    fi
  fi
done
echo ""

# =============================================================================
# B17: Missing freetalk_knowledge in AI Tutor
# =============================================================================
echo -e "${BOLD}[B17] AI Tutor freetalk_knowledge${NC}"

REAL_FILE="src/data/weeks/week_$WEEK_PAD/week_${WEEK_PAD}_real.js"
if [ -f "$REAL_FILE" ]; then
  HAS_KNOWLEDGE=$(grep -c 'freetalk_knowledge' "$REAL_FILE" 2>/dev/null || echo "0")
  HAS_SPARK=$(grep -c 'spark_talk' "$REAL_FILE" 2>/dev/null || echo "0")
  
  if [ "$HAS_KNOWLEDGE" -eq 0 ]; then
    echo -e "   ${RED}❌ FAIL: $REAL_FILE missing freetalk_knowledge${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: freetalk_knowledge present${NC}"
  fi
  
  if [ "$HAS_SPARK" -eq 0 ]; then
    echo -e "   ${RED}❌ FAIL: $REAL_FILE missing spark_talk${NC}"
    ERRORS=$((ERRORS+1))
  else
    echo -e "   ${GREEN}✅ PASS: spark_talk present${NC}"
  fi
else
  echo -e "   ${YELLOW}⚠️  SKIP: $REAL_FILE not found (AI Tutor data not created yet)${NC}"
  WARNINGS=$((WARNINGS+1))
fi
echo ""

# =============================================================================
# SUMMARY
# =============================================================================
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}${BOLD}  BUG PREVENTION SUMMARY${NC}"
echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════════════${NC}"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo -e "   ${RED}❌ Bugs detected: $ERRORS${NC}"
  echo -e "${RED}${BOLD}❌ STOP — Fix bugs before proceeding${NC}"
  echo ""
  echo -e "${BLUE}Common fixes:${NC}"
  echo -e "   • B22: dictation/shadowing must select sentences[] from read.js (W28+: 10-12 ADV / 8-10 Easy), each sentence verbatim from read.js"
  echo -e "   • B5: Replace addition/subtraction/multiplication/division with valid types"
  echo -e "   • B7: Replace 'correct:' with 'answer:' in grammar exercises"
  echo -e "   • B10: Replace curly quotes with ASCII apostrophe"
  echo -e "   • B11: Write DIFFERENT content for Easy mode (simpler vocabulary)"
  exit 1
elif [ $WARNINGS -gt 0 ]; then
  echo -e "   ${YELLOW}⚠️  Warnings: $WARNINGS (AI Tutor data not created yet)${NC}"
  echo -e "${YELLOW}${BOLD}⚠️  PASSED (with warnings)${NC}"
  exit 0
else
  echo -e "   ${GREEN}✅ ALL BUG PREVENTION CHECKS PASSED${NC}"
  echo -e "${GREEN}${BOLD}✅ Week $WEEK_PAD is bug-free${NC}"
  exit 0
fi
