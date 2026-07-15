import { useMemo, useRef, useEffect } from 'react';
import { getSpeechWindow } from '../modules/shadowing/useWordHighlight';

/**
 * useShadowingVideoSync — Video-time → active-segment tracking + word-level sync.
 *
 * Two responsibilities:
 *
 *   1. Derive `videoActive` (whether karaoke + active-segment tracking
 *      should run) from `videoPopupOpen || (videoInline && !!videoId)`.
 *
 *   2. Run a 100ms polling effect that:
 *      - Updates lastActiveId so the karaoke word-level highlight tracks.
 *      - When wait-mode is set with a non-trivial gap between this segment's
 *        end and the next segment's start, briefly pauses the YouTube video
 *        to give the learner time to read the next sentence.
 *
 * TDZ ordering: must be called AFTER `useShadowingChallenge` and after
 * `challengeActive` is computed. Uses `effectiveScript` derived in Shadowing.jsx
 * — passed as an arg so this hook stays decoupled from Shadowing internals.
 *
 * Args:
 *   effectiveScript: Array — the resolved script (cleanedTranscriptSentences
 *     when useTranscriptSource=true, else lesson script).
 *   ytPlayer: YouTube IFrame player API (null until ready).
 *   useTranscriptSource: boolean — true when in video mode.
 *   challengeActive: boolean — guards setSelectedId writes during challenge.
 *   videoInline, videoPopupOpen, videoId — derive videoActive.
 *   currentVideoTime: number — player.currentVideoTime (seconds).
 *   setSelectedId: setter — where RightPanel highlight goes.
 *   settingsWaitMode: string — 'off' | 'manual' | '30%' | '60%' | '120%' etc.
 *
 * Returns: { videoActive }
 */

export function useShadowingVideoSync({
  effectiveScript,
  ytPlayer,
  useTranscriptSource,
  isChallengeActive,
  videoInline,
  videoPopupOpen,
  videoId,
  currentVideoTime,
  setSelectedId,
  settingsWaitMode,
}) {
  // isChallengeActive is a callback (`() => boolean`) instead of a value
  // because challengeActive isn't computed at the hook call site (it comes
  // from useShadowingChallenge which is called AFTER useShadowingVideoSync
  // in Shadowing.jsx to break the TDZ cycle on challenge refs). The getter
  // is read on demand inside the segment-tracker effect below — the
  // current render's value is what matters, not what was captured.
  const getChallengeActive = typeof isChallengeActive === 'function'
    ? isChallengeActive
    : () => false;

  // Mirror of effectiveScript ref so the polling interval (defined below)
  // can read the latest segments without re-mounting every render.
  const effectiveScriptRef = useRef(effectiveScript);
  useEffect(() => { effectiveScriptRef.current = effectiveScript; }, [effectiveScript]);

  // videoActive = karaoke + active-segment tracker should work whether the
  // YouTube video is inline OR in the floating popup.
  const videoActive = useMemo(() =>
    videoPopupOpen || (videoInline && !!videoId),
    [videoPopupOpen, videoInline, videoId]
  );

  // Active sentence tracking is done ENTIRELY by the 100ms sync interval
  // below (which calls setSelectedId directly). Do NOT add a second source
  // here — when two effects race to setSelectedId for overlapping segments,
  // the slower one (driven by currentVideoTime which updates at 300ms) can
  // flash an older segment id, causing the right panel highlight to LAG
  // behind the actual cursor position. (V9 only had the sync interval and
  // it worked correctly — this useMemo + useEffect was a post-refactor
  // regression that was reverted in commit X.)

  // Sync active sentence with YouTube playback time + wait-mode pause.
  // Algorithm: pick the sentence whose [start, end] window contains t.
  // When multiple sentences overlap (common in ASR auto-captions), prefer
  // the NEWEST in-progress sentence — the one that started closest to
  // currentTime. This handles overlap correctly because ASR gives the
  // newer speech segment a start time very close to the actual utterance.
  useEffect(() => {
    if (!videoActive || !ytPlayer || !useTranscriptSource) return;
    let lastActiveId = null;
    let pausedAtEnd = -1;  // segment.id whose end we paused at; -1 = not paused

    const interval = setInterval(() => {
      const t = ytPlayer.getCurrentTime();
      if (typeof t !== 'number') return;
      const script = effectiveScriptRef.current;

      // Find active sentence: prefer newest in-progress (max start ≤ t, end > t)
      let best = null;
      let bestStart = -Infinity;
      for (const s of script) {
        const win = getSpeechWindow(s);
        if (win.start <= t + 0.1 && win.end > t - 0.1) {
          if (win.start > bestStart) {
            best = s;
            bestStart = win.start;
          }
        }
      }
      // Fallback: no in-progress sentence. Find last start <= t.
      if (!best) {
        let lastStart = -Infinity;
        for (const s of script) {
          if (s.start <= t + 0.1 && s.start > lastStart) {
            best = s;
            lastStart = s.start;
          }
        }
      }
      if (best && best.id !== lastActiveId) {
        setSelectedId(best.id);
        lastActiveId = best.id;
      }

      // Wait-mode pause: only activate when there is a meaningful gap
      // between this sentence's end and the next sentence's start.
      // June 30 fix #2: raise gap threshold from 0.5s → 1.0s AND cap waitMs
      // at min(gap, 1.5s). Old behavior: any gap ≥ 0.5s paused the video, and
      // waitMode '120%' on a 5s gap produced 6s of silence — perceived as
      // choppy/ngắt quãng. With this fix, sentences with natural short
      // gaps (< 1s) flow straight through; even at 120% waitMode, the audio
      // never pauses longer than the gap itself, capped at 1.5s absolute.
      // Skip wait-mode pause when challenge is active — challenge has its
      // own endTimer to control pause; double-pausing causes "nghẽn".
      if (best && pausedAtEnd !== best.id && !getChallengeActive()) {
        const curIdx = script.findIndex(s => s.id === best.id);
        const nextSeg = curIdx >= 0 ? script[curIdx + 1] : null;
        const curEnd = best.start + (best.duration || 0);
        const gap = nextSeg ? (nextSeg.start - curEnd) : Infinity;
        if (gap >= 1.0) {
          pausedAtEnd = best.id;
          const waitMode = settingsWaitMode || 'off';
          let waitMs = 0;
          if (waitMode === 'off' || waitMode === 'manual') waitMs = 0;
          else {
            const m = String(waitMode).match(/(\d+)%/);
            if (m) waitMs = gap * 1000 * (parseInt(m[1], 10) / 100);
          }
          // Cap waitMs so audio never goes silent longer than the natural
          // gap, with a 1.5s absolute max as a safety net.
          if (waitMs > 0) waitMs = Math.min(waitMs, gap * 1000, 1500);
          if (waitMs > 0) {
            try { ytPlayer.pauseVideo(); } catch {}
            setTimeout(() => {
              const nextWin = getSpeechWindow(nextSeg);
              try { ytPlayer.seekTo(nextWin.start, true); } catch {}
              try { ytPlayer.playVideo(); } catch {}
              pausedAtEnd = -1;
            }, waitMs);
          }
        }
      }
    }, 100);  // Faster polling for smoother karaoke
    return () => {
      clearInterval(interval);
      lastActiveId = null;
      pausedAtEnd = -1;
    };
  }, [videoActive, ytPlayer, useTranscriptSource, settingsWaitMode]);

  return { videoActive };
}
