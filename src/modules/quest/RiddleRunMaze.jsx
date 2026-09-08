/**
 * RiddleRunMaze.jsx — Floor 4, Door 3 (Integration) Mini-Game for Lexio's Quest
 * GDD §2 Floor 4 Room C: "RIDDLE RUN MAZE"
 *
 * Replaces static riddle tapping with Labyrinth Escape Platformer:
 * - Ancient stone labyrinth with 3 Sanctuary Vault Doors across upper & lower tiers
 * - Cambridge riddle prompt displayed on top (e.g. "I keep shoes from slipping on wet corridor tiles. What am I?")
 * - 3 Vault Doors labeled with candidate answers (e.g. "Friction", "Oil", "Water")
 * - Patrolling Chaser Beast (Minotaur) stalks through the maze corridors
 * - Leo navigates stone platforms and enters the correct Sanctuary Vault Door
 * - Correct Door: Door unlocks with golden light, +40 XP, TTS speaks answer!
 * - Wrong Door: Door rejects Leo with dark sparks, -1 Heart!
 * - Full Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HelpCircle, Trophy, RotateCcw, ArrowRight, Key, Sparkles, AlertTriangle, Shield } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import './RiddleRunMaze.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Labyrinth platforms
const MAZE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Maze Floor
  { x: 50,  y: 370,     width: 220,        height: 18 },  // Left Vault Tier
  { x: 340, y: 270,     width: 220,        height: 18 },  // High Central Tower
  { x: 630, y: 370,     width: 220,        height: 18 },  // Right Vault Tier
  { x: 200, y: 450,     width: 140,        height: 16 },  // Step Left
  { x: 560, y: 450,     width: 140,        height: 16 },  // Step Right
];

const DEFAULT_RIDDLES = [
  {
    riddle: 'I am the invisible force that stops shoes from slipping on wet tiles. What am I?',
    answer: 'Friction',
    options: ['Friction', 'Gravity', 'Electricity'],
  },
  {
    riddle: 'I have soles made of special rubber that give strong grip on wet floors. What am I?',
    answer: 'Sneakers',
    options: ['Sneakers', 'Skates', 'Slippers'],
  },
  {
    riddle: 'I am a room filled with test tubes where students investigate science. What am I?',
    answer: 'Laboratory',
    options: ['Laboratory', 'Library', 'Kitchen'],
  },
];

export default function RiddleRunMaze({
  riddlesData = DEFAULT_RIDDLES,
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('riddle_run_maze') || 0;
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

  const riddles = riddlesData && riddlesData.length > 0 ? riddlesData : DEFAULT_RIDDLES;

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentRiddle = riddles[riddleIdx % riddles.length] || DEFAULT_RIDDLES[0];

  // 3 Sanctuary Vault Doors
  const doors = useMemo(() => {
    const opts = [...currentRiddle.options].sort(() => Math.random() - 0.5);
    return [
      { id: 'door_0', x: 100, y: 300, word: opts[0], isCorrect: opts[0] === currentRiddle.answer },
      { id: 'door_1', x: 390, y: 200, word: opts[1], isCorrect: opts[1] === currentRiddle.answer },
      { id: 'door_2', x: 680, y: 300, word: opts[2], isCorrect: opts[2] === currentRiddle.answer },
    ];
  }, [currentRiddle]);

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

  // Chaser Beast (Minotaur patrolling maze floor)
  const beastRef = useRef({
    x: 100,
    y: FLOOR_Y - 45,
    vx: 2.2,
    dir: 1,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: FLOOR_Y - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const [beastDisplay, setBeastDisplay] = useState(beastRef.current);

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
        handleTriggerNearDoor();
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
  }, [doors]);

  // ── Enter Vault Door ───────────────────────────────────────────────────
  const enterDoor = useCallback((door) => {
    if (phase !== 'playing') return;

    if (door.isCorrect) {
      // CORRECT SANCTUARY!
      speakText(door.word);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `✨ SANCTUARY UNLOCKED! "${door.word}" is correct!` });

      setTimeout(() => {
        setFeedback(null);
        if (riddleIdx + 1 < riddles.length) {
          setRiddleIdx(r => r + 1);
        } else {
          // ALL RIDDLES SOLVED
          setPhase('cleared');
          const finalScore = score + (timeLeft * 2) + 60;
          setScore(finalScore);
          recordPersonalBest('riddle_run_maze', finalScore);
          speakText('All labyrinth riddles solved!');
        }
      }, 1500);
    } else {
      // WRONG DOOR
      speakText(door.word);
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next === 0) setPhase('ko');
        return next;
      });
      setFeedback({ type: 'wrong', text: `🔒 SEALED! "${door.word}" does not solve the riddle!` });
      setTimeout(() => setFeedback(null), 1500);
    }
  }, [phase, riddleIdx, riddles.length, score, timeLeft, recordPersonalBest]);

  const handleTriggerNearDoor = useCallback(() => {
    const leo = leoRef.current;
    for (const d of doors) {
      const dist = Math.hypot((leo.x + 20) - (d.x + 35), (leo.y + 24) - (d.y + 35));
      if (dist < 75) {
        enterDoor(d);
        break;
      }
    }
  }, [doors, enterDoor]);

  // ── Physics Game Loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

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

      leo.x = clamp(leo.x + leo.vx, 15, ROOM_WIDTH - LEO_HITBOX.width - 15);
      leo.y += leo.vy;

      // Platform collisions
      const prevY = leo.y - leo.vy;
      const landing = checkPlatformLanding(
        { x: leo.x, y: leo.y, width: LEO_HITBOX.width, height: LEO_HITBOX.height, vy: leo.vy },
        MAZE_PLATFORMS,
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

      // Patrol Chaser Beast
      const beast = beastRef.current;
      beast.x += beast.vx * beast.dir;
      if (beast.x < 50) { beast.x = 50; beast.dir = 1; }
      if (beast.x > ROOM_WIDTH - 80) { beast.x = ROOM_WIDTH - 80; beast.dir = -1; }
      setBeastDisplay({ ...beast });

      // Beast Collision
      const nowMs = Date.now();
      if (nowMs > leo.invincibleUntil) {
        const distBeast = Math.hypot((leo.x + 20) - (beast.x + 20), (leo.y + 24) - (beast.y + 20));
        if (distBeast < 45) {
          leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
          setHearts(h => {
            const next = Math.max(0, h - 1);
            if (next === 0) setPhase('ko');
            return next;
          });
          setFeedback({ type: 'wrong', text: '🐺 Bitten by Labyrinth Wolf! (-1 Heart)' });
          setTimeout(() => setFeedback(null), 1200);
        }
      }

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

  // Gesture Controls for RiddleRunMaze
  const { gestureRef } = useGestureControls({
    onTapLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 240);
    },
    onTapRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 240);
    },
    onTapCenter: handleTriggerNearDoor,
    onDoubleTap: () => {
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 200);
    },
    onSwipeUp: () => {
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 200);
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
    setTimeLeft(duration);
    setRiddleIdx(0);
    leoRef.current = { x: 430, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, riddles.length * 40) });
    else if (onExit) onExit();
  };

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="riddle-maze-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="riddle-maze-gesture-layer" />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="riddle-maze-banner">
        <HelpCircle size={22} className="riddle-banner-icon" />
        <div className="riddle-prompt-box">
          <span className="riddle-prompt-text">"{currentRiddle.riddle}"</span>
        </div>
        <div className="riddle-round-chip">Riddle {riddleIdx + 1} / {riddles.length}</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`riddle-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Labyrinth Viewport with smooth Camera follow ─────────────── */}
      <div
        className="riddle-maze-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Maze Platforms */}
        {MAZE_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`maze-platform ${idx === 0 ? 'maze-ground' : 'maze-tier'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* 3 Vault Doors */}
        {doors.map(d => (
          <div
            key={d.id}
            className="vault-door-entity"
            style={{ left: `${d.x}px`, top: `${d.y}px` }}
            onClick={() => enterDoor(d)}
          >
            {/* Answer Plaque */}
            <div className="vault-door-plaque">
              <span>{d.word}</span>
            </div>
            {/* Vault Gate Graphic */}
            <div className="vault-door-frame">
              <span className="door-arch">🚪</span>
              <span className="door-prompt">ENTER / TAP</span>
            </div>
          </div>
        ))}

        {/* Chaser Beast */}
        <div
          className="chaser-beast-sprite"
          style={{
            left: `${beastDisplay.x}px`,
            top: `${beastDisplay.y}px`,
            transform: beastDisplay.dir < 0 ? 'scaleX(-1)' : 'none',
          }}
        >
          <span>🐺</span>
          <span className="beast-tag">CHASER</span>
        </div>

        {/* Leo Character */}
        <LeoCharacter
          x={leoDisplay.x}
          y={leoDisplay.y}
          state={leoDisplay.animState}
          facingRight={leoDisplay.facingRight}
          invincible={leoDisplay.invincible}
        />
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={riddleIdx}
        totalWords={riddles.length}
        floorNumber={4}
        doorLabel="Door 3 — Riddle Run Maze"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="riddle-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>LABYRINTH ESCAPED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, riddles.length * 40))}
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
        <div className="riddle-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>TRAPPED IN THE MAZE!</h2>
            <p>The labyrinth wolf captured Leo!</p>
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
