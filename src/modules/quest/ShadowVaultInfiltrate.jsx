/**
 * ShadowVaultInfiltrate.jsx — Floor 1, Door 3 (Integration) Mini-Game for Lexio's Quest
 * GDD §2 Floor 1 Room C: "SHADOW VAULT INFILTRATE"
 *
 * Replaces static Odd-One-Out with a stealth heist & matching platformer:
 * - High-security dark vault with Left Safes (Words) & Right Safes (Definitions)
 * - Leo touches a left safe to unlock it and pick up/carry the word
 * - Leo must cross the vault avoiding 2 patrolling Shadow Guard robots with laser searchlights
 * - Touch the matching definition safe on the right to complete the pair (+30 XP + Coin burst!)
 * - Getting hit by Shadow Guard while carrying cargo causes Leo to drop the word!
 * - Match all 4 pairs to crack the master vault!
 * - Full Virtual D-Pad (mobile) + Arrow Keys / WASD (desktop) support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, Timer, ShieldAlert, Key, Unlock, ArrowRight, RotateCcw, AlertOctagon } from 'lucide-react';
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
import './ShadowVaultInfiltrate.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Vault Multi-Tier Platforms
const VAULT_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Ground
  // Left side safe platforms
  { x: 30,  y: 430,     width: 170,        height: 16 },  // Safe L1
  { x: 30,  y: 310,     width: 170,        height: 16 },  // Safe L2
  { x: 30,  y: 190,     width: 170,        height: 16 },  // Safe L3
  { x: 190, y: 360,     width: 130,        height: 16 },  // Safe L4 ledge
  // Mid crossing platform
  { x: 370, y: 280,     width: 160,        height: 16 },  // Mid suspended bridge
  // Right side safe platforms
  { x: 700, y: 430,     width: 170,        height: 16 },  // Safe R1
  { x: 700, y: 310,     width: 170,        height: 16 },  // Safe R2
  { x: 700, y: 190,     width: 170,        height: 16 },  // Safe R3
  { x: 580, y: 360,     width: 130,        height: 16 },  // Safe R4 ledge
];

const FALLBACK_PAIRS = [
  { id: 'p1', word: 'friction',   definition: 'Resistance when two surfaces rub together' },
  { id: 'p2', word: 'laboratory', definition: 'A room equipped for scientific experiments' },
  { id: 'p3', word: 'traction',   definition: 'The grip between shoes and the floor' },
  { id: 'p4', word: 'slippery',   definition: 'Hard to walk on because wet or smooth' },
];

export default function ShadowVaultInfiltrate({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('shadow_vault_infiltrate') || 0;
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

  // Build 4 matching pairs
  const pairs = useMemo(() => {
    const valid = vocabItems.filter(v => v.word && v.definition && v.type !== 'grammar' && !v.sentence && !v.definition.startsWith('Related to'));
    const pool = valid.length >= 4 ? valid : [...valid, ...FALLBACK_PAIRS];
    return pool.slice(0, 4).map((item, idx) => ({
      id: `pair_${idx}`,
      word: item.word,
      definition: item.definition,
    }));
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [carryingWord, setCarryingWord] = useState(null); // null or pair object
  const [solvedPairIds, setSolvedPairIds] = useState(new Set());
  const [vaultFeedback, setVaultFeedback] = useState(null);

  // Left & Right Safes Layout
  const leftSafes = useMemo(() => {
    const slots = [
      { x: 45, y: 370 },
      { x: 45, y: 250 },
      { x: 45, y: 130 },
      { x: 205, y: 300 },
    ];
    return pairs.map((pair, idx) => ({
      ...pair,
      x: slots[idx].x,
      y: slots[idx].y,
    }));
  }, [pairs]);

  const rightSafes = useMemo(() => {
    const slots = [
      { x: 715, y: 370 },
      { x: 715, y: 250 },
      { x: 715, y: 130 },
      { x: 595, y: 300 },
    ];
    // Scramble right side order so it's a puzzle
    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    return shuffled.map((pair, idx) => ({
      ...pair,
      x: slots[idx].x,
      y: slots[idx].y,
    }));
  }, [pairs]);

  // Leo Physics
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

  // Shadow Guards (Robotic patrol with laser searchlights)
  const guardsRef = useRef([
    { id: 'guard_ground', x: 340, y: FLOOR_Y - 55, vx: 1.8, minX: 240, maxX: 660, laserDir: 1 },
    { id: 'guard_mid',    x: 480, y: 225,          vx: -1.5, minX: 360, maxX: 540, laserDir: -1 },
  ]);
  const [guardsDisplay, setGuardsDisplay] = useState([]);

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
      const guards = guardsRef.current;
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
      const landed = checkPlatformLanding(leo, VAULT_PLATFORMS);
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

      // 7. Shadow Guards Patrol & Collision
      for (const guard of guards) {
        guard.x += guard.vx;
        if (guard.x <= guard.minX || guard.x >= guard.maxX) {
          guard.vx = -guard.vx;
        }

        // Collision with Leo (Body or Laser Searchlight)
        if (!invincible) {
          const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
          const guardCenter = { x: guard.x + 25, y: guard.y + 25 };
          const dist = Math.hypot(leoCenter.x - guardCenter.x, leoCenter.y - guardCenter.y);

          if (dist < 42) {
            // Guard detected Leo!
            leo.hearts = Math.max(0, leo.hearts - 1);
            leo.invincibleUntil = now + INVINCIBILITY_MS;
            leo.animState = 'hit';
            setHearts(leo.hearts);

            // Drop cargo if carrying!
            if (carryingWord) {
              setCarryingWord(null);
              setVaultFeedback('🚨 SPOTTED! Cargo dropped back to vault safe!');
              setTimeout(() => setVaultFeedback(null), 2500);
            }

            if (leo.hearts <= 0) {
              setPhase('ko');
              return;
            }
          }
        }
      }

      // 8. Safe Proximity Checks
      checkSafeInteractions(leo);

      // Sync display state
      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setGuardsDisplay([...guards]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, carryingWord, solvedPairIds]);

  // Check Safe Interactions
  const checkSafeInteractions = (leo) => {
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };

    // Check Left Safes (Pick Up Word)
    if (!carryingWord) {
      for (const safe of leftSafes) {
        if (solvedPairIds.has(safe.id)) continue;
        const dist = Math.hypot(leoCenter.x - (safe.x + 40), leoCenter.y - (safe.y + 25));
        if (dist < 55) {
          // Pick up this word!
          setCarryingWord(safe);
          speakText(safe.word, null, 1.0, null, 'word', weekNumber);
          setVaultFeedback(`💎 Carrying: "${safe.word}". Cross to the right safe!`);
          break;
        }
      }
    }

    // Check Right Safes (Deliver Cargo)
    if (carryingWord) {
      for (const safe of rightSafes) {
        if (solvedPairIds.has(safe.id)) continue;
        const dist = Math.hypot(leoCenter.x - (safe.x + 50), leoCenter.y - (safe.y + 25));
        if (dist < 55) {
          handleDeliverAttempt(safe);
          break;
        }
      }
    }
  };

  // Deliver Attempt on Right Safe
  const handleDeliverAttempt = (rightSafe) => {
    if (!carryingWord) return;

    if (rightSafe.id === carryingWord.id) {
      // MATCH!
      const newSolved = new Set(solvedPairIds);
      newSolved.add(rightSafe.id);
      setSolvedPairIds(newSolved);
      setScore(s => s + 30);
      setCarryingWord(null);
      setVaultFeedback(`🔓 VAULT UNLOCKED! "${rightSafe.word}" correctly matched! (+30 XP)`);
      setTimeout(() => setVaultFeedback(null), 2500);

      if (newSolved.size >= pairs.length) {
        // All vaults cracked!
        setTimeout(() => setPhase('cleared'), 1000);
      }
    } else {
      // Wrong safe!
      setVaultFeedback(`❌ Wrong Definition Safe! Look carefully!`);
      // Alert guards
      guardsRef.current.forEach(g => {
        g.vx = g.vx * 1.5;
      });
      setTimeout(() => {
        guardsRef.current.forEach(g => {
          g.vx = g.vx / 1.5;
        });
        setVaultFeedback(null);
      }, 3000);
    }
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, pairs.length * 30);
    recordPersonalBest('shadow_vault_infiltrate', score);
    onComplete?.(stars, score);
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setCarryingWord(null);
    setSolvedPairIds(new Set());
    setTimeLeft(duration);
    setPhase('playing');
  };

  // Gesture Controls for ShadowVaultInfiltrate — Continuous holding movement + jump
  const { gestureRef } = useGestureControls({
    onMoveLeftStart: () => { inputRef.current.left = true; },
    onMoveLeftEnd:   () => { inputRef.current.left = false; },
    onMoveRightStart: () => { inputRef.current.right = true; },
    onMoveRightEnd:   () => { inputRef.current.right = false; },
    onTapLeft: () => {
      inputRef.current.left = true;
      setTimeout(() => { inputRef.current.left = false; }, 260);
    },
    onTapRight: () => {
      inputRef.current.right = true;
      setTimeout(() => { inputRef.current.right = false; }, 260);
    },
    onDoubleTap: () => {
      inputRef.current.jump = true;
      setTimeout(() => { inputRef.current.jump = false; }, 220);
    },
    onSwipeUp: () => {
      inputRef.current.jump = true;
      setTimeout(() => { inputRef.current.jump = false; }, 220);
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
    <div className="shadow-vault-container" role="region" ref={containerRef} aria-label="Shadow Vault Infiltrate">
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="vault-gesture-layer" />

      {/* ── Top Objective Banner ────────────────────────────────────── */}
      <div className="vault-mission-banner">
        <div className="vault-badge">
          <ShieldAlert size={16} />
          <span>VAULT INFILTRATION • {solvedPairIds.size}/{pairs.length} CRACKED</span>
        </div>

        <div className="vault-status-text">
          {carryingWord ? (
            <div className="carrying-cargo-box">
              <Key size={16} className="key-icon" />
              <span>Carrying: <strong>{carryingWord.word}</strong></span>
              <span className="cargo-arrow">➔</span>
              <span>Find definition on the RIGHT!</span>
            </div>
          ) : (
            <div className="retrieve-cargo-box">
              <span>Touch an unsolved safe on the <strong>LEFT</strong> to grab a word!</span>
            </div>
          )}
        </div>

        {vaultFeedback && (
          <div className="vault-feedback-alert">{vaultFeedback}</div>
        )}
      </div>

      {/* ── Game World (Canvas/DOM Viewport with smooth Camera follow) ─ */}
      <div
        className="vault-world-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Atmospheric Vault Background */}
        <div className="vault-bg-grid" />

        {/* Platforms */}
        {VAULT_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`vault-platform ${idx === 0 ? 'vault-floor' : 'vault-ledge'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* Left Safes (Words) */}
        {leftSafes.map((safe) => {
          const isSolved = solvedPairIds.has(safe.id);
          const isSelected = carryingWord?.id === safe.id;

          return (
            <div
              key={`left_${safe.id}`}
              className={`vault-safe safe-left ${isSolved ? 'safe-solved' : ''} ${isSelected ? 'safe-selected' : ''}`}
              style={{ left: `${safe.x}px`, top: `${safe.y}px` }}
              onClick={() => {
                if (!isSolved && !carryingWord) {
                  setCarryingWord(safe);
                  speakText(safe.word, null, 1.0, null, 'word', weekNumber);
                }
              }}
            >
              <div className="safe-door-frame">
                <span className="safe-icon">{isSolved ? '🔓' : isSelected ? '💎' : '🔒'}</span>
                <span className="safe-word-label">{safe.word}</span>
              </div>
            </div>
          );
        })}

        {/* Right Safes (Definitions) */}
        {rightSafes.map((safe) => {
          const isSolved = solvedPairIds.has(safe.id);

          return (
            <div
              key={`right_${safe.id}`}
              className={`vault-safe safe-right ${isSolved ? 'safe-solved' : ''}`}
              style={{ left: `${safe.x}px`, top: `${safe.y}px` }}
              onClick={() => handleDeliverAttempt(safe)}
            >
              <div className="safe-door-frame right-frame">
                <span className="safe-icon">{isSolved ? '✅' : '📦'}</span>
                <span className="safe-def-label">{safe.definition}</span>
              </div>
            </div>
          );
        })}

        {/* Shadow Guards (Robots with searchlights) */}
        {guardsDisplay.map((guard) => (
          <div
            key={guard.id}
            className="shadow-guard-entity"
            style={{ left: `${guard.x}px`, top: `${guard.y}px` }}
          >
            <div className="guard-laser-beam" style={{ transform: `scaleX(${guard.vx > 0 ? 1 : -1})` }} />
            <div className="guard-robot-sprite">🤖</div>
          </div>
        ))}

        {/* Floating Cargo Badge above Leo if carrying */}
        {carryingWord && (
          <div
            className="leo-floating-cargo"
            style={{ left: `${leoDisplay.x + 2}px`, top: `${leoDisplay.y - 28}px` }}
          >
            💎 {carryingWord.word}
          </div>
        )}

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
        wordsCollected={solvedPairIds.size}
        totalWords={pairs.length}
        floorNumber={1}
        doorLabel="Door 3 — Shadow Vault Infiltrate"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="vault-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>VAULT MASTER CRACKED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, pairs.length * 30))}
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
        <div className="vault-ko-modal">
          <div className="ko-card">
            <AlertOctagon size={48} className="ko-icon" />
            <h2>INTRUDER CAPTURED!</h2>
            <p>The Shadow Guards locked down the vault!</p>
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
