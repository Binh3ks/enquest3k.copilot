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
import PotionFlipDungeon from './PotionFlipDungeon';
import AnvilRushGrammar from './AnvilRushGrammar';
import ScrollChamberDecode from './ScrollChamberDecode';
import EchoArenaShooter from './EchoArenaShooter';
import CatapultCommander from './CatapultCommander';
import StormShieldDefense from './StormShieldDefense';
import HighwaySprint from './HighwaySprint';
import SyntaxExpressRail from './SyntaxExpressRail';
import RiddleRunMaze from './RiddleRunMaze';
import GrandMatrixDungeon from './GrandMatrixDungeon';
import TitanGrammarForge from './TitanGrammarForge';
import CambridgeClozeGauntlet from './CambridgeClozeGauntlet';
import SynonymStormDefense from './SynonymStormDefense';
import ConnectorRelayCanvas from './ConnectorRelayCanvas';
import PhaserGameCanvas from '../../phaser/PhaserGameCanvas';
import HubScene from '../../phaser/scenes/HubScene';
import HighwayRunnerScene from '../../phaser/scenes/HighwayRunnerScene';
import ChunkCatapultCanvas from '../chronicles/games/ChunkCatapultCanvas';
import BossCombatScene from '../../phaser/scenes/BossCombatScene';


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
  const [activeGame, setActiveGame] = useState('dungeon');
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
          <option value="potion_flip">Floor 2 Door 1: Potion Flip Dungeon</option>
          <option value="anvil_rush">Floor 2 Door 2: Anvil Rush Grammar</option>
          <option value="scroll_chamber">Floor 2 Door 3: Scroll Chamber Decode</option>
          <option value="echo_arena">Floor 3 Door 1: Echo Arena Shooter</option>
          <option value="catapult_commander">Floor 3 Door 2: Catapult Commander</option>
          <option value="storm_shield">Floor 3 Door 3: Storm Shield Defense</option>
          <option value="highway_sprint">Floor 4 Door 1: Highway Sprint</option>
          <option value="syntax_express">Floor 4 Door 2: Syntax Express Rail</option>
          <option value="riddle_maze">Floor 4 Door 3: Riddle Run Maze</option>
          <option value="grand_matrix">Floor 5 Door 1: Grand Matrix Dungeon</option>
          <option value="titan_forge">Floor 5 Door 2: Titan Grammar Forge</option>
          <option value="cambridge_cloze">Floor 5 Door 3: Cambridge Cloze Gauntlet</option>
          <option value="synonym_storm">Floor 6 Door 1: Synonym Storm Defense</option>
          <option value="connector_relay">Floor 6 Door 2: Connector Burst</option>
          <option disabled>────────── PHASER 3 ENGINES (v4.0) ──────────</option>
          <option value="phaser_hub">🎮 Phaser: Hub World 2D</option>
          <option value="phaser_highway">🎮 Phaser: Highway Runner</option>
          <option value="phaser_catapult">🎮 Phaser: Chunk Catapult</option>
          <option value="phaser_boss">🎮 Phaser: Boss Combat (Ancient Sorcerer)</option>
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
            Cleared! Stars: {'⭐'.repeat(completeResult.stars || 1)} | Score: {completeResult.score} XP
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

        {activeGame === 'potion_flip' && (
          <PotionFlipDungeon
            vocabItems={DEMO_VOCAB}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'anvil_rush' && (
          <AnvilRushGrammar
            grammarSentences={DEMO_SENTENCES}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'scroll_chamber' && (
          <ScrollChamberDecode
            duration={100}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'echo_arena' && (
          <EchoArenaShooter
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'catapult_commander' && (
          <CatapultCommander
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'storm_shield' && (
          <StormShieldDefense
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'highway_sprint' && (
          <HighwaySprint
            vocabItems={DEMO_VOCAB}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'syntax_express' && (
          <SyntaxExpressRail
            grammarSentences={DEMO_SENTENCES}
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'riddle_maze' && (
          <RiddleRunMaze
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'grand_matrix' && (
          <GrandMatrixDungeon
            vocabItems={DEMO_VOCAB}
            duration={180}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'titan_forge' && (
          <TitanGrammarForge
            grammarSentences={DEMO_SENTENCES}
            duration={100}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'cambridge_cloze' && (
          <CambridgeClozeGauntlet
            duration={120}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'synonym_storm' && (
          <SynonymStormDefense
            duration={90}
            weekNumber={33}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
          />
        )}

        {activeGame === 'connector_relay' && (
          <ConnectorRelayCanvas
            grammarSentences={DEMO_SENTENCES}
            duration={120}
            weekNumber={33}
            onComplete={(stars, score) => {
              if (import.meta.env.DEV) {
                console.log('[QUEST_DEMO_ON_COMPLETE]', JSON.stringify({ stars, score }));
              }
              setCompleteResult({ stars, score });
            }}
          />
        )}

        {activeGame === 'phaser_hub' && (
          <PhaserGameCanvas
            sceneClass={HubScene}
            sceneData={{ weekNumber: 33, weeklyPP: 250, bossTier: 'bronze' }}
            onSceneEvent={(evt, data) => console.log('[Phaser Hub Event]:', evt, data)}
          />
        )}

        {activeGame === 'phaser_highway' && (
          <PhaserGameCanvas
            sceneClass={HighwayRunnerScene}
            sceneData={{ vocabItems: DEMO_VOCAB, duration: 60 }}
            onSceneEvent={(evt, data) => {
              if (evt === 'game_complete') setCompleteResult({ stars: data.stars, score: data.score });
            }}
          />
        )}

        {activeGame === 'phaser_catapult' && (
          <ChunkCatapultCanvas
            pairs={[
              { starter: 'Jake was walking', completion: 'down the corridor' },
              { starter: 'Water on tiles', completion: 'reduces friction' },
              { starter: 'Rubber shoe soles', completion: 'provide strong grip' },
              { starter: 'A clear hypothesis helps', completion: 'guide the scientific method' },
              { starter: 'Careful thinking leads to', completion: 'logical new conclusions' },
            ]}
            duration={60}
            onComplete={(stars, score) => setCompleteResult({ stars, score })}
            onExit={() => setActiveGame(null)}
          />
        )}

        {activeGame === 'phaser_boss' && (
          <PhaserGameCanvas
            sceneClass={BossCombatScene}
            sceneData={{ playerDamage: 15, tier: 'silver' }}
            onSceneEvent={(evt, data) => {
              if (evt === 'boss_victory') setCompleteResult({ stars: 3, score: 100 });
            }}
          />
        )}
      </div>
    </div>
  );
}

