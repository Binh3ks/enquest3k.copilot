// src/components/questmap/DoorUnlockCeremony.jsx
import React, { useState, useEffect } from 'react';
import { playVictoryFanfare, playCoinSound } from '../../utils/soundEffects';
import './DoorUnlockCeremony.css';

// Chronicles floor names per day
const FLOOR_NAMES = [
  { floor: 1, name: "Chamber of Tales",  icon: "📜", theme: "#7C3AED" },
  { floor: 2, name: "Alchemy Lab",       icon: "⚗️", theme: "#0EA5E9" },
  { floor: 3, name: "Thunder Arena",     icon: "⚡", theme: "#F59E0B" },
  { floor: 4, name: "Rune Sanctum",      icon: "⚒️", theme: "#EF4444" },
  { floor: 5, name: "Apex Spire + Boss", icon: "🏰⚔️", theme: "#F59E0B" },
];

export default function DoorUnlockCeremony({ dayIndex, weekId, onDone }) {
  const [phase, setPhase] = useState('crack'); // 'crack' → 'open' → 'reveal' → 'done'
  const floor = FLOOR_NAMES[dayIndex] || FLOOR_NAMES[0];

  useEffect(() => {
    // Phase sequence
    const t1 = setTimeout(() => { playCoinSound(); setPhase('open'); }, 800);
    const t2 = setTimeout(() => { playVictoryFanfare(); setPhase('reveal'); }, 1800);
    const t3 = setTimeout(() => setPhase('done'), 4500);
    const t4 = setTimeout(onDone, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div className={`duc-overlay ${phase === 'done' ? 'duc-exit' : ''}`}
         style={{ '--theme': floor.theme }}>
      
      {/* Background: dark dungeon corridor */}
      <div className="duc-corridor-bg" />

      {/* Zone complete badge */}
      <div className="duc-zone-badge">✅ Zone {dayIndex + 1} Complete!</div>

      {/* The Door — 3D swing open animation */}
      <div className={`duc-door-container ${phase === 'crack' ? '' : phase}`}>
        {/* Door left half */}
        <div className="duc-door-left">
          <div className="duc-door-panel-l">
            <span className="duc-door-handle-l">🔒</span>
          </div>
        </div>
        {/* Door right half */}
        <div className="duc-door-right">
          <div className="duc-door-panel-r">
            <span className="duc-door-handle-r"></span>
          </div>
        </div>

        {/* Crack: light bleeds through center */}
        <div className={`duc-door-crack ${phase !== 'crack' ? 'duc-crack-wide' : ''}`} />
      </div>

      {/* Reveal: Floor info shown after door swings open */}
      {(phase === 'reveal' || phase === 'done') && (
        <div className="duc-floor-reveal">
          <span className="duc-floor-icon">{floor.icon}</span>
          <div className="duc-floor-info">
            <span className="duc-floor-label">CHRONICLES UNLOCKED</span>
            <span className="duc-floor-name">Floor {floor.floor}: {floor.name}</span>
            <span className="duc-floor-cta">
              🦊 Tap the Chronicles button to enter! →
            </span>
          </div>
        </div>
      )}

      {/* PP earned */}
      {phase === 'reveal' && (
        <div className="duc-pp-earned">
          ⚡ Power Points earned this zone → Boss Chamber closer!
        </div>
      )}

      {/* Skip */}
      <button className="duc-skip" onClick={onDone}>Skip ↓</button>
    </div>
  );
}
