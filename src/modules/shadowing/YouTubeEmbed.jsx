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
  // loadVideoById alone often stays paused under browser autoplay policy;
  // explicitly call playVideo() right after to guarantee the seek advances.
  const loadAndPlay = useCallback((startSeconds) => {
    const p = playerRef.current;
    if (!p || typeof p.loadVideoById !== 'function') return;
    p.loadVideoById({ videoId, startSeconds });
    try { p.playVideo(); } catch { /* player not ready yet — YT will auto-play after load */ }
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
                onPlayerReady({ seekTo, loadAndPlay, playVideo, pauseVideo, getCurrentTime });
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
