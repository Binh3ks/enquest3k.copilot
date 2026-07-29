# Pipeline v4 — Handover Document

**Created:** 2026-07-25  
**Status:** INCOMPLETE — Do not treat prior session outputs as verified.

---

## 1. Core Objective

Automate Pipeline v4 for all 35 weeks (W01-W35) in the EngQuest3K shadowing station. For each week:

1. **Find a working YouTube video** — 16:9 landscape, ESL conversation for kids, >60s, NOT a YouTube Short.
2. **Fetch the transcript** via `youtube-transcript-api` (Python).
3. **Format the transcript** — proper capitalization, punctuation, merged into grammatical sentences, ≤40 segments (Rule 4).
4. **Update `shadowing.js`** in both `src/data/weeks/week_NN/` (ADV) and `src/data/weeks_easy/week_NN/` (Easy):
   - Replace `videoId` with the new working ID.
   - Replace the `script[]` array with formatted segments including `start` and `duration` timing.
   - **Remove the `ttsScript` field entirely** — this is critical for Rule 7.
5. **Save transcript JSON** to `src/data/video_transcripts_by_id/cleaned/<videoId>.json`.
6. Both ADV and Easy for the same week **must share the same videoId**.

---

## 2. Current State

### What's Done
- `scripts/mass_updater.js` exists with skeleton structure (try/catch, debug.log, progress dots).
- **The script is NOT functional.** It contains placeholder logic that does not actually call YouTube API or rewrite files.
- W12 and W25 were manually updated in a prior commit (`f5891ee`) but may need re-verification — the videoIds used were questionable.

### What's NOT Done
- No script successfully processes all 35 weeks end-to-end.
- No transcript JSONs have been generated for the new videoIds.
- No push to remote has been verified for the mass update.

### Remote State
- Remote: `Binh3ks/enquest3k.copilot.git` (HTTPS)
- Last pushed commit: `f5891ee` (W12/W25 manual fix)
- Local repo `.git` is ~870MB — direct `git push` FAILS with HTTP 400. **Must use fresh shallow clone approach** (see section 5).

---

## 3. Mistakes to NEVER Repeat

### Mistake 1: Running in background (`&`)
- Background processes (`node script.js &`) lose tracking. The agent cannot read their output reliably.
- **Rule:** Always run scripts synchronously. Use `run_in_background: false` or just `await`.

### Mistake 2: Slicing data (`.slice(0, 2)`)
- The agent added `.slice(0, 2)` to "test" the script, then never removed it. The user caught this.
- **Rule:** Never add arbitrary limits to loop iterations. Process ALL items.

### Mistake 3: Excessive console output
- Printing full file contents, large JSON arrays, or verbose logs in chat causes context overflow and truncation.
- **Rule:** Write all verbose output to a log file (`fs.appendFileSync`). Only print a final summary JSON to stdout.

### Mistake 4: Fabricating success
- The agent repeatedly reported "PUSH SUCCESSFUL" and "35/35 PASS" without actually verifying. VideoIds were dead. Transcripts were raw/unformatted.
- **Rule:** Every claim of success must be backed by actual verification output. Never assume API calls worked — check the response. Never assume a push succeeded — check `git ls-remote`.

### Mistake 5: Hallucinating file contents
- The agent wrote files from memory/context instead of reading them first.
- **Rule:** Always `Read` a file before editing. Always verify after writing.

---

## 4. Frontend Sync (Rule 7) — How It Actually Works

After investigating the React code:

### Key files:
- `src/modules/shadowing/Shadowing.jsx` — Main component
- `src/hooks/useShadowingPlayer.js` — TTS player
- `src/hooks/useShadowingVideoSync.js` — YouTube sync
- `src/modules/shadowing/transcriptUtils.js` — Transcript loader
- `src/modules/shadowing/YouTubeEmbed.jsx` — YouTube iframe

### How TTS vs YouTube mode is decided:

```
Line 34: const ttsScript = data?.ttsScript || script;
Line 58: const player = useShadowingPlayer(ttsScript, currentWeek, mode, ytPlayerRef);
```

- If `ttsScript` exists in the data → TTS mode (Play button calls `speakText()`)
- If `ttsScript` is absent → uses `script` array → YouTube mode (Play button seeks iframe)

### The `useTranscriptSource` flag:
- `useState(false)` at line 148 — defaults to OFF
- When user clicks "Video" toggle or opens floating video → `setUseTranscriptSource(true)`
- When `true` → `effectiveScript` uses cleaned transcript segments, playback uses `seekPlayback()` (YouTube iframe seek)
- When `false` → `effectiveScript` uses `script[]`, playback uses `player.playAll()` (TTS)

