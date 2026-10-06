/**
 * StormShieldDefense.jsx — Floor 3, Door 3 (Integration) Mini-Game for Lexio's Quest
 * GDD §2 Floor 3 Room C: "STORM SHIELD DEFENSE"
 *
 * Replaces static meteor tapping with Active Shield Deflection Platformer:
 * - Castle Spire Rooftop under an arcane thunderstorm
 * - Energy Meteors fall from the storm clouds:
 *   - Golden/Green Meteors bearing correct Cambridge vocabulary & collocations
 *   - Dark Crimson Hazard Meteors (distractors & lightning traps)
 * - Leo wields the Storm Aegis Shield (moves, jumps, and positions shield to body-block)
 * - Deflected valid meteors charge the Arcane Tower Battery (+20% per hit)
 * - Red hazard meteors must be dodged (or hit costs 1 Heart)
 * - Full battery (100%) summons the Astral Vortex clearing Floor 3!
 * - Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Shield, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, CloudLightning } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { validateMCQOptions } from '../../utils/quizValidation';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import './StormShieldDefense.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Rooftop spire platforms
const SPIRE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Spire Main Roof
  { x: 140, y: 360,     width: 180,        height: 18 },  // Left Battery Spire
  { x: 580, y: 360,     width: 180,        height: 18 },  // Right Battery Spire
];

const DEFAULT_METEOR_WORDS = [
  { word: 'friction',       isTarget: true },
  { word: 'rubber shoes',   isTarget: true },
  { word: 'strong grip',    isTarget: true },
  { word: 'ice slick',      isTarget: false },
  { word: 'oil spill',      isTarget: false },
  { word: 'banana peel',    isTarget: false },
  { word: 'wet floor',      isTarget: false },
  { word: 'loose gravel',   isTarget: false },
  { word: 'soapy water',    isTarget: false },
];

/**
 * Fisher-Yates (Knuth) Shuffle algorithm for unpredictable, uniform random permutation
 */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StormShieldDefense({
  meteorVocabulary = DEFAULT_METEOR_WORDS,
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('storm_shield_defense') || 0;
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

  const rawList = meteorVocabulary && meteorVocabulary.length > 0 ? meteorVocabulary : DEFAULT_METEOR_WORDS;
  const vocabList = useMemo(() => {
    const hasExplicitTargets = rawList.some(v => typeof v.isTarget === 'boolean');
    let targets = [];
    let distractors = [];

    if (hasExplicitTargets) {
      targets = rawList.filter(v => v.isTarget).map(v => v.word);
      distractors = rawList.filter(v => !v.isTarget).map(v => v.word);
    } else {
      // Unpredictable pseudo-random selection via Fisher-Yates shuffle
      const uniqueWords = Array.from(
        new Set(rawList.map(v => (typeof v === 'string' ? v : v.word)).filter(Boolean))
      );
      const shuffled = shuffleArray(uniqueWords);

      // Maintain target ratio at 1/3 (p = 0.333, N4 = 4.53% with 3 hearts)
      const targetCount = Math.max(1, Math.min(shuffled.length - 1, Math.round(shuffled.length * (1 / 3))));
      targets = shuffled.slice(0, targetCount);
      distractors = shuffled.slice(targetCount);

      if (distractors.length === 0) {
        distractors = DEFAULT_METEOR_WORDS.filter(d => !d.isTarget).map(d => d.word);
      }
    }

    const primary = targets[0] || 'friction';
    const fallback = DEFAULT_METEOR_WORDS.map(v => v.word);
    const validated = validateMCQOptions([...targets, ...distractors], primary, fallback, 8);
    return validated.map(w => ({
      word: w,
      isTarget: targets.includes(w),
    }));
  }, [rawList]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [batteryCharge, setBatteryCharge] = useState(0); // 0 to 100%
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [shieldActive, setShieldActive] = useState(true);
  const [deflectCount, setDeflectCount] = useState(0);

  // Sync refs to avoid re-triggering updateGame effect on every tick or score change
  const batteryRef = useRef(0);
  const scoreRef = useRef(0);
  const heartsRef = useRef(3);
  const timeLeftRef = useRef(duration);
  const consumedMeteorsRef = useRef(new Set());

  // Active falling meteors: [{ id, x, y, vy, word, isTarget }]
  const [meteors, setMeteors] = useState([]);
  const meteorsRef = useRef([]);
  const meteorSpawnTimer = useRef(0);
  const targetStreakRef = useRef(0);
  const hazardStreakRef = useRef(0);
  const sessionStartTimeRef = useRef(Date.now());

  useEffect(() => {
    sessionStartTimeRef.current = Date.now();
    batteryRef.current = 0;
    scoreRef.current = 0;
    heartsRef.current = 3;
    timeLeftRef.current = duration;
    consumedMeteorsRef.current.clear();
    meteorsRef.current = [];
    setMeteors([]);
    setDeflectCount(0);
    console.log(`[STORM-SHIELD-START] Duration: ${duration}s | Battery Goal: 100% (5 hits) | Hearts: 3 | p = 1/3 (N4 = 4.53%)`);
    if (typeof window !== 'undefined') window.__F3D3_EVENT_LOG__ = [];
  }, [duration]);

  // DEV-only test hook for deterministic playtest verification
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    window.__setStormLeo = (x, y) => {
      if (leoRef.current) {
        leoRef.current.x = x;
        leoRef.current.y = y;
        leoRef.current.vx = 0;
        leoRef.current.vy = 0;
        leoRef.current.isGrounded = true;
      }
    };
  }

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
      if (['KeyE', 'KeyS', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.shield = true;
      }
    };

    const onKeyUp = (e) => {
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) keysPressed.current.up = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keysPressed.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keysPressed.current.right = false;
      if (['KeyE', 'KeyS', 'ArrowDown'].includes(e.code)) keysPressed.current.shield = false;
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

      // Spawn Meteors
      meteorSpawnTimer.current += dt;
      if (meteorSpawnTimer.current > 1.8) {
        meteorSpawnTimer.current = 0;

        const targetItems = vocabList.filter(v => v.isTarget);
        const hazardItems = vocabList.filter(v => !v.isTarget);

        let chosenItem;
        // Streak prevention: avoid consecutive streaks of > 2 targets or > 3 hazards
        if (targetStreakRef.current >= 2 && hazardItems.length > 0) {
          chosenItem = hazardItems[Math.floor(Math.random() * hazardItems.length)];
          targetStreakRef.current = 0;
          hazardStreakRef.current += 1;
        } else if (hazardStreakRef.current >= 3 && targetItems.length > 0) {
          chosenItem = targetItems[Math.floor(Math.random() * targetItems.length)];
          hazardStreakRef.current = 0;
          targetStreakRef.current += 1;
        } else {
          // Weighted pseudo-random pick (1/3 target, 2/3 hazard) -> N4 = 4.53%
          const pickTarget = Math.random() < (1 / 3);
          if (pickTarget && targetItems.length > 0) {
            chosenItem = targetItems[Math.floor(Math.random() * targetItems.length)];
            targetStreakRef.current += 1;
            hazardStreakRef.current = 0;
          } else if (hazardItems.length > 0) {
            chosenItem = hazardItems[Math.floor(Math.random() * hazardItems.length)];
            hazardStreakRef.current += 1;
            targetStreakRef.current = 0;
          } else {
            chosenItem = vocabList[Math.floor(Math.random() * vocabList.length)] || DEFAULT_METEOR_WORDS[0];
          }
        }

        const spawnX = 60 + Math.random() * (ROOM_WIDTH - 140);
        const newMeteor = {
          id: `meteor_${Date.now()}_${Math.random()}`,
          x: spawnX,
          y: 115,
          vy: 90 + Math.random() * 50,
          word: chosenItem.word,
          isTarget: chosenItem.isTarget,
        };
        meteorsRef.current.push(newMeteor);
      }

      // Update Meteors & Synchronous Collision Detection
      const nowMs = Date.now();
      const survivingMeteors = [];

      for (const m of meteorsRef.current) {
        m.y += m.vy * dt;

        // Check collision with Leo's Aegis Shield
        const distLeo = Math.hypot((leo.x + 20) - (m.x + 35), (leo.y + 24) - (m.y + 20));

        if (distLeo < 52) {
          // Guard against multiple hits for the same meteor entity
          if (!consumedMeteorsRef.current.has(m.id)) {
            consumedMeteorsRef.current.add(m.id);
            const elapsedSec = (nowMs - sessionStartTimeRef.current) / 1000;

            if (m.isTarget) {
              // DEFLECTED TARGET METEOR!
              speakText(m.word);
              scoreRef.current += 30;
              setScore(scoreRef.current);
              setDeflectCount(c => c + 1);

              const nextBattery = Math.min(100, batteryRef.current + 20);
              batteryRef.current = nextBattery;
              setBatteryCharge(nextBattery);

              console.log(`[STORM-SHIELD-ACTION] Deflected Target: "${m.word}" | Battery: ${nextBattery}% (+20%) | Time Spent: ${elapsedSec.toFixed(2)}s | HUD timeLeft: ${timeLeftRef.current}s`);

              if (nextBattery >= 100) {
                // BATTERY FULLY CHARGED!
                consumedMeteorsRef.current.clear();
                meteorsRef.current = [];
                setMeteors([]);
                setPhase('cleared');
                const finalScore = scoreRef.current + 60 + (timeLeftRef.current * 2);
                scoreRef.current = finalScore;
                setScore(finalScore);
                recordPersonalBest('storm_shield_defense', finalScore);
                speakText('Storm battery fully charged! Arcane vortex unlocked!');
                console.log(`[STORM-SHIELD-CLEARED] Battery 100% | Time Spent: ${elapsedSec.toFixed(2)}s | Budget: ${duration}s | Margin: ${(duration - elapsedSec).toFixed(2)}s`);
              }

              const fbText = `⚡ DEFLECTED "${m.word}" (+20% Battery)`;
              setFeedback({ type: 'correct', text: fbText });
              if (typeof window !== 'undefined') {
                window.__F3D3_EVENT_LOG__ = window.__F3D3_EVENT_LOG__ || [];
                window.__F3D3_EVENT_LOG__.push({
                  type: 'correct',
                  word: m.word,
                  deltaBattery: '+20%',
                  timestamp: nowMs,
                  text: fbText
                });
              }
              setTimeout(() => setFeedback(null), 1500);
            } else {
              // HIT HAZARD METEOR!
              if (nowMs > leo.invincibleUntil) {
                leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
                heartsRef.current = Math.max(0, heartsRef.current - 1);
                setHearts(heartsRef.current);

                const nextBattery = Math.max(0, batteryRef.current - 10);
                batteryRef.current = nextBattery;
                setBatteryCharge(nextBattery);

                console.log(`[STORM-SHIELD-ACTION] Hit Hazard: "${m.word}" | Hearts: ${heartsRef.current} (-1) | Time Spent: ${elapsedSec.toFixed(2)}s | HUD timeLeft: ${timeLeftRef.current}s`);

                if (heartsRef.current === 0) {
                  setPhase('ko');
                }

                const fbText = `💥 HAZARD HIT! "${m.word}" cracked shield! (-1 Heart)`;
                setFeedback({ type: 'wrong', text: fbText });
                if (typeof window !== 'undefined') {
                  window.__F3D3_EVENT_LOG__ = window.__F3D3_EVENT_LOG__ || [];
                  window.__F3D3_EVENT_LOG__.push({
                    type: 'hazard',
                    word: m.word,
                    deltaBattery: '-10%',
                    timestamp: nowMs,
                    text: fbText
                  });
                }
                setTimeout(() => setFeedback(null), 1500);
              }
            }
          }
          continue; // Meteor consumed
        }

        // Off-screen ground hit
        if (m.y > FLOOR_Y + 10) {
          continue;
        }

        survivingMeteors.push(m);
      }

      meteorsRef.current = survivingMeteors;
      setMeteors([...survivingMeteors]);

      // Update Leo visuals
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
  }, [phase, vocabList, recordPersonalBest, duration]);

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          timeLeftRef.current = 0;
          setPhase('ko');
          return 0;
        }
        const nextTime = t - 1;
        timeLeftRef.current = nextTime;
        return nextTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Gesture Controls for StormShieldDefense — Continuous holding movement + jump + shield
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
    onTapCenter: () => setShieldActive(true),
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
    if (typeof window !== 'undefined') window.__F3D3_EVENT_LOG__ = [];
    batteryRef.current = 0;
    scoreRef.current = 0;
    heartsRef.current = 3;
    timeLeftRef.current = duration;
    consumedMeteorsRef.current.clear();
    setBatteryCharge(0);
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    meteorsRef.current = [];
    setMeteors([]);
    setDeflectCount(0);
    leoRef.current = { x: 430, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, 180) });
    else if (onExit) onExit();
  };

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="storm-shield-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="storm-shield-gesture-layer" />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="storm-objective-banner">
        <CloudLightning size={22} className="storm-banner-icon" />
        <div className="storm-battery-gauge">
          <span className="battery-title">Storm Battery:</span>
          <div className="battery-bar-track">
            <div className="battery-bar-fill" style={{ width: `${batteryCharge}%` }} />
          </div>
          <span className="battery-pct">{batteryCharge}%</span>
        </div>
        <div className="storm-hint-chip">Deflect Golden Meteors!</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`storm-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Main Spire Viewport with smooth Camera follow ────────────── */}
      <div
        className="storm-spire-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Arcane Lightning Clouds */}
        <div className="storm-cloud-layer">
          <div className="lightning-flash-overlay" />
        </div>

        {/* Spire Rooftop Platforms */}
        {SPIRE_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`spire-platform ${idx === 0 ? 'spire-main-roof' : 'spire-battery-deck'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          >
            {idx !== 0 && (
              <div className="spire-battery-pylon">
                <Zap size={18} className="pylon-spark" />
              </div>
            )}
          </div>
        ))}

        {/* Falling Meteors */}
        {phase === 'playing' && meteors.map(m => (
          <div
            key={m.id}
            className={`falling-meteor-entity ${m.isTarget ? 'meteor-golden' : 'meteor-hazard'}`}
            style={{ left: `${m.x}px`, top: `${m.y}px` }}
          >
            <div className="meteor-trail" />
            <div className="meteor-core">
              <span className="meteor-word">{m.word}</span>
            </div>
          </div>
        ))}

        {/* Leo Character with Aegis Shield Glow */}
        <div className="leo-shield-wrapper">
          <LeoCharacter
            x={leoDisplay.x}
            y={leoDisplay.y}
            state={leoDisplay.animState}
            facingRight={leoDisplay.facingRight}
            invincible={leoDisplay.invincible}
          />
          {/* Glowing Aegis Energy Shield Aura */}
          <div
            className="aegis-shield-aura"
            style={{
              left: `${leoDisplay.x - 6}px`,
              top: `${leoDisplay.y - 6}px`,
            }}
          >
            <Shield size={52} className="shield-icon-glow" />
          </div>
        </div>
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        floorDoorLabel="Floor 3 • Door 3 — Storm Shield Defense"
        hearts={hearts}
        round={`${deflectCount}`}
        roundLabel="DEFLECTED:"
        score={score}
        timeLeft={timeLeft}
        wordsCollected={0}
        totalWords={0}
        floorNumber={3}
        doorLabel="Door 3 — Storm Shield Defense"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="storm-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>ASTRAL VORTEX CHARGED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, 180))}
            </div>
            <p className="cleared-score">Score: <strong>{score} XP</strong></p>
            {score > personalBest && (
              <div className="cleared-record">🏆 New Personal Best!</div>
            )}
            <button className="finish-door-btn" onClick={handleFinalFinish}>
              Return to Chamber <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout Modal ───────────────────────────────────────────── */}
      {phase === 'ko' && (
        <div className="storm-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>OVERCHARGED DISCORD!</h2>
            <p>Dark lightning shattered the Aegis Shield!</p>
            <div className="ko-actions">
              <button className="retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="exit-btn" onClick={handleFinalFinish}>
                Retreat to Chamber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
