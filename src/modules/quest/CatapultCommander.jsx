/**
 * CatapultCommander.jsx — Floor 3, Door 2 (Grammar/Syntax) Mini-Game for Lexio's Quest
 * GDD §2 Floor 3 Room B: "CATAPULT COMMANDER"
 *
 * Replaces static chunk matching with Rampart Defense Platformer:
 * - Castle battlements overlooking advancing waves of Grammar Goblins
 * - Target sentence displayed with missing collocation chunk (e.g. "Jake walked ___")
 * - 3 Catapults across the rampart loaded with boulder chunks
 * - Leo runs across high parapet platforms and jumps onto the correct Catapult Launch Lever
 * - Correct chunk: Boulder launches in an arc, crushes goblin wave, TTS speaks full collocation!
 * - Wrong chunk: Boulder misses, goblins breach forward and hit Castle Gate HP!
 * - Full Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Shield, Trophy, RotateCcw, ArrowRight, Crosshair, Sparkles, AlertTriangle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import './CatapultCommander.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Castle Rampart Platforms
const RAMPART_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Lower Rampart
  { x: 60,  y: 360,     width: 220,        height: 20 },  // Left Catapult Tower
  { x: 340, y: 340,     width: 220,        height: 20 },  // Center Catapult Tower
  { x: 620, y: 360,     width: 220,        height: 20 },  // Right Catapult Tower
];

const DEFAULT_WAVES = [
  {
    targetStem: 'Jake walked carefully down',
    correctChunk: 'the school corridor',
    fullSentence: 'Jake walked carefully down the school corridor.',
    options: [
      { id: 'c0', chunk: 'the school corridor', isCorrect: true },
      { id: 'c1', chunk: 'the deep ocean',       isCorrect: false },
      { id: 'c2', chunk: 'the rocket ship',      isCorrect: false },
    ],
  },
  {
    targetStem: 'Rubber shoes give strong grip on',
    correctChunk: 'wet polished tiles',
    fullSentence: 'Rubber shoes give strong grip on wet polished tiles.',
    options: [
      { id: 'c3', chunk: 'thin paper walls',     isCorrect: false },
      { id: 'c4', chunk: 'wet polished tiles',    isCorrect: true },
      { id: 'c5', chunk: 'clouds in the sky',    isCorrect: false },
    ],
  },
  {
    targetStem: 'The science lab test proved that friction',
    correctChunk: 'prevents dangerous slips',
    fullSentence: 'The science lab test proved that friction prevents dangerous slips.',
    options: [
      { id: 'c6', chunk: 'makes food sweet',      isCorrect: false },
      { id: 'c7', chunk: 'turns into water',      isCorrect: false },
      { id: 'c8', chunk: 'prevents dangerous slips', isCorrect: true },
    ],
  },
];

export default function CatapultCommander({
  wavesData = DEFAULT_WAVES,
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('catapult_commander') || 0;
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

  const waves = wavesData && wavesData.length > 0 ? wavesData : DEFAULT_WAVES;

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [waveIdx, setWaveIdx] = useState(0);
  const [gateHealth, setGateHealth] = useState(100);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [launchingCatapult, setLaunchingCatapult] = useState(null); // id of catapult firing

  const currentWave = waves[waveIdx % waves.length] || DEFAULT_WAVES[0];

  // Goblin horde advance progress (0% at horizon, 100% hits castle gate)
  const [goblinProgress, setGoblinProgress] = useState(15);

  // 3 Catapults placed on the 3 elevated towers
  const catapults = useMemo(() => {
    const opts = currentWave.options;
    return [
      { id: 'catapult_0', x: 100, y: 315, chunk: opts[0]?.chunk, isCorrect: opts[0]?.isCorrect },
      { id: 'catapult_1', x: 380, y: 295, chunk: opts[1]?.chunk, isCorrect: opts[1]?.isCorrect },
      { id: 'catapult_2', x: 660, y: 315, chunk: opts[2]?.chunk, isCorrect: opts[2]?.isCorrect },
    ];
  }, [currentWave]);

  // Leo physics state
  const leoRef = useRef({
    x: 420,
    y: 280,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 420,
    y: 280,
    facingRight: true,
    animState: 'idle',
  });

  const keysPressed = useRef({ left: false, right: false, up: false });
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
      if (['KeyE', 'Enter'].includes(e.code)) {
        e.preventDefault();
        handleTriggerNearCatapult();
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
  }, [catapults]);

  // ── Trigger Catapult Launch ────────────────────────────────────────────
  const launchCatapult = useCallback((catapult) => {
    if (phase !== 'playing' || launchingCatapult) return;

    setLaunchingCatapult(catapult.id);

    if (catapult.isCorrect) {
      // HIT!
      speakText(catapult.chunk);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `💥 BOULDER CRUSH! Repelled wave with "[${catapult.chunk}]"` });
      // Reset goblin horde distance
      setGoblinProgress(10);

      setTimeout(() => {
        setLaunchingCatapult(null);
        setFeedback(null);
        if (waveIdx + 1 < waves.length) {
          setWaveIdx(w => w + 1);
        } else {
          // CLEARED ALL WAVES
          setPhase('cleared');
          const finalScore = score + 50 + (timeLeft * 2);
          setScore(finalScore);
          recordPersonalBest('catapult_commander', finalScore);
          speakText('Castle battlements successfully defended!');
        }
      }, 1400);
    } else {
      // MISS!
      speakText(catapult.chunk);
      setGateHealth(gh => {
        const next = Math.max(0, gh - 35);
        if (next === 0) setPhase('ko');
        return next;
      });
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next === 0) setPhase('ko');
        return next;
      });
      setFeedback({ type: 'wrong', text: `❌ MISFIRE! "[${catapult.chunk}]" didn't stop the horde! (-35 Gate HP)` });

      setTimeout(() => {
        setLaunchingCatapult(null);
        setFeedback(null);
      }, 1400);
    }
  }, [phase, launchingCatapult, waveIdx, waves.length, score, timeLeft, recordPersonalBest]);

  // Check proximity trigger if Leo presses Space/Action near a catapult
  const handleTriggerNearCatapult = useCallback(() => {
    const leo = leoRef.current;
    for (const cat of catapults) {
      const dist = Math.hypot((leo.x + 20) - (cat.x + 40), (leo.y + 24) - (cat.y + 20));
      if (dist < 75) {
        launchCatapult(cat);
        break;
      }
    }
  }, [catapults, launchCatapult]);

  // ── Physics Game Loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

      // Horizontal
      if (keys.left) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (keys.right) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx = 0;
      }

      // Jump
      if (keys.up && leo.isGrounded) {
        leo.vy = LEO_JUMP_FORCE;
        leo.isGrounded = false;
      }

      // Gravity
      applyGravity(leo);

      leo.x = clamp(leo.x + leo.vx, 15, ROOM_WIDTH - LEO_HITBOX.width - 15);
      leo.y += leo.vy;

      // Platform collisions
      const prevY = leo.y - leo.vy;
      const landing = checkPlatformLanding(
        { x: leo.x, y: leo.y, width: LEO_HITBOX.width, height: LEO_HITBOX.height, vy: leo.vy },
        RAMPART_PLATFORMS,
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

      // Determine animation state
      let animState = 'idle';
      if (!leo.isGrounded) animState = 'jump';
      else if (Math.abs(leo.vx) > 10) animState = 'run';

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
      });

      // Goblin horde march forward slowly
      setGoblinProgress(p => {
        const next = p + dt * 2.8; // marches over ~30 seconds if unanswered
        if (next >= 100) {
          // Gate breached!
          setGateHealth(gh => {
            const nh = Math.max(0, gh - 40);
            if (nh === 0) setPhase('ko');
            return nh;
          });
          return 20;
        }
        return next;
      });

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [phase]);

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

  // Gesture Controls for CatapultCommander — Continuous holding movement + jump + trigger
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
    onTapCenter: handleTriggerNearCatapult,
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
    setGateHealth(100);
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setWaveIdx(0);
    setGoblinProgress(15);
    leoRef.current = { x: 420, y: 280, vx: 0, vy: 0, isGrounded: true, facingRight: true };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, waves.length * 40) });
    else if (onExit) onExit();
  };

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="catapult-commander-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="catapult-gesture-layer" />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="catapult-objective-banner">
        <Shield size={20} className="catapult-banner-icon" />
        <div className="catapult-sentence-display">
          <span className="catapult-stem-text">{currentWave.targetStem}</span>
          <span className="catapult-missing-chunk">[ ___ ? ___ ]</span>
        </div>
        <div className="catapult-gate-hp">
          <span>Gate HP:</span>
          <div className="gate-hp-bar">
            <div className="gate-hp-fill" style={{ width: `${gateHealth}%` }} />
          </div>
        </div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`catapult-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Main Rampart Viewport with smooth Camera follow ──────────── */}
      <div
        className="catapult-rampart-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Horizon Sky & Advancing Goblin Wave */}
        <div className="distant-horizon">
          <div
            className="goblin-horde-line"
            style={{ transform: `translateY(${goblinProgress * 1.8}px) scale(${0.8 + goblinProgress * 0.005})` }}
          >
            <span>👹 👺 👹 👺 👹</span>
            <div className="horde-label">Advancing Grammar Horde ({Math.round(goblinProgress)}% Distance)</div>
          </div>
        </div>

        {/* Rampart Platforms */}
        {RAMPART_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`rampart-platform ${idx === 0 ? 'rampart-lower' : 'catapult-tower'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* 3 Catapults */}
        {catapults.map(cat => {
          const isFiring = launchingCatapult === cat.id;
          return (
            <div
              key={cat.id}
              className={`catapult-entity ${isFiring ? 'catapult-firing' : ''}`}
              style={{ left: `${cat.x}px`, top: `${cat.y}px` }}
              onClick={() => launchCatapult(cat)}
            >
              {/* Word Chunk Plaque */}
              <div className="catapult-chunk-plaque">
                <span>{cat.chunk}</span>
              </div>
              {/* Catapult Rig & Arm */}
              <div className="catapult-machine">
                <span className="catapult-emoji">🏹</span>
                <span className="launch-trigger-tag">TAP / JUMP</span>
              </div>
            </div>
          );
        })}

        {/* Leo Character */}
        <LeoCharacter
          x={leoDisplay.x}
          y={leoDisplay.y}
          state={leoDisplay.animState}
          facingRight={leoDisplay.facingRight}
        />
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={waveIdx}
        totalWords={waves.length}
        floorNumber={3}
        doorLabel="Door 2 — Catapult Commander"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="catapult-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>RAMPART DEFENSE VICTORIOUS!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, waves.length * 40))}
            </div>
            <p className="cleared-score">Score: <strong>{score} XP</strong> (Gate: {gateHealth}%)</p>
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
        <div className="catapult-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>GATE BREACHED!</h2>
            <p>The grammar goblins breached the castle walls!</p>
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
