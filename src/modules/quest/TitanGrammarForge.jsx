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
import { Cog, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, Flame, HelpCircle } from 'lucide-react';
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
import './TitanGrammarForge.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Clockwork Titan Platforms
const TITAN_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Lower Machine Floor
  { x: 60,  y: 360,     width: 200,        height: 20 },  // Left Cog Deck
  { x: 350, y: 300,     width: 200,        height: 20 },  // Center Titan Heart Deck
  { x: 640, y: 360,     width: 200,        height: 20 },  // Right Cog Deck
  { x: 370, y: 170,     width: 160,        height: 18 },  // High Crown Cog Deck
  { x: 210, y: 440,     width: 120,        height: 16 },  // Step Gear Left
  { x: 570, y: 440,     width: 120,        height: 16 },  // Step Gear Right
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
      { id: 'cog_3', text: 'is stopping tomorrow',    isCorrect: false },
    ],
  },
  {
    stem: 'The engineer designed rubber soles so that',
    correctClause: 'workers would stay safe',
    fullSentence: 'The engineer designed rubber soles so that workers would stay safe.',
    options: [
      { id: 'cog_4', text: 'tiles are slippery',      isCorrect: false },
      { id: 'cog_5', text: 'workers would stay safe',  isCorrect: true },
      { id: 'cog_6', text: 'everyone falling down',   isCorrect: false },
      { id: 'cog_7', text: 'shoes having no grip',    isCorrect: false },
    ],
  },
  {
    stem: 'When the corridor floor was slippery, Jake',
    correctClause: 'walked very carefully',
    fullSentence: 'When the corridor floor was slippery, Jake walked very carefully.',
    options: [
      { id: 'cog_8',  text: 'runs fast outside',         isCorrect: false },
      { id: 'cog_9',  text: 'walked very carefully',     isCorrect: true },
      { id: 'cog_10', text: 'falling down yesterday',   isCorrect: false },
      { id: 'cog_11', text: 'will slipping easily',      isCorrect: false },
    ],
  },
  {
    stem: 'Unless the janitor cleans the wet floor,',
    correctClause: 'students may slip and fall',
    fullSentence: 'Unless the janitor cleans the wet floor, students may slip and fall.',
    options: [
      { id: 'cog_12', text: 'students may slip and fall', isCorrect: true },
      { id: 'cog_13', text: 'the hallway dry quickly',    isCorrect: false },
      { id: 'cog_14', text: 'everyone will be careful',   isCorrect: false },
      { id: 'cog_15', text: 'friction increases greatly', isCorrect: false },
    ],
  },
];

