// useWordHighlight.js — drives karaoke-style word highlighting from
// YouTube playback time. Returns { currentWordIdx, currentTime, words }.
//
// words: [{ word, start, end }] — evenly distributed across the active
//   sentence's [start, start+duration/speed] window.
// currentTime: latest ytPlayer.getCurrentTime() reading (updates ~10x/s).
// currentWordIdx: index of the word being spoken, or -1 if none.
//
// activeSentence is mirrored via ref so this effect does NOT re-mount on
// every parent render (the parent's effectiveScript.find(...) returns a new
// wrapper object every render, which would otherwise destroy/recreate the
// 100ms poll interval before it could ever fire).

import { useState, useEffect, useRef } from 'react';

function splitWordsWithTiming(sentence, speed) {
  if (!sentence) return [];
  const text = sentence.text || '';
  const start = sentence.start || 0;
  const rawDur = (sentence.duration || 0) / (speed || 1);
  if (rawDur <= 0) return [];

  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];

  // Use actual speech rate (~3 words/s = 0.33s/word) as the baseline.
  // Transcript durations are often inflated by [Music]/[Applause] segments
  // that mergeSegments accumulated into accEnd without contributing speech.
  // Trust rawDur only if it implies a per-word rate ≤ 0.7s (normal-to-fast
  // speech). Otherwise fall back to a realistic 0.4s/word rate.
  const SPEECH_RATE_PER_WORD = 0.4;  // 2.5 words/second
  const MAX_NORMAL_RATE = 0.7;
  const impliedRate = rawDur / words.length;
  const dur = (impliedRate > MAX_NORMAL_RATE)
    ? words.length * SPEECH_RATE_PER_WORD
    : rawDur;
  const wordDur = dur / words.length;

  return words.map((w, i) => ({
    word: w,
    start: start + i * wordDur,
    end: start + (i + 1) * wordDur,
  }));
}

export function useWordHighlight(ytPlayer, videoPopupOpen, useTranscriptSource, activeSentence, speed) {
  const [state, setState] = useState({ currentWordIdx: -1, currentTime: 0, words: [] });

  // Mirror activeSentence via ref — `.find()` returns the same underlying
  // segment object across renders, but Shadowing.jsx rebuilds the wrapper
  // array each render. Reading through the ref keeps the poll interval stable.
  const sentenceRef = useRef(activeSentence);
  useEffect(() => { sentenceRef.current = activeSentence; }, [activeSentence]);

  useEffect(() => {
    if (!videoPopupOpen || !ytPlayer || !useTranscriptSource) {
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
      return;
    }

    let lastIdx = -2;
    const interval = setInterval(() => {
      const sentence = sentenceRef.current;
      if (!sentence) return;

      const words = splitWordsWithTiming(sentence, speed);
      if (!words.length) {
        setState({ currentWordIdx: -1, currentTime: 0, words: [] });
        return;
      }

      const t = ytPlayer.getCurrentTime();
      if (typeof t !== 'number') return;

      let idx = -1;
      for (let i = 0; i < words.length; i++) {
        if (t >= words[i].start - 0.5 && t < words[i].end + 0.5) {
          idx = i;
          break;
        }
      }
      if (idx === -1 && t >= words[words.length - 1].end) idx = words.length - 1;
      if (idx === -1 && t < words[0].start) idx = 0;

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
    }, 100);

    return () => {
      clearInterval(interval);
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
    };
  }, [ytPlayer, videoPopupOpen, useTranscriptSource, speed]);

  return state;
}
