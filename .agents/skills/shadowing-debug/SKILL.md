---
name: shadowing-debug
description: Debugs bugs in the EngQuest3K Shadowing station (audio playback, karaoke highlight, challenge mode, transcript sync, pause/resume). Use when the user reports a shadowing bug, playback issue, or highlight problem. Loads the 19-rule bug knowledge base on invocation.
---

# Shadowing Station Debugging Guide

Diagnose bugs in the Shadowing station using the known 19-rule knowledge base from past debugging sessions.

## Architecture overview

The Shadowing station is the most bug-prone subsystem. Its code lives across:

```
src/modules/shadowing/Shadowing.jsx     (main — 826 lines after Jul 1 refactor)
src/hooks/useShadowingPlayer.js         (TTS + YouTube sequence player — 4-state machine)
src/hooks/useShadowingChallenge.js      (record-score flow)
src/hooks/useShadowingYouTubeBridge.js  (YouTube IFrame lifecycle)
src/hooks/useShadowingVideoSync.js      (100ms segment-sync interval)
src/hooks/useShadowingPlayPause.js      (inline Play/Pause 4-case state machine)
src/modules/shadowing/LeftPanel.jsx     (settings + video card UI)
src/utils/AudioHelper.js               (speakText — 3-signal onEnd)
src/services/voiceService.js           (R2 audio + _currentAudio)
```

## Quick lookup: symptom → likely rule

| Symptom | Likely Rule | Key file |
|---|---|---|
| Pause doesn't stop audio | Rule 1 or 3 | voiceService.js, AudioHelper.js |
| Pause cancels all progress | Rule 4 or 6 | useShadowingPlayPause.js |
| Highlight lags 1 segment | Rule 16 | useShadowingVideoSync.js |
| Highlight frozen | Rule 17 or 18 | useWordHighlight.js, useShadowingVideoSync.js |
| Karaoke paints too slowly | Rule 19 | useWordHighlight.js |
| Click Play → gets YouTube instead of TTS | Rule 11 | Shadowing.jsx |
| Inline Play runs full script | Rule 12 | Shadowing.jsx handlePlayPause case 3 |
| Two audio sources play at once | Rule 12 | Shadowing.jsx handleToggleTranscriptSource |
| "Play" triggers Record All | Rule 7 | Shadowing.jsx (isRecording guard) |
| Transcript audio choppy ("ngắt quãng") | Rule 8 | Shadowing.jsx wait-mode block |
| Stop→Play rapid-fires onEnd | Rule 10 | AudioHelper.js speakText |
| Pause state lost after segment change | Rule 2 | useShadowingChallenge.js clearAllTimers |
| Highlight stops after prev/next click | Rule 18 | useWordHighlight.js tick |
| Corrections reappear after clear | Rule 15 | Corrections API /v2/ |
| Button flickers play→pause during recording | Rule 7 | LeftPanel.jsx isRecording |

## Debugging protocol

1. **Identify symptom** — match against the table above
2. **Read the matching rule** — the knowledge base is in:
   `~/.claude/projects/-Users-binhnguyen-projects-Engquest3k/memory/feedback_shadowing_playback_bugs.md`
   Use `grep -n "Rule <N>:" <file>` to jump to the relevant rule
3. **Read the specific file** — use offset/limit, not full dump
4. **Trace the data flow** — follow the state transitions described in the rule
5. **Apply the fix pattern** from the rule, don't improvise
6. **Build + verify** — `npm run build` must pass

## Critical invariants (never violate)

- `VoiceService._currentAudio` is the ONLY audio element for TTS pause/resume
- `useShadowingVideoSync` 100ms interval is the SINGLE source of truth for `setSelectedId`
- `useWordHighlight.js` `getSpeechWindow` uses fixed `FAST_RATE = 0.4` — never scale by playback rate
- Inline Play = single sentence; whole-script Play All = dedicated header button
- rAF reschedule at TOP of tick, never bottom
- Any new setTimeout/setInterval must be stored in a ref AND cleared in `clearAllTimers()`

## After fixing

1. Run `npm run build` — must pass
2. Check for TDZ risk: grep the changed file for `useCallback` deps that reference variables declared below
3. Run `tests/e2e/shadowing_playall_pause.cjs` if the fix touches the sequence player
