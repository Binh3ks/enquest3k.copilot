// src/components/questmap/StreakCornerBadge.jsx
// Mount trong TaskScreen — luôn visible khi đang học
import React, { useState, useEffect } from 'react';

export default function StreakCornerBadge({ streak, score, xp }) {
  const [visible, setVisible] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (streak >= 2) {
      setVisible(true);
      setPulseKey(k => k + 1);
    }
  }, [streak]);

  if (!visible || streak < 2) return null;

  const streakLabel = streak >= 8 ? '🔥🔥 INFERNO!' : streak >= 5 ? '🔥 ON FIRE!' : `🔥 x${streak} Streak`;
  const color = streak >= 8 ? '#ef4444' : streak >= 5 ? '#f97316' : '#f59e0b';

  return (
    <div
      key={pulseKey}
      style={{
        position: 'fixed',
        top: 60, right: 12,
        zIndex: 8000,
        background: color,
        color: '#fff',
        borderRadius: 12,
        padding: '6px 12px',
        fontWeight: 900,
        fontSize: '0.75rem',
        boxShadow: `0 4px 16px ${color}80`,
        animation: 'streakPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        pointerEvents: 'none',
      }}
    >
      {streakLabel}
      <style>{`
        @keyframes streakPop {
          from { transform: scale(0.5) translateX(40px); opacity: 0; }
          to   { transform: scale(1) translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
