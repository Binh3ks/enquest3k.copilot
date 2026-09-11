/**
 * ConnectorRelayCanvas.jsx — Floor 6, Door 2 (Grammar) Mini-Game for Lexio's Chronicles
 *
 * Arcane Skyway Bridge Pseudo-3D Runner Engine:
 * - 60fps Canvas 2D pseudo-3D road runner over the Skyway Chasm.
 * - Each question displays a complex sentence with a connective clause blank (_____).
 * - Normalized to EXACTLY 3 options distributed across 3 lanes:
 *     Lane 0: Left, Lane 1: Center, Lane 2: Right.
 * - Leo steers across lanes to pass through the correct grammatical connector gateway!
 * - Passing correct connector:
 *     +40 XP, golden energy beam, completed sentence read aloud via TTS.
 * - Hitting distractor connector:
 *     Sparks blast, -1 Heart, Leo flickers invincible.
 * - Anti-leak invariant:
 *     All spawned entities carry `targetRoundId` and `targetRoot`.
 *     Old entities are completely wiped (`entitiesRef.current = []`) on round change.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, Trophy, RotateCcw, AlertTriangle, Sparkles, ArrowRight, HelpCircle, Route } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import LeoCharacterBack from './LeoCharacterBack';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import useGestureControls from './useGestureControls';
import GameInstructionModal from '../chronicles/games/GameInstructionModal';
import { getConnectorQuestionsForWeek } from '../../services/chroniclesFloor67Service';
import './ConnectorRelayCanvas.css';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ConnectorRelayCanvas({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  weekData = null,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('connector_relay') || 0;

  // Load curriculum connector questions
  const questions = useMemo(() => {
    return getConnectorQuestionsForWeek(weekNumber, grammarSentences);
  }, [weekNumber, grammarSentences]);

  const [phase, setPhase] = useState('playing'); // 'playing' | 'cleared' | 'ko'
  const [showHelp, setShowHelp] = useState(false);
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [feedback, setFeedback] = useState(null);

  const currentQ = questions[roundIdx % questions.length] || questions[0];

  // Canvas ref & viewport sizing
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

  // Game Engine Entities (Road objects: z from 0.05 to 1.2)
  const entitiesRef = useRef([]); // [{ id, type, lane, z, word, isCorrect, targetRoundId, passed, collected }]
  const particlesRef = useRef([]); // Visual energy sparks
  const roadPhaseRef = useRef(0);
  const nextSpawnZRef = useRef(0.1);
  const waveCounterRef = useRef(0);

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
    if (isJumping || isSliding || phase !== 'playing' || showHelp) return;
    setIsJumping(true);
    setLeoAnimState('jump');
    setTimeout(() => {
      setIsJumping(false);
      setLeoAnimState('run');
    }, 650);
  }, [isJumping, isSliding, phase, showHelp]);

  // Slide Action
  const triggerSlide = useCallback(() => {
    if (isJumping || isSliding || phase !== 'playing' || showHelp) return;
    setIsSliding(true);
    setLeoAnimState('slide');
    setTimeout(() => {
      setIsSliding(false);
      setLeoAnimState('run');
    }, 650);
  }, [isJumping, isSliding, phase, showHelp]);

  // Lane movement
  const moveLeft = useCallback(() => {
    if (phase !== 'playing' || showHelp) return;
    setTargetLane(l => Math.max(0, l - 1));
  }, [phase, showHelp]);

  const moveRight = useCallback(() => {
    if (phase !== 'playing' || showHelp) return;
    setTargetLane(l => Math.min(2, l + 1));
  }, [phase, showHelp]);

  // Gesture Controls
  const { gestureRef } = useGestureControls({
    onTapLeft: moveLeft,
    onTapRight: moveRight,
    onTapCenter: triggerJump,
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

  // Announce current sentence via audio cue
  useEffect(() => {
    if (phase === 'playing' && currentQ) {
      speakText(currentQ.sentence.replace('_____', 'blank'));
    }
  }, [roundIdx, currentQ, phase]);

  // ── Procedural Wave Spawner with Anti-Leak Round ID ──────────────────────
  const spawnNextWave = useCallback((q, atZ = 0.05, roundNum) => {
    if (!q) return;
    waveCounterRef.current += 1;
    const waveNum = waveCounterRef.current;
    const isConnectorWave = waveNum % 2 === 0;
    const currentRoundId = roundNum !== undefined ? roundNum : (roundIdx + 1);

    const newItems = [];

    if (isConnectorWave) {
      // ── SPAWN CONNECTOR GATE WAVE ACROSS ALL 3 LANES ──
      const answer = q.answer;
      const rawDistractors = (q.options || []).filter(opt => opt.toLowerCase() !== answer.toLowerCase());
      const backupDistractors = ['although', 'because', 'unless', 'so', 'while', 'but'].filter(w => w.toLowerCase() !== answer.toLowerCase());
      const pool = [...rawDistractors, ...backupDistractors];
      const uniqueDistractors = Array.from(new Set(pool.map(d => d.trim())));

      const chosenDistractors = uniqueDistractors.slice(0, 2);
      const threeChoices = [
        { text: answer, isCorrect: true },
        { text: chosenDistractors[0] || 'although', isCorrect: false },
        { text: chosenDistractors[1] || 'unless', isCorrect: false },
      ];

      const shuffledChoices = shuffleArray(threeChoices);

      // Assign exactly 1 choice per lane (Lane 0, Lane 1, Lane 2)
      for (let laneIdx = 0; laneIdx < 3; laneIdx++) {
        const choice = shuffledChoices[laneIdx];
        newItems.push({
          id: `gate_${Date.now()}_lane_${laneIdx}_${Math.random()}`,
          type: choice.isCorrect ? 'target_connector' : 'distractor_connector',
          word: choice.text,
          isCorrect: choice.isCorrect,
          targetRoot: answer,
          targetRoundId: currentRoundId,
          lane: laneIdx,
          z: atZ,
          passed: false,
          collected: false,
        });
      }
    } else {
      // ── SPAWN OBSTACLE WAVE (Barrier, Laser, or Barrel) ──
      const obsTypes = ['barrier', 'laser', 'barrel'];
      const obsType = obsTypes[Math.floor(Math.random() * obsTypes.length)];
      const safeLane = Math.floor(Math.random() * 3);
      const obsLane = (safeLane + 1 + Math.floor(Math.random() * 2)) % 3;

      newItems.push({
        id: `obs_${Date.now()}_${Math.random()}`,
        type: obsType,
        lane: obsLane,
        z: atZ,
        targetRoundId: currentRoundId,
        passed: false,
      });
    }

    entitiesRef.current = [...entitiesRef.current, ...newItems];
  }, [roundIdx]);

  // Initial wave spawn on round start
  useEffect(() => {
    entitiesRef.current = []; // Clean state on round change
    waveCounterRef.current = 0;
    spawnNextWave(currentQ, 0.05, roundIdx + 1);
    spawnNextWave(currentQ, 0.35, roundIdx + 1);
    spawnNextWave(currentQ, 0.65, roundIdx + 1);
  }, [roundIdx, currentQ, spawnNextWave]);

  // Particle explosion
  const spawnExplosion = (x, y, color) => {
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        size: 3 + Math.random() * 5,
      });
    }
  };

  // ── Expose test hooks for automated verification ─────────────────────────
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__CONNECTOR_RELAY_EVENT_LOG__ = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];
      window.__CONNECTOR_RELAY_TEST_HOOK__ = {
        setTargetLane: (lane) => setTargetLane(lane),
        getTargetLane: () => targetLane,
        getCurrentEntities: () => entitiesRef.current,
        getRoundIdx: () => roundIdx,
        getCurrentQuestion: () => currentQ,
        getScore: () => score,
        getHearts: () => hearts,
        resetInvincible: () => {
          invincibleUntil.current = 0;
          setInvincible(false);
        },
        setHeartsVal: (h) => setHearts(h),
        getStaleEntities: (roundId) => entitiesRef.current.filter(e => e.targetRoundId === roundId),
        clearEntities: () => {
          entitiesRef.current = [];
          setFeedback(null);
        },
        advanceToRound: (idx) => {
          setFeedback(null);
          entitiesRef.current = [];
          setRoundIdx(idx);
        },
        injectGateWave: (atZ, customChoices) => {
          const currentRoundId = roundIdx + 1;
          const choices = customChoices || [
            { text: currentQ.answer, isCorrect: true },
            { text: currentQ.options.find(o => o.toLowerCase() !== currentQ.answer.toLowerCase()) || 'dist1', isCorrect: false },
            { text: currentQ.options.filter(o => o.toLowerCase() !== currentQ.answer.toLowerCase())[1] || 'dist2', isCorrect: false },
          ];
          const newGates = [];
          for (let l = 0; l < 3; l++) {
            const ch = choices[l] || choices[0];
            newGates.push({
              id: `test_gate_${Date.now()}_lane_${l}`,
              type: ch.isCorrect ? 'target_connector' : 'distractor_connector',
              word: ch.text,
              isCorrect: ch.isCorrect,
              targetRoot: currentQ.answer,
              targetRoundId: currentRoundId,
              lane: l,
              z: atZ,
              passed: false,
              collected: false,
            });
          }
          entitiesRef.current = [...entitiesRef.current, ...newGates];
        },
      };
    }
  }, [roundIdx, currentQ, targetLane, score, hearts]);

  // ── Main Canvas Rendering & Physics Game Loop ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let lastTime = performance.now();
    let currentSmoothLane = targetLane;

    const runFrame = (now) => {
      const dt = showHelp ? 0 : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Match canvas resolution
      const w = canvas.width;
      const h = canvas.height;

      // Smooth lane lerping (speed: 12)
      currentSmoothLane += (targetLane - currentSmoothLane) * Math.min(1, dt * 14);

      // Scroll road texture
      const speed = 0.52; // Road speed
      roadPhaseRef.current = (roadPhaseRef.current + speed * dt) % 1;

      // Road Geometry Perspective Constants
      const horizonY = h * 0.38;
      const horizonW = w * 0.16;
      const bottomW  = w * 0.88;
      const centerX  = w * 0.5;

      // ── CLEAR & DRAW SKY / CHASM ──────────────────────────────────────
      ctx.clearRect(0, 0, w, h);

      // Sky gradient (Arcane Chasm Skyway)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#040714');
      skyGrad.addColorStop(0.6, '#0c1630');
      skyGrad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, horizonY);

      // Celestial stars in the background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      for (let s = 0; s < 25; s++) {
        const sx = (Math.sin(s * 93 + 4) * 0.5 + 0.5) * w;
        const sy = (Math.cos(s * 47 + 2) * 0.5 + 0.5) * horizonY;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Distant Arcane Spire Silhouettes
      ctx.fillStyle = '#060a1e';
      ctx.beginPath();
      ctx.moveTo(centerX - 180, horizonY);
      ctx.lineTo(centerX - 130, horizonY - 45);
      ctx.lineTo(centerX - 80, horizonY);
      ctx.lineTo(centerX + 60, horizonY);
      ctx.lineTo(centerX + 110, horizonY - 60);
      ctx.lineTo(centerX + 160, horizonY);
      ctx.fill();

      // ── DRAW 3D ROAD SURFACE (Bridge) ──────────────────────────────────
      const roadGrad = ctx.createLinearGradient(0, horizonY, 0, h);
      roadGrad.addColorStop(0, '#0f172a');
      roadGrad.addColorStop(0.3, '#1e293b');
      roadGrad.addColorStop(1, '#090d16');

      ctx.beginPath();
      ctx.moveTo(centerX - horizonW / 2, horizonY);
      ctx.lineTo(centerX + horizonW / 2, horizonY);
      ctx.lineTo(centerX + bottomW / 2, h);
      ctx.lineTo(centerX - bottomW / 2, h);
      ctx.closePath();
      ctx.fillStyle = roadGrad;
      ctx.fill();

      // Glowing Neon Curbs (Arcane Energy Rails)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.moveTo(centerX - horizonW / 2, horizonY);
      ctx.lineTo(centerX - bottomW / 2, h);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + horizonW / 2, horizonY);
      ctx.lineTo(centerX + bottomW / 2, h);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── DRAW 3-LANE DIVIDERS (Left, Center, Right) ────────────────────
      const numSegments = 16;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.lineWidth = 2.5;

      for (let i = 0; i < numSegments; i++) {
        const segZ = (i / numSegments + roadPhaseRef.current / numSegments) % 1;
        const segZNext = segZ + 0.035;
        if (segZNext > 1) continue;

        const y1 = horizonY + Math.pow(segZ, 2.2) * (h - horizonY);
        const y2 = horizonY + Math.pow(segZNext, 2.2) * (h - horizonY);

        const curW1 = horizonW + (bottomW - horizonW) * segZ;
        const curW2 = horizonW + (bottomW - horizonW) * segZNext;

        // Lane divider 1 (between Lane 0 and 1)
        const d1_x1 = centerX - curW1 / 6;
        const d1_x2 = centerX - curW2 / 6;
        ctx.beginPath();
        ctx.moveTo(d1_x1, y1);
        ctx.lineTo(d1_x2, y2);
        ctx.stroke();

        // Lane divider 2 (between Lane 1 and 2)
        const d2_x1 = centerX + curW1 / 6;
        const d2_x2 = centerX + curW2 / 6;
        ctx.beginPath();
        ctx.moveTo(d2_x1, y1);
        ctx.lineTo(d2_x2, y2);
        ctx.stroke();
      }

      // ── UPDATE & RENDER 3D ENTITIES ────────────────────────────────────
      const currentRoundId = roundIdx + 1;
      let minZ = 1.0;

      // Remove stale entities from previous rounds immediately (Anti-Leak)
      entitiesRef.current = entitiesRef.current.filter(ent => ent.targetRoundId === currentRoundId);

      // Sort entities by z descending (render distant objects first)
      const sortedEntities = [...entitiesRef.current].sort((a, b) => a.z - b.z);

      for (const ent of sortedEntities) {
        // Advance entity towards player
        if (!showHelp) {
          ent.z += speed * dt;
        }
        if (ent.z < minZ) minZ = ent.z;

        // Perspective projection formula
        const pz = Math.pow(ent.z, 2.2);
        const curRoadW = horizonW + (bottomW - horizonW) * ent.z;
        const entityY = horizonY + pz * (h - horizonY);

        // Lane offsets: 0 = -curRoadW / 3, 1 = 0, 2 = curRoadW / 3
        const laneOffset = (ent.lane - 1) * (curRoadW / 3);
        const entityX = centerX + laneOffset;
        const entityScale = 0.25 + ent.z * 0.85;

        // ── COLLISION CHECK WITH LEO ────────────────────────────────────
        const playerZ = 0.88;
        const hitToleranceZ = 0.09;
        const isNearPlayerZ = Math.abs(ent.z - playerZ) < hitToleranceZ;
        const isSameLane = Math.abs(currentSmoothLane - ent.lane) < 0.52;

        if (!showHelp && isNearPlayerZ && isSameLane && !ent.passed && !ent.collected) {
          ent.passed = true;

          // Check invincibility
          const isCurrentlyInvincible = Date.now() < invincibleUntil.current;

          if (ent.type === 'target_connector') {
            // ── HIT CORRECT CONNECTOR GATE! ──
            ent.collected = true;
            const fullSentence = currentQ.sentence.replace('_____', ent.word);
            speakText(fullSentence);
            setScore(s => s + 40);

            const fbText = `✨ BRIDGE ENERGIZED! "${ent.word}" connects the sentence correctly!`;
            setFeedback({ isCorrect: true, text: fbText });

            if (typeof window !== 'undefined') {
              window.__CONNECTOR_RELAY_EVENT_LOG__ = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];
              window.__CONNECTOR_RELAY_EVENT_LOG__.push({
                type: 'correct',
                word: ent.word,
                targetRoot: ent.targetRoot,
                round: roundIdx + 1,
                timestamp: Date.now(),
                text: fbText,
              });
            }

            spawnExplosion(entityX, entityY - 30, '#10b981');

            // Advance to next round & WIPE ENTITIES CLEAN (Anti-Leak)
            setTimeout(() => {
              setFeedback(null);
              entitiesRef.current = []; // Wipe clean
              if (roundIdx + 1 >= questions.length) {
                setPhase('cleared');
                const finalScore = score + 50 + (timeLeft * 2);
                setScore(finalScore);
                recordPersonalBest('connector_relay', finalScore);
                speakText('Skyway Bridge fully energized! All connectors mastered!');
              } else {
                setRoundIdx(r => r + 1);
              }
            }, 1200);

          } else if (ent.type === 'distractor_connector') {
            // ── HIT WRONG CONNECTOR GATE! ──
            if (!isCurrentlyInvincible) {
              setHearts(hp => {
                const nextHp = Math.max(0, hp - 1);
                if (nextHp === 0) setPhase('ko');
                return nextHp;
              });

              const fbText = `⚡ WRONG CONNECTOR! "${ent.word}" does not fit this sentence structure!`;
              setFeedback({ isCorrect: false, text: fbText });

              if (typeof window !== 'undefined') {
                window.__CONNECTOR_RELAY_EVENT_LOG__ = window.__CONNECTOR_RELAY_EVENT_LOG__ || [];
                window.__CONNECTOR_RELAY_EVENT_LOG__.push({
                  type: 'wrong',
                  word: ent.word,
                  targetRoot: ent.targetRoot,
                  round: roundIdx + 1,
                  timestamp: Date.now(),
                  text: fbText,
                });
              }

              spawnExplosion(entityX, entityY - 30, '#ef4444');
              setTimeout(() => setFeedback(null), 1400);
              invincibleUntil.current = Date.now() + 1600;
              setInvincible(true);
              setTimeout(() => setInvincible(false), 1600);
            }

          } else if (ent.type === 'barrier' || ent.type === 'laser' || ent.type === 'barrel') {
            // ── HIT ROAD OBSTACLE ──
            let avoided = false;
            if (ent.type === 'barrier' && isJumping) avoided = true;
            if (ent.type === 'laser' && isSliding) avoided = true;

            if (!avoided && !isCurrentlyInvincible) {
              setHearts(hp => {
                const nextHp = Math.max(0, hp - 1);
                if (nextHp === 0) setPhase('ko');
                return nextHp;
              });

              const fbText = `💥 HAZARD STRIKE! -1 Heart!`;
              setFeedback({ isCorrect: false, text: fbText });
              spawnExplosion(entityX, entityY - 20, '#f97316');
              setTimeout(() => setFeedback(null), 1200);
              invincibleUntil.current = Date.now() + 1500;
              setInvincible(true);
              setTimeout(() => setInvincible(false), 1500);
            }
          }
        }

        if (ent.collected) continue;

        // ── RENDER 3D ENTITIES ──────────────────────────────────────────
        ctx.save();
        ctx.translate(entityX, entityY);
        ctx.scale(entityScale, entityScale);

        if (ent.type === 'target_connector' || ent.type === 'distractor_connector') {
          // ── FLOATING CONNECTOR PORTAL GATE ──
          const isTarget = ent.type === 'target_connector';
          const gateW = 110;
          const gateH = 38;
          const floatY = -56 + Math.sin(now / 180 + ent.lane) * 4;

          // Portal Aura Glow
          ctx.shadowColor = isTarget ? '#10b981' : '#f59e0b';
          ctx.shadowBlur = isTarget ? 22 : 12;

          // Gate Plate
          ctx.fillStyle = isTarget ? 'rgba(6, 78, 59, 0.94)' : 'rgba(30, 27, 75, 0.90)';
          ctx.strokeStyle = isTarget ? '#34d399' : '#fbbf24';
          ctx.lineWidth = isTarget ? 3 : 1.5;

          ctx.beginPath();
          ctx.roundRect(-gateW / 2, floatY, gateW, gateH, 10);
          ctx.fill();
          ctx.stroke();

          // Gate Pillar Legs
          ctx.strokeStyle = isTarget ? 'rgba(52, 211, 153, 0.6)' : 'rgba(251, 191, 36, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-gateW / 2 + 8, floatY + gateH);
          ctx.lineTo(-gateW / 2 + 8, 0);
          ctx.moveTo(gateW / 2 - 8, floatY + gateH);
          ctx.lineTo(gateW / 2 - 8, 0);
          ctx.stroke();

          // Connector Word Text
          ctx.shadowBlur = 0;
          ctx.font = '800 13px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = isTarget ? '#ecfdf5' : '#fef3c7';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(ent.word, 0, floatY + gateH / 2);

        } else if (ent.type === 'barrier') {
          // Barrier Hurdle
          const bW = 86;
          const bH = 28;
          ctx.fillStyle = '#64748b';
          ctx.fillRect(-bW / 2 - 4, -bH, 8, bH);
          ctx.fillRect(bW / 2 - 4, -bH, 8, bH);

          ctx.fillStyle = '#ef4444';
          ctx.fillRect(-bW / 2, -bH + 4, bW, 16);
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#fbbf24';
          ctx.textAlign = 'center';
          ctx.fillText('⚡ JUMP', 0, -bH - 4);

        } else if (ent.type === 'laser') {
          // Suspended Laser Beam
          const lW = 96;
          const lY = -48;
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(-lW / 2, lY);
          ctx.lineTo(lW / 2, lY);
          ctx.stroke();
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#38bdf8';
          ctx.textAlign = 'center';
          ctx.fillText('🛹 SLIDE', 0, lY - 6);

        } else if (ent.type === 'barrel') {
          // Rock Pillar / Barrel
          ctx.fillStyle = '#b45309';
          ctx.fillRect(-18, -44, 36, 44);
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚠️', 0, -20);
        }

        ctx.restore();
      }

      // Continuous procedural spawning
      if (minZ > 0.32) {
        spawnNextWave(currentQ, Math.max(0.04, minZ - 0.32), currentRoundId);
      }

      // ── RENDER PARTICLES ────────────────────────────────────────────────
      for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particlesRef.current[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= dt * 1.5;

        if (p.alpha <= 0) {
          particlesRef.current.splice(pIdx, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── UPDATE LEO SPRITE POSITION ──────────────────────────────────────
      const pLeoZ = 0.88;
      const pRoadW = horizonW + (bottomW - horizonW) * pLeoZ;
      const pLeoY = horizonY + Math.pow(pLeoZ, 2.2) * (h - horizonY);
      const pLeoX = centerX + (currentSmoothLane - 1) * (pRoadW / 3);

      let jumpOffset = 0;
      if (isJumping) jumpOffset = -54;
      if (isSliding) jumpOffset = 18;

      setLeoPos({
        x: pLeoX,
        y: pLeoY + jumpOffset,
        jumpOffset,
        scale: 0.25 + pLeoZ * 0.85,
      });

      animId = requestAnimationFrame(runFrame);
    };

    animId = requestAnimationFrame(runFrame);
    return () => cancelAnimationFrame(animId);
  }, [currentQ, roundIdx, targetLane, isJumping, isSliding, phase, showHelp, score, timeLeft, questions.length, recordPersonalBest, spawnNextWave]);

  // Timer loop
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

  const handleRetry = () => {
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setRoundIdx(0);
    setFeedback(null);
    entitiesRef.current = [];
    setPhase('playing');
  };

  const handleFinalFinish = () => {
    const stars = calculateStars(score, questions.length * 40);
    if (onComplete) onComplete(stars, score);
    else if (onExit) onExit();
  };

  return (
    <div className="connector-relay-root" ref={containerRef}>
      <FloatingExitBtn onExit={onExit || handleFinalFinish} label="← Chamber" />

      {/* ── Guide Modal Trigger ── */}
      <button
        type="button"
        className="connector-help-btn"
        onClick={() => setShowHelp(true)}
        title="Game Instructions"
      >
        <HelpCircle size={16} /> Guide
      </button>

      {/* ── Game Instruction Modal ── */}
      <GameInstructionModal
        gameId="connector_relay"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {/* ── Top Target Sentence Banner with Blank Badge ── */}
      <div className="connector-sentence-banner">
        <button
          className="connector-audio-btn"
          onClick={() => speakText(currentQ.sentence.replace('_____', currentQ.answer))}
          title="Listen to full sentence"
        >
          <Volume2 size={16} /> Listen
        </button>
        <div className="connector-sentence-content">
          <Route size={16} className="connector-icon" />
          <span className="connector-sentence-text">
            {currentQ.sentence.split('_____')[0]}
            <span className="connector-blank-pill">_____</span>
            {currentQ.sentence.split('_____')[1]}
          </span>
          <span className="connector-round-pill">
            Round {roundIdx + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* ── Toast Feedback ── */}
      {feedback && (
        <div className={`connector-toast-pill ${feedback.isCorrect ? 'toast-correct' : 'toast-wrong'}`}>
          {feedback.isCorrect ? <Sparkles size={18} /> : <AlertTriangle size={18} />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* ── Canvas 3D Road ── */}
      <canvas
        ref={canvasRef}
        width={viewSize.width}
        height={viewSize.height}
        className="connector-relay-canvas"
      />

      {/* ── Leo Mascot CSS Overlay (3D Positioned) ── */}
      <div
        className={`connector-leo-layer ${invincible ? 'leo-invincible' : ''}`}
        style={{
          transform: `translate(${leoPos.x}px, ${leoPos.y}px) scale(${leoPos.scale})`,
        }}
      >
        <LeoCharacterBack
          animState={leoAnimState}
          isJumping={isJumping}
          isSliding={isSliding}
        />
      </div>

      {/* ── Gesture Touch Controls Overlay ── */}
      <div ref={gestureRef} className="connector-gesture-overlay" />

      {/* ── On-Screen Control Guide for Mobile ── */}
      <div className="connector-controls-guide">
        <span>← Tap Left</span>
        <span>• Swipe Up = Jump • Swipe Down = Slide •</span>
        <span>Tap Right →</span>
      </div>

      {/* ── HUD Overlay ── */}
      <HUDOverlay
        hearts={hearts}
        score={score}
        timeLeft={timeLeft}
        wordsCollected={roundIdx}
        totalWords={questions.length}
        floorNumber={6}
        doorLabel="Door 2 — Connector Relay (Skyway Bridge)"
      />

      {/* ── Cleared Modal ── */}
      {phase === 'cleared' && (
        <div className="connector-cleared-modal">
          <div className="cleared-card">
            <Trophy size={48} className="trophy-icon" />
            <h2>SKYWAY BRIDGE ENERGIZED!</h2>
            <div className="cleared-stars">
              {'⭐'.repeat(calculateStars(score, questions.length * 40))}
            </div>
            <p className="cleared-full-text">All {questions.length} connective clauses successfully routed!</p>
            <p className="cleared-score">Score: <strong>{score} XP</strong></p>
            {score > personalBest && (
              <div className="cleared-record">🏆 New Personal Best!</div>
            )}
            <button className="finish-door-btn" onClick={handleFinalFinish}>
              Return to Skyway <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout Modal ── */}
      {phase === 'ko' && (
        <div className="connector-ko-modal">
          <div className="ko-card">
            <AlertTriangle size={48} className="ko-icon" />
            <h2>BRIDGE COLLAPSE!</h2>
            <p>Too many structural fractures occurred from wrong connectors.</p>
            <div className="ko-actions">
              <button className="retry-btn" onClick={handleRetry}>
                <RotateCcw size={18} /> Try Again
              </button>
              <button className="exit-btn" onClick={handleFinalFinish}>
                Return to Chamber
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
