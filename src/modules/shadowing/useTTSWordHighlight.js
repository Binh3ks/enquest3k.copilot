/**
 * useTTSWordHighlight — Karaoke word highlight for TTS playback.
 *
 * Polls `VoiceService._currentAudio.currentTime` via requestAnimationFrame.
 * TTS audio (cached on Cloudflare R2) always starts at 0 — no wall-clock anchor
 * needed. Matches the same { currentWordIdx, currentTime, words } shape as
 * useWordHighlight so callers (LeftPanel, Shadowing.jsx) can swap freely.
 *
 * Safety guards:
 *   1. `if (!VoiceService._currentAudio)` early-returns inside the rAF tick
 *      so transient nulls (audio swap between sentences, race during initial
 *      load) never throw TypeError.
 *   2. useEffect on activeSentence?.id resets highlight state immediately
 *      when sentence changes, even if no audio is playing yet — prevents
 *      stale highlights bleeding across sentences.
 *   3. Bail-out when `!isAudioPlaying || !activeSentence || !VoiceService._currentAudio`.
 */

import { useState, useEffect, useRef } from 'react';
import { splitWordsWithTiming } from './useWordHighlight';
import { VoiceService } from '../../services/voiceService';

export function useTTSWordHighlight(activeSentence, isAudioPlaying) {
  const [state, setState] = useState({ currentWordIdx: -1, currentTime: 0, words: [] });

  const sentenceRef = useRef(activeSentence);
  useEffect(() => { sentenceRef.current = activeSentence; }, [activeSentence]);

  // Reset highlight immediately when sentence changes (user advanced/seeked
  // while paused). Without this, the previous word's highlight would persist
  // until the new audio actually starts playing.
  useEffect(() => {
    setState({ currentWordIdx: -1, currentTime: 0, words: [] });
  }, [activeSentence?.id]);

  useEffect(() => {
    if (!isAudioPlaying || !activeSentence) {
      setState({ currentWordIdx: -1, currentTime: 0, words: [] });
      return;
    }

    let rafId = null;
    let cancelled = false;
    let lastIdx = -2;

    const tick = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(tick);

      const audio = VoiceService._currentAudio;
      // Guard #1: skip tick if audio not loaded / swapped mid-frame
      if (!audio) return;

      const sentence = sentenceRef.current;
      if (!sentence) return;

      const words = splitWordsWithTiming({ ...sentence, start: 0 });
      if (!words.length) {
        setState((prev) => (prev.words.length ? { currentWordIdx: -1, currentTime: 0, words: [] } : prev));
        return;
      }

      const t = audio.currentTime;
      if (typeof t !== 'number') return;

      // Match active word: same logic as useWordHighlight.js
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
      if (!found && t > words[words.length - 1].end + 0.1) {
        idx = -1;
      } else if (!found) {
        for (let i = 0; i < words.length; i++) {
          if (words[i].start <= t + 0.1) idx = i;
        }
      }

      setState((prev) => {
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
  }, [isAudioPlaying, activeSentence?.id]);

  return state;
}