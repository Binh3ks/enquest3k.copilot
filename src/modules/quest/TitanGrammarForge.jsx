/**
 * TitanGrammarForge.jsx — Floor 5, Door 2 (Grammar) Mini-Game for Lexio's Quest
 * GDD §2 Floor 5 Room B: "TITAN GRAMMAR FORGE"
 *
 * Replaces static grammar tapping with Mechanical Clockwork Platformer:
 * - Colossal Clockwork Titan chamber with rotating gear platforms & steam vents
 * - Target sentence with grammatical connector blank displayed on HUD
 * - 3 Titan Gear Cogs positioned across elevated platforms
 * - Leo leaps across clockwork beams, dodging steam hazards, and activates the correct Gear Cog
 * - Correct Gear: Titan Heart Engine roars to life with golden energy, TTS speaks full sentence, +40 XP!
 * - Wrong Gear: Steam blast hazard erupts, -1 Heart!
 * - Full Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Cog, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, Flame } from 'lucide-react';
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
import './TitanGrammarForge.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Clockwork Titan Platforms
const TITAN_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Lower Machine Floor
  { x: 80,  y: 360,     width: 190,        height: 20 },  // Left Cog Deck
  { x: 350, y: 300,     width: 200,        height: 20 },  // Center Titan Heart Deck
  { x: 630, y: 360,     width: 190,        height: 20 },  // Right Cog Deck
  { x: 220, y: 440,     width: 120,        height: 16 },  // Step Gear Left
  { x: 560, y: 440,     width: 120,        height: 16 },  // Step Gear Right
];

const DEFAULT_TITAN_ROUNDS = [
  {
    stem: 'Without sufficient friction, the vehicle',
    correctClause: 'could not stop in time',
    fullSentence: 'Without sufficient friction, the vehicle could not stop in time.',
    options: [
      { id: 'cog_0', text: 'could not stop in time', isCorrect: true },
      { id: 'cog_1', text: 'stops immediately now',   isCorrect: false },
      { id: 'cog_2', text: 'will stopped yesterday',  isCorrect: false },
    ],
  },
  {
    stem: 'The engineer designed rubber soles so that',
    correctClause: 'workers would stay safe',
    fullSentence: 'The engineer designed rubber soles so that workers would stay safe.',
    options: [
      { id: 'cog_3', text: 'tiles are slippery',      isCorrect: false },
      { id: 'cog_4', text: 'workers would stay safe',  isCorrect: true },
      { id: 'cog_5', text: 'everyone falling down',   isCorrect: false },
    ],
  },
  {
    stem: 'Had Jake not noticed the warning sign, he',
    correctClause: 'might have suffered an injury',
    fullSentence: 'Had Jake not noticed the warning sign, he might have suffered an injury.',
    options: [
      { id: 'cog_6', text: 'walks happily away',       isCorrect: false },
      { id: 'cog_7', text: 'is safe right now',        isCorrect: false },
      { id: 'cog_8', text: 'might have suffered an injury', isCorrect: true },
    ],
  },
];

export default function TitanGrammarForge({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('titan_grammar_forge') || 0;

  // Viewport tracking & responsive camera
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(ROOM_WIDTH);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || ROOM_WIDTH);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const rounds = useMemo(() => {
    if (grammarSentences && grammarSentences.length > 0) {
      return grammarSentences.slice(0, 3).map((item, idx) => {
        const full = item.fullSentence || 'Friction prevents dangerous slips across wet surfaces.';
        const words = full.split(' ');
        const mid = Math.floor(words.length / 2);
        const stem = words.slice(0, mid).join(' ');
        const tail = words.slice(mid).join(' ');
        return {
          stem,
          correctClause: tail,
          fullSentence: full,
          options: [
            { id: `cog_${idx}_0`, text: tail, isCorrect: true },
            { id: `cog_${idx}_1`, text: 'stopped unexpectedly', isCorrect: false },
            { id: `cog_${idx}_2`, text: 'is falling fast', isCorrect: false },
          ].sort(() => Math.random() - 0.5),
        };
      });
    }
    return DEFAULT_TITAN_ROUNDS;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_TITAN_ROUNDS[0];

  // 3 Gear Cogs
  const cogs = useMemo(() => {
    const opts = currentRound.options;
    return [
      { id: 'gear_0', x: 120, y: 315, option: opts[0] },
      { id: 'gear_1', x: 400, y: 255, option: opts[1] },
      { id: 'gear_2', x: 670, y: 315, option: opts[2] },
    ];
  }, [currentRound]);

  // Leo physics
  const leoRef = useRef({
    x: 430,
    y: 240,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 240,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  // Periodic Steam Hazard Vent (toggles every 3s)
  const [steamActive, setSteamActive] = useState(false);

  const keysPressed = useRef({ left: false, right: false, up: false });
  const animFrameId = useRef(null);

  // Steam cycle
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setSteamActive(s => !s);
    }, 2800);
    return () => clearInterval(interval);
  }, [phase]);

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
        handleTriggerNearCog();
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
  }, [cogs]);

  // ── Strike/Activate Gear Cog ───────────────────────────────────────────
  const activateCog = useCallback((cog) => {
    if (phase !== 'playing') return;

    if (cog.option.isCorrect) {
      // CORRECT GEAR
      speakText(currentRound.fullSentence);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `⚙️ TITAN HEART ENGAGED! "${cog.option.text}"` });

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 < rounds.length) {
          setRoundIdx(r => r + 1);
        } else {
          // ALL CLEARED
          setPhase('cleared');
          const finalScore = score + (timeLeft * 2) + 60;
          setScore(finalScore);
          recordPersonalBest('titan_grammar_forge', finalScore);
          speakText('Titan clockwork engine fully forged!');
        }
      }, 1600);
    } else {
      // WRONG GEAR
      speakText(cog.option.text);
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next === 0) setPhase('ko');
        return next;
      });
      setFeedback({ type: 'wrong', text: `💥 GEAR JAM! "${cog.option.text}" broke the piston!` });
      setTimeout(() => setFeedback(null), 1600);
    }
  }, [phase, currentRound, roundIdx, rounds.length, score, timeLeft, recordPersonalBest]);

  const handleTriggerNearCog = useCallback(() => {
    const leo = leoRef.current;
    for (const cog of cogs) {
      const dist = Math.hypot((leo.x + 20) - (cog.x + 35), (leo.y + 24) - (cog.y + 20));
      if (dist < 75) {
        activateCog(cog);
        break;
      }
    }
  }, [cogs, activateCog]);

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
        TITAN_PLATFORMS,
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

      // Steam Hazard Collision (in the center vent at x: 420-480, y: FLOOR_Y - 60)
      const nowMs = Date.now();
      if (steamActive && nowMs > leo.invincibleUntil) {
        if (leo.x >= 400 && leo.x <= 500 && leo.y >= FLOOR_Y - 90) {
          leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
          setHearts(h => {
            const next = Math.max(0, h - 1);
            if (next === 0) setPhase('ko');
            return next;
          });
          setFeedback({ type: 'wrong', text: '💨 Scalded by Titan Steam Vent! (-1 Heart)' });
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
  }, [phase, steamActive]);

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

  // Camera follow Leo horizontally
  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  // Mobile gesture controls — Continuous holding movement + jump + trigger
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
      if (leoRef.current.isGrounded) {
        keysPressed.current.up = true;
        setTimeout(() => { keysPressed.current.up = false; }, 220);
      }
    },
    onSwipeUp: () => {
      if (leoRef.current.isGrounded) {
        keysPressed.current.up = true;
        setTimeout(() => { keysPressed.current.up = false; }, 220);
      }
    },
    onSwipeLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 360);
    },
    onSwipeRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 360);
    },
    onTapCenter: handleTriggerNearCog,
    enabled: phase === 'playing',
  });

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    leoRef.current = { x: 430, y: 240, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 40) });
    else if (onExit) onExit();
  };

  return (
    <div className="titan-forge-root" ref={containerRef}>
      {/* ── Always Accessible Floating Exit Button ─────────────────────── */}
      <FloatingExitBtn onExit={onExit} />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="titan-forge-banner">
        <Cog size={22} className="titan-banner-icon" />
        <div className="titan-sentence-box">
          <span className="titan-stem-text">{currentRound.stem}</span>
          <span className="titan-blank-highlight">[ ___ ? ___ ]</span>
        </div>
        <div className="titan-round-chip">Gear {roundIdx + 1} / {rounds.length}</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`titan-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Titan Chamber Viewport with Camera Tracking ──────────────── */}
      <div
        className="titan-forge-viewport"
        style={{
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Mobile touch gesture capture layer */}
        <div className="titan-gesture-layer" ref={gestureRef} />

        {/* Background Gigantic Rotating Gears */}
        <div className="background-titan-gears">
          <div className="giant-gear gear-left">⚙️</div>
          <div className="giant-gear gear-right">⚙️</div>
        </div>

        {/* Platforms */}
        {TITAN_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`titan-platform ${idx === 0 ? 'titan-ground' : idx === 2 ? 'titan-heart-deck' : 'titan-cog-deck'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* Steam Vent Hazard in Center Ground */}
        <div className={`steam-vent-entity ${steamActive ? 'vent-active' : ''}`} style={{ left: '425px', top: `${FLOOR_Y - 50}px` }}>
          {steamActive && <div className="steam-blast">💨 STEAM BLAST 💨</div>}
        </div>

        {/* 3 Gear Cogs */}
        {cogs.map(cog => (
          <div
            key={cog.id}
            className="titan-gear-entity"
            style={{ left: `${cog.x}px`, top: `${cog.y}px` }}
            onClick={() => activateCog(cog)}
          >
            {/* Clause Label Plaque */}
            <div className="titan-clause-plaque">
              <span>{cog.option.text}</span>
            </div>
            {/* Gear Cog Sprite */}
            <div className="titan-cog-icon-wrapper">
              <span className="cog-symbol">⚙️</span>
              <span className="cog-prompt">INSERT / TAP</span>
            </div>
          </div>
        ))}

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
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={5}
        doorLabel="Door 2 — Titan Grammar Forge"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="titan-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>TITAN ENGINE FORGED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, rounds.length * 40))}
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
        <div className="titan-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>TITAN ENGINE EXPLODED!</h2>
            <p>Steam pressure overloaded Leo's suit!</p>
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
