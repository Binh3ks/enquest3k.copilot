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
import { Volume2, Trophy, RotateCcw, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import LeoCharacterBack from './LeoCharacterBack';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
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
  { targetWord: 'bandage', definition: 'A strip of clean cloth used to cover and protect a wound', distractors: ['blanket', 'ribbon', 'napkin'] },
];

export default function HighwaySprintCanvas({
  vocabItems = [],
  duration = 150,
  weekNumber = 33,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_sprint') || 0;

  // Build rounds from vocabItems + defaults
  const rounds = useMemo(() => {
    const valid = (vocabItems || []).filter(v => v.word && v.definition && v.word.length > 2);
    const pool = [...valid, ...DEFAULT_HIGHWAY_ROUNDS];
    const uniqueMap = new Map();

    pool.forEach(item => {
      const w = (item.word || '').trim().toLowerCase();
      if (w && !uniqueMap.has(w)) {
        uniqueMap.set(w, {
          targetWord: w,
          definition: item.definition || item.meaning || 'A scientific concept',
          distractors: item.distractors || [],
        });
      }
    });

    const uniqueList = Array.from(uniqueMap.values());
    const selected = uniqueList.slice(0, 10);

    return selected.map((r, idx) => {
      const otherWords = uniqueList.filter((_, i) => i !== idx).map(u => u.targetWord);
      return {
        ...r,
        distractors: otherWords.length >= 2 ? otherWords.slice(0, 3) : ['hazard', 'obstacle'],
      };
    });
  }, [vocabItems]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

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
    if (isJumping || isSliding || phase !== 'playing') return;
    setIsJumping(true);
    setLeoAnimState('jump');
    setTimeout(() => {
      setIsJumping(false);
      setLeoAnimState('run');
    }, 650);
  }, [isJumping, isSliding, phase]);

  // Slide Action
  const triggerSlide = useCallback(() => {
    if (isSliding || isJumping || phase !== 'playing') return;
    setIsSliding(true);
    setLeoAnimState('slide');
    setTimeout(() => {
      setIsSliding(false);
      setLeoAnimState('run');
    }, 650);
  }, [isSliding, isJumping, phase]);

  // Move Lane Action
  const moveLeft = useCallback(() => {
    setTargetLane(l => Math.max(0, l - 1));
  }, []);

  const moveRight = useCallback(() => {
    setTargetLane(l => Math.min(2, l + 1));
  }, []);

  // Direct Lane Select
  const setLaneDirect = useCallback((lane) => {
    setTargetLane(Math.max(0, Math.min(2, lane)));
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
    enabled: phase === 'playing',
  });

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
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
  }, [moveLeft, moveRight, triggerJump, triggerSlide]);

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
    const waveNum = waveCounterRef.current;
    const isWordWave = waveNum % 2 === 0;
    const target = round.targetWord || 'friction';
    const distractors = (round.distractors && round.distractors.length > 0)
      ? round.distractors
      : ['hazard', 'obstacle', 'gravity'];
    const newItems = [];

    if (isWordWave) {
      // Spawn Word Billboard wave: Target word + distractor in another lane
      const targetLaneIdx = Math.floor(Math.random() * 3);
      const distractorLaneIdx = (targetLaneIdx + 1 + Math.floor(Math.random() * 2)) % 3;
      const distractorWord = distractors[Math.floor(Math.random() * distractors.length)] || 'hazard';

      newItems.push({
        id: `target_${Date.now()}_${Math.random()}`,
        type: 'target_word',
        word: target,
        lane: targetLaneIdx,
        z: atZ,
        passed: false,
        collected: false,
      });

      newItems.push({
        id: `distractor_${Date.now()}_${Math.random()}`,
        type: 'distractor_word',
        word: distractorWord,
        lane: distractorLaneIdx,
        z: atZ,
        passed: false,
        collected: false,
      });
    } else {
      // Spawn Obstacle wave: 1 or 2 hazards in random lanes
      const obsTypes = ['barrier', 'laser', 'barrel'];
      const obsType = obsTypes[Math.floor(Math.random() * obsTypes.length)];
      const lane1 = Math.floor(Math.random() * 3);
      newItems.push({
        id: `obs_${Date.now()}_${Math.random()}`,
        type: obsType,
        lane: lane1,
        z: atZ,
        passed: false,
      });
      // 30% chance for a second obstacle in another lane (leaving 1 lane always safe)
      if (Math.random() < 0.35) {
        const lane2 = (lane1 + 1 + Math.floor(Math.random() * 2)) % 3;
        const obsType2 = obsTypes[Math.floor(Math.random() * obsTypes.length)];
        newItems.push({
          id: `obs2_${Date.now()}_${Math.random()}`,
          type: obsType2,
          lane: lane2,
          z: atZ + 0.08,
          passed: false,
        });
      }
    }

    entitiesRef.current = [...entitiesRef.current, ...newItems];
  }, []);

  // Trigger initial round spawning
  useEffect(() => {
    waveCounterRef.current = 0;
    entitiesRef.current = [];
    spawnNextWave(currentRound, 0.05);
    spawnNextWave(currentRound, 0.35);
    spawnNextWave(currentRound, 0.65);
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
    let currentSmoothLane = targetLane;

    const runFrame = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Update resolution matching display
      const W = canvas.clientWidth || viewSize.width;
      const H = canvas.clientHeight || viewSize.height;
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }

      // Smooth lane transition
      currentSmoothLane += (targetLane - currentSmoothLane) * Math.min(1, dt * 14);

      // Road Geometry Definition
      const horizonY = H * 0.26;
      const playerY = H * 0.82;
      const horizonRoadWidth = W * 0.12;
      const bottomRoadWidth = W * 0.94;
      const cx = W / 2;

      // Advance road phase for 60fps running sensation
      roadPhaseRef.current = (roadPhaseRef.current + dt * 1.8) % 1;

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
      const RUNNER_SPEED = 0.24; // speed in Z units per second
      let entities = entitiesRef.current;

      // Advance Z
      entities.forEach(ent => {
        ent.z += RUNNER_SPEED * dt;
      });

      // Filter out entities that passed well behind player (z > 1.35)
      entities = entities.filter(ent => ent.z <= 1.35);
      entitiesRef.current = entities;

      // Continuous Procedural Spawning: if closest entity to horizon is past z = 0.30, spawn new wave ahead!
      const minZ = entities.length > 0 ? Math.min(...entities.map(e => e.z)) : 1.0;
      if (minZ > 0.30 || entities.length < 3) {
        spawnNextWave(currentRound, Math.max(0.04, minZ - 0.32));
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

        if (isNearPlayerZ && isSameLane && !ent.passed && !ent.collected) {
          ent.passed = true;

          // Check Invincibility
          const isInv = Date.now() < invincibleUntil.current;

          if (ent.type === 'target_word') {
            // Correct Target Word Collected!
            ent.collected = true;
            speakText(ent.word);
            setScore(s => s + 50);
            setStreak(s => s + 1);
            setFeedback({ type: 'correct', text: `💎 "${ent.word.toUpperCase()}" COLLECTED! +50 XP` });
            spawnExplosion(entityX, entityY - 30, '#10b981');
            setTimeout(() => setFeedback(null), 1500);

            // Advance to next round!
            setTimeout(() => {
              if (roundIdx + 1 < rounds.length) {
                setRoundIdx(r => r + 1);
              } else {
                setPhase('cleared');
                const final = score + 100 + timeLeft * 2;
                setScore(final);
                recordPersonalBest('highway_sprint', final);
              }
            }, 600);
          } else if (ent.type === 'distractor_word') {
            if (!isInv) {
              // Hit distractor word
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
          } else if (ent.type === 'barrier') {
            // Hurdle: MUST JUMP
            if (!isJumping && !isInv) {
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setStreak(0);
              setFeedback({ type: 'wrong', text: '⚡ OUCH! Jump over barriers!' });
              spawnExplosion(entityX, entityY - 20, '#f97316');
              setTimeout(() => setFeedback(null), 1200);
              invincibleUntil.current = Date.now() + 1500;
              setInvincible(true);
              setTimeout(() => setInvincible(false), 1500);
            } else if (isJumping) {
              setScore(s => s + 15);
              spawnExplosion(entityX, entityY - 30, '#38bdf8');
            }
          } else if (ent.type === 'laser') {
            // Laser beam: MUST SLIDE
            if (!isSliding && !isInv) {
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setStreak(0);
              setFeedback({ type: 'wrong', text: '🛹 OUCH! Slide under laser beams!' });
              spawnExplosion(entityX, entityY - 30, '#ec4899');
              setTimeout(() => setFeedback(null), 1200);
              invincibleUntil.current = Date.now() + 1500;
              setInvincible(true);
              setTimeout(() => setInvincible(false), 1500);
            } else if (isSliding) {
              setScore(s => s + 15);
              spawnExplosion(entityX, entityY - 10, '#a855f7');
            }
          } else if (ent.type === 'barrel') {
            // Barrel / Pillar: MUST DODGE
            if (!isInv) {
              setHearts(h => {
                const next = Math.max(0, h - 1);
                if (next === 0) setPhase('ko');
                return next;
              });
              setStreak(0);
              setFeedback({ type: 'wrong', text: '🧱 CRASH! Steer lanes to dodge barrels!' });
              spawnExplosion(entityX, entityY - 20, '#eab308');
              setTimeout(() => setFeedback(null), 1200);
              invincibleUntil.current = Date.now() + 1500;
              setInvincible(true);
              setTimeout(() => setInvincible(false), 1500);
            }
          }
        }

        if (ent.collected) return;

        // ── Render 3D Visuals for Each Entity ────────────────────────────────
        ctx.save();
        ctx.translate(entityX, entityY);
        ctx.scale(entityScale, entityScale);

        if (ent.type === 'barrier') {
          // ── BARRIER (Hurdle: Striped Bar + Posts) ──
          const bW = 86;
          const bH = 28;

          // Wooden/Metal Side Posts
          ctx.fillStyle = '#64748b';
          ctx.fillRect(-bW / 2 - 4, -bH, 8, bH);
          ctx.fillRect(bW / 2 - 4, -bH, 8, bH);

          // Diagonal Hazard Stripes Bar
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(-bW / 2, -bH + 4, bW, 16, 4);
          ctx.clip();

          ctx.fillStyle = '#ef4444';
          ctx.fillRect(-bW / 2, -bH + 4, bW, 16);

          ctx.fillStyle = '#f8fafc';
          for (let s = -bW / 2 - 20; s < bW / 2 + 20; s += 16) {
            ctx.beginPath();
            ctx.moveTo(s, -bH + 4);
            ctx.lineTo(s + 8, -bH + 4);
            ctx.lineTo(s - 4, -bH + 20);
            ctx.lineTo(s - 12, -bH + 20);
            ctx.fill();
          }
          ctx.restore();

          // Action Label Hint
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#fbbf24';
          ctx.textAlign = 'center';
          ctx.fillText('⚡ JUMP', 0, -bH - 4);

        } else if (ent.type === 'laser') {
          // ── LASER BEAM (Suspended Glowing Electric Line) ──
          const lW = 96;
          const lY = -48; // High elevation

          // Neon Posts
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-lW / 2, 0);
          ctx.lineTo(-lW / 2, lY);
          ctx.moveTo(lW / 2, 0);
          ctx.lineTo(lW / 2, lY);
          ctx.stroke();

          // Glowing Laser Line
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 18;
          ctx.strokeStyle = '#fb7185';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(-lW / 2, lY);
          ctx.lineTo(lW / 2, lY);
          ctx.stroke();

          // White Laser Core
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Slide Label Hint
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#38bdf8';
          ctx.textAlign = 'center';
          ctx.fillText('🛹 SLIDE', 0, lY - 6);

        } else if (ent.type === 'barrel') {
          // ── BARREL / ROCK PILLAR (Must Dodge) ──
          const bRadius = 18;
          const bH = 44;

          // 3D Cylinder
          const barrelGrad = ctx.createLinearGradient(-bRadius, 0, bRadius, 0);
          barrelGrad.addColorStop(0, '#78350f');
          barrelGrad.addColorStop(0.5, '#f59e0b');
          barrelGrad.addColorStop(1, '#451a03');

          ctx.fillStyle = barrelGrad;
          ctx.beginPath();
          ctx.roundRect(-bRadius, -bH, bRadius * 2, bH, 6);
          ctx.fill();

          // Barrel Bands
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 3;
          ctx.strokeRect(-bRadius, -bH + 8, bRadius * 2, 4);
          ctx.strokeRect(-bRadius, -14, bRadius * 2, 4);

          // Hazard Icon
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚠️', 0, -bH / 2 + 4);

          // Dodge hint
          ctx.font = 'bold 8px sans-serif';
          ctx.fillStyle = '#fde047';
          ctx.fillText('DODGE', 0, -bH - 4);

        } else if (ent.type === 'target_word' || ent.type === 'distractor_word') {
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

      const jumpOffset = isJumping ? -65 * Math.sin((Date.now() % 650) / 650 * Math.PI) : 0;
      const slideScale = isSliding ? 0.75 : 1;

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
  }, [phase, targetLane, isJumping, isSliding, roundIdx, rounds.length, score, timeLeft, viewSize]);

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
    setHearts(3);
    setScore(0);
    setRoundIdx(0);
    setTimeLeft(duration);
    setTargetLane(1);
    setIsJumping(false);
    setIsSliding(false);
    setLeoAnimState('run');
  };

  const handleFinalFinish = () => {
    const earnedStars = calculateStars(score, rounds.length * 50);
    onComplete && onComplete(earnedStars, score);
  };

  return (
    <div className="highway-canvas-root" ref={containerRef}>
      {/* ── Floating Exit Button (Always visible) ── */}
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

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
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={rounds.length}
        floorNumber={4}
        doorLabel="Door 1 — Highway 3D Word Runner"
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
            <p>Remember to jump over hurdles, slide under high lasers, and dodge warning barrels!</p>
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
