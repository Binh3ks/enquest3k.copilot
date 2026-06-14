import { useState, useRef, useCallback, useEffect } from 'react';
import { speakText } from '../utils/AudioHelper';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5];
const STORAGE_KEY = 'shadowing_speed';
const DEFAULT_SPEED = 0.7;  // Slower than 0.8 for better shadowing practice

function getStoredSpeed() {
  try {
    const v = parseFloat(localStorage.getItem(STORAGE_KEY));
    return SPEED_OPTIONS.includes(v) ? v : DEFAULT_SPEED;
  } catch {
    return DEFAULT_SPEED;
  }
}

/**
 * useShadowingPlayer — TTS playback hook for shadowing station.
 *
 * Provides: playSentence, playAll, stop, activeSentenceId, isPlayingAll, speed, setSpeed
 */
export function useShadowingPlayer(script, weekNumber, mode) {
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [speed, setSpeedState] = useState(getStoredSpeed);
  const sequenceRef = useRef({ cancelled: false });
  const playbackRef = useRef(null);

  const setSpeed = useCallback((s) => {
    setSpeedState(s);
    try {
      // Persist in both keys: shadowing_speed (hook-local) and tts_speed (voiceService uses this)
      localStorage.setItem(STORAGE_KEY, String(s));
      localStorage.setItem('tts_speed', String(s));
    } catch { /* ignore */ }
  }, []);

  // Play a single sentence
  const playSentence = useCallback((sentenceId, text) => {
    if (!text) return;
    // Stop any "play all" sequence
    sequenceRef.current.cancelled = true;
    setIsPlayingAll(false);
    setActiveSentenceId(sentenceId);

    const clean = text.replace(/\*\*/g, '');
    speakText(clean, null, speed, () => {
      setActiveSentenceId(null);
    }, 'shadowing', weekNumber, mode);

    playbackRef.current = { sentenceId };
  }, [speed, weekNumber, mode]);

  // Play all sentences sequentially with pause between each
  const playAll = useCallback((sentences) => {
    if (isPlayingAll) {
      // Stop
      sequenceRef.current.cancelled = true;
      setIsPlayingAll(false);
      setActiveSentenceId(null);
      speakText('');
      return;
    }

    setIsPlayingAll(true);
    sequenceRef.current = { cancelled: false };

    const playIndex = (idx) => {
      if (sequenceRef.current.cancelled || idx >= sentences.length) {
        setIsPlayingAll(false);
        setActiveSentenceId(null);
        return;
      }
      const s = sentences[idx];
      const text = (s.text || '').replace(/\*\*/g, '');
      setActiveSentenceId(s.id);
      speakText(text, null, speed, () => {
        // Pause between sentences (scaled by speed)
        const pauseMs = Math.max(400, 800 * speed);
        setTimeout(() => {
          if (!sequenceRef.current.cancelled) {
            playIndex(idx + 1);
          }
        }, pauseMs);
      }, 'shadowing', weekNumber, mode);
    };

    playIndex(0);
  }, [isPlayingAll, speed, weekNumber, mode]);

  // Stop all on unmount
  useEffect(() => {
    return () => {
      sequenceRef.current.cancelled = true;
      speakText('');
    };
  }, []);

  return {
    activeSentenceId,
    setActiveSentenceId,
    isPlayingAll,
    playSentence,
    playAll,
    stop: () => {
      sequenceRef.current.cancelled = true;
      setIsPlayingAll(false);
      setActiveSentenceId(null);
      speakText('');
    },
    speed,
    setSpeed,
    SPEED_OPTIONS,
  };
}
