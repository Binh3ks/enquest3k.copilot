import { useState, useRef, useCallback, useEffect } from 'react';
import VoiceService from '../services/voiceService';

/**
 * useFlyersListeningPlayer
 *
 * Authoritative Cambridge A2 Flyers Two-Play Listening Loop & Rubric Hook.
 *
 * Official Sequence:
 *   [IDLE]
 *     ↓ (User clicks Play)
 *   [PLAYING_1] (Plays Audio Asset X — 1st Listen)
 *     ↓ (Play 1 ends)
 *   [RUBRIC_REPLAY] (Examiner: "Now listen to Part X again." — audio/cambridge/flyers_replay_pX.mp3)
 *     ↓ (Rubric ends)
 *   [PAUSING] (3-second short pause)
 *     ↓ (Pause ends)
 *   [PLAYING_2] (Plays EXACT SAME Audio Asset X — 2nd Listen)
 *     ↓ (Play 2 ends)
 *   [RUBRIC_CLOSING] (Examiner: "That is the end of Part X." — audio/cambridge/flyers_end_pX.mp3)
 *     ↓ (Closing ends)
 *   [COMPLETED] (Official 2-play cycle complete)
 *
 * @param {Object} options
 * @param {number|string} options.partNumber - 1 | 2 | 3 | 4 | 5
 * @param {string} options.audioUrl - Canonical static audio MP3 URL
 * @param {string} options.script - Canonical spoken text / dialogue script
 * @param {number} [options.weekNumber=33] - Week number for audio routing
 * @param {string} [options.station='questions'] - Station identifier for VoiceService
 * @param {number} [options.pauseMs=3000] - Pause between plays in ms (default 3000ms = 3s)
 * @param {function} [options.onComplete] - Callback fired when the 2-play sequence finishes
 */
