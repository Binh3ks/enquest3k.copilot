import { useState, useRef, useCallback, useEffect } from 'react';
import { speakText } from '../utils/AudioHelper';
import { VoiceService } from '../services/voiceService';

const SPEED_OPTIONS = [1.25, 1.0, 0.85, 0.75, 0.65];
const STORAGE_KEY = 'shadowing_speed';
const DEFAULT_SPEED = 0.85;  // Default for new users
const INTER_SENTENCE_GAP_MS = 800;

function getStoredSpeed() {
  try {
    const v = parseFloat(localStorage.getItem(STORAGE_KEY));
    return SPEED_OPTIONS.includes(v) ? v : DEFAULT_SPEED;
  } catch {
    return DEFAULT_SPEED;
  }
}

/**
 * useShadowingPlayer — Playback hook for shadowing station.
 *
 * Sequence state machine for playAll():
 *
 *   ┌──────┐  start(sentences)   ┌─────────┐
 *   │ idle │ ──────────────────► │ playing │ ◄──┐
 *   └──────┘                     └────┬────┘    │ resume()
 *        ▲                           │ pause()  │
 *        │ stop()                    ▼          │
 *        │                        ┌────────┐    │
 *        └────────────────────────│ paused │────┘
 *        │                        └────────┘
 *        │ onAudioEnd (idx+1 ≥ length)
 *        ▼
 *   ┌─────────┐
 *   │finished │
 *   └─────────┘
 *
 * Key invariants:
 *   • onAudioEnd checks seq.state before advancing — pause wins over the
 *     natural end-of-sentence setTimeout.
 *   • pause() clears pending inter-sentence setTimeout so it doesn't
 *     fire after resume() re-starts the audio.
 *   • resume() reads pausedAtIdx (saved by pause()) and re-enters
 *     playIndex at that index — the sequence continues, it doesn't
 *     restart from 0.
 */
