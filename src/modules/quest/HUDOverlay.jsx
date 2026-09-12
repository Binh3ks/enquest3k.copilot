/**
 * HUDOverlay.jsx — Game HUD: hearts, score, timer, word progress
 * GDD §1.2 — "❤️❤️❤️ — 3 tim, hiển thị HUD góc trên trái"
 */
import React from 'react';
import './HUDOverlay.css';

/**
 * HUDOverlay — fixed HUD displayed on top of the dungeon room during gameplay
 *
 * @param {{
 *   hearts: number,          — 0–3
 *   score: number,           — XP accumulated in this room
 *   timeLeft: number,        — seconds remaining
 *   wordsCollected: number,  — crystals collected so far
 *   totalWords: number,      — total crystals in room
 *   roomName?: string,       — e.g. "Chamber of Tales"
 *   floorNumber?: number,    — 1–5
 *   doorLabel?: string,      — e.g. "Vocab Door"
 * }} props
 */
export default function HUDOverlay({
  hearts = 3,
  maxHearts = 3,
  score = 0,
  timeLeft = 60,
  wordsCollected = 0,
  totalWords = 6,
  roomName,
  floorNumber,
  doorLabel,
  rightActions,
}) {
  const isLowTime  = timeLeft <= 15;
  const isLowHP    = hearts <= 1;
  const progress   = totalWords > 0 ? wordsCollected / totalWords : 0;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const timeStr = `${minutes}:${seconds}`;

  return (
    <div className="hud-overlay" aria-label="Game HUD" role="status">

      {/* ── Top bar ────────────────────────────────────────────────── */}
      <div className="hud-top-bar">

        {/* Hearts */}
        <div className={`hud-hearts ${isLowHP ? 'hud-hearts-low' : ''}`} aria-label={`${hearts} hearts remaining`}>
          {Array.from({ length: maxHearts }, (_, i) => i + 1).map(n => (
            <span
              key={n}
              className={`hud-heart ${n <= hearts ? 'hud-heart-full' : 'hud-heart-empty'}`}
              aria-hidden="true"
            >
              {n <= hearts ? '❤️' : '🖤'}
            </span>
          ))}
        </div>

        {/* Center: Room info */}
        {(roomName || floorNumber) && (
          <div className="hud-room-info">
            {floorNumber && <span className="hud-floor-badge">Floor {floorNumber}</span>}
            {doorLabel   && <span className="hud-door-label">{doorLabel}</span>}
          </div>
        )}

        {/* Right controls: actions + timer */}
        <div className="hud-top-right-controls">
          {rightActions}
          {/* Timer */}
          <div className={`hud-timer ${isLowTime ? 'hud-timer-urgent' : ''}`} aria-label={`${timeStr} remaining`}>
            <span className="hud-timer-icon" aria-hidden="true">⏱️</span>
            <span className="hud-timer-value">{timeStr}</span>
          </div>
        </div>
      </div>

      {/* ── Score strip ────────────────────────────────────────────── */}
      <div className="hud-score-strip">
        {/* XP score */}
        <div className="hud-score">
          <span className="hud-score-icon" aria-hidden="true">⚡</span>
          <span className="hud-score-value">{score}</span>
          <span className="hud-score-unit">XP</span>
        </div>

        {/* Word progress dots */}
        <div className="hud-word-progress" aria-label={`${wordsCollected} of ${totalWords} words collected`}>
          {Array.from({ length: totalWords }).map((_, i) => (
            <span
              key={i}
              className={`hud-word-dot ${i < wordsCollected ? 'hud-word-dot-collected' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Crystal count */}
        <div className="hud-crystal-count" aria-label={`Crystals: ${wordsCollected}/${totalWords}`}>
          <span aria-hidden="true">💎</span>
          <span>{wordsCollected}/{totalWords}</span>
        </div>
      </div>

      {/* ── Word progress bar ───────────────────────────────────────── */}
      <div className="hud-progress-track" aria-hidden="true">
        <div className="hud-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
