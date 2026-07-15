import { useCallback, useRef, useEffect } from 'react';
import { VoiceService } from '../services/voiceService';

/**
 * useShadowingPlayPause — Inline Play/Pause master + universal stop.
 *
 * The inline Play/Pause button is the universal control: it pauses
 * whatever is currently playing (TTS, YouTube video, OR an active
 * recording challenge). It is a 4-case state machine:
 *
 *   case 0:   challenge active + paused       → resume challenge
 *   case 0.5: challenge active + not paused   → pause challenge
 *   case 1:   paused (non-challenge)          → resume player
 *   case 2:   playing (non-challenge)         → pause player
 *   case 3:   idle + activeId set            → playSentence(activeId)
 *   case 3:   idle + no activeId + TTS mode  → playAll(effectiveScript)
 *   case 3:   idle + no activeId + video     → seekPlayback(effectiveScript[0].id)
 *
 * Two ref-mirrors (`challengeActiveRef`, `challengeIsPausedRef`) are
 * maintained alongside the hook so the click handler reads the FRESH
 * value at click time. Without these, the closure captures stale state
 * and the first frame after `START_CHALLENGE` clicks dispatch to the
 * wrong branch (player.pause() instead of pauseChallenge), letting the
 * audio keep playing. This bug recurred multiple times before the
 * ref-mirror pattern was made explicit.
 *
 * Args:
 *   player, recorder, challenge           — hook returns
 *   ytPlayerRef                          — ref into YouTube IFrame player
 *   useTranscriptSource, videoActive, ytPlayer, videoTranscript
 *   effectiveScript, activeId, setSelectedId
 *   seekPlayback, getTextForId
 *   challengeActive, challengeDone
 *
 * Returns: { handlePlayPause, handleStop }
 */

