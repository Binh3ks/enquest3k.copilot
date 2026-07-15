# Shadowing Module: Video Transcript Sync - Root Cause Analysis & Solutions

**Date:** 2026-07-01  
**Status:** Investigation Complete  
**Priority:** High

---

## 🔍 Problem Statement

1. **Video stops and starts unexpectedly** during playback
2. **Transcript doesn't sync with voice** — sentences don't advance in sync with YouTube playback
3. **Inline karaoke (LeftPanel)** doesn't highlight words correctly
4. **RightPanel** doesn't auto-scroll to current sentence

---

## 🐛 Root Cause Analysis

### Problem 1: Video Stop/Start (Flickering)

**Root Cause:** Race condition between `player.stop()` calls and transcript mode toggling.

**Location:** [`Shadowing.jsx`](src/modules/shadowing/Shadowing.jsx:424-439)

```javascript
const handlePlayAll = useCallback(() => {
  const hasTranscript = !!videoTranscript && getCleanedTranscriptSentences(data?.videoId).length > 0;
  const willUseTranscript = data?.videoId && hasTranscript;

  // Toggle: kill TTS, switch modes
  if (data?.videoId && hasTranscript && !useTranscriptSource) {
    setUseTranscriptSource(true);
    player.stop();  // ← KILLS video if already playing!
  } else if (willUseTranscript) {
    player.stop();
  }
  
  // Then seeks video...
  if (willUseTranscript && ytPlayer && effectiveScript.length > 0) {
    seekPlayback(effectiveScript[0].id);
  }
}, [...]);
```

**Issue:** When `useTranscriptSource` is already `true` and user clicks Play, `player.stop()` is called, which triggers:
- `pauseVideo()` → `ytPlayerRef.current.pauseVideo()`
- This pauses the YouTube player mid-stream

**Secondary Issue:** [`handleToggleTranscriptSource()`](src/modules/shadowing/Shadowing.jsx:448-466) also calls `player.stop()` unconditionally:
```javascript
if (useTranscriptSource) {
  player.stop();  // ← Stops video when switching to TTS
  setUseTranscriptSource(false);
} else {
  player.stop();  // ← Stops video when switching to video
}
```

### Problem 2: Transcript Not Syncing with Voice

**Root Cause:** Multiple competing sync mechanisms with different polling intervals.

**Sync Mechanism 1:** [`useShadowingVideoSync.js`](src/hooks/useShadowingVideoSync.js:88-100) — 250ms interval
```javascript
// Runs every 250ms to find current segment
const currentVideoSegmentId = useMemo(() => {
  const seg = effectiveScript.find(s =>
    t >= s.start && t < s.start + s.duration
  );
  return seg?.id ?? null;
}, [...]);
```

**Sync Mechanism 2:** [`useShadowingVideoSync.js`](src/hooks/useShadowingVideoSync.js:108-187) — Second 250ms interval
```javascript
// Separate 250ms interval for word-level + wait mode
const interval = setInterval(() => {
  const t = ytPlayer.getCurrentTime();
  // Find active sentence...
  if (best && best.id !== lastActiveId) {
    setSelectedId(best.id);  // ← Update highlighted sentence
  }
}, 250);
```

**Issue:** Both intervals run simultaneously, potentially calling `setSelectedId()` at different times, causing:
- Duplicate state updates
- Potential for missed transitions if video seeks past a segment
- 250ms delay in sentence highlighting (user perceives as "not synced")

### Problem 3: Inline Karaoke Word Highlighting Broken

**Root Cause:** [`useWordHighlight.js`](src/modules/shadowing/useWordHighlight.js:71-161) only runs when `videoPopupOpen === true`:

```javascript
export function useWordHighlight(ytPlayer, videoPopupOpen, useTranscriptSource, ...) {
  useEffect(() => {
    if (!videoPopupOpen || !ytPlayer || !useTranscriptSource) {  // ← BUG!
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
      return;
    }
    // Word highlighting only happens here
  }, [ytPlayer, videoPopupOpen, useTranscriptSource, ...]);
}
```

**Issue:** `videoPopupOpen` defaults to `false`. Even when `videoInline === true`, karaoke highlighting is **disabled**.

### Problem 4: RightPanel Auto-Scroll Not Working

**Root Cause:** The `activeId` computation in [`Shadowing.jsx`](src/modules/shadowing/Shadowing.jsx:152-154):

```javascript
const activeId = useTranscriptSource
  ? (selectedId || player.activeSentenceId)  // ← selectedId drives highlight
  : (player.activeSentenceId || selectedId);  // ← Different priority
```

**Issue:** In transcript mode, `selectedId` should be updated by `useShadowingVideoSync`, but the sync hook's dependency array is incomplete:
```javascript
// useShadowingVideoSync.js:100
}, [currentVideoSegmentId]);
// Missing: effectiveScript, useTranscriptSource, setSelectedId
```

---

## 🛠️ Proposed Solutions

### Fix 1: Prevent Video Stop During Transcript Mode

**File:** [`src/modules/shadowing/Shadowing.jsx`](src/modules/shadowing/Shadowing.jsx)

