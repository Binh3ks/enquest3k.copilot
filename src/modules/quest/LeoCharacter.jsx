/**
 * LeoCharacter.jsx — Leo the Explorer Boy (Official SVG Mascot Sprite)
 * GDD §1.2 — Mascot: Khaki explorer outfit, safari hat, messy hair, adventurer backpack.
 *
 * Custom vector SVG character:
 * - 100% consistent cross-platform rendering (NO glitchy OS emojis, NO beaver glyphs!)
 * - Correct facing orientation: scaleX(1) faces RIGHT, scaleX(-1) faces LEFT
 * - Dynamic SVG leg & arm running / jumping / idle animations via CSS
 * - Invincibility damage flash state
 */

import React from 'react';
import './LeoCharacter.css';

/**
 * @param {{ x: number, y: number, state: string, facingRight: boolean, invincible: boolean }} props
 */
export default function LeoCharacter({
  x = 0,
  y = 0,
  state = 'idle',
  facingRight = true,
  invincible = false,
}) {
  const isRunning = state === 'run' || state === 'run_r' || state === 'run_l';
  const isJumping = state === 'jump';
  const isSliding = state === 'slide';
  const isFalling = state === 'fall';
  const isHit = state === 'hit';

  const classes = [
    'leo-character',
    `leo-${state}`,
    facingRight ? 'leo-face-right' : 'leo-face-left',
    invincible ? 'leo-invincible' : '',
    isRunning ? 'leo-anim-running' : '',
    isJumping ? 'leo-anim-jumping' : '',
    isSliding ? 'leo-anim-sliding' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ left: `${x}px`, top: `${y}px` }}
      aria-label="Leo the Explorer"
      role="img"
    >
      <div className="leo-svg-container" style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}>
        <svg
          viewBox="0 0 48 64"
          width="44"
          height="58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="leo-vector"
        >
          {/* Backpack on back */}
          <rect x="7" y="26" width="7" height="14" rx="3" fill="#854d0e" stroke="#582d07" strokeWidth="1.2" />
          <line x1="9" y1="29" x2="12" y2="29" stroke="#fde047" strokeWidth="1" />

          {/* Left Leg / Back Leg */}
          <g className="leo-leg-back">
            <rect x="15" y="44" width="6" height="11" rx="2" fill="#d97706" />
            <rect x="14" y="53" width="8" height="5" rx="2" fill="#78350f" />
          </g>

          {/* Right Leg / Front Leg */}
          <g className="leo-leg-front">
            <rect x="25" y="44" width="6" height="11" rx="2" fill="#d97706" />
            <rect x="25" y="53" width="9" height="5" rx="2" fill="#78350f" />
          </g>

          {/* Torso / Khaki Safari Jacket */}
          <rect x="13" y="25" width="20" height="20" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
          {/* Belt */}
          <rect x="13" y="41" width="20" height="4" fill="#78350f" />
          <rect x="21" y="41" width="5" height="4" fill="#facc15" stroke="#a16207" strokeWidth="0.8" />
          {/* Red Bandana Scarf */}
          <path d="M18 25 L24 30 L30 25 Z" fill="#ef4444" />

          {/* Left Arm / Back Arm */}
          <g className="leo-arm-back">
            <rect x="10" y="27" width="5" height="12" rx="2.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
            <circle cx="12.5" cy="39.5" r="2.5" fill="#fbcfe8" />
          </g>

          {/* Head & Face */}
          <circle cx="24" cy="18" r="9" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
          {/* Messy Explorer Hair */}
          <path
            d="M15 15 Q18 8 24 9 Q29 8 33 13 Q35 17 32 20 Q30 14 24 13 Q18 14 15 17 Z"
            fill="#78350f"
          />

          {/* Eyes (facing right naturally) */}
          {isHit ? (
            <>
              <line x1="25" y1="16" x2="29" y2="20" stroke="#78350f" strokeWidth="1.5" />
              <line x1="29" y1="16" x2="25" y2="20" stroke="#78350f" strokeWidth="1.5" />
            </>
          ) : (
            <>
              <ellipse cx="27" cy="17" rx="1.6" ry="2.2" fill="#1c1917" />
              <circle cx="27.6" cy="16.3" r="0.6" fill="#ffffff" />
            </>
          )}

          {/* Cheerful Explorer Smile */}
          <path d="M25 21 Q27 24 30 21" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" />

          {/* Khaki Adventurer Safari Hat */}
          {/* Hat Crown */}
          <path d="M16 11 Q24 5 32 11 Z" fill="#d97706" stroke="#92400e" strokeWidth="1" />
          {/* Hat Band */}
          <rect x="17" y="10" width="14" height="2.5" fill="#15803d" />
          {/* Hat Brim */}
          <ellipse cx="24" cy="12" rx="14" ry="3.5" fill="#b45309" stroke="#78350f" strokeWidth="1" />

          {/* Right Arm / Front Arm */}
          <g className="leo-arm-front">
            <rect x="29" y="27" width="5" height="12" rx="2.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
            <circle cx="31.5" cy="39.5" r="2.5" fill="#fbcfe8" />
          </g>
        </svg>
      </div>

      {/* Ground Shadow */}
      <div className="leo-shadow" aria-hidden="true" />
    </div>
  );
}
