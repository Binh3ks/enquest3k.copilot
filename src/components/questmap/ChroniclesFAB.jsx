/**
 * ChroniclesFAB.jsx — Floating Action Button for The Lexio Chronicles
 *
 * Placed on QuestMap3D and TaskScreen for W17+ students.
 * Provides quick 1-tap entry to /week/:id/chronicles with live Power Points badge.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useChroniclesStore from '../../stores/useChroniclesStore';

export default function ChroniclesFAB({ weekId }) {
  const navigate = useNavigate();
  const wkNum = parseInt(weekId) || 33;

  // Only show for full 15-quest weeks (W17+)
  if (wkNum < 17) return null;

  const weeklyPP = useChroniclesStore(s => s.weeklyPP[`w${wkNum}`] || 0);
  const hasBossAccess = weeklyPP >= 150; // bronze threshold

  const handleClick = () => {
    navigate(`/week/${wkNum}/chronicles`);
  };

  return (
    <button
      id="chronicles-fab-btn"
      type="button"
      onClick={handleClick}
      title={`The Lexio Chronicles RPG — ${weeklyPP} Power Points`}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9000,
        width: 58,
        height: 58,
        borderRadius: '50%',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        cursor: 'pointer',
        background: hasBossAccess
          ? 'linear-gradient(135deg, #f59e0b, #d97706)'
          : 'linear-gradient(135deg, #6366f1, #4f46e5)',
        boxShadow: hasBossAccess
          ? '0 6px 24px rgba(245,158,11,0.6), 0 0 0 4px rgba(245,158,11,0.25)'
          : '0 6px 24px rgba(99,102,241,0.5), 0 0 0 3px rgba(99,102,241,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        transition: 'transform 0.18s, box-shadow 0.18s',
        fontFamily: 'Outfit, sans-serif',
        color: '#fff',
        animation: hasBossAccess ? 'fabPulse 2.4s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <style>{`
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(245,158,11,0.55), 0 0 0 3px rgba(245,158,11,0.2); }
          50%       { box-shadow: 0 6px 28px rgba(245,158,11,0.8), 0 0 0 6px rgba(245,158,11,0.15); }
        }
      `}</style>
      <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>🦊</span>
      {weeklyPP > 0 && (
        <span style={{
          position: 'absolute',
          top: -4,
          right: -4,
          background: hasBossAccess ? '#ef4444' : '#10b981',
          color: '#fff',
          fontSize: '0.62rem',
          fontWeight: 900,
          borderRadius: 10,
          padding: '1px 6px',
          minWidth: 22,
          textAlign: 'center',
          border: '2px solid #0f172a',
          lineHeight: 1.4,
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        }}>
          {weeklyPP}
        </span>
      )}
    </button>
  );
}
