#!/usr/bin/env bash
RAW="${RAW:-/Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/g1i_raw}"
step="$1"; shift
out="$RAW/${step}.txt"
{ echo "### STEP: $step"; echo "### CMD: $*"; echo "### CWD: $(pwd)"; echo "### GIT_HEAD: $(git rev-parse HEAD 2>/dev/null)";
  echo "### START_UTC: $(date -u +%FT%TZ)"; echo "### ----- OUTPUT -----"; } > "$out"
"$@" >> "$out" 2>&1; code=$?
{ echo "### ----- END -----"; echo "### EXIT: $code"; echo "### END_UTC: $(date -u +%FT%TZ)"; } >> "$out"
shasum -a 256 "$out" >> "$RAW/INDEX.sha256"; exit $code
