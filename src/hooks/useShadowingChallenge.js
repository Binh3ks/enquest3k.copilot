import { useReducer, useRef, useEffect, useCallback } from 'react';
import { speakText } from '../utils/AudioHelper';
import { VoiceService } from '../services/voiceService';

// ──────────────────────────────────────────────────────────────────────
// useShadowingChallenge — Inline challenge mode state machine for shadowing
//
// 7 phases:
//   SETUP → PLAY_TTS → COUNTDOWN_321 → RECORDING → SCORING → SCORED
//                                                              ↓
//                                                          (last sentence?)
//                                                              ↓
//                                                          ALL_DONE
//
// Reuses useShadowingRecorder.startRecording/stopRecording (no hook changes).
// State machine is in this hook so the UI can render different inline components
// (setup modal, inline bar, summary modal) without prop-drilling.
// ──────────────────────────────────────────────────────────────────────

const PHASES = {
  SETUP: 'SETUP',
  PLAY_TTS: 'PLAY_TTS',
  COUNTDOWN_321: 'COUNTDOWN_321',
  RECORDING: 'RECORDING',
  SCORING: 'SCORING',
  SCORED: 'SCORED',
  ALL_DONE: 'ALL_DONE',
  BATCH_EVALUATING: 'BATCH_EVALUATING',  // whole-script mode: waiting for all AI scores
};

const COUNTDOWN_OPTIONS = [3, 5, 10, 15]; // seconds
const SCORING_TIMEOUT_MS = 10000;
const PASS_THRESHOLD = 70;
const AUTO_ADVANCE_MS = 3000;
const TTS_END_DELAY_MS = 500;

// ── Reducer ─────────────────────────────────────────────────────────
const initialState = (sentences) => ({
  phase: PHASES.SETUP,
  countdownDuration: 5,       // default 5s
  currentIndex: 0,
  currentSentenceId: sentences?.[0]?.id ?? null,
  preCountdown: 3,            // 3-2-1 numbers
  recordTimeLeft: 5,          // seconds left in recording
  sessionScores: {},          // { [sentenceId]: { score, feedback, transcript, provider } }
  skippedIds: new Set(),
  autoAdvanceTimeLeft: 0,     // 3..2..1 for auto-advance after SCORED >= PASS
  micError: null,             // 'mic_denied' | null
  practiceMode: 'per-sentence',  // 'per-sentence' | 'whole-script'
  isBatchEvaluating: false,   // true while waiting for whole-script AI eval at end
  batchEvalStartedAt: null,
  isPaused: false,            // true while user clicked inline Pause during the challenge (June 30 — pause-to-resume)
  // Adaptive extension: per-sentence metadata
  // redoCount: times student retried the same sentence
  // neededFullTime: true if recording used nearly the full countdown (slow speaker)
  // extendedSeconds: extra time added to base countdown for this sentence
  sentenceStats: {},          // { [sentenceId]: { redoCount, neededFullTime, extendedSeconds } }
  // Retry-wrong mode state — populated by RESET_FOR_RETRY, cleared by FINISH
  retryQueue: [],             // [sentenceId, ...] wrong sentences to retry in order
  retrySet: new Set(),        // Set of sentenceIds currently being retried
  inRetryMode: false,         // true between RESET_FOR_RETRY and the next ALL_DONE
});

