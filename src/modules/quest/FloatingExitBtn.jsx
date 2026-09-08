import React from 'react';
import './FloatingExitBtn.css';

/**
 * FloatingExitBtn — Universally visible exit button for all mini-games
 * Allows student to immediately return to Daily Chamber / World Map at any time.
 */
export default function FloatingExitBtn({ onExit, label = '← Chamber' }) {
  if (!onExit) return null;

  return (
    <button
      type="button"
      className="floating-exit-btn"
      onClick={(e) => {
        e.stopPropagation();
        onExit();
      }}
      aria-label="Exit Game"
      title="Return to Chamber"
    >
      <span className="floating-exit-icon">🚪</span>
      <span className="floating-exit-text">{label}</span>
    </button>
  );
}
