/**
 * ChroniclesScreen.jsx — Top-level screen for The Lexio Chronicles
 *
 * Route: /week/:weekId/chronicles
 *
 * Manages the full adventure flow:
 *  World Map → Daily Room → Boss Battle
 *
 * Week data is lazy-loaded from src/data/weeks/week_XX/
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChroniclesWorldMap from './ChroniclesWorldMap';
import DailyRoomScreen    from './DailyRoomScreen';
import BossBattleScreen   from './BossBattleScreen';
import useChroniclesStore from '../../stores/useChroniclesStore';

// NPC dialogues per day, week 33 (pilot) — later move to data file
const W33_NPC_DIALOGUES = [
  {
    characterName: 'Storm Mage Aria',
    characterIcon: '🧙‍♀️',
    lines: [
      "You made it through the Story Chamber! The corridor ahead is filled with ancient knowledge.",
      "Remember: every word you learn is a new spell in your arsenal. Keep going, young mage! 🦊",
    ],
  },
  {
    characterName: 'Thunder Witch Mira',
    characterIcon: '⚡',
    lines: [
      "Oh, thank goodness you made it! Be careful — the corridor ahead is slippery from the rain spell.",
      "I hurt my knee here last Tuesday. Take this bandage, just in case. Now go, the Storm Crystal is waiting!",
    ],
  },
  {
    characterName: 'Keeper of Battles, Axel',
    characterIcon: '🗡️',
    lines: [
      "You've proven yourself in the Battle Arena! Speed and accuracy — that's what wins!",
      "The Creator's Studio awaits you tomorrow. A new kind of challenge... of the mind! 🧠",
    ],
  },
  {
    characterName: 'Inventor Zora',
    characterIcon: '🔧',
    lines: [
      "Words can build worlds! You've unlocked the Creator's Studio. Well done!",
      "Tomorrow, the Boss Castle awaits. Gather your strength — the Storm Guardian is powerful. But so are you! ⚡",
    ],
  },
  {
    characterName: 'Elder Chronos',
    characterIcon: '🏰',
    lines: [
      "You've reached the Boss Castle... impressive for a young mage.",
      "Defeat the Storm Guardian and the Crystal of Speaking will be yours. The adventure continues! 🦊",
    ],
  },
];

/** Lazy-load week data to avoid bundling all weeks */
async function loadWeekData(weekNumber) {
  try {
    const [reading, listening, writing, speaking] = await Promise.all([
      import(`../../data/weeks/week_${weekNumber}/reading_hub.js`).catch(() => ({ default: {} })),
      import(`../../data/weeks/week_${weekNumber}/listening_hub.js`).catch(() => ({ default: {} })),
      import(`../../data/weeks/week_${weekNumber}/writing_hub.js`).catch(() => ({ default: {} })),
      import(`../../data/weeks/week_${weekNumber}/speaking_hub.js`).catch(() => ({ default: {} })),
    ]);
    return {
      reading_hub:  reading.default?.readingHubData  || reading.default  || reading.readingHubData || {},
      listening_hub:listening.default?.listeningHub  || listening.default?.listeningHubData || listening.default || {},
      writing_hub:  writing.default?.writingHubData  || writing.default  || {},
      speaking_hub: speaking.default?.speakingHubData|| speaking.default || {},
    };
  } catch (e) {
    console.warn('[ChroniclesScreen] Failed to load week data:', e);
    return { reading_hub: {}, listening_hub: {}, writing_hub: {}, speaking_hub: {} };
  }
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function ChroniclesScreen() {
  const { weekId } = useParams();
  const weekNumber = parseInt(weekId) || 33;
  const navigate = useNavigate();

  const [screen, setScreen] = useState('map'); // 'map' | 'room' | 'boss'
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load week data once
  useEffect(() => {
    setLoading(true);
    loadWeekData(weekNumber).then((data) => {
      setWeekData(data);
      setLoading(false);
    });
  }, [weekNumber]);

  const weeklyPP = useChroniclesStore(s => s.weeklyPP[`w${weekNumber}`] || 0);

  const handleEnterRoom = (dayIndex) => {
    setActiveDayIndex(dayIndex);
    setScreen('room');
  };

  const handleEnterBoss = (tier) => {
    setScreen('boss');
  };

  const handleRoomComplete = (totalStars) => {
    setScreen('map');
    setActiveDayIndex(null);
  };

  const handleExit = () => {
    if (screen === 'map') {
      navigate(`/week/${weekNumber}/hub/1`);
    } else {
      setScreen('map');
      setActiveDayIndex(null);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f1f5f9',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '1.1rem',
        gap: 12,
      }}>
        <span style={{ fontSize: '2rem' }}>🦊</span>
        Loading Chronicles...
      </div>
    );
  }

  // BOSS SCREEN
  if (screen === 'boss') {
    return (
      <BossBattleScreen
        weekNumber={weekNumber}
        pp={weeklyPP}
        weekData={weekData}
        onBackToMap={() => setScreen('map')}
        onDefeat={() => setScreen('map')}
      />
    );
  }

  // ROOM SCREEN
  if (screen === 'room' && activeDayIndex !== null) {
    const npcDialogue = weekNumber === 33
      ? W33_NPC_DIALOGUES[activeDayIndex]
      : undefined; // other weeks use default

    return (
      <DailyRoomScreen
        weekNumber={weekNumber}
        dayIndex={activeDayIndex}
        weekData={weekData}
        npcDialogue={npcDialogue}
        onRoomComplete={handleRoomComplete}
        onExit={handleExit}
      />
    );
  }

  // WORLD MAP (default)
  return (
    <ChroniclesWorldMap
      weekNumber={weekNumber}
      onEnterRoom={handleEnterRoom}
      onEnterBoss={handleEnterBoss}
    />
  );
}
