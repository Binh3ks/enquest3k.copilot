/**
 * EchoArenaShooter.jsx — Floor 3, Door 1 (Phonics/Vocab) Mini-Game for Lexio's Quest
 * GDD §2 Floor 3 Room A: "ECHO ARENA SHOOTER"
 *
 * Replaces static phonics tapping with 360° Slingshot Aim & Launch:
 * - Arcane acoustic arena with floating acoustic resonance orbs
 * - Target phonics sound or word prompt played via AudioHelper TTS
 * - Leo operates an acoustic energy launcher (runs left/right, aims slingshot angle, fires resonance bolts)
 * - Acoustic orbs drift down with phoneme labels (e.g. /ʃ/ - shoe, /tʃ/ - chair, /θ/ - think)
 * - Matching orb popped: crystalline chime, XP burst, target word audio!
 * - Distractor orb popped: discord pulse, -1 Heart
 * - Noise Gremlins fly in zig-zags attempting to absorb bolts
 * - Virtual D-Pad + Aim/Fire buttons + Keyboard controls
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, RotateCcw, ArrowRight, Sparkles, Target, Zap, AlertTriangle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './EchoArenaShooter.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

const DEFAULT_PHONICS_ROUNDS = [
  {
    targetSound: 'sh',
    targetWord: 'shoe',
    promptAudio: 'sh',
    orbs: [
      { id: 'o1', label: 'shoe', sound: 'sh', isCorrect: true },
      { id: 'o2', label: 'ship', sound: 'sh', isCorrect: true },
      { id: 'o3', label: 'chair', sound: 'ch', isCorrect: false },
      { id: 'o4', label: 'think', sound: 'th', isCorrect: false },
    ],
  },
  {
    targetSound: 'ch',
    targetWord: 'chair',
    promptAudio: 'ch',
    orbs: [
      { id: 'o5', label: 'cheese', sound: 'ch', isCorrect: true },
      { id: 'o6', label: 'chalk', sound: 'ch', isCorrect: true },
      { id: 'o7', label: 'sheep', sound: 'sh', isCorrect: false },
      { id: 'o8', label: 'thumb', sound: 'th', isCorrect: false },
    ],
  },
  {
    targetSound: 'th',
    targetWord: 'thin',
    promptAudio: 'th',
    orbs: [
      { id: 'o9', label: 'thick', sound: 'th', isCorrect: true },
      { id: 'o10', label: 'thumb', sound: 'th', isCorrect: true },
      { id: 'o11', label: 'shin', sound: 'sh', isCorrect: false },
      { id: 'o12', label: 'chin', sound: 'ch', isCorrect: false },
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

  const rounds = phonicsRounds && phonicsRounds.length > 0 ? phonicsRounds : DEFAULT_PHONICS_ROUNDS;

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_PHONICS_ROUNDS[0];

  // Active floating orbs
  const [orbs, setOrbs] = useState(() => {
    return currentRound.orbs.map((orb, i) => ({
      ...orb,
      x: 100 + i * 200,
      y: 90 + (i % 2) * 50,
      vx: (i % 2 === 0 ? 1 : -1) * 1.2,
      vy: 0.4,
      popped: false,
    }));
  });

  // Projectiles fired by Leo
  const [bolts, setBolts] = useState([]); // [{ id, x, y, vx, vy }]

  // Noise Gremlin enemy flying across top
  const [gremlin, setGremlin] = useState({ x: 80, y: 160, vx: 2.5, dir: 1 });

  // Aiming angle (degrees: 45 to 135, pointing upwards)
  const [aimAngle, setAimAngle] = useState(90);

  // Leo physics state
  const leoRef = useRef({
    x: 420,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 420,
    y: FLOOR_Y - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
  });

  const keysPressed = useRef({ left: false, right: false, up: false, aimLeft: false, aimRight: false });
  const animFrameId = useRef(null);

  // Play target sound on round start
  useEffect(() => {
    speakText(`Sound: ${currentRound.targetSound}`);
    // Reset orbs for new round
    setOrbs(currentRound.orbs.map((orb, i) => ({
      ...orb,
      x: 120 + i * 190,
      y: 90 + (i % 2) * 45,
      vx: (i % 2 === 0 ? 1 : -1) * 1.2,
      vy: 0.4,
      popped: false,
    })));
  }, [roundIdx, currentRound]);

  // ── Keyboard controls ──────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        keysPressed.current.right = true;
      }
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        setAimAngle(a => clamp(a - 6, 35, 145));
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        setAimAngle(a => clamp(a + 6, 35, 145));
      }
      if (['Space', 'KeyF', 'Enter'].includes(e.code)) {
        e.preventDefault();
        fireBolt();
      }
    };

    const onKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) keysPressed.current.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keysPressed.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [aimAngle]);

  // ── Fire Bolt Action ───────────────────────────────────────────────────
  const fireBolt = useCallback(() => {
    if (phase !== 'playing') return;
    const leo = leoRef.current;
    // Angle in radians (0 is right, 90 is straight up, 180 is left)
    const rad = (aimAngle * Math.PI) / 180;
    const speed = 12;
    const vx = Math.cos(rad) * speed;
    const vy = -Math.sin(rad) * speed;

    setBolts(prev => [
      ...prev,
      { id: `bolt_${Date.now()}_${Math.random()}`, x: leo.x + 20, y: leo.y, vx, vy }
    ]);
  }, [aimAngle, phase]);

  // ── Physics & Game Loop ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const updateGame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;
      const keys = keysPressed.current;

      // Leo movement
      if (keys.left) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (keys.right) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx *= 0.8;
      }

      leo.x += leo.vx * dt;
      leo.x = clamp(leo.x, 20, ROOM_WIDTH - LEO_HITBOX.width - 20);

      // Update Bolts
      setBolts(prevBolts => {
        const nextBolts = [];
        for (const b of prevBolts) {
          const nx = b.x + b.vx * (dt * 60);
          const ny = b.y + b.vy * (dt * 60);

          // Check boundary
          if (nx < 0 || nx > ROOM_WIDTH || ny < 0) continue;

          // Check collision with Noise Gremlin
          const distGremlin = Math.hypot(nx - (gremlin.x + 20), ny - (gremlin.y + 20));
          if (distGremlin < 28) {
            // Gremlin absorbed bolt!
            setFeedback({ type: 'wrong', text: '👾 Noise Gremlin absorbed bolt!' });
            setTimeout(() => setFeedback(null), 1200);
            continue; // bolt destroyed
          }

          // Check collision with orbs
          let boltUsed = false;
          setOrbs(prevOrbs => {
            return prevOrbs.map(orb => {
              if (orb.popped) return orb;
              const distOrb = Math.hypot(nx - (orb.x + 25), ny - (orb.y + 25));
              if (distOrb < 34 && !boltUsed) {
                boltUsed = true;
                if (orb.isCorrect) {
                  // CORRECT POP!
                  speakText(orb.label);
                  setScore(s => s + 35);
                  setFeedback({ type: 'correct', text: `🎯 "${orb.label}" matches /${currentRound.targetSound}/!` });
                  setTimeout(() => setFeedback(null), 1500);
                  return { ...orb, popped: true };
                } else {
                  // WRONG POP!
                  speakText(orb.label);
                  setHearts(h => {
                    const next = Math.max(0, h - 1);
                    if (next === 0) setPhase('ko');
                    return next;
                  });
                  setFeedback({ type: 'wrong', text: `❌ "${orb.label}" does NOT match!` });
                  setTimeout(() => setFeedback(null), 1500);
                  return { ...orb, popped: true };
                }
              }
              return orb;
            });
          });

          if (!boltUsed) {
            nextBolts.push({ ...b, x: nx, y: ny });
          }
        }
        return nextBolts;
      });

      // Update Orbs floating movement
      setOrbs(prevOrbs =>
        prevOrbs.map(orb => {
          if (orb.popped) return orb;
          let nx = orb.x + orb.vx * (dt * 50);
          let nvx = orb.vx;
          if (nx < 30) { nx = 30; nvx = Math.abs(orb.vx); }
          if (nx > ROOM_WIDTH - 80) { nx = ROOM_WIDTH - 80; nvx = -Math.abs(orb.vx); }
          return { ...orb, x: nx, vx: nvx };
        })
      );

      // Update Noise Gremlin patrol
      setGremlin(g => {
        let nx = g.x + g.vx * g.dir;
        let ndir = g.dir;
        if (nx < 40) { nx = 40; ndir = 1; }
        if (nx > ROOM_WIDTH - 80) { nx = ROOM_WIDTH - 80; ndir = -1; }
        return { ...g, x: nx, dir: ndir };
      });

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState: Math.abs(leo.vx) > 10 ? 'run' : 'idle',
      });

      animFrameId.current = requestAnimationFrame(updateGame);
    };

    animFrameId.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [phase, gremlin, currentRound]);

  // Check round progression: if all correct orbs are popped
  useEffect(() => {
    const correctRemaining = orbs.filter(o => o.isCorrect && !o.popped).length;
    if (correctRemaining === 0 && phase === 'playing') {
      if (roundIdx + 1 < rounds.length) {
        setRoundIdx(r => r + 1);
        setScore(s => s + 50);
      } else {
        // CLEARED ALL ROUNDS
        setPhase('cleared');
        const finalScore = score + (timeLeft * 2) + 60;
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

  // Mobile D-Pad handlers
  const dpadHandlers = {
    onLeftPress: () => { keysPressed.current.left = true; },
    onLeftRelease: () => { keysPressed.current.left = false; },
    onRightPress: () => { keysPressed.current.right = true; },
    onRightRelease: () => { keysPressed.current.right = false; },
    onJumpPress: () => setAimAngle(a => clamp(a - 12, 35, 145)),
    onActionPress: fireBolt,
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    setBolts([]);
    leoRef.current = { x: 420, y: FLOOR_Y - LEO_HITBOX.height, vx: 0, vy: 0, isGrounded: true, facingRight: true };
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 70) });
    else if (onExit) onExit();
  };

  return (
    <div className="echo-arena-root">
      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="echo-objective-banner">
        <button className="echo-listen-btn" onClick={() => speakText(`Sound: ${currentRound.targetSound}`)}>
          <Volume2 size={20} /> Listen Sound
        </button>
        <div className="echo-target-display">
          <span className="echo-target-label">Target Sound:</span>
          <span className="echo-target-phoneme">/{currentRound.targetSound}/</span>
        </div>
        <div className="echo-round-tag">Round {roundIdx + 1} / {rounds.length}</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`echo-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Main Arena Viewport ──────────────────────────────────────── */}
      <div className="echo-arena-viewport">
        {/* Acoustic Wavefield Background Effect */}
        <div className="acoustic-rings-overlay" />

        {/* Floating Resonance Orbs */}
        {orbs.map(orb => {
          if (orb.popped) return null;
          return (
            <div
              key={orb.id}
              className="acoustic-orb-entity"
              style={{ left: `${orb.x}px`, top: `${orb.y}px` }}
              onClick={() => {
                // Also allow direct tap for accessibility
                if (orb.isCorrect) {
                  speakText(orb.label);
                  setScore(s => s + 35);
                  setOrbs(prev => prev.map(o => o.id === orb.id ? { ...o, popped: true } : o));
                }
              }}
            >
              <div className="orb-crystal-glow" />
              <span className="orb-word-text">{orb.label}</span>
            </div>
          );
        })}

        {/* Noise Gremlin */}
        <div
          className="noise-gremlin-sprite"
          style={{
            left: `${gremlin.x}px`,
            top: `${gremlin.y}px`,
            transform: gremlin.dir < 0 ? 'scaleX(-1)' : 'none',
          }}
        >
          <span>🦇</span>
          <span className="gremlin-tag">JAMMER</span>
        </div>

        {/* Slingshot Aim Guide Line from Leo */}
        <div
          className="slingshot-aim-line"
          style={{
            left: `${leoDisplay.x + 20}px`,
            top: `${leoDisplay.y + 10}px`,
            transform: `rotate(${-(aimAngle - 90)}deg)`,
          }}
        />

        {/* Flying Resonance Bolts */}
        {bolts.map(b => (
          <div
            key={b.id}
            className="resonance-bolt-entity"
            style={{ left: `${b.x}px`, top: `${b.y}px` }}
          >
            <Zap size={16} />
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
        floorNumber={3}
        doorLabel="Door 1 — Echo Arena Shooter"
      />

      {/* ── Virtual D-Pad + Aim Controls ──────────────────────────────── */}
      <div className="echo-controls-wrapper">
        <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />
        {phase === 'playing' && (
          <div className="echo-aim-sliders">
            <button
              className="aim-btn"
              onClick={() => setAimAngle(a => clamp(a + 10, 35, 145))}
            >
              📐 Aim Left
            </button>
            <button
              className="aim-fire-btn"
              onClick={fireBolt}
            >
              ⚡ FIRE BOLT
            </button>
            <button
              className="aim-btn"
              onClick={() => setAimAngle(a => clamp(a - 10, 35, 145))}
            >
              Aim Right 📐
            </button>
          </div>
        )}
      </div>

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
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

      {/* ── Knockout Modal ───────────────────────────────────────────── */}
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
