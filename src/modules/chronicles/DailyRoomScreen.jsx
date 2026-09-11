/**
 * DailyRoomScreen.jsx — The heart of The Lexio Chronicles
 *
 * Renders a single Daily Room with:
 *  - 3 Challenge Doors (Vocab → Grammar → Integration)
 *  - Animated Lexio fox mascot
 *  - NPC dialogue after all doors cleared
 *  - Star accumulation display
 *  - Room Clear → cliffhanger flow
 *
 * Props:
 *   weekNumber  {number}   - e.g. 33
 *   dayIndex    {number}   - 0-based (0=Day1 … 4=Day5)
 *   weekData    {object}   - { reading_hub, listening_hub, writing_hub, speaking_hub }
 *   npcDialogue {object}   - { characterName, characterIcon, lines: string[] }
 *   onRoomComplete {fn}    - called with (totalStars) when room is cleared
 *   onExit      {fn}       - navigate back to world map
 */

import React, { useState, useEffect, useMemo } from 'react';
import { getWeeklyPoolWithReview } from '../../services/contentService';
import useChroniclesStore, { DOOR_ROTATION, CHAMBER_METADATA, calculateStars } from '../../stores/useChroniclesStore';
import ArcaneBubbleGame        from './games/ArcaneBubbleGame';
import SpellTrainGame          from './games/SpellTrainGame';
import LexicalDetectiveGame    from './games/LexicalDetectiveGame';
import {
  BubbleStormChase, WordWagonJump, ShadowVaultInfiltrate,
  PotionFlipDungeon, AnvilRushGrammar, ScrollChamberDecode,
  EchoArenaShooter, CatapultCommander, StormShieldDefense,
  HighwaySprint, SyntaxExpressRail, RiddleRunMaze,
  GrandMatrixDungeon, TitanGrammarForge, CambridgeClozeGauntlet,
  SynonymStormDefense,
} from '../quest';


import CollectorPopup          from './CollectorPopup';
import HallOfFameModal         from './HallOfFameModal';
import PhaserGameCanvas        from '../../phaser/PhaserGameCanvas';
import ChunkCatapultCanvas     from './games/ChunkCatapultCanvas';
import SynonymStormGame        from './games/SynonymStormGame';
import WordForgeScrambleGame   from './games/WordForgeScrambleGame';
import ConnectorRelayGame      from './games/ConnectorRelayGame';
import QuestionQuestGame       from './games/QuestionQuestGame';
import StorySequencerGame      from './games/StorySequencerGame';
import WordClassDuelGame       from './games/WordClassDuelGame';
import useDailyQuestStore      from '../../stores/useDailyQuestStore';
import { QUEST_SCHEDULE }      from '../../config/questSchedule';
import { WEEKLY_CATAPULT_PAIRS } from './extractQuestVocab';
import { generateStubCatapultPairs } from './generateStubVocab';
import './DailyRoomScreen.css';

// ─── NPC Default Dialogue (fallback if none provided) ─────────────────────

const DEFAULT_NPC = {
  characterName: 'Sage the Librarian',
  characterIcon: '🧙‍♂️',
  lines: [
    "Well done, young mage! You've unlocked the secrets of this chamber.",
    "The corridor ahead holds more mysteries. Come back tomorrow — the next door awaits you!",
  ],
};

// ─── Door Status Icons ─────────────────────────────────────────────────────

