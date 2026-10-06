/**
 * HighwaySprintCanvas.jsx — 3D Canvas Road Runner for Lexio's Quest
 *
 * Mobile-First 60fps Canvas 2D Pseudo-3D Engine:
 * - Subway Surfers / Crossy Road perspective running into the screen
 * - Real 3D projected obstacles:
 *     1. Barrier (Hurdle — Double-tap or swipe UP to JUMP)
 *     2. Laser Grid (Glowing electric beam — Swipe DOWN to SLIDE)
 *     3. Pillar/Barrel (3D hazard obstacle — Tap left/right to DODGE)
 * - 3D Floating Word Billboards: Target crystal word vs Distractor billboards
 * - Audio-First Pedagogy: TTS definition read aloud with replay button
 * - Gesture Controls: 3-Zone tap, Double-Tap Jump, Swipe Down Slide
 * - Zero Virtual D-Pad buttons: 100% full screen immersive experience
 * - Always-visible FloatingExitBtn for instant Chamber return
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, RotateCcw, AlertTriangle, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import LeoCharacterBack from './LeoCharacterBack';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import GameInstructionModal from '../chronicles/games/GameInstructionModal';
import './HighwaySprintCanvas.css';

const DEFAULT_HIGHWAY_ROUNDS = [
  { targetWord: 'friction', definition: 'The force that slows things down when surfaces slide together', distractors: ['gravity', 'velocity', 'magnetism'] },
  { targetWord: 'safety', definition: 'The state of being protected from danger or injury', distractors: ['hazard', 'accident', 'risk'] },
  { targetWord: 'slippery', definition: 'Difficult to stand or walk on because it is wet or smooth', distractors: ['sticky', 'bumpy', 'rough'] },
  { targetWord: 'rubber', definition: 'A tough, elastic material used to make shoes grip the floor', distractors: ['plastic', 'metal', 'cotton'] },
  { targetWord: 'corridor', definition: 'A long hallway or passage inside a school or building', distractors: ['balcony', 'basement', 'courtyard'] },
  { targetWord: 'laboratory', definition: 'A room specially equipped for scientific experiments', distractors: ['cafeteria', 'gymnasium', 'dormitory'] },
  { targetWord: 'traction', definition: 'The grip between shoes or tires and the floor to stop slipping', distractors: ['motion', 'weight', 'speed'] },
  { targetWord: 'prevent', definition: 'To stop something dangerous or painful from happening', distractors: ['allow', 'create', 'forget'] },
  { targetWord: 'polished', definition: 'Made smooth and shiny by rubbing or waxing', distractors: ['rough', 'dusty', 'cracked'] },
];

const MAX_HEARTS = 2; // Locked N4 invariant for Floor 4 Door 1

// ── Wave Word Distinction & Anti-Duplicate Lemma Utility ───────────────────────
function getWordStem(str) {
  if (!str) return '';
  const clean = str.trim().toLowerCase().replace(/[^a-z]/g, '');
  return clean
    .replace(/(?:ing|edly|ingly|tion|ment|able|ible|ness|less|ful|ers|est|ed|ly|es|s)$/, '')
    .slice(0, 5);
}

function areWordsNearDuplicate(w1, w2) {
  if (!w1 || !w2) return false;
  const s1 = w1.trim().toLowerCase();
  const s2 = w2.trim().toLowerCase();
  if (s1 === s2) return true;
  if (s1.includes(s2) || s2.includes(s1)) return true;
  const stem1 = getWordStem(s1);
  const stem2 = getWordStem(s2);
  if (stem1.length >= 3 && stem2.length >= 3 && stem1 === stem2) return true;
  return false;
}

export function validateWaveDistinction(targetWord, candidateDistractors, fallbackPool = []) {
  const chosenDistractors = [];
  const target = (targetWord || '').trim().toLowerCase();
  const candidateList = [...(candidateDistractors || []), ...fallbackPool];

  for (const rawCand of candidateList) {
    if (chosenDistractors.length >= 2) break;
    const cand = (typeof rawCand === 'string' ? rawCand : rawCand?.word || rawCand?.targetWord || '').trim().toLowerCase();
    if (!cand || cand.length < 2) continue;
    
    // Check against target
    if (areWordsNearDuplicate(target, cand)) continue;

    // Check against already chosen distractors
    const collidesWithChosen = chosenDistractors.some(existing => areWordsNearDuplicate(existing, cand));
    if (collidesWithChosen) continue;

    chosenDistractors.push(cand);
  }

  // Safe Fallback pool if distractors are insufficient
  const safeFallbacks = ['hazard', 'obstacle', 'velocity', 'gravity', 'magnetism', 'friction', 'safety', 'traction'];
  for (const fb of safeFallbacks) {
    if (chosenDistractors.length >= 2) break;
    if (!areWordsNearDuplicate(target, fb) && !chosenDistractors.some(d => areWordsNearDuplicate(d, fb))) {
      chosenDistractors.push(fb);
    }
  }

  return chosenDistractors.slice(0, 2);
}

export default function HighwaySprintCanvas({
  vocabItems = [],
  duration = 150,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_sprint') || 0;

  // Build rounds from vocabItems + defaults (locked to 6 rounds for R=6, h=2 -> N4 = 5/729 ≈ 0.686%)
  const rounds = useMemo(() => {
    const valid = (vocabItems || []).filter(v => v.word && (v.definition || v.definition_en || v.meaning) && v.word.length > 2);
    const pool = [...valid, ...DEFAULT_HIGHWAY_ROUNDS];
    const uniqueMap = new Map();

    pool.forEach(item => {
      const w = (item.word || '').trim().toLowerCase();
      if (w && !uniqueMap.has(w)) {
        uniqueMap.set(w, {
          targetWord: w,
          definition: item.definition || item.definition_en || item.meaning || 'A scientific concept',
          distractors: item.distractors || [],
        });
      }
    });

    const uniqueList = Array.from(uniqueMap.values());
    const selected = uniqueList.slice(0, 6);

    return selected.map((r, idx) => {
      const otherWords = uniqueList.filter((_, i) => i !== idx).map(u => u.targetWord);
      const validatedDistractors = validateWaveDistinction(r.targetWord, r.distractors, otherWords);
      return {
        ...r,
        distractors: validatedDistractors,
      };
    });
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [showHelp, setShowHelp] = useState(false);
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFrenzy, setIsFrenzy] = useState(false);
  const isFrenzyRef = useRef(false);
  const roundIdxRef = useRef(roundIdx);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    roundIdxRef.current = roundIdx;
  }, [roundIdx]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const currentRound = rounds[roundIdx % rounds.length] || DEFAULT_HIGHWAY_ROUNDS[0];

  // Canvas ref & sizing
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [viewSize, setViewSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 600,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Leo Movement State
  const [targetLane, setTargetLane] = useState(1); // 0 = Left, 1 = Center, 2 = Right
  const targetLaneRef = useRef(1);
  const smoothLaneRef = useRef(1);
  const isJumpingRef = useRef(false);
  const isSlidingRef = useRef(false);
  const lastStuntActionTime = useRef(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const invincibleUntil = useRef(0);

  // Animated Leo State for CSS overlay
  const [leoPos, setLeoPos] = useState({ x: 0, y: 0, jumpOffset: 0, scale: 1 });
  const [leoAnimState, setLeoAnimState] = useState('run');

  // Game Engine State (Entities on road: z from 0.05 to 1.2)
  const entitiesRef = useRef([]); // [{ id, type, lane, z, word, passed, collected }]
  const particlesRef = useRef([]); // [{ x, y, vx, vy, color, alpha, size }]
  const roadPhaseRef = useRef(0);
  const nextSpawnZRef = useRef(0.2);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setViewSize({ width: clientWidth, height: clientHeight });
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Jump Action
  const triggerJump = useCallback(() => {
    if (isJumpingRef.current || isSlidingRef.current || phase !== 'playing') return;
    lastStuntActionTime.current = Date.now();
    isJumpingRef.current = true;
    setIsJumping(true);
    setLeoAnimState('jump');
    setTimeout(() => {
      isJumpingRef.current = false;
      setIsJumping(false);
      setLeoAnimState('run');
    }, 650);
  }, [phase]);

  // Slide Action
  const triggerSlide = useCallback(() => {
    if (isSlidingRef.current || isJumpingRef.current || phase !== 'playing') return;
    lastStuntActionTime.current = Date.now();
    isSlidingRef.current = true;
    setIsSliding(true);
    setLeoAnimState('slide');
    setTimeout(() => {
      isSlidingRef.current = false;
      setIsSliding(false);
      setLeoAnimState('run');
    }, 650);
  }, [phase]);

  // Move Lane Action
  const moveLeft = useCallback(() => {
    setTargetLane(l => {
      const next = Math.max(0, l - 1);
      targetLaneRef.current = next;
      return next;
    });
  }, []);

  const moveRight = useCallback(() => {
    setTargetLane(l => {
      const next = Math.min(2, l + 1);
      targetLaneRef.current = next;
      return next;
    });
  }, []);

  // Direct Lane Select
  const setLaneDirect = useCallback((lane) => {
    const next = Math.max(0, Math.min(2, lane));
    targetLaneRef.current = next;
    setTargetLane(next);
  }, []);

  // Gesture Controls setup — 3-zone tap & hold for instant steering + swipe jump/slide
  const { gestureRef } = useGestureControls({
    onMoveLeftStart: () => setLaneDirect(0),
    onMoveRightStart: () => setLaneDirect(2),
    onTapLeft: () => setLaneDirect(0),
    onTapCenter: () => setLaneDirect(1),
    onTapRight: () => setLaneDirect(2),
    onDoubleTap: triggerJump,
    onSwipeUp: triggerJump,
    onSwipeDown: triggerSlide,
    onSwipeLeft: moveLeft,
    onSwipeRight: moveRight,
    enabled: phase === 'playing' && !showHelp,
  });

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
      if (showHelp) return;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        moveLeft();
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        moveRight();
      } else if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
        e.preventDefault();
        triggerJump();
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        triggerSlide();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [moveLeft, moveRight, triggerJump, triggerSlide, showHelp]);

  // Announce definition when round starts
  useEffect(() => {
    if (currentRound?.definition) {
      speakText(`Find: ${currentRound.definition}`);
    }
  }, [roundIdx, currentRound]);

  // Procedural Continuous Wave Spawner
  const waveCounterRef = useRef(0);

  const spawnNextWave = useCallback((round, atZ = 0.05) => {
    if (!round) return;
    waveCounterRef.current += 1;

    // INVARIANT RULE F4D1: Only 'target_word' and 'distractor_word' are permitted.
    // Platforming obstacles (hurdles/lasers) with heart penalties are strictly FORBIDDEN
    // to protect the closed-form N4 = 0.686% linguistic model (see Claude_handoff.txt F4D1).
    const target = (round.targetWord || 'friction').trim().toLowerCase();
    const validatedDistractors = validateWaveDistinction(
      target,
      round.distractors || [],
      rounds.map(r => r.targetWord)
    );

    // 3 word options distributed across 3 lanes
    const options = [
      { type: 'target_word', word: target },
      { type: 'distractor_word', word: validatedDistractors[0] },
      { type: 'distractor_word', word: validatedDistractors[1] },
    ];
    // Fisher-Yates shuffle lane assignment [0, 1, 2]
    const lanes = [0, 1, 2];
    for (let i = lanes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lanes[i], lanes[j]] = [lanes[j], lanes[i]];
    }

    const newItems = options.map((opt, idx) => ({
      id: `${opt.type}_${Date.now()}_${idx}_${Math.random()}`,
      type: opt.type,
      word: opt.word,
      lane: lanes[idx],
      z: atZ,
      passed: false,
      collected: false,
    }));

    entitiesRef.current = [...entitiesRef.current, ...newItems];
  }, [rounds]);

  // ── Frenzy Dash (PA1 + PA2): 3.0s Sprint replacing legacy 600ms transition delay ──
  const triggerFrenzyDash = useCallback(() => {
    isFrenzyRef.current = true;
    setIsFrenzy(true);

    // Clear word entities so only gold coins stream during Frenzy Dash
    entitiesRef.current = [];

    // Spawn 6 Frenzy Gold Coins staggered from 0.76 down to 0.23 (stream over 3.0s at v=0.24)
    const frenzyCoins = [
      { id: `coin_${Date.now()}_0`, type: 'gold_coin', lane: 1, z: 0.76, floating: false, passed: false, collected: false },
      { id: `coin_${Date.now()}_1`, type: 'gold_coin', lane: 0, z: 0.65, floating: true, passed: false, collected: false },
      { id: `coin_${Date.now()}_2`, type: 'gold_coin', lane: 2, z: 0.54, floating: false, passed: false, collected: false },
      { id: `coin_${Date.now()}_3`, type: 'gold_coin', lane: 1, z: 0.43, floating: true, passed: false, collected: false },
      { id: `coin_${Date.now()}_4`, type: 'gold_coin', lane: 0, z: 0.32, floating: false, passed: false, collected: false },
      { id: `coin_${Date.now()}_5`, type: 'gold_coin', lane: 2, z: 0.23, floating: false, passed: false, collected: false },
    ];
    entitiesRef.current = frenzyCoins;

    // 3000ms Frenzy Dash Duration (Replaces legacy 600ms transition overhead)
    setTimeout(() => {
      isFrenzyRef.current = false;
      setIsFrenzy(false);
      entitiesRef.current = [];

      if (roundIdxRef.current + 1 < rounds.length) {
        setRoundIdx(r => r + 1);
      } else {
        // 6th Frenzy Dash after Round 6 completed -> Show Victory Modal!
        setPhase('cleared');
        setScore(s => {
          const final = s + 100 + timeLeftRef.current * 2;
          recordPersonalBest('highway_sprint', final);
          return final;
        });
      }
    }, 3000);
  }, [rounds.length, recordPersonalBest]);

  // DEV Test Hook
  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      window.__HIGHWAY_TEST_HOOK__ = {
        getActiveEntities: () => entitiesRef.current,
        getCurrentRound: () => currentRound,
        getHearts: () => hearts,
        getScore: () => score,
        getPhase: () => phase,
        getTimeLeft: () => timeLeft,
        getRoundIdx: () => roundIdx,
        getRounds: () => rounds,
        getStreak: () => streak,
        isFrenzy: () => isFrenzyRef.current,
        triggerJump: () => triggerJump(),
        triggerSlide: () => triggerSlide(),
        setLane: (lane) => setLaneDirect(lane),
        injectRound: (customRound) => {
          if (!customRound) return;
          rounds[roundIdx] = {
            targetWord: customRound.targetWord.trim().toLowerCase(),
            definition: customRound.definition,
            distractors: customRound.distractors || ['hazard', 'obstacle'],
          };
          entitiesRef.current = [];
          spawnNextWave(rounds[roundIdx], 0.05);
        },
      };
      return () => {
        delete window.__HIGHWAY_TEST_HOOK__;
      };
    }
  }, [currentRound, hearts, score, phase, timeLeft, roundIdx, rounds, streak, setLaneDirect, spawnNextWave, triggerJump, triggerSlide]);

  // Trigger initial round spawning
  useEffect(() => {
    waveCounterRef.current = 0;
    entitiesRef.current = [];
    spawnNextWave(currentRound, 0.05);
  }, [roundIdx, currentRound, spawnNextWave]);

  // Particle explosion helper
  const spawnExplosion = (x, y, color) => {
    const pList = [];
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5);
      const spd = 2 + Math.random() * 6;
      pList.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color,
        alpha: 1,
        size: 3 + Math.random() * 4,
      });
    }
    particlesRef.current.push(...pList);
  };

  // ── Main 60fps Canvas Loop ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();

    const runFrame = (now) => {
      const dt = showHelp ? 0 : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Update resolution matching display
      const W = canvas.clientWidth || viewSize.width;
      const H = canvas.clientHeight || viewSize.height;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }

      // Smooth lane transition using stable ref
      smoothLaneRef.current += (targetLaneRef.current - smoothLaneRef.current) * Math.min(1, dt * 14);
      const currentSmoothLane = smoothLaneRef.current;

      // Road Geometry Definition
      const horizonY = H * 0.26;
      const playerY = H * 0.82;
      const horizonRoadWidth = W * 0.12;
      const bottomRoadWidth = W * 0.94;
      const cx = W / 2;

      // Advance road phase for 60fps running sensation (accelerated during Frenzy)
      roadPhaseRef.current = (roadPhaseRef.current + dt * (isFrenzyRef.current ? 5.5 : 1.8)) % 1;

      // ── 1. Clear & Draw Sci-Fi Sky / Horizon ─────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#0a0418');
      skyGrad.addColorStop(0.7, '#1e113a');
      skyGrad.addColorStop(1, '#3b0764');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, horizonY);

      // Distant Twinkling Stars
      for (let s = 0; s < 24; s++) {
        const sx = ((s * 47) % W);
        const sy = ((s * 31) % Math.floor(horizonY - 12));
        const sSize = (s % 3) === 0 ? 2 : 1.2;
        ctx.fillStyle = s % 2 === 0 ? 'rgba(255, 255, 255, 0.75)' : 'rgba(192, 132, 252, 0.85)';
        ctx.fillRect(sx, sy, sSize, sSize);
      }

      // Distant Neon Horizon Glow
      const glowGrad = ctx.createRadialGradient(cx, horizonY, 10, cx, horizonY, W * 0.6);
      glowGrad.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
      glowGrad.addColorStop(0.5, 'rgba(147, 51, 234, 0.2)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, horizonY - 40, W, 80);

      // ── 2. Draw 3D Road Trapezoid with Animated Stripes ──────────────────────
      const numSegments = 24;
      for (let i = numSegments - 1; i >= 0; i--) {
        const segZ1 = (i + roadPhaseRef.current) / numSegments;
        const segZ2 = (i + 1 + roadPhaseRef.current) / numSegments;

        const pZ1 = Math.pow(segZ1, 1.8);
        const pZ2 = Math.pow(segZ2, 1.8);

        const y1 = horizonY + (H - horizonY) * pZ1;
        const y2 = horizonY + (H - horizonY) * pZ2;

        const w1 = horizonRoadWidth + (bottomRoadWidth - horizonRoadWidth) * pZ1;
        const w2 = horizonRoadWidth + (bottomRoadWidth - horizonRoadWidth) * pZ2;

        // Alternating asphalt shade
        const isDark = (i % 2 === 0);
        ctx.fillStyle = isDark ? '#130d2a' : '#1b1238';

        ctx.beginPath();
        ctx.moveTo(cx - w1 / 2, y1);
        ctx.lineTo(cx + w1 / 2, y1);
        ctx.lineTo(cx + w2 / 2, y2);
        ctx.lineTo(cx - w2 / 2, y2);
        ctx.closePath();
        ctx.fill();

        // Glowing Road Borders
        ctx.strokeStyle = isDark ? '#a855f7' : '#06b6d4';
        ctx.lineWidth = Math.max(1, pZ2 * 4);
        ctx.beginPath();
        ctx.moveTo(cx - w1 / 2, y1);
        ctx.lineTo(cx - w2 / 2, y2);
        ctx.moveTo(cx + w1 / 2, y1);
        ctx.lineTo(cx + w2 / 2, y2);
        ctx.stroke();

        // Dashed Lane Dividers (2 dividers for 3 lanes)
        if (i % 3 !== 0) {
          const laneW1 = w1 / 3;
          const laneW2 = w2 / 3;
          ctx.strokeStyle = 'rgba(244, 244, 245, 0.4)';
          ctx.lineWidth = Math.max(1, pZ2 * 2.5);

          // Divider 1 (between lane 0 and 1)
          ctx.beginPath();
          ctx.moveTo(cx - w1 / 2 + laneW1, y1);
          ctx.lineTo(cx - w2 / 2 + laneW2, y2);
          ctx.stroke();

          // Divider 2 (between lane 1 and 2)
          ctx.beginPath();
          ctx.moveTo(cx - w1 / 2 + laneW1 * 2, y1);
          ctx.lineTo(cx - w2 / 2 + laneW2 * 2, y2);
          ctx.stroke();
        }
      }

      // ── Roadside Neon Light Pillars (3D perspective) ──
      const numPillars = 8;
      for (let p = 0; p < numPillars; p++) {
        const pillarZ = ((p + roadPhaseRef.current * 2) % numPillars) / numPillars;
        const pPZ = Math.pow(pillarZ, 1.8);
        const pY = horizonY + (H - horizonY) * pPZ;
        const pRoadW = horizonRoadWidth + (bottomRoadWidth - horizonRoadWidth) * pPZ;
        const pHeight = 32 * pPZ + 6;

        // Left pillar (Cyan neon)
        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.fillRect(cx - pRoadW / 2 - 8 * pPZ - 2, pY - pHeight, Math.max(2, 4 * pPZ), pHeight);
        ctx.fillStyle = '#67e8f9';
        ctx.beginPath();
        ctx.arc(cx - pRoadW / 2 - 8 * pPZ, pY - pHeight, Math.max(2, 5 * pPZ), 0, Math.PI * 2);
        ctx.fill();

        // Right pillar (Magenta neon)
        ctx.fillStyle = 'rgba(236, 72, 153, 0.7)';
        ctx.fillRect(cx + pRoadW / 2 + 8 * pPZ - 2, pY - pHeight, Math.max(2, 4 * pPZ), pHeight);
        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(cx + pRoadW / 2 + 8 * pPZ, pY - pHeight, Math.max(2, 5 * pPZ), 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 3. Update & Draw Road Entities (Sorted far → near) ───────────────────
      // Calibrated v_z = 0.040 Z-units/s for T_avail = 19.00s in normal play.
      // Accelerated v_z = 0.24 Z-units/s during 3.0s Frenzy Dash (PA1 kinetic sprint).
      const RUNNER_SPEED = isFrenzyRef.current ? 0.24 : 0.040;
      let entities = entitiesRef.current;

      // Advance Z
      entities.forEach(ent => {
        ent.z += RUNNER_SPEED * dt;
      });

      // Filter out entities that passed well behind player (z > 1.35)
      entities = entities.filter(ent => ent.z <= 1.35);
      entitiesRef.current = entities;

      // Continuous Procedural Spawning: only during normal play when closest entity is past z = 0.30
      const minZ = entities.length > 0 ? Math.min(...entities.map(e => e.z)) : 1.0;
      if (!isFrenzyRef.current && (minZ > 0.30 || entities.length < 3)) {
        spawnNextWave(currentRound, Math.max(0.04, minZ - 0.32));
      }

      // Radial Warp Speed Lines during Frenzy Dash
      if (isFrenzyRef.current) {
        ctx.save();
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
        ctx.lineWidth = 2.5;
        for (let l = 0; l < 10; l++) {
          const angle = (l / 10) * Math.PI * 2;
          const linePhase = ((now / 80 + l * 0.1) % 1);
          const r1 = W * 0.08 + linePhase * W * 0.45;
          const r2 = r1 + W * 0.12;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r1, horizonY + Math.sin(angle) * r1 * 0.6);
          ctx.lineTo(cx + Math.cos(angle) * r2, horizonY + Math.sin(angle) * r2 * 0.6);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Sort by Z so farthest objects render first
      const sortedEntities = [...entities].sort((a, b) => a.z - b.z);

      const playerZ = 0.88;
      const hitToleranceZ = 0.07;

      sortedEntities.forEach(ent => {
        if (ent.z < 0.05 || ent.z > 1.25) return;

        // Perspective projection calculation
        const pZ = Math.pow(ent.z, 1.8);
        const entityY = horizonY + (H - horizonY) * pZ;
        const currentRoadW = horizonRoadWidth + (bottomRoadWidth - horizonRoadWidth) * pZ;
        const laneW = currentRoadW / 3;
        const entityX = cx - currentRoadW / 2 + laneW * (ent.lane + 0.5);
        const entityScale = Math.max(0.2, pZ * 1.3);

        // ── Collision / Passing Detection ────────────────────────────────────
        const isNearPlayerZ = Math.abs(ent.z - playerZ) < hitToleranceZ;
        const isSameLane = Math.abs(currentSmoothLane - ent.lane) < 0.55;

        if (!showHelp && isNearPlayerZ && isSameLane && !ent.passed && !ent.collected) {
          ent.passed = true;

          // Check Invincibility
          const isInv = Date.now() < invincibleUntil.current;

          if (ent.type === 'target_word') {
            // Correct Target Word Collected!
            ent.collected = true;
            speakText(ent.word);

            // PA2: Super Stunt Catch bonus (Jumping or Sliding while collecting target word)
            const isStunt = isJumpingRef.current || isSlidingRef.current || (Date.now() - lastStuntActionTime.current < 900);
            const wordXp = isStunt ? 75 : 50;
            setScore(s => s + wordXp);
            setStreak(s => s + 1);

            if (isStunt) {
              setFeedback({ type: 'stunt', text: `⭐ SUPER STUNT CATCH! +75 XP` });
            } else {
              setFeedback({ type: 'correct', text: `💎 "${ent.word.toUpperCase()}" COLLECTED! +50 XP` });
            }
            spawnExplosion(entityX, entityY - 30, isStunt ? '#f59e0b' : '#10b981');
            setTimeout(() => setFeedback(null), 1500);

            // PA1: Trigger Frenzy Dash (REPLACES legacy 600ms overhead completely)
            triggerFrenzyDash();
          } else if (ent.type === 'distractor_word') {
            if (!isInv) {
              // Hit distractor word: deduct heart (only vocabulary mistake causes heart loss)
              ent.collected = true;
              speakText(ent.word);
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setStreak(0);
              setFeedback({ type: 'wrong', text: `❌ "${ent.word}" does not match definition!` });
              spawnExplosion(entityX, entityY - 30, '#ef4444');
              setTimeout(() => setFeedback(null), 1500);
              invincibleUntil.current = Date.now() + 1500;
              setInvincible(true);
              setTimeout(() => setInvincible(false), 1500);
            }
          } else if (ent.type === 'gold_coin') {
            // PA1: Frenzy Dash Gold Coin (No heart loss, pure kinetic XP reward)
            const canCatch = !ent.floating || isJumpingRef.current;
            if (canCatch) {
              ent.collected = true;
              setScore(s => s + 10);
              spawnExplosion(entityX, entityY + (ent.floating ? -48 : -14), '#fbbf24');
            }
          }
        }

        if (ent.collected) return;

        // ── Render 3D Visuals for Each Entity ────────────────────────────────
        ctx.save();
        ctx.translate(entityX, entityY);
        ctx.scale(entityScale, entityScale);

        if (ent.type === 'target_word' || ent.type === 'distractor_word') {
          // ── 3D WORD BILLBOARDS (Floating Crystal Plate) ──
          const isTarget = ent.type === 'target_word';
          const cardW = 100;
          const cardH = 34;
          const floatY = -52 + Math.sin(now / 180 + ent.lane) * 4;

          // Glow Shadow
          ctx.shadowColor = isTarget ? '#10b981' : '#a855f7';
          ctx.shadowBlur = isTarget ? 22 : 12;

          // Billboard Plate
          ctx.fillStyle = isTarget ? 'rgba(6, 78, 59, 0.92)' : 'rgba(30, 27, 75, 0.88)';
          ctx.strokeStyle = isTarget ? '#34d399' : '#c084fc';
          ctx.lineWidth = isTarget ? 3 : 1.5;

          ctx.beginPath();
          ctx.roundRect(-cardW / 2, floatY, cardW, cardH, 10);
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Billboard Pole / Tether to road
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, floatY + cardH);
          ctx.lineTo(0, 0);
          ctx.stroke();

          // Sparkle icon for target
          if (isTarget) {
            ctx.font = '12px sans-serif';
            ctx.fillText('💎', -cardW / 2 + 14, floatY + 22);
          }

          // Word Label Text
          ctx.font = `bold ${isTarget ? 13 : 11}px 'Outfit', sans-serif`;
          ctx.fillStyle = isTarget ? '#ecfdf5' : '#e0e7ff';
          ctx.textAlign = 'center';
          ctx.fillText(ent.word, isTarget ? 6 : 0, floatY + 22);
        } else if (ent.type === 'gold_coin') {
          // ── 3D GLOWING GOLD COIN (PA1 Frenzy Dash) ──
          const floatY = ent.floating ? (-48 + Math.sin(now / 150 + ent.lane) * 6) : -14;
          const coinR = 14;

          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 16;

          // Outer gold rim
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(0, floatY, coinR, 0, Math.PI * 2);
          ctx.fill();

          // Inner gold shine
          const coinGrad = ctx.createLinearGradient(-coinR, floatY - coinR, coinR, floatY + coinR);
          coinGrad.addColorStop(0, '#fef08a');
          coinGrad.addColorStop(0.5, '#fbbf24');
          coinGrad.addColorStop(1, '#d97706');
          ctx.fillStyle = coinGrad;
          ctx.beginPath();
          ctx.arc(0, floatY, coinR - 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Star symbol on coin
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#78350f';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('★', 0, floatY);

          // If floating, draw a subtle tether / beam of light to the road
          if (ent.floating) {
            ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, floatY + coinR);
            ctx.lineTo(0, 0);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      // ── 4. Render & Update Particle System ──────────────────────────────────
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= dt * 1.5;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── 5. Compute Leo Mascot Position (Anchored smoothly on current lane) ──
      const pPlayerZ = Math.pow(playerZ, 1.8);
      const playerRoadW = horizonRoadWidth + (bottomRoadWidth - horizonRoadWidth) * pPlayerZ;
      const playerLaneW = playerRoadW / 3;
      const playerX = cx - playerRoadW / 2 + playerLaneW * (currentSmoothLane + 0.5);

      const jumpOffset = isJumpingRef.current ? -65 * Math.sin((Date.now() % 650) / 650 * Math.PI) : 0;
      const slideScale = isSlidingRef.current ? 0.75 : 1;

      setLeoPos({
        x: playerX,
        y: playerY + jumpOffset,
        jumpOffset,
        scale: Math.max(1, pPlayerZ * 1.5) * slideScale,
      });

      animId = requestAnimationFrame(runFrame);
    };

    animId = requestAnimationFrame(runFrame);
    return () => cancelAnimationFrame(animId);
  }, [phase, roundIdx, rounds.length, viewSize]);

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
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
    setHearts(MAX_HEARTS);
    setScore(0);
    setRoundIdx(0);
    setTimeLeft(duration);
    setTargetLane(1);
    setIsJumping(false);
    setIsSliding(false);
    isFrenzyRef.current = false;
    setIsFrenzy(false);
    setLeoAnimState('run');
    setFeedback(null);
    entitiesRef.current = [];
    particlesRef.current = [];
    spawnNextWave(rounds[0] || DEFAULT_HIGHWAY_ROUNDS[0], 0.05);
  };

  const handleFinalFinish = () => {
    const earnedStars = calculateStars(score, rounds.length * 50);
    onComplete && onComplete(earnedStars, score);
  };

  return (
    <div className="highway-canvas-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Game Instruction Modal ── */}
      <GameInstructionModal
        gameId="highway_runner"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* ── Top Target Definition Pill Banner ── */}
      <div className="highway-definition-banner">
        <button
          type="button"
          className="highway-audio-btn"
          onClick={(e) => {
            e.stopPropagation();
            speakText(`Find: ${currentRound.definition}`);
          }}
          title="Replay Audio Definition"
        >
          <Volume2 size={18} /> Listen
        </button>
        <div className="highway-def-content">
          <span className="highway-def-label">TARGET DEFINITION:</span>
          <span className="highway-def-text">{currentRound.definition}</span>
        </div>
        <div className="highway-round-pill">{roundIdx + 1}/{rounds.length}</div>
      </div>

      {/* ── Feedback Toast ── */}
      {feedback && (
        <div className={`highway-toast-pill toast-${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* ── Frenzy Dash Banner ── */}
      {isFrenzy && (
        <div className="highway-frenzy-banner">
          <Sparkles size={20} className="frenzy-sparkle" />
          <span>⚡ FRENZY DASH! COLLECT GOLD COINS! ⚡</span>
          <Sparkles size={20} className="frenzy-sparkle" />
        </div>
      )}

      {/* ── Fullscreen Pseudo-3D Canvas ── */}
      <canvas
        ref={canvasRef}
        className="highway-3d-canvas"
        role="img"
        aria-label="3D Highway Runner"
      />

      {/* ── Leo Mascot Overlay (Synced with 3D road lane) ── */}
      <LeoCharacterBack
        x={leoPos.x}
        y={leoPos.y}
        state={leoAnimState}
        invincible={invincible}
        scale={leoPos.scale}
      />

      {/* ── Touch Gesture Transparent Overlay (3-zone tap & swipe) ── */}
      <div
        ref={gestureRef}
        className="highway-touch-overlay"
        aria-hidden="true"
      >
        <div className="highway-touch-zone" onClick={moveLeft} title="Steer Left" />
        <div className="highway-touch-zone" onClick={triggerJump} title="Jump" />
        <div className="highway-touch-zone" onClick={moveRight} title="Steer Right" />
      </div>

      {/* ── Quick Controls Helper Strip ── */}
      <div className="highway-controls-guide">
        <span>⚡ Tap Left/Right to Steer • Double-Tap/Swipe ↑ to Jump • Swipe ↓ to Slide</span>
      </div>

      {/* ── HUD ── */}
      <HUDOverlay
        hearts={hearts}
        maxHearts={MAX_HEARTS}
        round={`${roundIdx + 1}/${rounds.length}`}
        score={score}
        timeLeft={timeLeft}
        floorNumber={4}
        doorLabel="Door 1 — Highway 3D Word Runner"
        rightActions={
          <button
            type="button"
            className="highway-help-btn"
            onClick={() => setShowHelp(true)}
            title="Game Instructions"
          >
            <HelpCircle size={16} /> Guide
          </button>
        }
      />

      {/* ── Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="highway-modal-backdrop">
          <div className="highway-modal-card">
            <Trophy size={56} className="modal-trophy-gold" />
            <h2>HIGHWAY CHAMPION!</h2>
            <p>You conquered the 3D runway and collected all {rounds.length} curriculum concepts!</p>
            <div className="modal-stat-box">
              <span>Final Score: <strong>{score} XP</strong></span>
              <span>Streak: <strong>x{Math.max(1, streak)}</strong></span>
            </div>
            <button className="finish-door-btn" onClick={handleFinalFinish}>
              Return to Chamber <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout / Crash Modal ── */}
      {phase === 'ko' && (
        <div className="highway-modal-backdrop">
          <div className="highway-modal-card modal-ko">
            <AlertTriangle size={56} className="modal-ko-icon" />
            <h2>RUNWAY CRASH!</h2>
            <p>Remember to steer into the lane matching the target word and dodge wrong distractor gates!</p>
            <div className="modal-actions">
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
