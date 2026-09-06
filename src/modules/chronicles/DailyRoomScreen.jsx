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
import { extractQuestVocab } from './extractQuestVocab';
import useChroniclesStore, { DOOR_ROTATION, calculateStars } from '../../stores/useChroniclesStore';
import ArcaneBubbleGame        from './games/ArcaneBubbleGame';
import SpellTrainGame          from './games/SpellTrainGame';
import LexicalDetectiveGame    from './games/LexicalDetectiveGame';
import CrystalMemoryMatchGame  from './games/CrystalMemoryMatchGame';
import RuneForgeGame           from './games/RuneForgeGame';
import AncientScrollFillGame   from './games/AncientScrollFillGame';
import CollectorPopup          from './CollectorPopup';
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

function DoorIcon({ doorIndex, status, stars, doorDef }) {
  const icons = ['🔵', '🟡', '🔴'];
  const labels = ['Vocab Door', 'Grammar Door', 'Integration Door'];
  const gameIcon = doorDef?.icon || icons[doorIndex];
  const gameName = doorDef?.gameNameVi || doorDef?.label || labels[doorIndex];
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
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function DailyRoomScreen({
  weekNumber,
  dayIndex,
  weekData,
  npcDialogue,
  onRoomComplete,
  onExit,
}) {
  const { recordDoorStars, completeRoom, getDoorStars } = useChroniclesStore();

  // Extract curriculum content once
  const { vocabItems, grammarSentences } = useMemo(
    () => extractQuestVocab(weekData, dayIndex),
    [weekData, dayIndex]
  );

  // Door rotation for this day
  const doorDefs = DOOR_ROTATION[dayIndex] || DOOR_ROTATION[0];

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

  const npc = npcDialogue || DEFAULT_NPC;
  const totalStars = doorStars.reduce((a, b) => a + b, 0);

  // Sync stars from store when week or day changes
  useEffect(() => {
    const saved = useChroniclesStore.getState().getDoorStars(weekNumber, dayIndex);
    setDoorStars(saved);
  }, [weekNumber, dayIndex]);

  // All 3 doors are open for the student to explore freely in any order
  function getDoorStatus(idx) {
    if (doorStars[idx] > 0) return 'cleared';
    return 'active';
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

  // ── Render active mini-game ────────────────────────────────────────────────

  const renderActiveGame = () => {
    const door = doorDefs[activeDoor];
    if (!door) return null;

    const commonProps = {
      onComplete: (stars, score) => handleDoorComplete(activeDoor, stars, score),
    };

    switch (door.id) {
      // ── Day 1 / Day 3-4 games ─────────────────────────────────────────
      case 'arcane_bubble':
        return <ArcaneBubbleGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;

      case 'spell_train':
        return <SpellTrainGame grammarSentences={grammarSentences} duration={door.duration} {...commonProps} />;

      case 'lexical_det':
        return <LexicalDetectiveGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;

      // ── Day 2 / Day 5 games ───────────────────────────────────────────
      case 'crystal_match':
        return <CrystalMemoryMatchGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;

      case 'rune_forge':
        return <RuneForgeGame grammarSentences={grammarSentences} duration={door.duration} {...commonProps} />;

      case 'ancient_scroll':
        return <AncientScrollFillGame vocabItems={vocabItems} grammarSentences={grammarSentences} duration={door.duration} {...commonProps} />;

      // ── Day 3 placeholder games (audio-based — Phase 4) ───────────────
      case 'shadow_reveal':
        // Fallback to ArcaneBubble until audio games ship
        return <ArcaneBubbleGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;

      case 'echo_chamber':
        return <SpellTrainGame grammarSentences={grammarSentences} duration={door.duration} {...commonProps} />;

      case 'sound_portal':
        return <LexicalDetectiveGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;

      // ── Fallback by legacy door.type ──────────────────────────────────
      default:
        if (door.type === 'vocab')       return <ArcaneBubbleGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;
        if (door.type === 'grammar')     return <SpellTrainGame grammarSentences={grammarSentences} duration={door.duration} {...commonProps} />;
        if (door.type === 'integration') return <LexicalDetectiveGame vocabItems={vocabItems} duration={door.duration} {...commonProps} />;
        return null;
    }
  };

  // ── Chapter theme background ───────────────────────────────────────────────

  const themeClass = weekNumber >= 33 && weekNumber <= 40 ? 'theme-storm' : 'theme-library';

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  // ACTIVE MINI-GAME
  if (phase.startsWith('door_') && activeDoor !== null) {
    return (
      <div className={`daily-room-screen ${themeClass}`}>
        <div className="dr-game-header">
          <button className="dr-back-btn" onClick={() => { setPhase('map'); setActiveDoor(null); }}>
            ← Phòng
          </button>
          <span className="dr-game-label">
            {doorDefs[activeDoor]?.icon} {doorDefs[activeDoor]?.gameNameVi || ['🔵 Vocab Door', '🟡 Grammar Door', '🔴 Integration Door'][activeDoor]}
          </span>
          <span className="dr-day-badge">Day {dayIndex + 1}</span>
        </div>
        <div className="dr-game-area">
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
      return (
        <div className={`daily-room-screen ${themeClass} cliffhanger`}>
          <div className="dr-cliffhanger">
            <div className="dr-cliff-lexio">🦊</div>
            <p className="dr-cliff-text">A strange door glows ahead...</p>
            <p className="dr-cliff-sub">Come back tomorrow! 🌟</p>
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
          <h2 className="dr-clear-title">🏆 Room Cleared!</h2>
          <div className="dr-clear-stats">
            <div className="dr-stat">
              <span className="dr-stat-label">Stars</span>
              <span className="dr-stat-value">{totalStars}/9</span>
            </div>
            <div className="dr-stat">
              <span className="dr-stat-label">Power Points</span>
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
        <button className="dr-exit-btn" onClick={onExit}>← Map</button>
        <h2 className="dr-room-title">Day {dayIndex + 1} Chamber</h2>
        <div className="dr-pp-badge">⚡ {totalStars * 10} PP</div>
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
          <div className="dr-ib-title">Khám phá 3 cánh cửa với 3 thể loại game khác nhau:</div>
          <div className="dr-ib-sub">
            🔵 Cửa 1: {doorDefs[0]?.gameNameVi} • 🟡 Cửa 2: {doorDefs[1]?.gameNameVi} • 🔴 Cửa 3: {doorDefs[2]?.gameNameVi}
          </div>
        </div>
      </div>

      {/* 3 Challenge Doors */}
      <div className="dr-doors-row">
        {doorDefs.map((door, idx) => {
          const status = getDoorStatus(idx);
          return (
            <div key={idx} className="dr-door-slot">
              <DoorIcon doorIndex={idx} status={status} stars={doorStars[idx]} doorDef={door} />
              <button
                className={`dr-door-enter-btn ${status}`}
                onClick={() => enterDoor(idx)}
              >
                {status === 'active' && '⚡ Vào thử thách'}
                {status === 'cleared' && '↺ Chơi lại'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Room description */}
      <div className="dr-room-desc">
        <p>Clear all 3 doors to summon the NPC and complete this chamber!</p>
      </div>
    </div>
  );
}
