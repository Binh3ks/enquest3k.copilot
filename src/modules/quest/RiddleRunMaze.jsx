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
import GameInstructionModal from '../chronicles/games/GameInstructionModal';
import './RiddleRunMaze.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Labyrinth platforms
const MAZE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Maze Floor
  { x: 50,  y: 370,     width: 220,        height: 18 },  // Left Vault Tier (Door 0)
  { x: 340, y: 310,     width: 220,        height: 18 },  // Central Spawn Perch (Leo spawn)
  { x: 630, y: 370,     width: 220,        height: 18 },  // Right Vault Tier (Door 2)
  { x: 370, y: 185,     width: 160,        height: 18 },  // High Apex Altar (Door 1)
  { x: 200, y: 450,     width: 140,        height: 16 },  // Step Left
  { x: 560, y: 450,     width: 140,        height: 16 },  // Step Right
];

const DEFAULT_RIDDLES = [
  {
    riddle: 'I am the invisible force that stops shoes from slipping on wet tiles. What am I?',
    answer: 'Friction',
    options: ['Friction', 'Gravity', 'Electricity', 'Magnetism'],
  },
  {
    riddle: 'I have soles made of special rubber that give strong grip on wet floors. What am I?',
    answer: 'Sneakers',
    options: ['Sneakers', 'Skates', 'Slippers', 'Sandals'],
  },
  {
    riddle: 'I am a room filled with test tubes where students investigate science. What am I?',
    answer: 'Laboratory',
    options: ['Laboratory', 'Library', 'Kitchen', 'Gymnasium'],
  },
  {
    riddle: 'I am cold and applied to an ankle to reduce swelling after a slip. What am I?',
    answer: 'Ice pack',
    options: ['Ice pack', 'Hot towel', 'Bandage', 'Blanket'],
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

  // Enforce at least 4 riddles for N4 <= 3.76% (R=4, p=0.25, L=2)
  const riddles = useMemo(() => {
    if (riddlesData && riddlesData.length >= 4) {
      const valid = riddlesData.filter(r => r && r.riddle && r.answer && Array.isArray(r.options) && r.options.length >= 4);
      if (valid.length >= 4) return valid.slice(0, 4);
    }
    return DEFAULT_RIDDLES;
  }, [riddlesData]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [showHelp, setShowHelp] = useState(false);
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentRiddle = riddles[riddleIdx % riddles.length] || DEFAULT_RIDDLES[0];

  const roundStartTimeRef = useRef(Date.now());
  useEffect(() => {
    roundStartTimeRef.current = Date.now();
    console.log(`[RIDDLE-RUN-ROUND-START] Riddle ${riddleIdx + 1}/${riddles.length} started | timeLeft: ${timeLeft}s | prompt: "${currentRiddle.riddle}"`);
  }, [riddleIdx]);

  // 4 Sanctuary Vault Doors: Left Tier, High Apex, Right Tier, Lower Floor Tier (p = 0.25)
  const doors = useMemo(() => {
    const opts = [...currentRiddle.options].sort(() => Math.random() - 0.5);
    return [
      { id: 'door_0', x: 90,  y: 295, word: opts[0], isCorrect: opts[0] === currentRiddle.answer },
      { id: 'door_1', x: 390, y: 105, word: opts[1], isCorrect: opts[1] === currentRiddle.answer },
      { id: 'door_2', x: 690, y: 295, word: opts[2], isCorrect: opts[2] === currentRiddle.answer },
      { id: 'door_3', x: 390, y: 445, word: opts[3], isCorrect: opts[3] === currentRiddle.answer },
    ];
  }, [currentRiddle]);

  // Leo physics — spawns symmetrically on Central Spawn Perch (x: 430, y: 250)
  // Perfectly centered horizontally (ROOM_WIDTH 900 / 2 - 20 = 430), equidistant (290px) to Left & Right doors,
  // with High Apex Altar (Door 1) elevated 65px above him — completely free of graphical overlap.
  const leoRef = useRef({
    x: 430,
    y: 310 - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: Date.now() + 3000,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__setRiddleLeo = (x, y) => {
        if (leoRef.current) {
          leoRef.current.x = x;
          leoRef.current.y = y;
          leoRef.current.vx = 0;
          leoRef.current.vy = 0;
          leoRef.current.isGrounded = true;
        }
      };
    }
    return () => {
      if (typeof window !== 'undefined') delete window.__setRiddleLeo;
    };
  }, []);

  // Helper for random Chaser Beast spawn away from door_3 (x: 390)
  const getRandomBeastSpawn = () => {
    const isLeft = Math.random() < 0.5;
    const x = isLeft ? Math.floor(Math.random() * 170) + 80 : Math.floor(Math.random() * 170) + 530;
    const dir = isLeft ? 1 : -1;
    return { x, y: FLOOR_Y - 45, vx: 2.2, dir };
  };

  // Chaser Beast (Minotaur patrolling maze floor with randomized spawn)
  const beastRef = useRef(getRandomBeastSpawn());

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 310 - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
    invincible: true,
  });

  const [beastDisplay, setBeastDisplay] = useState(beastRef.current);

  const keysPressed = useRef({ left: false, right: false, up: false });
  const animFrameId = useRef(null);

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  // Dynamic clamp: ensures vault door plaques remain at least 10px from screen edges on any viewport
  const getDoorClampedStyle = useCallback((door) => {
    // Door entity width is 120px, so its center is door.x + 60
    const doorCenterX = door.x + 60;
    const screenCenterX = doorCenterX - cameraX;
    const halfWidth = containerWidth < 640 ? 55 : 65;
    const minScreenX = 10 + halfWidth;
    const maxScreenX = containerWidth - 10 - halfWidth;

    let offset = 0;
    if (screenCenterX > -60 && screenCenterX < containerWidth + 60) {
      if (screenCenterX < minScreenX) {
        offset = minScreenX - screenCenterX;
      } else if (screenCenterX > maxScreenX) {
        offset = maxScreenX - screenCenterX;
      }
    }

    return {
      left: `${door.x}px`,
      top: `${door.y}px`,
      transform: offset !== 0 ? `translateX(${Math.round(offset)}px)` : undefined,
    };
  }, [cameraX, containerWidth]);

  // ── Enter Vault Door (Declared before useEffect to avoid TDZ) ───────────
  const enterDoor = useCallback((door) => {
    if (phase !== 'playing' || showHelp) return;

    const elapsedSec = (Date.now() - roundStartTimeRef.current) / 1000;
    console.log(`[RIDDLE-RUN-ROUND-ACTION] Riddle ${riddleIdx + 1} | Action: ${door.isCorrect ? 'CORRECT' : 'WRONG'} | Time Spent: ${elapsedSec.toFixed(2)}s | Budget: 22.5s | Margin: ${(22.5 - elapsedSec).toFixed(2)}s | HUD timeLeft: ${timeLeft}s`);

    if (door.isCorrect) {
      // CORRECT SANCTUARY!
      if (typeof window !== 'undefined') {
        window.__ttsInvocations = window.__ttsInvocations || [];
        window.__ttsInvocations.push({
          caller: 'RiddleRunMaze.enterDoor',
          word: door.word,
          timestamp: new Date().toISOString(),
        });
      }
      speakText(door.word);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `✨ SANCTUARY UNLOCKED! "${door.word}" is correct!` });

      setTimeout(() => {
        setFeedback(null);
        if (riddleIdx + 1 < riddles.length) {
          beastRef.current = getRandomBeastSpawn();
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
  }, [phase, showHelp, riddleIdx, riddles.length, score, timeLeft, recordPersonalBest]);

  const handleTriggerNearDoor = useCallback(() => {
    const leo = leoRef.current;
    for (const d of doors) {
      const dist = Math.hypot((leo.x + 20) - (d.x + 35), (leo.y + 24) - (d.y + 35));
      if (dist < 85) {
        enterDoor(d);
        break;
      }
    }
  }, [doors, enterDoor]);

  const handleDoorClick = useCallback((door) => {
    const leo = leoRef.current;
    const dist = Math.hypot((leo.x + 20) - (door.x + 35), (leo.y + 24) - (door.y + 35));
    if (dist > 85) {
      setFeedback({ type: 'wrong', text: '⚠️ Leo is too far! Run close to the Sanctuary Door first!' });
      setTimeout(() => setFeedback(null), 1200);
      return;
    }
    enterDoor(door);
  }, [enterDoor]);

  // ── Keyboard controls ──────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (showHelp) return;
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
  }, [handleTriggerNearDoor, showHelp]);

  // ── Physics Game Loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = showHelp ? 0 : Math.min((now - lastTime) / 1000, 0.05);
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
      leo.width = LEO_HITBOX.width;
      leo.height = LEO_HITBOX.height;
      const landed = checkPlatformLanding(leo, MAZE_PLATFORMS);

      if (landed) {
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
  }, [phase, showHelp]);

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
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
  }, [phase, showHelp]);

  // Gesture Controls for RiddleRunMaze — Continuous holding movement + jump + enter door
  const { gestureRef } = useGestureControls({
    onMoveLeftStart: () => { if (!showHelp) keysPressed.current.left = true; },
    onMoveLeftEnd:   () => { keysPressed.current.left = false; },
    onMoveRightStart: () => { if (!showHelp) keysPressed.current.right = true; },
    onMoveRightEnd:   () => { keysPressed.current.right = false; },
    onTapLeft: () => {
      if (showHelp) return;
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 260);
    },
    onTapRight: () => {
      if (showHelp) return;
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 260);
    },
    onTapCenter: handleTriggerNearDoor,
    onDoubleTap: () => {
      if (showHelp) return;
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 220);
    },
    onSwipeUp: () => {
      if (showHelp) return;
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 220);
    },
    onSwipeLeft: () => {
      if (showHelp) return;
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 360);
    },
    onSwipeRight: () => {
      if (showHelp) return;
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 360);
    },
    enabled: phase === 'playing' && !showHelp,
  });

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRiddleIdx(0);
    setFeedback(null);
    beastRef.current = getRandomBeastSpawn();
    leoRef.current = { x: 430, y: 310 - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: Date.now() + 3000 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, riddles.length * 40) });
    else if (onExit) onExit();
  };

  return (
    <div className="riddle-maze-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Game Instruction Modal ── */}
      <GameInstructionModal
        gameId="lexical_riddle"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

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
            data-door-id={d.id}
            data-is-correct={d.isCorrect ? 'true' : 'false'}
            data-door-word={d.word}
            style={getDoorClampedStyle(d)}
            onClick={() => handleDoorClick(d)}
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
          }}
        >
          <span className="beast-icon" style={{ display: 'inline-block', transform: beastDisplay.dir < 0 ? 'scaleX(-1)' : 'none' }}>🐺</span>
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
        round={{ current: riddleIdx + 1, total: riddles.length }}
        floorNumber={4}
        doorLabel="Door 3 — Riddle Run Maze"
        rightActions={
          <button
            type="button"
            className="riddle-help-btn"
            onClick={() => setShowHelp(true)}
            title="Game Instructions"
          >
            <HelpCircle size={15} /> Guide
          </button>
        }
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