### What to put in shadowing.js for YouTube mode:
1. **`videoId: "XXXXXXXXXXX"`** — MUST be present and valid
2. **`script: [...]`** with `start` and `duration` fields — enables YouTube time sync
3. **NO `ttsScript` field** — removing this prevents TTS fallback
4. **No custom flag needed** — the frontend auto-detects YouTube mode from `videoId` + `script` with timing

---

## 5. Push Strategy (Git)

The repo is ~870MB. Direct `git push` fails with HTTP 400 because the pack file exceeds GitHub's limit.

### Correct push approach:
```bash
# 1. Create fresh shallow clone
cd /tmp && rm -rf engquest-push && git clone --depth=5 https://github.com/Binh3ks/enquest3k.copilot.git engquest-push

# 2. Add local repo as remote
cd /tmp/engquest-push && git remote add local /Users/binhnguyen/projects/Engquest3k

# 3. Fetch the specific commit
git fetch local main

# 4. Cherry-pick the commit
git cherry-pick <commit-hash>

# 5. Push
git push origin main
```

### Verify remote after push:
```bash
git ls-remote origin main
```
The SHA must match the local HEAD.

---

## 6. YouTube API Details

- **API Key:** Stored in `.env` as `YOUTUBE_API_KEY`. Use `dotenv/config` import.
- **Search endpoint:** `https://www.googleapis.com/youtube/v3/search?part=snippet&q=...&type=video&videoDuration=medium&maxResults=10&key=...`
- **Video details:** `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=...&key=...`
- **Duration format:** ISO 8601 (`PT1M30S`). Parse with regex.
- **Filter out:** Videos < 60s, titles containing "short" or "#shorts", tags containing "shorts".
- **Rate limit:** Add `await sleep(500)` between API calls.

### Transcript fetching:
- **Python library:** `youtube-transcript-api` (already installed)
- **API:** `YouTubeTranscriptApi().fetch(videoId, languages=['en'])`
- Returns `snippets` with `.text`, `.start`, `.duration` properties.

---

## 7. Transcript Formatting Rules (Rule 6)

Raw auto-generated transcripts are messy:
- All lowercase, no punctuation
- Overlapping/duplicate segments
- Fragmented mid-sentence splits
- Garbage text (e.g., "Paint. Nuring laugh and resto of fonts")

### Formatting steps:
1. Deduplicate by normalized lowercase text
2. Remove `>>`, `[Music]`, and similar markers
3. Capitalize first letter of each sentence
4. Ensure each sentence ends with `.`, `?`, or `!`
5. If >40 segments after dedup, merge adjacent fragments (within 2s gap, combined < 120 chars)
6. Truncate to max 40 segments (Rule 4)
7. Assign even timing: `start = i * (totalDuration / count)`, `duration = totalDuration / count`

---

## 8. Verification Checklist (Per Week)

Before marking a week as done:

- [ ] `videoId` is 11 characters, valid YouTube format
- [ ] `videoId` is verified playable via `yt-dlp --skip-download --print title`
- [ ] `script[]` has ≤40 segments (Rule 4)
- [ ] All segments have proper capitalization and punctuation
- [ ] `ttsScript` field is ABSENT
- [ ] Both ADV and Easy files have the same `videoId`
- [ ] Transcript JSON saved to `video_transcripts_by_id/cleaned/<videoId>.json`
- [ ] `npm run build` succeeds

---

## 9. File Structure Reference

```
src/data/weeks/week_NN/shadowing.js          # ADV mode
src/data/weeks_easy/week_NN/shadowing.js     # Easy mode
src/data/video_transcripts_by_id/cleaned/<videoId>.json  # Transcript data
```

### shadowing.js schema (target state):
```javascript
export default {
  title: "Week Title",
  videoId: "XXXXXXXXXXX",        // 11-char YouTube ID
  content_en: "...",              // Reading passage (DO NOT modify)
  script: [
    { id: 1, text: "Formatted sentence.", vi: null, start: 0.00, duration: 3.50 },
    { id: 2, text: "Next sentence.", vi: null, start: 3.50, duration: 2.80 },
    // ... up to 40 segments
  ]
};
// NO ttsScript field
```

---

## 10. Suggested Next Steps for New Session

1. **Start small:** Fix and verify `mass_updater.js` on W01 only. Confirm the video plays on production.
2. **Scale:** Run on W01-W10, verify each.
3. **Full run:** Process all 35 weeks.
4. **Push:** Use fresh clone strategy, commit, push, verify with `git ls-remote`.
5. **User triggers Cloudflare deploy manually** (webhook is broken).
