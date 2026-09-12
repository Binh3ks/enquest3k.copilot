/**
 * SynonymStormDefense.jsx — Floor 6, Door 1 (Vocab) Mini-Game for Lexio's Quest
 * Forked from StormShieldDefense.jsx
 *
 * Replaces static quiz tapping with Active Shield Deflection Platformer:
 * - High Gale Spire Rooftop under an arcane windstorm
 * - Top objective banner displays the target root word: e.g. "TARGET: CAREFUL"
 * - Meteors fall from the storm sky:
 *   - Golden/Emerald Meteors carrying the TRUE SYNONYM (e.g. "cautious")
 *   - Crimson Hazard Meteors carrying ANTONYMS & DISTRACTORS (e.g. "reckless", "hasty")
 * - Leo wields the Storm Aegis Shield (moves, jumps, and positions shield to block)
 * - Deflecting the valid synonym charges the Gale Battery (+20% or +25% per round) and advances to the next pair
 * - Hazard meteors must be dodged (or cost 1 Heart)
 * - Full battery (100%) clears Floor 6 Door 1!
 * - Supports touch gestures (useGestureControls) + Arrow Keys / WASD + Space
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Shield, Trophy, RotateCcw, ArrowRight, Wind, Sparkles, AlertTriangle, Zap } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import { getSynonymPairsForWeek } from '../../services/chroniclesFloor67Service';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import './SynonymStormDefense.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Rooftop spire platforms
const SPIRE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Spire Main Roof
  { x: 140, y: 360,     width: 180,        height: 18 },  // Left Battery Spire
  { x: 580, y: 360,     width: 180,        height: 18 },  // Right Battery Spire
];

export default function SynonymStormDefense({
  synonymPairs = null,
  duration = 90,
  weekNumber = 33,
  weekData = null,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('synonym_storm') || 0;
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 900);

  useEffect(() => {
    const updateW = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || window.innerWidth);
      }
    };
    updateW();
    window.addEventListener('resize', updateW);
    return () => window.removeEventListener('resize', updateW);
  }, []);

  // Load synonym rounds for this week
  const rounds = useMemo(() => {
    if (synonymPairs && Array.isArray(synonymPairs) && synonymPairs.length > 0) {
      return synonymPairs;
    }
    const pairs = getSynonymPairsForWeek(weekNumber);
    return pairs && pairs.length > 0 ? pairs.slice(0, 5) : [
      { word: 'careful', match: 'cautious', distractors: ['reckless', 'hasty', 'noisy'] },
      { word: 'prevent', match: 'stop', distractors: ['cause', 'allow', 'start'] },
      { word: 'clean', match: 'pure', distractors: ['dirty', 'muddy', 'dusty'] },
      { word: 'safe', match: 'secure', distractors: ['risky', 'broken', 'wild'] },
    ];
  }, [synonymPairs, weekNumber]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [batteryCharge, setBatteryCharge] = useState(0); // 0 to 100%
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentPair = rounds[roundIdx % rounds.length] || rounds[0];

  // Active falling meteors: [{ id, x, y, vy, word, isTarget }]
  const [meteors, setMeteors] = useState([]);
  const meteorSpawnTimer = useRef(0);
  const targetStreakRef = useRef(0);
  const hazardStreakRef = useRef(0);

  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__SYNONYM_STORM_EVENT_LOG__ = window.__SYNONYM_STORM_EVENT_LOG__ || [];
      window.__SYNONYM_STORM_TEST_HOOK__ = {
        setLeoX: (newX) => {
          leoRef.current.x = newX;
        },
        getLeoX: () => leoRef.current.x,
        getCurrentMeteors: () => meteors,
        getRoundIdx: () => roundIdx,
        getCurrentPair: () => currentPair,
        injectMeteor: (m) => setMeteors(prev => [...prev, m]),
        advanceToRound: (newIdx) => {
          setFeedback(null);
          setMeteors([]);
          setRoundIdx(newIdx);
        },
      };
    }
  }, [meteors, roundIdx, currentPair]);

  // Leo physics
  const leoRef = useRef({
    x: 430,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: FLOOR_Y - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const keysPressed = useRef({ left: false, right: false, up: false, shield: false });
  const animFrameId = useRef(null);

  // ── Keyboard controls ──────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.up = true;
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.right = true;
      }
    };

    const onKeyUp = (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) keysPressed.current.up = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keysPressed.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keysPressed.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // ── Game Loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

      // Move Leo
      if (keys.left) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (keys.right) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx = 0;
      }

      if (keys.up && leo.isGrounded) {
        leo.vy = LEO_JUMP_FORCE;
        leo.isGrounded = false;
      }

      applyGravity(leo);

      leo.x = clamp(leo.x + leo.vx, 20, ROOM_WIDTH - LEO_HITBOX.width - 20);
      leo.y += leo.vy;

      // Platform collisions
      const prevY = leo.y - leo.vy;
      const landing = checkPlatformLanding(
        { x: leo.x, y: leo.y, width: LEO_HITBOX.width, height: LEO_HITBOX.height, vy: leo.vy },
        SPIRE_PLATFORMS,
        prevY
      );

      if (landing.landed) {
        leo.y = landing.platformY - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else {
        leo.isGrounded = false;
      }

      // Spawn Meteors for the CURRENT synonym pair
      meteorSpawnTimer.current += dt;
      if (meteorSpawnTimer.current > 1.6) {
        meteorSpawnTimer.current = 0;

        const targetWord = currentPair.match;
        const distractors = currentPair.distractors || ['wrong1', 'wrong2'];

        let chosenWord;
        let isTargetMeteor;

        // Balance target vs hazard spawn (45% target, 55% hazard, avoid consecutive > 2)
        if (targetStreakRef.current >= 2) {
          chosenWord = distractors[Math.floor(Math.random() * distractors.length)];
          isTargetMeteor = false;
          targetStreakRef.current = 0;
          hazardStreakRef.current += 1;
        } else if (hazardStreakRef.current >= 2) {
          chosenWord = targetWord;
          isTargetMeteor = true;
          hazardStreakRef.current = 0;
          targetStreakRef.current += 1;
        } else {
          const pickTarget = Math.random() < 0.45;
          if (pickTarget) {
            chosenWord = targetWord;
            isTargetMeteor = true;
            targetStreakRef.current += 1;
            hazardStreakRef.current = 0;
          } else {
            chosenWord = distractors[Math.floor(Math.random() * distractors.length)];
            isTargetMeteor = false;
            hazardStreakRef.current += 1;
            targetStreakRef.current = 0;
          }
        }

        const spawnX = 60 + Math.random() * (ROOM_WIDTH - 140);
        setMeteors(prev => [
          ...prev,
          {
            id: `meteor_${Date.now()}_${Math.random()}`,
            x: spawnX,
            y: 110,
            vy: 95 + Math.random() * 45,
            word: chosenWord,
            isTarget: isTargetMeteor,
            targetRoot: currentPair.word,
          }
        ]);
      }

      // Update Meteors & Collision Check
      const nowMs = Date.now();
      setMeteors(prevMeteors => {
        const nextMeteors = [];
        for (const m of prevMeteors) {
          const ny = m.y + m.vy * dt;

          // Check collision with Leo's Aegis Shield (ignore stale meteors from previous round)
          const distLeo = Math.hypot((leo.x + 20) - (m.x + 35), (leo.y + 24) - (ny + 20));

          if (distLeo < 52 && (!m.targetRoot || m.targetRoot === currentPair.word)) {
            // Intercepted with Shield!
            if (m.isTarget) {
              // DEFLECTED CORRECT SYNONYM!
              speakText(m.word);
              setScore(s => s + 50);

              const chargeStep = Math.round(100 / rounds.length);
              setBatteryCharge(b => {
                const next = Math.min(100, b + chargeStep);
                if (next >= 100 || roundIdx + 1 >= rounds.length) {
                  // ALL ROUNDS DEFENDED!
                  setPhase('cleared');
                  const finalScore = score + 60 + (timeLeft * 2);
                  setScore(finalScore);
                  recordPersonalBest('synonym_storm', finalScore);
                  speakText('Gale battery fully charged! All synonyms mastered!');
                }
                return next;
              });

              const fbText = `✨ SYNONYM DEFLECTED! "${m.word}" matches "${currentPair.word}"!`;
              setFeedback({ type: 'correct', text: fbText });

              if (typeof window !== 'undefined') {
                window.__SYNONYM_STORM_EVENT_LOG__ = window.__SYNONYM_STORM_EVENT_LOG__ || [];
                window.__SYNONYM_STORM_EVENT_LOG__.push({
                  type: 'correct',
                  word: m.word,
                  targetRoot: currentPair.word,
                  round: roundIdx + 1,
                  timestamp: nowMs,
                  text: fbText
                });
              }

              // Advance round after brief delay and clear old round's falling meteors
              setTimeout(() => {
                setFeedback(null);
                setMeteors([]);
                setRoundIdx(r => (r + 1 < rounds.length ? r + 1 : r));
              }, 1200);

              continue; // meteor consumed
            } else {
              // HIT HAZARD / ANTONYM METEOR!
              if (nowMs > leo.invincibleUntil) {
                leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
                setHearts(h => {
                  const next = Math.max(0, h - 1);
                  if (next === 0) setPhase('ko');
                  return next;
                });
                const fbText = `⚡ HAZARD! "${m.word}" is an ANTONYM / WRONG WORD for "${currentPair.word}"!`;
                setFeedback({ type: 'wrong', text: fbText });
                if (typeof window !== 'undefined') {
                  window.__SYNONYM_STORM_EVENT_LOG__ = window.__SYNONYM_STORM_EVENT_LOG__ || [];
                  window.__SYNONYM_STORM_EVENT_LOG__.push({
                    type: 'wrong',
                    word: m.word,
                    targetRoot: currentPair.word,
                    round: roundIdx + 1,
                    timestamp: nowMs,
                    text: fbText
                  });
                }
                setTimeout(() => setFeedback(null), 1400);
              }
              continue; // meteor consumed
            }
          }

          // Despawn if hit bottom
          if (ny > FLOOR_Y + 50) {
            continue;
          }

          nextMeteors.push({ ...m, y: ny });
        }
        return nextMeteors;
      });

      // Leo animation state
      let animState = 'idle';
      if (!leo.isGrounded) animState = 'jump';
      else if (Math.abs(leo.vx) > 10) animState = 'run';

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
        invincible: nowMs < leo.invincibleUntil,
      });

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [phase, roundIdx, rounds.length, currentPair, score, timeLeft, recordPersonalBest]);

  // Timer loop
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

  // Gesture Controls (mobile-first)
  const { gestureRef } = useGestureControls({
    onMoveLeftStart: () => { keysPressed.current.left = true; },
    onMoveLeftEnd:   () => { keysPressed.current.left = false; },
    onMoveRightStart: () => { keysPressed.current.right = true; },
    onMoveRightEnd:   () => { keysPressed.current.right = false; },
    onTapLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 260);
    },
    onTapRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 260);
    },
    onDoubleTap: () => {
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 220);
    },
    onSwipeUp: () => {
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 220);
    },
    onSwipeLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 360);
    },
    onSwipeRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 360);
    },
    enabled: phase === 'playing',
  });

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setRoundIdx(0);
    setBatteryCharge(0);
    setTimeLeft(duration);
    setMeteors([]);
    leoRef.current = { x: 430, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 50) });
    else if (onExit) onExit();
  };

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="synonym-storm-root" ref={containerRef}>
      {/* ── Floating Exit Button ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="storm-gesture-layer" />

      {/* ── Top Objective Banner: Prominent Target Root Word ── */}
      <div className="synonym-objective-banner">
        <div className="synonym-banner-left">
          <Wind size={22} className="synonym-wind-icon" />
          <div className="synonym-target-prompt">
            <span className="synonym-target-label">FIND SYNONYM OF:</span>
            <span className="synonym-root-word">{currentPair.word.toUpperCase()}</span>
          </div>
        </div>

        {/* Battery Charge Gauge */}
        <div className="synonym-battery-gauge">
          <span className="battery-title">GALE BATTERY:</span>
          <div className="battery-bar-track">
            <div className="battery-bar-fill" style={{ width: `${batteryCharge}%` }} />
          </div>
          <span className="battery-pct">{batteryCharge}%</span>
        </div>

        <div className="synonym-round-chip">
          Round {roundIdx + 1} / {rounds.length}
        </div>
      </div>

      {/* ── Feedback Toast ── */}
      {feedback && (
        <div className={`synonym-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Spire Rooftop Viewport ── */}
      <div
        className="synonym-storm-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Sky / Cloud storm decorations */}
        <div className="storm-cloud-drift cloud-1" />
        <div className="storm-cloud-drift cloud-2" />

        {/* Spire Platforms */}
        {SPIRE_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`spire-platform ${idx === 0 ? 'spire-roof' : 'battery-spire'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          >
            {idx > 0 && (
              <div className="spire-crystal-node">
                <Zap size={16} className="battery-node-icon" />
              </div>
            )}
          </div>
        ))}

        {/* Falling Meteors */}
        {meteors.map(m => (
          <div
            key={m.id}
            className={`falling-synonym-meteor ${m.isTarget ? 'meteor-synonym' : 'meteor-hazard'}`}
            style={{ left: `${m.x}px`, top: `${m.y}px` }}
          >
            <div className="meteor-trail" />
            <div className="meteor-core">
              <span className="meteor-word">{m.word}</span>
            </div>
          </div>
        ))}

        {/* Leo Character with Aegis Shield Aura */}
        <div
          className="leo-shield-wrapper"
          style={{ left: `${leoDisplay.x}px`, top: `${leoDisplay.y}px` }}
        >
          <div className="aegis-shield-aura" style={{ left: '-12px', top: '-12px' }}>
            <Shield size={64} />
          </div>
          <LeoCharacter
            x={0}
            y={0}
            state={leoDisplay.animState}
            facingRight={leoDisplay.facingRight}
            invincible={leoDisplay.invincible}
          />
        </div>
      </div>

      {/* ── HUD ── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={6}
        doorLabel="Door 1 — Synonym Storm (Gale Spire)"
      />

      {/* ── Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="storm-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>GALE STORM CLEARED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, rounds.length * 50))}
            </div>
            <p className="cleared-full-text">All {rounds.length} synonym meteors successfully deflected!</p>
            <p className="cleared-score">Score: <strong>{score} XP</strong></p>
            {score > personalBest && (
              <div className="cleared-record">🏆 New Personal Best!</div>
            )}
            <button className="finish-door-btn" onClick={handleFinalFinish}>
              Return to Skyway <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout Modal ── */}
      {phase === 'ko' && (
        <div className="storm-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>OVERWHELMED BY THE STORM!</h2>
            <p>Too many hazard meteors struck Leo's shield.</p>
            <div className="ko-actions">
              <button className="retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="exit-btn" onClick={handleFinalFinish}>
                Retreat to Skyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
