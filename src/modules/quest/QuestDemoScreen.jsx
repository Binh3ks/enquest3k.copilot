/**
 * QuestDemoScreen.jsx — Test harness & demo page for Lexio's Quest Sprint 1 physics engine
 * Allows visual verification of DungeonRoom, LeoCharacter, EnemyAI, WordCrystal, MCQBlitzPopup, HUD, and VirtualDPad.
 */
import React, { useState } from 'react';
import DungeonRoom from './DungeonRoom';

const DEMO_VOCAB = [
  { word: 'laboratory', definition: 'A special room for scientific experiments' },
  { word: 'friction', definition: 'Resistance that one surface encounters when moving over another' },
  { word: 'crystal', definition: 'A clear transparent mineral with facets' },
  { word: 'shadow', definition: 'A dark area where light is blocked' },
  { word: 'gravity', definition: 'The force that attracts a body toward the center of the earth' },
  { word: 'potion', definition: 'A liquid with magical, medicinal, or poisonous properties' },
];

export default function QuestDemoScreen() {
  const [theme, setTheme] = useState('chamber-of-tales');
  const [completeResult, setCompleteResult] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a14', display: 'flex', flexDirection: 'column' }}>
      {/* Test toolbar */}
      <header style={{
        height: '44px',
        background: '#121226',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        zIndex: 100,
        color: '#fff',
        fontSize: '13px'
      }}>
        <span style={{ fontWeight: 'bold', color: '#a855f7' }}>🎮 Lexio's Quest Engine Demo</span>
        <span>Theme:</span>
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          style={{ background: '#1e1b4b', color: '#e0e7ff', border: '1px solid #6366f1', borderRadius: '4px', padding: '2px 8px' }}
        >
          <option value="chamber-of-tales">Chamber of Tales (Floor 1)</option>
          <option value="alchemy-lab">Alchemy Lab (Floor 2)</option>
          <option value="thunder-arena">Thunder Arena (Floor 3)</option>
          <option value="rune-sanctum">Rune Sanctum (Floor 4)</option>
          <option value="apex-spire">Apex Spire (Floor 5)</option>
        </select>
        {completeResult && (
          <span style={{ color: '#22c55e', marginLeft: 'auto' }}>
            Cleared! Stars: {completeResult.stars} | Score: {completeResult.score} XP
          </span>
        )}
      </header>

      {/* Main Game Container */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <DungeonRoom
          key={theme}
          roomConfig={{
            theme,
            wordCount: 5,
            enemyDefs: [
              { type: 'zombie', x: 380, y: 460 },
              { type: 'worm', x: 680, y: 476 },
            ],
          }}
          vocabItems={DEMO_VOCAB}
          duration={120}
          floorNumber={1}
          doorLabel="Door 1 — Chamber of Tales"
          onComplete={(stars, score) => setCompleteResult({ stars, score })}
        />
      </div>
    </div>
  );
}