function reducer(state, action) {
  console.log('[Challenge] dispatch', { type: action.type, fromPhase: state.phase, currentIndex: state.currentIndex });
  switch (action.type) {
    case 'SET_COUNTDOWN_DURATION':
      return { ...state, countdownDuration: action.value, recordTimeLeft: action.value };
    case 'START_CHALLENGE':
      return { ...state, phase: PHASES.PLAY_TTS };
    case 'TTS_ENDED': {
      // Skip COUNTDOWN_321 phase — go directly to RECORDING.
      // The 3-2-1 pre-roll was redundant with the in-phase recordTimeLeft
      // timer that already counts down the recording window. Removing this
      // saves 3s per sentence × N sentences per practice session.
      const stats = state.currentSentenceId != null ? state.sentenceStats[state.currentSentenceId] : null;
      const extended = stats?.extendedSeconds || 0;
      const totalTime = state.countdownDuration + extended;
      return { ...state, preCountdown: 0, phase: PHASES.RECORDING, recordTimeLeft: totalTime };
    }
    case 'TICK_PRE_COUNTDOWN':
      // Legacy — kept for backward-compat with any code still dispatching it.
      // No-op: countdown phase removed, TTS_ENDED jumps straight to RECORDING.
      return state;
    case 'TICK_RECORD_TIMER':
      if (state.recordTimeLeft <= 1) {
        return { ...state, recordTimeLeft: 0 };
      }
      return { ...state, recordTimeLeft: state.recordTimeLeft - 1 };
    case 'RECORDING_STOPPED':
      return { ...state, phase: PHASES.SCORING };
    case 'RECORD_USED_FULL_TIME': {
      // In whole-script mode, mark current sentence as "slow" → next sentence +5s
      const id = state.currentSentenceId;
      if (id == null) return state;
      const existing = state.sentenceStats[id] || { redoCount: 0, neededFullTime: false, extendedSeconds: 0 };
      return {
        ...state,
        sentenceStats: {
          ...state.sentenceStats,
          [id]: { ...existing, neededFullTime: true },
        },
      };
    }
    case 'RECORD_REDO': {
      // Student clicked Try Again / Redo on the current sentence
      const id = state.currentSentenceId;
      if (id == null) return state;
      const existing = state.sentenceStats[id] || { redoCount: 0, neededFullTime: false, extendedSeconds: 0 };
      const newRedoCount = existing.redoCount + 1;
      // If student has redone 2+ times, extend by 5s for next attempt
      const extended = newRedoCount >= 2 ? 5 : existing.extendedSeconds;
      return {
        ...state,
        sentenceStats: {
          ...state.sentenceStats,
          [id]: { ...existing, redoCount: newRedoCount, extendedSeconds: extended },
        },
      };
    }
    case 'SCORE_RECEIVED': {
      const next = { ...state.sessionScores, [action.sentenceId]: action.scoreData };
      return { ...state, sessionScores: next, phase: PHASES.SCORED, micError: null };
    }
    case 'START_AUTO_ADVANCE':
      return { ...state, autoAdvanceTimeLeft: 3 };
    case 'TICK_AUTO_ADVANCE':
      if (state.autoAdvanceTimeLeft <= 1) {
        return { ...state, autoAdvanceTimeLeft: 0 };
      }
      return { ...state, autoAdvanceTimeLeft: state.autoAdvanceTimeLeft - 1 };
    case 'ADVANCE_NEXT': {
      const nextIndex = state.currentIndex + 1;
      // If the previous sentence was slow, add +5s to next sentence's extension
      let nextStats = { ...state.sentenceStats };
      const prevId = state.currentSentenceId;
      if (prevId != null) {
        const prevStats = state.sentenceStats[prevId];
        if (prevStats?.neededFullTime && action.sentences?.[nextIndex]) {
          const nextId = action.sentences[nextIndex].id;
          const nextExisting = nextStats[nextId] || { redoCount: 0, neededFullTime: false, extendedSeconds: 0 };
          // Cap total extension at 15s to avoid runaway
          nextStats[nextId] = {
            ...nextExisting,
            extendedSeconds: Math.min(15, (nextExisting.extendedSeconds || 0) + 5),
          };
        }
      }
      return {
        ...state,
        currentIndex: nextIndex,
        currentSentenceId: action.sentences?.[nextIndex]?.id ?? null,
        sentenceStats: nextStats,
        phase: PHASES.PLAY_TTS,
        autoAdvanceTimeLeft: 0,
      };
    }
    case 'RETRY_SAME':
      return { ...state, phase: PHASES.PLAY_TTS };
    case 'SKIP_SENTENCE': {
      const skipped = new Set(state.skippedIds);
      skipped.add(action.sentenceId);
      // sentences come via action.sentences (set by dispatchWithSentences)
      const list = action.sentences || [];
      // In retry mode, advance to the next wrong sentence in retryQueue rather
      // than the next sentence in raw order. If we've reached the end of the
      // retry queue, finish so the summary modal reopens with updated scores.
      if (state.inRetryMode && state.retryQueue?.length > 0) {
        for (const id of state.retryQueue) {
          if (!skipped.has(id)) {
            const idx = list.findIndex(s => s.id === id);
            if (idx >= 0) {
              return {
                ...state,
                skippedIds: skipped,
                currentIndex: idx,
                currentSentenceId: id,
                phase: PHASES.PLAY_TTS,
                autoAdvanceTimeLeft: 0,
              };
            }
          }
        }
        // All retry sentences done → finish, summary reopens
        return {
          ...state,
          skippedIds: skipped,
          phase: PHASES.ALL_DONE,
          inRetryMode: false,
          autoAdvanceTimeLeft: 0,
        };
      }
      const nextIndex = state.currentIndex + 1;
      return {
        ...state,
        skippedIds: skipped,
        currentIndex: nextIndex,
        currentSentenceId: action.sentences?.[nextIndex]?.id ?? null,
        phase: PHASES.PLAY_TTS,
        autoAdvanceTimeLeft: 0,
      };
    }
    case 'FINISH':
      // Clear retry-mode flags so subsequent retries start fresh.
      return {
        ...state,
        phase: PHASES.ALL_DONE,
        inRetryMode: false,
        retryQueue: [],
        retrySet: new Set(),
      };
    case 'SET_MIC_ERROR':
      return { ...state, micError: action.value };
    case 'SET_PRACTICE_MODE':
      return { ...state, practiceMode: action.value };
    case 'START_BATCH_EVAL':
      return { ...state, phase: PHASES.BATCH_EVALUATING, isBatchEvaluating: true, batchEvalStartedAt: Date.now() };
    case 'BATCH_EVAL_DONE':
      return { ...state, isBatchEvaluating: false };
    case 'RESET_FOR_RETRY': {
      // 1. Build retry queue: list of wrong/skipped sentence IDs in original order.
      // 2. Clear scores for those sentences so they'll be re-scored on next pass.
      // 3. Jump currentIndex/currentSentenceId to the first wrong sentence.
      // 4. Track the retry queue on state so handleNext/handleSkip can advance
      //    through it sequentially and re-open summary at the end.
      // Sentences come via action.sentences (set by dispatchWithSentences).
      const sents = action.sentences || [];
      const retryIds = [];
      const wrongSet = new Set();
      for (const s of sents) {
        const sd = state.sessionScores[s.id];
        const score = sd?.score ?? null;
        const wasSkipped = state.skippedIds?.has(s.id);
        const isWrong = (score != null && score < PASS_THRESHOLD) || wasSkipped || score == null;
        if (isWrong && s.id != null) {
          retryIds.push(s.id);
          wrongSet.add(s.id);
        }
      }
      // Clear scores for wrong sentences so the SCORED handler treats them as fresh
      const cleared = { ...state.sessionScores };
      for (const id of wrongSet) delete cleared[id];
      // Find first wrong index in current sentences
      const firstWrongIndex = sents.length > 0 ? sents.findIndex(s => wrongSet.has(s.id)) : 0;
      const firstWrongId = firstWrongIndex >= 0 ? sents[firstWrongIndex]?.id ?? null : null;
      return {
        ...state,
        sessionScores: cleared,
        phase: PHASES.PLAY_TTS,
        skippedIds: new Set(),
        autoAdvanceTimeLeft: 0,
        currentIndex: Math.max(0, firstWrongIndex),
        currentSentenceId: firstWrongId,
        retryQueue: retryIds,
        retrySet: wrongSet,
        inRetryMode: retryIds.length > 0,
      };
    }
    case 'CLOSE':
      // Pre-existing typo: was `{ ...initialState }` (spread function ref →
      // empty object, since functions have no own enumerable props).
      // Caused white-page crash on inline Stop during recording because
      // state.phase/currentIndex/currentSentenceId all became undefined.
      return initialState([]);
    case 'PAUSE':
      // Pause-to-resume (June 30 fix): keeps phase intact, just flips the
      // isPaused flag. Effects check state.isPaused and bail out, so
      // PLAY_TTS won't dispatch TTS_ENDED, COUNTDOWN_321 won't tick,
      // RECORDING's timer won't tick, etc.
      return state.phase === PHASES.SETUP ? state : { ...state, isPaused: true };
    case 'RESUME':
      return { ...state, isPaused: false };
    default:
      return state;
  }
}

