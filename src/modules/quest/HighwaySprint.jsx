/**
 * HighwaySprint.jsx — 3D Vertical Perspective Runner for Lexio's Quest (Floor 4, Door 1)
 *
 * Major Revamp:
 * - 3D Vertical Perspective Runway (Subway Surfers / Temple Run style)
 * - 3 Lanes (Left, Center, Right) radiating from Horizon vanishing point
 * - Audio-First Pedagogy: Definition is spoken aloud via TTS BEFORE words appear
 * - Large, prominent Target Definition Banner with high contrast and readable text
 * - 8 High-Energy Rounds (full weekly vocabulary coverage, 90–120s playtime)
 * - Real Runner Obstacles:
 *    * Low Electric Hurdle: Must JUMP over (Space / ArrowUp / JUMP button)
 *    * High Laser Beam: Must SLIDE under (ArrowDown / SLIDE button)
 *    * Solid Pillar: Must CHANGE LANE to avoid
 *    * Target Word Gem: Collect for +35 XP and sparkling combo
 *    * Distractor Word: Avoid or take damage
 * - Adaptive Wave Escalation: Speed ramps up across rounds for thrilling flow state
 * - Desktop (WASD / Arrows / Space) + Mobile (Virtual D-Pad with JUMP & SLIDE buttons)
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Compass, Volume2, Sparkles, AlertTriangle, Shield, Zap, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './HighwaySprint.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// 3 Lane Lateral Centers at Leo's baseline (Y = 470)
const LANE_X_BOTTOM = [210, 450, 690];
// 3 Lane Lateral Centers at Horizon (Y = 120)
const LANE_X_HORIZON = [340, 450, 560];

const DEFAULT_HIGHWAY_ROUNDS = [
  {
    targetWord: 'friction',
    definition: 'Force that resists motion when two surfaces touch',
    distractors: ['gravity', 'velocity', 'magnetism'],
  },
  {
    targetWord: 'slippery',
    definition: 'Difficult to stand or walk on because it is wet or smooth',
    distractors: ['sticky', 'bumpy', 'freezing'],
  },
  {
    targetWord: 'rubber',
    definition: 'A tough, elastic material used to make shoes grip the floor',
    distractors: ['plastic', 'metal', 'cotton'],
  },
  {
    targetWord: 'corridor',
    definition: 'A long hallway or passage inside a school or building',
    distractors: ['balcony', 'basement', 'courtyard'],
  },
  {
    targetWord: 'laboratory',
    definition: 'A room specially equipped for scientific experiments',
    distractors: ['cafeteria', 'gymnasium', 'dormitory'],
  },
  {
    targetWord: 'traction',
    definition: 'The grip of shoes or tires on a surface to stop slipping',
    distractors: ['motion', 'weight', 'speed'],
  },
  {
    targetWord: 'prevent',
    definition: 'To stop something dangerous or painful from happening',
    distractors: ['allow', 'create', 'forget'],
  },
  {
    targetWord: 'polished',
    definition: 'Made smooth and shiny by rubbing or waxing',
    distractors: ['rough', 'dusty', 'cracked'],
  },
];

export default function HighwaySprint({
  vocabItems = [],
  duration = 120,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_sprint') || 0;

  // Build 8 Rounds from weekly vocab + fallbacks
  const rounds = useMemo(() => {
    const valid = (vocabItems || []).filter(v => v.word && v.definition);
    const pool = [...valid, ...DEFAULT_HIGHWAY_ROUNDS];
    // De-duplicate by word
    const uniqueMap = new Map();
    pool.forEach(item => {
      const w = (item.word || '').trim().toLowerCase();
      if (w && !uniqueMap.has(w)) {
        uniqueMap.set(w, {
          targetWord: item.word,
          definition: item.definition || item.def || 'A scientific or everyday term',
          distractors: item.distractors || ['option_a', 'option_b'],
        });
      }
    });

    const uniqueList = Array.from(uniqueMap.values());
    const selected = uniqueList.slice(0, 8);
    // Ensure 3 distractors per round
    return selected.map((r, idx) => {
      const otherWords = uniqueList.filter((_, i) => i !== idx).map(u => u.targetWord);
      return {
        ...r,
        distractors: otherWords.slice(0, 3),
      };
    });
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [definitionSpoken, setDefinitionSpoken] = useState(false);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_HIGHWAY_ROUNDS[0];

  // Leo Movement State
  const [currentLane, setCurrentLane] = useState(1); // 0 = Left, 1 = Center, 2 = Right
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const invincibleUntil = useRef(0);

  // Incoming Objects Array: [{ id, lane, type, word, progress: 0.0 -> 1.2 }]
  const [objects, setObjects] = useState([]);
  const roundStartTime = useRef(Date.now());
  const roundSpawning = useRef(false);

  // Jump Action Trigger
  const triggerJump = useCallback(() => {
    if (isJumping || isSliding) return;
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 550);
  }, [isJumping, isSliding]);

  // Slide Action Trigger
  const triggerSlide = useCallback(() => {
    if (isJumping || isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setIsSliding(false);
    }, 550);
  }, [isJumping, isSliding]);

  // Read Definition via TTS aloud whenever round changes
  const speakCurrentDefinition = useCallback(() => {
    if (!currentRound?.definition) return;
    setDefinitionSpoken(true);
    speakText(`Find the word: ${currentRound.definition}`, null, 1.0, null, 'sentence', weekNumber);
  }, [currentRound, weekNumber]);

  // Audio First: Trigger TTS on round change
  useEffect(() => {
    if (phase !== 'playing') return;
    speakCurrentDefinition();
  }, [roundIdx, phase, speakCurrentDefinition]);

  // Spawn New Wave for Current Round after audio brief (1.2s delay)
  const spawnRoundWave = useCallback(() => {
    // 3 Lanes permutation
    const lanes = [0, 1, 2].sort(() => Math.random() - 0.5);

    // Pick obstacle type based on round progression:
    // Round 1-2: Low barrier (jump)
    // Round 3-5: High laser (slide) or Low barrier
    // Round 6-8: Pillar or High laser or Low barrier
    let obstacleType = 'barrier_low';
    if (roundIdx >= 5) {
      const r = Math.random();
      obstacleType = r < 0.35 ? 'barrier_pillar' : r < 0.7 ? 'barrier_high' : 'barrier_low';
    } else if (roundIdx >= 2) {
      obstacleType = Math.random() > 0.5 ? 'barrier_high' : 'barrier_low';
    }

    const newWave = [
      {
        id: `tgt_${Date.now()}_0`,
        lane: lanes[0],
        type: 'target',
        word: currentRound.targetWord,
        progress: 0.0,
      },
      {
        id: `dist_${Date.now()}_1`,
        lane: lanes[1],
        type: 'distractor',
        word: currentRound.distractors[0] || 'wrong',
        progress: 0.0,
      },
      {
        id: `barr_${Date.now()}_2`,
        lane: lanes[2],
        type: obstacleType,
        word: obstacleType === 'barrier_low' ? '⚡ JUMP OVER' : obstacleType === 'barrier_high' ? '🛹 SLIDE UNDER' : '🧱 PILLAR (DODGE)',
        progress: 0.0,
      },
    ];

    setObjects(newWave);
    roundSpawning.current = false;
  }, [roundIdx, currentRound]);

  // Initialize round wave with audio-lead delay
  useEffect(() => {
    if (phase !== 'playing') return;
    setObjects([]);
    roundSpawning.current = true;
    const delayTimer = setTimeout(() => {
      spawnRoundWave();
    }, 1400); // 1.4s delay giving time to hear definition first

    return () => clearTimeout(delayTimer);
  }, [roundIdx, phase, spawnRoundWave]);

  // ── Keyboard Controls ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    const onKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        setCurrentLane(l => Math.max(0, l - 1));
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        setCurrentLane(l => Math.min(2, l + 1));
      }
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        e.preventDefault();
        triggerJump();
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        triggerSlide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, triggerJump, triggerSlide]);

  // ── Main Game Loop (Wave Motion & 3D Collisions) ──────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animId;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const nowMs = Date.now();

      setInvincible(nowMs < invincibleUntil.current);

      // Adaptive speed: escalates with roundIdx
      // Round 0: 0.34 / sec -> Round 7: 0.52 / sec
      const speed = 0.34 + (roundIdx * 0.024);

      setObjects(prev => {
        if (prev.length === 0) return prev;

        const next = [];
        let hitTarget = false;

        for (const obj of prev) {
          const np = obj.progress + speed * dt;

          // Leo is stationed at progress ≈ 0.85
          const inHitZone = np >= 0.78 && np <= 0.94;
          const sameLane = obj.lane === currentLane;

          if (inHitZone && sameLane) {
            // ── 1. TARGET WORD GEM ─────────────────────────────────────────
            if (obj.type === 'target') {
              hitTarget = true;
              speakText(obj.word, null, 1.1, null, 'word', weekNumber);
              const comboBonus = Math.min(3, streak + 1);
              const xpGained = 35 * comboBonus;

              setScore(s => s + xpGained);
              setStreak(st => st + 1);
              setFeedback({
                type: 'correct',
                text: `✨ ACCELERATION! Matched "${obj.word}"! (+${xpGained} XP ${comboBonus > 1 ? `Combo x${comboBonus}!` : ''})`,
              });

              setTimeout(() => {
                setFeedback(null);
                const nextRound = roundIdx + 1;
                if (nextRound >= rounds.length) {
                  setPhase('cleared');
                  const finalScore = score + xpGained + (timeLeft * 2) + 100;
                  setScore(finalScore);
                  recordPersonalBest('highway_sprint', finalScore);
                  speakText('Cosmic Highway Champion! All words cleared!');
                } else {
                  setRoundIdx(nextRound);
                }
              }, 600);
              continue; // remove collected target
            }

            // ── 2. LOW BARRIER (Must JUMP) ──────────────────────────────────
            if (obj.type === 'barrier_low') {
              if (isJumping) {
                // Safely jumped over hurdle!
                setScore(s => s + 10);
                setFeedback({ type: 'correct', text: '🦘 LEAPED OVER HURDLE! (+10 XP)' });
                setTimeout(() => setFeedback(null), 1000);
                continue;
              } else if (nowMs > invincibleUntil.current) {
                // Tripped on low hurdle
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => {
                  const nh = Math.max(0, h - 1);
                  if (nh <= 0) setPhase('ko');
                  return nh;
                });
                setFeedback({ type: 'wrong', text: '💥 TRIPPED! Press UP / JUMP to clear hurdles! (-1 Heart)' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            // ── 3. HIGH LASER (Must SLIDE) ─────────────────────────────────
            if (obj.type === 'barrier_high') {
              if (isSliding) {
                // Safely slid under laser beam!
                setScore(s => s + 10);
                setFeedback({ type: 'correct', text: '🛹 SLICK SLIDE UNDER LASER! (+10 XP)' });
                setTimeout(() => setFeedback(null), 1000);
                continue;
              } else if (nowMs > invincibleUntil.current) {
                // Hit overhead laser
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => {
                  const nh = Math.max(0, h - 1);
                  if (nh <= 0) setPhase('ko');
                  return nh;
                });
                setFeedback({ type: 'wrong', text: '💥 LASER STRUCK! Press DOWN / SLIDE to duck! (-1 Heart)' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            // ── 4. SOLID PILLAR (Must CHANGE LANE) ─────────────────────────
            if (obj.type === 'barrier_pillar') {
              if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => {
                  const nh = Math.max(0, h - 1);
                  if (nh <= 0) setPhase('ko');
                  return nh;
                });
                setFeedback({ type: 'wrong', text: '💥 CRASHED INTO PILLAR! Steer left/right to dodge! (-1 Heart)' });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }

            // ── 5. DISTRACTOR (Wrong Word) ──────────────────────────────────
            if (obj.type === 'distractor') {
              if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + 1800;
                setStreak(0);
                setHearts(h => {
                  const nh = Math.max(0, h - 1);
                  if (nh <= 0) setPhase('ko');
                  return nh;
                });
                setFeedback({ type: 'wrong', text: `⚠️ Wrong Word "${obj.word}"! Look for: "${currentRound.definition}"` });
                setTimeout(() => setFeedback(null), 1400);
                continue;
              }
            }
          }

          // Keep in bounds if not off bottom
          if (np < 1.15 && !hitTarget) {
            next.push({ ...obj, progress: np });
          }
        }

        // If all items passed without hitting the target, respawn the wave
        if (next.length === 0 && !roundSpawning.current && phase === 'playing') {
          spawnRoundWave();
        }

        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [phase, currentLane, isJumping, isSliding, roundIdx, rounds.length, currentRound, score, streak, timeLeft, recordPersonalBest, spawnRoundWave, weekNumber]);

  // Countdown Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setPhase('ko');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Mobile D-Pad handlers with both JUMP & SLIDE
  const dpadHandlers = {
    onLeft: () => setCurrentLane(l => Math.max(0, l - 1)),
    onRight: () => setCurrentLane(l => Math.min(2, l + 1)),
    onUp: triggerJump,
    onDown: triggerSlide,
    onJump: triggerJump,
    onSlide: triggerSlide,
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    setCurrentLane(1);
    setIsJumping(false);
    setIsSliding(false);
    setStreak(0);
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, rounds.length * 35);
    recordPersonalBest('highway_sprint', score);
    if (onComplete) onComplete(stars, score);
    else if (onExit) onExit();
  };

  // Leo's 3D Display Coordinates
  const leoX = LANE_X_BOTTOM[currentLane];
  const leoY = 460;
  const leoAnimState = isJumping ? 'jump' : isSliding ? 'slide' : 'run';

  return (
    <div className="highway-3d-root">
      {/* ── Top Target Definition Banner (Audio-First, Large & High Contrast) ── */}
      <header className="highway-3d-banner" role="banner">
        <div className="banner-left-section">
          <div className="banner-badge-box">
            <span className="banner-target-tag">WORD {roundIdx + 1} / {rounds.length}</span>
            {streak > 1 && <span className="banner-streak-badge">⚡ Combo x{Math.min(3, streak)}</span>}
          </div>
          <button
            className="banner-audio-btn"
            onClick={speakCurrentDefinition}
            aria-label="Listen to definition again"
            title="Listen to definition"
          >
            <Volume2 size={20} className="volume-icon-pulse" />
            <span>Listen</span>
          </button>
        </div>

        <div className="banner-definition-center">
          <span className="def-instruction-label">🎯 FIND THE WORD FOR THIS DEFINITION:</span>
          <h2 className="def-main-text">"{currentRound.definition}"</h2>
        </div>
      </header>

      {/* ── Feedback Toast ─────────────────────────────────────────────────── */}
      {feedback && (
        <div className={`highway-3d-toast toast-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── 3D Perspective Runway Viewport ─────────────────────────────────── */}
      <main className="highway-3d-viewport" role="main" aria-label="3D Cosmic Highway">
        {/* Horizon Sky Glow */}
        <div className="horizon-glow" />

        {/* 3D Runway Plane */}
        <div className="perspective-track">
          {/* Moving Lane Stripes (creating sensation of high speed) */}
          <div className="speed-lines-left" />
          <div className="speed-lines-right" />
          <div className="track-lane-divider track-divider-1" />
          <div className="track-lane-divider track-divider-2" />

          {/* 3 Lane Indicators on Ground */}
          <div className="ground-lane-guide guide-left">LANE 1</div>
          <div className="ground-lane-guide guide-center">LANE 2</div>
          <div className="ground-lane-guide guide-right">LANE 3</div>
        </div>

        {/* ── Incoming 3D Objects ───────────────────────────────────────────── */}
        {objects.map(obj => {
          const p = obj.progress;
          // Calculate 3D coordinates based on progress (0.0 at horizon -> 1.0 at Leo)
          const horizonX = LANE_X_HORIZON[obj.lane];
          const bottomX = LANE_X_BOTTOM[obj.lane];
          const curX = horizonX + p * (bottomX - horizonX);
          const curY = 120 + p * (510 - 120);
          const scale = 0.28 + p * (1.08 - 0.28);
          const opacity = Math.min(1, p * 3.5);

          return (
            <div
              key={obj.id}
              className={`obj-3d-entity obj-${obj.type} lane-${obj.lane}`}
              style={{
                left: `${curX}px`,
                top: `${curY}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.floor(10 + p * 40),
              }}
            >
              {/* TARGET WORD GEM */}
              {obj.type === 'target' && (
                <div className="gem-target-container">
                  <div className="gem-target-glow" />
                  <div className="gem-target-body">
                    <Sparkles size={16} className="gem-sparkle-icon" />
                    <span className="gem-target-word">{obj.word}</span>
                  </div>
                </div>
              )}

              {/* DISTRACTOR WORD ORB */}
              {obj.type === 'distractor' && (
                <div className="orb-distractor-container">
                  <span className="orb-distractor-word">{obj.word}</span>
                </div>
              )}

              {/* LOW HURDLE (MUST JUMP) */}
              {obj.type === 'barrier_low' && (
                <div className="barrier-low-box">
                  <div className="laser-sparks-low" />
                  <div className="barrier-label">⚡ JUMP!</div>
                </div>
              )}

              {/* HIGH LASER (MUST SLIDE) */}
              {obj.type === 'barrier_high' && (
                <div className="barrier-high-box">
                  <div className="laser-beam-high" />
                  <div className="barrier-label">🛹 SLIDE!</div>
                </div>
              )}

              {/* SOLID PILLAR (MUST CHANGE LANE) */}
              {obj.type === 'barrier_pillar' && (
                <div className="barrier-pillar-box">
                  <div className="pillar-block">🧱 BLOCK</div>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Leo Character (Stationed at Bottom Center, Running Forward) ─── */}
        <div
          className={`leo-3d-runner-anchor ${isJumping ? 'leo-anchor-jump' : ''} ${isSliding ? 'leo-anchor-slide' : ''}`}
          style={{
            left: `${leoX}px`,
            top: `${leoY}px`,
            transition: 'left 0.16s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
          }}
        >
          {/* Speed Wind / Dust Trails behind Leo */}
          <div className="leo-wind-trails" />

          {/* Leo Explorer Vector Mascot */}
          <LeoCharacter
            x={0}
            y={0}
            state={leoAnimState}
            facingRight={true}
            invincible={invincible}
          />
        </div>
      </main>

      {/* ── HUD Overlay (Hearts, XP, Timer) ────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={4}
        doorLabel="Door 1 — Highway Word Runner"
      />

      {/* ── Virtual D-Pad with both JUMP 🚀 & SLIDE 🛹 Buttons ────────────── */}
      <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />

      {/* ── Cleared Modal ──────────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="highway-3d-modal-backdrop">
          <div className="highway-3d-modal-card">
            <Trophy size={56} className="modal-trophy-gold" />
            <h2 className="modal-title">🏆 HIGHWAY RUNNER CHAMPION!</h2>
            <p className="modal-subtitle">
              You decoded all {rounds.length} scientific definitions with lightning reflexes!
            </p>
            <div className="modal-stats-grid">
              <div className="modal-stat-box">
                <span className="stat-label">Final Score</span>
                <span className="stat-val">{score} XP</span>
              </div>
              <div className="modal-stat-box">
                <span className="stat-label">Max Combo</span>
                <span className="stat-val">x{Math.max(1, streak)}</span>
              </div>
              <div className="modal-stat-box">
                <span className="stat-label">Personal Best</span>
                <span className="stat-val">{Math.max(score, personalBest)} XP</span>
              </div>
            </div>
            <button className="modal-continue-btn" onClick={handleFinalFinish}>
              Return to Chamber →
            </button>
          </div>
        </div>
      )}

      {/* ── Game Over / KO Modal ───────────────────────────────────────────── */}
      {phase === 'ko' && (
        <div className="highway-3d-modal-backdrop">
          <div className="highway-3d-modal-card modal-card-ko">
            <AlertTriangle size={56} className="modal-ko-icon" />
            <h2 className="modal-title">HIGHWAY CRASH!</h2>
            <p className="modal-subtitle">
              The cosmic highway moves fast! Remember: Jump over low hurdles, slide under high beams, and dodge pillars!
            </p>
            <div className="modal-btn-row">
              <button className="modal-retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="modal-exit-btn" onClick={onExit || handleFinalFinish}>
                Chamber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
