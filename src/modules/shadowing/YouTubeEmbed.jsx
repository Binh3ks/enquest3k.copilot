import React, { useEffect, useRef, useCallback } from 'react';

/**
 * YouTubeEmbed — Embeds a YouTube video via the IFrame Player API.
 * Exposes player control via onPlayerReady callback.
 */
export default function YouTubeEmbed({ videoId, onPlayerReady, onPlayerUnloaded }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const readyFiredRef = useRef(false);

  const seekTo = useCallback((seconds) => {
    const p = playerRef.current;
    if (p && typeof p.seekTo === 'function') {
      p.seekTo(seconds, true);
      try { p.playVideo(); } catch {}
    }
  }, []);

  // loadAndPlay: load video at specific time and start playback.
  // YouTube resets playbackRate to 1.0 on loadVideoById, so we must reapply
  // the stored rate after the load. Use onStateChange(PLAYING) to catch
  // the moment when the rate is applied.
  const playbackRateRef = useRef(null);
  const loadAndPlay = useCallback((startSeconds) => {
    const p = playerRef.current;
    if (!p || typeof p.loadVideoById !== 'function') return;
    
    // Cancel any pending playVideo calls
    if (p._pendingPlayTimeout) {
      clearTimeout(p._pendingPlayTimeout);
      p._pendingPlayTimeout = null;
    }
    
    p.loadVideoById({ videoId, startSeconds });
    
    // Wait for player to be ready (buffering → ready) before playing
    // Without this, playVideo might be called while player is still buffering
    const checkAndPlay = () => {
      const state = p.getPlayerState?.();
      // State 3 = buffering, 2 = paused, -1 = unstarted
      if (state === 3 || state === -1) {
        // Still buffering, wait and retry
        p._pendingPlayTimeout = setTimeout(checkAndPlay, 50);
        return;
      }
      // Ready to play (state 1 = playing, 2 = paused, 5 = cued)
      p._pendingPlayTimeout = null;
      
      // Reapply playback rate
      const rate = playbackRateRef.current;
      if (rate && rate !== 1 && p.setPlaybackRate) {
        try { p.setPlaybackRate(rate); } catch {}
      }
      
      try { p.playVideo(); } catch {}
    };
    
    // Start checking after a brief delay to let loadVideoById initialize
    p._pendingPlayTimeout = setTimeout(checkAndPlay, 100);
  }, [videoId]);

  const playVideo = useCallback(() => {
    const p = playerRef.current;
    if (p && typeof p.playVideo === 'function') p.playVideo();
  }, []);

  const pauseVideo = useCallback(() => {
    const p = playerRef.current;
    if (p && typeof p.pauseVideo === 'function') p.pauseVideo();
  }, []);

  const getCurrentTime = useCallback(() => {
    const p = playerRef.current;
    if (p && typeof p.getCurrentTime === 'function') return p.getCurrentTime();
    return 0;
  }, []);

  // setPlaybackRate: change YouTube playback speed (e.g. 0.75x).
  // Stores rate in ref so loadAndPlay can reapply it after YT resets.
  const setPlaybackRate = useCallback((rate) => {
    playbackRateRef.current = rate;
    const p = playerRef.current;
    if (p && typeof p.setPlaybackRate === 'function') {
      try {
        p.setPlaybackRate(rate);
        // Verify what YouTube actually accepted
        setTimeout(() => {
          const actual = p.getPlaybackRate ? p.getPlaybackRate() : null;
          console.log(`[YouTubeEmbed] setPlaybackRate(${rate}) → actual=${actual}`);
        }, 100);
      } catch { /* not ready */ }
    }
  }, []);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }
      if (!document.getElementById('yt-shadowing-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-shadowing-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYT);
          createPlayer();
        }
      }, 200);
      return () => clearInterval(checkYT);
    };

    function createPlayer() {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* ignore */ }
      }
      readyFiredRef.current = false;
      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            fs: 1,
            cc_load_policy: 1,
            cc_lang_pref: 'en',
          },
          events: {
            onReady: () => {
              console.log('[YouTubeEmbed] onReady fired! videoId:', videoId);
              if (onPlayerReady && !readyFiredRef.current) {
                readyFiredRef.current = true;
                onPlayerReady({ seekTo, loadAndPlay, playVideo, pauseVideo, getCurrentTime, setPlaybackRate });
              }
            },
          },
        });
      } catch (err) {
        console.warn('[YouTubeEmbed] Player creation failed:', err);
      }
    }

    const cleanup = loadAPI();
    return () => {
      if (typeof cleanup === 'function') cleanup();
      if (playerRef.current) {
        // Clear any pending play timeout
        if (playerRef.current._pendingPlayTimeout) {
          clearTimeout(playerRef.current._pendingPlayTimeout);
          playerRef.current._pendingPlayTimeout = null;
        }
        try { playerRef.current.destroy(); } catch { /* ignore */ }
        playerRef.current = null;
        if (onPlayerUnloaded) onPlayerUnloaded();
      }
    };
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
