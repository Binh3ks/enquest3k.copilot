import React, { useEffect, useRef } from 'react';

/**
 * YouTubeEmbed — Embeds a YouTube video via the IFrame Player API.
 * View-only mode: student watches the video for context.
 */
export default function YouTubeEmbed({ videoId }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    // Load YouTube IFrame API if not already loaded
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
      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            fs: 1,
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
      }
    };
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