export function useFlyersListeningPlayer({
  partNumber = 1,
  audioUrl,
  script,
  weekNumber = 33,
  station = 'questions',
  pauseMs = 3000,
  onComplete
}) {
  // Normalize part number to integer 1-5
  const cleanPartNum = typeof partNumber === 'string'
    ? parseInt(partNumber.replace(/\D/g, '') || '1', 10)
    : (partNumber || 1);

  // States: 'idle' | 'playing_1' | 'rubric_replay' | 'pausing' | 'playing_2' | 'rubric_closing' | 'completed'
  const [playStatus, setPlayStatus] = useState('idle');
  const [pauseCountdown, setPauseCountdown] = useState(0);
  const abortRef = useRef(false);

  // Rubric static audio paths
  const replayAudioUrl = `/audio/cambridge/flyers_replay_p${cleanPartNum}.mp3`;
  const replayScript = `Now listen to Part ${cleanPartNum} again.`;
  const closingAudioUrl = `/audio/cambridge/flyers_end_p${cleanPartNum}.mp3`;
  const closingScript = `That is the end of Part ${cleanPartNum}.`;

  const isPlaying = playStatus !== 'idle' && playStatus !== 'completed';

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current = true;
      VoiceService.stopAudio();
    };
  }, []);

  const stop = useCallback(() => {
    abortRef.current = true;
    VoiceService.stopAudio();
    setPlayStatus('idle');
    setPauseCountdown(0);
  }, []);

  const startTwoPlayLoop = useCallback(async () => {
    if (isPlaying) {
      stop();
      return;
    }

    abortRef.current = false;
    const targetAudioUrl = audioUrl;
    const targetScript = script || `Listening Part ${cleanPartNum}`;

    try {
      // ── STEP 1: FIRST PLAY ──────────────────────────────────────────────────
      setPlayStatus('playing_1');
      console.log(`[FlyersListeningPlayer] 🎧 Part ${cleanPartNum} — Starting 1st Play: ${targetAudioUrl}`);
      await VoiceService.speak(targetScript, station, targetAudioUrl, weekNumber);

      if (abortRef.current) return;

      // ── STEP 2: EXAMINER REPLAY RUBRIC AUDIO ─────────────────────────────────
      setPlayStatus('rubric_replay');
      console.log(`[FlyersListeningPlayer] 🗣️ Part ${cleanPartNum} — Playing Replay Rubric: "${replayScript}"`);
      await VoiceService.speak(replayScript, 'rubric', replayAudioUrl, weekNumber);

      if (abortRef.current) return;

      // ── STEP 3: SHORT PAUSE (3 SECONDS) ──────────────────────────────────────
      setPlayStatus('pausing');
      const totalSeconds = Math.ceil(pauseMs / 1000);
      setPauseCountdown(totalSeconds);

      for (let s = totalSeconds; s > 0; s--) {
        setPauseCountdown(s);
        if (abortRef.current) return;
        await new Promise(r => setTimeout(r, 1000));
        if (abortRef.current) return;
      }
      setPauseCountdown(0);

      // ── STEP 4: SECOND PLAY (EXACT SAME AUDIO ASSET) ─────────────────────────
      setPlayStatus('playing_2');
      console.log(`[FlyersListeningPlayer] 🎧 Part ${cleanPartNum} — Starting 2nd Play (EXACT SAME ASSET): ${targetAudioUrl}`);
      await VoiceService.speak(targetScript, station, targetAudioUrl, weekNumber);

      if (abortRef.current) return;

      // ── STEP 5: EXAMINER CLOSING RUBRIC AUDIO ────────────────────────────────
      setPlayStatus('rubric_closing');
      console.log(`[FlyersListeningPlayer] 🗣️ Part ${cleanPartNum} — Playing Closing Rubric: "${closingScript}"`);
      await VoiceService.speak(closingScript, 'rubric', closingAudioUrl, weekNumber);

      if (abortRef.current) return;

      // ── STEP 6: SEQUENCE COMPLETED ───────────────────────────────────────────
      setPlayStatus('completed');
      console.log(`[FlyersListeningPlayer] ✅ Part ${cleanPartNum} — Official Two-Play Sequence Complete.`);
      if (onComplete) onComplete();

      // Reset to idle after 4s for subsequent manual review if desired
      setTimeout(() => {
        if (!abortRef.current) {
          setPlayStatus('idle');
        }
      }, 4000);

    } catch (err) {
      console.warn(`[FlyersListeningPlayer] Playback error:`, err);
      setPlayStatus('idle');
    }
  }, [
    isPlaying,
    stop,
    cleanPartNum,
    audioUrl,
    script,
    station,
    weekNumber,
    replayScript,
    replayAudioUrl,
    pauseMs,
    closingScript,
    closingAudioUrl,
    onComplete
  ]);

  // Derived status display text
  let statusText = 'Play Audio (2×)';
  let badgeColor = 'bg-amber-400 text-slate-950';

  switch (playStatus) {
    case 'playing_1':
      statusText = 'Playing: 1st Listen (1/2)';
      badgeColor = 'bg-emerald-500 text-white animate-pulse';
      break;
    case 'rubric_replay':
      statusText = `Examiner: "Now listen to Part ${cleanPartNum} again."`;
      badgeColor = 'bg-indigo-600 text-white animate-pulse';
      break;
    case 'pausing':
      statusText = `Pause (${pauseCountdown}s)...`;
      badgeColor = 'bg-amber-500 text-white';
      break;
    case 'playing_2':
      statusText = 'Playing: 2nd Listen (2/2)';
      badgeColor = 'bg-emerald-600 text-white animate-pulse';
      break;
    case 'rubric_closing':
      statusText = `Examiner: "That is the end of Part ${cleanPartNum}."`;
      badgeColor = 'bg-purple-600 text-white animate-pulse';
      break;
    case 'completed':
      statusText = `Part ${cleanPartNum} Audio Complete (2/2)`;
      badgeColor = 'bg-slate-800 text-emerald-400';
      break;
    default:
      statusText = 'Play Audio (2×)';
      badgeColor = 'bg-amber-400 hover:bg-amber-300 text-slate-950';
  }

  return {
    playStatus,
    isPlaying,
    isCompleted: playStatus === 'completed',
    currentPlayCount: (playStatus === 'playing_1' || playStatus === 'rubric_replay') ? 1 : ((playStatus === 'playing_2' || playStatus === 'rubric_closing' || playStatus === 'completed') ? 2 : 0),
    pauseCountdown,
    statusText,
    badgeColor,
    togglePlay: startTwoPlayLoop,
    stop
  };
}

export default useFlyersListeningPlayer;
