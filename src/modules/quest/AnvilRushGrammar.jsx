/**
 * AnvilRushGrammar.jsx — Floor 2, Door 2 (Grammar) Mini-Game for Lexio's Quest
 * GDD §2 Floor 2 Room B: "ANVIL RUSH GRAMMAR"
 *
 * Replaces static grammar multiple-choice with physical platformer Jump-Strike:
 * - Volcanic Rune Forge setting with 3 glowing anvils across the room
 * - Target sentence displayed with blank on top banner
 * - Each anvil bears a grammatical form option (e.g. "walk" / "walked" / "walking")
 * - Leo climbs high platforms and JUMP-STRIKES the correct anvil
 * - Correct anvil: sparks shower, word forged into sentence, TTS audio speaks sentence!
 * - Wrong anvil: anvil erupts in flames 🔥, creating hazard zone!
 * - Forge Imp enemy patrols anvils
 * - Full Virtual D-Pad (mobile) + Arrow Keys / WASD (desktop) support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Hammer, Trophy, Timer, Flame, Sparkles, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './AnvilRushGrammar.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

const FORGE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Ground
  { x: 100, y: 320,     width: 180,        height: 18 },  // High Beam Left
  { x: 360, y: 270,     width: 180,        height: 18 },  // High Beam Mid
  { x: 620, y: 320,     width: 180,        height: 18 },  // High Beam Right
];

const DEFAULT_GRAMMAR_ROUNDS = [
  {
    sentence: 'Jake ___ carefully down the school corridor.',
    blankWord: 'walked',
    options: ['walk', 'walked', 'walking'],
  },
  {
    sentence: 'Rubber shoes ___ strong grip on wet floor.',
    blankWord: 'give',
    options: ['gives', 'give', 'giving'],
  },
  {
    sentence: 'Water on tiles ___ the friction quickly.',
    blankWord: 'reduces',
    options: ['reduces', 'reduce', 'reduced'],
  },
];

export default function AnvilRushGrammar({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('anvil_rush_grammar') || 0;

  // Process rounds
  const rounds = useMemo(() => {
    if (grammarSentences && grammarSentences.length > 0) {
      return grammarSentences.slice(0, 3).map((item, idx) => {
        const full = item.fullSentence || item.sentence || 'Jake walked down the corridor.';
        const words = full.split(' ');
        const target = words[1] || 'walked';
        return {
          sentence: full.replace(target, '___'),
          blankWord: target,
          options: [target, `${target}s`, `${target}ing`],
        };
      });
    }
    return DEFAULT_GRAMMAR_ROUNDS;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);
  const [anvilFlames, setAnvilFlames] = useState({}); // { [anvilIdx]: expireTime }

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_GRAMMAR_ROUNDS[0];

  // 3 Anvils setup
  const anvils = useMemo(() => {
    const opts = currentRound.options;
    const shuffled = [...opts].sort(() => Math.random() - 0.5);
    return [
      { id: 'anvil_0', x: 150, y: 465, word: shuffled[0], isCorrect: shuffled[0] === currentRound.blankWord },
      { id: 'anvil_1', x: 425, y: 465, word: shuffled[1], isCorrect: shuffled[1] === currentRound.blankWord },
      { id: 'anvil_2', x: 700, y: 465, word: shuffled[2], isCorrect: shuffled[2] === currentRound.blankWord },
    ];
  }, [currentRound]);

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

  // Forge Imp Enemy
  const impRef = useRef({
    x: 430, y: FLOOR_Y - 45, vx: 2.0, minX: 180, maxX: 720
  });
  const [impDisplay, setImpDisplay] = useState({ x: 430, y: FLOOR_Y - 45 });

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
      const imp = impRef.current;
      const now = Date.now();

      // 1. Leo Movement
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
      const landed = checkPlatformLanding(leo, FORGE_PLATFORMS);
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

      // 7. Anvil Strike Detection (Landing down on anvil)
      for (let i = 0; i < anvils.length; i++) {
        const anvil = anvils[i];
        const leoFoot = leo.y + LEO_HITBOX.height;
        const anvilTop = anvil.y;
        const horizOverlap = leo.x + LEO_HITBOX.width > anvil.x + 10 && leo.x < anvil.x + 60;

        if (horizOverlap && leoFoot >= anvilTop && leoFoot <= anvilTop + 20 && leo.vy >= 0) {
          if (anvil.cooldownUntil && now < anvil.cooldownUntil) continue;
          anvil.cooldownUntil = now + 2000;

          handleAnvilStrike(anvil, i);
          // High bounce and knockback away from anvil center to clear fire
          const dir = leo.x < anvil.x + 35 ? -1 : 1;
          leo.vx = dir * 6;
          leo.vy = -10;
          break;
        }
      }

      // 8. Flame Hazard Collision
      for (const [idxStr, expTime] of Object.entries(anvilFlames)) {
        if (now < expTime && !invincible) {
          const anvil = anvils[Number(idxStr)];
          if (anvil) {
            const dist = Math.hypot((leo.x + 20) - (anvil.x + 35), (leo.y + 30) - anvil.y);
            if (dist < 36) {
              leo.hearts = Math.max(0, leo.hearts - 1);
              leo.invincibleUntil = now + INVINCIBILITY_MS;
              leo.animState = 'hit';
              // Knockback away from flame hazard
              const dir = leo.x < anvil.x + 35 ? -1 : 1;
              leo.vx = dir * 7;
              leo.vy = -8;
              setHearts(leo.hearts);
              if (leo.hearts <= 0) {
                setPhase('ko');
                return;
              }
            }
          }
        }
      }

      // 9. Forge Imp Enemy Collision
      if (!invincible) {
        const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
        const impCenter = { x: imp.x + 20, y: imp.y + 20 };
        const dist = Math.hypot(leoCenter.x - impCenter.x, leoCenter.y - impCenter.y);

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

      // Imp Patrol
      imp.x += imp.vx;
      if (imp.x <= imp.minX || imp.x >= imp.maxX) {
        imp.vx = -imp.vx;
      }

      // Sync display
      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setImpDisplay({ x: imp.x, y: imp.y });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, anvils, anvilFlames]);

  // Handle Anvil Strike
  const handleAnvilStrike = (anvil, anvilIdx) => {
    if (anvil.isCorrect) {
      // Correct Anvil!
      setScore(s => s + 30);
      setFeedback(`✨ RUNE FORGED! "${anvil.word}" (+30 XP)`);
      speakText(currentRound.sentence.replace('___', anvil.word), null, 1.0, null, 'sentence', weekNumber);

      setTimeout(() => {
        setFeedback(null);
        const nextRound = roundIdx + 1;
        if (nextRound >= rounds.length) {
          setPhase('cleared');
        } else {
          setRoundIdx(nextRound);
          setAnvilFlames({});
        }
      }, 1500);
    } else {
      // Wrong Anvil: Erupt into flames!
      setFeedback(`🔥 Wrong Verb Form! Watch out for fire!`);
      const now = Date.now();
      setAnvilFlames(f => ({ ...f, [anvilIdx]: now + 2000 }));
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, rounds.length * 30);
    recordPersonalBest('anvil_rush_grammar', score);
    onComplete?.(stars, score);
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setRoundIdx(0);
    setAnvilFlames({});
    setTimeLeft(duration);
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
    <div className="anvil-rush-container" role="region" aria-label="Anvil Rush Grammar">
      {/* ── Top Sentence Banner ─────────────────────────────────────── */}
      <div className="anvil-sentence-banner">
        <div className="forge-badge">
          <Hammer size={16} />
          <span>RUNE FORGE • TRIAL {roundIdx + 1}/{rounds.length}</span>
        </div>
        <div className="forge-target-sentence">
          {currentRound.sentence}
        </div>
        <div className="forge-action-instruction">
          Climb high and Jump-Strike the anvil with the correct verb form!
        </div>
        {feedback && (
          <div className="forge-feedback-toast">{feedback}</div>
        )}
      </div>

      {/* ── Game World ──────────────────────────────────────────────── */}
      <div className="anvil-world-viewport">
        {/* Lava Forge Ambient Glow */}
        <div className="forge-lava-glow" />

        {/* High Platforms */}
        {FORGE_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`forge-platform ${idx === 0 ? 'forge-ground' : 'forge-beam'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* 3 Anvils */}
        {anvils.map((anvil, idx) => {
          const isFlames = anvilFlames[idx] && Date.now() < anvilFlames[idx];
          return (
            <div
              key={anvil.id}
              className={`anvil-entity ${isFlames ? 'anvil-burning' : ''}`}
              style={{ left: `${anvil.x}px`, top: `${anvil.y}px` }}
              onClick={() => handleAnvilStrike(anvil, idx)}
            >
              {isFlames && (
                <div className="anvil-flame-burst">
                  <Flame size={32} className="fire-icon" />
                </div>
              )}
              {/* Rune Option Plaque */}
              <div className="anvil-word-plaque">
                <span>{anvil.word}</span>
              </div>
              {/* Anvil Iron Sprite */}
              <div className="anvil-iron">
                <span className="anvil-symbol">⚒️</span>
              </div>
            </div>
          );
        })}

        {/* Forge Imp Enemy */}
        <div
          className="forge-imp-sprite"
          style={{ left: `${impDisplay.x}px`, top: `${impDisplay.y}px` }}
        >
          <span>👺</span>
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
        floorNumber={2}
        doorLabel="Door 2 — Anvil Rush Grammar"
      />

      {/* ── Virtual D-Pad ────────────────────────────────────────────── */}
      <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="anvil-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>RUNE FORGE MASTERED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, rounds.length * 30))}
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
        <div className="anvil-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>BURNT OUT!</h2>
            <p>The forge flames overwhelmed Leo!</p>
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
