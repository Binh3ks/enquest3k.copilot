/**
 * BubbleStormChase.jsx — Floor 1, Door 1 (Vocab) Mini-Game for Lexio's Quest
 * GDD §2 Floor 1 Room A: "BUBBLE STORM CHASE"
 *
 * Replaces static click-the-bubble with physical Leo platformer exploration:
 * - Target Word displayed in glowing Spellbook HUD banner
 * - Multi-tiered stone platforms (Ground, Mid, High)
 * - 4 floating crystal bubbles (1 target, 2 distractors, 1 bomb bubble in Wave 3+)
 * - Leo moves & jumps to physically pop the correct bubble
 * - MCQ Blitz popup (5s countdown) on target bubble collision (❄️ Freeze / 💨 Speed-up)
 * - 2 ground slime/zombie creatures to dodge by platforming
 * - Full Virtual D-Pad (mobile) + Arrow Keys / WASD (desktop) support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, Timer, Sparkles, AlertOctagon, ArrowRight, RotateCcw } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y, MAX_FALL_SPEED,
  LEO_HITBOX, ENEMY_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import MCQBlitzPopup, { generateMCQChoices } from './MCQBlitzPopup';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import './BubbleStormChase.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// 3-tier platforms for BubbleStormChase
const BUBBLE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Ground
  { x: 80,  y: 390,     width: 220,        height: 18 },  // Tier 1 Left
  { x: 360, y: 340,     width: 200,        height: 18 },  // Tier 1 Mid
  { x: 620, y: 380,     width: 200,        height: 18 },  // Tier 1 Right
  { x: 220, y: 230,     width: 180,        height: 18 },  // Tier 2 Left-High
  { x: 500, y: 220,     width: 190,        height: 18 },  // Tier 2 Right-High
];

const FALLBACK_WORDS = [
  { word: 'friction', definition: 'The resistance when surfaces slide against each other' },
  { word: 'laboratory', definition: 'A room equipped for scientific experiments' },
  { word: 'slippery', definition: 'Difficult to hold or walk on because smooth or wet' },
  { word: 'traction', definition: 'The grip of a shoe on the floor surface' },
  { word: 'bandage', definition: 'A strip of material used to protect an injury' },
];

export default function BubbleStormChase({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
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

  // Build target waves
  const waves = useMemo(() => {
    const valid = vocabItems.filter(v => v.word && v.word.length >= 3);
    const pool = valid.length >= 4 ? valid : [...valid, ...FALLBACK_WORDS];
    return pool.slice(0, 5);
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'mcq' | 'cleared' | 'ko'
  const [waveIndex, setWaveIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [mcqData, setMcqData] = useState(null);
  const [targetWordAudioPlaying, setTargetWordAudioPlaying] = useState(false);
  const [streak, setStreak] = useState(0);

  // Leo physics state
  const leoRef = useRef({
    x: 100,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    onGround: true,
    hearts: 3,
    invincibleUntil: 0,
    animState: 'idle',
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 100, y: FLOOR_Y - LEO_HITBOX.height, animState: 'idle', facingRight: true, invincible: false
  });

  // Floating bubbles state
  const bubblesRef = useRef([]);
  const [bubblesDisplay, setBubblesDisplay] = useState([]);

  // Slime enemies state
  const enemiesRef = useRef([
    { id: 'slime1', type: 'slime', x: 320, y: FLOOR_Y - 45, vx: 1.6, minX: 100, maxX: 450, state: 'patrol' },
    { id: 'slime2', type: 'slime', x: 620, y: FLOOR_Y - 45, vx: -1.8, minX: 420, maxX: 820, state: 'patrol' },
  ]);
  const [enemiesDisplay, setEnemiesDisplay] = useState([]);

  const inputRef = useRef({ left: false, right: false, jump: false });
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const currentTarget = waves[waveIndex % waves.length] || FALLBACK_WORDS[0];

  // Spawn bubbles for current wave
  const spawnBubblesForWave = useCallback((waveIdx) => {
    const target = waves[waveIdx % waves.length] || FALLBACK_WORDS[0];
    const otherPool = waves.filter(w => w.word !== target.word);
    const distractorWords = otherPool.length >= 2
      ? [otherPool[0].word, otherPool[1].word]
      : ['pencil', 'bottle'];

    const spawnSlots = [
      { x: 140, y: 310 }, // above left platform
      { x: 420, y: 260 }, // above mid platform
      { x: 680, y: 300 }, // above right platform
      { x: 300, y: 150 }, // high left
    ];

    // Shuffle words among slots
    const bubbleItems = [
      { word: target.word, isTarget: true, isBomb: false },
      { word: distractorWords[0], isTarget: false, isBomb: false },
      { word: distractorWords[1], isTarget: false, isBomb: false },
    ];

    // Add bomb bubble on Wave 3+
    if (waveIdx >= 2) {
      bubbleItems.push({ word: '💥 BOMB', isTarget: false, isBomb: true });
    }

    const shuffled = [...bubbleItems].sort(() => Math.random() - 0.5);
    const newBubbles = shuffled.map((item, idx) => ({
      id: `bubble_${waveIdx}_${idx}_${Date.now()}`,
      word: item.word,
      isTarget: item.isTarget,
      isBomb: item.isBomb,
      x: spawnSlots[idx]?.x || (150 + idx * 180),
      y: spawnSlots[idx]?.y || (200 + (idx % 2) * 80),
      radius: 38,
      baseY: spawnSlots[idx]?.y || 200,
      phaseOffset: Math.random() * Math.PI * 2,
      popped: false,
    }));

    bubblesRef.current = newBubbles;
    setBubblesDisplay([...newBubbles]);

    // Read word aloud
    speakText(target.word, null, 1.0, null, 'new_word', weekNumber);
  }, [waves, weekNumber]);

  // Initialize Wave 0
  useEffect(() => {
    spawnBubblesForWave(0);
    // Reset Leo
    leoRef.current = {
      x: 100, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0,
      onGround: true, hearts: 3, invincibleUntil: 0,
      animState: 'idle', facingRight: true,
    };
    setHearts(3);
  }, [spawnBubblesForWave]);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing') {
      clearInterval(timerIntervalRef.current);
      return;
    }
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerIntervalRef.current);
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, [phase]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = true;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        if (!e.repeat) inputRef.current.jump = true;
      }
    };
    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = false;
      if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) inputRef.current.jump = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    if (phase !== 'playing') {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const loop = () => {
      const leo = leoRef.current;
      const input = inputRef.current;
      const enemies = enemiesRef.current;
      const bubbles = bubblesRef.current;
      const now = Date.now();

      // 1. Leo Horizontal velocity
      if (input.left && !input.right) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (input.right && !input.left) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx = 0;
      }

      // 2. Jump
      if (input.jump && leo.onGround) {
        leo.vy = LEO_JUMP_FORCE;
        leo.onGround = false;
        input.jump = false;
      }

      // 3. Gravity
      applyGravity(leo);

      // 4. Update Position & Clamp
      leo.x = clamp(leo.x + leo.vx, 0, ROOM_WIDTH - LEO_HITBOX.width);
      leo.y += leo.vy;

      // 5. Platform landings
      const landed = checkPlatformLanding(leo, BUBBLE_PLATFORMS);
      leo.onGround = landed || leo.y >= FLOOR_Y - LEO_HITBOX.height;
      if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.onGround = true;
      }

      // 6. Animation State
      const invincible = now < leo.invincibleUntil;
      if (!leo.onGround && leo.vy < 0) leo.animState = 'jump';
      else if (!leo.onGround && leo.vy > 0) leo.animState = 'fall';
      else if (input.left || input.right) leo.animState = leo.facingRight ? 'run_r' : 'run_l';
      else leo.animState = 'idle';

      // 7. Enemy Patrol & Collision
      if (!invincible) {
        for (const enemy of enemies) {
          const enemyCenter = { x: enemy.x + 25, y: enemy.y + 20 };
          const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
          const dist = Math.hypot(enemyCenter.x - leoCenter.x, enemyCenter.y - leoCenter.y);
          if (dist < 38) {
            leo.hearts = Math.max(0, leo.hearts - 1);
            leo.invincibleUntil = now + INVINCIBILITY_MS;
            leo.animState = 'hit';
            setHearts(leo.hearts);
            if (leo.hearts <= 0) {
              setPhase('ko');
              return;
            }
            break;
          }
        }
      }

      // Patrol movement
      for (const enemy of enemies) {
        if (enemy.frozenUntil && now < enemy.frozenUntil) continue;
        const multiplier = (enemy.speedupUntil && now < enemy.speedupUntil) ? 1.8 : 1.0;
        enemy.x += enemy.vx * multiplier;
        if (enemy.x <= enemy.minX || enemy.x >= enemy.maxX) {
          enemy.vx = -enemy.vx;
        }
      }

      // 8. Bubble Float Bobbing & Collision
      const timeSec = now / 600;
      for (const bubble of bubbles) {
        if (bubble.popped) continue;
        bubble.y = bubble.baseY + Math.sin(timeSec + bubble.phaseOffset) * 12;

        // Check Leo collision with bubble
        const bubbleCenter = { x: bubble.x + bubble.radius, y: bubble.y + bubble.radius };
        const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
        const dist = Math.hypot(bubbleCenter.x - leoCenter.x, bubbleCenter.y - leoCenter.y);

        if (dist < bubble.radius + 28) {
          handleBubbleHit(bubble);
          break;
        }
      }

      // Sync state to display
      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setEnemiesDisplay([...enemies]);
      setBubblesDisplay([...bubbles]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase]);

  // Handle Bubble Hit
  const handleBubbleHit = (bubble) => {
    if (bubble.popped) return;

    if (bubble.isBomb) {
      // Bomb hazard!
      bubble.popped = true;
      const leo = leoRef.current;
      leo.hearts = Math.max(0, leo.hearts - 1);
      leo.invincibleUntil = Date.now() + INVINCIBILITY_MS;
      leo.animState = 'hit';
      setHearts(leo.hearts);
      setStreak(0);
      if (leo.hearts <= 0) {
        setPhase('ko');
      }
      return;
    }

    if (bubble.isTarget) {
      // Pop correct bubble! Trigger MCQ Blitz
      bubble.popped = true;
      setPhase('mcq');
      const target = waves[waveIndex % waves.length] || FALLBACK_WORDS[0];
      const choices = generateMCQChoices(target, waves);
      setMcqData({
        word: target.word,
        question: `What does "${target.word}" mean?`,
        choices,
      });
    } else {
      // Distractor bubble: Slimes speed up!
      bubble.popped = true;
      setStreak(0);
      const now = Date.now();
      enemiesRef.current.forEach(e => {
        e.speedupUntil = now + 4000;
      });
    }
  };

  // MCQ Blitz Correct
  const handleMCQCorrect = () => {
    const addScore = 20 + streak * 5;
    setScore(s => s + addScore);
    setStreak(st => st + 1);

    // Freeze enemies for 3s
    const now = Date.now();
    enemiesRef.current.forEach(e => {
      e.frozenUntil = now + 3000;
    });

    const nextWave = waveIndex + 1;
    if (nextWave >= waves.length) {
      // Cleared all waves!
      setPhase('cleared');
    } else {
      setWaveIndex(nextWave);
      spawnBubblesForWave(nextWave);
      setPhase('playing');
    }
  };

  // MCQ Blitz Wrong / Timeout
  const handleMCQWrong = () => {
    setStreak(0);
    // Speed up enemies for 5s
    const now = Date.now();
    enemiesRef.current.forEach(e => {
      e.speedupUntil = now + 5000;
    });
    // Un-pop bubble so student can try again
    bubblesRef.current.forEach(b => {
      if (b.isTarget) b.popped = false;
    });
    setPhase('playing');
  };

  // Time up handler
  const handleTimeUp = () => {
    setPhase('cleared');
  };

  // Completion calculation
  const handleFinalFinish = () => {
    const stars = calculateStars(score, waves.length * 20);
    recordPersonalBest('bubble_storm_chase', score);
    onComplete?.(stars, score);
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setWaveIndex(0);
    setTimeLeft(duration);
    setPhase('playing');
    spawnBubblesForWave(0);
  };

  // Gesture Controls for mobile runner/platformer
  const { gestureRef } = useGestureControls({
    onTapLeft: () => {
      inputRef.current.left = true;
      setTimeout(() => { inputRef.current.left = false; }, 240);
    },
    onTapRight: () => {
      inputRef.current.right = true;
      setTimeout(() => { inputRef.current.right = false; }, 240);
    },
    onDoubleTap: () => {
      inputRef.current.jump = true;
      setTimeout(() => { inputRef.current.jump = false; }, 200);
    },
    onSwipeUp: () => {
      inputRef.current.jump = true;
      setTimeout(() => { inputRef.current.jump = false; }, 200);
    },
    onSwipeLeft: () => {
      inputRef.current.left = true;
      setTimeout(() => { inputRef.current.left = false; }, 360);
    },
    onSwipeRight: () => {
      inputRef.current.right = true;
      setTimeout(() => { inputRef.current.right = false; }, 360);
    },
    enabled: phase === 'playing',
  });

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="bubble-storm-container" role="region" aria-label="Bubble Storm Chase" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="storm-gesture-layer" />

      {/* ── Top Target Banner ────────────────────────────────────────── */}
      <div className="target-spellbook-banner">
        <div className="spellbook-badge">
          <Sparkles size={16} className="sparkle-icon" />
          <span>WAVE {waveIndex + 1}/{waves.length}</span>
        </div>
        <div className="target-word-display">
          <span className="target-label">TARGET:</span>
          <span className="target-word-text">{currentTarget.word}</span>
          <button
            className="target-audio-btn"
            onClick={() => speakText(currentTarget.word, null, 1.0, null, 'new_word', weekNumber)}
            aria-label={`Listen to ${currentTarget.word}`}
          >
            <Volume2 size={18} />
          </button>
        </div>
        <div className="target-hint-text">
          {currentTarget.definition}
        </div>
      </div>

      {/* ── Game World (Canvas/DOM Viewport with smooth Camera follow) ─ */}
      <div
        className="storm-world-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Background Parallax Layer */}
        <div className="storm-bg-layer" />

        {/* Platforms */}
        {BUBBLE_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`storm-platform ${idx === 0 ? 'platform-floor' : 'platform-floating'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* Floating Bubbles */}
        {bubblesDisplay.map((b) => (
          !b.popped && (
            <div
              key={b.id}
              className={`storm-crystal-bubble ${b.isBomb ? 'bubble-bomb' : 'bubble-word'}`}
              style={{
                left: `${b.x}px`,
                top: `${b.y}px`,
                width: `${b.radius * 2}px`,
                height: `${b.radius * 2}px`,
              }}
              onClick={() => handleBubbleHit(b)}
              role="button"
              tabIndex={0}
              aria-label={b.isBomb ? 'Hazard Bomb' : `Bubble: ${b.word}`}
            >
              <div className="bubble-inner-glow" />
              <span className="bubble-word-text">{b.word}</span>
            </div>
          )
        ))}

        {/* Slime Enemies */}
        {enemiesDisplay.map((enemy) => {
          const isFrozen = enemy.frozenUntil && Date.now() < enemy.frozenUntil;
          const isSpeed = enemy.speedupUntil && Date.now() < enemy.speedupUntil;
          return (
            <div
              key={enemy.id}
              className={`storm-slime-enemy ${isFrozen ? 'enemy-frozen' : ''} ${isSpeed ? 'enemy-speed' : ''}`}
              style={{ left: `${enemy.x}px`, top: `${enemy.y}px` }}
            >
              <span className="slime-sprite">{isFrozen ? '🧊' : isSpeed ? '⚡🧟' : '🧪'}</span>
            </div>
          );
        })}

        {/* Leo Player Sprite */}
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
        wordsCollected={waveIndex}
        totalWords={waves.length}
        floorNumber={1}
        doorLabel="Door 1 — Bubble Storm Chase"
      />

      {/* ── MCQ Blitz Popup (5s Challenge) ───────────────────────────── */}
      {phase === 'mcq' && mcqData && (
        <MCQBlitzPopup
          word={mcqData.word}
          question={mcqData.question}
          choices={mcqData.choices}
          onCorrect={handleMCQCorrect}
          onWrong={handleMCQWrong}
          onClose={handleMCQWrong}
        />
      )}

      {/* ── Cleared / Victory Screen ─────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="storm-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>CHAMBER DOOR CLEARED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, waves.length * 20))}
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

      {/* ── Knockout (KO) Screen ─────────────────────────────────────── */}
      {phase === 'ko' && (
        <div className="storm-ko-modal">
          <div className="ko-card">
            <AlertOctagon size={48} className="ko-icon" />
            <h2>LEO KNOCKED OUT!</h2>
            <p>The dungeon slimes got the upper hand this time!</p>
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
