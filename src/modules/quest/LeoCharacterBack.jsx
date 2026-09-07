import React from 'react';
import './LeoCharacterBack.css';

/**
 * LeoCharacterBack.jsx — Leo the Explorer seen from behind.
 * specifically designed for forward-moving 3D perspective runner games.
 * 
 * @param {{ state: 'idle' | 'run' | 'jump' | 'slide' | 'hit' | 'win', x: number, y: number, invincible: boolean, scale?: number }} props
 */
export default function LeoCharacterBack({
  state = 'idle',
  x = 0,
  y = 0,
  invincible = false,
  scale = 1
}) {
  const classes = [
    'leo-back-character',
    `leo-back-${state}`,
    invincible ? 'leo-back-invincible' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -100%) scale(${scale})`
      }}
      aria-label="Leo running forward"
      role="img"
    >
      <div className="leo-back-svg-container">
        <svg
          viewBox="0 0 64 80"
          width="64"
          height="80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="leo-back-vector"
        >
          {/* ── GROUND SHADOW (Drawn in CSS instead, but we can put a small one here) ── */}
          {state !== 'jump' && (
             <ellipse cx="32" cy="74" rx="16" ry="4" fill="rgba(0,0,0,0.3)" className="leo-back-shadow" />
          )}

          {/* ── LEGS ── */}
          <g className="leo-back-legs">
            {/* Left Leg */}
            <g className="leo-back-leg-left">
              <rect x="20" y="52" width="10" height="16" rx="3" fill="#d97706" />
              <path d="M19 66 L30 66 L30 72 Q25 72 19 72 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            </g>
            {/* Right Leg */}
            <g className="leo-back-leg-right">
              <rect x="34" y="52" width="10" height="16" rx="3" fill="#d97706" />
              <path d="M34 66 L45 66 L45 72 Q39 72 34 72 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            </g>
          </g>

          {/* ── ARMS ── */}
          <g className="leo-back-arms">
            {/* Left Arm */}
            <g className="leo-back-arm-left">
              <rect x="12" y="32" width="8" height="18" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              <circle cx="16" cy="50" r="4" fill="#fed7aa" />
            </g>
            {/* Right Arm */}
            <g className="leo-back-arm-right">
              <rect x="44" y="32" width="8" height="18" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
              <circle cx="48" cy="50" r="4" fill="#fed7aa" />
            </g>
          </g>

          {/* ── TORSO & BACKPACK ── */}
          <g className="leo-back-torso">
            <rect x="18" y="28" width="28" height="26" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <rect x="18" y="50" width="28" height="4" fill="#78350f" />
            <rect x="14" y="24" width="36" height="28" rx="8" fill="#854d0e" stroke="#451a03" strokeWidth="2" />
            <path d="M14 30 L50 30 L46 44 L18 44 Z" fill="#a16207" stroke="#451a03" strokeWidth="1.5" />
            <rect x="18" y="16" width="28" height="10" rx="4" fill="#15803d" stroke="#064e3b" strokeWidth="1.5" />
            <line x1="24" y1="16" x2="24" y2="26" stroke="#451a03" strokeWidth="2" />
            <line x1="40" y1="16" x2="40" y2="26" stroke="#451a03" strokeWidth="2" />
          </g>

          {/* ── HEAD & HAT ── */}
          <g className="leo-back-head">
            <rect x="28" y="24" width="8" height="6" fill="#fed7aa" />
            <path d="M22 28 Q32 32 42 28 Q38 20 26 20 Z" fill="#78350f" />
            <ellipse cx="32" cy="18" rx="20" ry="8" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            <path d="M22 16 Q32 2 42 16 Z" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
            <path d="M22 15 Q32 18 42 15 L40 17 Q32 20 24 17 Z" fill="#15803d" />
          </g>

          {/* ── HIT / WIN EFFECTS ── */}
          {state === 'hit' && (
            <g className="leo-back-stars">
               <path d="M10 10 L14 18 L22 18 L16 22 L18 30 L10 24 L2 30 L4 22 L -2 18 L 6 18 Z" fill="#facc15" transform="scale(0.5) translate(20, -10)" />
               <path d="M10 10 L14 18 L22 18 L16 22 L18 30 L10 24 L2 30 L4 22 L -2 18 L 6 18 Z" fill="#facc15" transform="scale(0.6) translate(80, 0)" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
