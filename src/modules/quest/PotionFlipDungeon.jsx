/**
 * PotionFlipDungeon.jsx — Floor 2, Door 1 (Vocab) Mini-Game for Lexio's Quest
 * GDD §2 Floor 2 Room A: "POTION FLIP DUNGEON"
 *
 * Replaces static 2D card flipping with physical platformer cauldron jumping:
 * - Alchemy Lab setting with cauldrons situated on stone platforms
 * - Leo physically jumps and lands on cauldrons to flip & reveal hidden cards
 * - Match word ↔ definition pairs by jumping between cauldrons
 * - Matching pair: emerald potion splash celebration + permanent unlock +25 XP
 * - Mismatch: poison gas puff + cauldrons flip back down after 1.5s
 * - Lab Gremlin patrol enemy
 * - Full Virtual D-Pad (mobile) + Arrow Keys / WASD (desktop) support
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FlaskConical, Trophy, Timer, Sparkles, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
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
import './PotionFlipDungeon.css';

const ROOM_WIDTH = 900;
const ROOM_HEIGHT = 600;

const ALCHEMY_PLATFORMS = [
  { x: 0,   y: FLOOR_Y, width: ROOM_WIDTH, height: 80 },  // Ground
  { x: 60,  y: 410,     width: 240,        height: 18 },  // Tier 1 Left
  { x: 340, y: 370,     width: 220,        height: 18 },  // Tier 1 Mid
  { x: 600, y: 410,     width: 240,        height: 18 },  // Tier 1 Right
  { x: 180, y: 240,     width: 200,        height: 18 },  // Tier 2 Left
  { x: 520, y: 240,     width: 200,        height: 18 },  // Tier 2 Right
];

const FALLBACK_PAIRS = [
  { id: 'p1', word: 'friction',   def: 'Resistance when surfaces rub' },
  { id: 'p2', word: 'laboratory', def: 'Room for science experiments' },
  { id: 'p3', word: 'traction',   def: 'Grip of shoes on the floor' },
  { id: 'p4', word: 'slippery',   def: 'Difficult to hold or walk on' },
  { id: 'p5', word: 'gravity',    def: 'Force pulling objects down' },
];

const CAULDRON_SLOTS = [
  { x: 90,  y: 360 }, // Tier 1 Left
  { x: 210, y: 360 }, // Tier 1 Left
  { x: 370, y: 320 }, // Tier 1 Mid
  { x: 470, y: 320 }, // Tier 1 Mid
  { x: 630, y: 360 }, // Tier 1 Right
  { x: 740, y: 360 }, // Tier 1 Right
  { x: 200, y: 190 }, // Tier 2 Left
  { x: 310, y: 190 }, // Tier 2 Left
  { x: 540, y: 190 }, // Tier 2 Right
  { x: 650, y: 190 }, // Tier 2 Right
];

function normalizeText(str) {
  return (str || '').trim().toLowerCase().replace(/[.,!?;:'"\\-]/g, '').replace(/\s+/g, ' ');
}

function fisherYatesShuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isNearDuplicate(itemA, itemB) {
  if (!itemA || !itemB) return false;
  const wA = (itemA.word || '').toLowerCase().trim();
  const wB = (itemB.word || '').toLowerCase().trim();
  if (!wA || !wB) return false;

  // 1. Substring containment (e.g. "corridor" in "school corridor", "warning sign" in "yellow warning sign")
  if (wA.includes(wB) || wB.includes(wA)) {
    return true;
  }

  // 2. Shared root noun in compound phrases (e.g. soles, tiles, sign)
  const getTokens = (str) => str.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  const tokensA = getTokens(wA);
  const tokensB = getTokens(wB);
  const shared = tokensA.filter(t => tokensB.includes(t) && t.length >= 4);
  if (shared.length > 0) {
    return true;
  }

  // 3. Definition Jaccard similarity >= 0.25 (catches rewrites describing the same concept)
  const dA = (itemA.def || itemA.definition || itemA.definition_en || '').toLowerCase();
  const dB = (itemB.def || itemB.definition || itemB.definition_en || '').toLowerCase();
  if (dA && dB) {
    const defA = new Set(getTokens(dA).filter(t => t.length > 3));
    const defB = new Set(getTokens(dB).filter(t => t.length > 3));
    let inter = 0;
    for (const t of defA) if (defB.has(t)) inter++;
    const union = new Set([...defA, ...defB]).size;
    if (union > 0 && inter / union >= 0.25) {
      return true;
    }
  }

  return false;
}

function generateCauldrons(vocabItems = [], weekNumber = 33) {
  const valid = vocabItems.filter(v => v.word && (v.definition || v.def || v.definition_en));
  
  // Build unique distinct pools separated by week
  const currentWeekPool = [];
  const reviewPool = [];
  const seenWords = new Set();
  const seenDefs = new Set();

  for (const item of valid) {
    const rawWord = item.word;
    const rawDef = item.definition || item.def || item.definition_en;
    const normWord = normalizeText(rawWord);
    const normDef = normalizeText(rawDef);
    if (!normWord || !normDef) continue;

    if (!seenWords.has(normWord) && !seenDefs.has(normDef)) {
      seenWords.add(normWord);
      seenDefs.add(normDef);
      const entry = {
        word: rawWord.trim(),
        def: rawDef.trim(),
        source: !item.isReview ? `week${weekNumber}` : (item.weekId ? `review(w${item.weekId})` : 'review'),
      };
      if (!item.isReview) {
        currentWeekPool.push(entry);
      } else {
        reviewPool.push(entry);
      }
    }
  }

  // Fisher-Yates shuffle current week items with near-duplicate guard
  const shuffledCurrent = fisherYatesShuffle(currentWeekPool);
  const selected = [];
  for (const item of shuffledCurrent) {
    if (!selected.some(sel => isNearDuplicate(item, sel))) {
      selected.push(item);
      if (selected.length >= 5) break;
    }
  }

  // If current week has < 5, supplement from reviewPool (guarded against near-duplicates)
  if (selected.length < 5) {
    const shuffledReview = fisherYatesShuffle(reviewPool);
    for (const item of shuffledReview) {
      if (!selected.some(sel => isNearDuplicate(item, sel))) {
        selected.push(item);
        if (selected.length >= 5) break;
      }
    }
  }

  // If still < 5, supplement from FALLBACK_PAIRS (guarded against near-duplicates)
  if (selected.length < 5) {
    for (const fb of FALLBACK_PAIRS) {
      const normWord = normalizeText(fb.word);
      const normDef = normalizeText(fb.def);
      if (!seenWords.has(normWord) && !seenDefs.has(normDef)) {
        seenWords.add(normWord);
        seenDefs.add(normDef);
        const fbEntry = {
          word: fb.word,
          def: fb.def,
          source: 'FALLBACK',
        };
        if (!selected.some(sel => isNearDuplicate(fbEntry, sel))) {
          selected.push(fbEntry);
        }
      }
      if (selected.length >= 5) break;
    }
  }

  // Safe degradation: if still < 5, fill from FALLBACK_PAIRS
  if (selected.length < 5) {
    console.error(`[PotionFlipDungeon Error] Fewer than 5 distinct pairs (${selected.length}). Degrading safely with fallbacks.`);
    for (const fb of FALLBACK_PAIRS) {
      if (selected.length >= 5) break;
      selected.push({
        word: fb.word,
        def: fb.def,
        source: 'FALLBACK',
      });
    }
  }

  // Log each pair with its exact source
  selected.forEach((p, idx) => {
    console.log(`[POTION-INIT] pair ${idx + 1}: "${p.word}" ← source=${p.source}`);
  });

  const cards = [];
  const epochSalt = Date.now();
  selected.forEach((item, idx) => {
    cards.push({ id: `w_${idx}_${epochSalt}`, pairId: `pair_${idx}_${epochSalt}`, text: item.word, isWord: true });
    cards.push({ id: `d_${idx}_${epochSalt}`, pairId: `pair_${idx}_${epochSalt}`, text: item.def, isWord: false });
  });

  // Fisher-Yates shuffle both cards and cauldron platform slots
  const shuffledCards = fisherYatesShuffle(cards);
  const shuffledSlots = fisherYatesShuffle(CAULDRON_SLOTS);

  const finalCauldrons = shuffledCards.map((c, i) => ({
    ...c,
    x: shuffledSlots[i].x,
    y: shuffledSlots[i].y,
    matched: false,
  }));

  // Forensic logging of slot layout coordinates
  console.log(`[POTION-INIT] slot layout: [${finalCauldrons.map(c => `{"x":${c.x},"y":${c.y}}`).join(',')}]`);

  return finalCauldrons;
}

export default function PotionFlipDungeon({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('potion_flip_dungeon') || 0;
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

  const initializedWithRealVocabRef = useRef(false);

  // Lazy initial state: if vocabItems already provided, generate immediately; else wait for async data
  const [cauldronsDisplay, setCauldronsDisplay] = useState(() => {
    if (vocabItems && vocabItems.length > 0) {
      initializedWithRealVocabRef.current = true;
      return generateCauldrons(vocabItems, weekNumber);
    }
    return [];
  });

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [hearts, setHearts] = useState(2);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  // Cauldrons state
  const cauldronsRef = useRef(cauldronsDisplay);
  const [activeCauldronId, setActiveCauldronId] = useState(null);
  const [nearbyCauldronId, setNearbyCauldronId] = useState(null);
  const lastSpokenCauldronRef = useRef(null);
  const handleInteractRef = useRef(null);

  // One-time initialization when async vocabItems arrive from parent
  useEffect(() => {
    if (!initializedWithRealVocabRef.current) {
      if (vocabItems && vocabItems.length > 0) {
        initializedWithRealVocabRef.current = true;
        const fresh = generateCauldrons(vocabItems, weekNumber);
        cauldronsRef.current = fresh;
        setCauldronsDisplay(fresh);
      } else {
        const timer = setTimeout(() => {
          if (!initializedWithRealVocabRef.current) {
            initializedWithRealVocabRef.current = true;
            const fresh = generateCauldrons([], weekNumber);
            cauldronsRef.current = fresh;
            setCauldronsDisplay(fresh);
          }
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [vocabItems, weekNumber]);

  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__CAULDRONS__ = cauldronsRef.current;
    }
  }, [cauldronsDisplay]);

  // Leo Physics
  const leoRef = useRef({
    x: 80,
    y: FLOOR_Y - LEO_HITBOX.height,
    vx: 0,
    vy: 0,
    onGround: true,
    hearts: 2,
    invincibleUntil: 0,
    animState: 'idle',
    facingRight: true,
  });

  const [leoDisplay, setLeoDisplay] = useState({
    x: 80, y: FLOOR_Y - LEO_HITBOX.height, animState: 'idle', facingRight: true, invincible: false
  });

  // Lab Gremlin enemy
  const gremlinRef = useRef({
    x: 420, y: FLOOR_Y - 45, vx: 1.6, minX: 180, maxX: 720
  });
  const [gremlinDisplay, setGremlinDisplay] = useState({ x: 420, y: FLOOR_Y - 45 });

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
      if (['KeyE', 'Enter', 'KeyF'].includes(e.code)) {
        if (!e.repeat) handleInteractRef.current?.();
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
      const cauldrons = cauldronsRef.current;
      const gremlin = gremlinRef.current;
      const now = Date.now();

      // 1. Leo Horizontal Movement
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
      const landed = checkPlatformLanding(leo, ALCHEMY_PLATFORMS);
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

      // 7. Cauldron Proximity Detection (Peek when close: dist < 55px)
      let foundNearby = null;
      for (const c of cauldrons) {
        if (c.matched) continue;
        const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
        const cCenter = { x: c.x + 25, y: c.y + 25 };
        const dist = Math.hypot(leoCenter.x - cCenter.x, leoCenter.y - cCenter.y);

        if (dist < 55) {
          foundNearby = c;
          break;
        }
      }

      if (foundNearby) {
        if (lastSpokenCauldronRef.current !== foundNearby.id) {
          lastSpokenCauldronRef.current = foundNearby.id;
          console.log(`[POTION-ACTION] [PEEK] id=${foundNearby.id} text="${foundNearby.text}" epoch=${Date.now()}`);
          speakText(foundNearby.text, null, 1.0, null, foundNearby.isWord ? 'word' : 'sentence', weekNumber);
        }
        setNearbyCauldronId(foundNearby.id);
      } else {
        lastSpokenCauldronRef.current = null;
        setNearbyCauldronId(null);
      }

      // 8. Gremlin Enemy Collision
      if (!invincible) {
        const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
        const gremlinCenter = { x: gremlin.x + 20, y: gremlin.y + 20 };
        const dist = Math.hypot(leoCenter.x - gremlinCenter.x, leoCenter.y - gremlinCenter.y);

        if (dist < 36) {
          leo.hearts = Math.max(0, leo.hearts - 1);
          leo.invincibleUntil = now + INVINCIBILITY_MS;
          leo.animState = 'hit';
          setHearts(leo.hearts);
          if (leo.hearts <= 0) {
            console.log('[POTION-ACTION] KO_TRIGGERED gremlin');
            setPhase('ko');
            return;
          }
        }
      }

      // Gremlin Patrol
      gremlin.x += gremlin.vx;
      if (gremlin.x <= gremlin.minX || gremlin.x >= gremlin.maxX) {
        gremlin.vx = -gremlin.vx;
      }

      // Sync display
      setLeoDisplay({
        x: leo.x,
        y: leo.y,
        animState: leo.animState,
        facingRight: leo.facingRight,
        invincible: now < leo.invincibleUntil,
      });
      setCauldronsDisplay([...cauldrons]);
      setGremlinDisplay({ x: gremlin.x, y: gremlin.y });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, activeCauldronId, weekNumber]);

  // Handle Cauldron Commit / Action
  const handleCauldronAction = useCallback((c) => {
    if (phase !== 'playing' || c.matched) return;

    if (!activeCauldronId) {
      // Step 1: Select active cauldron
      setActiveCauldronId(c.id);
      setFeedback(`Selected: "${c.text}". Now find and interact with its match!`);
      console.log(`[POTION-ACTION] SELECT_CAULDRON id=${c.id} text="${c.text}"`);
    } else if (activeCauldronId === c.id) {
      // Deselect
      setActiveCauldronId(null);
      setFeedback(`Deselected: "${c.text}"`);
      console.log(`[POTION-ACTION] DESELECT_CAULDRON id=${c.id}`);
    } else {
      // Step 2: Commit match between activeCauldron and c
      const firstCauldron = cauldronsRef.current.find(item => item.id === activeCauldronId);
      if (!firstCauldron) return;

      if (firstCauldron.pairId === c.pairId) {
        // MATCH SUCCESS!
        firstCauldron.matched = true;
        c.matched = true;
        setActiveCauldronId(null);
        setScore(s => s + 20);
        console.log(`[POTION-ACTION] [MATCH] MATCH_SUCCESS pair=${c.pairId} score=${score + 20} epoch=${Date.now()}`);
        setFeedback(`✨ POTION BREWED! Matched "${firstCauldron.text}" ↔ "${c.text}" (+20 XP)`);

        // Check if all matched
        const allMatched = cauldronsRef.current.every(item => item.matched);
        if (allMatched) {
          console.log(`[POTION-ACTION] ALL_PAIRS_CLEARED epoch=${Date.now()}`);
          setTimeout(() => setPhase('cleared'), 1200);
        }
      } else {
        // MISMATCH PENALTY
        const nextHearts = Math.max(0, leoRef.current.hearts - 1);
        leoRef.current.hearts = nextHearts;
        setHearts(nextHearts);
        console.log(`[POTION-ACTION] [MISMATCH] MISMATCH_PENALTY heartsLeft=${nextHearts} pairA=${firstCauldron.pairId} pairB=${c.pairId} epoch=${Date.now()}`);
        setFeedback('🧪 POISON GAS! Mismatch (-1 Heart). Selection reset!');

        if (nextHearts <= 0) {
          console.log(`[POTION-ACTION] KO_TRIGGERED hearts=0 epoch=${Date.now()}`);
          setPhase('ko');
          return;
        }

        setTimeout(() => {
          setActiveCauldronId(null);
          setFeedback(null);
        }, 1200);
      }
    }
  }, [phase, activeCauldronId]);

  const handleInteractWithNearby = useCallback(() => {
    if (phase !== 'playing') return;
    const leo = leoRef.current;
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
    const cauldrons = cauldronsRef.current;

    let target = null;
    let minDist = 55;
    for (const c of cauldrons) {
      if (c.matched) continue;
      const cCenter = { x: c.x + 25, y: c.y + 25 };
      const dist = Math.hypot(leoCenter.x - cCenter.x, leoCenter.y - cCenter.y);
      if (dist < minDist) {
        minDist = dist;
        target = c;
      }
    }

    if (target) {
      handleCauldronAction(target);
    }
  }, [phase, handleCauldronAction]);

  useEffect(() => {
    handleInteractRef.current = handleInteractWithNearby;
  }, [handleInteractWithNearby]);

  const handleCauldronClick = (c) => {
    const leo = leoRef.current;
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
    const cCenter = { x: c.x + 25, y: c.y + 25 };
    const dist = Math.hypot(leoCenter.x - cCenter.x, leoCenter.y - cCenter.y);

    if (dist > 55) {
      console.warn(`[PROXIMITY_GUARD_REJECTED] Leo distance ${dist.toFixed(1)}px > 55px for cauldron ${c.id} epoch=${Date.now()}`);
      setFeedback('Leo is too far! Move closer to inspect or select this cauldron.');
      return;
    }
    handleCauldronAction(c);
  };

  const matchedCount = cauldronsDisplay.filter(c => c.matched).length / 2;

  const handleFinalFinish = () => {
    const stars = calculateStars(score, 100);
    recordPersonalBest('potion_flip_dungeon', score);
    onComplete?.(stars, score);
  };

  const handleRetry = () => {
    console.log(`[POTION-ACTION] [RETRY] handleRetry epoch=${Date.now()}`);
    setHearts(2);
    leoRef.current.hearts = 2;
    leoRef.current.x = 80;
    leoRef.current.y = FLOOR_Y - LEO_HITBOX.height;
    leoRef.current.vx = 0;
    leoRef.current.vy = 0;
    setScore(0);
    setTimeLeft(duration);
    const freshCauldrons = generateCauldrons(vocabItems, weekNumber);
    cauldronsRef.current = freshCauldrons;
    setCauldronsDisplay(freshCauldrons);
    setActiveCauldronId(null);
    setNearbyCauldronId(null);
    lastSpokenCauldronRef.current = null;
    setPhase('playing');
  };

  // Gesture Controls for PotionFlipDungeon — Continuous holding movement + jump
  const { gestureRef } = useGestureControls({
    onMoveLeftStart: () => { inputRef.current.left = true; },
    onMoveLeftEnd:   () => { inputRef.current.left = false; },
    onMoveRightStart: () => { inputRef.current.right = true; },
    onMoveRightEnd:   () => { inputRef.current.right = false; },
    onTapLeft: () => {
      inputRef.current.left = true;
      setTimeout(() => { inputRef.current.left = false; }, 260);
    },
    onTapRight: () => {
      inputRef.current.right = true;
      setTimeout(() => { inputRef.current.right = false; }, 260);
    },
    onDoubleTap: () => {
      inputRef.current.jump = true;
      setTimeout(() => { inputRef.current.jump = false; }, 220);
    },
    onSwipeUp: () => {
      inputRef.current.jump = true;
      setTimeout(() => { inputRef.current.jump = false; }, 220);
    },
    onSwipeLeft: () => {
      inputRef.current.left = true;
      setTimeout(() => { inputRef.current.left = false; }, 360);
    },
    onSwipeRight: () => {
      inputRef.current.right = true;
      setTimeout(() => { inputRef.current.right = false; }, 360);
    },
    enabled: phase === 'playing',
  });

  const cameraX = Math.max(0, Math.min(ROOM_WIDTH - containerWidth, leoDisplay.x - containerWidth / 2));

  return (
    <div className="potion-flip-container" role="region" ref={containerRef} aria-label="Potion Flip Dungeon">
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Gesture Touch Layer ── */}
      <div ref={gestureRef} className="potion-gesture-layer" />

      {/* ── Top Objective Banner ────────────────────────────────────── */}
      <div className="potion-mission-banner">
        <div className="potion-badge">
          <FlaskConical size={14} />
          <span>{matchedCount}/5 BREWED</span>
        </div>
        <div className="potion-hint-text">
          {feedback || "Walk near cauldrons to peek, press [E] to select & match!"}
        </div>
      </div>

      {/* ── Game World (Canvas/DOM Viewport with smooth Camera follow) ─ */}
      <div
        className="potion-world-viewport"
        style={{
          width: `${ROOM_WIDTH}px`,
          transform: containerWidth < ROOM_WIDTH ? `translateX(-${cameraX}px)` : 'none',
        }}
      >
        {/* Alchemy Ambient Background */}
        <div className="potion-bg-glow" />

        {/* Platforms */}
        {ALCHEMY_PLATFORMS.map((p, idx) => (
          <div
            key={idx}
            className={`alchemy-platform ${idx === 0 ? 'platform-floor' : 'platform-stone'}`}
            style={{ left: `${p.x}px`, top: `${p.y}px`, width: `${p.width}px`, height: `${p.height}px` }}
          />
        ))}

        {/* Cauldrons */}
        {cauldronsDisplay.map((c) => {
          const isPeeked = nearbyCauldronId === c.id;
          const isSelected = activeCauldronId === c.id;
          const isVisible = isPeeked || isSelected || c.matched;

          return (
            <div
              key={c.id}
              data-id={c.id}
              data-pair-id={c.pairId}
              className={`cauldron-entity ${isSelected ? 'cauldron-active' : ''} ${c.matched ? 'cauldron-matched' : ''}`}
              style={{ left: `${c.x}px`, top: `${c.y}px` }}
              onClick={() => handleCauldronClick(c)}
              role="button"
              tabIndex={0}
              aria-label={`Cauldron: ${isVisible ? c.text : 'hidden'}`}
            >
              {/* Proximity Interact Prompt Badge */}
              {isPeeked && !c.matched && (
                <div className="cauldron-interact-badge">
                  {isSelected ? '[E] Deselect' : (activeCauldronId ? '[E] Match' : '[E] Select')}
                </div>
              )}

              {/* Revealed Card Bubble */}
              {isVisible && (
                <div className="cauldron-card-reveal">
                  <span>{c.text}</span>
                </div>
              )}

              {/* Cauldron Sprite */}
              <div className="cauldron-pot">
                <span className="pot-icon">{c.matched ? '✨' : (isSelected ? '🔮' : '⚗️')}</span>
                <div className="potion-bubbles-steam" />
              </div>
            </div>
          );
        })}

        {/* Lab Gremlin Enemy */}
        <div
          className="lab-gremlin-sprite"
          style={{ left: `${gremlinDisplay.x}px`, top: `${gremlinDisplay.y}px` }}
        >
          <span>🦎</span>
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
        floorDoorLabel="Floor 2 • Door 1 — Potion Flip Dungeon"
        hearts={hearts}
        maxHearts={2}
        score={score}
        timeLeft={timeLeft}
        totalWords={0}
      />

      {/* ── Cleared Modal ────────────────────────────────────────────── */}
      {phase === 'cleared' && (
        <div className="potion-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>ALCHEMY MASTER!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, 100))}
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
        <div className="potion-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>POISON OVERDOSE!</h2>
            <p>The Lab Gremlin knocked Leo into toxic brew!</p>
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
