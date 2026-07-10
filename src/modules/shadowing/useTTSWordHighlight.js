/**
 * useTTSWordHighlight — Karaoke word highlight for TTS playback.
 *
 * Polls `VoiceService._currentAudio.currentTime` via requestAnimationFrame.
 * TTS audio (cached on Cloudflare R2) always starts at 0 — no wall-clock anchor
 * needed. Matches the same { currentWordIdx, currentTime, words } shape as
 * useWordHighlight so callers (LeftPanel, Shadowing.jsx) can swap freely.
 *
 * Adaptive rate: if audio.duration is shorter than the default
 * FAST_RATE × wordCount window, scale the per-word duration DOWN so the last
 * word fits exactly at audio.duration. Without this, the highlight would
 * freeze mid-sentence when Deepgram TTS audio ends before the synthetic window.
 *
 * Safety guards:
 *   1. `if (!VoiceService._currentAudio)` early-returns inside the rAF tick
 *      so transient nulls (audio swap between sentences, race during initial
 *      load) never throw TypeError.
 *   2. useEffect on activeSentence?.id resets highlight state immediately
 *      when sentence changes, even if no audio is playing yet.
 *   3. Bail-out when `!isAudioPlaying || !activeSentence`.
 */

import { useState, useEffect, useRef } from 'react';
import { VoiceService } from '../../services/voiceService';

const FAST_RATE = 0.4; // 2.5 words/sec — base; reduced if audio shorter than this.

function buildWordTimings(sentence, audioDuration) {
  if (!sentence) return [];
  const text = sentence.text || '';
  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];
  const wordCount = words.length;
  // Adaptive rate: shrink window to fit audio duration if needed.
  const baseDur = FAST_RATE * wordCount;
  const dur = audioDuration && audioDuration < baseDur ? audioDuration : baseDur;
  const wordDur = dur / wordCount;
  return words.map((w, i) => ({
    word: w,
    start: i * wordDur,
    end: (i + 1) * wordDur,
  }));
}

export function useTTSWordHighlight(activeSentence, isAudioPlaying) {
  const [state, setState] = useState({ currentWordIdx: -1, currentTime: 0, words: [] });

  const sentenceRef = useRef(activeSentence);
  useEffect(() => { sentenceRef.current = activeSentence; }, [activeSentence]);

  // Reset highlight immediately when sentence changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) => (
      prev.currentWordIdx === -1 && prev.currentTime === 0 && prev.words.length === 0
        ? prev
        : { currentWordIdx: -1, currentTime: 0, words: [] }
    ));
  }, [activeSentence?.id]);

  useEffect(() => {
    if (!isAudioPlaying || !activeSentence) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((prev) => (
        prev.currentWordIdx === -1 && prev.currentTime === 0 && prev.words.length === 0
          ? prev
          : { currentWordIdx: -1, currentTime: 0, words: [] }
      ));
      return;
    }

    let rafId = null;
    let cancelled = false;
    let lastIdx = -2;

    const tick = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(tick);

      const audio = VoiceService._currentAudio;
      if (!audio) return;

      const sentence = sentenceRef.current;
      if (!sentence) return;

      // audio.duration is sometimes Infinity right after play() resolves;
      // fall back to FAST_RATE × wordCount in that case.
      const audioDuration = (typeof audio.duration === 'number' && isFinite(audio.duration))
        ? audio.duration : null;

      const words = buildWordTimings(sentence, audioDuration);
      if (!words.length) {
        setState((prev) => (prev.words.length ? { currentWordIdx: -1, currentTime: 0, words: [] } : prev));
        return;
      }

      const t = audio.currentTime;
      if (typeof t !== 'number') return;

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