function TreasureChestIcon({ doorIndex, status, stars, doorDef }) {
  const icons = ['🧰', '💎', '🏺'];
  const labels = ['VOCAB CHEST', 'GRAMMAR CHEST', 'INTEGRATION CHEST'];
  const gameIcon = doorDef?.icon || icons[doorIndex];
  const gameName = doorDef?.gameName || doorDef?.label || labels[doorIndex];
  return (
    <div className={`dr-door-indicator ${status}`}>
      <div className="dr-door-icon">{gameIcon}</div>
      <div className="dr-door-label">{labels[doorIndex]}</div>
      <div className="dr-door-game-name">{gameName}</div>
      <div className="dr-door-stars">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`dr-mini-star ${n <= stars ? 'earned' : ''}`}>★</span>
        ))}
      </div>
      {status === 'cleared' && <div className="dr-door-cleared">✓</div>}
      {status === 'locked' && <div className="dr-door-lock">🔒</div>}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function DailyRoomScreen({
  weekNumber,
  dayIndex,
  weekData,
  npcDialogue,
  cliffhanger,
  floorConfig,
  onRoomComplete,
  onExit,
  onBackToMap,
}) {
  const exitHandler = onExit || onBackToMap;
  const { recordDoorStars, completeRoom, getDoorStars } = useChroniclesStore();

  // Extract curriculum content via SRS ContentService
  const [pools, setPools] = useState({ vocab: [], grammar: [], integration: [], loaded: false });

  useEffect(() => {
    let isMounted = true;
    async function fetchPools() {
      const vocabRes = await getWeeklyPoolWithReview(weekNumber, 'vocab');
      const grammarRes = await getWeeklyPoolWithReview(weekNumber, 'grammar');
      const integrationRes = await getWeeklyPoolWithReview(weekNumber, 'integration');
      
      if (isMounted) {
        setPools({
          vocab: vocabRes.items || [],
          grammar: grammarRes.items || [],
          integration: integrationRes.items || [],
          loaded: true
        });
      }
    }
    fetchPools();
    return () => { isMounted = false; };
  }, [weekNumber]);

  // Door rotation for this day (uses floorConfig doors if provided, else defaults)
  const doorDefs = floorConfig?.doors || DOOR_ROTATION[dayIndex] || DOOR_ROTATION[0];

  // Room state machine
  // 'map' → 'door_0' | 'door_1' | 'door_2' → 'npc' → 'cleared'
  const [phase, setPhase] = useState('map');
  const [doorStars, setDoorStars] = useState(() => {
    return useChroniclesStore.getState().getDoorStars(weekNumber, dayIndex);
  });
  const [activeDoor, setActiveDoor] = useState(null);    // 0, 1, or 2
  const [npcLine, setNpcLine] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [showCliffhanger, setShowCliffhanger] = useState(false);
  const [showCollector, setShowCollector] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);

  // Determine current active items based on activeDoor (0=Vocab, 1=Grammar, 2=Integration)
  const rawVocab = activeDoor === 2 ? pools.integration : pools.vocab;
  const vocabItems = (rawVocab || []).filter(item => item.type !== 'grammar' && !item.sentence && !item.definition?.startsWith('Related to'));
  const grammarSentences = pools.grammar;

  const npc = npcDialogue || DEFAULT_NPC;
  const totalStars = doorStars.reduce((a, b) => a + b, 0);

  // Sync stars from store when week or day changes
  useEffect(() => {
    const saved = useChroniclesStore.getState().getDoorStars(weekNumber, dayIndex);
    setDoorStars(saved);
  }, [weekNumber, dayIndex]);

  // URL params / Owner bypass check
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isOwnerBypass = Boolean(
    typeof window !== 'undefined' && (
      localStorage.getItem('arcade_owner_bypass') === 'true' ||
      urlParams?.get('bypass') === 'true' ||
      urlParams?.get('owner') === 'true'
    )
  );

  // Micro-reward Gating: Count quests completed in this day's zone
  const daySchedule = QUEST_SCHEDULE[dayIndex] || QUEST_SCHEDULE[0];
  const completedQuestCount = useMemo(() => {
    if (isOwnerBypass) return 3;
    const isQuestDone = useDailyQuestStore.getState().isQuestCompleted;
    return daySchedule.quests.filter((q) => isQuestDone(weekNumber, q.id)).length;
  }, [weekNumber, dayIndex, phase, isOwnerBypass, daySchedule]);

  // Number of unique doors with > 0 stars in this room
  const clearedDoorsCount = doorStars.filter((s) => s > 0).length;

  /**
   * Micro-reward Door Gating Logic:
   * 1. If door is already cleared (stars > 0) -> 'cleared' (Replay always open)
   * 2. If Owner Bypass is active -> 'active'
   * 3. If completedQuestCount > clearedDoorsCount -> student has an unused key,
   *    so ANY uncleared door is 'active' to choose!
   * 4. Otherwise -> 'locked' (Requires completing another daily quest on the map)
   */
  function getDoorStatus(idx) {
    if (doorStars[idx] > 0) return 'cleared';
    if (isOwnerBypass) return 'active';
    if (completedQuestCount > clearedDoorsCount) return 'active';
    return 'locked';
  }

  // ── Handle door complete ──────────────────────────────────────────────────

  const handleDoorComplete = (doorIdx, stars, _scoreObj) => {
    if (stars === 0) return; // stay in door until 1+ stars

    const newDoorStars = [...doorStars];
    newDoorStars[doorIdx] = Math.max(newDoorStars[doorIdx], stars);
    setDoorStars(newDoorStars);

    // Persist to store
    recordDoorStars(weekNumber, dayIndex, doorIdx, stars);

    // Return to room map
    setPhase('map');
    setActiveDoor(null);

    // Check if all 3 doors cleared
    const allCleared = newDoorStars.every((s) => s > 0);
    if (allCleared) {
      setTimeout(() => setPhase('npc'), 600);
    }
  };

  // ── NPC dialogue advancement ──────────────────────────────────────────────

  const handleNpcNext = () => {
    const lines = npc.lines || [];
    if (npcLine < lines.length - 1) {
      setNpcLine((n) => n + 1);
    } else {
      // NPC done → Room Clear
      const earned = completeRoom(weekNumber, dayIndex);
      setCoinsEarned(earned);
      setPhase('cleared');
    }
  };

  // ── Room cleared → cliffhanger / collectible ─────────────────────────────

  const handleRoomClearContinue = () => {
    const isAlreadyCollected = useChroniclesStore.getState().isCollectibleFound(weekNumber, dayIndex);
    if (!isAlreadyCollected && totalStars >= 6) {
      setShowCollector(true);
    } else {
      setShowCliffhanger(true);
      setTimeout(() => {
        onRoomComplete && onRoomComplete(totalStars);
      }, 2500);
    }
  };

  const handleCollectorClose = () => {
    setShowCollector(false);
    setShowCliffhanger(true);
    setTimeout(() => {
      onRoomComplete && onRoomComplete(totalStars);
    }, 2500);
  };

  // ── Enter door ────────────────────────────────────────────────────────────

  const enterDoor = (idx) => {
    if (getDoorStatus(idx) === 'locked') return;
    setActiveDoor(idx);
    setPhase(`door_${idx}`);
  };

  // ── Safe exit: reset phase state before navigating away (B3 fix) ──────────

  const handleExit = () => {
    // Guard: only navigate out from a stable phase (map or cleared)
    // If called during door/npc phase, reset to map first then exit
    if (phase.startsWith('door_')) {
      setPhase('map');
      setActiveDoor(null);
      // Small delay to avoid React state-flush race before unmount
      setTimeout(() => { exitHandler && exitHandler(); }, 50);
    } else {
      exitHandler && exitHandler();
    }
  };


  // ── Render active mini-game ────────────────────────────────────────────────

  const renderActiveGame = () => {
    const door = doorDefs[activeDoor];
    if (!door) return null;

    const gameId = door.gameId || door.id;

    const commonProps = {
      onComplete: (arg1, arg2) => {
        if (typeof arg1 === 'object' && arg1 !== null) {
          handleDoorComplete(activeDoor, arg1.stars || 1, arg1.score || 0);
        } else {
          handleDoorComplete(activeDoor, arg1 || 1, arg2 || 0);
        }
      },
    };

    switch (gameId) {
      // ── Floor 1: Chamber of Tales ──────────────────────────────────────
      case 'arcane_bubble':
        return <BubbleStormChase vocabItems={vocabItems} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'spell_train':
        return <WordWagonJump grammarSentences={grammarSentences} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'lexical_det':
        return <ShadowVaultInfiltrate vocabItems={vocabItems} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      // ── Floor 2: Alchemy Lab ───────────────────────────────────────────
      case 'crystal_match':
        return <PotionFlipDungeon vocabItems={vocabItems} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'rune_forge':
        return <AnvilRushGrammar grammarSentences={grammarSentences} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'ancient_scroll':
        return (
          <ScrollChamberDecode
            scrollData={{
              title: 'The Principles of Friction & Safety',
              fullSentence: grammarSentences[0]?.fullSentence || 'Rubber shoes create strong friction to prevent dangerous slips.',
              blanks: [
                { id: 'b0', word: vocabItems[0]?.word || 'Rubber' },
                { id: 'b1', word: vocabItems[1]?.word || 'friction' },
                { id: 'b2', word: vocabItems[2]?.word || 'prevent' },
                { id: 'b3', word: vocabItems[3]?.word || 'slips' },
              ],
              distractors: ['Smooth', 'ice', 'cause', 'falls'],
            }}
            duration={door.duration}
            weekNumber={weekNumber}
            onExit={handleExit}
            {...commonProps}
          />
        );

      // ── Floor 3: Thunder Arena ─────────────────────────────────────────
      case 'phonics_bubble':
        return <EchoArenaShooter duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'chunk_catapult': {
        // Pedagogy Guard: Never split sentences mechanically in half.
        // Only accept verified semantic chunk pairs ({ starter, completion }).
        const validPairs = grammarSentences.filter(item => Boolean(item.starter && item.completion));
        const catapultPairs = validPairs.length >= 4 
          ? validPairs 
          : (WEEKLY_CATAPULT_PAIRS[weekNumber] || generateStubCatapultPairs(weekNumber, 6));

        return (
          <ChunkCatapultCanvas
            pairs={catapultPairs}
            duration={door.duration || 90}
            weekNumber={weekNumber}
            doorIndex={1}
            onExit={handleExit}
            onComplete={(stars, score, dIdx) => {
              commonProps.onComplete(stars, score, dIdx);
            }}
          />
        );
      }

      case 'meteor_smasher':
        return <StormShieldDefense meteorVocabulary={vocabItems} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;


      // ── Floor 4: Rune Sanctum ──────────────────────────────────────────
      case 'highway_runner':
        return (
          <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0a0d18' }}>
            <HighwaySprint
              vocabItems={vocabItems}
              duration={door.duration || 120}
              weekNumber={weekNumber}
              onExit={handleExit}
              {...commonProps}
            />
          </div>
        );

      case 'spell_train_express':
        return <SyntaxExpressRail grammarSentences={grammarSentences} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'lexical_riddle':
        return <RiddleRunMaze duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      // ── Floor 5: Apex Spire ────────────────────────────────────────────
      case 'grand_matrix':
        return <GrandMatrixDungeon vocabItems={vocabItems} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'titan_forge':
        return <TitanGrammarForge grammarSentences={grammarSentences} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      case 'cambridge_cloze':
        return <CambridgeClozeGauntlet duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;

      // ── Floor 6: Arcane Skyway ─────────────────────────────────────────
      case 'synonym_storm':
        return <SynonymStormDefense duration={door.duration} weekNumber={weekNumber} weekData={weekData} onExit={handleExit} {...commonProps} />;

      case 'connector_relay':
        return <ConnectorRelayGame grammarSentences={grammarSentences} duration={door.duration} weekNumber={weekNumber} weekData={weekData} onExit={handleExit} {...commonProps} />;

      case 'story_sequencer':
        return <StorySequencerGame duration={door.duration} weekNumber={weekNumber} weekData={weekData} onExit={handleExit} {...commonProps} />;

      // ── Floor 7: Master Sanctum ────────────────────────────────────────
      case 'word_forge_scramble':
        return <WordForgeScrambleGame vocabItems={vocabItems} duration={door.duration} weekNumber={weekNumber} weekData={weekData} onExit={handleExit} {...commonProps} />;

      case 'question_quest':
        return <QuestionQuestGame duration={door.duration} weekNumber={weekNumber} weekData={weekData} onExit={handleExit} {...commonProps} />;

      case 'rune_balance_scale':
        return <WordClassDuelGame duration={door.duration} weekNumber={weekNumber} weekData={weekData} onExit={handleExit} {...commonProps} />;

      // ── Fallback by legacy door.type ──────────────────────────────────
      default:
        if (door.type === 'vocab')       return <ArcaneBubbleGame vocabItems={vocabItems} duration={door.duration} weekNumber={weekNumber} {...commonProps} />;
        if (door.type === 'grammar')     return <SpellTrainGame grammarSentences={grammarSentences} duration={door.duration} weekNumber={weekNumber} {...commonProps} />;
        if (door.type === 'integration') return <LexicalDetectiveGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;
        return null;
    }
  };

  // ── Chapter theme background ───────────────────────────────────────────────

  const themeClass = weekNumber >= 33 && weekNumber <= 40 ? 'theme-storm' : 'theme-library';

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  // ACTIVE MINI-GAME (Fullscreen immersive gameplay with game's native HUD & FloatingExitBtn)
  if (dayIndex >= 7) {
    return (
      <div className={`daily-room-screen ${themeClass}`}>
        <div className="dr-room-clear" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🕸️</div>
          <h2 className="dr-clear-title" style={{ color: '#94a3b8' }}>Nothing&apos;s here!</h2>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>This chamber is completely empty...</p>
          <button className="dr-exit-btn" onClick={handleExit} style={{ marginTop: '20px' }}>
            ← Return to Hall
          </button>
        </div>
      </div>
    );
  }

  if (phase.startsWith('door_') && activeDoor !== null) {
    return (
      <div className={`daily-room-screen ${themeClass} dr-in-game-fullscreen`}>
        <div className="dr-game-area dr-game-area-fullscreen">
          {renderActiveGame()}
        </div>
      </div>
    );
  }

  // NPC DIALOGUE
  if (phase === 'npc') {
    const lines = npc.lines || [];
    return (
      <div className={`daily-room-screen ${themeClass}`}>
        <div className="dr-npc-scene">
          <div className="dr-npc-character">
            <span className="dr-npc-avatar">{npc.characterIcon}</span>
            <span className="dr-npc-name">{npc.characterName}</span>
          </div>
          <div className="dr-npc-bubble">
            <p className="dr-npc-text">{lines[npcLine]}</p>
            <button className="dr-npc-next-btn" onClick={handleNpcNext}>
              {npcLine < lines.length - 1 ? 'Next ▶' : '✓ Understood!'}
            </button>
          </div>
          <div className="dr-lexio-npc">
            <span className="dr-lexio-fox">🦊</span>
          </div>
        </div>
      </div>
    );
  }

  // ROOM CLEARED
  if (phase === 'cleared') {
    if (showCliffhanger) {
      const activeCliff = cliffhanger || floorConfig?.cliffhanger;
      return (
        <div
          className={`daily-room-screen ${themeClass} cliffhanger`}
          style={activeCliff?.bgMoodColor ? { backgroundColor: activeCliff.bgMoodColor } : {}}
        >
          <div className="dr-cliffhanger">
            <div className="dr-cliff-lexio">🦊</div>
            <p className="dr-cliff-text">{activeCliff?.text || 'A strange door glows ahead...'}</p>
            <p className="dr-cliff-sub">{activeCliff?.subText || 'Come back tomorrow! 🌟'}</p>
          </div>
        </div>
      );
    }
    return (
      <div className={`daily-room-screen ${themeClass}`}>
        <div className="dr-room-clear">
          <div className="dr-clear-stars">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} className={`dr-clear-star ${n <= totalStars ? 'earned' : ''}`}>★</span>
            ))}
          </div>
          <h2 className="dr-clear-title">🏆 Chamber Cleared!</h2>
          <div className="dr-clear-stats">
            <div className="dr-stat">
              <span className="dr-stat-label">Stars</span>
              <span className="dr-stat-value">{totalStars}/9</span>
            </div>
            <div className="dr-stat">
              <span className="dr-stat-label">⚡ Boss Energy</span>
              <span className="dr-stat-value">+{totalStars * 10} ⚡</span>
            </div>
            <div className="dr-stat">
              <span className="dr-stat-label">Coins</span>
              <span className="dr-stat-value">+{coinsEarned} 🪙</span>
            </div>
          </div>
          <button className="dr-continue-btn" onClick={handleRoomClearContinue}>
            Continue → 
          </button>
        </div>
        {showCollector && (
          <CollectorPopup
            weekId={weekNumber}
            dayIndex={dayIndex}
            onClose={handleCollectorClose}
          />
        )}
      </div>
    );
  }

  // ROOM MAP (default — 3 doors)
  return (
    <div className={`daily-room-screen ${themeClass}`}>
      {/* Header */}
      <div className="dr-header">
        <button className="dr-exit-btn" onClick={handleExit}>← World Map</button>
        <div className="dr-room-title-block">
          <h2 className="dr-room-title">
            {CHAMBER_METADATA[dayIndex]?.icon} Floor {dayIndex + 1}: {CHAMBER_METADATA[dayIndex]?.chamberName}
          </h2>
          <span className="dr-room-sub-title">
            {CHAMBER_METADATA[dayIndex]?.zoneRef}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowHallOfFame(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fcd34d',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            🏆 Hall of Fame
          </button>
          <div className="dr-pp-badge">⚡ {totalStars * 10} Boss Energy</div>
        </div>
      </div>

      {/* Lexio walks the room */}
      <div className="dr-room-scene">
        <div className="dr-room-bg" />
        <div className={`dr-lexio-walker day-${dayIndex}`}>
          <span className="dr-lexio-fox">🦊</span>
        </div>
      </div>

      {/* Progress bar: Stars collected */}
      <div className="dr-stars-row">
        {doorStars.map((s, i) => (
          <div key={i} className="dr-door-star-group">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`dr-star-pip ${n <= s ? 'earned' : ''}`}>★</span>
            ))}
          </div>
        ))}
        <span className="dr-stars-total">{totalStars}/9</span>
      </div>

      {/* Guidance Banner */}
      <div className="dr-instruction-banner">
        <div className="dr-ib-icon">🦊</div>
        <div className="dr-ib-text">
          <div className="dr-ib-title">
            {completedQuestCount > clearedDoorsCount
              ? `🗝️ Key ready! Choose any chest to unlock (${clearedDoorsCount}/3 cleared)`
              : clearedDoorsCount === 3
                ? '🏆 All 3 chests cleared! Floor completed!'
                : `🔒 Complete Quest ${clearedDoorsCount + 1} on the Map to earn your next Key! (${completedQuestCount}/3 Quests done)`}
          </div>
          <div className="dr-ib-sub">
            🧰 Chest 1: {doorDefs[0]?.gameName} • 💎 Chest 2: {doorDefs[1]?.gameName} • 🏺 Chest 3: {doorDefs[2]?.gameName}
          </div>
        </div>
      </div>

      {/* 3 Challenge Doors */}
      <div className="dr-doors-row">
        {doorDefs.map((door, idx) => {
          const status = getDoorStatus(idx);
          return (
            <div key={idx} className="dr-door-slot">
              <TreasureChestIcon doorIndex={idx} status={status} stars={doorStars[idx]} doorDef={door} />
              <button
                className={`dr-door-enter-btn ${status}`}
                onClick={() => enterDoor(idx)}
                disabled={status === 'locked'}
              >
                {status === 'active' && '🔑 Open Chest'}
                {status === 'cleared' && '↺ Replay'}
                {status === 'locked' && '🔒 Need Key'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Room description */}
      <div className="dr-room-desc">
        <p>Unlock all 3 treasure chests to meet the Chamber Guardian and complete this floor!</p>
      </div>

      {/* Hall of Fame Modal */}
      <HallOfFameModal
        isOpen={showHallOfFame}
        onClose={() => setShowHallOfFame(false)}
      />
    </div>
  );
}
