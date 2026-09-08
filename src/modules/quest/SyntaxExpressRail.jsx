/**
 * SyntaxExpressRail.jsx — Floor 4, Door 2 (Grammar) Mini-Game for Lexio's Quest
 * GDD §2 Floor 4 Room B: "SYNTAX EXPRESS RAIL"
 *
 * Replaces static syntax ordering with Railway Switch Platformer:
 * - High-speed canyon express rail with 3 track junctions (Tracks A, B, C)
 * - Target sentence with grammatical connector blank (e.g. "If tiles are wet, people ___.")
 * - 3 Track Switch Levers on elevated rail gantry platforms
 * - Leo platform-jumps across gantries and strikes the correct Track Switch Lever before countdown!
 * - Correct switch: Train roars into Golden Express Tunnel, +35 XP, TTS speaks sentence!
 * - Wrong switch or timeout: Derailment hazard, -1 Heart!
 * - Full Virtual D-Pad + Arrow Keys / WASD + Spacebar support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Train, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, GitCommit } from 'lucide-react';
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
import './SyntaxExpressRail.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Gantry platforms for the 3 switch levers
const RAIL_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Lower Rail Bed
  { x: 100, y: 350,     width: 180,        height: 20 },  // Gantry Left (Lever 1)
  { x: 360, y: 310,     width: 180,        height: 20 },  // Gantry Mid (Lever 2)
  { x: 620, y: 350,     width: 180,        height: 20 },  // Gantry Right (Lever 3)
];

const DEFAULT_SYNTAX_ROUNDS = [
  {
    stem: 'If corridor floors are wet, people',
    correctClause: 'will slip easily',
    fullSentence: 'If corridor floors are wet, people will slip easily.',
    options: [
      { id: 'opt_0', text: 'will slip easily',   isCorrect: true },
      { id: 'opt_1', text: 'slipped yesterday',   isCorrect: false },
      { id: 'opt_2', text: 'are slipping now',   isCorrect: false },
    ],
  },
  {
    stem: 'Because friction was increased by rubber, Jake',
    correctClause: 'walked without falling',
    fullSentence: 'Because friction was increased by rubber, Jake walked without falling.',
    options: [
      { id: 'opt_3', text: 'fall down quickly',  isCorrect: false },
      { id: 'opt_4', text: 'walked without falling', isCorrect: true },
      { id: 'opt_5', text: 'will fall tomorrow', isCorrect: false },
    ],
  },
  {
    stem: 'Although polished tiles looked clean, they',
    correctClause: 'were very dangerous',
    fullSentence: 'Although polished tiles looked clean, they were very dangerous.',
    options: [
      { id: 'opt_6', text: 'is safe today',      isCorrect: false },
      { id: 'opt_7', text: 'were very dangerous', isCorrect: true },
      { id: 'opt_8', text: 'was sticky honey',   isCorrect: false },
    ],
  },
];

export default function SyntaxExpressRail({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('syntax_express_rail') || 0;
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

  const rounds = useMemo(() => {
    if (grammarSentences && grammarSentences.length > 0) {
      return grammarSentences.slice(0, 3).map((item, idx) => {
        const full = item.fullSentence || 'If surfaces are smooth, objects slide easily.';
        const words = full.split(' ');
        const mid = Math.floor(words.length / 2);
        const stem = words.slice(0, mid).join(' ');
        const tail = words.slice(mid).join(' ');
        return {
          stem,
          correctClause: tail,
          fullSentence: full,
          options: [
            { id: `opt_${idx}_0`, text: tail, isCorrect: true },
            { id: `opt_${idx}_1`, text: 'stopped completely', isCorrect: false },
            { id: `opt_${idx}_2`, text: 'is floating in air', isCorrect: false },
          ].sort(() => Math.random() - 0.5),
        };
      });
    }
    return DEFAULT_SYNTAX_ROUNDS;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [trainDist, setTrainDist] = useState(0); // 0 to 100% approaching junction

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_SYNTAX_ROUNDS[0];

  // Levers on the 3 elevated gantries (planted on gantry platforms)
  const levers = useMemo(() => {
    const opts = currentRound.options;
    return [
      { id: 'lever_0', x: 190, y: 350, option: opts[0] },
      { id: 'lever_1', x: 450, y: 310, option: opts[1] },
      { id: 'lever_2', x: 710, y: 350, option: opts[2] },
    ];
  }, [currentRound]);

  // Leo physics — starting on Mid Gantry at x = 380 (beside lever_1 at 450)
  const leoRef = useRef({
    x: 380,
    y: 250,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 380,
    y: 250,
    facingRight: true,
    animState: 'idle',
  });

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
        handleTriggerNearLever();
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
  }, [levers]);

  // ── Switch Lever Trigger ───────────────────────────────────────────────
  const triggerLever = useCallback((lever) => {
    if (phase !== 'playing') return;

    if (lever.option.isCorrect) {
      // CORRECT SWITCH!
      speakText(currentRound.fullSentence);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `🚂 JUNCTION SWITCHED! "${lever.option.text}"` });
      setTrainDist(0);

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 < rounds.length) {
          setRoundIdx(r => r + 1);
        } else {
          // ALL ROUNDS CLEARED
          setPhase('cleared');
          const finalScore = score + (timeLeft * 2) + 50;
          setScore(finalScore);
          recordPersonalBest('syntax_express_rail', finalScore);
          speakText('Syntax express successfully guided through all junctions!');
        }
      }, 1600);
    } else {
      // WRONG SWITCH
      speakText(lever.option.text);
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next === 0) setPhase('ko');
        return next;
      });
      setFeedback({ type: 'wrong', text: `💥 ROUGH TRACKS! "${lever.option.text}" is grammatically invalid!` });
      setTimeout(() => setFeedback(null), 1600);
    }
  }, [phase, currentRound, roundIdx, rounds.length, score, timeLeft, recordPersonalBest]);

  const handleTriggerNearLever = useCallback(() => {
    const leo = leoRef.current;
    for (const lev of levers) {
      const dist = Math.hypot((leo.x + 20) - (lev.x + 35), (leo.y + 24) - (lev.y + 20));
      if (dist < 75) {
        triggerLever(lev);
        break;
      }
    }
  }, [levers, triggerLever]);

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
      leo.width = LEO_HITBOX.width;
      leo.height = LEO_HITBOX.height;
      const landed = checkPlatformLanding(leo, RAIL_PLATFORMS);

      if (landed) {
        leo.isGrounded = true;
      } else if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
        leo.y = FLOOR_Y - LEO_HITBOX.height;
        leo.vy = 0;
        leo.isGrounded = true;
      } else {
        leo.isGrounded = false;
      }

      let animState = 'idle';
      if (!leo.isGrounded) animState = 'jump';
      else if (Math.abs(leo.vx) > 10) animState = 'run';

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
      });

      // Train approaches junction
      setTrainDist(d => {
        const next = d + dt * 3.5;
        if (next >= 100) {
          // Train reached junction without switch!
          setHearts(h => {
            const nextH = Math.max(0, h - 1);
            if (nextH === 0) setPhase('ko');
            return nextH;
          });
          setFeedback({ type: 'wrong', text: '⚠️ Train derailed! No track switch activated!' });
          setTimeout(() => setFeedback(null), 1500);
          return 0;
        }
        return next;
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

  // Gesture Controls for SyntaxExpressRail — Continuous holding movement + jump + strike
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
    onTapCenter: handleTriggerNearLever,
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
    setRoundIdx(0);
    setTrainDist(0);
    leoRef.current = { x: 380, y: 250, vx: 0, vy: 0, isGrounded: true, facingRight: true };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 40) });
    else if (onExit) onExit();
  };

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="syntax-rail-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="syntax-rail-gesture-layer" />

      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="syntax-rail-banner">
        <div className="syntax-banner-train-badge">
          <Train size={14} />
          <span>R{roundIdx + 1}/{rounds.length}</span>
        </div>
        <div className="syntax-sentence-box">
          <span className="syntax-stem-text">{currentRound.stem}</span>
          <span className="syntax-blank-highlight">[ ? ]</span>
        </div>
        <div className="train-gauge">
          <span>Junction:</span>
          <div className="train-gauge-bar">
            <div className="train-gauge-fill" style={{ width: `${trainDist}%` }} />
          </div>
        </div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`syntax-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Canyon Railway Viewport with smooth Camera follow ────────── */}
      <div
        className="syntax-rail-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Approaching Express Train in background */}
        <div className="distant-express-train" style={{ transform: `scale(${0.6 + trainDist * 0.005})` }}>
          <span className="train-emoji">🚆</span>
          <div className="train-steam">💨</div>
        </div>

        {/* Railway Tracks & Gantries */}
        {RAIL_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`rail-platform ${idx === 0 ? 'rail-ground' : 'rail-gantry'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* 3 Mechanical Switch Levers */}
        {levers.map(lev => (
          <div
            key={lev.id}
            className="rail-switch-entity"
            style={{ left: `${lev.x}px`, top: `${lev.y}px` }}
            onClick={() => triggerLever(lev)}
          >
            {/* Clause Label Plaque */}
            <div className="rail-clause-plaque">
              <span>{lev.option.text}</span>
            </div>
            {/* Lever Switch Rig */}
            <div className="rail-lever-arm">
              <span className="lever-icon">🕹️</span>
              <span className="lever-hint">STRIKE / TAP</span>
            </div>
          </div>
        ))}

        {/* Leo Character */}
        <LeoCharacter
          x={leoDisplay.x}
          y={leoDisplay.y}
          state={leoDisplay.animState}
          facingRight={leoDisplay.facingRight}
        />
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={4}
        doorLabel="Door 2 — Syntax Express Rail"
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="syntax-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>JUNCTION CLEARED!</h2>
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
        <div className="syntax-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>DERAILED!</h2>
            <p>The express train crashed through the wrong junction!</p>
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
