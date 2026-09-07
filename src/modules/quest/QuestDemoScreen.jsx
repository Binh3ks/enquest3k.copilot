/**
 * QuestDemoScreen.jsx — Test harness & demo page for Lexio's Quest Sprint 1 & Sprint 2
 * Allows visual verification of:
 * - DungeonRoom (Core Engine)
 * - BubbleStormChase (Floor 1 Door 1 Vocab)
 * - WordWagonJump (Floor 1 Door 2 Grammar)
 * - ShadowVaultInfiltrate (Floor 1 Door 3 Integration)
 */
import React, { useState } from 'react';
import DungeonRoom from './DungeonRoom';
import BubbleStormChase from './BubbleStormChase';
import WordWagonJump from './WordWagonJump';
import ShadowVaultInfiltrate from './ShadowVaultInfiltrate';

const DEMO_VOCAB = [
  { word: 'laboratory', definition: 'A special room for scientific experiments' },
  { word: 'friction', definition: 'Resistance that one surface encounters when moving over another' },
  { word: 'crystal', definition: 'A clear transparent mineral with facets' },
  { word: 'shadow', definition: 'A dark area where light is blocked' },
  { word: 'gravity', definition: 'The force that attracts a body toward the center of the earth' },
  { word: 'potion', definition: 'A liquid with magical, medicinal, or poisonous properties' },
];

const DEMO_SENTENCES = [
  {
    fullSentence: 'Jake was walking carefully down the corridor.',
    parts: [
      { text: 'Jake was', isBlank: false },
      { text: 'walking', isBlank: true, options: ['walking', 'sleeping', 'flying'] },
      { text: 'carefully down the', isBlank: false },
      { text: 'corridor.', isBlank: true, options: ['corridor.', 'kitchen.', 'garden.'] },
    ],
  },
  {
    fullSentence: 'Rubber soles give strong grip on wet tiles.',
    parts: [
      { text: 'Rubber soles', isBlank: false },
      { text: 'give', isBlank: true, options: ['give', 'melt', 'drop'] },
      { text: 'strong grip on', isBlank: false },
      { text: 'wet tiles.', isBlank: true, options: ['wet tiles.', 'clouds.', 'stars.'] },
    ],
  },
];

export default function QuestDemoScreen() {
  const [activeGame, setActiveGame] = useState('dungeon'); // 'dungeon' | 'bubble_storm' | 'word_wagon' | 'shadow_vault'
  const [theme, setTheme] = useState('chamber-of-tales');
  const [completeResult, setCompleteResult] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a14', display: 'flex', flexDirection: 'column' }}>
      {/* Test toolbar */}
      <header style={{
        height: '46px',
        background: '#121226',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        zIndex: 100,
        color: '#fff',
        fontSize: '13px',
        flexWrap: 'wrap'
      }}>
        <span style={{ fontWeight: 'bold', color: '#a855f7' }}>🎮 Lexio's Quest</span>
        <span>Select Game:</span>
        <select
          id="select-active-game"
          value={activeGame}
          onChange={e => { setActiveGame(e.target.value); setCompleteResult(null); }}
          style={{ background: '#1e1b4b', color: '#e0e7ff', border: '1px solid #a855f7', borderRadius: '4px', padding: '3px 8px', fontWeight: 'bold' }}
        >
          <option value="dungeon">Dungeon Room (Base Engine)</option>
          <option value="bubble_storm">Floor 1 Door 1: Bubble Storm Chase</option>
          <option value="word_wagon">Floor 1 Door 2: Word Wagon Jump</option>
          <option value="shadow_vault">Floor 1 Door 3: Shadow Vault Infiltrate</option>
        </select>

        {activeGame === 'dungeon' && (
          <>
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
          </>
        )}

        {completeResult && (
          <span style={{ color: '#22c55e', marginLeft: 'auto', fontWeight: 'bold' }}>
            Cleared! Stars: {'⭐'.repeat(completeResult.stars)} | Score: {completeResult.score} XP
          </span>
        )}
      </header>

      {/* Main Game Container */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {activeGame === 'dungeon' && (
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
            doorLabel="Dungeon Base Engine"
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'bubble_storm' && (
          <BubbleStormChase
            vocabItems={DEMO_VOCAB}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'word_wagon' && (
          <WordWagonJump
            grammarSentences={DEMO_SENTENCES}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'shadow_vault' && (
          <ShadowVaultInfiltrate
            vocabItems={DEMO_VOCAB}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}
      </div>
    </div>
  );
}
