// src/components/questmap/QuestEntryOverlay.jsx
import React, { useState, useEffect } from 'react';
import { playButtonClick } from '../../utils/soundEffects';
import './QuestEntryOverlay.css';

// Lore hooks per quest — anchored to QUEST_SCHEDULE task IDs
const QUEST_LORE = {
  gear1_webtoon:    { hook: "The Story World awakens! Read the scenes to collect the first Storm Words.", icon: "📚", color: "#3b82f6" },
  gear2_karaoke:    { hook: "Echo the voices! Shadow the story's words — each perfect echo charges a Thunder Rune.", icon: "🎧", color: "#8b5cf6" },
  gear3_retell:     { hook: "The story is yours now. Retell it — unlock the Voice Fragment for the Chronicles!", icon: "🎙️", color: "#10b981" },
  gear4_clil:       { hook: "New knowledge incoming! The Alchemy Lab door opens only to true Fact Finders.", icon: "🌐", color: "#06b6d4" },
  science_lab:      { hook: "Action Lab is waiting! Solve the 3 mysteries to forge a Crystal Shard.", icon: "🧪", color: "#10b981" },
  science_report:   { hook: "Report your discoveries! Your findings light up the Knowledge Lab doorway.", icon: "📝", color: "#f59e0b" },
  word_blitz:       { hook: "⚡ Speed Match is LIVE! Hit 10 words in 60 seconds — the Battle Arena gate cracks open!", icon: "⚡", color: "#f59e0b" },
  sentence_smash:   { hook: "Grammar Duel begins! Arrange the sentence swords — defeat 5 duels to unlock the Storm Rune.", icon: "🧱", color: "#ef4444" },
  math_quest:       { hook: "Math Quest countdown! Solve the Bar Models — each solution charges ⚡ Boss Energy.", icon: "📐", color: "#8b5cf6" },
  story_writer:     { hook: "The pen is mightier! Write your 3-scene story — the Creator Studio seal awaits.", icon: "✏️", color: "#6366f1" },
  broadcast_studio: { hook: "Cameras rolling! Your Video Challenge unlocks the final Creator Studio fragment.", icon: "📹", color: "#ec4899" },
  info_exchange:    { hook: "Nova is waiting! Ask and answer — complete the Info Exchange to forge the Speaking Key.", icon: "🔄", color: "#14b8a6" },
  boss_listening:   { hook: "🎧 Listening Shield activated! 5 parts. Crack every audio challenge to defend the Castle.", icon: "🎧", color: "#0ea5e9" },
  boss_reading:     { hook: "📖 Reading & Writing Shield — the Boss Castle final barrier. Seal it with your pen!", icon: "📖", color: "#6366f1" },
  weekly_review:    { hook: "🏆 Speaking & Passport — the final gate of the week! Clear it to earn your Chronicle Stars.", icon: "🏆", color: "#f59e0b" },
};

const DEFAULT_LORE = { hook: "A new challenge awaits! Complete it to unlock the next chapter.", icon: "⚡", color: "#6366f1" };

export default function QuestEntryOverlay({ taskId, taskLabel, weekId, onDismiss }) {
  const [visible, setVisible] = useState(true);
  const lore = QUEST_LORE[taskId] || DEFAULT_LORE;

  useEffect(() => {
    // Auto-dismiss after 4000ms — long enough for students to read the overlay
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300); // Wait for fade-out animation
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleSkip = () => {
    playButtonClick();
    setVisible(false);
    setTimeout(onDismiss, 200);
  };

  return (
    <div
      className={`qeo-overlay ${visible ? 'qeo-enter' : 'qeo-exit'}`}
      onClick={handleSkip}
      style={{ '--accent': lore.color }}
    >
      {/* Lexio mascot runs in from left */}
      <div className="qeo-mascot">🦊</div>

      {/* Mission Unlocked badge */}
      <div className="qeo-badge">
        <span className="qeo-badge-label">⚡ MISSION UNLOCKED</span>
      </div>

      {/* Quest title — large, cinematic */}
      <div className="qeo-quest-icon">{lore.icon}</div>
      <h2 className="qeo-quest-title">{taskLabel}</h2>

      {/* Lore hook text */}
      <p className="qeo-lore-text">"{lore.hook}"</p>

      {/* Progress narrative */}
      <div className="qeo-door-hint">
        🔐 Complete this quest → unlock the next door
      </div>

      {/* Skip tap anywhere hint */}
      <span className="qeo-skip-hint">Tap anywhere to skip</span>
    </div>
  );
}
