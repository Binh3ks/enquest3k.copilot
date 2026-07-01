# Shadowing Video Sync — Session Summary
**Date:** 2026-07-01
**Commits:** `7932904b`, `f8fe6039`

---

## Bug 1: Inline Play button fails after toggling video transcript mode

### Symptom
After toggling to video transcript mode, clicking the inline Play button did nothing. Console showed repeated "player not ready yet" from `useVideoPlayback.js`.

### Root Cause
`seekPlayback` (Shadowing.jsx) captured `ytPlayer` React state in its `useCallback` closure. At mount time, `ytPlayer` is `null`. When YouTube fires `onReady` and sets `ytPlayerRef.current`, the stale `seekPlayback` callback never updated — it kept seeing `null`.

Secondary: A separate `useVideoPlayback` hook also used `ytPlayer` state prop instead of the ref, compounding the issue.

### Fix
1. **`Shadowing.jsx` — `seekPlayback`:** Changed `if (useTranscriptSource && ytPlayer)` → `if (useTranscriptSource && ytPlayerRef.current)`. Read `ytPlayerRef.current` inside the function body so it always gets the live player object.
2. **`Shadowing.jsx` — `handlePlayOne`:** Now calls `seekPlayback(sentenceId)` directly instead of going through `videoPlayback` hook.
3. **`Shadowing.jsx` — `handlePlayAll`:** Uses `seekPlayback()` + `setSelectedId()` directly.
4. **`useShadowingPlayPause.js` — case 4:** Matches V11 backup pattern: calls `seekPlayback(activeId)` directly. Removed `videoPlayback` prop entirely.
5. **Removed `useVideoPlayback` hook** from Shadowing.jsx (functionality duplicate of `seekPlayback`).

---

## Bug 2: Karaoke highlighting slower than video playback speed

### Symptom
At 0.75x playback speed, karaoke word highlights lagged behind the actual audio.

### Root Cause
`getSpeechWindow()` computed word highlight windows using raw ASR timestamps without accounting for playback rate. At slower speeds, YouTube `getCurrentTime()` advances more slowly, but the highlight window was computed at raw speed.

### Fix
1. **`useWordHighlight.js` — `getSpeechWindow(sentence, speed=1)`:** Added `speed` param. Duration scaled: `dur = (wordDur * wordCount) / speed`.
2. **`useWordHighlight.js` — `splitWordsWithTiming(sentence, speed)`:** Passes `speed` through.
3. **`useShadowingVideoSync.js`:** Added `speed` param to both `getSpeechWindow()` calls and dep array.
4. **`Shadowing.jsx`:** Passed `speed: player.speed` to `useShadowingVideoSync`.
5. **Updated comment** at top of `getSpeechWindow` — YouTube DOES scale `getCurrentTime()` by playback rate (old comment was wrong).

---

## Files Changed

| File | Commit | Change |
|------|--------|--------|
| `src/modules/shadowing/useWordHighlight.js` | `7932904b` | Speed param + videoActive |
| `src/hooks/useShadowingVideoSync.js` | `7932904b` | Speed param + faster 100ms interval |
| `src/modules/shadowing/Shadowing.jsx` | `7932904b` + `f8fe6039` | seekPlayback ref fix + remove videoPlayback |
| `src/hooks/useShadowingPlayPause.js` | `f8fe6039` | case 4 rewrite + remove videoPlayback |

---

## Deployment

- **Commit `f8fe6039`** pushed to `main` and deployed to Railway (`6d6e7812` SUCCESS).
- Railway service: `heartfelt-mindfulness` at `https://heartfelt-mindfulness-production-40ff.up.railway.app/`

---

## Backup Sources Used

- `SNAPSHOT_W1-W35_Shadowing_V9_Sync speed.zip` — used for reference
- `SNAPSHOT_W1-W35_Shadowing_V11.zip` — source of correct `seekPlayback` pattern
