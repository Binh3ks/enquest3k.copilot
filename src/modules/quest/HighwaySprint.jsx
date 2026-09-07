/**
 * HighwaySprint.jsx — Floor 4, Door 1 (Vocab) Mini-Game for Lexio's Quest
 * GDD §2 Floor 4 Room A: "HIGHWAY SPRINT"
 *
 * Replaces static clicking with 3-Lane Cosmic Highway Runner:
 * - Cybernetic Rune Sanctum highway with 3 lanes (Top, Middle, Bottom)
 * - Target definition displayed on top banner (e.g. "Resistance when surfaces slide")
 * - Word orbs appear in lanes along with energy barriers (hazards)
 * - Leo shifts lanes (Up / Down) and Jumps (Space / Jump) over barriers
 * - Colliding with correct word orb: Energy surge, +30 XP, TTS speech
 * - Colliding with barrier or wrong word: -1 Heart, Leo flickers invincible
 * - Virtual D-Pad (mobile) + Arrow Keys / WASD + Spacebar (desktop)
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Compass, Trophy, RotateCcw, ArrowRight, Zap, Sparkles, AlertTriangle, Shield } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import { clamp, INVINCIBILITY_MS } from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import './HighwaySprint.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// 3 Lane Y coordinates
const LANES = [
  { id: 0, y: 220, label: 'Top Lane' },
  { id: 1, y: 340, label: 'Mid Lane' },
  { id: 2, y: 460, label: 'Bottom Lane' },
];

const DEFAULT_HIGHWAY_ROUNDS = [
  {
    targetWord: 'friction',
    definition: 'Force that resists motion when two surfaces touch',
    distractors: ['gravity', 'magnetism', 'velocity'],
  },
  {
    targetWord: 'corridor',
    definition: 'A long passage in a building from which doors lead into rooms',
    distractors: ['balcony', 'basement', 'courtyard'],
  },
  {
    targetWord: 'polished',
    definition: 'Made smooth and shiny by rubbing or waxing',
    distractors: ['rough', 'broken', 'freezing'],
  },
  {
    targetWord: 'laboratory',
    definition: 'A room or building equipped for scientific experiments',
    distractors: ['cafeteria', 'gymnasium', 'dormitory'],
  },
];

export default function HighwaySprint({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_sprint') || 0;

  // Build rounds from vocabItems if present
  const rounds = useMemo(() => {
    if (vocabItems && vocabItems.length >= 3) {
      return vocabItems.slice(0, 4).map((item, idx) => {
        const others = vocabItems.filter((_, i) => i !== idx).map(v => v.word || 'word');
        return {
          targetWord: item.word || 'friction',
          definition: item.definition || 'A scientific principle or object',
          distractors: others.slice(0, 3),
        };
      });
    }
    return DEFAULT_HIGHWAY_ROUNDS;
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_HIGHWAY_ROUNDS[0];

  // Leo's state
  const [currentLane, setCurrentLane] = useState(1); // 0, 1, 2
  const [isJumping, setIsJumping] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const invincibleUntil = useRef(0);

  // Highway incoming objects: [{ id, x, lane, type: 'target'|'distractor'|'barrier', word }]
  const [highwayObjects, setHighwayObjects] = useState([]);
  const spawnTimer = useRef(0);

  // ── Keyboard controls ──────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        setCurrentLane(l => clamp(l - 1, 0, 2));
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        setCurrentLane(l => clamp(l + 1, 0, 2));
      }
      if (['Space', 'KeyJ'].includes(e.code) && !isJumping) {
        e.preventDefault();
        triggerJump();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isJumping]);

  const triggerJump = useCallback(() => {
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 450);
  }, []);

  // Spawn new wave of items for current round
  useEffect(() => {
    // Reset incoming objects on round change
    const words = [currentRound.targetWord, ...currentRound.distractors];
    // Randomize which lane gets target
    const lanesShuffled = [0, 1, 2].sort(() => Math.random() - 0.5);

    const initialSpawn = [
      {
        id: `tgt_${roundIdx}`,
        x: ROOM_WIDTH + 80,
        lane: lanesShuffled[0],
        type: 'target',
        word: currentRound.targetWord,
      },
      {
        id: `dist_${roundIdx}_1`,
        x: ROOM_WIDTH + 80,
        lane: lanesShuffled[1],
        type: 'distractor',
        word: currentRound.distractors[0] || 'distractor',
      },
      {
        id: `barr_${roundIdx}`,
        x: ROOM_WIDTH + 80,
        lane: lanesShuffled[2],
        type: 'barrier',
        word: '⚡ BARRIER',
      },
    ];
    setHighwayObjects(initialSpawn);
  }, [roundIdx, currentRound]);

  // ── Game Loop (Highway scrolling and collision) ────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animId;

    const gameTick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const nowMs = Date.now();

      setInvincible(nowMs < invincibleUntil.current);

      setHighwayObjects(prev => {
        const nextObjs = [];
        const speed = 280; // px/sec

        for (const obj of prev) {
          const nx = obj.x - speed * dt;

          // Leo is located at X = 150
          const leoX = 150;
          const distLeo = Math.abs(nx - leoX);

          // Collision Check
          if (distLeo < 40 && obj.lane === currentLane) {
            // If it's a barrier and Leo is jumping, he safely leaps over it!
            if (obj.type === 'barrier' && isJumping) {
              // Safely jumped over barrier!
              setScore(s => s + 10);
              setFeedback({ type: 'correct', text: '🦘 Leaped over barrier! (+10 XP)' });
              setTimeout(() => setFeedback(null), 1200);
              continue;
            }

            if (obj.type === 'target') {
              // HIT TARGET WORD!
              speakText(obj.word);
              setScore(s => s + 35);
              setFeedback({ type: 'correct', text: `✨ ACCELERATION! Matched "${obj.word}"!` });
              setTimeout(() => setFeedback(null), 1500);

              // Round advance
              setTimeout(() => {
                if (roundIdx + 1 < rounds.length) {
                  setRoundIdx(r => r + 1);
                } else {
                  // ALL ROUNDS CLEARED
                  setPhase('cleared');
                  const finalScore = score + (timeLeft * 2) + 50;
                  setScore(finalScore);
                  recordPersonalBest('highway_sprint', finalScore);
                  speakText('Cosmic highway sprint completed!');
                }
              }, 400);
              continue;
            }

            if (obj.type === 'distractor' || obj.type === 'barrier') {
              // HIT HAZARD / WRONG WORD
              if (nowMs > invincibleUntil.current) {
                invincibleUntil.current = nowMs + INVINCIBILITY_MS;
                setHearts(h => {
                  const next = Math.max(0, h - 1);
                  if (next === 0) setPhase('ko');
                  return next;
                });
                setFeedback({ type: 'wrong', text: `💥 COLLISION with ${obj.word}! (-1 Heart)` });
                setTimeout(() => setFeedback(null), 1200);
              }
              continue;
            }
          }

          // Off-screen respawn if passed
          if (nx > -100) {
            nextObjs.push({ ...obj, x: nx });
          }
        }

        // If all objects passed without hit, respawn round wave
        if (nextObjs.length === 0) {
          const lanesShuffled = [0, 1, 2].sort(() => Math.random() - 0.5);
          return [
            {
              id: `tgt_${Date.now()}`,
              x: ROOM_WIDTH + 60,
              lane: lanesShuffled[0],
              type: 'target',
              word: currentRound.targetWord,
            },
            {
              id: `dist_${Date.now()}`,
              x: ROOM_WIDTH + 60,
              lane: lanesShuffled[1],
              type: 'distractor',
              word: currentRound.distractors[0] || 'distractor',
            },
            {
              id: `barr_${Date.now()}`,
              x: ROOM_WIDTH + 60,
              lane: lanesShuffled[2],
              type: 'barrier',
              word: '⚡ BARRIER',
            },
          ];
        }

        return nextObjs;
      });

      animId = requestAnimationFrame(gameTick);
    };

    animId = requestAnimationFrame(gameTick);
    return () => cancelAnimationFrame(animId);
  }, [phase, currentLane, isJumping, roundIdx, rounds.length, currentRound, score, timeLeft, recordPersonalBest]);

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
    onLeftPress: () => setCurrentLane(l => clamp(l - 1, 0, 2)),
    onRightPress: () => setCurrentLane(l => clamp(l + 1, 0, 2)),
    onJumpPress: triggerJump,
    onActionPress: triggerJump,
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    setCurrentLane(1);
    setIsJumping(false);
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    if (onComplete) onComplete({ score, stars: calculateStars(score, rounds.length * 35) });
    else if (onExit) onExit();
  };

  const leoY = LANES[currentLane].y + (isJumping ? -65 : 0);

  return (
    <div className="highway-sprint-root">
      {/* ── Top Objective Banner ───────────────────────────────────────── */}
      <div className="highway-objective-banner">
        <Compass size={22} className="highway-banner-icon" />
        <div className="highway-definition-box">
          <span className="highway-def-label">Definition:</span>
          <span className="highway-def-text">"{currentRound.definition}"</span>
        </div>
        <div className="highway-round-chip">Word {roundIdx + 1} / {rounds.length}</div>
      </div>

      {/* ── Feedback Toast ───────────────────────────────────────────── */}
      {feedback && (
        <div className={`highway-feedback-toast feedback-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Highway Viewport ─────────────────────────────────────────── */}
      <div className="highway-viewport">
        {/* 3 Highway Lanes with neon tracks */}
        {LANES.map(lane => (
          <div key={lane.id} className="highway-lane-strip" style={{ top: `${lane.y}px` }}>
            <div className="highway-lane-line" />
            <span className="highway-lane-tag">{lane.label}</span>
          </div>
        ))}

        {/* Incoming Highway Objects */}
        {highwayObjects.map(obj => {
          const laneY = LANES[obj.lane].y;
          return (
            <div
              key={obj.id}
              className={`highway-item-entity item-${obj.type}`}
              style={{ left: `${obj.x}px`, top: `${laneY - 24}px` }}
            >
              {obj.type === 'target' && <Sparkles size={16} className="item-sparkle" />}
              {obj.type === 'barrier' && <Zap size={18} className="barrier-zap" />}
              <span className="highway-item-label">{obj.word}</span>
            </div>
          );
        })}

        {/* Leo Runner Sprite */}
        <div
          className={`highway-leo-wrapper ${isJumping ? 'leo-in-air' : ''}`}
          style={{ left: '150px', top: `${leoY - 20}px` }}
        >
          <LeoCharacter
            x={0}
            y={0}
            state={isJumping ? 'jump' : 'run'}
            facingRight={true}
            invincible={invincible}
          />
        </div>
      </div>

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={4}
        doorLabel="Door 1 — Highway Sprint"
      />

      {/* ── Virtual D-Pad ────────────────────────────────────────────── */}
      <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="highway-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>HIGHWAY SPRINT MASTERED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, rounds.length * 35))}
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
        <div className="highway-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>CRASHED OUT!</h2>
            <p>Highway obstacles drained Leo's energy!</p>
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
