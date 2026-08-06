#!/bin/bash
cd /Users/binhnguyen/projects/Engquest3k
DIR="src/data/video_transcripts_by_id/sentences"

echo "========== COMMAND 1: JSON validity + structure check + issues =========="
total=0; json_fail=0; issues_count=0; words_count=0; dups_count=0
for f in "$DIR"/*.json; do
  total=$((total+1))
  vid=$(basename "$f" .json)
  # Check JSON validity and extract info
  info=$(jq -r '
    if .segments == null then "0|clean|EMPTY_SEGMENTS"
    else
      (.segments | length) as $cnt |
      ([.segments[] | select(.words != null)] | length) as $wordsegs |
      (if $wordsegs > 0 then "WORDS" else "clean" end) as $flag |
      # Check issues
      [
        .segments | to_entries[] |
        select(.value.text == null or (.value.text | length == 0)) |
        "seg\(.key):EMPTY"
      ] as $empty_issues |
      [
        .segments | to_entries[] |
        select((.value.text // "" | split(" ") | length) <= 2 and (.value.text // "" | length > 0) and (.value.text // "" | test("[!?.]$") | not)) |
        "seg\(.key):\(.value.text | split(" ") | length)w"
      ] as $short_issues |
      [
        .segments | to_entries[] |
        select(.key > 0 and .value.start == 0) |
        "seg\(.key):start0"
      ] as $start0_issues |
      [
        .segments | to_entries[] |
        select(.value.duration != null and .value.duration > 30) |
        "seg\(.key):dur\(.value.duration)s"
      ] as $dur_issues |
      ($empty_issues + $short_issues + $start0_issues + $dur_issues) as $all_issues |
      $cnt as $count |
      $flag as $flag |
      $all_issues as $issues |
      # Duplicates
      [
        .segments | [.[].text // "" | gsub("^\\s+|\\s+$";"")] as $texts |
        range($texts | length) as $i |
        range($i+1; $texts | length) as $j |
        select($texts[$i] == $texts[$j] and $texts[$i] != "") |
        "seg\($i)+\($j)"
      ] as $dups |
      "\($count)|\($flag)|\(($issues | length) > 0 ? "ISSUES" : "OK")|\(($issues | join(";")))|\(($dups | join(";")))"
    end
  ' "$f" 2>/dev/null)

  if [ $? -ne 0 ] || [ -z "$info" ]; then
    json_fail=$((json_fail+1))
    echo -e "${vid}\t0\tJSON_FAIL\tFAIL\tJSON_ERROR"
  else
    count=$(echo "$info" | cut -d'|' -f1)
    flag=$(echo "$info" | cut -d'|' -f2)
    status=$(echo "$info" | cut -d'|' -f3)
    issues=$(echo "$info" | cut -d'|' -f4)
    dups=$(echo "$info" | cut -d'|' -f5)

    if [ "$flag" = "WORDS" ]; then words_count=$((words_count+1)); fi
    if [ "$status" = "ISSUES" ]; then issues_count=$((issues_count+1)); fi
    if [ -n "$dups" ]; then dups_count=$((dups_count+1)); fi

    parts="${vid}\t${count}\t${flag}\t${status}"
    [ -n "$issues" ] && parts="${parts}\tISSUES:${issues}"
    [ -n "$dups" ] && parts="${parts}\tDUPS:${dups}"
    echo -e "$parts"
  fi
done
echo "---TOTALS: files=${total} json_fail=${json_fail} issues=${issues_count} words=${words_count} dups=${dups_count}"

echo ""
echo "========== COMMAND 2: Cross-reference orphans and missing =========="
# Collect referenced videoIds from shadowing.js files
referenced_ids=""
file_map=""
for d in src/data/weeks/week_*/ src/data/weeks_easy/week_*/; do
  sf="${d}shadowing.js"
  if [ -f "$sf" ]; then
    matches=$(grep -oE "videoId\s*:\s*['\"]([A-Za-z0-9_-]+)['\"]" "$sf" | grep -oE "['\"][A-Za-z0-9_-]+['\"]" | tr -d "'\"")
    for vid in $matches; do
      referenced_ids="${referenced_ids}${vid}\n"
      file_map="${file_map}${vid}|${sf}\n"
    done
  fi
done
referenced_ids=$(echo -e "$referenced_ids" | sort -u | grep -v '^$')
file_map=$(echo -e "$file_map" | sort -u)

# Get transcript file basenames
transcript_files=""
for f in "$DIR"/*.json; do
  bn=$(basename "$f" .json)
  transcript_files="${transcript_files}${bn}\n"
done
transcript_files=$(echo -e "$transcript_files" | sort -u | grep -v '^$')

# Find orphans (in transcripts but not referenced)
orphans=$(comm -23 <(echo "$transcript_files") <(echo "$referenced_ids"))
echo "ORPHANS:"
echo "$orphans" | while read -r oid; do
  [ -n "$oid" ] && echo "  ${oid}.json"
done
orphan_count=$(echo "$orphans" | grep -c '[^ ]' || echo 0)
echo "Total orphans: ${orphan_count}"

# Find missing (referenced but no transcript file)
missing=$(comm -13 <(echo "$transcript_files") <(echo "$referenced_ids"))
echo "MISSING:"
echo "$missing" | while read -r mid; do
  [ -n "$mid" ] && refs=$(echo "$file_map" | grep "^${mid}|" | cut -d'|' -f2 | tr '\n' ', ' | sed 's/,$//') && echo "  ${mid} (by: ${refs})"
done
missing_count=$(echo "$missing" | grep -c '[^ ]' || echo 0)
echo "Total missing: ${missing_count}"

ref_count=$(echo "$referenced_ids" | grep -c '[^ ]' || echo 0)
tf_count=$(echo "$transcript_files" | grep -c '[^ ]' || echo 0)
echo "Referenced: ${ref_count}, Transcript files: ${tf_count}"

echo ""
echo "========== COMMAND 3: Segment count outliers =========="
for f in "$DIR"/*.json; do
  count=$(jq '.segments | length // 0' "$f" 2>/dev/null)
  if [ -n "$count" ] && [ "$count" -lt 5 ] 2>/dev/null; then
    echo "OUTLIER: $(basename "$f") has ${count} segments"
  elif [ -n "$count" ] && [ "$count" -gt 50 ] 2>/dev/null; then
    echo "OUTLIER: $(basename "$f") has ${count} segments"
  fi
done
echo "--- outlier check done ---"
