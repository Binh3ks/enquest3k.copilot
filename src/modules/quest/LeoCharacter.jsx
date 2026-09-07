/**
 * LeoCharacter.jsx — Leo the Explorer Boy sprite + animation state machine
 * GDD §1.2 — Mascot: khaki explorer outfit, messy brown hair
 * Sprint 1: CSS/emoji-based character (pixel art in Sprint 6 polish)
 */
import React, { useEffect, useState } from 'react';
import './LeoCharacter.css';

// ─── ANIMATION FRAME SEQUENCES ────────────────────────────────────────────────

const LEO_EMOJIS = {
  idle:    ['🧑‍🦫', '🧑‍🦫'],      // stationary Bob
  run_r:   ['🏃', '🧍'],           // running right frames
  run_l:   ['🏃', '🧍'],           // running left frames (CSS flip)
  jump:    ['🤸'],                  // jumping
  fall:    ['😨'],                  // falling (oh no!)
  hit:     ['💥', '✨'],           // hit flash
  collect: ['🤩', '⭐'],           // collecting crystal
};

/**
 * Leo the Explorer Boy — animated character sprite
 *
 * @param {{ x: number, y: number, state: string, facingRight: boolean, invincible: boolean }} props
 */
export default function LeoCharacter({ x, y, state = 'idle', facingRight = true, invincible = false }) {
  const [frame, setFrame] = useState(0);

  // Cycle animation frames
  useEffect(() => {
    const frames = LEO_EMOJIS[state] || LEO_EMOJIS.idle;
    if (frames.length <= 1) { setFrame(0); return; }

    const fps   = state === 'hit' ? 8 : state.startsWith('run') ? 10 : 6;
    const delay = 1000 / fps;
    const id    = setInterval(() => setFrame(f => (f + 1) % frames.length), delay);
    return () => clearInterval(id);
  }, [state]);

  const frames  = LEO_EMOJIS[state] || LEO_EMOJIS.idle;
  const emoji   = frames[frame % frames.length];

  const classes = [
    'leo-character',
    `leo-${state}`,
    facingRight ? 'leo-face-right' : 'leo-face-left',
    invincible ? 'leo-invincible' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ left: x, top: y }}
      aria-label="Leo the Explorer"
      role="img"
    >
      {/* Body emoji */}
      <span className="leo-sprite">{emoji}</span>

      {/* Explorer hat overlay */}
      <span className="leo-hat" aria-hidden="true">🎩</span>

      {/* Shadow */}
      <div className="leo-shadow" aria-hidden="true" />
    </div>
  );
}