export function useShadowingPlayer(script, weekNumber, mode, videoPlayerRef = null) {
  const [activeSentenceId, setActiveSentenceId] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeedState] = useState(getStoredSpeed);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  // ── Sequence state machine ─────────────────────────────────────
  // Tracks the playAll sequence across pauses. Single-sentence playAll
  // (playSentence) and YouTube seek-playback don't touch this.
  const seq = useRef({
    state: 'idle',       // idle | playing | paused | finished
    idx: 0,
    sentences: [],
    speed,
    weekNumber,
    mode,
    pendingAdvance: null,  // setTimeout id for next-sentence auto-advance
  });
  const videoWasPlayingBeforePauseRef = useRef(false);

  // ── Playback mode for the most-recent play call. Used by resume()
  // to pick the correct continuation path (sequence vs single).
  const lastPlayModeRef = useRef(null);  // 'sequence' | 'sentence' | null

  // ── Video state polling ────────────────────────────────────────
  const reportVideoState = useCallback((state) => {
    setVideoIsPlaying(state === 'playing');
  }, []);

  // ── Speed ──────────────────────────────────────────────────────
  const setSpeed = useCallback((s) => {
    setSpeedState(s);
    try {
      localStorage.setItem(STORAGE_KEY, String(s));
      localStorage.setItem('tts_speed', String(s));
    } catch { /* ignore */ }
  }, []);

  // ── TTS / Video primitive controls ────────────────────────────
  const pauseTTS = useCallback(() => {
    const audio = VoiceService._currentAudio;
    const ok = VoiceService.pauseTTS();
    console.log('[Player] pauseTTS', {
      ok,
      hasAudio: !!audio,
      paused: audio?.paused,
      currentTime: audio?.currentTime,
    });
    return ok;
  }, []);

  const resumeTTS = useCallback(() => {
    const audio = VoiceService._currentAudio;
    const result = VoiceService.resumeTTS();
    console.log('[Player] resumeTTS', {
      hasAudio: !!audio,
      paused: audio?.paused,
      currentTime: audio?.currentTime,
    });
    return result;
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoPlayerRef?.current?.pauseVideo) {
      try { videoPlayerRef.current.pauseVideo(); } catch { /* ignore */ }
    }
  }, [videoPlayerRef]);

  const resumeVideo = useCallback(() => {
    if (videoPlayerRef?.current?.playVideo) {
      try { videoPlayerRef.current.playVideo(); } catch { /* ignore */ }
    }
  }, [videoPlayerRef]);

  // ── playAll sequence runner (re-entrant) ───────────────────────
  // Called by playAll() on first start AND by resume() to continue
  // from pausedAtIdx. The state machine guards:
  //   • 'idle'/'finished' → no-op
  //   • 'paused' → no-op (waits for resume)
  //   • 'playing' → speak current sentence; onEnd advances
  const playIndex = useCallback((idx, sentences, speedVal, wkNum, modeVal) => {
    const s = seq.current;
    if (s.state === 'paused' || s.state === 'idle' || s.state === 'finished') return;
    if (s.stopRequested) {
      s.state = 'idle';
      setIsPlayingAll(false);
      setActiveSentenceId(null);
      return;
    }
    if (idx >= sentences.length) {
      console.log('[Player] playAll sequence complete', { idx, total: sentences.length });
      s.state = 'finished';
      setIsPlayingAll(false);
      setActiveSentenceId(null);
      return;
    }
    s.idx = idx;
    const sent = sentences[idx];
    const text = (sent.text || '').replace(/\*\*/g, '');
    setActiveSentenceId(sent.id);
    speakText(text, null, speedVal, () => {
      // onEnd — only fires for natural end-of-sentence
      if (s.state === 'paused') {
        console.log('[Player] playAll speech ended while paused, deferring advance', { idx });
        return;
      }
      if (s.state !== 'playing') return;
      console.log('[Player] playAll onEnd, scheduling next', { idx, next: idx + 1 });
      s.pendingAdvance = setTimeout(() => {
        s.pendingAdvance = null;
        playIndex(idx + 1, sentences, speedVal, wkNum, modeVal);
      }, Math.round(INTER_SENTENCE_GAP_MS / speedVal));
    }, 'shadowing', wkNum, modeVal);
  }, []);

  // ── Guard: Block TTS when YouTube video is available ───────────
  // This prevents TTS from playing during video mode (e.g., after seek)
  const ttsBlockedRef = useRef(false);
  
  // Called by Shadowing to enable/disable TTS blocking
  const blockTTS = useCallback((block) => {
    if (block && !ttsBlockedRef.current) {
      console.log('[Player] TTS BLOCKED - video mode active');
      ttsBlockedRef.current = true;
      // Cancel any playing TTS
      VoiceService._shouldPauseNext = true;
      speakText('');
    } else if (!block) {
      ttsBlockedRef.current = false;
    }
  }, []);
  
  // ── playAll — start a sequence from idx 0 ──────────────────────
  const playAll = useCallback((sentences) => {
    if (!sentences || sentences.length === 0) return;
    
    // Block TTS when video is available (video mode)
    if (ttsBlockedRef.current) {
      console.log('[Player] playAll BLOCKED - TTS blocked, video mode active');
      return;
    }
    const s = seq.current;

    // Toggle: if currently running, stop the sequence
    if (s.state === 'playing' || s.state === 'paused') {
      console.log('[Player] playAll stop (toggle)', { prevState: s.state, idx: s.idx });
      s.stopRequested = true;
      if (s.pendingAdvance) {
        clearTimeout(s.pendingAdvance);
        s.pendingAdvance = null;
      }
      s.state = 'idle';
      s.idx = 0;
      s.sentences = [];
      setIsPlayingAll(false);
      setActiveSentenceId(null);
      setIsPaused(false);
      VoiceService._shouldPauseNext = true;
      speakText('');  // cancel current audio
      return;
    }

    // Fresh start
    s.state = 'playing';
    s.idx = 0;
    s.sentences = sentences;
    s.speed = speed;
    s.weekNumber = weekNumber;
    s.mode = mode;
    s.stopRequested = false;
    lastPlayModeRef.current = 'sequence';
    setIsPlayingAll(true);
    setIsPaused(false);
    VoiceService._shouldPauseNext = false;
    playIndex(0, sentences, speed, weekNumber, mode);
  }, [isPlayingAll, playIndex, speed, weekNumber, mode]);

  // ── Play a single sentence ─────────────────────────────────────
  const playSentence = useCallback((sentenceId, text) => {
    if (!text) return;
    // Stop any running sequence first
    if (seq.current.state === 'playing' || seq.current.state === 'paused') {
      seq.current.stopRequested = true;
      if (seq.current.pendingAdvance) {
        clearTimeout(seq.current.pendingAdvance);
        seq.current.pendingAdvance = null;
      }
      seq.current.state = 'idle';
    }
    lastPlayModeRef.current = 'sentence';
    setIsPlayingAll(false);
    setIsPaused(false);
    setActiveSentenceId(sentenceId);
    VoiceService._shouldPauseNext = false;
    const clean = text.replace(/\*\*/g, '');
    speakText(clean, null, speed, () => {
      // Only clear state if we haven't been interrupted by a new play call
      if (lastPlayModeRef.current === 'sentence') {
        setActiveSentenceId(null);
        setIsPaused(false);
      }
    }, 'shadowing', weekNumber, mode);
  }, [speed, weekNumber, mode]);

  // ── Pause (sequence-aware) ─────────────────────────────────────
  // Distinguishes between sequence mid-playback (saves idx for resume)
  // and single-sentence playback (just halts audio).
  const videoIsPlayingRef = useRef(false);
  const pause = useCallback(() => {
    console.log('[Player] pause() called', {
      seqState: seq.current.state,
      seqIdx: seq.current.idx,
      isPaused, isPlayingAll, activeSentenceId, videoIsPlaying: videoIsPlayingRef.current,
    });
    videoWasPlayingBeforePauseRef.current = videoIsPlayingRef.current;
    const s = seq.current;

    // Cancel any pending inter-sentence advance FIRST so it doesn't
    // fire after we resume and re-speak the current sentence.
    if (s.pendingAdvance) {
      clearTimeout(s.pendingAdvance);
      s.pendingAdvance = null;
    }

    if (s.state === 'playing') {
      s.state = 'paused';
      // idx stays at the current sentence — that's where resume picks up.
      console.log('[Player] pause: sequence paused at idx', s.idx);
    }
    VoiceService._shouldPauseNext = true;
    setIsPaused(true);
    pauseTTS();
    pauseVideo();
  }, [isPaused, isPlayingAll, activeSentenceId, videoIsPlaying, pauseTTS, pauseVideo]);

  // ── Resume (sequence-aware) ────────────────────────────────────
  // If we paused mid-sequence, re-speak the current sentence from the
  // top (speakText is fresh each time; for ESL short sentences that's
  // fine). onEnd will then auto-advance to subsequent sentences.
  const resume = useCallback(() => {
    if (!isPaused) {
      console.log('[Player] resume() called but isPaused=false, no-op');
      return;
    }
    const s = seq.current;
    const shouldResumeVideo = videoWasPlayingBeforePauseRef.current;
    console.log('[Player] resume() called', {
      seqState: s.state, seqIdx: s.idx, isPaused, isPlayingAll, activeSentenceId,
      videoWasPlayingBeforePause: shouldResumeVideo,
      lastPlayMode: lastPlayModeRef.current,
    });
    setIsPaused(false);
    VoiceService._shouldPauseNext = false;

    if (s.state === 'paused' && s.sentences.length > 0 && s.idx < s.sentences.length) {
      // Re-speak the current sentence from the top. The onEnd will then
      // auto-advance to subsequent sentences — so the sequence
      // CONTINUES instead of dying on the first pause.
      s.state = 'playing';
      playIndex(s.idx, s.sentences, s.speed, s.weekNumber, s.mode);
    } else {
      // Single-sentence pause — just resume audio
      resumeTTS();
    }
    if (shouldResumeVideo) resumeVideo();
  }, [isPaused, isPlayingAll, activeSentenceId, resumeTTS, resumeVideo, playIndex]);

  // ── TTS-only pause/resume (used by inline Play/Pause in transcript
  //     mode, where the YouTube video is separately controlled). ────
  const pauseTTSOnly = useCallback(() => {
    setIsPaused(true);
    pauseTTS();
  }, [pauseTTS]);

  const resumeTTSOnly = useCallback(() => {
    if (!isPaused) return;
    setIsPaused(false);
    resumeTTS();
  }, [isPaused, resumeTTS]);

  // ── Stop (full reset) ─────────────────────────────────────────
  const stop = useCallback(() => {
    const s = seq.current;
    s.stopRequested = true;
    if (s.pendingAdvance) {
      clearTimeout(s.pendingAdvance);
      s.pendingAdvance = null;
    }
    s.state = 'idle';
    s.idx = 0;
    s.sentences = [];
    lastPlayModeRef.current = null;
    setIsPlayingAll(false);
    setActiveSentenceId(null);
    setIsPaused(false);
    speakText('');
    pauseVideo();
  }, [pauseVideo]);

  // ── Cleanup on unmount ────────────────────────────────────────
  useEffect(() => {
    return () => {
      const s = seq.current;
      if (s.pendingAdvance) clearTimeout(s.pendingAdvance);
      s.state = 'idle';
      speakText('');
    };
  }, []);

  // ── YouTube state polling ──────────────────────────────────────
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  useEffect(() => {
    if (!videoPlayerRef) return;
    let lastTime = -1;
    let lastAdvanceAt = 0;
    const pollId = setInterval(() => {
      try {
        const api = videoPlayerRef.current;
        if (!api?.getCurrentTime) return;
        const t = api.getCurrentTime();
        const now = Date.now();
        if (typeof t === 'number' && t > 0) {
          setCurrentVideoTime(t);
          if (t !== lastTime) {
            lastAdvanceAt = now;
            if (!videoIsPlayingRef.current) {
              videoIsPlayingRef.current = true;
              setVideoIsPlaying(true);
            }
          } else if (videoIsPlayingRef.current && now - lastAdvanceAt > 600) {
            videoIsPlayingRef.current = false;
            setVideoIsPlaying(false);
          }
          lastTime = t;
        }
      } catch { /* ignore */ }
    }, 300);
    return () => clearInterval(pollId);
  }, [videoPlayerRef]);

  return {
    activeSentenceId,
    setActiveSentenceId,
    isPlayingAll,
    isPaused,
    videoIsPlaying,            // true when YouTube video is playing
    currentVideoTime,          // current YouTube playback time (seconds)
    isPlaying: isPlayingAll || activeSentenceId != null || videoIsPlaying,
    playSentence,
    playAll,
    pause,
    resume,
    stop,
    blockTTS,                 // block TTS when video is active
    pauseTTSOnly,
    resumeTTSOnly,
    stop,
    reportVideoState,
    speed,
    setSpeed,
    SPEED_OPTIONS,
  };
}
