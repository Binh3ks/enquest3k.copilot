import React from 'react';
import { Gamepad2, X, Sparkles } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * ArcadeBreakPromptModal.jsx
 * Automatically prompts the student when they reach their age-appropriate study focus threshold:
 * "Wanna play some mini game to relax?"
 */

export default function ArcadeBreakPromptModal({
  isOpen = false,
  onPlay = null,
  onSkip = null,
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15, 23, 42, 0.82)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
        border: '2px solid rgba(167, 139, 250, 0.5)',
        borderRadius: '24px',
        padding: '28px 24px',
        maxWidth: '400px', width: '100%',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(124, 58, 237, 0.3)',
        textAlign: 'center', color: '#fff',
        animation: 'zoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          type="button"
          onClick={onSkip}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.08)', border: 'none',
            borderRadius: '50%', width: '32px', height: '32px',
            color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Mascot Header */}
        <div style={{ fontSize: '54px', marginBottom: '8px', filter: 'drop-shadow(0 6px 12px rgba(234,88,12,0.5))' }}>
          🦊
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.4)',
          borderRadius: '12px', padding: '4px 12px', color: '#fbbf24',
          fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em',
          marginBottom: '12px'
        }}>
          <Sparkles size={13} fill="#fbbf24" /> Great Study Focus!
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
          Wanna play a mini game to relax?
        </h3>

        <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 22px' }}>
          You've completed your study session! Take a quick 3-minute brain break to play exciting arcade games.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={onPlay}
            style={{
              padding: '14px 20px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              border: 'none', color: '#fff',
              fontWeight: 900, fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <Gamepad2 size={18} /> PLAY MINI GAME (3 MINS)
          </button>

          <button
            type="button"
            onClick={onSkip}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#94a3b8',
              fontWeight: 800, fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Skip / Keep Studying
          </button>
        </div>
      </div>
    </div>
  );
}