export function useShadowingChallenge({
  sentences,
  onRecord,
  stopRecording,
  pauseRecording,         // June 30 fix: pause MediaRecorder so user can pause mid-record
  resumeRecording,        // June 30 fix: resume MediaRecorder on unpause
  isRecording,
  scores,
  seekPlayback,
  pauseVideo,
  setActiveSentenceId,
  ytPlayer,               // for event-driven pause in PLAY_TTS effect
  speed,
  weekNumber,
  mode,
  hasVideo,
  canUseVideoTranscript = false,
  practiceMode: initialPracticeMode = 'per-sentence',
}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState(sentences),
    practiceMode: initialPracticeMode,
  });

  // Allow caller to change practice mode (from setup modal)
  const setPracticeMode = useCallback((value) => {
    dispatch({ type: 'SET_PRACTICE_MODE', value });
  }, []);

  // Helper: dispatch an action that needs access to current sentences array
  // (used by ADVANCE_NEXT and SKIP_SENTENCE to know the next sentence id)
  // Mirrors sentences into ref to keep dispatch stable even if parent recreates
  // the array on every render (effectiveScript = baseScript.map(...) — same
  // Rule 1 pattern from shadowing-transcript-sync memory).
  const dispatchWithSentences = useCallback((action) => {
    dispatch({ ...action, sentences: sentencesRef.current });
  }, []);

  // Mirror state + sentences into refs so async timers read latest without re-mounting
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);
  const sentencesRef = useRef(sentences);
  useEffect(() => { sentencesRef.current = sentences; }, [sentences]);
  // Mirror callbacks (parent recreates them on every render due to .map() deps)
  const onRecordRef = useRef(onRecord);
  useEffect(() => { onRecordRef.current = onRecord; }, [onRecord]);
  const stopRecordingRef = useRef(stopRecording);
  useEffect(() => { stopRecordingRef.current = stopRecording; }, [stopRecording]);
  const pauseRecordingRef = useRef(pauseRecording);
  useEffect(() => { pauseRecordingRef.current = pauseRecording; }, [pauseRecording]);
  const resumeRecordingRef = useRef(resumeRecording);
  useEffect(() => { resumeRecordingRef.current = resumeRecording; }, [resumeRecording]);
  const seekPlaybackRef = useRef(seekPlayback);
  useEffect(() => { seekPlaybackRef.current = seekPlayback; }, [seekPlayback]);
  const pauseVideoRef = useRef(pauseVideo);
  useEffect(() => { pauseVideoRef.current = pauseVideo; }, [pauseVideo]);
  const ytPlayerRef = useRef(ytPlayer);
  useEffect(() => { ytPlayerRef.current = ytPlayer; }, [ytPlayer]);
  const setActiveSentenceIdRef = useRef(setActiveSentenceId);
  useEffect(() => { setActiveSentenceIdRef.current = setActiveSentenceId; }, [setActiveSentenceId]);

  const preCountdownRef = useRef(null);
  const recordTimerRef = useRef(null);
  const scoringTimeoutRef = useRef(null);
  const autoAdvanceRef = useRef(null);
  const playTtsEndTimerRef = useRef(null);

  const clearAllTimers = useCallback(() => {
    if (preCountdownRef.current) { clearInterval(preCountdownRef.current); preCountdownRef.current = null; }
    if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
    if (scoringTimeoutRef.current) { clearTimeout(scoringTimeoutRef.current); scoringTimeoutRef.current = null; }
    if (autoAdvanceRef.current) { clearTimeout(autoAdvanceRef.current); autoAdvanceRef.current = null; }
    if (playTtsEndTimerRef.current) { clearTimeout(playTtsEndTimerRef.current); playTtsEndTimerRef.current = null; }
  }, []);

  // Cancel only the SCORING-phase timeout. Used when a score arrives so the
  // hard 10s fallback doesn't fire after the real score. Does NOT touch
  // recordTimerRef — clearing that would kill the active sentence's recording
  // countdown if the user has an early score for the previous sentence.
  const cancelScoringTimeout = useCallback(() => {
    if (scoringTimeoutRef.current) { clearTimeout(scoringTimeoutRef.current); scoringTimeoutRef.current = null; }
  }, []);

  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  // ── Watch scores prop for async Deepgram results ───────────────
  const watchedSentenceId = sentences[state.currentIndex]?.id;
  const watchedScore = watchedSentenceId != null ? scores?.[watchedSentenceId] : null;
  const sessionScoreForCurrent = watchedSentenceId != null ? state.sessionScores[watchedSentenceId] : null;

  useEffect(() => {
    if (state.phase !== PHASES.SCORING || !watchedSentenceId) return;
    if (watchedScore && !sessionScoreForCurrent) {
      dispatch({ type: 'SCORE_RECEIVED', sentenceId: watchedSentenceId, scoreData: watchedScore });
      cancelScoringTimeout();
    }
  }, [state.phase, watchedSentenceId, watchedScore, sessionScoreForCurrent, cancelScoringTimeout]);

  // 10s scoring timeout
  useEffect(() => {
    if (state.phase !== PHASES.SCORING) return;
    if (sessionScoreForCurrent) return;
    const timerId = setTimeout(() => {
      const cur = stateRef.current;
      const wid = cur && sentencesRef.current[cur.currentIndex]?.id;
      if (wid && !cur.sessionScores[wid]) {
        dispatch({
          type: 'SCORE_RECEIVED',
          sentenceId: wid,
          scoreData: { score: 0, feedback: 'Scoring unavailable', transcript: '', provider: 'timeout' },
        });
      }
    }, SCORING_TIMEOUT_MS);
    scoringTimeoutRef.current = timerId;
    return () => {
      clearTimeout(timerId);
    };
  }, [state.phase, watchedSentenceId, sessionScoreForCurrent]);

  // ── PLAY_TTS: auto-play audio, then advance to COUNTDOWN_321 ───
  // Track the PLAY_TTS endTimer in a ref so handleCancel / inline Pause
  // can clear it. Without this, the timer keeps firing after the user
  // pauses and forces an unwanted advance to COUNTDOWN_321 (visible as
  // seekPlayback + pause firing repeatedly — "ngắt quãng" in console).
  useEffect(() => {
    if (state.phase !== PHASES.PLAY_TTS) return;
    // June 30 fix (pause-to-resume): when user clicks inline Pause during
    // a challenge, bail out — don't queue a new speakText, don't fire any
    // end-timer. Resume is handled by the resume-dispatched re-run below.
    if (state.isPaused) {
      console.log('[Challenge] PLAY_TTS skipped (isPaused=true)', { currentIndex: stateRef.current.currentIndex });
      return;
    }
    // Use index-based lookup to handle id mismatch between lesson script
    // and transcript segments. Fall back to id search if needed.
    let sent = sentencesRef.current[stateRef.current.currentIndex];
    if (!sent) {
      sent = sentencesRef.current.find(s => s.id === stateRef.current.currentSentenceId);
    }
    if (!sent) return;
    const text = (sent.text || '').replace(/\*\*/g, '').trim();
    const segDuration = sent.duration || 0;
    console.log('[Challenge] PLAY_TTS starting', {
      sentenceId: sent.id, currentIndex: stateRef.current.currentIndex,
      segDuration, hasVideo, text: text.slice(0, 40),
    });
    let endTimer = null;
    const cancelledRef = { current: false };
    const advancedRef = { current: false };
    const advance = () => {
      if (cancelledRef.current || advancedRef.current) return;
      advancedRef.current = true;
      console.log('[Challenge] PLAY_TTS advance → TTS_ENDED', { sentenceId: sent.id });
      dispatch({ type: 'TTS_ENDED' });
    };

    // Cancel any previous TTS to prevent overlapping speech (e.g., from
    // rapid Next clicks). window.speechSynthesis.cancel() is a no-op if
    // nothing is playing.
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    }

// Event-driven pause: seek to (next.start - 0.3) so video plays through
    // current sentence naturally; poll getCurrentTime every 80ms to detect
    // when video crosses next.start + 0.1, then pause + advance. No timer
    // estimation — purely frame-accurate via YouTube's clock.
    if (canUseVideoTranscript && hasVideo && seekPlaybackRef.current) {
      const idx = sentencesRef.current.findIndex(s => s.id === sent.id);
      const next = idx >= 0 ? sentencesRef.current[idx + 1] : null;
      // Anchor on CURRENT sentence but cap stopAt at next.start to prevent
      // bleeding into the next sentence's audio. Transcript durations
      // overlap (e.g. W3 #4 ends 25.60, #5 starts 22.68) so without this
      // cap we wait past next.start and the user hears next sentence audio.
      const seekTo = Math.max(0, sent.start - 0.3);
      // Dual-threshold: A = sentence end +0.1s, B = next start -0.15s.
      const thresholdA = sent.start + (sent.duration || 2) + 0.1;
      const thresholdB = next ? next.start - 0.15 : Infinity;
      const stopAt = Math.min(thresholdA, thresholdB);
      const played = seekPlaybackRef.current(sent.id, seekTo);
      if (played) {
        const yt = ytPlayerRef.current;
        const t0 = Date.now();
        console.log('[Challenge] poller start', JSON.stringify({ sentenceId: sent.id, start: sent.start, dur: sent.duration, seekTo, stopAt, hasYt: !!yt }));
        const poller = setInterval(() => {
          if (cancelledRef.current || !yt || !yt.getCurrentTime) { clearInterval(poller); return; }
          const t = yt.getCurrentTime();
          // Dynamic Gap-Aware Cap: shrink offset when gap is large (keep
      // sentence tail audible), expand when gap is tight (block bleed).
      const sentEnd = sent.start + (sent.duration || 2);
      const gap = next ? (next.start - sentEnd) : Infinity;
      let dynamicOffset;
      if (!next) dynamicOffset = 0.05;
      else if (gap > 0.5) dynamicOffset = 0.05;
      else if (gap >= 0.2) dynamicOffset = 0.1;
      else dynamicOffset = 0.16;
      if (typeof t === 'number' && t >= (stopAt - dynamicOffset)) {
            console.log('[Challenge] poller stop', JSON.stringify({ sentenceId: sent.id, t, stopAt, elapsedMs: Date.now() - t0 }));
            clearInterval(poller);
            pauseVideoRef.current?.();
            advance();
          }
        }, 50);
        endTimer = poller;
        playTtsEndTimerRef.current = poller;
      }
    }
    if (!endTimer) {
      const estimatedMs = Math.max(2000, text.length * 80) + TTS_END_DELAY_MS;
      // Tell player hook that TTS is playing for the play/pause button
      console.log('[Challenge] PLAY_TTS setActiveSentenceId (TTS path)', { sentenceId: sent.id });
      setActiveSentenceIdRef.current?.(sent.id);
      try {
        speakText(text, null, speed, () => {
          // Guard against stale callbacks (e.g., from cancelled TTS)
          if (cancelledRef.current) {
            console.log('[Challenge] PLAY_TTS speakText callback ignored (cancelled)', { sentenceId: sent.id });
            return;
          }
          console.log('[Challenge] PLAY_TTS speakText ended → clearing activeSentenceId', { sentenceId: sent.id });
          setActiveSentenceIdRef.current?.(null);
          setTimeout(advance, TTS_END_DELAY_MS);
        }, 'shadowing', weekNumber, mode);
      } catch (err) {
        console.warn('[Challenge] speakText failed, using estimate:', err);
        endTimer = setTimeout(advance, estimatedMs);
        playTtsEndTimerRef.current = endTimer;
      }
      const maxMs = Math.max(estimatedMs, text.length * 200 + 2000) + 2000;
      const maxTimer = setTimeout(advance, maxMs);
      return () => {
        console.log('[Challenge] PLAY_TTS cleanup', { sentenceId: sent.id, sent: sent.id });
        cancelledRef.current = true;
        setActiveSentenceIdRef.current?.(null);
        playTtsEndTimerRef.current = null;
        if (endTimer) clearTimeout(endTimer);
        clearTimeout(maxTimer);
        // June 30 fix: pause VoiceService audio so the in-flight TTS doesn't
        // keep playing through to natural end. The challenge PLAY_TTS uses
        // VoiceService.speak() which creates an HTML5 <audio> element stored
        // in VoiceService._currentAudio — pauseTTS() halts it immediately.
        try { VoiceService.pauseTTS(); } catch { /* ignore */ }
      };
    }
    return () => {
      console.log('[Challenge] PLAY_TTS cleanup (video path)', { sentenceId: sent.id });
      cancelledRef.current = true;
      playTtsEndTimerRef.current = null;
      if (endTimer) clearTimeout(endTimer);
      // June 30 fix: pause YouTube video when PLAY_TTS phase ends/changes.
      try { pauseVideoRef.current?.(); } catch { /* ignore */ }
    };
  }, [state.phase, state.currentIndex, state.isPaused, hasVideo, canUseVideoTranscript, speed, weekNumber, mode]);

  // ── COUNTDOWN_321: tick 3→2→1, then start recording ────────────
  useEffect(() => {
    if (state.phase !== PHASES.COUNTDOWN_321) return;
    // June 30 fix: when paused, freeze the countdown — the interval is
    // already cleared in cleanup below. We skip dispatching TICK too,
    // so the displayed number stays at its current value.
    if (state.isPaused) {
      console.log('[Challenge] COUNTDOWN_321 paused', { preCountdown: state.preCountdown });
      return;
    }
    preCountdownRef.current = setInterval(() => {
      dispatch({ type: 'TICK_PRE_COUNTDOWN' });
    }, 1000);
    return () => {
      if (preCountdownRef.current) { clearInterval(preCountdownRef.current); preCountdownRef.current = null; }
    };
  }, [state.phase, state.isPaused]);

  // ── When COUNTDOWN_321 reaches 0 (recordTimeLeft gets set), fire recording
  useEffect(() => {
    if (state.phase !== PHASES.RECORDING) return;
    if (isRecording) return;
    // June 30 fix: don't start a fresh recording if user paused before
    // the countdown finished. The countdown effect above freezes the
    // preCountdown number; resuming restarts the countdown flow naturally.
    if (state.isPaused) return;
    const sent = sentencesRef.current[stateRef.current.currentIndex];
    if (!sent) return;
    const text = (sent.text || '').replace(/\*\*/g, '');
    // Pause any playing YouTube video so the recording is clean
    pauseVideoRef.current?.();
    try {
      onRecordRef.current(sent.id, text);
    } catch (err) {
      console.error('[Challenge] onRecord failed:', err);
      dispatch({ type: 'SET_MIC_ERROR', value: 'mic_denied' });
    }
  }, [state.phase, state.isPaused, isRecording]);

  // ── RECORDING: 1s tick ─────────────────────────────────────────
  useEffect(() => {
    if (state.phase !== PHASES.RECORDING) return;
    // June 30 fix: when paused, freeze the recording timer AND pause the
    // underlying MediaRecorder (via the recorder hook). When resumed,
    // the effect re-runs, ticks resume from the same recordTimeLeft, and
    // MediaRecorder.resume() picks up the same audio stream.
    if (state.isPaused) {
      console.log('[Challenge] RECORDING paused', { recordTimeLeft: state.recordTimeLeft });
      try { pauseRecordingRef.current?.(); } catch { /* ignore */ }
      return;
    }
    recordTimerRef.current = setInterval(() => {
      const cur = stateRef.current;
      console.log('[Challenge] RECORDING tick', { recordTimeLeft: cur.recordTimeLeft, phase: cur.phase });
      if (cur.recordTimeLeft <= 1) {
        if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
        try { stopRecordingRef.current(); } catch { /* ignore */ }
        // In whole-script mode, skip the SCORING/SCORED UI per sentence.
        // The recorder hook still auto-scores each recording asynchronously;
        // the batch-eval watcher below collects them at ALL_DONE.
        if (cur.practiceMode === 'whole-script') {
          // Mark this sentence as "needed full time" → next sentence gets +5s
          dispatch({ type: 'RECORD_USED_FULL_TIME' });
          // Tiny delay to let stopRecording() fire onstop callback, then advance
          setTimeout(() => {
            const now = stateRef.current;
            if (now.currentIndex >= sentencesRef.current.length - 1) {
              // Last sentence done — go to BATCH_EVALUATING
              dispatch({ type: 'START_BATCH_EVAL' });
            } else {
              dispatchWithSentences({ type: 'ADVANCE_NEXT' });
            }
          }, 200);
        } else {
          dispatch({ type: 'RECORDING_STOPPED' });
        }
      } else {
        dispatch({ type: 'TICK_RECORD_TIMER' });
      }
    }, 1000);
    return () => {
      if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
    };
  }, [state.phase, state.isPaused, dispatchWithSentences]);

  // June 30 fix: when leaving a paused RECORDING state, resume the
  // MediaRecorder so the audio stream keeps capturing. The dispatch
  // sequence is RESUME → phase still RECORDING, isPaused=false → this
  // effect re-runs and starts the timer; here we wake the recorder.
  useEffect(() => {
    if (state.phase !== PHASES.RECORDING) return;
    if (state.isPaused) return;
    // Only re-invoke resumeRecording when we just unpaused (avoids
    // double-resume on initial mount).
    try { resumeRecordingRef.current?.(); } catch { /* ignore */ }
  }, [state.isPaused, state.phase]);

  // ── SCORED: per-sentence mode waits for user to click Redo or Next
  // (no auto-advance — user is in control, per design)
  useEffect(() => {
    if (state.phase !== PHASES.SCORED) return;
    // If we somehow reach SCORED in whole-script mode, force advance
    if (state.practiceMode === 'whole-script') {
      if (state.currentIndex >= sentences.length - 1) {
        dispatch({ type: 'FINISH' });
      } else {
        dispatchWithSentences({ type: 'ADVANCE_NEXT' });
      }
    }
    // Per-sentence mode: do nothing. User clicks Redo or Next button.
  }, [state.phase, state.practiceMode, state.currentIndex, sentences.length, dispatchWithSentences]);

  // ── Auto-advance tick (no longer used in per-sentence mode but kept
  //    for whole-script mode safety net) ──────────────────────────
  useEffect(() => {
    if (state.phase !== PHASES.SCORED) return;
    if (state.autoAdvanceTimeLeft <= 0) return;
    const t = setTimeout(() => {
      dispatch({ type: 'TICK_AUTO_ADVANCE' });
    }, 1000);
    return () => clearTimeout(t);
  }, [state.phase, state.autoAdvanceTimeLeft]);

  // ── BATCH_EVALUATING (whole-script mode only) ─────────────────
  // After the last sentence is recorded, wait for all Deepgram scores to arrive
  // in `recorder.scores`, then transition to ALL_DONE. Times out after 30s.
  //
  // CRITICAL: read `scores` via scoresRef (updated each render) — otherwise
  // the polling closure captures the value at effect-mount time and never sees
  // new scores arriving from the recorder hook. The effect dep array only
  // includes `state.phase` so the interval is set up exactly once per phase
  // entry; ref pattern gives latest scores without restarting the interval.
  const scoresRef = useRef(scores);
  useEffect(() => { scoresRef.current = scores; }, [scores]);

  useEffect(() => {
    if (state.phase !== PHASES.BATCH_EVALUATING) return;
    const total = sentences.length;
    let allDone = false;
    let timeoutId = null;

    const knownIds = [];
    for (let i = 0; i < total; i++) {
      const id = sentences[i]?.id;
      if (id != null) knownIds.push(id);
    }

    const checkAllScores = () => {
      if (allDone) return true;
      const s = stateRef.current;
      const currentScores = scoresRef.current || {};
      // Count how many have a score (in sessionScores or recorder.scores)
      const received = knownIds.filter(id =>
        s.sessionScores[id] || currentScores[id]
      ).length;
      return received >= total;
    };

    const finishBatch = () => {
      if (allDone) return;
      allDone = true;
      if (timeoutId) clearTimeout(timeoutId);
      dispatch({ type: 'BATCH_EVAL_DONE' });
      dispatch({ type: 'FINISH' });
    };

    if (checkAllScores()) {
      finishBatch();
      return;
    }
    const pollId = setInterval(() => {
      if (checkAllScores()) {
        clearInterval(pollId);
        finishBatch();
      }
    }, 500);
    timeoutId = setTimeout(() => {
      clearInterval(pollId);
      finishBatch();
    }, 30000);

    return () => {
      clearInterval(pollId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // ── ALL_DONE cleanup — release mic + stream unconditionally ────────
  // SAFETY NET: multiple paths to ALL_DONE (handleNext, handleSeeResults,
  // handleSkipAutoAdvance, finishBatch, SCORED auto-advance) can arrive
  // without stopRecording() having been called (phase already left
  // RECORDING by then). Without this, the MediaRecorder stream stays open
  // and the browser shows an active-microphone indicator.
  useEffect(() => {
    if (state.phase !== PHASES.ALL_DONE) return;
    try { stopRecordingRef.current(); } catch { /* ignore */ }
    // Bug 1 fix: clear retry mode so the Pause/play controls reset to idle
    // and don't keep flashing while the summary modal is open.
    // (handled at Shadowing.jsx level — challengeActive already gates it)
  }, [state.phase]);

  // ── Handlers ──────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    clearAllTimers();
    dispatch({ type: 'START_CHALLENGE' });
  }, [clearAllTimers]);

  const handleTryAgain = useCallback(() => {
    clearAllTimers();
    // Track that student is redoing — adaptive extension kicks in at redoCount >= 2
    dispatch({ type: 'RECORD_REDO' });
    dispatch({ type: 'RETRY_SAME' });
  }, [clearAllTimers]);

  const handleNext = useCallback(() => {
    clearAllTimers();
    const sent = sentencesRef.current[stateRef.current.currentIndex];
    if (!sent) return;
    if (stateRef.current.phase === PHASES.RECORDING) {
      try { stopRecordingRef.current(); } catch { /* ignore */ }
    }
    // In retry mode at the last wrong sentence → finish so summary reopens.
    if (stateRef.current.inRetryMode && stateRef.current.currentIndex >= sentencesRef.current.length - 1) {
      dispatch({ type: 'FINISH' });
    } else if (stateRef.current.currentIndex >= sentencesRef.current.length - 1) {
      dispatch({ type: 'FINISH' });
    } else {
      dispatchWithSentences({ type: 'SKIP_SENTENCE', sentenceId: sent.id });
    }
  }, [clearAllTimers, dispatchWithSentences]);

  const handleSkip = handleNext;  // alias for backwards compat with whole-script flow

  const handleStopEarly = useCallback(() => {
    if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
    try { stopRecordingRef.current(); } catch { /* ignore */ }
    dispatch({ type: 'RECORDING_STOPPED' });
  }, []);

  const handleSkipAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) { clearTimeout(autoAdvanceRef.current); autoAdvanceRef.current = null; }
    if (stateRef.current.currentIndex >= sentencesRef.current.length - 1) {
      dispatch({ type: 'FINISH' });
    } else {
      dispatchWithSentences({ type: 'ADVANCE_NEXT' });
    }
  }, [dispatchWithSentences]);

  const handleSeeResults = useCallback(() => {
    dispatch({ type: 'FINISH' });
  }, []);

  const handleRetryWrong = useCallback(() => {
    dispatchWithSentences({ type: 'RESET_FOR_RETRY' });
  }, [dispatchWithSentences]);

  // Inline Stop button calls handleStop → handleCancel. During RECORDING the
  // closure value of `isRecording` can be stale (recorder state flips between
  // render commits), so the previous `if (isRecording)` guard skipped the
  // stop call and the MediaRecorder kept running. stopRecording() is
  // idempotent (it checks mediaRecorderRef.current.state internally), so
  // call it unconditionally — matches handleStopEarly's pattern.
  const handleCancel = useCallback(() => {
    clearAllTimers();
    try { stopRecordingRef.current(); } catch { /* ignore */ }
    // June 30 fix: also stop any in-flight TTS audio from PLAY_TTS phase.
    // Without this, the audio element plays through to natural end before
    // the user perceives "pause" — they thought pause didn't work.
    try { VoiceService.pauseTTS(); } catch { /* ignore */ }
    try { VoiceService._shouldPauseNext = true; } catch { /* ignore */ }
    dispatch({ type: 'CLOSE' });
  }, [clearAllTimers]);

  // June 30 fix: pause-to-resume for the inline Play/Pause button during
  // a challenge. Unlike handleCancel, this preserves the current phase so
  // the user can resume from where they paused (e.g. mid-recording). Stops:
  //   - VoiceService TTS audio (PLAY_TTS phase)
  //   - All internal timers (pre-countdown, record, scoring, auto-advance,
  //     playTTS end-timer)
  //   - MediaRecorder (so the mic stream freezes)
  //   - YouTube video (seekPlayback-driven PLAY_TTS)
  // Effects then re-run when isPaused flips false (see resumeChallenge).
  const pauseChallenge = useCallback(() => {
    const cur = stateRef.current;
    if (cur.phase === PHASES.SETUP) return;  // nothing to pause
    console.log('[Challenge] pauseChallenge()', { phase: cur.phase, isPaused: cur.isPaused });
    // 1. Stop all challenge timers (countdown, record, scoring, auto-advance,
    //    playTTS endTimer). cleanAllTimers leaves phase/isPaused alone.
    clearAllTimers();
    // 2. Stop any in-flight TTS audio so user hears the audio cut.
    try { VoiceService.pauseTTS(); } catch { /* ignore */ }
    try { VoiceService._shouldPauseNext = true; } catch { /* ignore */ }
    // 3. Pause the YouTube video if seekPlayback started one.
    try { pauseVideoRef.current?.(); } catch { /* ignore */ }
    // 4. Pause the MediaRecorder if currently recording (no-op otherwise).
    try { pauseRecordingRef.current?.(); } catch { /* ignore */ }
    // 5. Flip isPaused via reducer. Effects that depend on isPaused will
    //    re-run and bail out (or set up resume hooks).
    dispatch({ type: 'PAUSE' });
  }, [clearAllTimers]);

  // June 30 fix: undo pauseChallenge — clear isPaused so all effects
  // re-run from their current phase. PLAY_TTS re-speaks the sentence
  // (speakText is fresh each time; TTS from the top is fine since the
  // sentence is short). COUNTDOWN_321 restarts the interval from the
  // current preCountdown value. RECORDING restarts the interval from
  // the current recordTimeLeft and MediaRecorder.resume() picks up the
  // paused stream.
  const resumeChallenge = useCallback(() => {
    const cur = stateRef.current;
    if (cur.phase === PHASES.SETUP) return;  // nothing to resume
    if (!cur.isPaused) return;                // already running
    console.log('[Challenge] resumeChallenge()', { phase: cur.phase, isPaused: cur.isPaused });
    // Clear the pause-next flag so any newly created audio can play.
    try { VoiceService._shouldPauseNext = false; } catch { /* ignore */ }
    dispatch({ type: 'RESUME' });
  }, []);

  return {
    // State
    state,
    PHASES,
    PASS_THRESHOLD,
    COUNTDOWN_OPTIONS,
    // Computed
    currentSentence: sentences[state.currentIndex],
    isLast: state.currentIndex >= sentences.length - 1,
    currentScore: state.currentIndex >= 0 && sentences[state.currentIndex]
      ? state.sessionScores[sentences[state.currentIndex].id]
      : null,
    // Merged scores for summary: sessionScores takes priority, falls back to recorder.scores
    // (used in whole-script mode where sessionScores is never populated)
    allScores: (() => {
      const merged = { ...scores, ...state.sessionScores };
      return merged;
    })(),
    batchEvalDoneCount: sentences.filter(s => s?.id != null && (state.sessionScores[s.id] || scores?.[s.id])).length,
    // Handlers
    handleStart,
    handleTryAgain,
    handleNext,
    handleSkip,           // alias for handleNext
    handleStopEarly,
    handleSkipAutoAdvance,
    handleSeeResults,
    handleRetryWrong,
    handleCancel,
    pauseChallenge,       // June 30 fix: pause-to-resume (TTS + timers + MediaRecorder + video)
    resumeChallenge,      // June 30 fix: undo pauseChallenge from current phase
    setCountdown: (v) => dispatch({ type: 'SET_COUNTDOWN_DURATION', value: v }),
    setPracticeMode,
  };
}
