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
// speech happens.  Uses raw transcript duration directly — no speed
// adjustment because YouTube getCurrentTime() already reflects playback
// rate (e.g. at 0.85x, getCurrentTime() increments at 0.85 ticks/sec,
// which matches our transcript timestamps on the same timeline).
export function getSpeechWindow(sentence) {
  if (!sentence) return { start: 0, end: 0, dur: 0 };
  const start = sentence.start || 0;
  const dur = sentence.duration || 0;
  return { start, end: start + dur, dur };
}

const TRIM_OFFSET = 0.3;  // seconds to trim from start/end to match speech

function splitWordsWithTiming(sentence) {
  if (!sentence) return [];
  const text = sentence.text || '';
  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];

  const win = getSpeechWindow(sentence);
  if (win.dur <= 0) return [];
  // Trim 0.3s from each end — ASR timestamps include pre/post silence
  // that make highlights lag behind actual speech onset.
  const trimmedDur = Math.max(0.5, win.dur - TRIM_OFFSET * 2);
  const wordDur = trimmedDur / words.length;
  const offset = TRIM_OFFSET;
  return words.map((w, i) => ({
    word: w,
    start: win.start + offset + i * wordDur,
    end: win.start + offset + (i + 1) * wordDur,
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
    let lastLogT = 0;
    const interval = setInterval(() => {
      const sentence = sentenceRef.current;
      if (!sentence) return;

      const words = splitWordsWithTiming(sentence);
      if (!words.length) {
        setState({ currentWordIdx: -1, currentTime: 0, words: [] });
        return;
      }

      const t = ytPlayer.getCurrentTime();
      if (typeof t !== 'number') return;

      // Find active word: last one whose start <= t (same pattern as
      // sentence sync — eliminates mid-word jumping when t is between
      // word boundaries or slightly past end of previous word).
      let idx = 0;
      for (let i = 0; i < words.length; i++) {
        if (words[i].start <= t + 0.1) {
          idx = i;
        }
      }

      // DEBUG (Jun 26): log every 0.5s with full word timing info
      if (t - lastLogT >= 0.5) {
        lastLogT = t;
        const w = words[idx];
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
    }, 100);

    return () => {
      clearInterval(interval);
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
    };
  }, [ytPlayer, videoPopupOpen, useTranscriptSource, speed]);

  return state;
}
