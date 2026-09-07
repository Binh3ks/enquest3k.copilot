/**
 * VirtualDPad.jsx — Mobile virtual D-Pad + JUMP button for Lexio's Quest
 * GDD §1.2 Controls: "Virtual D-Pad (mobile) + Arrow Keys/WASD (desktop) + JUMP button"
 */
import React, { useCallback } from 'react';
import './VirtualDPad.css';

/**
 * VirtualDPad — renders a fixed overlay with directional controls and jump button
 *
 * @param {{
 *   onLeft: ()=>void,       onLeftRelease: ()=>void,
 *   onRight: ()=>void,      onRightRelease: ()=>void,
 *   onUp: ()=>void,         onUpRelease: ()=>void,
 *   onDown: ()=>void,       onDownRelease: ()=>void,
 *   onJump: ()=>void,       onJumpRelease: ()=>void,
 *   visible: boolean,
 * }} props
 */
export default function VirtualDPad({
  onLeft, onLeftRelease,
  onRight, onRightRelease,
  onUp, onUpRelease,
  onDown, onDownRelease,
  onJump, onJumpRelease,
  onSlide, onSlideRelease,
  visible = true,
}) {
  if (!visible) return null;

  /**
   * Creates touch+mouse event handlers for a D-Pad button
   * Uses touchstart/touchend to avoid 300ms tap delay on mobile
   * preventDefault stops scroll interference
   */
  const makeHandlers = useCallback((onPress, onRelease) => ({
    onTouchStart: (e) => { e.preventDefault(); onPress?.(); },
    onTouchEnd:   (e) => { e.preventDefault(); onRelease?.(); },
    onMouseDown:  (e) => { e.preventDefault(); onPress?.(); },
    onMouseUp:    (e) => { e.preventDefault(); onRelease?.(); },
    onMouseLeave: (e) => { e.preventDefault(); onRelease?.(); },
  }), []);

  return (
    <div className="vdpad-overlay" aria-label="Game controls" role="group">
      {/* ── D-Pad (left side) ───────────────────────────────────────── */}
      <div className="vdpad-dpad">
        {/* Up */}
        <button
          className="vdpad-btn vdpad-up"
          {...makeHandlers(onUp, onUpRelease)}
          aria-label="Move up"
        >▲</button>

        {/* Middle row: Left + Center + Right */}
        <div className="vdpad-middle">
          <button
            className="vdpad-btn vdpad-left"
            {...makeHandlers(onLeft, onLeftRelease)}
            aria-label="Move left"
          >◀</button>
          <div className="vdpad-center" aria-hidden="true">✦</div>
          <button
            className="vdpad-btn vdpad-right"
            {...makeHandlers(onRight, onRightRelease)}
            aria-label="Move right"
          >▶</button>
        </div>

        {/* Down */}
        <button
          className="vdpad-btn vdpad-down"
          {...makeHandlers(onDown, onDownRelease)}
          aria-label="Move down"
        >▼</button>
      </div>

      {/* ── Action Buttons (right side) ─────────────────────────────────── */}
      <div className="vdpad-actions-group">
        {onSlide && (
          <button
            className="vdpad-action-btn vdpad-slide-btn"
            {...makeHandlers(onSlide, onSlideRelease)}
            aria-label="Slide"
          >
            <span className="vdpad-jump-icon">SLIDE</span>
            <span className="vdpad-jump-emoji" aria-hidden="true">🛹</span>
          </button>
        )}
        <button
          className="vdpad-action-btn vdpad-jump-btn"
          {...makeHandlers(onJump, onJumpRelease)}
          aria-label="Jump"
        >
          <span className="vdpad-jump-icon">JUMP</span>
          <span className="vdpad-jump-emoji" aria-hidden="true">🚀</span>
        </button>
      </div>
    </div>
  );
}
