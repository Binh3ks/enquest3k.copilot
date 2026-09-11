/**
 * WordForgeCarryEngine.jsx — Floor 7, Door 1 (Vocab) Mini-Game for Lexio's Chronicles
 *
 * Arcane Forge Platformer Engine (Phương án B):
 * - Forked from the physical Carry & Deposit platformer architecture of ScrollChamberDecode.
 * - Theme: The Arcane Blacksmith & Fiery Rune Forge.
 * - Target Word: 4–8 characters per round (e.g. SLIP, GRIP, WALK, CAMP, TENT).
 * - Central Anvil Deck with glowing letter anvil sockets (_ _ _ _).
 * - Physical Carry Mechanics:
 *     Leo runs across forge platforms, picks up glowing Rune Stones overhead,
 *     and leaps onto the Anvil Deck to forge the target word letter-by-letter.
 * - 2-Tier Matching:
 *     Tier 1: Rune character belongs to target word (filters distractors).
 *     Tier 2: Rune character matches the next sequential anvil slot.
 * - Correct forge:
 *     Rune locks into socket, glowing forge aura + sparks, +25 XP, TTS pronounces letter/word.
 * - Distractor / Wrong placement:
 *     Rune violently rebounds to its origin, red sparks blast, -1 Heart (3 -> 2), Leo flinches.
 * - Word Completion:
 *     Full word forged, radiant golden explosion, TTS speaks entire word, +50 XP bonus,
 *     and advances to next word with clean anti-leak state.
 * - Anti-Leak Invariant:
 *     All runes carry `targetRoundId`. Old runes are completely purged on round change.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Hammer, Sparkles, Flame, Trophy, RotateCcw, AlertTriangle, HelpCircle } from 'lucide-react';
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
import './WordForgeCarryEngine.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

// Forge platforms layout
const FORGE_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Molten Forge Ground
  { x: 60,  y: 380,     width: 190,        height: 18 },  // Lower Left Bellows Shelf
  { x: 650, y: 380,     width: 190,        height: 18 },  // Lower Right Crucible Shelf
  { x: 180, y: 240,     width: 540,        height: 22 },  // Upper Arcane Anvil Deck
  { x: 40,  y: 150,     width: 140,        height: 16 },  // High Chimney Left
  { x: 720, y: 150,     width: 140,        height: 16 },  // High Chimney Right
];

// Fallback curriculum words (4-6 chars optimal for platformer pacing)
const WEEK_33_FORGE_WORDS = [
  { word: 'SLIP', definition: 'To slide accidentally on a wet smooth floor' },
  { word: 'GRIP', definition: 'Strong friction hold between shoes and surface' },
  { word: 'WALK', definition: 'Move safely at a regular steady pace' },
  { word: 'CARE', definition: 'Serious attention to prevent accidents' },
];

const WEEK_35_FORGE_WORDS = [
  { word: 'CAMP', definition: 'To stay outdoors in a tent overnight' },
  { word: 'TENT', definition: 'A portable shelter made of canvas cloth' },
  { word: 'HIKE', definition: 'A long invigorating walk in the mountains' },
  { word: 'FIRE', definition: 'A warm crackling campfire at the campsite' },
];

const GENERIC_FORGE_WORDS = [
  { word: 'FORGE', definition: 'To heat and shape glowing metal on an anvil' },
  { word: 'RUNE',  definition: 'An ancient mystical symbol inscribed with power' },
  { word: 'BRAVE', definition: 'Ready to face danger without showing fear' },
  { word: 'SPARK', definition: 'A tiny fiery particle produced by a hammer strike' },
];

function getForgeWordsForWeek(weekNumber, vocabItems = []) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_FORGE_WORDS;
  if (w === 35) return WEEK_35_FORGE_WORDS;

  if (Array.isArray(vocabItems) && vocabItems.length > 0) {
    const valid = vocabItems
      .filter(v => v.word && v.word.length >= 3 && v.word.length <= 6 && !v.word.includes(' '))
      .map(v => ({ word: v.word.toUpperCase(), definition: v.definition_en || v.definition || '' }));
    if (valid.length >= 3) return valid.slice(0, 4);
  }

  return GENERIC_FORGE_WORDS;
}

// Preset spawn coordinates for letter runes
const RUNE_SPAWN_COORDS = [
  { x: 90,  y: 350 }, // Lower Left shelf
  { x: 730, y: 350 }, // Lower Right shelf
  { x: 80,  y: 120 }, // High Left shelf
  { x: 750, y: 120 }, // High Right shelf
  { x: 80,  y: 485 }, // Ground Far Left
  { x: 260, y: 485 }, // Ground Mid Left
  { x: 580, y: 485 }, // Ground Mid Right
  { x: 780, y: 485 }, // Ground Far Right
];

export default function WordForgeCarryEngine({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  weekData = null,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('word_forge_scramble') || 0;

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 900);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth || window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Words list for this session
  const wordsList = useMemo(() => {
    return getForgeWordsForWeek(weekNumber, vocabItems);
  }, [weekNumber, vocabItems]);

  const [roundIdx, setRoundIdx] = useState(0);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [showHelp, setShowHelp] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  // Current target word
  const currentWordItem = wordsList[roundIdx % wordsList.length] || wordsList[0];
  const targetWord = currentWordItem.word.toUpperCase();
  const targetLetters = useMemo(() => targetWord.split(''), [targetWord]);

  // Sockets on Anvil deck (next required letter index)
  const [placedIndices, setPlacedIndices] = useState([]); // [0, 1, ...] indices of forged letters
  const placedIndicesRef = useRef([]);
  placedIndicesRef.current = placedIndices;

  const [carryingRune, setCarryingRune] = useState(null); // rune currently carried overhead
  const carryingRuneRef = useRef(null);

  // Live tracking refs for accurate real-time test hooks (anti-stale-closure)
  const heartsRef = useRef(hearts);
  heartsRef.current = hearts;
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const roundIdxRef = useRef(roundIdx);
  roundIdxRef.current = roundIdx;

  // Runes available on platforms for current target word
  const runesRef = useRef([]); // [{ id, char, x, y, originX, originY, isPlaced, targetRoundId }]

  // Generate runes for current round
  const setupRunesForRound = useCallback((word, roundNum) => {
    const chars = word.split('');
    // 2-3 distractor letters not in the word
    const allAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const distractors = allAlphabet
      .filter(c => !chars.includes(c))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(3, 8 - chars.length));

    const combined = [
      ...chars.map((char, idx) => ({ char, isTarget: true, targetIndex: idx })),
      ...distractors.map(char => ({ char, isTarget: false, targetIndex: -1 }))
    ].sort(() => Math.random() - 0.5);

    const newRunes = combined.map((item, idx) => {
      const coord = RUNE_SPAWN_COORDS[idx % RUNE_SPAWN_COORDS.length];
      return {
        id: `rune_${roundNum}_${item.char}_${idx}_${Math.random()}`,
        char: item.char,
        isTarget: item.isTarget,
        x: coord.x,
        y: coord.y,
        originX: coord.x,
        originY: coord.y,
        isPlaced: false,
        targetRoundId: roundNum,
      };
    });

    runesRef.current = newRunes;
  }, []);

  // Initialize round state
  useEffect(() => {
    placedIndicesRef.current = [];
    setPlacedIndices([]);
    carryingRuneRef.current = null;
    setCarryingRune(null);
    setupRunesForRound(targetWord, roundIdx + 1);
  }, [roundIdx, targetWord, setupRunesForRound]);

  // Leo Physics state
  const leoRef = useRef({
    x: 430,
    y: 480,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facingRight: true,
    invincibleUntil: 0,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 430,
    y: 480,
    facingRight: true,
    animState: 'idle',
    invincible: false,
  });

  const keysPressed = useRef({ left: false, right: false, up: false, interact: false });
  const animFrameId = useRef(null);

  // ── Interact Action (Pick up Rune / Drop onto Anvil) ────────────────────
  const handleInteract = useCallback(() => {
    const leo = leoRef.current;
    if (phase !== 'playing' || showHelp) return;

    const carried = carryingRuneRef.current || carryingRune;

    // SCENARIO 1: LEO IS CARRYING A RUNE -> ATTEMPT TO DEPOSIT ONTO ANVIL DECK
    if (carried) {
      // Anvil Deck span: x between 180 and 720, y around 240
      const isNearAnvilDeck = (leo.x >= 180 && leo.x <= 720) && (leo.y >= 190 && leo.y <= 270);

      if (isNearAnvilDeck) {
        const currentIndices = placedIndicesRef.current;
        const nextRequiredIdx = currentIndices.length;
        const expectedLetter = targetLetters[nextRequiredIdx];

        // 2-TIER MATCHING:
        // Tier 1: Is this letter part of target word?
        // Tier 2: Does it match the next sequential slot required?
        if (carried.char === expectedLetter) {
          // ✨ SUCCESSFUL FORGE!
          const newPlaced = [...currentIndices, nextRequiredIdx];
          placedIndicesRef.current = newPlaced;
          setPlacedIndices(newPlaced);
          setScore(s => s + 25);
          speakText(carried.char);

          // Mark rune as placed
          const forgedChar = carried.char;
          runesRef.current = runesRef.current.map(r =>
            r.id === carried.id ? { ...r, isPlaced: true } : r
          );
          carryingRuneRef.current = null;
          setCarryingRune(null);

          const fbText = `✨ RUNE FORGED! Letter "${forgedChar}" hammered into anvil!`;
          setFeedback({ isCorrect: true, text: fbText });
          setTimeout(() => setFeedback(null), 1200);

          if (typeof window !== 'undefined') {
            window.__WORD_FORGE_EVENT_LOG__ = window.__WORD_FORGE_EVENT_LOG__ || [];
            window.__WORD_FORGE_EVENT_LOG__.push({
              type: 'correct',
              char: forgedChar,
              slot: nextRequiredIdx,
              round: roundIdx + 1,
              timestamp: Date.now(),
              text: fbText,
            });
          }

          // Check if full word completed!
          if (newPlaced.length === targetLetters.length) {
            setTimeout(() => {
              speakText(`Word Forged: ${targetWord}! Excellent craftsmanship!`);
              setScore(s => s + 50);

              if (roundIdx + 1 >= wordsList.length) {
                setPhase('cleared');
                const finalScore = score + 75 + (timeLeft * 2);
                setScore(finalScore);
                recordPersonalBest('word_forge_scramble', finalScore);
              } else {
                // Advance to next word & wipe old runes (Anti-Leak)
                runesRef.current = [];
                placedIndicesRef.current = [];
                setPlacedIndices([]);
                setRoundIdx(r => r + 1);
              }
            }, 800);
          }

        } else {
          // ⚡ REJECTED / DISTRACTOR / WRONG SEQUENCE!
          const isInvincible = Date.now() < leo.invincibleUntil;
          if (!isInvincible) {
            setHearts(hp => {
              const nextHp = Math.max(0, hp - 1);
              if (nextHp === 0) setPhase('ko');
              return nextHp;
            });
            leo.invincibleUntil = Date.now() + 1600;

            const fbText = `⚡ FORGE REJECTED! "${carried.char}" does not match slot ${nextRequiredIdx + 1}!`;
            setFeedback({ isCorrect: false, text: fbText });
            setTimeout(() => setFeedback(null), 1200);

            if (typeof window !== 'undefined') {
              window.__WORD_FORGE_EVENT_LOG__ = window.__WORD_FORGE_EVENT_LOG__ || [];
              window.__WORD_FORGE_EVENT_LOG__.push({
                type: 'wrong',
                char: carried.char,
                expected: expectedLetter,
                round: roundIdx + 1,
                timestamp: Date.now(),
                text: fbText,
              });
            }

            // Return rune to its origin
            const returnId = carried.id;
            runesRef.current = runesRef.current.map(r =>
              r.id === returnId ? { ...r, x: r.originX, y: r.originY } : r
            );
            carryingRuneRef.current = null;
            setCarryingRune(null);
          }
        }
      } else {
        // Dropped outside anvil deck: put down at current position
        const dropId = carried.id;
        runesRef.current = runesRef.current.map(r =>
          r.id === dropId ? { ...r, x: leo.x, y: leo.y } : r
        );
        carryingRuneRef.current = null;
        setCarryingRune(null);
      }
      return;
    }

    // SCENARIO 2: LEO IS EMPTY-HANDED -> PICK UP CLOSEST RUNE
    const availableRunes = runesRef.current.filter(r => !r.isPlaced);
    let closestRune = null;
    let closestDist = 65;

    for (const rune of availableRunes) {
      const d = Math.hypot((leo.x + 20) - (rune.x + 20), (leo.y + 24) - (rune.y + 20));
      if (d < closestDist) {
        closestDist = d;
        closestRune = rune;
      }
    }

    if (closestRune) {
      carryingRuneRef.current = closestRune;
      setCarryingRune(closestRune);
    }
  }, [carryingRune, phase, showHelp, placedIndices, targetLetters, targetWord, roundIdx, wordsList.length, score, timeLeft, recordPersonalBest]);

  // ── Keyboard Controls ──────────────────────────────────────────────────
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
        handleInteract();
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
  }, [handleInteract]);

  // ── Gesture controls for touch devices ──────────────────────────────────
  const { onTouchStart, onTouchMove, onTouchEnd } = useGestureControls({
    onSwipeLeft:  () => { keysPressed.current.left = true; setTimeout(() => keysPressed.current.left = false, 250); },
    onSwipeRight: () => { keysPressed.current.right = true; setTimeout(() => keysPressed.current.right = false, 250); },
    onSwipeUp:    () => { keysPressed.current.up = true; setTimeout(() => keysPressed.current.up = false, 250); },
    onTap:        handleInteract,
  });

  // ── Main Physics & Game Loop ────────────────────────────────────────────
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const gameLoop = (now) => {
      const dt = showHelp ? 0 : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const leo = leoRef.current;

      // Horizontal movement
      if (keysPressed.current.left) {
        leo.vx = -LEO_SPEED;
        leo.facingRight = false;
      } else if (keysPressed.current.right) {
        leo.vx = LEO_SPEED;
        leo.facingRight = true;
      } else {
        leo.vx *= 0.78; // Platform friction
      }

      // Jump
      if (keysPressed.current.up && leo.isGrounded) {
        leo.vy = LEO_JUMP_FORCE;
        leo.isGrounded = false;
      }

      // Apply Gravity
      applyGravity(leo, dt);

      // Horizontal position
      leo.x = clamp(leo.x + leo.vx * dt, 10, ROOM_WIDTH - LEO_HITBOX.width - 10);

      // Platform Landing & Collision Check
      const landed = checkPlatformLanding(leo, FORGE_PLATFORMS, dt);
      if (landed) {
        leo.isGrounded = true;
        leo.vy = 0;
      }

      // Determine Animation state
      let animState = 'idle';
      if (!leo.isGrounded) {
        animState = 'jump';
      } else if (Math.abs(leo.vx) > 15) {
        animState = 'run';
      }

      const isInvincible = Date.now() < leo.invincibleUntil;

      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        facingRight: leo.facingRight,
        animState,
        invincible: isInvincible,
      });

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [showHelp]);

  // ── Countdown Timer ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setPhase('ko');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, showHelp]);

  // ── Expose Test Hook for Automated Verification ─────────────────────────
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__WORD_FORGE_EVENT_LOG__ = window.__WORD_FORGE_EVENT_LOG__ || [];
      window.__WORD_FORGE_TEST_HOOK__ = {
        getScore: () => scoreRef.current,
        getHearts: () => heartsRef.current,
        getRoundIdx: () => roundIdxRef.current,
        getTargetWord: () => targetWord,
        getCurrentRunes: () => runesRef.current,
        getPlacedIndices: () => placedIndices,
        getStaleRunes: (roundNum) => runesRef.current.filter(r => r.targetRoundId === roundNum),
        setHeartsVal: (hp) => setHearts(hp),
        resetInvincible: () => {
          leoRef.current.invincibleUntil = 0;
        },
        clearRunes: () => {
          runesRef.current = [];
          setFeedback(null);
        },
        // Teleport Leo directly to position
        setLeoPosition: (x, y) => {
          leoRef.current.x = x;
          leoRef.current.y = y;
          leoRef.current.vx = 0;
          leoRef.current.vy = 0;
        },
        // Simulate picking up specific rune
        simulatePickupRune: (char) => {
          const r = runesRef.current.find(item => item.char === char && !item.isPlaced);
          if (r) {
            carryingRuneRef.current = r;
            setCarryingRune(r);
          }
          return !!r;
        },
        // Simulate interacting / depositing
        triggerInteract: () => {
          handleInteract();
        },
        // Direct inject test rune to trigger forge
        injectRune: (char, isTarget, x = 350, y = 230) => {
          const currentRoundId = roundIdxRef.current + 1;
          const testRune = {
            id: `test_rune_${Date.now()}_${char}`,
            char,
            isTarget,
            x,
            y,
            originX: x,
            originY: y,
            isPlaced: false,
            targetRoundId: currentRoundId,
          };
          runesRef.current = [...runesRef.current, testRune];
          return testRune;
        },
        advanceToRound: (idx) => {
          setFeedback(null);
          runesRef.current = [];
          setPlacedIndices([]);
          setCarryingRune(null);
          setRoundIdx(idx);
        },
      };
    }
  }, [roundIdx, targetWord, placedIndices, handleInteract]);

  // Compute Responsive Scale factor
  const scale = Math.min(containerWidth / ROOM_WIDTH, 1.05);

  return (
    <div
      className="word-forge-chamber"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── HUD ── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        totalTime={duration}
      />

      <FloatingExitBtn onExit={onExit} />

      {/* ── Scaled Game Arena ── */}
      <div
        className="forge-arena-scaled"
        style={{
          width: ROOM_WIDTH,
          height: ROOM_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* ── Background Forge Furnace Glow ── */}
        <div className="forge-background">
          <div className="furnace-glow" />
          <div className="forge-chimney-smoke" />
        </div>

        {/* ── Platforms ── */}
        {FORGE_PLATFORMS.map((plat, pIdx) => (
          <div
            key={pIdx}
            className={`forge-platform ${pIdx === 3 ? 'platform-anvil-deck' : ''}`}
            style={{
              left: plat.x,
              top: plat.y,
              width: plat.width,
              height: plat.height,
            }}
          >
            {pIdx === 3 && <div className="anvil-deck-glow" />}
          </div>
        ))}

        {/* ── Central Arcane Anvil on Deck ── */}
        <div className="arcane-anvil-structure" style={{ left: 240, top: 180 }}>
          <div className="anvil-header">
            <Hammer className="anvil-hammer-icon" size={20} />
            <span className="anvil-title">ARCANE WORD FORGE</span>
            <span className="anvil-hint-def">{currentWordItem.definition}</span>
          </div>

          {/* Sockets for Letters */}
          <div className="anvil-sockets-row">
            {targetLetters.map((char, sIdx) => {
              const isForged = placedIndices.includes(sIdx);
              const isNextTarget = sIdx === placedIndices.length;
              return (
                <div
                  key={sIdx}
                  className={`anvil-letter-socket ${isForged ? 'socket-forged' : ''} ${isNextTarget ? 'socket-next-target' : ''}`}
                >
                  {isForged ? (
                    <span className="forged-letter">{char}</span>
                  ) : (
                    <span className="empty-socket-dash">_</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Rune Stones Scattered on Platforms ── */}
        {runesRef.current.map((rune) => {
          if (rune.isPlaced) return null;
          const isCarried = carryingRune?.id === rune.id;
          if (isCarried) return null; // Rendered overhead of Leo

          return (
            <div
              key={rune.id}
              className="forge-rune-stone"
              style={{ left: rune.x, top: rune.y }}
            >
              <span className="rune-letter">{rune.char}</span>
            </div>
          );
        })}

        {/* ── Leo Player Character ── */}
        <div
          className={`forge-leo-wrapper ${leoDisplay.invincible ? 'leo-flinch' : ''}`}
          style={{
            left: leoDisplay.x,
            top: leoDisplay.y,
            transform: leoDisplay.facingRight ? 'scaleX(1)' : 'scaleX(-1)',
          }}
        >
          <LeoCharacter
            animState={leoDisplay.animState}
            facingRight={leoDisplay.facingRight}
          />

          {/* Carried Rune Overhead */}
          {carryingRune && (
            <div className="carried-overhead-rune">
              <span>{carryingRune.char}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Toast Feedback ── */}
      {feedback && (
        <div className={`forge-toast-pill ${feedback.isCorrect ? 'toast-correct' : 'toast-wrong'}`}>
          {feedback.isCorrect ? <Sparkles size={18} /> : <AlertTriangle size={18} />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* ── Game Instructions Modal ── */}
      {showHelp && (
        <GameInstructionModal
          gameName="Word Forge Scramble"
          instructions="Leap across forge platforms, carry glowing Rune Stones overhead, and deposit them onto the Arcane Anvil to forge the target word letter-by-letter in sequence! Beware of distractors!"
          onClose={() => setShowHelp(false)}
        />
      )}

      {/* ── Victory / Cleared Screen ── */}
      {phase === 'cleared' && (
        <div className="forge-game-modal cleared-modal">
          <div className="forge-modal-content">
            <Trophy size={64} className="trophy-icon" />
            <h2>MASTER BLACKSMITH!</h2>
            <p>All target words forged with legendary craftsmanship!</p>
            <p className="cleared-score">Final Score: <strong>{score} XP</strong></p>
            <button className="forge-btn-primary" onClick={onExit}>
              Collect Rewards & Return
            </button>
          </div>
        </div>
      )}

      {/* ── KO / Defeat Screen ── */}
      {phase === 'ko' && (
        <div className="forge-game-modal ko-modal">
          <div className="forge-modal-content">
            <AlertTriangle size={64} className="ko-icon" />
            <h2>FORGE EXTINGUISHED!</h2>
            <p>Too many misaligned runes cracked the anvil seal!</p>
            <button
              className="forge-btn-primary"
              onClick={() => {
                setHearts(3);
                setTimeLeft(duration);
                setScore(0);
                setPlacedIndices([]);
                setCarryingRune(null);
                setPhase('playing');
              }}
            >
              <RotateCcw size={18} /> Rekindle the Forge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
