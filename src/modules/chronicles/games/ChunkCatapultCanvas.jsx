/**
 * ChunkCatapultCanvas.jsx — Pure Canvas 2D/React Slingshot Parabolic Catapult
 *
 * Replaces Phaser 3 (1.4MB bundle) with a lightweight, high-performance Canvas 2D component:
 * - Real parabolic trajectory physics (gravity g = 320 px/s²)
 * - Slingshot drag-and-release with elastic bands & trajectory preview dots
 * - Responsive Canvas scaling with devicePixelRatio & touch coordinate mapping
 * - "Bullet Time" (0.4x clock slowdown during slingshot pull for relaxed reading)
 * - 80/20 Pedagogical Scoring: 80% Language Accuracy + 20% Speed Bonus
 * - Safe floor of 0 for every sentence (Math.max(0, 16 - misses * 4))
 * - Mobile portrait orientation notice with "Play in Portrait" fallback
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, Volume2, ArrowLeft, Trophy, Sparkles, Smartphone } from 'lucide-react';

// Default pedagogical pairs if none provided
const DEFAULT_PAIRS = [
  { starter: 'Jake was walking', completion: 'down the corridor' },
  { starter: 'Water on tiles', completion: 'reduces friction' },
  { starter: 'Rubber shoe soles', completion: 'provide strong grip' },
  { starter: 'Nurse Sarah wrapped', completion: 'a sterile bandage' },
  { starter: 'Be careful because', completion: 'the floor is slippery' },
];

export default function ChunkCatapultCanvas({
  pairs = DEFAULT_PAIRS,
  duration = 90,
  weekNumber = 33,
  doorIndex = 1,
  onComplete,
  onSceneEvent,
  onExit,
}) {
  const activePairs = (pairs && pairs.length > 0) ? pairs : DEFAULT_PAIRS;

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  // Game Progress State
  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [languageScore, setLanguageScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [bulletTimeActive, setBulletTimeActive] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [ignorePortraitWarning, setIgnorePortraitWarning] = useState(false);

  // References for live animation loop
  const gameStateRef = useRef({
    score: 0,
    languageScore: 0,
    currentPairIdx: 0,
    attemptsOnCurrentPair: 0,
    timeLeft: duration,
    isDragging: false,
    isLaunched: false,
    slingshotBase: { x: 130, y: 380 },
    bullet: { x: 130, y: 380, vx: 0, vy: 0, radius: 14 },
    gravity: 340,
    baskets: [],
    particles: [],
    popups: [],
    lastTime: performance.now(),
    isComplete: false,
  });

  // Sound synthesis via Web Audio API (Zero asset dependencies, 100% reliable)
  const playSfx = useCallback((type) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'stretch') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(260, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'launch') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'hit_correct') {
        // High harmonious ding
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.18); // A5
        gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
      } else if (type === 'hit_wrong') {
        // Dull thud
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(90, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch (_) {}
  }, []);

  // Setup baskets for a specific pair index
  const setupBaskets = useCallback((pairIdx) => {
    const pair = activePairs[pairIdx % activePairs.length];
    if (!pair) return;

    // Distractors
    const otherCompletions = activePairs
      .filter((_, idx) => idx !== (pairIdx % activePairs.length))
      .map(p => p.completion);
    
    const candidates = [
      pair.completion,
      otherCompletions[0] || 'on the slippery tiles',
      otherCompletions[1] || 'near the science room',
    ];
    // Shuffle deterministic enough
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);

    const positions = [
      { x: 440, y: 165 },
      { x: 610, y: 220 },
      { x: 730, y: 310 },
    ];

    gameStateRef.current.baskets = positions.map((pos, idx) => ({
      x: pos.x,
      y: pos.y,
      radius: 34,
      text: shuffled[idx],
      isCorrect: shuffled[idx] === pair.completion,
      shake: 0,
      scale: 1,
    }));
  }, [activePairs]);

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      const isPort = window.innerWidth < window.innerHeight && window.innerWidth < 640;
      setIsPortrait(isPort);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Initialize first round
  useEffect(() => {
    setupBaskets(0);
  }, [setupBaskets]);

  // Complete game handler
  const handleEndGame = useCallback((finalLangScore, remainingSecs) => {
    if (gameStateRef.current.isComplete) return;
    gameStateRef.current.isComplete = true;
    setIsGameOver(true);

    // 80/20 Scoring formula:
    // Language: max 80 pts (accumulated via Math.max(0, 16 - misses * 4))
    // Speed: max 20 pts based on remaining time ratio
    const speedBonus = Math.round((Math.max(0, remainingSecs) / duration) * 20);
    const totalScore = Math.min(100, Math.max(0, finalLangScore + speedBonus));

    // Stars threshold: >=80 = 3 stars, >=60 = 2 stars, >=40 = 1 star
    const stars = totalScore >= 80 ? 3 : totalScore >= 60 ? 2 : totalScore >= 40 ? 1 : 0;

    const result = {
      stars,
      score: totalScore,
      languageScore: finalLangScore,
      speedBonus,
      timeLeft: remainingSecs,
    };
    setGameResult(result);

    if (onComplete) {
      onComplete(stars, totalScore, doorIndex);
    }
    if (onSceneEvent) {
      onSceneEvent('game_complete', { stars, score: totalScore });
    }
  }, [doorIndex, duration, onComplete, onSceneEvent]);

  // Timer loop with Bullet Time slowdown
  useEffect(() => {
    if (isGameOver) return;

    const timer = setInterval(() => {
      const isDragging = gameStateRef.current.isDragging;
      // When dragging: clock slows down by 60% (advances by 0.4s instead of 1.0s)
      const tick = isDragging ? 0.4 : 1.0;
      gameStateRef.current.timeLeft = Math.max(0, gameStateRef.current.timeLeft - tick);

      setTimeLeft(Math.ceil(gameStateRef.current.timeLeft));

      if (gameStateRef.current.timeLeft <= 0) {
        clearInterval(timer);
        handleEndGame(gameStateRef.current.languageScore, 0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, handleEndGame]);

  // Helper to convert client pointer to virtual 800x500 coordinates
  const getVirtualCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 800;
    const y = ((clientY - rect.top) / rect.height) * 500;
    return { x, y };
  };

  // Pointer Down (Mouse / Touch)
  const handlePointerDown = (e) => {
    if (isGameOver || gameStateRef.current.isLaunched) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const { x, y } = getVirtualCoords(clientX, clientY);
    const base = gameStateRef.current.slingshotBase;
    const dist = Math.hypot(x - base.x, y - base.y);

    // Wide comfortable touch tolerance (85px)
    if (dist <= 85) {
      gameStateRef.current.isDragging = true;
      setBulletTimeActive(true);
      playSfx('stretch');
    }
  };

  // Pointer Move (Mouse / Touch)
  const handlePointerMove = (e) => {
    const state = gameStateRef.current;
    if (!state.isDragging || state.isLaunched) return;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const { x, y } = getVirtualCoords(clientX, clientY);
    const base = state.slingshotBase;

    // Pull back clamp: max 95px
    const dx = x - base.x;
    const dy = y - base.y;
    const dist = Math.hypot(dx, dy);
    const maxDrag = 95;
    const clampedDist = Math.min(dist, maxDrag);
    const angle = Math.atan2(dy, dx);

    state.bullet.x = base.x + Math.cos(angle) * clampedDist;
    state.bullet.y = base.y + Math.sin(angle) * clampedDist;
  };

  // Pointer Up (Launch!)
  const handlePointerUp = () => {
    const state = gameStateRef.current;
    if (!state.isDragging || state.isLaunched) return;

    state.isDragging = false;
    setBulletTimeActive(false);

    const base = state.slingshotBase;
    const dx = base.x - state.bullet.x;
    const dy = base.y - state.bullet.y;
    const dist = Math.hypot(dx, dy);

    // Minimum pull threshold to trigger shot
    if (dist > 18) {
      state.isLaunched = true;
      state.bullet.vx = dx * 6.8;
      state.bullet.vy = dy * 6.8;
      playSfx('launch');
    } else {
      // Snap back if released without pulling
      state.bullet.x = base.x;
      state.bullet.y = base.y;
    }
  };

  // Reset projectile back to slingshot mount
  const resetBullet = () => {
    const state = gameStateRef.current;
    state.isLaunched = false;
    state.isDragging = false;
    state.bullet.x = state.slingshotBase.x;
    state.bullet.y = state.slingshotBase.y;
    state.bullet.vx = 0;
    state.bullet.vy = 0;
    setBulletTimeActive(false);
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const renderLoop = (now) => {
      const state = gameStateRef.current;
      const dt = Math.min((now - state.lastTime) / 1000, 0.05); // cap 50ms to prevent huge jumps
      state.lastTime = now;

      // 1. Responsive Canvas Scale
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }

      ctx.save();
      ctx.scale((rect.width / 800) * dpr, (rect.height / 500) * dpr);

      // 2. Physics Integration
      if (state.isLaunched) {
        state.bullet.vy += state.gravity * dt;
        state.bullet.x += state.bullet.vx * dt;
        state.bullet.y += state.bullet.vy * dt;

        // Collision Check with 3 Baskets
        for (let i = 0; i < state.baskets.length; i++) {
          const b = state.baskets[i];
          const dist = Math.hypot(state.bullet.x - b.x, state.bullet.y - b.y);

          if (dist < state.bullet.radius + b.radius) {
            // Hit basket!
            state.isLaunched = false;

            if (b.isCorrect) {
              // CORRECT HIT!
              playSfx('hit_correct');
              b.scale = 1.35;

              // Sư phạm: Điểm mỗi câu có sàn tối thiểu = 0
              const earnedPts = Math.max(0, 16 - state.attemptsOnCurrentPair * 4);
              state.languageScore += earnedPts;
              state.score = state.languageScore;
              setLanguageScore(state.languageScore);

              // Spawn celebration particles & text
              for (let p = 0; p < 24; p++) {
                state.particles.push({
                  x: b.x,
                  y: b.y,
                  vx: (Math.random() - 0.5) * 260,
                  vy: (Math.random() - 0.7) * 260,
                  color: ['#4ade80', '#facc15', '#38bdf8', '#fbbf24'][p % 4],
                  radius: Math.random() * 4 + 2,
                  life: 0.8,
                });
              }
              state.popups.push({
                x: b.x,
                y: b.y - 20,
                text: `+${earnedPts} PERFECT!`,
                color: '#4ade80',
                life: 1.0,
              });

              // Advance to next pair
              setTimeout(() => {
                const nextIdx = state.currentPairIdx + 1;
                state.currentPairIdx = nextIdx;
                state.attemptsOnCurrentPair = 0;
                setCurrentPairIdx(nextIdx);

                if (nextIdx >= activePairs.length) {
                  // ALL PAIRS CLEARED!
                  handleEndGame(state.languageScore, Math.ceil(state.timeLeft));
                } else {
                  setupBaskets(nextIdx);
                  resetBullet();
                }
              }, 700);

            } else {
              // WRONG HIT!
              playSfx('hit_wrong');
              b.shake = 12;
              state.attemptsOnCurrentPair++;

              state.popups.push({
                x: b.x,
                y: b.y - 20,
                text: 'MISS! Try Again',
                color: '#f87171',
                life: 0.9,
              });

              // Reset after brief pause
              setTimeout(() => {
                resetBullet();
              }, 500);
            }
            break;
          }
        }

        // Hit ground or flew off screen
        if (state.bullet.y > 450 || state.bullet.x > 840 || state.bullet.x < -40) {
          state.isLaunched = false;
          state.attemptsOnCurrentPair++;
          state.popups.push({
            x: Math.min(Math.max(state.bullet.x, 80), 720),
            y: 400,
            text: 'Off Target!',
            color: '#cbd5e1',
            life: 0.8,
          });
          setTimeout(resetBullet, 350);
        }
      }

      // 3. Drawing Environment
      // Deep castle courtyard gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.7, '#131b2e');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 500);

      // Distant castle wall bricks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let gy = 80; gy < 420; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(800, gy);
        ctx.stroke();
      }

      // Ground platform
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 430, 800, 70);
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 428, 800, 4);

      // Slingshot Post (Wood texture)
      const base = state.slingshotBase;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(base.x - 8, base.y, 16, 55); // stand
      // Slingshot Fork
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(base.x - 18, base.y - 12, 6, 0, Math.PI * 2);
      ctx.arc(base.x + 18, base.y - 12, 6, 0, Math.PI * 2);
      ctx.fill();

      // Slingshot Elastic Bands & Trajectory Preview
      if (state.isDragging) {
        // Back Elastic band
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(base.x - 18, base.y - 12);
        ctx.lineTo(state.bullet.x, state.bullet.y);
        ctx.stroke();

        // Parabolic Arc Trajectory Dots (Predicted flight path)
        const vx = (base.x - state.bullet.x) * 6.8;
        const vy = (base.y - state.bullet.y) * 6.8;
        for (let t = 0.08; t < 1.15; t += 0.09) {
          const px = state.bullet.x + vx * t;
          const py = state.bullet.y + vy * t + 0.5 * state.gravity * t * t;
          if (py > 430 || px > 800) break;
          ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw 3 Target Baskets
      for (let b of state.baskets) {
        // Shake dampening
        if (b.shake > 0) {
          b.shake = Math.max(0, b.shake - dt * 25);
        }
        const shakeX = (Math.random() - 0.5) * b.shake;

        ctx.save();
        ctx.translate(b.x + shakeX, b.y);

        // Glowing Target Ring
        ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 3.5;
        ctx.strokeStyle = b.shake > 0 ? '#ef4444' : '#6366f1';
        ctx.stroke();

        // Target Ring Icon
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎯', 0, 0);

        // Text completion card below basket
        ctx.font = 'bold 12px "Inter", system-ui, sans-serif';
        const metrics = ctx.measureText(b.text);
        const cardW = Math.max(metrics.width + 20, 110);
        const cardH = 30;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = b.shake > 0 ? '#ef4444' : '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-cardW / 2, b.radius + 6, cardW, cardH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.fillText(b.text, 0, b.radius + 22);

        ctx.restore();
      }

      // 5. Draw Projectile Bullet
      ctx.save();
      ctx.translate(state.bullet.x, state.bullet.y);

      // Bullet glowing aura
      ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, state.bullet.radius + 5, 0, Math.PI * 2);
      ctx.fill();

      // Magic Fireball projectile
      const bulletGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, state.bullet.radius);
      bulletGrad.addColorStop(0, '#fef08a');
      bulletGrad.addColorStop(0.5, '#f59e0b');
      bulletGrad.addColorStop(1, '#b45309');
      ctx.fillStyle = bulletGrad;
      ctx.beginPath();
      ctx.arc(0, 0, state.bullet.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Front Elastic band
      if (state.isDragging) {
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(base.x + 18, base.y - 12);
        ctx.lineTo(state.bullet.x, state.bullet.y);
        ctx.stroke();
      }

      // 6. Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 7. Popups
      for (let i = state.popups.length - 1; i >= 0; i--) {
        const pop = state.popups[i];
        pop.y -= dt * 35;
        pop.life -= dt;
        if (pop.life <= 0) {
          state.popups.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.font = 'bold 15px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = pop.color;
        ctx.globalAlpha = Math.max(0, pop.life);
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activePairs.length, playSfx, setupBaskets, handleEndGame]);

  const currentPair = activePairs[currentPairIdx % activePairs.length] || activePairs[0];

  return (
    <div
      ref={containerRef}
      className="chunk-catapult-wrapper"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: '#070a13',
        color: '#f8fafc',
        fontFamily: "'Inter', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
        touchAction: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ─── Top Control & HUD Bar ─── */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 14,
          right: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={onExit}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(30, 41, 59, 0.85)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ArrowLeft size={16} />
          <span>Exit</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Bullet Time Badge */}
          {bulletTimeActive && (
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.2)',
                border: '1px solid #f59e0b',
                color: '#fde047',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                animation: 'pulse 1s infinite',
              }}
            >
              ⏳ Bullet Time (Slow Clock)
            </div>
          )}

          {/* HUD Score & Timer */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: '#38bdf8',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <span>Score: <strong style={{ color: '#4ade80' }}>{languageScore}</strong></span>
            <span>Pair: <strong style={{ color: '#facc15' }}>{Math.min(currentPairIdx + 1, activePairs.length)}/{activePairs.length}</strong></span>
            <span>⏱️ {timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* ─── Question Chunk Prompt Banner ─── */}
      <div
        style={{
          position: 'absolute',
          top: 54,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '94%',
          maxWidth: '720px',
          background: 'rgba(30, 27, 75, 0.95)',
          border: '1.5px solid #6366f1',
          borderRadius: '12px',
          padding: '8px 16px',
          textAlign: 'center',
          zIndex: 25,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize: '11px', color: '#a5b4fc', fontWeight: 700, letterSpacing: '0.05em' }}>
          CHUNK CATAPULT — PULL SLINGSHOT & AIM AT THE MATCHING COMPLETION:
        </div>
        <div style={{ fontSize: '18px', color: '#facc15', fontWeight: 800, marginTop: '2px' }}>
          "{currentPair.starter} ... ?"
        </div>
      </div>

      {/* ─── Interactive Game Canvas ─── */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          aspectRatio: '800 / 500',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            touchAction: 'none',
            cursor: 'crosshair',
          }}
        />
      </div>

      {/* ─── Landscape Orientation Notice (Mobile Soft-Lock) ─── */}
      {isPortrait && !ignorePortraitWarning && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(7, 10, 19, 0.96)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '16px', animation: 'bounce 2s infinite' }}>
            📱 ↻
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#facc15', marginBottom: '8px' }}>
            Xoay Ngang Màn Hình Để Bắn Ná
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '340px', lineHeight: 1.5, marginBottom: '24px' }}>
            Quỹ đạo parabol cần không gian ngang rộng rãi để ngắm trúng rổ mục tiêu chuẩn xác nhất! 🦊🎯
          </p>
          <button
            onClick={() => setIgnorePortraitWarning(true)}
            style={{
              background: 'rgba(51, 65, 85, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#94a3b8',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Tiếp tục chơi dọc (Play in Portrait)
          </button>
        </div>
      )}

      {/* ─── Game Complete Victory Modal ─── */}
      {isGameOver && gameResult && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(7, 10, 19, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 90,
            padding: '16px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 100%)',
              border: '2px solid #6366f1',
              borderRadius: '20px',
              padding: '28px 32px',
              maxWidth: '420px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            }}
          >
            <Trophy size={48} className="text-amber-400" style={{ margin: '0 auto 12px auto' }} />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              Catapult Master!
            </h2>
            <p style={{ color: '#a5b4fc', fontSize: '0.9rem', marginBottom: '16px' }}>
              All grammar chunks matched successfully!
            </p>

            {/* Stars Display */}
            <div style={{ fontSize: '2rem', marginBottom: '16px', color: '#facc15' }}>
              {[1, 2, 3].map((s) => (
                <span key={s} style={{ opacity: s <= gameResult.stars ? 1 : 0.25, margin: '0 4px' }}>
                  ★
                </span>
              ))}
            </div>

            {/* 80/20 Score Breakdown */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.7)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '20px',
                textAlign: 'left',
                fontSize: '13px',
                color: '#cbd5e1',
                lineHeight: 1.8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>🎯 Language Accuracy (80%):</span>
                <strong style={{ color: '#4ade80' }}>+{gameResult.languageScore} pts</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>⚡ Speed Bonus (20%):</span>
                <strong style={{ color: '#38bdf8' }}>+{gameResult.speedBonus} pts</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  marginTop: '6px',
                  paddingTop: '6px',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#ffffff',
                }}
              >
                <span>Total Score:</span>
                <span style={{ color: '#facc15' }}>{gameResult.score} / 100</span>
              </div>
            </div>

            <button
              onClick={onExit}
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#1e1b4b',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 24px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
                width: '100%',
              }}
            >
              Continue to Chamber
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
