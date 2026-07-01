import { useState, useEffect, useCallback } from 'react';

/**
 * useShadowingYouTubeBridge — Owns the YouTube IFrame player lifecycle.
 *
 * The YouTube IFrame API has three known ways to subscribe to the
 * player's state:
 *   1. `player.addEventListener('onStateChange', ...)` (modern IFrame API)
 *   2. `player.onStateChange = function(e) { ... }` (legacy assignment)
 *   3. `setInterval(poll getPlayerState, 500ms)` (ultimate fallback)
 *
 * This hook attaches all three in order so Shadowing works regardless
 * of which version of the IFrame API the user's browser loads.
 *
 * TDZ ordering: `ytPlayerRef` must be created BEFORE both
 * `useShadowingPlayer` (consumes the ref to write into) and this hook
 * (mirrors the loaded `ytPlayer` state into the ref). The ref itself
 * stays in Shadowing.jsx; this hook owns the loaded API object, the
 * playback-state boolean, and the two callbacks.
 *
 * Args:
 *   ytPlayerRef: useRef<YT.Player|null> — Shadowing.jsx passes the ref
 *                 so `useShadowingPlayer` can also write to it.
 *   player.reportVideoState, player.speed — read for setup + rate sync.
 *
 * Returns: { ytPlayer, ytPlayerState, handleYtPlayerReady, handleYtPlayerUnloaded }
 */

// YouTube IFrame API only supports these playback rate values — it
// silently ignores anything else. Snap to the nearest one so the user's
// speed selector (0.65x, 0.75x, 0.85x, 1.0x, 1.25x) takes effect.
const SUPPORTED_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
function snapToSupportedRate(rate) {
  return SUPPORTED_RATES.reduce((best, r) =>
    Math.abs(r - rate) < Math.abs(best - rate) ? r : best
  );
}

export function useShadowingYouTubeBridge(ytPlayerRef, player) {
  const [ytPlayer, setYtPlayer] = useState(null);
  const [ytPlayerState, setYtPlayerState] = useState('other'); // 'playing' | 'paused' | 'other'

  // Mirror ytPlayer into ref for stable access in callbacks. Lives here
  // (not in Shadowing.jsx) because this hook owns ytPlayer state.
  useEffect(() => { ytPlayerRef.current = ytPlayer; }, [ytPlayer, ytPlayerRef]);

  const handleYtPlayerReady = useCallback((playerApi) => {
    setYtPlayer(playerApi);
    // Sync playback rate to current speed on mount (player defaults to 1.0x)
    if (playerApi?.setPlaybackRate) {
      try { playerApi.setPlaybackRate(snapToSupportedRate(player.speed)); } catch { /* not ready */ }
    }
    // Hook up onStateChange to track video play/pause state and report to player hook
    // Method 1: addEventListener (modern YouTube IFrame API)
    if (playerApi?.addEventListener) {
      try {
        playerApi.addEventListener('onStateChange', (e) => {
          try {
            // e.data: 0=ended, 1=playing, 2=paused, 3=buffering, 5=cued
            const data = e?.data;
            const state = data === 1 ? 'playing' : data === 2 ? 'paused' : 'other';
            setYtPlayerState(state);
            player.reportVideoState?.(state);
          } catch (innerErr) {
            console.warn('[YTBridge] onStateChange handler error:', innerErr);
          }
        });
      } catch { /* ignore */ }
    }
    // Method 2: legacy onStateChange assignment (fallback for older IFrame API)
    if (playerApi?.onStateChange !== undefined || !playerApi?.addEventListener) {
      try {
        playerApi.onStateChange = (e) => {
          try {
            const data = e?.data;
            const state = data === 1 ? 'playing' : data === 2 ? 'paused' : 'other';
            setYtPlayerState(state);
            player.reportVideoState?.(state);
          } catch { /* ignore */ }
        };
      } catch { /* ignore */ }
    }
    // Method 3: poll getPlayerState() every 500ms as ultimate fallback
    const pollId = setInterval(() => {
      try {
        if (playerApi?.getPlayerState) {
          const s = playerApi.getPlayerState();
          const state = s === 1 ? 'playing' : s === 2 ? 'paused' : 'other';
          setYtPlayerState(state);
          player.reportVideoState?.(state);
        }
      } catch { /* ignore */ }
    }, 500);
    if (playerApi) playerApi.__pollId = pollId;
  }, [player]);

  // Keep YouTube playback rate in sync with the speed selector.
  useEffect(() => {
    if (ytPlayer?.setPlaybackRate) {
      try { ytPlayer.setPlaybackRate(snapToSupportedRate(player.speed)); } catch { /* not ready */ }
    }
  }, [ytPlayer, player.speed]);

  const handleYtPlayerUnloaded = useCallback(() => {
    // Clean up polling interval if set
    if (ytPlayer?.__pollId) {
      clearInterval(ytPlayer.__pollId);
    }
    setYtPlayer(null);
  }, [ytPlayer]);

  return {
    ytPlayer,
    ytPlayerState,
    handleYtPlayerReady,
    handleYtPlayerUnloaded,
  };
}
