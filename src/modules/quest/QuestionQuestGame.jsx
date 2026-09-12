/**
 * QuestionQuestGame.jsx — Floor 7, Door 2 (Grammar) Mini-Game for Lexio's Quest
 * GDD §2 Floor 7 Room 2: "QUESTION QUEST" (Sanctum Maze Platformer)
 *
 * Replaces static multiple-choice tapping with Labyrinth Sanctuary Platformer:
 * - Ancient Celestial Labyrinth with 3 Sanctuary Vault Doors across tiers.
 * - Narrative Event Statement displayed on top banner with direct DOM classes:
 *     `.question-quest-banner-text` and `.question-quest-round-pill`.
 * - 3 Vault Doors labeled with 220px wide Sanctuary Plaques (biển 220px) displaying candidate WH-Questions.
 * - Leo navigates stone platforms and enters the correct WH-question door:
 *     - Correct Door: Golden burst, +40 XP, TTS speaks question, unlocks next round!
 *     - Wrong Door: Door rejects Leo with dark sparks, -1 Heart (3 -> 2)!
 * - Anti-Leak State Invariant: All doors tagged with targetRoundId, fresh options per round.
 * - Full Virtual D-Pad + Arrow Keys / WASD + Spacebar support.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { HelpCircle, Trophy, RotateCcw, ArrowRight, Sparkles, AlertTriangle, Shield, Compass } from 'lucide-react';
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
import { getWhQuestionsForWeek } from '../../services/chroniclesFloor67Service';
import './QuestionQuestGame.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Labyrinth platforms (220px wide platforms matching the 220px signboards)
const MAZE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Maze Floor
  { x: 50,  y: 370,     width: 220,        height: 18 },  // Left Vault Tier (Door 0)
  { x: 340, y: 310,     width: 220,        height: 18 },  // Central Spawn Perch (Leo spawn)
  { x: 630, y: 370,     width: 220,        height: 18 },  // Right Vault Tier (Door 2)
  { x: 340, y: 220,     width: 220,        height: 18 },  // High Apex Altar (Door 1)
  { x: 200, y: 450,     width: 140,        height: 16 },  // Step Left
  { x: 560, y: 450,     width: 140,        height: 16 },  // Step Right
];

export default function QuestionQuestGame({
  weekNumber = 33,
  weekData = null,
  duration = 90,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('question_quest') || 0;
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

  // Load questions for this week
  const questions = useMemo(() => {
    return getWhQuestionsForWeek(weekNumber, weekData);
  }, [weekNumber, weekData]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [showHelp, setShowHelp] = useState(false);
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  // Live refs for stale-closure prevention
  const heartsRef = useRef(hearts);
  heartsRef.current = hearts;
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const roundIdxRef = useRef(roundIdx);
  roundIdxRef.current = roundIdx;

  const currentQ = questions[roundIdx % questions.length] || questions[0];

  // 3 Sanctuary Vault Doors with 220px wide signboards (biển 220px)
  const doors = useMemo(() => {
    const currentRoundId = roundIdx + 1;
    const rawOpts = [...currentQ.options];
    // Deterministic rotation based on roundIdx to keep options ordered cleanly
    const shift = roundIdx % rawOpts.length;
    const rotated = [...rawOpts.slice(shift), ...rawOpts.slice(0, shift)];

    return [
      {
        id: `door_0_r${currentRoundId}`,
        x: 50,
        y: 280,
        text: rotated[0]?.text || '',
        isCorrect: Boolean(rotated[0]?.isCorrect),
        targetRoundId: currentRoundId,
      },
      {
        id: `door_1_r${currentRoundId}`,
        x: 340,
        y: 130,
        text: rotated[1]?.text || '',
        isCorrect: Boolean(rotated[1]?.isCorrect),
        targetRoundId: currentRoundId,
      },
      {
        id: `door_2_r${currentRoundId}`,
        x: 630,
        y: 280,
        text: rotated[2]?.text || '',
        isCorrect: Boolean(rotated[2]?.isCorrect),
        targetRoundId: currentRoundId,
      },
    ];
  }, [currentQ, roundIdx]);

  const doorsRef = useRef(doors);
  doorsRef.current = doors;
  const currentQRef = useRef(currentQ);
  currentQRef.current = currentQ;

  // Leo physics — spawns symmetrically on Central Spawn Perch (x: 430, y: 250)
  const leoRef = useRef({
    x: 430,
    y: 310 - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 310 - LEO_HITBOX.height,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const keysPressed = useRef({ left: false, right: false, up: false });
  const animFrameId = useRef(null);

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  // ── Enter Vault Door ───────────────────────────────────────────────────────
  const enterDoor = useCallback((door) => {
    if (phase !== 'playing' || showHelp || feedback) return;

    if (door.isCorrect) {
      speakText(door.text);
      setScore(s => s + 40);
      setFeedback({ type: 'correct', text: `✨ SANCTUARY UNLOCKED! "${door.text}" is the correct WH-question!` });

      setTimeout(() => {
        setFeedback(null);
        if (roundIdx + 1 < questions.length) {
          setRoundIdx(r => r + 1);
        } else {
          setPhase('cleared');
          const finalScore = scoreRef.current + (timeLeft * 2) + 60;
          setScore(finalScore);
          recordPersonalBest('question_quest', finalScore);
          speakText('All sanctuary questions solved!');
        }
      }, 1200);
    } else {
      speakText(door.text);
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next === 0) setPhase('ko');
        return next;
      });
      // Knockback Leo slightly away from door
      if (leoRef.current) {
        leoRef.current.vx = leoRef.current.facingRight ? -4 : 4;
        leoRef.current.vy = -3;
      }
      setFeedback({ type: 'wrong', text: `🔒 SEALED! "${door.text}" does not match this event!` });
      setTimeout(() => setFeedback(null), 1200);
    }
  }, [phase, showHelp, feedback, roundIdx, questions.length, timeLeft, recordPersonalBest]);

  const handleTriggerNearDoor = useCallback(() => {
    const leo = leoRef.current;
    for (const d of doors) {
      // 220px signboard hit box
      const doorCenterX = d.x + 110;
      const doorCenterY = d.y + 40;
      const dist = Math.hypot((leo.x + 20) - doorCenterX, (leo.y + 24) - doorCenterY);
      if (dist < 110) {
        enterDoor(d);
        break;
      }
    }
  }, [doors, enterDoor]);

  // ── Keyboard controls ──────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (showHelp) return;
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
        handleTriggerNearDoor();
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
  }, [showHelp, handleTriggerNearDoor]);

  // ── Gesture controls ───────────────────────────────────────────────────
  const { onTouchStart, onTouchMove, onTouchEnd } = useGestureControls({
    onTap: () => {
      keysPressed.current.up = true;
      handleTriggerNearDoor();
      setTimeout(() => { keysPressed.current.up = false; }, 180);
    },
    onSwipeLeft: () => {
      keysPressed.current.left = true;
      setTimeout(() => { keysPressed.current.left = false; }, 320);
    },
    onSwipeRight: () => {
      keysPressed.current.right = true;
      setTimeout(() => { keysPressed.current.right = false; }, 320);
    },
    onSwipeUp: () => {
      keysPressed.current.up = true;
      setTimeout(() => { keysPressed.current.up = false; }, 250);
    },
  });

  // ── Game physics loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const leo = leoRef.current;

      // Horizontal movement
      if (keysPressed.current.left) {
        leo.vx = -LEO_SPEED * 1.05;
        leo.facingRight = false;
      } else if (keysPressed.current.right) {
        leo.vx = LEO_SPEED * 1.05;
        leo.facingRight = true;
      } else {
        leo.vx *= 0.8;
        if (Math.abs(leo.vx) < 0.1) leo.vx = 0;
      }

      // Jump
      if (keysPressed.current.up && leo.isGrounded) {
        leo.vy = -Math.abs(LEO_JUMP_FORCE) * 1.08;
        leo.isGrounded = false;
      }

      // Gravity & Integration
      applyGravity(leo, dt);
      leo.x += leo.vx;
      leo.y += leo.vy;

      // Platform Collisions
      const landed = checkPlatformLanding(leo, MAZE_PLATFORMS, LEO_HITBOX);
      leo.isGrounded = landed;

      // Boundaries
      leo.x = clamp(leo.x, 0, ROOM_WIDTH - LEO_HITBOX.width);

      // Animation State
      let animState = 'idle';
      if (!leo.isGrounded) {
        animState = leo.vy < 0 ? 'jump' : 'fall';
      } else if (Math.abs(leo.vx) > 0.5) {
        animState = 'run';
      }

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
        invincible: leo.invincibleUntil > Date.now(),
      });

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [phase]);

  // ── Timer countdown ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('ko');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // ── Expose test hooks for automated verification ─────────────────────────
  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__QUESTION_QUEST_TEST_HOOK__ = {
        getRoundIdx: () => roundIdxRef.current,
        getScore: () => scoreRef.current,
        getHearts: () => heartsRef.current,
        getCurrentQuestion: () => currentQRef.current,
        getDoors: () => doorsRef.current,
        enterDoor: (doorIdx) => {
          if (doorsRef.current[doorIdx]) {
            enterDoor(doorsRef.current[doorIdx]);
          }
        },
        advanceToRound: (idx) => {
          setFeedback(null);
          setRoundIdx(idx);
        },
        setHeartsVal: (h) => setHearts(h),
        getStaleDoors: (roundId) => doorsRef.current.filter(d => d.targetRoundId === roundId),
      };
    }
  }, [enterDoor]);

  const stars = calculateStars(score, 180);

  return (
    <div
      ref={containerRef}
      className="question-quest-root"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Native Universal HUD Overlay ── */}
      <HUDOverlay
        score={score}
        hearts={hearts}
        timeLeft={timeLeft}
        totalTime={duration}
        stars={stars}
        title="Sanctum Maze: Question Quest"
      >
        <button
          className="question-help-btn"
          onClick={() => setShowHelp(true)}
          title="Game Guide"
        >
          <HelpCircle size={18} />
          <span>Guide</span>
        </button>
      </HUDOverlay>

      <FloatingExitBtn onExit={onExit} />

      {/* ── Top Objective Narrative Banner (DOM Accessible) ── */}
      <div className="question-quest-banner">
        <Compass size={22} className="question-banner-icon" />
        <div className="question-prompt-box">
          <span className="question-quest-banner-text">
            {currentQ.sentence}
          </span>
        </div>
        <span className="question-quest-round-pill">
          Round {roundIdx + 1} / {questions.length}
        </span>
      </div>

      {/* ── Feedback Toast ── */}
      {feedback && (
        <div className={`question-feedback-toast feedback-${feedback.type}`}>
          {feedback.type === 'correct' ? <Sparkles size={20} /> : <AlertTriangle size={20} />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* ── Labyrinth Maze Viewport ── */}
      <div
        className="question-maze-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: `translateX(-${cameraX}px)`,
        }}
      >
        {/* Platforms */}
        {MAZE_PLATFORMS.map((plat, i) => (
          <div
            key={i}
            className="maze-stone-platform"
            style={{
              left: `${plat.x}px`,
              top: `${plat.y}px`,
              width: `${plat.width}px`,
              height: `${plat.height}px`,
            }}
          />
        ))}

        {/* 3 Sanctuary Vault Doors (biển 220px) */}
        {doors.map((door, idx) => (
          <div
            key={door.id}
            className={`question-vault-door ${door.isCorrect ? 'door-target' : 'door-distractor'}`}
            style={{
              left: `${door.x}px`,
              top: `${door.y}px`,
            }}
            onClick={() => enterDoor(door)}
          >
            {/* Biển 220px hiển thị WH-question */}
            <div className="vault-door-plaque-220">
              <span className="vault-question-text">{door.text}</span>
            </div>
            <div className="vault-door-frame">
              <div className="door-portal-glow">
                <span className="door-portal-arch">🏛️</span>
              </div>
              <span className="door-action-prompt">
                [E] Enter Vault
              </span>
            </div>
          </div>
        ))}

        {/* Leo Character */}
        <div
          className="question-leo-layer"
          style={{
            transform: `translate(${leoDisplay.x}px, ${leoDisplay.y}px)`,
          }}
        >
          <LeoCharacter
            animState={leoDisplay.animState}
            facingRight={leoDisplay.facingRight}
            invincible={leoDisplay.invincible}
          />
        </div>
      </div>

      {/* ── Virtual D-Pad Touch Controls for Mobile ── */}
      <div className="maze-mobile-controls">
        <button
          className="btn-touch-dpad"
          onTouchStart={() => { keysPressed.current.left = true; }}
          onTouchEnd={() => { keysPressed.current.left = false; }}
        >
          ◀
        </button>
        <button
          className="btn-touch-dpad btn-touch-jump"
          onTouchStart={() => {
            keysPressed.current.up = true;
            handleTriggerNearDoor();
          }}
          onTouchEnd={() => { keysPressed.current.up = false; }}
        >
          ▲ JUMP / ENTER
        </button>
        <button
          className="btn-touch-dpad"
          onTouchStart={() => { keysPressed.current.right = true; }}
          onTouchEnd={() => { keysPressed.current.right = false; }}
        >
          ▶
        </button>
      </div>

      {/* ── Victory / Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="riddle-modal-overlay">
          <div className="riddle-victory-card">
            <Trophy size={56} className="text-yellow-400 animate-bounce" />
            <h2 className="riddle-victory-title">SANCTUM CONQUERED!</h2>
            <p className="riddle-victory-sub">All WH-questions accurately matched!</p>
            <div className="riddle-victory-stats">
              <div>SCORE: <span>{score}</span></div>
              <div>STARS: <span>{'⭐'.repeat(stars || 1)}</span></div>
            </div>
            <button
              className="riddle-finish-btn"
              onClick={() => onComplete && onComplete({ score, stars })}
            >
              Continue Journey <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Defeat / KO Modal ── */}
      {phase === 'ko' && (
        <div className="riddle-modal-overlay">
          <div className="riddle-victory-card riddle-ko-card">
            <Shield size={56} className="text-red-400" />
            <h2 className="riddle-victory-title text-red-400">LABYRINTH SEALED!</h2>
            <p className="riddle-victory-sub">You ran out of hearts or time.</p>
            <button
              className="riddle-finish-btn"
              onClick={() => {
                setHearts(3);
                setTimeLeft(duration);
                setScore(0);
                setRoundIdx(0);
                setPhase('playing');
              }}
            >
              Retry Sanctum <RotateCcw size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Instruction Guide Modal ── */}
      <GameInstructionModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        gameId="question_quest"
        title="Sanctum Maze: Question Quest Guide"
        instructions={[
          { title: 'Read Event', description: 'Read the event statement on the top banner.' },
          { title: 'Locate 220px Doors', description: 'Inspect the 3 Sanctuary Vault Doors with 220px plaques displaying WH-questions.' },
          { title: 'Jump & Enter', description: 'Move Leo and press [E] or Space in front of the matching WH-question door (+40 XP).' },
          { title: 'Avoid Wrong Doors', description: 'Entering the wrong door costs 1 Heart!' },
        ]}
      />
    </div>
  );
}
