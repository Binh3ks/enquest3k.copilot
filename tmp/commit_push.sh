#!/bin/bash
cd /Users/binhnguyen/projects/Engquest3k

echo "=== Staging files ==="
git add \
  src/components/common/HoverWord.jsx \
  src/data/dictionary.json \
  src/data/weeks/metadata.js \
  src/data/weeks/week_36/grammar.js \
  src/data/weeks/week_36/index.js \
  src/data/weeks/week_36_real.js

echo "=== Committing ==="
git commit -m "fix(w36): reading station display + dictionary lookup + data fixes

- HoverWord.jsx: auto-dictionary lookup when entry prop not passed
  (fixes 'Chưa có trong từ điển' for all bold chunks across all weeks)
- dictionary.json: add 10 W36 key vocabulary entries
- week_36/index.js: fix comment 'Environmental Issues' → 'Adventure Stories'
- week_36/grammar.js: fix typo 'TOOKE' → 'took'
- metadata.js: register W36 in weekTitles
- week_36_real.js: add knowledge_base array

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "=== Pushing ==="
git push

echo "=== Done ==="
