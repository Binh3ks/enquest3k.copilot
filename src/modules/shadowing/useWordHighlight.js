// useWordHighlight.js — returns the current word index in the active sentence
// based on YouTube playback time. Words are interpolated from segment timing.

import { useState, useEffect, useRef } from 'react';

function splitWordsWithTiming(sentence, speed) {
  if (!sentence) return [];
  const text = sentence.text || '';
  const start = sentence.start || 0;
  const dur = (sentence.duration || 0) / (speed || 1);
  if (dur <= 0) return [];

  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];

  const wordDur = dur / words.length;
  return words.map((w, i) => ({
    word: w,
    start: start + i * wordDur,
    end: start + (i + 1) * wordDur,
  }));
}

export function useWordHighlight(ytPlayer, videoPopupOpen, useTranscriptSource, activeSentence, speed) {
  const [currentWordIdx, setCurrentWordIdx] = useState(-1);
  const lastIdx = useRef(-1);

  useEffect(() => {
    if (!videoPopupOpen || !ytPlayer || !useTranscriptSource || !activeSentence) {
      setCurrentWordIdx(-1);
      lastIdx.current = -1;
      return;
    }

    const words = splitWordsWithTiming(activeSentence, speed);
    if (!words.length) {
      setCurrentWordIdx(-1);
      return;
    }

    const interval = setInterval(() => {
      const t = ytPlayer.getCurrentTime();
      if (typeof t !== 'number') return;

      let idx = -1;
      for (let i = 0; i < words.length; i++) {
        if (t >= words[i].start - 0.3 && t < words[i].end + 0.3) {
          idx = i;
          break;
        }
      }
      if (idx === -1 && t >= words[words.length - 1].end) {
        idx = words.length - 1;
      }
      if (idx === -1 && t < words[0].start) {
        idx = 0;
      }
      if (idx !== lastIdx.current) {
        setCurrentWordIdx(idx);
        lastIdx.current = idx;
      }
    }, 100);

    return () => {
      clearInterval(interval);
      setCurrentWordIdx(-1);
      lastIdx.current = -1;
    };
  }, [ytPlayer, videoPopupOpen, useTranscriptSource, activeSentence, speed]);

  return currentWordIdx;
}
