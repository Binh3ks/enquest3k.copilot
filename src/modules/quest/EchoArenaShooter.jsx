/**
 * EchoArenaShooter.jsx — Floor 3, Door 1 (Phonics/Vocab) Mini-Game for Lexio's Quest
 * Mobile-First Native Viewport Redesign:
 * - 100% responsive arena width and height (NO fixed 900x600, NO scaling artifacts)
 * - Tap anywhere to Aim & Fire resonance bolt directly at touch coordinates
 * - Tap directly on an orb to pop it with crystal chime
 * - Swipe or tap sides to reposition Leo
 * - Zero virtual D-Pad clutter: 100% screen devoted to gameplay
 * - Always-visible FloatingExitBtn for seamless Chamber navigation
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, RotateCcw, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { validateMCQOptions } from '../../utils/quizValidation';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import { LEO_SPEED, LEO_HITBOX, clamp } from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import './EchoArenaShooter.css';

const DEFAULT_PHONICS_ROUNDS = [
  {
    targetSound: 'sh',
    targetWord: 'shoe',
    promptAudio: 'sh',
    orbs: [
      { id: 'o1', label: 'shoe', sound: 'sh', isCorrect: true },
      { id: 'o2', label: 'chair', sound: 'ch', isCorrect: false },
      { id: 'o3', label: 'think', sound: 'th', isCorrect: false },
      { id: 'o4', label: 'chin', sound: 'ch', isCorrect: false },
    ],
  },
  {
    targetSound: 'ch',
    targetWord: 'chair',
    promptAudio: 'ch',
    orbs: [
      { id: 'o5', label: 'chair', sound: 'ch', isCorrect: true },
      { id: 'o6', label: 'sheep', sound: 'sh', isCorrect: false },
      { id: 'o7', label: 'thumb', sound: 'th', isCorrect: false },
      { id: 'o8', label: 'shoe', sound: 'sh', isCorrect: false },
    ],
  },
  {
    targetSound: 'th',
    targetWord: 'thick',
    promptAudio: 'th',
    orbs: [
      { id: 'o9', label: 'thick', sound: 'th', isCorrect: true },
      { id: 'o10', label: 'shin', sound: 'sh', isCorrect: false },
      { id: 'o11', label: 'chalk', sound: 'ch', isCorrect: false },
      { id: 'o12', label: 'cheese', sound: 'ch', isCorrect: false },
    ],
  },
  {
    targetSound: 'wh',
    targetWord: 'wheel',
    promptAudio: 'wh',
    orbs: [
      { id: 'o13', label: 'wheel', sound: 'wh', isCorrect: true },
      { id: 'o14', label: 'heel', sound: 'h', isCorrect: false },
      { id: 'o15', label: 'feel', sound: 'f', isCorrect: false },
      { id: 'o16', label: 'peel', sound: 'p', isCorrect: false },
    ],
  },
];

export default function EchoArenaShooter({
  phonicsRounds = DEFAULT_PHONICS_ROUNDS,
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('echo_arena_shooter') || 0;

  const arenaRef = useRef(null);
  const [arenaSize, setArenaSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: 500,
  });

  const rounds = useMemo(() => {
    if (phonicsRounds && phonicsRounds.length >= 4) {
      return phonicsRounds.slice(0, 4).map((r, rIdx) => {
        const correct = (r.orbs || []).filter(o => o.isCorrect);
        const wrong = (r.orbs || []).filter(o => !o.isCorrect);
        const target = correct[0] || { id: `c_${rIdx}`, label: r.targetWord || 'target', isCorrect: true };
        const distractors = wrong.slice(0, 3);
        const fallbackWords = ['chair', 'sheep', 'thumb', 'wheel', 'think', 'shin', 'heel', 'chalk'];
        while (distractors.length < 3) {
          const fallbackLabel = fallbackWords[distractors.length] || `option_${distractors.length}`;
          distractors.push({ id: `d_${rIdx}_${distractors.length}`, label: fallbackLabel, isCorrect: false });
        }
        return {
          targetSound: r.targetSound || 'sh',
          targetWord: target.label,
          promptAudio: r.promptAudio || r.targetSound || 'sh',
          orbs: [target, ...distractors.slice(0, 3)]
        };
      });
    }
    return DEFAULT_PHONICS_ROUNDS;
  }, [phonicsRounds]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_PHONICS_ROUNDS[0];

  // Measure arena size dynamically on mount & resize
  useEffect(() => {
    const updateSize = () => {
      if (arenaRef.current) {
        const { clientWidth, clientHeight } = arenaRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setArenaSize({ width: clientWidth, height: clientHeight });
        }
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Active floating orbs positioned proportionally to arena size
  const [orbs, setOrbs] = useState([]);
  const orbsRef = useRef([]);

  // Projectiles fired by Leo
  const [bolts, setBolts] = useState([]); // [{ id, x, y, vx, vy }]
  const boltsRef = useRef([]);

  // Noise Gremlin enemy flying across mid-air (altitude y=235 guarantees >=47px vertical clearance below all orbs)
  const [gremlin, setGremlin] = useState({ x: 80, y: 235, vx: 2.2, dir: 1 });

  // Aiming angle (degrees: pointing upwards)
  const [aimAngle, setAimAngle] = useState(90);

  // Leo physics state
  const floorY = arenaSize.height - LEO_HITBOX.height - 12;
  const leoRef = useRef({
    x: arenaSize.width / 2 - LEO_HITBOX.width / 2,
    y: floorY,
    vx: 0,
    targetX: arenaSize.width / 2 - LEO_HITBOX.width / 2,
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: arenaSize.width / 2 - LEO_HITBOX.width / 2,
    y: floorY,
    facingRight: true,
    animState: 'idle',
  });

  // Keep Leo within arena bounds on size change
  useEffect(() => {
    leoRef.current.y = floorY;
    leoRef.current.x = clamp(leoRef.current.x, 20, arenaSize.width - LEO_HITBOX.width - 20);
  }, [floorY, arenaSize.width]);

  // Setup round orbs when roundIdx or arenaSize changes
  const initOrbsForRound = useCallback((rIdx) => {
    const round = rounds[rIdx % rounds.length] || DEFAULT_PHONICS_ROUNDS[0];
    speakText(`Sound: ${round.targetSound}`);
    const correctOrbs = round.orbs.filter(o => o.isCorrect);
    const primaryCorrect = correctOrbs[0]?.label || round.targetWord;
    const rawOptions = round.orbs.map(o => o.label);
    const fallbackPool = DEFAULT_PHONICS_ROUNDS.flatMap(r => r.orbs.map(o => o.label));
    const validatedLabels = validateMCQOptions(rawOptions, primaryCorrect, fallbackPool, Math.max(4, round.orbs.length));

    const orbCount = validatedLabels.length;
    const spacing = arenaSize.width / (orbCount + 1);

    const initialOrbs = validatedLabels.map((label, i) => {
      const existing = round.orbs.find(o => o.label === label);
      const isCorrect = existing ? existing.isCorrect : (label === primaryCorrect);
      return {
        id: existing?.id || `orb_${rIdx}_${i}`,
        label,
        sound: existing?.sound || round.targetSound,
        isCorrect,
        x: spacing * (i + 1) - 34,
        y: 80 + (i % 2) * 45,
        vx: (i % 2 === 0 ? 1 : -1) * 1.1,
        vy: 0.3,
        popped: false,
      };
    });
    orbsRef.current = initialOrbs;
    setOrbs(initialOrbs);
  }, [rounds, arenaSize.width]);

  useEffect(() => {
    initOrbsForRound(roundIdx);
  }, [roundIdx, initOrbsForRound]);

  // ── Fire Bolt Action towards (targetX, targetY) or current aim angle ─────────
  const fireBoltTowards = useCallback((targetX, targetY) => {
    if (phase !== 'playing') return;
    const leo = leoRef.current;
    const originX = leo.x + LEO_HITBOX.width / 2;
    const originY = leo.y + 10;

    let vx, vy;
    if (targetX !== undefined && targetY !== undefined) {
      const dx = targetX - originX;
      const dy = targetY - originY;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = 14;
      vx = (dx / dist) * speed;
      vy = (dy / dist) * speed;
      // Face towards target
      leo.facingRight = dx >= 0;
      setAimAngle((Math.atan2(-dy, dx) * 180) / Math.PI);
    } else {
      const rad = (aimAngle * Math.PI) / 180;
      const speed = 14;
      vx = Math.cos(rad) * speed;
      vy = -Math.sin(rad) * speed;
    }

    const newBolt = { id: `bolt_${Date.now()}_${Math.random()}`, x: originX, y: originY, vx, vy };
    boltsRef.current = [...boltsRef.current, newBolt];
    setBolts(boltsRef.current);
  }, [aimAngle, phase]);

  // ── Handle Tap on Arena (Shoots directly at tap position) ────────────────────
  const handleArenaClick = (e) => {
    if (phase !== 'playing') return;
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const tapY = e.clientY - rect.top;

    // Fire bolt directly at tap
    fireBoltTowards(tapX, tapY);
  };

  // ── Gesture Controls: Hold Left/Right to move Leo, Tap to shoot ──────────────────
  const { gestureRef } = useGestureControls({
    onMoveLeftStart: () => {
      leoRef.current.movingLeft = true;
    },
    onMoveLeftEnd: () => {
      leoRef.current.movingLeft = false;
    },
    onMoveRightStart: () => {
      leoRef.current.movingRight = true;
    },
    onMoveRightEnd: () => {
      leoRef.current.movingRight = false;
    },
    onTapLeft: () => {
      leoRef.current.targetX = clamp(leoRef.current.x - 80, 20, arenaSize.width - LEO_HITBOX.width - 20);
    },
    onTapRight: () => {
      leoRef.current.targetX = clamp(leoRef.current.x + 80, 20, arenaSize.width - LEO_HITBOX.width - 20);
    },
    onTapCenter: () => {
      fireBoltTowards();
    },
    onSwipeLeft: () => {
      leoRef.current.targetX = clamp(leoRef.current.x - 120, 20, arenaSize.width - LEO_HITBOX.width - 20);
    },
    onSwipeRight: () => {
      leoRef.current.targetX = clamp(leoRef.current.x + 120, 20, arenaSize.width - LEO_HITBOX.width - 20);
    },
    enabled: phase === 'playing',
  });

  // ── Keyboard controls ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      const leo = leoRef.current;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        leo.targetX = clamp(leo.x - 80, 20, arenaSize.width - LEO_HITBOX.width - 20);
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        leo.targetX = clamp(leo.x + 80, 20, arenaSize.width - LEO_HITBOX.width - 20);
      }
      if (['Space', 'KeyF', 'Enter'].includes(e.code)) {
        e.preventDefault();
        fireBoltTowards();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [arenaSize.width, fireBoltTowards]);

  // ── Physics & Game Loop ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animId;

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const { width: aWidth, height: aHeight } = arenaSize;

      // Handle continuous holding movement
      if (leo.movingLeft) {
        leo.targetX = clamp(leo.targetX - 8, 20, aWidth - LEO_HITBOX.width - 20);
      } else if (leo.movingRight) {
        leo.targetX = clamp(leo.targetX + 8, 20, aWidth - LEO_HITBOX.width - 20);
      }

      // Smoothly steer Leo towards targetX
      const dx = leo.targetX - leo.x;
      if (Math.abs(dx) > 4) {
        leo.vx = Math.sign(dx) * Math.min(Math.abs(dx) * 8, LEO_SPEED * 1.8);
        leo.x = clamp(leo.x + leo.vx * dt * 60, 20, aWidth - LEO_HITBOX.width - 20);
        leo.facingRight = dx > 0;
      } else {
        leo.vx = 0;
        leo.x = leo.targetX;
      }

      // Update Bolts
      const nextBolts = [];
      const currentBolts = boltsRef.current;
      for (const b of currentBolts) {
        const nx = b.x + b.vx * (dt * 60);
        const ny = b.y + b.vy * (dt * 60);

        // Boundary check
        if (nx < 0 || nx > aWidth || ny < 0 || ny > aHeight) continue;

        // Check collision with Noise Gremlin
        const distGremlin = Math.hypot(nx - (gremlin.x + 20), ny - (gremlin.y + 20));
        if (distGremlin < 28) {
          setFeedback({ type: 'wrong', text: '👾 Noise Gremlin absorbed bolt!' });
          setTimeout(() => setFeedback(null), 1200);
          continue;
        }

        // Check collision with orbs
        let boltUsed = false;
        for (const orb of orbsRef.current) {
          if (orb.popped) continue;
          const distOrb = Math.hypot(nx - (orb.x + 34), ny - (orb.y + 34));
          if (distOrb < 38) {
            boltUsed = true;
            orb.popped = true;
            if (orb.isCorrect) {
              speakText(orb.label);
              setScore(s => s + 35);
              setFeedback({ type: 'correct', text: `🎯 "${orb.label}" matches /${currentRound.targetSound}/!` });
              setTimeout(() => setFeedback(null), 1400);
            } else {
              speakText(orb.label);
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setFeedback({ type: 'wrong', text: `❌ "${orb.label}" does NOT match!` });
              setTimeout(() => setFeedback(null), 1400);
            }
            break;
          }
        }

        if (!boltUsed) {
          nextBolts.push({ ...b, x: nx, y: ny });
        }
      }
      boltsRef.current = nextBolts;
      setBolts(nextBolts);

      // Update Orbs floating movement
      for (const orb of orbsRef.current) {
        if (orb.popped) continue;
        let nx = orb.x + orb.vx * (dt * 45);
        let nvx = orb.vx;
        if (nx < 20) {
          nx = 20;
          nvx = Math.abs(orb.vx);
        }
        if (nx > aWidth - 75) {
          nx = aWidth - 75;
          nvx = -Math.abs(orb.vx);
        }
        orb.x = nx;
        orb.vx = nvx;
      }
      setOrbs([...orbsRef.current]);

      // Update Noise Gremlin patrol at mid-air altitude y=235 (>=47px vertical clearance below orbs)
      setGremlin(g => {
        let nx = g.x + g.vx * g.dir;
        let ndir = g.dir;
        if (nx < 30) {
          nx = 30;
          ndir = 1;
        }
        if (nx > aWidth - 70) {
          nx = aWidth - 70;
          ndir = -1;
        }
        return { ...g, x: nx, y: 235, dir: ndir };
      });

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState: Math.abs(leo.vx) > 10 ? 'run' : 'idle',
      });

      animId = requestAnimationFrame(updateGame);
    };

    animId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animId);
  }, [phase, gremlin, currentRound, arenaSize]);

  // Check round progression
  useEffect(() => {
    const correctRemaining = orbs.filter(o => o.isCorrect && !o.popped).length;
    if (correctRemaining === 0 && orbs.length > 0 && phase === 'playing') {
      if (roundIdx + 1 < rounds.length) {
        setRoundIdx(r => r + 1);
        setScore(s => s + 50);
      } else {
        setPhase('cleared');
        const finalScore = score + timeLeft * 2 + 60;
        setScore(finalScore);
        recordPersonalBest('echo_arena_shooter', finalScore);
      }
    }
  }, [orbs, roundIdx, rounds.length, phase, score, timeLeft, recordPersonalBest]);

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

  const handleRetry = () => {
    setPhase('playing');
    setRoundIdx(0);
    setHearts(3);
    setScore(0);
    setFeedback(null);
    boltsRef.current = [];
    setBolts([]);
    setGremlin({ x: 80, y: 235, vx: 2.2, dir: 1 });
    setTimeLeft(duration);
    initOrbsForRound(0);
  };

  const handleFinalFinish = () => {
    const earnedStars = calculateStars(score, rounds.length * 70);
    onComplete && onComplete(earnedStars, score);
  };

  return (
    <div className="echo-arena-root" ref={gestureRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Top Objective Banner ── */}
      <div className="echo-objective-banner">
        <button
          type="button"
          className="echo-listen-btn"
          onClick={(e) => {
            e.stopPropagation();
            speakText(`Sound: ${currentRound.targetSound}`);
          }}
        >
          <Volume2 size={18} /> Listen
        </button>
        <div className="echo-target-display">
          <span className="echo-target-label">Sound:</span>
          <span className="echo-target-phoneme">/{currentRound.targetSound}/</span>
        </div>
        <div className="echo-round-tag">{roundIdx + 1}/{rounds.length}</div>
      </div>

      {/* ── Feedback Toast ── */}
      {feedback && (
        <div className={`echo-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Main Arena Viewport (100% Native Viewport) ── */}
      <div
        className="echo-arena-viewport"
        ref={arenaRef}
        onClick={handleArenaClick}
        title="Tap anywhere to shoot bolt!"
      >
        {/* Acoustic Wavefield Background Effect */}
        <div className="acoustic-rings-overlay" />

        {/* Floating Resonance Orbs (N1 Guarded: Direct Click exploit removed, bolts must be fired from Leo) */}
        {orbs.map(orb => {
          if (orb.popped) return null;
          return (
            <div
              key={orb.id}
              className="acoustic-orb-entity"
              data-orb-id={orb.id}
              data-orb-label={orb.label}
              data-is-correct={orb.isCorrect ? 'true' : 'false'}
              style={{ left: `${orb.x}px`, top: `${orb.y}px` }}
              title={`Acoustic Orb: ${orb.label}`}
            >
              <div className="orb-crystal-glow" />
              <span className="orb-word-text">{orb.label}</span>
            </div>
          );
        })}

        {/* Noise Gremlin with upright un-mirrored label */}
        <div
          className="noise-gremlin-sprite"
          style={{
            left: `${gremlin.x}px`,
            top: `${gremlin.y}px`,
          }}
        >
          <span
            className="gremlin-icon"
            style={{
              display: 'inline-block',
              transform: gremlin.dir < 0 ? 'scaleX(-1)' : 'none',
            }}
          >
            🦇
          </span>
          <span className="gremlin-tag">JAMMER</span>
        </div>

        {/* Flying Resonance Bolts (Centered glowing plasma projectile) */}
        {bolts.map(b => (
          <div
            key={b.id}
            className="resonance-bolt-entity"
            data-bolt-id={b.id}
            style={{ left: `${b.x - 13}px`, top: `${b.y - 13}px` }}
          >
            <Zap size={16} />
          </div>
        ))}

        {/* Leo Character positioned on bottom floor */}
        <LeoCharacter
          x={leoDisplay.x}
          y={leoDisplay.y}
          state={leoDisplay.animState}
          facingRight={leoDisplay.facingRight}
        />
      </div>

      {/* ── Mobile Tip ── */}
      <div className="echo-mobile-tip">
        <span>⚡ Tap screen to aim & shoot bolt! Swipe or tap sides to steer Leo.</span>
      </div>

      {/* ── HUD ── */}
      <HUDOverlay
        floorDoorLabel="Floor 3 Door 1 — Echo Arena Shooter"
        hearts={hearts}
        round={`${roundIdx + 1}/${rounds.length}`}
        xp={score}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx + 1}
        totalWords={rounds.length}
        floorNumber={3}
        doorLabel="Floor 3 Door 1 — Echo Arena Shooter"
      />

      {/* ── Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="echo-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>ACOUSTIC ARENA CLEARED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, rounds.length * 70))}
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

      {/* ── Knockout Modal ── */}
      {phase === 'ko' && (
        <div className="echo-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>SOUND OVERLOAD!</h2>
            <p>Noise discord jammed the acoustic resonance!</p>
            <div className="ko-actions">
              <button className="retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="exit-btn" onClick={onExit || handleFinalFinish}>
                Retreat to Chamber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
