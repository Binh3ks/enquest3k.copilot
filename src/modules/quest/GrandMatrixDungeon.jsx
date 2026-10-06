/**
 * GrandMatrixDungeon.jsx — Floor 5, Door 1 (Vocab) Mini-Game for Lexio's Quest
 * GDD §2 Floor 5 Room A: "GRAND MATRIX DUNGEON"
 *
 * Replaces static grid tapping with Dimensional Matrix Platformer:
 * - Celestial Matrix Arena at the summit of Apex Spire
 * - 180s Duration (Sprint 0 Bug B2 fix strictly preserved!)
 * - Floating matrix grid platforms with glowing Coordinate Nodes
 * - Target definition displayed on celestial HUD
 * - Target word glyphs floating above nodes alongside Glitch Sentinels
 * - Leo leaps across matrix nodes, harvesting target glyphs
 * - Harvesting target: Cosmic chime, +35 XP, TTS audio speaks word!
 * - Touching Glitch anomaly: -1 Heart, Leo flickers invincible
 * - Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Grid, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, Shield, HelpCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import { CURRICULUM_DEFINITIONS } from './MCQBlitzPopup';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import GameInstructionModal from '../chronicles/games/GameInstructionModal';
import useGestureControls from './useGestureControls';
import './GrandMatrixDungeon.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Matrix Node Platforms (3 tiers x 3 columns)
const MATRIX_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Base Grid Floor
  { x: 80,  y: 430,     width: 180,        height: 18 },  // Node (0, 0)
  { x: 360, y: 430,     width: 180,        height: 18 },  // Node (1, 0)
  { x: 640, y: 430,     width: 180,        height: 18 },  // Node (2, 0)
  { x: 180, y: 280,     width: 220,        height: 18 },  // Upper Node Left
  { x: 500, y: 280,     width: 220,        height: 18 },  // Upper Node Right
  { x: 340, y: 160,     width: 220,        height: 18 },  // Pinnacle Apex Platform
];

const DEFAULT_MATRIX_ROUNDS = [
  {
    targetWord: 'corridor',
    definition: 'a long passage in a building with doors on each side',
    distractors: ['stairs', 'cafeteria', 'playground'],
  },
  {
    targetWord: 'slipped',
    definition: 'slid accidentally on a wet surface and lost balance',
    distractors: ['jumped', 'walked', 'stopped'],
  },
  {
    targetWord: 'bandage',
    definition: 'a strip of material used to bind a wound or cut',
    distractors: ['cold pack', 'first-aid kit', 'puddle'],
  },
  {
    targetWord: 'nurse',
    definition: 'a person trained to care for sick or injured people',
    distractors: ['headmaster', 'teacher', 'doctor'],
  },
];

export default function GrandMatrixDungeon({
  vocabItems = [],
  duration = 180, // Sprint 0 Bug B2 fix: 180s preserved
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('grand_matrix_dungeon') || 0;

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
    // Phương án B: Ưu tiên 100% từ vựng cốt lõi thuần Cambridge từ vocab.js (định nghĩa viết thường nhất quán)
    const candidateRounds = [];
    const pool = Array.isArray(vocabItems) ? vocabItems : [];

    for (const v of pool) {
      if (!v) continue;
      const rawWord = typeof v === 'string' ? v : (v.word || v.term || v.text || '');
      const cleanWord = rawWord.trim().replace(/_/g, ' ');
      // Must be a valid single word or short term (<= 2 words, not long phrases)
      if (!cleanWord || cleanWord.split(/\s+/).length > 2 || cleanWord.length < 3) continue;

      let def = '';
      const isCoreVocab = Boolean(v.definition_en || v.audio_word);
      if (typeof v === 'object' && v.definition_en && typeof v.definition_en === 'string') {
        def = v.definition_en.trim();
      } else if (typeof v === 'object' && v.definition && typeof v.definition === 'string') {
        def = v.definition.trim();
      }

      // Check if definition is genuine (non-generic, non-Vietnamese, non-fallback)
      if (def && def.length > 5 && !def.startsWith('Related to') && !/[\u00C0-\u1EF9]/.test(def) && def !== 'A fundamental physical concept') {
        // Enforce consistent lowercase start for definition (Cambridge style)
        const normalizedDef = def.charAt(0).toLowerCase() + def.slice(1);
        candidateRounds.push({
          targetWord: cleanWord,
          definition: normalizedDef,
          isCoreVocab
        });
      }
    }

    // Sort to prioritize core vocab items from vocab.js
    candidateRounds.sort((a, b) => (b.isCoreVocab ? 1 : 0) - (a.isCoreVocab ? 1 : 0));

    // Dedup by lowercased targetWord
    const uniqueRounds = [];
    const seen = new Set();
    for (const r of candidateRounds) {
      const key = r.targetWord.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueRounds.push(r);
      }
    }

    // If fewer than 4 valid rounds, supplement with DEFAULT_MATRIX_ROUNDS (also lowercase)
    const finalTargets = [...uniqueRounds];
    for (const d of DEFAULT_MATRIX_ROUNDS) {
      if (finalTargets.length >= 4) break;
      if (!seen.has(d.targetWord.toLowerCase())) {
        seen.add(d.targetWord.toLowerCase());
        finalTargets.push(d);
      }
    }

    // Collect all available words for distractors, all with sanitized underscores
    const distractorBank = [
      ...finalTargets.map(t => t.targetWord),
      ...DEFAULT_MATRIX_ROUNDS.map(d => d.targetWord),
      'corridor', 'slipped', 'bandage', 'nurse', 'safe', 'mistake', 'accident', 'cold pack'
    ].map(w => w.replace(/_/g, ' '));

    return finalTargets.slice(0, 4).map((r) => {
      const others = distractorBank.filter(w => w.toLowerCase() !== r.targetWord.toLowerCase());
      const uniqueOthers = Array.from(new Set(others));
      return {
        targetWord: r.targetWord,
        definition: r.definition,
        distractors: uniqueOthers.slice(0, 3),
      };
    });
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_MATRIX_ROUNDS[0];

  // Matrix Glyph Nodes
  const glyphNodes = useMemo(() => {
    const words = [currentRound.targetWord, ...currentRound.distractors];
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const coords = [
      { x: 120, y: 395 },
      { x: 410, y: 395 },
      { x: 690, y: 395 },
      { x: 240, y: 245 },
      { x: 560, y: 245 },
      { x: 400, y: 125 },
    ];
    return shuffled.slice(0, 4).map((w, idx) => ({
      id: `node_${idx}`,
      x: coords[idx].x,
      y: coords[idx].y,
      word: (w || '').replace(/_/g, ' '),
      isTarget: (w || '').trim().toLowerCase() === currentRound.targetWord.trim().toLowerCase(),
    }));
  }, [currentRound]);

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

  // Glitch Sentinel patrolling
  const glitchRef = useRef({
    x: 200,
    y: 245,
    vx: 2.0,
    minX: 180,
    maxX: 720,
    dir: 1,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: FLOOR_Y - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const [glitchDisplay, setGlitchDisplay] = useState(glitchRef.current);

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
        handleTriggerNearNode();
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
  }, [glyphNodes]);

  // ── Collect Glyph Node ─────────────────────────────────────────────────
  const harvestNode = useCallback((node) => {
    if (phase !== 'playing') return;

    if (node.isTarget) {
      // CORRECT TARGET
      speakText(node.word);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `💠 MATRIX SYNTHESIZED! "${node.word}"` });

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 < rounds.length) {
          setRoundIdx(r => r + 1);
        } else {
          // ALL CLEARED
          setPhase('cleared');
          const finalScore = score + (timeLeft * 2) + 70;
          setScore(finalScore);
          recordPersonalBest('grand_matrix_dungeon', finalScore);
          speakText('Grand celestial matrix fully unlocked!');
        }
      }, 1500);
    } else {
      // WRONG GLYPH
      speakText(node.word);
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next === 0) setPhase('ko');
        return next;
      });
      setFeedback({ type: 'wrong', text: `⚡ GLITCH ERROR! "${node.word}" does not match definition!` });
      setTimeout(() => setFeedback(null), 1500);
    }
  }, [phase, roundIdx, rounds.length, score, timeLeft, recordPersonalBest]);

  const handleTriggerNearNode = useCallback(() => {
    const leo = leoRef.current;
    for (const node of glyphNodes) {
      const dist = Math.hypot((leo.x + 20) - (node.x + 35), (leo.y + 24) - (node.y + 20));
      if (dist < 65) {
        harvestNode(node);
        break;
      }
    }
  }, [glyphNodes, harvestNode]);

  // N1 Proximity guard: prevent remote click exploit (must be within 65px)
  const handleNodeClick = useCallback((node) => {
    if (phase !== 'playing') return;
    const leo = leoRef.current;
    const dist = Math.hypot((leo.x + 20) - (node.x + 35), (leo.y + 24) - (node.y + 20));
    if (dist > 65) {
      setFeedback({ type: 'wrong', text: '⚠️ Leo is too far! Climb close to the matrix glyph to harvest!' });
      setTimeout(() => setFeedback(null), 1200);
      return;
    }
    harvestNode(node);
  }, [phase, harvestNode]);

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
        MATRIX_PLATFORMS,
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

      // Patrol Glitch Sentinel
      const glitch = glitchRef.current;
      glitch.x += glitch.vx * glitch.dir;
      if (glitch.x < glitch.minX) { glitch.x = glitch.minX; glitch.dir = 1; }
      if (glitch.x > glitch.maxX) { glitch.x = glitch.maxX; glitch.dir = -1; }
      setGlitchDisplay({ ...glitch });

      // Glitch Collision
      const nowMs = Date.now();
      if (nowMs > leo.invincibleUntil) {
        const distGlitch = Math.hypot((leo.x + 20) - (glitch.x + 20), (leo.y + 24) - (glitch.y + 20));
        if (distGlitch < 45) {
          leo.invincibleUntil = nowMs + INVINCIBILITY_MS;
          setHearts(h => {
            const next = Math.max(0, h - 1);
            if (next === 0) setPhase('ko');
            return next;
          });
          setFeedback({ type: 'wrong', text: '👾 Shocked by Matrix Sentinel! (-1 Heart)' });
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

  // Mobile gesture controls — Continuous holding movement + jump
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
    onTapCenter: handleTriggerNearNode,
    enabled: phase === 'playing',
  });

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    setFeedback(null);
    leoRef.current = { x: 430, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 40) });
    else if (onExit) onExit();
  };

  return (
    <div className="matrix-dungeon-root" ref={containerRef}>
      {/* ── Always Accessible Floating Exit Button ─────────────────────── */}
      <FloatingExitBtn onExit={onExit} />

      {/* ── Guide Modal Trigger ── */}
      <button
        className="matrix-help-btn"
        onClick={() => setShowHelp(true)}
        title="Game Instructions"
      >
        <HelpCircle size={16} /> Guide
      </button>

      {/* ── Game Instruction Modal ── */}
      <GameInstructionModal
        gameId="grand_matrix"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="matrix-dungeon-banner">
        <Grid size={22} className="matrix-banner-icon" />
        <div className="matrix-def-display">
          <span className="matrix-def-label">Matrix Query:</span>
          <span className="matrix-def-text">"{currentRound.definition}"</span>
        </div>
        <div className="matrix-round-chip">Node {roundIdx + 1} / {rounds.length}</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`matrix-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Matrix Arena Viewport with Camera Tracking ───────────────── */}
      <div
        className="matrix-arena-viewport"
        style={{
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Mobile touch gesture capture layer */}
        <div className="matrix-gesture-layer" ref={gestureRef} />

        {/* Cyber Celestial Grid Lines in background */}
        <div className="matrix-grid-bg-overlay" />

        {/* Matrix Platforms */}
        {MATRIX_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`matrix-platform ${idx === 0 ? 'matrix-floor' : idx === 6 ? 'matrix-apex' : 'matrix-node-beam'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* Matrix Glyph Nodes */}
        {glyphNodes.map(node => (
          <div
            key={node.id}
            className="matrix-glyph-entity"
            data-node-id={node.id}
            data-node-word={node.word}
            data-is-target={node.isTarget ? 'true' : 'false'}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
            onClick={() => handleNodeClick(node)}
          >
            <div className="glyph-core-ring">
              <span className="glyph-text">{node.word}</span>
            </div>
            <span className="glyph-prompt">INTERACT / TAP</span>
          </div>
        ))}

        {/* Glitch Sentinel with upright un-mirrored label */}
        <div
          className="glitch-sentinel-sprite"
          style={{
            left: `${glitchDisplay.x}px`,
            top: `${glitchDisplay.y}px`,
          }}
        >
          <span className="sentinel-icon" style={{ display: 'inline-block', transform: glitchDisplay.dir < 0 ? 'scaleX(-1)' : 'none' }}>👁️</span>
          <span className="sentinel-tag">GLITCH</span>
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
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={5}
        doorLabel="Door 1 — Grand Matrix Dungeon"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="matrix-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>MATRIX FULLY HARVESTED!</h2>
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
        <div className="matrix-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>MATRIX GLITCH OVERLOAD!</h2>
            <p>Glitch sentinels corrupted Leo's energy matrix!</p>
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
