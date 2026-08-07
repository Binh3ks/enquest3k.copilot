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

function buildWordTimings(sentence, audioDuration, currentSpeed = 1.0) {
  if (!sentence) return [];
  const text = sentence.text || '';
  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return [];
  const wordCount = words.length;
  // Scale word duration according to playback speed
  const rate = (currentSpeed && currentSpeed > 0) ? currentSpeed : 1.0;
  const baseDur = (FAST_RATE * wordCount) / rate;
  const dur = (audioDuration && isFinite(audioDuration) && audioDuration > 0)
    ? (audioDuration / rate)
    : baseDur;
  const wordDur = dur / wordCount;
  return words.map((w, i) => ({
    word: w,
    start: i * wordDur,
    end: (i + 1) * wordDur,
  }));
}

export function useTTSWordHighlight(activeSentence, isAudioPlaying, speed = 1.0) {
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

    let startTimeMs = null;

    const tick = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(tick);

      const sentence = sentenceRef.current;
      if (!sentence) return;

      const audio = VoiceService._currentAudio;
      const currentRate = (audio && audio.playbackRate && audio.playbackRate > 0)
        ? audio.playbackRate
        : (speed || 1.0);

      // audio.duration is sometimes Infinity right after play() resolves;
      // fall back to FAST_RATE × wordCount in that case.
      const audioDuration = (audio && typeof audio.duration === 'number' && isFinite(audio.duration))
        ? audio.duration : null;

      const words = buildWordTimings(sentence, audioDuration, currentRate);
      if (!words.length) {
        setState((prev) => (prev.words.length ? { currentWordIdx: -1, currentTime: 0, words: [] } : prev));
        return;
      }

      if (startTimeMs === null) {
        startTimeMs = performance.now();
      }

      let t = 0;
      if (audio && typeof audio.currentTime === 'number' && !isNaN(audio.currentTime) && audio.currentTime >= 0) {
        t = audio.currentTime;
      } else {
        t = ((performance.now() - startTimeMs) / 1000) * currentRate;
      }

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