/**
 * PotionFlipDungeon.jsx — Floor 2, Door 1 (Vocab) Mini-Game for Lexio's Quest
 * GDD §2 Floor 2 Room A: "POTION FLIP DUNGEON"
 *
 * Replaces static 2D card flipping with physical platformer cauldron jumping:
 * - Alchemy Lab setting with cauldrons situated on stone platforms
 * - Leo physically jumps and lands on cauldrons to flip & reveal hidden cards
 * - Match word ↔ definition pairs by jumping between cauldrons
 * - Matching pair: emerald potion splash celebration + permanent unlock +25 XP
 * - Mismatch: poison gas puff + cauldrons flip back down after 1.5s
 * - Lab Gremlin patrol enemy
 * - Full Virtual D-Pad (mobile) + Arrow Keys / WASD (desktop) support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FlaskConical, Trophy, Timer, Sparkles, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import useGameScale from './useGameScale';
import './PotionFlipDungeon.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

const ALCHEMY_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Ground
  { x: 60,  y: 410,     width: 240,        height: 18 },  // Tier 1 Left
  { x: 340, y: 370,     width: 220,        height: 18 },  // Tier 1 Mid
  { x: 600, y: 410,     width: 240,        height: 18 },  // Tier 1 Right
  { x: 180, y: 240,     width: 200,        height: 18 },  // Tier 2 Left
  { x: 520, y: 240,     width: 200,        height: 18 },  // Tier 2 Right
];

const FALLBACK_PAIRS = [
  { id: 'p1', word: 'friction',   def: 'Resistance when surfaces rub' },
  { id: 'p2', word: 'laboratory', def: 'Room for science experiments' },
  { id: 'p3', word: 'traction',   def: 'Grip of shoes on the floor' },
  { id: 'p4', word: 'slippery',   def: 'Difficult to hold or walk on' },
];

export default function PotionFlipDungeon({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('potion_flip_dungeon') || 0;

  // Mobile scale: fit 900×600 game world into any phone viewport
  const { containerRef: gameContainerRef, scaleStyle, scale } = useGameScale(ROOM_WIDTH, ROOM_HEIGHT);

  // Build 4 pairs (8 cauldrons total)
  const cauldronsInitial = useMemo(() => {
    const valid = vocabItems.filter(v => v.word && v.definition);
    const pool = valid.length >= 4 ? valid : [...valid, ...FALLBACK_PAIRS];
    const selected = pool.slice(0, 4);

    const cards = [];
    selected.forEach((item, idx) => {
      cards.push({ id: `w_${idx}`, pairId: `pair_${idx}`, text: item.word, isWord: true });
      cards.push({ id: `d_${idx}`, pairId: `pair_${idx}`, text: item.definition || item.def, isWord: false });
    });

    // Positions across the platforms
    const slots = [
      { x: 100, y: 360 }, // on Tier 1 Left
      { x: 210, y: 360 },
      { x: 380, y: 320 }, // on Tier 1 Mid
      { x: 470, y: 320 },
      { x: 640, y: 360 }, // on Tier 1 Right
      { x: 740, y: 360 },
      { x: 220, y: 190 }, // on Tier 2 Left
      { x: 570, y: 190 }, // on Tier 2 Right
    ];

    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    return shuffledCards.map((c, i) => ({
      ...c,
      x: slots[i].x,
      y: slots[i].y,
      flipped: false,
      matched: false,
      cooldownUntil: 0,
    }));
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  // Cauldrons state
  const cauldronsRef = useRef(cauldronsInitial);
  const [cauldronsDisplay, setCauldronsDisplay] = useState(cauldronsInitial);
  const [activeCauldronId, setActiveCauldronId] = useState(null);

  // Leo Physics
  const leoRef = useRef({
    x: 80,
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
    x: 80, y: FLOOR_Y - LEO_HITBOX.height, animState: 'idle', facingRight: true, invincible: false
  });

  // Lab Gremlin enemy
  const gremlinRef = useRef({
    x: 420, y: FLOOR_Y - 45, vx: 1.6, minX: 180, maxX: 720
  });
  const [gremlinDisplay, setGremlinDisplay] = useState({ x: 420, y: FLOOR_Y - 45 });

  const inputRef = useRef({ left: false, right: false, jump: false });
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

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
          setPhase('cleared');
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
      const cauldrons = cauldronsRef.current;
      const gremlin = gremlinRef.current;
      const now = Date.now();

      // 1. Leo Horizontal Movement
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

      // 4. Update Position
      leo.x = clamp(leo.x + leo.vx, 0, ROOM_WIDTH - LEO_HITBOX.width);
      leo.y += leo.vy;

      // 5. Platforms Collision
      const landed = checkPlatformLanding(leo, ALCHEMY_PLATFORMS);
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

      // 7. Cauldron Landing Detection (Jump onto cauldron top)
      for (const c of cauldrons) {
        if (c.matched || c.flipped) continue;
        const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
        const cCenter = { x: c.x + 35, y: c.y + 30 };
        const dist = Math.hypot(leoCenter.x - cCenter.x, leoCenter.y - cCenter.y);

        if (dist < 42 && now > c.cooldownUntil) {
          handleCauldronFlip(c);
          c.cooldownUntil = now + 1200;
          break;
        }
      }

      // 8. Gremlin Enemy Collision
      if (!invincible) {
        const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
        const gremlinCenter = { x: gremlin.x + 20, y: gremlin.y + 20 };
        const dist = Math.hypot(leoCenter.x - gremlinCenter.x, leoCenter.y - gremlinCenter.y);

        if (dist < 36) {
          leo.hearts = Math.max(0, leo.hearts - 1);
          leo.invincibleUntil = now + INVINCIBILITY_MS;
          leo.animState = 'hit';
          setHearts(leo.hearts);
          if (leo.hearts <= 0) {
            setPhase('ko');
            return;
          }
        }
      }

      // Gremlin Patrol
      gremlin.x += gremlin.vx;
      if (gremlin.x <= gremlin.minX || gremlin.x >= gremlin.maxX) {
        gremlin.vx = -gremlin.vx;
      }

      // Sync display
      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setCauldronsDisplay([...cauldrons]);
      setGremlinDisplay({ x: gremlin.x, y: gremlin.y });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, activeCauldronId]);

  // Handle Cauldron Flip
  const handleCauldronFlip = (cauldron) => {
    cauldron.flipped = true;

    if (cauldron.isWord) {
      speakText(cauldron.text, null, 1.0, null, 'word', weekNumber);
    }

    if (!activeCauldronId) {
      // First cauldron of pair
      setActiveCauldronId(cauldron.id);
      setFeedback(`Revealed: "${cauldron.text}". Now jump to its match!`);
    } else {
      // Second cauldron of pair
      const firstCauldron = cauldronsRef.current.find(c => c.id === activeCauldronId);
      if (firstCauldron && firstCauldron.pairId === cauldron.pairId) {
        // MATCH!
        firstCauldron.matched = true;
        cauldron.matched = true;
        setActiveCauldronId(null);
        setScore(s => s + 25);
        setFeedback(`✨ POTION BREWED! Matched "${cauldron.text}" (+25 XP)`);

        // Check if all matched
        const allMatched = cauldronsRef.current.every(c => c.matched);
        if (allMatched) {
          setTimeout(() => setPhase('cleared'), 1200);
        }
      } else {
        // MISMATCH
        setFeedback('🧪 Poison gas! Cauldrons closing in 1.5s...');
        setTimeout(() => {
          if (firstCauldron) firstCauldron.flipped = false;
          cauldron.flipped = false;
          setActiveCauldronId(null);
          setFeedback(null);
        }, 1500);
      }
    }
  };

  const matchedCount = cauldronsDisplay.filter(c => c.matched).length / 2;

  const handleFinalFinish = () => {
    const stars = calculateStars(score, 100);
    recordPersonalBest('potion_flip_dungeon', score);
    onComplete?.(stars, score);
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    cauldronsRef.current.forEach(c => { c.flipped = false; c.matched = false; });
    setActiveCauldronId(null);
    setPhase('playing');
  };

  // D-Pad handlers
  const dpadHandlers = {
    onLeft: () => { inputRef.current.left = true; },
    onLeftRelease: () => { inputRef.current.left = false; },
    onRight: () => { inputRef.current.right = true; },
    onRightRelease: () => { inputRef.current.right = false; },
    onUp: () => { inputRef.current.jump = true; },
    onUpRelease: () => { inputRef.current.jump = false; },
    onDown: () => {},
    onDownRelease: () => {},
    onJump: () => { inputRef.current.jump = true; },
    onJumpRelease: () => { inputRef.current.jump = false; },
  };

  return (
    <div className="potion-flip-container" role="region" ref={gameContainerRef} aria-label="Potion Flip Dungeon">
      {/* ── Top Objective Banner ────────────────────────────────────── */}
      <div className="potion-mission-banner">
        <div className="potion-badge">
          <FlaskConical size={16} />
          <span>ALCHEMY LAB • {matchedCount}/4 POTIONS BREWED</span>
        </div>
        <div className="potion-hint-text">
          Jump on cauldrons to flip & match words with their definitions!
        </div>
        {feedback && (
          <div className="potion-feedback-toast">{feedback}</div>
        )}
      </div>

      {/* ── Game World ──────────────────────────────────────────────── */}
      <div className="potion-world-viewport" style={scale < 1 ? scaleStyle : undefined}>
        {/* Alchemy Ambient Background */}
        <div className="potion-bg-glow" />

        {/* Platforms */}
        {ALCHEMY_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`alchemy-platform ${idx === 0 ? 'platform-floor' : 'platform-stone'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* Cauldrons */}
        {cauldronsDisplay.map((c) => (
          <div
            key={c.id}
            className={`cauldron-entity ${c.flipped ? 'cauldron-flipped' : ''} ${c.matched ? 'cauldron-matched' : ''}`}
            style={{ left: `${c.x}px`, top: `${c.y}px` }}
            onClick={() => handleCauldronFlip(c)}
            role="button"
            tabIndex={0}
            aria-label={`Cauldron: ${c.flipped ? c.text : 'hidden'}`}
          >
            {/* Revealed Card Bubble */}
            {c.flipped && (
              <div className="cauldron-card-reveal">
                <span>{c.text}</span>
              </div>
            )}
            {/* Cauldron Sprite */}
            <div className="cauldron-pot">
              <span className="pot-icon">{c.matched ? '✨' : '⚗️'}</span>
              <div className="potion-bubbles-steam" />
            </div>
          </div>
        ))}

        {/* Lab Gremlin Enemy */}
        <div
          className="lab-gremlin-sprite"
          style={{ left: `${gremlinDisplay.x}px`, top: `${gremlinDisplay.y}px` }}
        >
          <span>🦎</span>
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
        wordsCollected={matchedCount}
        totalWords={4}
        floorNumber={2}
        doorLabel="Door 1 — Potion Flip Dungeon"
      />

      {/* ── Virtual D-Pad ────────────────────────────────────────────── */}
      <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="potion-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>ALCHEMY MASTER!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, 100))}
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
        <div className="potion-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>POISON OVERDOSE!</h2>
            <p>The Lab Gremlin knocked Leo into toxic brew!</p>
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
