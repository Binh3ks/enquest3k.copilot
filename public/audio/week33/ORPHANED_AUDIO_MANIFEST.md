# W33 Listening Part 1 — Orphaned Audio Files

## Status: ORPHANED (NOT referenced at runtime)

**Files:**
- `listening_p1_target1.mp3`
- `listening_p1_target2.mp3`
- `listening_p1_target3.mp3`
- `listening_p1_target4.mp3`
- `listening_p1_target5.mp3`

## Why These Files Are Orphaned

The W33 L1 runtime component (`SVGLineMatcher.jsx`) plays audio via:

```js
const fullListeningScript = customData?.passage_audio_script || ...;
// Played via VoiceService.speak() — live TTS, not pre-generated files
```

`SVGLineMatcher.jsx` does **NOT** reference `listening_p1_target*.mp3`. These files are
never fetched or played by any component in the current runtime.

## Content Errors (if ever used)

These files contain incorrect character names relative to authoritative W33 data:

| File | Audio says | listening_hub.js says | Status |
|------|-----------|----------------------|--------|
| target1.mp3 | Jake | Jake | ✅ Correct |
| target2.mp3 | Tom | Tom | ✅ Correct |
| target3.mp3 | Nurse Clara | Nurse Sarah | ❌ Wrong name |
| target4.mp3 | Mr. Davis | Headmaster Brown | ❌ Wrong name |
| target5.mp3 | Emma (female) | Cleaner Bob (male) | ❌ Wrong name + gender |

## Action

- These files are **preserved but not regenerated**.
- If future development adds per-character audio playback to `SVGLineMatcher.jsx`,
  these files must be regenerated from `listening_hub.js` `names[]` as the source of truth.
- The generation script `regenerate_w33_listening_audio.mjs` documents this explicitly.

## Audit Date
2026-08-27 — W33 Audio Forensic Audit (DEF-002)