```javascript
const handlePlayAll = useCallback(() => {
  const hasTranscript = !!videoTranscript && getCleanedTranscriptSentences(data?.videoId).length > 0;
  const willUseTranscript = data?.videoId && hasTranscript;

  // Only stop TTS if not already in transcript mode with video playing
  if (!useTranscriptSource || !ytPlayer) {
    player.stop();  // Only stop TTS, not video
  }
  
  // Enable transcript mode if needed (without stopping video)
  if (data?.videoId && hasTranscript && !useTranscriptSource) {
    setUseTranscriptSource(true);
  }
  
  // Play from beginning
  if (willUseTranscript && ytPlayer && effectiveScript.length > 0) {
    seekPlayback(effectiveScript[0].id);
    setSelectedId(effectiveScript[0].id);
  } else {
    player.playAll(effectiveScript);
  }
}, [player, effectiveScript, useTranscriptSource, ytPlayer, videoTranscript, data?.videoId]);
```

### Fix 2: Add Inline Video Detection for Karaoke

**File:** [`src/modules/shadowing/useWordHighlight.js`](src/modules/shadowing/useWordHighlight.js)

```javascript
export function useWordHighlight(ytPlayer, videoPopupOpen, videoInline, videoId, useTranscriptSource, ...) {
  // Karaoke should work when video is visible (popup OR inline)
  const isVideoVisible = videoPopupOpen || (videoInline && !!videoId && !!ytPlayer);
  
  useEffect(() => {
    if (!isVideoVisible || !ytPlayer || !useTranscriptSource) {
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
      return;
    }
    // ...
  }, [ytPlayer, isVideoVisible, useTranscriptSource, ...]);
}
```

**Then update `Shadowing.jsx` to pass the new props:**
```javascript
const { currentWordIdx, currentTime: wordTime, words: highlightWords } = useWordHighlight(
  youTube.ytPlayer,
  videoSync.videoActive,  // Already computed as: videoPopupOpen || (videoInline && !!videoId)
  videoInline,
  data?.videoId,
  useTranscriptSource,
  activeSentenceForHighlight,
  player.speed,
);
```

### Fix 3: Consolidate Sync Intervals

**File:** [`src/hooks/useShadowingVideoSync.js`](src/hooks/useShadowingVideoSync.js)

Merge the two 250ms intervals into one:

```javascript
useEffect(() => {
  if (!videoActive || !ytPlayer || !useTranscriptSource) return;
  
  let lastActiveId = null;
  let pausedAtEnd = -1;
  
  const interval = setInterval(() => {
    const t = ytPlayer.getCurrentTime();
    if (typeof t !== 'number') return;
    const script = effectiveScriptRef.current;
    
    // 1. Find current segment (for RightPanel highlight)
    let best = null;
    let bestStart = -Infinity;
    for (const s of script) {
      const win = getSpeechWindow(s);
      if (win.start <= t + 0.1 && win.end > t - 0.1) {
        if (win.start > bestStart) {
          best = s;
          bestStart = win.start;
        }
      }
    }
    
    // Update highlight only on transition
    if (best && best.id !== lastActiveId && !getChallengeActive()) {
      lastActiveId = best.id;
      setSelectedId(best.id);
    }
    
    // 2. Wait-mode auto-pause (separate concern, keep in same interval)
    if (best && pausedAtEnd !== best.id) {
      // ... wait mode logic
    }
  }, 100);  // ← Faster interval for smoother sync (100ms vs 250ms)
  
  return () => clearInterval(interval);
}, [videoActive, ytPlayer, useTranscriptSource, settingsWaitMode]);
```

### Fix 4: Fix Dependency Arrays

**File:** [`src/hooks/useShadowingVideoSync.js`](src/hooks/useShadowingVideoSync.js:100)

```javascript
}, [currentVideoSegmentId, effectiveScript, useTranscriptSource, setSelectedId, settingsWaitMode]);
```

**File:** [`src/hooks/useShadowingYouTubeBridge.js`](src/hooks/useShadowingYouTubeBridge.js:52)

```javascript
if (playerApi?.setPlaybackRate) {
  try { playerApi.setPlaybackRate(snapToSupportedRate(player.speed)); } catch { /* not ready */ }
}
```

---

## 📋 Implementation Order

1. **Fix 2** (Inline karaoke) — Most visible improvement
2. **Fix 3** (Consolidate intervals) — Core sync fix
3. **Fix 1** (Prevent video stop) — Stop flickering
4. **Fix 4** (Dependencies) — Stability improvements

---

## 🧪 Testing Checklist

- [ ] Play video → LeftPanel karaoke highlights words in sync with voice
- [ ] RightPanel auto-scrolls to current sentence as video plays
- [ ] No video stop/start when clicking Play in transcript mode
- [ ] Toggle between TTS and Video mode doesn't interrupt playback
- [ ] Speed changes (0.75x, 1.0x, 1.25x) don't break sync
- [ ] Wait-mode pauses work correctly

---

## 📁 Files to Modify

| File | Change |
|------|--------|
| `src/modules/shadowing/Shadowing.jsx` | Fix `handlePlayAll`, `handleToggleTranscriptSource`, pass new props |
| `src/modules/shadowing/useWordHighlight.js` | Accept `videoInline` and `videoId` params |
| `src/hooks/useShadowingVideoSync.js` | Merge intervals, fix deps |
| `src/hooks/useShadowingYouTubeBridge.js` | Fix speed sync |
