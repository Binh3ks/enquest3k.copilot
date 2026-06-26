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

// Compute the speech window for a sentence: [start, end) where the actual
// speech happens.  After the pipeline fix (each raw ASR segment = one
// sentence, [Music] segments filtered), rawDur is now accurate for ESL
// vocabulary videos where each word naturally takes 1-3 seconds (single
// words like "Bear." or short utterances like "Look." have durations
// that match the actual speech rate).
//
// Strategy:
//   - Trust rawDur by default. Only override at extremes.
//   - Cap per-word rate at MIN_RATE (0.25s) for unrealistically fast cases.
//   - Use 0.5s/word as fallback only if rawDur is wildly inflated
//     (>5s/word, indicating merged silence we missed).
export function getSpeechWindow(sentence, speed) {
  if (!sentence) return { start: 0, end: 0, dur: 0 };
  const start = sentence.start || 0;
  const text = sentence.text || '';
  const wordCount = (text.match(/[A-Za-z']+/g) || []).length;
  if (wordCount === 0) return { start, end: start, dur: 0 };
  const rawDur = (sentence.duration || 0) / (speed || 1);
  const perWord = rawDur / wordCount;
  const MIN_RATE = 0.25;
  const INFLATED_THRESHOLD = 5.0;
  let wordDur;
  if (perWord < MIN_RATE) wordDur = MIN_RATE;
  else if (perWord <= INFLATED_THRESHOLD) wordDur = perWord;
  else wordDur = 0.5;
  const dur = wordDur * wordCount;
  return { start, end: start + dur, dur };
}

function splitWordsWithTiming(sentence, speed) {
  if (!sentence) return [];
  const text = sentence.text || '';
  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];

  const win = getSpeechWindow(sentence, speed);
  if (win.dur <= 0) return [];
  const wordDur = win.dur / words.length;
  return words.map((w, i) => ({
    word: w,
    start: win.start + i * wordDur,
    end: win.start + (i + 1) * wordDur,
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
