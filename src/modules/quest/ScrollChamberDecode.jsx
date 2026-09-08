/**
 * ScrollChamberDecode.jsx — Floor 2, Door 3 (Integration) Mini-Game for Lexio's Quest
 * GDD §2 Floor 2 Room C: "SCROLL CHAMBER DECODE"
 *
 * Replaces static cloze tap-and-drop with physical Infiltration Platformer:
 * - Ancient archive library with hanging chandeliers emitting protective Light Beams
 * - Massive ancient scroll unrolled across upper tier with 4 cloze blanks
 * - 8 Word Rune Stones scattered across ground & high bookshelves
 * - Leo picks up a Rune Stone, carries it overhead, and jumps up to deposit it into the matching blank
 * - Patrolling Curse Wraiths; Leo is IMMUNE while standing inside Chandelier Light Beams
 * - Correct placement: Rune binds with golden aura, TTS speaks sentence fragment
 * - Wrong placement: Stone drops back to origin, -1 Heart
 * - Virtual D-Pad (mobile) + Arrow Keys / WASD + Spacebar (drop/interact)
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Scroll, BookOpen, Sparkles, Trophy, RotateCcw, ArrowRight, Sun, Shield, AlertTriangle } from 'lucide-react';
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
import './ScrollChamberDecode.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// High library shelves & platforms
const LIBRARY_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Ground
  { x: 60,  y: 380,     width: 190,        height: 18 },  // Lower Shelf Left
  { x: 650, y: 380,     width: 190,        height: 18 },  // Lower Shelf Right
  { x: 200, y: 240,     width: 500,        height: 22 },  // Upper Scroll Altar Deck
  { x: 40,  y: 160,     width: 140,        height: 16 },  // Secret Attic Left
  { x: 720, y: 160,     width: 140,        height: 16 },  // Secret Attic Right
];

// Protective Chandelier Light Beams (Leo is safe from wraiths inside [x, x + width])
const LIGHT_BEAMS = [
  { id: 'beam_left',  x: 100, width: 110, top: 0, height: 480 },
  { id: 'beam_mid',   x: 400, width: 100, top: 0, height: 350 },
  { id: 'beam_right', x: 690, width: 110, top: 0, height: 480 },
];

const DEFAULT_SCROLL_DATA = {
  title: 'The Principles of Friction & Safety',
  fullSentence: 'Rubber shoes create strong friction to prevent dangerous slips on wet corridor floors.',
  blanks: [
    { id: 'b0', word: 'Rubber',   slotIndex: 0 },
    { id: 'b1', word: 'friction', slotIndex: 1 },
    { id: 'b2', word: 'prevent',  slotIndex: 2 },
    { id: 'b3', word: 'slips',    slotIndex: 3 },
  ],
  distractors: ['Smooth', 'ice', 'cause', 'falls'],
};

export default function ScrollChamberDecode({
  scrollData = DEFAULT_SCROLL_DATA,
  duration = 100,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('scroll_chamber_decode') || 0;
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

  // Blanks & word runes
  const targets = scrollData.blanks || DEFAULT_SCROLL_DATA.blanks;
  const distractors = scrollData.distractors || DEFAULT_SCROLL_DATA.distractors;

  // Prepare 8 stones
  const initialStones = useMemo(() => {
    const raw = [
      ...targets.map(t => ({ id: `stone_${t.id}`, word: t.word, targetBlankId: t.id })),
      ...distractors.map((d, i) => ({ id: `stone_dist_${i}`, word: d, targetBlankId: null })),
    ];
    // Preset spawn coordinates across shelves & floor (well-spaced, 1 per shelf to avoid overlap)
    const coords = [
      { x: 95,  y: 350 }, // Lower Left shelf
      { x: 725, y: 350 }, // Lower Right shelf
      { x: 95,  y: 130 }, // Upper Left shelf
      { x: 725, y: 130 }, // Upper Right shelf
      { x: 80,  y: 485 }, // Ground Far Left
      { x: 260, y: 485 }, // Ground Mid Left
      { x: 580, y: 485 }, // Ground Mid Right
      { x: 760, y: 485 }, // Ground Far Right
    ];
    return raw.map((item, idx) => ({
      ...item,
      x: coords[idx % coords.length].x,
      y: coords[idx % coords.length].y,
      originX: coords[idx % coords.length].x,
      originY: coords[idx % coords.length].y,
      isPlaced: false,
    }));
  }, [targets, distractors]);

  // Game state
  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [placedBlanks, setPlacedBlanks] = useState({}); // { [blankId]: word }
  const [carryingStone, setCarryingStone] = useState(null); // stone object currently carried
  const [stones, setStones] = useState(initialStones);
  const [feedback, setFeedback] = useState(null);

  // Leo physics state
  const leoRef = useRef({
    x: 430,
    y: 480,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  // Curse Wraiths (2 enemies patrolling)
  const wraithsRef = useRef([
    { id: 'wraith_1', x: 120, y: 475, vx: 1.8, minX: 40,  maxX: 360, dir: 1 },
    { id: 'wraith_2', x: 550, y: 475, vx: 2.2, minX: 480, maxX: 850, dir: -1 },
  ]);

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 480,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });
  const [wraithsDisplay, setWraithsDisplay] = useState(wraithsRef.current);
  const [isInLight, setIsInLight] = useState(false);

  const keysPressed = useRef({ left: false, right: false, up: false, down: false, interact: false });
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
        handleInteractAction();
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
  }, [carryingStone, stones, placedBlanks]);

  // ── Interact Action (Pick up stone / Drop into blank) ───────────────────
  const handleInteractAction = useCallback(() => {
    const leo = leoRef.current;
    if (phase !== 'playing') return;

    // If carrying a stone, check if near Scroll Blanks on upper altar deck (y between 200 and 260)
    if (carryingStone) {
      // Scroll Altar blanks positions on deck (deck y: 240, blanks around x: 230, 350, 470, 590)
      const blankSlots = [
        { id: targets[0]?.id || 'b0', x: 240, y: 215 },
        { id: targets[1]?.id || 'b1', x: 360, y: 215 },
        { id: targets[2]?.id || 'b2', x: 480, y: 215 },
        { id: targets[3]?.id || 'b3', x: 600, y: 215 },
      ];

      // Find if Leo is within proximity of any empty blank
      let placedMatch = false;
      for (const slot of blankSlots) {
        if (!placedBlanks[slot.id]) {
          const dist = Math.hypot((leo.x + 20) - (slot.x + 30), (leo.y + 24) - (slot.y + 15));
          if (dist < 65) {
            // Check if stone belongs here
            if (carryingStone.targetBlankId === slot.id) {
              // SUCCESS!
              setPlacedBlanks(prev => ({ ...prev, [slot.id]: carryingStone.word }));
              setScore(prev => prev + 40);
              speakText(carryingStone.word);
              setFeedback({ type: 'correct', text: `✨ "${carryingStone.word}" Bound to Scroll!` });
              setTimeout(() => setFeedback(null), 1800);

              // Mark stone as placed
              setStones(prev => prev.map(s => s.id === carryingStone.id ? { ...s, isPlaced: true } : s));
              setCarryingStone(null);
              placedMatch = true;
              break;
            } else {
              // WRONG SLOT / DISTRACTOR
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setFeedback({ type: 'wrong', text: `⚡ "${carryingStone.word}" rejected by ancient seal!` });
              setTimeout(() => setFeedback(null), 1800);
              // Return stone to origin
              setStones(prev => prev.map(s => s.id === carryingStone.id ? { ...s, x: s.originX, y: s.originY } : s));
              setCarryingStone(null);
              placedMatch = true;
              break;
            }
          }
        }
      }

      // If dropped in open air (not at blank slot), put down at current position
      if (!placedMatch) {
        setStones(prev => prev.map(s => s.id === carryingStone.id ? { ...s, x: leo.x, y: leo.y } : s));
        setCarryingStone(null);
      }
      return;
    }

    // If NOT carrying: check if near an unplaced stone to pick up
    for (const st of stones) {
      if (!st.isPlaced) {
        const dist = Math.hypot((leo.x + 20) - (st.x + 20), (leo.y + 24) - (st.y + 15));
        if (dist < 55) {
          setCarryingStone(st);
          speakText(st.word);
          break;
        }
      }
    }
  }, [carryingStone, stones, placedBlanks, targets, phase]);

  // Check victory condition
  useEffect(() => {
    const placedCount = Object.keys(placedBlanks).length;
    if (placedCount >= targets.length && targets.length > 0 && phase === 'playing') {
      setPhase('cleared');
      const finalScore = score + (timeLeft * 2) + 50;
      setScore(finalScore);
      recordPersonalBest('scroll_chamber_decode', finalScore);
      speakText(scrollData.fullSentence || 'Ancient scroll successfully decoded!');
    }
  }, [placedBlanks, targets, phase, score, timeLeft, recordPersonalBest, scrollData]);

  // ── Game Physics Loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

      // Horizontal velocity
      if (keys.left) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (keys.right) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx *= 0.8;
      }

      // Jump
      if (keys.up && leo.isGrounded) {
        leo.vy = LEO_JUMP_FORCE;
        leo.isGrounded = false;
      }

      // Gravity
      applyGravity(leo);

      // Move Leo (per-frame movement)
      leo.x = clamp(leo.x + leo.vx, 10, ROOM_WIDTH - LEO_HITBOX.width - 10);
      leo.y += leo.vy;

      // Check Platform Collisions
      const prevY = leo.y - leo.vy;
      const landing = checkPlatformLanding(
        { x: leo.x, y: leo.y, width: LEO_HITBOX.width, height: LEO_HITBOX.height, vy: leo.vy },
        LIBRARY_PLATFORMS,
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

      // Check if Leo is inside Chandelier Light Beam
      const inLight = LIGHT_BEAMS.some(beam =>
        leo.x + 20 >= beam.x && leo.x + 20 <= beam.x + beam.width &&
        leo.y + 24 >= beam.top && leo.y + 24 <= beam.top + beam.height
      );
      setIsInLight(inLight);

      // Patrol Wraiths & Damage Collision
      const nowMs = Date.now();
      const updatedWraiths = wraithsRef.current.map(wr => {
        let nx = wr.x + wr.vx * wr.dir;
        let ndir = wr.dir;
        if (nx < wr.minX) { nx = wr.minX; ndir = 1; }
        if (nx > wr.maxX) { nx = wr.maxX; ndir = -1; }

        // Check collision with Leo (only if Leo is NOT in light beam and NOT invincible)
        if (!inLight && nowMs > leo.invincibleUntil) {
          const dist = Math.hypot((leo.x + 20) - (nx + 20), (leo.y + 24) - (wr.y + 20));
          if (dist < 42) {
            // Hit by Wraith!
            leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
            setHearts(h => {
              const next = Math.max(0, h - 1);
              if (next === 0) setPhase('ko');
              return next;
            });
            setFeedback({ type: 'wrong', text: '👻 Cursed by Shadow Wraith! (-1 Heart)' });
            setTimeout(() => setFeedback(null), 1500);
          }
        }
        return { ...wr, x: nx, dir: ndir };
      });
      wraithsRef.current = updatedWraiths;
      setWraithsDisplay([...updatedWraiths]);

      // Determine animation state
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

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [phase]);

  // ── Timer Loop ─────────────────────────────────────────────────────────
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

  // Gesture Controls for ScrollChamberDecode — Continuous holding movement + jump + interact
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
    onTapCenter: handleInteractAction,
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
    setTimeLeft(duration);
    setPlacedBlanks({});
    setCarryingStone(null);
    setStones(initialStones);
    leoRef.current = { x: 430, y: 480, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, targets.length * 40) });
    else if (onExit) onExit();
  };

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="scroll-chamber-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="scroll-gesture-layer" />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="scroll-objective-banner">
        <BookOpen size={20} className="scroll-banner-icon" />
        <div className="scroll-banner-info">
          <span className="scroll-title">{scrollData.title}</span>
          <span className="scroll-counter">
            Blanks Restored: {Object.keys(placedBlanks).length} / {targets.length}
          </span>
        </div>
        {isInLight && (
          <div className="light-shield-badge">
            <Sun size={14} /> Light Shield Active
          </div>
        )}
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`scroll-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Main Chamber Canvas with smooth Camera follow ────────────── */}
      <div
        className="scroll-chamber-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Light Beams from Chandeliers */}
        {LIGHT_BEAMS.map(b => (
          <div
            key={b.id}
            className="light-beam-overlay"
            style={{ left: `${b.x}px`, width: `${b.width}px`, height: `${b.height}px` }}
          >
            <div className="chandelier-lamp">🏮</div>
          </div>
        ))}

        {/* Library Shelves Platforms */}
        {LIBRARY_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`library-platform ${idx === 0 ? 'library-floor' : idx === 3 ? 'scroll-deck' : 'bookshelf'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* The Ancient Scroll on Upper Deck */}
        <div className="ancient-scroll-prop">
          <div className="scroll-ribbon-header">
            <Scroll size={18} /> <span>SACRED ARCHIVE SCROLL</span>
          </div>
          <div className="scroll-cloze-line">
            {targets.map((tgt, i) => {
              const isFilled = placedBlanks[tgt.id];
              return (
                <div
                  key={tgt.id}
                  className={`scroll-blank-slot ${isFilled ? 'slot-filled' : 'slot-empty'}`}
                  onClick={handleInteractAction}
                >
                  {isFilled ? (
                    <span className="placed-word">{placedBlanks[tgt.id]}</span>
                  ) : (
                    <span className="blank-placeholder">[{tgt.word ? '?' : `___`}]</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Word Stones Scattered */}
        {stones.map(st => {
          if (st.isPlaced || (carryingStone && carryingStone.id === st.id)) return null;
          return (
            <div
              key={st.id}
              className="rune-stone-entity"
              style={{ left: `${st.x}px`, top: `${st.y}px` }}
              onClick={handleInteractAction}
            >
              <span className="rune-stone-word">{st.word}</span>
            </div>
          );
        })}

        {/* Curse Wraiths */}
        {wraithsDisplay.map(wr => (
          <div
            key={wr.id}
            className="curse-wraith-sprite"
            style={{
              left: `${wr.x}px`,
              top: `${wr.y}px`,
              transform: wr.dir < 0 ? 'scaleX(-1)' : 'none',
            }}
          >
            <span className="wraith-emoji">👻</span>
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

        {/* Overhead Carrying Word Badge */}
        {carryingStone && (
          <div
            className="overhead-stone-badge"
            style={{ left: `${leoDisplay.x + 2}px`, top: `${leoDisplay.y - 28}px` }}
          >
            <span>📜 {carryingStone.word}</span>
          </div>
        )}
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={Object.keys(placedBlanks).length}
        totalWords={targets.length}
        floorNumber={2}
        doorLabel="Door 3 — Scroll Chamber Decode"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="scroll-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>ANCIENT SCROLL RESTORED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, targets.length * 40))}
            </div>
            <p className="cleared-full-text">"{scrollData.fullSentence}"</p>
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
        <div className="scroll-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>LOST TO THE SHADOWS!</h2>
            <p>Curse wraiths drained Leo's knowledge energy!</p>
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
