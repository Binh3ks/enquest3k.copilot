/**
 * CambridgeClozeGauntlet.jsx — Floor 5, Door 3 (Integration) Mini-Game for Lexio's Quest
 * GDD §2 Floor 5 Room C: "CAMBRIDGE CLOZE GAUNTLET"
 *
 * The Ultimate Finale Challenge of Lexio's Quest:
 * - Zenith Spire Pinnacle overlooking the cosmic aurora
 * - Extended Cambridge exam passage with 5 cloze blanks mounted on the Apex Spire Monument
 * - 10 Word Crystals scattered across ascending floating sky platforms
 * - Leo leaps across floating celestial platforms, carries word crystals overhead, and deposits them into the matching cloze blanks
 * - Patrolling Spectral Guardian (Astral Watcher)
 * - Restoring all 5 blanks triggers the Zenith Star Portal Ceremony, clearing the entire Lexio's Quest!
 * - Full Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Award, Trophy, RotateCcw, ArrowRight, Star, Sparkles, AlertTriangle, Crown } from 'lucide-react';
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
import './CambridgeClozeGauntlet.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Ascending floating celestial platforms
const GAUNTLET_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Spire Summit Base
  { x: 60,  y: 400,     width: 190,        height: 18 },  // Cloud Tier Left
  { x: 650, y: 400,     width: 190,        height: 18 },  // Cloud Tier Right
  { x: 180, y: 260,     width: 540,        height: 22 },  // Apex Monument Deck
  { x: 40,  y: 160,     width: 140,        height: 16 },  // Celestial Perch Left
  { x: 720, y: 160,     width: 140,        height: 16 },  // Celestial Perch Right
];

const DEFAULT_GAUNTLET_PASSAGE = {
  title: 'The Master Investigation of Corridors & Friction',
  fullText: 'During the science investigation, Jake noticed that wet tiles cause dangerous accidents because friction decreases rapidly. By wearing special rubber shoes, students gain strong grip and maintain perfect safety.',
  blanks: [
    { id: 'g0', word: 'investigation', slot: 0 },
    { id: 'g1', word: 'dangerous',     slot: 1 },
    { id: 'g2', word: 'friction',      slot: 2 },
    { id: 'g3', word: 'rubber',        slot: 3 },
    { id: 'g4', word: 'safety',        slot: 4 },
  ],
  distractors: ['eating', 'pleasant', 'sugar', 'paper', 'danger'],
};

export default function CambridgeClozeGauntlet({
  clozeData = DEFAULT_GAUNTLET_PASSAGE,
  duration = 120,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('cambridge_cloze_gauntlet') || 0;

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

  const blanks = clozeData.blanks || DEFAULT_GAUNTLET_PASSAGE.blanks;
  const distractors = clozeData.distractors || DEFAULT_GAUNTLET_PASSAGE.distractors;

  // 10 Crystals scattered
  const initialCrystals = useMemo(() => {
    const raw = [
      ...blanks.map(b => ({ id: `crys_${b.id}`, word: b.word, targetBlankId: b.id })),
      ...distractors.map((d, i) => ({ id: `crys_dist_${i}`, word: d, targetBlankId: null })),
    ];
    const coords = [
      { x: 95,  y: 370 }, // Mid Left shelf
      { x: 725, y: 370 }, // Mid Right shelf
      { x: 95,  y: 130 }, // Upper Left shelf
      { x: 725, y: 130 }, // Upper Right shelf
      { x: 350, y: 220 }, // Center Tier Left
      { x: 520, y: 220 }, // Center Tier Right
      { x: 80,  y: 485 }, // Ground Far Left
      { x: 240, y: 485 }, // Ground Mid Left
      { x: 640, y: 485 }, // Ground Mid Right
      { x: 780, y: 485 }, // Ground Far Right
    ];
    return raw.map((item, idx) => ({
      ...item,
      x: coords[idx % coords.length].x,
      y: coords[idx % coords.length].y,
      originX: coords[idx % coords.length].x,
      originY: coords[idx % coords.length].y,
      isPlaced: false,
    }));
  }, [blanks, distractors]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [placedBlanks, setPlacedBlanks] = useState({}); // { [blankId]: word }
  const [carryingCrystal, setCarryingCrystal] = useState(null);
  const [crystals, setCrystals] = useState(initialCrystals);
  const [feedback, setFeedback] = useState(null);

  // Leo physics
  const leoRef = useRef({
    x: 430,
    y: 480,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  // Astral Watcher patrolling apex
  const watcherRef = useRef({
    x: 200,
    y: 210,
    vx: 2.2,
    minX: 180,
    maxX: 720,
    dir: 1,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 480,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const [watcherDisplay, setWatcherDisplay] = useState(watcherRef.current);

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
  }, [carryingCrystal, crystals, placedBlanks]);

  // ── Interact: Pick up / Deposit Crystal into Monument ──────────────────
  const handleInteractAction = useCallback(() => {
    const leo = leoRef.current;
    if (phase !== 'playing') return;

    if (carryingCrystal) {
      // Monument blank slots on upper deck (y: 260, slots at x: 210, 310, 410, 510, 610)
      const slots = [
        { id: blanks[0]?.id || 'g0', x: 210, y: 235 },
        { id: blanks[1]?.id || 'g1', x: 310, y: 235 },
        { id: blanks[2]?.id || 'g2', x: 410, y: 235 },
        { id: blanks[3]?.id || 'g3', x: 510, y: 235 },
        { id: blanks[4]?.id || 'g4', x: 610, y: 235 },
      ];

      let matched = false;
      for (const slot of slots) {
        if (!placedBlanks[slot.id]) {
          const dist = Math.hypot((leo.x + 20) - (slot.x + 35), (leo.y + 24) - (slot.y + 15));
          if (dist < 65) {
            if (carryingCrystal.targetBlankId === slot.id) {
              // SUCCESS!
              setPlacedBlanks(prev => ({ ...prev, [slot.id]: carryingCrystal.word }));
              setScore(s => s + 45);
              speakText(carryingCrystal.word);
              setFeedback({ type: 'correct', text: `🌟 "${carryingCrystal.word}" Bound to Apex Monument!` });
              setTimeout(() => setFeedback(null), 1800);

              setCrystals(prev => prev.map(c => c.id === carryingCrystal.id ? { ...c, isPlaced: true } : c));
              setCarryingCrystal(null);
              matched = true;
              break;
            } else {
              // WRONG SLOT / DISTRACTOR
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setFeedback({ type: 'wrong', text: `⚡ "${carryingCrystal.word}" rejected by Zenith seal!` });
              setTimeout(() => setFeedback(null), 1800);
              setCrystals(prev => prev.map(c => c.id === carryingCrystal.id ? { ...c, x: c.originX, y: c.originY } : c));
              setCarryingCrystal(null);
              matched = true;
              break;
            }
          }
        }
      }

      if (!matched) {
        setCrystals(prev => prev.map(c => c.id === carryingCrystal.id ? { ...c, x: leo.x, y: leo.y } : c));
        setCarryingCrystal(null);
      }
      return;
    }

    // Pick up nearby crystal
    for (const c of crystals) {
      if (!c.isPlaced) {
        const dist = Math.hypot((leo.x + 20) - (c.x + 20), (leo.y + 24) - (c.y + 15));
        if (dist < 55) {
          setCarryingCrystal(c);
          speakText(c.word);
          break;
        }
      }
    }
  }, [carryingCrystal, crystals, placedBlanks, blanks, phase]);

  // Check victory
  useEffect(() => {
    const placedCount = Object.keys(placedBlanks).length;
    if (placedCount >= blanks.length && blanks.length > 0 && phase === 'playing') {
      setPhase('cleared');
      const finalScore = score + (timeLeft * 2) + 100;
      setScore(finalScore);
      recordPersonalBest('cambridge_cloze_gauntlet', finalScore);
      speakText('Zenith Star Portal opened! Lexio has conquered the Chronicles!');
    }
  }, [placedBlanks, blanks, phase, score, timeLeft, recordPersonalBest]);

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
        GAUNTLET_PLATFORMS,
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

      // Patrol Astral Watcher
      const watcher = watcherRef.current;
      watcher.x += watcher.vx * watcher.dir;
      if (watcher.x < watcher.minX) { watcher.x = watcher.minX; watcher.dir = 1; }
      if (watcher.x > watcher.maxX) { watcher.x = watcher.maxX; watcher.dir = -1; }
      setWatcherDisplay({ ...watcher });

      // Collision with Astral Watcher
      const nowMs = Date.now();
      if (nowMs > leo.invincibleUntil) {
        const distW = Math.hypot((leo.x + 20) - (watcher.x + 20), (leo.y + 24) - (watcher.y + 20));
        if (distW < 45) {
          leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
          setHearts(h => {
            const next = Math.max(0, h - 1);
            if (next === 0) setPhase('ko');
            return next;
          });
          setFeedback({ type: 'wrong', text: '🔮 Drained by Astral Watcher! (-1 Heart)' });
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

  // Camera follow Leo horizontally
  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  // Mobile gesture controls
  const { gestureRef } = useGestureControls({
    onTapLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 200);
    },
    onTapRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 200);
    },
    onDoubleTap: () => {
      if (leoRef.current.isGrounded) {
        keysPressed.current.up = true;
        setTimeout(() => { keysPressed.current.up = false; }, 200);
      }
    },
    onSwipeUp: () => {
      if (leoRef.current.isGrounded) {
        keysPressed.current.up = true;
        setTimeout(() => { keysPressed.current.up = false; }, 200);
      }
    },
    onSwipeLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 300);
    },
    onSwipeRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 300);
    },
    onTapCenter: handleInteractAction,
    enabled: phase === 'playing',
  });

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setPlacedBlanks({});
    setCarryingCrystal(null);
    setCrystals(initialCrystals);
    leoRef.current = { x: 430, y: 480, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: 3 });
    else if (onExit) onExit();
  };

  return (
    <div className="gauntlet-cloze-root" ref={containerRef}>
      {/* ── Always Accessible Floating Exit Button ─────────────────────── */}
      <FloatingExitBtn onExit={onExit} />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="gauntlet-objective-banner">
        <Crown size={22} className="gauntlet-banner-icon" />
        <div className="gauntlet-banner-info">
          <span className="gauntlet-title">{clozeData.title}</span>
          <span className="gauntlet-counter">
            Zenith Seals Restored: {Object.keys(placedBlanks).length} / {blanks.length}
          </span>
        </div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`gauntlet-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Pinnacle Viewport with Camera Tracking ───────────────────── */}
      <div
        className="gauntlet-viewport"
        style={{
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Mobile touch gesture capture layer */}
        <div className="gauntlet-gesture-layer" ref={gestureRef} />

        {/* Cosmic Aurora Background */}
        <div className="cosmic-aurora-glow" />

        {/* Platforms */}
        {GAUNTLET_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`gauntlet-platform ${idx === 0 ? 'pinnacle-base' : idx === 3 ? 'apex-monument-deck' : 'celestial-cloud'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* The Apex Monument with 5 Cloze Slots */}
        <div className="apex-monument-prop">
          <div className="monument-header">
            <Star size={16} /> <span>ZENITH STAR MONUMENT</span> <Star size={16} />
          </div>
          <div className="monument-cloze-grid">
            {blanks.map(b => {
              const isFilled = placedBlanks[b.id];
              return (
                <div
                  key={b.id}
                  className={`monument-slot ${isFilled ? 'slot-bound' : 'slot-vacant'}`}
                  onClick={handleInteractAction}
                >
                  {isFilled ? (
                    <span className="monument-bound-word">{placedBlanks[b.id]}</span>
                  ) : (
                    <span className="monument-vacant-tag">[{b.word ? '?' : `___`}]</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Word Crystals */}
        {crystals.map(c => {
          if (c.isPlaced || (carryingCrystal && carryingCrystal.id === c.id)) return null;
          return (
            <div
              key={c.id}
              className="zenith-crystal-entity"
              style={{ left: `${c.x}px`, top: `${c.y}px` }}
              onClick={handleInteractAction}
            >
              <span className="crystal-word-text">{c.word}</span>
            </div>
          );
        })}

        {/* Astral Watcher */}
        <div
          className="astral-watcher-sprite"
          style={{
            left: `${watcherDisplay.x}px`,
            top: `${watcherDisplay.y}px`,
            transform: watcherDisplay.dir < 0 ? 'scaleX(-1)' : 'none',
          }}
        >
          <span>🔮</span>
          <span className="watcher-tag">WATCHER</span>
        </div>

        {/* Leo Character */}
        <LeoCharacter
          x={leoDisplay.x}
          y={leoDisplay.y}
          state={leoDisplay.animState}
          facingRight={leoDisplay.facingRight}
          invincible={leoDisplay.invincible}
        />

        {/* Overhead Carrying Crystal */}
        {carryingCrystal && (
          <div
            className="overhead-crystal-badge"
            style={{ left: `${leoDisplay.x + 2}px`, top: `${leoDisplay.y - 28}px` }}
          >
            <span>✨ {carryingCrystal.word}</span>
          </div>
        )}
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={Object.keys(placedBlanks).length}
        totalWords={blanks.length}
        floorNumber={5}
        doorLabel="Door 3 — Cambridge Cloze Gauntlet"
      />


      {/* ── Cleared Modal (Grand Finale) ─────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="gauntlet-cleared-modal">
          <div className="cleared-card finale-card">
            <Crown size={56} className="crown-finale-icon" />
            <h2>CHRONICLES CONQUERED!</h2>
            <div className="cleared-stars">⭐⭐⭐</div>
            <p className="finale-blurb">
              Leo has restored balance to all 5 Floors of The Lexio Chronicles!
            </p>
            <p className="cleared-score">Final Score: <strong>{score} XP</strong></p>
            <button className="finish-door-btn finale-btn" onClick={handleFinalFinish}>
              Ascend to Hall of Fame <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout Modal ───────────────────────────────────────────── */}
      {phase === 'ko' && (
        <div className="gauntlet-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>ZENITH SEAL COLLAPSED!</h2>
            <p>The astral energy overwhelmed Leo's armor!</p>
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
