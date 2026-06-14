import { useState, useRef, useCallback, useEffect } from 'react';
import { speakText } from '../utils/AudioHelper';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5];
const STORAGE_KEY = 'shadowing_speed';

function getStoredSpeed() {
  try {
    const v = parseFloat(localStorage.getItem(STORAGE_KEY));
    return SPEED_OPTIONS.includes(v) ? v : 0.8;
  } catch {
    return 0.8;
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
    try { localStorage.setItem(STORAGE_KEY, String(s)); } catch { /* ignore */ }
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

  // Play all sentences sequentially
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
        playIndex(idx + 1);
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
