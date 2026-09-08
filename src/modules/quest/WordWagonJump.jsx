/**
 * WordWagonJump.jsx — Floor 1, Door 2 (Grammar) Mini-Game for Lexio's Quest
 * GDD §2 Floor 1 Room B: "WORD WAGON JUMP"
 *
 * Replaces static click-the-train with physical Leo platformer train surfing:
 * - Train wagons continuously scroll from right to left across tracks
 * - Wagon roofs act as physical moving platforms Leo can jump on and surf
 * - Top Sentence Banner displays target sentence with active blanks
 * - Leo must time his jump and land on the wagon carrying the correct chunk
 * - Correct wagon: glows gold, fills blank, Leo rides wagon, TTS audio speaks sentence!
 * - Wrong wagon: shakes red, slips Leo off
 * - Grammar Gremlin hazard on trap wagons (-1 heart)
 * - Ground patrol zombie hazards
 * - Full Virtual D-Pad (mobile) + Arrow Keys / WASD (desktop) support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, Timer, Sparkles, Train, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import {
  LEO_SPEED, LEO_JUMP_FORCE, GRAVITY, FLOOR_Y,
  LEO_HITBOX, INVINCIBILITY_MS, clamp, applyGravity, checkPlatformLanding
} from './LeoPhysics';
import LeoCharacter from './LeoCharacter';
import VirtualDPad from './VirtualDPad';
import HUDOverlay from './HUDOverlay';
import useGameScale from './useGameScale';
import './WordWagonJump.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;
const TRACK_Y = 430;      // Train tracks Y position
const WAGON_WIDTH = 150;
const WAGON_HEIGHT = 65;
const WAGON_ROOF_Y = TRACK_Y - WAGON_HEIGHT; // 365px (where Leo lands)

const DEFAULT_SENTENCES = [
  {
    fullSentence: 'Jake was walking down the school corridor.',
    parts: [
      { text: 'Jake was', isBlank: false },
      { text: 'walking', isBlank: true, options: ['walking', 'sleeping', 'flying'] },
      { text: 'down the school', isBlank: false },
      { text: 'corridor.', isBlank: true, options: ['corridor.', 'kitchen.', 'garden.'] },
    ],
  },
  {
    fullSentence: 'Rubber soles give strong grip on slippery tiles.',
    parts: [
      { text: 'Rubber soles', isBlank: false },
      { text: 'give', isBlank: true, options: ['give', 'melt', 'drop'] },
      { text: 'strong grip on', isBlank: false },
      { text: 'slippery tiles.', isBlank: true, options: ['slippery tiles.', 'flying clouds.', 'hot lava.'] },
    ],
  },
  {
    fullSentence: 'Water on smooth tiles reduces friction quickly.',
    parts: [
      { text: 'Water on tiles', isBlank: false },
      { text: 'reduces', isBlank: true, options: ['reduces', 'builds', 'freezes'] },
      { text: 'friction', isBlank: false },
      { text: 'quickly.', isBlank: true, options: ['quickly.', 'loudly.', 'softly.'] },
    ],
  },
];

export default function WordWagonJump({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('word_wagon_jump') || 0;

  // Mobile scale: fit 900×600 game world into any phone viewport
  const { containerRef: gameContainerRef, scaleStyle, scale } = useGameScale(ROOM_WIDTH, ROOM_HEIGHT);

  // Process grammar rounds from props or defaults
  const sentenceRounds = useMemo(() => {
    if (grammarSentences && grammarSentences.length > 0) {
      return grammarSentences.slice(0, 3).map((item, idx) => {
        const full = item.fullSentence || item.sentence || 'Leo explores the ancient dungeon.';
        const words = full.split(' ');
        if (words.length >= 6) {
          const blankIdx1 = 1;
          const blankIdx2 = words.length - 1;
          return {
            fullSentence: full,
            parts: [
              { text: words.slice(0, blankIdx1).join(' '), isBlank: false },
              { text: words[blankIdx1], isBlank: true, options: [words[blankIdx1], 'running', 'sleeping'] },
              { text: words.slice(blankIdx1 + 1, blankIdx2).join(' '), isBlank: false },
              { text: words[blankIdx2], isBlank: true, options: [words[blankIdx2], 'stairs.', 'door.'] },
            ],
          };
        }
        return DEFAULT_SENTENCES[idx % DEFAULT_SENTENCES.length];
      });
    }
    return DEFAULT_SENTENCES;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [activeBlankIdx, setActiveBlankIdx] = useState(0); // 0 or 1
  const [filledBlanks, setFilledBlanks] = useState({});
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [bannerFeedback, setBannerFeedback] = useState(null);

  const currentRound = sentenceRounds[roundIdx % sentenceRounds.length];
  const blankParts = currentRound.parts.filter(p => p.isBlank);
  const currentTargetBlank = blankParts[activeBlankIdx] || blankParts[0];

  // Leo Physics
  const leoRef = useRef({
    x: 80,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    onGround: true,
    onWagonId: null,
    hearts: 3,
    invincibleUntil: 0,
    animState: 'idle',
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 80, y: FLOOR_Y - LEO_HITBOX.height, animState: 'idle', facingRight: true, invincible: false
  });

  // Wagons train state
  const wagonsRef = useRef([]);
  const [wagonsDisplay, setWagonsDisplay] = useState([]);

  // Ground Zombie Hazard
  const zombieRef = useRef({
    x: 450, y: FLOOR_Y - 45, vx: 1.4, minX: 180, maxX: 750
  });
  const [zombieDisplay, setZombieDisplay] = useState({ x: 450, y: FLOOR_Y - 45 });

  const inputRef = useRef({ left: false, right: false, jump: false });
  const animFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Spawn train wagons for active blank
  const spawnWagons = useCallback((targetWord, options = []) => {
    const opts = options.length >= 3 ? options : [targetWord, 'jumping', 'talking'];
    const shuffled = [...opts].sort(() => Math.random() - 0.5);

    // Create 4 wagons (3 with words, 1 with Gremlin)
    const newWagons = shuffled.map((word, idx) => ({
      id: `wagon_${idx}_${Date.now()}`,
      text: word,
      isCorrect: word === targetWord,
      isGremlin: false,
      x: ROOM_WIDTH + idx * 220,
      y: WAGON_ROOF_Y,
      vx: -1.8 - (roundIdx * 0.2), // scrolls left
      width: WAGON_WIDTH,
      height: WAGON_HEIGHT,
      status: 'normal', // 'normal' | 'correct' | 'wrong'
    }));

    // Add Gremlin wagon
    newWagons.push({
      id: `gremlin_${Date.now()}`,
      text: '👾 GREMLIN',
      isCorrect: false,
      isGremlin: true,
      x: ROOM_WIDTH + shuffled.length * 220,
      y: WAGON_ROOF_Y,
      vx: -1.8 - (roundIdx * 0.2),
      width: WAGON_WIDTH,
      height: WAGON_HEIGHT,
      status: 'normal',
    });

    wagonsRef.current = newWagons;
    setWagonsDisplay([...newWagons]);
  }, [roundIdx]);

  // Initial wave spawn
  useEffect(() => {
    if (currentTargetBlank) {
      spawnWagons(currentTargetBlank.text, currentTargetBlank.options);
    }
  }, [roundIdx, activeBlankIdx, currentTargetBlank, spawnWagons]);

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
      const wagons = wagonsRef.current;
      const zombie = zombieRef.current;
      const now = Date.now();

      // 1. Move wagons from right to left
      for (const w of wagons) {
        w.x += w.vx;
        // Loop wagon if it scrolls off left edge
        if (w.x < -WAGON_WIDTH - 50) {
          w.x = ROOM_WIDTH + 50 + Math.random() * 80;
          w.status = 'normal';
        }
      }

      // 2. Leo Horizontal Movement
      if (input.left && !input.right) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (input.right && !input.left) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx = 0;
      }

      // 3. Jump
      if (input.jump && leo.onGround) {
        leo.vy = LEO_JUMP_FORCE;
        leo.onGround = false;
        leo.onWagonId = null;
        input.jump = false;
      }

      // 4. Gravity
      applyGravity(leo);

      // 5. Update position
      leo.x = clamp(leo.x + leo.vx, 0, ROOM_WIDTH - LEO_HITBOX.width);
      leo.y += leo.vy;

      // 6. Wagon Roof Collision & Surfing
      let landedOnWagon = null;
      for (const w of wagons) {
        // Leo foot is near roof top
        const leoFoot = leo.y + LEO_HITBOX.height;
        const wagonRoof = w.y;
        const horizOverlap = leo.x + LEO_HITBOX.width > w.x + 10 && leo.x < w.x + w.width - 10;

        if (horizOverlap && leoFoot >= wagonRoof && leoFoot <= wagonRoof + 18 && leo.vy >= 0) {
          landedOnWagon = w;
          leo.y = wagonRoof - LEO_HITBOX.height;
          leo.vy = 0;
          leo.onGround = true;
          leo.onWagonId = w.id;
          // Surf on wagon: push Leo along with wagon speed!
          leo.x = clamp(leo.x + w.vx, 0, ROOM_WIDTH - LEO_HITBOX.width);
          break;
        }
      }

      // Ground landing
      if (!landedOnWagon) {
        if (leo.y >= FLOOR_Y - LEO_HITBOX.height) {
          leo.y = FLOOR_Y - LEO_HITBOX.height;
          leo.vy = 0;
          leo.onGround = true;
          leo.onWagonId = null;
        } else {
          leo.onGround = false;
        }
      }

      // 7. Check Wagon Landing Trigger (Action)
      if (landedOnWagon && landedOnWagon.status === 'normal') {
        handleWagonTouch(landedOnWagon);
      }

      // 8. Ground Zombie Hazard
      const invincible = now < leo.invincibleUntil;
      if (!invincible && leo.y >= FLOOR_Y - LEO_HITBOX.height - 10) {
        const distToZombie = Math.abs((leo.x + 20) - (zombie.x + 25));
        if (distToZombie < 35) {
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

      // Patrol zombie
      zombie.x += zombie.vx;
      if (zombie.x <= zombie.minX || zombie.x >= zombie.maxX) {
        zombie.vx = -zombie.vx;
      }

      // Animation state
      if (!leo.onGround && leo.vy < 0) leo.animState = 'jump';
      else if (!leo.onGround && leo.vy > 0) leo.animState = 'fall';
      else if (input.left || input.right) leo.animState = leo.facingRight ? 'run_r' : 'run_l';
      else leo.animState = 'idle';

      // Sync display
      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setWagonsDisplay([...wagons]);
      setZombieDisplay({ x: zombie.x, y: zombie.y });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase]);

  // Handle Wagon Touch / Jump Landing
  const handleWagonTouch = (wagon) => {
    if (wagon.isGremlin) {
      // Gremlin trap!
      wagon.status = 'wrong';
      const leo = leoRef.current;
      leo.hearts = Math.max(0, leo.hearts - 1);
      leo.invincibleUntil = Date.now() + INVINCIBILITY_MS;
      leo.animState = 'hit';
      leo.vy = -6; // bounce off
      setHearts(leo.hearts);
      setBannerFeedback('❌ Watch out! Grammar Gremlin hazard!');
      setTimeout(() => setBannerFeedback(null), 2500);
      if (leo.hearts <= 0) setPhase('ko');
      return;
    }

    if (wagon.isCorrect) {
      // Correct Wagon!
      wagon.status = 'correct';
      setScore(s => s + 25);
      setFilledBlanks(fb => ({ ...fb, [activeBlankIdx]: wagon.text }));
      setBannerFeedback(`✨ Correct chunk: "${wagon.text}"!`);

      const nextBlank = activeBlankIdx + 1;
      if (nextBlank < blankParts.length) {
        // More blanks in this sentence
        setTimeout(() => {
          setActiveBlankIdx(nextBlank);
          setBannerFeedback(null);
        }, 1200);
      } else {
        // Completed entire sentence!
        speakText(currentRound.fullSentence, null, 1.0, null, 'sentence', weekNumber);
        setBannerFeedback(`🎉 Sentence Complete!`);

        setTimeout(() => {
          setBannerFeedback(null);
          const nextRound = roundIdx + 1;
          if (nextRound >= sentenceRounds.length) {
            setPhase('cleared');
          } else {
            setRoundIdx(nextRound);
            setActiveBlankIdx(0);
            setFilledBlanks({});
          }
        }, 2200);
      }
    } else {
      // Distractor wagon
      wagon.status = 'wrong';
      leoRef.current.vy = -5; // bump off
      setBannerFeedback(`⚠️ "${wagon.text}" doesn't fit here. Try another wagon!`);
      setTimeout(() => setBannerFeedback(null), 2000);
    }
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, sentenceRounds.length * 50);
    recordPersonalBest('word_wagon_jump', score);
    onComplete?.(stars, score);
  };

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setRoundIdx(0);
    setActiveBlankIdx(0);
    setFilledBlanks({});
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
    <div className="word-wagon-container" role="region" ref={gameContainerRef} aria-label="Word Wagon Jump">
      {/* ── Top Sentence Banner ─────────────────────────────────────── */}
      <div className="wagon-sentence-banner">
        <div className="sentence-train-badge">
          <Train size={16} />
          <span>TRAIN {roundIdx + 1}/{sentenceRounds.length}</span>
        </div>

        <div className="sentence-stream-view">
          {currentRound.parts.map((p, idx) => {
            if (!p.isBlank) {
              return <span key={idx} className="sentence-static-part">{p.text}</span>;
            }
            const bIdx = blankParts.findIndex(bp => bp.text === p.text);
            const isCurrentActive = bIdx === activeBlankIdx;
            const isFilled = filledBlanks[bIdx] !== undefined;

            return (
              <span
                key={idx}
                className={`sentence-blank-slot ${isCurrentActive ? 'slot-active' : ''} ${isFilled ? 'slot-filled' : ''}`}
              >
                {isFilled ? filledBlanks[bIdx] : `[ ${bIdx + 1}: ??? ]`}
              </span>
            );
          })}

          <button
            className="sentence-audio-btn"
            onClick={() => speakText(currentRound.fullSentence, null, 1.0, null, 'sentence', weekNumber)}
            aria-label="Listen to sentence"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {bannerFeedback && (
          <div className="wagon-feedback-toast">{bannerFeedback}</div>
        )}
      </div>

      {/* ── Game World ───────────────────────────────────────────────── */}
      <div className="wagon-world-viewport" style={scale < 1 ? scaleStyle : undefined}>
        {/* Train Tracks Layer */}
        <div className="wagon-tracks-layer" style={{ top: `${TRACK_Y}px` }}>
          <div className="steel-rail-top" />
          <div className="wooden-ties" />
          <div className="steel-rail-bottom" />
        </div>

        {/* Station Platform Left */}
        <div className="station-platform-left" style={{ top: `${TRACK_Y - 50}px` }}>
          <span className="station-sign">STATION 1</span>
        </div>

        {/* Ground Floor */}
        <div className="wagon-ground-floor" style={{ top: `${FLOOR_Y}px`, height: `${ROOM_HEIGHT - FLOOR_Y}px` }} />

        {/* Moving Wagons */}
        {wagonsDisplay.map((w) => (
          <div
            key={w.id}
            className={`train-wagon-entity wagon-${w.status} ${w.isGremlin ? 'wagon-gremlin' : ''}`}
            style={{
              left: `${w.x}px`,
              top: `${w.y}px`,
              width: `${w.width}px`,
              height: `${w.height}px`,
            }}
            onClick={() => handleWagonTouch(w)}
            role="button"
            tabIndex={0}
            aria-label={`Wagon: ${w.text}`}
          >
            {/* Wagon Roof Landing Surface */}
            <div className="wagon-roof-platform">
              <span className="wagon-roof-text">{w.text}</span>
            </div>
            {/* Wagon Body */}
            <div className="wagon-chassis">
              <div className="wagon-window" />
              <div className="wagon-window" />
            </div>
            {/* Wheels */}
            <div className="wagon-wheels">
              <div className="steel-wheel wheel-left" />
              <div className="steel-wheel wheel-right" />
            </div>
          </div>
        ))}

        {/* Ground Zombie Hazard */}
        <div
          className="ground-zombie-sprite"
          style={{ left: `${zombieDisplay.x}px`, top: `${zombieDisplay.y}px` }}
        >
          <span>🧟</span>
        </div>

        {/* Leo Player */}
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
        totalWords={sentenceRounds.length}
        floorNumber={1}
        doorLabel="Door 2 — Word Wagon Jump"
      />

      {/* ── Virtual D-Pad ────────────────────────────────────────────── */}
      <VirtualDPad {...dpadHandlers} visible={phase === 'playing'} />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="wagon-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>SYNTAX EXPRESS CLEARED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, sentenceRounds.length * 50))}
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
        <div className="wagon-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>DERAILED!</h2>
            <p>The Grammar Gremlins pushed Leo off the tracks!</p>
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
