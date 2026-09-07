/**
 * WordCrystal.jsx — Floating collectible word orb for Lexio's Quest
 * GDD §1.3 — "N word crystals nổi trong phòng, Leo di chuyển đến gần → PULSE/GLOW"
 */
import React, { useEffect, useState } from 'react';
import './WordCrystal.css';

/**
 * WordCrystal — a floating collectible that triggers MCQ Blitz on collection
 *
 * @param {{
 *   word: string,
 *   x: number,
 *   y: number,
 *   state: 'idle' | 'nearby' | 'collected',
 *   onCollect: () => void,
 *   crystalColor?: string,
 * }} props
 */
export default function WordCrystal({
  word,
  x,
  y,
  state = 'idle',
  onCollect,
  crystalColor,
}) {
  const [burstVisible, setBurstVisible] = useState(false);

  // Trigger burst animation when collected
  useEffect(() => {
    if (state === 'collected') {
      setBurstVisible(true);
    }
  }, [state]);

  // Don't render at all once burst animation finishes (DungeonRoom removes from array)
  if (state === 'collected' && !burstVisible) return null;

  // Pick crystal gradient based on color hint or default purple
  const colorClass = crystalColor ? `crystal-${crystalColor}` : 'crystal-purple';

  return (
    <div
      className={`word-crystal ${colorClass} crystal-${state}`}
      style={{ left: x - 30, top: y - 30 }} // center the 60px crystal on logical position
      role="button"
      tabIndex={0}
      aria-label={`Word crystal: ${word}`}
      onClick={onCollect}
      onKeyDown={e => e.key === 'Enter' && onCollect?.()}
    >
      {/* Outer glow ring */}
      <div className="crystal-glow-ring" aria-hidden="true" />

      {/* Main crystal body */}
      <div className="crystal-body" aria-hidden="true">
        <span className="crystal-gem">💎</span>
      </div>

      {/* Word label */}
      <span className="crystal-word">{word}</span>

      {/* Nearby pulse ring */}
      {state === 'nearby' && (
        <div className="crystal-pulse-ring" aria-hidden="true" />
      )}

      {/* Collection burst particles */}
      {state === 'collected' && (
        <div className="crystal-burst" aria-hidden="true">
          {['✨', '⭐', '💫', '✨', '⭐'].map((s, i) => (
            <span key={i} className={`crystal-particle crystal-particle-${i}`}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * WordCrystalLayer — renders all crystals in a room
 *
 * @param {{ crystals: Array<{id, word, x, y, state, color}>, onCollect: (id) => void }} props
 */
export function WordCrystalLayer({ crystals = [], onCollect }) {
  return (
    <>
      {crystals.map(c => (
        <WordCrystal
          key={c.id}
          word={c.word}
          x={c.x}
          y={c.y}
          state={c.state}
          crystalColor={c.color}
          onCollect={() => onCollect?.(c.id)}
        />
      ))}
    </>
  );
}
