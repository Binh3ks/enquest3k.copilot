// src/components/questmap/QuestCompleteFanfare.jsx
import React, { useState, useEffect } from 'react';
import { playVictoryFanfare, playCoinSound } from '../../utils/soundEffects';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import useChroniclesStore from '../../stores/useChroniclesStore';
import './QuestCompleteFanfare.css';

// What each quest unlocks — narrative text for "door unlock" hint
const UNLOCK_NARRATIVE = {
  gear1_webtoon:    { next: "Voice Shadow 🎧", hint: "The echo chamber opens!" },
  gear2_karaoke:    { next: "Story Retell 🎙️", hint: "The storytelling stage is yours!" },
  gear3_retell:     { next: "Floor 1 — Chamber of Tales 📜", hint: "Chronicles Floor 1 is now accessible!" },
  gear4_clil:       { next: "Action Lab 🧪", hint: "The experiment chamber unlocks!" },
  science_lab:      { next: "Discovery Report 📝", hint: "Your findings light up the next door!" },
  science_report:   { next: "Floor 2 — Alchemy Lab ⚗️", hint: "Chronicles Floor 2 opens its gates!" },
  word_blitz:       { next: "Grammar Duel 🧱", hint: "The duel ring is ready for you!" },
  sentence_smash:   { next: "Math Quest 📐", hint: "The calculation chamber activates!" },
  math_quest:       { next: "Floor 3 — Thunder Arena ⚡", hint: "Chronicles Floor 3 — Thunder Arena unlocked!" },
  story_writer:     { next: "Video Challenge 📹", hint: "Cameras are rolling for your next quest!" },
  broadcast_studio: { next: "Info Exchange 🔄", hint: "Nova is ready to talk with you!" },
  info_exchange:    { next: "Floor 4 — Rune Sanctum ⚒️", hint: "Chronicles Floor 4 — Rune Sanctum opens!" },
  boss_listening:   { next: "Reading & Writing Shield 📖", hint: "The reading fortress gate cracks open!" },
  boss_reading:     { next: "Speaking & Passport 🏆", hint: "Final gate of the week — almost there!" },
  weekly_review:    { next: "Floor 5 — Apex Spire 🏰 + Boss Chamber", hint: "Chronicles Apex Spire & Weekly Boss unlocked!" },
};

export default function QuestCompleteFanfare({ taskId, taskLabel, score = 100, xpEarned = 0, weekId, onComplete }) {
  const [phase, setPhase] = useState('stars'); // 'stars' → 'xp' → 'door_hint' → 'done'
  const unlock = UNLOCK_NARRATIVE[taskId] || { next: "Next Quest", hint: "The path forward opens!" };
  
  // Read PP hint from chronicles store
  const weeklyPP = useChroniclesStore(s => s.weeklyPP?.[`w${weekId}`] || 0);
  const ppEarnedHint = `+${Math.min(30, Math.max(10, Math.floor(score/10)))} ⚡ Power Points for Chronicles!`;

  useEffect(() => {
    // Phase timing
    playVictoryFanfare();
    fireCelebrationConfetti(taskId);

    const t1 = setTimeout(() => setPhase('xp'), 1200);
    const t2 = setTimeout(() => { playCoinSound(); setPhase('door_hint'); }, 2400);
    const t3 = setTimeout(() => setPhase('done'), 4800);
    const t4 = setTimeout(() => { if (onComplete) onComplete(); }, 5200); // Navigate after fade-out

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []); // eslint-disable-line

  return (
    <div className={`qcf-overlay ${phase === 'done' ? 'qcf-exit' : 'qcf-enter'}`}>
      
      {/* Phase 1: Stars rain in */}
      <div className={`qcf-stars-burst ${phase !== 'stars' ? 'qcf-fade-up' : ''}`}>
        <div className="qcf-star-row">
          {['⭐', '⭐', '⭐'].map((s, i) => (
            <span key={i} className="qcf-star" style={{ animationDelay: `${i * 0.15}s` }}>{s}</span>
          ))}
        </div>
        <h2 className="qcf-complete-title">⚔️ Quest Complete!</h2>
        <p className="qcf-task-name">{taskLabel}</p>
      </div>

      {/* Phase 2: XP + PP counter */}
      {(phase === 'xp' || phase === 'door_hint') && (
        <div className="qcf-rewards-row">
          {xpEarned > 0 && (
            <div className="qcf-reward-pill qcf-xp">
              🏆 +{xpEarned} XP
            </div>
          )}
          {ppEarnedHint && (
            <div className="qcf-reward-pill qcf-pp">
              {ppEarnedHint}
            </div>
          )}
        </div>
      )}

      {/* Phase 3: Door unlock hint */}
      {phase === 'door_hint' && (
        <div className="qcf-door-unlock">
          <div className="qcf-door-icon">🔓</div>
          <div className="qcf-door-text">
            <span className="qcf-door-label">UNLOCKED</span>
            <span className="qcf-door-next">{unlock.next}</span>
            <span className="qcf-door-hint">"{unlock.hint}"</span>
          </div>
        </div>
      )}

      {/* Tap to skip */}
      <button className="qcf-skip-btn" onClick={onComplete}>
        Continue →
      </button>
    </div>
  );
}
