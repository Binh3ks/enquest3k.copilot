/**
 * HighwaySprint.jsx — 3D Vertical Perspective Runner
 *
 * Major Revamp:
 * - True 3D perspective via CSS (objects scale and converge naturally)
 * - Audio-First Pedagogy: Definition is spoken aloud via TTS
 * - Comfortable speed (6+ seconds reaction time, 3.5s in prime reading zone)
 * - True upright billboarding on the track surface (no sinking or clipping)
 * - 1-Tap Lane Steering: Tap left, center, or right lane to move Leo instantly
 * - Jump hurdles, slide under high lasers, steer around rock pillars
 * - Rear-view Leo mascot running into the screen
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Sparkles, AlertTriangle, Trophy, RotateCcw } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import LeoCharacterBack from './LeoCharacterBack';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './HighwaySprint.css';

// Words Bank to ensure rich curriculum content & long playtime
const DEFAULT_HIGHWAY_ROUNDS = [
  { targetWord: 'friction', definition: 'The force that slows things down when surfaces slide together', distractors: ['gravity', 'velocity', 'magnetism'] },
  { targetWord: 'safety', definition: 'The state of being protected from danger or injury', distractors: ['hazard', 'accident', 'risk'] },
  { targetWord: 'slippery', definition: 'Difficult to stand or walk on because it is wet or smooth', distractors: ['sticky', 'bumpy', 'rough'] },
  { targetWord: 'rubber', definition: 'A tough, elastic material used to make shoes grip the floor', distractors: ['plastic', 'metal', 'cotton'] },
  { targetWord: 'corridor', definition: 'A long hallway or passage inside a school or building', distractors: ['balcony', 'basement', 'courtyard'] },
  { targetWord: 'laboratory', definition: 'A room specially equipped for scientific experiments', distractors: ['cafeteria', 'gymnasium', 'dormitory'] },
  { targetWord: 'traction', definition: 'The grip between shoes or tires and the floor to stop slipping', distractors: ['motion', 'weight', 'speed'] },
  { targetWord: 'prevent', definition: 'To stop something dangerous or painful from happening', distractors: ['allow', 'create', 'forget'] },
  { targetWord: 'polished', definition: 'Made smooth and shiny by rubbing or waxing', distractors: ['rough', 'dusty', 'cracked'] },
  { targetWord: 'bandage', definition: 'A strip of clean cloth used to cover and protect a wound', distractors: ['blanket', 'ribbon', 'napkin'] },
];

// Lane horizontal positions across the track (% width)
const LANE_PCTS = ['16.66%', '50%', '83.33%'];

export default function HighwaySprint({
  vocabItems = [],
  duration = 150,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_sprint') || 0;

  // Build 10 Rounds from vocabItems + DEFAULT_HIGHWAY_ROUNDS
  const rounds = useMemo(() => {
    const valid = (vocabItems || []).filter(v => v.word && v.definition && v.word.length > 2);
    const pool = [...valid, ...DEFAULT_HIGHWAY_ROUNDS];
    const uniqueMap = new Map();

    pool.forEach(item => {
      const w = (item.word || '').trim().toLowerCase();
      if (w && !uniqueMap.has(w)) {
        uniqueMap.set(w, {
          targetWord: w,
          definition: item.definition || item.meaning || 'A scientific or everyday concept',
          distractors: item.distractors || [],
        });
      }
    });

    const uniqueList = Array.from(uniqueMap.values());
    const selected = uniqueList.slice(0, 10);

    return selected.map((r, idx) => {
      const otherWords = uniqueList.filter((_, i) => i !== idx).map(u => u.targetWord);
      return {
        ...r,
        distractors: otherWords.length >= 2 ? otherWords.slice(0, 3) : ['hazard', 'obstacle'],
      };
    });
  }, [vocabItems]);

  const [phase, setPhase] = useState('reading_definition'); // 'reading_definition' | 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_HIGHWAY_ROUNDS[0];

  // Leo State
  const [currentLane, setCurrentLane] = useState(1); // 0=Left, 1=Center, 2=Right
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const invincibleUntil = useRef(0);

  // Incoming Objects Array: [{ id, lane, type, word, dist }]
  // dist = distance along runway (from 2600px down to 50px at Leo)
  const [objects, setObjects] = useState([]);
  const roundSpawning = useRef(false);

  // Audio-First Logic
  const speakCurrentDefinition = useCallback(() => {
    if (!currentRound?.definition) return;
    speakText(`Find the word: ${currentRound.definition}`, null, 1.0, null, 'sentence', weekNumber);
  }, [currentRound, weekNumber]);

  useEffect(() => {
    if (phase === 'reading_definition') {
      speakCurrentDefinition();
      // Brief 2.2s intro pause so student hears the clue, then start incoming wave
      const t = setTimeout(() => {
        setPhase('playing');
        roundSpawning.current = true;
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, roundIdx, speakCurrentDefinition]);

  // Actions
  const triggerJump = useCallback(() => {
    if (isJumping || isSliding || phase !== 'playing') return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  }, [isJumping, isSliding, phase]);

  const triggerSlide = useCallback(() => {
    if (isJumping || isSliding || phase !== 'playing') return;
    setIsSliding(true);
    setTimeout(() => setIsSliding(false), 600);
  }, [isJumping, isSliding, phase]);

  // Spawning Wave at far end of runway (dist = 2600px)
  const spawnRoundWave = useCallback(() => {
    const lanes = [0, 1, 2].sort(() => Math.random() - 0.5);

    let obstacleType = 'barrier_low';
    if (roundIdx >= 4) {
      const r = Math.random();
      obstacleType = r < 0.35 ? 'barrier_pillar' : r < 0.7 ? 'barrier_high' : 'barrier_low';
    } else if (roundIdx >= 2) {
      obstacleType = Math.random() > 0.5 ? 'barrier_high' : 'barrier_low';
    }

    const distractorWord = currentRound.distractors[0] || 'hazard';

    const newWave = [
      { id: `tgt_${Date.now()}_0`, lane: lanes[0], type: 'target', word: currentRound.targetWord, dist: 2800 },
      { id: `dist_${Date.now()}_1`, lane: lanes[1], type: 'distractor', word: distractorWord, dist: 2800 },
      { id: `barr_${Date.now()}_2`, lane: lanes[2], type: obstacleType, word: '', dist: 2800 },
    ];

    setObjects(newWave);
    roundSpawning.current = false;
  }, [roundIdx, currentRound]);

  // Initial wave spawn when entering 'playing'
  useEffect(() => {
    if (phase === 'playing' && roundSpawning.current) {
      setObjects([]);
      spawnRoundWave();
    }
  }, [phase, spawnRoundWave]);

  // Keyboard controls
  useEffect(() => {
    if (phase !== 'playing') return;
    const onKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); setCurrentLane(l => Math.max(0, l - 1)); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); setCurrentLane(l => Math.min(2, l + 1)); }
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) { e.preventDefault(); triggerJump(); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); triggerSlide(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, triggerJump, triggerSlide]);

  // Game Loop: Smooth 60fps movement
  // Speed is gentle (360px/s) giving ~6.5s travel time and 3.5s readable window
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animId;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const nowMs = Date.now();
      setInvincible(nowMs < invincibleUntil.current);

      // Gentle speed progression: 360px/s up to 460px/s max
      const speed = 360 + Math.min(roundIdx, 8) * 12;

      setObjects(prev => {
        if (prev.length === 0) return prev;
        const next = [];
        let hitTarget = false;

        for (const obj of prev) {
          const newDist = obj.dist - speed * dt;

          // Collision Check Zone (at Leo's position of 450px: between 410px and 490px)
          const inHitZone = newDist <= 490 && newDist >= 410;
          const sameLane = obj.lane === currentLane;

          if (inHitZone && sameLane) {
            if (obj.type === 'target') {
              hitTarget = true;
              speakText(obj.word, null, 1.1, null, 'word', weekNumber);
              const combo = Math.min(3, streak + 1);
              const xp = 35 * combo;
              setScore(s => s + xp);
              setStreak(st => st + 1);
              setFeedback({ type: 'correct', text: `✨ Matched "${obj.word}"! (+${xp} XP)` });

              setTimeout(() => {
                setFeedback(null);
                const nextRound = roundIdx + 1;
                if (nextRound >= rounds.length) {
                  setPhase('cleared');
                  setScore(s => s + (timeLeft * 2) + 100);
                  speakText('Cosmic Highway Champion! All words cleared!');
                } else {
                  setRoundIdx(nextRound);
                  setPhase('reading_definition');
                }
              }, 700);
              continue;
            }

            if (obj.type === 'barrier_low') {
              if (isJumping) {
                setScore(s => s + 10);
                setFeedback({ type: 'correct', text: '⚡ Hurdle Cleared! (+10 XP)' });
                setTimeout(() => setFeedback(null), 800);
                continue;
              } else if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => { const nh = Math.max(0, h - 1); if (nh <= 0) setPhase('ko'); return nh; });
                setFeedback({ type: 'wrong', text: '💥 TRIPPED! Press UP or JUMP for hurdles!' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            if (obj.type === 'barrier_high') {
              if (isSliding) {
                setScore(s => s + 10);
                setFeedback({ type: 'correct', text: '🛹 Ducked Laser! (+10 XP)' });
                setTimeout(() => setFeedback(null), 800);
                continue;
              } else if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => { const nh = Math.max(0, h - 1); if (nh <= 0) setPhase('ko'); return nh; });
                setFeedback({ type: 'wrong', text: '💥 LASER STRUCK! Press DOWN or SLIDE to duck!' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            if (obj.type === 'barrier_pillar' || obj.type === 'distractor') {
              if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => { const nh = Math.max(0, h - 1); if (nh <= 0) setPhase('ko'); return nh; });
                setFeedback({
                  type: 'wrong',
                  text: obj.type === 'distractor'
                    ? `⚠️ That was "${obj.word}"! Target is "${currentRound.targetWord}"!`
                    : '💥 CRASHED! Steer to dodge pillars!'
                });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }
          }

          // Keep object while it is on the track (dist > -50)
          if (newDist > -50 && !hitTarget) {
            next.push({ ...obj, dist: newDist });
          }
        }

        // If whole wave passed without picking target: respawn wave or advance
        if (next.length === 0 && !roundSpawning.current && phase === 'playing') {
          spawnRoundWave();
        }

        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [phase, currentLane, isJumping, isSliding, roundIdx, rounds.length, streak, timeLeft, weekNumber, spawnRoundWave, currentRound]);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    const t = setInterval(() => {
      setTimeLeft(v => {
        if (v <= 1) { setPhase('ko'); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const handleRetry = () => {
    setHearts(3); setScore(0); setTimeLeft(duration); setRoundIdx(0);
    setCurrentLane(1); setIsJumping(false); setIsSliding(false); setStreak(0);
    setPhase('reading_definition');
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, rounds.length * 35);
    recordPersonalBest('highway_sprint', score);
    if (onComplete) onComplete(stars, score);
    else if (onExit) onExit();
  };

  const leoAnimState = isJumping ? 'jump' : isSliding ? 'slide' : (phase === 'playing' ? 'run' : 'idle');

  return (
    <div className={`highway-3d-root ${phase === 'reading_definition' ? 'reading-paused' : ''}`}>

      {/* ── Top Target Definition Banner ── */}
      <header className="highway-3d-banner" role="banner">
        <div className="banner-left-section">
          <div className="banner-badge-box">
            <span className="banner-target-tag">WORD {roundIdx + 1} / {rounds.length}</span>
            {streak > 1 && <span className="banner-streak-badge">⚡ Combo x{Math.min(3, streak)}</span>}
          </div>
          <button className="banner-audio-btn" onClick={speakCurrentDefinition} title="Listen again">
            <Volume2 size={20} className="volume-icon-pulse" />
            <span>Listen</span>
          </button>
        </div>
        <div className="banner-definition-center">
          <span className="def-instruction-label">🎯 FIND THE WORD FOR THIS DEFINITION:</span>
          <h2 className="def-main-text">"{currentRound.definition}"</h2>
        </div>
      </header>

      {/* ── Feedback Toast ── */}
      {feedback && <div className={`highway-3d-toast toast-${feedback.type}`}>{feedback.text}</div>}

      {/* ── True CSS 3D Viewport ── */}
      <main className="highway-3d-viewport" role="main">
        <div className="horizon-glow" />

        {/* The 3D Track */}
        <div className={`perspective-track ${phase === 'playing' ? 'track-moving' : ''}`}>
          <div className="track-grid" />
          <div className="track-lane-divider track-divider-1" />
          <div className="track-lane-divider track-divider-2" />

          {/* Transparent 1-Tap Lane Click Zones */}
          <div className="track-tap-grid">
            <div className="track-tap-lane" onClick={() => setCurrentLane(0)} title="Move to Left Lane" />
            <div className="track-tap-lane" onClick={() => setCurrentLane(1)} title="Move to Center Lane" />
            <div className="track-tap-lane" onClick={() => setCurrentLane(2)} title="Move to Right Lane" />
          </div>

          {/* Incoming 3D Objects on Track */}
          {objects.map(obj => {
            const isTarget = obj.type === 'target';
            const isDistractor = obj.type === 'distractor';

            return (
              <div
                key={obj.id}
                className="track-billboard-entity"
                style={{
                  left: LANE_PCTS[obj.lane],
                  bottom: `${obj.dist}px`,
                }}
              >
                {isTarget && (
                  <div className="target-badge">
                    <Sparkles size={20} className="gem-sparkle-icon" />
                    <span>{obj.word}</span>
                  </div>
                )}
                {isDistractor && (
                  <div className="distractor-badge">
                    <span>{obj.word}</span>
                  </div>
                )}
                {obj.type === 'barrier_low' && (
                  <div className="hurdle-badge">
                    <span>⚡ JUMP!</span>
                  </div>
                )}
                {obj.type === 'barrier_high' && (
                  <div className="laser-badge">
                    <span>🛹 SLIDE!</span>
                  </div>
                )}
                {obj.type === 'barrier_pillar' && (
                  <div className="pillar-badge">
                    <span>🧱 DODGE</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Leo Character stationed at bottom = 50px */}
          <div
            className={`track-leo-anchor ${isJumping ? 'leo-anchor-jump' : ''} ${isSliding ? 'leo-anchor-slide' : ''}`}
            style={{
              left: LANE_PCTS[currentLane],
            }}
          >
            <LeoCharacterBack state={leoAnimState} invincible={invincible} scale={1.25} />
          </div>
        </div>
      </main>

      {/* ── HUD Overlay (Hearts, Score, Timer) ── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={4}
        doorLabel="Door 1 — Highway Word Runner"
      />

      {/* ── Virtual D-Pad with Jump & Slide ── */}
      <VirtualDPad
        onLeft={() => setCurrentLane(l => Math.max(0, l - 1))}
        onRight={() => setCurrentLane(l => Math.min(2, l + 1))}
        onUp={triggerJump}
        onDown={triggerSlide}
        onJump={triggerJump}
        onSlide={triggerSlide}
        visible={phase === 'playing'}
      />

      {/* ── Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="highway-3d-modal-backdrop">
          <div className="highway-3d-modal-card">
            <Trophy size={56} className="modal-trophy-gold" />
            <h2 className="modal-title">🏆 HIGHWAY RUNNER CHAMPION!</h2>
            <p className="modal-subtitle">You decoded all {rounds.length} scientific definitions with lightning reflexes!</p>
            <div className="modal-stats-grid">
              <div className="modal-stat-box"><span className="stat-label">Final Score</span><span className="stat-val">{score} XP</span></div>
              <div className="modal-stat-box"><span className="stat-label">Max Combo</span><span className="stat-val">x{Math.max(1, streak)}</span></div>
            </div>
            <button className="modal-continue-btn" onClick={handleFinalFinish}>Return to Chamber →</button>
          </div>
        </div>
      )}

      {/* ── Game Over / KO Modal ── */}
      {phase === 'ko' && (
        <div className="highway-3d-modal-backdrop">
          <div className="highway-3d-modal-card modal-card-ko">
            <AlertTriangle size={56} className="modal-ko-icon" />
            <h2 className="modal-title">HIGHWAY CRASH!</h2>
            <p className="modal-subtitle">Remember: Tap or press UP to jump hurdles, DOWN to slide under lasers, and steer away from pillars!</p>
            <div className="modal-btn-row">
              <button className="modal-retry-btn" onClick={handleRetry}><RotateCcw size={18} /> Try Again</button>
              <button className="modal-exit-btn" onClick={onExit || handleFinalFinish}>Chamber</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
