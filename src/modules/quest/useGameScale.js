/**
 * useGameScale.js — Shared hook for scaling platform mini-games to mobile screens.
 *
 * Usage:
 *   const { containerRef, scaleStyle, scale } = useGameScale(ROOM_WIDTH, ROOM_HEIGHT);
 *   // Apply scaleStyle to the inner game world div
 *   // scale is the numeric ratio (e.g. 0.43 on 390px phone)
 *
 * The hook measures the container and calculates the correct CSS transform scale
 * so the ROOM_WIDTH × ROOM_HEIGHT game world fits perfectly inside the container.
 * It also sets `--game-scale` CSS variable for CSS-only consumers.
 */

import { useRef, useEffect, useCallback, useState } from 'react';

export default function useGameScale(roomWidth, roomHeight) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const recalculate = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    // fit-inside scaling: maintain aspect ratio, never exceed container
    const sx = width / roomWidth;
    const sy = height / roomHeight;
    const newScale = Math.min(sx, sy, 1); // Never upscale beyond 1:1
    setScale(newScale);
    el.style.setProperty('--game-scale', newScale.toString());
  }, [roomWidth, roomHeight]);

  useEffect(() => {
    recalculate();
    const ro = new ResizeObserver(recalculate);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalculate]);

  const scaleStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: `${roomWidth}px`,
    height: `${roomHeight}px`,
    position: 'absolute',
    top: 0,
    // Center horizontally when scale < 1
    left: `${(1 - scale) * roomWidth / 2 * -1}px`,
  };

  return { containerRef, scaleStyle, scale };
}