export function useShadowingPlayPause({
  player,
  recorder,
  challenge,
  ytPlayerRef,
  useTranscriptSource,
  videoActive,
  ytPlayer,
  videoTranscript,
  effectiveScript,
  activeId,
  setSelectedId,
  seekPlayback,
  getTextForId,
  challengeActive,
  challengeDone,
}) {
  // June 30 fix: pause-to-resume — mirror challengeActive into a ref so
  // handlePlayPause reads the FRESH value at click time. Without this,
  // the closure captures a stale challengeActive and a click during the
  // first frame after START_CHALLENGE dispatches to the wrong branch
  // (player.pause() instead of pauseChallenge), letting the audio keep
  // playing. The ref updates on every render after the state changes.
  const challengeActiveRef = useRef(challengeActive);
  useEffect(() => { challengeActiveRef.current = challengeActive; }, [challengeActive]);

  const challengeIsPausedRef = useRef(challenge.state.isPaused);
  useEffect(() => { challengeIsPausedRef.current = challenge.state.isPaused; }, [challenge.state.isPaused]);

  // Mirror challengeDone into a ref so handlePlayPause reads the freshest
  // value at click time. Without this, when the challenge reaches ALL_DONE
  // the inline Play/Pause button keeps toggling isPaused (which has been
  // reset) and visually flashes pause/play forever — the button looks broken
  // even though the summary modal has appeared.
  const challengeDoneRef = useRef(challengeDone);
  useEffect(() => { challengeDoneRef.current = challengeDone; }, [challengeDone]);

  // Debounce: prevent multiple calls within 200ms
  const lastCallRef = useRef({ time: 0, threadId: null });
  
  const handlePlayPause = useCallback(() => {
    // Debounce rapid calls (click spam or React StrictMode)
    const now = Date.now();
    const timeSinceLastCall = now - lastCallRef.current.time;
    const currentThreadId = `${now}-${Math.random().toString(36).substr(2, 5)}`;
    
    if (timeSinceLastCall < 500) {
      console.log('[PlayPause] DEBOUNCE: ignored call within', timeSinceLastCall, 'ms');
      return;
    }
    lastCallRef.current = { time: now, threadId: currentThreadId };
    
    // 4-case machine: pause / resume / start. The inline button is the
    // master control — it pauses whatever is currently playing (TTS,
    // YouTube video, OR an active recording challenge).
    const freshChallengeActive = challengeActiveRef.current;
    const freshChallengeIsPaused = challengeIsPausedRef.current;
    console.log('[PlayPause] clicked', {
      isPaused: player.isPaused,
      isPlayingAll: player.isPlayingAll,
      activeSentenceId: player.activeSentenceId,
      videoIsPlaying: player.videoIsPlaying,
      activeId,
      useTranscriptSource,
      challengePhase: challenge.state.phase,
      challengeActive: freshChallengeActive,
      challengeIsPaused: freshChallengeIsPaused,
      recorderIsRecording: recorder.isRecording,
      recorderActiveRecordId: recorder.activeRecordId,
    });

    // ── 1. Challenge-first ownership: when challenge is active, the inline
    // Play/Pause button MUST control challenge state directly (never player).
    // This avoids race conditions where player.isPaused temporarily disagrees
    // with challenge.isPaused and clicks are dropped.
    // NOTE: challengeActive stays true after phase reaches ALL_DONE so the
    // challenge hook can reset, but the inline Play/Pause button must NOT
    // toggle pause state at that point — otherwise it would "flash" pause
    // forever. We treat challengeDone as inactive for the button.
    const freshChallengeDone = challengeDoneRef.current;
    if (freshChallengeActive && !freshChallengeDone) {
      if (freshChallengeIsPaused) {
        console.log('[PlayPause] → case 0 (challenge resume)');
        try { VoiceService._shouldPauseNext = false; } catch { /* ignore */ }
        challenge.resumeChallenge();
      } else {
        console.log('[PlayPause] → case 0.5 (challenge pause)');
        try { VoiceService.pauseTTS(); } catch { /* ignore */ }
        try { VoiceService._shouldPauseNext = true; } catch { /* ignore */ }
        if (ytPlayerRef.current?.pauseVideo) {
          try { ytPlayerRef.current.pauseVideo(); } catch { /* ignore */ }
        }
        challenge.pauseChallenge();
      }
      return;
    }
    // ── 2. If currently paused (non-challenge) → resume from where it stopped
    if (player.isPaused) {
      console.log('[PlayPause] → case 1 (resume)');
      player.resume();
      return;
    }
    // ── 3. If currently playing → pause.
    if (player.isPlayingAll || player.activeSentenceId != null) {
      console.log('[PlayPause] → case 2 (pause)', {
        freshChallengeActive,
        challengePhase: challenge.state.phase,
        activeSentenceId: player.activeSentenceId,
      });
      // IMMEDIATE audio/video cutoff (defensive — does what pauseTTS +
      // pauseVideo already do, but ensures it always runs).
      try { VoiceService.pauseTTS(); } catch { /* ignore */ }
      try { VoiceService._shouldPauseNext = true; } catch { /* ignore */ }
      if (ytPlayerRef.current?.pauseVideo) {
        try { ytPlayerRef.current.pauseVideo(); } catch { /* ignore */ }
      }
      player.pause();
      return;
    }
    // ── 4. If idle → start playing
    console.log('[PlayPause] → case 4 (start)');
    if (activeId) {
      if (seekPlayback(activeId)) return;
      const text = getTextForId(activeId);
      if (text) player.playSentence(activeId, text);
    } else if (effectiveScript.length > 0) {
      if (useTranscriptSource && videoActive && ytPlayerRef.current) {
        // Transcript mode + video ready → video only, no TTS
        seekPlayback(effectiveScript[0].id);
        setSelectedId(effectiveScript[0].id);
      } else if (useTranscriptSource) {
        // Transcript mode but video not ready. Stay idle until YouTube
        // reports ready — don't fall through to TTS (user expects video).
        console.log('[PlayPause] case 4 — transcript source on but ytPlayer not ready, skipping playback');
        player.stop();
      } else {
        // TTS mode (default): play through ALL sentences in sequence.
        player.playAll(effectiveScript);
      }
    }
  }, [player, activeId, effectiveScript, getTextForId, seekPlayback, videoActive, useTranscriptSource, challenge, challengeActive, challengeDone, recorder, ytPlayerRef]);

  // Handle stop — kills ALL playback: TTS, video, AND any active challenge mode.
  // The inline Stop button is the universal "stop everything" action.
  const handleStop = useCallback(() => {
    console.log('[Stop] handleStop (inline Stop button)', {
      challengeActive, challengePhase: challenge.state.phase,
      activeSentenceId: player.activeSentenceId, isPaused: player.isPaused,
      recorderIsRecording: recorder.isRecording,
    });
    if (challengeActive) {
      challenge.handleCancel();
    }
    player.stop();
    setSelectedId(null);
  }, [player, challengeActive, challenge, recorder, setSelectedId]);

  return {
    handlePlayPause,
    handleStop,
  };
}
