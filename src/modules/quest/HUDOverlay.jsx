/**
 * HUDOverlay.jsx — Game HUD: hearts, score/xp, timer, round, floorDoorLabel
 * Based on ENGQUEST3K_REDESIGN_THEO_NHOM_CO_CHE.md §2 (Formula 3 / Shared HUD Component)
 *
 * 4 Mandatory Invariant Props:
 * 1. floorDoorLabel (e.g. "Floor 6 Door 2 — Connector Relay")
 * 2. hearts (number of active hearts remaining)
 * 3. round (current round string, e.g. "1/5", "3/6")
 * 4. xp (current session accumulated XP)
 */
import React from 'react';
import './HUDOverlay.css';

/**
 * HUDOverlay — fixed HUD displayed on top of the dungeon room during gameplay
 *
 * @param {{
 *   floorDoorLabel?: string,
 *   hearts: number,
 *   round?: string | number,
 *   xp?: number,
 *   maxHearts?: number,
 *   score?: number,
 *   timeLeft?: number,
 *   wordsCollected?: number,
 *   totalWords?: number,
 *   roomName?: string,
 *   floorNumber?: number,
 *   doorLabel?: string,
 *   title?: string,
 *   rightActions?: React.ReactNode,
 * }} props
 */
export default function HUDOverlay({
  floorDoorLabel,
  hearts,
  round,
  roundLabel,
  xp,
  maxHearts,
  score,
  timeLeft = 60,
  wordsCollected = 0,
  totalWords = 6,
  roomName,
  floorNumber,
  doorLabel,
  title,
  rightActions,
}) {
  // Resolve unified 4 props with backward compatibility
  const resolvedFloorDoor = floorDoorLabel || 
    (floorNumber && doorLabel ? `Floor ${floorNumber} • ${doorLabel}` : 
    (floorNumber ? `Floor ${floorNumber}` : 
    (doorLabel || title || roomName || '')));

  const resolvedHearts = hearts !== undefined && hearts !== null ? hearts : 3;

  // Derive maxHearts safely: if not explicitly provided, anchor to initial hearts on mount (fallback 3)
  const initialHeartsRef = React.useRef(resolvedHearts);
  const resolvedMaxHearts = maxHearts !== undefined && maxHearts !== null ? maxHearts : initialHeartsRef.current;

  const resolvedRound = round !== undefined && round !== null ? 
    (typeof round === 'object' ? `${round.current || 0}/${round.total || 0}` : String(round).replace(/^Round\s*/i, '')) : 
    (totalWords ? `${wordsCollected}/${totalWords}` : '');

  const resolvedXP = xp !== undefined && xp !== null ? xp : (score !== undefined && score !== null ? score : 0);

  // Strict 4-prop validation check (Development Warning / Assertion)
  const missing = [];
  if (!floorDoorLabel && !(floorNumber && doorLabel) && !title && !roomName) missing.push('floorDoorLabel');
  if (hearts === undefined || hearts === null) missing.push('hearts');
  if (round === undefined && round === null && (wordsCollected === undefined || totalWords === undefined)) missing.push('round');
  if (xp === undefined && score === undefined) missing.push('xp');

  if (missing.length > 0 && typeof console !== 'undefined') {
    console.error(`🚨 [HUDOverlay Missing Props Violation] Missing required props: ${missing.join(', ')}. Game must supply all 4 mandatory props: floorDoorLabel, hearts, round, xp.`);
  }

  const isLowTime  = timeLeft <= 15;
  const isLowHP    = resolvedHearts <= 1;
  const progress   = totalWords > 0 ? wordsCollected / totalWords : 0;

  const minutes = Math.floor(Math.max(0, timeLeft) / 60);
  const seconds = String(Math.max(0, timeLeft) % 60).padStart(2, '0');
  const timeStr = `${minutes}:${seconds}`;

  return (
    <div className="hud-overlay" aria-label="Game HUD" role="status">

      {/* ── Top bar ────────────────────────────────────────────────── */}
      <div className="hud-top-bar">

        {/* Hearts */}
        <div className={`hud-hearts ${isLowHP ? 'hud-hearts-low' : ''}`} aria-label={`${resolvedHearts} hearts remaining`}>
          {Array.from({ length: resolvedMaxHearts }, (_, i) => i + 1).map(n => (
            <span
              key={n}
              className={`hud-heart ${n <= resolvedHearts ? 'hud-heart-full' : 'hud-heart-empty'}`}
              aria-hidden="true"
            >
              {n <= resolvedHearts ? '❤️' : '🖤'}
            </span>
          ))}
        </div>

        {/* Center: Floor + Door info & Round Badge */}
        <div className="hud-room-info">
          {resolvedFloorDoor && (
            <span className="hud-floor-badge" title={resolvedFloorDoor}>
              {resolvedFloorDoor}
            </span>
          )}
          {resolvedRound && (
            <span className="hud-round-pill">
              {roundLabel !== undefined ? (roundLabel ? `${roundLabel} ${resolvedRound}` : resolvedRound) : `ROUND ${resolvedRound}`}
            </span>
          )}
        </div>

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
          <span className="hud-score-value">{resolvedXP}</span>
          <span className="hud-score-unit">XP</span>
        </div>

        {/* Word progress dots (if multi-word collection) */}
        {totalWords > 0 && (
          <div className="hud-word-progress" aria-label={`${wordsCollected} of ${totalWords} items collected`}>
            {Array.from({ length: totalWords }).map((_, i) => (
              <span
                key={i}
                className={`hud-word-dot ${i < wordsCollected ? 'hud-word-dot-collected' : ''}`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        {/* Item count */}
        {totalWords > 0 && (
          <div className="hud-crystal-count" aria-label={`Progress: ${wordsCollected}/${totalWords}`}>
            <span aria-hidden="true">💎</span>
            <span>{wordsCollected}/{totalWords}</span>
          </div>
        )}
      </div>

      {/* ── Progress bar ───────────────────────────────────────── */}
      {totalWords > 0 && (
        <div className="hud-progress-track" aria-hidden="true">
          <div className="hud-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
    </div>
  );
}