export default function TitanGrammarForge({
  grammarSentences = [],
  duration = 100,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('titan_grammar_forge') || 0;

  // Viewport tracking & responsive camera
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : ROOM_WIDTH);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || window.innerWidth || ROOM_WIDTH);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Enforce at least 4 rounds for N4 <= 3.76% (R=4, p=0.25, L=2)
  const rounds = useMemo(() => {
    if (grammarSentences && grammarSentences.length >= 4) {
      const validCustomRounds = grammarSentences.filter(item => 
        item && item.stem && Array.isArray(item.options) && item.options.length >= 4
      );
      if (validCustomRounds.length >= 4) {
        return validCustomRounds.slice(0, 4);
      }
    }
    return DEFAULT_TITAN_ROUNDS;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_TITAN_ROUNDS[0];

  // 4 Gear Cogs: Left Deck, High Crown Deck, Right Deck, Lower Machine Deck (p = 0.25)
  const cogs = useMemo(() => {
    // Fisher-Yates shuffle for true uniform 25% distribution across all 4 pedestals
    const opts = [...currentRound.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return [
      { id: 'gear_0', x: 110, y: 295, option: opts[0] },
      { id: 'gear_1', x: 390, y: 105, option: opts[1] },
      { id: 'gear_2', x: 670, y: 295, option: opts[2] },
      { id: 'gear_3', x: 390, y: 445, option: opts[3] },
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

  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__setTitanLeo = (x, y) => {
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
      if (import.meta.env.DEV && typeof window !== 'undefined') delete window.__setTitanLeo;
    };
  }, []);

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

    const elapsedSec = (Date.now() - roundStartTimeRef.current) / 1000;
    const roundBudgetSec = +(duration / rounds.length).toFixed(2);
    const marginSec = +(roundBudgetSec - elapsedSec).toFixed(2);
    console.log(`[TITAN-FORGE-ROUND-ACTION] Round ${roundIdx + 1} | Action: ${cog.option.isCorrect ? 'CORRECT' : 'WRONG'} | Time Spent: ${elapsedSec.toFixed(2)}s | Budget: ${roundBudgetSec}s | Margin: ${marginSec}s | HUD timeLeft: ${timeLeft}s`);

    if (cog.option.isCorrect) {
      // CORRECT GEAR
      if (import.meta.env.DEV && typeof window !== 'undefined') {
        window.__ttsInvocations = window.__ttsInvocations || [];
        window.__ttsInvocations.push({
          text: currentRound.fullSentence,
          station: 'chronicles',
          timestamp: Date.now()
        });
      }
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
      if (dist < 85) {
        activateCog(cog);
        break;
      }
    }
  }, [cogs, activateCog]);

  const handleCogClick = useCallback((cog) => {
    const leo = leoRef.current;
    const dist = Math.hypot((leo.x + 20) - (cog.x + 35), (leo.y + 24) - (cog.y + 20));
    if (dist > 85) {
      setFeedback({ type: 'wrong', text: '⚠️ Leo is too far! Leap close to the Gear Cog first!' });
      setTimeout(() => setFeedback(null), 1200);
      return;
    }
    activateCog(cog);
  }, [activateCog]);

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
      const landed = checkPlatformLanding(leo, TITAN_PLATFORMS);
      if (landed) {
        leo.isGrounded = true;
      } else if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else {
        leo.isGrounded = false;
      }

      // Steam Hazard Collision (in the right floor vent at x: 520-580, y: FLOOR_Y - 50)
      const nowMs = Date.now();
      if (steamActive && nowMs > leo.invincibleUntil) {
        if (leo.x >= 520 && leo.x <= 580 && leo.y >= FLOOR_Y - 50) {
          leo.invincibleUntil = nowMs + 1000;
          leo.vx = -6;
          leo.vy = -6;
          leo.x = 505; // Knockback safely to the left outside vent
          setFeedback({ type: 'wrong', text: '💨 Whoosh! Blown back by Titan Steam Vent!' });
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

  // Dynamic clamp: ensures gear plaques remain at least 10px from screen edges on any viewport
  const getCogClampedStyle = useCallback((cog) => {
    const cogCenterX = cog.x + 75;
    const screenCenterX = cogCenterX - cameraX;
    const halfWidth = 75;
    const edgeMargin = 15;
    const minScreenX = edgeMargin + halfWidth;
    const maxScreenX = containerWidth - edgeMargin - halfWidth;

    let offset = 0;
    if (screenCenterX > -100 && screenCenterX < containerWidth + 100) {
      if (screenCenterX < minScreenX) {
        offset = minScreenX - screenCenterX;
      } else if (screenCenterX > maxScreenX) {
        offset = maxScreenX - screenCenterX;
      }
    }

    return {
      left: `${cog.x}px`,
      top: `${cog.y}px`,
      transform: offset !== 0 ? `translateX(${Math.round(offset)}px)` : undefined,
    };
  }, [cameraX, containerWidth]);

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
    enabled: phase === 'playing' && !showHelp,
  });

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    setFeedback(null);
    setSteamActive(false);
    leoRef.current = { x: 430, y: 240, vx: 0, vy: 0, isGrounded: true, facingRight: true, invincibleUntil: 0 };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 40) });
    else if (onExit) onExit();
  };

  const roundStartTimeRef = useRef(Date.now());
  useEffect(() => {
    roundStartTimeRef.current = Date.now();
    console.log(`[TITAN-FORGE-ROUND-START] Round ${roundIdx + 1}/${rounds.length} started | timeLeft: ${timeLeft}s | stem: "${currentRound.stem}"`);
  }, [roundIdx]);

  return (
    <div className="titan-forge-root" ref={containerRef}>
      {/* ── Always Accessible Floating Exit Button ─────────────────────── */}
      <FloatingExitBtn onExit={onExit} />

      {/* ── Game Instruction Modal ── */}
      <GameInstructionModal
        gameId="titan_forge"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

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

        {/* Steam Vent Hazard in Right Ground */}
        <div className={`steam-vent-entity ${steamActive ? 'vent-active' : ''}`} style={{ left: '550px', top: `${FLOOR_Y - 50}px` }}>
          {steamActive && <div className="steam-blast">💨 STEAM BLAST 💨</div>}
        </div>

        {/* 4 Gear Cogs */}
        {cogs.map(cog => (
          <div
            key={cog.id}
            className="titan-gear-entity"
            data-gear-id={cog.id}
            data-is-correct={cog.option.isCorrect}
            style={getCogClampedStyle(cog)}
            onClick={() => handleCogClick(cog)}
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
        round={{ current: roundIdx + 1, total: rounds.length }}
        floorNumber={5}
        doorLabel="Door 2 — Titan Grammar Forge"
        rightActions={
          <button
            type="button"
            className="titan-help-btn"
            onClick={() => setShowHelp(true)}
            title="Game Instructions"
          >
            <HelpCircle size={15} /> Guide
          </button>
        }
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
