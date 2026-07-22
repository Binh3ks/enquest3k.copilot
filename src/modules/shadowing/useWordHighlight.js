// useWordHighlight.js — drives karaoke-style word highlighting from
// YouTube playback time. Returns { currentWordIdx, currentTime, words }.
//
// words: [{ word, start, end }] — evenly distributed across the active
//   sentence's [start, start+duration] window.
// currentTime: latest ytPlayer.getCurrentTime() reading (updates ~10x/s).
// currentWordIdx: index of the word being spoken, or -1 if none.
//
// YouTube IFrame API getCurrentTime() returns VIDEO TIME, which advances
// at the playback rate (1 wall-clock second = 1/speed video-seconds when
// rate=speed). The highlight window is also in video time, so no scaling
// is needed at any playback rate — dividing by speed would actually
// over-stretch the window at slow rates and make karaoke LAG behind audio.
//
// activeSentence is mirrored via ref so this effect does NOT re-mount on
// every parent render (the parent's effectiveScript.find(...) returns a new
// wrapper object every render, which would otherwise destroy/recreate the
// 100ms poll interval before it could ever fire).

import { useState, useEffect, useRef } from 'react';

// Compute the speech window for a sentence: [start, end) where the actual
// speech happens. ASR captions pad each segment with pre/post silence
// (e.g. "I don't know." 4.84s total for what is really ~1.5s of actual
// speech). If we used the raw duration for per-word pacing, the highlight
// would "lag" the audio — the user sees the fill still painting "I" while
// the voice has already moved to "know".
//
// The fix: ignore raw per-word duration entirely. Use a fixed FAST_RATE
// of 0.4s per word for ALL sentences. This means the highlight always
// advances at 2.5 words/sec (normal ESL speech rate) regardless of what
// the ASR says. The window [start, start+FAST_RATE*words] is SHORTER
// than the audio's full duration — the highlight now LEADS the audio,
// which the user reported as the desired "snappy" behaviour. Audio plays
// out to its full ASR duration (or real end of audio); the highlight
// just finishes first.
//
// For very long or unusual sentences this means the highlight ends
// before the audio (e.g. 5-word sentence = 2.0s highlight window vs
// ~4s audio). The "no highlight" period is brief (2s) and signals to
// the user that the next sentence is coming.
//
// YouTube IFrame API getCurrentTime() returns VIDEO TIME (not real-time),
// so both the window and the cursor live in the same time domain — no
// scaling is needed at any playback rate.
export function getSpeechWindow(sentence) {
  if (!sentence) return { start: 0, end: 0, dur: 0 };
  const start = sentence.start || 0;
  const text = sentence.text || '';
  const wordCount = (text.match(/[A-Za-z']+/g) || []).length;
  if (wordCount === 0) return { start, end: start, dur: 0 };
  const FAST_RATE = 0.4;   // 2.5 words/sec — fixed for all sentences
  const dur = FAST_RATE * wordCount;
  return { start, end: start + dur, dur };
}

export function splitWordsWithTiming(sentence) {
  if (!sentence) return [];
  // Use real L3 timestamps if available in the sentence data (forced alignment)
  if (sentence.words && sentence.words.length > 0) {
    return sentence.words.map(w => ({
      word: w.word,
      start: w.start,
      end: w.end,
    }));
  }
  // Fallback: synthetic evenly-distributed timing (no L3 data available)
  const text = sentence.text || '';
  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];

  const win = getSpeechWindow(sentence);
  if (win.dur <= 0) return [];
  const wordDur = win.dur / words.length;
  return words.map((w, i) => ({
    word: w,
    start: win.start + i * wordDur,
    end: win.start + (i + 1) * wordDur,
  }));
}

export function useWordHighlight(ytPlayer, videoActive, useTranscriptSource, activeSentence) {
  const [state, setState] = useState({ currentWordIdx: -1, currentTime: 0, words: [] });

  // Mirror activeSentence via ref — `.find()` returns the same underlying
  // segment object across renders, but Shadowing.jsx rebuilds the wrapper
  // array each render. Reading through the ref keeps the poll interval stable.
  const sentenceRef = useRef(activeSentence);
  useEffect(() => { sentenceRef.current = activeSentence; }, [activeSentence]);

  useEffect(() => {
    if (!videoActive || !ytPlayer || !useTranscriptSource) {
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
      return;
    }

    let lastIdx = -2;
    let lastLogT = 0;
    // Use requestAnimationFrame instead of setInterval(50) so the karaoke
    // fill bar updates 60×/sec instead of 20×/sec. At 1.0x playback with
    // a 0.96s word, that drops the visible fill step from ~5% per tick to
    // ~1.7% per tick — smooth at any speed, no jumpy "painting each
    // character" feel. rAF also self-throttles when the tab is hidden.
    let rafId = null;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      // Schedule the NEXT frame first — so early returns below don't kill
      // the loop. The setInterval version didn't have this problem because
      // the browser re-fires the interval automatically; rAF has no such
      // guarantee. (Lesson from commit 42f9ce9d.)
      rafId = requestAnimationFrame(tick);
      const sentence = sentenceRef.current;
      if (!sentence) return;

      const words = splitWordsWithTiming(sentence);
      if (!words.length) {
        setState({ currentWordIdx: -1, currentTime: 0, words: [] });
        return;
      }

      const t = ytPlayer.getCurrentTime();
      if (typeof t !== 'number') return;

      // Find active word: same matching as sync useEffect — word whose
      // [start, end] window contains t. Newest in-progress wins on overlap.
      let idx = -1;
      let found = false;
      let bestStart = -Infinity;
      for (let i = 0; i < words.length; i++) {
        if (words[i].start <= t + 0.1 && words[i].end > t - 0.1) {
          if (words[i].start > bestStart) {
            idx = i;
            bestStart = words[i].start;
            found = true;
          }
        }
      }
      // After the last word ends (and before next seekPlayback fires), clear
      // the highlight. Without this the fallback would pin idx=words.length-1
      // indefinitely, flooding console and showing a stale "100% fill" word.
      if (!found && t > words[words.length - 1].end + 0.1) {
        idx = -1;
      } else if (!found) {
        // Mid-gap between words (rare with 0.1s tolerance but possible): pin
        // to last-started word so the highlight doesn't flicker to -1.
        for (let i = 0; i < words.length; i++) {
          if (words[i].start <= t + 0.1) {
            idx = i;
          }
        }
      }

      // DEBUG (Jun 26): log every 0.5s with full word timing info. DEV-only —
      // production logs flooded the console while the highlight was pinned to
      // the last word during the inter-segment gap (now fixed above).
      if (import.meta.env.DEV && t - lastLogT >= 0.5) {
        lastLogT = t;
        const w = idx >= 0 ? words[idx] : null;
        const fill = w && w.end > w.start ? Math.min(100, Math.max(0, ((t - w.start) / (w.end - w.start)) * 100)).toFixed(1) : 'n/a';
        console.log(
          `[WORD_DEBUG] t=${t.toFixed(2)} idx=${idx}/${words.length-1} ` +
          `word="${w?.word}" wordStart=${w?.start?.toFixed(2)} wordEnd=${w?.end?.toFixed(2)} ` +
          `fill=${fill}% ` +
          `words=[${words.map((x,i) => `${i}:"${x.word}"[${x.start.toFixed(2)}-${x.end.toFixed(2)}]`).join(' ')}]`
        );
      }

      // Update idx only on transition (avoids unnecessary re-renders), but
      // always update currentTime so the karaoke underline can grow smoothly.
      setState(prev => {
        const nextIdx = idx !== lastIdx ? idx : prev.currentWordIdx;
        if (idx !== lastIdx) lastIdx = idx;
        if (nextIdx === prev.currentWordIdx && prev.words === words && t === prev.currentTime) {
          return prev;
        }
        return { currentWordIdx: nextIdx, currentTime: t, words };
      });
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
      };
    }, [ytPlayer, videoActive, useTranscriptSource]);

  return state;
}
